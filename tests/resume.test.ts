import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../src/lib/services/rate-limit';
import { analyzeResumeLocally } from '../src/app/api/resume-analysis/route';
import { 
  analyzeResumeText, 
  extractSkillsWithEvidence, 
  matchJobDescription, 
  TARGET_ROLE_PRESETS 
} from '../src/lib/services/resume';

describe('Resume ATS Diagnostics & Rate Limiting', () => {
  it('enforces token-bucket rate limiting correctly', () => {
    const testId = `test-client-${Date.now()}`;
    
    // First 5 requests should pass with limit of 5
    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(testId, 5, 10000);
      expect(res.allowed).toBe(true);
      expect(res.remaining).toBe(4 - i);
    }

    // 6th request must be rejected
    const blocked = checkRateLimit(testId, 5, 10000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetInSeconds).toBeGreaterThan(0);
  });

  it('accurately parses technical resume and calculates ATS scores in General Quality Mode', () => {
    const sampleResume = `
      John Doe
      Email: john.doe@example.com
      Phone: (555) 123-4567
      LinkedIn: linkedin.com/in/johndoe
      GitHub: github.com/johndoe

      Education
      Bachelor of Science in Computer Science, University of Technology, 2024

      Technical Skills
      Languages: Python, TypeScript, JavaScript, SQL, C++, Go
      Frontend: React, Next.js, Tailwind CSS
      Backend: Node.js, Express.js, PostgreSQL, Redis, Supabase
      DevOps: Docker, Kubernetes, AWS, Git, CI/CD

      Work Experience
      Software Engineer Intern | Acme Corp (June 2023 - Present)
      - Architected distributed microservices reducing API latency by 45% for 200k daily active users.
      - Engineered real-time notification service using WebSockets and Redis pub/sub.
      - Automated CI/CD deployment pipelines using GitHub Actions, cutting release cycles by 60%.
      - Optimized database queries in PostgreSQL, improving throughput from 500 to 4500 QPS.

      Key Projects
      Distributed Task Scheduler
      - Implemented fault-tolerant consensus worker pool using Go and gRPC.
    `;

    const result = analyzeResumeLocally(sampleResume, 'John_Doe_Resume.pdf');
    expect(result.filename).toBe('John_Doe_Resume.pdf');
    expect(result.ats_score).toBeGreaterThanOrEqual(75);
    expect(result.grade).toMatch(/^(A\+|A|B)$/);
    expect(result.isGeneralQualityScore).toBe(true);
    expect(result.breakdown.contact_score).toBeGreaterThanOrEqual(80);
    expect(result.breakdown.skills_score).toBeGreaterThanOrEqual(80);
    expect(result.breakdown.experience_score).toBeGreaterThanOrEqual(75);
    expect(result.matched_keywords).toContain('Python');
    expect(result.matched_keywords).toContain('React');
    expect(result.matched_keywords).toContain('PostgreSQL');
    expect(result.matched_keywords).toContain('Docker');
    expect(result.matched_keywords.length).toBeGreaterThanOrEqual(10);
    expect(Array.isArray(result.bullet_rewrites)).toBe(true);
    expect(result.bullet_rewrites.length).toBeGreaterThan(0);
    expect(result.dimensions.skillsAndQualifications.score).toBeGreaterThanOrEqual(80);
    expect(result.dimensions.atsCompatibility.score).toBeGreaterThanOrEqual(80);
  });

  it('flags missing sections and low scores for sparse resumes', () => {
    const sparseResume = `
      Some Name
      Did basic stuff in office.
      Talked to people and helped with filing.
    `;

    const result = analyzeResumeLocally(sparseResume, 'Sparse_Resume.pdf');
    expect(result.ats_score).toBeLessThan(65);
    expect(result.formatting_issues.length).toBeGreaterThan(0);
    expect(result.matched_keywords.length).toBe(0);
    expect(result.dimensions.structureAndReadability.score).toBeLessThan(60);
  });
});

