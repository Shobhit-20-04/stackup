'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { addMistake } from '@/lib/services/learning-intelligence/intelligence-engine';
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
  ChevronDown,
  ChevronUp,
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
  Loader2,
  BookOpen,
  BookMarked,
  GripHorizontal,
  GripVertical,
  AlignLeft,
  ArrowRight,
  Zap,
  Search,
  Keyboard,
  Layers,
  FileCode,
  Lock,
  LogIn,
  ShieldAlert,
} from 'lucide-react';
import type { editor } from 'monaco-editor';
import { loader } from '@monaco-editor/react';
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
import { getActiveTheme } from '@/components/ThemeToggle';
import { getFastCachedUser, getCurrentUser } from '@/lib/auth/session';

export type EditorLifecycleStatus =
  | 'initializing_editor'
  | 'loading_language'
  | 'ready'
  | 'executing_code'
  | 'loading_results'
  | 'init_failed'
  | 'exec_failed';

// Filename mapping for the tab header
const FILE_NAMES: Record<SupportedLanguage, string> = {
  python: 'solution.py',
  cpp: 'Solution.cpp',
  c: 'solution.c',
  java: 'Solution.java',
  javascript: 'solution.js',
};

// Pre-configure Monaco loader with secure CDN
if (typeof window !== 'undefined') {
  try {
    loader.config({
      paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
      },
    });
  } catch {
    // ignore
  }
}

// Dynamically import Monaco Editor to avoid SSR hydration issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-[var(--background)] text-slate-400 font-mono text-xs space-y-3 p-6 text-center">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-slate-700 border-t-[#044E62] animate-spin" />
        <Terminal className="w-4 h-4 text-[#38BDF8] absolute" />
      </div>
      <div className="space-y-1">
        <div className="font-semibold text-slate-200">Connecting to Code Workspace...</div>
        <div className="text-[11px] text-slate-400">Fetching editor components</div>
      </div>
    </div>
  ),
});

interface CodingWorkspaceProps {
  problemId: string;
  onClose: () => void;
  onProblemChange?: (problemId: string) => void;
  currentUser?: { id: string; email?: string | null; isDemo?: boolean } | null;
  onSolvedChange?: (problemId: string, isSolved: boolean) => void;
  isSolvedInitially?: boolean;
}

