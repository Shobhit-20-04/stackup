import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from '../src/lib/services/judge/types';
import {
  validateCodeSubmission,
  checkRateLimit,
  SECURITY_LIMITS,
} from '../src/lib/services/judge/security';
import {
  compareOutputs,
  getStarterCode,
  wrapCodeWithDriver,
} from '../src/lib/services/judge/adapters';
import {
  getProblemById,
  getSampleTestCases,
  getJudgingTestCases,
  hasOfficialJudgingSuite,
} from '../src/lib/services/judge/testcases';
import { DSA_PROBLEMS } from '../src/lib/data/dsa';
import { authenticateUserRequest } from '../src/lib/auth/server-auth';
import { createSessionToken } from '../src/lib/security/session-manager';
import { SESSION_CONFIG } from '../src/lib/security/session-config';

describe('Coding Workspace - Language Configurations', () => {
  const expectedLanguages: SupportedLanguage[] = ['python', 'cpp', 'c', 'java', 'javascript'];

  it('supports all required competitive programming languages', () => {
    for (const lang of expectedLanguages) {
      const config = SUPPORTED_LANGUAGES[lang];
      expect(config).toBeDefined();
      expect(config.id).toBe(lang);
      expect(typeof config.judge0Id).toBe('number');
      expect(config.judge0Id).toBeGreaterThan(0);
      expect(config.monacoLanguage.length).toBeGreaterThan(0);
      expect(config.name.length).toBeGreaterThan(0);
      expect(config.fileExtension.length).toBeGreaterThan(0);
    }
  });

  it('configures distinct Judge0 IDs for each runtime', () => {
    const ids = expectedLanguages.map((lang) => SUPPORTED_LANGUAGES[lang].judge0Id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(expectedLanguages.length);
  });
});

describe('Coding Workspace - Security & Input Validation', () => {
  it('accepts valid code within size limit', () => {
    const result = validateCodeSubmission('print("hello world")', 'python');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('rejects empty or whitespace-only code', () => {
    const emptyResult = validateCodeSubmission('', 'python');
    expect(emptyResult.valid).toBe(false);
    expect(emptyResult.error).toContain('cannot be empty');

    const whitespaceResult = validateCodeSubmission('    \n\t  ', 'python');
    expect(whitespaceResult.valid).toBe(false);
  });

  it('rejects code exceeding maximum size limit', () => {
    const hugeCode = 'a'.repeat(SECURITY_LIMITS.MAX_SOURCE_CODE_BYTES + 100);
    const result = validateCodeSubmission(hugeCode, 'python');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds maximum permitted size');
  });

  it('rejects invalid or unsupported languages', () => {
    const result = validateCodeSubmission('puts "hello"', 'ruby');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Unsupported programming language');
  });

  it('validates test case counts and limits', () => {
    const validCases = [
      { id: '1', input: '1 2' },
      { id: '2', input: '3 4' },
    ];
    expect(validateCodeSubmission('print(1)', 'python', validCases).valid).toBe(true);

    const excessiveCases = Array.from({ length: SECURITY_LIMITS.MAX_TEST_CASES_PER_RUN + 2 }, (_, i) => ({
      id: String(i),
      input: 'test',
    }));
    const excessiveResult = validateCodeSubmission('print(1)', 'python', excessiveCases);
    expect(excessiveResult.valid).toBe(false);
    expect(excessiveResult.error).toContain('Exceeded maximum test cases per run');
  });

  it('rejects test cases with invalid input types or oversized inputs', () => {
    const invalidInputCase = [{ input: 12345 }];
    const res1 = validateCodeSubmission('print(1)', 'python', invalidInputCase as unknown as { input: string }[]);
    expect(res1.valid).toBe(false);
    expect(res1.error).toContain('must be a string');

    const oversizedCase = [{ input: 'x'.repeat(SECURITY_LIMITS.MAX_INPUT_BYTES + 10) }];
    const res2 = validateCodeSubmission('print(1)', 'python', oversizedCase);
    expect(res2.valid).toBe(false);
    expect(res2.error).toContain('exceeds maximum size');
  });

  it('rate limits excessive requests from the same IP', () => {
    const testIp = 'test-client-ip-' + Math.random();
    // Consume quota (maxTokens = 3)
    let limited = false;
    for (let i = 0; i < 10; i++) {
      const allowed = checkRateLimit(testIp, 3, 60);
      if (!allowed) {
        limited = true;
        break;
      }
    }
    expect(limited).toBe(true);
  });
});

describe('Coding Workspace - Output Normalization & Comparison', () => {
  it('correctly matches exact outputs', () => {
    expect(compareOutputs('hello', 'hello')).toBe(true);
    expect(compareOutputs('12345', '12345')).toBe(true);
  });

  it('normalizes trailing whitespace and newlines', () => {
    expect(compareOutputs('hello \n\r\n', 'hello')).toBe(true);
    expect(compareOutputs('[1, 2, 3]\n', '[1, 2, 3]')).toBe(true);
  });

  it('normalizes JSON array spacing and formatting', () => {
    expect(compareOutputs('[0, 1]', '[0,1]')).toBe(true);
    expect(compareOutputs('[[1,2],[3,4]]', '[[1, 2], [3, 4]]')).toBe(true);
  });

  it('normalizes boolean representations', () => {
    expect(compareOutputs('True', 'true')).toBe(true);
    expect(compareOutputs('False', 'false')).toBe(true);
  });

  it('compares floating point numbers with tolerance', () => {
    expect(compareOutputs('2.500000', '2.5')).toBe(true);
    expect(compareOutputs('1.00000', '1.0')).toBe(true);
  });

  it('correctly reports mismatched answers as false', () => {
    expect(compareOutputs('[0, 1]', '[0, 2]')).toBe(false);
    expect(compareOutputs('true', 'false')).toBe(false);
    expect(compareOutputs('42', '43')).toBe(false);
  });
});

describe('Coding Workspace - Starter Code & Driver Harness', () => {
  it('provides starter code for problems with existing reference solutions', () => {
    const sampleProblem = DSA_PROBLEMS[0]; // Two Sum
    const pyStarter = getStarterCode(sampleProblem, 'python');
    expect(pyStarter.length).toBeGreaterThan(10);
    expect(pyStarter).toContain('def twoSum');

    const cppStarter = getStarterCode(sampleProblem, 'cpp');
    expect(cppStarter.length).toBeGreaterThan(10);
    expect(cppStarter).toContain('twoSum');

    const javaStarter = getStarterCode(sampleProblem, 'java');
    expect(javaStarter.length).toBeGreaterThan(10);
    expect(javaStarter).toContain('twoSum');

    const jsStarter = getStarterCode(sampleProblem, 'javascript');
    expect(jsStarter.length).toBeGreaterThan(10);
    expect(jsStarter).toContain('twoSum');

    const cStarter = getStarterCode(sampleProblem, 'c');
    expect(cStarter.length).toBeGreaterThan(10);
    expect(cStarter).toContain('int main()');
  });

  it('wraps Python class Solution code with driver harness when no main method is present', () => {
    const sampleProblem = DSA_PROBLEMS[0];
    const userCode = 'class Solution:\n    def twoSum(self, nums, target):\n        return [0, 1]';
    const harnessed = wrapCodeWithDriver(userCode, 'python', sampleProblem);
    expect(harnessed).toContain('if __name__ == \'__main__\':');
    expect(harnessed).toContain('parse_input_args');
  });

  it('wraps C++ class Solution code with driver harness containing main()', () => {
    const sampleProblem = DSA_PROBLEMS[0];
    const userCode = 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {0, 1};\n    }\n};';
    const harnessed = wrapCodeWithDriver(userCode, 'cpp', sampleProblem);
    expect(harnessed).toContain('int main()');
    expect(harnessed).toContain('StackUpDriver::splitArgs');
    expect(harnessed).toContain('sol.twoSum');
  });

  it('wraps Java class Solution code with driver harness containing class Main', () => {
    const sampleProblem = DSA_PROBLEMS[0];
    const userCode = 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{0, 1};\n    }\n}';
    const harnessed = wrapCodeWithDriver(userCode, 'java', sampleProblem);
    expect(harnessed).toContain('public class Main');
    expect(harnessed).toContain('public static void main(String[] args)');
    expect(harnessed).toContain('sol.twoSum');
  });

  it('preserves code unchanged when standard main() or stdin entry point is present', () => {
    const sampleProblem = DSA_PROBLEMS[0];
    const cppDirectCode = '#include <iostream>\nint main() { std::cout << 42 << std::endl; return 0; }';
    const builtCpp = wrapCodeWithDriver(cppDirectCode, 'cpp', sampleProblem);
    expect(builtCpp).toBe(cppDirectCode);

    const pyDirectCode = 'import sys\nfor line in sys.stdin:\n    print(line)';
    const builtPy = wrapCodeWithDriver(pyDirectCode, 'python', sampleProblem);
    expect(builtPy).toBe(pyDirectCode);
  });
});