describe('Skills Ontology Normalization & Collision Prevention', () => {
  it('resolves common aliases without false collisions', () => {
    const textWithAliases = `
      Technical Skills
      Languages: JS, TS, Golang, CPP
      DevOps: K8s, Git
    `;
    const { matchedSkills } = extractSkillsWithEvidence(textWithAliases);
    const skillNames = matchedSkills.map((s) => s.name);

    expect(skillNames).toContain('JavaScript');
    expect(skillNames).toContain('TypeScript');
    expect(skillNames).toContain('Go');
    expect(skillNames).toContain('C++');
    expect(skillNames).toContain('Kubernetes');
  });

  it('strictly prevents false collisions with negative lookaheads', () => {
    // 1. "JavaScript" should NOT trigger a match for "Java"
    const textOnlyJs = 'I am an expert in JavaScript and Next.js web application architecture.';
    const resJs = extractSkillsWithEvidence(textOnlyJs);
    const namesJs = resJs.matchedSkills.map((s) => s.name);
    expect(namesJs).toContain('JavaScript');
    expect(namesJs).not.toContain('Java');

    // 2. "C++" and "C#" should NOT mistakenly trigger standalone "C"
    const textCpp = 'Designed high-performance graphics engines in C++ and C# .NET.';
    const resCpp = extractSkillsWithEvidence(textCpp);
    const namesCpp = resCpp.matchedSkills.map((s) => s.name);
    expect(namesCpp).toContain('C++');
    expect(namesCpp).toContain('C#');
    expect(namesCpp).not.toContain('C');

    // 3. Substrings inside common English words like "trust" or "gospel" should NOT match "Rust" or "Go"
    const textFalseSubstrings = 'We trust our team to produce good results without gossip.';
    const resFalse = extractSkillsWithEvidence(textFalseSubstrings);
    const namesFalse = resFalse.matchedSkills.map((s) => s.name);
    expect(namesFalse).not.toContain('Rust');
    expect(namesFalse).not.toContain('Go');
  });

  it('detects and penalizes keyword stuffing', () => {
    // Keyword repeated 8 times in short document
    const stuffedText = `
      Skills: Python, Python, Python, Python.
      Worked with Python on Python scripts.
      Wrote Python automation using Python.
    `;
    const { stuffingDetected, stuffedSkills } = extractSkillsWithEvidence(stuffedText);
    expect(stuffingDetected).toBe(true);
    expect(stuffedSkills).toContain('Python');

    const analysis = analyzeResumeText(stuffedText, 'Stuffed.txt');
    expect(analysis.keyword_stuffing_detected).toBe(true);
    expect(analysis.dimensions.skillsAndQualifications.deductions.some((d) => d.reason.includes('Keyword stuffing'))).toBe(true);
  });
});

describe('Job Description & Role Preset Alignment', () => {
  const backendResume = `
    Jane Smith
    Email: jane@example.com
    Phone: (555) 987-6543
    LinkedIn: linkedin.com/in/janesmith
    GitHub: github.com/janesmith

    Education
    B.Tech Computer Science, 2023

    Skills
    Java, Python, Go, SQL, PostgreSQL, Redis, Docker, Kubernetes, REST APIs, Microservices, Git

    Experience
    Backend Engineer | CloudScale Inc.
    - Architected scalable RESTful microservices in Java and Go handling 50k requests per second.
    - Optimized PostgreSQL query execution plans, reducing p95 latency by 35%.
    - Built Redis in-memory caching tier to eliminate database hotspots.
    - Deployed containerized services to multi-node Kubernetes clusters with zero downtime.
  `;

  it('produces high alignment when resume matches target role', () => {
    const analysis = analyzeResumeText(backendResume, 'Jane_Backend.pdf', {
      targetRole: 'backend-engineer',
    });

    expect(analysis.jobDescriptionMatch.hasJobDescription).toBe(true);
    expect(analysis.jobDescriptionMatch.targetRoleTitle).toBe('Backend Software Engineer');
    expect(analysis.jobDescriptionMatch.matchScore).toBeGreaterThanOrEqual(75);
    expect(analysis.jobDescriptionMatch.requiredSkillsMatched.length).toBeGreaterThanOrEqual(4);
    expect(analysis.dimensions.jobDescriptionAlignment.weightPct).toBe(30);
    expect(analysis.dimensions.jobDescriptionAlignment.score).toBeGreaterThanOrEqual(75);
  });

  it('accurately identifies qualification gaps when targeting an unaligned role', () => {
    const analysis = analyzeResumeText(backendResume, 'Jane_Backend.pdf', {
      targetRole: 'mobile-developer',
    });

    expect(analysis.jobDescriptionMatch.hasJobDescription).toBe(true);
    expect(analysis.jobDescriptionMatch.targetRoleTitle).toBe('Mobile Application Developer');
    // Mobile developer requires Flutter, React Native, Swift, Kotlin
    expect(analysis.jobDescriptionMatch.requiredSkillsMissing).toContain('Flutter');
    expect(analysis.jobDescriptionMatch.requiredSkillsMissing).toContain('React Native');
    expect(analysis.jobDescriptionMatch.matchScore).toBeLessThan(60);
  });

  it('supports custom pasted job descriptions', () => {
    const customJd = `
      Senior Backend Specialist
      Required Qualifications:
      Must have strong experience with Go, PostgreSQL, Redis, and Microservices.
      Preferred: Docker, Kubernetes.
      Responsibilities:
      Architect high-throughput microservices and optimize query execution.
    `;

    const match = matchJobDescription(backendResume, [
      { name: 'Go', category: 'Languages', matchedAs: 'Go', context: 'Go microservices', isExplicit: true },
      { name: 'PostgreSQL', category: 'Database', matchedAs: 'PostgreSQL', context: 'PostgreSQL indexing', isExplicit: true },
      { name: 'Redis', category: 'Database', matchedAs: 'Redis', context: 'Redis cache', isExplicit: true },
      { name: 'Microservices', category: 'Backend', matchedAs: 'Microservices', context: 'Microservices architecture', isExplicit: true },
    ], customJd);

    expect(match.hasJobDescription).toBe(true);
    expect(match.matchScore).toBeGreaterThanOrEqual(80);
    expect(match.requiredSkillsMatched.map((s) => s.name)).toContain('Go');
    expect(match.requiredSkillsMatched.map((s) => s.name)).toContain('PostgreSQL');
  });
});

