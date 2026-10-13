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
    "notesMarkdown": "# Variables, Data Types, and Operators in C\n\nC is a statically typed, compiled procedural programming language. Every variable must have a declared data type before compilation.\n\n---\n\n## 1. Primitive Data Types and Modifiers\n\n| Type | Typical Size | Format Specifier | Typical Range (32/64-bit) |\n| :--- | :--- | :--- | :--- |\n| `char` | 1 byte (8 bits) | `%c` | -128 to 127 (`unsigned`: 0 to 255) |\n| `short int` | 2 bytes (16 bits) | `%hd` | -32,768 to 32,767 |\n| `int` | 4 bytes (32 bits) | `%d` or `%i` | -2,147,483,648 to 2,147,483,647 |\n| `unsigned int` | 4 bytes (32 bits) | `%u` | 0 to 4,294,967,295 |\n| `long long` | 8 bytes (64 bits) | `%lld` | ~ -9.22 x 10^18 to 9.22 x 10^18 |\n| `float` | 4 bytes | `%f` | 6 decimal places of precision |\n| `double` | 8 bytes | `%lf` | 15 decimal places of precision |\n\n---\n\n## 2. Operator Precedence & Evaluation Order\n\n```c\n// Example of Precedence Pitfall:\nint a = 5, b = 10, c = 15;\nint res = a + b * c; // b * c evaluated first -> 5 + 150 = 155\nint bitwise = (a & 1) == 0; // == has higher precedence than &, parentheses required!\n```\n\n- **Prefix vs Postfix Increment:**\n  - `++i` increments first, then yields the new value.\n  - `i++` yields current value for the expression, then increments.\n  - Undefined behavior: modifying `i` multiple times in one sequence point, e.g., `i = ++i + i++;` is undefined in ANSI C.\n\n---\n\n## 3. High-Yield Interview Traps\n- **Integer Division:** `5 / 2` results in integer `2`, not `2.5`. Use `5.0 / 2` or `(float)5 / 2`.\n- **Bitwise Shifts:** `x << 1` multiplies by 2, `x >> 1` divides by 2 (for unsigned/positive).\n- **Short-Circuit Evaluation:** In `A && B`, if `A` is false, `B` is never evaluated. In `A || B`, if `A` is true, `B` is not evaluated.\n",
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
    ,
      {
        "id": "c-var-3",
        "question": "What is the result of the expression (5 >> 1) in C, assuming 32-bit signed integers?",
        "options": [ "2", "2.5", "10", "1" ],
        "correct_option": 0,
        "explanation": "Right shift by 1 bit (>> 1) performs integer division by 2: floor(5 / 2) = 2."
      }
    ]},
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
    "notesMarkdown": "# Conditional Statements and Loops in C\n\nControl flow directs program branching and repeated execution cycles.\n\n---\n\n## 1. Branching: If-Else & Switch-Case\n\n- **Switch Expression Rules:**\n  - Must evaluate to an integral type (`char`, `int`, `enum`). `float` or strings are illegal.\n  - Case labels must be compile-time constants.\n  - Fallthrough occurs without an explicit `break`.\n\n```c\nswitch(code) {\n    case 1: printf(\"One \"); // Falls through!\n    case 2: printf(\"Two \"); break;\n    default: printf(\"Default\");\n}\n```\n\n---\n\n## 2. Iteration Structures\n\n- **For Loop Execution Flow:** `for(init; condition; update)`\n  1. `init` executed once.\n  2. `condition` evaluated; if false, exit.\n  3. Loop body executes.\n  4. `update` evaluated, returns to step 2.\n- **Do-While Loop:** Guarantees post-test semantics: body runs at least once.\n",
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
    ,
      {
        "id": "c-cond-3",
        "question": "In C, what happens if a 'break' statement is omitted from a non-empty 'case' block in a switch statement?",
        "options": [ "Execution falls through to the next case without evaluating its label condition.", "The program generates a compile-time error.", "The switch statement exits automatically.", "The default block executes immediately." ],
        "correct_option": 0,
        "explanation": "In C switch statements, omitting 'break' results in intentional fall-through, executing subsequent case statements sequentially regardless of their match condition."
      }
    ]},
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
    "notesMarkdown": "# Functions and Recursion in C\n\nFunctions modularize logic. In C, all arguments are passed strictly by value.\n\n---\n\n## 1. Activation Records (Stack Frames)\nWhen a function is invoked:\n1. Arguments pushed onto call stack.\n2. Return address (Instruction Pointer) pushed.\n3. Base pointer updated; stack space allocated for local variables.\n4. On return, return value placed in register (e.g., EAX/RAX) and stack popped.\n\n---\n\n## 2. Pass-by-Value vs Pointer Simulation\n\n```c\nvoid swapByVal(int a, int b) { int t = a; a = b; b = t; } // Does NOT swap caller's vars!\nvoid swapByRef(int *a, int *b) { int t = *a; *a = *b; *b = t; } // Swaps successfully\n```\n\n---\n\n## 3. Recursion Principles\n- **Base Case:** Halting condition.\n- **Recursive Step:** Decomposes problem towards base case.\n- Space complexity of recursion = $O(\text{Call Stack Depth})$.\n",
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
    ,
      {
        "id": "c-func-3",
        "question": "What is a 'tail-recursive' function in C?",
        "options": [ "A recursive function where the recursive call is the very last operation executed before returning.", "A function that calls another function from inside its loop.", "A function that returns multiple pointers from the call stack.", "A recursive function that does not require a base condition." ],
        "correct_option": 0,
        "explanation": "In tail recursion, the recursive invocation is the final computation, allowing optimizing compilers to reuse the current stack frame (tail-call optimization) rather than allocating new stack space."
      }
    ]},
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
    "notesMarkdown": "# Arrays and Strings in C\n\nArrays represent contiguous sequences of homogeneous data elements.\n\n---\n\n## 1. Array-Pointer Decay\n```c\nint arr[5] = {10, 20, 30, 40, 50};\n// arr decays to &arr[0] in expressions\n// arr[i] == *(arr + i) == *(i + arr) == i[arr]!\n```\n\n---\n\n## 2. Strings & Null Terminator\nA C-string is a character array terminated by `'\\0'` (ASCII value 0):\n- `char s[] = \"Hello\";` takes **6 bytes** in memory (5 letters + 1 null terminator).\n- `strlen(s)` returns 5 (does not count `'\\0'`).\n- `sizeof(s)` returns 6.\n\nCommon `<string.h>` library functions:\n- `strcpy(dest, src)`: copies characters until `'\\0'`.\n- `strcmp(s1, s2)`: returns 0 if equal, `<0` if s1 < s2, `>0` if s1 > s2.\n- `strcat(dest, src)`: concatenates src to end of dest.\n",
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
    ,
      {
        "id": "c-arr-3",
        "question": "What occurs if you attempt to modify a string literal declared as: char *str = \"Hello\"; str[0] = 'h';?",
        "options": [ "Undefined behavior / Segmentation fault at runtime because string literals reside in read-only memory.", "The first character changes to lowercase 'h' successfully.", "Compile-time syntax error.", "The string is copied automatically to a heap buffer." ],
        "correct_option": 0,
        "explanation": "String literals like \"Hello\" are placed in read-only data segments (.rodata). Modifying them through a pointer leads to undefined behavior (typically SIGSEGV). To modify, use an array: char str[] = \"Hello\";."
      }
    ]},
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
    "notesMarkdown": "# Pointers and Pointer Arithmetic in C\n\nPointers are variables that store the memory address of another variable.\n\n---\n\n## 1. Fundamentals & Address-Of Operator\n```c\nint x = 42;\nint *p = &x; // p holds address of x\n*p = 100;    // modifies x to 100\n```\n\n---\n\n## 2. Pointer Arithmetic Scaling Rule\nWhen adding an integer $k$ to a pointer `T *ptr`:\n$$\\text{New Address} = \\text{Base Address} + (k \\times \\text{sizeof}(T))$$\n\n> **Example:**\n> If `int *p = 1000` on a 4-byte int system:\n> `p + 1` evaluates to **1004**, not 1001!\n\n---\n\n## 3. Function Pointers\nPointers can store code addresses for callbacks:\n```c\nint add(int a, int b) { return a + b; }\nint (*func_ptr)(int, int) = add;\nint result = func_ptr(5, 3); // 8\n```\n",
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
    ,
      {
        "id": "c-ptr-3",
        "question": "If 'int *ptr' points to memory address 0x1000 on a system where sizeof(int) == 4, what address is produced by the expression (ptr + 2)?",
        "options": [ "0x1008", "0x1002", "0x1004", "0x1016" ],
        "correct_option": 0,
        "explanation": "Pointer arithmetic automatically scales by the size of the referenced type: new address = 0x1000 + (2 * sizeof(int)) = 0x1000 + 8 = 0x1008."
      }
    ]},
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
    "notesMarkdown": "# Structures, Unions, and Enumerations in C\n\n---\n\n## 1. Structures & Memory Padding (Alignment)\nCPUs read memory in word chunks (4 or 8 bytes). Compilers insert invisible padding bytes:\n\n```c\nstruct Sample {\n    char a;    // 1 byte\n    // 3 padding bytes!\n    int b;     // 4 bytes\n    char c;    // 1 byte\n    // 3 padding bytes to round up to multiple of 4\n};\n// sizeof(struct Sample) is 12 bytes, NOT 6 bytes!\n```\n\n---\n\n## 2. Unions (Shared Memory)\nIn a union, all members share the exact same starting memory address:\n```c\nunion Data {\n    int i;       // 4 bytes\n    float f;     // 4 bytes\n    char str[20];// 20 bytes\n};\n// sizeof(union Data) is 20 bytes (size of largest member).\n// Writing to one member overwrites other members!\n```\n",
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
    ,
      {
        "id": "c-str-3",
        "question": "On a 64-bit architecture with 4-byte int alignment, what is sizeof(struct Test { char c; int i; char d; })?",
        "options": [ "12 bytes (due to structure alignment padding)", "6 bytes", "8 bytes", "16 bytes" ],
        "correct_option": 0,
        "explanation": "The compiler pads after 'c' (3 bytes padding so 'i' aligns at offset 4), and pads 3 bytes after 'd' so the total struct size is a multiple of largest alignment (4): 1 + 3 + 4 + 1 + 3 = 12 bytes."
      }
    ]},
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
    "notesMarkdown": "# Dynamic Memory Allocation in C\n\nDynamic memory allocation requests memory from the **Heap** at runtime via `<stdlib.h>`.\n\n---\n\n## 1. Allocation Primitives\n\n| Function | Signature | Initialization | Behavior on Failure |\n| :--- | :--- | :--- | :--- |\n| `malloc` | `void* malloc(size_t size)` | Uninitialized (Garbage) | Returns `NULL` |\n| `calloc` | `void* calloc(size_t n, size_t size)` | Zeroed (`0`) | Returns `NULL` |\n| `realloc` | `void* realloc(void* ptr, size_t new_size)` | Preserves old data | Returns `NULL` (old block intact!) |\n| `free` | `void free(void* ptr)` | Releases memory block | No return value |\n\n---\n\n## 2. Common Memory Pitfalls\n- **Memory Leak:** Allocating memory without freeing before pointer loss.\n- **Dangling Pointer:** Accessing memory after calling `free(ptr)`. Best practice: set `ptr = NULL` immediately after freeing.\n- **Double Free:** Calling `free()` twice on the same address triggers heap corruption and crashes.\n",
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
    ,
      {
        "id": "c-dma-3",
        "question": "What is the primary difference between malloc() and calloc() in C?",
        "options": [ "calloc() initializes all allocated bytes to zero; malloc() leaves allocated memory uninitialized.", "malloc() is thread-safe; calloc() is not.", "calloc() allocates memory on the stack; malloc() on the heap.", "malloc() takes two arguments (count, size); calloc() takes only total bytes." ],
        "correct_option": 0,
        "explanation": "calloc(n, size) allocates memory and clears all bits to zero (0). malloc(size) allocates uninitialized bytes containing whatever indeterminate garbage data was in memory."
      }
    ]},
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
    "notesMarkdown": "# Storage Classes and Scope in C\n\nStorage classes dictate the **scope (visibility)**, **lifetime**, and **memory location** of variables.\n\n---\n\n## 1. The Four Storage Classes\n\n| Storage Class | Storage Location | Default Initial Value | Scope | Lifetime |\n| :--- | :--- | :--- | :--- | :--- |\n| `auto` | Stack | Garbage | Local block | Block execution |\n| `register` | CPU Register | Garbage | Local block | Block execution |\n| `static` (local) | Data Segment (BSS) | 0 | Local block | Entire program runtime |\n| `extern` | Data Segment (BSS) | 0 | Global across files | Entire program runtime |\n\n---\n\n## 2. Static Variables\n```c\nvoid count() {\n    static int c = 0; // Initialized only once when program loads!\n    c++;\n    printf(\"%d \", c);\n}\n// Calling count() three times prints: 1 2 3\n```\n\n- Cannot use `&` address-of operator on `register` variables because CPU registers do not have memory RAM addresses.\n",
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
    ,
      {
        "id": "c-stor-3",
        "question": "What is the lifetime and scope of a local variable declared with the 'static' specifier inside a function?",
        "options": [ "Lifetime: Entire program execution; Scope: Local to the enclosing function.", "Lifetime: Only during the function execution; Scope: Global.", "Lifetime: Entire program execution; Scope: Accessible across all project files.", "Lifetime: Until stack frame is destroyed; Scope: Block scope." ],
        "correct_option": 0,
        "explanation": "A static local variable is stored in the data segment, retaining its value between function calls across the entire program lifetime, but its visibility remains restricted to the function scope where declared."
      }
    ]},
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
    "notesMarkdown": "# Preprocessor Directives in C\n\nThe preprocessor runs before the compiler. Directives start with `#`.\n\n---\n\n## 1. Macro Substitution & Pitfalls\n```c\n#define SQUARE(x) (x * x) // BUGGY!\n// SQUARE(1 + 2) expands to (1 + 2 * 1 + 2) = 1 + 2 + 2 = 5!\n\n#define SAFE_SQUARE(x) ((x) * (x)) // CORRECT\n// SAFE_SQUARE(1 + 2) expands to ((1 + 2) * (1 + 2)) = 9\n```\n\n---\n\n## 2. Special Preprocessor Operators\n- **Stringizing Operator (`#`)**: Turns macro argument into a quoted string literal.\n  `#define STR(s) #s` -> `STR(hello)` becomes `\"hello\"`.\n- **Token Pasting Operator (`##`)**: Glues two tokens together.\n  `#define CONCAT(a, b) a##b` -> `CONCAT(var, 1)` becomes `var1`.\n\n---\n\n## 3. Header Guards\nPrevent duplicate type and function re-definitions across header inclusions:\n```c\n#ifndef MY_HEADER_H\n#define MY_HEADER_H\n// Header content declarations\n#endif\n```\n",
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
    ,
      {
        "id": "c-prep-3",
        "question": "Given: #define SQUARE(x) x * x. What does the expression SQUARE(2 + 3) evaluate to?",
        "options": [ "11 (because it expands textually to 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11)", "25", "10", "Undefined behavior" ],
        "correct_option": 0,
        "explanation": "Preprocessors perform textual substitution without operator precedence awareness: SQUARE(2 + 3) expands to 2 + 3 * 2 + 3. Due to multiplication precedence, 3 * 2 = 6, yielding 2 + 6 + 3 = 11. To prevent this, define as ((x) * (x))."
      }
    ]},
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
    "notesMarkdown": "# File Handling in C\n\nC represents files as streams of bytes accessed via `FILE *fp`.\n\n---\n\n## 1. Opening & Closing Files\n```c\nFILE *fp = fopen(\"data.txt\", \"r\");\nif (fp == NULL) {\n    perror(\"Error opening file\");\n    return 1;\n}\n// Process file\nfclose(fp);\n```\n\n---\n\n## 2. Text vs Binary I/O\n- **Text I/O:** `fprintf(fp, ...)`, `fscanf(fp, ...)`, `fputs()`, `fgets()`.\n- **Binary I/O:**\n  - `size_t fread(void *ptr, size_t size, size_t count, FILE *fp);`\n  - `size_t fwrite(const void *ptr, size_t size, size_t count, FILE *fp);`\n\n---\n\n## 3. Random File Access\n- `fseek(fp, offset, origin)`:\n  - `SEEK_SET`: beginning of file.\n  - `SEEK_CUR`: current file pointer position.\n  - `SEEK_END`: end of file.\n- `ftell(fp)`: returns current file offset in bytes from the start.\n- `rewind(fp)`: sets file offset back to beginning.\n",
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
    ,
      {
        "id": "c-file-3",
        "question": "Why should the return value of fgetc(FILE *stream) be assigned to an 'int' variable rather than a 'char'?",
        "options": [ "Because EOF is an integer constant (typically -1) that cannot be reliably distinguished from valid characters if truncated to unsigned char.", "Because fgetc reads 4 bytes at a time from disk buffers.", "Because C files only store Unicode codepoints.", "Because char is not a legal return type in standard C library headers." ],
        "correct_option": 0,
        "explanation": "fgetc returns an unsigned char converted to int or EOF (-1). If stored in a char on systems where char is unsigned, EOF (255) would collide with ÿ (character 255), creating an infinite loop or terminating early."
      }
    ]},
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
    "notesMarkdown": "# Command-Line Arguments in C\n\nCommand-line arguments allow parameters to be passed to a program when launched from a shell.\n\n---\n\n## 1. Prototype of `main`\n```c\nint main(int argc, char *argv[]) {\n    // argc: argument count (>= 1)\n    // argv: argument vector (array of strings)\n}\n```\n\n- `argv[0]`: Contains the program name or invocation path.\n- `argv[1]` to `argv[argc - 1]`: The command-line arguments.\n- `argv[argc]`: Guaranteed to be `NULL`.\n\n---\n\n## 2. Converting String Arguments\nArguments are parsed as strings. Use `<stdlib.h>` functions to convert to numbers:\n- `atoi(argv[1])`: string to integer.\n- `atof(argv[1])`: string to double.\n- `strtol(argv[1], &endptr, 10)`: robust integer conversion with error handling.\n",
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
    ,
      {
        "id": "c-arg-3",
        "question": "In standard C 'main(int argc, char *argv[])', what is guaranteed about argv[argc]?",
        "options": [ "argv[argc] is guaranteed to be a null pointer (NULL).", "argv[argc] contains the return exit code of the program.", "argv[argc] holds the total character count of all arguments.", "argv[argc] points to the environment variables block." ],
        "correct_option": 0,
        "explanation": "According to the ISO C standard, the array element argv[argc] is always required to be a null pointer (NULL), allowing null-terminated iteration over command line arguments."
      }
    ]}
]
};
