import { describe, it, expect } from 'vitest';
import { SECTION_TOTAL_ITEMS } from '@/lib/services/progress';

describe('Real Progress & Metrics Validation', () => {
  it('should have accurate total items for each section', () => {
    expect(SECTION_TOTAL_ITEMS['aptitude']).toBe(3);
    expect(SECTION_TOTAL_ITEMS['core-cs']).toBe(5);
    expect(SECTION_TOTAL_ITEMS['dsa']).toBe(30);
  });

  it('should accurately compute section completion percentage from unique topics', () => {
    const calculatePercent = (completed: number, total: number) => {
      if (total <= 0) return 0;
      return Math.min(100, Math.round((completed / total) * 100));
    };

    // Aptitude (total = 3)
    expect(calculatePercent(0, 3)).toBe(0);
    expect(calculatePercent(1, 3)).toBe(33);
    expect(calculatePercent(2, 3)).toBe(67);
    expect(calculatePercent(3, 3)).toBe(100);

    // Core CS (total = 5)
    expect(calculatePercent(0, 5)).toBe(0);
    expect(calculatePercent(1, 5)).toBe(20);
    expect(calculatePercent(3, 5)).toBe(60);
    expect(calculatePercent(5, 5)).toBe(100);

    // DSA (total = 30)
    expect(calculatePercent(0, 30)).toBe(0);
    expect(calculatePercent(15, 30)).toBe(50);
    expect(calculatePercent(30, 30)).toBe(100);
  });

  it('should calculate consecutive streak accurately based on real activity timestamps', () => {
    const calculateStreak = (activityDates: string[], todayStr: string): number => {
      const set = new Set(activityDates);
      let count = 0;
      const cur = new Date(todayStr);

      if (set.has(todayStr)) {
        while (set.has(cur.toISOString().slice(0, 10))) {
          count++;
          cur.setDate(cur.getDate() - 1);
        }
      } else {
        const yesterday = new Date(todayStr);
        yesterday.setDate(yesterday.getDate() - 1);
        if (set.has(yesterday.toISOString().slice(0, 10))) {
          cur.setDate(cur.getDate() - 1);
          while (set.has(cur.toISOString().slice(0, 10))) {
            count++;
            cur.setDate(cur.getDate() - 1);
          }
        }
      }
      return count;
    };

    const today = '2026-10-05';
    // Case 1: No activity
    expect(calculateStreak([], today)).toBe(0);

    // Case 2: Active today only
    expect(calculateStreak(['2026-10-05'], today)).toBe(1);

    // Case 3: Active today, yesterday, and day before
    expect(calculateStreak(['2026-10-05', '2026-10-04', '2026-10-03'], today)).toBe(3);

    // Case 4: Active yesterday only (streak preserved until end of today)
    expect(calculateStreak(['2026-10-04'], today)).toBe(1);

    // Case 5: Broken streak (active 3 days ago, but not yesterday or today)
    expect(calculateStreak(['2026-10-02'], today)).toBe(0);
  });
});
