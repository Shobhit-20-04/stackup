import { describe, it, expect } from 'vitest';
import {
  getAIConfiguration,
  retrieveRelevantKnowledge,
  buildSystemPrompt,
  validateSyntax,
  verifyCodeSnippet,
  sanitizeAndBudgetHistory,
  generateAIResponse,
  getAIProviderInfo,
} from '../src/lib/services/ai';

describe('StackUp AI Assistant — Comprehensive Evaluation Suite', () => {
  // ==========================================
  // Category A: Programming Correctness & Code Verification
  // ==========================================
  describe('Category A: Programming Correctness & Verification', () => {
    it('validates syntax and detects balanced vs unbalanced brackets in C++/Java/Python', () => {
      const validCode = `
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`;
      const validResult = validateSyntax(validCode, 'python');
      expect(validResult.valid).toBe(true);
      expect(validResult.issues.length).toBe(0);

      const brokenCode = `
int main() {
    vector<int> nums = {1, 2, 3;
    cout << nums[0] << endl;
`;
      const brokenResult = validateSyntax(brokenCode, 'cpp');
      expect(brokenResult.valid).toBe(false);
      expect(brokenResult.issues.length).toBeGreaterThan(0);
    });

    it('detects mixed tabs and spaces in Python code snippets', () => {
      const mixedCode = 'def solve():\n\tprint("tab")\n    print("spaces")';
      const result = validateSyntax(mixedCode, 'python');
      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.includes('Mixed tabs and spaces'))).toBe(true);
    });

    it('returns honest static verification disclaimer when code is not executed in sandbox', async () => {
      const code = 'const add = (a: number, b: number) => a + b;';
      const verification = await verifyCodeSnippet(code, 'typescript');
      expect(verification.syntaxValid).toBe(true);
      expect(verification.executedInSandbox).toBe(false);
      expect(verification.disclaimer).toContain('Runtime sandbox execution was not requested');
    });

    it('generates grounded DSA answers with correct Big-O complexity analysis', async () => {
      const response = await generateAIResponse({
        message: 'What is the optimal approach and complexity for Two Sum?',
        sectionContext: 'DSA Practice Hub',
      });

      expect(response.reply).toContain('Two Sum');
      expect(response.reply).toMatch(/O\(n\)/i);
      expect(response.sources.length).toBeGreaterThan(0);
      expect(response.sources[0].category).toContain('DSA');
    });
  });

  // ==========================================
  // Category B: Computer Science Fundamentals
  // ==========================================
  describe('Category B: Computer Science Fundamentals', () => {
    it('retrieves and answers Operating Systems deadlock questions with Coffman conditions', async () => {
      const response = await generateAIResponse({
        message: 'Explain deadlock and the 4 necessary conditions in Operating Systems',
        sectionContext: 'Core CS Subjects (OS, DBMS, CN)',
      });

      expect(response.reply).toContain('Deadlock');
      expect(response.reply).toContain('Mutual Exclusion');
      expect(response.reply).toContain('Hold and Wait');
      expect(response.reply).toContain('No Preemption');
      expect(response.reply).toContain('Circular Wait');
    });

    it('retrieves DBMS ACID transaction properties and isolation levels', async () => {
      const response = await generateAIResponse({
        message: 'What are ACID properties and transaction isolation levels in DBMS?',
        sectionContext: 'Core CS Subjects (OS, DBMS, CN)',
      });

      expect(response.reply).toContain('ACID');
      expect(response.reply).toContain('Atomicity');
      expect(response.reply).toContain('Consistency');
      expect(response.reply).toContain('Isolation');
      expect(response.reply).toContain('Durability');
    });

    it('retrieves Computer Networks TCP 3-way handshake sequence', async () => {
      const response = await generateAIResponse({
        message: 'How does the TCP 3-way handshake work?',
        sectionContext: 'Core CS Subjects',
      });

      expect(response.reply).toContain('SYN');
      expect(response.reply).toContain('SYN-ACK');
      expect(response.reply).toContain('ACK');
    });

    it('retrieves COA & TOC curriculum knowledge via RAG search', () => {
      const coaSources = retrieveRelevantKnowledge('pipeline hazards data forwarding');
      expect(coaSources.length).toBeGreaterThan(0);

      const tocSources = retrieveRelevantKnowledge('turing machines and undecidability');
      expect(tocSources.length).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // Category C: Mathematical Reasoning & Aptitude
  // ==========================================
  describe('Category C: Mathematical Reasoning & Aptitude', () => {
    it('retrieves quantitative aptitude formulas for permutations and combinations', async () => {
      const response = await generateAIResponse({
        message: 'Explain permutations and combinations formulas with example',
        sectionContext: 'Quantitative & Logical Aptitude',
      });

      expect(response.reply).toContain('Aptitude');
      expect(response.sources.some((s) => s.category.includes('Aptitude'))).toBe(true);
    });

    it('retrieves probability and time-and-work problem solving shortcuts', () => {
      const quantSources = retrieveRelevantKnowledge('shortcut for time and work efficiency');
      expect(quantSources.length).toBeGreaterThan(0);
      expect(quantSources[0].category).toContain('Aptitude');
    });
  });

  // ==========================================
  // Category D: StackUp-Specific Knowledge & Grounding
  // ==========================================
  describe('Category D: StackUp-Specific Knowledge & Grounding', () => {
    it('grounds answers in authentic StackUp problem IDs and URLs', () => {
      const sources = retrieveRelevantKnowledge('3Sum problem optimal solution');
      expect(sources.length).toBeGreaterThan(0);
      expect(sources[0].url).toMatch(/^\/dsa\//);
      expect(sources[0].title).toBe('3Sum');
      expect(sources[0].difficulty).toBe('Medium');
    });

    it('integrates personalized learning intelligence when student context is provided', async () => {
      const response = await generateAIResponse({
        message: 'What are my weak topics and what should I revise?',
        userId: 'student-demo',
        personalization: {
          userId: 'student-demo',
          activeMistakesCount: 3,
          weakTopics: ['Dynamic Programming (3 mistakes)', 'Binary Search (2 mistakes)'],
          dueRevisionsCount: 2,
          overdueRevisionsCount: 1,
          recentlyFailedProblems: ['Two Sum', 'Longest Common Subsequence'],
        },
      });

      expect(response.reply).toContain('Personalized Learning Intelligence Plan');
      expect(response.reply).toContain('Dynamic Programming');
      expect(response.reply).toContain('Binary Search');
      expect(response.reply).toContain('Profile Dashboard');
    });

    it('grounds ATS resume questions in STAR method and measurable outcomes', async () => {
      const response = await generateAIResponse({
        message: 'How should I format my resume bullets for ATS?',
        sectionContext: 'Resume ATS Checker',
      });

      expect(response.reply).toContain('STAR');
      expect(response.reply).toContain('Action Verb');
      expect(response.reply).toContain('Quantified');
    });
  });

  // ==========================================
  // Category E: Context Retention & Conversation Management
  // ==========================================
  describe('Category E: Context Retention & Conversation Budgeting', () => {
    it('budgets conversation turns and respects max token limits', () => {
      const longMessage = 'A'.repeat(2000);
      const rawHistory = [
        { role: 'user', content: longMessage },
        { role: 'assistant', content: longMessage },
        { role: 'user', content: 'Recent question' },
      ];

      const budgeted = sanitizeAndBudgetHistory(rawHistory, 6, 1200);
      // Newest message should always be preserved
      expect(budgeted.length).toBeGreaterThan(0);
      expect(budgeted[budgeted.length - 1].content).toBe('Recent question');
    });

    it('deduplicates immediate sequential duplicate user messages', () => {
      const duplicateHistory = [
        { role: 'user', content: 'What is BFS?' },
        { role: 'user', content: 'What is BFS?' },
        { role: 'assistant', content: 'BFS traverses level by level.' },
      ];

      const cleaned = sanitizeAndBudgetHistory(duplicateHistory);
      expect(cleaned.length).toBe(2);
      expect(cleaned[0].content).toBe('What is BFS?');
    });
  });

  // ==========================================
  // Category F: Hallucination Resistance & System Prompt Guardrails
  // ==========================================
  describe('Category F: Hallucination Resistance & Prompt Guardrails', () => {
    it('system prompt explicitly forbids inventing non-existent APIs and libraries', () => {
      const prompt = buildSystemPrompt('DSA Practice Hub', []);
      expect(prompt).toContain('NEVER invent non-existent standard library functions');
      expect(prompt).toContain('NEVER claim that code has been executed');
      expect(prompt).toContain('state your uncertainty honestly');
    });

    it('local fallback avoids claiming online execution or pretending to be connected when offline', async () => {
      const response = await generateAIResponse({
        message: 'Can you run this code on the server right now and show me the console?',
      });

      expect(response.reply).not.toContain('Successfully executed on remote server');
    });
  });

  // ==========================================
  // Category G: Provider Abstraction & Telemetry
  // ==========================================
  describe('Category G: Provider Abstraction & Health Telemetry', () => {
    it('reports sanitized provider info without exposing secret keys', () => {
      const info = getAIProviderInfo();
      expect(info).toHaveProperty('activeProvider');
      expect(info).toHaveProperty('geminiConfigured');
      expect(info).toHaveProperty('geminiModel');
      expect(info).toHaveProperty('anthropicConfigured');

      // Zero secrets exposed in telemetry output
      expect(JSON.stringify(info)).not.toContain('sk-');
      expect(JSON.stringify(info)).not.toContain('api_key');
    });

    it('safely validates environment configuration', () => {
      const config = getAIConfiguration();
      expect(['gemini', 'anthropic', 'local', 'auto']).toContain(config.provider);
      expect(['gemini', 'anthropic', 'local']).toContain(config.activeProvider);
    });

    it('gracefully handles live Gemini generation when configured', async () => {
      const config = getAIConfiguration();
      if (config.isGeminiConfigured) {
        const response = await generateAIResponse({
          message: 'What is a binary search tree?',
          sectionContext: 'Core CS Subjects',
        });
        expect(response.reply).toBeDefined();
        expect(response.reply.length).toBeGreaterThan(20);
      }
    });
  });
});
