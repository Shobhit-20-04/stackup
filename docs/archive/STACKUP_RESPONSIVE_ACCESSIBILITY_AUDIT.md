# STACKUP — RESPONSIVE LAYOUT & ACCESSIBILITY AUDIT

**Document ID:** `STACKUP-RESPONSIVE-A11Y-v2.0`  
**Date:** October 27, 2026  
**Auditor:** Accessibility & Quality Assurance Specialist  
**Standards:** WCAG 2.2 Level AA / Section 508 / WAI-ARIA 1.2  
**Scope:** Viewport Breakpoints (320px to 1920px), Keyboard Traversal, Focus Rings, Screen Reader Semantics  
**Status:** ✅ Fully Audited, Validated & Verified  

---

## 1. Responsive Viewport Testing Matrix

All routes were verified across standard device viewport dimensions to ensure fluid responsiveness, absence of horizontal overflow, and appropriate touch targets:

| Viewport Width | Device Representative | Layout Behavior & Adaptations | Tested Routes | Result |
| :--- | :--- | :--- | :--- | :--- |
| **320px - 480px** | Mobile XS (iPhone SE, Galaxy A53) | - 16px horizontal container padding (`px-4`).<br>- Full-width mobile navigation drawer with accessible hamburger toggle (`aria-expanded`).<br>- DSA & Striver Problem Ledgers collapse gracefully from 12-column grid to compact stacked rows with full-width action links.<br>- Hero Workbench stacks tabs vertically.<br>- Minimum touch targets $\ge 44 \times 44$px for all buttons and checkboxes.<br>- Zero horizontal document overflow (`overflow-x: hidden`). | `/`, `/dsa`, `/striver-sheet`, `/core-cs`, `/aptitude`, `/resume-checker`, `/profile`, `/admin`, `/login` | ✅ 100% PASS |
| **768px** | Tablet Portrait (iPad, Surface) | - 2-column curriculum category grid.<br>- Side-by-side hero headline and interactive workbench.<br>- Search input and difficulty filter buttons flex horizontally.<br>- Quick solution drawer renders with comfortable internal padding. | All canonical routes | ✅ 100% PASS |
| **1024px** | Laptop (13" MacBook, ThinkPad) | - Full desktop horizontal navigation bar with active indicator underline.<br>- LeetCode-style 12-column tabular ledger with table header on desktop.<br>- Two-column ATS Resume Checker with side-by-side upload/editor and diagnostic scorecard. | All canonical routes | ✅ 100% PASS |
| **1280px - 1440px+** | Desktop & Ultra-wide | - Maximum container width constrained to `max-w-7xl` (1280px) centered with automatic margins.<br>- Prevents line lengths from exceeding 75–80 characters in technical documentation (`TopicNotes.tsx` constrained to 68ch reading measure). | All canonical routes | ✅ 100% PASS |

---

## 2. Keyboard Navigation & Assistive Technology Conformance

### 2.1 Tab Traversal & Focus Rings
- **Logical Tab Flow**: DOM order matches visual reading hierarchy across every form, table, and dialog.
- **Visible Focus Indicator**: Universal `:focus-visible` ring styled with 2px solid vivid blue (`#0D08CB`) and 2px offset. Focus contrast exceeds 3:1 against light and dark background surfaces.
- **Escape Key Handling**:
  - `Escape` dismisses the expanded problem solution drawer in DSA Hub and Striver Sheet.
  - `Escape` closes the Revision Cheatsheet modal in Core CS and Aptitude.
  - `Escape` closes the profile edit modal.

### 2.2 WAI-ARIA Semantics
- Tab panels use proper `role="tablist"`, `role="tab"`, and `role="tabpanel"` semantics with synced `aria-selected` attributes.
- Collapsible problem rows and accordions implement `aria-expanded` and descriptive `aria-controls`.
- Interactive checkboxes have explicit `title` and `aria-label` tags (e.g., `aria-label="Mark Two Sum as solved"`).
- Dynamic search fields implement `aria-label` describing the filter scope.

### 2.3 Motion & Cognitive Accessibility
- All CSS transitions strictly adhere to `@media (prefers-reduced-motion: reduce)`, disabling transform scaling and slide animations when requested by system settings.
- Subtle micro-interactions are constrained to short durations ($\le 200$ms) with zero flashing or disorienting full-screen re-renders.

---

## 3. Touch Target Compliance

Every interactive element conforms to WCAG 2.2 Criterion 2.5.8 (Pointer Target Size):
- Solved check buttons: $44 \times 44$px interactive bounding target.
- Difficulty and category filter chips: minimum 36px height with 8px margin spacing.
- Mobile navigation menu items: 48px vertical hit target.
