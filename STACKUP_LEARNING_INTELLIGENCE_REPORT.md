# STACKUP — LEARNING INTELLIGENCE & SMART REVISION SYSTEM REPORT

**Date:** November 4, 2026  
**Target Repository:** `D:\stackup`  
**Branch:** `dev`  
**Milestone:** 2 of 2 (Feature Implementation: Learning Intelligence)  
**Commit Message:** `feat: add personalized learning intelligence and smart revision`  

---

## 1. EXECUTIVE OVERVIEW

**StackUp Learning Intelligence** is a personalized learning, mistake-tracking, and smart revision system engineered to elevate student preparation across DSA, Core CS, and Aptitude. 

Prior to this feature, learners solved algorithmic problems or attempted multiple-choice quizzes in isolation. When test cases failed or conceptual gaps appeared, candidates had no structured, scientifically grounded mechanism to log their misconceptions, schedule algorithmic revisions before forgetting sets in, or receive actionable focus recommendations based on their historical error rates.

Learning Intelligence bridges this critical gap through four integrated pillars:
1. **Interactive Mistake Journal:** Structured categorization and note-taking across DSA (TLE, Wrong Answer, Null Pointer, Edge Case), Core CS, and Aptitude.
2. **SuperMemo SM-2 Spaced Repetition Engine:** Mathematically rigorous scheduling algorithm calculating dynamic interval days, repetition counts, and ease factors based on active recall quality.
3. **Algorithmic Weak-Topic Intelligence:** Automated diagnosis of struggling concept clusters with explainable reasons and targeted practice links.
4. **Daily Smart Recommendation Queue:** Priority queue surfacing overdue spaced revisions, recent problem failures, and syllabus recommendations (~35 minutes of daily focused study).
5. **In-Context Coding Workspace Integration:** One-click "Add to Mistake Journal & SM-2" shortcut directly inside the DSA coding workspace when code submission fails.

---

## 2. MATHEMATICAL & ALGORITHMIC SPECIFICATION (SM-2)

The spaced repetition scheduler follows the classic **SuperMemo SM-2 algorithm** with safety bounds and real-time interval projection:

### 2.1 Formulae:
1. **Ease Factor (EF) Adjustment:**
   $$EF' = \max\left(1.3, \, EF + \left(0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02)\right)\right)$$
   Where:
   - $q \in \{1, 2, 3, 4, 5\}$ is the candidate's recall rating.
   - Initial $EF_0 = 2.5$.
   - Minimum threshold $\text{MIN\_EASE\_FACTOR} = 1.3$ prevents interval starvation.

