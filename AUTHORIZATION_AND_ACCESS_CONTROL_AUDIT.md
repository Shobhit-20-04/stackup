# StackUp — Authorization, Access Control & BOLA/IDOR Audit

**Audit Date:** October 23, 2026  
**Auditor:** Principal Application Security Engineer  
**Classification:** Zero-Trust Access Control Assessment  
**Standards:** OWASP Top 10 API Security (API1: BOLA, API5: BFLA), NIST SP 800-63B  

---

## 1. Executive Summary

A comprehensive access control audit of all public, authenticated student, and administrative endpoints was conducted.

**Key Remediation:**
1. **Broken Function Level Authorization (BFLA) Remediated:** In `POST /api/auth/session/create`, unauthenticated clients previously could request `role: 'admin'`. The endpoint was hardened to strictly enforce `verifyAdminRequest(req)`, returning `403 Forbidden` (`FORBIDDEN_PRIVILEGE_ESCALATION`) if an unauthorized client attempts to request an administrator session.
2. **Broken Object Level Authorization (BOLA/IDOR) Defense:** All student endpoints (`/api/profile/update`, `/api/curriculum/record-attempt`, `/api/resume-analysis`) resolve the authenticated caller server-side via Supabase auth cookies and cryptographically signed session tokens. Attempting to supply another student's `userId` results in an immediate `403 Forbidden` rejection.
3. **Admin Privilege Isolation:** Admin endpoints (`/api/admin/*`, `/api/config/*`) require cryptographic `stackup_admin_session` cookies or salted scrypt passkeys. Student accounts cannot query or mutate administrative data.

---

## 2. Endpoint Authorization Matrix

| Endpoint | Method | Required Role | Auth Mechanism | IDOR / Object Scope Protection | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/auth/session/status` | GET | Anonymous / Any | Cookie inspection | Read-only inspection of own session token. | **PASS** |
| `/api/auth/session/create` | POST | Student or Admin | Server-side validation | `role: 'admin'` strictly requires `verifyAdminRequest(req)`. Otherwise rejected with 403. | **HARDENED** |
| `/api/auth/session/heartbeat` | POST | Authenticated | Signed session cookie | Extends caller's own session within absolute lifetime. | **PASS** |
| `/api/auth/session/logout` | POST | Authenticated | Signed session cookie | Revokes caller's own session ID in revocation registry. | **PASS** |
| `/api/profile/update` | POST | Authenticated Student | Supabase Auth + Session | Rejects requests where `user.id !== explicitUserId` with 403 Forbidden. | **PASS** |
| `/api/curriculum/record-attempt` | POST | Authenticated Student | Supabase Auth + Session | Enforces `user.id === explicitUserId`. Blocks unauthorized score writes. | **PASS** |
| `/api/resume-analysis` | POST | Authenticated Student | Supabase Auth / Local Auth | Binds analysis to authentic caller email and ID. | **PASS** |
| `/api/admin/data` | GET/POST/DEL | Verified Administrator | `verifyAdminRequest` | Signed admin session cookie; rejects students with 401. | **PASS** |
| `/api/admin/export-resumes` | GET | Verified Administrator | `verifyAdminRequest` | Restricted to verified admin. Formula injection mitigated. | **PASS** |
| `/api/admin/resume-download` | GET | Verified Administrator | `verifyAdminRequest` | UUID parameter validated; requires admin session. | **PASS** |
| `/api/admin/reprocess` | POST | Verified Administrator | `verifyAdminRequest` | Admin authorization verified before re-parsing document. | **PASS** |
| `/api/config/credentials` | GET | Anonymous / Admin | Rate-limited booleans | Returns booleans only; POST requires admin auth. | **PASS** |
| `/api/config/execute-migration` | POST | Verified Administrator | `verifyAdminRequest` | Rejects non-admin execution attempts with 401. | **PASS** |

---

## 3. Privilege Escalation Defense Verification

### The Vulnerability
In `src/app/api/auth/session/create/route.ts`:
```typescript
// Vulnerable legacy code:
const cleanRole = role === 'admin' ? 'admin' : 'student';
```
An unauthenticated attacker could forge a POST request:
```json
{
  "userId": "attacker-id",
  "email": "attacker@evil.com",
  "role": "admin"
}
```
resulting in the server issuing a cryptographically signed session cookie with `role: 'admin'`.

### The Remediation
```typescript
// Hardened implementation:
let cleanRole: 'student' | 'admin' = 'student';
if (role === 'admin') {
  const isAuthorizedAdmin = verifyAdminRequest(req);
  if (!isAuthorizedAdmin) {
    return NextResponse.json(
      {
        error: 'Forbidden: Administrator authorization required to create an admin session.',
        code: 'FORBIDDEN_PRIVILEGE_ESCALATION',
      },
      { status: 403 }
    );
  }
  cleanRole = 'admin';
}
```

### Automated Test Verification
```typescript
it('blocks unauthenticated requests from issuing admin session tokens via /api/auth/session/create', async () => {
  const { POST } = await import('@/app/api/auth/session/create/route');
  const req = new NextRequest('http://localhost:3000/api/auth/session/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', host: 'localhost:3000' },
    body: JSON.stringify({ userId: 'attacker-1', role: 'admin' }),
  });
  const res = await POST(req);
  expect(res.status).toBe(403);
  const json = await res.json();
  expect(json.code).toBe('FORBIDDEN_PRIVILEGE_ESCALATION');
});
```
**Outcome:** Verified passing in `tests/security.test.ts`.

---

## 4. Broken Object Level Authorization (BOLA/IDOR) Audit

### Profile Updates (`/api/profile/update`)
1. Resolves caller identity from `supabase.auth.getUser()`.
2. Inspects request payload for `userId`.
3. If `user.id !== explicitUserId`, immediately aborts:
   ```typescript
   if (user && explicitUserId && user.id !== explicitUserId) {
     return NextResponse.json(
       { error: 'Forbidden: You are not authorized to update another user’s profile.' },
       { status: 403 }
     );
   }
   ```
4. Executes update parameterized against `eq('id', user.id)` ensuring SQL query cannot target another user's record.

### Quiz Attempts (`/api/curriculum/record-attempt`)
1. Validates `user && explicitUserId && user.id !== explicitUserId` -> returns `403 Forbidden`.
2. Uses `auth.uid()` in database RLS policies.
3. Validates score bounds: `score < 0 || score > total` returns `400 Bad Request`.

---

## 5. Row-Level Security (RLS) Policy Audit

The Supabase PostgreSQL migration (`20261014000000_security_hardening.sql`) defines explicit, restrictive policies:

| Table | Policy Name | Command | Target Role | Expression |
| :--- | :--- | :--- | :--- | :--- |
| `public.profiles` | Authenticated users can view public profiles | SELECT | `authenticated` | `true` (Enables leaderboard & peer profile views) |
| `public.profiles` | Users can update their own profile | UPDATE | `authenticated` | `auth.uid() = id` (Strict ownership check) |
| `public.uploaded_resumes` | Users can only view their own uploaded resumes | SELECT | `authenticated` | `auth.uid() = user_id` |
| `public.uploaded_resumes` | Users can only delete their own uploaded resumes | DELETE | `authenticated` | `auth.uid() = user_id` |
| `public.user_login_logs` | Users can select their own login logs | SELECT | `authenticated` | `auth.uid()::text = user_id` |

*Note on Administrator RLS Access:* The administrative backend utilizes Supabase `service_role` keys through server-side clients (`createSupabaseAdmin`), bypassing RLS on authorized administrative queries while keeping anon/authenticated clients strictly bounded.
