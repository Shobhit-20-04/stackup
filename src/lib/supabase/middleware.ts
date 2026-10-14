import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

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

  // Verify demo cookie format safely
  const demoCookie = request.cookies.get('sb-demo-user');
  let hasUser = false;
  if (demoCookie?.value) {
    try {
      const parsed = JSON.parse(decodeURIComponent(demoCookie.value));
      if (parsed && typeof parsed.id === 'string' && typeof parsed.email === 'string') {
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
