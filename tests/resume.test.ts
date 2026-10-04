import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../src/lib/services/rate-limit';

describe('Resume ATS Diagnostics & Rate Limiting', () => {
  it('enforces token-bucket rate limiting correctly', () => {
    const testId = `test-client-${Date.now()}`;
    
    // First 5 requests should pass with limit of 5
    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(testId, 5, 10000);
      expect(res.allowed).toBe(true);
      expect(res.remaining).toBe(4 - i);
    }

    // 6th request must be rejected
    const blocked = checkRateLimit(testId, 5, 10000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetInSeconds).toBeGreaterThan(0);
  });
});