export default function CodingWorkspace({
  problemId,
  onClose,
  onProblemChange,
  currentUser: initialUser,
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

  // Selected language, font size, fullscreen
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('python');
  const [fontSize, setFontSize] = useState<number>(13);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Tab views
  const [leftTab, setLeftTab] = useState<'description' | 'editorial' | 'solutions' | 'submissions'>('description');
  const [bottomTab, setBottomTab] = useState<'testcases' | 'results' | 'console' | 'submission'>('testcases');
  const [mobileTab, setMobileTab] = useState<'problem' | 'editor' | 'results'>('editor');

  // Bottom Console collapsed state
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState<boolean>(false);

  // Quick Problem Jump Popover
  const [problemPickerOpen, setProblemPickerOpen] = useState<boolean>(false);
  const [problemSearchQuery, setProblemSearchQuery] = useState<string>('');
  const [problemFilterDifficulty, setProblemFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  // Shortcuts modal
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState<boolean>(false);

  // Auth gate state & modal
  const [asyncUser, setAsyncUser] = useState<{ id: string; email?: string | null; isDemo?: boolean } | null>(() => {
    if (initialUser !== undefined) return null;
    return getFastCachedUser();
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState(
    'Sign in to run your code, submit solutions, and track your DSA learning progress.'
  );

  useEffect(() => {
    if (initialUser !== undefined) return;
    let isCancelled = false;
    getCurrentUser().then((u) => {
      if (!isCancelled) setAsyncUser(u);
    });
    return () => {
      isCancelled = true;
    };
  }, [initialUser]);

  const user = initialUser !== undefined ? initialUser : asyncUser;
  const isAuthenticated = Boolean(
    user && !user.isDemo && user.id !== 'student-demo' && user.email !== 'guest@stackup.xyz'
  );

  // Global Theme Synchronization
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return getActiveTheme().isDark;
  });

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark?: boolean; themeId?: string }>;
      if (customEvent.detail && typeof customEvent.detail.isDark === 'boolean') {
        setIsDark(customEvent.detail.isDark);
      } else {
        setIsDark(getActiveTheme().isDark);
      }
    };

    window.addEventListener('stackup-theme-change', handleThemeChange);

    const observer = new MutationObserver(() => {
      setIsDark(getActiveTheme().isDark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => {
      window.removeEventListener('stackup-theme-change', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  // Mounted & Body Lock for Modal Portal
  const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Copy states
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInputId, setCopiedInputId] = useState<number | null>(null);

  // Active sub-case index for Test Cases tab and Run Output tab
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
  const [activeResultIndex, setActiveResultIndex] = useState(0);

  // Resizable pane dimensions (Desktop)
  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(44);
  const [bottomHeightPx, setBottomHeightPx] = useState<number>(260);
  const isDraggingHorizontal = useRef(false);
  const isDraggingVertical = useRef(false);

  // Monaco editor reference
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Helper to load code for problem + language
  const loadCodeForProblemAndLang = useCallback(
    (pId: string, lang: SupportedLanguage) => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(`stackup_code_${pId}_${lang}`);
        if (saved && saved.trim()) return saved;
      }
      return getStarterCode(problem, lang);
    },
    [problem]
  );

  // Code state and ref
  const [code, setCode] = useState<string>(() => loadCodeForProblemAndLang(problem.id, 'python'));
  const codeRef = useRef<string>(code);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sample + custom test cases
  const [testCases, setTestCases] = useState<TestCaseItem[]>(() => getSampleTestCases(problem.id));

  // Execution states & metrics
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionLatencyMs, setExecutionLatencyMs] = useState<number | null>(null);
  const [runResults, setRunResults] = useState<RunCodeResponse | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);
  const [mistakeLoggedForSubmit, setMistakeLoggedForSubmit] = useState(false);

  const handleLogSubmissionMistake = (result: SubmitResponse) => {
    let mistakeType = 'wrong_answer';
    const v = result.verdict.toLowerCase();
    if (v.includes('time limit')) mistakeType = 'time_limit_exceeded';
    else if (v.includes('runtime') || v.includes('error')) mistakeType = 'runtime_error';
    else if (v.includes('memory')) mistakeType = 'memory_limit_exceeded';
    else if (v.includes('wrong')) mistakeType = 'wrong_answer';

    addMistake({
      userId: initialUser?.id || 'student',
      module: 'dsa',
      resourceId: problem.id,
      resourceTitle: problem.title,
      category: problem.pattern_tag || 'Algorithms',
      mistakeType,
      userNotes: `Submission returned ${result.verdict}. ${result.failedTestName ? 'Failed on test: ' + result.failedTestName : ''}`,
      keyTakeaway: `Review optimal time and space complexity for ${problem.pattern_tag}. Check boundary conditions and edge cases.`,
    });
    setMistakeLoggedForSubmit(true);
  };

  // Solved state
  const [isSolved, setIsSolved] = useState(isSolvedInitially);

  // Editor Lifecycle State Machine
  const [editorStatus, setEditorStatus] = useState<EditorLifecycleStatus>('initializing_editor');
  const [initError, setInitError] = useState<string | null>(null);
  const [useFallbackEditor, setUseFallbackEditor] = useState<boolean>(false);
  const [isMonacoReady, setIsMonacoReady] = useState<boolean>(false);

  // Fallback Editor Textarea & Gutter refs & cursor tracking
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const updateCursorPosition = (textarea: HTMLTextAreaElement) => {
    const text = textarea.value.substring(0, textarea.selectionStart);
    const lines = text.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1,
    });
  };

  // Filtered problem list for the Quick-Jump Popover
  const filteredJumpProblems = useMemo(() => {
    let list = DSA_PROBLEMS;
    if (problemFilterDifficulty !== 'All') {
      list = list.filter((p) => p.difficulty === problemFilterDifficulty);
    }
    if (problemSearchQuery.trim()) {
      const q = problemSearchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.pattern_tag.toLowerCase().includes(q)
      );
    }
    return list;
  }, [problemSearchQuery, problemFilterDifficulty]);

  // Adjust state during render when problem or language changes (React state-from-props pattern)
  const [prevProblemId, setPrevProblemId] = useState(problem.id);
  const [prevLang, setPrevLang] = useState(selectedLanguage);

  if (prevProblemId !== problem.id || prevLang !== selectedLanguage) {
    setPrevProblemId(problem.id);
    setPrevLang(selectedLanguage);
    const freshCode = loadCodeForProblemAndLang(problem.id, selectedLanguage);
    setCode(freshCode);
    if (prevProblemId !== problem.id) {
      setTestCases(getSampleTestCases(problem.id));
      setActiveTestCaseIndex(0);
      setActiveResultIndex(0);
      setRunResults(null);
      setSubmitResult(null);
    setMistakeLoggedForSubmit(false);
      setExecutionLatencyMs(null);
      setIsSolved(isSolvedInitially);
      setProblemPickerOpen(false);
    }
  }

  // Keep codeRef in sync with code state outside render
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  // Fallback timer: if Monaco fails to mount within 6 seconds, switch to fallback
  useEffect(() => {
    if (isMonacoReady || useFallbackEditor) return;

    const timer = setTimeout(() => {
      if (!isMonacoReady) {
        setUseFallbackEditor(true);
        setEditorStatus('ready');
        setInitError('Monaco Editor script took longer than 6 seconds to load. Switched to high-performance lightweight editor.');
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [isMonacoReady, useFallbackEditor]);

  // Debounced code persistence to localStorage
  const handleCodeChange = useCallback(
    (newVal: string | undefined) => {
      const val = newVal ?? '';
      codeRef.current = val;
      setCode(val);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        try {
          localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, val);
        } catch {
          // ignore quota error
        }
      }, 500);
    },
    [problem.id, selectedLanguage]
  );

  // Code Reset handler
  const handleResetCode = () => {
    const starter = getStarterCode(problem, selectedLanguage);
    handleCodeChange(starter);
    if (editorRef.current) {
      editorRef.current.setValue(starter);
    }
  };

  // Code Format handler
  const handleFormatCode = () => {
    if (editorRef.current && isMonacoReady) {
      try {
        const action = editorRef.current.getAction('editor.action.formatDocument');
        if (action) {
          action.run();
        }
      } catch {
        // ignore
      }
    } else {
      // Lightweight formatting: trim line ends
      const formatted = code
        .split('\n')
        .map((l) => l.trimEnd())
        .join('\n');
      handleCodeChange(formatted);
    }
  };

  // Language Change handler
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setSelectedLanguage(newLang);
    const saved = loadCodeForProblemAndLang(problem.id, newLang);
    setCode(saved);
    codeRef.current = saved;
    if (editorRef.current && isMonacoReady) {
      editorRef.current.setValue(saved);
    }
  };

  // Tab key & indentation handler for lightweight fast editor textarea
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = textarea.value;

      if (e.shiftKey) {
        // Shift+Tab: Remove 4 spaces
        const lineStart = currentValue.lastIndexOf('\n', start - 1) + 1;
        if (currentValue.slice(lineStart, lineStart + 4) === '    ') {
          const updated = currentValue.slice(0, lineStart) + currentValue.slice(lineStart + 4);
          handleCodeChange(updated);
          setTimeout(() => {
            textarea.selectionStart = Math.max(lineStart, start - 4);
            textarea.selectionEnd = Math.max(lineStart, end - 4);
            updateCursorPosition(textarea);
          }, 0);
        }
      } else {
        // Tab: Insert 4 spaces
        const updated = currentValue.substring(0, start) + '    ' + currentValue.substring(end);
        handleCodeChange(updated);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
          updateCursorPosition(textarea);
        }, 0);
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        submitRef.current();
      } else {
        runCodeRef.current();
      }
    }
  };

  // Add custom test case
  const handleAddTestCase = () => {
    const customCount = testCases.filter((tc) => tc.isCustom).length + 1;
    const newCase: TestCaseItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${customCount}`,
      input: '',
      expectedOutput: '',
      isCustom: true,
    };
    setTestCases((prev) => [...prev, newCase]);
    setActiveTestCaseIndex(testCases.length);
  };

  // Remove test case
  const handleRemoveTestCase = (indexToRemove: number) => {
    if (testCases.length <= 1) return;
    setTestCases((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (activeTestCaseIndex >= indexToRemove && activeTestCaseIndex > 0) {
      setActiveTestCaseIndex((prev) => prev - 1);
    }
  };

  // Update test case input or expectedOutput
  const handleUpdateTestCase = (index: number, field: 'input' | 'expectedOutput', val: string) => {
    setTestCases((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: val };
      }
      return updated;
    });
  };

  // Copy code handler
  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(codeRef.current);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Copy example input to clipboard and optionally populate custom test case
  const handleCopyExampleInput = (inputStr: string, exIdx: number) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(inputStr);
    }
    setCopiedInputId(exIdx);
    setTimeout(() => setCopiedInputId(null), 1500);

    if (testCases[activeTestCaseIndex]?.isCustom) {
      handleUpdateTestCase(activeTestCaseIndex, 'input', inputStr);
    }
  };

  // Execute RUN CODE (runs all sample + custom test cases concurrently via Judge0 Batch)
  const handleRunCode = useCallback(async () => {
    if (isRunning || isSubmitting) return;

    // Authentication Gate: Require user account
    if (!isAuthenticated) {
      setAuthModalMessage('Sign in to run your code, execute test cases, and evaluate algorithms.');
      setAuthModalOpen(true);
      return;
    }

    setIsRunning(true);
    setExecutionLatencyMs(null);
    setEditorStatus('executing_code');
    setBottomTab('results');
    setMobileTab('results');
    setIsConsoleCollapsed(false);

    const startTime = Date.now();
    const sourceCodeToRun = codeRef.current;

    try {
      const res = await fetch('/api/dsa/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          language: selectedLanguage,
          sourceCode: sourceCodeToRun,
          testCases: testCases.map((tc) => ({
            id: tc.id,
            name: tc.name,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isCustom: tc.isCustom,
          })),
        }),
      });

      // Handle session expiration
      if (res.status === 401) {
        setAuthModalMessage('Your session has expired. Please sign in again to continue coding.');
        setAuthModalOpen(true);
        setEditorStatus('exec_failed');
        setRunResults({
          success: false,
          verdict: 'Internal Error',
          compileOutput: null,
          results: [],
          error: 'Authentication required. Please sign in to execute code.',
        });
        return;
      }

      setEditorStatus('loading_results');
      const data: RunCodeResponse = await res.json();
      setExecutionLatencyMs(Date.now() - startTime);
      setRunResults(data);
      setActiveResultIndex(0);
      setEditorStatus('ready');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Execution failed';
      setEditorStatus('exec_failed');
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
  }, [isRunning, isSubmitting, isAuthenticated, problem.id, selectedLanguage, testCases]);

  // SUBMIT SOLUTION (evaluates against server-side official judging suite via Judge0 Batch)
  const handleSubmit = useCallback(async () => {
    if (isRunning || isSubmitting) return;

    // Authentication Gate: Require user account
    if (!isAuthenticated) {
      setAuthModalMessage('Sign in to submit your solution for evaluation against the official judging test suite.');
      setAuthModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setExecutionLatencyMs(null);
    setEditorStatus('executing_code');
    setBottomTab('submission');
    setMobileTab('results');
    setIsConsoleCollapsed(false);

    const startTime = Date.now();
    const sourceCodeToSubmit = codeRef.current;

    try {
      const res = await fetch('/api/dsa/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          language: selectedLanguage,
          sourceCode: sourceCodeToSubmit,
        }),
      });

      // Handle session expiration
      if (res.status === 401) {
        setAuthModalMessage('Your session has expired. Please sign in again to submit solutions.');
        setAuthModalOpen(true);
        setEditorStatus('exec_failed');
        setSubmitResult({
          success: false,
          verdict: 'Internal Error',
          totalTests: 0,
          passedTests: 0,
          errorDetails: 'Authentication required. Please sign in to submit solutions.',
          results: [],
          problemId: problem.id,
        });
        return;
      }

      setEditorStatus('loading_results');
      const data: SubmitResponse = await res.json();
      setExecutionLatencyMs(Date.now() - startTime);
      setSubmitResult(data);

      if (data.verdict === 'Accepted') {
        setIsSolved(true);
        if (onSolvedChange) {
          onSolvedChange(problem.id, true);
        }
      }
      setEditorStatus('ready');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setEditorStatus('exec_failed');
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
  }, [isRunning, isSubmitting, isAuthenticated, problem.id, selectedLanguage, onSolvedChange]);

  // Refs to stabilize shortcut handlers without recreating listeners
  const runCodeRef = useRef(handleRunCode);
  const submitRef = useRef(handleSubmit);
  useEffect(() => {
    runCodeRef.current = handleRunCode;
    submitRef.current = handleSubmit;
  }, [handleRunCode, handleSubmit]);

  // Monaco Editor did mount callback
  const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    editorRef.current = editorInstance;
    setIsMonacoReady(true);
    setEditorStatus('ready');
    setInitError(null);

    // Apply active theme immediately
    try {
      const monacoGlobal = (window as unknown as { monaco?: { editor?: { setTheme: (t: string) => void } } }).monaco;
      if (monacoGlobal?.editor?.setTheme) {
        monacoGlobal.editor.setTheme(isDark ? 'vs-dark' : 'vs');
      }
    } catch {
      // ignore
    }

    // Synchronize editor buffer with codeRef
    if (codeRef.current && editorInstance.getValue() !== codeRef.current) {
      editorInstance.setValue(codeRef.current);
    }

    // Register Ctrl+Enter to Run
    editorInstance.addCommand(2048 /* KeyMod.CtrlCmd */ | 3 /* KeyCode.Enter */, () => {
      runCodeRef.current();
    });

    // Register Ctrl+Shift+Enter to Submit
    editorInstance.addCommand(2048 /* KeyMod.CtrlCmd */ | 1024 /* KeyMod.Shift */ | 3 /* KeyCode.Enter */, () => {
      submitRef.current();
    });
  };

  // Update Monaco theme on theme switch without destroying editor instance
  useEffect(() => {
    if (editorRef.current && typeof window !== 'undefined') {
      const targetTheme = isDark ? 'vs-dark' : 'vs';
      try {
        const monacoGlobal = (window as unknown as { monaco?: { editor?: { setTheme: (t: string) => void } } }).monaco;
        if (monacoGlobal?.editor?.setTheme) {
          monacoGlobal.editor.setTheme(targetTheme);
        }
      } catch {
        // ignore
      }
    }
  }, [isDark]);

  // Synchronize Monaco editor content when problem or language changes
  useEffect(() => {
    if (editorRef.current && isMonacoReady) {
      const freshCode = loadCodeForProblemAndLang(problem.id, selectedLanguage);
      if (editorRef.current.getValue() !== freshCode) {
        editorRef.current.setValue(freshCode);
      }
    }
  }, [problem.id, selectedLanguage, loadCodeForProblemAndLang, isMonacoReady]);

  // Update Monaco language model when selectedLanguage changes
  useEffect(() => {
    if (!editorRef.current || !isMonacoReady) return;
    try {
      const monacoGlobal = (window as unknown as { monaco?: typeof import('monaco-editor') }).monaco;
      if (monacoGlobal) {
        const model = editorRef.current.getModel();
        if (model) {
          monacoGlobal.editor.setModelLanguage(
            model,
            SUPPORTED_LANGUAGES[selectedLanguage].monacoLanguage
          );
        }
      }
    } catch {
      // ignore
    }
  }, [selectedLanguage, isMonacoReady]);

  // Window-level Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (authModalOpen) {
          setAuthModalOpen(false);
        } else if (shortcutsModalOpen) {
          setShortcutsModalOpen(false);
        } else if (problemPickerOpen) {
          setProblemPickerOpen(false);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          submitRef.current();
        } else {
          runCodeRef.current();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onClose, shortcutsModalOpen, problemPickerOpen, authModalOpen]);

  // Split-pane Resizing Mouse Listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingHorizontal.current) {
        const totalWidth = window.innerWidth;
        const newPercent = Math.min(65, Math.max(25, (e.clientX / totalWidth) * 100));
        setLeftWidthPercent(Math.round(newPercent));
      }
      if (isDraggingVertical.current) {
        const windowHeight = window.innerHeight;
        const newHeight = Math.min(windowHeight * 0.75, Math.max(140, windowHeight - e.clientY));
        setBottomHeightPx(Math.round(newHeight));
      }
    };

    const handleMouseUp = () => {
      isDraggingHorizontal.current = false;
      isDraggingVertical.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const activeTestCase = testCases[activeTestCaseIndex] || testCases[0];
  const activeRunResult = runResults?.results?.[activeResultIndex] || runResults?.results?.[0];
  const returnPath = `/dsa?problem=${problem.id}`;

  if (!isMounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] w-screen h-screen flex flex-col font-sans select-none overflow-hidden transition-colors ${
        isDark ? 'bg-[#0A0E17] text-slate-100' : 'bg-[#F8FAFC] text-slate-800'
      }`}
    >
      {/* =========================================================================
          1. TOP COMMAND MASTHEAD (Command Deck inspired by LeetCode / VS Code)
         ========================================================================= */}
      <header
        className={`h-12 shrink-0 border-b px-3 sm:px-4 flex items-center justify-between gap-3 relative z-30 transition-colors ${
          isDark ? 'border-[#1A2333] bg-[#0E1422]' : 'border-slate-200 bg-white shadow-xs'
        }`}
      >
        {/* Left Section: Branding, Prev/Next & Quick Problem Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
          <div className="flex items-center space-x-1.5 shrink-0">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#044E62] to-[#0A7B96] flex items-center justify-center text-white shadow-xs">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className={`font-bold text-xs tracking-tight hidden sm:inline ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              Stack<span className="text-[#38BDF8]">Up</span>
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded hidden md:inline border ${
                isDark ? 'bg-slate-800 text-slate-400 border-slate-700/60' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              STUDIO
            </span>
          </div>

          <div className={`h-4 w-px hidden sm:block mx-0.5 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

          {/* Prev / Next Problem Buttons */}
          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              onClick={() => prevProblem && onProblemChange && onProblemChange(prevProblem.id)}
              disabled={!prevProblem}
              className={`p-1 rounded disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer ${
                isDark
                  ? 'hover:bg-[#1A2438] text-slate-400 hover:text-slate-100'
                  : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
              title={prevProblem ? `Previous Problem: ${prevProblem.title}` : 'First problem'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nextProblem && onProblemChange && onProblemChange(nextProblem.id)}
              disabled={!nextProblem}
              className={`p-1 rounded disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer ${
                isDark
                  ? 'hover:bg-[#1A2438] text-slate-400 hover:text-slate-100'
                  : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
              title={nextProblem ? `Next Problem: ${nextProblem.title}` : 'Last problem'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Problem Quick-Jump Popover Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProblemPickerOpen((prev) => !prev)}
              className={`h-7 px-2.5 rounded-md border text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer max-w-[200px] sm:max-w-[260px] truncate ${
                isDark
                  ? 'bg-[#131B2E] border-[#1E293B] text-slate-200 hover:border-slate-600'
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
              title="Click to search or switch problem"
            >
              <span className="font-mono text-[11px] text-[#38BDF8] shrink-0">
                #{problem.id.replace('dsa-', '')}
              </span>
              <span className="truncate">{problem.title}</span>
              <span
                className={`text-[9px] px-1 py-0.2 rounded uppercase font-bold shrink-0 ${
                  problem.difficulty === 'Easy'
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : problem.difficulty === 'Medium'
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-rose-400 bg-rose-500/10'
                }`}
              >
                {problem.difficulty}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {/* Quick-Jump Dropdown Menu */}
            {problemPickerOpen && (
              <div
                className={`absolute left-0 top-9 w-80 sm:w-96 rounded-xl border shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                  isDark
                    ? 'bg-[#0E1422] border-[#1E293B] text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 pb-2 border-b border-[var(--border-subtle)] mb-2 px-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={problemSearchQuery}
                    onChange={(e) => setProblemSearchQuery(e.target.value)}
                    placeholder="Search problem title, pattern..."
                    className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
                    autoFocus
                  />
                  {problemSearchQuery && (
                    <button
                      onClick={() => setProblemSearchQuery('')}
                      className="text-slate-400 hover:text-slate-200 text-[10px]"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Difficulty Filters in Popover */}
                <div className="flex items-center space-x-1 mb-2 px-1">
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setProblemFilterDifficulty(diff)}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-colors ${
                        problemFilterDifficulty === diff
                          ? 'bg-[#044E62] text-white font-semibold'
                          : isDark
                          ? 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                {/* List of Problems */}
                <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredJumpProblems.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No matching problems found
                    </div>
                  ) : (
                    filteredJumpProblems.map((p) => {
                      const isSelected = p.id === problem.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            if (onProblemChange) onProblemChange(p.id);
                            setProblemPickerOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#044E62]/20 border border-[#044E62] text-white font-semibold'
                              : isDark
                              ? 'hover:bg-[#151D30] text-slate-300'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span className="font-mono text-[10px] text-slate-400 shrink-0">
                              #{p.id.replace('dsa-', '')}
                            </span>
                            <span className="truncate">{p.title}</span>
                          </div>
                          <span
                            className={`text-[9px] px-1 py-0.2 rounded uppercase font-bold shrink-0 ml-2 ${
                              p.difficulty === 'Easy'
                                ? 'text-emerald-400'
                                : p.difficulty === 'Medium'
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {p.difficulty}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Solved Status Badge & Toggle */}
          <button
            onClick={() => {
              if (!isAuthenticated) {
                setAuthModalMessage('Sign in to track your solved problems and sync progress to your profile.');
                setAuthModalOpen(true);
                return;
              }
              const nextState = !isSolved;
              setIsSolved(nextState);
              if (onSolvedChange) onSolvedChange(problem.id, nextState);
            }}
            className={`h-7 px-2 rounded-md border text-[11px] font-medium flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 ${
              isSolved
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : isDark
                ? 'bg-[#131B2E] border-[#1E293B] text-slate-400 hover:text-slate-200'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title={isAuthenticated ? (isSolved ? 'Mark as Unsolved' : 'Mark as Solved') : 'Sign in to track progress'}
          >
            {isAuthenticated ? (
              <CheckCircle2 className={`w-3 h-3 ${isSolved ? 'text-emerald-400' : 'text-slate-400'}`} />
            ) : (
              <Lock className="w-3 h-3 text-slate-400" />
            )}
            <span className="hidden sm:inline">{isSolved ? 'Solved' : 'Unsolved'}</span>
          </button>
        </div>

        {/* Center Section: Primary Action Engine (Run Code & Submit CTAs) */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Run Code Action Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className={`px-3 sm:px-3.5 py-1.5 rounded-md font-semibold text-xs flex items-center space-x-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs border ${
              isDark
                ? 'bg-[#172133] hover:bg-[#202C44] text-slate-100 border-[#2B3B59]'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title={isAuthenticated ? 'Run code against sample and custom test cases (Ctrl+Enter)' : 'Sign in to run code'}
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            ) : !isAuthenticated ? (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            )}
            <span>Run</span>
            <kbd className={`hidden lg:inline-block font-mono text-[9px] px-1 py-0.5 rounded border ml-0.5 ${
              isDark ? 'text-slate-400 bg-slate-900/80 border-slate-700/60' : 'text-slate-500 bg-white border-slate-200'
            }`}>
              ⌘↵
            </kbd>
          </button>

          {/* Submit Action Button */}
          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="px-3.5 sm:px-4 py-1.5 rounded-md font-bold text-xs flex items-center space-x-1.5 transition-all bg-gradient-to-r from-[#044E62] to-[#087F8C] hover:from-[#055B72] hover:to-[#0A96A5] text-white border border-[#0A87A0]/40 shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
            title={isAuthenticated ? 'Submit solution to official judge (Ctrl+Shift+Enter)' : 'Sign in to submit solution'}
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : !isAuthenticated ? (
              <Lock className="w-3.5 h-3.5 text-white/80" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Submit</span>
            <kbd className="hidden lg:inline-block font-mono text-[9px] text-white/70 bg-black/20 px-1 py-0.5 rounded border border-white/20 ml-0.5">
              ⌘⇧↵
            </kbd>
          </button>

          {/* Real-time Status Indicator Pill */}
          <div
            className={`hidden md:flex items-center space-x-1.5 px-2 py-1 rounded-md text-[11px] font-mono border ${
              isRunning || isSubmitting
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                : editorStatus === 'ready'
                ? isDark
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : editorStatus === 'exec_failed'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : isDark
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isRunning || isSubmitting
                  ? 'bg-amber-400'
                  : editorStatus === 'ready'
                  ? 'bg-emerald-400'
                  : editorStatus === 'exec_failed'
                  ? 'bg-rose-400'
                  : 'bg-slate-400'
              }`}
            />
            <span>
              {isRunning
                ? 'Running Tests...'
                : isSubmitting
                ? 'Evaluating Judge...'
                : !isAuthenticated
                ? 'Sign In Required'
                : runResults
                ? runResults.verdict
                : submitResult
                ? submitResult.verdict
                : 'Ready'}
            </span>
          </div>
        </div>

        {/* Right Section: Environment Controls & Actions */}
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          {/* Custom Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
            className={`h-7 px-2 rounded-md border text-xs font-semibold outline-none cursor-pointer ${
              isDark
                ? 'bg-[#131B2E] border-[#1E293B] text-slate-200 hover:border-slate-500'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300'
            }`}
            title="Switch Language"
          >
            {(Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).map((lang) => (
              <option key={lang} value={lang} className={isDark ? 'bg-[#0E1422] text-slate-200' : 'bg-white text-slate-800'}>
                {SUPPORTED_LANGUAGES[lang].name}
              </option>
            ))}
          </select>

          {/* Code Reset Button */}
          <button
            onClick={handleResetCode}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-[#1A2438] text-slate-400 hover:text-slate-100'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
            title="Reset to problem starter template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Code Format Button */}
          <button
            onClick={handleFormatCode}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-[#1A2438] text-slate-400 hover:text-slate-100'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
            title="Format code (Shift+Alt+F)"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>

          {/* Keyboard Shortcuts Dialog Trigger */}
          <button
            onClick={() => setShortcutsModalOpen(true)}
            className={`p-1.5 rounded transition-colors cursor-pointer hidden sm:block ${
              isDark
                ? 'hover:bg-[#1A2438] text-slate-400 hover:text-slate-100'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className={`p-1.5 rounded transition-colors cursor-pointer hidden md:block ${
              isDark
                ? 'hover:bg-[#1A2438] text-slate-400 hover:text-slate-100'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Close Workspace Button */}
          <button
            onClick={onClose}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-rose-500/20 text-slate-400 hover:text-rose-400'
                : 'hover:bg-rose-50 text-slate-500 hover:text-rose-600'
            }`}
            title="Close Workspace (Escape)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          MOBILE VIEW SELECTOR (Visible only on screens < 1024px)
         ========================================================================= */}
      <div
        className={`lg:hidden flex items-center justify-around border-b text-xs font-semibold px-2 py-1 shrink-0 ${
          isDark ? 'border-[#1A2333] bg-[#0A0E17]' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <button
          onClick={() => setMobileTab('problem')}
          className={`py-1 px-3 rounded-md transition-colors ${
            mobileTab === 'problem'
              ? 'bg-[#044E62] text-white'
              : isDark
              ? 'text-slate-400'
              : 'text-slate-600'
          }`}
        >
          Problem Statement
        </button>
        <button
          onClick={() => setMobileTab('editor')}
          className={`py-1 px-3 rounded-md transition-colors ${
            mobileTab === 'editor'
              ? 'bg-[#044E62] text-white'
              : isDark
              ? 'text-slate-400'
              : 'text-slate-600'
          }`}
        >
          Code Editor
        </button>
        <button
          onClick={() => setMobileTab('results')}
          className={`py-1 px-3 rounded-md transition-colors ${
            mobileTab === 'results'
              ? 'bg-[#044E62] text-white'
              : isDark
              ? 'text-slate-400'
              : 'text-slate-600'
          }`}
        >
          Execution Output
        </button>
      </div>

      {/* =========================================================================
          WORKSPACE CORE BODY (Desktop Split View / Mobile Tab Switcher)
         ========================================================================= */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {/* =======================================================================
            LEFT COLUMN: PROBLEM SPECIFICATION PANEL
           ======================================================================= */}
        <div
          style={{ width: `${leftWidthPercent}%` }}
          className={`h-full flex flex-col border-r overflow-hidden select-text transition-colors ${
            isDark ? 'border-[#1A2333] bg-[#0A0E17]' : 'border-slate-200 bg-white'
          } ${mobileTab !== 'problem' ? 'hidden lg:flex' : 'flex w-full'}`}
        >
          {/* Problem Panel Navigation Tabs */}
          <div
            className={`h-9 shrink-0 border-b flex items-center justify-between px-3 text-xs font-medium ${
              isDark ? 'border-[#1A2333] bg-[#0E1422]' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-1 h-full">
              {[
                { id: 'description', label: 'Description', icon: FileText },
                { id: 'editorial', label: 'Approach', icon: Sparkles },
                { id: 'solutions', label: 'Solutions', icon: BookOpen },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = leftTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setLeftTab(tab.id as typeof leftTab)}
                    className={`h-full px-2.5 flex items-center space-x-1.5 border-b-2 text-[11px] transition-colors cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'border-[#38BDF8] text-[#38BDF8] bg-[#121A2C]'
                          : 'border-[#044E62] text-[#044E62] font-bold bg-white'
                        : isDark
                        ? 'border-transparent text-slate-400 hover:text-slate-200'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* External Links: LeetCode & Striver Sheet */}
            <div className="flex items-center space-x-2 text-[11px]">
              {problem.leetcode_url && (
                <a
                  href={problem.leetcode_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 flex items-center space-x-0.5"
                  title="Open on LeetCode"
                >
                  <span>LeetCode</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              {problem.striver_url && (
                <a
                  href={problem.striver_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-rose-400 flex items-center space-x-0.5"
                  title="Open on Striver Sheet"
                >
                  <span>Striver</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>

          {/* Left Panel Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar text-xs leading-relaxed">
            {leftTab === 'description' && (
              <div className="space-y-4">
                {/* Problem Header: Number, Title, Difficulty Pill */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h1 className={`text-base sm:text-lg font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      #{problem.id.replace('dsa-', '')}. {problem.title}
                    </h1>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                        problem.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : problem.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  {/* Pattern tag & Companies */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md border font-mono ${
                        isDark ? 'bg-sky-500/10 border-sky-500/20 text-sky-400' : 'bg-sky-50 border-sky-200 text-sky-700 font-semibold'
                      }`}
                    >
                      {problem.pattern_tag}
                    </span>
                    {problem.companies?.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          isDark ? 'bg-slate-800 border-slate-700/60 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Markdown Description */}
                <div
                  className={`p-3.5 rounded-xl border leading-relaxed ${
                    isDark ? 'bg-[#0E1422] border-[#1A2333] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <p className="whitespace-pre-line text-[12px]">{problem.description}</p>
                </div>

                {/* Example Test Cases with Copy Input */}
                {problem.examples?.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                      Examples
                    </div>
                    {problem.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border space-y-2 relative group ${
                          isDark ? 'bg-[#121A2C] border-[#1E293B]' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-sky-400">
                            Example {idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyExampleInput(ex.input, idx)}
                            className={`px-2 py-0.5 rounded text-[10px] flex items-center space-x-1 border transition-colors cursor-pointer ${
                              copiedInputId === idx
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : isDark
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                            }`}
                            title="Copy input string to clipboard and populate custom case"
                          >
                            {copiedInputId === idx ? (
                              <>
                                <Check className="w-2.5 h-2.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span>Copy Input</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Formatted Input Block */}
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                            Input:
                          </span>
                          <div
                            className={`p-2 rounded-lg font-mono text-[11px] border whitespace-pre-wrap ${
                              isDark ? 'bg-[#080C14] border-[#1A2333] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          >
                            {ex.input}
                          </div>
                        </div>

                        {/* Formatted Output Block */}
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                            Output:
                          </span>
                          <div
                            className={`p-2 rounded-lg font-mono text-[11px] border whitespace-pre-wrap ${
                              isDark
                                ? 'bg-[#0D1524] border-emerald-900/40 text-emerald-400'
                                : 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                            }`}
                          >
                            {ex.output}
                          </div>
                        </div>

                        {/* Explanation */}
                        {ex.explanation && (
                          <div className="text-[11px] text-slate-400 pt-1">
                            <span className="font-semibold text-slate-300">Explanation:</span>{' '}
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints Box */}
                {problem.constraints?.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                      Constraints
                    </div>
                    <div
                      className={`p-3 rounded-xl border space-y-1.5 font-mono text-[11px] ${
                        isDark ? 'bg-[#0E1422] border-[#1A2333] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {problem.constraints.map((c, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span className="text-teal-400 shrink-0 font-bold">&bull;</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Approach & Editorial Tab */}
            {leftTab === 'editorial' && (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    isDark ? 'bg-[#0E1422] border-[#1A2333]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-teal-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Recommended Interview Approach</span>
                  </div>
                  <p className="whitespace-pre-line text-[12px] leading-relaxed text-slate-300">
                    {problem.approach}
                  </p>
                </div>

                {/* Complexity Analysis Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`p-3 rounded-xl border ${
                      isDark ? 'bg-[#121A2C] border-[#1E293B]' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 text-sky-400 font-mono text-[11px] mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Time Complexity</span>
                    </div>
                    <div className="font-mono font-bold text-xs">{problem.timeComplexity}</div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border ${
                      isDark ? 'bg-[#121A2C] border-[#1E293B]' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-[11px] mb-1">
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Space Complexity</span>
                    </div>
                    <div className="font-mono font-bold text-xs">{problem.spaceComplexity}</div>
                  </div>
                </div>

                {/* Video Explanation Link if available */}
                {problem.youtube_url && (
                  <a
                    href={problem.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span className="font-semibold">Watch Video Solution Breakdown</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Official Solutions Tab */}
            {leftTab === 'solutions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px] font-mono">
                    Model Solution ({selectedLanguage.toUpperCase()})
                  </span>
                  <button
                    onClick={() => {
                      const modelSol = problem.solutions?.[selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : selectedLanguage === 'javascript' ? 'typescript' : 'python'];
                      if (modelSol) handleCodeChange(modelSol);
                    }}
                    className="text-[10px] text-sky-400 hover:underline cursor-pointer"
                  >
                    Load into Editor
                  </button>
                </div>
                <pre
                  className={`p-3.5 rounded-xl border font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed ${
                    isDark ? 'bg-[#080C14] border-[#1A2333] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {problem.solutions?.[
                    selectedLanguage === 'cpp'
                      ? 'cpp'
                      : selectedLanguage === 'java'
                      ? 'java'
                      : selectedLanguage === 'javascript'
                      ? 'typescript'
                      : 'python'
                  ] || '// Solution not yet available for this language'}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* =======================================================================
            DESKTOP HORIZONTAL RESIZE DIVIDER (Split between Problem & Editor)
           ======================================================================= */}
        <div
          onMouseDown={() => {
            isDraggingHorizontal.current = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
          }}
          onDoubleClick={() => setLeftWidthPercent(44)}
          className={`w-1.5 shrink-0 hidden lg:flex items-center justify-center transition-colors cursor-col-resize ${
            isDark ? 'bg-[#101726] hover:bg-[#38BDF8]' : 'bg-slate-200 hover:bg-[#044E62]'
          }`}
          title="Drag to resize panes (double-click to reset)"
        >
          <GripVertical className="w-2.5 h-2.5 text-slate-500 opacity-60" />
        </div>

        {/* =======================================================================
            RIGHT COLUMN: CODE CANVAS & TEST BENCH
           ======================================================================= */}
        <div
          className={`flex-1 h-full flex flex-col overflow-hidden min-w-0 ${
            mobileTab === 'problem' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Editor Header Bar (VS Code styled file tabs & controls) */}
          <div
            className={`h-9 shrink-0 border-b flex items-center justify-between px-3 text-xs ${
              isDark ? 'border-[#1A2333] bg-[#0E1422]' : 'border-slate-200 bg-slate-100/90'
            }`}
          >
            {/* Active File Tab */}
            <div className="flex items-center space-x-1 h-full">
              <div
                className={`h-full px-3 flex items-center space-x-1.5 border-r border-t-2 text-[11px] font-mono ${
                  isDark
                    ? 'bg-[#0A0E17] border-r-[#1A2333] border-t-[#38BDF8] text-[#38BDF8]'
                    : 'bg-white border-r-slate-200 border-t-[#044E62] text-[#044E62] font-bold shadow-xs'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{FILE_NAMES[selectedLanguage]}</span>
              </div>
            </div>

            {/* Right Editor Controls: Font Size, Mode Toggle, Copy */}
            <div className="flex items-center space-x-2">
              {/* Font Size Selector */}
              <div className="flex items-center space-x-1 text-[11px] text-slate-400">
                <span className="hidden sm:inline">Font:</span>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className={`h-6 px-1 rounded border text-[11px] outline-none cursor-pointer ${
                    isDark
                      ? 'bg-[#131B2E] border-[#1E293B] text-slate-300'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <option value={12}>12px</option>
                  <option value={13}>13px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                </select>
              </div>

              {/* Fast Mode Toggle */}
              <button
                type="button"
                onClick={() => {
                  setUseFallbackEditor((prev) => !prev);
                  setInitError(null);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border flex items-center space-x-1 transition-colors cursor-pointer ${
                  useFallbackEditor
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : isDark
                    ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                title="Toggle between Monaco IDE and lightweight fast editor"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Fast Mode</span>
              </button>

              {/* Copy Code */}
              <button
                type="button"
                onClick={handleCopyCode}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Copy current code to clipboard"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* =====================================================================
              PRIMARY CODE EDITOR (Monaco / Lightweight Fast / Locked Gate)
             ===================================================================== */}
          <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
            {!isAuthenticated ? (
              /* Locked Solving State for Logged-Out Visitors */
              <div
                className={`flex-1 w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center select-none ${
                  isDark ? 'bg-[#0B0F17] text-slate-200' : 'bg-slate-50 text-slate-800'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm border ${
                    isDark
                      ? 'bg-[#121A2C] border-[#1E293B] text-[#38BDF8]'
                      : 'bg-white border-slate-200 text-[#044E62]'
                  }`}
                >
                  <Lock className="w-7 h-7" />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  Sign in to start solving
                </h2>

                <p
                  className={`text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Access the coding workspace, run your solutions and track your DSA progress with a StackUp account.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs">
                  <a
                    href={`/login?redirect=${encodeURIComponent(returnPath)}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#044E62] to-[#0D08CB] hover:from-[#033c4b] hover:to-[#0a06a3] text-white font-semibold text-xs transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In to Code</span>
                  </a>

                  <a
                    href={`/login?mode=signup&redirect=${encodeURIComponent(returnPath)}`}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-lg border font-semibold text-xs transition-colors flex items-center justify-center ${
                      isDark
                        ? 'border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-xs'
                    }`}
                  >
                    <span>Create Free Account</span>
                  </a>
                </div>

                <div
                  className={`mt-8 pt-6 border-t max-w-sm text-[11px] leading-relaxed ${
                    isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <span>
                    Looking to study first? Problem statements, constraint bounds, and editorial approaches remain completely open for public learning.
                  </span>
                </div>
              </div>
            ) : useFallbackEditor ? (
              /* Resilient Lightweight Fast Editor */
              <div
                className={`flex-1 w-full h-full min-h-[180px] flex flex-col font-mono text-xs overflow-hidden relative ${
                  isDark ? 'bg-[#0B0F17] text-slate-100' : 'bg-white text-slate-900'
                }`}
              >
                <div className="px-3 py-1 bg-amber-500/10 border-b border-amber-500/20 text-amber-400 text-[11px] flex items-center justify-between shrink-0">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    <span className="truncate">
                      Fast Lightweight Editor Active &bull; Zero latency typing, execution and submission enabled.
                      {initError ? ` (${initError})` : ''}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUseFallbackEditor(false);
                      setEditorStatus('initializing_editor');
                      setInitError(null);
                    }}
                    className="underline hover:text-amber-200 font-semibold cursor-pointer text-[10px] shrink-0 ml-2"
                  >
                    Switch to Monaco
                  </button>
                </div>

                <div className="flex-1 flex min-h-0 relative overflow-hidden">
                  <div
                    ref={lineNumbersRef}
                    className={`w-11 py-3 pr-2 text-right select-none font-mono text-[12px] leading-relaxed border-r overflow-hidden shrink-0 ${
                      isDark
                        ? 'bg-[#080C14] text-slate-600 border-[#1A2333]'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                    aria-hidden="true"
                  >
                    {Array.from({ length: Math.max(1, code.split('\n').length) }, (_, i) => (
                      <div key={i + 1}>{i + 1}</div>
                    ))}
                  </div>

                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => {
                      handleCodeChange(e.target.value);
                      updateCursorPosition(e.target);
                    }}
                    onScroll={(e) => {
                      if (lineNumbersRef.current) {
                        lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
                      }
                    }}
                    onClick={(e) => updateCursorPosition(e.currentTarget)}
                    onKeyUp={(e) => updateCursorPosition(e.currentTarget)}
                    onKeyDown={handleTextareaKeyDown}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    className="flex-1 h-full w-full bg-transparent p-3 outline-none resize-none overflow-auto whitespace-pre font-mono selection:bg-[#044E62] selection:text-white"
                    style={{
                      fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
                      fontSize: `${fontSize}px`,
                      lineHeight: '1.6',
                    }}
                    placeholder="// Write your solution here..."
                  />
                </div>

                {/* Editor Bottom Status Bar */}
                <div
                  className={`h-6 shrink-0 border-t px-3 flex items-center justify-between text-[10px] font-mono ${
                    isDark ? 'bg-[#080C14] border-[#1A2333] text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span>
                      Ln {cursorPos.line}, Col {cursorPos.col}
                    </span>
                    <span>{code.length} chars</span>
                    <span>{code.split('\n').length} lines</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span>Spaces: 4</span>
                    <span>UTF-8</span>
                    <span className="uppercase text-[#38BDF8] font-bold">{selectedLanguage}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Full Monaco IDE Editor */
              <MonacoEditor
                height="100%"
                language={SUPPORTED_LANGUAGES[selectedLanguage].monacoLanguage}
                theme={isDark ? 'vs-dark' : 'vs'}
                defaultValue={code}
                loading={
                  <div
                    className={`w-full h-full min-h-[220px] flex flex-col items-center justify-center font-mono text-xs space-y-3 p-6 text-center ${
                      isDark ? 'bg-[#0B0F17] text-slate-300' : 'bg-white text-slate-600'
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-slate-700 border-t-[#044E62] animate-spin" />
                      <Terminal className="w-4 h-4 text-[#38BDF8] absolute" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold">Initializing Monaco Editor Runtime...</div>
                      <div className="text-[11px] text-slate-400">Loading syntax grammars and language services</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUseFallbackEditor(true);
                        setEditorStatus('ready');
                      }}
                      className="mt-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] font-sans font-medium text-slate-200 border border-slate-700 transition-colors cursor-pointer inline-flex items-center space-x-1.5"
                    >
                      <span>Switch to Lightweight Editor immediately</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                }
                onMount={handleEditorDidMount}
                onChange={handleCodeChange}
                options={{
                  fontSize,
                  fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
                  fontLigatures: true,
                  lineNumbers: 'on',
                  automaticLayout: true,
                  tabSize: 4,
                  wordWrap: 'on',
                  bracketPairColorization: { enabled: true },
                  autoClosingBrackets: 'always',
                  autoClosingQuotes: 'always',
                  formatOnPaste: true,
                  formatOnType: true,
                  cursorBlinking: 'smooth',
                  cursorSmoothCaretAnimation: 'on',
                  smoothScrolling: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 12, bottom: 12 },
                }}
              />
            )}
          </div>

          {/* =======================================================================
              DESKTOP VERTICAL RESIZE DIVIDER (Split between Editor & Test Bench)
             ======================================================================= */}
          <div
            onMouseDown={() => {
              if (isConsoleCollapsed) setIsConsoleCollapsed(false);
              isDraggingVertical.current = true;
              document.body.style.cursor = 'row-resize';
              document.body.style.userSelect = 'none';
            }}
            onDoubleClick={() => setBottomHeightPx(260)}
            className={`h-1.5 shrink-0 hidden lg:flex items-center justify-center transition-colors cursor-row-resize ${
              isDark ? 'bg-[#101726] hover:bg-[#38BDF8]' : 'bg-slate-200 hover:bg-[#044E62]'
            }`}
            title="Drag to resize console (double-click to reset)"
          >
            <GripHorizontal className="w-3 h-3 text-slate-500 opacity-60" />
          </div>

          {/* =======================================================================
              BOTTOM EXECUTION & TEST BENCH PANEL (Collapsible Console)
             ======================================================================= */}
          <div
            style={{ height: isConsoleCollapsed ? '36px' : `${bottomHeightPx}px` }}
            className={`flex flex-col border-t overflow-hidden shrink-0 transition-[height] duration-150 ${
              isDark ? 'border-[#1A2333] bg-[#0E1422]' : 'border-slate-200 bg-white'
            }`}
          >
            {/* Test Bench Header Bar */}
            <div
              className={`h-9 shrink-0 border-b flex items-center justify-between px-3 text-xs select-none ${
                isDark ? 'border-[#1A2333] bg-[#090D15]' : 'border-slate-200 bg-slate-50'
              }`}
            >
              {/* Tab Navigation */}
              <div className="flex items-center space-x-1 h-full">
                <button
                  type="button"
                  onClick={() => {
                    setBottomTab('testcases');
                    if (isConsoleCollapsed) setIsConsoleCollapsed(false);
                  }}
                  className={`h-full px-2.5 flex items-center space-x-1.5 border-b-2 text-[11px] font-mono transition-colors cursor-pointer ${
                    bottomTab === 'testcases' && !isConsoleCollapsed
                      ? isDark
                        ? 'border-[#38BDF8] text-[#38BDF8] bg-[#121A2C]'
                        : 'border-[#044E62] text-[#044E62] font-bold bg-white'
                      : isDark
                      ? 'border-transparent text-slate-400 hover:text-slate-200'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Terminal className="w-3 h-3 text-sky-400" />
                  <span>Test Cases ({testCases.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBottomTab('results');
                    if (isConsoleCollapsed) setIsConsoleCollapsed(false);
                  }}
                  className={`h-full px-2.5 flex items-center space-x-1.5 border-b-2 text-[11px] font-mono transition-colors cursor-pointer ${
                    bottomTab === 'results' && !isConsoleCollapsed
                      ? isDark
                        ? 'border-[#38BDF8] text-[#38BDF8] bg-[#121A2C]'
                        : 'border-[#044E62] text-[#044E62] font-bold bg-white'
                      : isDark
                      ? 'border-transparent text-slate-400 hover:text-slate-200'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span>Test Result</span>
                  {runResults && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        runResults.verdict === 'Accepted' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBottomTab('submission');
                    if (isConsoleCollapsed) setIsConsoleCollapsed(false);
                  }}
                  className={`h-full px-2.5 flex items-center space-x-1.5 border-b-2 text-[11px] font-mono transition-colors cursor-pointer ${
                    bottomTab === 'submission' && !isConsoleCollapsed
                      ? isDark
                        ? 'border-[#38BDF8] text-[#38BDF8] bg-[#121A2C]'
                        : 'border-[#044E62] text-[#044E62] font-bold bg-white'
                      : isDark
                      ? 'border-transparent text-slate-400 hover:text-slate-200'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span>Official Judge</span>
                  {submitResult && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        submitResult.verdict === 'Accepted' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                  )}
                </button>
              </div>

              {/* Console Execution Latency & Collapse Toggle */}
              <div className="flex items-center space-x-2">
                {executionLatencyMs !== null && !isConsoleCollapsed && (
                  <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                    Latency: {executionLatencyMs}ms
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsConsoleCollapsed((prev) => !prev)}
                  className={`px-1.5 py-1 rounded text-[11px] flex items-center space-x-1 transition-colors cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={isConsoleCollapsed ? 'Expand Console' : 'Collapse Console'}
                >
                  <span className="hidden sm:inline">{isConsoleCollapsed ? 'Expand' : 'Collapse'}</span>
                  {isConsoleCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Test Bench Scrollable Body */}
            {!isConsoleCollapsed && (
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 text-xs font-mono custom-scrollbar">
                {!isAuthenticated ? (
                  /* Auth Notice in Test Bench */
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <Lock className="w-5 h-5 text-slate-400" />
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Sign in to execute code and test your solutions against sample and judging test cases.
                    </p>
                    <a
                      href={`/login?redirect=${encodeURIComponent(returnPath)}`}
                      className="text-xs font-semibold text-sky-400 hover:underline"
                    >
                      Sign In to StackUp &rarr;
                    </a>
                  </div>
                ) : bottomTab === 'testcases' ? (
                  /* 1. Test Cases Sub-View */
                  <div className="space-y-3">
                    {/* Test Case Pill Selector & Add Button */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                      {testCases.map((tc, idx) => {
                        const isActive = idx === activeTestCaseIndex;
                        return (
                          <div key={tc.id || idx} className="flex items-center shrink-0">
                            <button
                              type="button"
                              onClick={() => setActiveTestCaseIndex(idx)}
                              className={`px-3 py-1 rounded-md text-xs font-medium border flex items-center space-x-1.5 transition-colors cursor-pointer ${
                                isActive
                                  ? isDark
                                    ? 'bg-[#172133] border-[#2B3B59] text-[#38BDF8] shadow-xs'
                                    : 'bg-white border-slate-300 text-[#044E62] font-semibold shadow-xs'
                                  : isDark
                                  ? 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                                  : 'bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                              }`}
                            >
                              <span>{tc.name}</span>
                              {tc.isCustom && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveTestCase(idx);
                                  }}
                                  className="text-slate-500 hover:text-rose-400 ml-1 cursor-pointer"
                                  title="Delete custom test case"
                                >
                                  <Trash2 className="w-2.5 h-2.5" />
                                </button>
                              )}
                            </button>
                          </div>
                        );
                      })}

                      {testCases.length < 8 && (
                        <button
                          type="button"
                          onClick={handleAddTestCase}
                          className={`px-2.5 py-1 rounded-md text-xs border border-dashed flex items-center space-x-1 transition-colors cursor-pointer shrink-0 ${
                            isDark
                              ? 'border-slate-700 text-slate-400 hover:text-slate-100 hover:border-slate-500'
                              : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400'
                          }`}
                          title="Add a custom test case"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Case</span>
                        </button>
                      )}
                    </div>

                    {/* Active Test Case Input Form */}
                    {activeTestCase && (
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            Input Parameters:
                          </span>
                          <textarea
                            value={activeTestCase.input}
                            onChange={(e) => handleUpdateTestCase(activeTestCaseIndex, 'input', e.target.value)}
                            rows={3}
                            placeholder="Enter parameter input values..."
                            className={`w-full p-2.5 rounded-lg border text-xs font-mono outline-none resize-none ${
                              isDark
                                ? 'bg-[#0B0F17] border-[#1A2333] text-slate-100 focus:border-[#38BDF8]'
                                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#044E62]'
                            }`}
                          />
                        </div>

                        {activeTestCase.isCustom && (
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              Expected Output (Optional):
                            </span>
                            <input
                              type="text"
                              value={activeTestCase.expectedOutput || ''}
                              onChange={(e) =>
                                handleUpdateTestCase(activeTestCaseIndex, 'expectedOutput', e.target.value)
                              }
                              placeholder="e.g. [0,1]"
                              className={`w-full p-2 rounded-lg border text-xs font-mono outline-none ${
                                isDark
                                  ? 'bg-[#0B0F17] border-[#1A2333] text-slate-100 focus:border-[#38BDF8]'
                                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#044E62]'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : bottomTab === 'results' ? (
                  /* 2. Run Test Results Sub-View */
                  <div className="space-y-3">
                    {isRunning ? (
                      <div className="py-8 flex flex-col items-center justify-center space-y-2 text-slate-400">
                        <Loader2 className="w-6 h-6 animate-spin text-[#044E62]" />
                        <span className="text-xs">Compiling & executing test cases concurrently...</span>
                      </div>
                    ) : !runResults ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        Click <span className="font-semibold text-slate-300">Run</span> above to execute your code against sample and custom test cases.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Overall Verdict Banner */}
                        <div
                          className={`p-3 rounded-lg border flex items-center justify-between ${
                            runResults.verdict === 'Accepted'
                              ? isDark
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : isDark
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                              : 'bg-rose-50 border-rose-200 text-rose-800'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            {runResults.verdict === 'Accepted' ? (
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 shrink-0" />
                            )}
                            <div>
                              <span className="font-bold text-sm block">{runResults.verdict}</span>
                              <span className="text-[11px] opacity-80">
                                {runResults.verdict === 'Accepted'
                                  ? 'All sample test cases passed successfully.'
                                  : 'One or more test cases did not match expected output.'}
                              </span>
                            </div>
                          </div>

                          {executionLatencyMs !== null && (
                            <div className="text-right text-[11px] font-mono opacity-80">
                              <span>Roundtrip: {executionLatencyMs}ms</span>
                            </div>
                          )}
                        </div>

                        {/* Compiler Diagnostic Output if any */}
                        {runResults.compileOutput && (
                          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 space-y-1">
                            <span className="font-bold text-[11px] block">Compiler Diagnostic:</span>
                            <pre className="text-[11px] overflow-x-auto whitespace-pre-wrap font-mono">
                              {runResults.compileOutput}
                            </pre>
                          </div>
                        )}

                        {/* Case Results Tabs */}
                        {runResults.results?.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                              {runResults.results.map((res, idx) => {
                                const isActive = idx === activeResultIndex;
                                return (
                                  <button
                                    key={res.testCaseId || idx}
                                    type="button"
                                    onClick={() => setActiveResultIndex(idx)}
                                    className={`px-3 py-1 rounded-md text-xs font-medium border flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 ${
                                      isActive
                                        ? isDark
                                          ? 'bg-[#172133] border-[#2B3B59] text-white'
                                          : 'bg-white border-slate-300 text-slate-900 font-semibold shadow-xs'
                                        : isDark
                                        ? 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        res.passed ? 'bg-emerald-400' : 'bg-rose-400'
                                      }`}
                                    />
                                    <span>{res.name}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Active Result Detailed View */}
                            {activeRunResult && (
                              <div
                                className={`p-3 rounded-lg border space-y-2.5 ${
                                  isDark ? 'bg-[#0B0F17] border-[#1A2333]' : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <div className="space-y-1">
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                    Input:
                                  </span>
                                  <div
                                    className={`p-2 rounded font-mono text-[11px] border whitespace-pre-wrap ${
                                      isDark ? 'bg-[#080C14] border-[#1A2333] text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                                    }`}
                                  >
                                    {activeRunResult.input}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                    Actual Output:
                                  </span>
                                  <div
                                    className={`p-2 rounded font-mono text-[11px] border whitespace-pre-wrap ${
                                      activeRunResult.passed
                                        ? isDark
                                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                        : isDark
                                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                        : 'bg-rose-50 border-rose-200 text-rose-800'
                                    }`}
                                  >
                                    {activeRunResult.actualOutput || '<empty>'}
                                  </div>
                                </div>

                                {activeRunResult.expectedOutput && (
                                  <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                                      Expected Output:
                                    </span>
                                    <div
                                      className={`p-2 rounded font-mono text-[11px] border whitespace-pre-wrap ${
                                        isDark ? 'bg-[#080C14] border-[#1A2333] text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                                      }`}
                                    >
                                      {activeRunResult.expectedOutput}
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
                                  <span>Runtime: {activeRunResult.executionTimeMs} ms</span>
                                  <span>Memory: {activeRunResult.memoryKb} KB</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* 3. Official Judge Submission Sub-View */
                  <div className="space-y-3">
                    {isSubmitting ? (
                      <div className="py-8 flex flex-col items-center justify-center space-y-2 text-slate-400">
                        <Loader2 className="w-6 h-6 animate-spin text-[#044E62]" />
                        <span className="text-xs">Evaluating solution against server-side official judging suite...</span>
                      </div>
                    ) : !submitResult ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        Click <span className="font-semibold text-slate-300">Submit</span> above to evaluate your code against the full test suite.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Big Verdict Header Card */}
                        <div
                          className={`p-4 rounded-xl border flex items-center justify-between ${
                            submitResult.verdict === 'Accepted'
                              ? isDark
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : isDark
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                              : 'bg-rose-50 border-rose-200 text-rose-800'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {submitResult.verdict === 'Accepted' ? (
                              <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-400" />
                            ) : (
                              <XCircle className="w-8 h-8 shrink-0 text-rose-400" />
                            )}
                            <div>
                              <h2 className="text-lg font-black tracking-tight">{submitResult.verdict}</h2>
                              <p className="text-xs opacity-90 font-sans">
                                {submitResult.verdict === 'Accepted'
                                  ? 'All official judging test cases passed! Solution verified.'
                                  : submitResult.failedTestName
                                  ? `Failed at ${submitResult.failedTestName} (${submitResult.passedTests}/${submitResult.totalTests} tests passed)`
                                  : 'Solution encountered an evaluation error.'}
                              </p>
                              {submitResult.verdict !== 'Accepted' && (
                                <div className="mt-2">
                                  <button
                                    type="button"
                                    onClick={() => handleLogSubmissionMistake(submitResult)}
                                    disabled={mistakeLoggedForSubmit}
                                    className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                                      mistakeLoggedForSubmit
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                                    }`}
                                  >
                                    <BookMarked className="w-3 h-3" />
                                    <span>{mistakeLoggedForSubmit ? 'Logged in Spaced Revision' : 'Add to Mistake Journal & SM-2'}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-right font-mono text-xs space-y-0.5">
                            <div>
                              <span className="font-bold text-sm">{submitResult.passedTests}</span>
                              <span className="opacity-70"> / {submitResult.totalTests} Passed</span>
                            </div>
                            {submitResult.executionTimeMs !== undefined && (
                              <div className="text-[11px] opacity-80">{submitResult.executionTimeMs} ms</div>
                            )}
                          </div>
                        </div>

                        {/* Compiler Diagnostic if failed */}
                        {submitResult.compileOutput && (
                          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 space-y-1">
                            <span className="font-bold text-[11px] block">Compiler Output:</span>
                            <pre className="text-[11px] overflow-x-auto whitespace-pre-wrap font-mono">
                              {submitResult.compileOutput}
                            </pre>
                          </div>
                        )}

                        {/* Test Cases Checklist */}
                        <div className="space-y-1.5">
                          {submitResult.results.map((res, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                                res.passed
                                  ? isDark
                                    ? 'bg-[#0B1522] border-[#162B44] text-slate-200'
                                    : 'bg-emerald-50/50 border-emerald-100 text-slate-800'
                                  : isDark
                                  ? 'bg-[#220E15] border-[#441620] text-slate-200'
                                  : 'bg-rose-50/50 border-rose-100 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {res.passed ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : (
                                  <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                )}
                                <span className="font-semibold">{res.name}</span>
                                {res.isHidden && (
                                  <span className="text-[10px] opacity-60 font-sans">(Hidden Evaluation Case)</span>
                                )}
                              </div>
                              <span
                                className={`font-mono text-[11px] font-bold ${
                                  res.passed ? 'text-emerald-400' : 'text-rose-400'
                                }`}
                              >
                                {res.verdict}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          KEYBOARD SHORTCUTS CHEATSHEET MODAL
         ========================================================================= */}
      {shortcutsModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-2xl border p-5 shadow-2xl space-y-4 ${
              isDark ? 'bg-[#0E1422] border-[#1E293B] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-3 border-[var(--border-subtle)]">
              <div className="flex items-center space-x-2">
                <Keyboard className="w-4 h-4 text-sky-400" />
                <h3 className="font-bold text-sm">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setShortcutsModalOpen(false)}
                className={`p-1 rounded cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div
                className={`flex items-center justify-between p-2 rounded border ${
                  isDark ? 'bg-[#121929] border-[#1E293B]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span>Run Code against test cases</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#044E62] text-white">
                  Ctrl + Enter
                </kbd>
              </div>

              <div
                className={`flex items-center justify-between p-2 rounded border ${
                  isDark ? 'bg-[#121929] border-[#1E293B]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span>Submit Solution to Official Judge</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded bg-gradient-to-r from-[#044E62] to-[#0D08CB] text-white">
                  Ctrl + Shift + Enter
                </kbd>
              </div>

              <div
                className={`flex items-center justify-between p-2 rounded border ${
                  isDark ? 'bg-[#121929] border-[#1E293B]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span>Format Source Code</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded border text-slate-400 bg-slate-800/80 border-slate-700">
                  Shift + Alt + F
                </kbd>
              </div>

              <div
                className={`flex items-center justify-between p-2 rounded border ${
                  isDark ? 'bg-[#121929] border-[#1E293B]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span>Close Workspace / Modal</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded border text-slate-400 bg-slate-800/80 border-slate-700">
                  Escape
                </kbd>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShortcutsModalOpen(false)}
                className="px-3.5 py-1.5 rounded-md bg-[#044E62] hover:bg-[#06617A] text-white text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          AUTHENTICATION REQUIRED MODAL (Triggered when logged-out visitor attempts execution)
         ========================================================================= */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[130] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-4 text-center ${
              isDark ? 'bg-[#0E1422] border-[#1E293B] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center border shadow-xs ${
                isDark
                  ? 'bg-[#121A2C] border-[#1E293B] text-[#38BDF8]'
                  : 'bg-slate-100 border-slate-200 text-[#044E62]'
              }`}
            >
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-tight">Sign In Required</h3>
              <p className={`text-xs max-w-sm mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {authModalMessage}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <a
                href={`/login?redirect=${encodeURIComponent(returnPath)}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#044E62] to-[#0D08CB] hover:from-[#033c4b] hover:to-[#0a06a3] text-white font-semibold text-xs transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </a>

              <a
                href={`/login?mode=signup&redirect=${encodeURIComponent(returnPath)}`}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg border font-semibold text-xs transition-colors flex items-center justify-center ${
                  isDark
                    ? 'border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Create Account</span>
              </a>

              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
