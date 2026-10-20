import type { SectionCategory } from './types';

export const DATA_STRUCTURES_CATEGORY: SectionCategory = {
  "id": "data-structures",
  "slug": "data-structures",
  "title": "Data Structures",
  "description": "Linear and hierarchical data structures, trees, heaps, hash tables, and systems applications.",
  "icon": "Layers",
  "topics": [
    {
      "id": "ds-complexity-basics",
      "slug": "time-and-space-complexity-basics",
      "title": "Time and Space Complexity Basics",
      "description": "Big-O, Big-Omega, Big-Theta notation, amortized analysis, auxiliary space vs input space, and recurrence relationships.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Meta",
        "Apple"
      ],
      "keyTakeaways": [
        "Big-O represents tight asymptotic upper bound; Big-Omega represents lower bound; Big-Theta represents asymptotically tight bound.",
        "Auxiliary space measures extra memory used beyond the input size.",
        "Common complexity order: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!).",
        "Amortized analysis guarantees average cost per operation over a sequence of operations (e.g. dynamic array doubling)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Time+and+Space+Complexity+Basics+Big+O+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Asymptotic Analysis, Master Theorem, and Time/Space Complexity\n\nAsymptotic analysis evaluates algorithmic efficiency independently of specific hardware, operating system, or programming language implementation, analyzing how computational resource requirements scale as input size $n \\to \\infty$.\n\n---\n\n## 1. The Big-Three Asymptotic Notations\n\n```\n        Upper Bound: O(g(n))            Tight Bound: Theta(g(n))          Lower Bound: Omega(g(n))\n           f(n) <= c * g(n)             c1 * g(n) <= f(n) <= c2 * g(n)        f(n) >= c * g(n)\n```\n\n1. **Big-O Notation ($O$ - Asymptotic Upper Bound):**\n   $$f(n) = O(g(n)) \\iff \\exists c > 0, n_0 > 0 \\text{ such that } 0 \\le f(n) \\le c \\cdot g(n) \\quad \\forall n \\ge n_0$$\n   Guarantees the algorithm will run *no slower* than $c \\cdot g(n)$ in the worst case.\n2. **Big-$\\Omega$ Notation ($\\Omega$ - Asymptotic Lower Bound):**\n   $$f(n) = \\Omega(g(n)) \\iff \\exists c > 0, n_0 > 0 \\text{ such that } 0 \\le c \\cdot g(n) \\le f(n) \\quad \\forall n \\ge n_0$$\n   Guarantees the algorithm requires *at least* $c \\cdot g(n)$ steps.\n3. **Big-$\\Theta$ Notation ($\\Theta$ - Asymptotically Tight Bound):**\n   $$f(n) = \\Theta(g(n)) \\iff f(n) = O(g(n)) \\quad \\text{AND} \\quad f(n) = \\Omega(g(n))$$\n\n---\n\n## 2. The Master Theorem for Divide-and-Conquer Recurrences\n\nFor recurrences of form:\n$$T(n) = a T\\left(\\frac{n}{b}\\right) + f(n) \\quad \\text{where } a \\ge 1, b > 1$$\nCompare $f(n)$ with the watershed function $n^{\\log_b a}$:\n\n1. **Case 1 (Leaf Dominant):** If $f(n) = O(n^{\\log_b a - \\epsilon})$ for $\\epsilon > 0$:\n   $$\\mathbf{T(n) = \\Theta(n^{\\log_b a})}$$\n2. **Case 2 (Even Distribution):** If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$ for $k \\ge 0$:\n   $$\\mathbf{T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)}$$\n3. **Case 3 (Root Dominant):** If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity condition holds ($a f(n/b) \\le c f(n)$):\n   $$\\mathbf{T(n) = \\Theta(f(n))}$$\n\n### Classic Master Theorem Examples:\n- **Binary Search:** $T(n) = T(n/2) + O(1) \\implies a=1, b=2, n^{\\log_2 1} = n^0 = 1 \\implies \\mathbf{\\Theta(\\log n)}$ (Case 2 with $k=0$).\n- **Merge Sort:** $T(n) = 2T(n/2) + O(n) \\implies a=2, b=2, n^{\\log_2 2} = n^1 \\implies \\mathbf{\\Theta(n \\log n)}$ (Case 2 with $k=0$).\n- **Karatsuba Multiplication:** $T(n) = 3T(n/2) + O(n) \\implies n^{\\log_2 3} \\approx n^{1.585} \\implies \\mathbf{\\Theta(n^{1.585})}$ (Case 1).\n\n---\n\n## 3. Hierarchy of Complexity Classes\n\n$$O(1) < O(\\log \\log n) < O(\\log n) < O(\\sqrt{n}) < O(n) < O(n \\log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)$$\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Big-O:** Worst-case ceiling ($f(n) \\le c \\cdot g(n)$).\n- **Big-Omega:** Best-case floor ($f(n) \\ge c \\cdot g(n)$).\n- **Big-Theta:** Exact growth rate ($c_1 g(n) \\le f(n) \\le c_2 g(n)$).\n- **Space Complexity:** $\\text{Total Space} = \\text{Input Space} + \\text{Auxiliary Workspace} + \\text{Call Stack Recursion Depth}$.\n",
      "questions": [
        {
          "id": "ds-comp-1",
          "question": "What is the tight asymptotic time complexity of adding an element to a dynamic array (like std::vector or ArrayList) in the amortized case?",
          "options": [
            "O(n)",
            "O(1)",
            "O(log n)",
            "O(n^2)"
          ],
          "correct_option": 1,
          "explanation": "Although occasional resizing takes O(n) to copy elements, resizing happens infrequently (at powers of 2). Spreading this cost across all insertions yields an amortized time complexity of O(1) per operation."
        },
        {
          "id": "ds-comp-2",
          "question": "Which asymptotic notation indicates that an algorithm's running time is bounded both from above and from below?",
          "options": [
            "Big-O (O)",
            "Big-Omega (Ω)",
            "Big-Theta (Θ)",
            "Little-o (o)"
          ],
          "correct_option": 2,
          "explanation": "Big-Theta (Θ) defines an asymptotically tight bound, sandwiching the growth rate between upper and lower constants c1*g(n) and c2*g(n)."
        },
        {
          "id": "ds-comp-3",
          "question": "What is the tight asymptotic time complexity of the following code snippet?\n\nfor (int i = 1; i <= n; i *= 2) {\n    for (int j = 1; j <= n; j++) {\n        count++;\n    }\n}",
          "options": [
            "O(n log n)",
            "O(n^2)",
            "O(n)",
            "O(log n)"
          ],
          "correct_option": 0,
          "explanation": "The outer loop increments multiplicatively (i *= 2), running log2(n) times. The inner loop executes n times per outer iteration. Total iterations = n * log2(n) = O(n log n)."
        }
      ],
      "prerequisites": [
        "Mathematical functions, limits, and exponents",
        "Programming in C loops and function recursion"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Asymptotic Complexity and Algorithmic Analysis",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Analysis of Algorithms and Asymptotic Notations",
          "url": "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Time and Space Complexity Master Theorem Guide",
          "url": "https://www.interviewbit.com/dsa-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-arrays-and-strings",
      "slug": "arrays-and-strings",
      "title": "Arrays and Strings",
      "description": "Contiguous indexing, two-pointer techniques, sliding windows, prefix sums, and in-place transformations.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Adobe"
      ],
      "keyTakeaways": [
        "Contiguous memory layout provides O(1) random access by index via pointer arithmetic.",
        "Insertions and deletions at arbitrary positions take O(n) time due to element shifting.",
        "Prefix sums allow O(1) range sum queries after O(n) preprocessing.",
        "Two-pointer techniques reduce O(n^2) pair searches in sorted arrays to O(n)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Arrays+and+Strings+Two+Pointers+Prefix+Sum+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Arrays and Strings in Data Structures\n\nArrays store homogeneous elements contiguously in physical memory, enabling $O(1)$ random access via base-offset arithmetic.\n\n---\n\n## 1. Memory Addressing & Multi-Dimensional Layout\n- **1D Array Address Formula:**\n  $$\\text{Address}(A[i]) = \\text{BaseAddress} + (i - \\text{lower\\_bound}) \\times S$$\n  where $S$ is element size in bytes.\n- **2D Array Storage Orders ($M \\times N$ matrix):**\n  - **Row-Major Order (C/C++, Java):** Rows stored sequentially.\n    $$\\text{Address}(A[i][j]) = \\text{Base} + (i \\times N + j) \\times S$$\n  - **Column-Major Order (Fortran, MATLAB):** Columns stored sequentially.\n    $$\\text{Address}(A[i][j]) = \\text{Base} + (j \\times M + i) \\times S$$\n- **Spatial Locality & Cache Efficiency:** Row-by-row traversal in row-major systems exploits hardware cache lines ($64\\text{ bytes}$ cache block fetch), running up to $10\\times$ faster than column-hopping (strided cache misses).\n\n---\n\n## 2. Dynamic Array Amortized Scaling\n- Standard static arrays cannot grow. Dynamic arrays (`std::vector` in C++, `ArrayList` in Java) allocate a heap buffer with capacity $C$.\n- When full, they allocate a new buffer of capacity $2C$ (or $1.5C$ in MSVC), copy all $N$ elements, and free the old buffer.\n- **Amortized Proof (Aggregate Method):**\n  - For $N = 2^k$ insertions, total copying cost is $1 + 2 + 4 + \\dots + 2^{k-1} = 2^k - 1 = N - 1$.\n  - Total cost for $N$ appends: $N \\text{ (direct inserts)} + (N - 1) \\text{ (copies)} = 2N - 1 = O(N)$.\n  - Amortized cost per operation: $\\frac{2N - 1}{N} < 2 = O(1)$.\n\n---\n\n## 3. High-Frequency Interview Patterns\n1. **Two Pointers (Bidirectional):** Converging pointers from $0$ and $N-1$ for sorted pair discovery (Two Sum II, Container With Most Water, Palindrome checks) in $O(N)$ time and $O(1)$ space.\n2. **Sliding Window (Monotonic / Dynamic):** Expanding right pointer to include elements, contracting left pointer when constraints break (Longest Substring Without Repeating Characters, Minimum Window Substring).\n3. **Prefix Sums & Difference Arrays:** Precomputing $P[i] = P[i-1] + A[i]$ evaluates any range sum $\\sum_{k=L}^{R} A[k] = P[R] - P[L-1]$ in $O(1)$. Difference arrays ($D[L] += v, D[R+1] -= v$) apply multiple range updates in $O(1)$ each.\n4. **Kadane's Algorithm:** Computes maximum contiguous subarray sum in $O(N)$ time and $O(1)$ space by maintaining $\\text{current\\_sum} = \\max(A[i], \\text{current\\_sum} + A[i])$.\n",
      "questions": [
        {
          "id": "ds-arr-1",
          "question": "What is the time complexity of querying the sum of elements from index L to R using a precomputed prefix sum array?",
          "options": [
            "O(R - L)",
            "O(1)",
            "O(log n)",
            "O(n)"
          ],
          "correct_option": 1,
          "explanation": "With a prefix sum array P, sum(L, R) is computed directly as P[R] - P[L - 1], which takes O(1) constant time."
        },
        {
          "id": "ds-arr-2",
          "question": "Why does inserting an element at index 0 of an array of size N take O(N) time?",
          "options": [
            "The array must be re-sorted",
            "All N existing elements must be shifted one position to the right",
            "Memory must be reallocated on the heap",
            "Binary search must locate the index"
          ],
          "correct_option": 1,
          "explanation": "Because arrays are stored contiguously, inserting at the beginning requires moving every subsequent element rightwards to make space, requiring N shifts."
        },
        {
          "id": "ds-arr-3",
          "question": "In Dutch National Flag algorithm (3-way partitioning of 0s, 1s, and 2s), what is the optimal time and auxiliary space complexity?",
          "options": [
            "O(N) time, O(1) space",
            "O(N log N) time, O(1) space",
            "O(N) time, O(N) space",
            "O(N^2) time, O(1) space"
          ],
          "correct_option": 0,
          "explanation": "Dutch National Flag sorts an array of three distinct elements in a single pass using three pointers (low, mid, high) in O(N) time and O(1) auxiliary space."
        }
      ],
      "prerequisites": [
        "Basic Programming Syntax",
        "Memory Addressing and Indices"
      ],
      "externalResources": [
        {
          "title": "Arrays in Data Structure — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/array-data-structure/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Data Structures & Memory: Week 5 — Harvard CS50",
          "provider": "Harvard CS50",
          "url": "https://cs50.harvard.edu/x/2024/weeks/5/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-linked-lists",
      "slug": "linked-lists",
      "title": "Linked Lists",
      "description": "Singly, doubly, and circular linked lists, pointer manipulation, Floyd's cycle detection, and list reversal.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Qualcomm"
      ],
      "keyTakeaways": [
        "Non-contiguous node allocation connected via pointers; dynamic sizing without resizing overhead.",
        "Insertion and deletion at head/tail take O(1) time if pointers are maintained.",
        "Random access takes O(n) time as traversal from head is required.",
        "Floyd's Cycle-Finding Algorithm (Tortoise & Hare) detects cycles in O(n) time and O(1) space."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Linked+Lists+Singly+Doubly+Circular+Floyd+Cycle+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Linked Lists: Singly, Doubly, Circular, and Floyd's Cycle Detection\n\nA Linked List is a linear data structure where elements (nodes) are stored non-contiguously in heap memory, linked together via pointer references.\n\n---\n\n## 1. Array vs Linked List: Mechanical Trade-Offs\n\n| Operation / Feature | Array | Singly Linked List |\n| :--- | :--- | :--- |\n| **Memory Allocation** | Contiguous chunk | Scattered across heap |\n| **Random Access ($i$-th element)**| $\\mathbf{O(1)}$ instant | $\\mathbf{O(N)}$ pointer traversal |\n| **Insertion at Head** | $O(N)$ (requires shifting) | $\\mathbf{O(1)}$ pointer update |\n| **Insertion at Tail (with tail ptr)**| $O(1)$ amortized | $\\mathbf{O(1)}$ |\n| **Cache Friendliness** | Exceptional (spatial locality) | Poor (pointer chasing causes cache misses) |\n| **Memory Overhead** | Zero extra pointer bytes | Extra 8 bytes per node for `next` pointer |\n\n---\n\n## 2. Node Architectures\n\n```\nSINGLY LINKED LIST:\n[ Head ] -> [ Data | Next ] -> [ Data | Next ] -> [ Data | NULL ]\n\nDOUBLY LINKED LIST:\n[ Head ] -> [ Prev=NULL | Data | Next ] <===> [ Prev | Data | Next=NULL ]\n\nCIRCULAR LINKED LIST:\n[ Head ] -> [ Data | Next ] -> [ Data | Next ] ---+\n     ^                                            |\n     +--------------------------------------------+\n```\n\n---\n\n## 3. Fast and Slow Pointer: Floyd's Cycle Detection Algorithm\n\nDetects if a linked list contains an infinite cycle in $O(N)$ time and $O(1)$ auxiliary memory:\n\n```\n           [ 1 ] -> [ 2 ] -> [ 3 ] -> [ 4 ]\n                              ^         |\n                              |         v\n                             [ 6 ] <- [ 5 ]\n```\n\n1. Initialize two pointers: `slow = head` and `fast = head`.\n2. Move `slow` by 1 node (`slow = slow->next`) and `fast` by 2 nodes (`fast = fast->next->next`).\n3. If `fast` or `fast->next` reaches `NULL`, the list has **no cycle**.\n4. If `slow == fast`, a **cycle is detected**!\n5. **Finding Cycle Start Node:**\n   Reset `slow = head` while leaving `fast` at the meeting point. Advance both pointers one step at a time (`slow = slow->next; fast = fast->next;`). The node where they meet is **the exact start node of the cycle**!\n\n---\n\n## 4. In-Place Reversal of Singly Linked List ($O(N)$ Time, $O(1)$ Space)\n\n```c\nstruct ListNode* reverseList(struct ListNode* head) {\n    struct ListNode *prev = NULL, *curr = head, *next = NULL;\n    while (curr != NULL) {\n        next = curr->next;  // Save next node\n        curr->next = prev;  // Reverse pointer\n        prev = curr;        // Advance prev\n        curr = next;        // Advance curr\n    }\n    return prev; // New head of reversed list\n}\n```\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Cycle Detection:** Floyd's Tortoise and Hare algorithm ($O(N)$ time, $O(1)$ memory).\n- **Find Middle Node:** Slow moves 1 step, Fast moves 2 steps $\\implies$ when Fast reaches end, Slow is at middle.\n- **Delete Node without Head:** `node->val = node->next->val; node->next = node->next->next;` (copy next node and delete next).\n",
      "questions": [
        {
          "id": "ds-ll-1",
          "question": "What is the auxiliary space complexity of Floyd's cycle detection algorithm (Tortoise and Hare)?",
          "options": [
            "O(n)",
            "O(1)",
            "O(log n)",
            "O(n^2)"
          ],
          "correct_option": 1,
          "explanation": "Floyd's algorithm uses only two pointer references (slow and fast), requiring O(1) constant auxiliary space."
        },
        {
          "id": "ds-ll-2",
          "question": "Given a pointer to a node in a Doubly Linked List, what is the time complexity to delete that node?",
          "options": [
            "O(n)",
            "O(1)",
            "O(log n)",
            "O(n log n)"
          ],
          "correct_option": 1,
          "explanation": "Because a doubly linked list node contains a 'prev' pointer, its predecessor's 'next' and successor's 'prev' can be updated in O(1) time without traversing from the head."
        },
        {
          "id": "ds-ll-3",
          "question": "Using Floyd's Cycle Detection Algorithm (Tortoise and Hare), if a cycle of length C exists in a linked list, what is the maximum number of steps before slow and fast pointers meet?",
          "options": [
            "O(N) where N is the total number of nodes",
            "O(N^2)",
            "O(C^2)",
            "O(log N)"
          ],
          "correct_option": 0,
          "explanation": "The fast pointer enters the cycle first. When the slow pointer enters the cycle, the distance between them is at most C. Since fast closes the gap by 1 node per iteration, they meet within C steps. Total steps = O(N)."
        }
      ],
      "prerequisites": [
        "Pointers and dynamic memory allocation in C",
        "Memory layout: contiguous vs non-contiguous nodes"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Linked Lists and Pointer-Based Data Structures",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Linked List Data Structure",
          "url": "https://www.geeksforgeeks.org/data-structures/linked-list/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Linked List Problems and Floyd's Cycle Algorithm",
          "url": "https://www.interviewbit.com/linked-list-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-stacks-and-queues",
      "slug": "stacks-and-queues",
      "title": "Stacks and Queues",
      "description": "LIFO and FIFO data structures, array/linked list implementations, monotonic stacks, circular queues, and deques.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Uber",
        "Flipkart"
      ],
      "keyTakeaways": [
        "Stack follows LIFO (Last In First Out); operations: push, pop, peek in O(1) time.",
        "Queue follows FIFO (First In First Out); operations: enqueue, dequeue in O(1) time.",
        "Monotonic stacks maintain elements in sorted order; solves Next Greater Element in O(n) time.",
        "Circular queues use modulo arithmetic `(rear + 1) % capacity` to reuse empty spaces."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Stacks+and+Queues+Monotonic+Stack+Circular+Queue+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Stacks and Queues: Fundamentals and Implementations\n\nStacks and Queues are fundamental linear abstract data structures operating under strictly constrained access disciplines.\n\n---\n\n## 1. Stack (Last-In, First-Out — LIFO)\n- **Primary Operations (all $O(1)$ amortized):**\n  - `push(x)`: Place element on top.\n  - `pop()`: Remove and return top element.\n  - `peek() / top()`: Inspect top without removal.\n  - `isEmpty()`: Check if size is 0.\n- **Implementations:**\n  - **Array-based:** Fast cache locality; requires dynamic resizing (doubling capacity on overflow).\n  - **Linked List-based:** Push/pop at head node; zero resizing pauses, slight pointer overhead.\n- **Classic Applications:**\n  - Call stack management & recursion execution.\n  - Expression parsing: Infix to Postfix (Shunting-yard algorithm), Postfix evaluation.\n  - Balanced parentheses / brackets verification.\n  - Monotonic Stack: Next Greater Element in $O(N)$ linear time.\n\n---\n\n## 2. Queue (First-In, First-Out — FIFO)\n- **Primary Operations (all $O(1)$):**\n  - `enqueue(x)`: Insert at the rear.\n  - `dequeue()`: Remove and return from front.\n  - `front() / peek()`: Read front element.\n- **Circular Queue (Ring Buffer):**\n  - Avoids shifting elements in arrays by utilizing modulo arithmetic:\n    $$\\text{rear} = (\\text{rear} + 1) \\% \\text{capacity}$$\n    $$\\text{front} = (\\text{front} + 1) \\% \\text{capacity}$$\n- **Double-Ended Queue (Deque):**\n  - Supports insertion and deletion at both ends in $O(1)$.\n  - Used in Sliding Window Maximum algorithms.\n\n---\n\n## 3. High-Yield Interview Archetypes\n- **Implement Queue using two Stacks:** Push to $S_1$; pop from $S_2$ (refilling $S_2$ from $S_1$ only when $S_2$ is empty). Amortized $O(1)$ per operation.\n- **Implement Stack using two Queues:** Either costly push ($O(N)$) or costly pop ($O(N)$).\n",
      "questions": [
        {
          "id": "ds-sq-1",
          "question": "Which data structure is primarily used for breadth-first traversal (BFS) of a graph?",
          "options": [
            "Stack",
            "Queue",
            "Binary Search Tree",
            "Priority Queue"
          ],
          "correct_option": 1,
          "explanation": "BFS explores nodes level-by-level in first-in first-out order, which is strictly managed using a Queue."
        },
        {
          "id": "ds-sq-2",
          "question": "What is the time complexity to find the Next Greater Element for all elements of an array of size N using a Monotonic Stack?",
          "options": [
            "O(N^2)",
            "O(N log N)",
            "O(N)",
            "O(1)"
          ],
          "correct_option": 2,
          "explanation": "Each element is pushed onto and popped from the monotonic stack at most once, resulting in linear O(N) total runtime."
        },
        {
          "id": "ds-sq-3",
          "question": "When evaluating a postfix expression using a stack, what operation is performed upon encountering an operator?",
          "options": [
            "Pop the top two operands from the stack, apply the operator, and push the result back onto the stack.",
            "Push the operator onto the stack and wait for the next operand.",
            "Pop the top operand, apply the operator, and discard the result.",
            "Clear the stack and restart from the beginning."
          ],
          "correct_option": 0,
          "explanation": "In postfix evaluation, operands are pushed onto the stack. When an operator is read, the top two operands are popped (first popped is second operand, second popped is first operand), evaluated, and the result is pushed back."
        }
      ],
      "prerequisites": [
        "Arrays and Dynamic Sizing",
        "LIFO and FIFO Principles"
      ],
      "externalResources": [
        {
          "title": "Stack and Queue Data Structures — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/stack-data-structure/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Introduction to Algorithms (6.006) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-trees-and-binary-trees",
      "slug": "trees-and-binary-trees",
      "title": "Trees and Binary Trees",
      "description": "Hierarchical structures, tree terminology (height, depth, degree), full, complete, and perfect binary trees, and properties.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Oracle"
      ],
      "keyTakeaways": [
        "A tree with N nodes has exactly N - 1 edges.",
        "Full binary tree: Every node has 0 or 2 children.",
        "Complete binary tree: All levels are completely filled except possibly the last, filled from left to right.",
        "Maximum number of nodes at level L is 2^L (root at level 0)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Trees+and+Binary+Trees+Properties+Complete+Full+Tree+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Trees, Binary Tree Classifications, and Tree Traversals\n\nA Tree is a non-linear, hierarchical data structure consisting of nodes connected by edges, without cycles. A **Binary Tree** restricts every node to at most two children (termed Left child and Right child).\n\n---\n\n## 1. Binary Tree Taxonomy\n\n```\nFULL BINARY TREE:            COMPLETE BINARY TREE:          PERFECT BINARY TREE:\nEvery node has 0 or 2        All levels completely filled   All internal nodes have 2 children;\nchildren. (Never 1 child!).  except possibly last (filled   all leaves are at same level.\n                             from left to right).           Nodes = 2^(h+1) - 1.\n```\n\n- **Full (Strict) Binary Tree:** Every node has either $0$ or $2$ children.\n- **Complete Binary Tree:** Every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible (enables flat array representation in Heaps).\n- **Perfect Binary Tree:** All interior nodes have 2 children and all leaf nodes are at the exact same depth.\n- **Degenerate (Skewed) Tree:** Every internal node has only one child; degenerates into a linked list with $O(N)$ height.\n\n---\n\n## 2. Core Tree Properties and Mathematical Identities\n\nFor a binary tree of height $h$ (where root is height $0$):\n1. **Maximum nodes at level $k$:** $2^k$.\n2. **Maximum nodes in tree of height $h$:** $2^{h+1} - 1$.\n3. **Minimum height for $N$ nodes:** $h_{\\min} = \\lceil \\log_2(N + 1) \\rceil - 1$.\n4. **Leaf Nodes vs Degree-2 Nodes Property:**\n   In any binary tree, if $n_0$ is the number of leaf nodes (degree 0) and $n_2$ is the number of nodes with 2 children:\n   $$\\mathbf{n_0 = n_2 + 1}$$\n\n---\n\n## 3. Tree Traversals\n\n```\n           [ 1 ]\n          /     \\\n       [ 2 ]   [ 3 ]\n       /   \\\n    [ 4 ] [ 5 ]\n```\n\n1. **Preorder (Root $\\to$ Left $\\to$ Right):** `1, 2, 4, 5, 3` (Used for cloning/serialization).\n2. **Inorder (Left $\\to$ Root $\\to$ Right):** `4, 2, 5, 1, 3` (Yields sorted order in BSTs).\n3. **Postorder (Left $\\to$ Right $\\to$ Root):** `4, 5, 2, 3, 1` (Used for bottom-up deletion/freeing).\n4. **Level-Order (Breadth-First Search - BFS):** `1, 2, 3, 4, 5` (Implemented using a FIFO Queue).\n\n---\n\n## 4. Reconstructing a Unique Binary Tree\n\n- A binary tree can be **uniquely reconstructed** if and only if you are given:\n  1. **Inorder + Preorder**, OR\n  2. **Inorder + Postorder**.\n- *(Crucial Note: Preorder + Postorder does NOT uniquely reconstruct a general binary tree, but DOES uniquely reconstruct a Full Binary Tree!).*\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **Leaf-to-Degree-2 Theorem:** $n_0 = n_2 + 1$.\n- **Max Nodes at Height $h$:** $2^{h+1} - 1$.\n- **Traversal Requirements:** Inorder is mandatory to uniquely split left and right subtrees!\n",
      "questions": [
        {
          "id": "ds-tree-1",
          "question": "What is the maximum number of nodes in a binary tree of height h (where a single root node has height 0)?",
          "options": [
            "2^h",
            "2^(h+1) - 1",
            "2^(h-1)",
            "2^h - 1"
          ],
          "correct_option": 1,
          "explanation": "A perfect binary tree of height h has 2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1 nodes."
        },
        {
          "id": "ds-tree-2",
          "question": "In any non-empty full binary tree, if there are L leaf nodes, how many internal nodes (nodes with 2 children) are there?",
          "options": [
            "L + 1",
            "L - 1",
            "2L",
            "L / 2"
          ],
          "correct_option": 1,
          "explanation": "For any full binary tree (where every non-leaf node has 2 children), the number of internal nodes is always exactly L - 1."
        },
        {
          "id": "ds-tree-3",
          "question": "What defines a 'Complete Binary Tree', and why is this property critical for array-based implementations such as Binary Heaps?",
          "options": [
            "All levels are completely filled except possibly the last, which is filled strictly from left to right; allowing parent and child indices to be computed mathematically without pointer overhead.",
            "Every non-leaf node must have exactly two children.",
            "All leaves must reside at strictly the exact same depth level.",
            "The height difference between left and right subtrees of every node must be at most 1."
          ],
          "correct_option": 0,
          "explanation": "A complete binary tree fills all levels completely except possibly the last level, which is filled sequentially from left to right. This guarantees contiguous placement in an array where for index i, left child is 2i + 1 and right child is 2i + 2 with zero wasted space or pointer overhead."
        }
      ],
      "prerequisites": [
        "Linked lists and dynamic node allocation",
        "Recursion and call stack activation frames"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Binary Trees and Tree Traversals",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Binary Tree Data Structure",
          "url": "https://www.geeksforgeeks.org/binary-tree-data-structure/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Tree Traversals and Diameter Calculation",
          "url": "https://www.interviewbit.com/tree-data-structure-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-binary-search-trees",
      "slug": "binary-search-trees-bst",
      "title": "Binary Search Trees (BST)",
      "description": "BST property, search, insertion, deletion (in-order predecessor/successor), and skewed tree degradation.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Salesforce"
      ],
      "keyTakeaways": [
        "BST invariant: Left subtree keys < root key < right subtree keys.",
        "In-order traversal of a BST yields elements in strictly sorted ascending order.",
        "Average search, insertion, and deletion time is O(log n); worst-case is O(n) for skewed trees.",
        "Deleting a node with two children requires replacing with its in-order predecessor or successor."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Binary+Search+Tree+BST+Insertion+Deletion+Search+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Binary Search Trees (BST), Deletion Cases, and Self-Balancing Trees (AVL)\n\nA Binary Search Tree (BST) is an ordered tree data structure that facilitates fast dynamic lookups, insertions, deletions, and sorted order enumerations.\n\n---\n\n## 1. The Binary Search Tree Invariant\n\nFor every node $X$ in a BST:\n- Every key in the **left subtree** of $X$ is **strictly less than** $X.\\text{key}$: $\\forall y \\in \\text{Left}(X), \\quad y.\\text{key} < X.\\text{key}$.\n- Every key in the **right subtree** of $X$ is **strictly greater than** $X.\\text{key}$: $\\forall z \\in \\text{Right}(X), \\quad z.\\text{key} > X.\\text{key}$.\n\n```\n                 [ 50 ]\n                /      \\\n             [ 30 ]   [ 70 ]\n             /   \\     /   \\\n           [20] [40] [60] [80]\n```\n*Golden Theorem:* The **Inorder Traversal of a BST produces keys in strictly ascending sorted order**!\n\n---\n\n## 2. BST Deletion: The Three Cases\n\nDeleting a node $Z$ from a BST requires preserving the BST property:\n\n1. **Case 1: $Z$ is a Leaf Node (0 children):**\n   Simply remove the node and update parent pointer to `NULL`.\n2. **Case 2: $Z$ has exactly One Child:**\n   Bypass $Z$ by linking $Z$'s parent directly to $Z$'s child (splice out $Z$).\n3. **Case 3: $Z$ has Two Children:**\n   - Locate $Z$'s **Inorder Successor** (smallest node in $Z$'s right subtree: go right once, then left all the way).\n   - Copy the value of the inorder successor into $Z$.\n   - Recursively delete the inorder successor from the right subtree (which falls into Case 1 or Case 2 because the successor has at most one child!).\n\n---\n\n## 3. Complexity Degeneration and AVL Self-Balancing Trees\n\n- If keys are inserted in sorted or reverse-sorted order (`1, 2, 3, 4, 5`), a naive BST degenerates into a linear linked list with height $h = N$, causing search complexity to collapse from $O(\\log N)$ to $O(N)$!\n- **AVL Tree (Adelson-Velsky and Landis):** Enforces balance factor $BF \\in \\{-1, 0, +1\\}$ at every node:\n  $$BF = \\text{Height}(\\text{Left Subtree}) - \\text{Height}(\\text{Right Subtree})$$\n  Restores balance in $O(1)$ time via **Tree Rotations** (LL, RR, LR, RL). Guaranteed height: $h < 1.44 \\log_2 N$.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **BST Search/Insert/Delete Complexity:** Average $O(\\log N)$, Worst-case $O(N)$.\n- **Inorder Successor:** Minimum element in right subtree.\n- **Inorder Predecessor:** Maximum element in left subtree.\n- **AVL Balance Invariant:** $|h_L - h_R| \\le 1$.\n",
      "questions": [
        {
          "id": "ds-bst-1",
          "question": "Which tree traversal of a Binary Search Tree produces elements in sorted ascending order?",
          "options": [
            "Pre-order",
            "In-order",
            "Post-order",
            "Level-order"
          ],
          "correct_option": 1,
          "explanation": "In-order traversal visits (Left, Root, Right). Since Left < Root < Right in a BST, in-order traversal always outputs keys in sorted ascending order."
        },
        {
          "id": "ds-bst-2",
          "question": "What is the worst-case time complexity of searching an element in an unbalanced Binary Search Tree of N nodes?",
          "options": [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N log N)"
          ],
          "correct_option": 2,
          "explanation": "If elements are inserted in already sorted order, the BST degrades into a linear skewed tree (linked list) where height is N, leading to O(N) search."
        },
        {
          "id": "ds-bst-3",
          "question": "When deleting a node that possesses two children in a Binary Search Tree, which replacement node preserves the BST invariant?",
          "options": [
            "The in-order successor (minimum node in the right subtree) or in-order predecessor (maximum node in the left subtree)",
            "The root node of the entire BST",
            "Any immediate leaf node in the left subtree",
            "The deepest node currently residing in the tree"
          ],
          "correct_option": 0,
          "explanation": "To maintain the BST ordering property when a node has two children, it must be replaced by either the next larger key (in-order successor, smallest key in right subtree) or next smaller key (in-order predecessor). That chosen node is guaranteed to have at most one child, making its subsequent removal from the subtree trivial."
        }
      ],
      "prerequisites": [
        "Binary trees and tree traversals",
        "Recursion and sorted arrays"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Binary Search Trees and AVL Self-Balancing",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Binary Search Tree (BST) Data Structure",
          "url": "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: BST Insertion, Deletion, and Balancing Problems",
          "url": "https://www.interviewbit.com/tree-data-structure-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-tree-traversals",
      "slug": "tree-traversals",
      "title": "Tree Traversals",
      "description": "Depth-first traversals (pre-order, in-order, post-order), breadth-first (level-order), and tree reconstruction.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Meta",
        "Bloomberg"
      ],
      "keyTakeaways": [
        "In-order: Left -> Root -> Right. Pre-order: Root -> Left -> Right. Post-order: Left -> Right -> Root.",
        "Level-order traversal uses a Queue to process nodes level by level.",
        "A binary tree can be uniquely reconstructed from (In-order + Pre-order) or (In-order + Post-order).",
        "Pre-order + Post-order alone CANNOT uniquely reconstruct a general binary tree."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Binary+Tree+Traversals+Preorder+Inorder+Postorder+Morris+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Tree Traversals\n\nTraversals visit every vertex in a tree structure exactly once. Binary tree traversals partition into Depth-First Search (DFS) and Breadth-First Search (BFS).\n\n---\n\n## 1. Depth-First Traversals (DFS)\nAll standard recursive DFS traversals run in $O(N)$ time and $O(H)$ auxiliary space (where $H$ is tree height: $O(\\log N)$ balanced, $O(N)$ worst-case skewed):\n- **Pre-Order (Root $\\to$ Left $\\to$ Right):**\n  - Serializes/clones tree structures and constructs prefix expressions (Polish notation).\n  - First element visited is always the global root.\n- **In-Order (Left $\\to$ Root $\\to$ Right):**\n  - For a Binary Search Tree (BST), In-order visits keys in strictly non-decreasing sorted order.\n  - Vital for partitioning elements into left vs. right subtrees during tree reconstruction.\n- **Post-Order (Left $\\to$ Right $\\to$ Root):**\n  - Bottom-up processing: evaluates expressions (Postfix/RPN), deletes nodes safely without dangling references, and computes subtree metrics (tree height, diameter, disk usage).\n\n---\n\n## 2. Breadth-First Traversal (BFS / Level-Order)\n- Visits nodes row-by-row from top to bottom, left to right.\n- **Algorithm:** Uses a FIFO Queue (`std::queue` or `ArrayDeque`).\n  1. Push `root` to queue.\n  2. While queue is non-empty, record `size = queue.size()`, pop `size` nodes, append their children to queue.\n- **Complexity:** $O(N)$ time and $O(W)$ auxiliary space, where $W$ is maximum width of the tree ($W \\le \\lceil N/2 \\rceil$ at leaf level of a complete binary tree).\n\n---\n\n## 3. Morris In-Order Traversal ($O(1)$ Space)\n- Eliminates recursion stack and explicit heap memory using **Threaded Binary Trees**:\n  1. If current node has no left child, visit current and move right.\n  2. Else, find current's in-order predecessor (rightmost node in left subtree).\n  3. If predecessor's right pointer is `null`, establish a temporary thread (`pred->right = curr`) and advance `curr = curr->left`.\n  4. If predecessor's right pointer points to `curr`, remove the temporary thread (`pred->right = null`), visit `curr`, and advance `curr = curr->right`.\n- **Complexity:** $O(N)$ time (each edge traversed at most 3 times) and $O(1)$ auxiliary space.\n\n---\n\n## 4. Tree Reconstruction Guarantees\n- A unique binary tree requires **In-Order + (Pre-Order OR Post-Order OR Level-Order)**.\n  - Pre/Post/Level-order locates the root.\n  - In-order partitions elements into the left subtree and right subtree.\n- **Special Case:** Pre-order + Post-order can uniquely reconstruct a binary tree **if and only if** the tree is a **Full Binary Tree** (every node has either 0 or 2 children).\n",
      "questions": [
        {
          "id": "ds-trav-1",
          "question": "Which pair of traversals is sufficient to uniquely reconstruct any general binary tree?",
          "options": [
            "Pre-order and Post-order",
            "In-order and Pre-order",
            "Level-order and Pre-order",
            "Level-order and Post-order"
          ],
          "correct_option": 1,
          "explanation": "In-order traversal is necessary because it reveals which nodes belong to the left vs right subtree of the root identified by the pre-order traversal."
        },
        {
          "id": "ds-trav-2",
          "question": "Which traversal order processes child nodes before processing their parent node?",
          "options": [
            "Pre-order",
            "In-order",
            "Post-order",
            "Level-order"
          ],
          "correct_option": 2,
          "explanation": "Post-order traversal visits Left, Right, and then Root, guaranteeing that both child subtrees are evaluated before their parent."
        },
        {
          "id": "ds-trav-3",
          "question": "Which data structure is fundamentally required to implement iterative Level-Order traversal of a binary tree?",
          "options": [
            "Queue (FIFO)",
            "Stack (LIFO)",
            "Priority Queue",
            "Disjoint Set Union (DSU)"
          ],
          "correct_option": 0,
          "explanation": "Level-order traversal visits nodes layer by layer from root downward, which requires a First-In-First-Out (Queue) data structure to store child nodes for exploration in FIFO sequence."
        }
      ],
      "prerequisites": [
        "Binary Trees",
        "Recursion and Call Stacks"
      ],
      "externalResources": [
        {
          "title": "Tree Traversals (Inorder, Preorder, Postorder) — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-avl-trees-and-balanced-trees",
      "slug": "avl-trees-and-balanced-trees",
      "title": "AVL Trees and Balanced Trees",
      "description": "Self-balancing BSTs, balance factor (height(L) - height(R)), LL, RR, LR, RL tree rotations, and Red-Black trees.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "AVL balance factor = height(left subtree) - height(right subtree) in {-1, 0, +1}.",
        "Rotations restore balance in O(1) time: Single rotations (LL, RR) and Double rotations (LR, RL).",
        "Guarantees strictly O(log n) worst-case time for search, insertion, and deletion.",
        "Red-Black trees use color rules with slightly looser height constraints, requiring fewer rotations on insert/delete."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=AVL+Trees+and+Balanced+Trees+Rotations+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Self-Balancing Trees: AVL Trees & Red-Black Trees\n\nWhile an arbitrary Binary Search Tree (BST) provides $O(\\log n)$ operations on average, adversarial or sorted insertions cause it to degenerate into a skewed linked list with $O(n)$ worst-case time complexity. **Self-Balancing Binary Search Trees** maintain logarithmic tree height guarantees through local pointer rotations.\n\n---\n\n## 1. AVL Tree Fundamentals & Balance Factor\n\nAn AVL tree (Adelson-Velsky and Landis, 1962) is a strictly height-balanced BST. For every node $x$ in the tree:\n$$\\text{Balance Factor}(x) = \\text{Height}(\\text{Left Subtree}) - \\text{Height}(\\text{Right Subtree}) \\in \\{-1, 0, +1\\}$$\n\n- If $\\text{Balance Factor}(x) > +1$: Node is **Left-heavy**.\n- If $\\text{Balance Factor}(x) < -1$: Node is **Right-heavy**.\n- Empty subtree has height $-1$; single leaf node has height $0$.\n\n### Height & Minimum Node Bounds\nLet $N(h)$ be the minimum number of nodes required to construct an AVL tree of height $h$:\n$$N(h) = N(h - 1) + N(h - 2) + 1 \\quad (N(0) = 1, N(1) = 2, N(2) = 4, N(3) = 7, N(4) = 12)$$\nThis recurrence is closely tied to Fibonacci numbers: $N(h) = F_{h+2} - 1$.\n- Consequently, the maximum height of an AVL tree with $n$ nodes is bounded by:\n  $$h_{\\max} \\approx 1.44 \\log_2(n + 2) - 0.328 = O(\\log n)$$\n\n---\n\n## 2. The 4 Tree Rotations\n\nRotations rebalance subtrees in $O(1)$ time while preserving the BST in-order traversal property.\n\n### A. Single Right Rotation (LL Imbalance)\nOccurs when an insertion is in the **Left child's Left subtree**:\n```\n          z (BF = +2)                   y (BF = 0)\n         / \\                           / \\\n        y   T4      Right Rotate(z)   x   z\n       / \\          ------------->   / \\ / \\\n      x   T3                        T1 T2 T3 T4\n     / \\\n    T1 T2\n```\n\n### B. Single Left Rotation (RR Imbalance)\nOccurs when an insertion is in the **Right child's Right subtree**:\n```\n        z (BF = -2)                     y (BF = 0)\n       / \\                             / \\\n      T1  y         Left Rotate(z)    z   x\n         / \\        ------------>    / \\ / \\\n        T2  x                       T1 T2 T3 T4\n           / \\\n          T3 T4\n```\n\n### C. Double Rotations (LR and RL Imbalances)\n- **LR Imbalance:** Inserted into Left child's Right subtree $\\implies$ **Left Rotate on Left Child**, then **Right Rotate on Unbalanced Node**.\n- **RL Imbalance:** Inserted into Right child's Left subtree $\\implies$ **Right Rotate on Right Child**, then **Left Rotate on Unbalanced Node**.\n\n---\n\n## 3. AVL Trees vs Red-Black Trees: Engineering Trade-offs\n\n| Characteristic | AVL Tree | Red-Black Tree |\n| :--- | :--- | :--- |\n| **Balance Strictness** | Strict ($|\\text{height difference}| \\le 1$) | Relaxed ($h \\le 2 \\log_2(n + 1)$) |\n| **Max Height Bound** | $\\approx 1.44 \\log_2 n$ | $\\le 2 \\log_2 n$ |\n| **Search / Lookup** | Faster (shorter tree height) | Slightly slower (up to $2\\times$ deeper) |\n| **Insertion Rotations** | At most $1$ rotation (single or double) | At most $2$ rotations (color flips predominate) |\n| **Deletion Rotations** | Up to $O(\\log n)$ rotations up to root | At most $3$ rotations |\n| **Primary Production Use** | Read-heavy databases, symbol lookups | Java `TreeMap` / `TreeSet`, C++ `std::map`, Linux kernel CFS scheduler |\n",
      "questions": [
        {
          "id": "ds-avl-1",
          "question": "What is the allowable range of the Balance Factor for any node in an AVL Tree?",
          "options": [
            "0 only",
            "-1, 0, or 1",
            "-2 to +2",
            "Any value as long as left < right"
          ],
          "correct_option": 1,
          "explanation": "By definition, an AVL tree requires the height difference between the left and right subtrees of every node to be strictly in {-1, 0, 1}."
        },
        {
          "id": "ds-avl-2",
          "question": "Which rotation sequence is required to restore balance when a node is inserted into the right subtree of the left child (LR imbalance)?",
          "options": [
            "Single Left rotation",
            "Single Right rotation",
            "Left rotation on left child, then Right rotation on root",
            "Right rotation on right child, then Left rotation on root"
          ],
          "correct_option": 2,
          "explanation": "An LR imbalance is corrected with a double rotation: first a Left rotation on the left child, followed by a Right rotation on the unbalanced parent node."
        },
        {
          "id": "ds-avl-3",
          "question": "What is the minimum number of nodes required to construct an AVL tree of height h = 3 (where a single root node has height 0)?",
          "options": [
            "7 nodes",
            "4 nodes",
            "8 nodes",
            "15 nodes"
          ],
          "correct_option": 0,
          "explanation": "The minimum nodes for height h is given by N(h) = N(h-1) + N(h-2) + 1, with base cases N(0)=1 and N(1)=2. For h=2: N(2) = 2 + 1 + 1 = 4. For h=3: N(3) = N(2) + N(1) + 1 = 4 + 2 + 1 = 7 nodes."
        }
      ],
      "prerequisites": [
        "Binary Search Trees",
        "Tree Height and Balance Factors"
      ],
      "externalResources": [
        {
          "title": "AVL Tree Insertion and Rotations — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/introduction-to-avl-tree/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Binary Search Trees & AVL Trees — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-heaps-and-priority-queues",
      "slug": "heaps-and-priority-queues",
      "title": "Heaps and Priority Queues",
      "description": "Min-heaps, max-heaps, array representation, heapify algorithm in O(n), push/pop in O(log n), and priority queues.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Uber",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Complete binary tree represented compactly in array: parent at i, children at 2i + 1 and 2i + 2.",
        "Max-Heap property: Parent key >= Children keys. Min-Heap property: Parent key <= Children keys.",
        "Building a heap from an unordered array takes O(n) time using bottom-up heapify.",
        "Extracting min/max root takes O(log n) time; peek takes O(1) time."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Heaps+and+Priority+Queues+Min+Heap+Max+Heap+Heapify+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Binary Heaps, Priority Queues, and HeapSort\n\nA Binary Heap is a complete binary tree that satisfies the **Heap Order Invariant**. Because it is always complete, it can be mapped compactly into a contiguous 1D array without storing pointer variables.\n\n---\n\n## 1. Array Representation of a Complete Binary Tree\n\nFor a 0-indexed array with element at index $i$:\n- **Parent Index:** $\\lfloor \\frac{i - 1}{2} \\rfloor$\n- **Left Child Index:** $2i + 1$\n- **Right Child Index:** $2i + 2$\n- **Internal Nodes Range:** $0$ to $\\lfloor \\frac{N}{2} \\rfloor - 1$\n- **Leaf Nodes Range:** $\\lfloor \\frac{N}{2} \\rfloor$ to $N - 1$\n\n```\nHeap Tree:                    Array Layout:\n        [ 90 ]                Index:  0    1    2    3    4    5\n       /      \\               Value: [90 | 70 | 80 | 30 | 50 | 40]\n    [ 70 ]  [ 80 ]\n    /    \\   /\n  [30]  [50][40]\n```\n\n---\n\n## 2. Heap Invariants: Min-Heap vs Max-Heap\n\n- **Max-Heap:** Every parent node is greater than or equal to its children ($A[\\text{parent}(i)] \\ge A[i]$). The maximum element is always at the root (`A[0]`).\n- **Min-Heap:** Every parent node is less than or equal to its children ($A[\\text{parent}(i)] \\le A[i]$). The minimum element is always at the root (`A[0]`).\n\n---\n\n## 3. Core Heap Operations\n\n1. **`heapify(i)` (Sift-Down):** Restores heap property downward when children satisfy heap invariant but root $i$ violates it. Height is at most $\\log N \\implies \\mathbf{O(\\log N)}$.\n2. **`insert(val)`:** Appends element at array end ($N$), and bubbles upward (sift-up) by swapping with parent: $\\mathbf{O(\\log N)}$.\n3. **`extractMin()` / `extractMax()`:** Swap root with last leaf element, decrement heap size, and call `heapify(0)`: $\\mathbf{O(\\log N)}$.\n4. **`buildHeap(array)`:** Converts an arbitrary array into a heap.\n   - Naive analysis suggests $O(N \\log N)$, but summing heights over all nodes proves **`buildHeap` runs in strictly $O(N)$ linear time!**\n   $$\\sum_{h=0}^{\\lfloor \\log N \\rfloor} \\left\\lceil \\frac{N}{2^{h+1}} \\right\\rceil O(h) = O\\left( N \\sum_{h=0}^\\infty \\frac{h}{2^h} \\right) = \\mathbf{O(N)}$$\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Parent:** $(i - 1) / 2$.\n- **Children:** $2i + 1$ (Left) and $2i + 2$ (Right).\n- **Build-Heap Time:** $O(N)$ linear time.\n- **HeapSort:** $O(N \\log N)$ worst-case time, $O(1)$ auxiliary space (in-place).\n- **Find Min/Max:** $O(1)$ instant read at index 0.\n",
      "questions": [
        {
          "id": "ds-hp-1",
          "question": "What is the time complexity of building a Binary Heap from an arbitrary array of N elements using bottom-up heapify?",
          "options": [
            "O(N log N)",
            "O(N)",
            "O(log N)",
            "O(N^2)"
          ],
          "correct_option": 1,
          "explanation": "Building a heap bottom-up sums the series sum(h / 2^h) for heights h=0 to log N, which mathematically converges to linear O(N) time."
        },
        {
          "id": "ds-hp-2",
          "question": "In a 0-indexed array representation of a binary heap, where is the parent of the node at index 7 located?",
          "options": [
            "Index 3",
            "Index 2",
            "Index 4",
            "Index 1"
          ],
          "correct_option": 0,
          "explanation": "Parent index = (i - 1) / 2. For index 7: (7 - 1) / 2 = 6 / 2 = 3."
        },
        {
          "id": "ds-heap-3",
          "question": "In a Max-Heap array implementation, how is the extractMax() operation performed in O(log N) time?",
          "options": [
            "Swap the root with the last leaf element, decrement heap size, and invoke sift-down (max-heapify) on the new root.",
            "Remove the root and shift every remaining array element left by 1 index.",
            "Promote the left child to root and recursively delete the right child.",
            "Reconstruct the entire heap from scratch using bottom-up build."
          ],
          "correct_option": 0,
          "explanation": "extractMax() achieves O(log N) time by swapping the maximum root element with the last array element (O(1)), discarding the last element, and restoring the heap invariant by sifting down the new root along the path of maximum children (at most tree height = log N swaps)."
        }
      ],
      "prerequisites": [
        "Complete binary trees and arrays",
        "Asymptotic complexity analysis"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Heaps and HeapSort",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Binary Heap Data Structure",
          "url": "https://www.geeksforgeeks.org/binary-heap/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Priority Queues and Heap Operations",
          "url": "https://www.interviewbit.com/heap-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-hashing-and-hash-tables",
      "slug": "hashing-and-hash-tables",
      "title": "Hashing and Hash Tables",
      "description": "Hash functions, collision resolution (chaining vs open addressing), linear/quadratic probing, double hashing, and load factor.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Meta",
        "Directi"
      ],
      "keyTakeaways": [
        "Hash function maps keys to buckets; goal is uniform distribution and O(1) average lookup.",
        "Separate Chaining resolves collisions using linked lists or balanced trees at each bucket.",
        "Open Addressing stores all entries in table: Linear probing, Quadratic probing, Double hashing.",
        "Load factor alpha = n / m; rehashing occurs when alpha exceeds threshold (typically 0.75)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Hashing+Hash+Tables+Collision+Resolution+Chaining+Probing+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Hash Tables, Hash Functions & Collision Resolution\n\nA **Hash Table** implements an associative array abstract data type that maps keys to values. Using a hash function $h(k)$ to compute an integer slot index, it provides **$O(1)$ expected amortized time** for `insert`, `search`, and `delete` operations.\n\n---\n\n## 1. Hash Functions & Uniform Hashing\n\nA good hash function satisfies the **Simple Uniform Hashing Assumption (SUHA)**: any given key is equally likely to hash into any of the $m$ slots, independently of where any other key has hashed.\n\n- **Division Method:** $h(k) = k \\pmod m$. To prevent patterns, $m$ should be a **prime number** not close to a power of 2 or 10.\n- **Multiplication Method:** $h(k) = \\lfloor m (k A \\bmod 1) \\rfloor$, where $A \\approx (\\sqrt{5} - 1)/2 \\approx 0.6180339887$ (Knuth's golden ratio fraction).\n- **Universal Hashing:** Randomly chooses hash function $h$ from a family $\\mathcal{H}$ at runtime to prevent worst-case adversarial inputs ($P(h(x) = h(y)) \\le 1/m$).\n\n---\n\n## 2. Load Factor & Dynamic Rehashing\n\n$$\\text{Load Factor } \\alpha = \\frac{n}{m} = \\frac{\\text{Number of elements stored}}{\\text{Total number of table slots / buckets}}$$\n\n- In **Separate Chaining**, $\\alpha$ can exceed $1$ (represents average chain length).\n- In **Open Addressing**, $\\alpha$ can **never exceed $1$** ($0 \\le \\alpha < 1$). Typically, when $\\alpha \\ge 0.70 - 0.75$, the table is resized (doubled) and all keys are **rehashed**.\n- Dynamic resizing doubles table capacity $m \\to 2m$ in $O(n)$ time, maintaining $O(1)$ amortized cost per insert.\n\n---\n\n## 3. Collision Resolution Strategies\n\n### A. Separate Chaining (Closed Addressing)\nEach bucket contains a linked list or red-black tree (e.g., Java 8+ `HashMap` converts linked lists to Red-Black trees when bucket length $\\ge 8$).\n- **Search Cost:** $O(1 + \\alpha)$ expected time.\n- **Advantages:** Graceful degradation as $\\alpha > 1$; deletions are simple linked list node removals.\n- **Disadvantages:** Cache locality is poor due to non-contiguous heap pointers; extra pointer memory overhead.\n\n### B. Open Addressing (Probing)\nAll elements are stored directly inside the array without external pointers.\n\n| Probing Strategy | Probe Formula ($i = 0, 1, \\dots, m-1$) | Key Advantage | Vulnerability / Drawback |\n| :--- | :--- | :--- | :--- |\n| **Linear Probing** | $h(k, i) = (h'(k) + i) \\pmod m$ | Excellent cache line locality | **Primary Clustering:** Collisions merge into long contiguous runs, drastically degrading search. |\n| **Quadratic Probing** | $h(k, i) = (h'(k) + c_1 i + c_2 i^2) \\pmod m$ | Eliminates primary clustering | **Secondary Clustering:** Keys with identical initial hash $h'(k)$ trace the exact same probe sequence. |\n| **Double Hashing** | $h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\pmod m$ | Eliminates both primary and secondary clustering | Requires $h_2(k)$ to be **relatively prime to $m$** (e.g. $m$ prime and $h_2(k) < m$). |\n\n> [!WARNING]\n> **Deletion in Open Addressing:** Deleting a key cannot simply set the slot to `EMPTY`, or it would break probe chains for subsequent keys! Deleted slots must be marked with a special `DELETED` tombstone marker to allow search probing to continue past them.\n",
      "questions": [
        {
          "id": "ds-hash-1",
          "question": "What is the primary drawback of Linear Probing in open addressing hash tables?",
          "options": [
            "Memory fragmentation",
            "Primary clustering (long contiguous runs of occupied slots)",
            "Requires extra pointer overhead per element",
            "Cannot store string keys"
          ],
          "correct_option": 1,
          "explanation": "Linear probing suffers from primary clustering: when multiple keys collide, contiguous blocks of occupied slots grow, causing subsequent keys to probe longer sequences."
        },
        {
          "id": "ds-hash-2",
          "question": "What is the load factor alpha of a hash table with 75 stored items and 100 buckets?",
          "options": [
            "1.33",
            "0.75",
            "7500",
            "25"
          ],
          "correct_option": 1,
          "explanation": "Load factor alpha = (Number of stored elements n) / (Number of buckets m) = 75 / 100 = 0.75."
        },
        {
          "id": "ds-hash-3",
          "question": "In Double Hashing with probe function h(k, i) = (h1(k) + i * h2(k)) mod m, what condition must the secondary hash function h2(k) satisfy?",
          "options": [
            "h2(k) must be relatively prime to the table size m (gcd(h2(k), m) = 1) so that all m slots can be probed.",
            "h2(k) must always evaluate to zero.",
            "h2(k) must equal h1(k) squared.",
            "h2(k) must generate negative numbers."
          ],
          "correct_option": 0,
          "explanation": "In double hashing, the offset step is h2(k). If h2(k) and table size m share a common factor greater than 1, probing will cycle through a small subset of slots and fail to inspect the entire table. Therefore, gcd(h2(k), m) must strictly equal 1."
        }
      ],
      "prerequisites": [
        "Arrays and Modulo Arithmetic",
        "Collision Resolution Concepts"
      ],
      "externalResources": [
        {
          "title": "Hashing and Hash Tables Guide — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/hashing-data-structure/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Data Structures and Hash Tables — Harvard CS50",
          "provider": "Harvard CS50",
          "url": "https://cs50.harvard.edu/x/2024/weeks/5/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-graph-representations",
      "slug": "graph-representations",
      "title": "Graph Representations",
      "description": "Adjacency matrix vs adjacency list, incidence matrix, edge list, space tradeoffs, and graph density.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Uber",
        "LinkedIn"
      ],
      "keyTakeaways": [
        "Adjacency Matrix uses O(V^2) space; edge lookup (u, v) in O(1); ideal for dense graphs.",
        "Adjacency List uses O(V + E) space; finding neighbors in O(degree); ideal for sparse graphs.",
        "Sparse graph: |E| << |V|^2. Dense graph: |E| ≈ |V|^2.",
        "Directed graphs have asymmetric adjacency matrices; undirected graphs are symmetric along main diagonal."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Graph+Representations+Adjacency+Matrix+List+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Graph Representations: Adjacency Matrix, Adjacency List, and Trade-Offs\n\nA Graph $G = (V, E)$ consists of a set of vertices $V$ and a set of edges $E$ connecting pairs of vertices. Choosing the appropriate memory representation is critical for algorithmic time and space complexity.\n\n---\n\n## 1. Adjacency Matrix vs Adjacency List\n\n```\nGraph:                          ADJACENCY MATRIX (V x V)      ADJACENCY LIST\n  (0) -------- (1)                  0  1  2  3                0: [1] -> [2]\n   |            |                0 [0, 1, 1, 0]               1: [0] -> [3]\n   |            |                1 [1, 0, 0, 1]               2: [0] -> [3]\n  (2) -------- (3)                2 [1, 0, 0, 1]               3: [1] -> [2]\n                                 3 [0, 1, 1, 0]\n```\n\n| Operation / Metric | Adjacency Matrix | Adjacency List |\n| :--- | :--- | :--- |\n| **Storage Memory Space** | $\\mathbf{\\Theta(V^2)}$ | $\\mathbf{\\Theta(V + E)}$ |\n| **Check if Edge $(u, v)$ Exists** | $\\mathbf{O(1)}$ instant array lookup | $O(\\text{deg}(u))$ list traversal |\n| **Iterate All Neighbors of $u$** | $O(V)$ (must scan entire row) | $\\mathbf{O(\\text{deg}(u))}$ (immediate) |\n| **Add Vertex** | $O(V^2)$ (resize matrix) | $O(1)$ |\n| **Add Edge** | $O(1)$ | $O(1)$ |\n| **Best Suited For** | **Dense Graphs** ($E \\approx V^2$) | **Sparse Graphs** ($E \\ll V^2$) |\n\n---\n\n## 2. Handshaking Lemma (Fundamental Invariant)\n\nFor any undirected graph $G = (V, E)$:\n$$\\sum_{v \\in V} \\text{deg}(v) = 2|E|$$\n*Consequence:* The sum of degrees across all vertices is always an **even number**, and the count of vertices having **odd degree is strictly even**!\n\n---\n\n## 3. Modern Hybrid: Adjacency Vectors / CSR (Compressed Sparse Row)\n\nIn production software (high-performance graphics, graph neural networks):\n- Pointer-based linked lists suffer from pointer overhead and CPU cache misses.\n- Compilers and engines use **Compressed Sparse Row (CSR)** or `std::vector<std::vector<int>>` which stores neighbor lists in contiguous dynamic arrays, delivering $O(V + E)$ space with $O(1)$ cache spatial locality!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Dense Graphs:** Use Adjacency Matrix ($E \\approx V^2$).\n- **Sparse Graphs:** Use Adjacency List ($E \\ll V^2$).\n- **Handshaking Lemma:** $\\sum \\text{deg}(v) = 2E$.\n- **Graph Traversal Complexities:** Both BFS and DFS run in $\\mathbf{O(V + E)}$ using Adjacency List, but $\\mathbf{O(V^2)}$ using Adjacency Matrix.\n",
      "questions": [
        {
          "id": "ds-gr-1",
          "question": "For a sparse graph with 10,000 vertices and 25,000 edges, which representation is significantly more space-efficient?",
          "options": [
            "Adjacency Matrix",
            "Adjacency List",
            "Both use identical space",
            "Incidence Matrix"
          ],
          "correct_option": 1,
          "explanation": "An adjacency matrix requires V^2 = 100,000,000 entries. An adjacency list requires only V + 2E = 10,000 + 50,000 = 60,000 node pointers, saving massive memory."
        },
        {
          "id": "ds-gr-2",
          "question": "In the adjacency matrix of an undirected graph with no self-loops, what is true about the matrix?",
          "options": [
            "It is strictly upper-triangular",
            "It is symmetric across the main diagonal, and diagonal elements are 0",
            "It contains negative values",
            "The sum of all entries equals |E|"
          ],
          "correct_option": 1,
          "explanation": "Since an undirected edge connects u to v and v to u, matrix[u][v] == matrix[v][u], making it symmetric. With no self-loops, all diagonal entries matrix[i][i] are 0."
        },
        {
          "id": "ds-graph-3",
          "question": "What is the space complexity of representing a graph with V vertices and E edges using an Adjacency List?",
          "options": [
            "O(V + E)",
            "O(V^2)",
            "O(E^2)",
            "O(V * E)"
          ],
          "correct_option": 0,
          "explanation": "An adjacency list stores an array or list of size V, and each edge appears once (for directed) or twice (for undirected), yielding total space O(V + E)."
        }
      ],
      "prerequisites": [
        "Arrays and linked lists",
        "Graph theory basics: vertices, edges, and degrees"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Graph Representations, BFS, and DFS",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Graph and its Representations",
          "url": "https://www.geeksforgeeks.org/graph-and-its-representations/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Graph Representations and Adjacency List Traps",
          "url": "https://www.interviewbit.com/graph-data-structure-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-disjoint-set-union",
      "slug": "disjoint-set-union-dsu",
      "title": "Disjoint Set Union (DSU)",
      "description": "Union-Find data structure, path compression, union by rank/size, and inverse Ackermann complexity alpha(n).",
      "estimatedMinutes": 16,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Uber"
      ],
      "keyTakeaways": [
        "DSU maintains disjoint dynamic sets; operations: find(x) and union(x, y).",
        "Path compression flattens the tree during find, connecting nodes directly to root.",
        "Union by rank/size attaches shallower trees under deeper trees to minimize height.",
        "Combined optimizations achieve nearly O(1) amortized time per operation: O(alpha(n))."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Disjoint+Set+Union+DSU+Union+Find+Path+Compression+Data+Structures+lecture+tutorial",
      "notesMarkdown": "# Disjoint Set Union (DSU / Union-Find)\n\nDisjoint Set Union manages a collection of disjoint dynamic sets over a partition of elements, supporting two principal operations:\n- `find(x)`: Returns the canonical representative of the set containing element $x$.\n- `union(x, y)`: Merges the set containing $x$ with the set containing $y$.\n\n---\n\n## 1. Dual Heuristic Optimizations\nWithout heuristics, a naive chain of unions creates a skewed tree of height $O(N)$, causing both operations to degrade to $O(N)$. Two dual optimizations prevent this:\n\n### Optimization A: Path Compression (`find`)\nWhen searching for the root of node $x$, recursively re-point every visited ancestor directly to the canonical root. This flattens the tree dynamically:\n```cpp\nint find(int i) {\n    if (parent[i] == i) return i;\n    return parent[i] = find(parent[i]); // Path compression\n}\n```\n\n### Optimization B: Union by Rank or Size (`union`)\n- **Union by Rank:** Rank approximates tree depth. Always attach the root with lower rank under the root with higher rank. Only increment rank when merging two roots of identical rank:\n```cpp\nvoid unionByRank(int u, int v) {\n    int rootU = find(u);\n    int rootV = find(v);\n    if (rootU == rootV) return; // Already in same set\n\n    if (rank[rootU] < rank[rootV]) {\n        parent[rootU] = rootV;\n    } else if (rank[rootV] < rank[rootU]) {\n        parent[rootV] = rootU;\n    } else {\n        parent[rootV] = rootU;\n        rank[rootU]++;\n    }\n}\n```\n- **Union by Size:** Always attach the tree with fewer nodes under the root of the tree with more nodes (`size[rootU] += size[rootV]`).\n\n---\n\n## 2. Amortized Time Complexity & Inverse Ackermann\n- When **both** Path Compression and Union by Rank/Size are applied, any sequence of $M$ operations on $N$ elements runs in:\n  $$\\mathcal{O}(M \\cdot \\alpha(N))$$\n  where $\\alpha(N)$ is the strictly non-decreasing **Inverse Ackermann function**.\n- Since Ackermann function $A(4, 4)$ exceeds $10^{80}$ (the estimated count of atoms in the observable universe), $\\alpha(N) \\le 4$ for all conceivable engineering inputs. The amortized time per operation is practically $\\mathcal{O}(1)$.\n\n---\n\n## 3. High-Frequency Technical Applications\n1. **Cycle Detection in Undirected Graphs:** For each edge $(u, v)$, if `find(u) == find(v)`, adding the edge introduces a cycle. Otherwise, execute `union(u, v)`.\n2. **Kruskal's Minimum Spanning Tree (MST):** Sort all $E$ edges by weight. Greedily add edge $(u, v)$ to the spanning tree if `find(u) != find(v)`, terminating once $V - 1$ edges are accepted in $O(E \\log E)$ total time.\n3. **Dynamic Connectivity & Percolation:** Tracking online connectivity as edges are added in real-time.\n",
      "questions": [
        {
          "id": "ds-dsu-1",
          "question": "What is the amortized time complexity per operation of DSU with both Path Compression and Union by Rank?",
          "options": [
            "O(log n)",
            "O(n)",
            "O(α(n)) (nearly O(1))",
            "O(n log n)"
          ],
          "correct_option": 2,
          "explanation": "The combination of path compression and union by rank guarantees that any sequence of operations runs in O(α(n)) amortized time, where α is the inverse Ackermann function."
        },
        {
          "id": "ds-dsu-2",
          "question": "Which prominent graph algorithm directly relies on DSU to detect cycles when selecting edges?",
          "options": [
            "Dijkstra's Algorithm",
            "Kruskal's MST Algorithm",
            "Prim's Algorithm",
            "Floyd-Warshall Algorithm"
          ],
          "correct_option": 1,
          "explanation": "Kruskal's algorithm sorts edges by weight and uses DSU to check whether adding an edge creates a cycle in the growing forest."
        },
        {
          "id": "ds-dsu-3",
          "question": "In Disjoint Set Union (DSU), what does Path Compression accomplish during a find(x) operation?",
          "options": [
            "It points every visited node along the search traversal directly to the representative root, flattening the tree.",
            "It performs AVL tree rotations to balance the partition tree.",
            "It removes disconnected nodes from the partition.",
            "It sorts elements inside each disjoint set."
          ],
          "correct_option": 0,
          "explanation": "Path compression recursively traverses up to the root and re-assigns the parent pointer of every traversed node directly to the root (parent[x] = find(parent[x])). This flattens tree depth so that subsequent find operations execute in nearly O(1) time."
        }
      ],
      "prerequisites": [
        "Trees and Graphs",
        "Equivalence Relations"
      ],
      "externalResources": [
        {
          "title": "Disjoint Set Union (DSU / Union-Find) — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "ds-applications-of-data-structures",
      "slug": "applications-of-data-structures",
      "title": "Applications of Data Structures",
      "description": "Real-world systems mapping: B-Trees in databases, Tries in autocompletion, LRU caches, and Huffman coding trees.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Meta",
        "Netflix",
        "Apple"
      ],
      "keyTakeaways": [
        "LRU Cache uses a Hash Map + Doubly Linked List for O(1) get and put operations.",
        "Tries (Prefix Trees) provide O(L) prefix search and dictionary autocompletion.",
        "B-Trees and B+ Trees optimize disk I/O in databases and file systems with high branching factor.",
        "Huffman Coding uses Min-Heaps to generate optimal variable-length prefix codes."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Applications+of+Data+Structures+LRU+Cache+B+Tree+Trie+Bloom+Filter+tutorial",
      "notesMarkdown": "# Real-World Applications & System Architectures of Data Structures\n\nSoftware engineering in production systems relies on matching operational requirements with specialized data structures to optimize CPU, I/O, latency, and memory footprints.\n\n---\n\n## 1. Least Recently Used (LRU) Cache\nAn LRU cache maintains fixed capacity $C$. When full, inserting a new item evicts the item that has not been accessed for the longest period. Both `get(key)` and `put(key, value)` must execute in **strictly $O(1)$ time**.\n\n```\n   [Hash Map: key -> Node*]  --------------------+ \n                                                 |\n                                                 v\n   [HEAD (Most Recent)] <-> [Node A] <-> [Node B] <-> [TAIL (Least Recent / Evict)]\n```\n\n### Dual-Structure Design:\n1. **Hash Map (`unordered_map<K, Node*>`):** Provides $O(1)$ key lookup and pointer retrieval.\n2. **Doubly Linked List:** Maintains recency order without array shifts.\n   - On Access/Update (`get`/`put` existing): Detach node from current position and move to the **Head** ($O(1)$ pointer rewiring).\n   - On Eviction (cache full): Delete node immediately before **Tail** ($O(1)$) and erase from the hash map.\n\n---\n\n## 2. Trie (Prefix Tree) & Radix Trees\nA Trie organizes string keys as a multi-way tree where each edge represents a character.\n\n- **Time Complexity:** Search, insert, and prefix matching in $O(L)$ time, where $L$ is word length (independent of the number of dictionary words $N$!).\n- **Production Applications:**\n  - Search engine query **Autocompletion & Typeahead suggestions**.\n  - **IP Router Longest Prefix Matching (LPM):** Fast forwarding table lookup in networking hardware.\n  - Spellcheckers and predictive text keyboards.\n\n---\n\n## 3. B-Trees & B+ Trees in Databases & File Systems\nWhile binary trees like AVL and Red-Black trees minimize comparisons in RAM, reading a node from mechanical disk or SSD incurs a high latency penalty (block I/O).\n\n- **Branching Factor ($M \\approx 100 - 1000$):** Sized to match disk block/page size (e.g. 4 KB - 16 KB), keeping tree height extremely shallow ($h = 3$ to $4$ levels for billions of records).\n- **Why B+ Trees over B-Trees for RDBMS (InnoDB, PostgreSQL):**\n  1. **All records reside exclusively in Leaves:** Internal nodes contain only keys/routing pointers, maximizing branching fan-out per page.\n  2. **Linked Leaf Chain:** Leaves are connected as a doubly linked list, enabling blazing-fast **range queries** (`WHERE age BETWEEN 20 AND 30`) with a single disk seek followed by sequential block scans.\n\n---\n\n## 4. Bloom Filters (Probabilistic Set Membership)\nA space-efficient probabilistic data structure that tests whether an element is a member of a set using a bit array of size $m$ and $k$ independent hash functions.\n\n- **Guarantees:**\n  - **Zero False Negatives:** If it returns `false`, the element is **definitively absent**.\n  - **Possible False Positives:** If it returns `true`, the element **probably exists** (due to bit collisions).\n- **Optimal Number of Hash Functions:** $k = \\frac{m}{n} \\ln 2 \\approx 0.693 \\frac{m}{n}$.\n- **Production Applications:**\n  - **Apache Cassandra / Google Bigtable:** Checks Bloom filter before reading SSTable files on disk to prevent expensive disk seeks for non-existent row keys.\n  - **Web Browsers (Google Chrome):** Checks malicious URL blacklists locally before sending full queries over the network.\n  - **Content Delivery Networks (CDNs):** Caches only items requested at least twice (two-hit cache policy).\n\n---\n\n## 5. Segment Trees & Fenwick Trees (Binary Indexed Trees)\n- **Problem:** Array of size $N$ undergoing dynamic point/range updates and frequent range queries (e.g., Range Minimum Query or Range Sum Query).\n- **Naive Approaches:** Array gives $O(1)$ update but $O(N)$ query; Prefix Sums give $O(1)$ query but $O(N)$ update.\n- **Segment Tree / Fenwick Tree:** Balances both operations in strictly **$O(\\log N)$ update and $O(\\log N)$ query time**.\n",
      "questions": [
        {
          "id": "ds-app-1",
          "question": "Which combination of data structures is traditionally used to implement an LRU (Least Recently Used) cache with O(1) get and put?",
          "options": [
            "Binary Search Tree and Queue",
            "Hash Map and Doubly Linked List",
            "Stack and Min-Heap",
            "Array and Trie"
          ],
          "correct_option": 1,
          "explanation": "The hash map provides O(1) key-to-node lookup, while the doubly linked list allows O(1) removal, insertion at the head, and eviction from the tail."
        },
        {
          "id": "ds-app-2",
          "question": "Why are B+ Trees preferred over Binary Search Trees for database disk indexing?",
          "options": [
            "B+ trees use less memory",
            "B+ trees have a high branching factor, keeping the tree shallow and minimizing expensive disk I/O reads",
            "Binary search trees cannot store string keys",
            "B+ trees do not require sorting"
          ],
          "correct_option": 1,
          "explanation": "Because disk access is orders of magnitude slower than RAM, B+ trees use huge fan-out (hundreds of keys per node) to maintain a shallow height (typically 3-4 levels), minimizing disk page reads."
        },
        {
          "id": "ds-app-3",
          "question": "What is a critical operational guarantee provided by a Bloom Filter in high-throughput distributed systems (such as Cassandra or Redis)?",
          "options": [
            "It guarantees zero false negatives (if it reports an element is absent, it is definitively absent), although false positives are possible.",
            "It guarantees zero false positives and zero false negatives with exact certainty.",
            "It allows arbitrary single-item deletion without needing to reconstruct the bit array.",
            "It stores the full plaintext value of keys in a compressed contiguous vector."
          ],
          "correct_option": 0,
          "explanation": "A Bloom filter tests set membership using k independent hash functions over an m-bit array. If any hashed bit is 0, the element is guaranteed not to exist (0% false negatives). If all k bits are 1, the element probably exists (false positives occur due to bit overlaps)."
        }
      ],
      "prerequisites": [
        "Core Data Structures",
        "Algorithmic Complexity"
      ],
      "externalResources": [
        {
          "title": "Real-World Applications of Data Structures — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/real-time-applications-of-data-structures/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    }
  ]
};
