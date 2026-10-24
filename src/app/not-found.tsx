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
  LayoutDashboard,
  Layers
} from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs text-xs font-semibold text-slate-700 dark:text-zinc-300 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <span>Error 404 • Resource Not Found</span>
        </div>

        {/* Headline & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved. Return to your dashboard or explore the learning tracks below:
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleGoBack}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-[#151D35] hover:bg-slate-100 dark:hover:bg-[#1E2B4D] border border-slate-200 dark:border-[#1E2B4D] shadow-xs transition-colors inline-flex items-center space-x-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            href="/dashboard"
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0D08CB] hover:bg-[#0A06A3] shadow-sm transition-all inline-flex items-center space-x-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center space-x-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>

        {/* Quick Prep Modules Nav Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto pt-2">
          {/* DSA Practice Hub */}
          <Link
            href="/dsa"
            className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] hover:border-emerald-500/50 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                DSA Practice Hub
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">150+ LeetCode problems &amp; solutions</div>
            </div>
          </Link>

          {/* Core CS Subjects */}
          <Link
            href="/core-cs"
            className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] hover:border-[#044E62]/50 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E9DEFA] dark:bg-[#044E62]/20 border border-[#DCD2EC] dark:border-[#044E62]/30 text-[#044E62] dark:text-[#E9DEFA] flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0D08CB] dark:group-hover:text-[#E9DEFA] transition-colors">
                Core CS Subjects
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">15 disciplines: OS, DBMS, Networks, TOC</div>
            </div>
          </Link>

          {/* Quantitative & Reasoning Aptitude */}
          <Link
            href="/aptitude"
            className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] hover:border-amber-500/50 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                Aptitude &amp; Reasoning
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">26 placement tracks with timed MCQs</div>
            </div>
          </Link>

          {/* ATS Resume Checker */}
          <Link
            href="/resume-checker"
            className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] hover:border-rose-500/50 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                ATS Resume Checker
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">PDF &amp; DOCX parser, keyword match, and STAR rewrites</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
