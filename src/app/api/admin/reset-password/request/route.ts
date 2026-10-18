import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { sanitizeEmail, verifyCsrfOrigin, maskEmail } from '@/lib/security/sanitize';
import { 
  isEligibleAdminEmail, 
  createResetVerificationCode 
} from '@/lib/security/admin-reset-store';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF Protection
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    // 2. Rate Limiting (3 reset requests per 15 min per IP)
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`admin-reset-req-${ip}`, 3, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many password reset requests. Please retry in ${rateCheck.resetInSeconds} seconds.`,
          code: 'RATE_LIMITED',
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body?.email === 'string' ? body.email.trim() : '';
    const cleanEmail = sanitizeEmail(rawEmail);

    if (!cleanEmail) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const genericSuccessMessage =
      'If the provided email belongs to an authorized administrator, password recovery instructions have been dispatched. Please check your inbox.';

    // 3. Strict Server-Side Role and Eligibility Restriction
    const isEligible = isEligibleAdminEmail(cleanEmail);

    if (!isEligible) {
      // Return generic response to prevent account enumeration
      return NextResponse.json({
        success: true,
        message: genericSuccessMessage,
      });
    }

    // 4. Generate Cryptographic 6-Digit Code
    const { code, expiresAt } = createResetVerificationCode(cleanEmail, ip);

    // 5. Attempt Email Delivery through configured providers
    let emailDispatched = false;
    let providerNotice = '';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey && !serviceRoleKey.includes('placeholder')) {
      try {
        const supabase = createSupabaseAdmin(supabaseUrl, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });

        // Resolve absolute origin for redirect callback
        const forwardedHost = req.headers.get('x-forwarded-host');
        const host = req.headers.get('host');
        const proto = req.headers.get('x-forwarded-proto') || 'https';
        const origin = req.headers.get('origin') || 
          (forwardedHost ? `https://${forwardedHost}` : host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
        const redirectTo = `${origin}/auth/callback?next=/admin%3Frecovery%3Dtrue`;

        const { error: resetErr } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo,
        });

        if (!resetErr) {
          emailDispatched = true;
        } else {
          providerNotice = resetErr.message;
        }
      } catch (err: unknown) {
        console.warn('[Admin Reset] Supabase mail dispatch notice:', err);
      }
    }

    // Secure audit log (Never exposes plaintext email or credentials to public logs)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Admin Security Audit] Password reset code generated for ${maskEmail(cleanEmail)}: [${code}] (Valid until ${new Date(expiresAt).toLocaleTimeString()})`);
    }

    return NextResponse.json({
      success: true,
      message: genericSuccessMessage,
      maskedEmail: maskEmail(cleanEmail),
      emailDispatched,
      providerNotice: providerNotice ? `Email service note: ${providerNotice}` : undefined,
    });
  } catch (err: unknown) {
    console.error('Password reset request error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing the reset request.' },
      { status: 500 }
    );
  }
}
