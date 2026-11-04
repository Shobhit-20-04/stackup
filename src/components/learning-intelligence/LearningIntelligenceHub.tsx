'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Sparkles, 
  RotateCcw, 
  BookMarked, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Code2,
  Cpu,
  BookOpen,
  Filter
} from 'lucide-react';
import { 
  getLearningIntelligenceSummary, 
  recordRevisionReview, 
  addMistake, 
  deleteMistake,
} from '@/lib/services/learning-intelligence/intelligence-engine';
import { previewNextInterval, formatIntervalDisplay } from '@/lib/services/learning-intelligence/sm2';
import type { 
  LearningIntelligenceSummary, 
  RevisionItem,
  SM2Rating,
  LearningModule,
  MistakeType
} from '@/lib/types/learning-intelligence';

export default function LearningIntelligenceHub() {
  const [summary, setSummary] = useState<LearningIntelligenceSummary | null>(() => {
    if (typeof window !== "undefined") return getLearningIntelligenceSummary();
    return null;
  });
  const [activeTab, setActiveTab] = useState<'daily' | 'spaced' | 'journal' | 'weak'>('daily');
  
  // Spaced repetition flashcard state: which item is currently flipped/revealed
  const [revealedRevisions, setRevealedRevisions] = useState<Record<string, boolean>>({});
  
  // Mistake journal filters
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState<'all' | LearningModule>('all');
  
  // New mistake modal/drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formModule, setFormModule] = useState<LearningModule>('dsa');
  const [formTitle, setFormTitle] = useState('');
  const [formResourceId, setFormResourceId] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formMistakeType, setFormMistakeType] = useState<MistakeType>('edge_case');
  const [formNotes, setFormNotes] = useState('');
  const [formTakeaway, setFormTakeaway] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Refresh summary from engine
  const refreshData = () => {
    const data = getLearningIntelligenceSummary();
    setSummary(data);
  };

  useEffect(() => {
    // Sync after mount
    const timer = setTimeout(() => {
      setSummary(getLearningIntelligenceSummary());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  // Handle SM-2 Flashcard Review
  const handleRateReview = (item: RevisionItem, rating: SM2Rating) => {
    recordRevisionReview(item.id, rating);
    refreshData();
    const label = rating >= 4 ? 'Great recall!' : rating >= 3 ? 'Reviewed!' : 'Queued for tomorrow!';
    showToast(`${label} Next review: ${formatIntervalDisplay(previewNextInterval(item, rating))}`);
  };

  // Handle Adding New Mistake
  const handleCreateMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formTakeaway.trim()) return;

    addMistake({
      userId: 'student',
      module: formModule,
      resourceId: formResourceId.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      resourceTitle: formTitle.trim(),
      category: formCategory.trim() || (formModule === 'dsa' ? 'Algorithms' : 'Computer Science'),
      mistakeType: formMistakeType,
      userNotes: formNotes.trim(),
      keyTakeaway: formTakeaway.trim(),
    });

    setIsModalOpen(false);
    setFormTitle('');
    setFormResourceId('');
    setFormCategory('');
    setFormNotes('');
    setFormTakeaway('');
    refreshData();
    showToast('Mistake logged & scheduled in Spaced Repetition queue!');
  };

  const handleDeleteMistake = (id: string, title: string) => {
    deleteMistake(id);
    refreshData();
    showToast(`Removed "${title}" from journal.`);
  };

  // Filtered mistakes for journal
  const filteredMistakes = useMemo(() => {
    if (!summary) return [];
    return summary.recentMistakes.filter((m) => {
      const matchesSearch = 
        m.resourceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesModule = moduleFilter === 'all' || m.module === moduleFilter;
      return matchesSearch && matchesModule;
    });
  }, [summary, searchQuery, moduleFilter]);

  if (!summary) {
    return (
      <div className="p-8 text-center text-xs text-[var(--foreground-muted)]">
        Initializing Learning Intelligence...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Intelligence Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-indigo-500/5 via-[var(--surface-card)] to-violet-500/5 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0D08CB] to-indigo-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)]">
                  Learning Intelligence &amp; Smart Revision
                </h2>
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <Sparkles className="w-3 h-3" />
                  <span>SM-2 Engine</span>
                </span>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mt-1">
                Personalized mistake tracking and scientifically spaced repetition across DSA, Core CS, and Aptitude.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log Mistake</span>
          </button>
        </div>

        {/* Diagnostic Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[var(--border-subtle)]">
          <div className="p-3 rounded-xl bg-[var(--surface-sunken)]/60 border border-[var(--border-subtle)]">
            <div className="text-[11px] font-medium text-[var(--foreground-muted)] flex items-center space-x-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
              <span>Due Revisions</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-xl font-bold text-[var(--foreground)]">
                {summary.dueRevisionsCount}
              </span>
              {summary.dueRevisionsCount > 0 ? (
                <span className="text-[10px] font-semibold text-amber-500">Action today</span>
              ) : (
                <span className="text-[10px] font-semibold text-emerald-500">All caught up</span>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--surface-sunken)]/60 border border-[var(--border-subtle)]">
            <div className="text-[11px] font-medium text-[var(--foreground-muted)] flex items-center space-x-1.5">
              <BookMarked className="w-3.5 h-3.5 text-rose-500" />
              <span>Mistakes Journal</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-xl font-bold text-[var(--foreground)]">
                {summary.totalMistakesLogged}
              </span>
              <span className="text-[10px] text-[var(--foreground-muted)]">documented</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--surface-sunken)]/60 border border-[var(--border-subtle)]">
            <div className="text-[11px] font-medium text-[var(--foreground-muted)] flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Weak Topics</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-xl font-bold text-[var(--foreground)]">
                {summary.weakTopics.length}
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400">diagnosed</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--surface-sunken)]/60 border border-[var(--border-subtle)]">
            <div className="text-[11px] font-medium text-[var(--foreground-muted)] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Retention Score</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-xl font-bold text-[var(--foreground)]">
                {summary.retentionScore}%
              </span>
              <span className="text-[10px] font-semibold text-emerald-500">SM-2 Ease</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-1 border-b border-[var(--border-subtle)] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'daily'
              ? 'bg-[var(--brand-primary)] text-white shadow-2xs'
              : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Daily Smart Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('spaced')}
          className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'spaced'
              ? 'bg-[var(--brand-primary)] text-white shadow-2xs'
              : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)]'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Spaced Revisions</span>
          {summary.dueRevisionsCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'spaced' ? 'bg-white text-indigo-700' : 'bg-indigo-500 text-white'
            }`}>
              {summary.dueRevisionsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'journal'
              ? 'bg-[var(--brand-primary)] text-white shadow-2xs'
              : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)]'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>Mistake Journal</span>
          <span className="text-[10px] opacity-75">({summary.totalMistakesLogged})</span>
        </button>

        <button
          onClick={() => setActiveTab('weak')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'weak'
              ? 'bg-[var(--brand-primary)] text-white shadow-2xs'
              : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Weak Topic Insights</span>
        </button>
      </div>

      {/* TAB 1: DAILY SMART PLAN */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Today&apos;s High-Impact Focus</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                Algorithmic queue prioritized by forgetting curves and error recurrence.
              </p>
            </div>
            <span className="text-xs text-[var(--foreground-muted)] flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>~35 mins total</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {summary.dailyRecommendations.map((rec) => {
              const ModuleIcon = rec.module === 'dsa' ? Code2 : rec.module === 'core-cs' ? Cpu : BookOpen;
              return (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs flex flex-col justify-between hover:border-[var(--brand-primary)]/50 transition-all group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--surface-sunken)] text-[var(--foreground)] border border-[var(--border-subtle)]">
                        <ModuleIcon className="w-3 h-3 text-[var(--brand-primary)]" />
                        <span className="uppercase tracking-wider">{rec.module}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        rec.badge === 'Due Today'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : rec.badge === 'Critical Concept'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                      }`}>
                        {rec.badge}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {rec.title}
                    </h4>

                    <p className="text-xs text-[var(--foreground-muted)] line-clamp-3 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[11px] text-[var(--foreground-muted)] flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{rec.estimatedMinutes}m</span>
                    </span>

                    <Link
                      href={rec.url}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
                    >
                      <span>Start Practice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SPACED REPETITION (SM-2 QUEUE) */}
      {activeTab === 'spaced' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Spaced Repetition Review Queue</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                Rate your recall to let SuperMemo SM-2 calculate your optimal interval.
              </p>
            </div>
          </div>

          {summary.dueRevisions.length === 0 ? (
            <div className="p-8 rounded-xl border border-dashed border-[var(--border-subtle)] text-center space-y-2 bg-[var(--surface-sunken)]/30">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="text-sm font-bold text-[var(--foreground)]">No Due Revisions!</div>
              <p className="text-xs text-[var(--foreground-muted)] max-w-sm mx-auto">
                You have cleared all scheduled spaced repetition items for today. New items will surface based on their SM-2 ease factors.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {summary.dueRevisions.map((item) => {
                const isRevealed = revealedRevisions[item.id];
                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                            {item.module}
                          </span>
                          <h4 className="text-sm font-bold text-[var(--foreground)]">{item.title}</h4>
                        </div>
                        <p className="text-xs text-[var(--foreground-muted)] mt-0.5">{item.subtitle}</p>
                      </div>

                      <div className="flex items-center space-x-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)] text-[10px]">
                          Rep {item.repetitionCount} • EF {item.easeFactor.toFixed(2)}
                        </span>
                        <Link
                          href={item.module === 'dsa' ? `/dsa/${item.resourceId}` : item.module === 'core-cs' ? `/core-cs` : `/aptitude`}
                          className="p-1 text-[var(--foreground-muted)] hover:text-[var(--brand-primary)]"
                          title="Open Resource"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Reveal Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedRevisions((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--surface-sunken)] hover:bg-[var(--surface-sunken)]/80 text-xs font-semibold text-[var(--foreground)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                    >
                      <span>{isRevealed ? 'Hide Takeaways & Details' : 'Reveal Solution / Takeaways'}</span>
                      {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Revealed Answer & SM-2 Rating Buttons */}
                    {isRevealed && (
                      <div className="pt-2 space-y-3 border-t border-[var(--border-subtle)] animate-in fade-in">
                        <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/15 text-xs text-[var(--foreground)] leading-relaxed">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
                            Key Algorithmic Principle:
                          </span>
                          {summary.recentMistakes.find((m) => m.id === item.mistakeId)?.keyTakeaway ||
                            'Review the optimal time complexity and edge case handling for this problem.'}
                        </div>

                        <div>
                          <div className="text-[11px] font-semibold text-[var(--foreground-muted)] mb-2">
                            How well did you recall this concept?
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button
                              type="button"
                              onClick={() => handleRateReview(item, 1)}
                              className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer text-center"
                            >
                              <div>Again</div>
                              <div className="text-[10px] font-normal opacity-80">+1 day</div>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRateReview(item, 2)}
                              className="px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold transition-colors cursor-pointer text-center"
                            >
                              <div>Hard</div>
                              <div className="text-[10px] font-normal opacity-80">+3 days</div>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRateReview(item, 4)}
                              className="px-3 py-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-semibold transition-colors cursor-pointer text-center"
                            >
                              <div>Good</div>
                              <div className="text-[10px] font-normal opacity-80">
                                {formatIntervalDisplay(previewNextInterval(item, 4))}
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRateReview(item, 5)}
                              className="px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer text-center"
                            >
                              <div>Easy</div>
                              <div className="text-[10px] font-normal opacity-80">
                                {formatIntervalDisplay(previewNextInterval(item, 5))}
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MISTAKE JOURNAL */}
      {activeTab === 'journal' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[var(--foreground-muted)] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mistakes, topics, or takeaways..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
              />
            </div>

            <div className="flex items-center space-x-1 overflow-x-auto">
              <Filter className="w-3.5 h-3.5 text-[var(--foreground-muted)] mr-1 flex-shrink-0" />
              {(['all', 'dsa', 'core-cs', 'aptitude'] as const).map((mod) => (
                <button
                  key={mod}
                  onClick={() => setModuleFilter(mod)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                    moduleFilter === mod
                      ? 'bg-[var(--brand-primary)] text-white'
                      : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>

          {filteredMistakes.length === 0 ? (
            <div className="p-8 rounded-xl border border-dashed border-[var(--border-subtle)] text-center text-xs text-[var(--foreground-muted)]">
              No mistakes match your filter criteria.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMistakes.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--surface-sunken)] text-[var(--foreground)] border border-[var(--border-subtle)]">
                          {m.module}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                          {m.resourceTitle}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          {m.mistakeType.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5">
                        {m.category} • Logged {new Date(m.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {m.module === 'dsa' && (
                        <Link
                          href={`/dsa/${m.resourceId}`}
                          className="px-2.5 py-1 rounded-lg bg-[var(--surface-sunken)] hover:bg-[var(--brand-primary)] hover:text-white text-xs font-semibold text-[var(--foreground)] transition-colors inline-flex items-center space-x-1"
                        >
                          <span>Re-Attempt</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                      <button
                        onClick={() => handleDeleteMistake(m.id, m.resourceTitle)}
                        className="p-1.5 text-[var(--foreground-muted)] hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete mistake note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {m.userNotes && (
                    <div className="text-xs text-[var(--foreground-muted)] bg-[var(--surface-sunken)]/50 p-2.5 rounded-lg border border-[var(--border-subtle)]">
                      <span className="font-semibold text-[var(--foreground)]">What went wrong: </span>
                      {m.userNotes}
                    </div>
                  )}

                  <div className="text-xs text-[var(--foreground)] bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/20">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Key Takeaway: </span>
                    {m.keyTakeaway}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: WEAK TOPIC INSIGHTS */}
      {activeTab === 'weak' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)]">Algorithmic Weakness Analysis</h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              Diagnosed based on error rates and failed submissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {summary.weakTopics.map((topic) => (
              <div
                key={topic.topicName}
                className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                      {topic.module}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        topic.masteryLevel === 'critical'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          : topic.masteryLevel === 'developing'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {topic.masteryLevel}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[var(--foreground)]">{topic.topicName}</h4>

                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {topic.reason}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="text-[11px] text-[var(--foreground-muted)]">
                    Est. Accuracy: <span className="font-semibold text-[var(--foreground)]">{topic.accuracyPercentage}%</span>
                  </div>

                  <Link
                    href={topic.actionUrl}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
                  >
                    <span>Practice Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: LOG NEW MISTAKE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div className="flex items-center space-x-2">
                <BookMarked className="w-4 h-4 text-[var(--brand-primary)]" />
                <h3 className="text-sm font-bold text-[var(--foreground)]">Log New Mistake</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMistake} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                    Curriculum Module
                  </label>
                  <select
                    value={formModule}
                    onChange={(e) => setFormModule(e.target.value as LearningModule)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--brand-primary)] cursor-pointer"
                  >
                    <option value="dsa">DSA Hub</option>
                    <option value="core-cs">Core CS</option>
                    <option value="aptitude">Aptitude</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                    Error Category
                  </label>
                  <select
                    value={formMistakeType}
                    onChange={(e) => setFormMistakeType(e.target.value as MistakeType)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--brand-primary)] cursor-pointer"
                  >
                    <option value="edge_case">Edge Case Miss</option>
                    <option value="time_limit_exceeded">Time Limit Exceeded (TLE)</option>
                    <option value="wrong_answer">Wrong Answer</option>
                    <option value="runtime_error">Runtime Error / Null Pointer</option>
                    <option value="algorithmic_choice">Suboptimal Algorithm Choice</option>
                    <option value="conceptual">Conceptual Misunderstanding</option>
                    <option value="calculation">Calculation / Off-by-one</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Problem / Topic Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. LRU Cache or Banker's Algorithm"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                    Category / Pattern
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. Linked List, OS Virtual Memory"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                    Resource ID / Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={formResourceId}
                    onChange={(e) => setFormResourceId(e.target.value)}
                    placeholder="e.g. lru-cache"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  What went wrong?
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Forgot to update the dummy head/tail pointer when evicting node."
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Key Takeaway / Correct Approach *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formTakeaway}
                  onChange={(e) => setFormTakeaway(e.target.value)}
                  placeholder="e.g. Use a doubly linked list + hash map to maintain O(1) get and put."
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-xs text-[var(--foreground)] placeholder:[var(--foreground-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-sunken)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save &amp; Schedule Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
