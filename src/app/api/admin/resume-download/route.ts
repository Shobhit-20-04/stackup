import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAdminRequest } from '@/lib/security/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { sanitizeFilename } from '@/lib/security/sanitize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-download-${ip}`, 20, 60 * 1000);
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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || (!serviceRoleKey && !anonKey)) {
      return NextResponse.json({ error: 'Supabase configuration is missing.' }, { status: 500 });
    }

    const clientKey = (serviceRoleKey && !serviceRoleKey.includes('placeholder')) ? serviceRoleKey : anonKey!;
    const supabase = createClient(supabaseUrl, clientKey);

    const { data: resume, error } = await supabase
      .from('uploaded_resumes')
      .select('id, filename, mime_type, file_data, resume_text')
      .eq('id', id)
      .single();

    if (error || !resume) {
      return NextResponse.json({ error: 'Resume document not found.' }, { status: 404 });
    }

    const rawFilename = resume.filename || 'Candidate_Resume.pdf';
    const originalFilename = sanitizeFilename(rawFilename);
    const cleanBasename = originalFilename.replace(/\.[^/.]+$/, '');

    // 1. Explicit text format requested
    if (format === 'txt') {
      const textContent = resume.resume_text || 'No text extracted.';
      return new NextResponse(textContent, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="${encodeURIComponent(cleanBasename)}_raw.txt"`,
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
          'Cache-Control': 'no-cache, private',
        },
      });
    }

    // 3. Fallback for older records stored prior to binary persistence: serve text content
    const fallbackText = resume.resume_text || 'Document content unavailable.';
    return new NextResponse(fallbackText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(cleanBasename)}.txt"`,
        'Cache-Control': 'no-cache, private',
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error generating resume download';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
