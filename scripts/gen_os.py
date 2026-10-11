import json
import urllib.parse

def make_yt_url(title, subject="Operating Systems OS GATE"):
    q = f"{title} {subject} lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(q)}"

with open("scripts/existing_curriculum.json", encoding="utf-8") as f:
    existing = json.load(f)

existing_os_topics = {}
for cat in existing["core-cs"]["categories"]:
    if cat["id"] == "os":
        for t in cat["topics"]:
            existing_os_topics[t["id"]] = t

# The 17 topics requested by user
# We'll map existing topics to their corresponding slot:
# 1. OS Structures and System Calls -> maps to existing 'system-calls-linux'
# 2. Processes and Threads -> maps to existing 'process-thread'
# 3. Process States and Process Control Blocks -> NEW
# 4. CPU Scheduling Algorithms -> maps to existing 'cpu-scheduling'
# 5. Inter-Process Communication (IPC) -> NEW
# 6. Process Synchronization -> NEW
# 7. Critical Sections, Semaphores, and Mutexes -> maps to existing 'ipc-synchronization'
# 8. Classical Synchronization Problems -> NEW
# 9. Deadlocks: Prevention, Avoidance, Detection -> maps to existing 'deadlocks'
# 10. Memory Management -> NEW
# 11. Paging and Segmentation -> maps to existing 'memory-paging'
# 12. Virtual Memory and Demand Paging -> NEW
# 13. Page Replacement Algorithms -> NEW
# 14. File Systems and Directory Structures -> NEW
# 15. Disk Scheduling -> maps to existing 'disk-scheduling'
# 16. I/O Management -> NEW
# 17. Protection and Security Basics -> NEW

