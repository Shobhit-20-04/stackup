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
  Filter,
  Calendar,
  Check,
  Edit2,
  History,
  Flame
} from 'lucide-react';
import { 
  getLearningIntelligenceSummary, 
  recordRevisionReview, 
  addMistake, 
  updateMistake,
  deleteMistake,
  toggleMistakeResolved,
  rescheduleRevision,
  dismissRecommendation,
  computeFutureDateISO
} from '@/lib/services/learning-intelligence/intelligence-engine';
import { 
  previewNextInterval, 
  formatIntervalDisplay 
} from '@/lib/services/learning-intelligence/sm2';
import type { 
  LearningIntelligenceSummary, 
  RevisionItem, 
  MistakeEntry,
  SM2Rating,
  LearningModule,
  MistakeType,
  RevisionBucket
} from '@/lib/types/learning-intelligence';

export default function LearningIntelligenceHub() {
  const [summary, setSummary] = useState<LearningIntelligenceSummary | null>(() => {
    if (typeof window !== "undefined") return getLearningIntelligenceSummary();
    return null;
  });
  const [activeTab, setActiveTab] = useState<'daily' | 'spaced' | 'journal' | 'weak' | 'history'>('daily');
  
  // Spaced repetition flashcard state
  const [revealedRevisions, setRevealedRevisions] = useState<Record<string, boolean>>({});
  const [revisionBucketFilter, setRevisionBucketFilter] = useState<RevisionBucket | 'all'>('all');
  
  // Mistake journal filters
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState<'all' | LearningModule>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'resolved'>('all');
  
  // New / Edit mistake modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMistakeId, setEditingMistakeId] = useState<string | null>(null);
  const [formModule, setFormModule] = useState<LearningModule>('dsa');
  const [formTitle, setFormTitle] = useState('');
  const [formResourceId, setFormResourceId] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formMistakeType, setFormMistakeType] = useState<MistakeType>('edge_case');
  const [formNotes, setFormNotes] = useState('');
  const [formTakeaway, setFormTakeaway] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Reschedule popover state
  const [rescheduleItemId, setRescheduleItemId] = useState<string | null>(null);

  // Refresh summary from engine
  const refreshData = () => {
    const data = getLearningIntelligenceSummary();
    setSummary(data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSummary(getLearningIntelligenceSummary());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Handle SM-2 Flashcard Review
  const handleRateReview = (item: RevisionItem, rating: SM2Rating) => {
    recordRevisionReview(item.id, rating);
    refreshData();
    const label = rating >= 4 ? 'Great recall!' : rating >= 3 ? 'Reviewed!' : 'Queued for tomorrow!';
    showToast(`${label} Next review: ${formatIntervalDisplay(previewNextInterval(item, rating))}`);
  };

  // Open modal for editing
  const handleOpenEdit = (m: MistakeEntry) => {
    setEditingMistakeId(m.id);
    setFormModule(m.module);
    setFormTitle(m.resourceTitle);
    setFormResourceId(m.resourceId);
    setFormCategory(m.category);
    setFormMistakeType(m.mistakeType);
    setFormNotes(m.userNotes);
    setFormTakeaway(m.keyTakeaway);
    setIsModalOpen(true);
  };

  // Open modal for creating
  const handleOpenCreate = () => {
    setEditingMistakeId(null);
    setFormModule('dsa');
    setFormTitle('');
    setFormResourceId('');
    setFormCategory('');
    setFormMistakeType('edge_case');
    setFormNotes('');
    setFormTakeaway('');
    setIsModalOpen(true);
  };

  // Save Mistake (Create or Update)
  const handleSaveMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formTakeaway.trim()) return;

    if (editingMistakeId) {
      updateMistake(editingMistakeId, {
        module: formModule,
        resourceTitle: formTitle.trim(),
        resourceId: formResourceId.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formCategory.trim() || (formModule === 'dsa' ? 'Algorithms' : 'Computer Science'),
        mistakeType: formMistakeType,
        userNotes: formNotes.trim(),
        keyTakeaway: formTakeaway.trim(),
      });
      showToast('Mistake details updated successfully!');
    } else {
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
      showToast('Mistake logged & scheduled in Spaced Repetition queue!');
    }

    setIsModalOpen(false);
    setEditingMistakeId(null);
    refreshData();
  };

  const handleDeleteMistake = (id: string, title: string) => {
    deleteMistake(id);
    refreshData();
    showToast(`Removed "${title}" from journal.`);
  };

  const handleToggleResolved = (id: string) => {
    const res = toggleMistakeResolved(id);
    refreshData();
    if (res) {
      showToast(res.isResolved ? 'Marked mistake as resolved!' : 'Marked mistake as active.');
    }
  };

  const handleReschedule = (itemId: string, daysAhead: number) => {
    const targetDate = computeFutureDateISO(daysAhead);
    rescheduleRevision(itemId, targetDate);
    setRescheduleItemId(null);
    refreshData();
    showToast(`Rescheduled review for +${daysAhead} day(s).`);
  };

  const handleDismissRecommendation = (recId: string) => {
    dismissRecommendation(recId);
    refreshData();
    showToast('Recommendation dismissed.');
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
      const matchesStatus = 
        statusFilter === 'all' 
          ? true 
          : statusFilter === 'resolved' 
            ? Boolean(m.isResolved) 
            : !m.isResolved;

      return matchesSearch && matchesModule && matchesStatus;
    });
  }, [summary, searchQuery, moduleFilter, statusFilter]);

  // Filtered revisions for spaced queue
  const displayedRevisions = useMemo(() => {
    if (!summary) return [];
    if (revisionBucketFilter === 'all') return summary.dueRevisions;
    if (revisionBucketFilter === 'overdue') return summary.overdueRevisions;
    if (revisionBucketFilter === 'due_today') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      return summary.dueRevisions.filter((r) => new Date(r.dueDate) >= startOfDay);
    }
    if (revisionBucketFilter === 'upcoming') return summary.upcomingRevisions;
    if (revisionBucketFilter === 'recently_reviewed') return summary.recentlyReviewedRevisions;
    return summary.dueRevisions;
  }, [summary, revisionBucketFilter]);

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
                Personalized mistake tracking, spaced repetition, and evidence-based revision across DSA, Core CS, and Aptitude.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenCreate}
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
              {summary.overdueCount > 0 ? (
                <span className="text-[10px] font-semibold text-rose-500">{summary.overdueCount} overdue</span>
              ) : summary.dueRevisionsCount > 0 ? (
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
              <span className="text-[10px] text-[var(--foreground-muted)]">
                {summary.historyMetrics.mistakesResolvedCount} resolved
              </span>
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

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[var(--brand-primary)] text-white shadow-2xs'
              : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Learning Analytics</span>
        </button>
      </div>

      {/* TAB 1: DAILY SMART PLAN */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Today&apos;s High-Impact Focus</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                Algorithmic queue prioritized by forgetting curves, error recurrence, and diagnostic gaps.
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
                      <div className="flex items-center space-x-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          rec.badge === 'Due Today'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : rec.badge === 'Needs Attention' || rec.badge === 'Critical Concept'
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {rec.badge}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDismissRecommendation(rec.id)}
                          className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] p-0.5"
                          title="Dismiss recommendation"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {rec.title}
                    </h4>

                    <p className="text-xs text-[var(--foreground-muted)] line-clamp-3 leading-relaxed">
                      {rec.description}
                    </p>

                    <div className="text-[10px] text-[var(--foreground-muted)]/80 italic">
                      {rec.supportingActivityRef}
                    </div>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Spaced Repetition Review Queue</h3>
              <p className="text-xs text-[var(--foreground-muted)]">
                Active recall cards scheduled by the SuperMemo SM-2 algorithm.
              </p>
            </div>

            {/* Queue Bucket Selector */}
            <div className="flex items-center space-x-1 overflow-x-auto text-xs">
              {(
                [
                  { key: 'all', label: `Due (${summary.dueRevisionsCount})` },
                  { key: 'overdue', label: `Overdue (${summary.overdueCount})` },
                  { key: 'upcoming', label: `Upcoming (${summary.upcomingCount})` },
                  { key: 'recently_reviewed', label: `Reviewed (${summary.recentlyReviewedCount})` },
                ] as const
              ).map((bucket) => (
                <button
                  key={bucket.key}
                  onClick={() => setRevisionBucketFilter(bucket.key as RevisionBucket | 'all')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    revisionBucketFilter === bucket.key
                      ? 'bg-[var(--brand-primary)] text-white font-semibold'
                      : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]'
                  }`}
                >
                  {bucket.label}
                </button>
              ))}
            </div>
          </div>

          {displayedRevisions.length === 0 ? (
            <div className="p-8 rounded-xl border border-dashed border-[var(--border-subtle)] text-center space-y-2 bg-[var(--surface-sunken)]/30">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="text-sm font-bold text-[var(--foreground)]">Queue is Clear!</div>
              <p className="text-xs text-[var(--foreground-muted)] max-w-sm mx-auto">
                No items currently match this revision filter. As you solve problems and encounter mistakes, log them to populate your spaced repetition schedule.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedRevisions.map((item) => {
                const isRevealed = revealedRevisions[item.id];
                const isItemOverdue = new Date(item.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);

                return (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 rounded-xl border bg-[var(--surface-card)] shadow-xs space-y-3 ${
                      isItemOverdue ? 'border-rose-500/30' : 'border-[var(--border-subtle)]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                            {item.module}
                          </span>
                          <h4 className="text-sm font-bold text-[var(--foreground)]">{item.title}</h4>
                          {isItemOverdue && (
                            <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                              Overdue
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--foreground-muted)] mt-0.5">{item.subtitle}</p>
                      </div>

                      <div className="flex items-center space-x-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)] border border-[var(--border-subtle)] text-[10px]">
                          Rep {item.repetitionCount} • EF {item.easeFactor.toFixed(2)} • Due {new Date(item.dueDate).toLocaleDateString()}
                        </span>

                        {/* Reschedule Button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setRescheduleItemId(rescheduleItemId === item.id ? null : item.id)
                            }
                            className="p-1 text-[var(--foreground-muted)] hover:text-[var(--brand-primary)] cursor-pointer"
                            title="Reschedule review"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                          </button>

                          {rescheduleItemId === item.id && (
                            <div className="absolute right-0 top-full mt-1 z-20 w-36 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-lg p-1.5 space-y-1 text-xs">
                              <div className="text-[10px] font-semibold text-[var(--foreground-muted)] px-1">
                                Reschedule to:
                              </div>
                              <button
                                onClick={() => handleReschedule(item.id, 1)}
                                className="w-full text-left px-2 py-1 rounded hover:bg-[var(--surface-sunken)] cursor-pointer"
                              >
                                Tomorrow (+1d)
                              </button>
                              <button
                                onClick={() => handleReschedule(item.id, 3)}
                                className="w-full text-left px-2 py-1 rounded hover:bg-[var(--surface-sunken)] cursor-pointer"
                              >
                                In 3 days (+3d)
                              </button>
                              <button
                                onClick={() => handleReschedule(item.id, 7)}
                                className="w-full text-left px-2 py-1 rounded hover:bg-[var(--surface-sunken)] cursor-pointer"
                              >
                                Next week (+7d)
                              </button>
                            </div>
                          )}
                        </div>

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
                      <span>{isRevealed ? 'Hide Takeaways & Recall Options' : 'Reveal Solution / Takeaways'}</span>
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
                            'Review the optimal time and space complexity requirements for this concept.'}
                        </div>

                        <div>
                          <div className="text-[11px] font-semibold text-[var(--foreground-muted)] mb-2">
                            Self-assess your recall quality (SM-2):
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button
                              type="button"
                              onClick={() => handleRateReview(item, 1)}
                              className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer text-center"
                            >
                              <div>Again</div>
                              <div className="text-[10px] font-normal opacity-80">+1 day (Reset)</div>
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

            <div className="flex items-center space-x-2 overflow-x-auto">
              <div className="flex items-center space-x-1">
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

              <div className="border-l border-[var(--border-subtle)] pl-2 flex items-center space-x-1">
                {(['all', 'active', 'resolved'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[var(--surface-card)] text-[var(--foreground)] font-semibold border border-[var(--border-subtle)] shadow-2xs'
                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredMistakes.length === 0 ? (
            <div className="p-8 rounded-xl border border-dashed border-[var(--border-subtle)] text-center text-xs text-[var(--foreground-muted)] space-y-2">
              <div>No mistakes match your filter criteria.</div>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
              >
                <Plus className="w-3 h-3" />
                <span>Log a new mistake entry</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMistakes.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl border bg-[var(--surface-card)] shadow-xs space-y-2.5 transition-all ${
                    m.isResolved ? 'opacity-70 border-emerald-500/20' : 'border-[var(--border-subtle)]'
                  }`}
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
                        {m.isResolved && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center space-x-1">
                            <Check className="w-2.5 h-2.5" />
                            <span>Resolved</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[var(--foreground-muted)] mt-0.5">
                        {m.category} • Identified on {new Date(m.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleToggleResolved(m.id)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                          m.isResolved
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            : 'border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                        }`}
                        title={m.isResolved ? 'Mark as active' : 'Mark as resolved'}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(m)}
                        className="p-1.5 text-[var(--foreground-muted)] hover:text-[var(--brand-primary)] rounded-lg hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer"
                        title="Edit mistake note"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

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
              Diagnosed strictly from error recurrence. Topics require at least 2 observations to establish diagnostic confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {summary.weakTopics.map((topic) => (
              <div
                key={topic.topicName}
                className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                      {topic.module}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        topic.status === 'needs_attention'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          : topic.status === 'revisit_recommended'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                      }`}
                    >
                      {topic.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[var(--foreground)]">{topic.topicName}</h4>

                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {topic.reason}
                  </p>

                  <div className="text-[10px] text-[var(--foreground-muted)]">
                    {topic.supportingDataText}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="text-[11px] text-[var(--foreground-muted)]">
                    Observed Accuracy: <span className="font-semibold text-[var(--foreground)]">{topic.accuracyPercentage}%</span>
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

      {/* TAB 5: LEARNING HISTORY & ANALYTICS */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)]">Evidence-Based Learning History</h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              Concrete metrics calculated from recorded reviews, solved submissions, and mistake resolutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
              <div className="text-[11px] text-[var(--foreground-muted)] font-medium flex items-center space-x-1">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
                <span>Reviews Completed</span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-[var(--foreground)]">
                {summary.historyMetrics.reviewsCompletedCount}
              </div>
              <div className="text-[10px] text-[var(--foreground-muted)] mt-1">
                Spaced repetition card evaluations
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
              <div className="text-[11px] text-[var(--foreground-muted)] font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Mistakes Resolved</span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-[var(--foreground)]">
                {summary.historyMetrics.mistakesResolvedCount}
              </div>
              <div className="text-[10px] text-[var(--foreground-muted)] mt-1">
                Misconceptions marked resolved
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
              <div className="text-[11px] text-[var(--foreground-muted)] font-medium flex items-center space-x-1">
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Failed Later Solved</span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-[var(--foreground)]">
                {summary.historyMetrics.previouslyFailedNowSolvedCount}
              </div>
              <div className="text-[10px] text-[var(--foreground-muted)] mt-1">
                Problems re-attempted and solved
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
              <div className="text-[11px] text-[var(--foreground-muted)] font-medium flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Consistency Streak</span>
              </div>
              <div className="mt-2 text-2xl font-bold font-mono text-[var(--foreground)]">
                {summary.historyMetrics.revisionConsistencyStreak} <span className="text-xs font-normal">days</span>
              </div>
              <div className="text-[10px] text-[var(--foreground-muted)] mt-1">
                Active revision frequency
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LOG OR EDIT MISTAKE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div className="flex items-center space-x-2">
                <BookMarked className="w-4 h-4 text-[var(--brand-primary)]" />
                <h3 className="text-sm font-bold text-[var(--foreground)]">
                  {editingMistakeId ? 'Edit Mistake Entry' : 'Log New Mistake'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingMistakeId(null);
                }}
                className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMistake} className="space-y-3.5">
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
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingMistakeId(null);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-sunken)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {editingMistakeId ? 'Update Mistake Note' : 'Save & Schedule Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
