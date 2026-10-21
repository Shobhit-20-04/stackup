/**
 * StackUp ATS Resume Checker Types
 * Modular, explainable 7-dimension scoring and parsing types.
 */

export type ExperienceLevel = 'student_fresher' | 'junior' | 'mid_senior';

export type RoleType = 'technical' | 'non_technical';

export type ConfidenceRating = 'High' | 'Medium' | 'Low' | 'Scanned/OCR Required';

export interface ExternalResource {
  title: string;
  url: string;
  provider: string;
  isFree: true;
}

export interface ExtractedSection {
  title: string;
  content: string;
  bulletPoints: string[];
}

export interface ParsingReport {
  text: string;
  cleanText: string;
  filename: string;
  fileSizeBytes: number;
  mimeType: string;
  pageCount: number;
  wordCount: number;
  characterCount: number;
  isScanned: boolean;
  isEncrypted: boolean;
  hasEncodingIssues: boolean;
  extractionQualityScore: number; // 0 - 100
  confidence: ConfidenceRating;
  detectedLayoutWarnings: string[];
  sections: {
    contact?: ExtractedSection;
    summary?: ExtractedSection;
    experience?: ExtractedSection;
    education?: ExtractedSection;
    projects?: ExtractedSection;
    skills?: ExtractedSection;
    certifications?: ExtractedSection;
  };
  detectedDates: {
    raw: string;
    normalized?: string;
  }[];
  dateConsistencyIssues: string[];
  links: {
    email?: string;
    phone?: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
    otherUrls: string[];
  };
}

export interface MatchedSkill {
  name: string;
  category: string;
  matchedAs: string; // The exact alias or keyword found
  context: string;   // Sentence or bullet where it appeared
  isExplicit: boolean; // In Skills or Experience section
}

export interface JobDescriptionMatch {
  hasJobDescription: boolean;
  targetRoleTitle?: string;
  jobDescriptionText?: string;
  requiredSkillsMatched: MatchedSkill[];
  requiredSkillsMissing: string[];
  preferredSkillsMatched: MatchedSkill[];
  preferredSkillsMissing: string[];
  keywordGaps: string[];
  matchedResponsibilities: {
    responsibility: string;
    evidenceContext: string;
  }[];
  unmatchedResponsibilities: string[];
  qualificationGaps: string[];
  matchScore: number; // 0 - 100
}

export interface ScoringDimension {
  id: string;
  name: string;
  score: number;       // 0 - 100 for this dimension
  weightPct: number;   // Configured weight percentage (e.g. 30 for 30%)
  weightedScore: number; // (score * weightPct) / 100
  maxWeightedScore: number; // weightPct
  observableEvidence: string[];
  deductions: {
    reason: string;
    points: number;
  }[];
  improvementOpportunities: string[];
}

export interface BulletRewrite {
  original: string;
  improved: string;
  reason: string;
  formula: 'XYZ';
  placeholderMetrics: string[];
}

export interface Recommendation {
  priority: 'Critical' | 'Important' | 'Optional';
  section: 'Contact' | 'Skills' | 'Experience' | 'Projects' | 'Education' | 'Layout';
  issue: string;
  whyItMatters: string;
  howToFix: string;
  expectedImpact: string;
}

export interface ResumeAnalysisResult {
  filename: string;
  ats_score: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  isGeneralQualityScore: boolean; // true when no JD supplied
  disclaimer: string;
  experienceLevel: ExperienceLevel;
  parsingReport: ParsingReport;
  jobDescriptionMatch: JobDescriptionMatch;
  dimensions: {
    jobDescriptionAlignment: ScoringDimension; // 30%
    skillsAndQualifications: ScoringDimension; // 20%
    experienceAndProjects: ScoringDimension;   // 15%
    impactAndAchievements: ScoringDimension;   // 10%
    structureAndReadability: ScoringDimension; // 10%
    atsCompatibility: ScoringDimension;        // 10%
    educationAndCredentials: ScoringDimension; // 5%
  };
  summary: string;
  matched_keywords: string[];
  missing_keywords: string[];
  keyword_stuffing_detected: boolean;
  formatting_issues: string[];
  recommendations: Recommendation[];
  section_suggestions: {
    contact: string[];
    experience: string[];
    skills: string[];
    projects: string[];
    education: string[];
  };
  bullet_rewrites: BulletRewrite[];
  // Backwards-compatible breakdown for existing UI and tests
  breakdown: {
    contact_score: number;
    experience_score: number;
    skills_score: number;
    formatting_score: number;
  };
}

export interface ResumeAnalysisInput {
  text?: string;
  fileBuffer?: Buffer;
  filename: string;
  fileExt?: string;
  mimeType?: string;
  jobDescription?: string;
  targetRole?: string;
  experienceLevel?: ExperienceLevel;
}
