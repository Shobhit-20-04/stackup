import { NextRequest, NextResponse } from 'next/server';
import { getProblemById, getSampleTestCases } from '@/lib/services/judge/testcases';
import { executeInJudge0 } from '@/lib/services/judge/judge0';
import { wrapCodeWithDriver, compareOutputs } from '@/lib/services/judge/adapters';
import { checkRateLimit, validateCodeSubmission } from '@/lib/services/judge/security';
import type { SupportedLanguage, ExecutionResult, JudgeVerdict } from '@/lib/services/judge/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please wait a few seconds before executing code again.' },
        { status: 429 }
      );
    }

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
    const testCasesToRun =
      Array.isArray(clientTestCases) && clientTestCases.length > 0
        ? clientTestCases
        : getSampleTestCases(problem.id);

    const wrappedSource = wrapCodeWithDriver(sourceCode, language as SupportedLanguage, problem);

    const results: ExecutionResult[] = [];
    let overallVerdict: JudgeVerdict = 'Accepted';
    let sharedCompileOutput: string | null = null;

    for (let i = 0; i < testCasesToRun.length; i++) {
      const tc = testCasesToRun[i];
      const judgeOutput = await executeInJudge0(language as SupportedLanguage, wrappedSource, tc.input);

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
        // Judge ran successfully: compare actual output against expected
        if (tc.expectedOutput) {
          isPassed = compareOutputs(cleanActual, tc.expectedOutput);
          testVerdict = isPassed ? 'Accepted' : 'Wrong Answer';
          if (!isPassed && overallVerdict === 'Accepted') {
            overallVerdict = 'Wrong Answer';
          }
        } else {
          // Custom test case with no expected output provided: considered executed successfully
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

      // If compilation error occurred on first test, break early as other tests will also fail compilation
      if (testVerdict === 'Compilation Error') {
        break;
      }
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
