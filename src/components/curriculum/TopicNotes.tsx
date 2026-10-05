'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, Play, BookOpen, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Topic } from '@/lib/data/curriculum';
import { getCurrentUser, type UserSession } from '@/lib/auth/session';

interface TopicNotesProps {
  topic: Topic;
  sectionSlug: string;
  onStartQuiz: () => void;
}

export default function TopicNotes({ topic, sectionSlug, onStartQuiz }: TopicNotesProps) {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => {
      setCurrentUser(u);
      setAuthChecked(true);
    });
  }, []);

  // For unauthenticated users, show the first section / overview (~450 characters)
  const isLocked = authChecked && !currentUser;
  const displayedMarkdown = React.useMemo(() => {
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
    <div className="space-y-8">
      {/* Topic Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Structured Notes & Key Takeaways</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
            {topic.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {topic.description}
          </p>
          <div className="flex items-center space-x-4 mt-4 text-xs font-medium text-zinc-500">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{topic.estimatedMinutes} min read</span>
            </span>
            <span>•</span>
            <span>{topic.questions.length} MCQ Questions</span>
          </div>
        </div>

        {/* Start Quiz Action */}
        <button
          onClick={onStartQuiz}
          className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-all flex-shrink-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch Timed Quiz ({topic.questions.length} Qs)</span>
        </button>
      </div>

      {/* Markdown Content Container */}
      <div className="p-6 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden">
        <article className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-8 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-3" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-3" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-6 mb-2" {...props} />
              ),
              p: ({ ...props }) => (
                <p className="my-4 text-zinc-700 dark:text-zinc-300 leading-7" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul className="list-disc pl-6 my-4 space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal pl-6 my-4 space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="leading-7" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="p-4 my-4 border-l-4 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-r-xl text-zinc-700 dark:text-zinc-300 italic" {...props} />
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className && typeof children === 'string' && !children.includes('\n');
                if (isInline) {
                  return (
                    <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-mono text-sm" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="p-4 my-4 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-sm overflow-x-auto border border-zinc-800">
                    <code {...props}>{children}</code>
                  </pre>
                );
              },
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden" {...props} />
                </div>
              ),
              th: ({ ...props }) => (
                <th className="p-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white" {...props} />
              ),
              td: ({ ...props }) => (
                <td className="p-3 border-b border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300" {...props} />
              ),
              hr: ({ ...props }) => (
                <hr className="my-8 border-zinc-200 dark:border-zinc-800" {...props} />
              ),
            }}
          >
            {displayedMarkdown}
          </ReactMarkdown>
        </article>

        {/* Restricted Content Lock Overlay for Unauthenticated Visitors */}
        {isLocked ? (
          <div className="pt-8">
            <div className="relative rounded-3xl border border-indigo-200/60 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/70 via-white to-white dark:from-indigo-950/30 dark:via-zinc-900 dark:to-zinc-900 p-8 text-center shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/25">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                Full Study Notes & Formula Cheatsheet Locked
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
                You are previewing the introduction of this module. Sign in or create a free account to unlock the full comprehensive syllabus notes, formula derivations, key exam takeaways, and take the timed interactive quiz.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <Link
                  href={`/login?redirect=${encodeURIComponent(`/${sectionSlug}`)}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Sign In to Unlock Full Content</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/login?redirect=${encodeURIComponent(`/${sectionSlug}`)}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors"
                >
                  Create Free Account
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Full Markdown Theory</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Formula Cheat Sheets</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Timed MCQ Practice</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Bottom CTA when Authenticated */
          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-zinc-900 dark:text-white">Ready to test your comprehension?</div>
              <div className="text-xs text-zinc-500">Solve timed MCQs with instant feedback and explanations.</div>
            </div>
            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Practice Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
