import { NextRequest, NextResponse } from 'next/server';
import { SESSION_CONFIG } from '@/lib/security/session-config';
import {
  extendSessionActivity,
  setSessionCookie,
  clearSessionCookies,
} from '@/lib/security/session-manager';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST: Extends active session upon verified user interaction or "Continue Session" action.
 * Enforces rate limiting, CSRF verification, and absolute session lifetime.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. CSRF Verification
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    // 2. Rate Limiting (max 20 heartbeats / min per IP)
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`heartbeat-${ip}`, 20, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many heartbeat requests.', resetInSeconds: rateCheck.resetInSeconds },
        { status: 429 }
      );
    }

    const token = req.cookies.get(SESSION_CONFIG.cookieName)?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'No active session token found.', code: 'missing' },
        { status: 401 }
      );
    }

    const result = extendSessionActivity(token);

    if (!result.success || !result.newToken || !result.payload) {
      const res = NextResponse.json(
        {
          error: result.error || 'Session could not be extended.',
          code: result.code || 'expired_inactivity',
        },
        { status: 401 }
      );
      clearSessionCookies(res);
      return res;
    }

    const res = NextResponse.json({
      success: true,
      remainingInactivityMs: result.remainingInactivityMs,
      remainingAbsoluteMs: result.remainingAbsoluteMs,
      serverTime: Date.now(),
    });

    setSessionCookie(res, result.newToken, result.payload.rememberMe);
    return res;
  } catch (err: unknown) {
    console.error('Session extension error:', err);
    return NextResponse.json(
      { error: 'Failed to extend session due to an unexpected server error.' },
      { status: 500 }
    );
  }
}
