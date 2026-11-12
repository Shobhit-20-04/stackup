# StackUp Architecture Blueprint

StackUp is a high-performance, full-stack educational and technical interview preparation platform built with modern web technologies. This document outlines the system architecture, component boundaries, execution sandboxing, data workflows, and security layers.

---

## 1. High-Level Architecture Overview

```
+-----------------------------------------------------------------------------------+
|                                  Client Layer                                     |
|  Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Monaco Editor · Lucide     |
+-----------------------------------------+-----------------------------------------+
                                          | HTTPS / SSE (EventStream)
                                          v
+-----------------------------------------------------------------------------------+
|                             Next.js Server Runtime                                |
|  - Edge / Node.js Runtime Engine                                                  |
|  - Server-Side Cryptographic Session Validator (HMAC-SHA256 / scrypt)             |
|  - Strict Origin & CSRF Gatekeeper                                                |
|  - Sliding-Window Token Bucket IP Rate Limiter                                    |
+-------------------+---------------------+--------------------+--------------------+
                    |                     |                    |
                    v                     v                    v
+-----------------------+ +-------------------------+ +-----------------------------+
|    AI Intelligence    | |     Judge Execution     | |      Data & Storage         |
|  - Orchestrator Engine| |  - Judge0 Rapid Batch   | |  - PostgreSQL (Supabase)    |
|  - Google Gemini 3.5  | |  - Static Language Adap | |  - Local Isolated Cache     |
|  - In-Memory RAG      | |  - Sandbox Boundary     | |  - SM-2 Mistake Engine      |
|  - ATS Resume Scorer  | |  - Zero Server Execution| |  - Admin Audit Persistence  |
+-----------------------+ +-------------------------+ +-----------------------------+
```

---

## 2. Core Subsystems

### 2.1 DSA Coding Workspace & Judge Engine
- **Client Workspace (`src/components/dsa/CodingWorkspace.tsx`):**
  - Monaco Editor with dark/light theme synchronization.
  - Multi-language support: Python 3, C++ (GCC 9), Java (OpenJDK 13), and TypeScript.
  - Interactive test case runner: Sample cases, hidden test verification, and custom user input execution.
  - Keyboard shortcuts (`Ctrl+Enter` to run, `Ctrl+Shift+Enter` to submit, `Esc` to toggle fullscreen).
- **Execution Sandboxing (`src/app/api/dsa/execute/route.ts` & `src/app/api/dsa/submit/route.ts`):**
  - Arbitrary user code is **never** executed inside the Next.js application runtime.
  - Dispatches batch execution jobs concurrently to an isolated Judge0 container sandbox.
  - Security filtering strips prohibited system commands (`fork`, `exec`, `system`, socket calls).
  - Enforces hard execution timeouts (5000ms) and memory limits (128MB).
  - Conceals hidden test case inputs and expected outputs to prevent test snooping.

### 2.2 Core CS & Aptitude Curriculum Engine
- **Curriculum Repository (`src/lib/data/curriculum/`):**
  - 19 Computer Science and Aptitude categories.
  - 221 comprehensive, interview-focused topics (notes depth: ~3,441 chars/topic).
  - 668 verified quiz questions with exhaustive answer explanations.
- **Section Engine (`src/components/curriculum/SectionPage.tsx`):**
  - Fast client-side searching using React `useDeferredValue` (zero layout thrashing).
  - Deep-link category selection via URL hash routing (`/core-cs#os`, `/aptitude#quant-apt`).
  - Interactive quiz simulation with real-time feedback, score tracking, and mistake logging.

### 2.3 Learning Intelligence & Spaced Repetition (SM-2)
- **Spaced Repetition Algorithm (`src/lib/services/learning-intelligence/sm2.ts`):**
  - SuperMemo-2 (SM-2) calculation engine tracking easiness factor ($EF \ge 1.3$), repetition intervals, and due review dates.
  - Mistake journal logging failed DSA submissions and quiz errors.
  - Weak topic identification clustering mistakes by category to recommend targeted practice sets.
  - Dismissible daily recommendations and active recall flashcards.

### 2.4 Google Gemini AI Assistant & In-Memory RAG
- **AI Service Layer (`src/lib/services/ai/`):**
  - **Provider:** Google Gemini via official `@google/genai` SDK (`gemini-3.5-flash-lite`, sub-second ~868ms latency).
  - **In-Memory RAG Engine:** Tokenized BM25-style search over 150 DSA problems, 221 Core CS topics, 668 quizzes, ATS resume scoring rules, and student learning history.
  - **Pedagogical System Prompt:** Enforces worst-case Big-O complexity analysis ($O(n)$, $O(\log n)$), strictly prohibits hallucinations, and requires code verification disclaimers.
  - **Streaming:** Server-Sent Events (SSE) streaming tokens directly to `ChatWidget.tsx` with live typing animations and one-click code copy blocks.
  - **Fallback Hierarchy:** Automatic degradation to StackUp Grounded AI (curriculum-grounded offline engine) if cloud APIs are unreachable.

### 2.5 ATS Resume Checker & Diagnostics
- **Resume Parsing Engine (`src/lib/services/resume/`):**
  - Multi-format ingestion: PDF, DOCX, and TXT files.
  - Instant pre-flight encryption check (`/Encrypt`) preventing PDF.js worker hangs.
  - Scanned PDF detection flagging image-only resumes lacking selectable text layers.
  - STAR formula optimization (Google XYZ formula: *"Accomplished [X] as measured by [Y] by doing [Z]"*).
  - 6-dimension scoring: Contact info, Experience, Skills ontology, Education, Layout/Formatting, and JD keyword alignment.

---

## 3. Security & Zero-Trust Architecture

1. **Authentication & Session Management:**
   - Cryptographically signed HttpOnly session cookies (`stackup_session_meta`) signed via HMAC-SHA256.
   - Dual-mode support for Supabase Auth and isolated session cookies.
   - Strictly enforces server-side validation on every privileged endpoint (`/api/dsa/*`, `/api/chat`, `/api/profile/*`, `/api/learning-intelligence/*`).
2. **Admin Portal Security (`/admin`):**
   - Protected by salted `scrypt` key derivation function with 16-byte cryptographically random salt.
   - Constant-time string comparison (`crypto.timingSafeEqual`) preventing timing attacks.
   - Single-use, time-expiring (10-minute) password reset verification codes.
3. **Network & Abuse Defenses:**
   - Strict Origin & Referer verification against cross-site request forgery (CSRF).
   - Sliding-window token-bucket rate limiting per IP across all mutation endpoints.
   - Strict Magic Byte verification for all file uploads.
