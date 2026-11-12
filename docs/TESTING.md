# StackUp Comprehensive Testing Guide

StackUp maintains a multi-tier automated testing strategy encompassing unit tests, service integration tests, full curriculum audits, security verification, and a 200-user concurrency benchmark.

---

## 1. Automated Vitest Test Suite

The test suite runs via Vitest and covers 15 distinct test files with **234 automated tests**:

```bash
npm test
```

### Test Suite Directory & Coverage:

| Test File | Focus Area | Tests |
|:---|:---|:---:|
| `tests/auth.test.ts` | Session token validation, cookie parsing, demo user exclusion | 9 |
| `tests/admin.test.ts` | Salted scrypt password hashing, timing-attack resistance, code expiry | 23 |
| `tests/security.test.ts` | XSS sanitization, CSRF verification, rate limiting, injection defense | 39 |
| `tests/session.test.ts` | Session heartbeat, idle timeouts, local storage sync | 13 |
| `tests/dsa.test.ts` | Problem data integrity, slug generation, starter code formats | 4 |
| `tests/coding-workspace.test.ts` | Monaco editor configuration, theme sync, keyboard shortcuts | 38 |
| `tests/striver.test.ts` | Striver SDE sheet mapping, canonical redirects, progress calculation | 22 |
| `tests/curriculum.test.ts` | Notes depth, question bounds, category IDs, quiz answer validation | 8 |
| `tests/content-audit.test.ts` | Exhaustive audit of all 150 DSA problems and 221 Core CS topics | 4 |
| `tests/learning-intelligence.test.ts` | SM-2 algorithm intervals, mistake logging, weak topic detection | 24 |
| `tests/ai-evaluation.test.ts` | Gemini provider, in-memory RAG, streaming, code syntax validator | 20 |
| `tests/chat.test.ts` | Chat endpoint validation, rate limits, history budgeting | 3 |
| `tests/resume.test.ts` | PDF parsing, encryption detection, scanned PDF diagnosis, ATS scoring | 16 |
| `tests/theme.test.ts` | CSS custom property tokens, dark/light theme switching | 8 |
| `tests/progress.test.ts` | Section progress calculations, completion metrics | 3 |
| **Total** | **Comprehensive Full-Stack Coverage** | **234** |

---

## 2. 200-User Real-World Concurrency Benchmark

StackUp includes a dedicated concurrency load testing engine in `scripts/load-test-200-users.mjs`.

### How to Run:
1. Start the production server locally:
   ```bash
   npm run build
   npm run start
   ```
2. In a separate terminal, execute the benchmark:
   ```bash
   node scripts/load-test-200-users.mjs
   ```

### Measured Benchmark Telemetry (Increasing Concurrency):

| Concurrent Users | Total Requests | Successful | Failed | Error Rate | Throughput | Mean Latency | P95 Latency | P99 Latency |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **1** | 70 | 70 | 0 | 0.00% | 23.2 req/s | 5ms | 20ms | 27ms |
| **10** | 808 | 808 | 0 | 0.00% | 267.1 req/s | 5ms | 10ms | 13ms |
| **25** | 1,852 | 1,852 | 0 | 0.00% | 604.2 req/s | 11ms | 19ms | 24ms |
| **50** | 2,220 | 2,220 | 0 | 0.00% | 718.2 req/s | 38ms | 49ms | 59ms |
| **100** | 4,124 | 4,124 | 0 | 0.00% | 803.6 req/s | 93ms | 102ms | 106ms |
| **150** | 3,660 | 3,660 | 0 | 0.00% | 693.6 req/s | 180ms | 247ms | 263ms |
| **200** | 2,955 | 2,955 | 0 | 0.00% | 553.3 req/s | 319ms | 384ms | 696ms |
| **250 (Burst)** | 3,301 | 3,301 | 0 | 0.00% | 614.8 req/s | 362ms | 452ms | 1,034ms |

- **Total Requests Evaluated:** 18,990 requests across 8 stages.
- **Overall Error Rate:** **0.00%** (zero drops, zero connection timeouts).
- **P95 Latency at 200 Users:** **384ms**.

---

## 3. Static Analysis & Type Checking

To verify strict static typing and lint cleanliness:

```bash
# TypeScript compilation check
npm run typecheck

# ESLint 9 code quality check
npm run lint
```

---

## 4. Automated Secret Scanning

Verify zero exposed API keys or private credentials exist in the codebase:

```bash
node scripts/security-audit-scan.mjs
```
Checks for Google API keys, Anthropic tokens, JWT service role secrets, and private key blocks across all tracked files.
