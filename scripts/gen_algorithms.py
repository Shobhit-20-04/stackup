import json
import urllib.parse

def get_yt_url(title, cat_name="Algorithms"):
    query = f"{title} {cat_name} lecture tutorial"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

topics = [
    {
        "id": "algo-asymptotic-analysis",
        "slug": "asymptotic-analysis-o-omega-theta",
        "title": "Asymptotic Analysis: O, Ω, Θ",
        "description": "Mathematical definitions of Big-O, Big-Omega, Big-Theta, Little-o, Little-Omega, and limit tests for growth rate.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["Google", "Microsoft", "Amazon", "Goldman Sachs"],
        "keyTakeaways": [
            "Big-O (O): Upper bound (f(n) <= c * g(n)).",
            "Big-Omega (Ω): Lower bound (f(n) >= c * g(n)).",
            "Big-Theta (Θ): Asymptotically tight bound (c1 * g(n) <= f(n) <= c2 * g(n)).",
            "Limit test: lim(n->inf) f(n)/g(n) = c > 0 implies f(n) = Θ(g(n)). If 0, f(n) = o(g(n)). If inf, f(n) = ω(g(n))."
        ],
        "youtube_url": get_yt_url("Asymptotic Analysis Big O Big Omega Big Theta Algorithms"),
        "notesMarkdown": """# Asymptotic Analysis: O, Ω, Θ

---

## 1. Formal Mathematical Definitions
- **$O(g(n))$:** $\\exists c > 0, n_0 > 0$ such that $0 \\le f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$.
- **$\\\\Omega(g(n))$:** $\\exists c > 0, n_0 > 0$ such that $0 \\le c \\cdot g(n) \\le f(n)$ for all $n \\ge n_0$.
- **$\\\\Theta(g(n))$:** $\\exists c_1, c_2 > 0, n_0 > 0$ such that $c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n)$ for all $n \\ge n_0$.

---

## 2. Little-o and Little-Omega
- $f(n) = o(g(n))$ if $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0$ (strict upper bound).
- $f(n) = \\omega(g(n))$ if $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty$ (strict lower bound).
""",
        "questions": [
            {
                "id": "algo-asymp-1",
                "question": "If lim (n -> inf) [f(n) / g(n)] = 0, which relationship holds strictly?",
                "options": ["f(n) = Θ(g(n))", "f(n) = o(g(n))", "f(n) = ω(g(n))", "f(n) = Ω(g(n))"],
                "correct_option": 1,
                "explanation": "When the ratio f(n)/g(n) approaches 0 as n approaches infinity, f(n) grows strictly slower than g(n), which is the definition of little-o: f(n) = o(g(n))."
            },
            {
                "id": "algo-asymp-2",
                "question": "Is 2^(n + 1) = O(2^n)?",
                "options": [
                    "Yes, because 2^(n + 1) = 2 * 2^n, which is bounded by constant c = 2",
                    "No, because the exponent is larger",
                    "Only when n is negative",
                    "It is Θ(n * 2^n)"
                ],
                "correct_option": 0,
                "explanation": "2^(n + 1) = 2 * (2^n). Choosing constant c = 2 satisfies the condition 2^(n+1) <= c * 2^n for all n >= 1. Hence, 2^(n+1) is indeed O(2^n)."
            }
        ]
    },
    {
        "id": "algo-case-analysis",
        "slug": "best-average-and-worst-case-analysis",
        "title": "Best, Average, and Worst-Case Analysis",
        "description": "Input distributions, worst-case guarantees, average-case expected values, and best-case scenarios.",
        "estimatedMinutes": 15,
        "difficulty": "Easy",
        "companyTags": ["Amazon", "TCS Digital", "Infosys", "Cognizant"],
        "keyTakeaways": [
            "Worst-case: Maximum time across any input of size n (guarantees upper bound on execution).",
            "Average-case: Expected time over all inputs assuming a probability distribution.",
            "Best-case: Minimum time on the most favorable input.",
            "QuickSort: Best/Average = O(n log n); Worst = O(n^2) when pivot is always extreme element."
        ],
        "youtube_url": get_yt_url("Best Average Worst Case Analysis Algorithms"),
        "notesMarkdown": """# Best, Average, and Worst-Case Analysis

---

## 1. Landmark Comparisons
| Algorithm | Best Case | Average Case | Worst Case |
| :--- | :--- | :--- | :--- |
| **Linear Search** | $O(1)$ | $O(n)$ | $O(n)$ |
| **Binary Search** | $O(1)$ | $O(\\log n)$ | $O(\\log n)$ |
| **Insertion Sort** | $O(n)$ (already sorted) | $O(n^2)$ | $O(n^2)$ |
| **QuickSort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ (sorted/reverse sorted without random pivot) |
| **MergeSort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ |
""",
        "questions": [
            {
                "id": "algo-case-1",
                "question": "What is the best-case time complexity of Insertion Sort on an array that is already fully sorted in ascending order?",
                "options": ["O(1)", "O(n)", "O(n log n)", "O(n^2)"],
                "correct_option": 1,
                "explanation": "When the array is already sorted, Insertion Sort makes only 1 comparison per element and 0 swaps, completing in linear O(n) time."
            },
            {
                "id": "algo-case-2",
                "question": "Why is worst-case analysis usually prioritized over average-case analysis in real-time systems?",
                "options": [
                    "Worst-case is easier to compute",
                    "Worst-case provides a guaranteed upper bound on execution time regardless of input distribution",
                    "Average-case is always identical to best-case",
                    "Computers run slower on average"
                ],
                "correct_option": 1,
                "explanation": "In mission-critical and real-time systems, the system must guarantee completion within a deadline under all circumstances, which only worst-case analysis guarantees."
            }
        ]
    },
    {
        "id": "algo-recurrence-relations",
        "slug": "recurrence-relations",
        "title": "Recurrence Relations",
        "description": "Solving divide-and-conquer recurrences: Master Theorem (all 3 cases), recursion trees, and substitution method.",
        "estimatedMinutes": 18,
        "difficulty": "Medium",
        "companyTags": ["Google", "Amazon", "Microsoft", "Directi"],
        "keyTakeaways": [
            "Master Theorem form: T(n) = a*T(n/b) + f(n), where a >= 1, b > 1.",
            "Critical exponent: log_b(a). Compare f(n) with n^(log_b(a)).",
            "Case 1 (Tree-heavy): f(n) = O(n^(log_b(a) - eps)) -> T(n) = Θ(n^(log_b(a))).",
            "Case 2 (Balanced): f(n) = Θ(n^(log_b(a)) * log^k(n)) -> T(n) = Θ(n^(log_b(a)) * log^(k+1)(n)).",
            "Case 3 (Root-heavy): f(n) = Ω(n^(log_b(a) + eps)) and regularity holds -> T(n) = Θ(f(n))."
        ],
        "youtube_url": get_yt_url("Master Theorem Recurrence Relations Algorithms"),
        "notesMarkdown": """# Recurrence Relations

---

## 1. Master Theorem Framework
For recurrences of the form:
$$T(n) = a T(n/b) + f(n)$$
where $a \\ge 1$, $b > 1$, compare $f(n)$ with $n^{\\log_b a}$:

1. **Case 1:** If $f(n) = O(n^{\\log_b a - \\epsilon})$ for $\\epsilon > 0$:
   $$T(n) = \\Theta(n^{\\log_b a})$$
2. **Case 2:** If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$ for $k \\ge 0$:
   $$T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$$
3. **Case 3:** If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ for $\\epsilon > 0$ and $a f(n/b) \\le c f(n)$ for $c < 1$:
   $$T(n) = \\Theta(f(n))$$
""",
        "questions": [
            {
                "id": "algo-rec-1",
                "question": "What is the solution to the recurrence T(n) = 2T(n/2) + O(n)?",
                "options": ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
                "correct_option": 1,
                "explanation": "Here a = 2, b = 2, so n^(log_b a) = n^(log_2 2) = n^1. Since f(n) = Θ(n), this falls into Master Theorem Case 2 with k = 0, giving T(n) = Θ(n log n)."
            },
            {
                "id": "algo-rec-2",
                "question": "What is the solution to the recurrence T(n) = 8T(n/2) + n^2?",
                "options": ["O(n^2)", "O(n^3)", "O(n^2 log n)", "O(n log n)"],
                "correct_option": 1,
                "explanation": "Here a = 8, b = 2. n^(log_2 8) = n^3. Since f(n) = n^2 = O(n^(3 - 1)), this is Master Theorem Case 1, so T(n) = Θ(n^3)."
            }
        ]
    },
    {
        "id": "algo-searching-algorithms",
        "slug": "searching-algorithms",
        "title": "Searching Algorithms",
        "description": "Linear search, binary search on sorted arrays and answer spaces, ternary search, and exponential search.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["Amazon", "Google", "Microsoft", "Meta"],
        "keyTakeaways": [
            "Linear search: O(n) time, works on arbitrary unsorted collections.",
            "Binary search: O(log n) time, requires monotonic search space.",
            "Midpoint calculation: `mid = left + (right - left) / 2` avoids integer overflow.",
            "Binary search on answer: Optimizes monotonic predicate functions (e.g. Book Allocation, Aggressive Cows)."
        ],
        "youtube_url": get_yt_url("Binary Search Algorithm Lower Bound Upper Bound"),
        "notesMarkdown": """# Searching Algorithms

---

## 1. Binary Search Invariant
```c
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents (left + right) integer overflow!
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

---

## 2. Binary Search on Answer
Whenever a problem can be framed as a boolean test $f(x)$ that transitions monotonically from `False -> True` (or `True -> False`), binary search finds the transition boundary in $O(\\text{Cost}(f) \\cdot \\log(\\text{Range}))$.
""",
        "questions": [
            {
                "id": "algo-srch-1",
                "question": "Why is 'mid = left + (right - left) / 2' preferred over 'mid = (left + right) / 2' in production code?",
                "options": [
                    "It executes in fewer CPU cycles",
                    "It avoids signed 32-bit integer overflow when left + right exceeds 2^31 - 1",
                    "It handles floating-point numbers",
                    "It works for unsorted arrays"
                ],
                "correct_option": 1,
                "explanation": "When left and right are large positive integers (e.g. > 1 billion), their sum can exceed 2,147,483,647 and overflow into negative numbers. Using left + (right - left) / 2 prevents overflow."
            },
            {
                "id": "algo-srch-2",
                "question": "What is the maximum number of comparisons needed to search a sorted array of 1,024 elements using Binary Search?",
                "options": ["10", "11", "1,024", "512"],
                "correct_option": 1,
                "explanation": "In the worst case, binary search takes floor(log_2(N)) + 1 comparisons. For N = 1024, log_2(1024) = 10, so at most 11 comparisons (or 10 iterations) are needed."
            }
        ]
    },
    {
        "id": "algo-sorting-algorithms",
        "slug": "sorting-algorithms",
        "title": "Sorting Algorithms",
        "description": "Comparison sorts (Bubble, Selection, Insertion, Merge, Quick, Heap) and non-comparison sorts (Counting, Radix, Bucket).",
        "estimatedMinutes": 18,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Google", "Microsoft", "Apple", "Uber"],
        "keyTakeaways": [
            "Comparison sort lower bound: Any comparison-based sorting algorithm requires Ω(n log n) comparisons in the worst case.",
            "Stability: Preserves original relative order of duplicate elements (MergeSort, InsertionSort are stable; QuickSort, HeapSort are unstable).",
            "In-place sorts use O(1) auxiliary space (HeapSort, QuickSort, InsertionSort).",
            "Linear-time non-comparison sorts: Counting Sort O(n + k), Radix Sort O(d * (n + k))."
        ],
        "youtube_url": get_yt_url("Sorting Algorithms MergeSort QuickSort HeapSort Stable"),
        "notesMarkdown": """# Sorting Algorithms

---

## 1. Master Complexity Matrix

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | In-Place? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes |
| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No | Yes |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes |
| **Merge Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(n)$ | **Yes** | No |
| **Quick Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ | $O(\\log n)$ | No | **Yes** |
| **Heap Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(1)$ | No | **Yes** |
| **Counting Sort**| $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | $O(k)$ | **Yes** | No |

---

## 2. Comparison Sort Lower Bound Theorem
By decision-tree modeling, any comparison-based sort has $n!$ possible permutations as leaves. Height $h \\ge \\log_2(n!) = \\Omega(n \\log n)$.
""",
        "questions": [
            {
                "id": "algo-sort-1",
                "question": "Which of the following sorting algorithms is guaranteed to run in O(n log n) worst-case time AND operates in-place with O(1) auxiliary space?",
                "options": ["Merge Sort", "Heap Sort", "Quick Sort", "Counting Sort"],
                "correct_option": 1,
                "explanation": "Heap Sort runs in O(n log n) worst-case time and operates directly within the input array using only O(1) auxiliary memory. (Merge Sort takes O(n) space; Quick Sort has an O(n^2) worst case)."
            },
            {
                "id": "algo-sort-2",
                "question": "What is the theoretical lower bound on the number of comparisons for ANY comparison-based sorting algorithm on N elements?",
                "options": ["Ω(N)", "Ω(N log N)", "Ω(N^2)", "Ω(2^N)"],
                "correct_option": 1,
                "explanation": "A decision tree sorting N distinct elements must have at least N! leaves. A binary tree with N! leaves has height >= ceil(log2(N!)) = Ω(N log N)."
            }
        ]
    },
    {
        "id": "algo-divide-and-conquer",
        "slug": "divide-and-conquer",
        "title": "Divide and Conquer",
        "description": "Paradigm: Divide subproblems, conquer recursively, combine solutions. Strassen's matrix multiplication, Karatsuba, and closest pair of points.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
        "keyTakeaways": [
            "3 phases: Divide into subproblems, Conquer via recursion, Combine subproblem results.",
            "Karatsuba multiplication multiplies two n-digit numbers in O(n^1.585) vs standard O(n^2).",
            "Strassen's algorithm multiplies two nxn matrices in O(n^2.807) vs naive O(n^3) using 7 recursive multiplications.",
            "Closest pair of points in 2D plane solved in O(n log n) using divide-and-conquer."
        ],
        "youtube_url": get_yt_url("Divide and Conquer Algorithms Strassen Karatsuba"),
        "notesMarkdown": """# Divide and Conquer

Divide and Conquer partitions a problem into non-overlapping subproblems of identical type.

---

## 1. Landmark Algorithms
1. **Merge Sort:** Divides array into two halves ($2T(n/2)$), merges in $O(n)$ -> $O(n \\log n)$.
2. **Karatsuba Algorithm:** Reduces multiplication of two $n$-bit integers to 3 sub-multiplications:
   $$T(n) = 3T(n/2) + O(n) \\implies O(n^{\\log_2 3}) \\approx O(n^{1.585})$$
3. **Strassen's Matrix Multiplication:** Replaces 8 standard block multiplications with 7:
   $$T(n) = 7T(n/2) + O(n^2) \\implies O(n^{\\log_2 7}) \\approx O(n^{2.807})$$
""",
        "questions": [
            {
                "id": "algo-dc-1",
                "question": "How many recursive multiplications does Strassen's algorithm use to multiply two 2x2 block matrices?",
                "options": ["8", "7", "4", "6"],
                "correct_option": 1,
                "explanation": "Standard matrix multiplication performs 8 block multiplications. Strassen's breakthrough reduces this to 7 multiplications, yielding O(n^(log2 7)) ≈ O(n^2.807) complexity."
            },
            {
                "id": "algo-dc-2",
                "question": "What is the key difference between Divide and Conquer and Dynamic Programming?",
                "options": [
                    "Divide and conquer works on overlapping subproblems; DP works on independent subproblems",
                    "Divide and conquer solves non-overlapping independent subproblems; DP solves overlapping subproblems by memoizing sub-solutions",
                    "DP is strictly iterative; divide and conquer cannot use recursion",
                    "Divide and conquer always uses greedy choices"
                ],
                "correct_option": 1,
                "explanation": "Divide and conquer partitions problems into independent, disjoint subproblems. Dynamic Programming is designed for problems with overlapping subproblems, caching results to avoid redundant recomputations."
            }
        ]
    },
    {
        "id": "algo-greedy-algorithms",
        "slug": "greedy-algorithms",
        "title": "Greedy Algorithms",
        "description": "Greedy-choice property, optimal substructure, Fractional Knapsack, Activity Selection, Huffman Coding, and Job Sequencing.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Microsoft", "Uber", "Flipkart"],
        "keyTakeaways": [
            "Greedy strategy makes locally optimal choice at each step hoping for global optimum.",
            "Requires two key properties: Greedy Choice Property and Optimal Substructure.",
            "Fractional Knapsack is solved greedily by sorting by value/weight ratio; 0/1 Knapsack CANNOT be solved greedily.",
            "Huffman coding builds optimal prefix-free codes in O(n log n) using a Min-Heap."
        ],
        "youtube_url": get_yt_url("Greedy Algorithms Fractional Knapsack Activity Selection Huffman"),
        "notesMarkdown": """# Greedy Algorithms

A greedy algorithm makes the choice that looks best at the moment without backtracking.

---

## 1. Classic Greedy Problems
1. **Activity Selection:** Sort by finish time; pick next activity whose start time $\\ge$ previous finish time.
2. **Fractional Knapsack:** Sort items by $\\text{Value} / \\text{Weight}$ ratio in descending order. Take greedily. Runs in $O(n \\log n)$.
3. **Huffman Coding:** Repeatedly extract the two minimum frequency nodes from a Min-Heap, create parent node with sum frequency, reinsert into heap.
4. **Job Sequencing with Deadlines:** Sort jobs by decreasing profit; schedule in latest available slot before deadline.
""",
        "questions": [
            {
                "id": "algo-gr-1",
                "question": "Why does the Greedy choice strategy fail to guarantee an optimal solution for the 0/1 Knapsack problem?",
                "options": [
                    "Weights can be fractional",
                    "Items cannot be divided, so taking the highest value/weight item may leave empty capacity that cannot be filled optimally",
                    "0/1 Knapsack does not have optimal substructure",
                    "It runs in exponential time"
                ],
                "correct_option": 1,
                "explanation": "In 0/1 Knapsack, you either take an entire item or leave it. Choosing greedily by value/weight ratio can leave wasted unused capacity, whereas Dynamic Programming evaluates combinations to maximize total value."
            },
            {
                "id": "algo-gr-2",
                "question": "In the Activity Selection Problem, what sorting criterion guarantees an optimal maximum subset of mutually compatible activities?",
                "options": [
                    "Increasing start time",
                    "Decreasing duration",
                    "Increasing finish time",
                    "Decreasing start time"
                ],
                "correct_option": 2,
                "explanation": "Sorting activities by increasing finish time leaves the maximum remaining time available for subsequent activities, which guarantees an optimal greedy schedule."
            }
        ]
    },
    {
        "id": "algo-dynamic-programming",
        "slug": "dynamic-programming",
        "title": "Dynamic Programming",
        "description": "Memoization (top-down) vs Tabulation (bottom-up), overlapping subproblems, 0/1 Knapsack, LCS, LIS, and Matrix Chain Multiplication.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Google", "Amazon", "Meta", "Microsoft", "Uber"],
        "keyTakeaways": [
            "Requires two properties: Optimal Substructure and Overlapping Subproblems.",
            "Top-Down (Memoization): Recursive approach augmented with cache lookup.",
            "Bottom-Up (Tabulation): Iteratively fills DP table from base cases.",
            "Classic benchmarks: Longest Common Subsequence O(mn), 0/1 Knapsack O(nW), Matrix Chain Multiplication O(n^3)."
        ],
        "youtube_url": get_yt_url("Dynamic Programming Memoization Tabulation 0 1 Knapsack LCS"),
        "notesMarkdown": """# Dynamic Programming (DP)

DP solves optimization problems by breaking them into overlapping subproblems, solving each once, and storing solutions.

---

## 1. Top-Down (Memoization) vs Bottom-Up (Tabulation)
- **Memoization:** Follows natural recursion tree; computes only required subproblems; incurs stack overhead.
- **Tabulation:** Iterative table filling; solves all subproblems; optimal memory locality; enables space optimization.

---

## 2. Canonical DP Recurrences
- **0/1 Knapsack:**
  $$dp[i][w] = \\max(dp[i-1][w], \\text{val}[i] + dp[i-1][w - \\text{wt}[i]])$$
- **Longest Common Subsequence (LCS):**
  $$dp[i][j] = \\begin{cases} 1 + dp[i-1][j-1] & \\text{if } A[i] = B[j] \\\\ \\max(dp[i-1][j], dp[i][j-1]) & \\text{otherwise} \\end{cases}$$
""",
        "questions": [
            {
                "id": "algo-dp-1",
                "question": "What are the two necessary properties a problem must possess for Dynamic Programming to be applicable?",
                "options": [
                    "Greedy choice property and disjoint subproblems",
                    "Optimal substructure and overlapping subproblems",
                    "Linearity and polynomial time",
                    "Independence and associative property"
                ],
                "correct_option": 1,
                "explanation": "Dynamic Programming requires: 1) Optimal Substructure (optimal solution formed from optimal solutions to subproblems), and 2) Overlapping Subproblems (same subproblems are solved repeatedly)."
            },
            {
                "id": "algo-dp-2",
                "question": "What is the time complexity to find the Longest Common Subsequence (LCS) of two strings of lengths M and N using dynamic programming?",
                "options": ["O(M + N)", "O(M * N)", "O(2^(M + N))", "O(M log N)"],
                "correct_option": 1,
                "explanation": "Standard 2D DP table of dimensions (M + 1) x (N + 1) evaluates each cell in O(1) time, yielding O(M * N) total time complexity."
            }
        ]
    },
    {
        "id": "algo-graph-traversal-bfs-dfs",
        "slug": "graph-traversal-bfs-and-dfs",
        "title": "Graph Traversal: BFS and DFS",
        "description": "Breadth-First Search (queue, shortest path in unweighted graphs), Depth-First Search (stack/recursion), edge classification, and bipartite testing.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Google", "Amazon", "Microsoft", "Meta"],
        "keyTakeaways": [
            "BFS runs in O(V + E) time using a Queue; finds shortest path in unweighted graphs.",
            "DFS runs in O(V + E) time using a Stack/Recursion; visits deep branches first.",
            "DFS edge classification in directed graphs: Tree edges, Back edges (indicate cycles!), Forward edges, Cross edges.",
            "Bipartite graph testing: A graph is bipartite if and only if it contains no odd-length cycles (tested via 2-coloring in BFS/DFS)."
        ],
        "youtube_url": get_yt_url("Graph Traversal BFS DFS Cycle Detection Bipartite"),
        "notesMarkdown": """# Graph Traversal: BFS and DFS

Both traversals visit all reachable vertices in $O(V + E)$ time using an adjacency list.

---

## 1. Breadth-First Search (BFS)
- Explores neighbor level-by-level using a FIFO Queue.
- **Shortest Path Property:** Guarantees minimum number of edges from source to any vertex in unweighted graphs.

---

## 2. Depth-First Search (DFS) & Cycle Detection
- Uses recursion / LIFO Stack.
- In directed graphs, a cycle exists **if and only if** DFS encounters a **Back Edge** (an edge pointing to an ancestor currently on the active recursion stack).
""",
        "questions": [
            {
                "id": "algo-bfs-1",
                "question": "In a directed graph, which type of DFS edge indicates the presence of a cycle?",
                "options": ["Tree Edge", "Forward Edge", "Cross Edge", "Back Edge"],
                "correct_option": 3,
                "explanation": "A back edge connects a vertex to an ancestor in the DFS tree that is currently active on the recursion call stack, directly demonstrating a cycle."
            },
            {
                "id": "algo-bfs-2",
                "question": "A graph can be 2-colored (is Bipartite) if and only if it does NOT contain:",
                "options": [
                    "Any cycles",
                    "Any odd-length cycles",
                    "Any even-length cycles",
                    "Self-loops only"
                ],
                "correct_option": 1,
                "explanation": "A graph is bipartite if and only if it contains no odd cycles. Even-length cycles can always be properly 2-colored alternately."
            }
        ]
    },
    {
        "id": "algo-mst-prim-kruskal",
        "slug": "minimum-spanning-trees-prims-and-kruskals",
        "title": "Minimum Spanning Trees: Prim's and Kruskal's",
        "description": "Cut property, Prim's algorithm using priority queues, Kruskal's algorithm using DSU, and cycle detection.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Microsoft", "Google", "Cisco"],
        "keyTakeaways": [
            "An MST connects all V vertices with V - 1 edges while minimizing total edge weight.",
            "Prim's algorithm grows a single tree from a start vertex using Min-Heap: O(E log V).",
            "Kruskal's algorithm sorts all edges and adds them greedily using DSU: O(E log E).",
            "If all edge weights are distinct, the Minimum Spanning Tree is guaranteed to be unique."
        ],
        "youtube_url": get_yt_url("Minimum Spanning Tree Prims Kruskals MST"),
        "notesMarkdown": """# Minimum Spanning Trees: Prim's and Kruskal's

A Spanning Tree of connected undirected graph $G = (V, E)$ has $V - 1$ edges and no cycles.

---

## 1. Prim's Algorithm vs Kruskal's Algorithm

| Feature | Prim's Algorithm | Kruskal's Algorithm |
| :--- | :--- | :--- |
| **Strategy** | Grows a single connected tree from root vertex | Grows a forest by adding smallest edge globally |
| **Data Structure** | Min-Heap / Priority Queue | Disjoint Set Union (DSU) + Sorted Edges |
| **Time Complexity** | $O(E \\log V)$ | $O(E \\log E) = O(E \\log V)$ |
| **Preferred For** | Dense graphs ($E \\approx V^2$) | Sparse graphs ($E \\ll V^2$) |

---

## 2. Uniqueness Property
If all edge weights in the graph are distinct, the MST is **strictly unique**.
""",
        "questions": [
            {
                "id": "algo-mst-1",
                "question": "If all edge weights in a connected undirected graph are distinct, how many Minimum Spanning Trees exist?",
                "options": ["Exactly 1 (Unique)", "At least 2", "V - 1", "Depends on start vertex"],
                "correct_option": 0,
                "explanation": "When all edge weights are strictly distinct, the cut property guarantees that the minimum edge across every cut is unique, resulting in a strictly unique MST."
            },
            {
                "id": "algo-mst-2",
                "question": "What is the time complexity of Kruskal's algorithm on a graph with V vertices and E edges?",
                "options": ["O(V^2)", "O(E log E)", "O(V + E)", "O(V log E)"],
                "correct_option": 1,
                "explanation": "Kruskal's algorithm sorts E edges in O(E log E) time. DSU operations take O(E * α(V)). The dominant term is edge sorting: O(E log E) = O(E log V)."
            }
        ]
    },
    {
        "id": "algo-shortest-paths",
        "slug": "shortest-paths-dijkstra-and-bellman-ford",
        "title": "Shortest Paths: Dijkstra's and Bellman-Ford",
        "description": "Single-source shortest paths, Dijkstra's algorithm (non-negative weights), Bellman-Ford (negative edges & negative cycle detection), and Floyd-Warshall.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Google", "Amazon", "Uber", "Microsoft", "Meta"],
        "keyTakeaways": [
            "Dijkstra's: Greedy algorithm using Min-Heap in O((V + E) log V); fails on negative edge weights.",
            "Bellman-Ford: Dynamic programming relaxing all E edges V - 1 times in O(V * E); detects negative weight cycles.",
            "A negative cycle reachable from source implies shortest path is -infinity.",
            "Floyd-Warshall: All-Pairs Shortest Path in O(V^3) time using adjacency matrix."
        ],
        "youtube_url": get_yt_url("Shortest Path Algorithms Dijkstras Bellman Ford Floyd Warshall"),
        "notesMarkdown": """# Shortest Paths: Dijkstra's and Bellman-Ford

---

## 1. Single-Source Shortest Path Algorithms
- **Dijkstra's Algorithm:**
  - Greedily selects unvisited node with smallest known distance using Min-Heap.
  - Relaxes outgoing edges.
  - Runtime: $O((V + E) \\log V)$.
  - **Fails if graph contains negative weight edges!**
- **Bellman-Ford Algorithm:**
  - Relaxes all $E$ edges $V - 1$ times.
  - Runtime: $O(V \\cdot E)$.
  - Works with negative edge weights.
  - **Detects negative weight cycles:** If a distance relaxes on the $V$-th pass, a negative cycle exists!
""",
        "questions": [
            {
                "id": "algo-sp-1",
                "question": "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
                "options": [
                    "It causes infinite recursion",
                    "Its greedy assumption that a visited vertex already has its optimal minimum distance is invalidated",
                    "It cannot use an adjacency matrix",
                    "The priority queue cannot store negative numbers"
                ],
                "correct_option": 1,
                "explanation": "Dijkstra assumes that once a vertex is extracted from the priority queue, its distance is finalized and can never decrease. Negative weight edges can later offer shorter paths to already finalized vertices."
            },
            {
                "id": "algo-sp-2",
                "question": "How does the Bellman-Ford algorithm detect the presence of a negative weight cycle reachable from the source?",
                "options": [
                    "By counting edges in the shortest path",
                    "If any edge can still be relaxed during the V-th iteration",
                    "If the total path length becomes 0",
                    "By coloring nodes with BFS"
                ],
                "correct_option": 1,
                "explanation": "In a graph without negative cycles, shortest paths have at most V - 1 edges. If any edge can still be relaxed on the V-th iteration, a negative weight cycle must exist."
            }
        ]
    },
    {
        "id": "algo-topological-sorting",
        "slug": "topological-sorting",
        "title": "Topological Sorting",
        "description": "Linear ordering of vertices in Directed Acyclic Graphs (DAG), Kahn's algorithm (in-degrees), DFS post-order reversal, and dependency resolution.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Google", "Microsoft", "Uber"],
        "keyTakeaways": [
            "Topological sort exists if and only if the graph is a DAG (Directed Acyclic Graph).",
            "For every directed edge u -> v, u appears before v in the ordering.",
            "Kahn's Algorithm uses in-degrees: repeatedly dequeue nodes with in-degree 0; detects cycles if visited count < V.",
            "Applications: Build dependency resolution (make, gradle), task scheduling, course prerequisites."
        ],
        "youtube_url": get_yt_url("Topological Sorting Kahns Algorithm DAG Course Schedule"),
        "notesMarkdown": """# Topological Sorting

A topological sort is a linear ordering of vertices such that for every directed edge $u \\to v$, $u$ comes before $v$.

---

## 1. Conditions
- Defined **only** for Directed Acyclic Graphs (DAGs). If graph contains a cycle, no topological ordering exists.

---

## 2. Kahn's Algorithm (BFS-based)
1. Compute in-degree for all vertices.
2. Push all vertices with `in_degree == 0` into a Queue.
3. While Queue is not empty:
   - Dequeue node $u$, append to result list.
   - For each neighbor $v$ of $u$, decrement `in_degree[v]`.
   - If `in_degree[v] == 0`, enqueue $v$.
4. If result list length $< V$, a cycle exists!
""",
        "questions": [
            {
                "id": "algo-topo-1",
                "question": "A Topological Sort is possible if and only if the graph is a:",
                "options": [
                    "Connected Undirected Graph",
                    "Directed Acyclic Graph (DAG)",
                    "Complete Graph",
                    "Tree"
                ],
                "correct_option": 1,
                "explanation": "Topological sorting requires directed edges (dependency arrows) and zero cycles (acyclic), which is strictly the definition of a DAG."
            },
            {
                "id": "algo-topo-2",
                "question": "How does Kahn's algorithm detect if a directed graph contains a cycle?",
                "options": [
                    "The queue never becomes empty",
                    "The number of processed vertices in the topological order is less than |V|",
                    "All vertices end up with in-degree 0",
                    "The adjacency list size exceeds V^2"
                ],
                "correct_option": 1,
                "explanation": "Vertices in a cycle will never have their in-degrees drop to 0, preventing them from entering the queue. Hence, the count of processed vertices will be strictly less than V."
            }
        ]
    },
    {
        "id": "algo-backtracking",
        "slug": "backtracking",
        "title": "Backtracking",
        "description": "Systematic search of solution space, pruning invalid branches, N-Queens problem, Sudoku solver, and Subsets/Permutations generation.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Google", "Microsoft", "Meta"],
        "keyTakeaways": [
            "Backtracking builds candidate solutions incrementally and abandons (prunes) branches that violate constraints.",
            "Explores state-space tree using Depth-First Search.",
            "Template: Choose -> Explore (Recurse) -> Un-choose (Backtrack state).",
            "Classic benchmarks: N-Queens, Sudoku Solver, Subset Sum, Hamiltonian Path."
        ],
        "youtube_url": get_yt_url("Backtracking N Queens Sudoku Solver State Space Tree"),
        "notesMarkdown": """# Backtracking

Backtracking is an algorithmic paradigm that tests possibilities recursively and undoes state changes when a path fails constraints.

---

## 1. General Template
```c
void backtrack(State state) {
    if (isSolution(state)) {
        recordSolution(state);
        return;
    }
    for (Choice choice : validChoices(state)) {
        makeChoice(state, choice);     // 1. Choose
        backtrack(state);              // 2. Explore
        undoChoice(state, choice);     // 3. Un-choose (Backtrack!)
    }
}
```
""",
        "questions": [
            {
                "id": "algo-bt-1",
                "question": "What is the primary advantage of Backtracking over exhaustive Brute-Force search?",
                "options": [
                    "Backtracking uses dynamic programming memoization",
                    "Pruning: Backtracking discards entire invalid subtrees early without exploring them",
                    "Backtracking always runs in polynomial time",
                    "Backtracking eliminates recursion"
                ],
                "correct_option": 1,
                "explanation": "Backtracking checks constraints at each step. As soon as a partial candidate violates constraints, it prunes the branch immediately, avoiding searching countless futile states."
            },
            {
                "id": "algo-bt-2",
                "question": "In the N-Queens problem, how many queens can be placed on an NxN chessboard such that no two queens attack each other?",
                "options": ["N - 1", "N", "2N", "N^2"],
                "correct_option": 1,
                "explanation": "The N-Queens problem asks to place exactly N non-attacking queens on an N x N chessboard, with exactly one queen in each row and column."
            }
        ]
    },
    {
        "id": "algo-mincut-maxflow",
        "slug": "minimum-cut-and-maximum-flow-basics",
        "title": "Minimum Cut and Maximum Flow Basics",
        "description": "Flow networks, Ford-Fulkerson method, Edmonds-Karp algorithm (BFS augmenting paths), and Max-Flow Min-Cut Theorem.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Google", "Meta", "Directi", "Goldman Sachs"],
        "keyTakeaways": [
            "Flow network: Directed graph with source s, sink t, and capacity c(u, v) on each edge.",
            "Capacity constraint: 0 <= f(u, v) <= c(u, v). Flow conservation: Inflow = Outflow for all v != s, t.",
            "Max-Flow Min-Cut Theorem: The maximum amount of flow from s to t equals the minimum capacity of an s-t cut.",
            "Edmonds-Karp uses BFS to find shortest augmenting paths in residual graph, running in O(V * E^2)."
        ],
        "youtube_url": get_yt_url("Max Flow Min Cut Ford Fulkerson Edmonds Karp"),
        "notesMarkdown": """# Minimum Cut and Maximum Flow Basics

---

## 1. Flow Network Axioms
- **Capacity Constraint:** $0 \\le f(u, v) \\le c(u, v)$.
- **Flow Conservation:** For every vertex $u \\notin \\{s, t\\}$, $\\sum_{v} f(v, u) = \\sum_{w} f(u, w)$.

---

## 2. Max-Flow Min-Cut Theorem
An $(s, t)$-cut partitions $V$ into $S$ and $T$ with $s \\in S$ and $t \\in T$.
$$\\text{Capacity of Cut }(S, T) = \\sum_{u \\in S, v \\in T} c(u, v)$$
**Theorem:** The maximum flow passing from source $s$ to sink $t$ is strictly equal to the minimum capacity among all valid $(s, t)$ cuts!
""",
        "questions": [
            {
                "id": "algo-mf-1",
                "question": "According to the Max-Flow Min-Cut Theorem, what is the maximum flow value from source s to sink t in a network?",
                "options": [
                    "The maximum capacity of any single edge",
                    "The capacity of the minimum s-t cut",
                    "The sum of all edge capacities in the network",
                    "The length of the longest path from s to t"
                ],
                "correct_option": 1,
                "explanation": "The fundamental Max-Flow Min-Cut Theorem states that the maximum flow possible from s to t is strictly equal to the minimum capacity of an s-t cut."
            },
            {
                "id": "algo-mf-2",
                "question": "What is the time complexity of the Edmonds-Karp implementation of the Ford-Fulkerson method using BFS for augmenting paths?",
                "options": ["O(V^3)", "O(V * E^2)", "O(E log V)", "O(V^2 * E)"],
                "correct_option": 1,
                "explanation": "Edmonds-Karp uses BFS to select augmenting paths with the fewest edges, proving that total augmentations are O(V * E). Each BFS takes O(E), giving O(V * E^2)."
            }
        ]
    },
    {
        "id": "algo-np-completeness",
        "slug": "np-hardness-np-completeness-and-reductions",
        "title": "NP-Hardness, NP-Completeness, and Reductions",
        "description": "Complexity classes P, NP, NP-Complete, NP-Hard, polynomial-time reductions, Cook-Levin theorem, and 3-SAT.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Google", "Microsoft", "Amazon", "IBM Research"],
        "keyTakeaways": [
            "P: Decision problems solvable in polynomial time by a deterministic Turing machine.",
            "NP: Decision problems whose solutions can be verified in polynomial time.",
            "NP-Hard: At least as hard as the hardest problems in NP; any problem in NP reduces to it in polynomial time.",
            "NP-Complete: Both in NP AND NP-Hard. If ANY NP-Complete problem is solved in polynomial time, P = NP."
        ],
        "youtube_url": get_yt_url("P vs NP NP Complete NP Hard Reductions Cook Levin"),
        "notesMarkdown": """# NP-Hardness, NP-Completeness, and Reductions

---

## 1. Complexity Classes
- **P:** Solvable in polynomial time $O(n^k)$.
- **NP (Nondeterministic Polynomial):** A candidate solution can be **verified** in polynomial time.
- **NP-Hard:** Problem $H$ such that $\\forall L \\in NP$, $L \\le_P H$ (polynomial-time reduction).
- **NP-Complete (NPC):** $X \\in NP$ AND $X \\in NP\\text{-Hard}$.

---

## 2. Classic NP-Complete Problems
- Boolean Satisfiability (SAT / 3-SAT) (Cook-Levin Theorem)
- Traveling Salesperson Problem (TSP Decision variant)
- Vertex Cover
- Hamiltonian Cycle
- Clique Problem
- 0/1 Knapsack (Decision variant)
- Subset Sum
""",
        "questions": [
            {
                "id": "algo-npc-1",
                "question": "What does it mean for a decision problem X to be NP-Complete?",
                "options": [
                    "X is solved in exponential time only",
                    "X is in NP AND every problem in NP can be reduced to X in polynomial time",
                    "X is not in NP, but is harder than P",
                    "X can be solved in non-polynomial space"
                ],
                "correct_option": 1,
                "explanation": "A problem X is NP-Complete if: 1) X is in NP (verifiable in polynomial time), and 2) X is NP-Hard (every problem in NP reduces to X in polynomial time)."
            },
            {
                "id": "algo-npc-2",
                "question": "Which historic theorem proved that Boolean Satisfiability (SAT) is NP-Complete, establishing the very first NP-Complete problem?",
                "options": [
                    "Master Theorem",
                    "Cook-Levin Theorem",
                    "Church-Turing Thesis",
                    "Shannon's Theorem"
                ],
                "correct_option": 1,
                "explanation": "The Cook-Levin Theorem (1971) proved that Boolean Satisfiability (SAT) is NP-Complete by showing that any non-deterministic Turing machine computation can be simulated by a boolean formula."
            }
        ]
    }
]

file_content = f"""import type {{ SectionCategory }} from './types';

export const ALGORITHMS_CATEGORY: SectionCategory = {{
  id: "algorithms",
  slug: "algorithms",
  title: "Algorithms",
  description: "Asymptotic analysis, divide & conquer, greedy, dynamic programming, graph algorithms, and NP-completeness.",
  icon: "Code2",
  topics: {json.dumps(topics, indent=2)}
}};
"""

with open('./src/lib/data/curriculum/algorithms.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"Generated Algorithms module with {len(topics)} topics successfully!")
