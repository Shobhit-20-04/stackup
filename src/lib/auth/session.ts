import { createClient } from '@/lib/supabase/client';

export interface UserSession {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  phone?: string | null;
  isDemo?: boolean;
}

const DEMO_STORAGE_KEY = 'stackup_demo_user_session';
const COOKIE_KEY = 'sb-demo-user';

export const DEFAULT_DEMO_USER: UserSession = {
  id: 'student-demo',
  email: 'guest@stackup.xyz',
  full_name: 'Guest Student',
  avatar_url: null,
  phone: null,
  isDemo: true,
};

export async function getCurrentUser(): Promise<UserSession | null> {
  // 1. Try real Supabase auth if configured
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      return {
        id: user.id,
        email: user.email || 'user@stackup.xyz',
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'StackUp Student',
        avatar_url: user.user_metadata?.avatar_url || null,
        phone: user.phone || null,
        isDemo: false,
      };
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

export function setDemoUserSession(user: UserSession = DEFAULT_DEMO_USER): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(user));
    // Set cookie so Next.js middleware and SSR can detect demo session
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400; SameSite=Lax`;
  }
}

export async function signOutUser(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }

  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // ignore
  }
}
