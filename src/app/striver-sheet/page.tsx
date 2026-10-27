'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Search, 
  ChevronDown, 
  Copy, 
  Check, 
  ListChecks, 
  Filter,
  ArrowLeft,
  Clock,
  HardDrive
} from 'lucide-react';
import { DSA_PROBLEMS, type DsaProblem } from '@/lib/data/dsa';
import { setLocalSectionProgress } from '@/lib/services/progress';

export default function StriverSheetPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<'python' | 'cpp' | 'java' | 'typescript'>('python');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Synced local solved state (checks stackup_solved_dsa first with fallback to legacy dsa_solved_ids)
  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('stackup_solved_dsa') || localStorage.getItem('dsa_solved_ids');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleProblemSolved = (id: string) => {
    const next = solvedIds.includes(id)
      ? solvedIds.filter((item) => item !== id)
      : [...solvedIds, id];
    setSolvedIds(next);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('stackup_solved_dsa', JSON.stringify(next));
        localStorage.setItem('dsa_solved_ids', JSON.stringify(next));
        const percentage = Math.round((next.length / DSA_PROBLEMS.length) * 100);
        setLocalSectionProgress('dsa', percentage);
      } catch {
        // ignore
      }
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Distinct categories available in problems
  const categories = useMemo(() => {
    const set = new Set<string>();
    DSA_PROBLEMS.forEach((p) => set.add(p.pattern_tag));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered problems
  const filteredProblems = useMemo(() => {
    return DSA_PROBLEMS.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.pattern_tag.toLowerCase().includes(q);
      const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchesCat = selectedCategory === 'All' || p.pattern_tag === selectedCategory;
      const matchesSolved = !showOnlyUnsolved || !solvedIds.includes(p.id);
      return matchesSearch && matchesDiff && matchesCat && matchesSolved;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory, showOnlyUnsolved, solvedIds]);

  // Grouped by Category/Topic
  const groupedByCategory = useMemo(() => {
    const map = new Map<string, DsaProblem[]>();
    filteredProblems.forEach((p) => {
      const existing = map.get(p.pattern_tag) || [];
      existing.push(p);
      map.set(p.pattern_tag, existing);
    });
    return Array.from(map.entries()).map(([category, problems]) => {
      const solvedInGroup = problems.filter((p) => solvedIds.includes(p.id)).length;
      return {
        category,
        problems,
        solvedCount: solvedInGroup,
        totalCount: problems.length,
        percentage: Math.round((solvedInGroup / problems.length) * 100),
      };
    });
  }, [filteredProblems, solvedIds]);

  const totalCount = DSA_PROBLEMS.length;
  const solvedCount = solvedIds.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100);

  // Difficulty breakdown counts
  const easyTotal = DSA_PROBLEMS.filter((p) => p.difficulty === 'Easy').length;
  const easySolved = DSA_PROBLEMS.filter((p) => p.difficulty === 'Easy' && solvedIds.includes(p.id)).length;
  const mediumTotal = DSA_PROBLEMS.filter((p) => p.difficulty === 'Medium').length;
  const mediumSolved = DSA_PROBLEMS.filter((p) => p.difficulty === 'Medium' && solvedIds.includes(p.id)).length;
  const hardTotal = DSA_PROBLEMS.filter((p) => p.difficulty === 'Hard').length;
  const hardSolved = DSA_PROBLEMS.filter((p) => p.difficulty === 'Hard' && solvedIds.includes(p.id)).length;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20 transition-colors page-enter">
      {/* Header Banner */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Breadcrumb link back to DSA Hub */}
          <div className="mb-4">
            <Link
              href="/dsa"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--brand-primary)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to DSA Hub</span>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--brand-primary)] uppercase tracking-wider">
                <ListChecks className="w-4 h-4" />
                <span>Canonical Placement Curriculum</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
                Striver SDE Sheet
              </h1>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                The curated step-by-step problem sheet designed for top software engineering interviews. Each problem includes direct links to LeetCode, authentic TakeUForward editorial guides, time/space complexity analysis, and multi-language solutions.
              </p>
            </div>

            {/* Integrated Metrics Ledger */}
            <div className="p-4 sm:p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] min-w-[300px] space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[var(--foreground-muted)]">SDE Sheet Completion</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {solvedCount} / {totalCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-[var(--surface-card)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>

              {/* Sub-breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="bg-[var(--surface-card)] p-2 rounded-md border border-[var(--border-subtle)]">
                  <span className="block text-emerald-600 dark:text-emerald-400 font-bold font-mono">{easySolved}/{easyTotal}</span>
                  <span className="text-[var(--foreground-muted)] text-[10px]">Easy</span>
                </div>
                <div className="bg-[var(--surface-card)] p-2 rounded-md border border-[var(--border-subtle)]">
                  <span className="block text-amber-600 dark:text-amber-400 font-bold font-mono">{mediumSolved}/{mediumTotal}</span>
                  <span className="text-[var(--foreground-muted)] text-[10px]">Medium</span>
                </div>
                <div className="bg-[var(--surface-card)] p-2 rounded-md border border-[var(--border-subtle)]">
                  <span className="block text-rose-600 dark:text-rose-400 font-bold font-mono">{hardSolved}/{hardTotal}</span>
                  <span className="text-[var(--foreground-muted)] text-[10px]">Hard</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
              <input
                type="text"
                placeholder="Search problem title or pattern tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Category Select */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--foreground)] text-xs focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Categories' : c}
                  </option>
                ))}
              </select>

              {/* Difficulty Filter */}
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white font-bold'
                      : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {diff}
                </button>
              ))}

              {/* Only Unsolved Toggle */}
              <button
                onClick={() => setShowOnlyUnsolved(!showOnlyUnsolved)}
                className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center space-x-1.5 cursor-pointer ${
                  showOnlyUnsolved
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <span>Only Unsolved</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Problem Groups Ledger */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {groupedByCategory.length === 0 ? (
          <div className="p-12 text-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <Filter className="w-8 h-8 text-[var(--foreground-muted)] mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[var(--foreground)]">No matching problems found</h3>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">Try resetting your search query or difficulty filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedCategory('All');
                setShowOnlyUnsolved(false);
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          groupedByCategory.map(({ category, problems, solvedCount: groupSolved, totalCount: groupTotal }) => (
            <div key={category} className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden shadow-xs">
              {/* Category Header Strip */}
              <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                    {category}
                  </h2>
                  <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
                    ({problems.length} problems)
                  </span>
                </div>
                <div className="text-xs font-mono font-medium text-[var(--foreground-muted)]">
                  <span className="font-bold text-[var(--foreground)]">{groupSolved}</span> / {groupTotal} Solved
                </div>
              </div>

              {/* Table Column Headers on Desktop */}
              <div className="hidden sm:grid sm:grid-cols-12 px-6 py-2 bg-[var(--surface-card)] border-b border-[var(--border-subtle)] text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-5">Problem &amp; Pattern</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Complexity</div>
                <div className="col-span-2 text-right">Guides &amp; Code</div>
              </div>

              {/* Problem Rows */}
              <div className="divide-y divide-[var(--border-subtle)]">
                {problems.map((prob) => {
                  const isSolved = solvedIds.includes(prob.id);
                  const isExpanded = expandedProblemId === prob.id;

                  return (
                    <div 
                      key={prob.id}
                      className={`transition-colors ${
                        isSolved ? 'bg-emerald-500/[0.03]' : 'hover:bg-[var(--surface-sunken)]/50'
                      }`}
                    >
                      <div className="p-3.5 sm:px-6 sm:py-3 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-3 sm:gap-0">
                        {/* Status Checkbox */}
                        <div className="col-span-1 flex items-center sm:justify-center">
                          <button
                            type="button"
                            onClick={() => toggleProblemSolved(prob.id)}
                            className="text-[var(--foreground-muted)] hover:text-emerald-500 transition-all duration-200 active:scale-90 cursor-pointer"
                            title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                          >
                            {isSolved ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 transition-transform duration-200 scale-105" />
                            ) : (
                              <Circle className="w-4 h-4 transition-transform duration-200 hover:scale-105" />
                            )}
                          </button>
                        </div>

                        {/* Title & Pattern */}
                        <div className="col-span-5 min-w-0 pr-3">
                          <Link
                            href={`/dsa/${prob.id}`}
                            className={`text-xs font-semibold hover:underline truncate block ${
                              isSolved 
                                ? 'text-[var(--foreground-muted)] line-through' 
                                : 'text-[var(--foreground)] hover:text-[var(--brand-primary)]'
                            }`}
                          >
                            {prob.title}
                          </Link>
                          <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
                            {prob.pattern_tag}
                          </span>
                        </div>

                        {/* Difficulty */}
                        <div className="col-span-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold inline-block ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          }`}>
                            {prob.difficulty}
                          </span>
                        </div>

                        {/* Complexity */}
                        <div className="col-span-2 hidden sm:block text-[11px] font-mono text-[var(--foreground-muted)]">
                          <span>{prob.timeComplexity}</span>
                        </div>

                        {/* Action Links & Expand Drawer */}
                        <div className="col-span-2 flex items-center justify-between sm:justify-end space-x-2 text-xs">
                          {prob.striver_url ? (
                            <a
                              href={prob.striver_url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center space-x-1 text-[11px]"
                              title="TakeUForward Editorial Guide"
                            >
                              <span>Guide</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-[var(--foreground-muted)] font-mono hidden md:inline">In Hub</span>
                          )}

                          <a
                            href={prob.leetcode_url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center space-x-1 text-[11px]"
                            title="Open on LeetCode"
                          >
                            <span>LeetCode</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <button
                            type="button"
                            onClick={() => setExpandedProblemId(isExpanded ? null : prob.id)}
                            className="p-1 rounded hover:bg-[var(--surface-sunken)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                            title="Quick Code & Approach Drawer"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Quick Drawer */}
                      {isExpanded && (
                        <div className="p-4 sm:px-6 border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)] space-y-3 animate-in fade-in duration-150">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div className="flex items-center space-x-3 text-[11px] font-mono text-[var(--foreground-muted)]">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Time: <strong className="text-[var(--foreground)]">{prob.timeComplexity}</strong></span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <HardDrive className="w-3.5 h-3.5" />
                                <span>Space: <strong className="text-[var(--foreground)]">{prob.spaceComplexity}</strong></span>
                              </span>
                            </div>

                            {/* Language Switcher */}
                            <div className="flex items-center space-x-1">
                              {(['python', 'cpp', 'java', 'typescript'] as const).map((lang) => (
                                <button
                                  key={lang}
                                  onClick={() => setActiveLang(lang)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                                    activeLang === lang
                                      ? 'bg-[var(--brand-primary)] text-white font-bold'
                                      : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] border border-[var(--border-subtle)] hover:text-[var(--foreground)]'
                                  }`}
                                >
                                  {lang === 'typescript' ? 'TS' : lang}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Code Block with Copy */}
                          <div className="code-terminal-dark relative rounded-lg p-3.5 font-mono text-xs overflow-x-auto leading-relaxed border border-[#1e2b4d] shadow-inner" style={{ backgroundColor: '#0b1020', color: '#e8eeff' }}>
                            <button
                              onClick={() => handleCopyCode(prob.solutions[activeLang], prob.id)}
                              className="absolute right-2.5 top-2.5 p-1.5 rounded bg-[#151d35] hover:bg-[#1e2b4d] text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Copy Implementation"
                            >
                              {copiedId === prob.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <pre className="pr-10 text-[#e8eeff] font-mono whitespace-pre">{prob.solutions[activeLang]}</pre>
                          </div>

                          {/* Approach Text */}
                          <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                            <strong className="text-[var(--foreground)]">Approach: </strong>
                            {prob.approach}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
