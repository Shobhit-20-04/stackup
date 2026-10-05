'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getCurrentUser, signOutUser } from '@/lib/auth/session';
import { getLocalQuizAttempts, getLocalSectionProgress } from '@/lib/services/progress';
import { 
  Flame, 
  FileCheck2, 
  TrendingUp, 
  Clock, 
  LogOut, 
  Calendar, 
  Award, 
  Loader2,
  Database
} from 'lucide-react';
import CredentialsModal from '@/components/CredentialsModal';
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Area,
  AreaChart 
} from 'recharts';

interface ProfileData {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email?: string;
  phone?: string | null;
  created_at: string;
}

interface ProgressItem {
  section_name: string;
  slug: string;
  percent: number;
  completed_items: number;
  total_items: number;
  color: string;
}

interface QuizAttempt {
  id: string;
  topic: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

interface ResumeAnalysisItem {
  id: string;
  filename: string;
  ats_score: number;
  created_at: string;
  status: 'Reviewed' | 'Action Required' | 'Good Match';
}

interface DbQuizAttempt {
  id: string;
  score: number;
  total: number;
  attempted_at: string;
  topics?: { title?: string } | null;
}

interface DbResumeAnalysis {
  id: string;
  filename: string;
  ats_score: number;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  
  // Progress across core sections
  const [progressList, setProgressList] = useState<ProgressItem[]>([
    { section_name: 'Quantitative & Logical Aptitude', slug: 'aptitude', percent: 65, completed_items: 26, total_items: 40, color: 'bg-blue-600' },
    { section_name: 'Core CS (OS, DBMS, CN, OOPs)', slug: 'core-cs', percent: 45, completed_items: 18, total_items: 40, color: 'bg-purple-600' },
    { section_name: 'DSA Curated Hub', slug: 'dsa', percent: 30, completed_items: 45, total_items: 150, color: 'bg-emerald-600' },
  ]);

  // Quiz score history for Recharts
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([
    { id: '1', topic: 'P&C and Probability', score: 8, total: 10, percentage: 80, date: '18 Sep' },
    { id: '2', topic: 'Processes & Threads (OS)', score: 7, total: 10, percentage: 70, date: '19 Sep' },
    { id: '3', topic: 'SQL & Normalization', score: 9, total: 10, percentage: 90, date: '20 Sep' },
    { id: '4', topic: 'Two Pointers (DSA)', score: 6, total: 10, percentage: 60, date: '21 Sep' },
    { id: '5', topic: 'TCP/IP Handshake', score: 8, total: 10, percentage: 80, date: '22 Sep' },
    { id: '6', topic: 'Sliding Window', score: 10, total: 10, percentage: 100, date: '23 Sep' },
  ]);

  // Resume analysis history
  const [resumeHistory, setResumeHistory] = useState<ResumeAnalysisItem[]>([
    { id: '1', filename: 'Resume_SDE_2026.pdf', ats_score: 84, created_at: '22 Sep 2026', status: 'Good Match' },
    { id: '2', filename: 'Shobhit_Backend_CV.pdf', ats_score: 68, created_at: '15 Sep 2026', status: 'Action Required' },
  ]);

  // Streak days
  const streakDays = [
    { day: 'Thu', active: true },
    { day: 'Fri', active: true },
    { day: 'Sat', active: true },
    { day: 'Sun', active: true },
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
  ];

