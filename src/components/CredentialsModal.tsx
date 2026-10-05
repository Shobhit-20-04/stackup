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

  const handleCopyMigrationNotice = () => {
    const notice = `Run: D:\\stackup\\supabase\\migrations\\20260923000000_initial_schema.sql in your Supabase SQL Editor.`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
                <span>Supabase &amp; API Connections</span>
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />}
              </h3>
              <p className="text-xs text-zinc-500">
                Connect your cloud database and Anthropic Claude keys for real traffic.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Connection Status Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-4 rounded-2xl border text-xs ${
              status?.supabaseConfigured 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300'
            }`}>
              <div className="flex items-center justify-between mb-1.5 font-bold">
                <span className="flex items-center space-x-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>Supabase Postgres</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-black bg-white/70 dark:bg-zinc-900/70">
                  {status?.supabaseConfigured ? 'Connected' : 'Demo Mode'}
                </span>
              </div>
              <p className="text-[11px] opacity-80">
                {status?.supabaseConfigured 
                  ? 'Real-time database and live OAuth active.' 
                  : 'Operating via robust local storage & simulated sessions.'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border text-xs ${
              status?.anthropicConfigured
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
                : 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/60 text-violet-800 dark:text-violet-300'
            }`}>
              <div className="flex items-center justify-between mb-1.5 font-bold">
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Claude AI API</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-black bg-white/70 dark:bg-zinc-900/70">
                  {status?.anthropicConfigured ? 'Live Key' : 'Built-in Engine'}
                </span>
              </div>
              <p className="text-[11px] opacity-80">
                {status?.anthropicConfigured 
                  ? 'High-speed Claude 3.5 Sonnet processing enabled.' 
                  : 'Heuristic STAR resume engine & CS assistant active.'}
              </p>
            </div>
          </div>

          {/* Feedback Notification */}
          {message && (
            <div className={`p-4 rounded-2xl flex items-start space-x-3 text-xs ${
              message.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-800 dark:text-rose-300'
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
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Supabase Project URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://xyzproject.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white font-mono"
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Found under Project Settings &gt; API in your Supabase dashboard.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Supabase Anon / Public Key (JWT)
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white font-mono"
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Found under Project Settings &gt; API &gt; Project API keys (`anon` / `public`).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Anthropic Claude API Key (Optional)
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="sk-ant-api03-..."
                  value={anthropicApiKey}
                  onChange={(e) => setAnthropicApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white font-mono"
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Used strictly server-side for Claude 3.5 Sonnet scoring and chatbot reasoning.
              </p>
            </div>

            {/* Quick Step Guide */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 text-xs space-y-2">
              <span className="font-bold text-zinc-900 dark:text-white block">
                Quick Setup Steps:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>Create a free database at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 underline font-medium">supabase.com</a></li>
                <li>Go to <strong>SQL Editor</strong> &gt; run the schema in <code className="bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded text-[11px]">supabase/migrations/</code></li>
                <li>Paste your Project URL &amp; Anon Key above and click Save.</li>
              </ol>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleCopyMigrationNotice}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-1.5 transition-colors"
              >
                {copiedMigration ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMigration ? 'Migration Path Copied!' : 'Copy Migration Info'}</span>
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center space-x-2 transition-all"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting &amp; Testing...</span>
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
