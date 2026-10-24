import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { analyzeResume } from './index';
import type { ResumeAnalysisResult } from './types';

export interface UploadedResumeRecord {
  id: string;
  filename: string;
  file_size: number | null;
  mime_type: string | null;
  resume_text: string | null;
  ats_score: number;
  user_id: string | null;
  user_email: string | null;
  candidate_name?: string | null;
  target_role?: string | null;
  job_description?: string | null;
  ip_address: string | null;
  file_data?: string | null; // Base64 encoded original binary
  has_file_data?: boolean;
  status: 'parsed' | 'pending' | 'failed';
  created_at: string;
  updated_at?: string;
  analysis: {
    grade?: string;
    summary?: string;
    breakdown?: {
      contact_score: number;
      experience_score: number;
      skills_score: number;
      formatting_score: number;
    };
    matched_keywords?: string[];
    missing_keywords?: string[];
    formatting_issues?: string[];
    bullet_rewrites?: {
      original: string;
      improved: string;
      reason: string;
    }[];
  } | null;
}

export interface AdminAuditLogEntry {
  id: string;
  action: 'VIEW' | 'DOWNLOAD' | 'DELETE' | 'BULK_DELETE' | 'REPROCESS' | 'EXPORT' | 'PURGE_TESTS';
  admin_email: string;
  target_id: string | null;
  target_name: string | null;
  details: string;
  ip_address: string;
  created_at: string;
}

const DATA_DIR = process.env.STORAGE_DIR || path.join(process.cwd(), 'data');
const RESUMES_FILE = path.join(DATA_DIR, 'uploaded-resumes.json');
const AUDIT_FILE = path.join(DATA_DIR, 'admin-audit-log.json');

// In-memory cache for fast response and non-blocking reads
let inMemoryResumes: Map<string, UploadedResumeRecord> | null = null;
let inMemoryAudits: AdminAuditLogEntry[] | null = null;

function ensureDataDir(): void {
  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('Notice: Unable to create data directory:', err);
  }
}

function loadLocalResumes(): Map<string, UploadedResumeRecord> {
  if (inMemoryResumes !== null) return inMemoryResumes;
  const map = new Map<string, UploadedResumeRecord>();
  ensureDataDir();
  try {
    if (fs.existsSync(RESUMES_FILE)) {
      const raw = fs.readFileSync(RESUMES_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item && item.id) {
            map.set(item.id, item);
          }
        }
      }
    }
  } catch (err) {
    console.warn('Notice: Failed reading uploaded-resumes.json:', err);
  }
  inMemoryResumes = map;
  return inMemoryResumes;
}

function saveLocalResumes(map: Map<string, UploadedResumeRecord>): void {
  ensureDataDir();
  try {
    const list = Array.from(map.values());
    try {
      const tempFile = `${RESUMES_FILE}.${Date.now()}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(list, null, 2), 'utf8');
      fs.renameSync(tempFile, RESUMES_FILE);
    } catch {
      fs.writeFileSync(RESUMES_FILE, JSON.stringify(list, null, 2), 'utf8');
    }
  } catch {
    // Non-blocking in-memory fallback for read-only / serverless container runtimes
  }
}

function loadLocalAudits(): AdminAuditLogEntry[] {
  if (inMemoryAudits !== null) return inMemoryAudits;
  let list: AdminAuditLogEntry[] = [];
  ensureDataDir();
  try {
    if (fs.existsSync(AUDIT_FILE)) {
      const raw = fs.readFileSync(AUDIT_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        list = parsed;
      }
    }
  } catch (err) {
    console.warn('Notice: Failed reading admin-audit-log.json:', err);
  }
  inMemoryAudits = list;
  return inMemoryAudits;
}

function saveLocalAudits(list: AdminAuditLogEntry[]): void {
  ensureDataDir();
  try {
    try {
      const tempFile = `${AUDIT_FILE}.${Date.now()}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(list.slice(0, 500), null, 2), 'utf8');
      fs.renameSync(tempFile, AUDIT_FILE);
    } catch {
      fs.writeFileSync(AUDIT_FILE, JSON.stringify(list.slice(0, 500), null, 2), 'utf8');
    }
  } catch {
    // Non-blocking in-memory fallback for read-only / serverless container runtimes
  }
}

