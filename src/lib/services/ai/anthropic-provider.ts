import { getAIConfiguration, DEFAULT_ANTHROPIC_MODEL } from './config';
import type {
  AIProvider,
  AIRequest,
  AIResponse,
  AIStreamChunk,
  GroundedSource,
} from './types';

export class AnthropicProvider implements AIProvider {
  readonly id = 'anthropic' as const;
  readonly name = 'Anthropic Claude';

  isConfigured(): boolean {
    const config = getAIConfiguration();
    return config.isAnthropicConfigured;
  }

  private getApiKey(): string {
    const apiKey = (process.env.ANTHROPIC_API_KEY || '').trim();
    if (!apiKey) {
      throw new Error(
        'ANTHROPIC_API_KEY is not configured. Please add ANTHROPIC_API_KEY to your .env.local file.'
      );
    }
    return apiKey;
  }

  private buildMessages(request: AIRequest) {
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    if (request.history && request.history.length > 0) {
      for (const m of request.history) {
        messages.push({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        });
      }
    }

    messages.push({
      role: 'user',
      content: request.message,
    });

    return messages;
  }

  async generateResponse(
    request: AIRequest,
    systemPrompt: string,
    sources: GroundedSource[]
  ): Promise<AIResponse> {
    const startTime = Date.now();
    const config = getAIConfiguration();
    const model = request.modelOverride || config.anthropicModel || DEFAULT_ANTHROPIC_MODEL;
    const apiKey = this.getApiKey();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 2048,
        system: systemPrompt,
        messages: this.buildMessages(request),
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      if (response.status === 401 || response.status === 403) {
        throw new Error('Anthropic API authentication failed: Invalid or inactive ANTHROPIC_API_KEY.');
      }
      if (response.status === 429) {
        throw new Error('Anthropic rate limit exceeded. Please wait a moment and try again.');
      }
      throw new Error(`Anthropic API error (${response.status}): ${errText.slice(0, 200)}`);
    }

    const json = await response.json();
    const reply = json.content?.[0]?.text || '';
    const latencyMs = Date.now() - startTime;

    const tokenUsage = json.usage
      ? {
          promptTokens: json.usage.input_tokens || 0,
          completionTokens: json.usage.output_tokens || 0,
          totalTokens: (json.usage.input_tokens || 0) + (json.usage.output_tokens || 0),
        }
      : undefined;

    return {
      reply,
      provider: 'anthropic',
      model,
      latencyMs,
      tokenUsage,
      sources,
      isFallback: false,
    };
  }

  async *generateStream(
    request: AIRequest,
    systemPrompt: string,
    sources: GroundedSource[]
  ): AsyncIterable<AIStreamChunk> {
    const startTime = Date.now();
    const config = getAIConfiguration();
    const model = request.modelOverride || config.anthropicModel || DEFAULT_ANTHROPIC_MODEL;
    const apiKey = this.getApiKey();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 2048,
        stream: true,
        system: systemPrompt,
        messages: this.buildMessages(request),
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(`Anthropic streaming failed with HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const dataStr = trimmed.slice(5).trim();
        if (dataStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(dataStr);
          if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
            fullText += parsed.delta.text;
            yield { delta: parsed.delta.text, done: false };
          }
        } catch {
          // ignore malformed SSE line
        }
      }
    }

    const latencyMs = Date.now() - startTime;
    yield {
      delta: '',
      done: true,
      metadata: {
        reply: fullText,
        provider: 'anthropic',
        model,
        latencyMs,
        sources,
        isFallback: false,
      },
    };
  }
}
