import { createClient } from '@/lib/supabase/client';

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

      // Update section completion progress in local storage
      const progressRaw = localStorage.getItem(LOCAL_STORAGE_KEY_PROGRESS);
      const progressMap: Record<string, number> = progressRaw ? JSON.parse(progressRaw) : {};
      const current = progressMap[params.sectionSlug] || 0;
      // Increment progress by 15% per unique topic quiz completed up to 100%
      progressMap[params.sectionSlug] = Math.min(100, current + 20);
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

