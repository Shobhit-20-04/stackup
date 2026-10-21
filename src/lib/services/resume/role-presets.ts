/**
 * Pre-configured Industry Target Roles for Resume Benchmarking
 */

export interface RolePreset {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  keywords: string[];
  coreResponsibilities: string[];
}

export const TARGET_ROLE_PRESETS: RolePreset[] = [
  {
    id: 'full-stack-engineer',
    title: 'Full-Stack Software Engineer',
    description: 'Designs, implements, and tests end-to-end web applications across modern frontend architectures, backend APIs, and relational databases.',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Git'],
    preferredSkills: ['Next.js', 'PostgreSQL', 'Docker', 'REST APIs', 'Tailwind CSS', 'Redis', 'Unit Testing'],
    keywords: ['full-stack', 'api', 'frontend', 'backend', 'database', 'responsive', 'state management', 'microservices', 'crud'],
    coreResponsibilities: [
      'Architect and deliver responsive, accessible user interfaces using modern web frameworks',
      'Design, develop, and secure RESTful APIs and backend microservices',
      'Model relational database schemas and optimize SQL queries for production scale',
      'Implement automated unit and integration tests across frontend and backend modules',
      'Collaborate with product and design teams in agile sprint cadences',
    ],
  },
  {
    id: 'backend-engineer',
    title: 'Backend Software Engineer',
    description: 'Builds high-performance server architectures, distributed microservices, message queues, and resilient data storage engines.',
    requiredSkills: ['Java', 'Python', 'Node.js', 'Go', 'SQL', 'REST APIs', 'Git'],
    preferredSkills: ['PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Microservices', 'System Design', 'Kafka', 'gRPC'],
    keywords: ['concurrency', 'throughput', 'latency', 'caching', 'indexing', 'transactions', 'scalability', 'distributed systems'],
    coreResponsibilities: [
      'Architect robust server-side business logic and scalable REST/gRPC microservices',
      'Design high-throughput database schemas, indexes, and caching tiers with Redis',
      'Optimize API response times, memory footprints, and p95/p99 query latencies',
      'Implement distributed message queues, asynchronous background workers, and event streaming',
      'Ensure high availability, data consistency, and zero-downtime database migrations',
    ],
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Web Engineer',
    description: 'Crafts performant, accessible, and high-fidelity user experiences using modern JavaScript/TypeScript component frameworks.',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'HTML5/CSS3', 'Git'],
    preferredSkills: ['Next.js', 'Tailwind CSS', 'Redux', 'GraphQL', 'Unit Testing', 'Vue.js', 'REST APIs'],
    keywords: ['web vitals', 'lighthouse', 'accessibility', 'a11y', 'responsive design', 'bundle size', 'state management', 'ui/ux'],
    coreResponsibilities: [
      'Translate Figma designs into production-ready, modular, and reusable component libraries',
      'Optimize Core Web Vitals (LCP, INP, CLS) and client-side bundle performance',
      'Manage complex client-side state, caching, and optimistic UI updates',
      'Ensure cross-browser compatibility and strict WCAG accessibility compliance',
      'Write comprehensive unit tests with Jest/Vitest and end-to-end tests with Cypress/Playwright',
    ],
  },
  {
    id: 'devops-cloud-engineer',
    title: 'DevOps & Cloud Platform Engineer',
    description: 'Automates infrastructure provisioning, container orchestration, CI/CD pipelines, and site reliability engineering.',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git'],
    preferredSkills: ['GCP', 'Azure', 'Terraform', 'Python', 'Bash', 'System Design', 'Microservices'],
    keywords: ['infrastructure as code', 'iac', 'monitoring', 'observability', 'helm', 'prometheus', 'grafana', 'automation', 'sli/slo'],
    coreResponsibilities: [
      'Design, build, and maintain automated CI/CD deployment pipelines using GitHub Actions or GitLab CI',
      'Manage containerized microservice deployments across multi-node Kubernetes clusters',
      'Provision scalable, fault-tolerant cloud infrastructure using Infrastructure as Code (Terraform)',
      'Configure system monitoring, log aggregation, alerting thresholds, and incident runbooks',
      'Enforce cloud security baselines, IAM least-privilege policies, and compliance guardrails',
    ],
  },
  {
    id: 'data-engineer',
    title: 'Data & Pipeline Engineer',
    description: 'Constructs scalable ETL pipelines, data warehouses, streaming analytics systems, and analytical datasets.',
    requiredSkills: ['Python', 'SQL', 'PostgreSQL', 'Git'],
    preferredSkills: ['GCP', 'AWS', 'Docker', 'Kafka', 'Redis', 'Linux'],
    keywords: ['etl', 'elt', 'data warehouse', 'bigquery', 'data lake', 'spark', 'streaming', 'data modeling', 'pipeline'],
    coreResponsibilities: [
      'Build resilient batch and streaming data ingestion pipelines',
      'Model dimensional data schemas (star and snowflake) for analytical querying',
      'Optimize analytical SQL queries, partition keys, and clustering across warehouse tables',
      'Implement data quality validation, anomaly detection, and schema migration tests',
      'Collaborate with analytics and machine learning teams to expose clean feature stores',
    ],
  },
  {
    id: 'fresher-sde',
    title: 'Graduate / Junior Software Engineer (SDE-1)',
    description: 'Entry-level engineering role emphasizing computer science foundations, problem-solving, clean code, and fast learning agility.',
    requiredSkills: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'Git', 'SQL'],
    preferredSkills: ['Python', 'Java', 'C++', 'JavaScript', 'React', 'Node.js', 'REST APIs', 'Unit Testing'],
    keywords: ['problem solving', 'coursework', 'academic projects', 'internship', 'debugging', 'clean code', 'hackathon'],
    coreResponsibilities: [
      'Apply strong data structures and algorithmic problem-solving to design efficient software',
      'Write clean, well-tested, and maintainable object-oriented code',
      'Participate actively in code reviews, design discussions, and sprint retrospectives',
      'Develop academic capstone or commercial software features under senior guidance',
      'Debug runtime errors, reproduce defects, and document technical solutions',
    ],
  },
  {
    id: 'mobile-developer',
    title: 'Mobile Application Developer',
    description: 'Engineers native and cross-platform mobile applications for iOS and Android devices.',
    requiredSkills: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Git', 'REST APIs'],
    preferredSkills: ['TypeScript', 'Firebase', 'State Management', 'Unit Testing'],
    keywords: ['mobile', 'ios', 'android', 'app store', 'play store', 'offline-first', 'push notifications'],
    coreResponsibilities: [
      'Build engaging, smooth 60fps mobile interfaces for iOS and Android platforms',
      'Integrate device APIs: push notifications, camera, local biometrics, and offline caching',
      'Publish and maintain production application builds in Apple App Store and Google Play',
      'Profile application memory, battery utilization, and network payload footprints',
    ],
  },
];

export function getRolePresetById(id: string): RolePreset | undefined {
  return TARGET_ROLE_PRESETS.find((r) => r.id === id);
}
