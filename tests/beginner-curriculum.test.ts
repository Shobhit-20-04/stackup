import { describe, it, expect } from 'vitest';
import { CURRICULUM_DATA } from '../src/lib/data/curriculum';
import { PRACTICAL_PROJECTS } from '../src/lib/data/projects';
import { TECHNICAL_GLOSSARY } from '../src/lib/data/glossary';

describe('Beginner-First Curriculum Transformation Suite', () => {

  describe('Digital Foundations (Stage 1)', () => {
    const coreCsCategories = CURRICULUM_DATA['core-cs'].categories;
    const digitalFoundations = coreCsCategories.find((c) => c.id === 'digital-foundations');

    it('contains the Digital Foundations category with all 4 essential topics', () => {
      expect(digitalFoundations).toBeDefined();
      expect(digitalFoundations?.topics.length).toBeGreaterThanOrEqual(4);

      const topicIds = digitalFoundations?.topics.map((t) => t.id) || [];
      expect(topicIds).toContain('computer-hardware-software');
      expect(topicIds).toContain('how-the-internet-works');
      expect(topicIds).toContain('what-is-programming');
      expect(topicIds).toContain('developer-setup-basics');
    });

    it('ensures each Stage 1 topic has comprehensive notes and quiz questions', () => {
      for (const topic of digitalFoundations?.topics || []) {
        expect(topic.title.length).toBeGreaterThan(5);
        expect(topic.description.length).toBeGreaterThan(10);
        expect(topic.notesMarkdown.length).toBeGreaterThan(1000);
        expect(topic.keyTakeaways?.length).toBeGreaterThanOrEqual(3);
        expect(topic.questions.length).toBeGreaterThanOrEqual(3);
        for (const q of topic.questions) {
          expect(q.options.length).toBe(4);
          expect(q.correct_option).toBeGreaterThanOrEqual(0);
          expect(q.correct_option).toBeLessThan(4);
          expect(q.explanation.length).toBeGreaterThan(10);
        }
      }
    });
  });

  describe('Programming Fundamentals (Stage 2)', () => {
    const coreCsCategories = CURRICULUM_DATA['core-cs'].categories;
    const progFund = coreCsCategories.find((c) => c.id === 'programming-fundamentals');

    it('contains Programming Fundamentals covering variables, conditionals, loops, functions, and collections', () => {
      expect(progFund).toBeDefined();
      expect(progFund?.topics.length).toBeGreaterThanOrEqual(5);

      const topicIds = progFund?.topics.map((t) => t.id) || [];
      expect(topicIds).toContain('variables-and-data-types');
      expect(topicIds).toContain('control-flow-conditionals');
      expect(topicIds).toContain('loops-and-iteration');
      expect(topicIds).toContain('functions-and-modularity');
      expect(topicIds).toContain('lists-and-dictionaries');
    });

    it('validates each topic has working code examples and beginner analogies', () => {
      for (const topic of progFund?.topics || []) {
        expect(topic.notesMarkdown).toContain('What Will You Learn?');
        expect(topic.notesMarkdown).toContain('Real-World Analogy');
        expect(topic.notesMarkdown.length).toBeGreaterThan(1500);
        expect(topic.questions.length).toBeGreaterThanOrEqual(3);
      }
    });
  });

  describe('Web & Software Development (Stage 3)', () => {
    const coreCsCategories = CURRICULUM_DATA['core-cs'].categories;
    const webDev = coreCsCategories.find((c) => c.id === 'web-development');

    it('contains full-stack web topics covering HTML, CSS, JavaScript DOM, APIs, SQL, and Git', () => {
      expect(webDev).toBeDefined();
      expect(webDev?.topics.length).toBeGreaterThanOrEqual(5);

      const topicIds = webDev?.topics.map((t) => t.id) || [];
      expect(topicIds).toContain('html-css-web-foundations');
      expect(topicIds).toContain('javascript-dom-interactivity');
      expect(topicIds).toContain('backend-apis-rest');
      expect(topicIds).toContain('databases-sql-crud');
      expect(topicIds).toContain('git-github-collaboration');
    });
  });

  describe('Practical Guided Projects (Stage 5)', () => {
    it('contains structured projects across Beginner, Intermediate, and Advanced tiers', () => {
      expect(PRACTICAL_PROJECTS.length).toBeGreaterThanOrEqual(5);

      const levels = new Set(PRACTICAL_PROJECTS.map((p) => p.level));
      expect(levels.has('Beginner')).toBe(true);
      expect(levels.has('Intermediate')).toBe(true);
      expect(levels.has('Advanced')).toBe(true);
    });

    it('validates every project has objectives, milestones, testing steps, and evaluation rubrics', () => {
      for (const project of PRACTICAL_PROJECTS) {
        expect(project.id).toMatch(/^proj-/);
        expect(project.title.length).toBeGreaterThan(5);
        expect(project.objective.length).toBeGreaterThan(20);
        expect(project.problemStatement.length).toBeGreaterThan(20);
        expect(project.keyFeatures.length).toBeGreaterThanOrEqual(3);
        expect(project.milestones.length).toBeGreaterThanOrEqual(2);
        expect(project.testingGuidelines.length).toBeGreaterThanOrEqual(2);
        expect(project.deploymentInstructions.length).toBeGreaterThanOrEqual(1);
        expect(project.rubric.length).toBeGreaterThanOrEqual(3);
        expect(project.techChoices.frontend).toBeDefined();
        expect(project.techChoices.deployment).toBeDefined();
      }
    });
  });

  describe('Interconnected Technical Glossary', () => {
    it('contains at least 25 essential industry terms with dual definitions and analogies', () => {
      expect(TECHNICAL_GLOSSARY.length).toBeGreaterThanOrEqual(25);

      for (const entry of TECHNICAL_GLOSSARY) {
        expect(entry.id.length).toBeGreaterThan(1);
        expect(entry.term.length).toBeGreaterThan(1);
        expect(entry.simpleDefinition.length).toBeGreaterThan(15);
        expect(entry.technicalDefinition.length).toBeGreaterThan(15);
        expect(entry.realWorldAnalogy.length).toBeGreaterThan(15);
        expect(entry.example.length).toBeGreaterThan(5);
        expect(entry.lessonUrl).toMatch(/^\//);
        expect(entry.relatedTerms.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('verifies critical beginner terms are present', () => {
      const termIds = TECHNICAL_GLOSSARY.map((g) => g.id);
      expect(termIds).toContain('algorithm');
      expect(termIds).toContain('variable');
      expect(termIds).toContain('function');
      expect(termIds).toContain('compiler');
      expect(termIds).toContain('api');
      expect(termIds).toContain('database');
      expect(termIds).toContain('git');
      expect(termIds).toContain('server');
      expect(termIds).toContain('client');
      expect(termIds).toContain('http');
    });
  });
});
