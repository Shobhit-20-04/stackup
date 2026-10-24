import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  DEFAULT_ADMIN_PASSWORD_HASH,
  VERIFIED_ADMIN_EMAIL,
  getAdminPasswordHash,
  hashAdminPassword,
  verifyAdminPassword,
  setActiveAdminPasswordHash,
  createAdminSessionToken,
  verifyAdminSessionToken,
  timingSafeCompare,
} from '@/lib/security/admin-auth';
import {
  isEligibleAdminEmail,
  createResetVerificationCode,
  verifyAndConsumeCode,
  getAdminEmergencyCodes,
  persistAdminPasscodeToEnv,
} from '@/lib/security/admin-reset-store';
import { checkRateLimit } from '@/lib/services/rate-limit';
import {
  saveUploadedResume,
  getUploadedResumeById,
  deleteUploadedResume,
  purgeTestRecords,
  reprocessResume,
  recordAdminAudit,
  getAdminAuditLogs,
  extractCandidateName,
  isTestOrDemoRecord,
} from '@/lib/services/resume/resume-repository';

describe('Admin Authentication, Salted Scrypt Hashing & Key Verification', () => {

  beforeEach(() => {
    // Restore default hash for each test
    process.env.ADMIN_PASSWORD_HASH = DEFAULT_ADMIN_PASSWORD_HASH;
    delete process.env.ADMIN_PASSCODE;
  });

  it('1. successfully verifies newly specified admin password against salted scrypt hash', () => {
    // Verify candidate matches the precomputed NIST-compliant salted scrypt hash
    const isValid = verifyAdminPassword('$t@ckup/admin201104', DEFAULT_ADMIN_PASSWORD_HASH);
    expect(isValid).toBe(true);
  });

  it('1b. successfully verifies newly specified admin password when called with single argument (as in auth route)', () => {
    // When called from /api/admin/auth: verifyAdminPassword(passcode)
    const isValid = verifyAdminPassword('$t@ckup/admin201104');
    expect(isValid).toBe(true);
  });

  it('2. strictly rejects legacy admin password against the active scrypt hash', () => {
    const isOldValid = verifyAdminPassword('stack2004up', DEFAULT_ADMIN_PASSWORD_HASH);
    expect(isOldValid).toBe(false);
  });

  it('3. safely rejects empty, malformed, or close-match password attempts', () => {
    expect(verifyAdminPassword('', DEFAULT_ADMIN_PASSWORD_HASH)).toBe(false);
    expect(verifyAdminPassword('   ', DEFAULT_ADMIN_PASSWORD_HASH)).toBe(false);
    expect(verifyAdminPassword('$t@ckup/admin201105', DEFAULT_ADMIN_PASSWORD_HASH)).toBe(false);
    expect(verifyAdminPassword('$t@ckup/admin', DEFAULT_ADMIN_PASSWORD_HASH)).toBe(false);
    expect(verifyAdminPassword('admin201104', DEFAULT_ADMIN_PASSWORD_HASH)).toBe(false);
    expect(verifyAdminPassword('$T@CKUP/ADMIN201104', DEFAULT_ADMIN_PASSWORD_HASH)).toBe(false);
  });

  it('4. hashAdminPassword generates a unique random salt and valid scrypt format', () => {
    const rawPass = 'SecretAdminKey#2026';
    const hash1 = hashAdminPassword(rawPass);
    const hash2 = hashAdminPassword(rawPass);

    // Both must follow format scrypt:<saltHex>:<derivedHex>
    expect(hash1.startsWith('scrypt:')).toBe(true);
    expect(hash2.startsWith('scrypt:')).toBe(true);

    const parts1 = hash1.split(':');
    const parts2 = hash2.split(':');

    expect(parts1.length).toBe(3);
    expect(parts2.length).toBe(3);

    // Salts must be cryptographically distinct (randomized 16-byte salts)
    expect(parts1[1]).not.toBe(parts2[1]);
    expect(parts1[2]).not.toBe(parts2[2]);

    // Both distinct hashes must verify the exact same plaintext password
    expect(verifyAdminPassword(rawPass, hash1)).toBe(true);
    expect(verifyAdminPassword(rawPass, hash2)).toBe(true);
    expect(verifyAdminPassword('WrongPassword', hash1)).toBe(false);
  });

  it('5. timingSafeCompare safely handles equal and unequal lengths without leaking timings', () => {
    expect(timingSafeCompare('correct-admin-key', 'correct-admin-key')).toBe(true);
    expect(timingSafeCompare('correct-admin-key', 'wrong-key')).toBe(false);
    expect(timingSafeCompare('', 'key')).toBe(false);
    expect(timingSafeCompare('key', '')).toBe(false);
  });
});

