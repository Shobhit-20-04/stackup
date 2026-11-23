'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Code2, 
  Cpu, 
  FileCheck2, 
  ArrowRight, 
  Clock, 
  Flame, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  FolderGit2,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';
import { getCurrentUser, type UserSession } from '@/lib/auth/session';
import { getProblemOfTheDay, DSA_PROBLEMS, type DsaProblem } from '@/lib/data/dsa';
import { getLocalQuizAttempts, type StoredAttempt } from '@/lib/services/progress';

export default function StudentWorkspaceDashboard() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [potd, setPotd] = useState<DsaProblem>(() => getProblemOfTheDay());

  const [streak] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const storedStreak = localStorage.getItem('stackup_potd_streak');
      return storedStreak ? parseInt(storedStreak, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [solvedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const storedSolved = localStorage.getItem('stackup_dsa_solved_ids');
      return storedSolved ? JSON.parse(storedSolved) : [];
    } catch {
      return [];
    }
  });

  const [lastDsaId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('stackup_dsa_last_problem');
    } catch {
      return null;
    }
  });

  const [quizAttempts] = useState<StoredAttempt[]>(() => {
    return getLocalQuizAttempts();
  });

  useEffect(() => {
    // 1. Load User Session
    getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null));

    // 2. Optional POTD API sync
    fetch('/api/dsa/potd')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.problem) setPotd(data.problem);
      })
      .catch(() => {});
  }, []);

  // Time of Day Greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Last Visited Problem Object
  const lastProblem = useMemo(() => {
    if (!lastDsaId) return null;
    return DSA_PROBLEMS.find((p) => p.id === lastDsaId) || null;
  }, [lastDsaId]);

  // Is POTD Solved?
  const isPotdSolved = solvedIds.includes(potd.id);

  // Weak Areas (Quizzes with score < 65%)
  const weakAreas = useMemo(() => {
    const map = new Map<string, StoredAttempt>();
    quizAttempts.forEach((att) => {
      if (att.percentage < 65) {
        map.set(att.topicId, att);
      }
    });
    return Array.from(map.values()).slice(0, 3);
  }, [quizAttempts]);

  // Calculated Progress Across Pillars
  const dsaProgressPercent = Math.min(100, Math.round((solvedIds.length / 150) * 100));
  const uniqueQuizzedTopics = new Set(quizAttempts.map((a) => a.topicId)).size;
  const coreCsProgressPercent = Math.min(100, Math.round((uniqueQuizzedTopics / 16) * 100));

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      {/* Workspace Header Banner */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#D6EEE6] text-[#103F45] border border-[#A7D7C5]">
                <Sparkles className="w-3.5 h-3.5 text-[#103F45]" />
                <span>Personalized Student Workspace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
                {greeting}, {user?.full_name ? user.full_name.split(' ')[0] : 'Engineer'}.
              </h1>
              <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
                Consistency beats intensity. You are building engineering intuition one concept and one problem at a time.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
                <Flame className={`w-5 h-5 ${streak > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs text-[var(--foreground-muted)] font-medium">Daily Streak</div>
                  <div className="text-sm font-bold text-[var(--foreground)]">{streak} {streak === 1 ? 'Day' : 'Days'}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
                <Code2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-xs text-[var(--foreground-muted)] font-medium">DSA Solved</div>
                  <div className="text-sm font-bold text-[var(--foreground)]">{solvedIds.length} / 150</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
                <BrainCircuit className="w-5 h-5 text-[var(--color-action-indigo)]" />
                <div>
                  <div className="text-xs text-[var(--foreground-muted)] font-medium">Quizzes Completed</div>
                  <div className="text-sm font-bold text-[var(--foreground)]">{quizAttempts.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* ROW 1: What Should I Do Today? (Primary Focus Cockpit) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)]">
                What Should I Do Today?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)]">
                Your highest-leverage actions for today, tailored to your current stage.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary Action 1: Today's Problem of the Day */}
            <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/40 transition-all duration-200 relative overflow-hidden group shadow-2xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6EEE6]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      Problem of the Day
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      potd.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : potd.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                      {potd.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[#4F46E5] transition-colors">
                    {potd.title}
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] line-clamp-2 leading-relaxed">
                    {potd.description.slice(0, 140)}...
                  </p>
                </div>

                {isPotdSolved ? (
                  <div className="shrink-0 flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Solved Today</span>
                  </div>
                ) : (
                  <div className="shrink-0 p-3 rounded-xl bg-[#103F45] text-white">
                    <Code2 className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-[var(--foreground-muted)]">
                  <span className="font-mono bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    {potd.pattern_tag}
                  </span>
                  {potd.companies?.[0] && (
                    <span>Asked at {potd.companies[0]}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href="/practice/potd"
                    className="inline-flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)] transition-colors"
                  >
                    <span>POTD Hub &bull; Calendar</span>
                  </Link>
                  <Link
                    href={`/dsa?problem=${potd.id}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all shadow-xs cursor-pointer"
                  >
                    <span>{isPotdSolved ? 'Review Solution' : 'Solve Today\'s Problem'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Primary Action 2: Resume Where You Left Off */}
            <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/40 transition-all duration-200 relative overflow-hidden group shadow-2xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2D8C8]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#103F45] dark:text-[#D6EEE6] bg-[#D6EEE6]/50 dark:bg-[#103F45]/40 px-2.5 py-0.5 rounded-md border border-[#A7D7C5]/40">
                      Where You Left Off
                    </span>
                  </div>

                  {lastProblem ? (
                    <>
                      <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[#4F46E5] transition-colors">
                        {lastProblem.title}
                      </h3>
                      <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                        Continue your coding session in {lastProblem.pattern_tag}. Your previous scratch code is preserved.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-[var(--foreground)]">
                        Start with Digital Foundations
                      </h3>
                      <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                        New to programming? Explore Stage 1: How computers execute code, memory models, and command-line basics.
                      </p>
                    </>
                  )}
                </div>

                <div className="shrink-0 p-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground-muted)]">
                  <RotateCcw className="w-6 h-6 text-[#103F45] dark:text-[#D6EEE6]" />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[var(--foreground-muted)]">
                  {lastProblem ? (
                    <span>Last viewed problem</span>
                  ) : (
                    <span>Recommended for new learners</span>
                  )}
                </div>

                {lastProblem ? (
                  <Link
                    href={`/dsa?problem=${lastProblem.id}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--foreground)] bg-[var(--surface-sunken)] hover:bg-[var(--border-subtle)] transition-colors border border-[var(--border-subtle)]"
                  >
                    <span>Resume Problem</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/learn"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[var(--foreground)] bg-[var(--surface-sunken)] hover:bg-[var(--border-subtle)] transition-colors border border-[var(--border-subtle)]"
                  >
                    <span>Open Stage 1 Foundations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ROW 2: What Can I Do in 20 Minutes? (Quick Sprints) */}
        <section className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)]">
                Have Only 20 Minutes?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)]">
              High-yield micro-sessions designed for busy days. Make measurable progress in under a third of an hour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Sprint 1: Core CS 5-Question Diagnostic */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/40 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-[#4F46E5] flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                5-Question Core CS Diagnostic
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Test your conceptual grasp of Process Synchronization &amp; Memory Paging in Operating Systems.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">~7 minutes</span>
                <Link
                  href="/core-cs"
                  className="font-bold text-[#4F46E5] hover:underline flex items-center space-x-1"
                >
                  <span>Start Quiz</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Sprint 2: 1 Easy Pattern Problem */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/40 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                Micro-DSA: Two Sum Pattern
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Re-implement Two Sum using a Hash Map to reinforce $O(N)$ lookup mechanics without hints.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">~12 minutes</span>
                <Link
                  href="/dsa?problem=dsa-1"
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>Open Editor</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Sprint 3: ATS Resume Health Check */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/40 transition-colors space-y-3">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                ATS Bullet Point Polish
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Scan your software engineering resume and check your project bullets against the Google XYZ formula.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">~5 minutes</span>
                <Link
                  href="/resume-checker"
                  className="font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center space-x-1"
                >
                  <span>Scan Resume</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ROW 3: What Needs Attention? (Adaptive Review Alerts) */}
        {weakAreas.length > 0 && (
          <section className="p-6 rounded-2xl border border-[#F2D8C8] bg-[#F2D8C8]/10 space-y-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Topics Needing a Quick Polish
              </h2>
            </div>
            <p className="text-xs text-[var(--foreground-muted)]">
              Based on your previous quiz attempts, reviewing these topics will yield the biggest confidence boost:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {weakAreas.map((att) => (
                <div
                  key={att.id}
                  className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--foreground)] truncate max-w-[150px]">
                      {att.topicTitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600">
                      {att.percentage}%
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">
                    Scored {att.score}/{att.total}. Review topic notes or retry quiz.
                  </p>
                  <Link
                    href={`/${att.sectionSlug}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-[#4F46E5] hover:underline pt-1"
                  >
                    <span>Review Topic</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ROW 4: Your Engineering Journey at a Glance */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)]">
              Your Engineering Preparation Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)]">
              A balanced engineer masters computer architecture, problem-solving, real projects, and career presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1: Digital Foundations */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">Stage 1</span>
                <Compass className="w-4 h-4 text-[#103F45] dark:text-[#D6EEE6]" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Beginner Roadmap</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                Digital literacy, terminal commands, Python syntax, and web fundamentals.
              </p>
              <div className="pt-2">
                <Link
                  href="/learn"
                  className="text-xs font-bold text-[#103F45] dark:text-[#D6EEE6] hover:underline flex items-center space-x-1"
                >
                  <span>Explore 6 Stages</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Core Computer Science */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">Stage 2</span>
                <Cpu className="w-4 h-4 text-[#4F46E5]" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Core Computer Science</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                15 subjects, 235 topics, and 710 quiz questions in OS, DBMS, Networks, and System Design.
              </p>
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-medium text-[var(--foreground-muted)]">
                  <span>Topics Evaluated</span>
                  <span>{coreCsProgressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--surface-sunken)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
                    style={{ width: `${coreCsProgressPercent}%` }}
                  />
                </div>
              </div>
              <div className="pt-1">
                <Link
                  href="/core-cs"
                  className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center space-x-1"
                >
                  <span>Open Core CS</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: DSA Practice */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">Stage 3</span>
                <Code2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">DSA Hub (150 Problems)</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                15 algorithmic patterns, Striver SDE sheet mapping, and Monaco IDE sandbox.
              </p>
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-medium text-[var(--foreground-muted)]">
                  <span>Problems Solved</span>
                  <span>{solvedIds.length} / 150</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--surface-sunken)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${dsaProgressPercent}%` }}
                  />
                </div>
              </div>
              <div className="pt-1">
                <Link
                  href="/dsa"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>Practice DSA</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Pillar 4: Portfolio Projects */}
            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">Stage 4</span>
                <FolderGit2 className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Engineering Projects</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                Production-grade project blueprints with architecture diagrams and README templates.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects"
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                >
                  <span>Browse Projects</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
