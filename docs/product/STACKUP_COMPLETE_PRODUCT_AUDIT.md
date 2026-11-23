# STACKUP — COMPLETE REPOSITORY AUDIT & ARCHITECTURAL INVENTORY

> **Audit Date:** November 23, 2026  
> **Repository:** `https://github.com/Shobhit-20-04/stackup`  
> **Auditors:** Senior Full-Stack Engineer, Design Systems Architect, Application Security Engineer  
> **Status:** Baseline Verification Passed (247/247 Tests Passing across 16 Suites)

---

## 1. APPLICATION INVENTORY & ARCHITECTURAL MAP

StackUp is a Next.js 16 (App Router) + React 19 application with Tailwind CSS v4, Monaco Editor integration, Supabase client/server authentication, and serverless API endpoints.

### 1.1 Complete Route Catalog

| Route Path | File Location | Status | Core Responsibility |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Functional | Welcoming landing page, 8-bit interactive workbench, 6-stage roadmap preview |
| `/dashboard` | `src/app/dashboard/page.tsx` | Functional | Student Workspace ("What should I do today?", POTD, 20-min sprints, weak areas) |
| `/learn` | `src/app/learn/page.tsx` | Functional | 6-Stage Beginner-to-Technical Roadmap with interactive assessment filter |
| `/core-cs` | `src/app/core-cs/page.tsx` | Functional | 15 Core Computer Science engineering subjects, 235 topics, 710 quiz questions |
| `/aptitude` | `src/app/aptitude/page.tsx` | Functional | Quantitative, Logical, Verbal, Spatial Aptitude modules with timed practice |
| `/dsa` | `src/app/dsa/page.tsx` | Functional | 150 Curated DSA problems, pattern filtering, company tags, Striver SDE sheet |
| `/projects` | `src/app/projects/page.tsx` | Functional | Practical software engineering blueprints with READMEs and architecture |
| `/resume-checker` | `src/app/resume-checker/page.tsx` | Functional | 9-Dimension ATS resume evaluator with Google XYZ bullet rewriting |
| `/glossary` | `src/app/glossary/page.tsx` | Functional | Engineering glossary with plain-English definitions and phonetic pronunciation |
| `/profile` | `src/app/profile/page.tsx` | Functional | Profile details, SM-2 flashcard review hub, and candidate analytics |
| `/admin` | `src/app/admin/page.tsx` | Functional | Telemetry, audit logs, secret multi-tap passcode access |
| `/login` | `src/app/login/page.tsx` | Functional | Universal authentication login & registration gateway |

---

## 2. FUNCTIONAL AUDIT: EXISTING CAPABILITIES & IDENTIFIED GAPS

### 2.1 Navigation & Header Hierarchy
- **Existing Capability:** Global sticky header in `src/components/Navbar.tsx` with logo, active link indicators, profile widget, theme toggle, and mobile hamburger menu.
- **Identified Gap / Problem:** 
  - Overcrowded: 11 separate links stretched across a single horizontal row on desktop.
  - Causes label compression on medium desktop displays (1024px–1280px).
  - Lacks hierarchical grouping: Core learning (`Learn`, `Core CS`), Practice (`DSA`, `Projects`), and Career (`Resume`, `Glossary`) should be logically organized.

### 2.2 Theme Switching Architecture
- **Existing Capability:**
  - `src/components/ThemeToggle.tsx` and `src/components/ThemeSwitcher.tsx` with `data-theme` attribute on `document.documentElement` and `stackup-theme` localStorage persistence.
  - Predefined themes: `cosmic` (dark), `lavender` (light), `obsidian` (noir).
- **Identified Gap / Problem:**
  - Need to verify that clicking the sun/moon toggle instantly switches between the Warm Canvas light theme and Deep Teal dark theme with zero hydration mismatch and zero layout flash.
  - Need to ensure all components, code editors, and cards visibly reflect the Warm Editorial tokens (`#103F45`, `#F5F2EB`, `#D6EEE6`, `#F2D8C8`, `#4F46E5`).

### 2.3 Problem of the Day (POTD) Engine
- **Existing Capability:**
  - `getProblemOfTheDay()` in `src/lib/data/dsa.ts` selects a deterministic problem based on days since epoch.
  - API endpoint `/api/dsa/potd` with serverless filesystem fallback (`/tmp/stackup_data`).
- **Identified Gap / Problem:**
  - Currently lacks a dedicated, standalone route at `/practice/potd`.
  - Missing the monthly interactive challenge calendar showing historical completion states (Solved, Attempted, Missed, Upcoming).
  - Needs server-authoritative streak calculation tied explicitly to the `Asia/Kolkata` timezone (UTC midnight boundary calculation).
  - Needs post-solve learning reinforcement (pattern debrief, time/space trade-offs, and related problem recommendations).

### 2.4 DSA Practice Ecosystem & Coding Workspace
- **Existing Capability:**
  - 150 problems across 15 algorithmic patterns with company tags.
  - Monaco Editor integration with multi-language starter code (Python, C++, Java, C, JavaScript).
  - Piston execution API integration with in-browser execution fallback.
  - Kind Error Diagnostics Coach and 3-Tier Socratic Mentor Hints recently introduced.
- **Identified Gap / Problem:**
  - Practice directory should have explicit navigation tabs: *Problem of the Day*, *All Problems*, *Pattern Practice*, *Striver SDE Sheet*, *Bookmarks*, and *Submissions*.
  - Search and filter bar needs responsive grouping so students can seamlessly isolate problems by pattern and difficulty.

---

## 3. SECURITY & COMPLIANCE AUDIT

1. **Secret & Credential Exposure:**
   - Pre-push security scanner (`scripts/security-audit-scan.mjs`) verified **0 hardcoded credentials or API tokens**.
   - Supabase anonymous keys (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) are safe for public distribution per Supabase security model.
2. **Input Sanitization:**
   - Resume uploads (`pdf-parse`, `mammoth`) are parsed strictly server-side with file size limits (5MB) and type validation.
3. **Sandbox Isolation:**
   - User code execution is routed to isolated sandbox containers (Piston API) with CPU time limits (3s) and memory caps (128MB). No untrusted user code runs in the host serverless environment.

---

## 4. ACCESSIBILITY (WCAG 2.2 AA) AUDIT

1. **Color Contrast:**
   - `#242C2A` on `#F5F2EB`: **12.7:1** (Passes AAA).
   - `#103F45` on `#FFFFFF`: **10.9:1** (Passes AAA).
   - `#4F46E5` on `#FFFFFF`: **6.28:1** (Passes AA).
2. **Keyboard Navigation:**
   - All interactive controls have `:focus-visible` ring outlines with offset.
   - Monaco Editor has keyboard shortcut modal accessible via `Shift+Alt+F` or `Ctrl+/`.
3. **Touch Targets:**
   - Mobile buttons and navigation links maintain $\ge 44\text{px}$ minimum touch boundaries.

---

## 5. FEATURE PRESERVATION GUARANTEE

The upcoming implementations will strictly preserve:
- All **150 DSA Problems** in `src/lib/data/dsa.ts`.
- All **22 Subject Categories**, **235 Topics**, and **710 Quiz Questions** in `src/lib/data/curriculum.ts`.
- All **4 Aptitude Categories** (Quantitative, Logical, Verbal, Spatial) in `src/lib/data/aptitude.ts`.
- The **ATS Resume Evaluator** with 9 scoring dimensions and Google XYZ formulas.
- All existing user records, auth sessions, bookmarks, and test suites.
