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
          {
            id: 'speed-time-distance',
            slug: 'speed-time-distance',
            title: 'Speed, Time & Distance (Trains & Streams)',
            description: 'Relative speed, train crossing times, average speed harmonic mean, and upstream/downstream boats.',
            estimatedMinutes: 18,
            notesMarkdown: `
# Speed, Time & Distance — Master Formulas

Core concepts for campus aptitude tests and speed calculation rounds.

---

## 1. Fundamental Conversions & Relationships
- $\\text{Distance} = \\text{Speed} \\times \\text{Time}$
- Conversion: $1\\text{ km/hr} = \\frac{5}{18}\\text{ m/s}$ and $1\\text{ m/s} = \\frac{18}{5}\\text{ km/hr}$
- **Average Speed** for equal distances at speeds $x$ and $y$:
$$\\text{Average Speed} = \\frac{2xy}{x + y}$$

---

## 2. Relative Speed
- **Opposite Directions:** $S_{\\text{rel}} = S_1 + S_2$
- **Same Direction:** $S_{\\text{rel}} = |S_1 - S_2|$

---

## 3. Train Scenarios
- **Crossing a point object (pole, standing man):** Distance covered = Length of train $L_T$.
- **Crossing a platform/bridge of length $L_P$:** Distance covered = $L_T + L_P$.

---

## 4. Boats and Streams
- Downstream Speed ($D$) = $U + V$ (Boat speed in still water + Stream speed)
- Upstream Speed ($U$) = $U - V$
- Speed of boat in still water = $\\frac{D + U}{2}$
- Speed of stream = $\\frac{D - U}{2}$
`,
            questions: [
              {
                id: 'std-1',
                question: 'A train 150m long is running at 54 km/h. How many seconds will it take to pass a stationary telegraph post?',
                options: ['10 sec', '12 sec', '15 sec', '8 sec'],
                correct_option: 0,
                explanation: 'Speed in m/s = 54 * (5/18) = 15 m/s. Time = Distance / Speed = 150 / 15 = 10 seconds.',
              },
              {
                id: 'std-2',
                question: 'A boat travels 24 km downstream in 2 hours and takes 4 hours to return upstream. What is the speed of the stream?',
                options: ['2 km/h', '3 km/h', '4 km/h', '1.5 km/h'],
                correct_option: 1,
                explanation: 'Downstream speed D = 24/2 = 12 km/h. Upstream speed U = 24/4 = 6 km/h. Stream speed = (D - U) / 2 = (12 - 6) / 2 = 3 km/h.',
              },
            ],
          },
          {
            id: 'profit-loss',
            slug: 'profit-loss-discount',
            title: 'Profit, Loss & Successive Discounts',
            description: 'Cost Price, Selling Price, Marked Price, Margin, and Successive Percentage Discounts.',
            estimatedMinutes: 16,
            notesMarkdown: `
# Profit, Loss & Discount — Quick Reference

---

## 1. Key Formulas
- $\\text{Profit} = SP - CP$ (when $SP > CP$)
- $\\text{Loss} = CP - SP$ (when $CP > SP$)
- $\\text{Profit Percentage} = \\left(\\frac{SP - CP}{CP}\\right) \\times 100$
- $\\text{Loss Percentage} = \\left(\\frac{CP - SP}{CP}\\right) \\times 100$
*(Note: Profit and loss are strictly calculated on CP unless stated otherwise).*

---

## 2. Marked Price & Discount
- $\\text{Discount} = MP - SP$
- $\\text{Discount \\%} = \\left(\\frac{MP - SP}{MP}\\right) \\times 100$

---

## 3. Successive Discounts
Two successive discounts of $a\\%$ and $b\\%$ are equivalent to a single net discount of:
$$\\text{Net Discount} = \\left(a + b - \\frac{ab}{100}\\right)\\%$$
`,
            questions: [
              {
                id: 'pl-1',
                question: 'An item is marked at $500 and sold with two successive discounts of 20% and 10%. What is the final selling price?',
                options: ['$360', '$350', '$380', '$340'],
                correct_option: 0,
                explanation: 'Net discount = 20 + 10 - (20 * 10 / 100) = 30 - 2 = 28%. Final SP = 500 * (1 - 0.28) = 500 * 0.72 = $360.',
              },
            ],
          },
          {
            id: 'percentages-interest',
            slug: 'percentages-and-interest',
            title: 'Percentages & Simple / Compound Interest',
            description: 'Percentage base shifts, Simple Interest, Compounding frequency, and CI-SI 2-year difference formula.',
            estimatedMinutes: 15,
            notesMarkdown: `
# Percentages & Interest Rates

---

## 1. Percentage Shift Rule
If A is $x\\%$ more than B, then B is less than A by:
$$\\left(\\frac{x}{100 + x}\\right) \\times 100\\%$$

---

## 2. Simple Interest (SI)
$$SI = \\frac{P \\times R \\times T}{100}$$
$$A = P + SI = P \\left(1 + \\frac{RT}{100}\\right)$$

---

## 3. Compound Interest (CI)
$$A = P \\left(1 + \\frac{R}{100}\\right)^T$$
$$CI = A - P$$

### High-Yield Shortcut:
Difference between CI and SI for **2 years**:
$$D_2 = P \\left(\\frac{R}{100}\\right)^2$$
`,
            questions: [
              {
                id: 'pi-1',
                question: 'The difference between Compound Interest and Simple Interest on a sum of $5,000 for 2 years at 10% per annum is:',
                options: ['$50', '$25', '$75', '$100'],
                correct_option: 0,
                explanation: 'Using the shortcut formula: Difference = P * (R/100)^2 = 5000 * (10/100)^2 = 5000 * 0.01 = $50.',
              },
            ],
          },
          {
            id: 'ratio-proportion',
            slug: 'ratio-proportion-alligations',
            title: 'Ratio, Proportion & Rule of Alligation',
            description: 'Direct & inverse variation, mean proportional, duplicate ratios, and weighted mixture alligations.',
            estimatedMinutes: 14,
            notesMarkdown: `
# Ratio, Proportion & Mixtures

---

## 1. Proportions
- Mean proportional between $a$ and $b$: $\\sqrt{ab}$
- Third proportional to $a$ and $b$: $\\frac{b^2}{a}$
- Fourth proportional to $a, b, c$: $\\frac{bc}{a}$

---

## 2. Rule of Alligation
To find the ratio in which two ingredients of prices $C_1$ (cheaper) and $C_2$ (dearer) are mixed to produce mean price $M$:
$$\\frac{\\text{Quantity of Cheaper}}{\\text{Quantity of Dearer}} = \\frac{C_2 - M}{M - C_1}$$
`,
            questions: [
              {
                id: 'rp-1',
                question: 'In what ratio must rice at $30/kg be mixed with rice at $45/kg so that the mixture is worth $35/kg?',
                options: ['2 : 1', '1 : 2', '3 : 2', '2 : 3'],
                correct_option: 0,
                explanation: 'Using Alligation: (Dearer - Mean) / (Mean - Cheaper) = (45 - 35) / (35 - 30) = 10 / 5 = 2 : 1.',
              },
            ],
          },
        ],
      },
      {
        id: 'logical',
        slug: 'logical-reasoning',
        title: 'Logical Reasoning',
        description: 'Deductive reasoning, pattern recognition, seating arrangements, and relationship graphs.',
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
          {
            id: 'seating-arrangements',
            slug: 'seating-arrangements',
            title: 'Seating Arrangements & Puzzles',
            description: 'Circular (facing inward vs outward), linear, parallel rows, and multi-attribute grid constraints.',
            estimatedMinutes: 18,
            notesMarkdown: `
# Seating Arrangements & Puzzles

Crucial for campus assessment round 1 logical reasoning sections.

---

## 1. Circular Arrangements
- **Facing Center:**
  - Left = Clockwise
  - Right = Anti-Clockwise
- **Facing Away from Center:**
  - Left = Anti-Clockwise
  - Right = Clockwise

---

## 2. Step-by-Step Strategy
1. Identify definite clues (e.g. "A sits 3rd to the left of B").
2. Fill relative positions before conditional clues.
3. Use a 2-case diagram when branching possibilities arise.
`,
            questions: [
              {
                id: 'sa-1',
                question: 'Six friends A, B, C, D, E, F sit in a circle facing the center. A sits opposite D. B is to the immediate right of A. F is opposite B. Who is to the immediate left of D?',
                options: ['F', 'B', 'E', 'C'],
                correct_option: 0,
                explanation: 'Since B is right of A and F is opposite B, F must be to the immediate left of D.',
              },
            ],
          },
          {
            id: 'blood-relations',
            slug: 'blood-relations',
            title: 'Blood Relations & Family Trees',
            description: 'Family tree generation symbols, maternal vs paternal lineages, and coded relation statements.',
            estimatedMinutes: 12,
            notesMarkdown: `
# Blood Relations Strategy

---

## 1. Standard Notation
- Male: $[+]$ or Square
- Female: $[-]$ or Circle
- Marriage / Couple: Double line $\\iff$
- Siblings: Single horizontal line $-$
- Next Generation (Child): Vertical down arrow $\\downarrow$

---

## 2. Common Terminology
- Maternal Uncle: Mother's brother
- Paternal Aunt: Father's sister
- Nephew / Niece: Sibling's son / daughter
`,
            questions: [
              {
                id: 'br-1',
                question: 'Pointing to a photograph, a woman says: "His mother is the only daughter of my mother." How is the woman related to the person in the photo?',
                options: ['Mother', 'Aunt', 'Sister', 'Grandmother'],
                correct_option: 0,
                explanation: "Only daughter of the speaker's mother is the woman herself. Therefore, 'His mother is me', meaning she is his mother.",
              },
            ],
          },
          {
            id: 'coding-decoding',
            slug: 'coding-decoding-series',
            title: 'Coding-Decoding & Direction Sense',
            description: 'Letter shifts, reverse opposites (A-Z, B-Y), alphanumeric series, and 8-direction navigation paths.',
            estimatedMinutes: 14,
            notesMarkdown: `
# Coding-Decoding & Direction Sense

---

## 1. Reverse Letter Pairs (Sum = 27)
- A (1) <-> Z (26)
- B (2) <-> Y (25)
- C (3) <-> X (24)
- D (4) <-> W (23)
- E (5) <-> V (22) (LOVE)

---

## 2. Direction & Pythagoras
- Remember 8 directions: N, NE, E, SE, S, SW, W, NW.
- Shortest distance between start and finish = $\\sqrt{\\Delta x^2 + \\Delta y^2}$.
`,
            questions: [
              {
                id: 'cd-1',
                question: 'A person walks 3 km North, then turns right and walks 4 km. How far is the person from the starting point?',
                options: ['5 km', '7 km', '6 km', '4.5 km'],
                correct_option: 0,
                explanation: 'Using the Pythagorean theorem: distance = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5 km.',
              },
            ],
          },
        ],
      },
      {
        id: 'verbal-di',
        slug: 'verbal-and-data-interpretation',
        title: 'Verbal & Data Interpretation',
        description: 'Bar charts, pie charts, tables, reading comprehension, and analytical evaluation.',
        icon: 'Database',
        topics: [
          {
            id: 'data-interpretation',
            slug: 'data-interpretation-charts',
            title: 'Data Interpretation (Pie Charts, Tables & Bar Graphs)',
            description: 'Extracting key percentage shares, compound annual growth, and ratio metrics from dense datasets.',
            estimatedMinutes: 16,
            notesMarkdown: `
# Data Interpretation — Core Techniques

---

## 1. Pie Chart Degree Conversion
- $360^\\circ = 100\\%$
- $1\\% = 3.6^\\circ$
- To convert degrees $D$ to percentage: $P = \\frac{D}{3.6}$

---

## 2. Percentage Growth / Decline
$$\\text{Growth \\%} = \\left(\\frac{\\text{Final} - \\text{Initial}}{\\text{Initial}}\\right) \\times 100$$
`,
            questions: [
              {
                id: 'di-1',
                question: 'In a pie chart, a sector represents 72 degrees. What percentage of the total does this sector represent?',
                options: ['20%', '25%', '15%', '18%'],
                correct_option: 0,
                explanation: 'Percentage = (72 / 360) * 100 = 1/5 * 100 = 20%.',
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
    description: 'Concise interview revision summaries and question banks across Operating Systems, DBMS, Computer Networks, OOPs, and System Design.',
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
          {
            id: 'cpu-scheduling',
            slug: 'cpu-scheduling-algorithms',
            title: 'CPU Scheduling Algorithms',
            description: 'FCFS, SJF (Preemptive SRTF), Round Robin, Priority Scheduling, Convoy Effect, Gantt charts.',
            estimatedMinutes: 18,
            notesMarkdown: `
# CPU Scheduling Algorithms

---

## 1. Key Metrics
- **Turnaround Time (TAT):** Completion Time - Arrival Time.
- **Waiting Time (WT):** Turnaround Time - Burst Time.
- **Response Time:** Time from arrival until the first time the CPU is allocated.

---

## 2. Common Scheduling Algorithms
- **FCFS (First-Come, First-Served):** Non-preemptive. Suffers from **Convoy Effect** (short jobs wait behind long jobs).
- **SJF / SRTF (Shortest Job First):** Optimal average waiting time. Preemptive version is Shortest Remaining Time First (SRTF).
- **Round Robin (RR):** Preemptive based on Time Quantum $q$. If $q$ is too small, context switch overhead dominates; if too large, it degenerates into FCFS.
- **Multilevel Feedback Queue:** Dynamically demotes CPU-bound processes and promotes I/O-bound processes.
`,
            questions: [
              {
                id: 'os-4',
                question: 'Which CPU scheduling algorithm achieves the mathematically minimum average waiting time for a given set of stationary processes?',
                options: ['Round Robin', 'Shortest Job First (SJF)', 'Priority Scheduling', 'First Come First Served (FCFS)'],
                correct_option: 1,
                explanation: 'SJF is provably optimal because scheduling short jobs first reduces the waiting time of all subsequent jobs the most.',
              },
            ],
          },
          {
            id: 'memory-paging',
            slug: 'memory-management-and-paging',
            title: 'Virtual Memory, Paging & Page Replacement',
            description: 'Page tables, TLB hits/misses, page fault sequence, and replacement algorithms (FIFO, LRU, Optimal).',
            estimatedMinutes: 20,
            notesMarkdown: `
# Virtual Memory & Paging

---

## 1. Paging Architecture
- Virtual address is split into: **Page Number ($p$)** and **Offset ($d$)**.
- Page Table translates Page Number to **Frame Number ($f$)** in physical RAM.
- **TLB (Translation Lookaside Buffer):** Fast hardware cache storing recent virtual-to-physical address mappings.

---

## 2. Page Fault Handling
1. CPU references unmapped page (valid-invalid bit is 0 in page table).
2. Hardware traps to OS kernel (**Page Fault Interrupt**).
3. OS locates missing page on secondary storage (swap space).
4. OS brings page into a free frame (invoking replacement algorithm if full).
5. Updates page table and restarts the faulting instruction.

---

## 3. Page Replacement Algorithms
- **FIFO:** Suffers from **Belady's Anomaly** (more frames can produce more page faults).
- **LRU (Least Recently Used):** High practical performance, approximates optimal replacement.
- **Optimal (OPT):** Replaces the page that will not be used for the longest future period (benchmark theoretical).
`,
            questions: [
              {
                id: 'os-5',
                question: "Which page replacement algorithm can experience Belady's Anomaly, where increasing the number of page frames leads to more page faults?",
                options: ['Least Recently Used (LRU)', 'Optimal (OPT)', 'First-In, First-Out (FIFO)', 'Least Frequently Used (LFU)'],
                correct_option: 2,
                explanation: "FIFO does not satisfy the stack property, meaning the set of pages in memory for n frames is not guaranteed to be a subset of that for n+1 frames, causing Belady's Anomaly.",
              },
            ],
          },
          {
            id: 'ipc-synchronization',
            slug: 'ipc-and-synchronization',
            title: 'Process Synchronization & Semaphores',
            description: 'Race conditions, critical sections, Mutex vs Counting Semaphores, and classic sync problems.',
            estimatedMinutes: 16,
            notesMarkdown: `
# Process Synchronization & Semaphores

---

## 1. The Critical Section Problem
A valid solution must satisfy:
1. **Mutual Exclusion:** No two processes in critical section simultaneously.
2. **Progress:** If no process is in CS, selection of next process cannot be delayed indefinitely.
3. **Bounded Waiting:** A bound must exist on the number of times other processes enter CS after a request is made.

---

## 2. Mutex vs. Semaphore
- **Mutex (Mutual Exclusion):** Locking mechanism owned by a single thread (ownership).
- **Counting Semaphore:** Signaling mechanism integer $S$.
  - \`wait(S)\` / \`P(S)\`: Decrements $S$. Blocks if $S \\le 0$.
  - \`signal(S)\` / \`V(S)\`: Increments $S$. Wakes a waiting process.
`,
            questions: [
              {
                id: 'os-6',
                question: 'What is the primary operational difference between a Binary Semaphore and a Mutex?',
                options: [
                  'A mutex can only be locked/unlocked by the thread that acquired it (ownership)',
                  'A semaphore can only be used on single-core CPUs',
                  'A mutex cannot prevent race conditions',
                  'A binary semaphore uses hardware spinlocks only'
                ],
                correct_option: 0,
                explanation: 'A Mutex has an ownership concept: only the thread that locks it may unlock it. A semaphore is a signaling mechanism: any thread can invoke signal(S) to unblock a waiting thread.',
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
          {
            id: 'sql-joins-queries',
            slug: 'sql-joins-and-indexing',
            title: 'SQL Joins, Subqueries & Window Functions',
            description: 'Inner vs Outer joins, CROSS joins, GROUP BY vs HAVING, RANK vs DENSE_RANK.',
            estimatedMinutes: 18,
            notesMarkdown: `
# SQL Joins & Window Functions

---

## 1. Join Types
- **INNER JOIN:** Returns rows when there is a match in both tables.
- **LEFT (OUTER) JOIN:** Returns all rows from left table, and matched rows from right table (or NULL).
- **FULL OUTER JOIN:** Returns all rows when there is a match in either table.
- **CROSS JOIN:** Cartesian product of both tables ($M \\times N$ rows).

---

## 2. Window Functions
- **\`ROW_NUMBER()\`:** Unique sequential integer for every row within partition.
- **\`RANK()\`:** Assigns same rank to duplicates, leaving gaps (1, 2, 2, 4).
- **\`DENSE_RANK()\`:** Assigns same rank to duplicates without gaps (1, 2, 2, 3).
`,
            questions: [
              {
                id: 'db-4',
                question: 'In SQL, what is the difference between RANK() and DENSE_RANK() when two rows have equal values?',
                options: [
                  'RANK() skips the next ranking numbers after ties; DENSE_RANK() does not skip',
                  'DENSE_RANK() only works with numeric columns',
                  'RANK() requires an ORDER BY clause whereas DENSE_RANK() does not',
                  'They produce identical results in all SQL engines'
                ],
                correct_option: 0,
                explanation: 'If two rows tie for rank 1, RANK() gives 1, 1, 3 for the third row, while DENSE_RANK() gives 1, 1, 2.',
              },
            ],
          },
          {
            id: 'indexing-btree',
            slug: 'indexing-and-btree',
            title: 'Indexing & B/B+ Tree Data Structures',
            description: 'Clustered vs Non-Clustered index, leaf node linked lists, composite indexing, and index scans.',
            estimatedMinutes: 18,
            notesMarkdown: `
# Database Indexing & B+ Trees

---

## 1. Clustered vs. Non-Clustered Index
- **Clustered Index:**
  - Dictates the physical order of data rows on disk.
  - Exactly **one** clustered index per table (typically Primary Key).
  - Leaf nodes contain the actual table data pages.
- **Non-Clustered (Secondary) Index:**
  - Separate structure with pointers to the physical data rows (row IDs or clustered key).
  - Can have multiple non-clustered indexes on a table.

---

## 2. Why B+ Trees instead of Binary Trees?
- **High Fanout:** B+ tree nodes hold hundreds of keys, keeping tree height very shallow (3-4 levels) to minimize disk I/O.
- **Sequential Leaf Linking:** All leaf nodes in a B+ tree are doubly linked, allowing blazing-fast range queries (\`WHERE age BETWEEN 20 AND 30\`).
`,
            questions: [
              {
                id: 'db-5',
                question: 'Why are B+ trees preferred over standard B-trees for relational database indexes?',
                options: [
                  'B+ trees store data pointers in all nodes',
                  'All data pointers are stored only in the leaf nodes, which are linked for fast range scans',
                  'B+ trees require no balancing operations',
                  'B+ trees use less RAM during compilation'
                ],
                correct_option: 1,
                explanation: 'B+ tree internal nodes only store navigation keys (increasing fanout), and all leaf nodes form a contiguous linked list, making range queries extremely efficient with sequential disk reads.',
              },
            ],
          },
        ],
      },
      {
        id: 'cn',
        slug: 'computer-networks',
        title: 'Computer Networks',
        description: 'OSI model, TCP/IP handshake, DNS, HTTP/HTTPS, TLS, and routing protocols.',
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
          {
            id: 'osi-tcpip-model',
            slug: 'osi-and-tcpip-models',
            title: 'OSI vs. TCP/IP Architecture & Layer Responsibilities',
            description: 'The 7 OSI layers, encapsulation headers, PDUs (bits, frames, packets, segments), and protocols.',
            estimatedMinutes: 16,
            notesMarkdown: `
# OSI 7-Layer vs. TCP/IP Protocol Stack

---

## 1. OSI Layers & Protocol Data Units (PDUs)
1. **Application (Layer 7):** User interface and network services (HTTP, DNS, SMTP). PDU: **Data**.
2. **Presentation (Layer 6):** Data format, encryption/decryption, compression (SSL, TLS, JPEG).
3. **Session (Layer 5):** Manages sessions and checkpoints (RPC, NetBIOS).
4. **Transport (Layer 4):** End-to-end communication, flow control, port numbers (TCP, UDP). PDU: **Segment / Datagram**.
5. **Network (Layer 3):** Logical addressing and routing (IP, ICMP, OSPF, BGP). PDU: **Packet**.
6. **Data Link (Layer 2):** Physical addressing, MAC address, framing, error detection (Ethernet, ARP). PDU: **Frame**.
7. **Physical (Layer 1):** Bit streams across physical medium (Cables, fiber optics, radio). PDU: **Bits**.
`,
            questions: [
              {
                id: 'cn-2',
                question: 'At which OSI layer do routers primarily operate to make forwarding decisions based on destination IP addresses?',
                options: ['Data Link Layer (Layer 2)', 'Network Layer (Layer 3)', 'Transport Layer (Layer 4)', 'Session Layer (Layer 5)'],
                correct_option: 1,
                explanation: 'Routers inspect destination IP headers and consult routing tables at the Network Layer (Layer 3). Switches typically operate at Layer 2 (MAC addresses).',
              },
            ],
          },
          {
            id: 'dns-resolution',
            slug: 'dns-architecture-resolution',
            title: 'DNS Resolution Flow & Hierarchy',
            description: 'Recursive vs Iterative queries, Root servers, TLD servers, Authoritative servers, and DNS record types.',
            estimatedMinutes: 14,
            notesMarkdown: `
# DNS Resolution Architecture

---

## 1. Step-by-Step DNS Query Flow
When you type \`https://google.com\` in a browser:
1. Browser cache -> OS resolver cache -> Local Router cache.
2. Query sent to **Recursive Resolver** (e.g. ISP or \`8.8.8.8\`).
3. Recursive resolver queries **Root Nameserver (\`.\`)** -> Returns TLD server (\`.com\`).
4. Resolver queries **TLD Nameserver (\`.com\`)** -> Returns Authoritative nameserver for \`google.com\`.
5. Resolver queries **Authoritative Nameserver** -> Returns actual IP address (\`142.250.190.46\`).
6. Resolver caches response with TTL and returns IP to client.

---

## 2. Common DNS Record Types
- **A Record:** Maps domain name to IPv4 address.
- **AAAA Record:** Maps domain name to IPv6 address.
- **CNAME (Canonical Name):** Alias pointing one domain to another domain name.
- **MX Record:** Mail exchange server routing emails.
`,
            questions: [
              {
                id: 'cn-3',
                question: 'Which DNS record type is used to map an alias domain name to another domain name rather than directly to an IP address?',
                options: ['A Record', 'CNAME Record', 'MX Record', 'PTR Record'],
                correct_option: 1,
                explanation: 'CNAME (Canonical Name) creates an alias pointing to the canonical domain name.',
              },
            ],
          },
          {
            id: 'http-https-tls',
            slug: 'http-https-and-tls',
            title: 'HTTP/HTTPS, TLS Handshake & HTTP/2 vs HTTP/3',
            description: 'Asymmetric vs symmetric encryption, TLS handshake steps, multiplexing, and QUIC protocol.',
            estimatedMinutes: 16,
            notesMarkdown: `
# HTTP, HTTPS & TLS Handshake

---

## 1. Why HTTPS?
HTTP communicates in plaintext over port 80. HTTPS encrypts traffic using TLS (Transport Layer Security) over port 443, guaranteeing **Confidentiality, Integrity, and Authenticity**.

---

## 2. TLS 1.3 Handshake (1-RTT)
1. **ClientHello:** Supported cipher suites + Client Random + Key Share (Diffie-Hellman public key).
2. **ServerHello:** Selected cipher suite + Server Random + Server Key Share + Server Digital Certificate.
3. Both sides independently calculate the shared **Symmetric Session Key** without transmitting it across the wire.
4. Future communication uses fast symmetric encryption (AES-GCM).

---

## 3. Protocol Evolution
- **HTTP/1.1:** Head-of-line blocking at application level; one request per TCP connection at a time.
- **HTTP/2:** Binary framing layer, stream multiplexing over a single TCP connection.
- **HTTP/3:** Replaces TCP with **QUIC (UDP-based)**, eliminating transport-level head-of-line blocking during packet loss.
`,
            questions: [
              {
                id: 'cn-4',
                question: 'Which underlying transport protocol powers HTTP/3 to eliminate TCP head-of-line blocking?',
                options: ['SCTP', 'QUIC over UDP', 'IPsec', 'WebSocket over TLS'],
                correct_option: 1,
                explanation: 'HTTP/3 uses QUIC running over UDP, allowing independent multiplexed streams where packet loss on one stream does not stall other streams.',
              },
            ],
          },
        ],
      },
      {
        id: 'oops',
        slug: 'object-oriented-programming',
        title: 'OOPs & Design Patterns',
        description: 'The 4 OOP pillars, SOLID design principles, Singleton, Factory, Observer, and inheritance mechanisms.',
        icon: 'Code2',
        topics: [
          {
            id: 'oops-pillars',
            slug: 'four-pillars-of-oops',
            title: 'The 4 Pillars of OOP & Polymorphism',
            description: 'Encapsulation, Abstraction, Inheritance, Compile-time vs Runtime Polymorphism, and Virtual Tables.',
            estimatedMinutes: 18,
            notesMarkdown: `
# The 4 Core Pillars of OOP

---

## 1. Encapsulation
Bundling data (attributes) and methods that operate on that data into a single unit (class), while restricting direct access using access specifiers (\`private\`, \`protected\`, \`public\`).

---

## 2. Abstraction
Hiding internal implementation details and exposing only the essential interface to the user. Achieved via **Abstract Classes** and **Interfaces**.

---

## 3. Inheritance
Mechanism where a subclass inherits properties and behaviors from a parent class (IS-A relationship), promoting code reuse.

---

## 4. Polymorphism
Ability of an object to take on many forms:
- **Compile-time (Static) Polymorphism:** Method Overloading and Operator Overloading. Resolved at compile time.
- **Run-time (Dynamic) Polymorphism:** Method Overriding. Resolved at runtime using **vtable (Virtual Method Table)** and **vptr**.
`,
            questions: [
              {
                id: 'oop-1',
                question: 'In C++ and Java, how does the runtime engine determine which overridden method implementation to execute for a polymorphic base pointer/reference?',
                options: [
                  'Using the compiler symbol table',
                  'Using the virtual method table (vtable) and virtual pointer (vptr)',
                  'By recompiling bytecode at runtime',
                  'By examining thread local storage'
                ],
                correct_option: 1,
                explanation: 'Each class with virtual/overridden methods has a vtable containing pointers to the most derived implementations. Each object instance stores a hidden vptr pointing to its class vtable.',
              },
            ],
          },
          {
            id: 'solid-principles',
            slug: 'solid-principles',
            title: 'SOLID Design Principles with Code Patterns',
            description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
            estimatedMinutes: 20,
            notesMarkdown: `
# SOLID Design Principles

Five essential principles for architecting maintainable, scalable object-oriented software.

---

## 1. Single Responsibility Principle (SRP)
A class should have **one, and only one, reason to change**. Avoid "God Objects".

---

## 2. Open/Closed Principle (OCP)
Software entities should be **open for extension, but closed for modification**. Use polymorphism and interfaces instead of sprawling \`if/switch\` branches.

---

## 3. Liskov Substitution Principle (LSP)
Subtypes must be substitutable for their base types without altering program correctness (e.g. Classic violation: \`Square\` subclassing \`Rectangle\`).

---

## 4. Interface Segregation Principle (ISP)
Clients should not be forced to depend upon interfaces that they do not use. Prefer many small, cohesive interfaces over one fat interface.

---

## 5. Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details.
`,
            questions: [
              {
                id: 'oop-2',
                question: 'Which SOLID principle is violated when a Square class inherits from a Rectangle class and overrides setWidth/setHeight in a way that breaks caller expectations?',
                options: [
                  'Single Responsibility Principle (SRP)',
                  'Liskov Substitution Principle (LSP)',
                  'Open/Closed Principle (OCP)',
                  'Interface Segregation Principle (ISP)'
                ],
                correct_option: 1,
                explanation: 'LSP requires that derived classes preserve the behavioral invariants of base classes. A Square altering width when height is set violates the independent dimension contract of Rectangle.',
              },
            ],
          },
          {
            id: 'design-patterns',
            slug: 'essential-design-patterns',
            title: 'Essential Gang of Four (GoF) Design Patterns',
            description: 'Singleton (thread safety), Factory Method, Observer (Pub/Sub), Adapter, and Strategy patterns.',
            estimatedMinutes: 18,
            notesMarkdown: `
# High-Frequency Design Patterns

---

## 1. Creational Patterns
- **Singleton:** Guarantees a class has only one instance and provides a global point of access. (Use double-checked locking with \`volatile\` in multi-threaded Java).
- **Factory Method:** Defines an interface for creating objects, letting subclasses decide which class to instantiate.

---

## 2. Structural Patterns
- **Adapter:** Converts the interface of a class into another interface clients expect (wrapper).
- **Decorator:** Attaches additional responsibilities to an object dynamically without subclassing.

---

## 3. Behavioral Patterns
- **Observer:** One-to-many dependency where state changes automatically notify all subscribed dependents (event emitters).
- **Strategy:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.
`,
            questions: [
              {
                id: 'oop-3',
                question: 'Which design pattern is best suited for decoupling an event producer from multiple subscribers that need to update automatically when state changes?',
                options: ['Observer Pattern', 'Singleton Pattern', 'Adapter Pattern', 'Factory Method Pattern'],
                correct_option: 0,
                explanation: 'The Observer pattern defines a one-to-many relationship where subjects notify registered observers of state changes without knowing their concrete types.',
              },
            ],
          },
        ],
      },
      {
        id: 'system-design',
        slug: 'system-design-fundamentals',
        title: 'System Design Fundamentals',
        description: 'High-level architectures, load balancing, caching tiers, database replication, and message queues.',
        icon: 'Cpu',
        topics: [
          {
            id: 'scaling-load-balancing',
            slug: 'scaling-and-load-balancing',
            title: 'Scaling Strategies & Load Balancing',
            description: 'Vertical vs Horizontal scaling, stateless architecture, Layer 4 vs Layer 7 load balancers, and Consistent Hashing.',
            estimatedMinutes: 20,
            notesMarkdown: `
# Scaling & Load Balancing Fundamentals

---

## 1. Vertical vs. Horizontal Scaling
- **Vertical Scaling (Scale-Up):** Adding more CPU/RAM to a single machine. Hard hardware ceiling and single point of failure (SPOF).
- **Horizontal Scaling (Scale-Out):** Adding more commodity machines to the pool. Requires stateless application tiers.

---

## 2. Load Balancers (L4 vs L7)
- **Layer 4 (Transport):** Routes traffic based on IP address and port (TCP/UDP level) without inspecting application payloads. Ultra-low latency.
- **Layer 7 (Application):** Inspects HTTP headers, cookies, and URL paths. Can route \`/api/video\` and \`/api/auth\` to specialized worker clusters.

---

## 3. Consistent Hashing
Maps servers and keys to a virtual ring ($0 \\dots 2^{32}-1$). When a server node is added or removed, only $K/N$ keys need remapping on average, preventing cache stampedes.
`,
            questions: [
              {
                id: 'sd-1',
                question: 'Why is Consistent Hashing preferred over simple hash modulo (hash(key) % N) in distributed caching clusters?',
                options: [
                  'Consistent hashing guarantees zero hash collisions',
                  'When nodes are added or removed, only a small fraction (K/N) of keys need remapping, avoiding massive cache invalidation',
                  'Consistent hashing runs in O(1) space across all nodes',
                  'It encrypts cached data automatically'
                ],
                correct_option: 1,
                explanation: 'In simple modulo hashing, changing N shifts almost 100% of keys to new servers, causing complete cache stampedes. Consistent hashing minimizes remapped keys to K/N.',
              },
            ],
          },
          {
            id: 'caching-strategies',
            slug: 'caching-strategies-and-eviction',
            title: 'Caching Strategies & Eviction Policies',
            description: 'Cache-Aside, Write-Through, Write-Behind, eviction policies (LRU, LFU), and Redis in-memory storage.',
            estimatedMinutes: 18,
            notesMarkdown: `
# Caching Strategies & Eviction Policies

---

## 1. Caching Access Patterns
- **Cache-Aside (Lazy Loading):** App queries cache first. On miss, queries DB, populates cache, and returns. Good for read-heavy workloads.
- **Write-Through:** App writes to cache, and cache synchronously writes to DB before returning success. Higher write latency, but ensures consistency.
- **Write-Behind (Write-Back):** App writes to cache immediately; cache asynchronously batches updates to DB. Fastest writes, risk of data loss on crash.

---

## 2. Eviction Policies
- **LRU (Least Recently Used):** Discards least recently accessed items using a Doubly Linked List + HashMap.
- **LFU (Least Frequently Used):** Discards items with the lowest access count frequency.
- **TTL (Time to Live):** Keys expire after a predefined duration.
`,
            questions: [
              {
                id: 'sd-2',
                question: 'Which caching strategy offers the lowest write latency to the client but carries a risk of data loss if the cache crashes before syncing?',
                options: ['Cache-Aside', 'Write-Through', 'Write-Behind (Write-Back)', 'Read-Through'],
                correct_option: 2,
                explanation: 'Write-Behind acknowledges writes immediately after writing to volatile cache memory, delaying asynchronous persistence to the database.',
              },
            ],
          },
        ],
      },
    ],
  },
};
