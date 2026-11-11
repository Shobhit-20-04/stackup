import { DSA_PROBLEMS } from '@/lib/data/dsa';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';
import type { Topic, SectionCategory } from '@/lib/data/curriculum/types';
import { getLearningIntelligenceSummary } from '@/lib/services/learning-intelligence/intelligence-engine';
import type { GroundedSource, UserPersonalizationContext } from './types';

// Common technical stop words to ignore during tokenization
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'what', 'how', 'why', 'when',
  'where', 'which', 'who', 'whom', 'can', 'could', 'should', 'would', 'do',
  'does', 'did', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about',
  'and', 'or', 'but', 'if', 'then', 'else', 'explain', 'tell', 'me', 'give',
  'show', 'please', 'help', 'code', 'write', 'solution', 'approach'
]);

function tokenizeQuery(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#_ -]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Searches StackUp's 150 verified DSA problems for matches against the candidate query.
 */
function searchDsaProblems(query: string, tokens: string[]): GroundedSource[] {
  const qLower = query.toLowerCase().trim();
  const results: GroundedSource[] = [];

  for (const prob of DSA_PROBLEMS) {
    const titleLower = prob.title.toLowerCase();
    const patternLower = prob.pattern_tag.toLowerCase();
    const summaryLower = prob.summary.toLowerCase();
    let score = 0;

    // Exact title match or title contained in query
    if (qLower.includes(titleLower) || titleLower.includes(qLower)) {
      score += 50;
    }

    // Pattern tag match
    if (qLower.includes(patternLower)) {
      score += 25;
    }

    // Token overlap
    for (const token of tokens) {
      if (titleLower.includes(token)) score += 15;
      if (patternLower.includes(token)) score += 10;
      if (summaryLower.includes(token)) score += 4;
      if (prob.companies.some((c) => c.toLowerCase().includes(token))) score += 5;
    }

    if (score >= 10) {
      const snippet = [
        `**Problem:** ${prob.title} (${prob.difficulty} | Pattern: ${prob.pattern_tag})`,
        `**Summary:** ${prob.summary}`,
        `**Optimal Approach:** ${prob.approach}`,
        `**Complexity:** Time: ${prob.timeComplexity} | Space: ${prob.spaceComplexity}`,
        prob.constraints.length > 0 ? `**Constraints:** ${prob.constraints.slice(0, 3).join('; ')}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      results.push({
        title: prob.title,
        category: `DSA: ${prob.pattern_tag}`,
        snippet,
        url: `/dsa/${prob.id}`,
        difficulty: prob.difficulty,
        relevanceScore: score,
      });
    }
  }

  return results;
}

/**
 * Searches StackUp's 221 Core CS & Aptitude curriculum topics.
 */
function searchCurriculumTopics(
  query: string,
  tokens: string[],
  sectionFilter?: 'core-cs' | 'aptitude'
): GroundedSource[] {
  const qLower = query.toLowerCase().trim();
  const results: GroundedSource[] = [];

  const sectionsToSearch = sectionFilter
    ? [CURRICULUM_DATA[sectionFilter]].filter(Boolean)
    : Object.values(CURRICULUM_DATA);

  for (const sec of sectionsToSearch) {
    if (!sec || !sec.categories) continue;

    for (const cat of sec.categories as SectionCategory[]) {
      const catTitleLower = cat.title.toLowerCase();

      for (const topic of cat.topics as Topic[]) {
        const topicTitleLower = topic.title.toLowerCase();
        const descLower = topic.description.toLowerCase();
        let score = 0;

        // Exact match or multi-word title match
        if (qLower.includes(topicTitleLower) || topicTitleLower.includes(qLower)) {
          score += 45;
        }

        const topicWords = topicTitleLower.split(/[^a-z0-9]/).filter((w) => w.length > 2 && !STOP_WORDS.has(w));
        const matchedTitleWords = topicWords.filter((tw) => qLower.includes(tw));
        if (matchedTitleWords.length >= 2) {
          score += 40;
        }

        if (qLower.includes(catTitleLower)) {
          score += 15;
        }

        // Token overlap
        for (const token of tokens) {
          if (topicTitleLower.includes(token)) score += 12;
          if (descLower.includes(token)) score += 4;
          if (catTitleLower.includes(token)) score += 6;
          if (topic.keyTakeaways?.some((k) => k.toLowerCase().includes(token))) score += 5;
        }

        if (score >= 10) {
          // Extract a concise notes excerpt (first 350 characters of substantive content)
          const notesClean = topic.notesMarkdown
            ? topic.notesMarkdown.replace(/#+\s+/g, '').replace(/\n+/g, ' ').slice(0, 400).trim() + '...'
            : '';

          const snippet = [
            `**Subject:** ${cat.title} > **Topic:** ${topic.title} (${topic.difficulty || 'Intermediate'})`,
            `**Description:** ${topic.description}`,
            topic.keyTakeaways && topic.keyTakeaways.length > 0
              ? `**Key Takeaways:** ${topic.keyTakeaways.slice(0, 3).join('; ')}`
              : '',
            notesClean ? `**Notes Excerpt:** ${notesClean}` : '',
          ]
            .filter(Boolean)
            .join('\n');

          results.push({
            title: topic.title,
            category: `${sec.name}: ${cat.title}`,
            snippet,
            url: `/${sec.slug}#${topic.slug}`,
            difficulty: topic.difficulty,
            relevanceScore: score,
          });
        }
      }
    }
  }

  return results;
}

/**
 * Searches ATS resume guidelines when resume queries are detected.
 */
