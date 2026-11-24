'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Cpu, 
  FileCheck2, 
  Flame, 
  ArrowRight, 
  ChevronRight, 
  BrainCircuit, 
  Sparkles, 
  Clock, 
  Check
} from 'lucide-react';
import { getProblemOfTheDay, type DsaProblem } from '@/lib/data/dsa';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// Representative high-frequency patterns for the interactive matrix
const FEATURED_PATTERNS = [
  {
    name: 'Two Pointers',
    description: 'Use two converging or parallel pointers to search pairs in sorted sequences in O(N) time with O(1) space.',
    sampleProblemId: 'dsa-11',
    sampleTitle: 'Container With Most Water',
    difficulty: 'Medium',
    keyInvariant: 'Shrink boundaries by moving the pointer with smaller height to explore higher potential areas.',
  },
  {
    name: 'Sliding Window',
    description: 'Maintain a dynamic contiguous subarray to find optimal ranges, longest unique substrings, or bounded sums.',
    sampleProblemId: 'dsa-3',
    sampleTitle: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    keyInvariant: 'Expand right pointer to discover candidates; advance left pointer only when constraints are violated.',
  },
  {
    name: 'Binary Search',
    description: 'Cut search spaces in half on monotonically ordered domains, rotated arrays, or monotonic answer spaces.',
    sampleProblemId: 'dsa-33',
    sampleTitle: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    keyInvariant: 'At least one half of the rotated array is always strictly sorted; determine target containment within that half.',
  },
  {
    name: 'Trees & BST',
    description: 'Decompose hierarchical trees through DFS recursion or BFS level-order traversal with queue structures.',
    sampleProblemId: 'dsa-102',
    sampleTitle: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    keyInvariant: 'Process nodes batch-by-batch by capturing current queue length before expanding child references.',
  },
  {
    name: 'Graphs & BFS/DFS',
    description: 'Model network topologies, course dependencies, matrix grids, and connectivity with visited sets.',
    sampleProblemId: 'dsa-200',
    sampleTitle: 'Number of Islands',
    difficulty: 'Medium',
    keyInvariant: 'Mutate visited land cells in-place or record coordinates in a set to prevent infinite cycles.',
  },
  {
    name: 'Dynamic Programming',
    description: 'Break complex optimization problems into overlapping subproblems with memoized state transitions.',
    sampleProblemId: 'dsa-300',
    sampleTitle: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    keyInvariant: 'State dp[i] represents length of longest subsequence ending at index i.',
  },
];

// High-frequency core computer science interview topics
const CORE_CS_HIGHLIGHTS = [
  {
    subject: 'Operating Systems',
    topic: 'Process vs Thread & Context Switching',
    insight: 'Processes own isolated virtual address spaces; threads share memory within the same process, requiring synchronization.',
    href: '/core-cs#operating-systems',
  },
  {
    subject: 'Operating Systems',
    topic: 'Deadlock: The 4 Coffman Conditions',
    insight: 'Mutual exclusion, hold and wait, no preemption, and circular wait. Breaking any single condition prevents deadlock entirely.',
    href: '/core-cs#operating-systems',
  },
  {
    subject: 'DBMS',
    topic: 'ACID Properties & Transaction Isolation',
    insight: 'Atomicity, Consistency, Isolation, Durability. Isolation levels (Read Uncommitted to Serializable) balance throughput and anomalies.',
    href: '/core-cs#database-management-systems',
  },
  {
    subject: 'DBMS',
    topic: 'B+ Tree Indexing vs Hash Indexing',
    insight: 'B+ Trees store records in sorted leaf nodes, enabling efficient O(log N) range scans; Hash indexes only support O(1) exact equality.',
    href: '/core-cs#database-management-systems',
  },
  {
    subject: 'Computer Networks',
    topic: 'TCP 3-Way Handshake & Connection Teardown',
    insight: 'SYN -> SYN-ACK -> ACK ensures bidirectional sequence number synchronization before application data flows.',
    href: '/core-cs#computer-networks',
  },
  {
    subject: 'System Design',
    topic: 'Horizontal Scaling, Caching & CAP Theorem',
    insight: 'Distribute load across stateless nodes, cache hot data in Redis/Memcached, and balance Consistency vs Availability during network partitions.',
    href: '/core-cs#system-design',
  },
];

