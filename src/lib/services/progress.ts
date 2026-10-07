import { createClient } from '@/lib/supabase/client';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';
import { DSA_PROBLEMS } from '@/lib/data/dsa';

export interface RecordAttemptParams {
  userId?: string | null;
  sectionSlug: string;
  topicId: string;
  topicTitle: string;
  score: number;
  total: number;
}

export interface StoredAttempt {
  id: string;
  topicId: string;
  topicTitle: string;
  sectionSlug: string;
  score: number;
  total: number;
  percentage: number;
  attemptedAt: string;
}

const LOCAL_STORAGE_KEY_ATTEMPTS = 'stackup_local_quiz_attempts';
const LOCAL_STORAGE_KEY_PROGRESS = 'stackup_local_progress';

export const SECTION_TOTAL_ITEMS: Record<string, number> = {
  aptitude: CURRICULUM_DATA.aptitude?.categories.reduce((acc, c) => acc + c.topics.length, 0) || 10,
  'core-cs': CURRICULUM_DATA['core-cs']?.categories.reduce((acc, c) => acc + c.topics.length, 0) || 16,
  dsa: DSA_PROBLEMS.length,
};

export async function recordQuizAttempt(params: RecordAttemptParams): Promise<StoredAttempt> {
  const percentage = Math.round((params.score / params.total) * 100);
  const attemptedAt = new Date().toISOString();
  const attemptId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `att-${Date.now()}`;

  const newAttempt: StoredAttempt = {
    id: attemptId,
    topicId: params.topicId,
    topicTitle: params.topicTitle,
    sectionSlug: params.sectionSlug,
    score: params.score,
    total: params.total,
    percentage,
    attemptedAt,
  };

  // 1. Always update local storage for instant responsiveness
  try {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
      const parsed: StoredAttempt[] = existing ? JSON.parse(existing) : [];
      parsed.push(newAttempt);
      localStorage.setItem(LOCAL_STORAGE_KEY_ATTEMPTS, JSON.stringify(parsed));

      // Update section completion progress in local storage based on unique topics completed
      const progressRaw = localStorage.getItem(LOCAL_STORAGE_KEY_PROGRESS);
      const progressMap: Record<string, number> = progressRaw ? JSON.parse(progressRaw) : {};
      const sectionAttempts = parsed.filter((a) => a.sectionSlug === params.sectionSlug);
      const uniqueTopicIds = new Set(sectionAttempts.map((a) => a.topicId));
      const totalTopics = SECTION_TOTAL_ITEMS[params.sectionSlug] || 10;
      progressMap[params.sectionSlug] = Math.min(100, Math.round((uniqueTopicIds.size / totalTopics) * 100));
      localStorage.setItem(LOCAL_STORAGE_KEY_PROGRESS, JSON.stringify(progressMap));
    }
  } catch (err) {
    console.warn('Could not write attempt to localStorage:', err);
  }

  // 2. If Supabase is connected with authenticated user, sync to Supabase
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Check if topic exists in supabase topics table or write directly if UUID
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.topicId);
      if (isUUID) {
        await (supabase.from('quiz_attempts') as unknown as {
          insert: (data: {
            user_id: string;
            topic_id: string;
            score: number;
            total: number;
          }) => Promise<unknown>;
        }).insert({
          user_id: user.id,
          topic_id: params.topicId,
          score: params.score,
          total: params.total,
        });
      }
    }
  } catch (err) {
    // Graceful fallback: local attempt is already preserved
    console.debug('Supabase sync skipped or failed gracefully:', err);
  }

  return newAttempt;
}

export function getLocalQuizAttempts(): StoredAttempt[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getLocalSectionProgress(sectionSlug: string, defaultPercent = 0): number {
  if (typeof window === 'undefined') return defaultPercent;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PROGRESS);
    if (!raw) return defaultPercent;
    const parsed = JSON.parse(raw);
    return parsed[sectionSlug] ?? defaultPercent;
  } catch {
    return defaultPercent;
  }
}

export function setLocalSectionProgress(sectionSlug: string, percent: number): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PROGRESS);
    const map = raw ? JSON.parse(raw) : {};
    map[sectionSlug] = Math.min(100, Math.max(0, percent));
    localStorage.setItem(LOCAL_STORAGE_KEY_PROGRESS, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export interface SectionMetrics {
  percent: number;
  completed: number;
  total: number;
}

export function getReadTopicIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('stackup_read_topics');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleTopicReadStatus(topicId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getReadTopicIds();
    let updated: string[];
    let isNowRead: boolean;
    if (current.includes(topicId)) {
      updated = current.filter((id) => id !== topicId);
      isNowRead = false;
    } else {
      updated = [...current, topicId];
      isNowRead = true;
    }
    localStorage.setItem('stackup_read_topics', JSON.stringify(updated));
    return isNowRead;
  } catch {
    return false;
  }
}

export function getSectionMetrics(sectionSlug: string): SectionMetrics {
  const total = SECTION_TOTAL_ITEMS[sectionSlug] || 10;
  if (typeof window === 'undefined') {
    return { percent: 0, completed: 0, total };
  }

  if (sectionSlug === 'dsa') {
    try {
      const stored = localStorage.getItem('stackup_solved_dsa');
      const solvedIds: string[] = stored ? JSON.parse(stored) : [];
      const completed = solvedIds.length;
      const percent = Math.min(100, Math.round((completed / total) * 100));
      return { percent, completed, total };
    } catch {
      return { percent: 0, completed: 0, total };
    }
  }

  try {
    const attempts = getLocalQuizAttempts();
    const sectionAttempts = attempts.filter((a) => a.sectionSlug === sectionSlug);
    const readTopicIds = getReadTopicIds();
    
    // Total unique completed topics (either attempted quiz or marked as read)
    const uniqueTopics = new Set([
      ...sectionAttempts.map((a) => a.topicId),
      ...readTopicIds
    ]);
    const completed = uniqueTopics.size;
    const percent = Math.min(100, Math.round((completed / total) * 100));
    return { percent, completed, total };
  } catch {
    return { percent: 0, completed: 0, total };
  }
}


