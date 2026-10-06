'use client';

import React, { useState, useEffect, useMemo, useCallback, useId } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Users,
  TrendingUp,
  Award,
  Search,
  RefreshCw,
  Trash2,
  Copy,
  Check,
  X,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  Sparkles
} from 'lucide-react';

interface ResumeRecord {
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

interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

interface AdminData {
  metrics: {
    totalResumes: number;
    totalUsers: number;
    totalQuizzes: number;
    avgScore: number;
    highPerformers: number;
    needsOptimization: number;
  };
  topSkills: { skill: string; count: number }[];
  resumes: ResumeRecord[];
  profiles: UserProfile[];
}

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Table filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'resumes' | 'users' | 'skills'>('resumes');

  // Inspector modal state
  const [selectedResume, setSelectedResume] = useState<ResumeRecord | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const searchInputId = useId();

  const fetchAdminData = useCallback(async (key: string) => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await fetch(`/api/admin/data?key=${encodeURIComponent(key)}`, {
        headers: { 'x-admin-key': key },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          sessionStorage.removeItem('stackup_admin_key');
          setAuthError('Invalid admin passcode. Access denied.');
          return;
        }
        throw new Error('Failed to load administrator telemetry.');
      }

      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
      sessionStorage.setItem('stackup_admin_key', key);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading admin data';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check stored admin key on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('stackup_admin_key') : null;
    if (stored) {
      const timer = setTimeout(() => {
        void fetchAdminData(stored);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [fetchAdminData]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError('Please enter the admin passcode.');
      return;
    }
    setAuthError('');
    fetchAdminData(passcode.trim());
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('stackup_admin_key');
    setIsAuthenticated(false);
    setPasscode('');
    setData(null);
  };

  const handleDeleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this resume record from Supabase?')) {
      return;
    }
    try {
      setDeletingId(id);
      const res = await fetch('/api/admin/data', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passcode,
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        if (selectedResume?.id === id) {
          setSelectedResume(null);
        }
        // Refresh data
        fetchAdminData(passcode);
      } else {
        alert('Failed to delete resume record.');
      }
    } catch {
      alert('Error deleting resume record.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Filter resumes
  const resumes = data?.resumes;
  const filteredResumes = useMemo(() => {
    if (!resumes) return [];
    return resumes.filter((r) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        r.filename.toLowerCase().includes(q) ||
        (r.user_email && r.user_email.toLowerCase().includes(q)) ||
        (r.resume_text && r.resume_text.toLowerCase().includes(q)) ||
        r.ats_score.toString().includes(q);

      const grade = r.analysis?.grade || 'C';
      const matchesGrade = gradeFilter === 'ALL' || grade === gradeFilter;

      return matchesSearch && matchesGrade;
    });
  }, [resumes, searchQuery, gradeFilter]);

  // If not authenticated, render admin login gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                Admin Control Portal
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Authorized platform management & resume database
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label htmlFor="admin-passcode" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Administrator Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  id="admin-passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter database or admin master key..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Unlock Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
              Return to Student Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Top Banner Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                    StackUp Admin Control
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Live Supabase
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Real-time candidate telemetry, stored resumes, and user accounts
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => fetchAdminData(passcode)}
                disabled={loading}
                className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-850 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center space-x-1.5 transition-all shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-500' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleSignOut}
                className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-750 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                Lock Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Top Key Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Stored Resumes</span>
              <FileText className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white">
              {data?.metrics.totalResumes ?? 0}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Permanent uploads in Supabase
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Average ATS</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white">
              {data?.metrics.avgScore ?? 0}
              <span className="text-sm font-semibold text-zinc-400"> / 100</span>
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
              {data?.metrics.highPerformers ?? 0} scored Grade A/A+ (≥75)
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Registered Users</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white">
              {data?.metrics.totalUsers ?? 0}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Active profiles & students
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Quizzes Taken</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white">
              {data?.metrics.totalQuizzes ?? 0}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Interactive test completions
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab('resumes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'resumes'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850'
            }`}
          >
            Uploaded Resumes ({data?.resumes.length ?? 0})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850'
            }`}
          >
            Signed In Users ({data?.profiles.length ?? 0})
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'skills'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850'
            }`}
          >
            Applicant Skill Trends
          </button>
        </div>

        {/* TAB 1: UPLOADED RESUMES TABLE */}
        {activeTab === 'resumes' && (
          <div className="space-y-4">
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="relative w-full sm:w-96">
                <label htmlFor={searchInputId} className="sr-only">Search resumes</label>
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  id={searchInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidate, email, filename, or skill..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-850 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-xs text-zinc-500">Filter Grade:</span>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-850 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none"
                >
                  <option value="ALL">All Grades</option>
                  <option value="A+">Grade A+ (88-100)</option>
                  <option value="A">Grade A (78-87)</option>
                  <option value="B">Grade B (66-77)</option>
                  <option value="C">Grade C (52-65)</option>
                  <option value="D">Grade D (&lt;52)</option>
                </select>
              </div>
            </div>

            {/* Resumes Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 dark:bg-zinc-850/80 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Candidate / Document</th>
                      <th className="py-3.5 px-4">ATS Score</th>
                      <th className="py-3.5 px-4">Matched Skills</th>
                      <th className="py-3.5 px-4">Date Uploaded</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
                    {filteredResumes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-zinc-400">
                          No uploaded resumes match the current search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredResumes.map((resume) => {
                        const grade = resume.analysis?.grade || 'C';
                        const score = resume.ats_score;
                        const matchedCount = resume.analysis?.matched_keywords?.length || 0;

                        return (
                          <tr key={resume.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-850/40 transition-colors">
                            {/* Candidate & File */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="truncate max-w-xs">
                                  <div className="font-bold text-zinc-900 dark:text-white truncate">
                                    {resume.filename}
                                  </div>
                                  <div className="text-[11px] text-zinc-500 truncate">
                                    {resume.user_email || 'Anonymous applicant'}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Score & Grade */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                                  score >= 88
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
                                    : score >= 75
                                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                                    : score >= 60
                                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                                }`}>
                                  {score} / 100
                                </span>
                                <span className="font-bold text-zinc-500 text-[11px]">
                                  Grade {grade}
                                </span>
                              </div>
                            </td>

                            {/* Matched Skills */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-1.5 flex-wrap max-w-sm">
                                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                                  {matchedCount} skills detected
                                </span>
                                {resume.analysis?.matched_keywords?.slice(0, 3).map((s, idx) => (
                                  <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400">
                                    {s}
                                  </span>
                                ))}
                                {matchedCount > 3 && (
                                  <span className="text-[10px] text-zinc-400">+{matchedCount - 3} more</span>
                                )}
                              </div>
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-4 text-zinc-500 whitespace-nowrap">
                              {new Date(resume.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => setSelectedResume(resume)}
                                  className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold text-xs flex items-center space-x-1 transition-all"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Inspect</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteResume(resume.id)}
                                  disabled={deletingId === resume.id}
                                  className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                  title="Delete record from Supabase"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIGNED IN USERS */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Registered Student Accounts ({data?.profiles.length ?? 0})
              </h2>
              <p className="text-xs text-zinc-500">
                User accounts synchronized with Supabase authentication
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-850/80 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Registered Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
                  {data?.profiles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-zinc-400">
                        No registered profiles found in database yet.
                      </td>
                    </tr>
                  ) : (
                    data?.profiles.map((profile) => (
                      <tr key={profile.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-850/40">
                        <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white">
                          {profile.full_name || 'Student Account'}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-zinc-500">
                          {profile.id}
                        </td>
                        <td className="py-3 px-4 text-zinc-500">
                          {profile.phone || '—'}
                        </td>
                        <td className="py-3 px-4 text-zinc-500">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SKILL TRENDS */}
        {activeTab === 'skills' && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Top Technical Skills Across All Uploaded Resumes
              </h2>
              <p className="text-xs text-zinc-500">
                Most frequent engineering technologies detected in applicant resumes
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data?.topSkills.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div className="font-bold text-sm text-zinc-900 dark:text-white">
                    {item.skill}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-extrabold text-xs">
                    {item.count} resumes
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* INSPECTOR MODAL */}
      {selectedResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 mb-2">
                  <span>Supabase Stored Resume</span>
                </div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                  {selectedResume.filename}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Applicant: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{selectedResume.user_email || 'Anonymous'}</span> • Uploaded on {new Date(selectedResume.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedResume(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scorecard Overview */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center font-black shadow-md">
                  <span className="text-2xl">{selectedResume.ats_score}</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-80">Score</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-zinc-900 dark:text-white text-base">
                    Grade {selectedResume.analysis?.grade || 'C'} ATS Diagnostic
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-md mt-0.5">
                    {selectedResume.analysis?.summary}
                  </p>
                </div>
              </div>

              {selectedResume.analysis?.breakdown && (
                <div className="grid grid-cols-2 gap-2 text-[11px] w-full sm:w-auto font-semibold">
                  <div className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    Contact: <span className="text-indigo-600 dark:text-indigo-400">{selectedResume.analysis.breakdown.contact_score}%</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    Skills: <span className="text-emerald-600 dark:text-emerald-400">{selectedResume.analysis.breakdown.skills_score}%</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    Impact: <span className="text-blue-600 dark:text-blue-400">{selectedResume.analysis.breakdown.experience_score}%</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    Format: <span className="text-purple-600 dark:text-purple-400">{selectedResume.analysis.breakdown.formatting_score}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Matched & Missing Skills */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Skills Evaluation
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                    Matched Skills ({selectedResume.analysis?.matched_keywords?.length || 0}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedResume.analysis?.matched_keywords?.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 block mb-1">
                    Missing Keywords to Target:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedResume.analysis?.missing_keywords?.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Bullet Rewrites */}
            {selectedResume.analysis?.bullet_rewrites && selectedResume.analysis.bullet_rewrites.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>AI STAR Bullet Rewrites</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedResume.analysis.bullet_rewrites.map((b, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850/60 text-xs space-y-2">
                      <div className="text-rose-600 dark:text-rose-400">
                        <span className="font-bold">Original: </span>
                        {b.original}
                      </div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                        <span className="font-bold">ATS Optimized: </span>
                        {b.improved}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Text Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Extracted Raw Resume Text
                </h4>
                {selectedResume.resume_text && (
                  <button
                    onClick={() => handleCopyText(selectedResume.resume_text || '')}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-zinc-800">
                {selectedResume.resume_text || 'No extracted text found.'}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => handleDeleteResume(selectedResume.id)}
                disabled={deletingId === selectedResume.id}
                className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Record</span>
              </button>

              <button
                onClick={() => setSelectedResume(null)}
                className="px-5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
