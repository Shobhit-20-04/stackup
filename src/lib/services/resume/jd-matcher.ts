/**
 * StackUp Job Description Matcher
 * Aligns candidate resumes against target job descriptions and roles.
 */

import { extractSkillsWithEvidence } from './skills-ontology';
import { getRolePresetById, type RolePreset } from './role-presets';
import type { JobDescriptionMatch, MatchedSkill } from './types';

export function matchJobDescription(
  resumeText: string,
  candidateSkills: MatchedSkill[],
  jobDescriptionText?: string,
  targetRoleId?: string
): JobDescriptionMatch {
  // 1. Resolve Target Profile (Custom JD or Role Preset)
  let jdContent = (jobDescriptionText || '').trim();
  let targetTitle: string | undefined = undefined;

  let preset: RolePreset | undefined;
  if (targetRoleId) {
    preset = getRolePresetById(targetRoleId);
    if (preset) {
      targetTitle = preset.title;
      if (!jdContent) {
        jdContent = `${preset.title}\n\n${preset.description}\n\nRequired Qualifications:\n${preset.requiredSkills.join(', ')}\n\nPreferred Qualifications:\n${preset.preferredSkills.join(', ')}\n\nKey Responsibilities:\n${preset.coreResponsibilities.join('\n')}`;
      }
    }
  }

  if (!jdContent || jdContent.length < 25) {
    return {
      hasJobDescription: false,
      targetRoleTitle: targetTitle,
      jobDescriptionText: undefined,
      requiredSkillsMatched: [],
      requiredSkillsMissing: [],
      preferredSkillsMatched: [],
      preferredSkillsMissing: [],
      keywordGaps: [],
      matchedResponsibilities: [],
      unmatchedResponsibilities: [],
      qualificationGaps: [],
      matchScore: 0,
    };
  }

  // 2. Extract Skills and Sections from JD
  const jdLower = jdContent.toLowerCase();

  // Identify Required vs Preferred skill sections in JD
  const requiredSectionMatch = jdContent.match(/(?:required|minimum|basic|must\s+have|qualifications)[\s\S]*?(?=(?:preferred|nice\s+to\s+have|bonus|responsibilities|what\s+you'll\s+do|$))/i);
  const preferredSectionMatch = jdContent.match(/(?:preferred|nice\s+to\s+have|bonus|desired)[\s\S]*?(?=(?:responsibilities|what\s+you'll\s+do|benefits|about\s+us|$))/i);

  const requiredJdText = requiredSectionMatch ? requiredSectionMatch[0] : jdContent;
  const preferredJdText = preferredSectionMatch ? preferredSectionMatch[0] : '';

  const requiredJdSkills = extractSkillsWithEvidence(requiredJdText).matchedSkills.map((s) => s.name);
  let preferredJdSkills = preferredSectionMatch
    ? extractSkillsWithEvidence(preferredJdText).matchedSkills.map((s) => s.name)
    : [];

  // If using preset, guarantee preset required/preferred skills are included
  if (preset) {
    for (const r of preset.requiredSkills) {
      if (!requiredJdSkills.includes(r)) requiredJdSkills.push(r);
    }
    for (const p of preset.preferredSkills) {
      if (!preferredJdSkills.includes(p) && !requiredJdSkills.includes(p)) {
        preferredJdSkills.push(p);
      }
    }
  }

  // Deduplicate: A skill cannot be both required and preferred
  preferredJdSkills = preferredJdSkills.filter((s) => !requiredJdSkills.includes(s));

  // 3. Match Candidate Skills against JD Skills
  // candidateSkills mapped directly

  const requiredSkillsMatched: MatchedSkill[] = [];
  const requiredSkillsMissing: string[] = [];

  for (const skillName of requiredJdSkills) {
    const found = candidateSkills.find((cs) => cs.name.toLowerCase() === skillName.toLowerCase());
    if (found) {
      requiredSkillsMatched.push(found);
    } else {
      requiredSkillsMissing.push(skillName);
    }
  }

  const preferredSkillsMatched: MatchedSkill[] = [];
  const preferredSkillsMissing: string[] = [];

  for (const skillName of preferredJdSkills) {
    const found = candidateSkills.find((cs) => cs.name.toLowerCase() === skillName.toLowerCase());
    if (found) {
      preferredSkillsMatched.push(found);
    } else {
      preferredSkillsMissing.push(skillName);
    }
  }

  // 4. Responsibility Alignment
  const responsibilityLines: string[] = preset ? preset.coreResponsibilities : [];
  if (!preset) {
    const respSection = jdContent.match(/(?:responsibilities|what\s+you'll\s+do|duties|the\s+role)[\s\S]*?(?=(?:requirements|qualifications|benefits|$))/i);
    if (respSection) {
      const parsedLines = respSection[0]
        .split('\n')
        .map((l) => l.replace(/^[•\-\*\u2022\d+\.]\s*/, '').trim())
        .filter((l) => l.length > 25 && !/(responsibilities|what\s+you'll\s+do|role)/i.test(l));
      responsibilityLines.push(...parsedLines.slice(0, 6));
    }
  }

  const resumeLower = resumeText.toLowerCase();
  const matchedResponsibilities: { responsibility: string; evidenceContext: string }[] = [];
  const unmatchedResponsibilities: string[] = [];

  for (const resp of responsibilityLines) {
    // Extract key nouns/verbs from responsibility
    const words = resp.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const significantWords = words.filter((w) => !['with', 'your', 'will', 'that', 'this', 'from', 'have', 'team', 'work', 'under', 'using'].includes(w));
    
    // Count matches in resume (stem prefix of at least 4 letters)
    const matchCount = significantWords.filter((w) => {
      const stem = w.length > 5 ? w.slice(0, 5) : w;
      return resumeLower.includes(stem);
    }).length;
    const matchRatio = significantWords.length > 0 ? matchCount / significantWords.length : 0;

    if (matchRatio >= 0.25 || matchCount >= 2) {
      matchedResponsibilities.push({
        responsibility: resp,
        evidenceContext: `Resume demonstrates alignment with keywords: ${significantWords.filter((w) => resumeLower.includes(w.slice(0, 5))).slice(0, 4).join(', ')}`,
      });
    } else {
      unmatchedResponsibilities.push(resp);
    }
  }

  // 5. Keyword Gaps
  const keywordGaps = requiredSkillsMissing.concat(preferredSkillsMissing.slice(0, 5));

  // 6. Qualification Gaps Check
  const qualificationGaps: string[] = [];
  if (requiredSkillsMissing.length > 0) {
    qualificationGaps.push(`Missing ${requiredSkillsMissing.length} required technical skill${requiredSkillsMissing.length > 1 ? 's' : ''}: ${requiredSkillsMissing.join(', ')}`);
  }
  if (jdLower.includes('bachelor') || jdLower.includes('master') || jdLower.includes('degree')) {
    if (!resumeLower.includes('bachelor') && !resumeLower.includes('master') && !resumeLower.includes('degree') && !resumeLower.includes('b.tech') && !resumeLower.includes('b.s.')) {
      qualificationGaps.push('Job description mentions academic degree requirement; verify that your Education section explicitly states your degree title.');
    }
  }

  // 7. Calculate Match Score (0 - 100)
  const reqTotal = Math.max(1, requiredJdSkills.length);
  const prefTotal = Math.max(1, preferredJdSkills.length);
  const respTotal = Math.max(1, responsibilityLines.length);

  const reqScore = (requiredSkillsMatched.length / reqTotal) * 100;
  const prefScore = (preferredSkillsMatched.length / prefTotal) * 100;
  const respScore = (matchedResponsibilities.length / respTotal) * 100;

  const matchScore = Math.round(
    reqScore * 0.60 +
    prefScore * 0.20 +
    respScore * 0.20
  );

  return {
    hasJobDescription: true,
    targetRoleTitle: targetTitle,
    jobDescriptionText: jdContent,
    requiredSkillsMatched,
    requiredSkillsMissing,
    preferredSkillsMatched,
    preferredSkillsMissing,
    keywordGaps,
    matchedResponsibilities,
    unmatchedResponsibilities,
    qualificationGaps,
    matchScore: Math.min(100, Math.max(0, matchScore)),
  };
}
