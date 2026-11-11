import { describe, it, expect } from 'vitest';
import { 
  calculateSM2Schedule, 
  categorizeRevisionItem,
  isItemDue, 
  rescheduleItem,
  formatIntervalDisplay,
  previewNextInterval,
  INITIAL_EASE_FACTOR,
  MIN_EASE_FACTOR 
} from '../src/lib/services/learning-intelligence/sm2';
import { 
  detectWeakTopics, 
  generateDailyRecommendations,
  calculateLearningHistoryMetrics,
  DEFAULT_STARTER_MISTAKES
} from '../src/lib/services/learning-intelligence/intelligence-engine';
import type { 
  RevisionItem, 
  MistakeEntry, 
  WeakTopicInsight 
} from '../src/lib/types/learning-intelligence';
import { NextRequest } from 'next/server';
import { createSessionToken } from '../src/lib/security/session-manager';
import { SESSION_CONFIG } from '../src/lib/security/session-config';

describe('StackUp Learning Intelligence: SuperMemo SM-2 Algorithm & Edge Cases', () => {
  const baseItem: RevisionItem = {
    id: 'test-item-1',
    userId: 'student-123',
    module: 'dsa',
    resourceId: 'two-sum',
    title: 'Two Sum',
    subtitle: 'Arrays & Hashing',
    repetitionCount: 0,
    intervalDays: 0,
    easeFactor: INITIAL_EASE_FACTOR,
    dueDate: new Date().toISOString(),
  };

  // 1. First review
  it('1. First review: schedules initial repetition (rep 0 -> interval 1 day)', () => {
    const fixedNow = 1700000000000;
    const result = calculateSM2Schedule(baseItem, 4, fixedNow);

    expect(result.repetitionCount).toBe(1);
    expect(result.intervalDays).toBe(1);
    expect(result.lastRating).toBe(4);
    expect(new Date(result.dueDate).getTime()).toBe(fixedNow + 24 * 3600 * 1000);
  });

  // 2. Again
  it('2. Again: resets repetition count to 0 and interval to 1 day on recall blackout', () => {
    const advancedItem: RevisionItem = {
      ...baseItem,
      repetitionCount: 4,
      intervalDays: 30,
      easeFactor: 2.5,
    };

    const fixedNow = 1700000000000;
    const result = calculateSM2Schedule(advancedItem, 1, fixedNow);

    expect(result.repetitionCount).toBe(0);
    expect(result.intervalDays).toBe(1);
    expect(result.easeFactor).toBeLessThan(2.5);
    expect(new Date(result.dueDate).getTime()).toBe(fixedNow + 24 * 3600 * 1000);
  });

  // 3. Hard
  it('3. Hard: treats rating 2 as a struggle, resets repetition count and reduces ease factor', () => {
    const fixedNow = 1700000000000;
    const result = calculateSM2Schedule(baseItem, 2, fixedNow);

    expect(result.repetitionCount).toBe(0);
    expect(result.intervalDays).toBe(1);
    expect(result.easeFactor).toBeLessThan(INITIAL_EASE_FACTOR);
  });

  // 4. Good
  it('4. Good: advances repetition count and schedules standard interval (rep 1 -> 6 days)', () => {
    const rep1Item: RevisionItem = {
      ...baseItem,
      repetitionCount: 1,
      intervalDays: 1,
      easeFactor: 2.5,
    };

    const fixedNow = 1700000000000;
    const result = calculateSM2Schedule(rep1Item, 4, fixedNow);

    expect(result.repetitionCount).toBe(2);
    expect(result.intervalDays).toBe(6);
    expect(new Date(result.dueDate).getTime()).toBe(fixedNow + 6 * 24 * 3600 * 1000);
  });

  // 5. Easy
  it('5. Easy: increases ease factor and scales interval with bonus', () => {
    const rep2Item: RevisionItem = {
      ...baseItem,
      repetitionCount: 2,
      intervalDays: 6,
      easeFactor: 2.5,
    };

    const result = calculateSM2Schedule(rep2Item, 5);
    expect(result.repetitionCount).toBe(3);
    expect(result.easeFactor).toBeGreaterThan(2.5);
    expect(result.intervalDays).toBeGreaterThanOrEqual(15);
  });

  // 6. Repeated successful reviews
  it('6. Repeated successful reviews: increases intervals monotonically with ease factor', () => {
    let current = { ...baseItem };
    const recordedIntervals: number[] = [];

    for (let i = 0; i < 4; i++) {
      current = calculateSM2Schedule(current, 4);
      recordedIntervals.push(current.intervalDays);
    }

    // Progression: [1, 6, 15, 38]
    expect(recordedIntervals[0]).toBe(1);
    expect(recordedIntervals[1]).toBe(6);
    expect(recordedIntervals[2]).toBeGreaterThan(recordedIntervals[1]);
    expect(recordedIntervals[3]).toBeGreaterThan(recordedIntervals[2]);
  });

  // 7. Repeated failed reviews
  it('7. Repeated failed reviews: preserves minimum ease factor boundary (1.3)', () => {
    let current = { ...baseItem };

    for (let i = 0; i < 8; i++) {
      current = calculateSM2Schedule(current, 1);
    }

    expect(current.repetitionCount).toBe(0);
    expect(current.intervalDays).toBe(1);
    expect(current.easeFactor).toBe(MIN_EASE_FACTOR);
  });

  // 8. Overdue reviews
  it('8. Overdue reviews: accurately categorizes items past start of day as overdue', () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 36 * 3600 * 1000).toISOString();
    const overdueItem: RevisionItem = { ...baseItem, dueDate: yesterday };

    expect(categorizeRevisionItem(overdueItem, now)).toBe('overdue');
    expect(isItemDue(yesterday, now)).toBe(true);
  });

  // 9. Manual rescheduling
  it('9. Manual rescheduling: updates due date and interval without corrupting repetitions', () => {
    const advancedItem: RevisionItem = {
      ...baseItem,
      repetitionCount: 3,
      intervalDays: 15,
      easeFactor: 2.7,
    };

    const targetDate = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString();
    const rescheduled = rescheduleItem(advancedItem, targetDate);

    expect(rescheduled.repetitionCount).toBe(3);
    expect(rescheduled.easeFactor).toBe(2.7);
    expect(rescheduled.intervalDays).toBe(5);
    expect(new Date(rescheduled.dueDate).toISOString()).toBe(targetDate);
  });

  // 10. Invalid dates
  it('10. Invalid dates: handles corrupted or NaN dates gracefully', () => {
    const corruptedItem: RevisionItem = {
      ...baseItem,
      dueDate: 'invalid-date-string',
      lastReviewedAt: 'not-a-date',
    };

    const result = calculateSM2Schedule(corruptedItem, 4);
    expect(isNaN(new Date(result.dueDate).getTime())).toBe(false);
    expect(result.intervalDays).toBe(1);
  });

  // 11. Duplicate requests
  it('11. Duplicate requests: calculating SM-2 schedule is deterministic and pure', () => {
    const fixedNow = 1700000000000;
    const run1 = calculateSM2Schedule(baseItem, 4, fixedNow);
    const run2 = calculateSM2Schedule(baseItem, 4, fixedNow);

    expect(run1).toEqual(run2);
  });

  // 12. Concurrent requests
  it('12. Concurrent requests: immutability prevents in-place mutation of input item', () => {
    const originalFreeze = Object.freeze({ ...baseItem });
    const updated = calculateSM2Schedule(originalFreeze, 4);

    expect(updated).not.toBe(originalFreeze);
    expect(originalFreeze.repetitionCount).toBe(0);
    expect(updated.repetitionCount).toBe(1);
  });

  // 13. Time-zone boundaries
  it('13. Time-zone boundaries: due dates are stored in standard UTC ISO 8601', () => {
    const result = calculateSM2Schedule(baseItem, 4);
    expect(result.dueDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  // 14. Daylight-saving boundaries
  it('14. Daylight-saving boundaries: 24-hour UTC millisecond addition avoids clock shift errors', () => {
    // US Spring DST transition timestamp (March 10, 2024, 01:00 UTC)
    const dstTs = new Date('2024-03-10T01:00:00.000Z').getTime();
    const result = calculateSM2Schedule(baseItem, 4, dstTs);

    const diffMs = new Date(result.dueDate).getTime() - dstTs;
    expect(diffMs).toBe(24 * 3600 * 1000);
  });

  // 15. Leap-year boundaries
  it('15. Leap-year boundaries: seamlessly handles February 28 to February 29 in leap years', () => {
    // 2024 is a leap year
    const feb28_2024 = new Date('2024-02-28T12:00:00.000Z').getTime();
    const result = calculateSM2Schedule(baseItem, 4, feb28_2024);

    const scheduledDate = new Date(result.dueDate);
    expect(scheduledDate.getUTCFullYear()).toBe(2024);
    expect(scheduledDate.getUTCMonth()).toBe(1); // 0-indexed month 1 = February
    expect(scheduledDate.getUTCDate()).toBe(29);
  });

  it('correctly formats display intervals and previews next intervals', () => {
    expect(formatIntervalDisplay(1)).toBe('+1 day');
    expect(formatIntervalDisplay(6)).toBe('+6 days');
    expect(formatIntervalDisplay(60)).toBe('+2 mo');

    expect(previewNextInterval(baseItem, 1)).toBe(1);
    expect(previewNextInterval(baseItem, 4)).toBe(1); // rep 0 -> 1

    const rep1Item: RevisionItem = { ...baseItem, repetitionCount: 1, intervalDays: 1 };
    expect(previewNextInterval(rep1Item, 4)).toBe(6); // rep 1 -> 6
  });
});

describe('StackUp Learning Intelligence: Weak Topic Diagnosis & Recommendations', () => {
  it('applies statistical safeguards: requires minimum 2 observations before diagnosing weak status', () => {
    const singleMistake: MistakeEntry[] = [
      {
        id: 'm1',
        userId: 'student-1',
        module: 'core-cs',
        resourceId: 'virtual-memory',
        resourceTitle: 'Virtual Memory & Paging',
        category: 'Operating Systems',
        mistakeType: 'conceptual',
        userNotes: 'Confused inverted page table',
        keyTakeaway: 'Inverted page table has 1 entry per physical frame',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const weakTopics = detectWeakTopics(singleMistake);
    expect(weakTopics).toHaveLength(1);
    // Single observation must be flagged as insufficient_activity
    expect(weakTopics[0].status).toBe('insufficient_activity');
    expect(weakTopics[0].reason).toContain('More practice required');
  });

  it('identifies critical weak topics when mistake frequency >= 3', () => {
    const mistakes: MistakeEntry[] = [
      {
        id: 'm1',
        userId: 'student-1',
        module: 'dsa',
        resourceId: 'p1',
        resourceTitle: 'Word Break',
        category: 'Dynamic Programming',
        mistakeType: 'time_limit_exceeded',
        userNotes: 'TLE without memoization',
        keyTakeaway: 'Always check if overlapping subproblems exist',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'm2',
        userId: 'student-1',
        module: 'dsa',
        resourceId: 'p2',
        resourceTitle: 'Coin Change',
        category: 'Dynamic Programming',
        mistakeType: 'wrong_answer',
        userNotes: 'Initialized with 0 instead of infinity',
        keyTakeaway: 'Set DP array default to Infinity',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'm3',
        userId: 'student-1',
        module: 'dsa',
        resourceId: 'p3',
        resourceTitle: 'Longest Increasing Subsequence',
        category: 'Dynamic Programming',
        mistakeType: 'time_limit_exceeded',
        userNotes: 'Used O(N^2) instead of patience sorting O(N log N)',
        keyTakeaway: 'Use binary search over tails array for LIS',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const weakTopics = detectWeakTopics(mistakes);
    expect(weakTopics).toHaveLength(1);

    const dpTopic = weakTopics[0];
    expect(dpTopic.topicName).toBe('Dynamic Programming');
    expect(dpTopic.status).toBe('needs_attention');
    expect(dpTopic.masteryLevel).toBe('critical');
    expect(dpTopic.failureCount).toBe(3);
    expect(dpTopic.supportingDataText).toContain('3 recorded mistakes');
  });

  it('generates high-impact daily recommendations prioritizing due SM-2 items and critical weak topics', () => {
    const dueRevisions: RevisionItem[] = [
      {
        id: 'rev-due-1',
        userId: 'student-1',
        module: 'dsa',
        resourceId: 'lru-cache',
        title: 'LRU Cache',
        subtitle: 'Linked List • HashMap',
        repetitionCount: 1,
        intervalDays: 1,
        easeFactor: 2.5,
        dueDate: new Date(Date.now() - 3600 * 1000).toISOString(),
      },
    ];

    const weakTopics: WeakTopicInsight[] = [
      {
        topicName: 'Operating Systems',
        module: 'core-cs',
        failureCount: 4,
        totalAttempts: 7,
        accuracyPercentage: 42,
        masteryLevel: 'critical',
        status: 'needs_attention',
        supportingDataText: 'Based on 4 recorded mistakes',
        reason: 'Frequent mistakes in Deadlocks and Paging',
        actionUrl: '/core-cs',
      },
    ];

    const recs = generateDailyRecommendations(dueRevisions, weakTopics, DEFAULT_STARTER_MISTAKES);

    expect(recs.length).toBeGreaterThanOrEqual(2);
    expect(recs[0].type).toBe('spaced_revision');
    expect(recs[0].badge).toBe('Due Today');
    expect(recs[0].url).toBe('/dsa/lru-cache');
    expect(recs[1].type).toBe('weak_topic_boost');
    expect(recs[1].module).toBe('core-cs');
  });

  it('calculates learning history metrics based on real records', () => {
    const mistakes: MistakeEntry[] = [
      {
        id: 'm1',
        userId: 'student-1',
        module: 'dsa',
        resourceId: 'two-sum',
        resourceTitle: 'Two Sum',
        category: 'Arrays & Hashing',
        mistakeType: 'edge_case',
        userNotes: 'Used nested loops',
        keyTakeaway: 'Use map complement',
        isResolved: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'm2',
        userId: 'student-1',
        module: 'dsa',
        resourceId: 'valid-anagram',
        resourceTitle: 'Valid Anagram',
        category: 'Arrays & Hashing',
        mistakeType: 'wrong_answer',
        userNotes: 'Missed unicode character case',
        keyTakeaway: 'Use frequency array of size 26',
        isResolved: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const revisions: RevisionItem[] = [
      {
        id: 'rev1',
        userId: 'student-1',
        module: 'dsa',
        resourceId: 'two-sum',
        title: 'Two Sum',
        subtitle: 'Arrays',
        repetitionCount: 2,
        intervalDays: 6,
        easeFactor: 2.5,
        dueDate: new Date().toISOString(),
        lastReviewedAt: new Date().toISOString(),
      },
    ];

    const metrics = calculateLearningHistoryMetrics(mistakes, revisions);
    expect(metrics.reviewsCompletedCount).toBe(1);
    expect(metrics.mistakesResolvedCount).toBe(1);
  });
});

describe('StackUp Learning Intelligence: Secure API Route Handlers', () => {
  it('blocks unauthenticated GET requests to /api/learning-intelligence', async () => {
    const { GET } = await import('../src/app/api/learning-intelligence/route');
    const req = new NextRequest('http://localhost:3000/api/learning-intelligence');

    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('permits authenticated GET requests with signed session cookie', async () => {
    const { GET } = await import('../src/app/api/learning-intelligence/route');
    const { token } = createSessionToken({
      userId: 'usr-student-learner',
      email: 'learner@stackup.xyz',
      role: 'student',
      rememberMe: false,
    });

    const req = new NextRequest('http://localhost:3000/api/learning-intelligence', {
      headers: {
        cookie: `${SESSION_CONFIG.cookieName}=${token}`,
      },
    });

    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.user.id).toBe('usr-student-learner');
  });

  it('validates and records mistake mutations via POST /api/learning-intelligence', async () => {
    const { POST } = await import('../src/app/api/learning-intelligence/route');
    const { token } = createSessionToken({
      userId: 'usr-student-learner',
      email: 'learner@stackup.xyz',
      role: 'student',
      rememberMe: false,
    });

    // 1. Missing required fields
    const invalidReq = new NextRequest('http://localhost:3000/api/learning-intelligence', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        cookie: `${SESSION_CONFIG.cookieName}=${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resourceId: 'two-sum' }),
    });

    const invalidRes = await POST(invalidReq);
    expect(invalidRes.status).toBe(400);

    // 2. Valid mistake submission
    const validReq = new NextRequest('http://localhost:3000/api/learning-intelligence', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        cookie: `${SESSION_CONFIG.cookieName}=${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        module: 'dsa',
        resourceId: 'binary-search',
        resourceTitle: 'Binary Search',
        category: 'Binary Search',
        mistakeType: 'off_by_one',
        userNotes: 'Used left <= right when searching for first occurrence',
        keyTakeaway: 'For lower bound, update right = mid when nums[mid] == target',
      }),
    });

    const validRes = await POST(validReq);
    expect(validRes.status).toBe(200);
    const data = await validRes.json();
    expect(data.success).toBe(true);
    expect(data.mistake.resourceTitle).toBe('Binary Search');
    expect(data.mistake.userId).toBe('usr-student-learner');

    // 3. Edit mistake
    const editReq = new NextRequest('http://localhost:3000/api/learning-intelligence', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        cookie: `${SESSION_CONFIG.cookieName}=${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update_mistake',
        mistakeId: data.mistake.id,
        userNotes: 'Updated user note about mid formula',
        keyTakeaway: 'Use mid = left + (right - left) / 2 to avoid integer overflow',
      }),
    });

    const editRes = await POST(editReq);
    expect(editRes.status).toBe(200);
    const editData = await editRes.json();
    expect(editData.success).toBe(true);
    expect(editData.updated.keyTakeaway).toContain('avoid integer overflow');
  });

  it('calculates SM-2 review rating via POST /api/learning-intelligence/review', async () => {
    const { POST } = await import('../src/app/api/learning-intelligence/review/route');
    const { token } = createSessionToken({
      userId: 'usr-student-learner',
      email: 'learner@stackup.xyz',
      role: 'student',
      rememberMe: false,
    });

    const reviewReq = new NextRequest('http://localhost:3000/api/learning-intelligence/review', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        cookie: `${SESSION_CONFIG.cookieName}=${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        revisionItem: {
          id: 'rev-test',
          userId: 'usr-student-learner',
          module: 'dsa',
          resourceId: 'two-sum',
          title: 'Two Sum',
          subtitle: 'Arrays & Hashing',
          repetitionCount: 1,
          intervalDays: 1,
          easeFactor: 2.5,
          dueDate: new Date().toISOString(),
        },
        rating: 4,
      }),
    });

    const res = await POST(reviewReq);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.updatedItem.repetitionCount).toBe(2);
    expect(data.updatedItem.intervalDays).toBe(6);
  });
});
