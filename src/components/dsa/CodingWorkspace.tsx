'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
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
  GripHorizontal,
  GripVertical,
  AlignLeft,
  ArrowRight,
  Zap,
  Search,
  Keyboard,
  Layers,
  FileCode,
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
    <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-[#0B0F17] text-slate-300 font-mono text-xs space-y-3 p-6 text-center">
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
  currentUser?: { id: string; email?: string | null } | null;
  onSolvedChange?: (problemId: string, isSolved: boolean) => void;
  isSolvedInitially?: boolean;
}

export default function CodingWorkspace({
  problemId,
  onClose,
  onProblemChange,
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

  // Selected language, theme, font size
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('python');
  const editorTheme = 'vs-dark';
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
    (pId: string, lang: SupportedLanguage): string => {
      try {
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem(`stackup_code_${pId}_${lang}`);
          if (saved) return saved;
        }
      } catch {
        // ignore
      }
      const targetProb = DSA_PROBLEMS.find((p) => p.id === pId) || problem;
      return getStarterCode(targetProb, lang);
    },
    [problem]
  );

  // Code state and ref (Ref is immediately updated on keystroke; state is debounced)
  const [code, setCode] = useState<string>(() => loadCodeForProblemAndLang(problem.id, 'python'));
  const codeRef = useRef<string>(code);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sample + custom test cases
  const [testCases, setTestCases] = useState<TestCaseItem[]>(() => getSampleTestCases(problem.id));

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResults, setRunResults] = useState<RunCodeResponse | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);

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

  // Proactively monitor and timeout Monaco initialization to guarantee the user is NEVER stuck on loading
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMonacoReady || useFallbackEditor) return;

    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted && !isMonacoReady) {
        console.warn('[CodingWorkspace] Monaco Editor initialization timed out after 6s. Switching to lightweight editor.');
        setUseFallbackEditor(true);
        setEditorStatus('init_failed');
        setInitError('Monaco Editor script took longer than 6 seconds to load. Switched to high-performance lightweight editor.');
      }
    }, 6000);

    try {
      loader
        .init()
        .then(() => {
          if (isMounted) {
            clearTimeout(timeoutId);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.warn('[CodingWorkspace] Monaco loader.init failed:', err);
            clearTimeout(timeoutId);
            setUseFallbackEditor(true);
            setEditorStatus('init_failed');
            setInitError('Monaco assets could not be loaded. Switched to lightweight code editor.');
          }
        });
    } catch {
      // ignore
    }

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isMonacoReady, useFallbackEditor]);

  // Track previous problem ID to reload code & test cases on problem change
  const prevProblemIdRef = useRef<string>(problem.id);
  useEffect(() => {
    if (prevProblemIdRef.current !== problem.id) {
      prevProblemIdRef.current = problem.id;
      setEditorStatus('loading_language');
      const loaded = loadCodeForProblemAndLang(problem.id, selectedLanguage);
      codeRef.current = loaded;
      setCode(loaded);
      if (editorRef.current) {
        editorRef.current.setValue(loaded);
      }
      setTestCases(getSampleTestCases(problem.id));
      setActiveTestCaseIndex(0);
      setActiveResultIndex(0);
      setRunResults(null);
      setSubmitResult(null);
      setIsSolved(isSolvedInitially);
      setProblemPickerOpen(false);
      setTimeout(() => {
        setEditorStatus('ready');
      }, 50);
    }
  }, [problem.id, selectedLanguage, isSolvedInitially, loadCodeForProblemAndLang]);

  // Handle switching language (preserves existing language code draft)
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, codeRef.current);
      }
    } catch {
      // ignore
    }

    setEditorStatus('loading_language');
    setSelectedLanguage(newLang);
    const loaded = loadCodeForProblemAndLang(problem.id, newLang);
    codeRef.current = loaded;
    setCode(loaded);
    if (editorRef.current) {
      editorRef.current.setValue(loaded);
    }

    setTimeout(() => {
      setEditorStatus('ready');
    }, 50);
  };

  // Debounced code change handler (eliminates typing lag while persisting)
  const handleCodeChange = useCallback(
    (newVal: string | undefined) => {
      const updated = newVal || '';
      codeRef.current = updated;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        setCode(updated);
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, updated);
          }
        } catch {
          // ignore
        }
      }, 300);
    },
    [problem.id, selectedLanguage]
  );

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Reset to starter code with confirmation
  const handleResetCode = () => {
    const langName = SUPPORTED_LANGUAGES[selectedLanguage].name;
    if (confirm(`Reset code for ${problem.title} (${langName}) to default starter template? Current edits will be replaced.`)) {
      const starter = getStarterCode(problem, selectedLanguage);
      codeRef.current = starter;
      setCode(starter);
      if (editorRef.current) {
        editorRef.current.setValue(starter);
      }
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, starter);
        }
      } catch {
        // ignore
      }
    }
  };

  // Format code document
  const handleFormatCode = () => {
    if (editorRef.current && !useFallbackEditor) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    } else {
      const formatted = code
        .split('\n')
        .map((line) => line.trimEnd())
        .join('\n');
      codeRef.current = formatted;
      setCode(formatted);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, formatted);
        }
      } catch {
        // ignore
      }
    }
  };

  // Fallback editor Tab & keyboard shortcut handling
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      if (e.shiftKey) {
        const lineStart = val.lastIndexOf('\n', start - 1) + 1;
        if (val.slice(lineStart, lineStart + 4) === '    ') {
          const nextVal = val.slice(0, lineStart) + val.slice(lineStart + 4);
          codeRef.current = nextVal;
          setCode(nextVal);
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, nextVal);
            }
          } catch {
            // ignore
          }
          requestAnimationFrame(() => {
            textarea.selectionStart = Math.max(lineStart, start - 4);
            textarea.selectionEnd = Math.max(lineStart, end - 4);
            updateCursorPosition(textarea);
          });
        }
      } else {
        const nextVal = val.substring(0, start) + '    ' + val.substring(end);
        codeRef.current = nextVal;
        setCode(nextVal);
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem(`stackup_code_${problem.id}_${selectedLanguage}`, nextVal);
          }
        } catch {
          // ignore
        }
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
          updateCursorPosition(textarea);
        });
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
  const handleAddCustomTest = () => {
    if (testCases.length >= 8) return;
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
    setIsConsoleCollapsed(false);
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

  // Copy sample input directly into custom test case
  const handleCopyInputToCustom = (inputStr: string, exIdx: number) => {
    navigator.clipboard.writeText(inputStr);
    setCopiedInputId(exIdx);
    setTimeout(() => setCopiedInputId(null), 1500);

    // If active test case is custom, fill it in
    if (testCases[activeTestCaseIndex]?.isCustom) {
      handleUpdateTestCase(activeTestCaseIndex, 'input', inputStr);
    }
  };

  // Execute RUN CODE (runs all sample + custom test cases concurrently)
  const handleRunCode = useCallback(async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setEditorStatus('executing_code');
    setBottomTab('results');
    setMobileTab('results');
    setIsConsoleCollapsed(false);

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

      setEditorStatus('loading_results');
      const data: RunCodeResponse = await res.json();
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
  }, [isRunning, isSubmitting, problem.id, selectedLanguage, testCases]);

  // SUBMIT SOLUTION (evaluates against server-side official judging suite)
  const handleSubmit = useCallback(async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setEditorStatus('executing_code');
    setBottomTab('submission');
    setMobileTab('results');
    setIsConsoleCollapsed(false);

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

      setEditorStatus('loading_results');
      const data: SubmitResponse = await res.json();
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
  }, [isRunning, isSubmitting, problem.id, selectedLanguage, onSolvedChange]);

  // Refs to stabilize shortcut handlers without recreating listeners
  const runCodeRef = useRef(handleRunCode);
  const submitRef = useRef(handleSubmit);
  useEffect(() => {
    runCodeRef.current = handleRunCode;
    submitRef.current = handleSubmit;
  }, [handleRunCode, handleSubmit]);

  // Monaco onMount callback to register commands & configure editor
  const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    editorRef.current = editorInstance;
    setIsMonacoReady(true);
    setEditorStatus('ready');
    setInitError(null);

    // Synchronize editor buffer with codeRef
    if (codeRef.current && editorInstance.getValue() !== codeRef.current) {
      editorInstance.setValue(codeRef.current);
    }

    // Register Ctrl+Enter to Run Code
    editorInstance.addCommand(2048 /* KeyMod.CtrlCmd */ | 3 /* KeyCode.Enter */, () => {
      runCodeRef.current();
    });

    // Register Ctrl+Shift+Enter to Submit
    editorInstance.addCommand(2048 /* KeyMod.CtrlCmd */ | 1024 /* KeyMod.Shift */ | 3 /* KeyCode.Enter */, () => {
      submitRef.current();
    });
  };

  // Window-level Keyboard shortcuts listener (for Esc, Fullscreen, and global keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (shortcutsModalOpen) {
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
  }, [isFullscreen, onClose, shortcutsModalOpen, problemPickerOpen]);

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

  if (!isMounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] w-screen h-screen flex flex-col bg-[#0A0E17] text-slate-100 overflow-hidden font-sans select-none ${
        isFullscreen ? '' : ''
      }`}
    >
      {/* =========================================================================
          1. TOP COMMAND MASTHEAD (Command Deck inspired by LeetCode / VS Code)
         ========================================================================= */}
      <header className="h-12 shrink-0 border-b border-[#1A2333] bg-[#0E1422] px-3 sm:px-4 flex items-center justify-between gap-3 relative z-30">
        {/* Left Section: Branding, Prev/Next & Quick Problem Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
          <div className="flex items-center space-x-1.5 shrink-0">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#044E62] to-[#0A7B96] flex items-center justify-center text-white shadow-xs">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-xs tracking-tight text-slate-200 hidden sm:inline">
              Stack<span className="text-[#38BDF8]">Up</span>
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700/60 hidden md:inline">
              STUDIO
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block mx-0.5" />

          {/* Prev / Next Problem Buttons */}
          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              onClick={() => prevProblem && onProblemChange && onProblemChange(prevProblem.id)}
              disabled={!prevProblem}
              className="p-1 rounded hover:bg-[#1A2438] text-slate-400 hover:text-slate-100 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
              title={prevProblem ? `Previous Problem: ${prevProblem.title}` : 'First problem'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nextProblem && onProblemChange && onProblemChange(nextProblem.id)}
              disabled={!nextProblem}
              className="p-1 rounded hover:bg-[#1A2438] text-slate-400 hover:text-slate-100 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
              title={nextProblem ? `Next Problem: ${nextProblem.title}` : 'Last problem'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Problem Quick-Jump Popover Trigger */}
          <div className="relative">
            <button
              onClick={() => setProblemPickerOpen(!problemPickerOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#131927] hover:bg-[#1A2438] border border-[#232F46] hover:border-slate-600 text-xs font-semibold text-slate-200 transition-colors cursor-pointer max-w-[210px] sm:max-w-xs truncate"
              title="Click to search and switch problems"
            >
              <span className="font-mono text-slate-400 font-bold shrink-0">
                #{problem.id.replace('dsa-', '')}
              </span>
              <span className="truncate">{problem.title}</span>
              <span
                className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0 hidden md:inline-block ${
                  problem.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : problem.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {problem.difficulty}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5" />
            </button>

            {/* Quick Problem Jump Popover Dropdown */}
            {problemPickerOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-80 sm:w-96 rounded-xl border border-[#232F46] bg-[#0E1524] shadow-2xl z-50 overflow-hidden flex flex-col max-h-[460px]">
                <div className="p-2.5 border-b border-[#1C2536] bg-[#121A2C] space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={problemSearchQuery}
                      onChange={(e) => setProblemSearchQuery(e.target.value)}
                      placeholder="Search 150 problems by name, tag..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0A0F1A] border border-[#232F46] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                      autoFocus
                    />
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] font-mono">
                    {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setProblemFilterDifficulty(diff)}
                        className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          problemFilterDifficulty === diff
                            ? 'bg-[#044E62] text-white font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 divide-y divide-slate-800/40 p-1">
                  {filteredJumpProblems.length > 0 ? (
                    filteredJumpProblems.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          if (onProblemChange) onProblemChange(p.id);
                          setProblemPickerOpen(false);
                        }}
                        className={`w-full p-2 text-left rounded-lg transition-colors flex items-center justify-between text-xs cursor-pointer ${
                          p.id === problem.id
                            ? 'bg-[#182338] text-white font-bold'
                            : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <span className="font-mono text-[10px] text-slate-500 w-7">
                            #{p.id.replace('dsa-', '')}
                          </span>
                          <span className="truncate">{p.title}</span>
                        </div>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0 ${
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
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-500">No problems found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Solved Status Indicator Toggle */}
          <button
            onClick={() => {
              const next = !isSolved;
              setIsSolved(next);
              if (onSolvedChange) onSolvedChange(problem.id, next);
            }}
            className={`hidden sm:inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
              isSolved
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-semibold'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
            title="Toggle solved status"
          >
            <CheckCircle2 className={`w-3 h-3 ${isSolved ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>{isSolved ? 'Solved' : 'Unsolved'}</span>
          </button>
        </div>

        {/* Center Section: Primary Action Engine (Run Code & Submit CTAs) */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Run Code Action Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="px-3 sm:px-3.5 py-1.5 rounded-md font-semibold text-xs flex items-center space-x-1.5 transition-all bg-[#172133] hover:bg-[#202C44] text-slate-100 border border-[#2B3B59] active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
            title="Run code against sample and custom test cases (Ctrl+Enter)"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            )}
            <span>Run</span>
            <kbd className="hidden lg:inline-block font-mono text-[9px] text-slate-400 bg-slate-900/80 px-1 py-0.5 rounded border border-slate-700/60 ml-0.5">
              ⌘↵
            </kbd>
          </button>

          {/* Submit Action Button (StackUp Signature Teal Primary) */}
          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="px-3.5 sm:px-4 py-1.5 rounded-md font-bold text-xs flex items-center space-x-1.5 transition-all bg-gradient-to-r from-[#044E62] to-[#087F8C] hover:from-[#055B72] hover:to-[#0A96A5] text-white border border-[#0A87A0]/40 shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
            title="Submit solution to official judge (Ctrl+Shift+Enter)"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Submit</span>
            <kbd className="hidden lg:inline-block font-mono text-[9px] text-white/80 bg-black/25 px-1 py-0.5 rounded ml-0.5">
              ⌘⇧↵
            </kbd>
          </button>

          {/* Live Lifecycle State Badge */}
          <div className="hidden xl:flex items-center pl-1">
            {editorStatus === 'executing_code' && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Loader2 className="w-2.5 h-2.5 animate-spin" />
                <span>Running Tests</span>
              </span>
            )}
            {editorStatus === 'loading_results' && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Loader2 className="w-2.5 h-2.5 animate-spin" />
                <span>Evaluating</span>
              </span>
            )}
            {editorStatus === 'ready' && (
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ready</span>
              </span>
            )}
            {editorStatus === 'init_failed' && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Zap className="w-2.5 h-2.5" />
                <span>Fast Editor</span>
              </span>
            )}
            {editorStatus === 'exec_failed' && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <XCircle className="w-2.5 h-2.5" />
                <span>Error</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Section: Language, Tools, Fullscreen & Close */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
              className="px-2.5 py-1 rounded-md border border-[#243048] bg-[#121929] hover:bg-[#182236] text-xs font-mono font-semibold text-slate-200 focus:outline-none focus:border-[#38BDF8] cursor-pointer appearance-none pr-6"
            >
              {(Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).map((lang) => (
                <option key={lang} value={lang}>
                  {SUPPORTED_LANGUAGES[lang].name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Reset Code */}
          <button
            onClick={handleResetCode}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer hidden sm:block"
            title="Reset code to default starter template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Format Code */}
          <button
            onClick={handleFormatCode}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer hidden sm:block"
            title="Format Code (Shift+Alt+F)"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>

          {/* Shortcuts Modal Trigger */}
          <button
            onClick={() => setShortcutsModalOpen(true)}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer hidden sm:block"
            title="Keyboard Shortcuts & Documentation"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer hidden sm:block"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Close Workspace Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
            title="Close Workspace (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. MOBILE NAVIGATION TABS (Only visible on small viewports)
         ========================================================================= */}
      <div className="flex lg:hidden bg-[#0D121F] border-b border-[#1A2333] px-3 py-1.5 text-xs font-semibold select-none shrink-0 justify-between">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setMobileTab('problem')}
            className={`px-3 py-1 rounded-md transition-colors ${
              mobileTab === 'problem'
                ? 'bg-[#044E62] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Problem
          </button>
          <button
            onClick={() => setMobileTab('editor')}
            className={`px-3 py-1 rounded-md transition-colors ${
              mobileTab === 'editor'
                ? 'bg-[#044E62] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setMobileTab('results')}
            className={`px-3 py-1 rounded-md transition-colors ${
              mobileTab === 'results'
                ? 'bg-[#044E62] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Test Console
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            {selectedLanguage}
          </span>
        </div>
      </div>

      {/* =========================================================================
          3. MAIN MULTI-PANEL SPLIT WORKSPACE
         ========================================================================= */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden relative">
        {/* =======================================================================
            PANEL A: LEFT TECHNICAL PROBLEM SPECIFICATION
           ======================================================================= */}
        <div
          style={{ width: `${leftWidthPercent}%` }}
          className={`border-b lg:border-b-0 lg:border-r border-[#1C2536] flex flex-col min-h-0 bg-[#0F1626] shrink-0 ${
            mobileTab === 'problem' ? 'flex w-full' : 'hidden lg:flex'
          }`}
        >
          {/* Problem Panel Navigation Tabs */}
          <div className="h-9 shrink-0 border-b border-[#1C2536] px-3 flex items-center justify-between bg-[#0C121F] text-xs">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setLeftTab('description')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                  leftTab === 'description'
                    ? 'bg-[#182338] text-slate-100 font-bold shadow-2xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Description</span>
              </button>
              <button
                onClick={() => setLeftTab('editorial')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                  leftTab === 'editorial'
                    ? 'bg-[#182338] text-slate-100 font-bold shadow-2xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Approach</span>
              </button>
              <button
                onClick={() => setLeftTab('solutions')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                  leftTab === 'solutions'
                    ? 'bg-[#182338] text-slate-100 font-bold shadow-2xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Solutions</span>
              </button>
            </div>

            {/* External Reference Links */}
            <div className="flex items-center space-x-2 text-[11px]">
              <a
                href={problem.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center space-x-0.5"
                title="View on LeetCode"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              {problem.striver_url && (
                <a
                  href={problem.striver_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E9DEFA] hover:text-white transition-colors inline-flex items-center space-x-0.5"
                  title="View TakeUForward Striver Guide"
                >
                  <span>Striver</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Problem Spec Scrollable Body */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-5 text-xs sm:text-sm">
            {leftTab === 'description' && (
              <>
                {/* Title & Pattern Badge */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                      #{problem.id.replace('dsa-', '')}. {problem.title}
                    </h1>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
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

                  {/* Badges: Category & Companies */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-[#162136] text-[#38BDF8] border border-[#233352]">
                      {problem.pattern_tag}
                    </span>
                    {problem.companies?.slice(0, 4).map((comp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#12192A] text-slate-400 border border-[#1E293B]"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Statement Prose */}
                <div className="space-y-2 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                  <p className="whitespace-pre-line bg-[#121929] p-3.5 rounded-lg border border-[#1E293B]">
                    {problem.description}
                  </p>
                </div>

                {/* Formatted Examples (LeetCode Style) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Examples
                  </h3>

                  {problem.examples?.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-[#232F46] bg-[#121A2C] space-y-2 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#38BDF8]">Example {idx + 1}</span>
                        <button
                          onClick={() => handleCopyInputToCustom(ex.input, idx)}
                          className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center space-x-1 cursor-pointer bg-[#182338] px-2 py-0.5 rounded border border-slate-700/60"
                          title="Copy input to test bench"
                        >
                          {copiedInputId === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-sans">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span className="font-sans">Copy Input</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Input:
                        </span>
                        <code className="text-slate-200 bg-[#0A0F1A] px-2.5 py-1.5 rounded block border border-[#1E293B] overflow-x-auto whitespace-pre-wrap">
                          {ex.input}
                        </code>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          Output:
                        </span>
                        <code className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded block border border-emerald-500/20 overflow-x-auto">
                          {ex.output}
                        </code>
                      </div>

                      {ex.explanation && (
                        <div className="text-[11px] font-sans text-slate-400 leading-relaxed pt-1">
                          <span className="font-semibold text-slate-300">Explanation: </span>
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints Section */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Constraints
                    </h3>
                    <ul className="space-y-1.5 font-mono text-xs text-slate-300 bg-[#121929] p-3 rounded-lg border border-[#1E293B]">
                      {problem.constraints.map((c, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#044E62] shrink-0" />
                          <code>{c}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Editorial Tab */}
            {leftTab === 'editorial' && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-[#232F46] bg-[#121A2C] space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Algorithmic Approach &amp; Intuition</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {problem.approach}
                  </p>
                </div>

                {/* Complexity Targets */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-[#232F46] bg-[#121A2C] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-[#38BDF8]" />
                      <span>Time Complexity</span>
                    </span>
                    <span className="font-mono font-bold text-slate-100 block">
                      {problem.timeComplexity}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-[#232F46] bg-[#121A2C] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                      <HardDrive className="w-3 h-3 text-emerald-400" />
                      <span>Space Complexity</span>
                    </span>
                    <span className="font-mono font-bold text-slate-100 block">
                      {problem.spaceComplexity}
                    </span>
                  </div>
                </div>

                {/* Video Lecture Link */}
                {problem.youtube_url && (
                  <div className="pt-2">
                    <a
                      href={problem.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      <span>Watch Video Lecture on YouTube &rarr;</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Reference Solutions Tab */}
            {leftTab === 'solutions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#1C2536]">
                  <span className="text-xs font-bold text-slate-200">
                    Optimal Solution ({selectedLanguage.toUpperCase()})
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
                    className="px-2.5 py-1 rounded text-[11px] font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors inline-flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Solution'}</span>
                  </button>
                </div>

                <div className="rounded-lg border border-[#232F46] bg-[#0A0F1A] text-slate-200 p-3.5 font-mono text-xs overflow-x-auto max-h-[460px]">
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
          className="hidden lg:flex w-1.5 hover:w-2 bg-[#1A2333] hover:bg-[#044E62] cursor-col-resize transition-all items-center justify-center shrink-0 z-20 group"
          title="Drag to resize problem / editor split"
        >
          <GripVertical className="w-3 h-3 text-slate-500 group-hover:text-white" />
        </div>

        {/* =======================================================================
            PANEL B: RIGHT CODE CANVAS & BOTTOM EXECUTION TEST BENCH
           ======================================================================= */}
        <div
          className={`flex-1 flex flex-col min-h-0 bg-[#0B0F17] ${
            mobileTab !== 'problem' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Editor Header Tab Bar (VS Code inspired) */}
          <div className="h-9 shrink-0 border-b border-[#1A2333] px-3 flex items-center justify-between bg-[#0E1422] select-none">
            {/* Active File Tab */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-t-md bg-[#0B0F17] border-t-2 border-t-[#38BDF8] border-x border-[#1A2333] text-xs font-mono font-medium text-slate-100">
                <FileCode className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{FILE_NAMES[selectedLanguage]}</span>
              </div>
            </div>

            {/* Right Editor Mini-Controls */}
            <div className="flex items-center space-x-2 text-xs">
              {/* Font Size Selector */}
              <div className="flex items-center space-x-1 text-[11px] font-mono text-slate-400 hidden sm:flex">
                <span>Font:</span>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="bg-[#121928] border border-[#243048] rounded px-1.5 py-0.5 text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value={12}>12px</option>
                  <option value={13}>13px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                </select>
              </div>

              {/* Mode Toggle: Monaco IDE vs Fast Lightweight Editor */}
              <button
                type="button"
                onClick={() => {
                  if (useFallbackEditor) {
                    setUseFallbackEditor(false);
                    setEditorStatus('initializing_editor');
                    setInitError(null);
                  } else {
                    setUseFallbackEditor(true);
                    setEditorStatus('ready');
                  }
                }}
                className="px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors inline-flex items-center space-x-1 cursor-pointer"
                title={useFallbackEditor ? 'Switch to Monaco IDE' : 'Switch to Lightweight Editor'}
              >
                {useFallbackEditor ? (
                  <>
                    <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                    <span>Monaco</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Fast Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ==================== CODE CANVAS CONTAINER ==================== */}
          <div
            className="flex-1 min-h-[180px] relative overflow-hidden bg-[#0B0F17]"
            style={{ minHeight: '180px', height: '100%', width: '100%', position: 'relative' }}
          >
            {useFallbackEditor ? (
              /* Resilient Lightweight Fast Editor */
              <div className="flex-1 w-full h-full min-h-[180px] flex flex-col bg-[#0B0F17] text-slate-100 font-mono text-xs overflow-hidden relative">
                <div className="px-3 py-1 bg-amber-500/10 border-b border-amber-500/20 text-amber-400 text-[11px] flex items-center justify-between shrink-0">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    <span className="truncate">
                      Fast Lightweight Editor Active &bull; Zero latency typing, execution and submission enabled.{initError ? ` (${initError})` : ''}
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
                    className="w-11 py-3 pr-2 text-right select-none bg-[#080C14] text-slate-600 font-mono text-[12px] leading-relaxed border-r border-[#1A2333] overflow-hidden shrink-0"
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
                    className="flex-1 h-full w-full bg-transparent text-slate-100 font-mono text-[13px] leading-relaxed p-3 outline-none resize-none overflow-auto whitespace-pre font-mono selection:bg-[#044E62] selection:text-white"
                    style={{
                      fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
                      fontSize: `${fontSize}px`,
                      lineHeight: '1.6',
                    }}
                    placeholder="// Write your solution here..."
                  />
                </div>

                {/* Editor Bottom Status Bar */}
                <div className="h-6 shrink-0 bg-[#080C14] border-t border-[#1A2333] px-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <div className="flex items-center space-x-3">
                    <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
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
                theme={editorTheme}
                defaultValue={code}
                loading={
                  <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-[#0B0F17] text-slate-300 font-mono text-xs space-y-3 p-6 text-center">
                    <div className="relative flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-slate-700 border-t-[#044E62] animate-spin" />
                      <Terminal className="w-4 h-4 text-[#38BDF8] absolute" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-200">Initializing Monaco Editor Runtime...</div>
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
          {!isConsoleCollapsed && (
            <div
              onMouseDown={() => {
                isDraggingVertical.current = true;
                document.body.style.cursor = 'row-resize';
                document.body.style.userSelect = 'none';
              }}
              onDoubleClick={() => setBottomHeightPx(260)}
              className="h-1.5 hover:h-2 bg-[#1A2333] hover:bg-[#044E62] cursor-row-resize transition-all flex items-center justify-center shrink-0 z-20 group"
              title="Drag to resize test bench, double-click to reset"
            >
              <GripHorizontal className="w-4 h-3 text-slate-500 group-hover:text-white" />
            </div>
          )}

          {/* =======================================================================
              BOTTOM PANEL: TEST BENCH & CONSOLE (Inspired by LeetCode / HackerRank)
             ======================================================================= */}
          <div
            style={{ height: isConsoleCollapsed ? '36px' : `${bottomHeightPx}px` }}
            className="border-t border-[#1C2536] flex flex-col min-h-0 bg-[#0D1321] shrink-0 transition-[height] duration-150"
          >
            {/* Test Bench Header Bar */}
            <div className="h-9 shrink-0 border-b border-[#1C2536] px-3 flex items-center justify-between bg-[#0A0E18] text-xs">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setBottomTab('testcases');
                    setIsConsoleCollapsed(false);
                  }}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    bottomTab === 'testcases' && !isConsoleCollapsed
                      ? 'bg-[#182338] text-slate-100 font-bold shadow-2xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Test Cases ({testCases.length})</span>
                </button>

                <button
                  onClick={() => {
                    setBottomTab('results');
                    setIsConsoleCollapsed(false);
                  }}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    bottomTab === 'results' && !isConsoleCollapsed
                      ? 'bg-[#182338] text-slate-100 font-bold shadow-2xs'
                      : 'text-slate-400 hover:text-slate-200'
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
                  onClick={() => {
                    setBottomTab('submission');
                    setIsConsoleCollapsed(false);
                  }}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    bottomTab === 'submission' && !isConsoleCollapsed
                      ? 'bg-[#182338] text-slate-100 font-bold shadow-2xs'
                      : 'text-slate-400 hover:text-slate-200'
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

              {/* Console Minimize / Expand Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsConsoleCollapsed(!isConsoleCollapsed)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer inline-flex items-center space-x-1 text-[11px]"
                  title={isConsoleCollapsed ? 'Expand Test Console' : 'Minimize Test Console'}
                >
                  <span className="hidden md:inline text-[10px]">
                    {isConsoleCollapsed ? 'Expand' : 'Collapse'}
                  </span>
                  {isConsoleCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Test Bench Scrollable Body */}
            {!isConsoleCollapsed && (
              <div className="flex-1 p-3 overflow-y-auto text-xs font-mono bg-[#0D1321]">
                {/* TAB 1: TEST CASES & CUSTOM INPUT */}
                {bottomTab === 'testcases' && (
                  <div className="space-y-3">
                    {/* Case Tabs Selector */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                      {testCases.map((tc, idx) => (
                        <button
                          key={tc.id}
                          onClick={() => setActiveTestCaseIndex(idx)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 border ${
                            activeTestCaseIndex === idx
                              ? 'bg-[#182338] border-[#38BDF8] text-slate-100 font-bold'
                              : 'bg-[#121929] border-[#1E293B] text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span>{tc.name}</span>
                          {tc.isCustom && (
                            <span
                              onClick={(e) => handleRemoveCustomTest(tc.id, e)}
                              className="hover:text-rose-400 cursor-pointer p-0.5 ml-0.5"
                              title="Delete custom test case"
                            >
                              <Trash2 className="w-3 h-3" />
                            </span>
                          )}
                        </button>
                      ))}

                      {/* Add Custom Test Case Button */}
                      {testCases.length < 8 && (
                        <button
                          onClick={handleAddCustomTest}
                          className="px-2 py-1 rounded-md text-xs font-medium border border-dashed border-[#2B3B59] text-[#38BDF8] hover:bg-[#182338] transition-colors inline-flex items-center space-x-1 shrink-0 cursor-pointer"
                          title="Add a custom test case"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Case</span>
                        </button>
                      )}
                    </div>

                    {/* Active Case Input Editor */}
                    {activeTestCase && (
                      <div className="space-y-2 bg-[#0A0E18] p-3 rounded-lg border border-[#1C2536]">
                        <div>
                          <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                            Input Parameters:
                          </label>
                          <textarea
                            value={activeTestCase.input}
                            onChange={(e) => handleUpdateTestCase(activeTestCaseIndex, 'input', e.target.value)}
                            rows={3}
                            className="w-full p-2.5 rounded-md border border-[#1E293B] bg-[#121928] font-mono text-xs text-slate-100 focus:outline-none focus:border-[#38BDF8] resize-none"
                            placeholder="e.g. nums = [2,7,11,15], target = 9"
                          />
                        </div>

                        {activeTestCase.isCustom && (
                          <div>
                            <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                              Expected Output (Optional validation):
                            </label>
                            <input
                              type="text"
                              value={activeTestCase.expectedOutput || ''}
                              onChange={(e) =>
                                handleUpdateTestCase(activeTestCaseIndex, 'expectedOutput', e.target.value)
                              }
                              className="w-full p-2 rounded-md border border-[#1E293B] bg-[#121928] font-mono text-xs text-slate-100 focus:outline-none focus:border-[#38BDF8]"
                              placeholder="e.g. [0,1]"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: EXECUTION TEST RESULT */}
                {bottomTab === 'results' && (
                  <div className="space-y-3">
                    {isRunning ? (
                      <div className="flex flex-col items-center justify-center py-8 text-slate-400 space-y-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#38BDF8]" />
                        <span className="text-xs">Compiling &amp; executing test cases concurrently...</span>
                      </div>
                    ) : runResults ? (
                      <div className="space-y-3">
                        {/* Overall Verdict Banner */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#1C2536]">
                          <div className="flex items-center space-x-2">
                            {runResults.verdict === 'Accepted' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            )}
                            <span
                              className={`font-bold text-xs ${
                                runResults.verdict === 'Accepted'
                                  ? 'text-emerald-400'
                                  : 'text-rose-400'
                              }`}
                            >
                              {runResults.verdict}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {runResults.results.filter((r) => r.passed).length} of {runResults.results.length} Tests Passed
                          </span>
                        </div>

                        {/* Compiler Diagnostic Block */}
                        {runResults.compileOutput && (
                          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 space-y-1">
                            <span className="font-bold text-[11px] block">Compiler Output:</span>
                            <pre className="text-[11px] overflow-x-auto whitespace-pre-wrap font-mono">
                              {runResults.compileOutput}
                            </pre>
                          </div>
                        )}

                        {/* Test Case Breakdown Tabs */}
                        {runResults.results.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                              {runResults.results.map((r, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveResultIndex(idx)}
                                  className={`px-2.5 py-1 rounded-md text-xs font-medium border flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                                    activeResultIndex === idx
                                      ? 'bg-[#182338] border-[#38BDF8] text-slate-100 font-bold'
                                      : 'bg-[#121929] border-[#1E293B] text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      r.passed ? 'bg-emerald-400' : 'bg-rose-400'
                                    }`}
                                  />
                                  <span>{r.name}</span>
                                </button>
                              ))}
                            </div>

                            {/* Active Case Detailed Comparison */}
                            {activeRunResult && (
                              <div
                                className={`p-3 rounded-lg border ${
                                  activeRunResult.passed
                                    ? 'bg-emerald-500/5 border-emerald-500/20'
                                    : 'bg-rose-500/5 border-rose-500/20'
                                } space-y-2`}
                              >
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="font-bold text-slate-100">{activeRunResult.name}</span>
                                  <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                                    <span>{activeRunResult.executionTimeMs} ms</span>
                                    <span>•</span>
                                    <span>{activeRunResult.memoryKb} KB</span>
                                    <span
                                      className={`font-bold px-1.5 py-0.5 rounded ${
                                        activeRunResult.passed
                                          ? 'bg-emerald-500/20 text-emerald-400'
                                          : 'bg-rose-500/20 text-rose-400'
                                      }`}
                                    >
                                      {activeRunResult.verdict}
                                    </span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                                  <div>
                                    <span className="text-[10px] text-slate-400 block mb-0.5">Input:</span>
                                    <code className="text-slate-200 bg-[#0A0F1A] p-2 rounded block overflow-x-auto border border-[#1E293B]">
                                      {activeRunResult.input}
                                    </code>
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 block mb-0.5">
                                      {activeRunResult.expectedOutput ? 'Expected Output:' : 'Output:'}
                                    </span>
                                    <code className="text-emerald-400 bg-[#0A0F1A] p-2 rounded block overflow-x-auto border border-emerald-500/20">
                                      {activeRunResult.expectedOutput || activeRunResult.actualOutput || '[No output]'}
                                    </code>
                                  </div>
                                </div>

                                {activeRunResult.expectedOutput && !activeRunResult.passed && (
                                  <div className="text-[11px] pt-1">
                                    <span className="text-[10px] text-rose-400 block mb-0.5">Actual Output:</span>
                                    <code className="text-rose-400 bg-rose-500/10 p-2 rounded block overflow-x-auto font-bold border border-rose-500/20">
                                      {activeRunResult.actualOutput || '[Empty Output]'}
                                    </code>
                                  </div>
                                )}

                                {activeRunResult.stderr && (
                                  <div className="text-[11px] text-rose-400 pt-1">
                                    <span className="text-[10px] block font-bold">Standard Error / Traceback:</span>
                                    <pre className="text-[10px] whitespace-pre-wrap font-mono bg-[#0A0F1A] p-2 rounded border border-rose-500/20">
                                      {activeRunResult.stderr}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500 text-xs">
                        Click <span className="font-bold text-[#38BDF8]">Run</span> to execute your solution against sample and custom test cases.
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: OFFICIAL JUDGING VERDICT */}
                {bottomTab === 'submission' && (
                  <div className="space-y-3">
                    {isSubmitting ? (
                      <div className="flex flex-col items-center justify-center py-8 text-slate-400 space-y-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#044E62]" />
                        <span className="text-xs">Evaluating solution against server-side official judging suite...</span>
                      </div>
                    ) : submitResult ? (
                      <div className="space-y-3">
                        {/* Big Verdict Header Card */}
                        <div
                          className={`p-4 rounded-xl border flex items-center justify-between ${
                            submitResult.verdict === 'Accepted'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
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
                                  ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                                  : 'bg-rose-500/5 border-rose-500/20 text-slate-200'
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
                                  <span className="text-[10px] text-slate-400 px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700/60">
                                    Official Case
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-2 font-mono text-[11px]">
                                <span className="text-slate-400">{res.executionTimeMs} ms</span>
                                <span
                                  className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                                    res.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
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
                      <div className="text-center py-8 text-slate-500 text-xs">
                        Click <span className="font-bold text-[#044E62]">Submit</span> to evaluate your solution against the server-side judging suite.
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
          KEYBOARD SHORTCUTS & HELP MODAL
         ========================================================================= */}
      {shortcutsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl border border-[#232F46] bg-[#0E1524] shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2536]">
              <div className="flex items-center space-x-2 text-slate-100 font-bold text-sm">
                <Keyboard className="w-4 h-4 text-[#38BDF8]" />
                <span>Keyboard Shortcuts &amp; IDE Actions</span>
              </div>
              <button
                onClick={() => setShortcutsModalOpen(false)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-[#121929] border border-[#1E293B]">
                <span className="text-slate-300">Run Code (Sample &amp; Custom Tests)</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                  Ctrl + Enter
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#121929] border border-[#1E293B]">
                <span className="text-slate-300">Submit Solution to Official Judge</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                  Ctrl + Shift + Enter
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#121929] border border-[#1E293B]">
                <span className="text-slate-300">Format Document</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                  Shift + Alt + F
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#121929] border border-[#1E293B]">
                <span className="text-slate-300">Indent / Outdent Selection</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                  Tab / Shift + Tab
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#121929] border border-[#1E293B]">
                <span className="text-slate-300">Close Workspace / Modal</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                  Escape
                </kbd>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShortcutsModalOpen(false)}
                className="px-3.5 py-1.5 rounded-md bg-[#044E62] hover:bg-[#06617A] text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
