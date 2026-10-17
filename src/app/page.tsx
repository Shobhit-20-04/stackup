'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Cpu, 
  Code2, 
  FileCheck2, 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'resume' | 'quiz'>('dsa');

  return (
    <div className="relative overflow-hidden min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      {/* Background Decorative Ambient Spotlight - Cosmic Glow (#8B5CF6 & #22D3EE) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[380px] bg-gradient-to-b from-[#8B5CF6]/15 via-[#22D3EE]/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section - Clean, High Contrast & Human Designed */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-8 text-center">
        {/* Release Pill with Subtle Glow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-[#1E2B4D]/80 bg-white/90 dark:bg-[#151D35]/90 backdrop-blur-md text-xs font-semibold text-slate-700 dark:text-[#E8EEFF] mb-5 shadow-xs hover:border-[#8B5CF6]/60 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="tracking-tight">StackUp • Engineering Interview Prep Platform</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
        </div>

        {/* Main Headline - High-Contrast Precision Typography */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-[#E8EEFF] max-w-3xl mx-auto leading-[1.12]">
          Crack your engineering interviews with{' '}
          <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#22D3EE] bg-clip-text text-transparent">
            structure &amp; speed
          </span>
        </h1>

        {/* Subtitle - High Readability */}
        <p className="mt-3.5 sm:mt-5 text-sm sm:text-base font-normal text-slate-600 dark:text-[#8E9FC8] max-w-xl mx-auto leading-relaxed px-1">
          Everything in one fast portal: 150+ curated DSA patterns, 15 Core CS subjects, Aptitude modules with YouTube video walkthroughs, and an ATS resume evaluator.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 max-w-xs sm:max-w-md mx-auto w-full">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-sm text-white bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-[0.98] transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-[#8B5CF6]/25 hover:shadow-[#8B5CF6]/40"
          >
            <span>Start Free Prep</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/resume-checker"
            className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-sm text-slate-900 dark:text-[#E8EEFF] bg-white dark:bg-[#151D35] hover:bg-slate-50 dark:hover:bg-[#1B2442] border border-slate-200 dark:border-[#1E2B4D] active:scale-[0.98] transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
          >
            <FileCheck2 className="w-4 h-4 text-[#8B5CF6] dark:text-[#22D3EE] shrink-0" />
            <span>Check Resume (ATS)</span>
          </Link>
        </div>

        {/* Target Company Track Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-zinc-400">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-zinc-500 mr-1">Target Companies:</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">Google</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">Amazon</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">Microsoft</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">Meta</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">Top Tech Startups</span>
        </div>
      </section>

      {/* QUICK-ACCESS DIRECTORY: THE 4 PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-3.5 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Curated Preparation Pillars</span>
          </h2>
          <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Tap to start</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: DSA Practice Hub */}
          <Link
            href="/dsa"
            className="card-hover-lift p-5 rounded-2xl border border-slate-200/90 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-200 group flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-xs">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  15 Patterns
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#E8EEFF] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                DSA Practice Hub
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-[#8E9FC8] leading-relaxed font-normal">
                150+ problems: Two Pointers, Trees, Graphs, DP with code solutions &amp; video walkthroughs.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E2B4D]/80 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#8E9FC8] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <span>Open DSA Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Core CS Subjects */}
          <Link
            href="/core-cs"
            className="card-hover-lift p-5 rounded-2xl border border-slate-200/90 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] hover:border-[#8B5CF6]/40 dark:hover:border-[#8B5CF6]/40 transition-all duration-200 group flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] dark:text-[#22D3EE] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-xs">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-[#22D3EE] border border-[#8B5CF6]/20">
                  15 Subjects
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#E8EEFF] group-hover:text-[#8B5CF6] dark:group-hover:text-[#22D3EE] transition-colors">
                Core CS Subjects
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-[#8E9FC8] leading-relaxed font-normal">
                190+ topics with notes, MCQs &amp; YouTube lectures: OS, DBMS, Networks, COA, Compilers &amp; TOC.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E2B4D]/80 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#8E9FC8] group-hover:text-[#8B5CF6] dark:group-hover:text-[#22D3EE] transition-colors">
              <span>Explore Core CS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Quantitative & Aptitude */}
          <Link
            href="/aptitude"
            className="card-hover-lift p-5 rounded-2xl border border-slate-200/90 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-200 group flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  4 Categories
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#E8EEFF] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Aptitude &amp; Logic
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-[#8E9FC8] leading-relaxed font-normal">
                Quantitative, Logical Reasoning, Verbal Ability &amp; Spatial Aptitude with timed tests and video solutions.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E2B4D]/80 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#8E9FC8] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              <span>Start Aptitude Notes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: ATS Resume Evaluator */}
          <Link
            href="/resume-checker"
            className="card-hover-lift p-5 rounded-2xl border border-slate-200/90 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] hover:border-rose-500/40 dark:hover:border-rose-500/40 transition-all duration-200 group flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-xs">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                  ATS Scoring
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#E8EEFF] group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                ATS Resume Checker
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-[#8E9FC8] leading-relaxed font-normal">
                Scan your PDF resume, detect missing engineering keywords, and get instant bullet improvements.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E2B4D]/80 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#8E9FC8] group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              <span>Scan Your Resume</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* COMPACT INTERACTIVE PREVIEW TABS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-[#151D35] border border-slate-200/90 dark:border-[#1E2B4D] rounded-3xl p-4 sm:p-6 shadow-xs">
          {/* Tab Selection Chips */}
          <div className="flex items-center space-x-2 pb-3.5 border-b border-slate-100 dark:border-[#1E2B4D]/80 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('dsa')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'dsa'
                  ? 'bg-[#8B5CF6] text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-[#0B1020] text-slate-600 dark:text-[#8E9FC8] border border-slate-200 dark:border-[#1E2B4D] hover:bg-slate-100 dark:hover:bg-[#1B2442]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>DSA Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-[#8B5CF6] text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-[#0B1020] text-slate-600 dark:text-[#8E9FC8] border border-slate-200 dark:border-[#1E2B4D] hover:bg-slate-100 dark:hover:bg-[#1B2442]'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-rose-400" />
              <span>ATS Resume Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#8B5CF6] text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-[#0B1020] text-slate-600 dark:text-[#8E9FC8] border border-slate-200 dark:border-[#1E2B4D] hover:bg-slate-100 dark:hover:bg-[#1B2442]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Quiz Preview</span>
            </button>
          </div>

          {/* Active Preview Content */}
          <div className="pt-4">
            {activeTab === 'dsa' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#E8EEFF]">Two Sum</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">Easy</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-[#1B2442] text-slate-700 dark:text-[#E8EEFF]">Arrays &amp; Hash Map</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-slate-600 dark:text-[#E8EEFF] bg-slate-100 dark:bg-[#0B1020] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-[#1E2B4D] font-mono">
                      O(n) Time • O(n) Space
                    </span>
                    <Link href="/dsa" className="px-3 py-1 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold flex items-center space-x-1 cursor-pointer shadow-xs">
                      <span>Practice in Hub</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="code-terminal-dark rounded-xl overflow-hidden border border-slate-700/60 dark:border-[#1E2B4D] shadow-md">
                  <div className="code-terminal-header flex items-center justify-between px-3.5 py-2 border-b text-[11px] font-mono">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <span className="text-[#8E9FC8] ml-2 text-[10px]">solution.py</span>
                    </div>
                    <span className="code-terminal-badge text-[10px] font-semibold uppercase px-2 py-0.5 rounded">Python 3</span>
                  </div>
                  <pre className="text-[11px] sm:text-xs font-mono p-3.5 sm:p-4 overflow-x-auto scrollbar-none leading-relaxed">
                    <code>{`def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i`}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-[#1B2442] border border-slate-700/80 dark:border-[#2D3D6E] text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-xs">
                      <span className="text-lg">88</span>
                      <span className="text-[7px] uppercase tracking-wider text-slate-400 dark:text-[#8E9FC8]">ATS</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-[#E8EEFF]">Software Engineer Resume</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">Grade A</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-[#8E9FC8] mt-0.5">16 Technical Skills Verified • 0 Formatting Issues</p>
                    </div>
                  </div>
                  <Link href="/resume-checker" className="px-3.5 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold rounded-xl transition-all self-start sm:self-center shadow-xs">
                    Try Resume Checker
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-slate-700 dark:text-zinc-300">
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                      <span>Before (Vague)</span>
                    </div>
                    &quot;Helped team build backend APIs and made services run faster.&quot;
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-slate-800 dark:text-zinc-200">
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                      <span>After (STAR Rewritten)</span>
                    </div>
                    &quot;Architected RESTful microservices in Node.js &amp; TypeScript, reducing p95 latency by 44%.&quot;
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#1B2442] text-slate-700 dark:text-[#E8EEFF] border border-slate-200 dark:border-[#1E2B4D]">
                    Operating Systems • Timed Drill
                  </span>
                  <Link href="/core-cs" className="text-xs font-semibold text-[#8B5CF6] dark:text-[#22D3EE] hover:underline">
                    View All Quizzes →
                  </Link>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#E8EEFF]">
                  Which memory region is privately allocated for each thread within a shared process?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#0B1020] text-slate-700 dark:text-[#8E9FC8] border border-slate-200 dark:border-[#1E2B4D]">A. Heap Memory</div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold flex items-center justify-between">
                    <span>B. Stack &amp; Registers</span>
                    <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">✓ Correct</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COMPACT PLACEMENT STANDARDS BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 dark:bg-[#151D35] text-white border border-slate-800 dark:border-[#1E2B4D] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#8B5CF6] dark:text-[#22D3EE]">
              <ShieldCheck className="w-4 h-4" />
              <span>Placement Ready Standards</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white dark:text-[#E8EEFF]">
              Built for Google, Amazon, Microsoft &amp; Top Tech Interviews
            </h3>
            <p className="text-xs text-slate-400 dark:text-[#8E9FC8]">
              Zero clutter, direct access to essential problem patterns, notes, and ATS metrics.
            </p>
          </div>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-[0.98] text-white text-xs font-semibold transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer shadow-md shadow-[#8B5CF6]/25"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
