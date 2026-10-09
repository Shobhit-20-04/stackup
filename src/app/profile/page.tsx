'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getCurrentUser, signOutUser, updateUserSession } from '@/lib/auth/session';
import { getLocalQuizAttempts, getSectionMetrics, type StoredAttempt } from '@/lib/services/progress';
import { 
  Flame, 
  FileCheck2, 
  TrendingUp, 
  Clock, 
  LogOut, 
  Calendar, 
  Award, 
  Loader2,
  BookOpen,
  Cpu,
  Code2,
  ArrowRight,
  Sparkles,
  Edit3,
  GraduationCap,
  Briefcase,
  X,
  CheckCircle2
} from 'lucide-react';
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
  target_role?: string | null;
  college?: string | null;
  grad_year?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
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
  rawDate: string;
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
  
  // Real progress across core sections (initialized dynamically from real data)
  const [progressList, setProgressList] = useState<ProgressItem[]>([]);

  // Real quiz score history for Recharts (empty by default, loaded from user attempts)
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);

  // Real resume analysis history (empty by default, loaded from user uploads)
  const [resumeHistory, setResumeHistory] = useState<ResumeAnalysisItem[]>([]);

  // Real solved DSA problem count
  const [solvedDsaCount, setSolvedDsaCount] = useState(0);

  // Edit Profile Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFullName, setEditFullName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editTargetRole, setEditTargetRole] = useState('');
  const [editCollege, setEditCollege] = useState('');
  const [editGradYear, setEditGradYear] = useState('');
  const [editGithubUrl, setEditGithubUrl] = useState('');
  const [editLinkedinUrl, setEditLinkedinUrl] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null);

  const openEditModal = () => {
    if (profile) {
      setEditFullName(profile.full_name || '');
      setEditPhone(profile.phone || '');
      setEditTargetRole(profile.target_role || '');
      setEditCollege(profile.college || '');
      setEditGradYear(profile.grad_year || '');
      setEditGithubUrl(profile.github_url || '');
      setEditLinkedinUrl(profile.linkedin_url || '');
    }
    setProfileSaveSuccess(false);
    setProfileSaveError(null);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSavingProfile(true);
    setProfileSaveError(null);
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile.id,
          fullName: editFullName.trim(),
          phone: editPhone.trim(),
          targetRole: editTargetRole.trim(),
          college: editCollege.trim(),
          gradYear: editGradYear.trim(),
          githubUrl: editGithubUrl.trim(),
          linkedinUrl: editLinkedinUrl.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const updated = {
        full_name: editFullName.trim() || 'StackUp Student',
        phone: editPhone.trim() || null,
        target_role: editTargetRole.trim() || null,
        college: editCollege.trim() || null,
        grad_year: editGradYear.trim() || null,
        github_url: editGithubUrl.trim() || null,
        linkedin_url: editLinkedinUrl.trim() || null,
      };

      updateUserSession(updated);
      setProfile((prev) => (prev ? { ...prev, ...updated } : null));
      setProfileSaveSuccess(true);
      setTimeout(() => {
        setIsEditModalOpen(false);
        setProfileSaveSuccess(false);
      }, 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error updating profile';
      setProfileSaveError(msg);
    } finally {
      setIsSavingProfile(false);
    }
  };

  useEffect(() => {
    async function loadUserData() {
      try {
        const activeUser = await getCurrentUser();

        if (!activeUser) {
          router.push('/login?redirect=/profile');
          return;
        }

        const supabase = createClient();
        type ProfileRowType = {
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          target_role?: string | null;
          college?: string | null;
          grad_year?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
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
          target_role: profileRow?.target_role || activeUser.target_role || null,
          college: profileRow?.college || activeUser.college || null,
          grad_year: profileRow?.grad_year || activeUser.grad_year || null,
          github_url: profileRow?.github_url || activeUser.github_url || null,
          linkedin_url: profileRow?.linkedin_url || activeUser.linkedin_url || null,
          created_at: profileRow?.created_at || new Date().toISOString(),
        });

        // 1. Calculate REAL Section Progress from actual user activity
        const aptMetrics = getSectionMetrics('aptitude');
        const csMetrics = getSectionMetrics('core-cs');
        const dsaMetrics = getSectionMetrics('dsa');
        setSolvedDsaCount(dsaMetrics.completed);

        setProgressList([
          { 
            section_name: 'Quantitative & Logical Aptitude', 
            slug: 'aptitude', 
            percent: aptMetrics.percent, 
            completed_items: aptMetrics.completed, 
            total_items: aptMetrics.total, 
            color: 'bg-blue-600' 
          },
          { 
            section_name: 'Core CS (OS, DBMS, CN, OOPs)', 
            slug: 'core-cs', 
            percent: csMetrics.percent, 
            completed_items: csMetrics.completed, 
            total_items: csMetrics.total, 
            color: 'bg-sky-600' 
          },
          { 
            section_name: 'DSA Curated Hub', 
            slug: 'dsa', 
            percent: dsaMetrics.percent, 
            completed_items: dsaMetrics.completed, 
            total_items: dsaMetrics.total, 
            color: 'bg-emerald-600' 
          },
        ]);

        // 2. Fetch REAL Quiz Attempts (LocalStorage + Supabase)
        const localAttempts = getLocalQuizAttempts();
        const mappedLocal: QuizAttempt[] = localAttempts.map((la: StoredAttempt) => ({
          id: la.id,
          topic: la.topicTitle,
          score: la.score,
          total: la.total,
          percentage: la.percentage,
          date: new Date(la.attemptedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
          rawDate: la.attemptedAt,
        }));

        let combinedAttempts: QuizAttempt[] = mappedLocal;

        try {
          const { data: dbAttempts } = await supabase
            .from('quiz_attempts')
            .select('id, score, total, attempted_at, topics(title)')
            .eq('user_id', activeUser.id)
            .order('attempted_at', { ascending: true })
            .limit(20);

          if (dbAttempts && dbAttempts.length > 0) {
            const rawAttempts = dbAttempts as unknown as DbQuizAttempt[];
            const mappedDb: QuizAttempt[] = rawAttempts.map((a) => ({
              id: a.id,
              topic: a.topics?.title || 'Quiz Topic',
              score: a.score,
              total: a.total,
              percentage: Math.round((a.score / a.total) * 100),
              date: new Date(a.attempted_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
              rawDate: a.attempted_at,
            }));
            
            // Merge & deduplicate by ID
            const existingIds = new Set(mappedLocal.map((m) => m.id));
            const uniqueDb = mappedDb.filter((d) => !existingIds.has(d.id));
            combinedAttempts = [...mappedLocal, ...uniqueDb].sort(
              (a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
            );
          }
        } catch {
          // ignore if supabase is offline
        }

        setQuizHistory(combinedAttempts);

        // 3. Fetch REAL Resume Analyses (LocalStorage + Supabase)
        let loadedResumes: ResumeAnalysisItem[] = [];

        if (typeof window !== 'undefined') {
          const localResRaw = localStorage.getItem('stackup_local_resumes');
          if (localResRaw) {
            try {
              const parsed = JSON.parse(localResRaw);
              if (Array.isArray(parsed) && parsed.length > 0) {
                loadedResumes = parsed.map((r: { id: string; filename: string; ats_score: number; created_at: string }) => ({
                  id: r.id,
                  filename: r.filename,
                  ats_score: r.ats_score,
                  created_at: new Date(r.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
                  status: (r.ats_score >= 80 ? 'Good Match' : r.ats_score >= 60 ? 'Reviewed' : 'Action Required') as ResumeAnalysisItem['status'],
                }));
              }
            } catch {
              // ignore
            }
          }
        }

        try {
          const { data: analyses } = await supabase
            .from('resume_analyses')
            .select('id, filename, ats_score, created_at')
            .eq('user_id', activeUser.id)
            .order('created_at', { ascending: false });

          if (analyses && analyses.length > 0) {
            const rawAnalyses = analyses as unknown as DbResumeAnalysis[];
            const mappedDb = rawAnalyses.map((a) => ({
              id: a.id,
              filename: a.filename,
              ats_score: a.ats_score,
              created_at: new Date(a.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
              status: (a.ats_score >= 80 ? 'Good Match' : a.ats_score >= 60 ? 'Reviewed' : 'Action Required') as ResumeAnalysisItem['status'],
            }));

            const existingIds = new Set(loadedResumes.map((r) => r.id));
            const uniqueDb = mappedDb.filter((r) => !existingIds.has(r.id));
            loadedResumes = [...loadedResumes, ...uniqueDb];
          }
        } catch {
          // ignore if supabase is offline
        }

        setResumeHistory(loadedResumes);

      } catch (err) {
        console.error('Error loading profile data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [router]);

  // 4. Calculate 100% REAL 7-Day Activity Streak from user timestamps
  const { streakDays, streakCount } = useMemo(() => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const activityDateSet = new Set<string>();

    quizHistory.forEach((q) => {
      const d = new Date(q.rawDate || q.date);
      if (!isNaN(d.getTime())) {
        activityDateSet.add(d.toISOString().slice(0, 10));
      }
    });

    resumeHistory.forEach((r) => {
      const d = new Date(r.created_at);
      if (!isNaN(d.getTime())) {
        activityDateSet.add(d.toISOString().slice(0, 10));
      }
    });

    if (solvedDsaCount > 0) {
      activityDateSet.add(today.toISOString().slice(0, 10));
    }

    // Past 7 calendar days ending today
    const days: { day: string; active: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().slice(0, 10);
      days.push({
        day: daysOfWeek[d.getDay()],
        active: activityDateSet.has(dateKey),
      });
    }

    // Count consecutive active days
    let count = 0;
    const check = new Date(today);
    const todayKey = today.toISOString().slice(0, 10);

    if (activityDateSet.has(todayKey)) {
      while (activityDateSet.has(check.toISOString().slice(0, 10))) {
        count++;
        check.setDate(check.getDate() - 1);
      }
    } else {
      // Check if yesterday was active to count running streak
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (activityDateSet.has(yesterday.toISOString().slice(0, 10))) {
        check.setDate(check.getDate() - 1);
        while (activityDateSet.has(check.toISOString().slice(0, 10))) {
          count++;
          check.setDate(check.getDate() - 1);
        }
      }
    }

    return { streakDays: days, streakCount: count };
  }, [quizHistory, resumeHistory, solvedDsaCount]);

  // Average Quiz Score calculation
  const averageQuizScore = useMemo(() => {
    if (quizHistory.length === 0) return null;
    const sum = quizHistory.reduce((acc, q) => acc + q.percentage, 0);
    return Math.round(sum / quizHistory.length);
  }, [quizHistory]);

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="text-sm text-slate-500 font-medium">Loading your real profile metrics...</span>
      </div>
    );
  }

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : profile?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-extrabold uppercase shadow-lg shadow-blue-600/20 overflow-hidden flex-shrink-0">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {profile?.full_name || 'StackUp Student'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Verified Student
              </span>
              {profile?.target_role && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800 flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3 text-blue-500" />
                  <span>{profile.target_role}</span>
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {profile?.email || profile?.phone || 'Connected Session'}
            </p>
            {(profile?.college || profile?.github_url || profile?.linkedin_url) && (
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-600 dark:text-slate-300">
                {profile.college && (
                  <span className="flex items-center space-x-1 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                    <span>
                      {profile.college}
                      {profile.grad_year ? ` ('${profile.grad_year.slice(-2)})` : ''}
                    </span>
                  </span>
                )}
                {profile.github_url && (
                  <a
                    href={profile.github_url.startsWith('http') ? profile.github_url : `https://${profile.github_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url.startsWith('http') ? profile.linkedin_url : `https://${profile.linkedin_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63a1.63 1.63 0 0 0 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            )}
            <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Recently'}
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Prep Track</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={openEditModal}
            className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1e293b] transition-colors"
          >
            <Edit3 className="w-4 h-4 text-blue-500" />
            <span>Edit Profile</span>
          </button>
          <Link
            href="/dsa"
            className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors shadow-sm shadow-blue-600/20"
          >
            <Code2 className="w-4 h-4" />
            <span>Practice DSA</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Grid: Real Streak Tracker & Real Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak Tracker Card */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Daily Study Streak
              </span>
              <div className={`p-2 rounded-xl ${streakCount > 0 ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400' : 'bg-slate-100 dark:bg-[#1e293b] text-slate-400'}`}>
                <Flame className={`w-5 h-5 ${streakCount > 0 ? 'animate-bounce' : ''}`} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {streakCount}
              </span>
              <span className="text-sm font-semibold text-slate-500">
                {streakCount === 1 ? 'Day Active' : 'Days Active'}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {streakCount > 0 
                ? 'Great consistency! Keep solving daily quizzes to build your habit.'
                : 'Solve a quiz or scan your resume today to start your study streak!'}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {streakDays.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    item.active
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm shadow-orange-500/30'
                      : 'bg-slate-100 dark:bg-[#1e293b] text-slate-400'
                  }`}
                  title={`${item.day}: ${item.active ? 'Activity recorded' : 'No activity'}`}
                >
                  {item.active ? '✓' : '·'}
                </div>
                <span className="text-[10px] text-slate-400">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quizzes Taken Stat Card */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quizzes Attempted
              </span>
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {quizHistory.length}
              </span>
              {averageQuizScore !== null ? (
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {averageQuizScore}% Avg. Score
                </span>
              ) : (
                <span className="text-sm font-semibold text-slate-400">
                  0 Attempts Yet
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Scored quizzes across Aptitude and Core CS topics.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>
              Latest attempt:{' '}
              {quizHistory.length > 0 ? quizHistory[quizHistory.length - 1].date : 'None yet'}
            </span>
          </div>
        </div>

        {/* ATS Score Benchmark Card */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Latest ATS Benchmark
              </span>
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              {resumeHistory.length > 0 ? (
                <>
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {resumeHistory[0].ats_score}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ 100</span>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-slate-400">
                  Not Scanned
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Target &gt;80 score for Tier-1 ATS system passing rate.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 truncate">
            <span>
              {resumeHistory.length > 0 
                ? `File: ${resumeHistory[0].filename}` 
                : 'No resume analyzed yet'}
            </span>
          </div>
        </div>
      </div>

      {/* Per-Section Real Progress Bars */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Curriculum Completion Progress
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time track of topics tested in quizzes and algorithms solved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressList.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#1e293b]/50 hover:border-blue-500/40 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.section_name}
                </span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 ml-2">
                  {item.percent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{item.completed_items} of {item.total_items} complete</span>
                <span className="capitalize text-blue-600 dark:text-blue-400 flex items-center space-x-0.5 group-hover:translate-x-0.5 transition-transform">
                  <span>Practice</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quiz Score History Chart (Recharts) */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Quiz Score Performance History
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Score trajectory across your completed timed quiz attempts (%)
            </p>
          </div>
          {quizHistory.length > 0 && (
            <div className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-[#1e293b] px-3 py-1.5 rounded-lg self-start sm:self-auto">
              Last {quizHistory.length} Attempts
            </div>
          )}
        </div>

        {quizHistory.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quizHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
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
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                No Quizzes Attempted Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Take timed MCQ quizzes in Quantitative Aptitude or Core CS to view your historical score trajectory and accuracy curves here.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/aptitude"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Practice Aptitude</span>
              </Link>
              <Link
                href="/core-cs"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1e293b] transition-colors"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Practice Core CS</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Resume Analysis History */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Resume Analysis History
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Past resumes processed through the ATS Diagnostic Engine
            </p>
          </div>
          <Link
            href="/resume-checker"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scan New Resume</span>
          </Link>
        </div>

        {resumeHistory.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {resumeHistory.map((item) => (
              <div
                key={item.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#1e293b] text-slate-600 dark:text-slate-300">
                    <FileCheck2 className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.filename}
                    </div>
                    <div className="text-xs text-slate-400">
                      Scored on {item.created_at}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
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
        ) : (
          <div className="p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                No Resumes Analyzed Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Upload your PDF or Word document to get instant ATS scoring, keyword detection, and section-by-section bullet rewrites.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/resume-checker"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Upload Resume in ATS Checker</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Edit Student Profile</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Update your career goals and placement details</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1e293b] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {profileSaveError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 text-xs text-red-600 dark:text-red-400">
                {profileSaveError}
              </div>
            )}

            {profileSaveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1e293b]/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1e293b]/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Target Role & Quick Chips */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Role
                </label>
                <input
                  type="text"
                  value={editTargetRole}
                  onChange={(e) => setEditTargetRole(e.target.value)}
                  placeholder="e.g. SDE-1 (Full Stack)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1e293b]/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['SDE-1', 'Frontend Engineer', 'Backend Engineer', 'Full Stack Dev', 'Data Analyst'].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setEditTargetRole(chip)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                        editTargetRole === chip
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-[#1e293b] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* College & Grad Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={editCollege}
                    onChange={(e) => setEditCollege(e.target.value)}
                    placeholder="e.g. IIT Bombay / State Tech"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1e293b]/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Grad Year
                  </label>
                  <input
                    type="text"
                    value={editGradYear}
                    onChange={(e) => setEditGradYear(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1e293b]/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* GitHub & LinkedIn URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    GitHub Profile URL
                  </label>
                  <input
                    type="text"
                    value={editGithubUrl}
                    onChange={(e) => setEditGithubUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1e293b]/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={editLinkedinUrl}
                    onChange={(e) => setEditLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1e293b]/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isSavingProfile}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1e293b] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors shadow-sm shadow-blue-600/20"
                >
                  {isSavingProfile && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSavingProfile ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