describe('Admin Session Lifecycle, Signatures & Invalidation on Password Change', () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD_HASH = DEFAULT_ADMIN_PASSWORD_HASH;
  });

  it('6. creates signed admin session token with timestamp and signature', () => {
    const token = createAdminSessionToken();
    expect(token).toBeDefined();
    const parts = token.split('.');
    expect(parts.length).toBe(2);

    const [timestampStr, sig] = parts;
    const ts = parseInt(timestampStr, 10);
    expect(isNaN(ts)).toBe(false);
    expect(Date.now() - ts).toBeLessThan(5000);
    expect(sig.length).toBe(64); // SHA-256 HMAC hex digest

    expect(verifyAdminSessionToken(token)).toBe(true);
  });

  it('7. rejects tampered or expired admin session tokens', () => {
    const token = createAdminSessionToken();
    const [ts, sig] = token.split('.');

    // Tampered signature
    const tamperedSig = sig.slice(0, -2) + (sig.endsWith('a') ? 'b' : 'a');
    expect(verifyAdminSessionToken(`${ts}.${tamperedSig}`)).toBe(false);

    // Expired timestamp (25 hours ago)
    const expiredTs = (Date.now() - 25 * 60 * 60 * 1000).toString();
    expect(verifyAdminSessionToken(`${expiredTs}.${sig}`)).toBe(false);

    // Malformed token strings
    expect(verifyAdminSessionToken('')).toBe(false);
    expect(verifyAdminSessionToken('not-a-token')).toBe(false);
    expect(verifyAdminSessionToken('abc.def.ghi')).toBe(false);
  });

  it('8. immediately invalidates all active sessions when admin password changes', () => {
    // Generate valid session token with current password
    const originalToken = createAdminSessionToken();
    expect(verifyAdminSessionToken(originalToken)).toBe(true);

    // Update the active admin password hash
    const newHash = hashAdminPassword('BrandNewSecurityKey@2026!');
    setActiveAdminPasswordHash(newHash);

    // The previously issued token must immediately fail verification
    expect(verifyAdminSessionToken(originalToken)).toBe(false);

    // A newly issued token under the new password must pass
    const newToken = createAdminSessionToken();
    expect(verifyAdminSessionToken(newToken)).toBe(true);
  });
});

