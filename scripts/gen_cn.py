import json
import urllib.parse

def make_yt_url(title, subject="Computer Networks CN GATE"):
    q = f"{title} {subject} lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(q)}"

with open("scripts/existing_curriculum.json", encoding="utf-8") as f:
    existing = json.load(f)

existing_cn_topics = {}
for cat in existing["core-cs"]["categories"]:
    if cat["id"] == "cn":
        for t in cat["topics"]:
            existing_cn_topics[t["id"]] = t

new_cn_topics = [
    {
        "id": "cn-physical-layer-fundamentals",
        "slug": "physical-layer-fundamentals",
        "title": "Physical Layer Fundamentals",
        "description": "Transmission media (guided vs unguided), digital vs analog signals, Nyquist Bit Rate, Shannon Channel Capacity, attenuation, distortion, and noise.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Cisco", "Qualcomm", "Intel", "Broadcom"],
        "keyTakeaways": [
            "Nyquist Theorem (Noiseless channel): Max Bit Rate = 2 * B * log2(V) bps.",
            "Shannon Capacity (Noisy channel): Capacity C = B * log2(1 + SNR) bps.",
            "SNR in decibels: SNR_dB = 10 * log10(SNR).",
            "Transmission impairments: Attenuation, distortion, and thermal/Gaussian noise."
        ],
        "notesMarkdown": """# Physical Layer Fundamentals

---

## 1. Theoretical Maximum Data Rates
- **Nyquist Bit Rate (For Noiseless Channels):**
  $$\\text{Bit Rate} = 2 \\times B \\times \\log_2(V) \\text{ bps}$$
  Where $B$ is bandwidth in Hertz and $V$ is the number of discrete signal levels.

- **Shannon Channel Capacity (For Noisy Channels):**
  $$C = B \\times \\log_2(1 + \\text{SNR}) \\text{ bps}$$
  Where $\\text{SNR}$ is the linear Signal-to-Noise Ratio ($\\text{Signal Power} / \\text{Noise Power}$).
  $$\\text{SNR}_{\\text{dB}} = 10 \\times \\log_{10}(\\text{SNR})$$

---

## 2. Transmission Media
- **Guided (Wired):** Twisted Pair (UTP Cat6), Coaxial Cable, Fiber Optic (Total Internal Reflection, highest bandwidth, immune to EMI).
- **Unguided (Wireless):** Radio waves (omnidirectional), Microwaves (line-of-sight), Infrared (short-range).
""",
        "questions": [
            {
                "id": "cn-phy-1",
                "question": "A noiseless channel has a bandwidth of 4 kHz and transmits signals with 16 discrete signal levels. What is the maximum data rate by Nyquist theorem?",
                "options": ["16 kbps", "32 kbps", "64 kbps", "8 kbps"],
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
            }
        ]
    },
    {
        "id": "cn-data-link-layer",
        "slug": "data-link-layer",
        "title": "Data Link Layer",
        "description": "Services of Data Link Layer, node-to-node delivery, framing, physical addressing (MAC addresses), error control, and flow control overview.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Cisco", "Arista", "Juniper", "Amazon"],
        "keyTakeaways": [
            "Data Link Layer (DLL) responsibility: Node-to-node (hop-to-hop) frame delivery across a single physical link.",
            "PDU: Frame (contains MAC header, payload, and FCS/trailer).",
            "MAC Address: 48-bit (6-byte) globally unique hardware address burned into NIC.",
            "Sublayers: Logical Link Control (LLC) and Media Access Control (MAC)."
        ],
        "notesMarkdown": """# Data Link Layer (DLL) Responsibilities

---

## 1. Core Functions of DLL
1. **Framing:** Encapsulating network layer IP datagrams into frames with header and trailer.
2. **Physical Addressing:** Adding 48-bit MAC addresses of sender and next-hop receiver.
3. **Flow Control:** Preventing fast transmitters from overwhelming slow receivers.
4. **Error Control:** Detecting and retransmitting corrupted frames using CRC / ARQ.
5. **Media Access Control (MAC):** Arbitrating shared access to multi-access broadcast channels.

---

## 2. DLL Sublayers
- **LLC (Logical Link Control - IEEE 802.2):** Flow control, error handling, protocol multiplexing.
- **MAC (Media Access Control - IEEE 802.3/802.11):** Frame delimiting, collision handling, physical addressing.
""",
        "questions": [
            {
                "id": "cn-dll-1",
                "question": "What is the primary scope of delivery guaranteed by the Data Link Layer?",
                "options": ["Process-to-Process delivery", "End-to-End host delivery across the Internet", "Hop-to-Hop (node-to-node) delivery across a single physical link", "Application layer message formatting"],
                "correct_option": 2,
                "explanation": "Data Link Layer manages frame transfers across a single physical hop/link between directly connected network nodes."
            },
            {
                "id": "cn-dll-2",
                "question": "How many bits are in a standard Ethernet MAC hardware address?",
                "options": ["32 bits", "48 bits (6 bytes)", "64 bits", "128 bits"],
                "correct_option": 1,
                "explanation": "Ethernet MAC addresses are 48 bits (6 octets) long, usually written in hexadecimal (e.g. AA:BB:CC:DD:EE:FF)."
            }
        ]
    },
    {
        "id": "cn-framing-and-error-detection",
        "slug": "framing-and-error-detection",
        "title": "Framing and Error Detection",
        "description": "Framing techniques: Character count, Byte stuffing (character-oriented), Bit stuffing (flag bytes 01111110), and types of transmission errors.",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Cisco", "Qualcomm", "Intel", "Microsoft"],
        "keyTakeaways": [
            "Character Count: Vulnerable; if count header is corrupted, all subsequent frame boundaries are desynchronized.",
            "Byte Stuffing: Escapes flag byte sequences using ESC byte (e.g. PPP).",
            "Bit Stuffing: Delimiter flag is 01111110 (01^6 0). Sender inserts a '0' bit after five consecutive '1' bits anywhere in data.",
            "Receiver destuffing: After five consecutive 1s, if next bit is 0, it is stripped; if 1, it indicates end-of-frame flag or error."
        ],
        "notesMarkdown": """# Framing & Stuffing Techniques

---

## 1. Framing Methods
- **Character Count:** First field stores frame length. If corrupted, framing error propagates indefinitely.
- **Byte Stuffing (Character-Oriented):** Uses flag bytes (e.g., `FLAG = 0x7E`). Any appearance of `FLAG` or `ESC` in data is prefixed with an `ESC` escape byte.
- **Bit Stuffing (Bit-Oriented - HDLC):**
  - Frame delimiter flag: `01111110` ($0$ followed by six $1$s, followed by $0$).
  - **Rule at Sender:** Whenever sender sees five consecutive `1`s in data stream (`11111`), it automatically injects a `0` bit immediately after.
  - **Rule at Receiver:** Whenever receiver sees five consecutive `1`s, it inspects the 6th bit:
    - If `0`: Discard it (destuffing).
    - If `10`: It is a `FLAG` marker!

---

## 2. Hamming Distance & Error Detection
- Minimum Hamming distance $d_{\\min}$ to **detect** $e$ errors:
  $$d_{\\min} \\ge e + 1$$
- Minimum Hamming distance to **correct** $t$ errors:
  $$d_{\\min} \\ge 2t + 1$$
""",
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
                "options": ["3", "4", "6", "7"],
                "correct_option": 1,
                "explanation": "To detect e errors, d_min >= e + 1. For e = 3 errors, d_min >= 3 + 1 = 4."
            }
        ]
    },
    {
        "id": "cn-crc-and-checksum",
        "slug": "crc-and-checksum",
        "title": "CRC and Checksum",
        "description": "Parity checks, 16-bit Internet Checksum (one's complement sum), Cyclic Redundancy Check (CRC) polynomial division, and generator polynomials.",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Cisco", "Google", "Amazon", "Intel"],
        "keyTakeaways": [
            "Internet Checksum: 16-bit 1's complement sum of 16-bit words; inverted at sender; receiver sum should equal 0xFFFF (all 1s).",
            "CRC (Cyclic Redundancy Check): Polynomial division using modulo-2 arithmetic (XOR).",
            "If generator polynomial G(x) has degree r, sender appends r zeros to data and computes remainder.",
            "CRC detects all single-bit errors, all double-bit errors (if G(x) has factor with >= 3 terms), and all burst errors <= r bits."
        ],
        "notesMarkdown": """# Error Detection: CRC & Internet Checksum

---

## 1. Cyclic Redundancy Check (CRC)
CRC treats bit strings as polynomials with coefficients in $\\text{GF}(2)$ (Modulo-2 Arithmetic $\\equiv$ XOR without carry):
1. Let data $D$ have polynomial representation $D(x)$ and generator polynomial $G(x)$ of degree $r$.
2. Append $r$ zeros to data: $D(x) \\cdot x^r$.
3. Divide $(D(x) \\cdot x^r)$ by $G(x)$ using XOR division.
4. The $r$-bit remainder $R(x)$ is the CRC checksum.
5. Transmitted frame = $T(x) = D(x) \\cdot x^r \\oplus R(x)$.
6. Receiver divides received frame by $G(x)$. If remainder is $0$, frame is error-free!

---

## 2. Internet Checksum
- Used in IPv4 header, TCP, and UDP.
- Treats header as sequence of 16-bit integers.
- Sums integers using One's Complement arithmetic (carries wrapped around and added to LSB).
- Bitwise NOT of final sum is stored in checksum field.
""",
        "questions": [
            {
                "id": "cn-crc-1",
                "question": "If a CRC generator polynomial G(x) = x^4 + x + 1 is used, how many zero bits are appended to the data stream before division?",
                "options": ["3 zeros", "4 zeros", "5 zeros", "1 zero"],
                "correct_option": 1,
                "explanation": "The degree of the generator polynomial G(x) is 4 (highest power of x is 4), so exactly 4 zero bits are appended."
            },
            {
                "id": "cn-crc-2",
                "question": "What mathematical operation is used in place of standard subtraction during CRC polynomial division?",
                "options": ["Bitwise AND", "Bitwise OR", "Bitwise XOR (Modulo-2 addition/subtraction without carry)", "One's complement addition"],
                "correct_option": 2,
                "explanation": "Modulo-2 subtraction and addition are equivalent to the bitwise XOR operation."
            }
        ]
    },
    {
        "id": "cn-flow-control-and-error-control",
        "slug": "flow-control-and-error-control",
        "title": "Flow Control and Error Control",
        "description": "Stop-and-Wait ARQ, Go-Back-N ARQ, Selective Repeat ARQ, sliding window protocols, efficiency calculations, and window sizing rules.",
        "estimatedMinutes": 25,
        "difficulty": "Hard",
        "companyTags": ["Amazon", "Cisco", "Microsoft", "Google"],
        "keyTakeaways": [
            "Stop-and-Wait Efficiency: eta = 1 / (1 + 2a), where a = T_prop / T_trans.",
            "Go-Back-N (GBN): Sender window W_s = 2^k - 1 (or N), Receiver window W_r = 1. Discards out-of-order packets; cumulative ACKs.",
            "Selective Repeat (SR): Sender window W_s = 2^(k-1), Receiver window W_r = W_s = 2^(k-1). Buffers out-of-order packets; independent ACKs.",
            "Window Sizing: W_s + W_r <= 2^k (where k is sequence number bit count) to avoid sequence number wrap-around ambiguity."
        ],
        "notesMarkdown": """# Sliding Window Protocols (ARQ)

---

## 1. Sliding Window Protocol Comparison
| Metric | Stop-and-Wait | Go-Back-N (GBN) | Selective Repeat (SR) |
|---|---|---|---|
| **Sender Window ($W_s$)** | $1$ | $N = 2^k - 1$ | $2^{k-1}$ |
| **Receiver Window ($W_r$)** | $1$ | $1$ | $2^{k-1}$ |
| **Efficiency ($\\eta$)** | $\\frac{1}{1 + 2a}$ | $\\min\\left(1, \\frac{W_s}{1 + 2a}\\right)$ | $\\min\\left(1, \\frac{W_s}{1 + 2a}\\right)$ |
| **ACK Type** | Individual | Cumulative | Independent / Selective |
| **Out-of-Order Handling** | Discarded | Discarded | Buffered in receiver window |

Where $a = \\frac{T_{\\text{prop}}}{T_{\\text{trans}}} = \\frac{\\text{Propagation Delay}}{\\text{Transmission Delay}}$.

---

## 2. Sequence Number Constraint
To prevent new packets with reused sequence numbers from being mistaken for retransmissions:
$$W_s + W_r \\le 2^k$$
- For GBN ($W_r = 1$): $W_s \\le 2^k - 1$.
- For SR ($W_s = W_r$): $W_s = W_r \\le 2^{k-1}$.
""",
        "questions": [
            {
                "id": "cn-fc-1",
                "question": "If 3 bits are used for sequence numbers in Selective Repeat ARQ, what is the maximum permissible sender window size?",
                "options": ["7", "8", "4", "3"],
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
            }
        ]
    },
    {
        "id": "cn-mac-protocols",
        "slug": "mac-protocols",
        "title": "MAC Protocols",
        "description": "Random access protocols: Pure ALOHA (efficiency 18.4%), Slotted ALOHA (efficiency 36.8%), CSMA, CSMA/CD (Ethernet collision detection), and CSMA/CA (Wi-Fi collision avoidance with RTS/CTS).",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Cisco", "Qualcomm", "Arista", "Broadcom"],
        "keyTakeaways": [
            "Pure ALOHA: Vulnerable time = 2 * T_frame; Max efficiency = 1 / (2e) = 18.4%.",
            "Slotted ALOHA: Vulnerable time = T_frame; Max efficiency = 1 / e = 36.8%.",
            "CSMA/CD: Carrier Sense Multiple Access with Collision Detection. Used in wired Ethernet.",
            "CSMA/CD Condition: T_trans >= 2 * T_prop (Frame length L >= 2 * Bandwidth * T_prop).",
            "CSMA/CA: Collision Avoidance via Inter-Frame Spaces (IFS), Contention Windows, and RTS/CTS handshake."
        ],
        "notesMarkdown": """# Media Access Control (MAC) Protocols

---

## 1. ALOHA Protocols
- **Pure ALOHA:** Transmit whenever data is ready.
  - Vulnerable period: $2 \\times T_{\\text{frame}}$.
  - Maximum Throughput: $S_{\\max} = \\frac{1}{2e} \\approx 18.4\\%$.
- **Slotted ALOHA:** Time divided into slots of duration $T_{\\text{frame}}$. Transmit only at slot boundary.
  - Vulnerable period: $T_{\\text{frame}}$.
  - Maximum Throughput: $S_{\\max} = \\frac{1}{e} \\approx 36.8\\%$.

---

## 2. CSMA/CD (Carrier Sense Multiple Access with Collision Detection)
- "Listen before talk; listen while talk."
- **Collision Detection Constraint:** To guarantee a sender detects a collision before completing transmission:
  $$T_{\\text{trans}} \\ge 2 \\times T_{\\text{prop}}$$
  $$\\frac{L}{\\text{Bandwidth}} \\ge 2 \\times \\frac{\\text{Distance}}{\\text{Propagation Speed}}$$
  $$\\implies L_{\\min} = 2 \\times \\text{Bandwidth} \\times T_{\\text{prop}}$$
""",
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
                "options": ["18.4%", "36.8%", "50%", "100%"],
                "correct_option": 0,
                "explanation": "Pure ALOHA reaches peak throughput S = G * e^(-2G) at G = 0.5, giving S_max = 1 / (2e) = 0.184 (18.4%)."
            }
        ]
    },
    {
        "id": "cn-ethernet-and-switching",
        "slug": "ethernet-and-switching",
        "title": "Ethernet and Switching",
        "description": "Standard Ethernet (IEEE 802.3), frame format, minimum frame size (64 bytes), Hubs vs Switches, Transparent Bridging, MAC learning, and Spanning Tree Protocol (STP).",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["Cisco", "Arista", "Amazon", "Google"],
        "keyTakeaways": [
            "Ethernet Frame: Preamble (7B), SFD (1B), Dest MAC (6B), Src MAC (6B), Type/Length (2B), Payload (46-1500B), FCS/CRC (4B). Minimum frame = 64 bytes.",
            "Hub: Layer 1 physical repeater; single shared collision domain and broadcast domain.",
            "Switch: Layer 2 multi-port bridge; separate collision domain per port, single shared broadcast domain.",
            "MAC Learning: Switch populates CAM table dynamically by inspecting source MAC addresses of incoming frames.",
            "STP (Spanning Tree Protocol - IEEE 802.1D): Prevents broadcast storms and loops in redundant Layer 2 networks."
        ],
        "notesMarkdown": """# Ethernet & Layer 2 Switching

---

## 1. Ethernet Frame (IEEE 802.3)
```text
+----------+-----+----------+---------+------+------------+---------+
| Preamble | SFD | Dest MAC | Src MAC | Type |  Payload   | FCS/CRC |
| 7 Bytes  | 1 B | 6 Bytes  | 6 Bytes | 2 B  | 46-1500 B  | 4 Bytes |
+----------+-----+----------+---------+------+------------+---------+
```
- **Minimum Frame Size:** $6 + 6 + 2 + 46 + 4 = 64$ bytes.
- **Maximum Transmission Unit (MTU):** 1500 bytes (payload).

---

## 2. Hub vs. Switch
- **Hub (Layer 1):** Floods incoming bits out all ports. Shared collision domain.
- **Switch (Layer 2):** Maintains Content Addressable Memory (**CAM table**):
  - Learns source MAC $\\to$ port mapping on incoming frames.
  - Forwards frames only to destination port if known; floods if unknown unicast.
  - Each switch port is an **independent collision domain**.

---

## 3. Spanning Tree Protocol (STP)
Switches with redundant links create dangerous **Layer 2 loops** (broadcast storms). STP disables redundant paths, constructing an active loop-free logical spanning tree.
""",
        "questions": [
            {
                "id": "cn-eth-1",
                "question": "What is the minimum overall frame size (excluding preamble) for a standard IEEE 802.3 Ethernet frame?",
                "options": ["32 bytes", "46 bytes", "64 bytes", "1500 bytes"],
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
            }
        ]
    },
    {
        "id": "cn-ipv4-and-ipv6",
        "slug": "ipv4-and-ipv6",
        "title": "IPv4 and IPv6",
        "description": "IPv4 header fields (TTL, Fragmentation flags, Offset), MTU and fragmentation, IPv6 128-bit address architecture, IPv6 header format, and transition mechanisms (dual-stack, tunneling).",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Cisco", "Amazon", "Microsoft", "Google"],
        "keyTakeaways": [
            "IPv4 Header: 20 bytes minimum (up to 60 bytes with options).",
            "IPv4 Fragmentation: Identification, Flags (DF, MF), Fragment Offset (measured in 8-byte units).",
            "IPv6 Header: Fixed 40-byte base header; 128-bit addresses (2^128 total addresses).",
            "IPv6 improvements: No header checksum (delegated to L4), no router-level fragmentation (performed only by sender), extension headers."
        ],
        "notesMarkdown": """# IPv4 vs. IPv6 Architecture

---

## 1. IPv4 Packet Fragmentation
When packet size exceeds a link's MTU and Don't Fragment bit $DF = 0$:
- **Identification:** Same ID across all fragments of a single datagram.
- **Flags:**
  - $DF = 1$: Do Not Fragment. (If packet > MTU, router drops packet and sends ICMP Destination Unreachable).
  - $MF = 1$: More Fragments follow ($MF = 0$ for final fragment).
- **Fragment Offset:** Byte offset of fragment payload divided by $8$ ($1$ offset unit = $8$ bytes).

---

## 2. IPv6 Key Features
- **128-bit Address Space:** Eliminates NAT requirement.
- **Fixed 40-Byte Header:** Speeds up router packet processing.
- **No In-Network Fragmentation:** Path MTU Discovery (PMTUD) used by sender.
- **No Header Checksum:** Eliminates checksum recalculation on TTL (Hop Limit) decrements.
""",
        "questions": [
            {
                "id": "cn-ip-1",
                "question": "In IPv4 packet fragmentation, what unit is used to measure the Fragment Offset field value?",
                "options": ["1-byte units", "4-byte words", "8-byte blocks", "64-byte chunks"],
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
            }
        ]
    },
    {
        "id": "cn-arp-dhcp-icmp-nat",
        "slug": "arp-dhcp-icmp-and-nat",
        "title": "ARP, DHCP, ICMP, and NAT",
        "description": "Address Resolution Protocol (ARP), Dynamic Host Configuration Protocol (DHCP DORA flow), Internet Control Message Protocol (ICMP ping/traceroute), and Network Address Translation (NAT/NAPT).",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Amazon", "Cisco", "Google", "Microsoft"],
        "keyTakeaways": [
            "ARP: Resolves 32-bit IP address to 48-bit MAC address. Request is Broadcast; Reply is Unicast.",
            "DHCP (DORA): Discover (broadcast) -> Offer (unicast/broadcast) -> Request (broadcast) -> Ack (unicast). Operates over UDP ports 67/68.",
            "ICMP: Network layer reporting (Type 8/0 Echo, Type 3 Destination Unreachable, Type 11 Time Exceeded for traceroute).",
            "NAT / PAT: Maps private IP addresses (RFC 1918) to public IP addresses using L4 port translation tables."
        ],
        "notesMarkdown": """# Supporting Network Protocols

---

## 1. Address Resolution Protocol (ARP)
- Maps known Network Layer IP $\\to$ Physical Layer MAC address.
- **ARP Request:** Broadcast (`FF:FF:FF:FF:FF:FF`) asking "Who has IP X.X.X.X?".
- **ARP Reply:** Unicast from owner node: "I have X.X.X.X, my MAC is Y".

---

## 2. DHCP (DORA Flow)
1. **Discover:** Client broadcasts to find DHCP servers (`255.255.255.255:67`).
2. **Offer:** Server offers IP configuration lease.
3. **Request:** Client accepts offered lease (broadcast to notify other servers).
4. **Acknowledge:** Server confirms lease terms and default gateway.

---

## 3. ICMP & Traceroute
- `ping`: ICMP Type 8 (Echo Request), ICMP Type 0 (Echo Reply).
- `traceroute`: Sends packets with increasing TTL ($1, 2, 3, \\dots$). Routers decrement TTL to $0$, drop packet, and return **ICMP Type 11 (Time Exceeded)**, revealing each hop IP.
""",
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
            }
        ]
    },
    {
        "id": "cn-tcp-and-udp",
        "slug": "tcp-and-udp",
        "title": "TCP and UDP",
        "description": "Transport layer roles, port numbers, UDP connectionless datagrams vs. TCP connection-oriented reliable byte-stream, 3-way handshake, 4-way teardown, and header comparisons.",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Google", "Amazon", "Meta", "Microsoft"],
        "keyTakeaways": [
            "UDP: 8-byte header, connectionless, unreliable, no flow/congestion control; ideal for VoIP, DNS, video streaming.",
            "TCP: 20-60 byte header, connection-oriented, full-duplex, reliable byte stream, ordered delivery.",
            "TCP Handshake: SYN -> SYN-ACK -> ACK.",
            "TCP Teardown: FIN -> ACK -> FIN -> ACK (TIME_WAIT state lasts 2 * MSL)."
        ],
        "notesMarkdown": """# Transport Layer: TCP vs. UDP

---

## 1. TCP vs. UDP Comparison
| Feature | TCP | UDP |
|---|---|---|
| **Connection** | Connection-oriented | Connectionless |
| **Reliability** | Guaranteed (ACKs + Retransmit) | Best-effort (No retransmissions) |
| **Ordering** | In-order delivery | Unordered |
| **Header Size** | 20 to 60 bytes | 8 bytes fixed |
| **Flow & Congestion Control**| Yes (Sliding window + AIMD) | None |
| **Use Cases** | Web (HTTP/HTTPS), SSH, FTP, Email | DNS, VoIP, Video Streaming, Gaming |

---

## 2. TCP State Transitions
- **3-Way Handshake:**
  1. Client $\\to$ Server: `SYN (seq=x)`
  2. Server $\\to$ Client: `SYN-ACK (seq=y, ack=x+1)`
  3. Client $\\to$ Server: `ACK (ack=y+1)`
- **TIME_WAIT State:**
  - Active closer waits $2 \\times \\text{MSL}$ (Maximum Segment Lifetime) before closing socket to ensure final ACK was received and drain stray segments.
""",
        "questions": [
            {
                "id": "cn-tu-1",
                "question": "Why does a TCP endpoint enter the TIME_WAIT state after sending its final ACK during connection teardown?",
                "options": [
                    "To wait for more incoming application data",
                    "To ensure the final ACK was received by the remote peer and allow delayed packets to drain from the network",
                    "To renegotiate the TCP window size",
                    "To flush the DNS resolver cache"
                ],
                "correct_option": 1,
                "explanation": "TIME_WAIT (lasting 2*MSL) ensures the remote peer received the final ACK and prevents packets from old connections colliding with new ones."
            },
            {
                "id": "cn-tu-2",
                "question": "What is the fixed header size of a User Datagram Protocol (UDP) packet?",
                "options": ["4 bytes", "8 bytes", "20 bytes", "40 bytes"],
                "correct_option": 1,
                "explanation": "UDP headers contain exactly four 2-byte fields (Source Port, Destination Port, Length, Checksum), totaling 8 bytes."
            }
        ]
    },
    {
        "id": "cn-congestion-control-and-flow-control",
        "slug": "congestion-control-and-flow-control",
        "title": "Congestion Control and Flow Control",
        "description": "Flow control vs Congestion control, TCP Tahoe vs Reno, Slow Start, Congestion Avoidance (AIMD), Fast Retransmit (3 duplicate ACKs), and Fast Recovery.",
        "estimatedMinutes": 25,
        "difficulty": "Hard",
        "companyTags": ["Google", "Amazon", "Cloudflare", "Microsoft"],
        "keyTakeaways": [
            "Flow Control: Prevents receiver buffer overflow using Advertised Window (rwnd).",
            "Congestion Control: Prevents network router buffer collapse using Congestion Window (cwnd).",
            "Sender Window = min(cwnd, rwnd).",
            "Slow Start: cwnd doubles every RTT (exponential growth) until ssthresh.",
            "Congestion Avoidance: AIMD (Additive Increase Multiplicative Decrease); cwnd += 1 MSS per RTT.",
            "3 Duplicate ACKs (TCP Reno): ssthresh = cwnd / 2; cwnd = ssthresh + 3 MSS (Fast Recovery)."
        ],
        "notesMarkdown": """# TCP Congestion Control

---

## 1. Flow Control vs. Congestion Control
- **Flow Control:** Receiver-driven. Uses `rwnd` in TCP header.
- **Congestion Control:** Network-driven. Maintained by sender via `cwnd`.
- **Transmission Limit:**
  $$W_{\\text{effective}} = \\min(\\text{cwnd}, \\text{rwnd})$$

---

## 2. TCP Congestion Control Phases
1. **Slow Start:**
   - Starts at $\\text{cwnd} = 1\\text{ MSS}$.
   - For every ACK received, $\\text{cwnd} += 1 \\implies$ doubles every RTT.
   - Continues until $\\text{cwnd} \\ge \\text{ssthresh}$.
2. **Congestion Avoidance (AIMD):**
   - Linear growth: $\\text{cwnd} += 1\\text{ MSS}$ per RTT.
3. **Loss Events:**
   - **Timeout (Severe congestion):** $\\text{ssthresh} = \\text{cwnd} / 2$, $\\text{cwnd} = 1\\text{ MSS}$, revert to Slow Start.
   - **3 Duplicate ACKs (Mild congestion - TCP Reno):** $\\text{ssthresh} = \\text{cwnd} / 2$, $\\text{cwnd} = \\text{ssthresh}$, enter Fast Recovery.
""",
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
                "options": ["Linearly (+1 MSS per RTT)", "Exponentially (doubles every RTT)", "Logarithmically", "It remains constant"],
                "correct_option": 1,
                "explanation": "In Slow Start, cwnd increases by 1 MSS for every acknowledged packet, effectively doubling cwnd each RTT."
            }
        ]
    },
    {
        "id": "cn-network-security-fundamentals",
        "slug": "network-security-fundamentals",
        "title": "Network Security Fundamentals",
        "description": "Symmetric vs Asymmetric cryptography (RSA, AES), Digital Signatures, Public Key Infrastructure (PKI / X.509 certificates), Firewalls (packet filtering, stateful, application proxy), and SSL/TLS.",
        "estimatedMinutes": 22,
        "difficulty": "Medium",
        "companyTags": ["Palo Alto Networks", "CrowdStrike", "Cloudflare", "Amazon"],
        "keyTakeaways": [
            "Symmetric Encryption (AES): Same secret key for encryption and decryption; high speed.",
            "Asymmetric Encryption (RSA, ECC): Public key encrypts, private key decrypts (or private key signs, public key verifies).",
            "Digital Signature: Hash of message encrypted with sender's private key; provides Authentication, Integrity, and Non-Repudiation.",
            "Stateful Firewall: Tracks TCP connection state (SYN, ESTABLISHED) across packets.",
            "TLS Handshake: Negotiates symmetric session key via asymmetric public-key cryptography."
        ],
        "notesMarkdown": """# Network Security Fundamentals

---

## 1. Cryptography Primitives
- **Symmetric Cryptography (AES, ChaCha20):** Shared secret key. Fast, bulk data encryption.
- **Asymmetric Cryptography (RSA, ECC/ECDSA):**
  - Public Key: Shared with world.
  - Private Key: Kept confidential by owner.
  - Encryption: Encrypt with Receiver's Public Key $\\implies$ only Receiver can decrypt.
  - Digital Signature: Encrypt hash with Sender's Private Key $\\implies$ anyone verifies with Public Key.

---

## 2. Firewall Architectures
1. **Packet-Filtering Firewall (Stateless - Layer 3/4):** Filters individual packets based on IP, port, and protocol without tracking connection state.
2. **Stateful Inspection Firewall:** Tracks TCP sequence numbers and connection state table. Allows return traffic only for established connections.
3. **Application Gateway (Proxy - Layer 7):** Inspects actual payload protocols (HTTP, FTP) for malicious commands.
""",
        "questions": [
            {
                "id": "cn-sec-1",
                "question": "A digital signature on a message is generated by encrypting the message digest (hash) with whose cryptographic key?",
                "options": ["Sender's Public Key", "Sender's Private Key", "Receiver's Public Key", "Receiver's Private Key"],
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
            }
        ]
    },
    {
        "id": "cn-performance-throughput-delay-bandwidth",
        "slug": "performance-throughput-delay-and-bandwidth",
        "title": "Performance: Throughput, Delay, and Bandwidth",
        "description": "Network performance metrics: Bandwidth-Delay Product (BDP), Transmission delay vs Propagation delay, Queuing delay, Processing delay, and Packet Loss.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Amazon", "Google", "Microsoft", "Meta"],
        "keyTakeaways": [
            "Total Delay = Transmission Delay (L/R) + Propagation Delay (d/s) + Queuing Delay + Processing Delay.",
            "Transmission Delay: Time to push all packet bits onto the link; depends on packet size and transmission rate.",
            "Propagation Delay: Time for 1 bit to travel across the physical medium; depends on physical distance and propagation speed.",
            "Bandwidth-Delay Product (BDP): BDP = Bandwidth * Round-Trip Time; defines maximum volume of in-flight data."
        ],
        "notesMarkdown": """# Network Performance Metrics

---

## 1. The 4 Components of Total Latency
$$\\text{Total Delay} = T_{\\text{trans}} + T_{\\text{prop}} + T_{\\text{queue}} + T_{\\text{proc}}$$

1. **Transmission Delay ($T_{\\text{trans}}$):**
   $$T_{\\text{trans}} = \\frac{L}{R} = \\frac{\\text{Packet Size (bits)}}{\\text{Transmission Rate (bps)}}$$
2. **Propagation Delay ($T_{\\text{prop}}$):**
   $$T_{\\text{prop}} = \\frac{d}{s} = \\frac{\\text{Distance (m)}}{\\text{Propagation Speed (m/s)}} \\quad (s \\approx 2 \\times 10^8\\text{ m/s in fiber})$$
3. **Queuing Delay ($T_{\\text{queue}}$):** Time waiting in router buffers. Depends on traffic intensity $\\frac{L \\cdot a}{R}$.
4. **Processing Delay ($T_{\\text{proc}}$):** Time router spends checking bit errors and reading routing table (typically microseconds).

---

## 2. Bandwidth-Delay Product (BDP)
$$\\text{BDP} = R \\times \\text{RTT}$$
Represents the maximum number of bits that can be "in flight" across the link pipe at any given instant. Determines optimal TCP receive window size.
""",
        "questions": [
            {
                "id": "cn-perf-1",
                "question": "A 1000-byte packet is transmitted over a 10 Mbps link across a distance of 2000 km (propagation speed 2 * 10^8 m/s). What is the Transmission Delay?",
                "options": ["0.8 ms", "8 ms", "10 ms", "1 ms"],
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
            }
        ]
    }
]

