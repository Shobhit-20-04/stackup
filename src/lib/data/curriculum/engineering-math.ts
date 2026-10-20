import type { SectionCategory } from './types';

export const ENGINEERING_MATH_CATEGORY: SectionCategory = {
  "id": "eng-math",
  "slug": "engineering-mathematics",
  "title": "Engineering Mathematics",
  "description": "Linear algebra, calculus, probability & statistics, and numerical methods.",
  "icon": "Cpu",
  "topics": [
    {
      "id": "em-matrices-and-determinants",
      "slug": "matrices-and-determinants",
      "title": "Matrices and Determinants",
      "description": "Matrix operations, transpose, symmetric/skew-symmetric, orthogonal matrices, determinant properties, and matrix inversion.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Google",
        "Microsoft",
        "TCS Digital",
        "Infosys"
      ],
      "keyTakeaways": [
        "det(AB) = det(A) * det(B); det(A^T) = det(A); det(kA) = k^n * det(A) for n x n matrix.",
        "A matrix is invertible (non-singular) if and only if det(A) != 0.",
        "Orthogonal matrix: A * A^T = I; det(A) = +-1.",
        "Trace of matrix equals the sum of its diagonal elements, which equals the sum of its eigenvalues."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Matrices+and+Determinants+Engineering+Mathematics+GATE+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Matrices, Matrix Algebra, and Properties of Determinants\n\nMatrices are rectangular arrays of numbers that represent linear transformations between vector spaces. Matrix algebra forms the mathematical bedrock of graphics pipelines, machine learning backpropagation, scientific simulations, and relational query cost modeling.\n\n---\n\n## 1. Matrix Classifications\n\n- **Symmetric Matrix:** $A^T = A$ ($a_{ij} = a_{ji}$).\n- **Skew-Symmetric Matrix:** $A^T = -A$ ($a_{ij} = -a_{ji}$; main diagonal elements are **strictly zero**).\n- **Orthogonal Matrix:** $A^T A = A A^T = I \\implies \\mathbf{A^{-1} = A^T}$. (Preserves vector lengths and angles; $\\det(A) = \\pm 1$).\n- **Idempotent Matrix:** $A^2 = A$ (Eigenvalues are exclusively $0$ or $1$).\n- **Nilpotent Matrix:** $A^k = 0$ for some integer $k \\ge 1$ (All eigenvalues are strictly $0$).\n- **Involuntary Matrix:** $A^2 = I \\implies A^{-1} = A$.\n\n---\n\n## 2. Properties of Determinants ($\\det(A)$ or $|A|$)\n\nFor an $n \\times n$ square matrix $A$:\n1. $\\det(A) = \\det(A^T)$.\n2. Swapping two rows (or columns) flips the sign of the determinant: $\\det(A') = -\\det(A)$.\n3. If two rows (or columns) are identical or proportional, $\\det(A) = 0$.\n4. **Scalar Multiplication:** For scalar $k$:\n   $$\\mathbf{\\det(kA) = k^n \\det(A)}$$\n5. **Product Rule:** $\\det(AB) = \\det(A) \\cdot \\det(B)$.\n6. **Inverse Rule:** $\\det(A^{-1}) = \\frac{1}{\\det(A)}$ (Matrix is invertible $\\iff \\det(A) \\ne 0$).\n7. **Triangular Matrix:** The determinant of an upper or lower triangular matrix is simply the **product of its main diagonal entries**:\n   $$\\det(A) = \\prod_{i=1}^n a_{ii}$$\n\n---\n\n## 3. Matrix Inversion via Adjugate\n\nFor non-singular matrix $A$ ($\\det(A) \\ne 0$):\n$$\\mathbf{A^{-1} = \\frac{\\text{Adj}(A)}{\\det(A)}}$$\nwhere $\\text{Adj}(A) = C^T$ (the transpose of the cofactor matrix $C$).\n\n### Crucial Adjugate Identities:\n- $A \\cdot \\text{Adj}(A) = \\text{Adj}(A) \\cdot A = \\det(A) \\cdot I$\n- $\\mathbf{|\\text{Adj}(A)| = |A|^{n-1}}$\n- $|\\text{Adj}(\\text{Adj}(A))| = |A|^{(n-1)^2}$\n- $\\text{Adj}(AB) = \\text{Adj}(B) \\cdot \\text{Adj}(A)$\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Scalar Scaling:** $\\det(kA) = k^n \\det(A)$.\n- **Adjugate Determinant:** $|\\text{Adj}(A)| = |A|^{n-1}$.\n- **Orthogonal Invariant:** $A^T A = I \\implies \\det(A) = \\pm 1$.\n- **Skew-Symmetric Determinant:** For odd $n$, $\\det(A) = 0$!\n",
      "questions": [
        {
          "id": "em-mat-1",
          "question": "If A is a 3x3 matrix with det(A) = 4, what is the value of det(2A)?",
          "options": [
            "8",
            "16",
            "32",
            "24"
          ],
          "correct_option": 2,
          "explanation": "For an n x n matrix, det(k*A) = k^n * det(A). For n = 3 and k = 2: det(2A) = 2^3 * det(A) = 8 * 4 = 32."
        },
        {
          "id": "em-mat-2",
          "question": "What is the determinant of any Orthogonal matrix Q (satisfying Q * Q^T = I)?",
          "options": [
            "0",
            "+1 or -1",
            "Always +1",
            "Any non-zero real number"
          ],
          "correct_option": 1,
          "explanation": "det(Q * Q^T) = det(I) = 1. Since det(Q * Q^T) = det(Q) * det(Q^T) = (det(Q))^2 = 1, det(Q) must be either +1 or -1."
        },
        {
          "id": "em-mat-3",
          "question": "For an invertible n x n matrix A, what is the determinant of its adjugate matrix adj(A)?",
          "options": [
            "(det(A))^(n - 1)",
            "(det(A))^n",
            "n * det(A)",
            "1 / det(A)"
          ],
          "correct_option": 0,
          "explanation": "Since A * adj(A) = det(A) * I_n, taking determinants gives det(A) * det(adj(A)) = (det(A))^n. Dividing by det(A) yields det(adj(A)) = (det(A))^(n - 1)."
        }
      ],
      "prerequisites": [
        "Basic algebraic manipulation and simultaneous equations",
        "Cartesian coordinate geometry"
      ],
      "externalResources": [
        {
          "title": "MIT 18.06: Linear Algebra - Matrices and Determinants",
          "url": "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Matrix Algebra and Determinant Properties",
          "url": "https://www.geeksforgeeks.org/properties-of-determinants/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Matrices and Determinants Interview Guide",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-systems-linear-equations",
      "slug": "systems-of-linear-equations",
      "title": "Systems of Linear Equations",
      "description": "Consistent vs inconsistent systems, augmented matrices, Gaussian elimination, unique solutions, and infinite solutions.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "TCS Digital",
        "Cognizant"
      ],
      "keyTakeaways": [
        "System AX = B is consistent iff rank(A) = rank([A|B]).",
        "Unique solution: rank(A) = rank([A|B]) = n (number of variables).",
        "Infinitely many solutions: rank(A) = rank([A|B]) < n (n - r free parameters).",
        "Inconsistent (no solution): rank(A) < rank([A|B]).",
        "Homogeneous system AX = 0 always has trivial zero solution; has non-trivial solution iff det(A) = 0."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Systems+of+Linear+Equations+Rank+Consistency+Unique+Infinite+Solutions+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Systems of Linear Equations, Gaussian Elimination, and Consistency\n\nA system of $m$ linear equations in $n$ unknowns can be represented in matrix form as:\n$$A X = B$$\nwhere $A$ is the $m \\times n$ coefficient matrix, $X$ is the $n \\times 1$ variable vector, and $B$ is the $m \\times 1$ constant vector.\n\n---\n\n## 1. Augmented Matrix and Row Echelon Form (REF)\n\nThe system is investigated by forming the **Augmented Matrix** $[A \\mid B]$ and applying Gaussian elimination using Elementary Row Operations:\n1. Swapping two rows ($R_i \\leftrightarrow R_j$).\n2. Multiplying a row by a non-zero scalar ($R_i \\leftarrow k R_i$).\n3. Adding a multiple of one row to another ($R_i \\leftarrow R_i + k R_j$).\n\n### Row Echelon Form (REF) Criteria:\n- All zero rows are at the bottom.\n- The leading non-zero coefficient (pivot) of each non-zero row is strictly to the right of the leading coefficient of the row above it.\n\n---\n\n## 2. Consistency: The Rouché–Capelli Theorem\n\nA system $AX = B$ is consistent (possesses at least one solution) if and only if the rank of the coefficient matrix equals the rank of the augmented matrix:\n$$\\mathbf{\\text{Rank}(A) = \\text{Rank}(A \\mid B)}$$\n\n```\n                                SYSTEM AX = B\n                                      |\n               +----------------------+----------------------+\n               |                                             |\n     Rank(A) != Rank(A|B)                           Rank(A) == Rank(A|B) == r\n     [ INCONSISTENT ]                                   [ CONSISTENT ]\n     (Zero Solutions!)                                       |\n                                             +---------------+---------------+\n                                             |                               |\n                                           r == n                          r < n\n                                     (r = # of unknowns)              (r < # of unknowns)\n                                     [ UNIQUE SOLUTION ]             [ INFINITELY MANY ]\n                                                                      (n - r free vars)\n```\n\n---\n\n## 3. Homogeneous Linear Systems ($AX = 0$)\n\nIn a homogeneous system, $B = 0$:\n- $\\text{Rank}(A) = \\text{Rank}(A \\mid 0)$ is **always true**, so homogeneous systems are **always consistent**!\n- **Trivial Solution:** $X = 0$ is always a solution.\n- **Non-Trivial (Non-Zero) Solution:**\n  Exists if and only if $\\text{Rank}(A) < n$ (number of unknowns).\n  For a square $n \\times n$ matrix $A$:\n  $$\\mathbf{Non\\text{-}Trivial \\quad Solution \\iff \\det(A) = 0}$$\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Consistency Invariant:** $\\text{Rank}(A) = \\text{Rank}(A \\mid B)$.\n- **Unique Solution Condition:** $\\text{Rank}(A) = \\text{Rank}(A \\mid B) = n$.\n- **Infinite Solutions Condition:** $\\text{Rank}(A) = \\text{Rank}(A \\mid B) = r < n$ (with $n - r$ free independent parameters).\n- **Homogeneous Non-Trivial Condition:** Square matrix $\\det(A) = 0$.\n",
      "questions": [
        {
          "id": "em-sle-1",
          "question": "A system of 3 linear equations in 3 variables AX = B has rank(A) = 2 and rank([A|B]) = 3. How many solutions exist?",
          "options": [
            "Unique solution",
            "Infinitely many solutions",
            "No solution (Inconsistent)",
            "Exactly 2 solutions"
          ],
          "correct_option": 2,
          "explanation": "Because rank(A) < rank([A|B]), the system is inconsistent and has zero solutions."
        },
        {
          "id": "em-sle-2",
          "question": "When does a square homogeneous linear system AX = 0 have non-trivial (non-zero) solutions?",
          "options": [
            "When det(A) != 0",
            "When det(A) = 0 (rank(A) < n)",
            "Always",
            "Never"
          ],
          "correct_option": 1,
          "explanation": "AX = 0 has a unique trivial solution X = 0 if det(A) != 0. It possesses non-trivial solutions if and only if det(A) = 0."
        },
        {
          "id": "em-sys-3",
          "question": "According to the Rouché-Capelli Theorem, when does a linear system AX = B possess infinitely many solutions?",
          "options": [
            "When Rank(A) = Rank([A|B]) < number of variables n",
            "When Rank(A) < Rank([A|B])",
            "When Rank(A) = Rank([A|B]) = number of variables n",
            "When det(A) != 0"
          ],
          "correct_option": 0,
          "explanation": "A system is consistent if Rank(A) = Rank([A|B]). If this rank r is strictly less than the number of unknowns n, there are (n - r) free variables, yielding infinitely many solutions."
        }
      ],
      "prerequisites": [
        "Matrices and determinants fundamentals",
        "Vector spaces and linear combinations"
      ],
      "externalResources": [
        {
          "title": "MIT 18.06: Solving Linear Systems Ax = b",
          "url": "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: System of Linear Equations",
          "url": "https://www.geeksforgeeks.org/system-of-linear-equations/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Gaussian Elimination and Consistency Tests",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-eigenvalues-and-eigenvectors",
      "slug": "eigenvalues-and-eigenvectors",
      "title": "Eigenvalues and Eigenvectors",
      "description": "Characteristic equation det(A - lambda*I) = 0, algebraic and geometric multiplicity, Cayley-Hamilton theorem, and diagonalization.",
      "estimatedMinutes": 18,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Goldman Sachs",
        "Amazon"
      ],
      "keyTakeaways": [
        "A * v = lambda * v, where v is non-zero eigenvector and lambda is eigenvalue.",
        "Sum of eigenvalues equals Trace of A; Product of eigenvalues equals det(A).",
        "Eigenvalues of triangular or diagonal matrices are the diagonal elements themselves.",
        "Cayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation (used to find A^-1 and A^k)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Eigenvalues+and+Eigenvectors+Cayley+Hamilton+Theorem+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Eigenvalues, Eigenvectors, and Matrix Diagonalization\n\nFor a linear transformation represented by matrix $A$, most vectors change direction when multiplied by $A$. An **Eigenvector** is a special non-zero vector whose direction remains invariant under the transformation, being merely scaled by a scalar factor $\\lambda$ called the **Eigenvalue**.\n\n---\n\n## 1. The Fundamental Characteristic Equation\n\n$$A X = \\lambda X \\implies (A - \\lambda I) X = 0$$\nSince an eigenvector $X$ must be non-zero ($X \\ne 0$), the homogeneous system possesses a non-trivial solution if and only if:\n$$\\mathbf{\\det(A - \\lambda I) = 0}$$\nThis determinant expansion yields the **Characteristic Polynomial** of degree $n$, whose roots $\\lambda_1, \\lambda_2, \\dots, \\lambda_n$ are the eigenvalues!\n\n---\n\n## 2. Fundamental Properties of Eigenvalues\n\nFor an $n \\times n$ matrix $A$ with eigenvalues $\\lambda_1, \\lambda_2, \\dots, \\lambda_n$:\n\n1. **Sum of Eigenvalues equals Trace of $A$:**\n   $$\\sum_{i=1}^n \\lambda_i = \\text{Trace}(A) = \\sum_{i=1}^n a_{ii}$$\n2. **Product of Eigenvalues equals Determinant of $A$:**\n   $$\\prod_{i=1}^n \\lambda_i = \\det(A)$$\n3. If $\\lambda$ is an eigenvalue of $A$:\n   - $k\\lambda$ is an eigenvalue of $kA$.\n   - $\\lambda^m$ is an eigenvalue of $A^m$.\n   - $\\frac{1}{\\lambda}$ is an eigenvalue of $A^{-1}$ (if $\\det(A) \\ne 0$).\n4. The eigenvalues of an upper triangular, lower triangular, or diagonal matrix are **simply its main diagonal elements**!\n5. **Real Symmetric Matrix:** All eigenvalues of a real symmetric matrix are **strictly real numbers**, and eigenvectors corresponding to distinct eigenvalues are **mutually orthogonal**.\n\n---\n\n## 3. Matrix Diagonalization\n\nAn $n \\times n$ matrix $A$ is **Diagonalizable** if there exists an invertible matrix $P$ (the modal matrix formed by eigenvectors) and a diagonal matrix $D$ such that:\n$$P^{-1} A P = D \\implies A = P D P^{-1}$$\n- *Condition:* $A$ is diagonalizable if and only if it possesses **$n$ linearly independent eigenvectors**.\n- Power Shortcut: $\\mathbf{A^k = P D^k P^{-1}}$ (computes matrix powers in $O(1)$ scalar exponentiations!).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Characteristic Equation:** $|A - \\lambda I| = 0$.\n- **Trace Identity:** $\\sum \\lambda_i = \\text{Trace}(A)$.\n- **Determinant Identity:** $\\prod \\lambda_i = \\det(A)$.\n- **Cayley-Hamilton Theorem:** Every square matrix satisfies its own characteristic equation: $P(A) = 0$.\n",
      "questions": [
        {
          "id": "em-eig-1",
          "question": "A 2x2 matrix has trace 8 and determinant 15. What are its eigenvalues?",
          "options": [
            "2 and 6",
            "3 and 5",
            "1 and 7",
            "4 and 4"
          ],
          "correct_option": 1,
          "explanation": "The sum of eigenvalues equals trace (λ1 + λ2 = 8) and product equals determinant (λ1 * λ2 = 15). The roots of λ^2 - 8λ + 15 = 0 are 3 and 5."
        },
        {
          "id": "em-eig-2",
          "question": "If λ is an eigenvalue of an invertible matrix A, what is the corresponding eigenvalue of A^3 + 2A^(-1)?",
          "options": [
            "λ^3 + 2/λ",
            "3λ + 2λ",
            "λ^3 + 2λ",
            "(λ + 2)^3"
          ],
          "correct_option": 0,
          "explanation": "By spectral mapping, if Av = λv, then A^3 v = λ^3 v and A^(-1) v = (1/λ) v. Therefore, (A^3 + 2A^(-1)) v = (λ^3 + 2/λ) v."
        },
        {
          "id": "em-eig-3",
          "question": "What is a defining mathematical property of the eigenvalues of any Real Symmetric matrix?",
          "options": [
            "All eigenvalues are strictly real numbers",
            "All eigenvalues are purely imaginary numbers",
            "The sum of all eigenvalues is always zero",
            "All eigenvalues must be distinct positive integers"
          ],
          "correct_option": 0,
          "explanation": "By the Spectral Theorem, all eigenvalues of a real symmetric matrix (A = A^T) are guaranteed to be real, and eigenvectors corresponding to distinct eigenvalues are mutually orthogonal."
        }
      ],
      "prerequisites": [
        "Matrix determinants and matrix inverse",
        "Systems of linear equations"
      ],
      "externalResources": [
        {
          "title": "MIT 18.06: Eigenvalues and Eigenvectors",
          "url": "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Eigenvalues and Eigenvectors",
          "url": "https://www.geeksforgeeks.org/eigen-values-and-eigen-vectors/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Diagonalization and Spectral Theorem Guide",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-matrix-rank",
      "slug": "matrix-rank",
      "title": "Matrix Rank",
      "description": "Row echelon form, reduced row echelon form (RREF), pivot columns, nullity, and Rank-Nullity Theorem.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "TCS Digital",
        "Infosys",
        "Wipro"
      ],
      "keyTakeaways": [
        "Rank: Maximum number of linearly independent row or column vectors in the matrix.",
        "Rank(A) <= min(m, n) for m x n matrix.",
        "Rank-Nullity Theorem: Rank(A) + Nullity(A) = n (number of columns).",
        "Rank(AB) <= min(Rank(A), Rank(B)); Rank(A^T) = Rank(A)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Matrix+Rank+Row+Echelon+Form+Rank+Nullity+Theorem+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Matrix Rank, Nullity, and the Rank-Nullity Theorem\n\nThe **Rank** of a matrix measures the non-degeneracy of the system, representing the dimension of the vector space spanned by its rows or columns.\n\n---\n\n## 1. Formal Definition of Matrix Rank\n\nA matrix $A_{m \\times n}$ has rank $r$ ($\\text{Rank}(A) = r$) if:\n1. There exists at least one $r \\times r$ submatrix with non-zero determinant ($\\det \\ne 0$).\n2. The determinant of **every** $(r+1) \\times (r+1)$ submatrix is zero.\n\n### Row Rank equals Column Rank:\nIn any matrix, the maximum number of **linearly independent rows** is mathematically equal to the maximum number of **linearly independent columns**.\n\n---\n\n## 2. Properties and Bounds on Rank\n\nFor any $m \\times n$ matrix $A$:\n1. $\\mathbf{0 \\le \\text{Rank}(A) \\le \\min(m, n)}$.\n2. $\\text{Rank}(A) = 0 \\iff A$ is the zero matrix.\n3. $\\text{Rank}(A) = \\text{Rank}(A^T) = \\text{Rank}(A A^T) = \\text{Rank}(A^T A)$.\n4. **Rank of a Product:**\n   $$\\text{Rank}(AB) \\le \\min(\\text{Rank}(A), \\text{Rank}(B))$$\n   **Sylvester's Inequality:** $\\text{Rank}(AB) \\ge \\text{Rank}(A) + \\text{Rank}(B) - n$ (for $A_{m \\times n}$ and $B_{n \\times p}$).\n5. **Rank of a Sum:**\n   $$\\text{Rank}(A + B) \\le \\text{Rank}(A) + \\text{Rank}(B)$$\n\n---\n\n## 3. The Rank-Nullity Theorem\n\nFor an $m \\times n$ matrix $A$ representing linear map $T: \\mathbb{R}^n \\to \\mathbb{R}^m$:\n- **Rank ($r$):** Dimension of the Column Space / Range ($\\text{Dim}(\\text{Col}(A))$).\n- **Nullity ($k$):** Dimension of the Null Space / Kernel ($\\text{Dim}(\\text{Null}(A))$, solutions to $AX = 0$).\n\n$$\\mathbf{\\text{Rank}(A) + \\text{Nullity}(A) = n \\quad (\\text{Number of Columns / Dimension of Domain})}$$\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Upper Bound:** $\\text{Rank}(A_{m \\times n}) \\le \\min(m, n)$.\n- **Full Rank:** Matrix is non-singular $\\iff \\text{Rank}(A_{n \\times n}) = n$.\n- **Rank-Nullity Equation:** $\\text{Rank} + \\text{Nullity} = n$.\n- **Rank Calculation:** Count non-zero rows in Row Echelon Form!\n",
      "questions": [
        {
          "id": "em-rnk-1",
          "question": "What is the maximum possible rank of a 4x7 matrix?",
          "options": [
            "7",
            "4",
            "28",
            "3"
          ],
          "correct_option": 1,
          "explanation": "The rank of an m x n matrix is bounded by min(m, n). For 4 x 7, rank <= min(4, 7) = 4."
        },
        {
          "id": "em-rnk-2",
          "question": "If a 5x5 matrix has a rank of 3, what is the dimension of its null space (nullity)?",
          "options": [
            "3",
            "2",
            "5",
            "0"
          ],
          "correct_option": 1,
          "explanation": "By the Rank-Nullity Theorem: Rank + Nullity = n. For n = 5: 3 + Nullity = 5 -> Nullity = 2."
        },
        {
          "id": "em-rank-3",
          "question": "What is the Rank-Nullity Theorem for an m x n matrix A?",
          "options": [
            "Rank(A) + Nullity(A) = n (number of columns)",
            "Rank(A) + Nullity(A) = m (number of rows)",
            "Rank(A) * Nullity(A) = n",
            "Rank(A) - Nullity(A) = m - n"
          ],
          "correct_option": 0,
          "explanation": "The Rank-Nullity Theorem establishes that for any linear map from R^n to R^m, the dimension of the column space (rank) plus the dimension of the kernel/nullspace (nullity) equals n (number of columns)."
        }
      ],
      "prerequisites": [
        "Matrices and determinants",
        "Vector linear independence and basis"
      ],
      "externalResources": [
        {
          "title": "MIT 18.06: The Four Fundamental Subspaces and Matrix Rank",
          "url": "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Rank of a Matrix",
          "url": "https://www.geeksforgeeks.org/rank-of-matrix/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Rank-Nullity Theorem and Dimension Calculation",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-limits-and-continuity",
      "slug": "limits-and-continuity",
      "title": "Limits and Continuity",
      "description": "Left-hand and right-hand limits, indeterminate forms (0/0, inf/inf), L'Hôpital's rule, and continuity criteria.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "TCS Digital",
        "Infosys",
        "Accenture",
        "Cognizant"
      ],
      "keyTakeaways": [
        "A limit exists at x = a iff left-hand limit equals right-hand limit: lim(x->a-) f(x) = lim(x->a+) f(x) = L.",
        "Continuous at x = a iff f(a) is defined and lim(x->a) f(x) = f(a).",
        "L'Hôpital's Rule applies ONLY to indeterminate forms 0/0 or inf/inf: differentiate numerator and denominator independently.",
        "Standard limits: lim(x->0) sin(x)/x = 1; lim(x->0) (1 + x)^(1/x) = e; lim(x->inf) (1 + 1/x)^x = e."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Limits+and+Continuity+L+Hopital+Rule+Engineering+Mathematics+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Limits, Continuity, Indeterminate Forms, and L'Hôpital's Rule\n\nLimits describe the behavior of a function near a point rather than at that point. They provide the foundational bedrock upon which derivatives, integrals, and asymptotic algorithm analyses are established.\n\n---\n\n## 1. Formal Definition and Existence of Limits\n\n### $\\epsilon$-$\\delta$ Definition of Limit:\n$$\\lim_{x \\to c} f(x) = L$$\nif $\\forall \\epsilon > 0$, $\\exists \\delta > 0$ such that $0 < |x - c| < \\delta \\implies |f(x) - L| < \\epsilon$.\n\n### Existence Criterion:\nThe two-sided limit exists if and only if both the **Left-Hand Limit (LHL)** and **Right-Hand Limit (RHL)** exist, are finite, and are **strictly equal**:\n$$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L$$\n\n---\n\n## 2. L'Hôpital's Rule for Indeterminate Forms\n\nIf direct substitution yields indeterminate form $\\frac{0}{0}$ or $\\frac{\\pm \\infty}{\\pm \\infty}$, and $f, g$ are differentiable near $c$:\n$$\\mathbf{\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}}$$\n*(Warning: Differentiate numerator and denominator separately! Do NOT apply the quotient rule!).*\n\n### Handling Exponential Indeterminate Forms ($1^\\infty, 0^0, \\infty^0$):\nFor limit of form $\\lim [f(x)]^{g(x)}$ yielding $1^\\infty$:\n$$\\mathbf{\\lim_{x \\to c} [f(x)]^{g(x)} = e^{\\lim_{x \\to c} g(x)[f(x) - 1]}}$$\n*Classic Example:* $\\lim_{x \\to 0} (1 + x)^{1/x} = e^{\\lim \\frac{1}{x}(x)} = e^1 = e$.\n\n---\n\n## 3. Continuity and the Intermediate Value Theorem\n\nA function $f(x)$ is **Continuous at point $c$** if and only if three conditions hold:\n1. $f(c)$ is defined.\n2. $\\lim_{x \\to c} f(x)$ exists.\n3. $\\mathbf{\\lim_{x \\to c} f(x) = f(c)}$.\n\n### Intermediate Value Theorem (IVT):\nIf $f(x)$ is continuous on $[a, b]$, and $u$ is any value between $f(a)$ and $f(b)$, then there exists **at least one $c \\in [a, b]$** such that $f(c) = u$.\n- *Bisection Root Finding Application:* If $f(a)$ and $f(b)$ have opposite signs ($f(a) \\cdot f(b) < 0$), then $f(x) = 0$ has at least one real root in $(a, b)$!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Standard Limits:** $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{\\ln(1+x)}{x} = 1$.\n- **$1^\\infty$ Shortcut:** $\\lim f(x)^{g(x)} = e^{\\lim g(x)(f(x) - 1)}$.\n- **Continuity Condition:** $\\text{LHL} = \\text{RHL} = f(c)$.\n",
      "questions": [
        {
          "id": "em-lim-1",
          "question": "Evaluate lim (x -> 0) [(sin 3x) / x].",
          "options": [
            "0",
            "1",
            "3",
            "Does not exist"
          ],
          "correct_option": 2,
          "explanation": "lim (x->0) (sin 3x)/x = 3 * lim (x->0) (sin 3x)/(3x) = 3 * 1 = 3."
        },
        {
          "id": "em-lim-2",
          "question": "Which indeterminate form is REQUIRED before L'Hôpital's rule can be directly applied?",
          "options": [
            "0 * inf",
            "0/0 or inf/inf",
            "inf - inf",
            "1^inf"
          ],
          "correct_option": 1,
          "explanation": "L'Hôpital's rule applies strictly and directly only to fractional indeterminate quotients of the form 0/0 or ±inf/inf. Other forms (0*inf, 1^inf) must first be algebraically transformed into 0/0 or inf/inf."
        },
        {
          "id": "em-lim-3",
          "question": "What is the limit of (1 + 2/x)^x as x approaches infinity?",
          "options": [
            "e^2",
            "e",
            "1",
            "infinity"
          ],
          "correct_option": 0,
          "explanation": "Using the standard limit identity lim_{x -> inf} (1 + k/x)^x = e^k. With k = 2, the limit is e^2."
        }
      ],
      "prerequisites": [
        "Functions and real numbers",
        "Cartesian coordinate graphing"
      ],
      "externalResources": [
        {
          "title": "MIT 18.01: Single Variable Calculus - Limits and Continuity",
          "url": "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Limits, Continuity and Differentiability",
          "url": "https://www.geeksforgeeks.org/limits-continuity-and-differentiability/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: L'Hopital's Rule and Indeterminate Forms",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-differentiation-and-integration",
      "slug": "differentiation-and-integration",
      "title": "Differentiation and Integration",
      "description": "Derivatives, product and chain rules, definite and indefinite integrals, Fundamental Theorem of Calculus, and integration by parts.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "TCS Digital",
        "Wipro",
        "Infosys"
      ],
      "keyTakeaways": [
        "Derivative represents instantaneous rate of change and tangent slope.",
        "Integration by parts: integral(u * v' dx) = u*v - integral(u' * v dx) (ILATE rule for choice of u).",
        "Fundamental Theorem of Calculus: d/dx [integral_a^x f(t) dt] = f(x); integral_a^b f'(x) dx = f(b) - f(a).",
        "Definite integral of odd function over symmetric interval [-a, a] is 0."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Calculus+Differentiation+and+Integration+Engineering+Mathematics+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Differentiation, Mean Value Theorems, and Integration Techniques\n\nCalculus studies rates of change (differential calculus) and accumulation of quantities (integral calculus), unified by the **Fundamental Theorem of Calculus**.\n\n---\n\n## 1. Differentiation Rules and Theorems\n\nThe derivative represents instantaneous rate of change:\n$$f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$\n\n### Rules:\n- **Product Rule:** $(uv)' = u'v + uv'$.\n- **Quotient Rule:** $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$.\n- **Chain Rule:** $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$.\n\n### Mean Value Theorems:\n1. **Rolle's Theorem:** If $f(x)$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then $\\exists c \\in (a, b)$ such that $\\mathbf{f'(c) = 0}$.\n2. **Lagrange's Mean Value Theorem (LMVT):** If continuous on $[a, b]$ and differentiable on $(a, b)$:\n   $$\\mathbf{f'(c) = \\frac{f(b) - f(a)}{b - a}}$$\n\n---\n\n## 2. Integration by Parts and Leibniz Rule\n\n### Integration by Parts (ILATE Rule):\n$$\\int u \\, dv = uv - \\int v \\, du$$\nPriority for picking $u$: **I**nverse Trig $\\to$ **L**ogarithmic $\\to$ **A**lgebraic $\\to$ **T**rigonometric $\\to$ **E**xponential.\n\n### Leibniz Integral Rule (Differentiation Under the Integral Sign):\n$$\\frac{d}{dx} \\left[ \\int_{u(x)}^{v(x)} f(t) \\, dt \\right] = f(v(x)) \\cdot v'(x) - f(u(x)) \\cdot u'(x)$$\n\n---\n\n## 3. Summary Cheatsheet & Key Formulas\n\n- **LMVT:** Tangent slope equals secant line slope: $f'(c) = \\frac{f(b)-f(a)}{b-a}$.\n- **Parts Formula:** $\\int u \\, dv = uv - \\int v \\, du$.\n- **Leibniz Derivative:** Substitute upper limit $\\times$ upper derivative $-$ substitute lower limit $\\times$ lower derivative.\n",
      "questions": [
        {
          "id": "em-di-1",
          "question": "What is the value of the definite integral ∫_{-π}^{π} [x^3 * cos(x)] dx?",
          "options": [
            "2π",
            "0",
            "π^2",
            "1"
          ],
          "correct_option": 1,
          "explanation": "f(x) = x^3 * cos(x). f(-x) = (-x)^3 * cos(-x) = -x^3 * cos(x) = -f(x). Since f(x) is an odd function integrated over a symmetric interval [-π, π], the integral evaluates to 0."
        },
        {
          "id": "em-di-2",
          "question": "What is the derivative of f(x) = ln(sin(x)) with respect to x?",
          "options": [
            "cos(x)",
            "cot(x)",
            "tan(x)",
            "1/sin(x)"
          ],
          "correct_option": 1,
          "explanation": "By chain rule: d/dx [ln(sin x)] = (1 / sin x) * d/dx(sin x) = cos x / sin x = cot x."
        },
        {
          "id": "em-diff-3",
          "question": "According to Lagrange's Mean Value Theorem, if f(x) = x^2 on interval [0, 2], what is the value of c in (0, 2) where f'(c) equals the average rate of change?",
          "options": [
            "c = 1",
            "c = 0.5",
            "c = 1.5",
            "c = sqrt(2)"
          ],
          "correct_option": 0,
          "explanation": "Average rate of change = (f(2) - f(0)) / (2 - 0) = (4 - 0) / 2 = 2. Since f'(x) = 2x, setting f'(c) = 2 gives 2c = 2 => c = 1."
        }
      ],
      "prerequisites": [
        "Limits, continuity, and functions",
        "Algebraic manipulation"
      ],
      "externalResources": [
        {
          "title": "MIT 18.01: Single Variable Calculus - Derivatives and Integrals",
          "url": "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Calculus - Differentiation and Integration",
          "url": "https://www.geeksforgeeks.org/calculus-in-engineering-mathematics/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Calculus and Integration by Parts Guide",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-maxima-and-minima",
      "slug": "maxima-and-minima",
      "title": "Maxima and Minima",
      "description": "First and second derivative tests, critical points, points of inflection, global vs local extrema, and optimization.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Directi"
      ],
      "keyTakeaways": [
        "Critical points occur where f'(x) = 0 or f'(x) is undefined.",
        "Second Derivative Test: f'(c) = 0 and f''(c) > 0 implies Local Minimum.",
        "f'(c) = 0 and f''(c) < 0 implies Local Maximum.",
        "If f''(c) = 0, the second derivative test is inconclusive; use first derivative sign change."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Maxima+and+Minima+First+Second+Derivative+Test+Calculus+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Maxima, Minima, Concavity, and Taylor Series Approximations\n\nOptimization is the computational process of finding inputs that maximize throughput or minimize loss, error, or cost functions.\n\n---\n\n## 1. Critical Points and Derivative Tests\n\nA **Critical Point** occurs where $f'(c) = 0$ or $f'(c)$ is undefined.\n\n```\n                  Local Maximum (f' = 0, f'' < 0)\n                            /---\\\\\n                           /     \\\\\n                          /       \\\\\n                         /         \\\\   Point of Inflection (f'' = 0)\n                        /           \\\\      +\n                                     \\\\    /\n                                      \\\\--/\n                             Local Minimum (f' = 0, f'' > 0)\n```\n\n### Second Derivative Test:\n1. Find all roots of $f'(x) = 0$.\n2. Evaluate $f''(x)$ at each root $c$:\n   - If $\\mathbf{f''(c) < 0} \\implies$ **Local Maximum** (concave downward).\n   - If $\\mathbf{f''(c) > 0} \\implies$ **Local Minimum** (concave upward).\n   - If $\\mathbf{f''(c) = 0} \\implies$ Test is inconclusive (apply First Derivative Test or check higher derivatives).\n\n---\n\n## 2. Points of Inflection\n\nA **Point of Inflection** is a point on the curve where the concavity changes (from concave upward to concave downward, or vice versa).\n- Necessary condition: $f''(c) = 0$ or $f''(c)$ does not exist.\n- Sufficient condition: $f''(x)$ changes sign as $x$ passes through $c$.\n\n---\n\n## 3. Taylor and Maclaurin Series\n\nAny smooth infinitely differentiable function $f(x)$ can be approximated around $x = a$ as a polynomial:\n$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\dots$$\nWhen expanded around $a = 0$, it is called the **Maclaurin Series**:\n- $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$\n- $\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots$\n- $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots$\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Stationary Point:** $f'(x) = 0$.\n- **Local Max:** $f'(x) = 0 \\land f''(x) < 0$.\n- **Local Min:** $f'(x) = 0 \\land f''(x) > 0$.\n- **Inflection Point:** Concavity changes sign ($f''(x) = 0$).\n",
      "questions": [
        {
          "id": "em-mm-1",
          "question": "For a function f(x), if f'(c) = 0 and f''(c) < 0, what does x = c represent?",
          "options": [
            "Local minimum",
            "Local maximum",
            "Point of inflection",
            "Asymptote"
          ],
          "correct_option": 1,
          "explanation": "f'(c) = 0 establishes a horizontal tangent (critical point), and f''(c) < 0 establishes downward concavity, proving a local maximum."
        },
        {
          "id": "em-mm-2",
          "question": "At what value of x does f(x) = 2x^3 - 9x^2 + 12x achieve its local minimum?",
          "options": [
            "x = 1",
            "x = 2",
            "x = 0",
            "x = 3"
          ],
          "correct_option": 1,
          "explanation": "f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2) = 0 -> x = 1, 2. f''(x) = 12x - 18. At x = 1: f''(1) = -6 < 0 (max). At x = 2: f''(2) = +6 > 0 (min)."
        },
        {
          "id": "em-max-3",
          "question": "For a two-variable function f(x, y), if the Hessian discriminant D = f_xx * f_yy - (f_xy)^2 < 0 at stationary point (a, b), what does (a, b) represent?",
          "options": [
            "Saddle point",
            "Local minimum",
            "Local maximum",
            "Global minimum"
          ],
          "correct_option": 0,
          "explanation": "When the discriminant D = f_xx * f_yy - (f_xy)^2 is negative, the surface curves upwards in one direction and downwards in another, creating a saddle point (minimax)."
        }
      ],
      "prerequisites": [
        "Differentiation rules and limits",
        "Polynomial algebra"
      ],
      "externalResources": [
        {
          "title": "MIT 18.01: Maxima, Minima, and Curve Sketching",
          "url": "https://www.ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Maxima and Minima in Engineering Mathematics",
          "url": "https://www.geeksforgeeks.org/maxima-and-minima-in-calculus/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Optimization, Concavity, and Inflection Points",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-partial-derivatives",
      "slug": "partial-derivatives",
      "title": "Partial Derivatives",
      "description": "Multivariate functions, Clairaut's theorem (mixed partials), gradient vectors, directional derivatives, and Hessian matrix.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Meta",
        "Amazon",
        "NVIDIA"
      ],
      "keyTakeaways": [
        "Partial derivative df/dx treats all other variables (y, z) as constants.",
        "Clairaut's Theorem: If mixed partial derivatives are continuous, d^2 f / (dx dy) = d^2 f / (dy dx).",
        "Gradient vector grad(f) points in the direction of steepest ascent.",
        "Hessian matrix of second partial derivatives determines multivariate extrema via its determinant."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Partial+Derivatives+Gradient+Hessian+Matrix+Engineering+Mathematics+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Partial Derivatives, Gradient Vectors, and Multivariable Extrema\n\nMultivariable calculus extends single-variable analysis to functions of multiple variables ($z = f(x, y)$), providing the mathematical core for gradient descent algorithms in machine learning and neural networks.\n\n---\n\n## 1. Partial Derivatives and Clairaut's Theorem\n\nThe partial derivative $\\frac{\\partial f}{\\partial x}$ evaluates the rate of change with respect to $x$ while treating all other variables as constants.\n- **Clairaut's (Schwarz's) Theorem:**\n  If the mixed partial derivatives are continuous, their evaluation order is commutative:\n  $$\\mathbf{\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial^2 f}{\\partial y \\partial x}}$$\n\n---\n\n## 2. The Gradient Vector ($\\nabla f$) and Directional Derivatives\n\nThe **Gradient** of scalar function $f(x, y, z)$ is a vector pointing in the direction of **maximum rate of increase**:\n$$\\nabla f = \\left\\langle \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z} \\right\\rangle$$\n- **Maximum Rate of Increase:** Equals the magnitude of the gradient: $|\\nabla f|$.\n- **Directional Derivative** along unit vector $\\hat{u}$:\n  $$D_{\\hat{u}} f = \\nabla f \\cdot \\hat{u}$$\n\n---\n\n## 3. Multivariable Extrema and the Hessian Matrix\n\nFor function $f(x, y)$, stationary points occur where:\n$$\\frac{\\partial f}{\\partial x} = 0 \\quad \\text{and} \\quad \\frac{\\partial f}{\\partial y} = 0$$\n\nLet:\n$$r = f_{xx}, \\quad s = f_{xy}, \\quad t = f_{yy}, \\quad \\mathbf{\\Delta = rt - s^2} = \\det(\\text{Hessian})$$\n\n### The Second Partials Test:\n1. If $\\mathbf{\\Delta > 0}$ and $\\mathbf{r > 0} \\implies$ **Local Minimum**.\n2. If $\\mathbf{\\Delta > 0}$ and $\\mathbf{r < 0} \\implies$ **Local Maximum**.\n3. If $\\mathbf{\\Delta < 0} \\implies$ **Saddle Point** (surface curves upward in one direction and downward in another!).\n4. If $\\Delta = 0 \\implies$ Test is inconclusive.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Gradient:** $\\nabla f = \\langle f_x, f_y, f_z \\rangle$.\n- **Hessian Discriminant:** $\\Delta = f_{xx} f_{yy} - (f_{xy})^2$.\n- **Saddle Point Condition:** $\\Delta < 0$.\n",
      "questions": [
        {
          "id": "em-pd-1",
          "question": "What is the gradient vector ∇f of f(x, y) = x^2 * y + 3y at point (1, 2)?",
          "options": [
            "(4, 4)",
            "(4, 2)",
            "(2, 4)",
            "(2, 5)"
          ],
          "correct_option": 0,
          "explanation": "df/dx = 2xy -> at (1, 2): 2(1)(2) = 4. df/dy = x^2 + 3 -> at (1, 2): 1^2 + 3 = 4. ∇f = (4, 4)."
        },
        {
          "id": "em-pd-2",
          "question": "According to Clairaut's Theorem, under what condition are the mixed second partial derivatives equal: d^2f/(dx dy) = d^2f/(dy dx)?",
          "options": [
            "Always, for all functions",
            "When the mixed second partial derivatives are continuous",
            "Only when f(x, y) is linear",
            "Only at local extrema"
          ],
          "correct_option": 1,
          "explanation": "Clairaut's (Schwarz's) theorem guarantees that mixed second-order partial derivatives are identical provided that they are continuous on an open set containing the point."
        },
        {
          "id": "em-part-3",
          "question": "What is the physical interpretation of the gradient vector grad(f) of a scalar field f(x, y, z)?",
          "options": [
            "It points in the direction of the greatest rate of increase of f, with magnitude equal to that maximum rate.",
            "It represents the tangential velocity along level surfaces.",
            "It measures the net circulation of f.",
            "It is always zero everywhere."
          ],
          "correct_option": 0,
          "explanation": "The gradient vector grad(f) points in the direction of maximum directional derivative (steepest ascent) at that point, and its magnitude equals this maximum rate of change."
        }
      ],
      "prerequisites": [
        "Single-variable differentiation and integration",
        "Vector geometry"
      ],
      "externalResources": [
        {
          "title": "MIT 18.02: Multivariable Calculus - Gradients and Extrema",
          "url": "https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Partial Derivatives and Multivariable Calculus",
          "url": "https://www.geeksforgeeks.org/partial-derivatives-in-calculus/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Gradient, Hessian, and Saddle Points Guide",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-conditional-prob-bayes",
      "slug": "conditional-probability-and-bayes-theorem",
      "title": "Conditional Probability and Bayes' Theorem",
      "description": "Sample spaces, axioms of probability, independent events, conditional probability P(A|B), law of total probability, and Bayes' Theorem.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "Conditional Probability: P(A | B) = P(A n B) / P(B) for P(B) > 0.",
        "Independent Events: P(A n B) = P(A) * P(B) iff P(A | B) = P(A).",
        "Law of Total Probability: P(A) = sum(P(A | B_i) * P(B_i)) for mutually exclusive and exhaustive partitions B_i.",
        "Bayes' Theorem updates prior probabilities to posterior probabilities using likelihood evidence."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Conditional+Probability+Bayes+Theorem+Engineering+Mathematics+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Conditional Probability, Law of Total Probability, and Bayes' Theorem\n\nProbability theory provides the mathematical foundations for modeling uncertainty, randomized algorithms, probabilistic data structures (Bloom filters), and machine learning classification (Naive Bayes).\n\n---\n\n## 1. Conditional Probability and Independent Events\n\nThe **Conditional Probability** of event $A$ occurring given that event $B$ has already occurred ($P(B) > 0$):\n$$\\mathbf{P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}}$$\n\n### Independent Events:\nTwo events $A$ and $B$ are **statistically independent** if and only if the occurrence of one provides zero information about the occurrence of the other:\n$$\\mathbf{P(A \\cap B) = P(A) \\cdot P(B) \\iff P(A \\mid B) = P(A)}$$\n*(Note: Mutually exclusive events with $P > 0$ can NEVER be independent, because if one occurs, the other cannot!).*\n\n---\n\n## 2. Law of Total Probability\n\nLet $B_1, B_2, \\dots, B_n$ form a mutually exclusive and exhaustive partition of sample space $S$ ($\\bigcup B_i = S$ and $B_i \\cap B_j = \\emptyset$).\nFor any event $A$:\n$$\\mathbf{P(A) = \\sum_{i=1}^n P(B_i) \\cdot P(A \\mid B_i)}$$\n\n---\n\n## 3. Bayes' Theorem (Inverse Probability)\n\nBayes' Theorem updates the prior probability of a hypothesis $B_k$ upon observing evidence $A$:\n$$\\mathbf{P(B_k \\mid A) = \\frac{P(B_k) \\cdot P(A \\mid B_k)}{\\sum_{i=1}^n P(B_i) \\cdot P(A \\mid B_i)}}$$\n\n### Numerical Medical Diagnosis Example:\n- A disease affects $1\\%$ of the population: $P(D) = 0.01 \\implies P(\\overline{D}) = 0.99$.\n- Test accuracy: $P(T^+ \\mid D) = 0.95$ (True Positive), $P(T^+ \\mid \\overline{D}) = 0.05$ (False Positive).\n- **Question:** If a person tests positive ($T^+$), what is the probability they actually have the disease?\n$$P(D \\mid T^+) = \\frac{P(D) P(T^+ \\mid D)}{P(D) P(T^+ \\mid D) + P(\\overline{D}) P(T^+ \\mid \\overline{D})} = \\frac{0.01 \\times 0.95}{(0.01 \\times 0.95) + (0.99 \\times 0.05)} = \\frac{0.0095}{0.0095 + 0.0495} = \\frac{0.0095}{0.0590} \\approx \\mathbf{16.1\\%}$$\nEven with a 95% accurate test, because the disease is rare, a positive result indicates only a ~16% chance of infection!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Multiplication Rule:** $P(A \\cap B) = P(B) \\cdot P(A \\mid B)$.\n- **Independence:** $P(A \\cap B) = P(A) P(B)$.\n- **Bayes' Rule:** $\\text{Posterior} = \\frac{\\text{Prior} \\times \\text{Likelihood}}{\\text{Evidence}}$.\n",
      "questions": [
        {
          "id": "em-cp-1",
          "question": "If P(A) = 0.4, P(B) = 0.5, and A and B are independent events, what is P(A U B)?",
          "options": [
            "0.9",
            "0.7",
            "0.2",
            "0.8"
          ],
          "correct_option": 1,
          "explanation": "For independent events, P(A n B) = P(A) * P(B) = 0.4 * 0.5 = 0.2. P(A U B) = P(A) + P(B) - P(A n B) = 0.4 + 0.5 - 0.2 = 0.7."
        },
        {
          "id": "em-cp-2",
          "question": "A diagnostic test is 99% accurate for positive patients. A disease affects 1 in 1000 people. What formula updates the probability that a positive patient truly has the disease?",
          "options": [
            "Law of Large Numbers",
            "Bayes' Theorem",
            "Central Limit Theorem",
            "Markov's Inequality"
          ],
          "correct_option": 1,
          "explanation": "Bayes' Theorem computes the posterior probability P(Disease | Positive) given prior disease prevalence and test sensitivity/specificity."
        },
        {
          "id": "em-prob-3",
          "question": "If P(A) = 0.6, P(B) = 0.4, and P(A | B) = 0.3, what is the joint probability P(A n B)?",
          "options": [
            "0.12",
            "0.24",
            "0.18",
            "0.70"
          ],
          "correct_option": 0,
          "explanation": "By the multiplication rule of conditional probability: P(A n B) = P(A | B) * P(B) = 0.3 * 0.4 = 0.12."
        }
      ],
      "prerequisites": [
        "Basic set theory and probability spaces",
        "Venn diagrams and events"
      ],
      "externalResources": [
        {
          "title": "MIT 18.05: Introduction to Probability and Statistics",
          "url": "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Bayes' Theorem in Engineering Mathematics",
          "url": "https://www.geeksforgeeks.org/bayes-theorem-in-probability/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Conditional Probability and Bayes' Rule Calculations",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-random-variables",
      "slug": "random-variables",
      "title": "Random Variables",
      "description": "Discrete vs continuous random variables, Probability Mass Function (PMF), Probability Density Function (PDF), and Cumulative Distribution Function (CDF).",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "Random variable maps sample space outcomes to real numbers.",
        "Discrete: PMF p(x) >= 0 and sum(p(x)) = 1.",
        "Continuous: PDF f(x) >= 0 and integral(-inf to inf) f(x) dx = 1.",
        "CDF F(x) = P(X <= x); F'(x) = f(x) for continuous random variables."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Random+Variables+PMF+PDF+CDF+Engineering+Mathematics+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Random Variables, Probability Distributions & Expectations\n\nA **Random Variable (RV)** $X$ is a measurable mathematical function $X: \\Omega \\to \\mathbb{R}$ that maps each experimental outcome $\\omega$ in a sample space $\\Omega$ to a real number. Random variables form the probabilistic core of machine learning, statistical inference, randomized algorithms, and queueing models.\n\n---\n\n## 1. Discrete vs. Continuous Random Variables\n\n| Property | Discrete Random Variable | Continuous Random Variable |\n| :--- | :--- | :--- |\n| **Values / Support** | Countable set $\\{x_1, x_2, \\dots\\}$ (finite or countably infinite). | Uncountable continuum of real numbers (intervals $[a, b]$). |\n| **Probability Function** | **Probability Mass Function (PMF):** $p_X(x) = P(X = x)$ | **Probability Density Function (PDF):** $f_X(x)$ |\n| **Axiom of Normalization** | $\\sum_{x} p_X(x) = 1$ | $\\int_{-\\infty}^{\\infty} f_X(x) \\, dx = 1$ |\n| **Interval Probability** | $P(a \\le X \\le b) = \\sum_{x = a}^b p(x)$ | $P(a \\le X \\le b) = \\int_a^b f(x) \\, dx$ |\n| **Point Probability Paradox** | $P(X = x)$ can be positive ($> 0$). | **$P(X = c) = 0$ for every single exact point $c$!** Probabilities only exist over non-zero intervals $\\int_{c-\\epsilon}^{c+\\epsilon} f(x) dx$. |\n| **Cumulative Distribution** | $F_X(x) = P(X \\le x) = \\sum_{t \\le x} p_X(t)$ | $F_X(x) = P(X \\le x) = \\int_{-\\infty}^x f_X(t) \\, dt$ |\n\n---\n\n## 2. Properties of the Cumulative Distribution Function (CDF)\n\nFor any random variable $X$, the CDF $F(x) = P(X \\le x)$ satisfies:\n1. **Bounds:** $0 \\le F(x) \\le 1$ with $\\lim_{x \\to -\\infty} F(x) = 0$ and $\\lim_{x \\to +\\infty} F(x) = 1$.\n2. **Monotonicity:** Non-decreasing: if $x_1 < x_2$, then $F(x_1) \\le F(x_2)$.\n3. **Right-Continuity:** $F(x)$ is continuous from the right: $\\lim_{h \\to 0^+} F(x + h) = F(x)$.\n4. **Relationship to PDF:** For continuous variables:\n   $$f_X(x) = \\frac{d}{dx} F_X(x)$$\n\n---\n\n## 3. Mathematical Expectation, Variance, and Moments\n\n### Expected Value (Mean $\\mu = E[X]$)\n- Discrete: $E[X] = \\sum x \\cdot p(x)$\n- Continuous: $E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x) \\, dx$\n- **Linearity of Expectation (holds always, even if $X$ and $Y$ are dependent):**\n  $$E[aX + bY + c] = aE[X] + bE[Y] + c$$\n\n### Variance ($\\sigma^2 = \\text{Var}(X)$)\nMeasures the dispersion of $X$ around its mean:\n$$\\text{Var}(X) = E[(X - \\mu)^2] = E[X^2] - (E[X])^2$$\n- Properties:\n  - $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$ (constants drop, scale factor squares).\n  - If $X$ and $Y$ are **independent**: $\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)$.\n\n---\n\n## 4. Landmark Probability Distributions (GATE & Placement Cheat-Sheet)\n\n| Distribution | Type | PMF / PDF | Mean $E[X]$ | Variance $\\text{Var}(X)$ | Key Property |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **Bernoulli($p$)** | Discrete | $P(1) = p, P(0) = 1 - p$ | $p$ | $p(1 - p)$ | Single trial outcome. |\n| **Binomial($n, p$)** | Discrete | $\\binom{n}{k} p^k (1-p)^{n-k}$ | $np$ | $np(1 - p)$ | Number of successes in $n$ independent trials. |\n| **Poisson($\\lambda$)** | Discrete | $\\frac{e^{-\\lambda} \\lambda^k}{k!}$ | $\\lambda$ | $\\lambda$ | **Mean equals Variance!** Models rare events over time/space. |\n| **Uniform($a, b$)** | Continuous | $\\frac{1}{b - a}$ for $a \\le x \\le b$ | $\\frac{a + b}{2}$ | $\\frac{(b - a)^2}{12}$ | Equal probability density across interval. |\n| **Exponential($\\lambda$)** | Continuous| $\\lambda e^{-\\lambda x}$ ($x \\ge 0$) | $\\frac{1}{\\lambda}$ | $\\frac{1}{\\lambda^2}$ | **Memoryless Property:** $P(X > s + t \\mid X > s) = P(X > t)$. |\n| **Normal / Gaussian** | Continuous | $\\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}$ | $\\mu$ | $\\sigma^2$ | Symmetric bell curve; Central Limit Theorem limit. |\n",
      "questions": [
        {
          "id": "em-rv-1",
          "question": "For a continuous random variable X with probability density function f(x), what is the probability that X equals an exact specific value c (i.e. P(X = c))?",
          "options": [
            "f(c)",
            "1",
            "0",
            "1 / f(c)"
          ],
          "correct_option": 2,
          "explanation": "For any continuous random variable, probability is represented by the area under the PDF curve. The area over a single point c is ∫_c^c f(x) dx = 0."
        },
        {
          "id": "em-rv-2",
          "question": "What is the relationship between the Cumulative Distribution Function F(x) and Probability Density Function f(x) for a continuous variable?",
          "options": [
            "F(x) = f'(x)",
            "f(x) = F'(x) (derivative of CDF)",
            "F(x) = 1 / f(x)",
            "f(x) = F(x)^2"
          ],
          "correct_option": 1,
          "explanation": "By the Fundamental Theorem of Calculus, the probability density function f(x) is the derivative of the cumulative distribution function F(x): f(x) = d/dx [F(x)]."
        },
        {
          "id": "em-rv-3",
          "question": "For a continuous random variable X with probability density function f(x), what is the total area under f(x) from -infinity to +infinity?",
          "options": [
            "1",
            "0",
            "infinity",
            "0.5"
          ],
          "correct_option": 0,
          "explanation": "By the fundamental axiom of probability, the total probability over the entire support must equal 1: integral from -infinity to +infinity of f(x) dx = 1."
        }
      ],
      "prerequisites": [
        "Sample Space and Probability Events",
        "Calculus Integrals and Summations"
      ],
      "externalResources": [
        {
          "title": "Random Variables and Probability Functions — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/random-variables-in-probability/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Probabilistic Systems Analysis (6.041) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-probability-distributions",
      "slug": "probability-distributions",
      "title": "Probability Distributions",
      "description": "Discrete distributions (Bernoulli, Binomial, Poisson) and continuous distributions (Uniform, Exponential, Normal/Gaussian).",
      "estimatedMinutes": 18,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "Binomial: n independent Bernoulli trials; P(X = k) = C(n, k) * p^k * (1 - p)^(n - k); Mean = np, Var = np(1 - p).",
        "Poisson: Rare events distribution; P(X = k) = (lambda^k * e^(-lambda)) / k!; Mean = Variance = lambda.",
        "Exponential: Memoryless property P(X > s + t | X > s) = P(X > t); models arrival waiting times.",
        "Normal (Gaussian): Bell curve; 68-95-99.7 empirical rule for standard deviations."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Probability+Distributions+Binomial+Poisson+Normal+Exponential+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Probability Distributions: Discrete, Continuous & Limit Theorems\n\nProbability distributions mathematically describe how probabilities are assigned over the sample space of a random variable.\n\n---\n\n## 1. Discrete Probability Distributions\n\n1. **Binomial Distribution ($X \\sim \\text{Bin}(n, p)$):**\n   - Models the number of successes in $n$ independent Bernoulli trials with constant success probability $p$.\n   $$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}, \\quad k \\in \\{0, 1, \\dots, n\\}$$\n   $$\\text{Mean: } \\mu = n p, \\quad \\text{Variance: } \\sigma^2 = n p (1 - p)$$\n   - Mode: $\\lfloor (n + 1)p \\rfloor$.\n2. **Poisson Distribution ($X \\sim \\text{Poisson}(\\lambda)$):**\n   - Models arrival counts of rare events occurring at a constant average rate $\\lambda > 0$ over a continuous interval of time or space.\n   $$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad k \\in \\{0, 1, 2, \\dots\\}$$\n   $$\\text{Mean: } \\mu = \\lambda, \\quad \\text{Variance: } \\sigma^2 = \\lambda \\quad (\\text{Variance-to-Mean Ratio } = 1)$$\n   - **Poisson Limit Theorem:** As $n \\to \\infty$ and $p \\to 0$ with $n p = \\lambda$ constant, $\\text{Bin}(n, p) \\to \\text{Poisson}(\\lambda)$.\n\n---\n\n## 2. Continuous Probability Distributions\n\n1. **Exponential Distribution ($X \\sim \\text{Exp}(\\lambda)$):**\n   - Models the waiting time between consecutive events in a Poisson process.\n   $$f(x) = \\lambda e^{-\\lambda x} \\quad (x \\ge 0), \\quad F(x) = 1 - e^{-\\lambda x}$$\n   $$\\text{Mean: } \\mu = \\frac{1}{\\lambda}, \\quad \\text{Variance: } \\sigma^2 = \\frac{1}{\\lambda^2}$$\n   - **Memoryless Property:** The *only* continuous distribution satisfying:\n     $$P(X > s + t \\mid X > s) = P(X > t)$$\n2. **Normal (Gaussian) Distribution ($X \\sim \\mathcal{N}(\\mu, \\sigma^2)$):**\n   - Ubiquitous continuous distribution governed by the **Central Limit Theorem (CLT)**.\n   $$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}$$\n   - **Standard Normal Transformation:** $Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)$.\n   - **Empirical 68-95-99.7 Rule:**\n     - $P(\\mu - \\sigma \\le X \\le \\mu + \\sigma) \\approx 68.27\\%$\n     - $P(\\mu - 2\\sigma \\le X \\le \\mu + 2\\sigma) \\approx 95.45\\%$\n     - $P(\\mu - 3\\sigma \\le X \\le \\mu + 3\\sigma) \\approx 99.73\\%$\n",
      "questions": [
        {
          "id": "em-dist-1",
          "question": "For a Poisson distributed random variable with parameter λ = 4, what is its variance?",
          "options": [
            "2",
            "4",
            "16",
            "8"
          ],
          "correct_option": 1,
          "explanation": "A hallmark property of the Poisson distribution is that its variance equals its mean parameter λ. Hence, Variance = λ = 4."
        },
        {
          "id": "em-dist-2",
          "question": "Which probability distribution uniquely satisfies the 'memoryless property' among continuous random variables?",
          "options": [
            "Normal distribution",
            "Uniform distribution",
            "Exponential distribution",
            "Gamma distribution"
          ],
          "correct_option": 2,
          "explanation": "The exponential distribution is the only continuous probability distribution with the memoryless property: P(X > s + t | X > s) = P(X > t)."
        },
        {
          "id": "em-dist-3",
          "question": "In a Poisson distribution with parameter lambda, what is the mean and variance?",
          "options": [
            "Mean = lambda and Variance = lambda",
            "Mean = lambda and Variance = lambda^2",
            "Mean = lambda and Variance = sqrt(lambda)",
            "Mean = 1/lambda and Variance = 1/lambda^2"
          ],
          "correct_option": 0,
          "explanation": "A distinctive mathematical property of the Poisson distribution is that its expected value (mean) and its variance are identical and equal to parameter lambda."
        }
      ],
      "prerequisites": [
        "Random Variables",
        "Permutations and Combinations"
      ],
      "externalResources": [
        {
          "title": "Standard Probability Distributions — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/probability-distributions-in-statistics/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Applied Probability & Distributions (6.041) — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-041-probabilistic-systems-analysis-and-applied-probability-fall-2010/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-mean-variance-and-standard-deviation",
      "slug": "mean-variance-and-standard-deviation",
      "title": "Mean, Variance, and Standard Deviation",
      "description": "Measures of central tendency and dispersion, variance formulas, covariance, correlation coefficient, and Chebyshev's inequality.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "TCS Digital",
        "Infosys",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "Mean (Expectation): Center of mass E[X].",
        "Variance: Var(X) = E[X^2] - (E[X])^2; always non-negative (>= 0).",
        "Scaling properties: Var(aX + b) = a^2 * Var(X); SD(aX + b) = |a| * SD(X).",
        "For independent variables X and Y: Var(X + Y) = Var(X) + Var(Y)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Mean+Variance+Standard+Deviation+Properties+Probability+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Random Variables, Expectation, Variance, and Classical Distributions\n\nRandom variables map outcomes of random phenomena into real numbers, allowing statistical modeling of execution latencies, network packet arrivals, and stochastic algorithmic performance.\n\n---\n\n## 1. Expected Value (Mean $\\mu$) and Variance ($\\sigma^2$)\n\n### Expected Value $E[X]$:\nThe probability-weighted average of all possible values:\n- **Discrete:** $E[X] = \\sum x_i \\cdot P(X = x_i)$.\n- **Continuous:** $E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x) \\, dx$.\n- **Linearity of Expectation (Holds ALWAYS, even if variables are dependent!):**\n  $$\\mathbf{E[aX + bY] = aE[X] + bE[Y]}$$\n\n### Variance $\\text{Var}(X)$ and Standard Deviation ($\\sigma$):\nMeasures dispersion around the mean:\n$$\\mathbf{\\text{Var}(X) = \\sigma^2 = E[(X - \\mu)^2] = E[X^2] - (E[X])^2}$$\n- **Variance Scaling:** $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$.\n- **Sum of Independent Variables:** $\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)$ (if $X, Y$ independent).\n- **Standard Deviation:** $\\sigma = \\sqrt{\\text{Var}(X)}$.\n\n---\n\n## 2. Classical Probability Distributions\n\n### 1. Binomial Distribution ($X \\sim B(n, p)$)\nNumber of successes in $n$ independent Bernoulli trials:\n- PMF: $P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}$.\n- **Mean:** $\\mu = np$.\n- **Variance:** $\\sigma^2 = np(1 - p)$.\n\n### 2. Poisson Distribution ($X \\sim \\text{Poisson}(\\lambda)$)\nModels rare events occurring at a constant average rate $\\lambda$ per unit interval (e.g., web server request arrivals):\n- PMF: $P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$.\n- **Mean = Variance = $\\lambda$**!\n\n### 3. Normal (Gaussian) Distribution ($X \\sim N(\\mu, \\sigma^2)$)\nContinuous bell-curve governed by the Central Limit Theorem:\n- **Empirical 68-95-99.7 Rule:**\n  - $68.2\\%$ of data falls within $\\mu \\pm 1\\sigma$.\n  - $95.4\\%$ of data falls within $\\mu \\pm 2\\sigma$.\n  - $99.7\\%$ of data falls within $\\mu \\pm 3\\sigma$.\n\n---\n\n## 3. Summary Cheatsheet & Key Formulas\n\n- **Variance Formula:** $\\text{Var}(X) = E[X^2] - (E[X])^2$.\n- **Linearity of Expectation:** $E[X + Y] = E[X] + E[Y]$ (always).\n- **Poisson Unique Identity:** $\\text{Mean} = \\text{Variance} = \\lambda$.\n- **Binomial Moments:** $\\text{Mean} = np, \\quad \\text{Variance} = npq$.\n",
      "questions": [
        {
          "id": "em-mvs-1",
          "question": "If random variable X has Var(X) = 5, what is Var(3X - 7)?",
          "options": [
            "8",
            "15",
            "45",
            "38"
          ],
          "correct_option": 2,
          "explanation": "Var(aX + b) = a^2 * Var(X). For a = 3 and b = -7: Var(3X - 7) = 3^2 * Var(X) = 9 * 5 = 45."
        },
        {
          "id": "em-mvs-2",
          "question": "If X and Y are independent random variables with Var(X) = 4 and Var(Y) = 3, what is Var(X - Y)?",
          "options": [
            "1",
            "7",
            "-1",
            "12"
          ],
          "correct_option": 1,
          "explanation": "Because variances add for independent variables: Var(X - Y) = Var(X + (-1)Y) = Var(X) + (-1)^2 * Var(Y) = 4 + 3 = 7."
        },
        {
          "id": "em-stat-3",
          "question": "If Var(X) = 9, what is Var(3X + 5)?",
          "options": [
            "81",
            "32",
            "27",
            "14"
          ],
          "correct_option": 0,
          "explanation": "Using variance properties: Var(aX + b) = a^2 * Var(X). Here a = 3 and b = 5: Var(3X + 5) = 3^2 * Var(X) = 9 * 9 = 81."
        }
      ],
      "prerequisites": [
        "Probability basics and discrete random variables",
        "Summations and integrals"
      ],
      "externalResources": [
        {
          "title": "MIT 18.05: Random Variables, Expectation, and Variance",
          "url": "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Mean, Variance and Standard Deviation",
          "url": "https://www.geeksforgeeks.org/mean-variance-and-standard-deviation/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Probability Distributions (Binomial, Poisson, Normal)",
          "url": "https://www.interviewbit.com/technical-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-expectation",
      "slug": "expectation",
      "title": "Expectation",
      "description": "Expected value operator, linearity of expectation, conditional expectation, and moments of random variables.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "Linearity of Expectation: E[X + Y] = E[X] + E[Y] holds regardless of whether X and Y are independent!",
        "E[c] = c for any constant c; E[c * X] = c * E[X].",
        "If X and Y are independent: E[X * Y] = E[X] * E[Y].",
        "Indicator random variables simplify complex counting problems via linearity of expectation."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Expectation+Linearity+of+Expectation+Discrete+Continuous+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Mathematical Expectation, Moments & Indicator Variables\n\n**Mathematical Expectation (Expected Value)** formalizes the operational center of mass of a random variable's probability measure.\n\n---\n\n## 1. Formal Definition: Discrete vs. Continuous\n\n$$E[X] = \\begin{cases} \\displaystyle\\sum_{i} x_i P(X = x_i) & (\\text{Discrete}) \\\\[8pt] \\displaystyle\\int_{-\\infty}^{\\infty} x f(x) \\, dx & (\\text{Continuous}) \\end{cases}$$\n\n### Fundamental Properties:\n1. **Constant Rule:** $E[c] = c$ for any real constant $c$.\n2. **Scalar Multiplication:** $E[a X] = a E[X]$.\n3. **Linearity of Expectation (Universal Law):**\n   $$E\\left[\\sum_{i=1}^n a_i X_i\\right] = \\sum_{i=1}^n a_i E[X_i]$$\n   > **Critical Placement Fact:** Linearity of expectation holds **universally**, regardless of whether variables $X_i$ are independent, correlated, or mutually dependent!\n\n---\n\n## 2. Expectation of Products & Independence\n\n- If $X$ and $Y$ are **stochastically independent**:\n  $$E[X \\cdot Y] = E[X] \\cdot E[Y]$$\n- If $X$ and $Y$ are correlated:\n  $$E[X \\cdot Y] = E[X] \\cdot E[Y] + \\text{Cov}(X, Y)$$\n\n---\n\n## 3. The Power of Indicator Random Variables\n\nIn algorithm analysis and interview probability puzzles (e.g., Hat-Check Problem, Inversions in Permutations, Coupon Collector):\n1. Define indicator variable $I_A$ for event $A$:\n   $$I_A = \\begin{cases} 1 & \\text{if } A \\text{ occurs} \\\\ 0 & \\text{if } A \\text{ does not occur} \\end{cases}$$\n2. Note that $E[I_A] = 1 \\cdot P(A) + 0 \\cdot P(\\overline{A}) = P(A)$.\n3. Express total count as $X = \\sum_{i=1}^n I_{A_i}$.\n4. Compute $E[X] = \\sum_{i=1}^n E[I_{A_i}] = \\sum_{i=1}^n P(A_i)$ without needing the joint distribution!\n\n---\n\n## 4. Higher Moments & Generating Functions\n\n- **Raw Moments:** $\\alpha_k = E[X^k]$ (First raw moment is the Mean $\\mu$).\n- **Central Moments:** $\\mu_k = E[(X - \\mu)^k]$:\n  - $\\mu_1 = 0$\n  - $\\mu_2 = \\text{Var}(X) = E[X^2] - (E[X])^2$\n  - $\\mu_3$: Skewness (asymmetry of distribution)\n  - $\\mu_4$: Kurtosis (peakedness and heavy tails)\n- **Moment Generating Function (MGF):**\n  $$M_X(t) = E[e^{tX}] \\implies E[X^k] = \\left.\\frac{d^k M_X(t)}{dt^k}\\right|_{t=0}$$\n",
      "questions": [
        {
          "id": "em-exp-1",
          "question": "Under what condition does the Linearity of Expectation E[X + Y] = E[X] + E[Y] hold?",
          "options": [
            "Only when X and Y are independent",
            "Always, whether X and Y are independent or dependent",
            "Only when X and Y are normally distributed",
            "Only for discrete random variables"
          ],
          "correct_option": 1,
          "explanation": "Linearity of Expectation is a universal algebraic property of expectation integrals/sums that holds universally, regardless of any correlation or dependency between X and Y."
        },
        {
          "id": "em-exp-2",
          "question": "What is the expected value of the sum when two standard 6-sided dice are rolled?",
          "options": [
            "6",
            "7",
            "8",
            "3.5"
          ],
          "correct_option": 1,
          "explanation": "E[Die] = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5. By Linearity of Expectation: E[Die1 + Die2] = E[Die1] + E[Die2] = 3.5 + 3.5 = 7."
        },
        {
          "id": "em-exp-3",
          "question": "If X and Y are any two random variables (not necessarily independent), what is E[2X - 3Y + 4]?",
          "options": [
            "2E[X] - 3E[Y] + 4 (by Linearity of Expectation)",
            "2E[X] * 3E[Y] + 4",
            "Cannot be determined without joint distribution",
            "2E[X] - 3E[Y]"
          ],
          "correct_option": 0,
          "explanation": "Linearity of expectation holds universally for any random variables regardless of whether they are independent or correlated: E[aX + bY + c] = aE[X] + bE[Y] + c."
        }
      ],
      "prerequisites": [
        "Discrete and Continuous Random Variables",
        "Linearity of Expectation"
      ],
      "externalResources": [
        {
          "title": "Mathematical Expectation, Variance and Covariance — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/expectation-and-variance/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "em-numerical-methods-basics",
      "slug": "numerical-methods-basics",
      "title": "Numerical Methods Basics",
      "description": "Root finding (Newton-Raphson, Bisection, Regula-Falsi), numerical integration (Trapezoidal, Simpson's 1/3 and 3/8 rules), and Euler's method.",
      "estimatedMinutes": 16,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "TCS Digital",
        "Infosys",
        "ISRO"
      ],
      "keyTakeaways": [
        "Newton-Raphson formula: x_(n+1) = x_n - f(x_n) / f'(x_n); has quadratic convergence (order 2).",
        "Bisection method has linear convergence (guaranteed if f(a)*f(b) < 0).",
        "Trapezoidal Rule approximates integral with linear segments; error O(h^2).",
        "Simpson's 1/3 Rule approximates with parabolas; requires even number of intervals; error O(h^4)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Numerical+Methods+Newton+Raphson+Trapezoidal+Simpsons+Rule+Engineering+Mathematics+gate+lecture",
      "notesMarkdown": "# Numerical Methods & Computational Mathematics\n\nNumerical methods provide computational algorithms to approximate solutions to non-linear transcendental equations, compute definite integrals without closed-form antiderivatives, and integrate ordinary differential equations (ODEs).\n\n---\n\n## 1. Root-Finding Algorithms\n\nGiven a continuous function $f(x) = 0$:\n\n| Method | Iteration Formula | Order of Convergence ($p$) | Conditions & Caveats |\n| :--- | :--- | :--- | :--- |\n| **Bisection Method** | $c = \\frac{a + b}{2}$ where $f(a) \\cdot f(b) < 0$ | $p = 1$ (Linear) | Guaranteed to converge (by Intermediate Value Theorem); error halves every step: $\\epsilon_{n+1} = 0.5 \\epsilon_n$. |\n| **Regula-Falsi (False Position)** | $c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$ | $p = 1$ (Linear) | Brackets root like Bisection, but converges faster than Bisection in practice; one endpoint can remain stagnant. |\n| **Secant Method** | $x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$ | $p = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$ (Superlinear) | Does not require evaluation of analytical derivative $f'(x)$; does not guarantee bracket retention. |\n| **Newton-Raphson Method** | $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$ | $p = 2$ (Quadratic) | Very fast: digits of accuracy double each iteration. **Fails if $f'(x_n) \\approx 0$** (division by zero / horizontal tangent). |\n\n> [!WARNING]\n> For Newton-Raphson: Quadratic convergence holds strictly for **simple roots** ($f'(r) \\ne 0$). If the root has multiplicity $m > 1$, Newton-Raphson degenerates to **linear convergence** ($p = 1$), unless modified to $x_{n+1} = x_n - m \\frac{f(x_n)}{f'(x_n)}$.\n\n---\n\n## 2. Numerical Integration (Newton-Cotes Formulas)\n\nTo compute $\\int_a^b f(x) \\, dx$ with step size $h = \\frac{b - a}{n}$ and nodes $x_i = a + i \\cdot h$:\n\n### A. Trapezoidal Rule ($n \\ge 1$, linear polynomials)\n$$\\int_a^b f(x) \\, dx \\approx \\frac{h}{2} \\Big[ (y_0 + y_n) + 2 \\sum_{i=1}^{n-1} y_i \\Big]$$\n- **Global Truncation Error:** $O(h^2) = -\\frac{(b - a) h^2}{12} f''(\\xi)$. Exact for polynomials up to degree 1.\n\n### B. Simpson's 1/3rd Rule ($n$ MUST be even, parabolic polynomials)\n$$\\int_a^b f(x) \\, dx \\approx \\frac{h}{3} \\Big[ (y_0 + y_n) + 4 \\sum_{\\text{odd } i} y_i + 2 \\sum_{\\text{even } i} y_i \\Big]$$\n- **Global Truncation Error:** $O(h^4) = -\\frac{(b - a) h^4}{180} f^{(4)}(\\xi)$. Exact for polynomials up to degree 3!\n- **Constraint:** Requires the total number of subintervals $n$ to be an **even number** (i.e. an odd number of sample points).\n\n### C. Simpson's 3/8th Rule ($n$ MUST be a multiple of 3, cubic polynomials)\n$$\\int_a^b f(x) \\, dx \\approx \\frac{3h}{8} \\Big[ (y_0 + y_n) + 3(y_1 + y_2 + y_4 + y_5 + \\dots) + 2(y_3 + y_6 + \\dots) \\Big]$$\n- **Global Truncation Error:** $O(h^4)$. Exact for polynomials up to degree 3.\n\n---\n\n## 3. Numerical Solutions of First-Order ODEs ($\\frac{dy}{dx} = f(x, y)$)\n\n### Euler's Method\n$$y_{n+1} = y_n + h \\cdot f(x_n, y_n)$$\n- Local error $O(h^2)$, global error $O(h)$ (First-order method).\n\n### Runge-Kutta 4th Order (RK4)\nComputes four slope estimates per step ($k_1, k_2, k_3, k_4$):\n$$y_{n+1} = y_n + \\frac{h}{6} (k_1 + 2k_2 + 2k_3 + k_4)$$\n- Global error $O(h^4)$ (Fourth-order method; gold standard for numerical simulation).\n",
      "questions": [
        {
          "id": "em-nm-1",
          "question": "What is the order of convergence of the Newton-Raphson method for simple roots?",
          "options": [
            "1 (Linear)",
            "2 (Quadratic)",
            "3 (Cubic)",
            "1.618"
          ],
          "correct_option": 1,
          "explanation": "The Newton-Raphson method has quadratic convergence (order 2), meaning the number of correct decimal digits roughly doubles with each iteration."
        },
        {
          "id": "em-nm-2",
          "question": "Simpson's 1/3rd Rule for numerical integration requires the total number of subintervals (n) to be:",
          "options": [
            "Any positive integer",
            "An even number",
            "An odd number",
            "A power of 2"
          ],
          "correct_option": 1,
          "explanation": "Simpson's 1/3rd rule fits parabolic curves across pairs of adjacent subintervals, which strictly requires the total number of subintervals n to be an even integer."
        },
        {
          "id": "em-num-3",
          "question": "What is the order of convergence of the Secant Method for finding numerical root approximations?",
          "options": [
            "Superlinear (Order approximately 1.618, Golden Ratio)",
            "Linear (Order 1.0)",
            "Quadratic (Order 2.0)",
            "Cubic (Order 3.0)"
          ],
          "correct_option": 0,
          "explanation": "The Secant Method approximates derivatives with finite differences, achieving a superlinear order of convergence equal to the golden ratio phi = (1 + sqrt(5)) / 2 approx 1.618."
        }
      ],
      "prerequisites": [
        "Differential Calculus",
        "Matrix Gaussian Elimination"
      ],
      "externalResources": [
        {
          "title": "Numerical Methods: Root Finding & Quadrature — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/program-for-newton-raphson-method/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    }
  ]
};
