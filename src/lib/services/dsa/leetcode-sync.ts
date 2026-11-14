import fs from 'fs';
import path from 'path';
import os from 'os';
import { GoogleGenAI } from '@google/genai';
import type { DsaProblem, DsaSolutions, DsaExample } from '@/lib/data/dsa';

export interface LeetCodeRawQuestion {
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  content?: string;
  topicTags: Array<{ name: string }>;
  date?: string;
  link?: string;
}

export interface CustomProblemRecord extends DsaProblem {
  publishedAt: string;
  scheduledForDate?: string; // YYYY-MM-DD
  source?: string;
}

// In-memory cache to preserve custom problems across serverless invocations
const globalForDsa = globalThis as unknown as {
  __customDsaProblems?: CustomProblemRecord[];
};

/**
 * Resolves the writable file path for persisting custom DSA problems.
 * On serverless platforms (e.g. Vercel Lambda where /var/task is read-only),
 * safely redirects writes to os.tmpdir() / 'stackup_data'.
 */
function resolveStorageFile(): string {
  if (process.env.STORAGE_DIR) {
    return path.join(process.env.STORAGE_DIR, 'custom_dsa_problems.json');
  }

  const projectDataDir = path.join(process.cwd(), 'data');
  const projectFile = path.join(projectDataDir, 'custom_dsa_problems.json');

  try {
    if (!fs.existsSync(projectDataDir)) {
      fs.mkdirSync(projectDataDir, { recursive: true });
    }
    const testFile = path.join(projectDataDir, `.test_write_${process.pid}_${Date.now()}`);
    fs.writeFileSync(testFile, '1');
    fs.unlinkSync(testFile);
    return projectFile;
  } catch {
    // Read-only serverless environment (e.g. /var/task on Vercel)
    const tmpDataDir = path.join(os.tmpdir(), 'stackup_data');
    try {
      if (!fs.existsSync(tmpDataDir)) {
        fs.mkdirSync(tmpDataDir, { recursive: true });
      }
    } catch {
      // Ignore directory creation warnings in locked sandbox
    }
    return path.join(tmpDataDir, 'custom_dsa_problems.json');
  }
}

/**
 * Strips HTML tags and decodes common HTML entities to generate clean markdown.
 */
function cleanHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<strong class="example">/gi, '\n### ')
    .replace(/<\/strong>/gi, '')
    .replace(/<pre>/gi, '\n```\n')
    .replace(/<\/pre>/gi, '\n```\n')
    .replace(/<code>/gi, '`')
    .replace(/<\/code>/gi, '`')
    .replace(/<p>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<ul>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Fetches the active official LeetCode Daily Challenge.
 */
export async function fetchLeetCodeDailyChallenge(): Promise<LeetCodeRawQuestion | null> {
  const query = `
    query questionOfToday {
      activeDailyCodingChallengeQuestion {
        date
        link
        question {
          questionFrontendId
          title
          titleSlug
          difficulty
          topicTags { name }
          content
        }
      }
    }
  `;

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`LeetCode GraphQL request failed with HTTP ${res.status}`);
    }

    const json = await res.json();
    const data = json?.data?.activeDailyCodingChallengeQuestion;
    if (!data?.question) return null;

    return {
      questionFrontendId: data.question.questionFrontendId || '',
      title: data.question.title,
      titleSlug: data.question.titleSlug,
      difficulty: (data.question.difficulty as 'Easy' | 'Medium' | 'Hard') || 'Medium',
      content: cleanHtml(data.question.content || ''),
      topicTags: data.question.topicTags || [],
      date: data.date,
      link: data.link ? `https://leetcode.com${data.link}` : undefined,
    };
  } catch (err) {
    console.error('Failed to fetch LeetCode daily challenge:', err);
    return null;
  }
}

/**
 * Fetches any LeetCode problem by titleSlug or URL.
 */
