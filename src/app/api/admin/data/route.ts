import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { fetchLoginAudits, type LoginAuditEntry } from '@/lib/services/login-audit';
import { verifyAdminRequest, getAdminPasscode, getAdminEmail } from '@/lib/security/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';
import { persistAdminPasscodeToEnv } from '@/lib/security/admin-reset-store';
import {
  getUploadedResumes,
  deleteUploadedResume,
  deleteUploadedResumes,
  purgeTestRecords,
  getAdminAuditLogs,
  extractCandidateName,
} from '@/lib/services/resume/resume-repository';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function getActiveAdminPasscode(): string {
  return getAdminPasscode();
}

export function setActiveAdminPasscode(key: string): void {
  persistAdminPasscodeToEnv(key);
}

async function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceRoleKey && !serviceRoleKey.includes('placeholder')) {
    return createSupabaseAdmin(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return await createClient();
}

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-data-${ip}`, 30, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Please wait ${rateCheck.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    const authorized = verifyAdminRequest(req);
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized. Admin authorization required.' }, { status: 401 });
    }

    const supabase = await getSupabaseAdminClient();

    // Concurrently fetch genuine uploaded resumes, user profiles, login audits, quizzes, and admin logs
    const [
      allResumes,
      { data: profiles, error: profileErr },
      loginLogs,
      { data: quizzes, error: quizErr },
      auditLogs,
    ] = await Promise.all([
      getUploadedResumes(),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      fetchLoginAudits(),
      supabase.from('quiz_attempts').select('*').order('attempted_at', { ascending: false }),
      getAdminAuditLogs(30),
    ]);

    if (profileErr) {
      console.warn('Notice: Admin fetch profiles error:', profileErr);
    }
    if (quizErr) {
      console.warn('Notice: Admin fetch quizzes error:', quizErr);
    }

    interface ProfileRow {
      id: string;
      full_name: string | null;
      email?: string | null;
      avatar_url: string | null;
      phone: string | null;
      last_sign_in_at?: string | null;
      created_at: string;
      updated_at: string;
    }

    interface QuizAttemptRow {
      id: string;
      user_id: string;
      topic_id: string;
      score: number;
      total_questions: number;
      attempted_at: string;
    }

    // Keep dashboard payload lightweight by omitting raw binary data from list items
    const resumeList = allResumes.map((r) => {
      let cleanText = r.resume_text || '';
      // Sanitize any residual raw PDF bytecode stream tokens into clean text
      if (cleanText.includes('/Length') && (cleanText.includes('stream') || cleanText.includes('BT') || cleanText.includes('endstream'))) {
        const matches = cleanText.match(/\(([^)]+)\)/g);
        if (matches && matches.length >= 2) {
          cleanText = matches.map((m) => m.slice(1, -1).trim()).join('\n\n');
        }
      }

      const candidateName = r.candidate_name || extractCandidateName(cleanText, r.user_email);

      return {
        ...r,
        candidate_name: candidateName,
        resume_text: cleanText,
        has_file_data: Boolean(r.file_data || r.has_file_data),
        file_data: undefined, // Strip large base64 payload from listing response
      };
    });

    // Synthesize registered student profiles from verified candidate activity & profiles table
    interface EnrichedProfile {
      id: string;
      full_name: string;
      email: string;
      avatar_url: string | null;
      phone: string | null;
      created_at: string;
      updated_at: string;
      last_sign_in_at: string | null;
      resumes_count: number;
      latest_score: number | null;
    }

    const profileMap = new Map<string, EnrichedProfile>();

    // A. Direct database profiles
    const rawProfiles = (profiles as unknown as ProfileRow[]) || [];
    for (const p of rawProfiles) {
      const email = (p.email || (p as unknown as { user_email?: string }).user_email || '').toLowerCase().trim();
      const name = (p.full_name || '').trim();
      if (email.includes('@example.com') || email.includes('@domain.com') || email.includes('test_audit')) continue;
      const key = email || p.id;
      profileMap.set(key, {
        id: p.id,
        full_name: name || (email ? email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) : 'Student Account'),
        email: email || '—',
        avatar_url: p.avatar_url,
        phone: p.phone,
        created_at: p.created_at,
        updated_at: p.updated_at,
        last_sign_in_at: p.last_sign_in_at || null,
        resumes_count: 0,
        latest_score: null,
      });
    }

    // B. Real candidate accounts from genuine uploaded resumes
    for (const r of resumeList) {
      const email = (r.user_email || '').trim().toLowerCase();
      if (!email || email.includes('@example.com') || email.includes('@domain.com') || email.includes('test_audit')) continue;

      const candidateName = r.candidate_name || extractCandidateName(r.resume_text, email);

      const existing = profileMap.get(email);
      if (existing) {
        existing.resumes_count += 1;
        if (r.ats_score !== undefined && r.ats_score !== null) {
          existing.latest_score = Math.max(existing.latest_score || 0, r.ats_score);
        }
        if (new Date(r.created_at).getTime() < new Date(existing.created_at).getTime()) {
          existing.created_at = r.created_at;
        }
        if (existing.full_name === 'Student Account') {
          existing.full_name = candidateName;
        }
      } else {
        profileMap.set(email, {
          id: r.user_id || `usr-${r.id.substring(0, 8)}`,
          full_name: candidateName,
          email,
          avatar_url: null,
          phone: null,
          created_at: r.created_at,
          updated_at: r.created_at,
          last_sign_in_at: null,
          resumes_count: 1,
          latest_score: r.ats_score,
        });
      }
    }

    // C. Real candidates from login audits
    for (const log of loginLogs) {
      const email = (log.email || '').trim().toLowerCase();
      if (!email || email.includes('@example.com') || email.includes('@domain.com') || email.includes('test_audit')) continue;

      const existing = profileMap.get(email);
      if (existing) {
        if (log.full_name && (existing.full_name === 'Student Account' || existing.full_name === email.split('@')[0])) {
          existing.full_name = log.full_name;
        }
        if (log.created_at) {
          if (!existing.last_sign_in_at || new Date(log.created_at).getTime() > new Date(existing.last_sign_in_at).getTime()) {
            existing.last_sign_in_at = log.created_at;
          }
        }
        if (new Date(log.created_at).getTime() < new Date(existing.created_at).getTime()) {
          existing.created_at = log.created_at;
        }
      } else {
        profileMap.set(email, {
          id: log.user_id || `usr-${log.id.substring(0, 8)}`,
          full_name: log.full_name || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
          email,
          avatar_url: null,
          phone: null,
          created_at: log.created_at,
          updated_at: log.created_at,
          last_sign_in_at: log.created_at,
          resumes_count: 0,
          latest_score: null,
        });
      }
    }

    // D. Direct Supabase auth.users synchronization
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let authUsersCount = 0;
    let hasServiceRole = false;

    if (supabaseUrl && serviceRoleKey && !serviceRoleKey.includes('placeholder')) {
      try {
        const adminClient = createSupabaseAdmin(supabaseUrl, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });
        const { data: authData, error: authErr } = await adminClient.auth.admin.listUsers();
        if (!authErr && authData?.users) {
          hasServiceRole = true;
          authUsersCount = authData.users.length;
          for (const u of authData.users) {
            const email = (u.email || '').trim().toLowerCase();
            if (!email || email.includes('@example.com') || email.includes('@domain.com') || email.includes('test_audit')) continue;

            const metadata = (u.user_metadata || {}) as Record<string, string>;
            const candidateName =
              metadata.full_name ||
              metadata.name ||
              email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

            const existing = profileMap.get(email);
            if (existing) {
              existing.id = u.id;
              if (existing.full_name === 'Student Account') {
                existing.full_name = candidateName;
              }
              if (u.last_sign_in_at) {
                existing.last_sign_in_at = u.last_sign_in_at;
              }
            } else {
              profileMap.set(email, {
                id: u.id,
                full_name: candidateName,
                email,
                avatar_url: metadata.avatar_url || null,
                phone: u.phone || null,
                created_at: u.created_at,
                updated_at: u.updated_at || u.created_at,
                last_sign_in_at: u.last_sign_in_at || null,
                resumes_count: 0,
                latest_score: null,
              });
            }

            if (u.last_sign_in_at) {
              const provider = (u.app_metadata?.provider === 'google' ? 'Google OAuth' : 'Email & Password') as LoginAuditEntry['auth_method'];
              loginLogs.push({
                id: `auth-${u.id.substring(0, 8)}`,
                user_id: u.id,
                email,
                full_name: candidateName,
                auth_method: provider,
                ip_address: 'Verified Supabase Session',
                user_agent: 'Cloud Authentication Gateway',
                created_at: u.last_sign_in_at,
              });
            }
          }
        }
      } catch (err) {
        console.warn('Notice: fetching auth.admin.listUsers returned:', err);
      }
    }

    loginLogs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const profileList = Array.from(profileMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const rawQuizzes = (quizzes as unknown as QuizAttemptRow[]) || [];
    const quizList = rawQuizzes.filter((q) => q.score !== null && q.score !== undefined);

    // Calculate aggregated metrics from real resume data
    const totalResumes = resumeList.length;
    const avgScore = totalResumes > 0
      ? Math.round(resumeList.reduce((acc, r) => acc + (r.ats_score || 0), 0) / totalResumes)
      : 0;

    const highPerformers = resumeList.filter((r) => (r.ats_score || 0) >= 75).length;
    const needsOptimization = resumeList.filter((r) => (r.ats_score || 0) < 65).length;
    const passCount = resumeList.filter((r) => (r.ats_score || 0) >= 65).length;
    const passRate = totalResumes > 0 ? Math.round((passCount / totalResumes) * 100) : 0;

    // Score distribution
    const scoreDistribution = {
      APlus: resumeList.filter((r) => (r.ats_score || 0) >= 88).length,
      A: resumeList.filter((r) => (r.ats_score || 0) >= 78 && (r.ats_score || 0) < 88).length,
      B: resumeList.filter((r) => (r.ats_score || 0) >= 66 && (r.ats_score || 0) < 78).length,
      C: resumeList.filter((r) => (r.ats_score || 0) >= 52 && (r.ats_score || 0) < 66).length,
      D: resumeList.filter((r) => (r.ats_score || 0) < 52).length,
    };

    // Aggregate skills frequency across all real uploaded resumes
    const skillCounts: Record<string, number> = {};
    for (const r of resumeList) {
      const matched = r.analysis?.matched_keywords || [];
      if (Array.isArray(matched)) {
        for (const s of matched) {
          skillCounts[s] = (skillCounts[s] || 0) + 1;
        }
      }
    }

    const topSkills = Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);

    return NextResponse.json({
      metrics: {
        totalResumes,
        totalUsers: profileList.length,
        totalLogins: loginLogs.length,
        totalQuizzes: quizList.length,
        avgScore,
        highPerformers,
        needsOptimization,
        passRate,
        scoreDistribution,
        hasServiceRole,
        authUsersCount,
      },
      topSkills,
      resumes: resumeList,
      profiles: profileList,
      loginLogs,
      quizzes: quizList,
      auditLogs,
    });
  } catch (err: unknown) {
    console.error('Failed to fetch admin data:', err);
    return NextResponse.json({ error: 'Failed to fetch admin data due to an unexpected server error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-delete-${ip}`, 25, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }

    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const id = typeof body?.id === 'string' ? body.id.trim() : '';

    if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: 'Valid Resume UUID is required.' }, { status: 400 });
    }

    const adminEmail = getAdminEmail();
    await deleteUploadedResume(id, adminEmail, ip);

    return NextResponse.json({ success: true, message: 'Resume permanently deleted.' });
  } catch (err: unknown) {
    console.error('Failed to delete resume:', err);
    return NextResponse.json({ error: 'Failed to delete resume due to an unexpected server error.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-post-${ip}`, 20, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }

    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { action, newPasscode, ids } = body;
    const adminEmail = getAdminEmail();

    // Action 1: Change Admin Authentication Passcode Key
    if (action === 'change_passcode') {
      if (!newPasscode || typeof newPasscode !== 'string' || newPasscode.trim().length < 8) {
        return NextResponse.json(
          { error: 'The new admin passcode must be at least 8 characters long.' },
          { status: 400 }
        );
      }

      const cleanPasscode = newPasscode.trim();
      setActiveAdminPasscode(cleanPasscode);

      return NextResponse.json({
        success: true,
        message: 'Admin authentication key updated in server process memory! For permanent persistence, set ADMIN_PASSCODE in your Vercel/hosting dashboard.',
      });
    }

    // Action 2: Purge Legacy Testing & Seed Records
    if (action === 'purge_test_records') {
      const { purgedCount } = await purgeTestRecords(adminEmail, ip);
      return NextResponse.json({
        success: true,
        message: `All test and seed dummy records purged successfully (${purgedCount} cleaned).`,
        purgedCount,
      });
    }

    // Action 3: Bulk Delete Resumes
    if (action === 'bulk_delete') {
      if (!Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json({ error: 'Array of resume IDs is required for bulk delete.' }, { status: 400 });
      }

      const { deletedCount } = await deleteUploadedResumes(ids, adminEmail, ip);
      return NextResponse.json({
        success: true,
        message: `Successfully deleted ${deletedCount} candidate resume(s).`,
        deletedCount,
      });
    }

    // Action 4: Get Admin Audit Logs
    if (action === 'get_audit_logs') {
      const logs = await getAdminAuditLogs(100);
      return NextResponse.json({ success: true, logs });
    }

    return NextResponse.json({ error: 'Unknown action requested.' }, { status: 400 });
  } catch (err: unknown) {
    console.error('Failed to process admin action:', err);
    return NextResponse.json({ error: 'Failed to process admin action due to an unexpected server error.' }, { status: 500 });
  }
}
