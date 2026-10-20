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
      "notesMarkdown": "# Asymptotic Analysis: Big-O, Big-Omega, Big-Theta & Growth Hierarchies\n\nAsymptotic analysis evaluates algorithm resource consumption (execution time and auxiliary memory) as the input scale $n$ approaches infinity ($n \\to \\infty$), abstracting away machine-specific hardware constants, CPU clock speeds, and compiler optimizations.\n\n---\n\n## 1. Formal Mathematical Definitions\n\nLet $f(n)$ and $g(n)$ be asymptotically non-negative functions ($f(n), g(n) \\ge 0$ for sufficiently large $n$):\n\n| Asymptotic Notation | Definition | Formal Mathematical Condition | Geometric Interpretation |\n| :--- | :--- | :--- | :--- |\n| **Big-O ($O$)** | Asymptotic Upper Bound | $\\exists c > 0, n_0 > 0$ such that $0 \\le f(n) \\le c \\cdot g(n), \\; \\forall n \\ge n_0$ | $f(n)$ grows no faster than $g(n)$ |\n| **Big-Omega ($\\Omega$)** | Asymptotic Lower Bound | $\\exists c > 0, n_0 > 0$ such that $0 \\le c \\cdot g(n) \\le f(n), \\; \\forall n \\ge n_0$ | $f(n)$ grows at least as fast as $g(n)$ |\n| **Big-Theta ($\\Theta$)** | Asymptotically Tight Bound | $\\exists c_1, c_2 > 0, n_0 > 0$ such that $c_1 g(n) \\le f(n) \\le c_2 g(n), \\; \\forall n \\ge n_0$ | $f(n)$ and $g(n)$ have identical growth rates |\n| **Little-o ($o$)** | Strict Upper Bound | $\\forall c > 0, \\exists n_0 > 0$ such that $0 \\le f(n) < c \\cdot g(n), \\; \\forall n \\ge n_0$ | $f(n)$ becomes insignificant relative to $g(n)$ |\n| **Little-omega ($\\omega$)** | Strict Lower Bound | $\\forall c > 0, \\exists n_0 > 0$ such that $0 \\le c \\cdot g(n) < f(n), \\; \\forall n \\ge n_0$ | $f(n)$ dominates $g(n)$ strictly |\n\n> [!NOTE]\n> **Theorem:** $f(n) = \\Theta(g(n)) \\iff f(n) = O(g(n)) \\text{ and } f(n) = \\Omega(g(n))$.\n\n---\n\n## 2. Limit Comparison Tests\n\nEvaluate $L = \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)}$ (using L'Hôpital's Rule $\\lim \\frac{f'(n)}{g'(n)}$ when encountering indeterminate forms $\\frac{\\infty}{\\infty}$):\n- **If $L = 0$:** $f(n) = o(g(n))$ and $f(n) = O(g(n))$, but $f(n) \\ne \\Theta(g(n))$.\n- **If $0 < L < \\infty$ (positive finite constant):** $f(n) = \\Theta(g(n))$, $f(n) = O(g(n))$, and $f(n) = \\Omega(g(n))$.\n- **If $L = \\infty$:** $f(n) = \\omega(g(n))$ and $f(n) = \\Omega(g(n))$, but $f(n) \\ne O(g(n))$.\n- **If $L$ does not exist (oscillates, e.g. $n^{1 + \\sin n}$):** The limit test is inconclusive; fall back to the formal $c, n_0$ definition.\n\n---\n\n## 3. Universal Growth Rate Hierarchy\n\nFrom slowest to fastest growing orders of magnitude as $n \\to \\infty$:\n$$1 < \\log(\\log n) < \\log n < \\sqrt{n} < n < n \\log n < n^2 < n^3 < 2^n < e^n < n! < n^n$$\n\n### Critical Logarithmic & Exponential Rules:\n1. $\\log_a n = \\Theta(\\log_b n)$ for any bases $a, b > 1$ (base does not affect Big-O because $\\log_a n = \\frac{\\log_b n}{\\log_b a}$ where $\\frac{1}{\\log_b a}$ is a constant).\n2. $2^{n+1} = 2 \\cdot 2^n = O(2^n)$, **BUT** $2^{2n} = (2^n)^2 = 4^n \\ne O(2^n)$!\n3. $\\log(n!) = \\Theta(n \\log n)$ by Stirling's approximation ($n! \\approx \\sqrt{2\\pi n} (n/e)^n$).\n4. For polynomials: $a_k n^k + a_{k-1} n^{k-1} + \\dots + a_0 = \\Theta(n^k)$.\n\n---\n\n## 4. Algebraic Properties of Asymptotic Notations\n- **Transitivity:** $f(n) = O(g(n)) \\land g(n) = O(h(n)) \\implies f(n) = O(h(n))$.\n- **Reflexivity:** $f(n) = O(f(n))$, $f(n) = \\Omega(f(n))$, $f(n) = \\Theta(f(n))$.\n- **Symmetry:** $f(n) = \\Theta(g(n)) \\iff g(n) = \\Theta(f(n))$.\n- **Transpose Symmetry:** $f(n) = O(g(n)) \\iff g(n) = \\Omega(f(n))$, and $f(n) = o(g(n)) \\iff g(n) = \\omega(f(n))$.\n",
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
      ],
      "prerequisites": [
        "Function Growth Rates",
        "Limits and Inequalities"
      ],
      "externalResources": [
        {
          "title": "Asymptotic Analysis of Algorithms — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Asymptotic Complexity (6.006) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
          "difficulty": "Intermediate",
          "isFree": true
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
      ],
      "prerequisites": [
        "Asymptotic Notations (Big-O, Omega, Theta)",
        "Search & Sort Algorithms"
      ],
      "externalResources": [
        {
          "title": "Worst, Average and Best Case Analysis — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/analysis-of-algorithms-set-2-asymptotic-analysis/",
          "difficulty": "Beginner",
          "isFree": true
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
          "question": "According to the Master Theorem, what is the asymptotic solution to the recurrence T(n) = 2T(n/2) + n^2?",
          "options": [
            "Θ(n^2)",
            "Θ(n log n)",
            "Θ(n^3)",
            "Θ(n)"
          ],
          "correct_option": 0,
          "explanation": "Here a = 2, b = 2, so n^(log_b a) = n^(log_2 2) = n^1. Since f(n) = n^2 = Ω(n^(1 + 1)), and regularity condition 2*(n/2)^2 = n^2/2 <= c * n^2 holds for c = 1/2 < 1, Master Theorem Case 3 applies: T(n) = Θ(f(n)) = Θ(n^2)."
        }
      ],
      "prerequisites": [
        "Recursion Trees",
        "Mathematical Induction"
      ],
      "externalResources": [
        {
          "title": "Master Theorem for Divide and Conquer Recurrences — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/master-theorem-for-divide-and-conquer-recurrences/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Divide & Conquer Recurrences — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Searching Algorithms & Binary Search Invariants\n\nSearching algorithms locate elements or decision boundaries across data sequences and mathematical solution spaces.\n\n---\n\n## 1. Linear vs. Binary Search Fundamentals\n\n- **Linear Search:** Evaluates each element sequentially. $O(N)$ worst-case, requires no ordering or indexing.\n- **Binary Search:** Operates over sorted (or monotonic) arrays by repeatedly bisecting the search window. Halves candidates each iteration, achieving guaranteed $O(\\log N)$ comparisons.\n\n### Canonical Loop Invariant & Overflow Prevention:\n```c\nint binarySearch(int arr[], int n, int target) {\n    int left = 0, right = n - 1;\n    while (left <= right) {\n        // Safe midpoint calculation avoids 32-bit signed overflow:\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1; // Target not found\n}\n```\n\n---\n\n## 2. Lower Bound & Upper Bound Semantics\n\nModern standard libraries (`std::lower_bound`, `std::upper_bound` in C++) define boundary searches over sorted sequences:\n\n1. **Lower Bound (`lower_bound`):**\n   - Finds the first index $i$ such that $\\text{arr}[i] \\ge \\text{target}$.\n   - If all elements are $< \\text{target}$, returns $N$ (the end iterator).\n   ```cpp\n   int lowerBound(const vector<int>& arr, int target) {\n       int low = 0, high = arr.size();\n       while (low < high) {\n           int mid = low + (high - low) / 2;\n           if (arr[mid] >= target) high = mid;\n           else low = mid + 1;\n       }\n       return low;\n   }\n   ```\n2. **Upper Bound (`upper_bound`):**\n   - Finds the first index $i$ such that $\\text{arr}[i] > \\text{target}$.\n   - The number of occurrences of `target` equals $\\text{upper\\_bound} - \\text{lower\\_bound}$.\n\n---\n\n## 3. Binary Search on the Answer Space (Predicate Inversion)\n\nWhen optimizing a function $f(x)$ over an answer space where $P(x)$ transitions monotonically from `False -> True` (or `True -> False`):\n- **Template:**\n  ```cpp\n  int low = MIN_ANS, high = MAX_ANS, ans = -1;\n  while (low <= high) {\n      int mid = low + (high - low) / 2;\n      if (isValid(mid)) {\n          ans = mid;         // Record candidate\n          high = mid - 1;    // Search for smaller feasible answer (if minimizing)\n      } else {\n          low = mid + 1;\n      }\n  }\n  ```\n- **Classic Applications:** Painter's Partition, Allocate Minimum Number of Pages, Aggressive Cows, Capacity To Ship Packages Within D Days, Koko Eating Bananas.\n\n---\n\n## 4. Exponential (Galloping) & Ternary Search\n\n1. **Exponential Search ($O(\\log i)$):**\n   - Used for unbounded, streaming, or very large arrays where the target index $i$ is small compared to $N$.\n   - Phase 1: Bound the target range by exponentially doubling step sizes: $k = 1, 2, 4, 8, \\dots$ until $\\text{arr}[2^k] \\ge \\text{target}$.\n   - Phase 2: Binary search within the bounded window $[2^{k-1}, \\min(2^k, N-1)]$.\n2. **Ternary Search ($O(\\log_3 N)$):**\n   - Finds the maximum or minimum of a **unimodal function** (strictly increasing then strictly decreasing, or vice-versa).\n   - Divides range into 3 parts with $m_1 = l + (r - l)/3$ and $m_2 = r - (r - l)/3$.\n   - Evaluates $f(m_1)$ vs $f(m_2)$ to discard one-third of the search space per iteration.\n",
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
          "question": "In standard libraries (such as C++ std::lower_bound or Java binary search), what does lower_bound on a sorted collection return?",
          "options": [
            "An iterator/index pointing to the first element that is NOT LESS than (>=) the target value.",
            "An iterator/index to the first element strictly greater than (>) the target value.",
            "The exact index of target, or -1 if the element is not found.",
            "The largest element strictly smaller than the target value."
          ],
          "correct_option": 0,
          "explanation": "std::lower_bound locates the first element in [first, last) which does not compare less than target (i.e. element >= target). In contrast, upper_bound returns the first element strictly greater than target (element > target)."
        }
      ],
      "prerequisites": [
        "Arrays and Monotonicity",
        "Linear vs Logarithmic Time"
      ],
      "externalResources": [
        {
          "title": "Binary Search and Search Algorithms — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/searching-algorithms/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Algorithms & Search: Week 3 — Harvard CS50",
          "provider": "Harvard CS50",
          "url": "https://cs50.harvard.edu/x/2024/weeks/3/",
          "difficulty": "Beginner",
          "isFree": true
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
      "notesMarkdown": "# Sorting Algorithms: Stability, Comparison Bounds, and Linear Sorts\n\nSorting arranges elements in a specified order. Understanding the trade-offs between comparison sorts ($O(N \\log N)$ lower bound) and non-comparison sorts ($O(N)$ linear time) is an essential algorithmic competency.\n\n---\n\n## 1. Classical Sorting Algorithms Compared\n\n| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | Key Mechanism |\n| :--- | :--- | :--- | :--- | :--- | :---: | :--- |\n| **Insertion Sort** | $\\mathbf{O(N)}$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | **YES** | Sifts elements into sorted prefix (fast for nearly sorted) |\n| **Merge Sort** | $O(N \\log N)$| $O(N \\log N)$| $O(N \\log N)$| $O(N)$ | **YES** | Divide and conquer; external sorting standard |\n| **QuickSort** | $O(N \\log N)$| $\\mathbf{O(N \\log N)}$| $O(N^2)$ | $O(\\log N)$ | NO | Partitioning around pivot; cache-friendly |\n| **HeapSort** | $O(N \\log N)$| $O(N \\log N)$| $O(N \\log N)$| $\\mathbf{O(1)}$| NO | Priority queue selection; in-place guarantee |\n| **Counting Sort** | $O(N + K)$ | $O(N + K)$ | $O(N + K)$ | $O(K)$ | **YES** | Array index histogram (requires discrete range $K$) |\n| **Radix Sort** | $O(d(N + K))$| $O(d(N+K))$ | $O(d(N+K))$ | $O(N + K)$ | **YES** | Digit-by-digit sorting via stable counting sort |\n\n---\n\n## 2. The $\\Omega(N \\log N)$ Comparison Lower Bound\n\n```\nTheorem:\nAny comparison-based sorting algorithm requires AT LEAST Omega(N log N)\ncomparisons in the worst case!\n```\n\n### Proof via Decision Tree Model:\n1. An array of $N$ distinct elements has $N!$ possible permutations.\n2. Every comparison has 2 outcomes ($\\le$ or $>$), corresponding to a binary decision tree.\n3. To distinguish all $N!$ permutations, the binary tree must contain at least $N!$ leaves:\n   $$\\text{Leaves} = 2^h \\ge N! \\implies h \\ge \\log_2(N!)$$\n4. By Stirling's Approximation ($\\ln(N!) \\approx N \\ln N - N$):\n   $$h \\ge \\sum_{i=1}^N \\log_2 i \\ge \\sum_{i=N/2}^N \\log_2(N/2) = \\frac{N}{2} \\log_2\\left(\\frac{N}{2}\\right) = \\mathbf{\\Omega(N \\log N)}$$\n\n---\n\n## 3. Stability in Sorting Algorithms\n\nA sorting algorithm is **Stable** if elements with identical keys preserve their relative original order after sorting.\n- Essential when sorting multi-attribute records (e.g., sort employees by Name, then stably sort by Department $\\implies$ within each department, names remain alphabetized!).\n- *Inherently Stable:* Merge Sort, Insertion Sort, Bubble Sort, Counting Sort.\n- *Inherently Unstable:* QuickSort, HeapSort, Selection Sort (due to long-distance swaps).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Comparison Lower Bound:** $\\Omega(N \\log N)$ comparisons.\n- **Linear Time Exception:** Non-comparison sorts (Counting, Radix) achieve $O(N)$ when keys are bounded integers.\n- **QuickSort Worst-Case:** $O(N^2)$ occurs when pivot is consistently extreme (solved via randomized pivot or median-of-three).\n",
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
          "question": "What is meant by a 'Stable' sorting algorithm, and which of the following is inherently Stable?",
          "options": [
            "A stable sort preserves the original relative order of elements with equal keys; Merge Sort is stable.",
            "A stable sort never runs slower than O(N log N); Quick Sort is stable.",
            "A stable sort operates strictly with O(1) auxiliary RAM; Heap Sort is stable.",
            "A stable sort performs no recursive function calls; Selection Sort is stable."
          ],
          "correct_option": 0,
          "explanation": "A sorting algorithm is stable if records with identical keys appear in the same relative order in the sorted output as they were in the input. Merge Sort and Insertion Sort are naturally stable, whereas Quick Sort and Heap Sort are unstable because long-distance swaps can reorder duplicate keys."
        }
      ],
      "prerequisites": [
        "Asymptotic Big-O analysis and recursion",
        "Array indexing and binary representations"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Sorting - Insertion Sort, Merge Sort, and QuickSort",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Sorting Algorithms Overview",
          "url": "https://www.geeksforgeeks.org/sorting-algorithms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Sorting Algorithms Comparison and Stability Guide",
          "url": "https://www.interviewbit.com/sorting-algorithms/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Divide and Conquer Paradigm\n\nThe **Divide and Conquer** algorithmic design paradigm breaks a computationally hard problem into independent subproblems of the same type, solves them recursively, and merges their solutions into the overall answer. It forms the backbone of highly efficient sorting, computational geometry, fast arithmetic, and parallel algorithms.\n\n---\n\n## 1. The Three Algorithmic Phases\n\n1. **Divide:** Partition the initial problem instance of size $n$ into $a$ smaller, disjoint subproblems, each of size $n/b$.\n2. **Conquer:** Recursively solve each of the $a$ subproblems. If the subproblem size is sufficiently small (base case, e.g. $n \\le 1$), solve it directly via constant-time operations.\n3. **Combine:** Assemble the subproblem solutions into the unified solution for the original instance in $f(n)$ time.\n\n---\n\n## 2. Recurrence Relations & The Master Theorem\n\nA canonical divide-and-conquer recurrence follows:\n$$T(n) = aT\\left(\\frac{n}{b}\\right) + f(n)$$\nWhere:\n- $a \\ge 1$: Number of recursive subproblems generated per step.\n- $b > 1$: Factor by which input size shrinks.\n- $f(n)$: Cost of dividing the problem and combining the sub-solutions.\n\nThe runtime behavior is determined by comparing $f(n)$ with the watershed function $n^{\\log_b a}$:\n- **Case 1 ($f(n) = O(n^{\\log_b a - \\epsilon})$):** Subproblem leaves dominate $\\implies T(n) = \\Theta(n^{\\log_b a})$.\n- **Case 2 ($f(n) = \\Theta(n^{\\log_b a} \\log^k n)$):** Work is evenly distributed across levels $\\implies T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.\n- **Case 3 ($f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity condition holds):** Root work dominates $\\implies T(n) = \\Theta(f(n))$.\n\n---\n\n## 3. Landmark Divide and Conquer Algorithms\n\n| Algorithm | Recurrence Relation | Time Complexity | Key Algorithmic Insight |\n| :--- | :--- | :--- | :--- |\n| **Binary Search** | $T(n) = T(n/2) + O(1)$ | $O(\\log n)$ | Eliminates half the search space with one comparison in a sorted array. |\n| **Merge Sort** | $T(n) = 2T(n/2) + O(n)$ | $O(n \\log n)$ | Stable sort; linear-time two-pointer merge subroutine. |\n| **Quick Sort** | $T(n) = T(k) + T(n-k-1) + O(n)$ | $O(n \\log n)$ avg, $O(n^2)$ worst | In-place partitioning around a pivot; cache-friendly. |\n| **Karatsuba Multiplication** | $T(n) = 3T(n/2) + O(n)$ | $O(n^{\\log_2 3}) \\approx O(n^{1.585})$ | Multiplies two $n$-digit numbers using 3 sub-multiplications instead of 4: $z_1 = (x_1+x_0)(y_1+y_0) - z_2 - z_0$. |\n| **Strassen's Matrix Mult.** | $T(n) = 7T(n/2) + O(n^2)$ | $O(n^{\\log_2 7}) \\approx O(n^{2.807})$ | Multiplies $2 \\times 2$ block matrices using 7 multiplications instead of 8 using algebraic identities. |\n| **Closest Pair of Points (2D)**| $T(n) = 2T(n/2) + O(n)$ | $O(n \\log n)$ | Finds nearest pair in Euclidean plane by dividing vertically and checking a $2\\delta$ strip where each point tests at most 7 neighbors. |\n\n---\n\n## 4. Divide and Conquer vs. Dynamic Programming\n\nA common interview trap is confusing when to use Divide and Conquer versus Dynamic Programming:\n\n- **Divide and Conquer:** Suitable when subproblems are **completely disjoint and non-overlapping** (e.g. left and right halves in Merge Sort).\n- **Dynamic Programming:** Mandatory when subproblems **overlap extensively** (e.g., Fibonacci numbers, Matrix Chain Multiplication, Longest Common Subsequence). Applying pure divide and conquer to overlapping subproblems causes exponential $O(2^n)$ explosion due to redundant recalculation.\n",
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
      ],
      "prerequisites": [
        "Recursion and Base Cases",
        "Array Partitioning"
      ],
      "externalResources": [
        {
          "title": "Divide and Conquer Algorithms — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/",
          "difficulty": "Intermediate",
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
      "notesMarkdown": "# Greedy Algorithms: Theory, Proofs & Paradigm\n\nA **greedy algorithm** builds a solution piece-by-piece, always choosing the immediate next piece that offers the most obvious and immediate benefit (the locally optimal choice), without ever reconsidering previous choices or backtracking.\n\n---\n\n## 1. Necessary Properties for Greedy Optimality\n\nA greedy approach provably yields the global optimum if and only if the problem exhibits both:\n\n1. **Greedy-Choice Property:** A globally optimal solution can be arrived at by making locally optimal (greedy) choices without looking ahead or revising past choices.\n2. **Optimal Substructure:** An optimal solution to the overall problem contains within it optimal solutions to its subproblems.\n\n---\n\n## 2. Techniques for Proving Greedy Correctness\n\nIn competitive programming and technical interviews, greedy solutions must be rigorously justified using one of two proof techniques:\n\n1. **Exchange Argument (Proof by Contradiction / Cut-and-Paste):**\n   - Assume there exists an optimal solution $O$ that differs from greedy solution $G$.\n   - Find the first choice where $O$ deviates from $G$.\n   - Show that modifying $O$ to adopt the greedy choice produces a new solution $O'$ that is at least as good as $O$.\n   - Inductively transform $O$ into $G$ without degrading quality, proving $G$ is also optimal.\n2. **Greedy Stays Ahead:**\n   - Measure progress via an invariant at each step $k$ (e.g., finish time, weight filled).\n   - Inductively prove that the greedy choice at step $k$ is at least as far advanced as any hypothetical alternative sequence of choices.\n\n---\n\n## 3. Canonical Greedy Algorithms & Trade-Offs\n\n| Algorithm / Problem | Greedy Criterion | Time Complexity | Notes & Proof Insight |\n| :--- | :--- | :--- | :--- |\n| **Activity Selection** | Earliest finish time ($f_i$) | $O(N \\log N)$ | Maximizes residual time available for remaining non-conflicting tasks. |\n| **Fractional Knapsack** | Highest value density ($v_i / w_i$) | $O(N \\log N)$ | Items are divisible; greedy packing provably optimal. |\n| **0/1 Knapsack (Fails!)** | $v_i / w_i$ fails | $O(N \\cdot W)$ DP | Non-divisibility leaves unused capacity; requires Dynamic Programming. |\n| **Huffman Coding** | Lowest 2 character frequencies | $O(N \\log N)$ | Min-heap merges minimal frequencies; yields optimal prefix-free code. |\n| **Job Sequencing with Deadlines** | Highest profit in latest available slot | $O(N \\log N + N \\cdot D)$ or $O(N \\alpha(D))$ | Solved greedily with Disjoint Set Union (DSU) to find nearest free day. |\n| **Prim's & Kruskal's MST** | Minimum edge weight without cycle | $O(E \\log V)$ | Relies on the Cut Property of Spanning Trees. |\n",
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
          "question": "In Huffman Coding for lossless data compression, what data structure is used to repeatedly combine the two lowest-frequency character nodes in O(N log N) total time?",
          "options": [
            "Min-Heap (Priority Queue)",
            "Max-Heap",
            "Doubly Linked List",
            "Hash Table"
          ],
          "correct_option": 0,
          "explanation": "Huffman coding builds an optimal prefix tree by repeatedly extracting the two smallest frequency symbols from a Min-Heap, merging them under a new parent whose frequency is their sum, and reinserting the parent. With N symbols, 2(N-1) heap operations execute in O(N log N) total time."
        }
      ],
      "prerequisites": [
        "Optimal Substructure",
        "Sorting Invariants"
      ],
      "externalResources": [
        {
          "title": "Greedy Algorithms and Proof of Correctness — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/greedy-algorithms/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Design and Analysis of Algorithms (6.046J) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/",
          "difficulty": "Advanced",
          "isFree": true
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
      "notesMarkdown": "# Dynamic Programming: Memoization, Tabulation, and Classical Patterns\n\nDynamic Programming (DP), formulated by Richard Bellman in 1953, is an algorithmic optimization paradigm that solves complex problems by breaking them down into overlapping subproblems, storing subproblem solutions to avoid redundant recalculation.\n\n---\n\n## 1. The Two Essential Ingredients for Dynamic Programming\n\nA problem can be solved with Dynamic Programming if and only if it exhibits:\n\n1. **Optimal Substructure:**\n   An optimal solution to the overall problem incorporates optimal solutions to its constituent subproblems (e.g., Shortest Path from $A \\to C$ via $B$ consists of Shortest Path $A \\to B$ + Shortest Path $B \\to C$).\n2. **Overlapping Subproblems:**\n   A naive recursive formulation revisits the identical subproblems repeatedly across different branches of the recursion tree (e.g., computing `fib(5)` solves `fib(3)` multiple times).\n\n---\n\n## 2. Top-Down (Memoization) vs Bottom-Up (Tabulation)\n\n```\nTOP-DOWN MEMOIZATION:                             BOTTOM-UP TABULATION:\nRecursive structure preserved.                    Iterative array loop.\nCache results in hash table/array on return.      Compute from smallest base case upward.\n(Easy to write, but call stack overhead).         (Optimal performance, zero stack recursion).\n```\n\n---\n\n## 3. Classical Pattern: 0/1 Knapsack Problem\n\nGiven $N$ items with weights $w_i$ and values $v_i$, maximize total value within weight capacity $W$.\n- **State Definition:** $dp[i][w]$ = Maximum value using a subset of first $i$ items with capacity $w$.\n- **Recurrence Relation:**\n  $$dp[i][w] = \\begin{cases} dp[i-1][w] & \\text{if } w_i > w \\\\ \\max(dp[i-1][w], \\quad v_i + dp[i-1][w - w_i]) & \\text{if } w_i \\le w \\end{cases}$$\n- **Complexity:** $O(N \\cdot W)$ time and $O(W)$ space (using 1D rolling array optimization).\n\n---\n\n## 4. Classical Pattern: Longest Common Subsequence (LCS)\n\nGiven strings $X[1\\dots m]$ and $Y[1\\dots n]$:\n- **Recurrence Relation:**\n  $$LCS(i, j) = \\begin{cases} 1 + LCS(i-1, j-1) & \\text{if } X[i] == Y[j] \\\\ \\max(LCS(i-1, j), \\quad LCS(i, j-1)) & \\text{if } X[i] \\ne Y[j] \\end{cases}$$\n- **Complexity:** $O(m \\cdot n)$ time and space.\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **DP Recipe:** State Definition $\\to$ Base Cases $\\to$ Transition Relation $\\to$ Order of Computation.\n- **Space Optimization:** If transition requires only previous row ($i-1$), space can always be compressed from $O(N \\times W)$ to $O(W)$!\n- **Pseudo-Polynomial Time:** $O(N \\cdot W)$ for Knapsack is pseudo-polynomial because it scales with numeric value $W$, not bit length $\\log_2 W$.\n",
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
          "question": "Why is the standard Dynamic Programming solution to the 0/1 Knapsack problem with N items and capacity W classified as 'pseudo-polynomial' rather than polynomial time?",
          "options": [
            "Its runtime O(N * W) depends on the numeric magnitude of W, which is exponential in the input length (log2 W bits).",
            "It produces an approximate result rather than an exact optimal solution.",
            "It requires sorting all items by value-to-weight ratio in advance.",
            "It can only be solved using top-down recursion with memoization."
          ],
          "correct_option": 0,
          "explanation": "An algorithm is pseudo-polynomial if its runtime is polynomial in the numeric value of an input parameter W rather than the number of bits required to encode W (which is log2 W). If W is large (e.g. 2^64), O(N * W) becomes strictly exponential in the input bit-size."
        }
      ],
      "prerequisites": [
        "Recursion, call stacks, and memoization",
        "Divide and conquer algorithms"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Dynamic Programming - Memoization and Tabulation",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Dynamic Programming (DP) Tutorial",
          "url": "https://www.geeksforgeeks.org/dynamic-programming/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Dynamic Programming Patterns and Problem Solving",
          "url": "https://www.interviewbit.com/dynamic-programming-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
      ],
      "prerequisites": [
        "Graph Representations (Adjacency Matrix/List)",
        "Stacks and Queues"
      ],
      "externalResources": [
        {
          "title": "Graph Traversals (BFS and DFS) — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Breadth-First Search (6.006) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
          "difficulty": "Intermediate",
          "isFree": true
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
      "notesMarkdown": "# Minimum Spanning Trees (MST): Cut Property, Kruskal's, and Prim's Algorithms\n\nGiven a connected, undirected graph $G = (V, E)$ with edge weights, a **Spanning Tree** is a subgraph that connects all $V$ vertices without cycles ($|V| - 1$ edges). A **Minimum Spanning Tree (MST)** minimizes total edge weight sum.\n\n---\n\n## 1. The Cut Property (Foundational Greedy Choice)\n\nLet $S \\subset V$ be any subset of vertices, defining a cut $(S, V - S)$ that partitions the graph.\n- An edge $(u, v)$ **crosses the cut** if $u \\in S$ and $v \\in V - S$.\n- **The Cut Property Theorem:** If edge $e$ is the **strictly lightest edge crossing cut $(S, V - S)$**, then edge $e$ **MUST belong to the Minimum Spanning Tree**!\n\n---\n\n## 2. Kruskal's Algorithm (Edge-Centric Greedy)\n\nSorts all edges and greedily adds the lightest edge that does not form a cycle:\n\n```\n1. Sort all edges E by weight ascending: O(E log E).\n2. Initialize Disjoint Set Union (DSU) with V singleton sets.\n3. For each edge (u, v) in sorted order:\n   - If find(u) != find(v): (Nodes belong to different components!)\n     - Add edge (u, v) to MST.\n     - union(u, v).\n   - If find(u) == find(v): Skip edge (adding would create a cycle!).\n4. Stop when MST contains V - 1 edges.\n```\n\n- **Time Complexity:** Sorting edges takes $O(E \\log E)$. DSU operations with Path Compression and Union by Rank take $O(E \\cdot \\alpha(V))$.\n  $$\\mathbf{T_{\\text{Kruskal}} = O(E \\log E) = O(E \\log V)}$$\n- **Best For:** **Sparse Graphs** ($E \\ll V^2$).\n\n---\n\n## 3. Prim's Algorithm (Vertex-Centric Greedy)\n\nGrows a single tree from an arbitrary starting vertex by always picking the lightest crossing edge:\n\n```\n1. Initialize Min-Heap with start vertex (key = 0, all other keys = infinity).\n2. While Min-Heap is not empty:\n   - Extract vertex u with minimum key: u is now added to MST.\n   - For each neighbor v of u:\n     - If v is still in Min-Heap and weight(u, v) < key[v]:\n       - Update key[v] = weight(u, v).\n       - Record parent[v] = u.\n       - Decrease-Key operation in Min-Heap.\n```\n\n- **Time Complexity with Binary Heap:** $O(V \\log V + E \\log V) = \\mathbf{O(E \\log V)}$.\n- **Time Complexity with Fibonacci Heap:** $\\mathbf{O(E + V \\log V)}$ (optimal for dense graphs!).\n- **Best For:** **Dense Graphs** ($E \\approx V^2$).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Spanning Tree Edges:** Exactly $V - 1$ edges.\n- **Unique MST Condition:** If all edge weights are distinct, the MST is **provably unique**.\n- **Kruskal's vs Prim's:** Kruskal's sorts edges (DSU); Prim's expands tree from vertex (Min-Heap).\n- **Cycle Property:** The heaviest edge in any cycle cannot belong to the MST.\n",
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
      ],
      "prerequisites": [
        "Graph representations: adjacency lists and matrices",
        "Priority queues (heaps) and disjoint set unions (DSU)"
      ],
      "externalResources": [
        {
          "title": "MIT 6.006: Minimum Spanning Trees (Prim and Kruskal)",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Kruskal's and Prim's Minimum Spanning Tree",
          "url": "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: MST Properties and Disjoint Set Union (DSU)",
          "url": "https://www.interviewbit.com/graph-data-structure-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
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
          "question": "In the Floyd-Warshall algorithm for All-Pairs Shortest Paths, what condition indicates that the input graph contains a negative-weight cycle?",
          "options": [
            "If any diagonal element dist[i][i] becomes negative (< 0) at the end of the algorithm.",
            "If the algorithm takes more than V^3 iterations.",
            "If the sum of all elements in the distance matrix is zero.",
            "If the path matrix contains asymmetric entries."
          ],
          "correct_option": 0,
          "explanation": "The distance from any vertex i to itself starts at 0. If dist[i][i] becomes negative (< 0) during Floyd-Warshall, it means there exists a path from i back to i with negative total weight, which confirms the existence of a negative cycle."
        }
      ],
      "prerequisites": [
        "Weighted Graphs",
        "Priority Queues / Min-Heaps"
      ],
      "externalResources": [
        {
          "title": "Dijkstra and Bellman-Ford Shortest Path — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Shortest Paths Algorithms — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
          "difficulty": "Intermediate",
          "isFree": true
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
      "youtube_url": "https://www.youtube.com/results?search_query=Topological+Sorting+Kahns+Algorithm+DFS+DAG+algorithms+lecture",
      "notesMarkdown": "# Topological Sorting, Kahn's Algorithm & DAG Dependency Resolution\n\nA **Topological Sort** of a directed graph $G = (V, E)$ is a linear ordering of all its vertices such that for every directed edge $(u, v) \\in E$, vertex $u$ appears before vertex $v$ in the sequence. In software engineering, this represents scheduling tasks where edge $(u, v)$ signifies that task $u$ must finish before task $v$ can commence.\n\n---\n\n## 1. Existence Conditions & Fundamental Theorems\n\n- **The DAG Condition:** A directed graph has a topological sort **if and only if it is a Directed Acyclic Graph (DAG)**.\n- **Source and Sink Lemma:** Every finite DAG possesses at least one **source** (a vertex with $\\text{in-degree} = 0$) and at least one **sink** (a vertex with $\\text{out-degree} = 0$).\n- **Non-Uniqueness:** A topological sort is not necessarily unique. A DAG has a **unique** topological sort if and only if it contains a Hamiltonian path (a directed path visiting every vertex).\n\n```\n   DAG Example:                   Topological Ordering:\n        (A) ------> (B)\n         |           |\n         v           v\n        (C) ------> (D)           Valid Orders: [A, B, C, D] or [A, C, B, D]\n```\n\n---\n\n## 2. Algorithm 1: Kahn's Algorithm (BFS In-Degree Removal)\n\nKahn's algorithm repeatedly extracts vertices that have no unfulfilled dependencies (in-degree $= 0$).\n\n### Step-by-Step Procedure:\n1. Compute the in-degree of every vertex by scanning all edges: $\\text{in-degree}[v] = |\\{u \\mid (u, v) \\in E\\}|$.\n2. Initialize a Queue $Q$ and enqueue all vertices with $\\text{in-degree}[u] == 0$.\n3. Initialize an empty list `topo_order`.\n4. While $Q$ is not empty:\n   - Dequeue vertex $u$ and append to `topo_order`.\n   - For each outgoing neighbor $v$ of $u$ ($u \\to v$):\n     - Decrement $\\text{in-degree}[v]$ by 1.\n     - If $\\text{in-degree}[v] == 0$, enqueue $v$.\n5. **Cycle Detection Check:** If `topo_order.size() == V`, the ordering is valid. If `topo_order.size() < V`, the graph contains at least one **directed cycle** (vertices in a cycle never reach in-degree 0).\n\n- **Time Complexity:** $O(V + E)$ using an Adjacency List.\n- **Space Complexity:** $O(V)$ for the in-degree array and FIFO queue.\n\n---\n\n## 3. Algorithm 2: DFS Post-Order Reversal (Tarjan's Method)\n\nTopological sort can also be computed via Depth-First Search:\n1. Run DFS on the graph, maintaining a visited state for each vertex (`UNVISITED`, `VISITING`, `VISITED`).\n2. When a node's DFS traversal finishes (all descendants visited), push the node onto a **Stack** (or append to a list).\n3. If during traversal we encounter a neighbor with state `VISITING`, a **back-edge** exists, proving a cycle.\n4. Pop all vertices from the stack: the resulting sequence is a valid topological sort (reverse of post-order finishing times: $v.f$).\n\n- **Time Complexity:** $O(V + E)$.\n- **Space Complexity:** $O(V)$ recursion stack depth.\n\n---\n\n## 4. Production Engineering Applications\n- **Build Systems (Make, Bazel, Gradle):** Compiling source modules in dependency order.\n- **Package Managers (npm, pip, Maven):** Resolving package installation DAGs.\n- **Spreadsheet Formula Calculation Engine (Excel):** Evaluating cells so that dependent cells (`=A1+B1`) calculate only after operands are resolved.\n- **Database Foreign Key Schema Migration:** Creating tables referenced by foreign keys before creating referencing child tables.\n",
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
      ],
      "prerequisites": [
        "Directed Acyclic Graphs (DAG)",
        "DFS and In-Degrees"
      ],
      "externalResources": [
        {
          "title": "Topological Sorting and Kahn's Algorithm — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/topological-sorting/",
          "difficulty": "Intermediate",
          "isFree": true
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
      ],
      "prerequisites": [
        "Recursion Trees",
        "State-Space Pruning"
      ],
      "externalResources": [
        {
          "title": "Backtracking Paradigm (N-Queens, Sudoku) — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/backtracking-algorithms/",
          "difficulty": "Intermediate",
          "isFree": true
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
      ],
      "prerequisites": [
        "Flow Networks and Capacities",
        "Augmenting Paths"
      ],
      "externalResources": [
        {
          "title": "Ford-Fulkerson Algorithm for Maximum Flow — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/ford-fulkerson-algorithm-for-maximum-flow-problem/",
          "difficulty": "Advanced",
          "isFree": true
        },
        {
          "title": "Network Flows (6.046J) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/",
          "difficulty": "Advanced",
          "isFree": true
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
      "notesMarkdown": "# Computational Complexity: P, NP, NP-Completeness & Reductions\n\nComputational complexity classifies decision problems according to the intrinsic difficulty of solving them with respect to deterministic and non-deterministic Turing machines.\n\n---\n\n## 1. Complexity Classes\n\n```\n                 Complexity Landscape (Assuming P ≠ NP)\n        +---------------------------------------------------+\n        |                      NP-HARD                      |\n        |  +---------------------------------------------+  |\n        |  |                     NP                      |  |\n        |  |  +---------------+       +---------------+  |  |\n        |  |  |       P       |       |  NP-COMPLETE  |  |  |\n        |  |  | (e.g. Sorting,|       |  (e.g. 3-SAT, |  |  |\n        |  |  |   BFS, MST)   |       |   TSP, Clique)|  |  |\n        |  |  +---------------+       +---------------+  |  |\n        |  +---------------------------------------------+  |\n        |                   (e.g. Halting Problem)          |\n        +---------------------------------------------------+\n```\n\n### Definitions:\n- **P (Polynomial Time):** Decision problems solvable by a deterministic algorithm in $O(n^k)$ time (e.g., Shortest Paths, 2-SAT, Primality testing via AKS).\n- **NP (Nondeterministic Polynomial Time):** Decision problems where a candidate solution (certificate) can be **verified in polynomial time** by a deterministic verifier, OR solved by a non-deterministic Turing machine in polynomial time.\n- **NP-Hard:** A problem $H$ is NP-Hard if **every problem in NP can be reduced to $H$ in polynomial time** ($\\forall L \\in NP, \\; L \\le_P H$). $H$ does not need to be in NP (e.g., the Halting Problem is NP-Hard and undecidable).\n- **NP-Complete (NPC):** The hardest problems in NP. A problem $X$ is NP-Complete if and only if:\n  1. $X \\in NP$, AND\n  2. $X \\in NP\\text{-Hard}$.\n\n> [!IMPORTANT]\n> **The Million-Dollar Implication:** If **any single** NP-Complete problem is proven to have a polynomial-time algorithm, then **$P = NP$**.\n\n---\n\n## 2. Polynomial-Time Reductions ($A \\le_P B$)\n\nA language $A$ is polynomial-time reducible to $B$ ($A \\le_P B$) if there exists a polynomial-time computable function $f$ such that:\n$$w \\in A \\iff f(w) \\in B$$\n\n### Crucial Directionality Theorems:\n1. If $A \\le_P B$ and $B \\in P \\implies A \\in P$ *(If $B$ is easy, $A$ is easy)*.\n2. If $A \\le_P B$ and $A \\notin P \\implies B \\notin P$ *(Contrapositive: If $A$ is hard, $B$ is hard)*.\n3. **Proving NP-Completeness:** To prove a new problem $Y$ is NP-Complete:\n   - Step 1: Prove $Y \\in NP$ (provide a certificate and polynomial-time verification algorithm).\n   - Step 2: Pick a **known NP-Complete problem $X$** and construct a polynomial reduction $X \\le_P Y$ (Reduce KNOWN to NEW!).\n\n---\n\n## 3. The Cook-Levin Theorem & Karp's 21 NP-Complete Problems\n- **Cook-Levin Theorem (1971):** Proved from first principles that **Boolean Satisfiability (SAT / 3-SAT)** is NP-Complete by showing any nondeterministic Turing machine computation can be encoded as a CNF Boolean formula.\n- **Karp's Foundational Reductions:**\n  $$\\text{SAT} \\le_P \\text{3-SAT} \\le_P \\text{Vertex Cover} \\le_P \\text{Clique} \\le_P \\text{Independent Set}$$\n  $$\\text{3-SAT} \\le_P \\text{Hamiltonian Cycle} \\le_P \\text{Traveling Salesperson Problem (TSP)}$$\n  $$\\text{3-SAT} \\le_P \\text{Subset Sum} \\le_P \\text{0/1 Knapsack Decision}$$\n",
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
          "question": "If problem A reduces to problem B in polynomial time (A <=_P B) and problem B can be solved in polynomial time (B in P), what can be strictly concluded about A?",
          "options": [
            "Problem A can also be solved in polynomial time (A in P)",
            "Problem A is NP-Hard",
            "Problem A requires exponential time",
            "P is proven equal to NP"
          ],
          "correct_option": 0,
          "explanation": "Polynomial-time reduction A <=_P B transforms any instance of A into an instance of B in polynomial time. If B can then be solved in polynomial time, composing the two yields a polynomial-time algorithm for A, proving A in P."
        }
      ],
      "prerequisites": [
        "Turing Machines and Decidability",
        "Polynomial-Time Reductions"
      ],
      "externalResources": [
        {
          "title": "NP-Completeness and Cook-Levin Theorem — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/np-completeness-set-1/",
          "difficulty": "Advanced",
          "isFree": true
        },
        {
          "title": "Automata, Computability, and Complexity (6.045J) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    }
  ]
};
