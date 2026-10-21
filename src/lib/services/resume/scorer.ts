/**
 * StackUp Modular & Explainable ATS Scoring Engine
 * Implements the 7 dimensions, configurable weights, candidate-level awareness,
 * keyword stuffing guards, and normalized weighting when no JD is provided.
 */

import type {
  ParsingReport,
  JobDescriptionMatch,
  ScoringDimension,
  ResumeAnalysisResult,
  ExperienceLevel,
  Recommendation,
} from './types';
import { generateBulletRewrites } from './bullet-optimizer';

const ACTION_VERBS = [
  'architected', 'spearheaded', 'engineered', 'implemented', 'optimized',
  'developed', 'designed', 'deployed', 'automated', 'reduced', 'scaled',
  'increased', 'built', 'integrated', 'refactored', 'streamlined',
  'orchestrated', 'accelerated', 'collaborated', 'migrated', 'configured',
  'monitored', 'secured', 'delivered', 'established', 'benchmarked'
];

export function calculateAtsScores(
  parsing: ParsingReport,
  jdMatch: JobDescriptionMatch,
  matchedSkills: { name: string; category: string; context: string; isExplicit: boolean }[],
  stuffedSkills: string[],
  experienceLevel: ExperienceLevel = 'student_fresher'
): {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  isGeneralQualityScore: boolean;
  dimensions: ResumeAnalysisResult['dimensions'];
  recommendations: Recommendation[];
  formattingIssues: string[];
  sectionSuggestions: ResumeAnalysisResult['section_suggestions'];
} {
  const isGeneral = !jdMatch.hasJobDescription;

  // 1. Dimension Weights Configuration
  // With JD: 30% JD, 20% Skills, 15% Exp, 10% Impact, 10% Struct, 10% ATS, 5% Edu = 100%
  // Without JD (Rebalanced): 0% JD, 28.5% Skills, 21.5% Exp, 14.3% Impact, 14.3% Struct, 14.3% ATS, 7.1% Edu = 100%
  const weights = isGeneral
    ? { jd: 0, skills: 28.5, exp: 21.5, impact: 14.3, struct: 14.3, ats: 14.3, edu: 7.1 }
    : { jd: 30, skills: 20, exp: 15, impact: 10, struct: 10, ats: 10, edu: 5 };

  const recommendations: Recommendation[] = [];
  const formattingIssues: string[] = [...parsing.detectedLayoutWarnings];

  // -------------------------------------------------------------------------
  // DIMENSION 1: Job Description Alignment (30% or 0%)
  // -------------------------------------------------------------------------
  let jdScore = 0;
  const jdEvidence: string[] = [];
  const jdDeductions: { reason: string; points: number }[] = [];
  const jdImprovements: string[] = [];

  if (!isGeneral) {
    jdScore = jdMatch.matchScore;
    if (jdMatch.requiredSkillsMatched.length > 0) {
      jdEvidence.push(`Matched ${jdMatch.requiredSkillsMatched.length} required skill(s): ${jdMatch.requiredSkillsMatched.map((s) => s.name).join(', ')}`);
    }
    if (jdMatch.preferredSkillsMatched.length > 0) {
      jdEvidence.push(`Matched ${jdMatch.preferredSkillsMatched.length} preferred skill(s): ${jdMatch.preferredSkillsMatched.map((s) => s.name).join(', ')}`);
    }
    if (jdMatch.matchedResponsibilities.length > 0) {
      jdEvidence.push(`Found contextual alignment with ${jdMatch.matchedResponsibilities.length} role responsibilities`);
    }

    if (jdMatch.requiredSkillsMissing.length > 0) {
      const deductionPoints = Math.min(40, jdMatch.requiredSkillsMissing.length * 8);
      jdDeductions.push({
        reason: `Missing ${jdMatch.requiredSkillsMissing.length} required skill(s): ${jdMatch.requiredSkillsMissing.join(', ')}`,
        points: deductionPoints,
      });
      jdImprovements.push(`Add observable project or work evidence for missing required skills: ${jdMatch.requiredSkillsMissing.join(', ')}`);
      recommendations.push({
        priority: 'Critical',
        section: 'Skills',
        issue: `Missing required role skills (${jdMatch.requiredSkillsMissing.slice(0, 3).join(', ')})`,
        whyItMatters: 'Applicant Tracking Systems filter out candidates who lack explicit mentions of mandatory job qualifications.',
        howToFix: `If you have worked with these technologies, feature them in your Skills and project bullet points with genuine context.`,
        expectedImpact: '+15 to +25 ATS Alignment Points',
      });
    }

    if (jdMatch.unmatchedResponsibilities.length > 0) {
      jdImprovements.push(`Target role highlights responsibilities not yet supported by evidence: ${jdMatch.unmatchedResponsibilities[0]}`);
    }
  } else {
    jdEvidence.push('General Quality Mode active: No target job description supplied. Score represents baseline ATS quality.');
    jdImprovements.push('Paste a target job description or choose a target role to unlock 30% role-specific keyword and responsibility alignment.');
  }

  const jdDimension: ScoringDimension = {
    id: 'jd-alignment',
    name: 'Job-Description Alignment',
    score: jdScore,
    weightPct: weights.jd,
    weightedScore: Math.round((jdScore * weights.jd) / 100),
    maxWeightedScore: weights.jd,
    observableEvidence: jdEvidence,
    deductions: jdDeductions,
    improvementOpportunities: jdImprovements,
  };

  // -------------------------------------------------------------------------
  // DIMENSION 2: Skills & Qualifications (20% or 28.5%)
  // -------------------------------------------------------------------------
  let skillsScore = 50;
  const skillsEvidence: string[] = [];
  const skillsDeductions: { reason: string; points: number }[] = [];
  const skillsImprovements: string[] = [];

  const distinctCategories = new Set(matchedSkills.map((s) => s.category));
  const explicitMatches = matchedSkills.filter((s) => s.isExplicit);

  if (matchedSkills.length >= 12) skillsScore = 95;
  else if (matchedSkills.length >= 8) skillsScore = 85;
  else if (matchedSkills.length >= 5) skillsScore = 75;
  else if (matchedSkills.length >= 3) skillsScore = 60;
  else skillsScore = 35;

  if (distinctCategories.size >= 4) {
    skillsScore = Math.min(100, skillsScore + 5);
    skillsEvidence.push(`Well-rounded stack spanning ${distinctCategories.size} domains (${Array.from(distinctCategories).join(', ')})`);
  } else if (distinctCategories.size <= 1 && matchedSkills.length > 0) {
    skillsScore = Math.max(30, skillsScore - 10);
    skillsDeductions.push({
      reason: 'Skills are concentrated in only 1 domain. Modern software roles expect cross-functional breadth (e.g. database, version control, testing).',
      points: 10,
    });
  }

  skillsEvidence.push(`Detected ${matchedSkills.length} canonical technical skills (${explicitMatches.length} with explicit section evidence)`);

  // Guard against Keyword Stuffing
  if (stuffedSkills.length > 0) {
    const stuffDeduction = Math.min(25, stuffedSkills.length * 10);
    skillsScore = Math.max(30, skillsScore - stuffDeduction);
    skillsDeductions.push({
      reason: `Keyword stuffing detected for: ${stuffedSkills.join(', ')}. Keywords repeated unnaturally without new context.`,
      points: stuffDeduction,
    });
    recommendations.push({
      priority: 'Important',
      section: 'Skills',
      issue: `Excessive repetition of skills (${stuffedSkills.join(', ')})`,
      whyItMatters: 'ATS parsers and recruiters penalize resumes that artificially repeat keywords instead of demonstrating varied impact.',
      howToFix: 'Mention each core skill 2-3 times max: once in the Skills summary and once or twice in context within project accomplishments.',
      expectedImpact: '+10 Cleanliness Score',
    });
  }

  const skillsDimension: ScoringDimension = {
    id: 'skills',
    name: 'Skills & Qualifications',
    score: skillsScore,
    weightPct: weights.skills,
    weightedScore: Math.round((skillsScore * weights.skills) / 100),
    maxWeightedScore: weights.skills,
    observableEvidence: skillsEvidence,
    deductions: skillsDeductions,
    improvementOpportunities: skillsImprovements,
  };

  // -------------------------------------------------------------------------
  // DIMENSION 3: Experience & Project Relevance (15% or 21.5%)
  // -------------------------------------------------------------------------
  let expScore = 60;
  const expEvidence: string[] = [];
  const expDeductions: { reason: string; points: number }[] = [];
  const expImprovements: string[] = [];

  const hasExp = Boolean(parsing.sections.experience && parsing.sections.experience.content.length > 50);
  const hasProjects = Boolean(parsing.sections.projects && parsing.sections.projects.content.length > 50);

  const expBullets = parsing.sections.experience?.bulletPoints || [];
  const projectBullets = parsing.sections.projects?.bulletPoints || [];
  const totalBullets = expBullets.length + projectBullets.length;

  if (experienceLevel === 'student_fresher') {
    // For students and freshers: evaluate projects, internships, hackathons, and coursework with equal weight!
    if ((hasProjects && projectBullets.length >= 3) || (hasExp && expBullets.length >= 3) || totalBullets >= 4) {
      expScore = 90;
      expEvidence.push(`Substantial project and internship portfolio (${totalBullets} documented bullet points)`);
    } else if (hasProjects || hasExp) {
      expScore = 75;
      expEvidence.push('Demonstrated foundational software development through projects or internships');
    } else {
      expScore = 40;
      expDeductions.push({
        reason: 'Missing both Work Experience and Projects sections. Freshers must showcase at least 2 significant hands-on projects.',
        points: 40,
      });
      recommendations.push({
        priority: 'Critical',
        section: 'Projects',
        issue: 'No technical projects or work experience detected',
        whyItMatters: 'Without professional experience, technical recruiters rely 100% on personal and capstone projects to evaluate ability.',
        howToFix: 'Add a dedicated "Projects" section detailing 2-3 end-to-end applications with live deployment links and GitHub repositories.',
        expectedImpact: '+20 to +30 Score Increase',
      });
    }
  } else {
    // For junior & experienced roles: expects commercial work experience
    if (hasExp && expBullets.length >= 4) {
      expScore = 90;
      expEvidence.push(`Extensive work experience history with ${expBullets.length} descriptive achievement bullets`);
    } else if (hasExp) {
      expScore = 75;
      expEvidence.push('Employment history present with brief descriptions');
    } else if (hasProjects) {
      expScore = 55;
      expDeductions.push({
        reason: 'Experienced candidate profile lacks a dedicated Work Experience section.',
        points: 25,
      });
    } else {
      expScore = 30;
      expDeductions.push({
        reason: 'No documented work experience or technical projects found.',
        points: 45,
      });
    }
  }

  const expDimension: ScoringDimension = {
    id: 'experience-projects',
    name: 'Experience & Project Relevance',
    score: expScore,
    weightPct: weights.exp,
    weightedScore: Math.round((expScore * weights.exp) / 100),
    maxWeightedScore: weights.exp,
    observableEvidence: expEvidence,
    deductions: expDeductions,
    improvementOpportunities: expImprovements,
  };

  // -------------------------------------------------------------------------
  // DIMENSION 4: Impact & Achievements (10% or 14.3%)
  // -------------------------------------------------------------------------
  let impactScore = 55;
  const impactEvidence: string[] = [];
  const impactDeductions: { reason: string; points: number }[] = [];
  const impactImprovements: string[] = [];

  const lowerText = parsing.cleanText.toLowerCase();

  // Count action verbs
  let actionVerbCount = 0;
  const foundVerbs: string[] = [];
  for (const verb of ACTION_VERBS) {
    if (lowerText.includes(verb)) {
      actionVerbCount++;
      foundVerbs.push(verb);
    }
  }

  // Count metrics (percentages, numbers with units)
  const metricMatches = parsing.cleanText.match(/\b\d+(\.\d+)?%|\b\d+x\b|\$\d+(\.\d+)?(k|m|b)?|\b\d+\s*(ms|seconds|min|hours|users|requests|daily|million|k|qps|rps|records)\b/gi) || [];

  if (actionVerbCount >= 5) {
    impactScore += 25;
    impactEvidence.push(`Strong engineering leadership vocabulary: utilizes authoritative action verbs (${foundVerbs.slice(0, 5).join(', ')})`);
  } else if (actionVerbCount >= 3) {
    impactScore += 15;
    impactEvidence.push(`Found ${actionVerbCount} standard action verbs`);
  } else {
    impactDeductions.push({
      reason: 'Sparse usage of action verbs. Bullets appear passive or duty-oriented.',
      points: 15,
    });
    impactImprovements.push('Begin every bullet point with a decisive action verb (e.g. "Architected", "Engineered", "Optimized", "Automated").');
  }

  if (metricMatches.length >= 3) {
    impactScore += 20;
    impactEvidence.push(`Demonstrated measurable business and technical impact (${metricMatches.length} quantifiable metrics detected)`);
  } else if (metricMatches.length >= 1) {
    impactScore += 10;
    impactEvidence.push('Includes baseline metrics');
  } else {
    // DO NOT harshly penalize legitimate work simply because it lacks numbers, but suggest metrics as an improvement
    impactImprovements.push('Quantify accomplishments where possible (e.g., latency cut by X%, test coverage increased by Y%, or Z manual hours saved).');
  }

  impactScore = Math.min(100, Math.max(30, impactScore));

  const impactDimension: ScoringDimension = {
    id: 'impact',
    name: 'Impact & Measurable Achievements',
    score: impactScore,
    weightPct: weights.impact,
    weightedScore: Math.round((impactScore * weights.impact) / 100),
    maxWeightedScore: weights.impact,
    observableEvidence: impactEvidence,
    deductions: impactDeductions,
    improvementOpportunities: impactImprovements,
  };

  // -------------------------------------------------------------------------
  // DIMENSION 5: Structure & Readability (10% or 14.3%)
  // -------------------------------------------------------------------------
  let structScore = 70;
  const structEvidence: string[] = [];
  const structDeductions: { reason: string; points: number }[] = [];
  const structImprovements: string[] = [];

  const recognizedSectionsCount = Object.keys(parsing.sections).length;
  if (recognizedSectionsCount >= 4) {
    structScore += 15;
    structEvidence.push(`Clear structural hierarchy with ${recognizedSectionsCount} distinct standard sections`);
  } else {
    structScore -= 15;
    structDeductions.push({
      reason: 'Fewer than 4 standard resume sections recognized by the parser.',
      points: 15,
    });
  }

  if (parsing.wordCount >= 300 && parsing.wordCount <= 850) {
    structScore += 15;
    structEvidence.push(`Optimal document length (${parsing.wordCount} words; ideal for a 1-2 page engineering resume)`);
  } else if (parsing.wordCount < 180) {
    structScore -= 30;
    structDeductions.push({
      reason: `Resume is unusually sparse (${parsing.wordCount} words). A standard 1-page resume contains 350-650 words.`,
      points: 30,
    });
    formattingIssues.push(`Word count (${parsing.wordCount} words) is below typical candidate benchmarks.`);
  }

  if (parsing.dateConsistencyIssues.length > 0) {
    structScore -= 10;
    for (const issue of parsing.dateConsistencyIssues) {
      structDeductions.push({ reason: issue, points: 5 });
      formattingIssues.push(issue);
    }
  }

  structScore = Math.min(100, Math.max(30, structScore));

  const structDimension: ScoringDimension = {
    id: 'structure',
    name: 'Structure & Readability',
    score: structScore,
    weightPct: weights.struct,
    weightedScore: Math.round((structScore * weights.struct) / 100),
    maxWeightedScore: weights.struct,
    observableEvidence: structEvidence,
    deductions: structDeductions,
    improvementOpportunities: structImprovements,
  };

  // -------------------------------------------------------------------------
  // DIMENSION 6: ATS Compatibility & Parsing Safety (10% or 14.3%)
  // -------------------------------------------------------------------------
  let atsScore = parsing.extractionQualityScore;
  const atsEvidence: string[] = [];
  const atsDeductions: { reason: string; points: number }[] = [];
  const atsImprovements: string[] = [];

  if (parsing.isScanned) {
    atsScore = 15;
    atsDeductions.push({
      reason: 'Image-only or scanned PDF detected. Most enterprise ATS engines cannot parse text inside images.',
      points: 75,
    });
    recommendations.push({
      priority: 'Critical',
      section: 'Layout',
      issue: 'Scanned image-only PDF requires OCR',
      whyItMatters: 'Commercial ATS scanners (Workday, Taleo, Greenhouse) cannot extract text from image PDFs, resulting in instant rejection.',
      howToFix: 'Export your resume directly as a clean PDF from Google Docs, Word, or LaTeX so that text remains digitally selectable.',
      expectedImpact: '+50 ATS Readability Points',
    });
  } else if (parsing.confidence === 'High') {
    atsEvidence.push('Flawless digital text layer: 100% extractable character streams without encoding artifacts');
  }

  // Check contact information completeness
  let contactPoints = 0;
  if (parsing.links.email) contactPoints += 30;
  if (parsing.links.phone) contactPoints += 30;
  if (parsing.links.linkedIn) contactPoints += 20;
  if (parsing.links.github || parsing.links.portfolio) contactPoints += 20;

  if (contactPoints >= 80) {
    atsEvidence.push('Comprehensive header metadata (Email, Phone, Professional Social Profiles)');
  } else {
    atsDeductions.push({
      reason: 'Missing one or more essential contact links (LinkedIn, GitHub, or Phone).',
      points: 15,
    });
    recommendations.push({
      priority: 'Important',
      section: 'Contact',
      issue: 'Incomplete professional links in header',
      whyItMatters: 'Technical recruiters verify coding portfolios and professional history via GitHub and LinkedIn.',
      howToFix: 'Include clickable hyperlinks to your LinkedIn profile and active GitHub portfolio in your header contact line.',
      expectedImpact: '+10 to Contact Score',
    });
  }

  atsScore = Math.min(100, Math.max(15, Math.round(atsScore * 0.7 + contactPoints * 0.3)));

  const atsDimension: ScoringDimension = {
    id: 'ats-compatibility',
    name: 'ATS Compatibility & Parsing Safety',
    score: atsScore,
    weightPct: weights.ats,
    weightedScore: Math.round((atsScore * weights.ats) / 100),
    maxWeightedScore: weights.ats,
    observableEvidence: atsEvidence,
    deductions: atsDeductions,
    improvementOpportunities: atsImprovements,
  };

  // -------------------------------------------------------------------------
  // DIMENSION 7: Education & Relevant Credentials (5% or 7.1%)
  // -------------------------------------------------------------------------
  let eduScore = 50;
  const eduEvidence: string[] = [];
  const eduDeductions: { reason: string; points: number }[] = [];
  const eduImprovements: string[] = [];

  const hasEdu = Boolean(parsing.sections.education && parsing.sections.education.content.length > 25);
  const lowerEdu = (parsing.sections.education?.content || parsing.cleanText).toLowerCase();

  const hasDegree = /bachelor|master|b\.tech|b\.e\.|b\.s\.|m\.s\.|m\.tech|phd|diploma/i.test(lowerEdu);
  const hasCsField = /computer\s+science|information\s+technology|software|engineering|mathematics|electronics/i.test(lowerEdu);
  const hasYear = /\b(20\d{2}|19\d{2})\b/.test(lowerEdu);

  if (hasEdu) {
    eduScore += 20;
    eduEvidence.push('Dedicated Education section identified');
  } else {
    eduDeductions.push({ reason: 'Missing dedicated Education section header.', points: 25 });
  }

  if (hasDegree) {
    eduScore += 15;
    eduEvidence.push('Recognized academic degree title');
  }

  if (hasCsField) {
    eduScore += 10;
    eduEvidence.push('Field of study directly aligns with technical computer science curriculum');
  }

  if (hasYear) {
    eduScore += 5;
    eduEvidence.push('Graduation year explicitly stated');
  }

  eduScore = Math.min(100, Math.max(30, eduScore));

  const eduDimension: ScoringDimension = {
    id: 'education',
    name: 'Education & Relevant Credentials',
    score: eduScore,
    weightPct: weights.edu,
    weightedScore: Math.round((eduScore * weights.edu) / 100),
    maxWeightedScore: weights.edu,
    observableEvidence: eduEvidence,
    deductions: eduDeductions,
    improvementOpportunities: eduImprovements,
  };

  // -------------------------------------------------------------------------
  // OVERALL AGGREGATED SCORE
  // -------------------------------------------------------------------------
  const totalWeighted = 
    jdDimension.weightedScore +
    skillsDimension.weightedScore +
    expDimension.weightedScore +
    impactDimension.weightedScore +
    structDimension.weightedScore +
    atsDimension.weightedScore +
    eduDimension.weightedScore;

  const overallScore = Math.min(100, Math.max(0, Math.round(totalWeighted)));

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'C';
  if (overallScore >= 88) grade = 'A+';
  else if (overallScore >= 78) grade = 'A';
  else if (overallScore >= 66) grade = 'B';
  else if (overallScore >= 52) grade = 'C';
  else grade = 'D';

  const sectionSuggestions: ResumeAnalysisResult['section_suggestions'] = {
    contact: [
      parsing.links.linkedIn ? 'LinkedIn profile verified.' : 'Add your LinkedIn profile link to header.',
      parsing.links.github ? 'GitHub profile verified.' : 'Add your GitHub profile link to header.',
    ],
    experience: expImprovements.length > 0 ? expImprovements : ['Use Google XYZ formula for all bullet points.'],
    skills: skillsImprovements.length > 0 ? skillsImprovements : ['Group skills into Languages, Frameworks, Databases, and Tools.'],
    projects: [
      'Include live URLs and open source repository links for your top 2 projects.',
      'Highlight system architecture choices (e.g. database indexing, caching, asynchronous workers).',
    ],
    education: [
      'Ensure graduation year and degree title are clearly stated.',
      'List relevant CS coursework (Algorithms, Operating Systems, DBMS) if applying as a fresher.',
    ],
  };

  return {
    overallScore,
    grade,
    isGeneralQualityScore: isGeneral,
    dimensions: {
      jobDescriptionAlignment: jdDimension,
      skillsAndQualifications: skillsDimension,
      experienceAndProjects: expDimension,
      impactAndAchievements: impactDimension,
      structureAndReadability: structDimension,
      atsCompatibility: atsDimension,
      educationAndCredentials: eduDimension,
    },
    recommendations,
    formattingIssues: formattingIssues.length > 0 ? formattingIssues : ['No critical formatting blockers detected. Clean ATS-friendly layout!'],
    sectionSuggestions,
  };
}
