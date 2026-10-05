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
  Database,
  ShieldCheck
} from 'lucide-react';
import CredentialsModal from '@/components/CredentialsModal';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string; full_name?: string; avatar_url?: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);
  const [isAdminMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      const isParamAdmin = params.get('admin') === 'true';
      if (isParamAdmin) {
        localStorage.setItem('stackup_admin_mode', 'true');
        return true;
      }
      return localStorage.getItem('stackup_admin_mode') === 'true';
    } catch {
      return false;
    }
  });

  const checkCredentials = () => {
    fetch('/api/config/credentials')
      .then((res) => res.json())
      .then((data) => {
        setIsSupabaseLive(Boolean(data.supabaseConfigured));
      })
      .catch(() => {});
  };

  useEffect(() => {
    checkCredentials();
  }, []);

  useEffect(() => {
    // Check session from universal auth (Supabase + Demo)
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
    { name: 'Admin', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white flex items-center">
                Stack<span className="text-indigo-600 dark:text-indigo-400">Up</span>
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
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Supabase Connection Pill */}
          <div className="flex items-center space-x-2">
            {isAdminMode && (
              <button
                onClick={() => setCredentialsModalOpen(true)}
                className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  isSupabaseLive
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-indigo-400 shadow-sm'
                }`}
                title="Configure Supabase & API keys"
              >
                <span className={`w-2 h-2 rounded-full ${isSupabaseLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>{isSupabaseLive ? 'Supabase Connected' : 'Connect Supabase'}</span>
                <Database className="w-3 h-3 ml-0.5 opacity-60" />
              </button>
            )}

            {/* User Profile / Auth Action */}
            <div className="hidden md:flex items-center space-x-3">
              {!loading && user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/profile"
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all ${
                      pathname === '/profile'
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold uppercase overflow-hidden">
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
                    className="p-2 text-zinc-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : !loading ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all shadow-indigo-500/20 hover:shadow-indigo-500/30"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="w-20 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
              )}
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 space-y-1">
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
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
            {isAdminMode && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCredentialsModalOpen(true);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <Database className="w-5 h-5 text-indigo-500" />
                <span>{isSupabaseLive ? 'Supabase Connected' : 'Connect Supabase'}</span>
              </button>
            )}

            {user ? (
              <div className="space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <UserIcon className="w-5 h-5 text-indigo-500" />
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
                className="w-full flex items-center justify-center px-4 py-2.5 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Supabase & Credentials Modal */}
      <CredentialsModal
        isOpen={credentialsModalOpen}
        onClose={() => {
          setCredentialsModalOpen(false);
          checkCredentials();
        }}
      />
    </header>
  );
}
