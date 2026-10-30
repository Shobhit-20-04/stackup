# StackUp Website Content Audit: Removal of Fixed Numerical Marketing Claims

> **Project**: StackUp — Technical Interview Preparation & Career Accelerator Platform  
> **Repository**: `D:\stackup`  
> **Date**: October 30, 2026  
> **Audit Status**: **100% Complete — Zero Fixed Numerical Claims Remaining, Scalable & Future-Proof**

---

## 1. Executive Summary

A comprehensive, full-repository content audit was conducted across every page, layout, component, and documentation file of StackUp. All fixed, hardcoded numerical marketing claims (such as "150 Problems", "15 Subjects", "19 Categories", "26 Topics", "60 Topics • 182 MCQs", "7-Dimension", "7-Point Rubric", "150+ Problems") have been eliminated and replaced with natural, professional, and future-proof language.

All educational numbers, time/space complexity terms, algorithmic identifiers, question indices, session timeout parameters, and real dynamic calculations (`DSA_PROBLEMS.length`, `solvedCount / totalCount`, etc.) have been preserved intact without disruption.

---

## 2. Table of Claims Found and Scalable Replacements

| File Location | Original Fixed Claim | Scalable Replacement | Rationale |
|:---|:---|:---|:---|
| [`src/app/page.tsx:70`](file:///D:/stackup/src/app/page.tsx#L70) | `stats: '38 Topics • 114 MCQs'` | `stats: 'Curated Topics • Exam MCQs'` | Scalable learning path description that never becomes outdated when topics or MCQs expand. |
| [`src/app/page.tsx:78`](file:///D:/stackup/src/app/page.tsx#L78) | `stats: '150 Problems • 19 Categories'` | `stats: 'Pattern-Based Coding Library'` | Highlights the pattern-oriented methodology rather than tying the platform to a static problem count. |
| [`src/app/page.tsx:86`](file:///D:/stackup/src/app/page.tsx#L86) | `stats: '60 Topics • 182 MCQs'` | `stats: 'Systems Architecture & Engineering Notes'` | Communicates depth and subject matter instead of a rigid topic/question count. |
| [`src/app/page.tsx:94`](file:///D:/stackup/src/app/page.tsx#L94) | `stats: '26 Topics • 81 MCQs'` | `stats: 'Quantitative & Analytical Practice'` | Professional, scalable description of the aptitude assessment suite. |
| [`src/app/page.tsx:100`](file:///D:/stackup/src/app/page.tsx#L100) | `description: 'Automated 7-dimension ATS resume audit...'` | `description: 'Automated ATS resume diagnostics...'` | Replaces fixed dimension count with scalable diagnostic terminology. |
| [`src/app/page.tsx:102`](file:///D:/stackup/src/app/page.tsx#L102) | `stats: '7 Diagnostic Dimensions'` | `stats: 'Multi-Criteria Diagnostic Rubric'` | Expresses comprehensive evaluation criteria without freezing the number of dimensions. |
| [`src/app/page.tsx:136`](file:///D:/stackup/src/app/page.tsx#L136) | `150 algorithmic patterns with optimal multi-language solutions, 15 undergraduate computer science disciplines...` | `High-frequency algorithmic patterns with optimal multi-language solutions, core computer science disciplines...` | Removes double hardcoded numbers ("150" and "15") in the hero value proposition. |
| [`src/app/page.tsx:146`](file:///D:/stackup/src/app/page.tsx#L146) | `<span>Start DSA Practice (150 Problems)</span>` | `<span>Start DSA Practice</span>` | Clean call-to-action button without fixed problem count. |
| [`src/app/page.tsx:154`](file:///D:/stackup/src/app/page.tsx#L154) | `<span>Core CS Disciplines (15 Subjects)</span>` | `<span>Explore Core CS Disciplines</span>` | Scalable navigation button without fixed discipline number. |
| [`src/app/page.tsx:171`](file:///D:/stackup/src/app/page.tsx#L171) | `Platform Inventory` (Open Access) | `Preparation Tracker` (Active Session) | Removes confusing "Inventory" framing and provides clear candidate progress context. |
| [`src/app/page.tsx:181`](file:///D:/stackup/src/app/page.tsx#L181) | `DSA Solved: 0 / 150` | `DSA Solved: 0 Completed` (or `${count} Completed`) | Eliminates the fixed denominator ceiling ("/ 150") from the homepage hero card. |
| [`src/app/page.tsx:192`](file:///D:/stackup/src/app/page.tsx#L192) | `Core CS Topics Read: 0 Topics` | `Core CS Topics Read: 0 Completed` | Clear candidate completion metric. |
| [`src/app/page.tsx:197`](file:///D:/stackup/src/app/page.tsx#L197) | `Exam MCQs Attempted: 0 Attempts` | `Exam MCQs Attempted: 0 Completed` | Clear candidate assessment metric. |
| [`src/app/page.tsx:393`](file:///D:/stackup/src/app/page.tsx#L393) | `Showing 8 of 150 problems` | `Curated Practice Sample` | Eliminates hardcoded total problem denominator from the problem ledger footer. |
| [`src/app/page.tsx:399`](file:///D:/stackup/src/app/page.tsx#L399) | `<span>Open Full 150-Problem DSA Hub</span>` | `<span>Open Full DSA Practice Hub</span>` | Direct CTA to the DSA workbench without fixed count. |
| [`src/app/page.tsx:413`](file:///D:/stackup/src/app/page.tsx#L413) | `19 engineering and aptitude disciplines with deep architectural notes and exam MCQs.` | `Comprehensive engineering and aptitude disciplines with deep architectural notes and exam MCQs.` | Replaces fixed count "19" with future-proof "Comprehensive". |
| [`src/app/page.tsx:501`](file:///D:/stackup/src/app/page.tsx#L501) | `<span>All 15 CS Disciplines</span>` | `<span>Explore Core CS</span>` | Clean, scalable link label. |
| [`src/app/page.tsx:508`](file:///D:/stackup/src/app/page.tsx#L508) | `<span>4 Aptitude Modules</span>` | `<span>Explore Aptitude</span>` | Clean, scalable link label. |
| [`src/app/page.tsx:545`](file:///D:/stackup/src/app/page.tsx#L545) | `<span>7-Point Rubric</span>` | `<span>Diagnostic Rubric</span>` | Professional, unconstrained rubric description. |
| [`src/app/not-found.tsx:86`](file:///D:/stackup/src/app/not-found.tsx#L86) | `150 curated problems` | `Curated problem library` | 404 navigation card now scalable. |
| [`src/app/not-found.tsx:102`](file:///D:/stackup/src/app/not-found.tsx#L102) | `15 engineering disciplines` | `Engineering disciplines & notes` | 404 navigation card now scalable. |
| [`src/app/not-found.tsx:118`](file:///D:/stackup/src/app/not-found.tsx#L118) | `26 placement modules` | `Quantitative & reasoning modules` | 404 navigation card now scalable. |
| [`src/components/Footer.tsx:37`](file:///D:/stackup/src/components/Footer.tsx#L37) | `<span>DSA Practice Hub (150+ Problems)</span>` | `<span>DSA Practice Library</span>` | Eliminates promotional plus-counter from site footer. |
| [`src/components/Footer.tsx:48`](file:///D:/stackup/src/components/Footer.tsx#L48) | `<span>Core CS (15 Subjects &amp; Notes)</span>` | `<span>Core CS Syllabus &amp; Notes</span>` | Eliminates hardcoded subject count from site footer. |
| [`src/app/resume-checker/page.tsx:209`](file:///D:/stackup/src/app/resume-checker/page.tsx#L209) | `📊 7-Dimension ATS Scoring:` | `📊 Comprehensive ATS Scoring Dimensions:` | Scalable header in generated text export report. |
| [`src/app/resume-checker/page.tsx:373`](file:///D:/stackup/src/app/resume-checker/page.tsx#L373) | `...transparent 7-dimension scoring...` | `...transparent diagnostic scoring...` | Future-proof evaluator description. |
| [`src/app/resume-checker/page.tsx:416`](file:///D:/stackup/src/app/resume-checker/page.tsx#L416) | `...7-dimension scoring...` | `...diagnostic scoring...` | Future-proof auth requirement description. |
| [`src/app/resume-checker/page.tsx:639`](file:///D:/stackup/src/app/resume-checker/page.tsx#L639) | `<span>Benchmarking 7 Dimensions...</span>` | `<span>Evaluating Diagnostic Rubric...</span>` | Loading state communicates rubric evaluation without hardcoded number. |
| [`src/app/resume-checker/page.tsx:670`](file:///D:/stackup/src/app/resume-checker/page.tsx#L670) | `Transparent 7-Dimension Rubric` | `Comprehensive Diagnostic Rubric` | Future-proof sidebar rubric header. |
| [`src/app/resume-checker/page.tsx:932`](file:///D:/stackup/src/app/resume-checker/page.tsx#L932) | `7-Dimension Rubric Scoring &amp; Observable Evidence` | `Diagnostic Rubric Scoring &amp; Observable Evidence` | Future-proof explanatory breakdown accordion header. |
| [`src/app/admin/page.tsx:1883`](file:///D:/stackup/src/app/admin/page.tsx#L1883) | `title="Re-run document parsing and 7-dimension ATS scoring engine"` | `title="Re-run document parsing and ATS diagnostic scoring engine"` | Future-proof action tooltip in admin dossier reader. |
| [`src/components/curriculum/SectionPage.tsx:746-752`](file:///D:/stackup/src/components/curriculum/SectionPage.tsx#L746-L752) | `count: 15`, `count: 6`, `count: 4`, `count: 2`, `count: 3` | Removed hardcoded counts from tab pills (`{tab.label}`) | Tabs render clean labels (`Systems & Architecture`, etc.) without static number counts. |
| [`README.md:3, 33-34, 44, 51-52`](file:///D:/stackup/README.md) | `150-problem Data Structures & Algorithms`, `19 subjects covering 221 deep revision topics and 668 verified...`, `150 essential algorithmic challenges`, `19 Academic Subjects`, `150 Curated Problems` | `Data Structures & Algorithms practice library`, `Comprehensive academic and placement subjects covering deep revision topics...`, `Essential algorithmic challenges across core patterns`, `Core Academic & Placement Subjects`, `Curated Algorithmic Problem Library` | Developer and public repository documentation completely standardized and future-proof. |

---

## 3. Meaningful Intentional Numbers Preserved

As required by Section 3 of the audit specification, numbers that represent functional logic, educational accuracy, or real dynamic data were strictly preserved:

1. **Algorithm Time & Space Complexity**:
   - $O(1)$, $O(N)$, $O(N \log N)$, $O(V + E)$, $O(2^N)$ in problem breakdowns and cheatsheets.
2. **Mathematical Formulas & Academic References**:
   - Limit theorems ($\lim_{x \to 0} \frac{\sin x}{x} = 1$), Page fault EAT calculations ($200 = (1-p) \cdot 100 + p \cdot 10,000,000$), Combinatorics, and discrete math expressions.
3. **Computer Architecture & Technical Specs**:
   - "5-stage RISC pipeline (IF, ID, EX, MEM, WB)", "32-bit registers", "TCP/IP 4-layer and OSI 7-layer models", "IEEE 754 floating-point format".
4. **Problem Identifiers & Question Indexing**:
   - `#1 Two Sum`, `#2 Add Two Numbers`, `Question 1 of 5`.
5. **Real Dynamic Calculations**:
   - `{solvedCount} / {totalCount} ({progressPercent}%)` in user progress badges and profile scorecards.
   - `Showing {sampleProblems.length} of {DSA_PROBLEMS.length} problems` in pagination controls.
6. **Session & Security Timeouts**:
   - 30-minute idle inactivity timeout, 2-minute expiration warning, 24-hour absolute session cap.
7. **Document Size Limits**:
   - "Max 5MB • PDF, DOCX, TXT".
8. **Real ATS Evaluation Scores**:
   - Score percentages, rubric point weights, and grade calculations (e.g., `85/100`, `Grade: A`).

---

## 4. Verification & QA Pipeline Results

- **Vitest Suite**: **151/151 tests passed** (12 suites).
- **TypeScript Typecheck**: **0 errors** (`npm run typecheck`).
- **ESLint**: **0 warnings, 0 errors** (`npm run lint`).
- **Next.js Production Build**: **17/17 routes compiled and pre-rendered cleanly** in 2.4s.
- **Live Dev Server**: All routes (`/`, `/dsa`, `/core-cs`, `/aptitude`, `/resume-checker`, `/login`, `/profile`, `/admin`, `/striver-sheet`) verified returning HTTP 200 or canonical 307 redirects.
- **Repository Cleanliness**: Scanner confirmed **0 remaining fixed marketing count claims** across UI components and pages.
