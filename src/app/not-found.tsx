'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Code2, 
  Cpu, 
  FileCheck2, 
  Home, 
  User,
  Layers
} from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      router.push('/profile');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="max-w-xl w-full text-center space-y-7">
        {/* 404 Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs font-mono text-[var(--foreground)]">
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <span>STATUS 404 &bull; ROUTE_NOT_FOUND</span>
        </div>

        {/* Headline & Subtitle */}
        <div className="space-y-2.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-md mx-auto leading-relaxed">
            The requested resource doesn&apos;t exist or has moved. Return to your profile or jump into one of the curated prep tracks below:
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 rounded-md font-medium text-xs text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>

          <Link
            href="/profile"
            className="px-4 py-2 rounded-md font-medium text-xs text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Profile</span>
          </Link>

          <Link
            href="/"
            className="px-4 py-2 rounded-md font-medium text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center space-x-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>

        {/* Quick Prep Modules Nav Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left max-w-lg mx-auto pt-2">
          {/* DSA Practice Hub */}
          <Link
            href="/dsa"
            className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                DSA Practice Hub
              </div>
              <div className="text-[11px] text-[var(--foreground-muted)] font-mono">150 curated problems</div>
            </div>
          </Link>

          {/* Core CS Subjects */}
          <Link
            href="/core-cs"
            className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[#044E62] dark:text-[#E9DEFA] flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                Core CS Subjects
              </div>
              <div className="text-[11px] text-[var(--foreground-muted)] font-mono">15 engineering disciplines</div>
            </div>
          </Link>

          {/* Quantitative & Reasoning Aptitude */}
          <Link
            href="/aptitude"
            className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                Aptitude &amp; Reasoning
              </div>
              <div className="text-[11px] text-[var(--foreground-muted)] font-mono">26 placement modules</div>
            </div>
          </Link>

          {/* ATS Resume Checker */}
          <Link
            href="/resume-checker"
            className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] transition-all flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                ATS Resume Checker
              </div>
              <div className="text-[11px] text-[var(--foreground-muted)] font-mono">STAR analysis &amp; rubrics</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
