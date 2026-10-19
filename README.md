# StackUp

> **An all-in-one interview preparation platform for students** — structured notes and timed quizzes across Aptitude, Core CS Subjects, and DSA, plus an ATS resume checker and an AI assistant chatbot — engineered for high traffic and serverless scale from day one.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- **Database & Auth:** Supabase (PostgreSQL with Row Level Security, Google OAuth, Phone OTP)
- **Database Pooling:** PgBouncer connection pooling for serverless concurrency
- **UI Components & Icons:** Lucide React
- **Analytics & Data Visualizations:** Recharts
- **Testing:** Vitest unit test runner
- **CI/CD:** GitHub Actions (Linting, TypeScript compilation, Vitest test suite)
- **Deployment Target:** Vercel Edge Network

---

## 📁 Project Structure

```
D:\stackup/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI pipeline (lint, typecheck, test)
├── public/                      # Static assets & icons
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── callback/        # OAuth & Magic link session exchange route
│   │   ├── login/               # Google OAuth & Phone OTP authentication page
│   │   ├── profile/             # Profile dashboard (Recharts score trajectory, streaks)
│   │   ├── globals.css          # Tailwind CSS tokens & base styles
│   │   ├── layout.tsx           # Root application layout & metadata
│   │   └── page.tsx             # High-conversion platform landing page
│   ├── components/
│   │   └── Navbar.tsx           # Responsive navigation header with live auth state
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Browser client (createBrowserClient)
│   │   │   ├── server.ts        # Server client (createServerClient + cookies)
│   │   │   └── middleware.ts    # Session refresh & route guard helper
│   │   └── types/
│   │       └── database.ts      # Complete TypeScript types for Supabase schema
│   └── middleware.ts            # Root Next.js middleware enforcing mandatory auth
├── supabase/
│   └── migrations/
│       └── 20260923000000_initial_schema.sql  # Full 9-table schema + RLS + indexes
├── tests/
│   └── auth.test.ts             # Phase 1 Vitest automated test suite
├── .env.example                 # Documented environment variable template
├── CHANGELOG.md                 # Conventional commits change log
├── vitest.config.ts             # Vitest test configuration
└── package.json                 # Project configuration & scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** v20.x or v22.x LTS
- **npm:** v10+

### 2. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Migration
1. Open your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** -> **New Query**.
3. Copy and run the contents of [`supabase/migrations/20260923000000_initial_schema.sql`](./supabase/migrations/20260923000000_initial_schema.sql).
4. In **Authentication** -> **Providers**, enable **Google** and **Phone** (SMS). Set the Redirect URL to:
   ```
   http://localhost:3000/auth/callback
   ```
   (and add your production Vercel domain once deployed).

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Testing, Linting & Typecheck

Run the local validation suite matching the CI pipeline:
```bash
# Run unit tests
npm run test

# Run TypeScript type check
npm run typecheck

# Run ESLint
npm run lint

# Build production bundle
npm run build
```

---

## 🌿 Repository & Branching Strategy

- **`main`**: Production branch. Protected, only merges via Pull Requests.
- **`dev`**: Integration branch. All daily development work is committed here.
- **`feature/<name>`**: Feature branches branched from `dev` and merged back into `dev`.

### Connecting your GitHub Remote Repository

Create a new repository named `stackup` on your GitHub account, then link it locally:

```bash
# Add your remote origin
git remote add origin https://github.com/<YOUR-USERNAME>/stackup.git

# Push main branch
git push -u origin main

