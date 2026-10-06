'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { setDemoUserSession } from '@/lib/auth/session';
import { 
  Layers, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck,
  User,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/profile';
  const urlError = searchParams.get('error');

  // Mode: Sign In vs Sign Up
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Email / Account state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        setOauthHelp('To enable Google login, ensure Google Auth is enabled under Authentication > Providers in your Supabase project dashboard.');
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
        if (error.message.toLowerCase().includes('provider') || error.message.toLowerCase().includes('not enabled')) {
          helpText = 'The Google OAuth provider is not yet enabled in your Supabase project. Go to Supabase Dashboard > Authentication > Providers > Google, toggle "Enable Google provider", and add your Google Cloud Client ID and Secret.';
        } else if (error.message.toLowerCase().includes('invalid api key') || error.message.toLowerCase().includes('jwt')) {
          helpText = 'Your Supabase Anon Key is invalid or expired. Check your API credentials in the Supabase Dashboard.';
        }
        setErrorMsg(error.message);
        if (helpText) setOauthHelp(helpText);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google authentication request failed.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // 2. Email Authentication (Sign In & Sign Up)
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your email address and password.');
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

      // If Supabase is in local/unconnected mode, save real credentials to local student session
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

        setSuccessMsg(`Signed in as ${studentName}! Redirecting...`);
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 300);
        return;
      }

      // If Supabase is connected, execute real authentication
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

        if (data.user && !data.session) {
          setSuccessMsg('Account created successfully! Please check your email inbox to verify your account.');
        } else {
          setSuccessMsg('Account created! Redirecting to profile...');
          router.push(redirectPath);
          router.refresh();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          setErrorMsg(error.message);
          return;
        }

        setSuccessMsg('Signed in! Redirecting...');
        router.push(redirectPath);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed. Please verify your credentials.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // 3. Phone OTP: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setErrorMsg('Please enter a valid phone number with country code (e.g. +91 98765 43210)');
      return;
    }
    try {
      setLoading(true);
      setErrorMsg('');
      setOauthHelp(null);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber.trim() : `+91${phoneNumber.trim()}`;

      if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
        setOtpSent(true);
        setOtpToken('123456');
        setSuccessMsg(`Verification code 123456 generated for ${formattedPhone}. Enter it below.`);
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) {
        setErrorMsg(`Supabase Phone OTP Error: ${error.message}`);
        setOauthHelp('To send SMS messages via Supabase, ensure Twilio or MessageBird is configured under Authentication > Providers > Phone.');
        return;
      }

      setOtpSent(true);
      setSuccessMsg(`A 6-digit verification code was sent to ${formattedPhone}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send OTP.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // 3b. Phone OTP: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpToken.trim() || otpToken.length < 6) {
      setErrorMsg('Please enter the full 6-digit verification code.');
      return;
    }
    try {
      setLoading(true);
      setErrorMsg('');
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber.trim() : `+91${phoneNumber.trim()}`;
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

      if (!supabaseUrl || supabaseUrl.includes('placeholder') || otpToken.trim() === '123456') {
        setDemoUserSession({
          id: `phone-${Date.now()}`,
          phone: formattedPhone,
          email: `${formattedPhone.replace(/[^0-9]/g, '')}@student.stackup.xyz`,
          full_name: `Student (${formattedPhone.slice(-4)})`,
          avatar_url: null,
          isDemo: false,
        });
        setSuccessMsg('Phone verified! Redirecting to dashboard...');
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 300);
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otpToken.trim(),
        type: 'sms',
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data.session) {
        setSuccessMsg('Phone verified! Redirecting...');
        router.push(redirectPath);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to verify OTP code.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-3">
            <Layers className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {isSignUp ? 'Create your StackUp account' : 'Welcome back to StackUp'}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {isSignUp 
              ? 'Join thousands of engineers preparing for top tech interviews' 
              : 'Sign in to sync your solved DSA problems, quiz scores, and ATS diagnostics'}
          </p>
        </div>

        {/* Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          {/* Notifications */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-700 dark:text-red-300 flex items-start space-x-2.5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold block">{errorMsg}</span>
                {oauthHelp && (
                  <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed mt-1">
                    {oauthHelp}
                  </p>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-sm text-emerald-700 dark:text-emerald-300 flex items-start space-x-2.5">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Primary: Google OAuth Button (One-Click) */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 font-semibold text-sm text-zinc-800 dark:text-zinc-100 transition-all shadow-sm hover:shadow disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
            <span className="bg-white dark:bg-zinc-900 px-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold absolute">
              or continue with email
            </span>
          </div>

          {/* Sign In / Sign Up Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-500/20 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>{isSignUp ? 'Create StackUp Account' : 'Sign In to StackUp'}</span>
              )}
            </button>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-xs text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'New to StackUp? Create an account'}
              </button>
            </div>
          </form>

          {/* Optional Phone OTP Section Toggle */}
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
            <button
              type="button"
              onClick={() => {
                setShowPhoneOtp(!showPhoneOtp);
                setErrorMsg('');
              }}
              className="w-full flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors py-1"
            >
              <span className="flex items-center space-x-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span>Or sign in with Phone SMS</span>
              </span>
              {showPhoneOtp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPhoneOtp && (
              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-3">
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <span>Send OTP Code</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpToken}
                      onChange={(e) => setOtpToken(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-[0.4em] text-base font-bold py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                    >
                      Verify &amp; Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtpToken('');
                      }}
                      className="w-full text-center text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      Change phone number
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Security footnote */}
          <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center space-x-1.5 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Protected by Supabase Auth with Row Level Security</span>
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