async function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceRoleKey && !serviceRoleKey.includes('placeholder')) {
    return createSupabaseAdmin(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  try {
    return await createClient();
  } catch {
    // If called outside Next.js request context (e.g. in tests/CLI)
    if (supabaseUrl && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return createSupabaseAdmin(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
    }
    return null;
  }
}

/**
 * Extracts candidate name from text lines or email fallback, without artificial hardcoding.
 */
export function extractCandidateName(
  cleanText?: string | null,
  email?: string | null,
  accountName?: string | null
): string {
  if (accountName && accountName.trim() && accountName !== 'Student Account') {
    return accountName.trim();
  }

  if (cleanText) {
    const lines = cleanText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    for (let i = 0; i < Math.min(lines.length, 4); i++) {
      const line = lines[i];
      // Skip if line has email, phone, web links, or excessive length
      if (
        line.includes('@') ||
        /\b\d{5,}\b/.test(line) ||
        /https?:\/\//i.test(line) ||
        /github|linkedin|portfolio/i.test(line)
      ) {
        continue;
      }

      // Check if line looks like a valid personal name (2-4 words, alphabetic, no title/sentence punctuation)
      const words = line.split(/\s+/).filter(Boolean);
      if (words.length >= 2 && words.length <= 4) {
        const isAlpha = words.every((w) => /^[A-Za-z'-]+$/.test(w));
        const hasNonNameWord = /resume|curriculum|vitae|profile|summary|experience|education|skills|engineer|developer|designer|manager|passionate|enthusiastic|student|intern|analyst|specialist/i.test(line);
        const endsWithPunctuation = /[.:;!?]$/.test(line);

        if (isAlpha && !hasNonNameWord && !endsWithPunctuation) {
          return words
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
        }
      }
    }
  }

  // Email fallback
  if (email && email.includes('@')) {
    const local = email.split('@')[0];
    const cleaned = local.replace(/[._+-]/g, ' ').trim();
    if (cleaned.length > 1) {
      return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
    }
  }

  return 'Candidate';
}

/**
 * Determines whether a record is a synthetic/test entry that must be excluded.
 */
export function isTestOrDemoRecord(email?: string | null, filename?: string | null): boolean {
  const e = (email || '').toLowerCase().trim();
  const f = (filename || '').toLowerCase().trim();

  if (e.includes('@example.com') || e.includes('@domain.com') || e.includes('test_audit') || e.includes('probe@test')) {
    return true;
  }
  if (
    f.includes('alex_smith') ||
    f.includes('john_doe') ||
    f.includes('direct_test') ||
    f.includes('__test_probe') ||
    f.startsWith('__system_')
  ) {
    return true;
  }
  return false;
}

/**
 * Persists an uploaded resume record to both local persistent store and Supabase.
 */
export async function saveUploadedResume(
  input: Omit<UploadedResumeRecord, 'id' | 'created_at' | 'status'> & {
    id?: string;
    created_at?: string;
    status?: 'parsed' | 'pending' | 'failed';
  }
): Promise<UploadedResumeRecord> {
  const id = input.id || crypto.randomUUID();
  const now = new Date().toISOString();
  const createdAt = input.created_at || now;
  const status = input.status || 'parsed';

  const candidateName =
    input.candidate_name ||
    extractCandidateName(input.resume_text, input.user_email);

  const fullRecord: UploadedResumeRecord = {
    ...input,
    id,
    candidate_name: candidateName,
    created_at: createdAt,
    updated_at: now,
    status,
    has_file_data: Boolean(input.file_data),
  };

  // 1. Save to local persistent store
  const map = loadLocalResumes();
  map.set(id, fullRecord);
  saveLocalResumes(map);

  // 2. Persist to Supabase uploaded_resumes table
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const isUUID = typeof input.user_id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input.user_id);

      await (supabase.from('uploaded_resumes') as unknown as {
        upsert: (data: Record<string, unknown>) => Promise<unknown>;
      }).upsert({
        id,
        filename: fullRecord.filename,
        file_size: fullRecord.file_size,
        mime_type: fullRecord.mime_type,
        resume_text: fullRecord.resume_text,
        ats_score: fullRecord.ats_score,
        analysis: fullRecord.analysis,
        user_id: isUUID ? input.user_id : null,
        user_email: fullRecord.user_email,
        ip_address: fullRecord.ip_address,
        file_data: fullRecord.file_data,
        created_at: fullRecord.created_at,
      });
    }
  } catch (err) {
    console.warn('Notice: Supabase upsert for uploaded_resumes returned:', err);
  }

  return fullRecord;
}

/**
 * Fetches all genuine uploaded resumes across Supabase and local persistent storage.
 */
export async function getUploadedResumes(): Promise<UploadedResumeRecord[]> {
  const merged = new Map<string, UploadedResumeRecord>();

  // 1. Read local persistent store
  const localMap = loadLocalResumes();
  for (const [id, r] of localMap.entries()) {
    if (!isTestOrDemoRecord(r.user_email, r.filename) && r.mime_type !== 'application/x-audit-log') {
      merged.set(id, {
        ...r,
        candidate_name: r.candidate_name || extractCandidateName(r.resume_text, r.user_email),
        has_file_data: Boolean(r.file_data),
      });
    }
  }

  // 2. Read from Supabase table
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { data: supaResumes, error } = await supabase
        .from('uploaded_resumes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(supaResumes)) {
        for (const row of supaResumes as unknown as UploadedResumeRecord[]) {
          if (!row || !row.id) continue;
          if (isTestOrDemoRecord(row.user_email, row.filename)) continue;
          if (row.mime_type === 'application/x-audit-log' || (row.filename && row.filename.startsWith('__system_'))) continue;

          const existing = merged.get(row.id);
          const name = row.candidate_name || extractCandidateName(row.resume_text, row.user_email);

          if (existing) {
            // Merge keeping binary data if local or remote has it
            merged.set(row.id, {
              ...existing,
              ...row,
              candidate_name: existing.candidate_name || name,
              file_data: existing.file_data || row.file_data,
              has_file_data: Boolean(existing.file_data || row.file_data),
            });
          } else {
            merged.set(row.id, {
              ...row,
              candidate_name: name,
              has_file_data: Boolean(row.file_data),
              status: row.status || 'parsed',
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('Notice: Querying Supabase for resumes:', err);
  }

  const list = Array.from(merged.values());
  // Sort descending by created_at
  list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return list;
}

/**
 * Retrieves a single uploaded resume by its UUID with full binary data.
 */
export async function getUploadedResumeById(id: string): Promise<UploadedResumeRecord | null> {
  if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return null;
  }

  // 1. Check local store
  const localMap = loadLocalResumes();
  const localRecord = localMap.get(id);
  if (localRecord && localRecord.file_data) {
    return {
      ...localRecord,
      candidate_name: localRecord.candidate_name || extractCandidateName(localRecord.resume_text, localRecord.user_email),
      has_file_data: true,
    };
  }

  // 2. Check Supabase
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { data: supaRecord, error } = await supabase
        .from('uploaded_resumes')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && supaRecord) {
        const rec = supaRecord as unknown as UploadedResumeRecord;
        return {
          ...rec,
          file_data: rec.file_data || localRecord?.file_data || null,
          has_file_data: Boolean(rec.file_data || localRecord?.file_data),
          candidate_name: rec.candidate_name || extractCandidateName(rec.resume_text, rec.user_email),
        };
      }
    }
  } catch (err) {
    console.warn('Notice: Querying single resume from Supabase:', err);
  }

  return localRecord || null;
}

/**
 * Deletes a single uploaded resume by UUID across both stores.
 */
export async function deleteUploadedResume(
  id: string,
  adminEmail = 'Administrator',
  ip = '::1'
): Promise<boolean> {
  const record = await getUploadedResumeById(id);
  const targetName = record ? `${record.filename} (${record.user_email || 'Applicant'})` : id;

  // 1. Local store delete
  const localMap = loadLocalResumes();
  const hadLocal = localMap.delete(id);
  if (hadLocal) {
    saveLocalResumes(localMap);
  }

  // 2. Supabase delete
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      await supabase.from('uploaded_resumes').delete().eq('id', id);
    }
  } catch (err) {
    console.warn('Notice: Supabase delete resume returned:', err);
  }

  await recordAdminAudit({
    action: 'DELETE',
    admin_email: adminEmail,
    target_id: id,
    target_name: targetName,
    details: `Permanently deleted candidate resume ${targetName}`,
    ip_address: ip,
  });

  return true;
}