new_os_topics = [
    {
        "id": "os-structures-and-system-calls",
        "slug": "os-structures-and-system-calls",
        "title": "OS Structures and System Calls",
        "description": "Operating system architecture (Monolithic, Microkernel, Layered, Hybrid), dual-mode operation (User vs Kernel Mode), trap instructions, and system calls execution flow.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Microsoft", "Google", "Amazon", "Linux Foundation"],
        "keyTakeaways": [
            "Dual-Mode Operation: Mode bit distinguishes User mode (1) from Kernel/Privileged mode (0).",
            "System Calls: Software interrupts (traps) that transfer execution from user space to kernel space.",
            "Microkernel: Minimal kernel providing IPC, basic memory, and low-level scheduling; device drivers and file systems run in user space.",
            "Monolithic Kernel: Entire OS runs in a single address space in kernel mode, offering high performance."
        ],
        "notesMarkdown": """# OS Structures and System Calls

---

## 1. Dual-Mode Operation & Hardware Protection
To protect hardware and system resources against buggy or malicious programs, modern CPUs provide dual-mode execution:
- **User Mode (Mode bit = 1):** Unprivileged mode where user applications execute. Direct hardware access and privileged instructions are prohibited.
- **Kernel / Supervisor Mode (Mode bit = 0):** Privileged mode where OS core executes with unrestricted access to memory and machine instructions.

### Switching Modes via Traps (System Calls)
1. User application calls an OS API (e.g., `read()`, `fork()`, `open()`).
2. Library stub executes a **trap / software interrupt** instruction (e.g., `syscall` on x86-64).
3. CPU hardware switches mode bit from `1` to `0` and branches to the **Interrupt Descriptor Table (IDT)** system call handler.
4. Kernel validates arguments, performs privileged work, sets mode bit back to `1`, and returns (`sysret`).

---

## 2. Kernel Architectures
- **Monolithic Kernel:** All OS services (VFS, IPC, network stack, drivers) run in kernel space. High execution speed, but single driver crash can crash the system (Linux, Windows NT core).
- **Microkernel:** Only essential services (IPC, basic scheduling, virtual memory paging primitives) remain in kernel mode. File systems and drivers run as user-mode servers (Mach, Minix, QNX). Highly fault-tolerant and modular, but context switching overhead is higher.
""",
        "questions": [
            {
                "id": "os-sys-1",
                "question": "What hardware mechanism switches the CPU from User Mode to Kernel Mode during a system call?",
                "options": ["A hardware timer expiration", "A software interrupt / trap instruction", "A page fault exception", "Direct Memory Access (DMA) signal"],
                "correct_option": 1,
                "explanation": "Software traps (such as 'syscall' or 'int 0x80') trigger an atomic hardware transition to kernel mode and jump to the kernel trap handler."
            },
            {
                "id": "os-sys-2",
                "question": "What is the primary architectural trade-off of a Microkernel compared to a Monolithic kernel?",
                "options": [
                    "Microkernels are faster but lack modularity",
                    "Microkernels offer higher reliability and isolation at the expense of IPC context-switch overhead",
                    "Microkernels run all device drivers in kernel mode",
                    "Microkernels cannot support virtual memory"
                ],
                "correct_option": 1,
                "explanation": "Because drivers and file systems run as isolated user processes, microkernels isolate faults, but IPC message passing incurs context switching overhead."
            }
        ]
    },
    {
        "id": "os-process-states-and-pcb",
        "slug": "process-states-and-process-control-blocks",
        "title": "Process States and Process Control Blocks",
        "description": "5-state and 7-state process lifecycle models, Process Control Block (PCB) structure, context switching mechanics, and process scheduling queues.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Amazon", "Cisco", "Qualcomm", "Oracle"],
        "keyTakeaways": [
            "Process States: New, Ready, Running, Waiting (Blocked), Terminated.",
            "PCB (Process Control Block): Task struct containing PID, Program Counter, CPU registers, memory limits, and open file descriptors.",
            "Context Switch: Saving CPU state of active process to its PCB and restoring state of scheduled process from its PCB.",
            "Scheduling Queues: Job Queue, Ready Queue, and Device/I/O Wait Queues."
        ],
        "notesMarkdown": """# Process States and Process Control Blocks (PCB)

---

## 1. Process Lifecycle (5-State Model)
```text
           [Admitted]
  [New] --------------> [Ready] <------------+
                          |   ^               |
            [Scheduler]   |   | [Preemption/  | [I/O Complete]
                          v   |  Time Slice]  |
                       [Running]              |
                          |                   |
            [I/O Request] |                   |
                          v                   |
                       [Waiting / Blocked] ---+
                          |
             [Exit]       v
       [Running] ---> [Terminated]
```

---

## 2. Process Control Block (PCB)
The OS maintains an internal data structure for each process (e.g., `struct task_struct` in Linux):
- **PID:** Process Identifier.
- **Process State:** Current state (Ready, Running, Blocked, etc.).
- **Program Counter (PC):** Address of next machine instruction.
- **CPU Registers:** Accumulator, index registers, stack pointer ($SP$).
- **Memory Management Information:** Page tables, segment tables, base and limit registers.
- **Accounting & I/O Status:** CPU time consumed, open file descriptor table.
""",
        "questions": [
            {
                "id": "os-pcb-1",
                "question": "When a running process makes an I/O system call, to which state is it transitioned by the OS scheduler?",
                "options": ["Ready", "Waiting (Blocked)", "Terminated", "Suspended Ready"],
                "correct_option": 1,
                "explanation": "The process cannot continue CPU execution until the requested I/O completes, so it transitions to the Waiting / Blocked state."
            },
            {
                "id": "os-pcb-2",
                "question": "Which of the following information is NOT stored inside a Process Control Block (PCB)?",
                "options": ["Program Counter (PC)", "Open File Descriptor Table", "CPU Cache Memory Size", "CPU Register context"],
                "correct_option": 2,
                "explanation": "CPU cache size is a global hardware parameter, not process-specific state information stored within an individual PCB."
            }
        ]
    },
    {
        "id": "os-ipc",
        "slug": "inter-process-communication",
        "title": "Inter-Process Communication (IPC)",
        "description": "Mechanisms for process communication: Shared Memory vs Message Passing, Pipes (anonymous & named/FIFOs), Message Queues, Sockets, and Signals.",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Google", "Bloomberg", "Goldman Sachs", "Uber"],
        "keyTakeaways": [
            "Shared Memory: Fastest IPC; processes map identical physical memory pages; requires synchronization (mutex/semaphore) to prevent race conditions.",
            "Message Passing: OS-mediated message exchange (send/receive primitives); useful for distributed systems and smaller data packets.",
            "Pipes: Unidirectional byte stream; anonymous pipes for related processes (parent-child); named pipes (FIFOs) for unrelated processes.",
            "Signals: Asynchronous notification mechanism sent to a process (e.g., SIGINT, SIGKILL, SIGSEGV)."
        ],
        "notesMarkdown": """# Inter-Process Communication (IPC)

---

## 1. Shared Memory vs. Message Passing
- **Shared Memory:**
  - A region of physical RAM is mapped into the virtual address spaces of two or more processes.
  - Zero-copy data exchange makes it the **fastest** IPC model.
  - Requires explicit synchronization (mutexes, semaphores) to avoid race conditions.
- **Message Passing:**
  - Kernel provides system calls: `send(message)` and `receive(message)`.
  - Kernel buffers and copies messages between address spaces.
  - Slower due to system call overhead, but natural across distributed networked machines.

---

## 2. Pipes & Signals in Unix
- **Anonymous Pipe (`pipe()`):** Unidirectional byte channel between related processes (e.g. parent and child after `fork()`).
- **Named Pipe (`FIFO`):** Bidirectional or unidirectional persistent file in filesystem accessible by arbitrary unrelated processes.
- **Unix Signals:** Asynchronous alerts delivered by kernel (`SIGINT` Ctrl+C, `SIGKILL` 9, `SIGTERM` 15, `SIGSEGV` segmentation fault).
""",
        "questions": [
            {
                "id": "os-ipc-1",
                "question": "Why is shared memory generally faster than message passing for inter-process communication?",
                "options": [
                    "It bypasses the kernel for subsequent data reads and writes after initial setup",
                    "It does not require mutual exclusion",
                    "It uses hardware DMA controllers for all operations",
                    "It automatically serializes objects into JSON"
                ],
                "correct_option": 0,
                "explanation": "Once shared memory pages are mapped into process virtual spaces, data transfers occur at RAM speeds without kernel transitions or buffer copying."
            },
            {
                "id": "os-ipc-2",
                "question": "Which Unix IPC mechanism allows communication between two unrelated processes that do not share a common ancestor?",
                "options": ["Anonymous Pipe", "Named Pipe (FIFO)", "Ordinary Pipe via pipe()", "Environment variables"],
                "correct_option": 1,
                "explanation": "Named pipes (FIFOs) exist as directory entries in the filesystem, allowing any process with file permissions to open and communicate through them."
            }
        ]
    },
    {
        "id": "os-process-synchronization-fundamentals",
        "slug": "process-synchronization",
        "title": "Process Synchronization",
        "description": "Race conditions, critical section problem, three criteria for valid synchronization solutions (Mutual Exclusion, Progress, Bounded Waiting), and Peterson's Algorithm.",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Microsoft", "Intel", "Adobe"],
        "keyTakeaways": [
            "Race Condition: Outcome depends on non-deterministic order of execution/context switches.",
            "Critical Section: Code section accessing shared mutable resources.",
            "3 Mandatory Criteria: Mutual Exclusion (only 1 inside), Progress (no outside thread blocks entry), Bounded Waiting (finite bound on wait time).",
            "Peterson's Algorithm: Classic 2-process software synchronization using flag array and turn variable."
        ],
        "notesMarkdown": """# Process Synchronization Fundamentals

---

## 1. Race Conditions & The Critical Section
A **Race Condition** occurs when multiple processes access and manipulate shared data concurrently, and the final outcome depends on the order of execution.

### The 3 Core Requirements for a Valid Solution:
1. **Mutual Exclusion:** If process $P_i$ is executing in its critical section, no other processes can be executing in their critical sections.
2. **Progress:** If no process is executing in its critical section and some processes wish to enter, only those processes not executing in their remainder sections can participate in deciding who enters next.
3. **Bounded Waiting:** A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter, preventing starvation.

---

## 2. Peterson's Solution (2 Processes)
```c
// Process i:
flag[i] = true;
turn = j;
while (flag[j] && turn == j); // Busy wait

// --- CRITICAL SECTION ---

flag[i] = false; // Remainder section
```
- Proves all 3 criteria (Mutual Exclusion, Progress, Bounded Waiting) for two processes.
""",
        "questions": [
            {
                "id": "os-sync-1",
                "question": "Which of the following is NOT one of the three mandatory criteria for solving the Critical Section problem?",
                "options": ["Mutual Exclusion", "Progress", "Bounded Waiting", "Strict Alternation"],
                "correct_option": 3,
                "explanation": "Strict alternation violates the Progress requirement because a process outside the critical section can prevent another process from entering."
            },
            {
                "id": "os-sync-2",
                "question": "In Peterson's algorithm, why does process i set 'turn = j' immediately after setting 'flag[i] = true'?",
                "options": [
                    "To surrender priority to process j if both simultaneously request entry, breaking symmetry and ensuring mutual exclusion",
                    "To reset process j's priority",
                    "To notify the kernel trap handler",
                    "To release the semaphore"
                ],
                "correct_option": 0,
                "explanation": "Setting 'turn = j' graciously yields the turn to process j. If both set flags simultaneously, only one turn value persists, resolving the tie cleanly."
            }
        ]
    },
    {
        "id": "os-classical-synchronization-problems",
        "slug": "classical-synchronization-problems",
        "title": "Classical Synchronization Problems",
        "description": "Producer-Consumer (Bounded Buffer), Readers-Writers (Reader Preference, Writer Preference), Dining Philosophers (Deadlock avoidance), and Sleeping Barber problems.",
        "estimatedMinutes": 25,
        "difficulty": "Hard",
        "companyTags": ["Google", "Amazon", "Microsoft", "Meta"],
        "keyTakeaways": [
            "Producer-Consumer: Uses full, empty counting semaphores and mutex for buffer lock.",
            "Readers-Writers: Distinguishes shared reads from exclusive writes; naive solutions can cause writer starvation.",
            "Dining Philosophers: Models resource contention; naive chopstick acquisition creates circular wait deadlock.",
            "Deadlock Avoidance in Philosophers: Resource hierarchy (asymmetric pickup), limits on concurrent eaters, or test-and-set."
        ],
        "notesMarkdown": """# Classical Synchronization Problems

---

## 1. Producer-Consumer (Bounded Buffer)
- **Shared Buffer:** Size $N$.
- **Semaphores:**
  - `mutex = 1` (binary semaphore for mutual exclusion on buffer).
  - `empty = N` (counting semaphore tracking free slots).
  - `full = 0` (counting semaphore tracking populated slots).

```c
// Producer:
wait(empty);
wait(mutex);
// Add item to buffer
signal(mutex);
signal(full);

// Consumer:
wait(full);
wait(mutex);
// Remove item from buffer
signal(mutex);
signal(empty);
```

---

## 2. Readers-Writers Problem
- Multiple readers can read simultaneously.
- Only one writer can write at a time (exclusive access).
- **First Readers-Writers Solution:** Prioritizes readers; if readers arrive continuously, writers suffer starvation.

---

## 3. Dining Philosophers Problem
Five philosophers sitting around a circular table with 5 chopsticks:
- Naive algorithm: Each picks left chopstick, then right chopstick $\\implies$ **Deadlock!** (Circular wait).
- **Solutions:**
  1. Pick both chopsticks only if both are available (`test` state).
  2. Asymmetric philosopher: Odd philosophers pick left first; even philosophers pick right first.
""",
        "questions": [
            {
                "id": "os-csp-1",
                "question": "In the Bounded Buffer producer-consumer problem, what happens if the producer executes 'wait(mutex)' BEFORE 'wait(empty)' when the buffer is full?",
                "options": [
                    "The program executes normally",
                    "Deadlock occurs: Producer holds mutex while waiting for empty slot, preventing consumer from ever acquiring mutex to free a slot",
                    "Data corruption occurs in the buffer",
                    "The consumer terminates with an exception"
                ],
                "correct_option": 1,
                "explanation": "If buffer is full, wait(empty) blocks. If producer already holds mutex, consumer cannot acquire mutex to consume items, causing mutual deadlock."
            },
            {
                "id": "os-csp-2",
                "question": "How can deadlock be avoided in the Dining Philosophers problem using resource hierarchy?",
                "options": [
                    "By adding a 6th chopstick",
                    "By numbering chopsticks 1 to 5 and requiring philosophers to always acquire the lower-numbered chopstick first",
                    "By running philosophers on separate cores",
                    "By making all chopsticks shared between readers"
                ],
                "correct_option": 1,
                "explanation": "Imposing a strict total ordering on resources and acquiring them in ascending order breaks the Circular Wait condition of Coffman."
            }
        ]
    },
    {
        "id": "os-memory-management-fundamentals",
        "slug": "memory-management",
        "title": "Memory Management",
        "description": "Contiguous memory allocation, base and limit registers, fixed and variable partitioning, fragmentation (internal vs external), compaction, and allocation algorithms (First Fit, Best Fit, Worst Fit).",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Intel", "Qualcomm", "Cisco", "Infosys"],
        "keyTakeaways": [
            "Internal Fragmentation: Allocated memory block is larger than requested process size; wasted space inside partition.",
            "External Fragmentation: Total free memory is sufficient to satisfy request, but storage is fragmented into non-contiguous chunks.",
            "Compaction: Relocating memory blocks to combine free holes into one large block; requires dynamic execution-time address binding.",
            "First Fit: Fastest; allocates first hole large enough. Best Fit: Smallest sufficient hole; leaves smallest leftover fragments."
        ],
        "notesMarkdown": """# Memory Management & Partitioning

---

## 1. Fragmentation
- **Internal Fragmentation:** Memory internal to a partition that is unused. Occurs in fixed-sized partitioning or paging.
- **External Fragmentation:** Total free memory is large enough to fulfill an allocation request, but cannot be satisfied because free memory is split into non-contiguous fragments. Occurs in variable-size dynamic partitioning.

---

## 2. Dynamic Storage-Allocation Algorithms
1. **First Fit:** Allocate the first hole that is big enough. Fast search; good overall memory utilization.
2. **Best Fit:** Search entire list to find the smallest hole that is big enough. Produces smallest leftover fragments.
3. **Worst Fit:** Search entire list and allocate the largest hole. Leaves the largest residual hole, but slow and generally performs poorly.
""",
        "questions": [
            {
                "id": "os-mm-1",
                "question": "Which type of memory fragmentation is inherent in fixed-size memory partitioning?",
                "options": ["External fragmentation only", "Internal fragmentation only", "Both external and internal fragmentation equally", "Neither fragmentation occurs"],
                "correct_option": 1,
                "explanation": "When processes are loaded into fixed-size partitions larger than their requested memory, the unused space inside the partition is internal fragmentation."
            },
            {
                "id": "os-mm-2",
                "question": "What is the primary drawback of the Worst Fit dynamic storage allocation algorithm?",
                "options": [
                    "It searches the entire free list and breaks down large blocks needed for huge upcoming processes",
                    "It causes infinite loops in kernel memory",
                    "It cannot allocate blocks smaller than 4KB",
                    "It requires execution in kernel mode only"
                ],
                "correct_option": 0,
                "explanation": "Worst Fit searches the full list and breaks up largest available memory blocks, rapidly depleting large continuous chunks needed for major processes."
            }
        ]
    },
    {
        "id": "os-virtual-memory-and-demand-paging",
        "slug": "virtual-memory-and-demand-paging",
        "title": "Virtual Memory and Demand Paging",
        "description": "Virtual memory concepts, Demand Paging, valid-invalid bit, Page Fault handling routine, Effective Access Time (EAT), and Thrashing.",
        "estimatedMinutes": 22,
        "difficulty": "Hard",
        "companyTags": ["Google", "Amazon", "Microsoft", "Apple"],
        "keyTakeaways": [
            "Virtual Memory: Allows execution of processes not completely loaded in physical RAM.",
            "Demand Paging: Pages are loaded into RAM only upon access (lazy swapper).",
            "Page Fault: Hardware trap triggered when accessing a page marked invalid (not currently in physical RAM).",
            "Effective Access Time (EAT): EAT = (1 - p) * Memory_Access + p * Page_Fault_Service_Time.",
            "Thrashing: System spends more time servicing page faults than executing instructions; occurs when sum of working sets exceeds physical RAM."
        ],
        "notesMarkdown": """# Virtual Memory & Demand Paging

---

## 1. Demand Paging & Page Fault Routine
1. Process attempts to access a virtual memory address.
2. MMU checks Page Table entry. If **valid-invalid bit is 0 (invalid)**:
   - Hardware generates a **Page Fault trap** to OS.
3. OS checks internal PCB table:
   - If illegal address $\\implies$ Terminate process (`SIGSEGV`).
   - If valid reference $\\implies$ Find free physical frame.
4. Issue disk I/O to read page from backing store into allocated frame.
5. While I/O runs, CPU context switches to another ready process.
6. Disk controller signals completion via interrupt.
7. OS updates Page Table: marks bit valid (1) and records frame number.
8. Restart the instruction that triggered the page fault.

---

## 2. Effective Access Time (EAT)
Let $p$ be the page fault rate ($0 \\le p \\le 1$):
$$\\text{EAT} = (1 - p) \\times t_{\\text{mem}} + p \\times t_{\\text{fault}}$$
Since $t_{\\text{fault}} \\approx 5\\text{–}10\\text{ ms}$ while $t_{\\text{mem}} \\approx 100\\text{ ns}$, even a tiny fault rate $p = 0.001$ degrades performance dramatically.

---

## 3. Thrashing
When processes lack sufficient frames, they continuously page fault. CPU utilization plummets, causing the OS to admit more processes, worsening the cycle. Resolved by the **Working Set Model**.
""",
        "questions": [
            {
                "id": "os-vm-1",
                "question": "If memory access time is 100 ns and page fault service time is 10 ms (10,000,000 ns), what is the maximum permissible page fault rate to keep EAT within 200 ns?",
                "options": ["p < 0.00001 (1 in 100,000)", "p < 0.001", "p < 0.01", "p < 0.0000001"],
                "correct_option": 0,
                "explanation": "200 = (1-p)*100 + p*10,000,000 => 100 + p*(9,999,900) = 200 => p = 100 / 10,000,000 = 0.00001 (1 in 100,000)."
            },
            {
                "id": "os-vm-2",
                "question": "What is the primary cause of Thrashing in an operating system?",
                "options": [
                    "A fast disk drive coupled with a slow CPU",
                    "Total sum of working set sizes of all active processes exceeds available physical memory frames",
                    "Too many threads using spinlocks",
                    "Inadequate swap space size on disk"
                ],
                "correct_option": 1,
                "explanation": "When total active process working sets exceed physical memory, frames are constantly swapped in and out, degrading CPU throughput to near zero."
            }
        ]
    },
    {
        "id": "os-page-replacement-algorithms",
        "slug": "page-replacement-algorithms",
        "title": "Page Replacement Algorithms",
        "description": "Page replacement policies: FIFO, Belady's Anomaly, Optimal (OPT/MIN), Least Recently Used (LRU), Clock algorithm, and Counting algorithms (LFU/MFU).",
        "estimatedMinutes": 25,
        "difficulty": "Hard",
        "companyTags": ["Microsoft", "Google", "Amazon", "Oracle"],
        "keyTakeaways": [
            "FIFO: Replaces oldest loaded page; suffers from Belady's Anomaly (more frames -> more page faults).",
            "Optimal (OPT): Replaces page that will not be used for longest time in future; lowest possible fault rate; impossible in practice.",
            "LRU: Replaces page unused for longest time in the past; stack algorithm (immune to Belady's Anomaly).",
            "Clock Algorithm (Second Chance): Practical FIFO approximation of LRU using a reference bit and cyclic pointer."
        ],
        "notesMarkdown": """# Page Replacement Algorithms

---

## 1. Algorithm Comparisons
- **FIFO (First-In, First-Out):**
  - Replaces page that entered memory earliest.
  - **Belady's Anomaly:** For some reference strings, increasing the number of page frames results in *more* page faults instead of fewer!
- **Optimal (OPT / MIN):**
  - Replace the page that will not be accessed for the longest period of time.
  - Used as an empirical benchmark; impossible in real OS because it requires future knowledge.
- **LRU (Least Recently Used):**
  - Replaces the page that has not been accessed for the longest time in the past.
  - Belongs to **Stack Algorithms**: Memory with $N$ frames is always a subset of memory with $N+1$ frames $\\implies$ Immune to Belady's Anomaly.
- **Clock Algorithm (Second Chance):**
  - FIFO queue organized as circular list with a reference bit $R$.
  - If $R = 1$, set $R = 0$ and advance pointer. If $R = 0$, select frame for replacement.
""",
        "questions": [
            {
                "id": "os-pra-1",
                "question": "Which page replacement algorithm can exhibit Belady's Anomaly?",
                "options": ["Least Recently Used (LRU)", "Optimal Algorithm (OPT)", "First-In, First-Out (FIFO)", "Working Set Model"],
                "correct_option": 2,
                "explanation": "FIFO is not a stack algorithm, meaning an increase in frame allocation can paradoxically cause an increase in page faults."
            },
            {
                "id": "os-pra-2",
                "question": "How does the Clock (Second Chance) page replacement algorithm utilize the reference bit?",
                "options": [
                    "Pages with reference bit 1 are immediately evicted",
                    "Pages with reference bit 1 are given a second chance, bit cleared to 0, and pointer advances; page with bit 0 is replaced",
                    "Reference bit is inverted on every CPU cycle",
                    "It counts the frequency of page hits"
                ],
                "correct_option": 1,
                "explanation": "If the reference bit is 1, the page has been accessed recently; the clock hand clears it to 0 and checks the next frame. A page with bit 0 is replaced."
            }
        ]
    },
    {
        "id": "os-file-systems-and-directory-structures",
        "slug": "file-systems-and-directory-structures",
        "title": "File Systems and Directory Structures",
        "description": "File concepts, access methods (sequential, direct), directory structures (single-level, two-level, tree, acyclic graph), file allocation methods (contiguous, linked, indexed), and Inodes.",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Microsoft", "Linux Foundation", "Red Hat"],
        "keyTakeaways": [
            "File Allocation Methods: Contiguous (fast, external fragmentation), Linked (no external fragmentation, slow random access), Indexed (supports fast direct access without external fragmentation).",
            "Unix Inode: Contains file metadata, direct block pointers, single indirect, double indirect, and triple indirect pointers.",
            "Hard Links vs Soft Links (Symlinks): Hard links point directly to the inode (same inode number); Soft links are files pointing to path strings.",
            "Directory implementation: Linear list vs Hash table."
        ],
        "notesMarkdown": """# File Systems & Inodes

---

## 1. File Allocation Methods
| Allocation Method | Sequential Access | Random Access | Fragmentation Issues |
|---|---|---|---|
| **Contiguous** | Extremely Fast | Fast | Severe External Fragmentation |
| **Linked List** | Good | Very Poor ($O(N)$ pointer traversal) | Internal Fragmentation at block ends |
| **Indexed (Inodes)** | Fast | Fast ($O(1)$ block lookup) | Overhead of index blocks |

---

## 2. Unix Inode Structure
An Inode stores metadata and disk block pointers:
- 12 Direct Pointers (pointing directly to data blocks).
- 1 Single Indirect Pointer (points to block of pointers).
- 1 Double Indirect Pointer (points to block of indirect pointers).
- 1 Triple Indirect Pointer (points to block of double indirect pointers).

Allows small files to access blocks with 0 overhead, while massive multi-gigabyte files scale seamlessly.
""",
        "questions": [
            {
                "id": "os-fs-1",
                "question": "What happens when you delete a source file that has an active Hard Link in a Unix file system?",
                "options": [
                    "The hard link becomes broken (dangling pointer)",
                    "The file data remains completely accessible through the hard link until its inode link count drops to 0",
                    "The file system throws a corruption error",
                    "The hard link is automatically deleted simultaneously"
                ],
                "correct_option": 1,
                "explanation": "Hard links share the same inode. The OS only deletes data blocks when the inode's link count reaches 0 and no processes hold it open."
            },
            {
                "id": "os-fs-2",
                "question": "In a Unix inode with 12 direct block pointers and 4KB block size, what is the maximum file size accessible using ONLY direct pointers?",
                "options": ["12 KB", "24 KB", "48 KB", "96 KB"],
                "correct_option": 2,
                "explanation": "12 direct pointers * 4 KB per block = 48 KB of file data."
            }
        ]
    },
    {
        "id": "os-io-management",
        "slug": "io-management",
        "title": "I/O Management",
        "description": "I/O hardware (polling, interrupts, Direct Memory Access / DMA), kernel I/O subsystem (buffering, caching, spooling), and device driver interfaces.",
        "estimatedMinutes": 18,
        "difficulty": "Medium",
        "companyTags": ["Intel", "Qualcomm", "NVIDIA", "Apple"],
        "keyTakeaways": [
            "Polling (Busy-waiting): CPU continuously checks device status register; wastes CPU cycles if device is slow.",
            "Interrupt-Driven I/O: Device raises interrupt request (IRQ) line when data is ready; CPU executes Interrupt Service Routine (ISR).",
            "DMA (Direct Memory Access): Dedicated controller transfers data blocks directly between device and RAM without CPU intervention per byte.",
            "Spooling (Simultaneous Peripheral Ops On-Line): Queues jobs for non-shareable devices (e.g. print spooler)."
        ],
        "notesMarkdown": """# I/O Systems & DMA

---

## 1. I/O Transfer Mechanisms
1. **Programmed I/O (Polling):** CPU loops checking status bits. Best for very high-speed devices with near-instant responses.
2. **Interrupt-Driven I/O:** CPU initiates command and continues normal execution. Device sends interrupt when buffer ready.
3. **DMA (Direct Memory Access):**
   - For high-speed block devices (NVMe SSDs, Gigabit Ethernet).
   - CPU writes source, destination, and byte count to DMA controller.
   - DMA controller transfers entire blocks directly to/from RAM, issuing **only one interrupt per completed block** rather than one per byte.

---

## 2. Kernel I/O Subsystem
- **Buffering:** Stores data in transit between devices with speed mismatches or differing transfer sizes.
- **Caching:** Retains copies of frequently accessed data in fast memory.
- **Spooling:** Buffers output for exclusive-access devices (e.g., printers) so concurrent processes do not interleave print jobs.
""",
        "questions": [
            {
                "id": "os-io-1",
                "question": "How does Direct Memory Access (DMA) reduce CPU overhead during bulk data transfers?",
                "options": [
                    "By overclocking the CPU bus",
                    "By bypassing memory completely and writing to disk cache",
                    "By allowing a hardware DMA controller to transfer data directly between device and RAM, interrupting CPU only once upon block transfer completion",
                    "By replacing virtual memory with physical memory"
                ],
                "correct_option": 2,
                "explanation": "DMA offloads byte-by-byte copying from the CPU, generating a single interrupt when the entire buffer transfer is finished."
            },
            {
                "id": "os-io-2",
                "question": "What is the purpose of Spooling in an operating system?",
                "options": [
                    "To speed up CPU clock speed",
                    "To queue and manage jobs for devices that cannot interleave concurrent access from multiple processes, like printers",
                    "To convert virtual addresses to physical frames",
                    "To detect deadlock conditions in distributed networks"
                ],
                "correct_option": 1,
                "explanation": "Spooling buffers requests in files to feed single-stream sequential devices (like printers) in orderly sequential batches."
            }
        ]
    },
    {
        "id": "os-protection-and-security-basics",
        "slug": "protection-and-security-basics",
        "title": "Protection and Security Basics",
        "description": "Protection vs security, Principle of Least Privilege, Access Matrix model, Access Control Lists (ACL) vs Capability Lists, and security threats (buffer overflow, privilege escalation).",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["CrowdStrike", "Microsoft", "Google", "Palo Alto Networks"],
        "keyTakeaways": [
            "Protection: Internal mechanism controlling access of processes/users to system resources.",
            "Security: External defense of system against unauthorized tampering, theft, or sabotage.",
            "Principle of Least Privilege: Every process/user should operate using minimal privileges necessary to complete task.",
            "Access Matrix: Rows are Domains/Users; Columns are Objects. Decomposed by column -> Access Control Lists (ACLs); by row -> Capability Lists."
        ],
        "notesMarkdown": """# Protection & Security Basics

---

## 1. Protection vs. Security
- **Protection:** Internal mechanisms to enforce access policies across processes, threads, and files.
- **Security:** Defending system integrity against external attacks, malware, unauthorized penetration, and denial of service.

---

## 2. Access Matrix Decomposition
- **Access Control List (ACL):**
  - Stored with the **Object** (column decomposition).
  - Lists which domains/users can perform operations: `File A: User1 (Read, Write), User2 (Read)`.
  - Common in file systems (Windows NTFS, POSIX ACLs).
- **Capability List:**
  - Stored with the **Subject / Domain** (row decomposition).
  - A secure ticket held by the process specifying allowed object access rights.
  - Faster verification, but difficult to revoke privileges globally.
""",
        "questions": [
            {
                "id": "os-sec-1",
                "question": "In the Access Matrix model, storing permissions by columns associated directly with protected objects is known as:",
                "options": ["Capability Lists", "Access Control Lists (ACLs)", "Inodes", "Page Tables"],
                "correct_option": 1,
                "explanation": "Column decomposition of the access matrix produces Access Control Lists attached directly to each individual object."
            },
            {
                "id": "os-sec-2",
                "question": "What is the core directive of the Principle of Least Privilege?",
                "options": [
                    "All users must run with root administrator privileges",
                    "Programs and users should be granted only the minimum privilege set strictly necessary to perform their required tasks",
                    "Security checks should be disabled in user space",
                    "Every process must run in kernel mode"
                ],
                "correct_option": 1,
                "explanation": "Least privilege limits potential attack blast radius by restricting access rights strictly to what is required for operation."
            }
        ]
    }
]

