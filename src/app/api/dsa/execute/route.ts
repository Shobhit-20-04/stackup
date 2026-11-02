import { NextRequest, NextResponse } from 'next/server';
import { getProblemById, getSampleTestCases } from '@/lib/services/judge/testcases';
import { executeBatchInJudge0, type BatchItemInput } from '@/lib/services/judge/judge0';
import { wrapCodeWithDriver, compareOutputs } from '@/lib/services/judge/adapters';
import { checkRateLimit, validateCodeSubmission } from '@/lib/services/judge/security';
import { authenticateUserRequest } from '@/lib/auth/server-auth';
import type { SupportedLanguage, ExecutionResult, JudgeVerdict } from '@/lib/services/judge/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Mandatory Server-Side Authentication Enforcement
    // Unauthenticated callers are strictly blocked with HTTP 401
    const auth = await authenticateUserRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required. Please sign in to execute code in the workspace.',
          code: 'UNAUTHORIZED',
        },
        { status: 401 }
      );
    }

    // 2. IP-based Rate Limiting (12 executions per minute)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(`dsa_exec_${ip}`, 12, 60)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please wait a few seconds before executing code again.' },
        { status: 429 }
      );
    }

    // 3. Payload Extraction & Validation
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { problemId, language, sourceCode, testCases: clientTestCases } = body;

    const validation = validateCodeSubmission(sourceCode, language, clientTestCases);
    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    const problem = getProblemById(problemId);
    if (!problem) {
      return NextResponse.json({ success: false, error: `Problem '${problemId}' not found` }, { status: 404 });
    }

    // If client didn't supply test cases, use problem's built-in sample cases
    const testCasesToRun: BatchItemInput[] =
      Array.isArray(clientTestCases) && clientTestCases.length > 0
        ? clientTestCases
        : getSampleTestCases(problem.id);

    const wrappedSource = wrapCodeWithDriver(sourceCode, language as SupportedLanguage, problem);

    // 4. Concurrent High-Performance Batch Execution
    // Executes all test cases concurrently via Judge0 Batch API in a single HTTP dispatch
    const judgeOutputs = await executeBatchInJudge0(
      language as SupportedLanguage,
      wrappedSource,
      testCasesToRun
    );

    const results: ExecutionResult[] = [];
    let overallVerdict: JudgeVerdict = 'Accepted';
    let sharedCompileOutput: string | null = null;

    for (let i = 0; i < testCasesToRun.length; i++) {
      const tc = testCasesToRun[i];
      const judgeOutput = judgeOutputs[i] || {
        rawStdout: null,
        rawStderr: 'Missing execution result',
        compileOutput: null,
        executionTimeMs: 0,
        memoryKb: 0,
        verdict: 'Internal Error' as JudgeVerdict,
        description: 'Missing execution result',
      };

      if (judgeOutput.compileOutput) {
        sharedCompileOutput = judgeOutput.compileOutput;
      }

      const cleanActual = (judgeOutput.rawStdout || '').trim();
      let isPassed = false;
      let testVerdict: JudgeVerdict = judgeOutput.verdict;

      if (judgeOutput.verdict === 'Compilation Error') {
        testVerdict = 'Compilation Error';
        isPassed = false;
        overallVerdict = 'Compilation Error';
      } else if (judgeOutput.verdict === 'Time Limit Exceeded') {
        testVerdict = 'Time Limit Exceeded';
        isPassed = false;
        if (overallVerdict === 'Accepted') overallVerdict = 'Time Limit Exceeded';
      } else if (judgeOutput.verdict === 'Runtime Error') {
        testVerdict = 'Runtime Error';
        isPassed = false;
        if (overallVerdict === 'Accepted') overallVerdict = 'Runtime Error';
      } else if (judgeOutput.verdict === 'Internal Error') {
        testVerdict = 'Internal Error';
        isPassed = false;
        if (overallVerdict === 'Accepted') overallVerdict = 'Internal Error';
      } else {
        // Output verification against expected output
        if (tc.expectedOutput) {
          isPassed = compareOutputs(cleanActual, tc.expectedOutput);
          testVerdict = isPassed ? 'Accepted' : 'Wrong Answer';
          if (!isPassed && overallVerdict === 'Accepted') {
            overallVerdict = 'Wrong Answer';
          }
        } else {
          // Custom test case without predefined expectation
          isPassed = true;
          testVerdict = 'Accepted';
        }
      }

      results.push({
        testCaseId: tc.id || `test-${i + 1}`,
        name: tc.name || (tc.isCustom ? `Custom Test ${i + 1}` : `Sample Case ${i + 1}`),
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: cleanActual,
        stdout: judgeOutput.rawStdout,
        stderr: judgeOutput.rawStderr,
        compileOutput: judgeOutput.compileOutput,
        passed: isPassed,
        verdict: testVerdict,
        executionTimeMs: judgeOutput.executionTimeMs,
        memoryKb: judgeOutput.memoryKb,
        isCustom: !!tc.isCustom,
      });
    }

    return NextResponse.json({
      success: true,
      verdict: overallVerdict,
      compileOutput: sharedCompileOutput,
      results,
    });
  } catch (err: unknown) {
    console.error('Execute route error:', err);
    const msg = err instanceof Error ? err.message : 'Internal execution error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
