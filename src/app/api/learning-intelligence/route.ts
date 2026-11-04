import { NextRequest, NextResponse } from 'next/server';
import { authenticateUserRequest } from '@/lib/auth/server-auth';
import { sanitizeText, verifyCsrfOrigin } from '@/lib/security/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import type { MistakeEntry, LearningModule } from '@/lib/types/learning-intelligence';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/learning-intelligence
 * Fetches learning intelligence metadata for the authenticated user.
 */
export async function GET(req: NextRequest) {
  try {
    const auth = await authenticateUserRequest(req);
    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        { error: 'Authentication required to access Learning Intelligence.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: auth.user.id,
        email: auth.user.email,
      },
      message: 'Learning Intelligence session verified.',
    });
  } catch (error) {
    console.error('Error fetching learning intelligence:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve learning intelligence.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/learning-intelligence
 * Adds a new mistake entry to the user's journal or deletes an existing one.
 */
export async function POST(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`learning-intel-${ip}`, 30, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please retry in ${rateCheck.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    const auth = await authenticateUserRequest(req);
    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        { error: 'Authentication required to record mistakes.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const action = body.action || 'add_mistake';

    if (action === 'delete_mistake') {
      const mistakeId = sanitizeText(body.mistakeId, 64);
      if (!mistakeId) {
        return NextResponse.json({ error: 'Mistake ID required for deletion.' }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        deletedId: mistakeId,
      });
    }

    // Default action: add_mistake
    const rawModule = body.module as LearningModule;
    const validModules: LearningModule[] = ['dsa', 'core-cs', 'aptitude'];
    const moduleName = validModules.includes(rawModule) ? rawModule : 'dsa';

    const resourceId = sanitizeText(body.resourceId, 100);
    const resourceTitle = sanitizeText(body.resourceTitle, 150);
    const category = sanitizeText(body.category, 100);
    const mistakeType = sanitizeText(body.mistakeType, 50);
    const userNotes = sanitizeText(body.userNotes, 2000);
    const keyTakeaway = sanitizeText(body.keyTakeaway, 1000);

    if (!resourceId || !resourceTitle || !keyTakeaway) {
      return NextResponse.json(
        { error: 'resourceId, resourceTitle, and keyTakeaway are required fields.' },
        { status: 400 }
      );
    }

    const newMistake: MistakeEntry = {
      id: `mst-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userId: auth.user.id,
      module: moduleName,
      resourceId,
      resourceTitle,
      category: category || 'General',
      mistakeType: mistakeType || 'edge_case',
      userNotes: userNotes || '',
      keyTakeaway,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      mistake: newMistake,
    });
  } catch (error) {
    console.error('Error handling learning intelligence mutation:', error);
    return NextResponse.json(
      { error: 'Internal server error processing learning intelligence.' },
      { status: 500 }
    );
  }
}
