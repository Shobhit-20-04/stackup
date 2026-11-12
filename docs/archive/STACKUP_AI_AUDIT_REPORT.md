# STACKUP — COMPLETE AI ASSISTANT TECHNICAL AUDIT & ARCHITECTURAL OVERHAUL REPORT

**Target Repository:** `D:\stackup`  
**Branch:** `dev`  
**Execution Environment:** Node.js v22.23.2, Next.js 16.4.3 (Turbopack), Vitest v5.0.1  
**Verification Status:** 233/233 Automated Tests Passing (15 Suites), 0 TypeScript Compilation Errors, 0 ESLint Warnings, 100% Clean Production Build  

---

## 1. EXECUTIVE AUDIT SUMMARY

A comprehensive engineering audit was performed on the AI assistant integrated into StackUp (`src/app/api/chat/route.ts` and `src/components/ChatWidget.tsx`). 

### The Core Problem:
Users reported that the existing assistant frequently returned **incorrect, irrelevant, incomplete, or repetitive answers**. The audit discovered that this was not merely a model prompt issue, but a fundamental architectural failure:
1. **Silent Fallback to a 9-Keyword Mock System:** The application was hardcoded to call Anthropic's API using `process.env.ANTHROPIC_API_KEY`. However, no API key existed in `.env.local` or the production runtime. When the key was absent or any API call failed, the system silently caught the error and fell back to `generateLocalAiResponse()`.
2. **Brittle String-Matching Trap:** `generateLocalAiResponse()` relied exclusively on 9 rudimentary `if (q.includes(...))` substring checks. If a student asked about "smart pointers in C++", it returned the canned solution for "Two Sum"; if they asked about "deadlocks in database transactions", it returned OS Coffman conditions; and any question outside those 9 keywords received a generic boilerplate greeting.
3. **Zero Knowledge Retrieval (RAG):** The assistant had zero integration with StackUp's actual content—completely blind to its 150 curated DSA problems, 221 Core CS topics, 668 quiz questions, and the candidate's personalized Learning Intelligence / Mistake Journal.
4. **No Streaming & Rigid History:** The chat endpoint did not support Server-Sent Events (SSE) streaming, conversation history was naively sliced without token budgeting, and code blocks lacked copy controls.

---

## 2. AUDIT REGISTRY OF ROOT CAUSES

| Defect ID | Severity | Affected Layer | Root Cause | Symptom Experienced by Users | Remediation Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AI-BUG-01** | Critical | `src/app/api/chat/route.ts` | Missing API key triggered silent catch block dumping all traffic into a 9-keyword mock. | Users received canned, repetitive answers regardless of question nuance. | **Resolved:** Implemented multi-provider orchestrator with Google Gemini, Anthropic, and an intelligent local grounded RAG engine. |
| **AI-BUG-02** | High | `src/app/api/chat/route.ts` | Zero content grounding; model hallucinated or had no access to StackUp's 150 DSA problems or 221 CS topics. | Assistant could not reference actual StackUp problems, syllabus notes, or curriculum links. | **Resolved:** Created tokenized RAG retrieval engine indexing DSA, Core CS, Aptitude, and ATS criteria. |
| **AI-BUG-03** | High | `src/lib/services/ai/orchestrator.ts` | Lack of authenticated student context. | Assistant had no awareness of candidate's weak topics, mistake history, or spaced revisions. | **Resolved:** Integrated zero-trust auth session with Learning Intelligence / Mistake Journal data. |
| **AI-BUG-04** | Medium | `src/app/api/chat/route.ts` | Naive history slicing (`slice(-6)`) without token limits or deduplication. | Context overflow on long code inputs; repeated duplicate submissions caused model confusion. | **Resolved:** Built `conversation-manager.ts` with token budgeting, deduplication, and sliding-window protection. |
| **AI-BUG-05** | Medium | `src/components/ChatWidget.tsx` | Absence of streaming (Server-Sent Events) and code presentation controls. | Latency felt high due to single-burst JSON; code blocks had no language badges or copy buttons. | **Resolved:** Implemented SSE streaming, abort controller, language badges, and one-click code copy. |
| **AI-BUG-06** | Medium | `src/lib/services/ai/system-prompt.ts` | Weak system instructions that failed to forbid API and test-result hallucinations. | Assistant occasionally claimed code had been executed or invented non-existent library functions. | **Resolved:** Authored strict pedagogical system prompt with anti-hallucination rules and Big-O verification. |
| **AI-BUG-07** | Low | `src/lib/services/ai/code-verifier.ts` | Code snippets returned without syntax verification or execution disclaimers. | Broken syntax in code examples; ambiguity over whether code was executed. | **Resolved:** Implemented bracket/syntax validation and transparent execution disclosure disclaimers. |

---

## 3. ARCHITECTURAL RE-ENGINEERING

