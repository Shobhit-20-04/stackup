'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Cpu, 
  ArrowRight, 
  Check, 
  Compass, 
  Terminal, 
  Globe, 
  FolderGit2, 
  Sparkles, 
  BookA, 
  Play, 
  CheckCircle2, 
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { getFastCachedUser, getCurrentUser, type UserSession } from '@/lib/auth/session';

type PersonaId = 'beginner' | 'developer' | 'cs_student' | 'placement';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
  const [selectedPersona, setSelectedPersona] = useState<PersonaId>('beginner');
  const [interactiveLang, setInteractiveLang] = useState<'python' | 'javascript'>('python');
  const [hasExecutedInteractive, setHasExecutedInteractive] = useState(false);

  useEffect(() => {
    void getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

  // 6-Stage Beginner-to-Career Roadmap
  const roadmapStages = useMemo(() => [
    {
      stage: 1,
      title: '01. Digital Foundations',
      description: 'How computers work, CPU/RAM, operating systems, internet, and code editor setup.',
      href: '/learn#stage-1',
      badge: 'Zero Prerequisites',
      icon: Terminal,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      highlights: ['Computer Hardware', 'How the Internet Works', 'What is Code?', 'VS Code Setup']
    },
    {
      stage: 2,
      title: '02. Programming Fundamentals',
      description: 'Variables, data types, if/else conditions, loops, functions, lists, and logic building.',
      href: '/learn#stage-2',
      badge: 'Hands-on Logic',
      icon: Code2,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      highlights: ['Variables & Types', 'Decision If/Else', 'Loops Automation', 'Reusable Functions']
    },
    {
      stage: 3,
      title: '03. Web & Software Development',
      description: 'HTML5, CSS3, JavaScript DOM, REST APIs, PostgreSQL databases, and Git/GitHub.',
      href: '/learn#stage-3',
      badge: 'Full-Stack Builder',
      icon: Globe,
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      highlights: ['HTML & CSS Layout', 'JavaScript DOM', 'Backend REST APIs', 'SQL & Git/GitHub']
    },
    {
      stage: 4,
      title: '04. Computer Science & Architecture',
      description: 'Operating Systems, DBMS internals, Computer Networks, and System Design fundamentals.',
      href: '/core-cs',
      badge: 'Deep Systems',
      icon: Cpu,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
      highlights: ['Operating Systems (OS)', 'DBMS & Indexing', 'Networks & TCP/IP', 'System Design']
    },
    {
      stage: 5,
      title: '05. Practical Project Development',
      description: 'Guided projects from personal calculators to full-stack cloud notes and real-time boards.',
      href: '/projects',
      badge: 'Portfolio Ready',
      icon: FolderGit2,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
      highlights: ['Calculator & Todo App', 'Weather API Dashboard', 'Authenticated Notes', 'Real-Time Sync']
    },
    {
      stage: 6,
      title: '06. Career & Placement Preparation',
      description: 'Pattern-based DSA (150 problems), campus aptitude, and automated ATS resume diagnostics.',
      href: '/resume-checker',
      badge: 'Interview Tested',
      icon: GraduationCap,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
      highlights: ['NeetCode 150 Patterns', 'Problem of the Day', 'Aptitude Screening', 'ATS Resume Scorer']
    }
  ], []);

  const interactiveCode = useMemo(() => {
    if (interactiveLang === 'python') {
      return {
        code: `# Your first program in Python!
name = "Future Developer"
goals = ["Digital Foundations", "Build Web Apps", "Master DSA"]

print("Welcome to StackUp, " + name + "!")
for item in goals:
    print("  -> Ready to master: " + item)`,
        output: `Welcome to StackUp, Future Developer!
  -> Ready to master: Digital Foundations
  -> Ready to master: Build Web Apps
  -> Ready to master: Master DSA`
      };
    } else {
      return {
        code: `// Your first program in JavaScript!
const student = { name: "Future Developer", level: 1 };

function levelUp(user) {
  user.level += 1;
  return \`Welcome to StackUp, \${user.name}! You are now Level \${user.level}.\`;
}

console.log(levelUp(student));`,
        output: `Welcome to StackUp, Future Developer! You are now Level 2.`
      };
    }
  }, [interactiveLang]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      
      {/* 1. BEGINNER-FIRST HERO MASTHEAD */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            
            {/* Left Column: Mission & Progressive Framing */}
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/10 text-xs font-bold text-[var(--brand-primary)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ZERO TECHNICAL KNOWLEDGE &rarr; CAREER-READY BUILDER</span>
                </div>
                {currentUser && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    👋 Welcome back, {currentUser.email.split('@')[0]}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.12]">
                Learn technology from the ground up, with zero confusion.
              </h1>

              <p className="text-sm sm:text-base text-[var(--foreground-muted)] leading-relaxed font-normal max-w-xl">
                Never written a line of code? Stared at computer jargon and felt overwhelmed? You are in the right place. StackUp is a friendly, guided journey—from understanding your computer to building real software and landing your dream tech role.
              </p>

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/learn"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-all flex items-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Start Learning (Stage 1)</span>
                </Link>

                <Link
                  href="/projects"
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                >
                  <FolderGit2 className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>Guided Projects</span>
                </Link>

                <Link
                  href="/glossary"
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors flex items-center space-x-1.5"
                >
                  <BookA className="w-4 h-4" />
                  <span>Plain-English Glossary &rarr;</span>
                </Link>
              </div>

              {/* Confidence Guarantee */}
              <div className="pt-2 flex items-center space-x-4 text-xs text-[var(--foreground-muted)]">
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>No prior experience needed</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Zero-jargon explanations</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Free & Open</span>
                </span>
              </div>
            </div>

            {/* Right Column: Interactive "Run Your First Program" Live Box */}
            <div className="lg:w-96 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 space-y-4 shadow-sm shrink-0">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[var(--foreground)]">Try Your First Line of Code</span>
                </div>
                {/* Language Switcher */}
                <div className="flex items-center bg-[var(--surface-sunken)] p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => { setInteractiveLang('python'); setHasExecutedInteractive(false); }}
                    className={`px-2 py-1 rounded-md transition-all ${interactiveLang === 'python' ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--foreground-muted)]'}`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => { setInteractiveLang('javascript'); setHasExecutedInteractive(false); }}
                    className={`px-2 py-1 rounded-md transition-all ${interactiveLang === 'javascript' ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--foreground-muted)]'}`}
                  >
                    JavaScript
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed">
                <pre><code>{interactiveCode.code}</code></pre>
              </div>

              {/* Execution Output */}
              {hasExecutedInteractive ? (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-800 dark:text-emerald-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>🎉 High five! You just ran real code.</span>
                    </div>
                    <button
                      onClick={() => setHasExecutedInteractive(false)}
                      className="text-[10px] font-sans font-semibold text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                  <pre className="text-[11px] whitespace-pre-wrap p-2 rounded bg-black/5 dark:bg-black/30 font-mono">{interactiveCode.output}</pre>
                  <p className="text-[10px] font-sans text-emerald-700 dark:text-emerald-300">
                    See? You gave structured instructions, and the machine followed them line-by-line. That is all software development is.
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setHasExecutedInteractive(true)}
                  className="w-full py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Run Code &amp; See Magic Happen</span>
                </button>
              )}

              <p className="text-[11px] text-[var(--foreground-muted)] text-center">
                That is real code running! Next step: <Link href="/learn" className="text-[var(--brand-primary)] font-bold hover:underline">Explore Stage 1</Link>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 2. "WHERE ARE YOU STARTING FROM?" PATH SELECTOR */}
      <section className="py-12 border-b border-[var(--border-subtle)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Tailored For Your Background
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
              Where Are You Starting From?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)]">
              StackUp adjusts to where you are. Choose your current experience level to view your custom path.
            </p>
          </div>

          {/* Persona Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'beginner', label: '1. Complete Beginner (Zero Tech Knowledge)' },
              { id: 'developer', label: '2. Know Basics, Want to Build Real Apps' },
              { id: 'cs_student', label: '3. CS Student (Need Systems & Algorithms)' },
              { id: 'placement', label: '4. Preparing for Placements & Jobs' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id as PersonaId)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPersona === p.id
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border-subtle)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Dynamic Persona Card */}
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-xs space-y-4">
            {selectedPersona === 'beginner' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Welcome! You are in the right place.</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  We assume you have never touched a terminal or written a line of code. We start with how computers store memory, how web browsers load pages, what code is, and write simple Python exercises with real-world analogies.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground)]">Recommended: Stage 1 Digital Foundations</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground)]">Followed by: Stage 2 Programming Fundamentals</span>
                </div>
                <div className="pt-2">
                  <Link href="/learn#stage-1" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline">
                    <span>Start Stage 1 Lessons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {selectedPersona === 'developer' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <Globe className="w-5 h-5" />
                  <span>Time to build full applications!</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  You know what variables and loops are. Now connect them into functional software: HTML/CSS structure, JavaScript DOM event listeners, REST APIs, PostgreSQL tables, and step-by-step portfolio projects.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground)]">Recommended: Stage 3 Web Development</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground)]">Followed by: Stage 5 Guided Projects</span>
                </div>
                <div className="pt-2">
                  <Link href="/projects" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline">
                    <span>View Guided Project Milestones</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {selectedPersona === 'cs_student' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Cpu className="w-5 h-5" />
                  <span>Core Computer Science & Deep Systems</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  Deep-dive into 221 verified engineering topics with interactive notes and exam MCQs: Operating Systems (paging, deadlocks), DBMS (indexing, ACID), Networks (TCP/IP), and asymptotic algorithm complexity.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground)]">Recommended: Stage 4 Core CS Syllabus</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground)]">221 Curated Engineering Topics</span>
                </div>
                <div className="pt-2">
                  <Link href="/core-cs" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline">
                    <span>Explore Core CS Disciplines</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {selectedPersona === 'placement' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <GraduationCap className="w-5 h-5" />
                  <span>Placement & Career Preparation</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  Prepare for company recruitment drives: solve our 150 NeetCode-aligned DSA patterns, practice timed campus aptitude assessments, and run your resume through our automated ATS scanner with STAR bullet rewriting.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground)]">Recommended: Stage 6 Placement Suite</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground)]">DSA Hub + ATS Resume Checker</span>
                </div>
                <div className="pt-2">
                  <Link href="/resume-checker" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline">
                    <span>Scan Resume with ATS Checker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2.5 WHY STACKUP FEELS DIFFERENT (Human-First Pedagogy) */}
      <section className="py-14 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Human-First Learning
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
              Designed For Humans, Not Compilers
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)]">
              Most coding sites throw dry syntax at you and hope for the best. We built StackUp to be the supportive, encouraging mentor we wished we had.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                🌱
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Zero Gatekeeping</h3>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Every concept starts in plain English with everyday metaphors before any code is shown. No assumed prerequisites.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                💡
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Vivid Analogies</h3>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Functions are vending machines, variables are labeled storage boxes, and APIs are restaurant waiters. You learn intuition first.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
                🛡️
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Safe to Make Mistakes</h3>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Errors aren&apos;t failures—they are how real engineers learn. We explain bug messages kindly and show you how to fix them calmly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
                🚀
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Real Portfolio Proof</h3>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                You won&apos;t just solve isolated puzzles. You&apos;ll build, test, and deploy genuine applications you can proudly link on your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 6-STAGE ROADMAP AT A GLANCE */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Curriculum Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
              The 6 Stages to Technical Independence
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-xl">
              Each stage builds on the previous one. No magic tricks, no unexplained leaps in difficulty.
            </p>
          </div>

          <Link
            href="/learn"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[var(--brand-primary)] hover:bg-[var(--surface-card)] border border-[var(--border-subtle)] transition-all flex items-center space-x-1.5 self-start md:self-auto"
          >
            <span>Open Complete Roadmap Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.stage}
                className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-6 shadow-xs group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${stage.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--foreground-muted)]">
                      {stage.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)]/60">
                    <span className="text-[10px] font-bold uppercase text-[var(--foreground-muted)] block">Key Topics:</span>
                    <div className="flex flex-wrap gap-1">
                      {stage.highlights.map((h, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={stage.href}
                  className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-bold text-[var(--brand-primary)] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore Stage</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. GUIDED PROJECT DEVELOPMENT CALLOUT */}
      <section className="py-12 border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--border-subtle)] p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Stage 5 // Learning By Building
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
                Stop watching tutorials. Build real software.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                Choose from beginner projects (Personal Profile, Interactive Calculator, Task Tracker) to advanced full-stack apps (Weather Dashboard, Cloud Notes, Real-Time Collaboration). Every project includes starter code, milestones, testing steps, and grading rubrics.
              </p>
            </div>

            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold flex items-center space-x-2 transition-all shadow-sm shrink-0"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Browse All Guided Projects</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PLAIN-ENGLISH GLOSSARY BANNER */}
      <section className="py-12 border-t border-[var(--border-subtle)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <BookA className="w-4 h-4" />
                <span>Stuck on confusing technical words?</span>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Our interconnected glossary defines over 50 essential industry terms—including API, Compiler, Algorithm, DOM, Git, and Database—with real-world analogies and direct links to lessons.
              </p>
            </div>

            <Link
              href="/glossary"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-2xs shrink-0"
            >
              Open Technical Glossary
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