# Map the 17 requested topics, pulling existing notes/questions when available
# List of 17 topics in order:
# 1. OS Structures and System Calls
# 2. Processes and Threads
# 3. Process States and Process Control Blocks
# 4. CPU Scheduling Algorithms
# 5. Inter-Process Communication (IPC)
# 6. Process Synchronization
# 7. Critical Sections, Semaphores, and Mutexes
# 8. Classical Synchronization Problems
# 9. Deadlocks: Prevention, Avoidance, Detection
# 10. Memory Management
# 11. Paging and Segmentation
# 12. Virtual Memory and Demand Paging
# 13. Page Replacement Algorithms
# 14. File Systems and Directory Structures
# 15. Disk Scheduling
# 16. I/O Management
# 17. Protection and Security Basics

new_topics_by_id = {t["id"]: t for t in new_os_topics}

final_os_topics = []

# 1. OS Structures and System Calls
t1 = existing_os_topics.get("system-calls-linux")
if t1:
    t1_copy = dict(t1)
    t1_copy["title"] = "OS Structures and System Calls"
    t1_copy["youtube_url"] = make_yt_url("OS Structures and System Calls")
    final_os_topics.append(t1_copy)
else:
    final_os_topics.append(new_topics_by_id["os-structures-and-system-calls"])