# Push dev branch
git push -u origin dev
```

---

## 📈 Roadmap & Build Phases

- [x] **Phase 1 (Weeks 1–3):** Project scaffolding, Git/CI pipeline, Supabase schema with RLS, Auth (Google OAuth, Email/Password, and 1-Click Instant Demo Login), and Profile Dashboard.
- [x] **Phase 2 (Weeks 4–7):** Aptitude + Core CS Subjects (221 modules, 668 verified MCQs, notes markdown engine, timed/practice quiz engine, YouTube video lecture links, attempts & progress sync).
- [x] **Phase 3 (Weeks 8–10):** DSA Hub & Striver SDE Sheet (150 curated problems, 19 algorithmic patterns, difficulty & pattern filters, live progress tracking, deep routing at `/dsa/[id]`, TakeUForward & LeetCode deep links, and canonical navigation).
- [x] **Phase 4 (Weeks 11–14):** Resume ATS Checker (PDF/DOCX binary upload, ATS scoring & keyword gap analysis, bullet rewrites, admin download portal).
- [x] **Phase 5 (Weeks 15–17):** Floating AI Chatbot Widget (Context-aware assistance, markdown rendering, per-user rate limiting).
- [x] **Phase 6 (Weeks 18–20+):** Performance optimization, accessibility pass, SEO, robots.txt, and launch prep.

---

### 🧩 Phase 3 — DSA Hub & Striver SDE Sheet (Detailed Implementation)

The DSA Hub provides a complete, unified coding interview preparation engine directly integrated within StackUp:

#### 1. Curated Problem Dataset & Pattern Coverage
* **150 Handcrafted Problems:** Curated and fact-checked from the standard Striver SDE Sheet and top tech interview rounds.
* **Difficulty Distribution:** 27 Easy, 100 Medium, 23 Hard.
* **19 Algorithmic Patterns:**
  1. Arrays & Hashing (10 problems)
  2. Two Pointers (6 problems)
  3. Sliding Window (5 problems)
  4. Binary Search (7 problems)
  5. Linked List (12 problems)
  6. Trees & BST (16 problems)
  7. Graphs (12 problems)
  8. Dynamic Programming (4 problems)
  9. Stack & Queue (7 problems)
  10. Heap / Priority Queue (6 problems)
  11. Trie (3 problems)
  12. Backtracking (10 problems)
  13. Intervals (6 problems)
  14. Greedy (8 problems)
  15. Bit Manipulation (7 problems)
  16. Math & Geometry (7 problems)
  17. 1-D Dynamic Programming (10 problems)
  18. 2-D Dynamic Programming (7 problems)
  19. Advanced Graphs (7 problems)

#### 2. Advanced Search & Multi-Dimensional Filtering
* **Instant Keyword Search:** Real-time search by problem name, topic tag, or algorithm concept.
* **Difficulty Filters:** Quick filtering by Easy, Medium, or Hard.
* **Category Filters:** Filter by any of the 19 algorithmic pattern categories.
* **Dual View Modes:**
  * **Grouped View:** Problems organized by pattern cards showing completion progress bars.
  * **Tabular List View:** High-density table with sortable columns, difficulty badges, and direct action buttons.

#### 3. Integrated External Resources
Every problem includes verified, direct external links:
* **LeetCode Practice:** Direct link to code and submit on LeetCode.
* **Striver Guide:** Direct link to the TakeUForward editorial, code implementations, and complexity breakdowns.
* **Video Lecture:** Curated YouTube video walkthrough explaining intuition, edge cases, and code.

#### 4. Canonical Routing & URL Precedence
* **Canonical URL:** `/dsa` acts as the single source of truth for all DSA practice.
* **Deep Linking:** Dynamic route `/dsa/[id]` renders individual problem details, hints, examples, and embedded solutions.
* **Canonical Redirects:** Legacy routes (`/striver`, `/striver-sheet`, `/dsa/striver`) redirect automatically with permanent 308 HTTP redirects to maintain bookmark integrity and prevent duplicate page fragmentation.

#### 5. Automated Regression Test Suite
* **`tests/dsa.test.ts` & `tests/striver.test.ts`:**
  * Verifies that all 150 problems contain valid IDs, categories, difficulty tags, and resource URLs.
  * Verifies route precedence so keyword `/striver` never triggers a generic 404.
  * Verifies progress tracking and state sync.
