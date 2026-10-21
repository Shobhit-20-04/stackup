import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, setSessionCookie } from '@/lib/security/session-manager';
import { verifyCsrfOrigin, sanitizeEmail, sanitizeText } from '@/lib/security/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST: Initializes a new server-managed authenticated session upon login.
 * Issues signed HttpOnly session cookie containing creation and activity timestamps.
 */
export async function POST(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`session-create-${ip}`, 20, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Too many session requests.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { userId, email, role, rememberMe } = body;

    const cleanUserId = sanitizeText(userId, 64);
    const cleanEmail = sanitizeEmail(email) || 'user@stackup.xyz';
    const cleanRole = role === 'admin' ? 'admin' : 'student';
    const isRememberMe = Boolean(rememberMe);

    if (!cleanUserId) {
      return NextResponse.json({ error: 'A valid userId is required.' }, { status: 400 });
    }

    const { token, payload } = createSessionToken({
      userId: cleanUserId,
      email: cleanEmail,
      role: cleanRole,
      rememberMe: isRememberMe,
    });

    const res = NextResponse.json({
      success: true,
      session: {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        createdAt: payload.createdAt,
        lastActiveAt: payload.lastActiveAt,
        rememberMe: payload.rememberMe,
      },
    });

    setSessionCookie(res, token, isRememberMe);
    return res;
  } catch (err: unknown) {
    console.error('Session creation error:', err);
    return NextResponse.json(
      { error: 'Failed to create session due to an unexpected server error.' },
      { status: 500 }
    );
  }
}
