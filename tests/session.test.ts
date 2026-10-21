import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createSessionToken,
  validateSessionToken,
  extendSessionActivity,
  invalidateSession,
  isSessionRevoked,
} from '@/lib/security/session-manager';
import { SESSION_CONFIG, type SessionPolicyConfig } from '@/lib/security/session-config';

describe('StackUp Session Management & Automatic Timeout Suite', () => {
  const BASE_TIME = 1700000000000; // Fixed deterministic baseline timestamp (ms)

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // 1. A newly authenticated user can access protected routes
  it('1. permits newly authenticated users with valid session tokens', () => {
    const { token, payload } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
        rememberMe: false,
      },
      BASE_TIME
    );

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token).toContain('.');

    const validation = validateSessionToken(token, BASE_TIME);
    expect(validation.valid).toBe(true);
    expect(validation.payload?.userId).toBe('usr-student-101');
    expect(validation.payload?.role).toBe('student');
    expect(validation.shouldWarn).toBe(false);
    expect(validation.remainingInactivityMs).toBe(SESSION_CONFIG.inactivityTimeoutMs);
    expect(validation.remainingAbsoluteMs).toBe(SESSION_CONFIG.maxLifetimeMs);
  });

  // 2. A user is warned at the correct inactivity threshold
  it('2. warns user at the 28-minute mark (2 minutes before 30-minute inactivity limit)', () => {
    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    // At 27 minutes of inactivity: should NOT warn yet (3 minutes remaining)
    const at27m = BASE_TIME + 27 * 60 * 1000;
    const val27m = validateSessionToken(token, at27m);
    expect(val27m.valid).toBe(true);
    expect(val27m.shouldWarn).toBe(false);
    expect(val27m.remainingInactivityMs).toBe(3 * 60 * 1000);

    // At 28 minutes of inactivity: exactly 2 minutes remaining, should trigger warning!
    const at28m = BASE_TIME + 28 * 60 * 1000;
    const val28m = validateSessionToken(token, at28m);
    expect(val28m.valid).toBe(true);
    expect(val28m.shouldWarn).toBe(true);
    expect(val28m.remainingInactivityMs).toBe(2 * 60 * 1000);

    // At 29.5 minutes of inactivity: 30 seconds remaining, warning active
    const at29m30s = BASE_TIME + 29.5 * 60 * 1000;
    const val29m = validateSessionToken(token, at29m30s);
    expect(val29m.valid).toBe(true);
    expect(val29m.shouldWarn).toBe(true);
    expect(val29m.remainingInactivityMs).toBe(30 * 1000);
  });

  // 3. A user is logged out after 30 minutes of inactivity
  it('3. invalidates session after 30 minutes of inactivity (1,800,000 ms)', () => {
    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    // At exactly 30 minutes without activity: expired_inactivity
    const at30m = BASE_TIME + 30 * 60 * 1000;
    const val30m = validateSessionToken(token, at30m);
    expect(val30m.valid).toBe(false);
    expect(val30m.reason).toBe('expired_inactivity');

    // At 35 minutes: still expired
    const at35m = BASE_TIME + 35 * 60 * 1000;
    const val35m = validateSessionToken(token, at35m);
    expect(val35m.valid).toBe(false);
    expect(val35m.reason).toBe('expired_inactivity');
  });

  // 4. Normal meaningful activity resets the inactivity timer
  it('4. resets the inactivity window when meaningful activity occurs', () => {
    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    // User works for 25 minutes, then performs an active action (e.g. heartbeat/save)
    const at25m = BASE_TIME + 25 * 60 * 1000;
    const extension = extendSessionActivity(token, at25m);

    expect(extension.success).toBe(true);
    expect(extension.newToken).toBeDefined();
    expect(extension.payload?.lastActiveAt).toBe(at25m);
    expect(extension.remainingInactivityMs).toBe(SESSION_CONFIG.inactivityTimeoutMs);

    // With the new token, at 45 minutes total (20m after reset), the session is still active!
    const at45m = BASE_TIME + 45 * 60 * 1000;
    const val45m = validateSessionToken(extension.newToken!, at45m);
    expect(val45m.valid).toBe(true);
    expect(val45m.remainingInactivityMs).toBe(10 * 60 * 1000);
  });

  // 5. Background requests do not indefinitely reset inactivity
  it('5. ensures read-only status checks do not extend inactivity timers', () => {
    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    // Background polling checks status at 10m, 20m, 29m
    const at10m = BASE_TIME + 10 * 60 * 1000;
    const status1 = validateSessionToken(token, at10m);
    expect(status1.valid).toBe(true);

    const at20m = BASE_TIME + 20 * 60 * 1000;
    const status2 = validateSessionToken(token, at20m);
    expect(status2.valid).toBe(true);

    // Because status checks do not modify lastActiveAt, at 30m it STILL expires!
    const at30m1s = BASE_TIME + 30 * 60 * 1000 + 1000;
    const status3 = validateSessionToken(token, at30m1s);
    expect(status3.valid).toBe(false);
    expect(status3.reason).toBe('expired_inactivity');
  });

  // 6. The 24-hour absolute lifetime cannot be bypassed through continued activity
  it('6. terminates session at 24 hours regardless of continuous activity', () => {
    let currentToken = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
        rememberMe: false, // Standard 24h absolute limit
      },
      BASE_TIME
    ).token;

    // Simulate active user extending every 20 minutes across 23.5 hours (70 steps of 20 min = 1400 min = 23h 20m)
    let simulatedTime = BASE_TIME;
    for (let step = 0; step < 70; step++) {
      simulatedTime += 20 * 60 * 1000;
      const ext = extendSessionActivity(currentToken, simulatedTime);
      expect(ext.success).toBe(true);
      currentToken = ext.newToken!;
    }

    // At 23 hours 30 minutes (10 minutes after last extension): still valid
    const at23h30m = simulatedTime + 10 * 60 * 1000;
    const valNearMax = validateSessionToken(currentToken, at23h30m);
    expect(valNearMax.valid).toBe(true);
    expect(valNearMax.remainingAbsoluteMs).toBeLessThanOrEqual(30 * 60 * 1000);

    // At 24 hours and 1 second from BASE_TIME: MUST be expired_absolute even with recent activity!
    const at24h1s = BASE_TIME + (24 * 60 * 60 * 1000) + 1000;
    const valMax = validateSessionToken(currentToken, at24h1s);
    expect(valMax.valid).toBe(false);
    expect(valMax.reason).toBe('expired_absolute');

    // Attempting to extend after absolute expiry must fail
    const failedExt = extendSessionActivity(currentToken, at24h1s);
    expect(failedExt.success).toBe(false);
    expect(failedExt.code).toBe('expired_absolute');
  });

  // 7. Session extension works before expiry and fails after expiry
  it('7. allows extension prior to expiry and rejects extension once timed out', () => {
    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    // Extension at 28 minutes (within warning window): succeeds!
    const at28m = BASE_TIME + 28 * 60 * 1000;
    const validExt = extendSessionActivity(token, at28m);
    expect(validExt.success).toBe(true);
    expect(validExt.newToken).toBeDefined();

    // Extension at 31 minutes (already timed out): fails!
    const at31m = BASE_TIME + 31 * 60 * 1000;
    const expiredExt = extendSessionActivity(token, at31m);
    expect(expiredExt.success).toBe(false);
    expect(expiredExt.code).toBe('expired_inactivity');
  });

  // 8. Logging out invalidates the session server-side
  it('8. revokes session server-side upon logout so token cannot be reused', () => {
    const { token, payload } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    expect(isSessionRevoked(payload.sid)).toBe(false);

    // Invalidate session
    invalidateSession(token);

    expect(isSessionRevoked(payload.sid)).toBe(true);

    // Token must be rejected as 'logged_out'
    const validation = validateSessionToken(token, BASE_TIME + 1000);
    expect(validation.valid).toBe(false);
    expect(validation.reason).toBe('logged_out');
  });

  // 9. Expired sessions cannot access protected APIs
  it('9. blocks access to protected API resources when token is expired or tampered', () => {
    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    // Tampered token (modified payload without valid signature)
    const [payloadPart] = token.split('.');
    const tamperedToken = `${payloadPart}.fake-invalid-signature`;
    const tamperedVal = validateSessionToken(tamperedToken, BASE_TIME);
    expect(tamperedVal.valid).toBe(false);
    expect(tamperedVal.reason).toBe('invalid_signature');

    // Missing token
    expect(validateSessionToken(null).valid).toBe(false);
    expect(validateSessionToken(undefined).valid).toBe(false);
    expect(validateSessionToken('').valid).toBe(false);
  });

  // 10. Multiple tabs remain consistent
  it('10. produces consistent validation across simulated browser tabs', () => {
    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    // Tab 1 and Tab 2 share the same token at 15m
    const at15m = BASE_TIME + 15 * 60 * 1000;
    const tab1Check = validateSessionToken(token, at15m);
    const tab2Check = validateSessionToken(token, at15m);
    expect(tab1Check.valid).toBe(true);
    expect(tab2Check.valid).toBe(true);
    expect(tab1Check.remainingInactivityMs).toBe(tab2Check.remainingInactivityMs);

    // Tab 1 logs out
    invalidateSession(token);

    // Tab 2 immediately sees revoked session
    const tab2AfterLogout = validateSessionToken(token, at15m + 1000);
    expect(tab2AfterLogout.valid).toBe(false);
    expect(tab2AfterLogout.reason).toBe('logged_out');
  });

  // 11. Admin and regular-user permissions remain intact
  it('11. preserves role segregation between student and admin sessions', () => {
    const studentSession = createSessionToken(
      {
        userId: 'student-uuid-1',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    const adminSession = createSessionToken(
      {
        userId: 'admin-master',
        email: 'shobhitagrawal2004@gmail.com',
        role: 'admin',
      },
      BASE_TIME
    );

    const valStudent = validateSessionToken(studentSession.token, BASE_TIME);
    expect(valStudent.valid).toBe(true);
    expect(valStudent.payload?.role).toBe('student');

    const valAdmin = validateSessionToken(adminSession.token, BASE_TIME);
    expect(valAdmin.valid).toBe(true);
    expect(valAdmin.payload?.role).toBe('admin');
  });

  // 12. Remember Me extends absolute lifetime while enforcing inactivity
  it('12. grants 7-day absolute lifetime with Remember Me while enforcing 30-min inactivity', () => {
    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
        rememberMe: true, // 7 days extended lifetime
      },
      BASE_TIME
    );

    // Step forward past 24 hours (to 26 hours) with periodic activity
    let currentTime = BASE_TIME;
    let currentToken = token;
    while (currentTime < BASE_TIME + 26 * 60 * 60 * 1000) {
      currentTime += 20 * 60 * 1000;
      const ext = extendSessionActivity(currentToken, currentTime);
      expect(ext.success).toBe(true);
      currentToken = ext.newToken!;
    }

    // At 26 hours (past 24h limit): Remember Me session is STILL valid!
    const valAt26h = validateSessionToken(currentToken, currentTime);
    expect(valAt26h.valid).toBe(true);
    expect(valAt26h.payload?.rememberMe).toBe(true);
    expect(valAt26h.remainingAbsoluteMs).toBeGreaterThan(5 * 24 * 60 * 60 * 1000);

    // BUT if the user goes inactive for 31 minutes: inactivity timeout kicks in!
    const inactiveAt26h = currentTime + 31 * 60 * 1000;
    const valInactive = validateSessionToken(currentToken, inactiveAt26h);
    expect(valInactive.valid).toBe(false);
    expect(valInactive.reason).toBe('expired_inactivity');
  });

  // 13. Configurable timeouts can be tuned via custom configuration
  it('13. allows custom session configuration values without hardcoded limits', () => {
    const customConfig: SessionPolicyConfig = {
      maxLifetimeMs: 60 * 60 * 1000, // 1 hour max
      inactivityTimeoutMs: 10 * 60 * 1000, // 10 minutes inactivity
      warningThresholdMs: 1 * 60 * 1000, // 1 minute warning
      rememberMeLifetimeMs: 24 * 60 * 60 * 1000,
      checkIntervalMs: 5000,
      cookieName: 'custom_session_cookie',
      syncChannelName: 'custom_sync_channel',
    };

    const { token } = createSessionToken(
      {
        userId: 'usr-student-101',
        email: 'student@stackup.xyz',
        role: 'student',
      },
      BASE_TIME
    );

    // Under custom 10m inactivity, 9m warns
    const at9m = BASE_TIME + 9 * 60 * 1000;
    const val9m = validateSessionToken(token, at9m, customConfig);
    expect(val9m.valid).toBe(true);
    expect(val9m.shouldWarn).toBe(true);

    // Under custom 10m inactivity, 11m expires
    const at11m = BASE_TIME + 11 * 60 * 1000;
    const val11m = validateSessionToken(token, at11m, customConfig);
    expect(val11m.valid).toBe(false);
    expect(val11m.reason).toBe('expired_inactivity');
  });
});
