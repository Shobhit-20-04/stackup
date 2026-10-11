import type { SectionCategory } from './types';

export const DIGITAL_LOGIC_CATEGORY: SectionCategory = {
  id: "dld",
  slug: "digital-logic-design",
  title: "Digital Logic Design (DLD)",
  description: "Boolean algebra, logic gates, K-maps, combinational circuits, flip-flops, counters, and finite-state machines.",
  icon: "Cpu",
  topics: [
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
    "notesMarkdown": "# Number Systems and Base Conversions\n\n---\n\n## 1. Positional Radix Representation\n$$(N)_r = \\sum_{i=-m}^{n-1} d_i \\cdot r^i$$\n\n- **Binary (base 2):** Digits $\\{0, 1\\}$\n- **Octal (base 8):** Digits $\\{0, 1, \\dots, 7\\}$ (Groups of 3 binary bits)\n- **Hexadecimal (base 16):** Digits $\\{0-9, A-F\\}$ (Groups of 4 binary bits)\n\n---\n\n## 2. Fast Bit Grouping Shortcut\n$$\\text{Binary: } \\underbrace{1101}_{D} \\; \\underbrace{1010}_{A} \\; \\underbrace{0111}_{7} = (DA7)_{16}$$\n",
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
    "notesMarkdown": "# Fixed-Point and Floating-Point Representation\n\n---\n\n## 1. IEEE 754 Single Precision (32-Bit)\n- **Sign ($S$):** 1 bit (0 for positive, 1 for negative)\n- **Exponent ($E$):** 8 bits (Bias = $127$)\n- **Mantissa ($M$):** 23 bits (normalized implicit leading $1$)\n\n$$\\text{Value} = (-1)^S \\times (1.M)_2 \\times 2^{E - 127}$$\n\n---\n\n## 2. Special Encodings\n- **Zero ($+0, -0$):** $E = 0, M = 0$\n- **Denormalized numbers:** $E = 0, M \\ne 0$ (Value $= (-1)^S \\times 0.M \\times 2^{-126}$)\n- **Infinity ($+\\infty, -\\infty$):** $E = 255, M = 0$\n- **NaN (Not a Number):** $E = 255, M \\ne 0$\n",
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
    "notesMarkdown": "# Boolean Algebra in Digital Logic\n\n---\n\n## 1. Consensus Theorem\n$$A B + A' C + B C = A B + A' C$$\n- Term $B C$ is redundant because $B C = B C(A + A') = A B C + A' B C$, which are absorbed by $A B$ and $A' C$.\n- Dual form: $(A + B)(A' + C)(B + C) = (A + B)(A' + C)$.\n\n---\n\n## 2. Shannon's Expansion\nAny Boolean function can be expanded about variable $A$:\n$$f(A, B, C) = A \\cdot f(1, B, C) + A' \\cdot f(0, B, C)$$\nCrucial for implementing logic via Multiplexers!\n",
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
    "notesMarkdown": "# Logic Gates\n\n---\n\n## 1. Universal Gates Implementation Matrix\n\n| Desired Gate | Minimum NAND Gates Required | Minimum NOR Gates Required |\n| :--- | :--- | :--- |\n| **NOT** | 1 | 1 |\n| **AND** | 2 | 3 |\n| **OR** | 3 | 2 |\n| **NOR** | 4 | 1 |\n| **NAND** | 1 | 4 |\n| **XOR** | **4** | **5** |\n| **XNOR** | **5** | **4** |\n\n---\n\n## 2. XOR & XNOR Identities\n- $A \\oplus 0 = A$, $A \\oplus 1 = A'$\n- $A \\oplus A = 0$, $A \\oplus A' = 1$\n- For $n$ variables, XOR is true iff an **odd** number of inputs are 1.\n",
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
    "notesMarkdown": "# Canonical Forms: SOP and POS\n\n---\n\n## 1. Minterms vs Maxterms\nFor 3 variables $(A, B, C)$ with binary value $101$ ($5$):\n- **Minterm ($m_5$):** $A B' C$ (Equals 1 strictly for $101$).\n- **Maxterm ($M_5$):** $A' + B + C'$ (Equals 0 strictly for $101$).\n- **Relationship:** $M_i = (m_i)'$\n\n---\n\n## 2. Converting SOP to POS\n$$\\sum m(1, 2, 5) = \\prod M(0, 3, 4, 6, 7)$$\nThe indices omitted from the minterm list form the exact maxterm list.\n",
    "questions": [
      {
        "id": "dld-canon-1",
        "question": "If a 3-variable Boolean function is f(A, B, C) = \u03a3 m(0, 2, 4, 6), what is its canonical POS representation?",
        "options": [
          "\u03a0 M(0, 2, 4, 6)",
          "\u03a0 M(1, 3, 5, 7)",
          "\u03a3 m(1, 3, 5, 7)",
          "\u03a0 M(1, 2, 3, 4)"
        ],
        "correct_option": 1,
        "explanation": "The POS form comprises all maxterms whose indices do not appear in the SOP form. The missing indices from {0, 2, 4, 6} are {1, 3, 5, 7}, giving \u03a0 M(1, 3, 5, 7)."
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
    "notesMarkdown": "# Adders and Subtractors\n\n---\n\n## 1. Full Adder Logic\n- **Sum ($S$):** $A \\oplus B \\oplus C_{in}$\n- **Carry Out ($C_{out}$):** $A B + C_{in}(A \\oplus B) = A B + B C_{in} + C_{in} A$\n\n---\n\n## 2. Carry Lookahead Adder (CLA)\nEliminates $O(n)$ ripple carry delay:\n- **Carry Generate ($G_i$):** $G_i = A_i B_i$\n- **Carry Propagate ($P_i$):** $P_i = A_i \\oplus B_i$ (or $A_i + B_i$)\n- $C_{i+1} = G_i + P_i C_i$\n- Expansion:\n  - $C_1 = G_0 + P_0 C_0$\n  - $C_2 = G_1 + P_1 G_0 + P_1 P_0 C_0$\nAll carries generated simultaneously in **constant $O(1)$ delay**!\n",
    "questions": [
      {
        "id": "dld-add-1",
        "question": "What are the Boolean expressions for the Sum and Carry outputs of a Full Adder with inputs A, B, and Cin?",
        "options": [
          "Sum = A + B + Cin, Carry = ABCin",
          "Sum = A \u2295 B \u2295 Cin, Carry = AB + Cin(A \u2295 B)",
          "Sum = A \u2295 B, Carry = AB",
          "Sum = AB + Cin, Carry = A \u2295 B \u2295 Cin"
        ],
        "correct_option": 1,
        "explanation": "Full adder sum is the 3-input XOR (A \u2295 B \u2295 Cin) and carry-out is AB + Cin(A \u2295 B) (or AB + BCin + ACin)."
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
    "notesMarkdown": "# Multiplexers and Demultiplexers\n\n---\n\n## 1. Multiplexer (MUX)\nA $2^n$-to-1 multiplexer routes one of $2^n$ data inputs to a single output line based on $n$ select lines:\n$$Y = \\sum_{i=0}^{2^n-1} m_i \\cdot I_i$$\n\n---\n\n## 2. Implementing Logic with $(2^{n-1} \\times 1)$ MUX\nTo implement an $n$-variable function $f(A, B, C)$ with a $4 \\times 1$ MUX ($2$ select lines):\n1. Connect $A, B$ to select lines $S_1, S_0$.\n2. For each input $I_0, I_1, I_2, I_3$, express output in terms of the remaining variable $C$ ($\\{0, 1, C, C'\\}$).\n",
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
    "notesMarkdown": "# Encoders and Decoders\n\n---\n\n## 1. Decoders ($n$ to $2^n$)\nConverts an $n$-bit binary input into $2^n$ unique output minterms:\n- A $3$-to-$8$ decoder has $3$ inputs, $1$ enable line, and $8$ outputs ($Y_0$ to $Y_7$).\n- Any Boolean function can be implemented using a decoder plus an OR gate.\n\n---\n\n## 2. Priority Encoders\nStandard encoders fail if more than one input is active.\n- **Priority Encoder:** If multiple inputs are high, it outputs the binary code of the **highest-order active input**.\n- Produces a valid bit ($V$) to indicate if at least one input is active.\n",
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
          "Q_next = J \u2295 K"
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
        "explanation": "In a Moore machine, output logic is a function of the current state alone: Output = \u03bb(State). In a Mealy machine, output is a function of both state and current inputs: Output = \u03bb(State, Input)."
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
      }
    ]
  }
]
};
