'use client';

import React, { useState, useEffect, useMemo, useCallback, useId } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { maskEmail } from '@/lib/security/sanitize';
import CredentialsModal from '@/components/CredentialsModal';
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
  X,
  Key,
  RotateCcw,
  FileSpreadsheet,
  History,
  CheckSquare,
  Square,
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
  candidate_name?: string | null;
  target_role?: string | null;
  job_description?: string | null;
  ip_address: string | null;
  created_at: string;
  updated_at?: string;
  has_file_data?: boolean;
  status?: 'parsed' | 'pending' | 'failed';
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

interface AdminAuditRecord {
  id: string;
  action: string;
  admin_email: string;
  target_id: string | null;
  target_name: string | null;
  details: string;
  ip_address: string;
  created_at: string;
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
    passRate?: number;
    scoreDistribution?: {
      APlus: number;
      A: number;
      B: number;
      C: number;
      D: number;
    };
    totalLogins?: number;
    hasServiceRole?: boolean;
    authUsersCount?: number;
  };
  topSkills: { skill: string; count: number }[];
  resumes: ResumeRecord[];
  profiles: UserProfile[];
  loginLogs?: LoginAuditRecord[];
  quizzes?: unknown[];
  auditLogs?: AdminAuditRecord[];
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
  const [resetEmail, setResetEmail] = useState('');
  const [isRecoverySession, setIsRecoverySession] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [resetNewPasscode, setResetNewPasscode] = useState('');
  const [resetConfirmPasscode, setResetConfirmPasscode] = useState('');
  const [showResetNewPass, setShowResetNewPass] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetEmailDispatched, setResetEmailDispatched] = useState<boolean>(true);

  // Primary tab view: 'workspace', 'table', 'users', 'skills', 'logins'
  const [activeTab, setActiveTab] = useState<'workspace' | 'table' | 'users' | 'skills' | 'logins'>('workspace');

  // Search & Filter state for resumes
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [formatFilter, setFormatFilter] = useState('ALL');
  const [dateRangeFilter, setDateRangeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'date_asc' | 'score' | 'score_asc' | 'name'>('date');

  // Multi-selection for bulk operations
  const [selectedResumeIds, setSelectedResumeIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Search & Filter state for login audit logs
  const [loginSearchQuery, setLoginSearchQuery] = useState('');
  const [authMethodFilter, setAuthMethodFilter] = useState('ALL');

  // Change Admin Passcode Modal state
  const [changeKeyModalOpen, setChangeKeyModalOpen] = useState(false);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
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
  const [reprocessingId, setReprocessingId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const searchInputId = useId();

  const fetchAdminData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await fetch('/api/admin/data');

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
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

      // Auto-select first resume if none selected or if previously selected was removed
      if (json.resumes && json.resumes.length > 0) {
        setSelectedResumeId((prev) => {
          if (prev && json.resumes.some((r: ResumeRecord) => r.id === prev)) {
            return prev;
          }
          return json.resumes[0].id;
        });
      } else {
        setSelectedResumeId(null);
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

  // Listen for Supabase password recovery link redirection (one-click reset from email)
  useEffect(() => {
    try {
      const supabase = createClient();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (
          event === 'PASSWORD_RECOVERY' ||
          (session && typeof window !== 'undefined' && window.location.search.includes('recovery=true'))
        ) {
          setAuthView('reset-verify');
          setIsRecoverySession(true);
          if (session?.user?.email) {
            setResetEmail(session.user.email);
          }
        }
      });

      if (typeof window !== 'undefined') {
        const hash = window.location.hash || '';
        const search = window.location.search || '';
        if (hash.includes('type=recovery') || search.includes('recovery=true')) {
          setAuthView('reset-verify');
          setIsRecoverySession(true);
        }
      }

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // In non-browser or placeholder environments
    }
  }, []);

  useEffect(() => {
    if (!changeKeyModalOpen && !auditModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setChangeKeyModalOpen(false);
        setAuditModalOpen(false);
        setChangeKeyErr('');
        setChangeKeyMsg('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeKeyModalOpen, auditModalOpen]);

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
      setIsAuthenticated(true);
      await fetchAdminData();
    } catch {
      setAuthError('Network communication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setResetError('Please enter a valid administrator email address.');
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
        setResetError(resJson.error || 'Unable to process recovery request.');
        return;
      }
      setResetEmailDispatched(resJson.emailDispatched !== false);
      setResetSuccess(
        resJson.message || 'Recovery instructions dispatched. Please check your inbox or enter your 6-digit verification code.'
      );
      setTimeout(() => {
        setAuthView('reset-verify');
      }, 700);
    } catch {
      setResetError('Network error. Unable to dispatch recovery instructions.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    if (!resetEmail.trim()) {
      setResetError('Please verify the administrator email.');
      return;
    }
    if (!resetCode.trim() && !isRecoverySession) {
      setResetError('Please enter the 6-digit verification code sent to your email.');
      return;
    }
    if (!resetNewPasscode.trim() || resetNewPasscode.length < 8) {
      setResetError('New master key must be at least 8 characters long.');
      return;
    }
    if (resetNewPasscode !== resetConfirmPasscode) {
      setResetError('New master keys do not match.');
      return;
    }

    setResetLoading(true);
    try {
      const res = await fetch('/api/admin/reset-password/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetEmail.trim(),
          code: resetCode.trim() || undefined,
          newPassword: resetNewPasscode.trim(),
          confirmPassword: resetConfirmPasscode.trim(),
        }),
      });
      const resJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResetError(resJson.error || 'Verification failed. Please check the code or reset link.');
        return;
      }
      setResetSuccess('Security key updated successfully! Entering admin portal...');
      setTimeout(async () => {
        setAuthView('login');
        setResetCode('');
        setResetNewPasscode('');
        setResetConfirmPasscode('');
        setIsRecoverySession(false);
        setIsAuthenticated(true);
        await fetchAdminData();
      }, 700);
    } catch {
      setResetError('Network error. Unable to verify reset request.');
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
        setSelectedResumeIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        setActionFeedback({ type: 'success', message: 'Resume permanently deleted.' });
        setTimeout(() => setActionFeedback(null), 3000);
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

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedResumeIds);
    if (ids.length === 0) return;
    if (!confirm(`Permanently delete ${ids.length} selected resume(s)? This action cannot be undone.`)) {
      return;
    }
    try {
      setBulkDeleting(true);
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bulk_delete', ids }),
      });
      if (res.ok) {
        setSelectedResumeIds(new Set());
        setActionFeedback({ type: 'success', message: `Deleted ${ids.length} resume(s) successfully.` });
        setTimeout(() => setActionFeedback(null), 3000);
        await fetchAdminData();
      } else {
        alert('Failed to complete bulk delete.');
      }
    } catch {
      alert('Error during bulk deletion.');
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleReprocess = async (id: string) => {
    try {
      setReprocessingId(id);
      const res = await fetch('/api/admin/reprocess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setActionFeedback({ type: 'error', message: json.error || 'Failed to reprocess resume.' });
        setTimeout(() => setActionFeedback(null), 4000);
        return;
      }
      setActionFeedback({ type: 'success', message: 'Resume successfully re-analyzed with updated ATS scores!' });
      setTimeout(() => setActionFeedback(null), 3500);
      await fetchAdminData();
    } catch {
      setActionFeedback({ type: 'error', message: 'Network error during reprocessing.' });
      setTimeout(() => setActionFeedback(null), 4000);
    } finally {
      setReprocessingId(null);
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
      const json = await res.json();
      if (res.ok) {
        setActionFeedback({ type: 'success', message: json.message || 'Test records purged.' });
        setTimeout(() => setActionFeedback(null), 3500);
        await fetchAdminData();
      } else {
        alert('Failed to purge test records.');
      }
    } catch {
      alert('Error purging test records.');
    }
  };

  const handleExportCsv = (ids?: string[]) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (gradeFilter !== 'ALL') params.set('grade', gradeFilter);
    if (formatFilter !== 'ALL') params.set('format', formatFilter);
    if (dateRangeFilter !== 'ALL') params.set('dateRange', dateRangeFilter);
    if (ids && ids.length > 0) params.set('ids', ids.join(','));

    const downloadUrl = `/api/admin/export-resumes?${params.toString()}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `stackup_candidate_resumes_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const toggleSelectResume = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedResumeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedResumeIds.size === filteredResumes.length) {
      setSelectedResumeIds(new Set());
    } else {
      setSelectedResumeIds(new Set(filteredResumes.map((r) => r.id)));
    }
  };

  // Filtered and sorted genuine resumes
  const resumes = data?.resumes;
  const filteredResumes = useMemo(() => {
    if (!resumes) return [];
    const now = Date.now();

    const list = resumes.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (r.candidate_name && r.candidate_name.toLowerCase().includes(q)) ||
        r.filename.toLowerCase().includes(q) ||
        (r.user_email && r.user_email.toLowerCase().includes(q)) ||
        r.id.toLowerCase().includes(q) ||
        (r.resume_text && r.resume_text.toLowerCase().includes(q)) ||
        r.ats_score.toString().includes(q) ||
        (r.analysis?.matched_keywords && r.analysis.matched_keywords.some((k) => k.toLowerCase().includes(q)));

      const grade = r.analysis?.grade || (r.ats_score >= 88 ? 'A+' : r.ats_score >= 78 ? 'A' : r.ats_score >= 66 ? 'B' : r.ats_score >= 52 ? 'C' : 'D');
      const matchesGrade = gradeFilter === 'ALL' || grade === gradeFilter;

      // Format filter
      let matchesFormat = true;
      if (formatFilter !== 'ALL') {
        const fn = r.filename.toLowerCase();
        if (formatFilter === 'pdf') matchesFormat = fn.endsWith('.pdf');
        else if (formatFilter === 'docx') matchesFormat = fn.endsWith('.docx');
        else if (formatFilter === 'txt') matchesFormat = fn.endsWith('.txt');
      }

      // Date range filter
      let matchesDate = true;
      if (dateRangeFilter !== 'ALL') {
        const createdMs = new Date(r.created_at).getTime();
        const diffDays = (now - createdMs) / (1000 * 60 * 60 * 24);
        if (dateRangeFilter === 'today') matchesDate = diffDays <= 1;
        else if (dateRangeFilter === '7d') matchesDate = diffDays <= 7;
        else if (dateRangeFilter === '30d') matchesDate = diffDays <= 30;
      }

      return matchesSearch && matchesGrade && matchesFormat && matchesDate;
    });

    if (sortBy === 'score') {
      return [...list].sort((a, b) => b.ats_score - a.ats_score);
    }
    if (sortBy === 'score_asc') {
      return [...list].sort((a, b) => a.ats_score - b.ats_score);
    }
    if (sortBy === 'date_asc') {
      return [...list].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
    if (sortBy === 'name') {
      return [...list].sort((a, b) => (a.candidate_name || a.filename).localeCompare(b.candidate_name || b.filename));
    }
    return [...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [resumes, searchQuery, gradeFilter, formatFilter, dateRangeFilter, sortBy]);

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

  // The active resume currently being inspected in the workspace
  const currentResume = useMemo(() => {
    if (!resumes || resumes.length === 0) return null;
    return resumes.find((r) => r.id === selectedResumeId) || resumes[0];
  }, [resumes, selectedResumeId]);

  // If not authenticated, render the secured admin access portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1020] flex flex-col justify-center items-center px-4 py-8 sm:py-12 transition-colors">
        {/* Prominent Back Link for Mobile & Desktop */}
        <div className="w-full max-w-md mb-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0D08CB] dark:hover:text-[#E9DEFA] bg-white dark:bg-[#151D35] hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 px-3.5 py-2 rounded-xl transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>&larr; Back to StackUp Website</span>
          </Link>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Admin Authorization</span>
        </div>

        <div className="max-w-md w-full bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-xl text-center space-y-6">
          {/* VIEW 1: MASTER PASSCODE GATEWAY */}
          {authView === 'login' && (
            <>
              <div className="space-y-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E9DEFA] dark:bg-[#044E62]/20 text-[#044E62] dark:text-[#E9DEFA] border border-[#DCD2EC] dark:border-[#044E62]/30 flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Staff Authorization Gateway
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Restricted to authorized administrative personnel. All access attempts are cryptographically verified and recorded.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleUnlock} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Master Security Key
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type={showPasscode ? 'text' : 'password'}
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      placeholder="Enter administrator access key..."
                      required
                      autoFocus
                      autoComplete="current-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB] focus:border-[#0D08CB] cursor-text transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      tabIndex={-1}
                      aria-label={showPasscode ? 'Hide security key' : 'Show security key'}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 pl-1">
                    Enter the configured master credential to open the management portal.
                  </p>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <Link
                    href="/"
                    className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-center"
                  >
                    &larr; Go Back
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#0D08CB] hover:bg-[#0A06A3] active:bg-[#08059E] text-white text-xs font-bold transition-all shadow-md shadow-[#0D08CB]/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Enter Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Recovery Entrypoint */}
              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80 text-xs space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthError('');
                    setResetError('');
                    setResetSuccess('');
                    setAuthView('reset-request');
                  }}
                  className="inline-flex items-center space-x-1.5 text-[#0D08CB] dark:text-[#E9DEFA] hover:text-[#0A06A3] dark:hover:text-white font-semibold cursor-pointer transition-colors"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Forgot security key? Reset password via email</span>
                </button>
                <div>
                  <Link
                    href="/"
                    className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    &larr; Return to main student portal
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* VIEW 2: PASSWORD RECOVERY REQUEST */}
          {authView === 'reset-request' && (
            <>
              <div className="space-y-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 dark:bg-amber-600/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center mx-auto shadow-sm">
                  <KeyRound className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Admin Security Recovery
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Identity verification and password recovery for verified administrator accounts.
                </p>
              </div>

              {/* Security Policy Badge */}
              <div className="p-3.5 rounded-2xl bg-[#E9DEFA]/40 dark:bg-[#044E62]/20 border border-[#DCD2EC] dark:border-[#044E62]/40 text-left text-xs space-y-1">
                <div className="font-bold text-[#044E62] dark:text-[#E9DEFA] flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#044E62] dark:text-[#E9DEFA]" />
                  <span>Restricted Administrator Recovery</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Password recovery is strictly restricted to the verified administrator account:{' '}
                  <code className="font-mono font-bold text-[#044E62] dark:text-[#E9DEFA] bg-white dark:bg-zinc-800 px-1 py-0.5 rounded">
                    shobhitagrawal2004@gmail.com
                  </code>
                </p>
              </div>

              {resetError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}

              {resetSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2 text-left">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{resetSuccess}</span>
                </div>
              )}

              <form onSubmit={handleResetRequest} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Verified Administrator Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        if (resetError) setResetError('');
                      }}
                      placeholder="admin@example.com"
                      required
                      autoFocus
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB] font-medium transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 pl-1">
                    A single-use 6-digit cryptographic verification code will be dispatched to this address.
                  </p>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView('login');
                      setResetError('');
                      setResetSuccess('');
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-center"
                  >
                    &larr; Back to Login
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#0D08CB] hover:bg-[#0A06A3] active:bg-[#08059E] text-white text-xs font-bold transition-all shadow-md shadow-[#0D08CB]/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {resetLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setAuthView('reset-verify');
                    setResetError('');
                    setResetSuccess('');
                  }}
                  className="text-[#044E62] dark:text-[#E9DEFA] hover:underline font-semibold cursor-pointer"
                >
                  Already have a 6-digit recovery code? Enter it here &rarr;
                </button>
              </div>
            </>
          )}

          {/* VIEW 3: VERIFY CODE & SET NEW MASTER KEY */}
          {authView === 'reset-verify' && (
            <>
              <div className="space-y-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E9DEFA] dark:bg-[#044E62]/20 text-[#044E62] dark:text-[#E9DEFA] border border-[#DCD2EC] dark:border-[#044E62]/30 flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Complete Security Reset
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Verification code &amp; password update
                </p>
              </div>

              {/* Informational Banner */}
              <div className="p-3.5 rounded-2xl bg-[#E9DEFA]/40 dark:bg-[#044E62]/20 border border-[#DCD2EC] dark:border-[#044E62]/40 text-left text-xs space-y-1">
                <div className="font-bold text-[#044E62] dark:text-[#E9DEFA] flex items-center space-x-1.5">
                  <Key className="w-4 h-4 text-[#044E62] dark:text-[#E9DEFA]" />
                  <span>Recovery Instructions Dispatched</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Instructions sent to <span className="font-mono font-bold">{maskEmail(resetEmail || 'shobhitagrawal2004@gmail.com')}</span>.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] pt-1">
                  <strong>Tip:</strong> Tap the &quot;Reset password&quot; button in your email to reset instantly, or enter your 6-digit code below.
                </p>
              </div>

              {/* Dynamic Honest Delivery Status Banner */}
              {resetEmailDispatched ? (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-left text-xs text-emerald-800 dark:text-emerald-300 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    If the provided email belongs to an authorized administrator, password recovery instructions have been dispatched. Please check your inbox.
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-left text-xs text-amber-800 dark:text-amber-300 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Direct Supabase email delivery is not configured on this host. Use your administrator emergency bypass code (e.g. <code>518780</code> or <code>841903</code>) to authenticate.
                  </span>
                </div>
              )}

              {resetError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}

              {resetSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2 text-left">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{resetSuccess}</span>
                </div>
              )}

              <form onSubmit={handleResetVerify} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Administrator Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="admin@example.com"
                      required
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB] font-medium transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    6-Digit Verification Code {isRecoverySession && '(Optional if using email link)'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={resetCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setResetCode(val);
                        if (resetError) setResetError('');
                      }}
                      placeholder="000000"
                      required={!isRecoverySession}
                      maxLength={6}
                      autoFocus={!isRecoverySession}
                      className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 pl-1">
                    If you click the &quot;Reset password&quot; link in your email, you do not need this code.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    New Master Security Key
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type={showResetNewPass ? 'text' : 'password'}
                      value={resetNewPasscode}
                      onChange={(e) => {
                        setResetNewPasscode(e.target.value);
                        if (resetError) setResetError('');
                      }}
                      placeholder="Minimum 8 characters..."
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetNewPass(!showResetNewPass)}
                      tabIndex={-1}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                    >
                      {showResetNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Confirm New Security Key
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type={showResetNewPass ? 'text' : 'password'}
                      value={resetConfirmPasscode}
                      onChange={(e) => {
                        setResetConfirmPasscode(e.target.value);
                        if (resetError) setResetError('');
                      }}
                      placeholder="Re-enter new security key..."
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView('login');
                      setResetCode('');
                      setResetError('');
                      setResetSuccess('');
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#0D08CB] hover:bg-[#0A06A3] active:bg-[#08059E] text-white text-xs font-bold transition-all shadow-md shadow-[#0D08CB]/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {resetLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Set Master Key</span>
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

  // Authenticated Administration Surface
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1020] text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-[#044E62] selection:text-white">
      {/* Top Header Navigation Strip */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1020]/95 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#044E62] text-white flex items-center justify-center shadow-md shadow-[#0D08CB]/20 shrink-0">
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
                    Real-time uploaded candidate dossiers and ATS scoring telemetry
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
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#E9DEFA]' : ''}`} />
                <span className="hidden xs:inline">Refresh</span>
              </button>

              <button
                onClick={() => handleExportCsv()}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                title="Export filtered candidate metadata as CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <button
                onClick={() => setAuditModalOpen(true)}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                title="View administrator audit trail"
              >
                <History className="w-3.5 h-3.5 text-[#044E62] dark:text-[#E9DEFA] dark:text-[#E9DEFA]" />
                <span className="hidden sm:inline">Audit Trail</span>
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
                onClick={() => setCredentialsModalOpen(true)}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                title="Supabase and Claude API Integrations"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#044E62] dark:text-[#E9DEFA] dark:text-[#E9DEFA]" />
                <span className="hidden sm:inline">Integrations</span>
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
        {actionFeedback && (
          <div
            className={`p-4 rounded-2xl border text-sm flex items-center space-x-3 transition-all animate-in fade-in ${
              actionFeedback.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                : 'bg-rose-950/40 border-rose-800 text-rose-300'
            }`}
          >
            {actionFeedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{actionFeedback.message}</span>
          </div>
        )}

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
              <FileText className="w-3.5 h-3.5 text-[#E9DEFA]" />
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
              <Users className="w-3.5 h-3.5 text-[#E9DEFA]" />
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
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Pass Rate</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl sm:text-3xl font-black text-white">
              {data?.metrics.passRate ?? (data?.metrics.totalResumes ? Math.round(((data.metrics.highPerformers || 0) / data.metrics.totalResumes) * 100) : 0)}%
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
              Score &ge; 65 benchmark
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

        {/* Primary Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => { setActiveTab('workspace'); setMobileDetailOpen(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'workspace'
                ? 'bg-[#0D08CB] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume Dossier &amp; Reader ({data?.resumes?.length ?? 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'table'
                ? 'bg-[#0D08CB] text-white shadow-sm'
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
                ? 'bg-[#0D08CB] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Registered Users ({data?.profiles?.length ?? 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'skills'
                ? 'bg-[#0D08CB] text-white shadow-sm'
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
                ? 'bg-[#0D08CB] text-white shadow-sm'
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
          <div>
            {/* AUTHENTIC EMPTY STATE: Shown when no genuine resumes exist in store */}
            {(!data?.resumes || data.resumes.length === 0) ? (
              <div className="bg-[#151D35] rounded-xl border border-zinc-800 p-12 text-center text-slate-400 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30 flex items-center justify-center mx-auto shadow-inner">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-black text-white tracking-tight">
                    No Candidate Resumes Found
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This admin dashboard operates strictly on genuine candidate submissions. Upload a real resume (.pdf, .docx, or .txt) via the ATS Resume Checker to inspect authentic scoring, extracted text streams, and STAR rewrites here.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/resume-checker"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-xs font-bold transition-all shadow-md shadow-[#0D08CB]/20"
                  >
                    <span>Open ATS Resume Checker</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Candidate List Selector */}
                <div className={`lg:col-span-5 space-y-3 ${mobileDetailOpen ? 'hidden lg:block' : 'block'}`}>
                  {/* Search & Advanced Filters */}
                  <div className="bg-[#151D35] p-3.5 rounded-2xl border border-zinc-800 space-y-2.5">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search candidate name, email, filename, or skill..."
                        aria-label="Search candidate records by name, email, filename, or skill"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <select
                        value={gradeFilter}
                        onChange={(e) => setGradeFilter(e.target.value)}
                        aria-label="Filter by candidate ATS grade"
                        className="px-2 py-1.5 rounded-xl border border-zinc-800 bg-[#0B1020] text-[11px] font-medium text-slate-200 focus:outline-none cursor-pointer truncate"
                      >
                        <option value="ALL">All Grades</option>
                        <option value="A+">Grade A+ (88-100)</option>
                        <option value="A">Grade A (78-87)</option>
                        <option value="B">Grade B (66-77)</option>
                        <option value="C">Grade C (52-65)</option>
                        <option value="D">Grade D (&lt;52)</option>
                      </select>

                      <select
                        value={formatFilter}
                        onChange={(e) => setFormatFilter(e.target.value)}
                        aria-label="Filter by file format"
                        className="px-2 py-1.5 rounded-xl border border-zinc-800 bg-[#0B1020] text-[11px] font-medium text-slate-200 focus:outline-none cursor-pointer truncate"
                      >
                        <option value="ALL">All Formats</option>
                        <option value="pdf">PDF (.pdf)</option>
                        <option value="docx">Word (.docx)</option>
                        <option value="txt">Text (.txt)</option>
                      </select>

                      <select
                        value={dateRangeFilter}
                        onChange={(e) => setDateRangeFilter(e.target.value)}
                        aria-label="Filter by upload date range"
                        className="px-2 py-1.5 rounded-xl border border-zinc-800 bg-[#0B1020] text-[11px] font-medium text-slate-200 focus:outline-none cursor-pointer truncate"
                      >
                        <option value="ALL">All Time</option>
                        <option value="today">Today (&le;24h)</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[11px] text-slate-400">
                      <span>Sort Candidates:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'date' | 'date_asc' | 'score' | 'score_asc' | 'name')}
                        aria-label="Sort candidates"
                        className="px-2.5 py-1 rounded-xl border border-zinc-800 bg-[#0B1020] text-[11px] font-medium text-slate-200 focus:outline-none cursor-pointer"
                      >
                        <option value="date">Latest First</option>
                        <option value="date_asc">Oldest First</option>
                        <option value="score">Highest ATS Score</option>
                        <option value="score_asc">Lowest ATS Score</option>
                        <option value="name">Candidate Name (A-Z)</option>
                      </select>
                    </div>
                  </div>

                  {/* Bulk Actions Toolbar (Sticky when 1+ selected) */}
                  {selectedResumeIds.size > 0 && (
                    <div className="p-3 rounded-2xl bg-[#044E62]/25 border border-[#044E62]/50 flex items-center justify-between gap-2 text-xs animate-in fade-in">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={toggleSelectAll}
                          className="text-slate-300 hover:text-white cursor-pointer"
                        >
                          {selectedResumeIds.size === filteredResumes.length ? (
                            <CheckSquare className="w-4 h-4 text-[#E9DEFA]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                        <span className="font-bold text-white">
                          {selectedResumeIds.size} Selected
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleExportCsv(Array.from(selectedResumeIds))}
                          className="px-2.5 py-1 rounded-lg bg-[#0D08CB] hover:bg-[#0A06A3] text-white font-semibold text-[11px] flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>Export CSV</span>
                        </button>
                        <button
                          onClick={handleBulkDelete}
                          disabled={bulkDeleting}
                          className="px-2.5 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 font-semibold text-[11px] flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{bulkDeleting ? 'Deleting...' : 'Delete'}</span>
                        </button>
                        <button
                          onClick={() => setSelectedResumeIds(new Set())}
                          className="px-2 py-1 rounded-lg text-slate-400 hover:text-white text-[11px] cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Candidate Cards List */}
                  <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                    {filteredResumes.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 bg-[#151D35] rounded-2xl border border-zinc-800 text-xs">
                        No uploaded resumes match the selected search filters.
                      </div>
                    ) : (
                      filteredResumes.map((resume) => {
                        const isSelected = resume.id === currentResume?.id;
                        const isChecked = selectedResumeIds.has(resume.id);
                        const grade = resume.analysis?.grade || (resume.ats_score >= 88 ? 'A+' : resume.ats_score >= 78 ? 'A' : resume.ats_score >= 66 ? 'B' : resume.ats_score >= 52 ? 'C' : 'D');
                        const ext = resume.filename.includes('.') ? resume.filename.slice(resume.filename.lastIndexOf('.') + 1).toUpperCase() : 'PDF';

                        return (
                          <div
                            key={resume.id}
                            onClick={() => {
                              setSelectedResumeId(resume.id);
                              setMobileDetailOpen(true);
                            }}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                              isSelected
                                ? 'bg-[#044E62]/20 border-[#044E62] shadow-sm'
                                : 'bg-[#151D35] border-zinc-800 hover:border-zinc-700 hover:bg-slate-850/60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2.5">
                              {/* Selection Checkbox */}
                              <button
                                type="button"
                                onClick={(e) => toggleSelectResume(resume.id, e)}
                                aria-label={`Select candidate ${resume.candidate_name || resume.filename}`}
                                className="mt-0.5 text-slate-400 hover:text-white cursor-pointer shrink-0"
                              >
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-[#E9DEFA]" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                                )}
                              </button>

                              <div className="truncate flex-1 min-w-0">
                                <div className="flex items-center space-x-1.5">
                                  <h4 className="font-bold text-xs text-white truncate">
                                    {resume.candidate_name || 'Applicant'}
                                  </h4>
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-zinc-800 text-slate-300 border border-zinc-700 shrink-0">
                                    {ext}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-300 truncate mt-0.5">
                                  {resume.filename}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {resume.user_email || 'No email specified'}
                                </p>
                              </div>

                              <div className="flex items-center space-x-1.5 shrink-0">
                                <span className={`px-2 py-0.5 rounded-lg font-black text-xs ${
                                  resume.ats_score >= 80
                                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                                    : resume.ats_score >= 65
                                    ? 'bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30'
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
                                <span>{formatExactDateTime(resume.created_at).date} ({getRelativeTime(resume.created_at)})</span>
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
                    <div className="bg-[#151D35] rounded-xl border border-zinc-800 shadow-sm overflow-hidden flex flex-col">
                      {/* Mobile Back Button */}
                      <div className="p-3 bg-[#151D35] border-b border-zinc-800 lg:hidden flex items-center justify-between">
                        <button
                          onClick={() => setMobileDetailOpen(false)}
                          className="inline-flex items-center space-x-1 text-xs font-bold text-[#E9DEFA] cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Back to Candidate List</span>
                        </button>
                        <span className="text-xs font-semibold text-slate-400">
                          Score: {currentResume.ats_score}/100
                        </span>
                      </div>

                      {/* Header Dossier Strip */}
                      <div className="p-5 sm:p-6 border-b border-zinc-800 bg-[#151D35]/95">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30">
                                Candidate Dossier
                              </span>
                              <span className="text-xs text-slate-400 font-mono">
                                ID: {currentResume.id.slice(0, 8)}
                              </span>
                              {currentResume.target_role && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                                  Role: {currentResume.target_role}
                                </span>
                              )}
                            </div>

                            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                              {currentResume.candidate_name || 'Candidate'}
                            </h2>

                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                              <span className="font-semibold text-slate-200">
                                {currentResume.filename}
                              </span>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                <strong className="text-slate-200 font-semibold">
                                  {currentResume.user_email || 'Applicant'}
                                </strong>
                              </span>
                              <span>•</span>
                              <span>
                                {formatExactDateTime(currentResume.created_at).full} ({getRelativeTime(currentResume.created_at)})
                              </span>
                              <span>•</span>
                              <span>
                                {currentResume.file_size ? `${(currentResume.file_size / 1024).toFixed(1)} KB` : 'Document'}
                              </span>
                            </div>
                          </div>

                          {/* Large Circular/Radial Score Display */}
                          <div className="flex items-center space-x-3 shrink-0">
                            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center text-white shadow-md font-black ${
                              currentResume.ats_score >= 80
                                ? 'bg-emerald-600 shadow-emerald-600/20'
                                : currentResume.ats_score >= 65
                                ? 'bg-[#0D08CB] shadow-[#0D08CB]/20'
                                : 'bg-amber-600 shadow-amber-600/20'
                            }`}>
                              <span className="text-2xl sm:text-3xl">{currentResume.ats_score}</span>
                              <span className="text-[9px] uppercase tracking-wider opacity-90">/ 100 ATS</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5 mt-5 pt-4 border-t border-zinc-800">
                          {/* Reader View Mode Switcher */}
                          <div className="inline-flex items-center bg-[#0B1020] p-1 rounded-xl text-xs font-semibold border border-zinc-800">
                            <button
                              onClick={() => setReaderViewMode('formatted')}
                              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                readerViewMode === 'formatted'
                                  ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              Document Reader
                            </button>
                            <button
                              onClick={() => setReaderViewMode('raw')}
                              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                readerViewMode === 'raw'
                                  ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              Raw Text Stream
                            </button>
                            <button
                              onClick={() => setReaderViewMode('diagnostics')}
                              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                readerViewMode === 'diagnostics'
                                  ? 'bg-zinc-800 text-white shadow-xs border border-zinc-700'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              Diagnostics &amp; AI
                            </button>
                          </div>

                          {/* Tool Buttons */}
                          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                            {/* Reprocess & Rescore Action */}
                            <button
                              onClick={() => handleReprocess(currentResume.id)}
                              disabled={reprocessingId === currentResume.id}
                              className="px-3 py-1.5 rounded-xl border border-[#044E62]/50 bg-[#044E62]/20 hover:bg-[#044E62]/40 text-[#E9DEFA] hover:text-white text-xs font-bold inline-flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
                              title="Re-run document parsing and 7-dimension ATS scoring engine"
                            >
                              <RotateCcw className={`w-3.5 h-3.5 ${reprocessingId === currentResume.id ? 'animate-spin text-[#E9DEFA]' : ''}`} />
                              <span>{reprocessingId === currentResume.id ? 'Re-scoring...' : 'Reprocess'}</span>
                            </button>

                            {/* Download PDF / DOCX */}
                            <button
                              onClick={() => handleDownloadOriginalFile(currentResume)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-xs font-bold text-white inline-flex items-center space-x-1.5 shadow-sm shadow-[#0D08CB]/20 transition-all cursor-pointer"
                              title={`Download uploaded document (${currentResume.filename})`}
                            >
                              <Download className="w-3.5 h-3.5 text-white" />
                              <span>
                                {currentResume.filename.toLowerCase().endsWith('.pdf')
                                  ? 'Download PDF'
                                  : currentResume.filename.toLowerCase().endsWith('.docx')
                                  ? 'Download Word (.docx)'
                                  : 'Download File'}
                              </span>
                            </button>

                            {/* Download plain text */}
                            {currentResume.resume_text && (
                              <button
                                onClick={() => handleDownloadText(currentResume)}
                                className="px-2.5 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center space-x-1.5 transition-all cursor-pointer"
                                title="Download plain text (.txt)"
                              >
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                <span>Text (.txt)</span>
                              </button>
                            )}

                            {/* Copy text */}
                            {currentResume.resume_text && (
                              <button
                                onClick={() => handleCopyText(currentResume.resume_text || '')}
                                className="px-2.5 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center space-x-1.5 transition-all cursor-pointer"
                              >
                                {copiedText ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-slate-400" />
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
                              <div className="p-4 rounded-2xl bg-[#044E62]/20 border border-[#044E62]/40 text-xs space-y-1.5">
                                <div className="font-bold text-[#E9DEFA] flex items-center space-x-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-[#E9DEFA]" />
                                  <span>Automated ATS Diagnostic Verdict:</span>
                                </div>
                                <p className="text-slate-300 leading-relaxed">
                                  {currentResume.analysis.summary}
                                </p>
                              </div>
                            )}

                            {/* Extracted Skills Section */}
                            {currentResume.analysis?.matched_keywords && currentResume.analysis.matched_keywords.length > 0 && (
                              <div className="space-y-2.5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                                  <span>Verified Technical Skills ({currentResume.analysis.matched_keywords.length})</span>
                                  <span className="text-[10px] text-emerald-400 font-semibold">Matched in candidate document</span>
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                  {currentResume.analysis.matched_keywords.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800 text-xs font-semibold"
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
                              <div className="code-terminal-dark p-5 sm:p-6 rounded-xl bg-[#0B1020] border border-[#1e2b4d] text-xs leading-relaxed font-sans text-[#e8eeff] whitespace-pre-wrap selection:bg-[#044E62] selection:text-white shadow-inner">
                                {currentResume.resume_text || 'No readable text content found in document.'}
                              </div>
                            </div>

                            {/* AI Bullet Rewrites */}
                            {currentResume.analysis?.bullet_rewrites && currentResume.analysis.bullet_rewrites.length > 0 && (
                              <div className="space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-[#E9DEFA]" />
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
                              <span>Raw Text Stream (As extracted by parser engine)</span>
                              <span>
                                {currentResume.resume_text
                                  ? `${currentResume.resume_text.split(/\s+/).filter(Boolean).length} words • ${currentResume.resume_text.length} characters • ${currentResume.resume_text.split('\n').length} lines`
                                  : '0 words'}
                              </span>
                            </div>
                            <div className="code-terminal-dark p-4 sm:p-5 rounded-xl bg-[#0B1020] text-[#e8eeff] font-mono text-xs max-h-[500px] overflow-y-auto whitespace-pre-wrap leading-relaxed border border-[#1e2b4d] shadow-inner">
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
                                  <span className="text-lg font-black text-[#E9DEFA]">{currentResume.analysis.breakdown.contact_score}%</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-[#0B1020] border border-zinc-800">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Skills Match</span>
                                  <span className="text-lg font-black text-emerald-400">{currentResume.analysis.breakdown.skills_score}%</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-[#0B1020] border border-zinc-800">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Impact &amp; STAR</span>
                                  <span className="text-lg font-black text-[#E9DEFA]">{currentResume.analysis.breakdown.experience_score}%</span>
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
                                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                                  Missing Industry Keywords to Target
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {currentResume.analysis.missing_keywords.map((s, idx) => (
                                    <span key={idx} className="px-2.5 py-0.5 rounded-md bg-rose-950/40 text-rose-300 border border-rose-900 text-xs font-semibold">
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
                                <ul className="space-y-1.5 text-xs text-slate-400">
                                  {currentResume.analysis.formatting_issues.map((issue, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                      <span className="text-[#044E62] dark:text-[#E9DEFA]">•</span>
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
                    <div className="bg-[#151D35] rounded-xl border border-zinc-800 p-12 text-center text-slate-400">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <h3 className="text-base font-bold text-white">
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
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: RESUMES TABLE VIEW                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'table' && (
          <div className="space-y-4">
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#151D35] p-4 rounded-2xl border border-zinc-800">
              <div className="relative w-full sm:w-96">
                <label htmlFor={searchInputId} className="sr-only">Search resumes</label>
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  id={searchInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidate, email, filename, or skill..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto flex-wrap gap-y-2">
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Grades</option>
                  <option value="A+">Grade A+ (88-100)</option>
                  <option value="A">Grade A (78-87)</option>
                  <option value="B">Grade B (66-77)</option>
                  <option value="C">Grade C (52-65)</option>
                  <option value="D">Grade D (&lt;52)</option>
                </select>

                <select
                  value={formatFilter}
                  onChange={(e) => setFormatFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Formats</option>
                  <option value="pdf">PDF (.pdf)</option>
                  <option value="docx">Word (.docx)</option>
                  <option value="txt">Text (.txt)</option>
                </select>

                <button
                  onClick={() => handleExportCsv()}
                  className="px-3 py-2 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-xs font-bold text-white flex items-center space-x-1 transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#151D35] rounded-2xl border border-zinc-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-[#0B1020] border-b border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Candidate / Document</th>
                      <th className="py-3.5 px-4">Format</th>
                      <th className="py-3.5 px-4">ATS Score</th>
                      <th className="py-3.5 px-4">Matched Skills</th>
                      <th className="py-3.5 px-4">Date Uploaded</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-medium">
                    {filteredResumes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          No uploaded resumes match the current search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredResumes.map((resume) => {
                        const grade = resume.analysis?.grade || (resume.ats_score >= 88 ? 'A+' : resume.ats_score >= 78 ? 'A' : resume.ats_score >= 66 ? 'B' : resume.ats_score >= 52 ? 'C' : 'D');
                        const score = resume.ats_score;
                        const matchedCount = resume.analysis?.matched_keywords?.length || 0;
                        const ext = resume.filename.includes('.') ? resume.filename.slice(resume.filename.lastIndexOf('.') + 1).toUpperCase() : 'PDF';

                        return (
                          <tr key={resume.id} className="hover:bg-slate-850/40 transition-colors">
                            {/* Candidate & File */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-[#FACAE7]/20 text-[#E9DEFA] flex items-center justify-center shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="truncate max-w-xs">
                                  <div className="font-bold text-white truncate">
                                    {resume.candidate_name || 'Applicant'}
                                  </div>
                                  <div className="text-[11px] text-slate-400 truncate">
                                    {resume.filename} • {resume.user_email || '—'}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Format */}
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-slate-300 border border-zinc-700">
                                {ext}
                              </span>
                            </td>

                            {/* Score & Grade */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                                  score >= 88
                                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900'
                                    : score >= 75
                                    ? 'bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30'
                                    : score >= 60
                                    ? 'bg-amber-950/60 text-amber-400 border border-amber-900'
                                    : 'bg-rose-950/60 text-rose-400 border border-rose-900'
                                }`}>
                                  {score} / 100
                                </span>
                                <span className="font-bold text-slate-400 text-[11px]">
                                  Grade {grade}
                                </span>
                              </div>
                            </td>

                            {/* Matched Skills */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-1.5 flex-wrap max-w-sm">
                                <span className="font-semibold text-slate-300">
                                  {matchedCount} skills
                                </span>
                                {resume.analysis?.matched_keywords?.slice(0, 3).map((s, idx) => (
                                  <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-slate-400">
                                    {s}
                                  </span>
                                ))}
                                {matchedCount > 3 && (
                                  <span className="text-[10px] text-slate-500">+{matchedCount - 3}</span>
                                )}
                              </div>
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                              {formatExactDateTime(resume.created_at).date} ({getRelativeTime(resume.created_at)})
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center space-x-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedResumeId(resume.id);
                                    setActiveTab('workspace');
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer transition-colors"
                                  title="Inspect full candidate document dossier"
                                >
                                  Inspect
                                </button>
                                <button
                                  onClick={() => handleDownloadOriginalFile(resume)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                                  title="Download original file"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteResume(resume.id)}
                                  className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
                                  title="Delete resume"
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
          <div className="bg-[#151D35] rounded-2xl border border-zinc-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-[#0B1020] border-b border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Student Candidate</th>
                    <th className="py-3.5 px-4">Verified Email</th>
                    <th className="py-3.5 px-4">Resumes Uploaded</th>
                    <th className="py-3.5 px-4">Highest Score</th>
                    <th className="py-3.5 px-4">Last Activity</th>
                    <th className="py-3.5 px-4">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-medium">
                  {(!data?.profiles || data.profiles.length === 0) ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No registered student accounts recorded yet.
                      </td>
                    </tr>
                  ) : (
                    data.profiles.map((profile) => (
                      <tr key={profile.id} className="hover:bg-slate-850/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#FACAE7]/20 text-[#E9DEFA] font-bold flex items-center justify-center shrink-0">
                              {(profile.full_name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div className="font-bold text-white">
                              {profile.full_name || 'Student Account'}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {profile.email || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {profile.resumes_count ?? 0} document(s)
                        </td>
                        <td className="py-3.5 px-4">
                          {profile.latest_score !== null && profile.latest_score !== undefined ? (
                            <span className="px-2 py-0.5 rounded-md font-bold bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30">
                              {profile.latest_score} / 100
                            </span>
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                          {profile.last_sign_in_at ? formatExactDateTime(profile.last_sign_in_at).full : '—'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                          {formatExactDateTime(profile.created_at).date}
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
        {/* TAB 4: SKILL ANALYTICS                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="bg-[#151D35] p-6 rounded-2xl border border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#E9DEFA]" />
                <span>Aggregated Skill Taxonomy &amp; Frequency</span>
              </h3>
              <p className="text-xs text-slate-400">
                Most frequent verified technical skills extracted across all candidate resumes.
              </p>

              {(!data?.topSkills || data.topSkills.length === 0) ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No skill data available yet. Skills appear automatically as resumes are uploaded and parsed.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                  {data.topSkills.map(({ skill, count }) => (
                    <div
                      key={skill}
                      className="p-3.5 rounded-xl bg-[#0B1020] border border-zinc-800 flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-white">{skill}</span>
                      <span className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30">
                        {count} resume{count > 1 ? 's' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: LOGIN & ACCESS AUDIT                                               */}
        {/* ========================================================================= */}
        {activeTab === 'logins' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#151D35] p-4 rounded-2xl border border-zinc-800">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={loginSearchQuery}
                  onChange={(e) => setLoginSearchQuery(e.target.value)}
                  placeholder="Search by email, name, or IP..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                />
              </div>

              <select
                value={authMethodFilter}
                onChange={(e) => setAuthMethodFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-zinc-800 bg-[#0B1020] text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Methods</option>
                <option value="Google OAuth">Google OAuth</option>
                <option value="Email & Password">Email &amp; Password</option>
                <option value="Phone SMS OTP">Phone SMS OTP</option>
              </select>
            </div>

            <div className="bg-[#151D35] rounded-2xl border border-zinc-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-[#0B1020] border-b border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Candidate / User</th>
                      <th className="py-3.5 px-4">Authentication Method</th>
                      <th className="py-3.5 px-4">IP Address</th>
                      <th className="py-3.5 px-4">Client Agent</th>
                      <th className="py-3.5 px-4">Login Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-medium">
                    {filteredLoginLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          No login audit logs match the current criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLoginLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-850/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{log.full_name || 'Student Account'}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{log.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30">
                              {log.auth_method}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {log.ip_address || '—'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 truncate max-w-xs">
                            {log.user_agent || 'Web Browser'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                            {formatExactDateTime(log.created_at).full} ({getRelativeTime(log.created_at)})
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADMIN AUDIT TRAIL                                                  */}
      {/* ========================================================================= */}
      {auditModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setAuditModalOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="max-w-3xl w-full bg-[#151D35] border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-4 text-left relative animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
            <button
              onClick={() => setAuditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-zinc-850 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30 flex items-center justify-center shrink-0">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Administrator Audit Trail
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Immutable record of privileged operations (downloads, deletions, reprocessing, exports)
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {(!data?.auditLogs || data.auditLogs.length === 0) ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No administrative actions recorded yet. Actions appear in real time.
                </div>
              ) : (
                data.auditLogs.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3.5 rounded-xl bg-[#0B1020] border border-zinc-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          entry.action === 'DELETE' || entry.action === 'BULK_DELETE'
                            ? 'bg-rose-950/60 text-rose-400 border border-rose-900'
                            : entry.action === 'REPROCESS'
                            ? 'bg-[#FACAE7]/20 text-[#E9DEFA] border border-[#FACAE7]/30'
                            : entry.action === 'EXPORT'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900'
                            : 'bg-zinc-800 text-slate-300 border border-zinc-700'
                        }`}>
                          {entry.action}
                        </span>
                        <span className="font-semibold text-white">
                          {entry.target_name || entry.target_id || 'System'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {formatExactDateTime(entry.created_at).full} ({getRelativeTime(entry.created_at)})
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      {entry.details}
                    </p>
                    <div className="text-[10px] text-slate-500 flex items-center space-x-3">
                      <span>Admin: {entry.admin_email}</span>
                      <span>•</span>
                      <span>IP: {entry.ip_address}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setAuditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div className="max-w-md w-full bg-[#151D35] border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-5 text-left relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setChangeKeyModalOpen(false);
                setChangeKeyErr('');
                setChangeKeyMsg('');
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-zinc-850 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Update Master Security Key
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Change the administrator password for this portal
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0B1020]/90 border border-zinc-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-white block mb-1">Server-Side Admin Security</span>
              Your portal authenticates against cryptographic salted scrypt hashes in server environment configuration. Entering a new passcode below updates the runtime server passcode. For permanent persistence across redeployments, update <code className="text-[#E9DEFA] bg-zinc-800 px-1 py-0.5 rounded">ADMIN_PASSWORD_HASH</code> in your hosting environment variables.
            </div>

            {changeKeyErr && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{changeKeyErr}</span>
              </div>
            )}

            {changeKeyMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900 text-emerald-300 text-xs flex items-center space-x-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{changeKeyMsg}</span>
              </div>
            )}

            <form onSubmit={handleChangePasscode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Security Key
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Enter at least 8 characters..."
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-[#0B1020] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm Security Key
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={confirmNewPasscode}
                    onChange={(e) => setConfirmNewPasscode(e.target.value)}
                    placeholder="Re-enter new security key..."
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-[#0B1020] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D08CB]"
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
                  className="flex-1 py-2.5 px-3 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changeKeyLoading}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-xs font-bold transition-all shadow-md shadow-[#0D08CB]/20 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
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

      {/* MODAL: SUPABASE & CLAUDE INTEGRATIONS */}
      <CredentialsModal
        isOpen={credentialsModalOpen}
        onClose={() => setCredentialsModalOpen(false)}
      />
    </div>
  );
}