# 2. Processes and Threads
t2 = existing_os_topics.get("process-thread")
if t2:
    t2_copy = dict(t2)
    t2_copy["title"] = "Processes and Threads"
    t2_copy["youtube_url"] = make_yt_url("Processes and Threads")
    final_os_topics.append(t2_copy)

# 3. Process States and Process Control Blocks
final_os_topics.append(new_topics_by_id["os-process-states-and-pcb"])

# 4. CPU Scheduling Algorithms
t4 = existing_os_topics.get("cpu-scheduling")
if t4:
    t4_copy = dict(t4)
    t4_copy["title"] = "CPU Scheduling Algorithms"
    t4_copy["youtube_url"] = make_yt_url("CPU Scheduling Algorithms")
    final_os_topics.append(t4_copy)

# 5. Inter-Process Communication (IPC)
final_os_topics.append(new_topics_by_id["os-ipc"])

# 6. Process Synchronization
final_os_topics.append(new_topics_by_id["os-process-synchronization-fundamentals"])

# 7. Critical Sections, Semaphores, and Mutexes
t7 = existing_os_topics.get("ipc-synchronization")
if t7:
    t7_copy = dict(t7)
    t7_copy["title"] = "Critical Sections, Semaphores, and Mutexes"
    t7_copy["youtube_url"] = make_yt_url("Critical Sections Semaphores and Mutexes")
    final_os_topics.append(t7_copy)

