import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/services/rate-limit';
import { createClient } from '@/lib/supabase/server';
import { sanitizeText, verifyCsrfOrigin } from '@/lib/security/sanitize';
import { authenticateUserRequest } from '@/lib/auth/server-auth';
import {
  generateAIResponse,
  generateAIStream,
  getAIProviderInfo,
  retrieveRelevantKnowledge,
  type ChatMessage,
} from '@/lib/services/ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Backward-compatible educational response generator for offline and unit test verification.
 */
export function generateLocalAiResponse(query: string, context?: string): string {
  const q = query.toLowerCase();

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

  // General CS interview topics / syllabus queries
  if (/\b(cs topics?|most asked|interview topics?|core cs|subjects?)\b/i.test(q)) {
    return `### Most Asked Computer Science Topics in Tech Interviews

When preparing for technical interviews, candidates are primarily evaluated across these core pillars:

1. **Data Structures & Algorithms (DSA):**
   - **High Frequency:** Arrays, Two Pointers, Sliding Window, Hash Maps, Trees & Binary Search Trees, Graphs (BFS/DFS), Dynamic Programming.
   - **Key Focus:** Optimal time/space Big-O bounds and handling edge cases.

2. **Operating Systems (OS):**
   - **Core Concepts:** Process vs. Thread, Context Switching, CPU Scheduling, Virtual Memory & Paging, Deadlocks (Coffman Conditions), Race Conditions & Mutexes/Semaphores.

3. **Database Management Systems (DBMS):**
   - **Core Concepts:** ACID Properties, SQL Joins & Aggregations, Indexing (B-Trees / LSM Trees), Transactions & Isolation Levels, Normalization (1NF–BCNF), Sharding vs. Replication.

4. **Computer Networks (CN):**
   - **Core Concepts:** TCP 3-Way Handshake vs UDP, OSI and TCP/IP Models, DNS Resolution, HTTP/HTTPS Protocols & Status Codes, WebSockets vs REST.

5. **Object-Oriented Programming (OOP) & System Design:**
   - **Core Concepts:** 4 Pillars (Encapsulation, Abstraction, Inheritance, Polymorphism), SOLID Principles, High-Level Architecture (Load Balancers, Caching, CDN, Microservices).

*Explore the full syllabus and quizzes across all 221 topics in [StackUp Core CS](/core-cs).*`;
  }

  if (/\b(two sum|two pointers?)\b/i.test(q)) {
    return `### Two Pointers & Hash Map Strategy
For **Two Sum**:
1. **Hash Map Approach**: Store visited elements in a map \`{ complement: index }\`. As you traverse, check if \`target - current\` is in the map. Runs in **O(n) time** and **O(n) space**.
2. **Two Pointers Approach**: Requires a sorted array. Place pointer \`L = 0\` and \`R = n - 1\`. If \`arr[L] + arr[R] > target\`, decrement \`R\`; if smaller, increment \`L\`. Runs in **O(n log n)** (for sorting) and **O(1) space**.

*Interview Tip:* Always ask the interviewer whether the array is pre-sorted or if modifying indices is permitted!`;
  }

  if (/\b(process|thread|deadlocks?|operating systems?|coffman)\b/i.test(q) || /\bos\b/i.test(q)) {
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

  // Dynamic RAG retrieval for queries beyond the standard 9 keywords
  const sources = retrieveRelevantKnowledge(query, context, 2);
  if (sources.length > 0) {
    const src = sources[0];
    return `### ${src.title} (${src.category})

${src.snippet}

*Related Practice:* Explore this topic in [StackUp Resources](${src.url || '/dsa'}).`;
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

/**
 * Health check & telemetry endpoint reporting active AI provider status.
 */
export async function GET() {
  const info = getAIProviderInfo();
  return NextResponse.json(info);
}

/**
 * Main chat handler supporting both streaming (SSE) and JSON responses.
 */
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
    const message = sanitizeText(rawMessage, 4000);
    const sectionContext = sanitizeText(body?.sectionContext, 100) || undefined;
    const rawHistory = Array.isArray(body?.history) ? body.history : [];
    const wantsStream = body?.stream === true || req.headers.get('accept')?.includes('text/event-stream');

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message content cannot be empty.' }, { status: 400 });
    }

    // Authenticate user session to personalize learning intelligence if signed in
    const auth = await authenticateUserRequest(req);
    const userId = auth.user?.id;

    // Sanitize and format history
    const history: ChatMessage[] = rawHistory.map((m: unknown) => {
      const item = (typeof m === 'object' && m !== null ? m : {}) as Record<string, unknown>;
      return {
        role: item.role === 'assistant' ? 'assistant' : 'user',
        content: sanitizeText(item.content, 2000),
      };
    });

    const aiRequest = {
      message,
      history,
      sectionContext,
      userId,
      providerOverride: body?.provider,
      modelOverride: body?.model,
    };

    // 1. Streaming response (Server-Sent Events)
    if (wantsStream) {
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          try {
            for await (const chunk of generateAIStream(aiRequest)) {
              const data = JSON.stringify(chunk);
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Streaming error occurred.';
            const errData = JSON.stringify({ error: errorMsg, done: true });
            controller.enqueue(encoder.encode(`data: ${errData}\n\n`));
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
    }

    // 2. Standard JSON response
    const response = await generateAIResponse(aiRequest);

    // Optional: Log message to Supabase chat_messages table if authenticated
    try {
      if (userId) {
        const supabase = await createClient();
        await (supabase.from('chat_messages') as unknown as {
          insert: (data: { user_id: string; role: string; content: string }) => Promise<unknown>;
        }).insert({
          user_id: userId,
          role: 'user',
          content: message,
        });
      }
    } catch {
      // ignore logging failures
    }

    return NextResponse.json({
      reply: response.reply,
      metadata: {
        provider: response.provider,
        model: response.model,
        latencyMs: response.latencyMs,
        tokenUsage: response.tokenUsage,
        sources: response.sources.map((s) => ({ title: s.title, category: s.category, url: s.url })),
        isFallback: response.isFallback,
        error: response.error,
      },
    });
  } catch (err: unknown) {
    console.error('Chat endpoint failed with unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your message. Please try again later.' },
      { status: 500 }
    );
  }
}
