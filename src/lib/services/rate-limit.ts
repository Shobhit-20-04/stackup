interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
let lastCleanup = Date.now();

/**
 * Prunes expired entries to prevent memory exhaustion in server environments.
 */
function cleanupExpired(): void {
  const now = Date.now();
  if (now - lastCleanup < 60 * 1000 && rateLimitStore.size < 1000) {
    return;
  }
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * In-memory sliding-window token bucket rate limiter for serverless routes.
 * Includes automatic memory garbage collection.
 */
export function checkRateLimit(
  identifier: string,
  limit = 10,
  windowMs = 60 * 1000 // 1 minute window
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  cleanupExpired();

  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: limit - entry.count,
    resetInSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}

/**
 * Sanitizes and validates an IP address string to prevent rate-limit key injection.
 * Returns authentic IPv4 / IPv6 addresses or falls back to '127.0.0.1'.
 */
export function sanitizeIp(ip: string): string {
  if (typeof ip !== 'string') return '127.0.0.1';
  // Strip control characters, newlines, carriage returns, or whitespace
  const candidate = ip.split(/[\r\n\s,]/)[0].trim();
  if (!candidate) return '127.0.0.1';

  // Strict IPv4 validation (0-255 per octet)
  const ipv4Regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  if (ipv4Regex.test(candidate)) {
    return candidate;
  }

  // IPv6 validation (including compressed formats like ::1)
  if (candidate.includes(':') && /^[0-9a-fA-F:]+$/.test(candidate) && candidate.length <= 45) {
    return candidate;
  }

  return '127.0.0.1';
}

/**
 * Extracts client IP address safely from standard headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    // The leftmost IP is the original client IP
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp) return sanitizeIp(firstIp);
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return sanitizeIp(realIp.trim());

  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return sanitizeIp(cfIp.trim());

  return '127.0.0.1';
}
