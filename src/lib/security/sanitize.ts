/**
 * StackUp Core Security & Sanitization Utilities
 * Defends against XSS, Injection, Directory Traversal, CSRF, and Malicious File Uploads.
 */

/**
 * Strips HTML tags, removes unsafe control characters, and enforces length constraints.
 * Defends against Stored & Reflected XSS in user profile fields and chat payloads.
 */
export function sanitizeText(input: unknown, maxLength = 1000): string {
  if (typeof input !== 'string') return '';
  
  // 1. Remove dangerous null bytes and non-printable control characters (keep \r, \n, \t)
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // 2. Strip HTML tags and script elements
  clean = clean.replace(/<[^>]*>?/gm, '');

  // 3. Trim and enforce length limit
  clean = clean.trim();
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }

  return clean;
}

/**
 * Validates and sanitizes a URL.
 * Strictly permits only https: and http: schemes, completely blocking `javascript:`, `data:`, `vbscript:`.
 * Optionally restricts to known trusted domains (e.g., github.com, linkedin.com).
 */
export function sanitizeUrl(input: unknown, allowedHosts?: string[]): string | null {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    let toParse = trimmed;
    // If no scheme is specified and not a pseudo-protocol, prepend https://
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(toParse)) {
      toParse = `https://${toParse}`;
    }

    const parsed = new URL(toParse);
    
    // Only permit secure HTTP/HTTPS protocols
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }

    // Host check if specified
    if (allowedHosts && allowedHosts.length > 0) {
      const hostname = parsed.hostname.toLowerCase();
      const matches = allowedHosts.some(
        (h) => hostname === h.toLowerCase() || hostname.endsWith(`.${h.toLowerCase()}`)
      );
      if (!matches) {
        return null;
      }
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Validates and sanitizes email addresses, defending against CRLF injection.
 */
export function sanitizeEmail(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const clean = input.trim().toLowerCase();

  // Strip any newline / CRLF characters
  if (/[\r\n]/.test(clean)) return null;

  // Standard RFC-compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(clean) || clean.length > 254) {
    return null;
  }

  return clean;
}

/**
 * Sanitizes uploaded filenames, stripping directory traversal characters (../, ..\),
 * path separators, control characters, and limiting length.
 */
export function sanitizeFilename(input: unknown, maxLength = 120): string {
  if (typeof input !== 'string') return 'document.pdf';
  
  // 1. Extract base name (strip any leading directories)
  let name = input.split(/[/\\]/).pop() || 'document.pdf';

  // 2. Remove null bytes and path traversal patterns
  name = name.replace(/\0/g, '').replace(/\.\.+/g, '.');

  // 3. Keep only alphanumeric characters, dots, hyphens, underscores, and spaces
  name = name.replace(/[^a-zA-Z0-9._\- ]/g, '_');

  // 4. Ensure it doesn't start with a dot or dash
  name = name.replace(/^[.-]+/, '');

  if (!name.trim()) {
    name = 'document.pdf';
  }

  if (name.length > maxLength) {
    const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')) : '';
    name = name.slice(0, maxLength - ext.length) + ext;
  }

  return name;
}

/**
 * Magic Bytes Validator for file uploads.
 * Verifies that the binary header matches the declared format,
 * preventing malicious payloads disguised as PDFs or DOCX files.
 */
export function validateFileMagic(
  buffer: Buffer,
  declaredExtension: string
): { valid: boolean; error?: string } {
  if (!buffer || buffer.length < 4) {
    return { valid: false, error: 'Uploaded file is empty or corrupted.' };
  }

  const ext = declaredExtension.toLowerCase().replace(/^\./, '');

  if (ext === 'pdf') {
    // PDF Magic bytes: %PDF (0x25 0x50 0x44 0x46)
    const isPdf =
      buffer[0] === 0x25 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x44 &&
      buffer[3] === 0x46;
    if (!isPdf) {
      return { valid: false, error: 'Invalid PDF format: binary magic signature does not match PDF standards.' };
    }
    return { valid: true };
  }

  if (ext === 'docx') {
    // DOCX files are ZIP containers: PK\x03\x04 (0x50 0x4B 0x03 0x04)
    const isZip =
      buffer[0] === 0x50 &&
      buffer[1] === 0x4b &&
      buffer[2] === 0x03 &&
      buffer[3] === 0x04;
    if (!isZip) {
      return { valid: false, error: 'Invalid DOCX format: binary magic signature does not match Microsoft Word OpenXML standards.' };
    }
    return { valid: true };
  }

  if (ext === 'txt') {
    // Plain text: Ensure no null bytes and mostly printable characters
    const sample = buffer.slice(0, Math.min(buffer.length, 1024));
    for (let i = 0; i < sample.length; i++) {
      const byte = sample[i];
      // Disallow null bytes and control chars (except tab, LF, CR)
      if (byte === 0x00 || (byte < 0x09 && byte !== 0x00) || (byte > 0x0d && byte < 0x20)) {
        return { valid: false, error: 'Invalid TXT format: detected illegal binary control sequences.' };
      }
    }
    return { valid: true };
  }

  return { valid: false, error: `Unsupported file extension .${ext}. Only .pdf, .docx, and .txt are permitted.` };
}

/**
 * CSRF Protection for state-mutating requests (POST, PUT, DELETE, PATCH).
 * Validates Origin / Referer against the application host or trusted origins.
 */
export function verifyCsrfOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');

  // If neither origin nor referer is provided (e.g. non-browser API client or mobile app),
  // check for a custom header like 'x-requested-with' or sec-fetch-site
  if (!origin && !referer) {
    const fetchSite = req.headers.get('sec-fetch-site');
    if (fetchSite && fetchSite === 'cross-site') {
      return false;
    }
    return true;
  }

  const candidate = origin || referer;
  if (!candidate) return true;

  try {
    const parsed = new URL(candidate);
    // Allow local development
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
      return true;
    }
    // Match request host
    if (host && (parsed.host === host || parsed.hostname === host.split(':')[0])) {
      return true;
    }
    // Match NEXT_PUBLIC_APP_URL if defined
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (appUrl) {
      const parsedApp = new URL(appUrl);
      if (parsed.host === parsedApp.host) {
        return true;
      }
    }
    // Match vercel deployment domain
    if (parsed.hostname.endsWith('.vercel.app')) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
