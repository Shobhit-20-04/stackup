'use client';

import React, { useState, useMemo, useEffect, useRef, useDeferredValue } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
import { getCurrentUser, getFastCachedUser, type UserSession } from '@/lib/auth/session';

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

function DsaHubContent() {
  const searchParams = useSearchParams();
  const problemParam = searchParams.get('problem');

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const showSearchSpinner = searchQuery !== deferredSearchQuery;
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
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const [authPromptReason, setAuthPromptReason] = useState('');

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

  // Deep-link auto-navigation and expansion via ?problem=<id-or-slug>
  useEffect(() => {
    if (problemParam) {
      const target = DSA_PROBLEMS.find(
        (p) =>
          p.id.toLowerCase() === problemParam.toLowerCase() ||
          p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === problemParam.toLowerCase() ||
          p.title.toLowerCase() === problemParam.toLowerCase().replace(/-/g, ' ')
      );
      if (target) {
        setSelectedCategory('All');
        setSelectedDifficulty('All');
        setShowOnlyUnsolved(false);
        setExpandedProblemId(target.id);
        setTimeout(() => {
          const el = document.getElementById(`problem-${target.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 250);
      }
    }
  }, [problemParam]);

  // Keyboard shortcut: Escape closes expanded problem drawer or auth modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (authPromptOpen) {
          setAuthPromptOpen(false);
        } else if (expandedProblemId) {
          setExpandedProblemId(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedProblemId, authPromptOpen]);

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
      // Search query (using concurrent deferred value for 60fps typing)
      if (deferredSearchQuery.trim()) {
        const query = deferredSearchQuery.toLowerCase();
        const matchesTitle = problem.title.toLowerCase().includes(query);
        const matchesPattern = problem.pattern_tag.toLowerCase().includes(query);
        const matchesCompany = problem.companies.some((c) => c.toLowerCase().includes(query));
        return matchesTitle || matchesPattern || matchesCompany;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, showOnlyUnsolved, deferredSearchQuery, solvedIds]);

  // Reset currentPage to 1 whenever filters change (React render-phase pattern)
  const filterKey = `${selectedCategory}-${selectedDifficulty}-${deferredSearchQuery}-${showOnlyUnsolved}-${pageSize}`;
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1020] pb-20">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#151D35] border-b border-slate-200 dark:border-[#1E2B4D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-[#8E9FC8] mb-1.5 uppercase tracking-wider">
                Algorithms &amp; Data Structures Roadmap
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#E8EEFF] tracking-tight">
                DSA Practice Hub
              </h1>
              <p className="mt-2 text-slate-600 dark:text-[#8E9FC8] max-w-2xl text-xs sm:text-sm leading-relaxed">
                A hand-picked roadmap of high-frequency interview patterns with direct links to LeetCode, Striver&apos;s SDE Sheet, and video solutions. Complete problem statements, examples, and optimal multi-language code snippets.
              </p>
            </div>

            {/* Quick Progress Badge */}
            <div className="bg-slate-50 dark:bg-[#151D35] p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-[#1E2B4D] min-w-[280px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8E9FC8]">
                  Completion Status
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {solvedCount} / {totalCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-[#0B1020] h-2 rounded-full overflow-hidden mb-3 border border-slate-300/30 dark:border-white/5">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Sub-breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white dark:bg-[#0B1020] p-2 rounded-lg border border-slate-200 dark:border-[#1E2B4D]">
                  <span className="block text-emerald-600 dark:text-emerald-400 font-bold">{easySolved}/{easyTotal}</span>
                  <span className="text-slate-500 dark:text-[#8E9FC8] text-[10px]">Easy</span>
                </div>
                <div className="bg-white dark:bg-[#0B1020] p-2 rounded-lg border border-slate-200 dark:border-[#1E2B4D]">
                  <span className="block text-amber-600 dark:text-amber-400 font-bold">{mediumSolved}/{mediumTotal}</span>
                  <span className="text-slate-500 dark:text-[#8E9FC8] text-[10px]">Medium</span>
                </div>
                <div className="bg-white dark:bg-[#0B1020] p-2 rounded-lg border border-slate-200 dark:border-[#1E2B4D]">
                  <span className="block text-rose-600 dark:text-rose-400 font-bold">{hardSolved}/{hardTotal}</span>
                  <span className="text-slate-500 dark:text-[#8E9FC8] text-[10px]">Hard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Controls: Search, Filters */}
        <div className="bg-white dark:bg-[#151D35] p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-[#1E2B4D] shadow-xs space-y-3.5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search problem name, company (e.g. Google), or pattern..."
                aria-label="Search problems by name, company, or pattern"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-[#1E2B4D] rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] text-slate-900 dark:text-[#E8EEFF] placeholder:text-slate-400"
              />
              {showSearchSpinner && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 border-2 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Difficulty Toggle Buttons */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-[#0B1020] border border-slate-200/80 dark:border-[#1E2B4D] p-1 rounded-lg">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-white dark:bg-[#1B2442] text-slate-900 dark:text-[#E8EEFF] shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-[#8E9FC8] hover:text-slate-900 dark:hover:text-[#E8EEFF]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Toggle Unsolved */}
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-[#8E9FC8] cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={showOnlyUnsolved}
                onChange={(e) => setShowOnlyUnsolved(e.target.checked)}
                className="rounded border-slate-300 dark:border-[#1E2B4D] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] w-4 h-4"
              />
              <span>Unsolved only</span>
            </label>

            {/* Reset button */}
            {solvedCount > 0 && (
              <button
                onClick={handleResetProgress}
                aria-label="Reset solved DSA progress"
                className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-rose-600 transition-colors"
                title="Reset progress"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Pattern / Category Pills - Scrollable Horizontally on Mobile */}
          <div className="flex items-center gap-1.5 pt-2.5 border-t border-slate-100 dark:border-[#1E2B4D] overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1 mr-1 shrink-0">
              Pattern:
            </span>
            {DSA_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#1B2442] text-slate-700 dark:text-[#8E9FC8] hover:bg-slate-200 dark:hover:bg-[#223055]'
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
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 font-medium">
                Page {effectivePage} of {totalPages}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-auto">
            {/* View Mode Toggle: Paginated List vs Group by Pattern */}
            <div className="inline-flex rounded-xl p-0.5 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-[#151D35] text-[#0D08CB] dark:text-[#E9DEFA] shadow-xs'
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
                    ? 'bg-white dark:bg-[#151D35] text-[#0D08CB] dark:text-[#E9DEFA] shadow-xs'
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
                  aria-label="Number of problems per page"
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-zinc-700 rounded-lg px-2 py-0.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0D08CB] cursor-pointer"
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
            <div className="bg-white dark:bg-[#151D35] p-12 text-center rounded-2xl border border-slate-200 dark:border-zinc-800">
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
                className="mt-4 px-4 py-2 bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
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
                  id={`problem-${problem.id}`}
                  className={`bg-white dark:bg-[#151D35] rounded-xl border transition-colors shadow-xs ${
                    isSolved 
                      ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10' 
                      : 'border-slate-200 dark:border-[#1E2B4D] hover:border-slate-300 dark:hover:border-[#2D3D6E]'
                  }`}
                >
                  <div className="p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    {/* Left: Checkbox + Title + Badges */}
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggleSolved(problem.id)}
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                          isSolved
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 text-transparent'
                        }`}
                        title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <h3 className={`text-sm sm:text-base font-semibold transition-colors ${
                            isSolved 
                              ? 'line-through text-slate-400 dark:text-slate-500' 
                              : 'text-slate-900 dark:text-[#E8EEFF] hover:text-[var(--brand-primary)]'
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
                      {problem.striver_url ? (
                        <a
                          href={problem.striver_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-[#1B2442] dark:hover:bg-[#223055] text-slate-700 dark:text-[#E8EEFF] flex items-center space-x-1.5 transition-colors border border-slate-200 dark:border-[#1E2B4D]"
                          title="Open Striver's TakeUForward guide"
                        >
                          <span>Striver</span>
                          <BookOpen className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 flex items-center space-x-1.5 border border-slate-200/50 dark:border-slate-800/50 cursor-not-allowed opacity-75"
                          title="Striver editorial guide pending for this problem"
                        >
                          <span>Guide Pending</span>
                        </span>
                      )}

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
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer border ${
                          isExpanded
                            ? 'bg-slate-900 dark:bg-[#1B2442] text-white border-slate-800 dark:border-[#2D3D6E] shadow-xs'
                            : 'bg-slate-100 dark:bg-[#1B2442] hover:bg-slate-200 dark:hover:bg-[#223055] text-slate-700 dark:text-[#E8EEFF] border-slate-200 dark:border-[#1E2B4D]'
                        }`}
                        title="View complete problem output, approach, and code solutions"
                      >
                        <Terminal className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                        <span>{isExpanded ? 'Hide Solution' : 'Solution & Notes'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Complete Output Expandable Body */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 dark:border-[#1E2B4D] bg-slate-50/50 dark:bg-[#0B1020]/80 rounded-b-xl p-4 sm:p-5 space-y-4">
                      {/* Top Tabs */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1E2B4D] pb-3">
                        <div className="flex items-center space-x-1 bg-slate-200/80 dark:bg-[#151D35] p-1 rounded-lg border border-slate-200/80 dark:border-[#1E2B4D] overflow-x-auto max-w-full scrollbar-none">
                          <button
                            onClick={() => setActiveTab('problem')}
                            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                              activeTab === 'problem'
                                ? 'bg-white dark:bg-[#1B2442] text-slate-900 dark:text-[#E8EEFF] shadow-xs font-semibold'
                                : 'text-slate-600 dark:text-[#8E9FC8] hover:text-slate-900 dark:hover:text-[#E8EEFF]'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                            <span>Problem &amp; Examples</span>
                          </button>

                          <button
                            onClick={() => setActiveTab('approach')}
                            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                              activeTab === 'approach'
                                ? 'bg-white dark:bg-[#1B2442] text-slate-900 dark:text-[#E8EEFF] shadow-xs font-semibold'
                                : 'text-slate-600 dark:text-[#8E9FC8] hover:text-slate-900 dark:hover:text-[#E8EEFF]'
                            }`}
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                            <span>Approach &amp; Complexity</span>
                          </button>

                          <button
                            onClick={() => setActiveTab('code')}
                            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                              activeTab === 'code'
                                ? 'bg-white dark:bg-[#1B2442] text-slate-900 dark:text-[#E8EEFF] shadow-xs font-semibold'
                                : 'text-slate-600 dark:text-[#8E9FC8] hover:text-slate-900 dark:hover:text-[#E8EEFF]'
                            }`}
                          >
                            <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Code Solutions</span>
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
                          {problem.striver_url ? (
                            <>
                              <span className="text-slate-300 dark:text-slate-700">•</span>
                              <a
                                href={problem.striver_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-[#0D08CB] dark:text-[#E9DEFA] hover:underline"
                              >
                                <span>Striver Guide</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </>
                          ) : (
                            <>
                              <span className="text-slate-300 dark:text-slate-700">•</span>
                              <span className="text-slate-400 dark:text-slate-500 text-xs">
                                Striver Guide Pending
                              </span>
                            </>
                          )}
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
                            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-white dark:bg-[#151D35] p-4 rounded-xl border border-slate-200 dark:border-zinc-800">
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
                                  className="bg-white dark:bg-[#151D35] p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs space-y-2"
                                >
                                  <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] pb-1 border-b border-slate-100 dark:border-zinc-800">
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
                                    className="text-xs font-mono bg-white dark:bg-[#151D35] text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl border border-[#DCD2EC] dark:border-[#044E62]/50 bg-[#E9DEFA]/40 dark:bg-[#044E62]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                              <div className="flex items-center space-x-2 text-[#0D08CB] dark:text-[#E9DEFA] font-medium">
                                <Lock className="w-4 h-4 shrink-0 text-[#0D08CB] dark:text-[#E9DEFA]" />
                                <span>Additional test cases, edge cases, and boundary constraints are locked for visitors.</span>
                              </div>
                              <Link
                                href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                className="px-3.5 py-1.5 rounded-lg bg-[#0D08CB] hover:bg-[#0A06A3] text-white font-semibold text-xs shrink-0 flex items-center space-x-1"
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
                          <div className="bg-white dark:bg-[#151D35] p-4 rounded-xl border border-slate-200 dark:border-zinc-800">
                            <div className="flex items-center space-x-2 mb-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                              <Sparkles className="w-4 h-4" />
                              <span>Core Algorithmic Intuition</span>
                            </div>
                            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                              {currentUser ? problem.approach : `${problem.approach.slice(0, 130)}...`}
                            </p>
                          </div>

                          {!currentUser && (
                            <div className="p-4 rounded-xl border border-[#DCD2EC] dark:border-[#044E62]/50 bg-[#E9DEFA]/40 dark:bg-[#044E62]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                              <div className="flex items-center space-x-2 text-[#0D08CB] dark:text-[#E9DEFA] font-medium">
                                <Lock className="w-4 h-4 shrink-0 text-[#0D08CB] dark:text-[#E9DEFA]" />
                                <span>Full algorithmic walk-through and Big-O proofs are locked for visitors.</span>
                              </div>
                              <Link
                                href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                className="px-3.5 py-1.5 rounded-lg bg-[#0D08CB] hover:bg-[#0A06A3] text-white font-semibold text-xs shrink-0 flex items-center space-x-1"
                              >
                                <span>Sign In to Unlock</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Time Complexity */}
                            <div className="bg-white dark:bg-[#151D35] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-start space-x-3">
                              <div className="p-2.5 rounded-lg bg-[#E9DEFA] dark:bg-[#044E62]/20 text-[#0D08CB] dark:text-[#E9DEFA]">
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
                            <div className="bg-white dark:bg-[#151D35] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-start space-x-3">
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
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer"
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
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E9DEFA] dark:bg-[#044E62]/20 border border-[#DCD2EC] dark:border-[#044E62]/40 text-[#0D08CB] dark:text-[#E9DEFA] hover:bg-[#E9DEFA]/80 dark:hover:bg-[#044E62]/40 transition-colors shadow-sm"
                              >
                                <Lock className="w-3 h-3 text-[#0D08CB] dark:text-[#E9DEFA]" />
                                <span>Sign In to Copy</span>
                              </Link>
                            )}
                          </div>

                          {/* Code Display */}
                          <div className="code-terminal-dark relative rounded-xl overflow-hidden border border-slate-700/60 dark:border-[#1E2B4D] font-mono text-xs shadow-inner">
                            <div className="code-terminal-header flex items-center justify-between px-4 py-2 border-b text-[11px]">
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
                                  <div className="w-10 h-10 rounded-xl bg-[#E9DEFA] dark:bg-[#044E62]/20 text-[#0D08CB] dark:text-[#E9DEFA] flex items-center justify-center mb-2.5 border border-[#DCD2EC] dark:border-[#044E62]/30">
                                    <Lock className="w-5 h-5 text-[#0D08CB] dark:text-[#E9DEFA]" />
                                  </div>
                                  <h4 className="text-sm font-bold text-white mb-1">
                                    Sign in to view full multi-language code
                                  </h4>
                                  <p className="text-xs text-slate-400 max-w-xs mb-3">
                                    Unlock full implementations, optimal time/space solutions, and one-click copy.
                                  </p>
                                  <Link
                                    href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                    className="px-4 py-2 bg-[#0D08CB] hover:bg-[#0A06A3] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#0D08CB]/20 transition-all flex items-center space-x-1.5"
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
                        className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] overflow-hidden shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => togglePatternAccordion(group.pattern)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                              group.solvedCount === group.totalCount && group.totalCount > 0
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-[#E9DEFA] text-[#044E62] dark:bg-[#044E62]/30 dark:text-[#E9DEFA]'
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
                                className="bg-[#044E62] h-full rounded-full transition-all duration-300"
                                style={{ width: `${group.percentage}%` }}
                              />
                            </div>
                            {isGroupOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </div>
                        </button>

                        {isGroupOpen && (
                          <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-zinc-800 space-y-3 bg-slate-50/50 dark:bg-[#0B1020]/40">
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
          <div 
            onClick={(e) => {
              if (e.target === e.currentTarget) setAuthPromptOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          >
            <div className="bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E9DEFA] dark:bg-[#044E62]/20 text-[#0D08CB] dark:text-[#E9DEFA] flex items-center justify-center mb-1 border border-[#DCD2EC] dark:border-[#044E62]/30">
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
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white font-semibold text-xs text-center shadow-md shadow-[#0D08CB]/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Sign In to Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setAuthPromptOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modern Pagination Controls (List View) */}
        {viewMode === 'list' && filteredProblems.length > 0 && pageSize !== -1 && totalPages > 1 && (
          <div className="pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-zinc-800">
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
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1 cursor-pointer"
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
                        ? 'bg-[#0D08CB] text-white shadow-md shadow-[#0D08CB]/20'
                        : 'border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
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
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center space-x-1 cursor-pointer"
                title="Next Page"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Per-page selector pills */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Per page:</span>
              <div className="inline-flex rounded-xl p-0.5 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800">
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
                        ? 'bg-white dark:bg-[#151D35] text-[#0D08CB] dark:text-[#E9DEFA] shadow-xs'
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

export default function DsaHubPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] flex items-center justify-center p-8">
        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
          <div className="w-4 h-4 border-2 border-[#0D08CB] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading DSA Practice Hub...</span>
        </div>
      </div>
    }>
      <DsaHubContent />
    </React.Suspense>
  );
}

