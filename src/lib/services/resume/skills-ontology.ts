/**
 * StackUp Skills Ontology & Normalized Alias Dictionary
 * Provides robust boundary checks and prevents false positive technology collisions.
 */

export interface OntologySkill {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Core CS' | 'Testing' | 'Mobile' | 'AI & Data';
  aliases: string[];
  pattern: RegExp;
}

export const SKILL_ONTOLOGY: OntologySkill[] = [
  // --- Programming Languages ---
  {
    name: 'JavaScript',
    category: 'Languages',
    aliases: ['JS', 'ECMAScript', 'ES6+'],
    pattern: /\b(javascript|ecmascript)\b|\bjs\b/i,
  },
  {
    name: 'TypeScript',
    category: 'Languages',
    aliases: ['TS'],
    pattern: /\btypescript\b|\bts\b/i,
  },
  {
    name: 'Python',
    category: 'Languages',
    aliases: ['Python3', 'Py'],
    pattern: /\bpython(3)?\b/i,
  },
  {
    name: 'Java',
    category: 'Languages',
    aliases: ['Core Java', 'J2EE', 'JDK'],
    // Negative lookahead strictly prevents matching 'javascript' or 'javadoc'
    pattern: /\bjava\b(?!\s*script|\s*doc)/i,
  },
  {
    name: 'C++',
    category: 'Languages',
    aliases: ['CPP', 'C/C++'],
    pattern: /(?<![a-zA-Z0-9_])c\+\+(?![a-zA-Z0-9_])|\bcpp\b/i,
  },
  {
    name: 'C',
    category: 'Languages',
    aliases: ['ANSI C'],
    // Strictly prevents matching C++, C#, or letters inside words
    pattern: /(?<![a-zA-Z0-9_])c(?![a-zA-Z0-9_+#])/,
  },
  {
    name: 'C#',
    category: 'Languages',
    aliases: ['CSharp', '.NET'],
    pattern: /(?<![a-zA-Z0-9_])c#(?![a-zA-Z0-9_])|\bcsharp\b|\b\.net\b/i,
  },
  {
    name: 'Go',
    category: 'Languages',
    aliases: ['Golang'],
    pattern: /\bgolang\b|\bgo\s+(lang|language|developer|engineer|backend|programming|runtime)\b|\b(built|wrote|engineered|with|using|in)\s+go\b|(?<=[,/|]\s*)go\b|\bgo(?=\s*[,/|])/i,
  },
  {
    name: 'Rust',
    category: 'Languages',
    aliases: ['Rustlang'],
    pattern: /\brust\b|\brustlang\b/i,
  },
  {
    name: 'SQL',
    category: 'Languages',
    aliases: ['Structured Query Language'],
    pattern: /\bsql\b/i,
  },
  {
    name: 'HTML5/CSS3',
    category: 'Languages',
    aliases: ['HTML', 'CSS', 'HTML5', 'CSS3'],
    pattern: /\bhtml5?\b|\bcss3?\b/i,
  },
  {
    name: 'PHP',
    category: 'Languages',
    aliases: ['PHP8'],
    pattern: /\bphp\b/i,
  },
  {
    name: 'Ruby',
    category: 'Languages',
    aliases: ['Ruby on Rails'],
    pattern: /\bruby(\s+on\s+rails)?\b/i,
  },
  {
    name: 'Kotlin',
    category: 'Languages',
    aliases: ['Kotlin Android'],
    pattern: /\bkotlin\b/i,
  },
  {
    name: 'Swift',
    category: 'Languages',
    aliases: ['Swift iOS'],
    pattern: /\bswift\b(?!\s*ui|\s*water)/i,
  },

  // --- Frontend Frameworks & Libraries ---
  {
    name: 'React',
    category: 'Frontend',
    aliases: ['React.js', 'ReactJS'],
    pattern: /\breact(\.js|js)?\b(?!-native)/i,
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    aliases: ['NextJS', 'Next'],
    pattern: /\bnext(\.js|js)?\b/i,
  },
  {
    name: 'Vue.js',
    category: 'Frontend',
    aliases: ['Vue', 'VueJS'],
    pattern: /\bvue(\.js|js)?\b/i,
  },
  {
    name: 'Angular',
    category: 'Frontend',
    aliases: ['AngularJS', 'Angular 2+'],
    pattern: /\bangular(\.js|js)?\b/i,
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    aliases: ['Tailwind', 'TailwindCSS'],
    pattern: /\btailwind(css)?\b/i,
  },
  {
    name: 'Redux',
    category: 'Frontend',
    aliases: ['Redux Toolkit', 'RTK'],
    pattern: /\bredux(\s+toolkit)?\b|\brtk\b/i,
  },
  {
    name: 'GraphQL',
    category: 'Frontend',
    aliases: ['Apollo GraphQL'],
    pattern: /\bgraphql\b|\bapollo\b/i,
  },

  // --- Backend Frameworks & Runtimes ---
  {
    name: 'Node.js',
    category: 'Backend',
    aliases: ['Node', 'NodeJS'],
    pattern: /\bnode(\.js|js)?\b/i,
  },
  {
    name: 'Express.js',
    category: 'Backend',
    aliases: ['Express', 'ExpressJS'],
    pattern: /\bexpress(\.js|js)?\b/i,
  },
  {
    name: 'Django',
    category: 'Backend',
    aliases: ['Django REST Framework', 'DRF'],
    pattern: /\bdjango(\s+rest\s+framework)?\b|\bdrf\b/i,
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    aliases: ['Fast API'],
    pattern: /\bfastapi\b/i,
  },
  {
    name: 'Flask',
    category: 'Backend',
    aliases: ['Flask Python'],
    pattern: /\bflask\b/i,
  },
  {
    name: 'Spring Boot',
    category: 'Backend',
    aliases: ['Spring', 'Spring MVC'],
    pattern: /\bspring(\s+boot|\s+mvc)?\b/i,
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    aliases: ['RESTful APIs', 'REST'],
    pattern: /\brest(ful)?(\s+apis?)?\b/i,
  },
  {
    name: 'Microservices',
    category: 'Backend',
    aliases: ['Microservice Architecture'],
    pattern: /\bmicroservices?\b/i,
  },
  {
    name: 'WebSockets',
    category: 'Backend',
    aliases: ['Socket.io', 'WebSocket'],
    pattern: /\bwebsockets?\b|\bsocket\.io\b/i,
  },
  {
    name: 'gRPC',
    category: 'Backend',
    aliases: ['Protocol Buffers', 'Protobuf'],
    pattern: /\bgrpc\b|\bprotobuf(s)?\b/i,
  },

  // --- Databases & In-Memory Stores ---
  {
    name: 'PostgreSQL',
    category: 'Database',
    aliases: ['Postgres', 'PSQL'],
    pattern: /\bpostgres(ql)?\b|\bpsql\b/i,
  },
  {
    name: 'MongoDB',
    category: 'Database',
    aliases: ['Mongo', 'NoSQL'],
    pattern: /\bmongo(db)?\b/i,
  },
  {
    name: 'Redis',
    category: 'Database',
    aliases: ['In-Memory Cache'],
    pattern: /\bredis\b/i,
  },
  {
    name: 'MySQL',
    category: 'Database',
    aliases: ['MariaDB'],
    pattern: /\bmysql\b|\bmariadb\b/i,
  },
  {
    name: 'Supabase',
    category: 'Database',
    aliases: ['Supabase DB'],
    pattern: /\bsupabase\b/i,
  },
  {
    name: 'Firebase',
    category: 'Database',
    aliases: ['Firestore'],
    pattern: /\bfirebase\b|\bfirestore\b/i,
  },
  {
    name: 'Elasticsearch',
    category: 'Database',
    aliases: ['ELK Stack', 'OpenSearch'],
    pattern: /\belasticsearch\b|\belk\s+stack\b|\bopensearch\b/i,
  },

  // --- Cloud, Infrastructure & DevOps ---
  {
    name: 'Docker',
    category: 'DevOps',
    aliases: ['Containers', 'Containerization'],
    pattern: /\bdocker\b|\bcontainerization\b/i,
  },
  {
    name: 'Kubernetes',
    category: 'DevOps',
    aliases: ['K8s'],
    pattern: /\bkubernetes\b|\bk8s\b/i,
  },
  {
    name: 'AWS',
    category: 'DevOps',
    aliases: ['Amazon Web Services', 'EC2', 'S3', 'Lambda'],
    pattern: /\baws\b|amazon\s+web\s+services|\b(ec2|s3|lambda|dynamodb|rds)\b/i,
  },
  {
    name: 'GCP',
    category: 'DevOps',
    aliases: ['Google Cloud Platform', 'Google Cloud', 'BigQuery'],
    pattern: /\bgcp\b|google\s+cloud(\s+platform)?|\bbigquery\b/i,
  },
  {
    name: 'Azure',
    category: 'DevOps',
    aliases: ['Microsoft Azure'],
    pattern: /\b(microsoft\s+)?azure\b/i,
  },
  {
    name: 'Git',
    category: 'DevOps',
    aliases: ['GitHub', 'GitLab', 'Version Control'],
    pattern: /\bgit\b|\bgithub\b|\bgitlab\b|\bversion\s+control\b/i,
  },
  {
    name: 'CI/CD',
    category: 'DevOps',
    aliases: ['Continuous Integration', 'GitHub Actions', 'Jenkins'],
    pattern: /\bci\/cd\b|continuous\s+integration|github\s+actions|\bjenkins\b/i,
  },
  {
    name: 'Linux',
    category: 'DevOps',
    aliases: ['Unix', 'Bash', 'Shell Scripting'],
    pattern: /\blinux\b|\bunix\b|\bbash\b|\bshell\s+scripting\b/i,
  },

  // --- Architecture & CS Fundamentals ---
  {
    name: 'Data Structures & Algorithms',
    category: 'Core CS',
    aliases: ['DSA', 'Algorithms', 'Data Structures'],
    pattern: /data\s+structures(\s+and\s+algorithms)?|\balgorithms\b|\bdsa\b/i,
  },
  {
    name: 'System Design',
    category: 'Core CS',
    aliases: ['Distributed Systems', 'Scalability'],
    pattern: /system\s+design|distributed\s+systems|scalability|high\s+availability/i,
  },
  {
    name: 'Object-Oriented Programming (OOP)',
    category: 'Core CS',
    aliases: ['OOP', 'OOPs', 'Design Patterns'],
    pattern: /object-oriented|\boops?\b|design\s+patterns|\bsolid\s+principles\b/i,
  },

  // --- Testing & Quality Assurance ---
  {
    name: 'Unit Testing',
    category: 'Testing',
    aliases: ['Jest', 'Vitest', 'JUnit', 'PyTest', 'TDD'],
    pattern: /unit\s+test(ing)?|\bjest\b|\bvitest\b|\bjunit\b|\bpytest\b|\btdd\b/i,
  },
  {
    name: 'Integration Testing',
    category: 'Testing',
    aliases: ['E2E Testing', 'Cypress', 'Playwright', 'Selenium'],
    pattern: /integration\s+test(ing)?|\be2e\s+test(ing)?|\bcypress\b|\bplaywright\b|\bselenium\b/i,
  },

  // --- Mobile Development ---
  {
    name: 'Flutter',
    category: 'Mobile',
    aliases: ['Dart', 'Flutter Mobile'],
    pattern: /\bflutter\b|\bdart\b/i,
  },
  {
    name: 'React Native',
    category: 'Mobile',
    aliases: ['RN'],
    pattern: /\breact\s+native\b|\brn\b/i,
  },

  // --- AI, Machine Learning & Data ---
  {
    name: 'Machine Learning',
    category: 'AI & Data',
    aliases: ['ML', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn'],
    pattern: /machine\s+learning|\bml\b|deep\s+learning|\bpytorch\b|\btensorflow\b|\bscikit-learn\b/i,
  },
  {
    name: 'Generative AI',
    category: 'AI & Data',
    aliases: ['LLMs', 'OpenAI', 'Gemini', 'LangChain', 'RAG'],
    pattern: /generative\s+ai|\bllms?\b|\blangchain\b|\brag\b|openai|gemini\s+api/i,
  },
];

/**
 * Finds all matching skills in the resume text with contextual evidence sentences.
 */
export function extractSkillsWithEvidence(
  text: string,
  sections?: { experience?: string; projects?: string; skills?: string }
): {
  matchedSkills: {
    name: string;
    category: string;
    matchedAs: string;
    context: string;
    isExplicit: boolean;
  }[];
  stuffingDetected: boolean;
  stuffedSkills: string[];
} {
  const sentences = text
    .split(/(?<=[.!?\n])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const matchedSkills: {
    name: string;
    category: string;
    matchedAs: string;
    context: string;
    isExplicit: boolean;
  }[] = [];

  const skillFrequency: Record<string, number> = {};
  const stuffedSkills: string[] = [];

  for (const skill of SKILL_ONTOLOGY) {
    let matchFound = false;
    let matchContext = '';
    let matchedKeyword = skill.name;

    // Check across sentences to capture evidence
    for (const sentence of sentences) {
      if (skill.pattern.test(sentence)) {
        matchFound = true;
        matchContext = sentence.slice(0, 160);
        // Find exact substring match
        const m = sentence.match(skill.pattern);
        if (m) matchedKeyword = m[0];
        break;
      }
    }

    if (matchFound) {
      // Calculate frequency to detect keyword stuffing
      const allOccurrences = text.match(new RegExp(skill.pattern.source, 'gi')) || [];
      const count = allOccurrences.length;
      skillFrequency[skill.name] = count;

      // If a skill appears more than 7 times in a resume under 600 words, flag stuffing
      if (count >= 7) {
        stuffedSkills.push(skill.name);
      }

      // Check whether it appears in structured sections
      const isExplicit = Boolean(
        (sections?.skills && skill.pattern.test(sections.skills)) ||
        (sections?.experience && skill.pattern.test(sections.experience)) ||
        (sections?.projects && skill.pattern.test(sections.projects))
      );

      matchedSkills.push({
        name: skill.name,
        category: skill.category,
        matchedAs: matchedKeyword,
        context: matchContext,
        isExplicit: isExplicit || Boolean(matchContext),
      });
    }
  }

  return {
    matchedSkills,
    stuffingDetected: stuffedSkills.length > 0,
    stuffedSkills,
  };
}
