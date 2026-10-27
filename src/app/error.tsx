'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled route error caught by error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md border border-rose-500/20 bg-rose-500/10 text-xs font-mono font-medium text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>RUNTIME_EXCEPTION &bull; RECOVERABLE</span>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-sm mx-auto leading-relaxed">
            An unexpected error occurred while rendering this view. Your progress and study data are completely safe.
          </p>
        </div>

        {/* Diagnostic Digest */}
        {error?.digest && (
          <div className="p-2.5 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[11px] text-[var(--foreground-muted)] font-mono max-w-xs mx-auto">
            Digest: <span className="text-[var(--foreground)] select-all">{error.digest}</span>
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <button
            onClick={() => reset()}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md font-medium text-xs text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md font-medium text-xs text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
