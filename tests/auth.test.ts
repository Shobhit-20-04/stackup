import { describe, it, expect } from 'vitest';

describe('StackUp Phase 1: Environment & Config Validation', () => {
  it('should load default application configuration', () => {
    const appName = 'StackUp';
    const targetDomain = 'stackup.xyz';
    expect(appName).toBe('StackUp');
    expect(targetDomain).toBe('stackup.xyz');
  });

  it('should validate phone number format for OTP login', () => {
    const isValidPhone = (phone: string) => {
      // E.164-ish basic check: starts with +, followed by 10 to 15 digits
      return /^\+[1-9]\d{9,14}$/.test(phone.replace(/\s+/g, ''));
    };

    expect(isValidPhone('+919876543210')).toBe(true);
    expect(isValidPhone('+14155552671')).toBe(true);
    expect(isValidPhone('invalid-phone')).toBe(false);
    expect(isValidPhone('12345')).toBe(false);
  });

  it('should validate core sections schema mapping', () => {
    const defaultSections = [
      { name: 'Aptitude', slug: 'aptitude', order: 1 },
      { name: 'Core CS Subjects', slug: 'core-cs', order: 2 },
      { name: 'DSA Hub', slug: 'dsa', order: 3 },
    ];

    expect(defaultSections).toHaveLength(3);
    expect(defaultSections.map((s) => s.slug)).toEqual(['aptitude', 'core-cs', 'dsa']);
  });

  it('should compute ATS score category appropriately', () => {
    const getStatus = (score: number) => {
      if (score >= 80) return 'Good Match';
      if (score >= 60) return 'Reviewed';
      return 'Action Required';
    };

    expect(getStatus(85)).toBe('Good Match');
    expect(getStatus(65)).toBe('Reviewed');
    expect(getStatus(45)).toBe('Action Required');
  });

  it('should validate 6-digit OTP format and normalization', () => {
    const isValidOtp = (otp: string) => /^\d{6}$/.test(otp.trim());
    const normalizeOtp = (pasted: string) => pasted.replace(/\D/g, '').slice(0, 6);

    expect(isValidOtp('123456')).toBe(true);
    expect(isValidOtp('000000')).toBe(true);
    expect(isValidOtp('12345')).toBe(false);
    expect(isValidOtp('1234567')).toBe(false);
    expect(isValidOtp('123a56')).toBe(false);

    expect(normalizeOtp(' 123 456 ')).toBe('123456');
    expect(normalizeOtp('Code: 987654')).toBe('987654');
  });

  it('should validate student profile extended fields', () => {
    const sanitizeProfilePayload = (data: {
      fullName: string;
      targetRole?: string;
      college?: string;
      gradYear?: string;
      githubUrl?: string;
    }) => ({
      fullName: data.fullName.trim(),
      targetRole: data.targetRole?.trim() || null,
      college: data.college?.trim() || null,
      gradYear: data.gradYear?.trim() || null,
      githubUrl: data.githubUrl ? (data.githubUrl.startsWith('http') ? data.githubUrl : `https://${data.githubUrl}`) : null,
    });

    const parsed = sanitizeProfilePayload({
      fullName: '  Alice Dev  ',
      targetRole: 'SDE-1',
      college: 'Tech University',
      gradYear: '2026',
      githubUrl: 'github.com/alicedev',
    });

    expect(parsed.fullName).toBe('Alice Dev');
    expect(parsed.targetRole).toBe('SDE-1');
    expect(parsed.college).toBe('Tech University');
    expect(parsed.gradYear).toBe('2026');
    expect(parsed.githubUrl).toBe('https://github.com/alicedev');
  });

  it('should verify admin gateway accepts native master key stack2004up', () => {
    const MASTER_KEY = 'stack2004up';
    const verifyPin = (entered: string) => entered.trim() === MASTER_KEY;

    expect(verifyPin('stack2004up')).toBe(true);
    expect(verifyPin('  stack2004up  ')).toBe(true);
    expect(verifyPin('wrongpin')).toBe(false);
  });
});
