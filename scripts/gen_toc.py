import json
import urllib.parse
import re

def get_yt_url(title, cat_name="Theory of Computation"):
    query = f"{title} {cat_name} TOC gate lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

topics = [
    {
        "id": "toc-alphabets-strings-languages",
        "slug": "alphabets-strings-and-languages",
        "title": "Alphabets, Strings, and Languages",
        "description": "Symbols, alphabets (Sigma), string operations (concatenation, prefix, suffix, reversal), Kleene star (Sigma*), and language definitions.",
        "estimatedMinutes": 15,
        "difficulty": "Easy",
        "companyTags": ["Google", "Microsoft", "TCS Digital", "Infosys"],
        "keyTakeaways": [
            "Alphabet (Sigma): Non-empty finite set of symbols.",
            "String: Finite sequence of symbols; length |w| is symbol count; empty string epsilon has length 0.",
            "Kleene Closure (Sigma*): Set of all finite strings over Sigma including epsilon.",
            "Positive Closure (Sigma+): Sigma* \\ {epsilon} (all non-empty strings)."
        ],
        "youtube_url": get_yt_url("Alphabets Strings Languages Kleene Star TOC"),
        "notesMarkdown": """# Alphabets, Strings, and Languages

---

## 1. Fundamentals
- **Alphabet ($\\Sigma$):** A finite, non-empty set of symbols (e.g. $\\Sigma = \\{0, 1\\}$).
- **String ($w$):** A finite sequence of symbols chosen from $\\Sigma$. $|w|$ denotes length.
- **Empty String ($\\epsilon$):** String of length $0$. $|\epsilon| = 0$.

---

## 2. Kleene Star vs Positive Closure
- **$\\Sigma^*$ (Kleene Star):** All possible strings of any length $\\ge 0$ over $\\Sigma$.
  $$\\Sigma^* = \\Sigma^0 \\cup \\Sigma^1 \\cup \\Sigma^2 \\cup \\dots = \\{\\epsilon, 0, 1, 00, 01, \\dots\\}$$
- **$\\Sigma^+$ (Positive Closure):** All strings of length $\\ge 1$. $\\Sigma^+ = \\Sigma^* \\setminus \\{\\epsilon\\}$.
- A **Language** $L$ over $\\Sigma$ is simply any subset of $\\Sigma^*$ ($L \\subseteq \\Sigma^*$).
""",
        "questions": [
            {
                "id": "toc-asl-1",
                "question": "If alphabet Sigma has 2 symbols {0, 1}, how many strings of length exactly 4 can be formed?",
                "options": ["8", "16", "32", "4"],
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
        "companyTags": ["Amazon", "Google", "Microsoft", "Adobe"],
        "keyTakeaways": [
            "Regular expressions describe Regular Languages via operators: Union (+), Concatenation (.), and Kleene star (*).",
            "Arden's Theorem: If P and Q are regular expressions and epsilon not in P, then R = Q + RP has the unique solution R = QP*.",
            "Identities: (r*)* = r*; (r + s)* = (r* s*)*; epsilon + r r* = r*.",
            "Empty language phi vs empty string epsilon: phi* = {epsilon}; phi . L = phi."
        ],
        "youtube_url": get_yt_url("Regular Expressions Ardens Theorem TOC Theory of Computation"),
        "notesMarkdown": """# Regular Expressions

---

## 1. Syntax and Precedence
Precedence: **Kleene Star ($*$) > Concatenation > Union ($+$ or $|$)**.

---

## 2. Arden's Theorem
Let $P$ and $Q$ be two regular expressions over $\\Sigma$. If $\\epsilon \\notin P$, then the equation:
$$R = Q + R P$$
has a **unique solution** given by:
$$R = Q P^*$$
""",
        "questions": [
            {
                "id": "toc-re-1",
                "question": "According to Arden's Theorem, if epsilon is not in P, what is the unique solution to R = Q + RP?",
                "options": ["R = P*Q", "R = QP*", "R = Q*P", "R = (Q + P)*"],
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
        "companyTags": ["Google", "Amazon", "Microsoft", "TCS Digital"],
        "keyTakeaways": [
            "FA is a 5-tuple: (Q, Sigma, delta, q0, F), where Q is states, Sigma is alphabet, delta is transition function, q0 is initial state, F is final states.",
            "DFA transition function: delta: Q x Sigma -> Q (exactly one transition per symbol per state).",
            "NFA transition function: delta: Q x Sigma -> 2^Q (zero, one, or multiple transitions per symbol).",
            "DFA and NFA have equal computational power; both recognize precisely the class of Regular Languages."
        ],
        "youtube_url": get_yt_url("Finite Automata DFA NFA Definition Language Acceptance TOC"),
        "notesMarkdown": """# Finite Automata

A finite automaton is the simplest machine model with finite memory states.

---

## 1. Formal 5-Tuple Definition
$$M = (Q, \\Sigma, \\delta, q_0, F)$$
- $Q$: Finite set of states
- $\\Sigma$: Input alphabet
- $q_0 \\in Q$: Initial start state
- $F \\subseteq Q$: Set of accepting (final) states
- **DFA Transition Function:** $\\delta: Q \\times \\Sigma \\to Q$
- **NFA Transition Function:** $\\delta: Q \\times \\Sigma \\to \\mathcal{P}(Q) = 2^Q$
""",
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
        "companyTags": ["Amazon", "Microsoft", "Google", "Infosys"],
        "keyTakeaways": [
            "Minimum states in DFA to accept binary strings divisible by k is k states.",
            "Strings with specific ending pattern of length k require k + 1 states in DFA.",
            "Trap (Dead) states in DFA catch inputs that can never lead to acceptance.",
            "Epsilon-NFA allows state transitions without consuming any input symbol."
        ],
        "youtube_url": get_yt_url("DFA NFA State Minimization Modulo Divisibility Strings"),
        "notesMarkdown": """# DFA and NFA Design

---

## 1. Landmark Minimum State Problems
- **Binary numbers divisible by $k$:** Requires exactly **$k$ states** (representing remainders $0, 1, \\dots, k-1$).
- **Strings ending in a specific string of length $k$:**
  - NFA requires $k + 1$ states.
  - DFA requires $k + 1$ states.
- **Strings with $k$-th symbol from the end being '1':**
  - NFA requires $k + 1$ states.
  - Equivalent minimal DFA requires **$2^k$ states**! (Exponential blowup!).
""",
        "questions": [
            {
                "id": "toc-dn-1",
                "question": "What is the minimum number of states in a DFA that accepts all binary strings representing numbers divisible by 5?",
                "options": ["4", "5", "6", "10"],
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
        "companyTags": ["Google", "Microsoft", "Intel", "IBM"],
        "keyTakeaways": [
            "Subset Construction: Converts any NFA of n states to an equivalent DFA with at most 2^n states.",
            "Epsilon-Closure(q): Set of all states reachable from q by following zero or more epsilon transitions.",
            "DFA Minimization (Table-Filling Algorithm): Partitions states into equivalence classes of indistinguishable states.",
            "Myhill-Nerode Theorem: Number of states in minimal DFA equals the number of equivalence classes of right invariant relation R_L."
        ],
        "youtube_url": get_yt_url("NFA to DFA Conversion Subset Construction DFA Minimization"),
        "notesMarkdown": """# NFA to DFA Conversion & Minimization

---

## 1. Subset Construction
Given NFA $M = (Q, \\Sigma, \\delta, q_0, F)$:
- Equivalent DFA has states $Q' \\subseteq 2^Q$.
- Maximum possible states $= 2^n$ where $|Q| = n$.
- Start state $= \\epsilon\\text{-closure}(q_0)$.
- Accepting states $= \\{S \\subseteq Q \\mid S \\cap F \\ne \\emptyset\\}$.

---

## 2. Table-Filling Algorithm (Myhill-Nerode Minimization)
1. Mark all pairs $(p, q)$ where $p \\in F$ and $q \\notin F$ (distinct by $\\epsilon$).
2. For unmarked pairs $(p, q)$, if for some input $a$, the pair $(\\delta(p, a), \\delta(q, a))$ is already marked, mark $(p, q)$.
3. Repeat until no more pairs can be marked. Unmarked pairs are equivalent and merged.
""",
        "questions": [
            {
                "id": "toc-nd-1",
                "question": "If an NFA has 4 states, what is the theoretical MAXIMUM number of states in its equivalent DFA before minimization?",
                "options": ["4", "8", "16", "32"],
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
        "companyTags": ["Google", "Microsoft", "Amazon", "IBM"],
        "keyTakeaways": [
            "Regular languages are closed under: Union, Intersection, Complement, Concatenation, Kleene star, Reversal, Difference, Homomorphism.",
            "Pumping Lemma: If L is regular, exists pumping length p such that any string |s| >= p can be split into s = xyz where |xy| <= p, |y| >= 1, and xy^i z in L for all i >= 0.",
            "Pumping Lemma is used to prove a language is NOT regular (by contradiction); cannot prove a language IS regular.",
            "Classic non-regular languages: {0^n 1^n | n >= 0}, {w w^R}, {0^(p) | p is prime}."
        ],
        "youtube_url": get_yt_url("Pumping Lemma for Regular Languages Proof Non Regular"),
        "notesMarkdown": """# Regular Languages and Pumping Lemma

---

## 1. Closure Properties of Regular Languages
Regular languages are closed under:
- **Union:** $L_1 \\cup L_2$
- **Intersection:** $L_1 \\cap L_2$
- **Complement:** $\\overline{L} = \\Sigma^* \\setminus L$
- **Concatenation:** $L_1 L_2$
- **Kleene Closure:** $L^*$
- **Reversal:** $L^R$
- **Set Difference:** $L_1 \\setminus L_2 = L_1 \\cap \\overline{L_2}$

---

## 2. Pumping Lemma for Regular Languages
If $L$ is regular, there exists an integer $p \\ge 1$ (pumping length) such that any $s \\in L$ with $|s| \\ge p$ can be written as:
$$s = x y z$$
satisfying:
1. $|x y| \\le p$
2. $|y| \\ge 1$ ($y \\ne \\epsilon$)
3. $\\forall i \\ge 0, \\; x y^i z \\in L$
""",
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
        "companyTags": ["Amazon", "Google", "Microsoft", "Oracle"],
        "keyTakeaways": [
            "CFG is a 4-tuple G = (V, Sigma, R, S) where productions are of form A -> alpha with A in V.",
            "Leftmost derivation: Always expands the leftmost non-terminal first; Rightmost derivation expands rightmost non-terminal.",
            "A grammar is Ambiguous if some string has two distinct parse trees (or two distinct leftmost derivations).",
            "Inherently Ambiguous Language: A CFL for which EVERY valid grammar is ambiguous (e.g. {a^n b^n c^m} U {a^n b^m c^m})."
        ],
        "youtube_url": get_yt_url("Context Free Grammars CFG Ambiguity Derivations Parse Tree"),
        "notesMarkdown": """# Context-Free Grammars (CFG)

Context-Free Grammars generate Context-Free Languages (Type 2 in Chomsky hierarchy).

---

## 1. Formal 4-Tuple
$$G = (V, \\Sigma, R, S)$$
- $V$: Non-terminal variables
- $\\Sigma$: Terminal alphabet ($V \\cap \\Sigma = \\emptyset$)
- $R$: Production rules of the form $A \\to \\alpha$, where $A \\in V, \\alpha \\in (V \\cup \\Sigma)^*$
- $S \\in V$: Start symbol

---

## 2. Ambiguity
A CFG is **ambiguous** if there exists at least one string $w \\in L(G)$ that possesses:
- More than one distinct Parse Tree, OR
- More than one distinct Leftmost Derivation (LMD).

> **Note:** Deciding whether an arbitrary CFG is ambiguous is **undecidable**!
""",
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
                "options": ["Decidable in polynomial time", "Decidable in exponential time", "Undecidable", "Trivially decidable"],
                "correct_option": 2,
                "explanation": "Determining ambiguity for an arbitrary CFG is proven to be mathematically undecidable."
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
        "companyTags": ["Google", "Microsoft", "Oracle", "IBM"],
        "keyTakeaways": [
            "Parse tree root is start symbol S; internal nodes are non-terminals V; leaves are terminals Sigma or epsilon.",
            "Yield of parse tree is concatenation of leaves from left to right.",
            "Chomsky Normal Form (CNF): All rules are A -> BC or A -> a. Derivation of string of length n takes exactly 2n - 1 steps.",
            "Greibach Normal Form (GNF): All rules are A -> a alpha (terminal followed by non-terminals)."
        ],
        "youtube_url": get_yt_url("Parse Trees Chomsky Normal Form CNF Greibach GNF CYK"),
        "notesMarkdown": """# Parse Trees and Derivations

---

## 1. Normal Forms for CFGs
1. **Chomsky Normal Form (CNF):**
   All productions are of the form:
   $$A \\to B C \\quad \\text{or} \\quad A \\to a$$
   - Any derivation of a string $w$ of length $n = |w|$ in a CNF grammar requires **exactly $2n - 1$ steps**.
2. **Greibach Normal Form (GNF):**
   All productions are of the form:
   $$A \\to a \\alpha \\quad (a \\in \\Sigma, \\alpha \\in V^*)$$
""",
        "questions": [
            {
                "id": "toc-pt-1",
                "question": "In Chomsky Normal Form (CNF), how many derivation steps are required to generate a string of length n (n >= 1)?",
                "options": ["n", "2n - 1", "n^2", "2^n"],
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
        "companyTags": ["Google", "Amazon", "Microsoft", "Apple"],
        "keyTakeaways": [
            "PDA = Finite Automaton + 1 LIFO Stack (unbounded memory storage).",
            "7-tuple: M = (Q, Sigma, Gamma, delta, q0, z0, F), where Gamma is stack alphabet.",
            "Acceptance modes: By Final State or By Empty Stack (proven computationally equivalent).",
            "NPDA is strictly MORE powerful than DPDA! (e.g. Even palindromes {w w^R} accepted by NPDA but NOT by any DPDA)."
        ],
        "youtube_url": get_yt_url("Pushdown Automata PDA DPDA NPDA Stack Acceptance TOC"),
        "notesMarkdown": """# Pushdown Automata (PDA)

A Pushdown Automaton extends a finite automaton with an external infinite-capacity **LIFO stack**.

---

## 1. Formal 7-Tuple Definition
$$M = (Q, \\Sigma, \\Gamma, \\delta, q_0, z_0, F)$$
- $\\Gamma$: Stack alphabet
- $z_0 \\in \\Gamma$: Initial stack symbol
- **Transition Function:** $\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\times \\Gamma \\to \\mathcal{P}(Q \\times \\Gamma^*)$

---

## 2. Deterministic (DPDA) vs Nondeterministic (NPDA)
- **Unlike finite automata, NPDA $\\ne$ DPDA!**
- **DCPDA (Deterministic CFLs):** Accepted by DPDA (subset of CFLs; includes all programming language grammars used by LR parsers).
- **CFLs:** Accepted by NPDA.
- Example: $L = \\{w w^R \\mid w \\in \\{0, 1\\}^*\\}$ is accepted by an NPDA, but **cannot** be accepted by any DPDA because the midpoint cannot be detected without non-determinism.
""",
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
        "companyTags": ["Google", "Microsoft", "Amazon", "IBM"],
        "keyTakeaways": [
            "CFLs are closed under: Union, Concatenation, Kleene star, and Intersection with Regular Languages.",
            "CFLs are NOT closed under: Intersection and Complementation!",
            "Pumping Lemma for CFLs: String s = uvxyz with |vxy| <= p, |vy| >= 1, such that u v^i x y^i z in L for all i >= 0.",
            "Classic non-CFL: {a^n b^n c^n | n >= 0} and {a^n b^n c^n d^n}."
        ],
        "youtube_url": get_yt_url("Pumping Lemma for Context Free Languages CFL Closure Properties"),
        "notesMarkdown": """# Context-Free Languages and Pumping Lemma

---

## 1. Closure Properties of CFLs
- **CLOSED under:** Union ($L_1 \\cup L_2$), Concatenation ($L_1 L_2$), Kleene Star ($L^*$), and **Intersection with a Regular Language** ($L_{\\text{CFL}} \\cap L_{\\text{Reg}} \\in \\text{CFL}$).
- **NOT CLOSED under:**
  - **Intersection:** $L_1 \\cap L_2$ (e.g. $\\{a^n b^n c^m\\} \\cap \\{a^m b^n c^n\\} = \\{a^n b^n c^n\\} \\notin \\text{CFL}$).
  - **Complementation:** $\\overline{L}$.

---

## 2. Pumping Lemma for CFLs
If $L$ is a CFL, there exists pumping length $p$ such that any $s \\in L$ with $|s| \\ge p$ can be written as $s = u v x y z$ where:
1. $|v x y| \\le p$
2. $|v y| \\ge 1$ ($v$ and $y$ not both empty)
3. $\\forall i \\ge 0, \\; u v^i x y^i z \\in L$
""",
        "questions": [
            {
                "id": "toc-cfl-1",
                "question": "Which of the following operations is NOT closed for Context-Free Languages?",
                "options": ["Union", "Concatenation", "Intersection", "Kleene Star"],
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
        "companyTags": ["Google", "Microsoft", "Amazon", "IBM Research"],
        "keyTakeaways": [
            "Turing Machine: 7-tuple (Q, Sigma, Gamma, delta, q0, B, F) with infinite memory tape.",
            "Transition function: delta: Q x Gamma -> Q x Gamma x {L, R}.",
            "Church-Turing Thesis: Any algorithm or effective computation can be simulated by a Turing Machine.",
            "Multi-tape TMs, non-deterministic TMs, and multi-track TMs are all equivalent in computational power to single-tape deterministic TMs."
        ],
        "youtube_url": get_yt_url("Turing Machines Church Turing Thesis Multi Tape TOC"),
        "notesMarkdown": """# Turing Machines

A Turing Machine (TM) is the mathematical foundation of modern digital computing.

---

## 1. Formal 7-Tuple Definition
$$M = (Q, \\Sigma, \\Gamma, \\delta, q_0, B, F)$$
- $\\Gamma$: Tape alphabet (includes blank symbol $B$, $\\Sigma \\subset \\Gamma$)
- **Transition Function:**
  $$\\delta: Q \\times \\Gamma \\to Q \\times \\Gamma \\times \\{L, R\\}$$
  Given current state and scanned tape symbol, TM writes a new symbol, moves head left ($L$) or right ($R$), and enters a new state.

---

## 2. Church-Turing Thesis
Any algorithm that can be computed by any physical computer or programming language can be computed by a Turing Machine.
""",
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
        "companyTags": ["Google", "Microsoft", "Amazon", "IBM Research"],
        "keyTakeaways": [
            "Decidable language: A Turing Machine halts and decides (yes or no) on ALL inputs.",
            "Undecidable: No Turing Machine can guarantee halting on all inputs with correct answer.",
            "Halting Problem (H_TM): Proved undecidable by Alan Turing using Cantor's diagonalization argument.",
            "Rice's Theorem: ANY non-trivial semantic property of the language recognized by a Turing machine is undecidable."
        ],
        "youtube_url": get_yt_url("Decidability Undecidability Halting Problem Rices Theorem PCP"),
        "notesMarkdown": """# Decidability and Undecidability

---

## 1. The Halting Problem ($A_{\\text{TM}}$)
$$A_{\\text{TM}} = \\{ \\langle M, w \\rangle \\mid M \\text{ is a TM that accepts } w \\}$$
- **Alan Turing's Proof (1936):** $A_{\\text{TM}}$ is **Undecidable**. If a hypothetical decider $H$ exists, we can construct machine $D$ that contradicts $H(D, \\langle D \\rangle)$.

---

## 2. Rice's Theorem
Let $P$ be a property of the languages recognized by Turing machines. If:
1. $P$ is **non-trivial** (some TMs have it, some do not), and
2. $P$ is a **semantic property** (depends only on the language $L(M)$, not syntactic code),
**Then deciding whether $L(M)$ satisfies $P$ is strictly UNDECIDABLE!**

Examples of Undecidable Properties by Rice's Theorem:
- Is $L(M)$ empty?
- Is $L(M)$ finite?
- Is $L(M)$ regular?
""",
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
        "companyTags": ["Google", "Microsoft", "IBM", "Intel"],
        "keyTakeaways": [
            "Recursive (REC): Turing machine halts on all inputs (accepts if in L, rejects if not).",
            "Recursively Enumerable (RE): Turing machine halts and accepts if w in L; may loop forever if w not in L.",
            "Theorem: Language L is Recursive iff both L AND its complement L' are Recursively Enumerable.",
            "Chomsky Hierarchy: Regular (Type 3) subset of CFL (Type 2) subset of CSL (Type 1) subset of Recursive subset of RE (Type 0)."
        ],
        "youtube_url": get_yt_url("Recursive Recursively Enumerable Languages Chomsky Hierarchy"),
        "notesMarkdown": """# Recursive and Recursively Enumerable Languages

---

## 1. Classification
1. **Recursive (Decidable):** A Turing Machine exists that halts on **every** input and produces an accept/reject decision.
2. **Recursively Enumerable (Turing-Recognizable):** A Turing Machine exists that halts and accepts if $w \\in L$, but may **loop forever** if $w \\notin L$.

---

## 2. Duality Theorem
A language $L$ is **Recursive** if and only if **both $L$ and its complement $\\overline{L}$ are Recursively Enumerable**.
- If $L \\in RE$ and $\\overline{L} \\in RE$, run TMs for $L$ and $\\overline{L}$ in parallel (dovetailing). One will halt, guaranteeing decision.

---

## 3. Chomsky Hierarchy Summary
$$\\text{Regular (Type 3)} \\subset \\text{DCFL} \\subset \\text{CFL (Type 2)} \\subset \\text{CSL (Type 1)} \\subset \\text{Recursive} \\subset \\text{RE (Type 0)}$$
""",
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
        "companyTags": ["Google", "Microsoft", "Amazon", "IBM Research"],
        "keyTakeaways": [
            "P = TIME(n^k) on Deterministic Turing Machine.",
            "NP = TIME(n^k) on Nondeterministic Turing Machine (polynomial-time certificate verification).",
            "PSPACE: Problems solvable using polynomial amount of space memory (P subset of NP subset of PSPACE).",
            "Savitch's Theorem: NSPACE(f(n)) subset of DSPACE(f(n)^2) -> PSPACE = NPSPACE."
        ],
        "youtube_url": get_yt_url("Complexity Classes P NP NP Complete PSPACE Savitch Theorem"),
        "notesMarkdown": """# Time and Space Complexity Classes: P, NP, NP-Complete

---

## 1. Complexity Containment Hierarchy
$$P \\subseteq NP \\subseteq PSPACE = NPSPACE \\subseteq EXPTIME$$

---

## 2. Savitch's Theorem
For any function $f(n) \\ge \\log n$:
$$\\text{NSPACE}(f(n)) \\subseteq \\text{DSPACE}((f(n))^2)$$
**Direct Corollary:** $\\text{PSPACE} = \\text{NPSPACE}$! Nondeterminism provides no asymptotic advantage in polynomial space.
""",
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
            }
        ]
    }
]

file_content = f"""import type {{ SectionCategory }} from './types';

export const TOC_CATEGORY: SectionCategory = {{
  id: "toc",
  slug: "theory-of-computation",
  title: "Theory of Computation (TOC)",
  description: "Automata theory, regular expressions, grammars, pushdown automata, Turing machines, and decidability.",
  icon: "GitBranch",
  topics: {json.dumps(topics, indent=2)}
}};
"""

with open('./src/lib/data/curriculum/theory-of-computation.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"Generated TOC module with {len(topics)} topics successfully!")
