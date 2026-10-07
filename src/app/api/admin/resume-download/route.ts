import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getActiveAdminPasscode } from '@/app/api/admin/data/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const activePasscode = getActiveAdminPasscode();
  const validKeys = ['stack2004up'];
  if (activePasscode && !validKeys.includes(activePasscode)) {
    validKeys.push(activePasscode);
  }

  const authHeader = req.headers.get('authorization') || '';
  const adminKey = req.headers.get('x-admin-key') || '';
  const queryKey = req.nextUrl.searchParams.get('key') || '';

  if (validKeys.includes(adminKey) || validKeys.includes(queryKey)) {
    return true;
  }

  if (authHeader.startsWith('Bearer ') && validKeys.includes(authHeader.slice(7))) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized. Valid administrator passcode required.' }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    const format = searchParams.get('format');

    if (!id) {
      return NextResponse.json({ error: 'Resume ID parameter is required.' }, { status: 400 });
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

    const originalFilename = resume.filename || 'Candidate_Resume.pdf';
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
