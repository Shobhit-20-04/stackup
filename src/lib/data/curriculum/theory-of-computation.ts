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
      "notesMarkdown": "# Alphabets, Strings, and Languages\n\n---\n\n## 1. Fundamentals\n- **Alphabet ($\\Sigma$):** A finite, non-empty set of symbols (e.g. $\\Sigma = \\{0, 1\\}$).\n- **String ($w$):** A finite sequence of symbols chosen from $\\Sigma$. $|w|$ denotes length.\n- **Empty String ($\\epsilon$):** String of length $0$. $|\\epsilon| = 0$.\n\n---\n\n## 2. Kleene Star vs Positive Closure\n- **$\\Sigma^*$ (Kleene Star):** All possible strings of any length $\\ge 0$ over $\\Sigma$.\n  $$\\Sigma^* = \\Sigma^0 \\cup \\Sigma^1 \\cup \\Sigma^2 \\cup \\dots = \\{\\epsilon, 0, 1, 00, 01, \\dots\\}$$\n- **$\\Sigma^+$ (Positive Closure):** All strings of length $\\ge 1$. $\\Sigma^+ = \\Sigma^* \\setminus \\{\\epsilon\\}$.\n- A **Language** $L$ over $\\Sigma$ is simply any subset of $\\Sigma^*$ ($L \\subseteq \\Sigma^*$).\n",
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
      "notesMarkdown": "# Regular Expressions and Formal Language Operators\n\nRegular expressions (RE) provide algebraic syntax describing the family of regular languages over alphabet $\\Sigma$.\n\n---\n\n## 1. Inductive Definition of Regular Expressions\n1. $\\emptyset$ is a regular expression denoting $\\emptyset$.\n2. $\\epsilon$ is a regular expression denoting $\\{\\epsilon\\}$.\n3. For each $a \\in \\Sigma$, $a$ is a regular expression denoting $\\{a\\}$.\n4. If $r$ and $s$ are regular expressions:\n   - **Union (Alternation):** $r + s$ or $r \\mid s \\implies L(r) \\cup L(s)$.\n   - **Concatenation:** $r \\cdot s \\implies L(r) \\cdot L(s)$.\n   - **Kleene Star (Closure):** $r^* = \\bigcup_{i=0}^{\\infty} r^i = \\{\\epsilon\\} \\cup r \\cup rr \\cup \\dots$\n\n---\n\n## 2. Algebraic Identities (Arden's Theorem)\n- **Arden's Theorem:** If $P$ and $Q$ are regular expressions over $\\Sigma$ and $\\epsilon \\notin P$, then the equation:\n  $$R = Q + R P$$\n  has a unique solution given by:\n  $$R = Q P^*$$\n  *(Used to convert finite automata transition equations directly into regular expressions!)*\n- **Identities:**\n  - $(r^*)^* = r^*$\n  - $(r + s)^* = (r^* s^*)^* = (r^* + s^*)^*$\n  - $(r s)^* r = r (s r)^*$\n",
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
      "notesMarkdown": "# Finite Automata: Deterministic and Non-deterministic Models\n\nFinite Automata are 5-tuple state-transition machines with strictly finite internal memory.\n\n---\n\n## 1. Mathematical Formalism\nA Finite Automaton is a 5-tuple:\n$$M = (Q, \\Sigma, \\delta, q_0, F)$$\n- $Q$: Finite set of states.\n- $\\Sigma$: Finite input alphabet.\n- $q_0 \\in Q$: Initial starting state.\n- $F \\subseteq Q$: Set of accepting / final states.\n- **Transition Function $\\delta$:**\n  - **DFA (Deterministic):** $\\delta: Q \\times \\Sigma \\to Q$ (exactly one transition per symbol from every state).\n  - **NFA (Nondeterministic):** $\\delta: Q \\times \\Sigma \\to 2^Q$ (set of next states).\n  - **$\\epsilon$-NFA:** $\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\to 2^Q$.\n\n---\n\n## 2. Equivalence Theorem\n- Every NFA with or without $\\epsilon$-transitions can be converted to an equivalent DFA recognizing the exact same language (**Subset Construction / Powerset Construction**).\n- For an NFA with $n$ states, the equivalent minimal DFA has at most $2^n$ states in the worst case.\n",
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
      "notesMarkdown": "# NFA to DFA Conversion & Minimization\n\n---\n\n## 1. Subset Construction\nGiven NFA $M = (Q, \\Sigma, \\delta, q_0, F)$:\n- Equivalent DFA has states $Q' \\subseteq 2^Q$.\n- Maximum possible states $= 2^n$ where $|Q| = n$.\n- Start state $= \\epsilon\\text{-closure}(q_0)$.\n- Accepting states $= \\{S \\subseteq Q \\mid S \\cap F \\ne \\emptyset\\}$.\n\n---\n\n## 2. Table-Filling Algorithm (Myhill-Nerode Minimization)\n1. Mark all pairs $(p, q)$ where $p \\in F$ and $q \\notin F$ (distinct by $\\epsilon$).\n2. For unmarked pairs $(p, q)$, if for some input $a$, the pair $(\\delta(p, a), \\delta(q, a))$ is already marked, mark $(p, q)$.\n3. Repeat until no more pairs can be marked. Unmarked pairs are equivalent and merged.\n",
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
      "notesMarkdown": "# Parse Trees, Derivations, and Ambiguity in CFGs\n\nContext-Free Grammars generate strings through sequential substitution of non-terminals.\n\n---\n\n## 1. Derivations\n- **Leftmost Derivation (LMD):** The leftmost non-terminal is replaced at every substitution step.\n- **Rightmost Derivation (RMD / Canonical):** The rightmost non-terminal is replaced at every step.\n- Every valid parse tree corresponds to a unique LMD and a unique RMD.\n\n---\n\n## 2. Grammar Ambiguity\n- A CFG is **ambiguous** if there exists at least one string $w \\in L(G)$ with:\n  - Two or more distinct parse trees, OR\n  - Two or more distinct leftmost derivations.\n- **Inherent Ambiguity:** A Context-Free Language $L$ is *inherently ambiguous* if **every** possible grammar generating $L$ is ambiguous (e.g. $L = \\{a^i b^j c^k \\mid i = j \\lor j = k\\}$).\n",
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
      "notesMarkdown": "# Pushdown Automata (PDA)\n\nA Pushdown Automaton extends a finite automaton with an external infinite-capacity **LIFO stack**.\n\n---\n\n## 1. Formal 7-Tuple Definition\n$$M = (Q, \\Sigma, \\Gamma, \\delta, q_0, z_0, F)$$\n- $\\Gamma$: Stack alphabet\n- $z_0 \\in \\Gamma$: Initial stack symbol\n- **Transition Function:** $\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\times \\Gamma \\to \\mathcal{P}(Q \\times \\Gamma^*)$\n\n---\n\n## 2. Deterministic (DPDA) vs Nondeterministic (NPDA)\n- **Unlike finite automata, NPDA $\\ne$ DPDA!**\n- **DCPDA (Deterministic CFLs):** Accepted by DPDA (subset of CFLs; includes all programming language grammars used by LR parsers).\n- **CFLs:** Accepted by NPDA.\n- Example: $L = \\{w w^R \\mid w \\in \\{0, 1\\}^*\\}$ is accepted by an NPDA, but **cannot** be accepted by any DPDA because the midpoint cannot be detected without non-determinism.\n",
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
      "notesMarkdown": "# Context-Free Languages and Pumping Lemma\n\n---\n\n## 1. Closure Properties of CFLs\n- **CLOSED under:** Union ($L_1 \\cup L_2$), Concatenation ($L_1 L_2$), Kleene Star ($L^*$), and **Intersection with a Regular Language** ($L_{\\text{CFL}} \\cap L_{\\text{Reg}} \\in \\text{CFL}$).\n- **NOT CLOSED under:**\n  - **Intersection:** $L_1 \\cap L_2$ (e.g. $\\{a^n b^n c^m\\} \\cap \\{a^m b^n c^n\\} = \\{a^n b^n c^n\\} \\notin \\text{CFL}$).\n  - **Complementation:** $\\overline{L}$.\n\n---\n\n## 2. Pumping Lemma for CFLs\nIf $L$ is a CFL, there exists pumping length $p$ such that any $s \\in L$ with $|s| \\ge p$ can be written as $s = u v x y z$ where:\n1. $|v x y| \\le p$\n2. $|v y| \\ge 1$ ($v$ and $y$ not both empty)\n3. $\\forall i \\ge 0, \\; u v^i x y^i z \\in L$\n",
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
      "notesMarkdown": "# Decidability and Undecidability\n\n---\n\n## 1. The Halting Problem ($A_{\\text{TM}}$)\n$$A_{\\text{TM}} = \\{ \\langle M, w \\rangle \\mid M \\text{ is a TM that accepts } w \\}$$\n- **Alan Turing's Proof (1936):** $A_{\\text{TM}}$ is **Undecidable**. If a hypothetical decider $H$ exists, we can construct machine $D$ that contradicts $H(D, \\langle D \\rangle)$.\n\n---\n\n## 2. Rice's Theorem\nLet $P$ be a property of the languages recognized by Turing machines. If:\n1. $P$ is **non-trivial** (some TMs have it, some do not), and\n2. $P$ is a **semantic property** (depends only on the language $L(M)$, not syntactic code),\n**Then deciding whether $L(M)$ satisfies $P$ is strictly UNDECIDABLE!**\n\nExamples of Undecidable Properties by Rice's Theorem:\n- Is $L(M)$ empty?\n- Is $L(M)$ finite?\n- Is $L(M)$ regular?\n",
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
      "notesMarkdown": "# Recursive and Recursively Enumerable Languages\n\n---\n\n## 1. Classification\n1. **Recursive (Decidable):** A Turing Machine exists that halts on **every** input and produces an accept/reject decision.\n2. **Recursively Enumerable (Turing-Recognizable):** A Turing Machine exists that halts and accepts if $w \\in L$, but may **loop forever** if $w \\notin L$.\n\n---\n\n## 2. Duality Theorem\nA language $L$ is **Recursive** if and only if **both $L$ and its complement $\\overline{L}$ are Recursively Enumerable**.\n- If $L \\in RE$ and $\\overline{L} \\in RE$, run TMs for $L$ and $\\overline{L}$ in parallel (dovetailing). One will halt, guaranteeing decision.\n\n---\n\n## 3. Chomsky Hierarchy Summary\n$$\\text{Regular (Type 3)} \\subset \\text{DCFL} \\subset \\text{CFL (Type 2)} \\subset \\text{CSL (Type 1)} \\subset \\text{Recursive} \\subset \\text{RE (Type 0)}$$\n",
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
      "notesMarkdown": "# Complexity Classes: P, NP, NP-Complete, and NP-Hard\n\nComputational complexity categorizes decision problems by the resource limits (time, memory) of Turing machines.\n\n---\n\n## 1. Definitions\n- **Class P:** Decision problems solvable by a **Deterministic Turing Machine** in polynomial time $O(n^k)$.\n- **Class NP (Nondeterministic Polynomial):** Decision problems solvable by a **Nondeterministic Turing Machine** in polynomial time, or equivalently, problems whose solutions can be **verified** in polynomial time by a DTM.\n- **NP-Hard:** Problem $H$ is NP-hard if every problem in NP reduces to $H$ in polynomial time ($L \\le_p H, \\forall L \\in \\text{NP}$).\n- **NP-Complete:** $X$ is NP-Complete $\\iff X \\in \\text{NP}$ AND $X$ is NP-Hard.\n\n---\n\n## 2. The Cook-Levin Theorem & Classic NP-Complete Problems\n- **Cook-Levin Theorem (1971):** The Boolean Satisfiability Problem (SAT) is NP-Complete.\n- **Classic Reductions:**\n  $$\\text{SAT} \\le_p \\text{3-SAT} \\le_p \\text{Clique} \\le_p \\text{Vertex Cover} \\le_p \\text{Hamiltonian Cycle} \\le_p \\text{TSP (Decision)}$$\n",
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
      ]
    }
  ]
};
