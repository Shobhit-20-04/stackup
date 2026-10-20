import type { SectionCategory } from './types';

export const C_PROGRAMMING_CATEGORY: SectionCategory = {
  id: "c-prog",
  slug: "programming-in-c",
  title: "Programming in C",
  description: "Master C syntax, memory architecture, pointers, structures, file handling, and systems programming.",
  icon: "Terminal",
  topics: [
  {
    "id": "c-variables-types-operators",
    "slug": "variables-data-types-and-operators",
    "title": "Variables, Data Types, and Operators",
    "description": "Fundamental primitive data types, memory representations, type modifiers, operator precedence, and bitwise operations.",
    "estimatedMinutes": 15,
    "difficulty": "Easy",
    "companyTags": [
      "TCS Digital",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture"
    ],
    "keyTakeaways": [
      "Data types define storage size and range (char: 1 byte, int: 2 or 4 bytes, float: 4 bytes, double: 8 bytes).",
      "Type conversion: Implicit promotion follows integer promotion rules up to float/double.",
      "Operator precedence: Postfix (++ / --) > Unary > Multiplicative (* / %) > Additive (+ -) > Bitwise > Logical > Assignment.",
      "Bitwise operations (&, |, ^, ~, <<, >>) execute directly at CPU register speeds."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Variables+Data+Types+and+Operators+in+C+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Variables, Data Types, and Operators in C\n\nC is a statically typed, compiled procedural language designed by Dennis Ritchie at Bell Labs. Because C gives programmers direct access to memory addresses and hardware registers, understanding how data types are mapped onto physical bytes and how operators manipulate those bytes is fundamental to writing correct, performant, and secure systems code.\n\n---\n\n## 1. Architectural Motivation & Memory Representations\n\nWhen you declare a variable in C:\n```c\nint counter = 42;\n```\nthe compiler:\n1. Allocates a fixed number of bytes in memory (typically 4 bytes on modern 32-bit and 64-bit architectures).\n2. Associates the identifier `counter` with the memory address of the first byte in the symbol table.\n3. Emits machine instructions to write the binary representation of `42` (`0x0000002A` in little-endian order) into those bytes.\n\n```\nAddress:    0x1000      0x1001      0x1002      0x1003\nByte:      [ 0x2A ]    [ 0x00 ]    [ 0x00 ]    [ 0x00 ]   <-- Little-Endian int (42)\nVariable:  counter\n```\n\n---\n\n## 2. Fundamental Data Types, Sizes, and Ranges\n\nThe ISO C standard specifies *minimum* widths and relative relationships rather than absolute hardware sizes (e.g., `sizeof(short) <= sizeof(int) <= sizeof(long)`). On standard x86-64 Linux and Windows systems (LP64 / LLP64):\n\n| Data Type | Width (Bits) | Bytes | Format Specifier | Typical Range |\n| :--- | :--- | :--- | :--- | :--- |\n| `char` | 8 | 1 | `%c` | `-128` to `127` (or `0` to `255` if unsigned) |\n| `unsigned char` | 8 | 1 | `%u` | `0` to `255` |\n| `short int` | 16 | 2 | `%hd` | `-32,768` to `32,767` |\n| `unsigned short` | 16 | 2 | `%hu` | `0` to `65,535` |\n| `int` | 32 | 4 | `%d` or `%i` | `-2,147,483,648` to `2,147,483,647` |\n| `unsigned int` | 32 | 4 | `%u` | `0` to `4,294,967,295` |\n| `long int` | 32 (Win) / 64 (Linux) | 4 or 8 | `%ld` | Platform dependent |\n| `long long int` | 64 | 8 | `%lld` | `-(2^63)` to `2^63 - 1` |\n| `float` | 32 | 4 | `%f` | IEEE 754 single precision (~6-7 decimal digits) |\n| `double` | 64 | 8 | `%lf` | IEEE 754 double precision (~15-17 decimal digits) |\n| `long double` | 80 or 128 | 10 or 16 | `%Lf` | Extended precision |\n\n### Integer Modifiers\n- `signed`: Default for arithmetic integer types (except `char` which is platform-defined). Uses **Two's Complement** encoding.\n- `unsigned`: Reinterprets the sign bit as pure magnitude. Arithmetic on unsigned integers never overflows; it wraps modulo $2^N$.\n\n---\n\n## 3. Operator Precedence and Associativity\n\nOperator precedence determines how operators are grouped in the absence of explicit parentheses. Associativity determines evaluation order for operators of equal precedence.\n\n```\nPriority Level (Highest to Lowest):\n1. Postfix:         ()  []  ->  .  ++  --                 (Left-to-Right)\n2. Unary:           +  -  !  ~  ++  --  *  &  sizeof      (Right-to-Left)\n3. Multiplicative:  *  /  %                               (Left-to-Right)\n4. Additive:        +  -                                  (Left-to-Right)\n5. Shift:           <<  >>                                (Left-to-Right)\n6. Relational:      <  <=  >  >=                          (Left-to-Right)\n7. Equality:        ==  !=                                (Left-to-Right)\n8. Bitwise AND:     &                                     (Left-to-Right)\n9. Bitwise XOR:     ^                                     (Left-to-Right)\n10. Bitwise OR:     |                                     (Left-to-Right)\n11. Logical AND:    &&                                    (Left-to-Right)\n12. Logical OR:     ||                                    (Left-to-Right)\n13. Ternary:        ?:                                    (Right-to-Left)\n14. Assignment:     =  +=  -=  *=  /=  %=  &=  ^=  |=     (Right-to-Left)\n15. Comma:          ,                                     (Left-to-Right)\n```\n\n---\n\n## 4. Bitwise Operators & Hardware-Level Manipulation\n\nBitwise operators manipulate individual bits directly inside CPU registers in a single clock cycle:\n- `&` (Bitwise AND): Clears bits. Masking: `x & 0x0F` isolates lowest 4 bits.\n- `|` (Bitwise OR): Sets bits. `x | (1 << 3)` sets bit 3 to 1.\n- `^` (Bitwise XOR): Toggles bits. `x ^ (1 << 3)` flips bit 3. Property: `x ^ x = 0`, `x ^ 0 = x`.\n- `~` (Bitwise NOT): Inverts all bits (one's complement).\n- `<<` (Left Shift): Shifts bits left; equivalent to multiplying by $2^k$.\n- `>>` (Right Shift): Shifts bits right; equivalent to dividing by $2^k$ (arithmetic shift for signed, logical for unsigned).\n\n---\n\n## 5. Worked Code Example: Bitwise Flag Management & Precedence\n\n```c\n#include <stdio.h>\n#include <stdbool.h>\n\n#define FLAG_READ    (1 << 0) // 0001 = 1\n#define FLAG_WRITE   (1 << 1) // 0010 = 2\n#define FLAG_EXECUTE (1 << 2) // 0100 = 4\n\nint main(void) {\n    unsigned char perms = 0;\n\n    // 1. Grant Read and Execute permissions\n    perms |= (FLAG_READ | FLAG_EXECUTE); // 0001 | 0100 = 0101 (5)\n    printf(\"Permissions: 0x%02X\\n\", perms);\n\n    // 2. Test if Write permission is set\n    bool can_write = (perms & FLAG_WRITE) != 0;\n    printf(\"Can write: %s\\n\", can_write ? \"YES\" : \"NO\");\n\n    // 3. Toggle Write permission\n    perms ^= FLAG_WRITE; // now has 0111 (7)\n    printf(\"After toggle write: 0x%02X\\n\", perms);\n\n    // 4. Revoke Read permission\n    perms &= ~FLAG_READ; // 0111 & ~0001 = 0110 (6)\n    printf(\"After revoking read: 0x%02X\\n\", perms);\n\n    // 5. High-Yield Interview Precedence Trap\n    int a = 1, b = 0;\n    // Short-circuiting in logical OR (||)\n    int result = a++ || ++b; \n    // a++ evaluates to 1 (true). || short-circuits! ++b is NEVER evaluated!\n    printf(\"a = %d, b = %d, result = %d\\n\", a, b, result); // Prints: 2 0 1\n\n    return 0;\n}\n```\n\n---\n\n## 6. High-Yield Interview Traps & Undefined Behavior\n\n1. **Integer Division Truncation:**\n   `5 / 2` evaluates to integer `2`, not `2.5`. To retain precision, at least one operand must be floating-point: `5.0 / 2` or `(double)5 / 2`.\n2. **Multiple Modifications in One Sequence Point (UB):**\n   `i = ++i + i++;` or `printf(\"%d %d\", i++, i++);` produces **Undefined Behavior** in C99/C11. The compiler is free to evaluate operands in any order or generate conflicting register writes.\n3. **Signed Integer Overflow:**\n   In C, signed integer overflow (e.g., `INT_MAX + 1`) is **Undefined Behavior** (compilers may optimize loops assuming signed overflow never happens). Unsigned overflow, however, is strictly defined to wrap around modulo $2^N$.\n4. **Equality vs Assignment:**\n   Writing `if (x = 5)` assigns `5` to `x` and evaluates to true! Always compile with `-Wall -Wextra` to catch missing `==`.\n\n---\n\n## 7. Guided Practice Challenge\n\n**Problem:** Write a function `bool isPowerOfTwo(unsigned int n)` without loops, using a single bitwise expression.\n**Solution Analysis:**\n- A power of two in binary has exactly one bit set: e.g., $16 = 10000_2$.\n- $n - 1$ flips all bits up to and including that set bit: $15 = 01111_2$.\n- Performing bitwise AND: `n & (n - 1)` will produce `0` if and only if $n$ has exactly one set bit (and $n > 0$).\n```c\nbool isPowerOfTwo(unsigned int n) {\n    return (n > 0) && ((n & (n - 1)) == 0);\n}\n```\n\n---\n\n## 8. Summary Cheatsheet & Key Formulas\n\n- **Two's Complement Value:** $-b_{N-1} \\cdot 2^{N-1} + \\sum_{i=0}^{N-2} b_i \\cdot 2^i$\n- **Clear LSB Set Bit:** `n & (n - 1)`\n- **Isolate Lowest Set Bit:** `n & (-n)`\n- **Swap without Temp:** `a ^= b; b ^= a; a ^= b;`\n- **Implicit Conversion Rank:** `char` $\rightarrow$ `short` $\rightarrow$ `int` $\rightarrow$ `unsigned int` $\rightarrow$ `long` $\rightarrow$ `unsigned long` $\rightarrow$ `float` $\rightarrow$ `double` $\rightarrow$ `long double`.\n",
    "questions": [
      {
        "id": "c-var-1",
        "question": "What is the output of the following C code?\n\nint a = 1, b = 0;\nint c = a++ || ++b;\nprintf(\"%d %d %d\", a, b, c);",
        "options": [
          "2 0 1",
          "2 1 1",
          "1 1 1",
          "2 0 0"
        ],
        "correct_option": 0,
        "explanation": "a++ yields 1 (truthy), so in the logical OR (||) expression, short-circuit evaluation occurs and ++b is never executed. 'c' becomes 1. After the evaluation, 'a' is incremented to 2, while 'b' remains 0."
      },
      {
        "id": "c-var-2",
        "question": "Which of the following operators has the highest precedence in C?",
        "options": [
          "Bitwise AND (&)",
          "Addition (+)",
          "Logical AND (&&)",
          "Postfix increment (++)"
        ],
        "correct_option": 3,
        "explanation": "Postfix increment (++) has precedence level 1 (highest among operators alongside function call () and array subscript [])."
      },
      {
        "id": "c-var-3",
        "question": "What is the result of the expression (5 >> 1) in C, assuming 32-bit signed integers?",
        "options": [
          "2",
          "2.5",
          "10",
          "1"
        ],
        "correct_option": 0,
        "explanation": "Right shift by 1 bit (>> 1) performs integer division by 2: floor(5 / 2) = 2."
      }
    ],
    "prerequisites": [
      "Basic understanding of computers, bits, and binary number systems",
      "Concept of program compilation and execution"
    ],
    "externalResources": [
      {
        "title": "CS50x: C Types, Operators, and Expressions",
        "url": "https://cs50.harvard.edu/x/2024/weeks/1/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Beginner"
      },
      {
        "title": "W3Schools C Data Types & Operators Guide",
        "url": "https://www.w3schools.com/c/c_data_types.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      },
      {
        "title": "GeeksforGeeks: C Data Types and Operator Precedence",
        "url": "https://www.geeksforgeeks.org/c-data-types/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "id": "c-conditionals-loops",
    "slug": "conditional-statements-and-loops",
    "title": "Conditional Statements and Loops",
    "description": "Control flow structures: if-else, switch-case fallthrough, for, while, do-while loops, break, and continue.",
    "estimatedMinutes": 15,
    "difficulty": "Easy",
    "companyTags": [
      "TCS",
      "Infosys",
      "Capgemini",
      "Accenture"
    ],
    "keyTakeaways": [
      "Switch cases require integral/character expressions; floating point numbers are not allowed.",
      "Missing 'break' causes case fallthrough until the next break or end of switch.",
      "Do-while guarantees at least one execution pass before testing condition.",
      "Continue skips the rest of the loop body and advances to the loop update expression."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Control+Flow+Conditionals+Loops+C+Programming+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Conditional Statements and Loops in C\n\nControl flow structures dictate the order in which individual statements and instructions are executed by the CPU. In C, control flow maps directly to assembly-level conditional branch (`cmp`, `je`, `jne`, `jg`) and unconditional jump (`jmp`) instructions.\n\n---\n\n## 1. Conditional Branching Mechanisms\n\n### If-Else Ladder\nEvaluates expressions sequentially until a non-zero (truthy) condition is met:\n```c\nif (score >= 90) {\n    grade = 'A';\n} else if (score >= 80) {\n    grade = 'B';\n} else {\n    grade = 'F';\n}\n```\nIn C, any non-zero integer evaluates to **true**; `0` evaluates to **false**. Floating-point conditions should be avoided due to precision inaccuracies (`x == 0.1` can fail).\n\n### Switch-Case Statement & Jump Tables\nWhen branching on discrete integral constants (`char`, `int`, `enum`), the compiler converts the `switch` construct into a **Jump Table** (branch table) rather than sequential `cmp` instructions. This gives $O(1)$ dispatch time regardless of how many cases exist.\n\n```\n                  +-------------------+\n                  |  Switch Condition |\n                  +---------+---------+\n                            |\n                 Index into Jump Table\n                            |\n           +----------------+----------------+\n           |                |                |\n           v                v                v\n     [ Case 10 ]      [ Case 20 ]       [ Case 30 ]\n           |                |                |\n         break            break            break\n           +----------------+----------------+\n                            |\n                            v\n                   [ Code After Switch ]\n```\n\n**Crucial Fallthrough Behavior:**\nWithout an explicit `break;`, control flows directly into the subsequent case (intentional fallthrough can be used for grouping cases, but accidental omission is a frequent bug).\n\n---\n\n## 2. Loop Architectures in C\n\nC provides three looping constructs categorized by when the termination condition is evaluated:\n\n| Construct | Type | Evaluation Time | Minimum Executions |\n| :--- | :--- | :--- | :--- |\n| `while (cond)` | Entry-controlled | Prior to iteration | `0` |\n| `for (init; cond; step)` | Entry-controlled | Prior to iteration | `0` |\n| `do { ... } while (cond);` | Exit-controlled | After iteration | `1` |\n\n### Loop Equivalence\nEvery `for` loop:\n```c\nfor (init; cond; step) {\n    body;\n}\n```\nis functionally equivalent to:\n```c\ninit;\nwhile (cond) {\n    body;\n    step;\n}\n```\n*Exception:* If `body` contains a `continue;` statement, in a `for` loop the `step` expression is still executed; in a naive `while` rewrite, jumping past `step` causes an infinite loop!\n\n---\n\n## 3. Control Transfer: Break, Continue, and Goto\n\n- `break`: Immediately exits the innermost enclosing loop or `switch` block.\n- `continue`: Skips the remainder of the current loop iteration and advances directly to the loop update/condition.\n- `goto`: Performs an unconditional jump to a local label within the same function. While generally discouraged in high-level application code, `goto` is standard idiom in the Linux kernel for clean, single-exit error handling and resource cleanup:\n```c\nint init_device(void) {\n    if (!alloc_mem()) goto err_mem;\n    if (!bind_port()) goto err_port;\n    return 0;\n\nerr_port:\n    free_mem();\nerr_mem:\n    return -1;\n}\n```\n\n---\n\n## 4. Worked Code Example: Nested Loops and Prime Sieve\n\n```c\n#include <stdio.h>\n#include <stdbool.h>\n\nvoid printPrimes(int limit) {\n    for (int num = 2; num <= limit; num++) {\n        bool isPrime = true;\n        \n        // Trial division up to sqrt(num)\n        for (int d = 2; d * d <= num; d++) {\n            if (num % d == 0) {\n                isPrime = false;\n                break; // Exit inner loop early\n            }\n        }\n        \n        if (isPrime) {\n            printf(\"%d \", num);\n        }\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    int choice = 2;\n    switch (choice) {\n        case 1:\n            printf(\"Running 10\\n\");\n            printPrimes(10);\n            break;\n        case 2:\n        case 3: // Grouped fallthrough\n            printf(\"Running 30\\n\");\n            printPrimes(30);\n            break;\n        default:\n            printf(\"Invalid choice\\n\");\n            break;\n    }\n    return 0;\n}\n```\n\n---\n\n## 5. High-Yield Interview Traps & Pitfalls\n\n1. **Semicolon After Loop Header:**\n   ```c\n   int i;\n   for (i = 0; i < 5; i++); // Notice the semicolon!\n   {\n       printf(\"%d \", i); // Prints 5 once! The loop body was an empty statement!\n   }\n   ```\n2. **Unsigned Decrement Underflow Infinite Loop:**\n   ```c\n   for (unsigned int i = 10; i >= 0; i--) {\n       // BUG: i is unsigned, so i >= 0 is ALWAYS TRUE!\n       // When i is 0, i-- underflows to UINT_MAX (4,294,967,295)!\n   }\n   ```\n3. **Missing Break in Switch:**\n   Accidental omission of `break;` leads to fallthrough executing all subsequent cases until a break or the end of the switch block is reached.\n\n---\n\n## 6. Summary Cheatsheet & Key Formulas\n\n- **Switch Jump Table Complexity:** $O(1)$ dispatch time vs $O(N)$ for long if-else ladders.\n- **Loop Invariant:** A logical condition that holds true before loop entry, during every iteration, and upon loop exit (used in formal correctness proofs).\n- **Rule of Thumb:** Use `for` when iteration count is known in advance; use `while` when waiting for an external state or sentinel; use `do-while` when the body must run at least once (e.g., user input validation).\n",
    "questions": [
      {
        "id": "c-cond-1",
        "question": "Which data type is NOT allowed as a switch expression in ANSI C?",
        "options": [
          "char",
          "short",
          "float",
          "enum"
        ],
        "correct_option": 2,
        "explanation": "In ANSI C, the switch expression must evaluate to an integer or enumeration type. Floating-point types (float, double) are not permitted."
      },
      {
        "id": "c-cond-2",
        "question": "How many times does the loop body execute?\n\nint x = 10;\ndo {\n    x -= 2;\n} while (x > 10);",
        "options": [
          "0",
          "1",
          "5",
          "Infinite"
        ],
        "correct_option": 1,
        "explanation": "A do-while loop evaluates its condition after executing the body. Thus, the body executes once, reducing x to 8. Then condition (8 > 10) evaluates to false and loop terminates."
      },
      {
        "id": "c-cond-3",
        "question": "In C, what happens if a 'break' statement is omitted from a non-empty 'case' block in a switch statement?",
        "options": [
          "Execution falls through to the next case without evaluating its label condition.",
          "The program generates a compile-time error.",
          "The switch statement exits automatically.",
          "The default block executes immediately."
        ],
        "correct_option": 0,
        "explanation": "In C switch statements, omitting 'break' results in intentional fall-through, executing subsequent case statements sequentially regardless of their match condition."
      }
    ],
    "prerequisites": [
      "Variables, Data Types, and Operators in C",
      "Boolean logic and truth tables"
    ],
    "externalResources": [
      {
        "title": "CS50x: Conditionals and Loops in C",
        "url": "https://cs50.harvard.edu/x/2024/weeks/1/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Beginner"
      },
      {
        "title": "W3Schools C If...Else and While Loop Guide",
        "url": "https://www.w3schools.com/c/c_conditions.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      },
      {
        "title": "GeeksforGeeks: Loops in C and Control Statements",
        "url": "https://www.geeksforgeeks.org/loops-in-c-and-cpp/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "id": "c-functions-recursion",
    "slug": "functions-and-recursion",
    "title": "Functions and Recursion",
    "description": "Call stack mechanics, parameter passing (pass by value), recursion base cases, and stack overflow.",
    "estimatedMinutes": 16,
    "difficulty": "Medium",
    "companyTags": [
      "Amazon",
      "Microsoft",
      "TCS Digital",
      "Infosys"
    ],
    "keyTakeaways": [
      "C is strictly Pass-by-Value; passing pointers simulates pass-by-reference.",
      "Stack frames record return address, local variables, and incoming arguments.",
      "Recursive functions require a strict terminating base case to prevent stack overflow.",
      "Tail recursion occurs when the recursive call is the final statement in the function."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Functions+and+Recursion+C+Programming+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Functions, Stack Frames, and Recursion in C\n\nFunctions are the fundamental unit of modularity and code reuse in C. Understanding how C handles function invocations at the hardware level—via the call stack, stack frames, and parameter passing conventions—is essential for diagnosing stack overflows, debugging memory corruptions, and designing efficient recursive algorithms.\n\n---\n\n## 1. Function Prototypes and ABI Calling Conventions\n\nIn C, a function must be declared before it is invoked so the compiler knows its parameter types and return type:\n```c\n// Function Prototype (Declaration)\nint compute_sum(int a, int b);\n\nint main(void) {\n    int total = compute_sum(10, 20); // Caller\n    return 0;\n}\n\n// Function Definition\nint compute_sum(int a, int b) { // Callee\n    return a + b;\n}\n```\n\n### Pass-by-Value Semantics\n**All function arguments in C are passed strictly by value.** The callee receives a copy of the argument. Modifying a parameter variable inside a function does not alter the caller's variable unless you explicitly pass the address (pointer) of that variable.\n\n---\n\n## 2. Anatomy of the Call Stack & Stack Frames\n\nEvery time a function is called, the CPU allocates an **Activation Record (Stack Frame)** on the call stack.\n\n```\nHigh Memory\n+-------------------------------+\n| Arguments (passed on stack)   |\n+-------------------------------+\n| Return Address (RIP / EIP)    | <-- Pushed by CPU 'call' instruction\n+-------------------------------+\n| Saved Frame Pointer (RBP/EBP) | <-- Pushed during function prologue\n+-------------------------------+\n| Local Variables               |\n|   int total                   |\n|   int buffer[10]              |\n+-------------------------------+ <-- Stack Pointer (RSP / ESP)\nLow Memory (Stack grows DOWNWARD)\n```\n\n1. **Prologue:**\n   - Saves old base pointer: `push %rbp`\n   - Sets new base pointer: `mov %rsp, %rbp`\n   - Allocates local space: `sub $32, %rsp`\n2. **Epilogue:**\n   - Deallocates local space: `mov %rbp, %rsp`\n   - Restores caller base pointer: `pop %rbp`\n   - Pops return address into program counter: `ret`\n\n---\n\n## 3. Principles of Recursion\n\nA recursive function calls itself to solve a smaller subproblem. Every well-formed recursive function requires two fundamental components:\n1. **Base Case:** The terminating condition that returns a result directly without further recursive calls.\n2. **Recursive Step:** Progresses toward the base case by reducing problem size.\n\n```\nFactorial Tree: fact(3)\n  fact(3)\n    -> 3 * fact(2)\n             -> 2 * fact(1)\n                      -> 1 (Base Case reached, unwinding starts)\n             <- 2 * 1 = 2\n    <- 3 * 2 = 6\n```\n\n### Tail Recursion & Optimization\nA function is **tail-recursive** if the recursive call is the very last operation performed before returning. A modern optimizing compiler (`gcc -O2`) can transform tail-recursive functions into an iterative loop (Tail Call Optimization / TCO), reusing the current stack frame and reducing auxiliary space from $O(N)$ to $O(1)$.\n\n```c\n// Not tail recursive: multiplication happens AFTER returning\nint fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n\n// Tail recursive: accumulator carries state forward\nint fact_tail(int n, int acc) {\n    if (n <= 1) return acc;\n    return fact_tail(n - 1, n * acc); // No pending operations!\n}\n```\n\n---\n\n## 4. Worked Code Example: Tower of Hanoi & Fibonacci Trace\n\n```c\n#include <stdio.h>\n\n// Tower of Hanoi: Solves in 2^N - 1 moves\nvoid hanoi(int n, char from_rod, char to_rod, char aux_rod) {\n    if (n == 0) return; // Base case\n    \n    // Step 1: Move top n-1 disks from source to auxiliary\n    hanoi(n - 1, from_rod, aux_rod, to_rod);\n    \n    // Step 2: Move the nth disk from source to destination\n    printf(\"Move disk %d from %c to %c\\n\", n, from_rod, to_rod);\n    \n    // Step 3: Move the n-1 disks from auxiliary to destination\n    hanoi(n - 1, aux_rod, to_rod, from_rod);\n}\n\nint main(void) {\n    printf(\"--- Tower of Hanoi (3 Disks) ---\\n\");\n    hanoi(3, 'A', 'C', 'B');\n    return 0;\n}\n```\n\n---\n\n## 5. High-Yield Interview Traps & Pitfalls\n\n1. **Stack Overflow:**\n   Missing or incorrect base cases lead to infinite recursion. Each call pushes another stack frame until the process stack limit (typically 8MB on Linux) is exhausted, triggering a `SIGSEGV` segmentation fault.\n2. **Returning Address of Local Variable (Dangling Pointer):**\n   ```c\n   int* dangerous(void) {\n       int x = 42;\n       return &x; // FATAL ERROR: x is destroyed when stack frame is popped!\n   }\n   ```\n3. **Exponential Recursion Complexity:**\n   Naive recursive Fibonacci `fib(n) = fib(n-1) + fib(n-2)` takes $O(2^N)$ time and repeats identical subproblems. Use memoization or dynamic programming to achieve $O(N)$ time.\n\n---\n\n## 6. Summary Cheatsheet & Key Formulas\n\n- **Hanoi Moves Formula:** $M(n) = 2^n - 1$ moves.\n- **Maximum Call Stack Depth:** Equals the maximum height of the recursion tree $H$. Memory consumed is $O(H \times \text{frame\\_size})$.\n- **Passing by Reference in C:** Simulated by passing pointers: `void swap(int *a, int *b) { int tmp = *a; *a = *b; *b = tmp; }`.\n",
    "questions": [
      {
        "id": "c-func-1",
        "question": "What is the mechanism by which C passes function arguments?",
        "options": [
          "Pass by reference for all variables",
          "Strictly pass by value",
          "Pass by name",
          "Pass by reference for primitives, pass by value for arrays"
        ],
        "correct_option": 1,
        "explanation": "C is strictly pass-by-value. Even when passing pointers, the pointer value (memory address) is copied by value into the function's parameter."
      },
      {
        "id": "c-func-2",
        "question": "What happens if a recursive function in C lacks a valid base case?",
        "options": [
          "Compilation error",
          "Returns 0 automatically",
          "Stack overflow runtime crash (Segmentation fault)",
          "Compiler converts it to a while loop automatically"
        ],
        "correct_option": 2,
        "explanation": "Without a base case, recursion continues allocating stack frames indefinitely until available call stack memory is exhausted, causing a stack overflow (segmentation fault)."
      },
      {
        "id": "c-func-3",
        "question": "What is a 'tail-recursive' function in C?",
        "options": [
          "A recursive function where the recursive call is the very last operation executed before returning.",
          "A function that calls another function from inside its loop.",
          "A function that returns multiple pointers from the call stack.",
          "A recursive function that does not require a base condition."
        ],
        "correct_option": 0,
        "explanation": "In tail recursion, the recursive invocation is the final computation, allowing optimizing compilers to reuse the current stack frame (tail-call optimization) rather than allocating new stack space."
      }
    ],
    "prerequisites": [
      "Variables, Data Types, and Operators in C",
      "Conditional statements and loop execution"
    ],
    "externalResources": [
      {
        "title": "CS50x: Functions, Call Stack, and Recursion",
        "url": "https://cs50.harvard.edu/x/2024/weeks/3/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Intermediate"
      },
      {
        "title": "W3Schools C Functions & Recursion Tutorial",
        "url": "https://www.w3schools.com/c/c_functions.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      },
      {
        "title": "GeeksforGeeks: Stack Frames and Recursion in C",
        "url": "https://www.geeksforgeeks.org/recursion-in-c/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "id": "c-arrays-and-strings",
    "slug": "arrays-and-strings",
    "title": "Arrays and Strings",
    "description": "Contiguous memory layout, multidimensional arrays, decay to pointers, null-terminated char arrays, and string.h.",
    "estimatedMinutes": 16,
    "difficulty": "Easy",
    "companyTags": [
      "Amazon",
      "TCS Digital",
      "Wipro",
      "HCL"
    ],
    "keyTakeaways": [
      "Arrays occupy contiguous memory blocks; array identifier decays to pointer to first element.",
      "C does not perform bounds checking; out-of-bounds access invokes undefined behavior.",
      "Strings in C are null-terminated (`'\\0'`) character arrays.",
      "Row-major ordering: elements stored row by row in 2D arrays (`arr[i][j]` = `*(arr + i*cols + j)`)."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Arrays+and+Strings+in+C+Programming+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Arrays, Multi-Dimensional Matrices, and Strings in C\n\nAn array is a fixed-size, contiguous sequence of elements of the same data type allocated in memory. In C, arrays and pointers share an intimate mechanical relationship, and strings are simply null-terminated arrays of characters.\n\n---\n\n## 1. Contiguous Memory Layout and Indexing Mechanics\n\nWhen an array is declared:\n```c\nint arr[5] = {10, 20, 30, 40, 50};\n```\nThe compiler allocates $5 \times \text{sizeof(int)} = 20$ consecutive bytes:\n\n```\nIndex:         [0]         [1]         [2]         [3]         [4]\nAddress:     0x2000      0x2004      0x2008      0x200C      0x2010\nValue:         10          20          30          40          50\n```\n\n### The Array Indexing Formula\nC evaluates the subscript expression `arr[i]` using pointer arithmetic:\n$$\text{Address of } arr[i] = \text{Base Address} + i \times \text{sizeof(element)}$$\nBecause addition is commutative:\n`arr[i] == *(arr + i) == *(i + arr) == i[arr]`\nIn C, `2[arr]` is completely valid syntax and compiles to identical machine instructions!\n\n---\n\n## 2. Multi-Dimensional Arrays & Row-Major Order\n\nC stores 2D arrays in **Row-Major Order** (row by row sequentially):\n```c\nint matrix[2][3] = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\n```\nMemory layout: `[1, 2, 3, 4, 5, 6]` (contiguous).\nOffset calculation for `matrix[r][c]` with dimensions $R \times C$:\n$$\text{Address} = \text{Base} + (r \times C + c) \times \text{sizeof(element)}$$\n\n```\nRow 0: [0][0]=1  | [0][1]=2  | [0][2]=3\nRow 1: [1][0]=4  | [1][1]=5  | [1][2]=6\n```\n\n---\n\n## 3. C Strings: The Null Terminator (`\\0`)\n\nA string in C is not a native object; it is an array of characters terminated by the null byte `\\0` (ASCII value `0`).\n```c\nchar greeting[] = \"Hello\";\n// In memory: ['H', 'e', 'l', 'l', 'o', '\\0'] -> 6 bytes!\n```\n- `sizeof(\"Hello\")`: evaluates to `6` (includes the terminating `\\0`).\n- `strlen(\"Hello\")`: counts characters until `\\0`, evaluating to `5`.\n\n### Standard String Library Functions (`<string.h>`)\n- `strlen(s)`: Returns length of string excluding `\\0`. Complexity: $O(N)$.\n- `strcpy(dest, src)`: Unsafely copies string. Prone to buffer overflows!\n- `strncpy(dest, src, n)`: Copies at most $n$ characters. May not null-terminate if source length $\\ge n$.\n- `strcmp(s1, s2)`: Lexicographical comparison. Returns `<0`, `0`, or `>0`.\n- `strcat(dest, src)`: Appends `src` to `dest`.\n- `snprintf(dest, size, format, ...)`: **Modern standard:** Secure, bounded string formatting that guarantees null termination.\n\n---\n\n## 4. Worked Code Example: Safe String Manipulation & Reversal\n\n```c\n#include <stdio.h>\n#include <string.h>\n\nvoid reverseString(char str[]) {\n    int left = 0;\n    int right = strlen(str) - 1;\n    while (left < right) {\n        char temp = str[left];\n        str[left] = str[right];\n        str[right] = temp;\n        left++;\n        right--;\n    }\n}\n\nint main(void) {\n    char buffer[32];\n    \n    // Safe string formatting\n    const char *name = \"StackUp Student\";\n    int score = 98;\n    snprintf(buffer, sizeof(buffer), \"%s: %d\", name, score);\n    printf(\"Formatted: %s (length %zu)\\n\", buffer, strlen(buffer));\n\n    // Reverse in-place\n    reverseString(buffer);\n    printf(\"Reversed:  %s\\n\", buffer);\n\n    return 0;\n}\n```\n\n---\n\n## 5. High-Yield Interview Traps & Pitfalls\n\n1. **Buffer Overflow Vulnerabilities:**\n   Using `gets()` (removed in C11) or unconstrained `scanf(\"%s\", buf)` reads input until newline without checking destination capacity, allowing attackers to overwrite the stack frame return address (smashing the stack). Always use `fgets()` or `scanf(\"%31s\", buf)`.\n2. **Modifying String Literals (Segfault):**\n   ```c\n   char *str = \"Hello\"; \n   str[0] = 'h'; // CRASH: \"Hello\" is stored in read-only .rodata segment!\n   \n   char str2[] = \"Hello\";\n   str2[0] = 'h'; // SAFE: Initialized on the mutable stack frame.\n   ```\n3. **Array Decay to Pointer:**\n   When an array is passed to a function, it decays into a pointer to its first element:\n   ```c\n   void check(int arr[10]) {\n       // sizeof(arr) returns 8 (pointer size on 64-bit), NOT 40!\n       printf(\"sizeof(arr) = %zu\\n\", sizeof(arr));\n   }\n   ```\n   Always pass array length explicitly as a separate parameter!\n\n---\n\n## 6. Summary Cheatsheet & Key Formulas\n\n- **Array Element Address:** $\text{Addr}(arr[i]) = \text{Base} + i \times \text{sizeof(T)}$\n- **2D Row-Major Address:** $\text{Addr}(M[r][c]) = \text{Base} + (r \times \text{COLS} + c) \times \text{sizeof(T)}$\n- **String Termination Invariant:** Every valid C string must terminate with `\\0`. Buffer capacity must always be at least $\text{length} + 1$.\n",
    "questions": [
      {
        "id": "c-arr-1",
        "question": "What does sizeof(\"GATE\") return on a standard C compiler?",
        "options": [
          "4",
          "5",
          "8",
          "Depends on 32-bit vs 64-bit architecture"
        ],
        "correct_option": 1,
        "explanation": "String literals in C include the invisible null-terminator '\\0' at the end. 'G', 'A', 'T', 'E', '\\0' occupies exactly 5 bytes."
      },
      {
        "id": "c-arr-2",
        "question": "If arr is an integer array, which expression is mathematically identical to arr[3] in C?",
        "options": [
          "*(arr + 3)",
          "3[arr]",
          "*(3 + arr)",
          "All of the above"
        ],
        "correct_option": 3,
        "explanation": "In C, array subscript notation arr[i] is defined as *(arr + i). Because addition is commutative, *(arr + 3) == *(3 + arr) == 3[arr]."
      },
      {
        "id": "c-arr-3",
        "question": "What occurs if you attempt to modify a string literal declared as: char *str = \"Hello\"; str[0] = 'h';?",
        "options": [
          "Undefined behavior / Segmentation fault at runtime because string literals reside in read-only memory.",
          "The first character changes to lowercase 'h' successfully.",
          "Compile-time syntax error.",
          "The string is copied automatically to a heap buffer."
        ],
        "correct_option": 0,
        "explanation": "String literals like \"Hello\" are placed in read-only data segments (.rodata). Modifying them through a pointer leads to undefined behavior (typically SIGSEGV). To modify, use an array: char str[] = \"Hello\";."
      }
    ],
    "prerequisites": [
      "Variables, Data Types, and Operators in C",
      "Pointers and memory addresses basics"
    ],
    "externalResources": [
      {
        "title": "CS50x: Arrays and Strings in Memory",
        "url": "https://cs50.harvard.edu/x/2024/weeks/2/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Beginner"
      },
      {
        "title": "W3Schools C Arrays and Strings",
        "url": "https://www.w3schools.com/c/c_arrays.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      },
      {
        "title": "GeeksforGeeks: Strings and Multidimensional Arrays in C",
        "url": "https://www.geeksforgeeks.org/strings-in-c/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "id": "c-pointers-and-arithmetic",
    "slug": "pointers-and-pointer-arithmetic",
    "title": "Pointers and Pointer Arithmetic",
    "description": "Memory addresses, dereferencing, pointer arithmetic scaled by type size, pointers to pointers, and function pointers.",
    "estimatedMinutes": 18,
    "difficulty": "Hard",
    "companyTags": [
      "Google",
      "Amazon",
      "Microsoft",
      "Qualcomm",
      "NVIDIA"
    ],
    "keyTakeaways": [
      "Pointers store memory addresses; dereferencing (`*p`) accesses the value at that address.",
      "Pointer arithmetic scales by `sizeof(*p)`: `p + 1` adds `sizeof(T)` bytes to address.",
      "Void pointer (`void*`) is a generic pointer; must be cast before dereferencing.",
      "Dangling pointers point to deallocated memory; wild pointers are uninitialized pointers."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Pointers+and+Pointer+Arithmetic+in+C+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Pointers and Pointer Arithmetic in C\n\nA pointer is a variable whose value is the memory address of another variable or object. Pointers are C's most powerful feature, enabling dynamic memory management, low-overhead parameter passing, hardware memory-mapped I/O, and runtime polymorphic dispatch via function pointers.\n\n---\n\n## 1. Pointer Mechanics: Addresses and Dereferencing\n\n```c\nint val = 42;\nint *ptr = &val; // Address-of operator (&)\n```\n\n- **Address-of Operator (`&`):** Yields the memory address where variable `val` resides.\n- **Dereference Operator (`*`):** Accesses or mutates the data stored at the address pointed to by `ptr`.\n- `*ptr = 99;` directly overwrites `val` with `99`.\n\n```\nVariable:      val                  ptr\nAddress:      0x3000               0x4000\nValue:        [ 42 ]   <--------   [ 0x3000 ]\nSize:         4 bytes              8 bytes (on 64-bit OS)\n```\n\nOn a 64-bit architecture, every pointer (`char*`, `int*`, `double*`, `void*`, `struct Node*`) occupies **8 bytes** because memory addresses are 64 bits wide.\n\n---\n\n## 2. Pointer Arithmetic Rules\n\nPointer arithmetic is strictly scaled by the size of the referenced type:\n$$\text{New Address} = \text{Base Address} + k \times \text{sizeof}(*ptr)$$\n\n```c\nint arr[3] = {10, 20, 30};\nint *p = arr; // points to 0x1000\n\np = p + 1;    // points to 0x1000 + 1 * sizeof(int) = 0x1004 (arr[1])\np = p + 2;    // points to 0x1004 + 2 * 4 = 0x100C\n```\n\n### Legal Pointer Operations\n1. Adding an integer to a pointer: `ptr + n`\n2. Subtracting an integer from a pointer: `ptr - n`\n3. Subtracting two pointers of the same type: `ptr2 - ptr1` yields the number of elements between them (type `ptrdiff_t`).\n4. Comparing two pointers: `ptr1 < ptr2`, `ptr1 == ptr2` (valid when both point within the same array object).\n\n*Illegal Operations:* Adding two pointers (`ptr1 + ptr2`), multiplying, or dividing pointers is undefined and rejected by the compiler.\n\n---\n\n## 3. Advanced Pointer Constructs\n\n### Double Pointers (Pointers to Pointers)\nA pointer that holds the address of another pointer variable:\n```c\nint x = 10;\nint *p = &x;\nint **pp = &p; // pp -> p -> x\n**pp = 25;     // modifies x directly\n```\nEssential for dynamically allocating 2D matrices or modifying a caller's pointer inside a function (e.g., linked list insertion at head).\n\n### Void Pointers (`void*`)\nA generic pointer that points to an untyped memory address.\n- Can point to any data type without explicit casting.\n- **Cannot be dereferenced directly** without casting to a concrete type (since the compiler does not know `sizeof(*ptr)`).\n- Standard in memory functions: `malloc(size_t size)` returns `void*`.\n\n### Function Pointers\nPoints to executable code in the `.text` segment rather than data.\n```c\nint add(int a, int b) { return a + b; }\n\n// Function pointer declaration:\nint (*operation)(int, int) = add;\nint result = operation(5, 3); // Calls add(5, 3) -> 8\n```\nUsed for callback functions, event-driven architectures, and implementing sorting comparison functions (e.g., standard library `qsort`).\n\n---\n\n## 4. Worked Code Example: Generic Sorting with Function Pointers\n\n```c\n#include <stdio.h>\n#include <stdlib.h>\n\n// Comparison callbacks\nint compareAsc(const void *a, const void *b) {\n    int int_a = *(const int *)a;\n    int int_b = *(const int *)b;\n    return int_a - int_b;\n}\n\nint compareDesc(const void *a, const void *b) {\n    int int_a = *(const int *)a;\n    int int_b = *(const int *)b;\n    return int_b - int_a;\n}\n\nint main(void) {\n    int data[] = {45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 45};\n    size_t n = sizeof(data) / sizeof(data[0]);\n\n    // Sort Ascending using stdlib qsort\n    qsort(data, n, sizeof(int), compareAsc);\n    printf(\"Ascending:  \");\n    for (size_t i = 0; i < n; i++) printf(\"%d \", data[i]);\n    printf(\"\\n\");\n\n    // Sort Descending\n    qsort(data, n, sizeof(int), compareDesc);\n    printf(\"Descending: \");\n    for (size_t i = 0; i < n; i++) printf(\"%d \", data[i]);\n    printf(\"\\n\");\n\n    return 0;\n}\n```\n\n---\n\n## 5. High-Yield Interview Traps & Pitfalls\n\n1. **Dangling Pointers:**\n   A pointer referencing memory that has already been deallocated:\n   ```c\n   int *p = malloc(sizeof(int));\n   free(p);\n   // p is now DANGLING! Accessing *p is Undefined Behavior!\n   p = NULL; // Defend by immediately nullifying freed pointers.\n   ```\n2. **Wild / Uninitialized Pointers:**\n   Declaring `int *p;` allocates the pointer on the stack, containing whatever garbage memory was left over. Dereferencing `*p = 10;` will write to arbitrary memory and corrupt data or crash.\n3. **Const Placement Rules (`const int *` vs `int * const`):**\n   - `const int *p`: Pointer to constant int (cannot modify `*p`, can modify `p`).\n   - `int * const p`: Constant pointer to int (can modify `*p`, cannot modify `p`).\n   - `const int * const p`: Constant pointer to constant int.\n\n---\n\n## 6. Summary Cheatsheet & Key Formulas\n\n- **Pointer Size:** Fixed at 4 bytes (32-bit architecture) or 8 bytes (64-bit architecture) regardless of type.\n- **Pointer Scaling:** `p + 1` increases address by `sizeof(*p)` bytes.\n- **Array-Pointer Identity:** `arr[i] == *(arr + i)`.\n- **NULL Pointer Constant:** `((void*)0)` represents an invalid memory location guaranteed to cause a fault if dereferenced on modern systems.\n",
    "questions": [
      {
        "id": "c-ptr-1",
        "question": "If ptr is a pointer to a double (sizeof(double) = 8 bytes) holding address 0x2000, what is the value of ptr + 3?",
        "options": [
          "0x2003",
          "0x2018",
          "0x2024",
          "0x2008"
        ],
        "correct_option": 1,
        "explanation": "Pointer arithmetic scales by the size of the target data type: 0x2000 + (3 * 8 bytes) = 0x2000 + 24 bytes (0x18 in hex) = 0x2018."
      },
      {
        "id": "c-ptr-2",
        "question": "What is a 'dangling pointer' in C?",
        "options": [
          "A pointer assigned to NULL",
          "A pointer that points to deallocated (freed) memory",
          "An uninitialized pointer pointing to a random memory address",
          "A pointer declared inside a loop"
        ],
        "correct_option": 1,
        "explanation": "A dangling pointer arises when memory pointed to by the pointer is deallocated (e.g. via free() or stack frame pop) while the pointer variable still holds the stale address."
      },
      {
        "id": "c-ptr-3",
        "question": "If 'int *ptr' points to memory address 0x1000 on a system where sizeof(int) == 4, what address is produced by the expression (ptr + 2)?",
        "options": [
          "0x1008",
          "0x1002",
          "0x1004",
          "0x1016"
        ],
        "correct_option": 0,
        "explanation": "Pointer arithmetic automatically scales by the size of the referenced type: new address = 0x1000 + (2 * sizeof(int)) = 0x1000 + 8 = 0x1008."
      }
    ],
    "prerequisites": [
      "Variables, Data Types, and Operators in C",
      "Memory layout and array indexing"
    ],
    "externalResources": [
      {
        "title": "CS50x: Pointers, Addresses, and Memory",
        "url": "https://cs50.harvard.edu/x/2024/weeks/4/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Intermediate"
      },
      {
        "title": "GeeksforGeeks: C Pointers and Pointer Arithmetic",
        "url": "https://www.geeksforgeeks.org/c-pointers/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      },
      {
        "title": "W3Schools C Pointers Tutorial",
        "url": "https://www.w3schools.com/c/c_pointers.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "id": "c-structs-unions-enums",
    "slug": "structures-unions-and-enumerations",
    "title": "Structures, Unions, and Enumerations",
    "description": "User-defined types, structure padding and memory alignment, union shared memory, and typedef enum.",
    "estimatedMinutes": 16,
    "difficulty": "Medium",
    "companyTags": [
      "Qualcomm",
      "Intel",
      "Samsung",
      "Cisco"
    ],
    "keyTakeaways": [
      "Structures allocate independent memory for all members; total size includes padding for alignment.",
      "Unions share a single memory space equal to the size of the largest member.",
      "Structure padding aligns data to word boundaries to optimize CPU memory bus reads.",
      "Enums create named integer constants starting from 0 by default."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Structures+Unions+and+Enums+in+C+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Structures, Unions, Enums, and Memory Alignment in C\n\nWhile primitive types hold single atomic values, user-defined composite types (`struct`, `union`, `enum`) allow developers to model complex entities. In systems programming, understanding how the compiler arranges structure members in physical memory—including CPU word alignment and padding—is crucial for network protocol serialization and memory efficiency.\n\n---\n\n## 1. Structures (`struct`) and Member Access\n\nA `struct` groups heterogeneous variables into a single contiguous block of memory:\n```c\nstruct Student {\n    int id;\n    char name[32];\n    float gpa;\n};\n\n// Declaring and accessing\nstruct Student s1 = {101, \"Alice\", 3.85f};\ns1.gpa = 3.90f; // Direct dot operator (.)\n\nstruct Student *s_ptr = &s1;\ns_ptr->gpa = 4.00f; // Arrow operator (->) equivalent to (*s_ptr).gpa\n```\n\n---\n\n## 2. Structure Padding, Word Alignment, and Holes\n\nCPUs read and write memory most efficiently in natural word boundaries (typically 4-byte or 8-byte aligned addresses). Accessing misaligned data can require multiple memory bus transactions or cause hardware bus faults on RISC architectures.\n\nTo enforce alignment, the compiler injects **padding bytes (memory holes)** between struct members:\n- A member of size $K$ must be stored at an offset that is a multiple of $K$.\n- The total size of the structure must be a multiple of the largest member's alignment requirement.\n\n```c\nstruct Example {\n    char a;      // 1 byte\n    // 3 padding bytes added here!\n    int b;       // 4 bytes (must be aligned to multiple of 4)\n    short c;     // 2 bytes\n    // 2 padding bytes added at end to make total multiple of 4!\n};\n// Total sizeof(struct Example) = 1 + 3 + 4 + 2 + 2 = 12 bytes!\n```\n\n```\nOffset:  0      1   2   3      4   5   6   7      8   9     10  11\nBytes:  [a]   [   PAD   ]    [       b       ]   [   c   ]  [ PAD ]\n```\n\n### Optimizing Member Order\nBy ordering structure members from **largest to smallest**, you minimize wasted padding:\n```c\nstruct Optimized {\n    int b;       // 4 bytes (offset 0)\n    short c;     // 2 bytes (offset 4)\n    char a;      // 1 byte  (offset 6)\n    // 1 padding byte at end\n};\n// Total sizeof(struct Optimized) = 8 bytes (saved 33% memory!)\n```\n\n---\n\n## 3. Unions: Overlapping Shared Memory\n\nWhile a `struct` allocates separate memory for every member, a `union` stores all members at the **exact same memory address**. The size of a union equals the size of its largest member.\n\n```c\nunion DataPacket {\n    int int_val;      // 4 bytes\n    float float_val;  // 4 bytes\n    char raw_bytes[4];// 4 bytes\n};\n// sizeof(union DataPacket) = 4 bytes\n```\n\n### Tagged Unions (Variant Pattern)\nIn production C code, unions are typically paired with an enum tag inside a struct:\n```c\nenum TypeTag { TYPE_INT, TYPE_FLOAT };\n\nstruct Variant {\n    enum TypeTag tag;\n    union {\n        int i;\n        float f;\n    } data;\n};\n```\n\n---\n\n## 4. Enumerations (`enum`) and Bit-Fields\n\n- `enum`: Defines named integer constants. By default, values begin at `0` and increment by `1`.\n```c\nenum HttpStatus { OK = 200, CREATED = 201, BAD_REQUEST = 400, NOT_FOUND = 404 };\n```\n- **Bit-Fields:** Allow precise packing of integer fields down to individual bits (used in TCP/IP packet headers and device registers):\n```c\nstruct PacketHeader {\n    unsigned int version   : 4; // 4 bits (0-15)\n    unsigned int ihl       : 4; // 4 bits\n    unsigned int dscp      : 6; // 6 bits\n    unsigned int ecn       : 2; // 2 bits\n    unsigned int length    : 16;// 16 bits\n};\n```\n\n---\n\n## 5. Worked Code Example: Struct Padding and Packed Binary Serialization\n\n```c\n#include <stdio.h>\n\nstruct Normal {\n    char flag;\n    double value;\n    int count;\n};\n\n// Disable padding for network/disk binary serialization\n#pragma pack(push, 1)\nstruct Packed {\n    char flag;\n    double value;\n    int count;\n};\n#pragma pack(pop)\n\nint main(void) {\n    printf(\"Size of struct Normal (with padding): %zu bytes\\n\", sizeof(struct Normal));\n    // Output: 24 bytes (1 + 7 pad + 8 + 4 + 4 pad)\n\n    printf(\"Size of struct Packed (zero padding): %zu bytes\\n\", sizeof(struct Packed));\n    // Output: 13 bytes (1 + 8 + 4)\n\n    return 0;\n}\n```\n\n---\n\n## 6. High-Yield Interview Traps & Pitfalls\n\n1. **Self-Referential Struct Trap:**\n   ```c\n   struct Node {\n       int val;\n       struct Node next; // ILLEGAL: Infinite recursive size!\n   };\n   // CORRECT: Must use a pointer:\n   struct Node {\n       int val;\n       struct Node *next; // Size is 8 bytes, well-defined!\n   };\n   ```\n2. **Type Punning through Unions:**\n   Writing to one member of a union and reading from another (e.g., writing `float` and reading `int`) to inspect bit representations can run afoul of strict aliasing rules unless using standard union mechanisms.\n3. **Struct Assignment is Shallow Copy:**\n   `s2 = s1;` performs a member-by-member byte copy. If the struct contains pointers, both structs will point to the identical dynamically allocated buffer (leading to double-free bugs on cleanup).\n\n---\n\n## 7. Summary Cheatsheet & Key Formulas\n\n- **Struct Alignment Rule:** Member of size $K$ must reside at address where `offset % K == 0`.\n- **Total Struct Size:** Must be a multiple of $\\max(\text{alignment of all members})$.\n- **Padding Minimization:** Sort members by descending size (`double` $\rightarrow$ `long` $\rightarrow$ `int` $\rightarrow$ `short` $\rightarrow$ `char`).\n- **Union Size:** $\text{Size} = \\max(\text{sizeof(member)})$, rounded up to largest alignment.\n",
    "questions": [
      {
        "id": "c-str-1",
        "question": "On a 32-bit architecture with 4-byte alignment, what is the size of struct { char c; int i; char d; }?",
        "options": [
          "6 bytes",
          "8 bytes",
          "12 bytes",
          "16 bytes"
        ],
        "correct_option": 2,
        "explanation": "char c takes 1 byte + 3 bytes padding so int i can start at a 4-byte boundary. int i takes 4 bytes. char d takes 1 byte + 3 bytes trailing padding so total struct size is a multiple of 4. Total = 12 bytes."
      },
      {
        "id": "c-str-2",
        "question": "What is the primary architectural difference between a struct and a union in C?",
        "options": [
          "Structs can hold functions, unions cannot",
          "Struct members have independent memory addresses; union members share the same base memory address",
          "Unions are allocated on heap; structs are allocated on stack",
          "Structs cannot have pointer members"
        ],
        "correct_option": 1,
        "explanation": "In a struct, each member has its own distinct offset and memory storage. In a union, all members share the same starting memory location, with total size equal to the largest member."
      },
      {
        "id": "c-str-3",
        "question": "On a 64-bit architecture with 4-byte int alignment, what is sizeof(struct Test { char c; int i; char d; })?",
        "options": [
          "12 bytes (due to structure alignment padding)",
          "6 bytes",
          "8 bytes",
          "16 bytes"
        ],
        "correct_option": 0,
        "explanation": "The compiler pads after 'c' (3 bytes padding so 'i' aligns at offset 4), and pads 3 bytes after 'd' so the total struct size is a multiple of largest alignment (4): 1 + 3 + 4 + 1 + 3 = 12 bytes."
      }
    ],
    "prerequisites": [
      "Variables, Data Types, and Operators in C",
      "Pointers and memory addresses basics"
    ],
    "externalResources": [
      {
        "title": "CS50x: Custom Types, Structs, and Memory",
        "url": "https://cs50.harvard.edu/x/2024/weeks/4/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Intermediate"
      },
      {
        "title": "GeeksforGeeks: Structure Padding and Memory Alignment in C",
        "url": "https://www.geeksforgeeks.org/structure-member-alignment-padding-and-data-packing/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Advanced"
      },
      {
        "title": "W3Schools C Structures (structs) Tutorial",
        "url": "https://www.w3schools.com/c/c_structs.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "id": "c-dynamic-memory-allocation",
    "slug": "dynamic-memory-allocation",
    "title": "Dynamic Memory Allocation",
    "description": "Heap management with malloc, calloc, realloc, free, memory leaks, and double-free vulnerabilities.",
    "estimatedMinutes": 16,
    "difficulty": "Medium",
    "companyTags": [
      "Amazon",
      "Google",
      "Adobe",
      "Microsoft"
    ],
    "keyTakeaways": [
      "malloc(n) allocates n uninitialized bytes of heap memory.",
      "calloc(n, size) allocates contiguous memory and initializes all bytes to zero.",
      "realloc(ptr, new_size) resizes existing heap blocks, copying data if relocation is needed.",
      "free(ptr) releases heap memory; failing to call free causes memory leaks."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Dynamic+Memory+Allocation+in+C+malloc+calloc+realloc+free+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Dynamic Memory Allocation: Malloc, Calloc, Realloc, and Free in C\n\nStatic and automatic (stack) memory allocations require that variable sizes be known at compile time and tie memory lifespan to function scope. Dynamic memory allocation allows programs to request variable-sized memory blocks from the operating system's **heap** at runtime that persist until explicitly freed.\n\n---\n\n## 1. Process Virtual Memory Architecture: Stack vs Heap\n\nA running C process is mapped into a virtual address space:\n\n```\nHigh Memory (0xFFFFFFFF...):\n+-------------------------------+\n| Kernel Space (Restricted)     |\n+-------------------------------+\n| Stack (grows DOWNWARD)        | <-- Automatic local variables, stack frames\n|      |                        |\n|      v                        |\n|                               |\n|      ^                        |\n|      |                        |\n| Heap (grows UPWARD via brk)   | <-- Dynamic memory (malloc, calloc)\n+-------------------------------+\n| BSS (Uninitialized Globals)   | <-- Zero-initialized by kernel\n+-------------------------------+\n| Data (Initialized Globals)    | <-- Stored in executable binary\n+-------------------------------+\n| Text (Machine Code)           | <-- Read-only executable instructions\n+-------------------------------+\nLow Memory (0x00000000...):\n```\n\n---\n\n## 2. The Standard Memory Management Functions (`<stdlib.h>`)\n\n### `malloc(size_t size)`\n- Allocates `size` consecutive bytes from the heap.\n- Does **not** initialize memory; allocated bytes contain arbitrary garbage values.\n- Returns a `void*` pointing to the first byte on success; returns `NULL` if memory is exhausted.\n\n### `calloc(size_t num, size_t size)`\n- Allocates $(num \times size)$ consecutive bytes.\n- **Initializes all allocated bytes to zero** (`0x00`).\n- Slower than `malloc()` because of the zeroing step, but safer against uninitialized memory bugs.\n\n### `realloc(void *ptr, size_t new_size)`\n- Resizes a previously allocated memory block.\n- If larger: expands in-place if possible, or allocates a new block, copies old content, frees the old block, and returns the new pointer.\n- If `ptr` is `NULL`, acts like `malloc(new_size)`.\n- If `new_size` is `0`, acts like `free(ptr)`.\n\n### `free(void *ptr)`\n- Releases allocated heap memory back to the memory allocator / OS.\n- If `ptr` is `NULL`, `free()` safely does nothing.\n\n---\n\n## 3. Worked Code Example: Dynamic Vector with Realloc\n\n```c\n#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    size_t size;\n    size_t capacity;\n} Vector;\n\nVector* createVector(size_t initial_cap) {\n    Vector *v = malloc(sizeof(Vector));\n    if (!v) return NULL; // Check allocation\n\n    v->data = malloc(initial_cap * sizeof(int));\n    if (!v->data) {\n        free(v);\n        return NULL;\n    }\n    v->size = 0;\n    v->capacity = initial_cap;\n    return v;\n}\n\nvoid pushVector(Vector *v, int val) {\n    if (v->size == v->capacity) {\n        size_t new_cap = v->capacity * 2;\n        // CRITICAL: Store in temporary pointer to prevent memory leak on realloc failure!\n        int *new_data = realloc(v->data, new_cap * sizeof(int));\n        if (!new_data) {\n            fprintf(stderr, \"Fatal: Out of memory!\\n\");\n            return;\n        }\n        v->data = new_data;\n        v->capacity = new_cap;\n    }\n    v->data[v->size++] = val;\n}\n\nvoid freeVector(Vector *v) {\n    if (v) {\n        free(v->data); // Free payload first\n        free(v);       // Free wrapper struct\n    }\n}\n\nint main(void) {\n    Vector *v = createVector(2);\n    for (int i = 1; i <= 5; i++) {\n        pushVector(v, i * 10);\n    }\n\n    printf(\"Vector elements (capacity %zu): \", v->capacity);\n    for (size_t i = 0; i < v->size; i++) {\n        printf(\"%d \", v->data[i]);\n    }\n    printf(\"\\n\");\n\n    freeVector(v);\n    return 0;\n}\n```\n\n---\n\n## 4. High-Yield Interview Traps & Memory Bugs\n\n1. **Memory Leaks:**\n   Losing all pointer references to an allocated heap block before calling `free()`. Over long runtimes (daemons, servers), leaked memory accumulates until the OS kills the process via the Out-Of-Memory (OOM) killer.\n2. **Double Free:**\n   Calling `free(p)` twice on the same pointer. Corrupts internal heap metadata and opens severe arbitrary code execution vulnerabilities. **Remedy:** Always assign `p = NULL;` immediately after `free(p);`.\n3. **The `realloc` Assignment Leak Trap:**\n   ```c\n   // CATASTROPHIC BUG:\n   ptr = realloc(ptr, new_size);\n   // If realloc fails, it returns NULL. Overwriting ptr means the original\n   // memory block is now unrecoverable and permanently leaked!\n   ```\n4. **Use-After-Free (UAF):**\n   Reading or writing to `*ptr` after calling `free(ptr)`.\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Always Check for NULL:** `int *p = malloc(n * sizeof(int)); if (p == NULL) { /* handle error */ }`.\n- **Memory Debugging Tools:** Use **Valgrind** (`valgrind --leak-check=full ./program`) or **AddressSanitizer** (`gcc -fsanitize=address -g program.c`).\n- **Cast on Malloc:** In pure C, do NOT cast the return value of `malloc`: `int *p = malloc(...)` is preferred over `int *p = (int*)malloc(...)`.\n",
    "questions": [
      {
        "id": "c-dma-1",
        "question": "What is the key functional difference between malloc() and calloc()?",
        "options": [
          "malloc allocates on stack, calloc on heap",
          "calloc initializes all allocated bytes to zero, whereas malloc leaves them uninitialized",
          "malloc can allocate arrays, calloc cannot",
          "calloc is faster than malloc"
        ],
        "correct_option": 1,
        "explanation": "calloc(n, size) allocates memory and clears all bytes to zero (0). malloc(size) allocates memory without initialization, leaving existing garbage values."
      },
      {
        "id": "c-dma-2",
        "question": "If realloc(ptr, new_size) fails to find contiguous space, what does it return?",
        "options": [
          "It frees ptr and returns NULL",
          "It returns NULL, leaving the original memory block at ptr untouched",
          "It crashes with Segmentation Fault",
          "It truncates the memory block to 0"
        ],
        "correct_option": 1,
        "explanation": "On failure, realloc() returns NULL, but the original memory block remains valid and unchanged. Therefore, assigning the result directly to the original pointer (ptr = realloc(ptr, size)) can cause a memory leak if realloc fails."
      },
      {
        "id": "c-dma-3",
        "question": "What is a 'dangling pointer' in C, and what is the standard recommended defensive practice immediately after calling free(ptr)?",
        "options": [
          "A pointer referencing deallocated memory; prevented by immediately assigning ptr = NULL after free(ptr).",
          "A pointer that was never initialized; prevented by declaring it as static.",
          "A pointer holding address 0x0; prevented by casting it to void*.",
          "A pointer pointing across stack frames; prevented by using alloca()."
        ],
        "correct_option": 0,
        "explanation": "A dangling pointer arises when memory is released via free() but the pointer variable still holds the freed address. Dereferencing it causes undefined behavior. Assigning ptr = NULL immediately ensures subsequent accidental access fails predictably with a crash rather than silent memory corruption."
      }
    ],
    "prerequisites": [
      "Pointers and pointer arithmetic in C",
      "Stack frames and process virtual address space"
    ],
    "externalResources": [
      {
        "title": "CS50x: Dynamic Memory Allocation with malloc and free",
        "url": "https://cs50.harvard.edu/x/2024/weeks/4/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Intermediate"
      },
      {
        "title": "GeeksforGeeks: Dynamic Memory Allocation in C (malloc, calloc, realloc, free)",
        "url": "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-realloc/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      },
      {
        "title": "W3Schools C Memory Management",
        "url": "https://www.w3schools.com/c/c_memory_management.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "id": "c-storage-classes-and-scope",
    "slug": "storage-classes-and-scope",
    "title": "Storage Classes and Scope",
    "description": "Variable lifetimes, visibility scopes, and storage specifiers: auto, register, static, and extern.",
    "estimatedMinutes": 15,
    "difficulty": "Medium",
    "companyTags": [
      "Cisco",
      "Intel",
      "Texas Instruments",
      "TCS Digital"
    ],
    "keyTakeaways": [
      "auto: Default local scope, allocated on stack, destroyed on block exit.",
      "register: Requests CPU register storage for speed; cannot take its address (`&`).",
      "static: Retains value across function calls, initialized once, allocated in data segment.",
      "extern: Declares global variable defined in another translation unit."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Storage+Classes+in+C+auto+static+extern+register+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Storage Classes, Scope, Lifetime, and Linkage in C\n\nIn C, every variable and function possesses two key attributes: **Scope** (where the identifier can be legally referenced) and **Lifetime** (how long the variable occupies physical storage). Storage classes (`auto`, `register`, `static`, `extern`) tell the compiler where to store variables, their default initial values, and their visibility across translation units.\n\n---\n\n## 1. The Four Storage Classes Compared\n\n| Storage Class | Keyword | Storage Location | Default Initial Value | Scope | Lifetime | Linkage |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **Automatic** | `auto` | Stack | Garbage value | Local (block `{}`) | End of block | None |\n| **Register** | `register` | CPU Register / Stack | Garbage value | Local (block `{}`) | End of block | None |\n| **Static Local** | `static` | Data / BSS Segment | Zero (`0`) | Local (block `{}`) | Entire program | None |\n| **Static Global** | `static` | Data / BSS Segment | Zero (`0`) | Current File only | Entire program | Internal |\n| **External** | `extern` | Data / BSS Segment | Zero (`0`) | Entire Program | Entire program | External |\n\n---\n\n## 2. In-Depth Analysis of Key Storage Classes\n\n### `static` Local Variables: Persistent State\nA `static` variable declared inside a function is initialized **exactly once** when the program starts (in the data/BSS segment). When the function returns, the variable retains its value across subsequent invocations:\n```c\nint getUniqueId(void) {\n    static int id_counter = 1000; // Initialized once!\n    return id_counter++;\n}\n```\n\n### `static` Functions and Global Variables: Internal Linkage\nWhen applied to global variables or functions at file scope, `static` restricts visibility strictly to the current translation unit (`.c` file).\n- Prevents naming collisions across large projects.\n- Serves as C's equivalent to `private` encapsulation in object-oriented languages.\n\n### `extern`: Multi-File Sharing and External Linkage\nThe `extern` keyword declares a variable or function that is defined in another source file, informing the linker to resolve its address during the linking phase:\n```c\n// File: config.c\nint MAX_CONNECTIONS = 500; // Definition (allocates storage)\n\n// File: main.c\nextern int MAX_CONNECTIONS; // Declaration (no storage allocated)\n```\n\n---\n\n## 3. Worked Code Example: Static Counters and Scope Shadowing\n\n```c\n#include <stdio.h>\n\n// Global variable with external linkage\nint global_var = 100;\n\n// File-scoped static variable (internal linkage)\nstatic int file_secret = 42;\n\nvoid demoScope(void) {\n    int local_var = 1;        // Auto variable (recreated each call)\n    static int persistent = 1;// Static variable (persists across calls)\n\n    local_var++;\n    persistent++;\n\n    printf(\"Local: %d, Persistent Static: %d\\n\", local_var, persistent);\n}\n\nint main(void) {\n    printf(\"--- Function Calls ---\\n\");\n    demoScope(); // Local: 2, Persistent: 2\n    demoScope(); // Local: 2, Persistent: 3\n    demoScope(); // Local: 2, Persistent: 4\n\n    // Scope Shadowing\n    int global_var = 999; // Shadows the global variable inside main\n    printf(\"Shadowed global_var in main: %d\\n\", global_var); // 999\n\n    return 0;\n}\n```\n\n---\n\n## 4. High-Yield Interview Traps & Pitfalls\n\n1. **Address of a `register` Variable:**\n   You **cannot use the address-of operator `&` on a `register` variable**:\n   ```c\n   register int fast_counter = 0;\n   int *p = &fast_counter; // COMPILER ERROR: Register variables have no memory address!\n   ```\n2. **`extern` Variable Initialization Trap:**\n   `extern int x;` is a declaration. But `extern int x = 10;` is treated as a definition, which causes linker conflicts (`multiple definition of x`) if placed in a shared header file.\n3. **Static Functions in Headers:**\n   Placing a `static` function in a header file duplicates the function code into every `.c` file that includes it, bloating binary size.\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Internal Linkage (`static` at file scope):** Symbol is visible only within the compiling `.o` object file.\n- **External Linkage (`extern` or default globals):** Symbol is exported to the global symbol table and can be resolved by other compilation units.\n- **Default Initialization:** Globals and `static` variables default to zero (`0`, `0.0`, `NULL`). Stack variables (`auto`) contain uninitialized stack garbage!\n",
    "questions": [
      {
        "id": "c-sc-1",
        "question": "Why is the expression '&reg_var' invalid if reg_var is declared with the 'register' storage class?",
        "options": [
          "Register variables are read-only",
          "Registers in the CPU do not have memory RAM addresses",
          "Register variables are dynamically allocated",
          "The compiler treats register variables as constants"
        ],
        "correct_option": 1,
        "explanation": "Variables declared with the 'register' specifier are stored directly inside CPU microprocessor registers rather than RAM. Because registers do not have memory addresses, applying the address-of operator (&) is illegal."
      },
      {
        "id": "c-sc-2",
        "question": "Where are static variables with zero initialization stored in a compiled C binary?",
        "options": [
          "Call Stack",
          "Heap",
          "BSS Segment",
          "Text (Code) Segment"
        ],
        "correct_option": 2,
        "explanation": "Uninitialized or zero-initialized static and global variables are stored in the BSS (Block Started by Symbol) segment of the program's data memory."
      },
      {
        "id": "c-stor-3",
        "question": "What is the lifetime and scope of a local variable declared with the 'static' specifier inside a function?",
        "options": [
          "Lifetime: Entire program execution; Scope: Local to the enclosing function.",
          "Lifetime: Only during the function execution; Scope: Global.",
          "Lifetime: Entire program execution; Scope: Accessible across all project files.",
          "Lifetime: Until stack frame is destroyed; Scope: Block scope."
        ],
        "correct_option": 0,
        "explanation": "A static local variable is stored in the data segment, retaining its value between function calls across the entire program lifetime, but its visibility remains restricted to the function scope where declared."
      }
    ],
    "prerequisites": [
      "Variables, Data Types, and Operators in C",
      "Compilation units and the C preprocessor"
    ],
    "externalResources": [
      {
        "title": "GeeksforGeeks: Storage Classes in C (auto, register, static, extern)",
        "url": "https://www.geeksforgeeks.org/storage-classes-in-c/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      },
      {
        "title": "W3Schools C Scope & Lifetime",
        "url": "https://www.w3schools.com/c/c_scope.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      },
      {
        "title": "CS50x: Multi-File Programs and Linkage",
        "url": "https://cs50.harvard.edu/x/2024/weeks/4/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "id": "c-preprocessor-directives",
    "slug": "preprocessor-directives",
    "title": "Preprocessor Directives",
    "description": "Pre-compilation translation: #include, #define macros, token pasting (##), stringizing (#), and header guards.",
    "estimatedMinutes": 14,
    "difficulty": "Easy",
    "companyTags": [
      "Samsung",
      "Sony",
      "Bosch",
      "HCL"
    ],
    "keyTakeaways": [
      "Preprocessor executes text substitution before compiler lexical analysis.",
      "Header guards (`#ifndef HEADER_H #define HEADER_H ... #endif`) prevent multiple inclusions.",
      "Macros should always parenthesize arguments to prevent operator precedence bugs.",
      "`#` operator converts parameter to string literal; `##` concatenates two tokens."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Preprocessor+Directives+in+C+macros+include+ifdef+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Preprocessor Directives, Macros, and Conditional Compilation in C\n\nThe C preprocessor is a text substitution tool that runs as the first stage of the compilation pipeline (before syntax analysis or machine code generation). Directives begin with `#` and control header file inclusion, macro substitution, and conditional code compilation.\n\n---\n\n## 1. The C Compilation Pipeline\n\n```\nSource (.c) ---> [ Preprocessor ] ---> Expanded Source (.i)\n                        |\n                        v\n                 [ Compiler ]    ---> Assembly (.s)\n                        |\n                        v\n                 [ Assembler ]   ---> Object File (.o)\n                        |\n                        v\n                 [ Linker ]      ---> Executable Binary (.exe / a.out)\n```\nYou can inspect preprocessor output directly using: `gcc -E main.c -o main.i`.\n\n---\n\n## 2. File Inclusion Directives\n\n- `#include <stdio.h>`: Directs the preprocessor to search standard system include directories (`/usr/include`).\n- `#include \"my_header.h\"`: Directs the preprocessor to search the **current local directory first**, falling back to system paths if not found.\n\n### Header Guards to Prevent Multiple Inclusion\nIf a header is included multiple times across nested dependencies, structures and types will be redefined, causing compilation errors. Standard header guard idiom:\n```c\n#ifndef MY_MODULE_H\n#define MY_MODULE_H\n\n// Declarations here\nstruct Config { int port; };\n\n#endif // MY_MODULE_H\n```\nAlternatively, modern compilers support `#pragma once` as a non-standard but universally supported compiler directive.\n\n---\n\n## 3. Macros: Function-Like Macros and Parenthesis Traps\n\nMacros perform raw textual replacement:\n```c\n#define PI 3.1415926535\n#define SQUARE(x) ((x) * (x))\n```\n\n### The Deadly Missing-Parentheses Trap\nIf you define:\n```c\n#define BAD_SQUARE(x) x * x\n```\nCalling `BAD_SQUARE(2 + 3)` expands to:\n$$2 + 3 \times 2 + 3 = 2 + 6 + 3 = 11 \\quad (\text{NOT } 25!)$$\n**Golden Rule:** Always wrap both the macro argument and the entire macro expression in parentheses:\n```c\n#define SAFE_SQUARE(x) ((x) * (x))\n```\n\n---\n\n## 4. Advanced Preprocessor Operators: `#` and `##`\n\n- **Stringification Operator (`#`):** Converts a macro argument into a quoted string literal.\n```c\n#define PRINT_INT(var) printf(#var \" = %d\\n\", var)\n// PRINT_INT(total); expands to: printf(\"total\" \" = %d\\n\", total);\n```\n- **Token Pasting Operator (`##`):** Concatenates two tokens into a single legal C identifier during preprocessing:\n```c\n#define MAKE_FUNC(name) void run_##name(void) { printf(\"Running \" #name \"\\n\"); }\nMAKE_FUNC(test) // Generates: void run_test(void) { ... }\n```\n\n---\n\n## 5. Worked Code Example: Conditional Compilation and Debug Logging\n\n```c\n#include <stdio.h>\n\n// Debug macro enabled only when DEBUG is defined\n#ifdef DEBUG\n    #define LOG_DEBUG(fmt, ...) \\\n        fprintf(stderr, \"[DEBUG %s:%d]: \" fmt \"\\n\", __FILE__, __LINE__, ##__VA_ARGS__)\n#else\n    #define LOG_DEBUG(fmt, ...) // Expands to empty statement in release builds!\n#endif\n\nint main(void) {\n    int socket_fd = 4;\n    LOG_DEBUG(\"Socket opened successfully with fd=%d\", socket_fd);\n\n    printf(\"Application running normally.\\n\");\n    return 0;\n}\n```\n\n---\n\n## 6. High-Yield Interview Traps & Pitfalls\n\n1. **Macro Argument Double Evaluation:**\n   ```c\n   #define MAX(a, b) ((a) > (b) ? (a) : (b))\n   int x = 5, y = 10;\n   int z = MAX(x++, y++);\n   // Expands to: ((x++) > (y++) ? (x++) : (y++))\n   // y is incremented TWICE! Evaluates to 11, y becomes 12!\n   ```\n   Prefer `inline` functions over complex macros in modern C99+.\n2. **Semicolon After Macro Definition:**\n   `#define VALUE 100;` expands `int x = VALUE;` to `int x = 100;;`, which can break `if-else` chains.\n3. **Predefined Standard Macros:**\n   `__FILE__`, `__LINE__`, `__DATE__`, `__TIME__`, `__STDC__`.\n\n---\n\n## 7. Summary Cheatsheet & Key Formulas\n\n- **Header Guard Formula:** `#ifndef UNIQUE_TAG` $\rightarrow$ `#define UNIQUE_TAG` $\rightarrow$ declarations $\rightarrow$ `#endif`.\n- **Stringify:** `#x` converts parameter to `\"x\"`.\n- **Token Concatenate:** `a ## b` pastes tokens into `ab`.\n- **Compiler Preprocessing Flag:** `gcc -E -dM file.c` dumps all defined macros.\n",
    "questions": [
      {
        "id": "c-prep-1",
        "question": "What is the output of the macro expression:\n\n#define CUBE(x) x*x*x\nint ans = CUBE(1 + 1);",
        "options": [
          "8",
          "3",
          "1",
          "Compilation Error"
        ],
        "correct_option": 1,
        "explanation": "Without parentheses around parameters in the macro definition, CUBE(1 + 1) expands strictly as textual substitution: 1 + 1 * 1 + 1 * 1 + 1. By multiplication precedence: 1 + 1 + 1 = 3."
      },
      {
        "id": "c-prep-2",
        "question": "What does the token pasting operator (##) do in C preprocessor directives?",
        "options": [
          "Converts an argument into a string literal",
          "Concatenates two tokens into a single token",
          "Includes a system library header",
          "Performs bitwise XOR"
        ],
        "correct_option": 1,
        "explanation": "The token pasting operator (##) merges two separate lexical tokens into one single token during preprocessing."
      },
      {
        "id": "c-prep-3",
        "question": "Given: #define SQUARE(x) x * x. What does the expression SQUARE(2 + 3) evaluate to?",
        "options": [
          "11 (because it expands textually to 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11)",
          "25",
          "10",
          "Undefined behavior"
        ],
        "correct_option": 0,
        "explanation": "Preprocessors perform textual substitution without operator precedence awareness: SQUARE(2 + 3) expands to 2 + 3 * 2 + 3. Due to multiplication precedence, 3 * 2 = 6, yielding 2 + 6 + 3 = 11. To prevent this, define as ((x) * (x))."
      }
    ],
    "prerequisites": [
      "Variables, Data Types, and Operators in C",
      "C compilation stages (Preprocessing, Compiling, Assembling, Linking)"
    ],
    "externalResources": [
      {
        "title": "CS50x: The Preprocessor and Macros",
        "url": "https://cs50.harvard.edu/x/2024/weeks/4/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Beginner"
      },
      {
        "title": "GeeksforGeeks: C Preprocessor Directives",
        "url": "https://www.geeksforgeeks.org/c-preprocessor-directives/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      },
      {
        "title": "W3Schools C Preprocessor Tutorial",
        "url": "https://www.w3schools.com/c/c_preprocessor.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "id": "c-file-handling",
    "slug": "file-handling",
    "title": "File Handling",
    "description": "File streams, fopen modes, buffered I/O, fprintf/fscanf, fread/fwrite, fseek, ftell, and rewind.",
    "estimatedMinutes": 15,
    "difficulty": "Medium",
    "companyTags": [
      "Infosys",
      "Wipro",
      "TCS",
      "Accenture"
    ],
    "keyTakeaways": [
      "Files are accessed via FILE* streams in <stdio.h>.",
      "Modes: 'r' (read), 'w' (write/truncate), 'a' (append), 'r+' (read/write). Add 'b' for binary.",
      "fread and fwrite perform direct binary block transfers.",
      "fseek navigates file position pointer: SEEK_SET, SEEK_CUR, SEEK_END."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=File+Handling+in+C+fopen+fread+fwrite+fseek+C+Programming+lecture+tutorial",
    "notesMarkdown": "# File Handling and Stream I/O in C\n\nFile handling allows programs to read from and write to secondary storage devices (disk, SSD), persisting data beyond the lifetime of the process. In C, file I/O is managed through the abstract stream model encapsulated by the standard library structure `FILE*` defined in `<stdio.h>`.\n\n---\n\n## 1. The Stream Model and `FILE*` Architecture\n\nWhen a file is opened with `fopen()`, the C runtime:\n1. Requests an open file descriptor from the operating system kernel.\n2. Allocates an internal buffer in user space (typically 4KB) to minimize expensive system call context switches.\n3. Returns a pointer to a `FILE` structure holding the file descriptor, current position indicator, and error flags.\n\n```\nProgram (C code)\n      ^\n      | fread() / fwrite() (buffered in user space)\n      v\n+-------------------------------+\n|  FILE* Internal Buffer (4KB)  |\n+-------------------------------+\n| OS Kernel System Calls        | (read(), write())\n+-------------------------------+\n| Physical Storage Disk / SSD   |\n+-------------------------------+\n```\n\n---\n\n## 2. File Opening Modes (`fopen`)\n\n| Mode | Purpose | Existing File Action | If File Doesn't Exist |\n| :--- | :--- | :--- | :--- |\n| `\"r\"` | Read text | Opens at beginning | Returns `NULL` (Error) |\n| `\"w\"` | Write text | **Truncates to 0 bytes (Overwrites)** | Creates new file |\n| `\"a\"` | Append text | Opens for writing at end of file | Creates new file |\n| `\"r+\"`| Read and Write | Opens at beginning without truncation | Returns `NULL` (Error) |\n| `\"w+\"`| Read and Write | Truncates to 0 bytes | Creates new file |\n| `\"a+\"`| Read and Append| Reads from beginning, writes only at end | Creates new file |\n| `\"rb\"`, `\"wb\"`| Binary modes | Same as above, but disables CRLF newline translations |\n\n---\n\n## 3. Core File I/O Functions\n\n- **Text Character I/O:** `fgetc(fp)`, `fputc(ch, fp)`.\n- **Text Line I/O:** `fgets(buffer, sizeof(buffer), fp)`, `fputs(str, fp)`.\n  - `fgets()` is safe against buffer overflows because it takes maximum buffer capacity as a parameter and retains the newline `\\n`.\n- **Formatted I/O:** `fscanf(fp, \"%d\", &val)`, `fprintf(fp, \"Total: %d\\n\", val)`.\n- **Direct Binary I/O:**\n  - `size_t fread(void *ptr, size_t size, size_t count, FILE *fp)`\n  - `size_t fwrite(const void *ptr, size_t size, size_t count, FILE *fp)`\n  - Returns the number of complete items successfully read or written.\n\n---\n\n## 4. File Positioning: Random Access (`fseek`, `ftell`, `rewind`)\n\n- `fseek(fp, offset, whence)`: Moves file position indicator:\n  - `SEEK_SET`: Offset from beginning of file.\n  - `SEEK_CUR`: Offset from current position.\n  - `SEEK_END`: Offset from end of file.\n- `ftell(fp)`: Returns current byte offset from the beginning (useful for finding file size).\n- `rewind(fp)`: Resets position indicator back to beginning: equivalent to `(void)fseek(fp, 0L, SEEK_SET)`.\n\n---\n\n## 5. Worked Code Example: Binary Record Serialization & File Size Calculation\n\n```c\n#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int id;\n    char name[20];\n    double balance;\n} Account;\n\nlong getFileSize(FILE *fp) {\n    fseek(fp, 0, SEEK_END);\n    long size = ftell(fp);\n    rewind(fp);\n    return size;\n}\n\nint main(void) {\n    const char *filename = \"accounts.bin\";\n    \n    // 1. Write binary record\n    FILE *fp = fopen(filename, \"wb\");\n    if (!fp) {\n        perror(\"Failed to open file for writing\");\n        return 1;\n    }\n\n    Account acc1 = {1001, \"Alice\", 4500.50};\n    fwrite(&acc1, sizeof(Account), 1, fp);\n    fclose(fp);\n\n    // 2. Read binary record back\n    fp = fopen(filename, \"rb\");\n    if (!fp) {\n        perror(\"Failed to open file for reading\");\n        return 1;\n    }\n\n    printf(\"File size on disk: %ld bytes\\n\", getFileSize(fp));\n\n    Account acc_read;\n    if (fread(&acc_read, sizeof(Account), 1, fp) == 1) {\n        printf(\"Read Account: ID=%d, Name=%s, Balance=%.2f\\n\",\n               acc_read.id, acc_read.name, acc_read.balance);\n    }\n\n    fclose(fp);\n    return 0;\n}\n```\n\n---\n\n## 6. High-Yield Interview Traps & Pitfalls\n\n1. **The `while (!feof(fp))` Bug:**\n   `feof()` returns true **only after a read operation attempts to read PAST the end of the file**.\n   Using `while (!feof(fp)) { fread(...); process(...); }` will execute the loop body one extra time with stale or duplicate data!\n   **Correct idiom:** Loop on the read function itself:\n   ```c\n   while (fgets(line, sizeof(line), fp) != NULL) {\n       // Process valid line\n   }\n   ```\n2. **Resource Leak (Missing `fclose`):**\n   Failing to close files leaves file descriptors open in the OS table (causing `EMFILE` Too many open files errors) and risks data loss because unflushed user-space write buffers are never committed to disk.\n3. **Text Mode vs Binary Mode on Windows:**\n   On Windows, text mode translates `\\n` into CRLF (`\\r\\n`) on write and CRLF into `\\n` on read. For binary data (images, serialized structs), always open with `\"rb\"` or `\"wb\"` to avoid corrupted byte sequences.\n\n---\n\n## 7. Summary Cheatsheet & Key Formulas\n\n- **Check Return on Open:** `FILE *fp = fopen(...); if (fp == NULL) { /* handle error */ }`.\n- **Calculate File Size Formula:** `fseek(fp, 0, SEEK_END); long sz = ftell(fp); rewind(fp);`.\n- **Flush Output Stream:** `fflush(fp)` forces unwritten buffered data directly to the OS kernel.\n",
    "questions": [
      {
        "id": "c-file-1",
        "question": "What is the return value of fopen() when it fails to open the requested file?",
        "options": [
          "-1",
          "0",
          "NULL",
          "EOF"
        ],
        "correct_option": 2,
        "explanation": "fopen() returns a valid FILE pointer on success, or NULL pointer if the file cannot be opened (due to missing file, permission denial, etc.)."
      },
      {
        "id": "c-file-2",
        "question": "Which fseek origin flag specifies that the offset is measured relative to the end of the file?",
        "options": [
          "SEEK_SET",
          "SEEK_CUR",
          "SEEK_END",
          "SEEK_EOF"
        ],
        "correct_option": 2,
        "explanation": "SEEK_END tells fseek to calculate the new file position relative to the end of the file (e.g. fseek(fp, -10, SEEK_END) moves 10 bytes before the end)."
      },
      {
        "id": "c-file-3",
        "question": "Why should the return value of fgetc(FILE *stream) be assigned to an 'int' variable rather than a 'char'?",
        "options": [
          "Because EOF is an integer constant (typically -1) that cannot be reliably distinguished from valid characters if truncated to unsigned char.",
          "Because fgetc reads 4 bytes at a time from disk buffers.",
          "Because C files only store Unicode codepoints.",
          "Because char is not a legal return type in standard C library headers."
        ],
        "correct_option": 0,
        "explanation": "fgetc returns an unsigned char converted to int or EOF (-1). If stored in a char on systems where char is unsigned, EOF (255) would collide with ÿ (character 255), creating an infinite loop or terminating early."
      }
    ],
    "prerequisites": [
      "Pointers and memory addresses in C",
      "Character strings and array buffers"
    ],
    "externalResources": [
      {
        "title": "CS50x: File I/O in C (fopen, fread, fwrite)",
        "url": "https://cs50.harvard.edu/x/2024/weeks/4/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Intermediate"
      },
      {
        "title": "GeeksforGeeks: Basics of File Handling in C",
        "url": "https://www.geeksforgeeks.org/basics-file-handling-c/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      },
      {
        "title": "W3Schools C Files Tutorial",
        "url": "https://www.w3schools.com/c/c_files.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "id": "c-command-line-arguments",
    "slug": "command-line-arguments",
    "title": "Command-Line Arguments",
    "description": "The main function signature: argc and argv, environment variables, argument parsing, and exit status codes.",
    "estimatedMinutes": 14,
    "difficulty": "Easy",
    "companyTags": [
      "Amazon",
      "TCS Digital",
      "Infosys",
      "IBM"
    ],
    "keyTakeaways": [
      "main signature: int main(int argc, char *argv[]).",
      "argc represents the argument count (including program executable path at argv[0]).",
      "argv is an array of strings (pointers to char).",
      "argv[argc] is guaranteed by the C standard to be a NULL pointer."
    ],
    "youtube_url": "https://www.youtube.com/results?search_query=Command+Line+Arguments+in+C+argc+argv+C+Programming+lecture+tutorial",
    "notesMarkdown": "# Command-Line Arguments and Program Entrypoints in C\n\nCommand-line arguments allow users to pass parameters, configuration flags, and file paths directly to a C program upon launch from a shell (e.g., `./app --verbose --port 8080 input.txt`). In standard C, these arguments are received via the parameters of the `main()` function: `argc` and `argv`.\n\n---\n\n## 1. Anatomy of `main(int argc, char *argv[])`\n\n```c\nint main(int argc, char *argv[])\n```\n\n- **`argc` (Argument Count):** Non-negative integer representing the total number of command-line arguments passed. `argc` is **always at least 1**.\n- **`argv` (Argument Vector):** An array of pointers to null-terminated character strings (`char*`).\n  - `argv[0]`: Points to the program name or executable invocation path.\n  - `argv[1]` to `argv[argc - 1]`: Point to individual command-line tokens separated by whitespace in the shell.\n  - `argv[argc]`: Strictly guaranteed by the C standard to be `NULL`.\n\n```\nCommand: ./server -p 8080\n\nargc = 3\n\nargv[0] ----> \"./server\\0\"\nargv[1] ----> \"-p\\0\"\nargv[2] ----> \"8080\\0\"\nargv[3] ----> NULL\n```\n\n---\n\n## 2. Converting String Arguments to Numeric Data\n\nAll arguments in `argv` arrive strictly as character strings. Converting them to integers or floats requires standard conversion functions:\n\n### Why `strtol` is Superior to `atoi`\n- `atoi(\"42\")`: Simple, but has **no error handling**. If the string is invalid or overflows `INT_MAX`, `atoi()` produces undefined behavior or silently returns `0` (which is indistinguishable from valid input `\"0\"`).\n- `strtol(str, &endptr, base)`: Production-grade function from `<stdlib.h>`.\n  - Sets `endptr` to point to the first invalid character.\n  - Sets `errno = ERANGE` on overflow.\n  - Allows specifying number base (e.g., base 10, base 16 hex).\n\n---\n\n## 3. Worked Code Example: Robust Command-Line Parser\n\n```c\n#include <stdio.h>\n#include <stdlib.h>\n#include <errno.h>\n#include <string.h>\n\nint main(int argc, char *argv[]) {\n    if (argc < 2) {\n        printf(\"Usage: %s <number1> [number2 ...]\\n\", argv[0]);\n        return 1;\n    }\n\n    long total_sum = 0;\n\n    for (int i = 1; i < argc; i++) {\n        char *endptr;\n        errno = 0; // Clear errno before call\n\n        long val = strtol(argv[i], &endptr, 10);\n\n        // Check for conversion errors\n        if (errno == ERANGE) {\n            fprintf(stderr, \"Error: Argument %s out of range\\n\", argv[i]);\n            return 2;\n        }\n        if (endptr == argv[i] || *endptr != '\\0') {\n            fprintf(stderr, \"Error: '%s' is not a valid integer\\n\", argv[i]);\n            return 3;\n        }\n\n        total_sum += val;\n    }\n\n    printf(\"Sum of %d arguments = %ld\\n\", argc - 1, total_sum);\n    return 0;\n}\n```\n\n---\n\n## 4. High-Yield Interview Traps & Pitfalls\n\n1. **Accessing `argv[1]` Without Checking `argc`:**\n   ```c\n   int main(int argc, char *argv[]) {\n       char *filename = argv[1]; // DANGER: If launched with no args, argc is 1 and argv[1] is NULL!\n       // Dereferencing filename will crash with a segmentation fault!\n   }\n   ```\n2. **Modifying `argv` Strings:**\n   While `argv` pointers and string contents can technically be modified in POSIX systems, doing so may overwrite program argument display in process inspection tools like `ps`.\n3. **Shell Expansion and Quoting:**\n   The shell splits arguments on whitespace before invoking the program. To pass an argument containing spaces as a single token, it must be quoted in the shell: `./app \"Hello World\"`.\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Invariant:** `argc >= 1` and `argv[argc] == NULL`.\n- **Program Name:** `argv[0]`.\n- **First Argument:** `argv[1]` (valid only if `argc >= 2`).\n- **Safe Conversion Function:** `long val = strtol(str, &endptr, 10);`.\n",
    "questions": [
      {
        "id": "c-cli-1",
        "question": "If a program is executed in the terminal as './app input.txt 50', what is the value of argc and argv[1]?",
        "options": [
          "argc = 2, argv[1] = \"input.txt\"",
          "argc = 3, argv[1] = \"input.txt\"",
          "argc = 3, argv[1] = \"./app\"",
          "argc = 2, argv[1] = \"50\""
        ],
        "correct_option": 1,
        "explanation": "argc is 3 (./app, input.txt, 50). argv[0] is './app', argv[1] is 'input.txt', and argv[2] is '50'."
      },
      {
        "id": "c-cli-2",
        "question": "What is the value of argv[argc] in a standard ANSI C program?",
        "options": [
          "Garbage value",
          "Pointer to EOF",
          "NULL",
          "Empty string \"\""
        ],
        "correct_option": 2,
        "explanation": "The ANSI C standard guarantees that argv[argc] is a NULL pointer."
      },
      {
        "id": "c-arg-3",
        "question": "In standard C 'main(int argc, char *argv[])', what is guaranteed about argv[argc]?",
        "options": [
          "argv[argc] is guaranteed to be a null pointer (NULL).",
          "argv[argc] contains the return exit code of the program.",
          "argv[argc] holds the total character count of all arguments.",
          "argv[argc] points to the environment variables block."
        ],
        "correct_option": 0,
        "explanation": "According to the ISO C standard, the array element argv[argc] is always required to be a null pointer (NULL), allowing null-terminated iteration over command line arguments."
      }
    ],
    "prerequisites": [
      "Pointers and arrays of strings in C",
      "Functions and main entrypoint"
    ],
    "externalResources": [
      {
        "title": "CS50x: Command-Line Arguments in C (argc, argv)",
        "url": "https://cs50.harvard.edu/x/2024/weeks/2/",
        "isFree": true,
        "provider": "Harvard CS50",
        "difficulty": "Beginner"
      },
      {
        "title": "GeeksforGeeks: Command Line Arguments in C",
        "url": "https://www.geeksforgeeks.org/command-line-arguments-in-c-cpp/",
        "isFree": true,
        "provider": "GeeksforGeeks",
        "difficulty": "Intermediate"
      },
      {
        "title": "W3Schools C User Input Guide",
        "url": "https://www.w3schools.com/c/c_user_input.php",
        "isFree": true,
        "provider": "W3Schools",
        "difficulty": "Beginner"
      }
    ]
  }
]
};
