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
  Filter,
  CheckCircle2,
  ChevronRight,
  X
} from 'lucide-react';
import { CURRICULUM_DATA, type Topic } from '@/lib/data/curriculum';
import { getSectionMetrics } from '@/lib/services/progress';
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
  const metrics = useMemo(() => getSectionMetrics(sectionKey), [sectionKey]);

  // Authentication state for gating interactive quizzes
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u));
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

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'Database': return <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Network': return <Network className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Code2': return <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Server': return <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      default: return <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  // Filter categories and topics based on category pill & search query
  const filteredCategories = useMemo(() => {
    if (!section) return [];
    
    // First filter by selected subject/category
    const baseCategories = selectedCategory === 'all'
      ? section.categories
      : section.categories.filter((c) => c.id === selectedCategory);

    // Then filter by search query if present
    if (!searchQuery.trim()) return baseCategories;

    const q = searchQuery.toLowerCase().trim();
    return baseCategories
      .map((cat) => ({
        ...cat,
        topics: cat.topics.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.topics.length > 0);
  }, [section, selectedCategory, searchQuery]);

  // Total topics count across all categories
  const totalTopicsCount = useMemo(() => {
    if (!section) return 0;
    return section.categories.reduce((acc, cat) => acc + cat.topics.length, 0);
  }, [section]);

  if (!section) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Section not found</h2>
        <Link href="/" className="text-sm text-indigo-600 underline mt-2 block">Back to home</Link>
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
          onExitQuiz={() => setActiveView('notes')}
        />
      </div>
    );
  }

  // Active Topic Notes View
  if (activeView === 'notes' && selectedTopic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <button
          onClick={() => {
            setActiveView('list');
            setSelectedTopic(null);
          }}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-zinc-100 dark:bg-zinc-850 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {section.name} Overview</span>
        </button>

        <TopicNotes
          topic={selectedTopic}
          sectionSlug={sectionKey}
          onStartQuiz={() => handleStartQuiz(selectedTopic)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header Banner - High Contrast & Compact */}
      <div className="p-5 sm:p-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <span>Interview Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
            {section.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {section.description}
          </p>
        </div>

        {/* Progress Metric */}
        <div className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850/70 w-full md:w-60 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-[11px]">Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{metrics.percent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${metrics.percent}%` }}
            />
          </div>
          <div className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
            {metrics.completed} of {metrics.total} topics completed
          </div>
        </div>
      </div>

      {/* Quick Search & Mobile Jump Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${section.name.toLowerCase()} topics (e.g. Deadlocks, TCP, Indexes)...`}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Reset Button if filter active */}
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-3.5 py-2.5 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center space-x-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <span>Show All Subjects</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Sticky / Swipeable Category Navigator - ZERO SCROLLING FATIGUE */}
      <div className="sticky top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-y sm:border-y-0 sm:rounded-2xl border-zinc-200/80 dark:border-zinc-800">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 pt-0.5">
          {/* "All" Chip */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Subjects ({totalTopicsCount})</span>
          </button>

          {/* Individual Category Chips */}
          {section.categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}>
                  {cat.topics.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories & Topics Grid - Filtered for Instant Access */}
      <div className="space-y-8">
        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-3">
            <Search className="w-8 h-8 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              No matching topics found
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
              We couldn&apos;t find any topics matching &quot;{searchQuery}&quot;. Try adjusting your search term or subject filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="space-y-3.5">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white flex flex-wrap items-center gap-2">
                      <span>{cat.title}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shrink-0">
                        {cat.topics.length} {cat.topics.length === 1 ? 'topic' : 'topics'}
                      </span>
                    </h2>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 line-clamp-1">{cat.description}</p>
                  </div>
                </div>

                {selectedCategory === 'all' && (
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 hidden sm:inline-flex items-center space-x-1"
                  >
                    <span>Focus on {cat.title}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Topics Grid - High Contrast & High Readability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {cat.topics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setActiveView('notes');
                    }}
                    className="p-4 sm:p-5 rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-900">
                          Module
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{topic.estimatedMinutes} min read</span>
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-extrabold text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1.5 leading-relaxed font-normal">
                        {topic.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                        <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{topic.questions.length > 0 ? `${topic.questions.length} MCQs` : 'Notes'}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTopic(topic);
                            setActiveView('notes');
                          }}
                          className="px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          Notes
                        </button>
                        {topic.questions.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartQuiz(topic);
                            }}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-white" />
                            <span>Quiz</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Auth Prompt Modal */}
      {authPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-zinc-950 dark:text-white">
                Sign In Required
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mt-1.5 leading-relaxed">
                Sign in to take interactive timed quizzes, track your progress score, and sync your results with your profile dashboard.
              </p>
            </div>
            <div className="flex items-center space-x-2.5 pt-2">
              <Link
                href={`/login?redirect=${encodeURIComponent(`/${sectionKey}`)}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setAuthPromptOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold transition-colors cursor-pointer"
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
