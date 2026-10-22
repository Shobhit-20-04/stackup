import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest, getAdminEmail } from '@/lib/security/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { verifyCsrfOrigin } from '@/lib/security/sanitize';
import { reprocessResume } from '@/lib/services/resume/resume-repository';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-reprocess-${ip}`, 20, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Please wait ${rateCheck.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ error: 'Unauthorized. Admin authorization required.' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const id = typeof body?.id === 'string' ? body.id.trim() : '';

    if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: 'Valid Resume UUID is required.' }, { status: 400 });
    }

    const adminEmail = getAdminEmail();
    const updated = await reprocessResume(id, adminEmail, ip);

    return NextResponse.json({
      success: true,
      message: 'Resume successfully re-parsed and re-scored through the latest ATS engine.',
      resume: updated,
    });
  } catch (err: unknown) {
    console.error('Failed to reprocess resume:', err);
    const msg = err instanceof Error ? err.message : 'Failed to reprocess resume.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
