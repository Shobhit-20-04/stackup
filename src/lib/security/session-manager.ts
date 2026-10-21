import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { SESSION_CONFIG, type SessionPolicyConfig } from './session-config';
import { timingSafeCompare } from './admin-auth';

export interface SessionPayload {
  sid: string;
  userId: string;
  email: string;
  role: 'student' | 'admin';
  createdAt: number;
  lastActiveAt: number;
  rememberMe?: boolean;
}

export type SessionInvalidReason =
  | 'expired_inactivity'
  | 'expired_absolute'
  | 'invalid_signature'
  | 'logged_out'
  | 'missing';

export interface SessionValidationResult {
  valid: boolean;
  payload?: SessionPayload;
  remainingInactivityMs?: number;
  remainingAbsoluteMs?: number;
  shouldWarn?: boolean;
  reason?: SessionInvalidReason;
}

/**
 * In-memory revocation registry for invalidated session IDs.
 * Prunes expired IDs periodically to prevent memory leaks in long-running processes.
 */
interface RevocationEntry {
  sid: string;
  revokedAt: number;
  expiresAt: number;
}

const revokedSessionsMap = new Map<string, RevocationEntry>();
let lastRevocationCleanup = Date.now();

function cleanupRevocations(): void {
  const now = Date.now();
  if (now - lastRevocationCleanup < 60 * 1000 && revokedSessionsMap.size < 1000) {
    return;
  }
  lastRevocationCleanup = now;
  for (const [sid, entry] of revokedSessionsMap.entries()) {
    if (now > entry.expiresAt) {
      revokedSessionsMap.delete(sid);
    }
  }
}

/**
 * Returns the secret key used for HMAC signing of session tokens.
 */
function getSigningSecret(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSCODE ||
    'stackup-session-signing-secret-key-2026'
  );
}

/**
 * Computes HMAC-SHA256 signature for session payload string.
 */
function computeHmac(data: string): string {
  const secret = getSigningSecret();
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * Checks whether a given session ID has been revoked (logged out).
 */
export function isSessionRevoked(sid: string): boolean {
  cleanupRevocations();
  return revokedSessionsMap.has(sid);
}

/**
 * Revokes a session by its session ID or token, preventing further use.
 */
export function invalidateSession(tokenOrSid: string): void {
  if (!tokenOrSid) return;
  cleanupRevocations();

  let sid = tokenOrSid;
  if (tokenOrSid.includes('.')) {
    try {
      const payloadPart = tokenOrSid.split('.')[0];
      const parsed: SessionPayload = JSON.parse(
        Buffer.from(payloadPart, 'base64url').toString('utf8')
      );
      if (parsed?.sid) {
        sid = parsed.sid;
      }
    } catch {
      // fallback to tokenOrSid
    }
  }

  const now = Date.now();
  revokedSessionsMap.set(sid, {
    sid,
    revokedAt: now,
    expiresAt: now + SESSION_CONFIG.rememberMeLifetimeMs,
  });
}

/**
 * Encodes and signs a session payload into a tamper-proof session token.
 */
export function signSessionPayload(payload: SessionPayload): string {
  const payloadJson = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadJson, 'utf8').toString('base64url');
  const signature = computeHmac(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

/**
 * Creates a brand new signed session token with initialized timestamps.
 */
export function createSessionToken(
  params: {
    userId: string;
    email?: string;
    role?: 'student' | 'admin';
    rememberMe?: boolean;
    sid?: string;
    createdAt?: number;
    lastActiveAt?: number;
  },
  now: number = Date.now()
): { token: string; payload: SessionPayload } {
  const sid = params.sid || crypto.randomUUID();
  const createdAt = params.createdAt || now;
  const lastActiveAt = params.lastActiveAt || now;

  const payload: SessionPayload = {
    sid,
    userId: params.userId,
    email: params.email || 'user@stackup.xyz',
    role: params.role || 'student',
    createdAt,
    lastActiveAt,
    rememberMe: Boolean(params.rememberMe),
  };

  const token = signSessionPayload(payload);
  return { token, payload };
}

/**
 * Validates a session token against signature, revocation, absolute lifetime, and inactivity.
 * Completely server-enforced: client timestamps cannot bypass these checks.
 */
export function validateSessionToken(
  token: string | null | undefined,
  now: number = Date.now(),
  config: SessionPolicyConfig = SESSION_CONFIG
): SessionValidationResult {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'missing' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, reason: 'invalid_signature' };
  }

  const [payloadPart, sigPart] = parts;
  const expectedSig = computeHmac(payloadPart);
  if (!timingSafeCompare(sigPart, expectedSig)) {
    return { valid: false, reason: 'invalid_signature' };
  }

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8'));
  } catch {
    return { valid: false, reason: 'invalid_signature' };
  }

  if (!payload || !payload.sid || typeof payload.createdAt !== 'number' || typeof payload.lastActiveAt !== 'number') {
    return { valid: false, reason: 'invalid_signature' };
  }

  if (isSessionRevoked(payload.sid)) {
    return { valid: false, reason: 'logged_out' };
  }

  // 1. Enforce Absolute Maximum Lifetime (24 hours or 7 days with Remember Me)
  const maxLifetime = payload.rememberMe ? config.rememberMeLifetimeMs : config.maxLifetimeMs;
  const elapsedSinceCreation = now - payload.createdAt;
  if (elapsedSinceCreation >= maxLifetime || elapsedSinceCreation < -60000) {
    return { valid: false, reason: 'expired_absolute' };
  }

  // 2. Enforce Inactivity Timeout (30 minutes without active interaction)
  const elapsedSinceActivity = now - payload.lastActiveAt;
  if (elapsedSinceActivity >= config.inactivityTimeoutMs || elapsedSinceActivity < -60000) {
    return { valid: false, reason: 'expired_inactivity' };
  }

  const remainingInactivityMs = Math.max(0, config.inactivityTimeoutMs - elapsedSinceActivity);
  const remainingAbsoluteMs = Math.max(0, maxLifetime - elapsedSinceCreation);
  const shouldWarn = remainingInactivityMs <= config.warningThresholdMs;

  return {
    valid: true,
    payload,
    remainingInactivityMs,
    remainingAbsoluteMs,
    shouldWarn,
  };
}

