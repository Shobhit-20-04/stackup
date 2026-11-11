export interface CodeVerificationResult {
  syntaxValid: boolean;
  issues: string[];
  executedInSandbox: boolean;
  disclaimer: string;
  executionMetrics?: {
    status: string;
    stdout?: string;
    stderr?: string;
    timeMs?: number;
    memoryKb?: number;
  };
}

/**
 * Validates balanced brackets, quotes, and basic structural syntax across common programming languages.
 */
export function validateSyntax(code: string, language: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const lang = language.toLowerCase();

  // 1. Bracket & Parenthesis matching
  const stack: { char: string; index: number }[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const openers = new Set(['(', '[', '{']);

  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBacktick = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const prev = i > 0 ? code[i - 1] : '';
    const next = i < code.length - 1 ? code[i + 1] : '';

    // Handle string boundaries and comments
    if (!inSingleQuote && !inDoubleQuote && !inBacktick && !inBlockComment) {
      if (char === '/' && next === '/') {
        inLineComment = true;
        i++;
        continue;
      }
      if (char === '/' && next === '*') {
        inBlockComment = true;
        i++;
        continue;
      }
      if (lang === 'python' && char === '#') {
        inLineComment = true;
        continue;
      }
    }

    if (inLineComment) {
      if (char === '\n') inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (char === "'" && prev !== '\\' && !inDoubleQuote && !inBacktick) {
      inSingleQuote = !inSingleQuote;
      continue;
    }
    if (char === '"' && prev !== '\\' && !inSingleQuote && !inBacktick) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }
    if (char === '`' && prev !== '\\' && !inSingleQuote && !inDoubleQuote) {
      inBacktick = !inBacktick;
      continue;
    }

    if (inSingleQuote || inDoubleQuote || inBacktick) continue;

    // Bracket checks
    if (openers.has(char)) {
      stack.push({ char, index: i });
    } else if (pairs[char]) {
      if (stack.length === 0) {
        issues.push(`Unmatched closing '${char}' at character offset ${i}.`);
      } else {
        const top = stack.pop();
        if (top && top.char !== pairs[char]) {
          issues.push(`Mismatched bracket: expected closing for '${top.char}', found '${char}'.`);
        }
      }
    }
  }

  if (stack.length > 0) {
    issues.push(`Unclosed opening brackets: ${stack.map((s) => `'${s.char}'`).join(', ')}.`);
  }
  if (inSingleQuote || inDoubleQuote || inBacktick) {
    issues.push('Unterminated string literal detected in code.');
  }

  // 2. Language-specific heuristics
  if (lang === 'python') {
    if (code.includes('\t') && code.includes('    ')) {
      issues.push('Mixed tabs and spaces detected in Python indentation.');
    }
  }

  if (lang === 'cpp' || lang === 'c' || lang === 'java') {
    if (code.includes('class ') || code.includes('int main')) {
      if (!code.includes('{') || !code.includes('}')) {
        issues.push('Missing curly braces block for class/function definition.');
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Verifies code snippet syntax and adds explicit verification reporting.
 */
export async function verifyCodeSnippet(
  code: string,
  language: string
): Promise<CodeVerificationResult> {
  const syntax = validateSyntax(code, language);

  return {
    syntaxValid: syntax.valid,
    issues: syntax.issues,
    executedInSandbox: false,
    disclaimer: syntax.valid
      ? 'Static syntax analysis verified: Structure and brackets balanced. (Runtime sandbox execution was not requested.)'
      : `Static syntax issues detected: ${syntax.issues.join('; ')}`,
  };
}
