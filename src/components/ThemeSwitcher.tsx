'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Palette, Check } from 'lucide-react';

export type ThemeId = 'cosmic' | 'lavender' | 'obsidian';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  isDark: boolean;
  palette: [string, string, string, string, string];
}

export const THEMES: ThemeOption[] = [
  {
    id: 'cosmic',
    name: 'StackUp Midnight',
    tagline: 'Deep Midnight, Electric Indigo & Deep Teal (Default)',
    isDark: true,
    palette: ['#0B1020', '#151D35', '#044E62', '#0D08CB', '#E9DEFA'],
  },
  {
    id: 'lavender',
    name: 'StackUp Daylight',
    tagline: 'Soft Lavender, Deep Teal & Warm Brown',
    isDark: false,
    palette: ['#E9DEFA', '#FFFFFF', '#044E62', '#0D08CB', '#4A3932'],
  },
  {
    id: 'obsidian',
    name: 'Deep Espresso Noir',
    tagline: 'Warm Brown, Electric Indigo & Soft Pink',
    isDark: true,
    palette: ['#171210', '#251C18', '#044E62', '#FACAE7', '#0D08CB'],
  },
];

export function applyTheme(themeId: ThemeId) {
  const root = document.documentElement;
  root.setAttribute('data-theme', themeId);
  if (themeId === 'lavender') {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
  }
  try {
    localStorage.setItem('stackup-theme', themeId);
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('stackup-theme-change', {
        detail: { themeId, isDark: themeId !== 'lavender' },
      })
    );
  }
}

export { default as ThemeToggle } from '@/components/ThemeToggle';

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'cosmic';
    try {
      const saved = localStorage.getItem('stackup-theme') as ThemeId | null;
      if (saved && (saved === 'cosmic' || saved === 'lavender' || saved === 'obsidian')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'cosmic';
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyTheme(currentTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ themeId?: ThemeId }>;
      if (customEvent.detail?.themeId) {
        setCurrentTheme(customEvent.detail.themeId);
      }
    };

    window.addEventListener('stackup-theme-change', handleThemeChange);
    return () => window.removeEventListener('stackup-theme-change', handleThemeChange);
  }, [currentTheme]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectTheme = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    setIsOpen(false);
  };

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current color theme: ${activeThemeObj.name}. Tap to change theme.`}
        aria-expanded={isOpen}
        className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#151D35]/80 hover:bg-slate-100 dark:hover:bg-[#1B2442] text-slate-700 dark:text-zinc-200 text-xs font-semibold shadow-xs transition-all cursor-pointer backdrop-blur-sm"
      >
        <Palette className="w-3.5 h-3.5 text-[#044E62] dark:text-[#E9DEFA]" />
        <span className="hidden sm:inline-block truncate max-w-[90px]">{activeThemeObj.name.split(' ')[0]}</span>
        {/* Active Theme 3-dot preview */}
        <div className="flex items-center -space-x-1 shrink-0 ml-0.5">
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-xs"
            style={{ backgroundColor: activeThemeObj.palette[0] }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-xs"
            style={{ backgroundColor: activeThemeObj.palette[2] }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-xs"
            style={{ backgroundColor: activeThemeObj.palette[3] }}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] p-2 shadow-2xl shadow-black/40 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-[#1E2B4D]/80 mb-1.5">
            <p className="text-xs font-bold text-slate-900 dark:text-[#E8EEFF] flex items-center justify-between">
              <span>Color Themes</span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-[#8E9FC8]">3 Curated Palettes</span>
            </p>
          </div>

          <div className="space-y-1">
            {THEMES.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  onClick={() => selectTheme(theme.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-[#1B2442] ring-1 ring-[#044E62]/50 shadow-xs'
                      : 'hover:bg-slate-50 dark:hover:bg-[#1B2442]/60'
                  }`}
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-[#E8EEFF]">
                        {theme.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#044E62] dark:text-[#E9DEFA] shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-[#8E9FC8] mt-0.5">
                      {theme.tagline}
                    </p>

                    {/* 5-Color Swatch Strip */}
                    <div className="flex items-center space-x-1.5 mt-2">
                      {theme.palette.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <span
                            className="w-5 h-5 rounded-md border border-black/20 shadow-xs flex items-center justify-center text-[8px] font-mono"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
