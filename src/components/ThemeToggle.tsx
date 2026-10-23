'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

export type ThemeMode = 'dark' | 'light';

export interface ThemeToggleProps {
  variant?: 'switch' | 'button';
  className?: string;
  showLabel?: boolean;
}

export function getActiveTheme(): { isDark: boolean; themeId: string } {
  if (typeof window === 'undefined') {
    return { isDark: true, themeId: 'cosmic' };
  }
  const root = document.documentElement;
  const themeAttr = root.getAttribute('data-theme') || '';
  const hasDarkClass = root.classList.contains('dark');
  const hasLightClass = root.classList.contains('light');

  const isLight = themeAttr === 'lavender' || hasLightClass;
  const isDark = !isLight || hasDarkClass || themeAttr === 'cosmic' || themeAttr === 'obsidian';

  const themeId = isLight ? 'lavender' : (themeAttr || 'cosmic');
  return { isDark, themeId };
}

export function setThemeMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  const targetTheme = mode === 'light' ? 'lavender' : 'cosmic';

  root.setAttribute('data-theme', targetTheme);
  if (mode === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
  }

  try {
    localStorage.setItem('stackup-theme', targetTheme);
    if (mode === 'dark') {
      localStorage.setItem('stackup-dark-pref', targetTheme);
    }
  } catch {
    // ignore
  }

  // Dispatch custom event for instantaneous multi-component synchronization
  window.dispatchEvent(
    new CustomEvent('stackup-theme-change', {
      detail: { mode, themeId: targetTheme, isDark: mode === 'dark' },
    })
  );
}

export default function ThemeToggle({
  variant = 'switch',
  className = '',
  showLabel = false,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const syncState = useCallback(() => {
    const current = getActiveTheme();
    setIsDark(current.isDark);
  }, []);

  useEffect(() => {
    setMounted(true);
    syncState();

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark?: boolean; mode?: ThemeMode }>;
      if (customEvent.detail && typeof customEvent.detail.isDark === 'boolean') {
        setIsDark(customEvent.detail.isDark);
      } else {
        syncState();
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'stackup-theme') {
        setIsDark(e.newValue !== 'lavender');
      }
    };

    // Keyboard shortcut: Shift + D to toggle dark/light theme anywhere on the page
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          (activeEl as HTMLElement).isContentEditable);
      if (isInput) return;

      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        const nextMode: ThemeMode = isDark ? 'light' : 'dark';
        setIsDark(nextMode === 'dark');
        setThemeMode(nextMode);
      }
    };

    window.addEventListener('stackup-theme-change', handleThemeChange);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('keydown', handleKeyDown);

    // Observe external DOM attribute / class mutations on <html>
    const observer = new MutationObserver(() => {
      syncState();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => {
      window.removeEventListener('stackup-theme-change', handleThemeChange);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [syncState, isDark]);

  const toggle = () => {
    const nextMode: ThemeMode = isDark ? 'light' : 'dark';
    setIsDark(nextMode === 'dark');
    setThemeMode(nextMode);
  };

  if (!mounted) {
    // Render initial stable placeholder to avoid hydration mismatch
    return (
      <div
        className={`inline-flex items-center space-x-2 ${className}`}
        aria-hidden="true"
      >
        {variant === 'button' ? (
          <div className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#151D35]/80 border border-slate-200/80 dark:border-[#1E2B4D] animate-pulse" />
        ) : (
          <div className="h-7 w-12 sm:h-8 sm:w-14 rounded-full bg-slate-200/80 dark:bg-[#151D35] border border-slate-300 dark:border-[#1E2B4D] animate-pulse" />
        )}
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={isDark ? 'Switch to light theme (Shift+D)' : 'Switch to dark theme (Shift+D)'}
        className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200/80 dark:border-[#1E2B4D] bg-white/80 dark:bg-[#151D35]/80 hover:bg-slate-100 dark:hover:bg-[#1B2442] text-slate-700 dark:text-[#E8EEFF] text-xs font-semibold shadow-xs transition-colors cursor-pointer ${className}`}
      >
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#004182]" />
        )}
        {showLabel && (
          <span className="text-xs font-medium">
            {isDark ? 'Light mode' : 'Dark mode'}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {showLabel && (
        <span className="text-xs font-medium text-slate-600 dark:text-[#8E9FC8] select-none">
          {isDark ? 'Dark theme' : 'Light theme'}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={isDark ? 'Switch to light theme (Shift+D)' : 'Switch to dark theme (Shift+D)'}
        onClick={toggle}
        className="relative inline-flex h-7 w-12 sm:h-8 sm:w-14 shrink-0 cursor-pointer items-center rounded-full border border-slate-300 dark:border-[#1E2B4D] bg-slate-200/90 dark:bg-[#151D35] p-0.5 sm:p-1 transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] select-none group"
      >
        <span className="sr-only">Toggle dark and light theme</span>

        {/* Ambient track icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1.5 sm:px-2 pointer-events-none">
          <Sun className="w-3 h-3 text-amber-500 opacity-60 dark:opacity-35 transition-opacity" />
          <Moon className="w-3 h-3 text-[#D4CBFF] opacity-35 dark:opacity-60 transition-opacity" />
        </div>

        {/* Sliding Thumb */}
        <span
          className={`${
            isDark
              ? 'translate-x-5 sm:translate-x-6 bg-[#0B1020] border-[#1E2B4D] text-[#D4CBFF] shadow-md shadow-black/30'
              : 'translate-x-0 bg-white border-slate-200 text-amber-500 shadow-xs'
          } pointer-events-none relative inline-flex h-5.5 w-5.5 sm:h-6 sm:w-6 items-center justify-center rounded-full border transform transition-transform duration-200 ease-in-out group-hover:scale-105`}
        >
          {isDark ? (
            <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4CBFF]" />
          ) : (
            <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
          )}
        </span>
      </button>
    </div>
  );
}