2. **Repetition Count ($n$) and Interval ($I$) Progression:**
   - If $q < 3$ (Recall failure / "Again"):
     $$n = 0, \quad I = 1 \text{ day}$$
   - If $q \ge 3$ (Successful recall):
     $$I(n) = \begin{cases} 
     1 \text{ day} & \text{if } n = 0 \\ 
     6 \text{ days} & \text{if } n = 1 \\ 
     \text{round}(I_{n-1} \times EF') & \text{if } n \ge 2 
     \end{cases}$$
     $$n' = n + 1$$

3. **Due Date Calculation:**
   $$\text{dueDate} = \text{currentTime} + I \times 24 \times 60 \times 60 \times 1000 \text{ ms}$$

### 2.2 Rating UI Action Map:
| Rating $q$ | Button Label | Interval Outcome | Purpose |
| :---: | :---: | :---: | :---: |
| **1** | `Again` | Reset to +1 day ($n=0$) | Complete blackout; requires immediate re-study. |
| **2** | `Hard` | Shorter interval (+3 days) | Remembered with difficulty; ease factor decreases. |
| **4** | `Good` | Standard SM-2 interval | Hesitant but correct recall; standard progression. |
| **5** | `Easy` | Accelerated interval | Instantaneous, perfect recall; bonus interval scaling. |

---

## 3. COMPONENT ARCHITECTURE & WORKFLOWS

```
                                  +------------------------------------+
                                  |     DSA Coding Workspace           |
                                  |  (Failed Submission / Test Cases)  |
                                  +-----------------+------------------+
                                                    | One-Click "Log Mistake"
                                                    v
+-------------------------------+         +---------+------------------+
|      Candidate Profile        |         |  Learning Intelligence     |
|   (/profile Dashboard View)   | <-----> |      Engine Service        |
+---------------+---------------+         +---------+------------------+
                |                                   |
    +-----------+-----------+                       |
    v           v           v                       v
+--------+  +--------+  +--------+        +---------+------------------+
| Daily  |  | Spaced |  | Weak   |        |  Secure Server API Guard   |
| Plan   |  | Queue  |  | Topics |        |  POST /api/learning-intel  |
+--------+  +--------+  +--------+        +----------------------------+
```

### 3.1 Mistake Journal & Error Types
- **DSA Module:** `wrong_answer`, `time_limit_exceeded`, `runtime_error`, `memory_limit_exceeded`, `edge_case`, `off_by_one`, `algorithmic_choice`.
- **Core CS & Aptitude Modules:** `conceptual`, `calculation`, `formula_forgotten`, `time_management`, `misread_question`.
- Every logged mistake automatically generates a linked `RevisionItem` scheduled for review in 24 hours, ensuring mistakes are revisited before knowledge decays.

### 3.2 In-Context Coding Workspace Integration
In `src/components/dsa/CodingWorkspace.tsx`:
- When a candidate submits a solution that returns `Wrong Answer`, `Time Limit Exceeded`, or `Runtime Error`, a dedicated action button appears in the verdict card:
  `[Add to Mistake Journal & SM-2]`
- Tapping this button immediately:
  1. Inspects the evaluation verdict and assigns the appropriate error category.
  2. Extracts the problem ID, problem title, and pattern tag.
  3. Formats diagnostic user notes and schedules an SM-2 review for the next day.
  4. Flips the button to `[✓ Logged in Spaced Revision]` with celebratory feedback.

### 3.3 Dashboard Hub (`LearningIntelligenceHub.tsx`)
Rendered directly within `/profile`:
- **Diagnostic Metrics Ribbon:** Displays real-time counts for Due Revisions, Total Mistakes, Diagnosed Weak Topics, and an overall SM-2 Retention Score (0–100%).
- **Interactive Flashcards:** Lets candidates reveal solution takeaways and submit instant SM-2 ratings (`Again`, `Hard`, `Good`, `Easy`) with live interval previews.
- **Search & Module Filters:** Allows filtering the Mistake Journal across DSA, Core CS, and Aptitude with keyword search.
- **Modal Logger:** Enables manual logging of any algorithmic note or concept at any time.

---

## 4. API SPECIFICATION & DATA INTEGRITY

### 4.1 Endpoints Implemented:
1. `GET /api/learning-intelligence`
   - **Protection:** Authenticated via `authenticateUserRequest(req)`.
   - **Response:** Current authenticated session status and metadata.
2. `POST /api/learning-intelligence`
   - **Protection:** CSRF verification + rate-limiting (30 req/min) + `authenticateUserRequest(req)`.
   - **Actions:**
     - `add_mistake`: Validates and sanitizes `resourceId`, `resourceTitle`, `category`, `userNotes`, and `keyTakeaway`. Returns typed `MistakeEntry`.
     - `delete_mistake`: Removes an entry by ID.
3. `POST /api/learning-intelligence/review`
   - **Protection:** CSRF verification + rate-limiting (60 req/min) + `authenticateUserRequest(req)`.
   - **Body:** `{ revisionItem: RevisionItem, rating: SM2Rating }`.
   - **Response:** Computes and returns the updated `RevisionItem` with recalculated intervals and due dates.

---

## 5. AUTOMATED TEST SUITE METRICS

A dedicated test suite was authored in `tests/learning-intelligence.test.ts` covering 14 thorough assertions:
- **SM-2 Progression:** Verified intervals across repetitions 0, 1, 2, and $n$.
- **Recall Failure:** Confirmed repetition reset and interval reduction to 1 day on rating 1.
- **Ease Factor Bounds:** Proved ease factor never falls below 1.3 even under continuous blackout ratings.
- **Interval Formatting:** Proved human-readable labels (`+1 day`, `+6 days`, `+2 mo`).
- **Weak Topic Grouping:** Verified grouping by category and critical prioritization when error count $\ge 3$.
- **Recommendation Engine:** Confirmed due revisions take precedence, followed by critical topics.
- **API Guard:** Verified unauthenticated requests return 401; authenticated requests pass; invalid schemas return 400.

**Full Test Suite Result (`npm test`):**
```text
 ✓ tests/dsa.test.ts (4 tests) 39ms
 ✓ tests/session.test.ts (13 tests) 22ms
 ✓ tests/security.test.ts (39 tests) 99ms
 ✓ tests/striver.test.ts (22 tests) 86ms
 ✓ tests/theme.test.ts (8 tests) 10ms
 ✓ tests/auth.test.ts (9 tests) 152ms
 ✓ tests/chat.test.ts (3 tests) 4ms
 ✓ tests/learning-intelligence.test.ts (14 tests) 205ms
 ✓ tests/coding-workspace.test.ts (38 tests) 18ms
 ✓ tests/progress.test.ts (4 tests) 4ms
 ✓ tests/content-audit.test.ts (4 tests) 14ms
 ✓ tests/curriculum.test.ts (8 tests) 30ms
 ✓ tests/resume.test.ts (16 tests) 276ms
 ✓ tests/admin.test.ts (23 tests) 951ms

 Test Files  14 passed (14)
      Tests  204 passed (204)
   Duration  1.97s
```

### 5.1 Static Analysis & Build Verification:
- **`npm run lint`:** 0 errors, 0 warnings.
- **`npm run typecheck`:** 0 errors.
- **`npm run build`:** Production build compiled cleanly with all 18 static pages and dynamic routes.

---

## 6. GIT COMMIT SPECIFICATION

- **Milestone:** 2
- **Target Branch:** `dev`
- **Commit Message:** `feat: add personalized learning intelligence and smart revision`
- **Files Included:**
  - `src/lib/types/learning-intelligence.ts`
  - `src/lib/services/learning-intelligence/sm2.ts`
  - `src/lib/services/learning-intelligence/intelligence-engine.ts`
  - `src/app/api/learning-intelligence/route.ts`
  - `src/app/api/learning-intelligence/review/route.ts`
  - `src/components/learning-intelligence/LearningIntelligenceHub.tsx`
  - `src/components/dsa/CodingWorkspace.tsx`
  - `src/app/profile/page.tsx`
  - `tests/learning-intelligence.test.ts`
  - `STACKUP_LEARNING_INTELLIGENCE_REPORT.md`
