import { NextRequest, NextResponse } from 'next/server';
import { SESSION_CONFIG } from '@/lib/security/session-config';
import { validateSessionToken } from '@/lib/security/session-manager';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET: Returns current session validity and remaining inactivity/absolute durations.
 * Does NOT reset or extend the inactivity timer (read-only inspection).
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_CONFIG.cookieName)?.value;
  const validation = validateSessionToken(token);

  if (!validation.valid || !validation.payload) {
    return NextResponse.json({
      authenticated: false,
      reason: validation.reason || 'missing',
      serverTime: Date.now(),
    });
  }

  return NextResponse.json({
    authenticated: true,
    userId: validation.payload.userId,
    email: validation.payload.email,
    role: validation.payload.role,
    remainingInactivityMs: validation.remainingInactivityMs,
    remainingAbsoluteMs: validation.remainingAbsoluteMs,
    shouldWarn: validation.shouldWarn,
    warningThresholdMs: SESSION_CONFIG.warningThresholdMs,
    serverTime: Date.now(),
  });
}
