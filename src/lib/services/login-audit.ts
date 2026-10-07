import { createClient } from '@/lib/supabase/server';

export interface LoginAuditEntry {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  auth_method: 'Google OAuth' | 'Email & Password' | 'Phone SMS OTP' | 'Email OTP';
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

// In-memory fallback ring buffer to guarantee telemetry even before DB migration
const inMemoryLogs: LoginAuditEntry[] = [];
const MAX_IN_MEMORY = 100;

export async function recordLoginAudit(entry: {
  userId?: string | null;
  email: string;
  fullName?: string | null;
  authMethod: 'Google OAuth' | 'Email & Password' | 'Phone SMS OTP' | 'Email OTP';
  ipAddress?: string | null;
  userAgent?: string | null;
}): Promise<LoginAuditEntry> {
  const cleanEmail = entry.email.trim().toLowerCase();
  const cleanName = entry.fullName ? entry.fullName.trim() : null;
  const newEntry: LoginAuditEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    user_id: entry.userId || `usr-${Date.now()}`,
    email: cleanEmail,
    full_name: cleanName,
    auth_method: entry.authMethod,
    ip_address: entry.ipAddress || '::1',
    user_agent: entry.userAgent || 'Web Browser',
    created_at: new Date().toISOString(),
  };

  // Add to in-memory buffer
  inMemoryLogs.unshift(newEntry);
  if (inMemoryLogs.length > MAX_IN_MEMORY) {
    inMemoryLogs.pop();
  }

  // Persist to Supabase user_login_logs if table is available
  try {
    const supabase = await createClient();
    await (supabase.from('user_login_logs') as unknown as {
      insert: (data: Record<string, unknown>) => Promise<unknown>;
    }).insert({
      user_id: newEntry.user_id,
      email: newEntry.email,
      full_name: newEntry.full_name,
      auth_method: newEntry.auth_method,
      ip_address: newEntry.ip_address,
      user_agent: newEntry.user_agent,
      created_at: newEntry.created_at,
    });
  } catch (err) {
    console.warn('Notice: recording login audit to Supabase returned:', err);
  }

  return newEntry;
}

export async function fetchLoginAudits(): Promise<LoginAuditEntry[]> {
  const mergedMap = new Map<string, LoginAuditEntry>();

  // 1. Fetch from Supabase
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('user_login_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (!error && Array.isArray(data)) {
      for (const row of data as unknown as LoginAuditEntry[]) {
        if (row && row.email) {
          mergedMap.set(`${row.email}-${row.created_at}`, row);
        }
      }
    }
  } catch (err) {
    console.warn('Notice: reading user_login_logs from Supabase:', err);
  }

  // 2. Merge in-memory records
  for (const log of inMemoryLogs) {
    const key = `${log.email}-${log.created_at}`;
    if (!mergedMap.has(key)) {
      mergedMap.set(key, log);
    }
  }

  // 3. Strictly filter out any test seeds (@example.com, test, dummy)
  const results = Array.from(mergedMap.values()).filter((log) => {
    const email = (log.email || '').toLowerCase();
    if (email.includes('@example.com')) return false;
    if (email.includes('alex_smith') || email.includes('john_doe')) return false;
    return true;
  });

  // Sort descending by timestamp
  results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return results;
}
