import { DSA_PROBLEMS, type DsaProblem } from '@/lib/data/dsa';
import type { TestCaseItem } from './types';

// Server-side curated judging suites with comprehensive hidden test vectors
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
  'dsa-11': [ // Minimum Window Substring
    { input: 's = "a", t = "a"', output: '"a"' },
    { input: 's = "a", t = "aa"', output: '""' },
  ],
  'dsa-12': [ // Search in Rotated Sorted Array
    { input: 'nums = [1], target = 0', output: '-1' },
    { input: 'nums = [1], target = 1', output: '0' },
    { input: 'nums = [5,1,3], target = 5', output: '0' },
  ],
  'dsa-13': [ // Find Minimum in Rotated Sorted Array
    { input: 'nums = [1]', output: '1' },
    { input: 'nums = [2,1]', output: '1' },
    { input: 'nums = [3,1,2]', output: '1' },
  ],
  'dsa-14': [ // Median of Two Sorted Arrays
    { input: 'nums1 = [], nums2 = [1]', output: '1.0' },
    { input: 'nums1 = [2], nums2 = []', output: '2.0' },
  ],
  'dsa-15': [ // Reverse Linked List
    { input: 'head = []', output: '[]' },
    { input: 'head = [1]', output: '[1]' },
  ],
  'dsa-16': [ // Merge Two Sorted Lists
    { input: 'list1 = [], list2 = []', output: '[]' },
    { input: 'list1 = [], list2 = [0]', output: '[0]' },
  ],
  'dsa-17': [ // LRU Cache
    { input: 'capacity = 1', output: 'null' },
  ],
  'dsa-18': [ // Maximum Depth of Binary Tree
    { input: 'root = []', output: '0' },
    { input: 'root = [0]', output: '1' },
  ],
  'dsa-19': [ // Validate Binary Search Tree
    { input: 'root = [2,2,2]', output: 'false' },
    { input: 'root = [2147483647]', output: 'true' },
  ],
  'dsa-20': [ // Lowest Common Ancestor of a BST
    { input: 'root = [2,1], p = 2, q = 1', output: '2' },
  ],
  'dsa-21': [ // Number of Islands
    { input: 'grid = [["1"]]', output: '1' },
    { input: 'grid = [["0"]]', output: '0' },
  ],
  'dsa-22': [ // Course Schedule
    { input: 'numCourses = 1, prerequisites = []', output: 'true' },
    { input: 'numCourses = 3, prerequisites = [[0,1],[1,2],[2,0]]', output: 'false' },
  ],
  'dsa-23': [ // Rotting Oranges
    { input: 'grid = [[0]]', output: '0' },
    { input: 'grid = [[1]]', output: '-1' },
  ],
  'dsa-24': [ // Climbing Stairs
    { input: 'n = 1', output: '1' },
    { input: 'n = 4', output: '5' },
    { input: 'n = 5', output: '8' },
  ],
  'dsa-25': [ // Coin Change
    { input: 'coins = [1], amount = 0', output: '0' },
    { input: 'coins = [1], amount = 1', output: '1' },
    { input: 'coins = [1], amount = 2', output: '2' },
  ],
};

export function getProblemById(id: string): DsaProblem | undefined {
  const clean = id.trim().toLowerCase();
  return DSA_PROBLEMS.find((p) => p.id.toLowerCase() === clean);
}

export function hasOfficialJudgingSuite(problemId: string): boolean {
  const problem = getProblemById(problemId);
  if (!problem) return false;
  return Boolean(CURATED_JUDGING_SUITES[problem.id] && CURATED_JUDGING_SUITES[problem.id].length > 0);
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
    name: `Official Test ${sampleCases.length + idx + 1}`,
    input: c.input,
    expectedOutput: c.output,
    isCustom: false,
    isHidden: true,
  }));

  // If problem has curated hidden tests, return sample + hidden cases
  return [...sampleCases, ...hiddenCases];
}
