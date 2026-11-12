# StackUp — Complete Integrated DSA Coding Workspace Implementation Report

## Executive Summary

StackUp has been upgraded with a **fully functional, production-grade online DSA coding workspace** integrated seamlessly into the existing platform architecture. Inspired by the focused ergonomics of LeetCode and HackerRank, the workspace maintains StackUp’s distinct editorial design system (featuring brand tokens `#044E62`, `#0D08CB`, and `#4A3932`).

Users can now select any problem in the DSA catalog, read its comprehensive problem statement, write code in a fully featured Monaco editor across five major programming languages, execute against sample and custom test cases, view real-time runtime diagnostics (execution time, memory consumption, stdout, stderr, compile output), and submit for server-side evaluation against hidden judging test suites.

---

## 1. Architectural Decisions & Execution Engine Selection

### Execution Engine Evaluation
During architectural evaluation, two sandboxed code execution options were audited:
1. **Piston Public API (`https://emkc.org/api/v2/piston/execute`)**:
   - Audit finding: Since February 15, 2026, the public Piston API is restricted to whitelisted domains and returns `403 Forbidden` / error for public traffic.
2. **Judge0 CE (`https://ce.judge0.com`)**:
   - Audit finding: Judge0 CE is open, fully operational, and natively supports competitive programming requirements. It returns fine-grained telemetry including CPU execution time (`time`), memory footprint (`memory`), standard output (`stdout`), standard error (`stderr`), compilation errors (`compile_output`), and standardized status IDs.

### Selected Architecture
- **Backend Adapter Pattern**: Next.js App Router API endpoints (`/api/dsa/execute` and `/api/dsa/submit`) act as a secure intermediary layer between the client and Judge0.
- **Configurable Endpoint Boundary**: Configured via `JUDGE0_API_URL`, `JUDGE0_API_KEY`, and `JUDGE0_API_HOST`. Defaults out-of-the-box to the robust Judge0 CE endpoint without requiring external configuration, while allowing single-env variable migration to self-hosted instances.
- **Zero Host Execution Risk**: No untrusted user code is executed on the Next.js server or inside the browser process. All compilation and execution occurs in sandboxed worker containers.

---

## 2. Language Runtimes & Compiler Configurations

The workspace supports five primary programming languages with specific competitive programming compilers:

| Language | Runtime / Compiler | Judge0 ID | Monaco Syntax Mode | File Extension |
| :--- | :--- | :--- | :--- | :--- |
| **Python 3** | Python 3.11.2 | `92` | `python` | `.py` |
| **C++** | GCC 14.1.0 (`-O3`, C++17) | `105` | `cpp` | `.cpp` |
| **C** | GCC 14.1.0 (C17) | `103` | `c` | `.c` |
| **Java** | OpenJDK 17.0.6 | `91` | `java` | `.java` |
| **JavaScript** | Node.js 22.8.0 | `102` | `javascript` | `.js` |

Each language is configured with idiomatic starter boilerplates matching canonical LeetCode signatures (`class Solution`), while also supporting standard I/O competitive programming scripts (`int main()` or standard input reading).

---

## 3. Monaco Editor Integration & Frontend UX

The coding workspace is implemented in `src/components/dsa/CodingWorkspace.tsx`:
- **Next.js Dynamic Loading**: Loaded dynamically with `{ ssr: false }` to avoid Next.js server-side hydration mismatches with Monaco's DOM dependencies.
- **Theme Adaptation**: Auto-detects StackUp's global theme mode (e.g., `cosmic`, `obsidian`, `lavender`) and dynamically switches Monaco between `vs-dark` and `vs` (light).
- **Editor Controls**:
  - Language selector with runtime compiler version badges.
  - Reset starter template button with confirmation modal.
  - Copy code to clipboard with visual toast feedback.
  - Fullscreen toggle for distraction-free coding.
  - Font size controls (12px to 18px).
- **Code Persistence**: Automatically persists draft code per problem and per language in browser `localStorage` (`stackup_code_${problemId}_${language}`), preventing accidental loss of progress.
- **Keyboard Shortcuts**:
  - `Ctrl + Enter` / `Cmd + Enter`: Run Code against active test cases.
  - `Ctrl + Shift + Enter` / `Cmd + Shift + Enter`: Submit Code for official judging.
  - `Escape`: Exit workspace.
