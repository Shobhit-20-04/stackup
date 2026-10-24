# StackUp — Technical Interview Preparation & Career Accelerator Platform

> **An all-in-one, production-grade technical interview preparation platform for engineering students and software developers.** StackUp delivers structured revision notes, interactive timed and practice quizzes across Core Computer Science subjects and Aptitude, a curated 150-problem Data Structures & Algorithms (DSA) hub with canonical Striver SDE Sheet integration, a binary-parsing Resume ATS Checker with keyword gap analysis, and a context-aware AI preparation assistant — engineered for high-concurrency serverless deployment from day one.

---

## 📋 Table of Contents

- [Overview & Value Proposition](#-overview--value-proposition)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Local Setup](#-installation--local-setup)
- [Environment Configuration](#-environment-configuration)
- [Database Setup & Migrations](#-database-setup--migrations)
- [Running the Application](#-running-the-application)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Production Build & Deployment](#-production-build--deployment)
- [Security, Privacy & Compliance](#-security-privacy--compliance)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License & Attribution](#-license--attribution)

---

## 💡 Overview & Value Proposition

Engineering students and career switchers preparing for software engineering interviews and GATE CS face fragmented resources across multiple platforms: disparate LeetCode lists, textbook PDFs, unverified MCQs, and black-box resume screening tools. 

**StackUp consolidates the entire technical interview lifecycle into a single unified platform:**
1. **Core CS & Aptitude Curriculum:** 19 subjects covering 221 deep revision topics and 668 verified, peer-reviewed multiple-choice practice questions with detailed explanations.
2. **Curated DSA Hub:** 150 essential algorithmic challenges across 19 core patterns with canonical Striver SDE Sheet mapping and optimal 4-language solutions (Python, C++, Java, TypeScript).
3. **Genuine ATS Resume Evaluator:** Binary parsing for PDF and DOCX files, extracting real text and scoring alignment against customizable target job specifications with STAR-format bullet rewrites.
4. **Administrative Operations:** Consolidated administrative portal featuring scrypt-hashed passcodes, rate-limited single-use password recovery, candidate dossier inspection, and sanitized CSV exports.
5. **Universal Session Security:** Strict 30-minute idle inactivity timeout, 2-minute warning modal, 24-hour absolute session cap, and multi-tab synchronization.

---

## ✨ Key Features

### 1. Curriculum Engine (Core CS & Quantitative Aptitude)
- **19 Academic Subjects:** Operating Systems, Database Management Systems, Computer Networks, Computer Organization & Architecture, Theory of Computation, Compiler Design, Digital Logic, Algorithms, Data Structures, Discrete Mathematics, Engineering Mathematics, OOPs & Design Patterns, System Design Fundamentals, Software Engineering, and Quantitative/Logical/Verbal/Spatial Aptitude.
- **Deep Revision Notes:** Markdown notes engine featuring clear intuition, diagrams, syntax-highlighted code blocks, and external links to verified video lectures.
- **Interactive Quiz Modes:** 
  - *Practice Mode:* Immediate answer validation and step-by-step explanations for deep conceptual retention.
  - *Timed Mode:* Exam-style countdown simulating real campus recruitment tests with detailed score breakdowns.

### 2. DSA Practice Hub & Striver SDE Sheet
- **150 Curated Problems:** Categorized across 19 algorithmic patterns (Arrays, Two Pointers, Sliding Window, Trees, Graphs, Dynamic Programming, Greedy, Backtracking, etc.).
- **Canonical Striver SDE Sheet:** One-click toggle filtering the 79 canonical Striver sheet challenges without redundant routes.
- **Dedicated Breakdown Routes (`/dsa/[id]`):** In-depth problem breakdowns including time/space complexity analysis, edge case considerations, multi-language solutions, and deep links to LeetCode and TakeUForward tutorials.

### 3. Resume ATS Checker & Analyzer
- **Real Binary Extraction:** Client-side drag-and-drop supporting both `.pdf` and `.docx` documents up to 10MB using native binary parser pipelines.
- **Multi-Category Scoring:** Detailed score breakdown across Contact Information, Experience Impact, Skill Alignment, Education, and Formatting.
- **Actionable STAR Rewrites:** AI-assisted suggestions converting weak passive descriptions into high-impact Situation-Task-Action-Result bullet points.
- **Zero Fabricated Data:** The platform computes actual matching algorithms against provided job descriptions without hardcoded mock results.

### 4. Admin Management Portal (`/admin`)
- **Consolidated Security Gateway:** Single canonical login interface protected by scrypt cryptographic hashes and rate-limited lockout protection.
- **Candidate Dossier Inspection:** Authorized access to real uploaded candidate records, analysis summaries, and original file downloads with safe content headers.
- **Sanitized CSV Export:** Neutralizes spreadsheet formula injection risks by escaping active formula triggers (`=`, `+`, `-`, `@`).
- **Audit Logging:** Tamper-evident logging of all privileged administrative events (logins, downloads, reprocessing, deletions).

### 5. Official Unified Brand Design System
- **Curated 5-Color Palette:**
  - **Deep Teal (`#044E62`):** Primary brand surfaces, headings, and navigation accents.
  - **Electric Indigo (`#0D08CB`):** Interactive buttons, links, active tabs, and focus accents.
  - **Warm Brown (`#4A3932`):** Primary text on light surfaces and secondary headings.
  - **Soft Lavender (`#E9DEFA`):** Secondary backgrounds, information panels, and learning cards.
  - **Soft Pink (`#FACAE7`):** Accent badges, score tags, and highlights.
- **WCAG 2.2 Compliance:** Normal text contrast exceeds 8:1 (AAA standard), with strict guardrails preventing low-contrast text on pastel backgrounds.

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) + React 19 | Server-side rendering, streaming API routes, optimized static generation |
| **Styling** | Tailwind CSS 4 + Lucide React | Modern CSS variables, responsive design tokens, tactile micro-interactions |
| **Language** | TypeScript 5 (Strict Mode) | End-to-end type safety across client, server, and database models |
| **Database** | PostgreSQL via Supabase | Relational data persistence with Row Level Security (RLS) policies |
| **Connection Pooling** | PgBouncer | Serverless connection pooling handling high concurrent request volume |
| **Authentication** | Supabase Auth + Custom Admin Guard | Google OAuth, Phone OTP, Email/Password, and 1-Click Instant Demo login |
| **Visualizations** | Recharts | Interactive candidate score trajectories and subject proficiency meters |
| **Testing** | Vitest 5.0 + Testing Library | Fast unit, integration, and security regression testing suite |
| **Security** | Scrypt + Web Crypto API | Cryptographic password hashing and ephemeral HMAC token signing |

---

## 🏛 System Architecture

```mermaid
flowchart TD
    User["Student / Candidate Browser"]
    Admin["Authorized Administrator"]

    subgraph CDN["Edge & Network Layer"]
        Routing["Next.js App Router (Proxy Middleware)"]
        SessionMgr["SessionTimeoutManager (30m Idle / 24h Absolute)"]
    end

    subgraph ApplicationRoutes["Client & Server Routes"]
        Home["Landing Page (/)"]
        DSA["DSA Hub (/dsa & /dsa/[id])"]
        Curriculum["Curriculum (/core-cs & /aptitude)"]
        ATS["Resume Checker (/resume-checker)"]
        AdminPortal["Admin Management (/admin)"]
        Profile["Profile Dashboard (/profile)"]
    end

    subgraph BackendAPI["Backend API & Server Handlers"]
        APISession["/api/auth/session/*"]
        APIChat["/api/chat (Rate Limited)"]
        APIResume["/api/resume-analysis"]
        APIAdmin["/api/admin/* (Protected)"]
    end

    subgraph DataStorage["Data & State Persistence"]
        DB["Supabase PostgreSQL (RLS Protected)"]
        LocalStore["Local Fallback Storage / Cache"]
    end

    User --> Routing
    Admin --> Routing
    Routing --> SessionMgr
    SessionMgr --> ApplicationRoutes

    ApplicationRoutes --> BackendAPI
    BackendAPI --> DataStorage
```

---

## 📁 Project Structure

```
D:\stackup/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI pipeline (lint, typecheck, test)
├── public/                      # Static assets, branding icons, robots.txt
├── src/
│   ├── app/
│   │   ├── admin/               # Consolidated admin portal (resumes, audits, credentials)
│   │   ├── api/                 # Secure Next.js route handlers
│   │   │   ├── admin/           # Privileged endpoints (auth, export, reprocess, download)
│   │   │   ├── auth/            # Universal session lifecycle (create, heartbeat, logout)
│   │   │   ├── chat/            # Streaming AI assistant endpoint with rate limiting
│   │   │   └── resume-analysis/ # Binary resume parsing and scoring pipeline
│   │   ├── aptitude/            # Quantitative, Logical, Verbal aptitude track
│   │   ├── core-cs/             # 15 Core Computer Science subject modules
│   │   ├── dsa/                 # DSA Hub, Striver Sheet, and dynamic problem routes ([id])
│   │   ├── login/               # Authentication portal (OAuth, Email, 1-Click Demo)
│   │   ├── profile/             # Candidate analytics dashboard and score trajectory
│   │   ├── resume-checker/      # ATS resume parser and analyzer UI
│   │   ├── globals.css          # Centralized theme tokens, palettes, animations
│   │   ├── layout.tsx           # Root layout with meta color-scheme and global widgets
│   │   └── page.tsx             # Main landing page
│   ├── components/
│   │   ├── curriculum/          # TopicNotes, QuizEngine, SectionPage
│   │   ├── profile/             # QuizScoreChart (Recharts component)
│   │   ├── ChatBot.tsx          # Floating AI assistant interface
│   │   ├── Navbar.tsx           # Responsive header with 5-tap admin trigger
│   │   ├── Footer.tsx           # Semantic footer with navigation roadmap
│   │   ├── ThemeSwitcher.tsx    # 3-palette theme selector
│   │   ├── ThemeToggle.tsx      # Quick light/dark theme switch (Shift+D)
│   │   └── SessionTimeoutManager.tsx # Universal 30m idle session controller
│   └── lib/
│       ├── auth/                # Client session helper and demo login provider
│       ├── data/                # Verified curriculum and 150 DSA problem datasets
│       ├── security/            # Scrypt hashing, token signing, CSV sanitization
│       ├── services/            # ATS parser (pdf-parse, mammoth), JD matcher, scorer
│       └── supabase/            # Browser and server Supabase database clients
├── supabase/
│   └── migrations/              # Production database migrations with RLS policies
├── tests/                       # Vitest automated test suite (151 tests)
├── .env.example                 # Documented environment variable template
├── package.json                 # Project scripts and dependencies
└── vitest.config.ts             # Test runner configuration
```

---

## ⚙️ Prerequisites

- **Node.js:** `v20.x` or `v22.x LTS`
- **Package Manager:** `npm` (v10+)
- **Supabase Account:** Free tier at [supabase.com](https://supabase.com) (or local Supabase CLI)

---

## 🚀 Installation & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Shobhit-20-04/stackup.git
cd stackup
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the template configuration:
```bash
cp .env.example .env.local
```

---

## 🔐 Environment Configuration

Configure `.env.local` with your credentials:

```env
# Application Host URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase PostgreSQL & Auth Credentials
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Connection-Pooled PostgreSQL URL for Serverless Concurrency
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true

# Admin Portal Cryptographic Passcode Hash (Default scrypt hash provided in .env.example)
ADMIN_PASSWORD_HASH=<optional-custom-scrypt-hash>
ADMIN_MASTER_KEY=<optional-emergency-master-key>

# Session Secret (Optional; generated ephemerally if omitted)
SESSION_SECRET=<random-32-byte-hex-string>
```

---

## 🗄 Database Setup & Migrations

1. Log into your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** -> **New Query**.
3. Copy and execute the contents of [`supabase/migrations/20260923000000_initial_schema.sql`](./supabase/migrations/20260923000000_initial_schema.sql).
4. In **Authentication** -> **URL Configuration**, set the Site URL and Redirect URLs to:
   ```
   http://localhost:3000/auth/callback
   ```
5. *(Optional)* Enable **Google** or **Phone** providers under **Authentication** -> **Providers**.

---

## 💻 Running the Application

### Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Instant Testing Without External Credentials
The application includes a **1-Click Instant Demo Login** on the `/login` page that allows immediate testing of all authenticated student features without requiring third-party OAuth configuration.

### Secret Administrative Access Gateway
The `/admin` portal can be accessed directly via:
- Direct navigation to [http://localhost:3000/admin](http://localhost:3000/admin).
- Rapidly clicking the StackUp brand logo in the top navbar **5 times**.
- Keyboard shortcut: **`Ctrl + Shift + A`** (or **`Cmd + Shift + A`** on macOS).
- Desktop shortcut: Double-tapping the backtick key (**`` ` ``**).

---

## 🧪 Testing & Quality Assurance

StackUp enforces a strict multi-layer testing and verification pipeline matching our CI/CD workflows:

```bash
# 1. Run full unit and integration test suite (151 tests)
npm test

# 2. Run TypeScript strict type verification
npm run typecheck

# 3. Run ESLint code quality analysis
npm run lint

# 4. Compile optimized production build
npm run build
```

---

## 🚀 Production Build & Deployment

StackUp is optimized for zero-configuration deployment to the Vercel Edge Network or any Node.js container platform:

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. Set your environment variables in **Project Settings** -> **Environment Variables**.
4. Deploy! Next.js App Router and edge routes will configure automatically.

---

## 🔒 Security, Privacy & Compliance

- **Zero-Trust Access Control:** Server-side verification protects privileged endpoints (`/api/admin/*`). Client-side state is never trusted for authorization.
- **CSV Formula Injection Mitigation:** All exported candidate cells are sanitized against spreadsheet formula execution.
- **Scrypt Password Storage:** Passcodes and recovery tokens utilize cryptographic scrypt hashing with per-passcode salts.
- **Ephemeral Session Signing:** HMAC session signatures use process-isolated ephemeral keys when custom static secrets are omitted.
- **Session Expiration Guardrails:** Inactivity timeout enforces automatic logout after 30 minutes of idle time, accompanied by a 2-minute modal warning.
- **GDPR / Privacy Adherence:** No third-party tracking scripts or persistent tracking cookies are stored without consent. Original uploaded resume binaries can be purged permanently by authorized administrators.

---

## 🛠 Troubleshooting

| Issue | Cause | Resolution |
| :--- | :--- | :--- |
| **`401 Unauthorized` on Admin Portal** | Incorrect passcode or expired session | Use the "Forgot Passcode" link to issue a recovery token, or enter your configured `ADMIN_MASTER_KEY`. |
| **Resume Upload Fails** | File exceeds 10MB or is corrupted | Ensure document is a valid `.pdf` or `.docx` file under 10MB. Encrypted or password-protected PDFs are rejected by design. |
| **Supabase Connection Warning** | Missing credentials in `.env.local` | Click "Configure Database" in the credentials modal or test with the 1-Click Demo account. |
| **Session Expired Warning** | 30 minutes of inactivity elapsed | Click "Continue Session" in the modal warning dialog to extend your active session. |

---

## 🤝 Contributing

Contributions to curriculum improvements, DSA problem additions, and platform enhancements are welcome!

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/curriculum-enhancement`.
3. Commit your changes following Conventional Commits: `git commit -m "feat(curriculum): add dynamic programming module"`.
4. Ensure all tests and type checks pass: `npm test && npm run typecheck`.
5. Push to the branch: `git push origin feature/curriculum-enhancement`.
6. Open a Pull Request against `dev`.

---

## 📄 License & Attribution

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

### Educational Attribution
- Curated DSA problem formulations and patterns benchmarked against industry standards and the Striver SDE Sheet by Raj Vikramaditya ([takeuforward.org](https://takeuforward.org)).
- LeetCode problem titles and identifiers referenced under fair educational use for technical interview preparation.
- Core Computer Science and Aptitude curriculum curated from accredited university curricula and GATE CS benchmarks.

---

&copy; 2026 StackUp. All rights reserved.
