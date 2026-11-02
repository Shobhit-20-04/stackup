import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/lib/types/database';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        if (init?.signal) {
          init.signal.addEventListener('abort', () => controller.abort());
        }

        return fetch(input, {
          ...init,
          signal: controller.signal,
        }).finally(() => {
          clearTimeout(timeoutId);
        });
      },
    },
  });
}
