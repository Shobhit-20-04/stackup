import { describe, it, expect } from 'vitest';
import {
  sanitizeText,
  sanitizeUrl,
  sanitizeEmail,
  sanitizeFilename,
  validateFileMagic,
  verifyCsrfOrigin,
  maskEmail,
  sanitizeRedirectPath,
} from '@/lib/security/sanitize';
import {
  timingSafeCompare,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from '@/lib/security/admin-auth';
import { checkRateLimit, sanitizeIp } from '@/lib/services/rate-limit';

describe('Security: Input Sanitization & XSS Defense', () => {
  it('strips script tags and HTML entities from user input', () => {
    const raw = '<script>alert("xss")</script>Senior Software Engineer<img src="x" onerror="steal()"/>';
    const cleaned = sanitizeText(raw);
    expect(cleaned).toBe('alert("xss")Senior Software Engineer');
    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('<img');
  });

  it('removes null bytes and non-printable control characters', () => {
    const raw = 'John\x00Doe\x07Software';
    const cleaned = sanitizeText(raw);
    expect(cleaned).toBe('JohnDoeSoftware');
  });

  it('enforces maximum character length limit', () => {
    const longStr = 'a'.repeat(2000);
    const cleaned = sanitizeText(longStr, 100);
    expect(cleaned.length).toBe(100);
  });
});

describe('Security: URL Validation & Scheme Restricton', () => {
  it('blocks javascript: and data: pseudo-protocols', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBeNull();
    expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
    expect(sanitizeUrl('vbscript:msgbox(1)')).toBeNull();
  });

  it('allows legitimate HTTPS URLs', () => {
    const valid = 'https://github.com/shobhit';
    expect(sanitizeUrl(valid)).toBe(valid);
  });

  it('restricts URLs to specified allowed hosts (e.g. github.com)', () => {
    expect(sanitizeUrl('https://github.com/shobhit', ['github.com'])).toBe('https://github.com/shobhit');
    expect(sanitizeUrl('https://evil-phishing.com/shobhit', ['github.com'])).toBeNull();
  });

  it('normalizes valid URLs entered without explicit scheme', () => {
    expect(sanitizeUrl('github.com/shobhit', ['github.com'])).toBe('https://github.com/shobhit');
    expect(sanitizeUrl('linkedin.com/in/shobhit', ['linkedin.com'])).toBe('https://linkedin.com/in/shobhit');
  });
});

describe('Security: Email & CRLF Header Injection Defense', () => {
  it('rejects emails containing newline or carriage return characters', () => {
    expect(sanitizeEmail('test@example.com\r\nBcc:victim@example.com')).toBeNull();
    expect(sanitizeEmail('test@example.com\nSubject:Spam')).toBeNull();
  });

  it('accepts and normalizes valid RFC emails', () => {
    expect(sanitizeEmail('Student.Name@StackUp.xyz')).toBe('student.name@stackup.xyz');
  });

  it('rejects malformed email addresses', () => {
    expect(sanitizeEmail('not-an-email')).toBeNull();
    expect(sanitizeEmail('missing-domain@')).toBeNull();
  });
});

describe('Security: Filename Sanitization & Path Traversal Defense', () => {
  it('strips directory traversal patterns (../, ..\\)', () => {
    expect(sanitizeFilename('../../../../etc/passwd.pdf')).toBe('passwd.pdf');
    expect(sanitizeFilename('..\\..\\windows\\system32\\cmd.exe.docx')).toBe('cmd.exe.docx');
  });

  it('sanitizes illegal characters in filenames', () => {
    const sanitized = sanitizeFilename('my*resume?file<test>.pdf');
    expect(sanitized).toBe('my_resume_file_test_.pdf');
  });
});

