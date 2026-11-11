import type { AIProviderId } from './types';

export interface AIConfiguration {
  provider: AIProviderId;
  geminiModel: string;
  anthropicModel: string;
  isGeminiConfigured: boolean;
  isAnthropicConfigured: boolean;
  activeProvider: 'gemini' | 'anthropic' | 'local';
}

export const SUPPORTED_GEMINI_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
  'gemini-4-argon',
] as const;

export const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite';
export const DEFAULT_ANTHROPIC_MODEL = 'claude-3-5-sonnet-20241022';

export function getAIConfiguration(): AIConfiguration {
  const rawProvider = (process.env.AI_PROVIDER || 'auto').toLowerCase().trim();
  const geminiApiKey = (process.env.GEMINI_API_KEY || '').trim();
  const anthropicApiKey = (process.env.ANTHROPIC_API_KEY || '').trim();

  const isGeminiConfigured =
    geminiApiKey.length > 10 &&
    !geminiApiKey.includes('placeholder') &&
    !geminiApiKey.includes('your-key');

  const isAnthropicConfigured =
    anthropicApiKey.startsWith('sk-ant-') &&
    anthropicApiKey.length > 20 &&
    !anthropicApiKey.includes('placeholder');

  let activeProvider: 'gemini' | 'anthropic' | 'local' = 'local';

  if (rawProvider === 'gemini') {
    activeProvider = isGeminiConfigured ? 'gemini' : 'local';
  } else if (rawProvider === 'anthropic') {
    activeProvider = isAnthropicConfigured ? 'anthropic' : 'local';
  } else if (rawProvider === 'local') {
    activeProvider = 'local';
  } else {
    // 'auto' mode: prefer Gemini if available, then Anthropic, then local
    if (isGeminiConfigured) {
      activeProvider = 'gemini';
    } else if (isAnthropicConfigured) {
      activeProvider = 'anthropic';
    } else {
      activeProvider = 'local';
    }
  }

  const geminiModel = (process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL).trim();
  const anthropicModel = (process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL).trim();

  return {
    provider: (rawProvider as AIProviderId) || 'auto',
    geminiModel,
    anthropicModel,
    isGeminiConfigured,
    isAnthropicConfigured,
    activeProvider,
  };
}

export function getSanitizedAIStatus() {
  const config = getAIConfiguration();
  return {
    activeProvider: config.activeProvider,
    geminiConfigured: config.isGeminiConfigured,
    geminiModel: config.geminiModel,
    anthropicConfigured: config.isAnthropicConfigured,
    anthropicModel: config.anthropicModel,
  };
}
