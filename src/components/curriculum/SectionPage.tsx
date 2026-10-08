'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
  HelpCircle, 
  Play, 
  ArrowLeft,
  Lock,
  ArrowRight,
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import { CURRICULUM_DATA, type Topic, type SectionCategory } from '@/lib/data/curriculum';
import { getSectionMetrics, getReadTopicIds, getLocalQuizAttempts } from '@/lib/services/progress';
import { getCurrentUser, type UserSession } from '@/lib/auth/session';
import TopicNotes from './TopicNotes';
import QuizEngine from './QuizEngine';

interface SectionPageProps {
  sectionKey: 'aptitude' | 'core-cs';
}

export default function SectionPage({ sectionKey }: SectionPageProps) {
  const section = CURRICULUM_DATA[sectionKey];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'notes' | 'quiz'>('list');
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(new Set());

  // Metrics
  const [metricsRefresh, setMetricsRefresh] = useState(0);
  const metrics = useMemo(() => getSectionMetrics(sectionKey), [sectionKey, metricsRefresh]);

  // Authentication state for gating interactive quizzes
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u));
    // Load completed topics (quizzes attempted or read)
    const readIds = getReadTopicIds();
    const attempts = getLocalQuizAttempts();
    const sectionAttempts = attempts
      .filter((a) => a.sectionSlug === sectionKey)
      .map((a) => a.topicId);
    setCompletedTopicIds(new Set([...readIds, ...sectionAttempts]));
  }, [sectionKey, metricsRefresh, activeView]);

  const handleStartQuiz = (topic: Topic) => {
    if (!currentUser) {
      setSelectedTopic(topic);
      setAuthPromptOpen(true);
      return;
    }
    setSelectedTopic(topic);
    setActiveView('quiz');
  };

  const getCategoryTheme = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return {
          icon: <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
          accent: 'purple',
          border: 'border-purple-500/30 hover:border-purple-500',
          bg: 'bg-purple-50/50 dark:bg-purple-950/20',
          badge: 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300',
        };
      case 'Database':
        return {
          icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
          accent: 'emerald',
          border: 'border-emerald-500/30 hover:border-emerald-500',
          bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          badge: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300',
        };
      case 'Network':
        return {
          icon: <Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
          accent: 'blue',
          border: 'border-blue-500/30 hover:border-blue-500',
          bg: 'bg-blue-50/50 dark:bg-blue-950/20',
          badge: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300',
        };
      case 'Code2':
        return {
          icon: <Code2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
          accent: 'amber',
          border: 'border-amber-500/30 hover:border-amber-500',
          bg: 'bg-amber-50/50 dark:bg-amber-950/20',
          badge: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300',
        };
      case 'Server':
        return {
          icon: <Server className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
          accent: 'cyan',
          border: 'border-cyan-500/30 hover:border-cyan-500',
          bg: 'bg-cyan-50/50 dark:bg-cyan-950/20',
          badge: 'bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300',
        };
      case 'GitBranch':
        return {
          icon: <GitBranch className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
          accent: 'rose',
          border: 'border-rose-500/30 hover:border-rose-500',
          bg: 'bg-rose-50/50 dark:bg-rose-950/20',
          badge: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300',
        };
      case 'Terminal':
        return {
          icon: <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
          accent: 'blue',
          border: 'border-blue-500/30 hover:border-blue-500',
          bg: 'bg-blue-50/50 dark:bg-blue-950/20',
          badge: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300',
        };
      case 'Layers':
        return {
          icon: <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
          accent: 'teal',
          border: 'border-teal-500/30 hover:border-teal-500',
          bg: 'bg-teal-50/50 dark:bg-teal-950/20',
          badge: 'bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300',
        };
      default:
        return {
          icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
          accent: 'blue',
          border: 'border-blue-500/30 hover:border-blue-500',
          bg: 'bg-blue-50/50 dark:bg-blue-950/20',
          badge: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300',
        };
    }
  };

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

  // Search Results Mode
  const searchResults = useMemo(() => {
    if (!section || !searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    const results: { topic: Topic; category: SectionCategory }[] = [];
    section.categories.forEach((cat) => {
      cat.topics.forEach((t) => {
        if (t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) {
          results.push({ topic: t, category: cat });
        }
      });
    });
    return results;
  }, [section, searchQuery]);

  // Total topics count
  const totalTopicsCount = useMemo(() => {
    if (!section) return 0;
    return section.categories.reduce((acc, cat) => acc + cat.topics.length, 0);
  }, [section]);

  if (!section) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Section not found</h2>
        <Link href="/" className="text-sm text-blue-600 underline mt-2 block">Back to home</Link>
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
    // Find category topics to allow next/previous module hopping
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interview Curriculum • Structured Pathway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {section.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {section.description}
          </p>
        </div>

        {/* Progress Metric */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1e293b] w-full md:w-60 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[11px]">Syllabus Progress</span>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">{metrics.percent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${metrics.percent}%` }}
            />
          </div>
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {metrics.completed} of {metrics.total} topics completed
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search all ${section.name.toLowerCase()} topics (e.g. Deadlocks, TCP 3-Way, Normalization, CAP Theorem)...`}
          className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131c31] text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sticky Fast Subject Chip Switcher */}
      <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-slate-50/95 dark:bg-[#0b1120]/95 backdrop-blur-md border-y sm:border-y-0 sm:rounded-2xl border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 pt-0.5">
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'all' && !searchQuery
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-white dark:bg-[#131c31] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white dark:bg-[#131c31] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
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
              <Search className="w-4 h-4 text-blue-500" />
              <span>Search Results for &quot;{searchQuery}&quot; ({searchResults.length})</span>
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#131c31] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-sm font-bold text-slate-900 dark:text-white">No topics matching &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-500">Try searching for keywords like &quot;Deadlock&quot;, &quot;TCP&quot;, &quot;Normal Form&quot;, or &quot;Probability&quot;.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {searchResults.map(({ topic, category }) => {
                const isCompleted = completedTopicIds.has(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => { setSelectedTopic(topic); setActiveView('notes'); }}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {category.title}
                        </span>
                        {isCompleted && (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                      <span>Study Module Notes</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: SUBJECT DASHBOARD (THE CLEAN OVERVIEW OF ALL SUBJECTS) */}
      {searchResults === null && selectedCategory === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span>Choose a Subject to Study ({section.categories.length} Modules Available)</span>
            </h2>
            <span className="text-[11px] font-bold text-slate-500">Tap any subject to open syllabus</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {section.categories.map((cat) => {
              const theme = getCategoryTheme(cat.icon);
              const completedCount = cat.topics.filter((t) => completedTopicIds.has(t.id)).length;
              const catPercent = Math.round((completedCount / cat.topics.length) * 100);

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-5 sm:p-6 rounded-3xl border-2 ${theme.border} ${theme.bg} transition-all flex flex-col justify-between shadow-xs hover:shadow-lg cursor-pointer group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs shrink-0">
                        {theme.icon}
                      </div>
                      <span className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-xl ${theme.badge}`}>
                        {cat.topics.length} Topics • {cat.topics.reduce((acc, t) => acc + t.questions.length, 0)} MCQs
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {cat.description}
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                        <span className="text-slate-500 dark:text-slate-400">Subject Progress</span>
                        <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                          {completedCount} / {cat.topics.length} ({catPercent}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${catPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs font-bold text-blue-700 dark:text-blue-300">
                    <span>Study Syllabus ({cat.topics.length} Modules)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: DEDICATED SUBJECT SYLLABUS WORKSPACE (1 SUBJECT AT A TIME - ZERO SCROLLING) */}
      {searchResults === null && activeCategoryObj !== null && (
        <div className="space-y-6 animate-in fade-in">
          {/* Breadcrumb & Quick Subject Nav */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 bg-white dark:bg-[#131c31] border border-slate-300 dark:border-slate-700 px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer self-start"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← All Subjects Dashboard</span>
            </button>

            {/* Quick Next/Prev Subject Stepper */}
            <div className="flex items-center space-x-2 self-start sm:self-center">
              {prevCategory && (
                <button
                  onClick={() => setSelectedCategory(prevCategory.id)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  ← {prevCategory.title}
                </button>
              )}
              {nextCategory && (
                <button
                  onClick={() => setSelectedCategory(nextCategory.id)}
                  className="px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-[11px] font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>Next: {nextCategory.title}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Subject Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                Active Subject Study Track
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {activeCategoryObj.title}
              </h2>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                {activeCategoryObj.description}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 shrink-0 text-center w-full md:w-auto">
              <div className="text-xs font-bold text-slate-300">Subject Coverage</div>
              <div className="text-lg font-black text-white">
                {activeCategoryObj.topics.filter((t) => completedTopicIds.has(t.id)).length} of {activeCategoryObj.topics.length}
                <span className="text-xs text-slate-400 font-semibold"> Modules Done</span>
              </div>
            </div>
          </div>

          {/* Topic Modules List - Sequential Step Order */}
          <div className="space-y-3.5">
            {activeCategoryObj.topics.map((topic, index) => {
              const isCompleted = completedTopicIds.has(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => { setSelectedTopic(topic); setActiveView('notes'); }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group shadow-xs hover:shadow-md ${
                    isCompleted
                      ? 'border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-start space-x-3.5 min-w-0">
                    {/* Step Number or Checkmark */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </span>
                        {isCompleted ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                            ✓ Completed
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            Ready to Study
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {topic.description}
                      </p>
                      <div className="flex items-center space-x-3 mt-2 text-[11px] font-semibold text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>{topic.estimatedMinutes} min read</span>
                        </span>
                        <span>•</span>
                        <span>{topic.questions.length} MCQ Questions</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 self-stretch md:self-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTopic(topic);
                        setActiveView('notes');
                      }}
                      className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
                    >
                      Read Notes
                    </button>
                    {topic.questions.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartQuiz(topic);
                        }}
                        className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
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
        </div>
      )}

      {/* Auth Prompt Modal */}
      {authPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#131c31] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Sign In Required
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                Sign in to take interactive timed quizzes, track your progress score, and sync your results with your profile dashboard.
              </p>
            </div>
            <div className="flex items-center space-x-2.5 pt-2">
              <Link
                href={`/login?redirect=${encodeURIComponent(`/${sectionKey}`)}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center shadow-md shadow-blue-600/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setAuthPromptOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
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