/**
 * Extends the session's lastActiveAt timestamp to the current time.
 * Can only be called if the session is currently valid and within absolute lifetime.
 */
export function extendSessionActivity(
  token: string,
  now: number = Date.now(),
  config: SessionPolicyConfig = SESSION_CONFIG
): {
  success: boolean;
  newToken?: string;
  payload?: SessionPayload;
  remainingInactivityMs?: number;
  remainingAbsoluteMs?: number;
  error?: string;
  code?: SessionInvalidReason;
} {
  const validation = validateSessionToken(token, now, config);
  if (!validation.valid || !validation.payload) {
    return {
      success: false,
      error: 'Session cannot be extended: session is expired or invalid.',
      code: validation.reason,
    };
  }

  const updatedPayload: SessionPayload = {
    ...validation.payload,
    lastActiveAt: now,
  };

  const newToken = signSessionPayload(updatedPayload);
  const maxLifetime = updatedPayload.rememberMe ? config.rememberMeLifetimeMs : config.maxLifetimeMs;
  const remainingAbsoluteMs = Math.max(0, maxLifetime - (now - updatedPayload.createdAt));

  return {
    success: true,
    newToken,
    payload: updatedPayload,
    remainingInactivityMs: config.inactivityTimeoutMs,
    remainingAbsoluteMs,
  };
}

/**
 * Attaches the signed session cookie to an outgoing HTTP response with secure attributes.
 */
export function setSessionCookie(
  res: NextResponse,
  token: string,
  rememberMe = false,
  config: SessionPolicyConfig = SESSION_CONFIG
): void {
  const maxAgeSeconds = Math.floor(
    (rememberMe ? config.rememberMeLifetimeMs : config.maxLifetimeMs) / 1000
  );
  const isProd = process.env.NODE_ENV === 'production';

  res.cookies.set({
    name: config.cookieName,
    value: token,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  });
}

/**
 * Clears all authentication and session metadata cookies across the domain.
 */
export function clearSessionCookies(res: NextResponse): void {
  const isProd = process.env.NODE_ENV === 'production';
  const cookieNames = [
    SESSION_CONFIG.cookieName,
    'sb-demo-user',
    'stackup_admin_session',
  ];

  for (const name of cookieNames) {
    res.cookies.set({
      name,
      value: '',
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
  }
}
