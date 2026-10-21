import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_CONFIG, inspectSessionExpiry } from '@/lib/security/session-config';

function clearEdgeSessionCookies(res: NextResponse): void {
  const isProd = process.env.NODE_ENV === 'production';
  for (const name of [SESSION_CONFIG.cookieName, 'sb-demo-user', 'stackup_admin_session']) {
    res.cookies.set({
      name,
      value: '',
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
  }
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Inject baseline security headers on every response
  supabaseResponse.headers.set('X-Frame-Options', 'DENY');
  supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff');
  supabaseResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  supabaseResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  supabaseResponse.headers.set('X-XSS-Protection', '1; mode=block');

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith('/login');
  const isProtectedPath = pathname.startsWith('/profile');
  const isProtectedApi = pathname.startsWith('/api/profile') || pathname.startsWith('/api/admin/');

  // 1. Server-Side Session Token Verification & Inactivity Enforcement
  const sessionToken = request.cookies.get(SESSION_CONFIG.cookieName)?.value;
  let sessionValid = false;
  let sessionInvalidReason: string | undefined;

  if (sessionToken) {
    const inspection = inspectSessionExpiry(sessionToken);
    if (inspection.valid && inspection.payload) {
      sessionValid = true;
    } else {
      sessionValid = false;
      sessionInvalidReason = inspection.reason;
    }
  }

  // If a session token exists but is expired/invalid, reject immediately on protected targets
  if (sessionToken && !sessionValid) {
    clearEdgeSessionCookies(supabaseResponse);

    if (isProtectedPath) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      const reason = sessionInvalidReason === 'expired_absolute' ? 'expired' : 'inactivity';
      url.searchParams.set('reason', reason);
      url.searchParams.set('redirect', pathname);
      const redirectRes = NextResponse.redirect(url);
      clearEdgeSessionCookies(redirectRes);
      return redirectRes;
    }

    if (isProtectedApi) {
      const apiRes = NextResponse.json(
        {
          error: 'Session expired due to inactivity. Please log in again.',
          code: sessionInvalidReason || 'expired_inactivity',
        },
        { status: 401 }
      );
      clearEdgeSessionCookies(apiRes);
      return apiRes;
    }
  }

  // Verify authenticated session cookie format safely (reject default guest/demo accounts)
  const demoCookie = request.cookies.get('sb-demo-user');
  let hasUser = sessionValid;
  if (!hasUser && demoCookie?.value) {
    try {
      const parsed = JSON.parse(decodeURIComponent(demoCookie.value));
      if (
        parsed &&
        typeof parsed.id === 'string' &&
        typeof parsed.email === 'string' &&
        !parsed.isDemo &&
        parsed.id !== 'student-demo' &&
        parsed.email !== 'guest@stackup.xyz'
      ) {
        hasUser = true;
      }
    } catch {
      hasUser = false;
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            // Re-apply security headers on updated response
            supabaseResponse.headers.set('X-Frame-Options', 'DENY');
            supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff');
            supabaseResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
            supabaseResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
            supabaseResponse.headers.set('X-XSS-Protection', '1; mode=block');

            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        hasUser = true;
      }
    } catch {
      // In case of network errors, continue safely
    }
  }

  if (!hasUser && isProtectedPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (hasUser && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
