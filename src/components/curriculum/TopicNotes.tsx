'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Clock, 
  Play, 
  BookOpen, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Copy,
  Building2,
  Zap,
  Sparkles
} from 'lucide-react';
import type { Topic } from '@/lib/data/curriculum';
import { getCurrentUser, type UserSession } from '@/lib/auth/session';
import { getReadTopicIds, toggleTopicReadStatus } from '@/lib/services/progress';

interface TopicNotesProps {
  topic: Topic;
  sectionSlug: string;
  onStartQuiz: () => void;
  categoryTitle?: string;
  onBack?: () => void;
  prevTopic?: Topic | null;
  nextTopic?: Topic | null;
  onSelectTopic?: (topic: Topic) => void;
}

// Clean LaTeX strings into crisp mathematical typography for web rendering
function cleanMathFormula(text: string): string {
  return text
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\\times/g, '×')
    .replace(/\\cap/g, '∩')
    .replace(/\\cup/g, '∪')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\neq/g, '≠')
    .replace(/\\approx/g, '≈')
    .replace(/\\pm/g, '±')
    .replace(/\\theta/g, 'θ')
    .replace(/\\pi/g, 'π')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\quad/g, '  ')
    .trim();
}

function FormulaBlock({ formula }: { formula: string }) {
  const [copied, setCopied] = useState(false);
  const formatted = cleanMathFormula(formula);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/80 dark:from-slate-900/90 dark:via-[#131c31] dark:to-indigo-950/30 border border-blue-200/60 dark:border-blue-900/40 shadow-xs relative group">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-100 dark:border-slate-800">
        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Zap className="w-3.5 h-3.5" />
          <span>Core Formula / Key Equation</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          title="Copy Formula"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="text-center font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white py-1 tracking-wide overflow-x-auto">
        {formatted}
      </div>
    </div>
  );
}

