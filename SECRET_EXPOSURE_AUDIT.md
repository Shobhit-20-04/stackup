# StackUp — Secret Exposure & Environment Variable Security Audit

**Audit Date:** October 23, 2026  
**Auditor:** Principal Application Security Engineer  
**Classification:** Internal Security Assessment  
**Scanning Engine:** Git Commit Log Traversal, Regex Pattern Analysis, Lockfile & Artifact Inspection  

---

## 1. Executive Summary

A comprehensive repository and Git history secret scan was conducted across all commits, branches, environment templates, and client-side builds of the StackUp platform.

**Key Findings:**
1. **Zero Confirmed Committed Credentials:** No private keys, database passwords, Anthropic API tokens, or Supabase `service_role` secrets were ever committed to Git history.
2. **Proper Secret Separation:** Server secrets (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD_HASH`, `ANTHROPIC_API_KEY`, `DATABASE_URL`) are isolated to server runtimes and excluded from client-side bundles.
3. **Repository Cleanliness:** `.env.local`, `scratch/`, `node_modules/`, `.next/`, and local persistence files (`data/*.json`) are correctly ignored in `.gitignore`.
4. **Hardcoded Fallback Remediation:** Static fallback secrets in `admin-auth.ts` and `session-manager.ts` were upgraded to dynamic high-entropy ephemeral server keys.

---

## 2. Environment Variables & Credential Classification

| Variable Identifier | Scope | Sensitivity | Intended Exposure | Security Posture & Safeguards |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | Public / Low | Embedded in client JS | Points to public Supabase tenant; restricted by RLS. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client & Server | Public / Low | Embedded in client JS | Public anon key; permits only RLS-authorized queries. |
| `NEXT_PUBLIC_APP_URL` | Client & Server | Public / Low | Embedded in client JS | Base URL for OAuth and CSRF origin verification. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | **Critical / High** | Strictly Server Runtime | Bypasses RLS. Never exposed to browser or frontend bundles. |
| `DATABASE_URL` | Server Only | **Critical / High** | Strictly Server Runtime | Direct Postgres connection string. Used for serverless pooling. |
| `ADMIN_PASSWORD_HASH` | Server Only | **Critical / High** | Strictly Server Runtime | Salted scrypt hash of master admin passcode. Never stored in plaintext. |
| `ADMIN_PASSCODE` | Server Only | **Critical / High** | Strictly Server Runtime | Ephemeral passcode. Automatically converted to scrypt hash in memory. |
| `ADMIN_EMAIL` | Server Only | Medium | Strictly Server Runtime | Verified admin email (`shobhitagrawal2004@gmail.com`). Masked in public UIs. |
| `ANTHROPIC_API_KEY` | Server Only | **Critical / High** | Strictly Server Runtime | Server-to-server AI communication. Never returned to client. |

---

## 3. Git History Deep Scan Results

A full-history commit audit was executed using pattern matching across all historical revisions:

```bash
git log -p --all (Scanned for JWT patterns, API keys, private keys, database connection strings)
```

### Findings Table

| Target Signature / Pattern | Commits Scanned | Matches Found | False Positives / Placeholders | True Secret Leaks |
| :--- | :--- | :--- | :--- | :--- |
| **JWT Tokens (`eyJ...`)** | All commits | 0 | 0 | **0 (None)** |
| **Anthropic Keys (`sk-ant-...`)** | All commits | 1 | 1 (`sk-ant-api03-...` in `.env.example`) | **0 (None)** |
| **Generic API Keys (`sk-...`)** | All commits | 0 | 0 | **0 (None)** |
| **Database URIs (`postgresql://...`)** | All commits | 2 | 2 (`[YOUR-PASSWORD]` placeholder) | **0 (None)** |
| **Private Keys (`BEGIN RSA/EC...`)** | All commits | 0 | 0 | **0 (None)** |
| **GitHub Access Tokens (`ghp_...`)** | All commits | 0 | 0 | **0 (None)** |

### Historical Commit Evidence
- **Commit `d9414a2f`** (*chore: initialize StackUp Next.js app*): Initialized `.env.example` containing only safe placeholder values.
- **Commit `f790a2ad`** (*docs: add comprehensive project documentation*): Documentation update containing placeholder `postgresql://postgres:[PASSWORD]@db...`.
- **Conclusion:** No active or legacy production secrets exist in the Git tree.

---

## 4. Source Code Secret-Hardening Improvements

### A. Dynamic Ephemeral Key Generation
In `src/lib/security/admin-auth.ts` and `src/lib/security/session-manager.ts`, fallback signing secrets were previously static strings (`'stackup-admin-secret-salt-2026'`).
**Hardening Applied:** Replaced static strings with cryptographically random process-lifetime ephemeral keys (`crypto.randomBytes(32).toString('hex')`) when environment variables are not supplied.

### B. Client-Visible Bundle Audit
Inspection of the production Next.js build output confirms:
- No server environment variables are bundled into `.next/static`.
- `productionBrowserSourceMaps` is set to `false` in `next.config.ts`, preventing public extraction of internal comments, endpoints, or variables.
- All administrative endpoints enforce `verifyAdminRequest` server-side.

---

## 5. Secret Rotation & Production Management Guidelines

1. **Deployment Platform:** Production environment variables must be configured directly within the deployment provider (e.g., Vercel Project Settings, AWS Secrets Manager, or Google Cloud Secret Manager).
2. **Filesystem Immutability:** In production, filesystem writes to `.env.local` are automatically disabled (`process.env.ALLOW_RUNTIME_ENV_WRITE !== 'true'`), preventing untrusted runtime writes.
3. **Emergency Secret Rotation Procedure:**
   - If `SUPABASE_SERVICE_ROLE_KEY` is suspected to be exposed, rotate the key in the Supabase Dashboard -> Project Settings -> API -> Service Role Secret.
   - If `ADMIN_PASSCODE` is modified, the server recalculates the salted scrypt hash immediately, invalidating all active admin session tokens because tokens are cryptographically bound to the hash.
