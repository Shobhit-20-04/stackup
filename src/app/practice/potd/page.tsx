'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Lightbulb, 
  Code2, 
  Award, 
  ExternalLink
} from 'lucide-react';
import { getProblemOfTheDay, DSA_PROBLEMS, type DsaProblem } from '@/lib/data/dsa';
import { getSocraticNudges } from '@/components/dsa/CodingWorkspace';

function getKolkataDateKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const getPart = (t: string) => parts.find((p) => p.type === t)?.value || '';
  return `${getPart('year')}-${getPart('month')}-${getPart('day')}`;
}

export default function ProblemOfTheDayPage() {
  const todayKey = useMemo(() => getKolkataDateKey(new Date()), []);
  const [selectedDateKey, setSelectedDateKey] = useState<string>(todayKey);
  const [currentProblem, setCurrentProblem] = useState<DsaProblem>(() => getProblemOfTheDay());
  const [solvedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('stackup_dsa_solved_ids');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [streak] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const stored = localStorage.getItem('stackup_potd_streak');
      return stored ? parseInt(stored, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [solvedDates] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const storedDates = localStorage.getItem('stackup_potd_completed_dates');
      if (storedDates) return JSON.parse(storedDates);
      const lastSolved = localStorage.getItem('stackup_potd_last_solved');
      return lastSolved ? [lastSolved] : [];
    } catch {
      return [];
    }
  });
  const [msUntilReset, setMsUntilReset] = useState<number>(0);
  const [revealedHints, setRevealedHints] = useState<{ tier1: boolean; tier2: boolean; tier3: boolean }>({
    tier1: false,
    tier2: false,
    tier3: false,
  });

  // Calendar view navigation (Year and Month)
  const [viewYear, setViewYear] = useState<number>(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(() => new Date().getMonth()); // 0-indexed

  // Fetch POTD for selectedDateKey
  useEffect(() => {
    fetch(`/api/dsa/potd?date=${selectedDateKey}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.problem) {
          setCurrentProblem(data.problem);
          if (data.msUntilMidnight) setMsUntilReset(data.msUntilMidnight);
        }
      })
      .catch(() => {
        // Fallback to local synchronous calculation
        const [y, m, d] = selectedDateKey.split('-').map(Number);
        const dt = new Date(y, m - 1, d, 12, 0, 0);
        setCurrentProblem(getProblemOfTheDay(dt));
      });
  }, [selectedDateKey]);

  const handleSelectDateKey = (dateKey: string) => {
    setSelectedDateKey(dateKey);
    setRevealedHints({ tier1: false, tier2: false, tier3: false });
  };

  // Live countdown timer until Midnight IST
  useEffect(() => {
    const timer = setInterval(() => {
      setMsUntilReset((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownText = useMemo(() => {
    const totalSec = Math.floor(msUntilReset / 1000);
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }, [msUntilReset]);

  // Calendar Day Generation
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sunday

    const days: Array<{
      dateKey: string;
      dayNumber: number;
      isToday: boolean;
      isFuture: boolean;
      isSolved: boolean;
      isSelected: boolean;
    }> = [];

    // Empty lead cells
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({
        dateKey: `pad-${i}`,
        dayNumber: 0,
        isToday: false,
        isFuture: false,
        isSolved: false,
        isSelected: false,
      });
    }

    // Actual month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dateKey === todayKey;
      const isFuture = dateKey > todayKey;
      const isSolved = solvedDates.includes(dateKey) || (isToday && solvedIds.includes(currentProblem.id));
      const isSelected = dateKey === selectedDateKey;

      days.push({
        dateKey,
        dayNumber: d,
        isToday,
        isFuture,
        isSolved,
        isSelected,
      });
    }

    return days;
  }, [viewYear, viewMonth, todayKey, selectedDateKey, solvedDates, solvedIds, currentProblem.id]);

  const monthName = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
      new Date(viewYear, viewMonth, 1)
    );
  }, [viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Is current viewed problem solved?
  const isProblemSolved = solvedIds.includes(currentProblem.id) || solvedDates.includes(selectedDateKey);

  // Socratic progressive mentor hints
  const socraticNudges = useMemo(() => {
    return getSocraticNudges(currentProblem.pattern_tag, currentProblem.title);
  }, [currentProblem.pattern_tag, currentProblem.title]);

  // Related Practice Problems (2 from the same pattern category)
  const relatedProblems = useMemo(() => {
    return DSA_PROBLEMS.filter(
      (p) => p.pattern_tag === currentProblem.pattern_tag && p.id !== currentProblem.id
    ).slice(0, 2);
  }, [currentProblem.pattern_tag, currentProblem.id]);

  // Monthly completion summary
  const monthlyCompletedCount = useMemo(() => {
    const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    return solvedDates.filter((d) => d.startsWith(monthPrefix)).length;
  }, [viewYear, viewMonth, solvedDates]);

  const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      {/* Header Banner */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>Daily Challenge &bull; Asia/Kolkata (IST)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
                Problem of the Day
              </h1>
              <p className="text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
                One curated algorithmic problem every single day. Master pattern recognition through regular, disciplined practice.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-3 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
                <Flame className={`w-5 h-5 ${streak > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                <div>
                  <div className="text-[11px] text-[var(--foreground-muted)] font-medium">Daily Streak</div>
                  <div className="text-sm font-bold text-[var(--foreground)]">{streak} {streak === 1 ? 'Day' : 'Days'}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
                <Clock className="w-5 h-5 text-[#4F46E5]" />
                <div>
                  <div className="text-[11px] text-[var(--foreground-muted)] font-medium">Resets In (00:00 IST)</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-[var(--foreground)]">{countdownText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: Featured Problem Card & Socratic Help */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary POTD Card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground-muted)]">
                    {selectedDateKey}
                  </span>
                  {selectedDateKey === todayKey && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Today&apos;s Challenge
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    currentProblem.difficulty === 'Easy'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : currentProblem.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                  {isProblemSolved && (
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Solved</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  #{currentProblem.id.replace('dsa-', '')}. {currentProblem.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    Pattern: {currentProblem.pattern_tag}
                  </span>
                  {currentProblem.companies?.slice(0, 3).map((comp) => (
                    <span
                      key={comp}
                      className="text-xs px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]"
                    >
                      {comp}
                    </span>
                  ))}
                  <span className="text-xs text-[var(--foreground-muted)] flex items-center space-x-1 ml-auto">
                    <Clock className="w-3 h-3" />
                    <span>~15 mins</span>
                  </span>
                </div>
              </div>

              {/* Description preview */}
              <div className="p-4 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line line-clamp-4">
                {currentProblem.description}
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3 text-xs">
                  {currentProblem.leetcode_url && (
                    <a
                      href={currentProblem.leetcode_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[var(--foreground-muted)] hover:text-amber-500 transition-colors"
                    >
                      <span>LeetCode</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {currentProblem.striver_url && (
                    <a
                      href={currentProblem.striver_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[var(--foreground-muted)] hover:text-rose-500 transition-colors"
                    >
                      <span>Striver Sheet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <Link
                  href={`/dsa?problem=${currentProblem.id}`}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all shadow-xs cursor-pointer"
                >
                  <Code2 className="w-4 h-4" />
                  <span>{isProblemSolved ? 'Review in IDE' : 'Solve Challenge in IDE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Socratic Nudges Card */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-[var(--foreground)]">
                  Progressive Socratic Nudges
                </h3>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Stuck on this challenge? Uncover progressive hints one tier at a time to build pattern intuition without spoiling the solution.
              </p>

              {/* Tier 1 */}
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-500 uppercase tracking-wider font-mono">
                    Tier 1 &bull; Conceptual Metaphor
                  </span>
                  <button
                    type="button"
                    onClick={() => setRevealedHints((h) => ({ ...h, tier1: !h.tier1 }))}
                    className="text-xs font-semibold text-sky-500 hover:underline cursor-pointer"
                  >
                    {revealedHints.tier1 ? 'Hide' : 'Reveal Hint 1'}
                  </button>
                </div>
                {revealedHints.tier1 ? (
                  <p className="text-xs text-[var(--foreground)] leading-relaxed">
                    {socraticNudges.metaphor}
                  </p>
                ) : (
                  <p className="text-[11px] text-[var(--foreground-muted)] italic">
                    Click reveal to see a real-world intuition for {currentProblem.pattern_tag}.
                  </p>
                )}
              </div>

              {/* Tier 2 */}
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider font-mono">
                    Tier 2 &bull; Invariant &amp; Edge Cases
                  </span>
                  <button
                    type="button"
                    onClick={() => setRevealedHints((h) => ({ ...h, tier2: !h.tier2 }))}
                    className="text-xs font-semibold text-amber-500 hover:underline cursor-pointer"
                  >
                    {revealedHints.tier2 ? 'Hide' : 'Reveal Hint 2'}
                  </button>
                </div>
                {revealedHints.tier2 ? (
                  <ul className="text-xs text-[var(--foreground)] space-y-1 list-disc list-inside">
                    {socraticNudges.invariants.map((inv, idx) => (
                      <li key={idx}>{inv}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11px] text-[var(--foreground-muted)] italic">
                    Boundary checks and questions to ask before writing loops.
                  </p>
                )}
              </div>

              {/* Tier 3 */}
              <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider font-mono">
                    Tier 3 &bull; Algorithmic Skeleton
                  </span>
                  <button
                    type="button"
                    onClick={() => setRevealedHints((h) => ({ ...h, tier3: !h.tier3 }))}
                    className="text-xs font-semibold text-emerald-500 hover:underline cursor-pointer"
                  >
                    {revealedHints.tier3 ? 'Hide' : 'Reveal Skeleton'}
                  </button>
                </div>
                {revealedHints.tier3 ? (
                  <pre className="p-3 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[11px] font-mono text-emerald-600 dark:text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {socraticNudges.skeleton}
                  </pre>
                ) : (
                  <p className="text-[11px] text-[var(--foreground-muted)] italic">
                    High-level structural blueprint without the exact final answer.
                  </p>
                )}
              </div>
            </div>

            {/* Post-Solve Mastery Reinforcement */}
            {isProblemSolved && (
              <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="text-sm font-bold">Challenge Solved! What Did This Teach You?</h3>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  You successfully executed this problem using the <strong>{currentProblem.pattern_tag}</strong> pattern. To cement this memory trace in long-term intuition, try one related problem:
                </p>

                {relatedProblems.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {relatedProblems.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/dsa?problem=${rel.id}`}
                        className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[#103F45]/40 transition-colors flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5 truncate">
                          <div className="font-bold text-[var(--foreground)] truncate">{rel.title}</div>
                          <div className="text-[11px] text-[var(--foreground-muted)]">{rel.difficulty}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground-muted)] shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT 5 COLS: Challenge Calendar & Achievements */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Monthly Calendar Card */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-[var(--foreground)]">Monthly Challenge Grid</h3>
                  <p className="text-[11px] text-[var(--foreground-muted)]">
                    {monthlyCompletedCount} of {totalDaysInMonth} Days Completed
                  </p>
                </div>

                {/* Month Navigator */}
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1 rounded-md hover:bg-[var(--surface-sunken)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
                    aria-label="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold px-2">{monthName}</span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1 rounded-md hover:bg-[var(--surface-sunken)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
                    aria-label="Next Month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[var(--foreground-muted)] uppercase tracking-wider">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {calendarDays.map((cell) => {
                  if (cell.dayNumber === 0) {
                    return <div key={cell.dateKey} className="h-8" />;
                  }

                  let cellClasses = 'border-[var(--border-subtle)] text-[var(--foreground)] hover:bg-[var(--surface-sunken)]';

                  if (cell.isSolved) {
                    cellClasses = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 font-bold';
                  } else if (cell.isToday) {
                    cellClasses = 'border-[#103F45] dark:border-[#D6EEE6] bg-[#D6EEE6]/20 font-bold';
                  } else if (cell.isFuture) {
                    cellClasses = 'border-transparent text-slate-400/40 cursor-not-allowed';
                  }

                  if (cell.isSelected) {
                    cellClasses += ' ring-2 ring-[#4F46E5] ring-offset-1';
                  }

                  return (
                    <button
                      key={cell.dateKey}
                      type="button"
                      disabled={cell.isFuture}
                      onClick={() => handleSelectDateKey(cell.dateKey)}
                      className={`h-8 rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer relative ${cellClasses}`}
                      title={`${cell.dateKey}${cell.isSolved ? ' (Solved)' : cell.isToday ? ' (Today)' : ''}`}
                    >
                      <span>{cell.dayNumber}</span>
                      {cell.isSolved && (
                        <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between text-[11px] text-[var(--foreground-muted)]">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Solved</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-[#103F45] dark:border-[#D6EEE6]" />
                  <span>Today</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full ring-2 ring-[#4F46E5]" />
                  <span>Selected</span>
                </div>
              </div>
            </div>

            {/* Streak & Achievements Card */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-[var(--foreground)]">POTD Consistency Milestones</h3>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Consistency compounds. Milestones unlock automatically as you solve daily challenges on consecutive days.
              </p>

              <div className="space-y-2.5 pt-1">
                {[
                  { name: 'First Daily Step', req: 1, desc: 'Solve your first Problem of the Day' },
                  { name: '7-Day Habit', req: 7, desc: 'Maintain a 7-day uninterrupted streak' },
                  { name: 'Fortnight Focus', req: 14, desc: 'Complete 14 consecutive challenges' },
                  { name: 'Monthly Master', req: 30, desc: 'Achieve a full 30-day coding streak' },
                ].map((m) => {
                  const isUnlocked = streak >= m.req || solvedDates.length >= m.req;
                  return (
                    <div
                      key={m.name}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                        isUnlocked
                          ? 'border-amber-500/30 bg-amber-500/5 text-[var(--foreground)]'
                          : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 text-[var(--foreground-muted)] opacity-70'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold flex items-center space-x-1.5">
                          <span>{m.name}</span>
                          {isUnlocked && <Sparkles className="w-3 h-3 text-amber-500" />}
                        </div>
                        <div className="text-[11px]">{m.desc}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        isUnlocked
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-slate-500/10 text-slate-400'
                      }`}>
                        {isUnlocked ? 'Unlocked' : `${m.req} Days`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
