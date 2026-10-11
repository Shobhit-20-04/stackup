import json
import urllib.parse

def get_yt_url(title, cat_name="Discrete Mathematics"):
    query = f"{title} {cat_name} gate lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

topics = [
    {
        "id": "dm-propositional-predicate-logic",
        "slug": "propositional-and-predicate-logic",
        "title": "Propositional and Predicate Logic",
        "description": "Truth tables, logical connectives, tautologies, contradictions, quantifiers (universal and existential), and inference rules.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["Google", "Microsoft", "TCS Digital", "Infosys"],
        "keyTakeaways": [
            "Propositional logic evaluates truth values of declarative statements using AND, OR, NOT, XOR, Implication (->), and Biconditional (<->).",
            "Implication p -> q is logically equivalent to ~p v q (false ONLY when p is true and q is false).",
            "Contrapositive (~q -> ~p) is logically equivalent to p -> q; Converse (q -> p) and Inverse (~p -> ~q) are NOT equivalent.",
            "De Morgan's Laws: ~(p ^ q) = ~p v ~q, ~(p v q) = ~p ^ ~q."
        ],
        "youtube_url": get_yt_url("Propositional Predicate Logic Discrete Mathematics"),
        "notesMarkdown": """# Propositional and Predicate Logic

---

## 1. Truth Tables & Implication Equivalence
Conditional Statement $p \\to q$:
- **Contrapositive:** $\\neg q \\to \\neg p$ (Equivalent to $p \\to q$)
- **Converse:** $q \\to p$
- **Inverse:** $\\neg p \\to \\neg q$
- **Equivalence:** $p \\to q \\equiv \\neg p \\lor q$

---

## 2. Predicate Logic & Quantifiers
- **Universal Quantifier ($\\forall x$):** True if $P(x)$ holds for ALL domain elements.
- **Existential Quantifier ($\\exists x$):** True if $P(x)$ holds for AT LEAST ONE domain element.
- **Negation of Quantifiers:**
  - $\\neg (\\forall x P(x)) \\equiv \\exists x \\neg P(x)$
  - $\\neg (\\exists x P(x)) \\equiv \\forall x \\neg P(x)$
""",
        "questions": [
            {
                "id": "dm-log-1",
                "question": "Which of the following is logically equivalent to the conditional statement p -> q?",
                "options": ["~p v q", "~q -> ~p", "~(p ^ ~q)", "All of the above"],
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
        "companyTags": ["Amazon", "Microsoft", "TCS", "Accenture"],
        "keyTakeaways": [
            "Power set P(A) of set with n elements has 2^n elements.",
            "Cartesian product A x B has |A| * |B| ordered pairs.",
            "Function f: A -> B is Injective (one-to-one) if f(a1) = f(a2) implies a1 = a2.",
            "Surjective (onto) if range equals codomain; Bijective if both Injective and Surjective."
        ],
        "youtube_url": get_yt_url("Sets Relations Functions Injective Surjective Bijective"),
        "notesMarkdown": """# Sets, Relations, and Functions

---

## 1. Sets and Power Sets
If $|A| = n$:
- Number of subsets (size of power set $\\mathcal{P}(A)$) = $2^n$.
- Number of binary relations on $A$ (subsets of $A \\times A$) = $2^{n^2}$.

---

## 2. Function Mapping Properties
For $f: A \\to B$ where $|A| = m, |B| = n$:
- **Injective (One-to-One):** Each element in $A$ maps to a distinct element in $B$. Requires $m \\le n$.
- **Surjective (Onto):** Every element in $B$ has at least one pre-image in $A$. Requires $m \\ge n$.
- **Bijective (Invertible):** Both one-to-one and onto. Requires $m = n$.
""",
        "questions": [
            {
                "id": "dm-srf-1",
                "question": "How many total binary relations can be defined on a set A with 4 elements?",
                "options": ["16", "256", "65,536 (2^16)", "4^4"],
                "correct_option": 2,
                "explanation": "A binary relation on A is any subset of A x A. |A x A| = 4 * 4 = 16. Total subsets = 2^16 = 65,536."
            },
            {
                "id": "dm-srf-2",
                "question": "If a function f: A -> B is Bijective, what must be true about the cardinalities of finite sets A and B?",
                "options": ["|A| < |B|", "|A| > |B|", "|A| = |B|", "|A| <= |B|"],
                "correct_option": 2,
                "explanation": "A bijection is simultaneously injective (|A| <= |B|) and surjective (|A| >= |B|), which requires strictly that |A| = |B|."
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
        "companyTags": ["Google", "Microsoft", "Amazon", "IBM"],
        "keyTakeaways": [
            "Equivalence Relation: Reflexive, Symmetric, and Transitive (partitions set into disjoint equivalence classes).",
            "Partial Order Relation (POSET): Reflexive, Anti-symmetric, and Transitive.",
            "Strict partial order: Irreflexive and Transitive.",
            "Hasse Diagrams graphically represent partially ordered sets omitting reflexive and transitive edges."
        ],
        "youtube_url": get_yt_url("Equivalence Relations Partial Orders POSET Hasse Diagram"),
        "notesMarkdown": """# Equivalence Relations and Partial Orders

---

## 1. Axiomatic Properties of Relations
For relation $R$ on set $A$:
- **Reflexive:** $\\forall a \\in A, (a, a) \\in R$.
- **Symmetric:** $(a, b) \\in R \\implies (b, a) \\in R$.
- **Anti-symmetric:** $(a, b) \\in R \\land (b, a) \\in R \\implies a = b$.
- **Transitive:** $(a, b) \\in R \\land (b, c) \\in R \\implies (a, c) \\in R$.

---

## 2. Equivalence vs Partial Order
- **Equivalence Relation:** Reflexive + Symmetric + Transitive.
- **Partial Order (POSET):** Reflexive + Anti-symmetric + Transitive.
- **Total Order (Lattice):** POSET where every pair of elements is comparable.
""",
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
        "companyTags": ["Amazon", "Microsoft", "TCS Digital", "Infosys"],
        "keyTakeaways": [
            "Weak induction: Prove P(1) is true (Base Case). Assume P(k) true (Inductive Hypothesis), prove P(k+1) true.",
            "Strong induction: Assume P(1), P(2), ..., P(k) are all true to prove P(k+1).",
            "Both forms are logically equivalent to the Well-Ordering Principle of positive integers.",
            "Crucial for proving correctness of recursive algorithms and asymptotic bounds."
        ],
        "youtube_url": get_yt_url("Mathematical Induction Proofs Weak Strong Induction"),
        "notesMarkdown": """# Mathematical Induction

Mathematical induction is a proof technique used to establish statements for all natural numbers $n \\ge n_0$.

---

## 1. Principle of Mathematical Induction
1. **Base Step:** Verify that $P(n_0)$ is true (usually $n_0 = 0$ or $1$).
2. **Induction Hypothesis:** Assume $P(k)$ is true for an arbitrary integer $k \\ge n_0$.
3. **Inductive Step:** Prove that $P(k + 1)$ must be true under the hypothesis.
4. Conclude: $\\forall n \\ge n_0, P(n)$ holds.
""",
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
        "companyTags": ["Google", "Amazon", "Goldman Sachs", "Directi"],
        "keyTakeaways": [
            "Sum Rule: For disjoint sets, |A U B| = |A| + |B|.",
            "Product Rule: Sequential independent choices multiply: |A x B| = |A| * |B|.",
            "Inclusion-Exclusion: |A U B| = |A| + |B| - |A n B|.",
            "Derangements (permutations where no element appears in original position): D(n) = n! * sum((-1)^k / k!)."
        ],
        "youtube_url": get_yt_url("Combinatorics Inclusion Exclusion Principle Derangements"),
        "notesMarkdown": """# Combinatorics and Counting

---

## 1. Inclusion-Exclusion Principle
For three finite sets $A, B, C$:
$$|A \\cup B \\cup C| = |A| + |B| + |C| - (|A \\cap B| + |B \\cap C| + |C \\cap A|) + |A \\cap B \\cap C|$$

---

## 2. Derangements (Subfactorial $!n$)
A derangement is a permutation of $n$ elements where no element appears in its original spot:
$$!n = n! \\sum_{k=0}^{n} \\frac{(-1)^k}{k!} \\approx \\left[ \\frac{n!}{e} \\right]$$
- $!1 = 0$, $!2 = 1$, $!3 = 2$, $!4 = 9$, $!5 = 44$.
""",
        "questions": [
            {
                "id": "dm-cnt-1",
                "question": "What is the number of derangements of 4 items (permutations where no item is in its original position)?",
                "options": ["6", "9", "12", "24"],
                "correct_option": 1,
                "explanation": "D(4) = 4! * (1/0! - 1/1! + 1/2! - 1/3! + 1/4!) = 24 * (1 - 1 + 1/2 - 1/6 + 1/24) = 24 * (9/24) = 9."
            },
            {
                "id": "dm-cnt-2",
                "question": "How many integers between 1 and 100 inclusive are divisible by either 3 or 5?",
                "options": ["47", "53", "33", "20"],
                "correct_option": 0,
                "explanation": "Multiples of 3 = floor(100/3) = 33. Multiples of 5 = floor(100/5) = 20. Multiples of both (15) = floor(100/15) = 6. By Inclusion-Exclusion: 33 + 20 - 6 = 47."
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
        "companyTags": ["Amazon", "TCS Digital", "Infosys", "Wipro"],
        "keyTakeaways": [
            "Permutations (order matters): P(n, r) = n! / (n - r)!.",
            "Combinations (order does not matter): C(n, r) = n! / (r! * (n - r)!).",
            "Pascal's Identity: C(n, r) = C(n - 1, r - 1) + C(n - 1, r).",
            "Stars and Bars: Distributing n identical items into k distinct bins = C(n + k - 1, k - 1)."
        ],
        "youtube_url": get_yt_url("Permutations and Combinations Discrete Mathematics"),
        "notesMarkdown": """# Permutations and Combinations

---

## 1. Foundational Formulas
- **Permutations (Order Matters):**
  $$P(n, r) = \\frac{n!}{(n - r)!}$$
- **Combinations (Order Does Not Matter):**
  $$\\binom{n}{r} = \\frac{n!}{r!(n - r)!}$$

---

## 2. Stars and Bars (Multisets)
The number of non-negative integer solutions to $x_1 + x_2 + \\dots + x_k = n$ is:
$$\\binom{n + k - 1}{k - 1}$$
""",
        "questions": [
            {
                "id": "dm-pc-1",
                "question": "In how many ways can 5 identical chocolates be distributed among 3 children such that a child can receive 0 or more chocolates?",
                "options": ["21", "15", "10", "35"],
                "correct_option": 0,
                "explanation": "Using Stars and Bars for non-negative solutions: C(n + k - 1, k - 1) = C(5 + 3 - 1, 3 - 1) = C(7, 2) = (7 * 6) / 2 = 21."
            },
            {
                "id": "dm-pc-2",
                "question": "In how many distinct ways can 6 people sit around a circular dining table?",
                "options": ["720", "120", "60", "24"],
                "correct_option": 1,
                "explanation": "Circular permutations of n distinct items are given by (n - 1)!. For 6 people: (6 - 1)! = 5! = 120."
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
        "companyTags": ["Google", "Amazon", "Microsoft", "Directi"],
        "keyTakeaways": [
            "Basic Principle: If k + 1 or more items are put into k boxes, at least one box contains >= 2 items.",
            "Generalized Principle: If N items are placed into k boxes, at least one box contains >= ceil(N / k) items.",
            "Used for guaranteed existence proofs without needing to identify the specific item.",
            "Classic applications: Handshakes at parties, birthday paradox bounds, sum subsets."
        ],
        "youtube_url": get_yt_url("Pigeonhole Principle Discrete Mathematics Problems"),
        "notesMarkdown": """# Pigeonhole Principle

---

## 1. Generalized Pigeonhole Principle
If $N$ objects are placed into $k$ boxes, then there is at least one box containing at least:
$$\\left\\lceil \\frac{N}{k} \\right\\rceil \\text{ objects}$$

> **Classic Example:**
> In any group of 367 people, at least two must share a birthday (since there are at most 366 possible birthdays in a leap year).
""",
        "questions": [
            {
                "id": "dm-php-1",
                "question": "What is the minimum number of students needed in a classroom to guarantee that at least 5 students were born in the same month?",
                "options": ["49", "48", "60", "50"],
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
        "companyTags": ["Amazon", "Microsoft", "TCS Digital", "Infosys"],
        "keyTakeaways": [
            "Linear homogeneous recurrence: a_n = c_1 a_(n-1) + c_2 a_(n-2) + ... + c_k a_(n-k).",
            "Characteristic equation: r^k - c_1 r^(k-1) - ... - c_k = 0.",
            "Distinct real roots r_1, r_2 -> general solution a_n = A(r_1)^n + B(r_2)^n.",
            "Repeated root r of multiplicity m -> general solution includes (A_0 + A_1*n + ... + A_(m-1)*n^(m-1)) * r^n."
        ],
        "youtube_url": get_yt_url("Recurrence Relations Characteristic Equation Discrete Mathematics"),
        "notesMarkdown": """# Recurrence Relations in Discrete Mathematics

---

## 1. Solving Linear Homogeneous Recurrences
For $a_n = c_1 a_{n-1} + c_2 a_{n-2}$:
Characteristic equation: $r^2 - c_1 r - c_2 = 0$.

1. **Distinct Roots $r_1 \\ne r_2$:**
   $$a_n = C_1 r_1^n + C_2 r_2^n$$
2. **Repeated Root $r_1 = r_2 = r$:**
   $$a_n = (C_1 + C_2 n) r^n$$
""",
        "questions": [
            {
                "id": "dm-rec-1",
                "question": "What is the characteristic equation for the Fibonacci recurrence F(n) = F(n - 1) + F(n - 2)?",
                "options": ["r^2 - r - 1 = 0", "r^2 + r + 1 = 0", "r^2 - 2r + 1 = 0", "r^2 + r - 1 = 0"],
                "correct_option": 0,
                "explanation": "Substituting F(n) = r^n yields r^n = r^(n-1) + r^(n-2). Dividing by r^(n-2) gives r^2 - r - 1 = 0."
            },
            {
                "id": "dm-rec-2",
                "question": "If the characteristic equation has a single root r = 3 of multiplicity 2, what is the form of the general solution a_n?",
                "options": ["C1 * 3^n", "(C1 + C2 * n) * 3^n", "C1 * 3^n + C2 * 3^(2n)", "(C1 + C2 * n^2) * 3^n"],
                "correct_option": 1,
                "explanation": "When a root r has multiplicity 2, the independent solutions are r^n and n * r^n, yielding general solution (C1 + C2 * n) * 3^n."
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
        "companyTags": ["Google", "Amazon", "Microsoft", "Meta"],
        "keyTakeaways": [
            "Handshaking Lemma: sum(deg(v)) = 2 * |E|. The number of odd-degree vertices is always even.",
            "Euler Circuit: Visits every edge exactly once and returns to start (all vertices have even degree).",
            "Euler Path: Visits every edge once (exactly 0 or 2 vertices have odd degree).",
            "Hamiltonian Cycle: Visits every vertex exactly once and returns to start (NP-Complete to decide)."
        ],
        "youtube_url": get_yt_url("Graph Theory Handshaking Lemma Euler Circuit Hamiltonian"),
        "notesMarkdown": """# Graph Theory in Discrete Mathematics

---

## 1. Handshaking Lemma
In any undirected graph:
$$\\sum_{v \\in V} \\deg(v) = 2 |E|$$
**Corollary:** The number of vertices of odd degree in any graph is always **even**.

---

## 2. Eulerian vs Hamiltonian
- **Eulerian Circuit:** Traverses every **edge** once, returns to start. Exists iff connected and **every vertex has even degree**.
- **Eulerian Path:** Traverses every edge once. Exists iff connected and **exactly 2 vertices have odd degree**.
- **Hamiltonian Cycle:** Visits every **vertex** once, returns to start.
""",
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
        "companyTags": ["Amazon", "Google", "Microsoft", "Cisco"],
        "keyTakeaways": [
            "A tree is an acyclic connected graph; any tree with n vertices has exactly n - 1 edges.",
            "Adding any edge to a tree creates exactly one simple cycle.",
            "Cayley's Formula: The number of labeled trees on n vertices is n^(n - 2).",
            "A bridge is an edge whose removal increases the number of connected components."
        ],
        "youtube_url": get_yt_url("Trees and Connectivity Cayleys Formula Cut Vertices Bridges"),
        "notesMarkdown": """# Trees and Connectivity

---

## 1. Characterizations of a Tree (All Equivalent)
A graph $G$ with $n$ vertices is a tree iff:
1. $G$ is connected and has no cycles.
2. $G$ is connected and has $n - 1$ edges.
3. $G$ has no cycles and has $n - 1$ edges.
4. There is a unique simple path between any pair of vertices in $G$.

---

## 2. Cayley's Theorem
The number of distinct labeled trees on $n$ vertices is:
$$T_n = n^{n - 2}$$
""",
        "questions": [
            {
                "id": "dm-tc-1",
                "question": "According to Cayley's formula, how many distinct labeled trees can be formed on 4 vertices?",
                "options": ["16", "24", "4", "64"],
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
        "companyTags": ["Google", "Microsoft", "Goldman Sachs"],
        "keyTakeaways": [
            "A graph is planar if it can be drawn in the plane without intersecting edges.",
            "Euler's Formula: V - E + F = 2 for any connected planar graph.",
            "For simple connected planar graph with V >= 3: E <= 3V - 6.",
            "Kuratowski's Theorem: A graph is planar iff it contains no subgraph homeomorphic to K5 or K3,3."
        ],
        "youtube_url": get_yt_url("Planar Graphs Eulers Formula Kuratowski Theorem"),
        "notesMarkdown": """# Planar Graphs

A graph is planar if it can be embedded in a 2D plane such that no two edges cross.

---

## 1. Euler's Formula
For any connected planar graph with $V$ vertices, $E$ edges, and $F$ faces (regions):
$$V - E + F = 2$$

---

## 2. Necessary Edge Bounds (for $V \\ge 3$)
- **General Simple Planar:** $E \\le 3V - 6$
- **Bipartite Simple Planar (Triangle-free):** $E \\le 2V - 4$

---

## 3. Kuratowski's Theorem
A graph is planar **if and only if** it does not contain a subgraph homeomorphic to (or contractible to):
- $K_5$ (Complete graph on 5 vertices)
- $K_{3,3}$ (Complete bipartite utility graph on 3 + 3 vertices)
""",
        "questions": [
            {
                "id": "dm-pl-1",
                "question": "A connected planar graph has 10 vertices and 15 edges. How many faces (regions) does it divide the plane into?",
                "options": ["5", "7", "8", "6"],
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
        "companyTags": ["Google", "Microsoft", "Directi", "Cryptography Labs"],
        "keyTakeaways": [
            "Semigroup: Closed and Associative.",
            "Monoid: Semigroup with Identity element.",
            "Group: Monoid where every element has an Inverse.",
            "Abelian (Commutative) Group: Group where binary operation is commutative (a * b = b * a).",
            "Lagrange's Theorem: The order of any subgroup H divides the order of finite group G (|G| / |H| is integer)."
        ],
        "youtube_url": get_yt_url("Group Theory Basics Monoid Group Abelian Group Lagranges"),
        "notesMarkdown": """# Group Theory Basics

Algebraic structures $(S, *)$ define properties of sets under binary operations.

---

## 1. Hierarchy of Algebraic Structures
1. **Algebraic Structure:** Closure ($\\\\forall a, b \\in S, a * b \\in S$).
2. **Semigroup:** Closure + Associativity ($a * (b * c) = (a * b) * c$).
3. **Monoid:** Semigroup + Identity element ($e * a = a * e = a$).
4. **Group:** Monoid + Inverse element ($\\\\forall a \\in S, \\exists a^{-1} \\text{ s.t. } a * a^{-1} = e$).
5. **Abelian Group:** Group + Commutativity ($a * b = b * a$).

---

## 2. Lagrange's Theorem
For any finite group $G$ and subgroup $H$:
$$\\text{Order of Subgroup } |H| \\text{ divides } |G|$$
""",
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
                "options": ["6", "8", "5", "12"],
                "correct_option": 2,
                "explanation": "Lagrange's theorem requires the order of any subgroup to divide the order of the group evenly. 24 is not divisible by 5 (24 / 5 = 4.8), so a subgroup of order 5 cannot exist."
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
        "companyTags": ["Intel", "Qualcomm", "TCS Digital", "Infosys"],
        "keyTakeaways": [
            "A Boolean algebra is a complemented, distributive lattice.",
            "Duality Principle: Any Boolean identity remains valid if AND and OR are swapped and 0 and 1 are swapped.",
            "Idempotent Laws: x + x = x, x * x = x.",
            "Absorption Laws: x + x*y = x, x * (x + y) = x."
        ],
        "youtube_url": get_yt_url("Boolean Algebra Discrete Mathematics Lattices Duality"),
        "notesMarkdown": """# Boolean Algebra

Boolean algebra is an algebraic structure $(B, +, \\cdot, ', 0, 1)$ that formalizes logic gates and set intersections.

---

## 1. Boolean Identities
- **Idempotent:** $x + x = x$, $x \\cdot x = x$
- **Identity:** $x + 0 = x$, $x \\cdot 1 = x$
- **Dominance:** $x + 1 = 1$, $x \\cdot 0 = 0$
- **Complement:** $x + x' = 1$, $x \\cdot x' = 0$
- **Absorption:** $x + xy = x$, $x(x + y) = x$
- **De Morgan:** $(x + y)' = x'y'$, $(xy)' = x' + y'$

---

## 2. Principle of Duality
Any algebraic identity derived from the postulates remains true if $+$ and $\\cdot$ are interchanged, and $0$ and $1$ are interchanged.
""",
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
                "options": ["A", "B", "A + B", "A'B"],
                "correct_option": 2,
                "explanation": "A + A'B = (A + A')(A + B) by distributivity. Since A + A' = 1, this simplifies to 1 * (A + B) = A + B."
            }
        ]
    }
]

file_content = f"""import type {{ SectionCategory }} from './types';

export const DISCRETE_MATH_CATEGORY: SectionCategory = {{
  id: "discrete-math",
  slug: "discrete-mathematics",
  title: "Discrete Mathematics",
  description: "Propositional logic, set theory, combinatorics, graph theory, group theory, and Boolean algebra.",
  icon: "BookOpen",
  topics: {json.dumps(topics, indent=2)}
}};
"""

with open('./src/lib/data/curriculum/discrete-math.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"Generated Discrete Mathematics module with {len(topics)} topics successfully!")
