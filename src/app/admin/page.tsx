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
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Download,
  Mail,
  Calendar,
  ChevronLeft,
  SlidersHorizontal,
  KeyRound,
  LogIn,
  Smartphone,
  Globe,
  Clock,
  Laptop,
  X,
  Key,
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
  has_file_data?: boolean;
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
  email?: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string | null;
  resumes_count?: number;
  latest_score?: number | null;
}

function formatExactDateTime(isoString?: string | null): { date: string; time: string; full: string } {
  if (!isoString) return { date: '—', time: '—', full: '—' };
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return { date: isoString, time: '', full: isoString };

  const date = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const time = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return {
    date,
    time,
    full: `${date} • ${time}`,
  };
}

function getRelativeTime(isoString?: string | null): string {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  if (diffMs < 0) return 'Just now';
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

interface LoginAuditRecord {
  id: string;
  user_id: string | null;
  email: string | null;
  full_name: string | null;
  auth_method: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

interface AdminData {
  metrics: {
    totalResumes: number;
    totalUsers: number;
    totalQuizzes: number;
    avgScore: number;
    highPerformers: number;
    needsOptimization: number;
    totalLogins?: number;
    hasServiceRole?: boolean;
    authUsersCount?: number;
  };
  topSkills: { skill: string; count: number }[];
  resumes: ResumeRecord[];
  profiles: UserProfile[];
  loginLogs?: LoginAuditRecord[];
}

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Unified Admin Authentication & Recovery State
  const [authView, setAuthView] = useState<'login' | 'reset-request' | 'reset-verify'>('login');
  const [showPasscode, setShowPasscode] = useState(false);
  const [resetEmail, setResetEmail] = useState('shobhitagrawal2004@gmail.com');
  const [resetCode, setResetCode] = useState('');
  const [resetNewPasscode, setResetNewPasscode] = useState('');
  const [resetConfirmPasscode, setResetConfirmPasscode] = useState('');
  const [showResetNewPass, setShowResetNewPass] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Primary tab view: 'workspace', 'table', 'users', 'skills', 'logins'
  const [activeTab, setActiveTab] = useState<'workspace' | 'table' | 'users' | 'skills' | 'logins'>('workspace');

  // Search & Filter state for resumes
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  // Search & Filter state for login audit logs
  const [loginSearchQuery, setLoginSearchQuery] = useState('');
  const [authMethodFilter, setAuthMethodFilter] = useState('ALL');

  // Change Admin Passcode Modal state
  const [changeKeyModalOpen, setChangeKeyModalOpen] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmNewPasscode, setConfirmNewPasscode] = useState('');
  const [changeKeyLoading, setChangeKeyLoading] = useState(false);
  const [changeKeyMsg, setChangeKeyMsg] = useState('');
  const [changeKeyErr, setChangeKeyErr] = useState('');

  // Selected Resume for reading in workspace
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [readerViewMode, setReaderViewMode] = useState<'formatted' | 'raw' | 'diagnostics'>('formatted');
  const [copiedText, setCopiedText] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const searchInputId = useId();

  const fetchAdminData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await fetch('/api/admin/data');

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          // Purge legacy storage items if any exist
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('stackup_admin_key');
            localStorage.removeItem('stackup_admin_key');
          }
          return;
        }
        throw new Error('Failed to load administrator telemetry.');
      }

      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
      setAuthError('');

      // Auto-select first resume if none selected
      if (json.resumes && json.resumes.length > 0) {
        setSelectedResumeId((prev) => prev || json.resumes[0].id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading admin data';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchAdminData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAdminData]);

  useEffect(() => {
    if (!changeKeyModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setChangeKeyModalOpen(false);
        setChangeKeyErr('');
        setChangeKeyMsg('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeKeyModalOpen]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError('Please enter the security key.');
      return;
    }
    setAuthError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });
      const resJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAuthError(resJson.error || 'Invalid security key. Please try again.');
        return;
      }
      setPasscode('');
      await fetchAdminData();
    } catch {
      setAuthError('Network error. Unable to connect to server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setResetError('Please enter your administrator email address.');
      return;
    }
    setResetError('');
    setResetSuccess('');
    setResetLoading(true);
    try {
      const res = await fetch('/api/admin/reset-password/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.trim() }),
      });
      const resJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResetError(resJson.error || 'Unable to process reset request.');
        return;
      }
      setResetSuccess(resJson.message || 'Verification code dispatched to your administrator email.');
      setAuthView('reset-verify');
    } catch {
      setResetError('Network error. Unable to connect to reset service.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode.trim()) {
      setResetError('Please enter the 6-digit verification code.');
      return;
    }
    if (!resetNewPasscode.trim() || resetNewPasscode.length < 8) {
      setResetError('New security key must be at least 8 characters long.');
      return;
    }
    if (resetNewPasscode !== resetConfirmPasscode) {
      setResetError('Security key confirmation does not match.');
      return;
    }
    setResetError('');
    setResetSuccess('');
    setResetLoading(true);
    try {
      const res = await fetch('/api/admin/reset-password/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetEmail.trim(),
          code: resetCode.trim(),
          newPassword: resetNewPasscode.trim(),
          confirmPassword: resetConfirmPasscode.trim(),
        }),
      });
      const resJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResetError(resJson.error || 'Verification failed. Please check the code.');
        return;
      }
      setResetSuccess('Security key updated successfully! Entering admin portal...');
      setTimeout(async () => {
        setAuthView('login');
        setResetCode('');
        setResetNewPasscode('');
        setResetConfirmPasscode('');
        await fetchAdminData();
      }, 700);
    } catch {
      setResetError('Network error. Unable to verify reset code.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('stackup_admin_key');
      sessionStorage.removeItem('stackup_admin_key');
    }
    setIsAuthenticated(false);
    setPasscode('');
    setData(null);
  };

  const handleDeleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this resume record? This action cannot be undone.')) {
      return;
    }
    try {
      setDeletingId(id);
      const res = await fetch('/api/admin/data', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        if (selectedResumeId === id) {
          const remaining = (data?.resumes || []).filter((r) => r.id !== id);
          setSelectedResumeId(remaining.length > 0 ? remaining[0].id : null);
          setMobileDetailOpen(false);
        }
        await fetchAdminData();
      } else {
        alert('Failed to delete resume record.');
      }
    } catch {
      alert('Error deleting resume record.');
    } finally {
      setDeletingId(null);
    }
  };

  const handlePurgeTestRecords = async () => {
    if (!confirm('Purge all mock and test seed resumes (@example.com, etc.) permanently?')) return;
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'purge_test_records' }),
      });
      if (res.ok) {
        await fetchAdminData();
      } else {
        alert('Failed to purge test records.');
      }
    } catch {
      alert('Error purging test records.');
    }
  };

  const handleChangePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeKeyErr('');
    setChangeKeyMsg('');
    if (!newPasscode.trim() || newPasscode.length < 8) {
      setChangeKeyErr('New security key must be at least 8 characters long.');
      return;
    }
    if (newPasscode !== confirmNewPasscode) {
      setChangeKeyErr('Passcode confirmation does not match.');
      return;
    }
    try {
      setChangeKeyLoading(true);
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'change_passcode', newPasscode: newPasscode.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setChangeKeyErr(json.error || 'Failed to update admin key.');
        return;
      }
      setChangeKeyMsg('Master key updated successfully! Please save your new passcode.');
      setNewPasscode('');
      setConfirmNewPasscode('');
      setTimeout(() => {
        setChangeKeyModalOpen(false);
        setChangeKeyMsg('');
      }, 2000);
    } catch {
      setChangeKeyErr('Network error updating security key.');
    } finally {
      setChangeKeyLoading(false);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownloadOriginalFile = (resume: ResumeRecord) => {
    const downloadUrl = `/api/admin/resume-download?id=${encodeURIComponent(resume.id)}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = resume.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadText = (resume: ResumeRecord) => {
    if (!resume.resume_text) return;
    const blob = new Blob([resume.resume_text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.filename.replace(/\.[^/.]+$/, '')}_raw.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered and sorted resumes
  const resumes = data?.resumes;
  const filteredResumes = useMemo(() => {
    if (!resumes) return [];
    const list = resumes.filter((r) => {
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

    if (sortBy === 'score') {
      return [...list].sort((a, b) => b.ats_score - a.ats_score);
    }
    return [...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [resumes, searchQuery, gradeFilter, sortBy]);

  // Filtered login audit logs
  const loginLogs = data?.loginLogs;
  const filteredLoginLogs = useMemo(() => {
    if (!loginLogs) return [];
    return loginLogs.filter((log) => {
      const q = loginSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        (log.email && log.email.toLowerCase().includes(q)) ||
        (log.full_name && log.full_name.toLowerCase().includes(q)) ||
        (log.user_id && log.user_id.toLowerCase().includes(q)) ||
        (log.ip_address && log.ip_address.toLowerCase().includes(q)) ||
        log.auth_method.toLowerCase().includes(q);

      const matchesMethod =
        authMethodFilter === 'ALL' ||
        log.auth_method.toLowerCase() === authMethodFilter.toLowerCase();

      return matchesSearch && matchesMethod;
    });
  }, [loginLogs, loginSearchQuery, authMethodFilter]);

  // The active resume currently being read in the workspace
  const currentResume = useMemo(() => {
    if (!resumes || resumes.length === 0) return null;
    return resumes.find((r) => r.id === selectedResumeId) || resumes[0];
  }, [resumes, selectedResumeId]);

  // If not authenticated, render the secured admin access portal
  // If not authenticated, render the secured admin access portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1020] flex flex-col justify-center items-center px-4 py-8 sm:py-12 transition-colors">
        {/* Prominent Back Link for Mobile & Desktop */}
        <div className="w-full max-w-md mb-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white bg-white dark:bg-[#151D35] hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 px-3.5 py-2 rounded-xl transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>&larr; Back to StackUp Website</span>
          </Link>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Admin Authorization</span>
        </div>

        <div className="max-w-md w-full bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          {/* Header Section */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center shrink-0">
              {authView === 'login' ? (
                <ShieldCheck className="w-6 h-6" />
              ) : authView === 'reset-request' ? (
                <KeyRound className="w-6 h-6" />
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {authView === 'login' && 'Staff Authorization Gateway'}
                {authView === 'reset-request' && 'Admin Security Recovery'}
                {authView === 'reset-verify' && 'Complete Security Reset'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {authView === 'login' && 'Restricted to authorized personnel'}
                {authView === 'reset-request' && 'Identity verification & recovery'}
                {authView === 'reset-verify' && 'Verification code & password update'}
              </p>
            </div>
          </div>

          {/* VIEW 1: Standard Key Login */}
          {authView === 'login' && (
            <>
              {authError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="leading-relaxed">{authError}</span>
                </div>
              )}

              <form onSubmit={handleUnlock} className="space-y-4">
                <div>
                  <div className="mb-2">
                    <label htmlFor="admin-passcode" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Master Security Key
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      id="admin-passcode"
                      type={showPasscode ? 'text' : 'password'}
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      placeholder="Enter administrator access key..."
                      autoFocus
                      autoComplete="current-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      data-lpignore="true"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-text transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      title={showPasscode ? 'Hide security key' : 'Show security key'}
                      aria-label={showPasscode ? 'Hide security key' : 'Show security key'}
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    Restricted gateway. Enter your master administrator authorization key to continue.
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 pt-1">
                  <Link
                    href="/"
                    className="flex-1 py-3 px-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold text-center transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Go Back</span>
                  </Link>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Enter Portal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="pt-2 text-center border-t border-slate-200 dark:border-zinc-800/80 flex flex-col items-center space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthView('reset-request');
                    setAuthError('');
                    setResetError('');
                    setResetSuccess('');
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Forgot security key? Reset password via email</span>
                </button>
                <Link
                  href="/"
                  className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors inline-flex items-center space-x-1 font-medium"
                >
                  <span>&larr; Return to main student portal</span>
                </Link>
              </div>
            </>
          )}

          {/* VIEW 2: Reset Request (Dispatches 6-Digit Code) */}
          {authView === 'reset-request' && (
            <>
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-indigo-800 dark:text-indigo-200 text-xs space-y-1.5">
                <div className="flex items-center space-x-2 font-semibold text-indigo-900 dark:text-indigo-300">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                  <span>Restricted Administrator Recovery</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Password recovery is strictly restricted to the verified administrator account:
                  <strong className="text-slate-900 dark:text-white font-mono block mt-0.5">shobhitagrawal2004@gmail.com</strong>
                </p>
              </div>

              {resetError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="leading-relaxed">{resetError}</span>
                </div>
              )}

              {resetSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="leading-relaxed">{resetSuccess}</span>
                </div>
              )}

              <form onSubmit={handleResetRequest} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Verified Administrator Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        if (resetError) setResetError('');
                      }}
                      placeholder="shobhitagrawal2004@gmail.com"
                      autoFocus
                      autoComplete="email"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-colors"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    A single-use 6-digit cryptographic verification code will be dispatched to this address.
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView('login');
                      setResetError('');
                      setResetSuccess('');
                    }}
                    className="flex-1 py-3 px-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Back to Login</span>
                  </button>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-3 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50 cursor-pointer"
                  >
                    {resetLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Code</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* VIEW 3: Reset Verification & Password Update */}
          {authView === 'reset-verify' && (
            <>
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-indigo-800 dark:text-indigo-200 text-xs space-y-1">
                <div className="flex items-center space-x-2 font-semibold text-indigo-900 dark:text-indigo-300">
                  <Key className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                  <span>Verification Code Dispatched</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Enter the 6-digit code dispatched to <span className="font-mono text-slate-900 dark:text-white font-medium">{resetEmail}</span> and establish your new security key.
                </p>
              </div>

              {resetError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="leading-relaxed">{resetError}</span>
                </div>
              )}

              {resetSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="leading-relaxed">{resetSuccess}</span>
                </div>
              )}

              <form onSubmit={handleResetVerify} className="space-y-4">
                <div>
                  <label htmlFor="reset-code" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    6-Digit Verification Code
                  </label>
                  <input
                    id="reset-code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => {
                      setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                      if (resetError) setResetError('');
                    }}
                    placeholder="000000"
                    autoFocus
                    autoComplete="one-time-code"
                    required
                    className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Single-use code. Valid for 15 minutes.
                  </p>
                </div>

                <div>
                  <label htmlFor="reset-new-key" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    New Master Security Key
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      id="reset-new-key"
                      type={showResetNewPass ? 'text' : 'password'}
                      value={resetNewPasscode}
                      onChange={(e) => {
                        setResetNewPasscode(e.target.value);
                        if (resetError) setResetError('');
                      }}
                      placeholder="Minimum 8 characters..."
                      autoComplete="new-password"
                      required
                      className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetNewPass(!showResetNewPass)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      title={showResetNewPass ? 'Hide password' : 'Show password'}
                      aria-label={showResetNewPass ? 'Hide password' : 'Show password'}
                    >
                      {showResetNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Must be at least 8 characters long.
                  </p>
                </div>

                <div>
                  <label htmlFor="reset-confirm-key" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Confirm New Security Key
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      id="reset-confirm-key"
                      type={showResetNewPass ? 'text' : 'password'}
                      value={resetConfirmPasscode}
                      onChange={(e) => {
                        setResetConfirmPasscode(e.target.value);
                        if (resetError) setResetError('');
                      }}
                      placeholder="Re-enter new security key..."
                      autoComplete="new-password"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView('reset-request');
                      setResetError('');
                      setResetSuccess('');
                    }}
                    className="flex-1 py-3 px-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-3 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50 cursor-pointer"
                  >
                    {resetLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Update Key</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1020] text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Admin Header Bar - Fully Responsive for Mobile & Tablet */}
      <header className="bg-white dark:bg-[#151D35] border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      Admin Ingestion Hub
                    </h1>
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate max-w-[260px] sm:max-w-md">
                    Real-time uploaded candidate dossiers and login telemetry
                  </p>
                </div>
              </div>

              {/* Mobile Main Site Link */}
              <Link
                href="/"
                className="sm:hidden p-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Return to Main Portal"
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center flex-wrap gap-2">
              <Link
                href="/"
                className="hidden sm:inline-flex px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Main Site</span>
              </Link>

              <button
                onClick={() => fetchAdminData()}
                disabled={loading}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
                <span className="hidden xs:inline">Refresh</span>
              </button>

              <button
                onClick={() => {
                  setChangeKeyErr('');
                  setChangeKeyMsg('');
                  setChangeKeyModalOpen(true);
                }}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                title="Change master admin security key"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Change Key</span>
              </button>

              <button
                onClick={handlePurgeTestRecords}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                title="Purge dummy seeds (@example.com, etc.)"
              >
                <Trash2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="hidden sm:inline">Purge Seeds</span>
              </button>

              <button
                onClick={handleSignOut}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors cursor-pointer"
              >
                Lock
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 w-full flex-1 space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Real Metrics Summary Grid - Fluid responsive for phones & tablets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
          <div className="bg-[#151D35] p-3.5 sm:p-5 rounded-2xl border border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Candidate Resumes</span>
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl sm:text-3xl font-black text-white">
              {data?.metrics.totalResumes ?? 0}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
              Active documents
            </div>
          </div>

          <div className="bg-[#151D35] p-3.5 sm:p-5 rounded-2xl border border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Avg ATS Score</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-3xl font-black text-white">
              {data?.metrics.avgScore ?? 0}
              <span className="text-xs font-semibold text-slate-400">/100</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-0.5 font-semibold">
              {data?.metrics.highPerformers ?? 0} Grade A (&ge;75)
            </div>
          </div>

          <div className="bg-[#151D35] p-3.5 sm:p-5 rounded-2xl border border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Student Profiles</span>
              <Users className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl sm:text-3xl font-black text-white">
              {data?.metrics.totalUsers ?? 0}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
              Candidate accounts
            </div>
          </div>

          <div className="bg-[#151D35] p-3.5 sm:p-5 rounded-2xl border border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Quiz Attempts</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl sm:text-3xl font-black text-white">
              {data?.metrics.totalQuizzes ?? 0}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
              Completed tests
            </div>
          </div>

          <div className="bg-[#151D35] p-3.5 sm:p-5 rounded-2xl border border-zinc-800 shadow-xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Audited Logins</span>
              <LogIn className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-xl sm:text-3xl font-black text-white">
              {data?.loginLogs?.length ?? data?.metrics.totalLogins ?? 0}
            </div>
            <div className="text-[10px] sm:text-[11px] text-sky-400 mt-0.5 font-semibold">
              Tracked sessions
            </div>
          </div>
        </div>

        {/* Primary Tab Navigation - Horizontal Swipeable Container on Mobile */}
        <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => { setActiveTab('workspace'); setMobileDetailOpen(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'workspace'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume Dossier &amp; Reader ({data?.resumes.length ?? 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'table'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Resumes Table View</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Registered Users ({data?.profiles.length ?? 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'skills'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Skill Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('logins')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'logins'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login &amp; Access Audit ({data?.loginLogs?.length ?? 0})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DEDICATED RESUME WORKSPACE & DOCUMENT DOSSIER                      */}
        {/* ========================================================================= */}
        {activeTab === 'workspace' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Candidate List Selector */}
            <div className={`lg:col-span-5 space-y-3 ${mobileDetailOpen ? 'hidden lg:block' : 'block'}`}>
              {/* Search & Sort Controls */}
              <div className="bg-[#151D35] p-3.5 rounded-2xl border border-zinc-800 space-y-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate name, email, or skill..."
                    aria-label="Search candidate records by name, email, or skill"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 text-xs">
                  <select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    aria-label="Filter by candidate ATS grade"
                    className="px-2.5 py-1.5 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs font-medium text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Grades</option>
                    <option value="A+">Grade A+ (88-100)</option>
                    <option value="A">Grade A (78-87)</option>
                    <option value="B">Grade B (66-77)</option>
                    <option value="C">Grade C (52-65)</option>
                    <option value="D">Grade D (&lt;52)</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                    aria-label="Sort candidates by date or score"
                    className="px-2.5 py-1.5 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs font-medium text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="date">Sort: Latest First</option>
                    <option value="score">Sort: Highest Score</option>
                  </select>
                </div>
              </div>

              {/* Candidate Cards List */}
              <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {filteredResumes.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-[#151D35] rounded-2xl border border-zinc-800 text-xs">
                    No uploaded resumes match the selected search filters.
                  </div>
                ) : (
                  filteredResumes.map((resume) => {
                    const isSelected = resume.id === currentResume?.id;
                    const grade = resume.analysis?.grade || (resume.ats_score >= 80 ? 'A' : resume.ats_score >= 65 ? 'B' : 'C');
                    return (
                      <div
                        key={resume.id}
                        onClick={() => {
                          setSelectedResumeId(resume.id);
                          setMobileDetailOpen(true);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-950/50 border-indigo-500 shadow-sm'
                            : 'bg-[#151D35] border-zinc-800 hover:border-zinc-700 hover:bg-slate-850/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="truncate flex-1">
                            <h4 className="font-bold text-xs text-white truncate">
                              {resume.filename}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {resume.user_email || 'Candidate file'}
                            </p>
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0">
                            <span className={`px-2 py-0.5 rounded-lg font-black text-xs ${
                              resume.ats_score >= 80
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                                : resume.ats_score >= 65
                                ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800'
                                : 'bg-amber-950/60 text-amber-400 border border-amber-800'
                            }`}>
                              {resume.ats_score}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {grade}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-zinc-800">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>{new Date(resume.created_at).toLocaleDateString()}</span>
                          </div>
                          <span>
                            {resume.file_size ? `${(resume.file_size / 1024).toFixed(0)} KB` : 'Document'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Dedicated Space to View Uploaded Resume Document */}
            <div className={`lg:col-span-7 ${mobileDetailOpen ? 'block' : 'hidden lg:block'}`}>
              {currentResume ? (
                <div className="bg-[#151D35] rounded-3xl border border-zinc-800 shadow-sm overflow-hidden flex flex-col">
                  {/* Mobile Back Button */}
                  <div className="p-3 bg-[#151D35] border-b border-zinc-800 lg:hidden flex items-center justify-between">
                    <button
                      onClick={() => setMobileDetailOpen(false)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-400 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Candidate List</span>
                    </button>
                    <span className="text-xs font-semibold text-slate-400">
                      Score: {currentResume.ats_score}/100
                    </span>
                  </div>

                  {/* Header Dossier Strip - Clean Matte Slate Surface */}
                  <div className="p-5 sm:p-6 border-b border-zinc-800 bg-[#151D35]/95">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/60 text-indigo-400 border border-indigo-800">
                            Candidate Dossier
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            ID: {currentResume.id.slice(0, 8)}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {currentResume.filename}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1.5">
                          <span className="flex items-center space-x-1">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <strong className="text-slate-200 font-semibold">{currentResume.user_email || 'Applicant'}</strong>
                          </span>
                          <span>•</span>
                          <span>Uploaded: {new Date(currentResume.created_at).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Large Circular/Radial Score Display */}
                      <div className="flex items-center space-x-3 shrink-0">
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center text-white shadow-md font-black ${
                          currentResume.ats_score >= 80
                            ? 'bg-emerald-600 shadow-emerald-600/20'
                            : currentResume.ats_score >= 65
                            ? 'bg-indigo-600 shadow-indigo-600/20'
                            : 'bg-amber-600 shadow-amber-600/20'
                        }`}>
                          <span className="text-2xl sm:text-3xl">{currentResume.ats_score}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-90">/ 100 ATS</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mt-5 pt-4 border-t border-slate-200 dark:border-zinc-800">
                      {/* Reader View Mode Switcher */}
                      <div className="inline-flex items-center bg-slate-100 dark:bg-[#0B1020] p-1 rounded-xl text-xs font-semibold border border-slate-200 dark:border-zinc-800">
                        <button
                          onClick={() => setReaderViewMode('formatted')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            readerViewMode === 'formatted'
                              ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-zinc-700'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          Document Reader
                        </button>
                        <button
                          onClick={() => setReaderViewMode('raw')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            readerViewMode === 'raw'
                              ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-zinc-700'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          Raw Text Stream
                        </button>
                        <button
                          onClick={() => setReaderViewMode('diagnostics')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            readerViewMode === 'diagnostics'
                              ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-zinc-700'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          Diagnostics &amp; AI
                        </button>
                      </div>

                      {/* Tool Buttons */}
                      <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                        {/* Primary Button: Download Authentic PDF / DOCX */}
                        <button
                          onClick={() => handleDownloadOriginalFile(currentResume)}
                          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white inline-flex items-center space-x-1.5 shadow-sm shadow-indigo-900/30 transition-all cursor-pointer"
                          title={`Download uploaded document (${currentResume.filename})`}
                        >
                          <Download className="w-3.5 h-3.5 text-white" />
                          <span>
                            {currentResume.filename.toLowerCase().endsWith('.pdf')
                              ? 'Download PDF'
                              : currentResume.filename.toLowerCase().endsWith('.docx')
                              ? 'Download Word (.docx)'
                              : 'Download Original File'}
                          </span>
                        </button>

                        {/* Secondary Button: Download plain text */}
                        {currentResume.resume_text && (
                          <button
                            onClick={() => handleDownloadText(currentResume)}
                            className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white inline-flex items-center space-x-1.5 transition-all cursor-pointer"
                            title="Download plain text (.txt)"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                            <span>Text (.txt)</span>
                          </button>
                        )}

                        {/* Copy text */}
                        {currentResume.resume_text && (
                          <button
                            onClick={() => handleCopyText(currentResume.resume_text || '')}
                            className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white inline-flex items-center space-x-1.5 transition-all cursor-pointer"
                          >
                            {copiedText ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteResume(currentResume.id)}
                          disabled={deletingId === currentResume.id}
                          className="px-2.5 py-1.5 rounded-xl border border-rose-900/60 bg-rose-950/30 text-rose-400 hover:bg-rose-900/40 hover:text-rose-300 text-xs font-semibold inline-flex items-center space-x-1 transition-colors cursor-pointer"
                          title="Delete record permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reading Space Body */}
                  <div className="p-5 sm:p-6 space-y-6 max-h-[calc(100vh-360px)] overflow-y-auto">
                    {/* VIEW MODE 1: FORMATTED DOCUMENT READER */}
                    {readerViewMode === 'formatted' && (
                      <div className="space-y-6">
                        {/* Summary & Verdict Card */}
                        {currentResume.analysis?.summary && (
                          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 text-xs space-y-1.5">
                            <div className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center space-x-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                              <span>Automated ATS Diagnostic Verdict:</span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                              {currentResume.analysis.summary}
                            </p>
                          </div>
                        )}

                        {/* Extracted Skills Section */}
                        {currentResume.analysis?.matched_keywords && currentResume.analysis.matched_keywords.length > 0 && (
                          <div className="space-y-2.5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                              <span>Verified Technical Skills ({currentResume.analysis.matched_keywords.length})</span>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Matched in candidate document</span>
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                              {currentResume.analysis.matched_keywords.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Extracted Document Preview Paragraphs */}
                        <div className="space-y-3">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                            <span>Extracted Resume Content (Document Flow)</span>
                            <span className="text-[10px] text-slate-500 font-mono">Clean Text Stream</span>
                          </h3>
                          <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1020] border border-zinc-800 text-xs leading-relaxed font-sans text-slate-100 whitespace-pre-wrap selection:bg-indigo-600 selection:text-white shadow-inner">
                            {currentResume.resume_text || 'No readable text content found in document.'}
                          </div>
                        </div>

                        {/* AI Bullet Rewrites */}
                        {currentResume.analysis?.bullet_rewrites && currentResume.analysis.bullet_rewrites.length > 0 && (
                          <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                              <span>AI STAR Bullet Optimization Recommendations</span>
                            </h3>
                            <div className="space-y-3">
                              {currentResume.analysis.bullet_rewrites.map((b, idx) => (
                                <div key={idx} className="p-4 rounded-2xl border border-zinc-800 bg-[#0B1020]/70 text-xs space-y-2">
                                  <div className="text-rose-400">
                                    <span className="font-bold">Original: </span>
                                    {b.original}
                                  </div>
                                  <div className="text-emerald-400 font-medium">
                                    <span className="font-bold">ATS Optimized: </span>
                                    {b.improved}
                                  </div>
                                  <div className="text-[11px] text-slate-400 italic">
                                    Reason: {b.reason}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* VIEW MODE 2: RAW TEXT STREAM */}
                    {readerViewMode === 'raw' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Raw Text Stream (As parsed by parser engine)</span>
                          <span>
                            {currentResume.resume_text ? `${currentResume.resume_text.split(/\s+/).length} words • ${currentResume.resume_text.length} characters` : '0 words'}
                          </span>
                        </div>
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1020] text-slate-100 font-mono text-xs max-h-[500px] overflow-y-auto whitespace-pre-wrap leading-relaxed border border-zinc-800">
                          {currentResume.resume_text || 'No raw text stream available.'}
                        </div>
                      </div>
                    )}

                    {/* VIEW MODE 3: ATS DIAGNOSTICS & KEYWORD GAPS */}
                    {readerViewMode === 'diagnostics' && (
                      <div className="space-y-6">
                        {/* 4 Category Breakdown Progress Bars */}
                        {currentResume.analysis?.breakdown && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-zinc-800">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Contact &amp; Links</span>
                              <span className="text-lg font-black text-indigo-400">{currentResume.analysis.breakdown.contact_score}%</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-zinc-800">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Skills Match</span>
                              <span className="text-lg font-black text-emerald-400">{currentResume.analysis.breakdown.skills_score}%</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-zinc-800">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Impact &amp; STAR</span>
                              <span className="text-lg font-black text-indigo-400">{currentResume.analysis.breakdown.experience_score}%</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-zinc-800">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">ATS Formatting</span>
                              <span className="text-lg font-black text-sky-400">{currentResume.analysis.breakdown.formatting_score}%</span>
                            </div>
                          </div>
                        )}

                        {/* Missing Keywords Gap */}
                        {currentResume.analysis?.missing_keywords && currentResume.analysis.missing_keywords.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                              Missing Industry Keywords to Target
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {currentResume.analysis.missing_keywords.map((s, idx) => (
                                <span key={idx} className="px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-semibold">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Formatting Flags */}
                        {currentResume.analysis?.formatting_issues && currentResume.analysis.formatting_issues.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                              ATS Formatting Observations
                            </h4>
                            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                              {currentResume.analysis.formatting_issues.map((issue, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <span className="text-indigo-500">•</span>
                                  <span>{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#151D35] rounded-3xl border border-slate-200 dark:border-zinc-800 p-12 text-center text-slate-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    No Resume Selected
                  </h3>
                  <p className="text-xs mt-1">
                    Select a candidate document from the left to inspect full content, ATS score breakdown, and keywords.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: RESUMES TABLE VIEW                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'table' && (
          <div className="space-y-4">
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#151D35] p-4 rounded-2xl border border-slate-200 dark:border-zinc-800">
              <div className="relative w-full sm:w-96">
                <label htmlFor={searchInputId} className="sr-only">Search resumes</label>
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
                <input
                  id={searchInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidate, email, filename, or skill..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#0B1020] text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-xs text-slate-600 dark:text-slate-400">Filter Grade:</span>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#0B1020] text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
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

            {/* Table */}
            <div className="bg-white dark:bg-[#151D35] rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#0B1020] border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Candidate / Document</th>
                      <th className="py-3.5 px-4">ATS Score</th>
                      <th className="py-3.5 px-4">Matched Skills</th>
                      <th className="py-3.5 px-4">Date Uploaded</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {filteredResumes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          No uploaded resumes match the current search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredResumes.map((resume) => {
                        const grade = resume.analysis?.grade || 'C';
                        const score = resume.ats_score;
                        const matchedCount = resume.analysis?.matched_keywords?.length || 0;

                        return (
                          <tr key={resume.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-850/40 transition-colors">
                            {/* Candidate & File */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="truncate max-w-xs">
                                  <div className="font-bold text-slate-900 dark:text-white truncate">
                                    {resume.filename}
                                  </div>
                                  <div className="text-[11px] text-slate-500 truncate">
                                    {resume.user_email || 'Candidate file'}
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
                                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900'
                                    : score >= 60
                                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                                }`}>
                                  {score} / 100
                                </span>
                                <span className="font-bold text-slate-500 text-[11px]">
                                  Grade {grade}
                                </span>
                              </div>
                            </td>

                            {/* Matched Skills */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-1.5 flex-wrap max-w-sm">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                  {matchedCount} skills detected
                                </span>
                                {resume.analysis?.matched_keywords?.slice(0, 3).map((s, idx) => (
                                  <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-[10px] text-slate-600 dark:text-slate-400">
                                    {s}
                                  </span>
                                ))}
                                {matchedCount > 3 && (
                                  <span className="text-[10px] text-slate-400">+{matchedCount - 3} more</span>
                                )}
                              </div>
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                              {new Date(resume.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedResumeId(resume.id);
                                    setActiveTab('workspace');
                                    setMobileDetailOpen(true);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold text-xs flex items-center space-x-1 transition-all cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View in Dossier</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteResume(resume.id)}
                                  disabled={deletingId === resume.id}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                                  title="Delete record permanently"
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

        {/* ========================================================================= */}
        {/* TAB 3: REGISTERED USERS                                                   */}
        {/* ========================================================================= */}
        {activeTab === 'users' && (
          <div className="bg-[#151D35] rounded-2xl border border-zinc-800 p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Registered Student Accounts ({data?.profiles.length ?? 0})
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Candidate user accounts currently registered on StackUp
              </p>
            </div>

            {!data?.metrics?.hasServiceRole && (
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-xs text-indigo-800 dark:text-indigo-200 flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Direct Supabase Auth Sync Available</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    Currently displaying candidates active in dossiers and platform sessions. To directly mirror all registered accounts from Supabase <code className="text-indigo-600 dark:text-indigo-300 font-mono">auth.users</code> (including those who have not yet uploaded a resume), add <code className="text-indigo-600 dark:text-indigo-300 font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to your Vercel Project Settings.
                  </p>
                </div>
              </div>
            )}

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-[#0B1020] border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Candidate Profile</th>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Last Login Time</th>
                    <th className="py-3 px-4">Uploaded Resumes</th>
                    <th className="py-3 px-4">Top ATS Score</th>
                    <th className="py-3 px-4">Account Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {data?.profiles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No registered profiles found in database yet.
                      </td>
                    </tr>
                  ) : (
                    data?.profiles.map((profile) => (
                      <tr key={profile.id} className="hover:bg-slate-50 dark:hover:bg-zinc-850/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {profile.full_name || 'Student Account'}
                          </div>
                          {profile.email && profile.email !== '—' && (
                            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
                              {profile.email}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                          {profile.id}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {profile.last_sign_in_at ? (
                            <div className="space-y-0.5">
                              <div className="flex items-center space-x-1.5 font-bold text-slate-900 dark:text-white text-xs">
                                <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                <span>{formatExactDateTime(profile.last_sign_in_at).full}</span>
                              </div>
                              <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400 pl-5">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                                <span>{getRelativeTime(profile.last_sign_in_at)}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500 text-xs italic">Never logged in</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200">
                            {profile.resumes_count ?? 0} {profile.resumes_count === 1 ? 'dossier' : 'dossiers'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {profile.latest_score !== null && profile.latest_score !== undefined ? (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              profile.latest_score >= 75
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                            }`}>
                              {profile.latest_score}/100
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 text-xs whitespace-nowrap">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {formatExactDateTime(profile.created_at).full}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {getRelativeTime(profile.created_at)}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SKILL TRENDS                                                       */}
        {/* ========================================================================= */}
        {activeTab === 'skills' && (
          <div className="bg-[#151D35] rounded-2xl border border-zinc-800 p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">
                Technical Skills Detected Across Uploaded Resumes
              </h2>
              <p className="text-xs text-slate-400">
                Most frequent engineering technologies extracted from applicant documents
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(data?.topSkills || []).map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0B1020] border border-zinc-800 flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-100">
                    {item.skill}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800 font-extrabold text-xs">
                    {item.count} resumes
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: LOGIN & ACCESS AUDIT (REAL DATA ONLY)                             */}
        {/* ========================================================================= */}
        {activeTab === 'logins' && (
          <div className="bg-[#151D35] rounded-2xl border border-zinc-800 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-white">
                    User Login &amp; Access Audit
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-950/60 text-sky-400 border border-sky-800">
                    Live Security Telemetry
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Chronological audit of authenticated student sessions (who logged in, authentication method, device, and exact timestamp)
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-2.5 flex-wrap">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={loginSearchQuery}
                    onChange={(e) => setLoginSearchQuery(e.target.value)}
                    placeholder="Search by email, name, or IP..."
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#0B1020] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-56"
                  />
                </div>

                <select
                  value={authMethodFilter}
                  onChange={(e) => setAuthMethodFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#0B1020] text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="ALL">All Auth Methods</option>
                  <option value="google">Google OAuth</option>
                  <option value="password">Email &amp; Password</option>
                  <option value="phone_otp">Phone SMS OTP</option>
                  <option value="email_otp">Email OTP</option>
                </select>
              </div>
            </div>

            {/* Audit Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-[#0B1020] border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">User / Account</th>
                    <th className="py-3 px-4">How They Logged In</th>
                    <th className="py-3 px-4">Network &amp; Device</th>
                    <th className="py-3 px-4">When They Logged In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {filteredLoginLogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-10 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <LogIn className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                          <p className="font-semibold text-slate-700 dark:text-slate-300">No login events matching filter</p>
                          <p className="text-[11px] text-slate-500 max-w-sm">
                            Authentication sessions via Google OAuth, Email/Password, and OTP are recorded automatically in real time.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLoginLogs.map((log) => {
                      const methodKey = log.auth_method.toLowerCase();
                      const isGoogle = methodKey.includes('google');
                      const isPassword = methodKey.includes('password');
                      const isPhoneOtp = methodKey.includes('phone') || methodKey.includes('sms');
                      const isEmailOtp = methodKey.includes('otp') && !isPhoneOtp;

                      let badgeClass = 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-700';
                      let methodLabel = log.auth_method;
                      let MethodIcon = Lock;

                      if (isGoogle) {
                        badgeClass = 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800';
                        methodLabel = 'Google OAuth';
                        MethodIcon = Globe;
                      } else if (isPassword) {
                        badgeClass = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
                        methodLabel = 'Email & Password';
                        MethodIcon = Lock;
                      } else if (isPhoneOtp) {
                        badgeClass = 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
                        methodLabel = 'Phone SMS OTP';
                        MethodIcon = Smartphone;
                      } else if (isEmailOtp) {
                        badgeClass = 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
                        methodLabel = 'Email OTP';
                        MethodIcon = Mail;
                      }

                      // Parse simple device string from user agent
                      let deviceSummary = 'Desktop / Browser';
                      if (log.user_agent) {
                        const ua = log.user_agent.toLowerCase();
                        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
                          deviceSummary = 'Mobile Device';
                        } else if (ua.includes('macintosh') || ua.includes('mac os')) {
                          deviceSummary = 'macOS Browser';
                        } else if (ua.includes('windows')) {
                          deviceSummary = 'Windows Browser';
                        } else if (ua.includes('linux')) {
                          deviceSummary = 'Linux Browser';
                        }
                      }

                      const dateObj = new Date(log.created_at);
                      const exactFormatted = isNaN(dateObj.getTime())
                        ? log.created_at
                        : dateObj.toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          });

                      return (
                        <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-zinc-850/40 transition-colors">
                          {/* User info */}
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">
                              {log.full_name || 'Student Account'}
                            </div>
                            <div className="text-[11px] text-slate-600 dark:text-slate-300 font-mono mt-0.5">
                              {log.email || 'No email provided'}
                            </div>
                            {log.user_id && (
                              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                UID: {log.user_id.slice(0, 10)}...
                              </div>
                            )}
                          </td>

                          {/* How they logged in */}
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeClass}`}>
                              <MethodIcon className="w-3 h-3" />
                              <span>{methodLabel}</span>
                            </span>
                          </td>

                          {/* Network & Device */}
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                              <Globe className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                              <span>{log.ip_address || '127.0.0.1'}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] mt-0.5" title={log.user_agent || ''}>
                              <Laptop className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                              <span className="truncate max-w-[200px]">{deviceSummary}</span>
                            </div>
                          </td>

                          {/* When they logged in */}
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            <div className="space-y-0.5">
                              <div className="flex items-center space-x-1.5">
                                <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                <span className="font-semibold text-slate-800 dark:text-slate-100">{exactFormatted}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-5 flex items-center space-x-1.5">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                                <span>{getRelativeTime(log.created_at)}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Privacy & Credentials Notice */}
            <div className="p-3.5 rounded-xl bg-[#0B1020]/70 border border-zinc-800 text-[11px] text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>End-User Privacy Guarantee:</strong> Passwords are encrypted cryptographically with salt and never stored or visible in plaintext. Only authentication methods and access telemetry are audited.
              </span>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: CHANGE MASTER ADMIN KEY                                           */}
      {/* ========================================================================= */}
      {changeKeyModalOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setChangeKeyModalOpen(false);
              setChangeKeyErr('');
              setChangeKeyMsg('');
            }
          }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="max-w-md w-full bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-left relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setChangeKeyModalOpen(false);
                setChangeKeyErr('');
                setChangeKeyMsg('');
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Update Master Security Key
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Change the administrator password for this portal
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0B1020]/90 border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Server-Side Admin Security</span>
              Your portal authenticates against <code className="text-indigo-600 dark:text-indigo-400 bg-slate-200 dark:bg-zinc-800 px-1 py-0.5 rounded">ADMIN_PASSCODE</code> defined in your server environment variables. Entering a new passcode below updates the runtime server passcode. For permanent persistence across redeployments, update <code className="text-indigo-600 dark:text-indigo-400 bg-slate-200 dark:bg-zinc-800 px-1 py-0.5 rounded">ADMIN_PASSCODE</code> in your Vercel project settings.
            </div>

            {changeKeyErr && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{changeKeyErr}</span>
              </div>
            )}

            {changeKeyMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{changeKeyMsg}</span>
              </div>
            )}

            <form onSubmit={handleChangePasscode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  New Security Key
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Enter at least 6 characters..."
                    required
                    minLength={6}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-[#0B1020] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm Security Key
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={confirmNewPasscode}
                    onChange={(e) => setConfirmNewPasscode(e.target.value)}
                    placeholder="Re-enter new security key..."
                    required
                    minLength={6}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-[#0B1020] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setChangeKeyModalOpen(false);
                    setChangeKeyErr('');
                    setChangeKeyMsg('');
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changeKeyLoading}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {changeKeyLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Key</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
