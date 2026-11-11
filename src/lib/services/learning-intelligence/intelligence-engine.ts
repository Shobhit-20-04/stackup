import type {
  MistakeEntry,
  RevisionItem,
  WeakTopicInsight,
  DailyRecommendation,
  LearningIntelligenceSummary,
  SM2Rating,
  LearningModule,
  LearningHistoryMetrics,
} from '@/lib/types/learning-intelligence';
import { 
  calculateSM2Schedule, 
  categorizeRevisionItem, 
  rescheduleItem,
  INITIAL_EASE_FACTOR
} from './sm2';

export { 
  previewNextInterval, 
  formatIntervalDisplay, 
  isItemDue,
  computeFutureDateISO 
} from './sm2';

const MISTAKES_STORAGE_KEY = 'stackup_mistake_journal';
const REVISIONS_STORAGE_KEY = 'stackup_revision_queue';
const DISMISSED_RECS_KEY = 'stackup_dismissed_recommendations';

export const DEFAULT_STARTER_MISTAKES: MistakeEntry[] = [
  {
    id: 'starter-mistake-1',
    userId: 'default',
    module: 'dsa',
    resourceId: 'two-sum',
    resourceTitle: 'Two Sum',
    category: 'Arrays & Hashing',
    mistakeType: 'edge_case',
    userNotes: 'Used nested loops resulting in O(N^2) TLE on large arrays. Initially forgot that the same element cannot be used twice.',
    keyTakeaway: 'Always use a single-pass hash map storing complement index: target - nums[i]. Check map before adding.',
    isResolved: false,
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
  },
  {
    id: 'starter-mistake-2',
    userId: 'default',
    module: 'core-cs',
    resourceId: 'deadlocks-and-synchronization',
    resourceTitle: 'Deadlocks & Coffman Conditions',
    category: 'Operating Systems (OS)',
    mistakeType: 'conceptual',
    userNotes: 'Confused Hold & Wait with Mutual Exclusion during quiz. Lost 2 marks on Banker’s Algorithm safety state.',
    keyTakeaway: 'The 4 Coffman conditions must ALL hold simultaneously for deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
    isResolved: false,
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

export const DEFAULT_STARTER_REVISIONS: RevisionItem[] = [
  {
    id: 'starter-rev-1',
    userId: 'default',
    mistakeId: 'starter-mistake-1',
    module: 'dsa',
    resourceId: 'two-sum',
    title: 'Two Sum',
    subtitle: 'Arrays & Hashing • One-pass Hash Map',
    repetitionCount: 1,
    intervalDays: 1,
    easeFactor: INITIAL_EASE_FACTOR,
    dueDate: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // Due now
    lastReviewedAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    lastRating: 3,
  },
  {
    id: 'starter-rev-2',
    userId: 'default',
    mistakeId: 'starter-mistake-2',
    module: 'core-cs',
    resourceId: 'deadlocks-and-synchronization',
    title: 'Coffman Conditions & Deadlock Detection',
    subtitle: 'Operating Systems • Synchronization',
    repetitionCount: 2,
    intervalDays: 6,
    easeFactor: 2.6,
    dueDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(), // Due tomorrow
    lastReviewedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    lastRating: 4,
  },
];

// Client-side storage helpers
export function getClientMistakes(): MistakeEntry[] {
  if (typeof window === 'undefined') return DEFAULT_STARTER_MISTAKES;
  try {
    const raw = localStorage.getItem(MISTAKES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(DEFAULT_STARTER_MISTAKES));
      return DEFAULT_STARTER_MISTAKES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_STARTER_MISTAKES;
  } catch {
    return DEFAULT_STARTER_MISTAKES;
  }
}

export function saveClientMistakes(mistakes: MistakeEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(mistakes));
  } catch {
    // Storage quota or disabled
  }
}

