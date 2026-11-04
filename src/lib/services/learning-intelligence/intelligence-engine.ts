import type {
  MistakeEntry,
  RevisionItem,
  WeakTopicInsight,
  DailyRecommendation,
  LearningIntelligenceSummary,
  SM2Rating,
  LearningModule,
} from '@/lib/types/learning-intelligence';
import { calculateSM2Schedule, isItemDue, INITIAL_EASE_FACTOR } from './sm2';

const MISTAKES_STORAGE_KEY = 'stackup_mistake_journal';
const REVISIONS_STORAGE_KEY = 'stackup_revision_queue';

/**
 * High-value default starter mistakes to illustrate the value of mistake journaling.
 */
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
 * Evaluates weak topics across logged mistakes and attempted modules.
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
      const totalEstimated = failures + 3; // Synthetic baseline
      const accuracy = Math.max(10, Math.round(((totalEstimated - failures) / totalEstimated) * 100));

      let masteryLevel: WeakTopicInsight['masteryLevel'] = 'proficient';
      let reason = `${failures} mistake(s) logged in this topic.`;

      if (failures >= 3 || accuracy < 50) {
        masteryLevel = 'critical';
        reason = `High mistake frequency: ${failures} recorded mistakes. Prioritize concept review.`;
      } else if (failures >= 2 || accuracy < 70) {
        masteryLevel = 'developing';
        reason = `Moderate difficulty observed with ${failures} mistakes.`;
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
        reason,
        actionUrl,
      };
    }
  );

  // Sort critical first, then developing
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
 */
export function generateDailyRecommendations(
  dueRevisions: RevisionItem[],
  weakTopics: WeakTopicInsight[],
  recentMistakes: MistakeEntry[]
): DailyRecommendation[] {
  const recommendations: DailyRecommendation[] = [];

  // 1. Spaced Repetition Due Revisions (Highest Priority)
  for (const rev of dueRevisions.slice(0, 2)) {
    const url =
      rev.module === 'dsa'
        ? `/dsa/${rev.resourceId}`
        : rev.module === 'core-cs'
          ? `/core-cs`
          : `/aptitude`;

    recommendations.push({
      id: `rec-rev-${rev.id}`,
      type: 'spaced_revision',
      title: `Spaced Revision: ${rev.title}`,
      description: `Scheduled by the SM-2 algorithm. Recalling this concept today cements long-term memory.`,
      module: rev.module,
      url,
      priority: 'high',
      estimatedMinutes: 10,
      badge: 'Due Today',
    });
  }

  // 2. Critical Weak Topic Boost
  const criticalTopic = weakTopics.find((t) => t.masteryLevel === 'critical');
  if (criticalTopic) {
    recommendations.push({
      id: `rec-weak-${criticalTopic.topicName.replace(/\s+/g, '-').toLowerCase()}`,
      type: 'weak_topic_boost',
      title: `Target Weak Topic: ${criticalTopic.topicName}`,
      description: criticalTopic.reason,
      module: criticalTopic.module,
      url: criticalTopic.actionUrl,
      priority: 'high',
      estimatedMinutes: 15,
      badge: 'Critical Concept',
    });
  }

  // 3. Mistake Revisit
  const latestMistake = recentMistakes[0];
  if (latestMistake && !dueRevisions.some((r) => r.mistakeId === latestMistake.id)) {
    const url =
      latestMistake.module === 'dsa'
        ? `/dsa/${latestMistake.resourceId}`
        : latestMistake.module === 'core-cs'
          ? `/core-cs`
          : `/aptitude`;

    recommendations.push({
      id: `rec-mst-${latestMistake.id}`,
      type: 'mistake_revisit',
      title: `Re-Attempt: ${latestMistake.resourceTitle}`,
      description: `Review your note: "${latestMistake.keyTakeaway.slice(0, 80)}..."`,
      module: latestMistake.module,
      url,
      priority: 'medium',
      estimatedMinutes: 12,
      badge: 'Mistake Journal',
    });
  }

  // 4. Default High-Yield Fallback if queue has room
  if (recommendations.length < 3) {
    recommendations.push({
      id: 'rec-fallback-dsa',
      type: 'curriculum_step',
      title: 'Practice Binary Search Pattern',
      description: 'Frequently tested across FAANG/Tier-1 campus assessments.',
      module: 'dsa',
      url: '/dsa',
      priority: 'low',
      estimatedMinutes: 20,
      badge: 'Core Syllabus',
    });
  }

  return recommendations.slice(0, 3);
}

/**
 * Calculates complete learning intelligence summary.
 */
export function getLearningIntelligenceSummary(): LearningIntelligenceSummary {
  const mistakes = getClientMistakes();
  const revisions = getClientRevisions();

  const dueRevisions = revisions.filter((r) => isItemDue(r.dueDate));
  const weakTopics = detectWeakTopics(mistakes);
  const dailyRecommendations = generateDailyRecommendations(
    dueRevisions,
    weakTopics,
    mistakes
  );

  // Compute retention score: average easeFactor normalized to 0-100
  const avgEase =
    revisions.length > 0
      ? revisions.reduce((sum, r) => sum + r.easeFactor, 0) / revisions.length
      : INITIAL_EASE_FACTOR;
  const retentionScore = Math.min(100, Math.round((avgEase / 3.0) * 100));

  const masteredCount = weakTopics.filter((t) => t.masteryLevel === 'mastered').length;

  return {
    totalMistakesLogged: mistakes.length,
    dueRevisionsCount: dueRevisions.length,
    masteredTopicsCount: masteredCount,
    retentionScore,
    dueRevisions,
    recentMistakes: mistakes,
    weakTopics,
    dailyRecommendations,
  };
}

export { previewNextInterval, formatIntervalDisplay } from './sm2';
