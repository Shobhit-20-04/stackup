import { describe, it, expect } from 'vitest';
import { 
  DSA_PROBLEMS, 
  DSA_CATEGORIES, 
  TOP_DSA_COMPANIES, 
  getTopCompanies, 
  getProblemOfTheDay,
  type DsaProblem 
} from '../src/lib/data/dsa';
import {
  saveCustomDsaProblem,
  getCustomDsaProblems,
  deleteCustomDsaProblem,
} from '../src/lib/services/dsa/leetcode-sync';

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
      if (problem.striver_url !== null) {
        expect(problem.striver_url).toMatch(/^https:\/\/takeuforward\.org/);
      }
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

  it('validates each problem has descriptions, examples, constraints, complexities, and code solutions', () => {
    for (const problem of DSA_PROBLEMS) {
      expect(problem.description.trim().length).toBeGreaterThan(10);
      expect(problem.examples.length).toBeGreaterThanOrEqual(1);
      for (const ex of problem.examples) {
        expect(ex.input).toBeDefined();
        expect(ex.output).toBeDefined();
      }
      expect(problem.constraints.length).toBeGreaterThanOrEqual(1);
      expect(problem.approach.trim().length).toBeGreaterThan(10);
      expect(problem.timeComplexity.trim().length).toBeGreaterThan(1);
      expect(problem.spaceComplexity.trim().length).toBeGreaterThan(1);
      expect(problem.solutions).toBeDefined();
      expect(problem.solutions.python.trim().length).toBeGreaterThan(10);
      expect(problem.solutions.cpp.trim().length).toBeGreaterThan(10);
      expect(problem.solutions.java.trim().length).toBeGreaterThan(10);
      expect(problem.solutions.typescript.trim().length).toBeGreaterThan(10);
    }
  });

  it('provides top company distribution and curated company lists', () => {
    expect(TOP_DSA_COMPANIES).toContain('Amazon');
    expect(TOP_DSA_COMPANIES).toContain('Google');
    expect(TOP_DSA_COMPANIES).toContain('Microsoft');

    const topCompanies = getTopCompanies();
    expect(topCompanies.length).toBeGreaterThan(5);
    expect(topCompanies[0].name).toBe('Amazon');
    expect(topCompanies[0].count).toBeGreaterThanOrEqual(140);
  });

  it('calculates deterministic Problem of the Day (POTD)', () => {
    const fixedDate = new Date('2026-11-13T12:00:00Z');
    const potd1 = getProblemOfTheDay(fixedDate);
    const potd2 = getProblemOfTheDay(fixedDate);

    expect(potd1).toBeDefined();
    expect(potd1.id).toBe(potd2.id);
    expect(potd1.title).toBe(potd2.title);
    expect(potd1.difficulty).toMatch(/^(Easy|Medium|Hard)$/);
  });

  describe('Custom Daily Problem Persistence & Resiliency', () => {
    const mockProblem: DsaProblem = {
      id: 'custom-min-pos-sub',
      title: 'Minimum Positive Sum Subarray',
      difficulty: 'Easy',
      pattern_tag: 'Sliding Window',
      leetcode_url: 'https://leetcode.com/problems/minimum-positive-sum-subarray/',
      striver_url: null,
      youtube_url: 'https://www.youtube.com',
      companies: ['Amazon', 'Google'],
      summary: 'Find the minimum positive sum of a subarray of size between l and r.',
      description: 'Given an array of integers nums and two positive integers l and r...',
      examples: [{ input: 'nums = [3, -2, 1, 4], l = 2, r = 3', output: '1' }],
      constraints: ['1 <= nums.length <= 100'],
      approach: 'Use sliding window to compute prefix sums.',
      timeComplexity: 'O(N * (r - l + 1))',
      spaceComplexity: 'O(1)',
      solutions: {
        python: 'class Solution: pass',
        cpp: 'class Solution {};',
        java: 'class Solution {}',
        typescript: 'function minPositiveSumSubarray() {}',
      },
    };

    it('saves and retrieves a custom published problem safely without throwing ENOENT', () => {
      const scheduledDate = '2026-11-14';
      const saved = saveCustomDsaProblem(mockProblem, scheduledDate);

      expect(saved).toBeDefined();
      expect(saved.id).toBe('custom-min-pos-sub');
      expect(saved.scheduledForDate).toBe(scheduledDate);
      expect(saved.title).toBe('Minimum Positive Sum Subarray');

      const allCustom = getCustomDsaProblems();
      expect(allCustom.length).toBeGreaterThanOrEqual(1);

      const found = allCustom.find((p) => p.id === 'custom-min-pos-sub');
      expect(found).toBeDefined();
      expect(found?.scheduledForDate).toBe(scheduledDate);
    });

    it('deletes a custom published problem cleanly', () => {
      const deleted = deleteCustomDsaProblem('custom-min-pos-sub');
      expect(deleted).toBe(true);

      const allCustom = getCustomDsaProblems();
      const found = allCustom.find((p) => p.id === 'custom-min-pos-sub');
      expect(found).toBeUndefined();
    });
  });
});


