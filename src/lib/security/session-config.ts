/**
 * StackUp Unified Session Policy Configuration
 * Centralized, configurable timeouts and policies for all student and admin sessions.
 * Configurable via environment variables or sensible production defaults.
 */

export interface SessionPolicyConfig {
  /** Maximum absolute session duration regardless of activity (Default: 24h = 86,400,000ms) */
  maxLifetimeMs: number;
  /** Inactivity timeout window without meaningful user activity (Default: 30m = 1,800,000ms) */
  inactivityTimeoutMs: number;
  /** Warning prompt threshold before inactivity expiry (Default: 2m = 120,000ms) */
  warningThresholdMs: number;
  /** Extended absolute lifetime when "Remember Me" is enabled (Default: 7d = 604,800,000ms) */
  rememberMeLifetimeMs: number;
  /** Periodic client-side check interval (Default: 15s = 15,000ms) */
  checkIntervalMs: number;
  /** Cookie name for session metadata and cryptographically signed timestamps */
  cookieName: string;
  /** BroadcastChannel and storage sync channel name for multi-tab coordination */
  syncChannelName: string;
}

export const SESSION_CONFIG: SessionPolicyConfig = {
  maxLifetimeMs: Number(process.env.SESSION_MAX_LIFETIME_MS) || 24 * 60 * 60 * 1000, // 24 hours
  inactivityTimeoutMs: Number(process.env.SESSION_INACTIVITY_TIMEOUT_MS) || 30 * 60 * 1000, // 30 minutes
  warningThresholdMs: Number(process.env.SESSION_WARNING_THRESHOLD_MS) || 2 * 60 * 1000, // 2 minutes
  rememberMeLifetimeMs: Number(process.env.SESSION_REMEMBER_ME_LIFETIME_MS) || 7 * 24 * 60 * 60 * 1000, // 7 days
  checkIntervalMs: 15 * 1000, // 15 seconds
  cookieName: 'stackup_session_meta',
  syncChannelName: 'stackup_session_sync',
};

/**
 * Lightweight, zero-dependency session timestamp inspector for Edge Middleware.
 * Decodes base64url payload without Node crypto and calculates expiry.
 */
export function inspectSessionExpiry(
  token: string | null | undefined,
  now: number = Date.now(),
  config: SessionPolicyConfig = SESSION_CONFIG
): {
  valid: boolean;
  reason?: 'expired_inactivity' | 'expired_absolute' | 'invalid_format' | 'missing';
  payload?: {
    sid: string;
    userId: string;
    email: string;
    role: 'student' | 'admin';
    createdAt: number;
    lastActiveAt: number;
    rememberMe?: boolean;
  };
} {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'missing' };
  }
  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, reason: 'invalid_format' };
  }

  try {
    const b64 = parts[0].replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), '=');
    const jsonStr = typeof atob === 'function'
      ? atob(padded)
      : Buffer.from(b64, 'base64').toString('utf8');
    const payload = JSON.parse(jsonStr);

    if (
      !payload ||
      typeof payload.createdAt !== 'number' ||
      typeof payload.lastActiveAt !== 'number'
    ) {
      return { valid: false, reason: 'invalid_format' };
    }

    const maxLifetime = payload.rememberMe ? config.rememberMeLifetimeMs : config.maxLifetimeMs;
    const elapsedSinceCreation = now - payload.createdAt;
    if (elapsedSinceCreation >= maxLifetime || elapsedSinceCreation < -60000) {
      return { valid: false, reason: 'expired_absolute' };
    }

    const elapsedSinceActivity = now - payload.lastActiveAt;
    if (elapsedSinceActivity >= config.inactivityTimeoutMs || elapsedSinceActivity < -60000) {
      return { valid: false, reason: 'expired_inactivity' };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, reason: 'invalid_format' };
  }
}

