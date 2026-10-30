import { SUPPORTED_LANGUAGES, type SupportedLanguage, type JudgeVerdict } from './types';
import { SECURITY_LIMITS } from './security';

export interface Judge0RawResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  time: string | null;
  memory: number | null;
  status: {
    id: number;
    description: string;
  };
}

export interface JudgeExecutionOutput {
  rawStdout: string | null;
  rawStderr: string | null;
  compileOutput: string | null;
  executionTimeMs: number;
  memoryKb: number;
  verdict: JudgeVerdict;
  description: string;
}

export async function executeInJudge0(
  language: SupportedLanguage,
  sourceCode: string,
  stdin: string,
  options?: {
    cpuTimeLimit?: number;
    memoryLimitKb?: number;
  }
): Promise<JudgeExecutionOutput> {
  const langConfig = SUPPORTED_LANGUAGES[language];
  if (!langConfig) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const apiUrl = process.env.JUDGE0_API_URL || 'https://ce.judge0.com';
  const apiKey = process.env.JUDGE0_API_KEY || '';
  const apiHost = process.env.JUDGE0_API_HOST || '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['X-RapidAPI-Key'] = apiKey;
    headers['X-Auth-Token'] = apiKey;
  }
  if (apiHost) {
    headers['X-RapidAPI-Host'] = apiHost;
  }

  const payload = {
    language_id: langConfig.judge0Id,
    source_code: sourceCode,
    stdin: stdin || '',
    cpu_time_limit: options?.cpuTimeLimit || SECURITY_LIMITS.CPU_TIME_LIMIT_SECONDS,
    memory_limit: options?.memoryLimitKb || SECURITY_LIMITS.MEMORY_LIMIT_KB,
  };

  const endpoint = `${apiUrl.replace(/\/+$/, '')}/submissions?wait=true&base64_encoded=false`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Judge service HTTP error (${res.status}): ${errText.slice(0, 200)}`);
    }

    const data = (await res.json()) as Judge0RawResult;

    const timeInMs = data.time ? Math.round(parseFloat(data.time) * 1000) : 0;
    const memoryInKb = data.memory ? Math.round(data.memory) : 0;

    let verdict: JudgeVerdict = 'Internal Error';
    const statusId = data.status?.id || 13;

    if (statusId === 3) {
      verdict = 'Accepted';
    } else if (statusId === 4) {
      verdict = 'Wrong Answer';
    } else if (statusId === 5) {
      verdict = 'Time Limit Exceeded';
    } else if (statusId === 6) {
      verdict = 'Compilation Error';
    } else if (statusId >= 7 && statusId <= 12) {
      verdict = 'Runtime Error';
    } else {
      verdict = 'Internal Error';
    }

    return {
      rawStdout: data.stdout,
      rawStderr: data.stderr,
      compileOutput: data.compile_output,
      executionTimeMs: timeInMs,
      memoryKb: memoryInKb,
      verdict,
      description: data.status?.description || 'Unknown status',
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const msg = err instanceof Error ? err.message : 'Execution error';
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        rawStdout: null,
        rawStderr: 'Execution timed out waiting for judge response',
        compileOutput: null,
        executionTimeMs: 10000,
        memoryKb: 0,
        verdict: 'Time Limit Exceeded',
        description: 'Time Limit Exceeded (Timeout)',
      };
    }
    return {
      rawStdout: null,
      rawStderr: msg,
      compileOutput: null,
      executionTimeMs: 0,
      memoryKb: 0,
      verdict: 'Internal Error',
      description: msg,
    };
  }
}