describe('Security: File Magic Byte Signature Validation', () => {
  it('validates authentic PDF files (%PDF- signature)', () => {
    const pdfBuffer = Buffer.from('%PDF-1.7 standard header test data');
    const result = validateFileMagic(pdfBuffer, 'pdf');
    expect(result.valid).toBe(true);
  });

  it('rejects fake PDFs disguised as executables or scripts', () => {
    const fakePdf = Buffer.from('<?php echo "evil payload"; ?>');
    const result = validateFileMagic(fakePdf, 'pdf');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('magic signature');
  });

  it('validates authentic DOCX files (PK\\x03\\x04 ZIP container)', () => {
    const docxBuffer = Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00]);
    const result = validateFileMagic(docxBuffer, 'docx');
    expect(result.valid).toBe(true);
  });

  it('rejects fake DOCX files with invalid headers', () => {
    const fakeDocx = Buffer.from('MZ executable disguised as word doc');
    const result = validateFileMagic(fakeDocx, 'docx');
    expect(result.valid).toBe(false);
  });
});

describe('Security: Timing-Safe Comparison & Admin Token Cryptography', () => {
  it('performs timing-safe string comparison accurately', () => {
    expect(timingSafeCompare('secret-admin-key', 'secret-admin-key')).toBe(true);
    expect(timingSafeCompare('secret-admin-key', 'wrong-admin-key')).toBe(false);
    expect(timingSafeCompare('short', 'longer-string')).toBe(false);
  });

  it('generates and verifies signed admin session tokens', () => {
    const token = createAdminSessionToken();
    expect(typeof token).toBe('string');
    expect(token).toContain('.');

    // Valid token passes
    expect(verifyAdminSessionToken(token)).toBe(true);

    // Tampered signature fails
    const tampered = token.slice(0, -4) + 'abcd';
    expect(verifyAdminSessionToken(tampered)).toBe(false);

    // Corrupted format fails
    expect(verifyAdminSessionToken('invalid-token')).toBe(false);
  });
});

describe('Security: Rate Limiting & Sliding Window Token Bucket', () => {
  it('allows requests within threshold and blocks excess calls', () => {
    const testId = `test-client-${Date.now()}`;
    const limit = 3;

    expect(checkRateLimit(testId, limit, 10000).allowed).toBe(true);
    expect(checkRateLimit(testId, limit, 10000).allowed).toBe(true);
    expect(checkRateLimit(testId, limit, 10000).allowed).toBe(true);

    const blocked = checkRateLimit(testId, limit, 10000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetInSeconds).toBeGreaterThan(0);
  });
});

describe('Security: CSRF Origin Verification', () => {
  it('permits localhost requests in local development', () => {
    const req = new Request('http://localhost:3000/api/profile/update', {
      headers: {
        host: 'localhost:3000',
        origin: 'http://localhost:3000',
      },
    });
    expect(verifyCsrfOrigin(req)).toBe(true);
  });

  it('rejects cross-site requests with foreign origins', () => {
    const req = new Request('https://stackup-zeta.vercel.app/api/profile/update', {
      headers: {
        host: 'stackup-zeta.vercel.app',
        origin: 'https://evil-attacker.com',
      },
    });
    expect(verifyCsrfOrigin(req)).toBe(false);
  });
});

describe('Security: Email Masking & PII Protection', () => {
  it('masks standard email addresses to protect administrator and student PII', () => {
    const masked = maskEmail('shobhitagrawal2004@gmail.com');
    expect(masked).toBe('s••••••••••4@gmail.com');
    expect(masked).not.toContain('shobhit');
    expect(masked).not.toContain('agrawal');
    expect(masked).not.toContain('2004');
    expect(masked).toContain('@gmail.com');
  });

  it('safely masks short email prefixes without exposing identity', () => {
    expect(maskEmail('ab@gmail.com')).toBe('a••••@gmail.com');
    expect(maskEmail('a@domain.org')).toBe('a••••@domain.org');
  });

  it('handles invalid or non-string inputs safely without crashing', () => {
    expect(maskEmail('')).toBe('••••••');
    expect(maskEmail('not-an-email')).toBe('••••••');
    expect(maskEmail(null)).toBe('••••••');
    expect(maskEmail(undefined)).toBe('••••••');
  });
});

