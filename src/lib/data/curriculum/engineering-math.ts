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
      "notesMarkdown": "# Matrices, Determinants, and Matrix Algebra\n\nMatrix algebra forms the foundation of graphics, machine learning, and linear systems engineering.\n\n---\n\n## 1. Determinants and Properties\nFor an $n \\times n$ square matrix $A$:\n- $\\det(A^T) = \\det(A)$\n- $\\det(A B) = \\det(A) \\cdot \\det(B)$\n- $\\det(k A) = k^n \\det(A)$ for scalar $k$ *(Classic GATE trap!)*\n- $\\det(A^{-1}) = \\frac{1}{\\det(A)}$ (for non-singular $A$ where $\\det(A) \\ne 0$)\n- If any two rows/columns are identical or proportional, $\\det(A) = 0$.\n- Triangulating a matrix preserves determinant as the product of main diagonal entries:\n  $$\\det(A) = \\prod_{i=1}^n a_{ii}$$\n\n---\n\n## 2. Matrix Inversion & Adjoint\n- **Adjoint:** $\\text{Adj}(A) = (C_{ij})^T$ where $C_{ij}$ is the cofactor $(-1)^{i+j} M_{ij}$.\n- **Inverse:** $A^{-1} = \\frac{\\text{Adj}(A)}{\\det(A)}$.\n- **Key Identities:**\n  $$A \\cdot \\text{Adj}(A) = \\det(A) \\cdot I_n$$\n  $$\\det(\\text{Adj}(A)) = (\\det(A))^{n-1}$$\n  $$\\det(\\text{Adj}(\\text{Adj}(A))) = (\\det(A))^{(n-1)^2}$$\n",
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
          "question": "If A is a 3 x 3 square matrix with det(A) = 4, what is the value of det(2A)?",
          "options": [
            "32",
            "8",
            "16",
            "24"
          ],
          "correct_option": 0,
          "explanation": "For an n x n matrix, det(k * A) = k^n * det(A). Here n = 3 and k = 2, so det(2A) = 2^3 * det(A) = 8 * 4 = 32."
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
      "notesMarkdown": "# Systems of Linear Equations\n\nFor a system of $m$ linear equations in $n$ variables: $A X = B$.\n\n---\n\n## 1. Rouché-Capelli Consistency Theorem\nLet $[A | B]$ denote the augmented matrix:\n1. **Inconsistent (No solution):**\n   $$\\text{rank}(A) < \\text{rank}([A | B])$$\n2. **Consistent with Unique Solution:**\n   $$\\text{rank}(A) = \\text{rank}([A | B]) = n \\quad (\\text{number of variables})$$\n3. **Consistent with Infinite Solutions:**\n   $$\\text{rank}(A) = \\text{rank}([A | B]) = r < n \\quad (n - r \\text{ independent free variables})$$\n\n---\n\n## 2. Homogeneous Systems ($A X = 0$)\n- Always consistent (trivial solution $X = 0$).\n- Has non-trivial (infinite) solutions **if and only if** $\\text{rank}(A) < n$ (or $\\det(A) = 0$ for square matrix).\n",
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
      "notesMarkdown": "# Eigenvalues and Eigenvectors\n\n---\n\n## 1. Characteristic Equation\n$$A v = \\lambda v \\iff (A - \\lambda I) v = 0 \\iff \\det(A - \\lambda I) = 0$$\n\n---\n\n## 2. Essential Eigenvalue Properties\n- **Sum of Eigenvalues:** $\\sum \\lambda_i = \\text{Trace}(A) = \\sum a_{ii}$.\n- **Product of Eigenvalues:** $\\prod \\lambda_i = \\det(A)$.\n- If $\\lambda$ is an eigenvalue of $A$:\n  - $A^{-1}$ has eigenvalue $\\frac{1}{\\lambda}$ (if $\\det(A) \\ne 0$).\n  - $A^k$ has eigenvalue $\\lambda^k$.\n  - $A + kI$ has eigenvalue $\\lambda + k$.\n\n---\n\n## 3. Cayley-Hamilton Theorem\nIf characteristic polynomial is $P(\\lambda) = \\lambda^n + c_{n-1} \\lambda^{n-1} + \\dots + c_0 = 0$, then:\n$$A^n + c_{n-1} A^{n-1} + \\dots + c_0 I = 0$$\n",
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
          "question": "What is the relationship between the trace and determinant of a matrix and its eigenvalues lambda_i?",
          "options": [
            "Trace = Sum of eigenvalues, Determinant = Product of eigenvalues",
            "Trace = Product of eigenvalues, Determinant = Sum of eigenvalues",
            "Trace = Max eigenvalue, Determinant = Min eigenvalue",
            "Trace = Sum of squares of eigenvalues, Determinant = 0"
          ],
          "correct_option": 0,
          "explanation": "For any square matrix, the sum of its eigenvalues equals the trace (sum of diagonal entries), and the product of its eigenvalues equals its determinant."
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
      "notesMarkdown": "# Matrix Rank, Nullity, and Vector Spaces\n\nThe rank of a matrix describes the dimension of the vector space spanned by its rows or columns.\n\n---\n\n## 1. Rank Definitions and Properties\n- **Row Rank = Column Rank = $\\text{Rank}(A) = \\rho(A)$**: The maximum number of linearly independent rows or columns.\n- For an $m \\times n$ matrix:\n  $$\\rho(A) \\le \\min(m, n)$$\n- **Rank of Product:**\n  $$\\rho(A B) \\le \\min(\\rho(A), \\rho(B))$$\n  $$\\rho(A + B) \\le \\rho(A) + \\rho(B)$$\n- **Sylvester's Law of Nullity:**\n  $$\\text{Rank}(A) + \\text{Nullity}(A) = n \\quad (\\text{where } n \\text{ is number of columns})$$\n\n---\n\n## 2. Row Echelon Form (REF)\n- Elementary row operations (row swapping, scalar multiplication, row addition) preserve rank.\n- **Rank = Number of non-zero rows in Row Echelon Form**.\n",
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
      "notesMarkdown": "# Limits and Continuity in Calculus\n\nLimits analyze the local behavior of functions near isolated domain points.\n\n---\n\n## 1. Limit Theorems and Standard Limits\n- **L'Hôpital's Rule:** If $\\lim_{x \\to c} \\frac{f(x)}{g(x)}$ yields indeterminate forms $\\left[\\frac{0}{0}\\right]$ or $\\left[\\frac{\\infty}{\\infty}\\right]$:\n  $$\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}$$\n- **High-Yield Standard Limits:**\n  $$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1$$\n  $$\\lim_{x \\to \\infty} \\left(1 + \\frac{k}{x}\\right)^x = e^k, \\quad \\lim_{x \\to 0} (1 + kx)^{1/x} = e^k$$\n\n---\n\n## 2. Continuity\n- A function $f(x)$ is continuous at $x = c \\iff$:\n  1. $f(c)$ is defined.\n  2. $\\lim_{x \\to c} f(x)$ exists (i.e. Left Hand Limit = Right Hand Limit).\n  3. $\\lim_{x \\to c} f(x) = f(c)$.\n- **Intermediate Value Theorem (IVT):** If $f$ is continuous on $[a, b]$ and $f(a) \\cdot f(b) < 0$, then $\\exists c \\in (a, b)$ such that $f(c) = 0$ (at least one real root).\n",
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
      "notesMarkdown": "# Differentiation, Mean Value Theorems, and Integration\n\nCalculus studies instantaneous rates of change and accumulation.\n\n---\n\n## 1. Mean Value Theorems (MVT)\n- **Rolle's Theorem:** If $f(x)$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then $\\exists c \\in (a, b)$ such that:\n  $$f'(c) = 0$$\n- **Lagrange's Mean Value Theorem:** Under continuity on $[a, b]$ and differentiability on $(a, b)$, $\\exists c \\in (a, b)$ such that:\n  $$f'(c) = \\frac{f(b) - f(a)}{b - a}$$\n- **Cauchy's MVT:** $\\frac{f'(c)}{g'(c)} = \\frac{f(b) - f(a)}{g(b) - g(a)}$.\n\n---\n\n## 2. Definite Integrals and Properties\n- **Fundamental Theorem of Calculus:** $\\frac{d}{dx} \\left[ \\int_{a}^{x} f(t) dt \\right] = f(x)$.\n- **Leibniz Integral Rule:**\n  $$\\frac{d}{dx} \\left[ \\int_{u(x)}^{v(x)} f(t) dt \\right] = f(v(x)) \\cdot v'(x) - f(u(x)) \\cdot u'(x)$$\n- **King's Property:** $\\int_{a}^{b} f(x) dx = \\int_{a}^{b} f(a + b - x) dx$.\n",
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
      "notesMarkdown": "# Maxima and Minima: Optimization Techniques\n\nFinding local and global extrema of single and multivariable functions.\n\n---\n\n## 1. Single-Variable Optimization\n- **Critical Points:** Points where $f'(x) = 0$ or $f'(x)$ is undefined.\n- **Second Derivative Test:**\n  - If $f'(c) = 0$ and $f''(c) < 0 \\implies$ Local Maximum at $c$.\n  - If $f'(c) = 0$ and $f''(c) > 0 \\implies$ Local Minimum at $c$.\n  - If $f'(c) = 0$ and $f''(c) = 0 \\implies$ Inconclusive (check higher-order derivatives or sign change of $f'$).\n\n---\n\n## 2. Multivariable Extrema (Hessian Matrix)\nFor $f(x, y)$, stationary points satisfy $f_x = 0$ and $f_y = 0$.\n- Compute discriminant:\n  $$D = f_{xx} f_{yy} - (f_{xy})^2$$\n  1. If $D > 0$ and $f_{xx} > 0 \\implies$ Local Minimum.\n  2. If $D > 0$ and $f_{xx} < 0 \\implies$ Local Maximum.\n  3. If $D < 0 \\implies$ **Saddle Point** (neither maximum nor minimum).\n  4. If $D = 0 \\implies$ Inconclusive.\n",
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
      "notesMarkdown": "# Partial Derivatives and Vector Calculus\n\nMultivariable calculus extends differentiation across multiple independent spatial dimensions.\n\n---\n\n## 1. Directional Derivatives & Gradient\n- **Gradient Vector ($\\nabla f$):** Points in the direction of **maximum rate of increase**:\n  $$\\nabla f = \\frac{\\partial f}{\\partial x} \\hat{i} + \\frac{\\partial f}{\\partial y} \\hat{j} + \\frac{\\partial f}{\\partial z} \\hat{k}$$\n  - Maximum rate of increase $= |\\nabla f|$.\n  - Directional derivative along unit vector $\\hat{u}$: $D_u f = \\nabla f \\cdot \\hat{u}$.\n\n---\n\n## 2. Divergence and Curl\n- **Divergence ($\\nabla \\cdot \\vec{F}$):** Net outward flux per unit volume.\n  - If $\\nabla \\cdot \\vec{F} = 0 \\implies$ Field is **Solenoidal**.\n- **Curl ($\\nabla \\times \\vec{F}$):** Tendency to rotate about an axis.\n  - If $\\nabla \\times \\vec{F} = \\vec{0} \\implies$ Field is **Irrotational (Conservative)**, and $\\vec{F} = \\nabla \\phi$.\n",
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
      "notesMarkdown": "# Conditional Probability and Bayes' Theorem\n\nBayesian probability updates the likelihood of an hypothesis as more evidence becomes available.\n\n---\n\n## 1. Conditional Probability\nFor events $A$ and $B$ with $P(B) > 0$:\n$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$$\n- If $A$ and $B$ are **independent**: $P(A \\mid B) = P(A)$, which implies $P(A \\cap B) = P(A) \\cdot P(B)$.\n\n---\n\n## 2. Law of Total Probability\nIf $B_1, B_2, \\dots, B_k$ partition sample space $S$ ($B_i \\cap B_j = \\emptyset$, $\\bigcup B_i = S$):\n$$P(A) = \\sum_{i=1}^{k} P(A \\mid B_i) \\cdot P(B_i)$$\n\n---\n\n## 3. Bayes' Theorem\nCalculates posterior probability of cause $B_j$ given observed effect $A$:\n$$P(B_j \\mid A) = \\frac{P(A \\mid B_j) \\cdot P(B_j)}{\\sum_{i=1}^{k} P(A \\mid B_i) \\cdot P(B_i)}$$\n",
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
          "question": "If P(A) = 0.4, P(B) = 0.5, and events A and B are independent, what is P(A or B)?",
          "options": [
            "0.70",
            "0.90",
            "0.20",
            "0.60"
          ],
          "correct_option": 0,
          "explanation": "For independent events: P(A and B) = P(A) * P(B) = 0.4 * 0.5 = 0.20. By addition rule: P(A or B) = P(A) + P(B) - P(A and B) = 0.4 + 0.5 - 0.20 = 0.70."
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
      "notesMarkdown": "# Random Variables\n\nA random variable $X$ is a function that assigns a real number to each outcome in a sample space.\n\n---\n\n## 1. Discrete vs Continuous\n\n| Property | Discrete Random Variable | Continuous Random Variable |\n| :--- | :--- | :--- |\n| **Probability Function** | PMF: $P(X = x) = p(x)$ | PDF: $f(x)$ where $P(a \\le X \\le b) = \\int_a^b f(x) dx$ |\n| **Normalization** | $\\sum_{x} p(x) = 1$ | $\\int_{-\\infty}^{\\infty} f(x) \\, dx = 1$ |\n| **Point Probability** | $P(X = x)$ can be $> 0$ | $P(X = c) = 0$ for any exact point $c$! |\n| **CDF $F(x)$** | $\\sum_{t \\le x} p(t)$ | $\\int_{-\\infty}^{x} f(t) \\, dt$ |\n",
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
      "notesMarkdown": "# Probability Distributions\n\n---\n\n## 1. Discrete Distributions\n- **Binomial Distribution ($X \\sim B(n, p)$):**\n  $$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}$$\n  $$\\mu = n p, \\quad \\sigma^2 = n p (1 - p)$$\n- **Poisson Distribution ($X \\sim \\text{Poisson}(\\lambda)$):**\n  $$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad \\mu = \\sigma^2 = \\lambda$$\n\n---\n\n## 2. Continuous Distributions\n- **Normal Distribution ($X \\sim \\mathcal{N}(\\mu, \\sigma^2)$):**\n  $$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}$$\n  - $68.27\\%$ of data within $\\mu \\pm 1\\sigma$\n  - $95.45\\%$ within $\\mu \\pm 2\\sigma$\n  - $99.73\\%$ within $\\mu \\pm 3\\sigma$\n",
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
      "notesMarkdown": "# Mean, Variance, and Standard Deviation\n\nMeasures of central tendency and dispersion characterize random variable distributions.\n\n---\n\n## 1. Expectation and Mean\n$$\\mu = E[X] = \\begin{cases} \\sum x_i P(x_i) & (\\text{discrete}) \\\\ \\int_{-\\infty}^{\\infty} x f(x) dx & (\\text{continuous}) \\end{cases}$$\n- **Linearity of Expectation (Always holds regardless of independence):**\n  $$E[aX + bY + c] = a E[X] + b E[Y] + c$$\n\n---\n\n## 2. Variance and Standard Deviation\n$$\\text{Var}(X) = \\sigma^2 = E[(X - \\mu)^2] = E[X^2] - (E[X])^2$$\n$$\\text{SD}(X) = \\sigma = \\sqrt{\\text{Var}(X)}$$\n- **Properties:**\n  - $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$\n  - If $X$ and $Y$ are **independent**: $\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)$.\n  - In general: $\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) + 2 \\text{Cov}(X, Y)$.\n",
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
      "notesMarkdown": "# Mathematical Expectation and Moments\n\nMathematical expectation formalizes the probability-weighted average of all possible values of a random variable.\n\n---\n\n## 1. Properties of Expected Value\n- $E[c] = c$ for constant $c$.\n- $E[aX + b] = a E[X] + b$.\n- If $X$ and $Y$ are independent random variables:\n  $$E[X \\cdot Y] = E[X] \\cdot E[Y]$$\n\n---\n\n## 2. Moments & Covariance\n- **$k$-th Moment:** $\\mu_k' = E[X^k]$.\n- **$k$-th Central Moment:** $\\mu_k = E[(X - \\mu)^k]$ ($\\mu_1 = 0, \\mu_2 = \\text{Var}(X)$).\n- **Covariance:** $\\text{Cov}(X, Y) = E[(X - \\mu_X)(Y - \\mu_Y)] = E[XY] - E[X]E[Y]$.\n- **Correlation Coefficient:** $\\rho = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y} \\in [-1, 1]$.\n",
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
      "notesMarkdown": "# Numerical Methods Basics\n\nNumerical methods compute approximate solutions to equations and integrals.\n\n---\n\n## 1. Root-Finding: Newton-Raphson Method\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$\n- **Order of Convergence:** $p = 2$ (Quadratic convergence).\n- Fails if $f'(x_n) \\approx 0$ (horizontal tangent).\n\n---\n\n## 2. Numerical Integration\n- **Trapezoidal Rule:**\n  $$\\int_a^b f(x) \\, dx \\approx \\frac{h}{2} [ (y_0 + y_n) + 2(y_1 + y_2 + \\dots + y_{n-1}) ]$$\n- **Simpson's 1/3 Rule (requires even $n$):**\n  $$\\int_a^b f(x) \\, dx \\approx \\frac{h}{3} [ (y_0 + y_n) + 4(\\text{odd}) + 2(\\text{even}) ]$$\n",
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
          "question": "What is the order of convergence of the Newton-Raphson method for finding simple roots?",
          "options": [
            "Quadratic (Order 2)",
            "Linear (Order 1)",
            "Cubic (Order 3)",
            "Superlinear (Order 1.618)"
          ],
          "correct_option": 0,
          "explanation": "Newton-Raphson has quadratic convergence (order 2) near a simple root, meaning the number of correct decimal places approximately doubles each iteration."
        }
      ]
    }
  ]
};
