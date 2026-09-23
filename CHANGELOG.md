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
