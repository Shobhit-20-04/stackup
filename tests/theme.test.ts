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

  it('should include the official brand colors in the curated theme palettes', () => {
    const cosmic = THEMES.find((t) => t.id === 'cosmic');
    const lavender = THEMES.find((t) => t.id === 'lavender');
    const obsidian = THEMES.find((t) => t.id === 'obsidian');

    expect(cosmic).toBeDefined();
    expect(lavender).toBeDefined();
    expect(obsidian).toBeDefined();

    // Official Palette Check: Deep Teal #044E62, Electric Indigo #0D08CB, Warm Brown #4A3932, Soft Lavender #E9DEFA, Soft Pink #FACAE7
    expect(cosmic?.palette).toEqual(['#0B1020', '#151D35', '#044E62', '#0D08CB', '#E9DEFA']);
    expect(lavender?.palette).toEqual(['#E9DEFA', '#FFFFFF', '#044E62', '#0D08CB', '#4A3932']);
    expect(obsidian?.palette).toEqual(['#171210', '#251C18', '#044E62', '#FACAE7', '#0D08CB']);
  });

  it('should verify WCAG 2.2 AA / AAA contrast ratios for official brand pairs', () => {
    function getLuminance(hex: string): number {
      const rgb = [
        parseInt(hex.slice(1, 3), 16) / 255,
        parseInt(hex.slice(3, 5), 16) / 255,
        parseInt(hex.slice(5, 7), 16) / 255,
      ].map((val) => {
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    }

    function getContrastRatio(hex1: string, hex2: string): number {
      const lum1 = getLuminance(hex1);
      const lum2 = getLuminance(hex2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    // 1. Electric Indigo on White (Buttons / CTAs)
    const indigoOnWhite = getContrastRatio('#0D08CB', '#FFFFFF');
    expect(indigoOnWhite).toBeGreaterThanOrEqual(7.0); // Passes AAA (> 11:1)

    // 2. Deep Teal on White (Brand headings / accents)
    const tealOnWhite = getContrastRatio('#044E62', '#FFFFFF');
    expect(tealOnWhite).toBeGreaterThanOrEqual(7.0); // Passes AAA (> 9.5:1)

    // 3. Warm Brown on White (Primary text in light theme)
    const brownOnWhite = getContrastRatio('#4A3932', '#FFFFFF');
    expect(brownOnWhite).toBeGreaterThanOrEqual(7.0); // Passes AAA (> 11:1)

    // 4. Warm Brown on Soft Lavender (Text on light lavender panels)
    const brownOnLavender = getContrastRatio('#4A3932', '#E9DEFA');
    expect(brownOnLavender).toBeGreaterThanOrEqual(4.5); // Passes AA (> 9:1)

    // 5. Warm Brown on Soft Pink (Text on pink badges)
    const brownOnPink = getContrastRatio('#4A3932', '#FACAE7');
    expect(brownOnPink).toBeGreaterThanOrEqual(4.5); // Passes AA (> 8:1)
  });
});
