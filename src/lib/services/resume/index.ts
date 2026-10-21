/**
 * StackUp Unified Resume ATS Analysis Engine
 * Orchestrates parsing, skills extraction, job-description alignment, 7-dimension scoring,
 * and fact-preserving XYZ bullet point optimization.
 */

import { parseResumeDocument } from './parser';
import { extractSkillsWithEvidence, SKILL_ONTOLOGY } from './skills-ontology';
import { matchJobDescription } from './jd-matcher';
import { calculateAtsScores } from './scorer';
import { generateBulletRewrites } from './bullet-optimizer';
import type {
  ResumeAnalysisInput,
  ResumeAnalysisResult,
  ParsingReport,
  ExperienceLevel,
} from './types';

export * from './types';
export * from './role-presets';
export * from './skills-ontology';
export * from './parser';
export * from './jd-matcher';
export * from './scorer';
export * from './bullet-optimizer';

/**
 * Synchronous analysis for plain text resumes (used in tests and text-based evaluation).
 */
export function analyzeResumeText(
  text: string,
  filename = 'Resume.txt',
  options?: {
    jobDescription?: string;
    targetRole?: string;
    experienceLevel?: ExperienceLevel;
  }
): ResumeAnalysisResult {
  const clean = text.trim();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;

  const parsingReport: ParsingReport = {
    text,
    cleanText: clean,
    filename,
    fileSizeBytes: text.length,
    mimeType: 'text/plain',
    pageCount: Math.max(1, Math.ceil(wordCount / 400)),
    wordCount,
    characterCount: clean.length,
    isScanned: false,
    isEncrypted: false,
    hasEncodingIssues: false,
    extractionQualityScore: wordCount >= 100 ? 100 : Math.max(30, wordCount),
    confidence: wordCount >= 100 ? 'High' : 'Medium',
    detectedLayoutWarnings: [],
    sections: segmentRawSections(clean),
    detectedDates: extractDatesSimple(clean),
    dateConsistencyIssues: [],
    links: extractLinksSimple(clean),
  };

  return buildAnalysisResult(parsingReport, filename, options);
}

/**
 * Full asynchronous analysis supporting PDF, DOCX, and TXT binary buffers.
 */
export async function analyzeResume(input: ResumeAnalysisInput): Promise<ResumeAnalysisResult> {
  const filename = input.filename || 'Uploaded_Resume.pdf';
  const ext = input.fileExt || (filename.includes('.') ? filename.slice(filename.lastIndexOf('.')) : '.pdf');

  let parsingReport: ParsingReport;

  if (input.fileBuffer) {
    parsingReport = await parseResumeDocument(input.fileBuffer, filename, ext);
  } else if (input.text) {
    return analyzeResumeText(input.text, filename, {
      jobDescription: input.jobDescription,
      targetRole: input.targetRole,
      experienceLevel: input.experienceLevel,
    });
  } else {
    throw new Error('Either fileBuffer or text is required for resume analysis.');
  }

  return buildAnalysisResult(parsingReport, filename, {
    jobDescription: input.jobDescription,
    targetRole: input.targetRole,
    experienceLevel: input.experienceLevel,
  });
}

/**
 * Common deterministic analysis pipeline.
 */
