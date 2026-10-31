export type SupportedLanguage = 'python' | 'cpp' | 'c' | 'java' | 'javascript';

export interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  version: string;
  judge0Id: number;
  monacoLanguage: string;
  fileExtension: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  python: {
    id: 'python',
    name: 'Python 3',
    version: '3.11.2',
    judge0Id: 92,
    monacoLanguage: 'python',
    fileExtension: 'py',
  },
  cpp: {
    id: 'cpp',
    name: 'C++ (GCC 14)',
    version: '14.1.0',
    judge0Id: 105,
    monacoLanguage: 'cpp',
    fileExtension: 'cpp',
  },
  c: {
    id: 'c',
    name: 'C (GCC 14)',
    version: '14.1.0',
    judge0Id: 103,
    monacoLanguage: 'c',
    fileExtension: 'c',
  },
  java: {
    id: 'java',
    name: 'Java (JDK 17)',
    version: '17.0.6',
    judge0Id: 91,
    monacoLanguage: 'java',
    fileExtension: 'java',
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript (Node.js)',
    version: '22.8.0',
    judge0Id: 102,
    monacoLanguage: 'javascript',
    fileExtension: 'js',
  },
};

export type JudgeVerdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compilation Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'
  | 'Internal Error';

export interface TestCaseItem {
  id: string;
  name: string;
  input: string;
  expectedOutput?: string;
  isCustom?: boolean;
  isHidden?: boolean;
}

export interface ExecutionResult {
  testCaseId: string;
  name: string;
  input: string;
  expectedOutput?: string;
  actualOutput: string;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  passed: boolean;
  verdict: JudgeVerdict;
  executionTimeMs: number;
  memoryKb: number;
  isCustom?: boolean;
  isHidden?: boolean;
}

export interface RunCodeResponse {
  success: boolean;
  verdict: JudgeVerdict;
  compileOutput: string | null;
  results: ExecutionResult[];
  error?: string;
}

export interface SubmitResponse {
  success: boolean;
  verdict: JudgeVerdict;
  totalTests: number;
  passedTests: number;
  failedTestIndex?: number;
  failedTestName?: string;
  compileOutput?: string | null;
  errorDetails?: string | null;
  executionTimeMs?: number;
  memoryKb?: number;
  results: ExecutionResult[];
  problemId: string;
  hasOfficialJudgingSuite?: boolean;
  evaluationNotice?: string;
}
