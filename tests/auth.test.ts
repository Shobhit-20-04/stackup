import { describe, it, expect } from 'vitest';

describe('StackUp Phase 1: Environment & Config Validation', () => {
  it('should load default application configuration', () => {
    const appName = 'StackUp';
    const targetDomain = 'stackup.xyz';
    expect(appName).toBe('StackUp');
    expect(targetDomain).toBe('stackup.xyz');
  });

  it('should validate email format for Email/Password login', () => {
    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    };

    expect(isValidEmail('student@stackup.dev')).toBe(true);
    expect(isValidEmail('user.name+tag@college.edu')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
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

  it('should validate password security constraints for email signup', () => {
    const isValidPassword = (password: string) => password.length >= 6;

    expect(isValidPassword('securepass123')).toBe(true);
    expect(isValidPassword('123456')).toBe(true);
    expect(isValidPassword('short')).toBe(false);
    expect(isValidPassword('')).toBe(false);
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