# Map the 17 requested topics:
# 1. Network Models: OSI and TCP/IP (merge 'osi-tcpip-model')
# 2. Physical Layer Fundamentals
# 3. Data Link Layer
# 4. Framing and Error Detection
# 5. CRC and Checksum
# 6. Flow Control and Error Control
# 7. MAC Protocols
# 8. Ethernet and Switching
# 9. IP Addressing and Subnetting (merge 'ip-subnetting')
# 10. IPv4 and IPv6
# 11. Routing Algorithms (merge 'routing-protocols')
# 12. ARP, DHCP, ICMP, and NAT
# 13. TCP and UDP (merge 'tcp-handshake')
# 14. Congestion Control and Flow Control
# 15. DNS, HTTP/HTTPS, FTP, SMTP, and Email (merge 'dns-resolution' & 'http-https-tls')
# 16. Network Security Fundamentals
# 17. Performance: Throughput, Delay, and Bandwidth

new_topics_by_id = {t["id"]: t for t in new_cn_topics}
final_cn_topics = []

# 1. Network Models: OSI and TCP/IP
t1 = existing_cn_topics.get("osi-tcpip-model")
if t1:
    t1_copy = dict(t1)
    t1_copy["title"] = "Network Models: OSI and TCP/IP"
    t1_copy["youtube_url"] = make_yt_url("OSI and TCP IP Network Models Architecture")
    final_cn_topics.append(t1_copy)
