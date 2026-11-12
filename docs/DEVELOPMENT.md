# StackUp Local Development Guide

This guide covers everything required to configure, run, debug, and contribute to the StackUp application locally.

---

## 1. Prerequisites

- **Node.js:** v18.17.0+ (Tested on Node v20.x and v22.x)
- **Package Manager:** `npm` v9+
- **Git:** v2.30+
- **OS:** Linux, macOS, or Windows 10/11 (PowerShell / WSL)

---

## 2. Quickstart Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shobhit-20-04/stackup.git
   cd stackup
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example template to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and configure your API keys (see [Environment Configuration](#3-environment-configuration) below).

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

---

## 3. Environment Configuration

StackUp provides safe default fallbacks for all services, but cloud features require valid environment keys in `.env.local`:

```env
# Database Credentials (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key

# AI Assistant Configuration
AI_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-3.5-flash-lite

# Optional Anthropic Fallback
ANTHROPIC_API_KEY=sk-ant-api03-...
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Admin Security (Salted scrypt hash)
ADMIN_EMAIL=admin@stackup.xyz
ADMIN_PASSWORD_HASH=scrypt:3fca47a5...

# Application Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> [!IMPORTANT]
> Never commit `.env.local` to Git. It is automatically ignored by `.gitignore`.

---

## 4. Available NPM Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Starts the Next.js development server with Turbopack on port 3000 |
| `npm run build` | Compiles the production build, runs static analysis, and optimizes pages |
| `npm run start` | Boots the compiled production server on port 3000 |
| `npm test` | Executes the Vitest automated test suite (234 tests across 15 suites) |
| `npm run typecheck` | Validates TypeScript compilation across the entire project (`tsc --noEmit`) |
| `npm run lint` | Runs ESLint 9 checks across all source files |
| `npm run admin:reset` | Interactive utility to rotate or reset the admin passcode |

---

## 5. Coding Standards & Conventions

- **Framework:** Next.js App Router (`src/app/`).
- **Components:** Functional React 19 components with explicit TypeScript interfaces.
- **Styling:** Tailwind CSS 4 with CSS variable design tokens defined in `src/app/globals.css`.
- **Imports:** Prefer path aliases (`@/...`) mapping to `src/...`.
- **Git Branches:**
  - `main`: Production release branch.
  - `dev`: Primary integration branch.
  - `feature/<name>`: Dedicated feature development branches.
