# STACKUP — MASTER COMPREHENSIVE ARCHITECTURAL AUDIT
**Date:** October 24, 2026  
**Auditor:** Senior Full-Stack Architect, Security Specialist, and QA Lead  
**Scope:** Complete repository inspection (`D:\stackup`), configuration, dependencies, routes, security, design system, and educational workflows.

---

## 1. Executive Summary

StackUp is a high-performance, full-stack placement preparation portal and career acceleration platform built on **Next.js 16.4.3 (Turbopack)**, **React 19.2.8**, and **Tailwind CSS v4**. It features an interactive Curriculum with 221 deep-dive topics, 668 quiz questions, a 150-problem DSA Hub with full Striver A2Z sheet integration, an ATS resume analyzer with local document parsing, zero-trust session management, and an administrative oversight dashboard.

Following the upgrade to Next.js 16.4.3, this comprehensive audit evaluates all project subsystems across ten structured passes to eliminate demo authentication shortcuts, audit color accessibility to WCAG 2.2 AA standards, verify absolute data preservation, and ensure production readiness.

---

## 2. Technical Stack & Infrastructure Inventory

| Layer | Technology | Version | Purpose / Status |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | `16.4.3` | Upgraded to latest security release; 0 CVEs |
| **Runtime / UI** | React / React DOM | `19.2.8` | React Server Components & Client islands |
| **Styling** | Tailwind CSS / PostCSS | `v4.0.0` | 5-color official brand design system |
| **Language** | TypeScript | `v5.x` | Strict typechecking enabled (`incremental: false`) |
| **Icons** | Lucide React | `^1.47.0` | Semantic SVGs |
| **Document Parsers** | `pdf-parse`, `mammoth` | `2.4.5`, `1.13.0` | Local memory-safe extraction of PDF and DOCX |
| **Database & Auth** | `@supabase/supabase-js`, `@supabase/ssr` | `^2.117.1`, `^0.12.7` | PostgreSQL relational store + OAuth / Email Auth |
| **Test Runner** | Vitest | `^5.0.1` | Unit, integration, security, and curriculum audits |
| **Linter** | ESLint | `^9.x` with `eslint-config-next` | Code quality and React hook rules |

---

## 3. Route & Endpoint Topology

### 3.1 User-Facing Application Pages (17 Routes)
- `/`: Landing page, feature overview, CTA, stats, real-time platform metrics.
- `/login`: Canonical user login & registration form (Email/Password, Supabase OAuth).
- `/dashboard`: Student study plan, recent activity, quiz metrics, ATS resume summary.
- `/profile`: Student profile management (target role, university, graduation year, social links).
- `/dsa`: Comprehensive 150-problem Data Structures & Algorithms Hub with filtering, tags, and search.
- `/dsa/[id]`: Problem detail page with notes, approach, complexity, and submission tracker.
- `/dsa/striver`, `/striver`, `/striver-sheet`: Striver A2Z Sheet curriculum with progress tracking.
- `/aptitude`: Quantitative, Logical, Verbal, and Spatial aptitude modules (26 topics, 81 questions).
- `/core-cs`: 15 Core Computer Science subjects (195 topics, 587 questions) including OS, DBMS, CN, System Design.
- `/resume-checker`: ATS resume uploader with instant client-side parsing, JD matcher, and breakdown.
- `/admin`: Unified administrator gateway and analytics dashboard (protected via PBKDF2 passcode & session cookie).
- `/_not-found`, `/error`: Accessible fallback pages conforming to the 5-color brand theme.
- `/robots.txt`: Search engine crawling definitions.

### 3.2 Backend API Route Handlers (18 Endpoints)
1. `/api/auth/record-login`: Audited login logging endpoint recording timestamps, IP hashes, and auth methods.
2. `/api/auth/session/create`: Issues secure HTTP-only session tokens with 24-hour absolute caps.
3. `/api/auth/session/status`: Validates active session state without sliding inactive timers.
4. `/api/auth/session/heartbeat`: Slides idle timeout only on verified active user interaction.
5. `/api/auth/session/logout`: Immediate session revocation and multi-cookie clearing.
6. `/api/profile/update`: Persists user profile updates with strict payload validation.
7. `/api/curriculum/record-attempt`: Records quiz question submissions, scores, and streak data.
8. `/api/resume-analysis`: Processes uploaded resumes (PDF/DOCX) against target job descriptions.
9. `/api/admin/auth`: Verifies admin passcode via PBKDF2/SHA-256 and issues admin session cookies.
10. `/api/admin/data`: Fetches real uploaded candidate resumes, login audit logs, and platform stats.
11. `/api/admin/export-resumes`: Secure JSON/CSV export of candidate dossiers.
12. `/api/admin/reprocess`: Triggers ATS re-scoring of uploaded candidate resumes.
13. `/api/admin/reset-password/request`: Generates admin password recovery challenges.
14. `/api/admin/reset-password/verify`: Verifies recovery challenges using master security key.
15. `/api/admin/resume-download`: Streams uploaded original resumes with strict path traversal checks.
16. `/api/chat`: AI Assistant proxy streaming responses from Anthropic Claude API.
17. `/api/config/credentials`: Inspects live configuration status of Supabase and Anthropic.
18. `/api/config/execute-migration`: Executes relational database migrations when Supabase is active.