else:
    raise Exception("Missing existing osi-tcpip-model")

# 2. Physical Layer Fundamentals
final_cn_topics.append(new_topics_by_id["cn-physical-layer-fundamentals"])

# 3. Data Link Layer
final_cn_topics.append(new_topics_by_id["cn-data-link-layer"])

# 4. Framing and Error Detection
final_cn_topics.append(new_topics_by_id["cn-framing-and-error-detection"])

# 5. CRC and Checksum
final_cn_topics.append(new_topics_by_id["cn-crc-and-checksum"])

# 6. Flow Control and Error Control
final_cn_topics.append(new_topics_by_id["cn-flow-control-and-error-control"])

# 7. MAC Protocols
final_cn_topics.append(new_topics_by_id["cn-mac-protocols"])

# 8. Ethernet and Switching
final_cn_topics.append(new_topics_by_id["cn-ethernet-and-switching"])

# 9. IP Addressing and Subnetting
t9 = existing_cn_topics.get("ip-subnetting")
if t9:
    t9_copy = dict(t9)
    t9_copy["title"] = "IP Addressing and Subnetting"
    t9_copy["youtube_url"] = make_yt_url("IP Addressing and Subnetting CIDR Calculations")
    final_cn_topics.append(t9_copy)
else:
    raise Exception("Missing existing ip-subnetting")

