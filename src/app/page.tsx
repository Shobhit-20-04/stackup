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
    <div className="relative overflow-hidden min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Background Decorative Ambient Spotlight - Gentle Single-Family Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[340px] bg-gradient-to-b from-indigo-500/10 via-slate-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section - Clean, High Contrast & Human Designed */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-8 text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur text-xs font-semibold text-slate-700 dark:text-slate-300 mb-5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span>StackUp • Engineering Interview Prep Platform</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
        </div>

        {/* Main Headline - High-Contrast Precision Typography */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-[1.15]">
          Crack your engineering interviews with{' '}
          <span className="text-indigo-600 dark:text-indigo-400">
            structure &amp; speed
          </span>
        </h1>

        {/* Subtitle - High Readability */}
        <p className="mt-3.5 sm:mt-5 text-sm sm:text-base font-normal text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed px-1">
          Everything in one fast portal: 150+ curated DSA patterns, 15 Core CS subjects, Aptitude modules with YouTube video walkthroughs, and an ATS resume evaluator.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 max-w-xs sm:max-w-md mx-auto w-full">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>Start Free Prep</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/resume-checker"
            className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
          >
            <FileCheck2 className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Check Resume (ATS)</span>
          </Link>
        </div>

        {/* Target Company Track Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Google</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Amazon</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Microsoft</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Meta</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Top Tech Startups</span>
        </div>
      </section>

      {/* QUICK-ACCESS DIRECTORY: THE 4 PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-3.5 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Curated Preparation Pillars</span>
          </h2>
          <span className="text-[11px] font-medium text-slate-500">Tap to start</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: DSA Practice Hub */}
          <Link
            href="/dsa"
            className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 group flex flex-col justify-between shadow-xs hover:shadow-sm cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                  15 Patterns
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                DSA Practice Hub
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                150+ problems: Two Pointers, Trees, Graphs, DP with code solutions &amp; video walkthroughs.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <span>Open DSA Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Core CS Subjects */}
          <Link
            href="/core-cs"
            className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 group flex flex-col justify-between shadow-xs hover:shadow-sm cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                  15 Subjects
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Core CS Subjects
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                190+ topics with notes, MCQs &amp; YouTube lectures: OS, DBMS, Networks, COA, Compilers, TOC &amp; Math.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              <span>Explore Core CS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Quantitative & Aptitude */}
          <Link
            href="/aptitude"
            className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 group flex flex-col justify-between shadow-xs hover:shadow-sm cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                  4 Categories
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Aptitude &amp; Logic
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Quantitative, Logical Reasoning, Verbal Ability &amp; Spatial Aptitude with timed tests and video solutions.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              <span>Start Aptitude Notes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: ATS Resume Evaluator */}
          <Link
            href="/resume-checker"
            className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 group flex flex-col justify-between shadow-xs hover:shadow-sm cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                  ATS Scoring
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                ATS Resume Checker
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Scan your PDF resume, detect missing engineering keywords, and get instant bullet improvements.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              <span>Scan Your Resume</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* COMPACT INTERACTIVE PREVIEW TABS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm">
          {/* Tab Selection Chips */}
          <div className="flex items-center space-x-1.5 pb-3.5 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('dsa')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'dsa'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>DSA Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>ATS Resume Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Quiz Preview</span>
            </button>
          </div>

          {/* Active Preview Content */}
          <div className="pt-4">
            {activeTab === 'dsa' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Two Sum</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">Easy</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Arrays &amp; Hash Map</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-mono">
                      O(n) Time • O(n) Space
                    </span>
                    <Link href="/dsa" className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1 cursor-pointer">
                      <span>Practice in Hub</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <pre className="text-[11px] sm:text-xs font-mono text-slate-100 bg-[#0f172a] p-3.5 sm:p-4 rounded-xl overflow-x-auto border border-slate-800 scrollbar-none leading-relaxed">
                  <code>{`def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i`}</code>
                </pre>
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-slate-800 border border-slate-700/80 text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-xs">
                      <span className="text-lg">88</span>
                      <span className="text-[7px] uppercase tracking-wider text-slate-400">ATS</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Software Engineer Resume</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">Grade A</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">16 Technical Skills Verified • 0 Formatting Issues</p>
                    </div>
                  </div>
                  <Link href="/resume-checker" className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all self-start sm:self-center shadow-xs">
                    Try Resume Checker
                  </Link>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-800 dark:text-slate-200">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">STAR Rewrite: </span>
                  &quot;Architected RESTful services in Node.js &amp; TypeScript, reducing p95 latency by 44%.&quot;
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Operating Systems • Timed Drill
                  </span>
                  <Link href="/core-cs" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    View All Quizzes →
                  </Link>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                  Which memory region is privately allocated for each thread within a shared process?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">A. Heap Memory</div>
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
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Placement Ready Standards</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Built for Google, Amazon, Microsoft &amp; Top Tech Interviews
            </h3>
            <p className="text-xs text-slate-400">
              Zero clutter, direct access to essential problem patterns, notes, and ATS metrics.
            </p>
          </div>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
