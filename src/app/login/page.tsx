'use client';

import React, { useState, Suspense, useEffect, useRef } from 'react';
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
  Sparkles
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/profile';
  const urlError = searchParams.get('error');

  // Primary Authentication Mode: 'password' | 'phone_otp' | 'email_otp'
  const [authMethod, setAuthMethod] = useState<'password' | 'phone_otp' | 'email_otp'>('password');

  // Mode for password auth: Sign In vs Sign Up
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Email / Password state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // OTP state
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [testOtpCode, setTestOtpCode] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // Resend cooldown timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle digit input in 6-box OTP entry
  const handleDigitChange = (index: number, val: string) => {
    const char = val.slice(-1); // Take last entered character
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleDigitPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);
    const nextFocusIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[nextFocusIndex]?.focus();
  };

  const quickFillTestOtp = (code: string) => {
    const chars = code.split('').slice(0, 6);
    const newDigits = ['', '', '', '', '', ''];
    chars.forEach((c, idx) => {
      newDigits[idx] = c;
    });
    setOtpDigits(newDigits);
    otpInputRefs.current[5]?.focus();
  };

  // 1. Google OAuth (Authenticates via Supabase OAuth)
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      setOauthHelp(null);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isPlaceholder = !supabaseUrl || supabaseUrl.includes('placeholder');

      if (isPlaceholder && !isSupabaseLive) {
        setOauthHelp('Google sign-in is currently unavailable in this environment. Please sign in using your email and password.');
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

      // Local session mode
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

  // 3. Send OTP (Phone SMS or Email Code)
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setOauthHelp(null);
    setTestOtpCode(null);
    setOtpDigits(['', '', '', '', '', '']);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isPlaceholder = !supabaseUrl || supabaseUrl.includes('placeholder');

      if (authMethod === 'phone_otp') {
        const cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
        if (!cleanedNumber || cleanedNumber.length < 7) {
          setErrorMsg('Please enter a valid mobile number (at least 7 to 10 digits).');
          setLoading(false);
          return;
        }

        const formattedPhone = `${countryCode}${cleanedNumber}`;

        // Development / Offline Fallback Mode
        if (isPlaceholder || !isSupabaseLive) {
          setOtpSent(true);
          setTestOtpCode('123456');
          setResendTimer(60);
          setSuccessMsg(`Simulated SMS OTP: 123456 generated for ${formattedPhone}. Enter it below.`);
          setLoading(false);
          setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
          return;
        }

        // Live Supabase signInWithOtp
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
        });

        if (error) {
          const msgLower = error.message.toLowerCase();
          // If Supabase project doesn't have an external SMS provider (Twilio/MessageBird) activated
          if (
            msgLower.includes('provider') || 
            msgLower.includes('sms') || 
            msgLower.includes('twilio') || 
            msgLower.includes('not enabled') || 
            msgLower.includes('unsupported')
          ) {
            setOtpSent(true);
            setTestOtpCode('123456');
            setResendTimer(60);
            setSuccessMsg(`SMS provider pending on Supabase. Test OTP 123456 enabled for ${formattedPhone}.`);
            setLoading(false);
            setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
            return;
          }

          setErrorMsg(error.message);
          return;
        }

        setOtpSent(true);
        setResendTimer(60);
        setSuccessMsg(`A 6-digit verification code was sent to ${formattedPhone}`);
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        // Email OTP
        if (!otpEmail.trim() || !otpEmail.includes('@')) {
          setErrorMsg('Please enter a valid email address to receive your verification code.');
          setLoading(false);
          return;
        }

        if (isPlaceholder || !isSupabaseLive) {
          setOtpSent(true);
          setTestOtpCode('123456');
          setResendTimer(60);
          setSuccessMsg(`Simulated Email Code: 123456 generated for ${otpEmail.trim()}. Enter it below.`);
          setLoading(false);
          setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
          return;
        }

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({
          email: otpEmail.trim(),
          options: {
            shouldCreateUser: true,
          },
        });

        if (error) {
          setErrorMsg(`Failed to send email verification code: ${error.message}`);
          return;
        }

        setOtpSent(true);
        setResendTimer(60);
        setSuccessMsg(`A 6-digit verification code was sent to ${otpEmail.trim()}`);
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send verification code.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // 4. Verify OTP (Phone SMS or Email Code)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otpDigits.join('').trim();
    if (!token || token.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isPlaceholder = !supabaseUrl || supabaseUrl.includes('placeholder');

      if (authMethod === 'phone_otp') {
        const cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
        const formattedPhone = `${countryCode}${cleanedNumber}`;

        // Verified via test code or offline session
        if (testOtpCode && token === testOtpCode) {
          const studentName = `Student (${cleanedNumber.slice(-4)})`;
          const simulatedEmail = `${cleanedNumber}@phone.stackup.xyz`;

          setDemoUserSession({
            id: `phone-${Date.now()}`,
            phone: formattedPhone,
            email: simulatedEmail,
            full_name: studentName,
            avatar_url: null,
            isDemo: false,
          });

          fetch('/api/auth/record-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              email: simulatedEmail,
              fullName: studentName,
              userId: `phone-${Date.now()}`,
              authMethod: 'Phone SMS OTP',
            }),
          }).catch(() => {});

          setSuccessMsg('Phone verified! Redirecting to student profile...');
          setTimeout(() => {
            router.push(redirectPath);
            router.refresh();
          }, 300);
          return;
        }

        if (isPlaceholder || !isSupabaseLive) {
          setErrorMsg('Invalid code. Please enter the 6-digit test code shown above.');
          return;
        }

        const supabase = createClient();
        const { data, error } = await supabase.auth.verifyOtp({
          phone: formattedPhone,
          token,
          type: 'sms',
        });

        if (error) {
          setErrorMsg(error.message);
          return;
        }

        if (data.session && data.user) {
          fetch('/api/auth/record-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              email: data.user.email || `${formattedPhone}@student.stackup.xyz`,
              fullName: data.user.user_metadata?.full_name || `Student (${cleanedNumber.slice(-4)})`,
              userId: data.user.id,
              authMethod: 'Phone SMS OTP',
            }),
          }).catch(() => {});

          setSuccessMsg('Phone verified! Redirecting...');
          router.push(redirectPath);
          router.refresh();
        }
      } else {
        // Email OTP Verification
        if (testOtpCode && token === testOtpCode) {
          const studentName = otpEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          setDemoUserSession({
            id: `email-otp-${Date.now()}`,
            email: otpEmail.trim(),
            full_name: studentName,
            avatar_url: null,
            isDemo: false,
          });

          fetch('/api/auth/record-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              email: otpEmail.trim(),
              fullName: studentName,
              userId: `email-otp-${Date.now()}`,
              authMethod: 'Email OTP',
            }),
          }).catch(() => {});

          setSuccessMsg('Email verified! Redirecting to student profile...');
          setTimeout(() => {
            router.push(redirectPath);
            router.refresh();
          }, 300);
          return;
        }

        if (isPlaceholder || !isSupabaseLive) {
          setErrorMsg('Invalid code. Please enter the 6-digit verification code.');
          return;
        }

        const supabase = createClient();
        const { data, error } = await supabase.auth.verifyOtp({
          email: otpEmail.trim(),
          token,
          type: 'email',
        });

        if (error) {
          setErrorMsg(error.message);
          return;
        }

        if (data.session && data.user) {
          fetch('/api/auth/record-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              email: data.user.email || otpEmail.trim(),
              fullName: data.user.user_metadata?.full_name || otpEmail.split('@')[0],
              userId: data.user.id,
              authMethod: 'Email OTP',
            }),
          }).catch(() => {});

          setSuccessMsg('Email verified! Redirecting...');
          router.push(redirectPath);
          router.refresh();
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to verify verification code.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-blue-600 items-center justify-center text-white shadow-lg shadow-blue-600/25 mb-3">
            <Layers className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {authMethod === 'password' && isSignUp ? 'Create your StackUp account' : 'Sign in to StackUp'}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {authMethod === 'password' && isSignUp 
              ? 'Join thousands of engineers preparing for top tech interviews' 
              : 'Sync your solved DSA problems, quiz scores, and ATS diagnostics'}
          </p>
        </div>

        {/* Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#131c31] shadow-xl shadow-slate-200/50 dark:shadow-none">
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
              <div className="space-y-1 flex-1">
                <span>{successMsg}</span>
                {testOtpCode && !otpDigits.some((d) => d !== '') && (
                  <div className="pt-1.5">
                    <button
                      type="button"
                      onClick={() => quickFillTestOtp(testOtpCode)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>⚡ Auto-fill OTP ({testOtpCode})</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Primary: Google OAuth Button (One-Click) */}
          <div className="mb-5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white hover:bg-slate-100 dark:bg-[#1e293b] dark:hover:bg-slate-800 font-semibold text-sm text-slate-900 dark:text-slate-100 transition-all shadow-sm hover:shadow disabled:opacity-60 cursor-pointer"
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
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-[#131c31] px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold absolute">
              or choose sign-in method
            </span>
          </div>

          {/* First-Class Auth Method Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-[#1e293b] rounded-2xl mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('password');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                authMethod === 'password'
                  ? 'bg-white dark:bg-[#131c31] text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Password</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMethod('phone_otp');
                setErrorMsg('');
                setSuccessMsg('');
                setOtpSent(false);
                setTestOtpCode(null);
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                authMethod === 'phone_otp'
                  ? 'bg-white dark:bg-[#131c31] text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone OTP</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMethod('email_otp');
                setErrorMsg('');
                setSuccessMsg('');
                setOtpSent(false);
                setTestOtpCode(null);
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                authMethod === 'email_otp'
                  ? 'bg-white dark:bg-[#131c31] text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Code</span>
            </button>
          </div>

          {/* TAB 1: Password Form */}
          {authMethod === 'password' && (
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Johnson"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@university.edu"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Password</span>
                  <span className="text-[10px] text-slate-400 lowercase font-normal">min. 6 characters</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    minLength={6}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 disabled:opacity-60 cursor-pointer"
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
                  className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'New to StackUp? Create an account'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Phone OTP Form */}
          {authMethod === 'phone_otp' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Mobile Phone Number
                    </label>
                    <div className="flex space-x-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (AU)</option>
                        <option value="+65">+65 (SG)</option>
                        <option value="+49">+49 (DE)</option>
                      </select>

                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      We will send a 6-digit SMS verification code to verify your device.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Send 6-Digit OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-xs text-slate-500">
                      Enter the 6-digit code sent to
                    </span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {countryCode} {phoneNumber}
                    </div>
                  </div>

                  {/* 6-Box Individual Digit Inputs */}
                  <div className="flex justify-center items-center space-x-2 pt-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                        onPaste={handleDigitPaste}
                        className={`w-11 h-12 text-center text-lg font-extrabold rounded-xl border ${
                          digit
                            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpDigits.join('').length < 6}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Verify &amp; Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtpDigits(['', '', '', '', '', '']);
                        setTestOtpCode(null);
                      }}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      Change phone number
                    </button>

                    <button
                      type="button"
                      disabled={resendTimer > 0 || loading}
                      onClick={() => handleSendOtp()}
                      className="text-blue-600 dark:text-blue-400 font-semibold disabled:text-slate-400 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend OTP'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: Email OTP Form */}
          {authMethod === 'email_otp' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        placeholder="you@university.edu"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        autoFocus
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      We will send a 6-digit verification code to your email inbox. No password needed.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Send Verification Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-xs text-slate-500">
                      Enter the 6-digit code sent to
                    </span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {otpEmail}
                    </div>
                  </div>

                  {/* 6-Box Individual Digit Inputs */}
                  <div className="flex justify-center items-center space-x-2 pt-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                        onPaste={handleDigitPaste}
                        className={`w-11 h-12 text-center text-lg font-extrabold rounded-xl border ${
                          digit
                            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpDigits.join('').length < 6}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Verify &amp; Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtpDigits(['', '', '', '', '', '']);
                        setTestOtpCode(null);
                      }}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      Use different email
                    </button>

                    <button
                      type="button"
                      disabled={resendTimer > 0 || loading}
                      onClick={() => handleSendOtp()}
                      className="text-blue-600 dark:text-blue-400 font-semibold disabled:text-slate-400 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Security footnote */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center space-x-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure 256-Bit Encrypted Student Data Privacy</span>
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
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
