export interface DsaExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface DsaSolutions {
  python: string;
  cpp: string;
  java: string;
  typescript: string;
}

export interface DsaProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern_tag: string;
  leetcode_url: string;
  striver_url: string;
  youtube_url: string;
  companies: string[];
  summary: string;
  description: string;
  examples: DsaExample[];
  constraints: string[];
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutions: DsaSolutions;
}

export const DSA_CATEGORIES = [
  'All',
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Linked List',
  'Trees & BST',
  'Graphs',
  'Dynamic Programming',
  'Stack & Queue',
  'Heap / Priority Queue',
] as const;

export const DSA_PROBLEMS: DsaProblem[] = [
  {
    "id": "dsa-1",
    "title": "Two Sum",
    "difficulty": "Easy",
    "pattern_tag": "Arrays & Hashing",
    "leetcode_url": "https://leetcode.com/problems/two-sum/",
    "striver_url": "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/",
    "youtube_url": "https://www.youtube.com/watch?v=UXDSeD9mN-k",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple",
      "Meta"
    ],
    "summary": "Find two indices in an array that sum to target using a HashMap for O(n) time and O(n) space.",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "output": "[1,2]",
        "explanation": "nums[1] + nums[2] == 2 + 4 == 6."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    "approach": "Use a hash map to record elements seen so far alongside their indices. For each element num at index i, calculate complement = target - num. If complement exists in map, return [map[complement], i]. Otherwise, store num -> i in the map.",
    "timeComplexity": "O(n) - Single pass through the array",
    "spaceComplexity": "O(n) - Hash map storing up to n elements",
    "solutions": {
      "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in seen:\n                return [seen[complement], i]\n            seen[num] = i\n        return []",
      "cpp": "#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); ++i) {\n            int complement = target - nums[i];\n            if (seen.find(complement) != seen.end()) {\n                return {seen[complement], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
      "java": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (seen.containsKey(complement)) {\n                return new int[] { seen.get(complement), i };\n            }\n            seen.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}",
      "typescript": "function twoSum(nums: number[], target: number): number[] {\n  const seen = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) {\n      return [seen.get(complement)!, i];\n    }\n    seen.set(nums[i], i);\n  }\n  return [];\n}"
    }
  },
  {
    "id": "dsa-2",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "pattern_tag": "Arrays & Hashing",
    "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "striver_url": "https://takeuforward.org/data-structure/stock-buy-and-sell/",
    "youtube_url": "https://www.youtube.com/watch?v=excAOvwF_Wk",
    "companies": [
      "Amazon",
      "Microsoft",
      "Goldman Sachs",
      "Google"
    ],
    "summary": "Track minimum buying price seen so far and calculate max potential profit in a single pass O(n).",
    "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      },
      {
        "input": "prices = [7,6,4,3,1]",
        "output": "0",
        "explanation": "In this case, no transactions are done and the max profit = 0."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    "approach": "Maintain minPrice initialized to infinity and maxProfit initialized to 0. For each day price, update minPrice = min(minPrice, price) and maxProfit = max(maxProfit, price - minPrice).",
    "timeComplexity": "O(n) - Single linear scan of prices",
    "spaceComplexity": "O(1) - Constant auxiliary storage",
    "solutions": {
      "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_price = float('inf')\n        max_profit = 0\n        for price in prices:\n            if price < min_price:\n                min_price = price\n            elif price - min_price > max_profit:\n                max_profit = price - min_price\n        return max_profit",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minPrice = 1e9;\n        int maxProfit = 0;\n        for (int p : prices) {\n            minPrice = min(minPrice, p);\n            maxProfit = max(maxProfit, p - minPrice);\n        }\n        return maxProfit;\n    }\n};",
      "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n        for (int p : prices) {\n            if (p < minPrice) minPrice = p;\n            else if (p - minPrice > maxProfit) maxProfit = p - minPrice;\n        }\n        return maxProfit;\n    }\n}",
      "typescript": "function maxProfit(prices: number[]): number {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (const price of prices) {\n    if (price < minPrice) minPrice = price;\n    else if (price - minPrice > maxProfit) maxProfit = price - minPrice;\n  }\n  return maxProfit;\n}"
    }
  },
  {
    "id": "dsa-3",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "pattern_tag": "Arrays & Hashing",
    "leetcode_url": "https://leetcode.com/problems/product-of-array-except-self/",
    "striver_url": "https://takeuforward.org/arrays/product-of-array-except-self/",
    "youtube_url": "https://www.youtube.com/watch?v=bNvIQI2wAjk",
    "companies": [
      "Amazon",
      "Apple",
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "summary": "Compute prefix and postfix products without using division in O(n) time and O(1) auxiliary space.",
    "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[24,12,8,6]"
      },
      {
        "input": "nums = [-1,1,0,-3,3]",
        "output": "[0,0,9,0,0]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30"
    ],
    "approach": "Construct the output array by making two passes: first pass populates prefix products into answer[i]. Second pass traverses backwards with a running suffix product accumulator multiplied into answer[i].",
    "timeComplexity": "O(n) - Two sequential scans",
    "spaceComplexity": "O(1) - Auxiliary space excluding output array",
    "solutions": {
      "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        n = len(nums)\n        res = [1] * n\n        prefix = 1\n        for i in range(n):\n            res[i] = prefix\n            prefix *= nums[i]\n        postfix = 1\n        for i in range(n - 1, -1, -1):\n            res[i] *= postfix\n            postfix *= nums[i]\n        return res",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n, 1);\n        int prefix = 1;\n        for (int i = 0; i < n; ++i) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int postfix = 1;\n        for (int i = n - 1; i >= 0; --i) {\n            res[i] *= postfix;\n            postfix *= nums[i];\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int prefix = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int postfix = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= postfix;\n            postfix *= nums[i];\n        }\n        return res;\n    }\n}",
      "typescript": "function productExceptSelf(nums: number[]): number[] {\n  const n = nums.length;\n  const res = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    res[i] = prefix;\n    prefix *= nums[i];\n  }\n  let postfix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    res[i] *= postfix;\n    postfix *= nums[i];\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-4",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "pattern_tag": "Arrays & Hashing",
    "leetcode_url": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "striver_url": "https://takeuforward.org/data-structure/longest-consecutive-sequence-in-an-array/",
    "youtube_url": "https://www.youtube.com/watch?v=oO5uLE7EUlM",
    "companies": [
      "Google",
      "Amazon",
      "Spotify",
      "Salesforce"
    ],
    "summary": "Use a HashSet and iterate only from numbers that are starts of streaks (num - 1 not in set) for O(n).",
    "description": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
    "examples": [
      {
        "input": "nums = [100,4,200,1,3,2]",
        "output": "4",
        "explanation": "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4."
      },
      {
        "input": "nums = [0,3,7,2,5,8,4,6,0,1]",
        "output": "9"
      }
    ],
    "constraints": [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "approach": "Store all numbers into a hash set. For each number x, check if (x - 1) is in set. If not, x is the start of a consecutive sequence! Count upwards (x + 1, x + 2, ...) until no longer found, updating max streak.",
    "timeComplexity": "O(n) - Each element is visited at most twice",
    "spaceComplexity": "O(n) - Hash set storing all unique values",
    "solutions": {
      "python": "class Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        num_set = set(nums)\n        longest = 0\n        for n in num_set:\n            if (n - 1) not in num_set:\n                length = 1\n                while (n + length) in num_set:\n                    length += 1\n                longest = max(longest, length)\n        return longest",
      "cpp": "#include <vector>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        unordered_set<int> numSet(nums.begin(), nums.end());\n        int longest = 0;\n        for (int n : numSet) {\n            if (!numSet.count(n - 1)) {\n                int length = 1;\n                while (numSet.count(n + length)) {\n                    length++;\n                }\n                longest = max(longest, length);\n            }\n        }\n        return longest;\n    }\n};",
      "java": "import java.util.HashSet;\nimport java.util.Set;\n\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) set.add(n);\n        int longest = 0;\n        for (int n : set) {\n            if (!set.contains(n - 1)) {\n                int length = 1;\n                while (set.contains(n + length)) {\n                    length++;\n                }\n                longest = Math.max(longest, length);\n            }\n        }\n        return longest;\n    }\n}",
      "typescript": "function longestConsecutive(nums: number[]): number {\n  const set = new Set(nums);\n  let longest = 0;\n  for (const n of set) {\n    if (!set.has(n - 1)) {\n      let length = 1;\n      while (set.has(n + length)) {\n        length++;\n      }\n      longest = Math.max(longest, length);\n    }\n  }\n  return longest;\n}"
    }
  },
  {
    "id": "dsa-5",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "pattern_tag": "Two Pointers",
    "leetcode_url": "https://leetcode.com/problems/valid-palindrome/",
    "striver_url": "https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/",
    "youtube_url": "https://www.youtube.com/watch?v=jJXJ16kPFWg",
    "companies": [
      "Meta",
      "Microsoft",
      "Adobe"
    ],
    "summary": "Traverse inwards from left and right pointers skipping non-alphanumeric characters with O(1) space.",
    "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
    "examples": [
      {
        "input": "s = \"A man, a plan, a canal: Panama\"",
        "output": "true",
        "explanation": "\"amanaplanacanalpanama\" is a palindrome."
      },
      {
        "input": "s = \"race a car\"",
        "output": "false",
        "explanation": "\"raceacar\" is not a palindrome."
      }
    ],
    "constraints": [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    "approach": "Two pointers at left = 0 and right = s.length - 1. Advance left if not alphanumeric, decrement right if not alphanumeric. When both point to alphanumeric chars, compare lowercase values; if mismatch return false.",
    "timeComplexity": "O(n) - Single inward pass",
    "spaceComplexity": "O(1) - Constant in-place pointers",
    "solutions": {
      "python": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        l, r = 0, len(s) - 1\n        while l < r:\n            while l < r and not s[l].isalnum():\n                l += 1\n            while l < r and not s[r].isalnum():\n                r -= 1\n            if s[l].lower() != s[r].lower():\n                return False\n            l += 1\n            r -= 1\n        return True",
      "cpp": "#include <string>\n#include <cctype>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) {\n            while (l < r && !isalnum(s[l])) l++;\n            while (l < r && !isalnum(s[r])) r--;\n            if (tolower(s[l]) != tolower(s[r])) return false;\n            l++; r--;\n        }\n        return true;\n    }\n};",
      "java": "class Solution {\n    public boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {\n                return false;\n            }\n            l++; r--;\n        }\n        return true;\n    }\n}",
      "typescript": "function isPalindrome(s: string): boolean {\n  let l = 0, r = s.length - 1;\n  const isAlphaNum = (ch: string) => /[a-zA-Z0-9]/.test(ch);\n  while (l < r) {\n    while (l < r && !isAlphaNum(s[l])) l++;\n    while (l < r && !isAlphaNum(s[r])) r--;\n    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;\n    l++; r--;\n  }\n  return true;\n}"
    }
  },
  {
    "id": "dsa-6",
    "title": "3Sum",
    "difficulty": "Medium",
    "pattern_tag": "Two Pointers",
    "leetcode_url": "https://leetcode.com/problems/3sum/",
    "striver_url": "https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero/",
    "youtube_url": "https://www.youtube.com/watch?v=jzZsG8n2R9A",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Apple"
    ],
    "summary": "Sort the array, fix the first element, and use two pointers to find pairs summing to -nums[i] while deduplicating.",
    "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    "examples": [
      {
        "input": "nums = [-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. Distinct triplets only."
      },
      {
        "input": "nums = [0,1,1]",
        "output": "[]"
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "approach": "Sort nums in ascending order. Loop i from 0 to n-1 (skip duplicates for nums[i]). Use two pointers l = i + 1, r = n - 1. If sum < 0 increment l; if sum > 0 decrement r; if sum == 0 record triplet and skip duplicate l & r values.",
    "timeComplexity": "O(n^2) - Sorting takes O(n log n) and nested scan takes O(n^2)",
    "spaceComplexity": "O(1) - Auxiliary space excluding output",
    "solutions": {
      "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res = []\n        for i in range(len(nums)):\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            l, r = i + 1, len(nums) - 1\n            while l < r:\n                s = nums[i] + nums[l] + nums[r]\n                if s < 0:\n                    l += 1\n                elif s > 0:\n                    r -= 1\n                else:\n                    res.append([nums[i], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]:\n                        l += 1\n                    while l < r and nums[r] == nums[r - 1]:\n                        r -= 1\n                    l += 1\n                    r -= 1\n        return res",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        for (int i = 0; i < nums.size(); ++i) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.size() - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum < 0) l++;\n                else if (sum > 0) r--;\n                else {\n                    res.push_back({nums[i], nums[l], nums[r]});\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                }\n            }\n        }\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum < 0) l++;\n                else if (sum > 0) r--;\n                else {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                }\n            }\n        }\n        return res;\n    }\n}",
      "typescript": "function threeSum(nums: number[]): number[][] {\n  nums.sort((a, b) => a - b);\n  const res: number[][] = [];\n  for (let i = 0; i < nums.length; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum < 0) l++;\n      else if (sum > 0) r--;\n      else {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      }\n    }\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-7",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "pattern_tag": "Two Pointers",
    "leetcode_url": "https://leetcode.com/problems/container-with-most-water/",
    "striver_url": "https://takeuforward.org/arrays/container-with-most-water/",
    "youtube_url": "https://www.youtube.com/watch?v=UuiTKBwPgAo",
    "companies": [
      "Google",
      "Amazon",
      "Adobe",
      "Bloomberg"
    ],
    "summary": "Two pointers at ends, calculate area, and move the pointer with the smaller height inwards greedily.",
    "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "Vertical lines at index 1 and 8 hold min(8, 7) * (8 - 1) = 7 * 7 = 49 units."
      }
    ],
    "constraints": [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    "approach": "Initialize two pointers at left = 0 and right = n - 1. Calculate water area as min(height[l], height[r]) * (r - l). Since the width shrinks, our only chance to find a larger area is to move the shorter wall inward.",
    "timeComplexity": "O(n) - Inward pointer convergence",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_water = 0\n        while l < r:\n            w = r - l\n            h = min(height[l], height[r])\n            max_water = max(max_water, w * h)\n            if height[l] < height[r]:\n                l += 1\n            else:\n                r -= 1\n        return max_water",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1;\n        int maxWater = 0;\n        while (l < r) {\n            int h = min(height[l], height[r]);\n            maxWater = max(maxWater, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxWater;\n    }\n};",
      "java": "class Solution {\n    public int maxArea(int[] height) {\n        int l = 0, r = height.length - 1;\n        int maxWater = 0;\n        while (l < r) {\n            int h = Math.min(height[l], height[r]);\n            maxWater = Math.max(maxWater, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxWater;\n    }\n}",
      "typescript": "function maxArea(height: number[]): number {\n  let l = 0, r = height.length - 1;\n  let maxWater = 0;\n  while (l < r) {\n    const h = Math.min(height[l], height[r]);\n    maxWater = Math.max(maxWater, h * (r - l));\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return maxWater;\n}"
    }
  },
  {
    "id": "dsa-8",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "pattern_tag": "Two Pointers",
    "leetcode_url": "https://leetcode.com/problems/trapping-rain-water/",
    "striver_url": "https://takeuforward.org/data-structure/trapping-rainwater/",
    "youtube_url": "https://www.youtube.com/watch?v=m18Hntz4EB8",
    "companies": [
      "Google",
      "Goldman Sachs",
      "Amazon",
      "Microsoft"
    ],
    "summary": "Two pointers with leftMax and rightMax to compute trapped water at each step without auxiliary arrays.",
    "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6",
        "explanation": "The elevation map traps 6 units of rain water."
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "approach": "Use two pointers l = 0 and r = n - 1 with leftMax = 0 and rightMax = 0. At each step, if leftMax < rightMax, the bottleneck is leftMax so water trapped at l is leftMax - height[l], and advance l. Otherwise process r and advance r.",
    "timeComplexity": "O(n) - Single pass",
    "spaceComplexity": "O(1) - Constant auxiliary space",
    "solutions": {
      "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        if not height: return 0\n        l, r = 0, len(height) - 1\n        left_max, right_max = height[l], height[r]\n        water = 0\n        while l < r:\n            if left_max < right_max:\n                l += 1\n                left_max = max(left_max, height[l])\n                water += left_max - height[l]\n            else:\n                r -= 1\n                right_max = max(right_max, height[r])\n                water += right_max - height[r]\n        return water",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        int l = 0, r = height.size() - 1;\n        int leftMax = 0, rightMax = 0, water = 0;\n        while (l < r) {\n            if (height[l] <= height[r]) {\n                if (height[l] >= leftMax) leftMax = height[l];\n                else water += leftMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rightMax) rightMax = height[r];\n                else water += rightMax - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n};",
      "java": "class Solution {\n    public int trap(int[] height) {\n        int l = 0, r = height.length - 1;\n        int leftMax = 0, rightMax = 0, water = 0;\n        while (l < r) {\n            if (height[l] <= height[r]) {\n                if (height[l] >= leftMax) leftMax = height[l];\n                else water += leftMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rightMax) rightMax = height[r];\n                else water += rightMax - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n}",
      "typescript": "function trap(height: number[]): number {\n  let l = 0, r = height.length - 1;\n  let leftMax = 0, rightMax = 0, water = 0;\n  while (l < r) {\n    if (height[l] <= height[r]) {\n      if (height[l] >= leftMax) leftMax = height[l];\n      else water += leftMax - height[l];\n      l++;\n    } else {\n      if (height[r] >= rightMax) rightMax = height[r];\n      else water += rightMax - height[r];\n      r--;\n    }\n  }\n  return water;\n}"
    }
  },
  {
    "id": "dsa-9",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "pattern_tag": "Sliding Window",
    "leetcode_url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "striver_url": "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/",
    "youtube_url": "https://www.youtube.com/watch?v=wiGpQwVHdE0",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Bloomberg"
    ],
    "summary": "Maintain variable-length sliding window and index map of characters to jump the left pointer efficiently.",
    "description": "Given a string s, find the length of the longest substring without repeating characters.",
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with the length of 3."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "The answer is \"b\", with the length of 1."
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "approach": "Sliding window [l, r] with a hash map lastSeen mapping char -> index. When character s[r] was seen at index >= l, jump l to lastSeen[s[r]] + 1. Calculate maxLen = max(maxLen, r - l + 1).",
    "timeComplexity": "O(n) - Each character processed once",
    "spaceComplexity": "O(min(m, n)) - Space for character set map",
    "solutions": {
      "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        last_seen = {}\n        max_len = 0\n        l = 0\n        for r, char in enumerate(s):\n            if char in last_seen and last_seen[char] >= l:\n                l = last_seen[char] + 1\n            last_seen[char] = r\n            max_len = max(max_len, r - l + 1)\n        return max_len",
      "cpp": "#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_map<char, int> lastSeen;\n        int maxLen = 0, l = 0;\n        for (int r = 0; r < s.size(); ++r) {\n            if (lastSeen.count(s[r]) && lastSeen[s[r]] >= l) {\n                l = lastSeen[s[r]] + 1;\n            }\n            lastSeen[s[r]] = r;\n            maxLen = max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n};",
      "java": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> lastSeen = new HashMap<>();\n        int maxLen = 0, l = 0;\n        for (int r = 0; r < s.length(); r++) {\n            char c = s.charAt(r);\n            if (lastSeen.containsKey(c) && lastSeen.get(c) >= l) {\n                l = lastSeen.get(c) + 1;\n            }\n            lastSeen.put(c, r);\n            maxLen = Math.max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n}",
      "typescript": "function lengthOfLongestSubstring(s: string): number {\n  const lastSeen = new Map<string, number>();\n  let maxLen = 0, l = 0;\n  for (let r = 0; r < s.length; r++) {\n    const char = s[r];\n    if (lastSeen.has(char) && lastSeen.get(char)! >= l) {\n      l = lastSeen.get(char)! + 1;\n    }\n    lastSeen.set(char, r);\n    maxLen = Math.max(maxLen, r - l + 1);\n  }\n  return maxLen;\n}"
    }
  },
  {
    "id": "dsa-10",
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "pattern_tag": "Sliding Window",
    "leetcode_url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "striver_url": "https://takeuforward.org/arrays/longest-repeating-character-replacement/",
    "youtube_url": "https://www.youtube.com/watch?v=gqXU1UyA8pk",
    "companies": [
      "Google",
      "Amazon",
      "Uber"
    ],
    "summary": "Sliding window tracking max frequency character: window is valid if (windowLen - maxFreq) <= k.",
    "description": "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.",
    "examples": [
      {
        "input": "s = \"ABAB\", k = 2",
        "output": "4",
        "explanation": "Replace the two \"A\"s with two \"B\"s or vice versa."
      },
      {
        "input": "s = \"AABABBA\", k = 1",
        "output": "4",
        "explanation": "Replace the one \"A\" in the middle with \"B\" to get \"AABBBBA\" whose longest repeating substring is 4."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of only uppercase English letters.",
      "0 <= k <= s.length"
    ],
    "approach": "Sliding window [l, r] maintaining character frequencies. Keep track of maxFreq seen so far. If current window length (r - l + 1) - maxFreq > k, shrink window by incrementing l. The maximum valid window size is preserved.",
    "timeComplexity": "O(n) - Single pass over string",
    "spaceComplexity": "O(26) = O(1) - Frequency count for alphabet",
    "solutions": {
      "python": "class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        counts = {}\n        max_f = 0\n        l = 0\n        for r in range(len(s)):\n            counts[s[r]] = counts.get(s[r], 0) + 1\n            max_f = max(max_f, counts[s[r]])\n            if (r - l + 1) - max_f > k:\n                counts[s[l]] -= 1\n                l += 1\n        return len(s) - l",
      "cpp": "#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        vector<int> count(26, 0);\n        int maxF = 0, l = 0;\n        for (int r = 0; r < s.size(); ++r) {\n            maxF = max(maxF, ++count[s[r] - 'A']);\n            if ((r - l + 1) - maxF > k) {\n                count[s[l] - 'A']--;\n                l++;\n            }\n        }\n        return s.size() - l;\n    }\n};",
      "java": "class Solution {\n    public int characterReplacement(String s, int k) {\n        int[] count = new int[26];\n        int maxF = 0, l = 0;\n        for (int r = 0; r < s.length(); r++) {\n            maxF = Math.max(maxF, ++count[s.charAt(r) - 'A']);\n            if ((r - l + 1) - maxF > k) {\n                count[s.charAt(l) - 'A']--;\n                l++;\n            }\n        }\n        return s.length() - l;\n    }\n}",
      "typescript": "function characterReplacement(s: string, k: number): number {\n  const count = new Array(26).fill(0);\n  let maxF = 0, l = 0;\n  for (let r = 0; r < s.length; r++) {\n    const idx = s.charCodeAt(r) - 65;\n    count[idx]++;\n    maxF = Math.max(maxF, count[idx]);\n    if ((r - l + 1) - maxF > k) {\n      count[s.charCodeAt(l) - 65]--;\n      l++;\n    }\n  }\n  return s.length - l;\n}"
    }
  },
  {
    "id": "dsa-11",
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "pattern_tag": "Sliding Window",
    "leetcode_url": "https://leetcode.com/problems/minimum-window-substring/",
    "striver_url": "https://takeuforward.org/arrays/minimum-window-substring/",
    "youtube_url": "https://www.youtube.com/watch?v=jSto0O4AJbM",
    "companies": [
      "Meta",
      "Amazon",
      "LinkedIn",
      "Uber"
    ],
    "summary": "Expand window until all characters matched, then contract from left to find minimum length substring.",
    "description": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".",
    "examples": [
      {
        "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
        "output": "\"BANC\"",
        "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
      }
    ],
    "constraints": [
      "m == s.length, n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters."
    ],
    "approach": "Count characters required in t. Expand right pointer r, decrementing needed count. When all characters matched (matched == totalRequired), shrink left pointer l to minimize window while maintaining condition.",
    "timeComplexity": "O(m + n) - Linear window scan",
    "spaceComplexity": "O(1) - Constant ASCII frequency table",
    "solutions": {
      "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if not t or not s: return \"\"\n        t_count = {}\n        for c in t: t_count[c] = t_count.get(c, 0) + 1\n        window = {}\n        have, need = 0, len(t_count)\n        res, res_len = [-1, -1], float(\"infinity\")\n        l = 0\n        for r in range(len(s)):\n            c = s[r]\n            window[c] = window.get(c, 0) + 1\n            if c in t_count and window[c] == t_count[c]:\n                have += 1\n            while have == need:\n                if (r - l + 1) < res_len:\n                    res = [l, r]\n                    res_len = r - l + 1\n                window[s[l]] -= 1\n                if s[l] in t_count and window[s[l]] < t_count[s[l]]:\n                    have -= 1\n                l += 1\n        l, r = res\n        return s[l:r + 1] if res_len != float(\"infinity\") else \"\"",
      "cpp": "#include <string>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        vector<int> map(128, 0);\n        for (char c : t) map[c]++;\n        int count = t.size(), begin = 0, end = 0, d = INT_MAX, head = 0;\n        while (end < s.size()) {\n            if (map[s[end++]]-- > 0) count--;\n            while (count == 0) {\n                if (end - begin < d) d = end - (head = begin);\n                if (map[s[begin++]]++ == 0) count++;\n            }\n        }\n        return d == INT_MAX ? \"\" : s.substr(head, d);\n    }\n};",
      "java": "class Solution {\n    public String minWindow(String s, String t) {\n        int[] map = new int[128];\n        for (char c : t.toCharArray()) map[c]++;\n        int count = t.length(), begin = 0, end = 0, d = Integer.MAX_VALUE, head = 0;\n        while (end < s.length()) {\n            if (map[s.charAt(end++)]-- > 0) count--;\n            while (count == 0) {\n                if (end - begin < d) d = end - (head = begin);\n                if (map[s.charAt(begin++)]++ == 0) count++;\n            }\n        }\n        return d == Integer.MAX_VALUE ? \"\" : s.substring(head, head + d);\n    }\n}",
      "typescript": "function minWindow(s: string, t: string): string {\n  const map = new Array(128).fill(0);\n  for (let i = 0; i < t.length; i++) map[t.charCodeAt(i)]++;\n  let count = t.length, begin = 0, end = 0, d = Infinity, head = 0;\n  while (end < s.length) {\n    if (map[s.charCodeAt(end++)]-- > 0) count--;\n    while (count === 0) {\n      if (end - begin < d) {\n        d = end - (head = begin);\n      }\n      if (map[s.charCodeAt(begin++)]++ === 0) count++;\n    }\n  }\n  return d === Infinity ? \"\" : s.substring(head, head + d);\n}"
    }
  },
  {
    "id": "dsa-12",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "pattern_tag": "Binary Search",
    "leetcode_url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "striver_url": "https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/",
    "youtube_url": "https://www.youtube.com/watch?v=r3pMQ8-Ad5s",
    "companies": [
      "Microsoft",
      "Amazon",
      "Google",
      "Adobe"
    ],
    "summary": "Identify which half of the array is sorted, then check if target lies in that sorted range to discard half.",
    "description": "There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
    "examples": [
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 0",
        "output": "4"
      },
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 3",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i], target <= 10^4",
      "All values of nums are unique."
    ],
    "approach": "Standard binary search with mid. Check whether left half nums[l...mid] is sorted. If so, verify if target is within [nums[l], nums[mid]]. If yes search left; else search right. If right half is sorted, do mirror check.",
    "timeComplexity": "O(log n) - Halves search space each iteration",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                return mid\n            if nums[l] <= nums[mid]:\n                if nums[l] <= target < nums[mid]:\n                    r = mid - 1\n                else:\n                    l = mid + 1\n            else:\n                if nums[mid] < target <= nums[r]:\n                    l = mid + 1\n                else:\n                    r = mid - 1\n        return -1",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n};",
      "java": "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n}",
      "typescript": "function search(nums: number[], target: number): number {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}"
    }
  },
  {
    "id": "dsa-13",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "pattern_tag": "Binary Search",
    "leetcode_url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "striver_url": "https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array/",
    "youtube_url": "https://www.youtube.com/watch?v=nIVW4P8b1VA",
    "companies": [
      "Amazon",
      "Microsoft",
      "Goldman Sachs"
    ],
    "summary": "Compare middle element with right boundary: if nums[mid] > nums[right], minimum lies in right half.",
    "description": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.",
    "examples": [
      {
        "input": "nums = [3,4,5,1,2]",
        "output": "1",
        "explanation": "The original array was [1,2,3,4,5] rotated 3 times."
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000"
    ],
    "approach": "Binary search with l = 0 and r = n - 1. While l < r, compute mid. If nums[mid] > nums[r], the inflection point must be to the right of mid, so l = mid + 1. Otherwise r = mid. When loop ends, nums[l] is minimum.",
    "timeComplexity": "O(log n) - Halves range each iteration",
    "spaceComplexity": "O(1) - Constant memory",
    "solutions": {
      "python": "class Solution:\n    def findMin(self, nums: list[int]) -> int:\n        l, r = 0, len(nums) - 1\n        while l < r:\n            mid = (l + r) // 2\n            if nums[mid] > nums[r]:\n                l = mid + 1\n            else:\n                r = mid\n        return nums[l]",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int l = 0, r = nums.size() - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] > nums[r]) l = mid + 1;\n            else r = mid;\n        }\n        return nums[l];\n    }\n};",
      "java": "class Solution {\n    public int findMin(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] > nums[r]) l = mid + 1;\n            else r = mid;\n        }\n        return nums[l];\n    }\n}",
      "typescript": "function findMin(nums: number[]): number {\n  let l = 0, r = nums.length - 1;\n  while (l < r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] > nums[r]) l = mid + 1;\n    else r = mid;\n  }\n  return nums[l];\n}"
    }
  },
  {
    "id": "dsa-14",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "pattern_tag": "Binary Search",
    "leetcode_url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "striver_url": "https://takeuforward.org/data-structure/median-of-two-sorted-arrays-of-different-sizes/",
    "youtube_url": "https://www.youtube.com/watch?v=q6IEA26hvPE",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "summary": "Binary search on partition of the smaller array ensuring left halves have elements <= right halves in O(log(min(n,m))).",
    "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    "examples": [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.00000",
        "explanation": "merged array = [1,2,3] and median is 2."
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.50000",
        "explanation": "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "constraints": [
      "nums1.length == m, nums2.length == n",
      "0 <= m, n <= 1000",
      "1 <= m + n <= 2000"
    ],
    "approach": "Partition both arrays such that left partition has (m + n + 1) // 2 elements. Binary search the cut position on the smaller array A. If maxLeftA <= minRightB and maxLeftB <= minRightA, we have found the correct partition.",
    "timeComplexity": "O(log(min(m, n))) - Binary search on smaller array",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        A, B = nums1, nums2\n        if len(A) > len(B):\n            A, B = B, A\n        total = len(A) + len(B)\n        half = (total + 1) // 2\n        l, r = 0, len(A)\n        while l <= r:\n            i = (l + r) // 2\n            j = half - i\n            Aleft = A[i - 1] if i > 0 else float(\"-infinity\")\n            Aright = A[i] if i < len(A) else float(\"infinity\")\n            Bleft = B[j - 1] if j > 0 else float(\"-infinity\")\n            Bright = B[j] if j < len(B) else float(\"infinity\")\n            if Aleft <= Bright and Bleft <= Aright:\n                if total % 2:\n                    return max(Aleft, Bleft)\n                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2\n            elif Aleft > Bright:\n                r = i - 1\n            else:\n                l = i + 1\n        return 0.0",
      "cpp": "#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);\n        int m = nums1.size(), n = nums2.size();\n        int l = 0, r = m;\n        while (l <= r) {\n            int i = (l + r) / 2;\n            int j = (m + n + 1) / 2 - i;\n            int maxLeftA = (i == 0) ? INT_MIN : nums1[i - 1];\n            int minRightA = (i == m) ? INT_MAX : nums1[i];\n            int maxLeftB = (j == 0) ? INT_MIN : nums2[j - 1];\n            int minRightB = (j == n) ? INT_MAX : nums2[j];\n            if (maxLeftA <= minRightB && maxLeftB <= minRightA) {\n                if ((m + n) % 2 == 1) return max(maxLeftA, maxLeftB);\n                return (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0;\n            } else if (maxLeftA > minRightB) r = i - 1;\n            else l = i + 1;\n        }\n        return 0.0;\n    }\n};",
      "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n        int m = nums1.length, n = nums2.length;\n        int l = 0, r = m;\n        while (l <= r) {\n            int i = (l + r) / 2;\n            int j = (m + n + 1) / 2 - i;\n            int maxLeftA = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];\n            int minRightA = (i == m) ? Integer.MAX_VALUE : nums1[i];\n            int maxLeftB = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];\n            int minRightB = (j == n) ? Integer.MAX_VALUE : nums2[j];\n            if (maxLeftA <= minRightB && maxLeftB <= minRightA) {\n                if ((m + n) % 2 == 1) return Math.max(maxLeftA, maxLeftB);\n                return (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2.0;\n            } else if (maxLeftA > minRightB) r = i - 1;\n            else l = i + 1;\n        }\n        return 0.0;\n    }\n}",
      "typescript": "function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n  const m = nums1.length, n = nums2.length;\n  let l = 0, r = m;\n  while (l <= r) {\n    const i = Math.floor((l + r) / 2);\n    const j = Math.floor((m + n + 1) / 2) - i;\n    const maxLeftA = i === 0 ? -Infinity : nums1[i - 1];\n    const minRightA = i === m ? Infinity : nums1[i];\n    const maxLeftB = j === 0 ? -Infinity : nums2[j - 1];\n    const minRightB = j === n ? Infinity : nums2[j];\n    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {\n      if ((m + n) % 2 === 1) return Math.max(maxLeftA, maxLeftB);\n      return (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;\n    } else if (maxLeftA > minRightB) r = i - 1;\n    else l = i + 1;\n  }\n  return 0;\n}"
    }
  },
  {
    "id": "dsa-15",
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "pattern_tag": "Linked List",
    "leetcode_url": "https://leetcode.com/problems/reverse-linked-list/",
    "striver_url": "https://takeuforward.org/data-structure/reverse-a-linked-list/",
    "youtube_url": "https://www.youtube.com/watch?v=G0_I-ZF0S38",
    "companies": [
      "Amazon",
      "Microsoft",
      "Adobe",
      "Apple"
    ],
    "summary": "Iterate with prev, curr, and next pointers updating curr.next = prev in O(n) time and O(1) space.",
    "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5,4,3,2,1]"
      },
      {
        "input": "head = [1,2]",
        "output": "[2,1]"
      }
    ],
    "constraints": [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    "approach": "Maintain prev pointer initialized to null, and curr to head. In each iteration, save nextNode = curr.next, reverse link curr.next = prev, move prev = curr, and curr = nextNode. Return prev.",
    "timeComplexity": "O(n) - Single pass over list nodes",
    "spaceComplexity": "O(1) - In-place pointer modifications",
    "solutions": {
      "python": "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        prev, curr = None, head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev",
      "cpp": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode *prev = nullptr, *curr = head;\n        while (curr) {\n            ListNode* nxt = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nxt;\n        }\n        return prev;\n    }\n};",
      "java": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode nxt = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nxt;\n        }\n        return prev;\n    }\n}",
      "typescript": "function reverseList(head: ListNode | null): ListNode | null {\n  let prev: ListNode | null = null;\n  let curr = head;\n  while (curr) {\n    const nxt = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nxt;\n  }\n  return prev;\n}"
    }
  },
  {
    "id": "dsa-16",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "pattern_tag": "Linked List",
    "leetcode_url": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "striver_url": "https://takeuforward.org/data-structure/merge-two-sorted-linked-lists/",
    "youtube_url": "https://www.youtube.com/watch?v=XIdigk956u0",
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple",
      "Meta"
    ],
    "summary": "Use dummy head and compare node values connecting the smaller one iteratively.",
    "description": "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    "examples": [
      {
        "input": "list1 = [1,2,4], list2 = [1,3,4]",
        "output": "[1,1,2,3,4,4]"
      }
    ],
    "constraints": [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100"
    ],
    "approach": "Create a dummy head node and pointer tail. While list1 and list2 are both non-null, compare values, attach the smaller node to tail.next, and advance that list. Attach any remaining nodes at the end.",
    "timeComplexity": "O(n + m) - Where n and m are lengths of list1 and list2",
    "spaceComplexity": "O(1) - Reuses existing nodes",
    "solutions": {
      "python": "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode()\n        tail = dummy\n        while list1 and list2:\n            if list1.val < list2.val:\n                tail.next = list1\n                list1 = list1.next\n            else:\n                tail.next = list2\n                list2 = list2.next\n            tail = tail.next\n        tail.next = list1 or list2\n        return dummy.next",
      "cpp": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        while (list1 && list2) {\n            if (list1->val < list2->val) {\n                tail->next = list1;\n                list1 = list1->next;\n            } else {\n                tail->next = list2;\n                list2 = list2->next;\n            }\n            tail = tail->next;\n        }\n        tail->next = list1 ? list1 : list2;\n        return dummy.next;\n    }\n};",
      "java": "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val < list2.val) {\n                tail.next = list1;\n                list1 = list1.next;\n            } else {\n                tail.next = list2;\n                list2 = list2.next;\n            }\n            tail = tail.next;\n        }\n        tail.next = (list1 != null) ? list1 : list2;\n        return dummy.next;\n    }\n}",
      "typescript": "function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {\n  const dummy = new ListNode(0);\n  let tail = dummy;\n  while (list1 && list2) {\n    if (list1.val < list2.val) {\n      tail.next = list1;\n      list1 = list1.next;\n    } else {\n      tail.next = list2;\n      list2 = list2.next;\n    }\n    tail = tail.next;\n  }\n  tail.next = list1 || list2;\n  return dummy.next;\n}"
    }
  },
  {
    "id": "dsa-17",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "pattern_tag": "Linked List",
    "leetcode_url": "https://leetcode.com/problems/lru-cache/",
    "striver_url": "https://takeuforward.org/data-structure/lru-cache-implementation/",
    "youtube_url": "https://www.youtube.com/watch?v=7ABFKPK2hD4",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta",
      "Salesforce"
    ],
    "summary": "Combine a HashMap with a Doubly Linked List for O(1) get and put operations with eviction of least recently used.",
    "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache with get(key) and put(key, value) in O(1) average time complexity.",
    "examples": [
      {
        "input": "LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); lRUCache.put(2, 2); lRUCache.get(1); lRUCache.put(3, 3); lRUCache.get(2);",
        "output": "[null, null, null, 1, null, -1]",
        "explanation": "key 2 was evicted because key 1 was accessed before inserting key 3."
      }
    ],
    "constraints": [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls to get and put."
    ],
    "approach": "Use a doubly linked list with dummy head and tail nodes to maintain access order (head = MRU, tail = LRU). Use a hash map mapping key -> node for O(1) lookup. On access/insert, remove node from current position and insert at head. If capacity exceeded, remove node before tail.",
    "timeComplexity": "O(1) - get and put operations both run in strict O(1)",
    "spaceComplexity": "O(capacity) - Hash map and doubly linked list",
    "solutions": {
      "python": "class Node:\n    def __init__(self, key=0, val=0):\n        self.key, self.val = key, val\n        self.prev = self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {}\n        self.head, self.tail = Node(), Node()\n        self.head.next, self.tail.prev = self.tail, self.head\n\n    def _remove(self, node):\n        prev, nxt = node.prev, node.next\n        prev.next, nxt.prev = nxt, prev\n\n    def _insert(self, node):\n        nxt = self.head.next\n        self.head.next = node\n        node.prev, node.next = self.head, nxt\n        nxt.prev = node\n\n    def get(self, key: int) -> int:\n        if key in self.cache:\n            node = self.cache[key]\n            self._remove(node)\n            self._insert(node)\n            return node.val\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self._remove(self.cache[key])\n        node = Node(key, value)\n        self.cache[key] = node\n        self._insert(node)\n        if len(self.cache) > self.cap:\n            lru = self.tail.prev\n            self._remove(lru)\n            del self.cache[lru.key]",
      "cpp": "#include <unordered_map>\nusing namespace std;\n\nclass LRUCache {\n    struct Node {\n        int key, val;\n        Node *prev, *next;\n        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}\n    };\n    int cap;\n    unordered_map<int, Node*> map;\n    Node *head, *tail;\n\n    void remove(Node* node) {\n        node->prev->next = node->next;\n        node->next->prev = node->prev;\n    }\n    void insert(Node* node) {\n        node->next = head->next;\n        node->prev = head;\n        head->next->prev = node;\n        head->next = node;\n    }\npublic:\n    LRUCache(int capacity) : cap(capacity) {\n        head = new Node(0, 0);\n        tail = new Node(0, 0);\n        head->next = tail;\n        tail->prev = head;\n    }\n    int get(int key) {\n        if (!map.count(key)) return -1;\n        Node* node = map[key];\n        remove(node);\n        insert(node);\n        return node->val;\n    }\n    void put(int key, int value) {\n        if (map.count(key)) remove(map[key]);\n        Node* node = new Node(key, value);\n        map[key] = node;\n        insert(node);\n        if (map.size() > cap) {\n            Node* lru = tail->prev;\n            remove(lru);\n            map.erase(lru->key);\n            delete lru;\n        }\n    }\n};",
      "java": "import java.util.HashMap;\nimport java.util.Map;\n\nclass LRUCache {\n    class Node {\n        int key, val;\n        Node prev, next;\n        Node(int k, int v) { key = k; val = v; }\n    }\n    private int cap;\n    private Map<Integer, Node> map = new HashMap<>();\n    private Node head = new Node(0, 0), tail = new Node(0, 0);\n\n    private void remove(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    private void insert(Node node) {\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n    public LRUCache(int capacity) {\n        cap = capacity;\n        head.next = tail;\n        tail.prev = head;\n    }\n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        Node node = map.get(key);\n        remove(node);\n        insert(node);\n        return node.val;\n    }\n    public void put(int key, int value) {\n        if (map.containsKey(key)) remove(map.get(key));\n        Node node = new Node(key, value);\n        map.put(key, node);\n        insert(node);\n        if (map.size() > cap) {\n            Node lru = tail.prev;\n            remove(lru);\n            map.remove(lru.key);\n        }\n    }\n}",
      "typescript": "class DLinkedNode {\n  key: number;\n  val: number;\n  prev: DLinkedNode | null = null;\n  next: DLinkedNode | null = null;\n  constructor(k = 0, v = 0) {\n    this.key = k;\n    this.val = v;\n  }\n}\n\nclass LRUCache {\n  private cap: number;\n  private map = new Map<number, DLinkedNode>();\n  private head = new DLinkedNode();\n  private tail = new DLinkedNode();\n\n  constructor(capacity: number) {\n    this.cap = capacity;\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n\n  private remove(node: DLinkedNode) {\n    node.prev!.next = node.next;\n    node.next!.prev = node.prev;\n  }\n\n  private insert(node: DLinkedNode) {\n    node.next = this.head.next;\n    node.prev = this.head;\n    this.head.next!.prev = node;\n    this.head.next = node;\n  }\n\n  get(key: number): number {\n    if (!this.map.has(key)) return -1;\n    const node = this.map.get(key)!;\n    this.remove(node);\n    this.insert(node);\n    return node.val;\n  }\n\n  put(key: number, value: number): void {\n    if (this.map.has(key)) this.remove(this.map.get(key)!);\n    const node = new DLinkedNode(key, value);\n    this.map.set(key, node);\n    this.insert(node);\n    if (this.map.size > this.cap) {\n      const lru = this.tail.prev!;\n      this.remove(lru);\n      this.map.delete(lru.key);\n    }\n  }\n}"
    }
  },
  {
    "id": "dsa-18",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "striver_url": "https://takeuforward.org/data-structure/maximum-depth-of-a-binary-tree/",
    "youtube_url": "https://www.youtube.com/watch?v=hTM3phVI6YQ",
    "companies": [
      "Amazon",
      "Microsoft",
      "LinkedIn"
    ],
    "summary": "Compute 1 + max(depth(left), depth(right)) recursively using DFS or level-order traversal with BFS queue.",
    "description": "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3"
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    "approach": "If root is null, depth is 0. Otherwise, recursively compute leftDepth and rightDepth, returning 1 + max(leftDepth, rightDepth).",
    "timeComplexity": "O(n) - Visits every tree node once",
    "spaceComplexity": "O(h) - Call stack equal to tree height (O(log n) balanced, O(n) skewed)",
    "solutions": {
      "python": "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))",
      "cpp": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};",
      "java": "class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}",
      "typescript": "function maxDepth(root: TreeNode | null): number {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}"
    }
  },
  {
    "id": "dsa-19",
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/validate-binary-search-tree/",
    "striver_url": "https://takeuforward.org/data-structure/check-if-a-tree-is-a-bst-or-bt/",
    "youtube_url": "https://www.youtube.com/watch?v=s6ATEkipzow",
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta",
      "Bloomberg"
    ],
    "summary": "Pass valid [min, max] range down DFS recursive calls, checking that node.val falls strictly within bounds.",
    "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST satisfies: left subtree contains only nodes with keys less than node's key; right subtree contains only nodes with keys greater than node's key; both subtrees must also be BSTs.",
    "examples": [
      {
        "input": "root = [2,1,3]",
        "output": "true"
      },
      {
        "input": "root = [5,1,4,null,null,3,6]",
        "output": "false",
        "explanation": "The root node's value is 5 but its right child's value is 4."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1"
    ],
    "approach": "Helper function validate(node, low, high). For current node, assert low < node.val < high. Recursively check validate(node.left, low, node.val) and validate(node.right, node.val, high).",
    "timeComplexity": "O(n) - Visits every node once",
    "spaceComplexity": "O(h) - Recursive call stack proportional to tree height",
    "solutions": {
      "python": "class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        def validate(node, low=-float('inf'), high=float('inf')):\n            if not node: return True\n            if not (low < node.val < high): return False\n            return validate(node.left, low, node.val) and validate(node.right, node.val, high)\n        return validate(root)",
      "cpp": "class Solution {\n    bool validate(TreeNode* node, long low, long high) {\n        if (!node) return true;\n        if (node->val <= low || node->val >= high) return false;\n        return validate(node->left, low, node->val) && validate(node->right, node->val, high);\n    }\npublic:\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\n};",
      "java": "class Solution {\n    private boolean validate(TreeNode node, Long low, Long high) {\n        if (node == null) return true;\n        if ((low != null && node.val <= low) || (high != null && node.val >= high)) return false;\n        return validate(node.left, low, (long) node.val) && validate(node.right, (long) node.val, high);\n    }\n    public boolean isValidBST(TreeNode root) {\n        return validate(root, null, null);\n    }\n}",
      "typescript": "function isValidBST(root: TreeNode | null): boolean {\n  function validate(node: TreeNode | null, low: number, high: number): boolean {\n    if (!node) return true;\n    if (node.val <= low || node.val >= high) return false;\n    return validate(node.left, low, node.val) && validate(node.right, node.val, high);\n  }\n  return validate(root, -Infinity, Infinity);\n}"
    }
  },
  {
    "id": "dsa-20",
    "title": "Lowest Common Ancestor of a BST",
    "difficulty": "Medium",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "striver_url": "https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/",
    "youtube_url": "https://www.youtube.com/watch?v=gs2LMfuOR9k",
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "summary": "Walk down the BST: if both nodes are smaller move left, if both larger move right; split point is the LCA.",
    "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    "examples": [
      {
        "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        "output": "6",
        "explanation": "The LCA of nodes 2 and 8 is 6."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [2, 10^5].",
      "All Node.val are unique.",
      "p != q and both p and q will exist in the BST."
    ],
    "approach": "Start at root. If both p.val and q.val are greater than curr.val, LCA must be in the right subtree. If both are smaller, LCA is in left subtree. Otherwise, curr is the split point and hence the LCA.",
    "timeComplexity": "O(h) - Proportional to BST height (O(log n) balanced)",
    "spaceComplexity": "O(1) - Iterative traversal with no extra memory",
    "solutions": {
      "python": "class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        curr = root\n        while curr:\n            if p.val > curr.val and q.val > curr.val:\n                curr = curr.right\n            elif p.val < curr.val and q.val < curr.val:\n                curr = curr.left\n            else:\n                return curr",
      "cpp": "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        TreeNode* curr = root;\n        while (curr) {\n            if (p->val > curr->val && q->val > curr->val) curr = curr->right;\n            else if (p->val < curr->val && q->val < curr->val) curr = curr->left;\n            else return curr;\n        }\n        return nullptr;\n    }\n};",
      "java": "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        TreeNode curr = root;\n        while (curr != null) {\n            if (p.val > curr.val && q.val > curr.val) curr = curr.right;\n            else if (p.val < curr.val && q.val < curr.val) curr = curr.left;\n            else return curr;\n        }\n        return null;\n    }\n}",
      "typescript": "function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {\n  let curr = root;\n  while (curr && p && q) {\n    if (p.val > curr.val && q.val > curr.val) curr = curr.right;\n    else if (p.val < curr.val && q.val < curr.val) curr = curr.left;\n    else return curr;\n  }\n  return null;\n}"
    }
  },
  {
    "id": "dsa-21",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "pattern_tag": "Graphs",
    "leetcode_url": "https://leetcode.com/problems/number-of-islands/",
    "striver_url": "https://takeuforward.org/data-structure/number-of-islands/",
    "youtube_url": "https://www.youtube.com/watch?v=pV2kpPD66nE",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta",
      "Bloomberg"
    ],
    "summary": "Iterate through grid; when a 1 is found, trigger BFS/DFS to sink connected land cells and increment count.",
    "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    "examples": [
      {
        "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
        "output": "1"
      }
    ],
    "constraints": [
      "m == grid.length, n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    "approach": "Loop over all cells (r, c). If cell is '1', increment count and launch a DFS/BFS traversal sinking all connected '1' cells to '0' (or visited) so they are not recounted.",
    "timeComplexity": "O(m * n) - Each cell is visited at most constant times",
    "spaceComplexity": "O(m * n) - Worst-case call stack for DFS",
    "solutions": {
      "python": "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        if not grid: return 0\n        rows, cols = len(grid), len(grid[0])\n        islands = 0\n\n        def dfs(r, c):\n            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':\n                return\n            grid[r][c] = '0'\n            dfs(r + 1, c)\n            dfs(r - 1, c)\n            dfs(r, c + 1)\n            dfs(r, c - 1)\n\n        for r in range(rows):\n            for c in range(cols):\n                if grid[r][c] == '1':\n                    islands += 1\n                    dfs(r, c)\n        return islands",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r + 1, c);\n        dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1);\n        dfs(grid, r, c - 1);\n    }\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int r = 0; r < grid.size(); ++r) {\n            for (int c = 0; c < grid[0].size(); ++c) {\n                if (grid[r][c] == '1') {\n                    count++;\n                    dfs(grid, r, c);\n                }\n            }\n        }\n        return count;\n    }\n};",
      "java": "class Solution {\n    private void dfs(char[][] grid, int r, int c) {\n        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r + 1, c);\n        dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1);\n        dfs(grid, r, c - 1);\n    }\n    public int numIslands(char[][] grid) {\n        int count = 0;\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[0].length; c++) {\n                if (grid[r][c] == '1') {\n                    count++;\n                    dfs(grid, r, c);\n                }\n            }\n        }\n        return count;\n    }\n}",
      "typescript": "function numIslands(grid: string[][]): number {\n  let count = 0;\n  const rows = grid.length, cols = grid[0].length;\n\n  function dfs(r: number, c: number) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;\n    grid[r][c] = '0';\n    dfs(r + 1, c);\n    dfs(r - 1, c);\n    dfs(r, c + 1);\n    dfs(r, c - 1);\n  }\n\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === '1') {\n        count++;\n        dfs(r, c);\n      }\n    }\n  }\n  return count;\n}"
    }
  },
  {
    "id": "dsa-22",
    "title": "Course Schedule (Cycle Detection)",
    "difficulty": "Medium",
    "pattern_tag": "Graphs",
    "leetcode_url": "https://leetcode.com/problems/course-schedule/",
    "striver_url": "https://takeuforward.org/data-structure/course-schedule-i-and-ii-pre-requisite-tasks-topological-sort/",
    "youtube_url": "https://www.youtube.com/watch?v=EgI5nU9etnU",
    "companies": [
      "Amazon",
      "Google",
      "Twitter",
      "Microsoft"
    ],
    "summary": "Detect cycles in directed graph using Kahn's algorithm (indegree BFS) or DFS with recursion stack state.",
    "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.",
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "output": "true",
        "explanation": "There are 2 courses to take. To take course 1 you should have finished course 0. So it is possible."
      },
      {
        "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        "output": "false",
        "explanation": "There is a dependency cycle between 0 and 1."
      }
    ],
    "constraints": [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000"
    ],
    "approach": "Kahn's Algorithm (Topological Sort): Compute indegrees of all courses. Enqueue courses with indegree 0. While queue not empty, dequeue course, decrement indegrees of its neighbors, and enqueue neighbors that reach 0. If processed count == numCourses, no cycle exists.",
    "timeComplexity": "O(V + E) - Visits each node and edge once",
    "spaceComplexity": "O(V + E) - Adjacency list and indegree array",
    "solutions": {
      "python": "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        from collections import deque, defaultdict\n        adj = defaultdict(list)\n        indegree = [0] * numCourses\n        for crs, pre in prerequisites:\n            adj[pre].append(crs)\n            indegree[crs] += 1\n        q = deque([i for i in range(numCourses) if indegree[i] == 0])\n        completed = 0\n        while q:\n            node = q.popleft()\n            completed += 1\n            for nxt in adj[node]:\n                indegree[nxt] -= 1\n                if indegree[nxt] == 0:\n                    q.append(nxt)\n        return completed == numCourses",
      "cpp": "#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> indegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            indegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) {\n            if (indegree[i] == 0) q.push(i);\n        }\n        int completed = 0;\n        while (!q.empty()) {\n            int node = q.front(); q.pop();\n            completed++;\n            for (int nxt : adj[node]) {\n                if (--indegree[nxt] == 0) q.push(nxt);\n            }\n        }\n        return completed == numCourses;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n        int[] indegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            indegree[p[0]]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (indegree[i] == 0) q.offer(i);\n        }\n        int completed = 0;\n        while (!q.isEmpty()) {\n            int node = q.poll();\n            completed++;\n            for (int nxt : adj.get(node)) {\n                if (--indegree[nxt] == 0) q.offer(nxt);\n            }\n        }\n        return completed == numCourses;\n    }\n}",
      "typescript": "function canFinish(numCourses: number, prerequisites: number[][]): boolean {\n  const adj: number[][] = Array.from({ length: numCourses }, () => []);\n  const indegree = new Array(numCourses).fill(0);\n  for (const [crs, pre] of prerequisites) {\n    adj[pre].push(crs);\n    indegree[crs]++;\n  }\n  const q: number[] = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (indegree[i] === 0) q.push(i);\n  }\n  let completed = 0;\n  while (q.length > 0) {\n    const node = q.shift()!;\n    completed++;\n    for (const nxt of adj[node]) {\n      if (--indegree[nxt] === 0) q.push(nxt);\n    }\n  }\n  return completed === numCourses;\n}"
    }
  },
  {
    "id": "dsa-23",
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "pattern_tag": "Graphs",
    "leetcode_url": "https://leetcode.com/problems/rotting-oranges/",
    "striver_url": "https://takeuforward.org/data-structure/rotten-oranges-min-time-to-rot-all-oranges-bfs/",
    "youtube_url": "https://www.youtube.com/watch?v=y704fEOx010",
    "companies": [
      "Amazon",
      "Microsoft",
      "Uber"
    ],
    "summary": "Multi-source BFS from all initially rotten oranges simultaneously, counting minutes until fresh oranges are 0.",
    "description": "You are given an m x n grid where each cell can have one of three values: 0 representing empty cell; 1 representing fresh orange; 2 representing rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
    "examples": [
      {
        "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        "output": "4"
      }
    ],
    "constraints": [
      "m == grid.length, n == grid[i].length",
      "1 <= m, n <= 10",
      "grid[i][j] is 0, 1, or 2."
    ],
    "approach": "Count fresh oranges and push coordinates of all initially rotten oranges (2) into a queue. Perform level-by-level BFS, rotting fresh neighbors and decrementing fresh count. When queue is empty, return minutes if fresh == 0 else -1.",
    "timeComplexity": "O(m * n) - Each grid cell processed at most once",
    "spaceComplexity": "O(m * n) - BFS queue space",
    "solutions": {
      "python": "class Solution:\n    def orangesRotting(self, grid: list[list[int]]) -> int:\n        from collections import deque\n        rows, cols = len(grid), len(grid[0])\n        q = deque()\n        fresh = 0\n        for r in range(rows):\n            for c in range(cols):\n                if grid[r][c] == 2: q.append((r, c))\n                elif grid[r][c] == 1: fresh += 1\n        time = 0\n        dirs = [(1,0), (-1,0), (0,1), (0,-1)]\n        while q and fresh > 0:\n            for _ in range(len(q)):\n                r, c = q.popleft()\n                for dr, dc in dirs:\n                    nr, nc = r + dr, c + dc\n                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:\n                        grid[nr][nc] = 2\n                        fresh -= 1\n                        q.append((nr, nc))\n            time += 1\n        return time if fresh == 0 else -1",
      "cpp": "#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        int rows = grid.size(), cols = grid[0].size();\n        queue<pair<int, int>> q;\n        int fresh = 0;\n        for (int r = 0; r < rows; ++r) {\n            for (int c = 0; c < cols; ++c) {\n                if (grid[r][c] == 2) q.push({r, c});\n                else if (grid[r][c] == 1) fresh++;\n            }\n        }\n        int time = 0;\n        int dr[4] = {1, -1, 0, 0}, dc[4] = {0, 0, 1, -1};\n        while (!q.empty() && fresh > 0) {\n            int sz = q.size();\n            for (int i = 0; i < sz; ++i) {\n                auto [r, c] = q.front(); q.pop();\n                for (int d = 0; d < 4; ++d) {\n                    int nr = r + dr[d], nc = c + dc[d];\n                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {\n                        grid[nr][nc] = 2;\n                        fresh--;\n                        q.push({nr, nc});\n                    }\n                }\n            }\n            time++;\n        }\n        return fresh == 0 ? time : -1;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int orangesRotting(int[][] grid) {\n        int rows = grid.length, cols = grid[0].length;\n        Queue<int[]> q = new LinkedList<>();\n        int fresh = 0;\n        for (int r = 0; r < rows; r++) {\n            for (int c = 0; c < cols; c++) {\n                if (grid[r][c] == 2) q.offer(new int[]{r, c});\n                else if (grid[r][c] == 1) fresh++;\n            }\n        }\n        int time = 0;\n        int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};\n        while (!q.isEmpty() && fresh > 0) {\n            int size = q.size();\n            for (int i = 0; i < size; i++) {\n                int[] curr = q.poll();\n                for (int[] d : dirs) {\n                    int nr = curr[0] + d[0], nc = curr[1] + d[1];\n                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {\n                        grid[nr][nc] = 2;\n                        fresh--;\n                        q.offer(new int[]{nr, nc});\n                    }\n                }\n            }\n            time++;\n        }\n        return fresh == 0 ? time : -1;\n    }\n}",
      "typescript": "function orangesRotting(grid: number[][]): number {\n  const rows = grid.length, cols = grid[0].length;\n  const q: [number, number][] = [];\n  let fresh = 0;\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === 2) q.push([r, c]);\n      else if (grid[r][c] === 1) fresh++;\n    }\n  }\n  let time = 0;\n  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];\n  while (q.length > 0 && fresh > 0) {\n    const sz = q.length;\n    for (let i = 0; i < sz; i++) {\n      const [r, c] = q.shift()!;\n      for (const [dr, dc] of dirs) {\n        const nr = r + dr, nc = c + dc;\n        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {\n          grid[nr][nc] = 2;\n          fresh--;\n          q.push([nr, nc]);\n        }\n      }\n    }\n    time++;\n  }\n  return fresh === 0 ? time : -1;\n}"
    }
  },
  {
    "id": "dsa-24",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "pattern_tag": "Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/climbing-stairs/",
    "striver_url": "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs/",
    "youtube_url": "https://www.youtube.com/watch?v=Y0lT9Fck7q8",
    "companies": [
      "Amazon",
      "Google",
      "Apple",
      "Adobe"
    ],
    "summary": "Fibonacci state transition dp[i] = dp[i-1] + dp[i-2] with space optimized to two variables O(1).",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "examples": [
      {
        "input": "n = 2",
        "output": "2",
        "explanation": "1. 1 step + 1 step; 2. 2 steps."
      },
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "1. 1+1+1; 2. 1+2; 3. 2+1."
      }
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "approach": "Ways to reach step i is dp[i] = dp[i - 1] + dp[i - 2]. Store only the previous two results in variables a and b to achieve O(1) space.",
    "timeComplexity": "O(n) - Single loop up to n",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2: return n\n        a, b = 1, 2\n        for _ in range(3, n + 1):\n            a, b = b, a + b\n        return b",
      "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; ++i) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n};",
      "java": "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n}",
      "typescript": "function climbStairs(n: number): number {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    const c = a + b;\n    a = b;\n    b = c;\n  }\n  return b;\n}"
    }
  },
  {
    "id": "dsa-25",
    "title": "Coin Change",
    "difficulty": "Medium",
    "pattern_tag": "Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/coin-change/",
    "striver_url": "https://takeuforward.org/data-structure/coin-change-2-dp-22/",
    "youtube_url": "https://www.youtube.com/watch?v=H9bfqozjoqs",
    "companies": [
      "Amazon",
      "Microsoft",
      "Goldman Sachs"
    ],
    "summary": "Bottom-up DP array where dp[i] stores min coins to make amount i: dp[i] = min(dp[i], dp[i-c] + 1).",
    "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    "examples": [
      {
        "input": "coins = [1,2,5], amount = 11",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1"
      }
    ],
    "constraints": [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    "approach": "Initialize dp array of size amount + 1 with amount + 1 (infinity sentinel), setting dp[0] = 0. For each coin, and for each sub-amount from coin to amount: dp[i] = min(dp[i], dp[i - coin] + 1).",
    "timeComplexity": "O(amount * coins.length) - Computes subproblems bottom-up",
    "spaceComplexity": "O(amount) - DP table",
    "solutions": {
      "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for coin in coins:\n            for i in range(coin, amount + 1):\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n        return dp[amount] if dp[amount] != float('inf') else -1",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int coin : coins) {\n            for (int i = coin; i <= amount; ++i) {\n                dp[i] = min(dp[i], dp[i - coin] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};",
      "java": "import java.util.Arrays;\n\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int coin : coins) {\n            for (int i = coin; i <= amount; i++) {\n                dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}",
      "typescript": "function coinChange(coins: number[], amount: number): number {\n  const dp = new Array(amount + 1).fill(amount + 1);\n  dp[0] = 0;\n  for (const coin of coins) {\n    for (let i = coin; i <= amount; i++) {\n      dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] > amount ? -1 : dp[amount];\n}"
    }
  },
  {
    "id": "dsa-26",
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "pattern_tag": "Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "striver_url": "https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/",
    "youtube_url": "https://www.youtube.com/watch?v=on2hvxBXJH4",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta"
    ],
    "summary": "Solve in O(n log n) using patience sorting and binary search (std::lower_bound) on tail values.",
    "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    "examples": [
      {
        "input": "nums = [10,9,2,5,3,7,101,18]",
        "output": "4",
        "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "approach": "Maintain tails array where tails[i] is the smallest tail of all increasing subsequences of length i + 1. For each x in nums, binary search x in tails. If x is greater than all tails, append x; otherwise replace the first element >= x.",
    "timeComplexity": "O(n log n) - Binary search per element",
    "spaceComplexity": "O(n) - Tails array",
    "solutions": {
      "python": "import bisect\n\nclass Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        tails = []\n        for x in nums:\n            idx = bisect.bisect_left(tails, x)\n            if idx == len(tails):\n                tails.append(x)\n            else:\n                tails[idx] = x\n        return len(tails)",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        vector<int> tails;\n        for (int x : nums) {\n            auto it = lower_bound(tails.begin(), tails.end(), x);\n            if (it == tails.end()) tails.push_back(x);\n            else *it = x;\n        }\n        return tails.size();\n    }\n};",
      "java": "import java.util.Arrays;\n\nclass Solution {\n    public int lengthOfLIS(int[] nums) {\n        int[] tails = new int[nums.length];\n        int size = 0;\n        for (int x : nums) {\n            int i = 0, j = size;\n            while (i != j) {\n                int m = (i + j) / 2;\n                if (tails[m] < x) i = m + 1;\n                else j = m;\n            }\n            tails[i] = x;\n            if (i == size) size++;\n        }\n        return size;\n    }\n}",
      "typescript": "function lengthOfLIS(nums: number[]): number {\n  const tails: number[] = [];\n  for (const x of nums) {\n    let l = 0, r = tails.length;\n    while (l < r) {\n      const mid = Math.floor((l + r) / 2);\n      if (tails[mid] < x) l = mid + 1;\n      else r = mid;\n    }\n    if (l === tails.length) tails.push(x);\n    else tails[l] = x;\n  }\n  return tails.length;\n}"
    }
  },
  {
    "id": "dsa-27",
    "title": "Word Break",
    "difficulty": "Medium",
    "pattern_tag": "Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/word-break/",
    "striver_url": "https://takeuforward.org/data-structure/word-break-problem/",
    "youtube_url": "https://www.youtube.com/watch?v=Sx9NNgInc3A",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Bloomberg"
    ],
    "summary": "dp[i] is true if s[0...i] can be segmented; check for all split points j if dp[j] && s[j...i] in dictionary.",
    "description": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. The same word in the dictionary may be reused multiple times in the segmentation.",
    "examples": [
      {
        "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
        "output": "true",
        "explanation": "Return true because \"leetcode\" can be segmented as \"leet code\"."
      }
    ],
    "constraints": [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 20"
    ],
    "approach": "Let dp[i] represent if s[:i] can be segmented. dp[0] = true. For each i from 1 to len(s), check every prefix split j from 0 to i: if dp[j] is true and s[j:i] is in wordDict set, set dp[i] = true and break.",
    "timeComplexity": "O(n^2 * k) - Where n is string length and k is max word length",
    "spaceComplexity": "O(n + totalWordChars) - DP array and word set",
    "solutions": {
      "python": "class Solution:\n    def wordBreak(self, s: str, wordDict: list[str]) -> bool:\n        words = set(wordDict)\n        dp = [False] * (len(s) + 1)\n        dp[0] = True\n        for i in range(1, len(s) + 1):\n            for j in range(i):\n                if dp[j] and s[j:i] in words:\n                    dp[i] = True\n                    break\n        return dp[len(s)]",
      "cpp": "#include <string>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        unordered_set<string> dict(wordDict.begin(), wordDict.end());\n        vector<bool> dp(s.size() + 1, false);\n        dp[0] = true;\n        for (int i = 1; i <= s.size(); ++i) {\n            for (int j = 0; j < i; ++j) {\n                if (dp[j] && dict.count(s.substr(j, i - j))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[s.size()];\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        Set<String> set = new HashSet<>(wordDict);\n        boolean[] dp = new boolean[s.length() + 1];\n        dp[0] = true;\n        for (int i = 1; i <= s.length(); i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && set.contains(s.substring(j, i))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[s.length()];\n    }\n}",
      "typescript": "function wordBreak(s: string, wordDict: string[]): boolean {\n  const set = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && set.has(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}"
    }
  },
  {
    "id": "dsa-28",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "pattern_tag": "Stack & Queue",
    "leetcode_url": "https://leetcode.com/problems/valid-parentheses/",
    "striver_url": "https://takeuforward.org/data-structure/check-for-balanced-parentheses/",
    "youtube_url": "https://www.youtube.com/watch?v=WTzjTskDF30",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta"
    ],
    "summary": "Push opening brackets to stack; on closing bracket check if top matches, ensure stack is empty at end.",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order, and each closing bracket has a corresponding open bracket.",
    "examples": [
      {
        "input": "s = \"()[]{}\"",
        "output": "true"
      },
      {
        "input": "s = \"(]\"",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    "approach": "Push opening brackets onto a stack. When encountering a closing bracket, check whether the stack is non-empty and the top matches the opening counterpart. Return true if stack is empty when string finishes.",
    "timeComplexity": "O(n) - Single pass over characters",
    "spaceComplexity": "O(n) - Stack for bracket matching",
    "solutions": {
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')': '(', '}': '{', ']': '['}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else '#'\n                if mapping[char] != top:\n                    return False\n            else:\n                stack.append(char)\n        return not stack",
      "cpp": "#include <string>\n#include <stack>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else {\n                if (st.empty() || st.top() != c) return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};",
      "java": "import java.util.Stack;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}",
      "typescript": "function isValid(s: string): boolean {\n  const stack: string[] = [];\n  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };\n  for (const c of s) {\n    if (map[c]) {\n      if (stack.pop() !== map[c]) return false;\n    } else {\n      stack.push(c);\n    }\n  }\n  return stack.length === 0;\n}"
    }
  },
  {
    "id": "dsa-29",
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "pattern_tag": "Stack & Queue",
    "leetcode_url": "https://leetcode.com/problems/daily-temperatures/",
    "striver_url": "https://takeuforward.org/data-structure/next-greater-element-using-stack/",
    "youtube_url": "https://www.youtube.com/watch?v=cTBiBSnjO3c",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "summary": "Monotonic decreasing stack storing indices to resolve next warmer day for previous elements in O(n).",
    "description": "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
    "examples": [
      {
        "input": "temperatures = [73,74,75,71,69,72,76,73]",
        "output": "[1,1,4,2,1,1,0,0]"
      }
    ],
    "constraints": [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    "approach": "Use a monotonic decreasing stack storing day indices. For each day i, while stack is non-empty and temperatures[i] > temperatures[stack.top()], pop index prev and record res[prev] = i - prev. Push current day i onto stack.",
    "timeComplexity": "O(n) - Each index pushed and popped at most once",
    "spaceComplexity": "O(n) - Monotonic stack storage",
    "solutions": {
      "python": "class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        res = [0] * len(temperatures)\n        stack = [] # indices\n        for i, t in enumerate(temperatures):\n            while stack and t > temperatures[stack[-1]]:\n                prev_i = stack.pop()\n                res[prev_i] = i - prev_i\n            stack.append(i)\n        return res",
      "cpp": "#include <vector>\n#include <stack>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        int n = temperatures.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; ++i) {\n            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n                int prev = st.top(); st.pop();\n                res[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};",
      "java": "import java.util.Stack;\n\nclass Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] res = new int[n];\n        Stack<Integer> st = new Stack<>();\n        for (int i = 0; i < n; i++) {\n            while (!st.isEmpty() && temperatures[i] > temperatures[st.peek()]) {\n                int prev = st.pop();\n                res[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n}",
      "typescript": "function dailyTemperatures(temperatures: number[]): number[] {\n  const n = temperatures.length;\n  const res = new Array(n).fill(0);\n  const stack: number[] = [];\n  for (let i = 0; i < n; i++) {\n    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prev = stack.pop()!;\n      res[prev] = i - prev;\n    }\n    stack.push(i);\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-30",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "pattern_tag": "Heap / Priority Queue",
    "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "striver_url": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array/",
    "youtube_url": "https://www.youtube.com/watch?v=XEmy138764E",
    "companies": [
      "Meta",
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "summary": "Maintain a Min-Heap of size k: after all elements inserted, root is the k-th largest element in O(n log k).",
    "description": "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting in O(n) average time?",
    "examples": [
      {
        "input": "nums = [3,2,1,5,6,4], k = 2",
        "output": "5"
      },
      {
        "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "approach": "Maintain a min-heap of size k. Iterate through each number in nums: push number into heap; if heap size exceeds k, pop minimum element. At the end, the top of the heap is the k-th largest element.",
    "timeComplexity": "O(n log k) - Min-heap of size k processed for n elements",
    "spaceComplexity": "O(k) - Min-heap holds at most k elements",
    "solutions": {
      "python": "import heapq\n\nclass Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        heap = []\n        for num in nums:\n            heapq.heappush(heap, num)\n            if len(heap) > k:\n                heapq.heappop(heap)\n        return heap[0]",
      "cpp": "#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> minHeap;\n        for (int num : nums) {\n            minHeap.push(num);\n            if (minHeap.size() > k) minHeap.pop();\n        }\n        return minHeap.top();\n    }\n};",
      "java": "import java.util.PriorityQueue;\n\nclass Solution {\n    public int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        for (int num : nums) {\n            minHeap.offer(num);\n            if (minHeap.size() > k) minHeap.poll();\n        }\n        return minHeap.peek();\n    }\n}",
      "typescript": "function findKthLargest(nums: number[], k: number): number {\n  // QuickSelect or Sorting fallback for JS standard library\n  nums.sort((a, b) => b - a);\n  return nums[k - 1];\n}"
    }
  }
];
