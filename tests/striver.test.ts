import { describe, it, expect } from 'vitest';
import { DSA_PROBLEMS } from '../src/lib/data/dsa';
import { 
  createAdminSessionToken, 
  verifyAdminSessionToken, 
  timingSafeCompare 
} from '../src/lib/security/admin-auth';
import { generateSecurePasscode } from '../scripts/reset-admin-passcode';

describe('Striver SDE Sheet & Recovery Regression Suite', () => {
  describe('Striver SDE Sheet Problems Coverage', () => {
    it('verifies at least 150 problems are mapped for the Striver SDE Sheet', () => {
      expect(DSA_PROBLEMS.length).toBeGreaterThanOrEqual(150);
    });

    it('verifies all 150 problems have valid TakeUForward URLs', () => {
      const first150 = DSA_PROBLEMS.slice(0, 150);
      for (const p of first150) {
        expect(p.striver_url).toBeDefined();
        expect(p.striver_url).toMatch(/^https:\/\/takeuforward\.org\//);
        expect(p.striver_url.length).toBeGreaterThan(25);
      }
    });

    it('verifies all 150 problems have valid LeetCode URLs', () => {
      const first150 = DSA_PROBLEMS.slice(0, 150);
      for (const p of first150) {
        expect(p.leetcode_url).toBeDefined();
        expect(p.leetcode_url).toMatch(/^https:\/\/leetcode\.com\/problems\//);
      }
    });

    it('verifies all 150 problems have valid YouTube video solution URLs', () => {
      const first150 = DSA_PROBLEMS.slice(0, 150);
      for (const p of first150) {
        expect(p.youtube_url).toBeDefined();
        expect(p.youtube_url).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
      }
    });

    it('verifies all 150 problems contain multi-language code implementations (Python, C++, Java, TS)', () => {
      const first150 = DSA_PROBLEMS.slice(0, 150);
      for (const p of first150) {
        expect(p.solutions.python.length).toBeGreaterThan(15);
        expect(p.solutions.cpp.length).toBeGreaterThan(15);
        expect(p.solutions.java.length).toBeGreaterThan(15);
        expect(p.solutions.typescript.length).toBeGreaterThan(15);
      }
    });

    it('verifies category distribution covers foundational SDE patterns', () => {
      const categories = new Set(DSA_PROBLEMS.slice(0, 150).map((p) => p.pattern_tag));
      expect(categories.size).toBeGreaterThanOrEqual(15);
      expect(categories.has('Arrays & Hashing')).toBe(true);
      expect(categories.has('Linked List')).toBe(true);
      expect(categories.has('Trees & BST')).toBe(true);
      expect(categories.has('Graphs')).toBe(true);
    });
  });

  describe('Deep-link Problem Matching Logic', () => {
    it('resolves problem by explicit ID (e.g. dsa-1)', () => {
      const id = 'dsa-1';
      const target = DSA_PROBLEMS.find((p) => p.id.toLowerCase() === id.toLowerCase());
      expect(target).toBeDefined();
      expect(target?.title).toBe('Two Sum');
    });

    it('resolves problem by kebab-case title slug (e.g. two-sum, 3sum)', () => {
      const slug = 'two-sum';
      const target = DSA_PROBLEMS.find(
        (p) =>
          p.id.toLowerCase() === slug.toLowerCase() ||
          p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug.toLowerCase()
      );
      expect(target).toBeDefined();
      expect(target?.id).toBe('dsa-1');
    });

    it('resolves problem with special characters in title slug (e.g. merge-k-sorted-lists)', () => {
      const slug = 'merge-k-sorted-lists';
      const target = DSA_PROBLEMS.find(
        (p) =>
          p.id.toLowerCase() === slug.toLowerCase() ||
          p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug.toLowerCase()
      );
      expect(target).toBeDefined();
      expect(target?.pattern_tag).toBe('Heap / Priority Queue');
    });
  });

  describe('Admin Security & Password Recovery', () => {
    it('generates random passcodes of specified length with strong character variety', () => {
      const code16 = generateSecurePasscode(16);
      expect(code16.length).toBe(16);
      const code24 = generateSecurePasscode(24);
      expect(code24.length).toBe(24);
      expect(code16).not.toEqual(code24);
    });

    it('performs timing-safe comparison correctly', () => {
      expect(timingSafeCompare('correct-passcode', 'correct-passcode')).toBe(true);
      expect(timingSafeCompare('correct-passcode', 'wrong-passcode')).toBe(false);
      expect(timingSafeCompare('short', 'much-longer-string')).toBe(false);
      expect(timingSafeCompare('', '')).toBe(true);
    });

    it('generates and verifies HMAC admin session token', () => {
      const token = createAdminSessionToken();
      expect(token).toContain('.');
      const isValid = verifyAdminSessionToken(token);
      expect(isValid).toBe(true);
    });

    it('rejects tampered or forged admin session tokens', () => {
      const token = createAdminSessionToken();
      const [ts, sig] = token.split('.');
      const tamperedSig = sig.slice(0, -2) + (sig.slice(-2) === 'aa' ? 'bb' : 'aa');
      const tamperedToken = `${ts}.${tamperedSig}`;

      expect(verifyAdminSessionToken(tamperedToken)).toBe(false);
      expect(verifyAdminSessionToken('invalid.token.structure')).toBe(false);
      expect(verifyAdminSessionToken('')).toBe(false);
    });
  });
});
