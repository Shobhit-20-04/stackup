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
  Zap,
  Check,
  SlidersHorizontal,
  Building2,
  Video
} from 'lucide-react';
import { CURRICULUM_DATA, type Topic, type SectionCategory } from '@/lib/data/curriculum';
import { getSectionMetrics, getReadTopicIds, getLocalQuizAttempts } from '@/lib/services/progress';
import { getCurrentUser, getFastCachedUser, type UserSession } from '@/lib/auth/session';
// Lazy-load Markdown parser and Quiz Engine to reduce initial bundle and accelerate FCP
const TopicNotes = dynamic(() => import('./TopicNotes'), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 space-y-6 animate-pulse">
      <div className="h-28 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg" />
      <div className="h-64 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg" />
    </div>
  ),
});

const QuizEngine = dynamic(() => import('./QuizEngine'), {
  ssr: false,
  loading: () => (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 space-y-6 animate-pulse">
      <div className="h-20 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg" />
      <div className="h-72 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg" />
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

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window === 'undefined') return 'all';
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash && section.categories.some((c) => c.id === hash)) {
        return hash;
      }
    } catch {
      // ignore
    }
    return 'all';
  });
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

  // Synchronize category selection when URL hash changes (e.g. /core-cs#os or /aptitude#quant-apt)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && section.categories.some((c) => c.id === hash)) {
        setSelectedCategory(hash);
        setSearchQuery('');
      } else if (!hash) {
        setSelectedCategory('all');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [section.categories]);

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
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
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
          icon: <Cpu className="w-5 h-5 text-[#044E62] dark:text-[#E9DEFA]" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-[#E9DEFA] dark:bg-[#044E62]/20 border-[#DCD2EC] dark:border-[#044E62]/30',
        };
      case 'Database':
        return {
          icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-emerald-500/10 border-emerald-500/20',
        };
      case 'Network':
        return {
          icon: <Network className="w-5 h-5 text-[#044E62] dark:text-[#E9DEFA]" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-[#E9DEFA] dark:bg-[#044E62]/20 border-[#DCD2EC] dark:border-[#044E62]/30',
        };
      case 'Code2':
        return {
          icon: <Code2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-amber-500/10 border-amber-500/20',
        };
      case 'Server':
        return {
          icon: <Server className="w-5 h-5 text-[#044E62] dark:text-[#E9DEFA]" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-[#E9DEFA] dark:bg-[#044E62]/20 border-[#DCD2EC] dark:border-[#044E62]/30',
        };
      case 'GitBranch':
        return {
          icon: <GitBranch className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-rose-500/10 border-rose-500/20',
        };
      case 'Terminal':
        return {
          icon: <Terminal className="w-5 h-5 text-[#044E62] dark:text-[#E9DEFA]" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-[#E9DEFA] dark:bg-[#044E62]/20 border-[#DCD2EC] dark:border-[#044E62]/30',
        };
      case 'Layers':
        return {
          icon: <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-teal-500/10 border-teal-500/20',
        };
      default:
        return {
          icon: <BookOpen className="w-5 h-5 text-[#044E62] dark:text-[#E9DEFA]" />,
          border: 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
          bg: 'bg-[var(--surface-card)]',
          badge: 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]',
          iconBg: 'bg-[#E9DEFA] dark:bg-[#044E62]/20 border-[#DCD2EC] dark:border-[#044E62]/30',
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
        <h2 className="text-xl font-bold text-[var(--foreground)]">Section not found</h2>
        <Link href="/" className="text-sm font-semibold text-[#044E62] dark:text-[#E9DEFA] hover:underline mt-2 inline-flex items-center space-x-1">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 page-enter">
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]">
            <BookOpen className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
            <span>Curriculum Syllabus</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
            {section.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
            {section.description}
          </p>

          <div className="pt-1">
            <button
              onClick={() => setIsCheatsheetOpen(true)}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 text-white font-medium text-xs shadow-xs transition-opacity cursor-pointer"
            >
              {currentUser ? (
                <Zap className="w-3.5 h-3.5 text-amber-300" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span>Revision Cheatsheet {!currentUser && '(Sign in to unlock)'}</span>
            </button>
          </div>
        </div>

        {/* Progress Metric */}
        <div className="p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] w-full md:w-64 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)]">Syllabus Progress</span>
            <span className="font-mono font-bold text-[var(--brand-primary)]">{metrics.percent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--brand-primary)] transition-all duration-500 ease-out"
              style={{ width: `${metrics.percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--foreground-muted)] font-mono">
            <span>{metrics.completed} of {metrics.total} topics</span>
            <span>{section.categories.reduce((acc, c) => acc + c.topics.reduce((q, t) => q + t.questions.length, 0), 0)} MCQs</span>
          </div>
        </div>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={`Search all ${section.name} topics`}
            placeholder={`Search all ${section.name.toLowerCase()} topics (e.g. Deadlocks, TCP 3-Way, Normalization, Probability)...`}
            className="w-full pl-9 pr-9 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] text-xs font-medium text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)] shadow-xs"
          />
          {isSearchPending ? (
            <div className="absolute right-3 top-2.5">
              <div className="w-4 h-4 border-2 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute right-3 top-2.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Filter Chips Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1.5 text-xs text-[var(--foreground-muted)] mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

            {/* Difficulty Filter */}
            <div className="inline-flex rounded-lg p-0.5 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs font-medium">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  selectedDifficulty === 'all'
                    ? 'bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)] font-semibold shadow-xs'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                All Difficulty
              </button>
              <button
                onClick={() => setSelectedDifficulty('Easy')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  selectedDifficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold shadow-xs'
                    : 'text-[var(--foreground-muted)] hover:text-emerald-500'
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setSelectedDifficulty('Medium')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  selectedDifficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 font-semibold shadow-xs'
                    : 'text-[var(--foreground-muted)] hover:text-amber-500'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setSelectedDifficulty('Hard')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  selectedDifficulty === 'Hard'
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 font-semibold shadow-xs'
                    : 'text-[var(--foreground-muted)] hover:text-rose-500'
                }`}
              >
                Hard
              </button>
            </div>

            {/* Status Filter */}
            <div className="inline-flex rounded-lg p-0.5 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs font-medium">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  selectedStatus === 'all'
                    ? 'bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)] font-semibold shadow-xs'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setSelectedStatus('completed')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  selectedStatus === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold shadow-xs'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                ✓ Completed
              </button>
              <button
                onClick={() => setSelectedStatus('incomplete')}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  selectedStatus === 'incomplete'
                    ? 'bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)] font-semibold shadow-xs'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
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
              className="text-xs font-medium text-[var(--brand-primary)] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Sticky Subject Chip Switcher */}
      <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none pb-1 pt-0.5">
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'all' && !searchQuery
                ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] border border-[var(--border-subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Subjects ({section.categories.length})</span>
          </button>

          {section.categories.map((cat) => {
            const isSelected = selectedCategory === cat.id && !searchQuery;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] border border-[var(--border-subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)]'
                }`}
              >
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)]'
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
            <h2 className="text-sm font-black text-[var(--foreground)] uppercase tracking-wider flex items-center space-x-2">
              <Search className="w-4 h-4 text-[#044E62] dark:text-[#E9DEFA]" />
              <span>Search Results for &quot;{searchQuery}&quot; ({searchResults.length})</span>
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#044E62] dark:text-[#E9DEFA] hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-12 text-center bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] space-y-2">
              <p className="text-sm font-bold text-[var(--foreground)]">No topics matching your criteria</p>
              <p className="text-xs text-[var(--foreground-muted)]">Try adjusting your filters or keywords like &quot;Deadlock&quot;, &quot;TCP&quot;, &quot;Normal Form&quot;, or &quot;Probability&quot;.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {searchResults.map(({ topic, category }) => {
                const isCompleted = completedTopicIds.has(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => { setSelectedTopic(topic); setActiveView('notes'); }}
                    className="p-4 sm:p-4.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-slate-300 dark:hover:border-zinc-700 shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-slate-200 dark:border-zinc-700/60">
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
                      <h3 className="text-sm sm:text-base font-bold text-[var(--foreground)] group-hover:text-[#0D08CB] dark:group-hover:text-[#E9DEFA] transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-[var(--foreground-muted)] mt-1 leading-relaxed font-normal">
                        {topic.description}
                      </p>

                      {topic.companyTags && topic.companyTags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          {topic.companyTags.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)]"
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
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]/80 flex items-center justify-between text-xs font-semibold text-[var(--foreground-muted)] group-hover:text-[#0D08CB] dark:group-hover:text-[#E9DEFA] transition-colors">
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
            <h2 className="text-xs font-black uppercase tracking-wider text-[var(--foreground-muted)] flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-[#044E62] dark:text-[#E9DEFA]" />
              <span>Choose a Subject to Study ({filteredDashboardCategories.length} Modules Available)</span>
            </h2>
            <span className="text-[11px] font-bold text-[var(--foreground-subtle)]">Tap any subject to open syllabus</span>
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    subjectCluster === tab.id
                      ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                      : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] border border-[var(--border-subtle)] hover:bg-slate-100 dark:hover:bg-[#1B2442]'
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
                  id={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="p-5 sm:p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xs hover:shadow-sm cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`w-12 h-12 rounded-lg ${theme.iconBg} border flex items-center justify-center shrink-0`}>
                        {theme.icon}
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(cat.title + ' gate lecture course')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1 rounded-lg text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200/50 dark:border-rose-900/40 transition-colors inline-flex items-center space-x-1"
                          title={`Watch ${cat.title} video lectures on YouTube`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">Videos</span>
                        </a>
                        <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-lg ${theme.badge}`}>
                          {cat.topics.length} Topics
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[var(--foreground-muted)] leading-relaxed font-normal">
                      {cat.description}
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E2B4D]/80">
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                        <span className="text-slate-600 dark:text-[var(--text-muted)] font-medium">Subject Progress</span>
                        <span className="text-slate-900 dark:text-[var(--foreground)] font-bold">
                          {completedCount} / {cat.topics.length} ({catPercent}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#1E2B4D] border border-slate-300/30 dark:border-white/5 overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-primary)] rounded-full transition-all"
                          style={{ width: `${catPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                    <span>Study Syllabus ({cat.topics.length} Modules)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--brand-primary)]" />
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--foreground-muted)] hover:text-[#0D08CB] dark:hover:text-[#E9DEFA] bg-[var(--surface-card)] border border-slate-300 dark:border-zinc-800 px-3 py-2 rounded-lg transition-all shadow-xs cursor-pointer self-start"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← All Subjects Dashboard</span>
            </button>

            {/* Quick Next/Prev Subject Stepper */}
            <div className="flex items-center space-x-2 self-start sm:self-center">
              {prevCategory && (
                <button
                  onClick={() => setSelectedCategory(prevCategory.id)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[11px] font-bold text-[var(--foreground)] hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer"
                >
                  ← {prevCategory.title}
                </button>
              )}
              {nextCategory && (
                <button
                  onClick={() => setSelectedCategory(nextCategory.id)}
                  className="px-3 py-1.5 rounded-lg border border-[#DCD2EC] dark:border-[#044E62]/50 bg-[#E9DEFA]/40 dark:bg-[#044E62]/20 text-[11px] font-bold text-[#044E62] dark:text-[#E9DEFA] hover:bg-[#E9DEFA]/70 dark:hover:bg-[#044E62]/40 transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>Next: {nextCategory.title}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Subject Banner */}
          <div className="p-5 sm:p-6 rounded-lg bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#044E62] dark:text-[#E9DEFA]">
                Active Subject Study Track
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)]">
                {activeCategoryObj.title}
              </h2>
              <p className="text-xs text-[var(--foreground-muted)] max-w-xl leading-relaxed">
                {activeCategoryObj.description}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] shrink-0 text-center w-full md:w-auto">
              <div className="text-xs font-bold text-[var(--foreground-muted)]">Filtered Modules</div>
              <div className="text-lg font-black text-[var(--foreground)]">
                {filteredActiveTopics.length} of {activeCategoryObj.topics.length}
                <span className="text-xs text-[var(--foreground-muted)] font-semibold"> Shown</span>
              </div>
            </div>
          </div>

          {/* Topic Modules List */}
          {filteredActiveTopics.length === 0 ? (
            <div className="p-12 text-center bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] space-y-2">
              <p className="text-sm font-bold text-[var(--foreground)]">No modules match your current filter</p>
              <p className="text-xs text-[var(--foreground-muted)]">Try changing difficulty or status filters to view modules.</p>
              <button
                onClick={() => {
                  setSelectedDifficulty('all');
                  setSelectedStatus('all');
                }}
                className="mt-2 text-xs font-bold text-[#044E62] dark:text-[#E9DEFA] hover:underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] divide-y divide-[var(--border-subtle)] overflow-hidden shadow-xs">
              {filteredActiveTopics.map((topic, index) => {
                const isCompleted = completedTopicIds.has(topic.id);

                return (
                  <div
                    key={topic.id}
                    onClick={() => { setSelectedTopic(topic); setActiveView('notes'); }}
                    className={`p-4 sm:p-4.5 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group ${
                      isCompleted
                        ? 'bg-emerald-500/5 dark:bg-emerald-950/10'
                        : 'hover:bg-[var(--surface-sunken)]/60'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5 min-w-0">
                      {/* Step Number or Checkmark */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-slate-200 dark:border-zinc-700/60'
                      }`}>
                        {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm sm:text-base font-bold text-[var(--foreground)] group-hover:text-[#0D08CB] dark:group-hover:text-[#E9DEFA] transition-colors">
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
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-slate-200 dark:border-zinc-700/60">
                              Ready to Study
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--foreground-muted)] leading-relaxed font-normal">
                          {topic.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] font-semibold text-[var(--foreground-subtle)]">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-[#044E62] dark:text-[#E9DEFA]" />
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
                                  <span key={comp} className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)]">
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
                    <div className="flex items-center space-x-2 self-stretch md:self-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border-subtle)]/80 shrink-0">
                      {topic.youtube_url && (
                        <a
                          href={topic.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 transition-colors inline-flex items-center justify-center"
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
                        className="flex-1 md:flex-initial px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer text-center shadow-xs"
                      >
                        Read Notes
                      </button>
                      {topic.questions.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartQuiz(topic);
                          }}
                          className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden modal-enter">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-start justify-between gap-4 bg-[var(--surface-card)]">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Rapid Revision Cheatsheet</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                  High-Yield Principles &amp; Key Takeaways
                </h3>
                <p className="text-xs text-[var(--foreground-muted)]">
                  Formula cards and core interview concepts compiled across {section.name}.
                </p>
              </div>

              <button
                onClick={() => setIsCheatsheetOpen(false)}
                aria-label="Close revision cheatsheet"
                className="w-7 h-7 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cheatsheet Body */}
            {!currentUser ? (
              <div className="flex-1 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 my-auto bg-[var(--surface-sunken)]">
                <div className="w-12 h-12 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] text-amber-500 flex items-center justify-center shadow-xs">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="max-w-md space-y-1.5">
                  <h4 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                    Sign in to unlock revision cheatsheet
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                    Quick Revision Cheatsheets provide high-yield formula cards, algorithmic complexities, and rapid interview takeaways compiled across all {section.name} modules.
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/${sectionKey}`)}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 text-white font-semibold text-xs shadow-xs transition-opacity flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Sign In to Unlock</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setIsCheatsheetOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--foreground)] text-xs font-medium hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Cheatsheet Controls */}
                <div className="p-3.5 border-b border-[var(--border-subtle)] space-y-2.5 bg-[var(--surface-card)]">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[var(--foreground-muted)] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={cheatsheetSearch}
                      onChange={(e) => setCheatsheetSearch(e.target.value)}
                      aria-label="Filter formulas or concepts"
                      placeholder="Filter formulas or concepts (e.g. Virtual Memory, Deadlock, Work Rate, ACID)..."
                      className="w-full pl-9 pr-9 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs font-medium text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                    />
                    {cheatsheetSearch && (
                      <button
                        onClick={() => setCheatsheetSearch('')}
                        aria-label="Clear cheatsheet filter"
                        className="absolute right-3 top-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Cheatsheet Subject Tabs */}
                  <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none pb-0.5">
                    <button
                      onClick={() => setCheatsheetCategory('all')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                        cheatsheetCategory === 'all'
                          ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                          : 'bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      All ({section.categories.length})
                    </button>
                    {section.categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCheatsheetCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                          cheatsheetCategory === cat.id
                            ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                            : 'bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cheatsheet Content List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[var(--background)]">
                  {cheatsheetTopics.length === 0 ? (
                    <div className="p-8 text-center text-[var(--foreground-muted)] text-xs">
                      No revision topics match your search query.
                    </div>
                  ) : (
                    cheatsheetTopics.map(({ topic, category }) => (
                      <div
                        key={topic.id}
                        className="p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2.5 shadow-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]">
                              {category.title}
                            </span>
                            <h4 className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">
                              {topic.title}
                            </h4>
                          </div>

                          <div className="flex items-center space-x-1.5">
                            {topic.youtube_url && (
                              <a
                                href={topic.youtube_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition-colors inline-flex items-center"
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
                              className="px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[11px] font-medium text-[var(--foreground)] hover:bg-[var(--surface-card)] transition-colors cursor-pointer"
                            >
                              Notes →
                            </button>
                            {topic.questions.length > 0 && (
                              <button
                                onClick={() => {
                                  setIsCheatsheetOpen(false);
                                  handleStartQuiz(topic);
                                }}
                                className="px-2.5 py-1 rounded-md bg-[var(--brand-primary)] hover:opacity-95 text-white text-[11px] font-medium shadow-xs transition-opacity cursor-pointer flex items-center space-x-1"
                              >
                                <Play className="w-2.5 h-2.5 fill-white" />
                                <span>Quiz ({topic.questions.length})</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Key Takeaways */}
                        {topic.keyTakeaways && topic.keyTakeaways.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                            {topic.keyTakeaways.map((takeaway, idx) => (
                              <div
                                key={idx}
                                className="p-2 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs text-[var(--foreground)] flex items-start space-x-2"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="leading-snug">{takeaway}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-[var(--foreground-muted)] italic">
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
            <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--surface-card)] flex items-center justify-between text-xs text-[var(--foreground-muted)]">
              <span className="font-mono text-[11px]">Showing {cheatsheetTopics.length} revision modules</span>
              <button
                onClick={() => setIsCheatsheetOpen(false)}
                className="px-3 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-card)] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Prompt Modal */}
      {authPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg max-w-sm w-full p-5 shadow-2xl space-y-4 modal-enter">
            <div className="w-10 h-10 rounded-lg bg-[var(--surface-sunken)] text-[var(--brand-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-1">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Authentication Required
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-1 leading-relaxed">
                Sign in to take interactive timed quizzes, unlock rapid placement revision cheatsheets, and sync your diagnostics with your student profile.
              </p>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <Link
                href={`/login?redirect=${encodeURIComponent(`/${sectionKey}`)}`}
                className="flex-1 py-2 px-3 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 text-white font-medium text-xs text-center shadow-xs transition-opacity flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setAuthPromptOpen(false)}
                className="py-2 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--foreground)] hover:bg-[var(--surface-card)] text-xs font-medium transition-colors cursor-pointer"
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
