import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { createClient } from '@/lib/supabase/server';
import { sanitizeText, verifyCsrfOrigin } from '@/lib/security/sanitize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function generateLocalAiResponse(query: string, context?: string): string {
  const q = query.toLowerCase();

  if (q.includes('two sum') || q.includes('two pointer') || q.includes('pointer')) {
    return `### Two Pointers & Hash Map Strategy
For **Two Sum**:
1. **Hash Map Approach**: Store visited elements in a map \`{ complement: index }\`. As you traverse, check if \`target - current\` is in the map. Runs in **O(n) time** and **O(n) space**.
2. **Two Pointers Approach**: Requires a sorted array. Place pointer \`L = 0\` and \`R = n - 1\`. If \`arr[L] + arr[R] > target\`, decrement \`R\`; if smaller, increment \`L\`. Runs in **O(n log n)** (for sorting) and **O(1) space**.

*Interview Tip:* Always ask the interviewer whether the array is pre-sorted or if modifying indices is permitted!`;
  }

  if (q.includes('process') || q.includes('thread') || q.includes('os') || q.includes('deadlock')) {
    return `### Process vs Thread (Core OS Concept)
- **Process**: An executing program with its own dedicated memory space (Code, Data, Heap, Stack). Context switching between processes has high overhead (PCB update, TLB flush).
- **Thread**: A lightweight unit of execution within a process. Threads of the same process share Code, Data, and Heap, but have private Stacks and Program Counters (PC).

**Deadlock (4 Necessary Conditions - Coffman Conditions):**
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait`;
  }

  if (q.includes('acid') || q.includes('dbms') || q.includes('normaliz') || q.includes('index') || q.includes('b-tree')) {
    return `### ACID Properties in DBMS
- **Atomicity**: "All or nothing" execution of transactions (managed via undo logs/WAL).
- **Consistency**: The database transitions from one valid state to another satisfying all integrity constraints.
- **Isolation**: Concurrent transactions execute without interfering with one another (Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable).
- **Durability**: Committed changes persist even after system crashes (managed via redo logs).`;
  }

  if (q.includes('resume') || q.includes('ats') || q.includes('star') || q.includes('bullet')) {
    return `### Crafting High-Impact ATS Resume Bullets (STAR Method)
Structure your experience bullets using:
**[Strong Action Verb] + [Context & Technical Stack] + [Quantified Business Metric / Outcome]**

**Example Transformation:**
- *Weak:* "Created backend APIs and worked with database."
- *ATS-Optimized:* "Architected RESTful microservices in Node.js & TypeScript, indexing PostgreSQL tables to cut p95 latency by 44% across 250,000 daily requests."

*Key Rule:* Avoid 2-column tables or non-standard fonts that confuse older ATS parsers!`;
  }

  if (q.includes('dynamic programming') || q.includes(' dp') || q.includes('memoiz') || q.includes('tabulat') || q.includes('knapsack')) {
    return `### Dynamic Programming (DP) Interview Framework
DP solves problems exhibiting **Overlapping Subproblems** and **Optimal Substructure**:

1. **Top-Down with Memoization:**
   - Write natural recursive formulation; cache state in a hash table or array.
   - *Pros:* Only computes states that are actually reached.
2. **Bottom-Up with Tabulation:**
   - Iteratively fill a DP table from base cases up to the target answer.
   - *Pros:* Eliminates recursion call stack overhead; enables **Space Optimization** (e.g. keeping only previous row or previous 2 variables).

**Standard DP Patterns to Master:**
- **0/1 Knapsack & Subset Sum:** Pick vs Skip choice.
- **Longest Common Subsequence (LCS):** 2-string character matching matrix.
- **Coin Change / Unbounded Knapsack:** Reusing items with unbounded counts.
- **Interval DP / Matrix Chain:** Splitting ranges at index \`k\`.`;
  }

  if (q.includes('graph') || q.includes('bfs') || q.includes('dfs') || q.includes('dijkstra') || q.includes('tree')) {
    return `### Graph & Tree Traversal Cheat-Sheet
- **Breadth-First Search (BFS):**
  - Uses a **Queue (FIFO)**. Traverses level by level.
  - Guaranteed to find the **Shortest Path** in unweighted graphs. Time: \`O(V + E)\`, Space: \`O(V)\`.
- **Depth-First Search (DFS):**
  - Uses a **Stack (LIFO)** or recursion. Explores deeply before backtracking.
  - Ideal for: Cycle detection, Topological Sorting, Path finding, Connected components.
- **Dijkstra's Shortest Path:**
  - Uses a **Min-Heap (Priority Queue)**. Greedy relaxation of edges.
  - Runs in \`O((V + E) log V)\`. **Requirement:** Edge weights must be non-negative! (Use Bellman-Ford if negative weights exist).
- **BST In-Order Traversal:**
  - Left -> Root -> Right yields elements in **strictly sorted ascending order**.`;
  }

  if (q.includes('solid') || q.includes('oop') || q.includes('polymorphism') || q.includes('inheritance')) {
    return `### SOLID Principles & OOP Fundamentals
1. **Single Responsibility (SRP):** A class should have only one reason to change.
2. **Open/Closed (OCP):** Software entities should be open for extension, but closed for modification.
3. **Liskov Substitution (LSP):** Subtypes must be substitutable for their base types without breaking program correctness.
4. **Interface Segregation (ISP):** Clients should not be forced to depend on interfaces they do not use (prefer small, role-specific interfaces).
5. **Dependency Inversion (DIP):** Depend on abstractions (interfaces), not on concrete implementations.

**The 4 Pillars of OOP:** Encapsulation (data hiding), Abstraction (hiding complexity), Inheritance (code reuse), Polymorphism (compile-time overloading & runtime overriding).`;
  }

  if (q.includes('join') || q.includes('inner join') || q.includes('left join') || q.includes('sql query')) {
    return `### SQL Joins Visual Summary
- **INNER JOIN:** Returns records that have matching values in both tables.
- **LEFT (OUTER) JOIN:** Returns all rows from the left table, and matching rows from the right table (NULL when no match exists).
- **RIGHT (OUTER) JOIN:** Returns all rows from the right table, and matching rows from the left table.
- **FULL OUTER JOIN:** Returns all records when there is a match in either left or right table.
- **CROSS JOIN:** Cartesian product of all rows from table A and table B (Size = $|A| \\times |B|$).

*Performance Pro-Tip:* Ensure foreign key columns used in \`ON a.id = b.a_id\` have database indexes to avoid full table sequential scans!`;
  }

  if (q.includes('tcp') || q.includes('udp') || q.includes('handshake') || q.includes('osi') || q.includes('dns')) {
    return `### TCP 3-Way Handshake
1. **SYN**: Client sends a SYN segment with Initial Sequence Number (ISN).
2. **SYN-ACK**: Server acknowledges with ACK = Client ISN + 1 and sends its own SYN with Server ISN.
3. **ACK**: Client acknowledges with ACK = Server ISN + 1. Connection is now \`ESTABLISHED\`.

**TCP vs UDP:**
- TCP is connection-oriented, reliable, and guarantees order via flow & congestion control.
- UDP is connectionless, low latency, ideal for real-time gaming and VoIP streaming.`;
  }

  return `### StackUp Prep Assistant
Hello! I am your AI interview preparation guide.

${context ? `*Active context:* **${context}**\n\n` : ''}I can help you with:
1. **Algorithmic Intuition & DSA**: Two Pointers, Sliding Window, Binary Search, Graphs, Dynamic Programming.
2. **Core CS Fundamentals**: OS Process/Thread management, DBMS ACID & Normalization, Computer Networks TCP/IP.
3. **Quantitative Aptitude**: Permutations & Combinations, Probability, Time & Work shortcuts.
4. **ATS Resume Optimization**: STAR-format bullet rewrites and tech keyword recommendations.

Feel free to ask a specific concept question, ask for code in Python/C++/Java/TypeScript, or paste a resume bullet point to rewrite!`;
}

