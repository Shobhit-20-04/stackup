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
  Video 
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'resume' | 'quiz'>('dsa');

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Decorative Ambient Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[520px] bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 text-center">
        {/* Release / Status Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-indigo-200/80 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/50 backdrop-blur-md text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>StackUp 2.0 • All-In-One Tech Interview Platform</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 dark:text-white max-w-5xl mx-auto leading-[1.1]">
          Master tech interviews with{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-amber-500 bg-clip-text text-transparent">
            structure, speed &amp; AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Stop juggling fragmented resources. Practice curated DSA patterns, revise Core CS fundamentals, take timed aptitude quizzes, and optimize your resume with an ATS scanner.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Start Preparing Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dsa"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-sm text-zinc-800 dark:text-zinc-200 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center justify-center space-x-2"
          >
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span>Explore DSA Roadmap</span>
          </Link>
        </div>

        {/* Live Interactive Hero Showcase */}
        <div className="mt-14 max-w-4xl mx-auto bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl backdrop-blur-xl p-4 sm:p-6 overflow-hidden">
          {/* Tabs Selector */}
          <div className="flex items-center justify-center space-x-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab('dsa')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'dsa'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>DSA Problem Engine</span>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'resume'
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>ATS Resume Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'quiz'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Timed Core CS Quizzes</span>
            </button>
          </div>

          {/* Interactive Tab Content */}
          <div className="pt-6">
            {activeTab === 'dsa' && (
              <div className="bg-zinc-50 dark:bg-zinc-950/60 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-zinc-900 dark:text-white">Two Sum</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">Easy</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Arrays &amp; Hashing</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">Tested at Google, Amazon, Meta, Microsoft, Apple</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      O(n) Time / O(n) Space
                    </span>
                    <Link href="/dsa" className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 flex items-center space-x-1">
                      <span>Practice in Hub</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                  <span>Intuition: Use HashMap to store indices and check \`target - current\` on a single pass.</span>
                  <div className="flex items-center space-x-2 text-rose-500 text-xs">
                    <Video className="w-3.5 h-3.5" />
                    <span>Curated Video Included</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="bg-zinc-50 dark:bg-zinc-950/60 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20">
                      <span className="text-2xl font-black">88</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider">/ 100 ATS</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-zinc-900 dark:text-white">Senior SDE Candidate Profile</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700">Grade A</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">16 Technical Keywords Verified • 4 Quantified Metrics Found</p>
                    </div>
                  </div>
                  <Link href="/resume-checker" className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 self-start sm:self-center">
                    Try Resume Checker
                  </Link>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">STAR Rewrite: </span>
                  &quot;Architected RESTful microservices in Node.js &amp; TypeScript, cutting p95 response time by 44%.&quot;
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="bg-zinc-50 dark:bg-zinc-950/60 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300">Operating Systems</span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">Processes &amp; Threads</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">⏱️ Timed Mode</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-3 font-medium">
                  Which memory segment is privately held by each individual thread within a shared process?
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400">A. Heap Segment</div>
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold">B. Stack &amp; Registers ✓</div>
                  <div className="p-2 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400">C. Code Segment</div>
                  <div className="p-2 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400">D. Global Data Segment</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">150+</div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">High-Frequency Problems</div>
            <div className="text-[11px] text-zinc-500">Blind 75 &amp; Striver SDE sheet</div>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">5 Pillars</div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Core CS Coverage</div>
            <div className="text-[11px] text-zinc-500">OS, DBMS, CN, OOPs, System Design</div>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">85+ ATS</div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Average Pass Score</div>
            <div className="text-[11px] text-zinc-500">Industry keyword matching</div>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
            <div className="text-2xl font-black text-violet-600 dark:text-violet-400">100%</div>
            <div className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Real-Time Cloud Sync</div>
            <div className="text-[11px] text-zinc-500">Instant cross-device progress backup</div>
          </div>
        </div>
      </section>

      {/* Structured Modules Bento Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Structured Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Everything you need from resume to final round
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Engineered step-by-step so students can systematically target high-paying software engineering placements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Aptitude */}
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Step 1
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Quantitative &amp; Logical Aptitude
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Clear conceptual notes followed by timed MCQ challenges. Practice Permutations &amp; Combinations, Probability, Time &amp; Work, and Logical Reasoning with instant scorecards.
              </p>
            </div>
            <Link href="/aptitude" className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>Start Aptitude Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Core CS */}
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Step 2
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Core CS Subjects (OS, DBMS, CN)
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Review high-yield interview cheat sheets on Operating Systems (Processes, Deadlocks), DBMS (ACID, Normalization, Indexing), and Computer Networks (TCP/IP 3-Way Handshake, DNS).
              </p>
            </div>
            <Link href="/core-cs" className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>Explore Core CS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: DSA */}
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Step 3
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Curated DSA Practice Hub
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Pattern-based roadmap covering Two Pointers, Sliding Window, Binary Search, Trees, Graphs, and DP. Jump directly to LeetCode problems, Striver&apos;s SDE sheet, and video breakdowns.
              </p>
            </div>
            <Link href="/dsa" className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>View DSA Problems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: ATS Resume Checker */}
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Step 4
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                ATS Resume Evaluator
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Upload your PDF or DOCX resume. Discover missing technical keywords, detect formatting red flags, and receive instant STAR-method bullet rewrites with quantified engineering outcomes.
              </p>
            </div>
            <Link href="/resume-checker" className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>Scan Your Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5: AI Coach */}
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Always On
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Context-Aware AI Assistant
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Available on every page. Ask questions in the floating widget; the assistant automatically understands your current topic, giving tailored hints rather than generic answers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>Floating in bottom-right corner</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </div>

          {/* Card 6: Profile Analytics */}
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Progress
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Analytics &amp; Daily Streaks
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Track your study streak, visualize your score trajectory over time with interactive performance analytics, and monitor section-by-section completion to stay accountable.
              </p>
            </div>
            <Link href="/profile" className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>Go to Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Placement Preparation Standards Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 text-white border border-indigo-900/50 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Placement Ready Standards</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Curated for Top Product &amp; Tech Companies
            </h2>
            <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
              Structured problem sets, system design patterns, and ATS resume benchmarks aligned directly with hiring standards at Google, Amazon, Microsoft, and high-growth engineering teams.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-indigo-200">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">💼 Tier-1 Product Companies</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">🎯 FAANG-Ready Problem Sets</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">📑 Real Recruiter ATS Benchmarks</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">⚡ Timed Technical Mock Drills</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
