import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { createClient } from '@/lib/supabase/server';
import { sanitizeFilename, validateFileMagic, verifyCsrfOrigin } from '@/lib/security/sanitize';
import type { Json } from '@/lib/types/database';
import { 
  analyzeResume, 
  analyzeResumeText, 
  type ResumeAnalysisResult, 
  type ExperienceLevel 
} from '@/lib/services/resume';
import { saveUploadedResume } from '@/lib/services/resume/resume-repository';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Backwards-compatible synchronous analysis helper for tests and text-based evaluation.
 */
export function analyzeResumeLocally(text: string, filename = 'Resume.txt'): ResumeAnalysisResult {
  return analyzeResumeText(text, filename);
}

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF Protection
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    // 2. Rate limiting (20 requests/min per IP)
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`resume-${ip}`, 20, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Please wait ${rateCheck.resetInSeconds} seconds before re-analyzing.` },
        { status: 429 }
      );
    }

    // 3. Authentication Check: User must be authenticated to analyze and store resumes
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const demoCookie = req.cookies.get('sb-demo-user')?.value;
    let localUserId: string | null = null;
    let localUserEmail: string | null = null;
    if (demoCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(demoCookie));
        if (parsed?.id && parsed?.email && !parsed.isDemo && parsed.id !== 'student-demo' && parsed.email !== 'guest@stackup.xyz') {
          localUserId = parsed.id;
          localUserEmail = parsed.email;
        }
      } catch {
        // demo cookie parse error ignored
      }
    }

    const effectiveUserId = user?.id || localUserId;
    const effectiveEmail = user?.email || localUserEmail;

    if (!effectiveUserId) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in or register an account before analyzing your resume.' },
        { status: 401 }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'A valid resume file (.pdf, .docx, or .txt) upload via multipart/form-data is mandatory.' },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const customJd = (formData.get('jobDescription') as string | null) || undefined;
    const targetRole = (formData.get('targetRole') as string | null) || undefined;
    const experienceLevelRaw = (formData.get('experienceLevel') as string | null) || 'student_fresher';
    
    const validLevels: ExperienceLevel[] = ['student_fresher', 'junior', 'mid_senior'];
    const experienceLevel: ExperienceLevel = validLevels.includes(experienceLevelRaw as ExperienceLevel)
      ? (experienceLevelRaw as ExperienceLevel)
      : 'student_fresher';

    if (!file) {
      return NextResponse.json(
        { error: 'A valid resume file (.pdf, .docx, or .txt) upload is mandatory.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload a smaller file.` },
        { status: 400 }
      );
    }

    const filename = sanitizeFilename(file.name);
    const fileSize = file.size;
    const lowerName = filename.toLowerCase();
    const fileExt = lowerName.includes('.') ? lowerName.slice(lowerName.lastIndexOf('.')) : '.pdf';

    // Read binary file buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileDataBase64 = fileBuffer.toString('base64');

    // 4. Magic Byte Signature Validation
    const magicExt = fileExt.replace(/^\./, '');
    const magicCheck = validateFileMagic(fileBuffer, magicExt);
    if (!magicCheck.valid) {
      return NextResponse.json({ error: magicCheck.error || 'Invalid file format.' }, { status: 400 });
    }

    // 5. Execute Unified ATS Resume Engine
    const analysis: ResumeAnalysisResult = await analyzeResume({
      fileBuffer,
      filename,
      fileExt,
      jobDescription: customJd,
      targetRole: targetRole,
      experienceLevel,
    });

    // Check for password protection
    if (analysis.parsingReport.isEncrypted) {
      return NextResponse.json(
        { error: 'This document is password-protected or encrypted. Please remove the password and re-upload.' },
        { status: 400 }
      );
    }

    // Check for empty or completely corrupted document
    if (analysis.parsingReport.cleanText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Unable to extract any text from this document. Please ensure the file is not empty or corrupted.' },
        { status: 400 }
      );
    }

    // 6. Store uploaded resume and analysis in persistent repository & database
    try {
      const emailMatch = analysis.parsingReport.cleanText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const detectedEmail = effectiveEmail || (emailMatch ? emailMatch[0] : null);

      const isUUID = typeof effectiveUserId === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(effectiveUserId);
      const dbUserId = isUUID ? effectiveUserId : null;

      await saveUploadedResume({
        filename: analysis.filename,
        file_size: fileSize,
        mime_type: analysis.parsingReport.mimeType,
        resume_text: analysis.parsingReport.cleanText,
        ats_score: analysis.ats_score,
        analysis: {
          grade: analysis.grade,
          summary: analysis.summary,
          breakdown: analysis.breakdown,
          matched_keywords: analysis.matched_keywords,
          missing_keywords: analysis.missing_keywords,
          formatting_issues: analysis.formatting_issues,
          bullet_rewrites: analysis.bullet_rewrites,
        },
        user_id: dbUserId,
        user_email: detectedEmail,
        target_role: targetRole || null,
        job_description: customJd || null,
        ip_address: ip,
        file_data: fileDataBase64,
        status: 'parsed',
      });

      if (dbUserId) {
        await (supabase.from('resume_analyses') as unknown as {
          insert: (data: Record<string, unknown>) => Promise<unknown>;
        }).insert({
          user_id: dbUserId,
          filename: analysis.filename,
          ats_score: analysis.ats_score,
          feedback: analysis as unknown as Json,
          resume_text: analysis.parsingReport.cleanText,
        }).catch(() => {});
      }
    } catch (dbErr) {
      console.warn('Note: Storing resume encountered an issue:', dbErr);
    }

    return NextResponse.json(analysis);
  } catch (err: unknown) {
    console.error('Resume analysis failed with unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while analyzing the resume. Please try again later.' },
      { status: 500 }
    );
  }
}
