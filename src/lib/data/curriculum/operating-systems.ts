import type { SectionCategory } from './types';

export const OPERATING_SYSTEMS_CATEGORY: SectionCategory = {
  "id": "os",
  "slug": "operating-systems",
  "title": "Operating Systems (OS)",
  "description": "Kernel architecture, process lifecycle, CPU scheduling, synchronization, deadlocks, virtual memory, paging, and file systems.",
  "icon": "Cpu",
  "topics": [
    {
      "id": "system-calls-linux",
      "slug": "linux-system-calls-and-kernel",
      "title": "OS Structures and System Calls",
      "description": "User mode vs Kernel mode, fork(), exec(), wait(), and inter-process communication.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Linux System Calls & Kernel Architecture\n\nOperating systems use **dual-mode operation** (User Mode and Kernel Mode) enforced by hardware CPU privilege rings (Ring 3 vs Ring 0) to protect critical system memory.\n\n---\n\n## 1. Process Lifecycle System Calls\n- `fork()`: Creates an exact child process by duplicating the parent's memory using **Copy-on-Write (COW)**.\n  - Returns `0` in child process.\n  - Returns `child_pid` in parent process.\n  - Returns `-1` on failure.\n- `exec()` family: Replaces current process memory, code segment, and stack with a new executable program.\n- `wait()` / `waitpid()`: Parent suspends execution until child terminates, collecting termination status to prevent **zombie processes**.\n\n## 2. Zombie vs Orphan Processes\n- **Zombie Process**: Child terminated, but parent has not yet called `wait()`. Its entry remains in process table with status code.\n- **Orphan Process**: Parent terminates before child. The child is immediately adopted by `init` / `systemd` (PID 1).\n",
      "questions": [
        {
          "id": "sc-os-1",
          "question": "What is the return value of fork() inside the newly created child process?",
          "options": [
            "Child's PID",
            "0",
            "-1",
            "Parent's PID"
          ],
          "correct_option": 1,
          "explanation": "fork() returns 0 in the child process and the child PID in the parent process, allowing code to branch based on identity."
        },
        {
          "id": "sc-linux-2",
          "question": "In Unix/Linux, what does the fork() system call return to the newly created child process upon success?",
          "options": [
            "0",
            "The PID of the parent",
            "The PID of the child",
            "1"
          ],
          "correct_option": 0,
          "explanation": "fork() returns 0 to the child process, allowing it to determine its role, and returns the child’s new non-zero PID to the parent process."
        },
        {
          "id": "sc-linux-3",
          "question": "Why is the Linux epoll system call significantly more scalable than select() and poll() for high-concurrency servers?",
          "options": [
            "epoll uses an event-driven kernel callback mechanism with O(1) readiness lookups instead of scanning all file descriptors O(N)",
            "epoll runs entirely in kernel space without user-space buffer copying",
            "epoll automatically handles thread pooling and CPU core pinning",
            "epoll does not require non-blocking sockets"
          ],
          "correct_option": 0,
          "explanation": "select() and poll() require the operating system to iterate over all monitored file descriptors O(N) every poll. epoll registers callbacks and returns only the descriptors with ready I/O events in O(1) time."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Meta",
        "Netflix",
        "Red Hat"
      ],
      "keyTakeaways": [
        "fork() creates an identical child process; returns 0 to child, child PID to parent, -1 on error.",
        "execve() replaces the current process image with a new executable without changing the PID.",
        "epoll is O(1) event notification scaling to tens of thousands of concurrent connections."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=OS+Structures+and+System+Calls+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "process-thread",
      "slug": "processes-and-threads",
      "title": "Processes and Threads",
      "description": "PCB vs TCB, memory layout, IPC mechanisms, context switch overhead.",
      "estimatedMinutes": 18,
      "notesMarkdown": "\n# Processes vs. Threads — Deep Dive\n\nOne of the top 3 most frequently asked Operating Systems interview topics.\n\n---\n\n## 1. Process vs. Thread\n\n| Attribute | Process | Thread (Lightweight Process) |\n| :--- | :--- | :--- |\n| **Definition** | Program in execution with isolated address space | Independent unit of execution within a process |\n| **Address Space** | Own dedicated virtual address space | Shares code, data, and heap with parent process |\n| **Resources** | Heavyweight; distinct file descriptors & memory | Lightweight; shares resources; has its own Stack & Registers |\n| **Creation Cost** | High (`fork()` / `exec()`) | Low (`pthread_create()`) |\n| **Communication** | IPC required (Pipes, Sockets, Shared Memory) | Direct memory access via shared heap |\n\n---\n\n## 2. Process Memory Layout\nA typical 32/64-bit process memory layout consists of:\n1. **Text (Code) Segment:** Executable machine instructions (Read-Only).\n2. **Data Segment:** Initialized global & static variables.\n3. **BSS Segment:** Uninitialized global & static variables (zeroed).\n4. **Heap Segment:** Dynamically allocated memory (`malloc`, `new`) growing **upwards**.\n5. **Stack Segment:** Local variables, function call frames, return addresses growing **downwards**.\n\n---\n\n## 3. Context Switch\nSaving the context (registers, Program Counter, PCB) of the current running process/thread and loading the context of the next scheduled process/thread.\n- **Process context switch** requires flushing the **TLB (Translation Lookaside Buffer)** due to virtual address space changes.\n- **Thread context switch** avoids TLB invalidation, making it significantly faster.\n",
      "questions": [
        {
          "id": "os-1",
          "question": "Which of the following is NOT shared between threads belonging to the same process?",
          "options": [
            "Heap memory",
            "Global variables",
            "Stack and CPU Registers",
            "Open file descriptors"
          ],
          "correct_option": 2,
          "explanation": "Each thread has its own private Stack (for function calls and local variables) and Register state (Program Counter, Stack Pointer). The Heap, Code, and open files are shared."
        },
        {
          "id": "os-2",
          "question": "Why is thread context switching faster than process context switching?",
          "options": [
            "Threads do not use CPU registers",
            "Threads share the same virtual address space, avoiding TLB cache flush",
            "Threads do not require kernel scheduling",
            "Threads run in User mode only"
          ],
          "correct_option": 1,
          "explanation": "Because threads share memory mappings, the CPU TLB (Translation Lookaside Buffer) does not need to be completely invalidated during a thread switch within the same process."
        },
        {
          "id": "pt-3",
          "question": "In a pure User-Level Threading (Many-to-One) model, what occurs when a single user thread makes a blocking system call (such as synchronous disk I/O)?",
          "options": [
            "The entire process and all of its peer user threads are blocked by the OS kernel",
            "Only the executing user thread blocks while the kernel schedules other user threads",
            "The OS kernel automatically spawns a new kernel thread to handle the blocked call",
            "The thread raises an asynchronous hardware exception"
          ],
          "correct_option": 0,
          "explanation": "In the Many-to-One (User-Level Threads) model, the kernel maps all user threads to a single kernel execution context. Because the kernel is unaware of individual user threads, if one thread makes a blocking system call, the whole process is put to sleep."
        },
        {
          "id": "pt-4",
          "question": "What is a \"Zombie Process\" in Unix/Linux operating systems?",
          "options": [
            "A process that has terminated, but its exit status has not yet been read by its parent via wait()",
            "A process whose parent terminated, leaving it adopted by init/systemd",
            "A process blocked indefinitely waiting on a deadlocked mutex",
            "A process consuming 100% CPU in an infinite loop"
          ],
          "correct_option": 0,
          "explanation": "A zombie process has finished execution but remains in the OS process table to allow its parent process to read its exit code via wait(). An orphan process is one whose parent died before it did."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Microsoft",
        "Amazon",
        "Meta"
      ],
      "keyTakeaways": [
        "Processes have isolated virtual address spaces; threads share heap, code, data, and open files.",
        "Threads have private program counters, registers, and stacks.",
        "Thread context switching is significantly faster due to shared page table caches (no TLB flush).",
        "Zombie process: finished execution but retains entry in process table until parent calls wait()."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Processes+and+Threads+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-process-states-and-pcb",
      "slug": "process-states-and-process-control-blocks",
      "title": "Process States and Process Control Blocks",
      "description": "5-state and 7-state process lifecycle models, Process Control Block (PCB) structure, context switching mechanics, and process scheduling queues.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Cisco",
        "Qualcomm",
        "Oracle"
      ],
      "keyTakeaways": [
        "Process States: New, Ready, Running, Waiting (Blocked), Terminated.",
        "PCB (Process Control Block): Task struct containing PID, Program Counter, CPU registers, memory limits, and open file descriptors.",
        "Context Switch: Saving CPU state of active process to its PCB and restoring state of scheduled process from its PCB.",
        "Scheduling Queues: Job Queue, Ready Queue, and Device/I/O Wait Queues."
      ],
      "notesMarkdown": "# Process States and Process Control Blocks (PCB)\n\n---\n\n## 1. Process Lifecycle (5-State Model)\n```text\n           [Admitted]\n  [New] --------------> [Ready] <------------+\n                          |   ^               |\n            [Scheduler]   |   | [Preemption/  | [I/O Complete]\n                          v   |  Time Slice]  |\n                       [Running]              |\n                          |                   |\n            [I/O Request] |                   |\n                          v                   |\n                       [Waiting / Blocked] ---+\n                          |\n             [Exit]       v\n       [Running] ---> [Terminated]\n```\n\n---\n\n## 2. Process Control Block (PCB)\nThe OS maintains an internal data structure for each process (e.g., `struct task_struct` in Linux):\n- **PID:** Process Identifier.\n- **Process State:** Current state (Ready, Running, Blocked, etc.).\n- **Program Counter (PC):** Address of next machine instruction.\n- **CPU Registers:** Accumulator, index registers, stack pointer ($SP$).\n- **Memory Management Information:** Page tables, segment tables, base and limit registers.\n- **Accounting & I/O Status:** CPU time consumed, open file descriptor table.\n",
      "questions": [
        {
          "id": "os-pcb-1",
          "question": "When a running process makes an I/O system call, to which state is it transitioned by the OS scheduler?",
          "options": [
            "Ready",
            "Waiting (Blocked)",
            "Terminated",
            "Suspended Ready"
          ],
          "correct_option": 1,
          "explanation": "The process cannot continue CPU execution until the requested I/O completes, so it transitions to the Waiting / Blocked state."
        },
        {
          "id": "os-pcb-2",
          "question": "Which of the following information is NOT stored inside a Process Control Block (PCB)?",
          "options": [
            "Program Counter (PC)",
            "Open File Descriptor Table",
            "CPU Cache Memory Size",
            "CPU Register context"
          ],
          "correct_option": 2,
          "explanation": "CPU cache size is a global hardware parameter, not process-specific state information stored within an individual PCB."
        },
        {
          "id": "os-pcb-3",
          "question": "When a process transition occurs from 'Running' to 'Waiting / Blocked', what typically triggers this transition?",
          "options": [
            "The process initiates an I/O request or waits for an event / lock to complete.",
            "The CPU scheduler timer quantum expires.",
            "The process finishes execution and calls exit().",
            "The operating system boots up."
          ],
          "correct_option": 0,
          "explanation": "A running process transitions to Blocked/Waiting when it requests a synchronous resource (like reading from disk or waiting for a semaphore) that is not immediately available."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Process+States+and+Process+Control+Blocks+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "cpu-scheduling",
      "slug": "cpu-scheduling-algorithms",
      "title": "CPU Scheduling Algorithms",
      "description": "FCFS, SJF (Preemptive SRTF), Round Robin, Priority Scheduling, Convoy Effect, Gantt charts.",
      "estimatedMinutes": 18,
      "notesMarkdown": "\n# CPU Scheduling Algorithms\n\n---\n\n## 1. Key Metrics\n- **Turnaround Time (TAT):** Completion Time - Arrival Time.\n- **Waiting Time (WT):** Turnaround Time - Burst Time.\n- **Response Time:** Time from arrival until the first time the CPU is allocated.\n\n---\n\n## 2. Common Scheduling Algorithms\n- **FCFS (First-Come, First-Served):** Non-preemptive. Suffers from **Convoy Effect** (short jobs wait behind long jobs).\n- **SJF / SRTF (Shortest Job First):** Optimal average waiting time. Preemptive version is Shortest Remaining Time First (SRTF).\n- **Round Robin (RR):** Preemptive based on Time Quantum $q$. If $q$ is too small, context switch overhead dominates; if too large, it degenerates into FCFS.\n- **Multilevel Feedback Queue:** Dynamically demotes CPU-bound processes and promotes I/O-bound processes.\n",
      "questions": [
        {
          "id": "os-4",
          "question": "Which CPU scheduling algorithm achieves the mathematically minimum average waiting time for a given set of stationary processes?",
          "options": [
            "Round Robin",
            "Shortest Job First (SJF)",
            "Priority Scheduling",
            "First Come First Served (FCFS)"
          ],
          "correct_option": 1,
          "explanation": "SJF is provably optimal because scheduling short jobs first reduces the waiting time of all subsequent jobs the most."
        },
        {
          "id": "cs-2",
          "question": "Which CPU scheduling algorithm is prone to the \"Convoy Effect\", where short CPU-bound processes queue behind a long CPU-burst process?",
          "options": [
            "First-Come, First-Served (FCFS)",
            "Round Robin (RR)",
            "Shortest Remaining Time First (SRTF)",
            "Multi-level Feedback Queue"
          ],
          "correct_option": 0,
          "explanation": "In FCFS, when a long process holds the CPU, all subsequent shorter I/O-bound or CPU-bound processes are delayed, causing the convoy effect and low resource utilization."
        },
        {
          "id": "cs-3",
          "question": "What is the primary practical drawback of the Shortest Job First (SJF) scheduling algorithm in real operating systems?",
          "options": [
            "It is impossible to know the exact length of the next CPU burst in advance",
            "It causes excessive thrashing in virtual memory",
            "It cannot be implemented with preemption",
            "It has the highest context switching overhead"
          ],
          "correct_option": 0,
          "explanation": "SJF requires knowing the exact duration of upcoming CPU bursts beforehand, which is impossible in general-purpose computing and must instead be approximated using exponential smoothing."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Cisco",
        "Qualcomm"
      ],
      "keyTakeaways": [
        "SJF (Shortest Job First) is provably optimal for minimizing average waiting time.",
        "FCFS suffers from the Convoy Effect (short processes waiting behind long CPU bursts).",
        "Round Robin (RR) with time quantum provides minimum average response time for interactive systems."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=CPU+Scheduling+Algorithms+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-ipc",
      "slug": "inter-process-communication",
      "title": "Inter-Process Communication (IPC)",
      "description": "Mechanisms for process communication: Shared Memory vs Message Passing, Pipes (anonymous & named/FIFOs), Message Queues, Sockets, and Signals.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Bloomberg",
        "Goldman Sachs",
        "Uber"
      ],
      "keyTakeaways": [
        "Shared Memory: Fastest IPC; processes map identical physical memory pages; requires synchronization (mutex/semaphore) to prevent race conditions.",
        "Message Passing: OS-mediated message exchange (send/receive primitives); useful for distributed systems and smaller data packets.",
        "Pipes: Unidirectional byte stream; anonymous pipes for related processes (parent-child); named pipes (FIFOs) for unrelated processes.",
        "Signals: Asynchronous notification mechanism sent to a process (e.g., SIGINT, SIGKILL, SIGSEGV)."
      ],
      "notesMarkdown": "# Inter-Process Communication (IPC)\n\n---\n\n## 1. Shared Memory vs. Message Passing\n- **Shared Memory:**\n  - A region of physical RAM is mapped into the virtual address spaces of two or more processes.\n  - Zero-copy data exchange makes it the **fastest** IPC model.\n  - Requires explicit synchronization (mutexes, semaphores) to avoid race conditions.\n- **Message Passing:**\n  - Kernel provides system calls: `send(message)` and `receive(message)`.\n  - Kernel buffers and copies messages between address spaces.\n  - Slower due to system call overhead, but natural across distributed networked machines.\n\n---\n\n## 2. Pipes & Signals in Unix\n- **Anonymous Pipe (`pipe()`):** Unidirectional byte channel between related processes (e.g. parent and child after `fork()`).\n- **Named Pipe (`FIFO`):** Bidirectional or unidirectional persistent file in filesystem accessible by arbitrary unrelated processes.\n- **Unix Signals:** Asynchronous alerts delivered by kernel (`SIGINT` Ctrl+C, `SIGKILL` 9, `SIGTERM` 15, `SIGSEGV` segmentation fault).\n",
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
          "options": [
            "Anonymous Pipe",
            "Named Pipe (FIFO)",
            "Ordinary Pipe via pipe()",
            "Environment variables"
          ],
          "correct_option": 1,
          "explanation": "Named pipes (FIFOs) exist as directory entries in the filesystem, allowing any process with file permissions to open and communicate through them."
        },
        {
          "id": "os-ipc-3",
          "question": "What is the primary performance benefit of Shared Memory IPC over Message Passing IPC?",
          "options": [
            "Shared memory avoids kernel system call and memory copying overhead after initial attachment, operating at raw RAM speeds.",
            "Shared memory provides automatic mutual exclusion without synchronization.",
            "Shared memory works across distinct machines on a network.",
            "Shared memory never causes race conditions."
          ],
          "correct_option": 0,
          "explanation": "Message passing requires copying data into kernel space and back to user space via system calls. Shared memory maps the same physical frames into both address spaces, enabling zero-copy high-speed communication."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Inter-Process+Communication+%28IPC%29+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-process-synchronization-fundamentals",
      "slug": "process-synchronization",
      "title": "Process Synchronization",
      "description": "Race conditions, critical section problem, three criteria for valid synchronization solutions (Mutual Exclusion, Progress, Bounded Waiting), and Peterson's Algorithm.",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Intel",
        "Adobe"
      ],
      "keyTakeaways": [
        "Race Condition: Outcome depends on non-deterministic order of execution/context switches.",
        "Critical Section: Code section accessing shared mutable resources.",
        "3 Mandatory Criteria: Mutual Exclusion (only 1 inside), Progress (no outside thread blocks entry), Bounded Waiting (finite bound on wait time).",
        "Peterson's Algorithm: Classic 2-process software synchronization using flag array and turn variable."
      ],
      "notesMarkdown": "# Process Synchronization Fundamentals\n\n---\n\n## 1. Race Conditions & The Critical Section\nA **Race Condition** occurs when multiple processes access and manipulate shared data concurrently, and the final outcome depends on the order of execution.\n\n### The 3 Core Requirements for a Valid Solution:\n1. **Mutual Exclusion:** If process $P_i$ is executing in its critical section, no other processes can be executing in their critical sections.\n2. **Progress:** If no process is executing in its critical section and some processes wish to enter, only those processes not executing in their remainder sections can participate in deciding who enters next.\n3. **Bounded Waiting:** A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter, preventing starvation.\n\n---\n\n## 2. Peterson's Solution (2 Processes)\n```c\n// Process i:\nflag[i] = true;\nturn = j;\nwhile (flag[j] && turn == j); // Busy wait\n\n// --- CRITICAL SECTION ---\n\nflag[i] = false; // Remainder section\n```\n- Proves all 3 criteria (Mutual Exclusion, Progress, Bounded Waiting) for two processes.\n",
      "questions": [
        {
          "id": "os-sync-1",
          "question": "Which of the following is NOT one of the three mandatory criteria for solving the Critical Section problem?",
          "options": [
            "Mutual Exclusion",
            "Progress",
            "Bounded Waiting",
            "Strict Alternation"
          ],
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
        },
        {
          "id": "os-sync-3",
          "question": "What hardware instruction is commonly provided by modern CPUs to implement atomic spinlocks without race conditions?",
          "options": [
            "Test-and-Set / Compare-and-Swap (CAS)",
            "LOAD and STORE",
            "ADD and SUB",
            "JMP and CALL"
          ],
          "correct_option": 0,
          "explanation": "CPUs provide atomic read-modify-write instructions like Test-and-Set and Compare-and-Swap (CAS) executed in a single uninterruptible hardware cycle to implement user-space spinlocks and mutex primitives."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Process+Synchronization+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "ipc-synchronization",
      "slug": "ipc-and-synchronization",
      "title": "Critical Sections, Semaphores, and Mutexes",
      "description": "Race conditions, critical sections, Mutex vs Counting Semaphores, and classic sync problems.",
      "estimatedMinutes": 16,
      "notesMarkdown": "\n# Process Synchronization & Semaphores\n\n---\n\n## 1. The Critical Section Problem\nA valid solution must satisfy:\n1. **Mutual Exclusion:** No two processes in critical section simultaneously.\n2. **Progress:** If no process is in CS, selection of next process cannot be delayed indefinitely.\n3. **Bounded Waiting:** A bound must exist on the number of times other processes enter CS after a request is made.\n\n---\n\n## 2. Mutex vs. Semaphore\n- **Mutex (Mutual Exclusion):** Locking mechanism owned by a single thread (ownership).\n- **Counting Semaphore:** Signaling mechanism integer $S$.\n  - `wait(S)` / `P(S)`: Decrements $S$. Blocks if $S \\le 0$.\n  - `signal(S)` / `V(S)`: Increments $S$. Wakes a waiting process.\n",
      "questions": [
        {
          "id": "os-6",
          "question": "What is the primary operational difference between a Binary Semaphore and a Mutex?",
          "options": [
            "A mutex can only be locked/unlocked by the thread that acquired it (ownership)",
            "A semaphore can only be used on single-core CPUs",
            "A mutex cannot prevent race conditions",
            "A binary semaphore uses hardware spinlocks only"
          ],
          "correct_option": 0,
          "explanation": "A Mutex has an ownership concept: only the thread that locks it may unlock it. A semaphore is a signaling mechanism: any thread can invoke signal(S) to unblock a waiting thread."
        },
        {
          "id": "ipc-2",
          "question": "A counting semaphore S is initialized to 10. Then 6 wait (P) operations and 4 signal (V) operations are executed on S. What is the resulting value of S?",
          "options": [
            "8",
            "10",
            "4",
            "12"
          ],
          "correct_option": 0,
          "explanation": "Each wait (P) operation decrements the semaphore counter by 1, and each signal (V) operation increments it by 1. Therefore, resulting value = 10 - 6 + 4 = 8."
        },
        {
          "id": "ipc-3",
          "question": "What protocol solves the \"Priority Inversion\" problem in real-time operating systems?",
          "options": [
            "Priority Inheritance Protocol",
            "Round Robin Scheduling",
            "Banker's Protocol",
            "Peterson’s Lockout"
          ],
          "correct_option": 0,
          "explanation": "Under Priority Inheritance, when a lower-priority task holds a resource requested by a higher-priority task, the lower-priority task temporarily inherits the higher priority until it releases the resource."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Microsoft",
        "Amazon",
        "Meta",
        "Uber"
      ],
      "keyTakeaways": [
        "Mutex: Mutual exclusion locking mechanism with ownership (thread that locks must unlock).",
        "Semaphore: Signaling mechanism without ownership; can be binary (0/1) or counting (0..N).",
        "Priority Inversion: Low-priority thread holding lock needed by high-priority thread gets preempted by medium-priority thread."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Critical+Sections+Semaphores+and+Mutexes+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-classical-synchronization-problems",
      "slug": "classical-synchronization-problems",
      "title": "Classical Synchronization Problems",
      "description": "Producer-Consumer (Bounded Buffer), Readers-Writers (Reader Preference, Writer Preference), Dining Philosophers (Deadlock avoidance), and Sleeping Barber problems.",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Meta"
      ],
      "keyTakeaways": [
        "Producer-Consumer: Uses full, empty counting semaphores and mutex for buffer lock.",
        "Readers-Writers: Distinguishes shared reads from exclusive writes; naive solutions can cause writer starvation.",
        "Dining Philosophers: Models resource contention; naive chopstick acquisition creates circular wait deadlock.",
        "Deadlock Avoidance in Philosophers: Resource hierarchy (asymmetric pickup), limits on concurrent eaters, or test-and-set."
      ],
      "notesMarkdown": "# Classical Synchronization Problems\n\n---\n\n## 1. Producer-Consumer (Bounded Buffer)\n- **Shared Buffer:** Size $N$.\n- **Semaphores:**\n  - `mutex = 1` (binary semaphore for mutual exclusion on buffer).\n  - `empty = N` (counting semaphore tracking free slots).\n  - `full = 0` (counting semaphore tracking populated slots).\n\n```c\n// Producer:\nwait(empty);\nwait(mutex);\n// Add item to buffer\nsignal(mutex);\nsignal(full);\n\n// Consumer:\nwait(full);\nwait(mutex);\n// Remove item from buffer\nsignal(mutex);\nsignal(empty);\n```\n\n---\n\n## 2. Readers-Writers Problem\n- Multiple readers can read simultaneously.\n- Only one writer can write at a time (exclusive access).\n- **First Readers-Writers Solution:** Prioritizes readers; if readers arrive continuously, writers suffer starvation.\n\n---\n\n## 3. Dining Philosophers Problem\nFive philosophers sitting around a circular table with 5 chopsticks:\n- Naive algorithm: Each picks left chopstick, then right chopstick $\\implies$ **Deadlock!** (Circular wait).\n- **Solutions:**\n  1. Pick both chopsticks only if both are available (`test` state).\n  2. Asymmetric philosopher: Odd philosophers pick left first; even philosophers pick right first.\n",
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
        },
        {
          "id": "os-classic-3",
          "question": "In the Dining Philosophers problem, which circular condition can cause a total deadlock if every philosopher simultaneously picks up their left fork?",
          "options": [
            "Circular wait (each philosopher holds their left fork while waiting for the right fork held by their neighbor).",
            "Starvation of the middle philosopher only.",
            "Race condition in the kitchen.",
            "Priority inversion."
          ],
          "correct_option": 0,
          "explanation": "If every philosopher picks up their left fork at once, all forks are occupied and each philosopher waits indefinitely for their neighbor to release the right fork, forming a classic circular wait deadlock."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Classical+Synchronization+Problems+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "deadlocks",
      "slug": "synchronization-and-deadlocks",
      "title": "Deadlocks: Prevention, Avoidance, Detection",
      "description": "Mutual exclusion, hold and wait, no preemption, circular wait, Banker’s algorithm.",
      "estimatedMinutes": 20,
      "notesMarkdown": "\n# Deadlocks & Synchronization Cheat Sheet\n\nA **Deadlock** is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process.\n\n---\n\n## 1. The 4 Necessary Conditions (Coffman Conditions)\nA deadlock can occur **if and only if** all four conditions hold simultaneously:\n\n1. **Mutual Exclusion:** At least one resource must be non-shareable.\n2. **Hold and Wait:** A process is holding at least one resource and waiting to acquire additional resources held by other processes.\n3. **No Preemption:** Resources cannot be forcibly revoked from a process; they can only be released voluntarily.\n4. **Circular Wait:** A closed chain of processes exists such that $P_0$ waits for resource held by $P_1$, $P_1$ waits for $P_2$, ..., and $P_n$ waits for $P_0$.\n\n---\n\n## 2. Prevention vs. Avoidance\n- **Deadlock Prevention:** Design the system to invalidate at least one of the 4 Coffman conditions (e.g. enforce strict resource ordering to eliminate Circular Wait).\n- **Deadlock Avoidance:** Allow the conditions, but dynamically verify safety states before granting resources (**Banker's Algorithm**).\n",
      "questions": [
        {
          "id": "os-3",
          "question": "Which condition is invalidated by imposing a total ordering on all resource types and requiring processes to request resources in strictly increasing order?",
          "options": [
            "Mutual Exclusion",
            "Hold and Wait",
            "Circular Wait",
            "No Preemption"
          ],
          "correct_option": 2,
          "explanation": "Strict global numbering and increasing order resource allocation mathematically eliminates the possibility of a circular dependency graph (Circular Wait)."
        },
        {
          "id": "dl-2",
          "question": "Which algorithm is famously employed by operating systems for Deadlock Avoidance by checking if granting a request leaves the system in a \"Safe State\"?",
          "options": [
            "Banker's Algorithm",
            "Round Robin Algorithm",
            "SSTF Algorithm",
            "Peterson's Algorithm"
          ],
          "correct_option": 0,
          "explanation": "Dijkstra's Banker's Algorithm tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources, preventing entering an unsafe state."
        },
        {
          "id": "dl-3",
          "question": "In a Resource Allocation Graph (RAG) where every resource type has exactly one instance, what does the existence of a directed cycle indicate?",
          "options": [
            "Deadlock is guaranteed to exist",
            "Deadlock may or may not exist",
            "System is in a starvation state only",
            "Deadlock is impossible"
          ],
          "correct_option": 0,
          "explanation": "For single-instance resource types, a cycle in the Resource Allocation Graph is both a necessary and sufficient condition for deadlock."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Oracle",
        "Adobe"
      ],
      "keyTakeaways": [
        "4 Coffman Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
        "Banker's Algorithm: Used for deadlock avoidance by verifying safe states before allocation.",
        "In single-instance RAG, a cycle is necessary and sufficient for deadlock."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Deadlocks+Prevention+Avoidance+Detection+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-memory-management-fundamentals",
      "slug": "memory-management",
      "title": "Memory Management",
      "description": "Contiguous memory allocation, base and limit registers, fixed and variable partitioning, fragmentation (internal vs external), compaction, and allocation algorithms (First Fit, Best Fit, Worst Fit).",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Cisco",
        "Infosys"
      ],
      "keyTakeaways": [
        "Internal Fragmentation: Allocated memory block is larger than requested process size; wasted space inside partition.",
        "External Fragmentation: Total free memory is sufficient to satisfy request, but storage is fragmented into non-contiguous chunks.",
        "Compaction: Relocating memory blocks to combine free holes into one large block; requires dynamic execution-time address binding.",
        "First Fit: Fastest; allocates first hole large enough. Best Fit: Smallest sufficient hole; leaves smallest leftover fragments."
      ],
      "notesMarkdown": "# Memory Management & Partitioning\n\n---\n\n## 1. Fragmentation\n- **Internal Fragmentation:** Memory internal to a partition that is unused. Occurs in fixed-sized partitioning or paging.\n- **External Fragmentation:** Total free memory is large enough to fulfill an allocation request, but cannot be satisfied because free memory is split into non-contiguous fragments. Occurs in variable-size dynamic partitioning.\n\n---\n\n## 2. Dynamic Storage-Allocation Algorithms\n1. **First Fit:** Allocate the first hole that is big enough. Fast search; good overall memory utilization.\n2. **Best Fit:** Search entire list to find the smallest hole that is big enough. Produces smallest leftover fragments.\n3. **Worst Fit:** Search entire list and allocate the largest hole. Leaves the largest residual hole, but slow and generally performs poorly.\n",
      "questions": [
        {
          "id": "os-mm-1",
          "question": "Which type of memory fragmentation is inherent in fixed-size memory partitioning?",
          "options": [
            "External fragmentation only",
            "Internal fragmentation only",
            "Both external and internal fragmentation equally",
            "Neither fragmentation occurs"
          ],
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
        },
        {
          "id": "os-mm-3",
          "question": "What is 'Internal Fragmentation' in contiguous memory management?",
          "options": [
            "Unused allocated space inside an assigned memory partition or page frame.",
            "Free memory scattered in small non-contiguous blocks outside allocated regions.",
            "Memory corruption inside the operating system kernel.",
            "Excess disk space allocated to swap files."
          ],
          "correct_option": 0,
          "explanation": "Internal fragmentation occurs when fixed-size partitions or page frames allocate more memory than a process requests, leaving wasted, unusable memory inside the allocated block."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Memory+Management+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "memory-paging",
      "slug": "memory-management-and-paging",
      "title": "Paging and Segmentation",
      "description": "Page tables, TLB hits/misses, page fault sequence, and replacement algorithms (FIFO, LRU, Optimal).",
      "estimatedMinutes": 20,
      "notesMarkdown": "\n# Virtual Memory & Paging\n\n---\n\n## 1. Paging Architecture\n- Virtual address is split into: **Page Number ($p$)** and **Offset ($d$)**.\n- Page Table translates Page Number to **Frame Number ($f$)** in physical RAM.\n- **TLB (Translation Lookaside Buffer):** Fast hardware cache storing recent virtual-to-physical address mappings.\n\n---\n\n## 2. Page Fault Handling\n1. CPU references unmapped page (valid-invalid bit is 0 in page table).\n2. Hardware traps to OS kernel (**Page Fault Interrupt**).\n3. OS locates missing page on secondary storage (swap space).\n4. OS brings page into a free frame (invoking replacement algorithm if full).\n5. Updates page table and restarts the faulting instruction.\n\n---\n\n## 3. Page Replacement Algorithms\n- **FIFO:** Suffers from **Belady's Anomaly** (more frames can produce more page faults).\n- **LRU (Least Recently Used):** High practical performance, approximates optimal replacement.\n- **Optimal (OPT):** Replaces the page that will not be used for the longest future period (benchmark theoretical).\n",
      "questions": [
        {
          "id": "os-5",
          "question": "Which page replacement algorithm can experience Belady's Anomaly, where increasing the number of page frames leads to more page faults?",
          "options": [
            "Least Recently Used (LRU)",
            "Optimal (OPT)",
            "First-In, First-Out (FIFO)",
            "Least Frequently Used (LFU)"
          ],
          "correct_option": 2,
          "explanation": "FIFO does not satisfy the stack property, meaning the set of pages in memory for n frames is not guaranteed to be a subset of that for n+1 frames, causing Belady's Anomaly."
        },
        {
          "id": "mp-2",
          "question": "What is Bélády’s Anomaly in operating systems virtual memory management?",
          "options": [
            "The phenomenon where increasing the number of page frames results in an increase in page faults under FIFO",
            "A page fault occurring while servicing another page fault",
            "Memory thrashing caused by excessive thread creation",
            "Fragmentation occurring when segment sizes exceed page frame boundaries"
          ],
          "correct_option": 0,
          "explanation": "Bélády's Anomaly proves that for certain page reference strings, the FIFO page replacement algorithm experiences more page faults when given more physical memory frames."
        },
        {
          "id": "mp-3",
          "question": "What is the primary function of the Translation Lookaside Buffer (TLB)?",
          "options": [
            "High-speed hardware cache for page table translations (Virtual Page Number to Frame Number)",
            "Secondary storage partition for inactive process pages (swap space)",
            "Registers holding process state during context switches",
            "L1 cache holding instruction code for pipelined execution"
          ],
          "correct_option": 0,
          "explanation": "The TLB is an associative, high-speed hardware cache on the MMU that stores recent virtual-to-physical address mappings, drastically speeding up memory address translation."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Microsoft",
        "Intel",
        "Apple"
      ],
      "keyTakeaways": [
        "Paging eliminates external fragmentation but introduces internal fragmentation within frames.",
        "TLB (Translation Lookaside Buffer) caches recent Virtual-to-Physical page translations in hardware.",
        "Bélády's Anomaly: In FIFO page replacement, allocating MORE page frames can cause MORE page faults."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Paging+and+Segmentation+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-virtual-memory-and-demand-paging",
      "slug": "virtual-memory-and-demand-paging",
      "title": "Virtual Memory and Demand Paging",
      "description": "Virtual memory concepts, Demand Paging, valid-invalid bit, Page Fault handling routine, Effective Access Time (EAT), and Thrashing.",
      "estimatedMinutes": 22,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Amazon",
        "Microsoft",
        "Apple"
      ],
      "keyTakeaways": [
        "Virtual Memory: Allows execution of processes not completely loaded in physical RAM.",
        "Demand Paging: Pages are loaded into RAM only upon access (lazy swapper).",
        "Page Fault: Hardware trap triggered when accessing a page marked invalid (not currently in physical RAM).",
        "Effective Access Time (EAT): EAT = (1 - p) * Memory_Access + p * Page_Fault_Service_Time.",
        "Thrashing: System spends more time servicing page faults than executing instructions; occurs when sum of working sets exceeds physical RAM."
      ],
      "notesMarkdown": "# Virtual Memory & Demand Paging\n\n---\n\n## 1. Demand Paging & Page Fault Routine\n1. Process attempts to access a virtual memory address.\n2. MMU checks Page Table entry. If **valid-invalid bit is 0 (invalid)**:\n   - Hardware generates a **Page Fault trap** to OS.\n3. OS checks internal PCB table:\n   - If illegal address $\\implies$ Terminate process (`SIGSEGV`).\n   - If valid reference $\\implies$ Find free physical frame.\n4. Issue disk I/O to read page from backing store into allocated frame.\n5. While I/O runs, CPU context switches to another ready process.\n6. Disk controller signals completion via interrupt.\n7. OS updates Page Table: marks bit valid (1) and records frame number.\n8. Restart the instruction that triggered the page fault.\n\n---\n\n## 2. Effective Access Time (EAT)\nLet $p$ be the page fault rate ($0 \\le p \\le 1$):\n$$\\text{EAT} = (1 - p) \\times t_{\\text{mem}} + p \\times t_{\\text{fault}}$$\nSince $t_{\\text{fault}} \\approx 5\\text{–}10\\text{ ms}$ while $t_{\\text{mem}} \\approx 100\\text{ ns}$, even a tiny fault rate $p = 0.001$ degrades performance dramatically.\n\n---\n\n## 3. Thrashing\nWhen processes lack sufficient frames, they continuously page fault. CPU utilization plummets, causing the OS to admit more processes, worsening the cycle. Resolved by the **Working Set Model**.\n",
      "questions": [
        {
          "id": "os-vm-1",
          "question": "If memory access time is 100 ns and page fault service time is 10 ms (10,000,000 ns), what is the maximum permissible page fault rate to keep EAT within 200 ns?",
          "options": [
            "p < 0.00001 (1 in 100,000)",
            "p < 0.001",
            "p < 0.01",
            "p < 0.0000001"
          ],
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
        },
        {
          "id": "os-vm-3",
          "question": "What sequence of hardware and OS events is initiated when a process accesses a page with its valid/invalid bit set to 'invalid' in the page table?",
          "options": [
            "A Page Fault hardware trap triggers the OS kernel to locate the frame on swap disk, load it into physical RAM, update the page table, and restart the instruction.",
            "The process is terminated immediately with a segmentation fault.",
            "The CPU halts the entire computer.",
            "The instruction skips execution and moves to the next PC address."
          ],
          "correct_option": 0,
          "explanation": "An invalid bit access generates a Page Fault exception. The OS traps into kernel mode, allocates a free physical frame (possibly evicting one), reads the missing page from disk, marks it valid, and re-executes the faulted instruction."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Virtual+Memory+and+Demand+Paging+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-page-replacement-algorithms",
      "slug": "page-replacement-algorithms",
      "title": "Page Replacement Algorithms",
      "description": "Page replacement policies: FIFO, Belady's Anomaly, Optimal (OPT/MIN), Least Recently Used (LRU), Clock algorithm, and Counting algorithms (LFU/MFU).",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Microsoft",
        "Google",
        "Amazon",
        "Oracle"
      ],
      "keyTakeaways": [
        "FIFO: Replaces oldest loaded page; suffers from Belady's Anomaly (more frames -> more page faults).",
        "Optimal (OPT): Replaces page that will not be used for longest time in future; lowest possible fault rate; impossible in practice.",
        "LRU: Replaces page unused for longest time in the past; stack algorithm (immune to Belady's Anomaly).",
        "Clock Algorithm (Second Chance): Practical FIFO approximation of LRU using a reference bit and cyclic pointer."
      ],
      "notesMarkdown": "# Page Replacement Algorithms\n\n---\n\n## 1. Algorithm Comparisons\n- **FIFO (First-In, First-Out):**\n  - Replaces page that entered memory earliest.\n  - **Belady's Anomaly:** For some reference strings, increasing the number of page frames results in *more* page faults instead of fewer!\n- **Optimal (OPT / MIN):**\n  - Replace the page that will not be accessed for the longest period of time.\n  - Used as an empirical benchmark; impossible in real OS because it requires future knowledge.\n- **LRU (Least Recently Used):**\n  - Replaces the page that has not been accessed for the longest time in the past.\n  - Belongs to **Stack Algorithms**: Memory with $N$ frames is always a subset of memory with $N+1$ frames $\\implies$ Immune to Belady's Anomaly.\n- **Clock Algorithm (Second Chance):**\n  - FIFO queue organized as circular list with a reference bit $R$.\n  - If $R = 1$, set $R = 0$ and advance pointer. If $R = 0$, select frame for replacement.\n",
      "questions": [
        {
          "id": "os-pra-1",
          "question": "Which page replacement algorithm can exhibit Belady's Anomaly?",
          "options": [
            "Least Recently Used (LRU)",
            "Optimal Algorithm (OPT)",
            "First-In, First-Out (FIFO)",
            "Working Set Model"
          ],
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
        },
        {
          "id": "os-pr-3",
          "question": "What is Belady's Anomaly in page replacement?",
          "options": [
            "The counter-intuitive phenomenon where increasing the number of physical page frames results in an increase in the number of page faults (exhibited by FIFO).",
            "When LRU performs worse than Random replacement.",
            "When the page size is larger than physical memory.",
            "When virtual addresses cannot be translated by the TLB."
          ],
          "correct_option": 0,
          "explanation": "Belady's Anomaly is the phenomenon where adding more physical page frames increases page faults for certain reference strings under FIFO page replacement. Stack algorithms like LRU and Optimal are immune."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Page+Replacement+Algorithms+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-file-systems-and-directory-structures",
      "slug": "file-systems-and-directory-structures",
      "title": "File Systems and Directory Structures",
      "description": "File concepts, access methods (sequential, direct), directory structures (single-level, two-level, tree, acyclic graph), file allocation methods (contiguous, linked, indexed), and Inodes.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Linux Foundation",
        "Red Hat"
      ],
      "keyTakeaways": [
        "File Allocation Methods: Contiguous (fast, external fragmentation), Linked (no external fragmentation, slow random access), Indexed (supports fast direct access without external fragmentation).",
        "Unix Inode: Contains file metadata, direct block pointers, single indirect, double indirect, and triple indirect pointers.",
        "Hard Links vs Soft Links (Symlinks): Hard links point directly to the inode (same inode number); Soft links are files pointing to path strings.",
        "Directory implementation: Linear list vs Hash table."
      ],
      "notesMarkdown": "# File Systems & Inodes\n\n---\n\n## 1. File Allocation Methods\n| Allocation Method | Sequential Access | Random Access | Fragmentation Issues |\n|---|---|---|---|\n| **Contiguous** | Extremely Fast | Fast | Severe External Fragmentation |\n| **Linked List** | Good | Very Poor ($O(N)$ pointer traversal) | Internal Fragmentation at block ends |\n| **Indexed (Inodes)** | Fast | Fast ($O(1)$ block lookup) | Overhead of index blocks |\n\n---\n\n## 2. Unix Inode Structure\nAn Inode stores metadata and disk block pointers:\n- 12 Direct Pointers (pointing directly to data blocks).\n- 1 Single Indirect Pointer (points to block of pointers).\n- 1 Double Indirect Pointer (points to block of indirect pointers).\n- 1 Triple Indirect Pointer (points to block of double indirect pointers).\n\nAllows small files to access blocks with 0 overhead, while massive multi-gigabyte files scale seamlessly.\n",
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
          "options": [
            "12 KB",
            "24 KB",
            "48 KB",
            "96 KB"
          ],
          "correct_option": 2,
          "explanation": "12 direct pointers * 4 KB per block = 48 KB of file data."
        },
        {
          "id": "os-fs-3",
          "question": "In Unix inode-based file systems, how does an inode locate large file blocks that exceed its direct block pointers?",
          "options": [
            "Via single, double, and triple indirect block pointers pointing to index blocks on disk.",
            "By storing the whole file directly in contiguous RAM.",
            "Using a centralized FAT table in sector 0.",
            "By linearly scanning all physical disk sectors."
          ],
          "correct_option": 0,
          "explanation": "Unix inodes contain direct pointers for small files plus single, double, and triple indirect pointers pointing to blocks of addresses, allowing logarithmic scaling to multi-terabyte files."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=File+Systems+and+Directory+Structures+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "disk-scheduling",
      "slug": "disk-scheduling-algorithms",
      "title": "Disk Scheduling",
      "description": "HDD seek time optimization, head movement comparison, and starvation prevention.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Disk Scheduling Algorithms\n\nDisk scheduling algorithms decide the order in which disk I/O requests are serviced by the disk head to minimize **Seek Time** (the time required to move the read/write head to the desired cylinder).\n\n---\n\n## 1. Common Disk Scheduling Algorithms\n1. **FCFS (First-Come, First-Served)**: Requests serviced in arrival order. Simple, fair, but causes massive head movement.\n2. **SSTF (Shortest Seek Time First)**: Services request closest to current head position. High throughput, but causes **starvation** for distant requests.\n3. **SCAN (Elevator Algorithm)**: The head moves in one direction servicing all requests until the end of disk, then reverses direction.\n4. **C-SCAN (Circular SCAN)**: Moves in one direction servicing requests. Upon reaching the end, jumps immediately back to cylinder 0 without servicing on the return trip. Provides uniform wait times.\n5. **LOOK & C-LOOK**: Like SCAN/C-SCAN, but the head reverses as soon as the last request in that direction is serviced, rather than traveling to the physical disk edge.\n",
      "questions": [
        {
          "id": "ds-os-1",
          "question": "Which disk scheduling algorithm avoids starvation while providing the most uniform waiting time across cylinders?",
          "options": [
            "FCFS",
            "SSTF",
            "C-SCAN",
            "Priority Scheduling"
          ],
          "correct_option": 2,
          "explanation": "C-SCAN treats cylinders as a circular list, moving in one direction only and returning directly to start, ensuring uniform wait times without starvation."
        },
        {
          "id": "ds-disk-2",
          "question": "Why is C-SCAN (Circular SCAN) often preferred over standard SCAN in busy disk subsystems?",
          "options": [
            "It provides a more uniform waiting time across all track cylinders",
            "It completely eliminates rotational latency",
            "It guarantees zero starvation without needing elevator algorithms",
            "It moves the disk arm faster on return strokes"
          ],
          "correct_option": 0,
          "explanation": "In SCAN, cylinders near the ends are visited less frequently than middle cylinders. C-SCAN treats cylinders as a circular list, servicing in one direction and returning to the beginning, yielding a uniform waiting time distribution."
        },
        {
          "id": "ds-disk-3",
          "question": "What is the main drawback of the Shortest Seek Time First (SSTF) disk scheduling algorithm?",
          "options": [
            "Starvation of requests located far from the current head position",
            "Excessive head movement compared to FCFS",
            "Inability to handle read requests while writing",
            "High rotational latency on solid-state drives"
          ],
          "correct_option": 0,
          "explanation": "SSTF always picks the closest request to the current head position. If a stream of close requests arrives, distant cylinders may starve indefinitely."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Western Digital",
        "Cisco",
        "Amazon"
      ],
      "keyTakeaways": [
        "Seek time is the dominant factor in mechanical disk access latency.",
        "SSTF minimizes seek time locally but can cause starvation for far tracks.",
        "SCAN (Elevator algorithm) sweeps back and forth; C-SCAN sweeps in one direction and resets."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Disk+Scheduling+Algorithms+FCFS+SSTF+SCAN+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-io-management",
      "slug": "io-management",
      "title": "I/O Management",
      "description": "I/O hardware (polling, interrupts, Direct Memory Access / DMA), kernel I/O subsystem (buffering, caching, spooling), and device driver interfaces.",
      "estimatedMinutes": 18,
      "difficulty": "Medium",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Apple"
      ],
      "keyTakeaways": [
        "Polling (Busy-waiting): CPU continuously checks device status register; wastes CPU cycles if device is slow.",
        "Interrupt-Driven I/O: Device raises interrupt request (IRQ) line when data is ready; CPU executes Interrupt Service Routine (ISR).",
        "DMA (Direct Memory Access): Dedicated controller transfers data blocks directly between device and RAM without CPU intervention per byte.",
        "Spooling (Simultaneous Peripheral Ops On-Line): Queues jobs for non-shareable devices (e.g. print spooler)."
      ],
      "notesMarkdown": "# I/O Systems & DMA\n\n---\n\n## 1. I/O Transfer Mechanisms\n1. **Programmed I/O (Polling):** CPU loops checking status bits. Best for very high-speed devices with near-instant responses.\n2. **Interrupt-Driven I/O:** CPU initiates command and continues normal execution. Device sends interrupt when buffer ready.\n3. **DMA (Direct Memory Access):**\n   - For high-speed block devices (NVMe SSDs, Gigabit Ethernet).\n   - CPU writes source, destination, and byte count to DMA controller.\n   - DMA controller transfers entire blocks directly to/from RAM, issuing **only one interrupt per completed block** rather than one per byte.\n\n---\n\n## 2. Kernel I/O Subsystem\n- **Buffering:** Stores data in transit between devices with speed mismatches or differing transfer sizes.\n- **Caching:** Retains copies of frequently accessed data in fast memory.\n- **Spooling:** Buffers output for exclusive-access devices (e.g., printers) so concurrent processes do not interleave print jobs.\n",
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
        },
        {
          "id": "os-io-3",
          "question": "Which disk scheduling algorithm services disk I/O requests by moving the arm in one direction to the end of the disk, then immediately returning to the beginning without servicing requests on the return trip?",
          "options": [
            "C-SCAN (Circular SCAN)",
            "SSTF (Shortest Seek Time First)",
            "FCFS",
            "LOOK"
          ],
          "correct_option": 0,
          "explanation": "C-SCAN sweeps the disk head in one direction servicing requests, and once it reaches the outer limit, returns to the beginning without servicing requests on the return path, providing more uniform wait times than standard SCAN."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=I%2FO+Management+Operating+Systems+OS+GATE+lecture"
    },
    {
      "id": "os-protection-and-security-basics",
      "slug": "protection-and-security-basics",
      "title": "Protection and Security Basics",
      "description": "Protection vs security, Principle of Least Privilege, Access Matrix model, Access Control Lists (ACL) vs Capability Lists, and security threats (buffer overflow, privilege escalation).",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "CrowdStrike",
        "Microsoft",
        "Google",
        "Palo Alto Networks"
      ],
      "keyTakeaways": [
        "Protection: Internal mechanism controlling access of processes/users to system resources.",
        "Security: External defense of system against unauthorized tampering, theft, or sabotage.",
        "Principle of Least Privilege: Every process/user should operate using minimal privileges necessary to complete task.",
        "Access Matrix: Rows are Domains/Users; Columns are Objects. Decomposed by column -> Access Control Lists (ACLs); by row -> Capability Lists."
      ],
      "notesMarkdown": "# Protection & Security Basics\n\n---\n\n## 1. Protection vs. Security\n- **Protection:** Internal mechanisms to enforce access policies across processes, threads, and files.\n- **Security:** Defending system integrity against external attacks, malware, unauthorized penetration, and denial of service.\n\n---\n\n## 2. Access Matrix Decomposition\n- **Access Control List (ACL):**\n  - Stored with the **Object** (column decomposition).\n  - Lists which domains/users can perform operations: `File A: User1 (Read, Write), User2 (Read)`.\n  - Common in file systems (Windows NTFS, POSIX ACLs).\n- **Capability List:**\n  - Stored with the **Subject / Domain** (row decomposition).\n  - A secure ticket held by the process specifying allowed object access rights.\n  - Faster verification, but difficult to revoke privileges globally.\n",
      "questions": [
        {
          "id": "os-sec-1",
          "question": "In the Access Matrix model, storing permissions by columns associated directly with protected objects is known as:",
          "options": [
            "Capability Lists",
            "Access Control Lists (ACLs)",
            "Inodes",
            "Page Tables"
          ],
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
        },
        {
          "id": "os-sec-3",
          "question": "What is the 'Principle of Least Privilege' in computer security architecture?",
          "options": [
            "Every program and user should operate using only the minimal set of privileges and capabilities necessary to complete its legitimate task.",
            "All users should have administrator / root privileges by default.",
            "Passwords should be as short as possible.",
            "Hardware protection rings should be disabled for faster system calls."
          ],
          "correct_option": 0,
          "explanation": "The Principle of Least Privilege dictates that any entity (process, user, service) must be granted only the minimum permissions required to perform its function, limiting the blast radius of any potential compromise."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Protection+and+Security+Basics+Operating+Systems+OS+GATE+lecture"
    }
  ]
};
