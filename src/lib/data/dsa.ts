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
  "All",
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Linked List",
  "Trees & BST",
  "Trie",
  "Heap / Priority Queue",
  "Backtracking",
  "Graphs",
  "Advanced Graphs",
  "Dynamic Programming",
  "1-D Dynamic Programming",
  "2-D Dynamic Programming",
  "Greedy",
  "Intervals",
  "Stack & Queue",
  "Bit Manipulation",
  "Math & Geometry"
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
  },
  {
    "id": "dsa-31",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "pattern_tag": "Arrays & Hashing",
    "leetcode_url": "https://leetcode.com/problems/contains-duplicate/",
    "striver_url": "https://takeuforward.org/data-structure/contains-duplicate-check-if-a-value-appears-at-least-twice/",
    "youtube_url": "https://www.youtube.com/watch?v=3OamzN90kPg",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft"
    ],
    "summary": "Use a HashSet to detect duplicate values in a single pass O(n) time and O(n) space.",
    "description": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "true"
      },
      {
        "input": "nums = [1,2,3,4]",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "approach": "Iterate through nums while inserting into a hash set. If an element already exists in the set, return true. Otherwise return false after scanning all elements.",
    "timeComplexity": "O(n) - Single pass through the array",
    "spaceComplexity": "O(n) - Set stores at most n unique integers",
    "solutions": {
      "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        seen = set()\n        for n in nums:\n            if n in seen:\n                return True\n            seen.add(n)\n        return False",
      "cpp": "#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        for (int n : nums) {\n            if (seen.count(n)) return true;\n            seen.insert(n);\n        }\n        return false;\n    }\n};",
      "java": "import java.util.HashSet;\nimport java.util.Set;\n\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int n : nums) {\n            if (!seen.add(n)) return true;\n        }\n        return false;\n    }\n}",
      "typescript": "function containsDuplicate(nums: number[]): boolean {\n  const seen = new Set<number>();\n  for (const n of nums) {\n    if (seen.has(n)) return true;\n    seen.add(n);\n  }\n  return false;\n}"
    }
  },
  {
    "id": "dsa-32",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "pattern_tag": "Arrays & Hashing",
    "leetcode_url": "https://leetcode.com/problems/valid-anagram/",
    "striver_url": "https://takeuforward.org/data-structure/check-if-two-strings-are-anagrams-of-each-other/",
    "youtube_url": "https://www.youtube.com/watch?v=9UtInBqnCgA",
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google",
      "Meta"
    ],
    "summary": "Compare character frequencies using a fixed 26-element array or hash map in O(n) time.",
    "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word formed by rearranging the letters of a different word using all the original letters exactly once.",
    "examples": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "output": "true"
      },
      {
        "input": "s = \"rat\", t = \"car\"",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    "approach": "If lengths differ, return false immediately. Maintain an array of size 26. Increment frequency for characters in s, decrement for characters in t. Verify all counts equal zero.",
    "timeComplexity": "O(n) - Single pass over both strings",
    "spaceComplexity": "O(1) - Fixed 26-element array",
    "solutions": {
      "python": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t): return False\n        counts = [0] * 26\n        for c1, c2 in zip(s, t):\n            counts[ord(c1) - 97] += 1\n            counts[ord(c2) - 97] -= 1\n        return all(c == 0 for c in counts)",
      "cpp": "#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.size() != t.size()) return false;\n        vector<int> count(26, 0);\n        for (int i = 0; i < s.size(); ++i) {\n            count[s[i] - 'a']++;\n            count[t[i] - 'a']--;\n        }\n        for (int c : count) if (c != 0) return false;\n        return true;\n    }\n};",
      "java": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            count[s.charAt(i) - 'a']++;\n            count[t.charAt(i) - 'a']--;\n        }\n        for (int c : count) if (c != 0) return false;\n        return true;\n    }\n}",
      "typescript": "function isAnagram(s: string, t: string): boolean {\n  if (s.length !== t.length) return false;\n  const count = new Array(26).fill(0);\n  for (let i = 0; i < s.length; i++) {\n    count[s.charCodeAt(i) - 97]++;\n    count[t.charCodeAt(i) - 97]--;\n  }\n  return count.every(c => c === 0);\n}"
    }
  },
  {
    "id": "dsa-33",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "pattern_tag": "Arrays & Hashing",
    "leetcode_url": "https://leetcode.com/problems/group-anagrams/",
    "striver_url": "https://takeuforward.org/data-structure/group-anagrams/",
    "youtube_url": "https://www.youtube.com/watch?v=vzdNOK2oQ2E",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Hash strings using character count tuples or sorted representations as keys in O(n * k log k).",
    "description": "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    "examples": [
      {
        "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"
      }
    ],
    "constraints": [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    "approach": "Group strings using a hash map where the key is the sorted version of the string (or frequency tuple). Iterate through strs, compute the canonical key, and append to the list in map.",
    "timeComplexity": "O(n * k log k) - Where n is number of strings and k is max string length",
    "spaceComplexity": "O(n * k) - Hash map storing all strings",
    "solutions": {
      "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        from collections import defaultdict\n        groups = defaultdict(list)\n        for s in strs:\n            key = tuple(sorted(s))\n            groups[key].append(s)\n        return list(groups.values())",
      "cpp": "#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> map;\n        for (string& s : strs) {\n            string key = s;\n            sort(key.begin(), key.end());\n            map[key].push_back(s);\n        }\n        vector<vector<string>> res;\n        for (auto& pair : map) res.push_back(pair.second);\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] chars = s.toCharArray();\n            Arrays.sort(chars);\n            String key = new String(chars);\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}",
      "typescript": "function groupAnagrams(strs: string[]): string[][] {\n  const map = new Map<string, string[]>();\n  for (const s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key)!.push(s);\n  }\n  return Array.from(map.values());\n}"
    }
  },
  {
    "id": "dsa-34",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "pattern_tag": "Arrays & Hashing",
    "leetcode_url": "https://leetcode.com/problems/top-k-frequent-elements/",
    "striver_url": "https://takeuforward.org/data-structure/top-k-frequent-elements/",
    "youtube_url": "https://www.youtube.com/watch?v=YPTqKIgVk-v",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Use bucket sort indexed by frequency to achieve linear O(n) time complexity.",
    "description": "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    "examples": [
      {
        "input": "nums = [1,1,1,2,2,3], k = 2",
        "output": "[1,2]"
      },
      {
        "input": "nums = [1], k = 1",
        "output": "[1]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array]."
    ],
    "approach": "Count element frequencies with a hash map. Create buckets where bucket[i] contains numbers appearing i times. Traverse buckets backwards from n to 0 collecting numbers until k elements are retrieved.",
    "timeComplexity": "O(n) - Frequency counting and bucket sort traversal",
    "spaceComplexity": "O(n) - Buckets and frequency map",
    "solutions": {
      "python": "class Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        count = {}\n        for n in nums: count[n] = count.get(n, 0) + 1\n        buckets = [[] for _ in range(len(nums) + 1)]\n        for n, c in count.items():\n            buckets[c].append(n)\n        res = []\n        for i in range(len(buckets) - 1, 0, -1):\n            for n in buckets[i]:\n                res.append(n)\n                if len(res) == k: return res\n        return res",
      "cpp": "#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        unordered_map<int, int> count;\n        for (int n : nums) count[n]++;\n        vector<vector<int>> buckets(nums.size() + 1);\n        for (auto& p : count) buckets[p.second].push_back(p.first);\n        vector<int> res;\n        for (int i = buckets.size() - 1; i >= 0 && res.size() < k; --i) {\n            for (int num : buckets[i]) {\n                res.push_back(num);\n                if (res.size() == k) break;\n            }\n        }\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);\n        List<Integer>[] buckets = new List[nums.length + 1];\n        for (int key : count.keySet()) {\n            int freq = count.get(key);\n            if (buckets[freq] == null) buckets[freq] = new ArrayList<>();\n            buckets[freq].add(key);\n        }\n        int[] res = new int[k];\n        int idx = 0;\n        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {\n            if (buckets[i] != null) {\n                for (int num : buckets[i]) {\n                    res[idx++] = num;\n                    if (idx == k) break;\n                }\n            }\n        }\n        return res;\n    }\n}",
      "typescript": "function topKFrequent(nums: number[], k: number): number[] {\n  const map = new Map<number, number>();\n  for (const n of nums) map.set(n, (map.get(n) || 0) + 1);\n  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);\n  for (const [num, freq] of map.entries()) {\n    buckets[freq].push(num);\n  }\n  const res: number[] = [];\n  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {\n    for (const n of buckets[i]) {\n      res.push(n);\n      if (res.length === k) break;\n    }\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-35",
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "pattern_tag": "Trie",
    "leetcode_url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "striver_url": "https://takeuforward.org/data-structure/implement-trie-1/",
    "youtube_url": "https://www.youtube.com/watch?v=oobqoCJlHA0",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Twitter"
    ],
    "summary": "Tree of character nodes with end-of-word flags enabling O(L) prefix search and insertion.",
    "description": "A trie (pronounced as \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class with insert, search, and startsWith.",
    "examples": [
      {
        "input": "trie.insert(\"apple\"); trie.search(\"apple\"); // return True; trie.startsWith(\"app\"); // return True",
        "output": "[true, true]"
      }
    ],
    "constraints": [
      "1 <= word.length, prefix.length <= 2000",
      "word and prefix consist only of lowercase English letters.",
      "At most 3 * 10^4 calls in total to insert, search, and startsWith."
    ],
    "approach": "Each TrieNode contains an array of 26 children references and a boolean isEnd flag. Insert creates missing nodes. Search and startsWith traverse downwards matching characters.",
    "timeComplexity": "O(L) - Where L is length of word or prefix",
    "spaceComplexity": "O(N * L) - Trie node allocations",
    "solutions": {
      "python": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word: str) -> None:\n        curr = self.root\n        for c in word:\n            if c not in curr.children:\n                curr.children[c] = TrieNode()\n            curr = curr.children[c]\n        curr.is_end = True\n    def search(self, word: str) -> bool:\n        curr = self.root\n        for c in word:\n            if c not in curr.children: return False\n            curr = curr.children[c]\n        return curr.is_end\n    def startsWith(self, prefix: str) -> bool:\n        curr = self.root\n        for c in prefix:\n            if c not in curr.children: return False\n            curr = curr.children[c]\n        return True",
      "cpp": "class Trie {\n    struct Node {\n        Node* children[26] = {nullptr};\n        bool isEnd = false;\n    };\n    Node* root;\npublic:\n    Trie() { root = new Node(); }\n    void insert(string word) {\n        Node* curr = root;\n        for (char c : word) {\n            if (!curr->children[c - 'a']) curr->children[c - 'a'] = new Node();\n            curr = curr->children[c - 'a'];\n        }\n        curr->isEnd = true;\n    }\n    bool search(string word) {\n        Node* curr = root;\n        for (char c : word) {\n            if (!curr->children[c - 'a']) return false;\n            curr = curr->children[c - 'a'];\n        }\n        return curr->isEnd;\n    }\n    bool startsWith(string prefix) {\n        Node* curr = root;\n        for (char c : prefix) {\n            if (!curr->children[c - 'a']) return false;\n            curr = curr->children[c - 'a'];\n        }\n        return true;\n    }\n};",
      "java": "class Trie {\n    private class Node {\n        Node[] children = new Node[26];\n        boolean isEnd = false;\n    }\n    private Node root = new Node();\n    public void insert(String word) {\n        Node curr = root;\n        for (char c : word.toCharArray()) {\n            if (curr.children[c - 'a'] == null) curr.children[c - 'a'] = new Node();\n            curr = curr.children[c - 'a'];\n        }\n        curr.isEnd = true;\n    }\n    public boolean search(String word) {\n        Node curr = root;\n        for (char c : word.toCharArray()) {\n            if (curr.children[c - 'a'] == null) return false;\n            curr = curr.children[c - 'a'];\n        }\n        return curr.isEnd;\n    }\n    public boolean startsWith(String prefix) {\n        Node curr = root;\n        for (char c : prefix.toCharArray()) {\n            if (curr.children[c - 'a'] == null) return false;\n            curr = curr.children[c - 'a'];\n        }\n        return true;\n    }\n}",
      "typescript": "class TrieNode {\n  children = new Map<string, TrieNode>();\n  isEnd = false;\n}\nclass Trie {\n  root = new TrieNode();\n  insert(word: string): void {\n    let curr = this.root;\n    for (const c of word) {\n      if (!curr.children.has(c)) curr.children.set(c, new TrieNode());\n      curr = curr.children.get(c)!;\n    }\n    curr.isEnd = true;\n  }\n  search(word: string): boolean {\n    let curr = this.root;\n    for (const c of word) {\n      if (!curr.children.has(c)) return false;\n      curr = curr.children.get(c)!;\n    }\n    return curr.isEnd;\n  }\n  startsWith(prefix: string): boolean {\n    let curr = this.root;\n    for (const c of prefix) {\n      if (!curr.children.has(c)) return false;\n      curr = curr.children.get(c)!;\n    }\n    return true;\n  }\n}"
    }
  },
  {
    "id": "dsa-36",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "pattern_tag": "Backtracking",
    "leetcode_url": "https://leetcode.com/problems/combination-sum/",
    "striver_url": "https://takeuforward.org/data-structure/combination-sum-1/",
    "youtube_url": "https://www.youtube.com/watch?v=GBKI9VSKdGg",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Backtracking with reuse: choose element again or advance index when target met.",
    "description": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.",
    "examples": [
      {
        "input": "candidates = [2,3,6,7], target = 7",
        "output": "[[2,2,3],[7]]"
      },
      {
        "input": "candidates = [2,3,5], target = 8",
        "output": "[[2,2,2,2],[2,3,3],[3,5]]"
      }
    ],
    "constraints": [
      "1 <= candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "All elements are distinct.",
      "1 <= target <= 40"
    ],
    "approach": "DFS state (index, current_combo, current_sum). If sum == target, record combination. If sum > target or index out of bounds, prune. Either pick candidate[index] again, or advance index to avoid duplicate permutations.",
    "timeComplexity": "O(2^t) - Exponential decision tree based on target",
    "spaceComplexity": "O(t / min(candidates)) - Maximum recursion depth",
    "solutions": {
      "python": "class Solution:\n    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:\n        res = []\n        def dfs(i, cur, total):\n            if total == target:\n                res.append(cur.copy())\n                return\n            if i >= len(candidates) or total > target:\n                return\n            cur.append(candidates[i])\n            dfs(i, cur, total + candidates[i])\n            cur.pop()\n            dfs(i + 1, cur, total)\n        dfs(0, [], 0)\n        return res",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\n    void dfs(int i, vector<int>& candidates, int target, vector<int>& cur, vector<vector<int>>& res) {\n        if (target == 0) { res.push_back(cur); return; }\n        if (i >= candidates.size() || target < 0) return;\n        cur.push_back(candidates[i]);\n        dfs(i, candidates, target - candidates[i], cur, res);\n        cur.pop_back();\n        dfs(i + 1, candidates, target, cur, res);\n    }\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        vector<vector<int>> res;\n        vector<int> cur;\n        dfs(0, candidates, target, cur, res);\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    private void dfs(int i, int[] candidates, int target, List<Integer> cur, List<List<Integer>> res) {\n        if (target == 0) { res.add(new ArrayList<>(cur)); return; }\n        if (i >= candidates.length || target < 0) return;\n        cur.add(candidates[i]);\n        dfs(i, candidates, target - candidates[i], cur, res);\n        cur.remove(cur.size() - 1);\n        dfs(i + 1, candidates, target, cur, res);\n    }\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        List<List<Integer>> res = new ArrayList<>();\n        dfs(0, candidates, target, new ArrayList<>(), res);\n        return res;\n    }\n}",
      "typescript": "function combinationSum(candidates: number[], target: number): number[][] {\n  const res: number[][] = [];\n  function dfs(i: number, cur: number[], total: number) {\n    if (total === target) { res.push([...cur]); return; }\n    if (i >= candidates.length || total > target) return;\n    cur.push(candidates[i]);\n    dfs(i, cur, total + candidates[i]);\n    cur.pop();\n    dfs(i + 1, cur, total);\n  }\n  dfs(0, [], 0);\n  return res;\n}"
    }
  },
  {
    "id": "dsa-37",
    "title": "Subsets",
    "difficulty": "Medium",
    "pattern_tag": "Backtracking",
    "leetcode_url": "https://leetcode.com/problems/subsets/",
    "striver_url": "https://takeuforward.org/data-structure/power-set-print-all-subsequences/",
    "youtube_url": "https://www.youtube.com/watch?v=REOH22Xwdlk",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Binary decision tree: for each index either include or exclude element in O(2^n).",
    "description": "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
      },
      {
        "input": "nums = [0]",
        "output": "[[],[0]]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All numbers are unique."
    ],
    "approach": "At each index i from 0 to n-1, branch into two decisions: include nums[i] in subset and recurse, then exclude nums[i] and recurse. When i == len(nums), append a copy of current subset to result.",
    "timeComplexity": "O(n * 2^n) - 2^n subsets of average length n",
    "spaceComplexity": "O(n) - Recursion stack depth",
    "solutions": {
      "python": "class Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        res = []\n        subset = []\n        def dfs(i):\n            if i >= len(nums):\n                res.append(subset.copy())\n                return\n            subset.append(nums[i])\n            dfs(i + 1)\n            subset.pop()\n            dfs(i + 1)\n        dfs(0)\n        return res",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\n    void dfs(int i, vector<int>& nums, vector<int>& sub, vector<vector<int>>& res) {\n        if (i >= nums.size()) { res.push_back(sub); return; }\n        sub.push_back(nums[i]);\n        dfs(i + 1, nums, sub, res);\n        sub.pop_back();\n        dfs(i + 1, nums, sub, res);\n    }\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> sub;\n        dfs(0, nums, sub, res);\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    private void dfs(int i, int[] nums, List<Integer> sub, List<List<Integer>> res) {\n        if (i >= nums.length) { res.add(new ArrayList<>(sub)); return; }\n        sub.add(nums[i]);\n        dfs(i + 1, nums, sub, res);\n        sub.remove(sub.size() - 1);\n        dfs(i + 1, nums, sub, res);\n    }\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> res = new ArrayList<>();\n        dfs(0, nums, new ArrayList<>(), res);\n        return res;\n    }\n}",
      "typescript": "function subsets(nums: number[]): number[][] {\n  const res: number[][] = [];\n  const sub: number[] = [];\n  function dfs(i: number) {\n    if (i >= nums.length) { res.push([...sub]); return; }\n    sub.push(nums[i]);\n    dfs(i + 1);\n    sub.pop();\n    dfs(i + 1);\n  }\n  dfs(0);\n  return res;\n}"
    }
  },
  {
    "id": "dsa-38",
    "title": "Word Search",
    "difficulty": "Medium",
    "pattern_tag": "Backtracking",
    "leetcode_url": "https://leetcode.com/problems/word-search/",
    "striver_url": "https://takeuforward.org/data-structure/word-search-problem/",
    "youtube_url": "https://www.youtube.com/watch?v=pfiQ_PS1g8E",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Uber"
    ],
    "summary": "DFS with grid in-place visited marking and backtrack restoration in O(m * n * 4^L).",
    "description": "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). The same letter cell may not be used more than once.",
    "examples": [
      {
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "output": "true"
      },
      {
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
        "output": "false"
      }
    ],
    "constraints": [
      "m == board.length, n == board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15"
    ],
    "approach": "Iterate every cell. If cell matches word[0], launch DFS(r, c, 0). Mark visited by temporarily changing character to '#'. Recurse in 4 cardinal directions for index + 1. Restore original character upon backtrack.",
    "timeComplexity": "O(m * n * 4^L) - Where L is word length",
    "spaceComplexity": "O(L) - Call stack depth equals word length",
    "solutions": {
      "python": "class Solution:\n    def exist(self, board: list[list[str]], word: str) -> bool:\n        rows, cols = len(board), len(board[0])\n        def dfs(r, c, i):\n            if i == len(word): return True\n            if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != word[i]:\n                return False\n            temp, board[r][c] = board[r][c], '#'\n            res = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or\n                   dfs(r, c+1, i+1) or dfs(r, c-1, i+1))\n            board[r][c] = temp\n            return res\n        for r in range(rows):\n            for c in range(cols):\n                if dfs(r, c, 0): return True\n        return False",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\n    bool dfs(vector<vector<char>>& b, const string& w, int r, int c, int i) {\n        if (i == w.size()) return true;\n        if (r < 0 || c < 0 || r >= b.size() || c >= b[0].size() || b[r][c] != w[i]) return false;\n        char temp = b[r][c];\n        b[r][c] = '#';\n        bool res = dfs(b, w, r+1, c, i+1) || dfs(b, w, r-1, c, i+1) ||\n                   dfs(b, w, r, c+1, i+1) || dfs(b, w, r, c-1, i+1);\n        b[r][c] = temp;\n        return res;\n    }\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        for (int r = 0; r < board.size(); ++r)\n            for (int c = 0; c < board[0].size(); ++c)\n                if (dfs(board, word, r, c, 0)) return true;\n        return false;\n    }\n};",
      "java": "class Solution {\n    private boolean dfs(char[][] b, String w, int r, int c, int i) {\n        if (i == w.length()) return true;\n        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] != w.charAt(i)) return false;\n        char temp = b[r][c];\n        b[r][c] = '#';\n        boolean res = dfs(b, w, r+1, c, i+1) || dfs(b, w, r-1, c, i+1) ||\n                      dfs(b, w, r, c+1, i+1) || dfs(b, w, r, c-1, i+1);\n        b[r][c] = temp;\n        return res;\n    }\n    public boolean exist(char[][] board, String word) {\n        for (int r = 0; r < board.length; r++)\n            for (int c = 0; c < board[0].length; c++)\n                if (dfs(board, word, r, c, 0)) return true;\n        return false;\n    }\n}",
      "typescript": "function exist(board: string[][], word: string): boolean {\n  const rows = board.length, cols = board[0].length;\n  function dfs(r: number, c: number, i: number): boolean {\n    if (i === word.length) return true;\n    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) return false;\n    const temp = board[r][c];\n    board[r][c] = '#';\n    const res = dfs(r+1, c, i+1) || dfs(r-1, c, i+1) || dfs(r, c+1, i+1) || dfs(r, c-1, i+1);\n    board[r][c] = temp;\n    return res;\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (dfs(r, c, 0)) return true;\n    }\n  }\n  return false;\n}"
    }
  },
  {
    "id": "dsa-39",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "pattern_tag": "Intervals",
    "leetcode_url": "https://leetcode.com/problems/merge-intervals/",
    "striver_url": "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/",
    "youtube_url": "https://www.youtube.com/watch?v=44H3cEC2fFM",
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Sort intervals by start time; merge overlapping intervals by extending the end boundary.",
    "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    "examples": [
      {
        "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        "output": "[[1,6],[8,10],[15,18]]"
      },
      {
        "input": "intervals = [[1,4],[4,5]]",
        "output": "[[1,5]]"
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    "approach": "Sort intervals by start time ascending. Iterate intervals: if the current interval starts before or at the previous interval's end, merge them by setting previous end = max(prev.end, curr.end). Otherwise, push current interval as a new entry.",
    "timeComplexity": "O(n log n) - Dominated by sorting intervals",
    "spaceComplexity": "O(n) - Merged intervals output array",
    "solutions": {
      "python": "class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        intervals.sort(key=lambda x: x[0])\n        merged = [intervals[0]]\n        for start, end in intervals[1:]:\n            prev_end = merged[-1][1]\n            if start <= prev_end:\n                merged[-1][1] = max(prev_end, end)\n            else:\n                merged.append([start, end])\n        return merged",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> merged = {intervals[0]};\n        for (int i = 1; i < intervals.size(); ++i) {\n            if (intervals[i][0] <= merged.back()[1]) {\n                merged.back()[1] = max(merged.back()[1], intervals[i][1]);\n            } else {\n                merged.push_back(intervals[i]);\n            }\n        }\n        return merged;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> merged = new ArrayList<>();\n        merged.add(intervals[0]);\n        for (int i = 1; i < intervals.length; i++) {\n            int[] last = merged.get(merged.size() - 1);\n            if (intervals[i][0] <= last[1]) {\n                last[1] = Math.max(last[1], intervals[i][1]);\n            } else {\n                merged.add(intervals[i]);\n            }\n        }\n        return merged.toArray(new int[merged.size()][]);\n    }\n}",
      "typescript": "function merge(intervals: number[][]): number[][] {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const merged: number[][] = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = merged[merged.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      merged.push(intervals[i]);\n    }\n  }\n  return merged;\n}"
    }
  },
  {
    "id": "dsa-40",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "pattern_tag": "Intervals",
    "leetcode_url": "https://leetcode.com/problems/insert-interval/",
    "striver_url": "https://takeuforward.org/data-structure/insert-interval-in-interval-list/",
    "youtube_url": "https://www.youtube.com/watch?v=A8NUOmlwOlM",
    "companies": [
      "Amazon",
      "Google",
      "LinkedIn",
      "Meta"
    ],
    "summary": "Three-phase linear scan: collect non-overlapping before, merge overlapping, then append after.",
    "description": "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] sorted in ascending order by starti. You are also given an interval newInterval = [start, end]. Insert newInterval into intervals such that intervals is still sorted in ascending order and intervals still does not have any overlapping intervals.",
    "examples": [
      {
        "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        "output": "[[1,5],[6,9]]"
      },
      {
        "input": "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        "output": "[[1,2],[3,10],[12,16]]"
      }
    ],
    "constraints": [
      "0 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "newInterval.length == 2"
    ],
    "approach": "Three steps in a single linear pass: 1) Add all intervals that end before newInterval begins. 2) While intervals overlap with newInterval, expand newInterval = [min(start), max(end)]. 3) Add newInterval, then add all remaining intervals.",
    "timeComplexity": "O(n) - Single pass over intervals",
    "spaceComplexity": "O(n) - Result array",
    "solutions": {
      "python": "class Solution:\n    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:\n        res = []\n        i, n = 0, len(intervals)\n        while i < n and intervals[i][1] < newInterval[0]:\n            res.append(intervals[i])\n            i += 1\n        while i < n and intervals[i][0] <= newInterval[1]:\n            newInterval[0] = min(newInterval[0], intervals[i][0])\n            newInterval[1] = max(newInterval[1], intervals[i][1])\n            i += 1\n        res.append(newInterval)\n        while i < n:\n            res.append(intervals[i])\n            i += 1\n        return res",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        vector<vector<int>> res;\n        int i = 0, n = intervals.size();\n        while (i < n && intervals[i][1] < newInterval[0]) res.push_back(intervals[i++]);\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = min(newInterval[0], intervals[i][0]);\n            newInterval[1] = max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.push_back(newInterval);\n        while (i < n) res.push_back(intervals[i++]);\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        List<int[]> res = new ArrayList<>();\n        int i = 0, n = intervals.length;\n        while (i < n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.add(newInterval);\n        while (i < n) res.add(intervals[i++]);\n        return res.toArray(new int[res.size()][]);\n    }\n}",
      "typescript": "function insert(intervals: number[][], newInterval: number[]): number[][] {\n  const res: number[][] = [];\n  let i = 0;\n  const n = intervals.length;\n  while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);\n  while (i < n && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n    i++;\n  }\n  res.push(newInterval);\n  while (i < n) res.push(intervals[i++]);\n  return res;\n}"
    }
  },
  {
    "id": "dsa-41",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "pattern_tag": "Intervals",
    "leetcode_url": "https://leetcode.com/problems/non-overlapping-intervals/",
    "striver_url": "https://takeuforward.org/data-structure/non-overlapping-intervals/",
    "youtube_url": "https://www.youtube.com/watch?v=nONCGxWoUfM",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "summary": "Greedy choice: sort by end time; keep intervals finishing earliest to minimize removals.",
    "description": "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    "examples": [
      {
        "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]",
        "output": "1",
        "explanation": "[1,3] can be removed and the rest of the intervals are non-overlapping."
      },
      {
        "input": "intervals = [[1,2],[1,2],[1,2]]",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^5",
      "intervals[i].length == 2"
    ],
    "approach": "Sort intervals by end times. Maintain prevEnd initialized to -infinity. If current start >= prevEnd, no overlap occurs so update prevEnd = current.end. Otherwise, increment removals count.",
    "timeComplexity": "O(n log n) - Sorting by end time",
    "spaceComplexity": "O(1) - Constant auxiliary pointers",
    "solutions": {
      "python": "class Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        intervals.sort(key=lambda x: x[1])\n        removals = 0\n        prev_end = float('-inf')\n        for start, end in intervals:\n            if start >= prev_end:\n                prev_end = end\n            else:\n                removals += 1\n        return removals",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {\n            return a[1] < b[1];\n        });\n        int removals = 0;\n        int prevEnd = -1e9;\n        for (auto& iv : intervals) {\n            if (iv[0] >= prevEnd) prevEnd = iv[1];\n            else removals++;\n        }\n        return removals;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n        int removals = 0;\n        int prevEnd = Integer.MIN_VALUE;\n        for (int[] iv : intervals) {\n            if (iv[0] >= prevEnd) prevEnd = iv[1];\n            else removals++;\n        }\n        return removals;\n    }\n}",
      "typescript": "function eraseOverlapIntervals(intervals: number[][]): number {\n  intervals.sort((a, b) => a[1] - b[1]);\n  let removals = 0;\n  let prevEnd = -Infinity;\n  for (const [start, end] of intervals) {\n    if (start >= prevEnd) prevEnd = end;\n    else removals++;\n  }\n  return removals;\n}"
    }
  },
  {
    "id": "dsa-42",
    "title": "Jump Game",
    "difficulty": "Medium",
    "pattern_tag": "Greedy",
    "leetcode_url": "https://leetcode.com/problems/jump-game/",
    "striver_url": "https://takeuforward.org/data-structure/jump-game-i/",
    "youtube_url": "https://www.youtube.com/watch?v=Yan0cv2cLy8",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Track max reachable index greedily; return true if max reachable >= last index.",
    "description": "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
    "examples": [
      {
        "input": "nums = [2,3,1,1,4]",
        "output": "true"
      },
      {
        "input": "nums = [3,2,1,0,4]",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 10^5"
    ],
    "approach": "Maintain maxReach = 0. Iterate i from 0 to n-1. If i > maxReach, we are stranded so return false. Update maxReach = max(maxReach, i + nums[i]). If maxReach >= n - 1, return true.",
    "timeComplexity": "O(n) - Single pass",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        max_reach = 0\n        for i, jump in enumerate(nums):\n            if i > max_reach: return False\n            max_reach = max(max_reach, i + jump)\n            if max_reach >= len(nums) - 1: return True\n        return True",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        int maxReach = 0;\n        for (int i = 0; i < nums.size(); ++i) {\n            if (i > maxReach) return false;\n            maxReach = max(maxReach, i + nums[i]);\n            if (maxReach >= nums.size() - 1) return true;\n        }\n        return true;\n    }\n};",
      "java": "class Solution {\n    public boolean canJump(int[] nums) {\n        int maxReach = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (i > maxReach) return false;\n            maxReach = Math.max(maxReach, i + nums[i]);\n            if (maxReach >= nums.length - 1) return true;\n        }\n        return true;\n    }\n}",
      "typescript": "function canJump(nums: number[]): boolean {\n  let maxReach = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > maxReach) return false;\n    maxReach = Math.max(maxReach, i + nums[i]);\n    if (maxReach >= nums.length - 1) return true;\n  }\n  return true;\n}"
    }
  },
  {
    "id": "dsa-43",
    "title": "Maximum Subarray (Kadane's Algorithm)",
    "difficulty": "Medium",
    "pattern_tag": "Greedy",
    "leetcode_url": "https://leetcode.com/problems/maximum-subarray/",
    "striver_url": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/",
    "youtube_url": "https://www.youtube.com/watch?v=5WZl3MMT0Eg",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft",
      "Meta"
    ],
    "summary": "Kadane's algorithm: reset running sum to 0 whenever negative in O(n) time and O(1) space.",
    "description": "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    "examples": [
      {
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6",
        "explanation": "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        "input": "nums = [1]",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "approach": "Maintain curSum = 0 and maxSum = nums[0]. For each number n: add n to curSum, update maxSum = max(maxSum, curSum). If curSum < 0, reset curSum to 0 because a negative prefix hurts future sums.",
    "timeComplexity": "O(n) - Single pass over array",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        max_sum = nums[0]\n        cur = 0\n        for n in nums:\n            cur = max(n, cur + n)\n            max_sum = max(max_sum, cur)\n        return max_sum",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSum = nums[0], cur = 0;\n        for (int n : nums) {\n            cur = max(n, cur + n);\n            maxSum = max(maxSum, cur);\n        }\n        return maxSum;\n    }\n};",
      "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSum = nums[0], cur = 0;\n        for (int n : nums) {\n            cur = Math.max(n, cur + n);\n            maxSum = Math.max(maxSum, cur);\n        }\n        return maxSum;\n    }\n}",
      "typescript": "function maxSubArray(nums: number[]): number {\n  let maxSum = nums[0], cur = 0;\n  for (const n of nums) {\n    cur = Math.max(n, cur + n);\n    maxSum = Math.max(maxSum, cur);\n  }\n  return maxSum;\n}"
    }
  },
  {
    "id": "dsa-44",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "pattern_tag": "Bit Manipulation",
    "leetcode_url": "https://leetcode.com/problems/number-of-1-bits/",
    "striver_url": "https://takeuforward.org/data-structure/count-number-of-set-bits/",
    "youtube_url": "https://www.youtube.com/watch?v=5Km3utixwZs",
    "companies": [
      "Amazon",
      "Apple",
      "Microsoft"
    ],
    "summary": "Brian Kernighan's trick: n & (n - 1) clears the lowest set bit in O(set bits) time.",
    "description": "Given a positive integer n, write a function that returns the number of set bits it has (also known as the Hamming weight).",
    "examples": [
      {
        "input": "n = 11",
        "output": "3",
        "explanation": "11 in binary is 1011, which has three set bits."
      }
    ],
    "constraints": [
      "1 <= n <= 2^31 - 1"
    ],
    "approach": "Use n = n & (n - 1) in a loop until n reaches 0. Each operation removes the lowest set bit, running in time proportional to the count of set bits (at most 32 operations).",
    "timeComplexity": "O(1) - At most 32 operations",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def hammingWeight(self, n: int) -> int:\n        count = 0\n        while n:\n            n &= (n - 1)\n            count += 1\n        return count",
      "cpp": "class Solution {\npublic:\n    int hammingWeight(int n) {\n        int count = 0;\n        while (n) {\n            n &= (n - 1);\n            count++;\n        }\n        return count;\n    }\n};",
      "java": "class Solution {\n    public int hammingWeight(int n) {\n        int count = 0;\n        while (n != 0) {\n            n &= (n - 1);\n            count++;\n        }\n        return count;\n    }\n}",
      "typescript": "function hammingWeight(n: number): number {\n  let count = 0;\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n  return count;\n}"
    }
  },
  {
    "id": "dsa-45",
    "title": "Counting Bits",
    "difficulty": "Easy",
    "pattern_tag": "Bit Manipulation",
    "leetcode_url": "https://leetcode.com/problems/counting-bits/",
    "striver_url": "https://takeuforward.org/data-structure/counting-bits/",
    "youtube_url": "https://www.youtube.com/watch?v=RyBM56RIWr8",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "summary": "DP relation: dp[i] = dp[i >> 1] + (i & 1) calculates set bits in linear O(n) time.",
    "description": "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    "examples": [
      {
        "input": "n = 2",
        "output": "[0,1,1]"
      },
      {
        "input": "n = 5",
        "output": "[0,1,1,2,1,2]"
      }
    ],
    "constraints": [
      "0 <= n <= 10^5"
    ],
    "approach": "Notice that i has the same number of set bits as (i >> 1) plus 1 if the last bit is set (i & 1). Compute ans[i] = ans[i >> 1] + (i & 1) from 1 to n.",
    "timeComplexity": "O(n) - Computes each value in O(1)",
    "spaceComplexity": "O(n) - Result array",
    "solutions": {
      "python": "class Solution:\n    def countBits(self, n: int) -> list[int]:\n        dp = [0] * (n + 1)\n        for i in range(1, n + 1):\n            dp[i] = dp[i >> 1] + (i & 1)\n        return dp",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> countBits(int n) {\n        vector<int> dp(n + 1, 0);\n        for (int i = 1; i <= n; ++i) {\n            dp[i] = dp[i >> 1] + (i & 1);\n        }\n        return dp;\n    }\n};",
      "java": "class Solution {\n    public int[] countBits(int n) {\n        int[] dp = new int[n + 1];\n        for (int i = 1; i <= n; i++) {\n            dp[i] = dp[i >> 1] + (i & 1);\n        }\n        return dp;\n    }\n}",
      "typescript": "function countBits(n: number): number[] {\n  const dp = new Array(n + 1).fill(0);\n  for (let i = 1; i <= n; i++) {\n    dp[i] = dp[i >> 1] + (i & 1);\n  }\n  return dp;\n}"
    }
  },
  {
    "id": "dsa-46",
    "title": "Missing Number",
    "difficulty": "Easy",
    "pattern_tag": "Bit Manipulation",
    "leetcode_url": "https://leetcode.com/problems/missing-number/",
    "striver_url": "https://takeuforward.org/data-structure/find-the-missing-number-in-an-array/",
    "youtube_url": "https://www.youtube.com/watch?v=WnPLSRLSANE",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta"
    ],
    "summary": "XOR all indices 0...n with array elements; duplicates cancel leaving the missing number in O(n).",
    "description": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    "examples": [
      {
        "input": "nums = [3,0,1]",
        "output": "2"
      },
      {
        "input": "nums = [0,1]",
        "output": "2"
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 10^4",
      "0 <= nums[i] <= n",
      "All the numbers of nums are unique."
    ],
    "approach": "XOR property: x ^ x = 0 and x ^ 0 = x. Compute res = n. For each index i and element nums[i], update res ^= i ^ nums[i]. All present numbers cancel out, leaving the missing number.",
    "timeComplexity": "O(n) - Single pass over array",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def missingNumber(self, nums: list[int]) -> int:\n        res = len(nums)\n        for i, n in enumerate(nums):\n            res ^= i ^ n\n        return res",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        int res = nums.size();\n        for (int i = 0; i < nums.size(); ++i) {\n            res ^= i ^ nums[i];\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    public int missingNumber(int[] nums) {\n        int res = nums.length;\n        for (int i = 0; i < nums.length; i++) {\n            res ^= i ^ nums[i];\n        }\n        return res;\n    }\n}",
      "typescript": "function missingNumber(nums: number[]): number {\n  let res = nums.length;\n  for (let i = 0; i < nums.length; i++) {\n    res ^= i ^ nums[i];\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-47",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "pattern_tag": "Math & Geometry",
    "leetcode_url": "https://leetcode.com/problems/rotate-image/",
    "striver_url": "https://takeuforward.org/data-structure/rotate-image-by-90-degree/",
    "youtube_url": "https://www.youtube.com/watch?v=fMSJSS7eO1w",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft"
    ],
    "summary": "Transpose matrix across diagonal, then reverse each row horizontally for in-place 90 deg clockwise rotation.",
    "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[[7,4,1],[8,5,2],[9,6,3]]"
      }
    ],
    "constraints": [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    "approach": "A 90-degree clockwise rotation is equivalent to two operations: 1) Transpose the matrix (swap matrix[i][j] with matrix[j][i]). 2) Reverse each row horizontally.",
    "timeComplexity": "O(n^2) - Touches each matrix cell twice",
    "spaceComplexity": "O(1) - Strictly in-place modification",
    "solutions": {
      "python": "class Solution:\n    def rotate(self, matrix: list[list[int]]) -> None:\n        n = len(matrix)\n        for i in range(n):\n            for j in range(i + 1, n):\n                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n        for row in matrix:\n            row.reverse()",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        int n = matrix.size();\n        for (int i = 0; i < n; ++i)\n            for (int j = i + 1; j < n; ++j)\n                swap(matrix[i][j], matrix[j][i]);\n        for (int i = 0; i < n; ++i)\n            reverse(matrix[i].begin(), matrix[i].end());\n    }\n};",
      "java": "class Solution {\n    public void rotate(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n / 2; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[i][n - 1 - j];\n                matrix[i][n - 1 - j] = temp;\n            }\n        }\n    }\n}",
      "typescript": "function rotate(matrix: number[][]): void {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      const temp = matrix[i][j];\n      matrix[i][j] = matrix[j][i];\n      matrix[j][i] = temp;\n    }\n  }\n  for (let i = 0; i < n; i++) {\n    matrix[i].reverse();\n  }\n}"
    }
  },
  {
    "id": "dsa-48",
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "pattern_tag": "Math & Geometry",
    "leetcode_url": "https://leetcode.com/problems/spiral-matrix/",
    "striver_url": "https://takeuforward.org/data-structure/spiral-traversal-of-matrix/",
    "youtube_url": "https://www.youtube.com/watch?v=BJnMZNwUk1M",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft"
    ],
    "summary": "Traverse boundary four edges (top, right, bottom, left) while shrinking boundaries inward.",
    "description": "Given an m x n matrix, return all elements of the matrix in spiral order.",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[1,2,3,6,9,8,7,4,5]"
      }
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 10"
    ],
    "approach": "Maintain 4 boundaries: top, bottom, left, right. Traverse top row (left->right), increment top. Traverse right col (top->bottom), decrement right. Traverse bottom row if top <= bottom (right->left), decrement bottom. Traverse left col if left <= right (bottom->top), increment left.",
    "timeComplexity": "O(m * n) - Visits every cell once",
    "spaceComplexity": "O(1) - Excluding output array",
    "solutions": {
      "python": "class Solution:\n    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:\n        res = []\n        top, bottom = 0, len(matrix) - 1\n        left, right = 0, len(matrix[0]) - 1\n        while top <= bottom and left <= right:\n            for c in range(left, right + 1): res.append(matrix[top][c])\n            top += 1\n            for r in range(top, bottom + 1): res.append(matrix[r][right])\n            right -= 1\n            if top <= bottom:\n                for c in range(right, left - 1, -1): res.append(matrix[bottom][c])\n                bottom -= 1\n            if left <= right:\n                for r in range(bottom, top - 1, -1): res.append(matrix[r][left])\n                left += 1\n        return res",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        vector<int> res;\n        int top = 0, bottom = matrix.size() - 1;\n        int left = 0, right = matrix[0].size() - 1;\n        while (top <= bottom && left <= right) {\n            for (int c = left; c <= right; ++c) res.push_back(matrix[top][c]);\n            top++;\n            for (int r = top; r <= bottom; ++r) res.push_back(matrix[r][right]);\n            right--;\n            if (top <= bottom) {\n                for (int c = right; c >= left; --c) res.push_back(matrix[bottom][c]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int r = bottom; r >= top; --r) res.push_back(matrix[r][left]);\n                left++;\n            }\n        }\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        while (top <= bottom && left <= right) {\n            for (int c = left; c <= right; c++) res.add(matrix[top][c]);\n            top++;\n            for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);\n            right--;\n            if (top <= bottom) {\n                for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);\n                left++;\n            }\n        }\n        return res;\n    }\n}",
      "typescript": "function spiralOrder(matrix: number[][]): number[] {\n  const res: number[] = [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) res.push(matrix[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);\n    right--;\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);\n      left++;\n    }\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-49",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "pattern_tag": "Math & Geometry",
    "leetcode_url": "https://leetcode.com/problems/set-matrix-zeroes/",
    "striver_url": "https://takeuforward.org/data-structure/set-matrix-zero/",
    "youtube_url": "https://www.youtube.com/watch?v=T41rL0L3Pnw",
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google",
      "Microsoft"
    ],
    "summary": "Use first row and first column as in-place markers to achieve O(1) auxiliary space.",
    "description": "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.",
    "examples": [
      {
        "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        "output": "[[1,0,1],[0,0,0],[1,0,1]]"
      }
    ],
    "constraints": [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 <= m, n <= 200"
    ],
    "approach": "Use matrix[0][j] and matrix[i][0] as storage markers for whether row i or column j should be zeroed. Track firstRowHasZero separately. Populate inner cells, then zero out inner cells, and finally zero first row/col as needed.",
    "timeComplexity": "O(m * n) - Two passes over matrix",
    "spaceComplexity": "O(1) - Constant auxiliary storage",
    "solutions": {
      "python": "class Solution:\n    def setZeroes(self, matrix: list[list[int]]) -> None:\n        rows, cols = len(matrix), len(matrix[0])\n        row_zero = False\n        for r in range(rows):\n            for c in range(cols):\n                if matrix[r][c] == 0:\n                    matrix[0][c] = 0\n                    if r > 0: matrix[r][0] = 0\n                    else: row_zero = True\n        for r in range(1, rows):\n            for c in range(1, cols):\n                if matrix[0][c] == 0 or matrix[r][0] == 0:\n                    matrix[r][c] = 0\n        if matrix[0][0] == 0:\n            for r in range(rows): matrix[r][0] = 0\n        if row_zero:\n            for c in range(cols): matrix[0][c] = 0",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        int rows = matrix.size(), cols = matrix[0].size();\n        bool rowZero = false;\n        for (int r = 0; r < rows; ++r) {\n            for (int c = 0; c < cols; ++c) {\n                if (matrix[r][c] == 0) {\n                    matrix[0][c] = 0;\n                    if (r > 0) matrix[r][0] = 0;\n                    else rowZero = true;\n                }\n            }\n        }\n        for (int r = 1; r < rows; ++r)\n            for (int c = 1; c < cols; ++c)\n                if (matrix[0][c] == 0 || matrix[r][0] == 0) matrix[r][c] = 0;\n        if (matrix[0][0] == 0)\n            for (int r = 0; r < rows; ++r) matrix[r][0] = 0;\n        if (rowZero)\n            for (int c = 0; c < cols; ++c) matrix[0][c] = 0;\n    }\n};",
      "java": "class Solution {\n    public void setZeroes(int[][] matrix) {\n        int rows = matrix.length, cols = matrix[0].length;\n        boolean rowZero = false;\n        for (int r = 0; r < rows; r++) {\n            for (int c = 0; c < cols; c++) {\n                if (matrix[r][c] == 0) {\n                    matrix[0][c] = 0;\n                    if (r > 0) matrix[r][0] = 0;\n                    else rowZero = true;\n                }\n            }\n        }\n        for (int r = 1; r < rows; r++)\n            for (int c = 1; c < cols; c++)\n                if (matrix[0][c] == 0 || matrix[r][0] == 0) matrix[r][c] = 0;\n        if (matrix[0][0] == 0)\n            for (int r = 0; r < rows; r++) matrix[r][0] = 0;\n        if (rowZero)\n            for (int c = 0; c < cols; c++) matrix[0][c] = 0;\n    }\n}",
      "typescript": "function setZeroes(matrix: number[][]): void {\n  const rows = matrix.length, cols = matrix[0].length;\n  let rowZero = false;\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (matrix[r][c] === 0) {\n        matrix[0][c] = 0;\n        if (r > 0) matrix[r][0] = 0;\n        else rowZero = true;\n      }\n    }\n  }\n  for (let r = 1; r < rows; r++) {\n    for (let c = 1; c < cols; c++) {\n      if (matrix[r][c] === 0 || matrix[r][c] === 0) matrix[r][c] = 0;\n    }\n  }\n  if (matrix[0][0] === 0) for (let r = 0; r < rows; r++) matrix[r][0] = 0;\n  if (rowZero) for (let c = 0; c < cols; c++) matrix[0][c] = 0;\n}"
    }
  },
  {
    "id": "dsa-50",
    "title": "House Robber",
    "difficulty": "Medium",
    "pattern_tag": "1-D Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/house-robber/",
    "striver_url": "https://takeuforward.org/data-structure/maximum-sum-of-non-adjacent-elements-dp-5/",
    "youtube_url": "https://www.youtube.com/watch?v=73r3KWiEvyk",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft"
    ],
    "summary": "State recurrence rob = max(rob1 + n, rob2) stored with two variables for O(1) space.",
    "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Return the maximum amount of money you can rob tonight without alerting the police.",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "4",
        "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 4."
      },
      {
        "input": "nums = [2,7,9,3,1]",
        "output": "12"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400"
    ],
    "approach": "Let rob1 be the max amount robbed up to house i - 2 and rob2 up to house i - 1. For current house n, max money is max(n + rob1, rob2). Slide the two variables forward.",
    "timeComplexity": "O(n) - Single pass through nums",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def rob(self, nums: list[int]) -> int:\n        rob1, rob2 = 0, 0\n        for n in nums:\n            temp = max(n + rob1, rob2)\n            rob1 = rob2\n            rob2 = temp\n        return rob2",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int rob1 = 0, rob2 = 0;\n        for (int n : nums) {\n            int temp = max(n + rob1, rob2);\n            rob1 = rob2;\n            rob2 = temp;\n        }\n        return rob2;\n    }\n};",
      "java": "class Solution {\n    public int rob(int[] nums) {\n        int rob1 = 0, rob2 = 0;\n        for (int n : nums) {\n            int temp = Math.max(n + rob1, rob2);\n            rob1 = rob2;\n            rob2 = temp;\n        }\n        return rob2;\n    }\n}",
      "typescript": "function rob(nums: number[]): number {\n  let rob1 = 0, rob2 = 0;\n  for (const n of nums) {\n    const temp = Math.max(n + rob1, rob2);\n    rob1 = rob2;\n    rob2 = temp;\n  }\n  return rob2;\n}"
    }
  },
  {
    "id": "dsa-51",
    "title": "House Robber II",
    "difficulty": "Medium",
    "pattern_tag": "1-D Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/house-robber-ii/",
    "striver_url": "https://takeuforward.org/data-structure/dynamic-programming-house-robber-dp-6/",
    "youtube_url": "https://www.youtube.com/watch?v=rWAJCfYYOvM",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "summary": "Break circular arrangement into two linear subproblems: rob(0...n-2) vs rob(1...n-1).",
    "description": "All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Adjacent houses have security systems connected. Return the maximum amount of money you can rob without alerting the police.",
    "examples": [
      {
        "input": "nums = [2,3,2]",
        "output": "3",
        "explanation": "You cannot rob house 1 and house 3 as they are adjacent."
      },
      {
        "input": "nums = [1,2,3,1]",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 1000"
    ],
    "approach": "Since house 0 and house n-1 are adjacent, you cannot rob both. Solve House Robber I for two sub-arrays: nums[1:] and nums[:-1]. If nums has 1 element, simply return nums[0]. Result is max(nums[0], helper(nums[1:]), helper(nums[:-1])).",
    "timeComplexity": "O(n) - Two passes over the array",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def rob(self, nums: list[int]) -> int:\n        if len(nums) == 1: return nums[0]\n        def helper(arr):\n            r1, r2 = 0, 0\n            for n in arr:\n                r1, r2 = r2, max(n + r1, r2)\n            return r2\n        return max(helper(nums[1:]), helper(nums[:-1]))",
      "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\n    int helper(const vector<int>& nums, int start, int end) {\n        int r1 = 0, r2 = 0;\n        for (int i = start; i <= end; ++i) {\n            int temp = max(nums[i] + r1, r2);\n            r1 = r2;\n            r2 = temp;\n        }\n        return r2;\n    }\npublic:\n    int rob(vector<int>& nums) {\n        int n = nums.size();\n        if (n == 1) return nums[0];\n        return max(helper(nums, 1, n - 1), helper(nums, 0, n - 2));\n    }\n};",
      "java": "class Solution {\n    private int helper(int[] nums, int start, int end) {\n        int r1 = 0, r2 = 0;\n        for (int i = start; i <= end; i++) {\n            int temp = Math.max(nums[i] + r1, r2);\n            r1 = r2;\n            r2 = temp;\n        }\n        return r2;\n    }\n    public int rob(int[] nums) {\n        if (nums.length == 1) return nums[0];\n        return Math.max(helper(nums, 1, nums.length - 1), helper(nums, 0, nums.length - 2));\n    }\n}",
      "typescript": "function rob(nums: number[]): number {\n  if (nums.length === 1) return nums[0];\n  function helper(start: number, end: number): number {\n    let r1 = 0, r2 = 0;\n    for (let i = start; i <= end; i++) {\n      const temp = Math.max(nums[i] + r1, r2);\n      r1 = r2;\n      r2 = temp;\n    }\n    return r2;\n  }\n  return Math.max(helper(1, nums.length - 1), helper(0, nums.length - 2));\n}"
    }
  },
  {
    "id": "dsa-52",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "pattern_tag": "1-D Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/longest-palindromic-substring/",
    "striver_url": "https://takeuforward.org/data-structure/longest-palindromic-substring/",
    "youtube_url": "https://www.youtube.com/watch?v=XYQecbcd6fY",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Expand around center for each of 2n-1 potential palindrome centers in O(n^2) and O(1) space.",
    "description": "Given a string s, return the longest palindromic substring in s.",
    "examples": [
      {
        "input": "s = \"babad\"",
        "output": "\"bab\"",
        "explanation": "\"aba\" is also a valid answer."
      },
      {
        "input": "s = \"cbbd\"",
        "output": "\"bb\""
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    "approach": "Every palindrome centers at either a single character (odd length) or between two characters (even length). For each index i, expand outward while characters match to find the maximum palindrome width.",
    "timeComplexity": "O(n^2) - Expand from n centers",
    "spaceComplexity": "O(1) - Constant auxiliary space",
    "solutions": {
      "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        res = \"\"\n        def expand(l, r):\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                l -= 1\n                r += 1\n            return s[l + 1:r]\n        for i in range(len(s)):\n            p1 = expand(i, i)\n            p2 = expand(i, i + 1)\n            if len(p1) > len(res): res = p1\n            if len(p2) > len(res): res = p2\n        return res",
      "cpp": "#include <string>\nusing namespace std;\n\nclass Solution {\n    string expand(const string& s, int l, int r) {\n        while (l >= 0 && r < s.size() && s[l] == s[r]) {\n            l--; r++;\n        }\n        return s.substr(l + 1, r - l - 1);\n    }\npublic:\n    string longestPalindrome(string s) {\n        string res = \"\";\n        for (int i = 0; i < s.size(); ++i) {\n            string s1 = expand(s, i, i);\n            string s2 = expand(s, i, i + 1);\n            if (s1.size() > res.size()) res = s1;\n            if (s2.size() > res.size()) res = s2;\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    private String expand(String s, int l, int r) {\n        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {\n            l--; r++;\n        }\n        return s.substring(l + 1, r);\n    }\n    public String longestPalindrome(String s) {\n        String res = \"\";\n        for (int i = 0; i < s.length(); i++) {\n            String s1 = expand(s, i, i);\n            String s2 = expand(s, i, i + 1);\n            if (s1.length() > res.length()) res = s1;\n            if (s2.length() > res.length()) res = s2;\n        }\n        return res;\n    }\n}",
      "typescript": "function longestPalindrome(s: string): string {\n  let res = '';\n  function expand(l: number, r: number): string {\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      l--; r++;\n    }\n    return s.slice(l + 1, r);\n  }\n  for (let i = 0; i < s.length; i++) {\n    const s1 = expand(i, i);\n    const s2 = expand(i, i + 1);\n    if (s1.length > res.length) res = s1;\n    if (s2.length > res.length) res = s2;\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-53",
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "pattern_tag": "1-D Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/palindromic-substrings/",
    "striver_url": "https://takeuforward.org/data-structure/count-palindromic-substrings/",
    "youtube_url": "https://www.youtube.com/watch?v=4RACzI5-du8",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "summary": "Count palindromes by expanding around all 2n-1 odd and even centers.",
    "description": "Given a string s, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.",
    "examples": [
      {
        "input": "s = \"abc\"",
        "output": "3",
        "explanation": "Three palindromic strings: \"a\", \"b\", \"c\"."
      },
      {
        "input": "s = \"aaa\"",
        "output": "6",
        "explanation": "Six palindromic strings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"."
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consists of lowercase English letters."
    ],
    "approach": "Iterate through all potential centers (i, i) and (i, i+1). From each center, expand outward as long as characters match, incrementing the total count each time.",
    "timeComplexity": "O(n^2) - Expanding at each index",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def countSubstrings(self, s: str) -> int:\n        res = 0\n        def count(l, r):\n            cnt = 0\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                cnt += 1\n                l -= 1\n                r += 1\n            return cnt\n        for i in range(len(s)):\n            res += count(i, i) + count(i, i + 1)\n        return res",
      "cpp": "class Solution {\n    int count(const string& s, int l, int r) {\n        int cnt = 0;\n        while (l >= 0 && r < s.size() && s[l] == s[r]) {\n            cnt++; l--; r++;\n        }\n        return cnt;\n    }\npublic:\n    int countSubstrings(string s) {\n        int res = 0;\n        for (int i = 0; i < s.size(); ++i) {\n            res += count(s, i, i) + count(s, i, i + 1);\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    private int count(String s, int l, int r) {\n        int cnt = 0;\n        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {\n            cnt++; l--; r++;\n        }\n        return cnt;\n    }\n    public int countSubstrings(String s) {\n        int res = 0;\n        for (int i = 0; i < s.length(); i++) {\n            res += count(s, i, i) + count(s, i, i + 1);\n        }\n        return res;\n    }\n}",
      "typescript": "function countSubstrings(s: string): number {\n  let res = 0;\n  function count(l: number, r: number): number {\n    let cnt = 0;\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      cnt++; l--; r++;\n    }\n    return cnt;\n  }\n  for (let i = 0; i < s.length; i++) {\n    res += count(i, i) + count(i, i + 1);\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-54",
    "title": "Decode Ways",
    "difficulty": "Medium",
    "pattern_tag": "1-D Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/decode-ways/",
    "striver_url": "https://takeuforward.org/data-structure/decode-ways/",
    "youtube_url": "https://www.youtube.com/watch?v=6aEyTjOwlJU",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Uber"
    ],
    "summary": "1D DP with single-digit (1-9) and two-digit (10-26) transition checks.",
    "description": "A message containing letters from A-Z can be encoded into numbers using 'A' -> \"1\", 'B' -> \"2\", ... 'Z' -> \"26\". Given a string s containing digits, return the number of ways to decode it.",
    "examples": [
      {
        "input": "s = \"12\"",
        "output": "2",
        "explanation": "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."
      },
      {
        "input": "s = \"226\"",
        "output": "3",
        "explanation": "\"226\" could be decoded as \"BZ\" (2 26), \"VF\" (22 6), or \"BBF\" (2 2 6)."
      },
      {
        "input": "s = \"06\"",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= s.length <= 100",
      "s contains only digits and may contain leading zero(s)."
    ],
    "approach": "dp[i] represents valid decodings for suffix starting at i. If s[i] == '0', dp[i] = 0. Otherwise dp[i] = dp[i+1], plus dp[i+2] if s[i:i+2] is between 10 and 26. Optimize to O(1) space using two variables.",
    "timeComplexity": "O(n) - Single pass through string",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def numDecodings(self, s: str) -> int:\n        dp1, dp2 = 1, 0\n        for i in range(len(s) - 1, -1, -1):\n            cur = 0 if s[i] == '0' else dp1\n            if i + 1 < len(s) and (s[i] == '1' or (s[i] == '2' and s[i+1] in '0123456')):\n                cur += dp2\n            dp1, dp2 = cur, dp1\n        return dp1",
      "cpp": "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numDecodings(string s) {\n        int dp1 = 1, dp2 = 0;\n        for (int i = s.size() - 1; i >= 0; --i) {\n            int cur = (s[i] == '0') ? 0 : dp1;\n            if (i + 1 < s.size() && (s[i] == '1' || (s[i] == '2' && s[i+1] <= '6'))) {\n                cur += dp2;\n            }\n            dp2 = dp1;\n            dp1 = cur;\n        }\n        return dp1;\n    }\n};",
      "java": "class Solution {\n    public int numDecodings(String s) {\n        int dp1 = 1, dp2 = 0;\n        for (int i = s.length() - 1; i >= 0; i--) {\n            int cur = (s.charAt(i) == '0') ? 0 : dp1;\n            if (i + 1 < s.length() && (s.charAt(i) == '1' || (s.charAt(i) == '2' && s.charAt(i+1) <= '6'))) {\n                cur += dp2;\n            }\n            dp2 = dp1;\n            dp1 = cur;\n        }\n        return dp1;\n    }\n}",
      "typescript": "function numDecodings(s: string): number {\n  let dp1 = 1, dp2 = 0;\n  for (let i = s.length - 1; i >= 0; i--) {\n    let cur = s[i] === '0' ? 0 : dp1;\n    if (i + 1 < s.length && (s[i] === '1' || (s[i] === '2' && s[i+1] <= '6'))) {\n      cur += dp2;\n    }\n    dp2 = dp1;\n    dp1 = cur;\n  }\n  return dp1;\n}"
    }
  },
  {
    "id": "dsa-55",
    "title": "Unique Paths",
    "difficulty": "Medium",
    "pattern_tag": "2-D Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/unique-paths/",
    "striver_url": "https://takeuforward.org/data-structure/grid-unique-paths-dp-on-grids-dp8/",
    "youtube_url": "https://www.youtube.com/watch?v=IlEsdxuD4lY",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Grid DP: row[c] = row[c] + row[c+1] traversing bottom-up in O(m * n) time and O(n) space.",
    "description": "There is a robot on an m x n grid. The robot is initially located at the top-left corner (grid[0][0]) and wants to reach bottom-right corner (grid[m - 1][n - 1]). The robot can only move either down or right at any point. Return the number of possible unique paths.",
    "examples": [
      {
        "input": "m = 3, n = 7",
        "output": "28"
      },
      {
        "input": "m = 3, n = 2",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= m, n <= 100"
    ],
    "approach": "At any cell (r, c), paths(r, c) = paths(r+1, c) + paths(r, c+1). Maintain a 1D row array of size n initialized to 1. For each row from bottom up, update row[c] = row[c] + row[c+1].",
    "timeComplexity": "O(m * n) - Visits each grid cell once",
    "spaceComplexity": "O(n) - Single 1D row array",
    "solutions": {
      "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        row = [1] * n\n        for _ in range(m - 1):\n            new_row = [1] * n\n            for j in range(n - 2, -1, -1):\n                new_row[j] = new_row[j + 1] + row[j]\n            row = new_row\n        return row[0]",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        vector<int> row(n, 1);\n        for (int i = 0; i < m - 1; ++i) {\n            for (int j = n - 2; j >= 0; --j) {\n                row[j] += row[j + 1];\n            }\n        }\n        return row[0];\n    }\n};",
      "java": "import java.util.Arrays;\n\nclass Solution {\n    public int uniquePaths(int m, int n) {\n        int[] row = new int[n];\n        Arrays.fill(row, 1);\n        for (int i = 0; i < m - 1; i++) {\n            for (int j = n - 2; j >= 0; j--) {\n                row[j] += row[j + 1];\n            }\n        }\n        return row[0];\n    }\n}",
      "typescript": "function uniquePaths(m: number, n: number): number {\n  const row = new Array(n).fill(1);\n  for (let i = 0; i < m - 1; i++) {\n    for (let j = n - 2; j >= 0; j--) {\n      row[j] += row[j + 1];\n    }\n  }\n  return row[0];\n}"
    }
  },
  {
    "id": "dsa-56",
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "pattern_tag": "2-D Dynamic Programming",
    "leetcode_url": "https://leetcode.com/problems/longest-common-subsequence/",
    "striver_url": "https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/",
    "youtube_url": "https://www.youtube.com/watch?v=Ua0GhsJSlWM",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft"
    ],
    "summary": "Classic 2D DP matrix: if chars match dp[i][j] = 1 + dp[i+1][j+1], else max(dp[i+1][j], dp[i][j+1]).",
    "description": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
    "examples": [
      {
        "input": "text1 = \"abcde\", text2 = \"ace\"",
        "output": "3",
        "explanation": "The longest common subsequence is \"ace\"."
      },
      {
        "input": "text1 = \"abc\", text2 = \"abc\"",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of lowercase English characters."
    ],
    "approach": "Build a (len1 + 1) x (len2 + 1) table. Traverse backwards: if text1[i] == text2[j], dp[i][j] = 1 + dp[i+1][j+1]; otherwise dp[i][j] = max(dp[i+1][j], dp[i][j+1]).",
    "timeComplexity": "O(m * n) - Matrix cells computed",
    "spaceComplexity": "O(m * n) - Can be optimized to O(min(m, n))",
    "solutions": {
      "python": "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]\n        for i in range(len(text1) - 1, -1, -1):\n            for j in range(len(text2) - 1, -1, -1):\n                if text1[i] == text2[j]:\n                    dp[i][j] = 1 + dp[i + 1][j + 1]\n                else:\n                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\n        return dp[0][0]",
      "cpp": "#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        int m = text1.size(), n = text2.size();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n        for (int i = m - 1; i >= 0; --i) {\n            for (int j = n - 1; j >= 0; --j) {\n                if (text1[i] == text2[j]) dp[i][j] = 1 + dp[i + 1][j + 1];\n                else dp[i][j] = max(dp[i + 1][j], dp[i][j + 1]);\n            }\n        }\n        return dp[0][0];\n    }\n};",
      "java": "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        int m = text1.length(), n = text2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        for (int i = m - 1; i >= 0; i--) {\n            for (int j = n - 1; j >= 0; j--) {\n                if (text1.charAt(i) == text2.charAt(j)) dp[i][j] = 1 + dp[i + 1][j + 1];\n                else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);\n            }\n        }\n        return dp[0][0];\n    }\n}",
      "typescript": "function longestCommonSubsequence(text1: string, text2: string): number {\n  const m = text1.length, n = text2.length;\n  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = m - 1; i >= 0; i--) {\n    for (let j = n - 1; j >= 0; j--) {\n      if (text1[i] === text2[j]) dp[i][j] = 1 + dp[i + 1][j + 1];\n      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);\n    }\n  }\n  return dp[0][0];\n}"
    }
  },
  {
    "id": "dsa-57",
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "pattern_tag": "Graphs",
    "leetcode_url": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    "striver_url": "https://takeuforward.org/graph/pacific-atlantic-water-flow/",
    "youtube_url": "https://www.youtube.com/watch?v=s-VKb831hk0",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Reverse DFS from Pacific (top/left) and Atlantic (bottom/right) ocean boundaries to find intersection.",
    "description": "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Water flows from any cell to adjacent cells equal or lower in height. Return a list of grid coordinates where water can flow to both oceans.",
    "examples": [
      {
        "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"
      }
    ],
    "constraints": [
      "m == heights.length, n == heights[r].length",
      "1 <= m, n <= 200",
      "0 <= heights[r][c] <= 10^5"
    ],
    "approach": "Instead of starting from every cell, flow water uphill starting from the ocean edges. Perform DFS/BFS from Pacific borders into pacific_visited set, and from Atlantic borders into atlantic_visited set. Return the intersection of both sets.",
    "timeComplexity": "O(m * n) - Each cell visited at most twice",
    "spaceComplexity": "O(m * n) - Two visited sets and recursion stack",
    "solutions": {
      "python": "class Solution:\n    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:\n        rows, cols = len(heights), len(heights[0])\n        pac, atl = set(), set()\n        def dfs(r, c, visit, prev_h):\n            if ((r, c) in visit or r < 0 or c < 0 or r >= rows or c >= cols or heights[r][c] < prev_h):\n                return\n            visit.add((r, c))\n            for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:\n                dfs(r + dr, c + dc, visit, heights[r][c])\n        for c in range(cols):\n            dfs(0, c, pac, heights[0][c])\n            dfs(rows - 1, c, atl, heights[rows - 1][c])\n        for r in range(rows):\n            dfs(r, 0, pac, heights[r][0])\n            dfs(r, cols - 1, atl, heights[r][cols - 1])\n        return [[r, c] for r in range(rows) for c in range(cols) if (r, c) in pac and (r, c) in atl]",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\n    int rows, cols;\n    void dfs(int r, int c, vector<vector<bool>>& vis, int prevH, const vector<vector<int>>& h) {\n        if (r < 0 || c < 0 || r >= rows || c >= cols || vis[r][c] || h[r][c] < prevH) return;\n        vis[r][c] = true;\n        dfs(r + 1, c, vis, h[r][c], h);\n        dfs(r - 1, c, vis, h[r][c], h);\n        dfs(r, c + 1, vis, h[r][c], h);\n        dfs(r, c - 1, vis, h[r][c], h);\n    }\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        rows = heights.size(); cols = heights[0].size();\n        vector<vector<bool>> pac(rows, vector<bool>(cols, false));\n        vector<vector<bool>> atl(rows, vector<bool>(cols, false));\n        for (int c = 0; c < cols; ++c) {\n            dfs(0, c, pac, heights[0][c], heights);\n            dfs(rows - 1, c, atl, heights[rows - 1][c], heights);\n        }\n        for (int r = 0; r < rows; ++r) {\n            dfs(r, 0, pac, heights[r][0], heights);\n            dfs(r, cols - 1, atl, heights[r][cols - 1], heights);\n        }\n        vector<vector<int>> res;\n        for (int r = 0; r < rows; ++r)\n            for (int c = 0; c < cols; ++c)\n                if (pac[r][c] && atl[r][c]) res.push_back({r, c});\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    private int rows, cols;\n    private void dfs(int r, int c, boolean[][] vis, int prevH, int[][] h) {\n        if (r < 0 || c < 0 || r >= rows || c >= cols || vis[r][c] || h[r][c] < prevH) return;\n        vis[r][c] = true;\n        dfs(r + 1, c, vis, h[r][c], h);\n        dfs(r - 1, c, vis, h[r][c], h);\n        dfs(r, c + 1, vis, h[r][c], h);\n        dfs(r, c - 1, vis, h[r][c], h);\n    }\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        rows = heights.length; cols = heights[0].length;\n        boolean[][] pac = new boolean[rows][cols];\n        boolean[][] atl = new boolean[rows][cols];\n        for (int c = 0; c < cols; c++) {\n            dfs(0, c, pac, heights[0][c], heights);\n            dfs(rows - 1, c, atl, heights[rows - 1][c], heights);\n        }\n        for (int r = 0; r < rows; r++) {\n            dfs(r, 0, pac, heights[r][0], heights);\n            dfs(r, cols - 1, atl, heights[r][cols - 1], heights);\n        }\n        List<List<Integer>> res = new ArrayList<>();\n        for (int r = 0; r < rows; r++)\n            for (int c = 0; c < cols; c++)\n                if (pac[r][c] && atl[r][c]) res.add(Arrays.asList(r, c));\n        return res;\n    }\n}",
      "typescript": "function pacificAtlantic(heights: number[][]): number[][] {\n  const rows = heights.length, cols = heights[0].length;\n  const pac = Array.from({ length: rows }, () => new Array(cols).fill(false));\n  const atl = Array.from({ length: rows }, () => new Array(cols).fill(false));\n  function dfs(r: number, c: number, vis: boolean[][], prevH: number) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || vis[r][c] || heights[r][c] < prevH) return;\n    vis[r][c] = true;\n    dfs(r + 1, c, vis, heights[r][c]);\n    dfs(r - 1, c, vis, heights[r][c]);\n    dfs(r, c + 1, vis, heights[r][c]);\n    dfs(r, c - 1, vis, heights[r][c]);\n  }\n  for (let c = 0; c < cols; c++) {\n    dfs(0, c, pac, heights[0][c]);\n    dfs(rows - 1, c, atl, heights[rows - 1][c]);\n  }\n  for (let r = 0; r < rows; r++) {\n    dfs(r, 0, pac, heights[r][0]);\n    dfs(r, cols - 1, atl, heights[r][cols - 1]);\n  }\n  const res: number[][] = [];\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (pac[r][c] && atl[r][c]) res.push([r, c]);\n    }\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-58",
    "title": "Clone Graph",
    "difficulty": "Medium",
    "pattern_tag": "Graphs",
    "leetcode_url": "https://leetcode.com/problems/clone-graph/",
    "striver_url": "https://takeuforward.org/graph/clone-graph/",
    "youtube_url": "https://www.youtube.com/watch?v=mQeF6bN8hMk",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Hash map old_to_new prevents cycles while recursively cloning nodes and neighbor pointers.",
    "description": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
    "examples": [
      {
        "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        "output": "[[2,4],[1,3],[2,4],[1,3]]"
      }
    ],
    "constraints": [
      "The number of nodes in the graph is in the range [0, 100].",
      "1 <= Node.val <= 100",
      "Node.val is unique for each node."
    ],
    "approach": "Use a hash map mapping old node -> newly cloned node. In DFS, if node is already cloned, return the clone from map. Otherwise create a clone, register it in the map, and recursively clone each neighbor into clone.neighbors.",
    "timeComplexity": "O(V + E) - Visits each vertex and edge once",
    "spaceComplexity": "O(V) - Hash map and recursion stack",
    "solutions": {
      "python": "class Solution:\n    def cloneGraph(self, node: 'Optional[Node]') -> 'Optional[Node]':\n        if not node: return None\n        old_to_new = {}\n        def dfs(curr):\n            if curr in old_to_new: return old_to_new[curr]\n            copy = Node(curr.val)\n            old_to_new[curr] = copy\n            for nei in curr.neighbors:\n                copy.neighbors.append(dfs(nei))\n            return copy\n        return dfs(node)",
      "cpp": "#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nclass Solution {\n    unordered_map<Node*, Node*> oldToNew;\npublic:\n    Node* cloneGraph(Node* node) {\n        if (!node) return nullptr;\n        if (oldToNew.count(node)) return oldToNew[node];\n        Node* copy = new Node(node->val);\n        oldToNew[node] = copy;\n        for (Node* nei : node->neighbors) {\n            copy->neighbors.push_back(cloneGraph(nei));\n        }\n        return copy;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    private Map<Node, Node> oldToNew = new HashMap<>();\n    public Node cloneGraph(Node node) {\n        if (node == null) return null;\n        if (oldToNew.containsKey(node)) return oldToNew.get(node);\n        Node copy = new Node(node.val);\n        oldToNew.put(node, copy);\n        for (Node nei : node.neighbors) {\n            copy.neighbors.add(cloneGraph(nei));\n        }\n        return copy;\n    }\n}",
      "typescript": "function cloneGraph(node: _Node | null): _Node | null {\n  if (!node) return null;\n  const oldToNew = new Map<_Node, _Node>();\n  function dfs(curr: _Node): _Node {\n    if (oldToNew.has(curr)) return oldToNew.get(curr)!;\n    const copy = new _Node(curr.val);\n    oldToNew.set(curr, copy);\n    for (const nei of curr.neighbors) {\n      copy.neighbors.push(dfs(nei));\n    }\n    return copy;\n  }\n  return dfs(node);\n}"
    }
  },
  {
    "id": "dsa-59",
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "pattern_tag": "Graphs",
    "leetcode_url": "https://leetcode.com/problems/course-schedule-ii/",
    "striver_url": "https://takeuforward.org/data-structure/course-schedule-i-and-ii-pre-requisite-tasks-topological-sort-bfs-g-24/",
    "youtube_url": "https://www.youtube.com/watch?v=Akt3glAwyfY",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Kahn's BFS topological sort with in-degree array: returns valid ordering or empty list if cycle.",
    "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible, return an empty array.",
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "output": "[0,1]"
      },
      {
        "input": "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        "output": "[0,2,1,3]"
      }
    ],
    "constraints": [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= numCourses * (numCourses - 1)",
      "prerequisites[i].length == 2"
    ],
    "approach": "Kahn's Algorithm (BFS): Calculate in-degrees of all courses. Push all courses with in-degree 0 into queue. Dequeue course, append to order, decrement neighbors' in-degree. When neighbor reaches 0, push to queue. If order size equals numCourses return order, else cycle exists so return [].",
    "timeComplexity": "O(V + E) - BFS topological sort",
    "spaceComplexity": "O(V + E) - Adjacency list and queue",
    "solutions": {
      "python": "class Solution:\n    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n        from collections import defaultdict, deque\n        adj = defaultdict(list)\n        in_degree = [0] * numCourses\n        for crs, pre in prerequisites:\n            adj[pre].append(crs)\n            in_degree[crs] += 1\n        q = deque([i for i in range(numCourses) if in_degree[i] == 0])\n        order = []\n        while q:\n            node = q.popleft()\n            order.append(node)\n            for nei in adj[node]:\n                in_degree[nei] -= 1\n                if in_degree[nei] == 0:\n                    q.append(nei)\n        return order if len(order) == numCourses else []",
      "cpp": "#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) if (inDegree[i] == 0) q.push(i);\n        vector<int> order;\n        while (!q.empty()) {\n            int node = q.front(); q.pop();\n            order.push_back(node);\n            for (int nei : adj[node]) {\n                if (--inDegree[nei] == 0) q.push(nei);\n            }\n        }\n        return order.size() == numCourses ? order : vector<int>();\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        List<Integer>[] adj = new List[numCourses];\n        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            adj[p[1]].add(p[0]);\n            inDegree[p[0]]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);\n        int[] order = new int[numCourses];\n        int idx = 0;\n        while (!q.isEmpty()) {\n            int node = q.poll();\n            order[idx++] = node;\n            for (int nei : adj[node]) {\n                if (--inDegree[nei] == 0) q.offer(nei);\n            }\n        }\n        return idx == numCourses ? order : new int[0];\n    }\n}",
      "typescript": "function findOrder(numCourses: number, prerequisites: number[][]): number[] {\n  const adj: number[][] = Array.from({ length: numCourses }, () => []);\n  const inDegree = new Array(numCourses).fill(0);\n  for (const [crs, pre] of prerequisites) {\n    adj[pre].push(crs);\n    inDegree[crs]++;\n  }\n  const q: number[] = [];\n  for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);\n  const order: number[] = [];\n  while (q.length > 0) {\n    const node = q.shift()!;\n    order.push(node);\n    for (const nei of adj[node]) {\n      inDegree[nei]--;\n      if (inDegree[nei] === 0) q.push(nei);\n    }\n  }\n  return order.length === numCourses ? order : [];\n}"
    }
  },
  {
    "id": "dsa-60",
    "title": "Graph Valid Tree",
    "difficulty": "Medium",
    "pattern_tag": "Advanced Graphs",
    "leetcode_url": "https://leetcode.com/problems/graph-valid-tree/",
    "striver_url": "https://takeuforward.org/graph/detect-cycle-in-an-undirected-graph-using-dfs/",
    "youtube_url": "https://www.youtube.com/watch?v=bXsUuownnoQ",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "A tree with n nodes must have exactly n - 1 edges and be fully connected with 0 cycles.",
    "description": "Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to check whether these edges make up a valid tree.",
    "examples": [
      {
        "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
        "output": "true"
      },
      {
        "input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
        "output": "false"
      }
    ],
    "constraints": [
      "1 <= n <= 2000",
      "0 <= edges.length <= 5000"
    ],
    "approach": "A valid tree must satisfy two conditions: 1) Number of edges must be exactly n - 1 (if edges.length != n - 1, return false immediately). 2) The graph must be fully connected without cycles. Perform DFS/BFS from node 0 and verify visited count equals n.",
    "timeComplexity": "O(V + E) - Standard graph traversal",
    "spaceComplexity": "O(V + E) - Adjacency list and visited set",
    "solutions": {
      "python": "class Solution:\n    def validTree(self, n: int, edges: list[list[int]]) -> bool:\n        if len(edges) != n - 1: return False\n        from collections import defaultdict\n        adj = defaultdict(list)\n        for u, v in edges:\n            adj[u].append(v)\n            adj[v].append(u)\n        visit = set()\n        def dfs(node, parent):\n            if node in visit: return False\n            visit.add(node)\n            for nei in adj[node]:\n                if nei == parent: continue\n                if not dfs(nei, node): return False\n            return True\n        return dfs(0, -1) and len(visit) == n",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\n    bool dfs(int node, int parent, vector<bool>& vis, const vector<vector<int>>& adj) {\n        vis[node] = true;\n        for (int nei : adj[node]) {\n            if (nei == parent) continue;\n            if (vis[nei]) return false;\n            if (!dfs(nei, node, vis, adj)) return false;\n        }\n        return true;\n    }\npublic:\n    bool validTree(int n, vector<vector<int>>& edges) {\n        if (edges.size() != n - 1) return false;\n        vector<vector<int>> adj(n);\n        for (auto& e : edges) {\n            adj[e[0]].push_back(e[1]);\n            adj[e[1]].push_back(e[0]);\n        }\n        vector<bool> vis(n, false);\n        if (!dfs(0, -1, vis, adj)) return false;\n        for (bool v : vis) if (!v) return false;\n        return true;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    private boolean dfs(int node, int parent, boolean[] vis, List<Integer>[] adj) {\n        vis[node] = true;\n        for (int nei : adj[node]) {\n            if (nei == parent) continue;\n            if (vis[nei]) return false;\n            if (!dfs(nei, node, vis, adj)) return false;\n        }\n        return true;\n    }\n    public boolean validTree(int n, int[][] edges) {\n        if (edges.length != n - 1) return false;\n        List<Integer>[] adj = new List[n];\n        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();\n        for (int[] e : edges) {\n            adj[e[0]].add(e[1]);\n            adj[e[1]].add(e[0]);\n        }\n        boolean[] vis = new boolean[n];\n        if (!dfs(0, -1, vis, adj)) return false;\n        for (boolean v : vis) if (!v) return false;\n        return true;\n    }\n}",
      "typescript": "function validTree(n: number, edges: number[][]): boolean {\n  if (edges.length !== n - 1) return false;\n  const adj: number[][] = Array.from({ length: n }, () => []);\n  for (const [u, v] of edges) {\n    adj[u].push(v);\n    adj[v].push(u);\n  }\n  const vis = new Array(n).fill(false);\n  function dfs(node: number, parent: number): boolean {\n    vis[node] = true;\n    for (const nei of adj[node]) {\n      if (nei === parent) continue;\n      if (vis[nei]) return false;\n      if (!dfs(nei, node)) return false;\n    }\n    return true;\n  }\n  if (!dfs(0, -1)) return false;\n  return vis.every(v => v === true);\n}"
    }
  },
  {
    "id": "dsa-61",
    "title": "Design Add and Search Words Data Structure",
    "difficulty": "Medium",
    "pattern_tag": "Trie",
    "leetcode_url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "striver_url": "https://takeuforward.org/data-structure/implement-trie-ii/",
    "youtube_url": "https://www.youtube.com/watch?v=BTf05gs_8iU",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Trie with wildcard '.' backtrack matching across all 26 possible children.",
    "description": "Design a data structure that supports adding new words and finding if a string matches any previously added string. '.' can match any letter.",
    "examples": [
      {
        "input": "addWord(\"bad\"); addWord(\"dad\"); addWord(\"mad\"); search(\"pad\") -> false; search(\"bad\") -> true; search(\".ad\") -> true",
        "output": "[false, true, true]"
      }
    ],
    "constraints": [
      "1 <= word.length <= 25",
      "word in addWord consists of lowercase English letters.",
      "word in search consist of '.' or lowercase English letters."
    ],
    "approach": "Implement TrieNode with children dictionary and isWord flag. In search, if character is '.', branch DFS over all active children in current node. If specific character, step directly to child node.",
    "timeComplexity": "O(m) for add, O(26^k * m) worst-case wildcard search",
    "spaceComplexity": "O(N * m) - Trie node allocations",
    "solutions": {
      "python": "class WordDictionary:\n    def __init__(self):\n        self.root = {}\n    def addWord(self, word: str) -> None:\n        curr = self.root\n        for c in word:\n            curr = curr.setdefault(c, {})\n        curr['$'] = True\n    def search(self, word: str) -> bool:\n        def dfs(j, root):\n            curr = root\n            for i in range(j, len(word)):\n                c = word[i]\n                if c == '.':\n                    return any(dfs(i + 1, child) for k, child in curr.items() if k != '$')\n                if c not in curr: return False\n                curr = curr[c]\n            return '$' in curr\n        return dfs(0, self.root)",
      "cpp": "class WordDictionary {\n    struct Node {\n        Node* children[26] = {nullptr};\n        bool isEnd = false;\n    };\n    Node* root;\n    bool dfs(const string& w, int idx, Node* curr) {\n        if (!curr) return false;\n        if (idx == w.size()) return curr->isEnd;\n        if (w[idx] == '.') {\n            for (int i = 0; i < 26; ++i) {\n                if (curr->children[i] && dfs(w, idx + 1, curr->children[i])) return true;\n            }\n            return false;\n        }\n        return dfs(w, idx + 1, curr->children[w[idx] - 'a']);\n    }\npublic:\n    WordDictionary() { root = new Node(); }\n    void addWord(string word) {\n        Node* curr = root;\n        for (char c : word) {\n            if (!curr->children[c - 'a']) curr->children[c - 'a'] = new Node();\n            curr = curr->children[c - 'a'];\n        }\n        curr->isEnd = true;\n    }\n    bool search(string word) { return dfs(word, 0, root); }\n};",
      "java": "class WordDictionary {\n    private class Node {\n        Node[] children = new Node[26];\n        boolean isEnd = false;\n    }\n    private Node root = new Node();\n    public void addWord(String word) {\n        Node curr = root;\n        for (char c : word.toCharArray()) {\n            if (curr.children[c - 'a'] == null) curr.children[c - 'a'] = new Node();\n            curr = curr.children[c - 'a'];\n        }\n        curr.isEnd = true;\n    }\n    public boolean search(String word) { return dfs(word, 0, root); }\n    private boolean dfs(String w, int idx, Node curr) {\n        if (curr == null) return false;\n        if (idx == w.length()) return curr.isEnd;\n        char c = w.charAt(idx);\n        if (c == '.') {\n            for (int i = 0; i < 26; i++)\n                if (curr.children[i] != null && dfs(w, idx + 1, curr.children[i])) return true;\n            return false;\n        }\n        return dfs(w, idx + 1, curr.children[c - 'a']);\n    }\n}",
      "typescript": "class TrieNode {\n  children = new Map<string, TrieNode>();\n  isEnd = false;\n}\nclass WordDictionary {\n  root = new TrieNode();\n  addWord(word: string): void {\n    let curr = this.root;\n    for (const c of word) {\n      if (!curr.children.has(c)) curr.children.set(c, new TrieNode());\n      curr = curr.children.get(c)!;\n    }\n    curr.isEnd = true;\n  }\n  search(word: string): boolean {\n    function dfs(idx: number, curr: TrieNode): boolean {\n      if (idx === word.length) return curr.isEnd;\n      const c = word[idx];\n      if (c === '.') {\n        for (const child of curr.children.values()) {\n          if (dfs(idx + 1, child)) return true;\n        }\n        return false;\n      }\n      if (!curr.children.has(c)) return false;\n      return dfs(idx + 1, curr.children.get(c)!);\n    }\n    return dfs(0, this.root);\n  }\n}"
    }
  },
  {
    "id": "dsa-62",
    "title": "Word Search II",
    "difficulty": "Hard",
    "pattern_tag": "Trie",
    "leetcode_url": "https://leetcode.com/problems/word-search-ii/",
    "striver_url": "https://takeuforward.org/data-structure/word-search-ii/",
    "youtube_url": "https://www.youtube.com/watch?v=asbcE9mZz_U",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Prefix Trie + Grid Backtracking prunes dead search paths efficiently in O(m * n * 4^L).",
    "description": "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells.",
    "examples": [
      {
        "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]",
        "output": "[\"eat\",\"oath\"]"
      }
    ],
    "constraints": [
      "m == board.length, n == board[i].length",
      "1 <= m, n <= 12",
      "1 <= words.length <= 3 * 10^4",
      "1 <= words[i].length <= 10"
    ],
    "approach": "Load all words into a prefix Trie. Traverse the 2D grid: whenever board[r][c] matches a Trie child, launch DFS. When reaching a node marking a complete word, append word to results and clear flag to avoid duplicates. Restore board cell upon backtrack.",
    "timeComplexity": "O(m * n * 4^L) - Where L is max word length",
    "spaceComplexity": "O(total characters in words) - Trie space",
    "solutions": {
      "python": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.word = None\n\nclass Solution:\n    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:\n        root = TrieNode()\n        for w in words:\n            curr = root\n            for c in w:\n                curr = curr.children.setdefault(c, TrieNode())\n            curr.word = w\n        rows, cols = len(board), len(board[0])\n        res = []\n        def dfs(r, c, node):\n            if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] not in node.children:\n                return\n            ch = board[r][c]\n            next_node = node.children[ch]\n            if next_node.word:\n                res.append(next_node.word)\n                next_node.word = None\n            board[r][c] = '#'\n            for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:\n                dfs(r + dr, c + dc, next_node)\n            board[r][c] = ch\n        for r in range(rows):\n            for c in range(cols):\n                dfs(r, c, root)\n        return res",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\n    struct Node {\n        Node* children[26] = {nullptr};\n        string word = \"\";\n    };\n    Node* root = new Node();\n    void insert(const string& w) {\n        Node* curr = root;\n        for (char c : w) {\n            if (!curr->children[c - 'a']) curr->children[c - 'a'] = new Node();\n            curr = curr->children[c - 'a'];\n        }\n        curr->word = w;\n    }\n    void dfs(vector<vector<char>>& board, int r, int c, Node* curr, vector<string>& res) {\n        if (r < 0 || c < 0 || r >= board.size() || c >= board[0].size() || board[r][c] == '#') return;\n        char ch = board[r][c];\n        if (!curr->children[ch - 'a']) return;\n        curr = curr->children[ch - 'a'];\n        if (!curr->word.empty()) {\n            res.push_back(curr->word);\n            curr->word = \"\";\n        }\n        board[r][c] = '#';\n        dfs(board, r + 1, c, curr, res);\n        dfs(board, r - 1, c, curr, res);\n        dfs(board, r, c + 1, curr, res);\n        dfs(board, r, c - 1, curr, res);\n        board[r][c] = ch;\n    }\npublic:\n    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n        for (const string& w : words) insert(w);\n        vector<string> res;\n        for (int r = 0; r < board.size(); ++r)\n            for (int c = 0; c < board[0].size(); ++c)\n                dfs(board, r, c, root, res);\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    private class Node {\n        Node[] children = new Node[26];\n        String word = null;\n    }\n    private Node root = new Node();\n    private void insert(String w) {\n        Node curr = root;\n        for (char c : w.toCharArray()) {\n            if (curr.children[c - 'a'] == null) curr.children[c - 'a'] = new Node();\n            curr = curr.children[c - 'a'];\n        }\n        curr.word = w;\n    }\n    public List<String> findWords(char[][] board, String[] words) {\n        for (String w : words) insert(w);\n        List<String> res = new ArrayList<>();\n        for (int r = 0; r < board.length; r++)\n            for (int c = 0; c < board[0].length; c++)\n                dfs(board, r, c, root, res);\n        return res;\n    }\n    private void dfs(char[][] b, int r, int c, Node curr, List<String> res) {\n        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] == '#') return;\n        char ch = b[r][c];\n        if (curr.children[ch - 'a'] == null) return;\n        curr = curr.children[ch - 'a'];\n        if (curr.word != null) {\n            res.add(curr.word);\n            curr.word = null;\n        }\n        b[r][c] = '#';\n        dfs(b, r + 1, c, curr, res);\n        dfs(b, r - 1, c, curr, res);\n        dfs(b, r, c + 1, curr, res);\n        dfs(b, r, c - 1, curr, res);\n        b[r][c] = ch;\n    }\n}",
      "typescript": "function findWords(board: string[][], words: string[]): string[] {\n  class Node {\n    children = new Map<string, Node>();\n    word: string | null = null;\n  }\n  const root = new Node();\n  for (const w of words) {\n    let curr = root;\n    for (const c of w) {\n      if (!curr.children.has(c)) curr.children.set(c, new Node());\n      curr = curr.children.get(c)!;\n    }\n    curr.word = w;\n  }\n  const res: string[] = [];\n  const rows = board.length, cols = board[0].length;\n  function dfs(r: number, c: number, curr: Node) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || !curr.children.has(board[r][c])) return;\n    const ch = board[r][c];\n    const nextNode = curr.children.get(ch)!;\n    if (nextNode.word) {\n      res.push(nextNode.word);\n      nextNode.word = null;\n    }\n    board[r][c] = '#';\n    dfs(r + 1, c, nextNode);\n    dfs(r - 1, c, nextNode);\n    dfs(r, c + 1, nextNode);\n    dfs(r, c - 1, nextNode);\n    board[r][c] = ch;\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) dfs(r, c, root);\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-63",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "pattern_tag": "Heap / Priority Queue",
    "leetcode_url": "https://leetcode.com/problems/find-median-from-data-stream/",
    "striver_url": "https://takeuforward.org/data-structure/find-median-from-data-stream/",
    "youtube_url": "https://www.youtube.com/watch?v=itmhHWaHupI",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft"
    ],
    "summary": "Two heaps pattern: max-heap (lower half) and min-heap (upper half) maintain O(log n) insertion and O(1) median.",
    "description": "The median is the middle value in an ordered integer list. If the size of the list is even, the median is the mean of the two middle values. Implement the MedianFinder class.",
    "examples": [
      {
        "input": "addNum(1); addNum(2); findMedian() -> 1.5; addNum(3); findMedian() -> 2.0",
        "output": "[1.5, 2.0]"
      }
    ],
    "constraints": [
      "-10^5 <= num <= 10^5",
      "There will be at least one element before calling findMedian.",
      "At most 5 * 10^4 calls will be made to addNum and findMedian."
    ],
    "approach": "Maintain two heaps: small (max-heap for smaller half) and large (min-heap for larger half). Ensure max(small) <= min(large) and sizes differ by at most 1. Median is the root of the larger heap or average of roots.",
    "timeComplexity": "O(log n) for addNum, O(1) for findMedian",
    "spaceComplexity": "O(n) - Store all elements across two heaps",
    "solutions": {
      "python": "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = []  # max-heap (invert signs)\n        self.large = []  # min-heap\n    def addNum(self, num: int) -> None:\n        heapq.heappush(self.small, -num)\n        if self.small and self.large and (-self.small[0] > self.large[0]):\n            heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.small) > len(self.large) + 1:\n            heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small) + 1:\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large): return float(-self.small[0])\n        if len(self.large) > len(self.small): return float(self.large[0])\n        return (-self.small[0] + self.large[0]) / 2.0",
      "cpp": "#include <queue>\nusing namespace std;\n\nclass MedianFinder {\n    priority_queue<int> small; // max-heap\n    priority_queue<int, vector<int>, greater<int>> large; // min-heap\npublic:\n    MedianFinder() {}\n    void addNum(int num) {\n        small.push(num);\n        if (!small.empty() && !large.empty() && small.top() > large.top()) {\n            large.push(small.top()); small.pop();\n        }\n        if (small.size() > large.size() + 1) {\n            large.push(small.top()); small.pop();\n        }\n        if (large.size() > small.size() + 1) {\n            small.push(large.top()); large.pop();\n        }\n    }\n    double findMedian() {\n        if (small.size() > large.size()) return small.top();\n        if (large.size() > small.size()) return large.top();\n        return (small.top() + large.top()) / 2.0;\n    }\n};",
      "java": "import java.util.*;\n\nclass MedianFinder {\n    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    private PriorityQueue<Integer> large = new PriorityQueue<>();\n    public void addNum(int num) {\n        small.offer(num);\n        if (!small.isEmpty() && !large.isEmpty() && small.peek() > large.peek()) {\n            large.offer(small.poll());\n        }\n        if (small.size() > large.size() + 1) {\n            large.offer(small.poll());\n        }\n        if (large.size() > small.size() + 1) {\n            small.offer(large.poll());\n        }\n    }\n    public double findMedian() {\n        if (small.size() > large.size()) return small.peek();\n        if (large.size() > small.size()) return large.peek();\n        return (small.peek() + large.peek()) / 2.0;\n    }\n}",
      "typescript": "class MedianFinder {\n  private arr: number[] = [];\n  addNum(num: number): void {\n    let l = 0, r = this.arr.length;\n    while (l < r) {\n      const m = (l + r) >> 1;\n      if (this.arr[m] < num) l = m + 1;\n      else r = m;\n    }\n    this.arr.splice(l, 0, num);\n  }\n  findMedian(): number {\n    const n = this.arr.length;\n    const m = Math.floor(n / 2);\n    return n % 2 === 1 ? this.arr[m] : (this.arr[m - 1] + this.arr[m]) / 2;\n  }\n}"
    }
  },
  {
    "id": "dsa-64",
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "pattern_tag": "Heap / Priority Queue",
    "leetcode_url": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "striver_url": "https://takeuforward.org/data-structure/merge-k-sorted-linked-lists/",
    "youtube_url": "https://www.youtube.com/watch?v=q5a5OiGbT6Q",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Divide and conquer pairwise merging in O(N log k) time or min-heap of size k.",
    "description": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    "examples": [
      {
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "output": "[1,1,2,3,4,4,5,6]"
      },
      {
        "input": "lists = []",
        "output": "[]"
      }
    ],
    "constraints": [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4"
    ],
    "approach": "Pairwise merge lists using divide-and-conquer like merge sort. Take pairs of lists and merge them with mergeTwoLists, reducing list count by half each step until 1 list remains.",
    "timeComplexity": "O(N log k) - Where N is total nodes and k is number of lists",
    "spaceComplexity": "O(1) - In-place pointer modifications",
    "solutions": {
      "python": "class Solution:\n    def mergeKLists(self, lists: list[Optional[ListNode]]) -> Optional[ListNode]:\n        if not lists: return None\n        while len(lists) > 1:\n            merged = []\n            for i in range(0, len(lists), 2):\n                l1 = lists[i]\n                l2 = lists[i + 1] if i + 1 < len(lists) else None\n                merged.append(self.mergeTwo(l1, l2))\n            lists = merged\n        return lists[0]\n    def mergeTwo(self, l1, l2):\n        dummy = ListNode(0)\n        curr = dummy\n        while l1 and l2:\n            if l1.val < l2.val:\n                curr.next = l1\n                l1 = l1.next\n            else:\n                curr.next = l2\n                l2 = l2.next\n            curr = curr.next\n        curr.next = l1 or l2\n        return dummy.next",
      "cpp": "class Solution {\n    ListNode* mergeTwo(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0);\n        ListNode* curr = &dummy;\n        while (l1 && l2) {\n            if (l1->val < l2->val) { curr->next = l1; l1 = l1->next; }\n            else { curr->next = l2; l2 = l2->next; }\n            curr = curr->next;\n        }\n        curr->next = l1 ? l1 : l2;\n        return dummy.next;\n    }\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        if (lists.empty()) return nullptr;\n        int amount = lists.size();\n        int interval = 1;\n        while (interval < amount) {\n            for (int i = 0; i < amount - interval; i += interval * 2) {\n                lists[i] = mergeTwo(lists[i], lists[i + interval]);\n            }\n            interval *= 2;\n        }\n        return lists[0];\n    }\n};",
      "java": "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) return null;\n        return divide(lists, 0, lists.length - 1);\n    }\n    private ListNode divide(ListNode[] lists, int l, int r) {\n        if (l == r) return lists[l];\n        int m = l + (r - l) / 2;\n        ListNode l1 = divide(lists, l, m);\n        ListNode l2 = divide(lists, m + 1, r);\n        return mergeTwo(l1, l2);\n    }\n    private ListNode mergeTwo(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (l1 != null && l2 != null) {\n            if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }\n            else { curr.next = l2; l2 = l2.next; }\n            curr = curr.next;\n        }\n        curr.next = (l1 != null) ? l1 : l2;\n        return dummy.next;\n    }\n}",
      "typescript": "function mergeKLists(lists: Array<ListNode | null>): ListNode | null {\n  if (lists.length === 0) return null;\n  function mergeTwo(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n    const dummy = new ListNode(0);\n    let curr = dummy;\n    while (l1 && l2) {\n      if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }\n      else { curr.next = l2; l2 = l2.next; }\n      curr = curr.next;\n    }\n    curr.next = l1 || l2;\n    return dummy.next;\n  }\n  while (lists.length > 1) {\n    const merged: Array<ListNode | null> = [];\n    for (let i = 0; i < lists.length; i += 2) {\n      const l1 = lists[i];\n      const l2 = i + 1 < lists.length ? lists[i + 1] : null;\n      merged.push(mergeTwo(l1, l2));\n    }\n    lists = merged;\n  }\n  return lists[0];\n}"
    }
  },
  {
    "id": "dsa-65",
    "title": "Reorder List",
    "difficulty": "Medium",
    "pattern_tag": "Linked List",
    "leetcode_url": "https://leetcode.com/problems/reorder-list/",
    "striver_url": "https://takeuforward.org/data-structure/reorder-list/",
    "youtube_url": "https://www.youtube.com/watch?v=S5bfdUTrKLM",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Find middle with slow/fast, reverse second half, and interleave two halves in O(n) and O(1) space.",
    "description": "You are given the head of a singly linked-list. Reorder the list to be on the following form: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ... You may not modify the values in the list's nodes. Only nodes themselves may be changed.",
    "examples": [
      {
        "input": "head = [1,2,3,4]",
        "output": "[1,4,2,3]"
      },
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[1,5,2,4,3]"
      }
    ],
    "constraints": [
      "The number of nodes in the list is in the range [1, 5 * 10^4].",
      "1 <= Node.val <= 1000"
    ],
    "approach": "Three steps: 1) Find middle node using slow and fast pointers. 2) Reverse second half of the list starting after slow. 3) Interleave nodes from first half and reversed second half alternatingly.",
    "timeComplexity": "O(n) - Three linear passes",
    "spaceComplexity": "O(1) - Constant auxiliary pointers",
    "solutions": {
      "python": "class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        # 1. Find middle\n        slow, fast = head, head.next\n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n        # 2. Reverse second half\n        second = slow.next\n        slow.next = None\n        prev = None\n        while second:\n            nxt = second.next\n            second.next = prev\n            prev = second\n            second = nxt\n        # 3. Merge two halves\n        first, second = head, prev\n        while second:\n            t1, t2 = first.next, second.next\n            first.next = second\n            second.next = t1\n            first, second = t1, t2",
      "cpp": "class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        if (!head || !head->next) return;\n        ListNode *slow = head, *fast = head->next;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        ListNode *second = slow->next, *prev = nullptr;\n        slow->next = nullptr;\n        while (second) {\n            ListNode* nxt = second->next;\n            second->next = prev;\n            prev = second;\n            second = nxt;\n        }\n        ListNode *first = head;\n        second = prev;\n        while (second) {\n            ListNode *t1 = first->next, *t2 = second->next;\n            first->next = second;\n            second->next = t1;\n            first = t1; second = t2;\n        }\n    }\n};",
      "java": "class Solution {\n    public void reorderList(ListNode head) {\n        if (head == null || head.next == null) return;\n        ListNode slow = head, fast = head.next;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        ListNode second = slow.next, prev = null;\n        slow.next = null;\n        while (second != null) {\n            ListNode nxt = second.next;\n            second.next = prev;\n            prev = second;\n            second = nxt;\n        }\n        ListNode first = head;\n        second = prev;\n        while (second != null) {\n            ListNode t1 = first.next, t2 = second.next;\n            first.next = second;\n            second.next = t1;\n            first = t1; second = t2;\n        }\n    }\n}",
      "typescript": "function reorderList(head: ListNode | null): void {\n  if (!head || !head.next) return;\n  let slow: ListNode | null = head, fast: ListNode | null = head.next;\n  while (fast && fast.next) {\n    slow = slow!.next;\n    fast = fast.next.next;\n  }\n  let second = slow!.next, prev: ListNode | null = null;\n  slow!.next = null;\n  while (second) {\n    const nxt = second.next;\n    second.next = prev;\n    prev = second;\n    second = nxt;\n  }\n  let first: ListNode | null = head;\n  second = prev;\n  while (second) {\n    const t1 = first!.next, t2 = second.next;\n    first!.next = second;\n    second.next = t1;\n    first = t1;\n    second = t2;\n  }\n}"
    }
  },
  {
    "id": "dsa-66",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "pattern_tag": "Linked List",
    "leetcode_url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "striver_url": "https://takeuforward.org/data-structure/remove-n-th-node-from-the-end-of-a-linked-list/",
    "youtube_url": "https://www.youtube.com/watch?v=XVuQxV42SX8",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Two pointers with n gap: when right reaches end, left is precisely at the node before target.",
    "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5], n = 2",
        "output": "[1,2,3,5]"
      },
      {
        "input": "head = [1], n = 1",
        "output": "[]"
      }
    ],
    "constraints": [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "0 <= Node.val <= 100",
      "1 <= n <= sz"
    ],
    "approach": "Create a dummy node pointing to head. Advance right pointer n + 1 steps ahead of left pointer. Move both left and right simultaneously until right reaches nullptr. left.next now points to target node; unlink it with left.next = left.next.next.",
    "timeComplexity": "O(L) - One pass through linked list",
    "spaceComplexity": "O(1) - Constant auxiliary pointers",
    "solutions": {
      "python": "class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        dummy = ListNode(0, head)\n        left = dummy\n        right = head\n        for _ in range(n):\n            right = right.next\n        while right:\n            left = left.next\n            right = right.next\n        left.next = left.next.next\n        return dummy.next",
      "cpp": "class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode dummy(0, head);\n        ListNode *left = &dummy, *right = head;\n        for (int i = 0; i < n; ++i) right = right->next;\n        while (right) {\n            left = left->next;\n            right = right->next;\n        }\n        left->next = left->next->next;\n        return dummy.next;\n    }\n};",
      "java": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0, head);\n        ListNode left = dummy, right = head;\n        for (int i = 0; i < n; i++) right = right.next;\n        while (right != null) {\n            left = left.next;\n            right = right.next;\n        }\n        left.next = left.next.next;\n        return dummy.next;\n    }\n}",
      "typescript": "function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {\n  const dummy = new ListNode(0, head);\n  let left: ListNode | null = dummy, right = head;\n  for (let i = 0; i < n; i++) right = right!.next;\n  while (right) {\n    left = left!.next;\n    right = right.next;\n  }\n  left!.next = left!.next!.next;\n  return dummy.next;\n}"
    }
  },
  {
    "id": "dsa-67",
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "pattern_tag": "Linked List",
    "leetcode_url": "https://leetcode.com/problems/linked-list-cycle/",
    "striver_url": "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/",
    "youtube_url": "https://www.youtube.com/watch?v=gBTe7lFR3vc",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Floyd's cycle-finding (Tortoise and Hare): slow moves 1 step, fast moves 2 steps in O(n) and O(1) space.",
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it. Return true if there is a cycle, false otherwise.",
    "examples": [
      {
        "input": "head = [3,2,0,-4], pos = 1",
        "output": "true",
        "explanation": "There is a cycle in the linked list, where tail connects to the 1st node (0-indexed)."
      },
      {
        "input": "head = [1], pos = -1",
        "output": "false"
      }
    ],
    "constraints": [
      "The number of the nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5"
    ],
    "approach": "Floyd's Tortoise and Hare algorithm. Initialize slow and fast at head. While fast and fast.next are non-null: slow = slow.next, fast = fast.next.next. If slow == fast, a cycle exists. If loop terminates, no cycle exists.",
    "timeComplexity": "O(n) - Linear pass through list",
    "spaceComplexity": "O(1) - Constant auxiliary pointers",
    "solutions": {
      "python": "class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n            if slow == fast: return True\n        return False",
      "cpp": "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};",
      "java": "public class Solution {\n    public boolean hasCycle(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n}",
      "typescript": "function hasCycle(head: ListNode | null): boolean {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow!.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}"
    }
  },
  {
    "id": "dsa-68",
    "title": "Same Tree",
    "difficulty": "Easy",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/same-tree/",
    "striver_url": "https://takeuforward.org/data-structure/check-if-two-trees-are-identical/",
    "youtube_url": "https://www.youtube.com/watch?v=vRbbcKXCxOw",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "summary": "Recursive structure check: both null -> true; one null or values differ -> false; recurse left and right.",
    "description": "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
    "examples": [
      {
        "input": "p = [1,2,3], q = [1,2,3]",
        "output": "true"
      },
      {
        "input": "p = [1,2], q = [1,null,2]",
        "output": "false"
      }
    ],
    "constraints": [
      "The number of nodes in both trees is in the range [0, 100].",
      "-10^4 <= Node.val <= 10^4"
    ],
    "approach": "Base cases: if both p and q are null, return true. If exactly one is null or p.val != q.val, return false. Otherwise return isSameTree(p.left, q.left) and isSameTree(p.right, q.right).",
    "timeComplexity": "O(n) - Visits every node once",
    "spaceComplexity": "O(h) - Stack height bounded by tree height",
    "solutions": {
      "python": "class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        if not p and not q: return True\n        if not p or not q or p.val != q.val: return False\n        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)",
      "cpp": "class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        if (!p && !q) return true;\n        if (!p || !q || p->val != q->val) return false;\n        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\n    }\n};",
      "java": "class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        if (p == null && q == null) return true;\n        if (p == null || q == null || p.val != q.val) return false;\n        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n    }\n}",
      "typescript": "function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {\n  if (!p && !q) return true;\n  if (!p || !q || p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}"
    }
  },
  {
    "id": "dsa-69",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/invert-binary-tree/",
    "striver_url": "https://takeuforward.org/data-structure/invert-a-binary-tree/",
    "youtube_url": "https://www.youtube.com/watch?v=OnSn2XEQ4MY",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Recursively swap root.left and root.right subtrees across all nodes in O(n) time.",
    "description": "Given the root of a binary tree, invert the tree, and return its root.",
    "examples": [
      {
        "input": "root = [4,2,7,1,3,6,9]",
        "output": "[4,7,2,9,6,3,1]"
      },
      {
        "input": "root = [2,1,3]",
        "output": "[2,3,1]"
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "approach": "If root is null, return null. Swap root.left with root.right. Recursively call invertTree on both left and right subtrees.",
    "timeComplexity": "O(n) - Visits every node once",
    "spaceComplexity": "O(h) - Maximum depth of tree stack",
    "solutions": {
      "python": "class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root: return None\n        root.left, root.right = root.right, root.left\n        self.invertTree(root.left)\n        self.invertTree(root.right)\n        return root",
      "cpp": "class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (!root) return nullptr;\n        swap(root->left, root->right);\n        invertTree(root->left);\n        invertTree(root->right);\n        return root;\n    }\n};",
      "java": "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        TreeNode temp = root.left;\n        root.left = root.right;\n        root.right = temp;\n        invertTree(root.left);\n        invertTree(root.right);\n        return root;\n    }\n}",
      "typescript": "function invertTree(root: TreeNode | null): TreeNode | null {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = root.right;\n  root.right = temp;\n  invertTree(root.left);\n  invertTree(root.right);\n  return root;\n}"
    }
  },
  {
    "id": "dsa-70",
    "title": "Subtree of Another Tree",
    "difficulty": "Easy",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/subtree-of-another-tree/",
    "striver_url": "https://takeuforward.org/data-structure/check-if-a-tree-is-a-subtree-of-another-tree/",
    "youtube_url": "https://www.youtube.com/watch?v=E36O5SWp-LE",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Check if root matches subRoot using isSameTree; otherwise recurse down left or right subtrees.",
    "description": "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.",
    "examples": [
      {
        "input": "root = [3,4,5,1,2], subRoot = [4,1,2]",
        "output": "true"
      },
      {
        "input": "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
        "output": "false"
      }
    ],
    "constraints": [
      "The number of nodes in the root tree is in the range [1, 2000].",
      "The number of nodes in the subRoot tree is in the range [1, 1000]."
    ],
    "approach": "If subRoot is null, return true. If root is null, return false. If isSameTree(root, subRoot) is true, return true. Otherwise return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot).",
    "timeComplexity": "O(m * n) - Where m and n are node counts",
    "spaceComplexity": "O(h) - Stack depth bounded by tree height",
    "solutions": {
      "python": "class Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        if not subRoot: return True\n        if not root: return False\n        if self.sameTree(root, subRoot): return True\n        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)\n    def sameTree(self, s, t):\n        if not s and not t: return True\n        if not s or not t or s.val != t.val: return False\n        return self.sameTree(s.left, t.left) and self.sameTree(s.right, t.right)",
      "cpp": "class Solution {\n    bool sameTree(TreeNode* s, TreeNode* t) {\n        if (!s && !t) return true;\n        if (!s || !t || s->val != t->val) return false;\n        return sameTree(s->left, t->left) && sameTree(s->right, t->right);\n    }\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        if (!subRoot) return true;\n        if (!root) return false;\n        if (sameTree(root, subRoot)) return true;\n        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);\n    }\n};",
      "java": "class Solution {\n    public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n        if (subRoot == null) return true;\n        if (root == null) return false;\n        if (sameTree(root, subRoot)) return true;\n        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n    }\n    private boolean sameTree(TreeNode s, TreeNode t) {\n        if (s == null && t == null) return true;\n        if (s == null || t == null || s.val != t.val) return false;\n        return sameTree(s.left, t.left) && sameTree(s.right, t.right);\n    }\n}",
      "typescript": "function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {\n  if (!subRoot) return true;\n  if (!root) return false;\n  function same(s: TreeNode | null, t: TreeNode | null): boolean {\n    if (!s && !t) return true;\n    if (!s || !t || s.val !== t.val) return false;\n    return same(s.left, t.left) && same(s.right, t.right);\n  }\n  if (same(root, subRoot)) return true;\n  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n}"
    }
  },
  {
    "id": "dsa-71",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "striver_url": "https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/",
    "youtube_url": "https://www.youtube.com/watch?v=6ZnyEApgFYg",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "BFS queue processing node count len(queue) level by level in O(n) time.",
    "description": "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "[[3],[9,20],[15,7]]"
      },
      {
        "input": "root = [1]",
        "output": "[[1]]"
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    "approach": "Queue BFS: push root to queue. While queue has elements: capture level_size = len(queue). Pop exactly level_size nodes, add their values to current level array, and enqueue their non-null children.",
    "timeComplexity": "O(n) - Visits every node once",
    "spaceComplexity": "O(n) - Queue stores max level width (up to n/2 nodes)",
    "solutions": {
      "python": "class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:\n        if not root: return []\n        from collections import deque\n        q = deque([root])\n        res = []\n        while q:\n            level = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                level.append(node.val)\n                if node.left: q.append(node.left)\n                if node.right: q.append(node.right)\n            res.append(level)\n        return res",
      "cpp": "#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        if (!root) return {};\n        vector<vector<int>> res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int len = q.size();\n            vector<int> level;\n            for (int i = 0; i < len; ++i) {\n                TreeNode* node = q.front(); q.pop();\n                level.push_back(node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n            res.push_back(level);\n        }\n        return res;\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> res = new ArrayList<>();\n        if (root == null) return res;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        while (!q.isEmpty()) {\n            int len = q.size();\n            List<Integer> level = new ArrayList<>();\n            for (int i = 0; i < len; i++) {\n                TreeNode node = q.poll();\n                level.add(node.val);\n                if (node.left != null) q.offer(node.left);\n                if (node.right != null) q.offer(node.right);\n            }\n            res.add(level);\n        }\n        return res;\n    }\n}",
      "typescript": "function levelOrder(root: TreeNode | null): number[][] {\n  if (!root) return [];\n  const res: number[][] = [];\n  const q: TreeNode[] = [root];\n  while (q.length > 0) {\n    const len = q.length;\n    const level: number[] = [];\n    for (let i = 0; i < len; i++) {\n      const node = q.shift()!;\n      level.push(node.val);\n      if (node.left) q.push(node.left);\n      if (node.right) q.push(node.right);\n    }\n    res.push(level);\n  }\n  return res;\n}"
    }
  },
  {
    "id": "dsa-72",
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "striver_url": "https://takeuforward.org/data-structure/maximum-sum-path-in-binary-tree/",
    "youtube_url": "https://www.youtube.com/watch?v=Hr5cWUld4vU",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Post-order DFS: update max path through root with left + right + val, return val + max(left, right).",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. The path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
    "examples": [
      {
        "input": "root = [1,2,3]",
        "output": "6",
        "explanation": "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6."
      },
      {
        "input": "root = [-10,9,20,null,null,15,7]",
        "output": "42",
        "explanation": "The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [1, 3 * 10^4].",
      "-1000 <= Node.val <= 1000"
    ],
    "approach": "DFS post-order helper returns max contribution a subtree can send upwards: node.val + max(0, max(left, right)). Meanwhile, update global maximum with potential split path: node.val + max(0, left) + max(0, right).",
    "timeComplexity": "O(n) - Single DFS traversal",
    "spaceComplexity": "O(h) - Call stack bounded by height",
    "solutions": {
      "python": "class Solution:\n    def maxPathSum(self, root: Optional[TreeNode]) -> int:\n        res = [root.val]\n        def dfs(node):\n            if not node: return 0\n            left = max(0, dfs(node.left))\n            right = max(0, dfs(node.right))\n            res[0] = max(res[0], node.val + left + right)\n            return node.val + max(left, right)\n        dfs(root)\n        return res[0]",
      "cpp": "#include <algorithm>\nusing namespace std;\n\nclass Solution {\n    int maxSum;\n    int dfs(TreeNode* node) {\n        if (!node) return 0;\n        int left = max(0, dfs(node->left));\n        int right = max(0, dfs(node->right));\n        maxSum = max(maxSum, node->val + left + right);\n        return node->val + max(left, right);\n    }\npublic:\n    int maxPathSum(TreeNode* root) {\n        maxSum = root->val;\n        dfs(root);\n        return maxSum;\n    }\n};",
      "java": "class Solution {\n    private int maxSum = Integer.MIN_VALUE;\n    private int dfs(TreeNode node) {\n        if (node == null) return 0;\n        int left = Math.max(0, dfs(node.left));\n        int right = Math.max(0, dfs(node.right));\n        maxSum = Math.max(maxSum, node.val + left + right);\n        return node.val + Math.max(left, right);\n    }\n    public int maxPathSum(TreeNode root) {\n        dfs(root);\n        return maxSum;\n    }\n}",
      "typescript": "function maxPathSum(root: TreeNode | null): number {\n  let maxSum = -Infinity;\n  function dfs(node: TreeNode | null): number {\n    if (!node) return 0;\n    const left = Math.max(0, dfs(node.left));\n    const right = Math.max(0, dfs(node.right));\n    maxSum = Math.max(maxSum, node.val + left + right);\n    return node.val + Math.max(left, right);\n  }\n  dfs(root);\n  return maxSum;\n}"
    }
  },
  {
    "id": "dsa-73",
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "pattern_tag": "Trees & BST",
    "leetcode_url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    "striver_url": "https://takeuforward.org/data-structure/serialize-and-deserialize-a-binary-tree/",
    "youtube_url": "https://www.youtube.com/watch?v=u4JAi2JJhIg",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Pre-order DFS traversal recording 'N' for nulls produces deterministic string serialization.",
    "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link. Design an algorithm to serialize and deserialize a binary tree.",
    "examples": [
      {
        "input": "root = [1,2,3,null,null,4,5]",
        "output": "[1,2,3,null,null,4,5]"
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-1000 <= Node.val <= 1000"
    ],
    "approach": "Preorder traversal: serialize appends val or 'N' separated by commas. Deserialization iterates token by token: if token is 'N' return null; otherwise instantiate TreeNode with token value and recurse left then right.",
    "timeComplexity": "O(n) - Single pass serialization and deserialization",
    "spaceComplexity": "O(n) - String and recursion stack",
    "solutions": {
      "python": "class Codec:\n    def serialize(self, root):\n        res = []\n        def dfs(node):\n            if not node:\n                res.append(\"N\")\n                return\n            res.append(str(node.val))\n            dfs(node.left)\n            dfs(node.right)\n        dfs(root)\n        return \",\".join(res)\n    def deserialize(self, data):\n        vals = data.split(\",\")\n        self.i = 0\n        def dfs():\n            if vals[self.i] == \"N\":\n                self.i += 1\n                return None\n            node = TreeNode(int(vals[self.i]))\n            self.i += 1\n            node.left = dfs()\n            node.right = dfs()\n            return node\n        return dfs()",
      "cpp": "#include <string>\n#include <sstream>\n#include <vector>\nusing namespace std;\n\nclass Codec {\n    void rserialize(TreeNode* root, string& str) {\n        if (!root) str += \"N,\";\n        else {\n            str += to_string(root->val) + \",\";\n            rserialize(root->left, str);\n            rserialize(root->right, str);\n        }\n    }\n    TreeNode* rdeserialize(stringstream& ss) {\n        string val;\n        getline(ss, val, ',');\n        if (val == \"N\") return nullptr;\n        TreeNode* root = new TreeNode(stoi(val));\n        root->left = rdeserialize(ss);\n        root->right = rdeserialize(ss);\n        return root;\n    }\npublic:\n    string serialize(TreeNode* root) {\n        string str = \"\";\n        rserialize(root, str);\n        return str;\n    }\n    TreeNode* deserialize(string data) {\n        stringstream ss(data);\n        return rdeserialize(ss);\n    }\n};",
      "java": "import java.util.*;\n\npublic class Codec {\n    public String serialize(TreeNode root) {\n        StringBuilder sb = new StringBuilder();\n        buildString(root, sb);\n        return sb.toString();\n    }\n    private void buildString(TreeNode node, StringBuilder sb) {\n        if (node == null) sb.append(\"N,\");\n        else {\n            sb.append(node.val).append(\",\");\n            buildString(node.left, sb);\n            buildString(node.right, sb);\n        }\n    }\n    public TreeNode deserialize(String data) {\n        Deque<String> nodes = new LinkedList<>(Arrays.asList(data.split(\",\")));\n        return buildTree(nodes);\n    }\n    private TreeNode buildTree(Deque<String> nodes) {\n        String val = nodes.remove();\n        if (val.equals(\"N\")) return null;\n        TreeNode node = new TreeNode(Integer.parseInt(val));\n        node.left = buildTree(nodes);\n        node.right = buildTree(nodes);\n        return node;\n    }\n}",
      "typescript": "function serialize(root: TreeNode | null): string {\n  const res: string[] = [];\n  function dfs(node: TreeNode | null) {\n    if (!node) { res.push('N'); return; }\n    res.push(String(node.val));\n    dfs(node.left);\n    dfs(node.right);\n  }\n  dfs(root);\n  return res.join(',');\n}\nfunction deserialize(data: string): TreeNode | null {\n  const vals = data.split(',');\n  let i = 0;\n  function dfs(): TreeNode | null {\n    if (vals[i] === 'N') { i++; return null; }\n    const node = new TreeNode(Number(vals[i++]));\n    node.left = dfs();\n    node.right = dfs();\n    return node;\n  }\n  return dfs();\n}"
    }
  },
  {
    "id": "dsa-74",
    "title": "Min Stack",
    "difficulty": "Medium",
    "pattern_tag": "Stack & Queue",
    "leetcode_url": "https://leetcode.com/problems/min-stack/",
    "striver_url": "https://takeuforward.org/data-structure/implement-min-stack-o2n-and-on-space-complexity/",
    "youtube_url": "https://www.youtube.com/watch?v=qkLl7nAwDPo",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "summary": "Dual stack or value+currentMin pair in each stack node guarantees O(1) getMin.",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    "examples": [
      {
        "input": "minStack.push(-2); minStack.push(0); minStack.push(-3); minStack.getMin() -> -3; minStack.pop(); minStack.top() -> 0; minStack.getMin() -> -2",
        "output": "[-3, 0, -2]"
      }
    ],
    "constraints": [
      "-2^31 <= val <= 2^31 - 1",
      "Methods pop, top and getMin operations will always be called on non-empty stacks.",
      "At most 3 * 10^4 calls will be made to push, pop, top, and getMin."
    ],
    "approach": "Maintain two stacks: main stack storing pushed values and minStack storing running minimums. On push(val): append min(val, minStack[-1]) to minStack. On pop: pop both stacks simultaneously.",
    "timeComplexity": "O(1) for all operations",
    "spaceComplexity": "O(n) - Two stacks proportional to element count",
    "solutions": {
      "python": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        cur_min = min(val, self.min_stack[-1] if self.min_stack else val)\n        self.min_stack.append(cur_min)\n    def pop(self) -> None:\n        self.stack.pop()\n        self.min_stack.pop()\n    def top(self) -> int:\n        return self.stack[-1]\n    def getMin(self) -> int:\n        return self.min_stack[-1]",
      "cpp": "#include <stack>\nusing namespace std;\n\nclass MinStack {\n    stack<int> s, minS;\npublic:\n    MinStack() {}\n    void push(int val) {\n        s.push(val);\n        if (minS.empty() || val <= minS.top()) minS.push(val);\n        else minS.push(minS.top());\n    }\n    void pop() {\n        s.pop();\n        minS.pop();\n    }\n    int top() { return s.top(); }\n    int getMin() { return minS.top(); }\n};",
      "java": "import java.util.Stack;\n\nclass MinStack {\n    private Stack<Integer> s = new Stack<>();\n    private Stack<Integer> minS = new Stack<>();\n    public void push(int val) {\n        s.push(val);\n        int cur = minS.isEmpty() ? val : Math.min(val, minS.peek());\n        minS.push(cur);\n    }\n    public void pop() {\n        s.pop();\n        minS.pop();\n    }\n    public int top() { return s.peek(); }\n    public int getMin() { return minS.peek(); }\n}",
      "typescript": "class MinStack {\n  private stack: number[] = [];\n  private minStack: number[] = [];\n  push(val: number): void {\n    this.stack.push(val);\n    const cur = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);\n    this.minStack.push(cur);\n  }\n  pop(): void {\n    this.stack.pop();\n    this.minStack.pop();\n  }\n  top(): number { return this.stack[this.stack.length - 1]; }\n  getMin(): number { return this.minStack[this.minStack.length - 1]; }\n}"
    }
  },
  {
    "id": "dsa-75",
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "pattern_tag": "Bit Manipulation",
    "leetcode_url": "https://leetcode.com/problems/reverse-bits/",
    "striver_url": "https://takeuforward.org/data-structure/reverse-bits/",
    "youtube_url": "https://www.youtube.com/watch?v=UcoN6UjAI64",
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft"
    ],
    "summary": "Extract least significant bit and shift into result for 32 iterations in O(1) time.",
    "description": "Reverse bits of a given 32 bits unsigned integer.",
    "examples": [
      {
        "input": "n = 00000010100101000001111010011100",
        "output": "964176192 (00111001011110000010100101000000)"
      }
    ],
    "constraints": [
      "The input must be a binary string of length 32."
    ],
    "approach": "Iterate 32 times. In each iteration, extract lowest bit (n & 1), shift result left by 1 and OR with extracted bit, then shift n right by 1.",
    "timeComplexity": "O(1) - Exactly 32 operations",
    "spaceComplexity": "O(1) - Constant variables",
    "solutions": {
      "python": "class Solution:\n    def reverseBits(self, n: int) -> int:\n        res = 0\n        for _ in range(32):\n            res = (res << 1) | (n & 1)\n            n >>= 1\n        return res",
      "cpp": "class Solution {\npublic:\n    uint32_t reverseBits(uint32_t n) {\n        uint32_t res = 0;\n        for (int i = 0; i < 32; ++i) {\n            res = (res << 1) | (n & 1);\n            n >>= 1;\n        }\n        return res;\n    }\n};",
      "java": "public class Solution {\n    public int reverseBits(int n) {\n        int res = 0;\n        for (int i = 0; i < 32; i++) {\n            res = (res << 1) | (n & 1);\n            n >>>= 1;\n        }\n        return res;\n    }\n}",
      "typescript": "function reverseBits(n: number): number {\n  let res = 0;\n  for (let i = 0; i < 32; i++) {\n    res = (res * 2) + (n & 1);\n    n = Math.floor(n / 2);\n  }\n  return res;\n}"
    }
  }
];
