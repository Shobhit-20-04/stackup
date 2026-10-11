import json
import urllib.parse

def make_yt_url(title, subject="DBMS Database Management Systems GATE"):
    q = f"{title} {subject} lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(q)}"

with open("scripts/existing_curriculum.json", encoding="utf-8") as f:
    existing = json.load(f)

existing_dbms_topics = {}
for cat in existing["core-cs"]["categories"]:
    if cat["id"] == "dbms":
        for t in cat["topics"]:
            existing_dbms_topics[t["id"]] = t

new_dbms_topics = [
    {
        "id": "dbms-architecture",
        "slug": "database-architecture",
        "title": "Database Architecture",
        "description": "ANSI-SPARC 3-schema architecture (Internal, Conceptual, External levels), physical and logical data independence, and DBMS components.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Oracle", "Microsoft", "Amazon", "SAP"],
        "keyTakeaways": [
            "3-Schema Architecture: External (View), Conceptual (Logical), and Internal (Physical) levels.",
            "Logical Data Independence: Capacity to alter conceptual schema without altering external views.",
            "Physical Data Independence: Capacity to alter internal schema (indexing, storage layout) without altering conceptual schema."
        ],
        "notesMarkdown": """# Database Architecture & ANSI-SPARC

---

## 1. The 3-Level ANSI-SPARC Architecture
1. **External Level (View Level):** What individual users or applications see. Multiple tailored views can exist over the same database.
2. **Conceptual Level (Logical Level):** Describes *what* data is stored in the entire database and relationships among data (tables, entities, constraints).
3. **Internal Level (Physical Level):** Describes *how* data is stored physically on disk (record formats, B-trees, hashing, compression, block layouts).

---

## 2. Data Independence
- **Logical Data Independence:** Modifying the conceptual schema (e.g., adding a new attribute or table) does not require changing external schemas or existing application code.
- **Physical Data Independence:** Modifying internal storage structures (e.g., changing file organization from heap to B+ tree) does not affect the conceptual or external schema.
""",
        "questions": [
            {
                "id": "dbms-arch-1",
                "question": "Which level of the 3-schema architecture defines the physical storage structures and file access paths on disk?",
                "options": ["External level", "Conceptual level", "Internal level", "Application level"],
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
        "companyTags": ["Amazon", "TCS Digital", "Infosys", "Cognizant"],
        "keyTakeaways": [
            "Entity Sets: Rectangles. Weak entities: Double rectangles.",
            "Attributes: Ellipses. Key: Underlined. Multi-valued: Double ellipse. Derived: Dashed ellipse.",
            "Relationships: Diamonds. Total participation: Double line.",
            "Converting to relational schema: 1:N relationship merges foreign key into the N-side table."
        ],
        "notesMarkdown": """# ER Model & Conceptual Design

---

## 1. ER Notations
- **Entity:** Object distinguishable from others (Rectangle).
- **Weak Entity:** Lacks primary key on its own; identified via discriminator + identifying relationship with strong entity (Double rectangle).
- **Attributes:**
  - Simple vs. Composite (`Address` = `Street` + `City` + `Pincode`).
  - Single-valued vs. Multi-valued (`PhoneNumbers` in double ellipse).
  - Stored vs. Derived (`Age` derived from `DOB`, dashed ellipse).

---

## 2. Converting ER to Tables
- **1 : N Relationship:** Place Primary Key of 1-side as Foreign Key in $N$-side table. No separate table required!
- **M : N Relationship:** Requires a separate junction table containing Primary Keys of both participating entity sets.
- **Multi-valued Attribute:** Requires separate table with (Entity PK, Attribute Value).
""",
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
                "options": ["Double ellipse", "Dashed ellipse", "Underlined ellipse", "Diamond"],
                "correct_option": 1,
                "explanation": "Derived attributes (like Age derived from Date of Birth) are represented by dashed/dotted ellipses."
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
        "companyTags": ["Microsoft", "Oracle", "IBM", "Accenture"],
        "keyTakeaways": [
            "Relation: Mathematical set of tuples (rows); no duplicate tuples exist.",
            "Degree (Arity): Number of attributes (columns) in relation.",
            "Cardinality: Total number of tuples (rows) in relation.",
            "Domain: Set of atomic allowable values for an attribute."
        ],
        "notesMarkdown": """# The Relational Model

---

## 1. Relational Terminology
- **Relation:** A 2-dimensional table of values.
- **Tuple:** A row in a relation representing an entity instance.
- **Attribute:** A named column in a relation.
- **Degree:** Number of attributes (columns).
- **Cardinality:** Number of tuples (rows).

---

## 2. Relational Properties
1. Tuples have no defined order (set semantics).
2. Attributes have no defined order.
3. Every attribute value must be atomic (First Normal Form requirement).
4. No two tuples can be identical (enforced by Candidate/Primary Key).
""",
        "questions": [
            {
                "id": "dbms-rm-1",
                "question": "If a relation has 5 columns and 200 rows, what are its Degree and Cardinality respectively?",
                "options": ["Degree = 200, Cardinality = 5", "Degree = 5, Cardinality = 200", "Degree = 1000, Cardinality = 200", "Degree = 5, Cardinality = 1000"],
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
        "companyTags": ["Google", "Microsoft", "Oracle", "Amazon"],
        "keyTakeaways": [
            "Fundamental operators: Select (sigma), Project (pi), Union (U), Set Difference (-), Cartesian Product (X), Rename (rho).",
            "Natural Join: Cartesian product followed by selection on common attributes and projection.",
            "Division (R / S): Finds tuples in R that match ALL tuples in S (e.g. students who took ALL prerequisite courses).",
            "Relational Completeness: A query language is relationally complete if it can express any query expressible in basic Relational Algebra."
        ],
        "notesMarkdown": """# Relational Algebra & Calculus

---

## 1. 6 Basic Relational Algebra Operators
1. **Selection ($\\sigma_c(R)$):** Filters rows satisfying predicate $c$.
2. **Projection ($\\pi_A(R)$):** Extracts specified columns $A$, automatically eliminating duplicate rows.
3. **Union ($R \\cup S$):** Tuples in $R$ or $S$. Requires union compatibility (same arity and compatible domains).
4. **Set Difference ($R - S$):** Tuples in $R$ but not in $S$. Union compatible.
5. **Cartesian Product ($R \\times S$):** Pairs every tuple of $R$ with every tuple of $S$.
6. **Rename ($\\rho_{S}(R)$):** Renames relation or attributes.

---

## 2. Division Operator ($R \\div S$)
Used for queries with the universal quantifier **"FOR ALL"** or **"EVERY"**:
- "Find customers who bought all models of smartphone."
- Degree of $(R \\div S) = \\text{Degree}(R) - \\text{Degree}(S)$.
""",
        "questions": [
            {
                "id": "dbms-ra-1",
                "question": "Which relational algebra operator is specifically used to answer queries requiring matching 'ALL' items in another relation?",
                "options": ["Natural Join", "Cartesian Product", "Division (÷)", "Theta Join"],
                "correct_option": 2,
                "explanation": "The Division operator R ÷ S selects tuples from R associated with every single tuple in relation S."
            },
            {
                "id": "dbms-ra-2",
                "question": "How many fundamental operators are required to express all relational algebra queries?",
                "options": ["3", "5", "6", "8"],
                "correct_option": 2,
                "explanation": "The 6 fundamental operators are: Selection, Projection, Union, Set Difference, Cartesian Product, and Rename."
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
        "companyTags": ["Oracle", "Microsoft", "Amazon", "Infosys"],
        "keyTakeaways": [
            "Super Key: Set of attributes uniquely identifying every tuple in a relation.",
            "Candidate Key: Minimal Super Key (no proper subset is a super key).",
            "Primary Key: Candidate key chosen by database designer; CANNOT contain NULL values (Entity Integrity).",
            "Referential Integrity: Foreign key must match primary key in referenced table, or be NULL."
        ],
        "notesMarkdown": """# Keys & Relational Integrity

---

## 1. Key Hierarchy
$$\\text{All Attributes} \\supseteq \\text{Super Keys} \\supseteq \\text{Candidate Keys} \\ni \\text{Primary Key}$$
- **Super Key:** Any attribute combination that uniquely identifies a row.
- **Candidate Key:** A super key with zero redundant attributes (minimal).
- **Primary Key:** The single chosen candidate key.

---

## 2. Core Integrity Constraints
1. **Domain Integrity:** Attribute values must conform to declared data type and range constraints.
2. **Entity Integrity:** Primary key attributes can **never be NULL**.
3. **Referential Integrity:** A foreign key value must either exist as a valid primary key in the referenced parent relation, or be completely NULL.
   - Handled via `ON DELETE CASCADE`, `ON DELETE SET NULL`, or `ON DELETE RESTRICT`.
""",
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
                "options": ["Referential Integrity", "Entity Integrity", "Domain Constraint", "Functional Dependency"],
                "correct_option": 1,
                "explanation": "Entity Integrity rule mandates that primary key components cannot be NULL because they uniquely identify tuples."
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
        "companyTags": ["Amazon", "Google", "Microsoft", "Adobe"],
        "keyTakeaways": [
            "Functional Dependency X -> Y: Whenever two tuples agree on attributes X, they MUST agree on attributes Y.",
            "Armstrong's Axioms are Sound and Complete.",
            "Reflexivity: If Y is subset of X, then X -> Y.",
            "Augmentation: If X -> Y, then XZ -> YZ.",
            "Transitivity: If X -> Y and Y -> Z, then X -> Z."
        ],
        "notesMarkdown": """# Functional Dependencies & Armstrong's Axioms

---

## 1. Functional Dependency (FD) Definition
Given relation $R$, an FD $X \\to Y$ holds if for any two tuples $t_1, t_2 \\in R$:
$$t_1[X] = t_2[X] \\implies t_1[Y] = t_2[Y]$$

---

## 2. Armstrong's Axioms (Sound & Complete)
1. **Reflexivity Rule:** If $Y \\subseteq X$, then $X \\to Y$ (Trivial FD).
2. **Augmentation Rule:** If $X \\to Y$, then $XZ \\to YZ$ for any attribute set $Z$.
3. **Transitivity Rule:** If $X \\to Y$ and $Y \\to Z$, then $X \\to Z$.

### Derived Secondary Rules:
- **Union:** If $X \\to Y$ and $X \\to Z$, then $X \\to YZ$.
- **Decomposition:** If $X \\to YZ$, then $X \\to Y$ and $X \\to Z$. *(Caution: $XY \\to Z$ does NOT imply $X \\to Z$ or $Y \\to Z$!)*
- **Pseudo-Transitivity:** If $X \\to Y$ and $WY \\to Z$, then $WX \\to Z$.
""",
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
        "companyTags": ["Amazon", "Uber", "Oracle", "Microsoft"],
        "keyTakeaways": [
            "Attribute Closure X+: Set of all attributes functionally determined by X under FD set F.",
            "Testing Super Key: If X+ contains ALL attributes of relation R, then X is a Super Key.",
            "Candidate Key: If X is a Super Key and no proper subset of X is a Super Key, X is a Candidate Key.",
            "Canonical Cover: Minimal set of FDs equivalent to F, with no extraneous attributes and no redundant FDs."
        ],
        "notesMarkdown": """# Attribute Closure & Finding Candidate Keys

---

## 1. Attribute Closure Algorithm ($X^+$)
To compute closure of attribute set $X$ under FDs $F$:
1. Initialize $\\text{result} = X$.
2. Repeatedly search for FD $Y \\to Z \\in F$ such that $Y \\subseteq \\text{result}$.
3. Add $Z$ to $\\text{result}$: $\\text{result} = \\text{result} \\cup Z$.
4. Repeat until no more attributes can be added.

---

## 2. Determining Candidate Keys
1. Identify attributes that **never appear on the RHS** of any FD. These **must** be part of every candidate key!
2. Identify attributes that appear **only on the RHS**. These can never be part of any candidate key.
3. Compute the closure of the essential attributes. If it yields $R^+$, it is the sole candidate key. If not, combine with intermediate attributes.
""",
        "questions": [
            {
                "id": "dbms-ac-1",
                "question": "In relation R(A, B, C, D) with FDs {A -> B, B -> C, C -> D}, what is the attribute closure of {A}?",
                "options": ["{A, B}", "{A, B, C}", "{A, B, C, D}", "{A}"],
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
        "companyTags": ["Google", "Amazon", "Oracle", "IBM"],
        "keyTakeaways": [
            "Decomposition of R into R1, R2 is Lossless if natural join R1 |><| R2 = R.",
            "Lossy decomposition generates spurious/ghost tuples upon join.",
            "Binary Lossless Condition: Decomposition into R1, R2 is lossless if and only if (R1 cap R2) -> R1 OR (R1 cap R2) -> R2 (common attribute is superkey of at least one).",
            "Lossless property is non-negotiable for database schema decomposition."
        ],
        "notesMarkdown": """# Lossless-Join Decomposition

---

## 1. What is Lossless Decomposition?
A decomposition of relation $R$ into $R_1$ and $R_2$ is **Lossless** (non-additive join) if:
$$R_1 \\bowtie R_2 = R$$
If $R_1 \\bowtie R_2 \\supset R$, spurious tuples have been created $\\implies$ **Lossy Decomposition** (destructive error).

---

## 2. Necessary & Sufficient Condition for Binary Decomposition
Decomposition of $R$ into $R_1$ and $R_2$ is lossless with respect to FD set $F$ if and only if the common attributes $(R_1 \\cap R_2)$ functionally determine at least one relation:
$$(R_1 \\cap R_2) \\to R_1 \\quad \\text{OR} \\quad (R_1 \\cap R_2) \\to R_2$$
*(The common attributes must form a Super Key in either $R_1$ or $R_2$).*
""",
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
        "companyTags": ["Microsoft", "Oracle", "Infosys", "Cisco"],
        "keyTakeaways": [
            "Dependency Preservation: All functional dependencies in F can be enforced without computing joins across decomposed relations.",
            "Testing: (F1 U F2 U ... Fn)+ = F+.",
            "Key Trade-off: 3NF ALWAYS guarantees both Lossless Join AND Dependency Preservation. BCNF guarantees Lossless Join, but CANNOT always preserve dependencies."
        ],
        "notesMarkdown": """# Dependency Preservation

---

## 1. Why Preserve Dependencies?
If an FD $X \\to Y$ is preserved within a decomposed table $R_i$, updates can be checked locally in $R_i$ with zero join overhead. If an FD spans multiple tables, checking it requires an expensive multi-table join on every insert/update.

---

## 2. 3NF vs. BCNF Guarantee
- **3NF Synthesis Algorithm:** Guaranteed to achieve **both** Lossless Join and Dependency Preservation simultaneously!
- **BCNF Decomposition:** Guaranteed to achieve Lossless Join and eliminate all redundancy, but **cannot always preserve dependencies** (e.g., relation with candidate keys $AB, BC$ and FD $C \\to B$).
""",
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
                "options": ["First Normal Form (1NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)", "Fourth Normal Form (4NF)"],
                "correct_option": 1,
                "explanation": "3NF synthesis algorithm guarantees both lossless-join decomposition and dependency preservation."
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
        "companyTags": ["Amazon", "Google", "Microsoft", "Goldman Sachs"],
        "keyTakeaways": [
            "Conflicting Operations: Two operations belong to different transactions, access the SAME data item, and at least ONE is a WRITE.",
            "Conflict Serializability: A schedule is conflict serializable if it can be transformed into a serial schedule by swapping non-conflicting adjacent operations.",
            "Precedence Graph: Cycle in graph <=> Schedule is NOT conflict serializable.",
            "View Serializability: Every conflict serializable schedule is view serializable, but not vice-versa (view serializability permits blind writes)."
        ],
        "notesMarkdown": """# Conflict & View Serializability

---

## 1. Conflicting Operations
Two operations $I_i$ and $I_j$ conflict if:
1. They belong to different transactions ($T_i \\neq T_j$).
2. They operate on the exact same data item $Q$.
3. At least one of them is a `write(Q)`.
*(Read-Read operations never conflict).*

---

## 2. Conflict Serializability
A schedule $S$ is conflict serializable if it is conflict equivalent to some serial schedule. Tested by constructing a **Precedence Graph (Serialization Graph)**:
- Nodes: Committed transactions $T_i$.
- Directed Edge $T_i \\to T_j$: If $T_i$ executes an operation conflicting with a subsequent operation in $T_j$.
- **Theorem:** Schedule is conflict serializable $\\iff$ Precedence graph has **NO CYCLES**.

---

## 3. View Serializability
Weaker condition than conflict serializability:
- Matches initial read, final write, and write-read dependencies of a serial schedule.
- Allows schedules with **Blind Writes** (writing without reading) that may have cycles in conflict precedence graph.
- Testing View Serializability is NP-Complete!
""",
        "questions": [
            {
                "id": "dbms-ser-1",
                "question": "Which of the following pairs of transaction operations on the same data item Q do NOT conflict?",
                "options": ["Read(Q) and Write(Q)", "Write(Q) and Write(Q)", "Read(Q) and Read(Q)", "Write(Q) and Read(Q)"],
                "correct_option": 2,
                "explanation": "Two Read operations on the same data item do not conflict because reading does not modify state."
            },
            {
                "id": "dbms-ser-2",
                "question": "What is the computational complexity of testing whether an arbitrary schedule is View Serializable?",
                "options": ["O(N) linear time", "O(N^2) polynomial time", "NP-Complete", "Undecidable"],
                "correct_option": 2,
                "explanation": "While testing Conflict Serializability is polynomial (O(V+E) cycle check), testing View Serializability is proven NP-Complete."
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
        "companyTags": ["Google", "Amazon", "Microsoft", "Uber"],
        "keyTakeaways": [
            "Graph Construction: Add edge Ti -> Tj if Ti executes before Tj and their operations conflict (R-W, W-R, W-W).",
            "Cycle Detection: DFS or Kahn's algorithm detects cycles in O(V + E).",
            "Serial Order: If acyclic, topological sort produces the equivalent serial transaction order."
        ],
        "notesMarkdown": """# Precedence Graphs & Serial Schedules

---

## 1. Graph Construction Rules
For schedule $S$ containing transactions $T_1, T_2, \\dots, T_n$:
Create directed edge $T_i \\to T_j$ if $T_i$ accesses item $X$ before $T_j$ accesses $X$, and:
1. $T_i$ executes `write(X)` and $T_j$ executes `read(X)`
2. $T_i$ executes `read(X)` and $T_j$ executes `write(X)`
3. $T_i$ executes `write(X)` and $T_j$ executes `write(X)`

---

## 2. Deriving Equivalent Serial Schedule
If the graph contains **no directed cycle**:
- Perform **Topological Sort** on the DAG.
- The resulting linear ordering of vertices is the equivalent serial schedule $T_{\\pi(1)} \\to T_{\\pi(2)} \\to \\dots \\to T_{\\pi(n)}$.
""",
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
                "options": ["Breadth-First Search traversal", "Topological Sort of the directed acyclic graph", "Dijkstra's shortest path", "Prim's algorithm"],
                "correct_option": 1,
                "explanation": "Topological sorting of the DAG orders vertices such that for every directed edge U -> V, U comes before V in the serial sequence."
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
        "companyTags": ["Amazon", "Oracle", "Microsoft", "Salesforce"],
        "keyTakeaways": [
            "Wait-Die (Non-preemptive): Older transaction waits for younger; younger transaction requesting resource held by older dies immediately.",
            "Wound-Wait (Preemptive): Older transaction preempts ('wounds') younger; younger waits for older.",
            "Wait-For Graph (WFG): Nodes are active transactions; edge Ti -> Tj means Ti is waiting for lock held by Tj. Cycle = Deadlock.",
            "Victim Selection: Minimize rollback cost (transactions near completion are spared)."
        ],
        "notesMarkdown": """# Deadlocks in Databases

---

## 1. Deadlock Prevention: Wait-Die vs. Wound-Wait
Based on transaction arrival timestamps $TS(T)$ (smaller timestamp = older transaction):

| Scheme | Older requests lock held by Younger | Younger requests lock held by Older | Type |
|---|---|---|---|
| **Wait-Die** | Older **waits** | Younger **dies** (aborts & restarts) | Non-preemptive |
| **Wound-Wait** | Older preempts (**wounds/aborts**) Younger | Younger **waits** | Preemptive |

Both schemes are completely deadlock-free because timestamps strictly prohibit circular wait!

---

## 2. Deadlock Detection & Wait-For Graphs
- OS/DBMS periodically builds **Wait-For Graph (WFG)**.
- If cycle detected $\\implies$ Deadlock!
- **Recovery:** Select victim transaction to rollback (either partial savepoint or complete abort). To prevent victim starvation, maintain retry counter.
""",
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
        "companyTags": ["Google", "Amazon", "Oracle", "Microsoft"],
        "keyTakeaways": [
            "Write-Ahead Logging (WAL): Log record must be flushed to non-volatile storage BEFORE the corresponding dirty database page is written to disk.",
            "Deferred Modification: All writes buffered in log until commit; requires REDO only during crash recovery.",
            "Immediate Modification: Writes written to disk before commit; requires both UNDO (uncommitted) and REDO (committed).",
            "Checkpointing: Reduces recovery log scan time by flushing dirty buffer pages and recording active transaction table.",
            "ARIES: Analysis (reconstruct state) -> Redo (repeat history) -> Undo (rollback uncommitted)."
        ],
        "notesMarkdown": """# Database Recovery & Logging

---

## 1. Write-Ahead Logging (WAL) Protocol
1. Must write log record `<Ti, X, old_val, new_val>` to stable disk storage **before** writing the modified data item to database disk.
2. Must write `<Ti, COMMIT>` log record to disk **before** acknowledging commit to client.

---

## 2. Immediate vs. Deferred Update
- **Deferred Update:** Database is updated on disk *only after* commit. Recovery needs only `REDO`. No `UNDO` needed because uncommitted writes never touched disk.
- **Immediate Update:** Database can be updated on disk *before* commit. Recovery needs:
  - `UNDO` transactions that have `START` but no `COMMIT` in log.
  - `REDO` transactions that have both `START` and `COMMIT` in log.

---

## 3. ARIES Recovery Algorithm
1. **Analysis Phase:** Scan forward from latest checkpoint to identify dirty pages in buffer and active transactions at crash time.
2. **Redo Phase:** Scan forward repeating history; reapplies all logged updates to return DB to crash state.
3. **Undo Phase:** Scan backward rolling back changes of all active (uncommitted) transactions.
""",
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
                "options": ["REDO Ti", "UNDO Ti", "Ignore Ti", "Commit Ti immediately"],
                "correct_option": 1,
                "explanation": "Because Ti never committed before the crash, its modifications must be undone (rolled back) to preserve atomicity."
            }
        ]
    }
]

# Map the 18 requested topics:
# 1. Database Architecture
# 2. ER Model and ER Diagrams
# 3. Relational Model
# 4. Relational Algebra and Relational Calculus
# 5. SQL Queries and Joins (maps to existing 'sql-joins-queries')
# 6. Keys and Integrity Constraints
# 7. Functional Dependencies
# 8. Attribute Closure and Candidate Keys
# 9. Normalization: 1NF, 2NF, 3NF, BCNF (maps to existing 'normalization')
# 10. Lossless Decomposition
# 11. Dependency Preservation
# 12. Transactions and ACID Properties (maps to existing 'acid-transactions')
# 13. Conflict and View Serializability
# 14. Precedence Graphs
# 15. Concurrency Control and Locking (maps to existing 'concurrency-2pl')
# 16. Deadlocks in Databases
# 17. Recovery Techniques
# 18. Indexing, B-Trees, and B+ Trees (maps to existing 'indexing-btree')

new_topics_by_id = {t["id"]: t for t in new_dbms_topics}
final_dbms_topics = []

# 1. Database Architecture
final_dbms_topics.append(new_topics_by_id["dbms-architecture"])

# 2. ER Model and ER Diagrams
final_dbms_topics.append(new_topics_by_id["dbms-er-model-and-diagrams"])

# 3. Relational Model
final_dbms_topics.append(new_topics_by_id["dbms-relational-model"])

# 4. Relational Algebra and Relational Calculus
final_dbms_topics.append(new_topics_by_id["dbms-relational-algebra-and-calculus"])

# 5. SQL Queries and Joins
t5 = existing_dbms_topics.get("sql-joins-queries")
if t5:
    t5_copy = dict(t5)
    t5_copy["title"] = "SQL Queries and Joins"
    t5_copy["youtube_url"] = make_yt_url("SQL Queries Joins Subqueries Window Functions")
    final_dbms_topics.append(t5_copy)
else:
    raise Exception("Missing existing sql-joins-queries")

# 6. Keys and Integrity Constraints
final_dbms_topics.append(new_topics_by_id["dbms-keys-and-integrity-constraints"])

# 7. Functional Dependencies
final_dbms_topics.append(new_topics_by_id["dbms-functional-dependencies"])

# 8. Attribute Closure and Candidate Keys
final_dbms_topics.append(new_topics_by_id["dbms-attribute-closure-and-candidate-keys"])

# 9. Normalization: 1NF, 2NF, 3NF, BCNF
t9 = existing_dbms_topics.get("normalization")
if t9:
    t9_copy = dict(t9)
    t9_copy["title"] = "Normalization: 1NF, 2NF, 3NF, BCNF"
    t9_copy["youtube_url"] = make_yt_url("Normalization 1NF 2NF 3NF BCNF DBMS")
    final_dbms_topics.append(t9_copy)
else:
    raise Exception("Missing existing normalization")

# 10. Lossless Decomposition
final_dbms_topics.append(new_topics_by_id["dbms-lossless-decomposition"])

# 11. Dependency Preservation
final_dbms_topics.append(new_topics_by_id["dbms-dependency-preservation"])

# 12. Transactions and ACID Properties
t12 = existing_dbms_topics.get("acid-transactions")
if t12:
    t12_copy = dict(t12)
    t12_copy["title"] = "Transactions and ACID Properties"
    t12_copy["youtube_url"] = make_yt_url("Transactions and ACID Properties DBMS")
    final_dbms_topics.append(t12_copy)
else:
    raise Exception("Missing existing acid-transactions")

# 13. Conflict and View Serializability
final_dbms_topics.append(new_topics_by_id["dbms-conflict-and-view-serializability"])

# 14. Precedence Graphs
final_dbms_topics.append(new_topics_by_id["dbms-precedence-graphs"])

# 15. Concurrency Control and Locking
t15 = existing_dbms_topics.get("concurrency-2pl")
if t15:
    t15_copy = dict(t15)
    t15_copy["title"] = "Concurrency Control and Locking"
    t15_copy["youtube_url"] = make_yt_url("Concurrency Control Locking 2PL DBMS")
    final_dbms_topics.append(t15_copy)
else:
    raise Exception("Missing existing concurrency-2pl")

# 16. Deadlocks in Databases
final_dbms_topics.append(new_topics_by_id["dbms-deadlocks-in-databases"])

# 17. Recovery Techniques
final_dbms_topics.append(new_topics_by_id["dbms-recovery-techniques"])

# 18. Indexing, B-Trees, and B+ Trees
t18 = existing_dbms_topics.get("indexing-btree")
if t18:
    t18_copy = dict(t18)
    t18_copy["title"] = "Indexing, B-Trees, and B+ Trees"
    t18_copy["youtube_url"] = make_yt_url("Indexing B-Trees B+ Trees DBMS")
    final_dbms_topics.append(t18_copy)
else:
    raise Exception("Missing existing indexing-btree")

# 19. Also preserve NoSQL and CAP Theorem from existing so no information is lost!
t19 = existing_dbms_topics.get("nosql-cap")
if t19:
    t19_copy = dict(t19)
    t19_copy["youtube_url"] = make_yt_url("CAP Theorem BASE NoSQL DBMS")
    final_dbms_topics.append(t19_copy)

# Ensure youtube_url
for t in final_dbms_topics:
    if "youtube_url" not in t or not t["youtube_url"]:
        t["youtube_url"] = make_yt_url(t["title"])

category = {
    "id": "dbms",
    "slug": "dbms",
    "title": "Database Management Systems (DBMS)",
    "description": "Relational algebra, SQL queries, normalization, transactions, concurrency control, B/B+ tree indexing, and recovery.",
    "icon": "Database",
    "topics": final_dbms_topics
}

ts_content = f"""import type {{ SectionCategory }} from './types';

export const DBMS_CATEGORY: SectionCategory = {json.dumps(category, indent=2)};
"""

with open("src/lib/data/curriculum/dbms.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated DBMS module with {len(final_dbms_topics)} topics successfully!")
