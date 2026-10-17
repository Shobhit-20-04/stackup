import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { sanitizeEmail, verifyCsrfOrigin } from '@/lib/security/sanitize';
import { 
  isEligibleAdminEmail, 
  verifyAndConsumeCode, 
  persistAdminPasscodeToEnv 
} from '@/lib/security/admin-reset-store';
import { setAdminSessionCookie } from '@/lib/security/admin-auth';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF Protection
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    // 2. Rate Limiting (5 verification attempts per 15 min per IP)
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-reset-ver-${ip}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many verification attempts. Access temporarily locked for security. Please retry in ${rateCheck.resetInSeconds} seconds.`,
          code: 'RATE_LIMITED',
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body?.email === 'string' ? body.email.trim() : '';
    const code = typeof body?.code === 'string' ? body.code.trim() : '';
    const newPassword = typeof body?.newPassword === 'string' ? body.newPassword.trim() : '';
    const confirmPassword = typeof body?.confirmPassword === 'string' ? body.confirmPassword.trim() : '';

    const cleanEmail = sanitizeEmail(rawEmail);

    if (!cleanEmail || !isEligibleAdminEmail(cleanEmail)) {
      return NextResponse.json(
        { error: 'Unauthorized. Password reset is restricted to the verified administrator account.' },
        { status: 403 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Please enter the 6-digit verification code.' },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New administrator security key must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Security key confirmation does not match.' },
        { status: 400 }
      );
    }

    // 3. Verify and Consume Code (Single-Use, Expiry, Rate-Limited)
    const verification = verifyAndConsumeCode(cleanEmail, code);
    if (!verification.success) {
      return NextResponse.json(
        { error: verification.error || 'Invalid or expired verification code.' },
        { status: 400 }
      );
    }

    // 4. Persist New Administrator Passcode
    persistAdminPasscodeToEnv(newPassword);

    // 5. Update Supabase User Password if available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey && !serviceRoleKey.includes('placeholder')) {
      try {
        const supabase = createSupabaseAdmin(supabaseUrl, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });
        const { data: usersData } = await supabase.auth.admin.listUsers();
        const targetUser = usersData?.users?.find(
          (u) => u.email?.toLowerCase() === cleanEmail.toLowerCase()
        );
        if (targetUser) {
          await supabase.auth.admin.updateUserById(targetUser.id, {
            password: newPassword,
          });
        }
      } catch (err: unknown) {
        console.warn('[Admin Reset] Notice: Supabase user password update:', err);
      }
    }

    // 6. Issue Authorized Admin Session Cookie
    const res = NextResponse.json({
      success: true,
      message: 'Administrator security key updated successfully! Session authorized.',
    });

    setAdminSessionCookie(res);
    return res;
  } catch (err: unknown) {
    console.error('Password reset verification error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while verifying the code.' },
      { status: 500 }
    );
  }
}