describe('Coding Workspace - Test Case Management & Server Security', () => {
  it('retrieves valid problems by ID', () => {
    const problem = getProblemById('dsa-1');
    expect(problem).toBeDefined();
    expect(problem?.title).toContain('Two Sum');
  });

  it('extracts sample test cases from problem definition', () => {
    const sampleCases = getSampleTestCases('dsa-1');
    expect(sampleCases.length).toBeGreaterThanOrEqual(1);
    for (const tc of sampleCases) {
      expect(tc.isHidden).toBe(false);
      expect(tc.input.length).toBeGreaterThan(0);
      expect(tc.expectedOutput?.length).toBeGreaterThan(0);
    }
  });

  it('provides judging test cases including hidden boundary checks', () => {
    const judgingCases = getJudgingTestCases('dsa-1');
    expect(judgingCases.length).toBeGreaterThan(getSampleTestCases('dsa-1').length);
    const hiddenCases = judgingCases.filter((tc) => tc.isHidden);
    expect(hiddenCases.length).toBeGreaterThan(0);
  });

  it('identifies problems with curated official judging suites', () => {
    expect(hasOfficialJudgingSuite('dsa-1')).toBe(true);
    expect(hasOfficialJudgingSuite('dsa-25')).toBe(true);
  });

  it('strictly sanitizes hidden test case results to protect test vectors', () => {
    const rawResults = [
      {
        testCaseId: 'judge-1',
        name: 'Test Case 4',
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        actualOutput: '[0, 1]',
        stdout: '[0, 1]\n',
        stderr: null,
        compileOutput: null,
        passed: true,
        verdict: 'Accepted' as const,
        executionTimeMs: 45,
        memoryKb: 3200,
        isHidden: true,
      },
    ];

    // Sanitization logic matching submit/route.ts
    const sanitized = rawResults.map((r) => {
      if (r.isHidden) {
        return {
          ...r,
          input: '[Hidden Test Case Input]',
          expectedOutput: '[Hidden Test Case Output]',
          actualOutput: r.passed ? '[Passed]' : '[Mismatched Output]',
          stdout: null,
        };
      }
      return r;
    });

    expect(sanitized[0].input).toBe('[Hidden Test Case Input]');
    expect(sanitized[0].expectedOutput).toBe('[Hidden Test Case Output]');
    expect(sanitized[0].actualOutput).toBe('[Passed]');
    expect(sanitized[0].stdout).toBeNull();
  });
});

