import json
import urllib.parse

def get_yt_url(title, cat_name="C Programming"):
    query = f"{title} {cat_name} lecture tutorial"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

topics = [
    {
        "id": "c-variables-types-operators",
        "slug": "variables-data-types-and-operators",
        "title": "Variables, Data Types, and Operators",
        "description": "Fundamental primitive data types, memory representations, type modifiers, operator precedence, and bitwise operations.",
        "estimatedMinutes": 15,
        "difficulty": "Easy",
        "companyTags": ["TCS Digital", "Infosys", "Wipro", "Cognizant", "Accenture"],
        "keyTakeaways": [
            "Data types define storage size and range (char: 1 byte, int: 2 or 4 bytes, float: 4 bytes, double: 8 bytes).",
            "Type conversion: Implicit promotion follows integer promotion rules up to float/double.",
            "Operator precedence: Postfix (++ / --) > Unary > Multiplicative (* / %) > Additive (+ -) > Bitwise > Logical > Assignment.",
            "Bitwise operations (&, |, ^, ~, <<, >>) execute directly at CPU register speeds."
        ],
        "youtube_url": get_yt_url("Variables Data Types and Operators in C"),
        "notesMarkdown": """# Variables, Data Types, and Operators in C

C is a statically typed, compiled procedural programming language. Every variable must have a declared data type before compilation.

---

## 1. Primitive Data Types and Modifiers

| Type | Typical Size | Format Specifier | Typical Range (32/64-bit) |
| :--- | :--- | :--- | :--- |
| `char` | 1 byte (8 bits) | `%c` | -128 to 127 (`unsigned`: 0 to 255) |
| `short int` | 2 bytes (16 bits) | `%hd` | -32,768 to 32,767 |
| `int` | 4 bytes (32 bits) | `%d` or `%i` | -2,147,483,648 to 2,147,483,647 |
| `unsigned int` | 4 bytes (32 bits) | `%u` | 0 to 4,294,967,295 |
| `long long` | 8 bytes (64 bits) | `%lld` | ~ -9.22 x 10^18 to 9.22 x 10^18 |
| `float` | 4 bytes | `%f` | 6 decimal places of precision |
| `double` | 8 bytes | `%lf` | 15 decimal places of precision |

---

## 2. Operator Precedence & Evaluation Order

```c
// Example of Precedence Pitfall:
int a = 5, b = 10, c = 15;
int res = a + b * c; // b * c evaluated first -> 5 + 150 = 155
int bitwise = (a & 1) == 0; // == has higher precedence than &, parentheses required!
```

- **Prefix vs Postfix Increment:**
  - `++i` increments first, then yields the new value.
  - `i++` yields current value for the expression, then increments.
  - Undefined behavior: modifying `i` multiple times in one sequence point, e.g., `i = ++i + i++;` is undefined in ANSI C.

---

## 3. High-Yield Interview Traps
- **Integer Division:** `5 / 2` results in integer `2`, not `2.5`. Use `5.0 / 2` or `(float)5 / 2`.
- **Bitwise Shifts:** `x << 1` multiplies by 2, `x >> 1` divides by 2 (for unsigned/positive).
- **Short-Circuit Evaluation:** In `A && B`, if `A` is false, `B` is never evaluated. In `A || B`, if `A` is true, `B` is not evaluated.
""",
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
        "companyTags": ["TCS", "Infosys", "Capgemini", "Accenture"],
        "keyTakeaways": [
            "Switch cases require integral/character expressions; floating point numbers are not allowed.",
            "Missing 'break' causes case fallthrough until the next break or end of switch.",
            "Do-while guarantees at least one execution pass before testing condition.",
            "Continue skips the rest of the loop body and advances to the loop update expression."
        ],
        "youtube_url": get_yt_url("Control Flow Conditionals Loops C Programming"),
        "notesMarkdown": """# Conditional Statements and Loops in C

Control flow directs program branching and repeated execution cycles.

---

## 1. Branching: If-Else & Switch-Case

- **Switch Expression Rules:**
  - Must evaluate to an integral type (`char`, `int`, `enum`). `float` or strings are illegal.
  - Case labels must be compile-time constants.
  - Fallthrough occurs without an explicit `break`.

```c
switch(code) {
    case 1: printf("One "); // Falls through!
    case 2: printf("Two "); break;
    default: printf("Default");
}
```

---

## 2. Iteration Structures

- **For Loop Execution Flow:** `for(init; condition; update)`
  1. `init` executed once.
  2. `condition` evaluated; if false, exit.
  3. Loop body executes.
  4. `update` evaluated, returns to step 2.
- **Do-While Loop:** Guarantees post-test semantics: body runs at least once.
""",
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
        "companyTags": ["Amazon", "Microsoft", "TCS Digital", "Infosys"],
        "keyTakeaways": [
            "C is strictly Pass-by-Value; passing pointers simulates pass-by-reference.",
            "Stack frames record return address, local variables, and incoming arguments.",
            "Recursive functions require a strict terminating base case to prevent stack overflow.",
            "Tail recursion occurs when the recursive call is the final statement in the function."
        ],
        "youtube_url": get_yt_url("Functions and Recursion C Programming"),
        "notesMarkdown": """# Functions and Recursion in C

Functions modularize logic. In C, all arguments are passed strictly by value.

---

## 1. Activation Records (Stack Frames)
When a function is invoked:
1. Arguments pushed onto call stack.
2. Return address (Instruction Pointer) pushed.
3. Base pointer updated; stack space allocated for local variables.
4. On return, return value placed in register (e.g., EAX/RAX) and stack popped.

---

## 2. Pass-by-Value vs Pointer Simulation

```c
void swapByVal(int a, int b) { int t = a; a = b; b = t; } // Does NOT swap caller's vars!
void swapByRef(int *a, int *b) { int t = *a; *a = *b; *b = t; } // Swaps successfully
```

---

## 3. Recursion Principles
- **Base Case:** Halting condition.
- **Recursive Step:** Decomposes problem towards base case.
- Space complexity of recursion = $O(\text{Call Stack Depth})$.
""",
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
        "companyTags": ["Amazon", "TCS Digital", "Wipro", "HCL"],
        "keyTakeaways": [
            "Arrays occupy contiguous memory blocks; array identifier decays to pointer to first element.",
            "C does not perform bounds checking; out-of-bounds access invokes undefined behavior.",
            "Strings in C are null-terminated (`'\\0'`) character arrays.",
            "Row-major ordering: elements stored row by row in 2D arrays (`arr[i][j]` = `*(arr + i*cols + j)`)."
        ],
        "youtube_url": get_yt_url("Arrays and Strings in C Programming"),
        "notesMarkdown": """# Arrays and Strings in C

Arrays represent contiguous sequences of homogeneous data elements.

---

## 1. Array-Pointer Decay
```c
int arr[5] = {10, 20, 30, 40, 50};
// arr decays to &arr[0] in expressions
// arr[i] == *(arr + i) == *(i + arr) == i[arr]!
```

---

## 2. Strings & Null Terminator
A C-string is a character array terminated by `'\\0'` (ASCII value 0):
- `char s[] = "Hello";` takes **6 bytes** in memory (5 letters + 1 null terminator).
- `strlen(s)` returns 5 (does not count `'\\0'`).
- `sizeof(s)` returns 6.

Common `<string.h>` library functions:
- `strcpy(dest, src)`: copies characters until `'\\0'`.
- `strcmp(s1, s2)`: returns 0 if equal, `<0` if s1 < s2, `>0` if s1 > s2.
- `strcat(dest, src)`: concatenates src to end of dest.
""",
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
        "companyTags": ["Google", "Amazon", "Microsoft", "Qualcomm", "NVIDIA"],
        "keyTakeaways": [
            "Pointers store memory addresses; dereferencing (`*p`) accesses the value at that address.",
            "Pointer arithmetic scales by `sizeof(*p)`: `p + 1` adds `sizeof(T)` bytes to address.",
            "Void pointer (`void*`) is a generic pointer; must be cast before dereferencing.",
            "Dangling pointers point to deallocated memory; wild pointers are uninitialized pointers."
        ],
        "youtube_url": get_yt_url("Pointers and Pointer Arithmetic in C"),
        "notesMarkdown": """# Pointers and Pointer Arithmetic in C

Pointers are variables that store the memory address of another variable.

---

## 1. Fundamentals & Address-Of Operator
```c
int x = 42;
int *p = &x; // p holds address of x
*p = 100;    // modifies x to 100
```

---

## 2. Pointer Arithmetic Scaling Rule
When adding an integer $k$ to a pointer `T *ptr`:
$$\\text{New Address} = \\text{Base Address} + (k \\times \\text{sizeof}(T))$$

> **Example:**
> If `int *p = 1000` on a 4-byte int system:
> `p + 1` evaluates to **1004**, not 1001!

---

## 3. Function Pointers
Pointers can store code addresses for callbacks:
```c
int add(int a, int b) { return a + b; }
int (*func_ptr)(int, int) = add;
int result = func_ptr(5, 3); // 8
```
""",
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
        "companyTags": ["Qualcomm", "Intel", "Samsung", "Cisco"],
        "keyTakeaways": [
            "Structures allocate independent memory for all members; total size includes padding for alignment.",
            "Unions share a single memory space equal to the size of the largest member.",
            "Structure padding aligns data to word boundaries to optimize CPU memory bus reads.",
            "Enums create named integer constants starting from 0 by default."
        ],
        "youtube_url": get_yt_url("Structures Unions and Enums in C"),
        "notesMarkdown": """# Structures, Unions, and Enumerations in C

---

## 1. Structures & Memory Padding (Alignment)
CPUs read memory in word chunks (4 or 8 bytes). Compilers insert invisible padding bytes:

```c
struct Sample {
    char a;    // 1 byte
    // 3 padding bytes!
    int b;     // 4 bytes
    char c;    // 1 byte
    // 3 padding bytes to round up to multiple of 4
};
// sizeof(struct Sample) is 12 bytes, NOT 6 bytes!
```

---

## 2. Unions (Shared Memory)
In a union, all members share the exact same starting memory address:
```c
union Data {
    int i;       // 4 bytes
    float f;     // 4 bytes
    char str[20];// 20 bytes
};
// sizeof(union Data) is 20 bytes (size of largest member).
// Writing to one member overwrites other members!
```
""",
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
        "companyTags": ["Amazon", "Google", "Adobe", "Microsoft"],
        "keyTakeaways": [
            "malloc(n) allocates n uninitialized bytes of heap memory.",
            "calloc(n, size) allocates contiguous memory and initializes all bytes to zero.",
            "realloc(ptr, new_size) resizes existing heap blocks, copying data if relocation is needed.",
            "free(ptr) releases heap memory; failing to call free causes memory leaks."
        ],
        "youtube_url": get_yt_url("Dynamic Memory Allocation in C malloc calloc realloc free"),
        "notesMarkdown": """# Dynamic Memory Allocation in C

Dynamic memory allocation requests memory from the **Heap** at runtime via `<stdlib.h>`.

---

## 1. Allocation Primitives

| Function | Signature | Initialization | Behavior on Failure |
| :--- | :--- | :--- | :--- |
| `malloc` | `void* malloc(size_t size)` | Uninitialized (Garbage) | Returns `NULL` |
| `calloc` | `void* calloc(size_t n, size_t size)` | Zeroed (`0`) | Returns `NULL` |
| `realloc` | `void* realloc(void* ptr, size_t new_size)` | Preserves old data | Returns `NULL` (old block intact!) |
| `free` | `void free(void* ptr)` | Releases memory block | No return value |

---

## 2. Common Memory Pitfalls
- **Memory Leak:** Allocating memory without freeing before pointer loss.
- **Dangling Pointer:** Accessing memory after calling `free(ptr)`. Best practice: set `ptr = NULL` immediately after freeing.
- **Double Free:** Calling `free()` twice on the same address triggers heap corruption and crashes.
""",
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
        "companyTags": ["Cisco", "Intel", "Texas Instruments", "TCS Digital"],
        "keyTakeaways": [
            "auto: Default local scope, allocated on stack, destroyed on block exit.",
            "register: Requests CPU register storage for speed; cannot take its address (`&`).",
            "static: Retains value across function calls, initialized once, allocated in data segment.",
            "extern: Declares global variable defined in another translation unit."
        ],
        "youtube_url": get_yt_url("Storage Classes in C auto static extern register"),
        "notesMarkdown": """# Storage Classes and Scope in C

Storage classes dictate the **scope (visibility)**, **lifetime**, and **memory location** of variables.

---

## 1. The Four Storage Classes

| Storage Class | Storage Location | Default Initial Value | Scope | Lifetime |
| :--- | :--- | :--- | :--- | :--- |
| `auto` | Stack | Garbage | Local block | Block execution |
| `register` | CPU Register | Garbage | Local block | Block execution |
| `static` (local) | Data Segment (BSS) | 0 | Local block | Entire program runtime |
| `extern` | Data Segment (BSS) | 0 | Global across files | Entire program runtime |

---

## 2. Static Variables
```c
void count() {
    static int c = 0; // Initialized only once when program loads!
    c++;
    printf("%d ", c);
}
// Calling count() three times prints: 1 2 3
```

- Cannot use `&` address-of operator on `register` variables because CPU registers do not have memory RAM addresses.
""",
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
        "companyTags": ["Samsung", "Sony", "Bosch", "HCL"],
        "keyTakeaways": [
            "Preprocessor executes text substitution before compiler lexical analysis.",
            "Header guards (`#ifndef HEADER_H #define HEADER_H ... #endif`) prevent multiple inclusions.",
            "Macros should always parenthesize arguments to prevent operator precedence bugs.",
            "`#` operator converts parameter to string literal; `##` concatenates two tokens."
        ],
        "youtube_url": get_yt_url("Preprocessor Directives in C macros include ifdef"),
        "notesMarkdown": """# Preprocessor Directives in C

The preprocessor runs before the compiler. Directives start with `#`.

---

## 1. Macro Substitution & Pitfalls
```c
#define SQUARE(x) (x * x) // BUGGY!
// SQUARE(1 + 2) expands to (1 + 2 * 1 + 2) = 1 + 2 + 2 = 5!

#define SAFE_SQUARE(x) ((x) * (x)) // CORRECT
// SAFE_SQUARE(1 + 2) expands to ((1 + 2) * (1 + 2)) = 9
```

---

## 2. Special Preprocessor Operators
- **Stringizing Operator (`#`)**: Turns macro argument into a quoted string literal.
  `#define STR(s) #s` -> `STR(hello)` becomes `"hello"`.
- **Token Pasting Operator (`##`)**: Glues two tokens together.
  `#define CONCAT(a, b) a##b` -> `CONCAT(var, 1)` becomes `var1`.

---

## 3. Header Guards
Prevent duplicate type and function re-definitions across header inclusions:
```c
#ifndef MY_HEADER_H
#define MY_HEADER_H
// Header content declarations
#endif
```
""",
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
        "companyTags": ["Infosys", "Wipro", "TCS", "Accenture"],
        "keyTakeaways": [
            "Files are accessed via FILE* streams in <stdio.h>.",
            "Modes: 'r' (read), 'w' (write/truncate), 'a' (append), 'r+' (read/write). Add 'b' for binary.",
            "fread and fwrite perform direct binary block transfers.",
            "fseek navigates file position pointer: SEEK_SET, SEEK_CUR, SEEK_END."
        ],
        "youtube_url": get_yt_url("File Handling in C fopen fread fwrite fseek"),
        "notesMarkdown": """# File Handling in C

C represents files as streams of bytes accessed via `FILE *fp`.

---

## 1. Opening & Closing Files
```c
FILE *fp = fopen("data.txt", "r");
if (fp == NULL) {
    perror("Error opening file");
    return 1;
}
// Process file
fclose(fp);
```

---

## 2. Text vs Binary I/O
- **Text I/O:** `fprintf(fp, ...)`, `fscanf(fp, ...)`, `fputs()`, `fgets()`.
- **Binary I/O:**
  - `size_t fread(void *ptr, size_t size, size_t count, FILE *fp);`
  - `size_t fwrite(const void *ptr, size_t size, size_t count, FILE *fp);`

---

## 3. Random File Access
- `fseek(fp, offset, origin)`:
  - `SEEK_SET`: beginning of file.
  - `SEEK_CUR`: current file pointer position.
  - `SEEK_END`: end of file.
- `ftell(fp)`: returns current file offset in bytes from the start.
- `rewind(fp)`: sets file offset back to beginning.
""",
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
        "companyTags": ["Amazon", "TCS Digital", "Infosys", "IBM"],
        "keyTakeaways": [
            "main signature: int main(int argc, char *argv[]).",
            "argc represents the argument count (including program executable path at argv[0]).",
            "argv is an array of strings (pointers to char).",
            "argv[argc] is guaranteed by the C standard to be a NULL pointer."
        ],
        "youtube_url": get_yt_url("Command Line Arguments in C argc argv"),
        "notesMarkdown": """# Command-Line Arguments in C

Command-line arguments allow parameters to be passed to a program when launched from a shell.

---

## 1. Prototype of `main`
```c
int main(int argc, char *argv[]) {
    // argc: argument count (>= 1)
    // argv: argument vector (array of strings)
}
```

- `argv[0]`: Contains the program name or invocation path.
- `argv[1]` to `argv[argc - 1]`: The command-line arguments.
- `argv[argc]`: Guaranteed to be `NULL`.

---

## 2. Converting String Arguments
Arguments are parsed as strings. Use `<stdlib.h>` functions to convert to numbers:
- `atoi(argv[1])`: string to integer.
- `atof(argv[1])`: string to double.
- `strtol(argv[1], &endptr, 10)`: robust integer conversion with error handling.
""",
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
            }
        ]
    }
]

file_content = f"""import type {{ SectionCategory }} from './types';

export const C_PROGRAMMING_CATEGORY: SectionCategory = {{
  id: "c-prog",
  slug: "programming-in-c",
  title: "Programming in C",
  description: "Master C syntax, memory architecture, pointers, structures, file handling, and systems programming.",
  icon: "Terminal",
  topics: {json.dumps(topics, indent=2)}
}};
"""

with open('./src/lib/data/curriculum/c-programming.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"Generated C Programming module with {len(topics)} topics successfully!")
