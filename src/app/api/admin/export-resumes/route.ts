import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest, getAdminEmail } from '@/lib/security/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { getUploadedResumes, recordAdminAudit } from '@/lib/services/resume/resume-repository';
import { escapeCsvCell } from '@/lib/security/sanitize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-export-${ip}`, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Export rate limit exceeded. Please wait ${rateCheck.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    if (!verifyAdminRequest(req)) {
      return NextResponse.json({ error: 'Unauthorized. Admin authorization required.' }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const searchQuery = (searchParams.get('search') || '').toLowerCase().trim();
    const gradeFilter = searchParams.get('grade') || 'ALL';
    const formatFilter = (searchParams.get('format') || 'ALL').toLowerCase();
    const dateRange = searchParams.get('dateRange') || 'ALL';
    const selectedIds = searchParams.get('ids') ? searchParams.get('ids')!.split(',') : [];

    const allResumes = await getUploadedResumes();

    // Filter resumes based on parameters
    const now = Date.now();
    const filtered = allResumes.filter((r) => {
      // Selected IDs filter (if bulk export of checked candidates)
      if (selectedIds.length > 0 && !selectedIds.includes(r.id)) {
        return false;
      }

      // Search match
      if (searchQuery) {
        const nameMatch = (r.candidate_name || '').toLowerCase().includes(searchQuery);
        const emailMatch = (r.user_email || '').toLowerCase().includes(searchQuery);
        const fileMatch = r.filename.toLowerCase().includes(searchQuery);
        const idMatch = r.id.toLowerCase().includes(searchQuery);
        const skillsMatch = (r.analysis?.matched_keywords || []).some((s) => s.toLowerCase().includes(searchQuery));
        if (!nameMatch && !emailMatch && !fileMatch && !idMatch && !skillsMatch) {
          return false;
        }
      }

      // Grade match
      if (gradeFilter !== 'ALL') {
        const grade = r.analysis?.grade || (r.ats_score >= 88 ? 'A+' : r.ats_score >= 78 ? 'A' : r.ats_score >= 66 ? 'B' : r.ats_score >= 52 ? 'C' : 'D');
        if (grade !== gradeFilter) return false;
      }

      // Format match
      if (formatFilter !== 'all') {
        const fn = r.filename.toLowerCase();
        if (formatFilter === 'pdf' && !fn.endsWith('.pdf')) return false;
        if (formatFilter === 'docx' && !fn.endsWith('.docx')) return false;
        if (formatFilter === 'txt' && !fn.endsWith('.txt')) return false;
      }

      // Date Range match
      if (dateRange !== 'ALL') {
        const createdMs = new Date(r.created_at).getTime();
        const diffDays = (now - createdMs) / (1000 * 60 * 60 * 24);
        if (dateRange === 'today' && diffDays > 1) return false;
        if (dateRange === '7d' && diffDays > 7) return false;
        if (dateRange === '30d' && diffDays > 30) return false;
      }

      return true;
    });

    const headers = [
      'Candidate Name',
      'Email Address',
      'Uploaded Filename',
      'Upload Date',
      'File Size (KB)',
      'File Format',
      'ATS Score',
      'Letter Grade',
      'Contact Score',
      'Skills Score',
      'Experience Score',
      'Formatting Score',
      'Top Matched Skills',
      'Missing Industry Skills',
      'Status',
    ];

    const rows: string[] = [headers.map(escapeCsvCell).join(',')];

    for (const r of filtered) {
      const sizeKb = r.file_size ? (r.file_size / 1024).toFixed(1) : '—';
      const ext = r.filename.includes('.') ? r.filename.slice(r.filename.lastIndexOf('.') + 1).toUpperCase() : 'PDF';
      const grade = r.analysis?.grade || (r.ats_score >= 88 ? 'A+' : r.ats_score >= 78 ? 'A' : r.ats_score >= 66 ? 'B' : r.ats_score >= 52 ? 'C' : 'D');
      const b = r.analysis?.breakdown;
      const matched = (r.analysis?.matched_keywords || []).slice(0, 10).join('; ');
      const missing = (r.analysis?.missing_keywords || []).slice(0, 8).join('; ');

      const row = [
        r.candidate_name || 'Applicant',
        r.user_email || '—',
        r.filename,
        new Date(r.created_at).toISOString(),
        sizeKb,
        ext,
        r.ats_score,
        grade,
        b?.contact_score ?? '—',
        b?.skills_score ?? '—',
        b?.experience_score ?? '—',
        b?.formatting_score ?? '—',
        matched,
        missing,
        r.status || 'parsed',
      ];
      rows.push(row.map(escapeCsvCell).join(','));
    }

    const csvContent = '\uFEFF' + rows.join('\r\n'); // Add UTF-8 BOM for Microsoft Excel compatibility
    const adminEmail = getAdminEmail();

    await recordAdminAudit({
      action: 'EXPORT',
      admin_email: adminEmail,
      target_id: 'csv_export',
      target_name: `${filtered.length} candidates exported`,
      details: `Exported ${filtered.length} candidate resume records to CSV`,
      ip_address: ip,
    });

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="stackup_candidate_resumes_${new Date().toISOString().slice(0, 10)}.csv"`,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache, private',
      },
    });
  } catch (err: unknown) {
    console.error('Failed to export resumes to CSV:', err);
    return NextResponse.json({ error: 'Server error generating candidate CSV export.' }, { status: 500 });
  }
}
