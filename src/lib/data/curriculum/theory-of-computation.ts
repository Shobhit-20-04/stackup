import type { SectionCategory } from './types';

export const TOC_CATEGORY: SectionCategory = {
  "id": "toc",
  "slug": "theory-of-computation",
  "title": "Theory of Computation (TOC)",
  "description": "Automata theory, regular expressions, grammars, pushdown automata, Turing machines, and decidability.",
  "icon": "GitBranch",
  "topics": [
    {
      "id": "toc-alphabets-strings-languages",
      "slug": "alphabets-strings-and-languages",
      "title": "Alphabets, Strings, and Languages",
      "description": "Symbols, alphabets (Sigma), string operations (concatenation, prefix, suffix, reversal), Kleene star (Sigma*), and language definitions.",
      "estimatedMinutes": 15,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Microsoft",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "Alphabet (Sigma): Non-empty finite set of symbols.",
        "String: Finite sequence of symbols; length |w| is symbol count; empty string epsilon has length 0.",
        "Kleene Closure (Sigma*): Set of all finite strings over Sigma including epsilon.",
        "Positive Closure (Sigma+): Sigma* \\ {epsilon} (all non-empty strings)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Alphabets+Strings+Languages+Kleene+Star+TOC+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Alphabets, Strings, Operations, and Formal Languages\n\nTheoretical computer science investigates the fundamental mathematical capabilities and limitations of computation. Before defining abstract computing machines (automata), we establish the formal alphabet, string, and language primitives upon which all computational models operate.\n\n---\n\n## 1. Mathematical Definitions: Symbols, Alphabets, and Strings\n\n- **Symbol:** An atomic, indivisible entity (e.g., characters `0, 1`, letters `a, b`).\n- **Alphabet ($\\Sigma$):** A non-empty, **finite set** of symbols.\n  - Binary Alphabet: $\\Sigma = \\{0, 1\\}$.\n  - English Alphabet: $\\Sigma = \\{a, b, \\dots, z\\}$.\n- **String (Word):** A finite sequence of symbols chosen from an alphabet $\\Sigma$.\n  - Example over $\\Sigma = \\{0, 1\\}$: $w = 01101$.\n- **Empty String ($\\epsilon$ or $\\lambda$):** The unique string containing zero symbols. Length: $|\\epsilon| = 0$.\n\n---\n\n## 2. Fundamental Operations on Strings\n\n1. **Length of a String ($|w|$):** The total number of symbol occurrences in $w$.\n   - If $w = 1011$, then $|w| = 4$. $|\\epsilon| = 0$.\n2. **String Reversal ($w^R$):** The string written in reverse order.\n   - If $w = \\text{\"cat\"}$, then $w^R = \\text{\"tac\"}$. Formally: $(uv)^R = v^R u^R$.\n3. **String Concatenation ($uv$ or $u \\cdot v$):** Appending string $v$ to string $u$.\n   - Length rule: $|u \\cdot v| = |u| + |v|$.\n   - Identity: $w \\cdot \\epsilon = \\epsilon \\cdot w = w$.\n4. **String Exponentiation ($w^k$):** Concatenating string $w$ with itself $k$ times:\n   - $w^0 = \\epsilon$.\n   - $w^{k} = w \\cdot w^{k-1}$.\n5. **Prefix, Suffix, and Substring:**\n   - For string $w = xyz$: $x$ is a prefix, $y$ is a substring, and $z$ is a suffix.\n   - Proper prefix: A prefix $x \\ne w$.\n   - Total substrings of a string of length $n$ with all distinct symbols: $\\frac{n(n+1)}{2} + 1$ (including $\\epsilon$).\n\n---\n\n## 3. Kleene Star ($\\Sigma^*$) vs Positive Closure ($\\Sigma^+$)\n\n- **Powers of an Alphabet ($\\Sigma^k$):** The set of all strings over $\\Sigma$ of exact length $k$.\n  - If $\\Sigma = \\{0, 1\\}$: $\\Sigma^0 = \\{\\epsilon\\}$, $\\Sigma^1 = \\{0, 1\\}$, $\\Sigma^2 = \\{00, 01, 10, 11\\}$.\n  - $|\\Sigma^k| = |\\Sigma|^k$.\n- **Kleene Star ($\\Sigma^*$):** The set of all possible strings of **any finite length** (including $\\epsilon$):\n  $$\\Sigma^* = \\Sigma^0 \\cup \\Sigma^1 \\cup \\Sigma^2 \\cup \\Sigma^3 \\dots = \\bigcup_{i=0}^{\\infty} \\Sigma^i$$\n  *Property:* $\\Sigma^*$ is always an **infinitely countable set** for any non-empty $\\Sigma$.\n- **Positive Closure ($\\Sigma^+$):** Excludes the empty string:\n  $$\\Sigma^+ = \\Sigma^1 \\cup \\Sigma^2 \\cup \\Sigma^3 \\dots \\implies \\Sigma^* = \\Sigma^+ \\cup \\{\\epsilon\\}$$\n\n---\n\n## 4. Formal Languages\n\nA **Language ($L$)** over an alphabet $\\Sigma$ is any subset of $\\Sigma^*$:\n$$L \\subseteq \\Sigma^*$$\n- **Empty Language ($\\emptyset$ or $\\{\\}$):** Contains zero strings ($|\\emptyset| = 0$).\n- **Language containing only empty string ($\\{\\epsilon\\}$):** Contains exactly one string ($|\\{\\epsilon\\}| = 1$).\n  *(Crucial distinction: $\\emptyset \\ne \\{\\epsilon\\}$!)*\n- **Complement of Language ($\\overline{L}$):** $\\overline{L} = \\Sigma^* - L$.\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Substrings of string of length $n$ (distinct chars):** $\\frac{n(n+1)}{2} + 1$.\n- **Reversal Identity:** $(uv)^R = v^R u^R$.\n- **Kleene Star:** $\\Sigma^* = \\bigcup_{i=0}^{\\infty} \\Sigma^i$ (contains $\\epsilon$).\n- **Positive Closure:** $\\Sigma^+ = \\Sigma^* - \\{\\epsilon\\}$ (if $\\epsilon \\notin \\Sigma$).\n- **Empty Set vs Empty String:** $|\\emptyset| = 0$ while $|\\{\\epsilon\\}| = 1$.\n",
      "questions": [
        {
          "id": "toc-asl-1",
          "question": "If alphabet Sigma has 2 symbols {0, 1}, how many strings of length exactly 4 can be formed?",
          "options": [
            "8",
            "16",
            "32",
            "4"
          ],
          "correct_option": 1,
          "explanation": "For an alphabet of size |Sigma| = 2, the number of distinct strings of length n is |Sigma|^n = 2^4 = 16."
        },
        {
          "id": "toc-asl-2",
          "question": "What is the relationship between the Kleene Star (Sigma*) and Positive Closure (Sigma+)?",
          "options": [
            "Sigma* = Sigma+ U {epsilon}",
            "Sigma+ = Sigma* U {epsilon}",
            "Sigma* and Sigma+ are identical",
            "Sigma+ has fewer symbols than Sigma"
          ],
          "correct_option": 0,
          "explanation": "Kleene Star includes strings of length 0 (epsilon), whereas Positive Closure includes only strings of length >= 1. Hence, Sigma* = Sigma+ U {epsilon}."
        },
        {
          "id": "toc-alpha-3",
          "question": "If Sigma = {0, 1}, what is the cardinality of Sigma^3 (strings of length exactly 3)?",
          "options": [
            "8",
            "6",
            "16",
            "7"
          ],
          "correct_option": 0,
          "explanation": "For an alphabet of size |Sigma| = k, the number of distinct strings of length n is k^n. Here 2^3 = 8."
        }
      ],
      "prerequisites": [
        "Discrete mathematics: Set theory, Cartesian products, and relations",
        "Mathematical induction basics"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Theory of Computation - Formal Languages",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Introduction to Theory of Computation",
          "url": "https://www.geeksforgeeks.org/introduction-of-theory-of-computation/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Automata Theory Alphabets and Languages",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-regular-expressions",
      "slug": "regular-expressions",
      "title": "Regular Expressions",
      "description": "Operators (union, concatenation, Kleene star), algebraic identities, Arden's theorem, and regex to automata.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Adobe"
      ],
      "keyTakeaways": [
        "Regular expressions describe Regular Languages via operators: Union (+), Concatenation (.), and Kleene star (*).",
        "Arden's Theorem: If P and Q are regular expressions and epsilon not in P, then R = Q + RP has the unique solution R = QP*.",
        "Identities: (r*)* = r*; (r + s)* = (r* s*)*; epsilon + r r* = r*.",
        "Empty language phi vs empty string epsilon: phi* = {epsilon}; phi . L = phi."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Regular+Expressions+Ardens+Theorem+TOC+Theory+of+Computation+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Regular Expressions, Algebraic Identities, and Arden's Theorem\n\nA Regular Expression (RegEx) is an algebraic notation used to specify and describe regular languages. Regular expressions define the lexical patterns recognized by lexers, tokenizers, search utilities (`grep`), and finite-state automata.\n\n---\n\n## 1. Inductive Definition of Regular Expressions\n\nGiven an alphabet $\\Sigma$, a regular expression $R$ and its corresponding language $L(R)$ are defined recursively:\n\n### Base Cases:\n1. $\\emptyset$: $L(\\emptyset) = \\emptyset$ (Empty language).\n2. $\\epsilon$: $L(\\epsilon) = \\{\\epsilon\\}$ (Language containing only the empty string).\n3. $a$ (for each $a \\in \\Sigma$): $L(a) = \\{a\\}$.\n\n### Inductive Steps:\nIf $R_1$ and $R_2$ are regular expressions:\n4. **Union ($R_1 + R_2$ or $R_1 \\mid R_2$):** $L(R_1 + R_2) = L(R_1) \\cup L(R_2)$.\n5. **Concatenation ($R_1 \\cdot R_2$):** $L(R_1 \\cdot R_2) = L(R_1) \\cdot L(R_2)$.\n6. **Kleene Star ($R_1^*$):** $L(R_1^*) = (L(R_1))^*$.\n\nOperator Precedence: **Kleene Star ($*$) > Concatenation ($\\cdot$) > Union ($+$)**.\n\n---\n\n## 2. Fundamental Algebraic Identities\n\n- $R + \\emptyset = R$\n- $R \\cdot \\emptyset = \\emptyset \\cdot R = \\emptyset$\n- $R \\cdot \\epsilon = \\epsilon \\cdot R = R$\n- $\\epsilon^* = \\epsilon, \\quad \\emptyset^* = \\epsilon$\n- $R + R = R$ (Idempotent)\n- $R^* R^* = R^*$\n- $(R^*)^* = R^*$\n- $(a + b)^* = (a^* b^*)^* = (a^* + b^*)^* = (a + ba^*)^*$\n- $a(ba)^* = (ab)^* a$\n\n---\n\n## 3. Arden's Theorem (Converting State Transitions to Regex)\n\nArden's Theorem provides a systematic method to solve recursive language equations and extract the regular expression of a finite automaton directly from its state transition equations.\n\n```\nArden's Theorem Statement:\nLet P and Q be two regular expressions over Sigma.\nIf P does not contain the empty string epsilon (epsilon not in L(P)),\nthen the equation:\n               R = Q + RP\nhas a UNIQUE solution given by:\n               R = Q P*\n```\n\n### Application to Finite Automata:\nFor each state $q_i$, express its incoming transitions as:\n$$q_i = \\sum_{j} q_j \\cdot a_{ji} + (\\epsilon \\text{ if } q_i \\text{ is the start state})$$\nSolve the simultaneous equations using substitution and Arden's theorem until the final accepting state expression is isolated!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Empty Set vs Epsilon:** $\\emptyset^* = \\{\\epsilon\\}$, but $\\emptyset \\cdot R = \\emptyset$.\n- **Arden's Form:** $R = Q + RP \\implies R = QP^*$.\n- **Universal Binary String:** $(0 + 1)^*$.\n- **Even Number of 0s:** $(1^* 0 1^* 0 1^*)^*$.\n",
      "questions": [
        {
          "id": "toc-re-1",
          "question": "According to Arden's Theorem, if epsilon is not in P, what is the unique solution to R = Q + RP?",
          "options": [
            "R = P*Q",
            "R = QP*",
            "R = Q*P",
            "R = (Q + P)*"
          ],
          "correct_option": 1,
          "explanation": "Arden's theorem states that the equation R = Q + RP has the unique solution R = Q * P*."
        },
        {
          "id": "toc-re-2",
          "question": "Which regular expression denotes all strings over {0, 1} that start and end with the same symbol?",
          "options": [
            "0(0+1)*0 + 1(0+1)*1 + 0 + 1",
            "(0+1)*",
            "0*1*",
            "(01 + 10)*"
          ],
          "correct_option": 0,
          "explanation": "Strings of length 1: '0' and '1'. Strings of length >= 2: starting and ending with 0 -> 0(0+1)*0; starting and ending with 1 -> 1(0+1)*1. Total: 0(0+1)*0 + 1(0+1)*1 + 0 + 1."
        },
        {
          "id": "toc-re-3",
          "question": "Which of the following regular expression algebraic identities is FALSE in general?",
          "options": [
            "(R + S)* = R* + S*",
            "(R*)* = R*",
            "(RS)* R = R(SR)*",
            "R(S + T) = RS + RT"
          ],
          "correct_option": 0,
          "explanation": "The identity (R + S)* = R* + S* is false because (R + S)* allows arbitrary interleaved combinations of strings from R and S (e.g. 'rs'), whereas R* + S* only permits strings composed entirely of R or entirely of S."
        }
      ],
      "prerequisites": [
        "Alphabets, strings, and language operations",
        "Set operations and inductive definitions"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Regular Expressions and Regular Languages",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Regular Expressions in Automata",
          "url": "https://www.geeksforgeeks.org/regular-expressions-regular-grammar-and-regular-languages/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Regular Expression Identities and Arden's Theorem",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-finite-automata",
      "slug": "finite-automata",
      "title": "Finite Automata",
      "description": "Deterministic and Nondeterministic Finite Automata, formal definition 5-tuple (Q, Sigma, delta, q0, F), transition graphs, and language acceptance.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "TCS Digital"
      ],
      "keyTakeaways": [
        "FA is a 5-tuple: (Q, Sigma, delta, q0, F), where Q is states, Sigma is alphabet, delta is transition function, q0 is initial state, F is final states.",
        "DFA transition function: delta: Q x Sigma -> Q (exactly one transition per symbol per state).",
        "NFA transition function: delta: Q x Sigma -> 2^Q (zero, one, or multiple transitions per symbol).",
        "DFA and NFA have equal computational power; both recognize precisely the class of Regular Languages."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Finite+Automata+DFA+NFA+Definition+Language+Acceptance+TOC+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Finite Automata: Formal 5-Tuple, Transition Diagrams, and Languages\n\nA Finite Automaton (FA) is the simplest abstract model of computation. It possesses a finite set of internal states, receives a sequence of input symbols, and either accepts or rejects the input string without auxiliary external memory.\n\n---\n\n## 1. Formal 5-Tuple Definition of a Deterministic Finite Automaton (DFA)\n\nA DFA $M$ is formally defined by a 5-tuple:\n$$M = (Q, \\Sigma, \\delta, q_0, F)$$\n1. **$Q$:** A finite, non-empty set of internal **States**.\n2. **$\\Sigma$:** A finite, non-empty set of input symbols (**Alphabet**).\n3. **$\\delta$:** The **Transition Function**:\n   $$\\delta: Q \\times \\Sigma \\to Q$$\n   *(For every state and every symbol, there is EXACTLY ONE deterministic next state!)*\n4. **$q_0$:** The designated initial **Start State** ($q_0 \\in Q$).\n5. **$F$:** The set of **Final / Accepting States** ($F \\subseteq Q$).\n\n---\n\n## 2. Transition Diagrams and Transition Tables\n\n```\nState Transition Diagram for strings over {0,1} ending in '1':\n               0\n             +---+\n             |   |\n             v   |\n   -----> ( q0 ) ------- 1 -------> (( q1 )) <---+\n            ^                          |         |\n            |                          |         | 1\n            +------------ 0 -----------+         |\n                                       +---------+\n```\n\n### Transition Table Representation:\n| State | Input `0` | Input `1` |\n| :---: | :---: | :---: |\n| $\\to q_0$ | $q_0$ | $q_1^*$ |\n| $*q_1$ | $q_0$ | $q_1^*$ |\n\n---\n\n## 3. Extended Transition Function ($\\delta^*$) and Language Acceptance\n\nThe extended transition function $\\delta^*$ processes entire strings recursively:\n- **Base Case:** $\\delta^*(q, \\epsilon) = q$.\n- **Inductive Step:** For string $w = xa$ (where $x \\in \\Sigma^*$ and $a \\in \\Sigma$):\n  $$\\delta^*(q, xa) = \\delta(\\delta^*(q, x), a)$$\n\n### Language Accepted by $M$:\nThe language $L(M)$ accepted by a DFA is the set of all strings that drive the machine from the initial state $q_0$ into some final state in $F$:\n$$L(M) = \\{ w \\in \\Sigma^* \\mid \\delta^*(q_0, w) \\in F \\}$$\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **DFA 5-Tuple:** $(Q, \\Sigma, \\delta, q_0, F)$.\n- **Deterministic Requirement:** Every state must have exactly one outgoing edge for each alphabet symbol.\n- **Dead / Trap State:** A non-accepting state from which there is no escape path to any final state.\n- **Regular Language Definition:** A language $L$ is regular $\\iff$ there exists some DFA $M$ such that $L = L(M)$.\n",
      "questions": [
        {
          "id": "toc-fa-1",
          "question": "What is the key structural difference between the transition function of a DFA and an NFA?",
          "options": [
            "DFA maps Q x Σ to Q; NFA maps Q x Σ to 2^Q (power set of Q)",
            "DFA has infinite states",
            "NFA can accept non-regular languages",
            "DFA cannot have accepting states"
          ],
          "correct_option": 0,
          "explanation": "In a DFA, each state-symbol pair maps to exactly one state (Q). In an NFA, each state-symbol pair maps to a subset of states in the power set 2^Q (including the empty set for dead ends)."
        },
        {
          "id": "toc-fa-2",
          "question": "What class of languages is recognized by Finite Automata?",
          "options": [
            "Context-Free Languages",
            "Regular Languages",
            "Context-Sensitive Languages",
            "Recursively Enumerable Languages"
          ],
          "correct_option": 1,
          "explanation": "By Kleene's theorem, the class of languages accepted by Finite Automata (DFA/NFA) is precisely the class of Regular Languages."
        },
        {
          "id": "toc-fa-3",
          "question": "Given an NFA with n states, what is the theoretical maximum number of states in the equivalent minimal DFA?",
          "options": [
            "2^n",
            "n^2",
            "2n",
            "n!"
          ],
          "correct_option": 0,
          "explanation": "By the subset (powerset) construction, every DFA state corresponds to a subset of the NFA states. A set of n elements has 2^n subsets, giving an upper bound of 2^n states."
        }
      ],
      "prerequisites": [
        "Alphabets, strings, and regular expressions",
        "Directed graphs and discrete state transitions"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Deterministic Finite Automata (DFA)",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Introduction of Finite Automata",
          "url": "https://www.geeksforgeeks.org/introduction-of-finite-automata/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Finite State Automata and Transition Functions",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-dfa-and-nfa",
      "slug": "dfa-and-nfa",
      "title": "DFA and NFA",
      "description": "Constructing DFAs and NFAs, counting minimum states, string matching automata, dead states (trap states), and epsilon-transitions.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Google",
        "Infosys"
      ],
      "keyTakeaways": [
        "Minimum states in DFA to accept binary strings divisible by k is k states.",
        "Strings with specific ending pattern of length k require k + 1 states in DFA.",
        "Trap (Dead) states in DFA catch inputs that can never lead to acceptance.",
        "Epsilon-NFA allows state transitions without consuming any input symbol."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=DFA+NFA+State+Minimization+Modulo+Divisibility+Strings+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# DFA vs NFA: Architectural and Structural Comparison\n\nDeterministic and Non-deterministic finite automata possess identical language recognition power ($L(\\text{DFA}) = L(\\text{NFA}) = \\text{Regular Languages}$).\n\n---\n\n## 1. Architectural Comparison Matrix\n\n| Property | Deterministic Finite Automata (DFA) | Non-deterministic Finite Automata (NFA) |\n| :--- | :--- | :--- |\n| **Transition on input $a$** | Exactly one next state | Zero, one, or multiple next states |\n| **$\\epsilon$-transitions** | Not permitted | Permitted in $\\epsilon$-NFA |\n| **Dead/Trap states** | Mandatory for non-accepting dead paths | Implicit (transitions simply omitted) |\n| **Implementation** | Trivial array/switch lookup ($O(1)$ per char) | Requires set tracking or backtracking |\n| **State minimization** | Myhill-Nerode / Table-filling algorithm | PSPACE-complete (requires DFA conversion first) |\n\n---\n\n## 2. DFA Minimization (Table Filling / Partition Refinement)\n1. Remove all unreachable states from $q_0$.\n2. Partition into accepting $F$ and non-accepting $Q \\setminus F$.\n3. Two states $p, q$ are distinguishable if on some string $w$, $\\hat{\\delta}(p, w) \\in F$ and $\\hat{\\delta}(q, w) \\notin F$.\n4. Merge all indistinguishable state pairs.\n",
      "questions": [
        {
          "id": "toc-dn-1",
          "question": "What is the minimum number of states in a DFA that accepts all binary strings representing numbers divisible by 5?",
          "options": [
            "4",
            "5",
            "6",
            "10"
          ],
          "correct_option": 1,
          "explanation": "The remainders when dividing any binary integer by 5 are 0, 1, 2, 3, 4. Each remainder corresponds to exactly one state in the minimal DFA, requiring 5 states."
        },
        {
          "id": "toc-dn-2",
          "question": "For a language where the k-th symbol from the end of a binary string is '1', what is the number of states in the minimal NFA vs minimal DFA?",
          "options": [
            "NFA: k + 1 states; DFA: 2^k states",
            "NFA: 2^k states; DFA: k + 1 states",
            "Both require k + 1 states",
            "Both require 2^k states"
          ],
          "correct_option": 0,
          "explanation": "An NFA non-deterministically guesses the k-th position from the end using only k + 1 states, but the equivalent deterministic DFA must remember all possible subsets of the last k bits, requiring 2^k states."
        },
        {
          "id": "toc-dfa-3",
          "question": "What is the minimum number of states in a DFA that recognizes all binary strings ending with '01' over alphabet {0, 1}?",
          "options": [
            "3 states",
            "2 states",
            "4 states",
            "5 states"
          ],
          "correct_option": 0,
          "explanation": "A DFA recognizing strings ending with '01' requires 3 states: q0 (start / default), q1 (last bit was 0), q2 (last two bits were 01, accepting state)."
        }
      ],
      "prerequisites": [
        "Sets, Alphabets, and Strings",
        "State Transition Diagrams"
      ],
      "externalResources": [
        {
          "title": "Deterministic and Non-Deterministic Finite Automata — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/introduction-of-finite-automata/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Theory of Computation (18.404J) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-nfa-to-dfa-conversion",
      "slug": "nfa-to-dfa-conversion",
      "title": "NFA to DFA Conversion",
      "description": "Subset construction algorithm (powershell algorithm), epsilon-closures, DFA state minimization (Myhill-Nerode, table-filling algorithm).",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Intel",
        "IBM"
      ],
      "keyTakeaways": [
        "Subset Construction: Converts any NFA of n states to an equivalent DFA with at most 2^n states.",
        "Epsilon-Closure(q): Set of all states reachable from q by following zero or more epsilon transitions.",
        "DFA Minimization (Table-Filling Algorithm): Partitions states into equivalence classes of indistinguishable states.",
        "Myhill-Nerode Theorem: Number of states in minimal DFA equals the number of equivalence classes of right invariant relation R_L."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=NFA+to+DFA+Conversion+Subset+Construction+DFA+Minimization+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Non-Deterministic Finite Automata (NFA) to DFA Conversion: Subset Construction\n\nWhile a DFA restricts each state to exactly one transition per symbol, a Non-Deterministic Finite Automaton (NFA) permits zero, one, or multiple transitions per symbol, as well as spontaneous transitions without consuming input ($\\epsilon$-transitions).\n\n---\n\n## 1. NFA vs DFA Formal Comparison\n\n| Feature | Deterministic FA (DFA) | Non-Deterministic FA (NFA / $\\epsilon$-NFA) |\n| :--- | :--- | :--- |\n| **Transition Function ($\\delta$)** | $\\delta: Q \\times \\Sigma \\to Q$ | $\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\to 2^Q$ (Power set of states) |\n| **Branching** | Exactly 1 path per input | Multiple concurrent computational branches |\n| **$\\epsilon$-Transitions** | Strictly Forbidden | Permitted (state changes without reading input) |\n| **Expressive Power** | Recognizes Regular Languages | Recognizes Regular Languages (**Identical expressive power!**) |\n| **Implementation Complexity** | Trivial hardware/software mapping | Requires backtracking, simulation, or compilation to DFA |\n\n---\n\n## 2. The Subset (Powerset) Construction Algorithm\n\nRabin and Scott (1959) proved that **every NFA can be converted into an equivalent DFA** that recognizes the exact same language.\n\n### Algorithm Steps:\nLet NFA be $N = (Q_N, \\Sigma, \\delta_N, q_0, F_N)$. The equivalent DFA is $D = (Q_D, \\Sigma, \\delta_D, q_D0, F_D)$:\n\n1. **$\\epsilon$-Closure ($\\epsilon\\text{-close}(q)$):**\n   The set of all states reachable from state $q$ following zero or more $\\epsilon$-transitions.\n2. **Start State of DFA:**\n   $$q_{D0} = \\epsilon\\text{-close}(q_0)$$\n3. **Transition Function of DFA:**\n   For each DFA state $S = \\{q_1, q_2, \\dots, q_k\\} \\subseteq Q_N$ and each symbol $a \\in \\Sigma$:\n   $$\\delta_D(S, a) = \\epsilon\\text{-close}\\left( \\bigcup_{q \\in S} \\delta_N(q, a) \\right)$$\n4. **Final States of DFA ($F_D$):**\n   Any subset state $S \\in Q_D$ that contains **at least one final state** of the NFA:\n   $$F_D = \\{ S \\in Q_D \\mid S \\cap F_N \\ne \\emptyset \\}$$\n\n---\n\n## 3. State Explosion Bounds\n\nIf an NFA has $n$ states:\n- The theoretical maximum number of states in the equivalent minimized DFA is:\n$$\\mathbf{|Q_D| \\le 2^n}$$\n- *Worst-Case Example:* The language of strings over $\\{0, 1\\}$ whose $n$-th symbol from the end is `1`:\n  - NFA requires **$n + 1$ states**.\n  - Any equivalent DFA requires **$2^n$ states**!\n\n---\n\n## 4. DFA State Minimization (Table-Filling / Myhill-Nerode)\n\nMinimizes redundant states in $O(n^2)$ time:\n1. Eliminate all states unreachable from the start state.\n2. Create a grid of all state pairs $(p, q)$.\n3. Mark pair $(p, q)$ as distinguishable if $p \\in F$ and $q \\notin F$.\n4. Repeatedly mark unmarked pairs $(p, q)$ if for some symbol $a$, the next-state pair $(\\delta(p, a), \\delta(q, a))$ is already marked.\n5. Merge all unmarked pairs into single equivalent consolidated states.\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Subset Construction Invariant:** DFA states represent subsets of NFA states ($2^Q$).\n- **Maximum DFA States:** $2^n$ for an $n$-state NFA.\n- **Equivalence Theorem:** $\\text{Class}(L_{\\text{DFA}}) = \\text{Class}(L_{\\text{NFA}}) = \\text{Class}(L_{\\epsilon\\text{-NFA}}) = \\text{Regular Languages}$.\n",
      "questions": [
        {
          "id": "toc-nd-1",
          "question": "If an NFA has 4 states, what is the theoretical MAXIMUM number of states in its equivalent DFA before minimization?",
          "options": [
            "4",
            "8",
            "16",
            "32"
          ],
          "correct_option": 2,
          "explanation": "By subset construction, the states of the DFA are subsets of the NFA states. For n = 4 states, |2^Q| = 2^4 = 16 maximum states."
        },
        {
          "id": "toc-nd-2",
          "question": "What does the Myhill-Nerode Theorem state regarding minimal DFAs?",
          "options": [
            "All NFAs can be converted to PDAs",
            "The number of states in the minimal DFA for a regular language L equals the index (number of equivalence classes) of the Myhill-Nerode relation for L",
            "Pumping lemma holds for all languages",
            "DFA minimization is NP-Complete"
          ],
          "correct_option": 1,
          "explanation": "The Myhill-Nerode theorem establishes that a language is regular if and only if its right-invariant equivalence relation has a finite number of equivalence classes, which equals the exact state count of the minimal DFA."
        },
        {
          "id": "toc-n2d-3",
          "question": "What algorithm is used to convert a Non-deterministic Finite Automaton (NFA) into an equivalent Deterministic Finite Automaton (DFA)?",
          "options": [
            "Subset / Powerset Construction Algorithm",
            "CYK Algorithm",
            "Hopcroft's Minimization Algorithm",
            "Cocke-Younger-Kasami Parser"
          ],
          "correct_option": 0,
          "explanation": "The Subset Construction (also known as Powerset Construction) algorithm constructs DFA states representing sets of NFA states reachable on given inputs."
        }
      ],
      "prerequisites": [
        "Finite automata and DFA definitions",
        "Power sets and set unions"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: NFA to DFA Subset Construction",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Conversion from NFA to DFA",
          "url": "https://www.geeksforgeeks.org/conversion-from-nfa-to-dfa/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: NFA to DFA Conversion and State Minimization",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-regular-languages-pumping-lemma",
      "slug": "regular-languages-and-pumping-lemma",
      "title": "Regular Languages and Pumping Lemma",
      "description": "Closure properties of regular languages, Pumping Lemma for regular languages, and proving non-regularity (e.g. 0^n 1^n).",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "IBM"
      ],
      "keyTakeaways": [
        "Regular languages are closed under: Union, Intersection, Complement, Concatenation, Kleene star, Reversal, Difference, Homomorphism.",
        "Pumping Lemma: If L is regular, exists pumping length p such that any string |s| >= p can be split into s = xyz where |xy| <= p, |y| >= 1, and xy^i z in L for all i >= 0.",
        "Pumping Lemma is used to prove a language is NOT regular (by contradiction); cannot prove a language IS regular.",
        "Classic non-regular languages: {0^n 1^n | n >= 0}, {w w^R}, {0^(p) | p is prime}."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Pumping+Lemma+for+Regular+Languages+Proof+Non+Regular+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Regular Languages, Closure Properties & The Pumping Lemma\n\nThe Pumping Lemma provides a fundamental structural property shared by every regular language. It is the primary mathematical tool for proving by contradiction that a language is **non-regular**.\n\n---\n\n## 1. Closure Properties of Regular Languages\n\nRegular languages represent one of the most robust language families, closed under virtually all standard algebraic and set-theoretic operations:\n- **Set Operations:** Union ($L_1 \\cup L_2$), Intersection ($L_1 \\cap L_2$), Complement ($\\overline{L} = \\Sigma^* \\setminus L$), Set Difference ($L_1 \\setminus L_2 = L_1 \\cap \\overline{L_2}$).\n- **String Operations:** Concatenation ($L_1 L_2$), Kleene Star ($L^*$), Positive Closure ($L^+$), Reversal ($L^R$).\n- **Morphism Operations:** Homomorphism ($h(L)$), Inverse Homomorphism ($h^{-1}(L)$).\n- **Prefix / Suffix / Substring:** $\\text{Prefix}(L)$, $\\text{Suffix}(L)$, $\\text{Substrings}(L)$.\n\n---\n\n## 2. The Pumping Lemma for Regular Languages\n\n> **Theorem:**  \n> If $L$ is a regular language, then there exists a constant integer $p \\ge 1$ (called the **pumping length** or pumping lemma constant, equal to the number of states in a minimal DFA for $L$) such that every string $s \\in L$ with $|s| \\ge p$ can be partitioned into three substrings:\n> $$s = x y z$$\n> satisfying all three conditions:\n> 1. $|x y| \\le p$\n> 2. $|y| \\ge 1$ (the pumped substring $y$ cannot be empty, $y \\ne \\epsilon$)\n> 3. For all integers $i \\ge 0$, $x y^i z \\in L$ (for $i = 0$, $x z \\in L$, called *pumping down*; for $i \\ge 2$, *pumping up*).\n\n### The Pigeonhole Principle Intuition:\nA minimal DFA for $L$ has $p$ states. When processing any string of length $\\ge p$, the automaton visits at least $p + 1$ states. By the Pigeonhole Principle, at least one state must be repeated within the first $p$ transitions, forming a directed cycle corresponding to substring $y$.\n\n---\n\n## 3. Step-by-Step Non-Regularity Proof Template\n\nThe Pumping Lemma is a game against an adversary used **only to prove non-regularity** (never to prove regularity):\n1. **Assume** by contradiction that $L$ is regular with pumping length $p$.\n2. **Choose** a specific string $s \\in L$ such that $|s| \\ge p$ parameterized by $p$ (e.g., $s = 0^p 1^p$).\n3. **Partition:** The adversary decomposes $s = x y z$ subject to $|xy| \\le p$ and $|y| \\ge 1$. Since $|xy| \\le p$, $xy$ consists solely of the prefix (e.g., leading 0s). Thus $y = 0^k$ for some $1 \\le k \\le p$.\n4. **Pump & Contradict:** Choose an integer $i \\ne 1$ (e.g., $i = 2$ or $i = 0$) such that $x y^i z \\notin L$. For $i = 2$, $x y^2 z = 0^{p+k} 1^p$. Since $k \\ge 1$, the number of 0s exceeds the number of 1s, so $x y^2 z \\notin L$.\n5. **Conclusion:** Contradiction reached. $L$ cannot be regular.\n\n### Classic Non-Regular Languages:\n- $\\{0^n 1^n \\mid n \\ge 0\\}$ (unbounded equality counting).\n- $\\{w w^R \\mid w \\in \\{0, 1\\}^*\\}$ (unbounded palindromic memory).\n- $\\{0^{n^2} \\mid n \\ge 1\\}$ (quadratic gaps grow faster than any constant cycle length).\n- $\\{0^p \\mid p \\text{ is prime}\\}$ (arithmetic progression contradictions).\n",
      "questions": [
        {
          "id": "toc-pl-1",
          "question": "Which of the following languages is NOT regular?",
          "options": [
            "L = {w in {0, 1}* | w has an even number of 0s}",
            "L = {0^n 1^n | n >= 0}",
            "L = {0^n 1^m | n, m >= 0}",
            "L = {w in {0, 1}* | |w| <= 100}"
          ],
          "correct_option": 1,
          "explanation": "L = {0^n 1^n | n >= 0} requires unbounded counting to ensure the number of 0s equals the number of 1s, which cannot be accomplished with finite memory states. By the Pumping Lemma, it is not regular."
        },
        {
          "id": "toc-pl-2",
          "question": "Are regular languages closed under complementation?",
          "options": [
            "Yes, by flipping the accepting and non-accepting states of a complete minimal DFA",
            "No, only under union and intersection",
            "Only if the alphabet has size 1",
            "Only for infinite languages"
          ],
          "correct_option": 0,
          "explanation": "Regular languages are closed under complement. Given a complete DFA for L, swapping all accepting states (F) with non-accepting states (Q \\ F) creates a DFA that accepts L-complement."
        },
        {
          "id": "toc-pl-3",
          "question": "Which of the following languages is proven to be NOT regular using the Pumping Lemma for regular languages?",
          "options": [
            "L = {a^n b^n | n >= 0}",
            "L = {a^n b^m | n, m >= 0}",
            "L = {w | w has an even number of 0s}",
            "L = {a^* b^*}"
          ],
          "correct_option": 0,
          "explanation": "The language {a^n b^n | n >= 0} requires unbounded counting memory to ensure the count of a's matches the count of b's, which violates the finite memory limitation of finite automata."
        }
      ],
      "prerequisites": [
        "DFA / NFA Equivalence",
        "Pigeonhole Principle"
      ],
      "externalResources": [
        {
          "title": "Pumping Lemma for Regular Languages — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/pumping-lemma-in-theory-of-computation/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-context-free-grammars",
      "slug": "context-free-grammars-cfg",
      "title": "Context-Free Grammars (CFG)",
      "description": "Formal definition G = (V, Sigma, R, S), production rules, derivation, ambiguity in CFGs, and inherently ambiguous languages.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Oracle"
      ],
      "keyTakeaways": [
        "CFG is a 4-tuple G = (V, Sigma, R, S) where productions are of form A -> alpha with A in V.",
        "Leftmost derivation: Always expands the leftmost non-terminal first; Rightmost derivation expands rightmost non-terminal.",
        "A grammar is Ambiguous if some string has two distinct parse trees (or two distinct leftmost derivations).",
        "Inherently Ambiguous Language: A CFL for which EVERY valid grammar is ambiguous (e.g. {a^n b^n c^m} U {a^n b^m c^m})."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Context+Free+Grammars+CFG+Ambiguity+Derivations+Parse+Tree+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Context-Free Grammars (CFG): Form, Ambiguity & Normal Forms\n\nA **Context-Free Grammar (CFG)** is a formal generative grammar capable of expressing nested, hierarchical, and recursively matched syntax patterns (Chomsky Type-2).\n\n---\n\n## 1. Formal 4-Tuple Specification\n\nA CFG is formally defined as a 4-tuple:\n$$G = (V, \\Sigma, R, S)$$\n- $V$: Finite set of **non-terminal variables** (syntactic categories, e.g., $E, T, F$).\n- $\\Sigma$: Finite set of **terminal symbols** ($V \\cap \\Sigma = \\emptyset$, disjoint from $V$).\n- $R$: Finite set of **production rules** of the form:\n  $$A \\to \\alpha \\quad \\text{where } A \\in V \\text{ and } \\alpha \\in (V \\cup \\Sigma)^*$$\n- $S \\in V$: The distinguished **start symbol**.\n\n---\n\n## 2. Derivations & Parse Trees\n\n- **Leftmost Derivation (LMD):** In every step, the leftmost non-terminal is replaced.\n- **Rightmost Derivation (RMD / Canonical):** In every step, the rightmost non-terminal is replaced.\n- **Parse Tree:** A graphical tree representation of a derivation where:\n  - The root is $S$.\n  - Internal nodes are non-terminals from $V$.\n  - Leaves are terminals from $\\Sigma \\cup \\{\\epsilon\\}$.\n  - Concatenating leaf labels from left to right yields the generated string (**yield** of the tree).\n\n---\n\n## 3. Grammar Ambiguity & Inherent Ambiguity\n\n1. **Ambiguous Grammar:** A grammar $G$ is ambiguous if there exists at least one string $w \\in L(G)$ that can produce:\n   - Two or more distinct parse trees, OR\n   - Two or more distinct leftmost derivations (or rightmost derivations).\n2. **Dangling-Else Problem:** Classic programming language ambiguity:\n   ```\n   stmt -> if expr then stmt | if expr then stmt else stmt | other\n   ```\n   Resolved in parser implementations by enforcing precedence or associativity rules (e.g. associating `else` with the nearest preceding `if`).\n3. **Inherent Ambiguity:** A Context-Free Language $L$ is **inherently ambiguous** if *every* CFG generating $L$ is ambiguous.\n   - Example: $L = \\{a^n b^n c^m \\mid n, m \\ge 1\\} \\cup \\{a^n b^m c^m \\mid n, m \\ge 1\\}$. Any string $a^n b^n c^n$ must match both sub-languages, forcing two parse trees in any grammar.\n4. **Decidability Traps:**\n   - Determining whether an arbitrary CFG is ambiguous is **Undecidable**.\n   - Determining whether an arbitrary CFL is inherently ambiguous is **Undecidable**.\n\n---\n\n## 4. Normal Forms: CNF and GNF\n\n1. **Chomsky Normal Form (CNF):**\n   - Every rule is of the form $A \\to B C$ or $A \\to a$ (where $A, B, C \\in V$ and $a \\in \\Sigma$).\n   - If string $w$ has length $n \\ge 1$, any derivation in CNF requires exactly **$2n - 1$ production steps**.\n   - Enables polynomial parsing via the **CYK algorithm** in $O(n^3 \\cdot |G|)$ time.\n2. **Greibach Normal Form (GNF):**\n   - Every rule is of the form $A \\to a \\alpha$, where $a \\in \\Sigma$ and $\\alpha \\in V^*$.\n   - Directly corresponds to Pushdown Automata transitions that consume one input symbol per step.\n",
      "questions": [
        {
          "id": "toc-cfg-1",
          "question": "When is a Context-Free Grammar (CFG) considered ambiguous?",
          "options": [
            "When it generates an infinite language",
            "When there exists at least one string in the language with two or more distinct parse trees",
            "When it contains epsilon productions",
            "When it cannot be converted to Chomsky Normal Form"
          ],
          "correct_option": 1,
          "explanation": "A grammar is ambiguous by definition if some string generated by the grammar has more than one distinct parse tree (or multiple distinct leftmost derivations)."
        },
        {
          "id": "toc-cfg-2",
          "question": "Is the problem of deciding whether an arbitrary Context-Free Grammar is ambiguous decidable?",
          "options": [
            "Decidable in polynomial time",
            "Decidable in exponential time",
            "Undecidable",
            "Trivially decidable"
          ],
          "correct_option": 2,
          "explanation": "Determining ambiguity for an arbitrary CFG is proven to be mathematically undecidable."
        },
        {
          "id": "toc-cfg-3",
          "question": "In Chomsky Normal Form (CNF), all production rules in a CFG must be of which two forms?",
          "options": [
            "A -> BC or A -> a (where A, B, C are non-terminals and a is a terminal)",
            "A -> aB or A -> a",
            "A -> alpha where alpha is any string",
            "A -> B"
          ],
          "correct_option": 0,
          "explanation": "Chomsky Normal Form strictly restricts all productions to either a non-terminal yielding exactly two non-terminals (A -> BC) or a non-terminal yielding a single terminal (A -> a)."
        }
      ],
      "prerequisites": [
        "Context-Free Production Rules",
        "Parse Trees and Derivations"
      ],
      "externalResources": [
        {
          "title": "Context-Free Grammars and Ambiguity — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/context-free-grammar-introduction/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-parse-trees-and-derivations",
      "slug": "parse-trees-and-derivations",
      "title": "Parse Trees and Derivations",
      "description": "Yield of a parse tree, interior nodes, leaf nodes, Chomsky Normal Form (CNF), Greibach Normal Form (GNF), and CYK algorithm.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Microsoft",
        "Oracle",
        "IBM"
      ],
      "keyTakeaways": [
        "Parse tree root is start symbol S; internal nodes are non-terminals V; leaves are terminals Sigma or epsilon.",
        "Yield of parse tree is concatenation of leaves from left to right.",
        "Chomsky Normal Form (CNF): All rules are A -> BC or A -> a. Derivation of string of length n takes exactly 2n - 1 steps.",
        "Greibach Normal Form (GNF): All rules are A -> a alpha (terminal followed by non-terminals)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Parse+Trees+Chomsky+Normal+Form+CNF+Greibach+GNF+CYK+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Context-Free Grammars, Derivations, Parse Trees, and Ambiguity\n\nContext-Free Grammars (CFGs) generate languages that possess nested or hierarchically balanced structures (such as balanced parentheses `(()())` or nested programming language blocks) which cannot be recognized by finite automata.\n\n---\n\n## 1. Formal Definition of a Context-Free Grammar (CFG)\n\nA CFG $G$ is formally defined by a 4-tuple:\n$$G = (V, T, P, S)$$\n1. **$V$ (Variables / Non-terminals):** Finite set of syntactic variables (e.g., $S, A, B$).\n2. **$T$ (Terminals):** Finite set of literal alphabet characters (e.g., $a, b, +, *$). $V \\cap T = \\emptyset$.\n3. **$P$ (Production Rules):** Finite set of rewriting rules of the form:\n   $$A \\to \\alpha \\quad \\text{where } A \\in V \\text{ and } \\alpha \\in (V \\cup T)^*$$\n4. **$S$ (Start Symbol):** The distinguished starting variable ($S \\in V$).\n\n---\n\n## 2. Derivations: Leftmost vs Rightmost\n\nA **Derivation** is a sequence of production rule applications transforming start symbol $S$ into a string of terminals.\n\n- **Leftmost Derivation (LMD):** At each derivation step, the **leftmost non-terminal variable** is replaced first.\n- **Rightmost Derivation (RMD):** At each derivation step, the **rightmost non-terminal variable** is replaced first.\n\n```\nGrammar: E -> E + E | E * E | id\nString: id + id * id\n\nLeftmost Derivation:\nE => E + E\n  => id + E\n  => id + E * E\n  => id + id * E\n  => id + id * id\n\nRightmost Derivation:\nE => E + E\n  => E + E * E\n  => E + E * id\n  => E + id * id\n  => id + id * id\n```\n\n---\n\n## 3. Parse Trees and Ambiguity\n\nA **Parse Tree (Concrete Syntax Tree)** is a graphical tree representation of a derivation:\n- **Root:** Start symbol $S$.\n- **Internal Nodes:** Variables ($V$).\n- **Leaf Nodes:** Terminals ($T$) or $\\epsilon$, read left-to-right to form the derived string (the yield).\n\n### Ambiguity in CFGs:\nA grammar $G$ is **Ambiguous** if there exists at least one string $w \\in L(G)$ for which there are:\n1. **Two or more distinct Parse Trees**, OR\n2. **Two or more distinct Leftmost Derivations**, OR\n3. **Two or more distinct Rightmost Derivations**.\n\n```\nTwo Distinct Parse Trees for \"id + id * id\":\n       Tree 1: (+ evaluates first)             Tree 2: (* evaluates first)\n                 E                                       E\n               / | \\                                   / | \\\n              E  +  E                                 E  +  E\n             /     /|\\                               /     /|\\\n            id    E * E                             id    E * E\n                 /     \\                                 /     \\\n                id     id                               id     id\n```\nIn compilers, ambiguity is unacceptable because the syntax tree dictates the semantic meaning and execution order of expressions!\n\n### Inherent Ambiguity:\nA context-free language $L$ is **Inherently Ambiguous** if *every possible* CFG generating $L$ is ambiguous.\n- *Classic Example:* $L = \\{ a^n b^n c^m d^m \\mid n, m \\ge 1 \\} \\cup \\{ a^n b^m c^m d^n \\mid n, m \\ge 1 \\}$.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **CFG 4-Tuple:** $(V, T, P, S)$.\n- **LMD vs RMD:** Leftmost vs Rightmost variable substitution order.\n- **Ambiguity Criterion:** $\\ge 2$ distinct parse trees for the identical string.\n- **Disambiguation Techniques:** Introduce stratified grammar levels to enforce operator precedence and associativity (e.g., Expression $\\to$ Term $\\to$ Factor).\n",
      "questions": [
        {
          "id": "toc-pt-1",
          "question": "In Chomsky Normal Form (CNF), how many derivation steps are required to generate a string of length n (n >= 1)?",
          "options": [
            "n",
            "2n - 1",
            "n^2",
            "2^n"
          ],
          "correct_option": 1,
          "explanation": "In CNF, generating a string of length n requires n - 1 rule applications of A -> BC to produce n non-terminals, and n rule applications of A -> a to convert them into terminals. Total steps = (n - 1) + n = 2n - 1."
        },
        {
          "id": "toc-pt-2",
          "question": "What are the allowed forms of production rules in Chomsky Normal Form (CNF)?",
          "options": [
            "A -> BC or A -> a",
            "A -> aB or A -> a",
            "A -> alpha B beta",
            "A -> B or A -> epsilon"
          ],
          "correct_option": 0,
          "explanation": "In Chomsky Normal Form, every production rule must be either a non-terminal yielding exactly two non-terminals (A -> BC) or a non-terminal yielding a single terminal (A -> a)."
        },
        {
          "id": "toc-pt-3",
          "question": "A Context-Free Grammar (CFG) is classified as 'ambiguous' if which condition holds?",
          "options": [
            "There exists at least one string in L(G) that has two or more distinct leftmost derivations (or parse trees).",
            "The grammar cannot generate the empty string epsilon.",
            "The grammar contains left recursion.",
            "The language generated is non-context-free."
          ],
          "correct_option": 0,
          "explanation": "Ambiguity in a CFG is defined by the existence of at least one string that possesses two or more distinct parse trees (or distinct leftmost / rightmost derivations)."
        }
      ],
      "prerequisites": [
        "Alphabets, strings, and regular expressions",
        "Tree data structures and recursive rules"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Context-Free Grammars and Ambiguity",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Parse Trees and Ambiguity in Context-Free Grammars",
          "url": "https://www.geeksforgeeks.org/ambiguous-grammar/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Derivations, Parse Trees, and Inherent Ambiguity",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-pushdown-automata",
      "slug": "pushdown-automata-pda",
      "title": "Pushdown Automata (PDA)",
      "description": "7-tuple definition, stack operations (push, pop, no-op), acceptance by final state vs empty stack, DPDA vs NPDA.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Apple"
      ],
      "keyTakeaways": [
        "PDA = Finite Automaton + 1 LIFO Stack (unbounded memory storage).",
        "7-tuple: M = (Q, Sigma, Gamma, delta, q0, z0, F), where Gamma is stack alphabet.",
        "Acceptance modes: By Final State or By Empty Stack (proven computationally equivalent).",
        "NPDA is strictly MORE powerful than DPDA! (e.g. Even palindromes {w w^R} accepted by NPDA but NOT by any DPDA)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Pushdown+Automata+PDA+DPDA+NPDA+Stack+Acceptance+TOC+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Pushdown Automata (PDA), Stack Operations, and DPDA vs NPDA\n\nA Pushdown Automaton (PDA) is an abstract computational model that extends a finite-state machine with an unbounded **Last-In, First-Out (LIFO) Stack memory**. PDAs are the exact machine equivalence of Context-Free Languages.\n\n---\n\n## 1. Formal 7-Tuple Definition of a PDA\n\nA PDA $M$ is defined by a 7-tuple:\n$$M = (Q, \\Sigma, \\Gamma, \\delta, q_0, Z_0, F)$$\n1. **$Q$:** Finite set of internal states.\n2. **$\\Sigma$:** Finite set of input symbols (Input Alphabet).\n3. **$\\Gamma$:** Finite set of stack symbols (Stack Alphabet).\n4. **$\\delta$:** Transition function:\n   $$\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\times \\Gamma \\to 2^{Q \\times \\Gamma^*}$$\n5. **$q_0$:** Initial start state ($q_0 \\in Q$).\n6. **$Z_0$:** Initial start symbol on the stack ($Z_0 \\in \\Gamma$).\n7. **$F$:** Set of final / accepting states ($F \\subseteq Q$).\n\n---\n\n## 2. Stack Transition Semantics\n\nA transition is denoted:\n$$a, X \\to \\alpha$$\n*\"Read input symbol $a$, pop symbol $X$ from top of stack, and push string $\\alpha$ onto the stack.\"*\n- If $\\alpha = \\epsilon$: Pop operation (removes $X$).\n- If $\\alpha = X$: Stack unchanged.\n- If $\\alpha = YX$: Push operation (pushes $Y$ above $X$).\n\n---\n\n## 3. Acceptance Modes: Final State vs Empty Stack\n\n1. **Acceptance by Final State ($L(M)$):**\n   The string is accepted if after reading all input symbols, the PDA enters an accepting state $q \\in F$ (regardless of stack contents).\n2. **Acceptance by Empty Stack ($N(M)$):**\n   The string is accepted if after reading all input symbols, the stack is completely empty (regardless of final state).\n- **Equivalence Theorem:** The class of languages accepted by final state is **mathematically identical** to the class accepted by empty stack!\n\n---\n\n## 4. Deterministic PDA (DPDA) vs Non-Deterministic PDA (NPDA)\n\nUnlike finite automata where DFA and NFA have identical power, **NPDA is strictly more powerful than DPDA**!\n\n```\n+-----------------------------------------------------------+\n|                   NPDA (All CFLs)                         |\n|   Accepts all Context-Free Languages                      |\n|   e.g., Palindromes of even length: L = { w w^R }         |\n|                                                           |\n|   +---------------------------------------------------+   |\n|   |            DPDA (Deterministic CFLs)              |   |\n|   |   Accepts Deterministic CFLs (DCFLs)              |   |\n|   |   e.g., Balanced brackets, L = { a^n b^n }        |   |\n|   +---------------------------------------------------+   |\n+-----------------------------------------------------------+\n```\n\n- **Why $\\{ w w^R \\}$ cannot be recognized by a DPDA:** A deterministic machine has no way to guess where the center midpoint of string $w$ occurs without non-deterministic branching!\n- **Grammar Equivalence:** DPDAs recognize the class of languages parsed by unambiguous **LR($k$) parsers** in compilers.\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **PDA 7-Tuple:** $(Q, \\Sigma, \\Gamma, \\delta, q_0, Z_0, F)$.\n- **Memory Model:** Finite State Control $+$ Unbounded LIFO Stack.\n- **Power Inequality:** $\\text{Language}(\\text{DPDA}) \\subset \\text{Language}(\\text{NPDA}) = \\text{Context-Free Languages}$.\n- **Center-Marker Palindrome:** $\\{ w c w^R \\}$ is a DCFL (deterministic); $\\{ w w^R \\}$ is a non-deterministic CFL.\n",
      "questions": [
        {
          "id": "toc-pda-1",
          "question": "Is a Deterministic Pushdown Automaton (DPDA) equal in language-recognition power to a Non-deterministic Pushdown Automaton (NPDA)?",
          "options": [
            "Yes, like DFA and NFA",
            "No, NPDA is strictly more powerful than DPDA",
            "DPDA is more powerful than NPDA",
            "Only for unary alphabets"
          ],
          "correct_option": 1,
          "explanation": "NPDA recognizes all Context-Free Languages, whereas DPDA recognizes only Deterministic Context-Free Languages (a strict subset). For instance, even palindromes {w w^R} requires an NPDA."
        },
        {
          "id": "toc-pda-2",
          "question": "What are the two standard acceptance modes for a Pushdown Automaton, and how do their language recognition capabilities compare?",
          "options": [
            "Acceptance by final state and by empty stack; both are computationally equivalent for NPDAs",
            "Acceptance by timeout and overflow; empty stack is strictly more powerful",
            "Final state accepts regular only; empty stack accepts CFL",
            "They cannot accept the same languages"
          ],
          "correct_option": 0,
          "explanation": "For non-deterministic pushdown automata, acceptance by final state and acceptance by empty stack are proven to be completely equivalent in expressive power."
        },
        {
          "id": "toc-pda-3",
          "question": "What additional memory component enables a Pushdown Automaton (PDA) to recognize Context-Free Languages beyond finite automata?",
          "options": [
            "An unbounded LIFO Stack",
            "A bi-directional infinite read/write tape",
            "A FIFO Queue",
            "A 64-bit hardware register"
          ],
          "correct_option": 0,
          "explanation": "A Pushdown Automaton extends a finite state machine with a single unbounded LIFO (Last-In, First-Out) stack memory, enabling the recognition of nested and counted patterns like balanced parentheses."
        }
      ],
      "prerequisites": [
        "Context-free grammars and parse trees",
        "Finite automata and stack data structures"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Pushdown Automata (PDA)",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Pushdown Automata in Theory of Computation",
          "url": "https://www.geeksforgeeks.org/pushdown-automata-in-toc/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: DPDA vs NPDA and Acceptance Criteria",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-cfl-pumping-lemma",
      "slug": "context-free-languages-and-pumping-lemma",
      "title": "Context-Free Languages and Pumping Lemma",
      "description": "Closure properties of CFLs, intersection with regular languages, and Pumping Lemma for CFLs (uvxyz condition).",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "IBM"
      ],
      "keyTakeaways": [
        "CFLs are closed under: Union, Concatenation, Kleene star, and Intersection with Regular Languages.",
        "CFLs are NOT closed under: Intersection and Complementation!",
        "Pumping Lemma for CFLs: String s = uvxyz with |vxy| <= p, |vy| >= 1, such that u v^i x y^i z in L for all i >= 0.",
        "Classic non-CFL: {a^n b^n c^n | n >= 0} and {a^n b^n c^n d^n}."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Pumping+Lemma+for+Context+Free+Languages+CFL+Closure+Properties+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# The Pumping Lemma for Context-Free Languages and Non-CFL Proofs\n\nJust as the Regular Pumping Lemma proves a language cannot be recognized by a finite automaton, the **Pumping Lemma for Context-Free Languages** (Bar-Hillel Lemma) provides a rigorous technique to prove that a language is **NOT context-free** (cannot be generated by any CFG or recognized by any PDA).\n\n---\n\n## 1. Formal Statement of the CFL Pumping Lemma\n\nIf $L$ is a Context-Free Language, then there exists a **pumping length $p \\ge 1$** such that any string $s \\in L$ with length $|s| \\ge p$ can be divided into five pieces:\n$$s = u v x y z$$\nsatisfying the following **three mandatory conditions**:\n\n1. **Length of pump substring:** $|vxy| \\le p$\n2. **Non-empty pump pieces:** $|vy| \\ge 1$ (at least one of $v$ or $y$ is non-empty)\n3. **Pumping property:** For all $i \\ge 0$, $\\mathbf{u v^i x y^i z \\in L}$\n\n```\n                  Parse Tree Repeating Variable A:\n                               S\n                             / | \\\n                            /  |  \\\n                           u   A   z\n                             / | \\\n                            v  A  y   <-- Variable A repeats due to Pigeonhole!\n                              / \\\\\n                             x   x\n```\n\n---\n\n## 2. Adversarial Game Proof Structure (Contradiction)\n\nTo prove language $L$ is NOT context-free:\n1. **Assume** $L$ is context-free (for contradiction).\n2. The adversary gives us pumping length $p$.\n3. We select a clever string $s \\in L$ with $|s| \\ge p$ written in terms of $p$.\n4. The adversary divides $s = uvxyz$ satisfying $|vxy| \\le p$ and $|vy| \\ge 1$.\n5. We show that for some value of $i$ (typically $i = 0$ or $i = 2$), $u v^i x y^i z \\notin L$, reaching a contradiction!\n\n---\n\n## 3. Classic Proof: $L = \\{ a^n b^n c^n \\mid n \\ge 1 \\}$ is NOT Context-Free\n\n1. Assume $L$ is CFL with pumping length $p$.\n2. Choose string $s = a^p b^p c^p \\in L$. Length $|s| = 3p \\ge p$.\n3. Condition 1 mandates $|vxy| \\le p$.\n   - Because $|vxy| \\le p$, the substring $vxy$ **cannot contain occurrences of all three symbols $a, b,$ and $c$ simultaneously**!\n   - $vxy$ can contain at most two distinct symbols (either only $a$'s, $a$'s and $b$'s, only $b$'s, $b$'s and $c$'s, or only $c$'s).\n4. Now pump with $i = 2$: $s' = u v^2 x y^2 z$.\n   - The number of symbols contained in $vy$ increases, but the third symbol not present in $vxy$ remains unchanged at $p$ occurrences!\n   - Thus, the counts of $a$, $b$, and $c$ in $s'$ are no longer equal!\n   - Therefore, $s' \\notin L$, contradicting the assumption.\n5. $\\implies L = \\{ a^n b^n c^n \\}$ is **NOT Context-Free**!\n\n---\n\n## 4. Closure Properties of Context-Free Languages\n\n| Operation | Context-Free Languages (CFL) | Deterministic CFL (DCFL) |\n| :--- | :--- | :--- |\n| **Union ($L_1 \\cup L_2$)** | **CLOSED** | **NOT CLOSED** |\n| **Concatenation ($L_1 \\cdot L_2$)** | **CLOSED** | **NOT CLOSED** |\n| **Kleene Star ($L^*$)** | **CLOSED** | **NOT CLOSED** |\n| **Intersection ($L_1 \\cap L_2$)** | **NOT CLOSED** | **NOT CLOSED** |\n| **Complement ($\\overline{L}$)** | **NOT CLOSED** | **CLOSED** |\n| **Intersection with Regular ($L \\cap R$)** | **CLOSED** | **CLOSED** |\n\n*(Crucial Interview Note: CFLs are NOT closed under intersection because $\\{a^n b^n c^m\\} \\cap \\{a^m b^n c^n\\} = \\{a^n b^n c^n\\}$ which is not a CFL!)*\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **CFL Partition:** $s = uvxyz$ with $|vxy| \\le p$ and $|vy| \\ge 1$.\n- **Not Context-Free Classic Languages:**\n  - $\\{ a^n b^n c^n \\mid n \\ge 1 \\}$ (three-count matching).\n  - $\\{ w w \\mid w \\in \\{0, 1\\}^* \\}$ (exact repetition).\n  - $\\{ a^p \\mid p \\text{ is prime} \\}$.\n- **CFL Closure Trap:** Closed under Union/Concat/Star; NOT closed under Intersection or Complement!\n",
      "questions": [
        {
          "id": "toc-cfl-1",
          "question": "Which of the following operations is NOT closed for Context-Free Languages?",
          "options": [
            "Union",
            "Concatenation",
            "Intersection",
            "Kleene Star"
          ],
          "correct_option": 2,
          "explanation": "Context-Free Languages are NOT closed under intersection. The intersection of two CFLs can produce a non-context-free language (e.g. {a^n b^n c^m} ∩ {a^m b^n c^n} = {a^n b^n c^n})."
        },
        {
          "id": "toc-cfl-2",
          "question": "If L1 is a Context-Free Language and L2 is a Regular Language, what can be guaranteed about L1 ∩ L2?",
          "options": [
            "It is always Regular",
            "It is guaranteed to be Context-Free",
            "It is non-context-free",
            "It is undecidable"
          ],
          "correct_option": 1,
          "explanation": "CFLs are closed under intersection with regular languages: L1 (CFL) ∩ L2 (Regular) is always a Context-Free Language."
        },
        {
          "id": "toc-cflpl-3",
          "question": "In the Pumping Lemma for Context-Free Languages, any string s in L of length >= p is partitioned into s = uvxyz. What is pumped?",
          "options": [
            "u v^i x y^i z for all i >= 0",
            "u v x^i y z",
            "u^i v x y z^i",
            "u v x y z^i"
          ],
          "correct_option": 0,
          "explanation": "The CFL Pumping Lemma states that string s decomposes into five substrings uvxyz such that |vxy| <= p, |vy| >= 1, and u v^i x y^i z belongs to L for all integers i >= 0."
        }
      ],
      "prerequisites": [
        "Context-free grammars and parse tree height",
        "Pumping lemma for regular languages"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Pumping Lemma for Context-Free Languages",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Pumping Lemma for Context Free Languages",
          "url": "https://www.geeksforgeeks.org/pumping-lemma-for-context-free-languages-cfl/",
          "provider": "GeeksforGeeks",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "InterviewBit: Proving Non-CFL Languages via Pumping Lemma",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-turing-machines",
      "slug": "turing-machines",
      "title": "Turing Machines",
      "description": "7-tuple definition, infinite two-way tape, read-write head, instantaneous descriptions, multi-tape TMs, and non-deterministic TMs.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "IBM Research"
      ],
      "keyTakeaways": [
        "Turing Machine: 7-tuple (Q, Sigma, Gamma, delta, q0, B, F) with infinite memory tape.",
        "Transition function: delta: Q x Gamma -> Q x Gamma x {L, R}.",
        "Church-Turing Thesis: Any algorithm or effective computation can be simulated by a Turing Machine.",
        "Multi-tape TMs, non-deterministic TMs, and multi-track TMs are all equivalent in computational power to single-tape deterministic TMs."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Turing+Machines+Church+Turing+Thesis+Multi+Tape+TOC+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Turing Machines, Computational Models & The Church-Turing Thesis\n\nIntroduced by Alan Turing in 1936, the **Turing Machine (TM)** is an idealized mathematical model of computation. It consists of a finite state control unit, an infinite memory tape partitioned into discrete cells, and a read/write head that can scan, overwrite, and move bidirectionally along the tape.\n\n---\n\n## 1. Formal 7-Tuple Definition\n\n$$M = (Q, \\Sigma, \\Gamma, \\delta, q_0, B, F)$$\n\n- $Q$: Finite, non-empty set of internal control states.\n- $\\Sigma$: Input alphabet (finite set of symbols; blank symbol $B \\notin \\Sigma$).\n- $\\Gamma$: Tape alphabet, where $\\Sigma \\subset \\Gamma$ and $B \\in \\Gamma$.\n- $q_0 \\in Q$: Initial starting state.\n- $B \\in \\Gamma$: Blank symbol (fills all infinite cells not holding input string $w$).\n- $F \\subseteq Q$: Set of final / accepting halting states.\n- **Transition Function ($\\delta$):**\n  $$\\delta: Q \\times \\Gamma \\to Q \\times \\Gamma \\times \\{L, R\\}$$\n  Given current state $q$ and scanned tape symbol $X$, $\\delta(q, X) = (p, Y, D)$ means:\n  1. Switch to new internal state $p$.\n  2. Overwrite cell with symbol $Y$.\n  3. Move the tape head one cell in direction $D \\in \\{\\text{Left } (L), \\text{Right } (R)\\}$.\n\n```\n                    Finite State Control (q)\n                               |\n                               v (Read/Write Head)\n       ... [ B ] [ a ] [ b ] [ b ] [ a ] [ B ] ...   (Infinite Tape)\n                   ^       ^\n                   Direction: L or R\n```\n\n---\n\n## 2. Instantaneous Descriptions (IDs)\n\nAn **Instantaneous Description (ID)** captures the complete configuration of a Turing Machine at any discrete clock step:\n$$\\alpha_1 \\; q \\; \\alpha_2$$\n- $q \\in Q$: Current internal state.\n- $\\alpha_1 \\in \\Gamma^*$: String of tape cells to the left of the head.\n- $\\alpha_2 \\in \\Gamma^*$: String from the current scanned cell to the last non-blank symbol to the right.\n- The head is currently scanning the first symbol of $\\alpha_2$.\n- **Step relation ($\\vdash$):** If $\\delta(q, X) = (p, Y, R)$, then $\\alpha_1 X q X_2 \\dots X_n \\vdash \\alpha_1 Y p X_2 \\dots X_n$.\n\n---\n\n## 3. Turing Machine Equivalence Theorems (Variants)\n\nEvery reasonable variation of a Turing Machine has **the exact same language recognition and computational power** as the standard single-tape deterministic model:\n\n1. **Multi-Tape Turing Machines:** Has $k$ independent tapes, each with its own head. Can be simulated by a standard single-tape TM with at most **quadratic slowdown** ($T(n) \\to O(T(n)^2)$).\n2. **Non-deterministic Turing Machines (NTM):** Transition function $\\delta: Q \\times \\Gamma \\to \\mathcal{P}(Q \\times \\Gamma \\times \\{L, R\\})$. Can be simulated by a deterministic TM using Breadth-First Search on the computation tree with at most exponential slowdown ($T(n) \\to 2^{O(T(n))}$).\n3. **Multi-dimensional / Multi-head TMs:** Equivalent in computational capability.\n4. **Two-Stack PDA:** A Pushdown Automaton with **two stacks** is computationally equivalent to a full Turing Machine!\n\n---\n\n## 4. The Church-Turing Thesis & The Universal Turing Machine (UTM)\n- **The Church-Turing Thesis:** Any algorithmic procedure that can be performed by any physical computer, quantum computer, or programming language (C++, Python, Lisp) can be performed by a Turing Machine.\n- **Universal Turing Machine (UTM):** A single programmable Turing Machine $U$ that takes an encoded description of an arbitrary TM $\\langle M \\rangle$ and an input string $w$, and simulates $M$ executing on $w$: $U(\\langle M, w \\rangle) = M(w)$. This is the mathematical archetype of the modern stored-program computer (Von Neumann architecture).\n\n---\n\n## 5. Halting States & Language Classes\nWhen given an input $w$, a Turing machine $M$ can produce three outcomes:\n1. **Halt and Accept:** Reaches state $q \\in F$.\n2. **Halt and Reject:** Enters a state where no valid transition is defined and $q \\notin F$.\n3. **Loop Forever:** Executes an infinite sequence of transitions without halting.\n\n- **Turing-Recognizable (Recursively Enumerable / RE):** $M$ halts and accepts if $w \\in L$, but may loop forever if $w \\notin L$.\n- **Turing-Decidable (Recursive / REC):** $M$ is guaranteed to **halt on every input** (accepts if $w \\in L$, rejects if $w \\notin L$).\n",
      "questions": [
        {
          "id": "toc-tm-1",
          "question": "Does a Multi-Tape Turing Machine have greater language-recognition capability than a Standard Single-Tape Turing Machine?",
          "options": [
            "Yes, it accepts context-sensitive languages that single-tape TMs cannot",
            "No, multi-tape TMs can be simulated by single-tape TMs with at most quadratic time slowdown",
            "Yes, it solves the Halting Problem",
            "No, multi-tape TMs accept only regular languages"
          ],
          "correct_option": 1,
          "explanation": "Multi-tape Turing machines have greater speed convenience, but zero additional expressive power; any k-tape TM can be simulated by a single-tape TM in O(T^2) time."
        },
        {
          "id": "toc-tm-2",
          "question": "What is the Church-Turing Thesis?",
          "options": [
            "All languages are decidable",
            "Any effectively calculable function or algorithm can be computed by a Turing Machine",
            "Turing machines run in polynomial time",
            "Computers cannot have memory leaks"
          ],
          "correct_option": 1,
          "explanation": "The Church-Turing thesis hypothesizes that the intuitive notion of algorithm/computability is completely captured by the mathematical model of the Turing Machine."
        },
        {
          "id": "toc-tm-3",
          "question": "What distinguishes a Turing-Decidable (Recursive) language from a Turing-Recognizable (Recursively Enumerable) language?",
          "options": [
            "For a Decidable language, a Turing Machine is guaranteed to halt on ALL inputs (accepting or rejecting), whereas for Recognizable languages, it may loop infinitely on inputs not in the language.",
            "Decidable languages require two tapes; recognizable languages require one tape.",
            "Decidable languages cannot be parsed in polynomial time.",
            "They are completely identical concepts with no distinction."
          ],
          "correct_option": 0,
          "explanation": "A language is Turing-decidable (Recursive) if there exists a decider Turing machine that halts on every possible input, accepting valid strings and rejecting invalid strings. A language is merely recognizable (RE) if the TM halts and accepts strings in the language, but may loop indefinitely on strings not in the language."
        }
      ],
      "prerequisites": [
        "Pushdown Automata",
        "Infinite Tape and Transition Functions"
      ],
      "externalResources": [
        {
          "title": "Turing Machines and Decidability — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/turing-machine-in-toc/",
          "difficulty": "Advanced",
          "isFree": true
        },
        {
          "title": "Turing Machines & The Halting Problem — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-decidability-and-undecidability",
      "slug": "decidability-and-undecidability",
      "title": "Decidability and Undecidability",
      "description": "Halting problem, diagonal argument, reduction proofs, Post Correspondence Problem (PCP), and Rice's Theorem.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "IBM Research"
      ],
      "keyTakeaways": [
        "Decidable language: A Turing Machine halts and decides (yes or no) on ALL inputs.",
        "Undecidable: No Turing Machine can guarantee halting on all inputs with correct answer.",
        "Halting Problem (H_TM): Proved undecidable by Alan Turing using Cantor's diagonalization argument.",
        "Rice's Theorem: ANY non-trivial semantic property of the language recognized by a Turing machine is undecidable."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Decidability+Undecidability+Halting+Problem+Rices+Theorem+PCP+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Decidability, Undecidability, the Halting Problem, and Rice's Theorem\n\nComputability theory explores the ultimate limits of algorithms. A problem is decidable if there exists an algorithm (a Turing Machine that halts on all inputs) that answers yes or no correctly in finite time. Alan Turing proved in 1936 that fundamental computational questions are mathematically **Undecidable**.\n\n---\n\n## 1. Decision Problems: Decidable vs Undecidable\n\n- **Decision Problem:** A computational question with a binary Yes/No answer, formalized as testing membership of a string $w$ in a language $L$.\n- **Decidable (Recursive / Computable):** There exists a Turing Machine $M$ (a **Decider**) that halts on every input $w \\in \\Sigma^*$:\n  - If $w \\in L \\implies M$ halts and **Accepts**.\n  - If $w \\notin L \\implies M$ halts and **Rejects**.\n- **Undecidable:** No algorithm exists that is guaranteed to halt in finite time with the correct answer for all possible inputs.\n\n---\n\n## 2. Alan Turing's Halting Problem ($A_{\\text{TM}}$ / $HALT_{\\text{TM}}$)\n\nCan we write a program `halts(program, input)` that determines whether an arbitrary program will eventually finish running or loop infinitely?\n\n### Proof by Diagonalization and Contradiction:\n1. Assume there exists a decider $H$:\n   $$H(\\langle M, w \\rangle) = \\begin{cases} \\text{Accept} & \\text{if } M \\text{ halts on input } w \\\\ \\text{Reject} & \\text{if } M \\text{ loops forever on input } w \\end{cases}$$\n2. Construct a pathological adversarial program $D$ that takes the source code of program $M$ as input:\n   ```python\n   def D(M):\n       if H(M, M) == Accept:\n           while True: pass # Loop forever!\n       else:\n           return True      # Halt immediately!\n   ```\n3. What happens when we run $D$ with its own source code as input: $D(D)$?\n   - If $D(D)$ halts $\\implies H(D, D)$ outputs `Accept` $\\implies D$ enters an infinite loop! (**Contradiction!**)\n   - If $D(D)$ loops forever $\\implies H(D, D)$ outputs `Reject` $\\implies D$ halts immediately! (**Contradiction!**)\n4. Both cases yield a logical impossibility. Thus, decider $H$ **cannot exist**.\n$\\implies$ **The Halting Problem is Undecidable!**\n\n---\n\n## 3. Rice's Theorem\n\nRice's Theorem is a powerful meta-theorem stating that **any non-trivial semantic property of the language recognized by a Turing Machine is Undecidable**.\n\n```\nRice's Theorem Criteria:\nLet P be a property of languages recognized by Turing Machines.\nIf:\n1. P is NON-TRIVIAL:\n   - There exists at least one TM whose language has property P, AND\n   - There exists at least one TM whose language does NOT have property P.\n2. P is a SEMANTIC PROPERTY (depends on language L(M), NOT internal syntax).\nTHEN:\n   The problem \"Does L(M) satisfy property P?\" is UNDECIDABLE!\n```\n\n### Examples of Undecidable Problems via Rice's Theorem:\n- Is $L(M)$ empty? ($L(M) = \\emptyset$) $\\to$ **Undecidable**.\n- Is $L(M)$ regular? $\\to$ **Undecidable**.\n- Is $L(M)$ context-free? $\\to$ **Undecidable**.\n- Does $L(M)$ contain the string `\"hello\"`? $\\to$ **Undecidable**.\n- Does $L(M) = \\Sigma^*$? $\\to$ **Undecidable**.\n\n---\n\n## 4. Decidable vs Undecidable Summary Table\n\n| Question / Problem | Regular Languages | Context-Free Languages | Turing Machines (RE) |\n| :--- | :---: | :---: | :---: |\n| **Membership ($w \\in L$)** | **Decidable** (Run DFA) | **Decidable** (CYK algorithm) | **Undecidable** ($A_{\\text{TM}}$) |\n| **Emptiness ($L = \\emptyset$)** | **Decidable** (Graph reachability)| **Decidable** (Grammar test) | **Undecidable** (Rice's Theorem) |\n| **Finiteness ($L$ is finite)** | **Decidable** (Cycle check) | **Decidable** | **Undecidable** |\n| **Equivalence ($L_1 = L_2$)** | **Decidable** ($L_1 \\triangle L_2 = \\emptyset$)| **Undecidable** | **Undecidable** |\n| **Universal ($L = \\Sigma^*$)**| **Decidable** | **Undecidable** | **Undecidable** |\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Halting Problem:** Undecidable (proved via Cantor's diagonalization).\n- **Rice's Theorem Rule:** Any non-trivial language property of a TM is undecidable.\n- **Post Correspondence Problem (PCP):** An undecidable puzzle problem over tile pairs used to prove grammar ambiguities undecidable.\n",
      "questions": [
        {
          "id": "toc-und-1",
          "question": "According to Rice's Theorem, which of the following problems is undecidable for an arbitrary Turing Machine M?",
          "options": [
            "Does M have more than 5 states?",
            "Does M make more than 10 transitions on input '0'?",
            "Is the language accepted by M empty (L(M) = ∅)?",
            "Does M have a transition on symbol '1'?"
          ],
          "correct_option": 2,
          "explanation": "Whether L(M) = ∅ is a non-trivial semantic property of the language accepted by the TM. By Rice's Theorem, all non-trivial semantic language properties are undecidable. (State counts and transition tests are syntactic/structural properties)."
        },
        {
          "id": "toc-und-2",
          "question": "What proof technique did Alan Turing use to prove the undecidability of the Halting Problem?",
          "options": [
            "Mathematical Induction",
            "Cantor's Diagonalization Argument",
            "Master Theorem",
            "Euler's Totient Theorem"
          ],
          "correct_option": 1,
          "explanation": "Alan Turing used a diagonalization argument analogous to Georg Cantor's proof of the uncountability of real numbers to construct a self-contradicting machine that inverts the decider's output."
        },
        {
          "id": "toc-dec-3",
          "question": "Which of the following problems was proven undecidable by Alan Turing using a diagonalization argument?",
          "options": [
            "The Halting Problem for Turing Machines",
            "Emptiness problem for DFAs",
            "Membership problem for Regular Languages",
            "Equivalence of two DFAs"
          ],
          "correct_option": 0,
          "explanation": "Alan Turing proved in 1936 that the Halting Problem (determining whether an arbitrary Turing Machine halts on a given input) is undecidable using a self-referential diagonal contradiction."
        }
      ],
      "prerequisites": [
        "Turing machines and language recognition",
        "Diagonalization and mathematical logic proofs"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Decidability, Undecidability, and Reducibility",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Advanced",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Decidability and Undecidability in TOC",
          "url": "https://www.geeksforgeeks.org/decidability-in-theory-of-computation/",
          "provider": "GeeksforGeeks",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "InterviewBit: The Halting Problem and Rice's Theorem Guide",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-recursive-and-re-languages",
      "slug": "recursive-and-recursively-enumerable-languages",
      "title": "Recursive and Recursively Enumerable Languages",
      "description": "Recursive (Turing-decidable) vs Recursively Enumerable (Turing-recognizable), complements, and Chomsky Hierarchy.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "IBM",
        "Intel"
      ],
      "keyTakeaways": [
        "Recursive (REC): Turing machine halts on all inputs (accepts if in L, rejects if not).",
        "Recursively Enumerable (RE): Turing machine halts and accepts if w in L; may loop forever if w not in L.",
        "Theorem: Language L is Recursive iff both L AND its complement L' are Recursively Enumerable.",
        "Chomsky Hierarchy: Regular (Type 3) subset of CFL (Type 2) subset of CSL (Type 1) subset of Recursive subset of RE (Type 0)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Recursive+Recursively+Enumerable+Languages+Chomsky+Hierarchy+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Recursive vs Recursively Enumerable (RE) Languages and the Chomsky Hierarchy\n\nIn the upper tier of the computational hierarchy, languages are categorized according to whether a Turing Machine can decide them (guaranteed to halt) or merely recognize them (may loop indefinitely on non-member inputs).\n\n---\n\n## 1. Recursive (Turing-Decidable) vs Recursively Enumerable (Turing-Recognizable)\n\n```\n+-----------------------------------------------------------+\n|      NON-RECURSIVELY ENUMERABLE LANGUAGES (Non-RE)        |\n|      (e.g., Complement of Halting Problem: ~A_TM)         |\n|                                                           |\n|   +---------------------------------------------------+   |\n|   |   RECURSIVELY ENUMERABLE (RE / Turing-Recognizable)|  |\n|   |   Recognized by a TM (Halts on yes, may loop on no)   |\n|   |   (e.g., Halting Problem A_TM)                    |   |\n|   |                                                   |   |\n|   |   +-------------------------------------------+   |   |\n|   |   |   RECURSIVE (Decidable / Turing-Decidable)|   |   |\n|   |   |   Halt GUARANTEED on ALL inputs!          |   |   |\n|   |   +-------------------------------------------+   |   |\n|   +---------------------------------------------------+   |\n+-----------------------------------------------------------+\n```\n\n- **Recursive Language ($L \\in \\text{REC}$):**\n  There exists a Turing Machine $M$ that **halts on every input string**:\n  - If $w \\in L \\implies$ Halts and Accepts.\n  - If $w \\notin L \\implies$ Halts and Rejects.\n- **Recursively Enumerable Language ($L \\in \\text{RE}$):**\n  There exists a Turing Machine $M$ that recognizes $L$:\n  - If $w \\in L \\implies M$ halts in finite time and Accepts.\n  - If $w \\notin L \\implies M$ **may reject OR loop forever**!\n\n---\n\n## 2. The Fundamental Complement Theorem\n\n```\nTheorem:\nA language L is RECURSIVE (Decidable) IF AND ONLY IF\nBOTH L is Recursively Enumerable (RE) AND its complement ~L is Recursively Enumerable!\n```\n$$\\mathbf{L \\in \\text{REC} \\iff (L \\in \\text{RE} \\land \\overline{L} \\in \\text{RE})}$$\n\n### Proof Construction:\nRun two Turing machines in parallel (interleaved execution): $M_1$ for $L$ and $M_2$ for $\\overline{L}$.\nBecause every string $w$ is either in $L$ or in $\\overline{L}$, **one of the two machines is mathematically guaranteed to halt in finite time!**\n- If $M_1$ halts $\\implies$ Accept!\n- If $M_2$ halts $\\implies$ Reject!\nHence, the parallel system is a guaranteed **Decider**!\n\n### Corollary:\nSince the Halting Problem $A_{\\text{TM}}$ is known to be **RE but NOT Recursive**, its complement $\\overline{A_{\\text{TM}}}$ **CANNOT be Recursively Enumerable (is strictly Non-RE)**!\n\n---\n\n## 3. The Complete Chomsky Hierarchy\n\nNoam Chomsky (1956) organized formal languages into four hierarchical levels based on grammar production constraints and machine models:\n\n| Type | Language Class | Machine Model | Grammar Production Constraints |\n| :--- | :--- | :--- | :--- |\n| **Type 3** | **Regular** | Deterministic / Non-Deterministic Finite Automata (DFA/NFA) | $A \\to aB$ or $A \\to a$ (Right-Linear) |\n| **Type 2** | **Context-Free** | Non-Deterministic Pushdown Automata (NPDA) | $A \\to \\alpha$ where $A \\in V$ |\n| **Type 1** | **Context-Sensitive**| Linear Bounded Automata (LBA - bounded tape) | $\\alpha A \\beta \\to \\alpha \\gamma \\beta$ with $|\\gamma| \\ge |A|$ |\n| **Type 0** | **Recursively Enumerable**| Turing Machine (Unbounded Tape) | $\\alpha \\to \\beta$ (Unrestricted: $\\alpha \\ne \\epsilon$) |\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Chomsky Hierarchy Inclusions:** $\\text{Regular} \\subset \\text{Context-Free} \\subset \\text{Context-Sensitive} \\subset \\text{Recursive} \\subset \\text{Recursively Enumerable}$.\n- **Complement Invariant:** $L \\in \\text{REC} \\iff L \\in \\text{RE} \\land \\overline{L} \\in \\text{RE}$.\n- **Semi-Decidable:** Another standard name for Recursively Enumerable languages.\n",
      "questions": [
        {
          "id": "toc-rec-1",
          "question": "If a language L is Recursively Enumerable (RE) and its complement L' is also Recursively Enumerable, what can be concluded about L?",
          "options": [
            "L is Regular",
            "L is Context-Free",
            "L is Recursive (Decidable)",
            "L is Undecidable and not in RE"
          ],
          "correct_option": 2,
          "explanation": "By Post's theorem, a language L is Recursive (decidable) if and only if both L and its complement are Recursively Enumerable."
        },
        {
          "id": "toc-rec-2",
          "question": "What is the key difference between a Turing-Decidable (Recursive) language and a Turing-Recognizable (RE) language?",
          "options": [
            "Turing-decidable machines are guaranteed to halt on all inputs; Turing-recognizable machines may loop forever on rejected inputs",
            "Turing-recognizable languages cannot be simulated",
            "Recursive languages require multiple tapes",
            "They are identical"
          ],
          "correct_option": 0,
          "explanation": "A decider must always halt on every valid and invalid input. A recognizer is only required to halt and accept for strings in the language; it is permitted to loop indefinitely for strings not in the language."
        },
        {
          "id": "toc-rec-3",
          "question": "What theorem establishes that a language L is Recursive (Decidable) if and only if both L and its complement L' are Recursively Enumerable (Turing-recognizable)?",
          "options": [
            "Post's Theorem",
            "Rice's Theorem",
            "Cook-Levin Theorem",
            "Myhill-Nerode Theorem"
          ],
          "correct_option": 0,
          "explanation": "Post's theorem states that a language L is recursive if and only if both L and its complement are recursively enumerable (run two TMs in parallel; one is guaranteed to accept and halt)."
        }
      ],
      "prerequisites": [
        "Decidability and Turing machines",
        "Chomsky hierarchy and formal grammars"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Recursive and Recursively Enumerable Languages",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Advanced",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Recursive and Recursively Enumerable Languages",
          "url": "https://www.geeksforgeeks.org/recursive-and-recursively-enumerable-languages-in-toc/",
          "provider": "GeeksforGeeks",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "InterviewBit: Chomsky Hierarchy and Decidability Classification",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    },
    {
      "id": "toc-complexity-classes-p-np",
      "slug": "time-and-space-complexity-classes-p-np-np-complete",
      "title": "Time and Space Complexity Classes: P, NP, NP-Complete",
      "description": "Deterministic vs Nondeterministic time and space, classes P, NP, NP-Complete, PSPACE, Savitch's theorem, and Cook's theorem.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "IBM Research"
      ],
      "keyTakeaways": [
        "P = TIME(n^k) on Deterministic Turing Machine.",
        "NP = TIME(n^k) on Nondeterministic Turing Machine (polynomial-time certificate verification).",
        "PSPACE: Problems solvable using polynomial amount of space memory (P subset of NP subset of PSPACE).",
        "Savitch's Theorem: NSPACE(f(n)) subset of DSPACE(f(n)^2) -> PSPACE = NPSPACE."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Complexity+Classes+P+NP+NP+Complete+PSPACE+Savitch+Theorem+Theory+of+Computation+TOC+gate+lecture",
      "notesMarkdown": "# Computational Complexity: P, NP, NP-Complete, and NP-Hard\n\nComputational complexity theory classifies decidable problems according to the resources (time and memory space) required to solve them as input size $n$ scales.\n\n---\n\n## 1. Definitions of Complexity Classes: P vs NP\n\n```\n                           +-------------------------------+\n                           |            NP-HARD            |\n                           |   (At least as hard as the    |\n                           |    hardest problems in NP)    |\n                           |   +-----------------------+   |\n                           |   |      NP-COMPLETE      |   |\n                           |   | (In NP AND NP-Hard)   |   |\n                           |   +-----------+-----------+   |\n                           +---------------|---------------+\n                                           |\n                           +---------------+---------------+\n                           |               NP              |\n                           |   (Verifiable in Poly Time)   |\n                           |   +-----------------------+   |\n                           |   |           P           |   |\n                           |   | (Solvable in PolyTime)|   |\n                           |   +-----------------------+   |\n                           +-------------------------------+\n                                 (Assuming P != NP)\n```\n\n- **Class P (Polynomial Time):** The set of decision problems solvable by a **Deterministic Turing Machine** in $O(n^k)$ time for some constant $k$. Considered mathematically tractable (e.g., Shortest Path Dijkstra, Sorting, Linear Programming).\n- **Class NP (Nondeterministic Polynomial Time):** The set of decision problems solvable by a **Non-deterministic Turing Machine** in polynomial time.\n  - *Equivalent Definition:* Problems whose proposed solution certificate can be **verified by a Deterministic Turing Machine in polynomial time**.\n  - Example: Traveling Salesperson Problem (TSP), Boolean Satisfiability (SAT), Clique, Subset Sum.\n\n---\n\n## 2. Polynomial-Time Reduction ($A \\le_p B$)\n\nA problem $A$ reduces to problem $B$ in polynomial time ($A \\le_p B$) if there exists a polynomial-time computable function $f$ such that:\n$$w \\in A \\iff f(w) \\in B$$\n*Meaning:* Problem $B$ is **at least as hard as problem $A$**. If you have an efficient solver for $B$, you can solve $A$ efficiently!\n\n---\n\n## 3. NP-Complete (NPC) and NP-Hard\n\n### NP-Hard:\nA problem $H$ is **NP-Hard** if every problem $L \\in \\text{NP}$ can be reduced to $H$ in polynomial time:\n$$\\forall L \\in \\text{NP}, \\quad L \\le_p H$$\n*(NP-Hard problems do NOT need to be in NP; they do not even need to be decidable! E.g., the Halting Problem is NP-Hard!).*\n\n### NP-Complete (NPC):\nA problem $C$ is **NP-Complete** if and only if:\n1. $C \\in \\text{NP}$ (verifiable in polynomial time), AND\n2. $C$ is **NP-Hard** ($L \\le_p C$ for all $L \\in \\text{NP}$).\n- NP-Complete problems are the **hardest problems in NP**.\n- **The Golden Consequence:** If ANY single NP-Complete problem is proven to have a polynomial-time algorithm, then **EVERY problem in NP can be solved in polynomial time, proving $P = NP$!**\n\n---\n\n## 4. The Cook-Levin Theorem and Classical NP-Complete Problems\n\nStephen Cook (1971) and Leonid Levin (1973) proved the foundational theorem:\n$$\\mathbf{Boolean \\quad Satisfiability \\quad (SAT) \\quad is \\quad NP-Complete}$$\nBy reducing SAT to 3-SAT, and 3-SAT to graph and combinatorial problems (Richard Karp's 21 NP-Complete problems), scientists established that:\n- 3-SAT\n- Vertex Cover\n- Hamiltonian Cycle & Traveling Salesperson (Decision)\n- Independent Set\n- Clique\n- Subset Sum\n- Graph Coloring\nare all **NP-Complete**!\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Class P:** Solvable in polynomial time $O(n^k)$.\n- **Class NP:** Verifiable in polynomial time $O(n^k)$.\n- **NP-Complete:** In NP $\\land$ NP-Hard.\n- **Proving a new problem $X$ is NP-Complete:**\n  1. Prove $X \\in \\text{NP}$ (show polynomial verifier).\n  2. Select a known NP-Complete problem $Y$ (e.g., 3-SAT).\n  3. Show $Y \\le_p X$ (reduce known NPC problem to new problem).\n",
      "questions": [
        {
          "id": "toc-cc-1",
          "question": "What landmark theorem proves that PSPACE = NPSPACE, showing that nondeterminism does not increase polynomial space capacity?",
          "options": [
            "Cook-Levin Theorem",
            "Savitch's Theorem",
            "Rice's Theorem",
            "Kleene's Theorem"
          ],
          "correct_option": 1,
          "explanation": "Savitch's Theorem states that NSPACE(f(n)) ⊆ DSPACE(f(n)^2). For f(n) = n^k, (n^k)^2 = n^(2k), which is still polynomial space, proving PSPACE = NPSPACE."
        },
        {
          "id": "toc-cc-2",
          "question": "Which of the following containment relationships is widely accepted in computational complexity theory?",
          "options": [
            "P ⊆ NP ⊆ PSPACE ⊆ EXPTIME",
            "EXPTIME ⊆ PSPACE ⊆ NP ⊆ P",
            "NP ⊆ P ⊆ PSPACE",
            "PSPACE ⊆ NP ⊆ P"
          ],
          "correct_option": 0,
          "explanation": "The established containment hierarchy is P ⊆ NP ⊆ PSPACE ⊆ EXPTIME."
        },
        {
          "id": "toc-pnp-3",
          "question": "What is the primary definition of the complexity class NP?",
          "options": [
            "The set of decision problems verifiable by a deterministic Turing machine in polynomial time.",
            "The set of non-polynomial problems that cannot be solved.",
            "The set of problems that take exponential space.",
            "Problems with no known verifier."
          ],
          "correct_option": 0,
          "explanation": "NP stands for Nondeterministic Polynomial time. It represents all decision problems whose candidate solutions ('certificates') can be verified in polynomial time by a Deterministic Turing Machine."
        }
      ],
      "prerequisites": [
        "Decidability and Turing machines",
        "Asymptotic Big-O algorithmic analysis"
      ],
      "externalResources": [
        {
          "title": "MIT 18.404J: Time Complexity, P, NP, and NP-Completeness",
          "url": "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Advanced",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: P, NP, NP-Complete and NP-Hard",
          "url": "https://www.geeksforgeeks.org/types-of-complexity-classes-p-np-co-np-np-hard-np-complete/",
          "provider": "GeeksforGeeks",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "InterviewBit: NP-Completeness and Reduction Guide",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    }
  ]
};
