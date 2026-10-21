import { NextRequest, NextResponse } from 'next/server';
import { SESSION_CONFIG } from '@/lib/security/session-config';
import { invalidateSession, clearSessionCookies } from '@/lib/security/session-manager';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST: Immediately logs out the user, invalidates the session server-side,
 * and clears all session cookies.
 */
export async function POST(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const token = req.cookies.get(SESSION_CONFIG.cookieName)?.value;
    if (token) {
      invalidateSession(token);
    }

    const res = NextResponse.json({
      success: true,
      message: 'Session successfully invalidated and logged out.',
    });

    clearSessionCookies(res);
    return res;
  } catch (err: unknown) {
    console.error('Logout error:', err);
    const res = NextResponse.json({ success: true, message: 'Logged out.' });
    clearSessionCookies(res);
    return res;
  }
}
