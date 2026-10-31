import type { DsaProblem } from '@/lib/data/dsa';
import type { SupportedLanguage } from './types';

export interface MethodParam {
  type: string;
  name: string;
}

export interface MethodInfo {
  methodName: string;
  params: string[];
  paramTypes: string[];
  returnType: string;
}

/**
 * Extracts method name, parameters, and return type from problem reference solutions.
 */
export function extractMethodInfo(problem: DsaProblem): MethodInfo {
  // 1. Try C++ solution first for strong typing
  const cppCode = problem.solutions?.cpp || '';
  const cppMatch = cppCode.match(/class\s+Solution\s*\{[\s\S]*?public:\s*([a-zA-Z0-9_<>[\]]+)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)/);
  if (cppMatch) {
    const returnType = cppMatch[1].trim();
    const methodName = cppMatch[2].trim();
    const rawParams = cppMatch[3].split(',').map((p) => p.trim()).filter(Boolean);
    const params: string[] = [];
    const paramTypes: string[] = [];

    for (const p of rawParams) {
      const parts = p.trim().split(/\s+/);
      const name = (parts.pop() || 'arg').replace(/&/g, '').trim();
      const type = parts.join(' ').replace(/&/g, '').trim();
      params.push(name);
      paramTypes.push(type);
    }

    return { methodName, params, paramTypes, returnType };
  }

  // 2. Try Java solution
  const javaCode = problem.solutions?.java || '';
  const javaMatch = javaCode.match(/public\s+([a-zA-Z0-9_<>[\]]+)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/);
  if (javaMatch) {
    const returnType = javaMatch[1].trim();
    const methodName = javaMatch[2].trim();
    const rawParams = javaMatch[3].split(',').map((p) => p.trim()).filter(Boolean);
    const params: string[] = [];
    const paramTypes: string[] = [];

    for (const p of rawParams) {
      const parts = p.trim().split(/\s+/);
      const name = parts.pop() || 'arg';
      const type = parts.join(' ');
      params.push(name);
      paramTypes.push(type);
    }

    return { methodName, params, paramTypes, returnType };
  }

  // 3. Try Python solution
  const pyCode = problem.solutions?.python || '';
  const pyMatch = pyCode.match(/def\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*(?:->\s*([^:]+))?:/);
  if (pyMatch) {
    const methodName = pyMatch[1].trim();
    const params = pyMatch[2]
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p && p !== 'self')
      .map((p) => p.split(':')[0].trim());
    const returnType = (pyMatch[3] || 'any').trim();
    return { methodName, params, paramTypes: params.map(() => 'any'), returnType };
  }

  return { methodName: 'solve', params: ['input'], paramTypes: ['any'], returnType: 'void' };
}

/**
 * Generates problem-specific starter code for the given language.
 */
