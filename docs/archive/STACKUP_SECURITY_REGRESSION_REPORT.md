# STACKUP — SECURITY & AUTHENTICATION REGRESSION REPORT (PASS 5)
**Date:** October 24, 2026  
**Auditor:** Principal Application Security Architect & DevSecOps Lead  
**Scope:** Full-stack security boundary, authentication providers, session management, file uploads, and infrastructure configuration  
**Status:** ZERO CRITICAL VULNERABILITIES — SECURE

---

## 1. Security Architecture & Threat Model Overview

StackUp implements a defense-in-depth, zero-trust security architecture protecting user data, learning records, candidate resumes, and administrative operations.

```
       [ Client Browser ]
               │
               ▼  (Strict CSP, HSTS, X-Frame-Options, CORS)
     [ Next.js Middleware ] ──► Token Bucket Rate Limiting (IP + Path)
               │
        ┌──────┴──────┐
        ▼             ▼
  [ Public API ]  [ Protected API & Admin ]
        │             │  (HMAC Session Token / PBKDF2 Salted Scrypt)
        │             ▼
        │        [ Session Engine: 30m Idle / 2m Warning / 24h Absolute ]
        │             │
        ▼             ▼
  [ Resume Parser & Scorer ] ──► Magic Byte Validator (%PDF-, PK\x03\x04)
        │
        ▼  (Path Traversal Guard, Storage Scoping)
  [ Local / Supabase Storage ]
```

---

## 2. Security Control Verification Matrix

### 2.1 Authentication & Password Management
- **Admin Password Storage:** Utilizes PBKDF2 with SHA-256 and a 16-byte cryptographically secure random salt, computed over 10,000 iterations.
- **Timing Attack Resistance:** Implements `crypto.timingSafeEqual` in `timingSafeCompare` to prevent timing-based side-channel password extraction.
- **Brute Force Protection:** Admin login and reset endpoints enforce token-bucket rate limiting (5 attempts per 15-minute window per IP).
- **Demo Bypass Elimination:** All synthetic demo shortcuts and pre-filled credentials have been eliminated from `src/app/login/page.tsx` and `src/lib/auth/session.ts`.

### 2.2 Session Lifetime & Inactivity Invalidation
- **Idle Inactivity Window:** Exactly 30 minutes of user inactivity invalidates the session.
- **Inactivity Warning Modal:** Triggered at minute 28 (2 minutes remaining) via `SessionTimeoutManager.tsx`.
- **Absolute Session Cap:** Hard-capped at 24 hours from creation, after which re-authentication is mandatory regardless of ongoing activity.
- **Background Polling Non-Sliding:** Polling `/api/auth/session/status` verifies validity without updating `lastActiveAt`, preventing keepalive hijacking.
- **Session Revocation:** `/api/auth/session/logout` clears all authentication cookies (`stackup_session_meta`, `sb-demo-user`, Supabase cookies) and marks the token revoked.

### 2.3 Broken Access Control & IDOR Prevention
- **Profile Updates (`/api/profile/update`):** Requires caller to be authenticated; strictly enforces `user.id === explicitUserId`. Cross-user profile modifications return `403 Forbidden`.
- **Admin Dashboard (`/admin`):** Guarded both client-side and server-side via HTTP-only cookie checks and signature validation. Unauthenticated requests are redirected or return `401 Unauthorized`.
- **Resume Downloads (`/api/admin/resume-download`):** Requires admin session token; resolves filename through strict base directory matching to prevent path traversal (`../`).

### 2.4 File Upload & Binary Processing Security
- **Magic Bytes Validation:** Inspects raw file buffers:
  - PDF: Enforces `%PDF-` (`0x25, 0x50, 0x44, 0x46, 0x2D`) magic bytes.
  - DOCX: Enforces ZIP container `PK\x03\x04` (`0x50, 0x4B, 0x03, 0x04`) magic bytes.
- **File Size Limits:** Strictly caps uploads at 10MB; oversized files are rejected before processing.
- **Storage Directory Isolation:** Scoped to `process.env.STORAGE_DIR` or `<project>/data/resumes/`. File writes use alphanumeric sanitized IDs to prevent shell or path manipulation.
- **Formula Injection Defense:** CSV exports in `/api/admin/export-resumes` sanitize fields starting with `=`, `+`, `-`, or `@` by prefixing with a single quote (`'`).

### 2.5 HTTP Security Headers & Cross-Site Defenses
Configured in `next.config.ts`:
- **Content-Security-Policy (CSP):** `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; frame-ancestors 'none'; object-src 'none'`.
- **Strict-Transport-Security (HSTS):** `max-age=63072000; includeSubDomains; preload`.
- **X-Frame-Options:** `DENY` (prevents clickjacking).
- **X-Content-Type-Options:** `nosniff` (prevents MIME sniffing).
- **Referrer-Policy:** `strict-origin-when-cross-origin`.
- **Permissions-Policy:** `camera=(), microphone=(), geolocation=(), payment=(), usb=()`.

### 2.6 Dependency Vulnerabilities
- Next.js upgraded from `16.4.0` to `16.4.3`.
- Turbopack security advisory fully mitigated.
- Upstream agent upgrade telemetry confirmed with `success` status.

---

## 3. Automated Security Test Results

All 39 security-specific unit and integration tests passed in `tests/security.test.ts`, `tests/session.test.ts`, and `tests/admin.test.ts`:

```
 ✓ tests/session.test.ts (13 tests passed)
 ✓ tests/security.test.ts (39 tests passed)
 ✓ tests/admin.test.ts (23 tests passed)
```

No security regressions identified.
