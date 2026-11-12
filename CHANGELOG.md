# Changelog

All notable changes to the StackUp platform are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), adhering to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-11-12

### Added
- **200-User Real-World Concurrency Engine:** Automated load-testing framework (`scripts/load-test-200-users.mjs`) evaluating concurrency from 1 to 250 simultaneous users with 0% error rate and P95 latency of 384ms.
- **Automated Security Secret Scanner:** Standalone pre-commit/pre-push secret scanner (`scripts/security-audit-scan.mjs`) inspecting tracked files for credential leaks.
- **Documentation Suite:** Authored `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT.md`, `docs/DEPLOYMENT.md`, and `docs/TESTING.md`.
- **Repository Archiving:** Consolidated 60 historical audit logs into `docs/archive/` to restore repository root hygiene.

### Fixed
- **Resume Parser PDF Timeout:** Resolved worker stall on encrypted/password-protected PDFs by checking `/Encrypt` dictionary upfront, reducing test time from 5,000ms timeout to 1.2s.
- **Coding Workspace User Binding:** Fixed `addMistake` in `CodingWorkspace.tsx` to bind directly to authenticated user ID rather than default string.
- **Keyboard Listener Consolidation:** Eliminated redundant duplicate `window.addEventListener('keydown')` in `SectionPage.tsx`.
- **Data Directory Git Hygiene:** Hardened `.gitignore` to strictly ignore all uploads and dynamic files in `/data/*` while preserving `.gitkeep`.

---

## [2.1.0] - 2026-11-11

### Added
- **Google Gemini AI Assistant:** Integrated `@google/genai` with sub-second responsive model `gemini-3.5-flash-lite`.
- **In-Memory RAG Engine:** Tokenized search indexing 150 DSA problems, 221 Core CS topics, 668 quizzes, and ATS resume scoring guidelines.
- **Server-Sent Events (SSE) Streaming:** Real-time token streaming with code copy buttons and language badges.
- **Server Auth Cookie Parsing:** Safe cookie extraction from headers without invalidating consumed request body streams.

---

## [2.0.0] - 2026-11-04

### Added
- **StackUp Learning Intelligence:** Spaced repetition (SM-2) engine, mistake journal, and weak topic diagnostic recommendations.
- **Curriculum Expansion:** Complete coverage of 19 CS and Aptitude categories with 221 interactive topics and 668 quizzes.
- **ATS Resume Analyzer:** Multi-format document parser, STAR optimization engine, and 6-dimension scoring.
