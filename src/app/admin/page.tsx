'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { maskEmail } from '@/lib/security/sanitize';
import type { DsaProblem } from '@/lib/data/dsa';
import type { CustomProblemRecord } from '@/lib/services/dsa/leetcode-sync';
import {
  ShieldCheck,
  FileText,
  Users,
  Search,
  RefreshCw,
  Trash2,
  Check,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Download,
  KeyRound,
  X,
  FileSpreadsheet,
  Code2,
  Globe,
  LayoutDashboard,
  ChevronRight,
  ExternalLink,
  Award,
  BarChart3,
  Settings,
} from 'lucide-react';

/* ========================================================================= */
/* TYPES & INTERFACES                                                        */
/* ========================================================================= */

interface ResumeRecord {
  id: string;
  filename: string;
  file_size: number | null;
  mime_type: string | null;
  ats_score: number;
  resume_text: string | null;
  candidate_name?: string | null;
  candidate_email?: string | null;
  created_at: string;
  updated_at: string;
  analysis?: {
    ats_score?: number;
    skills?: string[];
    experienceLevel?: string;
    bullet_rewrites?: Array<{
      original: string;
      improved: string;
      reason: string;
    }>;
    dimensions?: {
      contactInfo?: { score: number };
      skills?: { score: number };
      experience?: { score: number };
      education?: { score: number };
      formatting?: { score: number };
      jobDescriptionAlignment?: { score: number };
    };
  } | null;
}

interface ProfileRecord {
  id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  created_at: string;
  role?: string | null;
}

interface LoginLogRecord {
  id: string;
  email: string;
  auth_method: string;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
}

interface AuditLogRecord {
  id: string;
  action: string;
  target_id?: string | null;
  target_name?: string | null;
  admin_email: string;
  details: string;
  ip_address: string;
  created_at: string;
}

interface AdminData {
  metrics: {
    totalResumes: number;
    avgAtsScore: number;
    passRatePct: number;
    totalUsers: number;
    totalLogins: number;
  };
  resumes: ResumeRecord[];
  profiles: ProfileRecord[];
  loginLogs: LoginLogRecord[];
  auditLogs: AuditLogRecord[];
  skillStats: Array<{ name: string; count: number }>;
}

/* ========================================================================= */
/* HELPER UTILITIES                                                          */
/* ========================================================================= */

