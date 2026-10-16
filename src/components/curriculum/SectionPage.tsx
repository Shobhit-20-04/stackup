'use client';

import React, { useState, useEffect, useMemo, useCallback, useDeferredValue } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  BookOpen, 
  Cpu, 
  Database, 
  Network, 
  Code2, 
  Server,
  GitBranch,
  Terminal,
  Layers,
  Search, 
  Clock, 
  Play, 
  Lock, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  X,
  Sparkles,
  Zap,
  Check,
  SlidersHorizontal,
  Building2,
  Video
} from 'lucide-react';
import { CURRICULUM_DATA, type Topic, type SectionCategory } from '@/lib/data/curriculum';
import { getSectionMetrics, getReadTopicIds, getLocalQuizAttempts } from '@/lib/services/progress';
import { getCurrentUser, type UserSession } from '@/lib/auth/session';
// Lazy-load Markdown parser and Quiz Engine to reduce initial bundle and accelerate FCP
const TopicNotes = dynamic(() => import('./TopicNotes'), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 space-y-6 animate-pulse">
      <div className="h-28 bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-3xl" />
      <div className="h-64 bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-3xl" />
    </div>
  ),
});

const QuizEngine = dynamic(() => import('./QuizEngine'), {
  ssr: false,
  loading: () => (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 space-y-6 animate-pulse">
      <div className="h-20 bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-3xl" />
      <div className="h-72 bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-3xl" />
    </div>
  ),
});

interface SectionPageProps {
  sectionKey: 'aptitude' | 'core-cs';
}