```
+---------------------------------------------------------------------------------+
|                                Frontend Client                                  |
|  ChatWidget.tsx: SSE Streaming | Code Copy | Regenerate | Clear Chat | Models   |
+---------------------------------------+-----------------------------------------+
                                        | POST /api/chat (SSE / JSON)
                                        v
+---------------------------------------------------------------------------------+
|                               API Route Guard                                   |
|  CSRF Origin Verification | Rate Limiting (30 req/min) | Zero-Trust Session Auth|
+---------------------------------------+-----------------------------------------+
                                        |
                                        v
+---------------------------------------------------------------------------------+
|                             AI Orchestrator                                     |
|  - Token-Budgeted Conversation History (Sliding Window & Deduplication)          |
|  - Personalized Learning Context (User Weak Topics, Mistake Journal, SM-2)     |
|  - In-Memory Knowledge Retrieval (DSA 150 Problems + 221 Core CS Topics + ATS)  |
|  - Static Syntax Validation & Honest Sandbox Verification Reporting             |
+----------+----------------------------+-----------------------------+-----------+
           |                            |                             |
           v                            v                             v
+----------------------+     +-----------------------+     +----------------------+
|  Google Gemini       |     |  Anthropic Claude     |     |  StackUp Grounded AI |
|  @google/genai SDK   |     |  REST / SSE Fallback  |     |  Offline RAG Engine  |
|  (gemini-3.8-flash)  |     |  (claude-3-5-sonnet)  |     |  (Zero External Key) |
+----------------------+     +-----------------------+     +----------------------+
```

### 3.1 Provider Abstraction & Google Gemini Integration
Integrated the official `@google/genai` (v2.29+) SDK using the modern interactions API:
- Configurable via `AI_PROVIDER=gemini` (default when key is present).
- Primary model: `gemini-3.8-flash` (balanced, ultra-fast 1M token context).
- Configurable alternatives: `gemini-3.5-flash-lite`, `gemini-4-argon`.
- Server-side key storage (`GEMINI_API_KEY`) strictly isolated from the browser.
- Full streaming support via `client.models.generateContentStream`.

### 3.2 Dynamic Retrieval-Augmented Generation (RAG)
Created `src/lib/services/ai/rag-engine.ts`:
- **DSA Problem Ingestion:** Matches candidate queries against 150 problems by title, pattern tag, summary, and complexity. Injects exact problem IDs, approaches, constraints, and verified Big-O complexities.
- **Curriculum Ingestion:** Matches queries across all 15 Core CS subjects and 4 Aptitude categories. Extracts key takeaways, notes excerpts, and quiz rationales.
- **Section-Aware Filtering:** When the candidate is in `/aptitude`, boosts aptitude quantitative topics; when in `/core-cs`, boosts systems topics; when in `/dsa`, boosts algorithmic patterns.
- **Deduplication & Token Capping:** Caps retrieved context at ~1,500 tokens to prevent context dilution.

### 3.3 Personalized Student Learning Integration
When the user is authenticated via StackUp's cryptographically signed session cookie:
- Queries their active Mistake Journal and SuperMemo SM-2 Spaced Revision Queue.
- Retrieves their top diagnosed weak topics (e.g. Dynamic Programming, Binary Search).
- Enables the assistant to answer questions like *"What should I revise today?"* or *"Why do I keep failing Two Pointers?"* with authentic, user-specific data.

### 3.4 Static Verification & Anti-Hallucination Guardrails
Created `src/lib/services/ai/code-verifier.ts` and `src/lib/services/ai/system-prompt.ts`:
- Bracket, brace, parenthesis, and string literal balance verification.
- Mixed tabs/spaces indentation detection in Python.
- Explicit requirement: The model must state worst-case Time and Space Complexity with Big-O notation and mathematical justification.
- Strict prohibition against claiming remote execution unless actual sandbox output was received. Theoretical snippets include transparent static verification notices.

---

## 4. VERIFICATION RESULTS & TEST METRICS

A dedicated 19-test evaluation suite was authored in `tests/ai-evaluation.test.ts` across 7 distinct categories.

### Full Test Suite Run (`npm test`):
```text
 ✓ tests/dsa.test.ts (4 tests) 38ms
 ✓ tests/session.test.ts (13 tests) 21ms
 ✓ tests/security.test.ts (39 tests) 96ms
 ✓ tests/striver.test.ts (22 tests) 89ms
 ✓ tests/theme.test.ts (8 tests) 8ms
 ✓ tests/auth.test.ts (9 tests) 172ms
 ✓ tests/coding-workspace.test.ts (38 tests) 19ms
 ✓ tests/learning-intelligence.test.ts (24 tests) 239ms
 ✓ tests/progress.test.ts (3 tests) 5ms
 ✓ tests/content-audit.test.ts (4 tests) 17ms
 ✓ tests/curriculum.test.ts (8 tests) 40ms
 ✓ tests/chat.test.ts (3 tests) 3ms
 ✓ tests/ai-evaluation.test.ts (19 tests) 33ms
 ✓ tests/resume.test.ts (16 tests) 327ms
 ✓ tests/admin.test.ts (23 tests) 966ms

 Test Files  15 passed (15)
      Tests  233 passed (233)
   Duration  2.19s
```

### Static Analysis & Build Verification:
- **TypeScript (`npm run typecheck`):** **0 errors**.
- **ESLint (`npm run lint`):** **0 errors, 0 warnings**.
- **Production Build (`npm run build`):** Clean Next.js 16.4.3 Turbopack build in 2.9s.