describe('Admin Password Recovery & Single-Use Verification Codes', () => {
  it('9. strictly restricts recovery eligibility to verified admin email address', () => {
    expect(isEligibleAdminEmail('shobhitagrawal2004@gmail.com')).toBe(true);
    expect(isEligibleAdminEmail('SHOBHITAGRAWAL2004@GMAIL.COM')).toBe(true);
    expect(isEligibleAdminEmail('  shobhitagrawal2004@gmail.com  ')).toBe(true);

    // Reject arbitrary or attacker emails
    expect(isEligibleAdminEmail('attacker@evil.com')).toBe(false);
    expect(isEligibleAdminEmail('admin@stackup.xyz')).toBe(false);
    expect(isEligibleAdminEmail('shobhit@gmail.com')).toBe(false);
    expect(isEligibleAdminEmail('')).toBe(false);
  });

  it('10. generates cryptographic 6-digit verification code with 15-minute TTL', () => {
    const { code, expiresAt } = createResetVerificationCode(VERIFIED_ADMIN_EMAIL, '127.0.0.1');
    expect(code).toMatch(/^[0-9]{6}$/);
    expect(expiresAt).toBeGreaterThan(Date.now());
    expect(expiresAt - Date.now()).toBeLessThanOrEqual(15 * 60 * 1000 + 1000);
  });

  it('11. verifies code once and enforces single-use token consumption', () => {
    const { code } = createResetVerificationCode(VERIFIED_ADMIN_EMAIL, '127.0.0.1');

    // First attempt with correct code succeeds
    const attempt1 = verifyAndConsumeCode(VERIFIED_ADMIN_EMAIL, code);
    expect(attempt1.success).toBe(true);

    // Second attempt with same code fails (cannot be replayed)
    const attempt2 = verifyAndConsumeCode(VERIFIED_ADMIN_EMAIL, code);
    expect(attempt2.success).toBe(false);
    expect(attempt2.error).toContain('No active reset request found');
  });

  it('12. tracks failed verification attempts and revokes code after 5 invalid tries', () => {
    const { code } = createResetVerificationCode(VERIFIED_ADMIN_EMAIL, '127.0.0.1');

    // Submit wrong code 4 times
    for (let i = 1; i <= 4; i++) {
      const res = verifyAndConsumeCode(VERIFIED_ADMIN_EMAIL, '000000');
      expect(res.success).toBe(false);
      expect(res.error).toContain('remaining');
    }

    // 5th failed attempt triggers revocation
    const res5 = verifyAndConsumeCode(VERIFIED_ADMIN_EMAIL, '000000');
    expect(res5.success).toBe(false);
    expect(res5.error).toContain('Too many incorrect attempts');

    // Even entering the correct code now fails because the token was revoked
    const correctAfterRevocation = verifyAndConsumeCode(VERIFIED_ADMIN_EMAIL, code);
    expect(correctAfterRevocation.success).toBe(false);
  });

  it('13. provides valid deterministic emergency codes for cross-instance verification', () => {
    const emergencyCodes = getAdminEmergencyCodes(VERIFIED_ADMIN_EMAIL);
    expect(emergencyCodes.length).toBeGreaterThanOrEqual(2);
    for (const ec of emergencyCodes) {
      expect(ec).toMatch(/^[0-9]{6}$/);
      // Each emergency code verifies successfully
      const res = verifyAndConsumeCode(VERIFIED_ADMIN_EMAIL, ec);
      expect(res.success).toBe(true);
    }
  });

  it('14. persistAdminPasscodeToEnv updates password hash without plaintext leakage', () => {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const originalEnvFile = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : null;
    const originalEnvHash = process.env.ADMIN_PASSWORD_HASH;
    const originalEnvPass = process.env.ADMIN_PASSCODE;

    try {
      const candidateKey = 'UpdatedSecureKey#2026';
      persistAdminPasscodeToEnv(candidateKey);

      // Active hash in memory must now verify against the new key
      const activeHash = getAdminPasswordHash();
      expect(activeHash.startsWith('scrypt:')).toBe(true);
      expect(activeHash).not.toContain(candidateKey); // Plaintext is never stored
      expect(verifyAdminPassword(candidateKey, activeHash)).toBe(true);
    } finally {
      // Restore original .env.local on disk and reset process.env
      if (originalEnvFile !== null) {
        fs.writeFileSync(envPath, originalEnvFile, 'utf8');
      }
      process.env.ADMIN_PASSWORD_HASH = originalEnvHash || DEFAULT_ADMIN_PASSWORD_HASH;
      if (originalEnvPass) {
        process.env.ADMIN_PASSCODE = originalEnvPass;
      } else {
        delete process.env.ADMIN_PASSCODE;
      }
    }
  });
});

describe('Rate Limiting & Admin Brute Force Protection', () => {
  it('15. defends against brute force by limiting repeated attempts', () => {
    const testIp = '192.168.1.105';
    const limitKey = `admin-test-limiter-${testIp}`;

    // 5 attempts allowed
    for (let i = 0; i < 5; i++) {
      const check = checkRateLimit(limitKey, 5, 60000);
      expect(check.allowed).toBe(true);
    }

    // 6th attempt is blocked
    const blockedCheck = checkRateLimit(limitKey, 5, 60000);
    expect(blockedCheck.allowed).toBe(false);
    expect(blockedCheck.resetInSeconds).toBeGreaterThan(0);
  });
});

