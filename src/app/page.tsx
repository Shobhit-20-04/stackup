'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Cpu, 
  BookOpen, 
  FileCheck2, 
  ArrowRight, 
  Terminal, 
  ListChecks,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';
import { DSA_PROBLEMS } from '@/lib/data/dsa';
import { getFastCachedUser, getCurrentUser, type UserSession } from '@/lib/auth/session';
import { getReadTopicIds, getLocalQuizAttempts } from '@/lib/services/progress';

export default function HomePage() {
  const [activePreviewTab, setActivePreviewTab] = useState<'dsa' | 'core-cs' | 'ats'>('dsa');
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

  // Categorized clusters for the Subject Catalog (roadmap.sh & MDN style)
  const curriculumClusters = useMemo(() => [
    {
      name: 'Computer Systems & Architecture',
      tag: 'Systems',
      description: 'Foundational operating systems, database internals, low-level architecture, and protocol stacks.',
      subjects: coreCsCategories.filter((c) => ['os', 'dbms', 'cn', 'coa', 'dld'].includes(c.id)),
    },
    {
      name: 'Software Engineering & Design',
      tag: 'Engineering',
      description: 'Distributed systems, scalable architecture, object-oriented principles, and version control workflows.',
      subjects: coreCsCategories.filter((c) => ['system-design', 'oops', 'swe-git', 'c-prog', 'dsa-core'].includes(c.id)),
    },
    {
      name: 'Theoretical Computer Science & Math',
      tag: 'Foundations',
      description: 'Formal language theory, automata, compiler construction, and discrete mathematics.',
      subjects: coreCsCategories.filter((c) => ['toc', 'cd', 'algo-core', 'discrete-math', 'engg-math'].includes(c.id)),
    },
    {
      name: 'Placement & Campus Aptitude',
      tag: 'Aptitude',
      description: 'Quantitative problem solving, logical deduction, verbal reasoning, and spatial comprehension.',
      subjects: aptitudeCategories,
    },
  ], [coreCsCategories, aptitudeCategories]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      
      {/* 1. EDITORIAL MASTHEAD & ROADMAP HUB */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Masthead Left: Authoritative Product Purpose */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[11px] font-mono uppercase tracking-wider text-[var(--brand-primary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                <span>Technical Interview &amp; Computer Science Workbench</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.12]">
                Structured engineering curriculum for software placement.
              </h1>

              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed max-w-2xl font-normal">
                StackUp is a focused preparation workbench designed for engineering students and developers. Master 150 algorithmic patterns with optimal multi-language implementations, revise 15 core undergraduate CS subjects, and audit your technical resume with transparent ATS criteria.
              </p>

              {/* Primary Directional Pathways */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/dsa"
                  className="px-4.5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-all duration-150 inline-flex items-center space-x-2 shadow-xs cursor-pointer"
                >
                  <span>Explore DSA Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/striver-sheet"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] transition-all duration-150 inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <ListChecks className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  <span>Striver SDE Sheet</span>
                </Link>
                <Link
                  href="/core-cs"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] transition-all duration-150 inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  <span>Core CS Notes</span>
                </Link>
                <Link
                  href="/resume-checker"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] transition-all duration-150 inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Audit Resume</span>
                </Link>
              </div>

              {/* Verified Session Status or Curriculum Highlights */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                {currentUser || solvedDsaCount > 0 || readTopicsCount > 0 ? (
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)]">
                      Your Active Prep Session:
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
                      {quizAttemptsCount} Quizzes Completed
                    </span>
                    <span className="text-[var(--border-subtle)]">•</span>
                    <Link href="/profile" className="text-xs font-bold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1">
                      <span>View Profile Dashboard</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--foreground-muted)]">
                    <span className="text-[11px] font-mono uppercase tracking-wider">Curriculum Scope:</span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--foreground)]">{totalDsaProblems} DSA Problems</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--foreground)]">15 Core CS Subjects ({totalCoreTopics} Topics)</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--foreground)]">4 Aptitude Modules ({totalAptitudeTopics} Topics)</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--foreground)]">{totalCoreQuestions + totalAptitudeQuestions} Exam MCQs</span>
                  </div>
                )}
              </div>
            </div>

            {/* Masthead Right: Interactive Curriculum Workbench */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs overflow-hidden">
                {/* Workbench Tab Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--foreground)]">Interactive Workbench</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[11px] font-medium">
                    <button
                      onClick={() => setActivePreviewTab('dsa')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activePreviewTab === 'dsa'
                          ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      DSA Code
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('core-cs')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activePreviewTab === 'core-cs'
                          ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      Core Notes
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('ats')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activePreviewTab === 'ats'
                          ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-bold shadow-xs'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      ATS Rubric
                    </button>
                  </div>
                </div>

                {/* Tab Content Display */}
                <div className="p-4 sm:p-5">
                  {activePreviewTab === 'dsa' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--foreground)]">Two Sum II — Two Pointers Pattern</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                          Medium • O(n) Time • O(1) Space
                        </span>
                      </div>
                      <div className="code-terminal-dark relative rounded-md p-3.5 font-mono text-xs overflow-x-auto leading-relaxed border border-[#1e2b4d] shadow-inner" style={{ backgroundColor: '#0b1020', color: '#e8eeff' }}>
                        <div className="text-slate-400"># Two Pointers: Left &amp; Right converge to target</div>
                        <div><span className="text-emerald-400 font-bold">def</span> <span className="text-blue-300 font-bold">twoSum</span><span className="text-[#e8eeff]">(numbers, target):</span></div>
                        <div className="pl-4 text-[#e8eeff]">left, right = 0, len(numbers) - 1</div>
                        <div className="pl-4 text-[#e8eeff]"><span className="text-purple-300 font-bold">while</span> left &lt; right:</div>
                        <div className="pl-8 text-[#e8eeff]">curr_sum = numbers[left] + numbers[right]</div>
                        <div className="pl-8 text-[#e8eeff]"><span className="text-purple-300 font-bold">if</span> curr_sum == target:</div>
                        <div className="pl-12 text-[#e8eeff]"><span className="text-yellow-300 font-bold">return</span> [left + 1, right + 1]</div>
                        <div className="pl-8 text-[#e8eeff]"><span className="text-purple-300 font-bold">elif</span> curr_sum &lt; target:</div>
                        <div className="pl-12 text-[#e8eeff]">left += 1</div>
                        <div className="pl-8 text-[#e8eeff]"><span className="text-purple-300 font-bold">else</span>:</div>
                        <div className="pl-12 text-[#e8eeff]">right -= 1</div>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[11px] text-[var(--foreground-muted)]">Python 3, C++, Java, TypeScript</span>
                        <Link href="/dsa/two-sum-ii" className="text-[var(--brand-primary)] font-semibold hover:underline inline-flex items-center space-x-1">
                          <span>Practice Problem</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {activePreviewTab === 'core-cs' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--foreground)]">Operating Systems: Deadlock Conditions</span>
                        <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)] font-mono text-[10px] border border-[var(--border-subtle)]">
                          GATE &amp; Interview Core
                        </span>
                      </div>
                      <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs space-y-2 text-[var(--foreground-muted)] leading-relaxed">
                        <p className="font-semibold text-[var(--foreground)]">Four Coffman Conditions (Must hold simultaneously):</p>
                        <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                          <li><strong>Mutual Exclusion:</strong> At least one resource held in non-shareable mode.</li>
                          <li><strong>Hold and Wait:</strong> Process holds resources while requesting others.</li>
                          <li><strong>No Preemption:</strong> Resources can only be released voluntarily.</li>
                          <li><strong>Circular Wait:</strong> A closed chain of processes waiting on the next.</li>
                        </ol>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[11px] text-[var(--foreground-muted)]">17 OS topics with 52 verified MCQs</span>
                        <Link href="/core-cs" className="text-[var(--brand-primary)] font-semibold hover:underline inline-flex items-center space-x-1">
                          <span>Read Full Topic Notes</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {activePreviewTab === 'ats' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--foreground)]">ATS Resume Diagnostic Rubric</span>
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-[10px] font-bold border border-rose-500/20">
                          7 Core Dimensions
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                          <span className="text-[var(--foreground)] font-medium">Technical Skill Alignment</span>
                          <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">92% Match</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                          <span className="text-[var(--foreground)] font-medium">Measurable Business Impact</span>
                          <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400">84% Metric Proof</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
                          <span className="text-[var(--foreground)] font-medium">Parser Layout &amp; Font Safety</span>
                          <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">100% Valid</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[11px] text-[var(--foreground-muted)]">In-memory client-side PDF &amp; DOCX parser</span>
                        <Link href="/resume-checker" className="text-[var(--brand-primary)] font-semibold hover:underline inline-flex items-center space-x-1">
                          <span>Upload &amp; Analyze</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STRUCTURED CURRICULUM TRACKS (roadmap.sh & The Odin Project Inspired) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)] block mb-1">
              Curriculum Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
              Three Linear Placement Preparation Tracks
            </h2>
          </div>
          <p className="text-xs text-[var(--foreground-muted)] max-w-md">
            Follow structured milestone roadmaps engineered around authentic tech hiring funnels: algorithmic patterns, undergraduate systems, and resume screening.
          </p>
        </div>

        {/* 3 Structured Track Ledger Rows */}
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] divide-y divide-[var(--border-subtle)] overflow-hidden shadow-xs">
          
          {/* Track 1: Algorithms & Data Structures */}
          <div className="p-6 sm:p-7 hover:bg-[var(--surface-sunken)]/30 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--brand-primary)] uppercase bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    Track 01
                  </span>
                  <Code2 className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  <span className="text-xs font-mono text-[var(--foreground-muted)]">150 Problems • 19 Patterns</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                  Algorithmic Problem Solving &amp; Striver SDE Sheet
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Master high-frequency interview patterns with optimal time/space complexity analysis, edge cases, and code in Python, C++, Java, and TypeScript.
                </p>
                {/* Horizontal Milestone Progression (roadmap.sh style) */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Arrays &amp; Two Pointers</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Binary Search &amp; Linked Lists</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Trees &amp; Graphs</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Dynamic Programming</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="text-left lg:text-right">
                  <div className="text-xs font-mono font-bold text-[var(--foreground)]">27 Easy • 100 Med • 23 Hard</div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">TakeUForward &amp; LeetCode Mapped</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href="/striver-sheet"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface-sunken)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--foreground)] transition-colors inline-flex items-center space-x-1.5"
                  >
                    <ListChecks className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    <span>SDE Sheet</span>
                  </Link>
                  <Link
                    href="/dsa"
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-colors inline-flex items-center space-x-1.5"
                  >
                    <span>Browse Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Track 2: Undergraduate Systems & Software Engineering */}
          <div className="p-6 sm:p-7 hover:bg-[var(--surface-sunken)]/30 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--brand-primary)] uppercase bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    Track 02
                  </span>
                  <span className="text-xs font-mono text-[var(--foreground-muted)]">15 Subjects • 221 Topics</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                  Undergraduate Computer Systems &amp; Software Design
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Concise, architectural revision summaries across Operating Systems, Database Internals, Computer Networks, and System Design with 587 verified MCQs.
                </p>
                {/* Horizontal Milestone Progression */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Operating Systems</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">DBMS &amp; SQL</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Computer Networks</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">System Design &amp; OOPs</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="text-left lg:text-right">
                  <div className="text-xs font-mono font-bold text-[var(--foreground)]">587 Exam Questions</div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">GATE &amp; Tech Interview Benchmarked</div>
                </div>
                <Link
                  href="/core-cs"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-colors inline-flex items-center space-x-1.5"
                >
                  <span>Open Core CS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Track 3: Campus Placement Aptitude & ATS Resume Screening */}
          <div className="p-6 sm:p-7 hover:bg-[var(--surface-sunken)]/30 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-rose-500 uppercase bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    Track 03
                  </span>
                  <span className="text-xs font-mono text-[var(--foreground-muted)]">4 Modules • ATS Scanner</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                  Placement Screening Drills &amp; Resume Diagnostics
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Filter tests and applicant tracking systems reject candidates before technical rounds. Drill quantitative formulas and audit your resume against authentic rubrics.
                </p>
                {/* Horizontal Milestone Progression */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Quantitative Aptitude</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Logical Deduction</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">ATS Document Audit</span>
                  <span className="text-[var(--foreground-muted)]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground)]">Google XYZ Bullets</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="text-left lg:text-right">
                  <div className="text-xs font-mono font-bold text-[var(--foreground)]">7-Dimension Rubric</div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">100% In-Memory Parsing</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href="/aptitude"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface-sunken)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--foreground)] transition-colors inline-flex items-center space-x-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    <span>Aptitude</span>
                  </Link>
                  <Link
                    href="/resume-checker"
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-colors inline-flex items-center space-x-1.5"
                  >
                    <span>Audit Resume</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. STRUCTURED SUBJECT CATALOG (MDN Web Docs Reference Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-[var(--border-subtle)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)] block mb-1">
              Curriculum Directory
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)]">
              All 19 Undergraduate Disciplines &amp; Placement Modules
            </h2>
            <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
              Organized by academic clusters with topic counts, verified exam MCQs, and direct reading access.
            </p>
          </div>
          <Link
            href="/core-cs"
            className="text-xs font-bold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1 shrink-0"
          >
            <span>Open Core CS Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Academic Clusters in Tabular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curriculumClusters.map((cluster) => (
            <div 
              key={cluster.name} 
              className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden shadow-xs flex flex-col justify-between"
            >
              {/* Cluster Header */}
              <div className="p-4 sm:px-5 sm:py-3.5 bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                    {cluster.name}
                  </h3>
                  <p className="text-[11px] text-[var(--foreground-muted)] line-clamp-1 mt-0.5">
                    {cluster.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-[var(--surface-card)] text-[var(--brand-primary)] border border-[var(--border-subtle)] shrink-0 ml-2">
                  {cluster.tag}
                </span>
              </div>

              {/* Subject List Rows */}
              <div className="divide-y divide-[var(--border-subtle)]">
                {cluster.subjects.map((subject) => {
                  const targetHref = subject.id.startsWith('quant') || subject.id.startsWith('logical') || subject.id.startsWith('verbal') || subject.id.startsWith('spatial')
                    ? '/aptitude'
                    : '/core-cs';

                  return (
                    <Link
                      key={subject.id}
                      href={targetHref}
                      className="p-3.5 sm:px-5 sm:py-3 hover:bg-[var(--surface-sunken)]/50 transition-colors flex items-center justify-between group text-xs"
                    >
                      <div className="min-w-0 pr-3">
                        <span className="font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors block truncate">
                          {subject.title}
                        </span>
                        <span className="text-[11px] text-[var(--foreground-muted)] font-mono block">
                          {subject.topics.length} Topics • {subject.topics.reduce((acc, t) => acc + t.questions.length, 0)} MCQs
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground-muted)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ATS RESUME WORKBENCH CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
              <FileCheck2 className="w-4 h-4" />
              <span>ATS Resume Scanner &amp; Diagnostics</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)]">
              Evaluate your technical resume before submitting applications.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed font-normal">
              Upload your PDF or DOCX file for in-memory text parsing. Check for ATS-safe formatting, extract technical skills against target roles, identify missing keywords, and receive fact-preserving Google XYZ bullet point recommendations.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[var(--foreground-muted)] font-medium">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero third-party sharing • Document stays in your session</span>
              </span>
              <span>•</span>
              <span className="font-mono text-[11px]">Supports PDF, DOCX, TXT up to 5MB</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/resume-checker"
              className="px-5 py-2.5 rounded-lg bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-semibold transition-colors inline-flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <span>Scan Your Resume Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
