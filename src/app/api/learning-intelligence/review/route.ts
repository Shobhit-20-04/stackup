import { NextRequest, NextResponse } from 'next/server';
import { authenticateUserRequest } from '@/lib/auth/server-auth';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { calculateSM2Schedule } from '@/lib/services/learning-intelligence/sm2';
import type { RevisionItem, SM2Rating } from '@/lib/types/learning-intelligence';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/learning-intelligence/review
 * Records an SM-2 spaced repetition rating and returns updated schedule parameters.
 */
export async function POST(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`sm2-review-${ip}`, 60, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many review ratings submitted. Please retry in ${rateCheck.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    const auth = await authenticateUserRequest(req);
    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        { error: 'Authentication required to submit spaced repetition reviews.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { revisionItem, rating } = body;

    if (!revisionItem || typeof revisionItem !== 'object' || !revisionItem.id) {
      return NextResponse.json({ error: 'Valid revisionItem is required.' }, { status: 400 });
    }

    const validRatings = [1, 2, 3, 4, 5];
    if (!validRatings.includes(rating)) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5.' }, { status: 400 });
    }

    const typedItem: RevisionItem = {
      ...revisionItem,
      repetitionCount: Number(revisionItem.repetitionCount) || 0,
      intervalDays: Number(revisionItem.intervalDays) || 0,
      easeFactor: Number(revisionItem.easeFactor) || 2.5,
      dueDate: revisionItem.dueDate || new Date().toISOString(),
    };

    const updatedSchedule = calculateSM2Schedule(typedItem, rating as SM2Rating);

    return NextResponse.json({
      success: true,
      updatedItem: updatedSchedule,
    });
  } catch (error) {
    console.error('Error recording SM-2 review:', error);
    return NextResponse.json(
      { error: 'Failed to record spaced repetition review.' },
      { status: 500 }
    );
  }
}
