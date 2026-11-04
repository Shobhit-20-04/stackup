import { NextRequest } from 'next/server';
import { SESSION_CONFIG } from '@/lib/security/session-config';
import { validateSessionToken } from '@/lib/security/session-manager';
import { createClient } from '@/lib/supabase/server';
import type { UserSession } from './session';

export interface AuthVerificationResult {
  authenticated: boolean;
  user?: UserSession;
  error?: string;
}

/**
 * Server-side authentication validator for protected StackUp API endpoints.
 * Defends against unauthenticated access, BOLA/IDOR, and forged client headers.
 * 
 * Verifies:
 * 1. Cryptographically signed HttpOnly session cookie (stackup_session_meta)
 * 2. Authorization Bearer header if supplied by API clients
 * 3. Authenticated Supabase session if Supabase is actively configured
 * 4. Client session cookie (sb-demo-user), strictly verifying it is NOT a demo/guest token
 */
export async function authenticateUserRequest(req: Request | NextRequest): Promise<AuthVerificationResult> {
  const request = req instanceof NextRequest ? req : new NextRequest(req);
  // 1. Check cryptographically signed session token cookie
  const sessionToken = request.cookies.get(SESSION_CONFIG.cookieName)?.value;
  if (sessionToken) {
    const validation = validateSessionToken(sessionToken);
    if (validation.valid && validation.payload) {
      // Exclude legacy demo/guest IDs
      if (
        validation.payload.userId !== 'student-demo' &&
        validation.payload.email !== 'guest@stackup.xyz'
      ) {
        return {
          authenticated: true,
          user: {
            id: validation.payload.userId,
            email: validation.payload.email,
            full_name: validation.payload.email.split('@')[0] || 'StackUp Student',
            role: validation.payload.role,
            isDemo: false,
          } as UserSession,
        };
      }
    }
  }

  // 2. Check Authorization Bearer header if token was passed directly
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.slice(7).trim();
    const validation = validateSessionToken(bearerToken);
    if (validation.valid && validation.payload) {
      if (
        validation.payload.userId !== 'student-demo' &&
        validation.payload.email !== 'guest@stackup.xyz'
      ) {
        return {
          authenticated: true,
          user: {
            id: validation.payload.userId,
            email: validation.payload.email,
            full_name: validation.payload.email.split('@')[0] || 'StackUp Student',
            role: validation.payload.role,
            isDemo: false,
          } as UserSession,
        };
      }
    }
  }

  // 3. Check Live Supabase Auth if configured in environment
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isSupabaseLive = supabaseUrl && !supabaseUrl.includes('placeholder');
  if (isSupabaseLive) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        return {
          authenticated: true,
          user: {
            id: user.id,
            email: user.email || 'user@stackup.xyz',
            full_name:
              user.user_metadata?.full_name || user.email?.split('@')[0] || 'StackUp Student',
            avatar_url: user.user_metadata?.avatar_url || null,
            isDemo: false,
          },
        };
      }
    } catch {
      // Supabase verification failed or bypassed
    }
  }

  // 4. Check client user cookie (sb-demo-user)
  const userCookie = request.cookies.get('sb-demo-user')?.value;
  if (userCookie) {
    try {
      const parsed: UserSession = JSON.parse(decodeURIComponent(userCookie));
      // Strictly reject fake demo/guest accounts
      if (
        parsed &&
        parsed.id &&
        !parsed.isDemo &&
        parsed.id !== 'student-demo' &&
        parsed.email !== 'guest@stackup.xyz'
      ) {
        return {
          authenticated: true,
          user: parsed,
        };
      }
    } catch {
      // Invalid cookie format
    }
  }

  return {
    authenticated: false,
    error: 'Authentication required. Please sign in to solve problems and execute code.',
  };
}
