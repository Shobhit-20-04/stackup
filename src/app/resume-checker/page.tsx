'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileCheck2, 
  UploadCloud, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  X, 
  Loader2, 
  TrendingUp, 
  ChevronRight,
  BookmarkPlus,
  Lock,
  Copy
} from 'lucide-react';
import { getCurrentUser, getFastCachedUser, type UserSession } from '@/lib/auth/session';
import { createClient } from '@/lib/supabase/client';

interface AnalysisResult {
  filename: string;
  ats_score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    contact_score: number;
    experience_score: number;
    skills_score: number;
    formatting_score: number;
  };
  summary: string;
  matched_keywords: string[];
  missing_keywords: string[];
  formatting_issues: string[];
  section_suggestions: {
    contact: string[];
    experience: string[];
    skills: string[];
    projects: string[];
  };
  bullet_rewrites: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

export default function ResumeCheckerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
  const [authLoading, setAuthLoading] = useState(() => (typeof window !== 'undefined' ? !getFastCachedUser() : true));

  React.useEffect(() => {
    getCurrentUser()
      .then((u) => {
        setCurrentUser(u);
        setAuthLoading(false);
      })
      .catch(() => {
        setAuthLoading(false);
      });
  }, []);

  // File drag & drop state
  const [isDragging, setIsDragging] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMsg('');

    if (!currentUser) {
      setErrorMsg('Please sign in or create an account to upload and analyze your resume.');
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    if (!currentUser) {
      setErrorMsg('Please sign in or create an account to upload and analyze your resume.');
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (!currentUser) {
      setErrorMsg('Please sign in or create an account to upload and analyze your resume.');
      return;
    }

    const ext = selectedFile.name.toLowerCase();
    if (!ext.endsWith('.pdf') && !ext.endsWith('.docx') && !ext.endsWith('.txt')) {
      setErrorMsg('Unsupported format. Please upload a PDF (.pdf) or Word document (.docx).');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMsg(`File is ${(selectedFile.size / (1024 * 1024)).toFixed(1)}MB. The maximum allowed size is 5MB.`);
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyzeUpload = async () => {
    if (!currentUser) {
      setErrorMsg('Please sign in to upload and analyze your resume.');
      return;
    }

    if (!file) {
      setErrorMsg('Please select a resume file first.');
      return;
    }

    setAnalyzing(true);
    setErrorMsg('');
    setSavedSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/resume-analysis', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to analyze resume.');
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveToProfile = async () => {
    if (!result) return;
    try {
      // 1. Save to local storage resume history
      const stored = localStorage.getItem('stackup_local_resumes');
      const list = stored ? JSON.parse(stored) : [];
      const newEntry = {
        id: `res-${Date.now()}`,
        filename: result.filename,
        ats_score: result.ats_score,
        created_at: new Date().toISOString(),
        grade: result.grade,
      };
      list.unshift(newEntry);
      localStorage.setItem('stackup_local_resumes', JSON.stringify(list));

      // 2. Try saving to Supabase if logged in with real UUID
      const user = await getCurrentUser();
      if (user) {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id);
        if (isUUID) {
          const supabase = createClient();
          await (supabase.from('resume_analyses') as unknown as {
            insert: (data: {
              user_id: string;
              filename: string;
              ats_score: number;
              feedback: unknown;
            }) => Promise<unknown>;
          }).insert({
            user_id: user.id,
            filename: result.filename,
            ats_score: result.ats_score,
            feedback: result,
          });
        }
      }

      setSavedSuccess(true);
    } catch {
      setSavedSuccess(true); // local is saved regardless
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const reportText = `📄 StackUp ATS Resume Report: ${result.filename}
🎯 Overall ATS Score: ${result.ats_score}/100 (Grade: ${result.grade})
📊 Breakdown:
  • Contact & Links: ${result.breakdown.contact_score}%
  • Technical Skills: ${result.breakdown.skills_score}%
  • Experience & Impact: ${result.breakdown.experience_score}%
  • ATS Layout: ${result.breakdown.formatting_score}%

✅ Matched Keywords (${result.matched_keywords.length}):
${result.matched_keywords.join(', ') || 'None detected'}

⚠️ Suggested Keywords to Add (${result.missing_keywords.length}):
${result.missing_keywords.join(', ') || 'None needed'}

⭐ STAR Bullet Rewrites:
${result.bullet_rewrites.map((b, i) => `${i + 1}. Before: "${b.original}"\n   After: "${b.improved}"\n   Reason: ${b.reason}`).join('\n\n')}

Diagnosed via StackUp: https://stackup-zeta.vercel.app/resume-checker`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setErrorMsg('');
    setSavedSuccess(false);
    setCopiedReport(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      {/* Header Banner */}
      <div className="bg-[var(--surface-card)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)] mb-3">
                <FileCheck2 className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                <span>ATS Technical Diagnostic</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                Resume ATS Evaluator
              </h1>
              <p className="mt-2 text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
                Parse and benchmark your software engineering resume against modern applicant tracking systems. Detect missing technical keywords, formatting obstacles, and weak action bullet points.
              </p>
            </div>

            {/* Upload Specs Tag */}
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs text-[var(--foreground-muted)] shrink-0 self-start md:self-auto">
              <UploadCloud className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Formats: PDF, DOCX, TXT • Max 5MB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Error notification */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-500 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Notice: </span>
              {errorMsg}
            </div>
          </div>
        )}

        {authLoading ? (
          <div className="p-12 border border-[var(--border-subtle)] rounded-xl text-center bg-[var(--surface-card)] shadow-xs flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-7 h-7 animate-spin text-[var(--brand-primary)]" />
            <p className="text-xs text-[var(--foreground-muted)]">Verifying student session...</p>
          </div>
        ) : !currentUser ? (
          /* Locked State for Unauthenticated Visitors */
          <div className="p-8 sm:p-12 border border-[var(--border-subtle)] rounded-xl text-center bg-[var(--surface-card)] shadow-xs space-y-6">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="w-12 h-12 rounded-lg bg-[var(--surface-sunken)] text-[var(--brand-primary)] flex items-center justify-center mb-3 border border-[var(--border-subtle)]">
                <Lock className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-2">
                Authentication Required
              </span>
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                Sign in to analyze and store your resume
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] mt-1.5 mb-6 leading-relaxed">
                Resume scanning, keyword matching, and line-by-line STAR rewrites require an active student account to save scores to your preparation profile.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <Link
                  href="/login?next=/resume-checker"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs inline-flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Sign In to Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login?next=/resume-checker"
                  className="w-full sm:w-auto px-5 py-2.5 border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-card)] text-[var(--foreground)] text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer"
                >
                  <span>Create Account</span>
                </Link>
              </div>
            </div>
          </div>
        ) : !result ? (
          /* Upload State (Only for Signed-In Students) */
          <div className="space-y-6">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`p-8 sm:p-10 border-2 border-dashed rounded-xl text-center transition-all bg-[var(--surface-card)] ${
                isDragging 
                  ? 'border-[var(--brand-primary)] bg-[var(--surface-sunken)]' 
                  : 'border-[var(--border-subtle)] hover:border-[var(--foreground-muted)]'
              }`}
            >
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-[var(--surface-sunken)] text-[var(--brand-primary)] flex items-center justify-center mb-3 border border-[var(--border-subtle)]">
                  <UploadCloud className="w-6 h-6" />
                </div>
                
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  Select or drag resume document
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] mt-1 mb-5">
                  Accepts PDF (.pdf), Word (.docx), or plain text (.txt) up to 5MB.
                </p>

                {file ? (
                  <div className="flex items-center space-x-3 bg-[var(--surface-sunken)] px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] mb-5">
                    <FileText className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                    <span className="text-xs font-medium text-[var(--foreground)] truncate max-w-xs">
                      {file.name}
                    </span>
                    <span className="text-[11px] text-[var(--foreground-muted)] shrink-0">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                    <button 
                      onClick={() => setFile(null)} 
                      className="p-1 text-[var(--foreground-muted)] hover:text-rose-500 cursor-pointer"
                      aria-label="Remove selected resume file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input 
                      type="file" 
                      accept=".pdf,.docx,.txt" 
                      onChange={handleFileSelect} 
                      className="hidden" 
                      aria-label="Upload resume file (PDF, DOCX, TXT)"
                    />
                    <span className="px-4 py-2 bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-medium rounded-lg shadow-xs inline-flex items-center space-x-2 transition-all cursor-pointer">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Choose File</span>
                    </span>
                  </label>
                )}

                {file && (
                  <button
                    onClick={handleAnalyzeUpload}
                    disabled={analyzing}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[var(--brand-primary)] hover:opacity-95 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Parsing and Benchmarking...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Analyze Resume</span>
                      </>
                    )}
                  </button>
                )}

                {analyzing && (
                  <div className="w-full max-w-xs mt-4 space-y-2 animate-in fade-in duration-200">
                    <div className="h-1.5 w-full bg-[var(--surface-sunken)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                      <div className="h-full bg-[var(--brand-primary)] animate-pulse w-full rounded-full" />
                    </div>
                    <p className="text-[11px] text-[var(--foreground-muted)] text-center">
                      Parsing document sections, keywords, and metrics...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ATS Diagnostic Evaluation Rubric */}
            <div className="border border-[var(--border-subtle)] bg-[var(--surface-card)] rounded-xl p-5">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                    Diagnostic Evaluation Rubric
                  </h4>
                  <p className="text-[11px] text-[var(--foreground-muted)] mt-0.5">
                    What our parser benchmarks against when evaluating engineering resumes
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[var(--foreground-muted)] uppercase">
                  4 Rubric Criteria
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] font-mono font-semibold text-[var(--brand-primary)] mb-1">
                    01 • CONTACT &amp; IDENTITY
                  </div>
                  <div className="text-xs font-medium text-[var(--foreground)] mb-1">
                    Links &amp; Header Parsing
                  </div>
                  <p className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                    Evaluates clean placement of email, phone, GitHub profile, and LinkedIn URL without nested header tables.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] font-mono font-semibold text-[var(--brand-primary)] mb-1">
                    02 • TECH VOCABULARY
                  </div>
                  <div className="text-xs font-medium text-[var(--foreground)] mb-1">
                    Skill Keyword Extraction
                  </div>
                  <p className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                    Scans against 30+ canonical SWE skills across languages, frameworks, cloud infrastructure, and databases.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] font-mono font-semibold text-[var(--brand-primary)] mb-1">
                    03 • QUANTIFIED IMPACT
                  </div>
                  <div className="text-xs font-medium text-[var(--foreground)] mb-1">
                    STAR Bullet Quality
                  </div>
                  <p className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                    Flags passive wording and measures quantified metrics, latency improvements, user scale, and cost reductions.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] font-mono font-semibold text-[var(--brand-primary)] mb-1">
                    04 • ATS READABILITY
                  </div>
                  <div className="text-xs font-medium text-[var(--foreground)] mb-1">
                    Format &amp; Layout Safety
                  </div>
                  <p className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                    Checks single-column reading hierarchy, standard section names, and avoids unparseable graphic columns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Scorecard Result View */
          <div className="space-y-6">
            {/* Top Score Summary Banner */}
            <div className="bg-[var(--surface-card)] rounded-xl border border-[var(--border-subtle)] p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-5">
                  {/* Clean High-Contrast Score Badge */}
                  <div className={`w-20 h-20 sm:w-22 sm:h-22 rounded-xl flex flex-col items-center justify-center text-white shrink-0 ${
                    result.ats_score >= 80 
                      ? 'bg-emerald-600 border border-emerald-500/50' 
                      : result.ats_score >= 65
                      ? 'bg-amber-600 border border-amber-500/50'
                      : 'bg-rose-600 border border-rose-500/50'
                  }`}>
                    <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight">{result.ats_score}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider opacity-90">/ 100 ATS</span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
                        {result.ats_score >= 80 ? 'Strong Match' : result.ats_score >= 65 ? 'Competitive Profile' : 'Needs Optimization'}
                      </h2>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[var(--surface-sunken)] text-[var(--foreground)] border border-[var(--border-subtle)]">
                        Grade {result.grade}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--foreground-muted)] mt-1 break-all">
                      File: <span className="font-mono text-[var(--foreground)]">{result.filename}</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <button
                    onClick={handleCopyReport}
                    className="px-3.5 py-2 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-card)] text-[var(--foreground)] cursor-pointer"
                  >
                    {copiedReport ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Report Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                        <span>Copy Report</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSaveToProfile}
                    disabled={savedSuccess}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      savedSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[var(--brand-primary)] hover:opacity-95 text-white'
                    }`}
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Saved to Profile</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-4 h-4" />
                        <span>Save to Profile</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-3.5 py-2 bg-[var(--surface-sunken)] hover:bg-[var(--surface-card)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Scan Another</span>
                  </button>
                </div>
              </div>

              {/* Summary text */}
              <p className="mt-4 text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                {result.summary}
              </p>

              {/* 4-Part Category Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-[var(--border-subtle)]">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[var(--foreground-muted)] font-medium">Contact &amp; Links</span>
                    <span className="font-mono font-semibold text-[var(--foreground)]">{result.breakdown.contact_score}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-sunken)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div className="bg-[var(--brand-primary)] h-full rounded-full" style={{ width: `${result.breakdown.contact_score}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[var(--foreground-muted)] font-medium">Tech Skills</span>
                    <span className="font-mono font-semibold text-[var(--foreground)]">{result.breakdown.skills_score}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-sunken)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${result.breakdown.skills_score}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[var(--foreground-muted)] font-medium">Experience &amp; Impact</span>
                    <span className="font-mono font-semibold text-[var(--foreground)]">{result.breakdown.experience_score}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-sunken)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div className="bg-[var(--brand-primary)] h-full rounded-full" style={{ width: `${result.breakdown.experience_score}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[var(--foreground-muted)] font-medium">ATS Layout</span>
                    <span className="font-mono font-semibold text-[var(--foreground)]">{result.breakdown.formatting_score}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-sunken)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: `${result.breakdown.formatting_score}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Restricted Content Lock for Visitors */}
            {!currentUser ? (
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8 text-center shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--surface-sunken)] text-[var(--brand-primary)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Detailed Keyword Gap Audit &amp; STAR Bullet Rewrites Locked
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-xl mx-auto leading-relaxed">
                  Sign in or create a free account to unlock your complete keyword gap analysis, custom section recommendations, line-by-line STAR bullet rewrites, and save your resume to your personal dashboard.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    href={`/login?redirect=${encodeURIComponent('/resume-checker')}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Sign In to Unlock Full Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/login?redirect=${encodeURIComponent('/resume-checker')}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--foreground)] font-medium text-xs sm:text-sm hover:bg-[var(--surface-card)] transition-colors"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            ) : (
              <>
            {/* Keyword Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Matched Keywords */}
              <div className="bg-[var(--surface-card)] rounded-xl border border-[var(--border-subtle)] p-5">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    Matched Tech Keywords ({result.matched_keywords.length})
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mb-3.5">
                  Verified technical skills successfully identified in document:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.matched_keywords.length === 0 ? (
                    <span className="text-xs text-[var(--foreground-muted)]">No technical keywords detected.</span>
                  ) : (
                    result.matched_keywords.map((kw) => (
                      <span 
                        key={kw}
                        className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      >
                        ✓ {kw}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Missing Recommended Keywords */}
              <div className="bg-[var(--surface-card)] rounded-xl border border-[var(--border-subtle)] p-5">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    Suggested Keywords to Add ({result.missing_keywords.length})
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mb-3.5">
                  High-frequency SWE recruiter terms not found in your resume:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.missing_keywords.length === 0 ? (
                    <span className="text-xs text-[var(--foreground-muted)]">Comprehensive keyword coverage.</span>
                  ) : (
                    result.missing_keywords.map((kw) => (
                      <span 
                        key={kw}
                        className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      >
                        + {kw}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Bullet Point Optimization */}
            {result.bullet_rewrites && result.bullet_rewrites.length > 0 && (
              <div className="bg-[var(--surface-card)] rounded-xl border border-[var(--border-subtle)] p-5">
                <div className="flex items-center space-x-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    STAR Bullet Point Rewrites
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mb-4">
                  Compare generic descriptions with high-impact, quantified engineering bullets:
                </p>

                <div className="space-y-3">
                  {result.bullet_rewrites.map((rewrite, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0 mt-0.5">
                          Original
                        </span>
                        <p className="text-xs text-[var(--foreground-muted)] line-through">
                          {rewrite.original}
                        </p>
                      </div>

                      <div className="flex items-start space-x-2">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0 mt-0.5">
                          STAR Rewrite
                        </span>
                        <p className="text-xs font-medium text-[var(--foreground)]">
                          {rewrite.improved}
                        </p>
                      </div>

                      <p className="text-[11px] text-[var(--brand-primary)] font-mono pl-1">
                        Rationale: {rewrite.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actionable Suggestions Checklist */}
            <div className="bg-[var(--surface-card)] rounded-xl border border-[var(--border-subtle)] p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3.5">
                Section-by-Section Recommendations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--foreground)] mb-2">
                    Work Experience
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[var(--foreground-muted)]">
                    {result.section_suggestions.experience.map((s, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--foreground)] mb-2">
                    Technical Skills &amp; Tools
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[var(--foreground-muted)]">
                    {result.section_suggestions.skills.map((s, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--foreground)] mb-2">
                    Personal Projects
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[var(--foreground-muted)]">
                    {result.section_suggestions.projects.map((s, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--foreground)] mb-2">
                    Contact &amp; Links
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[var(--foreground-muted)]">
                    {result.section_suggestions.contact.map((s, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Profile Navigation Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] p-4 sm:p-5 rounded-xl">
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">
                  Track your score progression
                </h4>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  Saved resumes are stored in your profile dashboard alongside your quiz scores and streak tracker.
                </p>
              </div>
              <Link
                href="/profile"
                className="px-3.5 py-2 bg-[var(--brand-primary)] hover:opacity-95 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all shrink-0 self-start sm:self-auto"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        )}
      </div>
    )}
      </div>
    </div>
  );
}
