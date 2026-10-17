'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getCurrentUser, getFastCachedUser, signOutUser } from '@/lib/auth/session';
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
  ArrowRight,
  Sparkles
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string; full_name?: string; avatar_url?: string | null } | null>(() => {
    const cached = getFastCachedUser();
    if (!cached) return null;
    return {
      id: cached.id,
      email: cached.email,
      full_name: cached.full_name,
      avatar_url: cached.avatar_url,
    };
  });
  const [loading, setLoading] = useState(() => (typeof window !== 'undefined' ? !getFastCachedUser() : true));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Secret Admin Access Gateway State
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

  // Multi-tap logo interaction: 5 taps/clicks navigates directly to unified /admin portal
  const handleLogoClick = (e: React.MouseEvent) => {
    const nextCount = logoTapCount + 1;
    if (nextCount >= 5) {
      e.preventDefault();
      setLogoTapCount(0);
      router.push('/admin');
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

  // Secret shortcuts: Ctrl+Shift+A or double-tap backtick (`) routes to canonical /admin
  useEffect(() => {
    let lastTildeTime = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Ctrl+Shift+A / Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        router.push('/admin');
      }
      // 2. Double-tap backtick (`) outside inputs
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        const now = Date.now();
        if (now - lastTildeTime < 450) {
          e.preventDefault();
          router.push('/admin');
          lastTildeTime = now;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

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
    { name: 'Striver Sheet', href: '/striver', icon: Sparkles },
    { name: 'ATS Resume', href: '/resume-checker', icon: FileCheck2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-[#1E2B4D]/80 bg-white/90 dark:bg-[#0B1020]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with 5-tap secret trigger */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-2.5 select-none"
            title="StackUp"
          >
            <div className={`w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-white shadow-xs transition-colors ${
              logoTapCount >= 3 ? 'ring-2 ring-[var(--brand-secondary)]' : ''
            }`}>
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-[#E8EEFF]">
                Stack<span className="text-[var(--brand-primary)]">Up</span>
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
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    isActive
                      ? 'text-slate-900 dark:text-[#E8EEFF] bg-slate-100 dark:bg-[#151D35] font-semibold border border-slate-200/80 dark:border-[#1E2B4D]'
                      : 'text-slate-600 dark:text-[#8E9FC8] hover:text-slate-900 dark:hover:text-[#E8EEFF] hover:bg-slate-100/70 dark:hover:bg-[#151D35]/60 font-medium'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: User Profile / Auth Action / Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />

            <div className="hidden md:flex items-center space-x-2">
              {!loading && user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/profile"
                    className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg border transition-colors ${
                      pathname === '/profile'
                        ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-slate-900 dark:text-[#E8EEFF]'
                        : 'border-slate-200 dark:border-[#1E2B4D] hover:border-slate-300 dark:hover:border-[#2D3D6E] text-slate-700 dark:text-[#8E9FC8]'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-md bg-[var(--brand-primary)] flex items-center justify-center text-white text-[11px] font-bold uppercase overflow-hidden">
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
                    <span className="text-xs font-medium max-w-[120px] truncate text-slate-900 dark:text-[#E8EEFF]">
                      {user.full_name || user.email?.split('@')[0] || 'Profile'}
                    </span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    title="Sign out"
                    aria-label="Sign out"
                    className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-[#151D35]/60 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : !loading ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="w-16 h-7 bg-slate-200 dark:bg-[#151D35] rounded-md animate-pulse" />
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
        <div className="md:hidden border-b border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#0B1020] px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'text-slate-900 dark:text-[#E8EEFF] bg-slate-100 dark:bg-[#151D35] font-semibold border border-slate-200/80 dark:border-[#1E2B4D]'
                    : 'text-slate-700 dark:text-[#8E9FC8] hover:bg-slate-100 dark:hover:bg-[#151D35]/60 font-medium'
                }`}
              >
                <Icon className="w-4 h-4 text-[var(--brand-primary)]" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-2.5 border-t border-slate-200 dark:border-[#1E2B4D] space-y-1.5">
            <div className="px-1 flex items-center justify-between py-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-[#8E9FC8]">Appearance</span>
              <ThemeToggle showLabel />
            </div>

            {user ? (
              <div className="space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-[#E8EEFF] hover:bg-slate-100 dark:hover:bg-[#151D35]/60"
                >
                  <UserIcon className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>Profile Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-2.5 text-base font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-xs transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
