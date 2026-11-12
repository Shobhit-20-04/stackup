import fs from 'fs';
import path from 'path';

const SECRET_PATTERNS = [
  { name: 'Google API Key', regex: /AIzaSy[A-Za-z0-9_-]{33}/g },
  { name: 'Anthropic API Key', regex: /sk-ant-api03-[A-Za-z0-9_-]{60,}/g },
  { name: 'Supabase Secret Service Key', regex: /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]{50,}/g },
  { name: 'Generic Private Key', regex: /-----BEGIN (?:RSA|EC|DSA|OPENSSH|PRIVATE) KEY-----/g },
];

const IGNORE_DIRS = ['node_modules', '.git', '.next', 'dist', 'coverage', '.gemini'];
const IGNORE_FILES = ['.env.local', 'load-test-results.json', 'package-lock.json'];

const findings = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.includes(entry.name)) scanDir(fullPath);
    } else if (entry.isFile()) {
      if (IGNORE_FILES.includes(entry.name)) continue;
      const stat = fs.statSync(fullPath);
      if (stat.size > 2 * 1024 * 1024) continue; // skip large files

      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const p of SECRET_PATTERNS) {
          const matches = content.match(p.regex);
          if (matches) {
            for (const m of matches) {
              if (
                m.includes('placeholder') ||
                m.includes('your-key') ||
                m.includes('sk-ant-api03-...') ||
                m.includes('your-service-role') ||
                m.includes('AIzaSy...')
              ) {
                continue;
              }
              findings.push({
                file: path.relative('D:/stackup', fullPath),
                type: p.name,
                snippet: m.slice(0, 8) + '...' + m.slice(-4),
              });
            }
          }
        }
      } catch (err) {}
    }
  }
}

scanDir('D:/stackup');
console.log('Secret Scan Results:', JSON.stringify(findings, null, 2));
console.log(`Total Findings: ${findings.length}`);
