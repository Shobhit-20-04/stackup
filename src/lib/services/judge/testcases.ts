import { DSA_PROBLEMS, type DsaProblem } from '@/lib/data/dsa';
import type { TestCaseItem } from './types';

// Server-side curated judging suites for canonical patterns
const CURATED_JUDGING_SUITES: Record<string, Array<{ input: string; output: string }>> = {
  'dsa-1': [ // Two Sum
    { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    { input: 'nums = [-1,-2,-3,-4,-5], target = -8', output: '[2,4]' },
    { input: 'nums = [0,4,3,0], target = 0', output: '[0,3]' },
  ],
  'dsa-2': [ // Best Time to Buy and Sell Stock
    { input: 'prices = [2,4,1]', output: '2' },
    { input: 'prices = [1,2]', output: '1' },
    { input: 'prices = [3,2,6,5,0,3]', output: '4' },
  ],
  'dsa-3': [ // Product of Array Except Self
    { input: 'nums = [0,0]', output: '[0,0]' },
    { input: 'nums = [1,0]', output: '[0,1]' },
    { input: 'nums = [2,3,5,0]', output: '[0,0,0,30]' },
  ],
  'dsa-4': [ // Longest Consecutive Sequence
    { input: 'nums = []', output: '0' },
    { input: 'nums = [1]', output: '1' },
    { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
  ],
  'dsa-5': [ // Valid Palindrome
    { input: 's = " "', output: 'true' },
    { input: 's = "race a car"', output: 'false' },
    { input: 's = "0P"', output: 'false' },
  ],
  'dsa-6': [ // 3Sum
    { input: 'nums = [0,1,1]', output: '[]' },
    { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
  ],
  'dsa-7': [ // Container With Most Water
    { input: 'height = [1,1]', output: '1' },
    { input: 'height = [4,3,2,1,4]', output: '16' },
  ],
  'dsa-8': [ // Trapping Rain Water
    { input: 'height = [4,2,0,3,2,5]', output: '9' },
    { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
  ],
  'dsa-9': [ // Longest Substring Without Repeating Characters
    { input: 's = "bbbbb"', output: '1' },
    { input: 's = "pwwkew"', output: '3' },
    { input: 's = ""', output: '0' },
  ],
  'dsa-10': [ // Longest Repeating Character Replacement
    { input: 's = "ABAB", k = 2', output: '4' },
    { input: 's = "AABABBA", k = 1', output: '4' },
  ],
};

export function getProblemById(id: string): DsaProblem | undefined {
  const clean = id.trim().toLowerCase();
  return DSA_PROBLEMS.find((p) => p.id.toLowerCase() === clean);
}

export function getSampleTestCases(problemId: string): TestCaseItem[] {
  const problem = getProblemById(problemId);
  if (!problem) return [];

  return (problem.examples || []).map((ex, idx) => ({
    id: `sample-${idx + 1}`,
    name: `Sample Case ${idx + 1}`,
    input: ex.input,
    expectedOutput: ex.output,
    isCustom: false,
    isHidden: false,
  }));
}

export function getJudgingTestCases(problemId: string): TestCaseItem[] {
  const problem = getProblemById(problemId);
  if (!problem) return [];

  const sampleCases = getSampleTestCases(problemId);

  // Hidden official test cases
  const curated = CURATED_JUDGING_SUITES[problem.id] || [];
  const hiddenCases: TestCaseItem[] = curated.map((c, idx) => ({
    id: `judge-${idx + 1}`,
    name: `Test Case ${sampleCases.length + idx + 1}`,
    input: c.input,
    expectedOutput: c.output,
    isCustom: false,
    isHidden: true,
  }));

  // If no specific curated hidden tests, ensure at least all sample cases are judged
  return [...sampleCases, ...hiddenCases];
}
