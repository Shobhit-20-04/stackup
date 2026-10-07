import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { recordLoginAudit } from '@/lib/services/login-audit';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/profile';
  const oauthError = searchParams.get('error');
  const oauthErrorDesc = searchParams.get('error_description');

  if (oauthError || oauthErrorDesc) {
    const message = oauthErrorDesc || oauthError || 'Authentication was denied or canceled.';
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(message)}`);
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        // Record real Google OAuth login audit
        try {
          const { data: userData } = await supabase.auth.getUser();
          if (userData?.user?.email) {
            const forwarded = request.headers.get('x-forwarded-for');
            const ip = forwarded ? forwarded.split(',')[0].trim() : '::1';
            const userAgent = request.headers.get('user-agent') || 'Google OAuth Client';

            await recordLoginAudit({
              email: userData.user.email,
              fullName: userData.user.user_metadata?.full_name || userData.user.user_metadata?.name || null,
              userId: userData.user.id,
              authMethod: 'Google OAuth',
              ipAddress: ip,
              userAgent,
            });
          }
        } catch {
          // ignore telemetry errors
        }

        const forwardedHost = request.headers.get('x-forwarded-host');
        const isLocalEnv = process.env.NODE_ENV === 'development';
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      } else {
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Session exchange failed';
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(msg)}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('No authentication code was received.')}`);
}
