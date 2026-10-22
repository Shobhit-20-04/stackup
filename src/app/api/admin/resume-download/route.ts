import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest, getAdminEmail } from '@/lib/security/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { sanitizeFilename } from '@/lib/security/sanitize';
import { getUploadedResumeById, recordAdminAudit } from '@/lib/services/resume/resume-repository';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-download-${ip}`, 30, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Download rate limit exceeded. Please wait ${rateCheck.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ error: 'Unauthorized. Valid administrator authorization required.' }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    const format = searchParams.get('format');

    if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: 'Valid Resume UUID parameter is required.' }, { status: 400 });
    }

    const resume = await getUploadedResumeById(id);
    if (!resume) {
      return NextResponse.json({ error: 'Resume document not found.' }, { status: 404 });
    }

    const adminEmail = getAdminEmail();
    const rawFilename = resume.filename || 'Candidate_Resume.pdf';
    const originalFilename = sanitizeFilename(rawFilename);
    const cleanBasename = originalFilename.replace(/\.[^/.]+$/, '');

    // Record download action in admin audit trail
    await recordAdminAudit({
      action: 'DOWNLOAD',
      admin_email: adminEmail,
      target_id: resume.id,
      target_name: originalFilename,
      details: `Downloaded ${format === 'txt' ? 'plain text stream' : 'original file'} (${originalFilename})`,
      ip_address: ip,
    });

    // 1. Explicit text format requested
    if (format === 'txt') {
      const textContent = resume.resume_text || 'No text extracted.';
      return new NextResponse(textContent, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="${encodeURIComponent(cleanBasename)}_raw.txt"`,
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-cache, private',
        },
      });
    }

    // 2. Binary document download (PDF or DOCX) from saved file_data
    if (resume.file_data) {
      const fileBuffer = Buffer.from(resume.file_data, 'base64');
      const isPdf = originalFilename.toLowerCase().endsWith('.pdf');
      const isDocx = originalFilename.toLowerCase().endsWith('.docx');

      let mime = resume.mime_type;
      if (!mime || mime === 'application/octet-stream') {
        if (isPdf) mime = 'application/pdf';
        else if (isDocx) mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        else mime = 'application/octet-stream';
      }

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': mime,
          'Content-Disposition': `attachment; filename="${encodeURIComponent(originalFilename)}"`,
          'Content-Length': fileBuffer.length.toString(),
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-cache, private',
        },
      });
    }

    // 3. Fallback for older text-only records: serve text content
    const fallbackText = resume.resume_text || 'Document content unavailable.';
    return new NextResponse(fallbackText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(cleanBasename)}.txt"`,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache, private',
      },
    });
  } catch (err: unknown) {
    console.error('Failed to download resume file:', err);
    return NextResponse.json({ error: 'Server error downloading document.' }, { status: 500 });
  }
}
