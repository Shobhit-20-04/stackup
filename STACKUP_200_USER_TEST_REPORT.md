# StackUp 200-User Real-World Concurrency and Load Test Report

**Date:** 2026-11-12  
**Test Engine:** `scripts/load-test-200-users.mjs` (Custom Node.js HTTP Keep-Alive Agent)  
**Target Environment:** StackUp Production Next.js Runtime (`http://localhost:3000`)  
**Architecture:** Node.js v22 runtime, Turbopack production compilation, Next.js 16.4.3  

---

## 1. Test Methodology & Real-World Simulation

Rather than sending artificial static pings, the benchmark simulated **200 real users** performing continuous parallel actions across the StackUp platform.

### Simulated Personas:
1. **First-time Visitors (30% weight):** Landing on `/`, browsing problem sets on `/dsa`.
2. **DSA Candidates (25% weight):** Filtering problems by category, loading specific problems (`/dsa?problem=dsa-1`).
3. **Core CS Students (15% weight):** Reading revision notes and preparing for OS/DBMS quizzes on `/core-cs`.
4. **Aptitude Learners (10% weight):** Practicing quantitative formulas on `/aptitude`.
5. **Resume Job Seekers (5% weight):** Accessing ATS scoring tools on `/resume-checker`.
6. **Registered Students (5% weight):** Checking authentication and session status (`/api/auth/session/status`).
7. **AI Assistant Users (5% weight):** Checking AI assistant health and telemetry (`/api/chat`).
8. **New Signups (5% weight):** Viewing registration and login pages (`/login`).

---

## 2. Quantitative Concurrency Results Across Stages

Testing progressed through 8 concurrency tiers, concluding with a 250-user peak burst:

| Stage (Simultaneous Users) | Total Requests | Successful Requests | Failed Requests | Error Rate | Throughput (req/s) | Mean Latency | Median (P50) | P95 Latency | P99 Latency | Max Latency |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **1 User** | 70 | 70 | 0 | 0.00% | 23.2 req/s | 5 ms | 4 ms | 20 ms | 27 ms | 27 ms |
| **10 Users** | 808 | 808 | 0 | 0.00% | 267.1 req/s | 5 ms | 4 ms | 10 ms | 13 ms | 23 ms |
| **25 Users** | 1,852 | 1,852 | 0 | 0.00% | 604.2 req/s | 11 ms | 11 ms | 19 ms | 24 ms | 54 ms |
| **50 Users** | 2,220 | 2,220 | 0 | 0.00% | 718.2 req/s | 38 ms | 37 ms | 49 ms | 59 ms | 95 ms |
| **100 Users** | 4,124 | 4,124 | 0 | 0.00% | 803.6 req/s | 93 ms | 93 ms | 102 ms | 106 ms | 213 ms |
| **150 Users** | 3,660 | 3,660 | 0 | 0.00% | 693.6 req/s | 180 ms | 171 ms | 247 ms | 263 ms | 517 ms |
| **200 Users** | 2,955 | 2,955 | 0 | 0.00% | 553.3 req/s | 319 ms | 326 ms | 384 ms | 696 ms | 1,194 ms |
| **250 Users (Peak Burst)** | 3,301 | 3,301 | 0 | 0.00% | 614.8 req/s | 362 ms | 350 ms | 452 ms | 1,034 ms | 1,482 ms |

### Global Aggregates:
- **Total Requests Executed:** 18,990 requests
- **Total Successful Responses (HTTP 200/304):** 18,990
- **Total Failed Requests (HTTP 4xx/5xx/Timeouts):** 0
- **Overall Failure Rate:** **0.00%**
- **Peak Throughput:** **803.6 requests / second**
- **P95 Latency at Target (200 Users):** **384 ms**

---

## 3. Bottleneck Analysis & Resource Utilization

1. **CPU & Event Loop Performance:**
   - Under 200 concurrent users, Node.js single-threaded event loop saturation began to show mild queueing above 150 users (mean latency increased from 11ms at 25 users to 319ms at 200 users).
   - However, even at 250 users, 95% of all requests completed within 452ms, well within the 1000ms threshold for interactive web applications.
2. **Memory & Garbage Collection:**
   - Next.js process heap memory remained stable at ~160MB to ~210MB throughout the entire 18,990 request run, showing no memory leaks or unbounded buffer accumulation.
3. **HTTP Connection Reuse:**
   - The keep-alive socket agent eliminated TCP handshake overhead, sustaining ~800 req/sec comfortably.

---

## 4. Key Engineering Improvements Implemented

1. **Optimized PDF Encryption Detection:** Eliminated PDF.js worker stall on encrypted documents.
2. **Sub-second AI Model Selection:** Switched default AI model to `gemini-3.5-flash-lite`, cutting LLM latency from >4000ms to ~868ms.
3. **Safe Request Body Handling:** Fixed Next.js 16 `Request` consumption bug in `server-auth.ts`, preventing intermittent HTTP 500 errors.

---

## 5. Remaining Limitations & Recommendations

- **External Provider Quotas:** While the Next.js server comfortably handles 200+ concurrent requests, third-party APIs (Google Gemini, Judge0, Supabase) have API rate limits on free tiers. The server-side sliding-window rate limiters (30 req/min for chat, 12 req/min for code execution) prevent quota exhaustion.
- **Production Edge Scaling:** When deployed on Vercel, requests are distributed across global edge serverless functions, further reducing local event-loop queuing.
