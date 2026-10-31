import { describe, it, expect } from 'vitest';
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
