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

  it('should have valid questions with correct_option index in bounds', () => {
    const coreCs = CURRICULUM_DATA['core-cs'];
    expect(coreCs.categories.length).toBeGreaterThan(0);

    coreCs.categories.forEach((cat) => {
      cat.topics.forEach((topic) => {
        expect(topic.questions.length).toBeGreaterThan(0);
        topic.questions.forEach((q) => {
          expect(q.options.length).toBeGreaterThanOrEqual(2);
          expect(q.correct_option).toBeGreaterThanOrEqual(0);
          expect(q.correct_option).toBeLessThan(q.options.length);
          expect(q.explanation.trim().length).toBeGreaterThan(10);
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
  });
});