/**
 * Bulk deletes multiple resumes.
 */
export async function deleteUploadedResumes(
  ids: string[],
  adminEmail = 'Administrator',
  ip = '::1'
): Promise<{ deletedCount: number }> {
  let count = 0;
  for (const id of ids) {
    if (id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      await deleteUploadedResume(id, adminEmail, ip);
      count++;
    }
  }

  await recordAdminAudit({
    action: 'BULK_DELETE',
    admin_email: adminEmail,
    target_id: 'multiple',
    target_name: `${count} resumes`,
    details: `Bulk deleted ${count} candidate resume records`,
    ip_address: ip,
  });

  return { deletedCount: count };
}

/**
 * Purges confirmed mock/test/seed resumes across stores.
 */
export async function purgeTestRecords(
  adminEmail = 'Administrator',
  ip = '::1'
): Promise<{ purgedCount: number }> {
  let purgedCount = 0;

  // Local purge
  const localMap = loadLocalResumes();
  for (const [id, r] of localMap.entries()) {
    if (isTestOrDemoRecord(r.user_email, r.filename)) {
      localMap.delete(id);
      purgedCount++;
    }
  }
  saveLocalResumes(localMap);

  // Supabase purge
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      await supabase.from('uploaded_resumes').delete().ilike('user_email', '%@example.com%');
      await supabase.from('uploaded_resumes').delete().ilike('filename', '%alex_smith%');
      await supabase.from('uploaded_resumes').delete().ilike('filename', '%john_doe%');
      await supabase.from('uploaded_resumes').delete().ilike('filename', '%direct_test%');
    }
  } catch (err) {
    console.warn('Notice: Supabase purge returned:', err);
  }

  await recordAdminAudit({
    action: 'PURGE_TESTS',
    admin_email: adminEmail,
    target_id: 'all_seeds',
    target_name: 'Mock & Seed Candidates',
    details: `Purged legacy testing and demo records (${purgedCount} local removed)`,
    ip_address: ip,
  });

  return { purgedCount };
}

