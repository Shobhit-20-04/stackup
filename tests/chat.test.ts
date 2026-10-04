import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../src/lib/services/rate-limit';

describe('Chat Assistant & Rate Limiting', () => {
  it('enforces chat rate limits under rapid messaging', () => {
    const clientId = `test-chat-client-${Date.now()}`;
    const limit = 3;

    expect(checkRateLimit(clientId, limit, 5000).allowed).toBe(true);
    expect(checkRateLimit(clientId, limit, 5000).allowed).toBe(true);
    expect(checkRateLimit(clientId, limit, 5000).allowed).toBe(true);
    expect(checkRateLimit(clientId, limit, 5000).allowed).toBe(false);
  });
});
