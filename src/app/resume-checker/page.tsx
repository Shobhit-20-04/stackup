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
  BookmarkPlus
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth/session';
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

const SAMPLE_STRONG_RESUME = `
SHOBHIT AGRAWAL
Email: shobhit.student@gmail.com | Phone: +91 98765 43210
LinkedIn: linkedin.com/in/shobhit-agrawal | GitHub: github.com/shobhit-dev | Portfolio: shobhit.tech

EDUCATION
Bachelor of Technology in Computer Science & Engineering | 2022 - 2026 | CGPA: 9.1/10

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Java, C++, SQL
Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS, Redux
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, EC2), Git, CI/CD
Core Concepts: Data Structures & Algorithms, System Design, REST APIs, Microservices, Unit Testing

WORK EXPERIENCE
Software Engineering Intern | CloudScale Solutions | May 2025 - July 2025
- Architected and deployed scalable RESTful microservices in Node.js and TypeScript, handling over 250,000 daily requests.
- Optimized PostgreSQL database queries and implemented Redis caching, reducing p95 API response latency by 44%.
- Integrated automated CI/CD pipeline using GitHub Actions and Docker, reducing team deployment cycle time from 40 mins to 8 mins.
- Authored comprehensive unit and integration test suites using Vitest, boosting code test coverage from 62% to 91%.

PROJECTS
StackUp - All-in-One Tech Interview Preparation Platform | Next.js, Supabase, Tailwind CSS, TypeScript
- Engineered full-stack platform serving interactive quizzes, algorithmic roadmap, and ATS diagnostics.
- Implemented Supabase Row Level Security (RLS) and JWT auth, ensuring strict zero-trust data segregation.
- Achieved 98+ Google Lighthouse performance score by leveraging Vercel Edge caching and dynamic code splitting.
`;

const SAMPLE_WEAK_RESUME = `
Alex Smith
Phone: 555-0199

Objective: Looking for a good software job to learn programming.

Experience:
Web Helper at Local Tech
- Helped make websites for clients.
- Fixed some bugs in the code.
- Worked with team members on daily tasks.

Education:
College student studying computer subjects.
`;

