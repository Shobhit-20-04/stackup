export interface Question {
  id: string;
  question: string;
  options: string[];
  correct_option: number; // 0-based
  explanation: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  notesMarkdown: string;
  questions: Question[];
}

export interface SectionCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: 'BookOpen' | 'Cpu' | 'Database' | 'Network' | 'Code2';
  topics: Topic[];
}

export const CURRICULUM_DATA: Record<string, {
  name: string;
  slug: string;
  description: string;
  categories: SectionCategory[];
}> = {
  aptitude: {
    name: 'Quantitative & Logical Aptitude',
    slug: 'aptitude',
    description: 'Master quantitative aptitude, logical reasoning, and data interpretation for campus placements and technical screening tests.',
    categories: [
      {
        id: 'quant',
        slug: 'quantitative-aptitude',
        title: 'Quantitative Aptitude',
        description: 'Arithmetic, algebra, and numerical problem solving.',
        icon: 'BookOpen',
        topics: [
          {
            id: 'time-work',
            slug: 'time-and-work',
            title: 'Time and Work',
            description: 'Efficiency, individual and group completion rates, and pipe & cistern problems.',
            estimatedMinutes: 15,
            notesMarkdown: `
# Time and Work — High-Yield Formulas & Shortcuts

Time and Work questions evaluate your ability to compute individual and collective work rates.

---

## 1. Core Mathematical Concept
If a person can finish a piece of work in **$N$ days**, then in **$1$ day**, they complete:
$$\\text{Work per day} = \\frac{1}{N}$$

Conversely, if $1$ day's work is $\\frac{1}{N}$, the total time to complete the entire work is **$N$ days**.

---

## 2. Combined Work Shortcut
If Person A can finish a job in $A$ days and Person B can finish in $B$ days:
- Work done together in $1$ day = $\\frac{1}{A} + \\frac{1}{B} = \\frac{A + B}{A \\times B}$
- **Total days taken together:**
$$T = \\frac{A \\times B}{A + B}$$

### Three Workers:
If A, B, and C take $A$, $B$, and $C$ days respectively:
$$T = \\frac{A \\times B \\times C}{AB + BC + CA}$$

---

## 3. The LCM Method (Best for Speed)
Instead of dealing with fractions, assume total work = **LCM of individual days**.

> **Example:**
> - A finishes in $10$ days.
> - B finishes in $15$ days.
> - **Total Work = LCM(10, 15) = 30 units.**
> - Efficiency of A = $30 / 10 = 3$ units/day.
> - Efficiency of B = $30 / 15 = 2$ units/day.
> - Combined efficiency = $3 + 2 = 5$ units/day.
> - Time taken together = $30 / 5 = 6$ days.

---

## 4. Efficiency and Wages
Wages are directly proportional to the amount of work done. If time is identical:
$$\\text{Ratio of wages} = \\text{Ratio of efficiencies} = \\frac{1}{T_A} : \\frac{1}{T_B}$$

---

## 5. Pipes and Cisterns Variant
- **Inlet Pipe:** Work done is positive ($+1/A$).
- **Outlet / Leak Pipe:** Work done is negative ($-1/B$).
- If Inlet takes $A$ hours and Outlet takes $B$ hours ($B > A$), net fill time is:
$$T = \\frac{A \\times B}{B - A}$$
`,
            questions: [
              {
                id: 'tw-1',
                question: 'A can do a piece of work in 12 days and B can do it in 24 days. How many days will they take working together?',
                options: ['6 days', '8 days', '10 days', '16 days'],
                correct_option: 1,
                explanation: 'Using the shortcut formula: T = (A * B) / (A + B) = (12 * 24) / (12 + 24) = 288 / 36 = 8 days.',
              },
              {
                id: 'tw-2',
                question: 'A pipe can fill a tank in 6 hours, while a leak empties it in 10 hours. How long will it take to fill the tank if both are open?',
                options: ['15 hours', '12 hours', '8 hours', '16 hours'],
                correct_option: 0,
                explanation: 'Net fill rate per hour = 1/6 - 1/10 = (5 - 3) / 30 = 2/30 = 1/15. Hence, tank fills in 15 hours.',
              },
              {
                id: 'tw-3',
                question: 'A is twice as efficient as B. If A and B together finish a job in 14 days, in how many days can A alone complete it?',
                options: ['21 days', '28 days', '18 days', '42 days'],
                correct_option: 0,
                explanation: 'Efficiency of A = 2 units/day, B = 1 unit/day. Together = 3 units/day. Total work = 3 * 14 = 42 units. Time for A alone = 42 / 2 = 21 days.',
              },
            ],
          },
          {
            id: 'prob-perm',
            slug: 'probability-and-combinations',
            title: 'Permutations, Combinations & Probability',
            description: 'Selection vs arrangement, fundamental counting principle, independent events, and Bayes theorem.',
            estimatedMinutes: 20,
            notesMarkdown: `
# Permutations & Probability — Campus Cheat Sheet

Frequently tested in quantitative screening tests for software engineering and analytical roles.

---

## 1. Permutations vs. Combinations
- **Permutation ($^n P_r$):** Order **matters** (arrangements, passwords, ranks).
$$^n P_r = \\frac{n!}{(n - r)!}$$
- **Combination ($^n C_r$):** Order **does not matter** (selections, committee, handshakes).
$$^n C_r = \\frac{n!}{r!(n - r)!}$$

---

## 2. Key Identities
- $^n C_0 = ^n C_n = 1$
- $^n C_r = ^n C_{n-r}$
- $^n C_1 = n$

---

## 3. Probability Fundamentals
$$P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of possible outcomes}}$$

- **Complementary Rule:** $P(E') = 1 - P(E)$ *(Often easier to compute "none" and subtract from 1)*.
- **Independent Events:** $P(A \\cap B) = P(A) \\times P(B)$
- **Mutually Exclusive:** $P(A \\cup B) = P(A) + P(B)$
`,
            questions: [
              {
                id: 'pp-1',
                question: 'In how many ways can a team of 4 members be selected from 6 men and 4 women such that exactly 2 are men?',
                options: ['60', '90', '120', '45'],
                correct_option: 1,
                explanation: 'Ways to choose 2 men from 6 = 6C2 = 15. Ways to choose 2 women from 4 = 4C2 = 6. Total = 15 * 6 = 90 ways.',
              },
              {
                id: 'pp-2',
                question: 'Two dice are rolled simultaneously. What is the probability of getting a sum equal to 7?',
                options: ['1/6', '7/36', '1/12', '5/36'],
                correct_option: 0,
                explanation: 'Favorable pairs for sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 outcomes. Total outcomes = 36. Probability = 6/36 = 1/6.',
              },
            ],
          },
        ],
      },
      {
        id: 'logical',
        slug: 'logical-reasoning',
        title: 'Logical Reasoning',
        description: 'Deductive reasoning, pattern recognition, and relationships.',
        icon: 'Code2',
        topics: [
          {
            id: 'syllogisms',
            slug: 'syllogisms-and-deduction',
            title: 'Syllogisms & Logical Deductions',
            description: 'Venn diagram approach, "All/Some/No" rules, and definite vs possibility conclusions.',
            estimatedMinutes: 12,
            notesMarkdown: `
# Syllogisms — High-Accuracy Venn Method

Syllogisms test your ability to derive strictly true deductions from arbitrary premises.

---

## 1. The 4 Standard Statement Types
1. **Universal Affirmative (A):** "All A are B" (Circle A inside Circle B)
2. **Universal Negative (E):** "No A is B" (Disjoint circles A and B)
3. **Particular Affirmative (I):** "Some A are B" (Intersecting circles A and B)
4. **Particular Negative (O):** "Some A are not B"

---

## 2. Golden Rules for Definite Conclusions
- Never assume beyond what is stated.
- A conclusion is **definitely true** only if it holds across **every single valid Venn diagram**.
- If a conclusion fails in even one valid diagram, it does not follow.
`,
            questions: [
              {
                id: 'syl-1',
                question: 'Statements: All dogs are mammals. All mammals are animals. Conclusion: (I) All dogs are animals. (II) Some animals are dogs.',
                options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither follows'],
                correct_option: 2,
                explanation: 'Dogs is a subset of Mammals, which is a subset of Animals. Therefore, all dogs are animals (I follows) and since dogs exist, some animals are dogs (II follows).',
              },
            ],
          },
        ],
      },
    ],
  },
  'core-cs': {
    name: 'Core CS Subjects',
    slug: 'core-cs',
    description: 'Concise interview revision summaries and question banks across Operating Systems, DBMS, Computer Networks, and OOPs.',
    categories: [
      {
        id: 'os',
        slug: 'operating-systems',
        title: 'Operating Systems',
        description: 'Processes, CPU scheduling, deadlocks, virtual memory, and concurrency.',
        icon: 'Cpu',
        topics: [
          {
            id: 'process-thread',
            slug: 'processes-and-threads',
            title: 'Processes vs. Threads & Context Switching',
            description: 'PCB vs TCB, memory layout, IPC mechanisms, context switch overhead.',
            estimatedMinutes: 18,
            notesMarkdown: `
# Processes vs. Threads — Deep Dive

One of the top 3 most frequently asked Operating Systems interview topics.

---

## 1. Process vs. Thread

| Attribute | Process | Thread (Lightweight Process) |
| :--- | :--- | :--- |
| **Definition** | Program in execution with isolated address space | Independent unit of execution within a process |
| **Address Space** | Own dedicated virtual address space | Shares code, data, and heap with parent process |
| **Resources** | Heavyweight; distinct file descriptors & memory | Lightweight; shares resources; has its own Stack & Registers |
| **Creation Cost** | High (\`fork()\` / \`exec()\`) | Low (\`pthread_create()\`) |
| **Communication** | IPC required (Pipes, Sockets, Shared Memory) | Direct memory access via shared heap |

---

## 2. Process Memory Layout
A typical 32/64-bit process memory layout consists of:
1. **Text (Code) Segment:** Executable machine instructions (Read-Only).
2. **Data Segment:** Initialized global & static variables.
3. **BSS Segment:** Uninitialized global & static variables (zeroed).
4. **Heap Segment:** Dynamically allocated memory (\`malloc\`, \`new\`) growing **upwards**.
5. **Stack Segment:** Local variables, function call frames, return addresses growing **downwards**.

---

## 3. Context Switch
Saving the context (registers, Program Counter, PCB) of the current running process/thread and loading the context of the next scheduled process/thread.
- **Process context switch** requires flushing the **TLB (Translation Lookaside Buffer)** due to virtual address space changes.
- **Thread context switch** avoids TLB invalidation, making it significantly faster.
`,
            questions: [
              {
                id: 'os-1',
                question: 'Which of the following is NOT shared between threads belonging to the same process?',
                options: ['Heap memory', 'Global variables', 'Stack and CPU Registers', 'Open file descriptors'],
                correct_option: 2,
                explanation: 'Each thread has its own private Stack (for function calls and local variables) and Register state (Program Counter, Stack Pointer). The Heap, Code, and open files are shared.',
              },
              {
                id: 'os-2',
                question: 'Why is thread context switching faster than process context switching?',
                options: [
                  'Threads do not use CPU registers',
                  'Threads share the same virtual address space, avoiding TLB cache flush',
                  'Threads do not require kernel scheduling',
                  'Threads run in User mode only'
                ],
                correct_option: 1,
                explanation: 'Because threads share memory mappings, the CPU TLB (Translation Lookaside Buffer) does not need to be completely invalidated during a thread switch within the same process.',
              },
            ],
          },
          {
            id: 'deadlocks',
            slug: 'synchronization-and-deadlocks',
            title: 'Deadlocks & The 4 Coffman Conditions',
            description: 'Mutual exclusion, hold and wait, no preemption, circular wait, Banker’s algorithm.',
            estimatedMinutes: 20,
            notesMarkdown: `
# Deadlocks & Synchronization Cheat Sheet

A **Deadlock** is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process.

---

## 1. The 4 Necessary Conditions (Coffman Conditions)
A deadlock can occur **if and only if** all four conditions hold simultaneously:

1. **Mutual Exclusion:** At least one resource must be non-shareable.
2. **Hold and Wait:** A process is holding at least one resource and waiting to acquire additional resources held by other processes.
3. **No Preemption:** Resources cannot be forcibly revoked from a process; they can only be released voluntarily.
4. **Circular Wait:** A closed chain of processes exists such that $P_0$ waits for resource held by $P_1$, $P_1$ waits for $P_2$, ..., and $P_n$ waits for $P_0$.

---

## 2. Prevention vs. Avoidance
- **Deadlock Prevention:** Design the system to invalidate at least one of the 4 Coffman conditions (e.g. enforce strict resource ordering to eliminate Circular Wait).
- **Deadlock Avoidance:** Allow the conditions, but dynamically verify safety states before granting resources (**Banker's Algorithm**).
`,
            questions: [
              {
                id: 'os-3',
                question: 'Which condition is invalidated by imposing a total ordering on all resource types and requiring processes to request resources in strictly increasing order?',
                options: ['Mutual Exclusion', 'Hold and Wait', 'Circular Wait', 'No Preemption'],
                correct_option: 2,
                explanation: 'Strict global numbering and increasing order resource allocation mathematically eliminates the possibility of a circular dependency graph (Circular Wait).',
              },
            ],
          },
        ],
      },
      {
        id: 'dbms',
        slug: 'database-management-systems',
        title: 'Database Management Systems (DBMS)',
        description: 'ACID properties, indexing, SQL normalization, transactions, and concurrency control.',
        icon: 'Database',
        topics: [
          {
            id: 'acid-transactions',
            slug: 'acid-properties-and-transactions',
            title: 'ACID Properties & Transaction Isolation',
            description: 'Atomicity (WAL), Consistency, Isolation (Dirty Read, Non-repeatable, Phantom), Durability.',
            estimatedMinutes: 20,
            notesMarkdown: `
# ACID Properties & Isolation Levels

The bedrock of relational database reliability and distributed systems interviews.

---

## 1. The ACID Guarantees

- **Atomicity:** All-or-nothing execution. Achieved using **Write-Ahead Logging (WAL)** and undo logs.
- **Consistency:** Database transitions from one valid state satisfying all schema constraints, foreign keys, and triggers to another.
- **Isolation:** Concurrent transactions execute without interfering with one another.
- **Durability:** Once committed, changes survive system crashes or power failures. Achieved using disk commits and redo logs.

---

## 2. SQL Isolation Levels & Concurrency Phenomena

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :---: | :---: | :---: |
| **Read Uncommitted** | ❌ Allowed | ❌ Allowed | ❌ Allowed |
| **Read Committed** | ✅ Prevented | ❌ Allowed | ❌ Allowed |
| **Repeatable Read** | ✅ Prevented | ✅ Prevented | ❌ Allowed |
| **Serializable** | ✅ Prevented | ✅ Prevented | ✅ Prevented |

### Phenomena Explained:
- **Dirty Read:** Reading uncommitted data written by a concurrent transaction that could still be rolled back.
- **Non-Repeatable Read:** Re-reading the same row within a transaction produces different column values because another transaction modified and committed it.
- **Phantom Read:** Re-executing a range query returns new rows added or deleted by another committed transaction.
`,
            questions: [
              {
                id: 'db-1',
                question: 'Which concurrency phenomenon is prevented by "Repeatable Read" that was allowed in "Read Committed"?',
                options: ['Dirty Read', 'Non-Repeatable Read', 'Phantom Read', 'Deadlock'],
                correct_option: 1,
                explanation: 'Repeatable Read guarantees that if you read a row, subsequent reads of the same row in the same transaction return the exact same data, preventing Non-Repeatable Reads.',
              },
              {
                id: 'db-2',
                question: 'Which component ensures durability and atomicity in modern relational databases during a sudden crash?',
                options: ['Query Optimizer', 'Write-Ahead Log (WAL)', 'B+ Tree Index', 'Buffer Pool Replacement'],
                correct_option: 1,
                explanation: 'Write-Ahead Logging (WAL) writes changes to non-volatile append-only logs before applying them to data pages, allowing recovery of committed transactions and rollback of incomplete ones.',
              },
            ],
          },
          {
            id: 'normalization',
            slug: 'database-normalization',
            title: 'Database Normalization (1NF to BCNF)',
            description: 'Functional dependencies, eliminating insertion/deletion/update anomalies.',
            estimatedMinutes: 16,
            notesMarkdown: `
# Database Normalization Summary

Normalization organizes table columns to reduce data redundancy and eliminate anomalies.

---

## 1. Normal Forms Hierarchy
1. **1NF (First Normal Form):**
   - Each column contains atomic (indivisible) values. No repeating groups or arrays.
2. **2NF (Second Normal Form):**
   - Must be in 1NF.
   - **No partial dependency:** Every non-prime attribute must depend on the whole candidate key, not a proper subset of it.
3. **3NF (Third Normal Form):**
   - Must be in 2NF.
   - **No transitive dependency:** Non-prime attributes must not depend on other non-prime attributes ($X \\rightarrow Y$, $X$ must be superkey or $Y$ is prime).
4. **BCNF (Boyce-Codd Normal Form):**
   - For every functional dependency $X \\rightarrow Y$, $X$ must strictly be a **Super Key**.
`,
            questions: [
              {
                id: 'db-3',
                question: 'A table is in 2NF if it is in 1NF and contains no:',
                options: ['Transitive dependencies', 'Partial functional dependencies', 'Multi-valued dependencies', 'Foreign keys'],
                correct_option: 1,
                explanation: '2NF specifically eliminates partial dependencies where a non-prime attribute depends only on part of a composite primary key.',
              },
            ],
          },
        ],
      },
      {
        id: 'cn',
        slug: 'computer-networks',
        title: 'Computer Networks',
        description: 'OSI model, TCP/IP handshake, DNS, HTTP/HTTPS, and routing.',
        icon: 'Network',
        topics: [
          {
            id: 'tcp-handshake',
            slug: 'tcp-three-way-handshake',
            title: 'TCP 3-Way Handshake & Connection Teardown',
            description: 'SYN, SYN-ACK, ACK, sequence numbers, TIME_WAIT state, TCP vs UDP.',
            estimatedMinutes: 15,
            notesMarkdown: `
# TCP 3-Way Handshake & Teardown

Reliable, connection-oriented transport protocol mechanism.

---

## 1. 3-Way Handshake (Connection Establishment)
1. **Client -> Server: SYN (Synchronize)**
   - Client generates initial sequence number $ISN_C$. Sets \`SYN=1\`.
2. **Server -> Client: SYN-ACK**
   - Server acknowledges with \`ACK = ISN_C + 1\`.
   - Server provides its own sequence number $ISN_S$. Sets \`SYN=1, ACK=1\`.
3. **Client -> Server: ACK**
   - Client acknowledges with \`ACK = ISN_S + 1\`.
   - Connection is now **ESTABLISHED**. Data transfer begins.

---

## 2. 4-Way Handshake (Connection Termination)
- Client sends **FIN**.
- Server sends **ACK** (Server enters \`CLOSE_WAIT\`).
- Server sends its own **FIN** when finished sending data.
- Client sends **ACK** and enters **\`TIME_WAIT\`** state (typically $2 \\times MSL$, ~60-120 seconds) to ensure the server received the final ACK.
`,
            questions: [
              {
                id: 'cn-1',
                question: 'Why does the TCP client enter the TIME_WAIT state after sending the final ACK during connection termination?',
                options: [
                  'To allow the client to download remaining files',
                  'To ensure the server received the final ACK and to let delayed packets expire in the network',
                  'To preserve bandwidth for neighboring connections',
                  'To encrypt the remaining session tokens'
                ],
                correct_option: 1,
                explanation: 'TIME_WAIT lasts 2 * MSL (Maximum Segment Lifetime). It ensures that if the final ACK was lost, retransmitted FIN segments can be answered, and stale duplicate segments cannot interfere with a new connection.',
              },
            ],
          },
        ],
      },
    ],
  },
};
