import { NextRequest, NextResponse } from 'next/server';
import {
  getAdminPasscode,
  timingSafeCompare,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  verifyAdminRequest,
} from '@/lib/security/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';

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

    // 2. Brute-Force Rate Limiting
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-login-${ip}`, 5, 15 * 60 * 1000); // 5 attempts per 15 min
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Access temporarily locked for security. Please retry in ${rateCheck.resetInSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const passcode = typeof body?.passcode === 'string' ? body.passcode.trim() : '';

    if (!passcode) {
      return NextResponse.json({ error: 'Admin passkey is required.' }, { status: 400 });
    }

    const activePasscode = getAdminPasscode();
    const isValid = timingSafeCompare(passcode, activePasscode);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid admin authorization passkey.' }, { status: 401 });
    }

    const res = NextResponse.json({
      success: true,
      message: 'Admin session authorized.',
    });

    setAdminSessionCookie(res);
    return res;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Authentication failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * DELETE: Signs out the administrator and revokes the session cookie.
 */
export async function DELETE(req: NextRequest) {
  if (!verifyCsrfOrigin(req)) {
    return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
  }

  const res = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  clearAdminSessionCookie(res);
  return res;
}