describe('Experience-Level Awareness (Freshers vs Experienced)', () => {
  it('fairly evaluates a student/fresher with strong academic projects without penalizing corporate tenure', () => {
    const fresherResume = `
      Alex Chen
      Email: alex.chen@uni.edu
      Phone: (555) 333-2211
      GitHub: github.com/alexchen
      LinkedIn: linkedin.com/in/alexchen

      Education
      Bachelor of Science in Computer Science, State University, Expected May 2025
      Relevant Coursework: Data Structures & Algorithms, Database Systems, Computer Networks, Operating Systems

      Technical Skills
      Languages: Python, TypeScript, SQL, C++
      Frameworks & Tools: React, Node.js, Express.js, PostgreSQL, Git, Docker

      Academic & Personal Projects
      Campus Event Platform (Full-Stack Web App)
      - Architected responsive event management portal using React, Node.js, and PostgreSQL.
      - Integrated JWT authentication and role-based access control for 1,200 active students.
      - Implemented full-text search indexing, cutting event search latency by 40%.

      Distributed Key-Value Store (Systems Project)
      - Engineered lightweight in-memory cache in C++ utilizing LRU eviction and thread synchronization.
      - Conducted performance benchmarking achieving 10,000 requests per second under concurrent loads.
    `;

    const result = analyzeResumeText(fresherResume, 'Alex_Fresher.pdf', {
      experienceLevel: 'student_fresher',
      targetRole: 'fresher-sde',
    });

    // Student should receive strong score for having well-documented projects and core skills
    expect(result.ats_score).toBeGreaterThanOrEqual(75);
    expect(result.dimensions.experienceAndProjects.score).toBeGreaterThanOrEqual(80);
    expect(result.dimensions.educationAndCredentials.score).toBeGreaterThanOrEqual(80);
  });
});

describe('Fact-Preserving XYZ Bullet Optimization', () => {
  it('rewrites weak bullets into Google XYZ formula with placeholders without fabricating metrics', () => {
    const rawResume = `
      Taylor Swift
      Email: taylor@example.com
      Skills: Python, PostgreSQL

      Experience
      Software Developer | Startup
      Worked on backend APIs and helped fix database query performance issues.
      Built user interface components and integrated them with frontend endpoints.
    `;

    const result = analyzeResumeText(rawResume, 'Taylor.txt');
    expect(result.bullet_rewrites.length).toBeGreaterThan(0);

    for (const rewrite of result.bullet_rewrites) {
      // Must lead with an active verb
      expect(rewrite.improved).toMatch(/^(Engineered|Architected|Spearheaded|Collaborated|Developed|Implemented)/);
      // Must contain metric placeholders rather than fake invented statistics
      expect(rewrite.improved).toMatch(/\[.*(measurable outcome|X%|metrics|latency|saved).*\]/i);
      expect(rewrite.formula).toBe('XYZ');
      expect(rewrite.reason.length).toBeGreaterThan(15);
    }
  });
});