export default function HomePage() {
  const [potd, setPotd] = useState<DsaProblem>(() => getProblemOfTheDay());
  const [msUntilReset, setMsUntilReset] = useState<number>(0);
  const [activePatternIndex, setActivePatternIndex] = useState<number>(0);

  useEffect(() => {
    // Fetch POTD with real-time midnight IST calculation
    fetch('/api/dsa/potd')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.problem) {
          setPotd(data.problem);
          if (data.msUntilMidnight) setMsUntilReset(data.msUntilMidnight);
        }
      })
      .catch(() => {});
  }, []);

  // Live countdown timer until Midnight IST
  useEffect(() => {
    if (!msUntilReset) return;
    const timer = setInterval(() => {
      setMsUntilReset((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [msUntilReset]);

  const countdownText = useMemo(() => {
    if (!msUntilReset) return null;
    const totalSec = Math.floor(msUntilReset / 1000);
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }, [msUntilReset]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors selection:bg-[var(--brand-primary)] selection:text-white">
      
      {/* ================================================================= */}
      {/* 1. HERO MASTHEAD: FOCUSED TECHNICAL LEARNING                      */}
      {/* ================================================================= */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20 pt-16 pb-18 sm:pt-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#D6EEE6] text-[#103F45] border border-[#A7D7C5]/50">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical Interview Preparation &amp; Engineering Workspace</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--foreground)] leading-[1.12]">
              Systematic interview preparation for engineering students.
            </h1>

            <p className="text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed font-normal">
              No generic AI dashboards. No disconnected cards. StackUp provides a focused, deliberate workspace to master 150 curated DSA patterns, revise 15 core computer science subjects, drill campus aptitude rounds, and benchmark your resume.
            </p>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/practice/potd"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all flex items-center space-x-2 shadow-xs cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Solve Today&apos;s Challenge (POTD)</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href="/dsa"
              className="px-5 py-3 rounded-xl font-bold text-sm text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all flex items-center space-x-2 shadow-2xs"
            >
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>150 Curated DSA Sheet</span>
            </Link>

            <Link
              href="/core-cs"
              className="px-5 py-3 rounded-xl font-bold text-sm text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all flex items-center space-x-2 shadow-2xs"
            >
              <Cpu className="w-4 h-4 text-sky-500" />
              <span>15 Core CS Subjects</span>
            </Link>

            <Link
              href="/resume-checker"
              className="px-5 py-3 rounded-xl font-bold text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)] transition-all flex items-center space-x-2"
            >
              <FileCheck2 className="w-4 h-4 text-amber-500" />
              <span>ATS Resume Evaluator</span>
            </Link>
          </div>

          {/* Quality Proof Reassurance */}
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--foreground-muted)]">
            <div className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>150 Curated Problems (NeetCode &amp; Striver SDE Sheet)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>235 Topics with Comprehensive Notes &amp; 710 MCQs</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>100% Free · Open-Source · Zero Paywalls</span>
            </div>
          </div>

        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. PROBLEM OF THE DAY (POTD) LIVE SHOWCASE                        */}
      {/* ================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 relative overflow-hidden space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>Daily Deliberate Practice</span>
                  </span>
                  <span className="text-xs font-mono text-[var(--foreground-muted)]">
                    Asia/Kolkata (IST)
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Today&apos;s Challenge: #{potd.id.replace('dsa-', '')}. {potd.title}
                </h2>
              </div>

              {countdownText && (
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] self-start md:self-auto text-xs">
                  <Clock className="w-4 h-4 text-[#4F46E5]" />
                  <span className="text-[var(--foreground-muted)]">Resets in:</span>
                  <span className="font-mono font-bold text-[var(--foreground)]">{countdownText}</span>
                </div>
              )}
            </div>

            {/* Problem Details Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    potd.difficulty === 'Easy'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : potd.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  }`}>
                    {potd.difficulty}
                  </span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    Pattern: {potd.pattern_tag}
                  </span>
                  {potd.companies?.slice(0, 3).map((comp) => (
                    <span
                      key={comp}
                      className="text-xs px-2 py-0.5 rounded bg-[var(--surface-card)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]"
                    >
                      {comp}
                    </span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed line-clamp-2">
                  {potd.summary || potd.description.slice(0, 160) + '...'}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap md:flex-nowrap items-center justify-start lg:justify-end gap-3">
                <Link
                  href="/practice/potd"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-colors flex items-center space-x-1.5"
                >
                  <span>POTD Calendar &amp; Hints</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/dsa?problem=${potd.id}`}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all flex items-center space-x-2 shadow-xs"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Solve in IDE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. FOUR FOUNDATIONAL PILLARS OF PREPARATION                       */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--border-subtle)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#103F45] dark:text-[#D6EEE6]">
              Platform Architecture // Complete Curriculum
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              Four pillars. Zero gaps in your preparation.
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Every major phase of technical screening and engineering recruitment is integrated into one cohesive workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1: DSA Practice */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/50 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Pillar 01
                  </span>
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[#4F46E5] transition-colors">
                    DSA Practice Hub
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  150 high-yield problems grouped by 15 algorithmic patterns. Starter code in 4 languages, multi-language solutions, test cases, and Striver SDE sheet alignment.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <Link
                  href="/dsa"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>Explore 150 Problems</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Core Computer Science */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/50 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    Pillar 02
                  </span>
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[#4F46E5] transition-colors">
                    Core CS &amp; Systems
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  15 engineering subjects including Operating Systems, DBMS, Computer Networks, System Design, and COA. 235 comprehensive topic notes and 710 practice questions.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <Link
                  href="/core-cs"
                  className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center space-x-1"
                >
                  <span>Browse 15 Subjects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: Aptitude Hub */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/50 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    Pillar 03
                  </span>
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[#4F46E5] transition-colors">
                    Aptitude Drills
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Pass campus screening rounds with dedicated modules in Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Spatial Reasoning with timed quiz modes.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <Link
                  href="/aptitude"
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-1"
                >
                  <span>Practice Aptitude</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 4: ATS Resume Evaluator */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/50 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Pillar 04
                  </span>
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[#4F46E5] transition-colors">
                    ATS Resume Evaluator
                  </h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Upload your engineering resume for instant scoring across 10 dimensions, target role matching, missing keyword detection, and quantifiable STAR bullet rewriting.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <Link
                  href="/resume-checker"
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                >
                  <span>Score Your Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. INTERACTIVE ALGORITHMIC PATTERNS EXPLORER                      */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#103F45] dark:text-[#D6EEE6]">
                Pattern-Driven Learning // Algorithms
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
                Don&apos;t memorize 500 solutions. Master 15 patterns.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                Interviews do not test memory—they test pattern recognition. Once you understand the core invariant behind a pattern, dozens of seemingly unique problems collapse into the exact same code structure.
              </p>
            </div>

            <Link
              href="/dsa"
              className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center space-x-1 shrink-0"
            >
              <span>View All 15 Patterns in DSA Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pattern Matrix Navigator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Pattern Tabs Column */}
            <div className="lg:col-span-5 space-y-2">
              {FEATURED_PATTERNS.map((p, idx) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setActivePatternIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    activePatternIndex === idx
                      ? 'bg-[var(--surface-card)] border-[#103F45] shadow-xs text-[var(--foreground)]'
                      : 'bg-transparent border-transparent hover:bg-[var(--surface-card)]/50 text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold">{p.name}</div>
                    <div className="text-xs text-[var(--foreground-muted)] line-clamp-1">{p.sampleTitle}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activePatternIndex === idx ? 'text-[#4F46E5] translate-x-1' : 'opacity-40'}`} />
                </button>
              ))}
            </div>

            {/* Pattern Detail Display */}
            {(() => {
              const active = FEATURED_PATTERNS[activePatternIndex];
              return (
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs space-y-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      <span>Pattern Invariant</span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--foreground)]">
                      {active.name} Pattern
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {active.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] space-y-2">
                    <span className="text-xs font-bold text-[var(--foreground)] block">
                      Core Mental Model:
                    </span>
                    <p className="text-xs text-[var(--foreground-muted)] leading-relaxed font-mono">
                      {active.keyInvariant}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
                    <div>
                      <span className="text-[11px] text-[var(--foreground-muted)] block">Representative Problem:</span>
                      <span className="text-sm font-bold text-[var(--foreground)]">{active.sampleTitle}</span>
                    </div>

                    <Link
                      href={`/dsa?problem=${active.sampleProblemId}`}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
                    >
                      <Code2 className="w-4 h-4" />
                      <span>Solve Pattern in IDE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. HIGH-FREQUENCY CORE CS TOPIC SNEAK PEEK                        */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--border-subtle)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#103F45] dark:text-[#D6EEE6]">
                Core Computer Science // Interview Revision
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
                High-frequency questions asked in technical rounds.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                Technical interviews test beyond coding syntax. Review complete chapter notes with architectural diagrams, tradeoffs, and exam MCQs across 15 engineering disciplines.
              </p>
            </div>

            <Link
              href="/core-cs"
              className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center space-x-1 shrink-0"
            >
              <span>Explore All 235 Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_CS_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/50 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    {item.subject}
                  </span>
                  <h3 className="text-base font-bold text-[var(--foreground)]">
                    {item.topic}
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {item.insight}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)]">
                  <Link
                    href={item.href}
                    className="text-xs font-bold text-[#103F45] dark:text-[#D6EEE6] hover:underline flex items-center space-x-1"
                  >
                    <span>Read Full Revision Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. A GENUINE NOTE FROM THE CREATOR                                */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-20 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4">
            
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#103F45] dark:text-[#D6EEE6] uppercase tracking-wider">
              <span>Why StackUp Exists</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              &quot;Interview preparation should reduce anxiety, not create it.&quot;
            </h3>

            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              Most platforms are engineered to make students feel behind. They barrage you with paywalled solution videos, fake countdown sales, and bloated 600-problem lists that trigger choice paralysis.
            </p>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              StackUp was built as a clean, honest, highly structured alternative. Everything you need to become technically confident—from pattern recognition in algorithms to operating systems internals and resume optimization—is available here, completely free, with clear explanations.
            </p>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-[var(--foreground-muted)]">
                Built by Shobhit &bull; Free, independent, and open source.
              </span>

              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/Shobhit-20-04/stackup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[var(--foreground)] hover:text-[#4F46E5] font-bold transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <span>&bull;</span>
                <Link
                  href="/dashboard"
                  className="text-[#4F46E5] hover:underline font-bold"
                >
                  Student Workspace
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. CALM, PURPOSEFUL FOOTER ENTRY POINTS                           */}
      {/* ================================================================= */}
      <footer className="py-14 bg-[var(--background)] text-center border-t border-[var(--border-subtle)]">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h4 className="text-lg font-bold text-[var(--foreground)]">
            Ready to prepare for technical interviews?
          </h4>
          <p className="text-xs text-[var(--foreground-muted)]">
            Begin with today&apos;s Problem of the Day or pick up your revision in Core CS.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/practice/potd"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all shadow-xs"
            >
              Solve Problem of the Day
            </Link>
            <Link
              href="/dsa"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all"
            >
              150 DSA Sheet
            </Link>
            <Link
              href="/core-cs"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all"
            >
              Core CS Subjects
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
