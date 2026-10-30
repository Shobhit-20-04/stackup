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
  ChevronRight,
  BookmarkPlus,
  Lock,
  Copy,
  Briefcase,
  GraduationCap,
  Target,
  ShieldAlert,
  ChevronDown,
  Info
} from 'lucide-react';
import { getCurrentUser, getFastCachedUser, type UserSession } from '@/lib/auth/session';
import { createClient } from '@/lib/supabase/client';
import { TARGET_ROLE_PRESETS } from '@/lib/services/resume/role-presets';
import type { 
  ResumeAnalysisResult, 
  ExperienceLevel, 
  ScoringDimension 
} from '@/lib/services/resume/types';

export default function ResumeCheckerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [showJdInput, setShowJdInput] = useState<boolean>(false);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('student_fresher');
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [expandedDimension, setExpandedDimension] = useState<string | null>('jd-alignment');
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
      setErrorMsg('Unsupported format. Please upload a PDF (.pdf), Word (.docx), or Text document (.txt).');
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
      if (targetRole) {
        formData.append('targetRole', targetRole);
      }
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription.trim());
      }
      formData.append('experienceLevel', experienceLevel);

      const res = await fetch('/api/resume-analysis', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to analyze resume.');
      }

      const data: ResumeAnalysisResult = await res.json();
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
      setSavedSuccess(true);
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const dims = result.dimensions;
    const reportText = `📄 StackUp ATS Resume Report: ${result.filename}
🎯 Overall ATS Score: ${result.ats_score}/100 (Grade: ${result.grade})
Mode: ${result.isGeneralQualityScore ? 'General Resume Quality (Rebalanced Weights)' : `Target Role Alignment (${result.jobDescriptionMatch.targetRoleTitle || 'Custom JD'})`}
Experience Level: ${result.experienceLevel}

📊 Comprehensive ATS Scoring Dimensions:
  1. Job-Description Alignment: ${dims.jobDescriptionAlignment.score}% (Weight: ${dims.jobDescriptionAlignment.weightPct}%, Contribution: ${dims.jobDescriptionAlignment.weightedScore} pts)
  2. Skills & Qualifications: ${dims.skillsAndQualifications.score}% (Weight: ${dims.skillsAndQualifications.weightPct}%, Contribution: ${dims.skillsAndQualifications.weightedScore} pts)
  3. Experience & Projects: ${dims.experienceAndProjects.score}% (Weight: ${dims.experienceAndProjects.weightPct}%, Contribution: ${dims.experienceAndProjects.weightedScore} pts)
  4. Impact & Achievements: ${dims.impactAndAchievements.score}% (Weight: ${dims.impactAndAchievements.weightPct}%, Contribution: ${dims.impactAndAchievements.weightedScore} pts)
  5. Structure & Readability: ${dims.structureAndReadability.score}% (Weight: ${dims.structureAndReadability.weightPct}%, Contribution: ${dims.structureAndReadability.weightedScore} pts)
  6. ATS Compatibility: ${dims.atsCompatibility.score}% (Weight: ${dims.atsCompatibility.weightPct}%, Contribution: ${dims.atsCompatibility.weightedScore} pts)
  7. Education & Credentials: ${dims.educationAndCredentials.score}% (Weight: ${dims.educationAndCredentials.weightPct}%, Contribution: ${dims.educationAndCredentials.weightedScore} pts)

✅ Matched Keywords (${result.matched_keywords.length}):
${result.matched_keywords.join(', ') || 'None detected'}

⚠️ Suggested Keywords to Add (${result.missing_keywords.length}):
${result.missing_keywords.join(', ') || 'None needed'}

⭐ Fact-Preserving Google XYZ Bullet Rewrites:
${result.bullet_rewrites.map((b, i) => `${i + 1}. Before: "${b.original}"\n   After: "${b.improved}"\n   Rationale: ${b.reason}`).join('\n\n')}

📌 Prioritized Recommendations:
${result.recommendations.map((r, i) => `${i + 1}. [${r.priority}] ${r.section}: ${r.issue} -> ${r.howToFix}`).join('\n')}

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
    setExpandedDimension('jd-alignment');
  };

  const renderDimensionCard = (dimension: ScoringDimension, num: string) => {
    const isExpanded = expandedDimension === dimension.id;
    return (
      <div 
        key={dimension.id}
        className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden transition-all"
      >
        <button
          onClick={() => setExpandedDimension(isExpanded ? null : dimension.id)}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[var(--surface-sunken)]/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3.5">
            <span className="font-mono text-xs font-bold text-[var(--brand-primary)] bg-[var(--surface-sunken)] px-2 py-1 rounded border border-[var(--border-subtle)]">
              {num}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-semibold text-[var(--foreground)]">
                  {dimension.name}
                </h4>
                <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
                  ({dimension.weightPct}% weight)
                </span>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                Contribution: <span className="font-mono font-semibold text-[var(--foreground)]">{dimension.weightedScore} / {dimension.maxWeightedScore}</span> pts
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className={`text-sm sm:text-base font-mono font-bold ${
                dimension.score >= 80 ? 'text-emerald-500' : dimension.score >= 60 ? 'text-amber-500' : 'text-rose-500'
              }`}>
                {dimension.score}%
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-[var(--foreground-muted)] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
          </div>
        </button>

        {isExpanded && (
          <div className="p-4 sm:p-5 pt-0 border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 space-y-4 animate-in fade-in duration-150">
            {/* Progress bar */}
            <div className="mt-3">
              <div className="w-full bg-[var(--surface-sunken)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    dimension.score >= 80 ? 'bg-emerald-500' : dimension.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }`} 
                  style={{ width: `${dimension.score}%` }} 
                />
              </div>
            </div>

            {/* Observable Evidence */}
            {dimension.observableEvidence.length > 0 && (
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-500 block mb-1.5">
                  ✓ Observable Evidence Found
                </span>
                <ul className="space-y-1">
                  {dimension.observableEvidence.map((ev, i) => (
                    <li key={i} className="text-xs text-[var(--foreground-muted)] flex items-start space-x-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Deductions */}
            {dimension.deductions.length > 0 && (
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500 block mb-1.5">
                  ⚠️ Point Deductions &amp; Gaps
                </span>
                <ul className="space-y-1.5">
                  {dimension.deductions.map((d, i) => (
                    <li key={i} className="text-xs text-[var(--foreground-muted)] flex items-start space-x-2">
                      <span className="text-rose-500 font-mono text-[11px] shrink-0 font-bold">-{d.points} pts</span>
                      <span>{d.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvement Opportunities */}
            {dimension.improvementOpportunities.length > 0 && (
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)] block mb-1.5">
                  💡 Actionable Improvement Steps
                </span>
                <ul className="space-y-1">
                  {dimension.improvementOpportunities.map((imp, i) => (
                    <li key={i} className="text-xs text-[var(--foreground-muted)] flex items-start space-x-2">
                      <span className="text-[var(--brand-primary)] font-bold">→</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20 page-enter">
      {/* Header Banner */}
      <div className="bg-[var(--surface-card)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)] mb-3">
                <FileCheck2 className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                <span>Production-Ready ATS Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                Software Engineering Resume ATS Evaluator
              </h1>
              <p className="mt-2 text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
                Benchmark your engineering resume with transparent diagnostic scoring, job-description alignment, scanned PDF detection, and fact-preserving Google XYZ bullet point rewrites.
              </p>
            </div>

            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs text-[var(--foreground-muted)] shrink-0 self-start md:self-auto">
              <UploadCloud className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>PDF, DOCX, TXT • Max 5MB • No Fabricated Facts</span>
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
          <div className="p-12 border border-[var(--border-subtle)] rounded-lg text-center bg-[var(--surface-card)] shadow-xs flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-7 h-7 animate-spin text-[var(--brand-primary)]" />
            <p className="text-xs text-[var(--foreground-muted)]">Verifying student session...</p>
          </div>
        ) : !currentUser ? (
          /* Locked State for Unauthenticated Visitors */
          <div className="p-8 sm:p-12 border border-[var(--border-subtle)] rounded-lg text-center bg-[var(--surface-card)] shadow-xs space-y-6">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="w-12 h-12 rounded-lg bg-[var(--surface-sunken)] text-[var(--brand-primary)] flex items-center justify-center mb-3 border border-[var(--border-subtle)]">
                <Lock className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-2">
                Authentication Required
              </span>
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                Sign in to analyze and benchmark your resume
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] mt-1.5 mb-6 leading-relaxed">
                Resume scanning, diagnostic scoring, job description matching, and XYZ bullet optimization require an active student account to save scores to your preparation profile.
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
          /* Two-Column Diagnostic Workbench */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Configuration & Document Input */}
            <div className="lg:col-span-7 space-y-6">
            {/* 1. Target Role & Experience Level Config */}
            <div className="p-5 sm:p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-[var(--brand-primary)]" />
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    Target Role &amp; Evaluation Mode
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
                  Step 1 of 2
                </span>
              </div>

              {/* Experience Level Selector */}
              <div>
                <label className="text-xs font-semibold text-[var(--foreground)] block mb-2">
                  Candidate Experience Level:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setExperienceLevel('student_fresher')}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      experienceLevel === 'student_fresher'
                        ? 'border-[var(--brand-primary)] bg-[var(--surface-sunken)] shadow-xs'
                        : 'border-[var(--border-subtle)] hover:border-[var(--foreground-muted)]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-[var(--brand-primary)]" />
                      <span className="text-xs font-bold text-[var(--foreground)]">Student / Fresher</span>
                    </div>
                    <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                      Projects &amp; coursework weighted equally; zero employment penalty.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExperienceLevel('junior')}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      experienceLevel === 'junior'
                        ? 'border-[var(--brand-primary)] bg-[var(--surface-sunken)] shadow-xs'
                        : 'border-[var(--border-subtle)] hover:border-[var(--foreground-muted)]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-[var(--foreground)]">Junior (1–3 yrs)</span>
                    </div>
                    <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                      Balances personal applications and commercial software experience.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExperienceLevel('mid_senior')}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      experienceLevel === 'mid_senior'
                        ? 'border-[var(--brand-primary)] bg-[var(--surface-sunken)] shadow-xs'
                        : 'border-[var(--border-subtle)] hover:border-[var(--foreground-muted)]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-[var(--foreground)]">Mid / Senior (3+ yrs)</span>
                    </div>
                    <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                      Focuses on commercial system scale, leadership, and production scope.
                    </p>
                  </button>
                </div>
              </div>

              {/* Target Role Preset Dropdown */}
              <div>
                <label className="text-xs font-semibold text-[var(--foreground)] block mb-1.5">
                  Target Software Engineering Role:
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full text-xs bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-[var(--foreground)] focus:outline-hidden focus:border-[var(--brand-primary)]"
                >
                  <option value="">General Resume Quality Mode (No specific target role)</option>
                  {TARGET_ROLE_PRESETS.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.title}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                  Selecting a target role activates 30% role-specific keyword matching and responsibility alignment.
                </p>
              </div>

              {/* Custom Job Description Toggle & Textarea */}
              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setShowJdInput(!showJdInput)}
                  className="text-xs font-medium text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1 cursor-pointer"
                >
                  <span>{showJdInput ? '− Hide Custom Job Description' : '+ Paste Custom Job Description'}</span>
                </button>

                {showJdInput && (
                  <div className="mt-3 space-y-2 animate-in fade-in duration-150">
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={4}
                      placeholder="Paste the job description (responsibilities, required qualifications, tools) to evaluate precise alignment against that specific opening..."
                      className="w-full text-xs font-mono bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-lg p-3 text-[var(--foreground)] focus:outline-hidden focus:border-[var(--brand-primary)]"
                    />
                    <div className="flex items-center justify-between text-[11px] text-[var(--foreground-muted)]">
                      <span>{jobDescription.length} characters</span>
                      {jobDescription && (
                        <button
                          type="button"
                          onClick={() => setJobDescription('')}
                          className="text-rose-500 hover:underline cursor-pointer"
                        >
                          Clear JD
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. File Upload Box */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`p-8 sm:p-10 border-2 border-dashed rounded-lg text-center transition-all bg-[var(--surface-card)] ${
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
                        <span>Evaluating Diagnostic Rubric...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Run ATS Diagnostic</span>
                      </>
                    )}
                  </button>
                )}

                {analyzing && (
                  <div className="w-full max-w-xs mt-4 space-y-2 animate-in fade-in duration-200">
                    <div className="h-2 w-full bg-[var(--surface-sunken)] rounded-full overflow-hidden border border-[var(--border-subtle)] relative">
                      <div className="h-full bg-[var(--brand-primary)] animate-progress-indeterminate w-1/3 rounded-full" />
                    </div>
                    <p className="text-[11px] text-[var(--foreground-muted)] text-center">
                      Extracting text layers, checking encoding, and scoring rubric...
                    </p>
                  </div>
                )}
              </div>
            </div>
            </div>

            {/* Right Column: Persistent Rubric Scope & ATS Standards */}
            <div className="lg:col-span-5 space-y-5">
              <div className="border border-[var(--border-subtle)] bg-[var(--surface-card)] rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                    Comprehensive Diagnostic Rubric
                  </h4>
                  <p className="text-[11px] text-[var(--foreground-muted)] mt-0.5">
                    Configurable weights adapt automatically when a job description is provided
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[var(--foreground-muted)] uppercase">
                  100% Deterministic
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div className="p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <span className="text-[10px] font-mono font-bold text-[var(--brand-primary)]">01 • 30% WEIGHT</span>
                  <div className="font-semibold text-[var(--foreground)] mt-0.5">JD &amp; Role Alignment</div>
                  <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                    Matches mandatory qualifications, preferred skills, and core responsibilities.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <span className="text-[10px] font-mono font-bold text-emerald-500">02 • 20% WEIGHT</span>
                  <div className="font-semibold text-[var(--foreground)] mt-0.5">Skills &amp; Evidence</div>
                  <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                    Extracts technical skills with sentence evidence; guards against keyword stuffing.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <span className="text-[10px] font-mono font-bold text-amber-500">03 • 15% WEIGHT</span>
                  <div className="font-semibold text-[var(--foreground)] mt-0.5">Experience &amp; Projects</div>
                  <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                    Candidate-level aware: rewards freshers for deep projects without penalizing tenure.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                  <span className="text-[10px] font-mono font-bold text-teal-500">04 • 10% WEIGHT</span>
                  <div className="font-semibold text-[var(--foreground)] mt-0.5">Impact &amp; Metrics</div>
                  <p className="text-[11px] text-[var(--foreground-muted)] mt-1">
                    Authoritative action verbs, throughput metrics, latency reductions, and cost cuts.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        ) : (
          /* Scorecard Result View */
          <div className="space-y-6">
            {/* Scanned Document Warning Banner (if image-only PDF detected) */}
            {result.parsingReport.isScanned && (
              <div className="p-4 sm:p-5 rounded-lg bg-amber-500/10 border-2 border-amber-500/40 text-amber-600 dark:text-amber-400 space-y-2">
                <div className="flex items-center space-x-2 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>Scanned Document Alert: OCR Required for Commercial ATS</span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--foreground)]">
                  This document appears to be an <strong>image-only scanned PDF</strong> without an underlying selectable text layer. Enterprise applicant tracking systems (Workday, Greenhouse, Taleo) cannot read text inside images and will register a blank application.
                </p>
                <div className="text-xs font-medium text-[var(--foreground-muted)] pt-1">
                  <strong>Recommended Remedy:</strong> Export your resume directly from Microsoft Word, Google Docs, or LaTeX using &quot;File &gt; Download / Save As PDF&quot; rather than scanning a printed sheet.
                </div>
              </div>
            )}

            {/* Keyword Stuffing Warning (if detected) */}
            {result.keyword_stuffing_detected && (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-start space-x-3 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Keyword Stuffing Detected: </span>
                  Certain skills repeat 7+ times in your document. Modern ATS systems and human recruiters penalize artificial keyword repetition. Feature skills 2-3 times max with concrete contextual accomplishments.
                </div>
              </div>
            )}

            {/* Top Score Summary Banner */}
            <div className="bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-5">
                  <div className={`w-20 h-20 sm:w-22 sm:h-22 rounded-lg flex flex-col items-center justify-center text-white shrink-0 ${
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
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]">
                        {result.isGeneralQualityScore ? 'General Quality Mode' : (result.jobDescriptionMatch.targetRoleTitle || 'Role Alignment Mode')}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--foreground-muted)] mt-1.5 break-all">
                      File: <span className="font-mono text-[var(--foreground)]">{result.filename}</span> • {result.parsingReport.wordCount} words • Quality: {result.parsingReport.confidence}
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

              {/* Educational Disclaimer */}
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-start space-x-2 text-[11px] text-[var(--foreground-muted)]">
                <Info className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>{result.disclaimer}</span>
              </div>
            </div>

            {/* Job Description Alignment Panel (if target JD or preset was provided) */}
            {result.jobDescriptionMatch.hasJobDescription && (
              <div className="bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-[var(--brand-primary)]" />
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                      Role Match: {result.jobDescriptionMatch.targetRoleTitle || 'Target Job Description'}
                    </h3>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-500">
                    {result.jobDescriptionMatch.matchScore}% Match
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Required Skills Matched vs Missing */}
                  <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-500 block mb-2">
                      Mandatory Skills Matched ({result.jobDescriptionMatch.requiredSkillsMatched.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.jobDescriptionMatch.requiredSkillsMatched.length === 0 ? (
                        <span className="text-xs text-[var(--foreground-muted)]">No mandatory skills matched.</span>
                      ) : (
                        result.jobDescriptionMatch.requiredSkillsMatched.map((s) => (
                          <span key={s.name} className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            ✓ {s.name}
                          </span>
                        ))
                      )}
                    </div>

                    {result.jobDescriptionMatch.requiredSkillsMissing.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500 block mb-1.5">
                          Missing Required Skills ({result.jobDescriptionMatch.requiredSkillsMissing.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {result.jobDescriptionMatch.requiredSkillsMissing.map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-500 border border-rose-500/20">
                              ✗ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preferred Skills */}
                  <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)] block mb-2">
                      Preferred / Bonus Skills Matched ({result.jobDescriptionMatch.preferredSkillsMatched.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.jobDescriptionMatch.preferredSkillsMatched.length === 0 ? (
                        <span className="text-xs text-[var(--foreground-muted)]">No preferred skills matched.</span>
                      ) : (
                        result.jobDescriptionMatch.preferredSkillsMatched.map((s) => (
                          <span key={s.name} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)]">
                            + {s.name}
                          </span>
                        ))
                      )}
                    </div>

                    {result.jobDescriptionMatch.preferredSkillsMissing.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-500 block mb-1.5">
                          Missing Preferred Skills ({result.jobDescriptionMatch.preferredSkillsMissing.slice(0, 4).length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {result.jobDescriptionMatch.preferredSkillsMissing.slice(0, 4).map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20">
                              ○ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Diagnostic Rubric Explanatory Breakdown Accordion */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Diagnostic Rubric Scoring &amp; Observable Evidence
                </h3>
                <span className="text-xs text-[var(--foreground-muted)]">
                  Click any dimension to inspect evidence &amp; deductions
                </span>
              </div>

              {renderDimensionCard(result.dimensions.jobDescriptionAlignment, '01')}
              {renderDimensionCard(result.dimensions.skillsAndQualifications, '02')}
              {renderDimensionCard(result.dimensions.experienceAndProjects, '03')}
              {renderDimensionCard(result.dimensions.impactAndAchievements, '04')}
              {renderDimensionCard(result.dimensions.structureAndReadability, '05')}
              {renderDimensionCard(result.dimensions.atsCompatibility, '06')}
              {renderDimensionCard(result.dimensions.educationAndCredentials, '07')}
            </div>

            {/* Keyword Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Matched Keywords */}
              <div className="bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] p-5">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    Identified Tech Skills ({result.matched_keywords.length})
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mb-3.5">
                  Verified technical skills identified across your sections:
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
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
              <div className="bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] p-5">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    Recommended Keywords to Consider ({result.missing_keywords.length})
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mb-3.5">
                  Key software engineering terms not found in your document:
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
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

            {/* Fact-Preserving Google XYZ Bullet Point Rewrites */}
            {result.bullet_rewrites && result.bullet_rewrites.length > 0 && (
              <div className="bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] p-5 space-y-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    Fact-Preserving Google XYZ Bullet Rewrites
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)]">
                  StackUp uses Google&apos;s formula (&quot;Accomplished [X] as measured by [Y], by doing [Z]&quot;) while strictly preserving candidate facts. Replace bracketed placeholders with your genuine metrics.
                </p>

                <div className="space-y-3 pt-2">
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
                          XYZ Improved
                        </span>
                        <p className="text-xs font-medium text-[var(--foreground)] leading-relaxed">
                          {rewrite.improved}
                        </p>
                      </div>

                      <p className="text-[11px] text-[var(--foreground-muted)] font-mono pl-1">
                        Rationale: {rewrite.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prioritized Action Plan / Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] p-5">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                  Prioritized Action Plan
                </h3>
                <div className="space-y-2.5">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] flex items-start space-x-3 text-xs">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold shrink-0 mt-0.5 ${
                        rec.priority === 'Critical' 
                          ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                          : rec.priority === 'Important'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                        {rec.priority}
                      </span>
                      <div className="space-y-0.5 flex-1">
                        <div className="font-semibold text-[var(--foreground)]">{rec.issue} ({rec.section})</div>
                        <div className="text-[var(--foreground-muted)]">{rec.howToFix}</div>
                        <div className="text-[11px] font-mono text-[var(--brand-primary)]">Impact: {rec.expectedImpact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section-by-Section Recommendations */}
            <div className="bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3.5">
                Section-by-Section Checklist
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] p-4 sm:p-5 rounded-lg">
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
          </div>
        )}
      </div>
    </div>
  );
}
