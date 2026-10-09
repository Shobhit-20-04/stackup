import { describe, it, expect } from 'vitest';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';

describe('Phase 2 Curriculum & Notes Validation', () => {
  it('should include required sections: Aptitude and Core CS', () => {
    expect(CURRICULUM_DATA).toHaveProperty('aptitude');
    expect(CURRICULUM_DATA).toHaveProperty('core-cs');
  });

  it('should have valid topics with non-empty markdown notes in Aptitude', () => {
    const aptitude = CURRICULUM_DATA['aptitude'];
    expect(aptitude.categories.length).toBeGreaterThan(0);

    aptitude.categories.forEach((cat) => {
      expect(cat.topics.length).toBeGreaterThan(0);
      cat.topics.forEach((topic) => {
        expect(topic.title).toBeTruthy();
        expect(topic.notesMarkdown.trim().length).toBeGreaterThan(50);
        expect(topic.estimatedMinutes).toBeGreaterThan(0);
      });
    });
  });

  it('should have valid questions with correct_option index in bounds across all topics', () => {
    const sections = [CURRICULUM_DATA['aptitude'], CURRICULUM_DATA['core-cs']];
    let totalQuestions = 0;

    sections.forEach((section) => {
      section.categories.forEach((cat) => {
        cat.topics.forEach((topic) => {
          expect(topic.questions.length).toBeGreaterThanOrEqual(1);
          totalQuestions += topic.questions.length;

          topic.questions.forEach((q) => {
            expect(q.options.length).toBeGreaterThanOrEqual(2);
            expect(q.correct_option).toBeGreaterThanOrEqual(0);
            expect(q.correct_option).toBeLessThan(q.options.length);
            expect(q.explanation.trim().length).toBeGreaterThan(10);
          });
        });
      });
    });

    // Enriched question bank verification: we expanded to 176 questions
    expect(totalQuestions).toBeGreaterThanOrEqual(170);
  });

  it('should have difficulty, company tags, and key takeaways across all topics', () => {
    const sections = [CURRICULUM_DATA['aptitude'], CURRICULUM_DATA['core-cs']];
    const validDifficulties = new Set(['Easy', 'Medium', 'Hard']);

    sections.forEach((section) => {
      section.categories.forEach((cat) => {
        cat.topics.forEach((topic) => {
          // Difficulty
          expect(validDifficulties.has(topic.difficulty || '')).toBe(true);
          // Company Tags
          expect(topic.companyTags).toBeDefined();
          expect(Array.isArray(topic.companyTags)).toBe(true);
          expect(topic.companyTags!.length).toBeGreaterThan(0);
          // Key Takeaways
          expect(topic.keyTakeaways).toBeDefined();
          expect(Array.isArray(topic.keyTakeaways)).toBe(true);
          expect(topic.keyTakeaways!.length).toBeGreaterThanOrEqual(2);
        });
      });
    });
  });

  it('should compute quiz percentages correctly', () => {
    const score1 = 3;
    const total1 = 3;
    expect(Math.round((score1 / total1) * 100)).toBe(100);

    const score2 = 1;
    const total2 = 3;
    expect(Math.round((score2 / total2) * 100)).toBe(33);

    const score3 = 0;
    const total3 = 5;
    expect(Math.round((score3 / total3) * 100)).toBe(0);
  });
});