/**
 * Re-runs the complete parsing and scoring pipeline on an existing resume.
 */
export async function reprocessResume(
  id: string,
  adminEmail = 'Administrator',
  ip = '::1'
): Promise<UploadedResumeRecord> {
  const existing = await getUploadedResumeById(id);
  if (!existing) {
    throw new Error('Resume record not found.');
  }

  let freshAnalysis: ResumeAnalysisResult;

  if (existing.file_data) {
    const fileBuffer = Buffer.from(existing.file_data, 'base64');
    freshAnalysis = await analyzeResume({
      fileBuffer,
      filename: existing.filename,
      jobDescription: existing.job_description || undefined,
      targetRole: existing.target_role || undefined,
    });
  } else if (existing.resume_text) {
    freshAnalysis = await analyzeResume({
      text: existing.resume_text,
      filename: existing.filename,
      jobDescription: existing.job_description || undefined,
      targetRole: existing.target_role || undefined,
    });
  } else {
    throw new Error('Document content is missing and cannot be reprocessed.');
  }

  const updatedRecord: UploadedResumeRecord = {
    ...existing,
    ats_score: freshAnalysis.ats_score,
    resume_text: freshAnalysis.parsingReport.cleanText || existing.resume_text,
    analysis: {
      grade: freshAnalysis.grade,
      summary: freshAnalysis.summary,
      breakdown: freshAnalysis.breakdown,
      matched_keywords: freshAnalysis.matched_keywords,
      missing_keywords: freshAnalysis.missing_keywords,
      formatting_issues: freshAnalysis.formatting_issues,
      bullet_rewrites: freshAnalysis.bullet_rewrites,
    },
    updated_at: new Date().toISOString(),
    status: 'parsed',
  };

  // Update local store
  const localMap = loadLocalResumes();
  localMap.set(id, updatedRecord);
  saveLocalResumes(localMap);

  // Update Supabase
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      await (supabase.from('uploaded_resumes') as unknown as {
        update: (data: Record<string, unknown>) => { eq: (col: string, val: string) => Promise<unknown> };
      }).update({
        ats_score: updatedRecord.ats_score,
        analysis: updatedRecord.analysis,
        resume_text: updatedRecord.resume_text,
      }).eq('id', id);
    }
  } catch (err) {
    console.warn('Notice: Supabase update during reprocess returned:', err);
  }

  await recordAdminAudit({
    action: 'REPROCESS',
    admin_email: adminEmail,
    target_id: id,
    target_name: existing.filename,
    details: `Re-analyzed and rescored resume ${existing.filename} (Score: ${existing.ats_score} -> ${updatedRecord.ats_score})`,
    ip_address: ip,
  });

  return updatedRecord;
}

/**
 * Records an administrative action in the immutable audit log.
 */
export async function recordAdminAudit(
  entry: Omit<AdminAuditLogEntry, 'id' | 'created_at'>
): Promise<AdminAuditLogEntry> {
  const newEntry: AdminAuditLogEntry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...entry,
    created_at: new Date().toISOString(),
  };

  const list = loadLocalAudits();
  list.unshift(newEntry);
  saveLocalAudits(list);

  return newEntry;
}

/**
 * Returns recent administrative audit logs.
 */
export async function getAdminAuditLogs(limit = 100): Promise<AdminAuditLogEntry[]> {
  const list = loadLocalAudits();
  return list.slice(0, limit);
}
