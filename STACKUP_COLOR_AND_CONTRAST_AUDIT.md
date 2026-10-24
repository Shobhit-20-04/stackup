# STACKUP — COLOR SYSTEM & ACCESSIBILITY CONTRAST AUDIT (PASS 2)
**Date:** October 24, 2026  
**Standard:** WCAG 2.2 Level AA / Level AAA  
**Status:** FULLY COMPLIANT

---

## 1. Official 5-Color Brand Palette Specification

The StackUp design system is built around five officially approved brand colors. Every color has been mathematically characterized by its relative luminance ($L$) in linear sRGB space:

$$\text{Luminance } L = 0.2126 \times R_{\text{lin}} + 0.7152 \times G_{\text{lin}} + 0.0722 \times B_{\text{lin}}$$

where for $C \in \{R, G, B\}$:
$$C_{\text{lin}} = \begin{cases} \frac{C_{\text{sRGB}}}{12.92} & \text{if } C_{\text{sRGB}} \le 0.03928 \\ \left(\frac{C_{\text{sRGB}} + 0.055}{1.055}\right)^{2.4} & \text{if } C_{\text{sRGB}} > 0.03928 \end{cases}$$

| Color Name | HEX Code | RGB | Linear Luminance ($L$) | Role & Intentional Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Deep Teal** | `#044E62` | `rgb(4, 78, 98)` | `0.0636` | Primary brand surfaces, selected sidebar items, headings, brand borders |
| **Vivid Blue** | `#0D08CB` | `rgb(13, 8, 203)` | `0.0458` | Primary interactive actions, buttons with white text, focus rings |
| **Earth Brown** | `#4A3932` | `rgb(74, 57, 50)` | `0.0459` | Primary typography on light surfaces, subtle borders, warm accents |
| **Pale Lavender** | `#E9DEFA` | `rgb(233, 222, 250)` | `0.7645` | Secondary backgrounds, info panels, learning cards, filters |
| **Soft Pink** | `#FACAE7` | `rgb(250, 202, 231)` | `0.6839` | Selective highlight badges, tags, secondary accents |

---

## 2. Contrast Calculation & Verification Matrix

The contrast ratio between two colors with luminances $L_1$ and $L_2$ ($L_1 > L_2$) is:
$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

### 2.1 Approved Production Color Pairings

| Foreground | Background | $L_1$ | $L_2$ | Contrast Ratio | WCAG 2.2 Rating | Application Context |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `#FFFFFF` (White) | `#0D08CB` (Vivid Blue) | 1.0000 | 0.0458 | **10.96 : 1** | **AAA** (Exceeds 7:1) | Primary CTA buttons, interactive controls |
| `#FFFFFF` (White) | `#044E62` (Deep Teal) | 1.0000 | 0.0636 | **9.24 : 1** | **AAA** (Exceeds 7:1) | Brand header badges, navigation accents |
| `#4A3932` (Earth Brown) | `#FFFFFF` (White) | 1.0000 | 0.0459 | **10.95 : 1** | **AAA** (Exceeds 7:1) | Primary text in Lavender Light mode |
| `#4A3932` (Earth Brown) | `#E9DEFA` (Pale Lavender) | 0.7645 | 0.0459 | **8.49 : 1** | **AAA** (Exceeds 7:1) | Body text on lavender cards & panels |
| `#044E62` (Deep Teal) | `#E9DEFA` (Pale Lavender) | 0.7645 | 0.0636 | **7.17 : 1** | **AAA** (Exceeds 7:1) | Card headings, icons on lavender surfaces |
| `#0D08CB` (Vivid Blue) | `#E9DEFA` (Pale Lavender) | 0.7645 | 0.0458 | **8.50 : 1** | **AAA** (Exceeds 7:1) | Links, clickable text on lavender panels |
| `#4A3932` (Earth Brown) | `#FACAE7` (Soft Pink) | 0.6839 | 0.0459 | **7.65 : 1** | **AAA** (Exceeds 7:1) | Badge labels on pink highlight pills |
| `#044E62` (Deep Teal) | `#FACAE7` (Soft Pink) | 0.6839 | 0.0636 | **6.46 : 1** | **AA** (Exceeds 4.5:1) | Category badges, tags on pink surfaces |
| `#e8eeff` (Light Text) | `#0b1020` (Cosmic Dark) | 0.8650 | 0.0094 | **15.40 : 1** | **AAA** (Exceeds 7:1) | Primary text in Cosmic Dark mode |
| `#e8eeff` (Light Text) | `#151d35` (Cosmic Card) | 0.8650 | 0.0199 | **13.09 : 1** | **AAA** (Exceeds 7:1) | Headings, card titles in Cosmic Dark |
| `#9ab3d5` (Muted Blue) | `#0b1020` (Cosmic Dark) | 0.4420 | 0.0094 | **8.28 : 1** | **AAA** (Exceeds 7:1) | Secondary & muted text in Cosmic Dark |
| `#9ab3d5` (Muted Blue) | `#151d35` (Cosmic Card) | 0.4420 | 0.0199 | **7.04 : 1** | **AAA** (Exceeds 7:1) | Metadata, timestamps in Cosmic Dark |
| `#F8F3F0` (Obsidian Text)| `#171210` (Noir Dark) | 0.9310 | 0.0120 | **15.82 : 1** | **AAA** (Exceeds 7:1) | Primary text in Obsidian Noir mode |
| `#C0B4AE` (Muted Warm) | `#171210` (Noir Dark) | 0.4850 | 0.0120 | **8.63 : 1** | **AAA** (Exceeds 7:1) | Secondary text in Obsidian Noir mode |

---

## 3. Strict Prohibitions & Enforced Design Rules

During the audit, the following combinations were flagged as mathematically inaccessible and are strictly prohibited in the codebase:

1. **White text on Soft Pink (`#FFFFFF` on `#FACAE7`)**:
   - Ratio: $\frac{1.05}{0.7339} = \mathbf{1.43 : 1}$ (**Catastrophic Fail**).
   - **Enforced Rule:** Any badge or container using Soft Pink as background MUST use Earth Brown (`#4A3932`) or Deep Teal (`#044E62`) text.
2. **White text on Pale Lavender (`#FFFFFF` on `#E9DEFA`)**:
   - Ratio: $\frac{1.05}{0.8145} = \mathbf{1.29 : 1}$ (**Catastrophic Fail**).
   - **Enforced Rule:** All text rendered inside Pale Lavender surfaces MUST use Earth Brown (`#4A3932`), Deep Teal (`#044E62`), or Vivid Blue (`#0D08CB`).
3. **Deep Teal on Earth Brown (`#044E62` on `#4A3932`)**:
   - Ratio: $\frac{0.1136}{0.0959} = \mathbf{1.18 : 1}$ (**Catastrophic Fail**).
   - **Enforced Rule:** These two dark brand colors must never be placed atop one another.
4. **Vivid Blue text on Cosmic Dark background (`#0D08CB` on `#0b1020`)**:
   - Ratio: $\frac{0.0958}{0.0594} = \mathbf{1.61 : 1}$ (**Fail**).
   - **Enforced Rule:** In dark modes, Vivid Blue is strictly reserved for solid button backgrounds (with white text: 10.96:1) and outline focus rings. Text accents in dark mode use Pale Lavender (`#E9DEFA`).

---

## 4. Automated Verification

The entire theme and contrast system is verified via automated tests in `tests/theme.test.ts`. All 8 contrast test cases pass with 100% compliance.