- **Split-Pane Ergonomics**:
  - Left panel: Problem statement, examples, constraints, hints, and reference approaches.
  - Right top panel: Monaco code editor with real-time syntax highlighting and line numbers.
  - Right bottom panel: Resizable test bench featuring three dedicated tabs:
    1. **Test Cases**: Interactive test case runner allowing users to edit sample cases, add custom test cases, or delete custom test cases.
    2. **Run Output**: Formatted console showing per-case execution results, execution time, memory, stdout, stderr, and syntax/compilation diagnostics.
    3. **Judging Result**: Comprehensive submission breakdown displaying overall verdict (`Accepted`, `Wrong Answer`, `Time Limit Exceeded`, etc.), test case pass rate, and execution summary.
- **Mobile Responsive Drawer**: On small screens, provides a dedicated navigation segmented bar (`Problem`, `Code`, `Results`) allowing mobile and tablet users to seamlessly code and view outputs.

---

## 4. Harness & Driver Generation System

To support both canonical method-based problem solvers (`class Solution`) and traditional standard input/output programs, the workspace includes an intelligent code adapter (`src/lib/services/judge/adapters.ts`):
1. **Signature Auto-Detection**:
   - Parses reference solutions across Python, C++, Java, and JavaScript to infer method names and argument signatures.
2. **Standard I/O Direct Pass-Through**:
   - If user code defines `int main()`, `sys.stdin`, `require('readline')`, or `input()`, the code is passed directly to the compiler/runtime without modification.
3. **Automated Driver Generation (Python)**:
   - For `class Solution` code, appends an automated harness that parses multi-parameter LeetCode-style inputs (e.g., `nums = [2,7,11,15], target = 9`) using a bracket-aware tokenizer, instantiates `Solution()`, invokes the solver method, and normalizes output into canonical JSON format.
4. **Output Comparison Engine (`compareOutputs`)**:
   - Normalizes trailing whitespace, newlines (`\r\n` vs `\n`), boolean casing (`True` vs `true`), and JSON array formatting (`[0, 1]` vs `[0,1]`) to prevent false negatives.

---

## 5. Testcase Management & Evaluation Pipeline

The testcase pipeline is implemented in `src/lib/services/judge/testcases.ts`:
- **Sample Test Cases**: Automatically extracted from the existing problem catalog in `src/lib/data/dsa.ts`.
- **Custom Test Cases**: Users can add, modify, and delete custom test inputs up to the security threshold.
- **Server-Side Curated Judging Suites**:
  - Canonical interview problems (e.g., Two Sum, Best Time to Buy and Sell Stock, 3Sum, Valid Palindrome, Trapping Rain Water, etc.) include curated hidden test cases covering edge cases (empty inputs, negative values, duplicates, large boundary constraints).
- **Client Sanitization**:
  - The `/api/dsa/submit` endpoint strictly sanitizes hidden test cases before returning results to the client. Hidden test case inputs and expected outputs are masked as `[Hidden Test Case Input]` and `[Hidden Test Case Output]` to protect test vectors from client-side inspection.

---

## 6. Security & Defense in Depth

The workspace incorporates multi-layer security protections in `src/lib/services/judge/security.ts`:
1. **Token Bucket Rate Limiting**:
   - Enforces a maximum burst of 12 executions per minute per client IP, with gradual token replenishment.
2. **Payload Size Guardrails**:
   - Source code limited to a maximum of 64 KB (`MAX_SOURCE_CODE_BYTES`).
   - Test case inputs limited to 16 KB per case (`MAX_INPUT_BYTES`).
   - Maximum of 8 test cases per single execution run (`MAX_TEST_CASES_PER_RUN`).
3. **Execution Guardrails**:
   - 3-second CPU time limit per test case.
   - 128 MB RAM limit per container process.
4. **Strict Type and Language Whitelisting**:
   - Only explicitly supported language IDs (`python`, `cpp`, `c`, `java`, `javascript`) are processed.

---

## 7. Backend API Endpoints