describe('Security: Open Redirect Defense & Target Path Validation', () => {
  it('allows valid internal application paths', () => {
    expect(sanitizeRedirectPath('/profile')).toBe('/profile');
    expect(sanitizeRedirectPath('/dsa')).toBe('/dsa');
    expect(sanitizeRedirectPath('/resume-checker')).toBe('/resume-checker');
    expect(sanitizeRedirectPath('/admin')).toBe('/admin');
  });

  it('preserves query parameters and hash fragments for valid internal routes', () => {
    expect(sanitizeRedirectPath('/dsa?topic=array#solution')).toBe('/dsa?topic=array#solution');
    expect(sanitizeRedirectPath('/profile?tab=quizzes')).toBe('/profile?tab=quizzes');
  });

  it('blocks protocol-relative URLs (//attacker.com)', () => {
    expect(sanitizeRedirectPath('//attacker.com')).toBe('/profile');
    expect(sanitizeRedirectPath('//attacker.com/evil')).toBe('/profile');
    expect(sanitizeRedirectPath('//google.com')).toBe('/profile');
  });

  it('blocks backslash traversal and evasion tricks (/\\attacker.com, \\evil.com)', () => {
    expect(sanitizeRedirectPath('/\\attacker.com')).toBe('/profile');
    expect(sanitizeRedirectPath('\\attacker.com')).toBe('/profile');
    expect(sanitizeRedirectPath('/evil\\page')).toBe('/profile');
  });

  it('blocks absolute external URLs and non-http schemes', () => {
    expect(sanitizeRedirectPath('https://evil.com')).toBe('/profile');
    expect(sanitizeRedirectPath('http://malicious.org/phish')).toBe('/profile');
    expect(sanitizeRedirectPath('javascript:alert(1)')).toBe('/profile');
    expect(sanitizeRedirectPath('data:text/html,<script>alert(1)</script>')).toBe('/profile');
  });

  it('blocks CRLF and newline characters in redirect targets', () => {
    expect(sanitizeRedirectPath('/profile\r\nSet-Cookie:session=evil')).toBe('/profile');
    expect(sanitizeRedirectPath('/profile\nLocation:https://evil.com')).toBe('/profile');
  });

  it('falls back to custom fallback path when provided', () => {
    expect(sanitizeRedirectPath('https://evil.com', '/dsa')).toBe('/dsa');
    expect(sanitizeRedirectPath(null, '/login')).toBe('/login');
    expect(sanitizeRedirectPath(undefined, '/aptitude')).toBe('/aptitude');
    expect(sanitizeRedirectPath('', '/core-cs')).toBe('/core-cs');
  });
});

describe('Security: Client IP & Rate Limit Key Sanitization', () => {
  it('allows valid IPv4 and IPv6 addresses', () => {
    expect(sanitizeIp('192.168.1.1')).toBe('192.168.1.1');
    expect(sanitizeIp('10.0.0.254')).toBe('10.0.0.254');
    expect(sanitizeIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    expect(sanitizeIp('::1')).toBe('::1');
  });

  it('strips illegal characters and control sequences from IP headers', () => {
    expect(sanitizeIp('192.168.1.1\r\nX-Bad-Header:evil')).toBe('192.168.1.1');
    expect(sanitizeIp('192.168.1.1<script>')).toBe('127.0.0.1');
    expect(sanitizeIp('client-ip; rm -rf /')).toBe('127.0.0.1');
  });

  it('enforces maximum character length of 45 characters', () => {
    const longString = '192.168.1.1.' + '1'.repeat(100);
    const cleaned = sanitizeIp(longString);
    expect(cleaned.length).toBeLessThanOrEqual(45);
  });

  it('falls back to localhost when input is empty or invalid', () => {
    expect(sanitizeIp('')).toBe('127.0.0.1');
    expect(sanitizeIp('???$$$%%%')).toBe('127.0.0.1');
  });
});


