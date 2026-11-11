# STACKUP — AI ASSISTANT CONFIGURATION & SETUP GUIDE

This document provides clear, step-by-step instructions for configuring Google Gemini and managing AI provider integrations in StackUp.

---

## 1. ENVIRONMENT VARIABLES CONFIGURATION

StackUp uses a server-side multi-provider AI architecture. All API credentials and model settings are configured via `D:\stackup\.env.local` (or your hosting provider's secret management dashboard in production).

### Required & Supported Variables:

```bash
# -------------------------------------------------------------
# StackUp AI Assistant Configuration
# -------------------------------------------------------------

# Active Provider: 'gemini' (recommended) | 'anthropic' | 'auto' | 'local'
AI_PROVIDER=gemini

# Google Gemini Configuration (Server-Side Only - Never expose to client)
# Obtain from https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your-gemini-api-key-here

# Supported Models: 'gemini-3.8-flash' (default, recommended) | 'gemini-3.5-flash-lite' | 'gemini-4-argon'
GEMINI_MODEL=gemini-3.8-flash

# Optional: Anthropic Claude Fallback
ANTHROPIC_API_KEY=your-anthropic-api-key-here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

> [!CAUTION]
> **Security Rules:**
> - NEVER prefix AI API keys with `NEXT_PUBLIC_`.
> - Never commit `.env.local` to Git. (Verified protected in `.gitignore`).
> - Never hardcode API keys in source files or documentation.

---

## 2. HOW TO CONFIGURE GOOGLE GEMINI (3 EASY STEPS)

### Step 1: Generate an API Key
1. Visit **Google AI Studio**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account.
3. Click **"Create API Key"** and copy the generated key.

### Step 2: Add Key to `.env.local`
Open `D:\stackup\.env.local` and add your key:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-3.8-flash
```

### Step 3: Restart the Application
Restart your local development server to load the new environment variables:
```bash
npm run dev
```

---

## 3. HOW THE PROVIDER FALLBACK WORKS

StackUp features an autonomous multi-tier fallback architecture:

```
+-------------------------------------------------------------+
| 1. Google Gemini (Primary)                                  |
|    - Verified with GEMINI_API_KEY                           |
|    - High-speed 1M token context & streaming SSE            |
+------------------------------+------------------------------+
                               | (If key missing or quota 429)
                               v
+-------------------------------------------------------------+
| 2. Anthropic Claude (Secondary)                             |
|    - Activated if ANTHROPIC_API_KEY is configured           |
+------------------------------+------------------------------+
                               | (If key missing or network fails)
                               v
+-------------------------------------------------------------+
| 3. StackUp Grounded AI (Offline Local RAG Engine)           |
|    - ZERO external API key required                         |
|    - Retrieves real DSA problems and Core CS curriculum     |
|    - 100% reliable offline operation                        |
+-------------------------------------------------------------+
```

---

## 4. TROUBLESHOOTING & COMMON SCENARIOS

### Scenario A: Chat shows "StackUp Grounded AI" badge instead of "Gemini"
- **Cause:** `GEMINI_API_KEY` is either missing from `.env.local` or contains a placeholder string.
- **Fix:** Verify that `GEMINI_API_KEY` starts with `AIzaSy...` in `.env.local` and restart `npm run dev`.

### Scenario B: "Gemini rate limit or quota exceeded"
- **Behavior:** The orchestrator automatically catches HTTP 429 and transparently switches to the local grounded RAG engine so the student continues receiving educational answers without interruption.
- **Fix:** If high concurrency is expected, verify your quota limits on the Google AI Studio console or upgrade your project tier.

### Scenario C: Chat rate limits in the UI
- **Behavior:** A rate limit of **30 requests per minute** is enforced per client IP to prevent denial-of-service and quota abuse.
- **Fix:** Wait 60 seconds for the window to reset.

---

## 5. RUNNING THE VERIFICATION TEST SUITE

To verify the AI assistant and its evaluation framework:
```bash
# Run AI Evaluation Suite (19 tests)
npm test tests/ai-evaluation.test.ts

# Run Entire Test Suite (233 tests across 15 suites)
npm test

# Verify TypeScript and Linting
npm run typecheck
npm run lint
```
