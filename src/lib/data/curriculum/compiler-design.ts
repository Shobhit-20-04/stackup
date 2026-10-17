import type { SectionCategory } from './types';

export const COMPILER_DESIGN_CATEGORY: SectionCategory = {
  "id": "compiler-design",
  "slug": "compiler-design",
  "title": "Compiler Design (CD)",
  "description": "Lexical analysis, top-down and bottom-up parsing, syntax-directed translation, intermediate code, and code optimization.",
  "icon": "Terminal",
  "topics": [
    {
      "id": "cd-compiler-architecture",
      "slug": "compiler-architecture",
      "title": "Compiler Architecture",
      "description": "Phases of a compiler (analysis and synthesis), front-end vs. back-end, passes vs. phases, and cousins of the compiler (interpreters, assemblers, linkers, loaders).",
      "estimatedMinutes": 15,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Microsoft",
        "Intel",
        "Qualcomm"
      ],
      "keyTakeaways": [
        "Analysis Phase (Front-end): Lexical, Syntax, and Semantic analysis - machine independent.",
        "Synthesis Phase (Back-end): Intermediate code generation, Optimization, Target code generation - machine dependent.",
        "Pass: One complete traversal of the source program or intermediate representation.",
        "Phase: Logical operational step within the compilation pipeline."
      ],
      "notesMarkdown": "# Compiler Architecture & Phases\n\n---\n\n## 1. Analysis vs. Synthesis\nA compiler maps high-level source code into low-level machine code through two primary stages:\n1. **Analysis (Front-End / Machine Independent):**\n   - **Lexical Analyzer (Scanner):** Character stream → Token stream.\n   - **Syntax Analyzer (Parser):** Tokens → Parse tree / AST according to Context-Free Grammar.\n   - **Semantic Analyzer:** Type checking, scope resolution, semantic consistency.\n2. **Synthesis (Back-End / Machine Dependent):**\n   - **Intermediate Code Generator (ICG):** Generates machine-neutral Three-Address Code (TAC).\n   - **Code Optimizer:** Eliminates redundancies, dead code, loops optimization to improve speed/space.\n   - **Target Code Generator:** Converts TAC into relocatable machine code or assembly.\n\n---\n\n## 2. Passes vs. Phases\n- **Phase:** A logical organization of the compiler task.\n- **Pass:** A physical reading of the source program or intermediate representation from disk/memory. Multi-pass compilers reduce memory consumption at the cost of disk I/O.\n",
      "questions": [
        {
          "id": "cd-arch-1",
          "question": "Which phase of a compiler is responsible for checking type consistency and scope resolution?",
          "options": [
            "Lexical Analysis",
            "Syntax Analysis",
            "Semantic Analysis",
            "Intermediate Code Generation"
          ],
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
        },
        {
          "id": "cd-arch-3",
          "question": "Which component of compiler infrastructure manages identifier attributes (scope, type, location) across all phases?",
          "options": [
            "Symbol Table",
            "Lexical Analyzer",
            "Instruction Selector",
            "Code Generator"
          ],
          "correct_option": 0,
          "explanation": "The Symbol Table is the central data repository created by the front-end (lexical/syntax) and queried by subsequent phases to store and retrieve type, scope, and memory location attributes."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Compiler+Architecture+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-lexical-analysis",
      "slug": "lexical-analysis",
      "title": "Lexical Analysis",
      "description": "Role of lexical analyzer, tokens, patterns, lexemes, input buffering, regular definitions, and transition diagrams.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Cisco",
        "NVIDIA",
        "Adobe"
      ],
      "keyTakeaways": [
        "Lexeme: Concrete sequence of characters in the source code matching a token pattern.",
        "Token: Abstract terminal symbol passed to parser: (token_name, attribute_value).",
        "Input Buffering: Two-buffer scheme with sentinels avoids frequent disk reads and EOF checks.",
        "Lexical errors: Character that cannot be grouped into any valid token."
      ],
      "notesMarkdown": "# Lexical Analysis (Scanning)\n\nLexical Analysis is the first phase of the classical compiler pipeline. Its primary role is to convert an unformatted stream of source code characters into a discrete sequence of **Tokens**, stripping out superfluous whitespace, tabs, and source comments, while populating initial entries into the Symbol Table.\n\n---\n\n## 1. Core Terminology: Token, Lexeme, and Pattern\n\nUnderstanding the distinction between these three terms is essential for compiler engineering:\n\n| Concept | Formal Definition | Concrete Example in C |\n| :--- | :--- | :--- |\n| **Token** | Abstract syntactic category passed as a terminal symbol to the parser, represented as a tuple: `<token_name, attribute_value>`. | `<KEYWORD, \"while\">`, `<ID, ptr_to_symtab>`, `<NUM, 42>`, `<RELOP, LE>` |\n| **Lexeme** | The concrete character sequence in source code that matches a pattern for a token. | `while`, `total_sum`, `3.14159`, `<=`, `\"hello\"` |\n| **Pattern** | The formal specification (regular expression) describing the set of all possible lexemes forming a token. | `[a-zA-Z_][a-zA-Z0-9_]*` for identifier; `[0-9]+` for integer |\n\n---\n\n## 2. Input Buffering with Sentinels\n\nBecause reading from secondary storage one character at a time incurs prohibitive I/O overhead, lexical analyzers use a **Two-Buffer Scheme** paired with **Sentinels**:\n- Two buffers of size $N$ (typically matched to disk block size, e.g., 4096 bytes) are alternately filled via block reads.\n- Two pointers navigate the text:\n  - `lexemeBegin`: Marks the start of the current token being scanned.\n  - `forward`: Moves ahead inspecting lookahead characters until a complete pattern match is recognized.\n- **The Sentinel Optimization:** Appending a special sentinel character (`EOF`) at the end of each buffer reduces the inner scanning loop from **two conditional branch tests** (`if (forward at end of buffer) ... if (*forward == char) ...`) to **one single test** per character.\n\n```\nBuffer 1 (Size N)                Buffer 2 (Size N)\n[ i | f |   | ( | x |   | > | = | EOF ] [   | 0 | ) |   | { |   |   |   | EOF ]\n  ^\t\t\t\t  ^\n  lexemeBegin             forward (lookahead)\n```\n\n---\n\n## 3. Regular Expressions to Deterministic Finite Automata (DFA)\n\nProduction scanners (like Lex and Flex) automate scanner generation via three mathematical transformations:\n1. **Thompson's Construction:** Converts regular expressions into an equivalent Non-Deterministic Finite Automaton (NFA) with $\\epsilon$-transitions in $O(|r|)$ time.\n2. **Subset Construction (Powerset Algorithm):** Eliminates non-determinism, constructing a Deterministic Finite Automaton (DFA) where each state represents a set of NFA states.\n3. **Hopcroft's DFA Minimization:** Merges equivalent states to produce the minimal DFA with the fewest possible states.\n\n---\n\n## 4. Conflict Resolution Rules\n\nWhen multiple patterns match the input character stream:\n1. **Longest Match (Maximal Munch Rule):** The scanner always prefers the longest possible prefix that matches a pattern. For instance, when encountering `<=`, it yields the single token `RELOP(LE)` rather than two tokens `<` and `=`.\n2. **First Rule Priority (Keyword Precedence):** When a lexeme matches both an Identifier pattern and a Reserved Keyword pattern (e.g. `while`), the rule listed first in the specification takes precedence, classifying it as a Keyword.\n\n---\n\n## 5. Lexical Error Recovery\n\nIf the scanner encounters a character that does not match any token pattern:\n- **Panic Mode:** Discards the invalid character and resumes scanning from the next character.\n- **Character Transformations:** Deleting extraneous characters, inserting expected missing characters, or swapping adjacent transposed characters.\n",
      "questions": [
        {
          "id": "cd-lex-1",
          "question": "In the statement 'int count = 42;', how many tokens are identified by a standard C lexical analyzer?",
          "options": [
            "4",
            "5",
            "6",
            "7"
          ],
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
        },
        {
          "id": "cd-lex-3",
          "question": "When scanning tokens, how does a lexical analyzer resolve conflicts when multiple patterns match the input prefix?",
          "options": [
            "Longest Match (Maximal Munch) first, followed by First Specified Pattern in rule order.",
            "Shortest Match first.",
            "Random selection among matching NFAs.",
            "Always prefers identifier tokens over keywords."
          ],
          "correct_option": 0,
          "explanation": "Lexical analyzers (like Lex/Flex) resolve ambiguity via two rules: 1) Longest Match (Maximal Munch) prefers the token consuming the most characters, 2) First Rule in the specification file breaks ties (e.g., 'if' matched as keyword rather than identifier)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Lexical+Analysis+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-syntax-analysis-and-parsing",
      "slug": "syntax-analysis-and-parsing",
      "title": "Syntax Analysis and Parsing",
      "description": "Role of the parser, Context-Free Grammars (CFG), ambiguity in grammars, parse trees, top-down vs. bottom-up parsing strategies.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Microsoft",
        "Oracle",
        "Uber",
        "TCS Digital"
      ],
      "keyTakeaways": [
        "CFG: 4-tuple G = (V, Sigma, R, S) generating context-free languages.",
        "Ambiguous Grammar: Produces two or more distinct parse trees (or leftmost derivations) for the same string.",
        "Top-down parsing: Builds tree from root (Start symbol) to leaves (terminals).",
        "Bottom-up parsing: Reduces leaves (terminals) to root (Start symbol)."
      ],
      "notesMarkdown": "# Syntax Analysis & Parsing\n\n---\n\n## 1. Context-Free Grammars (CFG)\nA CFG is defined as $G = (V, \\Sigma, R, S)$:\n- $V$: Non-terminals / Variables\n- $\\Sigma$: Terminals (Tokens)\n- $R$: Production rules $A \\to \\alpha$ where $A \\in V, \\alpha \\in (V \\cup \\Sigma)^*$\n- $S$: Start symbol ($S \\in V$)\n\n---\n\n## 2. Ambiguity\nA grammar is **ambiguous** if there exists at least one string $w \\in L(G)$ that has:\n- Two or more distinct parse trees, OR\n- Two or more distinct leftmost derivations (LMD), OR\n- Two or more distinct rightmost derivations (RMD).\n\n> Note: Grammar ambiguity is undecidable in general. Common ambiguous constructs include the **dangling-else problem**.\n",
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
        },
        {
          "id": "cd-parse-3",
          "question": "Why can top-down recursive-descent parsers NOT handle grammars containing Left Recursion?",
          "options": [
            "Left recursion causes infinite recursive descent calls without consuming any input tokens.",
            "Left recursion makes the grammar ambiguous.",
            "Left recursion requires a deterministic finite automaton.",
            "Left recursive grammars cannot generate terminal strings."
          ],
          "correct_option": 0,
          "explanation": "In top-down parsing, a rule A -> A alpha forces the parser to recursively call procedure A() immediately before consuming any terminal token, leading to an infinite loop and call stack overflow."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Syntax+Analysis+and+Parsing+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-first-and-follow-sets",
      "slug": "first-and-follow-sets",
      "title": "FIRST and FOLLOW Sets",
      "description": "Computation rules for FIRST and FOLLOW sets, handling epsilon productions, and their vital role in predictive parsing tables.",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Infosys",
        "Wipro"
      ],
      "keyTakeaways": [
        "FIRST(alpha): Set of terminals that begin strings derived from alpha; can contain epsilon.",
        "FOLLOW(A): Set of terminals that can appear immediately to the right of non-terminal A; NEVER contains epsilon; contains $ for Start symbol.",
        "If A -> alpha B beta: FOLLOW(B) includes (FIRST(beta) \\ {epsilon}).",
        "If beta ->* epsilon: FOLLOW(B) includes FOLLOW(A)."
      ],
      "notesMarkdown": "# FIRST and FOLLOW Sets\n\n---\n\n## 1. Computation of FIRST(X)\n1. If $X$ is a terminal, $\\text{FIRST}(X) = \\{X\\}$.\n2. If $X \\to \\epsilon$, then $\\epsilon \\in \\text{FIRST}(X)$.\n3. If $X \\to Y_1 Y_2 \\dots Y_k$:\n   - Add all non-$\\epsilon$ symbols of $\\text{FIRST}(Y_1)$ to $\\text{FIRST}(X)$.\n   - If $Y_1 \\to^* \\epsilon$, add $\\text{FIRST}(Y_2) \\setminus \\{\\epsilon\\}$, and so on.\n   - If all $Y_i \\to^* \\epsilon$, add $\\epsilon$ to $\\text{FIRST}(X)$.\n\n---\n\n## 2. Computation of FOLLOW(A)\n1. Add `$` (input endmarker) to $\\text{FOLLOW}(S)$, where $S$ is start symbol.\n2. For production $A \\to \\alpha B \\beta$:\n   - $\\text{FOLLOW}(B)$ contains $(\\text{FIRST}(\\beta) \\setminus \\{\\epsilon\\})$.\n3. For $A \\to \\alpha B$ OR $A \\to \\alpha B \\beta$ where $\\beta \\to^* \\epsilon$:\n   - Everything in $\\text{FOLLOW}(A)$ is added to $\\text{FOLLOW}(B)$.\n   - **Crucial Rule:** $\\text{FOLLOW}$ sets never contain $\\epsilon$.\n",
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
          "options": [
            "{a}",
            "{b}",
            "{$, b}",
            "{epsilon, b}"
          ],
          "correct_option": 1,
          "explanation": "In S -> AB, symbol B follows A. Thus FOLLOW(A) contains FIRST(B) = {b}. Since B cannot derive epsilon, FOLLOW(S) is not propagated."
        },
        {
          "id": "cd-ff-3",
          "question": "For the start symbol S of a grammar, which special terminal symbol is always included in FOLLOW(S) by definition?",
          "options": [
            "$ (the input end-marker)",
            "epsilon (the empty string)",
            "# (the null reduction marker)",
            "No symbol is present until derived"
          ],
          "correct_option": 0,
          "explanation": "By definition, the input end-marker '$' is always placed in FOLLOW(S) for the grammar start symbol S, representing the end of valid input."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=FIRST+and+FOLLOW+Sets+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-ll1-parsing",
      "slug": "ll1-parsing",
      "title": "LL(1) Parsing",
      "description": "Left-to-right scan, Leftmost derivation, 1 lookahead token. Eliminating left recursion, left factoring, and constructing LL(1) parsing tables.",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Microsoft",
        "Adobe",
        "Qualcomm",
        "TCS"
      ],
      "keyTakeaways": [
        "LL(1) Condition: For every non-terminal A with productions A -> alpha | beta, FIRST(alpha) and FIRST(beta) must be disjoint.",
        "If alpha derives epsilon, FIRST(beta) and FOLLOW(A) must be disjoint.",
        "Grammars with left recursion (immediate or indirect) can NEVER be LL(1).",
        "Ambiguous grammars can NEVER be LL(1)."
      ],
      "notesMarkdown": "# LL(1) Predictive Parsing\n\n---\n\n## 1. What does LL(1) mean?\n- **L:** Left-to-right scan of the input.\n- **L:** Leftmost derivation constructed.\n- **1:** 1 token of lookahead used to determine production.\n\n---\n\n## 2. Necessary Conditions for LL(1)\nFor every non-terminal $A$ with productions $A \\to \\alpha \\mid \\beta$:\n1. $\\text{FIRST}(\\alpha) \\cap \\text{FIRST}(\\beta) = \\emptyset$.\n2. At most one of $\\alpha$ or $\\beta$ can derive $\\epsilon$.\n3. If $\\beta \\to^* \\epsilon$, then $\\text{FIRST}(\\alpha) \\cap \\text{FOLLOW}(A) = \\emptyset$.\n\n---\n\n## 3. Eliminating Left Recursion\nImmediate left recursion: $A \\to A\\alpha \\mid \\beta$ (where $\\beta$ does not start with $A$):\nReplace with:\n$$A \\to \\beta A'$$\n$$A' \\to \\alpha A' \\mid \\epsilon$$\n",
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
        },
        {
          "id": "cd-ll1-3",
          "question": "What is the necessary and sufficient condition for a grammar to be LL(1)?",
          "options": [
            "For every production A -> alpha | beta: FIRST(alpha) and FIRST(beta) are disjoint, and if beta derives epsilon, FIRST(alpha) and FOLLOW(A) are disjoint.",
            "The grammar must be right-recursive only.",
            "The grammar must contain zero epsilon-productions.",
            "The grammar must be LR(0)."
          ],
          "correct_option": 0,
          "explanation": "A grammar is LL(1) iff for all A -> alpha | beta: 1) FIRST(alpha) intersect FIRST(beta) = empty, 2) At most one of alpha, beta can derive epsilon, 3) If beta =>* epsilon, then FIRST(alpha) intersect FOLLOW(A) = empty."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=LL%281%29+Parsing+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-lr-slr-clr-and-lalr-parsing",
      "slug": "lr-slr-clr-and-lalr-parsing",
      "title": "LR, SLR, CLR, and LALR Parsing",
      "description": "Bottom-up shift-reduce parsing, handles, LR(0) items, SLR(1) parsing, LR(1) items (CLR), and merged LALR(1) parsing tables.",
      "estimatedMinutes": 30,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Intel",
        "NVIDIA"
      ],
      "keyTakeaways": [
        "Parser Expressiveness Hierarchy: LR(0) < SLR(1) < LALR(1) < CLR(1).",
        "CLR(1) and LALR(1) have the exact same parsing power for error detection; LALR has significantly fewer states (identical to SLR/LR(0) state count).",
        "Merging states in LALR can NEVER produce Shift-Reduce (S-R) conflicts, but MAY introduce Reduce-Reduce (R-R) conflicts.",
        "All LL(1) grammars are LR(1), but not all LR(1) grammars are LL(1)."
      ],
      "notesMarkdown": "# LR Parsing Family (Shift-Reduce)\n\n---\n\n## 1. LR Parsing Overview\n- **L:** Left-to-right scan.\n- **R:** Rightmost derivation in reverse.\n- **k:** Number of lookahead input symbols.\n\n---\n\n## 2. Comparing the LR Parsers\n| Parser | Items Used | Lookahead for Reduce | State Count |\n|---|---|---|---|\n| **LR(0)** | $[A \\to \\alpha . \\beta]$ | None (reduce in all columns) | $N$ |\n| **SLR(1)** | $[A \\to \\alpha . \\beta]$ | Follow of LHS ($\\text{FOLLOW}(A)$) | $N$ |\n| **CLR(1)** | $[A \\to \\alpha . \\beta, a]$ | Exact propagated lookaheads | Much larger ($M \\gg N$) |\n| **LALR(1)** | Merged CLR items with same core | Merged lookaheads | $N$ (same as SLR) |\n\n---\n\n## 3. LALR Conflict Rule\nWhen merging CLR(1) states with identical LR(0) cores to create LALR(1):\n- **Shift-Reduce conflicts are IMPOSSIBLE** to create.\n- **Reduce-Reduce conflicts CAN arise**.\n",
      "questions": [
        {
          "id": "cd-lr-1",
          "question": "Which of the following conflicts can be newly introduced when merging states with identical cores from CLR(1) to form LALR(1)?",
          "options": [
            "Shift-Reduce conflict only",
            "Reduce-Reduce conflict only",
            "Both Shift-Reduce and Reduce-Reduce conflicts",
            "Neither conflict can be introduced"
          ],
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
        },
        {
          "id": "cd-lr-3",
          "question": "Which of the following correctly orders bottom-up parsers from least expressive to most expressive in the classes of grammars they can parse without conflict?",
          "options": [
            "LR(0) < SLR(1) < LALR(1) < CLR(1)",
            "LR(0) < LALR(1) < SLR(1) < CLR(1)",
            "SLR(1) < LR(0) < LALR(1) < CLR(1)",
            "LR(0) < SLR(1) = CLR(1) < LALR(1)"
          ],
          "correct_option": 0,
          "explanation": "Every LR(0) grammar is SLR(1), every SLR(1) grammar is LALR(1), and every LALR(1) grammar is CLR(1). Thus, the strict expressive hierarchy is LR(0) subset of SLR(1) subset of LALR(1) subset of CLR(1)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=LR%2C+SLR%2C+CLR%2C+and+LALR+Parsing+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-syntax-directed-translation",
      "slug": "syntax-directed-translation",
      "title": "Syntax-Directed Translation",
      "description": "Syntax-Directed Definitions (SDD), synthesized vs. inherited attributes, dependency graphs, S-attributed and L-attributed definitions.",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Oracle",
        "Cisco",
        "IBM"
      ],
      "keyTakeaways": [
        "Synthesized attributes: Evaluated from children node values (bottom-up).",
        "Inherited attributes: Evaluated from parent or sibling node values (top-down or sideways).",
        "S-Attributed SDD: Uses ONLY synthesized attributes; easily evaluated during bottom-up LR parsing.",
        "L-Attributed SDD: Attributes depend on parent, left siblings, or synthesized attributes of self; evaluated in single left-to-right pass."
      ],
      "notesMarkdown": "# Syntax-Directed Translation (SDT)\n\n---\n\n## 1. Synthesized vs Inherited Attributes\n- **Synthesized:** Node attribute computed from its children:\n  $$A.val = f(X_1.val, X_2.val, \\dots)$$\n- **Inherited:** Node attribute computed from its parent and/or left siblings:\n  $$X_i.val = f(A.val, X_1.val, \\dots, X_{i-1}.val)$$\n  *(Inherited attributes cannot depend on right siblings in L-attributed definitions).*\n\n---\n\n## 2. S-Attributed vs L-Attributed\n- **S-Attributed:** Only synthesized attributes. Every S-attributed SDD is trivially L-attributed. Can be evaluated during Post-Order traversal or shift-reduce parsing.\n- **L-Attributed:** Attributes can be synthesized or inherited, provided dependencies flow strictly left-to-right (no right-to-left dependencies).\n",
      "questions": [
        {
          "id": "cd-sdt-1",
          "question": "An S-attributed syntax-directed definition can be evaluated naturally during which parsing method?",
          "options": [
            "Top-down recursive descent",
            "Bottom-up shift-reduce parsing using a semantic stack",
            "Two-pass lexical scanning",
            "Pre-order traversal only"
          ],
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
        },
        {
          "id": "cd-sdt-3",
          "question": "What characterizes an S-attributed Syntax-Directed Definition (SDD)?",
          "options": [
            "It contains synthesized attributes only and can be naturally evaluated during bottom-up parsing.",
            "It contains inherited attributes only evaluated top-down.",
            "Attributes are evaluated in reverse topological order.",
            "It requires multiple passes over the parse tree."
          ],
          "correct_option": 0,
          "explanation": "An S-attributed definition uses strictly synthesized attributes (values computed exclusively from children nodes in the parse tree). It can be directly evaluated during bottom-up LR parsing on reductions."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Syntax-Directed+Translation+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-semantic-analysis",
      "slug": "semantic-analysis",
      "title": "Semantic Analysis",
      "description": "Static checking, type checking, type expressions, type equivalence (structural vs. name), and coercion.",
      "estimatedMinutes": 18,
      "difficulty": "Medium",
      "companyTags": [
        "Microsoft",
        "Google",
        "Adobe",
        "TCS Digital"
      ],
      "keyTakeaways": [
        "Static Semantic Checks: Type checks, undeclared variables, duplicate identifier declarations.",
        "Dynamic Semantic Checks: Array bounds violations, division by zero (checked at runtime).",
        "Name Equivalence: Types are identical only if defined with the same name.",
        "Structural Equivalence: Types are identical if their underlying constituent structures match."
      ],
      "notesMarkdown": "# Semantic Analysis & Type Systems\n\nSemantic analysis is the third phase of the compiler frontend. While syntax analysis ensures that a program adheres to context-free grammatical rules, semantic analysis validates whether the syntactically valid structure carries legitimate mathematical and logical meaning according to language semantics. It consumes an Abstract Syntax Tree (AST) and outputs a **Decorated (Annotated) AST** enriched with type information and attribute bindings.\n\n---\n\n## 1. Static vs. Dynamic Semantic Checks\n\nSemantic rules split into properties that can be proven before execution (static) and those that depend on runtime values (dynamic).\n\n| Category | Static Checks (Compile-Time) | Dynamic Checks (Runtime) |\n| :--- | :--- | :--- |\n| **Type Safety** | Assigning string to integer, operand type mismatches | Downcasting validity (e.g. `(Dog) animal`) |\n| **Scope & Binding** | Undeclared variables, duplicate declarations in same scope | Memory exhaustion, stack overflow |\n| **Control Flow** | `break`/`continue` statements outside loops, unreachable code | Infinite recursion |\n| **Data Integrity** | Function argument count and signature compatibility | Array index out of bounds, divide-by-zero, NULL dereference |\n\n> [!NOTE]\n> Why can array bounds rarely be checked purely statically? Because index expressions (e.g. `arr[i]`) frequently depend on user input or dynamic loop parameters. Compilers use *Bounds Check Elimination (BCE)* only when induction variables can be proven to stay within range.\n\n---\n\n## 2. Type Expressions & Type Systems\n\nA type system defines how expressions are classified into types. Types are formulated recursively using **Type Expressions**:\n1. **Basic Types:** Atomic types like `int`, `float`, `char`, `boolean`, `void`.\n2. **Type Constructors:**\n   - **Array:** `array(I, T)` where $I$ is index range and $T$ is element type.\n   - **Record / Struct:** Cartesian products of named fields: `record((name_1, T_1), ..., (name_k, T_k))`.\n   - **Pointer:** `pointer(T)` referencing addresses storing values of type $T$.\n   - **Function Signatures:** Mappings from domain to range: $D \\to R$, e.g., `(int, int) -> boolean`.\n\n---\n\n## 3. Type Equivalence: Name vs. Structural\n\nWhen determining if two type expressions $S$ and $T$ are interchangeable:\n\n### Name Equivalence\nTwo types are equal if and only if they share the exact same user-declared type name:\n```c\ntypedef struct { int x, y; } PointA;\ntypedef struct { int x, y; } PointB;\n// Under Name Equivalence: PointA != PointB (incompatible)\n```\n- Used in: C/C++ `struct` definitions, Java/C# classes.\n\n### Structural Equivalence\nTwo types are equal if they have identical internal constituent layouts and field types, regardless of type names or aliases:\n```c\ntypedef struct { int x, y; } PointA;\ntypedef struct { int x, y; } PointB;\n// Under Structural Equivalence: PointA == PointB (compatible)\n```\n- Used in: C `typedef` aliases, TypeScript interfaces, Go structs.\n\n---\n\n## 4. Type Coercion vs. Explicit Type Casting\n- **Coercion (Implicit):** The compiler automatically inserts a conversion operator without user intervention if the conversion is safe and widening (e.g., promoting `int` to `double` in `double r = 3 + 4.5;`).\n- **Casting (Explicit):** The programmer explicitly requests a conversion that may truncate or alter representation (e.g., `(int)3.99`).\n\n---\n\n## 5. Attribute Grammars & Semantic Decoration\nAttribute Grammars attach attributes and semantic evaluation rules to context-free productions:\n- **Synthesized Attributes:** Computed from the values of attributes at the children nodes in the parse tree (bottom-up propagation, e.g., evaluating expressions `E.val = E1.val + T.val`).\n- **Inherited Attributes:** Computed from parent or sibling nodes in the parse tree (top-down or sideways propagation, e.g., propagating type declarations `T -> int` into identifier lists `L -> L, id`).\n",
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
        },
        {
          "id": "cd-sem-3",
          "question": "Which of the following errors is detected during Semantic Analysis rather than Syntax Analysis?",
          "options": [
            "Type mismatch (e.g. adding a string to an integer without cast) and undeclared identifier usage.",
            "Mismatched parentheses in an arithmetic expression.",
            "Missing semicolon at the end of a statement.",
            "Invalid character in input stream."
          ],
          "correct_option": 0,
          "explanation": "Syntax analysis checks grammatical structure (context-free syntax), while semantic analysis checks contextual legality (type consistency, variable declaration before use, function signature matching)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Semantic+Analysis+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-intermediate-code-generation",
      "slug": "intermediate-code-generation",
      "title": "Intermediate Code Generation",
      "description": "Intermediate representations, syntax trees, Directed Acyclic Graphs (DAG), and benefits of machine-independent IR.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Amazon"
      ],
      "keyTakeaways": [
        "IR decouples front-end from back-end: For M source languages and N targets, requires M + N compilers instead of M * N.",
        "DAG representation eliminates common subexpressions directly during IR construction.",
        "Syntax Tree: Retains structural hierarchy without concrete syntax details."
      ],
      "notesMarkdown": "# Intermediate Code Generation (ICG)\n\nIntermediate Code Generation is the bridge connecting the compiler's machine-independent frontend (Lexing, Parsing, Semantic Analysis) with its machine-dependent backend (Instruction Selection, Register Allocation, Target Assembly Emission). By compiling into a standardized Intermediate Representation (IR), a compiler gains modularity, reusability, and optimization power.\n\n---\n\n## 1. Why Use an Intermediate Representation?\n\n1. **Retargeting & Portability ($M \\times N$ vs. $M + N$):**\n   - Without IR: Supporting $M$ programming languages across $N$ distinct CPU architectures requires building $M \\times N$ completely separate monolithic compilers.\n   - With a Shared IR (like LLVM IR): You only build $M$ language frontends and $N$ machine backends ($M + N$ components total).\n2. **Machine-Independent Optimization:** High-level algebraic simplifications, common subexpression elimination, loop-invariant code motion, and dead-code elimination can all be executed once on the IR, independent of the target ISA (x86_64, ARM, RISC-V).\n\n---\n\n## 2. Forms of Intermediate Representation\n\nCompilers deploy three tiers of IR:\n\n| IR Level | Structure | Primary Use Cases | Examples |\n| :--- | :--- | :--- | :--- |\n| **High-Level IR** | AST / DAG | Semantic analysis, type checking, early AST-level transformations | Clang AST, Java AST |\n| **Medium-Level IR** | Three-Address Code (TAC), SSA | Dataflow analysis, loop optimizations, alias analysis | LLVM Bitcode, GCC GIMPLE |\n| **Low-Level IR** | Register Transfer Language (RTL) | Instruction selection, register allocation, peephole tuning | GCC RTL, MachineIR |\n\n---\n\n## 3. Directed Acyclic Graph (DAG) for Expressions\n\nUnlike a Syntax Tree (which duplicates repeated subtrees), a **DAG** detects identical expressions during construction, reusing existing nodes by adding multiple inbound edges:\n\n```\nExpression: (a + b) * (a + b) + c\n\n      Syntax Tree                      DAG (Optimized)\n          (+)                                (+)\n         /   \\                              /   \\\n       (*)    (c)                         (*)   (c)\n      /   \\                               / \\\n    (+)   (+)                           /-- (a)\n   / \\   / \\                           /     |\n (a) (b)(a) (b)                       (+) --- (b)\n```\n- In the DAG, node `(+)` representing `a + b` is constructed once; the parent `(*)` holds two pointers to that single node, instantly capturing the Common Subexpression.\n\n---\n\n## 4. Three-Address Code (TAC) Representations\n\nIn Three-Address Code, every instruction contains at most one operator and at most three address operands (`result = arg1 op arg2`).\n\nCompilers store TAC tables using three primary data representations:\n\n### A. Quadruples: `(op, arg1, arg2, result)`\n- Explicitly names each temporary variable (`t1`, `t2`, etc.).\n- Example: `t1 = a + b` is stored as `('+', 'a', 'b', 't1')`.\n- Advantage: Easy to inspect and manipulate temporary variable names directly.\n\n### B. Triples: `(op, arg1, arg2)`\n- Omits the explicit `result` field. The output temporary is implicitly referenced by the table index `(i)` where it is defined.\n- Example: Index `(0): ('+', 'a', 'b')`; Index `(1): ('*', '(0)', 'c')`.\n- Disadvantage: Moving or reordering instructions during optimization requires rewriting every index reference in the table.\n\n### C. Indirect Triples\n- Employs an auxiliary array of pointers pointing to entries in the Triples table.\n- Optimizations (e.g. instruction reordering, code hoisting) swap pointers in the array without modifying the underlying Triples table indices.\n\n---\n\n## 5. Control Flow & Backpatching\n\nFor conditional branching (`if (x < y) goto L1 else goto L2`):\n- High-level control flow uses short-circuit boolean evaluation.\n- **Backpatching:** In a single-pass compiler, jump targets often cannot be resolved immediately (forward jumps). The compiler maintains lists of unresolved jump instructions (`truelist`, `falselist`) and backpatches the target instruction address once the landing label is synthesized.\n",
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
        },
        {
          "id": "cd-icg-3",
          "question": "Why do modern optimizing compilers convert Abstract Syntax Trees into Intermediate Representations (IR) like Three-Address Code or SSA?",
          "options": [
            "To decouple machine-independent optimizations from target-specific machine code generation, enabling M front-ends and N back-ends with M + N compilers.",
            "To increase the binary size of the final executable.",
            "Because ASTs cannot represent loops.",
            "To prevent register allocation."
          ],
          "correct_option": 0,
          "explanation": "Using a machine-independent IR decouples the compiler into front-end and back-end: supporting M languages on N processor architectures requires M + N modules instead of M * N separate compilers."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Intermediate+Code+Generation+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-three-address-code",
      "slug": "three-address-code",
      "title": "Three-Address Code",
      "description": "Definition of Three-Address Code (TAC), quadruples, triples, and indirect triples representation.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Microsoft",
        "Google",
        "Oracle",
        "Wipro"
      ],
      "keyTakeaways": [
        "TAC instruction form: x = y op z (at most three memory references/addresses per statement).",
        "Quadruple: Record with 4 fields (op, arg1, arg2, result). Temporary names are explicit.",
        "Triple: Record with 3 fields (op, arg1, arg2). Results are referenced by position/index.",
        "Indirect Triples: Uses an array of pointers to triples, allowing easy reordering during optimization."
      ],
      "notesMarkdown": "# Three-Address Code (TAC)\n\n---\n\n## 1. Forms of Three-Address Code\nEach TAC statement contains at most one operator on the right-hand side:\n$$x = y \\text{ op } z$$\nComplex expressions are flattened using compiler-generated temporaries $t_1, t_2, \\dots$.\n\n---\n\n## 2. Quadruples vs. Triples vs. Indirect Triples\n- **Quadruple:** `(op, arg1, arg2, result)`\n  - Explicit temporaries, easy to move code during optimization.\n- **Triple:** `(op, arg1, arg2)`\n  - Refers to intermediate results using statement index `(0)`, `(1)`. Reordering code requires updating all references.\n- **Indirect Triple:** An array of pointers to triples. Code optimization reorders the pointer array without touching the triple memory records.\n",
      "questions": [
        {
          "id": "cd-tac-1",
          "question": "In compiler intermediate representations, which TAC implementation explicitly lists the destination temporary name?",
          "options": [
            "Triples",
            "Quadruples",
            "Indirect Triples",
            "Abstract Syntax Trees"
          ],
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
        },
        {
          "id": "cd-tac-3",
          "question": "What are the three standard implementation representations for Three-Address Code (TAC)?",
          "options": [
            "Quadruples, Triples, and Indirect Triples",
            "Stacks, Queues, and Heaps",
            "Binary Trees, Arrays, and Linked Lists",
            "Tokens, Lexemes, and Patterns"
          ],
          "correct_option": 0,
          "explanation": "Three-address code is conventionally represented in compiler memory as Quadruples (op, arg1, arg2, result), Triples (op, arg1, arg2 with implicit result indices), or Indirect Triples (array of pointers to triples)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Three-Address+Code+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-runtime-environments",
      "slug": "runtime-environments",
      "title": "Runtime Environments",
      "description": "Storage organization, activation records (stack frames), activation trees, and scope management.",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Intel",
        "Cisco"
      ],
      "keyTakeaways": [
        "Memory Layout: Code (text), Static/Global, Run-time Stack (local variables, frame pointers), Heap (dynamic allocation).",
        "Activation Record: Contains return address, actual parameters, old frame pointer (dynamic link), saved registers, and local variables.",
        "Dynamic Link (Control Link): Points to the activation record of the caller function.",
        "Static Link (Access Link): Points to the activation record of the lexical (enclosing) parent function."
      ],
      "notesMarkdown": "# Runtime Environments & Activation Records\n\n---\n\n## 1. Runtime Memory Organization\n```text\n+-----------------------------------+ High Memory\n| Stack (grows downwards)           |\n|   Activation Records              |\n|               v                   |\n|               ^                   |\n| Heap (grows upwards)              |\n|   Dynamic Allocation (malloc)     |\n+-----------------------------------+\n| Static / Global Data              |\n+-----------------------------------+\n| Code Segment (Text)               | Low Memory\n+-----------------------------------+\n```\n\n---\n\n## 2. Activation Record Structure\n1. Return value & Actual parameters\n2. Control link (Dynamic link → caller's AR)\n3. Access link (Static link → lexically enclosing scope's AR)\n4. Saved machine status (Program counter, registers)\n5. Local variables & compiler temporaries\n",
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
        },
        {
          "id": "cd-rte-3",
          "question": "In standard C runtime call stacks, what role does the 'Control Link' (Dynamic Link) inside an activation record serve?",
          "options": [
            "It points to the activation record of the caller function, allowing frame restoration upon return.",
            "It points to non-local variables in enclosing lexical scopes.",
            "It stores the global heap base address.",
            "It contains the CPU interrupt vector."
          ],
          "correct_option": 0,
          "explanation": "The dynamic link (control link) points to the caller's stack frame, enabling the epilogue code to restore the caller's frame pointer when the callee function returns."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Runtime+Environments+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-symbol-tables",
      "slug": "symbol-tables",
      "title": "Symbol Tables",
      "description": "Design and data structures for symbol tables (hash tables, trees), scope handling, and identifier attributes.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Oracle",
        "Infosys",
        "Cognizant"
      ],
      "keyTakeaways": [
        "Symbol table stores identifier metadata: name, type, scope, memory offset, parameter list.",
        "Hash tables with chaining provide O(1) expected lookup and insertion.",
        "Block-structured languages manage nested scopes using a stack of symbol tables or chained scope pointers.",
        "Accessed by virtually every phase of the compiler."
      ],
      "notesMarkdown": "# Symbol Table Architecture & Scope Management\n\nThe **Symbol Table** is the central repository of compile-time information. It records metadata about every identifier (variable names, function names, types, labels, classes) encountered in the source text. Almost every phase of the compiler interacts with the symbol table: the scanner and parser populate it, semantic analysis decorates and checks it, the intermediate code generator computes memory layouts from it, and optimization and code generation query it for register assignments and memory addresses.\n\n---\n\n## 1. Information Preserved per Identifier\n\nEach record (or entry) in the symbol table typically contains:\n1. **Lexeme String:** The identifier name (or an offset into a string table).\n2. **Data Type:** Atomic type (`int`, `float`), compound constructor (`array`, `struct`), or return type.\n3. **Storage Allocation:**\n   - Offset: Relative byte address within the runtime activation record (stack frame) or data segment.\n   - Size: Total memory footprint in bytes.\n4. **Scope Level & Lifetime:** Visibility depth (Global = 0, Function = 1, Inner block = 2, etc.) and storage duration (automatic, static, extern).\n5. **Procedure Signatures:** Number of parameters, parameter passing mode (by-value, by-reference), and type tuple.\n\n---\n\n## 2. Symbol Table Data Structures: Performance Comparison\n\nThe efficiency of compiler compilation time directly correlates with symbol table performance:\n\n| Data Structure | Lookup (Avg) | Insertion (Avg) | Overhead & Trade-offs |\n| :--- | :--- | :--- | :--- |\n| **Linear List / Array** | $O(n)$ | $O(1)$ | Simple to implement, but unacceptably slow for production codebases with thousands of identifiers. |\n| **Self-Balancing BST (AVL / Red-Black)** | $O(\\log n)$ | $O(\\log n)$ | Ordered iteration possible; logarithmic guaranteed worst-case, but node pointer memory overhead. |\n| **Hash Table with Chaining** | $O(1)$ | $O(1)$ | Industry standard (used in GCC, Clang, Rustc). Provides near instantaneous average lookups when paired with a good hash function (e.g. MurmurHash, FNV-1a). Worst case $O(n)$ if hash collisions degenerate. |\n\n---\n\n## 3. Scope Management in Block-Structured Languages\n\nBlock-structured languages (such as C, C++, Java, and Rust) allow nested scopes (`{ ... }`) where an inner variable can shadow an outer variable of the same name:\n\n### The Stack of Hash Tables (Leveled Symbol Tables)\n- On entering a block `{`: The compiler instantiates a new local symbol table and pushes it onto the **Scope Stack**.\n- On variable declaration: The identifier is inserted exclusively into the table at the top of the stack (the current innermost scope).\n- On variable reference / lookup: The lookup traverses the stack from top to bottom:\n  $$\\text{Top (Current Scope)} \\to \\text{Enclosing Scope} \\to \\dots \\to \\text{Base (Global Scope)}$$\n  The first matching entry found is used, automatically implementing **lexical variable shadowing**.\n- On exiting a block `}`: The top symbol table is popped from the stack and its memory freed (or archived for debug symbol emission like DWARF).\n\n```\n[ Global Table ]       <-- Base (x: int, print: func)\n      ^\n[ Function foo Table ] <-- Level 1 (x: float [shadows global x], y: int)\n      ^\n[ Inner While Table ]  <-- Top (z: int, y: bool [shadows foo y])\n```\n\n---\n\n## 4. Name Mangling & Overloading\n\nIn languages supporting function overloading (C++, Java), the identifier name alone is insufficient as a symbol table key. Compilers perform **Name Mangling** to combine the function name with its parameter types into a unique linker symbol:\n- Example: `void print(int)` becomes `_Z5printi`, while `void print(double)` becomes `_Z5printd`.\n",
      "questions": [
        {
          "id": "cd-st-1",
          "question": "Which data structure provides the fastest average time complexity for symbol table lookups and insertions?",
          "options": [
            "Linear linked list",
            "Binary search tree",
            "Hash table",
            "Queue"
          ],
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
        },
        {
          "id": "cd-sym-3",
          "question": "Which data structure is most commonly used in production compilers for efficient O(1) average-time symbol table operations with scope nesting?",
          "options": [
            "Hash table with chained buckets and scope stack markers",
            "Unsorted linear array",
            "Single-ended queue",
            "Adjacency matrix"
          ],
          "correct_option": 0,
          "explanation": "Production compilers use chained hash tables paired with scope stacks: entering a scope pushes a marker or new table, and exiting pops local symbols, delivering O(1) average-time symbol lookup and insertion."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Symbol+Tables+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-memory-allocation",
      "slug": "memory-allocation",
      "title": "Memory Allocation",
      "description": "Static allocation, stack allocation, heap allocation, and garbage collection strategies (reference counting, mark-and-sweep).",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Adobe",
        "Qualcomm"
      ],
      "keyTakeaways": [
        "Static allocation: Fixed addresses bound at compile time; cannot support recursion or dynamic data structures (e.g. early Fortran).",
        "Stack allocation: Managed LIFO for procedure calls; fully supports recursion.",
        "Heap allocation: Dynamic allocation in arbitrary order; requires explicit free or automated garbage collection.",
        "Garbage collection: Mark-and-sweep, copying collectors, reference counting."
      ],
      "notesMarkdown": "# Memory Allocation Strategies\n\n---\n\n## 1. Allocation Strategies\n1. **Static Allocation:**\n   - Memory addresses are fixed before program execution.\n   - Disallows recursion (multiple instances of a function would overwrite the same frame).\n2. **Stack Allocation:**\n   - Push frame on call, pop frame on return. Supports recursive calls and dynamic array sizing at invocation time.\n3. **Heap Allocation:**\n   - Memory dynamically allocated and deallocated in arbitrary order. Used when object lifetimes outlive function calls.\n\n---\n\n## 2. Garbage Collection\n- **Reference Counting:** Counts incoming pointers; fails to reclaim cyclic references.\n- **Mark-and-Sweep:** Traverses reachable objects from roots (stack, registers) and marks them; sweeps and frees unmarked heap objects.\n",
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
        },
        {
          "id": "cd-mem-3",
          "question": "Which memory allocation strategy is used for data whose size and lifetime cannot be determined at compile time and outlives function invocations?",
          "options": [
            "Dynamic / Heap Allocation",
            "Static Allocation",
            "Stack Allocation",
            "Code Segment Allocation"
          ],
          "correct_option": 0,
          "explanation": "Heap allocation handles dynamically sized objects with arbitrary lifetimes that outlive the activating procedure call, managed via malloc/free or garbage collection."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Memory+Allocation+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-code-optimization",
      "slug": "code-optimization",
      "title": "Code Optimization",
      "description": "Basic blocks and flow graphs, local optimizations (constant folding, copy propagation, dead code elimination), loop optimizations (loop invariant code motion, induction variables, strength reduction).",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Intel",
        "NVIDIA",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Basic Block: Sequence of consecutive statements with one entry point (no jumps in) and one exit point (no branches except at the end).",
        "Constant Folding: Evaluating constant expressions at compile-time (e.g. 3 * 7 -> 21).",
        "Copy Propagation: Replacing uses of variable with its assigned source (x = y; z = x + 1 -> z = y + 1).",
        "Loop Invariant Code Motion: Moving computations that do not change inside loop iterations outside the loop.",
        "Strength Reduction: Replacing expensive operations with cheaper ones (e.g. replacing multiplication with addition in loops)."
      ],
      "notesMarkdown": "# Code Optimization\n\n---\n\n## 1. Basic Blocks & Control Flow Graphs (CFG)\n- **Leader Identification:**\n  1. The first statement of the program is a leader.\n  2. Any statement that is the target of a conditional/unconditional jump is a leader.\n  3. Any statement immediately following a jump is a leader.\n- A **Basic Block** starts at a leader and includes all statements up to (but excluding) the next leader.\n\n---\n\n## 2. Common Optimizations\n- **Constant Folding & Propagation:** Pre-evaluating known constant expressions at compile-time.\n- **Dead Code Elimination:** Removing instructions whose results are never read or utilized.\n- **Loop Invariant Code Motion (Hoisting):** Moving statements whose operands remain unchanged throughout loop iterations outside the loop preheader.\n- **Strength Reduction:** Replacing costly operators with cheaper alternatives (e.g., $i \\times 4$ replaced with iterative addition $+4$).\n",
      "questions": [
        {
          "id": "cd-opt-1",
          "question": "Replacing the expression 'x = i * 4' inside a loop with an increment 'x = x + 4' across iterations is an example of which optimization?",
          "options": [
            "Constant Folding",
            "Strength Reduction",
            "Loop Unrolling",
            "Dead Code Elimination"
          ],
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
        },
        {
          "id": "cd-opt-3",
          "question": "What is 'Loop-Invariant Code Motion' in compiler optimization?",
          "options": [
            "Moving statements whose evaluation produces the same value on every iteration out of the loop body to the preheader.",
            "Unrolling the loop body to avoid branching overhead.",
            "Replacing multiplication by powers of 2 with bit shifts.",
            "Combining two adjacent loops with identical iteration spaces."
          ],
          "correct_option": 0,
          "explanation": "Loop-invariant code motion (hoisting) identifies computations inside a loop whose operands do not change across iterations and moves them before the loop entry, eliminating redundant computation."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Code+Optimization+Compiler+Design+CD+GATE+lecture"
    },
    {
      "id": "cd-target-code-generation",
      "slug": "target-code-generation",
      "title": "Target Code Generation",
      "description": "Register allocation and assignment, instruction selection, peephole optimization, and generation of machine code.",
      "estimatedMinutes": 22,
      "difficulty": "Hard",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Apple",
        "AMD"
      ],
      "keyTakeaways": [
        "Register Allocation: Selecting which variables reside in physical CPU registers.",
        "Register Assignment: Picking the specific hardware register for a designated variable.",
        "Graph Coloring: Formulates register allocation as K-coloring of the interference graph (NP-complete).",
        "Peephole Optimization: Local window inspection over small target code chunks to eliminate redundant loads/stores and jumps."
      ],
      "notesMarkdown": "# Target Code Generation & Register Allocation\n\n---\n\n## 1. Key Challenges in Code Generation\n1. **Instruction Selection:** Choosing appropriate hardware instructions for intermediate TAC operations.\n2. **Register Allocation & Assignment:**\n   - Register Allocation: Decides which variables reside in registers vs. memory.\n   - Register Assignment: Assigns variables to specific physical registers.\n3. **Instruction Scheduling:** Reordering instructions to minimize CPU pipeline stalls.\n\n---\n\n## 2. Register Allocation via Graph Coloring\n- **Interference Graph:** Nodes are variables (live ranges); edges exist between variables that are simultaneously live.\n- Assigning $K$ available registers corresponds to **$K$-coloring the interference graph**. If a graph cannot be $K$-colored, variables must be spilled to RAM.\n\n---\n\n## 3. Peephole Optimization\nA simple yet effective technique that examines a small sliding window (\"peephole\") of generated target instructions:\n- Redundant load/store elimination (`MOV R0, a; MOV a, R0`).\n- Unreachable code elimination.\n- Flow-of-control optimizations (jumps to jumps).\n- Algebraic simplifications ($x \\times 1 \\to x$, $x + 0 \\to x$).\n",
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
        },
        {
          "id": "cd-target-3",
          "question": "In target code generation, what classic NP-complete problem does Register Allocation map to?",
          "options": [
            "Graph Coloring Problem (Chaitin's Algorithm)",
            "Knapsack Problem",
            "Traveling Salesperson Problem",
            "Subset Sum Problem"
          ],
          "correct_option": 0,
          "explanation": "Register allocation maps to Graph Coloring on the Interference Graph: variables with overlapping live ranges are connected by edges, and assigning K physical registers corresponds to finding a valid K-coloring."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Target+Code+Generation+Compiler+Design+CD+GATE+lecture"
    }
  ]
};