---

## 4. Design System & Theme Tokens

The application strictly implements the official 5-color brand palette:
1. **Deep Teal (`#044E62`)**: Primary brand surfaces, headings, selected states, and brand borders.
2. **Vivid Blue (`#0D08CB`)**: Interactive actions, links, primary buttons, and focus accents.
3. **Earth Brown (`#4A3932`)**: Primary typography on light surfaces, subtle borders, and warm accents.
4. **Pale Lavender (`#E9DEFA`)**: Secondary backgrounds, information panels, and learning cards.
5. **Soft Pink (`#FACAE7`)**: Selective highlight badges, tags, and secondary accents.

Supported Theme Modes:
- **Cosmic Dark** (`data-theme="cosmic"`, default): Deep midnight navy surfaces (`#0b1020`, `#151d35`) with high-contrast text (`#e8eeff`, `#9ab3d5`).
- **Lavender Light** (`data-theme="lavender"`): Warm light lavender backgrounds (`#F7F3FC`, `#ffffff`) with Earth Brown text (`#4A3932`, contrast 8.49:1).
- **Obsidian Noir** (`data-theme="obsidian"`): Deep warm brown charcoal surfaces (`#171210`, `#251c18`) with soft cream text (`#F8F3F0`, contrast 12.8:1).

---

## 5. Security & Session Integrity Audit

1. **Session Timeout Architecture**:
   - Idle Inactivity Window: **30 minutes**.
   - Warning Prompt: **2 minutes before expiration** (at minute 28 of inactivity).
   - Absolute Lifetime Cap: **24 hours maximum duration**.
   - Zero-Sliding Background Polling: Polling endpoints (`/api/auth/session/status`) do not extend idle sessions.
2. **Admin Gateway**:
   - Authentication via PBKDF2 with SHA-256 (10,000 iterations) and cryptographically random salt.
   - Brute-force protection: Rate-limited to 5 attempts per 15-minute window.
   - Master security key recovery with dual-token verification.
3. **Resume Storage & ATS Processing**:
   - Upload validation: Verifies magic bytes (`%PDF-` for PDF, `PK\x03\x04` for DOCX) preventing file spoofing.
   - Directory isolation: Strictly scopes file operations to `process.env.STORAGE_DIR` or `<project>/data/resumes`.
   - Zero Synthetic Data: Filters and purges test/mock candidate records from admin views (`isTestOrDemoRecord`).

---

## 6. Audit Findings & Action Plan

| ID | Category | Severity | Finding | Remediation |
| :--- | :--- | :--- | :--- | :--- |
| **F-01** | Authentication | High | "Quick Demo Session (Alex Rivera)" button on `/login` permits 1-click synthetic login | Remove demo login button and `handleInstantDemoLogin` completely |
| **F-02** | UI Terminology | Low | `CredentialsModal.tsx` refers to offline mode as "Demo Mode" | Update terminology to "Local Storage Mode" |
| **F-03** | Color Contrast | Medium | Potential low-contrast pairings on translucent backgrounds | Verify all combinations with relative luminance formula; enforce WCAG 2.2 AA (4.5:1 / 3:1) |
| **F-04** | Code Cleanup | Low | 36 ESLint non-blocking warnings (unused imports, unused catch variables) | Clean up unused declarations across codebase to achieve 0 warnings |
| **F-05** | Build Stability | Low | Turbopack dynamic filesystem access warning in `resume-repository.ts` | Add `turbopackIgnore: true` comment to `fs.existsSync` |

---
*Proceeding to Pass 2 (Color & Contrast Audit) and Pass 3 (Demo Login Removal).*
