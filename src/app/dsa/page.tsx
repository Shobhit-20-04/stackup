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
  Copy,
  Clock,
  HardDrive,
  Lightbulb,
  FileText,
  Terminal,
  Loader2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { DSA_PROBLEMS, DSA_CATEGORIES, type DsaProblem } from '@/lib/data/dsa';
import { setLocalSectionProgress } from '@/lib/services/progress';
import { getCurrentUser, type UserSession } from '@/lib/auth/session';

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

  // Progressive scroll loading
  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

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

  // Reset visibleCount whenever filters change (React render-phase pattern)
  const filterKey = `${selectedCategory}-${selectedDifficulty}-${searchQuery}-${showOnlyUnsolved}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setVisibleCount(PAGE_SIZE);
  }

  // Progressive infinite scroll intersection observer
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProblems.length && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredProblems.length));
            setIsLoadingMore(false);
          }, 200);
        }
      },
      { threshold: 0.1, rootMargin: '250px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [visibleCount, filteredProblems.length, isLoadingMore]);

  const displayedProblems = useMemo(() => {
    return filteredProblems.slice(0, visibleCount);
  }, [filteredProblems, visibleCount]);

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
                A hand-picked roadmap of high-frequency interview patterns with direct links to LeetCode, Striver&apos;s SDE Sheet, and video solutions. Complete problem statements, examples, and optimal multi-language code snippets.
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
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider pl-1 mr-1">
              Pattern:
            </span>
            {DSA_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
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

        {/* Dynamic Problem Count Header */}
        <div className="flex items-center justify-between px-2 mb-3 text-xs text-zinc-500 dark:text-zinc-400">
          <div>
            Showing <span className="font-semibold text-zinc-800 dark:text-zinc-200">{displayedProblems.length}</span> of{' '}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{filteredProblems.length}</span> problems
          </div>
          {visibleCount < filteredProblems.length && (
            <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Scroll down to reveal more</span>
            </div>
          )}
        </div>

        {/* Problems List */}
        <div className="space-y-4">
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
            displayedProblems.map((problem: DsaProblem) => {
              const isSolved = solvedIds.includes(problem.id);
              const isExpanded = expandedProblemId === problem.id;

              return (
                <div 
                  key={problem.id}
                  className={`bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-200 shadow-sm ${
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

                    {/* Right: Direct Portal Links & Expand Complete Output Button */}
                    <div className="flex items-center space-x-2 sm:self-center self-end pt-2 sm:pt-0">
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
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center space-x-1.5 transition-colors border border-indigo-200/50 dark:border-indigo-900/40"
                        title="Open Striver's SDE Sheet guide"
                      >
                        <span>Striver</span>
                        <BookOpen className="w-3 h-3" />
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                          isExpanded
                            ? 'bg-zinc-800 dark:bg-zinc-700 text-white shadow-sm'
                            : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-200'
                        }`}
                        title="View complete problem output, approach, and code solutions"
                      >
                        <Terminal className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        <span>{isExpanded ? 'Hide Output' : 'Complete Output'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Complete Output Expandable Body */}
                  {isExpanded && (
                    <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/90 rounded-b-2xl p-5 space-y-4">
                      {/* Top Tabs */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="flex items-center space-x-1 bg-zinc-200/70 dark:bg-zinc-800 p-1 rounded-xl">
                          <button
                            onClick={() => setActiveTab('problem')}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'problem'
                                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm font-semibold'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-500" />
                            <span>Problem &amp; Examples</span>
                          </button>

                          <button
                            onClick={() => setActiveTab('approach')}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'approach'
                                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm font-semibold'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                            }`}
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                            <span>Optimal Approach &amp; Complexity</span>
                          </button>

                          <button
                            onClick={() => setActiveTab('code')}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'code'
                                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm font-semibold'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
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
                          <span className="text-zinc-300 dark:text-zinc-700">•</span>
                          <a
                            href={problem.striver_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            <span>Striver Guide</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <span className="text-zinc-300 dark:text-zinc-700">•</span>
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
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                              Problem Statement
                            </h4>
                            <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                              {problem.description}
                            </p>
                          </div>

                          {/* Examples */}
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                              Sample Test Cases &amp; Outputs
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {problem.examples.map((ex, idx) => (
                                <div 
                                  key={idx}
                                  className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs space-y-2"
                                >
                                  <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px] pb-1 border-b border-zinc-100 dark:border-zinc-800">
                                    <span>Example {idx + 1}</span>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-zinc-500 dark:text-zinc-400 block mb-0.5">Input:</span>
                                    <code className="text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded block font-mono">
                                      {ex.input}
                                    </code>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-zinc-500 dark:text-zinc-400 block mb-0.5">Output:</span>
                                    <code className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded block font-mono font-semibold">
                                      {ex.output}
                                    </code>
                                  </div>
                                  {ex.explanation && (
                                    <div className="text-zinc-600 dark:text-zinc-400 pt-1 text-[11px] leading-relaxed">
                                      <span className="font-medium text-zinc-700 dark:text-zinc-300">Explanation: </span>
                                      {ex.explanation}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Constraints */}
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                              Constraints
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {problem.constraints.map((c, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs font-mono bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 2: Optimal Approach & Complexity */}
                      {activeTab === 'approach' && (
                        <div className="space-y-4">
                          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center space-x-2 mb-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                              <Sparkles className="w-4 h-4" />
                              <span>Core Algorithmic Intuition</span>
                            </div>
                            <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                              {problem.approach}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Time Complexity */}
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start space-x-3">
                              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                                <Clock className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                                  Time Complexity
                                </span>
                                <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono mt-0.5 block">
                                  {problem.timeComplexity}
                                </span>
                              </div>
                            </div>

                            {/* Space Complexity */}
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start space-x-3">
                              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                                <HardDrive className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                                  Space Complexity
                                </span>
                                <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono mt-0.5 block">
                                  {problem.spaceComplexity}
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
                            <div className="flex items-center space-x-1.5 bg-zinc-200/80 dark:bg-zinc-800 p-1 rounded-xl">
                              {(['python', 'cpp', 'java', 'typescript'] as const).map((lang) => (
                                <button
                                  key={lang}
                                  onClick={() => setActiveLang(lang)}
                                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                    activeLang === lang
                                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white font-semibold shadow-sm'
                                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                  }`}
                                >
                                  {lang === 'python' ? 'Python 3' : lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'TypeScript'}
                                </button>
                              ))}
                            </div>

                            {currentUser ? (
                              <button
                                onClick={() => handleCopyCode(problem.solutions[activeLang], problem.id)}
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-colors shadow-sm"
                              >
                                {copiedId === problem.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                                    <span>Copy Solution</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <Link
                                href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors shadow-sm"
                              >
                                <Lock className="w-3 h-3 text-indigo-500" />
                                <span>Sign In to Copy</span>
                              </Link>
                            )}
                          </div>

                          {/* Code Display */}
                          <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-xs shadow-inner">
                            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800/80 text-[11px] text-zinc-400">
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
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/90 to-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2.5 border border-indigo-500/30">
                                    <Lock className="w-5 h-5 text-indigo-400" />
                                  </div>
                                  <h4 className="text-sm font-bold text-white mb-1">
                                    Sign in to view full multi-language code
                                  </h4>
                                  <p className="text-xs text-zinc-400 max-w-xs mb-3">
                                    Unlock full implementations, optimal time/space solutions, and one-click copy.
                                  </p>
                                  <Link
                                    href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center space-x-1.5"
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
            })
          )}
        </div>

        {/* Auth Prompt Modal */}
        {authPromptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Sign In Required
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  {authPromptReason || 'Sign in to access this feature and sync your data with your personal profile dashboard.'}
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <Link
                  href={`/login?redirect=${encodeURIComponent('/dsa')}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs text-center shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Sign In to Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setAuthPromptOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-750 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Sentinel for Progressive Loading */}
        <div ref={observerTarget} className="pt-8 pb-4 flex flex-col items-center justify-center">
          {isLoadingMore ? (
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
              <span>Loading more problems on scroll...</span>
            </div>
          ) : visibleCount < filteredProblems.length ? (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredProblems.length))}
              className="px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm transition-all"
            >
              Load More ({filteredProblems.length - displayedProblems.length} remaining)
            </button>
          ) : filteredProblems.length > 0 ? (
            <div className="text-center text-xs text-zinc-400 dark:text-zinc-500 py-2">
              All {filteredProblems.length} problems loaded • Ready to crack your technical interviews
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