export default function SectionPage({ sectionKey }: SectionPageProps) {
  const section = CURRICULUM_DATA[sectionKey];
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const isSearchPending = searchQuery !== deferredSearchQuery;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [subjectCluster, setSubjectCluster] = useState<'all' | 'systems' | 'algo-theory' | 'math' | 'software'>('all');
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [cheatsheetSearch, setCheatsheetSearch] = useState('');
  const deferredCheatsheetSearch = useDeferredValue(cheatsheetSearch);
  const [cheatsheetCategory, setCheatsheetCategory] = useState<string>('all');

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'notes' | 'quiz'>('list');

  // Global keyboard shortcuts (Escape to close modals or return to syllabus view)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCheatsheetOpen) {
          setIsCheatsheetOpen(false);
        } else if (activeView !== 'list') {
          setActiveView('list');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheatsheetOpen, activeView]);

  // Metrics
  const [metricsRefresh, setMetricsRefresh] = useState(0);
  const metrics = useMemo(() => {
    void metricsRefresh;
    return getSectionMetrics(sectionKey);
  }, [sectionKey, metricsRefresh]);

  // Derive completed topics (quizzes attempted or read) with zero cascading re-renders
  const completedTopicIds = useMemo(() => {
    if (typeof window === 'undefined') return new Set<string>();
    void metricsRefresh;
    void activeView;
    const readIds = getReadTopicIds();
    const attempts = getLocalQuizAttempts();
    const sectionAttempts = attempts
      .filter((a) => a.sectionSlug === sectionKey)
      .map((a) => a.topicId);
    return new Set([...readIds, ...sectionAttempts]);
  }, [sectionKey, metricsRefresh, activeView]);

  // Authentication state for gating interactive quizzes
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);

  useEffect(() => {
    void getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

  // Keyboard escape for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCheatsheetOpen(false);
        setAuthPromptOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartQuiz = (topic: Topic) => {
    if (!currentUser) {
      setSelectedTopic(topic);
      setAuthPromptOpen(true);
      return;
    }
    setSelectedTopic(topic);
    setActiveView('quiz');
  };

  const getDifficultyBadge = (difficulty?: 'Easy' | 'Medium' | 'Hard') => {
    const diff = difficulty || 'Medium';
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20';
      case 'Medium':
      default:
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
    }
  };

  const getCategoryTheme = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return {
          icon: <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-indigo-500/10 border-indigo-500/20',
        };
      case 'Database':
        return {
          icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-emerald-500/10 border-emerald-500/20',
        };
      case 'Network':
        return {
          icon: <Network className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-cyan-500/10 border-cyan-500/20',
        };
      case 'Code2':
        return {
          icon: <Code2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-amber-500/10 border-amber-500/20',
        };
      case 'Server':
        return {
          icon: <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-indigo-500/10 border-indigo-500/20',
        };
      case 'GitBranch':
        return {
          icon: <GitBranch className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-rose-500/10 border-rose-500/20',
        };
      case 'Terminal':
        return {
          icon: <Terminal className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-violet-500/10 border-violet-500/20',
        };
      case 'Layers':
        return {
          icon: <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-teal-500/10 border-teal-500/20',
        };
      default:
        return {
          icon: <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
          border: 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700',
          bg: 'bg-white dark:bg-[#151D35]',
          badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60',
          iconBg: 'bg-indigo-500/10 border-indigo-500/20',
        };
    }
  };

  // Topic filter helper
  const filterTopic = useCallback((t: Topic): boolean => {
    if (selectedDifficulty !== 'all') {
      const diff = t.difficulty || 'Medium';
      if (diff !== selectedDifficulty) return false;
    }
    if (selectedStatus !== 'all') {
      const isCompleted = completedTopicIds.has(t.id);
      if (selectedStatus === 'completed' && !isCompleted) return false;
      if (selectedStatus === 'incomplete' && isCompleted) return false;
    }
    return true;
  }, [selectedDifficulty, selectedStatus, completedTopicIds]);

  // Find the active single category object if one is selected
  const activeCategoryObj = useMemo(() => {
    if (!section || selectedCategory === 'all') return null;
    return section.categories.find((c) => c.id === selectedCategory) || null;
  }, [section, selectedCategory]);

  // Find next/prev category for fast sequential switching
  const { prevCategory, nextCategory } = useMemo(() => {
    if (!section || !activeCategoryObj) return { prevCategory: null, nextCategory: null };
    const idx = section.categories.findIndex((c) => c.id === activeCategoryObj.id);
    return {
      prevCategory: idx > 0 ? section.categories[idx - 1] : null,
      nextCategory: idx < section.categories.length - 1 ? section.categories[idx + 1] : null,
    };
  }, [section, activeCategoryObj]);

  // Filtered topics for the active category
  const filteredActiveTopics = useMemo(() => {
    if (!activeCategoryObj) return [];
    return activeCategoryObj.topics.filter(filterTopic);
  }, [activeCategoryObj, filterTopic]);

  // Search Results Mode with Concurrent Deferred Query (maintains 60fps input response)
  const searchResults = useMemo(() => {
    if (!section || !deferredSearchQuery.trim()) return null;
    const q = deferredSearchQuery.toLowerCase().trim();
    const results: { topic: Topic; category: SectionCategory }[] = [];
    section.categories.forEach((cat) => {
      cat.topics.forEach((t) => {
        const matchesQuery = 
          t.title.toLowerCase().includes(q) || 
          t.description.toLowerCase().includes(q) ||
          t.companyTags?.some(tag => tag.toLowerCase().includes(q)) ||
          t.keyTakeaways?.some(k => k.toLowerCase().includes(q));

        if (matchesQuery && filterTopic(t)) {
          results.push({ topic: t, category: cat });
        }
      });
    });
    return results;
  }, [section, deferredSearchQuery, filterTopic]);

  // Filtered categories for Subject Dashboard view
  const filteredDashboardCategories = useMemo(() => {
    if (!section) return [];
    if (sectionKey !== 'core-cs' || subjectCluster === 'all') return section.categories;
    
    switch (subjectCluster) {
      case 'systems':
        return section.categories.filter((c) => ['os', 'dbms', 'cn', 'coa', 'compiler-design', 'dld'].includes(c.id));
      case 'algo-theory':
        return section.categories.filter((c) => ['c-prog', 'data-structures', 'algorithms', 'toc'].includes(c.id));
      case 'math':
        return section.categories.filter((c) => ['discrete-math', 'eng-math'].includes(c.id));
      case 'software':
        return section.categories.filter((c) => ['oops', 'system-design', 'swe-git'].includes(c.id));
      default:
        return section.categories;
    }
  }, [section, sectionKey, subjectCluster]);

  // Cheatsheet Compiled Topics
  const cheatsheetTopics = useMemo(() => {
    if (!section) return [];
    const list: { topic: Topic; category: SectionCategory }[] = [];
    const q = deferredCheatsheetSearch.toLowerCase().trim();

    section.categories.forEach((cat) => {
      if (cheatsheetCategory !== 'all' && cat.id !== cheatsheetCategory) return;
      cat.topics.forEach((t) => {
        if (!q) {
          list.push({ topic: t, category: cat });
        } else {
          const match = 
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.companyTags?.some(tag => tag.toLowerCase().includes(q)) ||
            t.keyTakeaways?.some(k => k.toLowerCase().includes(q));
          if (match) list.push({ topic: t, category: cat });
        }
      });
    });
    return list;
  }, [section, cheatsheetCategory, deferredCheatsheetSearch]);

  if (!section) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Section not found</h2>
        <Link href="/" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mt-2 inline-flex items-center space-x-1">
          <span>← Back to home</span>
        </Link>
      </div>
    );
  }

  // Active Quiz View
  if (activeView === 'quiz' && selectedTopic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <QuizEngine
          topic={selectedTopic}
          sectionSlug={sectionKey}
          onExitQuiz={() => {
            setMetricsRefresh((p) => p + 1);
            setActiveView('notes');
          }}
        />
      </div>
    );
  }

  // Active Topic Notes View
  if (activeView === 'notes' && selectedTopic) {
    const currentCat = section.categories.find((c) => c.topics.some((t) => t.id === selectedTopic.id));
    const catTopics = currentCat ? currentCat.topics : [];
    const topicIdx = catTopics.findIndex((t) => t.id === selectedTopic.id);
    const prevTopic = topicIdx > 0 ? catTopics[topicIdx - 1] : null;
    const nextTopic = topicIdx < catTopics.length - 1 ? catTopics[topicIdx + 1] : null;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <TopicNotes
          topic={selectedTopic}
          sectionSlug={sectionKey}
          categoryTitle={currentCat?.title}
          onBack={() => {
            setMetricsRefresh((p) => p + 1);
            setActiveView('list');
          }}
          prevTopic={prevTopic}
          nextTopic={nextTopic}
          onSelectTopic={(t) => setSelectedTopic(t)}
          onStartQuiz={() => handleStartQuiz(selectedTopic)}
        />
      </div>
    );
  }

  const hasActiveFilters = selectedDifficulty !== 'all' || selectedStatus !== 'all';
  const accentBadgeClasses = 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80';
  const accentProgressBg = 'bg-indigo-600 dark:bg-indigo-500';
  const accentTextClasses = 'text-indigo-600 dark:text-indigo-400';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold border ${accentBadgeClasses}`}>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Placement Interview Curriculum • Structured Modules</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {section.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
            {section.description}
          </p>

          <div className="pt-1">
            <button
              onClick={() => setIsCheatsheetOpen(true)}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 dark:hover:bg-zinc-750 text-white font-semibold text-xs border border-slate-700/80 dark:border-zinc-700 shadow-xs transition-all cursor-pointer"
            >
              {currentUser ? (
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>⚡ Quick Revision Cheatsheet {!currentUser && '(Sign In to Unlock)'}</span>
            </button>
          </div>
        </div>

        {/* Progress Metric */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181b] w-full md:w-64 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600 dark:text-zinc-400 uppercase tracking-wider text-[11px]">Syllabus Progress</span>
            <span className={`font-extrabold ${accentTextClasses}`}>{metrics.percent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${accentProgressBg}`}
              style={{ width: `${metrics.percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
            <span>{metrics.completed} of {metrics.total} topics completed</span>
            <span>{section.categories.reduce((acc, c) => acc + c.topics.reduce((q, t) => q + t.questions.length, 0), 0)} MCQs</span>
          </div>
        </div>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={`Search all ${section.name} topics`}
            placeholder={`Search all ${section.name.toLowerCase()} topics (e.g. Deadlocks, TCP 3-Way, Normalization, Probability)...`}
            className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-[#151D35] text-sm font-medium text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
          {isSearchPending ? (
            <div className="absolute right-3.5 top-3.5">
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Filter Chips Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 dark:text-zinc-400 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

            {/* Difficulty Filter */}
            <div className="inline-flex rounded-xl p-0.5 bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-xs font-semibold">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedDifficulty === 'all'
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                All Difficulty
              </button>
              <button
                onClick={() => setSelectedDifficulty('Easy')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedDifficulty === 'Easy'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setSelectedDifficulty('Medium')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedDifficulty === 'Medium'
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setSelectedDifficulty('Hard')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedDifficulty === 'Hard'
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400'
                }`}
              >
                Hard
              </button>
            </div>

            {/* Status Filter */}
            <div className="inline-flex rounded-xl p-0.5 bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-xs font-semibold">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedStatus === 'all'
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setSelectedStatus('completed')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedStatus === 'completed'
                    ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold border border-emerald-500/20'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                ✓ Completed
              </button>
              <button
                onClick={() => setSelectedStatus('incomplete')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedStatus === 'incomplete'
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                ○ Incomplete
              </button>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSelectedDifficulty('all');
                setSelectedStatus('all');
              }}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Sticky Subject Chip Switcher */}
      <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-slate-50/95 dark:bg-[#0B1020]/95 backdrop-blur-md border-y sm:border-y-0 sm:rounded-2xl border-slate-200 dark:border-zinc-800">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 pt-0.5">
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'all' && !searchQuery
                ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs'
                : 'bg-white dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Subject Dashboard ({section.categories.length})</span>
          </button>

          {section.categories.map((cat) => {
            const isSelected = selectedCategory === cat.id && !searchQuery;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs'
                    : 'bg-white dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isSelected 
                    ? 'bg-white/20 dark:bg-zinc-900/15 text-white dark:text-zinc-950' 
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                }`}>
                  {cat.topics.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: SEARCH RESULTS MODE */}
      {searchResults !== null && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Search className="w-4 h-4 text-indigo-500" />
              <span>Search Results for &quot;{searchQuery}&quot; ({searchResults.length})</span>
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#151D35] rounded-3xl border border-slate-200 dark:border-zinc-800 space-y-2">
              <p className="text-sm font-bold text-slate-900 dark:text-white">No topics matching your criteria</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Try adjusting your filters or keywords like &quot;Deadlock&quot;, &quot;TCP&quot;, &quot;Normal Form&quot;, or &quot;Probability&quot;.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {searchResults.map(({ topic, category }) => {
                const isCompleted = completedTopicIds.has(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => { setSelectedTopic(topic); setActiveView('notes'); }}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] hover:border-slate-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60">
                            {category.title}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getDifficultyBadge(topic.difficulty)}`}>
                            {topic.difficulty || 'Medium'}
                          </span>
                        </div>
                        {isCompleted && (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed font-normal">
                        {topic.description}
                      </p>

                      {topic.companyTags && topic.companyTags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          {topic.companyTags.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300"
                            >
                              {comp}
                            </span>
                          ))}
                          {topic.companyTags.length > 3 && (
                            <span className="text-[10px] font-semibold text-slate-400">
                              +{topic.companyTags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <span>Study Module Notes ({topic.questions.length} MCQs)</span>
                      <div className="flex items-center space-x-2">
                        {topic.youtube_url && (
                          <a
                            href={topic.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/50 dark:border-rose-900/40 transition-colors inline-flex items-center"
                            title="Study topic on YouTube"
                          >
                            <Video className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: SUBJECT DASHBOARD */}
      {searchResults === null && selectedCategory === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Choose a Subject to Study ({filteredDashboardCategories.length} Modules Available)</span>
            </h2>
            <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-500">Tap any subject to open syllabus</span>
          </div>

          {/* Quick Subject Cluster Filter Tabs for Core CS */}
          {sectionKey === 'core-cs' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All Subjects', count: 15 },
                { id: 'systems', label: 'Systems & Architecture', count: 6 },
                { id: 'algo-theory', label: 'Algorithms & Foundations', count: 4 },
                { id: 'math', label: 'Mathematics', count: 2 },
                { id: 'software', label: 'Software & Design', count: 3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSubjectCluster(tab.id as 'all' | 'systems' | 'algo-theory' | 'math' | 'software')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    subjectCluster === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-[#151D35] text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredDashboardCategories.map((cat) => {
              const theme = getCategoryTheme(cat.icon);
              const completedCount = cat.topics.filter((t) => completedTopicIds.has(t.id)).length;
              const catPercent = Math.round((completedCount / cat.topics.length) * 100);

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xs hover:shadow-sm cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} border flex items-center justify-center shrink-0`}>
                        {theme.icon}
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(cat.title + ' gate lecture course')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1 rounded-xl text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200/50 dark:border-rose-900/40 transition-colors inline-flex items-center space-x-1"
                          title={`Watch ${cat.title} video lectures on YouTube`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">Videos</span>
                        </a>
                        <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-xl ${theme.badge}`}>
                          {cat.topics.length} Topics
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {cat.description}
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                        <span className="text-slate-500 dark:text-zinc-400">Subject Progress</span>
                        <span className="text-slate-900 dark:text-zinc-100 font-bold">
                          {completedCount} / {cat.topics.length} ({catPercent}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all"
                          style={{ width: `${catPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <span>Study Syllabus ({cat.topics.length} Modules)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: DEDICATED SUBJECT SYLLABUS WORKSPACE */}
      {searchResults === null && activeCategoryObj !== null && (
        <div className="space-y-6 animate-in fade-in">
          {/* Breadcrumb & Quick Subject Nav */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-zinc-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-white bg-white dark:bg-[#151D35] border border-slate-300 dark:border-zinc-800 px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer self-start"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← All Subjects Dashboard</span>
            </button>

            {/* Quick Next/Prev Subject Stepper */}
            <div className="flex items-center space-x-2 self-start sm:self-center">
              {prevCategory && (
                <button
                  onClick={() => setSelectedCategory(prevCategory.id)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-850 text-[11px] font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  ← {prevCategory.title}
                </button>
              )}
              {nextCategory && (
                <button
                  onClick={() => setSelectedCategory(nextCategory.id)}
                  className="px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/40 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>Next: {nextCategory.title}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Subject Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#151D35] text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Active Subject Study Track
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {activeCategoryObj.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                {activeCategoryObj.description}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 shrink-0 text-center w-full md:w-auto">
              <div className="text-xs font-bold text-slate-500 dark:text-zinc-400">Filtered Modules</div>
              <div className="text-lg font-black text-slate-900 dark:text-white">
                {filteredActiveTopics.length} of {activeCategoryObj.topics.length}
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold"> Shown</span>
              </div>
            </div>
          </div>

          {/* Topic Modules List */}
          {filteredActiveTopics.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#151D35] rounded-3xl border border-slate-200 dark:border-zinc-800 space-y-2">
              <p className="text-sm font-bold text-slate-900 dark:text-white">No modules match your current filter</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Try changing difficulty or status filters to view modules.</p>
              <button
                onClick={() => {
                  setSelectedDifficulty('all');
                  setSelectedStatus('all');
                }}
                className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredActiveTopics.map((topic, index) => {
                const isCompleted = completedTopicIds.has(topic.id);

                return (
                  <div
                    key={topic.id}
                    onClick={() => { setSelectedTopic(topic); setActiveView('notes'); }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group shadow-xs hover:shadow-sm ${
                      isCompleted
                        ? 'border-emerald-500/20 bg-emerald-500/5'
                        : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] hover:border-slate-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5 min-w-0">
                      {/* Step Number or Checkmark */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60'
                      }`}>
                        {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {topic.title}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getDifficultyBadge(topic.difficulty)}`}>
                            {topic.difficulty || 'Medium'}
                          </span>
                          {isCompleted ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                              ✓ Completed
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700/60">
                              Ready to Study
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                          {topic.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] font-semibold text-slate-500 dark:text-zinc-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-indigo-500" />
                            <span>{topic.estimatedMinutes} min read</span>
                          </span>
                          <span>•</span>
                          <span>{topic.questions.length} MCQ Questions</span>

                          {topic.companyTags && topic.companyTags.length > 0 && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                {topic.companyTags.slice(0, 3).map((comp) => (
                                  <span key={comp} className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                                    {comp}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 self-stretch md:self-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-zinc-800/80 shrink-0">
                      {topic.youtube_url && (
                        <a
                          href={topic.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 transition-colors inline-flex items-center justify-center"
                          title="Watch video lecture on YouTube"
                        >
                          <Video className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopic(topic);
                          setActiveView('notes');
                        }}
                        className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-850 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-center shadow-xs"
                      >
                        Read Notes
                      </button>
                      {topic.questions.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartQuiz(topic);
                          }}
                          className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Start Quiz</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* QUICK REVISION CHEATSHEET MODAL */}
      {isCheatsheetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-zinc-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-[#18181b]/50">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Rapid Placement Cheatsheet</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  ⚡ High-Yield Principles &amp; Key Takeaways
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Formula cards and core interview concepts compiled across {section.name}.
                </p>
              </div>

              <button
                onClick={() => setIsCheatsheetOpen(false)}
                aria-label="Close revision cheatsheet"
                className="w-8 h-8 rounded-xl bg-slate-200/70 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cheatsheet Body */}
            {!currentUser ? (
              <div className="flex-1 p-8 sm:p-14 text-center flex flex-col items-center justify-center space-y-4 my-auto bg-slate-50/50 dark:bg-[#151D35]/50">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/10">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="max-w-md space-y-2">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">
                    Sign In Required for Revision Cheatsheet
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Quick Revision Cheatsheets provide high-yield formula cards, algorithmic complexities, and rapid interview takeaways compiled across all {section.name} modules. Sign in to your StackUp account to unlock full access.
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/${sectionKey}`)}`}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Sign In to Unlock Cheatsheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setIsCheatsheetOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Cheatsheet Controls */}
                <div className="p-4 border-b border-slate-200 dark:border-zinc-800 space-y-3 bg-white dark:bg-[#151D35]">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={cheatsheetSearch}
                      onChange={(e) => setCheatsheetSearch(e.target.value)}
                      aria-label="Filter formulas or concepts"
                      placeholder="Filter formulas or concepts (e.g. Virtual Memory, Deadlock, Work Rate, ACID)..."
                      className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-300 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181b] text-xs font-medium text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {cheatsheetSearch && (
                      <button
                        onClick={() => setCheatsheetSearch('')}
                        aria-label="Clear cheatsheet filter"
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Cheatsheet Subject Tabs */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none pb-0.5">
                    <button
                      onClick={() => setCheatsheetCategory('all')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        cheatsheetCategory === 'all'
                          ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      All ({section.categories.length})
                    </button>
                    {section.categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCheatsheetCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          cheatsheetCategory === cat.id
                            ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs'
                            : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cheatsheet Content List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  {cheatsheetTopics.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 dark:text-zinc-500 text-xs">
                      No revision topics match your search query.
                    </div>
                  ) : (
                    cheatsheetTopics.map(({ topic, category }) => (
                      <div
                        key={topic.id}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#151D35] space-y-3 shadow-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60">
                              {category.title}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {topic.title}
                            </h4>
                          </div>

                          <div className="flex items-center space-x-2">
                            {topic.youtube_url && (
                              <a
                                href={topic.youtube_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/50 dark:border-rose-900/40 transition-colors inline-flex items-center"
                                title="Study topic on YouTube"
                              >
                                <Video className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => {
                                setIsCheatsheetOpen(false);
                                setSelectedTopic(topic);
                                setActiveView('notes');
                              }}
                              className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-zinc-800 text-[11px] font-bold text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                              Notes →
                            </button>
                            {topic.questions.length > 0 && (
                              <button
                                onClick={() => {
                                  setIsCheatsheetOpen(false);
                                  handleStartQuiz(topic);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer flex items-center space-x-1"
                              >
                                <Play className="w-2.5 h-2.5 fill-white" />
                                <span>Quiz ({topic.questions.length})</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Key Takeaways */}
                        {topic.keyTakeaways && topic.keyTakeaways.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {topic.keyTakeaways.map((takeaway, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-white dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800/80 text-xs text-slate-700 dark:text-zinc-200 flex items-start space-x-2"
                              >
                                <Check className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                                <span className="leading-snug font-medium">{takeaway}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 dark:text-zinc-500 italic">
                            {topic.description}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181b] flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
              <span>Showing {cheatsheetTopics.length} high-yield revision modules</span>
              <button
                onClick={() => setIsCheatsheetOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 font-bold text-slate-700 dark:text-zinc-200 hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Close Cheatsheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Prompt Modal */}
      {authPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#151D35] border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Sign In Required
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1.5 leading-relaxed font-normal">
                Sign in to take interactive timed quizzes, unlock rapid placement revision cheatsheets, and sync your diagnostics with your student profile.
              </p>
            </div>
            <div className="flex items-center space-x-2.5 pt-2">
              <Link
                href={`/login?redirect=${encodeURIComponent(`/${sectionKey}`)}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs text-center shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setAuthPromptOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
