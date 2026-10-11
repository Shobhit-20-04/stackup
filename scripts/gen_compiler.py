import json
import urllib.parse

def make_yt_url(title, subject="Compiler Design CD GATE"):
    q = f"{title} {subject} lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(q)}"

topics_data = [
    {
        "id": "cd-compiler-architecture",
        "slug": "compiler-architecture",
        "title": "Compiler Architecture",
        "description": "Phases of a compiler (analysis and synthesis), front-end vs. back-end, passes vs. phases, and cousins of the compiler (interpreters, assemblers, linkers, loaders).",
        "estimatedMinutes": 15,
        "difficulty": "Easy",
        "companyTags": ["Google", "Microsoft", "Intel", "Qualcomm"],
        "keyTakeaways": [
            "Analysis Phase (Front-end): Lexical, Syntax, and Semantic analysis - machine independent.",
            "Synthesis Phase (Back-end): Intermediate code generation, Optimization, Target code generation - machine dependent.",
            "Pass: One complete traversal of the source program or intermediate representation.",
            "Phase: Logical operational step within the compilation pipeline."
        ],
        "notesMarkdown": """# Compiler Architecture & Phases

---

## 1. Analysis vs. Synthesis
A compiler maps high-level source code into low-level machine code through two primary stages:
1. **Analysis (Front-End / Machine Independent):**
   - **Lexical Analyzer (Scanner):** Character stream → Token stream.
   - **Syntax Analyzer (Parser):** Tokens → Parse tree / AST according to Context-Free Grammar.
   - **Semantic Analyzer:** Type checking, scope resolution, semantic consistency.
2. **Synthesis (Back-End / Machine Dependent):**
   - **Intermediate Code Generator (ICG):** Generates machine-neutral Three-Address Code (TAC).
   - **Code Optimizer:** Eliminates redundancies, dead code, loops optimization to improve speed/space.
   - **Target Code Generator:** Converts TAC into relocatable machine code or assembly.

---

## 2. Passes vs. Phases
- **Phase:** A logical organization of the compiler task.
- **Pass:** A physical reading of the source program or intermediate representation from disk/memory. Multi-pass compilers reduce memory consumption at the cost of disk I/O.
""",
        "questions": [
            {
                "id": "cd-arch-1",
                "question": "Which phase of a compiler is responsible for checking type consistency and scope resolution?",
                "options": ["Lexical Analysis", "Syntax Analysis", "Semantic Analysis", "Intermediate Code Generation"],
                "correct_option": 2,
                "explanation": "Semantic analysis verifies static semantics, including type compatibility, variable declarations, and array bound checks."
            },
            {
                "id": "cd-arch-2",
                "question": "What is the primary distinction between a compiler phase and a compiler pass?",
                "options": [
                    "A phase is a logical step, while a pass is a physical scan over the code representation",
                    "A pass is machine-independent, while a phase is hardware-dependent",
                    "Phases are only in the front-end, while passes are only in the back-end",
                    "There is no distinction; they are synonymous"
                ],
                "correct_option": 0,
                "explanation": "A phase describes a logical operation of the compiler; a pass refers to one complete traversal over the program representation."
            }
        ]
    },
    {
        "id": "cd-lexical-analysis",
        "slug": "lexical-analysis",
        "title": "Lexical Analysis",
        "description": "Role of lexical analyzer, tokens, patterns, lexemes, input buffering, regular definitions, and transition diagrams.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Amazon", "Cisco", "NVIDIA", "Adobe"],
        "keyTakeaways": [
            "Lexeme: Concrete sequence of characters in the source code matching a token pattern.",
            "Token: Abstract terminal symbol passed to parser: (token_name, attribute_value).",
            "Input Buffering: Two-buffer scheme with sentinels avoids frequent disk reads and EOF checks.",
            "Lexical errors: Character that cannot be grouped into any valid token."
        ],
        "notesMarkdown": """# Lexical Analysis (Scanner)

---

## 1. Terminology: Token, Lexeme, Pattern
- **Token:** Abstract category passed to parser (e.g., `id`, `num`, `if`).
- **Lexeme:** Specific character sequence matching pattern (e.g., `totalScore`, `105`, `while`).
- **Pattern:** Descriptive rule (typically specified using Regular Expressions).

---

## 2. Input Buffering & Lookahead
- Lexical analyzers frequently require lookahead beyond a token (e.g. distinguishing `>` from `>=`).
- **Double Buffering:** Two $N$-character buffers with **sentinels** (`EOF`) eliminate two checks per character into one.
""",
        "questions": [
            {
                "id": "cd-lex-1",
                "question": "In the statement 'int count = 42;', how many tokens are identified by a standard C lexical analyzer?",
                "options": ["4", "5", "6", "7"],
                "correct_option": 1,
                "explanation": "The 5 tokens are: 'int' (keyword), 'count' (identifier), '=' (operator), '42' (constant), and ';' (delimiter/semicolon)."
            },
            {
                "id": "cd-lex-2",
                "question": "Why is double buffering with sentinels used in lexical analyzers?",
                "options": [
                    "To support multi-threaded compilation",
                    "To eliminate two boundary checks per character by placing EOF sentinels at buffer ends",
                    "To generate syntax trees directly",
                    "To parse context-free grammars"
                ],
                "correct_option": 1,
                "explanation": "Sentinels placed at buffer ends permit one single branch test per character rather than two checks (end-of-buffer and character check)."
            }
        ]
    },
    {
        "id": "cd-syntax-analysis-and-parsing",
        "slug": "syntax-analysis-and-parsing",
        "title": "Syntax Analysis and Parsing",
        "description": "Role of the parser, Context-Free Grammars (CFG), ambiguity in grammars, parse trees, top-down vs. bottom-up parsing strategies.",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Microsoft", "Oracle", "Uber", "TCS Digital"],
        "keyTakeaways": [
            "CFG: 4-tuple G = (V, Sigma, R, S) generating context-free languages.",
            "Ambiguous Grammar: Produces two or more distinct parse trees (or leftmost derivations) for the same string.",
            "Top-down parsing: Builds tree from root (Start symbol) to leaves (terminals).",
            "Bottom-up parsing: Reduces leaves (terminals) to root (Start symbol)."
        ],
        "notesMarkdown": """# Syntax Analysis & Parsing

---

## 1. Context-Free Grammars (CFG)
A CFG is defined as $G = (V, \\Sigma, R, S)$:
- $V$: Non-terminals / Variables
- $\\Sigma$: Terminals (Tokens)
- $R$: Production rules $A \\to \\alpha$ where $A \\in V, \\alpha \\in (V \\cup \\Sigma)^*$
- $S$: Start symbol ($S \\in V$)

---

## 2. Ambiguity
A grammar is **ambiguous** if there exists at least one string $w \\in L(G)$ that has:
- Two or more distinct parse trees, OR
- Two or more distinct leftmost derivations (LMD), OR
- Two or more distinct rightmost derivations (RMD).

> Note: Grammar ambiguity is undecidable in general. Common ambiguous constructs include the **dangling-else problem**.
""",
        "questions": [
            {
                "id": "cd-parse-1",
                "question": "A grammar is strictly ambiguous if and only if for at least one string it has:",
                "options": [
                    "Left recursion",
                    "More than one derivation tree (parse tree)",
                    "Epsilon productions",
                    "Non-deterministic transitions"
                ],
                "correct_option": 1,
                "explanation": "By definition, a CFG is ambiguous if there exists at least one valid string with two or more distinct parse trees."
            },
            {
                "id": "cd-parse-2",
                "question": "Top-down parsing corresponds to finding which derivation for an input string?",
                "options": [
                    "Rightmost derivation",
                    "Leftmost derivation",
                    "Rightmost derivation in reverse",
                    "Leftmost derivation in reverse"
                ],
                "correct_option": 1,
                "explanation": "Top-down parsers expand non-terminals from left to right, constructing the leftmost derivation."
            }
        ]
    },
    {
        "id": "cd-first-and-follow-sets",
        "slug": "first-and-follow-sets",
        "title": "FIRST and FOLLOW Sets",
        "description": "Computation rules for FIRST and FOLLOW sets, handling epsilon productions, and their vital role in predictive parsing tables.",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Google", "Amazon", "Infosys", "Wipro"],
        "keyTakeaways": [
            "FIRST(alpha): Set of terminals that begin strings derived from alpha; can contain epsilon.",
            "FOLLOW(A): Set of terminals that can appear immediately to the right of non-terminal A; NEVER contains epsilon; contains $ for Start symbol.",
            "If A -> alpha B beta: FOLLOW(B) includes (FIRST(beta) \\ {epsilon}).",
            "If beta ->* epsilon: FOLLOW(B) includes FOLLOW(A)."
        ],
        "notesMarkdown": """# FIRST and FOLLOW Sets

---

## 1. Computation of FIRST(X)
1. If $X$ is a terminal, $\\text{FIRST}(X) = \\{X\\}$.
2. If $X \\to \\epsilon$, then $\\epsilon \\in \\text{FIRST}(X)$.
3. If $X \\to Y_1 Y_2 \\dots Y_k$:
   - Add all non-$\\epsilon$ symbols of $\\text{FIRST}(Y_1)$ to $\\text{FIRST}(X)$.
   - If $Y_1 \\to^* \\epsilon$, add $\\text{FIRST}(Y_2) \\setminus \\{\\epsilon\\}$, and so on.
   - If all $Y_i \\to^* \\epsilon$, add $\\epsilon$ to $\\text{FIRST}(X)$.

---

## 2. Computation of FOLLOW(A)
1. Add `$` (input endmarker) to $\\text{FOLLOW}(S)$, where $S$ is start symbol.
2. For production $A \\to \\alpha B \\beta$:
   - $\\text{FOLLOW}(B)$ contains $(\\text{FIRST}(\\beta) \\setminus \\{\\epsilon\\})$.
3. For $A \\to \\alpha B$ OR $A \\to \\alpha B \\beta$ where $\\beta \\to^* \\epsilon$:
   - Everything in $\\text{FOLLOW}(A)$ is added to $\\text{FOLLOW}(B)$.
   - **Crucial Rule:** $\\text{FOLLOW}$ sets never contain $\\epsilon$.
""",
        "questions": [
            {
                "id": "cd-ff-1",
                "question": "Can the empty string epsilon ever belong to the FOLLOW set of a non-terminal?",
                "options": [
                    "Yes, if the non-terminal derives epsilon",
                    "Yes, if the non-terminal is the start symbol",
                    "No, FOLLOW sets can never contain epsilon",
                    "Yes, in bottom-up parsers only"
                ],
                "correct_option": 2,
                "explanation": "FOLLOW(A) represents terminals appearing to the right of A. Epsilon is an empty string, not an input symbol, so it cannot follow a symbol."
            },
            {
                "id": "cd-ff-2",
                "question": "Given S -> AB, A -> a | epsilon, B -> b. What is FOLLOW(A)?",
                "options": ["{a}", "{b}", "{$, b}", "{epsilon, b}"],
                "correct_option": 1,
                "explanation": "In S -> AB, symbol B follows A. Thus FOLLOW(A) contains FIRST(B) = {b}. Since B cannot derive epsilon, FOLLOW(S) is not propagated."
            }
        ]
    },
    {
        "id": "cd-ll1-parsing",
        "slug": "ll1-parsing",
        "title": "LL(1) Parsing",
        "description": "Left-to-right scan, Leftmost derivation, 1 lookahead token. Eliminating left recursion, left factoring, and constructing LL(1) parsing tables.",
        "estimatedMinutes": 25,
        "difficulty": "Hard",
        "companyTags": ["Microsoft", "Adobe", "Qualcomm", "TCS"],
        "keyTakeaways": [
            "LL(1) Condition: For every non-terminal A with productions A -> alpha | beta, FIRST(alpha) and FIRST(beta) must be disjoint.",
            "If alpha derives epsilon, FIRST(beta) and FOLLOW(A) must be disjoint.",
            "Grammars with left recursion (immediate or indirect) can NEVER be LL(1).",
            "Ambiguous grammars can NEVER be LL(1)."
        ],
        "notesMarkdown": """# LL(1) Predictive Parsing

---

## 1. What does LL(1) mean?
- **L:** Left-to-right scan of the input.
- **L:** Leftmost derivation constructed.
- **1:** 1 token of lookahead used to determine production.

---

## 2. Necessary Conditions for LL(1)
For every non-terminal $A$ with productions $A \\to \\alpha \\mid \\beta$:
1. $\\text{FIRST}(\\alpha) \\cap \\text{FIRST}(\\beta) = \\emptyset$.
2. At most one of $\\alpha$ or $\\beta$ can derive $\\epsilon$.
3. If $\\beta \\to^* \\epsilon$, then $\\text{FIRST}(\\alpha) \\cap \\text{FOLLOW}(A) = \\emptyset$.

---

## 3. Eliminating Left Recursion
Immediate left recursion: $A \\to A\\alpha \\mid \\beta$ (where $\\beta$ does not start with $A$):
Replace with:
$$A \\to \\beta A'$$
$$A' \\to \\alpha A' \\mid \\epsilon$$
""",
        "questions": [
            {
                "id": "cd-ll1-1",
                "question": "Can a grammar with immediate left recursion (e.g. E -> E + T) be parsed by an LL(1) parser?",
                "options": [
                    "Yes, by using 2 tokens lookahead",
                    "No, because left recursion produces multiple entries in the same parsing table cell",
                    "Yes, if the grammar is unambiguous",
                    "Yes, if it has no epsilon productions"
                ],
                "correct_option": 1,
                "explanation": "Left recursion causes FIRST(A alpha) to include FIRST(beta), leading to multiply-defined entries in the LL(1) table."
            },
            {
                "id": "cd-ll1-2",
                "question": "If an LL(1) parse table cell has multiple production entries, what does it signify?",
                "options": [
                    "The input is valid",
                    "The grammar is not LL(1)",
                    "The grammar is regular",
                    "The parser requires 0 lookahead"
                ],
                "correct_option": 1,
                "explanation": "Multiple entries indicate parsing conflict (non-determinism), meaning the grammar cannot be deterministically parsed using LL(1)."
            }
        ]
    },
    {
        "id": "cd-lr-slr-clr-and-lalr-parsing",
        "slug": "lr-slr-clr-and-lalr-parsing",
        "title": "LR, SLR, CLR, and LALR Parsing",
        "description": "Bottom-up shift-reduce parsing, handles, LR(0) items, SLR(1) parsing, LR(1) items (CLR), and merged LALR(1) parsing tables.",
        "estimatedMinutes": 30,
        "difficulty": "Hard",
        "companyTags": ["Google", "Microsoft", "Intel", "NVIDIA"],
        "keyTakeaways": [
            "Parser Expressiveness Hierarchy: LR(0) < SLR(1) < LALR(1) < CLR(1).",
            "CLR(1) and LALR(1) have the exact same parsing power for error detection; LALR has significantly fewer states (identical to SLR/LR(0) state count).",
            "Merging states in LALR can NEVER produce Shift-Reduce (S-R) conflicts, but MAY introduce Reduce-Reduce (R-R) conflicts.",
            "All LL(1) grammars are LR(1), but not all LR(1) grammars are LL(1)."
        ],
        "notesMarkdown": """# LR Parsing Family (Shift-Reduce)

---

## 1. LR Parsing Overview
- **L:** Left-to-right scan.
- **R:** Rightmost derivation in reverse.
- **k:** Number of lookahead input symbols.

---

## 2. Comparing the LR Parsers
| Parser | Items Used | Lookahead for Reduce | State Count |
|---|---|---|---|
| **LR(0)** | $[A \\to \\alpha . \\beta]$ | None (reduce in all columns) | $N$ |
| **SLR(1)** | $[A \\to \\alpha . \\beta]$ | Follow of LHS ($\\text{FOLLOW}(A)$) | $N$ |
| **CLR(1)** | $[A \\to \\alpha . \\beta, a]$ | Exact propagated lookaheads | Much larger ($M \\gg N$) |
| **LALR(1)** | Merged CLR items with same core | Merged lookaheads | $N$ (same as SLR) |

---

## 3. LALR Conflict Rule
When merging CLR(1) states with identical LR(0) cores to create LALR(1):
- **Shift-Reduce conflicts are IMPOSSIBLE** to create.
- **Reduce-Reduce conflicts CAN arise**.
""",
        "questions": [
            {
                "id": "cd-lr-1",
                "question": "Which of the following conflicts can be newly introduced when merging states with identical cores from CLR(1) to form LALR(1)?",
                "options": ["Shift-Reduce conflict only", "Reduce-Reduce conflict only", "Both Shift-Reduce and Reduce-Reduce conflicts", "Neither conflict can be introduced"],
                "correct_option": 1,
                "explanation": "Merging cores cannot create Shift-Reduce conflicts (since shift depends on symbol, not lookahead), but can cause two reductions to share the same lookahead symbol, creating a Reduce-Reduce conflict."
            },
            {
                "id": "cd-lr-2",
                "question": "What is the relationship between the number of states in SLR(1) and LALR(1) parsing tables for the same grammar?",
                "options": [
                    "LALR(1) has more states than SLR(1)",
                    "SLR(1) has more states than LALR(1)",
                    "Both SLR(1) and LALR(1) have the exact same number of states",
                    "It depends on whether the grammar has epsilon productions"
                ],
                "correct_option": 2,
                "explanation": "LALR(1) merges states with the same LR(0) core, so the total number of states in LALR(1) is identical to LR(0) and SLR(1)."
            }
        ]
    },
    {
        "id": "cd-syntax-directed-translation",
        "slug": "syntax-directed-translation",
        "title": "Syntax-Directed Translation",
        "description": "Syntax-Directed Definitions (SDD), synthesized vs. inherited attributes, dependency graphs, S-attributed and L-attributed definitions.",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Oracle", "Cisco", "IBM"],
        "keyTakeaways": [
            "Synthesized attributes: Evaluated from children node values (bottom-up).",
            "Inherited attributes: Evaluated from parent or sibling node values (top-down or sideways).",
            "S-Attributed SDD: Uses ONLY synthesized attributes; easily evaluated during bottom-up LR parsing.",
            "L-Attributed SDD: Attributes depend on parent, left siblings, or synthesized attributes of self; evaluated in single left-to-right pass."
        ],
        "notesMarkdown": """# Syntax-Directed Translation (SDT)

---

## 1. Synthesized vs Inherited Attributes
- **Synthesized:** Node attribute computed from its children:
  $$A.val = f(X_1.val, X_2.val, \\dots)$$
- **Inherited:** Node attribute computed from its parent and/or left siblings:
  $$X_i.val = f(A.val, X_1.val, \\dots, X_{i-1}.val)$$
  *(Inherited attributes cannot depend on right siblings in L-attributed definitions).*

---

## 2. S-Attributed vs L-Attributed
- **S-Attributed:** Only synthesized attributes. Every S-attributed SDD is trivially L-attributed. Can be evaluated during Post-Order traversal or shift-reduce parsing.
- **L-Attributed:** Attributes can be synthesized or inherited, provided dependencies flow strictly left-to-right (no right-to-left dependencies).
""",
        "questions": [
            {
                "id": "cd-sdt-1",
                "question": "An S-attributed syntax-directed definition can be evaluated naturally during which parsing method?",
                "options": ["Top-down recursive descent", "Bottom-up shift-reduce parsing using a semantic stack", "Two-pass lexical scanning", "Pre-order traversal only"],
                "correct_option": 1,
                "explanation": "In bottom-up parsing, children are reduced before parents, perfectly matching synthesized attribute evaluation on a value stack."
            },
            {
                "id": "cd-sdt-2",
                "question": "In an L-attributed definition, an inherited attribute of a grammar symbol on the RHS can depend on:",
                "options": [
                    "Right siblings only",
                    "The parent and left siblings only",
                    "Any symbol in the parse tree",
                    "Follow sets of the LHS"
                ],
                "correct_option": 1,
                "explanation": "L-attributed definitions enforce a left-to-right dependency order; inherited attributes may only depend on the parent and left siblings."
            }
        ]
    },
    {
        "id": "cd-semantic-analysis",
        "slug": "semantic-analysis",
        "title": "Semantic Analysis",
        "description": "Static checking, type checking, type expressions, type equivalence (structural vs. name), and coercion.",
        "estimatedMinutes": 18,
        "difficulty": "Medium",
        "companyTags": ["Microsoft", "Google", "Adobe", "TCS Digital"],
        "keyTakeaways": [
            "Static Semantic Checks: Type checks, undeclared variables, duplicate identifier declarations.",
            "Dynamic Semantic Checks: Array bounds violations, division by zero (checked at runtime).",
            "Name Equivalence: Types are identical only if defined with the same name.",
            "Structural Equivalence: Types are identical if their underlying constituent structures match."
        ],
        "notesMarkdown": """# Semantic Analysis & Type Systems

---

## 1. Static vs. Dynamic Checks
- **Static Checking (Compile-time):** Type compatibility (`int x = "hello"`), variable declared before use, break statement outside loop.
- **Dynamic Checking (Runtime):** Null pointer dereference, divide by zero, array index out of bounds.

---

## 2. Type Equivalence
- **Name Equivalence:** Two types are equal if and only if they have the same type name.
- **Structural Equivalence:** Two types are equal if they have the same fields, components, and types, regardless of identifier names.
""",
        "questions": [
            {
                "id": "cd-sem-1",
                "question": "Which of the following errors is typically detected during the semantic analysis phase?",
                "options": [
                    "Missing closing parenthesis in an expression",
                    "Illegal character character symbol in source code",
                    "Assigning a string literal to an integer variable without casting",
                    "Infinite loop in a while construct"
                ],
                "correct_option": 2,
                "explanation": "Type mismatches between expressions and variables are static semantic errors verified during semantic analysis."
            },
            {
                "id": "cd-sem-2",
                "question": "What is the difference between Name Equivalence and Structural Equivalence?",
                "options": [
                    "Name equivalence compares type names; structural equivalence compares internal composition and fields",
                    "Name equivalence is evaluated at runtime, while structural is at compile-time",
                    "They are identical in C++",
                    "Structural equivalence applies only to primitive types"
                ],
                "correct_option": 0,
                "explanation": "Name equivalence requires identical type names, while structural equivalence inspects the shape and types of the component elements."
            }
        ]
    },
    {
        "id": "cd-intermediate-code-generation",
        "slug": "intermediate-code-generation",
        "title": "Intermediate Code Generation",
        "description": "Intermediate representations, syntax trees, Directed Acyclic Graphs (DAG), and benefits of machine-independent IR.",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Intel", "Qualcomm", "NVIDIA", "Amazon"],
        "keyTakeaways": [
            "IR decouples front-end from back-end: For M source languages and N targets, requires M + N compilers instead of M * N.",
            "DAG representation eliminates common subexpressions directly during IR construction.",
            "Syntax Tree: Retains structural hierarchy without concrete syntax details."
        ],
        "notesMarkdown": """# Intermediate Code Generation (ICG)

---

## 1. Why use Intermediate Code?
1. **Portability:** Front-ends for $M$ languages and back-ends for $N$ hardware targets require only $M + N$ components rather than $M \\times N$.
2. **Optimization:** Machine-independent optimizations can be performed directly on the IR.

---

## 2. DAG (Directed Acyclic Graph) for Expressions
Unlike a parse tree or syntax tree, a **DAG** detects and combines identical subexpressions into a single node with multiple inbound edges.
- Example: $a + a \\times (b - c) + (b - c) \\times d$ shares the $(b - c)$ subexpression node.
""",
        "questions": [
            {
                "id": "cd-icg-1",
                "question": "How does an intermediate representation (IR) benefit a compiler suite supporting M programming languages and N hardware architectures?",
                "options": [
                    "It requires M * N front-ends and back-ends",
                    "It reduces required compiler modules from M * N to M + N",
                    "It eliminates the need for lexical analysis",
                    "It converts bottom-up parsing into top-down parsing"
                ],
                "correct_option": 1,
                "explanation": "With a standard IR, each language requires 1 front-end to emit IR, and each architecture requires 1 back-end to consume IR (total M + N)."
            },
            {
                "id": "cd-icg-2",
                "question": "How does a DAG node differ from a syntax tree node for an expression with duplicate subexpressions?",
                "options": [
                    "DAG nodes have multiple parent pointers sharing common subexpression nodes",
                    "DAG nodes are always binary trees",
                    "Syntax trees have cycles",
                    "DAG cannot represent operator precedence"
                ],
                "correct_option": 0,
                "explanation": "In a DAG, common subexpressions are reused, meaning a shared node can have multiple parents (indegree > 1)."
            }
        ]
    },
    {
        "id": "cd-three-address-code",
        "slug": "three-address-code",
        "title": "Three-Address Code",
        "description": "Definition of Three-Address Code (TAC), quadruples, triples, and indirect triples representation.",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Microsoft", "Google", "Oracle", "Wipro"],
        "keyTakeaways": [
            "TAC instruction form: x = y op z (at most three memory references/addresses per statement).",
            "Quadruple: Record with 4 fields (op, arg1, arg2, result). Temporary names are explicit.",
            "Triple: Record with 3 fields (op, arg1, arg2). Results are referenced by position/index.",
            "Indirect Triples: Uses an array of pointers to triples, allowing easy reordering during optimization."
        ],
        "notesMarkdown": """# Three-Address Code (TAC)

---

## 1. Forms of Three-Address Code
Each TAC statement contains at most one operator on the right-hand side:
$$x = y \\text{ op } z$$
Complex expressions are flattened using compiler-generated temporaries $t_1, t_2, \\dots$.

---

## 2. Quadruples vs. Triples vs. Indirect Triples
- **Quadruple:** `(op, arg1, arg2, result)`
  - Explicit temporaries, easy to move code during optimization.
- **Triple:** `(op, arg1, arg2)`
  - Refers to intermediate results using statement index `(0)`, `(1)`. Reordering code requires updating all references.
- **Indirect Triple:** An array of pointers to triples. Code optimization reorders the pointer array without touching the triple memory records.
""",
        "questions": [
            {
                "id": "cd-tac-1",
                "question": "In compiler intermediate representations, which TAC implementation explicitly lists the destination temporary name?",
                "options": ["Triples", "Quadruples", "Indirect Triples", "Abstract Syntax Trees"],
                "correct_option": 1,
                "explanation": "Quadruples feature 4 fields: (op, arg1, arg2, result), where 'result' explicitly stores the temporary variable identifier."
            },
            {
                "id": "cd-tac-2",
                "question": "Why are indirect triples preferred over standard triples during code optimization?",
                "options": [
                    "They take up more memory",
                    "Statements can be moved or reordered simply by changing the pointer list without modifying statement indices",
                    "They eliminate the need for syntax analysis",
                    "They do not support binary operators"
                ],
                "correct_option": 1,
                "explanation": "Standard triples reference results by row index. Moving a triple breaks references. Indirect triples only reorder pointers in a separate array."
            }
        ]
    },
    {
        "id": "cd-runtime-environments",
        "slug": "runtime-environments",
        "title": "Runtime Environments",
        "description": "Storage organization, activation records (stack frames), activation trees, and scope management.",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Microsoft", "Intel", "Cisco"],
        "keyTakeaways": [
            "Memory Layout: Code (text), Static/Global, Run-time Stack (local variables, frame pointers), Heap (dynamic allocation).",
            "Activation Record: Contains return address, actual parameters, old frame pointer (dynamic link), saved registers, and local variables.",
            "Dynamic Link (Control Link): Points to the activation record of the caller function.",
            "Static Link (Access Link): Points to the activation record of the lexical (enclosing) parent function."
        ],
        "notesMarkdown": """# Runtime Environments & Activation Records

---

## 1. Runtime Memory Organization
```text
+-----------------------------------+ High Memory
| Stack (grows downwards)           |
|   Activation Records              |
|               v                   |
|               ^                   |
| Heap (grows upwards)              |
|   Dynamic Allocation (malloc)     |
+-----------------------------------+
| Static / Global Data              |
+-----------------------------------+
| Code Segment (Text)               | Low Memory
+-----------------------------------+
```

---

## 2. Activation Record Structure
1. Return value & Actual parameters
2. Control link (Dynamic link → caller's AR)
3. Access link (Static link → lexically enclosing scope's AR)
4. Saved machine status (Program counter, registers)
5. Local variables & compiler temporaries
""",
        "questions": [
            {
                "id": "cd-rte-1",
                "question": "In an activation record, what does the Dynamic Link (Control Link) point to?",
                "options": [
                    "The lexically enclosing function's frame",
                    "The activation record of the calling function",
                    "The top of the heap",
                    "The global symbol table"
                ],
                "correct_option": 1,
                "explanation": "The control link (dynamic link) points to the activation record of the caller function, allowing frame restoration upon return."
            },
            {
                "id": "cd-rte-2",
                "question": "What is the role of an Access Link (Static Link) in a runtime stack frame?",
                "options": [
                    "To return values to the caller",
                    "To access non-local variables in lexically enclosing scopes in languages supporting nested functions",
                    "To manage heap garbage collection",
                    "To track dynamic memory allocations"
                ],
                "correct_option": 1,
                "explanation": "Static links point to the activation record of the immediately enclosing static (lexical) parent, enabling access to outer scope variables."
            }
        ]
    },
    {
        "id": "cd-symbol-tables",
        "slug": "symbol-tables",
        "title": "Symbol Tables",
        "description": "Design and data structures for symbol tables (hash tables, trees), scope handling, and identifier attributes.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Google", "Oracle", "Infosys", "Cognizant"],
        "keyTakeaways": [
            "Symbol table stores identifier metadata: name, type, scope, memory offset, parameter list.",
            "Hash tables with chaining provide O(1) expected lookup and insertion.",
            "Block-structured languages manage nested scopes using a stack of symbol tables or chained scope pointers.",
            "Accessed by virtually every phase of the compiler."
        ],
        "notesMarkdown": """# Symbol Table Management

---

## 1. Role of the Symbol Table
The symbol table records information about source program identifiers:
- **Attributes:** Type, size, storage class, scope level, offset, parameter types.
- Populated primarily by Lexical and Syntax analyzers, queried by Semantic analysis, Optimization, and Code Generation.

---

## 2. Scope Handling in Block-Structured Languages
- **Stack of Tables:** Entering a block `{` pushes a new local symbol table. Exiting `}` pops it.
- **Lookup Rule:** Search starts from the top table (innermost local scope) down to the base table (global scope).
""",
        "questions": [
            {
                "id": "cd-st-1",
                "question": "Which data structure provides the fastest average time complexity for symbol table lookups and insertions?",
                "options": ["Linear linked list", "Binary search tree", "Hash table", "Queue"],
                "correct_option": 2,
                "explanation": "Hash tables offer O(1) expected average time complexity for both identifier insertion and lookup operations."
            },
            {
                "id": "cd-st-2",
                "question": "How do compilers for block-structured languages (like C/Java) typically resolve shadowed variable names?",
                "options": [
                    "By searching scopes from innermost to outermost",
                    "By searching the global scope first",
                    "By throwing a syntax error on duplicate names in different scopes",
                    "By hashing the variable with a random salt"
                ],
                "correct_option": 0,
                "explanation": "Scoped lookup begins in the innermost current block; the first match found shadows any outer declarations."
            }
        ]
    },
    {
        "id": "cd-memory-allocation",
        "slug": "memory-allocation",
        "title": "Memory Allocation",
        "description": "Static allocation, stack allocation, heap allocation, and garbage collection strategies (reference counting, mark-and-sweep).",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Microsoft", "Adobe", "Qualcomm"],
        "keyTakeaways": [
            "Static allocation: Fixed addresses bound at compile time; cannot support recursion or dynamic data structures (e.g. early Fortran).",
            "Stack allocation: Managed LIFO for procedure calls; fully supports recursion.",
            "Heap allocation: Dynamic allocation in arbitrary order; requires explicit free or automated garbage collection.",
            "Garbage collection: Mark-and-sweep, copying collectors, reference counting."
        ],
        "notesMarkdown": """# Memory Allocation Strategies

---

## 1. Allocation Strategies
1. **Static Allocation:**
   - Memory addresses are fixed before program execution.
   - Disallows recursion (multiple instances of a function would overwrite the same frame).
2. **Stack Allocation:**
   - Push frame on call, pop frame on return. Supports recursive calls and dynamic array sizing at invocation time.
3. **Heap Allocation:**
   - Memory dynamically allocated and deallocated in arbitrary order. Used when object lifetimes outlive function calls.

---

## 2. Garbage Collection
- **Reference Counting:** Counts incoming pointers; fails to reclaim cyclic references.
- **Mark-and-Sweep:** Traverses reachable objects from roots (stack, registers) and marks them; sweeps and frees unmarked heap objects.
""",
        "questions": [
            {
                "id": "cd-mem-1",
                "question": "Why does a language using strictly static memory allocation fail to support recursive function calls?",
                "options": [
                    "Static memory lacks heap space",
                    "All local variables and return addresses for a procedure share one fixed memory location, causing recursive invocations to overwrite previous states",
                    "Compilers cannot parse recursive grammar",
                    "Static allocation only works with integer types"
                ],
                "correct_option": 1,
                "explanation": "With static allocation, only a single copy of a procedure's activation record exists in memory, corrupting callers when invoked recursively."
            },
            {
                "id": "cd-mem-2",
                "question": "What is the primary flaw of naive reference counting garbage collection?",
                "options": [
                    "It has high pause times",
                    "It cannot reclaim cyclic references between unreachable objects",
                    "It requires moving objects in memory",
                    "It only works with primitive variables"
                ],
                "correct_option": 1,
                "explanation": "If object A references object B and B references A, their reference counts never drop to 0 even if the cycle is disconnected from the root."
            }
        ]
    },
    {
        "id": "cd-code-optimization",
        "slug": "code-optimization",
        "title": "Code Optimization",
        "description": "Basic blocks and flow graphs, local optimizations (constant folding, copy propagation, dead code elimination), loop optimizations (loop invariant code motion, induction variables, strength reduction).",
        "estimatedMinutes": 25,
        "difficulty": "Hard",
        "companyTags": ["Google", "Intel", "NVIDIA", "Microsoft"],
        "keyTakeaways": [
            "Basic Block: Sequence of consecutive statements with one entry point (no jumps in) and one exit point (no branches except at the end).",
            "Constant Folding: Evaluating constant expressions at compile-time (e.g. 3 * 7 -> 21).",
            "Copy Propagation: Replacing uses of variable with its assigned source (x = y; z = x + 1 -> z = y + 1).",
            "Loop Invariant Code Motion: Moving computations that do not change inside loop iterations outside the loop.",
            "Strength Reduction: Replacing expensive operations with cheaper ones (e.g. replacing multiplication with addition in loops)."
        ],
        "notesMarkdown": """# Code Optimization

---

## 1. Basic Blocks & Control Flow Graphs (CFG)
- **Leader Identification:**
  1. The first statement of the program is a leader.
  2. Any statement that is the target of a conditional/unconditional jump is a leader.
  3. Any statement immediately following a jump is a leader.
- A **Basic Block** starts at a leader and includes all statements up to (but excluding) the next leader.

---

## 2. Common Optimizations
- **Constant Folding & Propagation:** Pre-evaluating known constant expressions at compile-time.
- **Dead Code Elimination:** Removing instructions whose results are never read or utilized.
- **Loop Invariant Code Motion (Hoisting):** Moving statements whose operands remain unchanged throughout loop iterations outside the loop preheader.
- **Strength Reduction:** Replacing costly operators with cheaper alternatives (e.g., $i \\times 4$ replaced with iterative addition $+4$).
""",
        "questions": [
            {
                "id": "cd-opt-1",
                "question": "Replacing the expression 'x = i * 4' inside a loop with an increment 'x = x + 4' across iterations is an example of which optimization?",
                "options": ["Constant Folding", "Strength Reduction", "Loop Unrolling", "Dead Code Elimination"],
                "correct_option": 1,
                "explanation": "Strength reduction replaces an expensive operation (multiplication) with an equivalent cheaper operation (addition)."
            },
            {
                "id": "cd-opt-2",
                "question": "Which of the following statements identifies a 'leader' in a basic block partitioning algorithm?",
                "options": [
                    "Every return statement",
                    "Any target of a conditional or unconditional branch instruction",
                    "Every assignment statement",
                    "Only the final statement of the program"
                ],
                "correct_option": 1,
                "explanation": "Branch targets, the first program statement, and statements immediately following a branch instruction are leaders."
            }
        ]
    },
    {
        "id": "cd-target-code-generation",
        "slug": "target-code-generation",
        "title": "Target Code Generation",
        "description": "Register allocation and assignment, instruction selection, peephole optimization, and generation of machine code.",
        "estimatedMinutes": 22,
        "difficulty": "Hard",
        "companyTags": ["Intel", "Qualcomm", "Apple", "AMD"],
        "keyTakeaways": [
            "Register Allocation: Selecting which variables reside in physical CPU registers.",
            "Register Assignment: Picking the specific hardware register for a designated variable.",
            "Graph Coloring: Formulates register allocation as K-coloring of the interference graph (NP-complete).",
            "Peephole Optimization: Local window inspection over small target code chunks to eliminate redundant loads/stores and jumps."
        ],
        "notesMarkdown": """# Target Code Generation & Register Allocation

---

## 1. Key Challenges in Code Generation
1. **Instruction Selection:** Choosing appropriate hardware instructions for intermediate TAC operations.
2. **Register Allocation & Assignment:**
   - Register Allocation: Decides which variables reside in registers vs. memory.
   - Register Assignment: Assigns variables to specific physical registers.
3. **Instruction Scheduling:** Reordering instructions to minimize CPU pipeline stalls.

---

## 2. Register Allocation via Graph Coloring
- **Interference Graph:** Nodes are variables (live ranges); edges exist between variables that are simultaneously live.
- Assigning $K$ available registers corresponds to **$K$-coloring the interference graph**. If a graph cannot be $K$-colored, variables must be spilled to RAM.

---

## 3. Peephole Optimization
A simple yet effective technique that examines a small sliding window ("peephole") of generated target instructions:
- Redundant load/store elimination (`MOV R0, a; MOV a, R0`).
- Unreachable code elimination.
- Flow-of-control optimizations (jumps to jumps).
- Algebraic simplifications ($x \\times 1 \\to x$, $x + 0 \\to x$).
""",
        "questions": [
            {
                "id": "cd-tcg-1",
                "question": "Register allocation in modern optimizing compilers is frequently modeled using which classical problem?",
                "options": [
                    "Traveling Salesperson Problem",
                    "Graph Coloring of the register interference graph",
                    "Knapsack Problem",
                    "Minimum Spanning Tree"
                ],
                "correct_option": 1,
                "explanation": "Chaitin's formulation models register allocation as K-coloring of the variable interference graph, where K is the number of registers."
            },
            {
                "id": "cd-tcg-2",
                "question": "What is Peephole Optimization?",
                "options": [
                    "A global data-flow analysis algorithm across procedures",
                    "A technique that examines a small sliding window of target instructions to eliminate local redundancies",
                    "An algorithm for LL(1) parsing",
                    "A garbage collection strategy"
                ],
                "correct_option": 1,
                "explanation": "Peephole optimization inspects a short sequence (window) of target instructions, performing localized simplifications like redundant store elimination."
            }
        ]
    }
]

# Ensure youtube_url is present on all
for t in topics_data:
    if "youtube_url" not in t or not t["youtube_url"]:
        t["youtube_url"] = make_yt_url(t["title"])

category = {
    "id": "compiler-design",
    "slug": "compiler-design",
    "title": "Compiler Design (CD)",
    "description": "Lexical analysis, top-down and bottom-up parsing, syntax-directed translation, intermediate code, and code optimization.",
    "icon": "Terminal",
    "topics": topics_data
}

ts_content = f"""import type {{ SectionCategory }} from './types';

export const COMPILER_DESIGN_CATEGORY: SectionCategory = {json.dumps(category, indent=2)};
"""

with open("src/lib/data/curriculum/compiler-design.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated Compiler Design module with {len(topics_data)} topics successfully!")