# 10. IPv4 and IPv6
final_cn_topics.append(new_topics_by_id["cn-ipv4-and-ipv6"])

# 11. Routing Algorithms
t11 = existing_cn_topics.get("routing-protocols")
if t11:
    t11_copy = dict(t11)
    t11_copy["title"] = "Routing Algorithms"
    t11_copy["youtube_url"] = make_yt_url("Routing Algorithms Distance Vector Link State OSPF BGP")
    final_cn_topics.append(t11_copy)
else:
    raise Exception("Missing existing routing-protocols")

# 12. ARP, DHCP, ICMP, and NAT
final_cn_topics.append(new_topics_by_id["cn-arp-dhcp-icmp-nat"])

# 13. TCP and UDP
t13 = existing_cn_topics.get("tcp-handshake")
if t13:
    t13_copy = dict(t13)
    t13_copy["title"] = "TCP and UDP"
    t13_copy["youtube_url"] = make_yt_url("TCP and UDP Protocols Handshake Transport Layer")
    final_cn_topics.append(t13_copy)
else:
    final_cn_topics.append(new_topics_by_id["cn-tcp-and-udp"])

# 14. Congestion Control and Flow Control
final_cn_topics.append(new_topics_by_id["cn-congestion-control-and-flow-control"])

# 15. DNS, HTTP/HTTPS, FTP, SMTP, and Email
t15 = existing_cn_topics.get("http-https-tls")
if t15:
    t15_copy = dict(t15)
    t15_copy["title"] = "DNS, HTTP/HTTPS, FTP, SMTP, and Email"
    t15_copy["youtube_url"] = make_yt_url("DNS HTTP HTTPS FTP SMTP Application Layer Protocols")
    final_cn_topics.append(t15_copy)
