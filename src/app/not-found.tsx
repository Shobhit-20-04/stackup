'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Code2, 
  Cpu, 
  BookOpen, 
  FileCheck2, 
  Home, 
  Compass 
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-[#f8fafc] dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Visual Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs text-xs font-semibold text-slate-700 dark:text-zinc-300 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Looking for a prep module?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            The page you are looking for has either moved, was renamed, or doesn&apos;t exist yet. Jump directly into one of our curated tracks below:
          </p>
        </div>

        {/* Quick Nav Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left max-w-xl mx-auto">
          <Link
            href="/dsa"
            className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] hover:border-emerald-500/50 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
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

          <Link
            href="/core-cs"
            className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] hover:border-indigo-500/50 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                Core CS Subjects
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">OS, DBMS, Networks, COA &amp; TOC</div>
            </div>
          </Link>

          <Link
            href="/aptitude"
            className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] hover:border-amber-500/50 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                Aptitude &amp; Logic
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">Quantitative, Verbal &amp; Reasoning</div>
            </div>
          </Link>

          <Link
            href="/resume-checker"
            className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] hover:border-rose-500/50 transition-all flex items-center space-x-3 group shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                ATS Resume Checker
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">Score &amp; STAR bullet rewrites</div>
            </div>
          </Link>
        </div>

        {/* Back to Home CTA */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
