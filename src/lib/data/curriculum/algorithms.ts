import type { SectionCategory } from './types';

export const ALGORITHMS_CATEGORY: SectionCategory = {
  "id": "algorithms",
  "slug": "algorithms",
  "title": "Algorithms",
  "description": "Asymptotic analysis, divide & conquer, greedy, dynamic programming, graph algorithms, and NP-completeness.",
  "icon": "Code2",
  "topics": [
    {
      "id": "algo-asymptotic-analysis",
      "slug": "asymptotic-analysis-o-omega-theta",
      "title": "Asymptotic Analysis: O, Ω, Θ",
      "description": "Mathematical definitions of Big-O, Big-Omega, Big-Theta, Little-o, Little-Omega, and limit tests for growth rate.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "Big-O (O): Upper bound (f(n) <= c * g(n)).",
        "Big-Omega (Ω): Lower bound (f(n) >= c * g(n)).",
        "Big-Theta (Θ): Asymptotically tight bound (c1 * g(n) <= f(n) <= c2 * g(n)).",
        "Limit test: lim(n->inf) f(n)/g(n) = c > 0 implies f(n) = Θ(g(n)). If 0, f(n) = o(g(n)). If inf, f(n) = ω(g(n))."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Asymptotic+Analysis+Big+O+Big+Omega+Big+Theta+Algorithms+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Asymptotic Analysis: O, Ω, Θ\n\n---\n\n## 1. Formal Mathematical Definitions\n- **$O(g(n))$:** $\\exists c > 0, n_0 > 0$ such that $0 \\le f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$.\n- **$\\\\Omega(g(n))$:** $\\exists c > 0, n_0 > 0$ such that $0 \\le c \\cdot g(n) \\le f(n)$ for all $n \\ge n_0$.\n- **$\\\\Theta(g(n))$:** $\\exists c_1, c_2 > 0, n_0 > 0$ such that $c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n)$ for all $n \\ge n_0$.\n\n---\n\n## 2. Little-o and Little-Omega\n- $f(n) = o(g(n))$ if $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0$ (strict upper bound).\n- $f(n) = \\omega(g(n))$ if $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty$ (strict lower bound).\n",
      "questions": [
        {
          "id": "algo-asymp-1",
          "question": "If lim (n -> inf) [f(n) / g(n)] = 0, which relationship holds strictly?",
          "options": [
            "f(n) = Θ(g(n))",
            "f(n) = o(g(n))",
            "f(n) = ω(g(n))",
            "f(n) = Ω(g(n))"
          ],
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
        },
        {
          "id": "algo-asymp-3",
          "question": "If f(n) = O(g(n)) and g(n) = O(h(n)), which of the following statements must be true by transitivity?",
          "options": [
            "f(n) = O(h(n))",
            "f(n) = Theta(h(n))",
            "h(n) = O(f(n))",
            "f(n) = Omega(h(n))"
          ],
          "correct_option": 0,
          "explanation": "Big-O notation satisfies the transitivity property: if f(n) <= c1 * g(n) and g(n) <= c2 * h(n), then f(n) <= (c1 * c2) * h(n), which proves f(n) = O(h(n))."
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
      "companyTags": [
        "Amazon",
        "TCS Digital",
        "Infosys",
        "Cognizant"
      ],
      "keyTakeaways": [
        "Worst-case: Maximum time across any input of size n (guarantees upper bound on execution).",
        "Average-case: Expected time over all inputs assuming a probability distribution.",
        "Best-case: Minimum time on the most favorable input.",
        "QuickSort: Best/Average = O(n log n); Worst = O(n^2) when pivot is always extreme element."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Best+Average+Worst+Case+Analysis+Algorithms+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Best, Average, and Worst-Case Analysis\n\nAlgorithm efficiency is characterized across diverse input distributions to provide rigorous runtime guarantees.\n\n---\n\n## 1. The Three Primary Analysis Regimes\n- **Worst-Case Complexity ($T_{\\text{worst}}(n)$):**\n  - Maximum running time over all possible inputs of size $n$.\n  - Provides an absolute upper bound guarantee that the algorithm will never exceed.\n  - Standard metric in real-time and mission-critical systems.\n- **Average-Case Complexity ($T_{\\text{avg}}(n)$):**\n  - Expected running time over a probabilistic distribution of all inputs: $\\sum P(I) \\cdot T(I)$.\n  - Reflects typical real-world runtime behavior (e.g. Quicksort running in $O(n \\log n)$ average time).\n- **Best-Case Complexity ($T_{\\text{best}}(n)$):**\n  - Minimum running time over any input of size $n$.\n  - Indicates early-termination or already-optimal input behavior (e.g., Insertion Sort running in $O(n)$ time on already-sorted arrays).\n\n---\n\n## 2. Classic Comparison: Quicksort vs Mergesort\n| Algorithm | Best-Case | Average-Case | Worst-Case | Space Complexity |\n| :--- | :--- | :--- | :--- | :--- |\n| **Quicksort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ (unbalanced pivot) | $O(\\log n)$ stack |\n| **Mergesort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(n)$ auxiliary array |\n| **Heapsort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(1)$ in-place |\n| **Insertion Sort** | $O(n)$ (already sorted) | $O(n^2)$ | $O(n^2)$ (reversed) | $O(1)$ in-place |\n\n---\n\n## 3. High-Yield Interview Insight: Amortized Analysis\n- Evaluates the average running time per operation over a sequence of operations, guaranteeing that occasional expensive operations are paid for by many cheap ones.\n- **Methods:** Aggregate Method, Accounting Method (credits), Potential Method (physicist's method).\n- **Example:** Dynamic array resizing — doubling capacity takes $O(n)$ once, but occurs only every $n$ insertions, giving $O(1)$ amortized insertion.\n",
      "questions": [
        {
          "id": "algo-case-1",
          "question": "What is the best-case time complexity of Insertion Sort on an array that is already fully sorted in ascending order?",
          "options": [
            "O(1)",
            "O(n)",
            "O(n log n)",
            "O(n^2)"
          ],
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
        },
        {
          "id": "algo-case-3",
          "question": "What is the worst-case time complexity of finding an element in a binary search tree (BST) of N elements?",
          "options": [
            "O(N) when the tree degenerates into a linked list",
            "O(log N)",
            "O(N log N)",
            "O(1)"
          ],
          "correct_option": 0,
          "explanation": "In the worst case, inserting sorted elements into an unbalanced BST produces a completely skewed tree of height N, resulting in O(N) search time."
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
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Directi"
      ],
      "keyTakeaways": [
        "Master Theorem form: T(n) = a*T(n/b) + f(n), where a >= 1, b > 1.",
        "Critical exponent: log_b(a). Compare f(n) with n^(log_b(a)).",
        "Case 1 (Tree-heavy): f(n) = O(n^(log_b(a) - eps)) -> T(n) = Θ(n^(log_b(a))).",
        "Case 2 (Balanced): f(n) = Θ(n^(log_b(a)) * log^k(n)) -> T(n) = Θ(n^(log_b(a)) * log^(k+1)(n)).",
        "Case 3 (Root-heavy): f(n) = Ω(n^(log_b(a) + eps)) and regularity holds -> T(n) = Θ(f(n))."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Master+Theorem+Recurrence+Relations+Algorithms+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Recurrence Relations and Solution Methods\n\nRecurrence relations model the runtime of recursive algorithms $T(n)$ by expressing it in terms of subproblem runtimes.\n\n---\n\n## 1. Master Theorem for Divide-and-Conquer\nFor recurrences of the form:\n$$T(n) = a T(n/b) + f(n) \\quad (a \\ge 1, b > 1)$$\nCompare $f(n)$ with $n^{\\log_b a}$:\n1. **Case 1 (Subproblems dominate):** If $f(n) = O(n^{\\log_b a - \\epsilon})$ for $\\epsilon > 0$, then $T(n) = \\Theta(n^{\\log_b a})$.\n2. **Case 2 (Work evenly split):** If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$ for $k \\ge 0$, then $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.\n3. **Case 3 (Root work dominates):** If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and $a f(n/b) \\le c f(n)$ for $c < 1$, then $T(n) = \\Theta(f(n))$.\n\n---\n\n## 2. Recursion Tree Method\n- Draw levels of subproblem decomposition:\n  - Root: Level 0 work $= f(n)$\n  - Level 1: $a$ subproblems of work $f(n/b)$\n  - Level $i$: $a^i$ subproblems of work $f(n/b^i)$\n  - Total depth $= \\log_b n$\n  - Sum work across all levels to obtain overall complexity.\n\n---\n\n## 3. Substitution Method (Inductive Proof)\n1. Guess the asymptotic form (e.g., $T(n) \\le c n \\log n$).\n2. Substitute the inductive hypothesis into the recurrence.\n3. Prove that $T(n) \\le c n \\log n$ holds for the inductive step and choose boundary constants.\n",
      "questions": [
        {
          "id": "algo-rec-1",
          "question": "What is the solution to the recurrence T(n) = 2T(n/2) + O(n)?",
          "options": [
            "O(n)",
            "O(n log n)",
            "O(n^2)",
            "O(log n)"
          ],
          "correct_option": 1,
          "explanation": "Here a = 2, b = 2, so n^(log_b a) = n^(log_2 2) = n^1. Since f(n) = Θ(n), this falls into Master Theorem Case 2 with k = 0, giving T(n) = Θ(n log n)."
        },
        {
          "id": "algo-rec-2",
          "question": "What is the solution to the recurrence T(n) = 8T(n/2) + n^2?",
          "options": [
            "O(n^2)",
            "O(n^3)",
            "O(n^2 log n)",
            "O(n log n)"
          ],
          "correct_option": 1,
          "explanation": "Here a = 8, b = 2. n^(log_2 8) = n^3. Since f(n) = n^2 = O(n^(3 - 1)), this is Master Theorem Case 1, so T(n) = Θ(n^3)."
        },
        {
          "id": "algo-rec-3",
          "question": "According to the Master Theorem, what is the asymptotic solution to the recurrence T(n) = 2T(n/2) + O(n)?",
          "options": [
            "Theta(n log n)",
            "Theta(n^2)",
            "Theta(n)",
            "Theta(log n)"
          ],
          "correct_option": 0,
          "explanation": "Here a = 2, b = 2, so n^(log_b a) = n^(log2 2) = n^1 = n. Since f(n) = Theta(n) = Theta(n^(log_b a)), Case 2 of Master Theorem applies: T(n) = Theta(n log n) (Mergesort recurrence)."
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
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Meta"
      ],
      "keyTakeaways": [
        "Linear search: O(n) time, works on arbitrary unsorted collections.",
        "Binary search: O(log n) time, requires monotonic search space.",
        "Midpoint calculation: `mid = left + (right - left) / 2` avoids integer overflow.",
        "Binary search on answer: Optimizes monotonic predicate functions (e.g. Book Allocation, Aggressive Cows)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Binary+Search+Algorithm+Lower+Bound+Upper+Bound+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Searching Algorithms\n\n---\n\n## 1. Binary Search Invariant\n```c\nint binarySearch(int arr[], int n, int target) {\n    int left = 0, right = n - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2; // Prevents (left + right) integer overflow!\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n```\n\n---\n\n## 2. Binary Search on Answer\nWhenever a problem can be framed as a boolean test $f(x)$ that transitions monotonically from `False -> True` (or `True -> False`), binary search finds the transition boundary in $O(\\text{Cost}(f) \\cdot \\log(\\text{Range}))$.\n",
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
          "options": [
            "10",
            "11",
            "1,024",
            "512"
          ],
          "correct_option": 1,
          "explanation": "In the worst case, binary search takes floor(log_2(N)) + 1 comparisons. For N = 1024, log_2(1024) = 10, so at most 11 comparisons (or 10 iterations) are needed."
        },
        {
          "id": "algo-search-3",
          "question": "In Binary Search on an array of size N, what is the maximum number of comparisons in the worst case?",
          "options": [
            "floor(log2 N) + 1",
            "N / 2",
            "log2(N) - 1",
            "2 * log2(N)"
          ],
          "correct_option": 0,
          "explanation": "Binary search cuts the search space in half each comparison step, requiring at most floor(log2 N) + 1 comparisons to locate the element or determine its absence."
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
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Apple",
        "Uber"
      ],
      "keyTakeaways": [
        "Comparison sort lower bound: Any comparison-based sorting algorithm requires Ω(n log n) comparisons in the worst case.",
        "Stability: Preserves original relative order of duplicate elements (MergeSort, InsertionSort are stable; QuickSort, HeapSort are unstable).",
        "In-place sorts use O(1) auxiliary space (HeapSort, QuickSort, InsertionSort).",
        "Linear-time non-comparison sorts: Counting Sort O(n + k), Radix Sort O(d * (n + k))."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Sorting+Algorithms+MergeSort+QuickSort+HeapSort+Stable+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Sorting Algorithms\n\n---\n\n## 1. Master Complexity Matrix\n\n| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | In-Place? |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes |\n| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No | Yes |\n| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes |\n| **Merge Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(n)$ | **Yes** | No |\n| **Quick Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ | $O(\\log n)$ | No | **Yes** |\n| **Heap Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(1)$ | No | **Yes** |\n| **Counting Sort**| $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | $O(k)$ | **Yes** | No |\n\n---\n\n## 2. Comparison Sort Lower Bound Theorem\nBy decision-tree modeling, any comparison-based sort has $n!$ possible permutations as leaves. Height $h \\ge \\log_2(n!) = \\Omega(n \\log n)$.\n",
      "questions": [
        {
          "id": "algo-sort-1",
          "question": "Which of the following sorting algorithms is guaranteed to run in O(n log n) worst-case time AND operates in-place with O(1) auxiliary space?",
          "options": [
            "Merge Sort",
            "Heap Sort",
            "Quick Sort",
            "Counting Sort"
          ],
          "correct_option": 1,
          "explanation": "Heap Sort runs in O(n log n) worst-case time and operates directly within the input array using only O(1) auxiliary memory. (Merge Sort takes O(n) space; Quick Sort has an O(n^2) worst case)."
        },
        {
          "id": "algo-sort-2",
          "question": "What is the theoretical lower bound on the number of comparisons for ANY comparison-based sorting algorithm on N elements?",
          "options": [
            "Ω(N)",
            "Ω(N log N)",
            "Ω(N^2)",
            "Ω(2^N)"
          ],
          "correct_option": 1,
          "explanation": "A decision tree sorting N distinct elements must have at least N! leaves. A binary tree with N! leaves has height >= ceil(log2(N!)) = Ω(N log N)."
        },
        {
          "id": "algo-sort-3",
          "question": "What is the theoretical minimum number of comparisons required to sort N elements in any comparison-based sorting algorithm?",
          "options": [
            "Omega(N log N)",
            "Omega(N)",
            "Omega(N^2)",
            "Omega(log N)"
          ],
          "correct_option": 0,
          "explanation": "Any comparison sort corresponds to a decision tree with N! leaves. A binary tree with N! leaves has minimum depth ceil(log2(N!)) = Omega(N log N) by Stirling's approximation."
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
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "3 phases: Divide into subproblems, Conquer via recursion, Combine subproblem results.",
        "Karatsuba multiplication multiplies two n-digit numbers in O(n^1.585) vs standard O(n^2).",
        "Strassen's algorithm multiplies two nxn matrices in O(n^2.807) vs naive O(n^3) using 7 recursive multiplications.",
        "Closest pair of points in 2D plane solved in O(n log n) using divide-and-conquer."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Divide+and+Conquer+Algorithms+Strassen+Karatsuba+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Divide and Conquer\n\nDivide and Conquer partitions a problem into non-overlapping subproblems of identical type.\n\n---\n\n## 1. Landmark Algorithms\n1. **Merge Sort:** Divides array into two halves ($2T(n/2)$), merges in $O(n)$ -> $O(n \\log n)$.\n2. **Karatsuba Algorithm:** Reduces multiplication of two $n$-bit integers to 3 sub-multiplications:\n   $$T(n) = 3T(n/2) + O(n) \\implies O(n^{\\log_2 3}) \\approx O(n^{1.585})$$\n3. **Strassen's Matrix Multiplication:** Replaces 8 standard block multiplications with 7:\n   $$T(n) = 7T(n/2) + O(n^2) \\implies O(n^{\\log_2 7}) \\approx O(n^{2.807})$$\n",
      "questions": [
        {
          "id": "algo-dc-1",
          "question": "How many recursive multiplications does Strassen's algorithm use to multiply two 2x2 block matrices?",
          "options": [
            "8",
            "7",
            "4",
            "6"
          ],
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
        },
        {
          "id": "algo-dnc-3",
          "question": "What is the time complexity of Strassen's matrix multiplication algorithm compared to standard O(N^3) multiplication?",
          "options": [
            "O(N^2.807)",
            "O(N^2.5)",
            "O(N^2)",
            "O(N log N)"
          ],
          "correct_option": 0,
          "explanation": "Strassen's algorithm reduces matrix multiplication to 7 recursive multiplications of size N/2 instead of 8: T(N) = 7T(N/2) + O(N^2) => O(N^(log2 7)) = O(N^2.807)."
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
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Uber",
        "Flipkart"
      ],
      "keyTakeaways": [
        "Greedy strategy makes locally optimal choice at each step hoping for global optimum.",
        "Requires two key properties: Greedy Choice Property and Optimal Substructure.",
        "Fractional Knapsack is solved greedily by sorting by value/weight ratio; 0/1 Knapsack CANNOT be solved greedily.",
        "Huffman coding builds optimal prefix-free codes in O(n log n) using a Min-Heap."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Greedy+Algorithms+Fractional+Knapsack+Activity+Selection+Huffman+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Greedy Algorithms\n\nA greedy algorithm makes the choice that looks best at the moment without backtracking.\n\n---\n\n## 1. Classic Greedy Problems\n1. **Activity Selection:** Sort by finish time; pick next activity whose start time $\\ge$ previous finish time.\n2. **Fractional Knapsack:** Sort items by $\\text{Value} / \\text{Weight}$ ratio in descending order. Take greedily. Runs in $O(n \\log n)$.\n3. **Huffman Coding:** Repeatedly extract the two minimum frequency nodes from a Min-Heap, create parent node with sum frequency, reinsert into heap.\n4. **Job Sequencing with Deadlines:** Sort jobs by decreasing profit; schedule in latest available slot before deadline.\n",
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
        },
        {
          "id": "algo-greedy-3",
          "question": "Which of the following problems CANNOT be solved optimally using a greedy algorithm?",
          "options": [
            "0/1 Knapsack Problem",
            "Fractional Knapsack Problem",
            "Huffman Coding",
            "Kruskal's Minimum Spanning Tree"
          ],
          "correct_option": 0,
          "explanation": "The 0/1 Knapsack problem exhibits optimal substructure but lacks the greedy choice property; items cannot be broken into fractions, requiring Dynamic Programming (O(N*W)) for an exact optimal solution."
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
      "companyTags": [
        "Google",
        "Amazon",
        "Meta",
        "Microsoft",
        "Uber"
      ],
      "keyTakeaways": [
        "Requires two properties: Optimal Substructure and Overlapping Subproblems.",
        "Top-Down (Memoization): Recursive approach augmented with cache lookup.",
        "Bottom-Up (Tabulation): Iteratively fills DP table from base cases.",
        "Classic benchmarks: Longest Common Subsequence O(mn), 0/1 Knapsack O(nW), Matrix Chain Multiplication O(n^3)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Dynamic+Programming+Memoization+Tabulation+0+1+Knapsack+LCS+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Dynamic Programming (DP)\n\nDP solves optimization problems by breaking them into overlapping subproblems, solving each once, and storing solutions.\n\n---\n\n## 1. Top-Down (Memoization) vs Bottom-Up (Tabulation)\n- **Memoization:** Follows natural recursion tree; computes only required subproblems; incurs stack overhead.\n- **Tabulation:** Iterative table filling; solves all subproblems; optimal memory locality; enables space optimization.\n\n---\n\n## 2. Canonical DP Recurrences\n- **0/1 Knapsack:**\n  $$dp[i][w] = \\max(dp[i-1][w], \\text{val}[i] + dp[i-1][w - \\text{wt}[i]])$$\n- **Longest Common Subsequence (LCS):**\n  $$dp[i][j] = \\begin{cases} 1 + dp[i-1][j-1] & \\text{if } A[i] = B[j] \\\\ \\max(dp[i-1][j], dp[i][j-1]) & \\text{otherwise} \\end{cases}$$\n",
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
          "options": [
            "O(M + N)",
            "O(M * N)",
            "O(2^(M + N))",
            "O(M log N)"
          ],
          "correct_option": 1,
          "explanation": "Standard 2D DP table of dimensions (M + 1) x (N + 1) evaluates each cell in O(1) time, yielding O(M * N) total time complexity."
        },
        {
          "id": "algo-dp-3",
          "question": "What are the two mandatory properties a problem must possess to be solvable via Dynamic Programming?",
          "options": [
            "Optimal Substructure and Overlapping Subproblems",
            "Greedy Choice Property and Infinite Memory",
            "Divide and Conquer with No Base Case",
            "Disjoint Subproblems and Linear Traversal"
          ],
          "correct_option": 0,
          "explanation": "Dynamic programming applies strictly when optimal solutions to a problem can be constructed from optimal solutions to subproblems (Optimal Substructure) and the same subproblems are solved repeatedly (Overlapping Subproblems)."
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
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Meta"
      ],
      "keyTakeaways": [
        "BFS runs in O(V + E) time using a Queue; finds shortest path in unweighted graphs.",
        "DFS runs in O(V + E) time using a Stack/Recursion; visits deep branches first.",
        "DFS edge classification in directed graphs: Tree edges, Back edges (indicate cycles!), Forward edges, Cross edges.",
        "Bipartite graph testing: A graph is bipartite if and only if it contains no odd-length cycles (tested via 2-coloring in BFS/DFS)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Graph+Traversal+BFS+DFS+Cycle+Detection+Bipartite+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Graph Traversals: BFS vs DFS\n\nBreadth-First Search (BFS) and Depth-First Search (DFS) are foundational graph exploration algorithms.\n\n---\n\n## 1. Breadth-First Search (BFS)\n- **Data Structure:** Queue (FIFO).\n- **Exploration Order:** Level-by-level radial expansion from the source vertex.\n- **Time Complexity:** $O(V + E)$ with Adjacency List.\n- **Space Complexity:** $O(V)$ for queue and visited array.\n- **Primary Applications:**\n  - **Unweighted Shortest Path:** Finds the minimum edge-count path between source and target.\n  - Bipartite graph verification (2-coloring).\n  - Connected components in undirected graphs.\n  - Cycle detection in unweighted undirected graphs.\n\n---\n\n## 2. Depth-First Search (DFS)\n- **Data Structure:** Call Stack / Explicit Stack (LIFO).\n- **Exploration Order:** Plunges as deep as possible along each branch before backtracking.\n- **Time Complexity:** $O(V + E)$.\n- **Space Complexity:** $O(V)$ recursion stack depth in worst case.\n- **Edge Classifications in Directed Graphs:**\n  - **Tree Edges:** Edges in the DFS forest tree.\n  - **Back Edges:** Edges to ancestors; **indicates presence of a cycle!**\n  - **Forward Edges:** Edges to non-child descendants.\n  - **Cross Edges:** Edges between unrelated branches.\n- **Primary Applications:**\n  - Topological sorting of Directed Acyclic Graphs (DAGs).\n  - Strongly Connected Components (Kosaraju's & Tarjan's algorithms).\n  - Articulation points and bridges (cut vertices and cut edges).\n",
      "questions": [
        {
          "id": "algo-bfs-1",
          "question": "In a directed graph, which type of DFS edge indicates the presence of a cycle?",
          "options": [
            "Tree Edge",
            "Forward Edge",
            "Cross Edge",
            "Back Edge"
          ],
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
        },
        {
          "id": "algo-graph-3",
          "question": "During DFS on a directed graph, the discovery of which type of edge confirms the existence of a directed cycle?",
          "options": [
            "Back edge (edge pointing to an ancestor currently in the recursion stack)",
            "Tree edge",
            "Cross edge",
            "Forward edge"
          ],
          "correct_option": 0,
          "explanation": "A back edge connects a vertex to an ancestor in the current DFS path (a grey vertex). Reaching an active ancestor completes a directed cycle."
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
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Google",
        "Cisco"
      ],
      "keyTakeaways": [
        "An MST connects all V vertices with V - 1 edges while minimizing total edge weight.",
        "Prim's algorithm grows a single tree from a start vertex using Min-Heap: O(E log V).",
        "Kruskal's algorithm sorts all edges and adds them greedily using DSU: O(E log E).",
        "If all edge weights are distinct, the Minimum Spanning Tree is guaranteed to be unique."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Minimum+Spanning+Tree+Prims+Kruskals+MST+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Minimum Spanning Trees: Prim's and Kruskal's\n\nA Spanning Tree of connected undirected graph $G = (V, E)$ has $V - 1$ edges and no cycles.\n\n---\n\n## 1. Prim's Algorithm vs Kruskal's Algorithm\n\n| Feature | Prim's Algorithm | Kruskal's Algorithm |\n| :--- | :--- | :--- |\n| **Strategy** | Grows a single connected tree from root vertex | Grows a forest by adding smallest edge globally |\n| **Data Structure** | Min-Heap / Priority Queue | Disjoint Set Union (DSU) + Sorted Edges |\n| **Time Complexity** | $O(E \\log V)$ | $O(E \\log E) = O(E \\log V)$ |\n| **Preferred For** | Dense graphs ($E \\approx V^2$) | Sparse graphs ($E \\ll V^2$) |\n\n---\n\n## 2. Uniqueness Property\nIf all edge weights in the graph are distinct, the MST is **strictly unique**.\n",
      "questions": [
        {
          "id": "algo-mst-1",
          "question": "If all edge weights in a connected undirected graph are distinct, how many Minimum Spanning Trees exist?",
          "options": [
            "Exactly 1 (Unique)",
            "At least 2",
            "V - 1",
            "Depends on start vertex"
          ],
          "correct_option": 0,
          "explanation": "When all edge weights are strictly distinct, the cut property guarantees that the minimum edge across every cut is unique, resulting in a strictly unique MST."
        },
        {
          "id": "algo-mst-2",
          "question": "What is the time complexity of Kruskal's algorithm on a graph with V vertices and E edges?",
          "options": [
            "O(V^2)",
            "O(E log E)",
            "O(V + E)",
            "O(V log E)"
          ],
          "correct_option": 1,
          "explanation": "Kruskal's algorithm sorts E edges in O(E log E) time. DSU operations take O(E * α(V)). The dominant term is edge sorting: O(E log E) = O(E log V)."
        },
        {
          "id": "algo-mst-3",
          "question": "Which data structure is fundamentally utilized by Kruskal's algorithm to detect cycles when adding edges?",
          "options": [
            "Disjoint Set Union (DSU / Union-Find)",
            "Binary Search Tree",
            "Stack",
            "Adjacency Matrix"
          ],
          "correct_option": 0,
          "explanation": "Kruskal's algorithm sorts edges by weight and uses Disjoint Set Union (DSU) with find and union operations to check if two endpoints belong to the same component in near O(1) time."
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
      "companyTags": [
        "Google",
        "Amazon",
        "Uber",
        "Microsoft",
        "Meta"
      ],
      "keyTakeaways": [
        "Dijkstra's: Greedy algorithm using Min-Heap in O((V + E) log V); fails on negative edge weights.",
        "Bellman-Ford: Dynamic programming relaxing all E edges V - 1 times in O(V * E); detects negative weight cycles.",
        "A negative cycle reachable from source implies shortest path is -infinity.",
        "Floyd-Warshall: All-Pairs Shortest Path in O(V^3) time using adjacency matrix."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Shortest+Path+Algorithms+Dijkstras+Bellman+Ford+Floyd+Warshall+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Shortest Path Algorithms: Dijkstra, Bellman-Ford, and Floyd-Warshall\n\nDifferent graph topologies and edge weight constraints require specialized shortest path algorithms.\n\n---\n\n## 1. Comparative Architecture\n\n| Algorithm | Graph Type | Time Complexity | Negative Weights Allowed? | Negative Cycle Detection? |\n| :--- | :--- | :--- | :--- | :--- |\n| **BFS** | Unweighted graphs | $O(V + E)$ | N/A (all weights 1) | No |\n| **Dijkstra** | Non-negative edge weights | $O((V + E) \\log V)$ (Min-Heap) | **No** (fails on negative edges) | No |\n| **Bellman-Ford** | Directed/Undirected weighted | $O(V \\cdot E)$ | **Yes** | **Yes** (detects negative cycle in $V$-th pass) |\n| **Floyd-Warshall** | All-Pairs Shortest Path | $O(V^3)$ | **Yes** (no negative cycles) | Yes ($D[i][i] < 0$) |\n\n---\n\n## 2. Dijkstra's Algorithm (Greedy Approach)\n- Maintains set of vertices with finalized shortest path distances.\n- In each step, picks unvisited vertex $u$ with minimum distance estimate using a Min-Heap (Priority Queue).\n- Relaxes all adjacent edges $(u, v)$:\n  $$\\text{if } \\text{dist}[u] + w(u, v) < \\text{dist}[v] \\implies \\text{dist}[v] = \\text{dist}[u] + w(u, v)$$\n\n---\n\n## 3. Bellman-Ford Algorithm (Dynamic Programming)\n- Relaxes all $|E|$ edges sequentially $|V| - 1$ times.\n- If an edge relaxation is still possible on the $|V|$-th pass, the graph contains a **negative-weight cycle reachable from source**.\n",
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
        },
        {
          "id": "algo-sp-3",
          "question": "Why does Dijkstra's algorithm fail to guarantee correct shortest paths on graphs with negative edge weights?",
          "options": [
            "Because Dijkstra assumes once a vertex is marked visited with the minimum distance, its shortest path cannot be further reduced by longer paths with negative edges.",
            "Because priority queues cannot store negative numbers.",
            "Because Dijkstra requires undirected graphs only.",
            "Because negative weights cause infinite recursion in BFS."
          ],
          "correct_option": 0,
          "explanation": "Dijkstra relies on the greedy assumption that paths only grow longer as more edges are added. A negative edge encountered later could create a shorter path to an already-finalized vertex, invalidating its greedy invariant."
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
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Uber"
      ],
      "keyTakeaways": [
        "Topological sort exists if and only if the graph is a DAG (Directed Acyclic Graph).",
        "For every directed edge u -> v, u appears before v in the ordering.",
        "Kahn's Algorithm uses in-degrees: repeatedly dequeue nodes with in-degree 0; detects cycles if visited count < V.",
        "Applications: Build dependency resolution (make, gradle), task scheduling, course prerequisites."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Topological+Sorting+Kahns+Algorithm+DAG+Course+Schedule+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Topological Sorting\n\nA topological sort is a linear ordering of vertices such that for every directed edge $u \\to v$, $u$ comes before $v$.\n\n---\n\n## 1. Conditions\n- Defined **only** for Directed Acyclic Graphs (DAGs). If graph contains a cycle, no topological ordering exists.\n\n---\n\n## 2. Kahn's Algorithm (BFS-based)\n1. Compute in-degree for all vertices.\n2. Push all vertices with `in_degree == 0` into a Queue.\n3. While Queue is not empty:\n   - Dequeue node $u$, append to result list.\n   - For each neighbor $v$ of $u$, decrement `in_degree[v]`.\n   - If `in_degree[v] == 0`, enqueue $v$.\n4. If result list length $< V$, a cycle exists!\n",
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
        },
        {
          "id": "algo-topo-3",
          "question": "Kahn's algorithm for Topological Sorting uses which metric to determine which vertices can be processed next?",
          "options": [
            "In-degree equal to 0",
            "Out-degree equal to 0",
            "Maximum edge weight",
            "Node depth in DFS tree"
          ],
          "correct_option": 0,
          "explanation": "Kahn's algorithm initializes a queue with all vertices having in-degree 0 (no prerequisites). When a vertex is removed, its outgoing edges are deleted, decrementing neighbor in-degrees."
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
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Meta"
      ],
      "keyTakeaways": [
        "Backtracking builds candidate solutions incrementally and abandons (prunes) branches that violate constraints.",
        "Explores state-space tree using Depth-First Search.",
        "Template: Choose -> Explore (Recurse) -> Un-choose (Backtrack state).",
        "Classic benchmarks: N-Queens, Sudoku Solver, Subset Sum, Hamiltonian Path."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Backtracking+N+Queens+Sudoku+Solver+State+Space+Tree+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Backtracking: Systematic State Space Search\n\nBacktracking is a refined algorithmic paradigm that incrementally builds candidates to solutions and abandons (prunes) a candidate as soon as it determines it cannot be extended to a valid solution.\n\n---\n\n## 1. The Backtracking Framework\n```cpp\nvoid backtrack(State state) {\n    if (isGoal(state)) {\n        recordSolution(state);\n        return;\n    }\n    for (Choice choice : getValidChoices(state)) {\n        if (isValid(choice, state)) {\n            applyChoice(choice, state);     // Make move\n            backtrack(state);              // Explore subtree\n            undoChoice(choice, state);      // Backtrack (undo move)\n        }\n    }\n}\n```\n\n---\n\n## 2. Pruning & State Space Tree\n- **State Space Tree:** Represents all candidate configurations.\n- **Bounding Function / Pruner:** Evaluates partial solutions; cuts entire subtrees of exponential search space when constraints are violated.\n\n---\n\n## 3. Classic Problem Archetypes\n- **N-Queens Problem:** Place $N$ non-attacking queens on an $N \\times N$ chessboard.\n- **Sudoku Solver:** Fill $9 \\times 9$ grid respecting row, column, and $3 \\times 3$ box uniqueness.\n- **Subset Sum & Knapsack:** Enumerate subsets summing to target $K$.\n- **Hamiltonian Path & Traveling Salesperson Problem (TSP):** Visit every vertex exactly once.\n",
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
          "options": [
            "N - 1",
            "N",
            "2N",
            "N^2"
          ],
          "correct_option": 1,
          "explanation": "The N-Queens problem asks to place exactly N non-attacking queens on an N x N chessboard, with exactly one queen in each row and column."
        },
        {
          "id": "algo-bt-3",
          "question": "In the N-Queens problem on an N x N board, what is the purpose of the 'bounding function'?",
          "options": [
            "To check whether placing a queen on (row, col) is safe from existing queens on same column, main diagonal, and anti-diagonal before recursing.",
            "To count the total number of squares on the board.",
            "To generate all random permutations without checks.",
            "To calculate the memory consumed by the recursive call stack."
          ],
          "correct_option": 0,
          "explanation": "The bounding function validates row, column, and diagonal conflicts (row - col and row + col indices). If unsafe, it prunes the search branch immediately without exploring deeper."
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
      "companyTags": [
        "Google",
        "Meta",
        "Directi",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "Flow network: Directed graph with source s, sink t, and capacity c(u, v) on each edge.",
        "Capacity constraint: 0 <= f(u, v) <= c(u, v). Flow conservation: Inflow = Outflow for all v != s, t.",
        "Max-Flow Min-Cut Theorem: The maximum amount of flow from s to t equals the minimum capacity of an s-t cut.",
        "Edmonds-Karp uses BFS to find shortest augmenting paths in residual graph, running in O(V * E^2)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Max+Flow+Min+Cut+Ford+Fulkerson+Edmonds+Karp+Algorithms+lecture+tutorial",
      "notesMarkdown": "# Minimum Cut and Maximum Flow Basics\n\nNetwork flow problems model the optimal routing of commodities through directed networks with capacity-constrained edges.\n\n---\n\n## 1. Network Flow Fundamentals\n- A flow network $G = (V, E)$ has source $s$, sink $t$, and edge capacities $c(u, v) \\ge 0$.\n- **Flow Constraints:**\n  1. **Capacity Constraint:** $0 \\le f(u, v) \\le c(u, v)$ for all edges $(u, v)$.\n  2. **Flow Conservation:** For all vertices $u \\notin \\{s, t\\}$, total incoming flow equals total outgoing flow:\n     $$\\sum_{v} f(v, u) = \\sum_{v} f(u, v)$$\n\n---\n\n## 2. Max-Flow Min-Cut Theorem\n- **The Theorem:** The maximum value of an $(s, t)$-flow equals the minimum capacity of an $(s, t)$-cut.\n- An $(s, t)$-cut $(S, T)$ partitions $V$ into disjoint sets $S$ and $T = V \\setminus S$ with $s \\in S$ and $t \\in T$.\n- Cut capacity: $c(S, T) = \\sum_{u \\in S, v \\in T} c(u, v)$.\n\n---\n\n## 3. Algorithms\n- **Ford-Fulkerson Method:** Repeatedly find augmenting paths in the residual graph using DFS until none exist. Running time: $O(E \\cdot |f^*|)$.\n- **Edmonds-Karp Algorithm:** Finds shortest augmenting paths using BFS. Running time: $O(V \\cdot E^2)$ independent of edge capacities.\n- **Dinic's Algorithm:** Uses level graphs and blocking flows to achieve $O(V^2 E)$ time ($O(E \\sqrt{V})$ on unit networks like bipartite matching).\n",
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
          "options": [
            "O(V^3)",
            "O(V * E^2)",
            "O(E log V)",
            "O(V^2 * E)"
          ],
          "correct_option": 1,
          "explanation": "Edmonds-Karp uses BFS to select augmenting paths with the fewest edges, proving that total augmentations are O(V * E). Each BFS takes O(E), giving O(V * E^2)."
        },
        {
          "id": "algo-mf-3",
          "question": "In a flow network, what is the relationship between the Maximum Flow value from source to sink and the capacity of the Minimum Cut?",
          "options": [
            "They are exactly equal (Max-Flow Min-Cut Theorem).",
            "Maximum Flow is always strictly greater than Minimum Cut capacity.",
            "Maximum Flow is always half of Minimum Cut capacity.",
            "They are unrelated in directed graphs."
          ],
          "correct_option": 0,
          "explanation": "The fundamental Max-Flow Min-Cut Theorem by Ford and Fulkerson proves that the maximum possible amount of flow through a network equals the minimum capacity among all valid cuts separating source and sink."
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
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "IBM Research"
      ],
      "keyTakeaways": [
        "P: Decision problems solvable in polynomial time by a deterministic Turing machine.",
        "NP: Decision problems whose solutions can be verified in polynomial time.",
        "NP-Hard: At least as hard as the hardest problems in NP; any problem in NP reduces to it in polynomial time.",
        "NP-Complete: Both in NP AND NP-Hard. If ANY NP-Complete problem is solved in polynomial time, P = NP."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=P+vs+NP+NP+Complete+NP+Hard+Reductions+Cook+Levin+Algorithms+lecture+tutorial",
      "notesMarkdown": "# NP-Hardness, NP-Completeness, and Reductions\n\n---\n\n## 1. Complexity Classes\n- **P:** Solvable in polynomial time $O(n^k)$.\n- **NP (Nondeterministic Polynomial):** A candidate solution can be **verified** in polynomial time.\n- **NP-Hard:** Problem $H$ such that $\\forall L \\in NP$, $L \\le_P H$ (polynomial-time reduction).\n- **NP-Complete (NPC):** $X \\in NP$ AND $X \\in NP\\text{-Hard}$.\n\n---\n\n## 2. Classic NP-Complete Problems\n- Boolean Satisfiability (SAT / 3-SAT) (Cook-Levin Theorem)\n- Traveling Salesperson Problem (TSP Decision variant)\n- Vertex Cover\n- Hamiltonian Cycle\n- Clique Problem\n- 0/1 Knapsack (Decision variant)\n- Subset Sum\n",
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
        },
        {
          "id": "algo-np-3",
          "question": "What does the Cook-Levin Theorem establish in computational complexity theory?",
          "options": [
            "The Boolean Satisfiability problem (SAT) is NP-Complete.",
            "P is definitively equal to NP.",
            "All NP problems run in O(N log N) time.",
            "Halting problem is decidable in polynomial time."
          ],
          "correct_option": 0,
          "explanation": "The Cook-Levin Theorem proved that SAT (and 3-SAT) is NP-Complete, providing the first known NP-Complete problem from which all other NP-Complete problems can be proven via polynomial-time reductions."
        }
      ]
    }
  ]
};
