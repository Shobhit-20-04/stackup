'use client';

import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  ExternalLink, 
  Video, 
  BookOpen, 
  Search, 
  Sparkles,
  RotateCcw,
  Check,
  Building2
} from 'lucide-react';
import { DSA_PROBLEMS, DSA_CATEGORIES } from '@/lib/data/dsa';
import { setLocalSectionProgress } from '@/lib/services/progress';

export default function DsaHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false);
  const [expandedSummary, setExpandedSummary] = useState<string | null>(null);

  // Solved problem IDs persisted in localStorage (lazy initializer for SSR & React 19)
  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('stackup_solved_dsa');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage and update section progress for profile
  const toggleSolved = (id: string) => {
    const nextSolved = solvedIds.includes(id)
      ? solvedIds.filter((item) => item !== id)
      : [...solvedIds, id];
    
    setSolvedIds(nextSolved);
    try {
      localStorage.setItem('stackup_solved_dsa', JSON.stringify(nextSolved));
      const percentage = Math.round((nextSolved.length / DSA_PROBLEMS.length) * 100);
      setLocalSectionProgress('dsa', percentage);
    } catch {
      // ignore
    }
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset your solved DSA progress?')) {
      setSolvedIds([]);
      try {
        localStorage.removeItem('stackup_solved_dsa');
        setLocalSectionProgress('dsa', 0);
      } catch {
        // ignore
      }
    }
  };

  // Filter problems
  const filteredProblems = useMemo(() => {
    return DSA_PROBLEMS.filter((problem) => {
      // Category filter
      if (selectedCategory !== 'All' && problem.pattern_tag !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && problem.difficulty !== selectedDifficulty) {
        return false;
      }
      // Solved filter
      if (showOnlyUnsolved && solvedIds.includes(problem.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = problem.title.toLowerCase().includes(query);
        const matchesPattern = problem.pattern_tag.toLowerCase().includes(query);
        const matchesCompany = problem.companies.some((c) => c.toLowerCase().includes(query));
        return matchesTitle || matchesPattern || matchesCompany;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, showOnlyUnsolved, searchQuery, solvedIds]);

  // Statistics
  const totalCount = DSA_PROBLEMS.length;
  const solvedCount = solvedIds.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100);

  const easyTotal = DSA_PROBLEMS.filter((p) => p.difficulty === 'Easy').length;
  const easySolved = DSA_PROBLEMS.filter((p) => p.difficulty === 'Easy' && solvedIds.includes(p.id)).length;

  const mediumTotal = DSA_PROBLEMS.filter((p) => p.difficulty === 'Medium').length;
  const mediumSolved = DSA_PROBLEMS.filter((p) => p.difficulty === 'Medium' && solvedIds.includes(p.id)).length;

  const hardTotal = DSA_PROBLEMS.filter((p) => p.difficulty === 'Hard').length;
  const hardSolved = DSA_PROBLEMS.filter((p) => p.difficulty === 'Hard' && solvedIds.includes(p.id)).length;

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 pb-20">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-3">
                <Code2 className="w-3.5 h-3.5" />
                <span>Curated Industry Roadmap</span>
              </div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                DSA Practice Hub
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
                A hand-picked roadmap of high-frequency interview patterns across LeetCode, Striver&apos;s SDE Sheet, and top tech companies. Master patterns, not just problems.
              </p>
            </div>

            {/* Quick Progress Badge */}
            <div className="bg-zinc-50 dark:bg-zinc-800/80 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 min-w-[280px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Overall Completion
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {solvedCount} / {totalCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden mb-4">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Sub-breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                  <span className="block text-emerald-700 dark:text-emerald-400 font-bold">{easySolved}/{easyTotal}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">Easy</span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-100 dark:border-amber-900/40">
                  <span className="block text-amber-700 dark:text-amber-400 font-bold">{mediumSolved}/{mediumTotal}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">Medium</span>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/30 p-2 rounded-lg border border-rose-100 dark:border-rose-900/40">
                  <span className="block text-rose-700 dark:text-rose-400 font-bold">{hardSolved}/{hardTotal}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">Hard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls: Search, Filters */}
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text"
                placeholder="Search problem name, company (e.g. Google), or pattern..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white placeholder:text-zinc-400"
              />
            </div>

            {/* Difficulty Toggle Buttons */}
            <div className="flex items-center space-x-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Toggle Unsolved */}
            <label className="flex items-center space-x-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={showOnlyUnsolved}
                onChange={(e) => setShowOnlyUnsolved(e.target.checked)}
                className="rounded border-zinc-300 dark:border-zinc-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span>Unsolved only</span>
            </label>

            {/* Reset button */}
            {solvedCount > 0 && (
              <button
                onClick={handleResetProgress}
                className="inline-flex items-center space-x-1 text-xs text-zinc-500 hover:text-rose-600 transition-colors"
                title="Reset progress"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Pattern / Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap pl-1">
              Pattern:
            </span>
            {DSA_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-3">
          {filteredProblems.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 p-12 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <Code2 className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">No problems found</h3>
              <p className="text-sm text-zinc-500 mt-1">Try clearing your search query or filter settings.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                  setShowOnlyUnsolved(false);
                }}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredProblems.map((problem) => {
              const isSolved = solvedIds.includes(problem.id);
              const isSummaryOpen = expandedSummary === problem.id;

              return (
                <div 
                  key={problem.id}
                  className={`bg-white dark:bg-zinc-900 rounded-xl border transition-all duration-200 ${
                    isSolved 
                      ? 'border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/20 dark:bg-emerald-950/10' 
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Checkbox + Title + Badges */}
                    <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                      <button
                        onClick={() => toggleSolved(problem.id)}
                        className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                          isSolved
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'border-2 border-zinc-300 dark:border-zinc-600 hover:border-emerald-500 text-transparent'
                        }`}
                        title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                          <h3 className={`text-base font-semibold transition-all ${
                            isSolved 
                              ? 'line-through text-zinc-400 dark:text-zinc-500' 
                              : 'text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400'
                          }`}>
                            {problem.title}
                          </h3>

                          {/* Difficulty badge */}
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            problem.difficulty === 'Easy'
                              ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                              : problem.difficulty === 'Medium'
                              ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                              : 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
                          }`}>
                            {problem.difficulty}
                          </span>

                          {/* Pattern Tag */}
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            {problem.pattern_tag}
                          </span>
                        </div>

                        {/* Company badges */}
                        <div className="flex items-center space-x-1.5 mt-2 flex-wrap gap-y-1 text-xs text-zinc-500">
                          <Building2 className="w-3 h-3 text-zinc-400 mr-0.5" />
                          {problem.companies.map((c) => (
                            <span 
                              key={c}
                              className="text-[10px] bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded font-mono"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Action links */}
                    <div className="flex items-center space-x-2 sm:self-center self-end pt-2 sm:pt-0">
                      {/* Hint / Strategy Dropdown toggle */}
                      <button
                        onClick={() => setExpandedSummary(isSummaryOpen ? null : problem.id)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-1"
                        title="Key intuition / pattern breakdown"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Intuition</span>
                      </button>

                      {/* LeetCode Link */}
                      <a
                        href={problem.leetcode_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center space-x-1 transition-colors"
                        title="Open on LeetCode"
                      >
                        <span>LeetCode</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Striver's Sheet */}
                      <a
                        href={problem.striver_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center space-x-1 transition-colors"
                        title="Open Striver's SDE Sheet solution"
                      >
                        <span>Striver</span>
                        <BookOpen className="w-3 h-3" />
                      </a>

                      {/* YouTube Video */}
                      <a
                        href={problem.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Watch video explanation"
                      >
                        <Video className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Expandable Intuition / Approach Note */}
                  {isSummaryOpen && (
                    <div className="px-5 pb-4 pt-1 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-b-xl flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">Core Pattern Intuition: </span>
                        {problem.summary}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