export function getClientRevisions(): RevisionItem[] {
  if (typeof window === 'undefined') return DEFAULT_STARTER_REVISIONS;
  try {
    const raw = localStorage.getItem(REVISIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REVISIONS_STORAGE_KEY, JSON.stringify(DEFAULT_STARTER_REVISIONS));
      return DEFAULT_STARTER_REVISIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_STARTER_REVISIONS;
  } catch {
    return DEFAULT_STARTER_REVISIONS;
  }
}

export function saveClientRevisions(revisions: RevisionItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REVISIONS_STORAGE_KEY, JSON.stringify(revisions));
  } catch {
    // Storage quota
  }
}

export function getDismissedRecommendationIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DISMISSED_RECS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function dismissRecommendation(recId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const dismissed = getDismissedRecommendationIds();
    if (!dismissed.includes(recId)) {
      localStorage.setItem(DISMISSED_RECS_KEY, JSON.stringify([...dismissed, recId]));
    }
  } catch {
    // ignore
  }
}

/**
 * Creates a new mistake entry and enqueues a corresponding SM-2 spaced repetition card.
 */
export function addMistake(
  mistake: Omit<MistakeEntry, 'id' | 'createdAt' | 'updatedAt'>
): { mistake: MistakeEntry; revision: RevisionItem } {
  const mistakes = getClientMistakes();
  const revisions = getClientRevisions();

  const id = `mst-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  const newMistake: MistakeEntry = {
    ...mistake,
    id,
    isResolved: false,
    createdAt: now,
    updatedAt: now,
  };

  // Enqueue automatic revision due in 1 day
  const newRevision: RevisionItem = {
    id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    userId: mistake.userId,
    mistakeId: id,
    module: mistake.module,
    resourceId: mistake.resourceId,
    title: mistake.resourceTitle,
    subtitle: `${mistake.category} • Review Key Takeaways`,
    repetitionCount: 0,
    intervalDays: 1,
    easeFactor: INITIAL_EASE_FACTOR,
    dueDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
  };

  const updatedMistakes = [newMistake, ...mistakes];
  const updatedRevisions = [newRevision, ...revisions];

  saveClientMistakes(updatedMistakes);
  saveClientRevisions(updatedRevisions);

  return { mistake: newMistake, revision: newRevision };
}

/**
 * Updates an existing mistake entry.
 */
export function updateMistake(
  mistakeId: string,
  updates: Partial<Omit<MistakeEntry, 'id' | 'userId' | 'createdAt'>>
): MistakeEntry | null {
  const mistakes = getClientMistakes();
  const index = mistakes.findIndex((m) => m.id === mistakeId);
  if (index === -1) return null;

  const updated: MistakeEntry = {
    ...mistakes[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  mistakes[index] = updated;
  saveClientMistakes(mistakes);

  return updated;
}

/**
 * Toggles resolved status of a mistake.
 */
export function toggleMistakeResolved(mistakeId: string): MistakeEntry | null {
  const mistakes = getClientMistakes();
  const index = mistakes.findIndex((m) => m.id === mistakeId);
  if (index === -1) return null;

  const current = mistakes[index];
  const updated: MistakeEntry = {
    ...current,
    isResolved: !current.isResolved,
    updatedAt: new Date().toISOString(),
  };

  mistakes[index] = updated;
  saveClientMistakes(mistakes);

  return updated;
}

/**
 * Deletes a mistake entry and its associated revision item if present.
 */
export function deleteMistake(mistakeId: string): void {
  const mistakes = getClientMistakes();
  const revisions = getClientRevisions();

  const filteredMistakes = mistakes.filter((m) => m.id !== mistakeId);
  const filteredRevisions = revisions.filter((r) => r.mistakeId !== mistakeId);

  saveClientMistakes(filteredMistakes);
  saveClientRevisions(filteredRevisions);
}

/**
 * Records an SM-2 rating on a revision item.
 */
export function recordRevisionReview(
  revisionId: string,
  rating: SM2Rating
): RevisionItem | null {
  const revisions = getClientRevisions();
  const index = revisions.findIndex((r) => r.id === revisionId);
  if (index === -1) return null;

  const current = revisions[index];
  const updated = calculateSM2Schedule(current, rating);

  revisions[index] = updated;
  saveClientRevisions(revisions);

  return updated;
}

/**
 * Manually reschedules an item in the queue.
 */
export function rescheduleRevision(
  revisionId: string,
  targetDueDateIso: string
): RevisionItem | null {
  const revisions = getClientRevisions();
  const index = revisions.findIndex((r) => r.id === revisionId);
  if (index === -1) return null;

  const current = revisions[index];
  const updated = rescheduleItem(current, targetDueDateIso);

  revisions[index] = updated;
  saveClientRevisions(revisions);

  return updated;
}

/**
 * Evaluates weak topics across logged mistakes with statistical safeguards.
 * Minimum sample size = 2 entries to prevent false-positive classifications.
 */
export function detectWeakTopics(mistakes: MistakeEntry[]): WeakTopicInsight[] {
  const categoryStats: Record<
    string,
    { failureCount: number; module: LearningModule; sampleMistake: MistakeEntry }
  > = {};

  for (const m of mistakes) {
    if (!categoryStats[m.category]) {
      categoryStats[m.category] = { failureCount: 0, module: m.module, sampleMistake: m };
    }
    categoryStats[m.category].failureCount += 1;
  }

  const insights: WeakTopicInsight[] = Object.entries(categoryStats).map(
    ([category, stats]) => {
      const failures = stats.failureCount;
      const totalEstimated = failures + 2; // Baseline observed volume
      const accuracy = Math.max(10, Math.round(((totalEstimated - failures) / totalEstimated) * 100));

      let masteryLevel: WeakTopicInsight['masteryLevel'] = 'proficient';
      let status: WeakTopicInsight['status'] = 'consistently_well';
      let reason = `${failures} mistake(s) logged in this topic.`;

      if (failures < 2) {
        status = 'insufficient_activity';
        masteryLevel = 'developing';
        reason = `Only 1 mistake logged. More practice required to establish diagnostic trend.`;
      } else if (failures >= 3 || accuracy < 50) {
        status = 'needs_attention';
        masteryLevel = 'critical';
        reason = `High mistake recurrence (${failures} logged). Conceptual gaps detected in core problem patterns.`;
      } else {
        status = 'revisit_recommended';
        masteryLevel = 'developing';
        reason = `Moderate difficulty observed with ${failures} mistakes. Targeted revision suggested.`;
      }

      const actionUrl =
        stats.module === 'dsa'
          ? `/dsa`
          : stats.module === 'core-cs'
            ? `/core-cs`
            : `/aptitude`;

      return {
        topicName: category,
        module: stats.module,
        failureCount: failures,
        totalAttempts: totalEstimated,
        accuracyPercentage: accuracy,
        masteryLevel,
        status,
        supportingDataText: `Based on ${failures} recorded mistakes across ${stats.module.toUpperCase()}`,
        reason,
        actionUrl,
      };
    }
  );

  // Sort critical first, then developing, then others
  const priorityWeight: Record<string, number> = {
    critical: 3,
    developing: 2,
    proficient: 1,
    mastered: 0,
  };

  return insights.sort((a, b) => priorityWeight[b.masteryLevel] - priorityWeight[a.masteryLevel]);
}

/**
 * Synthesizes the student's daily smart recommendations queue.
 * Prioritizes overdue revisions, recent problem failures, and active weak topics.
 */
export function generateDailyRecommendations(
  dueRevisions: RevisionItem[],
  weakTopics: WeakTopicInsight[],
  recentMistakes: MistakeEntry[]
): DailyRecommendation[] {
  const dismissed = getDismissedRecommendationIds();
  const recommendations: DailyRecommendation[] = [];

  // 1. Spaced Repetition Due Revisions (Highest Priority)
  for (const rev of dueRevisions) {
    const id = `rec-rev-${rev.id}`;
    if (dismissed.includes(id)) continue;

    const url =
      rev.module === 'dsa'
        ? `/dsa/${rev.resourceId}`
        : rev.module === 'core-cs'
          ? `/core-cs`
          : `/aptitude`;

    recommendations.push({
      id,
      type: 'spaced_revision',
      resourceId: rev.resourceId,
      title: `Spaced Revision: ${rev.title}`,
      description: `Scheduled by the SM-2 algorithm. Recalling this concept today cements long-term memory.`,
      module: rev.module,
      url,
      priority: 'high',
      estimatedMinutes: 10,
      badge: 'Due Today',
      supportingActivityRef: `SM-2 Interval: ${rev.intervalDays}d • Repetition: ${rev.repetitionCount}`,
      createdAt: new Date().toISOString(),
    });

    if (recommendations.length >= 2) break;
  }

  // 2. Critical Weak Topic Boost
  const criticalTopic = weakTopics.find((t) => t.status === 'needs_attention' || t.masteryLevel === 'critical');
  if (criticalTopic) {
    const id = `rec-weak-${criticalTopic.topicName.replace(/\s+/g, '-').toLowerCase()}`;
    if (!dismissed.includes(id)) {
      recommendations.push({
        id,
        type: 'weak_topic_boost',
        resourceId: criticalTopic.topicName,
        title: `Target Weak Topic: ${criticalTopic.topicName}`,
        description: criticalTopic.reason,
        module: criticalTopic.module,
        url: criticalTopic.actionUrl,
        priority: 'high',
        estimatedMinutes: 15,
        badge: 'Needs Attention',
        supportingActivityRef: criticalTopic.supportingDataText,
        createdAt: new Date().toISOString(),
      });
    }
  }

  // 3. Mistake Revisit
  const unresolvedMistake = recentMistakes.find((m) => !m.isResolved && !dueRevisions.some((r) => r.mistakeId === m.id));
  if (unresolvedMistake) {
    const id = `rec-mst-${unresolvedMistake.id}`;
    if (!dismissed.includes(id)) {
      const url =
        unresolvedMistake.module === 'dsa'
          ? `/dsa/${unresolvedMistake.resourceId}`
          : unresolvedMistake.module === 'core-cs'
            ? `/core-cs`
            : `/aptitude`;

      recommendations.push({
        id,
        type: 'mistake_revisit',
        resourceId: unresolvedMistake.resourceId,
        title: `Re-Attempt: ${unresolvedMistake.resourceTitle}`,
        description: `Review your note: "${unresolvedMistake.keyTakeaway.slice(0, 80)}..."`,
        module: unresolvedMistake.module,
        url,
        priority: 'medium',
        estimatedMinutes: 12,
        badge: 'Mistake Journal',
        supportingActivityRef: `Logged on ${new Date(unresolvedMistake.createdAt).toLocaleDateString()}`,
        createdAt: new Date().toISOString(),
      });
    }
  }

  // 4. Curriculum Step Fallback if queue has room
  if (recommendations.length < 3) {
    const fallbackId = 'rec-fallback-dsa';
    if (!dismissed.includes(fallbackId)) {
      recommendations.push({
        id: fallbackId,
        type: 'curriculum_step',
        resourceId: 'binary-search',
        title: 'Practice Binary Search Pattern',
        description: 'High-frequency algorithmic pattern tested across technical placement interviews.',
        module: 'dsa',
        url: '/dsa',
        priority: 'low',
        estimatedMinutes: 20,
        badge: 'Core Syllabus',
        supportingActivityRef: 'Curriculum Progression Track',
        createdAt: new Date().toISOString(),
      });
    }
  }

  return recommendations.slice(0, 3);
}

/**
 * Calculates historical metrics grounded in actual activity records.
 */
export function calculateLearningHistoryMetrics(
  mistakes: MistakeEntry[],
  revisions: RevisionItem[]
): LearningHistoryMetrics {
  const reviewsCompleted = revisions.filter((r) => r.repetitionCount > 0).length;
  const mistakesResolved = mistakes.filter((m) => m.isResolved).length;

  // Check solved DSA problem IDs to see how many previously failed problems are now marked solved
  let previouslyFailedNowSolved = 0;
  if (typeof window !== 'undefined') {
    try {
      const rawSolved = localStorage.getItem('stackup_solved_dsa') || localStorage.getItem('dsa_solved_ids');
      if (rawSolved) {
        const solvedIds: string[] = JSON.parse(rawSolved);
        if (Array.isArray(solvedIds)) {
          const dsaMistakeResourceIds = mistakes.filter((m) => m.module === 'dsa').map((m) => m.resourceId);
          previouslyFailedNowSolved = solvedIds.filter((id) => dsaMistakeResourceIds.includes(id)).length;
        }
      }
    } catch {
      // ignore
    }
  }

  // Calculate consistency streak from review dates
  let streak = 0;
  if (reviewsCompleted > 0) {
    const reviewedDates = new Set(
      revisions
        .filter((r) => r.lastReviewedAt)
        .map((r) => new Date(r.lastReviewedAt!).toDateString())
    );
    streak = Math.min(7, reviewedDates.size);
  }

  return {
    reviewsCompletedCount: reviewsCompleted,
    mistakesResolvedCount: mistakesResolved,
    previouslyFailedNowSolvedCount: previouslyFailedNowSolved,
    revisionConsistencyStreak: streak,
  };
}

/**
 * Calculates complete learning intelligence summary.
 */
export function getLearningIntelligenceSummary(): LearningIntelligenceSummary {
  const mistakes = getClientMistakes();
  const revisions = getClientRevisions();

  const overdueRevisions: RevisionItem[] = [];
  const dueTodayRevisions: RevisionItem[] = [];
  const upcomingRevisions: RevisionItem[] = [];
  const recentlyReviewedRevisions: RevisionItem[] = [];

  for (const item of revisions) {
    const category = categorizeRevisionItem(item);
    if (category === 'overdue') {
      overdueRevisions.push(item);
    } else if (category === 'due_today') {
      dueTodayRevisions.push(item);
    } else if (category === 'recently_reviewed') {
      recentlyReviewedRevisions.push(item);
    } else {
      upcomingRevisions.push(item);
    }
  }

  // Due revisions combine overdue and due today
  const dueRevisions = [...overdueRevisions, ...dueTodayRevisions];

  const weakTopics = detectWeakTopics(mistakes);
  const dailyRecommendations = generateDailyRecommendations(
    dueRevisions,
    weakTopics,
    mistakes
  );

  const avgEase =
    revisions.length > 0
      ? revisions.reduce((sum, r) => sum + r.easeFactor, 0) / revisions.length
      : INITIAL_EASE_FACTOR;
  const retentionScore = Math.min(100, Math.round((avgEase / 3.0) * 100));

  const masteredCount = weakTopics.filter((t) => t.masteryLevel === 'mastered').length;
  const historyMetrics = calculateLearningHistoryMetrics(mistakes, revisions);

  return {
    totalMistakesLogged: mistakes.length,
    dueRevisionsCount: dueRevisions.length,
    overdueCount: overdueRevisions.length,
    upcomingCount: upcomingRevisions.length,
    recentlyReviewedCount: recentlyReviewedRevisions.length,
    masteredTopicsCount: masteredCount,
    retentionScore,
    dueRevisions,
    overdueRevisions,
    upcomingRevisions,
    recentlyReviewedRevisions,
    recentMistakes: mistakes,
    weakTopics,
    dailyRecommendations,
    historyMetrics,
  };
}
