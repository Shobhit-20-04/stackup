'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Clock, 
  Play, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Copy,
  Building2,
  Zap,
  Sparkles,
  Video,
  ExternalLink,
  Compass
} from 'lucide-react';
import type { Topic } from '@/lib/data/curriculum';
import { getCurrentUser, getFastCachedUser, type UserSession } from '@/lib/auth/session';
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
    <div className="my-5 p-4 sm:p-5 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] relative group">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--color-primary)]">
          <Zap className="w-3.5 h-3.5" />
          <span>Core Formula / Key Equation</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1 rounded text-slate-400 hover:text-[var(--color-primary)] hover:bg-[var(--surface-card)] transition-colors cursor-pointer"
          title="Copy Formula"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="text-center font-mono text-sm sm:text-base font-bold text-[var(--color-text-primary)] py-1 tracking-wide overflow-x-auto">
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
    <div className="code-terminal-dark relative group my-4 rounded-md overflow-hidden border border-[#1e2b4d] shadow-sm" style={{ backgroundColor: '#0b1020', color: '#e8eeff' }}>
      <div className="code-terminal-header flex items-center justify-between px-4 py-1.5 border-b text-[11px] font-mono text-zinc-400">
        <span>Code Snippet</span>
        <button
          onClick={handleCopyCode}
          className="flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed" {...props}>
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
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
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
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Sticky Reading Progress Top Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[var(--color-primary)] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>&larr; Back to {categoryTitle || 'Syllabus'}</span>
        </button>

        {/* Mark as Completed Button */}
        <button
          onClick={handleToggleCompleted}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs border ${
            isCompleted
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-[var(--surface-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-[var(--border-subtle)] hover:border-emerald-500'
          }`}
        >
          {isCompleted ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Completed</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Mark as Read</span>
            </>
          )}
        </button>
      </div>

      {/* Editorial Document Header (Open, architectural layout without cards-in-cards) */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--surface-sunken)] px-2.5 py-0.5 rounded border border-[var(--border-subtle)]">
            {categoryTitle || 'Curriculum'} &bull; Module Guide
          </span>

          {/* Difficulty Badge */}
          {topic.difficulty && (
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                topic.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : topic.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
              }`}
            >
              {topic.difficulty}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight">
          {topic.title}
        </h1>

        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-3xl font-normal">
          {topic.description}
        </p>

        {/* Structured Metadata & Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-[var(--border-subtle)] py-3">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--color-text-secondary)]">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>{topic.estimatedMinutes} MIN READ</span>
            </span>
            <span>&bull;</span>
            <span>{topic.questions.length} VERIFIED MCQS</span>
            {topic.companyTags && topic.companyTags.length > 0 && (
              <>
                <span>&bull;</span>
                <span className="flex items-center space-x-1">
                  <Building2 className="w-3 h-3" />
                  <span>{topic.companyTags.slice(0, 3).join(', ')}</span>
                </span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {topic.youtube_url && (
              <a
                href={topic.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
                title="Study this topic on YouTube"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Tutorial</span>
              </a>
            )}
            {topic.questions.length > 0 && (
              <button
                onClick={onStartQuiz}
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-md font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all cursor-pointer text-xs shadow-xs"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Practice Quiz ({topic.questions.length} Qs)</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Prerequisites Reference Strip (Integrated, not a floating card) */}
      {topic.prerequisites && topic.prerequisites.length > 0 && (
        <div className="p-3.5 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Recommended Foundations:</span>
          </span>
          {topic.prerequisites.map((prereq, pIdx) => (
            <span key={pIdx} className="px-2 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[11px] font-medium text-[var(--color-text-primary)]">
              {prereq}
            </span>
          ))}
        </div>
      )}

      {/* Key Takeaways & Executive Summary (Editorial Callout) */}
      {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
        <div className="p-4 sm:p-5 rounded-r-md border-l-4 border-[var(--color-primary)] bg-[var(--surface-sunken)]/50 space-y-2.5">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Yield Placement Principles &amp; Takeaways</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--color-text-secondary)]">
            {topic.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Educational Reading Column (~68ch measure for optimal readability) */}
      <main className="reading-measure max-w-3xl space-y-6">
        <article className="prose dark:prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed text-sm sm:text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-4 border-b border-[var(--border-subtle)] pb-2" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mt-7 mb-3" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mt-6 mb-2" {...props} />
              ),
              p: ({ children, ...props }) => {
                const text = String(children);
                if (text.startsWith('$$') && text.endsWith('$$')) {
                  return <FormulaBlock formula={text} />;
                }
                return <p className="my-4 text-[var(--color-text-secondary)] leading-7 font-normal" {...props}>{children}</p>;
              },
              ul: ({ ...props }) => (
                <ul className="list-disc pl-5 my-4 space-y-1.5 text-[var(--color-text-secondary)]" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal pl-5 my-4 space-y-1.5 text-[var(--color-text-secondary)]" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="leading-7 text-[var(--color-text-secondary)]" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="p-4 my-4 border-l-3 border-[var(--color-primary)] bg-[var(--surface-sunken)]/60 rounded-r-md text-[var(--color-text-primary)] font-medium not-italic" {...props} />
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className && typeof children === 'string' && !children.includes('\n');
                if (isInline) {
                  return (
                    <code className="px-1.5 py-0.5 rounded text-xs font-mono font-medium bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--color-primary)]" {...props}>
                      {children}
                    </code>
                  );
                }
                return <code className={className} {...props}>{children}</code>;
              },
              pre: ({ children, ...props }) => (
                <CodeBlockWithCopy {...props}>{children}</CodeBlockWithCopy>
              ),
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-6 rounded-md border border-[var(--border-subtle)]">
                  <table className="w-full text-left text-xs sm:text-sm divide-y divide-[var(--border-subtle)]" {...props} />
                </div>
              ),
              th: ({ ...props }) => (
                <th className="bg-[var(--surface-sunken)] p-3 font-semibold text-[var(--color-text-primary)] font-mono text-xs uppercase" {...props} />
              ),
              td: ({ ...props }) => (
                <td className="p-3 border-t border-[var(--border-subtle)] text-[var(--color-text-secondary)]" {...props} />
              ),
            }}
          >
            {displayedMarkdown}
          </ReactMarkdown>
        </article>

        {/* Locked Preview Teaser for Unauthenticated Users */}
        {isLocked && (
          <div className="mt-8 p-6 sm:p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 text-center space-y-4">
            <div className="w-10 h-10 rounded-md bg-[var(--surface-card)] text-[var(--color-primary)] flex items-center justify-center mx-auto border border-[var(--border-subtle)]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Full Study Notes &amp; Formula Cheatsheet Locked
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-md mx-auto mt-1 leading-relaxed">
                Sign in or create a free student account to unlock the full revision notes, key formulas, and timed interactive quizzes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={`/login?redirect=${encodeURIComponent(`/${sectionSlug}`)}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <span>Sign In to Unlock Full Content</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/login?redirect=${encodeURIComponent(`/${sectionSlug}`)}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--color-text-primary)] font-semibold text-xs hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        )}

        {/* Curated External Resources (Verified Free Benchmark References) */}
        {!isLocked && topic.externalResources && topic.externalResources.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                <ExternalLink className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Curated External References &amp; Readings</span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded self-start sm:self-auto">
                Verified Free Access
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topic.externalResources.map((res, rIdx) => (
                <a
                  key={rIdx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--color-primary)] transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2 text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--color-primary)] font-bold">
                        {res.provider}
                      </span>
                      <span className="text-[var(--color-text-secondary)]">
                        {res.difficulty}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                      {res.title}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--color-primary)] shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Sequential Navigation Bar */}
        {!isLocked && (
          <nav className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {prevTopic ? (
              <button
                onClick={() => onSelectTopic?.(prevTopic)}
                className="flex items-center space-x-2 p-3 rounded-md border border-[var(--border-subtle)] hover:border-[var(--color-primary)] bg-[var(--surface-card)] text-left transition-colors cursor-pointer group"
              >
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-primary)] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)]">Previous Module</div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)] truncate">{prevTopic.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextTopic ? (
              <button
                onClick={() => onSelectTopic?.(nextTopic)}
                className="flex items-center justify-end space-x-2 p-3 rounded-md border border-[var(--border-subtle)] hover:border-[var(--color-primary)] bg-[var(--surface-card)] text-right transition-colors cursor-pointer group"
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)]">Next Module</div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)] truncate">{nextTopic.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-primary)] shrink-0" />
              </button>
            ) : (
              <div />
            )}
          </nav>
        )}
      </main>
    </div>
  );
}
