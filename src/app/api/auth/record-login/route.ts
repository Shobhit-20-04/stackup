import { NextRequest, NextResponse } from 'next/server';
import { recordLoginAudit } from '@/lib/services/login-audit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, fullName, userId, authMethod } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required to log authentication.' }, { status: 400 });
    }

    // Capture IP address safely
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || '::1';

    // Capture User Agent / Browser
    const userAgent = req.headers.get('user-agent') || 'Browser Client';

    const recorded = await recordLoginAudit({
      email,
      fullName: fullName || null,
      userId: userId || null,
      authMethod: authMethod || 'Email & Password',
      ipAddress: ip,
      userAgent,
    });

    return NextResponse.json({ success: true, logId: recorded.id });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Failed to record login audit';
    return NextResponse.json({ error }, { status: 500 });
  }
}