export default function ResumeCheckerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // File drag & drop state
  const [isDragging, setIsDragging] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMsg('');

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
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

  const handleTestWithSample = async (type: 'strong' | 'weak') => {
    setAnalyzing(true);
    setErrorMsg('');
    setSavedSuccess(false);

    const sampleText = type === 'strong' ? SAMPLE_STRONG_RESUME : SAMPLE_WEAK_RESUME;
    const filename = type === 'strong' ? 'Shobhit_SDE_Resume.pdf' : 'Draft_Resume_Incomplete.docx';

    try {
      const res = await fetch('/api/resume-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sampleText, filename }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to run sample analysis.');
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Sample analysis failed.');
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

      // 2. Try saving to Supabase if logged in
      const user = await getCurrentUser();
      if (user) {
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

      setSavedSuccess(true);
    } catch {
      setSavedSuccess(true); // local is saved regardless
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setErrorMsg('');
    setSavedSuccess(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 pb-20">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-3">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>AI-Powered ATS Evaluator</span>
              </div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Resume ATS Checker
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
                Scan your software engineering resume against standard Applicant Tracking Systems. Uncover missing tech keywords, detect formatting red flags, and get instant line-by-line STAR rewrites.
              </p>
            </div>

            {/* Quick action buttons for demo testing */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => handleTestWithSample('strong')}
                disabled={analyzing}
                className="w-full sm:w-auto px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Try Sample SDE Resume</span>
              </button>
              <button
                onClick={() => handleTestWithSample('weak')}
                disabled={analyzing}
                className="w-full sm:w-auto px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
              >
                <span>Try Incomplete CV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Error notification */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start space-x-3 text-rose-700 dark:text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Upload notice: </span>
              {errorMsg}
            </div>
          </div>
        )}

        {!result ? (
          /* Upload State */
          <div className="space-y-6">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`p-10 border-2 border-dashed rounded-3xl text-center transition-all bg-white dark:bg-zinc-900 ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 scale-[1.01]' 
                  : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400'
              }`}
            >
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-sm">
                  <UploadCloud className="w-8 h-8" />
                </div>
                
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Drop your resume here
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-6">
                  Supports PDF (.pdf) and Word (.docx) files up to 5MB.
                </p>

                {file ? (
                  <div className="flex items-center space-x-3 bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 mb-6">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-xs">
                      {file.name}
                    </span>
                    <span className="text-xs text-zinc-400">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                    <button 
                      onClick={() => setFile(null)} 
                      className="p-1 text-zinc-400 hover:text-rose-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input 
                      type="file" 
                      accept=".pdf,.docx,.txt" 
                      onChange={handleFileSelect} 
                      className="hidden" 
                    />
                    <span className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 inline-flex items-center space-x-2 transition-all">
                      <FileText className="w-4 h-4" />
                      <span>Browse Files</span>
                    </span>
                  </label>
                )}

                {file && (
                  <button
                    onClick={handleAnalyzeUpload}
                    disabled={analyzing}
                    className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 transition-all"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Analyzing with ATS Scanner...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Run Full ATS Diagnostic</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Keyword Matching</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Cross-references against 30+ top technical skills required in modern SWE recruiting pipelines.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Impact & Metrics</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Evaluates quantified business results, latency gains, and STAR structure in your bullet points.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Line-by-Line Rewrites</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Provides actionable before-and-after bullet rewrites with strong action verbs.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Scorecard Result View */
          <div className="space-y-6">
            {/* Top Score Summary Banner */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center space-x-5">
                  {/* Big Circular Score */}
                  <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white shadow-md ${
                    result.ats_score >= 80 
                      ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-500/20' 
                      : result.ats_score >= 65
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/20'
                      : 'bg-gradient-to-tr from-rose-600 to-pink-500 shadow-rose-500/20'
                  }`}>
                    <span className="text-3xl font-black">{result.ats_score}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-90">/ 100 ATS</span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                        {result.ats_score >= 80 ? 'Strong Match' : result.ats_score >= 65 ? 'Competitive Profile' : 'Needs Optimization'}
                      </h2>
                      <span className="px-2 py-0.5 rounded text-xs font-black bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                        Grade {result.grade}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      File: <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">{result.filename}</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSaveToProfile}
                    disabled={savedSuccess}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
                      savedSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                    }`}
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Saved to Profile!</span>
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
                    className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Scan Another</span>
                  </button>
                </div>
              </div>

              {/* Summary text */}
              <p className="mt-5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {result.summary}
              </p>

              {/* 4-Part Category Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500 font-medium">Contact & Links</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{result.breakdown.contact_score}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${result.breakdown.contact_score}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500 font-medium">Tech Skills</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{result.breakdown.skills_score}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${result.breakdown.skills_score}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500 font-medium">Experience & Impact</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{result.breakdown.experience_score}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${result.breakdown.experience_score}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500 font-medium">ATS Layout</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{result.breakdown.formatting_score}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full rounded-full" style={{ width: `${result.breakdown.formatting_score}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Keyword Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Keywords */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Matched Tech Keywords ({result.matched_keywords.length})
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 mb-4">
                  These verified skills were successfully extracted by the ATS scanner:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.matched_keywords.length === 0 ? (
                    <span className="text-xs text-zinc-400">No tech keywords identified.</span>
                  ) : (
                    result.matched_keywords.map((kw) => (
                      <span 
                        key={kw}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      >
                        ✓ {kw}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Missing Recommended Keywords */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Suggested Keywords to Add ({result.missing_keywords.length})
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 mb-4">
                  High-frequency SWE recruiter terms not found in your resume:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.missing_keywords.length === 0 ? (
                    <span className="text-xs text-zinc-400">Comprehensive keyword coverage!</span>
                  ) : (
                    result.missing_keywords.map((kw) => (
                      <span 
                        key={kw}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                      >
                        + {kw}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* AI Bullet Point Optimization */}
            {result.bullet_rewrites && result.bullet_rewrites.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    STAR Bullet Point Rewrites
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 mb-4">
                  Compare generic descriptions with high-impact, quantified engineering bullets:
                </p>

                <div className="space-y-4">
                  {result.bullet_rewrites.map((rewrite, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 space-y-2.5">
                      <div className="flex items-start space-x-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 shrink-0 mt-0.5">
                          Before
                        </span>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-through">
                          {rewrite.original}
                        </p>
                      </div>

                      <div className="flex items-start space-x-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 shrink-0 mt-0.5">
                          After (STAR)
                        </span>
                        <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                          {rewrite.improved}
                        </p>
                      </div>

                      <p className="text-[11px] text-indigo-600 dark:text-indigo-400 italic pl-1">
                        Reason: {rewrite.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actionable Suggestions Checklist */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4">
                Section-by-Section Recommendations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Work Experience
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {result.section_suggestions.experience.map((s, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Technical Skills & Tools
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {result.section_suggestions.skills.map((s, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Personal Projects
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {result.section_suggestions.projects.map((s, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Contact & Links
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {result.section_suggestions.contact.map((s, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Profile Navigation Footer */}
            <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 p-5 rounded-2xl">
              <div>
                <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
                  Track your score progression
                </h4>
                <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-0.5">
                  Saved resumes are stored in your profile dashboard alongside your quiz scores and streak tracker.
                </p>
              </div>
              <Link
                href="/profile"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all"
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
