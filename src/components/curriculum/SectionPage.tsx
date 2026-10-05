'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Cpu, 
  Database, 
  Network, 
  Code2, 
  Search, 
  Clock, 
  HelpCircle, 
  Play, 
  ArrowLeft 
} from 'lucide-react';
import { CURRICULUM_DATA, type Topic } from '@/lib/data/curriculum';
import { getSectionMetrics } from '@/lib/services/progress';
import TopicNotes from './TopicNotes';
import QuizEngine from './QuizEngine';

interface SectionPageProps {
  sectionKey: 'aptitude' | 'core-cs';
}

export default function SectionPage({ sectionKey }: SectionPageProps) {
  const section = CURRICULUM_DATA[sectionKey];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'notes' | 'quiz'>('list');
  const metrics = React.useMemo(() => getSectionMetrics(sectionKey), [sectionKey]);

  if (!section) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Section not found</h2>
        <Link href="/" className="text-sm text-indigo-600 underline mt-2 block">Back to home</Link>
      </div>
    );
  }

  // Active Quiz View
  if (activeView === 'quiz' && selectedTopic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <button
          onClick={() => {
            setActiveView('list');
            setSelectedTopic(null);
          }}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {section.name} Overview</span>
        </button>

        <TopicNotes
          topic={selectedTopic}
          sectionSlug={sectionKey}
          onStartQuiz={() => setActiveView('quiz')}
        />
      </div>
    );
  }

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-500" />;
      case 'Network': return <Network className="w-5 h-5 text-blue-500" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-amber-500" />;
      default: return <BookOpen className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
            <span>Interview Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
            {section.name}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {section.description}
          </p>
        </div>

        {/* Progress Metric */}
        <div className="p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850/60 w-full md:w-64 space-y-3 flex-shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-500 uppercase tracking-wider">Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400">{metrics.percent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${metrics.percent}%` }}
            />
          </div>
          <div className="text-[11px] text-zinc-400">
            {metrics.completed} of {metrics.total} topics completed
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${section.name.toLowerCase()} topics...`}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
      </div>

      {/* Categories & Topics Grid */}
      <div className="space-y-8">
        {section.categories.map((cat) => {
          const filteredTopics = cat.topics.filter(
            (t) =>
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.description.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredTopics.length === 0 && searchQuery) {
            return null;
          }

          return (
            <div key={cat.id} className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{cat.title}</h2>
                  <p className="text-xs text-zinc-500">{cat.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          Topic
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-zinc-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{topic.estimatedMinutes} min</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-zinc-500">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{topic.questions.length} Questions</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTopic(topic);
                            setActiveView('notes');
                          }}
                          className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          Notes
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTopic(topic);
                            setActiveView('quiz');
                          }}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Quiz</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
