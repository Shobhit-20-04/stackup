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
      "notesMarkdown": "# Propositional & First-Order Predicate Logic\n\nMathematical logic provides the formal framework for automated theorem proving, program verification, circuit synthesis, and algorithmic reasoning.\n\n---\n\n## 1. Propositional Connectives & Material Implication\n\nA proposition is a declarative statement that is unambiguously either True ($T / 1$) or False ($F / 0$).\n\n| Operator | Notation | Definition / Truth Invariant |\n| :--- | :---: | :--- |\n| **Negation (NOT)** | $\\neg p$ | Flips truth value |\n| **Conjunction (AND)** | $p \\land q$ | True iff *both* $p$ and $q$ are True |\n| **Disjunction (OR)** | $p \\lor q$ | False iff *both* $p$ and $q$ are False |\n| **Exclusive OR (XOR)** | $p \\oplus q$ | True iff exactly one of $p$ or $q$ is True |\n| **Material Implication** | $p \\to q$ | $\\neg p \\lor q$ (False **only** when $p = T$ and $q = F$) |\n| **Biconditional (XNOR)** | $p \\leftrightarrow q$ | $(p \\to q) \\land (q \\to p)$ (True iff $p$ and $q$ have matching truth values) |\n\n### The 4 Implication Variations:\n1. **Original Implication:** $p \\to q$\n2. **Contrapositive:** $\\neg q \\to \\neg p$ $\\iff$ **Logically equivalent to $p \\to q$**\n3. **Converse:** $q \\to p$ (NOT equivalent to $p \\to q$)\n4. **Inverse:** $\\neg p \\to \\neg q$ (NOT equivalent to $p \\to q$, but equivalent to converse)\n\n---\n\n## 2. Predicate Logic & First-Order Quantifiers\n\nPredicates $P(x)$ assert properties over variable arguments drawn from a specified domain of discourse:\n\n1. **Universal Quantifier ($\\forall x$ - \"For all\"):**\n   - $\\forall x P(x)$ is True iff $P(x)$ holds for **every** element in the domain.\n   - Disproven by exhibiting a single counterexample ($c$ where $\\neg P(c)$).\n2. **Existential Quantifier ($\\exists x$ - \"There exists\"):**\n   - $\\exists x P(x)$ is True iff $P(x)$ holds for **at least one** element in the domain.\n3. **Duality & Generalized De Morgan's Laws:**\n   $$\\neg (\\forall x P(x)) \\equiv \\exists x \\neg P(x)$$\n   $$\\neg (\\exists x P(x)) \\equiv \\forall x \\neg P(x)$$\n4. **Quantifier Order Sensitivity:**\n   - $\\forall x \\exists y P(x, y)$ vs. $\\exists y \\forall x P(x, y)$:\n   - $\\exists y \\forall x P(x, y) \\implies \\forall x \\exists y P(x, y)$ (True), but the converse is **FALSE** in general! (e.g. \"Everyone has a mother\" $\\ne$ \"There is a single mother of everyone\").\n\n---\n\n## 3. Normal Forms & Automated Inference\n\n1. **Conjunctive Normal Form (CNF):** Product of sums (AND of ORs, e.g. $(A \\lor \\neg B) \\land (C \\lor D)$). Essential for SAT solvers (Cook-Levin Theorem).\n2. **Disjunctive Normal Form (DNF):** Sum of products (OR of ANDs, e.g. $(A \\land B) \\lor (\\neg A \\land C)$).\n3. **Rules of Inference:**\n   - **Modus Ponens:** $p, \\; p \\to q \\vdash q$\n   - **Modus Tollens:** $\\neg q, \\; p \\to q \\vdash \\neg p$\n   - **Hypothetical Syllogism:** $p \\to q, \\; q \\to r \\vdash p \\to r$\n   - **Resolution Principle:** $(p \\lor q), \\; (\\neg p \\lor r) \\vdash (q \\lor r)$\n",
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
      ],
      "prerequisites": [
        "Basic Propositional Truth Tables",
        "Elementary Symbolic Logic"
      ],
      "externalResources": [
        {
          "title": "Propositional and First-Order Logic — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/propositional-logic/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Mathematics for Computer Science (6.042J) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "difficulty": "Intermediate",
          "isFree": true
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
      ],
      "prerequisites": [
        "Set Notation and Venn Diagrams",
        "Cartesian Products"
      ],
      "externalResources": [
        {
          "title": "Set Theory, Relations, and Injective/Surjective Functions — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/set-theory/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Discrete Mathematics Proofs and Sets — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Equivalence Relations, Partitions & Partial Orders (POSETs)\n\nBinary relations structure sets by defining pairwise associations between elements. Two special classes of relations—**Equivalence Relations** and **Partial Orders**—form the backbone of set partitioning, order theory, database normalization, and type systems.\n\n---\n\n## 1. Axiomatic Properties of Binary Relations\n\nLet $R$ be a binary relation on a non-empty set $A$ ($R \\subseteq A \\times A$):\n\n| Property | Formal Definition | Graphical / Matrix Meaning |\n| :--- | :--- | :--- |\n| **Reflexive** | $\\forall a \\in A, \\; (a, a) \\in R$ | Every node has a self-loop; main diagonal of relation matrix contains all 1s. |\n| **Irreflexive** | $\\forall a \\in A, \\; (a, a) \\notin R$ | No node has a self-loop; main diagonal of relation matrix contains all 0s. |\n| **Symmetric** | $\\forall a, b \\in A, \\; (a, b) \\in R \\implies (b, a) \\in R$ | Every directed edge has an opposing reverse edge; matrix is symmetric ($M = M^T$). |\n| **Anti-symmetric** | $\\forall a, b \\in A, \\; ((a, b) \\in R \\land (b, a) \\in R) \\implies a = b$ | No two distinct elements have two-way edges between them. |\n| **Asymmetric** | $\\forall a, b \\in A, \\; (a, b) \\in R \\implies (b, a) \\notin R$ | Irreflexive + Anti-symmetric (strictly unidirectional edges). |\n| **Transitive** | $\\forall a, b, c \\in A, \\; ((a, b) \\in R \\land (b, c) \\in R) \\implies (a, c) \\in R$ | If a path exists from $a$ to $c$ through $b$, a direct shortcut edge $(a, c)$ exists. |\n\n---\n\n## 2. Equivalence Relations & Set Partitions\n\nAn **Equivalence Relation** is a relation that is simultaneously **Reflexive, Symmetric, and Transitive**.\n\n### Equivalence Classes\nFor an equivalence relation $R$ on set $A$, the equivalence class of an element $a \\in A$, denoted $[a]$ or $a/R$, is the set of all elements related to $a$:\n$$[a] = \\{x \\in A \\mid (a, x) \\in R\\}$$\n\n### Fundamental Theorem of Equivalence Relations\n1. For any $a, b \\in A$, either $[a] = [b]$ or $[a] \\cap [b] = \\emptyset$.\n2. The union of all equivalence classes equals the entire set $A$: $\\bigcup_{a \\in A} [a] = A$.\n3. Therefore, an equivalence relation **partitions** set $A$ into mutually disjoint, non-empty subsets.\n4. Conversely, any partition of set $A$ uniquely defines an equivalence relation on $A$.\n\n> **Classic Example:** Congruence modulo $m$ on integers $\\mathbb{Z}$: $a \\equiv b \\pmod m \\iff m \\mid (a - b)$ partitions $\\mathbb{Z}$ into $m$ equivalence classes: $\\{[0], [1], \\dots, [m - 1]\\}$.\n\n---\n\n## 3. Partially Ordered Sets (POSETs)\n\nA relation $R$ on set $A$ is a **Partial Order** if it is **Reflexive, Anti-symmetric, and Transitive**. The pair $(A, R)$ is called a **POSET** (often written as $(A, \\le)$).\n\n### Comparability & Chains\n- Two elements $a, b \\in A$ are **comparable** if either $a \\le b$ or $b \\le a$.\n- If every pair of elements in $A$ is comparable, the relation is a **Total Order** (or **Linear Order / Chain**).\n- A subset where no two distinct elements are comparable is an **Antichain**.\n\n### Hasse Diagrams\nA Hasse diagram is a simplified graphical representation of a finite POSET $(A, \\le)$:\n1. Omit all self-loops (reflexivity is implicit).\n2. Omit all transitive shortcut edges (transitivity is implicit).\n3. Draw element $b$ above $a$ if $a < b$, and connect them with an undirected segment only if $b$ covers $a$ ($a < b$ with no $c$ such that $a < c < b$).\n\n```\n   Hasse Diagram of Power Set P({1, 2}) under subset inclusion (⊆):\n\n                 {1, 2}        (Greatest Element / Maximum)\n                 /    \\\n              {1}      {2}\n                 \\    /\n                   ∅           (Least Element / Minimum)\n```\n\n---\n\n## 4. Bounds and Extremal Elements in POSETs\n\nLet $(A, \\le)$ be a POSET and $S \\subseteq A$:\n- **Maximal Element:** An element $m \\in A$ such that no $x \\in A$ satisfies $m < x$ (top of a branch; can be multiple).\n- **Minimal Element:** An element $n \\in A$ such that no $x \\in A$ satisfies $x < n$ (bottom of a branch; can be multiple).\n- **Greatest Element (Maximum):** An element $M \\in A$ such that $\\forall x \\in A, \\; x \\le M$ (must be unique if it exists).\n- **Least Element (Minimum):** An element $m \\in A$ such that $\\forall x \\in A, \\; m \\le x$ (must be unique if it exists).\n- **Least Upper Bound (LUB / Supremum / Join $\\vee$):** Smallest element that is $\\ge$ all elements in $S$.\n- **Greatest Lower Bound (GLB / Infimum / Meet $\\wedge$):** Largest element that is $\\le$ all elements in $S$.\n\n---\n\n## 5. Lattices & Algebraic Structures\n\nA POSET $(L, \\le)$ is called a **Lattice** if every pair of elements $a, b \\in L$ has a unique **LUB** ($a \\vee b$) and a unique **GLB** ($a \\wedge b$).\n- **Distributive Lattice:** Satisfies $a \\wedge (b \\vee c) = (a \\wedge b) \\vee (a \\wedge c)$ and dual.\n- **Bounded Lattice:** Contains a universal minimum element $0$ and a universal maximum element $1$.\n- **Complemented Lattice:** A bounded lattice where every element $a$ has a complement $a'$ such that $a \\vee a' = 1$ and $a \\wedge a' = 0$.\n- **Boolean Algebra:** Any lattice that is both **distributive and complemented**.\n",
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
      ],
      "prerequisites": [
        "Relations and Cartesian Products",
        "Reflexive/Symmetric/Transitive Properties"
      ],
      "externalResources": [
        {
          "title": "Equivalence Classes, Partial Orders, and Hasse Diagrams — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/relations-and-their-types/",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Mathematical Induction: Weak Induction, Strong Induction, and the Well-Ordering Principle\n\nMathematical induction is a foundational proof technique used across discrete mathematics, algorithm correctness proofs (loop invariants), and recursive data structure verification.\n\n---\n\n## 1. The Principle of Mathematical Induction (Weak Induction)\n\nTo prove that a predicate statement $P(n)$ is true for all integers $n \\ge n_0$:\n\n```\n               [ 1. BASE STEP ]\n               Prove P(n0) is true (usually n0 = 1 or 0).\n                      |\n                      v\n          [ 2. INDUCTIVE HYPOTHESIS ]\n          Assume P(k) is true for arbitrary integer k >= n0.\n                      |\n                      v\n             [ 3. INDUCTIVE STEP ]\n             Prove that P(k) implies P(k + 1) is true!\n                      |\n                      v\n             CONCLUSION: P(n) is true for all n >= n0!\n             (Domino effect: P(1) falls -> P(2) falls -> P(3)...)\n```\n\n---\n\n## 2. Strong (Complete) Mathematical Induction\n\nIn **Strong Induction**, the inductive hypothesis assumes that the proposition holds true for **all integers from the base case up to $k$**:\n$$\\mathbf{[P(n_0) \\land P(n_0 + 1) \\land \\dots \\land P(k)] \\implies P(k + 1)}$$\n- *When to Use Strong Induction:* When decomposing $k + 1$ relies on smaller subproblems other than strictly $k$ (e.g., Fundamental Theorem of Arithmetic: factoring an integer $n = a \\cdot b$ where $1 < a, b < n$).\n- *Equivalence Theorem:* Weak Induction, Strong Induction, and the **Well-Ordering Principle of Integers** (every non-empty set of non-negative integers contains a unique least element) are mathematically equivalent!\n\n---\n\n## 3. Worked Example: Sum of First $n$ Odd Integers\n\n**Proposition:** $P(n): 1 + 3 + 5 + \\dots + (2n - 1) = n^2$ for all $n \\ge 1$.\n1. **Base Step ($n = 1$):** LHS $= 2(1) - 1 = 1$. RHS $= 1^2 = 1$. True!\n2. **Inductive Hypothesis:** Assume $P(k)$ holds for $k \\ge 1$:\n   $$1 + 3 + 5 + \\dots + (2k - 1) = k^2$$\n3. **Inductive Step ($n = k + 1$):**\n   $$\\text{LHS} = [1 + 3 + \\dots + (2k - 1)] + (2(k + 1) - 1) = k^2 + (2k + 1) = (k + 1)^2 = \\text{RHS}$$\n   Since $P(k) \\implies P(k + 1)$ is true, $P(n)$ holds for all $n \\ge 1$.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Weak Induction Step:** $P(k) \\implies P(k + 1)$.\n- **Strong Induction Step:** $\\forall i \\le k, P(i) \\implies P(k + 1)$.\n- **Well-Ordering Principle:** Every non-empty subset of $\\mathbb{N}$ has a least element.\n",
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
      ],
      "prerequisites": [
        "Basic algebra, sequences, and series",
        "Propositional logic and predicates"
      ],
      "externalResources": [
        {
          "title": "MIT 6.042J: Mathematics for Computer Science - Induction",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Mathematical Induction in Discrete Mathematics",
          "url": "https://www.geeksforgeeks.org/mathematical-induction-in-discrete-mathematics/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Strong Induction and Proof Techniques",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Combinatorics, Rule of Sum/Product, and the Principle of Inclusion-Exclusion\n\nCombinatorics is the branch of discrete mathematics concerning the enumeration, counting, and arrangement of finite discrete sets.\n\n---\n\n## 1. Fundamental Rules of Counting\n\n- **Rule of Sum (Addition Principle):** If task $A$ can be done in $m$ ways and task $B$ in $n$ ways, and they **cannot be done simultaneously** (mutually disjoint):\n  $$\\text{Ways to do } A \\text{ OR } B = m + n$$\n- **Rule of Product (Multiplication Principle):** If task $A$ can be done in $m$ ways and, for each way, task $B$ can be done in $n$ ways:\n  $$\\text{Ways to do } A \\text{ AND } B = m \\times n$$\n\n---\n\n## 2. The Principle of Inclusion-Exclusion (PIE)\n\nWhen counting elements across intersecting sets, adding sizes counts overlapping intersections multiple times.\n\n### For Two Sets:\n$$|A \\cup B| = |A| + |B| - |A \\cap B|$$\n\n### For Three Sets:\n$$|A \\cup B \\cup C| = |A| + |B| + |C| - (|A \\cap B| + |B \\cap C| + |A \\cap C|) + |A \\cap B \\cap C|$$\n\n---\n\n## 3. Derangements ($D_n$ / Subfactorial $!n$)\n\nA **Derangement** is a permutation of $n$ elements such that **no element appears in its original natural position** (e.g., distributing letters into envelopes such that nobody receives their own letter).\n\n$$\\mathbf{D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} = n! \\left( 1 - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + \\dots + \\frac{(-1)^n}{n!} \\right)}$$\n- As $n \\to \\infty$, the fraction of permutations that are derangements approaches:\n$$\\lim_{n \\to \\infty} \\frac{D_n}{n!} = \\frac{1}{e} \\approx 36.787\\%$$\n- Values: $D_1 = 0, \\quad D_2 = 1, \\quad D_3 = 2, \\quad D_4 = 9, \\quad D_5 = 44$.\n- Recurrence: $D_n = (n - 1)(D_{n-1} + D_{n-2})$.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Rule of Sum:** Independent disjoint events $\\implies$ Add.\n- **Rule of Product:** Sequential combined events $\\implies$ Multiply.\n- **Inclusion-Exclusion:** Alternate adding odd-sized intersections and subtracting even-sized intersections.\n- **Derangement Limit:** $\\lim \\frac{D_n}{n!} = \\frac{1}{e}$.\n",
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
      ],
      "prerequisites": [
        "Set theory unions and intersections",
        "Basic algebraic equations"
      ],
      "externalResources": [
        {
          "title": "MIT 6.042J: Counting and Combinatorics",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Combinatorics and Inclusion-Exclusion Principle",
          "url": "https://www.geeksforgeeks.org/principle-of-inclusion-and-exclusion-pie/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Derangements and Counting Interview Problems",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Permutations, Combinations, Stars and Bars, and Binomial Identities\n\nPermutations (where order matters) and Combinations (where order does not matter) form the basis of algorithm complexity calculations and discrete mathematical reasoning.\n\n---\n\n## 1. Permutations ($P$) vs Combinations ($C$)\n\n| Category | Without Repetition | With Repetition Allowed |\n| :--- | :--- | :--- |\n| **Permutation (Order Matters)** | $\\mathbf{P(n, r) = \\frac{n!}{(n - r)!}}$ | $n^r$ |\n| **Combination (Order Does NOT Matter)**| $\\mathbf{C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}}$ | $\\mathbf{\\binom{n + r - 1}{r}}$ (Stars and Bars) |\n\n---\n\n## 2. Stars and Bars Theorem (Combinations with Repetition)\n\nThe number of ways to distribute $r$ identical items among $n$ distinct bins (or non-negative integer solutions to $x_1 + x_2 + \\dots + x_n = r$):\n$$\\mathbf{\\text{Solutions} = \\binom{n + r - 1}{r} = \\binom{n + r - 1}{n - 1}}$$\n\n*Positive Integer Solutions ($x_i \\ge 1$):*\nSubstitute $y_i = x_i - 1 \\implies \\mathbf{\\binom{r - 1}{n - 1}}$.\n\n---\n\n## 3. Core Combinatorial Identities\n\n1. **Symmetry:** $\\binom{n}{r} = \\binom{n}{n - r}$.\n2. **Pascal's Identity:**\n   $$\\mathbf{\\binom{n}{r} = \\binom{n - 1}{r - 1} + \\binom{n - 1}{r}}$$\n3. **Sum of Binomial Coefficients:**\n   $$\\sum_{k=0}^n \\binom{n}{k} = 2^n$$\n4. **Vandermonde's Identity:**\n   $$\\binom{m + n}{r} = \\sum_{k=0}^r \\binom{m}{k} \\binom{n}{r - k}$$\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Order Matters:** Permutations $P(n, r) = \\frac{n!}{(n-r)!}$.\n- **Order Does Not Matter:** Combinations $\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$.\n- **Identical Items into Distinct Bins:** $\\binom{n + r - 1}{r}$.\n- **Pascal's Triangle:** $\\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}$.\n",
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
      ],
      "prerequisites": [
        "Factorials and counting principles",
        "Combinatorics basics"
      ],
      "externalResources": [
        {
          "title": "MIT 6.042J: Permutations, Combinations, and Binomial Theorem",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Permutations and Combinations",
          "url": "https://www.geeksforgeeks.org/permutations-and-combinations/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Stars and Bars Method and Combinatorial Identities",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# The Pigeonhole Principle: Basic, Generalized, and Classical Proofs\n\nThe Pigeonhole Principle (Dirichlet's Drawer Principle) states a seemingly obvious observation that yields profound non-constructive existence proofs in combinatorics, hashing collision theorems, and computational geometry.\n\n---\n\n## 1. Basic vs Generalized Pigeonhole Principle\n\n### Basic Pigeonhole Principle:\nIf $k + 1$ or more pigeons are placed into $k$ pigeonholes, then **at least one pigeonhole must contain two or more pigeons**.\n- *Function Formulation:* If $f: A \\to B$ where $|A| > |B|$, then $f$ **cannot be injective (one-to-one)**!\n\n### Generalized Pigeonhole Principle:\nIf $N$ objects are placed into $k$ boxes, then **at least one box must contain at least**:\n$$\\mathbf{\\left\\lceil \\frac{N}{k} \\right\\rceil \\quad \\text{objects}}$$\n*(And at least one box must contain at most $\\lfloor \\frac{N}{k} \\rfloor$ objects).*\n\n---\n\n## 2. Classical Problems and Proof Patterns\n\n1. **Birthday Matching:**\n   How many people must be gathered in a room to guarantee that at least two share the same birth month?\n   - Pigeons $= N$, Holes $= 12$ months.\n   - We need $\\lceil N / 12 \\rceil \\ge 2 \\implies N = 12 + 1 = \\mathbf{13\\text{ people}}$.\n2. **Sock Drawer Problem:**\n   A drawer contains 10 black socks and 10 white socks. What is the minimum number of socks drawn in the dark to guarantee a matching pair?\n   - Colors (holes) $= 2$.\n   - By PHP, picking $\\mathbf{2 + 1 = 3\\text{ socks}}$ guarantees at least one pair of the same color!\n3. **Hash Table Collisions:**\n   If a hash table has $M$ slots and $M + 1$ keys are inserted, **a collision is 100% mathematically inevitable**!\n\n---\n\n## 3. Summary Cheatsheet & Key Formulas\n\n- **Basic PHP:** $N > k \\implies$ at least one box has $\\ge 2$ items.\n- **Generalized PHP:** At least one box contains $\\ge \\lceil \\frac{N}{k} \\rceil$ items.\n- **Minimum $N$ for $\\ge M$ items in a box:** $N = k(M - 1) + 1$.\n",
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
      ],
      "prerequisites": [
        "Set theory and counting principles",
        "Functions: injective (one-to-one) maps"
      ],
      "externalResources": [
        {
          "title": "MIT 6.042J: The Pigeonhole Principle and Applications",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: The Pigeonhole Principle in Discrete Mathematics",
          "url": "https://www.geeksforgeeks.org/pigeonhole-principle/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Pigeonhole Principle Proofs and Problem Patterns",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Linear Recurrence Relations, Characteristic Equations, and Generating Functions\n\nA recurrence relation expresses the $n$-th term of a sequence as a mathematical function of preceding terms, modeling the runtime complexity of recursive algorithms and combinatorial counting problems.\n\n---\n\n## 1. Linear Homogeneous Recurrence Relations with Constant Coefficients\n\nGeneral form of degree $k$:\n$$a_n = c_1 a_{n-1} + c_2 a_{n-2} + \\dots + c_k a_{n-k}$$\n\n### Characteristic Equation Method:\nSubstitute trial solution $a_n = r^n$:\n$$\\mathbf{r^k - c_1 r^{k-1} - c_2 r^{k-2} - \\dots - c_k = 0}$$\n\n### Solution Cases Based on Roots:\n1. **Distinct Real Roots ($r_1, r_2, \\dots, r_k$):**\n   $$a_n = \\alpha_1 (r_1)^n + \\alpha_2 (r_2)^n + \\dots + \\alpha_k (r_k)^n$$\n2. **Repeated Root ($r$ with multiplicity $m$):**\n   $$a_n = (\\alpha_1 + \\alpha_2 n + \\alpha_3 n^2 + \\dots + \\alpha_m n^{m-1}) r^n$$\n\n---\n\n## 2. Worked Example: Closed-Form Fibonacci Sequence\n\n$$F_n = F_{n-1} + F_{n-2} \\quad \\text{with } F_0 = 0, F_1 = 1$$\n1. Characteristic Equation: $r^2 - r - 1 = 0$.\n2. Roots via quadratic formula:\n   $$r_1 = \\frac{1 + \\sqrt{5}}{2} = \\phi \\quad (\\text{Golden Ratio}), \\quad r_2 = \\frac{1 - \\sqrt{5}}{2}$$\n3. General Solution: $F_n = \\alpha_1 (\\frac{1+\\sqrt{5}}{2})^n + \\alpha_2 (\\frac{1-\\sqrt{5}}{2})^n$.\n4. Apply base cases ($F_0=0, F_1=1$) to find constants $\\alpha_1 = \\frac{1}{\\sqrt{5}}, \\alpha_2 = -\\frac{1}{\\sqrt{5}}$.\n5. **Binet's Formula:**\n   $$\\mathbf{F_n = \\frac{1}{\\sqrt{5}} \\left[ \\left(\\frac{1+\\sqrt{5}}{2}\\right)^n - \\left(\\frac{1-\\sqrt{5}}{2}\\right)^n \\right]}$$\n\n---\n\n## 3. Summary Cheatsheet & Key Formulas\n\n- **Homogeneous Trial:** $a_n = r^n$.\n- **Repeated Root Factor:** Multiply by polynomial powers of $n$: $(\\alpha_0 + \\alpha_1 n) r^n$.\n- **Master Theorem:** Preferred shortcut for divide-and-conquer recurrences ($T(n) = aT(n/b) + f(n)$).\n",
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
      ],
      "prerequisites": [
        "Mathematical induction and sequence limits",
        "Polynomial roots and quadratic formulas"
      ],
      "externalResources": [
        {
          "title": "MIT 6.042J: Recurrence Relations and Generating Functions",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Solving Linear Recurrence Relations",
          "url": "https://www.geeksforgeeks.org/solving-linear-recurrence-relations/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Recurrence Relations in Algorithm Complexity",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      ],
      "prerequisites": [
        "Sets and Degree Sequences",
        "Handshaking Lemma"
      ],
      "externalResources": [
        {
          "title": "Graph Theory Definitions and Properties — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Graph Theory for Computer Science — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Graph Connectivity, Articulation Points, Bridges, and Planar Graphs\n\nGraph connectivity studies paths, network vulnerability, and topological structures in connected and disconnected networks.\n\n---\n\n## 1. Fundamental Tree Characterization Theorems\n\nFor an undirected graph $G = (V, E)$ with $n$ vertices, the following statements are **mutually equivalent**:\n1. $G$ is a **Tree**.\n2. $G$ is **connected and contains no cycles (acyclic)**.\n3. $G$ is **connected and has exactly $n - 1$ edges**: $|E| = n - 1$.\n4. $G$ is **acyclic and has exactly $n - 1$ edges**.\n5. There exists a **unique simple path** between every pair of vertices in $G$.\n6. Adding any new edge to $G$ creates **exactly one simple cycle**.\n\n---\n\n## 2. Network Vulnerability: Cut Vertices (Articulation Points) and Bridges\n\n- **Cut Vertex (Articulation Point):** A vertex whose removal (along with all incident edges) **increases the number of connected components** in the graph. Disconnects communication between subgraphs.\n- **Bridge (Cut Edge):** An edge whose removal increases the number of connected components.\n  - *Theorem:* An edge $e$ is a bridge if and only if $e$ **does NOT belong to any simple cycle**!\n\n---\n\n## 3. Planar Graphs and Euler's Formula\n\nA graph is **Planar** if it can be drawn in a 2D plane such that no two edges cross each other.\n\n### Euler's Formula for Connected Planar Graphs:\n$$\\mathbf{V - E + F = 2}$$\nwhere $V$ is vertices, $E$ is edges, and $F$ is faces/regions (including the infinite outer region).\n\n### Planar Edge Upper Bounds:\nFor any simple connected planar graph with $V \\ge 3$:\n$$\\mathbf{E \\le 3V - 6}$$\n- **Kuratowski's Theorem:** A graph is planar if and only if it contains **no subgraph homeomorphic to $K_5$ (complete graph on 5 vertices) or $K_{3,3}$ (complete bipartite utility graph)**!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Tree Equivalence:** Connected $\\land$ Acyclic $\\iff$ Connected with $n-1$ edges.\n- **Euler's Formula:** $V - E + F = 2$.\n- **Planar Edge Bound:** $E \\le 3V - 6$ (if triangle-free, $E \\le 2V - 4$).\n- **Non-Planar Benchmarks:** $K_5$ and $K_{3,3}$.\n",
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
      ],
      "prerequisites": [
        "Graph representations: adjacency lists and matrices",
        "Graph traversals (BFS and DFS)"
      ],
      "externalResources": [
        {
          "title": "MIT 6.042J: Graph Theory, Connectivity, and Trees",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Connectivity in a Graph and Bridges",
          "url": "https://www.geeksforgeeks.org/connectivity-in-a-graph/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Planar Graphs, Euler's Formula, and Cut Vertices",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Planar Graphs, Euler's Polyhedral Formula & Kuratowski's Theorem\n\nA graph $G = (V, E)$ is **planar** if it can be embedded in a 2D Euclidean plane such that its edges intersect only at their common endpoints. A specific non-intersecting drawing is called a **planar embedding** (or **plane graph**).\n\n---\n\n## 1. Euler's Polyhedral Formula\n\nFor any **connected planar graph** drawn with $V$ vertices, $E$ edges, and dividing the plane into $F$ regions (including the unbounded exterior face):\n$$V - E + F = 2$$\n\n### Disconnected Planar Graphs ($k$ connected components)\nIf a planar graph has $k$ connected components:\n$$V - E + F = 1 + k$$\n\n### Sum of Face Degrees (The Handshaking Lemma for Faces)\nEach edge bounds either two distinct faces or lies twice on the boundary of one face (a bridge). Therefore, summing the degrees of all faces equals twice the number of edges:\n$$\\sum_{f \\in \\text{Faces}} \\text{deg}(f) = 2E$$\n\n---\n\n## 2. Necessary Planarity Edge Bounds (Corollaries for Simple Graphs)\n\nIn a simple connected planar graph with $V \\ge 3$:\n1. **General Planar Bound:** Every face is bounded by at least 3 edges ($\\text{deg}(f) \\ge 3$).\n   $$2E = \\sum \\text{deg}(f) \\ge 3F \\implies F \\le \\frac{2}{3}E$$\n   Substituting into $V - E + F = 2$:\n   $$V - E + \\frac{2}{3}E \\ge 2 \\implies E \\le 3V - 6$$\n2. **Triangle-Free / Bipartite Planar Bound:** If the graph contains no cycles of length 3 (every face has $\\text{deg}(f) \\ge 4$):\n   $$2E = \\sum \\text{deg}(f) \\ge 4F \\implies F \\le \\frac{E}{2}$$\n   Substituting into Euler's formula:\n   $$E \\le 2V - 4$$\n3. **Minimum Vertex Degree:** Every simple planar graph contains at least one vertex $v$ with $\\text{deg}(v) \\le 5$.\n\n---\n\n## 3. Kuratowski's & Wagner's Theorems (Characterization of Planarity)\n\nA graph is planar **if and only if** it does not contain a subgraph homeomorphic to (or contractible to):\n\n```\n          K_5 (Complete on 5)                     K_{3, 3} (Complete Bipartite Utility)\n                  (1)                               (A)       (B)       (C)\n                /  |  \\                              | \\     / | \\     / |\n              (2)  |  (3)                            |   \\ /   |   \\ /   |\n              | \\  |  / |                            |    X    |    X    |\n              |  \\ | /  |                            |   / \\   |   / \\   |\n              (4)-----(5)                           (X)       (Y)       (Z)\n        [V=5, E=10, 3V-6=9 => Non-Planar]          [V=6, E=9, 2V-4=8 => Non-Planar]\n```\n\n- **Homeomorphism:** Two graphs are homeomorphic if one can be obtained from the other by a sequence of elementary subdivisions (inserting degree-2 vertices into edges).\n- **Minors (Wagner's Theorem):** A graph is planar $\\iff$ neither $K_5$ nor $K_{3,3}$ is a graph minor (obtained via edge deletions and contractions).\n\n---\n\n## 4. Dual Graphs & The Four Color Theorem\n- **Dual Graph ($G^*$):** Construct a vertex for every face of $G$, and draw an edge between two dual vertices for every shared boundary edge in $G$.\n  - $V^* = F$, $E^* = E$, $F^* = V$.\n- **The Four Color Theorem (Appel & Haken, 1976):** The vertices of every planar graph (or regions of any planar map) can be colored using **at most 4 colors** such that no two adjacent vertices share the same color ($\\chi(G) \\le 4$).\n",
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
      ],
      "prerequisites": [
        "Graph Theory Fundamentals",
        "Euler's Polyhedral Formula"
      ],
      "externalResources": [
        {
          "title": "Planar Graphs, Kuratowski's Theorem, and Coloring — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/planar-graphs-and-graph-coloring/",
          "difficulty": "Advanced",
          "isFree": true
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
      "notesMarkdown": "# Group Theory, Cyclic Groups & Lagrange's Theorem\n\nGroup theory is the algebraic study of symmetry, permutations, and invertible operations, providing foundational underpinnings for modern public-key cryptography (RSA, Diffie-Hellman, ECC) and error-correcting codes.\n\n---\n\n## 1. Axiomatic Hierarchy of Algebraic Structures\n\nLet $S$ be a non-empty set and $*$ be a binary operation ($*: S \\times S \\to S$):\n\n| Algebraic Structure | Closure | Associativity | Identity ($e$) | Inverses ($a^{-1}$) | Commutativity |\n| :--- | :---: | :---: | :---: | :---: | :---: |\n| **Groupoid (Magma)** | Yes | No | No | No | No |\n| **Semigroup** | Yes | Yes | No | No | No |\n| **Monoid** | Yes | Yes | Yes | No | No |\n| **Group $(G, *)$** | Yes | Yes | Yes | Yes | No |\n| **Abelian (Commutative) Group** | Yes | Yes | Yes | Yes | Yes |\n\n### Classic Examples:\n- $(\\mathbb{Z}, +)$ is an Abelian Group (Identity $= 0$, inverse of $a$ is $-a$).\n- $(\\mathbb{Z}, \\times)$ is a Monoid (Identity $= 1$, but $0$ and other non-unit elements have no integer multiplicative inverses).\n- $(\\mathbb{R} \\setminus \\{0\\}, \\times)$ is an Abelian Group (Identity $= 1$, inverse of $a$ is $1/a$).\n- $(\\mathbb{Z}_n, +_n)$ (integers modulo $n$) is an Abelian Group of order $n$.\n- General Linear Group $GL(n, \\mathbb{R})$ of invertible $n \\times n$ matrices under multiplication is a **non-Abelian group**.\n\n---\n\n## 2. Order of Elements and Subgroups\n\n- **Order of a Group ($|G|$):** The total cardinality (number of elements) in group $G$.\n- **Order of an Element ($o(a)$):** The smallest positive integer $k$ such that $a^k = e$ (or $k \\cdot a = 0$ in additive notation). If no such $k$ exists, $a$ has infinite order.\n- **Lagrange's Theorem:** If $G$ is a finite group and $H$ is a subgroup of $G$ ($H \\le G$):\n  $$\\frac{|G|}{|H|} = [G : H] \\in \\mathbb{Z}^+ \\quad (\\text{Index of } H \\text{ in } G)$$\n  **Corollaries:**\n  1. The order of every element $a \\in G$ divides the order of the group $|G|$ ($o(a) \\mid |G|$).\n  2. For any $a \\in G$, $a^{|G|} = e$ (generalizes Fermat's Little Theorem and Euler's Totient Theorem: $a^{\\phi(n)} \\equiv 1 \\pmod n$).\n  3. Every group of prime order $p$ is strictly **cyclic and simple**.\n\n---\n\n## 3. Cyclic Groups & Generators\n\nA group $(G, *)$ is **cyclic** if there exists an element $g \\in G$ (called a **generator**) such that every element in $G$ is a power of $g$: $G = \\langle g \\rangle = \\{g^k \\mid k \\in \\mathbb{Z}\\}$.\n- Every cyclic group is **Abelian**.\n- If $G$ is a finite cyclic group of order $n$, it has exactly $\\phi(n)$ generators, where $\\phi$ is Euler's totient function.\n- Any subgroup of a cyclic group is also cyclic.\n",
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
      ],
      "prerequisites": [
        "Binary Operations",
        "Set Closure and Invertibility"
      ],
      "externalResources": [
        {
          "title": "Group Theory, Subgroups, and Cosets — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/group-theory-in-discrete-mathematics/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Principles of Discrete Applied Mathematics — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
          "difficulty": "Intermediate",
          "isFree": true
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
        "Consensus Theorem: AB + A'C + BC = AB + A'C (eliminates redundant term BC).",
        "Absorption Laws: x + x*y = x, x * (x + y) = x."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Boolean+Algebra+Discrete+Mathematics+Lattices+Duality+Discrete+Mathematics+gate+lecture",
      "notesMarkdown": "# Boolean Algebra, Lattices & Algebraic Minimization\n\nA **Boolean Algebra** is an algebraic system $(B, +, \\cdot, ', 0, 1)$ consisting of a set $B$, two binary operations $+$ (logical OR) and $\\cdot$ (logical AND), a unary operation $'$ (complement/NOT), and two special elements $0$ (zero/least element) and $1$ (unit/greatest element). Formally, it is a **complemented, distributive lattice**.\n\n---\n\n## 1. Axioms and Fundamental Postulates (Huntington Postulates)\n\nFor all elements $x, y, z \\in B$:\n1. **Closure:** $x + y \\in B$ and $x \\cdot y \\in B$.\n2. **Commutativity:** $x + y = y + x$ and $x \\cdot y = y \\cdot x$.\n3. **Distributivity:**\n   - $x \\cdot (y + z) = (x \\cdot y) + (x \\cdot z)$\n   - $x + (y \\cdot z) = (x + y) \\cdot (x + z)$ *(dual form)*\n4. **Identity Elements:** $x + 0 = x$ and $x \\cdot 1 = x$.\n5. **Complements:** $x + x' = 1$ and $x \\cdot x' = 0$.\n\n---\n\n## 2. Essential Derived Theorems\n\n| Theorem / Law | OR Form ($+$) | Dual AND Form ($\\cdot$) |\n| :--- | :--- | :--- |\n| **Idempotent** | $x + x = x$ | $x \\cdot x = x$ |\n| **Dominance (Null)** | $x + 1 = 1$ | $x \\cdot 0 = 0$ |\n| **Involution (Double Negation)** | $(x')' = x$ | $(x')' = x$ |\n| **Absorption** | $x + (x \\cdot y) = x$ | $x \\cdot (x + y) = x$ |\n| **Absorption Variant** | $x + (x' \\cdot y) = x + y$ | $x \\cdot (x' + y) = x \\cdot y$ |\n| **De Morgan's Laws** | $(x + y)' = x' \\cdot y'$ | $(x \\cdot y)' = x' + y'$ |\n| **Associativity** | $(x + y) + z = x + (y + z)$ | $(x \\cdot y) \\cdot z = x \\cdot (y \\cdot z)$ |\n| **Consensus Theorem** | $x y + x' z + y z = x y + x' z$ | $(x + y)(x' + z)(y + z) = (x + y)(x' + z)$ |\n\n> [!IMPORTANT]\n> **The Consensus Theorem:** In $x y + x' z + y z$, term $y z$ is redundant and can be dropped because if $x = 1$, $x y = y$; if $x = 0$, $x' z = z$. The term $y z$ covers no unique minterms!\n\n---\n\n## 3. The Principle of Duality\n\nIf any Boolean identity $E$ is valid, its **dual identity $E^*$** (obtained by systematically replacing every $+$ with $\\cdot$, every $\\cdot$ with $+$, every $0$ with $1$, and every $1$ with $0$, while leaving variable literals unchanged) is **also unconditionally valid**.\n\n```\n   Primal Expression:   A + (B * C) = (A + B) * (A + C)\n   Step 1 (Swap +/*):   A * (B + C) = (A * B) + (A * C)   <-- Dual is unconditionally true!\n```\n\n---\n\n## 4. Canonical Forms: Minterms vs Maxterms\n\nFor a Boolean function of $n$ variables:\n- **Minterm ($m_i$):** A product (AND) of all $n$ literals in either true or complemented form representing where the function outputs $1$. There are $2^n$ distinct minterms. **Sum-of-Products (SOP)**: $F = \\sum m(1, 3, 7)$.\n- **Maxterm ($M_i$):** A sum (OR) of all $n$ literals representing where the function outputs $0$. **Product-of-Sums (POS)**: $F = \\prod M(0, 2, 4, 5, 6)$.\n- **Relationship:** $\\left(\\sum m(A)\\right)' = \\sum m(A^c) = \\prod M(A)$.\n",
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
          "question": "According to the Boolean Consensus Theorem, what redundant term can be eliminated from AB + A'C + BC?",
          "options": [
            "BC",
            "AB",
            "A'C",
            "None; no term is redundant"
          ],
          "correct_option": 0,
          "explanation": "By the Consensus Theorem, in AB + A'C + BC, the variable A appears in true form in AB and complemented form in A'C. The product of the remaining variables (BC) is the consensus term and is mathematically redundant: AB + A'C + BC = AB + A'C."
        }
      ],
      "prerequisites": [
        "Propositional Connectives",
        "Logic Gates"
      ],
      "externalResources": [
        {
          "title": "Boolean Algebra Laws, Duality, and Logic Minimization — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/boolean-algebra-in-digital-logic/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    }
  ]
};
