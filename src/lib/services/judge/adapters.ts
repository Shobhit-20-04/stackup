import type { DsaProblem } from '@/lib/data/dsa';
import type { SupportedLanguage } from './types';

export interface MethodInfo {
  methodName: string;
  params: string[];
  returnType?: string;
}

export function extractMethodInfo(problem: DsaProblem): MethodInfo {
  const pyCode = problem.solutions?.python || '';
  const match = pyCode.match(/def\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)/);
  if (match) {
    const methodName = match[1];
    const paramsRaw = match[2];
    const params = paramsRaw
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p && p !== 'self')
      .map((p) => p.split(':')[0].trim());
    return { methodName, params };
  }
  return { methodName: 'solve', params: ['input'] };
}

export function getStarterCode(problem: DsaProblem, language: SupportedLanguage): string {
  const { methodName, params } = extractMethodInfo(problem);

  if (language === 'python') {
    // Extract Python signature from solutions if available
    const py = problem.solutions?.python || '';
    const match = py.match(/(def\s+[a-zA-Z_]\w*\s*\([^)]*\)\s*->\s*[^:]+:)/);
    const signature = match ? match[1] : `def ${methodName}(self, ${params.join(', ')}):`;
    return `class Solution:\n    ${signature}\n        # Write your code here\n        pass\n`;
  }

  if (language === 'cpp') {
    const cpp = problem.solutions?.cpp || '';
    const classMatch = cpp.match(/class\s+Solution\s*\{[\s\S]*?public:\s*([\s\S]*?\{)/);
    if (classMatch) {
      const sigLine = classMatch[1].trim().replace(/\{$/, '').trim();
      return `#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <unordered_set>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    ${sigLine} {\n        // Write your code here\n        \n    }\n};\n`;
    }
    return `#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    // Function signature\n    void ${methodName}() {\n        // Write your code here\n    }\n};\n`;
  }

  if (language === 'java') {
    const java = problem.solutions?.java || '';
    const match = java.match(/public\s+([a-zA-Z0-9_<>[\]]+\s+[a-zA-Z_]\w*\s*\([^)]*\))\s*\{/);
    if (match) {
      return `import java.util.*;\n\nclass Solution {\n    public ${match[1]} {\n        // Write your code here\n        \n    }\n}\n`;
    }
    return `import java.util.*;\n\nclass Solution {\n    public void ${methodName}() {\n        // Write your code here\n    }\n}\n`;
  }

  if (language === 'javascript') {
    return `/**\n * @param {${params.join(', ')}}\n */\nfunction ${methodName}(${params.join(', ')}) {\n    // Write your code here\n    \n}\n`;
  }

  if (language === 'c') {
    return `#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n#include <string.h>\n\n// Write your solution function or main() standard I/O driver\nint main() {\n    // Read from standard input and write to standard output\n    return 0;\n}\n`;
  }

  return '';
}

/**
 * Wraps user code with a driver/harness if the user code is class/function-based.
 * If user already provided main() or standard I/O entry point, leaves code untouched.
 */
export function wrapCodeWithDriver(
  sourceCode: string,
  language: SupportedLanguage,
  problem: DsaProblem
): string {
  const { methodName } = extractMethodInfo(problem);

  // If user code already has standard I/O main function, run directly
  if (
    sourceCode.includes('int main(') ||
    sourceCode.includes('void main(') ||
    sourceCode.includes("if __name__ == '__main__':") ||
    sourceCode.includes('require(') ||
    sourceCode.includes('process.stdin') ||
    sourceCode.includes('sys.stdin') ||
    sourceCode.includes('input(')
  ) {
    return sourceCode;
  }

  if (language === 'python') {
    return `${sourceCode}

if __name__ == '__main__':
    import sys, json, ast

    def parse_input_args(text):
        text = text.strip()
        parts = []
        depth = 0
        current = []
        for ch in text:
            if ch in '[{(':
                depth += 1
                current.append(ch)
            elif ch in ']})':
                depth -= 1
                current.append(ch)
            elif ch == ',' and depth == 0:
                parts.append(''.join(current).strip())
                current = []
            else:
                current.append(ch)
        if current:
            parts.append(''.join(current).strip())

        args = []
        for part in parts:
            if '=' in part:
                part = part.split('=', 1)[1].strip()
            p_lower = part.lower()
            if p_lower == 'true':
                args.append(True)
            elif p_lower == 'false':
                args.append(False)
            elif p_lower in ('null', 'none'):
                args.append(None)
            else:
                try:
                    args.append(ast.literal_eval(part))
                except Exception:
                    args.append(part)
        return args

    raw_input_data = sys.stdin.read().strip()
    sol = Solution()
    method = getattr(sol, '${methodName}', None)
    if not method:
        # Fallback to first callable method in Solution
        methods = [m for m in dir(sol) if not m.startswith('_') and callable(getattr(sol, m))]
        if methods:
            method = getattr(sol, methods[0])

    if method:
        parsed_args = parse_input_args(raw_input_data)
        try:
            res = method(*parsed_args)
            if isinstance(res, bool):
                print(str(res).lower())
            elif isinstance(res, (list, dict)):
                print(json.dumps(res, separators=(',', ':')))
            elif res is not None:
                print(res)
        except Exception as e:
            sys.stderr.write(f"Runtime Exception: {str(e)}\\n")
            sys.exit(1)
    else:
        sys.stderr.write("Error: Could not locate solution method in Solution class\\n")
        sys.exit(1)
`;
  }

  if (language === 'javascript') {
    return `${sourceCode}

const fs = require('fs');
const rawInput = fs.readFileSync(0, 'utf-8').trim();

function parseInputArgs(text) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '[' || ch === '{' || ch === '(') depth++;
    else if (ch === ']' || ch === '}' || ch === ')') depth--;
    else if (ch === ',' && depth === 0) {
      parts.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());

  return parts.map(p => {
    let expr = p;
    if (p.includes('=')) {
      expr = p.split('=').slice(1).join('=').trim();
    }
    try {
      return JSON.parse(expr);
    } catch {
      return expr;
    }
  });
}

try {
  let targetFn = null;
  if (typeof ${methodName} === 'function') {
    targetFn = ${methodName};
  } else if (typeof Solution === 'function') {
    const s = new Solution();
    if (typeof s.${methodName} === 'function') {
      targetFn = s.${methodName}.bind(s);
    }
  }

  if (targetFn) {
    const args = parseInputArgs(rawInput);
    const result = targetFn(...args);
    if (typeof result === 'boolean') {
      console.log(result ? 'true' : 'false');
    } else if (typeof result === 'object' && result !== null) {
      console.log(JSON.stringify(result));
    } else if (result !== undefined) {
      console.log(result);
    }
  } else {
    console.error("Function '${methodName}' not found in submitted code.");
    process.exit(1);
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
`;
  }

  // C++ and Java: if user provided class Solution without main(), append standard driver
  // (or return as-is if already self-contained)
  return sourceCode;
}

export function normalizeOutput(output: string): string {
  if (!output) return '';
  const trimmed = output.trim();
  if (trimmed.toLowerCase() === 'true') return 'true';
  if (trimmed.toLowerCase() === 'false') return 'false';
  try {
    const parsed = JSON.parse(trimmed);
    return JSON.stringify(parsed);
  } catch {
    return trimmed
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .join('\n');
  }
}

export function compareOutputs(actual: string, expected?: string): boolean {
  if (!expected) return true;
  return normalizeOutput(actual) === normalizeOutput(expected);
}
