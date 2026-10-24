'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ListChecks, 
  Filter 
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

  // Local solved state
  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('dsa_solved_ids');
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
      localStorage.setItem('stackup_solved_dsa', JSON.stringify(next));
      const percentage = Math.round((next.length / DSA_PROBLEMS.length) * 100);
      setLocalSectionProgress('dsa', percentage);
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

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20 transition-colors">
      {/* Header Banner */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--color-primary)]">
                <ListChecks className="w-4 h-4" />
                <span>Canonical Placement Curriculum</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                Striver SDE Sheet
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                The comprehensive step-by-step problem sheet designed for top software engineering roles. Each problem includes direct links to LeetCode, authentic TakeUForward editorial guides, video walkthroughs, and optimal implementations.
              </p>
            </div>

            {/* Progress Card */}
            <div className="p-4 sm:p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 min-w-[260px] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[var(--color-text-secondary)]">SDE Sheet Progress</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {solvedCount} / {totalCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-[var(--border-subtle)] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <div className="text-[11px] text-[var(--color-text-secondary)] text-right">
                {totalCount - solvedCount} problems remaining
              </div>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                placeholder="Search problem title or pattern..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-focus)]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Category Select */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--color-text-primary)] text-xs focus:outline-none"
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
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    selectedDifficulty === diff
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white font-bold'
                      : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {diff}
                </button>
              ))}

              {/* Only Unsolved Toggle */}
              <button
                onClick={() => setShowOnlyUnsolved(!showOnlyUnsolved)}
                className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center space-x-1.5 ${
                  showOnlyUnsolved
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <span>Only Unsolved</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Problem Groups */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {groupedByCategory.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <Filter className="w-8 h-8 text-[var(--color-text-secondary)] mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">No matching problems found</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Try resetting your search query or difficulty filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedCategory('All');
                setShowOnlyUnsolved(false);
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          groupedByCategory.map(({ category, problems, solvedCount: groupSolved, totalCount: groupTotal }) => (
            <div key={category} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden">
              {/* Category Header */}
              <div className="p-4 sm:px-6 sm:py-3.5 bg-[var(--surface-sunken)]/60 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-sm font-bold text-[var(--color-text-primary)]">
                    {category}
                  </h2>
                  <span className="text-[11px] font-mono text-[var(--color-text-secondary)]">
                    ({problems.length} problems)
                  </span>
                </div>
                <div className="text-xs font-mono font-medium text-[var(--color-text-secondary)]">
                  <span className="font-bold text-[var(--color-text-primary)]">{groupSolved}</span> / {groupTotal} Solved
                </div>
              </div>

              {/* Problem Rows Table */}
              <div className="divide-y divide-[var(--border-subtle)]">
                {problems.map((prob) => {
                  const isSolved = solvedIds.includes(prob.id);
                  const isExpanded = expandedProblemId === prob.id;

                  return (
                    <div 
                      key={prob.id}
                      className={`transition-colors ${
                        isSolved ? 'bg-emerald-500/[0.03]' : 'hover:bg-[var(--surface-sunken)]/40'
                      }`}
                    >
                      <div className="p-3.5 sm:px-6 sm:py-3 flex items-center justify-between gap-4">
                        {/* Checkbox & Title */}
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => toggleProblemSolved(prob.id)}
                            className="shrink-0 text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer"
                            title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                          >
                            {isSolved ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>

                          <div className="min-w-0">
                            <div className="flex items-center space-x-2 flex-wrap">
                              <Link
                                href={`/dsa/${prob.id}`}
                                className={`text-xs font-semibold hover:underline truncate ${
                                  isSolved 
                                    ? 'text-slate-500 line-through' 
                                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary)]'
                                }`}
                              >
                                {prob.title}
                              </Link>

                              {/* Difficulty */}
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                prob.difficulty === 'Easy'
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                  : prob.difficulty === 'Medium'
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              }`}>
                                {prob.difficulty}
                              </span>

                              {/* Pattern Tag */}
                              <span className="text-[10px] font-mono text-[var(--color-text-secondary)] hidden sm:inline">
                                • {prob.pattern_tag}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Links & Expand */}
                        <div className="flex items-center space-x-2.5 shrink-0 text-xs">
                          {prob.striver_url ? (
                            <a
                              href={prob.striver_url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors inline-flex items-center space-x-1 text-[11px]"
                              title="TakeUForward Editorial Guide"
                            >
                              <span>Guide</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">Editorial in Hub</span>
                          )}

                          <a
                            href={prob.leetcode_url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors inline-flex items-center space-x-1 text-[11px]"
                            title="Open on LeetCode"
                          >
                            <span>LeetCode</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <button
                            type="button"
                            onClick={() => setExpandedProblemId(isExpanded ? null : prob.id)}
                            className="p-1 rounded hover:bg-[var(--surface-sunken)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                            title="Quick Code & Approach Drawer"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Quick Drawer */}
                      {isExpanded && (
                        <div className="p-4 sm:px-6 border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 space-y-3 animate-in fade-in duration-150">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div className="flex items-center space-x-3 text-[11px] font-mono text-[var(--color-text-secondary)]">
                              <span>Time: <strong className="text-[var(--color-text-primary)]">{prob.timeComplexity}</strong></span>
                              <span>•</span>
                              <span>Space: <strong className="text-[var(--color-text-primary)]">{prob.spaceComplexity}</strong></span>
                            </div>

                            {/* Language Switcher */}
                            <div className="flex items-center space-x-1">
                              {(['python', 'cpp', 'java', 'typescript'] as const).map((lang) => (
                                <button
                                  key={lang}
                                  onClick={() => setActiveLang(lang)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-colors ${
                                    activeLang === lang
                                      ? 'bg-[var(--color-primary)] text-white font-bold'
                                      : 'bg-[var(--surface-card)] text-[var(--color-text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--color-text-primary)]'
                                  }`}
                                >
                                  {lang === 'typescript' ? 'TS' : lang}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Code Block with Copy */}
                          <div className="relative rounded-lg bg-[#0b1020] text-[#e8eeff] p-3.5 font-mono text-xs overflow-x-auto leading-relaxed border border-[#1e2b4d]">
                            <button
                              onClick={() => handleCopyCode(prob.solutions[activeLang], prob.id)}
                              className="absolute right-2.5 top-2.5 p-1.5 rounded bg-[#151d35] hover:bg-[#1e2b4d] text-slate-300 hover:text-white transition-colors"
                              title="Copy Implementation"
                            >
                              {copiedId === prob.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <pre className="pr-10">{prob.solutions[activeLang]}</pre>
                          </div>

                          {/* Approach Text */}
                          <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                            <strong className="text-[var(--color-text-primary)]">Approach: </strong>
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
