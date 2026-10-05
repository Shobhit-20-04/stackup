import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'AFCy57z0l6r2hrtn';

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization') || '';
  const adminKey = req.headers.get('x-admin-key') || '';
  const queryKey = req.nextUrl.searchParams.get('key') || '';

  if (adminKey === ADMIN_PASSCODE || queryKey === ADMIN_PASSCODE) {
    return true;
  }

  if (authHeader.startsWith('Bearer ') && authHeader.slice(7) === ADMIN_PASSCODE) {
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

    const resumeList = (resumes as unknown as UploadedResumeRow[]) || [];
    const profileList = profiles || [];
    const quizList = quizzes || [];

    // Calculate aggregated metrics
    const totalResumes = resumeList.length;
    const avgScore = totalResumes > 0
      ? Math.round(resumeList.reduce((acc, r) => acc + (r.ats_score || 0), 0) / totalResumes)
      : 0;

    const highPerformers = resumeList.filter((r) => (r.ats_score || 0) >= 75).length;
    const needsOptimization = resumeList.filter((r) => (r.ats_score || 0) < 65).length;

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
        totalQuizzes: quizList.length,
        avgScore,
        highPerformers,
        needsOptimization,
      },
      topSkills,
      resumes: resumeList,
      profiles: profileList,
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