function buildAnalysisResult(
  parsingReport: ParsingReport,
  filename: string,
  options?: {
    jobDescription?: string;
    targetRole?: string;
    experienceLevel?: ExperienceLevel;
  }
): ResumeAnalysisResult {
  // 1. Technical Skills Extraction with Contextual Evidence
  const { matchedSkills, stuffingDetected, stuffedSkills } = extractSkillsWithEvidence(
    parsingReport.cleanText,
    {
      experience: parsingReport.sections.experience?.content,
      projects: parsingReport.sections.projects?.content,
      skills: parsingReport.sections.skills?.content,
    }
  );

  // 2. Job Description / Target Role Alignment
  const jdMatch = matchJobDescription(
    parsingReport.cleanText,
    matchedSkills,
    options?.jobDescription,
    options?.targetRole
  );

  // 3. 7-Dimension Transparent Scoring
  const scoring = calculateAtsScores(
    parsingReport,
    jdMatch,
    matchedSkills,
    stuffedSkills,
    options?.experienceLevel || 'student_fresher'
  );

  // 4. Fact-Preserving Bullet Rewrites
  const allCandidateBullets = [
    ...(parsingReport.sections.experience?.bulletPoints || []),
    ...(parsingReport.sections.projects?.bulletPoints || []),
  ];
  const bulletRewrites = generateBulletRewrites(
    allCandidateBullets,
    matchedSkills.map((s) => s.name)
  );

  // 5. Keywords
  const matchedKeywordNames = matchedSkills.map((s) => s.name);
  const missingKeywordNames = jdMatch.hasJobDescription
    ? jdMatch.keywordGaps
    : SKILL_ONTOLOGY.filter((s) => !matchedKeywordNames.includes(s.name))
        .map((s) => s.name)
        .slice(0, 8);

  // 6. Backwards-compatible 4-category breakdown for legacy views
  const contactScore = scoring.dimensions.atsCompatibility.score;
  const experienceScore = Math.round(
    scoring.dimensions.experienceAndProjects.score * 0.6 +
    scoring.dimensions.impactAndAchievements.score * 0.4
  );
  const skillsScore = scoring.dimensions.skillsAndQualifications.score;
  const formattingScore = scoring.dimensions.structureAndReadability.score;

  // 7. Summary Formulation
  let summaryText = '';
  if (parsingReport.isScanned) {
    summaryText = '⚠️ Scanned Document Warning: This file appears to be an image-only scan without a selectable text layer. ATS engines cannot read image resumes. Please re-export your document directly from Word, Google Docs, or LaTeX.';
  } else if (jdMatch.hasJobDescription) {
    summaryText = `Your resume scored ${scoring.overallScore}/100 (Grade ${scoring.grade}) with a ${jdMatch.matchScore}% alignment to the ${jdMatch.targetRoleTitle || 'target job description'}. Matched ${jdMatch.requiredSkillsMatched.length} required skill(s) with ${jdMatch.requiredSkillsMissing.length} gap(s).`;
  } else {
    summaryText = `Your resume scored ${scoring.overallScore}/100 (Grade ${scoring.grade}) in General Quality Mode. It demonstrated ${matchedSkills.length} core technical competencies across clean structural sections. To measure role-specific keyword alignment, provide a job description.`;
  }

  const disclaimer = 'Note: The StackUp ATS Score is an educational estimation based on observable software engineering rubric criteria, structural readability, and keyword alignment. It does not reproduce any proprietary third-party ATS vendor algorithms (e.g., Workday, Greenhouse, Taleo) and does not guarantee interviews or job offers.';

  return {
    filename,
    ats_score: scoring.overallScore,
    grade: scoring.grade,
    isGeneralQualityScore: scoring.isGeneralQualityScore,
    disclaimer,
    experienceLevel: options?.experienceLevel || 'student_fresher',
    parsingReport,
    jobDescriptionMatch: jdMatch,
    dimensions: scoring.dimensions,
    summary: summaryText,
    matched_keywords: matchedKeywordNames,
    missing_keywords: missingKeywordNames,
    keyword_stuffing_detected: stuffingDetected,
    formatting_issues: scoring.formattingIssues,
    recommendations: scoring.recommendations,
    section_suggestions: scoring.sectionSuggestions,
    bullet_rewrites: bulletRewrites,
    breakdown: {
      contact_score: contactScore,
      experience_score: experienceScore,
      skills_score: skillsScore,
      formatting_score: formattingScore,
    },
  };
}

// Internal helper for raw string parsing fallback
function segmentRawSections(text: string) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const sections: ParsingReport['sections'] = {};
  const headers = [
    { key: 'experience' as const, re: /^(work\s+|professional\s+|employment\s+|relevant\s+)?(experience|history|employment|internships)/i },
    { key: 'education' as const, re: /^(education|academic\s+(background|qualifications|history)|academics|qualifications|university)/i },
    { key: 'skills' as const, re: /^(technical\s+|core\s+)?(skills|technologies|competencies|tools(\s*(&|and)\s*technologies)?)/i },
    { key: 'projects' as const, re: /^(academic\s*(&|and)\s*)?(personal\s*)?(key\s*|technical\s*|selected\s*|featured\s*|capstone\s*)?projects/i },
    { key: 'summary' as const, re: /^(professional\s+|career\s+)?(summary|profile|about\s+me|objective)/i },
  ];

  let current: keyof ParsingReport['sections'] | null = null;
  const map: Record<string, string[]> = {};

  for (const line of lines) {
    let matched: keyof ParsingReport['sections'] | null = null;
    for (const h of headers) {
      if (h.re.test(line)) {
        matched = h.key;
        break;
      }
    }
    if (matched) {
      current = matched;
      if (!map[current]) map[current] = [];
    } else if (current) {
      map[current].push(line);
    }
  }

  for (const [k, sl] of Object.entries(map)) {
    sections[k as keyof ParsingReport['sections']] = {
      title: k.charAt(0).toUpperCase() + k.slice(1),
      content: sl.join('\n'),
      bulletPoints: sl.filter((l) => l.length > 20),
    };
  }

  return sections;
}

function extractDatesSimple(text: string) {
  const m = text.match(/\b(20\d{2}|19\d{2})\b/g) || [];
  return m.map((d) => ({ raw: d }));
}

function extractLinksSimple(text: string) {
  const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phone = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/);
  const linkedIn = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const github = text.match(/github\.com\/[a-zA-Z0-9_-]+/i);

  return {
    email: email ? email[0] : undefined,
    phone: phone ? phone[0] : undefined,
    linkedIn: linkedIn ? linkedIn[0] : undefined,
    github: github ? github[0] : undefined,
    otherUrls: [],
  };
}
