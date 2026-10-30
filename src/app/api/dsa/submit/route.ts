import { NextRequest, NextResponse } from 'next/server';
import { getProblemById, getJudgingTestCases } from '@/lib/services/judge/testcases';
import { executeInJudge0 } from '@/lib/services/judge/judge0';
import { wrapCodeWithDriver, compareOutputs } from '@/lib/services/judge/adapters';
import { checkRateLimit, validateCodeSubmission } from '@/lib/services/judge/security';
import type { SupportedLanguage, ExecutionResult, JudgeVerdict, SubmitResponse } from '@/lib/services/judge/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(`submit_${ip}`, 8, 8)) {
      return NextResponse.json(
        { success: false, error: 'Submission rate limit reached. Please wait a few seconds before submitting again.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { problemId, language, sourceCode } = body;

    const validation = validateCodeSubmission(sourceCode, language);
    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    const problem = getProblemById(problemId);
    if (!problem) {
      return NextResponse.json({ success: false, error: `Problem '${problemId}' not found` }, { status: 404 });
    }

    const officialTestCases = getJudgingTestCases(problem.id);
    if (officialTestCases.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No official judging test cases configured for this problem' },
        { status: 400 }
      );
    }

    const wrappedSource = wrapCodeWithDriver(sourceCode, language as SupportedLanguage, problem);

    const results: ExecutionResult[] = [];
    let overallVerdict: JudgeVerdict = 'Accepted';
    let failedTestIndex: number | undefined;
    let failedTestName: string | undefined;
    let sharedCompileOutput: string | null = null;
    let maxTimeMs = 0;
    let maxMemoryKb = 0;
    let passedCount = 0;

    for (let i = 0; i < officialTestCases.length; i++) {
      const tc = officialTestCases[i];
      const judgeOutput = await executeInJudge0(language as SupportedLanguage, wrappedSource, tc.input);

      if (judgeOutput.compileOutput) {
        sharedCompileOutput = judgeOutput.compileOutput;
      }

      maxTimeMs = Math.max(maxTimeMs, judgeOutput.executionTimeMs);
      maxMemoryKb = Math.max(maxMemoryKb, judgeOutput.memoryKb);

      const cleanActual = (judgeOutput.rawStdout || '').trim();
      let isPassed = false;
      let testVerdict: JudgeVerdict = judgeOutput.verdict;

      if (judgeOutput.verdict === 'Compilation Error') {
        testVerdict = 'Compilation Error';
        overallVerdict = 'Compilation Error';
        failedTestIndex = i + 1;
        failedTestName = tc.name;
      } else if (judgeOutput.verdict === 'Time Limit Exceeded') {
        testVerdict = 'Time Limit Exceeded';
        if (overallVerdict === 'Accepted') {
          overallVerdict = 'Time Limit Exceeded';
          failedTestIndex = i + 1;
          failedTestName = tc.name;
        }
      } else if (judgeOutput.verdict === 'Runtime Error') {
        testVerdict = 'Runtime Error';
        if (overallVerdict === 'Accepted') {
          overallVerdict = 'Runtime Error';
          failedTestIndex = i + 1;
          failedTestName = tc.name;
        }
      } else if (judgeOutput.verdict === 'Internal Error') {
        testVerdict = 'Internal Error';
        if (overallVerdict === 'Accepted') {
          overallVerdict = 'Internal Error';
          failedTestIndex = i + 1;
          failedTestName = tc.name;
        }
      } else {
        isPassed = compareOutputs(cleanActual, tc.expectedOutput);
        if (isPassed) {
          testVerdict = 'Accepted';
          passedCount++;
        } else {
          testVerdict = 'Wrong Answer';
          if (overallVerdict === 'Accepted') {
            overallVerdict = 'Wrong Answer';
            failedTestIndex = i + 1;
            failedTestName = tc.name;
          }
        }
      }

      // Security: do NOT expose hidden test case inputs and expected outputs to the client
      const safeInput = tc.isHidden ? '[Hidden Input]' : tc.input;
      const safeExpected = tc.isHidden ? '[Hidden Expected Output]' : tc.expectedOutput;
      const safeActual = tc.isHidden && !isPassed ? '[Hidden Actual Output]' : cleanActual;

      results.push({
        testCaseId: tc.id,
        name: tc.name,
        input: safeInput,
        expectedOutput: safeExpected,
        actualOutput: safeActual,
        stdout: tc.isHidden && !isPassed ? null : judgeOutput.rawStdout,
        stderr: judgeOutput.rawStderr,
        compileOutput: judgeOutput.compileOutput,
        passed: isPassed,
        verdict: testVerdict,
        executionTimeMs: judgeOutput.executionTimeMs,
        memoryKb: judgeOutput.memoryKb,
        isHidden: !!tc.isHidden,
      });

      // Stop after first failure in official judging, matching LeetCode behavior
      if (testVerdict !== 'Accepted') {
        break;
      }
    }

    const responsePayload: SubmitResponse = {
      success: true,
      verdict: overallVerdict,
      totalTests: officialTestCases.length,
      passedTests: passedCount,
      failedTestIndex,
      failedTestName,
      compileOutput: sharedCompileOutput,
      executionTimeMs: maxTimeMs,
      memoryKb: maxMemoryKb,
      results,
      problemId: problem.id,
    };

    return NextResponse.json(responsePayload);
  } catch (err: unknown) {
    console.error('Submit route error:', err);
    const msg = err instanceof Error ? err.message : 'Internal judging error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