function formatScoreBadge(score: number) {
  if (score >= 80) {
    return {
      label: 'Strong Candidate',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60',
      dotClass: 'bg-emerald-500',
    };
  }
  if (score >= 60) {
    return {
      label: 'Good Potential',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60',
      dotClass: 'bg-amber-500',
    };
  }
  return {
    label: 'Needs Review',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/60',
    dotClass: 'bg-rose-500',
  };
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function formatRelativeTime(iso: string): string {
  try {
    const d = new Date(iso);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch {
    return iso;
  }
}

/* ========================================================================= */
/* MAIN COMPONENT: ADMIN PORTAL                                              */
/* ========================================================================= */

export default function AdminPortalPage() {
  // Authentication & Session State
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  // Primary Navigation Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'dsa-manager' | 'resumes' | 'users' | 'skills' | 'settings'>('overview');

  // Core Data
  const [data, setData] = useState<AdminData | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Resume Filters & Details View
  const [resumeSearch, setResumeSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState<'ALL' | 'STRONG' | 'GOOD' | 'NEEDS_WORK'>('ALL');
  const [inspectResume, setInspectResume] = useState<ResumeRecord | null>(null);
  const [deletingResumeId, setDeletingResumeId] = useState<string | null>(null);

  // DSA Daily Challenge Sync State
  const [customProblems, setCustomProblems] = useState<CustomProblemRecord[]>([]);
  const [liveLeetCode, setLiveLeetCode] = useState<{
    title: string;
    titleSlug: string;
    difficulty: string;
    date: string;
    topicTags: string[];
    link?: string;
  } | null>(null);
  const [dsaLoading, setDsaLoading] = useState(false);
  const [dsaSyncing, setDsaSyncing] = useState(false);
  const [dsaPublishing, setDsaPublishing] = useState(false);
  const [dsaCustomInput, setDsaCustomInput] = useState('');
  const [dsaPreview, setDsaPreview] = useState<DsaProblem | null>(null);
  const [dsaScheduledDate, setDsaScheduledDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [dsaLangTab, setDsaLangTab] = useState<'python' | 'cpp' | 'java' | 'typescript'>('python');

  // Change Password Modal
  const [changeKeyModalOpen, setChangeKeyModalOpen] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [confirmKey, setConfirmKey] = useState('');
  const [changeKeyLoading, setChangeKeyLoading] = useState(false);

  /* ----------------------------------------------------------------------- */
  /* DATA FETCHING & SYNCHRONIZATION                                         */
  /* ----------------------------------------------------------------------- */

  const fetchAdminData = useCallback(async () => {
    try {
      setDataLoading(true);
      const res = await fetch('/api/admin/data');
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Failed to load administrator data');
      }
      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
      setAuthError('');
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  }, []);

  const fetchDsaData = useCallback(async () => {
    try {
      setDsaLoading(true);
      const res = await fetch('/api/admin/dsa');
      if (res.ok) {
        const json = await res.json();
        setCustomProblems(json.customProblems || []);
        setLiveLeetCode(json.liveLeetCodeDaily || null);
      }
    } catch (err) {
      console.error('Error fetching DSA admin data:', err);
    } finally {
      setDsaLoading(false);
    }
  }, []);

  // Check login state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchAdminData();
      void fetchDsaData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAdminData, fetchDsaData]);

  // Auth handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });
      const resJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAuthError(resJson.error || 'Incorrect security key. Please try again.');
        return;
      }
      setIsAuthenticated(true);
      fetchAdminData();
      fetchDsaData();
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setData(null);
  };

  /* ----------------------------------------------------------------------- */
  /* DSA MANAGER HANDLERS                                                    */
  /* ----------------------------------------------------------------------- */

  const handleSyncDailyLeetCode = async () => {
    try {
      setDsaSyncing(true);
      setNotification(null);
      const res = await fetch('/api/admin/dsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'preview-daily' }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to sync challenge.');
      setDsaPreview(json.problem);
      setNotification({
        type: 'success',
        message: `Successfully fetched "${json.problem.title}" and generated solutions in 4 languages!`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sync failed.';
      setNotification({ type: 'error', message: msg });
    } finally {
      setDsaSyncing(false);
    }
  };

  const handleImportCustomSlug = async () => {
    if (!dsaCustomInput.trim()) return;
    try {
      setDsaSyncing(true);
      setNotification(null);
      const res = await fetch('/api/admin/dsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'preview-slug', slug: dsaCustomInput.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Problem not found.');
      setDsaPreview(json.problem);
      setNotification({
        type: 'success',
        message: `Successfully generated "${json.problem.title}"! Review below and click Publish.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Import failed.';
      setNotification({ type: 'error', message: msg });
    } finally {
      setDsaSyncing(false);
    }
  };

  const handlePublishProblem = async () => {
    if (!dsaPreview) return;
    try {
      setDsaPublishing(true);
      setNotification(null);
      const res = await fetch('/api/admin/dsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish',
          problem: dsaPreview,
          scheduledForDate: dsaScheduledDate,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to publish.');
      setNotification({
        type: 'success',
        message: `"${dsaPreview.title}" is now published as the official StackUp Problem of the Day for ${dsaScheduledDate}!`,
      });
      setDsaPreview(null);
      setDsaCustomInput('');
      fetchDsaData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Publish failed.';
      setNotification({ type: 'error', message: msg });
    } finally {
      setDsaPublishing(false);
    }
  };

  const handleDeleteCustomProblem = async (id: string) => {
    if (!confirm('Remove this challenge from StackUp?')) return;
    try {
      const res = await fetch('/api/admin/dsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      if (res.ok) {
        fetchDsaData();
        setNotification({ type: 'success', message: 'Challenge removed from scheduled list.' });
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  /* ----------------------------------------------------------------------- */
  /* RESUME MANAGEMENT HANDLERS                                              */
  /* ----------------------------------------------------------------------- */

  const handleDeleteResume = async (id: string) => {
    if (!confirm('Permanently delete this resume record? This cannot be undone.')) return;
    try {
      setDeletingResumeId(id);
      const res = await fetch(`/api/admin/data?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        if (inspectResume?.id === id) setInspectResume(null);
        fetchAdminData();
        setNotification({ type: 'success', message: 'Resume record deleted.' });
      }
    } catch {
      alert('Failed to delete resume.');
    } finally {
      setDeletingResumeId(null);
    }
  };

  const resumesList = data?.resumes;
  const filteredResumes = useMemo(() => {
    if (!resumesList) return [];
    return resumesList.filter((r) => {
      // Search filter
      const q = resumeSearch.toLowerCase();
      const matchName = (r.candidate_name || '').toLowerCase().includes(q);
      const matchEmail = (r.candidate_email || '').toLowerCase().includes(q);
      const matchFile = (r.filename || '').toLowerCase().includes(q);
      if (q && !matchName && !matchEmail && !matchFile) return false;

      // Grade filter
      if (gradeFilter === 'STRONG' && r.ats_score < 80) return false;
      if (gradeFilter === 'GOOD' && (r.ats_score < 60 || r.ats_score >= 80)) return false;
      if (gradeFilter === 'NEEDS_WORK' && r.ats_score >= 60) return false;

      return true;
    });
  }, [resumesList, resumeSearch, gradeFilter]);

  /* ======================================================================= */
  /* VIEW 1: ADMIN LOGIN SCREEN (Clean, Friendly & Accessible)               */
  /* ======================================================================= */

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1020] flex flex-col justify-center items-center p-4 selection:bg-[#0D08CB] selection:text-white">
        <div className="w-full max-w-md bg-white dark:bg-[#151D35] rounded-2xl shadow-xl border border-slate-200 dark:border-zinc-800 p-8 sm:p-10 space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#0D08CB] text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              StackUp Admin Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage student resumes, placement challenges, and platform intelligence
            </p>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Security Key / Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter your admin security key..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-[#0B1020] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D08CB] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-sm font-bold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Unlocking Portal...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Unlock Admin Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-[#0D08CB] dark:hover:text-white transition-colors"
            >
              &larr; Return to StackUp Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ======================================================================= */
  /* VIEW 2: AUTHENTICATED ADMIN DASHBOARD (Modern & Accessible)            */
  /* ======================================================================= */

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1020] text-slate-900 dark:text-slate-100 selection:bg-[#0D08CB] selection:text-white pb-24">
      {/* ------------------------------------------------------------------- */}
      {/* TOP NAVIGATION BAR                                                  */}
      {/* ------------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#11182E]/95 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#0D08CB] text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">
                  StackUp Admin
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                  Placement Hub
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block -mt-0.5">
                Portal Management &amp; Analytics
              </span>
            </div>
          </div>

          {/* Quick Actions & Logout */}
          <div className="flex items-center space-x-2.5">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <button
              onClick={() => {
                void fetchAdminData();
                void fetchDsaData();
              }}
              disabled={dataLoading}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? 'animate-spin text-[#0D08CB]' : ''}`} />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Settings & Security"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-zinc-800/60 overflow-x-auto scrollbar-none">
          <div className="flex space-x-1 py-1.5">
            {([
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'dsa-manager', label: 'Daily Challenges (POTD)', icon: Code2, badge: customProblems.length },
              { id: 'resumes', label: 'Student Resumes', icon: FileText, badge: data?.resumes?.length },
              { id: 'users', label: 'Students Directory', icon: Users, badge: data?.profiles?.length },
              { id: 'skills', label: 'Skill Analytics', icon: BarChart3 },
              { id: 'settings', label: 'Security & Settings', icon: KeyRound },
            ] as Array<{
              id: 'overview' | 'dsa-manager' | 'resumes' | 'users' | 'skills' | 'settings';
              label: string;
              icon: React.ComponentType<{ className?: string }>;
              badge?: number;
            }>).map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D08CB] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* GLOBAL NOTIFICATION BANNER                                          */}
      {/* ------------------------------------------------------------------- */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className={`p-4 rounded-xl border text-xs flex items-center justify-between shadow-xs ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300'
              : 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300'
          }`}>
            <div className="flex items-center space-x-2.5">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MAIN CONTENT CONTAINER                                              */}
      {/* ------------------------------------------------------------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* ================================================================= */}
        {/* TAB 1: EXECUTIVE DASHBOARD OVERVIEW                               */}
        {/* ================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#151D35] p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Student Resumes</span>
                  <FileText className="w-4 h-4 text-blue-600" />
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {data?.metrics.totalResumes ?? 0}
                </div>
                <p className="text-[11px] text-slate-500">Processed through ATS analyzer</p>
              </div>

              <div className="bg-white dark:bg-[#151D35] p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Average ATS Score</span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {data?.metrics.avgAtsScore ?? 0}%
                </div>
                <p className="text-[11px] text-slate-500">Platform benchmark average</p>
              </div>

              <div className="bg-white dark:bg-[#151D35] p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Registered Students</span>
                  <Users className="w-4 h-4 text-purple-600" />
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {data?.metrics.totalUsers ?? data?.profiles?.length ?? 0}
                </div>
                <p className="text-[11px] text-slate-500">Active student accounts</p>
              </div>

              <div className="bg-white dark:bg-[#151D35] p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Scheduled POTD</span>
                  <Code2 className="w-4 h-4 text-amber-600" />
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {customProblems.length}
                </div>
                <p className="text-[11px] text-slate-500">Active custom daily problems</p>
              </div>
            </div>

            {/* Quick Action Shortcuts for Non-Technical Admins */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-[#0D08CB] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">
                  Keep StackUp Fresh with Daily Placement Challenges
                </h3>
                <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
                  Students love solving problems daily. Click below to automatically sync today&apos;s official challenge with AI-generated solutions in Python, C++, Java, and TypeScript.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setActiveTab('dsa-manager')}
                  className="px-4 py-2.5 rounded-xl bg-white text-[#0D08CB] hover:bg-blue-50 text-xs font-extrabold shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Manage Daily Challenges</span>
                </button>
                <button
                  onClick={() => setActiveTab('resumes')}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center space-x-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Review Student Resumes</span>
                </button>
              </div>
            </div>

            {/* Recent Uploads & Top Skills Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Resumes */}
              <div className="lg:col-span-2 bg-white dark:bg-[#151D35] p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Recent Resume Submissions
                    </h3>
                    <p className="text-xs text-slate-500">Latest student resumes analyzed by ATS</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('resumes')}
                    className="text-xs font-bold text-[#0D08CB] hover:underline flex items-center space-x-1"
                  >
                    <span>View all ({data?.resumes?.length ?? 0})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {(!data?.resumes || data.resumes.length === 0) ? (
                  <div className="py-12 text-center text-slate-400 text-xs rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
                    No student resumes uploaded yet.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                    {data.resumes.slice(0, 5).map((r) => {
                      const badge = formatScoreBadge(r.ats_score);
                      return (
                        <div
                          key={r.id}
                          onClick={() => {
                            setInspectResume(r);
                            setActiveTab('resumes');
                          }}
                          className="py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/40 px-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-slate-900 dark:text-white block">
                              {r.candidate_name || r.filename}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {r.candidate_email ? maskEmail(r.candidate_email) : 'No email'} • {formatRelativeTime(r.created_at)}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border flex items-center space-x-1 ${badge.badgeClass}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                              <span>{r.ats_score}/100</span>
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Top Skills Cloud */}
              <div className="bg-white dark:bg-[#151D35] p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Top In-Demand Skills
                  </h3>
                  <p className="text-xs text-slate-500">Most common skills found in resumes</p>
                </div>

                {(!data?.skillStats || data.skillStats.length === 0) ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    Skills will appear once resumes are uploaded.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {data.skillStats.slice(0, 6).map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-800 dark:text-slate-200">{skill.name}</span>
                          <span className="text-slate-500 font-mono">{skill.count} students</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0D08CB] h-full rounded-full"
                            style={{
                              width: `${Math.min(100, (skill.count / (data.resumes.length || 1)) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: DSA & DAILY CHALLENGE MANAGER (Super Easy for Non-Coders)  */}
        {/* ================================================================= */}
        {activeTab === 'dsa-manager' && (
          <div className="space-y-6">
            {/* Friendly Header */}
            <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Daily Placement Challenge Manager
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200">
                    Admin Only
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  Publish new coding challenges to the student homepage. You can sync today&apos;s global problem with 1 click, or paste any problem link. StackUp handles writing the solutions and test cases automatically!
                </p>
              </div>

              <button
                onClick={fetchDsaData}
                disabled={dsaLoading}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center space-x-1.5 shrink-0 self-start md:self-auto cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${dsaLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Live Data</span>
              </button>
            </div>

            {/* Sync Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Method A: 1-Click Sync Today's Problem */}
              <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                      <Globe className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                      Option 1: One-Click Daily Sync
                    </span>
                    {liveLeetCode?.date && (
                      <span className="text-xs text-slate-500 font-mono">
                        Date: {liveLeetCode.date}
                      </span>
                    )}
                  </div>

                  {liveLeetCode ? (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {liveLeetCode.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          liveLeetCode.difficulty === 'Easy'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : liveLeetCode.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {liveLeetCode.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-500 pt-1">
                        {liveLeetCode.topicTags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-500">
                      Loading today&apos;s live challenge...
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSyncDailyLeetCode}
                  disabled={dsaSyncing || !liveLeetCode}
                  className="w-full py-3 px-4 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {dsaSyncing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating Multi-Language Solutions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Sync &amp; Prepare Today&apos;s Challenge</span>
                    </>
                  )}
                </button>
              </div>

              {/* Method B: Import Any Specific Problem */}
              <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                    <Code2 className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                    Option 2: Add Any Problem by Link or Name
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Paste any LeetCode problem link (or slug like <code>trapping-rain-water</code>) to fetch its statement and generate solutions.
                  </p>
                  <input
                    type="text"
                    value={dsaCustomInput}
                    onChange={(e) => setDsaCustomInput(e.target.value)}
                    placeholder="https://leetcode.com/problems/lru-cache/ or lru-cache"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                  />
                </div>

                <button
                  onClick={handleImportCustomSlug}
                  disabled={dsaSyncing || !dsaCustomInput.trim()}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {dsaSyncing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating with Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4" />
                      <span>Fetch &amp; Auto-Generate Problem</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Preview & Publishing Drawer */}
            {dsaPreview && (
              <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border-2 border-blue-500/50 shadow-lg space-y-5 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      Step 2: Review &amp; Confirm Publication
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      {dsaPreview.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300">
                      {dsaPreview.pattern_tag}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      dsaPreview.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : dsaPreview.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {dsaPreview.difficulty}
                    </span>
                  </div>
                </div>

                {/* Conceptual Summary & Approach */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Summary</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{dsaPreview.summary}</p>
                    <div className="pt-2 text-[11px] text-slate-500 flex items-center space-x-3">
                      <span><strong>Time:</strong> {dsaPreview.timeComplexity}</span>
                      <span>•</span>
                      <span><strong>Space:</strong> {dsaPreview.spaceComplexity}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Optimal Algorithm Approach</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-4">{dsaPreview.approach}</p>
                  </div>
                </div>

                {/* Generated Multi-Language Solutions Preview */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 pb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Generated Reference Solutions:
                    </span>
                    <div className="flex space-x-1">
                      {(['python', 'cpp', 'java', 'typescript'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setDsaLangTab(lang)}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            dsaLangTab === lang
                              ? 'bg-[#0D08CB] text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                          }`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <pre className="p-3.5 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed">
                    {dsaPreview.solutions[dsaLangTab]}
                  </pre>
                </div>

                {/* Publish Bar */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Publish for Date:
                    </label>
                    <input
                      type="date"
                      value={dsaScheduledDate}
                      onChange={(e) => setDsaScheduledDate(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B1020] border border-slate-300 dark:border-zinc-700 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <button
                      onClick={() => setDsaPreview(null)}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handlePublishProblem}
                      disabled={dsaPublishing}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {dsaPublishing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Publishing to Website...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Publish to StackUp</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* List of Published Daily Challenges */}
            <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Active Scheduled Challenges ({customProblems.length})
                </h3>
                <p className="text-xs text-slate-500">
                  These problems will appear on the student website on their scheduled date.
                </p>
              </div>

              {customProblems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
                  No custom challenges published yet. Click &quot;Sync &amp; Prepare Today&apos;s Challenge&quot; above to publish your first one!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-zinc-800 text-slate-500 font-mono text-[11px] uppercase">
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Problem Title</th>
                        <th className="py-3 px-3">Difficulty</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Companies</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                      {customProblems.map((cp) => (
                        <tr key={cp.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40">
                          <td className="py-3.5 px-3 font-mono font-bold text-[#0D08CB]">
                            {cp.scheduledForDate || 'Anytime'}
                          </td>
                          <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                            {cp.title}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              cp.difficulty === 'Easy'
                                ? 'bg-emerald-50 text-emerald-700'
                                : cp.difficulty === 'Medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}>
                              {cp.difficulty}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                            {cp.pattern_tag}
                          </td>
                          <td className="py-3.5 px-3 text-slate-500">
                            {cp.companies?.slice(0, 2).join(', ') || 'General'}
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button
                              onClick={() => handleDeleteCustomProblem(cp.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete from list"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: STUDENT RESUMES & APPLICATIONS                             */}
        {/* ================================================================= */}
        {activeTab === 'resumes' && (
          <div className="space-y-6">
            {/* Header with Search, Filter & CSV Export */}
            <div className="bg-white dark:bg-[#151D35] p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={resumeSearch}
                    onChange={(e) => setResumeSearch(e.target.value)}
                    placeholder="Search candidate name, email, or filename..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                  />
                </div>

                {/* Score Grade Filter Pills */}
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
                  {([
                    { id: 'ALL', label: 'All Resumes' },
                    { id: 'STRONG', label: '80%+ (Strong)' },
                    { id: 'GOOD', label: '60-79% (Good)' },
                    { id: 'NEEDS_WORK', label: '<60%' },
                  ] as const).map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGradeFilter(g.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        gradeFilter === g.id
                          ? 'bg-white dark:bg-[#151D35] text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Button */}
              <a
                href="/api/admin/export-resumes"
                download="stackup_resumes.csv"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-2 shrink-0 self-start md:self-auto shadow-sm"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export to Excel/CSV</span>
              </a>
            </div>

            {/* Resumes Grid / List */}
            {filteredResumes.length === 0 ? (
              <div className="bg-white dark:bg-[#151D35] p-12 rounded-2xl border border-slate-200/80 dark:border-zinc-800 text-center text-slate-500 text-xs">
                No resumes match the current search or grade filter.
              </div>
            ) : (
              <div className="bg-white dark:bg-[#151D35] rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                  {filteredResumes.map((resume) => {
                    const badge = formatScoreBadge(resume.ats_score);
                    const isSelected = inspectResume?.id === resume.id;
                    return (
                      <div
                        key={resume.id}
                        className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                          isSelected ? 'bg-blue-50/50 dark:bg-blue-950/20' : 'hover:bg-slate-50/80 dark:hover:bg-zinc-800/30'
                        }`}
                      >
                        {/* Candidate Identity */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2.5">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {resume.candidate_name || resume.filename}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center space-x-1 ${badge.badgeClass}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                              <span>{badge.label}</span>
                            </span>
                          </div>

                          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span>{resume.candidate_email ? maskEmail(resume.candidate_email) : 'No email detected'}</span>
                            <span>•</span>
                            <span>Uploaded {formatDate(resume.created_at)}</span>
                            {resume.analysis?.skills && resume.analysis.skills.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-slate-600 dark:text-slate-400 font-medium">
                                  {resume.analysis.skills.slice(0, 3).join(', ')}
                                  {resume.analysis.skills.length > 3 && ` +${resume.analysis.skills.length - 3} more`}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* ATS Score & Action Buttons */}
                        <div className="flex items-center space-x-3 self-end sm:self-auto shrink-0">
                          <div className="text-right">
                            <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                              {resume.ats_score}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">/100</span>
                          </div>

                          <button
                            onClick={() => setInspectResume(isSelected ? null : resume)}
                            className="px-3.5 py-2 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            {isSelected ? 'Close Details' : 'View Report'}
                          </button>

                          <a
                            href={`/api/admin/resume-download?id=${encodeURIComponent(resume.id)}`}
                            download={resume.filename}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                            title="Download original file"
                          >
                            <Download className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => handleDeleteResume(resume.id)}
                            disabled={deletingResumeId === resume.id}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete resume"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inspect Resume Drawer Modal */}
            {inspectResume && (
              <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border-2 border-[#0D08CB]/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D08CB]">
                      Candidate Dossier
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {inspectResume.candidate_name || inspectResume.filename}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <a
                      href={`/api/admin/resume-download?id=${encodeURIComponent(inspectResume.id)}`}
                      download={inspectResume.filename}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                    <button
                      onClick={() => setInspectResume(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* ATS Dimensions Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Overall ATS</span>
                    <div className="text-xl font-black text-[#0D08CB] mt-0.5">{inspectResume.ats_score}%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Skills Match</span>
                    <div className="text-xl font-black text-emerald-600 mt-0.5">
                      {inspectResume.analysis?.dimensions?.skills?.score ?? inspectResume.ats_score}%
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Experience</span>
                    <div className="text-xl font-black text-purple-600 mt-0.5">
                      {inspectResume.analysis?.dimensions?.experience?.score ?? inspectResume.ats_score}%
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Formatting</span>
                    <div className="text-xl font-black text-blue-600 mt-0.5">
                      {inspectResume.analysis?.dimensions?.formatting?.score ?? inspectResume.ats_score}%
                    </div>
                  </div>
                </div>

                {/* Candidate Detected Skills */}
                {inspectResume.analysis?.skills && inspectResume.analysis.skills.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Verified Technical Skills ({inspectResume.analysis.skills.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {inspectResume.analysis.skills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extracted Clean Text Preview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Extracted Document Content
                  </h4>
                  <pre className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1020] text-slate-700 dark:text-slate-300 font-mono text-xs overflow-y-auto max-h-60 leading-relaxed whitespace-pre-wrap border border-slate-200/80 dark:border-zinc-800">
                    {inspectResume.resume_text || 'No text extracted.'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: REGISTERED STUDENTS DIRECTORY                             */}
        {/* ================================================================= */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Registered Student Directory ({data?.profiles?.length ?? 0})
              </h3>
              <p className="text-xs text-slate-500">
                All registered learner accounts authenticated with StackUp
              </p>
            </div>

            {(!data?.profiles || data.profiles.length === 0) ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No registered student profiles found in database.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-zinc-800 text-slate-500 font-mono text-[11px] uppercase">
                      <th className="py-3 px-3">Student Email</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3">Registration Date</th>
                      <th className="py-3 px-3">User ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                    {data.profiles.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40">
                        <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white">
                          {p.email}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                            {p.role || 'Student'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-500">
                          {formatDate(p.created_at)}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-[10px] text-slate-400">
                          {p.id.slice(0, 8)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: SKILL ANALYTICS & CURRICULUM INTELLIGENCE                 */}
        {/* ================================================================= */}
        {activeTab === 'skills' && (
          <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Platform Technical Skills Distribution
              </h3>
              <p className="text-xs text-slate-500">
                Skills identified across all student resumes uploaded to StackUp
              </p>
            </div>

            {(!data?.skillStats || data.skillStats.length === 0) ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No skill analytics available yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.skillStats.map((skill) => (
                  <div key={skill.name} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1020] border border-slate-200/80 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#0D08CB]">
                        {skill.count} resumes
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0D08CB] h-full rounded-full"
                        style={{
                          width: `${Math.min(100, (skill.count / (data.resumes.length || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 6: SECURITY & SETTINGS                                        */}
        {/* ================================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Security Passcode Management */}
            <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Master Administrator Passcode
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update the security key used to access this admin portal
                  </p>
                </div>
                <button
                  onClick={() => setChangeKeyModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Change Passcode
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1020] text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Zero-Trust Encryption</span>
                Your security key is hashed using cryptographic salted scrypt before evaluation. No plain-text passwords are ever stored.
              </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-white dark:bg-[#151D35] p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Recent Administrator Operations
                </h3>
                <p className="text-xs text-slate-500">
                  Immutable audit trail of administrative downloads, deletions, and publications
                </p>
              </div>

              {(!data?.auditLogs || data.auditLogs.length === 0) ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No privileged actions recorded yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                  {data.auditLogs.slice(0, 10).map((log) => (
                    <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">
                          {log.action}: {log.details}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          By {log.admin_email} • IP {log.ip_address}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {formatRelativeTime(log.created_at)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------------- */}
      {/* CHANGE PASSCODE MODAL                                               */}
      {/* ------------------------------------------------------------------- */}
      {changeKeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#151D35] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 text-left border border-slate-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Change Master Passcode
              </h3>
              <button
                onClick={() => setChangeKeyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (newKey !== confirmKey) {
                  alert('New passcodes do not match.');
                  return;
                }
                setChangeKeyLoading(true);
                try {
                  const res = await fetch('/api/admin/reset-password/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newPasscode: newKey.trim() }),
                  });
                  if (res.ok) {
                    alert('Passcode updated successfully!');
                    setChangeKeyModalOpen(false);
                  } else {
                    alert('Failed to update passcode.');
                  }
                } catch {
                  alert('Network error.');
                } finally {
                  setChangeKeyLoading(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  New Passcode (min 8 characters)
                </label>
                <input
                  type="password"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-[#0B1020] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Confirm New Passcode
                </label>
                <input
                  type="password"
                  value={confirmKey}
                  onChange={(e) => setConfirmKey(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-[#0B1020] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setChangeKeyModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changeKeyLoading}
                  className="flex-1 py-2.5 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  {changeKeyLoading ? 'Updating...' : 'Save Passcode'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