export async function POST(req: NextRequest) {
  try {
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request rejected.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`chat-${ip}`, 30, 60 * 1000); // 30 req/min
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Chat rate limit reached. Please wait ${rateCheck.resetInSeconds}s before sending another message.` },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawMessage = typeof body?.message === 'string' ? body.message : '';
    const message = sanitizeText(rawMessage, 2000);
    const sectionContext = sanitizeText(body?.sectionContext, 100) || undefined;
    const rawHistory = Array.isArray(body?.history) ? body.history : [];

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message content cannot be empty.' }, { status: 400 });
    }

    // Sanitize and constrain history
    const history: ChatMessage[] = rawHistory.slice(-6).map((m: unknown) => {
      const item = (typeof m === 'object' && m !== null ? m : {}) as Record<string, unknown>;
      return {
        role: item.role === 'assistant' ? 'assistant' : 'user',
        content: sanitizeText(item.content, 1000),
      };
    });

    let reply = '';
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

    if (anthropicApiKey && anthropicApiKey.startsWith('sk-ant-')) {
      try {
        const formattedMessages = history.map((m) => ({
          role: m.role,
          content: m.content,
        }));
        formattedMessages.push({ role: 'user', content: message });

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicApiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            system: `You are StackUp AI, an intelligent, concise, and expert technical interview preparation assistant. You coach students preparing for tech software engineering placements. The student is currently studying: ${sectionContext || 'General Tech Prep'}. Keep answers structured with markdown headings, bullet points, and code snippets when requested.`,
            messages: formattedMessages,
          }),
        });

        if (response.ok) {
          const aiJson = await response.json();
          reply = aiJson.content?.[0]?.text || '';
        } else {
          reply = generateLocalAiResponse(message, sectionContext);
        }
      } catch {
        reply = generateLocalAiResponse(message, sectionContext);
      }
    } else {
      reply = generateLocalAiResponse(message, sectionContext);
    }

    // Optional: Log message to Supabase chat_messages table if authenticated
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase.from('chat_messages') as unknown as {
          insert: (data: { user_id: string; role: string; content: string }) => Promise<unknown>;
        }).insert({
          user_id: user.id,
          role: 'user',
          content: message,
        });
      }
    } catch {
      // ignore
    }

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error('Chat endpoint failed with unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your message. Please try again later.' },
      { status: 500 }
    );
  }
}
