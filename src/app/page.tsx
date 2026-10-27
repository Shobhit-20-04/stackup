'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Cpu, 
  BookOpen, 
  FileCheck2, 
  ArrowRight, 
  ChevronRight,
  Compass,
  FolderTree
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';
import { DSA_PROBLEMS } from '@/lib/data/dsa';
import { getFastCachedUser, getCurrentUser, type UserSession } from '@/lib/auth/session';
import { getReadTopicIds, getLocalQuizAttempts } from '@/lib/services/progress';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);

  // Lazy state initializers for SSR & React 19 compliance (zero cascading renders)
  const [solvedDsaCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const stored = localStorage.getItem('stackup_solved_dsa') || localStorage.getItem('dsa_solved_ids');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed.length;
      }
    } catch {
      // ignore
    }
    return 0;
  });

  const [readTopicsCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      return getReadTopicIds().length;
    } catch {
      return 0;
    }
  });

  const [quizAttemptsCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      return getLocalQuizAttempts().length;
    } catch {
      return 0;
    }
  });

  // Load genuine auth session on mount
  useEffect(() => {
    void getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

  // Total curriculum metrics
  const totalDsaProblems = DSA_PROBLEMS.length;
  const coreCsCategories = CURRICULUM_DATA['core-cs'].categories;
  const aptitudeCategories = CURRICULUM_DATA['aptitude'].categories;
  
  const totalCoreTopics = coreCsCategories.reduce((acc, c) => acc + c.topics.length, 0);
  const totalCoreQuestions = coreCsCategories.reduce(
    (acc, c) => acc + c.topics.reduce((q, t) => q + t.questions.length, 0),
    0
  );

  const totalAptitudeTopics = aptitudeCategories.reduce((acc, c) => acc + c.topics.length, 0);
  const totalAptitudeQuestions = aptitudeCategories.reduce(
    (acc, c) => acc + c.topics.reduce((q, t) => q + t.questions.length, 0),
    0
  );

  // Categorized clusters for the Subject Catalog (MDN & roadmap.sh style)
  const curriculumClusters = useMemo(() => [
    {
      name: 'Computer Systems & Architecture',
      tag: 'Systems',
      description: 'Operating systems internals, database engines, network protocols, low-level architecture, and digital logic.',
      subjects: coreCsCategories.filter((c) => ['os', 'dbms', 'cn', 'coa', 'dld'].includes(c.id)),
    },
    {
      name: 'Software Engineering & Practical Systems',
      tag: 'Engineering',
      description: 'Distributed systems, scalable architecture, object-oriented design, version control, and C programming.',
      subjects: coreCsCategories.filter((c) => ['system-design', 'oops', 'swe-git', 'c-prog', 'dsa-core'].includes(c.id)),
    },
    {
      name: 'Theoretical Computer Science & Mathematics',
      tag: 'Foundations',
      description: 'Formal language theory, automata, compiler engineering, algorithm design, and discrete mathematics.',
      subjects: coreCsCategories.filter((c) => ['toc', 'cd', 'algo-core', 'discrete-math', 'engg-math'].includes(c.id)),
    },
    {
      name: 'Placement & Campus Aptitude',
      tag: 'Aptitude',
      description: 'Quantitative problem solving, logical deduction, verbal reasoning, and spatial comprehension.',
      subjects: aptitudeCategories,
    },
  ], [coreCsCategories, aptitudeCategories]);

  const hasActiveSession = currentUser !== null || solvedDsaCount > 0 || readTopicsCount > 0 || quizAttemptsCount > 0;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      
      {/* 1. DISTINCTIVE EDITORIAL MASTHEAD */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[11px] font-mono uppercase tracking-wider text-[var(--brand-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
              <span>StackUp • Engineering Placement &amp; Computer Science Workspace</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.12]">
              Structured technical curriculum for software placement.
            </h1>

            <p className="text-sm sm:text-base text-[var(--foreground-muted)] leading-relaxed font-normal">
              A disciplined study and interview preparation workbench. Master 150 core algorithmic patterns with multi-language code solutions, revise 15 undergraduate computer science disciplines, train on quantitative aptitude, and audit your resume against authentic applicant tracking criteria.
            </p>
          </div>

          {/* Genuine User Session or Curriculum Inventory Strip */}
          <div className="mt-8 pt-4 border-t border-[var(--border-subtle)]">
            {hasActiveSession ? (
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-[var(--brand-primary)]/30 bg-[var(--surface-card)] text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--brand-primary)]">
                    Active Study Session:
                  </span>
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {solvedDsaCount} / {totalDsaProblems} DSA Solved
                  </span>
                  <span className="text-[var(--border-subtle)]">•</span>
                  <span className="font-mono font-semibold text-[var(--foreground)]">
                    {readTopicsCount} Topics Studied
                  </span>
                  <span className="text-[var(--border-subtle)]">•</span>
                  <span className="font-mono font-semibold text-[var(--foreground)]">
                    {quizAttemptsCount} Quizzes Attempted
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="font-semibold text-xs text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Candidate Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--foreground-muted)] font-mono">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--foreground)]">Curriculum Inventory:</span>
                <span>{totalDsaProblems} Algorithmic Problems</span>
                <span className="text-[var(--border-subtle)]">•</span>
                <span>15 Core CS Subjects ({totalCoreTopics} Topics)</span>
                <span className="text-[var(--border-subtle)]">•</span>
                <span>4 Aptitude Modules ({totalAptitudeTopics} Topics)</span>
                <span className="text-[var(--border-subtle)]">•</span>
                <span>{totalCoreQuestions + totalAptitudeQuestions} Exam MCQs</span>
              </div>
            )}
          </div>

          {/* 4 CLEAR LEARNING DESTINATIONS (THE 4 CANONICAL PILLARS) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pillar 01: DSA Hub */}
            <Link
              href="/dsa"
              className="group p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--brand-primary)] hover:shadow-xs transition-all flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                    Pillar 01
                  </span>
                </div>
                <h2 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                  DSA Practice Hub
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  150 curated problems organized by algorithmic pattern. Multi-language solutions (Python, C++, Java, JS) and verified LeetCode portals.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--brand-primary)]">
                <span>Explore 150 Problems</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 02: Core CS */}
            <Link
              href="/core-cs"
              className="group p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--brand-primary)] hover:shadow-xs transition-all flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                    Pillar 02
                  </span>
                </div>
                <h2 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                  Core CS Subjects
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  15 undergraduate computer science disciplines. In-depth architectural notes on Operating Systems, DBMS, Networks, and System Design.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--brand-primary)]">
                <span>Browse 188 Topics</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 03: Aptitude */}
            <Link
              href="/aptitude"
              className="group p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--brand-primary)] hover:shadow-xs transition-all flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                    Pillar 03
                  </span>
                </div>
                <h2 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                  Aptitude &amp; Reasoning
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Campus recruitment assessments. Quantitative problem solving, logical deduction, verbal ability, and spatial aptitude with timed quizzes.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--brand-primary)]">
                <span>Practice Quizzes</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 04: ATS Resume */}
            <Link
              href="/resume-checker"
              className="group p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--brand-primary)] hover:shadow-xs transition-all flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                    Pillar 04
                  </span>
                </div>
                <h2 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                  ATS Resume Evaluator
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Automated applicant tracking system diagnostics. 7-dimension scoring, section architecture analysis, and Google XYZ bullet rewriter.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--brand-primary)]">
                <span>Audit Your Resume</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 2. STRUCTURED LEARNING PATHWAYS (roadmap.sh & The Odin Project Inspired) */}
      <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              <Compass className="w-3.5 h-3.5" />
              <span>Structured Curriculum Roadmaps</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              Linear progression from foundations to engineering interview readiness.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              Step-by-step tracks designed to build mental models and technical rigor systematically without tutorial paralysis.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Track 01 */}
            <div className="p-5 sm:p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold">
                      Track 01
                    </span>
                    <span className="text-xs font-mono text-[var(--foreground-muted)]">150 Curated Problems</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    Algorithmic Problem Solving &amp; Data Structures Roadmap
                  </h3>
                </div>
                <Link
                  href="/dsa"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <span>Open DSA Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 01</span>
                  <div className="font-semibold text-[var(--foreground)]">Linear Sequences &amp; Two Pointers</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">Arrays, Hashing, Two Pointers, Sliding Window, Linked Lists</p>
                </div>
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 02</span>
                  <div className="font-semibold text-[var(--foreground)]">Hierarchical &amp; Binary Search</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">Binary Search, Trees, BSTs, Heaps &amp; Priority Queues, Tries</p>
                </div>
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 03</span>
                  <div className="font-semibold text-[var(--foreground)]">Non-Linear &amp; Optimization</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">Graphs, Dynamic Programming, Backtracking, Intervals, Greedy</p>
                </div>
              </div>
            </div>

            {/* Track 02 */}
            <div className="p-5 sm:p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold">
                      Track 02
                    </span>
                    <span className="text-xs font-mono text-[var(--foreground-muted)]">15 Core Subjects • 188 Topics</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    Computer Systems Engineering &amp; Architecture Roadmap
                  </h3>
                </div>
                <Link
                  href="/core-cs"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)] hover:bg-[var(--surface-elevated)] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <span>Open Core CS Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 01</span>
                  <div className="font-semibold text-[var(--foreground)]">Low-Level Architecture</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">Digital Logic Design, Computer Organization, Programming in C</p>
                </div>
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 02</span>
                  <div className="font-semibold text-[var(--foreground)]">Operating Systems &amp; Databases</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">Process scheduling, synchronization, deadlocks, SQL &amp; ACID transactions</p>
                </div>
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 03</span>
                  <div className="font-semibold text-[var(--foreground)]">Networks &amp; Scalable Systems</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">TCP/IP protocol stack, DNS, distributed architecture &amp; System Design</p>
                </div>
              </div>
            </div>

            {/* Track 03 */}
            <div className="p-5 sm:p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                      Track 03
                    </span>
                    <span className="text-xs font-mono text-[var(--foreground-muted)]">Campus Placement Assessment</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    Aptitude Assessment &amp; ATS Resume Optimization
                  </h3>
                </div>
                <Link
                  href="/aptitude"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)] hover:bg-[var(--surface-elevated)] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <span>Practice Aptitude</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 01</span>
                  <div className="font-semibold text-[var(--foreground)]">Numerical &amp; Speed Math</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">Arithmetic, percentages, permutations, algebra, and data interpretation</p>
                </div>
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 02</span>
                  <div className="font-semibold text-[var(--foreground)]">Reasoning &amp; Verbal Logic</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">Analytical deduction, syllogisms, comprehension, and grammar rules</p>
                </div>
                <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[var(--foreground-muted)] uppercase">Milestone 03</span>
                  <div className="font-semibold text-[var(--foreground)]">ATS Screening Readiness</div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">Automated keyword density, measurable impact bullets &amp; layout checks</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COMPREHENSIVE TECHNICAL DIRECTORY (MDN Web Docs Inspired) */}
      <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Academic Reference Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              All 19 undergraduate subjects indexed by academic cluster.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              Every subject includes comprehensive theoretical notes, code architectures, and examination-style quizzes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculumClusters.map((cluster) => (
              <div
                key={cluster.name}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden flex flex-col justify-between"
              >
                <div className="p-5 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold">
                      {cluster.tag}
                    </span>
                    <span className="text-xs font-mono text-[var(--foreground-muted)]">
                      {cluster.subjects.length} Subjects
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--foreground)]">
                    {cluster.name}
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] mt-1">
                    {cluster.description}
                  </p>
                </div>

                <div className="p-4 divide-y divide-[var(--border-subtle)]">
                  {cluster.subjects.map((subj) => {
                    const qCount = subj.topics.reduce((acc, t) => acc + t.questions.length, 0);
                    const href = cluster.tag === 'Aptitude' ? `/aptitude#${subj.id}` : `/core-cs#${subj.id}`;
                    return (
                      <Link
                        key={subj.id}
                        href={href}
                        className="py-2.5 px-2 flex items-center justify-between hover:bg-[var(--surface-sunken)]/60 rounded transition-colors group cursor-pointer text-xs"
                      >
                        <div className="flex items-center space-x-2">
                          <ChevronRight className="w-3.5 h-3.5 text-[var(--foreground-muted)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-0.5 transition-all" />
                          <span className="font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                            {subj.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 font-mono text-[11px] text-[var(--foreground-muted)]">
                          <span>{subj.topics.length} topics</span>
                          <span>•</span>
                          <span>{qCount} MCQs</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL ATS RESUME SCORING RUBRIC */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Technical Placement Tooling</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
                Benchmark your technical resume against strict applicant tracking standards.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                Most technical resumes fail screening before an engineer reads them. StackUp tests your resume across 7 deterministic dimensions: layout structure, quantifiable bullet points, verb strength, technical skill relevance, brevity, and contact formatting.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--foreground-muted)]">
                <span className="px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--surface-sunken)]">Client-side PDF &amp; DOCX</span>
                <span className="px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--surface-sunken)]">Google XYZ Formula</span>
                <span className="px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--surface-sunken)]">Zero Data Storage</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/resume-checker"
                className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors inline-flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>Audit Resume Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