### 1. `POST /api/dsa/execute`
- **Purpose**: Executes user code against sample and custom test cases.
- **Request Body**:
  ```json
  {
    "problemId": "dsa-1",
    "language": "python",
    "sourceCode": "class Solution: ...",
    "testCases": [
      { "id": "custom-1", "input": "nums = [2,7,11,15], target = 9", "expectedOutput": "[0,1]" }
    ]
  }
  ```
- **Response**: Returns overall verdict, compilation errors (if any), and array of per-case execution results with execution times, memory usage, stdout, stderr, and match status.

### 2. `POST /api/dsa/submit`
- **Purpose**: Submits user code for official evaluation against sample and hidden server test cases.
- **Request Body**:
  ```json
  {
    "problemId": "dsa-1",
    "language": "python",
    "sourceCode": "class Solution: ..."
  }
  ```
- **Response**: Returns overall verdict (`Accepted`, `Wrong Answer`, etc.), total passed / total test cases, execution metrics, and sanitized case results.

---

## 8. Integration Points

1. **DSA Hub Main Catalog (`src/app/dsa/page.tsx`)**:
   - Added high-contrast `"Solve & Code"` buttons to all problem cards and table rows.
   - Added `"Open Code Workspace"` button inside the expanded solution tabs.
   - Deep-linking support: opening `/dsa?problem=dsa-1` or navigating from problem links immediately activates the workspace for that problem.
2. **Zero Information Architecture Regression**:
   - No separate duplicate coding website or separate URL paths created.
   - The workspace operates as an integrated modal/drawer inside the existing `/dsa` workflow.

---

## 9. Verification & Quality Assurance

### Vitest Automated Test Suite
A dedicated test suite was implemented in `tests/coding-workspace.test.ts` covering:
- Language configuration and compiler ID validity.
- Security limit validation (payload sizes, language whitelisting, empty code checks, rate limiting).
- Output normalization and equivalence matching.
- Starter code generation and driver harness generation.
- Hidden test case masking and sanitization.

**Overall Test Results:**
- **13 Test Suites**: 100% Passed.
- **172 Unit & Integration Tests**: 100% Passed.
- **Execution Time**: ~1.93s.

### Static Analysis & Build Checks
- `npm run typecheck`: **0 errors**.
- `npm run lint`: **0 errors, 0 warnings**.
- `npm run build`: **Next.js 16.4.3 Turbopack production build compiled all 19 static and dynamic routes successfully.**

---

## 10. File Modification & Creation Inventory

| File | Status | Description |
| :--- | :--- | :--- |
| `src/lib/services/judge/types.ts` | **Created** | Core type contracts, language configs, verdicts, and API interfaces. |
| `src/lib/services/judge/security.ts` | **Created** | Rate limiter, payload size limits, and security validators. |
| `src/lib/services/judge/judge0.ts` | **Created** | Server-side Judge0 client with timeout handling and error mapping. |
| `src/lib/services/judge/adapters.ts` | **Created** | Starter code generator, harness builder, and output comparison logic. |
| `src/lib/services/judge/testcases.ts` | **Created** | Sample and hidden judging test case provider with edge case suites. |
| `src/app/api/dsa/execute/route.ts` | **Created** | `Run Code` API endpoint. |
| `src/app/api/dsa/submit/route.ts` | **Created** | `Submit` judging API endpoint with response sanitization. |
| `src/components/dsa/CodingWorkspace.tsx` | **Created** | Full-featured Monaco coding workspace component. |
| `src/app/dsa/page.tsx` | **Modified** | Integrated workspace modal, solve buttons, and query param deep linking. |
| `package.json` | **Modified** | Added `@monaco-editor/react` and `monaco-editor`. |
| `tests/coding-workspace.test.ts` | **Created** | Comprehensive Vitest suite for judge service and workspace logic. |

---

## 11. Production Verification Commands

To verify the implementation independently, execute:

```bash
# 1. Run all unit and integration test suites
npm --prefix D:\stackup test

# 2. Run TypeScript type checker
npm --prefix D:\stackup run typecheck

# 3. Run ESLint across entire repository
npm --prefix D:\stackup run lint

# 4. Run Next.js production build
npm --prefix D:\stackup run build
```
