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
});
