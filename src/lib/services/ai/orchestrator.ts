import { getAIConfiguration } from './config';
import { GeminiProvider } from './gemini-provider';
import { AnthropicProvider } from './anthropic-provider';
import { LocalGroundedProvider } from './local-grounded-provider';
import {
  retrieveRelevantKnowledge,
  retrievePersonalizedLearningContext,
} from './rag-engine';
import { buildSystemPrompt } from './system-prompt';
import { sanitizeAndBudgetHistory } from './conversation-manager';
import type {
  AIProvider,
  AIRequest,
  AIResponse,
  AIStreamChunk,
  GroundedSource,
  UserPersonalizationContext,
} from './types';

// Singleton provider instances
const geminiProvider = new GeminiProvider();
const anthropicProvider = new AnthropicProvider();
const localProvider = new LocalGroundedProvider();

/**
 * Resolves the appropriate provider based on configuration and request overrides.
 */
function resolveProvider(override?: string): AIProvider {
  const config = getAIConfiguration();
  const choice = (override || config.activeProvider).toLowerCase();

  if (choice === 'gemini' && geminiProvider.isConfigured()) {
    return geminiProvider;
  }
  if (choice === 'anthropic' && anthropicProvider.isConfigured()) {
    return anthropicProvider;
  }
  if (config.isGeminiConfigured) {
    return geminiProvider;
  }
  if (config.isAnthropicConfigured) {
    return anthropicProvider;
  }
  return localProvider;
}

export function getAIProviderInfo() {
  const config = getAIConfiguration();
  return {
    activeProvider: config.activeProvider,
    geminiConfigured: config.isGeminiConfigured,
    geminiModel: config.geminiModel,
    anthropicConfigured: config.isAnthropicConfigured,
    anthropicModel: config.anthropicModel,
    isLocalFallback: config.activeProvider === 'local',
  };
}

/**
 * Prepares the grounded sources, personalization, budgeted history, and system prompt.
 */
function prepareContext(request: AIRequest): {
  sources: GroundedSource[];
  personalization: UserPersonalizationContext | null;
  budgetedRequest: AIRequest;
  systemPrompt: string;
} {
  const sources = retrieveRelevantKnowledge(request.message, request.sectionContext);
  const personalization =
    request.personalization || retrievePersonalizedLearningContext(request.userId);

  const budgetedHistory = sanitizeAndBudgetHistory(request.history || []);
  const budgetedRequest: AIRequest = {
    ...request,
    history: budgetedHistory,
    personalization: personalization || undefined,
  };

  const systemPrompt = buildSystemPrompt(
    request.sectionContext,
    sources,
    personalization
  );

  return { sources, personalization, budgetedRequest, systemPrompt };
}

/**
 * Generates an end-to-end AI response with automatic fallback to grounded local engine.
 */
export async function generateAIResponse(request: AIRequest): Promise<AIResponse> {
  const { sources, budgetedRequest, systemPrompt } = prepareContext(request);
  const primaryProvider = resolveProvider(request.providerOverride);

  try {
    const response = await primaryProvider.generateResponse(
      budgetedRequest,
      systemPrompt,
      sources
    );
    return response;
  } catch (err: unknown) {
    // If primary cloud provider failed, log error and fall back gracefully to local grounded provider
    const errMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[AI Orchestrator] Primary provider (${primaryProvider.name}) failed: ${errMsg}. Falling back to StackUp Grounded AI.`);

    if (primaryProvider.id !== 'local') {
      const fallbackResponse = await localProvider.generateResponse(
        budgetedRequest,
        systemPrompt,
        sources
      );
      return {
        ...fallbackResponse,
        error: `Cloud AI unavailable (${errMsg}). Provided response via StackUp Grounded AI.`,
        isFallback: true,
      };
    }

    throw err;
  }
}

/**
 * Generates a streaming AI response with fallback support.
 */
export async function* generateAIStream(
  request: AIRequest
): AsyncIterable<AIStreamChunk> {
  const { sources, budgetedRequest, systemPrompt } = prepareContext(request);
  const primaryProvider = resolveProvider(request.providerOverride);

  try {
    for await (const chunk of primaryProvider.generateStream(
      budgetedRequest,
      systemPrompt,
      sources
    )) {
      yield chunk;
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[AI Orchestrator] Primary stream failed: ${errMsg}. Falling back to local stream.`);

    // Yield warning chunk to notify user cleanly
    yield {
      delta: `\n\n*(Note: Cloud model encountered an issue (${errMsg}). Switching to StackUp Grounded AI.)*\n\n`,
      done: false,
    };

    for await (const chunk of localProvider.generateStream(
      budgetedRequest,
      systemPrompt,
      sources
    )) {
      yield chunk;
    }
  }
}
