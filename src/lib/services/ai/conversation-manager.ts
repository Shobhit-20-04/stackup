import type { ChatMessage } from './types';

const MAX_TURNS = 10;
const MAX_TOTAL_TOKENS = 3000;

/**
 * Rough heuristic: ~4 characters per token for English and code.
 */
export function estimateTokenCount(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Normalizes, sanitizes, deduplicates, and limits conversation history within token budget.
 */
export function sanitizeAndBudgetHistory(
  rawHistory: unknown[],
  maxTurns: number = MAX_TURNS,
  maxTokens: number = MAX_TOTAL_TOKENS
): ChatMessage[] {
  if (!Array.isArray(rawHistory) || rawHistory.length === 0) {
    return [];
  }

  // 1. Map to typed ChatMessage objects
  const parsedMessages: ChatMessage[] = [];
  for (const item of rawHistory) {
    if (typeof item === 'object' && item !== null) {
      const obj = item as Record<string, unknown>;
      const role = obj.role === 'assistant' ? 'assistant' : 'user';
      const rawContent = typeof obj.content === 'string' ? obj.content.trim() : '';

      if (rawContent.length > 0) {
        parsedMessages.push({
          role,
          content: rawContent.slice(0, 4000), // Protect against individual message token-exhaustion
        });
      }
    }
  }

  // 2. Remove immediate consecutive duplicate messages
  const deduped: ChatMessage[] = [];
  for (const msg of parsedMessages) {
    const prev = deduped[deduped.length - 1];
    if (prev && prev.role === msg.role && prev.content === msg.content) {
      continue;
    }
    deduped.push(msg);
  }

  // 3. Take the most recent messages up to maxTurns
  const recent = deduped.slice(-maxTurns);

  // 4. Budget total tokens from newest to oldest
  const budgeted: ChatMessage[] = [];
  let tokenAccumulator = 0;

  for (let i = recent.length - 1; i >= 0; i--) {
    const msg = recent[i];
    const msgTokens = estimateTokenCount(msg.content);

    if (tokenAccumulator + msgTokens > maxTokens && budgeted.length > 0) {
      break;
    }

    tokenAccumulator += msgTokens;
    budgeted.unshift(msg);
  }

  return budgeted;
}