  useEffect(() => {
    async function loadUserData() {
      try {
        const activeUser = await getCurrentUser();

        if (!activeUser) {
          // If not logged in, redirect to login
          router.push('/login?redirect=/profile');
          return;
        }

        const supabase = createClient();
        type ProfileRowType = {
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
        };
        let profileRow: ProfileRowType | null = null;

        try {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', activeUser.id)
            .maybeSingle();
          if (profileData) {
            profileRow = profileData as ProfileRowType;
          }
        } catch {
          // ignore error if supabase is offline
        }

        setProfile({
          id: activeUser.id,
          full_name: profileRow?.full_name || activeUser.full_name || 'StackUp Student',
          avatar_url: profileRow?.avatar_url || activeUser.avatar_url || null,
          email: activeUser.email,
          phone: profileRow?.phone || activeUser.phone,
          created_at: profileRow?.created_at || '2026-09-23T00:00:00.000Z',
        });

        // Check local storage attempts first or merge with db
        const localAttempts = getLocalQuizAttempts();
        if (localAttempts.length > 0) {
          const mappedLocal: QuizAttempt[] = localAttempts.map((la) => ({
            id: la.id,
            topic: la.topicTitle,
            score: la.score,
            total: la.total,
            percentage: la.percentage,
            date: new Date(la.attemptedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
          }));
          setQuizHistory((prev) => [...prev, ...mappedLocal].slice(-10));
        }

        // Dynamically update section progress
        const aptProgress = getLocalSectionProgress('aptitude', 65);
        const csProgress = getLocalSectionProgress('core-cs', 45);
        setProgressList([
          { section_name: 'Quantitative & Logical Aptitude', slug: 'aptitude', percent: aptProgress, completed_items: Math.round((aptProgress / 100) * 40), total_items: 40, color: 'bg-blue-600' },
          { section_name: 'Core CS (OS, DBMS, CN, OOPs)', slug: 'core-cs', percent: csProgress, completed_items: Math.round((csProgress / 100) * 40), total_items: 40, color: 'bg-purple-600' },
          { section_name: 'DSA Curated Hub', slug: 'dsa', percent: 30, completed_items: 45, total_items: 150, color: 'bg-emerald-600' },
        ]);

        // Try to fetch real quiz attempts from database
        try {
          const { data: attempts } = await supabase
            .from('quiz_attempts')
            .select('id, score, total, attempted_at, topics(title)')
            .eq('user_id', activeUser.id)
            .order('attempted_at', { ascending: true })
            .limit(10);

          if (attempts && attempts.length > 0) {
            const rawAttempts = attempts as unknown as DbQuizAttempt[];
            const mappedAttempts: QuizAttempt[] = rawAttempts.map((a) => ({
              id: a.id,
              topic: a.topics?.title || 'Quiz Topic',
              score: a.score,
              total: a.total,
              percentage: Math.round((a.score / a.total) * 100),
              date: new Date(a.attempted_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
            }));
            setQuizHistory(mappedAttempts);
          }
        } catch {
          // ignore if supabase is offline
        }

        // Check local storage for resume analyses
        if (typeof window !== 'undefined') {
          const localResRaw = localStorage.getItem('stackup_local_resumes');
          if (localResRaw) {
            try {
              const parsed = JSON.parse(localResRaw);
              if (Array.isArray(parsed) && parsed.length > 0) {
                const mappedLocal: ResumeAnalysisItem[] = parsed.map((r: { id: string; filename: string; ats_score: number; created_at: string }) => ({
                  id: r.id,
                  filename: r.filename,
                  ats_score: r.ats_score,
                  created_at: new Date(r.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                  status: r.ats_score >= 80 ? 'Good Match' : r.ats_score >= 60 ? 'Reviewed' : 'Action Required',
                }));
                setResumeHistory((prev) => [...mappedLocal, ...prev].slice(0, 10));
              }
            } catch {
              // ignore
            }
          }
        }

        // Try to fetch real resume analyses from database
        try {
          const { data: analyses } = await supabase
            .from('resume_analyses')
            .select('id, filename, ats_score, created_at')
            .eq('user_id', activeUser.id)
            .order('created_at', { ascending: false });

          if (analyses && analyses.length > 0) {
            const rawAnalyses = analyses as unknown as DbResumeAnalysis[];
            setResumeHistory(
              rawAnalyses.map((a) => ({
                id: a.id,
                filename: a.filename,
                ats_score: a.ats_score,
                created_at: new Date(a.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                status: a.ats_score >= 80 ? 'Good Match' : a.ats_score >= 60 ? 'Reviewed' : 'Action Required',
              }))
            );
          }
        } catch {
          // ignore if supabase is offline
        }
      } catch (err) {
        console.error('Error loading profile data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [router]);

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="text-sm text-zinc-500 font-medium">Loading your profile dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center text-white text-2xl font-extrabold uppercase shadow-lg shadow-indigo-500/20 overflow-hidden flex-shrink-0">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              profile?.full_name?.charAt(0) || 'U'
            )}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                {profile?.full_name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Active Student
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {profile?.email || profile?.phone || 'Connected via Supabase Auth'}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-zinc-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Recently'}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Pro Prep Track</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => setCredentialsModalOpen(true)}
            className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Database className="w-4 h-4 text-indigo-500" />
            <span>Connect Supabase / Keys</span>
          </button>
          <button
            onClick={handleSignOut}
            className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Grid: Streak Tracker & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak Tracker Card */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Daily Study Streak
              </span>
              <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                <Flame className="w-5 h-5 animate-bounce" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">7</span>
              <span className="text-sm font-semibold text-zinc-500">Days Active</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Keep solving quizzes daily to preserve your streak multiplier!
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            {streakDays.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    item.active
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm shadow-orange-500/30'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                  }`}
                >
                  ✓
                </div>
                <span className="text-[10px] text-zinc-400">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quizzes Taken Stat */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Quizzes Attempted
              </span>
              <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">
                {quizHistory.length}
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                80% Avg. Score
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Scored quizzes across Aptitude and Core CS topics.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Latest attempt: {quizHistory[quizHistory.length - 1]?.date || 'Today'}</span>
          </div>
        </div>

        {/* ATS Score Benchmark */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Latest ATS Benchmark
              </span>
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">
                {resumeHistory[0]?.ats_score ?? 84}
              </span>
              <span className="text-sm font-semibold text-zinc-500">/ 100</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Target &gt;80 score for Tier-1 ATS system passing rate.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400">
            <span>Analyzed file: {resumeHistory[0]?.filename || 'None yet'}</span>
          </div>
        </div>
      </div>

      {/* Per-Section Progress Bars */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            Curriculum Completion Progress
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Real-time track of notes read, quizzes submitted, and algorithms solved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressList.map((item) => (
            <div
              key={item.slug}
              className="p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {item.section_name}
                </span>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 ml-2">
                  {item.percent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{item.completed_items} of {item.total_items} complete</span>
                <span className="capitalize">{item.slug}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Score History Chart (Recharts) */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Quiz Score Performance History
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Score trajectory across consecutive timed quiz attempts (%)
            </p>
          </div>
          <div className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            Last {quizHistory.length} Attempts
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={quizHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
              <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} />
              <YAxis domain={[0, 100]} stroke="#71717a" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: '#27272a',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '0.75rem',
                }}
                formatter={(value: unknown) => [`${value}%`, 'Score']}
                labelFormatter={(_label, payload) => {
                  if (payload && payload[0]) {
                    return `${payload[0].payload.topic} (${payload[0].payload.date})`;
                  }
                  return '';
                }}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scoreGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resume Analysis History */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            Resume Analysis History
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Past resumes processed through the Claude ATS Diagnostic Engine
          </p>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {resumeHistory.map((item) => (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  <FileCheck2 className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {item.filename}
                  </div>
                  <div className="text-xs text-zinc-400">
                    Scored on {item.created_at}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">
                    {item.ats_score}/100
                  </div>
                  <span
                    className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.ats_score >= 80
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CredentialsModal
        isOpen={credentialsModalOpen}
        onClose={() => setCredentialsModalOpen(false)}
      />
    </div>
  );
}
