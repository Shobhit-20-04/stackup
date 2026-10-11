import json
import urllib.parse

def get_yt_url(title, cat_name="Data Structures"):
    query = f"{title} {cat_name} lecture tutorial"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

topics = [
    {
        "id": "ds-complexity-basics",
        "slug": "time-and-space-complexity-basics",
        "title": "Time and Space Complexity Basics",
        "description": "Big-O, Big-Omega, Big-Theta notation, amortized analysis, auxiliary space vs input space, and recurrence relationships.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
        "keyTakeaways": [
            "Big-O represents tight asymptotic upper bound; Big-Omega represents lower bound; Big-Theta represents asymptotically tight bound.",
            "Auxiliary space measures extra memory used beyond the input size.",
            "Common complexity order: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!).",
            "Amortized analysis guarantees average cost per operation over a sequence of operations (e.g. dynamic array doubling)."
        ],
        "youtube_url": get_yt_url("Time and Space Complexity Basics Big O"),
        "notesMarkdown": """# Time and Space Complexity Basics

Asymptotic analysis evaluates algorithmic efficiency independent of machine hardware or programming languages.

---

## 1. Asymptotic Notations
- **Big-O ($O(g(n))$):** Upper bound. $f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$.
- **Big-Omega ($\\\\Omega(g(n))$):** Lower bound. $f(n) \\ge c \\cdot g(n)$ for all $n \\ge n_0$.
- **Big-Theta ($\\\\Theta(g(n))$):** Asymptotically tight bound. $c_1 g(n) \\le f(n) \\le c_2 g(n)$.

---

## 2. Complexity Hierarchy
$$O(1) < O(\\log n) < O(\\sqrt{n}) < O(n) < O(n \\log n) < O(n^2) < O(2^n) < O(n!)$$
""",
        "questions": [
            {
                "id": "ds-comp-1",
                "question": "What is the tight asymptotic time complexity of adding an element to a dynamic array (like std::vector or ArrayList) in the amortized case?",
                "options": ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
                "correct_option": 1,
                "explanation": "Although occasional resizing takes O(n) to copy elements, resizing happens infrequently (at powers of 2). Spreading this cost across all insertions yields an amortized time complexity of O(1) per operation."
            },
            {
                "id": "ds-comp-2",
                "question": "Which asymptotic notation indicates that an algorithm's running time is bounded both from above and from below?",
                "options": ["Big-O (O)", "Big-Omega (Ω)", "Big-Theta (Θ)", "Little-o (o)"],
                "correct_option": 2,
                "explanation": "Big-Theta (Θ) defines an asymptotically tight bound, sandwiching the growth rate between upper and lower constants c1*g(n) and c2*g(n)."
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
        "companyTags": ["Amazon", "Microsoft", "Flipkart", "Adobe"],
        "keyTakeaways": [
            "Contiguous memory layout provides O(1) random access by index via pointer arithmetic.",
            "Insertions and deletions at arbitrary positions take O(n) time due to element shifting.",
            "Prefix sums allow O(1) range sum queries after O(n) preprocessing.",
            "Two-pointer techniques reduce O(n^2) pair searches in sorted arrays to O(n)."
        ],
        "youtube_url": get_yt_url("Arrays and Strings Data Structures"),
        "notesMarkdown": """# Arrays and Strings in Data Structures

Arrays store elements in sequential memory addresses, enabling instant indexing.

---

## 1. Time Complexities
- Random Access: $O(1)$
- Search (Unsorted): $O(n)$ | Search (Sorted Binary Search): $O(\\log n)$
- Insertion at end: $O(1)$ amortized
- Insertion/Deletion at beginning/middle: $O(n)$ (requires shifting)

---

## 2. Core Problem-Solving Patterns
1. **Two Pointers:** Opposite ends for sorted arrays (e.g. Two Sum II, Container With Most Water).
2. **Sliding Window:** Dynamic subsegment tracking for maximum/minimum subarray problems.
3. **Prefix Sum Array:** $P[i] = P[i-1] + A[i]$; range sum from $L$ to $R$ is $P[R] - P[L-1]$.
""",
        "questions": [
            {
                "id": "ds-arr-1",
                "question": "What is the time complexity of querying the sum of elements from index L to R using a precomputed prefix sum array?",
                "options": ["O(R - L)", "O(1)", "O(log n)", "O(n)"],
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
        "companyTags": ["Amazon", "Google", "Microsoft", "Qualcomm"],
        "keyTakeaways": [
            "Non-contiguous node allocation connected via pointers; dynamic sizing without resizing overhead.",
            "Insertion and deletion at head/tail take O(1) time if pointers are maintained.",
            "Random access takes O(n) time as traversal from head is required.",
            "Floyd's Cycle-Finding Algorithm (Tortoise & Hare) detects cycles in O(n) time and O(1) space."
        ],
        "youtube_url": get_yt_url("Linked Lists Singly Doubly Circular Floyd Cycle"),
        "notesMarkdown": """# Linked Lists

Linked lists store data in discrete nodes containing data and reference pointers.

---

## 1. Linked List Types
- **Singly Linked List:** Node contains `data` and `next` pointer.
- **Doubly Linked List:** Node contains `prev`, `data`, and `next` pointers (enables bidirectional traversal, $O(1)$ deletion given node pointer).
- **Circular Linked List:** Tail node points back to the head node.

---

## 2. Floyd's Cycle Detection (Tortoise and Hare)
```c
bool hasCycle(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true; // Cycle detected
    }
    return false;
}
```
""",
        "questions": [
            {
                "id": "ds-ll-1",
                "question": "What is the auxiliary space complexity of Floyd's cycle detection algorithm (Tortoise and Hare)?",
                "options": ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
                "correct_option": 1,
                "explanation": "Floyd's algorithm uses only two pointer references (slow and fast), requiring O(1) constant auxiliary space."
            },
            {
                "id": "ds-ll-2",
                "question": "Given a pointer to a node in a Doubly Linked List, what is the time complexity to delete that node?",
                "options": ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
                "correct_option": 1,
                "explanation": "Because a doubly linked list node contains a 'prev' pointer, its predecessor's 'next' and successor's 'prev' can be updated in O(1) time without traversing from the head."
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
        "companyTags": ["Amazon", "Google", "Uber", "Flipkart"],
        "keyTakeaways": [
            "Stack follows LIFO (Last In First Out); operations: push, pop, peek in O(1) time.",
            "Queue follows FIFO (First In First Out); operations: enqueue, dequeue in O(1) time.",
            "Monotonic stacks maintain elements in sorted order; solves Next Greater Element in O(n) time.",
            "Circular queues use modulo arithmetic `(rear + 1) % capacity` to reuse empty spaces."
        ],
        "youtube_url": get_yt_url("Stacks and Queues Monotonic Stack Circular Queue"),
        "notesMarkdown": """# Stacks and Queues

---

## 1. Stack (LIFO) Applications
- Function call stack (recursion).
- Expression evaluation: Infix to Postfix conversion using Shunting-Yard algorithm.
- Balanced parentheses validation.
- Monotonic stack: Finds Next Greater / Smaller element in $O(n)$ time.

---

## 2. Queue (FIFO) Applications
- Breadth-First Search (BFS) in trees and graphs.
- Operating system CPU process scheduling (FCFS, round-robin).
- Asynchronous message buffers (producer-consumer queues).
""",
        "questions": [
            {
                "id": "ds-sq-1",
                "question": "Which data structure is primarily used for breadth-first traversal (BFS) of a graph?",
                "options": ["Stack", "Queue", "Binary Search Tree", "Priority Queue"],
                "correct_option": 1,
                "explanation": "BFS explores nodes level-by-level in first-in first-out order, which is strictly managed using a Queue."
            },
            {
                "id": "ds-sq-2",
                "question": "What is the time complexity to find the Next Greater Element for all elements of an array of size N using a Monotonic Stack?",
                "options": ["O(N^2)", "O(N log N)", "O(N)", "O(1)"],
                "correct_option": 2,
                "explanation": "Each element is pushed onto and popped from the monotonic stack at most once, resulting in linear O(N) total runtime."
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
        "companyTags": ["Google", "Amazon", "Microsoft", "Oracle"],
        "keyTakeaways": [
            "A tree with N nodes has exactly N - 1 edges.",
            "Full binary tree: Every node has 0 or 2 children.",
            "Complete binary tree: All levels are completely filled except possibly the last, filled from left to right.",
            "Maximum number of nodes at level L is 2^L (root at level 0)."
        ],
        "youtube_url": get_yt_url("Trees and Binary Trees Properties Complete Full Tree"),
        "notesMarkdown": """# Trees and Binary Trees

A tree is an acyclic, connected, hierarchical graph with a designated root node.

---

## 1. Key Binary Tree Classifications
- **Full Binary Tree:** Every node has either $0$ or $2$ children.
- **Complete Binary Tree:** All levels full except possibly the last level, filled strictly from left to right (used in Binary Heaps).
- **Perfect Binary Tree:** All internal nodes have 2 children, all leaf nodes at the same level. Total nodes = $2^{h+1} - 1$.
- **Degenerate (Skewed) Tree:** Every internal node has only one child; behaves like a linked list ($O(n)$ search).

---

## 2. Fundamental Properties
- In a non-empty binary tree, if $n$ is total nodes and $e$ is total edges: $e = n - 1$.
- In a full binary tree with $L$ leaves: Internal nodes $I = L - 1$.
""",
        "questions": [
            {
                "id": "ds-tree-1",
                "question": "What is the maximum number of nodes in a binary tree of height h (where a single root node has height 0)?",
                "options": ["2^h", "2^(h+1) - 1", "2^(h-1)", "2^h - 1"],
                "correct_option": 1,
                "explanation": "A perfect binary tree of height h has 2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1 nodes."
            },
            {
                "id": "ds-tree-2",
                "question": "In any non-empty full binary tree, if there are L leaf nodes, how many internal nodes (nodes with 2 children) are there?",
                "options": ["L + 1", "L - 1", "2L", "L / 2"],
                "correct_option": 1,
                "explanation": "For any full binary tree (where every non-leaf node has 2 children), the number of internal nodes is always exactly L - 1."
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
        "companyTags": ["Amazon", "Google", "Microsoft", "Salesforce"],
        "keyTakeaways": [
            "BST invariant: Left subtree keys < root key < right subtree keys.",
            "In-order traversal of a BST yields elements in strictly sorted ascending order.",
            "Average search, insertion, and deletion time is O(log n); worst-case is O(n) for skewed trees.",
            "Deleting a node with two children requires replacing with its in-order predecessor or successor."
        ],
        "youtube_url": get_yt_url("Binary Search Tree BST Insertion Deletion Search"),
        "notesMarkdown": """# Binary Search Trees (BST)

---

## 1. The BST Invariant
For any node $X$:
- All nodes in $X$'s left subtree have keys $< X.key$.
- All nodes in $X$'s right subtree have keys $> X.key$.

---

## 2. Node Deletion Cases
1. **Node is a leaf:** Remove node directly.
2. **Node has one child:** Replace node with its single child.
3. **Node has two children:**
   - Find in-order successor (minimum node in right subtree) OR in-order predecessor (maximum in left subtree).
   - Copy its key to the target node, then delete that successor/predecessor leaf.
""",
        "questions": [
            {
                "id": "ds-bst-1",
                "question": "Which tree traversal of a Binary Search Tree produces elements in sorted ascending order?",
                "options": ["Pre-order", "In-order", "Post-order", "Level-order"],
                "correct_option": 1,
                "explanation": "In-order traversal visits (Left, Root, Right). Since Left < Root < Right in a BST, in-order traversal always outputs keys in sorted ascending order."
            },
            {
                "id": "ds-bst-2",
                "question": "What is the worst-case time complexity of searching an element in an unbalanced Binary Search Tree of N nodes?",
                "options": ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
                "correct_option": 2,
                "explanation": "If elements are inserted in already sorted order, the BST degrades into a linear skewed tree (linked list) where height is N, leading to O(N) search."
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
        "companyTags": ["Amazon", "Microsoft", "Meta", "Bloomberg"],
        "keyTakeaways": [
            "In-order: Left -> Root -> Right. Pre-order: Root -> Left -> Right. Post-order: Left -> Right -> Root.",
            "Level-order traversal uses a Queue to process nodes level by level.",
            "A binary tree can be uniquely reconstructed from (In-order + Pre-order) or (In-order + Post-order).",
            "Pre-order + Post-order alone CANNOT uniquely reconstruct a general binary tree."
        ],
        "youtube_url": get_yt_url("Tree Traversals Preorder Inorder Postorder Level Order"),
        "notesMarkdown": """# Tree Traversals

Traversals visit every node in a tree systematically.

---

## 1. Depth-First Search (DFS) Traversals
- **Pre-Order (Root, Left, Right):** Used for copying trees and prefix expression parsing.
- **In-Order (Left, Root, Right):** Produces sorted output for BSTs.
- **Post-Order (Left, Right, Root):** Used for deleting trees, post-fix expression evaluation, calculating directory disk usage.

---

## 2. Tree Reconstruction Rules
- Can uniquely build binary tree:
  - `In-order` + `Pre-order`
  - `In-order` + `Post-order`
  - `In-order` + `Level-order`
- **Cannot** uniquely construct general binary trees without In-order traversal.
""",
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
                "options": ["Pre-order", "In-order", "Post-order", "Level-order"],
                "correct_option": 2,
                "explanation": "Post-order traversal visits Left, Right, and then Root, guaranteeing that both child subtrees are evaluated before their parent."
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
        "companyTags": ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
        "keyTakeaways": [
            "AVL balance factor = height(left subtree) - height(right subtree) in {-1, 0, +1}.",
            "Rotations restore balance in O(1) time: Single rotations (LL, RR) and Double rotations (LR, RL).",
            "Guarantees strictly O(log n) worst-case time for search, insertion, and deletion.",
            "Red-Black trees use color rules with slightly looser height constraints, requiring fewer rotations on insert/delete."
        ],
        "youtube_url": get_yt_url("AVL Trees Rotations LL RR LR RL Red Black Tree"),
        "notesMarkdown": """# AVL Trees and Balanced Trees

AVL trees are height-balanced binary search trees.

---

## 1. Balance Factor (BF)
$$BF(node) = \\text{Height}(Left) - \\text{Height}(Right)$$
For every node in an AVL tree: $BF \\in \\{-1, 0, +1\\}$.

---

## 2. The 4 Rotation Types
1. **LL Imbalance (Left-heavy, inserted in left of left child):** Single Right Rotation on unbalance node.
2. **RR Imbalance (Right-heavy, inserted in right of right child):** Single Left Rotation.
3. **LR Imbalance:** Left rotation on left child, then Right rotation on unbalanced node.
4. **RL Imbalance:** Right rotation on right child, then Left rotation on unbalanced node.
""",
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
        "companyTags": ["Amazon", "Google", "Uber", "Microsoft"],
        "keyTakeaways": [
            "Complete binary tree represented compactly in array: parent at i, children at 2i + 1 and 2i + 2.",
            "Max-Heap property: Parent key >= Children keys. Min-Heap property: Parent key <= Children keys.",
            "Building a heap from an unordered array takes O(n) time using bottom-up heapify.",
            "Extracting min/max root takes O(log n) time; peek takes O(1) time."
        ],
        "youtube_url": get_yt_url("Heaps and Priority Queues Min Heap Max Heap Heapify"),
        "notesMarkdown": """# Heaps and Priority Queues

A binary heap is a complete binary tree stored inside a contiguous array.

---

## 1. Array Index Mapping (0-Indexed)
For element at index $i$:
- **Parent:** $\\lfloor (i - 1) / 2 \\rfloor$
- **Left Child:** $2i + 1$
- **Right Child:** $2i + 2$

---

## 2. Operations & Complexities
- `peek()`: $O(1)$
- `insert()`: $O(\\log n)$ (add at end, bubble up)
- `extractMax() / extractMin()`: $O(\\log n)$ (swap root with last element, bubble down)
- `buildHeap()` (Heapify): **$O(n)$** time (not $O(n \\log n)$!).
""",
        "questions": [
            {
                "id": "ds-hp-1",
                "question": "What is the time complexity of building a Binary Heap from an arbitrary array of N elements using bottom-up heapify?",
                "options": ["O(N log N)", "O(N)", "O(log N)", "O(N^2)"],
                "correct_option": 1,
                "explanation": "Building a heap bottom-up sums the series sum(h / 2^h) for heights h=0 to log N, which mathematically converges to linear O(N) time."
            },
            {
                "id": "ds-hp-2",
                "question": "In a 0-indexed array representation of a binary heap, where is the parent of the node at index 7 located?",
                "options": ["Index 3", "Index 2", "Index 4", "Index 1"],
                "correct_option": 0,
                "explanation": "Parent index = (i - 1) / 2. For index 7: (7 - 1) / 2 = 6 / 2 = 3."
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
        "companyTags": ["Amazon", "Google", "Meta", "Directi"],
        "keyTakeaways": [
            "Hash function maps keys to buckets; goal is uniform distribution and O(1) average lookup.",
            "Separate Chaining resolves collisions using linked lists or balanced trees at each bucket.",
            "Open Addressing stores all entries in table: Linear probing, Quadratic probing, Double hashing.",
            "Load factor alpha = n / m; rehashing occurs when alpha exceeds threshold (typically 0.75)."
        ],
        "youtube_url": get_yt_url("Hashing Hash Tables Collision Resolution Chaining Probing"),
        "notesMarkdown": """# Hashing and Hash Tables

Hash tables implement associative arrays, providing $O(1)$ average time complexity for insertions, deletions, and lookups.

---

## 1. Collision Resolution Strategies
1. **Separate Chaining:**
   - Each bucket holds a linked list of collided keys.
   - Worst case: $O(n)$ if all keys hash to the same bucket.
2. **Open Addressing:**
   - **Linear Probing:** $h(k, i) = (h'(k) + i) \\pmod m$. Prone to primary clustering.
   - **Quadratic Probing:** $h(k, i) = (h'(k) + c_1 i + c_2 i^2) \\pmod m$. Prone to secondary clustering.
   - **Double Hashing:** $h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\pmod m$. Eliminates clustering.
""",
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
                "options": ["1.33", "0.75", "7500", "25"],
                "correct_option": 1,
                "explanation": "Load factor alpha = (Number of stored elements n) / (Number of buckets m) = 75 / 100 = 0.75."
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
        "companyTags": ["Amazon", "Microsoft", "Uber", "LinkedIn"],
        "keyTakeaways": [
            "Adjacency Matrix uses O(V^2) space; edge lookup (u, v) in O(1); ideal for dense graphs.",
            "Adjacency List uses O(V + E) space; finding neighbors in O(degree); ideal for sparse graphs.",
            "Sparse graph: |E| << |V|^2. Dense graph: |E| ≈ |V|^2.",
            "Directed graphs have asymmetric adjacency matrices; undirected graphs are symmetric along main diagonal."
        ],
        "youtube_url": get_yt_url("Graph Representations Adjacency Matrix List"),
        "notesMarkdown": """# Graph Representations

Graphs consist of vertices $V$ and edges $E$.

---

## 1. Comparison of Graph Representations

| Metric | Adjacency Matrix | Adjacency List |
| :--- | :--- | :--- |
| **Space Complexity** | $O(V^2)$ | $O(V + E)$ |
| **Edge Existence Query `(u, v)`** | $O(1)$ | $O(\\text{deg}(u))$ |
| **Iterate all neighbors of `u`** | $O(V)$ | $O(\\text{deg}(u))$ |
| **Add Vertex** | $O(V^2)$ (resize matrix) | $O(1)$ |
| **Add Edge** | $O(1)$ | $O(1)$ |
| **Best suited for** | Dense graphs ($E \\approx V^2$) | Sparse graphs ($E \\ll V^2$) |
""",
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
        "companyTags": ["Google", "Amazon", "Microsoft", "Uber"],
        "keyTakeaways": [
            "DSU maintains disjoint dynamic sets; operations: find(x) and union(x, y).",
            "Path compression flattens the tree during find, connecting nodes directly to root.",
            "Union by rank/size attaches shallower trees under deeper trees to minimize height.",
            "Combined optimizations achieve nearly O(1) amortized time per operation: O(alpha(n))."
        ],
        "youtube_url": get_yt_url("Disjoint Set Union DSU Union Find Path Compression"),
        "notesMarkdown": """# Disjoint Set Union (DSU / Union-Find)

DSU tracks partitioned sets and answers connectivity queries efficiently.

---

## 1. Core Optimizations
1. **Path Compression in `find(x)`:**
   ```c
   int find(int i) {
       if (parent[i] == i) return i;
       return parent[i] = find(parent[i]); // Flattens tree!
   }
   ```
2. **Union by Rank / Size:**
   Attach the root of the smaller tree under the root of the larger tree.

---

## 2. Time Complexity
With path compression and union by rank, any sequence of $m$ operations on $n$ elements runs in:
$$O(m \\cdot \\alpha(n))$$
where $\\alpha$ is the Inverse Ackermann function (effectively $\\le 4$ for all practical universe sizes).
""",
        "questions": [
            {
                "id": "ds-dsu-1",
                "question": "What is the amortized time complexity per operation of DSU with both Path Compression and Union by Rank?",
                "options": ["O(log n)", "O(n)", "O(α(n)) (nearly O(1))", "O(n log n)"],
                "correct_option": 2,
                "explanation": "The combination of path compression and union by rank guarantees that any sequence of operations runs in O(α(n)) amortized time, where α is the inverse Ackermann function."
            },
            {
                "id": "ds-dsu-2",
                "question": "Which prominent graph algorithm directly relies on DSU to detect cycles when selecting edges?",
                "options": ["Dijkstra's Algorithm", "Kruskal's MST Algorithm", "Prim's Algorithm", "Floyd-Warshall Algorithm"],
                "correct_option": 1,
                "explanation": "Kruskal's algorithm sorts edges by weight and uses DSU to check whether adding an edge creates a cycle in the growing forest."
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
        "companyTags": ["Amazon", "Google", "Meta", "Netflix", "Apple"],
        "keyTakeaways": [
            "LRU Cache uses a Hash Map + Doubly Linked List for O(1) get and put operations.",
            "Tries (Prefix Trees) provide O(L) prefix search and dictionary autocompletion.",
            "B-Trees and B+ Trees optimize disk I/O in databases and file systems with high branching factor.",
            "Huffman Coding uses Min-Heaps to generate optimal variable-length prefix codes."
        ],
        "youtube_url": get_yt_url("Applications of Data Structures LRU Cache Trie B Tree"),
        "notesMarkdown": """# Applications of Data Structures

Engineering systems leverage specialized data structures for optimal trade-offs.

---

## 1. Landmark System Pairings
- **LRU Cache:** Hash Map (for $O(1)$ key lookup) + Doubly Linked List (for $O(1)$ recency promotion and eviction).
- **Trie (Prefix Tree):** Search engine autocompletion, IP router longest prefix matching.
- **B / B+ Trees:** Relational databases (MySQL InnoDB, PostgreSQL) and OS file systems (ext4, NTFS) to minimize disk seeks.
- **Bloom Filters:** Probabilistic set membership (Bit array + multiple hash functions) with zero false negatives (used in Cassandra, Redis).
""",
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
            }
        ]
    }
]

file_content = f"""import type {{ SectionCategory }} from './types';

export const DATA_STRUCTURES_CATEGORY: SectionCategory = {{
  id: "data-structures",
  slug: "data-structures",
  title: "Data Structures",
  description: "Linear and hierarchical data structures, trees, heaps, hash tables, and systems applications.",
  icon: "Layers",
  topics: {json.dumps(topics, indent=2)}
}};
"""

with open('./src/lib/data/curriculum/data-structures.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"Generated Data Structures module with {len(topics)} topics successfully!")
