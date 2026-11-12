# StackUp — Technical Interview Preparation & Learning Intelligence Platform

> **StackUp** is a high-performance, full-stack educational platform built for Computer Science students and software engineers to master Data Structures & Algorithms, Core CS subjects, Quantitative & Logical Aptitude, and ATS Resume Optimization.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-234%20Passing-green?style=flat&logo=vitest)](https://vitest.dev/)
[![200--User Tested](https://img.shields.io/badge/200--User%20Concurrency-P95%20384ms-success)](docs/TESTING.md)

---

## 1. Project Overview & Purpose

Technical interview preparation is often fragmented across multiple disjointed tools: one platform for coding problems, another for OS/DBMS revision notes, third-party sites for aptitude quizzes, external tools for resume checking, and generic AI chatbots that lack curriculum awareness.

**StackUp unifies this entire interview lifecycle into one coherent, evidence-based workspace:**
1. **Interactive DSA Coding Workspace:** 150 curated algorithmic problems with Monaco Editor, multi-language execution (Python, C++, Java, TS), and Judge0 sandboxing.
2. **Core CS Curriculum:** 221 in-depth revision topics across Operating Systems, DBMS, Computer Networks, COA, Compiler Design, OOPs, and System Design with 668 verified quiz questions.
3. **Quantitative & Logical Aptitude:** 4 structured modules (Quant, Logical Reasoning, Verbal, Spatial) with speed-solving shortcuts and timed practice tests.
4. **ATS Resume Checker:** Ingests PDF, DOCX, and TXT files, diagnosing scanned documents, font encoding, keyword density, and transforming bullets via Google's XYZ formula.
5. **Google Gemini AI Assistant:** Integrated via `@google/genai` (`gemini-3.5-flash-lite`), with in-memory RAG grounded in StackUp's 221 topics and real-time SSE streaming.
6. **Learning Intelligence (SM-2):** Tracks student mistakes across submissions and quizzes, scheduling spaced-repetition active recall reviews to eliminate weak topics.

---

## 2. Real-World 200-User Concurrency Performance

StackUp is engineered and measured for real-world concurrent traffic:

- **Concurrency Range Tested:** 1 to 250 simultaneous active users.
- **Requests Served:** 18,990 requests across multi-stage load simulation.
- **Error Rate:** **0.00%** (zero HTTP 5xx errors or dropped connections).
- **Latency at 200 Concurrent Users:** **Mean 319ms | P95 384ms | P99 696ms**.
- **Peak Throughput:** **803.6 requests / second**.

Full methodology and telemetry: [docs/TESTING.md](docs/TESTING.md).

---

## 3. Technology Stack

| Layer | Technologies |
|:---|:---|
| **Framework** | Next.js 16.4.3 (App Router with Turbopack) |
| **UI Library** | React 19.2.8, Lucide React Icons |
| **Styling** | Tailwind CSS v4 with unified CSS variables and dark/light modes |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **AI Intelligence** | Google Gemini (`@google/genai`), in-memory RAG, Server-Sent Events |
| **Database & Auth** | Supabase (PostgreSQL with Row Level Security), HMAC session tokens |
| **Document Processing** | `pdf-parse`, `mammoth` (DOCX), magic-byte format validation |
| **Testing** | Vitest 5.0.1 (234 tests across 15 test suites) |
| **Deployment** | Vercel (Edge network), Supabase Cloud, Judge0 sandbox |

---

## 4. Repository Structure

```
stackup/
├── .github/workflows/       # Automated CI and Supabase daily keep-alive cron
├── docs/                    # Technical architecture, testing, and deployment docs
│   ├── ARCHITECTURE.md      # Detailed system blueprint and security model
│   ├── DEVELOPMENT.md       # Local developer setup and standards
│   ├── DEPLOYMENT.md        # Vercel and production deployment guide
│   ├── TESTING.md           # Vitest and 200-user concurrency test guide
│   └── archive/             # Historical audit and research reports
├── public/                  # Static assets and favicons
├── scripts/                 # Utility scripts (benchmark, password reset, secret scan)
│   ├── load-test-200-users.mjs   # 200-user concurrency benchmark engine
│   ├── security-audit-scan.mjs  # Secret and credential scanner
│   └── reset-admin-passcode.js   # Admin passcode management tool
├── src/
│   ├── app/                 # Next.js App Router (pages and API endpoints)
│   │   ├── admin/           # Administrative portal & candidate resume management
│   │   ├── api/             # Secure backend endpoints (dsa, chat, auth, resume)
│   │   ├── aptitude/        # Aptitude modules and timed quizzes
│   │   ├── core-cs/         # Core Computer Science curriculum and quizzes
│   │   ├── dsa/             # DSA Problem Hub, Striver sheet, and Coding Workspace
│   │   ├── profile/         # Student profile, Learning Intelligence, and streaks
│   │   └── resume-checker/  # ATS Resume Analyzer
│   ├── components/          # Reusable UI components (Navbar, Monaco Workspace, Chat)
│   └── lib/                 # Core business logic and shared services
│       ├── auth/            # Server auth, session verification, scrypt hashing
│       ├── data/            # Static problem catalog and 221 Core CS topics
│       ├── security/        # XSS sanitization, rate limiting, and CSRF defense
│       ├── services/        # AI orchestrator, Judge0 adapter, ATS parser, SM-2
│       └── supabase/        # Database clients and middleware
├── tests/                   # Vitest automated test suites (234 tests)
├── .env.example             # Safe environment template
├── package.json             # Project dependencies and npm scripts
└── README.md                # Project documentation
```

---

## 5. Getting Started Locally

### 5.1 Prerequisites
- **Node.js:** v18.17.0 or higher
- **npm:** v9.x or higher
- **Git**

### 5.2 Installation
```bash
# Clone the repository
git clone https://github.com/Shobhit-20-04/stackup.git
cd stackup

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local
```

### 5.3 Configure Environment Variables
Open `.env.local` and configure your credentials:

```env
# Supabase Database Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Assistant (Google Gemini)
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSy...your-actual-api-key...
GEMINI_MODEL=gemini-3.5-flash-lite

# Administrator Security (Salted scrypt hash)
ADMIN_EMAIL=admin@stackup.xyz
ADMIN_PASSWORD_HASH=scrypt:3fca47a5...

# Application Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5.4 Run the Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

---

## 6. Verification & Quality Gates

Run the complete local verification pipeline before submitting any pull request:

```bash
# 1. Run Vitest automated test suite (234 tests across 15 suites)
npm test

# 2. Validate TypeScript compilation across the entire project
npm run typecheck

# 3. Run ESLint static code analysis
npm run lint

# 4. Compile production Next.js build
npm run build

# 5. Scan for exposed secrets or credentials
node scripts/security-audit-scan.mjs
```

---

## 7. AI Assistant Configuration (Google Gemini)

StackUp features an AI interview mentor powered by Google Gemini:

- **Default Model:** `gemini-3.5-flash-lite` (selected for ~868ms sub-second latency and high availability).
- **In-Memory RAG:** Indexes StackUp's 150 DSA problems, 221 Core CS topics, 668 quizzes, and candidate learning history.
- **Real-Time Streaming:** Streams response tokens over Server-Sent Events (SSE).
- **Offline Resilience:** Degrades automatically to StackUp Grounded AI if external cloud APIs are unavailable.

To obtain an API key:
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Generate an API Key.
3. Set `GEMINI_API_KEY` in `.env.local` (and in Vercel Project Settings for production).

---

## 8. Sandboxed Code Execution (Judge0)

When a student runs or submits code in the Monaco editor:
1. The client dispatches a request to `/api/dsa/execute` or `/api/dsa/submit`.
2. The server verifies user authentication and applies rate limiting (12 executions/min).
3. The server validates code length and inspects for prohibited system calls.
4. The code is wrapped with a language-specific driver and sent in parallel batches to the Judge0 sandbox.
5. Outputs are normalized and compared against expected test cases, keeping hidden test inputs confidential.

---

## 9. Security & Access Control

- **Zero-Trust Server Validation:** Cryptographically signed session tokens (`stackup_session_meta`) prevent IDOR and privilege escalation.
- **Admin Security:** Protected by salted `scrypt` hashing with constant-time equality comparisons (`crypto.timingSafeEqual`) and single-use verification codes.
- **Data Protection:** User uploads and dynamic data files in `/data/*` are strictly ignored by Git.

---

## 10. Contributing & License

- **Contribution Guidelines:** See [CONTRIBUTING.md](CONTRIBUTING.md).
- **Security Policy:** See [SECURITY.md](SECURITY.md).
- **Release History:** See [CHANGELOG.md](CHANGELOG.md).
- **License:** MIT License.
