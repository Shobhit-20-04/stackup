import type { SectionCategory } from './types';

export const DISCRETE_MATH_CATEGORY: SectionCategory = {
  "id": "discrete-math",
  "slug": "discrete-mathematics",
  "title": "Discrete Mathematics",
  "description": "Propositional logic, set theory, combinatorics, graph theory, group theory, and Boolean algebra.",
  "icon": "BookOpen",
  "topics": [
    {
      "id": "dm-propositional-predicate-logic",
      "slug": "propositional-and-predicate-logic",
      "title": "Propositional and Predicate Logic",
      "description": "Truth tables, logical connectives, tautologies, contradictions, quantifiers (universal and existential), and inference rules.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Microsoft",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "Propositional logic evaluates truth values of declarative statements using AND, OR, NOT, XOR, Implication (->), and Biconditional (<->).",
        "Implication p -> q is logically equivalent to ~p v q (false ONLY when p is true and q is false).",
        "Contrapositive (~q -> ~p) is logically equivalent to p -> q; Converse (q -> p) and Inverse (~p -> ~q) are NOT equivalent.",
        "De Morgan's Laws: ~(p ^ q) = ~p v ~q, ~(p v q) = ~p ^ ~q."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Propositional+Predicate+Logic+Discrete+Mathematics+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Propositional and Predicate Logic\n\n---\n\n## 1. Truth Tables & Implication Equivalence\nConditional Statement $p \\to q$:\n- **Contrapositive:** $\\neg q \\to \\neg p$ (Equivalent to $p \\to q$)\n- **Converse:** $q \\to p$\n- **Inverse:** $\\neg p \\to \\neg q$\n- **Equivalence:** $p \\to q \\equiv \\neg p \\lor q$\n\n---\n\n## 2. Predicate Logic & Quantifiers\n- **Universal Quantifier ($\\forall x$):** True if $P(x)$ holds for ALL domain elements.\n- **Existential Quantifier ($\\exists x$):** True if $P(x)$ holds for AT LEAST ONE domain element.\n- **Negation of Quantifiers:**\n  - $\\neg (\\forall x P(x)) \\equiv \\exists x \\neg P(x)$\n  - $\\neg (\\exists x P(x)) \\equiv \\forall x \\neg P(x)$\n",
      "questions": [
        {
          "id": "dm-log-1",
          "question": "Which of the following is logically equivalent to the conditional statement p -> q?",
          "options": [
            "~p v q",
            "~q -> ~p",
            "~(p ^ ~q)",
            "All of the above"
          ],
          "correct_option": 3,
          "explanation": "p -> q is equivalent to ~p v q, to its contrapositive ~q -> ~p, and to ~(p ^ ~q) (it is false only when p is true and q is false)."
        },
        {
          "id": "dm-log-2",
          "question": "What is the logical negation of the quantified predicate: ∀x (P(x) -> Q(x))?",
          "options": [
            "∃x (P(x) ^ ~Q(x))",
            "∀x (~P(x) v Q(x))",
            "∃x (~P(x) -> ~Q(x))",
            "∀x (~P(x) ^ ~Q(x))"
          ],
          "correct_option": 0,
          "explanation": "Negation: ~[∀x (P(x) -> Q(x))] ≡ ∃x ~[~P(x) v Q(x)] ≡ ∃x (P(x) ^ ~Q(x)) by De Morgan's Law."
        },
        {
          "id": "dm-logic-3",
          "question": "Which of the following propositions is logically equivalent to the implication (P -> Q)?",
          "options": [
            "not P or Q",
            "P and not Q",
            "not Q -> not P is its converse",
            "Q -> P"
          ],
          "correct_option": 0,
          "explanation": "By material implication, P -> Q is logically equivalent to (not P or Q). Its contrapositive (not Q -> not P) is also equivalent, while converse (Q -> P) is not."
        }
      ]
    },
    {
      "id": "dm-sets-relations-functions",
      "slug": "sets-relations-and-functions",
      "title": "Sets, Relations, and Functions",
      "description": "Set algebra, power sets, Cartesian products, binary relations, and function classifications (injective, surjective, bijective).",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "TCS",
        "Accenture"
      ],
      "keyTakeaways": [
        "Power set P(A) of set with n elements has 2^n elements.",
        "Cartesian product A x B has |A| * |B| ordered pairs.",
        "Function f: A -> B is Injective (one-to-one) if f(a1) = f(a2) implies a1 = a2.",
        "Surjective (onto) if range equals codomain; Bijective if both Injective and Surjective."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Sets+Relations+Functions+Injective+Surjective+Bijective+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Sets, Relations, and Functions\n\nSets, relations, and functions constitute the foundational language of discrete mathematics, formal logic, relational databases, and computational complexity theory.\n\n---\n\n## 1. Set Theory & Combinatorics of Subsets\n\nLet $A$ and $B$ be finite sets with $|A| = m$ and $|B| = n$:\n\n| Set Operation | Formal Definition | Cardinality / Formula |\n| :--- | :--- | :--- |\n| **Power Set $\\mathcal{P}(A)$** | Set of all subsets of $A$: $\\{S \\mid S \\subseteq A\\}$ | $|\\mathcal{P}(A)| = 2^m$ |\n| **Cartesian Product $A \\times B$** | Set of ordered pairs: $\\{(a, b) \\mid a \\in A, b \\in B\\}$ | $|A \\times B| = m \\times n$ |\n| **Binary Relations on $A$** | Any subset $R \\subseteq A \\times A$ | Total relations $= 2^{m^2}$ |\n| **Relations from $A$ to $B$** | Any subset $R \\subseteq A \\times B$ | Total relations $= 2^{m \\times n}$ |\n| **Inclusion-Exclusion Principle** | $|A \\cup B| = |A| + |B| - |A \\cap B|$ | Generalized: $|A \\cup B \\cup C| = \\sum |A| - \\sum |A \\cap B| + |A \\cap B \\cap C|$ |\n\n---\n\n## 2. Properties of Binary Relations on a Set $A$\n\nFor a relation $R \\subseteq A \\times A$ where $|A| = n$:\n\n1. **Reflexive:** $\\forall a \\in A, (a, a) \\in R$. Total reflexive relations $= 2^{n(n-1)}$.\n2. **Irreflexive:** $\\forall a \\in A, (a, a) \\notin R$. Total irreflexive relations $= 2^{n(n-1)}$.\n3. **Symmetric:** $\\forall a, b \\in A, (a, b) \\in R \\implies (b, a) \\in R$. Total symmetric relations $= 2^{\\frac{n(n+1)}{2}}$.\n4. **Antisymmetric:** $\\forall a, b \\in A, ((a, b) \\in R \\land (b, a) \\in R) \\implies a = b$. Total antisymmetric relations $= 2^n \\times 3^{\\frac{n(n-1)}{2}}$.\n5. **Transitive:** $\\forall a, b, c \\in A, ((a, b) \\in R \\land (b, c) \\in R) \\implies (a, c) \\in R$.\n\n---\n\n## 3. Function Classifications & Counting Formulas\n\nA function $f: A \\to B$ maps every element $a \\in A$ to exactly one element $b \\in B$. Let $|A| = m$ (domain) and $|B| = n$ (codomain):\n\n```\n    Injective (1-to-1)         Surjective (Onto)            Bijective (Both)\n       A        B                 A        B                  A        B\n     ( 1 )--->( a )             ( 1 )--->( a )              ( 1 )--->( a )\n     ( 2 )--->( b )             ( 2 )---\\                   ( 2 )--->( b )\n              ( c )             ( 3 )--->( b )              ( 3 )--->( c )\n  [Every a -> distinct b]     [Every b has preimage]       [Exact 1-to-1 match]\n```\n\n### A. Injective (One-to-One) Functions\n- **Condition:** $f(a_1) = f(a_2) \\implies a_1 = a_2$.\n- **Pigeonhole Principle:** Injections require $m \\le n$. If $m > n$, no injection can exist.\n- **Count:** $P(n, m) = \\frac{n!}{(n - m)!}$ if $m \\le n$; else $0$.\n\n### B. Surjective (Onto) Functions\n- **Condition:** $\\forall b \\in B, \\exists a \\in A$ such that $f(a) = b$ (Range $=$ Codomain).\n- **Prerequisite:** Requires $m \\ge n$. If $m < n$, no surjection can exist.\n- **Count (via Stirling Numbers of the Second Kind):**\n  $$\\text{Surjections} = n! \\times S(m, n) = \\sum_{k=0}^n (-1)^{n-k} \\binom{n}{k} k^m$$\n\n### C. Bijective (One-to-One and Onto) Functions\n- **Condition:** Both injective and surjective.\n- **Prerequisite:** Strictly requires $m = n$.\n- **Count:** $n! = n \\times (n - 1) \\times \\dots \\times 1$.\n- **Inverse:** A function $f$ has an inverse $f^{-1}: B \\to A$ if and only if $f$ is bijective.\n\n---\n\n## 4. Function Composition & Invertibility\n- **Associativity:** $(f \\circ g) \\circ h = f \\circ (g \\circ h)$ holds for all compatible functions.\n- **Non-Commutative:** In general, $f \\circ g \\ne g \\circ f$.\n- If $f: A \\to B$ and $g: B \\to C$ are both bijective, then $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.\n",
      "questions": [
        {
          "id": "dm-srf-1",
          "question": "How many total binary relations can be defined on a set A with 4 elements?",
          "options": [
            "16",
            "256",
            "65,536 (2^16)",
            "4^4"
          ],
          "correct_option": 2,
          "explanation": "A binary relation on A is any subset of A x A. |A x A| = 4 * 4 = 16. Total subsets = 2^16 = 65,536."
        },
        {
          "id": "dm-srf-2",
          "question": "If a function f: A -> B is Bijective, what must be true about the cardinalities of finite sets A and B?",
          "options": [
            "|A| < |B|",
            "|A| > |B|",
            "|A| = |B|",
            "|A| <= |B|"
          ],
          "correct_option": 2,
          "explanation": "A bijection is simultaneously injective (|A| <= |B|) and surjective (|A| >= |B|), which requires strictly that |A| = |B|."
        },
        {
          "id": "dm-set-3",
          "question": "If set A has m elements and set B has n elements, what is the total number of distinct relations from A to B?",
          "options": [
            "2^(m * n)",
            "m * n",
            "m^n",
            "n^m"
          ],
          "correct_option": 0,
          "explanation": "A relation from A to B is any subset of the Cartesian product A x B. Since |A x B| = m * n, the power set has 2^(m * n) subsets, representing 2^(m * n) relations."
        }
      ]
    },
    {
      "id": "dm-equivalence-partial-orders",
      "slug": "equivalence-relations-and-partial-orders",
      "title": "Equivalence Relations and Partial Orders",
      "description": "Reflexive, symmetric, transitive, and anti-symmetric relations, equivalence classes, partitions, POSETs, and Hasse diagrams.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "IBM"
      ],
      "keyTakeaways": [
        "Equivalence Relation: Reflexive, Symmetric, and Transitive (partitions set into disjoint equivalence classes).",
        "Partial Order Relation (POSET): Reflexive, Anti-symmetric, and Transitive.",
        "Strict partial order: Irreflexive and Transitive.",
        "Hasse Diagrams graphically represent partially ordered sets omitting reflexive and transitive edges."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Equivalence+Relations+Partial+Orders+POSET+Hasse+Diagram+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Equivalence Relations and Partial Orders\n\n---\n\n## 1. Axiomatic Properties of Relations\nFor relation $R$ on set $A$:\n- **Reflexive:** $\\forall a \\in A, (a, a) \\in R$.\n- **Symmetric:** $(a, b) \\in R \\implies (b, a) \\in R$.\n- **Anti-symmetric:** $(a, b) \\in R \\land (b, a) \\in R \\implies a = b$.\n- **Transitive:** $(a, b) \\in R \\land (b, c) \\in R \\implies (a, c) \\in R$.\n\n---\n\n## 2. Equivalence vs Partial Order\n- **Equivalence Relation:** Reflexive + Symmetric + Transitive.\n- **Partial Order (POSET):** Reflexive + Anti-symmetric + Transitive.\n- **Total Order (Lattice):** POSET where every pair of elements is comparable.\n",
      "questions": [
        {
          "id": "dm-eq-1",
          "question": "Which three properties must a relation satisfy to be classified as an Equivalence Relation?",
          "options": [
            "Reflexive, Symmetric, Transitive",
            "Reflexive, Anti-symmetric, Transitive",
            "Irreflexive, Symmetric, Transitive",
            "Reflexive, Symmetric, Asymmetric"
          ],
          "correct_option": 0,
          "explanation": "An equivalence relation is defined strictly by Reflexivity, Symmetry, and Transitivity, which partitions the set into equivalence classes."
        },
        {
          "id": "dm-eq-2",
          "question": "Which relation property distinguishes a Partial Order (POSET) from an Equivalence Relation?",
          "options": [
            "Reflexivity",
            "Transitivity",
            "Anti-symmetry instead of Symmetry",
            "Completeness"
          ],
          "correct_option": 2,
          "explanation": "Both equivalence relations and partial orders are reflexive and transitive; the key difference is that partial orders require anti-symmetry, whereas equivalence relations require symmetry."
        },
        {
          "id": "dm-eq-3",
          "question": "In a partially ordered set (POSET), what is a 'Lattice'?",
          "options": [
            "A POSET where every pair of elements has a unique Least Upper Bound (LUB / join) and Greatest Lower Bound (GLB / meet).",
            "A relation that is strictly symmetric and irreflexive.",
            "A total order where all chains have length 1.",
            "A graph containing no cycles."
          ],
          "correct_option": 0,
          "explanation": "A lattice is an algebraic structure and POSET in which any two elements a and b possess a unique join (supremum / least upper bound) and meet (infimum / greatest lower bound)."
        }
      ]
    },
    {
      "id": "dm-mathematical-induction",
      "slug": "mathematical-induction",
      "title": "Mathematical Induction",
      "description": "Weak induction, strong induction, well-ordering principle, base cases, and inductive steps for proofs.",
      "estimatedMinutes": 15,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "Weak induction: Prove P(1) is true (Base Case). Assume P(k) true (Inductive Hypothesis), prove P(k+1) true.",
        "Strong induction: Assume P(1), P(2), ..., P(k) are all true to prove P(k+1).",
        "Both forms are logically equivalent to the Well-Ordering Principle of positive integers.",
        "Crucial for proving correctness of recursive algorithms and asymptotic bounds."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Mathematical+Induction+Proofs+Weak+Strong+Induction+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Mathematical Induction: Principles and Proof Methods\n\nMathematical induction is a foundational proof technique for demonstrating that a statement $P(n)$ is true for all natural numbers $n \\ge n_0$.\n\n---\n\n## 1. Weak Induction (First Principle)\n1. **Base Case:** Prove $P(n_0)$ is true (usually $n_0 = 0$ or $1$).\n2. **Induction Hypothesis:** Assume $P(k)$ is true for an arbitrary integer $k \\ge n_0$.\n3. **Inductive Step:** Prove that $P(k + 1)$ must follow from the truth of $P(k)$.\n4. **Conclusion:** $\\forall n \\ge n_0, P(n)$ is true.\n\n- **Classic Example:**\n  $$1 + 2 + 3 + \\dots + n = \\frac{n(n + 1)}{2}$$\n\n---\n\n## 2. Strong Induction (Second Principle)\n- **Induction Hypothesis:** Assume that $P(n_0), P(n_0 + 1), \\dots, P(k)$ are **all** true.\n- **Inductive Step:** Use this broader premise to prove $P(k + 1)$ is true.\n- **Equivalence:** Weak induction, strong induction, and the **Well-Ordering Principle** (every non-empty set of positive integers has a least element) are logically equivalent.\n- **Application:** Proving the Fundamental Theorem of Arithmetic (every integer $> 1$ factors into primes) and analyzing divide-and-conquer runtimes.\n",
      "questions": [
        {
          "id": "dm-ind-1",
          "question": "In mathematical induction, what is the assumption that P(k) is true for some integer k called?",
          "options": [
            "Base step",
            "Induction hypothesis",
            "Inductive conclusion",
            "Contrapositive assumption"
          ],
          "correct_option": 1,
          "explanation": "Assuming P(k) holds for an arbitrary k in order to prove P(k + 1) is formally called the Induction Hypothesis."
        },
        {
          "id": "dm-ind-2",
          "question": "The Principle of Mathematical Induction is logically equivalent to which fundamental axiom of natural numbers?",
          "options": [
            "Euclid's Parallel Postulate",
            "The Well-Ordering Principle",
            "Fermat's Little Theorem",
            "The Pigeonhole Principle"
          ],
          "correct_option": 1,
          "explanation": "The Well-Ordering Principle (every non-empty set of positive integers has a least element) is logically equivalent to the principle of mathematical induction."
        },
        {
          "id": "dm-ind-3",
          "question": "In Strong Induction (Complete Induction), what is the induction hypothesis when establishing the inductive step for k + 1?",
          "options": [
            "Assume P(i) is true for all integers i from the base case up to k",
            "Assume P(k) is true only for the single preceding integer k",
            "Assume P(k + 1) is true and deduce P(k)",
            "Assume P(1) and P(2) hold for all positive integers"
          ],
          "correct_option": 0,
          "explanation": "In strong mathematical induction, the inductive hypothesis assumes that P(i) holds for all integers i in the range base_case <= i <= k (i.e. P(1) and P(2) and ... and P(k)), which is then used to deduce P(k + 1)."
        }
      ]
    },
    {
      "id": "dm-combinatorics-and-counting",
      "slug": "combinatorics-and-counting",
      "title": "Combinatorics and Counting",
      "description": "Sum rule, product rule, inclusion-exclusion principle, derangements, and generating functions.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Goldman Sachs",
        "Directi"
      ],
      "keyTakeaways": [
        "Sum Rule: For disjoint sets, |A U B| = |A| + |B|.",
        "Product Rule: Sequential independent choices multiply: |A x B| = |A| * |B|.",
        "Inclusion-Exclusion: |A U B| = |A| + |B| - |A n B|.",
        "Derangements (permutations where no element appears in original position): D(n) = n! * sum((-1)^k / k!)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Combinatorics+Inclusion+Exclusion+Principle+Derangements+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Combinatorics and Fundamental Counting Principles\n\nCombinatorics provides formal mathematical rules for counting arrangements, selections, and configurations.\n\n---\n\n## 1. Rule of Sum and Rule of Product\n- **Sum Rule (Disjoint Sets):** If task $A$ can be done in $m$ ways and task $B$ in $n$ ways, and they cannot be done together, then task \"$A$ OR $B$\" can be done in $m + n$ ways.\n- **Product Rule (Independent Stages):** If task $A$ has $m$ outcomes and task $B$ has $n$ outcomes, then sequential procedure \"$A$ AND $B$\" has $m \\times n$ outcomes.\n\n---\n\n## 2. Principle of Inclusion-Exclusion (PIE)\nFor finite sets $A, B, C$:\n- Two sets:\n  $$|A \\cup B| = |A| + |B| - |A \\cap B|$$\n- Three sets:\n  $$|A \\cup B \\cup C| = |A| + |B| + |C| - (|A \\cap B| + |B \\cap C| + |A \\cap C|) + |A \\cap B \\cap C|$$\n\n---\n\n## 3. Derangements\nA derangement ($D_n$ or $!n$) is a permutation of $n$ elements where no element appears in its original position:\n$$D_n = n! \\sum_{k=0}^{n} \\frac{(-1)^k}{k!} \\approx \\left[\\frac{n!}{e}\\right]$$\n- $D_1 = 0, D_2 = 1, D_3 = 2, D_4 = 9, D_5 = 44$.\n",
      "questions": [
        {
          "id": "dm-cnt-1",
          "question": "What is the number of derangements of 4 items (permutations where no item is in its original position)?",
          "options": [
            "6",
            "9",
            "12",
            "24"
          ],
          "correct_option": 1,
          "explanation": "D(4) = 4! * (1/0! - 1/1! + 1/2! - 1/3! + 1/4!) = 24 * (1 - 1 + 1/2 - 1/6 + 1/24) = 24 * (9/24) = 9."
        },
        {
          "id": "dm-cnt-2",
          "question": "How many integers between 1 and 100 inclusive are divisible by either 3 or 5?",
          "options": [
            "47",
            "53",
            "33",
            "20"
          ],
          "correct_option": 0,
          "explanation": "Multiples of 3 = floor(100/3) = 33. Multiples of 5 = floor(100/5) = 20. Multiples of both (15) = floor(100/15) = 6. By Inclusion-Exclusion: 33 + 20 - 6 = 47."
        },
        {
          "id": "dm-comb-3",
          "question": "How many derangements (permutations where no element is in its original position) exist for a set of 4 elements?",
          "options": [
            "9",
            "8",
            "6",
            "12"
          ],
          "correct_option": 0,
          "explanation": "Using the derangement formula D(n) = n! * Sigma (-1)^k / k!: D(4) = 4! * (1/0! - 1/1! + 1/2! - 1/3! + 1/4!) = 24 * (1 - 1 + 1/2 - 1/6 + 1/24) = 24 * (9/24) = 9."
        }
      ]
    },
    {
      "id": "dm-permutations-and-combinations",
      "slug": "permutations-and-combinations",
      "title": "Permutations and Combinations",
      "description": "Arrangements vs selections, Pascal's identity, stars and bars (multisets), and circular permutations.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "TCS Digital",
        "Infosys",
        "Wipro"
      ],
      "keyTakeaways": [
        "Permutations (order matters): P(n, r) = n! / (n - r)!.",
        "Combinations (order does not matter): C(n, r) = n! / (r! * (n - r)!).",
        "Pascal's Identity: C(n, r) = C(n - 1, r - 1) + C(n - 1, r).",
        "Stars and Bars: Distributing n identical items into k distinct bins = C(n + k - 1, k - 1)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Permutations+and+Combinations+Discrete+Mathematics+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Permutations and Combinations\n\nCombinatorial selections and orderings form the bedrock of probability and discrete counting.\n\n---\n\n## 1. Formulations\n- **Permutations ($P(n, r)$):** Order matters (arrangements):\n  $$P(n, r) = \\frac{n!}{(n - r)!}$$\n- **Combinations ($C(n, r)$ or $\\binom{n}{r}$):** Order does NOT matter (selections):\n  $$\\binom{n}{r} = \\frac{n!}{r!(n - r)!}$$\n\n---\n\n## 2. Fundamental Identities\n- **Symmetry:** $\\binom{n}{r} = \\binom{n}{n - r}$\n- **Pascal's Identity:** $\\binom{n}{r} = \\binom{n - 1}{r - 1} + \\binom{n - 1}{r}$\n- **Binomial Theorem:**\n  $$(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n - k} y^k$$\n- **Sum of Binomial Coefficients:** $\\sum_{k=0}^{n} \\binom{n}{k} = 2^n$\n\n---\n\n## 3. Combinations with Repetition (Stars and Bars)\nNumber of ways to distribute $n$ identical items into $r$ distinct bins (non-negative integer solutions to $x_1 + x_2 + \\dots + x_r = n$):\n$$N = \\binom{n + r - 1}{r - 1}$$\n",
      "questions": [
        {
          "id": "dm-pc-1",
          "question": "In how many ways can 5 identical chocolates be distributed among 3 children such that a child can receive 0 or more chocolates?",
          "options": [
            "21",
            "15",
            "10",
            "35"
          ],
          "correct_option": 0,
          "explanation": "Using Stars and Bars for non-negative solutions: C(n + k - 1, k - 1) = C(5 + 3 - 1, 3 - 1) = C(7, 2) = (7 * 6) / 2 = 21."
        },
        {
          "id": "dm-pc-2",
          "question": "In how many distinct ways can 6 people sit around a circular dining table?",
          "options": [
            "720",
            "120",
            "60",
            "24"
          ],
          "correct_option": 1,
          "explanation": "Circular permutations of n distinct items are given by (n - 1)!. For 6 people: (6 - 1)! = 5! = 120."
        },
        {
          "id": "dm-perm-3",
          "question": "What is the number of non-negative integer solutions to the equation x1 + x2 + x3 + x4 = 10?",
          "options": [
            "C(13, 3) = 286",
            "C(10, 4) = 210",
            "C(14, 4) = 1001",
            "C(10, 3) = 120"
          ],
          "correct_option": 0,
          "explanation": "By stars and bars theorem, the number of non-negative solutions to x1 + ... + xr = n is C(n + r - 1, r - 1). Here n = 10, r = 4: C(10 + 4 - 1, 4 - 1) = C(13, 3) = (13 * 12 * 11) / (3 * 2 * 1) = 286."
        }
      ]
    },
    {
      "id": "dm-pigeonhole-principle",
      "slug": "pigeonhole-principle",
      "title": "Pigeonhole Principle",
      "description": "Basic and generalized pigeonhole principle, Dirichlet drawer principle, existence proofs, and Ramsey theory basics.",
      "estimatedMinutes": 15,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Directi"
      ],
      "keyTakeaways": [
        "Basic Principle: If k + 1 or more items are put into k boxes, at least one box contains >= 2 items.",
        "Generalized Principle: If N items are placed into k boxes, at least one box contains >= ceil(N / k) items.",
        "Used for guaranteed existence proofs without needing to identify the specific item.",
        "Classic applications: Handshakes at parties, birthday paradox bounds, sum subsets."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Pigeonhole+Principle+Discrete+Mathematics+Problems+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# The Pigeonhole Principle (Dirichlet's Box Principle)\n\nIf $k$ items are put into $m$ containers and $k > m$, at least one container must contain more than one item.\n\n---\n\n## 1. Generalized Pigeonhole Principle\nIf $N$ objects are placed into $k$ boxes, then at least one box contains at least:\n$$\\left\\lceil \\frac{N}{k} \\right\\rceil \\text{ objects}$$\nAnd at least one box contains at most:\n$$\\left\\lfloor \\frac{N}{k} \\right\\rfloor \\text{ objects}$$\n\n---\n\n## 2. Classic Problem Archetypes\n- **Handshakes in a Party:** In any gathering of $n \\ge 2$ people, at least two people have shaken hands with the exact same number of people.\n- **Repeated Subsets / Sums:** Among any 6 integers chosen from $\\{1, 2, \\dots, 9\\}$, at least two must sum to 10.\n- **Ramsey Theory Basics:** In any group of 6 people, there are either 3 mutual friends or 3 mutual strangers ($R(3, 3) = 6$).\n",
      "questions": [
        {
          "id": "dm-php-1",
          "question": "What is the minimum number of students needed in a classroom to guarantee that at least 5 students were born in the same month?",
          "options": [
            "49",
            "48",
            "60",
            "50"
          ],
          "correct_option": 0,
          "explanation": "To guarantee ceil(N / 12) >= 5, we need (N - 1) / 12 >= 4 -> N - 1 >= 48 -> N = 49 students."
        },
        {
          "id": "dm-php-2",
          "question": "In any gathering of N people (N >= 2), why must at least two people have the exact same number of friends in the room?",
          "options": [
            "By the Handshaking Lemma",
            "By the Pigeonhole Principle: possible friendship counts range from 0 to N-1, but 0 and N-1 cannot coexist, leaving at most N-1 distinct values for N people",
            "Because friendship is transitive",
            "Because graphs cannot have odd degree vertices"
          ],
          "correct_option": 1,
          "explanation": "If someone has 0 friends, no one can have N - 1 friends (friends with everyone). Thus, the possible friendship counts are either {0, ..., N-2} or {1, ..., N-1}, giving N - 1 pigeonholes for N people. By PHP, at least two must have the same count."
        },
        {
          "id": "dm-php-3",
          "question": "What is the minimum number of cards that must be drawn from a standard 52-card deck to guarantee drawing at least 3 cards of the same suit?",
          "options": [
            "9 cards",
            "12 cards",
            "11 cards",
            "13 cards"
          ],
          "correct_option": 0,
          "explanation": "There are 4 suits (pigeonholes). By generalized pigeonhole principle, we want ceil(N / 4) = 3. Worst-case distribution is 2 cards of each of the 4 suits = 8 cards. The 9th card guarantees a suit with 3 cards: ceil(9/4) = 3."
        }
      ]
    },
    {
      "id": "dm-recurrence-relations",
      "slug": "recurrence-relations",
      "title": "Recurrence Relations",
      "description": "Linear homogeneous and non-homogeneous recurrence relations with constant coefficients, characteristic equation, and roots.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "Linear homogeneous recurrence: a_n = c_1 a_(n-1) + c_2 a_(n-2) + ... + c_k a_(n-k).",
        "Characteristic equation: r^k - c_1 r^(k-1) - ... - c_k = 0.",
        "Distinct real roots r_1, r_2 -> general solution a_n = A(r_1)^n + B(r_2)^n.",
        "Repeated root r of multiplicity m -> general solution includes (A_0 + A_1*n + ... + A_(m-1)*n^(m-1)) * r^n."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Recurrence+Relations+Characteristic+Equation+Discrete+Mathematics+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Recurrence Relations and Characteristic Equations\n\nRecurrence relations define sequences where each term is a function of preceding terms.\n\n---\n\n## 1. Linear Homogeneous Recurrence Relations with Constant Coefficients (LHRR)\nGeneral form:\n$$a_n = c_1 a_{n-1} + c_2 a_{n-2} + \\dots + c_k a_{n-k}$$\n- **Characteristic Equation:**\n  $$r^k - c_1 r^{k-1} - c_2 r^{k-2} - \\dots - c_k = 0$$\n\n### Roots & General Solutions:\n1. **Distinct Real Roots ($r_1 \\ne r_2$):**\n   $$a_n = A r_1^n + B r_2^n$$\n2. **Repeated Roots ($r_1 = r_2 = r$):**\n   $$a_n = (A + B n) r^n$$\n3. **Roots with Multiplicity $m$:**\n   $$a_n = (A_0 + A_1 n + \\dots + A_{m-1} n^{m-1}) r^n$$\n\n---\n\n## 2. Generating Functions\nThe ordinary generating function for sequence $\\{a_n\\}$ is $G(x) = \\sum_{n=0}^{\\infty} a_n x^n$.\n- Transforms recurrence relations into algebraic equations solvable via partial fractions.\n",
      "questions": [
        {
          "id": "dm-rec-1",
          "question": "What is the characteristic equation for the Fibonacci recurrence F(n) = F(n - 1) + F(n - 2)?",
          "options": [
            "r^2 - r - 1 = 0",
            "r^2 + r + 1 = 0",
            "r^2 - 2r + 1 = 0",
            "r^2 + r - 1 = 0"
          ],
          "correct_option": 0,
          "explanation": "Substituting F(n) = r^n yields r^n = r^(n-1) + r^(n-2). Dividing by r^(n-2) gives r^2 - r - 1 = 0."
        },
        {
          "id": "dm-rec-2",
          "question": "If the characteristic equation has a single root r = 3 of multiplicity 2, what is the form of the general solution a_n?",
          "options": [
            "C1 * 3^n",
            "(C1 + C2 * n) * 3^n",
            "C1 * 3^n + C2 * 3^(2n)",
            "(C1 + C2 * n^2) * 3^n"
          ],
          "correct_option": 1,
          "explanation": "When a root r has multiplicity 2, the independent solutions are r^n and n * r^n, yielding general solution (C1 + C2 * n) * 3^n."
        },
        {
          "id": "dm-rec-3",
          "question": "What is the closed-form solution to the recurrence relation a_n = 2a_{n-1} with initial condition a_0 = 3?",
          "options": [
            "a_n = 3 * 2^n",
            "a_n = 2 * 3^n",
            "a_n = 3 + 2n",
            "a_n = 2^n + 3"
          ],
          "correct_option": 0,
          "explanation": "This is a first-order linear homogeneous recurrence with common ratio r = 2. Unrolling gives a_1 = 3 * 2, a_2 = 3 * 2^2, ..., a_n = a_0 * 2^n = 3 * 2^n."
        }
      ]
    },
    {
      "id": "dm-graph-theory",
      "slug": "graph-theory",
      "title": "Graph Theory",
      "description": "Handshaking lemma, Euler paths and circuits, Hamiltonian paths, bipartite graphs, and vertex degrees.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Meta"
      ],
      "keyTakeaways": [
        "Handshaking Lemma: sum(deg(v)) = 2 * |E|. The number of odd-degree vertices is always even.",
        "Euler Circuit: Visits every edge exactly once and returns to start (all vertices have even degree).",
        "Euler Path: Visits every edge once (exactly 0 or 2 vertices have odd degree).",
        "Hamiltonian Cycle: Visits every vertex exactly once and returns to start (NP-Complete to decide)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Graph+Theory+Handshaking+Lemma+Euler+Circuit+Hamiltonian+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Graph Theory Fundamentals\n\nA graph $G = (V, E)$ represents binary relations between a set of vertices $V$ and edges $E$.\n\n---\n\n## 1. Handshaking Lemma & Degree Properties\n- **The Handshaking Lemma:** The sum of the degrees of all vertices in any undirected graph equals twice the number of edges:\n  $$\\sum_{v \\in V} \\text{deg}(v) = 2 |E|$$\n- **Corollary:** In every graph, the number of vertices with **odd degree** is always **even**.\n\n---\n\n## 2. Eulerian vs Hamiltonian Graphs\n- **Eulerian Graph:** Contains a closed trail visiting every edge exactly once.\n  - Exists $\\iff$ connected and **every vertex has an even degree**.\n  - Eulerian Path: Connected with **exactly 2 vertices of odd degree** (start and end).\n- **Hamiltonian Graph:** Contains a cycle visiting every vertex exactly once.\n  - **Dirac's Theorem:** If connected and $\\text{deg}(v) \\ge n/2$ for all $v$, $G$ is Hamiltonian.\n\n---\n\n## 3. Planar Graphs & Euler's Formula\nFor any connected planar graph drawn without edge crossings:\n$$V - E + F = 2 \\quad (\\text{where } F \\text{ is number of faces/regions})$$\n- For $V \\ge 3$: $E \\le 3V - 6$.\n- If triangle-free: $E \\le 2V - 4$.\n- **Kuratowski's Theorem:** A graph is planar $\\iff$ it contains no subgraph homeomorphic to $K_5$ or $K_{3,3}$.\n",
      "questions": [
        {
          "id": "dm-gt-1",
          "question": "In any undirected graph, what must always be true about the number of vertices with odd degree?",
          "options": [
            "It must be odd",
            "It must be even",
            "It must be zero",
            "It must equal |E|"
          ],
          "correct_option": 1,
          "explanation": "By the Handshaking Lemma, sum(deg(v)) = 2|E| (an even number). The sum of odd degrees must therefore have an even number of terms so that the total sum remains even."
        },
        {
          "id": "dm-gt-2",
          "question": "A connected undirected graph contains an Euler Circuit if and only if:",
          "options": [
            "All vertices have odd degree",
            "Every vertex has an even degree",
            "Exactly two vertices have odd degree",
            "The graph is bipartite"
          ],
          "correct_option": 1,
          "explanation": "Euler's theorem states that a connected graph has an Euler circuit if and only if every vertex has an even degree."
        },
        {
          "id": "dm-gt-3",
          "question": "In a connected planar graph with V = 10 vertices and F = 7 faces, how many edges E does the graph contain?",
          "options": [
            "15 edges",
            "16 edges",
            "14 edges",
            "17 edges"
          ],
          "correct_option": 0,
          "explanation": "By Euler's planar formula: V - E + F = 2 => 10 - E + 7 = 2 => 17 - E = 2 => E = 15 edges."
        }
      ]
    },
    {
      "id": "dm-trees-and-connectivity",
      "slug": "trees-and-connectivity",
      "title": "Trees and Connectivity",
      "description": "Characterization of trees, cut vertices, bridges, vertex and edge connectivity, and Cayley's formula.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Cisco"
      ],
      "keyTakeaways": [
        "A tree is an acyclic connected graph; any tree with n vertices has exactly n - 1 edges.",
        "Adding any edge to a tree creates exactly one simple cycle.",
        "Cayley's Formula: The number of labeled trees on n vertices is n^(n - 2).",
        "A bridge is an edge whose removal increases the number of connected components."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Trees+and+Connectivity+Cayleys+Formula+Cut+Vertices+Bridges+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Trees and Graph Connectivity\n\nA tree is an undirected connected acyclic graph.\n\n---\n\n## 1. Equivalent Definitions of a Tree\nFor an undirected graph $T = (V, E)$ with $|V| = n$:\n1. $T$ is connected and acyclic.\n2. $T$ is connected and has exactly $n - 1$ edges ($|E| = n - 1$).\n3. $T$ is acyclic and has exactly $n - 1$ edges.\n4. There is a unique simple path between any pair of vertices in $T$.\n5. Adding any edge to $T$ creates exactly one cycle.\n\n---\n\n## 2. Spanning Trees & Cayley's Formula\n- **Cayley's Formula:** The number of labeled trees on $n$ vertices is:\n  $$n^{n - 2}$$\n- Every connected graph with $n$ vertices and $m$ edges contains at least one spanning tree with $n - 1$ edges; the number of cut edges removed is $m - n + 1$ (the cycle rank).\n",
      "questions": [
        {
          "id": "dm-tc-1",
          "question": "According to Cayley's formula, how many distinct labeled trees can be formed on 4 vertices?",
          "options": [
            "16",
            "24",
            "4",
            "64"
          ],
          "correct_option": 0,
          "explanation": "Cayley's formula gives n^(n - 2). For n = 4: 4^(4 - 2) = 4^2 = 16 distinct labeled trees."
        },
        {
          "id": "dm-tc-2",
          "question": "What happens if any new edge is added between two existing non-adjacent vertices of a tree?",
          "options": [
            "The graph becomes disconnected",
            "Exactly one simple cycle is created",
            "The number of vertices increases by 1",
            "The graph becomes bipartite"
          ],
          "correct_option": 1,
          "explanation": "Because there was already a unique path between any two vertices in a tree, adding an edge between them creates a second path, forming exactly one simple cycle."
        },
        {
          "id": "dm-tree-3",
          "question": "By Cayley's theorem, how many labeled trees can be formed on n = 4 vertices?",
          "options": [
            "16 (4^(4 - 2) = 4^2 = 16)",
            "24",
            "12",
            "64"
          ],
          "correct_option": 0,
          "explanation": "Cayley's formula states that the number of labeled trees on n vertices is n^(n - 2). For n = 4: 4^(4 - 2) = 4^2 = 16 distinct labeled trees."
        }
      ]
    },
    {
      "id": "dm-planar-graphs",
      "slug": "planar-graphs",
      "title": "Planar Graphs",
      "description": "Planar embeddings, Euler's formula (V - E + F = 2), Kuratowski's theorem (K5 and K3,3), and Four Color Theorem.",
      "estimatedMinutes": 16,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "A graph is planar if it can be drawn in the plane without intersecting edges.",
        "Euler's Formula: V - E + F = 2 for any connected planar graph.",
        "For simple connected planar graph with V >= 3: E <= 3V - 6.",
        "Kuratowski's Theorem: A graph is planar iff it contains no subgraph homeomorphic to K5 or K3,3."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Planar+Graphs+Eulers+Formula+Kuratowski+Theorem+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Planar Graphs\n\nA graph is planar if it can be embedded in a 2D plane such that no two edges cross.\n\n---\n\n## 1. Euler's Formula\nFor any connected planar graph with $V$ vertices, $E$ edges, and $F$ faces (regions):\n$$V - E + F = 2$$\n\n---\n\n## 2. Necessary Edge Bounds (for $V \\ge 3$)\n- **General Simple Planar:** $E \\le 3V - 6$\n- **Bipartite Simple Planar (Triangle-free):** $E \\le 2V - 4$\n\n---\n\n## 3. Kuratowski's Theorem\nA graph is planar **if and only if** it does not contain a subgraph homeomorphic to (or contractible to):\n- $K_5$ (Complete graph on 5 vertices)\n- $K_{3,3}$ (Complete bipartite utility graph on 3 + 3 vertices)\n",
      "questions": [
        {
          "id": "dm-pl-1",
          "question": "A connected planar graph has 10 vertices and 15 edges. How many faces (regions) does it divide the plane into?",
          "options": [
            "5",
            "7",
            "8",
            "6"
          ],
          "correct_option": 1,
          "explanation": "By Euler's formula V - E + F = 2: 10 - 15 + F = 2 -> -5 + F = 2 -> F = 7 faces."
        },
        {
          "id": "dm-pl-2",
          "question": "Which two non-planar graphs form the forbidden minors in Kuratowski's Theorem?",
          "options": [
            "K4 and K3,2",
            "K5 and K3,3",
            "K6 and K4,4",
            "K3 and K2,2"
          ],
          "correct_option": 1,
          "explanation": "Kuratowski's theorem states that a graph is planar iff it does not contain a subgraph homeomorphic to K5 (complete graph of 5 vertices) or K3,3 (complete bipartite graph of 6 vertices)."
        },
        {
          "id": "dm-plan-3",
          "question": "What are the two minimal non-planar graphs characterized by Kuratowski's Theorem?",
          "options": [
            "K_5 (complete graph on 5 vertices) and K_{3,3} (complete bipartite utility graph)",
            "K_4 and K_{2,2}",
            "C_5 and K_3",
            "K_6 and Q_3"
          ],
          "correct_option": 0,
          "explanation": "Kuratowski's theorem states a graph is planar if and only if it does not contain a subgraph homeomorphic to K_5 or K_{3,3}."
        }
      ]
    },
    {
      "id": "dm-group-theory-basics",
      "slug": "group-theory-basics",
      "title": "Group Theory Basics",
      "description": "Algebraic structures: Monoids, Semigroups, Groups, Abelian groups, Lagrange's theorem, and cyclic groups.",
      "estimatedMinutes": 16,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Directi",
        "Cryptography Labs"
      ],
      "keyTakeaways": [
        "Semigroup: Closed and Associative.",
        "Monoid: Semigroup with Identity element.",
        "Group: Monoid where every element has an Inverse.",
        "Abelian (Commutative) Group: Group where binary operation is commutative (a * b = b * a).",
        "Lagrange's Theorem: The order of any subgroup H divides the order of finite group G (|G| / |H| is integer)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Group+Theory+Basics+Monoid+Group+Abelian+Group+Lagranges+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Group Theory Basics\n\nAlgebraic structures $(S, *)$ define properties of sets under binary operations.\n\n---\n\n## 1. Hierarchy of Algebraic Structures\n1. **Algebraic Structure:** Closure ($\\\\forall a, b \\in S, a * b \\in S$).\n2. **Semigroup:** Closure + Associativity ($a * (b * c) = (a * b) * c$).\n3. **Monoid:** Semigroup + Identity element ($e * a = a * e = a$).\n4. **Group:** Monoid + Inverse element ($\\\\forall a \\in S, \\exists a^{-1} \\text{ s.t. } a * a^{-1} = e$).\n5. **Abelian Group:** Group + Commutativity ($a * b = b * a$).\n\n---\n\n## 2. Lagrange's Theorem\nFor any finite group $G$ and subgroup $H$:\n$$\\text{Order of Subgroup } |H| \\text{ divides } |G|$$\n",
      "questions": [
        {
          "id": "dm-grp-1",
          "question": "Which property distinguishes a Group from a Monoid?",
          "options": [
            "Associativity",
            "Closure",
            "Existence of an inverse for every element",
            "Commutativity"
          ],
          "correct_option": 2,
          "explanation": "A monoid already has closure, associativity, and an identity element. Adding the guarantee that every element has an inverse turns the monoid into a Group."
        },
        {
          "id": "dm-grp-2",
          "question": "If a finite group G has order 24, which of the following CANNOT be the order of a subgroup of G by Lagrange's Theorem?",
          "options": [
            "6",
            "8",
            "5",
            "12"
          ],
          "correct_option": 2,
          "explanation": "Lagrange's theorem requires the order of any subgroup to divide the order of the group evenly. 24 is not divisible by 5 (24 / 5 = 4.8), so a subgroup of order 5 cannot exist."
        },
        {
          "id": "dm-grp-3",
          "question": "What four algebraic axioms define a Mathematical Group (G, *)?",
          "options": [
            "Closure, Associativity, Identity, and Inverse",
            "Closure, Commutativity, Identity, and Distributivity",
            "Reflexivity, Symmetry, Transitivity, and Totality",
            "Closure, Associativity, Zero-divisors, and Field unit"
          ],
          "correct_option": 0,
          "explanation": "A set G with binary operation * is a Group if it satisfies: 1) Closure, 2) Associativity, 3) Existence of Identity element e, and 4) Existence of Inverse a^(-1) for all elements."
        }
      ]
    },
    {
      "id": "dm-boolean-algebra",
      "slug": "boolean-algebra",
      "title": "Boolean Algebra",
      "description": "Lattices, complemented distributive lattices, Boolean identities, dual expressions, and minimization.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "A Boolean algebra is a complemented, distributive lattice.",
        "Duality Principle: Any Boolean identity remains valid if AND and OR are swapped and 0 and 1 are swapped.",
        "Idempotent Laws: x + x = x, x * x = x.",
        "Absorption Laws: x + x*y = x, x * (x + y) = x."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Boolean+Algebra+Discrete+Mathematics+Lattices+Duality+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Boolean Algebra\n\nBoolean algebra is an algebraic structure $(B, +, \\cdot, ', 0, 1)$ that formalizes logic gates and set intersections.\n\n---\n\n## 1. Boolean Identities\n- **Idempotent:** $x + x = x$, $x \\cdot x = x$\n- **Identity:** $x + 0 = x$, $x \\cdot 1 = x$\n- **Dominance:** $x + 1 = 1$, $x \\cdot 0 = 0$\n- **Complement:** $x + x' = 1$, $x \\cdot x' = 0$\n- **Absorption:** $x + xy = x$, $x(x + y) = x$\n- **De Morgan:** $(x + y)' = x'y'$, $(xy)' = x' + y'$\n\n---\n\n## 2. Principle of Duality\nAny algebraic identity derived from the postulates remains true if $+$ and $\\cdot$ are interchanged, and $0$ and $1$ are interchanged.\n",
      "questions": [
        {
          "id": "dm-ba-1",
          "question": "What is the dual of the Boolean expression: A + B * C = (A + B) * (A + C)?",
          "options": [
            "A * (B + C) = A * B + A * C",
            "A' + B' * C' = (A' + B') * (A' + C')",
            "A * B + C = A + B * C",
            "A + B + C = A * B * C"
          ],
          "correct_option": 0,
          "explanation": "To obtain the dual expression, swap + with * and * with + throughout: A + B * C becomes A * (B + C), and (A + B) * (A + C) becomes (A * B) + (A * C)."
        },
        {
          "id": "dm-ba-2",
          "question": "What does the Boolean expression A + A'B simplify to using Boolean absorption laws?",
          "options": [
            "A",
            "B",
            "A + B",
            "A'B"
          ],
          "correct_option": 2,
          "explanation": "A + A'B = (A + A')(A + B) by distributivity. Since A + A' = 1, this simplifies to 1 * (A + B) = A + B."
        },
        {
          "id": "dm-bool-3",
          "question": "In Boolean algebra, what is the dual of the identity A + (B * C) = (A + B) * (A + C)?",
          "options": [
            "A * (B + C) = (A * B) + (A * C)",
            "A + B = B + A",
            "A * A' = 0",
            "(A + B)' = A' * B'"
          ],
          "correct_option": 0,
          "explanation": "The duality principle replaces every OR (+) with AND (*), and every AND (*) with OR (+), giving A * (B + C) = (A * B) + (A * C)."
        }
      ]
    }
  ]
};
