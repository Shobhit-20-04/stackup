# Changelog

All notable changes to the **StackUp** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/).

## [Unreleased]

### Added
- Phase 1 scaffolding with Next.js 16 (App Router), TypeScript, and Tailwind CSS.
- GitHub Actions CI workflow for linting, type checking, and unit testing.
- Comprehensive Supabase Postgres schema migration script with 9 core tables, RLS policies, performance indexes, and automatic profile creation triggers.
- Supabase SSR integration for browser, server, and edge middleware.
- Authentication flow supporting Google OAuth and Phone OTP with automatic redirection for unauthenticated requests.
- Profile dashboard featuring user statistics, streak tracker, per-section progress bars, quiz score history chart (Recharts), and resume analysis history cards.
- Vitest automated testing suite for CI verification.
- Phase 2 Quantitative & Logical Aptitude module (`/aptitude`) with structured notes and timed MCQs.
- Phase 2 Core CS Subjects module (`/core-cs`) covering OS, DBMS, Computer Networks, and OOPs.
- Interactive Quiz Engine with countdown timers, question palette, instant scorecards, and solution explanations.
- Automatic quiz attempt recording and real-time curriculum progress synchronization with Profile dashboard.
- Curated DSA Hub (`/dsa`) with 30 high-frequency problems, pattern and difficulty filtering, company tags, and intuition hints.
- ATS Resume Checker (`/resume-checker` & `/api/resume-analysis`) supporting PDF/DOCX file uploads, 5MB validation, keyword analysis, STAR rewrites, and scorecard persistence.
- Context-Aware AI Chatbot Widget (`/api/chat` + floating UI) with section-specific recommendations and sliding-window rate limiting.
- Seamless 1-Click Instant Demo Login and simulated fallback auth handling when cloud Supabase credentials are not connected.
- In-App Supabase & Claude API Credentials Manager (`/api/config/credentials` and `CredentialsModal.tsx`) with real-time connection verification.
- Live Database status badge in Navbar and Profile dashboard (`Supabase Connected` vs `Demo Mode`).
- Modernized Landing Page UI with interactive preview tabs (DSA engine, ATS scanner, Core CS quiz), stats strip, and bento showcase.

### Fixed
- Fixed TypeScript type narrowing and active user scope issues in `src/app/profile/page.tsx`.
- Resolved 404 missing route errors for `/dsa` and `/resume-checker`.
- Added missing resume parsers (`pdf-parse`, `mammoth`) and rate limiter service.
