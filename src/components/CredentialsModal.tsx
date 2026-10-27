'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  AlertCircle, 
  Loader2, 
  Server
} from 'lucide-react';

interface CredentialsStatus {
  supabaseConfigured: boolean;
  supabaseUrl: string | null;
  anthropicConfigured: boolean;
  envPath?: string;
}

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CredentialsModal({ isOpen, onClose }: CredentialsModalProps) {
  const [status, setStatus] = useState<CredentialsStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form values
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [anthropicApiKey, setAnthropicApiKey] = useState('');

  // UI state
  const [copiedMigration, setCopiedMigration] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    let ignore = false;
    if (isOpen) {
      fetch('/api/config/credentials')
        .then((res) => res.json())
        .then((data) => {
          if (!ignore) {
            setStatus(data);
            if (data.supabaseUrl) {
              setSupabaseUrl(data.supabaseUrl);
            }
            setLoading(false);
          }
        })
        .catch(() => {
          if (!ignore) {
            setLoading(false);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyMigrationNotice = async () => {
    try {
      const res = await fetch('/api/config/migration-sql');
      if (res.ok) {
        const data = await res.json();
        if (data.sql) {
          await navigator.clipboard.writeText(data.sql);
          setCopiedMigration(true);
          setTimeout(() => setCopiedMigration(false), 3000);
          return;
        }
      }
    } catch {
      // fallback
    }
    const notice = `Execute supabase/migrations/20261014000000_security_hardening.sql in your Supabase SQL Editor.`;
    navigator.clipboard.writeText(notice);
    setCopiedMigration(true);
    setTimeout(() => setCopiedMigration(false), 2500);
  };

  const refreshStatus = async () => {
    try {
      const res = await fetch('/api/config/credentials');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
      // ignore
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/config/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supabaseUrl: supabaseUrl.trim() || undefined,
          supabaseAnonKey: supabaseAnonKey.trim() || undefined,
          anthropicApiKey: anthropicApiKey.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save credentials.');
      }

      setMessage({ type: 'success', text: data.message || 'Credentials connected successfully!' });
      await refreshStatus();
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Connection failed.' });
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] modal-enter">
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--surface-sunken)]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-md bg-[var(--surface-card)] text-[var(--brand-primary)] border border-[var(--border-subtle)] flex items-center justify-center shadow-xs">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center space-x-2">
                <span>Database &amp; API Integration</span>
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--foreground-muted)]" />}
              </h3>
              <p className="text-[11px] text-[var(--foreground-muted)]">
                Connect your cloud database and Anthropic Claude keys for real traffic.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] rounded-md hover:bg-[var(--surface-card)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Connection Status Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3.5 rounded-lg border text-xs ${
              status?.supabaseConfigured 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
            }`}>
              <div className="flex items-center justify-between mb-1 font-bold">
                <span className="flex items-center space-x-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>Supabase Postgres</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded font-bold bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                  {status?.supabaseConfigured ? 'Connected' : 'Local Fallback'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 leading-normal">
                {status?.supabaseConfigured 
                  ? 'Cloud database and OAuth active.' 
                  : 'Operating via browser storage.'}
              </p>
            </div>

            <div className={`p-3.5 rounded-lg border text-xs ${
              status?.anthropicConfigured
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-[var(--surface-sunken)] border-[var(--border-subtle)] text-[var(--foreground-muted)]'
            }`}>
              <div className="flex items-center justify-between mb-1 font-bold">
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Claude AI API</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded font-bold bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                  {status?.anthropicConfigured ? 'Live Key' : 'Built-in'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 leading-normal">
                {status?.anthropicConfigured 
                  ? 'Claude 3.5 Sonnet scoring enabled.' 
                  : 'Heuristic STAR rubric engine active.'}
              </p>
            </div>
          </div>

          {/* Feedback Notification */}
          {message && (
            <div className={`p-3 rounded-lg flex items-start space-x-2.5 text-xs ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}>
              {message.type === 'success' ? (
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div className="font-medium">{message.text}</div>
            </div>
          )}

          {/* Credentials Input Form */}
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Supabase Project URL
              </label>
              <input
                type="url"
                placeholder="https://xyzproject.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-md text-xs focus:border-[var(--brand-primary)] focus:outline-none text-[var(--foreground)] font-mono"
              />
              <p className="text-[11px] text-[var(--foreground-muted)] mt-1 font-mono">
                Found in Supabase: Project Settings &gt; API.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Supabase Anon / Public Key (JWT)
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={supabaseAnonKey}
                onChange={(e) => setSupabaseAnonKey(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-md text-xs focus:border-[var(--brand-primary)] focus:outline-none text-[var(--foreground)] font-mono"
              />
              <p className="text-[11px] text-[var(--foreground-muted)] mt-1 font-mono">
                Found in Supabase: Project Settings &gt; API keys (`anon` / `public`).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Anthropic Claude API Key (Optional)
              </label>
              <input
                type="password"
                placeholder="sk-ant-api03-..."
                value={anthropicApiKey}
                onChange={(e) => setAnthropicApiKey(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-md text-xs focus:border-[var(--brand-primary)] focus:outline-none text-[var(--foreground)] font-mono"
              />
              <p className="text-[11px] text-[var(--foreground-muted)] mt-1 font-mono">
                Server-side only for Claude 3.5 Sonnet analysis.
              </p>
            </div>

            {/* Quick Step Guide */}
            <div className="p-3.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs space-y-2">
              <span className="font-bold text-[var(--foreground)] block">
                Database &amp; Google Sign-In Setup:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-[var(--foreground-muted)] leading-relaxed">
                <li>Create a free database at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[var(--brand-primary)] underline font-medium">supabase.com</a>.</li>
                <li>Click <strong>Copy Full Migration SQL</strong> below, paste and execute in your Supabase <strong>SQL Editor</strong>.</li>
                <li>Enter your <strong>Project URL</strong> and <strong>Anon Key</strong> above and click Save.</li>
                <li>
                  <strong>To enable Google OAuth:</strong> Under <em>Authentication &gt; Providers &gt; Google</em>, enter your Client ID &amp; Secret. Add redirect URI: <code className="bg-[var(--surface-card)] px-1 py-0.5 rounded text-[10px] font-mono border border-[var(--border-subtle)]">{supabaseUrl ? `${supabaseUrl}/auth/v1/callback` : 'https://<project-ref>.supabase.co/auth/v1/callback'}</code>.
                </li>
              </ol>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-2">
              <button
                type="button"
                onClick={handleCopyMigrationNotice}
                className="px-3.5 py-2 rounded-md border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-sunken)] flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {copiedMigration ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMigration ? 'SQL Copied!' : 'Copy Migration SQL'}</span>
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] disabled:opacity-50 text-white text-xs font-semibold rounded-md shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Save &amp; Connect</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
