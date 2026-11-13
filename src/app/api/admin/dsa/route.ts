import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/security/admin-auth';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';
import {
  fetchLeetCodeDailyChallenge,
  fetchLeetCodeQuestionBySlug,
  buildCompleteDsaProblem,
  getCustomDsaProblems,
  saveCustomDsaProblem,
} from '@/lib/services/dsa/leetcode-sync';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), 'data');
const CUSTOM_PROBLEMS_FILE = path.join(DATA_DIR, 'custom_dsa_problems.json');

/**
 * GET: Fetches list of custom problems and live LeetCode POTD metadata for the Admin.
 */
export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
  }

  try {
    const customProblems = getCustomDsaProblems();
    const liveLeetCodeDaily = await fetchLeetCodeDailyChallenge();

    return NextResponse.json({
      success: true,
      customProblems,
      liveLeetCodeDaily: liveLeetCodeDaily
        ? {
            title: liveLeetCodeDaily.title,
            titleSlug: liveLeetCodeDaily.titleSlug,
            difficulty: liveLeetCodeDaily.difficulty,
            date: liveLeetCodeDaily.date,
            topicTags: liveLeetCodeDaily.topicTags.map((t) => t.name),
            link: liveLeetCodeDaily.link,
          }
        : null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST: Handles fetching/generating previews or publishing custom problems to StackUp.
 */
export async function POST(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
  }

  if (!verifyCsrfOrigin(req)) {
    return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action;

    // 1. Action: Preview Daily Challenge
    if (action === 'preview-daily') {
      const raw = await fetchLeetCodeDailyChallenge();
      if (!raw) {
        return NextResponse.json({ error: 'Failed to fetch today\'s LeetCode Daily Challenge.' }, { status: 404 });
      }

      const problem = await buildCompleteDsaProblem(raw);
      return NextResponse.json({
        success: true,
        problem,
        source: 'leetcode-daily',
        originalDate: raw.date,
      });
    }

    // 2. Action: Preview Custom Slug or URL
    if (action === 'preview-slug') {
      const slug = typeof body.slug === 'string' ? body.slug.trim() : '';
      if (!slug) {
        return NextResponse.json({ error: 'Please enter a valid problem slug or LeetCode URL.' }, { status: 400 });
      }

      const raw = await fetchLeetCodeQuestionBySlug(slug);
      if (!raw) {
        return NextResponse.json({ error: `Could not find LeetCode problem matching "${slug}".` }, { status: 404 });
      }

      const problem = await buildCompleteDsaProblem(raw);
      return NextResponse.json({
        success: true,
        problem,
        source: 'custom-slug',
      });
    }

    // 3. Action: Publish Problem to StackUp
    if (action === 'publish') {
      const problem = body.problem;
      const scheduledForDate = typeof body.scheduledForDate === 'string' ? body.scheduledForDate.trim() : undefined;

      if (!problem || !problem.title || !problem.solutions) {
        return NextResponse.json({ error: 'Invalid problem data provided for publishing.' }, { status: 400 });
      }

      const record = saveCustomDsaProblem(problem, scheduledForDate);
      return NextResponse.json({
        success: true,
        message: `Successfully published "${record.title}" to StackUp for ${record.scheduledForDate}.`,
        record,
      });
    }

    // 4. Action: Delete Problem
    if (action === 'delete') {
      const id = typeof body.id === 'string' ? body.id : '';
      if (!id) {
        return NextResponse.json({ error: 'Problem ID required.' }, { status: 400 });
      }

      const existing = getCustomDsaProblems();
      const filtered = existing.filter((p) => p.id !== id);
      fs.writeFileSync(CUSTOM_PROBLEMS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

      return NextResponse.json({
        success: true,
        message: 'Problem removed from custom list.',
      });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Operation failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
