import type { SectionCategory } from './types';

export const COA_CATEGORY: SectionCategory = {
  "id": "coa",
  "slug": "computer-organization-and-architecture",
  "title": "Computer Organization and Architecture (COA)",
  "description": "Instruction set architecture, CPU datapath, pipelining, memory hierarchy, cache mapping, I/O, interrupts, and performance metrics.",
  "icon": "Server",
  "topics": [
    {
      "id": "coa-instruction-set-architecture",
      "slug": "instruction-set-architecture",
      "title": "Instruction Set Architecture",
      "description": "Hardware-software abstraction layer, register sets, data types, instruction types (data transfer, arithmetic, control), and endianness.",
      "estimatedMinutes": 16,
      "difficulty": "Easy",
      "companyTags": [
        "Intel",
        "Qualcomm",
        "ARM",
        "Apple"
      ],
      "keyTakeaways": [
        "ISA defines the programmer's view of the processor (registers, instruction set, memory addressing, interrupts).",
        "Big-Endian stores MSB at lowest memory address; Little-Endian stores LSB at lowest memory address (x86/ARM).",
        "Instruction categories: Data transfer (load/store), Arithmetic/Logic (add/sub/and), Control transfer (branch/jump).",
        "Condition codes / status flags: Zero (Z), Carry (C), Overflow (V), Sign/Negative (N)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Instruction+Set+Architecture+ISA+Endianness+Registers+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Instruction Set Architecture (ISA)\n\nThe ISA is the boundary interface between software (compilers/OS) and underlying microarchitecture.\n\n---\n\n## 1. Endianness (Byte Ordering)\nStoring 32-bit word `0x12345678` starting at address `0x1000`:\n- **Big-Endian:** MSB at lowest address (`0x1000: 12`, `0x1001: 34`, `0x1002: 56`, `0x1003: 78`).\n- **Little-Endian:** LSB at lowest address (`0x1000: 78`, `0x1001: 56`, `0x1002: 34`, `0x1003: 12`).\n\n---\n\n## 2. Processor State Registers\n- **Program Counter (PC):** Holds address of next instruction to fetch.\n- **Instruction Register (IR):** Holds instruction currently being decoded/executed.\n- **Memory Address Register (MAR):** Connects to CPU address bus.\n- **Memory Buffer / Data Register (MBR/MDR):** Connects to CPU data bus.\n",
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
          "options": [
            "Instruction Register (IR)",
            "Program Counter (PC)",
            "Memory Data Register (MDR)",
            "Accumulator (AC)"
          ],
          "correct_option": 1,
          "explanation": "The Program Counter (PC) stores the memory address of the next instruction to be fetched from memory."
        },
        {
          "id": "coa-isa-3",
          "question": "Which of the following is a key characteristic distinguishing CISC from RISC architecture?",
          "options": [
            "CISC instructions typically have variable length and complex multi-cycle addressing modes, while RISC uses fixed-length single-cycle instructions with load-store architecture.",
            "RISC processors lack hardware registers.",
            "CISC requires more program memory due to longer instruction streams.",
            "RISC instructions directly access memory operands in arithmetic instructions."
          ],
          "correct_option": 0,
          "explanation": "CISC architectures (like x86) emphasize dense, variable-length instructions capable of complex memory operations, whereas RISC (like ARM, MIPS, RISC-V) uses fixed 32-bit instructions and restricts memory access exclusively to load/store instructions."
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
      "companyTags": [
        "Intel",
        "Qualcomm",
        "ARM",
        "NVIDIA"
      ],
      "keyTakeaways": [
        "Immediate: Operand is part of instruction (e.g. MOV R1, #5); 0 memory references.",
        "Direct (Absolute): Address field contains effective address; 1 memory reference.",
        "Indirect: Address field contains address of address pointer; 2 memory references.",
        "Register Indirect: Register contains memory address; 1 memory reference.",
        "PC-Relative: Effective Address = PC + Offset (used for relocatable branch instructions)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Addressing+Modes+Instruction+Formats+Direct+Indirect+PC+Relative+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Instruction Formats and Addressing Modes\n\n---\n\n## 1. Addressing Modes Summary\n\n| Addressing Mode | Effective Address ($EA$) | Memory References to Fetch Operand | Use Case |\n| :--- | :--- | :--- | :--- |\n| **Immediate** | Operand in instruction | **0** | Loading constants |\n| **Register** | $EA = R$ | **0** | High-speed register data |\n| **Direct (Absolute)** | $EA = \\text{Address}$ | **1** | Global static variables |\n| **Indirect** | $EA = [\\text{Address}]$ | **2** | Pointers / dereferencing |\n| **Register Indirect**| $EA = [R]$ | **1** | Loops, pointer traversal |\n| **PC-Relative** | $EA = PC + \\text{Offset}$ | **1** | Position-independent branches |\n| **Base-Register** | $EA = R_{\\text{base}} + \\text{Offset}$ | **1** | Relocatable code segments |\n| **Indexed** | $EA = R_{\\text{index}} + \\text{Base}$ | **1** | Array subscript indexing |\n\n---\n\n## 2. Memory Reference Calculations\nIn Indirect Addressing, reading operand requires:\n1. Memory fetch to get Effective Address pointer.\n2. Memory fetch to read actual operand at Effective Address. Total = 2 memory accesses.\n",
      "questions": [
        {
          "id": "coa-am-1",
          "question": "Which addressing mode is most suitable for writing position-independent, relocatable branch code?",
          "options": [
            "Direct Addressing",
            "PC-Relative Addressing",
            "Immediate Addressing",
            "Indirect Addressing"
          ],
          "correct_option": 1,
          "explanation": "PC-Relative addressing computes effective address as an offset from the Program Counter (PC + offset). Because the offset is relative, code can be moved anywhere in memory without breaking branches."
        },
        {
          "id": "coa-am-2",
          "question": "How many memory accesses are required to fetch an operand when using Indirect Addressing Mode?",
          "options": [
            "0",
            "1",
            "2",
            "3"
          ],
          "correct_option": 2,
          "explanation": "Indirect addressing requires: 1) access memory to read the effective address pointer, and 2) access memory again at that pointer to fetch the operand. Total = 2 memory accesses."
        },
        {
          "id": "coa-addr-3",
          "question": "In PC-Relative addressing mode, how is the effective target address calculated?",
          "options": [
            "Target Address = Current Program Counter (PC) + Offset / Displacement",
            "Target Address = Base Register + Index Register",
            "Target Address = Memory[Address field]",
            "Target Address = Immediate value inside instruction"
          ],
          "correct_option": 0,
          "explanation": "PC-relative addressing adds a signed offset embedded in the branch instruction to the current PC value, enabling position-independent branching without hardcoded absolute addresses."
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
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Apple",
        "AMD"
      ],
      "keyTakeaways": [
        "Datapath contains the hardware that performs operations: ALU, registers, internal buses, and multiplexers.",
        "Single-bus datapath: Only one operand transfer per clock cycle; multi-bus enables parallel source and destination transfers.",
        "Register file provides multi-port reads and writes simultaneously (e.g. 2 read ports, 1 write port).",
        "ALU performs binary addition, subtraction, AND, OR, XOR, and bit-shifts based on control inputs."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=CPU+Datapath+Organization+ALU+Register+File+Single+Bus+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# CPU Organization & Internal Datapath Architecture\n\nThe Central Processing Unit (CPU) is fundamentally divided into two tightly coupled subsystems:\n1. **The Datapath:** The collection of hardware units (ALU, general-purpose registers, temporary latch registers, multiplexers, and internal buses) that physically manipulate and transport data.\n2. **The Control Unit (CU):** The finite state orchestrator (hardwired or microprogrammed) that asserts binary control signals to route operands through the datapath in synchronized clock phases.\n\n---\n\n## 1. Single-Bus Internal CPU Datapath\nIn a classical single-bus architecture, a single shared internal bus interconnects all registers and the Arithmetic Logic Unit (ALU).\n\n```\n                         +-----------------------+\n                         |   INTERNAL CPU BUS    |<============== [Memory Data Reg MDR]\n                         +-----------------------+\n                           |         |         |\n            +--------------+         |         +--------------+\n            v                        v                        v\n      [Register File]          [Temp Reg Y]             [Program Counter PC]\n      R0, R1, ..., Rn                |                        |\n            |                        v                        v\n            |                   +---------+             [Memory Addr Reg MAR]\n            +------------------>|   ALU   |                   |\n                                +---------+                   v\n                                     |                  (Address Bus to RAM)\n                                     v\n                              [Temp Reg Z]\n                                     |\n                                     +-----> (Drives back to Internal Bus)\n```\n\n### Why $R_3 \\leftarrow R_1 + R_2$ Requires 3 Clock Cycles on a Single Bus:\n1. **Cycle 1:** Gate $R_{1,\\text{out}}$, Gate $Y_{\\text{in}}$. Content of $R_1$ is transferred to temporary register $Y$.\n2. **Cycle 2:** Gate $R_{2,\\text{out}}$, Assert `ALU_Add`, Gate $Z_{\\text{in}}$. ALU adds content of $Y$ and the bus ($R_2$); sum latched in register $Z$.\n3. **Cycle 3:** Gate $Z_{\\text{out}}$, Gate $R_{3,\\text{in}}$. Content of $Z$ transferred into destination register $R_3$.\n\n---\n\n## 2. Multi-Bus Datapath Organizations\n- **Two-Bus Organization:** Separates source and destination buses, allowing an ALU operation to read one operand and write the previous result simultaneously.\n- **Three-Bus Organization:** Two source buses ($Bus_A, Bus_B$) and one destination bus ($Bus_C$). Both operands ($R_1$ and $R_2$) are fed directly to ALU inputs in parallel, and the result is written to $R_3$ in a **single clock cycle**, eliminating temporary registers $Y$ and $Z$.\n\n---\n\n## 3. Dedicated Architectural Registers\n- **Program Counter (PC):** Holds the memory address of the next instruction to fetch; automatically incremented ($PC \\leftarrow PC + 4$ in 32-bit RISC).\n- **Instruction Register (IR):** Holds the current binary instruction opcode and operand specifiers while being decoded.\n- **Memory Address Register (MAR):** Connects directly to the external address bus; holds the physical memory location being read or written.\n- **Memory Data Register (MDR / MBR):** Two-way buffer connected to the external data bus and internal CPU bus.\n",
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
        },
        {
          "id": "coa-dp-3",
          "question": "What is the primary role of the Program Counter (PC) register in a CPU datapath?",
          "options": [
            "Holding the memory address of the next instruction to be fetched and executed.",
            "Storing the intermediate arithmetic result of the ALU.",
            "Counting the total number of clock cycles since reboot.",
            "Holding the current instruction opcode during decoding."
          ],
          "correct_option": 0,
          "explanation": "The Program Counter (PC) is a dedicated CPU register that holds the memory address of the next instruction in sequence, incrementing automatically or loading a branch address on control transfers."
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
      "companyTags": [
        "Intel",
        "Qualcomm",
        "ARM",
        "Infosys"
      ],
      "keyTakeaways": [
        "Instruction Cycle: Fetch -> Decode -> Operand Fetch -> Execute -> Writeback -> Interrupt Check.",
        "Fetch Phase RTL: MAR <- PC; MDR <- Memory[MAR], PC <- PC + 4; IR <- MDR.",
        "Decode Phase: Control unit inspects opcode and addressing mode bits in IR.",
        "Interrupt cycle occurs at the end of the instruction cycle before fetching next instruction."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Instruction+Execution+Cycle+Fetch+Decode+Execute+Writeback+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# The Complete Instruction Execution Cycle & Micro-Operations\n\nThe **Instruction Execution Cycle** is the continuous sequence of hardware states through which the CPU fetches, decodes, executes, and commits machine instructions from system memory.\n\n```\n   +----------+      +----------+      +---------------+      +-----------+      +------------+      +-----------------+\n   |  FETCH   | ---> |  DECODE  | ---> | OPERAND FETCH | ---> |  EXECUTE  | ---> | WRITE-BACK | ---> | INTERRUPT CHECK |\n   +----------+      +----------+      +---------------+      +-----------+      +------------+      +-----------------+\n        ^                                                                                                     |\n        +-----------------------------------------------------------------------------------------------------+\n```\n\n---\n\n## 1. Register Transfer Language (RTL) Micro-Operations\n\n### Phase 1: Instruction Fetch (Universal for all instructions)\n- **$T_1$:** $MAR \\leftarrow PC$\n  - Transfer memory address held in the Program Counter into the Memory Address Register; assert memory Read control line.\n- **$T_2$:** $MDR \\leftarrow \\text{Memory}[MAR], \\quad PC \\leftarrow PC + 4$\n  - Wait for memory data ready signal (MFC); latch instruction word from memory bus into MDR; increment PC to point to the next contiguous instruction in memory.\n- **$T_3$:** $IR \\leftarrow MDR$\n  - Transfer instruction word from MDR into the Instruction Register.\n\n### Phase 2: Instruction Decode\n- The Control Unit decodes the opcode bits of $IR$ using a decoder matrix.\n- Identifies addressing modes and generates micro-signals for subsequent phases.\n\n### Phase 3: Operand Fetch (Effective Address Resolution)\n- **Register Direct:** Operands reside in register file (0 memory cycles).\n- **Immediate:** Operand is part of the instruction word itself ($IR[15:0]$).\n- **Memory Direct / Indirect:** Computes Effective Address ($EA = \\text{Base} + \\text{Index} + \\text{Offset}$); loads operand via $MAR \\leftarrow EA$, $MDR \\leftarrow \\text{Memory}[MAR]$.\n\n### Phase 4: Execution\n- ALU performs the requested arithmetic/logical operation ($Z \\leftarrow Y \\text{ op } Bus$).\n- For conditional branch instructions (`BEQ`, `BNE`): Evaluates condition flags. If condition is true, updates $PC \\leftarrow PC + \\text{offset}$.\n\n### Phase 5: Write-Back (Commit)\n- The result in $Z$ is routed back and written to the destination register ($R_{\\text{dest}} \\leftarrow Z$) or memory location.\n\n### Phase 6: Interrupt Acknowledgment Cycle\n- At the end of every instruction cycle, the CPU tests the **Interrupt Request (INTR)** pin.\n- If an enabled interrupt is pending:\n  1. $SP \\leftarrow SP - 1$; $\\text{Memory}[SP] \\leftarrow PC$ (Pushes return address onto stack).\n  2. Loads Interrupt Service Routine (ISR) vector address into $PC$.\n  3. Disables further maskable interrupts.\n",
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
        },
        {
          "id": "coa-cycle-3",
          "question": "During which phase of the instruction cycle are memory operands loaded into CPU internal registers if required by an indirect addressing mode?",
          "options": [
            "Decode / Operand Fetch phase",
            "Write-back phase",
            "Fetch phase",
            "Interrupt acknowledgment phase"
          ],
          "correct_option": 0,
          "explanation": "After instruction fetch, the CPU decodes the instruction format. In indirect or memory-referencing addressing modes, an operand fetch cycle accesses memory to retrieve the effective operand."
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
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "Broadcom"
      ],
      "keyTakeaways": [
        "Hardwired Control: Implemented using combinational logic gates and decoders; faster, but inflexible and hard to modify (used in RISC).",
        "Microprogrammed Control: Control signals stored as microinstructions in Control Store ROM; slower, but flexible and easy to modify (used in CISC).",
        "Horizontal Microprogramming: 1 bit per control signal; no decoding required; very wide control words; high speed.",
        "Vertical Microprogramming: Control signals encoded into groups; requires decoders; narrow words; slower."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Hardwired+vs+Microprogrammed+Control+Horizontal+Vertical+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Hardwired and Microprogrammed Control\n\n---\n\n## 1. Comparison Matrix\n\n| Metric | Hardwired Control Unit | Microprogrammed Control Unit |\n| :--- | :--- | :--- |\n| **Implementation** | Logic gates, decoders, flip-flops | Control memory (ROM) with micro-code |\n| **Speed** | **Very Fast** | Slower (ROM read delay) |\n| **Flexibility** | Rigid; modifying instructions requires circuit redesign | **Flexible**; modify ROM micro-program |\n| **Instruction Set** | Best for **RISC** (simple, uniform) | Best for **CISC** (complex instructions) |\n| **Cost** | High for complex instruction sets | Lower design cost for complex sets |\n\n---\n\n## 2. Horizontal vs Vertical Microprogramming\n- **Horizontal:** Each control signal has a dedicated bit. Wide words, fast, zero decoding.\n- **Vertical:** Control bits encoded (e.g. 3 bits decoded to 8 signals). Narrow words, slower due to decoders.\n",
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
        },
        {
          "id": "coa-cu-3",
          "question": "Compared to Hardwired control units, what is the primary advantage of Microprogrammed control units?",
          "options": [
            "Ease of modification and support for complex instruction sets by updating microcode stored in Control ROM.",
            "Higher clock speeds and fewer gate delays.",
            "Elimination of the control memory.",
            "Zero instruction decoding latency."
          ],
          "correct_option": 0,
          "explanation": "Microprogrammed control units store control words (microinstructions) in ROM, making updates and complex instruction emulation straightforward, whereas hardwired units are faster but fixed in silicon logic gates."
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
      "companyTags": [
        "Intel",
        "ARM",
        "Qualcomm",
        "AMD"
      ],
      "keyTakeaways": [
        "Ideal speedup of k-stage pipeline for n instructions is Speedup = (n * k) / (k + n - 1) ≈ k as n -> infinity.",
        "Structural Hazard: Hardware resource conflict (e.g., single memory port for both instructions and data).",
        "Data Hazard (RAW - Read After Write): Dependent instruction needs data before predecessor writes it. Solved via Operand Forwarding / Bypassing.",
        "Control Hazard (Branch penalty): Change in PC invalidates fetched instructions. Solved via Branch Prediction and Delayed Branching."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Pipelining+Pipeline+Hazards+Structural+Data+Control+RAW+Forwarding+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# CPU Instruction Pipelining & Hazards\n\nInstruction pipelining overlaps the execution of multiple instructions to increase CPU throughput.\n\n---\n\n## 1. Classical 5-Stage RISC Pipeline\n1. **IF (Instruction Fetch):** Fetch instruction from cache/memory into IR; increment Program Counter (PC).\n2. **ID (Instruction Decode / Register Read):** Decode opcode and read source registers.\n3. **EX (Execute / ALU Operation):** Perform arithmetic/logic computation or calculate memory address.\n4. **MEM (Memory Access):** Read or write data operand in data cache (for `LOAD` / `STORE`).\n5. **WB (Write Back):** Write execution result back into the register file.\n\n$$\\text{Theoretical Speedup} = \\frac{n \\times k}{k + n - 1} \\approx k \\quad (\\text{for large } n)$$\nwhere $k$ is number of stages and $n$ is number of instructions.\n\n## 2. Pipeline Hazards\nA hazard prevents the next instruction from executing in its designated clock cycle:\n\n1. **Structural Hazard:** Hardware resource conflict (e.g. single memory bus accessed for both instruction fetch and data read simultaneously). Solved by separate L1 Instruction and Data caches (Harvard Architecture).\n2. **Data Hazard:** Dependent instructions need operands not yet written:\n   - **RAW (Read After Write - True Dependency):** Instruction $J$ tries to read before instruction $I$ writes back. Solved by **Operand Forwarding / Bypassing** or inserting stall bubbles.\n   - **WAR (Write After Read - Anti-dependency):** Out-of-order execution hazard. Solved by register renaming.\n   - **WAW (Write After Write - Output dependency):** Out-of-order execution hazard.\n3. **Control (Branch) Hazard:** Pipeline does not know which instruction to fetch until branch condition is evaluated in EX stage. Mitigated by **Branch Prediction** and branch delay slots.\n",
      "questions": [
        {
          "id": "coa-1",
          "question": "Which data hazard occurs when an instruction attempts to read a register operand before an earlier instruction has finished writing its updated value?",
          "options": [
            "Write After Read (WAR)",
            "Read After Write (RAW)",
            "Write After Write (WAW)",
            "Structural Hazard"
          ],
          "correct_option": 1,
          "explanation": "A RAW (Read After Write) hazard represents a true data dependency where an instruction depends on the result of an antecedent instruction."
        },
        {
          "id": "coa-2",
          "question": "What hardware technique resolves Read After Write (RAW) data hazards without inserting pipeline stall bubbles?",
          "options": [
            "Branch Prediction",
            "Operand Forwarding (Bypassing)",
            "Memory Paging",
            "Virtual Memory Swapping"
          ],
          "correct_option": 1,
          "explanation": "Operand Forwarding routes the computed ALU result directly from the output of the EX stage to the input of the dependent instruction's EX stage, avoiding stalls."
        },
        {
          "id": "pip-3",
          "question": "What are the three fundamental types of hazards encountered in CPU instruction pipelining?",
          "options": [
            "Structural Hazards, Data Hazards, and Control Hazards",
            "Cache Misses, Page Faults, and Memory Leaks",
            "Compilation Errors, Linker Errors, and Runtime Exceptions",
            "Paging Hazards, Segmentation Hazards, and Deadlocks"
          ],
          "correct_option": 0,
          "explanation": "Pipelining hazards stall instruction execution: Structural hazards (resource conflicts), Data hazards (data dependencies between instructions), and Control hazards (branching and jumps)."
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
      "companyTags": [
        "Intel",
        "Amazon",
        "Microsoft",
        "Qualcomm"
      ],
      "keyTakeaways": [
        "Principle of Locality: Temporal (reused recently accessed items) and Spatial (items close in address accessed together).",
        "Hierarchy levels: CPU Registers (fastest, smallest, expensive) -> L1/L2/L3 Cache (SRAM) -> Main Memory (DRAM) -> SSD/HDD (flash/magnetic).",
        "SRAM vs DRAM: SRAM uses bistable cross-coupled inverters (no refresh, faster); DRAM uses single capacitor + transistor (requires periodic refresh).",
        "Average Memory Access Time (AMAT) = Hit Time + (Miss Rate * Miss Penalty)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Memory+Hierarchy+Locality+of+Reference+AMAT+COA+lecture",
      "notesMarkdown": "# Memory Hierarchy, Locality of Reference & AMAT\n\nModern CPU clock cycles execute instructions in fractions of a nanosecond (~$0.3\\text{ ns}$ at $3.5\\text{ GHz}$), while physical main DRAM requires $50 - 100\\text{ ns}$ to service a read request. This orders-of-magnitude performance discrepancy is known as the **Memory Wall**. The **Memory Hierarchy** bridges this chasm by organizing storage technologies into structured tiers balanced across speed, capacity, and cost-per-bit.\n\n---\n\n## 1. The Computer Memory Pyramid\n\n```\n                         /\\           Latency       Typical Capacity    Technology\n                        /  \\          -------       ----------------    ----------\n                       / CPU\\\n                      / Regs \\        < 0.5 ns      ~1 KB               Flip-Flops / D-Latches\n                     /--------\\\n                    / L1 Cache \\      0.5 - 1 ns    32 KB - 64 KB       SRAM (Static RAM)\n                   /------------\\\n                  /  L2 Cache    \\    2 - 5 ns      256 KB - 1 MB       SRAM\n                 /----------------\\\n                /    L3 Cache      \\  10 - 20 ns    16 MB - 64 MB       Shared SRAM\n               /--------------------\\\n              /     Main Memory      \\ 50 - 100 ns  16 GB - 128 GB      DRAM (Dynamic RAM)\n             /------------------------\\\n            /  Solid State Disk (SSD)  \\ 50 - 100 µs 512 GB - 4 TB      NAND Flash (NVMe)\n           /----------------------------\\\n          /     Hard Disk Drive (HDD)    \\ 5 - 10 ms  2 TB - 16 TB       Magnetic Platters\n         +--------------------------------+\n```\n\n---\n\n## 2. Hardware Technology: SRAM vs DRAM\n\n| Attribute | Static RAM (SRAM) | Dynamic RAM (DRAM) |\n| :--- | :--- | :--- |\n| **Cell Circuitry** | 6 transistors per bit (cross-coupled bistable inverter latch) | 1 transistor + 1 capacitor ($1T-1C$) per bit |\n| **Periodic Refresh** | **None** (retains charge as long as power is applied) | **Mandatory** (capacitor leaks charge every few ms) |\n| **Access Latency** | Ultra-fast ($0.5 - 5\\text{ ns}$) | Moderate ($50 - 100\\text{ ns}$) |\n| **Density & Cost** | Low density, very expensive per megabyte | High density, very cheap per gigabyte |\n| **Primary Role** | On-chip L1, L2, L3 CPU caches | System Main Memory (DIMMs) |\n\n---\n\n## 3. Principles of Locality of Reference\n\nPrograms access a relatively small portion of their address space at any given time window:\n\n### A. Temporal Locality (Locality in Time)\n- If a memory location is referenced, it is likely to be referenced again soon.\n- **Examples:** Loop induction variables (`for (int i=0; i<N; i++)`), loop condition evaluations, stack pointers, frequently called utility routines.\n\n### B. Spatial Locality (Locality in Space)\n- If a memory location is referenced, adjacent memory locations are likely to be referenced soon.\n- **Examples:** Sequential instruction execution ($PC \\leftarrow PC + 4$), traversing array elements stored contiguously in memory.\n- **Exploitation in Hardware:** Whenever a cache miss occurs, the CPU fetches an entire **Cache Line / Block** (typically 64 bytes) into L1 cache, ensuring subsequent nearby accesses hit instantly in cache.\n\n```c\n// EXCELLENT Spatial Locality (Row-Major Traversal in C/C++):\n// Elements matrix[i][0], matrix[i][1], matrix[i][2] reside consecutively in RAM.\nfor (int i = 0; i < N; i++) {\n    for (int j = 0; j < N; j++) {\n        sum += matrix[i][j]; // Blazing fast (1 miss every 16 ints per 64-byte line)\n    }\n}\n\n// TERRIBLE Spatial Locality (Column-Major Traversal in C/C++):\n// Strides across N*sizeof(int) bytes on every access; thrashing cache lines!\nfor (int j = 0; j < N; j++) {\n    for (int i = 0; i < N; i++) {\n        sum += matrix[i][j]; // Cache thrashing (every single read is a cache miss)\n    }\n}\n```\n\n---\n\n## 4. Average Memory Access Time (AMAT)\n\nAMAT quantifies the effective memory subsystem latency experienced by CPU instructions.\n\n### Single-Level Cache Equation:\n$$\\text{AMAT} = T_{\\text{hit}} + (\\text{Miss Rate} \\times \\text{Miss Penalty})$$\n- $T_{\\text{hit}}$: Time to determine hit/miss and deliver data from cache.\n- $\\text{Miss Rate} = 1 - \\text{Hit Ratio} = \\frac{\\text{Misses}}{\\text{Total Accesses}}$.\n- $\\text{Miss Penalty}$: Latency to retrieve data from main memory and populate cache line.\n\n### Multi-Level (Hierarchical) Cache Equation:\n$$\\text{AMAT} = T_{L1} + \\text{MR}_{L1} \\times \\left( T_{L2} + \\text{MR}_{L2} \\times \\left( T_{L3} + \\text{MR}_{L3} \\times T_{\\text{DRAM}} \\right) \\right)$$\nwhere $\\text{MR}_{L2}$ is the **local miss rate** of the L2 cache.\n",
      "questions": [
        {
          "id": "coa-mh-1",
          "question": "If a cache has a hit time of 2 ns, a miss rate of 10%, and a miss penalty of 50 ns, what is the Average Memory Access Time (AMAT)?",
          "options": [
            "7 ns",
            "5.2 ns",
            "12 ns",
            "52 ns"
          ],
          "correct_option": 0,
          "explanation": "AMAT = Hit Time + (Miss Rate * Miss Penalty) = 2 ns + (0.10 * 50 ns) = 2 + 5 = 7 ns."
        },
        {
          "id": "coa-mh-2",
          "question": "Which type of memory uses a capacitor and a transistor per cell and requires periodic electrical refresh cycles?",
          "options": [
            "SRAM (Static RAM)",
            "DRAM (Dynamic RAM)",
            "ROM",
            "Flash Memory"
          ],
          "correct_option": 1,
          "explanation": "DRAM stores bits as electrical charges on tiny capacitors that leak over time, requiring periodic refresh operations to retain stored data."
        },
        {
          "id": "coa-mem-3",
          "question": "What principle of locality states that if a memory location is accessed, nearby memory locations are likely to be accessed soon?",
          "options": [
            "Spatial Locality",
            "Temporal Locality",
            "Associative Locality",
            "Virtual Locality"
          ],
          "correct_option": 0,
          "explanation": "Spatial locality dictates that nearby consecutive memory locations (such as contiguous array elements or sequential instructions) are accessed in proximity. Caches exploit this by loading whole cache blocks/lines."
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
      "companyTags": [
        "Intel",
        "AMD",
        "Apple",
        "NVIDIA"
      ],
      "keyTakeaways": [
        "Cache address breakdown: [Tag | Set Index | Block/Word Offset].",
        "Direct Mapped: Each memory block maps to exactly 1 cache line (Set = Block Mod Sets); prone to conflict misses.",
        "Fully Associative: Block can reside in any cache line; no set index bits; requires parallel associative comparison of all tags.",
        "k-Way Set Associative: Block maps to a specific set of k lines; optimal balance between hit latency and miss rate.",
        "Write-Through vs Write-Back: Write-through updates main memory on every write; Write-back updates only on dirty block eviction."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Cache+Memory+Mapping+Techniques+Direct+Mapped+Set+Associative+Tag+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Memory Hierarchy & Cache Coherence\n\nDue to the significant speed gap between CPU clock cycles (~0.3 ns) and main DRAM (~50-100 ns), modern architectures employ hierarchical caching.\n\n---\n\n## 1. Principles of Locality\n- **Temporal Locality:** If a memory location was accessed, it is likely to be accessed again soon (e.g. loop counters, local variables).\n- **Spatial Locality:** If a memory location was accessed, adjacent addresses are likely to be accessed soon (e.g. traversing an array).\n\n## 2. Cache Mapping Techniques\n- **Direct Mapped:** Each memory block maps to exactly one cache line: `line = block_address % num_lines`. Fast, cheap hardware, but suffers from conflict misses.\n- **Fully Associative:** A memory block can be placed in any cache line. Eliminates conflict misses, but requires expensive parallel comparator hardware.\n- **Set Associative ($N$-way):** Cache divided into sets of $N$ lines. Balance between speed and conflict reduction.\n\n## 3. Write Policies\n- **Write-Through:** Every write updates both the cache and main memory simultaneously. Consistent, but higher write bus traffic.\n- **Write-Back:** Writes update only the cache line (marked with a **Dirty bit**); written to main memory only when evicted.\n\n## 4. Multi-Core Cache Coherence: The MESI Protocol\nIn multi-core processors with private L1/L2 caches, the **MESI** snooping protocol maintains coherence across 4 states:\n1. **Modified (M):** Cache line is present only in current core, dirty (modified relative to RAM).\n2. **Exclusive (E):** Cache line present only in current core, clean (matches RAM).\n3. **Shared (S):** Cache line present in multiple cores' caches, clean.\n4. **Invalid (I):** Cache line is stale or unused.\n",
      "questions": [
        {
          "id": "coa-3",
          "question": "In the MESI cache coherence protocol, what state does a cache line enter when it is present only in one core and matches main memory?",
          "options": [
            "Modified (M)",
            "Exclusive (E)",
            "Shared (S)",
            "Invalid (I)"
          ],
          "correct_option": 1,
          "explanation": "The Exclusive (E) state denotes that the block is cached exclusively by this one core and has not yet been modified (it is clean with respect to main RAM)."
        },
        {
          "id": "cache-2",
          "question": "What critical hardware problem does the MESI (Modified, Exclusive, Shared, Invalid) protocol solve in multi-core CPU architectures?",
          "options": [
            "Cache Coherence: Ensuring all CPU cores observe consistent and up-to-date values for shared memory locations across private L1/L2 caches",
            "Virtual memory page swapping",
            "Instruction branch prediction",
            "Thermal throttling and fan speed regulation"
          ],
          "correct_option": 0,
          "explanation": "In multi-core systems, each core has private L1 caches. If one core updates a memory location, the MESI protocol snoops or invalidates other cores’ cached copies to ensure coherence."
        },
        {
          "id": "cache-3",
          "question": "Iterating through a 2D array row-by-row in C/C++ (row-major order) is dramatically faster than column-by-column due to which hardware caching principle?",
          "options": [
            "Spatial Locality",
            "Temporal Locality",
            "Instruction Pipelining",
            "Virtual Address Translation"
          ],
          "correct_option": 0,
          "explanation": "In row-major languages, contiguous row elements reside adjacently in memory. Accessing row-by-row exploits Spatial Locality because fetching one element pulls an entire cache line (64 bytes) into L1 cache."
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
      "companyTags": [
        "Intel",
        "Google",
        "Amazon",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Virtual memory decouples logical address space from physical RAM via fixed-size Pages and Frames.",
        "Virtual address = [Virtual Page Number (VPN) | Page Offset]; Physical address = [Physical Frame Number (PFN) | Page Offset].",
        "TLB (Translation Lookaside Buffer): Fast hardware cache for page table translations.",
        "Effective Access Time with TLB: EAT = Hit_TLB * (t_TLB + t_mem) + (1 - Hit_TLB) * (t_TLB + 2 * t_mem) for 1-level page table."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Virtual+Memory+Page+Table+TLB+Hit+Ratio+Effective+Access+Time+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Main Memory, Paging & Virtual Memory Architecture\n\nVirtual Memory is a core computer architecture and operating system mechanism that provides each process with the illusion of an isolated, contiguous, and vastly expanded address space, irrespective of the physical RAM installed. It handles memory protection, simplifies program linking, and enables multi-programming through demand paging.\n\n---\n\n## 1. Paging Architecture & Address Translation\n\nPhysical RAM is partitioned into fixed-sized blocks called **Frames**, and logical memory is partitioned into identically sized blocks called **Pages** (commonly 4 KB = $2^{12}$ bytes).\n\n### The Address Breakdown\nA logical (virtual) address consists of two components:\n$$\\text{Virtual Address} = [ \\text{Virtual Page Number (VPN)} \\mid \\text{Page Offset } (d) ]$$\n- **Offset ($d$ bits):** Determines the page size $= 2^d$ bytes. The offset passes through directly to the physical address untranslated.\n- **Virtual Page Number ($p$ bits):** Indexes into the Process Page Table to obtain the corresponding **Physical Frame Number (PFN / $f$)**.\n\n$$\\text{Physical Address} = [ \\text{Frame Number } (f) \\mid \\text{Page Offset } (d) ]$$\n\n```\n   Logical Address: [ Page Number (p) ] [ Offset (d) ]\n                           |\t\t       |\n                           v\t\t       |\n                   +---------------+           |\n                   |  PAGE TABLE   |           |\n                   | p -> Frame(f) |           |\n                   +---------------+           |\n                           |\t\t       |\n                           v\t\t       v\n  Physical Address: [ Frame Number (f)] [ Offset (d) ]\n```\n\n---\n\n## 2. Page Table Entry (PTE) Anatomy\n\nEach entry in a page table occupies 4 to 8 bytes and contains hardware control flags:\n- **Frame Number (PFN):** The high-order physical memory address bits.\n- **Present / Valid Bit (P):** $1$ if the page is currently in physical RAM; $0$ if swapped out to secondary disk (triggers a **Page Fault** trap).\n- **Dirty / Modified Bit (M):** $1$ if the page was written to since being loaded (requires write-back to swap disk upon replacement).\n- **Referenced / Access Bit (A):** Set by hardware on read/write (used by clock/LRU replacement algorithms).\n- **Protection Bits (R/W/X):** Read, Write, and eXecute permissions.\n\n---\n\n## 3. Translation Lookaside Buffer (TLB) & Effective Access Time\n\nBecause accessing the page table resides in main RAM, every single memory load would naturally require **two memory accesses** (one for the page table, one for the operand). To eliminate this bottleneck, the Memory Management Unit (MMU) incorporates a fast, fully-associative hardware cache called the **Translation Lookaside Buffer (TLB)**.\n\n### Effective Memory Access Time (EMAT) Formula\nLet:\n- $h$: TLB hit ratio ($0 \\le h \\le 1$, typically $\\ge 98\\%$).\n- $t_{\\text{TLB}}$: TLB access lookup time (e.g. 1-2 ns).\n- $t_{\\text{mem}}$: Physical RAM access latency (e.g. 50-100 ns).\n\n#### For a 1-Level Page Table:\n$$\\text{EAT} = h \\cdot (t_{\\text{TLB}} + t_{\\text{mem}}) + (1 - h) \\cdot (t_{\\text{TLB}} + 2 \\cdot t_{\\text{mem}})$$\n- **On TLB Hit:** Lookup TLB ($t_{\\text{TLB}}$), then access physical frame directly in RAM ($t_{\\text{mem}}$).\n- **On TLB Miss:** Lookup TLB ($t_{\\text{TLB}}$), fetch PTE from page table in RAM ($t_{\\text{mem}}$), then fetch actual data from RAM ($t_{\\text{mem}}$).\n\n#### For an $k$-Level Hierarchical Page Table:\n$$\\text{EAT} = h \\cdot (t_{\\text{TLB}} + t_{\\text{mem}}) + (1 - h) \\cdot (t_{\\text{TLB}} + (k + 1) \\cdot t_{\\text{mem}})$$\n\n---\n\n## 4. Multi-Level Paging (Hierarchical Page Tables)\n\nA 32-bit architecture with 4 KB pages has $2^{20}$ pages. At 4 bytes per PTE, a single flat page table requires $4\\text{ MB}$ of contiguous memory per process!\n- **Two-Level Paging:** Breaks the virtual page number into an Outer Page Directory (10 bits) and Inner Page Table (10 bits) with 12-bit offset.\n- **Advantage:** Unallocated address space ranges require no inner page tables, reducing RAM overhead from megabytes to just a few kilobytes.\n",
      "questions": [
        {
          "id": "coa-vm-1",
          "question": "If TLB access time is 10 ns, memory access time is 100 ns, and TLB hit ratio is 90% in a single-level paging system, what is the Effective Memory Access Time?",
          "options": [
            "110 ns",
            "120 ns",
            "100 ns",
            "190 ns"
          ],
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
        },
        {
          "id": "coa-vm-3",
          "question": "What hardware component accelerates Virtual-to-Physical address translation by caching recently used page table entries?",
          "options": [
            "Translation Lookaside Buffer (TLB)",
            "Memory Management Unit (MMU) Register 0",
            "L3 Cache Controller",
            "Direct Memory Access (DMA) Channel"
          ],
          "correct_option": 0,
          "explanation": "The Translation Lookaside Buffer (TLB) is an associative hardware cache inside the MMU that stores recent virtual-to-physical page mappings, avoiding memory walks on page hits."
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
      "companyTags": [
        "Cisco",
        "Intel",
        "Broadcom",
        "Qualcomm"
      ],
      "keyTakeaways": [
        "Associative Memory / Content Addressable Memory (CAM) searches by data contents simultaneously in parallel, not by address.",
        "Every bit cell has internal comparator logic, making CAM hardware complex and expensive.",
        "Returns the memory address where the requested content resides in O(1) clock cycles.",
        "Widely used in high-speed TLBs and network switch routing tables (TCAM)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Associative+Memory+Content+Addressable+Memory+CAM+TLB+COA+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Associative Memory (Content Addressable Memory - CAM)\n\nAssociative memory accesses stored words based on their **content** rather than a sequential address.\n\n---\n\n## 1. Operating Principle\n- An **Argument Register** holds the pattern to be matched.\n- A **Key / Mask Register** specifies which bits to match.\n- All memory words are compared **in parallel** against the argument in a single clock cycle.\n- A **Match Register** flags every row that satisfies the condition.\n\n---\n\n## 2. High-Yield Applications\n- **TLB (Translation Lookaside Buffer):** Compares virtual page numbers in parallel.\n- **TCAM in Network Routers:** Evaluates IP longest prefix matching in hardware at line rates (100 Gbps+).\n",
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
        },
        {
          "id": "coa-assoc-3",
          "question": "How does Content-Addressable Memory (CAM) locate stored data words?",
          "options": [
            "By comparing the input search key simultaneously with the content of all memory words in parallel.",
            "By indexing via sequential address bus lines.",
            "By hashing the data key through software hash tables.",
            "By performing binary search on sorted addresses."
          ],
          "correct_option": 0,
          "explanation": "CAM (Associative Memory) accesses storage by content rather than address: every cell has built-in comparison hardware that compares its content with a search pattern in a single clock cycle."
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
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Cisco",
        "IBM"
      ],
      "keyTakeaways": [
        "Programmed I/O: CPU polls device status in busy-wait loop; wastes CPU cycles.",
        "Interrupt-driven I/O: Device signals CPU when ready; CPU handles other tasks in between.",
        "DMA: Dedicated DMA controller transfers bulk data directly between I/O device and RAM without CPU intervention.",
        "Memory-Mapped I/O: Shared address space for memory and I/O (uses normal LOAD/STORE instructions). Isolated I/O: Separate I/O space with special IN/OUT instructions."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=IO+Organization+Programmed+Interrupt+Driven+DMA+Memory+Mapped+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# I/O Organization\n\n---\n\n## 1. The Three I/O Transfer Mechanisms\n1. **Programmed I/O:** CPU continuously polls device status bits (Busy-Waiting). Zero CPU utilization efficiency.\n2. **Interrupt-Driven I/O:** CPU issues command, continues executing other processes. Device raises an interrupt when ready.\n3. **Direct Memory Access (DMA):** Hardware DMA controller takes master control of system bus and transfers data blocks directly between I/O and RAM.\n\n---\n\n## 2. Memory-Mapped vs Isolated (Port-Mapped) I/O\n- **Memory-Mapped I/O:** Same address bus for memory and I/O devices. Uses regular `MOV / LOAD / STORE` instructions. Reduces available RAM address space.\n- **Isolated I/O:** Separate address spaces. Uses specialized machine instructions like `IN` and `OUT` in x86.\n",
      "questions": [
        {
          "id": "coa-io-1",
          "question": "Which I/O technique allows high-speed peripheral devices to transfer blocks of data directly to/from main memory without continuously involving the CPU?",
          "options": [
            "Programmed I/O",
            "Interrupt-driven I/O",
            "Direct Memory Access (DMA)",
            "Polled I/O"
          ],
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
        },
        {
          "id": "coa-io-3",
          "question": "In Memory-Mapped I/O, how are device controller registers accessed by the CPU?",
          "options": [
            "Using the exact same address space and load/store machine instructions used for standard RAM.",
            "Using specialized IN and OUT assembly instructions only.",
            "Exclusively via DMA hardware channels.",
            "Through a dedicated isolated 16-bit I/O bus."
          ],
          "correct_option": 0,
          "explanation": "In memory-mapped I/O, device registers share the common system memory address space, allowing all regular memory-referencing instructions (MOV, LDR, STR) to communicate directly with peripheral devices."
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
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Apple",
        "Broadcom"
      ],
      "keyTakeaways": [
        "Vectored Interrupt: Device supplies interrupt vector (address of Interrupt Service Routine - ISR) on data bus.",
        "Non-Vectored: Fixed ISR address; CPU polls devices to determine source.",
        "Priority Arbitration: Daisy chaining (hardware serial grant line) resolves simultaneous interrupt requests.",
        "DMA Modes: Burst mode (DMA holds bus for entire block) vs Cycle Stealing mode (DMA steals one memory cycle between CPU instruction steps)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Interrupts+and+DMA+Daisy+Chaining+Cycle+Stealing+Burst+Mode+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Interrupts and DMA\n\n---\n\n## 1. Interrupt Types & Handling\n- **Maskable vs Non-Maskable (NMI):** NMI (e.g. power failure, memory parity error) cannot be disabled by CPU flags.\n- **Vectored Interrupt:** Device supplies address vector pointing to Interrupt Vector Table (IVT) containing the **Interrupt Service Routine (ISR)** address.\n- **Daisy Chaining:** Serial priority arbitration where Interrupt Acknowledge signal travels down the chain; closest device has highest priority.\n\n---\n\n## 2. DMA Transfer Modes\n- **Burst Mode:** DMA controller takes control of system bus and transfers entire block without releasing bus.\n- **Cycle Stealing Mode:** DMA controller takes control of bus for single memory cycles between CPU operations, minimizing CPU stalls.\n",
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
        },
        {
          "id": "coa-dma-3",
          "question": "During a Direct Memory Access (DMA) transfer in Cycle Stealing mode, what does the DMA controller do?",
          "options": [
            "Takes control of the system bus for one bus cycle at a time to transfer a single word between memory and device.",
            "Locks the CPU completely out of memory until the entire multi-megabyte block is transferred.",
            "Executes interrupt service routines on every byte transferred.",
            "Disables all hardware timers and interrupts permanently."
          ],
          "correct_option": 0,
          "explanation": "In cycle stealing mode, the DMA controller temporarily steals single bus cycles from the CPU to transfer words, interleaving I/O and CPU computation with minimal latency spikes."
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
      "companyTags": [
        "Intel",
        "Qualcomm",
        "Cisco",
        "AMD"
      ],
      "keyTakeaways": [
        "System Bus triad: Address Bus (unidirectional, determines addressable memory), Data Bus (bidirectional, word size), Control Bus (timing/commands).",
        "Synchronous Bus: Clocked protocol; transfers occur on clock edges; fixed timing.",
        "Asynchronous Bus: Handshake protocol (Request and Acknowledge lines); adapts to devices of varying speeds.",
        "Bus Bandwidth = (Bus Width in bytes) * (Bus Frequency)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Bus+Architecture+Synchronous+Asynchronous+Handshake+COA+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Bus Architecture\n\nA bus is a shared communication pathway connecting two or more subsystem components.\n\n---\n\n## 1. System Bus Components\n- **Address Bus (Unidirectional from CPU):** $k$ lines address $2^k$ distinct memory locations.\n- **Data Bus (Bidirectional):** $w$ lines transfer $w$ bits simultaneously per cycle.\n- **Control Bus:** Carries read/write enable, memory/IO select, interrupt, and clock lines.\n\n---\n\n## 2. Synchronous vs Asynchronous Buses\n- **Synchronous:** Governed by common master clock. High speed, but all devices must match clock cycle constraints.\n- **Asynchronous:** Governed by handshake signals (`Master Ready` and `Slave Ready`). Accommodates slow and fast devices seamlessly.\n",
      "questions": [
        {
          "id": "coa-bus-1",
          "question": "If a CPU has a 36-bit address bus and byte-addressable memory, what is the maximum addressable physical memory capacity?",
          "options": [
            "4 GB",
            "16 GB",
            "64 GB",
            "128 GB"
          ],
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
        },
        {
          "id": "coa-bus-3",
          "question": "In computer bus arbitration, what is the primary drawback of Daisy-Chaining compared to centralized parallel arbitration?",
          "options": [
            "Priority is strictly fixed by physical device position on the chain, creating starvation for downstream devices and single-point failure vulnerability.",
            "Requires vastly more control bus lines.",
            "Arbitration speed is independent of the number of devices.",
            "Requires an external bus arbiter chip for each peripheral."
          ],
          "correct_option": 0,
          "explanation": "Daisy-chaining passes bus grants serially from highest-priority device to lowest. If a device breaks the chain, all downstream devices lose access, and devices near the end can suffer starvation."
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
      "companyTags": [
        "ARM",
        "Apple",
        "Intel",
        "Qualcomm"
      ],
      "keyTakeaways": [
        "RISC (Reduced Instruction Set Computer): Fixed instruction length (typically 32 bits), single-cycle execution, load/store architecture, hardwired control.",
        "CISC (Complex Instruction Set Computer): Variable instruction length, multi-cycle instructions, memory-to-memory operations, microprogrammed control.",
        "RISC emphasizes compiler optimization; CISC emphasizes hardware complexity and code density.",
        "Modern x86 chips decode CISC instructions into internal RISC-like micro-ops (uops) dynamically."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=RISC+vs+CISC+Architecture+Differences+Comparison+ARM+x86+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# RISC vs. CISC Architectures & CPU Registers\n\nInstruction Set Architectures (ISA) define the programming contract between hardware and software.\n\n---\n\n## 1. RISC vs. CISC\n| Attribute | RISC (ARM, RISC-V, MIPS) | CISC (x86, x86-64) |\n| :--- | :--- | :--- |\n| **Philosophy** | Simple, fixed-length instructions | Complex, variable-length instructions |\n| **Execution** | Most instructions execute in 1 clock cycle | Instructions may take multiple clock cycles |\n| **Memory Access** | **Load/Store only** (ALU only operates on registers) | ALU instructions can operate directly on memory |\n| **Registers** | Large general-purpose register file (32+) | Fewer architectural registers (8-16) |\n| **Code Size** | Larger binary code size | Compact binary code size |\n\n## 2. Fundamental CPU Registers\n- **Program Counter (PC):** Holds the memory address of the next instruction to fetch.\n- **Instruction Register (IR):** Holds the current instruction being decoded.\n- **Stack Pointer (SP):** Points to the top of the current call stack.\n- **Status / Flags Register:** Stores condition flags (Zero flag `Z`, Carry flag `C`, Overflow `O`, Sign `S`).\n\n## 3. Endianness (Byte Ordering)\nFor multi-byte value `0x12345678` at base address `0x00`:\n- **Big-Endian:** Most significant byte stored first (`0x00: 12`, `0x01: 34`, `0x02: 56`, `0x03: 78`). Natural network byte order.\n- **Little-Endian:** Least significant byte stored first (`0x00: 78`, `0x01: 56`, `0x02: 34`, `0x03: 12`). Standard on modern x86 and ARM processors.\n",
      "questions": [
        {
          "id": "coa-4",
          "question": "Which architectural constraint is a core requirement of RISC (Reduced Instruction Set Computer) designs?",
          "options": [
            "Variable length instructions",
            "Load/Store architecture where ALU operations strictly use registers",
            "Support for memory-to-memory arithmetic instructions",
            "Only one general purpose register"
          ],
          "correct_option": 1,
          "explanation": "RISC architectures use a strict Load/Store model: memory is only accessed via LOAD and STORE instructions, while arithmetic operations strictly operate on registers."
        },
        {
          "id": "rc-2",
          "question": "What is the hallmark architectural characteristic of a RISC (e.g. ARM, RISC-V) processor compared to a CISC (x86) processor?",
          "options": [
            "Load/Store architecture where memory access is strictly restricted to LOAD and STORE instructions, and all arithmetic operations occur between registers",
            "Variable instruction length with complex addressing modes directly operating on RAM",
            "Absence of hardware registers",
            "Inability to execute pipelined instructions"
          ],
          "correct_option": 0,
          "explanation": "RISC processors enforce a strict Load/Store architecture: arithmetic/logic instructions operate exclusively on CPU registers; memory is only accessed via explicit load and store instructions."
        },
        {
          "id": "rc-3",
          "question": "What is the role of the Program Counter (PC) register in a CPU?",
          "options": [
            "It holds the memory address of the next instruction to be fetched and executed",
            "It counts the total number of clock cycles since system boot",
            "It stores the result of the most recent ALU computation",
            "It tracks the memory address of the bottom of the stack"
          ],
          "correct_option": 0,
          "explanation": "The Program Counter (PC) is a dedicated CPU register that holds the memory address of the instruction that is to be fetched and executed next."
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
      "companyTags": [
        "Intel",
        "Qualcomm",
        "NVIDIA",
        "AMD"
      ],
      "keyTakeaways": [
        "Booth's Algorithm multiplies signed 2's complement numbers efficiently by treating contiguous runs of 1s as single operations (subtraction at start, addition at end).",
        "Booth recoding pairs (q0, q-1): '10' -> Subtract multiplicand; '01' -> Add multiplicand; '00' and '11' -> Shift only.",
        "Restoring vs Non-Restoring Division: Non-restoring division skips adding back divisor on negative remainder.",
        "Barrel shifter rotates or shifts an n-bit word by any number of positions in a single clock cycle using multiplexer stages."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Booths+Multiplication+Algorithm+Arithmetic+ALU+COA+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Arithmetic Operations and ALU Architecture\n\nThe Arithmetic Logic Unit (ALU) performs integer arithmetic (addition, subtraction, multiplication, division) and logical operations (AND, OR, NOT, XOR, shifts).\n\n---\n\n## 1. Fast Addition Architectures\n- **Ripple Carry Adder (RCA):**\n  - Connects $N$ full adders in cascade.\n  - Worst-case carry propagation delay: $t_{\\text{delay}} = O(N)$.\n  - Slow for 32/64-bit ALUs.\n- **Carry Lookahead Adder (CLA):**\n  - Generates carry signals in parallel using Generate ($G_i = A_i \\cdot B_i$) and Propagate ($P_i = A_i \\oplus B_i$) signals:\n    $$C_{i+1} = G_i + P_i C_i$$\n  - Achieves $O(\\log N)$ or constant 2-level gate delay at the expense of fan-in and circuit complexity.\n\n---\n\n## 2. Fast Multiplication Algorithms\n- **Booth's Multiplication Algorithm:**\n  - Treats runs of consecutive 1s in the multiplier as a single subtraction and addition:\n    $$\\underbrace{11110}_2 = 100000_2 - 000010_2$$\n  - Handles signed 2's complement numbers directly without separate sign conversion.\n  - Examines 2 bits $(Q_0, Q_{-1})$:\n    - `10`: Subtract multiplicand from accumulator, right shift.\n    - `01`: Add multiplicand to accumulator, right shift.\n    - `00` or `11`: Just arithmetic right shift.\n- **Wallace Tree Multiplier:** Reduces partial product matrix in $O(\\log N)$ stages using carry-save adders.\n\n---\n\n## 3. Division and Floating-Point ALU\n- **Restoring vs Non-Restoring Division:** Iterative shift-and-subtract operations.\n- **IEEE 754 Floating-Point Unit:** Separate sub-units for exponent arithmetic (bias addition) and mantissa normalization with guard, round, and sticky bits.\n",
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
        },
        {
          "id": "coa-alu-3",
          "question": "What is the primary advantage of a Carry Lookahead Adder (CLA) over a Ripple Carry Adder (RCA)?",
          "options": [
            "It eliminates serial carry propagation delay by computing all stage carries in parallel using propagate and generate logic.",
            "It requires fewer logic gates than an RCA.",
            "It works exclusively on floating-point numbers.",
            "It consumes zero dynamic power."
          ],
          "correct_option": 0,
          "explanation": "A Ripple Carry Adder suffers from O(N) carry propagation delay. A Carry Lookahead Adder calculates all carry signals simultaneously via generate (G = A and B) and propagate (P = A xor B) logic, dramatically speeding up multi-bit addition."
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
      "companyTags": [
        "Google",
        "Intel",
        "NVIDIA",
        "Amazon"
      ],
      "keyTakeaways": [
        "CPU Execution Time = Instruction Count * CPI * Clock Cycle Time.",
        "CPI (Cycles Per Instruction) = sum(CPI_i * Fraction_i).",
        "Amdahl's Law: Overall Speedup = 1 / ((1 - f) + f / s), where f is parallelizable fraction and s is component speedup.",
        "Max theoretical speedup as s -> infinity is 1 / (1 - f) (serial fraction limits speedup!)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Amdahls+Law+CPU+Performance+Equation+CPI+MIPS+Computer+Organization+Architecture+COA+gate+lecture",
      "notesMarkdown": "# Computer Performance Metrics and Amdahl's Law\n\nEvaluating and optimizing computer systems requires quantitative metrics comparing throughput, execution time, and scaling limits.\n\n---\n\n## 1. Fundamental Performance Equation\n$$\\text{CPU Execution Time} = \\text{Instruction Count (IC)} \\times \\text{Cycles Per Instruction (CPI)} \\times \\text{Clock Cycle Time } (T_c)$$\n$$\\text{CPU Execution Time} = \\frac{\\text{IC} \\times \\text{CPI}}{\\text{Clock Frequency } (f)}$$\n\n- **MIPS (Million Instructions Per Second):**\n  $$\\text{MIPS} = \\frac{\\text{Clock Rate (MHz)}}{\\text{CPI}} = \\frac{\\text{IC}}{\\text{Execution Time} \\times 10^6}$$\n- **MFLOPS (Million Floating-Point Operations Per Second):** Relevant for scientific computing.\n\n---\n\n## 2. Amdahl's Law for Speedup\nIf a fraction $f$ of an execution time can be enhanced by a factor $k$, while the remaining fraction $(1 - f)$ is unaffected:\n$$\\text{Overall Speedup} = \\frac{1}{(1 - f) + \\frac{f}{k}}$$\n\n- **Asymptotic Limit ($k \\to \\infty$):**\n  $$\\text{Speedup}_{\\max} = \\frac{1}{1 - f}$$\n- **Key Takeaway:** If 20% of an application is inherently sequential ($1 - f = 0.2$), the maximum theoretical speedup using infinitely many parallel cores is at most:\n  $$\\frac{1}{0.2} = 5\\times$$\n\n---\n\n## 3. Gustafson's Law\n- Focuses on scaling problem size with available processors rather than fixed workload time.\n- Scaled Speedup: $S(P) = P - (P - 1)(1 - f) = 1 + (P - 1)f$.\n",
      "questions": [
        {
          "id": "coa-perf-1",
          "question": "According to Amdahl's Law, if 80% of a program can be parallelized, what is the MAXIMUM theoretical speedup achievable even with infinitely many processors?",
          "options": [
            "4x",
            "5x",
            "10x",
            "80x"
          ],
          "correct_option": 1,
          "explanation": "f = 0.80. The serial fraction (1 - f) is 0.20. As speedup s -> infinity, Max Speedup = 1 / (1 - f) = 1 / 0.20 = 5x."
        },
        {
          "id": "coa-perf-2",
          "question": "If a CPU executes a program of 10^9 instructions with an average CPI of 2.0 at a clock frequency of 2 GHz (2 * 10^9 Hz), what is the total execution time?",
          "options": [
            "0.5 seconds",
            "1.0 second",
            "2.0 seconds",
            "4.0 seconds"
          ],
          "correct_option": 1,
          "explanation": "CPU Time = (Instruction Count * CPI) / Clock Rate = (10^9 * 2.0) / (2 * 10^9) = 2.0 / 2.0 = 1.0 second."
        },
        {
          "id": "coa-amdahl-3",
          "question": "If an algorithm spends 25% of its execution time in non-parallelizable serial code, what is the theoretical maximum speedup achievable according to Amdahl's Law, even with an infinite number of processors?",
          "options": [
            "4x",
            "8x",
            "25x",
            "100x"
          ],
          "correct_option": 0,
          "explanation": "By Amdahl's Law: Speedup_max = 1 / (1 - P), where P is the parallel fraction. Here non-parallel fraction (1 - P) = 0.25. Therefore, maximum speedup = 1 / 0.25 = 4x."
        }
      ]
    }
  ]
};