function searchAtsGuidelines(query: string): GroundedSource[] {
  const qLower = query.toLowerCase();
  const atsTerms = ['resume', 'ats', 'cv', 'star method', 'bullet', 'quantify', 'action verb', 'formatting'];

  if (atsTerms.some((t) => qLower.includes(t))) {
    return [
      {
        title: 'StackUp ATS Resume Engineering Framework',
        category: 'Career & ATS Checker',
        snippet: [
          '**STAR Method Structure:** [Strong Action Verb] + [Context & Tech Stack] + [Quantified Metric / Business Outcome]',
          '**Quantification Rules:** Always state baseline vs result (e.g. "cut p95 API latency by 44% across 250k daily requests", "scaled Postgres read replicas to 99.99% uptime").',
          '**ATS Formatting Rules:** Use clean single-column PDF, standard fonts, clear section headers (Education, Experience, Projects, Skills), avoid tables/icons/graphics.',
          '**Technical Ontology:** Group skills by category: Languages, Frameworks, Cloud & DevOps, Databases, Tools.'
        ].join('\n'),
        url: '/resume-checker',
        relevanceScore: 40,
      },
    ];
  }

  return [];
}

/**
 * Retrieves the most relevant knowledge sources from StackUp's educational repository.
 */
export function retrieveRelevantKnowledge(
  query: string,
  sectionContext?: string,
  limit = 3
): GroundedSource[] {
  const tokens = tokenizeQuery(query);

  let sectionFilter: 'core-cs' | 'aptitude' | undefined = undefined;
  if (sectionContext?.toLowerCase().includes('core cs')) sectionFilter = 'core-cs';
  if (sectionContext?.toLowerCase().includes('aptitude')) sectionFilter = 'aptitude';

  const dsaMatches = sectionFilter === 'aptitude' ? [] : searchDsaProblems(query, tokens);
  const curriculumMatches = searchCurriculumTopics(query, tokens, sectionFilter);
  const atsMatches = (sectionFilter === 'aptitude' || sectionFilter === 'core-cs') ? [] : searchAtsGuidelines(query);

  if (sectionFilter === 'aptitude') {
    for (const m of curriculumMatches) {
      if (m.category.includes('Aptitude')) {
        m.relevanceScore += 35;
      }
    }
  } else if (sectionFilter === 'core-cs') {
    for (const m of curriculumMatches) {
      if (m.category.includes('Core CS')) {
        m.relevanceScore += 25;
      }
    }
  }

  const combined = [...dsaMatches, ...curriculumMatches, ...atsMatches];

  // Sort descending by relevance score
  combined.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Deduplicate by title
  const seen = new Set<string>();
  const deduped: GroundedSource[] = [];

  for (const item of combined) {
    if (!seen.has(item.title)) {
      seen.add(item.title);
      deduped.push(item);
    }
    if (deduped.length >= limit) break;
  }

  return deduped;
}

/**
 * Retrieves personalized student learning history if authenticated.
 */
export function retrievePersonalizedLearningContext(
  userId?: string
): UserPersonalizationContext | null {
  if (!userId) return null;

  try {
    const summary = getLearningIntelligenceSummary();
    if (!summary) return null;

    const weakTopicsList = summary.weakTopics
      .filter((w) => w.status === 'needs_attention' || w.status === 'revisit_recommended')
      .map((w) => `${w.topicName} (${w.failureCount} mistake${w.failureCount > 1 ? 's' : ''})`);

    const overdueCount = summary.overdueRevisions.length;
    const dueCount = summary.dueRevisions.length;
    const activeMistakesCount = summary.recentMistakes.filter((m) => !m.isResolved).length;

    const recentFailed = summary.recentMistakes
      .filter((m) => m.module === 'dsa')
      .slice(0, 3)
      .map((m) => m.resourceTitle);

    return {
      userId,
      activeMistakesCount,
      weakTopics: weakTopicsList,
      dueRevisionsCount: dueCount,
      overdueRevisionsCount: overdueCount,
      recentlyFailedProblems: recentFailed,
    };
  } catch {
    return null;
  }
}

/**
 * Formats retrieved sources and personal context into a clean prompt block.
 */
export function formatGroundedContext(
  sources: GroundedSource[],
  personalization?: UserPersonalizationContext | null
): string {
  const parts: string[] = [];

  if (personalization) {
    parts.push('=== STUDENT PERSONALIZED LEARNING STATUS ===');
    parts.push(`User ID: ${personalization.userId}`);
    if (personalization.weakTopics && personalization.weakTopics.length > 0) {
      parts.push(`- Identified Weak Topics: ${personalization.weakTopics.join(', ')}`);
    }
    if (personalization.dueRevisionsCount || personalization.overdueRevisionsCount) {
      parts.push(
        `- Spaced Revisions: ${personalization.dueRevisionsCount || 0} due today, ${
          personalization.overdueRevisionsCount || 0
        } overdue`
      );
    }
    if (personalization.recentlyFailedProblems && personalization.recentlyFailedProblems.length > 0) {
      parts.push(`- Recent Mistake Journal Entries: ${personalization.recentlyFailedProblems.join(', ')}`);
    }
    parts.push('');
  }

  if (sources.length > 0) {
    parts.push('=== STACKUP VERIFIED CURRICULUM & DSA KNOWLEDGE ===');
    parts.push('Ground your response in these verified StackUp sources where relevant:');
    sources.forEach((src, idx) => {
      parts.push(`\n[Source ${idx + 1}: ${src.title} (${src.category})]`);
      parts.push(src.snippet);
      if (src.url) {
        parts.push(`Link: ${src.url}`);
      }
    });
    parts.push('');
  }

  return parts.join('\n');
}
