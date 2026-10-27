'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Cpu, 
  BookOpen, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Search,
  Filter,
  Check,
  Zap,
  Compass
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';
import { DSA_PROBLEMS } from '@/lib/data/dsa';
import { getFastCachedUser, getCurrentUser, type UserSession } from '@/lib/auth/session';
import { getReadTopicIds, getLocalQuizAttempts } from '@/lib/services/progress';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  // Study progress metrics
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

  useEffect(() => {
    void getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

  const coreCsCategories = CURRICULUM_DATA['core-cs'].categories;
  const aptitudeCategories = CURRICULUM_DATA['aptitude'].categories;

  // Curriculum Stage Roadmap (roadmap.sh inspired progressive learning pipeline)
  const roadmapStages = useMemo(() => [
    {
      stage: 1,
      title: '01. Engineering Foundations',
      description: 'C programming, Discrete Mathematics, and Algorithmic Complexity analysis.',
      href: '/core-cs',
      stats: '38 Topics • 114 MCQs',
      subjects: ['Programming in C', 'Engineering Mathematics', 'Discrete Mathematics'],
    },
    {
      stage: 2,
      title: '02. Data Structures & Algorithms',
      description: 'Arrays, Two Pointers, Trees, Graphs, Dynamic Programming & LeetCode patterns.',
      href: '/dsa',
      stats: '150 Problems • 19 Categories',
      subjects: ['Arrays & Hashing', 'Trees & BST', 'Dynamic Programming', 'Graphs'],
    },
    {
      stage: 3,
      title: '03. Computer Systems & Architecture',
      description: 'Operating Systems internals, Database engines, Computer Networks, and System Design.',
      href: '/core-cs',
      stats: '60 Topics • 182 MCQs',
      subjects: ['Operating Systems', 'DBMS', 'Computer Networks', 'System Design'],
    },
    {
      stage: 4,
      title: '04. Campus Aptitude Assessments',
      description: 'Quantitative aptitude, logical deduction, verbal ability, and spatial aptitude tests.',
      href: '/aptitude',
      stats: '26 Topics • 81 MCQs',
      subjects: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'],
    },
    {
      stage: 5,
      title: '05. ATS Resume & Placement Readiness',
      description: 'Automated 7-dimension ATS resume audit, Google XYZ bullet rewriter, and interview practice.',
      href: '/resume-checker',
      stats: '7 Diagnostic Dimensions',
      subjects: ['STAR Bullet Rewriter', 'Format Scanner', 'Keyword Matching'],
    },
  ], []);

  // Filtered DSA Problem ledger sample (LeetCode style)
  const sampleProblems = useMemo(() => {
    let list = DSA_PROBLEMS;
    if (selectedDifficulty !== 'All') {
      list = list.filter((p) => p.difficulty === selectedDifficulty);
    }
    return list.slice(0, 8);
  }, [selectedDifficulty]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      
      {/* 1. TECHNICAL COMMAND CENTER MASTHEAD */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left: Core Positioning */}
            <div className="max-w-2xl space-y-3.5">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-xs font-mono text-[var(--brand-primary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                <span>STACKUP // ENGINEERING PREPARATION WORKBENCH</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.12]">
                Structured technical curriculum for software placement.
              </h1>

              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed font-normal max-w-xl">
                A disciplined developer workbench replacing fragmented tutorials. 150 algorithmic patterns with optimal multi-language solutions, 15 undergraduate computer science disciplines, campus recruitment aptitude tests, and automated ATS resume diagnostics.
              </p>

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <Link
                  href="/dsa"
                  className="px-4 py-2 rounded-md font-medium text-xs text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Start DSA Practice (150 Problems)</span>
                </Link>

                <Link
                  href="/core-cs"
                  className="px-4 py-2 rounded-md font-medium text-xs text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Core CS Disciplines (15 Subjects)</span>
                </Link>

                <Link
                  href="/resume-checker"
                  className="px-4 py-2 rounded-md font-medium text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center space-x-1"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>ATS Resume Checker &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right: Live Telemetry & Progress Box */}
            <div className="lg:w-80 p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4 shrink-0 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[var(--brand-primary)]">
                  {currentUser ? 'Student Session' : 'Platform Inventory'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  {currentUser ? 'Authenticated' : 'Open Access'}
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground-muted)]">DSA Solved</span>
                  <span className="font-bold text-[var(--foreground)]">{solvedDsaCount} / {DSA_PROBLEMS.length}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-sunken)] overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${Math.min(100, (solvedDsaCount / DSA_PROBLEMS.length) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[var(--foreground-muted)]">Core CS Topics Read</span>
                  <span className="font-bold text-[var(--foreground)]">{readTopicsCount} Topics</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground-muted)]">Exam MCQs Attempted</span>
                  <span className="font-bold text-[var(--foreground)]">{quizAttemptsCount} Attempts</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                <Link
                  href="/profile"
                  className="font-medium text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Open Full Candidate Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROGRESSIVE LEARNING ROADMAP (roadmap.sh & The Odin Project Inspired) */}
      <section className="py-12 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                <Compass className="w-3.5 h-3.5" />
                <span>Curriculum Progression Pipeline</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight mt-1">
                Linear milestone roadmap from foundations to placement.
              </h2>
            </div>
            <p className="text-xs text-[var(--foreground-muted)] max-w-sm">
              Follow each sequential stage to prevent tutorial traps and guarantee syllabus coverage.
            </p>
          </div>

          {/* Sequential Stage Navigator Strip */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
            {roadmapStages.map((stage) => {
              const isActive = activeStage === stage.stage;
              return (
                <button
                  key={stage.stage}
                  onClick={() => setActiveStage(stage.stage)}
                  className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isActive
                      ? 'border-[var(--brand-primary)] bg-[var(--surface-card)] shadow-xs ring-1 ring-[var(--brand-primary)]/20'
                      : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 hover:bg-[var(--surface-card)] text-[var(--foreground-muted)]'
                  }`}
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] block">
                      Stage 0{stage.stage}
                    </span>
                    <h3 className={`text-xs font-bold mt-0.5 ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]'}`}>
                      {stage.title.split('. ')[1]}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--foreground-muted)]">
                    {stage.stats.split(' • ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Drawer */}
          {(() => {
            const currentStage = roadmapStages.find((s) => s.stage === activeStage) || roadmapStages[0];
            return (
              <div className="p-5 sm:p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--surface-sunken)] text-[var(--brand-primary)] border border-[var(--border-subtle)]">
                      MILESTONE {currentStage.stage} OF 5
                    </span>
                    <span className="text-xs font-mono text-[var(--foreground-muted)]">{currentStage.stats}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight">
                    {currentStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                    {currentStage.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentStage.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    href={currentStage.href}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-md text-xs font-semibold bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Launch Milestone Tracks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 3. DUAL ENGINEERING WORKBENCH (LeetCode Problem Index & MDN Subject Directory) */}
      <section className="py-12 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: LeetCode-Inspired Problem Ledger */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)] flex items-center space-x-2">
                    <Code2 className="w-4 h-4 text-[var(--brand-primary)]" />
                    <span>Algorithmic Problem Index</span>
                  </h2>
                  <p className="text-[11px] text-[var(--foreground-muted)]">
                    Curated patterns with multi-language code drawers and verified LeetCode portals.
                  </p>
                </div>

                {/* Difficulty Filters */}
                <div className="inline-flex rounded-md p-0.5 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs font-medium">
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                        selectedDifficulty === diff
                          ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Rows Table */}
              <div className="border border-[var(--border-subtle)] rounded-lg overflow-hidden bg-[var(--surface-card)] divide-y divide-[var(--border-subtle)]">
                {sampleProblems.map((prob) => (
                  <div
                    key={prob.id}
                    className="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-[var(--surface-sunken)]/60 transition-colors"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] text-[var(--foreground-muted)]">#{prob.id}</span>
                        <Link
                          href={`/dsa?problem=${prob.id}`}
                          className="text-xs font-bold text-[var(--foreground)] hover:text-[var(--brand-primary)] transition-colors truncate"
                        >
                          {prob.title}
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-[var(--foreground-muted)]">
                        <span>{prob.pattern_tag}</span>
                        <span>&bull;</span>
                        <span
                          className={`font-semibold font-mono text-[10px] ${
                            prob.difficulty === 'Easy'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : prob.difficulty === 'Medium'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <Link
                        href={`/dsa?problem=${prob.id}`}
                        className="px-2.5 py-1 rounded text-xs font-medium border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-card)] text-[var(--foreground)] transition-colors cursor-pointer"
                      >
                        Solve
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-[var(--foreground-muted)] font-mono text-[11px]">
                  Showing {sampleProblems.length} of {DSA_PROBLEMS.length} problems
                </span>
                <Link
                  href="/dsa"
                  className="font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Open Full 150-Problem DSA Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right 5 Cols: Core CS Engineering Directory */}
            <div className="lg:col-span-5 space-y-4">
              <div className="pb-2 border-b border-[var(--border-subtle)]">
                <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)] flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>Computer Science Directory</span>
                </h2>
                <p className="text-[11px] text-[var(--foreground-muted)]">
                  15 engineering disciplines with deep architectural notes and exam MCQs.
                </p>
              </div>

              {/* Grouped Subjects */}
              <div className="space-y-2.5">
                {/* Systems Cluster */}
                <div className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                    Systems &amp; Architecture
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {coreCsCategories.filter((c) => ['os', 'dbms', 'cn', 'coa', 'dld'].includes(c.id)).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/core-cs#${cat.id}`}
                        className="p-1.5 rounded hover:bg-[var(--surface-sunken)] transition-colors flex items-center justify-between text-[var(--foreground)] group"
                      >
                        <span className="font-medium truncate group-hover:text-[var(--brand-primary)]">{cat.title.split(' (')[0]}</span>
                        <span className="font-mono text-[10px] text-[var(--foreground-muted)] shrink-0 ml-1">{cat.topics.length}T</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Practical Software & Engineering */}
                <div className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                    Software &amp; Design
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {coreCsCategories.filter((c) => ['system-design', 'oops', 'swe-git', 'c-prog', 'dsa-core'].includes(c.id)).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/core-cs#${cat.id}`}
                        className="p-1.5 rounded hover:bg-[var(--surface-sunken)] transition-colors flex items-center justify-between text-[var(--foreground)] group"
                      >
                        <span className="font-medium truncate group-hover:text-[var(--brand-primary)]">{cat.title.split(' (')[0]}</span>
                        <span className="font-mono text-[10px] text-[var(--foreground-muted)] shrink-0 ml-1">{cat.topics.length}T</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Foundations & Theory */}
                <div className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                    Theory &amp; Foundations
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {coreCsCategories.filter((c) => ['toc', 'cd', 'algo-core', 'discrete-math', 'engg-math'].includes(c.id)).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/core-cs#${cat.id}`}
                        className="p-1.5 rounded hover:bg-[var(--surface-sunken)] transition-colors flex items-center justify-between text-[var(--foreground)] group"
                      >
                        <span className="font-medium truncate group-hover:text-[var(--brand-primary)]">{cat.title.split(' (')[0]}</span>
                        <span className="font-mono text-[10px] text-[var(--foreground-muted)] shrink-0 ml-1">{cat.topics.length}T</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/core-cs"
                  className="font-semibold text-xs text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Explore All 15 CS Disciplines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ATS RESUME VERIFICATION RUBRIC */}
      <section className="py-12 bg-[var(--surface-sunken)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Automated ATS Resume Diagnostics</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
                Benchmark your technical resume against strict applicant tracking standards.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                Parse `.pdf` and `.docx` engineering resumes directly in your browser. Get actionable STAR bullet rewrites, hard metric calculations, and keyword matching tailored to software roles.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px] text-[var(--foreground-muted)]">
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>STAR Rewriter</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Keyword Scan</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>7-Point Rubric</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Client-Side Parser</span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href="/resume-checker"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-md text-xs font-bold bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-colors shadow-xs cursor-pointer"
              >
                <span>Audit Your Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
