import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../src/lib/services/rate-limit';
import { analyzeResumeLocally } from '../src/app/api/resume-analysis/route';

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

  it('accurately parses technical resume and calculates ATS scores', () => {
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
    expect(result.breakdown.contact_score).toBeGreaterThanOrEqual(80);
    expect(result.breakdown.skills_score).toBeGreaterThanOrEqual(80);
    expect(result.breakdown.experience_score).toBeGreaterThanOrEqual(75);
    expect(result.matched_keywords).toContain('Python');
    expect(result.matched_keywords).toContain('React');
    expect(result.matched_keywords).toContain('PostgreSQL');
    expect(result.matched_keywords).toContain('Docker');
    expect(result.matched_keywords.length).toBeGreaterThanOrEqual(10);
    expect(Array.isArray(result.bullet_rewrites)).toBe(true);
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
  });
});

