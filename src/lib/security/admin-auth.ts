import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'stackup_admin_session';

/**
 * Verified Administrative Account Email
 * Strictly restricts password recovery and privileged administration.
 */
export const VERIFIED_ADMIN_EMAIL = 'shobhitagrawal2004@gmail.com';

/**
 * Precomputed NIST-compliant salted scrypt hash for the administrative security credential:
 * Password: secret credential
 * Format: scrypt:<16-byte-salt-hex>:<64-byte-derived-key-hex>
 */
export const DEFAULT_ADMIN_PASSWORD_HASH =
  'scrypt:3fca47a5de7d5ec0a2f5935f4a44add7:fcdfbbfacd8f90b8fa438b52121daf3a804f1fd6c1cae801ee8f9529c502d5bac59d0560c788a89e83b5e8326563411c1bf8ec56fb7fa9e3c658392e292b0815';

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || VERIFIED_ADMIN_EMAIL;
}

/**
 * Returns the active admin password hash from environment variable or precomputed default.
 */
export function getAdminPasswordHash(): string {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return process.env.ADMIN_PASSWORD_HASH;
  }
  if (process.env.ADMIN_PASSCODE) {
    if (process.env.ADMIN_PASSCODE.startsWith('scrypt:')) {
      return process.env.ADMIN_PASSCODE;
    }
    return process.env.ADMIN_PASSCODE;
  }
  return DEFAULT_ADMIN_PASSWORD_HASH;
}

/**
 * Returns the active admin passcode. If an explicit string was set, returns it;
 * otherwise returns the active password hash.
 */
export function getAdminPasscode(): string {
  return process.env.ADMIN_PASSCODE || getAdminPasswordHash();
}

/**
 * Hashes a plaintext administrative password using scrypt with a cryptographic salt.
 */
export function hashAdminPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `scrypt:${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Verifies a candidate password against a stored scrypt hash or legacy plaintext string.
 * Uses timing-safe comparisons to prevent side-channel timing attacks.
 */
export function verifyAdminPassword(candidate: string, storedHashOrPlaintext?: string): boolean {
  if (!candidate || typeof candidate !== 'string') return false;
  const target = storedHashOrPlaintext || getAdminPasswordHash();
  if (!target || typeof target !== 'string') return false;

  // Handle scrypt formatted hashes: scrypt:<salt>:<derivedKeyHex>
  if (target.startsWith('scrypt:')) {
    const parts = target.split(':');
    if (parts.length !== 3) return false;
    const [, salt, expectedHex] = parts;
    try {
      const derivedKey = crypto.scryptSync(candidate, salt, 64);
      const expectedBuf = Buffer.from(expectedHex, 'hex');
      if (derivedKey.length !== expectedBuf.length) {
        crypto.timingSafeEqual(derivedKey, derivedKey);
        return false;
      }
      return crypto.timingSafeEqual(derivedKey, expectedBuf);
    } catch {
      return false;
    }
  }

  // Fallback for legacy plaintext password comparison (timing safe)
  return timingSafeCompare(candidate, target);
}

/**
 * Updates the active in-memory admin password hash.
 */
export function setActiveAdminPasswordHash(newHash: string): void {
  process.env.ADMIN_PASSWORD_HASH = newHash;
  process.env.ADMIN_PASSCODE = newHash;
}

/**
 * Updates the active admin passcode. Sets process.env.ADMIN_PASSCODE and
 * computes the corresponding scrypt hash for ADMIN_PASSWORD_HASH.
 */
export function setActiveAdminPasscode(newPasscode: string): void {
  process.env.ADMIN_PASSCODE = newPasscode;
  if (!newPasscode.startsWith('scrypt:')) {
    process.env.ADMIN_PASSWORD_HASH = hashAdminPassword(newPasscode);
  } else {
    process.env.ADMIN_PASSWORD_HASH = newPasscode;
  }
}

/**
 * Generates an HMAC secret derived from server environment or a fallback hash.
 */
function getSigningSecret(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.ADMIN_PASSWORD_HASH || 'stackup-admin-secret-salt-2026';
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
 * Bound to the active password hash so that changing the password immediately
 * invalidates all active sessions.
 */
export function createAdminSessionToken(): string {
  const timestamp = Date.now().toString();
  const secret = getSigningSecret();
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`admin:${timestamp}:${getAdminPasswordHash()}`);
  const signature = hmac.digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Verifies the admin session token. Token expires after 24 hours.
 */
export function verifyAdminSessionToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Max session lifetime: 24 hours
  const MAX_AGE_MS = 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > MAX_AGE_MS || timestamp > Date.now() + 60000) {
    return false;
  }

  const secret = getSigningSecret();
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`admin:${timestampStr}:${getAdminPasswordHash()}`);
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

  // 2. Check x-admin-key header
  const adminHeader = req.headers.get('x-admin-key');
  if (adminHeader && verifyAdminPassword(adminHeader.trim())) {
    return true;
  }

  // 3. Check Bearer token
  const authHeader = req.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (verifyAdminPassword(token) || verifyAdminSessionToken(token)) {
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
    maxAge: 24 * 60 * 60, // 24 hours
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