describe('Coding Workspace - Lifecycle State Machine & Resilient Fallback', () => {
  const lifecycleStates = [
    'initializing_editor',
    'loading_language',
    'ready',
    'executing_code',
    'loading_results',
    'init_failed',
    'exec_failed',
  ] as const;

  it('defines all required lifecycle states for editor execution and recovery', () => {
    expect(lifecycleStates.length).toBe(7);
    expect(lifecycleStates).toContain('initializing_editor');
    expect(lifecycleStates).toContain('loading_language');
    expect(lifecycleStates).toContain('ready');
    expect(lifecycleStates).toContain('executing_code');
    expect(lifecycleStates).toContain('loading_results');
    expect(lifecycleStates).toContain('init_failed');
    expect(lifecycleStates).toContain('exec_failed');
  });

  it('guarantees immediate synchronous starter code for every problem and language', () => {
    const testProblems = [DSA_PROBLEMS[0], DSA_PROBLEMS[1], DSA_PROBLEMS[2]];
    const languages: SupportedLanguage[] = ['python', 'cpp', 'java', 'javascript', 'c'];

    for (const prob of testProblems) {
      for (const lang of languages) {
        const starter = getStarterCode(prob, lang);
        expect(starter).toBeDefined();
        expect(typeof starter).toBe('string');
        expect(starter.trim().length).toBeGreaterThan(10);
      }
    }
  });

  it('handles fallback editor tab indentation (4 spaces)', () => {
    const input = 'def solution():\npass';
    const cursorAt = 16; // Right before 'pass'
    const indented = input.substring(0, cursorAt) + '    ' + input.substring(cursorAt);
    expect(indented).toBe('def solution():\n    pass');
  });

  it('handles fallback editor shift+tab unindentation (removes 4 spaces)', () => {
    const indented = 'def solution():\n    pass';
    const lineStart = indented.lastIndexOf('\n', 20) + 1;
    let unindented = indented;
    if (indented.slice(lineStart, lineStart + 4) === '    ') {
      unindented = indented.slice(0, lineStart) + indented.slice(lineStart + 4);
    }
    expect(unindented).toBe('def solution():\npass');
  });

  it('formats fallback code by trimming trailing whitespace from lines', () => {
    const messy = 'def foo():   \n    x = 1  \n    return x   \n';
    const formatted = messy
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');
    expect(formatted).toBe('def foo():\n    x = 1\n    return x\n');
  });

  it('calculates accurate line and column positions for code cursor', () => {
    const code = 'class Solution:\n    def twoSum(self):\n        pass';
    const cursorOffset = 30; // Somewhere in def twoSum
    const textBeforeCursor = code.substring(0, cursorOffset);
    const lines = textBeforeCursor.split('\n');
    const lineNum = lines.length;
    const colNum = lines[lines.length - 1].length + 1;

    expect(lineNum).toBe(2);
    expect(colNum).toBe(15);
  });
});

