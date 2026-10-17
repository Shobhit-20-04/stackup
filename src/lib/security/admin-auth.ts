import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'stackup_admin_session';

/**
 * Verified Administrative Account Email
 * Strictly restricts password recovery and privileged administration.
 */
export const VERIFIED_ADMIN_EMAIL = 'shobhitagrawal2004@gmail.com';

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || VERIFIED_ADMIN_EMAIL;
}

/**
 * Returns the active admin passcode from environment variable,
 * with a fallback for local development.
 */
export function getAdminPasscode(): string {
  return process.env.ADMIN_PASSCODE || 'stack2004up';
}

/**
 * Updates the active in-memory admin passcode.
 */
export function setActiveAdminPasscode(newPasscode: string): void {
  process.env.ADMIN_PASSCODE = newPasscode;
}

/**
 * Generates an HMAC secret derived from server environment or a fallback hash.
 */
function getSigningSecret(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.ADMIN_PASSCODE || 'stackup-admin-secret-salt-2026';
}

/**
 * Timing-safe string comparison to prevent timing attack enumeration.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Execute dummy timing safe equal to avoid length-based early return timing leaks
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Creates a signed admin session token: `${timestamp}.${signature}`
 */
export function createAdminSessionToken(): string {
  const timestamp = Date.now().toString();
  const secret = getSigningSecret();
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`admin:${timestamp}:${getAdminPasscode()}`);
  const signature = hmac.digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Verifies the admin session token. Token expires after 12 hours.
 */
export function verifyAdminSessionToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Max session lifetime: 12 hours
  const MAX_AGE_MS = 12 * 60 * 60 * 1000;
  if (Date.now() - timestamp > MAX_AGE_MS || timestamp > Date.now() + 60000) {
    return false;
  }

  const secret = getSigningSecret();
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`admin:${timestampStr}:${getAdminPasscode()}`);
  const expectedSig = hmac.digest('hex');

  return timingSafeCompare(signature, expectedSig);
}

/**
 * Verifies whether an incoming NextRequest is authorized for administrative access.
 * Checks signed HttpOnly cookie, x-admin-key header, or Bearer token.
 * Strictly ignores query parameters (?key=) to prevent credential leakage into access logs.
 */
export function verifyAdminRequest(req: NextRequest): boolean {
  // 1. Check signed admin session cookie
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookie && verifyAdminSessionToken(cookie)) {
    return true;
  }

  const activePasscode = getAdminPasscode();

  // 2. Check x-admin-key header
  const adminHeader = req.headers.get('x-admin-key');
  if (adminHeader && timingSafeCompare(adminHeader.trim(), activePasscode)) {
    return true;
  }

  // 3. Check Bearer token
  const authHeader = req.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (timingSafeCompare(token, activePasscode) || verifyAdminSessionToken(token)) {
      return true;
    }
  }

  return false;
}

/**
 * Sets the secure HttpOnly admin session cookie on an outgoing response.
 */
export function setAdminSessionCookie(res: NextResponse): void {
  const token = createAdminSessionToken();
  const isProd = process.env.NODE_ENV === 'production';
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: 12 * 60 * 60, // 12 hours
  });
}

/**
 * Clears the admin session cookie.
 */
export function clearAdminSessionCookie(res: NextResponse): void {
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}
