import type { RevisionItem, SM2Rating } from '@/lib/types/learning-intelligence';

export const INITIAL_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;

export type RevisionBucket = 'overdue' | 'due_today' | 'upcoming' | 'recently_reviewed';

/**
 * Validates a timestamp or returns current UTC time safely.
 */
function safeTimestamp(ts?: number | string | Date): number {
  if (ts === undefined || ts === null) return Date.now();
  const date = new Date(ts);
  const time = date.getTime();
  return isNaN(time) ? Date.now() : time;
}

/**
 * Calculates the start and end of the reference day in local time.
 */
function getDayBoundaries(ref: Date = new Date()): { startOfDay: number; endOfDay: number } {
  const start = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate(), 0, 0, 0, 0).getTime();
  const end = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate(), 23, 59, 59, 999).getTime();
  return { startOfDay: start, endOfDay: end };
}

/**
 * Pure SuperMemo SM-2 calculation engine.
 * 
 * Exact formulas:
 * 1. EF' = max(1.3, EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
 * 2. If q < 3: n = 0, I = 1
 *    If q >= 3:
 *      n = 0 => I = 1
 *      n = 1 => I = 6
 *      n >= 2 => I = max(1, round(I * EF'))
 *      n' = n + 1
 * 
 * @param item Current revision item state
 * @param rating Quality of recall rating (1 = Again, 2 = Hard, 4 = Good, 5 = Easy)
 * @param reviewTimestamp Optional timestamp for deterministic testing
 */
export function calculateSM2Schedule(
  item: RevisionItem,
  rating: SM2Rating,
  reviewTimestamp: number = Date.now()
): RevisionItem {
  const currentTs = safeTimestamp(reviewTimestamp);
  let { repetitionCount, intervalDays } = item;
  const easeFactor = typeof item.easeFactor === 'number' && !isNaN(item.easeFactor) 
    ? item.easeFactor 
    : INITIAL_EASE_FACTOR;

  // 1. Calculate new Ease Factor (EF)
  const delta = 5 - rating;
  const newEaseFactor = Math.max(
    MIN_EASE_FACTOR,
    Number((easeFactor + (0.1 - delta * (0.08 + delta * 0.02))).toFixed(3))
  );

  // 2. Calculate next interval & repetition count
  if (rating < 3) {
    // Failure / Blackout: Reset repetitions to 0, review tomorrow
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

  // 3. Compute new due date safely handling leap years and DST
  const targetDate = new Date(currentTs + intervalDays * 24 * 60 * 60 * 1000);
  const nextDueDate = targetDate.toISOString();

  return {
    ...item,
    repetitionCount,
    intervalDays,
    easeFactor: newEaseFactor,
    dueDate: nextDueDate,
    lastReviewedAt: new Date(currentTs).toISOString(),
    lastRating: rating,
  };
}

/**
 * Manually reschedules an item to a specific date without resetting its historical metrics.
 */
export function rescheduleItem(item: RevisionItem, targetDateIso: string): RevisionItem {
  const targetTs = safeTimestamp(targetDateIso);
  const now = Date.now();
  const diffDays = Math.max(1, Math.round((targetTs - now) / (24 * 3600 * 1000)));

  return {
    ...item,
    intervalDays: diffDays,
    dueDate: new Date(targetTs).toISOString(),
  };
}

/**
 * Categorizes a revision item into one of the 4 strict queues:
 * - 'overdue': Due before start of today
 * - 'due_today': Due today (between 00:00:00 and 23:59:59)
 * - 'upcoming': Due after today
 * - 'recently_reviewed': Reviewed within the last 7 days
 */
export function categorizeRevisionItem(
  item: RevisionItem,
  referenceDate: Date = new Date()
): RevisionBucket {
  const dueTs = safeTimestamp(item.dueDate);
  const { startOfDay, endOfDay } = getDayBoundaries(referenceDate);

  // Check if reviewed within last 7 days
  if (item.lastReviewedAt) {
    const reviewedTs = safeTimestamp(item.lastReviewedAt);
    const sevenDaysAgo = referenceDate.getTime() - 7 * 24 * 3600 * 1000;
    if (reviewedTs >= sevenDaysAgo && dueTs > endOfDay) {
      return 'recently_reviewed';
    }
  }

  if (dueTs < startOfDay) {
    return 'overdue';
  } else if (dueTs <= endOfDay) {
    return 'due_today';
  } else {
    return 'upcoming';
  }
}

/**
 * Evaluates whether an item is due for action (either overdue or due today).
 */
export function isItemDue(dueDateIso: string, referenceDate: Date = new Date()): boolean {
  if (!dueDateIso) return true;
  const dueTs = safeTimestamp(dueDateIso);
  const { endOfDay } = getDayBoundaries(referenceDate);
  return dueTs <= endOfDay;
}

/**
 * Formats time interval labels (e.g. "+1 day", "+6 days", "+2 mo").
 */
export function formatIntervalDisplay(days: number): string {
  if (days <= 0) return 'Immediate';
  if (days === 1) return '+1 day';
  if (days < 30) return `+${days} days`;
  const months = Math.round(days / 30);
  return `+${months} mo`;
}

/**
 * Previews the next interval for a specific rating.
 */
export function previewNextInterval(item: RevisionItem, rating: SM2Rating): number {
  if (rating < 3) return 1;
  if (item.repetitionCount === 0) return 1;
  if (item.repetitionCount === 1) return 6;
  const ef = typeof item.easeFactor === 'number' && !isNaN(item.easeFactor) ? item.easeFactor : INITIAL_EASE_FACTOR;
  return Math.max(1, Math.round(item.intervalDays * ef));
}

/**
 * Computes an ISO timestamp for a date N days ahead.
 */
export function computeFutureDateISO(daysAhead: number): string {
  return new Date(Date.now() + daysAhead * 24 * 3600 * 1000).toISOString();
}