describe('Deterministic Scoring Invariant', () => {
  it('guarantees identical output scores and breakdowns when evaluated multiple times', () => {
    const resumeText = `
      Morgan Lee
      Email: morgan.lee@example.com
      Phone: 555-444-1122
      LinkedIn: linkedin.com/in/morganlee
      GitHub: github.com/morganlee

      Education
      Bachelor of Science in Software Engineering, 2024

      Skills
      JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, Docker, Git

      Experience
      Frontend Engineer
      - Architected responsive web modules in React and TypeScript, cutting render time by 30%.
      - Engineered reusable design system components adopted across 4 engineering teams.
    `;

    const run1 = analyzeResumeText(resumeText, 'Morgan.pdf', { targetRole: 'frontend-engineer' });
    const run2 = analyzeResumeText(resumeText, 'Morgan.pdf', { targetRole: 'frontend-engineer' });

    expect(run1.ats_score).toBe(run2.ats_score);
    expect(run1.grade).toBe(run2.grade);
    expect(run1.breakdown).toEqual(run2.breakdown);
    expect(run1.dimensions.jobDescriptionAlignment.score).toBe(run2.dimensions.jobDescriptionAlignment.score);
    expect(run1.dimensions.skillsAndQualifications.score).toBe(run2.dimensions.skillsAndQualifications.score);
    expect(run1.dimensions.experienceAndProjects.score).toBe(run2.dimensions.experienceAndProjects.score);
    expect(run1.matched_keywords).toEqual(run2.matched_keywords);
  });
});

describe('General Quality Mode Weight Rebalancing', () => {
  it('correctly rebalances weights across the 6 remaining dimensions when no JD is provided', () => {
    const text = `
      Jordan Bell
      Email: jordan@example.com
      Phone: 555-123-4567
      LinkedIn: linkedin.com/in/jordanbell
      GitHub: github.com/jordanbell
      Education: B.S. in Computer Science, 2024
      Skills: Python, SQL, Docker, React, PostgreSQL
      Experience:
      Software Engineer
      - Architected data pipeline in Python, increasing throughput by 25%.
      Projects:
      Web Application
      - Built interactive dashboard in React and SQL.
    `;

    const result = analyzeResumeText(text, 'Jordan.pdf');
    expect(result.isGeneralQualityScore).toBe(true);
    const d = result.dimensions;

    // JD weight is 0%
    expect(d.jobDescriptionAlignment.weightPct).toBe(0);

    // Sum of remaining weights must equal 100%
    const totalWeight = 
      d.jobDescriptionAlignment.weightPct +
      d.skillsAndQualifications.weightPct +
      d.experienceAndProjects.weightPct +
      d.impactAndAchievements.weightPct +
      d.structureAndReadability.weightPct +
      d.atsCompatibility.weightPct +
      d.educationAndCredentials.weightPct;

    expect(Math.round(totalWeight)).toBe(100);
    expect(d.skillsAndQualifications.weightPct).toBeCloseTo(28.5, 1);
    expect(d.experienceAndProjects.weightPct).toBeCloseTo(21.5, 1);
  });
});

describe('Binary Document Parsing & Diagnostics', () => {
  it('detects encrypted/password-protected PDFs', async () => {
    const { parseResumeDocument } = await import('../src/lib/services/resume');
    // Minimal mock PDF binary containing /Encrypt dictionary
    const fakeEncryptedPdf = Buffer.from(
      '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R /Encrypt 3 0 R >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF'
    );

    const report = await parseResumeDocument(fakeEncryptedPdf, 'Protected.pdf', 'pdf');
    expect(report.isEncrypted).toBe(true);
    expect(report.confidence).toBe('Scanned/OCR Required');
    expect(report.extractionQualityScore).toBe(0);
  });

  it('detects scanned/image-only PDFs lacking selectable text layers', async () => {
    const { parseResumeDocument } = await import('../src/lib/services/resume');
    // Mock PDF with XObject Image dictionary and zero extractable font/text streams
    const fakeScannedPdf = Buffer.from(
      '%PDF-1.5\n1 0 obj\n<< /Type /Page /Resources << /XObject << /Im1 << /Type /XObject /Subtype /Image >> >> >> >>\nendobj\n%%EOF'
    );

    const report = await parseResumeDocument(fakeScannedPdf, 'Scan.pdf', 'pdf');
    expect(report.isScanned).toBe(true);
    expect(report.confidence).toBe('Scanned/OCR Required');
    expect(report.extractionQualityScore).toBeLessThanOrEqual(15);
  });

  it('parses plain text files with high confidence', async () => {
    const { parseResumeDocument } = await import('../src/lib/services/resume');
    const txtBuffer = Buffer.from(`
      Robin Hood
      Email: robin@example.com
      Phone: 555-987-6543
      Education: B.S. CS 2024
      Technical Skills: Python, SQL, Git
      Experience:
      Developer
      - Engineered algorithms for efficiency.
    `);

    const report = await parseResumeDocument(txtBuffer, 'Robin.txt', 'txt');
    expect(report.mimeType).toBe('text/plain');
    expect(report.isScanned).toBe(false);
    expect(report.isEncrypted).toBe(false);
    expect(report.links.email).toBe('robin@example.com');
  });
});
