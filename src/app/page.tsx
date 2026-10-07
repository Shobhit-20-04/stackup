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
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Decorative Ambient Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[420px] sm:h-[520px] bg-gradient-to-b from-indigo-500/15 via-indigo-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section - Mobile First Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20 pb-12 sm:pb-16 text-center">
        {/* Release / Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-indigo-200/80 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/50 backdrop-blur-md text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6 sm:mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs">StackUp 2.0 • Complete Tech Interview Suite</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.15] sm:leading-[1.1]">
          Master tech interviews with{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-amber-500 bg-clip-text text-transparent">
            structure, speed &amp; AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed px-1">
          Stop juggling fragmented websites. Master curated DSA patterns, revise Core CS cheat sheets, practice timed aptitude drills, and optimize your resume with an AI ATS scanner.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto w-full">
          <Link
            href="/login"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>Start Preparing Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dsa"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold text-sm text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
          >
            <Code2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Explore DSA Roadmap</span>
          </Link>
        </div>

        {/* Quick Social Proof Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] text-zinc-500 font-medium">
          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800">
            Google
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800">
            Amazon
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800">
            Microsoft
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800">
            Meta
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800">
            Top Startups
          </span>
        </div>

        {/* Live Interactive Hero Showcase */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl backdrop-blur-xl p-4 sm:p-6 overflow-hidden">
          {/* Tabs Selector */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 pb-3.5 border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto scrollbar-none -mx-2 px-2">
            <button
              onClick={() => setActiveTab('dsa')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'dsa'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>DSA Patterns</span>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>ATS Resume</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Core CS &amp; Quizzes</span>
            </button>
          </div>

          {/* Interactive Tab Content */}
          <div className="pt-4 sm:pt-6">
            {activeTab === 'dsa' && (
              <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-left space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm shadow-emerald-500/30">
                      ✓
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">Two Sum</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">Easy</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">HashMap</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">Asked at Google, Amazon, Meta, Microsoft</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 self-start sm:self-center">
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      O(n) Time • O(n) Space
                    </span>
                    <Link href="/dsa" className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 flex items-center space-x-1 cursor-pointer">
                      <span>Practice</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Elegant Code Preview Snippet */}
                <pre className="text-[11px] sm:text-xs font-mono text-zinc-300 bg-zinc-900/90 dark:bg-black/60 p-3 sm:p-4 rounded-xl overflow-x-auto border border-zinc-800 scrollbar-none leading-relaxed">
                  <code>{`def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i`}</code>
                </pre>

                <div className="pt-1 text-xs text-zinc-600 dark:text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>Intuition: Hash map lookup enables instant element matching in 1 pass.</span>
                  <div className="flex items-center space-x-1.5 text-rose-500 text-xs shrink-0 font-medium">
                    <Video className="w-3.5 h-3.5" />
                    <span>Curated Video Included</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-left space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                      <span className="text-xl sm:text-2xl font-black">88</span>
                      <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">/ 100 ATS</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">Software Engineer Resume</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">Grade A</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">16 Verified Tech Keywords • 0 Formatting Errors</p>
                    </div>
                  </div>
                  <Link href="/resume-checker" className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 self-start sm:self-center transition-all flex items-center space-x-1.5 cursor-pointer shadow-md shadow-indigo-600/20 shrink-0">
                    <span>Try Resume Checker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant AI Bullet Rewrite:</span>
                  </div>
                  <p className="leading-relaxed">
                    &quot;Architected RESTful microservices in Node.js &amp; TypeScript, cutting p95 response time by 44% under peak load.&quot;
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-left space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300">Operating Systems</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">Processes &amp; Threads</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">⏱️ Timed Mode</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                  Which memory segment is privately held by each individual thread within a shared process?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-850/60 text-zinc-600 dark:text-zinc-400">A. Heap Segment</div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-between">
                    <span>B. Stack &amp; Registers</span>
                    <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded">✓ Correct</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-850/60 text-zinc-600 dark:text-zinc-400">C. Code Segment</div>
                  <div className="p-2.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-850/60 text-zinc-600 dark:text-zinc-400">D. Global Data Segment</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Streamlined Stats Strip */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto text-left">
          <div className="p-3.5 sm:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-xs">
            <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">150+</div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Curated Problems</div>
            <div className="text-[11px] text-zinc-500">Blind 75 &amp; Striver SDE sheet</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-xs">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">8 Pillars</div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Core CS Coverage</div>
            <div className="text-[11px] text-zinc-500">OS, DBMS, CN, OOP, Design</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-xs">
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">85+ ATS</div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Target Resume Score</div>
            <div className="text-[11px] text-zinc-500">Recruiter keyword engine</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-xs">
            <div className="text-xl sm:text-2xl font-black text-violet-600 dark:text-violet-400">100%</div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Free &amp; Cloud Synced</div>
            <div className="text-[11px] text-zinc-500">Auto-saved student profile</div>
          </div>
        </div>
      </section>

      {/* Structured Modules Bento Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 mb-2.5">
            <Target className="w-3.5 h-3.5" />
            <span>Structured Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Everything you need from resume to final round
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Follow a proven step-by-step pathway engineered for top software engineering placements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Aptitude */}
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xs group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Step 1
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                Quantitative &amp; Logical Aptitude
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Clear conceptual notes followed by timed MCQ challenges in Probability, Time &amp; Work, and Logical Reasoning.
              </p>
            </div>
            <Link href="/aptitude" className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform cursor-pointer">
              <span>Start Aptitude Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Core CS */}
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xs group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Step 2
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                Core CS Subjects (OS, DBMS, CN)
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                High-yield interview cheat sheets on Operating Systems (Deadlocks), DBMS (ACID, Normalization), and Networks (TCP/IP).
              </p>
            </div>
            <Link href="/core-cs" className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform cursor-pointer">
              <span>Explore Core CS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: DSA */}
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xs group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Step 3
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                Curated DSA Practice Hub
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                15 foundational patterns: Two Pointers, Sliding Window, Trees, Graphs, and DP with direct LeetCode and video links.
              </p>
            </div>
            <Link href="/dsa" className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform cursor-pointer">
              <span>View DSA Problems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: ATS Resume Checker */}
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xs group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Step 4
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                ATS Resume Evaluator
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Upload your PDF resume to detect missing keywords, fix formatting flaws, and receive quantified STAR rewrites.
              </p>
            </div>
            <Link href="/resume-checker" className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform cursor-pointer">
              <span>Scan Your Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5: AI Coach */}
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Always On
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                Context-Aware AI Assistant
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Floating on every page. Ask questions anytime; the assistant automatically understands your current topic and code.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>Tap bottom-right widget</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </div>

          {/* Card 6: Profile Analytics */}
          <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xs group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Tracking
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                Streaks &amp; Analytics
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Track daily study streaks, visualize score progress over time, and monitor completed syllabus modules.
              </p>
            </div>
            <Link href="/profile" className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform cursor-pointer">
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Placement Preparation Standards Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="p-6 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 text-white border border-indigo-900/50 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 mb-3 sm:mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Placement Ready Standards</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Curated for Top Product &amp; Tech Placements
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Curated problem sets, system design patterns, and ATS resume benchmarks aligned directly with hiring expectations at top-tier software companies.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] sm:text-xs font-medium text-indigo-200">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl">💼 Tier-1 Engineering Bars</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl">🎯 Curated SDE Problem Sets</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl">📑 Real Recruiter ATS Metrics</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl">⚡ Timed Mock Drills</span>
            </div>
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">Ready to accelerate your tech career?</span>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-xl bg-white text-zinc-900 text-xs font-bold hover:bg-zinc-100 transition-all flex items-center space-x-1.5 shadow-md"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
