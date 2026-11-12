# Security Policy

StackUp takes platform security, user data confidentiality, and sandboxed code execution integrity very seriously.

---

## 1. Supported Versions

| Version | Supported | Notes |
|:---|:---:|:---|
| Current (`main` / `dev`) | :white_check_mark: | Actively audited and maintained |
| Legacy tags | :x: | Upgrade to latest release |

---

## 2. Reporting a Vulnerability

If you discover a security vulnerability, **please do not disclose it publicly in issues or pull requests.**

Instead, please send a responsible disclosure report directly to the security team at:
- **Email:** `security@stackup.xyz` (or create a private GitHub Security Advisory)

Please include:
1. Type of vulnerability (e.g., Auth bypass, IDOR, SSRF, Injection).
2. Affected route or component.
3. Proof-of-concept steps to reproduce.
4. Estimated impact and risk.

We will acknowledge receipt within 24 hours, confirm the finding, and coordinate a patch and release promptly.

---

## 3. Security Design Principles

- **Zero-Trust Server Authorization:** Client headers (`x-user-id`) are never trusted. All user operations validate cryptographically signed session cookies on the server.
- **Sandboxed Execution:** Student code submitted to the judge is never executed in the application server runtime; it is dispatched to an isolated container sandbox. Prohibited system calls are rejected statically.
- **Secret Hygiene:** API keys and credentials are strictly injected via server environment variables. Commits are scanned automatically using `scripts/security-audit-scan.mjs`.
- **Rate Limiting:** Sliding-window rate limiters protect all authentication, chat, and execution endpoints against brute-force and denial-of-service attempts.
