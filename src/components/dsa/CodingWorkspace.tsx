'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  Terminal,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  Plus,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Video,
  Sparkles,
  FileText,
  Lightbulb,
  Loader2,
  BookOpen,
} from 'lucide-react';
import { DSA_PROBLEMS } from '@/lib/data/dsa';
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
  type TestCaseItem,
  type SubmitResponse,
  type RunCodeResponse,
} from '@/lib/services/judge/types';
import { getStarterCode } from '@/lib/services/judge/adapters';
import { getSampleTestCases } from '@/lib/services/judge/testcases';

// Dynamically import Monaco Editor to avoid SSR hydration issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-[#0B1020] text-slate-400 font-mono text-xs space-y-2">
      <Loader2 className="w-5 h-5 animate-spin text-[var(--brand-primary)]" />
      <span>Loading Integrated Code Editor...</span>
    </div>
  ),
});

interface CodingWorkspaceProps {
  problemId: string;
  onClose: () => void;
  onProblemChange?: (problemId: string) => void;
  currentUser?: { id: string; email?: string | null } | null;
  onSolvedChange?: (problemId: string, isSolved: boolean) => void;
  isSolvedInitially?: boolean;
}

export default function CodingWorkspace({
  problemId,
  onClose,
  onProblemChange,
  currentUser,
  onSolvedChange,
  isSolvedInitially = false,
}: CodingWorkspaceProps) {
  const problem = useMemo(() => {
    return DSA_PROBLEMS.find((p) => p.id === problemId) || DSA_PROBLEMS[0];
  }, [problemId]);

  const currentIndex = useMemo(() => {
    return DSA_PROBLEMS.findIndex((p) => p.id === problem.id);
  }, [problem.id]);

  const prevProblem = currentIndex > 0 ? DSA_PROBLEMS[currentIndex - 1] : null;
  const nextProblem = currentIndex < DSA_PROBLEMS.length - 1 ? DSA_PROBLEMS[currentIndex + 1] : null;

  // Selected programming language
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('python');
  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Left panel tab: 'description' | 'editorial' | 'solutions'
  const [leftTab, setLeftTab] = useState<'description' | 'editorial' | 'solutions'>('description');

  // Bottom pane tab: 'testcases' | 'console' | 'submission'
  const [bottomTab, setBottomTab] = useState<'testcases' | 'console' | 'submission'>('testcases');

  // Mobile layout switcher: 'problem' | 'editor' | 'results'
  const [mobileTab, setMobileTab] = useState<'problem' | 'editor' | 'results'>('editor');

  // Code state per problem + language (initialized from storage or starter code)
  const [code, setCode] = useState<string>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(`stackup_code_${problem.id}_python`);
        if (saved) return saved;
      }
    } catch {
      // ignore
    }
    return getStarterCode(problem, 'python');
  });

  // Sample + custom test cases (initialized from problem examples)
  const [testCases, setTestCases] = useState<TestCaseItem[]>(() => {
    return getSampleTestCases(problem.id);
  });
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResults, setRunResults] = useState<RunCodeResponse | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Solved state
  const [isSolved, setIsSolved] = useState(isSolvedInitially);

  // Handle switching language
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setSelectedLanguage(newLang);
    let loaded = '';
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(`stackup_code_${problem.id}_${newLang}`);
        if (saved) loaded = saved;
      }
    } catch {
      // ignore
    }
    if (!loaded) {
      loaded = getStarterCode(problem, newLang);
    }
    setCode(loaded);
  };

  // Persist code changes to localStorage
  const handleCodeChange = useCallback(
    (newVal: string | undefined) => {
      const updated = newVal || '';
      setCode(updated);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, updated);
        }
      } catch {
        // ignore
      }
    },
    [problem.id, selectedLanguage]
  );

  // Reset to starter code with confirmation
  const handleResetCode = () => {
    if (confirm(`Reset code for ${problem.title} (${SUPPORTED_LANGUAGES[selectedLanguage].name}) to default starter template?`)) {
      const starter = getStarterCode(problem, selectedLanguage);
      setCode(starter);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, starter);
        }
      } catch {
        // ignore
      }
    }
  };

  // Add custom test case
  const handleAddCustomTest = () => {
    const newIdx = testCases.filter((tc) => tc.isCustom).length + 1;
    const newCase: TestCaseItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${newIdx}`,
      input: testCases[0]?.input || '',
      expectedOutput: '',
      isCustom: true,
    };
    const updated = [...testCases, newCase];
    setTestCases(updated);
    setActiveTestCaseIndex(updated.length - 1);
    setBottomTab('testcases');
  };

  // Remove custom test case
  const handleRemoveCustomTest = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = testCases.filter((tc) => tc.id !== id);
    setTestCases(updated);
    if (activeTestCaseIndex >= updated.length) {
      setActiveTestCaseIndex(Math.max(0, updated.length - 1));
    }
  };

  // Update test case input or expected output
  const handleUpdateTestCase = (index: number, field: 'input' | 'expectedOutput', value: string) => {
    setTestCases((prev) => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: value };
      }
      return copy;
    });
  };

  // Execute RUN CODE (against sample + custom test cases)
  const handleRunCode = useCallback(async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setBottomTab('console');
    setMobileTab('results');

    try {
      const res = await fetch('/api/dsa/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          language: selectedLanguage,
          sourceCode: code,
          testCases: testCases.map((tc) => ({
            id: tc.id,
            name: tc.name,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isCustom: tc.isCustom,
          })),
        }),
      });

      const data: RunCodeResponse = await res.json();
      setRunResults(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Execution failed';
      setRunResults({
        success: false,
        verdict: 'Internal Error',
        compileOutput: null,
        results: [],
        error: msg,
      });
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, isSubmitting, problem.id, selectedLanguage, code, testCases]);

  // SUBMIT SOLUTION (against official judging suite)
  const handleSubmit = useCallback(async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setBottomTab('submission');
    setMobileTab('results');

    try {
      const res = await fetch('/api/dsa/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          language: selectedLanguage,
          sourceCode: code,
        }),
      });

      const data: SubmitResponse = await res.json();
      setSubmitResult(data);

      if (data.verdict === 'Accepted') {
        setIsSolved(true);
        if (onSolvedChange) {
          onSolvedChange(problem.id, true);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setSubmitResult({
        success: false,
        verdict: 'Internal Error',
        totalTests: 0,
        passedTests: 0,
        errorDetails: msg,
        results: [],
        problemId: problem.id,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [isRunning, isSubmitting, problem.id, selectedLanguage, code, onSolvedChange]);

  // Keyboard shortcut listener (Ctrl+Enter to Run, Ctrl+Shift+Enter to Submit, Escape to exit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isFullscreen) {
        onClose();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          void handleSubmit();
        } else {
          void handleRunCode();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleRunCode, handleSubmit, onClose]);

  const activeTestCase = testCases[activeTestCaseIndex] || testCases[0];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[var(--background)] text-[var(--foreground)] ${
        isFullscreen ? 'p-0' : 'p-0 sm:p-2 md:p-3'
      }`}
    >
      {/* Workspace Outer Container */}
      <div className="w-full h-full flex flex-col rounded-none sm:rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-2xl overflow-hidden">
        {/* 1. TOP MASTHEAD TOOLBAR */}
        <header className="h-13 shrink-0 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 px-3 sm:px-4 flex items-center justify-between gap-3 select-none">
          {/* Left: Branding & Problem Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <span className="text-xs font-mono font-black tracking-wider text-[var(--brand-primary)] shrink-0 hidden sm:inline-block">
              STACKUP // WORKSPACE
            </span>
            <span className="text-slate-300 dark:text-zinc-700 hidden sm:inline-block">|</span>

            {/* Prev / Next Nav */}
            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={() => prevProblem && onProblemChange && onProblemChange(prevProblem.id)}
                disabled={!prevProblem}
                className="p-1 rounded hover:bg-[var(--surface-card)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title={prevProblem ? `Previous Problem: ${prevProblem.title}` : 'No previous problem'}
              >
                <ChevronLeft className="w-4 h-4 text-[var(--foreground-muted)]" />
              </button>
              <button
                onClick={() => nextProblem && onProblemChange && onProblemChange(nextProblem.id)}
                disabled={!nextProblem}
                className="p-1 rounded hover:bg-[var(--surface-card)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title={nextProblem ? `Next Problem: ${nextProblem.title}` : 'No next problem'}
              >
                <ChevronRight className="w-4 h-4 text-[var(--foreground-muted)]" />
              </button>
            </div>

            {/* Problem Identifier & Title */}
            <div className="flex items-center space-x-2 min-w-0">
              <span className="font-mono text-[11px] font-bold text-[var(--foreground-muted)] shrink-0">
                #{problem.id}
              </span>
              <h1 className="text-xs sm:text-sm font-bold text-[var(--foreground)] truncate">
                {problem.title}
              </h1>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  problem.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : problem.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                }`}
              >
                {problem.difficulty}
              </span>
              {isSolved && (
                <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Solved</span>
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions, Fullscreen, Close */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* User Session Chip */}
            <span className="hidden md:inline-flex text-[10px] font-mono text-[var(--foreground-muted)] px-2 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-subtle)]">
              {currentUser?.email ? currentUser.email.split('@')[0] : 'Guest Session'}
            </span>

            {/* Mobile View Toggle */}
            <div className="flex lg:hidden bg-[var(--surface-card)] p-0.5 rounded-lg border border-[var(--border-subtle)] text-[11px]">
              <button
                onClick={() => setMobileTab('problem')}
                className={`px-2 py-1 rounded font-medium ${
                  mobileTab === 'problem' ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--foreground-muted)]'
                }`}
              >
                Problem
              </button>
              <button
                onClick={() => setMobileTab('editor')}
                className={`px-2 py-1 rounded font-medium ${
                  mobileTab === 'editor' ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--foreground-muted)]'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setMobileTab('results')}
                className={`px-2 py-1 rounded font-medium ${
                  mobileTab === 'results' ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--foreground-muted)]'
                }`}
              >
                Results
              </button>
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] text-[var(--foreground-muted)] transition-colors cursor-pointer hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-rose-500/10 hover:text-rose-500 text-[var(--foreground-muted)] transition-colors cursor-pointer"
              title="Close Workspace (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 2. MAIN SPLIT PANE WORKSPACE */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* ==================== LEFT PANEL: PROBLEM SPECIFICATION ==================== */}
          <div
            className={`lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] flex flex-col min-h-0 bg-[var(--surface-card)] ${
              mobileTab === 'problem' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {/* Left Tabs Bar */}
            <div className="h-10 shrink-0 border-b border-[var(--border-subtle)] px-3 flex items-center justify-between bg-[var(--surface-sunken)]/40">
              <div className="flex items-center space-x-1 text-xs">
                <button
                  onClick={() => setLeftTab('description')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    leftTab === 'description'
                      ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  <span>Description</span>
                </button>
                <button
                  onClick={() => setLeftTab('editorial')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    leftTab === 'editorial'
                      ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Approach</span>
                </button>
                <button
                  onClick={() => setLeftTab('solutions')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    leftTab === 'solutions'
                      ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Solutions</span>
                </button>
              </div>

              {/* External references */}
              <div className="flex items-center space-x-2 text-[11px]">
                <a
                  href={problem.leetcode_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-0.5"
                  title="LeetCode Problem"
                >
                  <span>LeetCode</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                {problem.striver_url && (
                  <a
                    href={problem.striver_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0D08CB] dark:text-[#E9DEFA] hover:underline flex items-center space-x-0.5"
                    title="TakeUForward Striver Guide"
                  >
                    <span>Striver</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Left Content Scroll Area */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-5 text-xs sm:text-sm">
              {leftTab === 'description' && (
                <>
                  {/* Category & Companies */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--brand-primary)]">
                      {problem.pattern_tag}
                    </span>
                    {problem.companies?.slice(0, 4).map((comp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>

                  {/* Problem Statement */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                      Problem Statement
                    </h3>
                    <p className="leading-relaxed text-[var(--foreground)] whitespace-pre-line bg-[var(--surface-sunken)]/40 p-3.5 rounded-lg border border-[var(--border-subtle)]">
                      {problem.description}
                    </p>
                  </div>

                  {/* Examples */}
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                      Sample Test Cases &amp; Output
                    </h3>
                    {problem.examples?.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-2 text-xs font-mono"
                      >
                        <div className="text-[11px] font-bold text-[var(--brand-primary)]">
                          Example {idx + 1}
                        </div>
                        <div>
                          <span className="text-[var(--foreground-muted)] block text-[10px] uppercase font-semibold">
                            Input:
                          </span>
                          <code className="text-[var(--foreground)] bg-[var(--surface-card)] px-2 py-1 rounded block border border-[var(--border-subtle)] overflow-x-auto">
                            {ex.input}
                          </code>
                        </div>
                        <div>
                          <span className="text-[var(--foreground-muted)] block text-[10px] uppercase font-semibold">
                            Output:
                          </span>
                          <code className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded block border border-emerald-500/20 overflow-x-auto">
                            {ex.output}
                          </code>
                        </div>
                        {ex.explanation && (
                          <div className="text-[11px] font-sans text-[var(--foreground-muted)] leading-relaxed pt-1">
                            <span className="font-semibold text-[var(--foreground)]">Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  {problem.constraints && problem.constraints.length > 0 && (
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                        Constraints
                      </h3>
                      <ul className="list-disc list-inside space-y-1 font-mono text-xs text-[var(--foreground-muted)] bg-[var(--surface-sunken)]/40 p-3 rounded-lg border border-[var(--border-subtle)]">
                        {problem.constraints.map((c, idx) => (
                          <li key={idx} className="text-[var(--foreground)]">
                            <code className="text-xs">{c}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {leftTab === 'editorial' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <Sparkles className="w-4 h-4" />
                      <span>Algorithmic Approach &amp; Intuition</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
                      {problem.approach}
                    </p>
                  </div>

                  {/* Complexities */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--foreground-muted)] flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[var(--brand-primary)]" />
                        <span>Time Complexity</span>
                      </span>
                      <span className="font-mono font-bold text-[var(--foreground)] block">
                        {problem.timeComplexity}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--foreground-muted)] flex items-center space-x-1">
                        <HardDrive className="w-3 h-3 text-emerald-500" />
                        <span>Space Complexity</span>
                      </span>
                      <span className="font-mono font-bold text-[var(--foreground)] block">
                        {problem.spaceComplexity}
                      </span>
                    </div>
                  </div>

                  {/* Video Walkthrough */}
                  {problem.youtube_url && (
                    <div className="pt-2">
                      <a
                        href={problem.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors"
                      >
                        <Video className="w-4 h-4" />
                        <span>Watch Video Lecture on YouTube &rarr;</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {leftTab === 'solutions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                    <span className="text-xs font-bold text-[var(--foreground)]">
                      Reference Optimal Solution ({selectedLanguage.toUpperCase()})
                    </span>
                    <button
                      onClick={() => {
                        const sol = (problem.solutions as unknown as Record<string, string>)[selectedLanguage] || '';
                        if (sol) {
                          navigator.clipboard.writeText(sol);
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 1500);
                        }
                      }}
                      className="px-2.5 py-1 rounded text-[11px] font-medium border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-card)] transition-colors inline-flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="rounded-lg border border-[var(--border-subtle)] bg-[#0B1020] text-slate-200 p-3 font-mono text-xs overflow-x-auto max-h-[400px]">
                    <pre>
                      <code>
                        {(problem.solutions as unknown as Record<string, string>)[selectedLanguage] ||
                          problem.solutions?.python ||
                          '// Solution available in Python, C++, Java, and TypeScript'}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ==================== RIGHT PANEL: CODE EDITOR & TEST BENCH ==================== */}
          <div
            className={`lg:col-span-7 flex flex-col min-h-0 bg-[var(--background)] ${
              mobileTab !== 'problem' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {/* Editor Top Control Bar */}
            <div className="h-10 shrink-0 border-b border-[var(--border-subtle)] px-3 flex items-center justify-between bg-[var(--surface-sunken)]/50">
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                  className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] text-xs font-mono font-semibold text-[var(--foreground)] focus:outline-none focus:border-[var(--brand-primary)] cursor-pointer"
                >
                  {(Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).map((lang) => (
                    <option key={lang} value={lang}>
                      {SUPPORTED_LANGUAGES[lang].name}
                    </option>
                  ))}
                </select>

                {/* Theme Selector */}
                <select
                  value={editorTheme}
                  onChange={(e) => setEditorTheme(e.target.value as 'vs-dark' | 'light')}
                  className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[11px] font-mono text-[var(--foreground-muted)] focus:outline-none cursor-pointer hidden sm:block"
                >
                  <option value="vs-dark">Dark Theme</option>
                  <option value="light">Light Theme</option>
                </select>
              </div>

              {/* Reset to starter code */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetCode}
                  className="px-2 py-1 rounded text-[11px] font-mono text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-card)] transition-colors inline-flex items-center space-x-1 cursor-pointer"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset Code</span>
                </button>
              </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 min-h-[220px] relative overflow-hidden bg-[#0B1020]">
              <MonacoEditor
                height="100%"
                language={SUPPORTED_LANGUAGES[selectedLanguage].monacoLanguage}
                theme={editorTheme}
                value={code}
                onChange={handleCodeChange}
                options={{
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
                  fontLigatures: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  automaticLayout: true,
                  tabSize: 4,
                  wordWrap: 'on',
                  bracketPairColorization: { enabled: true },
                  padding: { top: 12, bottom: 12 },
                }}
              />
            </div>

            {/* ==================== BOTTOM TEST BENCH & CONSOLE PANEL ==================== */}
            <div className="h-64 sm:h-72 border-t border-[var(--border-subtle)] flex flex-col min-h-0 bg-[var(--surface-card)] shrink-0">
              {/* Bottom Tabs */}
              <div className="h-9 shrink-0 border-b border-[var(--border-subtle)] px-3 flex items-center justify-between bg-[var(--surface-sunken)]/60">
                <div className="flex items-center space-x-1 text-xs">
                  <button
                    onClick={() => setBottomTab('testcases')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                      bottomTab === 'testcases'
                        ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    <span>Test Cases ({testCases.length})</span>
                  </button>
                  <button
                    onClick={() => setBottomTab('console')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                      bottomTab === 'console'
                        ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <span>Run Output</span>
                    {runResults && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          runResults.verdict === 'Accepted' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setBottomTab('submission')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                      bottomTab === 'submission'
                        ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <span>Judging Result</span>
                    {submitResult && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          submitResult.verdict === 'Accepted' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                    )}
                  </button>
                </div>

                {/* Keyboard Shortcuts Hint */}
                <span className="hidden md:inline font-mono text-[10px] text-[var(--foreground-muted)]">
                  <kbd className="px-1 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-subtle)]">Ctrl+Enter</kbd> Run • <kbd className="px-1 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-subtle)]">Ctrl+Shift+Enter</kbd> Submit
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="flex-1 p-3 overflow-y-auto text-xs font-mono">
                {/* 1. TEST CASES TAB */}
                {bottomTab === 'testcases' && (
                  <div className="space-y-3">
                    {/* Test Case Selector Tabs */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                      {testCases.map((tc, idx) => (
                        <button
                          key={tc.id}
                          onClick={() => setActiveTestCaseIndex(idx)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 border ${
                            activeTestCaseIndex === idx
                              ? 'bg-[var(--surface-sunken)] border-[var(--brand-primary)] text-[var(--foreground)] font-bold'
                              : 'bg-[var(--surface-card)] border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                          }`}
                        >
                          <span>{tc.name}</span>
                          {tc.isCustom && (
                            <span
                              onClick={(e) => handleRemoveCustomTest(tc.id, e)}
                              className="hover:text-rose-500 cursor-pointer p-0.5"
                              title="Delete custom test case"
                            >
                              <Trash2 className="w-3 h-3" />
                            </span>
                          )}
                        </button>
                      ))}

                      {/* Add Custom Test Button */}
                      {testCases.length < 8 && (
                        <button
                          onClick={handleAddCustomTest}
                          className="px-2 py-1 rounded-md text-xs font-medium border border-dashed border-[var(--border-subtle)] text-[var(--brand-primary)] hover:bg-[var(--surface-sunken)] transition-colors inline-flex items-center space-x-1 shrink-0 cursor-pointer"
                          title="Add a custom test case"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Test</span>
                        </button>
                      )}
                    </div>

                    {/* Active Test Case Inputs */}
                    {activeTestCase && (
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-[var(--foreground-muted)] block mb-1">
                            Input:
                          </label>
                          <textarea
                            value={activeTestCase.input}
                            onChange={(e) => handleUpdateTestCase(activeTestCaseIndex, 'input', e.target.value)}
                            rows={3}
                            className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 font-mono text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
                            placeholder="e.g. nums = [2,7,11,15], target = 9"
                          />
                        </div>

                        {activeTestCase.isCustom && (
                          <div>
                            <label className="text-[10px] uppercase font-semibold text-[var(--foreground-muted)] block mb-1">
                              Expected Output (Optional):
                            </label>
                            <input
                              type="text"
                              value={activeTestCase.expectedOutput || ''}
                              onChange={(e) =>
                                handleUpdateTestCase(activeTestCaseIndex, 'expectedOutput', e.target.value)
                              }
                              className="w-full p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 font-mono text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--brand-primary)]"
                              placeholder="e.g. [0,1]"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. RUN CODE OUTPUT / CONSOLE TAB */}
                {bottomTab === 'console' && (
                  <div className="space-y-3">
                    {isRunning ? (
                      <div className="flex items-center space-x-2 text-[var(--foreground-muted)] py-6 justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-[var(--brand-primary)]" />
                        <span>Compiling and running against test cases on isolated judge...</span>
                      </div>
                    ) : runResults ? (
                      <div className="space-y-3">
                        {/* Overall verdict status */}
                        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                          <div className="flex items-center space-x-2">
                            {runResults.verdict === 'Accepted' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-500" />
                            )}
                            <span
                              className={`font-bold text-xs ${
                                runResults.verdict === 'Accepted'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }`}
                            >
                              {runResults.verdict}
                            </span>
                          </div>
                          <span className="text-[11px] text-[var(--foreground-muted)]">
                            {runResults.results.filter((r) => r.passed).length} of {runResults.results.length} Tests Passed
                          </span>
                        </div>

                        {/* Compilation Error Block if any */}
                        {runResults.compileOutput && (
                          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 space-y-1">
                            <span className="font-bold text-[11px] block">Compiler Output:</span>
                            <pre className="text-[11px] overflow-x-auto whitespace-pre-wrap">
                              {runResults.compileOutput}
                            </pre>
                          </div>
                        )}

                        {/* Individual test results */}
                        <div className="space-y-2">
                          {runResults.results.map((res, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg border ${
                                res.passed
                                  ? 'bg-emerald-500/5 border-emerald-500/20'
                                  : 'bg-rose-500/5 border-rose-500/20'
                              } space-y-1.5`}
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-[var(--foreground)]">{res.name}</span>
                                <div className="flex items-center space-x-2 text-[10px] text-[var(--foreground-muted)]">
                                  <span>{res.executionTimeMs} ms</span>
                                  <span>•</span>
                                  <span>{res.memoryKb} KB</span>
                                  <span
                                    className={`font-bold px-1.5 py-0.2 rounded ${
                                      res.passed ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                                    }`}
                                  >
                                    {res.verdict}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                                <div>
                                  <span className="text-[10px] text-[var(--foreground-muted)] block">Input:</span>
                                  <code className="text-[var(--foreground)] bg-[var(--surface-sunken)] px-2 py-0.5 rounded block overflow-x-auto">
                                    {res.input}
                                  </code>
                                </div>
                                <div>
                                  <span className="text-[10px] text-[var(--foreground-muted)] block">
                                    {res.expectedOutput ? 'Expected Output:' : 'Output:'}
                                  </span>
                                  <code className="text-emerald-600 dark:text-emerald-400 bg-[var(--surface-sunken)] px-2 py-0.5 rounded block overflow-x-auto">
                                    {res.expectedOutput || res.actualOutput || '[No output]'}
                                  </code>
                                </div>
                              </div>

                              {res.expectedOutput && !res.passed && (
                                <div className="text-[11px] pt-1">
                                  <span className="text-[10px] text-rose-500 block">Actual Output:</span>
                                  <code className="text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded block overflow-x-auto font-bold">
                                    {res.actualOutput || '[Empty Output]'}
                                  </code>
                                </div>
                              )}

                              {res.stderr && (
                                <div className="text-[11px] text-rose-500 pt-1">
                                  <span className="text-[10px] block">Stderr / Stack Trace:</span>
                                  <pre className="text-[10px] whitespace-pre-wrap">{res.stderr}</pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[var(--foreground-muted)] text-xs">
                        Click <span className="font-bold text-[var(--brand-primary)]">Run Code</span> to test against sample and custom test cases.
                      </div>
                    )}
                  </div>
                )}

                {/* 3. SUBMISSION TAB */}
                {bottomTab === 'submission' && (
                  <div className="space-y-3">
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2 text-[var(--foreground-muted)] py-6 justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-[var(--brand-primary)]" />
                        <span>Evaluating solution against official server-side judging suite...</span>
                      </div>
                    ) : submitResult ? (
                      <div className="space-y-3">
                        {/* Big Verdict Header */}
                        <div
                          className={`p-4 rounded-xl border flex items-center justify-between ${
                            submitResult.verdict === 'Accepted'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {submitResult.verdict === 'Accepted' ? (
                              <CheckCircle2 className="w-7 h-7 shrink-0 text-emerald-500" />
                            ) : (
                              <XCircle className="w-7 h-7 shrink-0 text-rose-500" />
                            )}
                            <div>
                              <h2 className="text-base font-black tracking-tight">{submitResult.verdict}</h2>
                              <p className="text-xs opacity-90 font-sans">
                                {submitResult.verdict === 'Accepted'
                                  ? 'All official judging test cases passed! Solution verified.'
                                  : submitResult.failedTestName
                                  ? `Failed at ${submitResult.failedTestName} (${submitResult.passedTests}/${submitResult.totalTests} tests passed)`
                                  : 'Solution encountered an evaluation error.'}
                              </p>
                            </div>
                          </div>

                          <div className="text-right font-mono text-xs space-y-0.5">
                            <div>
                              <span className="font-bold">{submitResult.passedTests}</span>
                              <span className="opacity-70"> / {submitResult.totalTests} Passed</span>
                            </div>
                            {submitResult.executionTimeMs !== undefined && (
                              <div className="text-[11px] opacity-80">{submitResult.executionTimeMs} ms</div>
                            )}
                          </div>
                        </div>

                        {/* Compiler error diagnostic */}
                        {submitResult.compileOutput && (
                          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 space-y-1">
                            <span className="font-bold text-[11px] block">Compiler Output:</span>
                            <pre className="text-[11px] overflow-x-auto whitespace-pre-wrap">
                              {submitResult.compileOutput}
                            </pre>
                          </div>
                        )}

                        {/* Error details if any */}
                        {submitResult.errorDetails && (
                          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
                            {submitResult.errorDetails}
                          </div>
                        )}

                        {/* Judging breakdown */}
                        <div className="space-y-1.5">
                          {submitResult.results.map((res, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                                res.passed
                                  ? 'bg-emerald-500/5 border-emerald-500/20 text-[var(--foreground)]'
                                  : 'bg-rose-500/5 border-rose-500/20 text-[var(--foreground)]'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {res.passed ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                ) : (
                                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                                )}
                                <span className="font-semibold">{res.name}</span>
                                {res.isHidden && (
                                  <span className="text-[10px] text-[var(--foreground-muted)] px-1.5 py-0.2 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                                    Official Judge Case
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-2 font-mono text-[11px]">
                                <span className="text-[var(--foreground-muted)]">{res.executionTimeMs} ms</span>
                                <span
                                  className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                                    res.passed ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                                  }`}
                                >
                                  {res.verdict}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[var(--foreground-muted)] text-xs">
                        Click <span className="font-bold text-[var(--brand-primary)]">Submit</span> to evaluate your solution against the official judging test suite.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Controls Bar */}
              <div className="h-12 shrink-0 border-t border-[var(--border-subtle)] px-3 sm:px-4 flex items-center justify-between bg-[var(--surface-sunken)]/60">
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-1.5 text-xs text-[var(--foreground-muted)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSolved}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setIsSolved(checked);
                        if (onSolvedChange) onSolvedChange(problem.id, checked);
                      }}
                      className="rounded border-[var(--border-subtle)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                    />
                    <span>Mark as Solved</span>
                  </label>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning || isSubmitting}
                    className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] disabled:opacity-50 text-xs font-semibold text-[var(--foreground)] transition-colors inline-flex items-center space-x-1.5 cursor-pointer shadow-xs"
                    title="Run code against sample and custom test cases (Ctrl+Enter)"
                  >
                    {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />}
                    <span>Run Code</span>
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={isRunning || isSubmitting}
                    className="px-4 py-1.5 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold transition-opacity inline-flex items-center space-x-1.5 cursor-pointer shadow-xs"
                    title="Submit solution to official judge (Ctrl+Shift+Enter)"
                  >
                    {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
