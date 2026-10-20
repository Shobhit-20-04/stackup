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
      "notesMarkdown": "# Database Architecture and the ANSI-SPARC Three-Schema Framework\n\nA Database Management System (DBMS) is software designed to store, retrieve, query, and manage structured data efficiently with guarantees of integrity, concurrency, and crash recovery. To decouple user applications from physical storage representations, the database community standardized the **ANSI-SPARC Three-Schema Architecture**.\n\n---\n\n## 1. The ANSI-SPARC Three-Level Architecture\n\n```\n                  +-----------------------------------+\n                  | External Level (User Views)       |\n                  | View 1: Payroll   View 2: HR      |\n                  +-----------------+-----------------+\n                                    |\n                    [ Logical Data Independence ]\n                                    |\n                  +-----------------+-----------------+\n                  | Conceptual Level (Community Schema)|\n                  | Entities, Attributes, Constraints |\n                  +-----------------+-----------------+\n                                    |\n                    [ Physical Data Independence ]\n                                    |\n                  +-----------------+-----------------+\n                  | Internal Level (Physical Schema)  |\n                  | B+ Trees, Hashing, File Blocks    |\n                  +-----------------+-----------------+\n                                    |\n                  +-----------------+-----------------+\n                  | Physical Storage (Disk / SSD / OS)|\n                  +-----------------------------------+\n```\n\n1. **External Level (View Schema):** Describes the part of the database relevant to specific end-user groups. Hides irrelevant data and enforces security/privacy (e.g., an employee view hides salary data).\n2. **Conceptual Level (Logical Schema):** Describes *what* data is stored in the entire database and the relationships among data items. Free of physical storage details; defines tables, columns, data types, and integrity constraints.\n3. **Internal Level (Physical Schema):** Describes *how* data is physically stored on disk (record layouts, compression, B+ tree indexes, hashing schemes, and block clustering).\n\n---\n\n## 2. Logical vs Physical Data Independence\n\nData Independence is the capacity to modify a schema definition at one level without requiring alterations to schemas at higher levels.\n\n### Physical Data Independence\nThe capacity to modify the **Internal Schema** without altering the **Conceptual Schema**.\n- *Example:* Adding a B+ tree index to speed up queries, switching from magnetic HDD to NVMe SSD, or reorganizing block storage.\n- Application programs and SQL queries require **zero code changes**!\n\n### Logical Data Independence\nThe capacity to modify the **Conceptual Schema** without altering the **External Views** or application programs.\n- *Example:* Adding a new attribute to a table, splitting a table into two normalized tables, or creating a SQL View (`CREATE VIEW`) that preserves the legacy table interface.\n- Much harder to achieve than physical data independence because application logic is tightly bound to conceptual attributes.\n\n---\n\n## 3. High-Yield Interview Traps & Pitfalls\n\n1. **Database Schema vs Database Instance:**\n   - **Schema (Intension):** The overall structural design and constraints of the database; specified during database creation and rarely changes.\n   - **Instance (Extension):** The actual collection of data records populated in the database at a specific snapshot in time; changes constantly with `INSERT`/`UPDATE`/`DELETE`.\n2. **File System vs DBMS:**\n   Traditional file processing systems suffer from data redundancy, inconsistent updates, difficult concurrent access, lack of atomicity during crashes, and security enforcement scattered across application code. A DBMS centralizes query optimization, concurrency control, and ACID durability.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Three Layers:** External (Views) $\\to$ Conceptual (Tables/Constraints) $\\to$ Internal (Storage/Indexes).\n- **Physical Independence:** Change storage/indexes without rewriting SQL queries.\n- **Logical Independence:** Change schema/relations without breaking existing external views.\n- **DDL vs DML:** DDL (Data Definition Language: `CREATE`, `ALTER`, `DROP`) alters Schema; DML (Data Manipulation Language: `SELECT`, `INSERT`, `UPDATE`, `DELETE`) operates on Instances.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Database+Architecture+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Operating system file I/O fundamentals",
        "Client-server networking basics"
      ],
      "externalResources": [
        {
          "title": "PostgreSQL Architecture and Internal Design",
          "url": "https://www.postgresql.org/docs/current/overview.html",
          "provider": "Official Documentation",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: DBMS 3-Tier Architecture",
          "url": "https://www.geeksforgeeks.org/three-schema-architecture-in-dbms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Database Architecture and Data Independence",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Entity-Relationship (ER) Modeling, Attributes, and Diagram Conversion\n\nThe Entity-Relationship (ER) model is a high-level conceptual data model developed by Peter Chen. It provides visual, formal representations of real-world entities, their properties, and relationships to facilitate database schema design before physical table implementation.\n\n---\n\n## 1. Core ER Diagram Symbols & Constructs\n\n```\nSymbol in ER Diagram          Meaning\n+-----------------------+     +-----------------------------------------------+\n| Rectangle             |     Strong Entity Set (independent existence)       |\n| Double Rectangle      |     Weak Entity Set (existence dependent on owner)  |\n| Diamond               |     Relationship Set                                |\n| Double Diamond        |     Identifying Relationship for Weak Entity        |\n| Ellipse / Oval        |     Attribute                                       |\n| Double Ellipse        |     Multivalued Attribute (e.g., PhoneNumbers)      |\n| Dashed Ellipse        |     Derived Attribute (e.g., Age derived from DOB)  |\n| Underlined Text       |     Primary Key (Discriminator)                     |\n| Dashed Underline      |     Partial Key (Discriminator of Weak Entity)      |\n| Double Line           |     Total Participation (Existential Dependency)    |\n| Single Line           |     Partial Participation                           |\n+-----------------------+     +-----------------------------------------------+\n```\n\n---\n\n## 2. Attribute Classifications\n\n- **Simple (Atomic):** Cannot be divided further (e.g., `Salary`, `RollNo`).\n- **Composite:** Composed of sub-components (e.g., `Name` $\\to$ `FirstName`, `LastName`; `Address` $\\to$ `City`, `State`, `Zip`).\n- **Single-Valued:** Holds exactly one value per entity (e.g., `DateOfBirth`).\n- **Multivalued:** Can hold multiple values for a single entity (e.g., `Skills`, `PhoneNumbers`). Represented by double oval.\n- **Derived:** Computed dynamically from stored attributes (e.g., `Age = CurrentDate - DateOfBirth`). Represented by dashed oval; not stored physically in tables.\n\n---\n\n## 3. Mapping Cardinalities and Participation\n\n- **Cardinality Ratios:**\n  - **1 : 1 (One-to-One):** An entity in $A$ is associated with at most one entity in $B$, and vice versa (e.g., Department $\\leftrightarrow$ Manager).\n  - **1 : N (One-to-Many):** An entity in $A$ is associated with any number of entities in $B$; an entity in $B$ is associated with at most one in $A$ (e.g., Department $\\leftrightarrow$ Employees).\n  - **M : N (Many-to-Many):** Entities in $A$ and $B$ are associated with any number of each other (e.g., Students $\\leftrightarrow$ Courses).\n- **Participation Constraints:**\n  - **Total Participation:** Every entity in the set must participate in the relationship (e.g., every Employee *must* belong to a Department).\n  - **Partial Participation:** Some entities may not participate (e.g., not every Employee manages a Department).\n\n---\n\n## 4. Weak Entity Sets\n\nA **Weak Entity Set** does not possess sufficient attributes to form a primary key on its own.\n- Must be existence-dependent on an **Identifying (Owner) Entity Set**.\n- Identified by combining the Owner's Primary Key + the Weak Entity's **Partial Key (Discriminator)**.\n- *Example:* `Employee` (Strong: `EmpId`) $\\leftrightarrow$ `Dependent` (Weak: `DependentName`).\n  Primary Key of `Dependent` table is `(EmpId, DependentName)`.\n\n---\n\n## 5. Converting ER Diagrams to Relational Tables\n\n1. **Strong Entity Set:** Maps directly to a relation with all atomic attributes. Composite attributes are flattened into their constituent atomic fields.\n2. **Multivalued Attribute:** Creates a **separate relation** containing the primary key of the parent entity + the multivalued attribute.\n3. **1:N Relationship:** Place the Primary Key of the \"1\" side into the table on the \"N\" side as a **Foreign Key** (avoids creating a redundant relationship table!).\n4. **M:N Relationship:** **Must create a separate relationship table (Junction Table)** containing foreign keys referencing primary keys of both participating entities: `(KeyA, KeyB)`.\n\n---\n\n## 6. Summary Cheatsheet & Key Formulas\n\n- **Minimum Tables for 1:N with Total Participation:** $2$ tables.\n- **Minimum Tables for M:N Relationship:** $3$ tables (Table A, Table B, and Bridge Table AB).\n- **Weak Entity Table Key:** $\\text{PK} = \\text{Owner\\_PK} \\cup \\text{Partial\\_Key}$.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=ER+Model+and+ER+Diagrams+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Database architecture and relational concepts",
        "Basic set theory and relations"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Database Systems - Conceptual Modeling",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: ER Model in DBMS",
          "url": "https://www.geeksforgeeks.org/introduction-of-er-model/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: ER Diagrams and Cardinality Ratios",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
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
      "youtube_url": "https://www.youtube.com/results?search_query=Relational+Model+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Relational Algebra",
        "Candidate, Primary and Foreign Keys"
      ],
      "externalResources": [
        {
          "title": "Relational Model and Constraints — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/relational-model-in-dbms/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Relational Algebra and Relational Calculus\n\nRelational Algebra is a formal, procedural query language where queries are expressed by applying relational operators to relations to produce new relations. It forms the mathematical backbone of SQL query parsing, execution planning, and cost-based query optimization inside database engines.\n\n---\n\n## 1. Fundamental Relational Algebra Operators\n\nThere are six fundamental operators from which all other algebraic operations can be derived:\n\n### 1. Selection ($\\sigma$)\nFilters tuples (rows) that satisfy a specified predicate condition:\n$$\\sigma_{p}(R) = \\{ t \\mid t \\in R \\land p(t) = \\text{true} \\}$$\n- *Example:* $\\sigma_{\\text{salary} > 50000}(\\text{Employee})$ selects employees with salary exceeding 50,000.\n- Commutative: $\\sigma_{c_1}(\\sigma_{c_2}(R)) = \\sigma_{c_2}(\\sigma_{c_1}(R))$.\n\n### 2. Projection ($\\pi$)\nSelects specified attributes (columns) and automatically discards duplicate tuples (set semantics):\n$$\\pi_{A_1, A_2, \\dots, A_k}(R)$$\n- *Example:* $\\pi_{\\text{name, department}}(\\text{Employee})$.\n\n### 3. Cartesian Product ($\\times$)\nCombines every tuple of relation $R$ with every tuple of relation $S$:\n- Degree: $\\text{Degree}(R \\times S) = \\text{Degree}(R) + \\text{Degree}(S)$.\n- Cardinality: $|R \\times S| = |R| \\times |S|$.\n\n### 4. Set Union ($\\cup$), Set Difference ($-$), and Intersection ($\\cap$)\n- Relations must be **Union-Compatible**: same degree and matching attribute domain types.\n- Set Difference: $R - S$ yields tuples in $R$ that are not in $S$.\n- Intersection is derived: $R \\cap S = R - (R - S)$.\n\n### 5. Rename ($\\rho$)\nRenames relations and attributes: $\\rho_{S(B_1, B_2, \\dots)}(R)$.\n\n---\n\n## 2. Derived Operators: Natural Join ($\\bowtie$) and Division ($\\div$)\n\n### Natural Join ($R \\bowtie S$)\nPerforms equality comparison on all common attribute names, keeping only one copy of each common attribute:\n$$R \\bowtie S = \\pi_{\\text{all unique}}(\\sigma_{R.A_1 = S.A_1 \\land \\dots}(R \\times S))$$\n\n### Relational Division ($\\div$)\nAnswers queries involving universal quantification (\"Find all students who enrolled in **ALL** courses taught by Prof. Knuth\"):\n$$R(A, B) \\div S(B)$$\nYields all values of attribute $A$ that are paired with **every** value in relation $S$.\nFormulation using basic operators:\n$$R \\div S = \\pi_A(R) - \\pi_A((\\pi_A(R) \\times S) - R)$$\n\n---\n\n## 3. Relational Calculus: Declarative Querying\n\nWhile Relational Algebra is **procedural** (specifying *how* to evaluate the result), Relational Calculus is **declarative** (specifying *what* data is desired).\n\n- **Tuple Relational Calculus (TRC):** $\\{ t \\mid P(t) \\}$ where $t$ is a tuple variable.\n  - *Example:* $\\{ t \\mid t \\in \\text{Employee} \\land t[\\text{salary}] > 50000 \\}$.\n- **Domain Relational Calculus (DRC):** $\\{ \\langle x_1, x_2, \\dots, x_n \\rangle \\mid P(x_1, \\dots, x_n) \\}$ where variables range over attribute domains.\n- **Codd's Equivalence Theorem:** Relational Algebra, safe Tuple Relational Calculus, and safe Domain Relational Calculus are mathematically equivalent in expressive power (a query language that can express these is said to be **Relational Complete**).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Selection ($\\sigma$):** Row slicing (Horizontal reduction).\n- **Projection ($\\pi$):** Column slicing (Vertical reduction, eliminates duplicates).\n- **Natural Join Degree:** $\\text{Degree}(R \\bowtie S) = \\text{Degree}(R) + \\text{Degree}(S) - \\text{Common Attributes}$.\n- **Universal Query (\"FOR ALL\"):** Requires Relational Division ($\\div$).\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Relational+Algebra+and+Relational+Calculus+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Set theory: unions, intersections, Cartesian products",
        "Relational model and schemas"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Relational Algebra and Query Optimization",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Relational Algebra in DBMS",
          "url": "https://www.geeksforgeeks.org/introduction-of-relational-algebra-in-dbms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Relational Algebra Operators and Query Formulation",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "youtube_url": "https://www.youtube.com/results?search_query=SQL+Queries+Joins+Subqueries+Window+Functions+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Cartesian Products",
        "SQL SELECT and Filtering"
      ],
      "externalResources": [
        {
          "title": "SQL Joins Explained with Examples — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "SQL Joins Tutorial — W3Schools",
          "provider": "W3Schools",
          "url": "https://www.w3schools.com/sql/sql_join.asp",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Keys and Integrity Constraints in the Relational Model\n\nKeys uniquely identify tuples within relations and enforce relational integrity constraints to maintain consistency, accuracy, and referential validity across database updates.\n\n---\n\n## 1. Hierarchy of Database Keys\n\n```\n               +---------------------------------------+\n               |              SUPER KEYS               |\n               | (Any set of attributes that uniquely  |\n               |  identifies a tuple)                  |\n               |   +-------------------------------+   |\n               |   |        CANDIDATE KEYS         |   |\n               |   |  (Minimal Super Key:          |   |\n               |   |   No proper subset is a key)  |   |\n               |   |   +-----------------------+   |   |\n               |   |   |     PRIMARY KEY       |   |   |\n               |   |   | (Chosen Candidate Key)|   |   |\n               |   |   +-----------------------+   |   |\n               |   |   |    ALTERNATE KEYS     |   |   |\n               |   |   | (Unchosen Candidates) |   |   |\n               |   |   +-----------------------+   |   |\n               |   +-------------------------------+   |\n               +---------------------------------------+\n```\n\n1. **Super Key:** A set of one or more attributes that uniquely identifies a row in a table. Adding extraneous attributes to a super key leaves it a super key (e.g., if `{ID}` is unique, `{ID, Name}` and `{ID, Name, Phone}` are also super keys).\n2. **Candidate Key:** A **Minimal Super Key**. If any attribute is removed from a candidate key, it ceases to be unique.\n3. **Primary Key:** The single candidate key selected by the database designer as the principal tuple identifier. **Cannot contain NULL values.**\n4. **Alternate (Secondary) Keys:** Candidate keys that were not chosen as the primary key.\n5. **Foreign Key:** An attribute (or set of attributes) in table $R_1$ that references the Candidate Key (typically Primary Key) of table $R_2$.\n\n---\n\n## 2. Relational Integrity Constraints\n\n1. **Domain Integrity:** Attribute values must conform to declared data types, valid ranges, and `CHECK` constraints.\n2. **Entity Integrity:** The Primary Key attribute cannot contain `NULL` values (because `NULL` cannot uniquely distinguish rows).\n3. **Referential Integrity:** A Foreign Key value in referencing table $R_1$ must either:\n   - Match a valid existing Primary Key value in referenced table $R_2$, OR\n   - Be `NULL` (if nullable).\n\n### Referential Action Policies (`ON DELETE / ON UPDATE`)\nWhen a referenced parent row is deleted or updated:\n- `CASCADE`: Automatically deletes or updates matching child rows.\n- `SET NULL`: Sets referencing foreign key columns to `NULL`.\n- `RESTRICT / NO ACTION`: Rejects the parent delete/update operation with an integrity violation error.\n- `SET DEFAULT`: Resets referencing columns to designated default values.\n\n---\n\n## 3. High-Yield Interview Traps & Calculations\n\n- **Calculating Number of Super Keys:**\n  If a relation $R(A_1, A_2, \\dots, A_n)$ has candidate key $A_1$:\n  Any combination of the remaining $n - 1$ attributes appended to $A_1$ yields a super key.\n  $$\\text{Total Super Keys} = 2^{n - 1}$$\n- If candidate keys are $A_1$ and $A_2$:\n  $$\\text{Total Super Keys} = 2^{n - 1} + 2^{n - 1} - 2^{n - 2} = 3 \\times 2^{n - 2}$$ (by Principle of Inclusion-Exclusion).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Candidate Key Definition:** Super key with the minimality property.\n- **Prime Attribute:** An attribute that is a member of *any* candidate key.\n- **Non-Prime Attribute:** An attribute that does not belong to any candidate key.\n- **Foreign Key Invariant:** References a unique/primary key in parent relation.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Keys+and+Integrity+Constraints+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Relational model fundamentals",
        "Sets, Cartesian products, and attributes"
      ],
      "externalResources": [
        {
          "title": "PostgreSQL Documentation: Constraints and Foreign Keys",
          "url": "https://www.postgresql.org/docs/current/ddl-constraints.html",
          "provider": "Official Documentation",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Keys in Relational Model (Candidate, Super, Primary, Foreign)",
          "url": "https://www.geeksforgeeks.org/types-of-keys-in-relational-model-candidate-super-primary-alternate-and-foreign/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Database Keys and Referential Integrity Traps",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Functional Dependencies and Armstrong's Axioms\n\nA Functional Dependency (FD) is a mathematical constraint between two sets of attributes in a relational database. It formalizes the concept of data determinism and provides the mathematical foundation for evaluating database normalization and eliminating update anomalies.\n\n---\n\n## 1. Formal Definition of Functional Dependency\n\nGiven a relation schema $R$ and subsets of attributes $X, Y \\subseteq R$:\nThe functional dependency $X \\to Y$ (read \"$X$ functionally determines $Y$\" or \"$Y$ is functionally dependent on $X$\") holds if and only if:\n$$\\forall t_1, t_2 \\in R, \\quad \\text{if } t_1[X] = t_2[X] \\implies t_1[Y] = t_2[Y]$$\nWhenever two tuples agree on attribute values of $X$, they **must agree** on attribute values of $Y$.\n\n- **Trivial FD:** $X \\to Y$ is trivial if $Y \\subseteq X$ (e.g., $AB \\to A$). Always holds automatically.\n- **Non-Trivial FD:** $X \\to Y$ where $Y \\not\\subseteq X$.\n- **Completely Non-Trivial FD:** $X \\to Y$ where $X \\cap Y = \\emptyset$.\n\n---\n\n## 2. Armstrong's Axioms\n\nIn 1974, William W. Armstrong proved that the following three inference rules are **Sound** (only true dependencies are generated) and **Complete** (generate all valid implied dependencies):\n\n### The 3 Primary Axioms:\n1. **Reflexivity Rule:**\n   $$\\text{If } Y \\subseteq X, \\quad \\text{then } X \\to Y$$\n2. **Augmentation Rule:**\n   $$\\text{If } X \\to Y, \\quad \\text{then } XZ \\to YZ \\quad \\text{for any } Z$$\n3. **Transitivity Rule:**\n   $$\\text{If } X \\to Y \\land Y \\to Z, \\quad \\text{then } X \\to Z$$\n\n### Derived Secondary Rules:\n- **Union (Additive) Rule:**\n  $$\\text{If } X \\to Y \\land X \\to Z \\implies X \\to YZ$$\n- **Decomposition (Projective) Rule:**\n  $$\\text{If } X \\to YZ \\implies X \\to Y \\land X \\to Z$$\n  *(Crucial Note: Decomposition applies ONLY to the right-hand side! $XY \\to Z$ does NOT imply $X \\to Z$!)*\n- **Pseudo-Transitivity Rule:**\n  $$\\text{If } X \\to Y \\land WY \\to Z \\implies WX \\to Z$$\n\n---\n\n## 3. High-Yield Interview Traps & Pitfalls\n\n1. **Left-Hand Side Decomposition Trap:**\n   Students frequently mistake $AB \\to C$ for $A \\to C$ and $B \\to C$. This is fundamentally invalid (e.g., `{Course, Student} -> Grade`, but `Course` alone does not determine `Grade`!).\n2. **FDs are Schema Constraints, Not Instance Coincidences:**\n   You cannot prove an FD holds merely by looking at the rows of a current table instance. An FD is a semantic business rule that must hold across all past, present, and future valid states of the database.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **FD Definition:** $t_1[X] = t_2[X] \\implies t_1[Y] = t_2[Y]$.\n- **Super Key via FD:** $K$ is a super key of $R \\iff K \\to R$.\n- **Sound & Complete:** Armstrong's Axioms generate the exact closure $F^+$.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Functional+Dependencies+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Keys and integrity constraints in relational models",
        "Relations and attribute schemas"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Functional Dependencies and Normalization",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Functional Dependency and Armstrong Axioms",
          "url": "https://www.geeksforgeeks.org/functional-dependency-and-attribute-closure/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Functional Dependencies and Closure Calculation",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Attribute Closure and Candidate Key Determination\n\nFinding attribute closures is the fundamental algorithm used to test if a functional dependency is implied, determine all candidate keys of a relation, and check if a decomposition satisfies normal forms.\n\n---\n\n## 1. The Attribute Closure Algorithm ($X^+$)\n\nThe **Attribute Closure** $X^+$ of a set of attributes $X$ under a set of functional dependencies $F$ is the set of all attributes that are functionally determined by $X$.\n\n### Algorithm:\n1. Initialize $\\text{Closure} = X$.\n2. Repeatedly scan each FD $Y \\to Z \\in F$:\n   - If $Y \\subseteq \\text{Closure}$ and $Z \\not\\subseteq \\text{Closure}$:\n   - $\\text{Closure} = \\text{Closure} \\cup Z$.\n3. Stop when an entire pass over $F$ adds no new attributes to $\\text{Closure}$.\n4. Return $X^+ = \\text{Closure}$.\n\n---\n\n## 2. Algorithm to Find All Candidate Keys\n\nTo find all candidate keys of schema $R(A_1, A_2, \\dots, A_n)$ with dependencies $F$:\n\n1. **Partition Attributes into Four Categories:**\n   - **Set L:** Attributes appearing **only on the Left-Hand Side** of FDs.\n   - **Set R:** Attributes appearing **only on the Right-Hand Side** of FDs.\n   - **Set B:** Attributes appearing on **Both** sides of FDs.\n   - **Set N:** Attributes appearing on **Neither** side of FDs.\n2. **Key Invariants:**\n   - Attributes in **$L \\cup N$ must be present in EVERY candidate key** (because nothing determines them!).\n   - Attributes in **$R$ can NEVER be present in any candidate key**.\n3. **Evaluate Closure:**\n   - Compute closure of essential attributes $(L \\cup N)^+$.\n   - If $(L \\cup N)^+ = R$, then $(L \\cup N)$ is the **sole unique Candidate Key**!\n   - If not, systematically combine attributes from set $B$ with $(L \\cup N)$ and test closures to find minimal keys.\n\n---\n\n## 3. Worked Example: Finding Candidate Keys\n\nConsider relation $R(A, B, C, D, E, F)$ with FDs:\n$$F = \\{ A \\to B, \\quad BC \\to D, \\quad E \\to C, \\quad D \\to A \\}$$\n\n1. **Categorize Attributes:**\n   - Left only ($L$): $\\{ E, F \\}$ (F is on neither side $\\implies N = \\{F\\}$).\n   - Right only ($R$): None.\n   - Both ($B$): $\\{ A, B, C, D \\}$.\n2. **Essential Core:** Must include $E$ and $F$.\n   - Compute $(EF)^+$:\n     $E \\to C \\implies EF^+ = \\{E, F, C\\}$ (Not all attributes).\n3. **Test Combinations with Set B:**\n   - Try $(AEF)^+$:\n     $A \\to B \\implies \\{A, E, F, C, B\\}$.\n     $BC \\to D \\implies \\{A, B, C, D, E, F\\} = R$. $\\implies \\mathbf{AEF}$ is a Candidate Key!\n   - Try $(BEF)^+$:\n     $E \\to C \\implies \\{B, E, F, C\\}$.\n     $BC \\to D \\implies \\{B, C, D, E, F\\}$.\n     $D \\to A \\implies \\{A, B, C, D, E, F\\} = R$. $\\implies \\mathbf{BEF}$ is a Candidate Key!\n   - Try $(DEF)^+$:\n     $D \\to A \\implies \\{A, D, E, F\\}$.\n     $A \\to B \\implies \\{A, B, D, E, F\\}$.\n     $E \\to C \\implies \\{A, B, C, D, E, F\\} = R$. $\\implies \\mathbf{DEF}$ is a Candidate Key!\n   - Try $(CEF)^+$: $(CEF)^+ = \\{C, E, F\\}$ (Cannot generate $A, B, D$).\n- **Final Candidate Keys:** $\\{ AEF, BEF, DEF \\}$.\n- **Prime Attributes:** $\\{ A, B, D, E, F \\}$.\n- **Non-Prime Attributes:** $\\{ C \\}$.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Super Key Test:** $X$ is a super key $\\iff X^+ = R$.\n- **Candidate Key Test:** $X^+ = R$ AND for all proper subsets $Y \\subset X$, $Y^+ \\ne R$.\n- **Prime vs Non-Prime:** Prime attributes belong to at least one candidate key.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Attribute+Closure+and+Candidate+Keys+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Functional dependencies and Armstrong's axioms",
        "Super keys and candidate keys definitions"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Attribute Closure and Key Determination",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Finding Attribute Closure and Candidate Keys",
          "url": "https://www.geeksforgeeks.org/finding-attribute-closure-and-candidate-keys-using-functional-dependencies/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Attribute Closure and Minimal Cover Guide",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "normalization",
      "slug": "database-normalization",
      "title": "Normalization: 1NF, 2NF, 3NF, BCNF",
      "description": "Functional dependencies, eliminating insertion/deletion/update anomalies.",
      "estimatedMinutes": 16,
      "notesMarkdown": "# Database Normalization: 1NF, 2NF, 3NF, and BCNF\n\nDatabase Normalization is the systematic process of organizing relation schemas to minimize data redundancy and eliminate **Insertion, Update, and Deletion Anomalies** while preserving data dependencies and information integrity.\n\n---\n\n## 1. Database Anomalies in Unnormalized Tables\n\nConsider an unnormalized table `EmpDept(EmpId, EmpName, DeptId, DeptName)`:\n1. **Insertion Anomaly:** Cannot insert a newly created department unless at least one employee is assigned to it (if `EmpId` is part of primary key).\n2. **Deletion Anomaly:** Deleting the sole employee in a department inadvertently deletes the department itself from the database!\n3. **Update Anomaly:** If a department name changes, updating it in some rows but missing others leaves the database in an inconsistent state.\n\n---\n\n## 2. Normal Forms Hierarchy and Criteria\n\n```\n                        +-------------------------------+\n                        |             1NF               |\n                        | (Atomic Attribute Values)     |\n                        |   +-----------------------+   |\n                        |   |          2NF          |   |\n                        |   | (No Partial FDs)      |   |\n                        |   |   +---------------+   |   |\n                        |   |   |      3NF      |   |   |\n                        |   |   | (No Transitive|   |   |\n                        |   |   |  Dependencies)|   |   |\n                        |   |   |   +-------+   |   |   |\n                        |   |   |   | BCNF  |   |   |   |\n                        |   |   |   +-------+   |   |   |\n                        |   |   +---------------+   |   |\n                        |   +-----------------------+   |\n                        +-------------------------------+\n```\n\n### 1. First Normal Form (1NF)\n- Every column must contain only **atomic (indivisible) values**.\n- No multivalued attributes or repeating groups (e.g., storing comma-separated phones `\"123, 456\"` violates 1NF).\n\n### 2. Second Normal Form (2NF)\n- Must be in **1NF**.\n- **No Partial Dependency:** No non-prime attribute may depend on a proper subset of any candidate key:\n$$\\text{If } X \\to Y \\text{ and } Y \\text{ is non-prime} \\implies X \\text{ cannot be a proper subset of a Candidate Key}$$\n*(Note: If every candidate key is a single attribute, the relation is automatically in 2NF!)*\n\n### 3. Third Normal Form (3NF)\n- Must be in **2NF**.\n- **No Transitive Dependency:** For every non-trivial functional dependency $X \\to Y$:\n  1. $X$ is a **Super Key**, OR\n  2. $Y$ is a **Prime Attribute** (part of a candidate key).\n\n### 4. Boyce-Codd Normal Form (BCNF)\n- Stricter version of 3NF.\n- For every non-trivial functional dependency $X \\to Y$:\n  - **$X$ MUST be a Super Key.**\n- BCNF completely eliminates all redundancy arising from functional dependencies.\n\n---\n\n## 3. Comparison: 3NF vs BCNF Trade-Off\n\n| Property | Third Normal Form (3NF) | Boyce-Codd Normal Form (BCNF) |\n| :--- | :--- | :--- |\n| **FD Condition** | $X$ is Superkey OR $Y$ is Prime | $X$ MUST be Superkey |\n| **Lossless Join Guarantee** | **Always Achievable** | **Always Achievable** |\n| **Dependency Preservation** | **Always Achievable** | **Not always possible!** |\n| **Redundancy** | Allows minor redundancy if $Y$ is prime | Zero functional redundancy |\n\n*Crucial Theorem:* A 3NF decomposition can **always guarantee both lossless join AND dependency preservation**. A BCNF decomposition guarantees lossless join, but can sometimes lose dependency preservation!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **1NF:** Atomic attribute domains.\n- **2NF:** In 1NF $\\land$ No $\\text{Proper Subset of CK} \\to \\text{Non-Prime}$.\n- **3NF:** In 2NF $\\land$ For every $X \\to Y$, ($X$ is Super Key $\\lor$ $Y$ is Prime).\n- **BCNF:** For every $X \\to Y$, ($X$ is Super Key).\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Normalization+1NF+2NF+3NF+BCNF+DBMS+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Functional dependencies and attribute closure",
        "Candidate keys and prime attributes"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Database Normalization (1NF to BCNF)",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Database Normalization (1NF, 2NF, 3NF, BCNF)",
          "url": "https://www.geeksforgeeks.org/introduction-of-database-normalization/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Database Normalization and Normal Forms Guide",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Lossless-Join Decomposition & The Chase Algorithm\n\nIn relational database design, schema decomposition breaks down a wide relation $R$ into smaller relations $R_1, R_2, \\dots, R_k$ to eliminate redundancy while guaranteeing that no information is lost when reconstructing the original table.\n\n---\n\n## 1. Formal Definition: Lossless vs. Lossy\n\nA decomposition $D = \\{R_1, R_2, \\dots, R_k\\}$ of relation schema $R$ is **Lossless (Non-Additive Join)** with respect to a set of functional dependencies $F$ if and only if for every legal relation instance $r(R)$:\n$$\\pi_{R_1}(r) \\bowtie \\pi_{R_2}(r) \\bowtie \\dots \\bowtie \\pi_{R_k}(r) = r$$\n\n### Why \"Lossy\" Decomposition is Dangerous:\n- If $\\pi_{R_1}(r) \\bowtie \\pi_{R_2}(r) \\supset r$, the natural join generates **spurious (phantom) tuples** that were never present in the original database instance.\n- Information has been corrupted because the database cannot distinguish between genuine facts and spurious combinations created by the join.\n\n---\n\n## 2. Necessary and Sufficient Condition for Binary Decomposition\n\nWhen decomposing $R$ into exactly two sub-relations $R_1$ and $R_2$, the decomposition is lossless if and only if the intersection of their attributes $(R_1 \\cap R_2)$ functionally determines at least one of the relations under $F^+$:\n\n$$(R_1 \\cap R_2) \\to R_1 \\quad \\text{OR} \\quad (R_1 \\cap R_2) \\to R_2$$\n\nEquivalently, using set difference:\n$$(R_1 \\cap R_2) \\to (R_1 - R_2) \\quad \\text{OR} \\quad (R_1 \\cap R_2) \\to (R_2 - R_1)$$\n\n> **Core Rule:** The common attribute set must form a **Super Key** of either $R_1$ or $R_2$ (or both).\n\n---\n\n## 3. General Multi-Relation Lossless Test: The Chase Algorithm\n\nWhen $R$ is decomposed into $k \\ge 3$ relations, binary conditions cannot be chained safely. The standard method is the **Chase Test (Tableau Method)**:\n\n1. Construct a tableau matrix with $k$ rows (one per sub-relation $R_i$) and $n$ columns (one per attribute of $R$).\n2. Fill cell $(i, j)$:\n   - If attribute $A_j \\in R_i$, set cell to $a_j$ (unsubscripted symbol).\n   - If attribute $A_j \\notin R_i$, set cell to $b_{ij}$ (subscripted symbol).\n3. For each functional dependency $X \\to Y \\in F$:\n   - Look for rows that match on all attributes in $X$.\n   - Equate their values in the $Y$ attributes: if any row has $a_j$, change all matching rows to $a_j$; otherwise set them to the same $b$-symbol.\n4. **Termination Criterion:**\n   - If any single row becomes entirely composed of $a$-symbols $(a_1, a_2, \\dots, a_n)$, the decomposition is **provably Lossless**.\n   - If no more modifications can be made and no row is entirely $a$-symbols, the decomposition is **Lossy**.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Lossless+Decomposition+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Functional Dependencies",
        "Relational Schemas"
      ],
      "externalResources": [
        {
          "title": "Lossless Join Decomposition Testing — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/lossless-join-decomposition-in-dbms/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Dependency Preservation in Relational Schema Decomposition\n\nDependency preservation is a vital quality metric in relational database normalization alongside lossless join decomposition. It ensures that data integrity constraints can be enforced efficiently without costly multi-table join operations.\n\n---\n\n## 1. Formal Definition: Projection of Functional Dependencies\n\nLet $R$ be a relation schema decomposed into $D = \\{R_1, R_2, \\dots, R_k\\}$ under a set of functional dependencies $F$.\n- The **projection of $F$ on $R_i$**, denoted $\\pi_{R_i}(F)$, is the set of all dependencies $X \\to Y \\in F^+$ such that all attributes of $X \\cup Y$ belong exclusively to $R_i$:\n  $$\\pi_{R_i}(F) = \\{X \\to Y \\mid X \\cup Y \\subseteq R_i \\text{ and } F \\models X \\to Y\\}$$\n- The decomposition $D$ is **Dependency Preserving** if and only if the union of these projections logically implies every dependency in the original set $F$:\n  $$F \\equiv \\left(\\bigcup_{i=1}^k \\pi_{R_i}(F)\\right) \\implies \\left(\\bigcup_{i=1}^k \\pi_{R_i}(F)\\right)^+ = F^+\n\n---\n\n## 2. Why Dependency Preservation Matters in Production Databases\n\n1. **Local Integrity Enforcement:** If an FD $X \\to Y$ is preserved within relation $R_i$, every `INSERT` or `UPDATE` operation on $R_i$ can verify that $X \\to Y$ holds simply by performing a single-table index lookup (e.g. checking uniqueness on $X$).\n2. **Preventing Join Overhead:** If an FD $X \\to Y$ is **not preserved**, verifying whether a new tuple violates $X \\to Y$ requires executing a database join across multiple relations ($\\bowtie R_i$), turning a lightweight $O(1)$ write into an expensive multi-table scan.\n\n---\n\n## 3. Polynomial Algorithm to Test Dependency Preservation\n\nRather than computing the exponential closure $F^+$, test each individual dependency $X \\to Y \\in F$ using attribute closure:\n1. Initialize $Z = X$.\n2. Repeatedly expand $Z$: For each sub-relation $R_i$, compute $(Z \\cap R_i)^+$ under $F$ and update:\n   $$Z \\leftarrow Z \\cup \\left((Z \\cap R_i)^+ \\cap R_i\\right)$$\n3. Repeat step 2 until $Z$ stabilizes (no new attributes are added).\n4. If $Y \\subseteq Z$, then $X \\to Y$ is preserved. If this holds for all $X \\to Y \\in F$, the decomposition preserves all dependencies.\n\n---\n\n## 4. The 3NF vs. BCNF Trade-Off: A Canonical Counterexample\n\n- **Bernstein's 3NF Synthesis Algorithm:** Provably guarantees **both Lossless Join AND Dependency Preservation** for *any* relational schema and arbitrary FD set.\n- **BCNF Decomposition:** Guarantees Lossless Join and eliminates all redundancy from functional dependencies, but **cannot always preserve dependencies**.\n\n### Canonical Example Where BCNF Cannot Preserve Dependencies:\n- Let $R(A, B, C)$ with $F = \\{AB \\to C, C \\to B\\}$.\n- Candidate Keys: $AB$ and $AC$.\n- Normal Form: $R$ is in 3NF (since in $C \\to B$, $B$ is a prime attribute), but NOT in BCNF (since $C$ is not a superkey).\n- To convert to BCNF, decompose along $C \\to B$:\n  - $R_1(B, C)$ with $C \\to B$ ($C$ is superkey of $R_1$, so $R_1$ is BCNF).\n  - $R_2(A, C)$ with candidate key $AC$ (in BCNF).\n- **Result:** The dependency $AB \\to C$ spans both tables and **cannot be preserved** without a join! Thus, the database designer must choose between BCNF (zero redundancy) and 3NF (dependency preservation).\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Dependency+Preservation+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Functional Dependency Closures",
        "Minimal Cover"
      ],
      "externalResources": [
        {
          "title": "Dependency Preserving Decomposition — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/dependency-preserving-decomposition-in-dbms/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "acid-transactions",
      "slug": "acid-properties-and-transactions",
      "title": "Transactions and ACID Properties",
      "description": "Atomicity (WAL), Consistency, Isolation (Dirty Read, Non-repeatable, Phantom), Durability.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Transactions, ACID Properties, and Transaction State Lifecycle\n\nA **Transaction** is a logical unit of database processing that includes one or more database operations (reading, writing, updating records). To ensure integrity during system failures and concurrent multi-user execution, DBMS engines enforce the foundational **ACID Properties**.\n\n---\n\n## 1. The ACID Properties\n\n1. **Atomicity (\"All or Nothing\"):**\n   Either all operations of the transaction are reflected properly in the database, or none are. If a transaction crashes halfway through, all partial updates are completely undone (rolled back).\n   - *Enforced by:* **Recovery Management Component (Write-Ahead Logging / Undo Logs)**.\n2. **Consistency (Preserving Invariants):**\n   Execution of a transaction in isolation preserves database consistency constraints (e.g., total account balance across bank accounts must remain constant after a transfer).\n   - *Enforced by:* Application programmer logic and DBMS integrity constraints (`CHECK`, foreign keys).\n3. **Isolation (Concurrency Independence):**\n   Even though multiple transactions execute concurrently, the system guarantees that for every pair of transactions $T_i$ and $T_j$, it appears to $T_i$ that $T_j$ either finished before $T_i$ started, or started after $T_i$ finished.\n   - *Enforced by:* **Concurrency Control Component (Locking / 2PL, MVCC, Timestamps)**.\n4. **Durability (Persistence):**\n   After a transaction completes successfully (`COMMIT`), its updates persist permanently in non-volatile storage, even if the system crashes or loses power immediately thereafter.\n   - *Enforced by:* **Recovery Component (Redo Logs / Write-Ahead Logging)**.\n\n---\n\n## 2. Transaction State Transition Machine\n\n```\n              +--------------+\n              |    Active    | <---+ (Initial state: reads/writes)\n              +-------+------+     |\n                      |            |\n                      v            |\n              +--------------+     |\n              |  Partially   |     |\n              |  Committed   |     |\n              +-------+------+     |\n                      |            |\n         +------------+-------+    |\n         |                    |    |\n         v                    v    |\n   +-----------+        +----------+---+\n   | Committed |        |    Failed    |\n   +-----------+        +-------+------+\n                                |\n                                v\n                        +--------------+\n                        |   Aborted    |\n                        +--------------+\n```\n\n1. **Active:** Initial state; transaction executes read and write operations.\n2. **Partially Committed:** Final statement has been executed, but updates are buffered in memory and not yet flushed to non-volatile disk logs.\n3. **Committed:** All log records safely written to disk; transaction successfully completed.\n4. **Failed:** Normal execution cannot proceed (hardware crash, constraint violation, deadlock abort).\n5. **Aborted:** Transaction rolled back and database restored to state prior to transaction start. The transaction may be restarted or killed.\n\n---\n\n## 3. Summary Cheatsheet & Key Formulas\n\n- **A**tomicity $\\leftrightarrow$ Undo Logs / WAL.\n- **C**onsistency $\\leftrightarrow$ Integrity constraints & business logic.\n- **I**solation $\\leftrightarrow$ Concurrency control (2PL, MVCC).\n- **D**urability $\\leftrightarrow$ Redo Logs / Checkpoints.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Transactions+and+ACID+Properties+DBMS+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Relational model and SQL queries",
        "Operating system crash recovery and file systems"
      ],
      "externalResources": [
        {
          "title": "PostgreSQL Documentation: Transactions and Concurrency",
          "url": "https://www.postgresql.org/docs/current/tutorial-transactions.html",
          "provider": "Official Documentation",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: ACID Properties in DBMS",
          "url": "https://www.geeksforgeeks.org/acid-properties-in-dbms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "MIT 6.830: Transactions, Logging, and ARIES",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Conflict and View Serializability and Precedence Graphs\n\nWhen multiple transactions interleave operations concurrently, the resulting execution schedule must be equivalent to some serial schedule (where transactions run one after another) to preserve database consistency.\n\n---\n\n## 1. Conflicting Operations\n\nTwo consecutive operations $I_i$ and $I_j$ in a schedule are said to **conflict** if and only if:\n1. They belong to **different transactions** ($T_i \\ne T_j$).\n2. They access the **exact same data item** ($Q$).\n3. **At least one of the operations is a write operation** (`Write(Q)`).\n\n| Operation 1 | Operation 2 | Conflicting? | Reason |\n| :--- | :--- | :--- | :--- |\n| $R_i(A)$ | $R_j(A)$ | **NO** | Both read; order does not alter state |\n| $R_i(A)$ | $W_j(A)$ | **YES** | Read-Write Conflict (Dirty Read / Unrepeatable Read) |\n| $W_i(A)$ | $R_j(A)$ | **YES** | Write-Read Conflict |\n| $W_i(A)$ | $W_j(A)$ | **YES** | Write-Write Conflict (Lost Update) |\n| $W_i(A)$ | $W_j(B)$ | **NO** | Different data items ($A \\ne B$) |\n\n---\n\n## 2. Conflict Serializability & Precedence Graphs\n\nA schedule $S$ is **Conflict Serializable** if it can be transformed into a serial schedule by a series of non-conflicting operation swaps.\n\n### The Precedence (Serialization) Graph Algorithm:\nConstruct a directed graph $G = (V, E)$:\n- **Vertices ($V$):** Each transaction in the schedule is a vertex ($T_1, T_2, \\dots, T_n$).\n- **Directed Edges ($E$):** Draw an edge $T_i \\to T_j$ if an operation of $T_i$ precedes and conflicts with an operation of $T_j$.\n\n```\nTheorem:\nA schedule is Conflict Serializable IF AND ONLY IF its Precedence Graph has NO DIRECTED CYCLES (is a Directed Acyclic Graph - DAG).\n```\n\nIf acyclic, the equivalent serial order is given by the **Topological Sort** of the precedence graph!\n\n---\n\n## 3. View Serializability\n\nA schedule $S$ is **View Serializable** if it is view equivalent to some serial schedule:\n1. **Initial Read:** If $T_i$ reads the initial value of $A$ in $S$, $T_i$ must read the initial value of $A$ in serial schedule $S'$.\n2. **Updated Read:** If $T_i$ reads a value of $A$ written by $T_j$ in $S$, $T_i$ must read the value written by $T_j$ in $S'$.\n3. **Final Write:** If $T_i$ performs the final write on $A$ in $S$, $T_i$ must perform the final write on $A$ in $S'$.\n\n```\nHierarchy:\nConflict Serializable  ===>  View Serializable  ===>  All Schedules\n         (Sub-set)                  (Super-set)\n```\n- Every Conflict Serializable schedule is View Serializable.\n- If a schedule is View Serializable but NOT Conflict Serializable, it **must contain at least one Blind Write** ($W(A)$ without a prior $R(A)$).\n- Testing View Serializability is **NP-Complete**; testing Conflict Serializability is $O(V + E)$ (polynomial).\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Conflict Condition:** Different transactions $\\land$ Same data item $\\land$ At least one Write.\n- **Conflict Serializability Test:** Run topological sort on Precedence Graph. Acyclic $\\iff$ Serializable.\n- **View Equivalence vs Conflict Equivalence:** View equivalence allows blind writes to mask conflicts.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Conflict+and+View+Serializability+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Transactions and ACID properties",
        "Directed graphs and cycle detection"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Concurrency Control and Serializability",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Conflict Serializability and Precedence Graphs",
          "url": "https://www.geeksforgeeks.org/conflict-serializability-in-dbms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: Serializability and View Equivalence Guide",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Precedence Graphs & Conflict Serializability\n\nA **Precedence Graph (Serialization Graph)** is a directed graph $G = (V, E)$ used to test whether an interleaved concurrent schedule of database transactions is **Conflict Serializable**.\n\n---\n\n## 1. Formal Graph Construction Algorithm\n\nFor an interleaved schedule $S$ containing transactions $T_1, T_2, \\dots, T_n$:\n1. **Vertices ($V$):** Each active/committed transaction $T_i$ forms a distinct vertex in $V$.\n2. **Directed Edges ($E$):** A directed edge $T_i \\to T_j$ ($i \\ne j$) is drawn if and only if $T_i$ performs an operation $O_{i}$ before $T_j$ performs an operation $O_{j}$, both access the **exact same data item $X$**, and at least one of them is a `write(X)`:\n   - **Write-Read Conflict:** $T_i$ writes $X$, then $T_j$ reads $X$ ($W_i(X) < S < R_j(X)$).\n   - **Read-Write Conflict:** $T_i$ reads $X$, then $T_j$ writes $X$ ($R_i(X) < S < W_j(X)$).\n   - **Write-Write Conflict:** $T_i$ writes $X$, then $T_j$ writes $X$ ($W_i(X) < S < W_j(X)$).\n\n*(Note: Read-Read operations $R_i(X) < S < R_j(X)$ do NOT conflict; no edge is drawn).*\n\n---\n\n## 2. Fundamental Serializability Theorem\n\n> **Conflict Serializability Theorem:**  \n> A concurrent schedule $S$ is **conflict serializable** if and only if its precedence graph $G(S)$ contains **NO DIRECTED CYCLES** (i.e., $G(S)$ is a Directed Acyclic Graph, or DAG).\n\n- **Cycle Present ($T_1 \\to T_2 \\to \\dots \\to T_1$):** Impossible to find any equivalent serial execution order. $S$ is non-conflict serializable.\n- **Acyclic DAG:** At least one equivalent serial transaction execution order exists.\n\n---\n\n## 3. Deriving Equivalent Serial Order via Topological Sorting\n\nWhen $G(S)$ is acyclic, any valid **Topological Sort** produces a conflict-equivalent serial schedule:\n- **Kahn's In-Degree Queue Algorithm ($O(V + E)$):**\n  1. Compute in-degree for all vertices.\n  2. Enqueue all vertices with $\\text{in-degree} = 0$.\n  3. While queue is not empty: dequeue $T_k$, append $T_k$ to the serial order, and decrement in-degrees of all outgoing neighbors $T_m$. If $T_m$'s in-degree drops to 0, push to queue.\n- If multiple valid topological orders exist, each represents a distinct equivalent serial schedule that produces identical database states.\n\n---\n\n## 4. Conflict vs. View Serializability & Blind Writes\n\n- **Conflict Serializability $\\implies$ View Serializability:** Every conflict serializable schedule is view serializable, but the converse is not true.\n- **Blind Writes:** A schedule with a directed cycle in its precedence graph may still be view serializable if it contains \"blind writes\" ($W_i(X)$ executed without a preceding $R_i(X)$).\n- **Complexity:** While detecting cycles in a precedence graph runs in linear time $O(V + E)$, testing view serializability for an arbitrary schedule is **NP-Complete**.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Precedence+Graphs+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Conflicting Operations (Read/Write)",
        "Transaction Schedules"
      ],
      "externalResources": [
        {
          "title": "Conflict Serializability and Precedence Graphs — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/conflict-serializability-in-dbms/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "concurrency-2pl",
      "slug": "concurrency-control-and-2pl",
      "title": "Concurrency Control and Locking",
      "description": "Conflict serializability, shared vs exclusive locks, and growing/shrinking phases.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Concurrency Control: Two-Phase Locking (2PL), Strict 2PL, and Rigorous 2PL\n\nConcurrency control protocols ensure that interleaved transactions preserve serializability. The **Two-Phase Locking (2PL)** protocol is the industry-standard pessimistic concurrency control mechanism that guarantees conflict serializability without manual scheduling.\n\n---\n\n## 1. Lock Modes: Shared vs Exclusive\n\n- **Shared Lock ($S$):** Read-only lock. Multiple transactions can hold shared locks on the same item simultaneously.\n- **Exclusive Lock ($X$):** Read and write lock. Only one transaction can hold an exclusive lock on an item; no other transaction can hold $S$ or $X$.\n\n```\nLock Compatibility Matrix:\n                  Requested Lock\nCurrent Lock | Shared (S) | Exclusive (X)\n-------------+------------+---------------\nShared (S)   |    YES     |      NO\nExclusive (X)|    NO      |      NO\n```\n\n---\n\n## 2. The Two-Phase Locking (2PL) Protocol\n\nA transaction complies with 2PL if all lock acquisitions precede all lock releases:\n\n```\nNumber of Locks Held\n     ^\n     |         Lock Point (Peak)\n     |               /---\\\\\n     |   Growing    /     \\\\   Shrinking\n     |    Phase    /       \\\\    Phase\n     |            /         \\\\\n     |           /           \\\\\n   0 +----------+-------------+---------> Time\n```\n\n1. **Growing (Expanding) Phase:** Transaction may acquire new locks or upgrade ($S \\to X$). **No locks may be released.**\n2. **Shrinking (Contracting) Phase:** Transaction may release locks or downgrade ($X \\to S$). **No new locks may be acquired.**\n- **Lock Point:** The exact instant when the transaction acquires its final lock. The serialization order of transactions in basic 2PL corresponds precisely to the order of their Lock Points.\n\n---\n\n## 3. Variations of 2PL: Strict and Rigorous\n\nWhile Basic 2PL guarantees conflict serializability, it is susceptible to **Cascading Aborts** (if $T_1$ releases an exclusive lock early and then aborts, $T_2$ read dirty uncommitted data and must also abort).\n\n```\n+-----------------------------------------------------------+\n|                        BASIC 2PL                          |\n| - Guarantees Conflict Serializability.                    |\n| - Vulnerable to Cascading Aborts and Deadlocks.           |\n+-----------------------------------------------------------+\n|                       STRICT 2PL                          |\n| - Holds ALL Exclusive (X) locks until COMMIT or ABORT!    |\n| - Guarantees Cascadeless Recoverability (ACID standard).  |\n+-----------------------------------------------------------+\n|                      RIGOROUS 2PL                         |\n| - Holds ALL Shared (S) AND Exclusive (X) locks until end! |\n| - Transactions serialize strictly in order of commitment. |\n+-----------------------------------------------------------+\n```\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **2PL Rule:** Once you unlock any item, you can NEVER lock anything again!\n- **2PL Guarantees:** Conflict Serializability $\\implies$ View Serializability.\n- **2PL Does NOT Guarantee:** Deadlock freedom (2PL transactions can still deadlock!).\n- **Strict 2PL:** Release Exclusive locks only at Commit/Abort $\\implies$ Zero cascading rollbacks.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Concurrency+Control+Locking+2PL+DBMS+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Conflict serializability and transactions",
        "Operating system locks and race conditions"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Two-Phase Locking (2PL) and Strict 2PL",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Two Phase Locking Protocol (2PL)",
          "url": "https://www.geeksforgeeks.org/two-phase-locking-protocol/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "PostgreSQL Documentation: Explicit Locking",
          "url": "https://www.postgresql.org/docs/current/explicit-locking.html",
          "provider": "Official Documentation",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Deadlocks in Databases: Detection, Prevention, and Recovery\n\nBecause transactions lock database records dynamically based on user transactions, circular wait conditions can develop where transaction $T_1$ holds a lock on item $A$ and waits for item $B$ held by $T_2$, which in turn is waiting for item $A$.\n\n---\n\n## 1. Deadlock Detection via Wait-For Graphs (WFG)\n\nA **Wait-For Graph (WFG)** is a directed graph where:\n- Nodes represent active Transactions.\n- A directed edge $T_i \\to T_j$ indicates that transaction $T_i$ is blocked waiting for a lock currently held by $T_j$.\n\n```\n     +--------+      waits for Lock A      +--------+\n     |   T1   | -------------------------> |   T2   |\n     +--------+                            +--------+\n         ^                                     |\n         |         waits for Lock B            |\n         +-------------------------------------+\n              [ DIRECTED CYCLE = DEADLOCK! ]\n```\n\nThe database background lock manager runs a periodic cycle-detection algorithm (e.g., Tarjan's or Kosaraju's DFS). If a directed cycle is detected, a deadlock exists!\n\n---\n\n## 2. Deadlock Prevention via Timestamps\n\nInstead of waiting for deadlocks to occur, database engines can use transaction start timestamps $TS(T)$ to prevent cycles at lock request time. Let $T_{\\text{old}}$ have a smaller timestamp (older) and $T_{\\text{new}}$ have a larger timestamp (younger):\n\n### 1. Wait-Die Scheme (Non-preemptive)\n- If older requests lock held by younger: $T_{\\text{old}}$ is allowed to **WAIT**.\n- If younger requests lock held by older: $T_{\\text{new}}$ is killed and rolled back (**DIES**).\n- Mnemonic: *\"Older can wait; younger dies immediately.\"*\n\n### 2. Wound-Wait Scheme (Preemptive)\n- If older requests lock held by younger: $T_{\\text{old}}$ preempts and rolls back the younger (**WOUNDS** $T_{\\text{young}}$).\n- If younger requests lock held by older: $T_{\\text{young}}$ is allowed to **WAIT**.\n- Mnemonic: *\"Older wounds younger; younger waits.\"*\n\n*Advantage:* Both schemes guarantee **Deadlock Freedom** because wait edges can only point in one chronological direction, eliminating circular dependencies. Furthermore, aborted transactions retain their original timestamps upon restart, preventing starvation!\n\n---\n\n## 3. Deadlock Recovery: Victim Selection\n\nWhen a deadlock is detected via WFG:\n1. **Victim Selection:** Choose a transaction to abort based on minimal rollback cost (fewest locks held, fewest updates performed, least elapsed CPU time).\n2. **Rollback:** Roll back the victim transaction to its starting point or a savepoint.\n3. **Starvation Prevention:** Ensure the same transaction is not repeatedly selected as the victim by tracking retry count.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Wait-For Graph Theorem:** Directed cycle in WFG $\\iff$ Deadlock.\n- **Wait-Die:** Old waits, Young dies.\n- **Wound-Wait:** Old wounds (preempts), Young waits.\n- **Starvation Avoidance:** Retain original timestamp upon transaction restart.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Deadlocks+in+Databases+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Two-phase locking and concurrency control",
        "Operating system deadlock fundamentals"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Concurrency Control and Deadlock Handling",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Deadlock Handling in DBMS",
          "url": "https://www.geeksforgeeks.org/deadlock-in-dbms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "PostgreSQL Documentation: Deadlocks and Lock Monitoring",
          "url": "https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-DEADLOCKS",
          "provider": "Official Documentation",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
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
      "notesMarkdown": "# Database Recovery Techniques: Write-Ahead Logging (WAL), Checkpoints, and ARIES\n\nA database engine must guarantee Atomicity and Durability despite sudden power failures, operating system kernel panics, or application crashes. Recovery systems ensure that committed transactions survive crashes and uncommitted transactions leave zero trace.\n\n---\n\n## 1. Write-Ahead Logging (WAL) Protocol\n\nIn high-performance databases, writing modified data pages directly to random disk sectors on every transaction is prohibitively slow. Instead, pages are modified in volatile RAM buffer pools (dirty pages).\n\nTo ensure durability before flushing dirty pages, the DBMS enforces the **Write-Ahead Logging (WAL) Protocol**:\n1. **The WAL Invariant:** The log record describing a change must be written to non-volatile disk storage **BEFORE the corresponding data page is written to disk**.\n2. **Commit Invariant:** All log records for a transaction must be flushed to non-volatile disk **BEFORE the transaction is acknowledged as committed** (`COMMIT`).\n\n```\nRAM Buffer Pool (Dirty Pages) --------> Disk Data Files (Random I/O)\n               ^                                   ^\n               | Must write log FIRST!             |\n               v                                   |\nWAL Log Buffer (Sequential I/O) ------> Disk WAL Log (Append-Only)\n```\n\n---\n\n## 2. Checkpointing Mechanics\n\nWithout checkpoints, a crash would require scanning the entire transaction log from the beginning of time.\n- **Checkpoint:** Periodically, the DBMS flushes all dirty buffer pool pages to disk, writes a `[CHECKPOINT, {Active_Transactions}]` record to the WAL, and flushes the log.\n- **Recovery Benefit:** During crash recovery, the recovery manager only needs to scan backwards to the most recent checkpoint!\n\n---\n\n## 3. The ARIES Recovery Algorithm (C. Mohan)\n\nThe gold standard recovery algorithm utilized by IBM DB2, PostgreSQL, Microsoft SQL Server, and SQLite is **ARIES (Algorithm for Recovery and Isolation Exploiting Semantics)**.\n\n```\n       Crash Occurs!\n             |\n             v\n   +--------------------+\n   | 1. ANALYSIS PASS   |  Scan log forward from checkpoint:\n   |                    |  Reconstruct Dirty Page Table & Active Transactions.\n   +---------+----------+\n             |\n             v\n   +---------+----------+\n   | 2. REDO PASS       |  \"Repeating History\":\n   |                    |  Reapply ALL changes (committed & uncommitted) forward.\n   +---------+----------+\n             |\n             v\n   +---------+----------+\n   | 3. UNDO PASS       |  Scan backward:\n   |                    |  Roll back all active/uncommitted \"loser\" transactions!\n   +--------------------+\n```\n\n1. **Analysis Pass:** Determines the state of the system at crash time; identifies all dirty pages and active uncommitted transactions (\"loser transactions\").\n2. **Redo Pass (\"Repeat History\"):** Scans forward from the oldest unwritten page LSN (Log Sequence Number) and reapplies all logged updates (even for transactions that eventually aborted) to restore the exact pre-crash state.\n3. **Undo Pass:** Scans backward to undo the updates of all transactions that were active at crash time, writing Compensation Log Records (CLRs) to guarantee idempotence if the system crashes again during recovery.\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **WAL Golden Rule:** Log must hit disk BEFORE dirty data hits disk.\n- **Commit Rule:** Log flushes sequentially before `COMMIT` returns success.\n- **ARIES Three Passes:** Analysis $\\to$ Redo (repeats history) $\\to$ Undo (rolls back losers).\n- **Idempotence:** Recovery algorithms can crash and restart indefinitely without corrupting state.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Recovery+Techniques+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "ACID transactions and logging",
        "Operating system virtual memory and disk caching"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Crash Recovery and ARIES Algorithm",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: Recovery Techniques in DBMS",
          "url": "https://www.geeksforgeeks.org/recovery-techniques-in-dbms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "PostgreSQL Documentation: Write-Ahead Logging (WAL)",
          "url": "https://www.postgresql.org/docs/current/wal-intro.html",
          "provider": "Official Documentation",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "indexing-btree",
      "slug": "indexing-and-btree",
      "title": "Indexing, B-Trees, and B+ Trees",
      "description": "Clustered vs Non-Clustered index, leaf node linked lists, composite indexing, and index scans.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# Indexing, B-Trees, and B+ Trees in Relational Databases\n\nAn **Index** is an auxiliary data structure that enables the database engine to locate target records in $O(\\log N)$ or $O(1)$ I/O operations without performing an expensive Full Table Scan ($O(N)$ linear disk scan).\n\n---\n\n## 1. Index Classifications: Dense vs Sparse, Primary vs Secondary\n\n| Type | Definition | Data File Organization |\n| :--- | :--- | :--- |\n| **Dense Index** | An index record appears for **every single search key value** in the data file | Unordered or Ordered |\n| **Sparse Index** | An index record appears for only some search key values (typically one per disk block) | **Must be Ordered (Clustered)** |\n| **Primary (Clustered) Index**| Built on the ordered primary key field; physically orders the table rows on disk | Only **ONE** per table |\n| **Secondary (Non-Clustered)**| Built on any non-ordering candidate key or attribute; contains pointers to table rows | Multiple allowed per table |\n\n---\n\n## 2. Why B+ Trees Dominate Database Engines\n\nStandard balanced binary search trees (AVL, Red-Black) have a fanout of 2, requiring $\\log_2 N$ pointer dereferences. On secondary storage, each pointer dereference is an expensive disk block read.\n\nA **B+ Tree** is a self-balancing, multi-way search tree with a massive branching factor (fanout typically 100 to 500), designed so that each tree node fits precisely into a single disk page (e.g., 4KB or 8KB).\n\n```\n                      [ Root: 50 | 100 ]\n                     /        |        \\\n                    /         |         \\\n         [ 20 | 35 ]     [ 65 | 80 ]     [ 120 | 150 ]  <-- Internal Nodes (Keys only)\n           /   |   \\       /   |   \\       /    |    \\\n          v    v    v     v    v    v     v     v     v\n        [10]->[20]->[35]->[50]->[65]->[80]->[100]->[120]->[150]  <-- Leaf Nodes\n        ======================================================\n        Leaf nodes contain ACTUAL DATA POINTERS and form a\n        DOUBLY-LINKED LIST for blazing-fast RANGE QUERIES!\n```\n\n### B-Tree vs B+ Tree: The Decisive Differences\n1. **Data Record Pointers:**\n   - In a **B-Tree**, data pointers are stored in both internal nodes and leaf nodes.\n   - In a **B+ Tree**, data pointers are stored **ONLY in leaf nodes**. Internal nodes store only navigation search keys.\n   - *Result:* B+ Tree internal nodes hold vastly more keys, resulting in **higher fanout and a much shorter tree** (height 3 can index billions of rows!).\n2. **Range Queries:**\n   - In a B-Tree, range queries require expensive in-order tree traversals across multiple disk levels.\n   - In a B+ Tree, leaf nodes are connected via a **doubly linked list**. Finding records in range `[50, 150]` requires one $O(\\log N)$ search to the start leaf, followed by a fast linear scan along the leaf list!\n\n---\n\n## 3. B+ Tree Node Capacity and Order Calculations\n\nLet:\n- Block Size $= B$ bytes.\n- Key Size $= K$ bytes.\n- Block Pointer Size $= P$ bytes.\n- Record Pointer Size $= R$ bytes.\n\n### Order $p$ of Internal Node:\nAn internal node holds at most $p$ block pointers and $p - 1$ search keys:\n$$p \\cdot P + (p - 1) \\cdot K \\le B \\implies p \\le \\frac{B + K}{P + K}$$\n\n### Numerical Example:\nIf Block Size $B = 4096\\text{ bytes}$, Search Key $K = 16\\text{ bytes}$, and Pointer $P = 8\\text{ bytes}$:\n$$p \\le \\frac{4096 + 16}{8 + 16} = \\frac{4112}{24} = 171.33 \\implies \\mathbf{p = 171}$$\nWith a fanout of 171, a 3-level B+ tree indexes up to $171^3 \\approx \\mathbf{5,000,000\\text{ blocks}}$ with only **3 disk reads**!\n\n---\n\n## 4. Summary Cheatsheet & Key Formulas\n\n- **Internal Node Capacity:** $p \\cdot P + (p - 1) \\cdot K \\le B$.\n- **Leaf Node Capacity:** $p_{\\text{leaf}} \\cdot (K + R) + P \\le B$.\n- **Search Cost:** $O(H)$ where height $H \\approx \\lceil \\log_{\\text{fanout}}(N) \\rceil$ (typically 3 to 4 in production).\n- **B+ Tree Superiority:** High fanout $\\implies$ minimal I/O $\\implies$ contiguous leaf range scans.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Indexing+B-Trees+B%2B+Trees+DBMS+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Binary search trees and balanced tree fundamentals",
        "Disk storage blocks and secondary memory geometry"
      ],
      "externalResources": [
        {
          "title": "MIT 6.830: Database Indexing, B-Trees, and Access Methods",
          "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "PostgreSQL Documentation: B-Tree Indexes",
          "url": "https://www.postgresql.org/docs/current/btree.html",
          "provider": "Official Documentation",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: B-Tree and B+ Tree in DBMS",
          "url": "https://www.geeksforgeeks.org/b-tree-in-dbms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "nosql-cap",
      "slug": "nosql-and-cap-theorem",
      "title": "CAP Theorem, BASE Model & NoSQL Paradigms",
      "description": "Consistency vs Availability vs Partition tolerance, Document, Key-Value, and Columnar stores.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# The CAP Theorem, PACELC, BASE Model, and NoSQL Paradigms\n\nAs web applications scaled to hundreds of millions of users, traditional monolithic relational databases struggled with horizontal write scaling. Distributed NoSQL databases emerged, trading strict ACID guarantees for horizontal partitioning and high availability.\n\n---\n\n## 1. Eric Brewer's CAP Theorem\n\nIn any distributed data store, you can achieve at most **two out of the three** guarantees simultaneously:\n\n```\n                          Consistency (C)\n                             /       \\\\\n                            /         \\\\\n                           /   CA      \\\\\n                          /  (RDBMS)    \\\\\n                         /               \\\\\n            Availability (A) ----------- Partition Tolerance (P)\n                   \\\\         AP         CP         /\n                    \\\\    (DynamoDB,   (HBase,    /\n                     \\\\    Cassandra)  MongoDB)  /\n```\n\n1. **Consistency (Linearizability):** Every read receives the most recent write or an error. All nodes see the exact same data at the same instant.\n2. **Availability:** Every non-failing node returns a non-error response for every request (no guarantee it contains the most recent write).\n3. **Partition Tolerance:** The system continues to operate despite an arbitrary number of dropped or delayed network messages between nodes.\n\n### The Realistic Choice: CP vs AP\nIn physical networks, **network partitions ($P$) are inevitable** (cables fail, routers drop packets). Therefore, a distributed system must choose between:\n- **CP (Consistency / Partition Tolerance):** When a network partition occurs, reject writes or block reads to prevent divergent state (e.g., MongoDB, HBase, Spanner).\n- **AP (Availability / Partition Tolerance):** Accept writes and reads on both sides of the partition; reconcile divergent state later via eventual consistency (e.g., Cassandra, Amazon DynamoDB, CouchDB).\n\n---\n\n## 2. PACELC Theorem (Daniel Abadi)\n\nExtends CAP by considering normal operations when there is **NO** partition:\n$$\\text{If } \\mathbf{P} \\text{ (Partition)}, \\quad \\text{choose } \\mathbf{A} \\lor \\mathbf{C}; \\quad \\mathbf{E} \\text{lse}, \\quad \\text{choose } \\mathbf{L} \\text{atency} \\lor \\mathbf{C} \\text{onsistency}$$\n- *Example:* MongoDB is **PC/EC** (consistent under partition, low latency over consistency when normal).\n- *Example:* Spanner is **PC/EC** (consistent in both).\n\n---\n\n## 3. ACID vs BASE Model\n\n| ACID (Relational Databases) | BASE (Distributed NoSQL) |\n| :--- | :--- |\n| **Atomicity** (All or nothing) | **Basically Available** (System remains operational despite node failures) |\n| **Consistency** (Strict invariants) | **Soft State** (Data state may drift without user interaction) |\n| **Isolation** (Serializability) | **Eventual Consistency** (Nodes converge to consistent state over time) |\n| **Durability** (Committed data safe)| Focuses on horizontal write throughput and low latency |\n\n---\n\n## 4. The Four NoSQL Architectural Paradigms\n\n1. **Key-Value Stores (Redis, Memcached, AWS DynamoDB):**\n   - Simple $O(1)$ lookups via hash table key.\n   - Best for: Session caches, leaderboard state, shopping carts.\n2. **Document Databases (MongoDB, Couchbase):**\n   - Stores flexible, semi-structured JSON/BSON documents.\n   - Best for: Content management systems, e-commerce product catalogs.\n3. **Wide-Column Stores (Apache Cassandra, ScyllaDB, HBase):**\n   - Two-dimensional keyspace (row key $\\times$ column key) optimized for write throughput and append-only time-series data.\n   - Best for: IoT sensor metrics, logging, high-volume analytics.\n4. **Graph Databases (Neo4j, AWS Neptune):**\n   - Uses nodes, edges, and properties for index-free adjacency graph traversals.\n   - Best for: Social networks, fraud detection, recommendation engines.\n\n---\n\n## 5. Summary Cheatsheet & Key Formulas\n\n- **CAP Trade-Off:** Network partition ($P$) forces a choice between Consistency ($C$) and Availability ($A$).\n- **BASE Philosophy:** Basically Available, Soft state, Eventual consistency.\n- **NoSQL Categories:** Key-Value, Document, Columnar, Graph.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=CAP+Theorem+BASE+NoSQL+DBMS+DBMS+Database+Management+Systems+GATE+lecture",
      "prerequisites": [
        "Relational database architecture and ACID transactions",
        "Distributed systems and network partitioning"
      ],
      "externalResources": [
        {
          "title": "MIT 6.824: Distributed Systems - CAP and Consistency Models",
          "url": "https://ocw.mit.edu/courses/6-824-distributed-computer-systems-engineering-spring-2006/",
          "provider": "MIT OpenCourseWare",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "GeeksforGeeks: CAP Theorem in Distributed Systems",
          "url": "https://www.geeksforgeeks.org/the-cap-theorem-in-dbms/",
          "provider": "GeeksforGeeks",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "InterviewBit: NoSQL Databases and CAP Theorem Guide",
          "url": "https://www.interviewbit.com/dbms-interview-questions/",
          "provider": "InterviewBit",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    }
  ]
};
