'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getCurrentUser, getFastCachedUser, signOutUser } from '@/lib/auth/session';
import { 
  Cpu, 
  Code2, 
  FileCheck2, 
  User as UserIcon, 
  LogOut, 
  Layers, 
  Menu, 
  X,
  Compass, 
  FolderGit2, 
  BookA, 
  LayoutDashboard,
  ChevronDown,
  Flame,
  Target
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

  const primaryLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Learn', href: '/learn', icon: Compass },
    { name: 'Core CS', href: '/core-cs', icon: Cpu },
    { name: 'Practice', href: '/dsa', icon: Code2 },
    { name: 'POTD', href: '/practice/potd', icon: Flame, isBadge: true },
  ];

  const moreLinks = [
    { name: 'Aptitude Hub', href: '/aptitude', icon: Target, subtitle: 'Quantitative, logical & verbal practice' },
    { name: 'Projects', href: '/projects', icon: FolderGit2, subtitle: 'Production portfolio blueprints' },
    { name: 'ATS Resume', href: '/resume-checker', icon: FileCheck2, subtitle: 'Resume scoring & Google XYZ formula' },
    { name: 'Glossary', href: '/glossary', icon: BookA, subtitle: 'Plain-English technical terms' },
  ];

  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close more menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close more menu on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const isMoreActive = moreLinks.some((item) => pathname.startsWith(item.href));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--surface-card)]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with 5-tap secret trigger */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center space-x-2.5 select-none shrink-0"
            title="StackUp"
          >
            <div className={`w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-white shadow-xs transition-transform duration-200 ease-out group-hover:scale-105 ${
              logoTapCount >= 3 ? 'ring-2 ring-[var(--brand-secondary)]' : ''
            }`}>
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-[var(--foreground)]">
                Stack<span className="text-[var(--brand-primary)]">Up</span>
              </span>
            </div>
          </Link>

          {/* Desktop Streamlined Primary Nav */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {primaryLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-1 select-none ${
                    isActive
                      ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)] shadow-2xs'
                      : 'text-[var(--foreground-muted)] hover:text-slate-900 dark:hover:text-[#E8EEFF] hover:bg-[var(--surface-sunken)]/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    item.isBadge
                      ? 'text-amber-500 fill-amber-500/20'
                      : isActive
                      ? 'text-[var(--brand-primary)] scale-105'
                      : 'text-slate-400 dark:text-slate-500'
                  }`} />
                  <span>{item.name}</span>
                  {item.isBadge && (
                    <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase">
                      Daily
                    </span>
                  )}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-[var(--brand-primary)] rounded-full transition-all duration-200 ease-out"
                    />
                  )}
                </Link>
              );
            })}

            {/* More Menu Dropdown */}
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                className={`relative flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-1 select-none cursor-pointer ${
                  isMoreActive || moreMenuOpen
                    ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)] shadow-2xs'
                    : 'text-[var(--foreground-muted)] hover:text-slate-900 dark:hover:text-[#E8EEFF] hover:bg-[var(--surface-sunken)]/50 border border-transparent'
                }`}
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
                {isMoreActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-[var(--brand-primary)] rounded-full transition-all duration-200 ease-out"
                  />
                )}
              </button>

              {moreMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-2 shadow-lg backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)] px-2.5 py-1">
                    Engineering Ecosystem
                  </div>
                  {moreLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={`flex items-start space-x-2.5 p-2 rounded-lg text-xs transition-colors ${
                          isActive
                            ? 'bg-[var(--surface-sunken)] text-[var(--foreground)] font-bold'
                            : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)]/70'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">{item.name}</div>
                          <div className="text-[11px] text-[var(--foreground-muted)] font-normal">{item.subtitle}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: User Profile / Auth Action / Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />

            <div className="hidden sm:flex items-center space-x-2">
              {!loading && user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/profile"
                    className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg border transition-colors ${
                      pathname === '/profile'
                        ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--foreground)]'
                        : 'border-[var(--border-subtle)] hover:border-slate-300 dark:hover:border-[#2D3D6E] text-[var(--foreground-muted)]'
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
                    <span className="text-xs font-medium max-w-[120px] truncate text-[var(--foreground)]">
                      {user.full_name || user.email?.split('@')[0] || 'Profile'}
                    </span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    title="Sign out"
                    aria-label="Sign out"
                    className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg hover:bg-[var(--surface-sunken)]/60 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : !loading ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] active:scale-95 rounded-lg shadow-xs transition-all duration-150 cursor-pointer"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="w-16 h-7 bg-[var(--surface-sunken)] rounded-md animate-pulse" />
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-[var(--surface-sunken)]/60 cursor-pointer"
                aria-label="Toggle Navigation Drawer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Structured Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200 ease-out max-h-[85vh] overflow-y-auto">
          {/* Section 1: Your Workspace */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)] px-3 py-1">
              Your Workspace
            </div>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === '/dashboard'
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Dashboard Workspace</span>
            </Link>
            <Link
              href="/practice/potd"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/practice/potd')
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                <span>Problem of the Day</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase">
                Daily
              </span>
            </Link>
          </div>

          {/* Section 2: Curriculum & Practice */}
          <div className="space-y-1 pt-2 border-t border-[var(--border-subtle)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)] px-3 py-1">
              Curriculum &amp; Practice
            </div>
            <Link
              href="/learn"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/learn')
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <Compass className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Beginner Roadmap</span>
            </Link>
            <Link
              href="/core-cs"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/core-cs')
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <Cpu className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Core CS Subjects</span>
            </Link>
            <Link
              href="/dsa"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/dsa') && !pathname.startsWith('/practice/potd')
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <Code2 className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>DSA 150 Practice</span>
            </Link>
            <Link
              href="/aptitude"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/aptitude')
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <Target className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Aptitude Practice</span>
            </Link>
          </div>

          {/* Section 3: Career Tools */}
          <div className="space-y-1 pt-2 border-t border-[var(--border-subtle)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)] px-3 py-1">
              Career &amp; Development
            </div>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/projects')
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <FolderGit2 className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Engineering Projects</span>
            </Link>
            <Link
              href="/resume-checker"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/resume-checker')
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>ATS Resume Evaluator</span>
            </Link>
            <Link
              href="/glossary"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/glossary')
                  ? 'text-[var(--foreground)] bg-[var(--surface-sunken)] font-semibold border border-[var(--border-subtle)]'
                  : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-sunken)]/60 font-medium'
              }`}
            >
              <BookA className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Glossary Dictionary</span>
            </Link>
          </div>

          {/* Section 4: Settings & Account */}
          <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
            <div className="px-3 flex items-center justify-between py-1">
              <span className="text-xs font-semibold text-[var(--foreground-muted)]">Theme Appearance</span>
              <ThemeToggle showLabel />
            </div>

            {user ? (
              <div className="space-y-1 pt-1">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-sunken)]/60"
                >
                  <UserIcon className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>Profile Dashboard ({user.full_name || 'Candidate'})</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] rounded-xl shadow-xs transition-colors"
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
