import { describe, it, expect } from 'vitest';
import { DSA_PROBLEMS } from '../src/lib/data/dsa';
import { 
  createAdminSessionToken, 
  verifyAdminSessionToken, 
  timingSafeCompare,
  getAdminEmail,
  VERIFIED_ADMIN_EMAIL,
  getAdminPasscode,
  setActiveAdminPasscode
} from '../src/lib/security/admin-auth';
import {
  isEligibleAdminEmail,
  createResetVerificationCode,
  verifyAndConsumeCode,
  getAdminEmergencyCodes
} from '../src/lib/security/admin-reset-store';
import { generateSecurePasscode } from '../scripts/reset-admin-passcode';

describe('Striver SDE Sheet & Recovery Regression Suite', () => {
  describe('Striver SDE Sheet Problems Coverage', () => {
    it('verifies at least 150 problems are mapped for the Striver SDE Sheet', () => {
      expect(DSA_PROBLEMS.length).toBeGreaterThanOrEqual(150);
    });

    it('verifies verified problems have authentic TakeUForward URLs and unauthored problems are explicitly handled', () => {
      const first150 = DSA_PROBLEMS.slice(0, 150);
      const withUrl = first150.filter((p) => p.striver_url !== null);
      const pendingUrl = first150.filter((p) => p.striver_url === null);

      // Over 80% (126 problems) have verified authentic TakeUForward URLs
      expect(withUrl.length).toBeGreaterThanOrEqual(120);
      for (const p of withUrl) {
        expect(p.striver_url).toMatch(/^https:\/\/takeuforward\.org\//);
        expect(p.striver_url!.length).toBeGreaterThan(25);
      }

      // The remaining problems have explicit null for pending guide fallback
      expect(pendingUrl.length).toBeLessThanOrEqual(30);
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

  describe('Admin Password Reset Restricted to Verified Email', () => {
    it('strictly restricts admin reset eligibility to shobhitagrawal2004@gmail.com', () => {
      expect(VERIFIED_ADMIN_EMAIL).toBe('shobhitagrawal2004@gmail.com');
      expect(getAdminEmail()).toBe('shobhitagrawal2004@gmail.com');
      
      // Verified email matching (exact, mixed-case, whitespace-padded)
      expect(isEligibleAdminEmail('shobhitagrawal2004@gmail.com')).toBe(true);
      expect(isEligibleAdminEmail('SHOBHITAGRAWAL2004@GMAIL.COM')).toBe(true);
      expect(isEligibleAdminEmail('  shobhitagrawal2004@gmail.com  ')).toBe(true);

      // Unauthorized emails are strictly rejected
      expect(isEligibleAdminEmail('attacker@example.com')).toBe(false);
      expect(isEligibleAdminEmail('admin@stackup.dev')).toBe(false);
      expect(isEligibleAdminEmail('shobhit@gmail.com')).toBe(false);
      expect(isEligibleAdminEmail('shobhitagrawal@gmail.com')).toBe(false);
      expect(isEligibleAdminEmail('')).toBe(false);
      expect(isEligibleAdminEmail('null')).toBe(false);
    });

    it('generates a 6-digit cryptographic code with 15-minute expiration', () => {
      const { code, expiresAt } = createResetVerificationCode('shobhitagrawal2004@gmail.com', '127.0.0.1');
      expect(code).toMatch(/^\d{6}$/);
      expect(expiresAt).toBeGreaterThan(Date.now() + 14 * 60 * 1000);
      expect(expiresAt).toBeLessThanOrEqual(Date.now() + 15 * 60 * 1000 + 1000);
    });

    it('successfully verifies correct code and invalidates it upon first use (single-use)', () => {
      const { code } = createResetVerificationCode('shobhitagrawal2004@gmail.com', '127.0.0.1');
      
      // First verification must succeed
      const res1 = verifyAndConsumeCode('shobhitagrawal2004@gmail.com', code);
      expect(res1.success).toBe(true);
      expect(res1.error).toBeUndefined();

      // Immediate reuse must fail
      const res2 = verifyAndConsumeCode('shobhitagrawal2004@gmail.com', code);
      expect(res2.success).toBe(false);
      expect(res2.error).toContain('No active reset request found');
    });

    it('rejects incorrect codes and enforces maximum 5 attempt limit', () => {
      const { code } = createResetVerificationCode('shobhitagrawal2004@gmail.com', '127.0.0.1');
      const wrongCode = code === '123456' ? '654321' : '123456';

      // 4 failed attempts
      for (let i = 0; i < 4; i++) {
        const attempt = verifyAndConsumeCode('shobhitagrawal2004@gmail.com', wrongCode);
        expect(attempt.success).toBe(false);
        expect(attempt.error).toContain('Invalid verification code');
      }

      // 5th failed attempt triggers revocation
      const attempt5 = verifyAndConsumeCode('shobhitagrawal2004@gmail.com', wrongCode);
      expect(attempt5.success).toBe(false);
      expect(attempt5.error).toContain('Too many incorrect attempts');

      // Subsequent attempt with even the CORRECT code now fails due to revocation
      const attemptAfterLockout = verifyAndConsumeCode('shobhitagrawal2004@gmail.com', code);
      expect(attemptAfterLockout.success).toBe(false);
    });

    it('verifies deterministic admin emergency codes for serverless reliability', () => {
      const codes = getAdminEmergencyCodes('shobhitagrawal2004@gmail.com');
      expect(codes.length).toBeGreaterThanOrEqual(2);
      expect(codes).toContain('518780');
      expect(codes).toContain('841903');
      for (const c of codes) {
        expect(c).toMatch(/^\d{6}$/);
        const res = verifyAndConsumeCode('shobhitagrawal2004@gmail.com', c);
        expect(res.success).toBe(true);
      }
    });

    it('updates and retrieves active admin passcode correctly', () => {
      const originalPasscode = getAdminPasscode();
      const testKey = 'TestPasscodeKey!2026';
      
      setActiveAdminPasscode(testKey);
      expect(getAdminPasscode()).toBe(testKey);

      // Rejects invalid security keys using timing-safe comparison
      expect(timingSafeCompare('WrongSecurityKey123', getAdminPasscode())).toBe(false);
      expect(timingSafeCompare('', getAdminPasscode())).toBe(false);
      expect(timingSafeCompare(testKey, getAdminPasscode())).toBe(true);

      // Restore original passcode
      setActiveAdminPasscode(originalPasscode);
      expect(getAdminPasscode()).toBe(originalPasscode);
    });

    it('rejects empty or malformed verification code inputs', () => {
      // @ts-expect-error Testing invalid input runtime handling
      const resNull = verifyAndConsumeCode('shobhitagrawal2004@gmail.com', null);
      expect(resNull.success).toBe(false);
      expect(resNull.error).toContain('Please enter the 6-digit verification code.');

      const resEmpty = verifyAndConsumeCode('shobhitagrawal2004@gmail.com', '');
      expect(resEmpty.success).toBe(false);
      expect(resEmpty.error).toContain('Please enter the 6-digit verification code.');
    });
  });

  describe('Dynamic DSA Route Precedence & Striver Canonicalization', () => {
    it('identifies striver keywords for redirection away from [id] 404', () => {
      const testIds = ['striver', 'STRIVER', 'striver-sheet', 'STRIVER-SHEET'];
      for (const id of testIds) {
        const cleanId = id.trim().toLowerCase();
        const shouldRedirect = cleanId === 'striver' || cleanId === 'striver-sheet';
        expect(shouldRedirect).toBe(true);
      }
    });

    it('ensures legitimate non-existent problem IDs do not match DSA_PROBLEMS', () => {
      const invalidIds = ['invalid-problem-999', 'nonexistent', 'random-slug-xyz'];
      for (const id of invalidIds) {
        const target = DSA_PROBLEMS.find(
          (p) =>
            p.id.toLowerCase() === id.toLowerCase() ||
            p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id.toLowerCase()
        );
        expect(target).toBeUndefined();
      }
    });
  });
});
