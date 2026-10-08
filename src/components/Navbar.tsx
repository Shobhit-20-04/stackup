'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getCurrentUser, signOutUser } from '@/lib/auth/session';
import { 
  BookOpen, 
  Cpu, 
  Code2, 
  FileCheck2, 
  User as UserIcon, 
  LogOut, 
  Layers, 
  Menu, 
  X,
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string; full_name?: string; avatar_url?: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Secret Admin Access Gateway State
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretPasscode, setSecretPasscode] = useState('');
  const [secretError, setSecretError] = useState('');
  const [secretLoading, setSecretLoading] = useState(false);
  const [logoTapCount, setLogoTapCount] = useState(0);

  useEffect(() => {
    // Check session from universal auth
    getCurrentUser().then((u) => {
      if (u) {
        setUser({
          id: u.id,
          email: u.email,
          full_name: u.full_name,
          avatar_url: u.avatar_url,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    const supabase = createClient();
    try {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            avatar_url: session.user.user_metadata?.avatar_url,
          });
        }
      });

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    } catch {
      // ignore
    }
  }, []);

  // Multi-tap logo interaction: 5 taps/clicks opens secret portal gateway
  const handleLogoClick = (e: React.MouseEvent) => {
    const nextCount = logoTapCount + 1;
    if (nextCount >= 5) {
      e.preventDefault();
      setLogoTapCount(0);
      setShowSecretModal(true);
      setSecretPasscode('');
      setSecretError('');
      return;
    }
    setLogoTapCount(nextCount);
  };

  useEffect(() => {
    if (logoTapCount > 0) {
      const timer = setTimeout(() => {
        setLogoTapCount(0);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [logoTapCount]);

  // Secret shortcuts: Ctrl+Shift+A or double-tap backtick (`)
  useEffect(() => {
    let lastTildeTime = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Ctrl+Shift+A / Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setShowSecretModal(true);
        setSecretPasscode('');
        setSecretError('');
      }
      // 2. Double-tap backtick (`) outside inputs
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        const now = Date.now();
        if (now - lastTildeTime < 450) {
          e.preventDefault();
          setShowSecretModal(true);
          lastTildeTime = now;
        }
      }
      // 3. Escape key closes modal
      if (e.key === 'Escape') {
        setShowSecretModal(false);
        setSecretPasscode('');
        setSecretError('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSecretSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretPasscode.trim()) {
      setSecretError('Please enter the authorization passkey.');
      return;
    }
    try {
      setSecretLoading(true);
      setSecretError('');
      const res = await fetch(`/api/admin/data?key=${encodeURIComponent(secretPasscode.trim())}`, {
        headers: { 'x-admin-key': secretPasscode.trim() }
      });
      if (res.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('stackup_admin_key', secretPasscode.trim());
          sessionStorage.setItem('stackup_admin_key', secretPasscode.trim());
        }
        setShowSecretModal(false);
        router.push('/admin');
      } else {
        setSecretError('Invalid authorization key.');
      }
    } catch {
      setSecretError('Failed to verify authorization.');
    } finally {
      setSecretLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  const navLinks = [
    { name: 'Aptitude', href: '/aptitude', icon: BookOpen },
    { name: 'Core CS', href: '/core-cs', icon: Cpu },
    { name: 'DSA Hub', href: '/dsa', icon: Code2 },
    { name: 'ATS Resume', href: '/resume-checker', icon: FileCheck2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#0b1120]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with 5-tap secret trigger */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-2.5 group select-none"
            title="StackUp"
          >
            <div className={`w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200 ${
              logoTapCount >= 3 ? 'ring-2 ring-blue-500 animate-pulse' : ''
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
                Stack<span className="text-blue-600 dark:text-blue-400">Up</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: User Profile / Auth Action */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-3">
              {!loading && user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/profile"
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all ${
                      pathname === '/profile'
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white text-xs font-bold uppercase overflow-hidden">
                      {user.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatar_url}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'
                      )}
                    </div>
                    <span className="text-sm font-medium max-w-[120px] truncate">
                      {user.full_name || user.email?.split('@')[0] || 'Profile'}
                    </span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    title="Sign out"
                    className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : !loading ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all shadow-blue-500/20 hover:shadow-blue-500/30"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="w-20 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              )}
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1120] px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
            {user ? (
              <div className="space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                >
                  <UserIcon className="w-5 h-5 text-blue-500" />
                  <span>Profile Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-2.5 text-base font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
      {/* Secret Admin Gateway Modal */}
      {showSecretModal && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSecretModal(false);
              setSecretPasscode('');
              setSecretError('');
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    Staff Authorization Gateway
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Restricted administrative access
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSecretModal(false);
                  setSecretPasscode('');
                  setSecretError('');
                }}
                aria-label="Close dialog"
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {secretError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-900 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{secretError}</span>
              </div>
            )}

            <form onSubmit={handleSecretSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Master Security Key
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={secretPasscode}
                    onChange={(e) => setSecretPasscode(e.target.value)}
                    placeholder="Enter security key..."
                    autoFocus
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowSecretModal(false);
                    setSecretPasscode('');
                    setSecretError('');
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel &amp; Return
                </button>

                <button
                  type="submit"
                  disabled={secretLoading}
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-blue-600/30 disabled:opacity-50 cursor-pointer"
                >
                  {secretLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Admin</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
