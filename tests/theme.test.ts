/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getActiveTheme, setThemeMode } from '@/components/ThemeToggle';
import { applyTheme, THEMES } from '@/components/ThemeSwitcher';

describe('Theme Toggle & Mode Switching', () => {
  let docElement: any;
  let mockStorage: Record<string, string>;
  let listeners: Record<string, ((e: any) => void)[]>;

  beforeEach(() => {
    mockStorage = {};
    listeners = {};

    const classSet = new Set<string>();
    const attributes: Record<string, string> = {};

    docElement = {
      getAttribute: (k: string) => attributes[k] || null,
      setAttribute: (k: string, v: string) => {
        attributes[k] = v;
      },
      removeAttribute: (k: string) => {
        delete attributes[k];
      },
      classList: {
        contains: (c: string) => classSet.has(c),
        add: (c: string) => classSet.add(c),
        remove: (c: string) => classSet.delete(c),
      },
    };

    (globalThis as any).document = {
      documentElement: docElement,
    };

    (globalThis as any).localStorage = {
      getItem: (k: string) => mockStorage[k] || null,
      setItem: (k: string, v: string) => {
        mockStorage[k] = v;
      },
      removeItem: (k: string) => {
        delete mockStorage[k];
      },
      clear: () => {
        mockStorage = {};
      },
    };

    (globalThis as any).window = {
      addEventListener: (type: string, fn: any) => {
        if (!listeners[type]) listeners[type] = [];
        listeners[type].push(fn);
      },
      removeEventListener: (type: string, fn: any) => {
        if (listeners[type]) {
          listeners[type] = listeners[type].filter((l) => l !== fn);
        }
      },
      dispatchEvent: (event: any) => {
        if (listeners[event.type]) {
          listeners[event.type].forEach((fn) => fn(event));
        }
        return true;
      },
    };

    (globalThis as any).CustomEvent = class CustomEvent {
      type: string;
      detail: any;
      constructor(type: string, params?: { detail?: any }) {
        this.type = type;
        this.detail = params?.detail;
      }
    };
  });

  afterEach(() => {
    delete (globalThis as any).document;
    delete (globalThis as any).localStorage;
    delete (globalThis as any).window;
    delete (globalThis as any).CustomEvent;
  });

  it('should have predefined curated color palettes', () => {
    expect(THEMES).toHaveLength(3);
    expect(THEMES.map((t) => t.id)).toEqual(['cosmic', 'lavender', 'obsidian']);
  });

  it('should default to dark theme when no attribute or localStorage is set', () => {
    const active = getActiveTheme();
    expect(active.isDark).toBe(true);
    expect(active.themeId).toBe('cosmic');
  });

  it('should toggle to light mode properly via setThemeMode', () => {
    setThemeMode('light');

    expect(docElement.getAttribute('data-theme')).toBe('lavender');
    expect(docElement.classList.contains('light')).toBe(true);
    expect(docElement.classList.contains('dark')).toBe(false);
    expect(mockStorage['stackup-theme']).toBe('lavender');

    const active = getActiveTheme();
    expect(active.isDark).toBe(false);
    expect(active.themeId).toBe('lavender');
  });

  it('should toggle back to dark mode properly via setThemeMode', () => {
    // First set light
    setThemeMode('light');
    expect(getActiveTheme().isDark).toBe(false);

    // Then toggle back to dark
    setThemeMode('dark');
    expect(docElement.getAttribute('data-theme')).toBe('cosmic');
    expect(docElement.classList.contains('dark')).toBe(true);
    expect(docElement.classList.contains('light')).toBe(false);
    expect(mockStorage['stackup-theme']).toBe('cosmic');

    const active = getActiveTheme();
    expect(active.isDark).toBe(true);
    expect(active.themeId).toBe('cosmic');
  });

  it('should dispatch stackup-theme-change custom event on toggle', () => {
    let receivedEvent: any = null;
    const listener = (e: any) => {
      receivedEvent = e.detail;
    };
    (globalThis as any).window.addEventListener('stackup-theme-change', listener);

    setThemeMode('light');
    expect(receivedEvent).not.toBeNull();
    expect(receivedEvent.mode).toBe('light');
    expect(receivedEvent.isDark).toBe(false);
    expect(receivedEvent.themeId).toBe('lavender');
  });

  it('should support applyTheme for legacy and multi-palette switching', () => {
    applyTheme('obsidian');
    expect(docElement.getAttribute('data-theme')).toBe('obsidian');
    expect(docElement.classList.contains('dark')).toBe(true);
    expect(mockStorage['stackup-theme']).toBe('obsidian');

    const active = getActiveTheme();
    expect(active.isDark).toBe(true);
    expect(active.themeId).toBe('obsidian');
  });
});
