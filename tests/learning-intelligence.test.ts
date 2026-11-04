import { describe, it, expect } from 'vitest';
import { 
  calculateSM2Schedule, 
  isItemDue, 
  formatIntervalDisplay,
  previewNextInterval,
  INITIAL_EASE_FACTOR,
  MIN_EASE_FACTOR 
} from '../src/lib/services/learning-intelligence/sm2';
import { 
  detectWeakTopics, 
  generateDailyRecommendations,
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

describe('StackUp Learning Intelligence: SuperMemo SM-2 Algorithm', () => {
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

  it('correctly schedules first repetition (rep 0 -> interval 1 day)', () => {
    const fixedNow = 1700000000000;
    const result = calculateSM2Schedule(baseItem, 4, fixedNow);

    expect(result.repetitionCount).toBe(1);
    expect(result.intervalDays).toBe(1);
    expect(result.lastRating).toBe(4);
    expect(new Date(result.dueDate).getTime()).toBe(fixedNow + 24 * 3600 * 1000);
  });

  it('correctly schedules second repetition (rep 1 -> interval 6 days)', () => {
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

  it('correctly scales subsequent repetitions using Ease Factor (rep 2 -> 6 * 2.5 = 15 days)', () => {
    const rep2Item: RevisionItem = {
      ...baseItem,
      repetitionCount: 2,
      intervalDays: 6,
      easeFactor: 2.5,
    };

    const fixedNow = 1700000000000;
    const result = calculateSM2Schedule(rep2Item, 4, fixedNow);

    expect(result.repetitionCount).toBe(3);
    // 6 * 2.5 = 15 days
    expect(result.intervalDays).toBe(15);
    expect(new Date(result.dueDate).getTime()).toBe(fixedNow + 15 * 24 * 3600 * 1000);
  });

  it('resets repetition count and resets interval to 1 day on recall blackout (rating 1)', () => {
    const advancedItem: RevisionItem = {
      ...baseItem,
      repetitionCount: 5,
      intervalDays: 45,
      easeFactor: 2.6,
    };

    const fixedNow = 1700000000000;
    const result = calculateSM2Schedule(advancedItem, 1, fixedNow);

    expect(result.repetitionCount).toBe(0);
    expect(result.intervalDays).toBe(1);
    expect(result.easeFactor).toBeLessThan(2.6);
    expect(new Date(result.dueDate).getTime()).toBe(fixedNow + 24 * 3600 * 1000);
  });

  it('never drops ease factor below MIN_EASE_FACTOR (1.3)', () => {
    let currentItem: RevisionItem = {
      ...baseItem,
      easeFactor: 1.35,
    };

    // Multiple blackout failures
    for (let i = 0; i < 5; i++) {
      currentItem = calculateSM2Schedule(currentItem, 1);
    }

    expect(currentItem.easeFactor).toBe(MIN_EASE_FACTOR);
  });

  it('increases ease factor on perfect recall (rating 5)', () => {
    const result = calculateSM2Schedule(baseItem, 5);
    expect(result.easeFactor).toBeGreaterThan(INITIAL_EASE_FACTOR);
  });

  it('correctly evaluates isItemDue', () => {
    const pastDate = new Date(Date.now() - 3600 * 1000).toISOString();
    const futureDate = new Date(Date.now() + 24 * 3600 * 1000).toISOString();

    expect(isItemDue(pastDate)).toBe(true);
    expect(isItemDue(futureDate)).toBe(false);
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
      {
        id: 'm4',
        userId: 'student-1',
        module: 'core-cs',
        resourceId: 'tcp',
        resourceTitle: 'TCP Handshake',
        category: 'Computer Networks',
        mistakeType: 'conceptual',
        userNotes: 'Confused FIN with RST',
        keyTakeaway: 'FIN terminates gracefully, RST tears down connection immediately',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const weakTopics = detectWeakTopics(mistakes);
    expect(weakTopics).toHaveLength(2);

    const dpTopic = weakTopics.find((t) => t.topicName === 'Dynamic Programming');
    expect(dpTopic).toBeDefined();
    expect(dpTopic?.masteryLevel).toBe('critical');
    expect(dpTopic?.failureCount).toBe(3);

    const cnTopic = weakTopics.find((t) => t.topicName === 'Computer Networks');
    expect(cnTopic).toBeDefined();
    expect(cnTopic?.failureCount).toBe(1);
    expect(cnTopic?.masteryLevel).toBe('proficient');

    // Critical topic should rank first
    expect(weakTopics[0].topicName).toBe('Dynamic Programming');
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
        reason: 'Frequent mistakes in Deadlocks and Paging',
        actionUrl: '/core-cs',
      },
    ];

    const recs = generateDailyRecommendations(dueRevisions, weakTopics, DEFAULT_STARTER_MISTAKES);

    expect(recs.length).toBeGreaterThanOrEqual(2);
    // First should be the due revision
    expect(recs[0].type).toBe('spaced_revision');
    expect(recs[0].badge).toBe('Due Today');
    expect(recs[0].url).toBe('/dsa/lru-cache');

    // Second should be the critical weak topic
    expect(recs[1].type).toBe('weak_topic_boost');
    expect(recs[1].badge).toBe('Critical Concept');
    expect(recs[1].module).toBe('core-cs');
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
      body: JSON.stringify({ resourceId: 'two-sum' }), // missing title and takeaway
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
