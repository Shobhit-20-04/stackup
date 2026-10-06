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
  Sparkles,
  Download,
  Mail,
  Calendar,
  Hash,
  ChevronLeft,
  FileCode,
  SlidersHorizontal,
  ChevronRight,
  CheckCircle2
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

  // Primary tab view: 'workspace' (Dedicated space to read resumes), 'table' (All records), 'users' (Accounts), 'skills' (Skill trends)
  const [activeTab, setActiveTab] = useState<'workspace' | 'table' | 'users' | 'skills'>('workspace');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  // Selected Resume for reading in workspace
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [readerViewMode, setReaderViewMode] = useState<'formatted' | 'raw' | 'diagnostics'>('formatted');
  const [copiedText, setCopiedText] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

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
          setAuthError('Invalid administrator security key. Access denied.');
          return;
        }
        throw new Error('Failed to load administrator telemetry.');
      }

      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
      sessionStorage.setItem('stackup_admin_key', key);

      // Auto-select first resume if none selected
      if (json.resumes && json.resumes.length > 0 && !selectedResumeId) {
        setSelectedResumeId(json.resumes[0].id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading admin data';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, [selectedResumeId]);

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
      setAuthError('Please enter the security key.');
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
    if (!confirm('Are you sure you want to permanently delete this resume record? This action cannot be undone.')) {
      return;
    }
    try {
      setDeletingId(id);
      const activeKey = passcode || (typeof window !== 'undefined' ? sessionStorage.getItem('stackup_admin_key') || '' : '');
      const res = await fetch('/api/admin/data', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': activeKey,
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        if (selectedResumeId === id) {
          const remaining = (data?.resumes || []).filter((r) => r.id !== id);
          setSelectedResumeId(remaining.length > 0 ? remaining[0].id : null);
          setMobileDetailOpen(false);
        }
        fetchAdminData(activeKey);
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

  // The active resume currently being read in the workspace
  const currentResume = useMemo(() => {
    if (!resumes || resumes.length === 0) return null;
    return resumes.find((r) => r.id === selectedResumeId) || resumes[0];
  }, [resumes, selectedResumeId]);

  // If not authenticated, render the secured admin access portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Staff Authorization Gateway
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Restricted to authorized personnel
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-900 text-rose-300 text-xs flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label htmlFor="admin-passcode" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Master Security Key
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  id="admin-passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter access passcode..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-zinc-700 bg-zinc-800/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-text"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Enter Control Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center space-x-1"
            >
              <span>&larr; Return to main portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Candidate Management &amp; Ingestion Hub
                  </h1>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Live Telemetry
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Real-time uploaded resumes, candidate dossiers, and student accounts
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => fetchAdminData(passcode || (sessionStorage.getItem('stackup_admin_key') || ''))}
                disabled={loading}
                className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-850 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-500' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleSignOut}
                className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-750 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              >
                Lock Portal
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1 space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Real Metrics Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Candidate Resumes</span>
              <FileText className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              {data?.metrics.totalResumes ?? 0}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Active documents stored
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Average ATS Score</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              {data?.metrics.avgScore ?? 0}
              <span className="text-xs sm:text-sm font-semibold text-zinc-400"> / 100</span>
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
              {data?.metrics.highPerformers ?? 0} Grade A/A+ (&ge;75)
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Student Profiles</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              {data?.metrics.totalUsers ?? 0}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Registered candidate accounts
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Quiz Completions</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              {data?.metrics.totalQuizzes ?? 0}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Interactive test attempts
            </div>
          </div>
        </div>

        {/* Primary Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('workspace'); setMobileDetailOpen(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'workspace'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850'
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
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850'
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
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850'
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
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Skill Analytics</span>
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
              <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate name, email, or skill..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-850 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 text-xs">
                  <select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-850 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
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
                    className="px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-850 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
                  >
                    <option value="date">Sort: Latest First</option>
                    <option value="score">Sort: Highest Score</option>
                  </select>
                </div>
              </div>

              {/* Candidate Cards List */}
              <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {filteredResumes.length === 0 ? (
                  <div className="p-8 text-center text-zinc-400 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs">
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
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-400 dark:border-indigo-600 shadow-xs'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="truncate flex-1">
                            <h4 className="font-bold text-xs text-zinc-900 dark:text-white truncate">
                              {resume.filename}
                            </h4>
                            <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                              {resume.user_email || 'Candidate file'}
                            </p>
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0">
                            <span className={`px-2 py-0.5 rounded-lg font-black text-xs ${
                              resume.ats_score >= 80
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                : resume.ats_score >= 65
                                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                            }`}>
                              {resume.ats_score}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-400">
                              {grade}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
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
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
                  {/* Mobile Back Button */}
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-850 border-b border-zinc-200 dark:border-zinc-800 lg:hidden flex items-center justify-between">
                    <button
                      onClick={() => setMobileDetailOpen(false)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Candidate List</span>
                    </button>
                    <span className="text-xs font-semibold text-zinc-500">
                      Score: {currentResume.ats_score}/100
                    </span>
                  </div>

                  {/* Header Dossier Strip */}
                  <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                            Candidate Dossier
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            ID: {currentResume.id.slice(0, 8)}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                          {currentResume.filename}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                          <span className="flex items-center space-x-1">
                            <Mail className="w-3.5 h-3.5 text-zinc-400" />
                            <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">{currentResume.user_email || 'Applicant'}</strong>
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
                            ? 'bg-blue-600 shadow-blue-600/20'
                            : 'bg-amber-600 shadow-amber-600/20'
                        }`}>
                          <span className="text-2xl sm:text-3xl">{currentResume.ats_score}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-90">/ 100 ATS</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      {/* Reader View Mode Switcher */}
                      <div className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-semibold">
                        <button
                          onClick={() => setReaderViewMode('formatted')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            readerViewMode === 'formatted'
                              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                          }`}
                        >
                          Document Reader
                        </button>
                        <button
                          onClick={() => setReaderViewMode('raw')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            readerViewMode === 'raw'
                              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                          }`}
                        >
                          Raw Text Stream
                        </button>
                        <button
                          onClick={() => setReaderViewMode('diagnostics')}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            readerViewMode === 'diagnostics'
                              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                          }`}
                        >
                          Diagnostics &amp; AI
                        </button>
                      </div>

                      {/* Tool Buttons */}
                      <div className="flex items-center space-x-2">
                        {currentResume.resume_text && (
                          <>
                            <button
                              onClick={() => handleCopyText(currentResume.resume_text || '')}
                              className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-750 inline-flex items-center space-x-1.5 transition-all cursor-pointer"
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

                            <button
                              onClick={() => handleDownloadText(currentResume)}
                              className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-white dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-750 inline-flex items-center space-x-1.5 transition-all cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download .txt</span>
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleDeleteResume(currentResume.id)}
                          disabled={deletingId === currentResume.id}
                          className="px-3 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold inline-flex items-center space-x-1 transition-colors cursor-pointer"
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
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                              {currentResume.analysis.summary}
                            </p>
                          </div>
                        )}

                        {/* Extracted Skills Section */}
                        {currentResume.analysis?.matched_keywords && currentResume.analysis.matched_keywords.length > 0 && (
                          <div className="space-y-2.5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
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
                          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                            Extracted Resume Content (Document Flow)
                          </h3>
                          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200 dark:border-zinc-800 text-xs leading-relaxed font-sans text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                            {currentResume.resume_text || 'No readable text content found in document.'}
                          </div>
                        </div>

                        {/* AI Bullet Rewrites */}
                        {currentResume.analysis?.bullet_rewrites && currentResume.analysis.bullet_rewrites.length > 0 && (
                          <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center space-x-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                              <span>AI STAR Bullet Optimization Recommendations</span>
                            </h3>
                            <div className="space-y-3">
                              {currentResume.analysis.bullet_rewrites.map((b, idx) => (
                                <div key={idx} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-850/60 text-xs space-y-2">
                                  <div className="text-rose-600 dark:text-rose-400">
                                    <span className="font-bold">Original: </span>
                                    {b.original}
                                  </div>
                                  <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                                    <span className="font-bold">ATS Optimized: </span>
                                    {b.improved}
                                  </div>
                                  <div className="text-[11px] text-zinc-500 italic">
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
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                          <span>Raw Text Stream (As parsed by parser engine)</span>
                          <span>
                            {currentResume.resume_text ? `${currentResume.resume_text.split(/\s+/).length} words • ${currentResume.resume_text.length} characters` : '0 words'}
                          </span>
                        </div>
                        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 text-zinc-200 font-mono text-xs max-h-[500px] overflow-y-auto whitespace-pre-wrap leading-relaxed border border-zinc-800">
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
                            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Contact &amp; Links</span>
                              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{currentResume.analysis.breakdown.contact_score}%</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Skills Match</span>
                              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{currentResume.analysis.breakdown.skills_score}%</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Impact &amp; STAR</span>
                              <span className="text-lg font-black text-blue-600 dark:text-blue-400">{currentResume.analysis.breakdown.experience_score}%</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">ATS Formatting</span>
                              <span className="text-lg font-black text-purple-600 dark:text-purple-400">{currentResume.analysis.breakdown.formatting_score}%</span>
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
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                              ATS Formatting Observations
                            </h4>
                            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
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
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-12 text-center text-zinc-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
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
                  className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-850 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
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
                                  className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
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
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Registered Student Accounts ({data?.profiles.length ?? 0})
              </h2>
              <p className="text-xs text-zinc-500">
                Candidate user accounts currently registered on StackUp
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-850/80 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Candidate</th>
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

        {/* ========================================================================= */}
        {/* TAB 4: SKILL TRENDS                                                       */}
        {/* ========================================================================= */}
        {activeTab === 'skills' && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Technical Skills Detected Across Uploaded Resumes
              </h2>
              <p className="text-xs text-zinc-500">
                Most frequent engineering technologies extracted from applicant documents
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(data?.topSkills || []).map((item, idx) => (
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
      </main>
    </div>
  );
}