export async function fetchLeetCodeQuestionBySlug(slugOrUrl: string): Promise<LeetCodeRawQuestion | null> {
  let slug = slugOrUrl.trim();
  if (slug.includes('leetcode.com/problems/')) {
    const match = slug.match(/leetcode\.com\/problems\/([^/]+)/);
    if (match) slug = match[1];
  }
  slug = slug.replace(/^\/+|\/+$/g, '').toLowerCase();

  const query = `
    query questionContent($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionFrontendId
        title
        titleSlug
        difficulty
        topicTags { name }
        content
      }
    }
  `;

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({ query, variables: { titleSlug: slug } }),
      cache: 'no-store',
    });

    if (!res.ok) return null;
    const json = await res.json();
    const q = json?.data?.question;
    if (!q) return null;

    return {
      questionFrontendId: q.questionFrontendId || '',
      title: q.title,
      titleSlug: q.titleSlug,
      difficulty: (q.difficulty as 'Easy' | 'Medium' | 'Hard') || 'Medium',
      content: cleanHtml(q.content || ''),
      topicTags: q.topicTags || [],
      link: `https://leetcode.com/problems/${q.titleSlug}/`,
    };
  } catch (err) {
    console.error('Failed to fetch LeetCode question by slug:', err);
    return null;
  }
}

/**
 * Uses Gemini to generate optimal multi-language solutions, explanation, and test cases.
 */
export async function generateSolutionsWithAI(raw: LeetCodeRawQuestion): Promise<{
  summary: string;
  pattern_tag: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutions: DsaSolutions;
  examples: DsaExample[];
  constraints: string[];
  companies: string[];
}> {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  // Primary: Google Gemini 2.5 Flash
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are a senior algorithms engineer at StackUp.
Format the following coding interview problem into clean, production-ready educational content.

Problem Title: ${raw.title}
Difficulty: ${raw.difficulty}
Topic Tags: ${raw.topicTags.map((t) => t.name).join(', ')}
Description:
${raw.content || ''}

Return a valid JSON object ONLY (no markdown code fence, no additional commentary) matching this schema:
{
  "summary": "1-sentence conceptual summary of the problem and technique",
  "pattern_tag": "Pick most relevant from: Arrays & Hashing, Two Pointers, Sliding Window, Binary Search, Linked List, Trees & BST, Trie, Heap / Priority Queue, Backtracking, Graphs, Dynamic Programming, Greedy, Intervals, Stack & Queue, Bit Manipulation, Math & Geometry",
  "companies": ["Array of 3-5 top companies that ask this, e.g. Amazon, Google, Microsoft, Meta"],
  "approach": "Clear step-by-step intuitive explanation of the optimal algorithm",
  "timeComplexity": "e.g. O(N log N) - explanation",
  "spaceComplexity": "e.g. O(1) or O(N) - explanation",
  "examples": [
    { "input": "...", "output": "...", "explanation": "..." }
  ],
  "constraints": ["Array of constraints strings"],
  "solutions": {
    "python": "Clean, complete, idiomatic Python 3 solution with Solution class",
    "cpp": "Clean, complete C++ solution with Solution class using vector/string",
    "java": "Clean, complete Java solution with Solution class",
    "typescript": "Clean, complete TypeScript solution function"
  }
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJsonText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonText);

      return {
        summary: parsed.summary || `Solve ${raw.title} optimally.`,
        pattern_tag: parsed.pattern_tag || raw.topicTags[0]?.name || 'Arrays & Hashing',
        approach: parsed.approach || 'Analyze input patterns, identify optimal state transitions or pointers, and minimize space overhead.',
        timeComplexity: parsed.timeComplexity || 'O(N)',
        spaceComplexity: parsed.spaceComplexity || 'O(1)',
        solutions: {
          python: parsed.solutions?.python || '# Solution in Python\nclass Solution:\n    def solve(self):\n        pass',
          cpp: parsed.solutions?.cpp || '// Solution in C++\nclass Solution {\npublic:\n};',
          java: parsed.solutions?.java || '// Solution in Java\npublic class Solution {\n}',
          typescript: parsed.solutions?.typescript || '// Solution in TypeScript\nfunction solve() {\n}',
        },
        examples: parsed.examples || [{ input: 'nums = [1, 2, 3]', output: 'true', explanation: 'Sample case' }],
        constraints: parsed.constraints || ['1 <= input.length <= 10^5'],
        companies: parsed.companies && parsed.companies.length > 0 ? parsed.companies : ['Amazon', 'Google', 'Microsoft'],
      };
    } catch (err) {
      console.warn('Gemini AI generation encountered an issue, falling back to structured templates:', err);
    }
  }

  // Fallback if Gemini key is missing or request fails
  const primaryTag = raw.topicTags[0]?.name || 'Arrays & Hashing';
  return {
    summary: `Optimal solution for ${raw.title} using ${primaryTag} techniques.`,
    pattern_tag: primaryTag,
    approach: `Identify boundary conditions and utilize ${primaryTag} to achieve an optimal pass across the input dataset.`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    solutions: {
      python: `# Python 3 Solution for ${raw.title}\nclass Solution:\n    def solve(self, nums):\n        # Implementation\n        return nums`,
      cpp: `// C++ Solution for ${raw.title}\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n    }\n};`,
      java: `// Java Solution for ${raw.title}\npublic class Solution {\n    public void solve() {\n    }\n}`,
      typescript: `// TypeScript Solution for ${raw.title}\nfunction solve(): void {\n}`,
    },
    examples: [{ input: 'input = [1, 2, 3]', output: 'output', explanation: 'Sample standard test case' }],
    constraints: ['1 <= n <= 10^5'],
    companies: ['Amazon', 'Google', 'Microsoft'],
  };
}

