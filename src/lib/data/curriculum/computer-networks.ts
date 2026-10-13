import type { SectionCategory } from './types';

export const COMPUTER_NETWORKS_CATEGORY: SectionCategory = {
  "id": "cn",
  "slug": "computer-networks",
  "title": "Computer Networks (CN)",
  "description": "OSI and TCP/IP, physical layer, data link framing, sliding windows, routing, TCP/UDP, DNS/HTTP, and security.",
  "icon": "Network",
  "topics": [
    {
      "id": "osi-tcpip-model",
      "slug": "osi-and-tcpip-models",
      "title": "Network Models: OSI and TCP/IP",
      "description": "The 7 OSI layers, encapsulation headers, PDUs (bits, frames, packets, segments), and protocols.",
      "estimatedMinutes": 16,
      "notesMarkdown": "\n# OSI 7-Layer vs. TCP/IP Protocol Stack\n\n---\n\n## 1. OSI Layers & Protocol Data Units (PDUs)\n1. **Application (Layer 7):** User interface and network services (HTTP, DNS, SMTP). PDU: **Data**.\n2. **Presentation (Layer 6):** Data format, encryption/decryption, compression (SSL, TLS, JPEG).\n3. **Session (Layer 5):** Manages sessions and checkpoints (RPC, NetBIOS).\n4. **Transport (Layer 4):** End-to-end communication, flow control, port numbers (TCP, UDP). PDU: **Segment / Datagram**.\n5. **Network (Layer 3):** Logical addressing and routing (IP, ICMP, OSPF, BGP). PDU: **Packet**.\n6. **Data Link (Layer 2):** Physical addressing, MAC address, framing, error detection (Ethernet, ARP). PDU: **Frame**.\n7. **Physical (Layer 1):** Bit streams across physical medium (Cables, fiber optics, radio). PDU: **Bits**.\n",
      "questions": [
        {
          "id": "cn-2",
          "question": "At which OSI layer do routers primarily operate to make forwarding decisions based on destination IP addresses?",
          "options": [
            "Data Link Layer (Layer 2)",
            "Network Layer (Layer 3)",
            "Transport Layer (Layer 4)",
            "Session Layer (Layer 5)"
          ],
          "correct_option": 1,
          "explanation": "Routers inspect destination IP headers and consult routing tables at the Network Layer (Layer 3). Switches typically operate at Layer 2 (MAC addresses)."
        },
        {
          "id": "osi-2",
          "question": "What is the Protocol Data Unit (PDU) at the Transport Layer of the OSI model called?",
          "options": [
            "Segment (or Datagram for UDP)",
            "Packet",
            "Frame",
            "Bit"
          ],
          "correct_option": 0,
          "explanation": "At Layer 4 (Transport), data is encapsulated into Segments (TCP) or Datagrams (UDP). Layer 3 uses Packets, Layer 2 uses Frames, and Layer 1 transmits Bits."
        },
        {
          "id": "osi-3",
          "question": "Which layer of the OSI model handles data format translation, character encoding, and encryption/compression?",
          "options": [
            "Presentation Layer (Layer 6)",
            "Session Layer (Layer 5)",
            "Application Layer (Layer 7)",
            "Transport Layer (Layer 4)"
          ],
          "correct_option": 0,
          "explanation": "The Presentation Layer is responsible for syntax conversion, data formatting (e.g., ASCII, UTF-8, JPEG), and encryption/decryption between the application and network."
        }
      ],
      "difficulty": "Easy",
      "companyTags": [
        "Cisco",
        "Juniper",
        "TCS",
        "Infosys"
      ],
      "keyTakeaways": [
        "OSI 7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
        "PDUs: Bits (Physical), Frames (Data Link), Packets (Network), Segments (Transport), Data (Application).",
        "Routers operate at Layer 3; traditional switches operate at Layer 2."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=OSI+and+TCP+IP+Network+Models+Architecture+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-physical-layer-fundamentals",
      "slug": "physical-layer-fundamentals",
      "title": "Physical Layer Fundamentals",
      "description": "Transmission media (guided vs unguided), digital vs analog signals, Nyquist Bit Rate, Shannon Channel Capacity, attenuation, distortion, and noise.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Cisco",
        "Qualcomm",
        "Intel",
        "Broadcom"
      ],
      "keyTakeaways": [
        "Nyquist Theorem (Noiseless channel): Max Bit Rate = 2 * B * log2(V) bps.",
        "Shannon Capacity (Noisy channel): Capacity C = B * log2(1 + SNR) bps.",
        "SNR in decibels: SNR_dB = 10 * log10(SNR).",
        "Transmission impairments: Attenuation, distortion, and thermal/Gaussian noise."
      ],
      "notesMarkdown": "# Physical Layer Fundamentals\n\n---\n\n## 1. Theoretical Maximum Data Rates\n- **Nyquist Bit Rate (For Noiseless Channels):**\n  $$\\text{Bit Rate} = 2 \\times B \\times \\log_2(V) \\text{ bps}$$\n  Where $B$ is bandwidth in Hertz and $V$ is the number of discrete signal levels.\n\n- **Shannon Channel Capacity (For Noisy Channels):**\n  $$C = B \\times \\log_2(1 + \\text{SNR}) \\text{ bps}$$\n  Where $\\text{SNR}$ is the linear Signal-to-Noise Ratio ($\\text{Signal Power} / \\text{Noise Power}$).\n  $$\\text{SNR}_{\\text{dB}} = 10 \\times \\log_{10}(\\text{SNR})$$\n\n---\n\n## 2. Transmission Media\n- **Guided (Wired):** Twisted Pair (UTP Cat6), Coaxial Cable, Fiber Optic (Total Internal Reflection, highest bandwidth, immune to EMI).\n- **Unguided (Wireless):** Radio waves (omnidirectional), Microwaves (line-of-sight), Infrared (short-range).\n",
      "questions": [
        {
          "id": "cn-phy-1",
          "question": "A noiseless channel has a bandwidth of 4 kHz and transmits signals with 16 discrete signal levels. What is the maximum data rate by Nyquist theorem?",
          "options": [
            "16 kbps",
            "32 kbps",
            "64 kbps",
            "8 kbps"
          ],
          "correct_option": 1,
          "explanation": "Bit Rate = 2 * B * log2(V) = 2 * 4000 * log2(16) = 8000 * 4 = 32,000 bps = 32 kbps."
        },
        {
          "id": "cn-phy-2",
          "question": "According to Shannon's Capacity theorem, what happens to channel capacity C if SNR approaches infinity?",
          "options": [
            "Capacity approaches zero",
            "Capacity grows logarithmically without bound for a fixed bandwidth B",
            "Capacity drops to 1 bps",
            "Capacity equals 2 * B"
          ],
          "correct_option": 1,
          "explanation": "Since C = B * log2(1 + SNR), as SNR -> infinity, capacity increases logarithmically with SNR."
        },
        {
          "id": "cn-phys-3",
          "question": "According to Shannon's Channel Capacity Theorem, what is the maximum theoretical bit rate C of a channel with bandwidth B and signal-to-noise ratio SNR?",
          "options": [
            "C = B * log2(1 + SNR)",
            "C = 2 * B * log2(M)",
            "C = B / SNR",
            "C = 2 * B * SNR"
          ],
          "correct_option": 0,
          "explanation": "Shannon's theorem gives the theoretical upper bound channel capacity in the presence of thermal Gaussian noise: C = B * log2(1 + SNR) in bits per second."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Physical+Layer+Fundamentals+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-data-link-layer",
      "slug": "data-link-layer",
      "title": "Data Link Layer",
      "description": "Services of Data Link Layer, node-to-node delivery, framing, physical addressing (MAC addresses), error control, and flow control overview.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Cisco",
        "Arista",
        "Juniper",
        "Amazon"
      ],
      "keyTakeaways": [
        "Data Link Layer (DLL) responsibility: Node-to-node (hop-to-hop) frame delivery across a single physical link.",
        "PDU: Frame (contains MAC header, payload, and FCS/trailer).",
        "MAC Address: 48-bit (6-byte) globally unique hardware address burned into NIC.",
        "Sublayers: Logical Link Control (LLC) and Media Access Control (MAC)."
      ],
      "notesMarkdown": "# Data Link Layer (DLL) Responsibilities\n\n---\n\n## 1. Core Functions of DLL\n1. **Framing:** Encapsulating network layer IP datagrams into frames with header and trailer.\n2. **Physical Addressing:** Adding 48-bit MAC addresses of sender and next-hop receiver.\n3. **Flow Control:** Preventing fast transmitters from overwhelming slow receivers.\n4. **Error Control:** Detecting and retransmitting corrupted frames using CRC / ARQ.\n5. **Media Access Control (MAC):** Arbitrating shared access to multi-access broadcast channels.\n\n---\n\n## 2. DLL Sublayers\n- **LLC (Logical Link Control - IEEE 802.2):** Flow control, error handling, protocol multiplexing.\n- **MAC (Media Access Control - IEEE 802.3/802.11):** Frame delimiting, collision handling, physical addressing.\n",
      "questions": [
        {
          "id": "cn-dll-1",
          "question": "What is the primary scope of delivery guaranteed by the Data Link Layer?",
          "options": [
            "Process-to-Process delivery",
            "End-to-End host delivery across the Internet",
            "Hop-to-Hop (node-to-node) delivery across a single physical link",
            "Application layer message formatting"
          ],
          "correct_option": 2,
          "explanation": "Data Link Layer manages frame transfers across a single physical hop/link between directly connected network nodes."
        },
        {
          "id": "cn-dll-2",
          "question": "How many bits are in a standard Ethernet MAC hardware address?",
          "options": [
            "32 bits",
            "48 bits (6 bytes)",
            "64 bits",
            "128 bits"
          ],
          "correct_option": 1,
          "explanation": "Ethernet MAC addresses are 48 bits (6 octets) long, usually written in hexadecimal (e.g. AA:BB:CC:DD:EE:FF)."
        },
        {
          "id": "cn-dll-3",
          "question": "What is the primary role of the Data Link Layer (Layer 2) in the OSI model?",
          "options": [
            "Node-to-node hop-by-hop framing, physical addressing (MAC), and error detection across a single local link.",
            "End-to-end reliable stream delivery across multiple networks.",
            "Routing packets across the global internet.",
            "Presenting formatted HTML data to applications."
          ],
          "correct_option": 0,
          "explanation": "Layer 2 is responsible for node-to-node framing, hardware physical addressing (48-bit MAC), and hop-by-hop link error detection between adjacent network interfaces."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Data+Link+Layer+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-framing-and-error-detection",
      "slug": "framing-and-error-detection",
      "title": "Framing and Error Detection",
      "description": "Framing techniques: Character count, Byte stuffing (character-oriented), Bit stuffing (flag bytes 01111110), and types of transmission errors.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Cisco",
        "Qualcomm",
        "Intel",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Character Count: Vulnerable; if count header is corrupted, all subsequent frame boundaries are desynchronized.",
        "Byte Stuffing: Escapes flag byte sequences using ESC byte (e.g. PPP).",
        "Bit Stuffing: Delimiter flag is 01111110 (01^6 0). Sender inserts a '0' bit after five consecutive '1' bits anywhere in data.",
        "Receiver destuffing: After five consecutive 1s, if next bit is 0, it is stripped; if 1, it indicates end-of-frame flag or error."
      ],
      "notesMarkdown": "# Framing & Stuffing Techniques\n\n---\n\n## 1. Framing Methods\n- **Character Count:** First field stores frame length. If corrupted, framing error propagates indefinitely.\n- **Byte Stuffing (Character-Oriented):** Uses flag bytes (e.g., `FLAG = 0x7E`). Any appearance of `FLAG` or `ESC` in data is prefixed with an `ESC` escape byte.\n- **Bit Stuffing (Bit-Oriented - HDLC):**\n  - Frame delimiter flag: `01111110` ($0$ followed by six $1$s, followed by $0$).\n  - **Rule at Sender:** Whenever sender sees five consecutive `1`s in data stream (`11111`), it automatically injects a `0` bit immediately after.\n  - **Rule at Receiver:** Whenever receiver sees five consecutive `1`s, it inspects the 6th bit:\n    - If `0`: Discard it (destuffing).\n    - If `10`: It is a `FLAG` marker!\n\n---\n\n## 2. Hamming Distance & Error Detection\n- Minimum Hamming distance $d_{\\min}$ to **detect** $e$ errors:\n  $$d_{\\min} \\ge e + 1$$\n- Minimum Hamming distance to **correct** $t$ errors:\n  $$d_{\\min} \\ge 2t + 1$$\n",
      "questions": [
        {
          "id": "cn-frame-1",
          "question": "In HDLC bit stuffing, what does the sender do after transmitting five consecutive '1' bits in the payload?",
          "options": [
            "Appends an ESC character",
            "Automatically inserts a '0' bit",
            "Terminates the frame immediately",
            "Inverts the parity bit"
          ],
          "correct_option": 1,
          "explanation": "To prevent user data from mimicking the 01111110 flag sequence, a '0' bit is stuffed after five consecutive '1's."
        },
        {
          "id": "cn-frame-2",
          "question": "What is the minimum Hamming distance required in a code to detect up to 3 bit errors?",
          "options": [
            "3",
            "4",
            "6",
            "7"
          ],
          "correct_option": 1,
          "explanation": "To detect e errors, d_min >= e + 1. For e = 3 errors, d_min >= 3 + 1 = 4."
        },
        {
          "id": "cn-frame-3",
          "question": "In bit-oriented framing, how does 'Bit Stuffing' prevent data bytes from accidentally matching the flag sequence 01111110?",
          "options": [
            "The transmitter automatically inserts a '0' bit after every run of five consecutive '1' bits in the data stream.",
            "The sender encodes all characters in ASCII.",
            "The receiver drops any packet with five 1s.",
            "A parity bit is added to every byte."
          ],
          "correct_option": 0,
          "explanation": "Bit stuffing ensures the flag byte 01111110 (0 followed by six 1s and a 0) never appears inside payload data by inserting an extra '0' whenever five consecutive '1's are encountered; the receiver un-stuffs the '0'."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Framing+and+Error+Detection+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-crc-and-checksum",
      "slug": "crc-and-checksum",
      "title": "CRC and Checksum",
      "description": "Parity checks, 16-bit Internet Checksum (one's complement sum), Cyclic Redundancy Check (CRC) polynomial division, and generator polynomials.",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Cisco",
        "Google",
        "Amazon",
        "Intel"
      ],
      "keyTakeaways": [
        "Internet Checksum: 16-bit 1's complement sum of 16-bit words; inverted at sender; receiver sum should equal 0xFFFF (all 1s).",
        "CRC (Cyclic Redundancy Check): Polynomial division using modulo-2 arithmetic (XOR).",
        "If generator polynomial G(x) has degree r, sender appends r zeros to data and computes remainder.",
        "CRC detects all single-bit errors, all double-bit errors (if G(x) has factor with >= 3 terms), and all burst errors <= r bits."
      ],
      "notesMarkdown": "# Error Detection: CRC & Internet Checksum\n\n---\n\n## 1. Cyclic Redundancy Check (CRC)\nCRC treats bit strings as polynomials with coefficients in $\\text{GF}(2)$ (Modulo-2 Arithmetic $\\equiv$ XOR without carry):\n1. Let data $D$ have polynomial representation $D(x)$ and generator polynomial $G(x)$ of degree $r$.\n2. Append $r$ zeros to data: $D(x) \\cdot x^r$.\n3. Divide $(D(x) \\cdot x^r)$ by $G(x)$ using XOR division.\n4. The $r$-bit remainder $R(x)$ is the CRC checksum.\n5. Transmitted frame = $T(x) = D(x) \\cdot x^r \\oplus R(x)$.\n6. Receiver divides received frame by $G(x)$. If remainder is $0$, frame is error-free!\n\n---\n\n## 2. Internet Checksum\n- Used in IPv4 header, TCP, and UDP.\n- Treats header as sequence of 16-bit integers.\n- Sums integers using One's Complement arithmetic (carries wrapped around and added to LSB).\n- Bitwise NOT of final sum is stored in checksum field.\n",
      "questions": [
        {
          "id": "cn-crc-1",
          "question": "If a CRC generator polynomial G(x) = x^4 + x + 1 is used, how many zero bits are appended to the data stream before division?",
          "options": [
            "3 zeros",
            "4 zeros",
            "5 zeros",
            "1 zero"
          ],
          "correct_option": 1,
          "explanation": "The degree of the generator polynomial G(x) is 4 (highest power of x is 4), so exactly 4 zero bits are appended."
        },
        {
          "id": "cn-crc-2",
          "question": "What mathematical operation is used in place of standard subtraction during CRC polynomial division?",
          "options": [
            "Bitwise AND",
            "Bitwise OR",
            "Bitwise XOR (Modulo-2 addition/subtraction without carry)",
            "One's complement addition"
          ],
          "correct_option": 2,
          "explanation": "Modulo-2 subtraction and addition are equivalent to the bitwise XOR operation."
        },
        {
          "id": "cn-crc-3",
          "question": "In Cyclic Redundancy Check (CRC) error detection, if the generator polynomial G(x) is of degree k, how many zero bits are appended to the message before polynomial division?",
          "options": [
            "k bits",
            "k + 1 bits",
            "k - 1 bits",
            "16 bits always"
          ],
          "correct_option": 0,
          "explanation": "The sender appends k zeros (where k is the degree of generator polynomial G(x)) to the message bits before performing modulo-2 binary division, yielding a k-bit remainder CRC checksum."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=CRC+and+Checksum+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-flow-control-and-error-control",
      "slug": "flow-control-and-error-control",
      "title": "Flow Control and Error Control",
      "description": "Stop-and-Wait ARQ, Go-Back-N ARQ, Selective Repeat ARQ, sliding window protocols, efficiency calculations, and window sizing rules.",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Amazon",
        "Cisco",
        "Microsoft",
        "Google"
      ],
      "keyTakeaways": [
        "Stop-and-Wait Efficiency: eta = 1 / (1 + 2a), where a = T_prop / T_trans.",
        "Go-Back-N (GBN): Sender window W_s = 2^k - 1 (or N), Receiver window W_r = 1. Discards out-of-order packets; cumulative ACKs.",
        "Selective Repeat (SR): Sender window W_s = 2^(k-1), Receiver window W_r = W_s = 2^(k-1). Buffers out-of-order packets; independent ACKs.",
        "Window Sizing: W_s + W_r <= 2^k (where k is sequence number bit count) to avoid sequence number wrap-around ambiguity."
      ],
      "notesMarkdown": "# Sliding Window Protocols (ARQ)\n\n---\n\n## 1. Sliding Window Protocol Comparison\n| Metric | Stop-and-Wait | Go-Back-N (GBN) | Selective Repeat (SR) |\n|---|---|---|---|\n| **Sender Window ($W_s$)** | $1$ | $N = 2^k - 1$ | $2^{k-1}$ |\n| **Receiver Window ($W_r$)** | $1$ | $1$ | $2^{k-1}$ |\n| **Efficiency ($\\eta$)** | $\\frac{1}{1 + 2a}$ | $\\min\\left(1, \\frac{W_s}{1 + 2a}\\right)$ | $\\min\\left(1, \\frac{W_s}{1 + 2a}\\right)$ |\n| **ACK Type** | Individual | Cumulative | Independent / Selective |\n| **Out-of-Order Handling** | Discarded | Discarded | Buffered in receiver window |\n\nWhere $a = \\frac{T_{\\text{prop}}}{T_{\\text{trans}}} = \\frac{\\text{Propagation Delay}}{\\text{Transmission Delay}}$.\n\n---\n\n## 2. Sequence Number Constraint\nTo prevent new packets with reused sequence numbers from being mistaken for retransmissions:\n$$W_s + W_r \\le 2^k$$\n- For GBN ($W_r = 1$): $W_s \\le 2^k - 1$.\n- For SR ($W_s = W_r$): $W_s = W_r \\le 2^{k-1}$.\n",
      "questions": [
        {
          "id": "cn-fc-1",
          "question": "If 3 bits are used for sequence numbers in Selective Repeat ARQ, what is the maximum permissible sender window size?",
          "options": [
            "7",
            "8",
            "4",
            "3"
          ],
          "correct_option": 2,
          "explanation": "In Selective Repeat, W_s + W_r <= 2^k and W_s = W_r, so W_s <= 2^(k-1) = 2^(3-1) = 4."
        },
        {
          "id": "cn-fc-2",
          "question": "In Go-Back-N ARQ, if frame 4 is lost while frames 5, 6, and 7 arrive successfully at receiver, what does the receiver do?",
          "options": [
            "Buffers frames 5, 6, 7 and sends ACK 7",
            "Discards frames 5, 6, 7 and re-sends cumulative ACK for frame 3",
            "Aborts the entire transmission connection",
            "Sends NACK for frame 4 and accepts 5, 6, 7"
          ],
          "correct_option": 1,
          "explanation": "In GBN, receiver window is 1. Any out-of-order frames arriving after a dropped packet are discarded, and ACK for last in-order frame is retransmitted."
        },
        {
          "id": "cn-flow-3",
          "question": "What is the maximum sender window size in the Selective Repeat sliding window protocol with n-bit sequence numbers?",
          "options": [
            "2^(n - 1)",
            "2^n - 1",
            "2^n",
            "1"
          ],
          "correct_option": 0,
          "explanation": "To prevent overlap between the current sequence window and the next window (preventing duplicate acknowledgment confusion), the sender and receiver window sizes in Selective Repeat must be at most 2^(n - 1)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Flow+Control+and+Error+Control+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-mac-protocols",
      "slug": "mac-protocols",
      "title": "MAC Protocols",
      "description": "Random access protocols: Pure ALOHA (efficiency 18.4%), Slotted ALOHA (efficiency 36.8%), CSMA, CSMA/CD (Ethernet collision detection), and CSMA/CA (Wi-Fi collision avoidance with RTS/CTS).",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Cisco",
        "Qualcomm",
        "Arista",
        "Broadcom"
      ],
      "keyTakeaways": [
        "Pure ALOHA: Vulnerable time = 2 * T_frame; Max efficiency = 1 / (2e) = 18.4%.",
        "Slotted ALOHA: Vulnerable time = T_frame; Max efficiency = 1 / e = 36.8%.",
        "CSMA/CD: Carrier Sense Multiple Access with Collision Detection. Used in wired Ethernet.",
        "CSMA/CD Condition: T_trans >= 2 * T_prop (Frame length L >= 2 * Bandwidth * T_prop).",
        "CSMA/CA: Collision Avoidance via Inter-Frame Spaces (IFS), Contention Windows, and RTS/CTS handshake."
      ],
      "notesMarkdown": "# Media Access Control (MAC) Protocols\n\n---\n\n## 1. ALOHA Protocols\n- **Pure ALOHA:** Transmit whenever data is ready.\n  - Vulnerable period: $2 \\times T_{\\text{frame}}$.\n  - Maximum Throughput: $S_{\\max} = \\frac{1}{2e} \\approx 18.4\\%$.\n- **Slotted ALOHA:** Time divided into slots of duration $T_{\\text{frame}}$. Transmit only at slot boundary.\n  - Vulnerable period: $T_{\\text{frame}}$.\n  - Maximum Throughput: $S_{\\max} = \\frac{1}{e} \\approx 36.8\\%$.\n\n---\n\n## 2. CSMA/CD (Carrier Sense Multiple Access with Collision Detection)\n- \"Listen before talk; listen while talk.\"\n- **Collision Detection Constraint:** To guarantee a sender detects a collision before completing transmission:\n  $$T_{\\text{trans}} \\ge 2 \\times T_{\\text{prop}}$$\n  $$\\frac{L}{\\text{Bandwidth}} \\ge 2 \\times \\frac{\\text{Distance}}{\\text{Propagation Speed}}$$\n  $$\\implies L_{\\min} = 2 \\times \\text{Bandwidth} \\times T_{\\text{prop}}$$\n",
      "questions": [
        {
          "id": "cn-mac-1",
          "question": "What is the minimum frame size requirement in CSMA/CD networks?",
          "options": [
            "Transmission time must be greater than or equal to round-trip propagation time (T_trans >= 2 * T_prop)",
            "Transmission time must equal one propagation time",
            "Frame size must be smaller than 64 bytes",
            "There is no frame size limitation"
          ],
          "correct_option": 0,
          "explanation": "If a frame finishes transmitting before the collision signal returns (2 * T_prop), the sender cannot know its frame collided."
        },
        {
          "id": "cn-mac-2",
          "question": "What is the maximum theoretical channel efficiency of Pure ALOHA?",
          "options": [
            "18.4%",
            "36.8%",
            "50%",
            "100%"
          ],
          "correct_option": 0,
          "explanation": "Pure ALOHA reaches peak throughput S = G * e^(-2G) at G = 0.5, giving S_max = 1 / (2e) = 0.184 (18.4%)."
        },
        {
          "id": "cn-mac-3",
          "question": "Why does standard Ethernet (802.3) use CSMA/CD, while Wi-Fi (802.11) uses CSMA/CA instead?",
          "options": [
            "Wireless transceivers cannot transmit and listen for collisions simultaneously (Collision Detection is physically impractical due to high signal attenuation).",
            "Wireless networks do not experience collisions.",
            "CSMA/CD is proprietary to IBM.",
            "CSMA/CA requires no hardware antennas."
          ],
          "correct_option": 0,
          "explanation": "In wireless radio transmission, the transmitted signal power drowns out any incoming signals from other stations. Therefore, Wi-Fi cannot detect collisions while transmitting and must use Collision Avoidance (RTS/CTS and random backoff)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=MAC+Protocols+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-ethernet-and-switching",
      "slug": "ethernet-and-switching",
      "title": "Ethernet and Switching",
      "description": "Standard Ethernet (IEEE 802.3), frame format, minimum frame size (64 bytes), Hubs vs Switches, Transparent Bridging, MAC learning, and Spanning Tree Protocol (STP).",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "Cisco",
        "Arista",
        "Amazon",
        "Google"
      ],
      "keyTakeaways": [
        "Ethernet Frame: Preamble (7B), SFD (1B), Dest MAC (6B), Src MAC (6B), Type/Length (2B), Payload (46-1500B), FCS/CRC (4B). Minimum frame = 64 bytes.",
        "Hub: Layer 1 physical repeater; single shared collision domain and broadcast domain.",
        "Switch: Layer 2 multi-port bridge; separate collision domain per port, single shared broadcast domain.",
        "MAC Learning: Switch populates CAM table dynamically by inspecting source MAC addresses of incoming frames.",
        "STP (Spanning Tree Protocol - IEEE 802.1D): Prevents broadcast storms and loops in redundant Layer 2 networks."
      ],
      "notesMarkdown": "# Ethernet & Layer 2 Switching\n\n---\n\n## 1. Ethernet Frame (IEEE 802.3)\n```text\n+----------+-----+----------+---------+------+------------+---------+\n| Preamble | SFD | Dest MAC | Src MAC | Type |  Payload   | FCS/CRC |\n| 7 Bytes  | 1 B | 6 Bytes  | 6 Bytes | 2 B  | 46-1500 B  | 4 Bytes |\n+----------+-----+----------+---------+------+------------+---------+\n```\n- **Minimum Frame Size:** $6 + 6 + 2 + 46 + 4 = 64$ bytes.\n- **Maximum Transmission Unit (MTU):** 1500 bytes (payload).\n\n---\n\n## 2. Hub vs. Switch\n- **Hub (Layer 1):** Floods incoming bits out all ports. Shared collision domain.\n- **Switch (Layer 2):** Maintains Content Addressable Memory (**CAM table**):\n  - Learns source MAC $\\to$ port mapping on incoming frames.\n  - Forwards frames only to destination port if known; floods if unknown unicast.\n  - Each switch port is an **independent collision domain**.\n\n---\n\n## 3. Spanning Tree Protocol (STP)\nSwitches with redundant links create dangerous **Layer 2 loops** (broadcast storms). STP disables redundant paths, constructing an active loop-free logical spanning tree.\n",
      "questions": [
        {
          "id": "cn-eth-1",
          "question": "What is the minimum overall frame size (excluding preamble) for a standard IEEE 802.3 Ethernet frame?",
          "options": [
            "32 bytes",
            "46 bytes",
            "64 bytes",
            "1500 bytes"
          ],
          "correct_option": 2,
          "explanation": "Standard Ethernet enforces a minimum frame length of 64 bytes to ensure CSMA/CD collision detection on 10 Mbps LANs."
        },
        {
          "id": "cn-eth-2",
          "question": "How does a Layer 2 Ethernet switch populate its MAC address forwarding table (CAM table)?",
          "options": [
            "By querying DNS servers",
            "By inspecting the source MAC address of incoming frames on each physical port",
            "By reading destination IP addresses",
            "By using RIP routing updates"
          ],
          "correct_option": 1,
          "explanation": "Switches passively learn by mapping the frame's source MAC address to the physical port on which the frame arrived."
        },
        {
          "id": "cn-eth-3",
          "question": "What mechanism does an Ethernet switch use to populate its MAC address forwarding table dynamically?",
          "options": [
            "Self-learning: Inspecting the Source MAC address of every arriving frame and recording the incoming port number.",
            "Broadcasting DNS queries to all connected PCs.",
            "Manual static configuration by network administrators only.",
            "Running OSPF routing protocol across local ports."
          ],
          "correct_option": 0,
          "explanation": "Ethernet switches use self-learning: whenever a frame arrives on a port, the switch reads the Source MAC address and binds it to that port with an aging timer."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Ethernet+and+Switching+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "ip-subnetting",
      "slug": "ip-addressing-and-subnetting",
      "title": "IP Addressing and Subnetting",
      "description": "IPv4 classes, subnet masks, slash notation (/24), and host capacity calculations.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# IP Addressing, CIDR & Subnetting\n\nEvery device on the internet has a unique IP address. IPv4 addresses are **32-bit numbers** formatted into four 8-bit octets: `A.B.C.D`.\n\n---\n\n## 1. CIDR (Classless Inter-Domain Routing) Notation\nWritten as `IP/Prefix` (e.g. `192.168.1.0/24`):\n- Prefix ($/N$) specifies the **number of network bits**.\n- Remaining bits ($32 - N$) specify **host bits**.\n- Total IP addresses in subnet = $2^{(32 - N)}$.\n- Usable host addresses = $2^{(32 - N)} - 2$ (Subtracting Network ID and Broadcast Address).\n\n### Common CIDR Cheat Sheet:\n| Prefix | Subnet Mask | Usable Hosts |\n| :--- | :--- | :--- |\n| `/24` | `255.255.255.0` | $256 - 2 = 254$ |\n| `/25` | `255.255.255.128` | $128 - 2 = 126$ |\n| `/26` | `255.255.255.192` | $64 - 2 = 62$ |\n| `/30` | `255.255.255.252` | $4 - 2 = 2$ (Point-to-point) |\n",
      "questions": [
        {
          "id": "cidr-1",
          "question": "How many usable host IP addresses are available in a /26 IPv4 subnet?",
          "options": [
            "64",
            "62",
            "30",
            "126"
          ],
          "correct_option": 1,
          "explanation": "Host bits = 32 - 26 = 6. Total addresses = 2^6 = 64. Usable hosts = 64 - 2 (network & broadcast) = 62."
        },
        {
          "id": "sub-2",
          "question": "How many usable host IP addresses are available in an IPv4 subnet with CIDR notation /28?",
          "options": [
            "14",
            "16",
            "30",
            "12"
          ],
          "correct_option": 0,
          "explanation": "Host bits = 32 - 28 = 4. Total IP addresses = 2^4 = 16. Subtract 2 for the Network address and Broadcast address = 16 - 2 = 14 usable hosts."
        },
        {
          "id": "sub-3",
          "question": "What is the dotted decimal subnet mask corresponding to CIDR prefix /26?",
          "options": [
            "255.255.255.192",
            "255.255.255.128",
            "255.255.255.224",
            "255.255.255.240"
          ],
          "correct_option": 0,
          "explanation": "26 bits set: First 3 octets are 255.255.255. Fourth octet has top 2 bits set: 128 + 64 = 192. Thus, 255.255.255.192."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Cisco",
        "Amazon AWS",
        "Microsoft Azure",
        "Google Cloud"
      ],
      "keyTakeaways": [
        "Usable hosts in a /N subnet = 2^(32 - N) - 2 (subtract Network ID and Broadcast Address).",
        "/24 = 256 addresses (254 hosts); /28 = 16 addresses (14 hosts); /30 = 4 addresses (2 hosts).",
        "Private IP ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=IP+Addressing+and+Subnetting+CIDR+Calculations+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-ipv4-and-ipv6",
      "slug": "ipv4-and-ipv6",
      "title": "IPv4 and IPv6",
      "description": "IPv4 header fields (TTL, Fragmentation flags, Offset), MTU and fragmentation, IPv6 128-bit address architecture, IPv6 header format, and transition mechanisms (dual-stack, tunneling).",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Cisco",
        "Amazon",
        "Microsoft",
        "Google"
      ],
      "keyTakeaways": [
        "IPv4 Header: 20 bytes minimum (up to 60 bytes with options).",
        "IPv4 Fragmentation: Identification, Flags (DF, MF), Fragment Offset (measured in 8-byte units).",
        "IPv6 Header: Fixed 40-byte base header; 128-bit addresses (2^128 total addresses).",
        "IPv6 improvements: No header checksum (delegated to L4), no router-level fragmentation (performed only by sender), extension headers."
      ],
      "notesMarkdown": "# IPv4 vs. IPv6 Architecture\n\n---\n\n## 1. IPv4 Packet Fragmentation\nWhen packet size exceeds a link's MTU and Don't Fragment bit $DF = 0$:\n- **Identification:** Same ID across all fragments of a single datagram.\n- **Flags:**\n  - $DF = 1$: Do Not Fragment. (If packet > MTU, router drops packet and sends ICMP Destination Unreachable).\n  - $MF = 1$: More Fragments follow ($MF = 0$ for final fragment).\n- **Fragment Offset:** Byte offset of fragment payload divided by $8$ ($1$ offset unit = $8$ bytes).\n\n---\n\n## 2. IPv6 Key Features\n- **128-bit Address Space:** Eliminates NAT requirement.\n- **Fixed 40-Byte Header:** Speeds up router packet processing.\n- **No In-Network Fragmentation:** Path MTU Discovery (PMTUD) used by sender.\n- **No Header Checksum:** Eliminates checksum recalculation on TTL (Hop Limit) decrements.\n",
      "questions": [
        {
          "id": "cn-ip-1",
          "question": "In IPv4 packet fragmentation, what unit is used to measure the Fragment Offset field value?",
          "options": [
            "1-byte units",
            "4-byte words",
            "8-byte blocks",
            "64-byte chunks"
          ],
          "correct_option": 2,
          "explanation": "The 13-bit Fragment Offset field measures payload byte offset in blocks of 8 bytes (64 bits)."
        },
        {
          "id": "cn-ip-2",
          "question": "Which of the following is TRUE regarding IPv6 router behavior during packet forwarding?",
          "options": [
            "IPv6 routers recompute the header checksum at every hop",
            "IPv6 routers perform fragmentation if the packet exceeds the next link MTU",
            "IPv6 routers never fragment packets; they drop oversized packets and send an ICMPv6 Packet Too Big message to the source",
            "IPv6 uses ARP for MAC resolution"
          ],
          "correct_option": 2,
          "explanation": "In IPv6, routers do not fragment; fragmentation is performed exclusively by source hosts via Path MTU Discovery."
        },
        {
          "id": "cn-ip-3",
          "question": "How many bits are in an IPv4 address versus an IPv6 address?",
          "options": [
            "32 bits in IPv4, 128 bits in IPv6",
            "32 bits in IPv4, 64 bits in IPv6",
            "48 bits in IPv4, 128 bits in IPv6",
            "64 bits in IPv4, 256 bits in IPv6"
          ],
          "correct_option": 0,
          "explanation": "IPv4 addresses are 32 bits long (4 octets, providing ~4.3 billion addresses), whereas IPv6 addresses are 128 bits long (16 bytes, providing 3.4 x 10^38 unique addresses)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=IPv4+and+IPv6+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "routing-protocols",
      "slug": "routing-protocols-and-algorithms",
      "title": "Routing Algorithms",
      "description": "Bellman-Ford vs Dijkstra, RIP, OSPF, and BGP exterior gateway routing.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Routing Protocols: Interior & Exterior Gateway\n\nRouters direct packets across complex network topologies using routing algorithms.\n\n---\n\n## 1. Distance Vector vs Link State\n| Feature | Distance Vector (RIP) | Link State (OSPF) |\n| :--- | :--- | :--- |\n| **Algorithm** | Bellman-Ford | Dijkstra's Shortest Path First (SPF) |\n| **Knowledge** | Knows distance/direction to neighbors | Knows entire network topology graph |\n| **Convergence** | Slow, prone to count-to-infinity | Very fast convergence |\n| **Metric** | Hop count (max 15 in RIP) | Cost based on bandwidth |\n\n## 2. BGP (Border Gateway Protocol)\n- BGP is the **Path Vector** protocol that connects the entire global Internet across Autonomous Systems (AS).\n- Handles routing decisions based on network policies, path vectors, and peering agreements rather than pure technical link speed.\n",
      "questions": [
        {
          "id": "rp-1",
          "question": "Which algorithm is used by OSPF (Open Shortest Path First) to calculate the shortest path to all destinations?",
          "options": [
            "Bellman-Ford Algorithm",
            "Dijkstra's Algorithm",
            "Floyd-Warshall Algorithm",
            "Kruskal's Algorithm"
          ],
          "correct_option": 1,
          "explanation": "OSPF is a link-state routing protocol that maintains a complete topological database and runs Dijkstra's algorithm to compute the shortest-path tree."
        },
        {
          "id": "rp-net-2",
          "question": "Which routing algorithm is used by OSPF (Open Shortest Path First) to calculate the shortest path tree from a router to all destinations?",
          "options": [
            "Dijkstra's Shortest Path Algorithm",
            "Bellman-Ford Algorithm",
            "Floyd-Warshall Algorithm",
            "Kruskal's Algorithm"
          ],
          "correct_option": 0,
          "explanation": "OSPF is a link-state routing protocol where each router constructs a complete topological map of the autonomous system and executes Dijkstra’s algorithm to calculate the lowest-cost paths."
        },
        {
          "id": "rp-net-3",
          "question": "Which routing protocol serves as the standard Exterior Gateway Protocol (EGP) powering inter-domain routing between Autonomous Systems on the global Internet?",
          "options": [
            "BGP (Border Gateway Protocol)",
            "OSPF",
            "RIP",
            "EIGRP"
          ],
          "correct_option": 0,
          "explanation": "BGP is the path-vector exterior gateway protocol that enables routing decisions across independent Autonomous Systems (ASes) constituting the global Internet backbone."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Cisco",
        "Juniper",
        "Cloudflare",
        "Google"
      ],
      "keyTakeaways": [
        "Distance Vector (RIP): Uses hop count (max 15), Bellman-Ford algorithm, split-horizon rule.",
        "Link State (OSPF): Uses Dijkstra shortest path algorithm, floods link-state advertisements (LSAs).",
        "BGP (Border Gateway Protocol): Path-vector protocol connecting Autonomous Systems across the Internet."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Routing+Algorithms+Distance+Vector+Link+State+OSPF+BGP+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-arp-dhcp-icmp-nat",
      "slug": "arp-dhcp-icmp-and-nat",
      "title": "ARP, DHCP, ICMP, and NAT",
      "description": "Address Resolution Protocol (ARP), Dynamic Host Configuration Protocol (DHCP DORA flow), Internet Control Message Protocol (ICMP ping/traceroute), and Network Address Translation (NAT/NAPT).",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Cisco",
        "Google",
        "Microsoft"
      ],
      "keyTakeaways": [
        "ARP: Resolves 32-bit IP address to 48-bit MAC address. Request is Broadcast; Reply is Unicast.",
        "DHCP (DORA): Discover (broadcast) -> Offer (unicast/broadcast) -> Request (broadcast) -> Ack (unicast). Operates over UDP ports 67/68.",
        "ICMP: Network layer reporting (Type 8/0 Echo, Type 3 Destination Unreachable, Type 11 Time Exceeded for traceroute).",
        "NAT / PAT: Maps private IP addresses (RFC 1918) to public IP addresses using L4 port translation tables."
      ],
      "notesMarkdown": "# Supporting Network Protocols\n\n---\n\n## 1. Address Resolution Protocol (ARP)\n- Maps known Network Layer IP $\\to$ Physical Layer MAC address.\n- **ARP Request:** Broadcast (`FF:FF:FF:FF:FF:FF`) asking \"Who has IP X.X.X.X?\".\n- **ARP Reply:** Unicast from owner node: \"I have X.X.X.X, my MAC is Y\".\n\n---\n\n## 2. DHCP (DORA Flow)\n1. **Discover:** Client broadcasts to find DHCP servers (`255.255.255.255:67`).\n2. **Offer:** Server offers IP configuration lease.\n3. **Request:** Client accepts offered lease (broadcast to notify other servers).\n4. **Acknowledge:** Server confirms lease terms and default gateway.\n\n---\n\n## 3. ICMP & Traceroute\n- `ping`: ICMP Type 8 (Echo Request), ICMP Type 0 (Echo Reply).\n- `traceroute`: Sends packets with increasing TTL ($1, 2, 3, \\dots$). Routers decrement TTL to $0$, drop packet, and return **ICMP Type 11 (Time Exceeded)**, revealing each hop IP.\n",
      "questions": [
        {
          "id": "cn-proto-1",
          "question": "What transmission types are used for ARP Request and ARP Reply respectively?",
          "options": [
            "Request is Unicast; Reply is Broadcast",
            "Request is Broadcast; Reply is Unicast",
            "Both Request and Reply are Broadcast",
            "Both Request and Reply are Multicast"
          ],
          "correct_option": 1,
          "explanation": "The ARP request is broadcast to all hosts on the subnet, while the owner unicasts the response directly back to the requester."
        },
        {
          "id": "cn-proto-2",
          "question": "How does the 'traceroute' utility identify intermediate routers along a network path?",
          "options": [
            "By querying DNS records for each hop",
            "By sending packets with incremental TTL values starting from 1 and capturing ICMP Time Exceeded messages from intermediate routers",
            "By broadcasting ARP requests along the route",
            "By establishing TCP handshakes with each router"
          ],
          "correct_option": 1,
          "explanation": "When an intermediate router decrements a packet's TTL to 0, it drops the packet and transmits an ICMP Time Exceeded (Type 11) message back."
        },
        {
          "id": "cn-proto-3",
          "question": "What protocol is used by diagnostic tools like 'ping' and 'traceroute' to send network control and error messages?",
          "options": [
            "ICMP (Internet Control Message Protocol)",
            "IGMP",
            "ARP",
            "SNMP"
          ],
          "correct_option": 0,
          "explanation": "Ping uses ICMP Echo Request / Reply messages, and traceroute exploits ICMP Time Exceeded (TTL expired in transit) messages to map intermediate router hops."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=ARP%2C+DHCP%2C+ICMP%2C+and+NAT+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "tcp-handshake",
      "slug": "tcp-three-way-handshake",
      "title": "TCP and UDP",
      "description": "SYN, SYN-ACK, ACK, sequence numbers, TIME_WAIT state, TCP vs UDP.",
      "estimatedMinutes": 15,
      "notesMarkdown": "\n# TCP 3-Way Handshake & Teardown\n\nReliable, connection-oriented transport protocol mechanism.\n\n---\n\n## 1. 3-Way Handshake (Connection Establishment)\n1. **Client -> Server: SYN (Synchronize)**\n   - Client generates initial sequence number $ISN_C$. Sets `SYN=1`.\n2. **Server -> Client: SYN-ACK**\n   - Server acknowledges with `ACK = ISN_C + 1`.\n   - Server provides its own sequence number $ISN_S$. Sets `SYN=1, ACK=1`.\n3. **Client -> Server: ACK**\n   - Client acknowledges with `ACK = ISN_S + 1`.\n   - Connection is now **ESTABLISHED**. Data transfer begins.\n\n---\n\n## 2. 4-Way Handshake (Connection Termination)\n- Client sends **FIN**.\n- Server sends **ACK** (Server enters `CLOSE_WAIT`).\n- Server sends its own **FIN** when finished sending data.\n- Client sends **ACK** and enters **`TIME_WAIT`** state (typically $2 \\times MSL$, ~60-120 seconds) to ensure the server received the final ACK.\n",
      "questions": [
        {
          "id": "cn-1",
          "question": "Why does the TCP client enter the TIME_WAIT state after sending the final ACK during connection termination?",
          "options": [
            "To allow the client to download remaining files",
            "To ensure the server received the final ACK and to let delayed packets expire in the network",
            "To preserve bandwidth for neighboring connections",
            "To encrypt the remaining session tokens"
          ],
          "correct_option": 1,
          "explanation": "TIME_WAIT lasts 2 * MSL (Maximum Segment Lifetime). It ensures that if the final ACK was lost, retransmitted FIN segments can be answered, and stale duplicate segments cannot interfere with a new connection."
        },
        {
          "id": "tcp-2",
          "question": "What is the purpose of the TIME_WAIT state in the TCP connection termination process?",
          "options": [
            "To ensure the final ACK was received by the remote endpoint and to allow lingering duplicate segments to expire (2 MSL)",
            "To keep the socket buffer warm for immediate reconnection",
            "To calculate round-trip time (RTT) for future packets",
            "To renegotiate encryption keys before closing"
          ],
          "correct_option": 0,
          "explanation": "TIME_WAIT holds the connection closed for 2 * Maximum Segment Lifetime (2 MSL) so that the remote peer receives the final ACK, and prevents late-arriving packets from interfering with a future new connection on the same port."
        },
        {
          "id": "tcp-3",
          "question": "What mechanism in TCP prevents a fast sender from overwhelming a slow receiver’s buffer capacity?",
          "options": [
            "Flow Control (Sliding Window)",
            "Congestion Control (Slow Start)",
            "DNS Throttling",
            "Nagle’s Algorithm"
          ],
          "correct_option": 0,
          "explanation": "Flow Control uses the TCP Receive Window (rwnd) field advertised by the receiver to inform the sender how many bytes of buffer capacity remain available."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Cisco",
        "Cloudflare",
        "Google",
        "Amazon"
      ],
      "keyTakeaways": [
        "TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK.",
        "TCP 4-Way Teardown: FIN -> ACK -> FIN -> ACK.",
        "TIME_WAIT state lasts 2 * MSL (Maximum Segment Lifetime) to ensure delayed packets clear and final ACK is received."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=TCP+and+UDP+Protocols+Handshake+Transport+Layer+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-congestion-control-and-flow-control",
      "slug": "congestion-control-and-flow-control",
      "title": "Congestion Control and Flow Control",
      "description": "Flow control vs Congestion control, TCP Tahoe vs Reno, Slow Start, Congestion Avoidance (AIMD), Fast Retransmit (3 duplicate ACKs), and Fast Recovery.",
      "estimatedMinutes": 25,
      "difficulty": "Hard",
      "companyTags": [
        "Google",
        "Amazon",
        "Cloudflare",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Flow Control: Prevents receiver buffer overflow using Advertised Window (rwnd).",
        "Congestion Control: Prevents network router buffer collapse using Congestion Window (cwnd).",
        "Sender Window = min(cwnd, rwnd).",
        "Slow Start: cwnd doubles every RTT (exponential growth) until ssthresh.",
        "Congestion Avoidance: AIMD (Additive Increase Multiplicative Decrease); cwnd += 1 MSS per RTT.",
        "3 Duplicate ACKs (TCP Reno): ssthresh = cwnd / 2; cwnd = ssthresh + 3 MSS (Fast Recovery)."
      ],
      "notesMarkdown": "# TCP Congestion Control\n\n---\n\n## 1. Flow Control vs. Congestion Control\n- **Flow Control:** Receiver-driven. Uses `rwnd` in TCP header.\n- **Congestion Control:** Network-driven. Maintained by sender via `cwnd`.\n- **Transmission Limit:**\n  $$W_{\\text{effective}} = \\min(\\text{cwnd}, \\text{rwnd})$$\n\n---\n\n## 2. TCP Congestion Control Phases\n1. **Slow Start:**\n   - Starts at $\\text{cwnd} = 1\\text{ MSS}$.\n   - For every ACK received, $\\text{cwnd} += 1 \\implies$ doubles every RTT.\n   - Continues until $\\text{cwnd} \\ge \\text{ssthresh}$.\n2. **Congestion Avoidance (AIMD):**\n   - Linear growth: $\\text{cwnd} += 1\\text{ MSS}$ per RTT.\n3. **Loss Events:**\n   - **Timeout (Severe congestion):** $\\text{ssthresh} = \\text{cwnd} / 2$, $\\text{cwnd} = 1\\text{ MSS}$, revert to Slow Start.\n   - **3 Duplicate ACKs (Mild congestion - TCP Reno):** $\\text{ssthresh} = \\text{cwnd} / 2$, $\\text{cwnd} = \\text{ssthresh}$, enter Fast Recovery.\n",
      "questions": [
        {
          "id": "cn-cc-1",
          "question": "In TCP Reno, when a packet loss is detected via 3 Duplicate ACKs, what value is cwnd set to?",
          "options": [
            "1 MSS (restarting slow start)",
            "ssthresh (half of previous cwnd, skipping slow start via Fast Recovery)",
            "Double the previous cwnd",
            "rwnd"
          ],
          "correct_option": 1,
          "explanation": "TCP Reno avoids dropping cwnd to 1 on 3 duplicate ACKs; it cuts cwnd in half and enters Fast Recovery directly in Congestion Avoidance."
        },
        {
          "id": "cn-cc-2",
          "question": "During TCP's Slow Start phase, at what rate does the congestion window (cwnd) increase per Round Trip Time (RTT)?",
          "options": [
            "Linearly (+1 MSS per RTT)",
            "Exponentially (doubles every RTT)",
            "Logarithmically",
            "It remains constant"
          ],
          "correct_option": 1,
          "explanation": "In Slow Start, cwnd increases by 1 MSS for every acknowledged packet, effectively doubling cwnd each RTT."
        },
        {
          "id": "cn-cong-3",
          "question": "During TCP Slow Start, how does the Congestion Window (cwnd) grow upon receiving successful acknowledgments?",
          "options": [
            "Exponentially (cwnd doubles every Round-Trip Time RTT).",
            "Linearly (cwnd increases by 1 MSS every RTT).",
            "Logarithmically.",
            "It remains fixed at initial window size."
          ],
          "correct_option": 0,
          "explanation": "In TCP Slow Start, cwnd increases by 1 Maximum Segment Size (MSS) for each ACK received, which doubles the congestion window size every round-trip time (exponential growth)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Congestion+Control+and+Flow+Control+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "http-https-tls",
      "slug": "http-https-and-tls",
      "title": "DNS, HTTP/HTTPS, FTP, SMTP, and Email",
      "description": "Asymmetric vs symmetric encryption, TLS handshake steps, multiplexing, and QUIC protocol.",
      "estimatedMinutes": 16,
      "notesMarkdown": "\n# HTTP, HTTPS & TLS Handshake\n\n---\n\n## 1. Why HTTPS?\nHTTP communicates in plaintext over port 80. HTTPS encrypts traffic using TLS (Transport Layer Security) over port 443, guaranteeing **Confidentiality, Integrity, and Authenticity**.\n\n---\n\n## 2. TLS 1.3 Handshake (1-RTT)\n1. **ClientHello:** Supported cipher suites + Client Random + Key Share (Diffie-Hellman public key).\n2. **ServerHello:** Selected cipher suite + Server Random + Server Key Share + Server Digital Certificate.\n3. Both sides independently calculate the shared **Symmetric Session Key** without transmitting it across the wire.\n4. Future communication uses fast symmetric encryption (AES-GCM).\n\n---\n\n## 3. Protocol Evolution\n- **HTTP/1.1:** Head-of-line blocking at application level; one request per TCP connection at a time.\n- **HTTP/2:** Binary framing layer, stream multiplexing over a single TCP connection.\n- **HTTP/3:** Replaces TCP with **QUIC (UDP-based)**, eliminating transport-level head-of-line blocking during packet loss.\n",
      "questions": [
        {
          "id": "cn-4",
          "question": "Which underlying transport protocol powers HTTP/3 to eliminate TCP head-of-line blocking?",
          "options": [
            "SCTP",
            "QUIC over UDP",
            "IPsec",
            "WebSocket over TLS"
          ],
          "correct_option": 1,
          "explanation": "HTTP/3 uses QUIC running over UDP, allowing independent multiplexed streams where packet loss on one stream does not stall other streams."
        },
        {
          "id": "http-2",
          "question": "Why was HTTP/3 designed to operate over UDP (via the QUIC protocol) rather than traditional TCP?",
          "options": [
            "To eliminate TCP-level Head-of-Line (HoL) blocking across multiplexed streams and enable fast 0-RTT handshakes",
            "Because UDP is encrypted by default at the kernel level",
            "Because TCP cannot support audio/video streaming",
            "To bypass firewall port 443 restrictions"
          ],
          "correct_option": 0,
          "explanation": "In HTTP/2 over TCP, if a single packet is lost, all multiplexed streams stall until TCP retransmits it (HoL blocking). HTTP/3 over QUIC handles packet loss independently per stream over UDP."
        },
        {
          "id": "http-3",
          "question": "During a TLS 1.3 handshake, how is the symmetric encryption session key established securely?",
          "options": [
            "Diffie-Hellman Key Exchange (ECDHE)",
            "The client encrypts the key with the server’s private key",
            "The server sends the secret key in plain text over HTTPS",
            "The certificate authority transmits the key via DNS"
          ],
          "correct_option": 0,
          "explanation": "Modern TLS uses Elliptic Curve Diffie-Hellman Ephemeral (ECDHE) key exchange to establish a shared symmetric session key with Forward Secrecy."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Cloudflare",
        "Google",
        "Meta",
        "Netflix"
      ],
      "keyTakeaways": [
        "HTTP/1.1 introduced persistent connections but suffers from Head-of-Line (HoL) blocking on single TCP streams.",
        "HTTP/2 multiplexes multiple binary requests/streams over a single TCP connection.",
        "HTTP/3 runs over UDP using QUIC, eliminating TCP-level Head-of-Line blocking and enabling zero-RTT handshakes."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=DNS+HTTP+HTTPS+FTP+SMTP+Application+Layer+Protocols+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "dns-resolution",
      "slug": "dns-architecture-resolution",
      "title": "DNS Resolution Flow & Hierarchy",
      "description": "Recursive vs Iterative queries, Root servers, TLD servers, Authoritative servers, and DNS record types.",
      "estimatedMinutes": 14,
      "notesMarkdown": "\n# DNS Resolution Architecture\n\n---\n\n## 1. Step-by-Step DNS Query Flow\nWhen you type `https://google.com` in a browser:\n1. Browser cache -> OS resolver cache -> Local Router cache.\n2. Query sent to **Recursive Resolver** (e.g. ISP or `8.8.8.8`).\n3. Recursive resolver queries **Root Nameserver (`.`)** -> Returns TLD server (`.com`).\n4. Resolver queries **TLD Nameserver (`.com`)** -> Returns Authoritative nameserver for `google.com`.\n5. Resolver queries **Authoritative Nameserver** -> Returns actual IP address (`142.250.190.46`).\n6. Resolver caches response with TTL and returns IP to client.\n\n---\n\n## 2. Common DNS Record Types\n- **A Record:** Maps domain name to IPv4 address.\n- **AAAA Record:** Maps domain name to IPv6 address.\n- **CNAME (Canonical Name):** Alias pointing one domain to another domain name.\n- **MX Record:** Mail exchange server routing emails.\n",
      "questions": [
        {
          "id": "cn-3",
          "question": "Which DNS record type is used to map an alias domain name to another domain name rather than directly to an IP address?",
          "options": [
            "A Record",
            "CNAME Record",
            "MX Record",
            "PTR Record"
          ],
          "correct_option": 1,
          "explanation": "CNAME (Canonical Name) creates an alias pointing to the canonical domain name."
        },
        {
          "id": "dns-2",
          "question": "Which DNS record type maps a domain name directly to an IPv6 address?",
          "options": [
            "AAAA record",
            "A record",
            "CNAME record",
            "PTR record"
          ],
          "correct_option": 0,
          "explanation": "An \"A\" record maps a hostname to a 32-bit IPv4 address, whereas a \"AAAA\" (quad-A) record maps a hostname to a 128-bit IPv6 address."
        },
        {
          "id": "dns-3",
          "question": "What is the role of an Authoritative DNS Server in the DNS lookup process?",
          "options": [
            "It holds the definitive, verified DNS records for a specific domain zone",
            "It caches queries for client ISPs",
            "It is the 13 root servers coordinating global top-level domains",
            "It encrypts browser HTTPS traffic"
          ],
          "correct_option": 0,
          "explanation": "Authoritative DNS servers are the source of truth for specific domain names; they provide the final IP answer to the recursive resolver."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Cloudflare",
        "Google",
        "Amazon",
        "Meta"
      ],
      "keyTakeaways": [
        "Resolution hierarchy: Browser Cache -> OS Cache -> Recursive Resolver -> Root Server -> TLD Server -> Authoritative Server.",
        "A record = IPv4; AAAA record = IPv6; CNAME = Canonical Name alias; MX = Mail exchange.",
        "TTL (Time to Live) governs how long resolvers cache DNS records."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=DNS+Resolution+Flow+Hierarchy+Computer+Networks+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-network-security-fundamentals",
      "slug": "network-security-fundamentals",
      "title": "Network Security Fundamentals",
      "description": "Symmetric vs Asymmetric cryptography (RSA, AES), Digital Signatures, Public Key Infrastructure (PKI / X.509 certificates), Firewalls (packet filtering, stateful, application proxy), and SSL/TLS.",
      "estimatedMinutes": 22,
      "difficulty": "Medium",
      "companyTags": [
        "Palo Alto Networks",
        "CrowdStrike",
        "Cloudflare",
        "Amazon"
      ],
      "keyTakeaways": [
        "Symmetric Encryption (AES): Same secret key for encryption and decryption; high speed.",
        "Asymmetric Encryption (RSA, ECC): Public key encrypts, private key decrypts (or private key signs, public key verifies).",
        "Digital Signature: Hash of message encrypted with sender's private key; provides Authentication, Integrity, and Non-Repudiation.",
        "Stateful Firewall: Tracks TCP connection state (SYN, ESTABLISHED) across packets.",
        "TLS Handshake: Negotiates symmetric session key via asymmetric public-key cryptography."
      ],
      "notesMarkdown": "# Network Security Fundamentals\n\n---\n\n## 1. Cryptography Primitives\n- **Symmetric Cryptography (AES, ChaCha20):** Shared secret key. Fast, bulk data encryption.\n- **Asymmetric Cryptography (RSA, ECC/ECDSA):**\n  - Public Key: Shared with world.\n  - Private Key: Kept confidential by owner.\n  - Encryption: Encrypt with Receiver's Public Key $\\implies$ only Receiver can decrypt.\n  - Digital Signature: Encrypt hash with Sender's Private Key $\\implies$ anyone verifies with Public Key.\n\n---\n\n## 2. Firewall Architectures\n1. **Packet-Filtering Firewall (Stateless - Layer 3/4):** Filters individual packets based on IP, port, and protocol without tracking connection state.\n2. **Stateful Inspection Firewall:** Tracks TCP sequence numbers and connection state table. Allows return traffic only for established connections.\n3. **Application Gateway (Proxy - Layer 7):** Inspects actual payload protocols (HTTP, FTP) for malicious commands.\n",
      "questions": [
        {
          "id": "cn-sec-1",
          "question": "A digital signature on a message is generated by encrypting the message digest (hash) with whose cryptographic key?",
          "options": [
            "Sender's Public Key",
            "Sender's Private Key",
            "Receiver's Public Key",
            "Receiver's Private Key"
          ],
          "correct_option": 1,
          "explanation": "Signing with the Sender's Private Key proves sender identity and ensures non-repudiation, since only the sender possesses the private key."
        },
        {
          "id": "cn-sec-2",
          "question": "What is the primary operational advantage of a Stateful Inspection Firewall over a Stateless Packet-Filtering Firewall?",
          "options": [
            "It executes entirely in hardware L1 cache",
            "It tracks connection states, permitting incoming response packets only if they belong to an existing active session",
            "It removes the need for IP addresses",
            "It automatically encrypts all outbound traffic"
          ],
          "correct_option": 1,
          "explanation": "Stateful firewalls maintain connection tables (e.g. TCP handshakes), automatically allowing legitimate incoming replies while blocking unsolicited traffic."
        },
        {
          "id": "cn-sec-3",
          "question": "In asymmetric public-key cryptography (e.g. RSA), which key is used to sign a digital certificate, and which is used to verify the signature?",
          "options": [
            "Signed with the sender's Private Key; verified using the sender's Public Key.",
            "Signed with the sender's Public Key; verified using Private Key.",
            "Signed with the receiver's Public Key; verified with receiver's Private Key.",
            "Signed and verified with the same shared symmetric secret key."
          ],
          "correct_option": 0,
          "explanation": "Digital signatures provide non-repudiation and authenticity by encrypting the document hash with the signer's Private Key. Anyone in possession of the signer's Public Key can decrypt and verify the signature."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Network+Security+Fundamentals+Computer+Networks+CN+GATE+lecture"
    },
    {
      "id": "cn-performance-throughput-delay-bandwidth",
      "slug": "performance-throughput-delay-and-bandwidth",
      "title": "Performance: Throughput, Delay, and Bandwidth",
      "description": "Network performance metrics: Bandwidth-Delay Product (BDP), Transmission delay vs Propagation delay, Queuing delay, Processing delay, and Packet Loss.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Google",
        "Microsoft",
        "Meta"
      ],
      "keyTakeaways": [
        "Total Delay = Transmission Delay (L/R) + Propagation Delay (d/s) + Queuing Delay + Processing Delay.",
        "Transmission Delay: Time to push all packet bits onto the link; depends on packet size and transmission rate.",
        "Propagation Delay: Time for 1 bit to travel across the physical medium; depends on physical distance and propagation speed.",
        "Bandwidth-Delay Product (BDP): BDP = Bandwidth * Round-Trip Time; defines maximum volume of in-flight data."
      ],
      "notesMarkdown": "# Network Performance Metrics\n\n---\n\n## 1. The 4 Components of Total Latency\n$$\\text{Total Delay} = T_{\\text{trans}} + T_{\\text{prop}} + T_{\\text{queue}} + T_{\\text{proc}}$$\n\n1. **Transmission Delay ($T_{\\text{trans}}$):**\n   $$T_{\\text{trans}} = \\frac{L}{R} = \\frac{\\text{Packet Size (bits)}}{\\text{Transmission Rate (bps)}}$$\n2. **Propagation Delay ($T_{\\text{prop}}$):**\n   $$T_{\\text{prop}} = \\frac{d}{s} = \\frac{\\text{Distance (m)}}{\\text{Propagation Speed (m/s)}} \\quad (s \\approx 2 \\times 10^8\\text{ m/s in fiber})$$\n3. **Queuing Delay ($T_{\\text{queue}}$):** Time waiting in router buffers. Depends on traffic intensity $\\frac{L \\cdot a}{R}$.\n4. **Processing Delay ($T_{\\text{proc}}$):** Time router spends checking bit errors and reading routing table (typically microseconds).\n\n---\n\n## 2. Bandwidth-Delay Product (BDP)\n$$\\text{BDP} = R \\times \\text{RTT}$$\nRepresents the maximum number of bits that can be \"in flight\" across the link pipe at any given instant. Determines optimal TCP receive window size.\n",
      "questions": [
        {
          "id": "cn-perf-1",
          "question": "A 1000-byte packet is transmitted over a 10 Mbps link across a distance of 2000 km (propagation speed 2 * 10^8 m/s). What is the Transmission Delay?",
          "options": [
            "0.8 ms",
            "8 ms",
            "10 ms",
            "1 ms"
          ],
          "correct_option": 0,
          "explanation": "T_trans = L / R = (1000 * 8 bits) / (10 * 10^6 bps) = 8000 / 10,000,000 = 0.0008 seconds = 0.8 ms."
        },
        {
          "id": "cn-perf-2",
          "question": "What does the Bandwidth-Delay Product (BDP) represent in computer networking?",
          "options": [
            "The number of dropped packets per second",
            "The maximum capacity of bits that can be in flight in the network pipe at any moment",
            "The minimum allowable MTU",
            "The total time to complete a TCP handshake"
          ],
          "correct_option": 1,
          "explanation": "BDP measures the data volume that can simultaneously fill the communication link between sender and receiver."
        },
        {
          "id": "cn-perf-3",
          "question": "What is the Bandwidth-Delay Product (BDP) in high-speed computer networks?",
          "options": [
            "The product of link bandwidth (bits/sec) and round-trip propagation delay (seconds), representing the maximum amount of data in flight in the network pipe.",
            "The queuing delay divided by packet transmission delay.",
            "The maximum throughput of a 10Gbps fiber channel.",
            "The packet loss percentage over wireless channels."
          ],
          "correct_option": 0,
          "explanation": "Bandwidth-Delay Product (BDP = RTT * Bandwidth) measures the capacity of the network link pipe (the volume of data that can be transmitted before the first acknowledgment arrives)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Performance%3A+Throughput%2C+Delay%2C+and+Bandwidth+Computer+Networks+CN+GATE+lecture"
    }
  ]
};