export function getStarterCode(problem: DsaProblem, language: SupportedLanguage): string {
  const { methodName, params, returnType } = extractMethodInfo(problem);

  if (language === 'python') {
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
    return `#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    ${returnType !== 'void' ? returnType : 'void'} ${methodName}() {\n        // Write your code here\n    }\n};\n`;
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
    return `#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n#include <string.h>\n\n// Write your solution using standard I/O\nint main() {\n    // Read input from stdin and write output to stdout\n    return 0;\n}\n`;
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
  const { methodName, params, paramTypes } = extractMethodInfo(problem);

  // If user code already has standard I/O main function, run directly
  if (
    sourceCode.includes('int main(') ||
    sourceCode.includes('void main(') ||
    sourceCode.includes("if __name__ == '__main__':") ||
    sourceCode.includes('public static void main') ||
    sourceCode.includes('require(') ||
    sourceCode.includes('process.stdin') ||
    sourceCode.includes('sys.stdin') ||
    sourceCode.includes('input(')
  ) {
    if (language === 'java' && !sourceCode.includes('class Main')) {
      return sourceCode.replace(/public\s+class\s+([a-zA-Z_]\w*)/, 'public class Main');
    }
    return sourceCode;
  }

  // 1. Python Driver Harness
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

  // 2. JavaScript (Node.js) Driver Harness
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

  // 3. C++ Driver Harness
  if (language === 'cpp') {
    // Generate type-safe argument parsers based on parameter types
    // Note: store in local lvalues so non-const references (e.g. vector<int>&) bind correctly
    const declarations: string[] = [];
    const callVarNames: string[] = [];
    params.forEach((_, idx) => {
      const type = (paramTypes[idx] || '').toLowerCase();
      let expr = '';
      if (type.includes('vector<int>') || type.includes('vector<long>')) {
        expr = `StackUpDriver::parseVectorInt(args[${idx}])`;
      } else if (type.includes('vector<string>')) {
        expr = `StackUpDriver::parseVectorString(args[${idx}])`;
      } else if (type.includes('string')) {
        expr = `StackUpDriver::parseString(args[${idx}])`;
      } else if (type.includes('bool')) {
        expr = `StackUpDriver::parseBool(args[${idx}])`;
      } else if (type.includes('double') || type.includes('float')) {
        expr = `StackUpDriver::parseDouble(args[${idx}])`;
      } else {
        // Default to integer parser
        expr = `StackUpDriver::parseInt(args[${idx}])`;
      }
      declarations.push(`auto a${idx} = ${expr};`);
      callVarNames.push(`a${idx}`);
    });

    return `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

${sourceCode}

namespace StackUpDriver {
    inline std::vector<std::string> splitArgs(const std::string& text) {
        std::vector<std::string> parts;
        int depth = 0;
        std::string cur = "";
        for (char c : text) {
            if (c == '[' || c == '{' || c == '(') depth++;
            else if (c == ']' || c == '}' || c == ')') depth--;
            else if (c == ',' && depth == 0) {
                if (!cur.empty()) parts.push_back(cur);
                cur = "";
                continue;
            }
            cur += c;
        }
        if (!cur.empty()) parts.push_back(cur);
        return parts;
    }

    inline std::string stripParam(std::string p) {
        auto eq = p.find('=');
        if (eq != std::string::npos) p = p.substr(eq + 1);
        while (!p.empty() && (p.front() == ' ' || p.front() == '\\t')) p.erase(p.begin());
        while (!p.empty() && (p.back() == ' ' || p.back() == '\\t' || p.back() == '\\r' || p.back() == '\\n')) p.pop_back();
        return p;
    }

    inline std::vector<int> parseVectorInt(std::string s) {
        s = stripParam(s);
        std::vector<int> res;
        int num = 0;
        bool sign = false;
        bool hasNum = false;
        for (char c : s) {
            if (c == '-') { sign = true; }
            else if (c >= '0' && c <= '9') {
                num = num * 10 + (c - '0');
                hasNum = true;
            } else {
                if (hasNum) {
                    res.push_back(sign ? -num : num);
                    num = 0;
                    sign = false;
                    hasNum = false;
                }
            }
        }
        if (hasNum) res.push_back(sign ? -num : num);
        return res;
    }

    inline int parseInt(std::string s) {
        s = stripParam(s);
        try { return std::stoi(s); } catch(...) { return 0; }
    }

    inline double parseDouble(std::string s) {
        s = stripParam(s);
        try { return std::stod(s); } catch(...) { return 0.0; }
    }

    inline bool parseBool(std::string s) {
        s = stripParam(s);
        std::string lower = s;
        for (char &c : lower) c = std::tolower(c);
        return lower == "true" || lower == "1";
    }

    inline std::string parseString(std::string s) {
        s = stripParam(s);
        if (s.size() >= 2 && s.front() == '"' && s.back() == '"') {
            return s.substr(1, s.size() - 2);
        }
        return s;
    }

    inline std::vector<std::string> parseVectorString(std::string s) {
        s = stripParam(s);
        std::vector<std::string> res;
        std::string cur = "";
        bool inStr = false;
        for (char c : s) {
            if (c == '"') {
                if (inStr) { res.push_back(cur); cur = ""; inStr = false; }
                else { inStr = true; }
            } else if (inStr) {
                cur += c;
            }
        }
        return res;
    }

    inline void printVal(int v) { std::cout << v << std::endl; }
    inline void printVal(long long v) { std::cout << v << std::endl; }
    inline void printVal(double v) { std::cout << v << std::endl; }
    inline void printVal(bool b) { std::cout << (b ? "true" : "false") << std::endl; }
    inline void printVal(const std::string& s) { std::cout << s << std::endl; }
    inline void printVal(const std::vector<int>& v) {
        std::cout << "[";
        for (size_t i = 0; i < v.size(); i++) {
            if (i > 0) std::cout << ", ";
            std::cout << v[i];
        }
        std::cout << "]" << std::endl;
    }
}

int main() {
    std::string input, line;
    while (std::getline(std::cin, line)) {
        if (!input.empty()) input += "\\n";
        input += line;
    }
    std::vector<std::string> args = StackUpDriver::splitArgs(input);
    Solution sol;
    try {
        if (args.size() >= ${params.length}) {
            ${declarations.join('\n            ')}
            auto res = sol.${methodName}(${callVarNames.join(', ')});
            StackUpDriver::printVal(res);
        }
    } catch (const std::exception& e) {
        std::cerr << "Runtime Exception: " << e.what() << std::endl;
        return 1;
    } catch (...) {
        std::cerr << "Unknown Runtime Error" << std::endl;
        return 1;
    }
    return 0;
}
`;
  }

  // 4. Java Driver Harness
  if (language === 'java') {
    const callArgs: string[] = [];
    params.forEach((_, idx) => {
      const type = (paramTypes[idx] || '').toLowerCase();
      if (type.includes('int[]')) {
        callArgs.push(`parseIntArray(rawArgs.get(${idx}))`);
      } else if (type.includes('string')) {
        callArgs.push(`parseString(rawArgs.get(${idx}))`);
      } else if (type.includes('boolean')) {
        callArgs.push(`parseBool(rawArgs.get(${idx}))`);
      } else {
        callArgs.push(`parseInt(rawArgs.get(${idx}))`);
      }
    });

    return `${sourceCode}

public class Main {
    static java.util.List<String> splitArgs(String text) {
        java.util.List<String> parts = new java.util.ArrayList<>();
        int depth = 0;
        StringBuilder cur = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (c == '[' || c == '{' || c == '(') depth++;
            else if (c == ']' || c == '}' || c == ')') depth--;
            else if (c == ',' && depth == 0) {
                if (cur.length() > 0) parts.add(cur.toString().trim());
                cur = new StringBuilder();
                continue;
            }
            cur.append(c);
        }
        if (cur.length() > 0) parts.add(cur.toString().trim());
        return parts;
    }

    static String stripParam(String p) {
        int eq = p.indexOf('=');
        if (eq != -1) p = p.substring(eq + 1);
        return p.trim();
    }

    static int[] parseIntArray(String s) {
        s = stripParam(s);
        s = s.replace("[", "").replace("]", "").trim();
        if (s.isEmpty()) return new int[0];
        String[] tokens = s.split(",");
        int[] arr = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            try {
                arr[i] = Integer.parseInt(tokens[i].trim());
            } catch(Exception e) {
                arr[i] = 0;
            }
        }
        return arr;
    }

    static int parseInt(String s) {
        s = stripParam(s);
        try {
            return Integer.parseInt(s.trim());
        } catch(Exception e) {
            return 0;
        }
    }

    static boolean parseBool(String s) {
        s = stripParam(s).toLowerCase();
        return s.equals("true") || s.equals("1");
    }

    static String parseString(String s) {
        s = stripParam(s);
        if (s.startsWith("\\"") && s.endsWith("\\"") && s.length() >= 2) {
            return s.substring(1, s.length() - 1);
        }
        return s;
    }

    public static void main(String[] args) {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        StringBuilder sb = new StringBuilder();
        while (sc.hasNextLine()) {
            if (sb.length() > 0) sb.append("\\n");
            sb.append(sc.nextLine());
        }
        java.util.List<String> rawArgs = splitArgs(sb.toString().trim());
        Solution sol = new Solution();
        try {
            if (rawArgs.size() >= ${params.length}) {
                Object res = sol.${methodName}(${callArgs.join(', ')});
                if (res instanceof int[]) {
                    System.out.println(java.util.Arrays.toString((int[]) res));
                } else {
                    System.out.println(res);
                }
            }
        } catch (Exception e) {
            System.err.println("Runtime Exception: " + e.getMessage());
            System.exit(1);
        }
    }
}
`;
  }

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
  const normActual = normalizeOutput(actual);
  const normExpected = normalizeOutput(expected);

  if (normActual === normExpected) return true;

  // Case-insensitive check for boolean results
  if (normActual.toLowerCase() === normExpected.toLowerCase()) return true;

  // Numerical float comparison with precision tolerance
  const numActual = parseFloat(normActual);
  const numExpected = parseFloat(normExpected);
  if (!isNaN(numActual) && !isNaN(numExpected) && Math.abs(numActual - numExpected) < 1e-5) {
    return true;
  }

  // Bracket spacing normalization
  const stripSpaces = (s: string) => s.replace(/\s+/g, '');
  if (stripSpaces(normActual) === stripSpaces(normExpected)) {
    return true;
  }

  return false;
}