function CodeBlockWithCopy({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const text = String(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="absolute top-2.5 right-2.5 z-10">
        <button
          onClick={handleCopyCode}
          className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60"
          title="Copy Code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 scrollbar-none leading-relaxed" {...props}>
        {children}
      </pre>
    </div>
  );
}

export default function TopicNotes({ 
  topic, 
  sectionSlug, 
  onStartQuiz,
  categoryTitle,
  onBack,
  prevTopic,
  nextTopic,
  onSelectTopic
}: TopicNotesProps) {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [completedOverrides, setCompletedOverrides] = useState<Record<string, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);

  const isCompleted = completedOverrides[topic.id] ?? (
    typeof window !== 'undefined' ? getReadTopicIds().includes(topic.id) : false
  );

  useEffect(() => {
    void getCurrentUser().then((u) => {
      setCurrentUser(u);
    });
  }, []);

  // Track page reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.round((window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleCompleted = () => {
    const nextState = toggleTopicReadStatus(topic.id);
    setCompletedOverrides((prev) => ({ ...prev, [topic.id]: nextState }));
  };

  // For unauthenticated users, strictly restrict to teaser overview (~500 chars)
  const isLocked = !currentUser;
  const displayedMarkdown = useMemo(() => {
    if (!isLocked) return topic.notesMarkdown;
    // Extract preview slice
    const lines = topic.notesMarkdown.split('\n');
    let preview = '';
    for (const line of lines) {
      preview += line + '\n';
      if (preview.length > 500 && line.trim() === '') {
        break;
      }
    }
    return preview.trim() || topic.notesMarkdown.slice(0, 500);
  }, [isLocked, topic.notesMarkdown]);

  return (
    <div className="space-y-6">
      {/* Sticky Reading Progress Top Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-[#131c31] border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to {categoryTitle || 'Syllabus'}</span>
        </button>

        {/* Mark as Completed Button */}
        <button
          onClick={handleToggleCompleted}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
            isCompleted
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-white dark:bg-[#131c31] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500'
          }`}
        >
          {isCompleted ? (
            <>
              <Check className="w-4 h-4" />
              <span>Completed</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              <span>Mark as Read</span>
            </>
          )}
        </button>
      </div>

      {/* Topic Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{categoryTitle || 'Study Notes'} • Module Guide</span>
            </span>

            {/* Difficulty Badge */}
            {topic.difficulty && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  topic.difficulty === 'Easy'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : topic.difficulty === 'Medium'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                }`}
              >
                {topic.difficulty}
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {topic.description}
          </p>

          {/* Company Tags */}
          {topic.companyTags && topic.companyTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                <Building2 className="w-3 h-3" />
                <span>Interviews:</span>
              </span>
              {topic.companyTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-[#1e293b] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-3 pt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>{topic.estimatedMinutes} min read</span>
            </span>
            <span>•</span>
            <span>{topic.questions.length} MCQ Questions</span>
          </div>
        </div>

        {/* Start Quiz Action */}
        {topic.questions.length > 0 && (
          <button
            onClick={onStartQuiz}
            className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all shrink-0 cursor-pointer text-xs sm:text-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Practice Quiz ({topic.questions.length} Qs)</span>
          </button>
        )}
      </div>

      {/* Key Takeaways & Cheat Formulas Banner */}
      {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl border border-blue-200/70 dark:border-blue-900/50 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50 dark:from-[#131c31] dark:via-blue-950/20 dark:to-[#131c31] shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>High-Yield Placement Takeaways &amp; Core Principles</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {topic.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start space-x-2 bg-white/70 dark:bg-[#1e293b]/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Markdown Content Container */}
      <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm relative overflow-hidden">
        <article className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-7 mb-3.5 border-b border-slate-200 dark:border-slate-800 pb-2.5" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-6 mb-2.5" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2" {...props} />
              ),
              p: ({ children, ...props }) => {
                const text = String(children);
                // Check if this paragraph is a standalone formula block ($$...$$)
                if (text.startsWith('$$') && text.endsWith('$$')) {
                  return <FormulaBlock formula={text} />;
                }
                return <p className="my-3.5 text-slate-800 dark:text-slate-200 leading-7 font-normal" {...props}>{children}</p>;
              },
              ul: ({ ...props }) => (
                <ul className="list-disc pl-5 my-3.5 space-y-1.5 text-slate-800 dark:text-slate-200" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal pl-5 my-3.5 space-y-1.5 text-slate-800 dark:text-slate-200" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="leading-7" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="p-4 my-4 border-l-4 border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 rounded-r-2xl text-slate-800 dark:text-slate-200 font-medium not-italic" {...props} />
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className && typeof children === 'string' && !children.includes('\n');
                if (isInline) {
                  return (
                    <code className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-mono text-xs sm:text-sm font-semibold" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <CodeBlockWithCopy {...props}>
                    <code {...props}>{children}</code>
                  </CodeBlockWithCopy>
                );
              },
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-5">
                  <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden text-xs sm:text-sm" {...props} />
                </div>
              ),
              th: ({ ...props }) => (
                <th className="p-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white" {...props} />
              ),
              td: ({ ...props }) => (
                <td className="p-3 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium" {...props} />
              ),
              hr: ({ ...props }) => (
                <hr className="my-6 border-slate-200 dark:border-slate-800" {...props} />
              ),
            }}
          >
            {displayedMarkdown}
          </ReactMarkdown>
        </article>

        {/* Restricted Content Lock Overlay for Unauthenticated Visitors */}
        {isLocked ? (
          <div className="pt-8">
            <div className="relative rounded-3xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-blue-950/40 dark:via-[#131c31] dark:to-[#131c31] p-6 sm:p-8 text-center shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-blue-600/25">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Full Study Notes &amp; Formula Cheatsheet Locked
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Sign in or create a free account to unlock the full notes, formulas, and take the timed interactive quiz.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href={`/login?redirect=${encodeURIComponent(`/${sectionSlug}`)}`}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Sign In to Unlock Full Content</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/login?redirect=${encodeURIComponent(`/${sectionSlug}`)}`}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Bottom Sequential Navigation Bar */
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {prevTopic ? (
              <button
                onClick={() => onSelectTopic?.(prevTopic)}
                className="flex items-center space-x-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50 dark:bg-[#1e293b]/60 text-left transition-all cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Previous Module</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{prevTopic.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextTopic ? (
              <button
                onClick={() => onSelectTopic?.(nextTopic)}
                className="flex items-center justify-end space-x-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50 dark:bg-[#1e293b]/60 text-right transition-all cursor-pointer group"
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Next Module</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{nextTopic.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
