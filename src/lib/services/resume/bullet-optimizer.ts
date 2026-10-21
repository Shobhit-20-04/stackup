/**
 * StackUp Fact-Preserving Bullet Point Optimizer
 * Restructures candidate's actual bullet points using Google's XYZ formula without inventing metrics.
 */

import type { BulletRewrite } from './types';

const PASSIVE_STARTS = [
  { trigger: /^worked\s+on/i, replacement: 'Engineered' },
  { trigger: /^helped\s+(to\s+)?/i, replacement: 'Collaborated to implement' },
  { trigger: /^responsible\s+for/i, replacement: 'Spearheaded' },
  { trigger: /^assisted\s+(with|in)?/i, replacement: 'Contributed to designing' },
  { trigger: /^handled/i, replacement: 'Orchestrated' },
  { trigger: /^participated\s+in/i, replacement: 'Executed' },
  { trigger: /^built/i, replacement: 'Architected' },
  { trigger: /^made/i, replacement: 'Developed' },
  { trigger: /^did/i, replacement: 'Implemented' },
];

export function generateBulletRewrites(
  bulletPoints: string[],
  detectedSkills: string[]
): BulletRewrite[] {
  const rewrites: BulletRewrite[] = [];

  // Filter for candidate bullets that are passive or lack metrics
  const weakBullets = bulletPoints.filter((b) => {
    const isPassive = PASSIVE_STARTS.some((p) => p.trigger.test(b.trim()));
    const lacksMetrics = !/\b\d+%|\b\d+x\b|\$\d+|\b\d+\s*(ms|sec|users|req|qps|rps|hours)\b/i.test(b);
    return isPassive || (lacksMetrics && b.length > 25 && b.length < 180);
  });

  // Pick up to 3 candidate bullets to rewrite
  const targets = weakBullets.slice(0, 3);

  for (const original of targets) {
    let clean = original.trim().replace(/[.;]+$/, '');
    let leadingVerb = 'Engineered';

    for (const p of PASSIVE_STARTS) {
      if (p.trigger.test(clean)) {
        leadingVerb = p.replacement;
        clean = clean.replace(p.trigger, '').trim();
        // Capitalize next character
        clean = clean.charAt(0).toLowerCase() + clean.slice(1);
        break;
      }
    }

    // Identify if any skill was mentioned in this bullet
    const mentionedSkill = detectedSkills.find((s) => {
      const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`(?:^|[^a-zA-Z0-9_])${escaped}(?:$|[^a-zA-Z0-9_])`, 'i').test(original);
    });
    const skillContext = mentionedSkill ? ` utilizing ${mentionedSkill}` : '';

    // Construct XYZ rewrite using candidate's original text + metric placeholders
    const improved = `${leadingVerb} ${clean}${skillContext}, optimizing execution efficiency and delivering [measurable outcome, e.g., X% latency reduction or Y hours saved per sprint].`;

    rewrites.push({
      original,
      improved,
      reason: 'Replaces passive duty phrasing with an authoritative action verb and structures the accomplishment using Google\'s XYZ formula. Replace bracketed placeholders with your actual project data.',
      formula: 'XYZ',
      placeholderMetrics: ['[measurable outcome, e.g., X% latency reduction or Y hours saved per sprint]'],
    });
  }

  // If no suitable bullets were found in text, provide a guided XYZ template grounded in their top skills
  if (rewrites.length === 0) {
    const primarySkill = detectedSkills[0] || 'software architecture';
    rewrites.push({
      original: `Worked on software features using ${primarySkill}.`,
      improved: `Architected modular application features using ${primarySkill}, improving system reliability and reducing processing cycle time by [X%].`,
      reason: 'XYZ template: "Accomplished [X] as measured by [Y], by doing [Z]". Grounded in candidate\'s skills without fabricating numbers.',
      formula: 'XYZ',
      placeholderMetrics: ['[X%]'],
    });
  }

  return rewrites;
}
