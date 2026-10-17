import type { SectionCategory } from './types';

export const DBMS_CATEGORY: SectionCategory = {
  "id": "dbms",
  "slug": "dbms",
  "title": "Database Management Systems (DBMS)",
  "description": "Relational algebra, SQL queries, normalization, transactions, concurrency control, B/B+ tree indexing, and recovery.",
  "icon": "Database",
  "topics": [
    {
      "id": "dbms-architecture",
      "slug": "database-architecture",
      "title": "Database Architecture",
      "description": "ANSI-SPARC 3-schema architecture (Internal, Conceptual, External levels), physical and logical data independence, and DBMS components.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Oracle",
        "Microsoft",
        "Amazon",
        "SAP"
      ],
      "keyTakeaways": [
        "3-Schema Architecture: External (View), Conceptual (Logical), and Internal (Physical) levels.",
        "Logical Data Independence: Capacity to alter conceptual schema without altering external views.",
        "Physical Data Independence: Capacity to alter internal schema (indexing, storage layout) without altering conceptual schema."
      ],
      "notesMarkdown": "# Database Architecture & ANSI-SPARC\n\n---\n\n## 1. The 3-Level ANSI-SPARC Architecture\n1. **External Level (View Level):** What individual users or applications see. Multiple tailored views can exist over the same database.\n2. **Conceptual Level (Logical Level):** Describes *what* data is stored in the entire database and relationships among data (tables, entities, constraints).\n3. **Internal Level (Physical Level):** Describes *how* data is stored physically on disk (record formats, B-trees, hashing, compression, block layouts).\n\n---\n\n## 2. Data Independence\n- **Logical Data Independence:** Modifying the conceptual schema (e.g., adding a new attribute or table) does not require changing external schemas or existing application code.\n- **Physical Data Independence:** Modifying internal storage structures (e.g., changing file organization from heap to B+ tree) does not affect the conceptual or external schema.\n",
      "questions": [
        {
          "id": "dbms-arch-1",
          "question": "Which level of the 3-schema architecture defines the physical storage structures and file access paths on disk?",
          "options": [
            "External level",
            "Conceptual level",
            "Internal level",
            "Application level"
          ],
          "correct_option": 2,
          "explanation": "The Internal (Physical) level describes the physical storage structure, block clustering, and index layouts on disk."
        },
        {
          "id": "dbms-arch-2",
          "question": "What is Physical Data Independence?",
          "options": [
            "The ability to change conceptual schema without rewriting user queries",
            "The ability to change internal storage structures without altering conceptual schema",
            "The ability to run database without a physical hard drive",
            "The ability to change primary keys without re-indexing"
          ],
          "correct_option": 1,
          "explanation": "Physical data independence isolates changes made to disk file structures, indices, or block sizes from affecting the logical conceptual design."
        },
        {
          "id": "dbms-arch-3",
          "question": "What is 'Physical Data Independence' in the 3-schema ANSI/SPARC DBMS architecture?",
          "options": [
            "The capacity to change internal physical storage structures (e.g. indexes, file organizations) without altering the conceptual/logical schema.",
            "The ability to add new columns without recompiling the application.",
            "Running the database without a disk drive.",
            "Replicating tables across distinct physical servers."
          ],
          "correct_option": 0,
          "explanation": "Physical data independence ensures that alterations to physical storage layouts (adding B+ tree indexes, reorganizing partitions) do not require modifications to the conceptual schema or application queries."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Database+Architecture+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-er-model-and-diagrams",
      "slug": "er-model-and-er-diagrams",
      "title": "ER Model and ER Diagrams",
      "description": "Entities, entity sets, attributes (simple, composite, multi-valued, derived), relationships, cardinality ratios, participation constraints, and converting ER to relational tables.",
      "estimatedMinutes": 20,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "TCS Digital",
        "Infosys",
        "Cognizant"
      ],
      "keyTakeaways": [
        "Entity Sets: Rectangles. Weak entities: Double rectangles.",
        "Attributes: Ellipses. Key: Underlined. Multi-valued: Double ellipse. Derived: Dashed ellipse.",
        "Relationships: Diamonds. Total participation: Double line.",
        "Converting to relational schema: 1:N relationship merges foreign key into the N-side table."
      ],
      "notesMarkdown": "# ER Model & Conceptual Design\n\n---\n\n## 1. ER Notations\n- **Entity:** Object distinguishable from others (Rectangle).\n- **Weak Entity:** Lacks primary key on its own; identified via discriminator + identifying relationship with strong entity (Double rectangle).\n- **Attributes:**\n  - Simple vs. Composite (`Address` = `Street` + `City` + `Pincode`).\n  - Single-valued vs. Multi-valued (`PhoneNumbers` in double ellipse).\n  - Stored vs. Derived (`Age` derived from `DOB`, dashed ellipse).\n\n---\n\n## 2. Converting ER to Tables\n- **1 : N Relationship:** Place Primary Key of 1-side as Foreign Key in $N$-side table. No separate table required!\n- **M : N Relationship:** Requires a separate junction table containing Primary Keys of both participating entity sets.\n- **Multi-valued Attribute:** Requires separate table with (Entity PK, Attribute Value).\n",
      "questions": [
        {
          "id": "dbms-er-1",
          "question": "How is a Many-to-Many (M:N) relationship between two entity sets represented in a Relational Database Schema?",
          "options": [
            "By adding foreign keys to both original tables",
            "By creating a new relationship table containing primary keys of both entities as foreign keys",
            "By merging both entities into a single mega table",
            "By converting one entity into a weak entity"
          ],
          "correct_option": 1,
          "explanation": "An M:N relationship requires a separate bridge/junction table whose primary key is composed of the primary keys of both participating entities."
        },
        {
          "id": "dbms-er-2",
          "question": "In an ER diagram, how is a derived attribute represented?",
          "options": [
            "Double ellipse",
            "Dashed ellipse",
            "Underlined ellipse",
            "Diamond"
          ],
          "correct_option": 1,
          "explanation": "Derived attributes (like Age derived from Date of Birth) are represented by dashed/dotted ellipses."
        },
        {
          "id": "dbms-er-3",
          "question": "In an ER diagram, how is a 'Weak Entity' represented and identified?",
          "options": [
            "Represented by a double rectangle and identified by combining its partial key (discriminator) with the primary key of its identifying owner entity.",
            "Represented by a dotted oval with an independent surrogate key.",
            "Represented by a diamond with no attributes.",
            "Identified strictly by its own unique foreign key."
          ],
          "correct_option": 0,
          "explanation": "A weak entity set lacks a primary key of its own; it is drawn as a double rectangle and its discriminator (dashed underline) must be combined with the identifying strong entity's primary key to form its primary key."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=ER+Model+and+ER+Diagrams+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-relational-model",
      "slug": "relational-model",
      "title": "Relational Model",
      "description": "Relations, tuples, attributes, domains, degree and cardinality of relations, relational constraints, and NULL values.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Microsoft",
        "Oracle",
        "IBM",
        "Accenture"
      ],
      "keyTakeaways": [
        "Relation: Mathematical set of tuples (rows); no duplicate tuples exist.",
        "Degree (Arity): Number of attributes (columns) in relation.",
        "Cardinality: Total number of tuples (rows) in relation.",
        "Domain: Set of atomic allowable values for an attribute."
      ],
      "notesMarkdown": "# The Relational Model: Foundations & Constraints\n\nProposed by Edgar F. Codd in 1970, the **Relational Model** is the mathematical foundation underpinning all relational database management systems (RDBMS) such as PostgreSQL, MySQL, Oracle, and SQLite. It abstracts storage representations into formal mathematical sets of tuples, completely decoupling logical query design from physical disk layout.\n\n---\n\n## 1. Mathematical Definitions & Core Terminology\n\nA relation is fundamentally defined as a subset of the Cartesian product of $n$ attribute domains:\n$$R \\subseteq D_1 \\times D_2 \\times \\dots \\times D_n$$\n\n| Formal Term | Informal SQL Equivalent | Definition & Properties |\n| :--- | :--- | :--- |\n| **Relation** | Table | A mathematical set of tuples; relations never contain duplicate rows under pure set semantics. |\n| **Tuple** | Row / Record | An ordered list of $n$ attribute values representing a single entity instance or relationship. |\n| **Attribute** | Column / Field | A named header associated with a specific data domain. |\n| **Degree (Arity)** | Column Count | Total number of attributes in the relation schema. |\n| **Cardinality** | Row Count | Total number of tuples currently stored in the relation state. |\n| **Domain** | Data Type / Enum | The set of permissible, atomic values for a given attribute. |\n\n---\n\n## 2. Fundamental Properties of Relations\n\n1. **Unordered Tuples:** Rows in a relation have no intrinsic order. Any perceived visual ordering is an artifact of the query display (`ORDER BY` is required to guarantee order).\n2. **Unordered Attributes:** Columns have no intrinsic ordering; they are referenced strictly by attribute name, not index.\n3. **Atomicity of Values (1NF):** Every cell in a relational table contains exactly one scalar value from its domain (no repeating groups, arrays, or nested composite objects).\n4. **Tuple Uniqueness:** Under the strict relational model, relations are sets, so duplicate tuples are forbidden. (SQL tables operate as multisets/bags unless constrained by a `PRIMARY KEY` or `UNIQUE` index).\n\n---\n\n## 3. The 4 Relational Integrity Constraints\n\nIntegrity constraints guard the database against state corruption:\n\n### A. Domain Constraint\nSpecifies that the value of each attribute $A$ must be an atomic member of domain $\\text{dom}(A)$ (e.g. `age` must be an integer between 0 and 150).\n\n### B. Key Constraint (Uniqueness)\nEvery relation must possess at least one **Superkey** (a set of attributes that uniquely identifies a tuple). A minimal superkey is a **Candidate Key**. One candidate key is designated as the **Primary Key**.\n\n### C. Entity Integrity Constraint\n**No attribute participating in the Primary Key may ever be NULL.**\n- *Rationale:* If a primary key attribute were NULL, the identity of the tuple would be ambiguous, preventing unambiguous identification and foreign key references.\n\n### D. Referential Integrity Constraint\nEnforces consistency between two relations (Foreign Key relationship). If an attribute $FK$ in relation $R_1$ references Primary Key $PK$ in relation $R_2$:\n$$\\text{For every tuple } t_1 \\in R_1, \\text{ either } t_1[FK] \\text{ is NULL, or } t_1[FK] = t_2[PK] \\text{ for some } t_2 \\in R_2$$\n\n---\n\n## 4. Foreign Key Referential Actions\n\nWhen a parent tuple is updated or deleted, foreign key rules determine child behavior:\n\n| Action | Behavior on `DELETE` / `UPDATE` of Parent Tuple |\n| :--- | :--- |\n| **`CASCADE`** | Automatically deletes or updates corresponding child rows. |\n| **`SET NULL`** | Sets child foreign key columns to `NULL` (requires column to be nullable). |\n| **`SET DEFAULT`**| Resets child foreign key columns to their declared default value. |\n| **`RESTRICT` / `NO ACTION`** | Rejects the operation with a foreign key violation error if child records exist. |\n\n---\n\n## 5. Three-Valued Logic (3VL) & NULL Semantics\n\nIn SQL, `NULL` represents missing, unknown, or inapplicable information. Because `NULL` is not a value, equality comparisons with `NULL` yield `UNKNOWN`:\n- `x = NULL` evaluates to `UNKNOWN` (must use `x IS NULL`).\n- **Truth Tables for 3-Valued Logic:**\n  - `TRUE AND UNKNOWN` $\\to$ `UNKNOWN`\n  - `FALSE AND UNKNOWN` $\\to$ `FALSE`\n  - `TRUE OR UNKNOWN` $\\to$ `TRUE`\n  - `NOT UNKNOWN` $\\to$ `UNKNOWN`\n",
      "questions": [
        {
          "id": "dbms-rm-1",
          "question": "If a relation has 5 columns and 200 rows, what are its Degree and Cardinality respectively?",
          "options": [
            "Degree = 200, Cardinality = 5",
            "Degree = 5, Cardinality = 200",
            "Degree = 1000, Cardinality = 200",
            "Degree = 5, Cardinality = 1000"
          ],
          "correct_option": 1,
          "explanation": "Degree is the number of attributes (5 columns), and Cardinality is the number of tuples (200 rows)."
        },
        {
          "id": "dbms-rm-2",
          "question": "Why cannot two identical tuples exist in a formal mathematical relation?",
          "options": [
            "Because relations are strictly ordered arrays",
            "Because a relation is formally defined as a mathematical set of tuples, and sets cannot contain duplicate elements",
            "Because foreign keys prohibit duplicates",
            "Because disk blocks cannot store identical bytes"
          ],
          "correct_option": 1,
          "explanation": "In formal relational theory, relations are sets; by mathematical definition, sets contain distinct elements."
        },
        {
          "id": "dbms-rel-3",
          "question": "In the relational model, what is the Cardinality and Degree of a relation table with 5 columns and 100 tuples (rows)?",
          "options": [
            "Degree = 5, Cardinality = 100",
            "Degree = 100, Cardinality = 5",
            "Degree = 500, Cardinality = 100",
            "Degree = 20, Cardinality = 5"
          ],
          "correct_option": 0,
          "explanation": "In relational terminology, Degree is the total number of attributes (columns = 5), while Cardinality is the total number of tuples (rows = 100)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Relational+Model+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-relational-algebra-and-calculus",
      "slug": "relational-algebra-and-calculus",
      "title": "Relational Algebra and Relational Calculus",
      "description": "Fundamental operators (Selection, Projection, Union, Set Difference, Cartesian Product, Rename), derived operators (Joins, Division), and Tuple Relational Calculus (TRC).",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Oracle",
        "Amazon"
      ],
      "keyTakeaways": [
        "Fundamental operators: Select (sigma), Project (pi), Union (U), Set Difference (-), Cartesian Product (X), Rename (rho).",
        "Natural Join: Cartesian product followed by selection on common attributes and projection.",
        "Division (R / S): Finds tuples in R that match ALL tuples in S (e.g. students who took ALL prerequisite courses).",
        "Relational Completeness: A query language is relationally complete if it can express any query expressible in basic Relational Algebra."
      ],
      "notesMarkdown": "# Relational Algebra & Calculus\n\n---\n\n## 1. 6 Basic Relational Algebra Operators\n1. **Selection ($\\sigma_c(R)$):** Filters rows satisfying predicate $c$.\n2. **Projection ($\\pi_A(R)$):** Extracts specified columns $A$, automatically eliminating duplicate rows.\n3. **Union ($R \\cup S$):** Tuples in $R$ or $S$. Requires union compatibility (same arity and compatible domains).\n4. **Set Difference ($R - S$):** Tuples in $R$ but not in $S$. Union compatible.\n5. **Cartesian Product ($R \\times S$):** Pairs every tuple of $R$ with every tuple of $S$.\n6. **Rename ($\\rho_{S}(R)$):** Renames relation or attributes.\n\n---\n\n## 2. Division Operator ($R \\div S$)\nUsed for queries with the universal quantifier **\"FOR ALL\"** or **\"EVERY\"**:\n- \"Find customers who bought all models of smartphone.\"\n- Degree of $(R \\div S) = \\text{Degree}(R) - \\text{Degree}(S)$.\n",
      "questions": [
        {
          "id": "dbms-ra-1",
          "question": "Which relational algebra operator is specifically used to answer queries requiring matching 'ALL' items in another relation?",
          "options": [
            "Natural Join",
            "Cartesian Product",
            "Division (÷)",
            "Theta Join"
          ],
          "correct_option": 2,
          "explanation": "The Division operator R ÷ S selects tuples from R associated with every single tuple in relation S."
        },
        {
          "id": "dbms-ra-2",
          "question": "How many fundamental operators are required to express all relational algebra queries?",
          "options": [
            "3",
            "5",
            "6",
            "8"
          ],
          "correct_option": 2,
          "explanation": "The 6 fundamental operators are: Selection, Projection, Union, Set Difference, Cartesian Product, and Rename."
        },
        {
          "id": "dbms-ra-3",
          "question": "Which of the following Relational Algebra operators is NOT considered one of the 5 fundamental primitive operators?",
          "options": [
            "Natural Join (bowtie)",
            "Select (sigma)",
            "Project (pi)",
            "Cartesian Product (x)"
          ],
          "correct_option": 0,
          "explanation": "The 5 primitive operators of relational algebra are Selection (sigma), Projection (pi), Union (cup), Set Difference (-), and Cartesian Product (x). Natural Join is a derived operator defined as Projection of Selection over Cartesian Product."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Relational+Algebra+and+Relational+Calculus+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "sql-joins-queries",
      "slug": "sql-joins-and-indexing",
      "title": "SQL Queries and Joins",
      "description": "Inner vs Outer joins, CROSS joins, GROUP BY vs HAVING, RANK vs DENSE_RANK.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# SQL Queries, Relational Joins & Advanced Window Functions\n\nStructured Query Language (SQL) is the declarative language used to define, query, and manipulate relational database management systems. Understanding both physical join mechanics and logical evaluation order is critical for backend engineering and query performance optimization.\n\n---\n\n## 1. Logical Query Execution Order\n\nWhile SQL queries are written starting with `SELECT`, database query engines process clauses in a strictly defined logical pipeline:\n\n```\n   1. FROM & JOIN     (Identify tables, Cartesian product, filter join predicates ON)\n         |\n         v\n   2. WHERE           (Filter individual base rows; cannot use aggregate aliases)\n         |\n         v\n   3. GROUP BY        (Partition remaining rows into aggregated buckets)\n         |\n         v\n   4. HAVING          (Filter aggregated groups; evaluates aggregate conditions)\n         |\n         v\n   5. SELECT          (Evaluate column expressions, window functions, aliases)\n         |\n         v\n   6. DISTINCT        (Eliminate duplicate output tuples)\n         |\n         v\n   7. ORDER BY        (Sort final result set; can use aliases defined in SELECT)\n         |\n         v\n   8. LIMIT / OFFSET  (Paginate and slice output rows)\n```\n\n---\n\n## 2. Relational Joins & Set Semantics\n\n| Join Type | Formal Definition | Output Tuples | Handling of Non-Matching Rows |\n| :--- | :--- | :--- | :--- |\n| **INNER JOIN** | $R \\bowtie_{R.k = S.k} S$ | Only matching pairs | Non-matching rows from both tables are discarded |\n| **LEFT (OUTER) JOIN** | $R \\leftouterbowtie S$ | All left rows + matched right rows | Unmatched right columns filled with `NULL` |\n| **RIGHT (OUTER) JOIN** | $R \\rightouterbowtie S$ | All right rows + matched left rows | Unmatched left columns filled with `NULL` |\n| **FULL (OUTER) JOIN** | $R \\fullouterbowtie S$ | All left and all right rows | Non-matching rows on either side padded with `NULL` |\n| **CROSS JOIN** | $R \\times S$ | Cartesian product ($|R| \\times |S|$ rows) | No condition evaluated |\n| **SELF JOIN** | $R_1 \\bowtie R_2$ | Table joined with itself | Used for hierarchical trees (e.g. `Employee.manager_id = Manager.id`) |\n| **ANTI-JOIN** | $R \\triangleright S$ | Rows in $R$ with **no match** in $S$ | Implemented via `LEFT JOIN ... WHERE S.id IS NULL` or `NOT EXISTS` |\n\n> [!CAUTION]\n> **The `NOT IN` with `NULL` Trap:** If a subquery returns even a single `NULL` value, `WHERE x NOT IN (SELECT y FROM ...)` evaluates to `UNKNOWN` for all rows and returns **0 results**! Always prefer `NOT EXISTS` or `LEFT JOIN ... WHERE right.key IS NULL` for robust anti-joins.\n\n---\n\n## 3. SQL Window (Analytic) Functions\n\nWindow functions compute values across a set of table rows related to the current row without collapsing them into a single row (unlike `GROUP BY`).\n\n$$\\text{FUNCTION}() \\; \\mathbf{OVER} \\; (\\mathbf{PARTITION\\;BY} \\; \\text{dept} \\; \\mathbf{ORDER\\;BY} \\; \\text{salary}\\;\\text{DESC})$$\n\n### Ranking Functions Comparison:\nSuppose department salaries are: `[100k, 90k, 90k, 80k]`:\n- **`ROW_NUMBER()`:** `1, 2, 3, 4` (Deterministic sequential integer; breaks ties arbitrarily).\n- **`RANK()`:** `1, 2, 2, 4` (Ties share same rank, **leaving gaps** in subsequent ranks).\n- **`DENSE_RANK()`:** `1, 2, 2, 3` (Ties share same rank, **leaving NO gaps**).\n\n### Offset & Running Aggregates:\n- **`LEAD(col, offset)` / `LAG(col, offset)`:** Accesses data from preceding/succeeding rows without a self-join.\n- **Running Total:** `SUM(amount) OVER (PARTITION BY user_id ORDER BY trans_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.\n\n---\n\n## 4. Three-Valued Logic (3VL) & NULLs\n- In SQL, boolean comparisons involving `NULL` yield **`UNKNOWN`** (neither `TRUE` nor `FALSE`).\n- `NULL = NULL` is `UNKNOWN` (must use `IS NULL` or `IS NOT NULL`).\n- `COUNT(*)` counts all rows including NULLs; `COUNT(column)` counts only rows where `column IS NOT NULL`.\n",
      "questions": [
        {
          "id": "db-4",
          "question": "In SQL, what is the difference between RANK() and DENSE_RANK() when two rows have equal values?",
          "options": [
            "RANK() skips the next ranking numbers after ties; DENSE_RANK() does not skip",
            "DENSE_RANK() only works with numeric columns",
            "RANK() requires an ORDER BY clause whereas DENSE_RANK() does not",
            "They produce identical results in all SQL engines"
          ],
          "correct_option": 0,
          "explanation": "If two rows tie for rank 1, RANK() gives 1, 1, 3 for the third row, while DENSE_RANK() gives 1, 1, 2."
        },
        {
          "id": "sql-2",
          "question": "Why is 'WHERE col NOT IN (SELECT val FROM table)' considered hazardous when the subquery might return a NULL value?",
          "options": [
            "If the subquery returns even a single NULL, 'NOT IN' evaluates to UNKNOWN for every comparison, causing the entire query to return 0 rows.",
            "It causes an automatic database deadlock.",
            "It triggers an automatic syntax compilation error.",
            "It converts all NULL values in the outer table to zero."
          ],
          "correct_option": 0,
          "explanation": "In SQL three-valued logic, 'x NOT IN (val1, NULL)' expands to 'x != val1 AND x != NULL'. Since 'x != NULL' evaluates to UNKNOWN, any AND condition containing UNKNOWN can never evaluate to TRUE, resulting in an empty result set. 'NOT EXISTS' or 'LEFT JOIN ... IS NULL' should be used instead."
        },
        {
          "id": "sql-3",
          "question": "What is the correct logical order of query execution in a standard SQL SELECT statement?",
          "options": [
            "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT",
            "SELECT -> FROM -> WHERE -> GROUP BY -> ORDER BY",
            "FROM -> SELECT -> WHERE -> HAVING -> ORDER BY",
            "WHERE -> FROM -> GROUP BY -> SELECT -> ORDER BY"
          ],
          "correct_option": 0,
          "explanation": "The SQL query engine evaluates tables (FROM/JOIN), filters rows (WHERE), aggregates (GROUP BY), filters groups (HAVING), extracts projections (SELECT), sorts (ORDER BY), and limits pagination (LIMIT)."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Uber",
        "Goldman Sachs",
        "Meta"
      ],
      "keyTakeaways": [
        "SQL logical execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.",
        "RANK() leaves gaps in sequence for ties (1, 2, 2, 4); DENSE_RANK() leaves no gaps (1, 2, 2, 3).",
        "COUNT(column) ignores NULLs; COUNT(*) counts all rows including NULLs."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=SQL+Queries+Joins+Subqueries+Window+Functions+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-keys-and-integrity-constraints",
      "slug": "keys-and-integrity-constraints",
      "title": "Keys and Integrity Constraints",
      "description": "Super keys, candidate keys, primary key, alternate keys, foreign keys, Domain Constraints, Entity Integrity, and Referential Integrity constraints (ON DELETE CASCADE/SET NULL).",
      "estimatedMinutes": 20,
      "difficulty": "Easy",
      "companyTags": [
        "Oracle",
        "Microsoft",
        "Amazon",
        "Infosys"
      ],
      "keyTakeaways": [
        "Super Key: Set of attributes uniquely identifying every tuple in a relation.",
        "Candidate Key: Minimal Super Key (no proper subset is a super key).",
        "Primary Key: Candidate key chosen by database designer; CANNOT contain NULL values (Entity Integrity).",
        "Referential Integrity: Foreign key must match primary key in referenced table, or be NULL."
      ],
      "notesMarkdown": "# Keys & Relational Integrity\n\n---\n\n## 1. Key Hierarchy\n$$\\text{All Attributes} \\supseteq \\text{Super Keys} \\supseteq \\text{Candidate Keys} \\ni \\text{Primary Key}$$\n- **Super Key:** Any attribute combination that uniquely identifies a row.\n- **Candidate Key:** A super key with zero redundant attributes (minimal).\n- **Primary Key:** The single chosen candidate key.\n\n---\n\n## 2. Core Integrity Constraints\n1. **Domain Integrity:** Attribute values must conform to declared data type and range constraints.\n2. **Entity Integrity:** Primary key attributes can **never be NULL**.\n3. **Referential Integrity:** A foreign key value must either exist as a valid primary key in the referenced parent relation, or be completely NULL.\n   - Handled via `ON DELETE CASCADE`, `ON DELETE SET NULL`, or `ON DELETE RESTRICT`.\n",
      "questions": [
        {
          "id": "dbms-key-1",
          "question": "What is the key difference between a Super Key and a Candidate Key?",
          "options": [
            "A super key contains NULLs, while candidate keys do not",
            "A candidate key is a minimal super key with no extraneous attributes",
            "A super key can only have 1 attribute",
            "They are identical terms in relational theory"
          ],
          "correct_option": 1,
          "explanation": "A candidate key is minimal; removing any attribute from a candidate key destroys its unique identification property."
        },
        {
          "id": "dbms-key-2",
          "question": "Which relational constraint states that no primary key value may be NULL?",
          "options": [
            "Referential Integrity",
            "Entity Integrity",
            "Domain Constraint",
            "Functional Dependency"
          ],
          "correct_option": 1,
          "explanation": "Entity Integrity rule mandates that primary key components cannot be NULL because they uniquely identify tuples."
        },
        {
          "id": "dbms-key-3",
          "question": "What does the 'Referential Integrity Constraint' require regarding foreign keys in a relational database?",
          "options": [
            "A foreign key value in a referencing table must either match a valid primary key value in the referenced table or be NULL.",
            "Foreign keys must always be unique and non-null.",
            "Every table must reference at least two other tables.",
            "Foreign keys cannot reference the same table."
          ],
          "correct_option": 0,
          "explanation": "Referential integrity requires that every non-null foreign key value in a referencing relation must exist as an actual primary key value in the referenced relation, preventing dangling references."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Keys+and+Integrity+Constraints+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-functional-dependencies",
      "slug": "functional-dependencies",
      "title": "Functional Dependencies",
      "description": "Definition of functional dependency X -> Y, Armstrong's Axioms (Reflexivity, Augmentation, Transitivity), and secondary inference rules (Union, Decomposition, Pseudo-transitivity).",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Adobe"
      ],
      "keyTakeaways": [
        "Functional Dependency X -> Y: Whenever two tuples agree on attributes X, they MUST agree on attributes Y.",
        "Armstrong's Axioms are Sound and Complete.",
        "Reflexivity: If Y is subset of X, then X -> Y.",
        "Augmentation: If X -> Y, then XZ -> YZ.",
        "Transitivity: If X -> Y and Y -> Z, then X -> Z."
      ],
      "notesMarkdown": "# Functional Dependencies & Armstrong's Axioms\n\n---\n\n## 1. Functional Dependency (FD) Definition\nGiven relation $R$, an FD $X \\to Y$ holds if for any two tuples $t_1, t_2 \\in R$:\n$$t_1[X] = t_2[X] \\implies t_1[Y] = t_2[Y]$$\n\n---\n\n## 2. Armstrong's Axioms (Sound & Complete)\n1. **Reflexivity Rule:** If $Y \\subseteq X$, then $X \\to Y$ (Trivial FD).\n2. **Augmentation Rule:** If $X \\to Y$, then $XZ \\to YZ$ for any attribute set $Z$.\n3. **Transitivity Rule:** If $X \\to Y$ and $Y \\to Z$, then $X \\to Z$.\n\n### Derived Secondary Rules:\n- **Union:** If $X \\to Y$ and $X \\to Z$, then $X \\to YZ$.\n- **Decomposition:** If $X \\to YZ$, then $X \\to Y$ and $X \\to Z$. *(Caution: $XY \\to Z$ does NOT imply $X \\to Z$ or $Y \\to Z$!)*\n- **Pseudo-Transitivity:** If $X \\to Y$ and $WY \\to Z$, then $WX \\to Z$.\n",
      "questions": [
        {
          "id": "dbms-fd-1",
          "question": "Given the functional dependency AB -> C, does it imply that A -> C?",
          "options": [
            "Yes, by decomposition rule",
            "No, decomposition applies only to the right-hand side (consequent), never the determinant",
            "Yes, by augmentation",
            "Only if B is a foreign key"
          ],
          "correct_option": 1,
          "explanation": "Decomposition rule splits the RHS: X -> YZ implies X -> Y and X -> Z. You cannot split attributes on the left-hand side."
        },
        {
          "id": "dbms-fd-2",
          "question": "Armstrong's axioms are described as 'Sound and Complete'. What does Soundness mean?",
          "options": [
            "They can generate every true FD that holds",
            "Any FD derived using these axioms is guaranteed to be true",
            "They execute in O(1) time",
            "They eliminate all update anomalies"
          ],
          "correct_option": 1,
          "explanation": "Soundness means the rules generate only valid dependencies that actually hold in all relations satisfying the original FDs."
        },
        {
          "id": "dbms-fd-3",
          "question": "Which of the following is Armstrong's Transitivity Axiom for functional dependencies?",
          "options": [
            "If X -> Y and Y -> Z, then X -> Z",
            "If X -> Y, then XZ -> YZ",
            "If Y is a subset of X, then X -> Y",
            "If X -> Y and X -> Z, then X -> YZ"
          ],
          "correct_option": 0,
          "explanation": "Armstrong's transitivity rule states that if attribute set X functionally determines Y, and Y functionally determines Z, then X functionally determines Z (X -> Z)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Functional+Dependencies+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-attribute-closure-and-candidate-keys",
      "slug": "attribute-closure-and-candidate-keys",
      "title": "Attribute Closure and Candidate Keys",
      "description": "Algorithm for attribute closure X+, determining candidate keys of a relation, finding minimal cover (canonical cover) of functional dependencies.",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Uber",
        "Oracle",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Attribute Closure X+: Set of all attributes functionally determined by X under FD set F.",
        "Testing Super Key: If X+ contains ALL attributes of relation R, then X is a Super Key.",
        "Candidate Key: If X is a Super Key and no proper subset of X is a Super Key, X is a Candidate Key.",
        "Canonical Cover: Minimal set of FDs equivalent to F, with no extraneous attributes and no redundant FDs."
      ],
      "notesMarkdown": "# Attribute Closure & Finding Candidate Keys\n\n---\n\n## 1. Attribute Closure Algorithm ($X^+$)\nTo compute closure of attribute set $X$ under FDs $F$:\n1. Initialize $\\text{result} = X$.\n2. Repeatedly search for FD $Y \\to Z \\in F$ such that $Y \\subseteq \\text{result}$.\n3. Add $Z$ to $\\text{result}$: $\\text{result} = \\text{result} \\cup Z$.\n4. Repeat until no more attributes can be added.\n\n---\n\n## 2. Determining Candidate Keys\n1. Identify attributes that **never appear on the RHS** of any FD. These **must** be part of every candidate key!\n2. Identify attributes that appear **only on the RHS**. These can never be part of any candidate key.\n3. Compute the closure of the essential attributes. If it yields $R^+$, it is the sole candidate key. If not, combine with intermediate attributes.\n",
      "questions": [
        {
          "id": "dbms-ac-1",
          "question": "In relation R(A, B, C, D) with FDs {A -> B, B -> C, C -> D}, what is the attribute closure of {A}?",
          "options": [
            "{A, B}",
            "{A, B, C}",
            "{A, B, C, D}",
            "{A}"
          ],
          "correct_option": 2,
          "explanation": "A -> B adds B; B -> C adds C; C -> D adds D. Hence {A}+ = {A, B, C, D}. Thus A is a candidate key for R."
        },
        {
          "id": "dbms-ac-2",
          "question": "If an attribute never appears on the right-hand side of any functional dependency in a relation schema, what must be true?",
          "options": [
            "It can never be part of any candidate key",
            "It must be present in every single candidate key of the relation",
            "It is a foreign key",
            "The relation is not in 1NF"
          ],
          "correct_option": 1,
          "explanation": "Because no other attribute can functionally determine it, it must be included in the determinant of any key to reach closure."
        },
        {
          "id": "dbms-closure-3",
          "question": "What is an attribute called if it is part of at least one Candidate Key in a relational schema?",
          "options": [
            "Prime Attribute",
            "Non-Prime Attribute",
            "Foreign Attribute",
            "Super Attribute"
          ],
          "correct_option": 0,
          "explanation": "An attribute that is a member of any candidate key of relation schema R is called a Prime Attribute. Attributes that do not belong to any candidate key are Non-Prime."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Attribute+Closure+and+Candidate+Keys+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "normalization",
      "slug": "database-normalization",
      "title": "Normalization: 1NF, 2NF, 3NF, BCNF",
      "description": "Functional dependencies, eliminating insertion/deletion/update anomalies.",
      "estimatedMinutes": 16,
      "notesMarkdown": "\n# Database Normalization Summary\n\nNormalization organizes table columns to reduce data redundancy and eliminate anomalies.\n\n---\n\n## 1. Normal Forms Hierarchy\n1. **1NF (First Normal Form):**\n   - Each column contains atomic (indivisible) values. No repeating groups or arrays.\n2. **2NF (Second Normal Form):**\n   - Must be in 1NF.\n   - **No partial dependency:** Every non-prime attribute must depend on the whole candidate key, not a proper subset of it.\n3. **3NF (Third Normal Form):**\n   - Must be in 2NF.\n   - **No transitive dependency:** Non-prime attributes must not depend on other non-prime attributes ($X \\rightarrow Y$, $X$ must be superkey or $Y$ is prime).\n4. **BCNF (Boyce-Codd Normal Form):**\n   - For every functional dependency $X \\rightarrow Y$, $X$ must strictly be a **Super Key**.\n",
      "questions": [
        {
          "id": "db-3",
          "question": "A table is in 2NF if it is in 1NF and contains no:",
          "options": [
            "Transitive dependencies",
            "Partial functional dependencies",
            "Multi-valued dependencies",
            "Foreign keys"
          ],
          "correct_option": 1,
          "explanation": "2NF specifically eliminates partial dependencies where a non-prime attribute depends only on part of a composite primary key."
        },
        {
          "id": "norm-2",
          "question": "What condition distinguishes Boyce-Codd Normal Form (BCNF) from Third Normal Form (3NF)?",
          "options": [
            "For every functional dependency X -> Y, X must strictly be a Superkey",
            "Table must not contain foreign keys",
            "All columns must have unique constraints",
            "Every attribute must be a prime attribute"
          ],
          "correct_option": 0,
          "explanation": "In 3NF, for X -> Y, either X is a superkey OR Y is a prime attribute. BCNF removes the second relaxation: X must strictly be a superkey for every non-trivial functional dependency."
        },
        {
          "id": "norm-3",
          "question": "Elimination of partial dependency (where a non-prime attribute depends on a proper subset of a composite candidate key) transitions a table into which normal form?",
          "options": [
            "Second Normal Form (2NF)",
            "Third Normal Form (3NF)",
            "First Normal Form (1NF)",
            "BCNF"
          ],
          "correct_option": 0,
          "explanation": "A relation is in 2NF if it is in 1NF and contains no partial functional dependencies on any candidate key."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Microsoft",
        "Oracle",
        "TCS",
        "Infosys"
      ],
      "keyTakeaways": [
        "1NF: Atomic values, no repeating groups.",
        "2NF: 1NF + No partial dependencies (every non-key attribute fully dependent on composite primary key).",
        "3NF: 2NF + No transitive dependencies.",
        "BCNF: For every functional dependency X -> Y, X must be a superkey."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Normalization+1NF+2NF+3NF+BCNF+DBMS+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-lossless-decomposition",
      "slug": "lossless-decomposition",
      "title": "Lossless Decomposition",
      "description": "Lossless-join decomposition vs. lossy decomposition, testing condition for binary decomposition R1 and R2: R1 cap R2 -> R1 or R1 cap R2 -> R2.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Oracle",
        "IBM"
      ],
      "keyTakeaways": [
        "Decomposition of R into R1, R2 is Lossless if natural join R1 |><| R2 = R.",
        "Lossy decomposition generates spurious/ghost tuples upon join.",
        "Binary Lossless Condition: Decomposition into R1, R2 is lossless if and only if (R1 cap R2) -> R1 OR (R1 cap R2) -> R2 (common attribute is superkey of at least one).",
        "Lossless property is non-negotiable for database schema decomposition."
      ],
      "notesMarkdown": "# Lossless-Join Decomposition\n\n---\n\n## 1. What is Lossless Decomposition?\nA decomposition of relation $R$ into $R_1$ and $R_2$ is **Lossless** (non-additive join) if:\n$$R_1 \\bowtie R_2 = R$$\nIf $R_1 \\bowtie R_2 \\supset R$, spurious tuples have been created $\\implies$ **Lossy Decomposition** (destructive error).\n\n---\n\n## 2. Necessary & Sufficient Condition for Binary Decomposition\nDecomposition of $R$ into $R_1$ and $R_2$ is lossless with respect to FD set $F$ if and only if the common attributes $(R_1 \\cap R_2)$ functionally determine at least one relation:\n$$(R_1 \\cap R_2) \\to R_1 \\quad \\text{OR} \\quad (R_1 \\cap R_2) \\to R_2$$\n*(The common attributes must form a Super Key in either $R_1$ or $R_2$).*\n",
      "questions": [
        {
          "id": "dbms-lld-1",
          "question": "Decomposing relation R(A, B, C) with FD {A -> B} into R1(A, B) and R2(B, C) is:",
          "options": [
            "Lossless, because B is common and determines C",
            "Lossy, because the common attribute B is not a super key of R1 or R2",
            "Lossless, because A -> B",
            "Dependency preserving"
          ],
          "correct_option": 1,
          "explanation": "R1 cap R2 = {B}. {B}+ = {B}, which is not a superkey of R1(A, B) or R2(B, C). Hence joining will produce spurious tuples."
        },
        {
          "id": "dbms-lld-2",
          "question": "What is the primary danger of a 'Lossy' database decomposition?",
          "options": [
            "Tuples are permanently deleted from disk",
            "Joining the decomposed tables produces spurious false tuples that did not exist in the original relation",
            "Indexes cannot be created",
            "SQL queries throw syntax errors"
          ],
          "correct_option": 1,
          "explanation": "In a lossy decomposition, joining tables creates extra phantom tuples, leading to inaccurate information."
        },
        {
          "id": "dbms-lossless-3",
          "question": "For a decomposition of relation R into R1 and R2 to be a Lossless-Join decomposition, what condition must be satisfied under functional dependencies F?",
          "options": [
            "(R1 intersect R2) -> R1 OR (R1 intersect R2) -> R2 must hold in F+",
            "R1 and R2 must have zero common attributes",
            "Both R1 and R2 must be in BCNF",
            "|R1| must equal |R2|"
          ],
          "correct_option": 0,
          "explanation": "A binary decomposition R into R1 and R2 is lossless-join iff the common attribute set (R1 intersect R2) is a superkey of either R1 or R2, ensuring no spurious tuples are generated upon natural join."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Lossless+Decomposition+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-dependency-preservation",
      "slug": "dependency-preservation",
      "title": "Dependency Preservation",
      "description": "Definition of dependency preservation, testing projection of FDs onto decomposed schemas, and trade-offs between 3NF and BCNF.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Microsoft",
        "Oracle",
        "Infosys",
        "Cisco"
      ],
      "keyTakeaways": [
        "Dependency Preservation: All functional dependencies in F can be enforced without computing joins across decomposed relations.",
        "Testing: (F1 U F2 U ... Fn)+ = F+.",
        "Key Trade-off: 3NF ALWAYS guarantees both Lossless Join AND Dependency Preservation. BCNF guarantees Lossless Join, but CANNOT always preserve dependencies."
      ],
      "notesMarkdown": "# Dependency Preservation\n\n---\n\n## 1. Why Preserve Dependencies?\nIf an FD $X \\to Y$ is preserved within a decomposed table $R_i$, updates can be checked locally in $R_i$ with zero join overhead. If an FD spans multiple tables, checking it requires an expensive multi-table join on every insert/update.\n\n---\n\n## 2. 3NF vs. BCNF Guarantee\n- **3NF Synthesis Algorithm:** Guaranteed to achieve **both** Lossless Join and Dependency Preservation simultaneously!\n- **BCNF Decomposition:** Guaranteed to achieve Lossless Join and eliminate all redundancy, but **cannot always preserve dependencies** (e.g., relation with candidate keys $AB, BC$ and FD $C \\to B$).\n",
      "questions": [
        {
          "id": "dbms-dp-1",
          "question": "Can any relational schema with functional dependencies be decomposed into BCNF while simultaneously guaranteeing dependency preservation?",
          "options": [
            "Yes, always",
            "No, BCNF is guaranteed to be lossless, but dependency preservation is not always achievable",
            "Yes, if the relation has at most 3 attributes",
            "Only in distributed databases"
          ],
          "correct_option": 1,
          "explanation": "BCNF cannot always preserve dependencies. When dependency preservation is essential, databases use 3NF instead."
        },
        {
          "id": "dbms-dp-2",
          "question": "Which normal form is ALWAYS guaranteed to achieve both lossless decomposition AND dependency preservation for any relation?",
          "options": [
            "First Normal Form (1NF)",
            "Third Normal Form (3NF)",
            "Boyce-Codd Normal Form (BCNF)",
            "Fourth Normal Form (4NF)"
          ],
          "correct_option": 1,
          "explanation": "3NF synthesis algorithm guarantees both lossless-join decomposition and dependency preservation."
        },
        {
          "id": "dbms-dp-3",
          "question": "What is the primary advantage of achieving Dependency Preservation during database normalization?",
          "options": [
            "Enforces all functional dependencies locally within individual tables without requiring expensive multi-table joins during updates.",
            "Eliminates all candidate keys.",
            "Guarantees minimum disk consumption.",
            "Eliminates the need for indexing."
          ],
          "correct_option": 0,
          "explanation": "Dependency preservation allows database updates to verify all integrity constraints using only single-table checks rather than executing cross-table join operations, significantly speeding up INSERT/UPDATE performance."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Dependency+Preservation+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "acid-transactions",
      "slug": "acid-properties-and-transactions",
      "title": "Transactions and ACID Properties",
      "description": "Atomicity (WAL), Consistency, Isolation (Dirty Read, Non-repeatable, Phantom), Durability.",
      "estimatedMinutes": 20,
      "notesMarkdown": "\n# ACID Properties & Isolation Levels\n\nThe bedrock of relational database reliability and distributed systems interviews.\n\n---\n\n## 1. The ACID Guarantees\n\n- **Atomicity:** All-or-nothing execution. Achieved using **Write-Ahead Logging (WAL)** and undo logs.\n- **Consistency:** Database transitions from one valid state satisfying all schema constraints, foreign keys, and triggers to another.\n- **Isolation:** Concurrent transactions execute without interfering with one another.\n- **Durability:** Once committed, changes survive system crashes or power failures. Achieved using disk commits and redo logs.\n\n---\n\n## 2. SQL Isolation Levels & Concurrency Phenomena\n\n| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |\n| :--- | :---: | :---: | :---: |\n| **Read Uncommitted** | ❌ Allowed | ❌ Allowed | ❌ Allowed |\n| **Read Committed** | ✅ Prevented | ❌ Allowed | ❌ Allowed |\n| **Repeatable Read** | ✅ Prevented | ✅ Prevented | ❌ Allowed |\n| **Serializable** | ✅ Prevented | ✅ Prevented | ✅ Prevented |\n\n### Phenomena Explained:\n- **Dirty Read:** Reading uncommitted data written by a concurrent transaction that could still be rolled back.\n- **Non-Repeatable Read:** Re-reading the same row within a transaction produces different column values because another transaction modified and committed it.\n- **Phantom Read:** Re-executing a range query returns new rows added or deleted by another committed transaction.\n",
      "questions": [
        {
          "id": "db-1",
          "question": "Which concurrency phenomenon is prevented by \"Repeatable Read\" that was allowed in \"Read Committed\"?",
          "options": [
            "Dirty Read",
            "Non-Repeatable Read",
            "Phantom Read",
            "Deadlock"
          ],
          "correct_option": 1,
          "explanation": "Repeatable Read guarantees that if you read a row, subsequent reads of the same row in the same transaction return the exact same data, preventing Non-Repeatable Reads."
        },
        {
          "id": "db-2",
          "question": "Which component ensures durability and atomicity in modern relational databases during a sudden crash?",
          "options": [
            "Query Optimizer",
            "Write-Ahead Log (WAL)",
            "B+ Tree Index",
            "Buffer Pool Replacement"
          ],
          "correct_option": 1,
          "explanation": "Write-Ahead Logging (WAL) writes changes to non-volatile append-only logs before applying them to data pages, allowing recovery of committed transactions and rollback of incomplete ones."
        },
        {
          "id": "acid-3",
          "question": "Which ANSI SQL transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still permit Phantom Reads?",
          "options": [
            "Repeatable Read",
            "Read Committed",
            "Serializable",
            "Read Uncommitted"
          ],
          "correct_option": 0,
          "explanation": "Repeatable Read locks all rows read by queries so other transactions cannot modify them, preventing dirty and non-repeatable reads. However, range queries may still encounter newly inserted rows (phantoms)."
        },
        {
          "id": "acid-4",
          "question": "What fundamental logging protocol ensures both Atomicity and Durability in relational database crash recovery?",
          "options": [
            "Write-Ahead Logging (WAL)",
            "Shadow Paging",
            "Two-Phase Commit",
            "Event Sourcing"
          ],
          "correct_option": 0,
          "explanation": "Write-Ahead Logging dictates that changes and commit records must be appended and flushed to non-volatile disk logs before dirty database data pages are written to disk, ensuring complete recovery."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Amazon",
        "Google",
        "Stripe",
        "Oracle"
      ],
      "keyTakeaways": [
        "Atomicity: All operations succeed or all roll back (WAL protocol).",
        "Consistency: Transactions move DB from one valid state to another satisfying constraints.",
        "Isolation levels: Read Uncommitted < Read Committed < Repeatable Read < Serializable.",
        "Durability: Committed updates survive system crashes (fsync to disk / WAL)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Transactions+and+ACID+Properties+DBMS+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-conflict-and-view-serializability",
      "slug": "conflict-and-view-serializability",
      "title": "Conflict and View Serializability",
      "description": "Conflicting operations, conflict equivalent schedules, conflict serializability testing, view equivalence, blind writes, and view serializability.",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Goldman Sachs"
      ],
      "keyTakeaways": [
        "Conflicting Operations: Two operations belong to different transactions, access the SAME data item, and at least ONE is a WRITE.",
        "Conflict Serializability: A schedule is conflict serializable if it can be transformed into a serial schedule by swapping non-conflicting adjacent operations.",
        "Precedence Graph: Cycle in graph <=> Schedule is NOT conflict serializable.",
        "View Serializability: Every conflict serializable schedule is view serializable, but not vice-versa (view serializability permits blind writes)."
      ],
      "notesMarkdown": "# Conflict & View Serializability\n\n---\n\n## 1. Conflicting Operations\nTwo operations $I_i$ and $I_j$ conflict if:\n1. They belong to different transactions ($T_i \\neq T_j$).\n2. They operate on the exact same data item $Q$.\n3. At least one of them is a `write(Q)`.\n*(Read-Read operations never conflict).*\n\n---\n\n## 2. Conflict Serializability\nA schedule $S$ is conflict serializable if it is conflict equivalent to some serial schedule. Tested by constructing a **Precedence Graph (Serialization Graph)**:\n- Nodes: Committed transactions $T_i$.\n- Directed Edge $T_i \\to T_j$: If $T_i$ executes an operation conflicting with a subsequent operation in $T_j$.\n- **Theorem:** Schedule is conflict serializable $\\iff$ Precedence graph has **NO CYCLES**.\n\n---\n\n## 3. View Serializability\nWeaker condition than conflict serializability:\n- Matches initial read, final write, and write-read dependencies of a serial schedule.\n- Allows schedules with **Blind Writes** (writing without reading) that may have cycles in conflict precedence graph.\n- Testing View Serializability is NP-Complete!\n",
      "questions": [
        {
          "id": "dbms-ser-1",
          "question": "Which of the following pairs of transaction operations on the same data item Q do NOT conflict?",
          "options": [
            "Read(Q) and Write(Q)",
            "Write(Q) and Write(Q)",
            "Read(Q) and Read(Q)",
            "Write(Q) and Read(Q)"
          ],
          "correct_option": 2,
          "explanation": "Two Read operations on the same data item do not conflict because reading does not modify state."
        },
        {
          "id": "dbms-ser-2",
          "question": "What is the computational complexity of testing whether an arbitrary schedule is View Serializable?",
          "options": [
            "O(N) linear time",
            "O(N^2) polynomial time",
            "NP-Complete",
            "Undecidable"
          ],
          "correct_option": 2,
          "explanation": "While testing Conflict Serializability is polynomial (O(V+E) cycle check), testing View Serializability is proven NP-Complete."
        },
        {
          "id": "dbms-ser-3",
          "question": "What condition defines two database operations as being in 'Conflict' with each other?",
          "options": [
            "They belong to different transactions, access the exact same data item Q, and at least one of the operations is a Write(Q).",
            "They belong to the same transaction and both read Q.",
            "They occur at the exact same microsecond on different CPU cores.",
            "They belong to different transactions and both perform Read(Q)."
          ],
          "correct_option": 0,
          "explanation": "Two operations conflict iff they belong to different transactions, target the same data item Q, and at least one is a Write operation (Read-Write or Write-Write conflict)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Conflict+and+View+Serializability+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-precedence-graphs",
      "slug": "precedence-graphs",
      "title": "Precedence Graphs",
      "description": "Constructing serialization graphs for multi-transaction schedules, cycle detection algorithms, and topological sorting to determine equivalent serial orders.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Uber"
      ],
      "keyTakeaways": [
        "Graph Construction: Add edge Ti -> Tj if Ti executes before Tj and their operations conflict (R-W, W-R, W-W).",
        "Cycle Detection: DFS or Kahn's algorithm detects cycles in O(V + E).",
        "Serial Order: If acyclic, topological sort produces the equivalent serial transaction order."
      ],
      "notesMarkdown": "# Precedence Graphs & Serial Schedules\n\n---\n\n## 1. Graph Construction Rules\nFor schedule $S$ containing transactions $T_1, T_2, \\dots, T_n$:\nCreate directed edge $T_i \\to T_j$ if $T_i$ accesses item $X$ before $T_j$ accesses $X$, and:\n1. $T_i$ executes `write(X)` and $T_j$ executes `read(X)`\n2. $T_i$ executes `read(X)` and $T_j$ executes `write(X)`\n3. $T_i$ executes `write(X)` and $T_j$ executes `write(X)`\n\n---\n\n## 2. Deriving Equivalent Serial Schedule\nIf the graph contains **no directed cycle**:\n- Perform **Topological Sort** on the DAG.\n- The resulting linear ordering of vertices is the equivalent serial schedule $T_{\\pi(1)} \\to T_{\\pi(2)} \\to \\dots \\to T_{\\pi(n)}$.\n",
      "questions": [
        {
          "id": "dbms-pg-1",
          "question": "If the precedence graph for a schedule contains directed edges T1 -> T2 and T2 -> T1, what does this conclude?",
          "options": [
            "The schedule is conflict serializable in order T1, T2",
            "The schedule is NOT conflict serializable because it contains a directed cycle",
            "The schedule is guaranteed to be deadlock-free",
            "The schedule preserves all functional dependencies"
          ],
          "correct_option": 1,
          "explanation": "A directed cycle between T1 and T2 means no equivalent serial execution order exists; it is not conflict serializable."
        },
        {
          "id": "dbms-pg-2",
          "question": "How is the equivalent serial execution order obtained from an acyclic precedence graph?",
          "options": [
            "Breadth-First Search traversal",
            "Topological Sort of the directed acyclic graph",
            "Dijkstra's shortest path",
            "Prim's algorithm"
          ],
          "correct_option": 1,
          "explanation": "Topological sorting of the DAG orders vertices such that for every directed edge U -> V, U comes before V in the serial sequence."
        },
        {
          "id": "dbms-prec-3",
          "question": "In a Precedence Graph (Serialization Graph), how is Conflict Serializability verified?",
          "options": [
            "The schedule is conflict serializable if and only if the precedence graph contains NO directed cycles (is a DAG).",
            "The schedule is serializable if the graph is strongly connected.",
            "The graph must contain an even number of vertices.",
            "The graph must be a complete bipartite graph."
          ],
          "correct_option": 0,
          "explanation": "A schedule S is conflict serializable iff its precedence graph has no directed cycles. If acyclic, topological sort gives an equivalent serial execution order."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Precedence+Graphs+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "concurrency-2pl",
      "slug": "concurrency-control-and-2pl",
      "title": "Concurrency Control and Locking",
      "description": "Conflict serializability, shared vs exclusive locks, and growing/shrinking phases.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Concurrency Control & Two-Phase Locking (2PL)\n\nTo maintain database consistency when concurrent transactions execute, DBMS engines enforce **Two-Phase Locking (2PL)** to guarantee **conflict serializability**.\n\n---\n\n## 1. Lock Types\n- **Shared Lock (S-Lock)**: For reading. Multiple transactions can hold S-locks concurrently.\n- **Exclusive Lock (X-Lock)**: For writing. Only one transaction can hold X-lock on a data item; blocks all other S and X locks.\n\n## 2. The Two Phases of 2PL\n1. **Growing Phase**: Transaction may acquire locks, but **cannot release any lock**.\n2. **Shrinking Phase**: Transaction may release locks, but **cannot acquire any new locks**.\n\n> **Rigorous/Strict 2PL**: Holds all exclusive locks until transaction commits or aborts. Prevents cascading rollbacks.\n",
      "questions": [
        {
          "id": "2pl-1",
          "question": "What guarantee does Two-Phase Locking (2PL) provide for concurrent transactions?",
          "options": [
            "Guarantees no deadlocks",
            "Guarantees Conflict Serializability",
            "Guarantees maximum throughput",
            "Eliminates phantom reads"
          ],
          "correct_option": 1,
          "explanation": "2PL guarantees that any concurrent execution schedule is conflict serializable, though it can still suffer from deadlocks."
        },
        {
          "id": "c2pl-2",
          "question": "Does standard Two-Phase Locking (2PL) prevent deadlocks in relational databases?",
          "options": [
            "No, 2PL guarantees serializability but can still result in deadlocks",
            "Yes, 2PL completely prevents deadlocks by design",
            "Yes, because locks are acquired simultaneously at transaction start",
            "No, 2PL causes starvation but never deadlock"
          ],
          "correct_option": 0,
          "explanation": "2PL guarantees conflict serializable schedules, but transactions can still request locks in conflicting orders, leading to deadlocks that require timeout or wait-for graph cycle detection."
        },
        {
          "id": "c2pl-3",
          "question": "What distinguishes Strict Two-Phase Locking (Strict 2PL) from standard 2PL?",
          "options": [
            "All Exclusive (X) locks must be held until the transaction explicitly commits or rolls back",
            "Transactions cannot acquire Shared locks",
            "No locks can be acquired after the first read operation",
            "Locking is managed entirely without database recovery logs"
          ],
          "correct_option": 0,
          "explanation": "In Strict 2PL, a transaction must hold all its exclusive (write) locks until it terminates (commits or aborts), which eliminates cascading rollbacks."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Oracle",
        "Microsoft",
        "Amazon"
      ],
      "keyTakeaways": [
        "Two-Phase Locking (2PL): Growing Phase (acquires locks, no releases) -> Shrinking Phase (releases locks, no acquisitions).",
        "2PL guarantees conflict serializability but DOES NOT prevent deadlocks.",
        "Strict 2PL: All exclusive (X) locks held until transaction commits or aborts (prevents cascading rollbacks)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Concurrency+Control+Locking+2PL+DBMS+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-deadlocks-in-databases",
      "slug": "deadlocks-in-databases",
      "title": "Deadlocks in Databases",
      "description": "Deadlock prevention schemes (Wait-Die vs Wound-Wait based on timestamps), deadlock detection (Wait-For Graph), and deadlock recovery (victim selection, rollback, starvation prevention).",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Oracle",
        "Microsoft",
        "Salesforce"
      ],
      "keyTakeaways": [
        "Wait-Die (Non-preemptive): Older transaction waits for younger; younger transaction requesting resource held by older dies immediately.",
        "Wound-Wait (Preemptive): Older transaction preempts ('wounds') younger; younger waits for older.",
        "Wait-For Graph (WFG): Nodes are active transactions; edge Ti -> Tj means Ti is waiting for lock held by Tj. Cycle = Deadlock.",
        "Victim Selection: Minimize rollback cost (transactions near completion are spared)."
      ],
      "notesMarkdown": "# Deadlocks in Databases\n\n---\n\n## 1. Deadlock Prevention: Wait-Die vs. Wound-Wait\nBased on transaction arrival timestamps $TS(T)$ (smaller timestamp = older transaction):\n\n| Scheme | Older requests lock held by Younger | Younger requests lock held by Older | Type |\n|---|---|---|---|\n| **Wait-Die** | Older **waits** | Younger **dies** (aborts & restarts) | Non-preemptive |\n| **Wound-Wait** | Older preempts (**wounds/aborts**) Younger | Younger **waits** | Preemptive |\n\nBoth schemes are completely deadlock-free because timestamps strictly prohibit circular wait!\n\n---\n\n## 2. Deadlock Detection & Wait-For Graphs\n- OS/DBMS periodically builds **Wait-For Graph (WFG)**.\n- If cycle detected $\\implies$ Deadlock!\n- **Recovery:** Select victim transaction to rollback (either partial savepoint or complete abort). To prevent victim starvation, maintain retry counter.\n",
      "questions": [
        {
          "id": "dbms-dl-1",
          "question": "In the Wound-Wait deadlock prevention scheme, what happens when an older transaction T_old requests a data item held by younger transaction T_young?",
          "options": [
            "T_old dies immediately",
            "T_old waits for T_young to release the lock",
            "T_old preempts (wounds) T_young, causing T_young to abort and rollback",
            "Both transactions are aborted"
          ],
          "correct_option": 2,
          "explanation": "In Wound-Wait, older transactions preempt younger transactions by wounding (aborting) them to acquire the lock immediately."
        },
        {
          "id": "dbms-dl-2",
          "question": "How does the DBMS prevent victim starvation during repeated deadlock recovery rollbacks?",
          "options": [
            "By always killing the oldest transaction",
            "By preserving the transaction's original timestamp upon restart, ensuring it eventually becomes the oldest",
            "By disabling locks for rolled back transactions",
            "By switching from relational to NoSQL"
          ],
          "correct_option": 1,
          "explanation": "Retaining the original timestamp ensures the transaction ages and gains highest priority, preventing it from being repeatedly chosen as a victim."
        },
        {
          "id": "dbms-dl-3",
          "question": "In database concurrency, what is the Wait-Die deadlock prevention scheme?",
          "options": [
            "Non-preemptive scheme where an older transaction is allowed to wait for a younger one, but a younger transaction dies (rolls back) if it requests a data item held by an older one.",
            "Preemptive scheme where older transactions always kill younger ones.",
            "Both transactions die immediately upon conflict.",
            "Transactions wait indefinitely until a timer fires."
          ],
          "correct_option": 0,
          "explanation": "Wait-Die is a timestamp-based non-preemptive prevention policy: if Ti requests a lock held by Tj, Ti waits only if Timestamp(Ti) < Timestamp(Tj) (older waits for younger); otherwise Ti dies."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Deadlocks+in+Databases+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "dbms-recovery-techniques",
      "slug": "recovery-techniques",
      "title": "Recovery Techniques",
      "description": "Failure classification, Write-Ahead Logging (WAL), Deferred vs Immediate Database Modification, Checkpointing, and ARIES recovery algorithm (Analysis, Redo, Undo phases).",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Amazon",
        "Oracle",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Write-Ahead Logging (WAL): Log record must be flushed to non-volatile storage BEFORE the corresponding dirty database page is written to disk.",
        "Deferred Modification: All writes buffered in log until commit; requires REDO only during crash recovery.",
        "Immediate Modification: Writes written to disk before commit; requires both UNDO (uncommitted) and REDO (committed).",
        "Checkpointing: Reduces recovery log scan time by flushing dirty buffer pages and recording active transaction table.",
        "ARIES: Analysis (reconstruct state) -> Redo (repeat history) -> Undo (rollback uncommitted)."
      ],
      "notesMarkdown": "# Database Recovery & Logging\n\n---\n\n## 1. Write-Ahead Logging (WAL) Protocol\n1. Must write log record `<Ti, X, old_val, new_val>` to stable disk storage **before** writing the modified data item to database disk.\n2. Must write `<Ti, COMMIT>` log record to disk **before** acknowledging commit to client.\n\n---\n\n## 2. Immediate vs. Deferred Update\n- **Deferred Update:** Database is updated on disk *only after* commit. Recovery needs only `REDO`. No `UNDO` needed because uncommitted writes never touched disk.\n- **Immediate Update:** Database can be updated on disk *before* commit. Recovery needs:\n  - `UNDO` transactions that have `START` but no `COMMIT` in log.\n  - `REDO` transactions that have both `START` and `COMMIT` in log.\n\n---\n\n## 3. ARIES Recovery Algorithm\n1. **Analysis Phase:** Scan forward from latest checkpoint to identify dirty pages in buffer and active transactions at crash time.\n2. **Redo Phase:** Scan forward repeating history; reapplies all logged updates to return DB to crash state.\n3. **Undo Phase:** Scan backward rolling back changes of all active (uncommitted) transactions.\n",
      "questions": [
        {
          "id": "dbms-rec-1",
          "question": "What is the core rule mandated by the Write-Ahead Logging (WAL) protocol?",
          "options": [
            "Log records are written after database disk blocks are flushed",
            "The log record containing the old and new value must be written to stable storage before the dirty database page is written to disk",
            "All transactions must be read-only",
            "Transactions must commit within 1 second"
          ],
          "correct_option": 1,
          "explanation": "WAL guarantees atomicity and durability by ensuring recovery log entries precede physical database updates on disk."
        },
        {
          "id": "dbms-rec-2",
          "question": "During crash recovery with immediate modification logging, what action is taken for a transaction with <Ti, START> in the log but NO <Ti, COMMIT>?",
          "options": [
            "REDO Ti",
            "UNDO Ti",
            "Ignore Ti",
            "Commit Ti immediately"
          ],
          "correct_option": 1,
          "explanation": "Because Ti never committed before the crash, its modifications must be undone (rolled back) to preserve atomicity."
        },
        {
          "id": "dbms-rec-3",
          "question": "In Write-Ahead Logging (WAL), what is the mandatory sequence of writing updates to log vs database storage?",
          "options": [
            "The log record must be flushed to non-volatile disk BEFORE the corresponding modified database page is written to disk.",
            "Database pages are written first, and log entries are written asynchronously.",
            "Logs are kept exclusively in volatile RAM.",
            "The database buffer pool is flushed only upon server reboot."
          ],
          "correct_option": 0,
          "explanation": "The WAL protocol dictates that log records describing an update must be forced to stable non-volatile storage before the actual database page containing that update can be written to disk, ensuring atomicity and durability on crash recovery."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Recovery+Techniques+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "indexing-btree",
      "slug": "indexing-and-btree",
      "title": "Indexing, B-Trees, and B+ Trees",
      "description": "Clustered vs Non-Clustered index, leaf node linked lists, composite indexing, and index scans.",
      "estimatedMinutes": 18,
      "notesMarkdown": "\n# Database Indexing & B+ Trees\n\n---\n\n## 1. Clustered vs. Non-Clustered Index\n- **Clustered Index:**\n  - Dictates the physical order of data rows on disk.\n  - Exactly **one** clustered index per table (typically Primary Key).\n  - Leaf nodes contain the actual table data pages.\n- **Non-Clustered (Secondary) Index:**\n  - Separate structure with pointers to the physical data rows (row IDs or clustered key).\n  - Can have multiple non-clustered indexes on a table.\n\n---\n\n## 2. Why B+ Trees instead of Binary Trees?\n- **High Fanout:** B+ tree nodes hold hundreds of keys, keeping tree height very shallow (3-4 levels) to minimize disk I/O.\n- **Sequential Leaf Linking:** All leaf nodes in a B+ tree are doubly linked, allowing blazing-fast range queries (`WHERE age BETWEEN 20 AND 30`).\n",
      "questions": [
        {
          "id": "db-5",
          "question": "Why are B+ trees preferred over standard B-trees for relational database indexes?",
          "options": [
            "B+ trees store data pointers in all nodes",
            "All data pointers are stored only in the leaf nodes, which are linked for fast range scans",
            "B+ trees require no balancing operations",
            "B+ trees use less RAM during compilation"
          ],
          "correct_option": 1,
          "explanation": "B+ tree internal nodes only store navigation keys (increasing fanout), and all leaf nodes form a contiguous linked list, making range queries extremely efficient with sequential disk reads."
        },
        {
          "id": "idx-2",
          "question": "How many Clustered Indexes can exist on a single relational database table, and why?",
          "options": [
            "Exactly one, because data rows can only be physically sorted in one order on disk",
            "Unlimited, provided each index uses a different combination of columns",
            "Up to two: one ascending and one descending",
            "One for every unique column constraint"
          ],
          "correct_option": 0,
          "explanation": "A clustered index defines the physical storage sequence of data rows in the table. Because physical data records can only reside in a single sorted sequence on disk blocks, a table can have at most one clustered index."
        },
        {
          "id": "idx-3",
          "question": "What is a \"Covering Index\" in SQL databases?",
          "options": [
            "An index that contains all columns requested by a query, allowing the DB to resolve the query without accessing table heap pages",
            "An index applied across all tables in a schema",
            "A clustered index covering the primary key alone",
            "An index that covers NULL values exclusively"
          ],
          "correct_option": 0,
          "explanation": "A covering index includes all fields in the SELECT, WHERE, and JOIN clauses. The engine satisfies the entire query directly from index memory without performing secondary lookups into the heap."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Databricks"
      ],
      "keyTakeaways": [
        "B+ Tree stores all actual data records/pointers in leaf nodes linked as a doubly-linked list.",
        "Internal nodes store only routing keys, allowing high fan-out and shallow tree height (3-4 I/O lookups).",
        "Covering index satisfies query entirely from index leaf nodes without fetching table heap pages."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Indexing+B-Trees+B%2B+Trees+DBMS+DBMS+Database+Management+Systems+GATE+lecture"
    },
    {
      "id": "nosql-cap",
      "slug": "nosql-and-cap-theorem",
      "title": "CAP Theorem, BASE Model & NoSQL Paradigms",
      "description": "Consistency vs Availability vs Partition tolerance, Document, Key-Value, and Columnar stores.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# CAP Theorem & NoSQL Architecture\n\nDistributed database systems must balance consistency, availability, and network durability across clusters.\n\n---\n\n## 1. Brewer's CAP Theorem\nIn any asynchronous distributed data store with network partitioning, you can choose at most **two of three** properties:\n- **Consistency (C)**: Every read receives the most recent write or an error.\n- **Availability (A)**: Every non-failing node returns a non-error response, without guarantee of latest data.\n- **Partition Tolerance (P)**: System continues operating despite arbitrary dropped or delayed network packets.\n\n> **Crucial Reality**: Network partitions (P) are unavoidable in distributed hardware. Therefore, the architectural choice is always between **CP** (Consistency over Availability) and **AP** (Availability over Consistency).\n\n## 2. ACID vs BASE\n- **ACID** (Relational): Atomicity, Consistency, Isolation, Durability.\n- **BASE** (Distributed NoSQL):\n  - **B**asically **A**vailable: Guaranteed availability.\n  - **S**oft-state: State may change over time without inputs due to replication.\n  - **E**ventual consistency: Nodes will eventually converge to identical data once writes cease.\n",
      "questions": [
        {
          "id": "cap-1",
          "question": "According to the CAP theorem, why is a 'CA' system impractical in modern distributed cloud architectures?",
          "options": [
            "Databases cannot run without ACID transactions",
            "Network partitions are physically inevitable across distributed networks",
            "Hardware memory cannot scale past 1 Terabyte",
            "SQL engines do not support horizontal sharding"
          ],
          "correct_option": 1,
          "explanation": "Network delays and packet loss will always happen across physical networks, making Partition Tolerance (P) mandatory."
        },
        {
          "id": "cap-2",
          "question": "According to Brewer’s CAP Theorem, when a network partition (P) occurs in a distributed database cluster, what trade-off must be made?",
          "options": [
            "Choose between Consistency (rejecting updates to keep state identical) or Availability (accepting updates that may diverge)",
            "Choose between Relational normalization and NoSQL document storage",
            "Choose between disk storage and in-memory caching",
            "Choose between horizontal and vertical scaling"
          ],
          "correct_option": 0,
          "explanation": "Network partitions are inevitable in real networks. When nodes cannot communicate, the system must either refuse writes to guarantee consistency (CP) or accept writes on isolated nodes sacrificing immediate consistency (AP)."
        },
        {
          "id": "cap-3",
          "question": "What does the acronym BASE stand for in distributed NoSQL database architectures?",
          "options": [
            "Basically Available, Soft state, Eventual consistency",
            "Binary Access, Scalable Execution, Encrypted",
            "Buffered Asynchronous Synchronized Entities",
            "Balanced Allocation, Segmented Execution"
          ],
          "correct_option": 0,
          "explanation": "BASE contrasts with ACID: Basically Available (system remains functional), Soft state (state may change over time without inputs due to replication), and Eventual consistency."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Netflix",
        "Meta",
        "Amazon",
        "Uber"
      ],
      "keyTakeaways": [
        "CAP Theorem: In the event of a network partition (P), a distributed system must choose Consistency (C) or Availability (A).",
        "BASE model: Basically Available, Soft state, Eventual consistency.",
        "Cassandra and DynamoDB are AP (high availability + partition tolerance + eventual consistency)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=CAP+Theorem+BASE+NoSQL+DBMS+DBMS+Database+Management+Systems+GATE+lecture"
    }
  ]
};
