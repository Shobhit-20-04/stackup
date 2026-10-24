import { createClient } from '@/lib/supabase/client';

export interface UserSession {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  phone?: string | null;
  target_role?: string | null;
  college?: string | null;
  grad_year?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  isDemo?: boolean;
}

const DEMO_STORAGE_KEY = 'stackup_demo_user_session';
const COOKIE_KEY = 'sb-demo-user';

export function getFastCachedUser(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    if (stored) {
      const parsed: UserSession = JSON.parse(stored);
      if (parsed.isDemo || parsed.id === 'student-demo' || parsed.email === 'guest@stackup.xyz') {
        localStorage.removeItem(DEMO_STORAGE_KEY);
        document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
        return null;
      }
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

export async function getCurrentUser(): Promise<UserSession | null> {
  // 1. Try real Supabase auth if configured
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const sessionUser: UserSession = {
        id: user.id,
        email: user.email || 'user@stackup.xyz',
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'StackUp Student',
        avatar_url: user.user_metadata?.avatar_url || null,
        phone: user.phone || user.user_metadata?.phone || null,
        target_role: user.user_metadata?.target_role || null,
        college: user.user_metadata?.college || null,
        grad_year: user.user_metadata?.grad_year || null,
        github_url: user.user_metadata?.github_url || null,
        linkedin_url: user.user_metadata?.linkedin_url || null,
        isDemo: false,
      };
      if (typeof window !== 'undefined') {
        setUserSession(sessionUser);
      }
      return sessionUser;
    }
  } catch (err) {
    console.debug('Supabase auth check bypassed:', err);
  }

  // 2. Fall back to authenticated session from localStorage or cookie
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEY);
      if (stored) {
        const parsed: UserSession = JSON.parse(stored);
        // Automatically purge legacy guest/demo sessions so unauthorized visitors are restricted
        if (parsed.isDemo || parsed.id === 'student-demo' || parsed.email === 'guest@stackup.xyz') {
          localStorage.removeItem(DEMO_STORAGE_KEY);
          document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
          return null;
        }
        return parsed;
      }
    } catch {
      // ignore json parse error
    }
  }

  return null;
}

export function setUserSession(user: UserSession): void {
  if (!user || user.isDemo || user.id === 'student-demo' || user.email === 'guest@stackup.xyz') {
    return;
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(user));
    // Set cookie so Next.js middleware and SSR can detect authenticated session
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400; SameSite=Lax`;
  }
}

// Backwards-compatible alias for existing callers
export const setDemoUserSession = setUserSession;

export function updateUserSession(updates: Partial<UserSession>): void {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEY);
      if (stored) {
        const current = JSON.parse(stored);
        const updated = { ...current, ...updates };
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(updated));
        document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(updated))}; path=/; max-age=86400; SameSite=Lax`;
      }
    } catch {
      // ignore
    }
  }
}

export async function signOutUser(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `stackup_session_meta=; path=/; max-age=0; SameSite=Lax`;
    try {
      fetch('/api/auth/session/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore
    }
  }

  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // ignore
  }
}
