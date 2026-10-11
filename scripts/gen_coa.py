import json
import urllib.parse
import re

# Load existing topics for preservation
with open('./scripts/existing_curriculum.json', 'r', encoding='utf-8') as f:
    existing_data = json.load(f)

existing_by_id = {}
existing_by_clean = {}
for sec in existing_data.values():
    for cat in sec['categories']:
        for t in cat['topics']:
            existing_by_id[t['id']] = t
            clean = re.sub(r'[^a-zA-Z0-9]', '', t['title']).lower()
            existing_by_clean[clean] = t

def get_yt_url(title, cat_name="Computer Organization Architecture"):
    query = f"{title} {cat_name} COA gate lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"

topics_defs = [
    {
        "id": "coa-instruction-set-architecture",
        "slug": "instruction-set-architecture",
        "title": "Instruction Set Architecture",
        "description": "Hardware-software abstraction layer, register sets, data types, instruction types (data transfer, arithmetic, control), and endianness.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["Intel", "Qualcomm", "ARM", "Apple"],
        "keyTakeaways": [
            "ISA defines the programmer's view of the processor (registers, instruction set, memory addressing, interrupts).",
            "Big-Endian stores MSB at lowest memory address; Little-Endian stores LSB at lowest memory address (x86/ARM).",
            "Instruction categories: Data transfer (load/store), Arithmetic/Logic (add/sub/and), Control transfer (branch/jump).",
            "Condition codes / status flags: Zero (Z), Carry (C), Overflow (V), Sign/Negative (N)."
        ],
        "youtube_url": get_yt_url("Instruction Set Architecture ISA Endianness Registers"),
        "notesMarkdown": """# Instruction Set Architecture (ISA)

The ISA is the boundary interface between software (compilers/OS) and underlying microarchitecture.

---

## 1. Endianness (Byte Ordering)
Storing 32-bit word `0x12345678` starting at address `0x1000`:
- **Big-Endian:** MSB at lowest address (`0x1000: 12`, `0x1001: 34`, `0x1002: 56`, `0x1003: 78`).
- **Little-Endian:** LSB at lowest address (`0x1000: 78`, `0x1001: 56`, `0x1002: 34`, `0x1003: 12`).

---

## 2. Processor State Registers
- **Program Counter (PC):** Holds address of next instruction to fetch.
- **Instruction Register (IR):** Holds instruction currently being decoded/executed.
- **Memory Address Register (MAR):** Connects to CPU address bus.
- **Memory Buffer / Data Register (MBR/MDR):** Connects to CPU data bus.
""",
        "questions": [
            {
                "id": "coa-isa-1",
                "question": "In a Little-Endian computer architecture, where is the Least Significant Byte (LSB) of a multi-byte word stored?",
                "options": [
                    "At the highest memory address",
                    "At the lowest memory address",
                    "In the instruction register",
                    "In the program counter"
                ],
                "correct_option": 1,
                "explanation": "In Little-Endian systems (such as x86 and ARM in default mode), the lowest-order byte (LSB) is stored at the lowest (first) memory address."
            },
            {
                "id": "coa-isa-2",
                "question": "Which CPU register holds the memory address of the next instruction waiting to be fetched and executed?",
                "options": ["Instruction Register (IR)", "Program Counter (PC)", "Memory Data Register (MDR)", "Accumulator (AC)"],
                "correct_option": 1,
                "explanation": "The Program Counter (PC) stores the memory address of the next instruction to be fetched from memory."
            }
        ]
    },
    {
        "id": "coa-addressing-modes",
        "slug": "instruction-formats-and-addressing-modes",
        "title": "Instruction Formats and Addressing Modes",
        "description": "0, 1, 2, 3-address instructions, Immediate, Direct, Indirect, Register, Register Indirect, Indexed, and PC-relative addressing.",
        "estimatedMinutes": 18,
        "difficulty": "Medium",
        "companyTags": ["Intel", "Qualcomm", "ARM", "NVIDIA"],
        "keyTakeaways": [
            "Immediate: Operand is part of instruction (e.g. MOV R1, #5); 0 memory references.",
            "Direct (Absolute): Address field contains effective address; 1 memory reference.",
            "Indirect: Address field contains address of address pointer; 2 memory references.",
            "Register Indirect: Register contains memory address; 1 memory reference.",
            "PC-Relative: Effective Address = PC + Offset (used for relocatable branch instructions)."
        ],
        "youtube_url": get_yt_url("Addressing Modes Instruction Formats Direct Indirect PC Relative"),
        "notesMarkdown": """# Instruction Formats and Addressing Modes

---

## 1. Addressing Modes Summary

| Addressing Mode | Effective Address ($EA$) | Memory References to Fetch Operand | Use Case |
| :--- | :--- | :--- | :--- |
| **Immediate** | Operand in instruction | **0** | Loading constants |
| **Register** | $EA = R$ | **0** | High-speed register data |
| **Direct (Absolute)** | $EA = \\text{Address}$ | **1** | Global static variables |
| **Indirect** | $EA = [\\text{Address}]$ | **2** | Pointers / dereferencing |
| **Register Indirect**| $EA = [R]$ | **1** | Loops, pointer traversal |
| **PC-Relative** | $EA = PC + \\text{Offset}$ | **1** | Position-independent branches |
| **Base-Register** | $EA = R_{\\text{base}} + \\text{Offset}$ | **1** | Relocatable code segments |
| **Indexed** | $EA = R_{\\text{index}} + \\text{Base}$ | **1** | Array subscript indexing |

---

## 2. Memory Reference Calculations
In Indirect Addressing, reading operand requires:
1. Memory fetch to get Effective Address pointer.
2. Memory fetch to read actual operand at Effective Address. Total = 2 memory accesses.
""",
        "questions": [
            {
                "id": "coa-am-1",
                "question": "Which addressing mode is most suitable for writing position-independent, relocatable branch code?",
                "options": ["Direct Addressing", "PC-Relative Addressing", "Immediate Addressing", "Indirect Addressing"],
                "correct_option": 1,
                "explanation": "PC-Relative addressing computes effective address as an offset from the Program Counter (PC + offset). Because the offset is relative, code can be moved anywhere in memory without breaking branches."
            },
            {
                "id": "coa-am-2",
                "question": "How many memory accesses are required to fetch an operand when using Indirect Addressing Mode?",
                "options": ["0", "1", "2", "3"],
                "correct_option": 2,
                "explanation": "Indirect addressing requires: 1) access memory to read the effective address pointer, and 2) access memory again at that pointer to fetch the operand. Total = 2 memory accesses."
            }
        ]
    },
    {
        "id": "coa-cpu-datapath",
        "slug": "cpu-organization-and-datapath",
        "title": "CPU Organization and Datapath",
        "description": "ALU, internal CPU buses (single-bus vs multi-bus), register files, multiplexers, and micro-operations.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Intel", "Qualcomm", "Apple", "AMD"],
        "keyTakeaways": [
            "Datapath contains the hardware that performs operations: ALU, registers, internal buses, and multiplexers.",
            "Single-bus datapath: Only one operand transfer per clock cycle; multi-bus enables parallel source and destination transfers.",
            "Register file provides multi-port reads and writes simultaneously (e.g. 2 read ports, 1 write port).",
            "ALU performs binary addition, subtraction, AND, OR, XOR, and bit-shifts based on control inputs."
        ],
        "youtube_url": get_yt_url("CPU Datapath Organization ALU Register File Single Bus"),
        "notesMarkdown": """# CPU Organization and Datapath

The CPU is partitioned into the **Datapath** (execution and data routing hardware) and the **Control Unit** (orchestrator).

---

## 1. Single-Bus Datapath Organization
In a single internal CPU bus:
- Only one data transfer can take place at any clock step.
- An operation like $R_3 \\leftarrow R_1 + R_2$ requires 3 micro-steps:
  1. $R_1 \\to Y$ (temp register)
  2. $R_2$ placed on bus, ALU computes $Y + R_2$, result stored in $Z$
  3. $Z \\to R_3$

---

## 2. Multi-Bus Advantages
A 3-bus architecture has two source buses and one destination bus, enabling complete ALU operations in a single clock cycle.
""",
        "questions": [
            {
                "id": "coa-dp-1",
                "question": "In a single-bus CPU organization, why cannot an ALU addition R3 = R1 + R2 be executed in a single clock cycle?",
                "options": [
                    "The ALU is too slow",
                    "A single bus can carry only one operand transfer at a time, requiring temporary registers",
                    "ALU requires 3 inputs",
                    "Registers cannot output data"
                ],
                "correct_option": 1,
                "explanation": "With only one bus, R1 and R2 cannot both be driven onto the bus simultaneously. One operand must first be latched into a temporary register (Y) in one cycle before the second operand is driven on the bus."
            },
            {
                "id": "coa-dp-2",
                "question": "What is the primary function of the Memory Address Register (MAR)?",
                "options": [
                    "To store the instruction opcode",
                    "To hold the address in memory that is currently being read from or written to",
                    "To store the accumulator result",
                    "To count clock cycles"
                ],
                "correct_option": 1,
                "explanation": "The MAR directly drives the CPU's address bus, holding the exact physical memory address for the active read or write operation."
            }
        ]
    },
    {
        "id": "coa-instruction-cycle",
        "slug": "instruction-execution-cycle",
        "title": "Instruction Execution Cycle",
        "description": "Fetch, Decode, Operand Fetch, Execute, and Write-back phases, timing diagrams, and register transfers.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["Intel", "Qualcomm", "ARM", "Infosys"],
        "keyTakeaways": [
            "Instruction Cycle: Fetch -> Decode -> Operand Fetch -> Execute -> Writeback -> Interrupt Check.",
            "Fetch Phase: MAR <- PC; MBR <- M[MAR]; IR <- MBR; PC <- PC + 4.",
            "Decode Phase: Control unit inspects opcode and addressing mode bits in IR.",
            "Interrupt cycle occurs at the end of the instruction cycle before fetching next instruction."
        ],
        "youtube_url": get_yt_url("Instruction Execution Cycle Fetch Decode Execute Writeback"),
        "notesMarkdown": """# Instruction Execution Cycle

The instruction cycle is the sequence of operations the CPU performs to process each instruction.

---

## 1. Step-by-Step Micro-operations
1. **Fetch:**
   - $T_1: MAR \\leftarrow PC$
   - $T_2: MBR \\leftarrow M[MAR], \\; PC \\leftarrow PC + I$
   - $T_3: IR \\leftarrow MBR$
2. **Decode:** Control unit decodes opcode from $IR$, prepares datapath control lines.
3. **Operand Fetch:** Resolves effective address and retrieves memory/register operands.
4. **Execute:** ALU computes operation or updates Program Counter for branch instructions.
5. **Write-Back:** Result stored in destination register or memory.
""",
        "questions": [
            {
                "id": "coa-ic-1",
                "question": "During the instruction fetch phase, what happens immediately after the instruction is loaded into the Instruction Register (IR)?",
                "options": [
                    "The instruction is executed",
                    "The instruction opcode is decoded by the Control Unit",
                    "The CPU halts",
                    "Data is written to memory"
                ],
                "correct_option": 1,
                "explanation": "Once fetched into the IR, the control unit immediately enters the Decode phase to analyze the opcode and addressing mode bits."
            },
            {
                "id": "coa-ic-2",
                "question": "At what stage of the instruction execution cycle does the CPU check for pending hardware interrupts?",
                "options": [
                    "Before the fetch cycle begins",
                    "Immediately after decoding",
                    "At the end of the current instruction cycle (after execution/writeback)",
                    "Continuously in the middle of ALU operations"
                ],
                "correct_option": 2,
                "explanation": "To maintain architectural state consistency, the CPU checks for interrupt requests at the completion of an instruction cycle before fetching the next instruction."
            }
        ]
    },
    {
        "id": "coa-control-unit-design",
        "slug": "hardwired-and-microprogrammed-control",
        "title": "Hardwired and Microprogrammed Control",
        "description": "Hardwired control unit (combinational logic, state counters), Microprogrammed control (control store ROM, microinstructions, horizontal vs vertical).",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Intel", "Qualcomm", "NVIDIA", "Broadcom"],
        "keyTakeaways": [
            "Hardwired Control: Implemented using combinational logic gates and decoders; faster, but inflexible and hard to modify (used in RISC).",
            "Microprogrammed Control: Control signals stored as microinstructions in Control Store ROM; slower, but flexible and easy to modify (used in CISC).",
            "Horizontal Microprogramming: 1 bit per control signal; no decoding required; very wide control words; high speed.",
            "Vertical Microprogramming: Control signals encoded into groups; requires decoders; narrow words; slower."
        ],
        "youtube_url": get_yt_url("Hardwired vs Microprogrammed Control Horizontal Vertical"),
        "notesMarkdown": """# Hardwired and Microprogrammed Control

---

## 1. Comparison Matrix

| Metric | Hardwired Control Unit | Microprogrammed Control Unit |
| :--- | :--- | :--- |
| **Implementation** | Logic gates, decoders, flip-flops | Control memory (ROM) with micro-code |
| **Speed** | **Very Fast** | Slower (ROM read delay) |
| **Flexibility** | Rigid; modifying instructions requires circuit redesign | **Flexible**; modify ROM micro-program |
| **Instruction Set** | Best for **RISC** (simple, uniform) | Best for **CISC** (complex instructions) |
| **Cost** | High for complex instruction sets | Lower design cost for complex sets |

---

## 2. Horizontal vs Vertical Microprogramming
- **Horizontal:** Each control signal has a dedicated bit. Wide words, fast, zero decoding.
- **Vertical:** Control bits encoded (e.g. 3 bits decoded to 8 signals). Narrow words, slower due to decoders.
""",
        "questions": [
            {
                "id": "coa-cu-1",
                "question": "Which type of control unit provides maximum execution speed and is standard in modern RISC processors?",
                "options": [
                    "Vertical microprogrammed control",
                    "Hardwired control unit",
                    "Horizontal microprogrammed control",
                    "Soft-coded control unit"
                ],
                "correct_option": 1,
                "explanation": "Hardwired control units generate signals directly using combinational gate networks with zero ROM access latency, making them significantly faster than microprogrammed control units."
            },
            {
                "id": "coa-cu-2",
                "question": "In Horizontal Microprogramming, how are control signals represented in each microinstruction?",
                "options": [
                    "Each control signal has a dedicated bit directly controlling a hardware gate line without decoding",
                    "Signals are compressed using Huffman coding",
                    "All signals are multiplexed onto a single serial pin",
                    "Signals are decoded using priority encoders"
                ],
                "correct_option": 0,
                "explanation": "In horizontal microprogramming, each bit in the control word directly corresponds to one control signal, eliminating decoding delays at the expense of wider control memory words."
            }
        ]
    },
    {
        "id": "cpu-pipelining-hazards",
        "slug": "pipelining-and-pipeline-hazards",
        "title": "Pipelining and Pipeline Hazards",
        "description": "5-stage RISC pipeline (IF, ID, EX, MEM, WB), throughput, speedup, structural hazards, data hazards (RAW, WAR, WAW), forwarding, and control hazards.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Intel", "Google", "Qualcomm", "NVIDIA", "Apple"],
        "keyTakeaways": [
            "Ideal speedup of k-stage pipeline for n instructions is Speedup = (n * k) / (k + n - 1) ≈ k as n -> infinity.",
            "Structural Hazard: Hardware resource conflict (e.g., single memory port for both instructions and data).",
            "Data Hazard (RAW - Read After Write): Dependent instruction needs data before predecessor writes it. Solved via Operand Forwarding / Bypassing.",
            "Control Hazard (Branch penalty): Change in PC invalidates fetched instructions. Solved via Branch Prediction and Delayed Branching."
        ],
        "youtube_url": get_yt_url("Pipelining Pipeline Hazards Structural Data Control RAW Forwarding"),
        "notesMarkdown": """# Pipelining and Pipeline Hazards

Pipelining overlaps the execution of multiple instructions to increase instruction throughput.

---

## 1. Classic 5-Stage RISC Pipeline
1. **IF (Instruction Fetch):** Fetch instruction from memory via PC.
2. **ID (Instruction Decode):** Decode opcode and read register file.
3. **EX (Execute):** ALU computes arithmetic or calculates branch target.
4. **MEM (Memory Access):** Read or write data memory for load/store.
5. **WB (Write Back):** Write result back to destination register.

---

## 2. Pipeline Hazards & Mitigations
- **Structural Hazard:** Resource conflict. Mitigation: Separate instruction and data caches (Harvard architecture).
- **Data Hazard (RAW):** Dependent register read before writeback. Mitigation: **Operand Forwarding (Bypassing)** from EX/MEM stage to EX stage.
- **Control Hazard:** Branch instructions alter PC. Mitigation: Static/Dynamic branch prediction, branch target buffers (BTB).
""",
        "questions": [
            {
                "id": "coa-pipe-1",
                "question": "What is the maximum theoretical speedup of a 5-stage pipeline over an unpipelined processor for a very large number of instructions?",
                "options": ["2.5x", "5x", "10x", "Unlimited"],
                "correct_option": 1,
                "explanation": "For N instructions in a k-stage pipeline with balanced stages, as N approaches infinity, the theoretical speedup approaches the number of pipeline stages k = 5."
            },
            {
                "id": "coa-pipe-2",
                "question": "Which pipeline technique eliminates data hazard stalls by routing ALU output directly from execution/memory stages back to the ALU input without waiting for writeback?",
                "options": ["Branch prediction", "Operand Forwarding (Bypassing)", "Out-of-order retirement", "Loop unrolling"],
                "correct_option": 1,
                "explanation": "Operand forwarding connects the output of the EX or MEM stage directly to the ALU inputs of the subsequent instruction, bypassing the register writeback stage."
            }
        ]
    },
    {
        "id": "coa-memory-hierarchy",
        "slug": "memory-hierarchy",
        "title": "Memory Hierarchy",
        "description": "Locality of reference (temporal and spatial), cost-speed-capacity tradeoffs, registers, L1/L2/L3 caches, main memory, and secondary storage.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["Intel", "Amazon", "Microsoft", "Qualcomm"],
        "keyTakeaways": [
            "Principle of Locality: Temporal (reused recently accessed items) and Spatial (items close in address accessed together).",
            "Hierarchy levels: CPU Registers (fastest, smallest, expensive) -> L1/L2/L3 Cache (SRAM) -> Main Memory (DRAM) -> SSD/HDD (flash/magnetic).",
            "SRAM vs DRAM: SRAM uses bistable cross-coupled inverters (no refresh, faster); DRAM uses single capacitor + transistor (requires periodic refresh).",
            "Average Memory Access Time (AMAT) = Hit Time + (Miss Rate * Miss Penalty)."
        ],
        "youtube_url": get_yt_url("Memory Hierarchy Locality of Reference AMAT SRAM DRAM"),
        "notesMarkdown": """# Memory Hierarchy

Memory hierarchy bridges the CPU-memory performance gap using the Principle of Locality.

---

## 1. Principle of Locality
- **Temporal Locality:** Items accessed recently are likely to be accessed again soon (e.g. loop counters).
- **Spatial Locality:** Items located near recently accessed addresses are likely to be accessed soon (e.g. array traversal).

---

## 2. Average Memory Access Time (AMAT)
$$\\text{AMAT} = T_{\\text{hit}} + (\\text{Miss Rate} \\times \\text{Miss Penalty})$$
For multi-level caches:
$$\\text{AMAT} = T_{L1} + \\text{MR}_{L1} \\times (T_{L2} + \\text{MR}_{L2} \\times \\text{Penalty}_{\\text{Mem}})$$
""",
        "questions": [
            {
                "id": "coa-mh-1",
                "question": "If a cache has a hit time of 2 ns, a miss rate of 10%, and a miss penalty of 50 ns, what is the Average Memory Access Time (AMAT)?",
                "options": ["7 ns", "5.2 ns", "12 ns", "52 ns"],
                "correct_option": 0,
                "explanation": "AMAT = Hit Time + (Miss Rate * Miss Penalty) = 2 ns + (0.10 * 50 ns) = 2 + 5 = 7 ns."
            },
            {
                "id": "coa-mh-2",
                "question": "Which type of memory uses a capacitor and a transistor per cell and requires periodic electrical refresh cycles?",
                "options": ["SRAM (Static RAM)", "DRAM (Dynamic RAM)", "ROM", "Flash Memory"],
                "correct_option": 1,
                "explanation": "DRAM stores bits as electrical charges on tiny capacitors that leak over time, requiring periodic refresh operations to retain stored data."
            }
        ]
    },
    {
        "id": "cache-memory-coherence",
        "slug": "cache-memory-and-mapping-techniques",
        "title": "Cache Memory and Mapping Techniques",
        "description": "Direct mapped, Fully associative, Set associative cache architectures, Tag/Set/Offset bit partitioning, write policies, and MESI coherence.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Intel", "Qualcomm", "NVIDIA", "AMD", "Apple"],
        "keyTakeaways": [
            "Cache address breakdown: [Tag | Set Index | Block/Word Offset].",
            "Direct Mapped: Each memory block maps to exactly 1 cache line (Set = Block Mod Sets); prone to conflict misses.",
            "Fully Associative: Block can reside in any cache line; no set index bits; requires parallel associative comparison of all tags.",
            "k-Way Set Associative: Block maps to a specific set of k lines; optimal balance between hit latency and miss rate.",
            "Write-Through vs Write-Back: Write-through updates main memory on every write; Write-back updates only on dirty block eviction."
        ],
        "youtube_url": get_yt_url("Cache Memory Mapping Techniques Direct Mapped Set Associative Tag"),
        "notesMarkdown": """# Cache Memory and Mapping Techniques

---

## 1. Cache Organization Address Partitioning
For a 32-bit address, cache size $C$, block size $B$, associativity $k$:
- **Word Offset Bits ($w$):** $\\log_2(B)$
- **Set Index Bits ($s$):** $\\log_2(\\text{Number of Sets}) = \\log_2\\left( \\frac{C}{B \\times k} \\right)$
- **Tag Bits ($t$):** $32 - s - w$

---

## 2. The 3 C's of Cache Misses
1. **Compulsory (Cold) Misses:** First access to a block. (Reduced by larger block size).
2. **Capacity Misses:** Cache cannot hold all blocks needed for working set. (Reduced by larger cache).
3. **Conflict (Collision) Misses:** Multiple blocks compete for the same set. (Eliminated by Fully Associative mapping).
""",
        "questions": [
            {
                "id": "coa-cm-1",
                "question": "In a 32-bit byte-addressable system with a 64 KB 4-way set-associative cache and 64-byte blocks, how many bits are used for the Set Index?",
                "options": ["8 bits", "10 bits", "12 bits", "6 bits"],
                "correct_option": 0,
                "explanation": "Block size = 64 B -> Offset bits = log2(64) = 6 bits. Total lines = 64 KB / 64 B = 1024 lines. Since it is 4-way associative, Number of Sets = 1024 / 4 = 256 sets. Set Index bits = log2(256) = 8 bits."
            },
            {
                "id": "coa-cm-2",
                "question": "Which write policy updates both the cache and main memory simultaneously on every write hit?",
                "options": ["Write-Back", "Write-Through", "Write-Allocate", "No-Write Allocate"],
                "correct_option": 1,
                "explanation": "Write-Through immediately writes the updated data to both the cache and main memory, maintaining strict coherence at the cost of higher bus write traffic."
            }
        ]
    },
    {
        "id": "coa-main-virtual-memory",
        "slug": "main-memory-and-virtual-memory-basics",
        "title": "Main Memory and Virtual Memory Basics",
        "description": "Page tables, Translation Lookaside Buffer (TLB), effective memory access time with TLB, page faults, and virtual-to-physical address translation.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Intel", "Google", "Amazon", "Microsoft"],
        "keyTakeaways": [
            "Virtual memory decouples logical address space from physical RAM via fixed-size Pages and Frames.",
            "Virtual address = [Virtual Page Number (VPN) | Page Offset]; Physical address = [Physical Frame Number (PFN) | Page Offset].",
            "TLB (Translation Lookaside Buffer): Fast hardware cache for page table translations.",
            "Effective Access Time with TLB: EAT = Hit_TLB * (t_TLB + t_mem) + (1 - Hit_TLB) * (t_TLB + 2 * t_mem) for 1-level page table."
        ],
        "youtube_url": get_yt_url("Virtual Memory Page Table TLB Hit Ratio Effective Access Time"),
        "notesMarkdown": """# Main Memory and Virtual Memory Basics

Virtual memory allows processes to execute with an address space larger than physical RAM.

---

## 1. Address Translation
- **Logical Address:** Broken into `Page Number (p)` and `Offset (d)`.
- Page size $= 2^d$ bytes (remains identical in physical memory frame).
- Page Table maps `Page Number -> Frame Number (f)`.
- Physical Address $= f \\times 2^d + d$.

---

## 2. Effective Access Time with TLB
$$\\text{EAT} = h \\times (t_{\\text{TLB}} + t_{\\text{mem}}) + (1 - h) \\times (t_{\\text{TLB}} + 2 \\times t_{\\text{mem}})$$
where $h$ is TLB hit ratio and page table is single-level.
""",
        "questions": [
            {
                "id": "coa-vm-1",
                "question": "If TLB access time is 10 ns, memory access time is 100 ns, and TLB hit ratio is 90% in a single-level paging system, what is the Effective Memory Access Time?",
                "options": ["110 ns", "120 ns", "100 ns", "190 ns"],
                "correct_option": 1,
                "explanation": "EAT = 0.90 * (10 + 100) + 0.10 * (10 + 100 + 100) = 0.90 * 110 + 0.10 * 210 = 99 + 21 = 120 ns."
            },
            {
                "id": "coa-vm-2",
                "question": "In virtual memory paging, why is the page offset in the virtual address identical to the frame offset in the physical address?",
                "options": [
                    "To save cache tags",
                    "Because virtual pages and physical memory frames have the exact same byte capacity",
                    "To prevent internal fragmentation",
                    "Because page tables are stored on disk"
                ],
                "correct_option": 1,
                "explanation": "Pages in virtual memory and frames in physical RAM are defined to be the exact same size (e.g. 4 KB), meaning the internal byte displacement (offset) is completely identical in both."
            }
        ]
    },
    {
        "id": "coa-associative-memory",
        "slug": "associative-memory",
        "title": "Associative Memory",
        "description": "Content Addressable Memory (CAM), parallel match logic, search by content rather than address, and TLB integration.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Cisco", "Intel", "Broadcom", "Qualcomm"],
        "keyTakeaways": [
            "Associative Memory / Content Addressable Memory (CAM) searches by data contents simultaneously in parallel, not by address.",
            "Every bit cell has internal comparator logic, making CAM hardware complex and expensive.",
            "Returns the memory address where the requested content resides in O(1) clock cycles.",
            "Widely used in high-speed TLBs and network switch routing tables (TCAM)."
        ],
        "youtube_url": get_yt_url("Associative Memory Content Addressable Memory CAM TLB COA"),
        "notesMarkdown": """# Associative Memory (Content Addressable Memory - CAM)

Associative memory accesses stored words based on their **content** rather than a sequential address.

---

## 1. Operating Principle
- An **Argument Register** holds the pattern to be matched.
- A **Key / Mask Register** specifies which bits to match.
- All memory words are compared **in parallel** against the argument in a single clock cycle.
- A **Match Register** flags every row that satisfies the condition.

---

## 2. High-Yield Applications
- **TLB (Translation Lookaside Buffer):** Compares virtual page numbers in parallel.
- **TCAM in Network Routers:** Evaluates IP longest prefix matching in hardware at line rates (100 Gbps+).
""",
        "questions": [
            {
                "id": "coa-cam-1",
                "question": "How does Content Addressable Memory (CAM) locate stored information?",
                "options": [
                    "By reading sequentially from index 0",
                    "By comparing input data against all stored words in parallel simultaneously",
                    "By hashing the data key",
                    "By using a binary search tree"
                ],
                "correct_option": 1,
                "explanation": "Associative memory compares input search data against all stored entries in parallel in a single clock cycle, returning matching addresses directly."
            },
            {
                "id": "coa-cam-2",
                "question": "What is the primary trade-off of Content Addressable Memory (CAM) compared to standard RAM?",
                "options": [
                    "CAM is slower than RAM",
                    "CAM requires comparison logic at every memory cell, making it far more expensive and power-intensive",
                    "CAM cannot store binary data",
                    "CAM requires refresh cycles"
                ],
                "correct_option": 1,
                "explanation": "CAM requires internal comparison circuitry embedded inside every bit cell, resulting in significantly higher silicon area, manufacturing cost, and power consumption."
            }
        ]
    },
    {
        "id": "coa-io-organization",
        "slug": "io-organization",
        "title": "I/O Organization",
        "description": "Programmed I/O, Interrupt-driven I/O, Direct Memory Access (DMA), memory-mapped I/O vs isolated I/O.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Intel", "Qualcomm", "Cisco", "IBM"],
        "keyTakeaways": [
            "Programmed I/O: CPU polls device status in busy-wait loop; wastes CPU cycles.",
            "Interrupt-driven I/O: Device signals CPU when ready; CPU handles other tasks in between.",
            "DMA: Dedicated DMA controller transfers bulk data directly between I/O device and RAM without CPU intervention.",
            "Memory-Mapped I/O: Shared address space for memory and I/O (uses normal LOAD/STORE instructions). Isolated I/O: Separate I/O space with special IN/OUT instructions."
        ],
        "youtube_url": get_yt_url("IO Organization Programmed Interrupt Driven DMA Memory Mapped"),
        "notesMarkdown": """# I/O Organization

---

## 1. The Three I/O Transfer Mechanisms
1. **Programmed I/O:** CPU continuously polls device status bits (Busy-Waiting). Zero CPU utilization efficiency.
2. **Interrupt-Driven I/O:** CPU issues command, continues executing other processes. Device raises an interrupt when ready.
3. **Direct Memory Access (DMA):** Hardware DMA controller takes master control of system bus and transfers data blocks directly between I/O and RAM.

---

## 2. Memory-Mapped vs Isolated (Port-Mapped) I/O
- **Memory-Mapped I/O:** Same address bus for memory and I/O devices. Uses regular `MOV / LOAD / STORE` instructions. Reduces available RAM address space.
- **Isolated I/O:** Separate address spaces. Uses specialized machine instructions like `IN` and `OUT` in x86.
""",
        "questions": [
            {
                "id": "coa-io-1",
                "question": "Which I/O technique allows high-speed peripheral devices to transfer blocks of data directly to/from main memory without continuously involving the CPU?",
                "options": ["Programmed I/O", "Interrupt-driven I/O", "Direct Memory Access (DMA)", "Polled I/O"],
                "correct_option": 2,
                "explanation": "DMA (Direct Memory Access) offloads bulk data transfers to a dedicated controller, allowing memory and device to transfer data directly over the bus without CPU intervention."
            },
            {
                "id": "coa-io-2",
                "question": "In Memory-Mapped I/O, how does the CPU communicate with I/O device registers?",
                "options": [
                    "Using dedicated IN and OUT instructions",
                    "Using standard memory read/write instructions (like LOAD and STORE) to designated memory addresses",
                    "Using software interrupts only",
                    "Through the ALU status flags"
                ],
                "correct_option": 1,
                "explanation": "In memory-mapped I/O, device registers share the system's physical address space, allowing ordinary memory read/write instructions (LOAD, STORE, MOV) to interact with device ports."
            }
        ]
    },
    {
        "id": "coa-interrupts-and-dma",
        "slug": "interrupts-and-dma",
        "title": "Interrupts and DMA",
        "description": "Vectored vs non-vectored interrupts, maskable/non-maskable, priority arbitration (daisy chaining), DMA burst vs cycle stealing.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Intel", "Qualcomm", "Apple", "Broadcom"],
        "keyTakeaways": [
            "Vectored Interrupt: Device supplies interrupt vector (address of Interrupt Service Routine - ISR) on data bus.",
            "Non-Vectored: Fixed ISR address; CPU polls devices to determine source.",
            "Priority Arbitration: Daisy chaining (hardware serial grant line) resolves simultaneous interrupt requests.",
            "DMA Modes: Burst mode (DMA holds bus for entire block) vs Cycle Stealing mode (DMA steals one memory cycle between CPU instruction steps)."
        ],
        "youtube_url": get_yt_url("Interrupts and DMA Daisy Chaining Cycle Stealing Burst Mode"),
        "notesMarkdown": """# Interrupts and DMA

---

## 1. Interrupt Types & Handling
- **Maskable vs Non-Maskable (NMI):** NMI (e.g. power failure, memory parity error) cannot be disabled by CPU flags.
- **Vectored Interrupt:** Device supplies address vector pointing to Interrupt Vector Table (IVT) containing the **Interrupt Service Routine (ISR)** address.
- **Daisy Chaining:** Serial priority arbitration where Interrupt Acknowledge signal travels down the chain; closest device has highest priority.

---

## 2. DMA Transfer Modes
- **Burst Mode:** DMA controller takes control of system bus and transfers entire block without releasing bus.
- **Cycle Stealing Mode:** DMA controller takes control of bus for single memory cycles between CPU operations, minimizing CPU stalls.
""",
        "questions": [
            {
                "id": "coa-int-1",
                "question": "What is the primary advantage of Vectored Interrupts over Non-Vectored Interrupts?",
                "options": [
                    "Vectored interrupts use less power",
                    "The device provides its own interrupt vector address directly, eliminating software polling by the CPU",
                    "Vectored interrupts cannot be masked",
                    "They do not require an ISR"
                ],
                "correct_option": 1,
                "explanation": "In a vectored interrupt, the interrupting device directly passes the address pointer (vector) to the CPU, allowing the CPU to jump to the specific ISR immediately without polling devices."
            },
            {
                "id": "coa-int-2",
                "question": "In DMA 'Cycle Stealing' mode, when does the DMA controller utilize the system bus?",
                "options": [
                    "It locks the bus for hours",
                    "It acquires the bus for one memory cycle at a time during CPU instruction phases where the CPU does not need the bus",
                    "Only when the computer boots up",
                    "During the arithmetic decode phase"
                ],
                "correct_option": 1,
                "explanation": "Cycle stealing borrows single bus cycles while the CPU is engaged in internal register activities, transferring data incrementally without halting CPU execution for extended periods."
            }
        ]
    },
    {
        "id": "coa-bus-architecture",
        "slug": "bus-architecture",
        "title": "Bus Architecture",
        "description": "System buses (Address, Data, Control), synchronous vs asynchronous bus protocols, bus bandwidth, and bus arbitration.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["Intel", "Qualcomm", "Cisco", "AMD"],
        "keyTakeaways": [
            "System Bus triad: Address Bus (unidirectional, determines addressable memory), Data Bus (bidirectional, word size), Control Bus (timing/commands).",
            "Synchronous Bus: Clocked protocol; transfers occur on clock edges; fixed timing.",
            "Asynchronous Bus: Handshake protocol (Request and Acknowledge lines); adapts to devices of varying speeds.",
            "Bus Bandwidth = (Bus Width in bytes) * (Bus Frequency)."
        ],
        "youtube_url": get_yt_url("Bus Architecture Synchronous Asynchronous Handshake COA"),
        "notesMarkdown": """# Bus Architecture

A bus is a shared communication pathway connecting two or more subsystem components.

---

## 1. System Bus Components
- **Address Bus (Unidirectional from CPU):** $k$ lines address $2^k$ distinct memory locations.
- **Data Bus (Bidirectional):** $w$ lines transfer $w$ bits simultaneously per cycle.
- **Control Bus:** Carries read/write enable, memory/IO select, interrupt, and clock lines.

---

## 2. Synchronous vs Asynchronous Buses
- **Synchronous:** Governed by common master clock. High speed, but all devices must match clock cycle constraints.
- **Asynchronous:** Governed by handshake signals (`Master Ready` and `Slave Ready`). Accommodates slow and fast devices seamlessly.
""",
        "questions": [
            {
                "id": "coa-bus-1",
                "question": "If a CPU has a 36-bit address bus and byte-addressable memory, what is the maximum addressable physical memory capacity?",
                "options": ["4 GB", "16 GB", "64 GB", "128 GB"],
                "correct_option": 2,
                "explanation": "2^36 bytes = 2^6 * 2^30 bytes = 64 Gigabytes (64 GB)."
            },
            {
                "id": "coa-bus-2",
                "question": "How does an Asynchronous Bus coordinate data transfers between CPU and slow peripherals?",
                "options": [
                    "Using a fixed high-frequency clock signal",
                    "Using handshaking protocol signals (Ready and Acknowledge lines)",
                    "Through polling registers",
                    "By dropping slow packets"
                ],
                "correct_option": 1,
                "explanation": "Asynchronous buses use handshake lines (Ready/Acknowledge) so that completion of each transfer step is confirmed before initiating the next step, adapting to slow peripherals."
            }
        ]
    },
    {
        "id": "risc-cisc-registers",
        "slug": "risc-vs-cisc",
        "title": "RISC vs. CISC",
        "description": "RISC vs CISC architectural philosophies, instruction formats, register-to-register load/store architectures, and code density.",
        "estimatedMinutes": 16,
        "difficulty": "Easy",
        "companyTags": ["ARM", "Intel", "Apple", "AMD", "Qualcomm"],
        "keyTakeaways": [
            "RISC (Reduced Instruction Set Computer): Fixed instruction length (typically 32 bits), single-cycle execution, load/store architecture, hardwired control.",
            "CISC (Complex Instruction Set Computer): Variable instruction length, multi-cycle instructions, memory-to-memory operations, microprogrammed control.",
            "RISC emphasizes compiler optimization; CISC emphasizes hardware complexity and code density.",
            "Modern x86 chips decode CISC instructions into internal RISC-like micro-ops (uops) dynamically."
        ],
        "youtube_url": get_yt_url("RISC vs CISC Architecture Differences Comparison ARM x86"),
        "notesMarkdown": """# RISC vs. CISC

---

## 1. Architectural Comparison Matrix

| Characteristic | RISC (e.g. ARM, RISC-V, MIPS) | CISC (e.g. x86, VAX, 68000) |
| :--- | :--- | :--- |
| **Instruction Length** | Fixed (typically 32 bits) | Variable (1 to 15 bytes in x86) |
| **Execution Cycles** | Typically 1 cycle per instruction | Multi-cycle complex instructions |
| **Memory Access** | **Load/Store Architecture** strictly | Memory-to-memory operations allowed |
| **Registers** | Large general-purpose register file (32+) | Fewer general-purpose registers (8 to 16) |
| **Control Unit** | **Hardwired** (fast, simple) | **Microprogrammed** (complex ROM) |
| **Pipelining** | Highly efficient, easily pipelined | Difficult due to variable lengths |
""",
        "questions": [
            {
                "id": "coa-rc-1",
                "question": "What is meant by a 'Load/Store Architecture' in RISC processors?",
                "options": [
                    "Instructions can perform arithmetic directly on memory locations",
                    "Only dedicated LOAD and STORE instructions access memory; all arithmetic operations operate strictly on registers",
                    "The processor has no cache",
                    "Memory and registers share the same bus"
                ],
                "correct_option": 1,
                "explanation": "In a Load/Store architecture (standard in RISC), arithmetic and logic operations must operate exclusively on register operands. Data must first be loaded into registers before processing."
            },
            {
                "id": "coa-rc-2",
                "question": "Which of the following is a defining feature of CISC architectures?",
                "options": [
                    "Fixed-length 32-bit instructions",
                    "Variable-length instructions with multiple addressing modes",
                    "Hardwired control unit with single-cycle execution",
                    "Zero memory access instructions"
                ],
                "correct_option": 1,
                "explanation": "CISC architectures feature variable instruction lengths (e.g. 1 to 15 bytes in x86) and rich, complex addressing modes that can perform operations directly on memory operands."
            }
        ]
    },
    {
        "id": "coa-alu-arithmetic",
        "slug": "arithmetic-operations-and-alu",
        "title": "Arithmetic Operations and ALU",
        "description": "Booth's multiplication algorithm, non-restoring division, ALU design, barrel shifters, and overflow detection.",
        "estimatedMinutes": 18,
        "difficulty": "Hard",
        "companyTags": ["Intel", "Qualcomm", "NVIDIA", "AMD"],
        "keyTakeaways": [
            "Booth's Algorithm multiplies signed 2's complement numbers efficiently by treating contiguous runs of 1s as single operations (subtraction at start, addition at end).",
            "Booth recoding pairs (q0, q-1): '10' -> Subtract multiplicand; '01' -> Add multiplicand; '00' and '11' -> Shift only.",
            "Restoring vs Non-Restoring Division: Non-restoring division skips adding back divisor on negative remainder.",
            "Barrel shifter rotates or shifts an n-bit word by any number of positions in a single clock cycle using multiplexer stages."
        ],
        "youtube_url": get_yt_url("Booths Multiplication Algorithm Arithmetic ALU COA"),
        "notesMarkdown": """# Arithmetic Operations and ALU

---

## 1. Booth's Multiplication Algorithm
Multiplies signed binary integers in 2's complement without sign extension:
Inspect bits $(Q_0, Q_{-1})$:
- `10`: $A \\leftarrow A - M$, Arithmetic Right Shift $(A, Q, Q_{-1})$
- `01`: $A \\leftarrow A + M$, Arithmetic Right Shift $(A, Q, Q_{-1})$
- `00` or `11`: Arithmetic Right Shift $(A, Q, Q_{-1})$

Speedup: Replaces sequences of additions across contiguous blocks of 1s with a single subtraction and addition.
""",
        "questions": [
            {
                "id": "coa-alu-1",
                "question": "In Booth's multiplication algorithm, what action is performed when the current multiplier bit and previous bit (Q0, Q-1) are '1 0'?",
                "options": [
                    "Add multiplicand to accumulator, then arithmetic shift right",
                    "Subtract multiplicand from accumulator, then arithmetic shift right",
                    "Arithmetic shift right only",
                    "No operation"
                ],
                "correct_option": 1,
                "explanation": "In Booth's algorithm, transitioning from 0 to 1 (pair 10) marks the beginning of a block of 1s, which triggers subtracting the multiplicand (A = A - M) followed by arithmetic right shift."
            },
            {
                "id": "coa-alu-2",
                "question": "Why is Arithmetic Right Shift used instead of Logical Right Shift in signed integer arithmetic?",
                "options": [
                    "It is faster",
                    "It preserves the sign bit (MSB) while shifting to maintain the correct signed value",
                    "It inverts all bits",
                    "It performs multiplication by 2"
                ],
                "correct_option": 1,
                "explanation": "Arithmetic right shift replicates the sign bit (MSB) into vacant bit positions, correctly preserving negative values in 2's complement division by 2."
            }
        ]
    },
    {
        "id": "coa-amdahl-metrics",
        "slug": "performance-metrics-and-amdahls-law",
        "title": "Performance Metrics and Amdahl's Law",
        "description": "Clock cycle time, CPI (Cycles Per Instruction), MIPS, MFLOPS, CPU execution time formula, and Amdahl's Law speedup bounds.",
        "estimatedMinutes": 16,
        "difficulty": "Medium",
        "companyTags": ["Google", "Intel", "NVIDIA", "Amazon"],
        "keyTakeaways": [
            "CPU Execution Time = Instruction Count * CPI * Clock Cycle Time.",
            "CPI (Cycles Per Instruction) = sum(CPI_i * Fraction_i).",
            "Amdahl's Law: Overall Speedup = 1 / ((1 - f) + f / s), where f is parallelizable fraction and s is component speedup.",
            "Max theoretical speedup as s -> infinity is 1 / (1 - f) (serial fraction limits speedup!)."
        ],
        "youtube_url": get_yt_url("Amdahls Law CPU Performance Equation CPI MIPS"),
        "notesMarkdown": """# Performance Metrics and Amdahl's Law

---

## 1. Fundamental Performance Equation
$$\\text{CPU Time} = \\text{Instruction Count} \\times \\text{CPI} \\times T_{\\text{clock}} = \\frac{\\text{Instruction Count} \\times \\text{CPI}}{\\text{Clock Rate}}$$

---

## 2. Amdahl's Law
If a fraction $f$ of an application is enhanced by speedup factor $s$:
$$\\text{Overall Speedup} = \\frac{1}{(1 - f) + \\frac{f}{s}}$$
As $s \\to \\infty$, the maximum achievable speedup is strictly bounded by:
$$S_{\\max} = \\frac{1}{1 - f}$$
""",
        "questions": [
            {
                "id": "coa-perf-1",
                "question": "According to Amdahl's Law, if 80% of a program can be parallelized, what is the MAXIMUM theoretical speedup achievable even with infinitely many processors?",
                "options": ["4x", "5x", "10x", "80x"],
                "correct_option": 1,
                "explanation": "f = 0.80. The serial fraction (1 - f) is 0.20. As speedup s -> infinity, Max Speedup = 1 / (1 - f) = 1 / 0.20 = 5x."
            },
            {
                "id": "coa-perf-2",
                "question": "If a CPU executes a program of 10^9 instructions with an average CPI of 2.0 at a clock frequency of 2 GHz (2 * 10^9 Hz), what is the total execution time?",
                "options": ["0.5 seconds", "1.0 second", "2.0 seconds", "4.0 seconds"],
                "correct_option": 1,
                "explanation": "CPU Time = (Instruction Count * CPI) / Clock Rate = (10^9 * 2.0) / (2 * 10^9) = 2.0 / 2.0 = 1.0 second."
            }
        ]
    }
]

# Merge any existing topics
final_topics = []
for t in topics_defs:
    clean = re.sub(r'[^a-zA-Z0-9]', '', t['title']).lower()
    existing = existing_by_id.get(t['id']) or existing_by_clean.get(clean)
    if existing:
        t['notesMarkdown'] = existing.get('notesMarkdown', t['notesMarkdown'])
        t['questions'] = existing.get('questions', t['questions'])
        t['companyTags'] = existing.get('companyTags', t['companyTags'])
    final_topics.append(t)

file_content = f"""import type {{ SectionCategory }} from './types';

export const COA_CATEGORY: SectionCategory = {{
  id: "coa",
  slug: "computer-organization-and-architecture",
  title: "Computer Organization and Architecture (COA)",
  description: "Instruction set architecture, CPU datapath, pipelining, memory hierarchy, cache mapping, I/O, interrupts, and performance metrics.",
  icon: "Server",
  topics: {json.dumps(final_topics, indent=2)}
}};
"""

with open('./src/lib/data/curriculum/coa.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"Generated COA module with {len(final_topics)} topics successfully!")
