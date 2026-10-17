'use client';

import React, { useState, useMemo, useEffect, useRef, useDeferredValue, Suspense } from 'react';
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
  LayoutList,
  FolderTree,
  CheckCircle2,
  Copy,
  Clock,
  HardDrive,
  Lightbulb,
  Terminal,
  ArrowRight,
  ArrowLeft,
  Flame,
  Award,
  Layers,
  Filter
} from 'lucide-react';
import { DSA_PROBLEMS, type DsaProblem } from '@/lib/data/dsa';
import { setLocalSectionProgress } from '@/lib/services/progress';

// Striver Sheet SDE Topic Categories
const STRIVER_TOPICS = [
  'All Topics',
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Linked List',
  'Trees & BST',
  'Heap / Priority Queue',
  'Backtracking',
  'Graphs',
  'Dynamic Programming',
  'Greedy',
  'Intervals',
  'Stack & Queue',
  'Bit Manipulation',
  'Math & Geometry'
] as const;

function StriverSheetContent() {
  const searchParams = useSearchParams();
  const initialProblemId = searchParams.get('problem') || searchParams.get('id');

  const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false);
  const [viewMode, setViewMode] = useState<'grouped' | 'list'>('grouped');

  // Solved IDs from persistent localStorage
  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('stackup_solved_dsa');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Expanded Problem State
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(initialProblemId || null);
  const [activeTab, setActiveTab] = useState<'problem' | 'approach' | 'code'>('problem');
  const [activeLang, setActiveLang] = useState<'python' | 'cpp' | 'java' | 'typescript'>('python');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Group collapsed state for grouped view
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Auto-scroll to requested problem if deep-linked
  const problemCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (initialProblemId) {
      setExpandedProblemId(initialProblemId);
      setTimeout(() => {
        const el = problemCardRefs.current[initialProblemId];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [initialProblemId]);

  // Toggle solved
  const toggleSolved = (id: string) => {
    setSolvedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('stackup_solved_dsa', JSON.stringify(next));
        const total = DSA_PROBLEMS.length;
        const percent = Math.min(100, Math.round((next.length / total) * 100));
        setLocalSectionProgress('dsa', percent);
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Copy code to clipboard
  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  // Filter problems
  const filteredProblems = useMemo(() => {
    const q = deferredSearchQuery.trim().toLowerCase();
    return DSA_PROBLEMS.filter((p) => {
      if (selectedTopic !== 'All Topics') {
        const normalizedTag = p.pattern_tag.toLowerCase();
        const normalizedTopic = selectedTopic.toLowerCase();
        if (selectedTopic === 'Dynamic Programming') {
          if (!normalizedTag.includes('dynamic') && !normalizedTag.includes('dp')) return false;
        } else if (selectedTopic === 'Trees & BST') {
          if (!normalizedTag.includes('tree') && !normalizedTag.includes('trie')) return false;
        } else if (selectedTopic === 'Graphs') {
          if (!normalizedTag.includes('graph')) return false;
        } else if (!normalizedTag.includes(normalizedTopic) && !normalizedTopic.includes(normalizedTag)) {
          return false;
        }
      }

      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) {
        return false;
      }

      if (showOnlyUnsolved && solvedIds.includes(p.id)) {
        return false;
      }

      if (q) {
        const titleMatch = p.title.toLowerCase().includes(q);
        const patternMatch = p.pattern_tag.toLowerCase().includes(q);
        const companyMatch = p.companies.some((c) => c.toLowerCase().includes(q));
        if (!titleMatch && !patternMatch && !companyMatch) return false;
      }

      return true;
    });
  }, [deferredSearchQuery, selectedTopic, selectedDifficulty, showOnlyUnsolved, solvedIds]);

  // Group by category for grouped view
  const groupedProblems = useMemo(() => {
    const groups: Record<string, DsaProblem[]> = {};
    filteredProblems.forEach((p) => {
      const category = p.pattern_tag;
      if (!groups[category]) groups[category] = [];
      groups[category].push(p);
    });
    return groups;
  }, [filteredProblems]);

  const solvedCount = solvedIds.filter((id) => DSA_PROBLEMS.some((p) => p.id === id)).length;
  const progressPercent = Math.round((solvedCount / DSA_PROBLEMS.length) * 100);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors pb-20">
      {/* Top Banner Navigation */}
      <div className="border-b border-slate-200 dark:border-[#1E2B4D] bg-white/60 dark:bg-[#0B1020]/60 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Link 
              href="/dashboard"
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-slate-300 dark:text-zinc-700">/</span>
            <Link 
              href="/dsa"
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              DSA Practice Hub
            </Link>
            <span className="text-slate-300 dark:text-zinc-700">/</span>
            <span className="font-semibold text-slate-900 dark:text-white">Striver SDE Sheet</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              {solvedCount} / {DSA_PROBLEMS.length} Solved ({progressPercent}%)
            </span>
            <div className="w-20 bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-[#1E2B4D]">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>TakeUForward Official Integration</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#E8EEFF]">
              Striver&apos;s SDE Sheet (150 Mapped Problems)
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-[#8E9FC8] max-w-2xl leading-relaxed">
              Master the authoritative placement roadmap by Raj Vikramaditya (Striver). Every problem includes verified editorial guides, LeetCode portal submissions, YouTube video masterclasses, and multi-language solutions.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-3 bg-white dark:bg-[#151D35] p-3 rounded-2xl border border-slate-200 dark:border-[#1E2B4D] shadow-xs shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total Completion</div>
              <div className="text-base font-extrabold text-slate-900 dark:text-[#E8EEFF]">
                {solvedCount} <span className="text-xs font-normal text-slate-400">/ {DSA_PROBLEMS.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problem title, company (Google, Amazon), or topic..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] text-xs text-slate-900 dark:text-[#E8EEFF] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex rounded-xl border border-slate-200 dark:border-[#1E2B4D] p-1 bg-white dark:bg-[#151D35] shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setViewMode('grouped')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grouped'
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FolderTree className="w-3.5 h-3.5" />
                <span>Grouped</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>

          {/* Difficulty & Status Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                      : 'bg-white dark:bg-[#151D35] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1B2442] border border-slate-200 dark:border-[#1E2B4D]'
                  }`}
                >
                  {diff}
                </button>
              ))}

              <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

              <button
                onClick={() => setShowOnlyUnsolved(!showOnlyUnsolved)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                  showOnlyUnsolved
                    ? 'bg-amber-500 text-white font-semibold'
                    : 'bg-white dark:bg-[#151D35] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1B2442] border border-slate-200 dark:border-[#1E2B4D]'
                }`}
              >
                <Filter className="w-3 h-3" />
                <span>Unsolved Only</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Showing {filteredProblems.length} of {DSA_PROBLEMS.length} problems
            </div>
          </div>

          {/* Category Pills Slider */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            {STRIVER_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTopic === topic
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-white dark:bg-[#151D35] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1E2B4D]'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Problems Render */}
        <div className="mt-6 space-y-6">
          {filteredProblems.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35]">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">No problems found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                No problems matched your current filters. Try resetting the search query or selecting &quot;All Topics&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTopic('All Topics');
                  setSelectedDifficulty('All');
                  setShowOnlyUnsolved(false);
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'grouped' ? (
            Object.entries(groupedProblems).map(([category, problems]) => {
              const isCollapsed = !!collapsedGroups[category];
              const categorySolved = problems.filter((p) => solvedIds.includes(p.id)).length;
              const catPercent = Math.round((categorySolved / problems.length) * 100);

              return (
                <div 
                  key={category}
                  className="rounded-2xl border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] overflow-hidden shadow-xs"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => setCollapsedGroups((prev) => ({ ...prev, [category]: !prev[category] }))}
                    className="w-full p-4 sm:px-6 flex items-center justify-between bg-slate-50/50 dark:bg-[#0B1020]/40 hover:bg-slate-100/50 dark:hover:bg-[#0B1020]/80 transition-colors cursor-pointer text-left border-b border-slate-100 dark:border-[#1E2B4D]"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#E8EEFF]">
                          {category}
                        </h2>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {categorySolved} / {problems.length} Completed ({catPercent}%)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                        <div 
                          className="bg-emerald-500 h-full transition-all duration-300"
                          style={{ width: `${catPercent}%` }}
                        />
                      </div>
                      {isCollapsed ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Category Problems */}
                  {!isCollapsed && (
                    <div className="divide-y divide-slate-100 dark:divide-[#1E2B4D]">
                      {problems.map((problem) => renderProblemCard(problem))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] overflow-hidden divide-y divide-slate-100 dark:divide-[#1E2B4D] shadow-xs">
              {filteredProblems.map((problem) => renderProblemCard(problem))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function renderProblemCard(problem: DsaProblem) {
    const isSolved = solvedIds.includes(problem.id);
    const isExpanded = expandedProblemId === problem.id;

    return (
      <div
        key={problem.id}
        ref={(el) => { problemCardRefs.current[problem.id] = el; }}
        className={`p-4 sm:px-6 transition-colors ${
          isSolved ? 'bg-emerald-50/20 dark:bg-emerald-950/10' : ''
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
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
                    : 'text-slate-900 dark:text-[#E8EEFF]'
                }`}>
                  {problem.title}
                </h3>

                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  problem.difficulty === 'Easy'
                    ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : problem.difficulty === 'Medium'
                    ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                    : 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
                }`}>
                  {problem.difficulty}
                </span>

                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {problem.pattern_tag}
                </span>
              </div>

              {/* Company Badges */}
              <div className="flex items-center space-x-1.5 mt-1.5 flex-wrap gap-y-1 text-xs text-slate-500">
                <Building2 className="w-3 h-3 text-slate-400 mr-0.5" />
                {problem.companies.slice(0, 4).map((c) => (
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

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-1.5 sm:self-center self-start pt-2 sm:pt-0">
            {/* Striver TakeUForward Link */}
            <a
              href={problem.striver_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center space-x-1.5 transition-colors border border-indigo-200/50 dark:border-indigo-900/40"
              title="Open Striver's TakeUForward Editorial"
            >
              <BookOpen className="w-3 h-3" />
              <span>Striver Guide</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            {/* LeetCode Link */}
            <a
              href={problem.leetcode_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center space-x-1.5 transition-colors border border-amber-200/50 dark:border-amber-900/40"
              title="Practice on LeetCode"
            >
              <span>LeetCode</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            {/* YouTube Link */}
            <a
              href={problem.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border border-rose-200/40 dark:border-rose-900/40"
              title="Watch video solution"
            >
              <Video className="w-3.5 h-3.5" />
            </a>

            {/* Solution Accordion Trigger */}
            <button
              onClick={() => {
                if (isExpanded) {
                  setExpandedProblemId(null);
                } else {
                  setExpandedProblemId(problem.id);
                  setActiveTab('problem');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer ${
                isExpanded
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#1B2442] dark:hover:bg-[#223055] text-slate-700 dark:text-[#E8EEFF] border border-slate-200 dark:border-[#1E2B4D]'
              }`}
            >
              <span>{isExpanded ? 'Hide Solution' : 'View Solution'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3 h-3 ml-0.5" />
              ) : (
                <ChevronDown className="w-3 h-3 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Solution Drawer */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-[#1E2B4D] animate-in fade-in duration-200">
            {/* Tab Switches */}
            <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-[#1E2B4D] pb-2 text-xs">
              <button
                onClick={() => setActiveTab('problem')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeTab === 'problem'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Problem Statement
              </button>
              <button
                onClick={() => setActiveTab('approach')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeTab === 'approach'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Intuition &amp; Complexity
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Optimal Code
              </button>
            </div>

            {/* Tab 1: Problem Statement */}
            {activeTab === 'problem' && (
              <div className="pt-3 space-y-3 text-xs">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {problem.description}
                </p>

                {problem.examples && problem.examples.length > 0 && (
                  <div className="space-y-2 mt-3">
                    <span className="font-bold text-slate-900 dark:text-white block">Examples:</span>
                    {problem.examples.map((ex, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-[#1E2B4D] font-mono text-[11px] space-y-1">
                        <div><strong className="text-slate-500">Input:</strong> {ex.input}</div>
                        <div><strong className="text-slate-500">Output:</strong> {ex.output}</div>
                        {ex.explanation && (
                          <div className="text-slate-500"><strong className="text-slate-400">Explanation:</strong> {ex.explanation}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {problem.constraints && (
                  <div className="mt-3">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Constraints:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-500 font-mono text-[11px]">
                      {problem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Approach & Complexity */}
            {activeTab === 'approach' && (
              <div className="pt-3 space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-900/40 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div className="flex items-center space-x-1.5 font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Algorithmic Intuition</span>
                  </div>
                  {problem.approach}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-[#1E2B4D] flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Time Complexity</div>
                      <div className="font-mono text-xs text-slate-900 dark:text-white">{problem.timeComplexity}</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0B1020] border border-slate-200 dark:border-[#1E2B4D] flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-indigo-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Space Complexity</div>
                      <div className="font-mono text-xs text-slate-900 dark:text-white">{problem.spaceComplexity}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Complete Optimal Code */}
            {activeTab === 'code' && (
              <div className="pt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 bg-slate-100 dark:bg-[#0B1020] p-1 rounded-lg border border-slate-200 dark:border-[#1E2B4D]">
                    {(['python', 'cpp', 'java', 'typescript'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-colors cursor-pointer ${
                          activeLang === lang
                            ? 'bg-white dark:bg-[#151D35] text-slate-900 dark:text-white shadow-xs font-bold'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {lang === 'cpp' ? 'C++' : lang === 'typescript' ? 'JS/TS' : lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopyCode(problem.solutions[activeLang], problem.id)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0B1020] border border-slate-200 dark:border-[#1E2B4D] flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    {copiedId === problem.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-[#1E2B4D] bg-[#090D1A]">
                  <pre className="p-4 text-[11px] sm:text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{problem.solutions[activeLang]}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default function StriverSheetPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-8">
        <div className="animate-pulse text-xs text-slate-400">Loading Striver&apos;s SDE Sheet...</div>
      </div>
    }>
      <StriverSheetContent />
    </Suspense>
  );
}
