import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../src/lib/services/rate-limit';
import { generateLocalAiResponse } from '../src/app/api/chat/route';

describe('Chat Assistant & Educational Responses', () => {
  it('enforces chat rate limits under rapid messaging', () => {
    const clientId = `test-chat-client-${Date.now()}`;
    const limit = 3;

    expect(checkRateLimit(clientId, limit, 5000).allowed).toBe(true);
    expect(checkRateLimit(clientId, limit, 5000).allowed).toBe(true);
    expect(checkRateLimit(clientId, limit, 5000).allowed).toBe(true);
    expect(checkRateLimit(clientId, limit, 5000).allowed).toBe(false);
  });

  it('provides comprehensive DSA guidance for Dynamic Programming and Graphs', () => {
    const dpResponse = generateLocalAiResponse('How do I approach Dynamic Programming knapsack problems?');
    expect(dpResponse).toContain('Dynamic Programming');
    expect(dpResponse).toContain('Overlapping Subproblems');
    expect(dpResponse).toContain('Top-Down with Memoization');
    expect(dpResponse).toContain('Bottom-Up with Tabulation');

    const graphResponse = generateLocalAiResponse('What is the difference between BFS and DFS and when do I use Dijkstra?');
    expect(graphResponse).toContain('Breadth-First Search (BFS)');
    expect(graphResponse).toContain('Depth-First Search (DFS)');
    expect(graphResponse).toContain('Dijkstra');
  });

  it('provides accurate Core CS guidance for OOP, SQL Joins, and Networks', () => {
    const oopResponse = generateLocalAiResponse('Explain SOLID principles');
    expect(oopResponse).toContain('Single Responsibility');
    expect(oopResponse).toContain('Liskov Substitution');

    const sqlResponse = generateLocalAiResponse('What are the different types of SQL joins?');
    expect(sqlResponse).toContain('INNER JOIN');
    expect(sqlResponse).toContain('LEFT (OUTER) JOIN');

    const netResponse = generateLocalAiResponse('Explain the TCP 3-way handshake');
    expect(netResponse).toContain('SYN');
    expect(netResponse).toContain('SYN-ACK');
  });
});