# 8. Classical Synchronization Problems
final_os_topics.append(new_topics_by_id["os-classical-synchronization-problems"])

# 9. Deadlocks: Prevention, Avoidance, Detection
t9 = existing_os_topics.get("deadlocks")
if t9:
    t9_copy = dict(t9)
    t9_copy["title"] = "Deadlocks: Prevention, Avoidance, Detection"
    t9_copy["youtube_url"] = make_yt_url("Deadlocks Prevention Avoidance Detection")
    final_os_topics.append(t9_copy)

# 10. Memory Management
final_os_topics.append(new_topics_by_id["os-memory-management-fundamentals"])

# 11. Paging and Segmentation
t11 = existing_os_topics.get("memory-paging")
if t11:
    t11_copy = dict(t11)
    t11_copy["title"] = "Paging and Segmentation"
    t11_copy["youtube_url"] = make_yt_url("Paging and Segmentation")
    final_os_topics.append(t11_copy)

# 12. Virtual Memory and Demand Paging
final_os_topics.append(new_topics_by_id["os-virtual-memory-and-demand-paging"])

# 13. Page Replacement Algorithms
final_os_topics.append(new_topics_by_id["os-page-replacement-algorithms"])

# 14. File Systems and Directory Structures
final_os_topics.append(new_topics_by_id["os-file-systems-and-directory-structures"])

