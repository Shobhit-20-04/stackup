'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { setDemoUserSession } from '@/lib/auth/session';
import { 
  Layers, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck,
  User,
  Lock,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || searchParams.get('next') || '/profile';
  const urlError = searchParams.get('error');

  // Mode: Sign In vs Sign Up
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Email / Password state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(urlError ? decodeURIComponent(urlError) : '');
  const [oauthHelp, setOauthHelp] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Check if live Supabase project is configured
  useEffect(() => {
    fetch('/api/config/credentials')
      .then((res) => res.json())
      .then((data) => {
        setIsSupabaseLive(Boolean(data.supabaseConfigured));
      })
      .catch(() => {});
  }, []);

  // 1. Google OAuth (Authenticates via Supabase OAuth)
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      setOauthHelp(null);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isPlaceholder = !supabaseUrl || supabaseUrl.includes('placeholder');

      if (isPlaceholder && !isSupabaseLive) {
        setOauthHelp('Google sign-in is currently unavailable in this environment. Please sign in using your email and password or use Instant Demo Login below.');
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`,
        },
      });

      if (error) {
        let helpText = '';
        const msg = error.message.toLowerCase();
        if (msg.includes('provider') || msg.includes('not enabled') || msg.includes('unsupported provider')) {
          helpText = 'Google Sign-In is not enabled yet in your Supabase project. To enable it: Go to Supabase Dashboard > Authentication > Providers > Google, toggle Enable, and enter your Google Cloud OAuth Client ID & Secret.';
        } else if (msg.includes('redirect') || msg.includes('uri')) {
          helpText = 'Redirect URI mismatch. Please add https://stackup-zeta.vercel.app/auth/callback to Supabase Dashboard > Authentication > URL Configuration > Redirect URLs.';
        } else if (msg.includes('invalid api key') || msg.includes('jwt')) {
          helpText = 'Authentication service credential mismatch. Please sign in with email and password.';
        }
        setErrorMsg(error.message || 'Unable to complete Google sign-in. Please try email sign-in.');
        if (helpText) setOauthHelp(helpText);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google authentication request failed.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // 2. Email & Password Authentication (Sign In & Sign Up)
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    if (password.trim().length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setErrorMsg('Please enter your full name to set up your student profile.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      setOauthHelp(null);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isPlaceholder = !supabaseUrl || supabaseUrl.includes('placeholder');

      // Local session mode when Supabase is not configured
      if (isPlaceholder && !isSupabaseLive) {
        const studentName = isSignUp && fullName.trim() 
          ? fullName.trim() 
          : email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

        setDemoUserSession({
          id: `usr-${Date.now()}`,
          email: email.trim(),
          full_name: studentName,
          avatar_url: null,
          phone: null,
          isDemo: false,
        });

        // Record login audit event
        fetch('/api/auth/record-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            email: email.trim(),
            fullName: studentName,
            userId: `usr-${Date.now()}`,
            authMethod: isSignUp ? 'Email & Password (New Registration)' : 'Email & Password',
          }),
        }).catch(() => {});

        setSuccessMsg(`Signed in as ${studentName}! Redirecting...`);
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 300);
        return;
      }

      // Live Supabase authentication
      const supabase = createClient();
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              full_name: fullName.trim() || email.split('@')[0],
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
          return;
        }

        if (data.user) {
          fetch('/api/auth/record-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              email: email.trim(),
              fullName: fullName.trim() || email.split('@')[0],
              userId: data.user.id,
              authMethod: 'Email & Password (New Registration)',
            }),
          }).catch(() => {});
        }

        if (data.user && !data.session) {
          setSuccessMsg('Account created successfully! Please check your email inbox to verify your account.');
        } else {
          setSuccessMsg('Account created! Redirecting to profile...');
          router.push(redirectPath);
          router.refresh();
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          setErrorMsg(error.message);
          return;
        }

        if (data.user) {
          fetch('/api/auth/record-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              email: email.trim(),
              fullName: data.user.user_metadata?.full_name || email.split('@')[0],
              userId: data.user.id,
              authMethod: 'Email & Password',
            }),
          }).catch(() => {});
        }

        setSuccessMsg('Signed in! Redirecting...');
        router.push(redirectPath);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed. Please verify your credentials.';
      setErrorMsg(msg);
    } finally {
      setPassword('');
      setLoading(false);
    }
  };

  // 3. Instant One-Click Demo Access
  const handleInstantDemoLogin = () => {
    setLoading(true);
    const demoStudent = {
      id: `usr-demo-${Date.now()}`,
      email: 'alex.rivera@university.edu',
      full_name: 'Alex Rivera',
      avatar_url: null,
      phone: null,
      target_role: 'Software Development Engineer (SDE-1)',
      college: 'National Institute of Technology',
      grad_year: '2026',
      github_url: 'https://github.com/alexrivera-dev',
      linkedin_url: 'https://linkedin.com/in/alexrivera',
      isDemo: false,
    };

    setDemoUserSession(demoStudent);

    fetch('/api/auth/record-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        email: demoStudent.email,
        fullName: demoStudent.full_name,
        userId: demoStudent.id,
        authMethod: 'Instant Demo Login',
      }),
    }).catch(() => {});

    setSuccessMsg('Signed in as Alex Rivera! Redirecting to dashboard...');
    setTimeout(() => {
      router.push(redirectPath);
      router.refresh();
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-[var(--background)]">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex w-10 h-10 rounded-lg bg-[var(--brand-primary)] items-center justify-center text-white shadow-xs mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
            {isSignUp ? 'Create your StackUp account' : 'Sign in to StackUp'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--foreground-muted)]">
            {isSignUp 
              ? 'Join engineers preparing for placement and technical rounds' 
              : 'Sync your solved algorithms, quiz metrics, and ATS diagnostics'}
          </p>
        </div>

        {/* Card */}
        <div className="p-6 sm:p-7 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs">
          {/* Notifications */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold block">{errorMsg}</span>
                {oauthHelp && (
                  <p className="text-[11px] text-rose-400 leading-relaxed mt-1">
                    {oauthHelp}
                  </p>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <span>{successMsg}</span>
              </div>
            </div>
          )}

          {/* Primary: Google OAuth Button (One-Click) */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2.5 px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-card)] font-medium text-xs sm:text-sm text-[var(--foreground)] transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-[var(--border-subtle)] w-full" />
            <span className="bg-[var(--surface-card)] px-3 text-[10px] uppercase font-mono tracking-wider text-[var(--foreground-muted)] absolute">
              or with email
            </span>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            {isSignUp && (
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[var(--foreground-muted)] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--foreground)] placeholder:[var(--foreground-muted)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-primary)]"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--foreground-muted)] absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--foreground)] placeholder:[var(--foreground-muted)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-primary)]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--foreground-muted)] mb-1 flex items-center justify-between">
                <span>Password</span>
                <span className="text-[10px] text-[var(--foreground-muted)] normal-case font-normal">min. 6 chars</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--foreground-muted)] absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  minLength={6}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  className="w-full pl-9 pr-9 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--foreground)] placeholder:[var(--foreground-muted)] text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-primary)]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-[var(--foreground-muted)] hover:text-[var(--foreground)] p-0.5 rounded cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 text-white font-semibold text-xs sm:text-sm transition-opacity shadow-xs disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </button>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'New to StackUp? Create an account'}
              </button>
            </div>
          </form>

          {/* Instant 1-Click Demo Login */}
          <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={handleInstantDemoLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] hover:bg-[var(--surface-card)] text-[var(--foreground)] font-medium text-xs transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span>Quick Demo Session (Alex Rivera)</span>
            </button>
          </div>

          {/* Security footnote */}
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-center space-x-1.5 text-[11px] text-[var(--foreground-muted)]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted session &amp; student privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
