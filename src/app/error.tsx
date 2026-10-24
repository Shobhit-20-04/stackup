'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, HelpCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client-side exception securely to console for debugging
    console.error('Unhandled route error caught by error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Error Visual Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-xs font-semibold text-rose-600 dark:text-rose-400 shadow-xs">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Application Error</span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Something unexpected occurred
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            We encountered an unexpected problem loading this section. Your progress and study data remain completely safe.
          </p>
        </div>

        {/* Error Diagnostic Digest (if present) */}
        {error?.digest && (
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto font-mono">
            Error Reference ID: <span className="text-slate-800 dark:text-zinc-200 select-all">{error.digest}</span>
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-bold text-xs text-white bg-[#0D08CB] hover:bg-[#0A06A3] shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-bold text-xs text-slate-700 dark:text-zinc-300 bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-xs transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
