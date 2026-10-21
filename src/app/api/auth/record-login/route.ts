import { NextRequest, NextResponse } from 'next/server';
import { recordLoginAudit } from '@/lib/services/login-audit';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { sanitizeEmail, sanitizeText, verifyCsrfOrigin } from '@/lib/security/sanitize';
import { createSessionToken, setSessionCookie } from '@/lib/security/session-manager';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF Protection
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    // 2. Rate Limiting (15 audits / min per IP)
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`login-audit-${ip}`, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { email, fullName, userId, authMethod } = body;

    const cleanEmail = sanitizeEmail(email);
    if (!cleanEmail) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const cleanFullName = sanitizeText(fullName, 100);
    const cleanAuthMethod = sanitizeText(authMethod, 40) || 'Email & Password';
    const rawUserAgent = req.headers.get('user-agent') || 'Browser Client';
    const cleanUserAgent = sanitizeText(rawUserAgent, 250);

    const cleanUserId = typeof userId === 'string' && /^[0-9a-f-]{1,64}$/i.test(userId)
      ? userId
      : null;

    const recorded = await recordLoginAudit({
      email: cleanEmail,
      fullName: cleanFullName || null,
      userId: cleanUserId,
      authMethod: cleanAuthMethod as 'Google OAuth' | 'Email & Password' | 'Phone SMS OTP' | 'Email OTP',
      ipAddress: ip,
      userAgent: cleanUserAgent,
    });

    const isRememberMe = Boolean(body?.rememberMe);
    const effectiveUid = cleanUserId || `usr-${Date.now()}`;
    const { token } = createSessionToken({
      userId: effectiveUid,
      email: cleanEmail,
      role: 'student',
      rememberMe: isRememberMe,
    });

    const res = NextResponse.json({ success: true, logId: recorded.id });
    setSessionCookie(res, token, isRememberMe);
    return res;
  } catch (err: unknown) {
    console.error('Failed to record login audit:', err);
    return NextResponse.json({ error: 'Failed to record login audit due to an unexpected server error.' }, { status: 500 });
  }
}
