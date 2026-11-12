# StackUp Administrator Requirements & Gap Audit

## 1. Executive Summary

This audit assesses the complete administrative surface of the **StackUp** platform. It documents previous requirements, historical defects, discovered architectural gaps, and the verification status following the comprehensive overhaul of administrative authentication, credential security, session management, and UI interactions.

---

## 2. Inventory of Historical Admin Requirements & Current Status

| Requirement ID | Requirement Scope | Historical Status | Post-Overhaul Status | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-ADM-01** | **Admin Password Update**<br>Transition to newly specified credential with NIST-compliant salted scrypt hashing. | **Defective**<br>Legacy hardcoded plaintext passcode (`stack2004up`) existed in code. | **Resolved**<br>Scrypt salted hash implemented (`scrypt:<salt>:<derivedKey>`). Zero plaintext in code or git. | `tests/admin.test.ts` (Tests 1–4) & Node scrypt validation |
| **REQ-ADM-02** | **Consolidation of Admin Screens**<br>Single canonical admin portal entry point. | **Fragmented**<br>Multiple legacy entrypoints (`/admin`, `/admin/login`, `/admin-login`). | **Resolved**<br>Single canonical route at `/admin`. HTTP 308 permanent redirects configured in `next.config.ts`. | Route audit & `next.config.ts` redirect inspection |
| **REQ-ADM-03** | **Security Key Validation & Error States**<br>Immediate feedback, no UI freezing or disabling. | **Defective**<br>Generic failures, UI lockup on errors, and timing leak risks. | **Resolved**<br>Granular error messages (`INVALID_CREDENTIALS`, `EMPTY_CREDENTIALS`, `RATE_LIMITED`), timing-safe verification, active attempt counters. | Unit tests & `/api/admin/auth` POST validation |
| **REQ-ADM-04** | **Restricted Admin Recovery**<br>Strictly restricted to `shobhitagrawal2004@gmail.com`. | **Partial**<br>Supabase email reset lacked non-configured fallback clarity; false success messages returned. | **Resolved**<br>Strict email verification, 6-digit cryptographic OTP (15m TTL), single-use consumption, 5-attempt lockout, and honest email status reporting. | `tests/admin.test.ts` (Tests 9–13) |
| **REQ-ADM-05** | **Session Invalidation on Password Change**<br>Password update must revoke all active sessions. | **Missing**<br>Changing keys did not invalidate existing tokens. | **Resolved**<br>Admin session HMAC tokens are signed with the active password hash. Updating the password revokes all active tokens immediately. | `tests/admin.test.ts` (Test 8) |
| **REQ-ADM-06** | **Session Timeout Policy Alignment**<br>30-min inactivity, 2-min warning, 24-hr max lifetime. | **Incomplete**<br>`SessionTimeoutManager` only checked client student auth; admins on `/admin` bypassed client timer. | **Resolved**<br>`SessionTimeoutManager` checks `/api/auth/session/status` for both student and admin roles; logs out and redirects to `/admin?reason=inactivity`. | `src/components/SessionTimeoutManager.tsx` & Vitest suite |
| **REQ-ADM-07** | **Interactive Element & Action Integrity**<br>Audit all buttons, links, search filters, modals, and tables. | **Untested**<br>No dedicated test suite for administrative operations. | **Resolved**<br>Every interactive control audited, keyboard traps eliminated, aria-labels verified, and full test suite authored. | `ADMIN_INTERACTION_AUDIT.md` & `tests/admin.test.ts` |

---

## 3. Discovered Architectural Gaps & Root Cause Analysis

### 3.1. Duplicate Authentication Pages
- **Finding:** Historical references pointed to `/admin-login` and `/admin/login`.
- **Root Cause:** Early prototypes had separate routes for password entry and emergency access before unified dashboard components were merged into `/admin`.
- **Remediation:** 
  1. `next.config.ts` enforces 308 permanent redirects from `/admin/login` and `/admin-login` to `/admin`.
  2. Mobile and desktop navigation bars now point exclusively to `/admin`.
  3. Single component at `src/app/admin/page.tsx` manages all three views: `login`, `reset-request`, and `reset-verify`.

### 3.2. Plaintext Password vs. Salted Cryptographic Hashing
- **Finding:** `admin-auth.ts` previously had `process.env.ADMIN_PASSCODE || 'stack2004up'`, comparing candidates via raw string matching.
- **Root Cause:** Initial rapid prototyping bypassed NIST SP 800-63B password storage standards.
- **Remediation:**
  1. Upgraded to **scrypt** key derivation (`N=16384`, `r=8`, `p=1`, 64-byte key length) with a 16-byte cryptographically secure random salt (`crypto.randomBytes(16)`).
  2. Built `verifyAdminPassword` to support both `scrypt:<salt>:<hex>` and fallback legacy strings using constant-time comparison (`crypto.timingSafeEqual`).
  3. Stored salted scrypt hash in `.env.local` and `DEFAULT_ADMIN_PASSWORD_HASH`.

### 3.3. False Email Dispatch Messaging
- **Finding:** The reset request route previously returned a generic message stating "instructions have been dispatched" even when `SUPABASE_SERVICE_ROLE_KEY` was a placeholder or offline.
- **Root Cause:** A naive implementation intended to mitigate account enumeration inadvertently deceived administrators in environments without SMTP/Supabase mail routing.
- **Remediation:**
  1. For unrecognized emails, generic responses continue to mitigate account enumeration.
  2. For the verified administrator account (`shobhitagrawal2004@gmail.com`), the API explicitly checks `emailDispatched`.
  3. If email delivery is not configured, the API and UI explicitly report:
     > *"Recovery code generated for s\*\*\*4@gmail.com. Note: Outbound SMTP email service is currently unconfigured in this environment. Please enter your administrator verification code directly to proceed."*
  4. Never misleads the user with phantom email claims.

### 3.4. Session Synchronization on the Admin Portal
- **Finding:** `SessionTimeoutManager.tsx` previously returned early when `getCurrentUser()` returned `null` (which occurred when an administrator authenticated solely via security key without a student Supabase account).
- **Root Cause:** Separation between Supabase student sessions and admin session cookies.
- **Remediation:**
  1. `POST /api/admin/auth` issues both the dedicated `stackup_admin_session` cookie AND the standard `stackup_session` token with `role: 'admin'`.
  2. `SessionTimeoutManager` polls `/api/auth/session/status`, detects active admin sessions, and enforces the 30-minute inactivity limit and 2-minute countdown modal.
  3. When an admin session expires or times out, it revokes the admin session (`DELETE /api/admin/auth`) and redirects the user to `/admin?reason=inactivity`.

---

## 4. Verification Matrix

| Area | Test Suite | Result | Details |
| :--- | :--- | :--- | :--- |
| **Scrypt Verification** | `tests/admin.test.ts` | **PASS** | Validates new password against scrypt hash; rejects old passcode. |
| **Session Invalidation** | `tests/admin.test.ts` | **PASS** | Password update revokes existing HMAC signatures immediately. |
| **Email Reset Restriction** | `tests/admin.test.ts` | **PASS** | Rejects unauthorized emails; enforces single-use OTPs and 5-attempt limit. |
| **Server Rate Limiting** | `tests/admin.test.ts` | **PASS** | Blocks brute force on 10th failed attempt with HTTP 429. |
| **Type Integrity** | `tsc --noEmit` | **PASS** | Zero TypeScript compilation warnings or errors. |
| **Production Build** | `next build` | **PASS** | All routes compiled, static and dynamic routes validated. |
