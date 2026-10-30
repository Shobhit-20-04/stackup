interface RateLimitEntry {
  tokens: number;
  lastRefill: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Token bucket rate limiter: max 12 requests per minute per IP, refills 1 token every 5s
export function checkRateLimit(identifier: string, maxTokens = 12, refillRateSeconds = 5): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier) || { tokens: maxTokens, lastRefill: now };

  const elapsedSeconds = (now - entry.lastRefill) / 1000;
  entry.tokens = Math.min(maxTokens, entry.tokens + elapsedSeconds / refillRateSeconds);
  entry.lastRefill = now;

  if (entry.tokens >= 1) {
    entry.tokens -= 1;
    rateLimitMap.set(identifier, entry);
    return true;
  }

  rateLimitMap.set(identifier, entry);
  return false;
}

export const SECURITY_LIMITS = {
  MAX_SOURCE_CODE_BYTES: 64 * 1024, // 64 KB
  MAX_INPUT_BYTES: 16 * 1024, // 16 KB per test case
  MAX_TEST_CASES_PER_RUN: 8,
  CPU_TIME_LIMIT_SECONDS: 3,
  MEMORY_LIMIT_KB: 128000, // 128 MB
};

export function validateCodeSubmission(
  sourceCode: unknown,
  language: unknown,
  testCases?: unknown[]
): { valid: boolean; error?: string } {
  if (typeof sourceCode !== 'string') {
    return { valid: false, error: 'Source code must be a string' };
  }

  if (sourceCode.trim().length === 0) {
    return { valid: false, error: 'Source code cannot be empty' };
  }

  if (Buffer.byteLength(sourceCode, 'utf8') > SECURITY_LIMITS.MAX_SOURCE_CODE_BYTES) {
    return { valid: false, error: 'Source code exceeds maximum permitted size (64 KB)' };
  }

  if (typeof language !== 'string' || !['python', 'cpp', 'c', 'java', 'javascript'].includes(language)) {
    return { valid: false, error: 'Unsupported programming language' };
  }

  if (testCases) {
    if (!Array.isArray(testCases)) {
      return { valid: false, error: 'Test cases must be an array' };
    }

    if (testCases.length > SECURITY_LIMITS.MAX_TEST_CASES_PER_RUN) {
      return { valid: false, error: `Exceeded maximum test cases per run (${SECURITY_LIMITS.MAX_TEST_CASES_PER_RUN})` };
    }

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i] as { input?: unknown };
      if (typeof tc.input !== 'string') {
        return { valid: false, error: `Test case #${i + 1} input must be a string` };
      }
      if (Buffer.byteLength(tc.input, 'utf8') > SECURITY_LIMITS.MAX_INPUT_BYTES) {
        return { valid: false, error: `Test case #${i + 1} input exceeds maximum size (16 KB)` };
      }
    }
  }

  return { valid: true };
}
