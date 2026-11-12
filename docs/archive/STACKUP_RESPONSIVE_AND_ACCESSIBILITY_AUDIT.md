# STACKUP — RESPONSIVE LAYOUT & ACCESSIBILITY AUDIT

**Document ID:** `STACKUP-RESPONSIVE-A11Y-v1.0`  
**Date:** October 24, 2026  
**Scope:** Viewport Breakpoints (320px to 1440px), Keyboard Navigation, Screen Reader Semantics  

---

## 1. Breakpoint Behavior Matrix

| Breakpoint | Target Devices | Layout Adaptations | Verified Pages |
| :--- | :--- | :--- | :--- |
| **Mobile XS (320px - 480px)** | iPhone SE, Galaxy S21, iPhone 14 | - Single-column flow with 16px horizontal gutter (`px-4`).<br>- Full-width mobile navigation drawer with hamburger toggle.<br>- Striver Sheet problem table switches to stacked cards with full-width action links.<br>- Hero Curriculum Workbench stacks code snippet vertically below headline.<br>- Minimum tap targets $\ge 44 \times 44$px for all interactive buttons. | Homepage, `/striver-sheet`, `/dsa`, `/resume-checker`, `/admin` |
| **Tablet (768px)** | iPad, Surface Pro, Tablets | - 2-column curriculum cards.<br>- Split hero layout with side-by-side title and interactive workbench preview.<br>- Quick drawer opens as a bottom sheet with 60vh max height.<br>- Search and filter controls render side-by-side. | All routes |
| **Desktop (1024px - 1440px)** | MacBook, Laptops, Standard Monitors | - Full multi-column layout with fixed max width (`max-w-7xl`).<br>- Top navigation with full desktop links and authenticated user menu.<br>- Striver Sheet displays high-density problem table with fixed columns: Status, ID, Title, Category, Difficulty, Resources, Quick View.<br>- Right-side drawer renders as a sticky, scrollable drawer panel. | All routes |

---

## 2. Keyboard Navigation & Assistive Technology

1. **Tab Traversal**:
   - Logical sequential DOM focus order maintained across all forms, tables, and dialogs.
   - Interactive elements (links, buttons, inputs) are fully reachable without mouse intervention.
2. **Focus Visibility**:
   - Universal `:focus-visible` ring styled with 2px solid vivid blue (`#0D08CB`) and 2px offset.
   - Contrast ratio of focus indicators exceeds 3:1 against adjacent background colors.
3. **ARIA Roles & States**:
   - `role="tablist"`, `role="tab"`, and `role="tabpanel"` applied to Homepage Curriculum Workbench and Striver Sheet code preview tabs.
   - `aria-selected` properly synchronized with active tab state.
   - `aria-expanded` and `aria-controls` wired to accordions, drawers, and mobile menu toggles.
   - Problem solved checkboxes carry descriptive `aria-label` attributes (e.g., `aria-label="Mark Two Sum as solved"`).
4. **Motion & Vestibular Disorders**:
   - Animations respect `prefers-reduced-motion` media queries.
   - Transitions are constrained to short, subtle durations (150ms - 200ms) with zero continuous spinning or flashing elements.

---

## 3. Mobile Touch Target Compliance

Every clickable action—including table row toggles, difficulty filter chips, solved checkboxes, and drawer close buttons—satisfies the Apple Human Interface Guidelines and Google Material Design recommendation of minimum $44 \times 44$ CSS pixels.

---

## 4. Verification Verdict

StackUp demonstrates zero horizontal overflow, seamless fluid responsiveness across all tested viewports (320px to 1440px), and robust keyboard accessibility.
