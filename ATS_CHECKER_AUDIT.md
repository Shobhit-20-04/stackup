# StackUp ATS Resume Checker — Complete Engineering Audit & Implementation Report

## Executive Summary

The StackUp ATS Resume Checker has undergone a complete architectural audit, reconstruction, and security hardening. Previously, the ATS evaluation relied on superficial heuristics (e.g. any 14 technical keywords guaranteed a 100% skills score, 4 numbers yielded near-perfect experience scores, and bullet rewrites returned hardcoded strings about Node.js latency regardless of the candidate's actual background). Furthermore, there was no Job Description matching, no candidate experience level awareness, no scanned document detection, and no defense against keyword stuffing.

This upgrade transforms the ATS Resume Checker into a modular, production-grade diagnostic engine with:
1. **Multi-Format Robust Parsing (PDF, DOCX, TXT):** Layout warning analysis, multi-column detection, date consistency validation, password-protection checks, and scanned/image-only PDF detection with actionable OCR guidance.
2. **Deterministic 7-Dimension Rubric Scoring:** Configurable weights, observable evidence tracking, point deductions, and mathematical weight rebalancing for General Quality Mode.
3. **Experience-Level Awareness:** First-class rubric adaptation for Students/Freshers (fairly evaluating projects, coursework, and hackathons without penalizing for lack of commercial tenure) vs Junior vs Mid/Senior engineers.
4. **Target Role & Custom Job Description Alignment:** 7 pre-configured engineering presets plus custom JD pasting with required vs. preferred skill extraction and responsibility alignment.
5. **Technical Skills Ontology & Anti-Stuffing Defense:** 150+ skills and canonical aliases with negative lookaheads (`Java` $\neq$ `JavaScript`, `C` $\neq$ `C++` / `C#`, `Rust` $\neq$ `trust`) and penalties for keyword stuffing ($\ge 7$ occurrences).
6. **Fact-Preserving Google XYZ Bullet Rewrites:** Restructures candidate's actual bullet points with bracketed metric placeholders (`[X% latency reduction]`) without fabricating statistics or inventing achievements.
7. **Production Verification:** 100% test pass rate across 16 resume test suites and 98 project tests, zero TypeScript errors (`tsc --noEmit`), and verified Next.js production builds.

---

## 1. Architectural File Structure

```
src/lib/services/resume/
├── types.ts              # Core interfaces: 7 dimensions, ParsingReport, JobDescriptionMatch, Recommendations
├── skills-ontology.ts    # Comprehensive skills ontology, aliases, negative lookaheads, stuffing detection
├── role-presets.ts       # 7 target SWE roles with required/preferred skills and core responsibilities
├── parser.ts             # PDF (pdf-parse 2.x), DOCX (mammoth), TXT parsing, scanned & encryption detection
├── jd-matcher.ts         # Custom JD & preset matcher, qualification gap detector, responsibility alignment
├── bullet-optimizer.ts   # Fact-preserving Google XYZ formula rewrites with metric placeholders
├── scorer.ts             # Deterministic 7-dimension scoring engine, weight rebalancing, candidate awareness
└── index.ts              # Unified entry point (analyzeResume for buffers, analyzeResumeText for sync text)

src/app/api/resume-analysis/
└── route.ts              # Production API endpoint with CSRF, rate-limiting, magic bytes, DB persistence

src/app/resume-checker/
└── page.tsx              # Interactive UI with role presets, JD paste, level pills, 7-dimension accordion

tests/
└── resume.test.ts        # 16 unit & integration tests covering all 10 core acceptance criteria
```

---

## 2. 7-Dimension Transparent Scoring Model

The scoring engine evaluates resumes across 7 distinct dimensions. If a Job Description or Target Role is provided, role-specific alignment accounts for 30% of the score. If no JD is supplied, the engine operates in **General Resume Quality Mode**, mathematically rebalancing the remaining 6 categories to maintain a 100% baseline:

| Dimension | Weight (With JD) | Weight (General Quality Mode) | Observable Evidence Evaluated |
|---|---|---|---|
| **01. Job Description Alignment** | **30%** | **0% (Rebalanced)** | Mandatory skills matched vs missing, preferred skills, core responsibilities, academic qualification gaps. |
| **02. Skills & Qualifications** | **20%** | **28.5%** | Cross-domain breadth (Languages, Frontend, Backend, Databases, DevOps, Testing), sentence-level evidence, keyword stuffing penalty. |
| **03. Experience & Project Relevance** | **15%** | **21.5%** | Candidate-level aware: Students/Freshers scored on project depth, hackathons, and capstones; experienced candidates scored on commercial scope. |
| **04. Impact & Measurable Achievements** | **10%** | **14.3%** | Authoritative action verbs (`Architected`, `Engineered`, `Optimized`), latency cuts, throughput, user scale, cost reductions. |
| **05. Structure & Readability** | **10%** | **14.3%** | Standard section headers (`Experience`, `Projects`, `Skills`, `Education`), word count bounds (300–850 words), date consistency. |
| **06. ATS Compatibility & Parsing Safety** | **10%** | **14.3%** | Digital text layer extractability, single-column reading hierarchy, header contact completeness (Email, Phone, LinkedIn, GitHub). |
| **07. Education & Relevant Credentials** | **5%** | **7.1%** | Degree title recognition, accredited CS/STEM field of study, explicit graduation year. |
| **Total** | **100%** | **100%** | **Overall ATS Score (0–100) & Grade (A+, A, B, C, D)** |

---

## 3. Key Enhancements & Defensive Measures

### A. Scanned PDF & OCR Detection
- **Problem:** When candidates upload scanned resumes or image-only PDFs, traditional parsers either fail silently or return near-zero text with a misleading low score.
- **Solution:** StackUp inspects PDF operator streams and image XObjects. If a document has multiple pages or image structures with fewer than 35 extractable words, the engine flags `isScanned: true`, sets confidence to `Scanned/OCR Required`, and displays a prominent warning in both the report summary and the UI.
- **Guidance:** Advises the user to re-export directly from Word, Google Docs, or LaTeX rather than scanning printed paper, and explains why enterprise ATS parsers cannot read pixel text.

### B. Skill Alias Normalization & Collision Prevention
- **Problem:** Simple regex patterns trigger false collisions (e.g. matching `Java` when text says `JavaScript`, matching `C` inside `C++` or `C#`, or matching `Rust` inside `trust`).
- **Solution:**
  - `Java`: Negative lookahead `/\bjava\b(?!\s*script|\s*doc)/i` strictly prevents matching `JavaScript`.
  - `C++`: Lookaround `/(?<![a-zA-Z0-9_])c\+\+(?![a-zA-Z0-9_])|\bcpp\b/i` correctly matches `C++` while ignoring word boundaries that fail on non-word symbols `+`.
  - `C`: Lookaround `/(?<![a-zA-Z0-9_])c(?![a-zA-Z0-9_+#])/` prevents matching `C++`, `C#`, or letters inside words.
  - `Go`: Contextual checks `/\bgolang\b|\bgo\s+(lang|language|developer|engineer|backend)\b|\b(built|wrote|engineered|with|using|in)\s+go\b|(?<=[,/|]\s*)go\b|\bgo(?=\s*[,/|])/i` avoid false positives on the English verb "go".

### C. Defense Against Keyword Stuffing
- **Problem:** Candidates frequently repeat skills in invisible white text or excessive lists to artificially inflate ATS scores.
- **Solution:** If any skill occurs 7 or more times in a resume under 600 words, `keyword_stuffing_detected` is flagged, a point deduction is levied on the Skills dimension, and an actionable warning explains how repetitive phrasing harms readability.

### D. Fact-Preserving Google XYZ Bullet Point Rewriting
- **Problem:** Legacy systems generated hardcoded fictional accomplishments (e.g. "reduced latency by 44% across 250k users in Node.js") regardless of what the user actually built.
- **Solution:** StackUp's `bullet-optimizer.ts` takes the candidate's **actual bullet points**, identifies passive openers (`Worked on`, `Helped with`, `Responsible for`), replaces them with authoritative engineering action verbs (`Engineered`, `Architected`, `Optimized`), and restructures the accomplishment into Google's XYZ formula:
  > `"Accomplished [X] as measured by [Y], by doing [Z]"`
- All metrics are inserted as **explicit bracketed placeholders** (e.g. `[X% latency reduction or Y hours saved per sprint]`), and a clear note instructs candidates to fill in their own verified figures.

---

## 4. Test Verification Summary

The test suite in `tests/resume.test.ts` was expanded to 16 exhaustive unit and integration tests:

1. `enforces token-bucket rate limiting correctly` (Passed)
2. `accurately parses technical resume and calculates ATS scores in General Quality Mode` (Passed)
3. `flags missing sections and low scores for sparse resumes` (Passed)
4. `resolves common aliases without false collisions` (Passed)
5. `strictly prevents false collisions with negative lookaheads` (Passed)
6. `detects and penalizes keyword stuffing` (Passed)
7. `produces high alignment when resume matches target role` (Passed)
8. `accurately identifies qualification gaps when targeting an unaligned role` (Passed)
9. `supports custom pasted job descriptions` (Passed)
10. `fairly evaluates a student/fresher with strong academic projects without penalizing corporate tenure` (Passed)
11. `rewrites weak bullets into Google XYZ formula with placeholders without fabricating metrics` (Passed)
12. `guarantees identical output scores and breakdowns when evaluated multiple times` (Passed)
13. `correctly rebalances weights across the 6 remaining dimensions when no JD is provided` (Passed)
14. `detects encrypted/password-protected PDFs` (Passed)
15. `detects scanned/image-only PDFs lacking selectable text layers` (Passed)
16. `parses plain text files with high confidence` (Passed)

**Overall Repository Test Results:**
- Test Files: 10 passed (10)
- Total Tests: 98 passed (98)
- Test Success Rate: 100%
- TypeScript (`tsc --noEmit`): 0 errors
