import { GoogleGenAI } from '@google/genai';
import { getAIConfiguration, DEFAULT_GEMINI_MODEL } from './config';
import type {
  AIProvider,
  AIRequest,
  AIResponse,
  AIStreamChunk,
  GroundedSource,
} from './types';

export class GeminiProvider implements AIProvider {
  readonly id = 'gemini' as const;
  readonly name = 'Google Gemini';

  private getClient(): GoogleGenAI {
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY is not configured. Please add GEMINI_API_KEY to your .env.local file.'
      );
    }
    return new GoogleGenAI({ apiKey });
  }

  isConfigured(): boolean {
    const config = getAIConfiguration();
    return config.isGeminiConfigured;
  }

  private buildContents(request: AIRequest) {
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (request.history && request.history.length > 0) {
      for (const m of request.history) {
        contents.push({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: request.message }],
    });

    return contents;
  }

  async generateResponse(
    request: AIRequest,
    systemPrompt: string,
    sources: GroundedSource[]
  ): Promise<AIResponse> {
    const startTime = Date.now();
    const config = getAIConfiguration();
    const model = request.modelOverride || config.geminiModel || DEFAULT_GEMINI_MODEL;
    const client = this.getClient();

    try {
      const contents = this.buildContents(request);
      let activeModel = model;
      let response;

      try {
        response = await client.models.generateContent({
          model: activeModel,
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2,
            maxOutputTokens: 2048,
          },
        });
      } catch (firstErr: unknown) {
        const msg = firstErr instanceof Error ? firstErr.message : String(firstErr);
        if (activeModel !== 'gemini-3.5-flash-lite' && (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('high demand'))) {
          activeModel = 'gemini-3.5-flash-lite';
          response = await client.models.generateContent({
            model: activeModel,
            contents,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.2,
              maxOutputTokens: 2048,
            },
          });
        } else {
          throw firstErr;
        }
      }

      const reply = response.text || '';
      const latencyMs = Date.now() - startTime;

      const tokenUsage = response.usageMetadata
        ? {
            promptTokens: response.usageMetadata.promptTokenCount || 0,
            completionTokens: response.usageMetadata.candidatesTokenCount || 0,
            totalTokens: response.usageMetadata.totalTokenCount || 0,
          }
        : undefined;

      return {
        reply,
        provider: 'gemini',
        model: activeModel,
        latencyMs,
        tokenUsage,
        sources,
        isFallback: false,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('API_KEY_INVALID') || msg.includes('401') || msg.includes('403')) {
        throw new Error('Gemini API authentication failed: Invalid or inactive GEMINI_API_KEY.');
      }
      if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')) {
        throw new Error('Gemini rate limit or quota exceeded. Please try again in a few moments.');
      }
      throw new Error(`Gemini generation failed: ${msg}`);
    }
  }

  async *generateStream(
    request: AIRequest,
    systemPrompt: string,
    sources: GroundedSource[]
  ): AsyncIterable<AIStreamChunk> {
    const startTime = Date.now();
    const config = getAIConfiguration();
    const model = request.modelOverride || config.geminiModel || DEFAULT_GEMINI_MODEL;
    const client = this.getClient();

    const contents = this.buildContents(request);
    let fullText = '';
    let activeModel = model;

    try {
      let responseStream;
      try {
        responseStream = await client.models.generateContentStream({
          model: activeModel,
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2,
            maxOutputTokens: 2048,
          },
        });
      } catch (firstErr: unknown) {
        const msg = firstErr instanceof Error ? firstErr.message : String(firstErr);
        if (activeModel !== 'gemini-3.5-flash-lite' && (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('high demand'))) {
          activeModel = 'gemini-3.5-flash-lite';
          responseStream = await client.models.generateContentStream({
            model: activeModel,
            contents,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.2,
              maxOutputTokens: 2048,
            },
          });
        } else {
          throw firstErr;
        }
      }

      for await (const chunk of responseStream) {
        const text = chunk.text || '';
        if (text) {
          fullText += text;
          yield { delta: text, done: false };
        }
      }

      const latencyMs = Date.now() - startTime;
      yield {
        delta: '',
        done: true,
        metadata: {
          reply: fullText,
          provider: 'gemini',
          model: activeModel,
          latencyMs,
          sources,
          isFallback: false,
        },
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Gemini stream error: ${msg}`);
    }
  }
}
