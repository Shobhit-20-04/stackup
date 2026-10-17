import { describe, it, expect } from 'vitest';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';
import { DSA_PROBLEMS, DSA_CATEGORIES } from '@/lib/data/dsa';

describe('Comprehensive Educational Content Audit', () => {
  it('audits and inventories all DSA problems', () => {
    console.log(`\n=== DSA CONTENT AUDIT ===`);
    console.log(`Total DSA Problems: ${DSA_PROBLEMS.length}`);

    const difficultyCounts: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
    const categoryCounts: Record<string, number> = {};
    const missingFields: string[] = [];
    const problemsWithShortNotes: string[] = [];

    const seenIds = new Set<string>();

    DSA_PROBLEMS.forEach((prob, idx) => {
      // Check ID uniqueness
      if (seenIds.has(prob.id)) {
        missingFields.push(`Duplicate ID: ${prob.id}`);
      }
      seenIds.add(prob.id);

      // Check fields
      if (!prob.title) missingFields.push(`${prob.id}: missing title`);
      if (!prob.description || prob.description.length < 20) missingFields.push(`${prob.id}: short/missing description`);
      if (!prob.approach || prob.approach.length < 15) missingFields.push(`${prob.id}: short/missing approach`);
      if (!prob.timeComplexity) missingFields.push(`${prob.id}: missing timeComplexity`);
      if (!prob.spaceComplexity) missingFields.push(`${prob.id}: missing spaceComplexity`);
      if (!prob.examples || prob.examples.length === 0) missingFields.push(`${prob.id}: missing examples`);
      if (!prob.constraints || prob.constraints.length === 0) missingFields.push(`${prob.id}: missing constraints`);

      if (!prob.solutions?.python) missingFields.push(`${prob.id}: missing python solution`);
      if (!prob.solutions?.cpp) missingFields.push(`${prob.id}: missing cpp solution`);
      if (!prob.solutions?.java) missingFields.push(`${prob.id}: missing java solution`);
      if (!prob.solutions?.typescript) missingFields.push(`${prob.id}: missing typescript solution`);

      difficultyCounts[prob.difficulty] = (difficultyCounts[prob.difficulty] || 0) + 1;
      categoryCounts[prob.pattern_tag] = (categoryCounts[prob.pattern_tag] || 0) + 1;
    });

    console.log('Difficulty distribution:', difficultyCounts);
    console.log('Category distribution:', categoryCounts);

    if (missingFields.length > 0) {
      console.warn('DSA issues detected:', missingFields.slice(0, 20));
    }
    expect(missingFields).toEqual([]);
    expect(DSA_PROBLEMS.length).toBeGreaterThanOrEqual(150);
  });

  it('audits and inventories all Curriculum subjects, topics, and quiz questions', () => {
    console.log(`\n=== CURRICULUM CONTENT AUDIT ===`);

    const sections = Object.entries(CURRICULUM_DATA);
    let totalCategories = 0;
    let totalTopics = 0;
    let totalQuestions = 0;

    const topicStats: {
      section: string;
      category: string;
      topicsCount: number;
      questionsCount: number;
    }[] = [];

    const issues: string[] = [];
    const seenTopicIds = new Set<string>();
    const seenQuestionIds = new Set<string>();

    sections.forEach(([secSlug, section]) => {
      totalCategories += section.categories.length;

      section.categories.forEach((cat) => {
        let catQuestions = 0;

        cat.topics.forEach((topic) => {
          totalTopics++;

          // Check topic ID uniqueness
          if (seenTopicIds.has(topic.id)) {
            issues.push(`Duplicate topic ID: ${topic.id} in ${cat.id}`);
          }
          seenTopicIds.add(topic.id);

          // Check notes length
          if (!topic.notesMarkdown || topic.notesMarkdown.trim().length < 100) {
            issues.push(`Topic ${topic.id} (${topic.title}) has thin notes (${topic.notesMarkdown?.length || 0} chars)`);
          }

          // Check takeaways
          if (!topic.keyTakeaways || topic.keyTakeaways.length < 2) {
            issues.push(`Topic ${topic.id} has insufficient key takeaways`);
          }

          // Check company tags
          if (!topic.companyTags || topic.companyTags.length === 0) {
            issues.push(`Topic ${topic.id} has no company tags`);
          }

          // Check questions
          if (!topic.questions || topic.questions.length === 0) {
            issues.push(`Topic ${topic.id} has no quiz questions`);
          } else {
            catQuestions += topic.questions.length;
            totalQuestions += topic.questions.length;

            topic.questions.forEach((q, qIdx) => {
              if (seenQuestionIds.has(q.id)) {
                issues.push(`Duplicate question ID: ${q.id} in topic ${topic.id}`);
              }
              seenQuestionIds.add(q.id);

              if (q.options.length < 2) {
                issues.push(`Question ${q.id} has fewer than 2 options`);
              }
              if (q.correct_option < 0 || q.correct_option >= q.options.length) {
                issues.push(`Question ${q.id} correct_option index out of bounds (${q.correct_option} for ${q.options.length} options)`);
              }
              // Check for duplicate options (exact trimmed match)
              const optionTexts = q.options.map((o) => o.trim());
              const uniqueOptions = new Set(optionTexts);
              if (uniqueOptions.size < q.options.length) {
                issues.push(`Question ${q.id} in topic ${topic.id} has duplicate options: ${JSON.stringify(q.options)}`);
              }

              // Check for placeholder text
              if (/todo|placeholder|dummy|lorem ipsum/i.test(q.question + ' ' + q.explanation)) {
                issues.push(`Question ${q.id} in topic ${topic.id} contains placeholder text`);
              }

              // Check if explanation references Option letter that contradicts correct_option
              const exp = q.explanation.toLowerCase();
              const letters = ['option a', 'option b', 'option c', 'option d'];
              letters.forEach((optStr, optIdx) => {
                if (exp.includes(optStr) && q.correct_option !== optIdx) {
                  // Only flag if it says "option X is correct" or starts with "option X"
                  if (exp.includes(`${optStr} is correct`) || exp.startsWith(optStr)) {
                    issues.push(`Question ${q.id} in ${topic.id}: explanation mentions "${optStr}" but correct_option is ${q.correct_option} (Option ${String.fromCharCode(65 + q.correct_option)})`);
                  }
                }
              });
            });
          }
        });

        topicStats.push({
          section: secSlug,
          category: cat.title,
          topicsCount: cat.topics.length,
          questionsCount: catQuestions,
        });
      });
    });

    console.log(`Total Sections: ${sections.length}`);
    console.log(`Total Categories (Subjects): ${totalCategories}`);
    console.log(`Total Topics: ${totalTopics}`);
    console.log(`Total Quiz Questions: ${totalQuestions}`);
    console.table(topicStats);

    if (issues.length > 0) {
      console.warn(`Curriculum issues found (${issues.length}):`, issues.slice(0, 30));
    }

    expect(issues).toEqual([]);
    expect(totalTopics).toBeGreaterThanOrEqual(185);
    expect(totalQuestions).toBeGreaterThanOrEqual(350);
  });

  it('evaluates notes depth across all topics and identifies topics needing enhancement', () => {
    const shortTopics: { category: string; id: string; title: string; length: number }[] = [];
    let totalLength = 0;
    let count = 0;

    Object.values(CURRICULUM_DATA).forEach((section) => {
      section.categories.forEach((cat) => {
        cat.topics.forEach((topic) => {
          const len = topic.notesMarkdown?.trim().length || 0;
          totalLength += len;
          count++;
          if (len < 1000) {
            shortTopics.push({
              category: cat.title,
              id: topic.id,
              title: topic.title,
              length: len,
            });
          }
        });
      });
    });

    const avgLength = Math.round(totalLength / count);
    console.log(`\n=== NOTES DEPTH EVALUATION ===`);
    console.log(`Average notes length: ${avgLength} characters`);
    console.log(`Topics with notes < 1000 characters: ${shortTopics.length} of ${count}`);
    if (shortTopics.length > 0) {
      console.log(`Shortest 15 topics:`, shortTopics.sort((a, b) => a.length - b.length).slice(0, 15));
    }
  });

  it('detects duplicate or near-identical questions within the same topic', () => {
    const duplicatePairs: { topic: string; q1: string; q2: string }[] = [];

    const getWords = (str: string) =>
      new Set(
        str
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, '')
          .split(/\s+/)
          .filter((w) => w.length > 3)
      );

    const jaccard = (s1: Set<string>, s2: Set<string>) => {
      let intersection = 0;
      s1.forEach((w) => {
        if (s2.has(w)) intersection++;
      });
      const union = s1.size + s2.size - intersection;
      return union === 0 ? 0 : intersection / union;
    };

    Object.values(CURRICULUM_DATA).forEach((section) => {
      section.categories.forEach((cat) => {
        cat.topics.forEach((topic) => {
          const qs = topic.questions || [];
          for (let i = 0; i < qs.length; i++) {
            for (let j = i + 1; j < qs.length; j++) {
              const words1 = getWords(qs[i].question);
              const words2 = getWords(qs[j].question);
              const sim = jaccard(words1, words2);
              if (sim > 0.6) {
                duplicatePairs.push({
                  topic: `${cat.title} -> ${topic.title} (${topic.id})`,
                  q1: `[${qs[i].id}] ${qs[i].question}`,
                  q2: `[${qs[j].id}] ${qs[j].question}`,
                });
              }
            }
          }
        });
      });
    });

    console.log(`\n=== NEAR-DUPLICATE QUESTIONS IN SAME TOPIC ===`);
    console.log(`Total near-duplicate pairs found: ${duplicatePairs.length}`);
    duplicatePairs.forEach((pair, idx) => {
      console.log(`\nPair #${idx + 1} in ${pair.topic}:`);
      console.log(`  Q1: ${pair.q1}`);
      console.log(`  Q2: ${pair.q2}`);
    });
  });
});
