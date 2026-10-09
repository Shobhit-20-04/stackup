'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  ExternalLink, 
  Video, 
  BookOpen, 
  Search, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Building2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  FolderTree,
  CheckCircle2,
  Copy,
  Clock,
  HardDrive,
  Lightbulb,
  FileText,
  Terminal,
  Lock,
  ArrowRight
} from 'lucide-react';
import { DSA_PROBLEMS, DSA_CATEGORIES, type DsaProblem } from '@/lib/data/dsa';
import { setLocalSectionProgress } from '@/lib/services/progress';
import { getCurrentUser, type UserSession } from '@/lib/auth/session';

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export default function DsaHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false);
  
  // Expanded Complete Output panel state
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'problem' | 'approach' | 'code'>('problem');
  const [activeLang, setActiveLang] = useState<'python' | 'cpp' | 'java' | 'typescript'>('python');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Structured Pagination & View Mode State
  const [viewMode, setViewMode] = useState<'list' | 'pattern'>('list');
  const [pageSize, setPageSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const problemContainerRef = useRef<HTMLDivElement>(null);

  // Expanded pattern accordions for pattern view
  const [expandedPatterns, setExpandedPatterns] = useState<Record<string, boolean>>({});

  // Authentication state for feature gating
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const [authPromptReason, setAuthPromptReason] = useState('');

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

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
    if (!currentUser) {
      setAuthPromptReason('Sign in to track your solved problems and sync your interview preparation progress to your profile.');
      setAuthPromptOpen(true);
      return;
    }

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

  // Reset currentPage to 1 whenever filters change (React render-phase pattern)
  const filterKey = `${selectedCategory}-${selectedDifficulty}-${searchQuery}-${showOnlyUnsolved}-${pageSize}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  // Calculate pagination parameters
  const effectivePageSize = pageSize === -1 ? (filteredProblems.length || 1) : pageSize;
  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / effectivePageSize));
  const effectivePage = Math.min(currentPage, totalPages);
  const startIndex = pageSize === -1 ? 0 : (effectivePage - 1) * effectivePageSize;
  const endIndex = pageSize === -1 ? filteredProblems.length : Math.min(startIndex + effectivePageSize, filteredProblems.length);

  const displayedProblems = useMemo(() => {
    if (pageSize === -1) return filteredProblems;
    return filteredProblems.slice(startIndex, endIndex);
  }, [filteredProblems, pageSize, startIndex, endIndex]);

  // Grouped problems by pattern for Pattern Accordion View
  const groupedByPattern = useMemo(() => {
    const map = new Map<string, DsaProblem[]>();
    filteredProblems.forEach((p) => {
      const existing = map.get(p.pattern_tag) || [];
      existing.push(p);
      map.set(p.pattern_tag, existing);
    });
    return Array.from(map.entries()).map(([pattern, problems]) => {
      const solvedInGroup = problems.filter((p) => solvedIds.includes(p.id)).length;
      return {
        pattern,
        problems,
        solvedCount: solvedInGroup,
        totalCount: problems.length,
        percentage: Math.round((solvedInGroup / problems.length) * 100),
      };
    });
  }, [filteredProblems, solvedIds]);

  const handlePageChange = (page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
    if (problemContainerRef.current) {
      problemContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const togglePatternAccordion = (pattern: string) => {
    setExpandedPatterns((prev) => ({
      ...prev,
      [pattern]: prev[pattern] === undefined ? true : !prev[pattern],
    }));
  };

  const handleCopyCode = (code: string, id: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] pb-20">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#131c31] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-3">
                <Code2 className="w-3.5 h-3.5" />
                <span>Curated Industry Roadmap</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                DSA Practice Hub
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl text-sm leading-relaxed">
                A hand-picked roadmap of high-frequency interview patterns with direct links to LeetCode, Striver&apos;s SDE Sheet, and video solutions. Complete problem statements, examples, and optimal multi-language code snippets.
              </p>
            </div>

            {/* Quick Progress Badge */}
            <div className="bg-slate-50 dark:bg-[#1e293b] p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 min-w-[280px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Overall Completion
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {solvedCount} / {totalCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-4">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Sub-breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                  <span className="block text-emerald-700 dark:text-emerald-400 font-bold">{easySolved}/{easyTotal}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Easy</span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-100 dark:border-amber-900/40">
                  <span className="block text-amber-700 dark:text-amber-400 font-bold">{mediumSolved}/{mediumTotal}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Medium</span>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/30 p-2 rounded-lg border border-rose-100 dark:border-rose-900/40">
                  <span className="block text-rose-700 dark:text-rose-400 font-bold">{hardSolved}/{hardTotal}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Hard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls: Search, Filters */}
        <div className="bg-white dark:bg-[#131c31] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search problem name, company (e.g. Google), or pattern..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400"
              />
            </div>

            {/* Difficulty Toggle Buttons */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Toggle Unsolved */}
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={showOnlyUnsolved}
                onChange={(e) => setShowOnlyUnsolved(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Unsolved only</span>
            </label>

            {/* Reset button */}
            {solvedCount > 0 && (
              <button
                onClick={handleResetProgress}
                className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-rose-600 transition-colors"
                title="Reset progress"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Pattern / Category Pills - Scrollable Horizontally on Mobile */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto pb-1.5 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1 mr-1 shrink-0">
              Pattern:
            </span>
            {DSA_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Problem Count Header & View Switcher */}
        <div ref={problemContainerRef} className="scroll-mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 mb-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-900 dark:text-white">
              {filteredProblems.length} {filteredProblems.length === 1 ? 'problem' : 'problems'} found
            </span>
            {viewMode === 'list' && pageSize !== -1 && totalPages > 1 && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1e293b] text-slate-600 dark:text-slate-400 font-medium">
                Page {effectivePage} of {totalPages}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-auto">
            {/* View Mode Toggle: Paginated List vs Group by Pattern */}
            <div className="inline-flex rounded-xl p-0.5 bg-slate-100 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-[#131c31] text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pattern')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'pattern'
                    ? 'bg-white dark:bg-[#131c31] text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FolderTree className="w-3.5 h-3.5" />
                <span>By Pattern ({groupedByPattern.length})</span>
              </button>
            </div>

            {/* Items Per Page Selector (in list view) */}
            {viewMode === 'list' && (
              <div className="hidden sm:flex items-center space-x-1 text-slate-400">
                <span>Per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-slate-100 dark:bg-[#1e293b] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                  <option value={-1}>All</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.length === 0 ? (
            <div className="bg-white dark:bg-[#131c31] p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800">
              <Code2 className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">No problems found</h3>
              <p className="text-sm text-slate-500 mt-1">Try clearing your search query or filter settings.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                  setShowOnlyUnsolved(false);
                }}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            (() => {
              const renderCard = (problem: DsaProblem) => {
                const isSolved = solvedIds.includes(problem.id);
                const isExpanded = expandedProblemId === problem.id;

                return (
                <div 
                  key={problem.id}
                  className={`bg-white dark:bg-[#131c31] rounded-2xl border transition-all duration-200 shadow-sm ${
                    isSolved 
                      ? 'border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/20 dark:bg-emerald-950/10' 
                      : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Checkbox + Title + Badges */}
                    <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                      <button
                        onClick={() => toggleSolved(problem.id)}
                        className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          isSolved
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 text-transparent'
                        }`}
                        title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                          <h3 className={`text-base font-semibold transition-all ${
                            isSolved 
                              ? 'line-through text-slate-400 dark:text-slate-500' 
                              : 'text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
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
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {problem.pattern_tag}
                          </span>
                        </div>

                        {/* Company badges */}
                        <div className="flex items-center space-x-1.5 mt-2 flex-wrap gap-y-1 text-xs text-slate-500">
                          <Building2 className="w-3 h-3 text-slate-400 mr-0.5" />
                          {problem.companies.map((c) => (
                            <span 
                              key={c}
                              className="text-[10px] bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Direct Portal Links & Expand Complete Output Button */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:self-center self-start pt-2 sm:pt-0">
                      {/* LeetCode Link */}
                      <a
                        href={problem.leetcode_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center space-x-1.5 transition-colors border border-amber-200/50 dark:border-amber-900/40"
                        title="Practice on LeetCode"
                      >
                        <span>LeetCode</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Striver's Sheet */}
                      <a
                        href={problem.striver_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 flex items-center space-x-1.5 transition-colors border border-blue-200/50 dark:border-blue-900/40"
                        title="Open Striver's SDE Sheet guide"
                      >
                        <span>Striver</span>
                        <BookOpen className="w-3.5 h-3.5" />
                      </a>

                      {/* YouTube Video */}
                      <a
                        href={problem.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border border-rose-200/40 dark:border-rose-900/40"
                        title="Watch full video tutorial on YouTube"
                      >
                        <Video className="w-4 h-4" />
                      </a>

                      {/* Complete Output Accordion Trigger */}
                      <button
                        onClick={() => {
                          if (isExpanded) {
                            setExpandedProblemId(null);
                          } else {
                            setExpandedProblemId(problem.id);
                            setActiveTab('problem');
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                          isExpanded
                            ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                        title="View complete problem output, approach, and code solutions"
                      >
                        <Terminal className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                        <span>{isExpanded ? 'Hide Output' : 'Complete Output'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Complete Output Expandable Body */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0f172a]/90 rounded-b-2xl p-5 space-y-4">
                      {/* Top Tabs */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                        <div className="flex items-center space-x-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto max-w-full scrollbar-none">
                          <button
                            onClick={() => setActiveTab('problem')}
                            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                              activeTab === 'problem'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-500" />
                            <span>Problem</span>
                            <span className="hidden sm:inline">&nbsp;&amp; Examples</span>
                          </button>

                          <button
                            onClick={() => setActiveTab('approach')}
                            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                              activeTab === 'approach'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                            <span>Approach</span>
                            <span className="hidden sm:inline">&nbsp;&amp; Complexity</span>
                          </button>

                          <button
                            onClick={() => setActiveTab('code')}
                            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                              activeTab === 'code'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Code</span>
                            <span className="hidden sm:inline">&nbsp;Solutions</span>
                          </button>
                        </div>

                        {/* Direct portal badges */}
                        <div className="flex items-center space-x-2 text-xs">
                          <a
                            href={problem.leetcode_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            <span>LeetCode #</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <a
                            href={problem.striver_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <span>Striver Guide</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <a
                            href={problem.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-rose-600 dark:text-rose-400 hover:underline"
                          >
                            <span>Video Solution</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Tab 1: Problem Statement & Examples */}
                      {activeTab === 'problem' && (
                        <div className="space-y-4">
                          {/* Description */}
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                              Problem Statement
                            </h4>
                            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-white dark:bg-[#131c31] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                              {problem.description}
                            </p>
                          </div>

                          {/* Examples */}
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                              Sample Test Cases &amp; Outputs
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {(currentUser ? problem.examples : problem.examples.slice(0, 1)).map((ex, idx) => (
                                <div 
                                  key={idx}
                                  className="bg-white dark:bg-[#131c31] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                                >
                                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] pb-1 border-b border-slate-100 dark:border-slate-800">
                                    <span>Example {idx + 1}</span>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">Input:</span>
                                    <code className="text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded block font-mono">
                                      {ex.input}
                                    </code>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">Output:</span>
                                    <code className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded block font-mono font-semibold">
                                      {ex.output}
                                    </code>
                                  </div>
                                  {ex.explanation && (
                                    <div className="text-slate-600 dark:text-slate-400 pt-1 text-[11px] leading-relaxed">
                                      <span className="font-medium text-slate-700 dark:text-slate-300">Explanation: </span>
                                      {ex.explanation}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Constraints & Member Teaser */}
                          {currentUser ? (
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                Constraints
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {problem.constraints.map((c, idx) => (
                                  <span 
                                    key={idx}
                                    className="text-xs font-mono bg-white dark:bg-[#131c31] text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 font-medium">
                                <Lock className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                <span>Additional test cases, edge cases, and boundary constraints are locked for visitors.</span>
                              </div>
                              <Link
                                href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shrink-0 flex items-center space-x-1"
                              >
                                <span>Sign In to Unlock</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tab 2: Optimal Approach & Complexity */}
                      {activeTab === 'approach' && (
                        <div className="space-y-4">
                          <div className="bg-white dark:bg-[#131c31] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center space-x-2 mb-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                              <Sparkles className="w-4 h-4" />
                              <span>Core Algorithmic Intuition</span>
                            </div>
                            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                              {currentUser ? problem.approach : `${problem.approach.slice(0, 130)}...`}
                            </p>
                          </div>

                          {!currentUser && (
                            <div className="p-4 rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 font-medium">
                                <Lock className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                <span>Full algorithmic walk-through and Big-O proofs are locked for visitors.</span>
                              </div>
                              <Link
                                href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shrink-0 flex items-center space-x-1"
                              >
                                <span>Sign In to Unlock</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Time Complexity */}
                            <div className="bg-white dark:bg-[#131c31] p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start space-x-3">
                              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                                <Clock className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                                  Time Complexity
                                </span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5 block">
                                  {currentUser ? problem.timeComplexity : 'Sign in to view'}
                                </span>
                              </div>
                            </div>

                            {/* Space Complexity */}
                            <div className="bg-white dark:bg-[#131c31] p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start space-x-3">
                              <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
                                <HardDrive className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                                  Space Complexity
                                </span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5 block">
                                  {currentUser ? problem.spaceComplexity : 'Sign in to view'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 3: Complete Working Code Solutions */}
                      {activeTab === 'code' && (
                        <div className="space-y-3">
                          {/* Language Switcher & Copy Button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl">
                              {(['python', 'cpp', 'java', 'typescript'] as const).map((lang) => (
                                <button
                                  key={lang}
                                  onClick={() => setActiveLang(lang)}
                                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                    activeLang === lang
                                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold shadow-sm'
                                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                  }`}
                                >
                                  {lang === 'python' ? 'Python 3' : lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'TypeScript'}
                                </button>
                              ))}
                            </div>

                            {currentUser ? (
                              <button
                                onClick={() => handleCopyCode(problem.solutions[activeLang], problem.id)}
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
                              >
                                {copiedId === problem.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Copy Solution</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <Link
                                href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-sm"
                              >
                                <Lock className="w-3 h-3 text-blue-500" />
                                <span>Sign In to Copy</span>
                              </Link>
                            )}
                          </div>

                          {/* Code Display */}
                          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs shadow-inner">
                            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800/80 text-[11px] text-slate-400">
                              <span>Solution • {activeLang.toUpperCase()}</span>
                              <span>Verified on LeetCode</span>
                            </div>
                            
                            {currentUser ? (
                              <pre className="p-4 overflow-x-auto leading-relaxed max-h-[400px]">
                                <code>{problem.solutions[activeLang]}</code>
                              </pre>
                            ) : (
                              <div className="relative min-h-[220px]">
                                {/* Preview snippet (First 3 lines) */}
                                <pre className="p-4 overflow-hidden leading-relaxed opacity-40 select-none">
                                  <code>
                                    {problem.solutions[activeLang].split('\n').slice(0, 3).join('\n')}
                                    {'\n    # ... [Sign in to view full verified code implementation] ...'}
                                    {'\n    # ... Supports Python 3, C++, Java, and TypeScript ...'}
                                  </code>
                                </pre>

                                {/* Locked overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/90 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2.5 border border-blue-500/30">
                                    <Lock className="w-5 h-5 text-blue-400" />
                                  </div>
                                  <h4 className="text-sm font-bold text-white mb-1">
                                    Sign in to view full multi-language code
                                  </h4>
                                  <p className="text-xs text-slate-400 max-w-xs mb-3">
                                    Unlock full implementations, optimal time/space solutions, and one-click copy.
                                  </p>
                                  <Link
                                    href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/30 transition-all flex items-center space-x-1.5"
                                  >
                                    <span>Sign In to Unlock</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            };

            if (viewMode === 'pattern') {
              return (
                <div className="space-y-4">
                  {groupedByPattern.map((group) => {
                    const isGroupOpen = expandedPatterns[group.pattern] ?? true;
                    return (
                      <div
                        key={group.pattern}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] overflow-hidden shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => togglePatternAccordion(group.pattern)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-[#1e293b]/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                              group.solvedCount === group.totalCount && group.totalCount > 0
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                            }`}>
                              {group.solvedCount === group.totalCount && group.totalCount > 0 ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <span>{group.problems.length}</span>
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                {group.pattern}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {group.solvedCount} of {group.totalCount} completed ({group.percentage}%)
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="hidden sm:block w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                                style={{ width: `${group.percentage}%` }}
                              />
                            </div>
                            {isGroupOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </div>
                        </button>

                        {isGroupOpen && (
                          <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3 bg-slate-50/50 dark:bg-[#0b1120]/40">
                            {group.problems.map((p) => renderCard(p))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }

            return displayedProblems.map((problem) => renderCard(problem));
          })()
        )}
        </div>

        {/* Auth Prompt Modal */}
        {authPromptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-[#131c31] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Sign In Required
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {authPromptReason || 'Sign in to access this feature and sync your data with your personal profile dashboard.'}
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <Link
                  href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs text-center shadow-md shadow-blue-600/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Sign In to Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setAuthPromptOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modern Pagination Controls (List View) */}
        {viewMode === 'list' && filteredProblems.length > 0 && pageSize !== -1 && totalPages > 1 && (
          <div className="pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
            {/* Left: Summary */}
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{startIndex + 1}</span>–
              <span className="font-bold text-slate-900 dark:text-white">{endIndex}</span> of{' '}
              <span className="font-bold text-slate-900 dark:text-white">{filteredProblems.length}</span> problems
            </div>

            {/* Center: Page navigation pills */}
            <div className="flex items-center space-x-1.5 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => handlePageChange(effectivePage - 1)}
                disabled={effectivePage <= 1}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1e293b] disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1 cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {getPageNumbers(effectivePage, totalPages).map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={`dots-${idx}`} className="px-2 py-1 text-xs text-slate-400 select-none">
                      ...
                    </span>
                  );
                }
                const pageNum = Number(p);
                const isActive = pageNum === effectivePage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[32px] h-8 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1e293b]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handlePageChange(effectivePage + 1)}
                disabled={effectivePage >= totalPages}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1e293b] disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1 cursor-pointer"
                title="Next Page"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Per-page selector pills */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Per page:</span>
              <div className="inline-flex rounded-xl p-0.5 bg-slate-100 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800">
                {[12, 24, 48, -1].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setPageSize(size);
                      setCurrentPage(1);
                    }}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      pageSize === size
                        ? 'bg-white dark:bg-[#131c31] text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {size === -1 ? 'All' : size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Completion Note */}
        {filteredProblems.length > 0 && (
          <div className="text-center text-xs text-slate-400 dark:text-slate-500 pt-4 pb-2">
            All {filteredProblems.length} curated problems available • Ready to crack your technical interviews
          </div>
        )}
      </div>
    </div>
  );
}
