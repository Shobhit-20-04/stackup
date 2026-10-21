import { NextRequest, NextResponse } from 'next/server';
import {
  getAdminPasscode,
  getAdminEmail,
  timingSafeCompare,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  verifyAdminRequest,
} from '@/lib/security/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';
import { SESSION_CONFIG } from '@/lib/security/session-config';
import {
  createSessionToken,
  setSessionCookie,
  invalidateSession,
  clearSessionCookies,
} from '@/lib/security/session-manager';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET: Checks whether the current requester has a valid admin session.
 */
export async function GET(req: NextRequest) {
  const isAuth = verifyAdminRequest(req);
  return NextResponse.json({ authenticated: isAuth });
}

/**
 * POST: Authenticates administrator using passkey and issues signed HttpOnly session cookie.
 * Defends against brute force via IP-based rate limiting (5 attempts / 15 minutes).
 */
export async function POST(req: NextRequest) {
  try {
    // 1. CSRF Protection
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    // 2. Brute-Force Rate Limiting (10 attempts per 5 minutes per IP)
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-login-${ip}`, 10, 5 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed attempts. Access temporarily locked for security. Please try again in ${rateCheck.resetInSeconds} seconds.`,
          code: 'RATE_LIMITED',
          resetInSeconds: rateCheck.resetInSeconds,
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const passcode = typeof body?.passcode === 'string' ? body.passcode.trim() : '';

    if (!passcode) {
      return NextResponse.json(
        { error: 'Please enter the security key.', code: 'EMPTY_CREDENTIALS' },
        { status: 400 }
      );
    }

    const activePasscode = getAdminPasscode();
    const isValid = timingSafeCompare(passcode, activePasscode);

    if (!isValid) {
      return NextResponse.json(
        { 
          error: 'Invalid security key. Please try again.',
          code: 'INVALID_CREDENTIALS',
          attemptsRemaining: rateCheck.remaining
        }, 
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      success: true,
      message: 'Admin session authorized.',
    });

    const { token: sessionToken } = createSessionToken({
      userId: 'admin-master',
      email: getAdminEmail(),
      role: 'admin',
      rememberMe: false,
    });

    setAdminSessionCookie(res);
    setSessionCookie(res, sessionToken, false);
    return res;
  } catch (err: unknown) {
    console.error('Admin authentication error:', err);
    return NextResponse.json({ error: 'Authentication failed due to an unexpected server error.' }, { status: 500 });
  }
}

/**
 * DELETE: Signs out the administrator and revokes the session cookie.
 */
export async function DELETE(req: NextRequest) {
  if (!verifyCsrfOrigin(req)) {
    return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
  }

  const sessionToken = req.cookies.get(SESSION_CONFIG.cookieName)?.value;
  if (sessionToken) {
    invalidateSession(sessionToken);
  }

  const res = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  clearAdminSessionCookie(res);
  clearSessionCookies(res);
  return res;
}