# 15. Disk Scheduling
t15 = existing_os_topics.get("disk-scheduling")
if t15:
    t15_copy = dict(t15)
    t15_copy["title"] = "Disk Scheduling"
    t15_copy["youtube_url"] = make_yt_url("Disk Scheduling Algorithms FCFS SSTF SCAN")
    final_os_topics.append(t15_copy)

# 16. I/O Management
final_os_topics.append(new_topics_by_id["os-io-management"])

# 17. Protection and Security Basics
final_os_topics.append(new_topics_by_id["os-protection-and-security-basics"])

# Ensure all topics have youtube_url
for t in final_os_topics:
    if "youtube_url" not in t or not t["youtube_url"]:
        t["youtube_url"] = make_yt_url(t["title"])

category = {
    "id": "os",
    "slug": "operating-systems",
    "title": "Operating Systems (OS)",
    "description": "Kernel architecture, process lifecycle, CPU scheduling, synchronization, deadlocks, virtual memory, paging, and file systems.",
    "icon": "Cpu",
    "topics": final_os_topics
}

ts_content = f"""import type {{ SectionCategory }} from './types';

export const OPERATING_SYSTEMS_CATEGORY: SectionCategory = {json.dumps(category, indent=2)};
"""

with open("src/lib/data/curriculum/operating-systems.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated Operating Systems module with {len(final_os_topics)} topics successfully!")