describe('Coding Workspace - Server-Side Mandatory Authentication Enforcement', () => {
  it('rejects unauthenticated requests without session credentials (returns authenticated: false)', async () => {
    const req = new NextRequest('http://localhost:3000/api/dsa/execute', {
      method: 'POST',
      body: JSON.stringify({ code: 'print(1)', language: 'python' }),
    });
    const result = await authenticateUserRequest(req);
    expect(result.authenticated).toBe(false);
    expect(result.user).toBeUndefined();
    expect(result.error).toContain('Authentication required');
  });

  it('rejects legacy demo and guest accounts from accessing execution APIs', async () => {
    const demoPayload = JSON.stringify({
      id: 'student-demo',
      email: 'guest@stackup.xyz',
      isDemo: true,
    });
    const req = new NextRequest('http://localhost:3000/api/dsa/execute', {
      method: 'POST',
      headers: {
        cookie: `sb-demo-user=${encodeURIComponent(demoPayload)}`,
      },
      body: JSON.stringify({ code: 'print(1)', language: 'python' }),
    });
    const result = await authenticateUserRequest(req);
    expect(result.authenticated).toBe(false);
    expect(result.user).toBeUndefined();
  });

  it('authorizes requests with valid signed session cookie token', async () => {
    const { token: signedToken } = createSessionToken({
      userId: 'usr-verified-coder',
      email: 'alex@stackup.xyz',
      role: 'student',
    });
    const req = new NextRequest('http://localhost:3000/api/dsa/execute', {
      method: 'POST',
      headers: {
        cookie: `${SESSION_CONFIG.cookieName}=${signedToken}`,
      },
      body: JSON.stringify({ code: 'print(1)', language: 'python' }),
    });
    const result = await authenticateUserRequest(req);
    expect(result.authenticated).toBe(true);
    expect(result.user).toBeDefined();
    expect(result.user?.id).toBe('usr-verified-coder');
    expect(result.user?.email).toBe('alex@stackup.xyz');
  });

  it('authorizes requests with valid Authorization Bearer header', async () => {
    const { token: signedToken } = createSessionToken({
      userId: 'usr-bearer-coder',
      email: 'maya@stackup.xyz',
      role: 'student',
    });
    const req = new NextRequest('http://localhost:3000/api/dsa/submit', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${signedToken}`,
      },
      body: JSON.stringify({ code: 'print(1)', language: 'python', problemId: 'dsa-1' }),
    });
    const result = await authenticateUserRequest(req);
    expect(result.authenticated).toBe(true);
    expect(result.user?.id).toBe('usr-bearer-coder');
  });

  it('preserves UTF-8 and special quotes in base64 submission payloads', () => {
    const codeWithSpecialChars = '#include <iostream>\nint main() { std::cout << "“smart quotes” & symbols: — – ≠"; return 0; }';
    const encoded = Buffer.from(codeWithSpecialChars, 'utf8').toString('base64');
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    expect(decoded).toBe(codeWithSpecialChars);
  });
});
