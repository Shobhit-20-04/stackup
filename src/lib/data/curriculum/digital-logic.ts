import type { SectionCategory } from './types';

export const DIGITAL_LOGIC_CATEGORY: SectionCategory = {
  "id": "dld",
  "slug": "digital-logic-design",
  "title": "Digital Logic Design (DLD)",
  "description": "Boolean algebra, logic gates, K-maps, combinational circuits, flip-flops, counters, and finite-state machines.",
  "icon": "Cpu",
  "topics": [
    {
      "id": "dld-number-systems",
      "slug": "number-systems-and-base-conversions",
      "title": "Number Systems and Base Conversions",
      "description": "Binary, octal, decimal, hexadecimal, radix conversions, fractional base conversions, and radix arithmetic.",
      "estimatedMinutes": 15,
      "difficulty": "Easy",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "Radix r positional representation: value = sum(d_i * r^i).",
        "Binary to Octal groups by 3 bits; Binary to Hexadecimal groups by 4 bits.",
        "Fractional conversions: repeatedly multiply by base r and record integer parts.",
        "Base r digits range strictly from 0 to r - 1."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Number+Systems+Base+Conversions+Binary+Hexadecimal+DLD+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Number Systems and Base Conversions\n\nDigital systems process binary information encoded in positional number systems with radix $r$.\n\n---\n\n## 1. Radix Conversion Mechanics\n- **Radix $r$ Polynomial Representation:**\n  $$N_r = d_{n-1} r^{n-1} + \\dots + d_1 r^1 + d_0 r^0 + d_{-1} r^{-1} + \\dots + d_{-m} r^{-m}$$\n- **Integer Conversion to Base $r$:** Successive division by $r$; remainder sequence read from bottom-to-top (LSB to MSB).\n- **Fractional Conversion to Base $r$:** Successive multiplication by $r$; integer carry read from top-to-bottom.\n- **Power-of-Two Shortcuts ($2 \\leftrightarrow 8 \\leftrightarrow 16$):**\n  - Group 3 binary bits $\\leftrightarrow$ 1 Octal digit.\n  - Group 4 binary bits $\\leftrightarrow$ 1 Hexadecimal digit ($0-9, A-F$).\n\n---\n\n## 2. Complement Representations (Signed Integers)\nFor radix $r$ and $n$ digits:\n- **Radix Complement ($r$'s complement):** $r^n - N$ (e.g. 2's complement $= 2^n - N = 1\\text{'s complement} + 1$).\n- **Diminished Radix Complement ($(r-1)$'s complement):** $(r^n - 1) - N$ (invert all bits in binary).\n- **Range of $n$-bit 2's Complement Numbers:** $[-2^{n-1}, +2^{n-1} - 1]$. Has a unique zero ($+0$), unlike 1's complement.\n",
      "questions": [
        {
          "id": "dld-ns-1",
          "question": "What is the hexadecimal representation of the binary number (11010110)_2?",
          "options": [
            "(D6)_16",
            "(C6)_16",
            "(B6)_16",
            "(E6)_16"
          ],
          "correct_option": 0,
          "explanation": "Group into 4-bit nibbles from right: 1101 = 13 (D), and 0110 = 6. Result is (D6)_16."
        },
        {
          "id": "dld-ns-2",
          "question": "What is the decimal equivalent of the octal number (345)_8?",
          "options": [
            "229",
            "225",
            "256",
            "233"
          ],
          "correct_option": 0,
          "explanation": "3 * 8^2 + 4 * 8^1 + 5 * 8^0 = 3 * 64 + 4 * 8 + 5 = 192 + 32 + 5 = 229."
        },
        {
          "id": "dld-num-3",
          "question": "What is the decimal equivalent of the hexadecimal number (2F.4)_16?",
          "options": [
            "47.25",
            "47.4",
            "31.25",
            "47.5"
          ],
          "correct_option": 0,
          "explanation": "2 * 16^1 + 15 * 16^0 + 4 * 16^(-1) = 32 + 15 + 4/16 = 47 + 0.25 = 47.25."
        }
      ]
    },
    {
      "id": "dld-signed-numbers",
      "slug": "signed-number-representation",
      "title": "Signed Number Representation",
      "description": "Sign-magnitude, 1's complement, 2's complement representation, ranges, zero representations, and arithmetic overflow.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Samsung"
      ],
      "keyTakeaways": [
        "2's complement: Invert all bits and add 1 (MSB has negative weight -2^(n-1)).",
        "Range for n-bit 2's complement: -2^(n-1) to 2^(n-1) - 1.",
        "2's complement has a single representation for zero (0000), unlike sign-magnitude and 1's complement (+0 and -0).",
        "Overflow occurs when adding two numbers of same sign yields a result of opposite sign."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Signed+Numbers+1s+2s+Complement+Overflow+DLD+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Signed Number Representation\n\n---\n\n## 1. System Comparison for $n$ bits\n\n| Representation | MSB Meaning | Representation of Zero | Range ($n$ bits) |\n| :--- | :--- | :--- | :--- |\n| **Sign-Magnitude** | Sign (0 = +, 1 = -) | $+0$ and $-0$ (Two zeros!) | $-(2^{n-1} - 1)$ to $+(2^{n-1} - 1)$ |\n| **1's Complement** | Sign (Invert bits for -) | $+0$ and $-0$ (Two zeros!) | $-(2^{n-1} - 1)$ to $+(2^{n-1} - 1)$ |\n| **2's Complement** | Weight is $-2^{n-1}$ | **Single Zero** ($00\\dots0$) | **$-2^{n-1}$ to $+(2^{n-1} - 1)$** |\n\n---\n\n## 2. 2's Complement Shortcut\nTo negate a binary number: Start from right, copy all bits up to and including the first `1`, then invert all remaining bits to the left.\n",
      "questions": [
        {
          "id": "dld-sn-1",
          "question": "What is the range of numbers that can be represented using 8-bit 2's complement representation?",
          "options": [
            "-127 to +127",
            "-128 to +127",
            "-128 to +128",
            "0 to 255"
          ],
          "correct_option": 1,
          "explanation": "For n bits in 2's complement, range is -2^(n-1) to 2^(n-1) - 1. For n = 8: -2^7 to 2^7 - 1 = -128 to +127."
        },
        {
          "id": "dld-sn-2",
          "question": "What is the 8-bit 2's complement representation of -25?",
          "options": [
            "11100111",
            "11001001",
            "10011001",
            "11100110"
          ],
          "correct_option": 0,
          "explanation": "+25 in 8 bits = 00011001. 1's complement = 11100110. Add 1: 11100110 + 1 = 11100111."
        },
        {
          "id": "dld-sign-3",
          "question": "In an 8-bit system using 2's complement representation, what is the value of the binary pattern 10000000_2?",
          "options": [
            "-128",
            "+128",
            "-0",
            "-127"
          ],
          "correct_option": 0,
          "explanation": "In an 8-bit 2's complement representation, the MSB has weight -2^7 = -128. Pattern 10000000 evaluates to -128 (the minimum representable 8-bit signed integer)."
        }
      ]
    },
    {
      "id": "dld-fixed-and-floating-point",
      "slug": "fixed-point-and-floating-point-representation",
      "title": "Fixed-Point and Floating-Point Representation",
      "description": "IEEE 754 standard (single precision 32-bit, double precision 64-bit), sign bit, biased exponent, mantissa, and denormalized numbers.",
      "estimatedMinutes": 16,
      "difficulty": "Hard",
      "companyTags": [
        "Intel",
        "NVIDIA",
        "AMD",
        "Qualcomm"
      ],
      "keyTakeaways": [
        "IEEE 754 Single Precision (32 bits): 1 Sign bit, 8 Exponent bits (bias 127), 23 Mantissa bits.",
        "Double Precision (64 bits): 1 Sign bit, 11 Exponent bits (bias 1023), 52 Mantissa bits.",
        "Normalized value: (-1)^S * 1.M * 2^(E - bias) with implicit leading 1.",
        "Special values: E = 255 with M = 0 is Infinity; E = 255 with M != 0 is NaN (Not a Number)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=IEEE+754+Floating+Point+Representation+Single+Double+Precision+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Fixed-Point and Floating-Point Computer Arithmetic\n\nComputer hardware represents real numbers using either fixed-point notation (where the binary radix point is located at a predetermined bit position) or floating-point notation (where the radix point floats dynamically, scaled by an exponent). Modern general-purpose processors standardize floating-point arithmetic according to the **IEEE 754 Standard**.\n\n---\n\n## 1. Fixed-Point vs. Floating-Point Representation\n\n| Attribute | Fixed-Point Representation | Floating-Point (IEEE 754) |\n| :--- | :--- | :--- |\n| **Radix Point Position** | Static / predetermined (e.g. $Q_{m.n}$ format with $m$ integer bits and $n$ fraction bits). | Dynamic / scaled via an explicit biased exponent field. |\n| **Dynamic Range** | Very limited ($[-(2^{m-1}), 2^{m-1} - 2^{-n}]$). | Enormous ($10^{-38}$ to $10^{38}$ for 32-bit single precision). |\n| **Hardware Complexity** | Simple integer ALU operations (addition, shift, subtract). | Dedicated Floating-Point Unit (FPU) with barrel shifters and normalization logic. |\n| **Typical Use Cases** | Low-power DSPs, microcontrollers, embedded audio processing, financial ledger systems. | Scientific computing, 3D graphics (GPUs), AI/ML matrix calculations, general-purpose computing. |\n\n---\n\n## 2. IEEE 754 Binary Formats\n\nThe IEEE 754 standard defines standard precisions:\n\n| Format | Total Bits | Sign ($S$) | Exponent ($E$) | Bias | Mantissa / Fraction ($M$) | Precision |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **Single Precision (binary32)** | 32 | 1 bit | 8 bits | 127 | 23 bits (24 effective) | $\\approx 7$ decimal digits |\n| **Double Precision (binary64)** | 64 | 1 bit | 11 bits | 1023 | 52 bits (53 effective) | $\\approx 15-17$ decimal digits |\n\n### Mathematical Formula for Normalized Numbers\n$$\\text{Value} = (-1)^S \\times (1.M)_2 \\times 2^{E - \\text{Bias}}$$\n- **Implicit Leading 1:** Because normalized binary numbers always begin with a non-zero bit (`1.xxxxx`), the leading `1` is not physically stored, granting 1 bonus bit of precision (24 bits effective precision from 23 physical bits).\n\n---\n\n## 3. Special Value Encodings (Case Analysis)\n\nIn IEEE 754 Single Precision ($E \\in [0, 255]$):\n\n| Exponent ($E$) | Fraction ($M$) | Mathematical Classification | Description & Behavior |\n| :--- | :--- | :--- | :--- |\n| **$E = 0$** | $M = 0$ | **Signed Zero ($+0$ and $-0$)** | Distinguishes directional limits (e.g., $1 / +0 = +\\infty$, $1 / -0 = -\\infty$). |\n| **$E = 0$** | $M \\ne 0$ | **Subnormal (Denormalized)** | Value $= (-1)^S \\times (0.M)_2 \\times 2^{-126}$. Provides gradual underflow near zero without implicit leading 1. |\n| **$1 \\le E \\le 254$** | Any | **Normalized Numbers** | Standard floating-point values: $(-1)^S \\times (1.M)_2 \\times 2^{E - 127}$. |\n| **$E = 255$** | $M = 0$ | **Infinity ($+\\infty$ and $-\\infty$)** | Results from division by zero or arithmetic overflow. |\n| **$E = 255$** | $M \\ne 0$ | **NaN (Not a Number)** | Results from invalid operations (e.g. $0/0$, $\\sqrt{-1}$, $\\infty - \\infty$). Categorized into Signaling (sNaN) and Quiet (qNaN). |\n\n---\n\n## 4. Converting a Real Number to IEEE 754 (Step-by-Step)\n\nExample: Convert decimal $-13.625$ to 32-bit IEEE 754:\n1. **Sign bit:** Number is negative $\\implies S = 1$.\n2. **Convert to binary:**\n   - Integer part: $13_{10} = 1101_2$\n   - Fractional part: $0.625_{10} = 0.5 + 0.125 = \\frac{1}{2} + \\frac{1}{8} = 0.101_2$\n   - Combined: $13.625_{10} = 1101.101_2$\n3. **Normalize:**\n   $$1101.101_2 = 1.101101_2 \\times 2^3$$\n4. **Compute Biased Exponent:**\n   $$E = \\text{Exponent} + \\text{Bias} = 3 + 127 = 130_{10} = 10000010_2$$\n5. **Compute Mantissa:**\n   Remove the leading implicit `1`: Mantissa $= 10110100000000000000000_2$ (padded to 23 bits).\n6. **Final 32-bit Hex representation:**\n   `1 10000010 10110100000000000000000` $\\implies$ `0xC15A0000`.\n",
      "questions": [
        {
          "id": "dld-fp-1",
          "question": "What is the exponent bias used in IEEE 754 Single Precision 32-bit floating-point numbers?",
          "options": [
            "128",
            "127",
            "1023",
            "255"
          ],
          "correct_option": 1,
          "explanation": "Single precision uses an 8-bit exponent with a bias of 2^(8-1) - 1 = 127."
        },
        {
          "id": "dld-fp-2",
          "question": "In IEEE 754 single precision, what does the encoding with Exponent = 255 and non-zero Mantissa represent?",
          "options": [
            "Infinity",
            "Underflow",
            "NaN (Not a Number)",
            "Zero"
          ],
          "correct_option": 2,
          "explanation": "Exponent = 255 with a non-zero fraction/mantissa is reserved specifically to represent NaN (Not a Number)."
        },
        {
          "id": "dld-fp-3",
          "question": "In IEEE 754 single-precision floating point format (32-bit), how many bits are allocated to the Sign, Exponent, and Mantissa (fraction)?",
          "options": [
            "1 sign, 8 exponent, 23 mantissa",
            "1 sign, 11 exponent, 20 mantissa",
            "2 sign, 8 exponent, 22 mantissa",
            "1 sign, 7 exponent, 24 mantissa"
          ],
          "correct_option": 0,
          "explanation": "IEEE 754 single-precision allocates 1 bit for sign, 8 bits for biased exponent (bias 127), and 23 bits for the normalized mantissa fraction with an implicit leading 1."
        }
      ]
    },
    {
      "id": "dld-boolean-algebra",
      "slug": "boolean-algebra",
      "title": "Boolean Algebra",
      "description": "Huntington postulates, De Morgan's laws, consensus theorem, Shannon's expansion theorem, and algebraic minimization.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "De Morgan's Laws: (A + B)' = A'B'; (AB)' = A' + B'.",
        "Consensus Theorem: AB + A'C + BC = AB + A'C (BC is redundant).",
        "Shannon's Expansion Theorem: f(x1, x2, ...) = x1 * f(1, x2, ...) + x1' * f(0, x2, ...).",
        "Involution Law: (A')' = A."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Boolean+Algebra+DLD+Consensus+Theorem+De+Morgan+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Boolean Algebra and Logic Axioms\n\nBoolean algebra operates on binary variables $\\{0, 1\\}$ under AND ($\\cdot$), OR ($+$), and NOT ($'$) operations.\n\n---\n\n## 1. Fundamental Theorems & Dualities\n- **Duality Principle:** Any valid Boolean equality remains valid if $+$ and $\\cdot$ are interchanged, and $0$ and $1$ are interchanged.\n- **Identity Laws:** $A + 0 = A$, $A \\cdot 1 = A$.\n- **Null / Annihilator Laws:** $A + 1 = 1$, $A \\cdot 0 = 0$.\n- **Idempotent Laws:** $A + A = A$, $A \\cdot A = A$.\n- **Complement Laws:** $A + A' = 1$, $A \\cdot A' = 0$.\n- **Involution:** $(A')' = A$.\n\n---\n\n## 2. Distributive & De Morgan's Laws\n- **Distributive Law:**\n  - $A \\cdot (B + C) = A \\cdot B + A \\cdot C$\n  - **Dual Distributive:** $A + (B \\cdot C) = (A + B) \\cdot (A + C)$ *(High-yield exam shortcut!)*\n- **De Morgan's Laws:**\n  $$(A + B)' = A' \\cdot B'$$\n  $$(A \\cdot B)' = A' + B'$$\n- **Consensus Theorem:**\n  $$A B + A' C + B C = A B + A' C$$\n  *(The term $B C$ is redundant consensus).*\n",
      "questions": [
        {
          "id": "dld-ba-1",
          "question": "What does the Boolean expression AB + A'C + BC simplify to using the Consensus Theorem?",
          "options": [
            "AB + BC",
            "AB + A'C",
            "A'C + BC",
            "A + B + C"
          ],
          "correct_option": 1,
          "explanation": "By the Consensus Theorem, BC is the consensus term of AB and A'C and is entirely redundant, simplifying to AB + A'C."
        },
        {
          "id": "dld-ba-2",
          "question": "According to De Morgan's theorem, the expression (A + B + C)' is equal to:",
          "options": [
            "A' + B' + C'",
            "A'B'C'",
            "(AB)'C'",
            "A' + (BC)'"
          ],
          "correct_option": 1,
          "explanation": "De Morgan's law states that the complement of a logical sum is the logical product of the complements: (A + B + C)' = A'B'C'."
        },
        {
          "id": "dld-bool-3",
          "question": "What does the Boolean expression A + A'B simplify to using Boolean absorption/distributive laws?",
          "options": [
            "A + B",
            "AB",
            "A",
            "A' + B"
          ],
          "correct_option": 0,
          "explanation": "By the dual distributive law: A + A'B = (A + A')(A + B). Since (A + A') = 1, this simplifies to 1 * (A + B) = A + B."
        }
      ]
    },
    {
      "id": "dld-logic-gates",
      "slug": "logic-gates",
      "title": "Logic Gates",
      "description": "Basic gates (AND, OR, NOT), universal gates (NAND, NOR), exclusive gates (XOR, XNOR), and CMOS gate implementations.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Intel",
        "Texas Instruments",
        "Qualcomm",
        "Broadcom"
      ],
      "keyTakeaways": [
        "NAND and NOR are Universal Gates; any Boolean function can be implemented using only NAND or only NOR gates.",
        "Minimum NAND gates: NOT (1), AND (2), OR (3), NOR (4), XOR (4), XNOR (5).",
        "Minimum NOR gates: NOT (1), OR (2), AND (3), NAND (4), XNOR (4), XOR (5).",
        "XOR is an odd function (outputs 1 when number of 1s is odd); XNOR is an even function."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Logic+Gates+Universal+Gates+NAND+NOR+XOR+XNOR+DLD+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Logic Gates and Universal Logic\n\nLogic gates are the physical realization of Boolean functions using semiconductor transistors.\n\n---\n\n## 1. Gate Profiles & Truth Tables\n- **Universal Gates:** **NAND** and **NOR** can synthesize any Boolean function without other gate types.\n  - NAND: $Y = (A B)'$ (Low output only when all inputs are High).\n  - NOR: $Y = (A + B)'$ (High output only when all inputs are Low).\n- **XOR (Odd Parity Gate):** $Y = A \\oplus B = A B' + A' B$.\n  - Output is $1$ if the number of 1s in input is odd.\n  - $A \\oplus 0 = A$, $A \\oplus 1 = A'$, $A \\oplus A = 0$.\n- **XNOR (Equivalence Gate):** $Y = (A \\oplus B)' = A B + A' B'$.\n  - Output is $1$ if inputs are identical.\n\n---\n\n## 2. Gate Implementation Metrics\n- Minimum 2-input NAND gates required to implement:\n  - NOT: 1 gate\n  - AND: 2 gates\n  - OR: 3 gates\n  - NOR: 4 gates\n  - XOR: 4 gates\n  - XNOR: 5 gates\n",
      "questions": [
        {
          "id": "dld-gate-1",
          "question": "What is the minimum number of 2-input NAND gates required to implement a 2-input XOR gate?",
          "options": [
            "3",
            "4",
            "5",
            "6"
          ],
          "correct_option": 1,
          "explanation": "A 2-input XOR gate can be implemented with exactly 4 two-input NAND gates."
        },
        {
          "id": "dld-gate-2",
          "question": "Why are NAND and NOR classified as 'Universal Gates'?",
          "options": [
            "They use the least power",
            "Any Boolean logic function can be constructed using exclusively NAND or exclusively NOR gates",
            "They can operate at any clock frequency",
            "They are bidirectional"
          ],
          "correct_option": 1,
          "explanation": "A universal gate can implement the complete set of primitive logic operations (NOT, AND, OR) without needing any other gate types."
        },
        {
          "id": "dld-gates-3",
          "question": "In static CMOS digital logic, how are the transistors arranged to implement a 2-input NAND gate?",
          "options": [
            "2 PMOS transistors in parallel in the pull-up network, and 2 NMOS transistors in series in the pull-down network",
            "2 NMOS transistors in parallel in the pull-up network, and 2 PMOS transistors in series in the pull-down network",
            "Both PMOS and NMOS connected strictly in parallel",
            "Both PMOS and NMOS connected strictly in series"
          ],
          "correct_option": 0,
          "explanation": "In static CMOS logic, an n-input NAND gate is constructed with n PMOS transistors in parallel between V_DD and output (Pull-Up Network) and n NMOS transistors in series between output and GND (Pull-Down Network)."
        }
      ]
    },
    {
      "id": "dld-canonical-forms-sop-pos",
      "slug": "canonical-forms-sop-and-pos",
      "title": "Canonical Forms: SOP and POS",
      "description": "Minterms (m), Maxterms (M), canonical Sum of Products, Product of Sums, standard forms, and duality.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "Minterm (m_i): Product term where variable is uncomplemented for 1 and complemented for 0.",
        "Maxterm (M_i): Sum term where variable is complemented for 1 and uncomplemented for 0.",
        "Canonical SOP: f = sum m(i); Canonical POS: f = prod M(j).",
        "Duality: M_i = (m_i)' (Maxterm i is the complement of Minterm i)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Canonical+Forms+SOP+POS+Minterms+Maxterms+DLD+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Canonical Forms: SOP and POS\n\nEvery Boolean function can be expressed uniquely as a standard sum of minterms or product of maxterms.\n\n---\n\n## 1. Minterms and Sum of Products (SOP)\n- **Minterm ($m_i$):** A product (AND) of all literals where each variable appears once in true or complemented form, evaluating to $1$ for exactly one row.\n- **Canonical SOP:** Expresses $f$ as a sum (OR) of all minterms for which $f = 1$:\n  $$f(A, B, C) = \\sum m(1, 3, 5, 7) = A' B' C + A' B C + A B' C + A B C$$\n\n---\n\n## 2. Maxterms and Product of Sums (POS)\n- **Maxterm ($M_i$):** A sum (OR) of all literals evaluating to $0$ for exactly one row.\n- **Canonical POS:** Expresses $f$ as a product (AND) of all maxterms where $f = 0$:\n  $$f(A, B, C) = \\prod M(0, 2, 4, 6) = (A + B + C)(A + B' + C)(A' + B + C)(A' + B' + C)$$\n\n---\n\n## 3. Complementary Duality\n- $m_i = (M_i)'$\n- If $f = \\sum m(1, 3, 5, 7)$, then its complement is $f' = \\sum m(0, 2, 4, 6) = \\prod M(1, 3, 5, 7)$.\n",
      "questions": [
        {
          "id": "dld-canon-1",
          "question": "If a 3-variable Boolean function is f(A, B, C) = Σ m(0, 2, 4, 6), what is its canonical POS representation?",
          "options": [
            "Π M(0, 2, 4, 6)",
            "Π M(1, 3, 5, 7)",
            "Σ m(1, 3, 5, 7)",
            "Π M(1, 2, 3, 4)"
          ],
          "correct_option": 1,
          "explanation": "The POS form comprises all maxterms whose indices do not appear in the SOP form. The missing indices from {0, 2, 4, 6} are {1, 3, 5, 7}, giving Π M(1, 3, 5, 7)."
        },
        {
          "id": "dld-canon-2",
          "question": "What is the algebraic expression for the minterm m_3 in terms of variables A, B, C (where A is MSB)?",
          "options": [
            "A'BC",
            "AB'C",
            "ABC'",
            "A'B'C"
          ],
          "correct_option": 0,
          "explanation": "Binary representation of 3 is 011. Minterm encodes 0 as complemented and 1 as uncomplemented: A' B C."
        },
        {
          "id": "dld-canon-3",
          "question": "If a 3-variable Boolean function is given by f(A,B,C) = Sigma m(0, 2, 4, 6), what is its equivalent canonical POS form?",
          "options": [
            "Pi M(1, 3, 5, 7)",
            "Pi M(0, 2, 4, 6)",
            "Sigma m(1, 3, 5, 7)",
            "Pi M(0, 1, 2, 3)"
          ],
          "correct_option": 0,
          "explanation": "A canonical POS expression consists of all maxterms where the function evaluates to 0. Since minterms are {0, 2, 4, 6}, the missing rows are {1, 3, 5, 7}, giving Pi M(1, 3, 5, 7)."
        }
      ]
    },
    {
      "id": "dld-karnaugh-maps",
      "slug": "karnaugh-maps-k-maps",
      "title": "Karnaugh Maps (K-Maps)",
      "description": "2, 3, and 4-variable K-maps, Gray code adjacency, prime implicants, essential prime implicants, and don't care conditions.",
      "estimatedMinutes": 18,
      "difficulty": "Medium",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Texas Instruments"
      ],
      "keyTakeaways": [
        "K-Map cells are arranged in Gray Code (00, 01, 11, 10) so adjacent cells differ by exactly 1 bit.",
        "Group sizes must always be powers of 2 (1, 2, 4, 8, 16).",
        "Prime Implicant (PI): Maximal group of adjacent 1s that cannot be combined into a larger group.",
        "Essential Prime Implicant (EPI): A PI containing at least one '1' not covered by any other PI.",
        "Don't cares ('d' / 'X') can be treated as 1 if it enlarges a group, or 0 otherwise."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Karnaugh+Maps+K+Map+Prime+Implicants+Essential+Dont+Care+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Karnaugh Maps (K-Maps)\n\nK-maps provide graphical minimization of Boolean functions by exploiting adjacency.\n\n---\n\n## 1. Gray Code Cell Ordering (4-Variable K-Map)\nRows: $AB \\in \\{00, 01, 11, 10\\}$ | Columns: $CD \\in \\{00, 01, 11, 10\\}$.\n\n```\n        CD\n   AB   00  01  11  10\n   00    0   1   3   2\n   01    4   5   7   6\n   11   12  13  15  14\n   10    8   9  11  10\n```\n\n---\n\n## 2. Essential Terminology\n- **Implicant:** Any group of minterms.\n- **Prime Implicant (PI):** A rectangular group that cannot be merged with any neighbor to form a group twice as large.\n- **Essential Prime Implicant (EPI):** A PI containing at least one minterm that is covered by NO other PI. **All EPIs must appear in the minimal SOP!**\n",
      "questions": [
        {
          "id": "dld-kmap-1",
          "question": "Why are the row and column coordinates of a Karnaugh Map ordered in Gray Code (00, 01, 11, 10) rather than standard binary (00, 01, 10, 11)?",
          "options": [
            "To save memory",
            "To ensure that adjacent cells differ by only a single bit (Hamming distance 1)",
            "To sort minterms alphabetically",
            "Because 11 is smaller than 10 in hardware"
          ],
          "correct_option": 1,
          "explanation": "Gray code ensures that adjacent physical cells differ by exactly 1 bit, enabling algebraic simplification using the identity x + x' = 1."
        },
        {
          "id": "dld-kmap-2",
          "question": "What is an Essential Prime Implicant (EPI)?",
          "options": [
            "Any group of size 8 or larger",
            "A prime implicant that covers at least one minterm not covered by any other prime implicant",
            "A group consisting solely of don't-care conditions",
            "The largest group on the map"
          ],
          "correct_option": 1,
          "explanation": "An Essential Prime Implicant contains at least one '1' (minterm) that is not part of any other prime implicant, making its inclusion mandatory in any minimal cover."
        },
        {
          "id": "dld-kmap-3",
          "question": "What does a group of 4 adjacent 1s (a quad) in a 4-variable Karnaugh map eliminate?",
          "options": [
            "2 variables",
            "1 variable",
            "3 variables",
            "4 variables"
          ],
          "correct_option": 0,
          "explanation": "A group of 2^k cells in a K-map eliminates k variables. For a quad (2^2 = 4 cells), k = 2 variables are eliminated, yielding a term with 4 - 2 = 2 literals."
        }
      ]
    },
    {
      "id": "dld-combinational-circuits",
      "slug": "combinational-circuits",
      "title": "Combinational Circuits",
      "description": "Design methodology, propagation delay, critical paths, static and dynamic hazards, and glitch elimination.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Cisco"
      ],
      "keyTakeaways": [
        "Combinational circuits have no memory: Output depends solely on present inputs.",
        "Propagation delay: Time taken for input transition to produce output change.",
        "Critical Path: Longest delay path through the circuit (determines maximum clock speed).",
        "Static-1 Hazard: Output momentarily drops to 0 when transitioning between adjacent 1-cells (fixed by adding consensus term)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Combinational+Circuits+Hazards+Propagation+Delay+DLD+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Combinational Circuits\n\nCombinational logic circuits have outputs determined purely by present inputs, with zero internal feedback or storage.\n\n---\n\n## 1. Hazards & Glitches\n- **Static-1 Hazard:** Output should stay 1, but momentarily drops to 0 due to unequal path delays.\n- **Static-0 Hazard:** Output should stay 0, but momentarily glitches to 1.\n- **Dynamic Hazard:** Output transitions multiple times before settling (0 -> 1 -> 0 -> 1).\n\n---\n\n## 2. Eliminating Static Hazards\nA static hazard occurs when a transition crosses between two separate Prime Implicant groups on a K-Map. **Fix:** Add the redundant **Consensus Term** covering the adjacent cells.\n",
      "questions": [
        {
          "id": "dld-comb-1",
          "question": "How can a Static-1 Hazard be eliminated from a combinational circuit design?",
          "options": [
            "By adding a clock flip-flop",
            "By adding a redundant consensus term bridging the adjacent K-map groupings",
            "By increasing supply voltage",
            "By using NAND gates instead of NOR gates"
          ],
          "correct_option": 1,
          "explanation": "Static hazards occur when switching between two prime implicant groups. Adding an overlapping consensus product term ensures that one term remains active during the transition."
        },
        {
          "id": "dld-comb-2",
          "question": "What is the critical path in a combinational logic circuit?",
          "options": [
            "The path with the highest current consumption",
            "The path with the maximum propagation delay from any input to any output",
            "The clock line",
            "The shortest path"
          ],
          "correct_option": 1,
          "explanation": "The critical path is the path with the longest cumulative propagation delay, which sets the lower bound on cycle time and upper bound on operating frequency."
        },
        {
          "id": "dld-comb-3",
          "question": "What distinguishes a combinational circuit from a sequential circuit?",
          "options": [
            "Outputs depend strictly on the current input combination with no feedback loops or memory elements.",
            "Combinational circuits contain flip-flops and clock signals.",
            "Combinational circuits store past states indefinitely.",
            "Combinational circuits cannot implement arithmetic logic."
          ],
          "correct_option": 0,
          "explanation": "Combinational logic circuits have outputs determined solely by the present values of inputs at that instant, with zero internal memory states or clock dependency."
        }
      ]
    },
    {
      "id": "dld-adders-and-subtractors",
      "slug": "adders-and-subtractors",
      "title": "Adders and Subtractors",
      "description": "Half adder, full adder, ripple carry adder, carry lookahead adder (CLA), half/full subtractor, and adder-subtractor circuits.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Broadcom",
        "AMD"
      ],
      "keyTakeaways": [
        "Half Adder: Sum = A XOR B, Carry = A AND B.",
        "Full Adder: Sum = A XOR B XOR Cin, Cout = AB + Cin(A XOR B).",
        "Ripple Carry Adder has O(n) delay due to carry propagation through all n stages.",
        "Carry Lookahead Adder (CLA) computes carry signals in parallel in O(1) time using generate (G = AB) and propagate (P = A + B) terms."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Half+Adder+Full+Adder+Carry+Lookahead+Adder+CLA+DLD+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Adders and Subtractors: Combinational Arithmetic\n\nBinary addition and subtraction form the backbone of computer arithmetic logic units.\n\n---\n\n## 1. Half Adder vs Full Adder\n- **Half Adder (HA):** Adds 2 single-bit inputs $(A, B)$:\n  $$\\text{Sum} = A \\oplus B, \\quad \\text{Carry} = A \\cdot B$$\n- **Full Adder (FA):** Adds 3 single-bit inputs $(A, B, C_{\\text{in}})$:\n  $$\\text{Sum} = A \\oplus B \\oplus C_{\\text{in}}$$\n  $$\\text{Carry Out} = A B + B C_{\\text{in}} + A C_{\\text{in}} = A B + (A \\oplus B) C_{\\text{in}}$$\n- A Full Adder can be synthesized using **2 Half Adders + 1 OR gate**.\n\n---\n\n## 2. Binary Subtractors\n- **Half Subtractor (HS):** $\\text{Diff} = A \\oplus B, \\quad \\text{Borrow} = A' B$.\n- **Full Subtractor (FS):** $\\text{Diff} = A \\oplus B \\oplus B_{\\text{in}}, \\quad \\text{Borrow} = A' B + (A \\oplus B)' B_{\\text{in}}$.\n\n---\n\n## 3. 4-bit Parallel Adder/Subtractor\n- Uses 4 Full Adders with XOR gates on $B$ inputs controlled by mode bit $M$:\n  - When $M = 0$: $B \\oplus 0 = B, C_{\\text{in}} = 0 \\implies$ Addition $(A + B)$.\n  - When $M = 1$: $B \\oplus 1 = B', C_{\\text{in}} = 1 \\implies$ 2's complement Subtraction $(A + B' + 1 = A - B)$.\n",
      "questions": [
        {
          "id": "dld-add-1",
          "question": "What are the Boolean expressions for the Sum and Carry outputs of a Full Adder with inputs A, B, and Cin?",
          "options": [
            "Sum = A + B + Cin, Carry = ABCin",
            "Sum = A ⊕ B ⊕ Cin, Carry = AB + Cin(A ⊕ B)",
            "Sum = A ⊕ B, Carry = AB",
            "Sum = AB + Cin, Carry = A ⊕ B ⊕ Cin"
          ],
          "correct_option": 1,
          "explanation": "Full adder sum is the 3-input XOR (A ⊕ B ⊕ Cin) and carry-out is AB + Cin(A ⊕ B) (or AB + BCin + ACin)."
        },
        {
          "id": "dld-add-2",
          "question": "Why is a Carry Lookahead Adder (CLA) significantly faster than a Ripple Carry Adder?",
          "options": [
            "It uses fewer gates",
            "It calculates all carry bits in parallel in constant time using generate and propagate logic, eliminating carry propagation delay",
            "It uses sequential flip-flops",
            "It operates without a ground connection"
          ],
          "correct_option": 1,
          "explanation": "A ripple carry adder propagates carry through each bit serially (O(N) delay). A CLA generates all carries simultaneously using 2-level lookahead logic, operating in O(1) delay."
        },
        {
          "id": "dld-add-3",
          "question": "How many Half Adders and OR gates are required to construct a single Full Adder?",
          "options": [
            "2 Half Adders and 1 OR gate",
            "3 Half Adders and 0 OR gates",
            "1 Half Adder and 2 OR gates",
            "2 Half Adders and 2 OR gates"
          ],
          "correct_option": 0,
          "explanation": "A Full Adder is constructed from 2 Half Adders (producing partial sums and carries) and 1 OR gate to combine the two partial carry outputs."
        }
      ]
    },
    {
      "id": "dld-multiplexers-and-demultiplexers",
      "slug": "multiplexers-and-demultiplexers",
      "title": "Multiplexers and Demultiplexers",
      "description": "2^n to 1 MUX, select lines, implementing arbitrary logic using MUX, cascading MUX, 1 to 2^n DEMUX, and decoders.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Texas Instruments"
      ],
      "keyTakeaways": [
        "2^n-to-1 MUX has n select lines and 1 output (data selector).",
        "Any n-variable Boolean function can be implemented using a 2^(n-1)-to-1 MUX and an inverter.",
        "Shannon's expansion maps directly to MUX architecture: select lines connect to variables.",
        "1-to-2^n DEMUX routes a single input data line to one of 2^n outputs based on n select lines."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Multiplexer+MUX+Demultiplexer+DEMUX+Implementation+DLD+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Multiplexers (MUX) and Demultiplexers (DEMUX)\n\nData selectors and distributors provide hardware-level routing and arbitrary function generation.\n\n---\n\n## 1. Multiplexer (Data Selector)\n- A $2^n \\times 1$ MUX routes one of $2^n$ data inputs to a single output line based on $n$ select lines.\n- **Universal Function Generator:**\n  - An $n$-variable Boolean function can be implemented using a $2^{n-1} \\times 1$ MUX by connecting $n-1$ variables to select lines and the remaining variable ($0, 1, V, V'$) to data inputs.\n  - A $2^n \\times 1$ MUX directly implements any $n$-variable function with zero external gates.\n\n---\n\n## 2. Demultiplexer (Data Distributor)\n- A $1 \\times 2^n$ DEMUX takes a single input line and routes it to one of $2^n$ output lines selected by $n$ control lines.\n- A DEMUX with an enable input behaves identically to a **Binary Decoder**.\n",
      "questions": [
        {
          "id": "dld-mux-1",
          "question": "How many select lines are required for a 64-to-1 Multiplexer?",
          "options": [
            "4",
            "5",
            "6",
            "8"
          ],
          "correct_option": 2,
          "explanation": "A 2^n-to-1 multiplexer requires n select lines. Since 64 = 2^6, exactly 6 select lines are required."
        },
        {
          "id": "dld-mux-2",
          "question": "What is the minimum size of multiplexer required to implement ANY arbitrary 4-variable Boolean function without needing any external logic gates?",
          "options": [
            "4-to-1 MUX",
            "8-to-1 MUX",
            "16-to-1 MUX",
            "2-to-1 MUX"
          ],
          "correct_option": 2,
          "explanation": "A 16-to-1 MUX (with 4 select lines) can implement any 4-variable function by feeding minterm values (0 or 1) directly into the 16 data inputs without requiring any external gates."
        },
        {
          "id": "dld-mux-3",
          "question": "How many 2-to-1 multiplexers are required to construct an 8-to-1 multiplexer without any additional logic gates?",
          "options": [
            "7",
            "8",
            "4",
            "3"
          ],
          "correct_option": 0,
          "explanation": "To build an 8-to-1 MUX using a tree of 2-to-1 MUXes: First stage requires 4 MUXes (8 inputs to 4), second stage requires 2 MUXes (4 inputs to 2), and final stage requires 1 MUX (2 inputs to 1). Total = 4 + 2 + 1 = 7."
        }
      ]
    },
    {
      "id": "dld-encoders-and-decoders",
      "slug": "encoders-and-decoders",
      "title": "Encoders and Decoders",
      "description": "Binary decoders (n to 2^n), active-low enable, priority encoders, 8-to-3 encoder, and BCD to 7-segment decoder.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Broadcom",
        "Infosys"
      ],
      "keyTakeaways": [
        "Decoder (n to 2^n): Converts n-bit binary code into 2^n individual minterm lines.",
        "Encoder (2^n to n): Reverse of decoder; converts 1-of-2^n active input lines into n-bit binary.",
        "Priority Encoder: Resolves multiple simultaneous active inputs by selecting the input with highest priority.",
        "Decoders with active-low outputs generate NAND-based minterms directly."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Encoders+Decoders+Priority+Encoder+3+to+8+Decoder+DLD+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Encoders, Decoders, and Code Converters\n\nCode converters translate between coded representations (binary, BCD, Gray code, one-hot).\n\n---\n\n## 1. Decoders\n- An $n \\times 2^n$ decoder activates exactly one of its $2^n$ output lines for each $n$-bit input combination.\n- **Minterm Generation:** Each active-high output corresponds to an individual minterm $m_i$. Connecting an OR gate to select outputs realizes any Boolean function.\n- **Expansion:** Two $2 \\times 4$ decoders with enable inputs form a $3 \\times 8$ decoder.\n\n---\n\n## 2. Priority Encoders\n- In a standard $2^n \\times n$ encoder, only one input may be high.\n- In a **Priority Encoder**, if multiple inputs are high simultaneously, the output reflects the input with the **highest assigned priority** (typically highest index).\n- Features a valid output bit $V$ to distinguish \"input $D_0$ active\" from \"no active inputs\".\n",
      "questions": [
        {
          "id": "dld-enc-1",
          "question": "How many outputs does a 4-to-16 line decoder have?",
          "options": [
            "4",
            "8",
            "16",
            "32"
          ],
          "correct_option": 2,
          "explanation": "An n-to-2^n decoder produces 2^n outputs. For n = 4, 2^4 = 16 output lines are generated."
        },
        {
          "id": "dld-enc-2",
          "question": "What is the primary function of a Priority Encoder over a standard binary encoder?",
          "options": [
            "It consumes less power",
            "It handles multiple simultaneous active inputs by outputting the code of the highest priority input",
            "It operates without a clock",
            "It converts serial data to parallel"
          ],
          "correct_option": 1,
          "explanation": "A standard encoder produces undefined output when multiple inputs are active. A priority encoder resolves this ambiguity by prioritizing the highest-index input."
        },
        {
          "id": "dld-enc-3",
          "question": "How many outputs does a standard 3-to-8 binary decoder have?",
          "options": [
            "8 outputs",
            "3 outputs",
            "16 outputs",
            "24 outputs"
          ],
          "correct_option": 0,
          "explanation": "An n-to-2^n decoder converts an n-bit input into 2^n unique output lines. For n = 3, there are 2^3 = 8 outputs corresponding to minterms m0 through m7."
        }
      ]
    },
    {
      "id": "dld-flip-flops-and-latches",
      "slug": "flip-flops-and-latches",
      "title": "Flip-Flops and Latches",
      "description": "Level-triggered vs edge-triggered, SR latch, race-around condition in JK flip-flop, Master-Slave JK, D flip-flop, and T flip-flop.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Texas Instruments"
      ],
      "keyTakeaways": [
        "Latch is level-triggered; Flip-Flop is edge-triggered (synchronous with clock transitions).",
        "SR Flip-Flop: S=1 R=1 is invalid / forbidden.",
        "JK Flip-Flop: J=1 K=1 toggles output; suffers from Race-Around Condition when clock pulse width tp > flip-flop propagation delay tpd.",
        "Race-around avoided by: Master-Slave JK flip-flop, edge-triggering, or making tp < tpd.",
        "D Flip-Flop: Q(next) = D (Data delay). T Flip-Flop: Q(next) = T XOR Q (Toggle)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Flip+Flops+Latches+JK+SR+D+T+Race+Around+Condition+Master+Slave+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Flip-Flops and Latches\n\nFlip-flops and latches are bistable multivibrators that store 1 bit of binary memory.\n\n---\n\n## 1. Flip-Flop Characteristic Equations\n\n| Flip-Flop | Characteristic Equation | Excitation ($Q \\to Q_{next}$) |\n| :--- | :--- | :--- |\n| **SR** | $Q_{next} = S + R' Q$ (with $S R = 0$) | $0 \\to 0: S=0, R=X$; $0 \\to 1: S=1, R=0$ |\n| **JK** | $Q_{next} = J Q' + K' Q$ | $0 \\to 0: J=0, X$; $0 \\to 1: J=1, X$ |\n| **D** | $Q_{next} = D$ | $D = Q_{next}$ |\n| **T** | $Q_{next} = T \\oplus Q = T Q' + T' Q$ | $T = Q \\oplus Q_{next}$ |\n\n---\n\n## 2. Race-Around Condition in JK Flip-Flop\nOccurs when $J = 1, K = 1$, level-triggered clock is high, and clock pulse width $t_p > \\Delta t$ (propagation delay). Output toggles repeatedly and unpredictably during the single clock pulse.\n- **Remedies:** Master-Slave JK flip-flop, or Edge-triggered flip-flop.\n",
      "questions": [
        {
          "id": "dld-ff-1",
          "question": "What is the characteristic equation of a JK Flip-Flop?",
          "options": [
            "Q_next = J + K'Q",
            "Q_next = J Q' + K' Q",
            "Q_next = D",
            "Q_next = J ⊕ K"
          ],
          "correct_option": 1,
          "explanation": "The next-state equation for a JK flip-flop is Q(t+1) = J * Q' + K' * Q."
        },
        {
          "id": "dld-ff-2",
          "question": "Under what conditions does the Race-Around Condition occur in a JK flip-flop?",
          "options": [
            "J=0, K=0 and edge-triggered clock",
            "J=1, K=1, level-triggered clock, and clock pulse width tp > propagation delay tpd",
            "J=1, K=0 and low clock",
            "Only when S and R are both 1"
          ],
          "correct_option": 1,
          "explanation": "When J = K = 1 in a level-triggered flip-flop, the output toggles. If the clock remains HIGH longer than the propagation delay of the gates, the output toggles multiple times uncontrollably within a single clock pulse."
        },
        {
          "id": "dld-ff-3",
          "question": "What input condition leads to an invalid (indeterminate) output state in an active-high SR latch?",
          "options": [
            "S = 1 and R = 1 simultaneously",
            "S = 0 and R = 0",
            "S = 1 and R = 0",
            "S = 0 and R = 1"
          ],
          "correct_option": 0,
          "explanation": "In an active-high NOR SR latch, setting both Set (S) and Reset (R) to 1 forces both outputs Q and Q' to 0 simultaneously, violating complementation and causing race conditions on release."
        }
      ]
    },
    {
      "id": "dld-counters-and-registers",
      "slug": "counters-and-registers",
      "title": "Counters and Registers",
      "description": "Shift registers (SISO, SIPO, PISO, PIPO), asynchronous (ripple) vs synchronous counters, modulo counters, Ring and Johnson counters.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Broadcom"
      ],
      "keyTakeaways": [
        "Asynchronous (Ripple) Counter: Output of one flip-flop clocks the next flip-flop; propagation delays accumulate (O(n)).",
        "Synchronous Counter: All flip-flops are clocked simultaneously by the same clock edge.",
        "Modulo-N counter has N distinct states and divides clock frequency by N.",
        "Ring counter of n flip-flops has n states; Johnson (Twisted Ring) counter has 2n states."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Counters+and+Registers+Synchronous+Asynchronous+Ripple+Ring+Johnson+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Counters and Registers\n\n---\n\n## 1. Asynchronous (Ripple) vs Synchronous Counters\n- **Ripple Counter:**\n  - Clock applied only to first flip-flop; subsequent stages clocked by $Q$ or $Q'$ of previous stage.\n  - Slower: Total propagation delay $= n \\times t_{pd}$. Max frequency $= \\frac{1}{n \\cdot t_{pd}}$.\n- **Synchronous Counter:**\n  - All flip-flops clocked simultaneously by master clock.\n  - Max frequency $= \\frac{1}{t_{pd} + t_{comb}}$.\n\n---\n\n## 2. Specialized Shift Counters\nFor $n$ flip-flops:\n- **Ring Counter:** Output of last stage feeds back to first. Total states $= n$.\n- **Johnson Counter (Twisted Ring):** Inverted output of last stage ($Q'$) feeds back to first. Total states $= 2n$.\n",
      "questions": [
        {
          "id": "dld-cnt-1",
          "question": "How many distinct states does an n-flip-flop Johnson (Twisted Ring) counter have?",
          "options": [
            "n",
            "2n",
            "2^n",
            "2^(n-1)"
          ],
          "correct_option": 1,
          "explanation": "A Johnson counter feeds the inverted output Q' of the last stage into the first stage, creating exactly 2n distinct states (compared to n states for a standard Ring counter)."
        },
        {
          "id": "dld-cnt-2",
          "question": "If a Modulo-16 counter is fed with an input clock frequency of 64 MHz, what is the output frequency at the MSB stage?",
          "options": [
            "4 MHz",
            "16 MHz",
            "8 MHz",
            "2 MHz"
          ],
          "correct_option": 0,
          "explanation": "A Modulo-N counter acts as a frequency divider by N. Output frequency = Input frequency / N = 64 MHz / 16 = 4 MHz."
        },
        {
          "id": "dld-count-3",
          "question": "What is the modulus of a counter constructed using 4 flip-flops that cycles through all possible states?",
          "options": [
            "MOD-16 counter (counts from 0 to 15)",
            "MOD-8 counter",
            "MOD-4 counter",
            "MOD-32 counter"
          ],
          "correct_option": 0,
          "explanation": "With n flip-flops, the maximum number of distinct stable states is 2^n. For n = 4, 2^4 = 16 states (0 to 15), creating a MOD-16 counter."
        }
      ]
    },
    {
      "id": "dld-fsm-sequential-circuits",
      "slug": "sequential-circuits-and-finite-state-machines",
      "title": "Sequential Circuits and Finite-State Machines",
      "description": "Mealy vs Moore machines, state diagrams, state tables, state reduction (implication chart), state assignment, and sequence detectors.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Apple",
        "NVIDIA",
        "Cisco"
      ],
      "keyTakeaways": [
        "Moore Machine: Outputs depend strictly on current state only.",
        "Mealy Machine: Outputs depend on both current state AND current inputs (often requires fewer states).",
        "Sequence Detectors: Overlapping vs non-overlapping sequence recognition.",
        "Setup time (t_setup) and Hold time (t_hold) ensure reliable edge-triggered data latching."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Finite+State+Machines+Mealy+Moore+Sequential+Circuits+Sequence+Detector+Digital+Logic+Design+DLD+gate+lecture",
      "notesMarkdown": "# Sequential Circuits and Finite-State Machines (FSM)\n\n---\n\n## 1. Mealy Machine vs Moore Machine\n\n| Parameter | Moore Machine | Mealy Machine |\n| :--- | :--- | :--- |\n| **Output Dependency** | Present state **only** | Present state **AND** present input |\n| **State Count** | Typically requires more states ($N+1$ for $N$-bit sequence detector) | Typically requires fewer states ($N$ states for $N$-bit sequence detector) |\n| **Output Changes** | Synchronous with clock edge | Can change asynchronously whenever input changes |\n\n---\n\n## 2. Timing Constraints\n- **Setup Time ($t_{\\text{setup}}$):** Minimum duration data input must remain stable **before** clock edge.\n- **Hold Time ($t_{\\text{hold}}$):** Minimum duration data input must remain stable **after** clock edge.\n- **Maximum Clock Frequency:**\n  $$T_{clk} \\ge t_{cq} + t_{comb} + t_{setup} \\implies f_{max} = \\frac{1}{T_{clk}}$$\n",
      "questions": [
        {
          "id": "dld-fsm-1",
          "question": "How does the output of a Moore Machine differ from that of a Mealy Machine?",
          "options": [
            "Moore machine output depends only on present state; Mealy machine output depends on both present state and inputs",
            "Moore machines are asynchronous; Mealy machines are synchronous",
            "Mealy machine outputs are strictly independent of inputs",
            "Moore machines do not use flip-flops"
          ],
          "correct_option": 0,
          "explanation": "In a Moore machine, output logic is a function of the current state alone: Output = λ(State). In a Mealy machine, output is a function of both state and current inputs: Output = λ(State, Input)."
        },
        {
          "id": "dld-fsm-2",
          "question": "What is the minimum number of states required to detect a sequence of length N in a non-overlapping sequence detector using a Moore machine?",
          "options": [
            "N",
            "N + 1",
            "2^N",
            "N - 1"
          ],
          "correct_option": 1,
          "explanation": "A Moore machine requires N + 1 states to detect an N-bit sequence (e.g. 1 initial state + N matched prefix states, where the final state produces output 1)."
        },
        {
          "id": "dld-fsm-3",
          "question": "In a Mealy state machine, the output values depend on which of the following?",
          "options": [
            "Both the present state AND the current inputs.",
            "Strictly the present state only.",
            "Strictly the clock frequency.",
            "The next state only."
          ],
          "correct_option": 0,
          "explanation": "In a Mealy machine, outputs are functions of both the present internal state and current external inputs, while in a Moore machine outputs depend strictly on the present state."
        }
      ]
    }
  ]
};
