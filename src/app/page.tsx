'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Cpu, 
  Code2, 
  FileCheck2, 
  Bot, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  Target, 
  Award, 
  Video,
  CheckCircle2,
  TrendingUp,
  Layers,
  Zap,
  Check
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'resume' | 'quiz'>('dsa');

  return (
    <div className="relative overflow-hidden min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Background Decorative Ambient Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[360px] bg-gradient-to-b from-indigo-500/15 via-indigo-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section - Compact, High Contrast & Zero Clutter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-8 text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50/90 dark:bg-indigo-950/60 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>StackUp • Complete Tech Placement Suite</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-70 shrink-0" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white max-w-3xl mx-auto leading-[1.15]">
          Crack your engineering interviews with{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-amber-500 bg-clip-text text-transparent">
            structure &amp; speed
          </span>
        </h1>

        {/* Subtitle - High Readability */}
        <p className="mt-3.5 sm:mt-5 text-sm sm:text-base font-medium text-zinc-750 dark:text-zinc-250 max-w-xl mx-auto leading-relaxed px-1">
          Everything in one fast portal: 150+ curated DSA patterns, Core CS cheat sheets, timed aptitude tests, and an AI ATS resume scanner.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 max-w-xs sm:max-w-md mx-auto w-full">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Start Free Prep</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/resume-checker"
            className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-sm text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
          >
            <FileCheck2 className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Check Resume (ATS)</span>
          </Link>
        </div>

        {/* Social Proof Tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
          <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">Google</span>
          <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">Amazon</span>
          <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">Microsoft</span>
          <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">Meta</span>
          <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">Top Startups</span>
        </div>
      </section>

      {/* QUICK-ACCESS DIRECTORY: THE 4 PILLARS - NO SCROLLING REQUIRED */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Instant Prep Modules</span>
          </h2>
          <span className="text-[11px] font-semibold text-zinc-500">Tap to start</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: DSA Practice Hub */}
          <Link
            href="/dsa"
            className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/20 dark:border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 hover:border-emerald-500 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 transition-all group flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/25 shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  15 Patterns
                </span>
              </div>
              <h3 className="text-base font-black text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                DSA Practice Hub
              </h3>
              <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                150+ problems: Two Pointers, Trees, Graphs, DP with code solutions &amp; video links.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/50 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <span>Open DSA Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Core CS Subjects */}
          <Link
            href="/core-cs"
            className="p-4 sm:p-5 rounded-2xl border-2 border-purple-500/20 dark:border-purple-500/30 bg-purple-50/40 dark:bg-purple-950/20 hover:border-purple-500 hover:bg-purple-50/70 dark:hover:bg-purple-950/40 transition-all group flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/25 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                  8 Subjects
                </span>
              </div>
              <h3 className="text-base font-black text-zinc-950 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Core CS Subjects
              </h3>
              <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                Cheat sheets &amp; revision notes for OS, DBMS, Networks, OOP, System Design &amp; COA.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-200/60 dark:border-purple-900/50 flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-400">
              <span>Explore Core CS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Quantitative & Aptitude */}
          <Link
            href="/aptitude"
            className="p-4 sm:p-5 rounded-2xl border-2 border-amber-500/20 dark:border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-500 hover:bg-amber-50/70 dark:hover:bg-amber-950/40 transition-all group flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/25 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                  Timed Tests
                </span>
              </div>
              <h3 className="text-base font-black text-zinc-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Aptitude &amp; Logic
              </h3>
              <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                Speed drills for campus placements in Probability, Work &amp; Time, and Reasoning MCQs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/50 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
              <span>Start Aptitude Notes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: ATS Resume Evaluator */}
          <Link
            href="/resume-checker"
            className="p-4 sm:p-5 rounded-2xl border-2 border-indigo-500/20 dark:border-indigo-500/30 bg-indigo-50/40 dark:bg-indigo-950/20 hover:border-indigo-500 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 transition-all group flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/25 shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                  AI Evaluator
                </span>
              </div>
              <h3 className="text-base font-black text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                ATS Resume Checker
              </h3>
              <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                Scan your PDF resume, identify missing tech keywords, and get instant STAR bullet rewrites.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-200/60 dark:border-indigo-900/50 flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-400">
              <span>Scan Your Resume</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* COMPACT INTERACTIVE PREVIEW TABS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-250 dark:border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-sm">
          {/* Tab Selection Chips */}
          <div className="flex items-center space-x-1.5 pb-3.5 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('dsa')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'dsa'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-750'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>DSA Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-750'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>ATS Resume Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-750'
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
                    <span className="text-sm sm:text-base font-black text-zinc-950 dark:text-white">Two Sum</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">Easy</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">Arrays</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      O(n) Time • O(n) Space
                    </span>
                    <Link href="/dsa" className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer">
                      <span>Practice in Hub</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <pre className="text-[11px] sm:text-xs font-mono text-zinc-200 bg-zinc-950 dark:bg-black p-3 sm:p-4 rounded-xl overflow-x-auto border border-zinc-800 scrollbar-none leading-relaxed">
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
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center font-black shrink-0 shadow-sm">
                      <span className="text-lg">88</span>
                      <span className="text-[7px] uppercase tracking-wider">ATS</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-extrabold text-zinc-950 dark:text-white">Software Engineer Resume</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">Grade A</span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">16 Technical Skills Verified • 0 Formatting Issues</p>
                    </div>
                  </div>
                  <Link href="/resume-checker" className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all self-start sm:self-center">
                    Try Resume Checker
                  </Link>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">STAR Rewrite: </span>
                  &quot;Architected RESTful services in Node.js &amp; TypeScript, reducing p95 latency by 44%.&quot;
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                    Operating Systems • Timed Drill
                  </span>
                  <Link href="/core-cs" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    View All 40 Quizzes →
                  </Link>
                </div>
                <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                  Which memory region is privately allocated for each thread within a shared process?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">A. Heap Memory</div>
                  <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-between">
                    <span>B. Stack &amp; Registers</span>
                    <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-extrabold">✓ Correct</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COMPACT PLACEMENT STANDARDS BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <div className="p-5 sm:p-7 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Placement Ready Standards</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Prepared for Google, Amazon, Microsoft &amp; Top Tech Interviews
            </h3>
            <p className="text-xs text-zinc-400">
              Zero clutter, direct access to essential problem patterns, notes, and ATS metrics.
            </p>
          </div>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 text-xs font-extrabold hover:bg-zinc-100 transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer shadow-md"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