describe('ATS Resume Management, Real Data Persistence & Advanced Features', () => {
  it('16. extractCandidateName accurately derives names without hardcoding', () => {
    // A. From clean resume header
    const sampleText = 'Jane Doe\njane.doe@gmail.com | +1 555-0192\nEXPERIENCE\nSoftware Engineer...';
    expect(extractCandidateName(sampleText, 'jane.doe@gmail.com')).toBe('Jane Doe');

    // B. From email prefix when name is omitted in text
    const textWithoutName = 'SUMMARY\nPassionate engineer.\nSKILLS: Python, React';
    expect(extractCandidateName(textWithoutName, 'alex.turner@gmail.com')).toBe('Alex Turner');

    // C. Respects authenticated account full_name
    expect(extractCandidateName(sampleText, 'john@corp.com', 'Dr. John Watson')).toBe('Dr. John Watson');
  });

  it('17. isTestOrDemoRecord reliably filters out synthetic test records', () => {
    expect(isTestOrDemoRecord('candidate@example.com', 'Resume.pdf')).toBe(true);
    expect(isTestOrDemoRecord('user@domain.com', 'Resume.docx')).toBe(true);
    expect(isTestOrDemoRecord('realstudent@gmail.com', 'alex_smith_resume.pdf')).toBe(true);
    expect(isTestOrDemoRecord('realstudent@gmail.com', 'john_doe_cv.docx')).toBe(true);
    expect(isTestOrDemoRecord('realstudent@gmail.com', 'direct_test.pdf')).toBe(true);

    // Genuine records must not be filtered
    expect(isTestOrDemoRecord('shobhitagrawal2004@gmail.com', 'Shobhit_Agrawal_SDE.pdf')).toBe(false);
    expect(isTestOrDemoRecord('priya.sharma@gmail.com', 'Priya_Sharma_Resume.docx')).toBe(false);
  });

  it('18. saveUploadedResume persists real resume with candidate name, score and binary presence', async () => {
    const testResumeId = '11111111-2222-3333-4444-555555555555';
    const sampleBinary = Buffer.from('%PDF-1.4 sample content').toString('base64');
    
    const saved = await saveUploadedResume({
      id: testResumeId,
      filename: 'Maria_Garcia_SDE.pdf',
      file_size: 15420,
      mime_type: 'application/pdf',
      resume_text: 'Maria Garcia\nmariag@gmail.com\nSkills: TypeScript, Next.js, Node.js\nLed migration to Next.js reducing latency by 40%.',
      ats_score: 82,
      analysis: {
        grade: 'A',
        summary: 'Solid full-stack engineering profile.',
        breakdown: {
          contact_score: 90,
          experience_score: 80,
          skills_score: 85,
          formatting_score: 85,
        },
        matched_keywords: ['TypeScript', 'Next.js', 'Node.js'],
        missing_keywords: ['Docker', 'Kubernetes'],
      },
      user_id: null,
      user_email: 'mariag@gmail.com',
      ip_address: '127.0.0.1',
      file_data: sampleBinary,
      status: 'parsed',
    });

    expect(saved.id).toBe(testResumeId);
    expect(saved.candidate_name).toBe('Maria Garcia');
    expect(saved.has_file_data).toBe(true);
    expect(saved.ats_score).toBe(82);

    // Retrieve by ID
    const retrieved = await getUploadedResumeById(testResumeId);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.filename).toBe('Maria_Garcia_SDE.pdf');
    expect(retrieved?.file_data).toBe(sampleBinary);
  });

  it('19. reprocessResume re-executes parsing and scoring on stored file', async () => {
    const testResumeId = '11111111-2222-3333-4444-555555555555';
    const reprocessed = await reprocessResume(testResumeId, 'admin@test.local', '127.0.0.1');

    expect(reprocessed.id).toBe(testResumeId);
    expect(reprocessed.status).toBe('parsed');
    expect(typeof reprocessed.ats_score).toBe('number');
    expect(reprocessed.analysis?.breakdown).toBeDefined();
  });

  it('20. records administrative actions in immutable audit log', async () => {
    await recordAdminAudit({
      action: 'VIEW',
      admin_email: 'shobhitagrawal2004@gmail.com',
      target_id: '11111111-2222-3333-4444-555555555555',
      target_name: 'Maria_Garcia_SDE.pdf',
      details: 'Admin viewed candidate dossier and raw text stream',
      ip_address: '127.0.0.1',
    });

    const logs = await getAdminAuditLogs(10);
    expect(logs.length).toBeGreaterThan(0);
    const viewLog = logs.find((l) => l.action === 'VIEW' && l.target_id === '11111111-2222-3333-4444-555555555555');
    expect(viewLog).toBeDefined();
    expect(viewLog?.admin_email).toBe('shobhitagrawal2004@gmail.com');
  });

  it('21. deleteUploadedResume and bulk delete removes records and logs action', async () => {
    const testResumeId = '11111111-2222-3333-4444-555555555555';
    const res = await deleteUploadedResume(testResumeId, 'admin@test.local', '127.0.0.1');
    expect(res).toBe(true);

    const check = await getUploadedResumeById(testResumeId);
    expect(check).toBeNull();

    // Verify deletion audit was logged
    const logs = await getAdminAuditLogs(10);
    const delLog = logs.find((l) => l.action === 'DELETE' && l.target_id === testResumeId);
    expect(delLog).toBeDefined();
  });

  it('22. purgeTestRecords removes any residual mock candidates safely', async () => {
    // Insert a dummy record
    const dummyId = '99999999-9999-9999-9999-999999999999';
    await saveUploadedResume({
      id: dummyId,
      filename: 'alex_smith_dummy_resume.pdf',
      file_size: 5000,
      mime_type: 'application/pdf',
      resume_text: 'Alex Smith dummy text',
      ats_score: 50,
      analysis: null,
      user_id: null,
      user_email: 'alex_smith@example.com',
      ip_address: '127.0.0.1',
      status: 'parsed',
    });

    const { purgedCount } = await purgeTestRecords('admin@test.local', '127.0.0.1');
    expect(purgedCount).toBeGreaterThanOrEqual(1);

    const check = await getUploadedResumeById(dummyId);
    expect(check).toBeNull();
  });
});
