export type AIProviderId = 'gemini' | 'anthropic' | 'local' | 'auto';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GroundedSource {
  title: string;
  category: string;
  snippet: string;
  url?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  relevanceScore: number;
}

export interface UserPersonalizationContext {
  userId: string;
  email?: string;
  activeMistakesCount?: number;
  weakTopics?: string[];
  dueRevisionsCount?: number;
  overdueRevisionsCount?: number;
  recentlyFailedProblems?: string[];
}

export interface AIRequest {
  message: string;
  history?: ChatMessage[];
  sectionContext?: string;
  userId?: string;
  personalization?: UserPersonalizationContext;
  stream?: boolean;
  providerOverride?: AIProviderId;
  modelOverride?: string;
}

export interface AITokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AIResponse {
  reply: string;
  provider: AIProviderId;
  model: string;
  latencyMs: number;
  tokenUsage?: AITokenUsage;
  sources: GroundedSource[];
  executionVerified?: boolean;
  isFallback?: boolean;
  error?: string;
}

export interface AIStreamChunk {
  delta: string;
  done: boolean;
  metadata?: Partial<AIResponse>;
}

export interface AIProvider {
  readonly id: AIProviderId;
  readonly name: string;
  isConfigured(): boolean;
  generateResponse(
    request: AIRequest,
    systemPrompt: string,
    sources: GroundedSource[]
  ): Promise<AIResponse>;
  generateStream(
    request: AIRequest,
    systemPrompt: string,
    sources: GroundedSource[]
  ): AsyncIterable<AIStreamChunk>;
}
