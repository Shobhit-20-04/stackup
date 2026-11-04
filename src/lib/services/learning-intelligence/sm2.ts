import type { RevisionItem, SM2Rating } from '@/lib/types/learning-intelligence';

export const INITIAL_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;

/**
 * Calculates the next review schedule for an item using the SuperMemo SM-2 algorithm.
 * 
 * @param item Current revision item state
 * @param rating Quality of recall rating (1 to 5)
 * @param reviewTimestamp Optional timestamp for test determinism (defaults to now)
 * @returns Updated RevisionItem with new repetition count, interval, ease factor, and due date
 */
export function calculateSM2Schedule(
  item: RevisionItem,
  rating: SM2Rating,
  reviewTimestamp: number = Date.now()
): RevisionItem {
  let { repetitionCount, intervalDays } = item;
  const { easeFactor } = item;

  // 1. Update Ease Factor (EF)
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const delta = 5 - rating;
  const newEaseFactor = Math.max(
    MIN_EASE_FACTOR,
    Number((easeFactor + (0.1 - delta * (0.08 + delta * 0.02))).toFixed(3))
  );

  // 2. Calculate next interval & repetition count
  if (rating < 3) {
    // Failure / Blackout: Reset repetitions, review tomorrow
    repetitionCount = 0;
    intervalDays = 1;
  } else {
    // Successful recall
    if (repetitionCount === 0) {
      intervalDays = 1;
    } else if (repetitionCount === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.max(1, Math.round(intervalDays * newEaseFactor));
    }
    repetitionCount += 1;
  }

  // 3. Compute new due date
  const nextDueDate = new Date(reviewTimestamp + intervalDays * 24 * 60 * 60 * 1000).toISOString();

  return {
    ...item,
    repetitionCount,
    intervalDays,
    easeFactor: newEaseFactor,
    dueDate: nextDueDate,
    lastReviewedAt: new Date(reviewTimestamp).toISOString(),
    lastRating: rating,
  };
}

/**
 * Determines whether a revision item is due for review today or overdue.
 */
export function isItemDue(dueDateIso: string, referenceDate: Date = new Date()): boolean {
  if (!dueDateIso) return true;
  const due = new Date(dueDateIso).getTime();
  const ref = referenceDate.getTime();
  return due <= ref;
}

/**
 * Generates human-readable time interval labels (e.g. "+1d", "+6d", "+14d").
 */
export function formatIntervalDisplay(days: number): string {
  if (days <= 0) return 'Immediate';
  if (days === 1) return '+1 day';
  if (days < 30) return `+${days} days`;
  const months = Math.round(days / 30);
  return `+${months} mo`;
}

/**
 * Helper to preview the next interval for UI buttons.
 */
export function previewNextInterval(item: RevisionItem, rating: SM2Rating): number {
  if (rating < 3) return 1;
  if (item.repetitionCount === 0) return 1;
  if (item.repetitionCount === 1) return 6;
  return Math.max(1, Math.round(item.intervalDays * item.easeFactor));
}