/**
 * Builds a complete DsaProblem object from raw LeetCode data and AI generation.
 */
export async function buildCompleteDsaProblem(raw: LeetCodeRawQuestion): Promise<DsaProblem> {
  const generated = await generateSolutionsWithAI(raw);
  const id = `dsa-${raw.titleSlug || raw.questionFrontendId || Date.now()}`;

  return {
    id,
    title: raw.title,
    difficulty: raw.difficulty,
    pattern_tag: generated.pattern_tag,
    leetcode_url: raw.link || `https://leetcode.com/problems/${raw.titleSlug}/`,
    striver_url: null,
    youtube_url: `https://www.youtube.com/results?search_query=${encodeURIComponent(raw.title + ' leetcode solution')}`,
    companies: generated.companies,
    summary: generated.summary,
    description: raw.content || `Solve ${raw.title}.`,
    examples: generated.examples,
    constraints: generated.constraints,
    approach: generated.approach,
    timeComplexity: generated.timeComplexity,
    spaceComplexity: generated.spaceComplexity,
    solutions: generated.solutions,
  };
}

/**
 * Reads all custom published problems, checking in-memory cache,
 * writable /tmp storage, and bundled project data file in order.
 */
export function getCustomDsaProblems(): CustomProblemRecord[] {
  if (globalForDsa.__customDsaProblems && Array.isArray(globalForDsa.__customDsaProblems)) {
    return globalForDsa.__customDsaProblems;
  }

  const candidatePaths = [
    resolveStorageFile(),
    path.join(process.cwd(), 'data', 'custom_dsa_problems.json'),
    path.join(os.tmpdir(), 'stackup_data', 'custom_dsa_problems.json'),
  ];

  for (const filePath of candidatePaths) {
    try {
      if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
        const raw = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          globalForDsa.__customDsaProblems = parsed;
          return parsed;
        }
      }
    } catch (err) {
      console.warn(`Notice: Unable to read custom DSA problems from ${filePath}:`, err);
    }
  }

  globalForDsa.__customDsaProblems = [];
  return [];
}

/**
 * Saves a new custom published problem with in-memory persistence and safe file writing.
 * Never throws ENOENT on read-only serverless filesystems.
 */
export function saveCustomDsaProblem(problem: DsaProblem, scheduledForDate?: string): CustomProblemRecord {
  const existing = getCustomDsaProblems();
  const dateKey = scheduledForDate || new Date().toISOString().slice(0, 10);

  const record: CustomProblemRecord = {
    ...problem,
    publishedAt: new Date().toISOString(),
    scheduledForDate: dateKey,
    source: 'admin_sync',
  };

  // Replace if exists for the same id or scheduled date, otherwise append
  const filtered = existing.filter((p) => p.id !== problem.id && p.scheduledForDate !== dateKey);
  filtered.unshift(record);

  // Update in-memory state immediately
  globalForDsa.__customDsaProblems = filtered;

  // Persist to disk safely
  try {
    const targetFile = resolveStorageFile();
    const dir = path.dirname(targetFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetFile, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Notice: Non-blocking in-memory fallback for custom DSA problem persistence:', err);
  }

  return record;
}

/**
 * Removes a custom published problem by ID with in-memory and disk updates.
 */
export function deleteCustomDsaProblem(id: string): boolean {
  const existing = getCustomDsaProblems();
  const filtered = existing.filter((p) => p.id !== id);
  globalForDsa.__customDsaProblems = filtered;

  try {
    const targetFile = resolveStorageFile();
    const dir = path.dirname(targetFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetFile, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Notice: Non-blocking in-memory fallback on deleting custom DSA problem:', err);
  }

  return true;
}
