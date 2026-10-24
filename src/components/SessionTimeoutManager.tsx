'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShieldAlert, RefreshCw, LogOut, Clock, WifiOff } from 'lucide-react';
import { SESSION_CONFIG } from '@/lib/security/session-config';
import { getCurrentUser, signOutUser } from '@/lib/auth/session';

interface SessionStatusResponse {
  authenticated: boolean;
  remainingInactivityMs?: number;
  remainingAbsoluteMs?: number;
  shouldWarn?: boolean;
  warningThresholdMs?: number;
  role?: string;
}

export default function SessionTimeoutManager() {
  const router = useRouter();
  const pathname = usePathname();

  // Dialog & timer states
  const [showWarning, setShowWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [isExtending, setIsExtending] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for state without triggering re-renders
  const lastActiveRef = useRef<number>(0);
  const isAuthenticatedRef = useRef<boolean>(false);
  const userRoleRef = useRef<string>('student');
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear active countdown interval
  const clearCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  // Safe local logout and redirect
  const handleTimeoutLogout = useCallback(
    async (reason: 'inactivity' | 'expired' = 'inactivity') => {
      clearCountdown();
      setShowWarning(false);
      isAuthenticatedRef.current = false;

      // Broadcast logout to all other open tabs
      try {
        broadcastChannelRef.current?.postMessage({
          type: 'SESSION_LOGGED_OUT',
          reason,
          role: userRoleRef.current,
        });
      } catch {
        // ignore broadcast error
      }

      // Invalidate session on server
      try {
        await fetch('/api/auth/session/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      } catch {
        // ignore network error
      }

      // If user is admin or on /admin, also revoke admin session
      if (userRoleRef.current === 'admin' || pathname.startsWith('/admin')) {
        try {
          await fetch('/api/admin/auth', { method: 'DELETE' });
        } catch {
          // ignore
        }
      }

      await signOutUser();

      // Route to admin or login depending on role
      if (userRoleRef.current === 'admin' || pathname.startsWith('/admin')) {
        router.push(`/admin?reason=${reason}`);
        router.refresh();
        return;
      }

      // Only redirect if current path is not already login
      if (!pathname.startsWith('/login')) {
        const safeRedirect = encodeURIComponent(pathname);
        router.push(`/login?reason=${reason}&redirect=${safeRedirect}`);
        router.refresh();
      }
    },
    [pathname, router, clearCountdown]
  );

  // Extend session via server heartbeat
  const handleContinueSession = useCallback(async () => {
    if (isExtending) return;
    setIsExtending(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/session/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        lastActiveRef.current = Date.now();
        setShowWarning(false);
        clearCountdown();
        setSecondsRemaining(120);

        // Notify other tabs to close their warning dialog and sync activity
        try {
          broadcastChannelRef.current?.postMessage({
            type: 'SESSION_EXTENDED',
            timestamp: Date.now(),
          });
        } catch {
          // ignore
        }
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.code === 'expired_absolute') {
          await handleTimeoutLogout('expired');
        } else {
          await handleTimeoutLogout('inactivity');
        }
      }
    } catch {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setIsOffline(true);
        setErrorMessage('You appear to be offline. Reconnect to keep your session active.');
      } else {
        setErrorMessage('Unable to reach server. Please check your connection and retry.');
      }
    } finally {
      setIsExtending(false);
    }
  }, [isExtending, clearCountdown, handleTimeoutLogout]);

  // Handle immediate manual logout from modal
  const handleManualLogout = async () => {
    await handleTimeoutLogout('inactivity');
  };

  // 1. Initial Authentication Check and Status Polling
  useEffect(() => {
    let mounted = true;

    async function checkAuthStatus() {
      // Don't monitor sessions on the login page itself
      if (pathname.startsWith('/login')) {
        isAuthenticatedRef.current = false;
        setShowWarning(false);
        return;
      }

      // Verify with server session status first (handles both student & admin roles)
      try {
        const res = await fetch('/api/auth/session/status');
        if (res.ok && mounted) {
          const data: SessionStatusResponse = await res.json();
          if (data.authenticated) {
            isAuthenticatedRef.current = true;
            userRoleRef.current = data.role || (pathname.startsWith('/admin') ? 'admin' : 'student');
            if (data.shouldWarn && typeof data.remainingInactivityMs === 'number') {
              setShowWarning(true);
              setSecondsRemaining(Math.max(1, Math.round(data.remainingInactivityMs / 1000)));
            }
            return;
          } else {
            isAuthenticatedRef.current = false;
            setShowWarning(false);
            return;
          }
        }
      } catch {
        // network failure, fallback to client tracking
      }

      // Fallback: Check client session
      const user = await getCurrentUser();
      if (!mounted) return;

      if (!user || user.isDemo || user.id === 'student-demo') {
        isAuthenticatedRef.current = false;
        setShowWarning(false);
        return;
      }

      isAuthenticatedRef.current = true;
      userRoleRef.current = 'student';
    }

    checkAuthStatus();
    return () => {
      mounted = false;
    };
  }, [pathname]);

  // 2. BroadcastChannel Multi-Tab Synchronization
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const channel = new BroadcastChannel(SESSION_CONFIG.syncChannelName);
      broadcastChannelRef.current = channel;

      channel.onmessage = (event) => {
        const { type, role } = event.data || {};
        if (type === 'SESSION_EXTENDED') {
          lastActiveRef.current = Date.now();
          setShowWarning(false);
          clearCountdown();
        } else if (type === 'SESSION_LOGGED_OUT') {
          isAuthenticatedRef.current = false;
          setShowWarning(false);
          clearCountdown();
          if (role === 'admin' || pathname.startsWith('/admin')) {
            router.push('/admin?reason=inactivity');
            router.refresh();
          } else if (!pathname.startsWith('/login')) {
            router.push('/login?reason=inactivity');
            router.refresh();
          }
        }
      };
    } catch {
      // Fallback: storage event listener for older browsers
      const handleStorage = (e: StorageEvent) => {
        if (e.key === 'stackup_session_event') {
          try {
            const data = JSON.parse(e.newValue || '{}');
            if (data.type === 'SESSION_EXTENDED') {
              lastActiveRef.current = Date.now();
              setShowWarning(false);
              clearCountdown();
            } else if (data.type === 'SESSION_LOGGED_OUT') {
              isAuthenticatedRef.current = false;
              setShowWarning(false);
              clearCountdown();
              if (data.role === 'admin' || pathname.startsWith('/admin')) {
                router.push('/admin?reason=inactivity');
                router.refresh();
              } else if (!pathname.startsWith('/login')) {
                router.push('/login?reason=inactivity');
                router.refresh();
              }
            }
          } catch {
            // ignore
          }
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }

    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
        broadcastChannelRef.current = null;
      }
    };
  }, [pathname, router, clearCountdown]);

  // 3. User Activity Tracking (Debounced & Throttled)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let throttleTimeout: NodeJS.Timeout | null = null;

    const handleUserActivity = () => {
      if (!isAuthenticatedRef.current) return;
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 1000);

      lastActiveRef.current = Date.now();

      // If warning dialog was showing and user moves/types, keep them aware or extend
      if (isOffline && typeof navigator !== 'undefined' && navigator.onLine) {
        setIsOffline(false);
        setErrorMessage('');
      }
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, handleUserActivity, { passive: true }));

    const handleOnline = () => {
      setIsOffline(false);
      setErrorMessage('');
    };
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleUserActivity));
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [isOffline]);

  // 4. Inactivity & Warning Polling Timer
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkInterval = setInterval(() => {
      if (!isAuthenticatedRef.current) return;

      const now = Date.now();
      const elapsedInactivity = now - lastActiveRef.current;
      const remainingInactivity = SESSION_CONFIG.inactivityTimeoutMs - elapsedInactivity;

      // 1. Session completely expired due to inactivity (30 minutes)
      if (remainingInactivity <= 0) {
        handleTimeoutLogout('inactivity');
        return;
      }

      // 2. Inactivity entered warning window (<= 2 minutes remaining)
      if (remainingInactivity <= SESSION_CONFIG.warningThresholdMs) {
        if (!showWarning) {
          setShowWarning(true);
          const initialSecs = Math.max(1, Math.round(remainingInactivity / 1000));
          setSecondsRemaining(initialSecs);
        }
      } else if (showWarning) {
        // User resumed activity earlier and timer recovered
        setShowWarning(false);
        clearCountdown();
      }
    }, SESSION_CONFIG.checkIntervalMs);

    return () => clearInterval(checkInterval);
  }, [showWarning, clearCountdown, handleTimeoutLogout]);

  // 5. Per-Second Countdown when Warning Dialog is Active
  useEffect(() => {
    if (!showWarning) {
      clearCountdown();
      return;
    }

    clearCountdown();
    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearCountdown();
          handleTimeoutLogout('inactivity');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearCountdown();
  }, [showWarning, clearCountdown, handleTimeoutLogout]);

  // Keyboard accessibility: Escape or Enter triggers "Continue Session"
  useEffect(() => {
    if (!showWarning) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleContinueSession();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWarning, handleContinueSession]);

  if (!showWarning) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedCountdown = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="session-timeout-title"
      aria-describedby="session-timeout-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-[#151D35] border border-amber-300 dark:border-amber-500/40 rounded-2xl shadow-2xl space-y-5 text-slate-900 dark:text-white">
        {/* Header with warning icon */}
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 id="session-timeout-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Session Expiring Soon
            </h2>
            <p id="session-timeout-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              For your account security, StackUp automatically signs you out after 30 minutes of inactivity.
            </p>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-800 dark:text-amber-300">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Time Remaining</span>
          </div>
          <span className="text-2xl font-black tracking-wider text-amber-600 dark:text-amber-400 font-mono">
            {formattedCountdown}
          </span>
        </div>

        {/* Offline / Error message */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-center space-x-2">
            {isOffline ? <WifiOff className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleContinueSession}
            disabled={isExtending}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#0D08CB] hover:bg-[#0A06A3] text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md shadow-[#0D08CB]/20 cursor-pointer disabled:opacity-50"
          >
            {isExtending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Extending Session...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Continue Session</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleManualLogout}
            disabled={isExtending}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Log Out Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
