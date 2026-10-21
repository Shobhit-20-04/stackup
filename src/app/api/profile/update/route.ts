import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sanitizeText, sanitizeUrl, verifyCsrfOrigin } from '@/lib/security/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 1. CSRF Verification
    if (!verifyCsrfOrigin(request)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    // 2. Rate Limiting (15 updates per minute per IP)
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`profile-update-${ip}`, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many profile updates. Please retry in ${rateCheck.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { userId: explicitUserId, fullName, phone, targetRole, college, gradYear, githubUrl, linkedinUrl } = body;

    // 3. Authenticate User Server-Side (Defends against BOLA / IDOR)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Enforce that user can only update their own profile
    if (user && explicitUserId && user.id !== explicitUserId) {
      return NextResponse.json(
        { error: 'Forbidden: You are not authorized to update another user’s profile.' },
        { status: 403 }
      );
    }

    let demoUserId: string | null = null;
    if (!user) {
      // Allow demo session updates only if caller presents authentic sb-demo-user cookie
      const cookieHeader = request.headers.get('cookie') || '';
      const match = cookieHeader.match(/sb-demo-user=([^;]+)/);
      if (match) {
        try {
          const parsed = JSON.parse(decodeURIComponent(match[1]));
          if (parsed && typeof parsed.id === 'string' && (!explicitUserId || parsed.id === explicitUserId)) {
            demoUserId = parsed.id;
          }
        } catch {
          demoUserId = null;
        }
      }
    }

    const effectiveUserId = user?.id || demoUserId;

    if (!effectiveUserId) {
      return NextResponse.json({ error: 'Authentication required to update profile.' }, { status: 401 });
    }

    // 4. Strict Input Sanitization (Defends against XSS and injection)
    const cleanFullName = sanitizeText(fullName, 100);
    const cleanPhone = sanitizeText(phone, 25);
    const cleanTargetRole = sanitizeText(targetRole, 80);
    const cleanCollege = sanitizeText(college, 120);
    const cleanGradYear = sanitizeText(gradYear, 10);
    const cleanGithubUrl = sanitizeUrl(githubUrl, ['github.com']);
    const cleanLinkedinUrl = sanitizeUrl(linkedinUrl, ['linkedin.com']);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isLive = supabaseUrl && !supabaseUrl.includes('placeholder');

    if (isLive && user) {
      try {
        // Update user metadata in auth.users
        await supabase.auth.updateUser({
          data: {
            full_name: cleanFullName,
            target_role: cleanTargetRole,
            college: cleanCollege,
            grad_year: cleanGradYear,
            github_url: cleanGithubUrl,
            linkedin_url: cleanLinkedinUrl,
          },
        });

        // Update public.profiles table (parameterized via Supabase client, RLS enforced)
        await (supabase
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .from('profiles') as any)
          .update({
            full_name: cleanFullName || null,
            phone: cleanPhone || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      } catch (err) {
        console.warn('Supabase remote profile sync note:', err);
      }
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: effectiveUserId,
        full_name: cleanFullName,
        phone: cleanPhone,
        target_role: cleanTargetRole,
        college: cleanCollege,
        grad_year: cleanGradYear,
        github_url: cleanGithubUrl,
        linkedin_url: cleanLinkedinUrl,
      },
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json({ error: 'Failed to update profile due to an unexpected server error.' }, { status: 500 });
  }
}
