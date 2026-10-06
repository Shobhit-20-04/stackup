import { describe, it, expect } from 'vitest';
import { DSA_PROBLEMS, DSA_CATEGORIES } from '../src/lib/data/dsa';

describe('DSA Hub Dataset', () => {
  it('contains at least 150 high-frequency problems (NeetCode 150 standard)', () => {
    expect(DSA_PROBLEMS.length).toBeGreaterThanOrEqual(150);
  });

  it('validates each problem has valid difficulty, links, and pattern tag', () => {
    const validDifficulties = ['Easy', 'Medium', 'Hard'];

    for (const problem of DSA_PROBLEMS) {
      expect(validDifficulties).toContain(problem.difficulty);
      expect(problem.id).toMatch(/^dsa-/);
      expect(problem.title.length).toBeGreaterThan(0);
      expect(problem.leetcode_url).toMatch(/^https:\/\/leetcode\.com/);
      expect(problem.striver_url).toMatch(/^https:\/\/takeuforward\.org/);
      expect(problem.youtube_url).toMatch(/^https:\/\/www\.youtube\.com/);
      expect(problem.companies.length).toBeGreaterThan(0);
      expect(DSA_CATEGORIES).toContain(problem.pattern_tag);
    }
  });

  it('covers major interview patterns', () => {
    const patterns = new Set(DSA_PROBLEMS.map((p) => p.pattern_tag));
    expect(patterns.has('Arrays & Hashing')).toBe(true);
    expect(patterns.has('Two Pointers')).toBe(true);
    expect(patterns.has('Sliding Window')).toBe(true);
    expect(patterns.has('Binary Search')).toBe(true);
    expect(patterns.has('Trees & BST')).toBe(true);
    expect(patterns.has('Graphs')).toBe(true);
    expect(patterns.has('Dynamic Programming')).toBe(true);
  });
});
