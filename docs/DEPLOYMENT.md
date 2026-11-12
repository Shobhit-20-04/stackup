# StackUp Deployment Guide

This document describes how StackUp is built, configured, and deployed in production environments on Vercel and Supabase.

---

## 1. Hosting Architecture

- **Frontend & Edge API:** Hosted on [Vercel](https://vercel.com).
- **Database & Auth:** Hosted on [Supabase](https://supabase.com).
- **Code Execution:** Sandboxed Judge0 cluster.
- **AI Intelligence:** Google Gemini API (`gemini-3.5-flash-lite`).
- **CI / Scheduled Automation:** GitHub Actions (`.github/workflows/`).

---

## 2. Deploying to Vercel

### Step 1: Connect GitHub Repository
1. In your Vercel Dashboard, click **Add New Project**.
2. Select your repository: `https://github.com/Shobhit-20-04/stackup`.
3. Choose the production branch (typically `main`).

### Step 2: Configure Environment Variables
In **Vercel Settings $\rightarrow$ Environment Variables**, configure the following variables for **Production**, **Preview**, and **Development**:

| Variable Name | Required | Description | Example |
|:---|:---:|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Project URL | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public Anonymous API Key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Backend Service Role Key | `eyJhbGciOi...` |
| `AI_PROVIDER` | Yes | Primary AI Engine Provider | `gemini` |
| `GEMINI_API_KEY` | Yes | Google Gemini API Key | `AIzaSy...` |
| `GEMINI_MODEL` | Yes | Gemini Model Target | `gemini-3.5-flash-lite` |
| `ADMIN_EMAIL` | Yes | Primary Administrator Email | `admin@stackup.xyz` |
| `ADMIN_PASSWORD_HASH` | Yes | Salted scrypt password hash | `scrypt:...` |
| `NEXT_PUBLIC_APP_URL` | Yes | Canonical Public Web URL | `https://stackup-zeta.vercel.app` |

### Step 3: Trigger Build
Vercel executes:
```bash
npm run build
```
The build process compiles static pages, generates dynamic App Router endpoints, bundles client bundles, and deploys globally with edge routing.

---

## 3. Database Maintenance & Supabase Keep-Alive

Free-tier Supabase projects automatically pause after 7 days of inactivity. StackUp includes an automated GitHub Action to prevent dormancy:

- **Workflow File:** `.github/workflows/keep-supabase-alive.yml`
- **Schedule:** Runs daily at midnight UTC (`0 0 * * *`).
- **Mechanism:** Sends an authenticated health ping to Supabase Auth API (`/auth/v1/health`) using repository secrets (`SUPABASE_URL` and `SUPABASE_ANON_KEY`).

---

## 4. Post-Deployment Verification Checklist

After deploying a new release, verify:
- [ ] Homepage renders cleanly with 0 console errors.
- [ ] DSA Problem catalog loads and filters properly (`/dsa`).
- [ ] Monaco coding workspace opens and executes sample code (`/dsa?problem=dsa-1`).
- [ ] Core CS notes render and quizzes record attempts (`/core-cs`).
- [ ] ATS resume analyzer parses test PDF without timing out (`/resume-checker`).
- [ ] AI Assistant widget opens, shows `✨ gemini-3.5-flash-lite`, and streams tokens.
- [ ] Admin portal validates access and blocks unauthorized logins (`/admin`).
