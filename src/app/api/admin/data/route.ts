import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { fetchLoginAudits } from '@/lib/services/login-audit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let runtimeAdminPasscode: string | null = null;

export function getActiveAdminPasscode(): string {
  return runtimeAdminPasscode || process.env.ADMIN_PASSCODE || 'AFCy57z0l6r2hrtn';
}

export function setActiveAdminPasscode(key: string): void {
  runtimeAdminPasscode = key;
}

function isAuthorized(req: NextRequest): boolean {
  const activePasscode = getActiveAdminPasscode();
  // Valid admin keys: active configured key, fallback default, and memorable master key
  const validKeys = [
    activePasscode,
    'AFCy57z0l6r2hrtn',
    'stackup2026', // Memorable master passcode for admin
  ].filter(Boolean);

  const authHeader = req.headers.get('authorization') || '';
  const adminKey = req.headers.get('x-admin-key') || '';
  const queryKey = req.nextUrl.searchParams.get('key') || '';

  if (validKeys.includes(adminKey) || validKeys.includes(queryKey)) {
    return true;
  }

  if (authHeader.startsWith('Bearer ') && validKeys.includes(authHeader.slice(7))) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  try {
    const authorized = isAuthorized(req);
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized. Admin passcode required.' }, { status: 401 });
    }

    const supabase = await createClient();

    // 1. Fetch all uploaded resumes from Supabase
    const { data: resumes, error: resumeErr } = await supabase
      .from('uploaded_resumes')
      .select('*')
      .order('created_at', { ascending: false });

    if (resumeErr) {
      console.error('Admin fetch resumes error:', resumeErr);
    }

    // 2. Fetch all registered user profiles
    const { data: profiles, error: profileErr } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profileErr) {
      console.error('Admin fetch profiles error:', profileErr);
    }

    // 3. Fetch quiz attempts
    const { data: quizzes, error: quizErr } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('attempted_at', { ascending: false });

    if (quizErr) {
      console.error('Admin fetch quizzes error:', quizErr);
    }

    interface UploadedResumeRow {
      id: string;
      filename: string;
      file_size: number | null;
      mime_type: string | null;
      resume_text: string | null;
      ats_score: number;
      user_id: string | null;
      user_email: string | null;
      ip_address: string | null;
      created_at: string;
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

    interface ProfileRow {
      id: string;
      full_name: string | null;
      avatar_url: string | null;
      phone: string | null;
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

    const rawResumeList = (resumes as unknown as UploadedResumeRow[]) || [];
    // Strictly filter out dummy/mock test seeds (@example.com, Alex Smith, John Doe) so admin only sees real user uploads
    const resumeList = rawResumeList
      .filter((r) => {
        const email = (r.user_email || '').toLowerCase();
        const fn = (r.filename || '').toLowerCase();
        if (email.includes('@example.com')) return false;
        if (fn.includes('alex_smith') || fn.includes('john_doe') || fn.includes('direct_test')) return false;
        return true;
      })
      .map((r) => {
        // Sanitize any residual raw PDF bytecode stream tokens into clean text
        let cleanText = r.resume_text || '';
        if (cleanText.includes('/Length') && (cleanText.includes('stream') || cleanText.includes('BT') || cleanText.includes('endstream'))) {
          const matches = cleanText.match(/\(([^)]+)\)/g);
          if (matches && matches.length >= 2) {
            cleanText = matches.map((m) => m.slice(1, -1).trim()).join('\n\n');
          }
        }
        return {
          ...r,
          resume_text: cleanText,
        };
      });

    // Strictly filter out mock/test student profiles
    const rawProfiles = (profiles as unknown as ProfileRow[]) || [];
    const profileList = rawProfiles.filter((p) => {
      const name = (p.full_name || '').toLowerCase();
      const phone = (p.phone || '').toLowerCase();
      if (name.includes('alex smith') || name.includes('john doe') || name.includes('test student')) return false;
      if (phone.includes('1234567890')) return false;
      return true;
    });

    const rawQuizzes = (quizzes as unknown as QuizAttemptRow[]) || [];
    const quizList = rawQuizzes.filter((q) => q.score !== null && q.score !== undefined);

    // Calculate aggregated metrics
    const totalResumes = resumeList.length;
    const avgScore = totalResumes > 0
      ? Math.round(resumeList.reduce((acc, r) => acc + (r.ats_score || 0), 0) / totalResumes)
      : 0;

    const highPerformers = resumeList.filter((r) => (r.ats_score || 0) >= 75).length;
    const needsOptimization = resumeList.filter((r) => (r.ats_score || 0) < 65).length;

    // 4. Fetch Real User Authentication & Access Audit Logs
    const loginLogs = await fetchLoginAudits();

    // Count skills frequencies across all uploaded resumes
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
      .slice(0, 10);

    return NextResponse.json({
      metrics: {
        totalResumes,
        totalUsers: profileList.length,
        totalLogins: loginLogs.length,
        totalQuizzes: quizList.length,
        avgScore,
        highPerformers,
        needsOptimization,
      },
      topSkills,
      resumes: resumeList,
      profiles: profileList,
      loginLogs,
      quizzes: quizList,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch admin data';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Resume ID is required.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('uploaded_resumes').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Resume deleted successfully.' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete resume';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { action, newPasscode } = body;

    // Action 1: Change Admin Authentication Passcode Key
    if (action === 'change_passcode') {
      if (!newPasscode || typeof newPasscode !== 'string' || newPasscode.trim().length < 6) {
        return NextResponse.json(
          { error: 'The new admin passcode must be at least 6 characters long.' },
          { status: 400 }
        );
      }

      const cleanPasscode = newPasscode.trim();
      setActiveAdminPasscode(cleanPasscode);

      return NextResponse.json({
        success: true,
        message: 'Admin authentication key updated successfully! Use your new key to unlock the portal.',
        activeKey: cleanPasscode,
      });
    }

    // Action 2: Purge Legacy Testing & Seed Records
    if (action === 'purge_test_records') {
      const supabase = await createClient();
      await supabase.from('uploaded_resumes').delete().ilike('user_email', '%@example.com%');
      await supabase.from('uploaded_resumes').delete().ilike('filename', '%direct_test%');
      await supabase.from('uploaded_resumes').delete().ilike('filename', '%alex_smith%');
      await supabase.from('uploaded_resumes').delete().ilike('filename', '%john_doe%');
      return NextResponse.json({ success: true, message: 'All test and seed dummy records purged successfully.' });
    }

    return NextResponse.json({ error: 'Unknown action requested.' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to process admin action';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
