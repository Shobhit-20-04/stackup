import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/services/rate-limit';
import { createClient } from '@/lib/supabase/server';
import type { Json } from '@/lib/types/database';
import mammoth from 'mammoth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Polyfills for Node.js PDF.js environment
if (typeof (globalThis as unknown as { DOMMatrix: unknown }).DOMMatrix === 'undefined') {
  (globalThis as unknown as { DOMMatrix: unknown }).DOMMatrix = class DOMMatrix {};
}
if (typeof (globalThis as unknown as { ImageData: unknown }).ImageData === 'undefined') {
  (globalThis as unknown as { ImageData: unknown }).ImageData = class ImageData {};
}
if (typeof (globalThis as unknown as { Path2D: unknown }).Path2D === 'undefined') {
  (globalThis as unknown as { Path2D: unknown }).Path2D = class Path2D {};
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Comprehensive Technical Skills Ontology with canonical patterns and aliases
const SKILL_ONTOLOGY: { name: string; category: string; regex: RegExp }[] = [
  // Languages
  { name: 'JavaScript', category: 'Languages', regex: /\bjavascript\b|\bjs\b/i },
  { name: 'TypeScript', category: 'Languages', regex: /\btypescript\b|\bts\b/i },
  { name: 'Python', category: 'Languages', regex: /\bpython\b/i },
  { name: 'Java', category: 'Languages', regex: /\bjava\b(?!script)/i },
  { name: 'C++', category: 'Languages', regex: /c\+\+|\bcpp\b/i },
  { name: 'C', category: 'Languages', regex: /\bc\b(?!\+\+|#)/ },
  { name: 'C#', category: 'Languages', regex: /c#|\bcsharp\b/i },
  { name: 'Go', category: 'Languages', regex: /\bgo\b|\bgolang\b/i },
  { name: 'Rust', category: 'Languages', regex: /\brust\b/i },
  { name: 'SQL', category: 'Languages', regex: /\bsql\b/i },
  { name: 'HTML5/CSS3', category: 'Languages', regex: /\bhtml5?\b|\bcss3?\b/i },
  { name: 'PHP', category: 'Languages', regex: /\bphp\b/i },
  { name: 'Ruby', category: 'Languages', regex: /\bruby\b/i },
  { name: 'Kotlin', category: 'Languages', regex: /\bkotlin\b/i },
  { name: 'Swift', category: 'Languages', regex: /\bswift\b/i },

  // Frontend
  { name: 'React', category: 'Frontend', regex: /\breact(\.js)?\b/i },
  { name: 'Next.js', category: 'Frontend', regex: /\bnext(\.js)?\b/i },
  { name: 'Vue.js', category: 'Frontend', regex: /\bvue(\.js)?\b/i },
  { name: 'Angular', category: 'Frontend', regex: /\bangular\b/i },
  { name: 'Tailwind CSS', category: 'Frontend', regex: /\btailwind(css)?\b/i },
  { name: 'Redux', category: 'Frontend', regex: /\bredux\b/i },
  { name: 'GraphQL', category: 'Frontend', regex: /\bgraphql\b/i },

  // Backend & APIs
  { name: 'Node.js', category: 'Backend', regex: /\bnode(\.js)?\b/i },
  { name: 'Express.js', category: 'Backend', regex: /\bexpress(\.js)?\b/i },
  { name: 'Django', category: 'Backend', regex: /\bdjango\b/i },
  { name: 'FastAPI', category: 'Backend', regex: /\bfastapi\b/i },
  { name: 'Flask', category: 'Backend', regex: /\bflask\b/i },
  { name: 'Spring Boot', category: 'Backend', regex: /\bspring(\s+boot)?\b/i },
  { name: 'REST APIs', category: 'Backend', regex: /\brest(ful)?(\s+apis?)?\b/i },
  { name: 'Microservices', category: 'Backend', regex: /\bmicroservices?\b/i },
  { name: 'WebSockets', category: 'Backend', regex: /\bwebsockets?\b/i },
  { name: 'gRPC', category: 'Backend', regex: /\bgrpc\b/i },

  // Databases & Storage
  { name: 'PostgreSQL', category: 'Database', regex: /\bpostgres(ql)?\b/i },
  { name: 'MongoDB', category: 'Database', regex: /\bmongo(db)?\b/i },
  { name: 'Redis', category: 'Database', regex: /\bredis\b/i },
  { name: 'MySQL', category: 'Database', regex: /\bmysql\b/i },
  { name: 'Supabase', category: 'Database', regex: /\bsupabase\b/i },
  { name: 'Firebase', category: 'Database', regex: /\bfirebase\b/i },
  { name: 'Elasticsearch', category: 'Database', regex: /\belasticsearch\b/i },

  // Cloud & DevOps
  { name: 'Docker', category: 'DevOps', regex: /\bdocker\b/i },
  { name: 'Kubernetes', category: 'DevOps', regex: /\bkubernetes\b|\bk8s\b/i },
  { name: 'AWS', category: 'DevOps', regex: /\baws\b|amazon web services/i },
  { name: 'GCP', category: 'DevOps', regex: /\bgcp\b|google cloud/i },
  { name: 'Azure', category: 'DevOps', regex: /\bazure\b/i },
  { name: 'Git', category: 'DevOps', regex: /\bgit\b|\bgithub\b|\bgitlab\b/i },
  { name: 'CI/CD', category: 'DevOps', regex: /\bci\/cd\b|continuous integration|github actions/i },
  { name: 'Linux', category: 'DevOps', regex: /\blinux\b|\bunix\b/i },

  // Architecture & CS Fundamentals
  { name: 'Data Structures & Algorithms', category: 'Core CS', regex: /data structures|algorithms|\bdsa\b/i },
  { name: 'System Design', category: 'Core CS', regex: /system design|distributed systems/i },
  { name: 'OOP', category: 'Core CS', regex: /object-oriented|\boop\b|design patterns/i },
  { name: 'Unit Testing', category: 'Testing', regex: /unit test|vitest|jest|junit|testing/i },
];

const ACTION_VERBS = [
  'architected', 'spearheaded', 'engineered', 'implemented', 'optimized',
  'developed', 'designed', 'deployed', 'automated', 'reduced', 'scaled',
  'increased', 'built', 'integrated', 'refactored', 'streamlined',
  'orchestrated', 'accelerated', 'collaborated', 'migrated', 'configured',
  'monitored', 'secured', 'delivered', 'established', 'benchmarked'
];

interface AnalysisOutput {
  filename: string;
  ats_score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    contact_score: number;
    experience_score: number;
    skills_score: number;
    formatting_score: number;
  };
  summary: string;
  matched_keywords: string[];
  missing_keywords: string[];
  formatting_issues: string[];
  section_suggestions: {
    contact: string[];
    experience: string[];
    skills: string[];
    projects: string[];
  };
  bullet_rewrites: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

export function analyzeResumeLocally(text: string, filename: string): AnalysisOutput {
  const lower = text.toLowerCase();

  // 1. Contact Information Detection
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/.test(text);
  const hasLinkedIn = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i.test(text) || text.includes('linkedin');
  const hasGitHub = /github\.com\/[a-zA-Z0-9_-]+/i.test(text) || text.includes('github');
  const hasPortfolio = /portfolio|https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i.test(text);

  let contactScore = 30;
  if (hasEmail) contactScore += 25;
  if (hasPhone) contactScore += 20;
  if (hasLinkedIn) contactScore += 15;
  if (hasGitHub || hasPortfolio) contactScore += 10;
  contactScore = Math.min(100, Math.max(30, contactScore));

  // 2. Technical Skills Matching (from comprehensive ontology)
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const skill of SKILL_ONTOLOGY) {
    if (skill.regex.test(text)) {
      if (!matchedKeywords.includes(skill.name)) {
        matchedKeywords.push(skill.name);
      }
    } else {
      if (!missingKeywords.includes(skill.name)) {
        missingKeywords.push(skill.name);
      }
    }
  }

  // Realistic skills curve: 14+ skills = 100%, 10 = 90%, 7 = 80%, 4 = 65%
  let skillsScore = 40;
  if (matchedKeywords.length >= 14) skillsScore = 100;
  else if (matchedKeywords.length >= 10) skillsScore = 90 + Math.round((matchedKeywords.length - 10) * 2.5);
  else if (matchedKeywords.length >= 7) skillsScore = 80 + Math.round((matchedKeywords.length - 7) * 3);
  else if (matchedKeywords.length >= 4) skillsScore = 65 + Math.round((matchedKeywords.length - 4) * 4);
  else skillsScore = 35 + matchedKeywords.length * 8;
  skillsScore = Math.min(100, Math.max(30, skillsScore));

  // 3. Work Experience & Impact (metrics, scale, and strong action verbs)
  const metricMatches = text.match(/\b\d+(\.\d+)?%|\b\d+x\b|\$\d+(\.\d+)?(k|m|b)?|\b\d+\s*(ms|seconds|min|hours|users|requests|daily|million|k|qps|rps|records)\b|\bcgpa:?\s*\d+(\.\d+)?/gi) || [];
  const numbersOrPercentages = metricMatches.length;

  let actionVerbCount = 0;
  for (const verb of ACTION_VERBS) {
    if (lower.includes(verb)) {
      actionVerbCount += 1;
    }
  }

  let experienceScore = 50;
  if (numbersOrPercentages >= 4) experienceScore += 28;
  else if (numbersOrPercentages >= 2) experienceScore += 20;
  else if (numbersOrPercentages >= 1) experienceScore += 12;

  if (actionVerbCount >= 5) experienceScore += 22;
  else if (actionVerbCount >= 3) experienceScore += 15;
  else if (actionVerbCount >= 1) experienceScore += 8;
  experienceScore = Math.min(100, Math.max(35, experienceScore));

  // 4. Formatting & Structure
  const hasExpHeader = /experience|employment|work history|internship/i.test(text);
  const hasEduHeader = /education|university|college|bachelor|degree|academic/i.test(text);
  const hasSkillsHeader = /skills|technical skills|technologies|tools/i.test(text);
  const hasProjectsHeader = /projects|personal projects|key projects/i.test(text);

  let formattingScore = 60;
  const formattingIssues: string[] = [];

  if (!hasExpHeader) {
    formattingIssues.push('Missing explicit "Work Experience" or "Internships" section header');
  } else {
    formattingScore += 10;
  }

  if (!hasEduHeader) {
    formattingIssues.push('Missing explicit "Education" section header');
  } else {
    formattingScore += 10;
  }

  if (!hasSkillsHeader) {
    formattingIssues.push('Missing dedicated "Technical Skills" section');
  } else {
    formattingScore += 10;
  }

  if (!hasProjectsHeader) {
    formattingIssues.push('Consider adding a prominent "Projects" section to demonstrate hands-on software development');
  } else {
    formattingScore += 10;
  }

  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 120) {
    formattingIssues.push('Resume content appears unusually brief (< 120 words). Standard 1-page resumes typically contain 350-700 words.');
    formattingScore = Math.max(30, formattingScore - 25);
  } else if (wordCount >= 300) {
    formattingScore = Math.min(100, formattingScore + 5);
  }

  formattingScore = Math.min(100, Math.max(30, formattingScore));

  // Overall ATS Score calculation (Calibrated weights)
  const overallAts = Math.round(
    contactScore * 0.15 +
    skillsScore * 0.35 +
    experienceScore * 0.35 +
    formattingScore * 0.15
  );

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'C';
  if (overallAts >= 88) grade = 'A+';
  else if (overallAts >= 78) grade = 'A';
  else if (overallAts >= 66) grade = 'B';
  else if (overallAts >= 52) grade = 'C';
  else grade = 'D';

  // Contextual bullet rewrites based on detected technologies
  const primaryTech = matchedKeywords[0] || 'Node.js';
  const secondaryTech = matchedKeywords[1] || 'PostgreSQL';

  const bulletRewrites = [
    {
      original: 'Worked on backend APIs and helped fix database query performance issues.',
      improved: `Architected scalable RESTful microservices in ${primaryTech} and ${secondaryTech}, indexing slow queries to reduce p95 latency by 44% across 250k daily active requests.`,
      reason: 'Replaces generic passive phrasing with strong engineering action verbs and quantifiable latency metrics.',
    },
    {
      original: 'Built user interface components and integrated them with frontend endpoints.',
      improved: `Engineered responsive, accessible UI modules in ${matchedKeywords.includes('React') ? 'React and TypeScript' : 'modern frontend frameworks'}, improving Lighthouse performance score to 98+ and boosting user conversion by 28%.`,
      reason: 'Demonstrates user impact, performance optimization, and industry accessibility standards.',
    },
  ];

  return {
    filename,
    ats_score: overallAts,
    grade,
    breakdown: {
      contact_score: contactScore,
      experience_score: experienceScore,
      skills_score: skillsScore,
      formatting_score: formattingScore,
    },
    summary: `Your resume scored ${overallAts}/100 (Grade ${grade}). It matched ${matchedKeywords.length} top technical skills with strong alignment for modern software engineering roles. ${
      numbersOrPercentages >= 2
        ? 'Your experience bullets demonstrate impressive measurable impact and business outcomes.'
        : 'To maximize interview callback rates, quantify more bullets with concrete metrics (e.g., % latency reduction, daily active users, or throughput gains).'
    }`,
    matched_keywords: matchedKeywords.slice(0, 18),
    missing_keywords: missingKeywords.slice(0, 8),
    formatting_issues: formattingIssues.length > 0 ? formattingIssues : ['No critical formatting blockers detected. Clean ATS-friendly layout!'],
    section_suggestions: {
      contact: hasLinkedIn && hasGitHub 
        ? ['Header includes comprehensive links (Email, Phone, LinkedIn, GitHub).'] 
        : ['Add direct clickable hyperlinks to your LinkedIn and active GitHub portfolio profile.'],
      experience: [
        'Structure all bullet points using Google\'s XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".',
        'Lead each bullet with an active verb (e.g. "Architected", "Engineered", "Optimized", "Automated").',
        'Incorporate quantifiable engineering metrics: latency cuts, throughput, test coverage %, or cloud cost savings.'
      ],
      skills: [
        `High-demand keywords to consider adding if applicable: ${missingKeywords.slice(0, 5).join(', ')}.`,
        'Organize skills into logical sub-categories: Languages, Frameworks, Databases, DevOps & Tools.'
      ],
      projects: [
        'Include live deployment links and public GitHub repositories for your top 2 featured projects.',
        'Explicitly state system design choices: architecture patterns, database indexing, and CI/CD automation.'
      ],
    },
    bullet_rewrites: bulletRewrites,
  };
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`resume-${ip}`, 20, 60 * 1000); // 20 requests/min
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Please wait ${rateCheck.resetInSeconds} seconds before re-analyzing.` },
        { status: 429 }
      );
    }

    // 2. Authentication Check: User must be logged in to analyze and store resumes
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const sessionCookie = req.cookies.get('stackup_session')?.value;
    let localUserId: string | null = null;
    let localUserEmail: string | null = null;
    if (sessionCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(sessionCookie));
        if (parsed?.id) {
          localUserId = parsed.id;
          localUserEmail = parsed.email || null;
        }
      } catch {
        // session parse ignored
      }
    }

    const effectiveUserId = user?.id || localUserId;
    const effectiveEmail = user?.email || localUserEmail;

    if (!effectiveUserId) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in or register an account before analyzing your resume.' },
        { status: 401 }
      );
    }

    let resumeText = '';
    let filename = 'Uploaded_Resume.pdf';
    let fileSize: number | null = null;
    let mimeType: string | null = null;
    let fileDataBase64: string | null = null;

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json(
          { error: 'A valid resume file (.pdf, .docx, or .txt) upload is mandatory.' },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File size exceeds the 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload a smaller file.` },
          { status: 400 }
        );
      }

      filename = file.name;
      fileSize = file.size;
      const lowerName = filename.toLowerCase();

      // Read file buffer once for both text extraction and persistent binary storage
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      fileDataBase64 = fileBuffer.toString('base64');

      if (lowerName.endsWith('.pdf')) {
        mimeType = file.type || 'application/pdf';
        try {
          const uint8 = new Uint8Array(fileBuffer);
          // Use modern PDFParse constructor for pdf-parse 2.x with options object
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const { PDFParse } = require('pdf-parse');
          const parser = new PDFParse({ data: uint8 });
          const pdfData = await parser.getText();
          resumeText = pdfData?.text ? pdfData.text.trim() : '';
          try {
            await parser.destroy();
          } catch {
            // ignore
          }
        } catch (pdfErr) {
          console.warn('PDFParse primary extraction notice:', pdfErr);
        }

        // Secondary fallback: Clean string parsing if primary extractor was unavailable
        if (!resumeText || resumeText.length < 50) {
          try {
            const textStream = fileBuffer.toString('latin1');
            const parenthesized = textStream.match(/\(([^)]+)\)/g);
            if (parenthesized && parenthesized.length >= 3) {
              resumeText = parenthesized
                .map((m) => m.slice(1, -1).trim())
                .filter((s) => s.length > 2 && !s.startsWith('/') && !s.startsWith('Length'))
                .join(' ');
            }
          } catch {
            // Keep existing
          }
        }

        // Sanitize any residual PDF operator bytecode tokens
        if (resumeText && (resumeText.includes('/Length') || resumeText.includes('stream\nBT') || resumeText.includes('endstream'))) {
          const textMatches = resumeText.match(/\(([^)]+)\)/g);
          if (textMatches && textMatches.length >= 2) {
            resumeText = textMatches.map((m) => m.slice(1, -1).trim()).join('\n\n');
          }
        }
      } else if (lowerName.endsWith('.docx')) {
        mimeType = file.type || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        try {
          const docxResult = await mammoth.extractRawText({ buffer: fileBuffer });
          resumeText = (docxResult && docxResult.value) ? docxResult.value.trim() : '';
        } catch (docxErr) {
          console.warn('Mammoth docx parsing notice:', docxErr);
        }
      } else if (lowerName.endsWith('.txt')) {
        mimeType = file.type || 'text/plain';
        resumeText = fileBuffer.toString('utf-8');
      } else {
        return NextResponse.json(
          { error: 'Unsupported file format. Please upload a PDF (.pdf) or Word (.docx) document.' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'A valid resume file (.pdf, .docx, or .txt) upload is mandatory.' },
        { status: 400 }
      );
    }

    if (!resumeText || resumeText.trim().length < 40) {
      return NextResponse.json(
        { error: 'Unable to extract legible text from this document. Please ensure your PDF or Word document contains selectable text and is not an image-only scan.' },
        { status: 400 }
      );
    }

    // 2. Perform High-Precision ATS Analysis
    const analysis: AnalysisOutput = analyzeResumeLocally(resumeText, filename);

    // 3. Store uploaded resume and analysis permanently in database
    try {
      // Extract candidate email if present in resume text or authenticated session
      const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const detectedEmail = effectiveEmail || (emailMatch ? emailMatch[0] : null);

      // Store in uploaded_resumes table (accessible to admin dashboard)
      await (supabase.from('uploaded_resumes') as unknown as {
        insert: (data: Record<string, unknown>) => Promise<unknown>;
      }).insert({
        filename: analysis.filename,
        file_size: fileSize,
        mime_type: mimeType,
        resume_text: resumeText,
        ats_score: analysis.ats_score,
        analysis: analysis as unknown as Json,
        user_id: effectiveUserId,
        user_email: detectedEmail,
        ip_address: ip,
        file_data: fileDataBase64,
      });

      // Also record in resume_analyses table for user profile history
      if (effectiveUserId) {
        await (supabase.from('resume_analyses') as unknown as {
          insert: (data: Record<string, unknown>) => Promise<unknown>;
        }).insert({
          user_id: effectiveUserId,
          filename: analysis.filename,
          ats_score: analysis.ats_score,
          feedback: analysis as unknown as Json,
          resume_text: resumeText,
        });
      }
    } catch (dbErr) {
      console.warn('Note: Storing resume in database encountered an issue:', dbErr);
    }

    return NextResponse.json(analysis);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
