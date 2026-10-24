# STACKUP — DESIGN SYSTEM & VISUAL SPECIFICATION

**System Name:** StackUp Editorial Engineering System  
**Version:** 2.0.0  
**Target Environment:** Next.js 15, Tailwind CSS, Dark/Light Mode  

---

## 1. Design Philosophy

StackUp is designed for serious, high-focus learning. Every interface element exists to reduce cognitive load, present dense technical information clearly, and provide immediate tactile feedback.

- **Information Over Decoration:** Prefer structured tables, code blocks, and diagrams over empty whitespace and decorative imagery.
- **Predictable Affordances:** Buttons look like buttons, inputs look like inputs, and tabs clearly indicate state.
- **High-Contrast Readability:** Ensure all typography satisfies or exceeds WCAG 2.2 AA (4.5:1 minimum, 7:1+ preferred).

---

## 2. Color System & Semantic Roles

The brand palette is composed of five deliberate colors, paired with neutral background surfaces for both light and dark themes.

```
┌─────────────────────────────────────────────────────────────┐
│                   OFFICIAL BRAND PALETTE                    │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ Color Name   │ Hex Code     │ Role         │ Usage          │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Deep Teal    │ #044E62      │ Primary      │ Headers, Dark  │
│              │              │ Brand        │ Badges, Canvas │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Vivid Blue   │ #0D08CB      │ Primary      │ CTA Buttons,   │
│              │              │ Interactive  │ Links, Focus   │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Earth Brown  │ #4A3932      │ High-Contrast│ Dark Headings, │
│              │              │ Typography   │ Deep Accents   │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Soft Lavender│ #E9DEFA      │ Secondary    │ Tag Fills,     │
│              │              │ Accent       │ Subtle Badges  │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Soft Pink    │ #FACAE7      │ Tertiary     │ Highlights,    │
│              │              │ Accent       │ Progress Tips  │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

### Semantic Surface Tokens
```css
/* Light Theme */
--canvas-background: #F8FAFC;       /* Slate 50 */
--surface-card: #FFFFFF;            /* Pure White */
--surface-sunken: #F1F5F9;          /* Slate 100 */
--border-subtle: #E2E8F0;           /* Slate 200 */
--text-primary: #0F172A;            /* Slate 900 */
--text-secondary: #475569;          /* Slate 600 */

/* Dark Theme */
--canvas-background: #0B1020;       /* Rich Deep Blue-Black */
--surface-card: #151D35;            /* Deep Slate Navy */
--surface-sunken: #0E1528;          /* Sunken Dark Surface */
--border-subtle: #1E2B4D;           /* Crisp Indigo Border */
--text-primary: #E8EEFF;            /* High-Contrast Soft White */
--text-secondary: #8E9FC8;          /* Readable Slate Lavender */
```

---

## 3. Typography Scale & Hierarchy

StackUp utilizes the system sans-serif font stack for rapid rendering, with monospace typefaces for code and numerical data.

- **Display 1 (Hero Heading):** `text-3xl sm:text-5xl font-extrabold tracking-tight` (36px - 48px)
- **Heading 1 (Page Title):** `text-2xl sm:text-3xl font-bold tracking-tight` (24px - 30px)
- **Heading 2 (Section Title):** `text-xl sm:text-2xl font-bold` (20px - 24px)
- **Heading 3 (Card Title):** `text-base sm:text-lg font-semibold` (16px - 18px)
- **Body Regular:** `text-sm sm:text-base leading-relaxed` (14px - 16px)
- **Caption / Metadata:** `text-xs font-medium text-slate-500` (12px)
- **Code & Numerics:** `font-mono text-xs sm:text-sm tabular-nums`

---

## 4. Spacing, Geometry & Radii

All components adhere to an 8-point spatial grid with a strict 3-tier radius system:

1. **Small Components (`rounded-md` / 6px):**
   - Difficulty chips (Easy, Medium, Hard)
   - Status indicators
   - Monospace code tags
2. **Interactive Controls (`rounded-lg` / 8px):**
   - Primary and secondary buttons
   - Form input fields
   - Table row hover outlines
   - Tab toggles
3. **Structured Containers (`rounded-xl` / 12px):**
   - Cards and content panels
   - Curriculum workbench container
   - Modal dialogs
   - Code preview drawer
   - Dropdown menus

*Note: Bubble-like `rounded-3xl` (24px) containers have been completely purged from production.*

---

## 5. Focus Indicators & Accessibility Tokens

All focusable elements support visible keyboard navigation:

```css
:focus-visible {
  outline: 2px solid #0D08CB;
  outline-offset: 2px;
}
.dark :focus-visible {
  outline: 2px solid #8E9FC8;
  outline-offset: 2px;
}
```

---

## 6. Iconography & Visual Assets

Icons are powered exclusively by `lucide-react` at standardized stroke widths (1.75px) and sizes:
- Inline Metadata: 14px (`w-3.5 h-3.5`)
- Standard Action Buttons: 16px (`w-4 h-4`)
- Card Headers: 20px (`w-5 h-5`)
- Feature Section Highlights: 24px (`w-6 h-6`)