else:
    raise Exception("Missing existing http-https-tls")

# Also add DNS resolution as an explicit topic if desired, or keep as topic 18 so no data is lost!
t_dns = existing_cn_topics.get("dns-resolution")
if t_dns:
    t_dns_copy = dict(t_dns)
    t_dns_copy["youtube_url"] = make_yt_url("DNS Resolution Flow Hierarchy Computer Networks")
    final_cn_topics.append(t_dns_copy)

# 16. Network Security Fundamentals
final_cn_topics.append(new_topics_by_id["cn-network-security-fundamentals"])

# 17. Performance: Throughput, Delay, and Bandwidth
final_cn_topics.append(new_topics_by_id["cn-performance-throughput-delay-bandwidth"])

# Ensure youtube_url
for t in final_cn_topics:
    if "youtube_url" not in t or not t["youtube_url"]:
        t["youtube_url"] = make_yt_url(t["title"])

category = {
    "id": "cn",
    "slug": "computer-networks",
    "title": "Computer Networks (CN)",
    "description": "OSI and TCP/IP, physical layer, data link framing, sliding windows, routing, TCP/UDP, DNS/HTTP, and security.",
    "icon": "Network",
    "topics": final_cn_topics
}

ts_content = f"""import type {{ SectionCategory }} from './types';

export const COMPUTER_NETWORKS_CATEGORY: SectionCategory = {json.dumps(category, indent=2)};
"""

with open("src/lib/data/curriculum/computer-networks.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated Computer Networks module with {len(final_cn_topics)} topics successfully!")
