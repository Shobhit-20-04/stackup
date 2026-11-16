'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Code2, 
  Globe, 
  Cpu, 
  FolderGit2, 
  GraduationCap, 
  Clock, 
  Check, 
  BookOpen, 
  Award
} from 'lucide-react';
import { getReadTopicIds, getLocalQuizAttempts } from '@/lib/services/progress';

type ExperienceLevel = 'zero' | 'basics' | 'cs_student' | 'placement';
type LearningGoal = 'literacy' | 'web' | 'dsa' | 'career';

interface StageDefinition {
  stageNumber: number;
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badge: string;
  targetAudience: string;
  learningOutcome: string;
  href: string;
  modules: Array<{
    title: string;
    description: string;
    href: string;
    estimatedMins: number;
    topicId?: string;
  }>;
}

export default function LearnRoadmapPage() {
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('zero');
  const [goal, setGoal] = useState<LearningGoal>('literacy');
  const [recommendedStage, setRecommendedStage] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    try {
      const saved = localStorage.getItem('stackup_recommended_stage');
      return saved ? parseInt(saved, 10) || 1 : 1;
    } catch {
      return 1;
    }
  });
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return Boolean(localStorage.getItem('stackup_recommended_stage'));
    } catch {
      return false;
    }
  });

  // Real progress signals from storage
  const [readTopics] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return getReadTopicIds();
    } catch {
      return [];
    }
  });
  const [quizAttemptsCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      return getLocalQuizAttempts().length;
    } catch {
      return 0;
    }
  });
  const [solvedDsaCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const storedDsa = localStorage.getItem('stackup_solved_dsa') || localStorage.getItem('dsa_solved_ids');
      if (storedDsa) {
        const parsed = JSON.parse(storedDsa);
        if (Array.isArray(parsed)) return parsed.length;
      }
    } catch {
      // ignore
    }
    return 0;
  });

  const handleFinishAssessment = () => {
    let stage = 1;
    if (experienceLevel === 'zero') {
      stage = 1;
    } else if (experienceLevel === 'basics') {
      stage = goal === 'web' ? 3 : 2;
    } else if (experienceLevel === 'cs_student') {
      stage = goal === 'dsa' ? 4 : 3;
    } else if (experienceLevel === 'placement') {
      stage = 6;
    }
    setRecommendedStage(stage);
    setHasCompletedAssessment(true);
    setAssessmentOpen(false);
    try {
      localStorage.setItem('stackup_recommended_stage', stage.toString());
    } catch {
      // ignore
    }
  };

  const stages: StageDefinition[] = useMemo(() => [
    {
      stageNumber: 1,
      id: 'stage-1',
      title: 'Stage 1 — Digital Foundations',
      subtitle: 'Zero-Jargon Introduction to Computers, Hardware & The Web',
      icon: Terminal,
      accentColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      badge: 'Zero Prerequisites',
      targetAudience: 'Anyone who has never studied technology and wants to understand how computers and software actually work.',
      learningOutcome: 'You understand computer hardware (CPU/RAM/SSD), the internet, browsers, servers, what code is, and have your code editor installed.',
      href: '/core-cs#how-computers-work-hardware-software',
      modules: [
        {
          title: 'How Computers Work: Hardware, Memory & Storage',
          description: 'CPU calculations, RAM volatile memory, permanent SSD storage, and operating systems.',
          href: '/core-cs#how-computers-work-hardware-software',
          estimatedMins: 15,
          topicId: 'computer-hardware-software'
        },
        {
          title: 'How the Internet Works: Websites, Browsers & Servers',
          description: 'The journey of a web page: URLs, IP addresses, DNS lookup, and HTTP/HTTPS requests.',
          href: '/core-cs#how-the-internet-works-browsers-servers',
          estimatedMins: 16,
          topicId: 'how-the-internet-works'
        },
        {
          title: 'What Is Programming? Code, Algorithms & Compilers',
          description: 'What programming actually is, why code is written, algorithms, and compilers vs interpreters.',
          href: '/core-cs#what-is-programming-languages-algorithms',
          estimatedMins: 18,
          topicId: 'what-is-programming'
        },
        {
          title: 'Your Developer Environment: Editors, Terminals & Running Code',
          description: 'Setting up VS Code, understanding file extensions, terminal navigation (cd, ls, mkdir), and your first program.',
          href: '/core-cs#developer-environment-tools-setup',
          estimatedMins: 20,
          topicId: 'developer-setup-basics'
        }
      ]
    },
    {
      stageNumber: 2,
      id: 'stage-2',
      title: 'Stage 2 — Programming Fundamentals',
      subtitle: 'Core Computational Thinking & Logic in Python & JavaScript',
      icon: Code2,
      accentColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      badge: 'Hands-On Logic',
      targetAudience: 'Learners ready to write their first programs, solve logical puzzles, and automate tasks.',
      learningOutcome: 'You can write clean programs independently using variables, conditional branching, loops, functions, and collections.',
      href: '/core-cs#variables-data-types-memory-boxes',
      modules: [
        {
          title: 'Variables & Data Types: How Code Remembers Information',
          description: 'Integers, floats, text strings, booleans, variable naming rules, and assignment.',
          href: '/core-cs#variables-data-types-memory-boxes',
          estimatedMins: 16,
          topicId: 'variables-and-data-types'
        },
        {
          title: 'Conditionals & Decision Making: If, Else If & Else',
          description: 'Comparison operators (==, !=, <, >), logical operators (and/or/not), and decision branching.',
          href: '/core-cs#conditionals-decision-making-if-else',
          estimatedMins: 18,
          topicId: 'control-flow-conditionals'
        },
        {
          title: 'Loops & Iteration: Automating Repetitive Tasks',
          description: 'For loops, while loops, counters, avoiding infinite loops, and break/continue statements.',
          href: '/core-cs#loops-and-iteration-for-while',
          estimatedMins: 18,
          topicId: 'loops-and-iteration'
        },
        {
          title: 'Functions: Writing Reusable, Modular Code',
          description: 'Function arguments, return values vs printing, local variable scope, and the DRY principle.',
          href: '/core-cs#functions-reusable-code-blocks',
          estimatedMins: 20,
          topicId: 'functions-and-modularity'
        },
        {
          title: 'Collections: Lists, Arrays & Key-Value Dictionaries',
          description: 'Storing lists of data, zero-based indexing, appending items, and dictionary key-value lookups.',
          href: '/core-cs#collections-lists-arrays-dictionaries',
          estimatedMins: 20,
          topicId: 'lists-and-dictionaries'
        }
      ]
    },
    {
      stageNumber: 3,
      id: 'stage-3',
      title: 'Stage 3 — Web & Software Development',
      subtitle: 'Building Complete Modern Web Applications (Full-Stack)',
      icon: Globe,
      accentColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      badge: 'Full-Stack Practical',
      targetAudience: 'Learners who want to create functional websites, connect databases, and collaborate with Git.',
      learningOutcome: 'You understand frontend UI, backend APIs, relational SQL databases, and team collaboration on GitHub.',
      href: '/core-cs#html-css-structure-and-styling',
      modules: [
        {
          title: 'HTML & CSS: The Building Blocks of Every Website',
          description: 'Semantic tags, forms, CSS styling, the Box Model, and modern Flexbox layouts.',
          href: '/core-cs#html-css-structure-and-styling',
          estimatedMins: 20,
          topicId: 'html-css-web-foundations'
        },
        {
          title: 'JavaScript & The DOM: Making Web Pages Interactive',
          description: 'The DOM tree, element selection, click event listeners, dynamic UI updates, and React concepts.',
          href: '/core-cs#javascript-dom-events-interactivity',
          estimatedMins: 20,
          topicId: 'javascript-dom-interactivity'
        },
        {
          title: 'Backend & APIs: What Happens Behind the Scenes',
          description: 'Client vs server, JSON data format, REST APIs, HTTP verbs (GET/POST/PUT/DELETE), and fetch calls.',
          href: '/core-cs#backend-apis-rest-servers-databases',
          estimatedMins: 20,
          topicId: 'backend-apis-rest'
        },
        {
          title: 'Databases & SQL: Storing Information Permanently',
          description: 'Tables, rows, columns, Primary and Foreign Keys, and SQL queries (SELECT, INSERT, UPDATE, DELETE).',
          href: '/core-cs#databases-sql-relational-data-tables',
          estimatedMins: 20,
          topicId: 'databases-sql-crud'
        },
        {
          title: 'Git & GitHub: Time Travel & Team Collaboration',
          description: 'Version control snapshots, commits, pushing to GitHub repositories, branches, and Pull Requests.',
          href: '/core-cs#git-github-version-control-collaboration',
          estimatedMins: 20,
          topicId: 'git-github-collaboration'
        }
      ]
    },
    {
      stageNumber: 4,
      id: 'stage-4',
      title: 'Stage 4 — Computer Science & Technical Thinking',
      subtitle: 'Operating Systems, DBMS, Networks, Data Structures & System Architecture',
      icon: Cpu,
      accentColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      badge: 'Core CS Foundations',
      targetAudience: 'Learners preparing for technical depth, college engineering exams, and system engineering discussions.',
      learningOutcome: 'You understand deep system internals: memory management, process concurrency, relational transactions (ACID), and network protocols.',
      href: '/core-cs',
      modules: [
        {
          title: 'Operating Systems: Processes, Threads & Deadlocks',
          description: 'CPU scheduling, virtual memory paging, multithreading synchronization, and Coffman deadlock conditions.',
          href: '/core-cs',
          estimatedMins: 35
        },
        {
          title: 'Database Management Systems: Indexing & ACID Transactions',
          description: 'B+ Tree indexing, normalization (1NF to BCNF), transaction isolation levels, and write-ahead logging.',
          href: '/core-cs',
          estimatedMins: 40
        },
        {
          title: 'Computer Networks: The OSI & TCP/IP Stack',
          description: 'TCP 3-way handshake, packet routing, congestion control, HTTP/2 & HTTP/3, and DNS resolution.',
          href: '/core-cs',
          estimatedMins: 35
        },
        {
          title: 'Data Structures & Algorithms Foundations',
          description: 'Asymptotic Big-O notation, Two Pointers, Sliding Window, Trees, and Dynamic Programming.',
          href: '/dsa',
          estimatedMins: 45
        }
      ]
    },
    {
      stageNumber: 5,
      id: 'stage-5',
      title: 'Stage 5 — Practical Project Development',
      subtitle: 'Building Resume-Worthy Software from Architecture to Deployment',
      icon: FolderGit2,
      accentColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      badge: 'Portfolio Ready',
      targetAudience: 'Learners who want tangible software projects to demonstrate their abilities to hiring managers.',
      learningOutcome: 'You have designed, implemented, tested, and deployed full projects independently on GitHub.',
      href: '/projects',
      modules: [
        {
          title: 'Level 1: Personal Profile & Calculator',
          description: 'Responsive styling, Flexbox layout, and DOM event handling calculator.',
          href: '/projects',
          estimatedMins: 60
        },
        {
          title: 'Level 2: Task Tracker with LocalStorage',
          description: 'Client-side CRUD operations and persistent browser JSON serialization.',
          href: '/projects',
          estimatedMins: 90
        },
        {
          title: 'Level 3: Live Weather Dashboard (Public API)',
          description: 'Asynchronous fetch, loading skeletons, unit conversion, and network error handling.',
          href: '/projects',
          estimatedMins: 120
        },
        {
          title: 'Level 4: Authenticated Cloud Notes App',
          description: 'Full-stack application with Supabase Auth, PostgreSQL Row Level Security, and Markdown.',
          href: '/projects',
          estimatedMins: 180
        }
      ]
    },
    {
      stageNumber: 6,
      id: 'stage-6',
      title: 'Stage 6 — Career & Professional Placement',
      subtitle: 'DSA Patterns, Campus Aptitude, ATS Resume Diagnostics & Interviews',
      icon: GraduationCap,
      accentColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      badge: 'Job Ready',
      targetAudience: 'Students and job-seekers preparing for screening rounds, coding assessments, and technical interviews.',
      learningOutcome: 'You have an interview-tested DSA foundation, verified aptitude speed, and an ATS-optimized technical resume.',
      href: '/resume-checker',
      modules: [
        {
          title: 'High-Frequency DSA Patterns (NeetCode 150)',
          description: 'Two Pointers, Binary Search, Trees, Dynamic Programming with multi-language execution in our coding workspace.',
          href: '/dsa',
          estimatedMins: 60
        },
        {
          title: 'Campus Aptitude Assessments',
          description: 'Timed quantitative aptitude, logical reasoning, verbal ability, and spatial deduction tests.',
          href: '/aptitude',
          estimatedMins: 45
        },
        {
          title: 'Automated ATS Resume Diagnostics & STAR Rewriter',
          description: 'Scan your resume against 5 scoring dimensions and rewrite bullets with quantifiable metrics.',
          href: '/resume-checker',
          estimatedMins: 30
        }
      ]
    }
  ], []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Masthead */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold border border-[var(--brand-primary)]/20">
            <Compass className="w-3.5 h-3.5" />
            <span>STRUCTURED LEARNING ROADMAP</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.12]">
            From Zero Technical Knowledge to Career-Ready Software Builder
          </h1>
          <p className="text-sm sm:text-base text-[var(--foreground-muted)] max-w-3xl leading-relaxed">
            Technology is not a collection of random disconnected courses. It is a progressive journey. Start wherever you feel comfortable, master concepts one step at a time, and build real applications.
          </p>

          {/* Action Row: Level Assessment Callout */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setAssessmentOpen(true)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{hasCompletedAssessment ? 'Retake Starting Point Assessment' : 'Find Your Starting Point (1-Minute Quiz)'}</span>
            </button>

            <Link
              href="/glossary"
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all flex items-center space-x-2 shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Technical Glossary (50+ Terms)</span>
            </Link>

            <Link
              href="/projects"
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors flex items-center space-x-1.5"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Guided Projects &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Live Learning Progress Tracker */}
        {(readTopics.length > 0 || quizAttemptsCount > 0 || solvedDsaCount > 0) && (
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-2xs">
            <div className="text-center space-y-0.5">
              <span className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider font-bold">Topics Read</span>
              <p className="text-base font-black text-[var(--foreground)]">{readTopics.length}</p>
            </div>
            <div className="text-center space-y-0.5 border-x border-[var(--border-subtle)]">
              <span className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider font-bold">Quizzes Taken</span>
              <p className="text-base font-black text-emerald-600 dark:text-emerald-400">{quizAttemptsCount}</p>
            </div>
            <div className="text-center space-y-0.5">
              <span className="text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider font-bold">DSA Solved</span>
              <p className="text-base font-black text-amber-600 dark:text-amber-400">{solvedDsaCount}</p>
            </div>
          </div>
        )}

        {/* Personalized Recommendation Banner (if assessment taken) */}
        {hasCompletedAssessment && (
          <div className="p-5 sm:p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-950 dark:text-indigo-200 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Your Personalized Recommendation</span>
            </div>
            <p className="leading-relaxed">
              Based on your answers, we recommend starting at <strong>Stage {recommendedStage}: {stages[recommendedStage - 1]?.title}</strong>. All earlier and later stages remain fully unlocked for you to explore at your own pace.
            </p>
          </div>
        )}

        {/* Diagnostic Assessment Modal */}
        {assessmentOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-[var(--foreground)]">
                  Where Should You Begin on StackUp?
                </h3>
                <p className="text-xs text-[var(--foreground-muted)]">
                  Answer 2 quick questions to find the ideal starting stage for your current level.
                </p>
              </div>

              {/* Question 1: Experience */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--foreground)] block">
                  1. Have you ever written code or studied technology before?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'zero', label: 'Never. I have zero technical knowledge and am starting from scratch.' },
                    { id: 'basics', label: 'I know some basics (variables, loops), but have never built real applications.' },
                    { id: 'cs_student', label: 'I study Computer Science / Engineering and want system architecture & DSA.' },
                    { id: 'placement', label: 'I am preparing for job interviews, coding rounds, and campus placements.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setExperienceLevel(opt.id as ExperienceLevel)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        experienceLevel === opt.id
                          ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--foreground)]'
                          : 'border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Primary Goal */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--foreground)] block">
                  2. What is your primary learning goal?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'literacy', label: 'Understand how computers and software work' },
                    { id: 'web', label: 'Learn to build websites and web apps' },
                    { id: 'dsa', label: 'Master Data Structures & Algorithms' },
                    { id: 'career', label: 'Optimize resume & pass placement tests' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setGoal(opt.id as LearningGoal)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        goal === opt.id
                          ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--foreground)]'
                          : 'border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setAssessmentOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--foreground)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinishAssessment}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-all shadow-xs cursor-pointer"
                >
                  Show Recommended Path
                </button>
              </div>
            </div>
          </div>
        )}

        {/* The 6-Stage Roadmap Visualizer */}
        <div className="space-y-12">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isRecommended = recommendedStage === stage.stageNumber && hasCompletedAssessment;
            return (
              <section
                key={stage.id}
                id={stage.id}
                className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                  isRecommended
                    ? 'border-[var(--brand-primary)] bg-[var(--surface-card)] shadow-lg ring-2 ring-[var(--brand-primary)]/30'
                    : 'border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs'
                }`}
              >
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${stage.accentColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                        {stage.badge}
                      </span>
                      {isRecommended && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-primary)] text-white">
                          Your Recommended Starting Point
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tight">
                      {stage.title}
                    </h2>
                    <p className="text-sm font-medium text-[var(--foreground-muted)]">
                      {stage.subtitle}
                    </p>
                  </div>

                  <Link
                    href={stage.href}
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--brand-primary)] hover:text-white text-xs font-bold text-[var(--foreground)] transition-all flex items-center space-x-1.5 shrink-0"
                  >
                    <span>Open Stage Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Target Audience & Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[var(--surface-sunken)]/60 border border-[var(--border-subtle)]/60 space-y-1">
                    <span className="font-bold text-[10px] uppercase text-[var(--foreground-muted)]">Target Learner</span>
                    <p className="text-[var(--foreground)]">{stage.targetAudience}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--surface-sunken)]/60 border border-[var(--border-subtle)]/60 space-y-1">
                    <span className="font-bold text-[10px] uppercase text-emerald-600 dark:text-emerald-400">Learning Outcome</span>
                    <p className="text-[var(--foreground)]">{stage.learningOutcome}</p>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                    Curriculum Lessons & Modules ({stage.modules.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stage.modules.map((mod, idx) => {
                      const isCompleted = mod.topicId ? readTopics.includes(mod.topicId) : false;
                      return (
                        <Link
                          key={idx}
                          href={mod.href}
                          className="p-4 rounded-xl border border-[var(--border-subtle)] hover:border-slate-300 dark:hover:border-zinc-700 bg-[var(--surface-sunken)]/30 hover:bg-[var(--surface-sunken)] transition-all flex flex-col justify-between group"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-[var(--foreground-muted)] flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>~{mod.estimatedMins} mins</span>
                              </span>
                              {isCompleted && (
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                                  <Check className="w-3 h-3" />
                                  <span>Reviewed</span>
                                </span>
                              )}
                            </div>

                            <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                              {mod.title}
                            </h4>
                            <p className="text-[11px] text-[var(--foreground-muted)] line-clamp-2 leading-relaxed">
                              {mod.description}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-[var(--border-subtle)]/50 flex items-center justify-end text-[11px] font-bold text-[var(--brand-primary)] group-hover:translate-x-0.5 transition-transform">
                            <span>Start Lesson &rarr;</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}
