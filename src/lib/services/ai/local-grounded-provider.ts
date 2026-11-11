import type {
  AIProvider,
  AIRequest,
  AIResponse,
  AIStreamChunk,
  GroundedSource,
} from './types';

export class LocalGroundedProvider implements AIProvider {
  readonly id = 'local' as const;
  readonly name = 'StackUp Grounded AI';

  isConfigured(): boolean {
    return true; // Always available as reliable offline fallback
  }

  async generateResponse(
    request: AIRequest,
    _systemPrompt: string,
    sources: GroundedSource[]
  ): Promise<AIResponse> {
    const startTime = Date.now();
    const reply = this.synthesizeGroundedResponse(request, sources);
    const latencyMs = Date.now() - startTime;

    return {
      reply,
      provider: 'local',
      model: 'stackup-grounded-v1',
      latencyMs,
      sources,
      isFallback: true,
      tokenUsage: {
        promptTokens: Math.ceil((request.message.length + 500) / 4),
        completionTokens: Math.ceil(reply.length / 4),
        totalTokens: Math.ceil((request.message.length + 500 + reply.length) / 4),
      },
    };
  }

  async *generateStream(
    request: AIRequest,
    systemPrompt: string,
    sources: GroundedSource[]
  ): AsyncIterable<AIStreamChunk> {
    const response = await this.generateResponse(request, systemPrompt, sources);
    const words = response.reply.split(' ');

    // Simulate realistic typing cadence in chunk batches
    for (let i = 0; i < words.length; i += 4) {
      const slice = words.slice(i, i + 4).join(' ') + (i + 4 < words.length ? ' ' : '');
      yield { delta: slice, done: false };
      await new Promise((res) => setTimeout(res, 20));
    }

    yield {
      delta: '',
      done: true,
      metadata: response,
    };
  }

  private synthesizeGroundedResponse(request: AIRequest, sources: GroundedSource[]): string {
    const q = request.message.toLowerCase();
    const personal = request.personalization;

    // 1. Check for student personalization queries (mistakes, revisions, weak areas)
    if (q.includes('weak') || q.includes('mistake') || q.includes('revise') || q.includes('schedule') || q.includes('progress')) {
      if (personal && (personal.weakTopics?.length || personal.dueRevisionsCount || personal.activeMistakesCount)) {
        return `### Personalized Learning Intelligence Plan

Based on your active learning history on StackUp:

${personal.weakTopics && personal.weakTopics.length > 0 ? `#### Identified Weak Topics Needing Attention:\n${personal.weakTopics.map((t) => `- **${t}**`).join('\n')}\n` : ''}
${personal.dueRevisionsCount ? `#### Spaced Repetition Due Today:\n- You have **${personal.dueRevisionsCount} item(s)** scheduled for active recall review.\n` : ''}
${personal.overdueRevisionsCount ? `#### Overdue Reviews:\n- ⚠️ **${personal.overdueRevisionsCount} item(s)** are currently overdue in your SM-2 queue. Prioritize reviewing these first to prevent knowledge decay.\n` : ''}
${personal.recentlyFailedProblems && personal.recentlyFailedProblems.length > 0 ? `#### Recent Mistake Journal Entries:\n${personal.recentlyFailedProblems.map((p) => `- ${p}`).join('\n')}\n` : ''}

**Recommended Action:** Head to your [Profile Dashboard](/profile) to review your active flashcards and tackle a targeted practice set!`;
      }
    }

    // 2. If high-relevance StackUp sources were retrieved, ground the answer in them
    if (sources.length > 0) {
      const primary = sources[0];

      // A. DSA Problem match
      if (primary.category.startsWith('DSA')) {
        return `### ${primary.title} (${primary.difficulty} | ${primary.category})

${primary.snippet}

#### Algorithmic Strategy & Step-by-Step Breakdown:
1. **Identify the Core Invariant:** Understand what properties remain constant across iterations (e.g. window boundaries, sorted order, heap property).
2. **Handle Constraints & Edge Cases:**
   - Empty or single-element inputs.
   - Duplicate values or negative numbers.
   - Boundaries causing integer overflow or index out-of-bounds.
3. **Complexity Trade-Offs:**
   - Always optimize time complexity first before minimizing auxiliary space.

*Practice this problem on StackUp:* [Open Workspace](${primary.url})`;
      }

      // B. Core CS Curriculum match
      if (primary.category.includes('Core CS') || primary.category.includes('Operating Systems') || primary.category.includes('DBMS') || primary.category.includes('Computer Networks')) {
        return `### ${primary.title} (${primary.category})

${primary.snippet}

#### Technical Deep-Dive & Interview Concepts:
- **Core Mechanism:** Grounded in StackUp's verified curriculum. Ensure you understand both the theoretical definition and the system trade-offs.
- **Common Interview Trap:** Pay attention to edge conditions (e.g. deadlock Coffman conditions, ACID failure recovery with WAL, TCP state transition timeouts).
- **Curriculum Reference:** Explore the complete interactive notes and quiz questions in [Core CS Curriculum](${primary.url}).`;
      }

      // C. Aptitude match
      if (primary.category.includes('Aptitude')) {
        return `### ${primary.title} (${primary.category})

${primary.snippet}

#### Fast Problem-Solving Framework:
1. **Identify Variables & Formulas:** State standard formulas before substituting numbers.
2. **Speed Tip:** Look for cancellation shortcuts or ratio methods rather than lengthy brute-force arithmetic.
3. **Practice Module:** Test your speed with timed quiz questions in [Aptitude Hub](${primary.url}).`;
      }

      // D. ATS Resume match
      if (primary.category.includes('ATS')) {
        return `### ${primary.title}

${primary.snippet}

#### High-Impact Transformation Example:
- **Before:** "Worked on frontend and fixed some bugs."
- **After (STAR Format):** "Engineered responsive Next.js and TypeScript client interfaces, refactoring state management to reduce re-renders by 38% and improve Core Web Vitals across 50,000 active sessions."

*Try your resume with the automated scorer:* [Open ATS Resume Checker](/resume-checker)`;
      }
    }

    // 3. Fallback educational overview when no exact match exists
    return `### StackUp Educational Guidance

I am your technical interview coach and computer science tutor on StackUp.

#### How I Can Help You:
1. **Data Structures & Algorithms (DSA):** Explain optimal approaches, time & space complexity ($O(n)$, $O(\log n)$), and code patterns across our 150 curated problems.
2. **Core CS Subjects:** Deep dives into Operating Systems (threads, paging, locks), DBMS (ACID, indexing, normal forms), Computer Networks (TCP/IP, HTTP/3), and System Design.
3. **Aptitude & Screening:** Quick formulas for quantitative reasoning, time & work, probability, and logical puzzles.
4. **ATS Resume Optimization:** Rewrite bullets using the STAR method with measurable metrics.

*Tip:* Ask a specific question like *"How do I approach Two Sum?"*, *"Explain ACID properties"*, or *"What are my weak topics?"* to receive detailed step-by-step coaching!`;
  }
}
