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
      "notesMarkdown": "# Number Systems, Radix Conversions, and Digital Representations\n\nDigital computers use two-state electronic switches (transistors operating in saturation and cutoff) to process information. Understanding positional number systems (Binary, Octal, Decimal, Hexadecimal) and conversion algorithms is fundamental to digital design, microarchitectures, and low-level computer programming.\n\n---\n\n## 1. Positional Number System Formulation\n\nIn a positional number system with base (radix) $r$, any number $N$ is represented as a polynomial sum:\n$$N = \\sum_{i=-m}^{n-1} d_i \\cdot r^i = d_{n-1}r^{n-1} + \\dots + d_1 r^1 + d_0 r^0 + d_{-1}r^{-1} + \\dots + d_{-m}r^{-m}$$\nwhere $0 \\le d_i < r$.\n\n| Base ($r$) | Name | Digits Used | Weight of Position $k$ |\n| :--- | :--- | :--- | :--- |\n| **2** | Binary | `0, 1` | $2^k$ |\n| **8** | Octal | `0, 1, 2, 3, 4, 5, 6, 7` | $8^k$ |\n| **10** | Decimal | `0, 1, 2, 3, 4, 5, 6, 7, 8, 9` | $10^k$ |\n| **16** | Hexadecimal | `0-9, A(10), B(11), C(12), D(13), E(14), F(15)` | $16^k$ |\n\n---\n\n## 2. Base Conversion Algorithms\n\n### 1. From Base $r$ to Decimal\nExpand the polynomial sum:\n$$(1101.101)_2 = 1 \\cdot 2^3 + 1 \\cdot 2^2 + 0 \\cdot 2^1 + 1 \\cdot 2^0 + 1 \\cdot 2^{-1} + 0 \\cdot 2^{-2} + 1 \\cdot 2^{-3} = 8 + 4 + 0 + 1 + 0.5 + 0.125 = 13.625_{10}$$\n\n### 2. From Decimal to Base $r$\n- **Integer Part:** Successive division by $r$. Collect remainders from bottom to top (LSB to MSB).\n- **Fractional Part:** Successive multiplication by $r$. Collect integer overflows from top to bottom.\n\n### 3. Power-of-Two Fast Conversions ($2 \\leftrightarrow 8 \\leftrightarrow 16$)\nBecause $8 = 2^3$ and $16 = 2^4$, conversions require no arithmetic—only bit grouping:\n- **Binary to Octal:** Group bits in 3s starting from the binary point.\n  $$(010 \\quad 110 \\quad 111)_2 \\implies (2 \\quad 6 \\quad 7)_8$$\n- **Binary to Hexadecimal:** Group bits in 4s starting from the binary point.\n  $$(1011 \\quad 0101)_2 \\implies (\\text{B} \\quad 5)_{16}$$\n\n---\n\n## 3. High-Yield Interview Traps & Pitfalls\n\n1. **Fractional Conversion Termination:**\n   Not all decimal fractions have exact finite representations in binary! For example, $0.1_{10}$ is an infinite repeating binary fraction: $0.0001100110011\\dots_2$ (which is why floating-point calculations exhibit rounding errors!).\n2. **Padding Zeros:**\n   When grouping fractional binary digits into octal or hex, append padding zeros to the **RIGHT** (least significant end); for integer parts, pad to the **LEFT**.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Base Polynomial:** $N = \\sum d_i \\cdot r^i$.\n- **Binary to Hex Grouping:** 4 bits $= 1$ hex digit ($2^4 = 16$).\n- **Binary to Octal Grouping:** 3 bits $= 1$ octal digit ($2^3 = 8$).\n- **Minimum bits for $N$ states:** $k = \\lceil \\log_2 N \\rceil$.\n",
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
      ],
      "prerequisites": [
        "Basic arithmetic and powers of integers",
        "Positional number notation"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Number Systems and Digital Foundations",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Number System and Base Conversions",
          "url": "https://www.geeksforgeeks.org/number-system-and-base-conversions/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Digital Electronics Number Systems",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Beginner",
          "isFree": true
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
      "notesMarkdown": "# Signed Number Representations and Two's Complement Arithmetic\n\nComputers require standardized binary representations to store negative numbers. Among Sign-Magnitude, One's Complement, and Two's Complement, modern microprocessors universally adopt **Two's Complement** because it eliminates redundant dual zeros and allows standard binary adder circuits to perform subtraction without separate subtraction hardware.\n\n---\n\n## 1. The Three Signed Binary Representations ($n$ bits)\n\n| Representation | Calculation for $-X$ | Value Range ($n$ bits) | Zero Representations |\n| :--- | :--- | :--- | :--- |\n| **Sign-Magnitude** | Invert only MSB (Sign bit) | $-(2^{n-1} - 1)$ to $+(2^{n-1} - 1)$ | Dual: $+0$ (`0000`) and $-0$ (`1000`) |\n| **1's Complement** | Invert all bits (bit-flip) | $-(2^{n-1} - 1)$ to $+(2^{n-1} - 1)$ | Dual: $+0$ (`0000`) and $-0$ (`1111`) |\n| **2's Complement** | $\\text{1's Comp} + 1 = 2^n - X$ | $\\mathbf{-2^{n-1}}$ to $\\mathbf{+(2^{n-1} - 1)}$ | **Unique:** Exactly one zero (`0000`) |\n\n### Advantages of Two's Complement:\n1. **Unique Zero:** No $+0$ and $-0$ ambiguity.\n2. **Extra Negative Value:** Covers $-2^{n-1}$ (e.g., 8-bit range is $-128$ to $+127$).\n3. **Hardware Reuse:** Subtraction $A - B$ is computed simply as $A + (\\text{2's Comp of } B)$, using the identical adder hardware!\n\n---\n\n## 2. Fast 2's Complement Shortcut & Mathematical Weight\n\n### The Inspection Shortcut:\nScan binary digits from **Right to Left (LSB to MSB)**:\n- Copy all trailing zeros and the very first `1` bit unchanged.\n- Invert all subsequent bits to the left!\n- *Example:* Find 2's comp of `101100`:\n  Copy `...100` $\\implies$ Invert remaining `101` $\\to$ `010` $\\implies$ `010100`!\n\n### MSB Negative Weight Formula:\nIn an $n$-bit two's complement integer, the MSB has a **negative positional weight** of $-2^{n-1}$:\n$$\\text{Value} = -b_{n-1} 2^{n-1} + \\sum_{i=0}^{n-2} b_i 2^i$$\n*Example:* `1011` in 4-bit 2's complement:\n$$\\text{Value} = -1 \\cdot 2^3 + 0 \\cdot 2^2 + 1 \\cdot 2^1 + 1 \\cdot 2^0 = -8 + 0 + 2 + 1 = -5_{10}$$\n\n---\n\n## 3. Arithmetic Overflow Detection\n\n**Arithmetic Overflow** occurs when the result of an arithmetic operation exceeds the representable range of the $n$-bit register.\n\n```\nOverflow Rules:\n1. Adding numbers of OPPOSITE signs CAN NEVER OVERFLOW!\n2. Adding two POSITIVE numbers produces a NEGATIVE result -> OVERFLOW!\n3. Adding two NEGATIVE numbers produces a POSITIVE result -> OVERFLOW!\n```\n\n### Hardware Detection via Carry Bits:\nLet $C_{\\text{in}}$ be the carry into the sign bit (MSB), and $C_{\\text{out}}$ be the carry out of the sign bit:\n$$\\mathbf{Overflow \\quad V = C_{\\text{in}} \\oplus C_{\\text{out}}}$$\nIf $C_{\\text{in}} \\ne C_{\\text{out}}$, an arithmetic overflow has occurred!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **$n$-bit Range:** $-2^{n-1} \\le X \\le 2^{n-1} - 1$.\n- **2's Complement Definition:** $X^* = 2^n - X = \\text{1's Complement}(X) + 1$.\n- **Subtraction via Addition:** $A - B = A + \\overline{B} + 1$.\n- **Overflow Flag:** $V = C_{n-1} \\oplus C_n$.\n",
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
      ],
      "prerequisites": [
        "Number systems and binary representations",
        "Binary addition and subtraction"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Two's Complement Arithmetic and Overflow",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: 1's and 2's Complement of a Binary Number",
          "url": "https://www.geeksforgeeks.org/1s-2s-complement-binary-number/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Signed Numbers and Arithmetic Overflow Traps",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      ],
      "prerequisites": [
        "Binary Number Systems",
        "Two's Complement Arithmetic"
      ],
      "externalResources": [
        {
          "title": "IEEE 754 Floating-Point Standard — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/ieee-standard-754-floating-point-numbers/",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Boolean Algebra: Postulates, Theorems, and De Morgan's Laws\n\nBoolean algebra, formulated by George Boole in 1854 and adapted to switching circuits by Claude Shannon in 1937, provides the mathematical framework for modeling, simplifying, and minimizing digital logic gates.\n\n---\n\n## 1. Fundamental Boolean Postulates and Axioms\n\nOperating over the set $B = \\{0, 1\\}$ with operations OR ($+$), AND ($\\cdot$), and NOT ($\\overline{A}$):\n\n| Law | OR Operation ($+$) | AND Operation ($\\cdot$) |\n| :--- | :--- | :--- |\n| **Identity Law** | $A + 0 = A$ | $A \\cdot 1 = A$ |\n| **Null (Dominance) Law** | $A + 1 = 1$ | $A \\cdot 0 = 0$ |\n| **Idempotent Law** | $A + A = A$ | $A \\cdot A = A$ |\n| **Complement Law** | $A + \\overline{A} = 1$ | $A \\cdot \\overline{A} = 0$ |\n| **Involution Law** | $\\overline{\\overline{A}} = A$ | $\\overline{\\overline{A}} = A$ |\n| **Commutative Law** | $A + B = B + A$ | $A \\cdot B = B \\cdot A$ |\n| **Associative Law** | $(A + B) + C = A + (B + C)$ | $(A \\cdot B) \\cdot C = A \\cdot (B \\cdot C)$ |\n| **Distributive Law** | $A + (B \\cdot C) = (A + B)(A + C)$ | $A \\cdot (B + C) = (A \\cdot B) + (A \\cdot C)$ |\n\n*(Notice: The second distributive law $A + BC = (A + B)(A + C)$ is uniquely true in Boolean algebra, but FALSE in ordinary arithmetic!)*\n\n---\n\n## 2. Advanced Theorems: Absorption, Consensus, and De Morgan's\n\n### 1. Absorption Laws:\n- $A + AB = A$\n- $A(A + B) = A$\n- $A + \\overline{A}B = A + B$\n- $\\overline{A} + AB = \\overline{A} + B$\n\n### 2. Consensus Theorem (Redundant Term Elimination):\n$$AB + \\overline{A}C + BC = AB + \\overline{A}C$$\n- *Condition:* Three variables ($A, B, C$). One variable ($A$) appears complemented ($\\overline{A}$) in one term and uncomplemented in another. The third term ($BC$, the consensus of $B$ and $C$) is completely redundant!\n- *Dual form:* $(A + B)(\\overline{A} + C)(B + C) = (A + B)(\\overline{A} + C)$.\n\n### 3. De Morgan's Laws:\n- **First Law:** The complement of a product is the sum of complements:\n  $$\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$$\n- **Second Law:** The complement of a sum is the product of complements:\n  $$\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$$\n\n---\n\n## 3. The Duality Principle\n\nAny true Boolean expression remains true if you:\n1. Swap all AND ($\\cdot$) operators with OR ($+$) operators.\n2. Swap all OR ($+$) operators with AND ($\\cdot$) operators.\n3. Swap all $0$s with $1$s, and $1$s with $0$s.\n*(Do NOT complement variables during dual transformation!)*\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Distributive Trick:** $A + \\overline{A}B = (A + \\overline{A})(A + B) = 1 \\cdot (A + B) = A + B$.\n- **Consensus Test:** $XY + \\overline{X}Z + YZ = XY + \\overline{X}Z$.\n- **De Morgan:** Break the line, change the sign! $\\overline{A + B + C} = \\overline{A} \\cdot \\overline{B} \\cdot \\overline{C}$.\n",
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
      ],
      "prerequisites": [
        "Binary number systems and logic truth tables",
        "Basic algebraic manipulation"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Boolean Algebra and Logic Minimization",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Laws of Boolean Algebra",
          "url": "https://www.geeksforgeeks.org/laws-of-boolean-algebra/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Boolean Postulates and De Morgan's Laws",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Beginner",
          "isFree": true
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
      "notesMarkdown": "# Logic Gates, Universal Logic (NAND/NOR), and Parity Operations\n\nLogic gates are physical electronic circuits that perform elementary Boolean operations on one or more binary inputs to produce a single binary output.\n\n---\n\n## 1. Primary and Derived Logic Gates\n\n| Gate | Symbol Equation | Truth Table ($A, B \\to Y$) | Behavior Description |\n| :--- | :--- | :--- | :--- |\n| **NOT (Inverter)** | $Y = \\overline{A}$ | $0 \\to 1, \\quad 1 \\to 0$ | Inverts logical state |\n| **AND** | $Y = A \\cdot B$ | $00 \\to 0, 01 \\to 0, 10 \\to 0, 11 \\to \\mathbf{1}$ | High ONLY when all inputs are 1 |\n| **OR** | $Y = A + B$ | $00 \\to 0, 01 \\to \\mathbf{1}, 10 \\to \\mathbf{1}, 11 \\to \\mathbf{1}$ | High when AT LEAST ONE input is 1 |\n| **NAND** | $Y = \\overline{A \\cdot B}$ | $00 \\to 1, 01 \\to 1, 10 \\to 1, 11 \\to \\mathbf{0}$ | Low ONLY when all inputs are 1 |\n| **NOR** | $Y = \\overline{A + B}$ | $00 \\to \\mathbf{1}, 01 \\to 0, 10 \\to 0, 11 \\to 0$ | High ONLY when all inputs are 0 |\n| **XOR** | $Y = A \\oplus B = A\\overline{B} + \\overline{A}B$ | $00 \\to 0, 01 \\to \\mathbf{1}, 10 \\to \\mathbf{1}, 11 \\to 0$ | High when inputs are DIFFERENT (Odd parity) |\n| **XNOR** | $Y = \\overline{A \\oplus B} = AB + \\overline{A}\\overline{B}$ | $00 \\to \\mathbf{1}, 01 \\to 0, 10 \\to 0, 11 \\to \\mathbf{1}$ | High when inputs are EQUAL (Even parity) |\n\n---\n\n## 2. Universal Logic Gates (NAND and NOR)\n\nA gate is **Universal** if any arbitrary Boolean function can be implemented using that gate type alone, without any other gates. Both **NAND** and **NOR** are universal.\n\n### Gate Implementation Count Table:\nMinimum number of 2-input Universal Gates required to implement basic logic functions:\n\n| Target Function | Minimum 2-Input NAND Gates | Minimum 2-Input NOR Gates |\n| :--- | :--- | :--- |\n| **NOT** | **1** | **1** |\n| **AND** | **2** | **3** |\n| **OR** | **3** | **2** |\n| **NOR** | **4** | **1** |\n| **NAND** | **1** | **4** |\n| **XOR** | **4** | **5** |\n| **XNOR** | **5** | **4** |\n\n*(Notice the elegant symmetry: swap NAND and NOR columns for dual operations!)*\n\n---\n\n## 3. High-Yield XOR Properties in Digital Design\n\n1. $A \\oplus 0 = A$ (Buffer)\n2. $A \\oplus 1 = \\overline{A}$ (Programmable Inverter)\n3. $A \\oplus A = 0$\n4. $A \\oplus \\overline{A} = 1$\n5. Commutative and Associative: $A \\oplus B \\oplus C = (A \\oplus B) \\oplus C$.\n6. **Multi-Input XOR Parity Checker:** Output is `1` if and only if the total number of `1` inputs is **ODD**.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Universal Gates:** NAND and NOR.\n- **XOR Equation:** $A \\oplus B = A\\overline{B} + \\overline{A}B$.\n- **XNOR Equation:** $\\overline{A \\oplus B} = AB + \\overline{A}\\overline{B}$.\n- **XOR Gate Count:** 4 NAND gates or 5 NOR gates.\n- **XNOR Gate Count:** 5 NAND gates or 4 NOR gates.\n",
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
      ],
      "prerequisites": [
        "Boolean algebra postulates and truth tables",
        "Electronic switching concepts"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Logic Gates and Universal Gates",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Logic Gates and Universal Logic",
          "url": "https://www.geeksforgeeks.org/logic-gates/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Universal Gates and Implementation Minimization",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Beginner",
          "isFree": true
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
      "notesMarkdown": "# Canonical and Standard Forms: Minterms, Maxterms, SOP, and POS\n\nAny Boolean function can be expressed algebraically from its truth table in canonical (complete) or standard (minimal) forms. Understanding minterms and maxterms is the gateway to Karnaugh Map minimization and programmable logic arrays (PLAs).\n\n---\n\n## 1. Minterms and Maxterms for $n$ Variables\n\nFor a function of $n$ variables, there are $2^n$ distinct input combinations:\n- **Minterm ($m_i$):** A product (AND) of all $n$ variables, where each variable appears complemented if its value is $0$, and uncomplemented if $1$. Evaluates to $1$ for **exactly one** row in the truth table.\n- **Maxterm ($M_i$):** A sum (OR) of all $n$ variables, where each variable appears uncomplemented if $0$, and complemented if $1$. Evaluates to $0$ for **exactly one** row in the truth table.\n\n| Row ($i$) | $A$ | $B$ | $C$ | Minterm ($m_i$) | Maxterm ($M_i$) |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **0** | 0 | 0 | 0 | $m_0 = \\overline{A}\\,\\overline{B}\\,\\overline{C}$ | $M_0 = A + B + C$ |\n| **1** | 0 | 0 | 1 | $m_1 = \\overline{A}\\,\\overline{B}C$ | $M_1 = A + B + \\overline{C}$ |\n| **2** | 0 | 1 | 0 | $m_2 = \\overline{A}B\\overline{C}$ | $M_2 = A + \\overline{B} + C$ |\n| **3** | 0 | 1 | 1 | $m_3 = \\overline{A}BC$ | $M_3 = A + \\overline{B} + \\overline{C}$ |\n| **4** | 1 | 0 | 0 | $m_4 = A\\overline{B}\\,\\overline{C}$ | $M_4 = \\overline{A} + B + C$ |\n| **5** | 1 | 0 | 1 | $m_5 = A\\overline{B}C$ | $M_5 = \\overline{A} + B + \\overline{C}$ |\n| **6** | 1 | 1 | 0 | $m_6 = AB\\overline{C}$ | $M_6 = \\overline{A} + \\overline{B} + C$ |\n| **7** | 1 | 1 | 1 | $m_7 = ABC$ | $M_7 = \\overline{A} + \\overline{B} + \\overline{C}$ |\n\n### Fundamental Duality Relationship:\n$$M_i = \\overline{m_i} \\quad \\text{and} \\quad m_i = \\overline{M_i}$$\n\n---\n\n## 2. Canonical SOP vs Canonical POS\n\n### Canonical Sum of Products (SOP):\nSum (OR) of all minterms where the function evaluates to **1**:\n$$F(A, B, C) = \\sum m(1, 3, 5, 7) = \\overline{A}\\,\\overline{B}C + \\overline{A}BC + A\\overline{B}C + ABC$$\n\n### Canonical Product of Sums (POS):\nProduct (AND) of all maxterms where the function evaluates to **0**:\n$$F(A, B, C) = \\prod M(0, 2, 4, 6) = (A+B+C)(A+\\overline{B}+C)(\\overline{A}+B+C)(\\overline{A}+\\overline{B}+C)$$\n\n### Direct Conversion Rule:\nThe minterm indices of $F$ are the **exact complement set** of the maxterm indices:\n$$F = \\sum m(1, 4, 6) \\iff F = \\prod M(0, 2, 3, 5, 7)$$\n$$\\overline{F} = \\sum m(0, 2, 3, 5, 7) \\iff \\overline{F} = \\prod M(1, 4, 6)$$\n\n---\n\n## 3. Standard vs Canonical Forms\n\n- **Canonical Form:** Every single term contains **every variable** in the domain (either complemented or uncomplemented).\n- **Standard Form:** Terms may contain fewer variables due to algebraic reduction (e.g., $F = AB + C$ is standard SOP, but not canonical).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Minterm $m_i$:** AND term ($1 \\to A, 0 \\to \\overline{A}$).\n- **Maxterm $M_i$:** OR term ($0 \\to A, 1 \\to \\overline{A}$).\n- **Complement Relationship:** $M_i = \\overline{m_i}$.\n- **SOP $\\leftrightarrow$ POS Index Rule:** $\\sum m(\\text{True indices}) = \\prod M(\\text{False indices})$.\n",
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
      ],
      "prerequisites": [
        "Boolean algebra and logic gates",
        "Truth table evaluation"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Canonical Representations and Normal Forms",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Canonical and Standard Form in Digital Logic",
          "url": "https://www.geeksforgeeks.org/canonical-and-standard-form/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Minterms, Maxterms, and SOP/POS Conversions",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Beginner",
          "isFree": true
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
      "notesMarkdown": "# Karnaugh Maps (K-Maps), Prime Implicants, and Don't Care Conditions\n\nThe Karnaugh Map (K-Map), invented by Maurice Karnaugh at Bell Labs in 1953, is a graphical technique for minimizing Boolean functions up to 6 variables. It arranges truth table entries into a multi-dimensional grid organized by **Gray Code** so that physically adjacent cells differ by exactly one binary literal.\n\n---\n\n## 1. K-Map Geometry and Gray Code Ordering\n\nIn a standard K-Map, rows and columns follow Gray code sequence: `00, 01, 11, 10` (notice `11` precedes `10` so that only one bit changes between adjacent columns).\n\n```\n4-Variable K-Map Cell Numbering:\n       CD  00    01    11    10\n   AB    +-----+-----+-----+-----+\n   00    |  0  |  1  |  3  |  2  |\n         +-----+-----+-----+-----+\n   01    |  4  |  5  |  7  |  6  |\n         +-----+-----+-----+-----+\n   11    | 12  | 13  | 15  | 14  |\n         +-----+-----+-----+-----+\n   10    |  8  |  9  | 11  | 10  |\n         +-----+-----+-----+-----+\n```\n\n### Toroidal Adjacency (Wrap-Around):\nThe top row is adjacent to the bottom row, and the leftmost column is adjacent to the rightmost column (the grid forms a torus). The 4 corner cells (`0, 2, 8, 10`) form a valid quad group!\n\n---\n\n## 2. Grouping Rules for Minimal SOP\n\n1. Group sizes **MUST be powers of two**: $1, 2, 4, 8, 16$ cells.\n2. Groups must be rectangular or square (never diagonal or L-shaped).\n3. Maximize group sizes: A group of size $2^k$ eliminates $k$ variables.\n   - Group of 1 cell ($2^0$): Retains all 4 variables.\n   - Group of 2 cells ($2^1$): Eliminates 1 variable (retains 3).\n   - Group of 4 cells ($2^2$): Eliminates 2 variables (retains 2).\n   - Group of 8 cells ($2^3$): Eliminates 3 variables (retains 1).\n   - Group of 16 cells ($2^4$): Eliminates all 4 variables (result $= 1$).\n\n---\n\n## 3. Implicant Definitions: PI vs EPI vs Redundant PI\n\n- **Implicant:** Any single minterm or legal group of minterms where the function is $1$.\n- **Prime Implicant (PI):** A group obtained by combining the maximum possible number of adjacent cells (cannot be subsumed into any larger valid power-of-two group).\n- **Essential Prime Implicant (EPI):** A Prime Implicant that contains **at least one minterm (`1`) that is not covered by ANY other Prime Implicant**. All EPIs **must be included** in the minimal SOP expression!\n- **Redundant Prime Implicant:** A PI whose `1`s are already completely covered by chosen Essential Prime Implicants.\n\n---\n\n## 4. Don't-Care Conditions ($d$ or $X$)\n\nIn many real-world systems, certain input combinations can never occur (e.g., BCD codes `1010` through `1111`).\n- In K-Maps, don't-care cells are marked with `$d$` or `$X$`.\n- **Strategy:** Treat `$d$` as `1` **only if it helps enlarge an existing group of 1s** (to eliminate more variables). If it does not help enlarge a group, leave it as `0`! Never create groups containing only don't-cares!\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Gray Code Order:** `00, 01, 11, 10`.\n- **Elimination Formula:** Group of $2^k$ cells eliminates $k$ variables.\n- **Corner Adjacency:** Cells `0, 2, 8, 10` form a single 4-cell group $\\implies \\overline{B}\\,\\overline{D}$.\n- **Essential PI Test:** A PI covering a minterm with degree of coverage $= 1$.\n",
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
      ],
      "prerequisites": [
        "Canonical SOP and POS forms",
        "Boolean algebra simplification and Gray codes"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Karnaugh Maps and Logic Minimization",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Introduction of K-Map (Karnaugh Map)",
          "url": "https://www.geeksforgeeks.org/introduction-of-k-map-karnaugh-map/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: K-Map Minimization and Prime Implicant Traps",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Combinational Circuits: Design, Delays, Adders & Hazards\n\nIn digital logic design, a **combinational circuit** is a network of interconnected logic gates whose output at any instant depends strictly on the combination of present inputs, possessing **no internal memory elements, state registers, or feedback loops**.\n\n---\n\n## 1. Canonical Arithmetic Combinational Blocks\n\n1. **Half Adder vs. Full Adder:**\n   - **Half Adder:** Adds two 1-bit inputs $(A, B)$.\n     $$\\text{Sum} = A \\oplus B, \\quad \\text{Carry} = A \\cdot B$$\n   - **Full Adder:** Adds three 1-bit inputs $(A, B, C_{\\text{in}})$. Can be synthesized with 2 Half Adders and 1 OR gate:\n     $$\\text{Sum} = A \\oplus B \\oplus C_{\\text{in}}$$\n     $$C_{\\text{out}} = A B + B C_{\\text{in}} + A C_{\\text{in}} = A B + (A \\oplus B) C_{\\text{in}}$$\n2. **Ripple Carry Adder (RCA) vs. Carry Lookahead Adder (CLA):**\n   - **RCA:** Cascades $N$ Full Adders. The carry bit must ripple through all $N$ stages, producing worst-case delay $O(N \\cdot t_{\\text{gate}})$, creating a critical path bottleneck for wide words (32/64-bit).\n   - **CLA:** Computes carries in parallel in $O(1)$ gate delays using generate ($G_i = A_i B_i$) and propagate ($P_i = A_i \\oplus B_i$) signals:\n     $$C_{i+1} = G_i + P_i C_i$$\n     Enables addition in $O(\\log N)$ delay at the expense of higher gate fan-in and silicon area.\n\n---\n\n## 2. Timing Analysis & The Critical Path\n\n- **Propagation Delay ($t_{\\text{pd}}$):** The elapsed time between an input voltage transition reaching $50\\%$ and the resulting output reaching $50\\%$.\n- **Critical Path:** The longest contiguous structural path from any primary input to any primary output.\n- **Maximum Operating Frequency ($f_{\\text{max}}$):** The critical path delay $t_{\\text{critical}}$ dictates the minimum clock period $T_{\\text{clk}} \\ge t_{\\text{critical}} + t_{\\text{setup}} + t_{\\text{cq}}$, bounding $f_{\\text{max}} = 1 / T_{\\text{clk}}$.\n\n---\n\n## 3. Hazards and Glitches in Combinational Networks\n\nA **hazard** is an unwanted transient fluctuation (glitch) on an output signal caused by unequal propagation delays along diverging paths in a multi-gate network:\n\n1. **Static-1 Hazard:** Output is expected to stay at $1$, but momentarily dips to $0$ ($1 \\to 0 \\to 1$).\n   - Occurs in SOP circuits when an input transition switches between two separate Prime Implicant groups on a K-Map.\n   - **Remediation:** Add the redundant **Consensus Term** covering the adjacent minterms so at least one product term remains asserted throughout the transition.\n2. **Static-0 Hazard:** Output is expected to stay at $0$, but momentarily spikes to $1$ ($0 \\to 1 \\to 0$).\n   - Occurs in POS circuits; cured by adding dual consensus sum terms.\n3. **Dynamic Hazard:** Output transitions multiple times during a single planned level transition (e.g. $0 \\to 1 \\to 0 \\to 1$).\n   - Occurs only in multi-level circuits (depth $\\ge 3$) where three or more paths with distinct delays converge.\n",
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
      ],
      "prerequisites": [
        "Boolean Algebra and K-Maps",
        "Basic Logic Gates"
      ],
      "externalResources": [
        {
          "title": "Combinational Logic Circuits Design — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/combinational-circuits-in-digital-logic/",
          "difficulty": "Beginner",
          "isFree": true
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
      "notesMarkdown": "# Adders, Subtractors, Ripple Carry, and Carry Lookahead Adders (CLA)\n\nBinary addition is the core computational operation performed by the Arithmetic Logic Unit (ALU). Because subtraction, multiplication, and division can all be framed around addition, optimizing adder speed directly impacts CPU clock frequency.\n\n---\n\n## 1. Half Adder vs Full Adder\n\n### Half Adder (HA)\nAdds two 1-bit inputs ($A, B$):\n- **Sum ($S$):** $S = A \\oplus B$\n- **Carry ($C$):** $C = A \\cdot B$\n- Requires: 1 XOR gate + 1 AND gate.\n- *Limitation:* Cannot accept a carry input from a prior stage.\n\n### Full Adder (FA)\nAdds three 1-bit inputs ($A, B, C_{\\text{in}}$):\n- **Sum ($S$):** $S = A \\oplus B \\oplus C_{\\text{in}}$\n- **Carry Out ($C_{\\text{out}}$):** $C_{\\text{out}} = AB + BC_{\\text{in}} + AC_{\\text{in}} = AB + C_{\\text{in}}(A \\oplus B)$\n- Implementation using Half Adders: **2 Half Adders + 1 OR gate**.\n\n---\n\n## 2. Ripple Carry Adder (RCA) Propagation Delay\n\nAn $n$-bit Ripple Carry Adder cascades $n$ Full Adders in series:\n\n```\n        A3 B3             A2 B2             A1 B1             A0 B0\n          |                 |                 |                 |\n          v                 v                 v                 v\n       +----+            +----+            +----+            +----+\nC_out -|FA 3|<-- C3 -----|FA 2|<-- C2 -----|FA 1|<-- C1 -----|FA 0|<-- C_in=0\n       +----+            +----+            +----+            +----+\n          |                 |                 |                 |\n          v                 v                 v                 v\n          S3                S2                S1                S0\n```\n\n### Delay Calculation:\nEach FA stage must wait for the carry bit to propagate from the prior stage.\nIf each gate has delay $\\Delta$:\n- Carry out of stage $i$: $t_{\\text{carry}} = 2\\Delta$.\n- Total worst-case propagation delay for an $n$-bit RCA:\n$$\\mathbf{T_{\\text{RCA}} = 2n\\Delta}$$\nFor a 64-bit adder, $128\\Delta$ gate delays is prohibitively slow for gigahertz CPUs!\n\n---\n\n## 3. Carry Lookahead Adder (CLA): Fast $O(1)$ Addition\n\nThe CLA eliminates ripple carry delays by calculating all carry bits **simultaneously in parallel** using two signals:\n- **Carry Generate ($G_i$):** $G_i = A_i \\cdot B_i$ (Stage $i$ generates a carry independently).\n- **Carry Propagate ($P_i$):** $P_i = A_i \\oplus B_i$ (Stage $i$ propagates an incoming carry).\n\n### Recursive Carry Expansion:\n- $C_1 = G_0 + P_0 C_0$\n- $C_2 = G_1 + P_1 C_1 = G_1 + P_1 G_0 + P_1 P_0 C_0$\n- $C_3 = G_2 + P_2 C_2 = G_2 + P_2 G_1 + P_2 P_1 G_0 + P_2 P_1 P_0 C_0$\n- $C_4 = G_3 + P_3 G_2 + P_3 P_2 G_1 + P_3 P_2 P_1 G_0 + P_3 P_2 P_1 P_0 C_0$\n\nEvery carry $C_i$ depends **only on inputs $A, B$ and the initial $C_0$**, evaluated through a 2-level AND-OR circuit in constant time ($O(1)$ gate delay)!\n- *Trade-off:* High fan-in on higher-order gates limits direct CLA width to 4 bits; larger adders use hierarchical 4-bit CLA blocks.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Full Adder from Half Adders:** $2\\text{ HAs} + 1\\text{ OR gate}$.\n- **RCA Delay:** $O(n)$ linear delay ($2n\\Delta$).\n- **CLA Delay:** $O(1)$ constant delay ($4\\Delta$ total for sum).\n- **Subtractor using Adder:** Invert $B$ ($\\overline{B}$) and set $C_0 = 1$ (adds $2$'s complement: $A + \\overline{B} + 1$).\n",
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
      ],
      "prerequisites": [
        "Logic gates, XOR properties, and truth tables",
        "Two's complement signed arithmetic"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Arithmetic Circuits and Adders",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Half Adder and Full Adder with CLA",
          "url": "https://www.geeksforgeeks.org/half-adder-and-full-adder-circuit/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Adder Propagation Delays and CLA Design",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Multiplexers (MUX), Demultiplexers (DEMUX), and Universal Function Generation\n\nA **Multiplexer (Data Selector)** is a combinational circuit that selects binary information from one of many input lines and directs it to a single output line, guided by binary select inputs.\n\n---\n\n## 1. Multiplexer Architecture ($2^n \\times 1$)\n\nA MUX with $n$ select lines has $2^n$ data inputs and $1$ output line:\n\n```\n        Data Inputs:               Select Lines:\n        I0 ------------------+\n        I1 ------------------|\n        I2 ------------------|===>  [ 4:1 MUX ] ---> Output (Y)\n        I3 ------------------+            ^\n                                          |\n                                       S1 S0\n```\n\n### Boolean Output Equation ($4:1$ MUX):\n$$Y = \\overline{S_1}\\,\\overline{S_0}I_0 + \\overline{S_1}S_0 I_1 + S_1\\overline{S_0}I_2 + S_1 S_0 I_3$$\n\n---\n\n## 2. Implementing Any Boolean Function Using a MUX\n\nA $2^n \\times 1$ MUX can implement:\n1. **ANY function of $n$ variables directly** by connecting variables to the $n$ select lines and tying inputs $I_k$ to logic `0` or `1`.\n2. **ANY function of $n+1$ variables** using Shannon's Expansion Theorem!\n\n### Algorithm to Implement $(n+1)$-Variable Function with $2^n \\times 1$ MUX:\nLet function be $F(A, B, C)$:\n1. Connect $n$ variables (e.g., $A, B$) to select lines ($S_1, S_0$).\n2. The remaining variable ($C$) is applied to data inputs as $0, 1, C$, or $\\overline{C}$.\n\n*Worked Example:* Implement $F(A, B, C) = \\sum m(1, 2, 6, 7)$ using $4:1$ MUX:\n- Inputs $AB$ to select lines ($S_1 = A, S_0 = B$).\n- Table of minterms:\n  - Row $AB = 00$: contains $m_0(0)$ and $m_1(C)$. Since $m_1 \\in F$, $I_0 = C$.\n  - Row $AB = 01$: contains $m_2(\\overline{C})$ and $m_3(C)$. Since $m_2 \\in F$, $I_1 = \\overline{C}$.\n  - Row $AB = 10$: contains $m_4, m_5$. Neither in $F \\implies I_2 = 0$.\n  - Row $AB = 11$: contains $m_6(\\overline{C})$ and $m_7(C)$. Both in $F \\implies I_3 = 1$.\n- **Result:** $I_0 = C, \\quad I_1 = \\overline{C}, \\quad I_2 = 0, \\quad I_3 = 1$.\n\n---\n\n## 3. Demultiplexer (DEMUX)\n\nTakes a single input line and routes it to one of $2^n$ possible output lines based on $n$ select lines. A $1 \\times 2^n$ DEMUX with its input line tied to high (`1`) behaves identically to an **$n$-to-$2^n$ Decoder with Enable**!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Inputs vs Select Lines:** $2^n$ data inputs $\\iff n$ select lines.\n- **Universal Function Capability:** $2^n \\times 1$ MUX implements any $(n+1)$-variable Boolean function without extra logic gates (except an inverter if $\\overline{C}$ is needed).\n- **Cascading Formula:** Number of $2 \\times 1$ MUXes to build $N \\times 1$ MUX $= N - 1$.\n",
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
      ],
      "prerequisites": [
        "Logic gates, canonical forms, and truth tables",
        "Decoder basics and binary addressing"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Multiplexers and Function Generators",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Multiplexers in Digital Logic",
          "url": "https://www.geeksforgeeks.org/multiplexers-in-digital-logic/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Multiplexer Design and Implementation Tricks",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Encoders, Priority Encoders, Decoders, and Logic Function Synthesis\n\nEncoders and Decoders are standard MSI (Medium Scale Integration) building blocks used extensively for memory address decoding, data multiplexing, and translating human I/O interfaces to binary representations.\n\n---\n\n## 1. Decoders ($n$-to-$2^n$)\n\nA decoder converts an $n$-bit binary input into $2^n$ unique output lines. Exactly one output line is active (`1` for active-high, `0` for active-low) corresponding to the input binary code.\n\n```\n                  +-------------------+\n        A1 ------>|                   |-----> Y0 = A1' A0'  (m0)\n        A0 ------>|  2-to-4 Decoder   |-----> Y1 = A1' A0   (m1)\n                  |                   |-----> Y2 = A1 A0'   (m2)\n        EN ------>|                   |-----> Y3 = A1 A0    (m3)\n                  +-------------------+\n```\n\n### Implementing Any Function with a Decoder:\nBecause each output of an active-high decoder represents an individual **minterm**, any Boolean function in canonical SOP form can be implemented by connecting the corresponding minterm outputs into an **OR gate**!\n$$F = \\sum m(1, 2, 7) \\implies \\text{Connect outputs } Y_1, Y_2, Y_7 \\text{ to an OR gate!}$$\n\n---\n\n## 2. Encoders and Priority Encoders\n\nAn encoder performs the inverse operation of a decoder, converting $2^n$ input lines into an $n$-bit binary code.\n\n### The Ambiguity in Basic Encoders:\n1. If two or more inputs are active simultaneously, the output produces an invalid, garbled code.\n2. If all inputs are `0`, the output `00` is indistinguishable from input $D_0$ being active.\n\n### The Priority Encoder Solution:\nA **Priority Encoder** establishes a strict hierarchy: if multiple inputs are active simultaneously, the output reflects the input with the **highest priority index** (typically MSB).\n- **Valid Bit ($V$):** An additional output flag where $V = 1$ indicates that at least one input is active; $V = 0$ indicates no inputs are active.\n\n```\n4-to-2 Priority Encoder Truth Table (D3 highest priority):\n  D3   D2   D1   D0  |  Y1   Y0   V\n---+----+----+---+---+---+---+---\n   0    0    0    0  |   X    X   0  (No valid input)\n   0    0    0    1  |   0    0   1\n   0    0    1    X  |   0    1   1\n   0    1    X    X  |   1    0   1\n   1    X    X    X  |   1    1   1\n```\n\n---\n\n## 3. Decoder Expansion\n\nSmaller decoders can be cascaded to construct larger decoders using the **Enable ($EN$)** input.\n- To build a $3$-to-$8$ decoder using two $2$-to-$4$ decoders:\n  - Connect inputs $A, B$ to inputs of both $2$-to-$4$ decoders.\n  - Connect input $C$ to Enable: $C$ directly enables the high decoder, and $\\overline{C}$ enables the low decoder.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Decoder Minterm Generator:** Output $Y_i$ corresponds to minterm $m_i$.\n- **SOP Synthesis:** $n$-to-$2^n$ Decoder $+$ OR gate implements any $n$-variable function.\n- **Priority Encoder:** Resolves concurrent inputs via priority ranking + Valid flag ($V$).\n- **Decoder Expansion Formula:** Number of $k$-input decoders to build $m$-input decoder $= 2^{m-k}$.\n",
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
      ],
      "prerequisites": [
        "Multiplexers and binary addressing",
        "Truth tables and active-low logic"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Decoders, Encoders, and Memory Addressing",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Encoders and Decoders in Digital Logic",
          "url": "https://www.geeksforgeeks.org/encoder-in-digital-logic/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Priority Encoders and Decoder Expansion",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Flip-Flops, Latches, Race-Around Condition, and Excitation Tables\n\nUnlike combinational circuits whose outputs depend solely on present inputs, **Sequential Circuits** incorporate memory feedback elements, allowing outputs to depend on both present inputs and past history (current state).\n\n---\n\n## 1. Latches vs Flip-Flops\n\n- **Latch:** **Level-triggered**. Sensitive to input changes whenever the enable/clock signal is at logic level high (transparent).\n- **Flip-Flop:** **Edge-triggered**. Samples inputs and updates state **only on a clock transition** (Rising/Positive edge or Falling/Negative edge).\n\n---\n\n## 2. Core Flip-Flop Architectures\n\n### 1. SR Flip-Flop\n- Inputs: Set ($S$), Reset ($R$).\n- **Characteristic Equation:** $Q_{n+1} = S + \\overline{R}Q_n$ with constraint $S \\cdot R = 0$.\n- **Forbidden State:** $S = 1, R = 1$ causes $Q = \\overline{Q} = 0$, leading to non-deterministic race conditions upon release.\n\n### 2. JK Flip-Flop\nResolves the SR forbidden state by toggling when $J = K = 1$:\n- **Characteristic Equation:** $\\mathbf{Q_{n+1} = J\\overline{Q_n} + \\overline{K}Q_n}$.\n\n### 3. D Flip-Flop (Data / Delay)\nPrevents forbidden states by enforcing $S = \\overline{R} = D$:\n- **Characteristic Equation:** $\\mathbf{Q_{n+1} = D}$.\n- Used as the universal storage element in CPU registers and cache memories.\n\n### 4. T Flip-Flop (Toggle)\nToggles state whenever $T = 1$:\n- **Characteristic Equation:** $\\mathbf{Q_{n+1} = T \\oplus Q_n}$.\n- Ideal for frequency dividers and binary counters.\n\n---\n\n## 3. The Race-Around Condition in JK Flip-Flops\n\nIn a level-triggered JK flip-flop, if $J = K = 1$, the output toggles ($0 \\to 1 \\to 0 \\to 1\\dots$).\nIf the clock pulse width $t_p$ is greater than the propagation delay $t_{\\text{pd}}$ of the flip-flop:\n$$\\mathbf{t_p > t_{\\text{pd}}}$$\nThe output will toggle continuously and unpredictably multiple times during a single clock pulse, leaving an ambiguous final state!\n\n```\nClock Pulse (tp)    +------------------------+\n                    |                        |\nOutput Q            +-+  +-+  +-+  +-+  +-+  +\n                    | |  | |  | |  | |  | |  |  <-- Race-Around Toggling!\n```\n\n### Solutions to Race-Around:\n1. Ensure clock pulse width $t_p < t_{\\text{pd}}$ (difficult to control in practice).\n2. Use **Edge-Triggered Flip-Flops**.\n3. Use a **Master-Slave JK Flip-Flop** (Master samples on rising edge, Slave transfers to output on falling edge).\n\n---\n\n## 4. Excitation Tables (Crucial for Counter & FSM Design)\n\nAn excitation table dictates what inputs are required to force a state transition from Present State ($Q_n$) to Next State ($Q_{n+1}$):\n\n| $Q_n \\to Q_{n+1}$ | $S \\quad R$ | $J \\quad K$ | $D$ | $T$ |\n| :---: | :---: | :---: | :---: | :---: |\n| **$0 \\to 0$** | $0 \\quad X$ | $0 \\quad X$ | $0$ | $0$ |\n| **$0 \\to 1$** | $1 \\quad 0$ | $1 \\quad X$ | $1$ | $1$ |\n| **$1 \\to 0$** | $0 \\quad 1$ | $X \\quad 1$ | $0$ | $1$ |\n| **$1 \\to 1$** | $X \\quad 0$ | $X \\quad 0$ | $1$ | $0$ |\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **D-FF Characteristic:** $Q_{n+1} = D$.\n- **T-FF Characteristic:** $Q_{n+1} = T \\oplus Q_n$.\n- **JK-FF Characteristic:** $Q_{n+1} = J\\overline{Q}_n + \\overline{K}Q_n$.\n- **Race-Around Condition:** Occurs in level-triggered JK when $J=K=1$ and $t_p > t_{\\text{pd}}$.\n",
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
      ],
      "prerequisites": [
        "Logic gates, feedback loops, and truth tables",
        "Combinational circuit delay concepts"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Sequential Logic, Latches, and Flip-Flops",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Flip-Flop Types, Conversion, and Applications",
          "url": "https://www.geeksforgeeks.org/flip-flop-types-conversion-and-applications/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Race-Around Condition and Master-Slave Flip-Flops",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Counters, Mod-N Frequency Dividers, and Shift Registers\n\nCounters and registers are fundamental sequential subsystems used for event counting, program counter sequencing, frequency division, and parallel-to-serial data conversion.\n\n---\n\n## 1. Asynchronous (Ripple) vs Synchronous Counters\n\n```\nASYNCHRONOUS (RIPPLE) COUNTER:               SYNCHRONOUS COUNTER:\nClock connects ONLY to FF 0.                 Clock connects SIMULTANEOUSLY\nOutput Q0 clocks FF 1, Q1 clocks FF 2...     to ALL flip-flops!\n(Ripple Delay accumulates: n * t_pd)         (Single t_pd delay!)\n```\n\n| Dimension | Asynchronous (Ripple) Counter | Synchronous Counter |\n| :--- | :--- | :--- |\n| **Clocking** | Clock applied only to LSB; subsequent stages clocked by prior FF outputs | Common clock applied to all flip-flops simultaneously |\n| **Propagation Delay** | $\\mathbf{T = n \\cdot t_{\\text{pd}}}$ (accumulates with each stage) | $\\mathbf{T = t_{\\text{pd}} + \\text{gate delay}}$ (constant) |\n| **Maximum Frequency** | Low: $f_{\\max} = \\frac{1}{n \\cdot t_{\\text{pd}}}$ | High: $f_{\\max} = \\frac{1}{t_{\\text{pd}} + t_{\\text{logic}}}$ |\n| **Circuit Complexity** | Simple hardware wiring | More complex combinational steering logic |\n| **Glitches** | Vulnerable to decoding spikes due to intermediate ripple states | Glitch-free synchronous state transitions |\n\n---\n\n## 2. Modulus (Mod-N) of Counters\n\nThe **Modulus ($N$)** of a counter is the total number of unique states it cycles through before repeating:\n- An $n$-bit counter has a maximum modulus of $N_{\\max} = 2^n$.\n- To build a counter of modulus $N$, the minimum number of flip-flops required is:\n$$n = \\lceil \\log_2 N \\rceil$$\n- *Example:* A Mod-10 (Decade / BCD) counter cycles through 10 states (`0000` to `1001`), requiring $\\lceil \\log_2 10 \\rceil = \\mathbf{4\\text{ flip-flops}}$ and clearing when state `1010` (10) is detected.\n\n---\n\n## 3. Shift Register Architectures\n\nA register is a cascade of flip-flops used to store and shift multi-bit binary words:\n1. **SISO (Serial-In, Serial-Out):** Requires $n$ clock cycles to load, and $n-1$ cycles to read.\n2. **SIPO (Serial-In, Parallel-Out):** Requires $n$ clock cycles to load; outputs all $n$ bits simultaneously in $1$ cycle.\n3. **PISO (Parallel-In, Serial-Out):** Loads all bits in 1 cycle; shifts out serially in $n-1$ cycles.\n4. **PIPO (Parallel-In, Parallel-Out):** Loads and reads in **1 clock cycle** (fastest data transfer).\n\n### Ring Counter vs Johnson (Twisted-Ring) Counter:\n- **Ring Counter ($n$ Flip-Flops):** Connects $Q_{n-1}$ back to $D_0$ in a circle. Circulates a single `1` bit (`1000 -> 0100 -> 0010 -> 0001`).\n  - Total States: $\\mathbf{n\\text{ states}}$.\n- **Johnson Counter ($n$ Flip-Flops):** Connects inverted $\\overline{Q}_{n-1}$ back to $D_0$.\n  - Total States: $\\mathbf{2n\\text{ states}}$ (Doubles the states with zero extra flip-flops!).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Flip-Flops for Mod-$N$:** $n = \\lceil \\log_2 N \\rceil$.\n- **Ripple Counter Delay:** $n \\times t_{\\text{pd}} \\le T_{\\text{clk}} \\implies f_{\\max} = \\frac{1}{n \\cdot t_{\\text{pd}}}$.\n- **Ring Counter States:** $n$.\n- **Johnson Counter States:** $2n$.\n- **Frequency Division:** An $n$-bit counter divides clock frequency by $2^n$ at the MSB output: $f_{\\text{out}} = \\frac{f_{\\text{in}}}{2^n}$.\n",
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
      ],
      "prerequisites": [
        "Flip-flops, excitation tables, and clock triggering",
        "Binary state sequencing"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Registers, Shift Registers, and Synchronous Counters",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Counters in Digital Logic",
          "url": "https://www.geeksforgeeks.org/counters-in-digital-logic/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Counter Modulus and Shift Register Calculations",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Sequential Circuits, Finite-State Machines (Mealy vs Moore), and Synthesis\n\nA Finite-State Machine (FSM) is a mathematical abstraction of a sequential circuit that transitions through a finite set of internal states driven by clock pulses and external inputs.\n\n---\n\n## 1. Mealy Machine vs Moore Machine\n\n```\nMOORE MACHINE: Output depends ONLY on Current State\nInputs -----> [ Next State Logic ] -----> [ State Memory (FFs) ] -----> [ Output Logic ] -----> Outputs\n                      ^                          |\n                      |                          |\n                      +--------------------------+\n\nMEALY MACHINE: Output depends on Current State AND Current Inputs!\nInputs ---+-> [ Next State Logic ] -----> [ State Memory (FFs) ]\n          |           ^                          |\n          |           |                          |\n          |           +--------------------------+\n          |                                      |\n          +----------------------------> [ Output Logic ] -----> Outputs\n```\n\n| Dimension | Moore Machine | Mealy Machine |\n| :--- | :--- | :--- |\n| **Output Function** | $\\mathbf{Output = \\lambda(Current\\_State)}$ | $\\mathbf{Output = \\lambda(Current\\_State, Inputs)}$ |\n| **State Count** | Typically requires **more states** to detect patterns | Requires **fewer or equal states** |\n| **Response Time** | Updates output **one clock cycle later** (synchronous to clock) | Reacts **immediately in current cycle** to input changes |\n| **Glitch Susceptibility**| Low (glitch-free: outputs change only on clock edges) | High (asynchronous input glitches propagate directly to outputs) |\n\n---\n\n## 2. Step-by-Step FSM Synthesis Procedure\n\n1. **State Diagram:** Formalize problem into states and directed transition arcs.\n2. **State Table:** Map Present State + Inputs $\\to$ Next State + Outputs.\n3. **State Reduction:** Eliminate redundant equivalent states using the **Row Equivalence Method** or **Implication Table**.\n4. **State Assignment:** Assign unique binary codes ($m$ flip-flops for $S$ states: $m = \\lceil \\log_2 S \\rceil$).\n5. **Excitation Table Mapping:** Use flip-flop excitation tables (e.g., D-FF or JK-FF) to determine input equations.\n6. **K-Map Simplification:** Derive minimal Boolean equations for flip-flop inputs and circuit outputs.\n7. **Circuit Schematic:** Implement with flip-flops and combinational logic gates.\n\n---\n\n## 3. Worked Example: Sequence Detector (Detects `101`)\n\n### Moore Machine for Overlapping `101` Detector:\n- $S_0$: Reset state (no bits matched), Output $= 0$.\n- $S_1$: Matched `1`, Output $= 0$.\n- $S_2$: Matched `10`, Output $= 0$.\n- $S_3$: Matched `101`, Output $= 1$.\n- Transitions from $S_3$:\n  - If next bit is `0`: string ends in `10` $\\implies$ transition to $S_2$.\n  - If next bit is `1`: string ends in `1` $\\implies$ transition to $S_1$.\n- Requires **4 States** in Moore Machine. (A Mealy machine requires only 3 states!).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Moore Output:** Solely a function of Present State.\n- **Mealy Output:** Function of Present State $\\land$ Present Input.\n- **State Count Relationship:** $N_{\\text{Moore}} = N_{\\text{Mealy}} + 1$ (typically for sequence detectors).\n- **Setup Time ($t_{\\text{su}}$) and Hold Time ($t_h$):** Inputs must remain stable for $t_{\\text{su}}$ before clock edge, and $t_h$ after clock edge to avoid **Metastability**.\n",
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
      ],
      "prerequisites": [
        "Flip-flops, excitation tables, and synchronous counters",
        "State transition diagrams and logic minimization"
      ],
      "externalResources": [
        {
          "title": "MIT 6.004: Finite State Machines (FSM) Design and Synthesis",
          "url": "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Mealy and Moore Machines in Digital Logic",
          "url": "https://www.geeksforgeeks.org/difference-between-mealy-machine-and-moore-machine/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: FSM State Minimization and Circuit Synthesis",
          "url": "https://www.interviewbit.com/digital-electronics-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    }
  ]
};
