# Contributing to StackUp

Thank you for your interest in contributing to StackUp! StackUp is an open platform designed to provide a world-class educational and interview preparation workspace for Computer Science students and software engineers.

---

## 1. Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for all contributors. Please treat everyone with respect, constructive feedback, and professional courtesy.

---

## 2. Development Workflow

1. **Fork & Branch:**
   - Fork the repository and clone your fork.
   - Create a feature branch from `dev`:
     ```bash
     git checkout -b feature/your-feature-name dev
     ```

2. **Commit Hygiene:**
   - Write clear, concise commit messages adhering to [Conventional Commits](https://www.conventionalcommits.org/):
     - `feat:` for new capabilities.
     - `fix:` for bug repairs.
     - `perf:` for measurable performance improvements.
     - `test:` for test additions or updates.
     - `docs:` for documentation updates.
     - `chore:` for tooling and maintenance.
   - Never amend, squash, or force-push to shared branches.

3. **Verify Quality Before Submitting:**
   Every PR must pass all quality gates locally before review:
   ```bash
   npm test
   npm run typecheck
   npm run lint
   npm run build
   ```

4. **Security Checklist:**
   - Never commit `.env.local` or any hardcoded API keys.
   - Run `node scripts/security-audit-scan.mjs` before committing.
   - Ensure all server endpoints enforce zero-trust authentication.

---

## 3. Reporting Issues

If you discover a bug, please open an issue providing:
- Clear description of the problem.
- Steps to reproduce.
- Expected behavior vs. actual behavior.
- Browser version, device, and OS.
- Any relevant console logs or network traces.
