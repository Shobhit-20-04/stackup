'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Code2, 
  Globe, 
  Cpu, 
  FolderGit2, 
  GraduationCap, 
  ArrowRight, 
  ChevronRight, 
  Compass, 
  Laptop,
  Check
} from 'lucide-react';
import { getFastCachedUser, type UserSession } from '@/lib/auth/session';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function HomePage() {
  const [currentUser] = useState<UserSession | null>(getFastCachedUser);
  const [interactiveWord, setInteractiveWord] = useState('Code');
  const [activeStageTab, setActiveStageTab] = useState<number>(1);

  // Convert input text to real ASCII binary bits for the interactive workbench
  const binaryAnalysis = useMemo(() => {
    const safeText = interactiveWord.slice(0, 8); // keep it tidy
    return safeText.split('').map((char) => {
      const ascii = char.charCodeAt(0);
      const binary = ascii.toString(2).padStart(8, '0');
      return { char, ascii, binary };
    });
  }, [interactiveWord]);

  // 6 Stages - Open Workshop Syllabus
  const curriculum = [
    {
      stage: 1,
      num: '01',
      title: 'Digital Foundations',
      subtitle: 'Understand the machine before writing a line of code.',
      time: '2–3 weeks · Zero prerequisites',
      icon: Terminal,
      href: '/learn#stage-1',
      description: 'How computers store numbers as electrical states, what CPUs and RAM physically do, how undersea fiber-optic cables route website data across the globe, and how to navigate a terminal without fear.',
      topics: [
        'How Computer Hardware Works (CPU, RAM, SSD)',
        'How the Internet Works (DNS, HTTP, IP Packets)',
        'What Code Actually Is (Compilers vs Interpreters)',
        'Your Developer Environment (VS Code & Terminal)'
      ],
      milestone: 'Navigating your filesystem and running your first standalone script.'
    },
    {
      stage: 2,
      num: '02',
      title: 'Programming Fundamentals',
      subtitle: 'Teaching a computer to follow a recipe.',
      time: '3–4 weeks · Hands-on logic',
      icon: Code2,
      href: '/learn#stage-2',
      description: 'Variables as labeled storage cubbies in memory, making decisions with conditional branching (if/else), automating repetitive tasks with loops, and organizing code into reusable functions.',
      topics: [
        'Variables & Data Types (Storing information)',
        'Conditionals & Decisions (If, else if, else)',
        'Loops & Iteration (Automating repetition)',
        'Functions (Reusable, modular building blocks)',
        'Lists & Dictionaries (Organizing collections)'
      ],
      milestone: 'Building a terminal-based interactive quiz and text adventure.'
    },
    {
      stage: 3,
      num: '03',
      title: 'Web & Software Development',
      subtitle: 'Building things people can click, use, and share.',
      time: '4–6 weeks · Full-stack builder',
      icon: Globe,
      href: '/learn#stage-3',
      description: 'HTML5 for page structure, modern CSS for responsive layouts, JavaScript for DOM interactivity, REST APIs for sending JSON data between machines, and PostgreSQL for permanent storage.',
      topics: [
        'HTML5 Semantic Structure & Forms',
        'CSS Layouts, Flexbox & Responsive Design',
        'JavaScript DOM Manipulation & Event Handling',
        'Backend Servers, REST APIs & HTTP Verbs',
        'Relational Databases & SQL Queries',
        'Version Control with Git & GitHub'
      ],
      milestone: 'Deploying an authenticated personal web app with a real database.'
    },
    {
      stage: 4,
      num: '04',
      title: 'Computer Science & Systems',
      subtitle: 'How large-scale systems work under the hood.',
      time: 'Continuous reference · 221 verified topics',
      icon: Cpu,
      href: '/core-cs',
      description: 'Deep engineering foundations: Operating Systems (processes, threads, deadlocks, paging), Database Internals (indexing, ACID, B-trees), and Computer Networks (TCP/IP, sockets, handshakes).',
      topics: [
        'Operating Systems (Processes, Threads, Virtual Memory)',
        'Database Management Systems (ACID, Transactions, Indexing)',
        'Computer Networks (TCP/IP, UDP, Routing, Sockets)',
        'Computer Organization & Architecture (Pipelining, Cache)',
        'Theory of Computation & Compiler Design'
      ],
      milestone: 'Comprehensive notes and exam MCQs across 221 engineering topics.'
    },
    {
      stage: 5,
      num: '05',
      title: 'Practical Guided Projects',
      subtitle: 'Escape tutorial hell by building standalone software.',
      time: 'Self-paced · Beginner to Advanced',
      icon: FolderGit2,
      href: '/projects',
      description: 'Step-by-step project blueprints with architectural diagrams, technology tradeoffs, milestones, test suites, and instructions on how to explain your engineering choices in an interview.',
      topics: [
        'Beginner: Interactive Calculator & Todo Manager',
        'Intermediate: Weather Dashboard with Live REST APIs',
        'Full-Stack: Authenticated Cloud Notes with PostgreSQL',
        'Advanced: Real-Time Collaborative Canvas / Board'
      ],
      milestone: 'A public GitHub portfolio of working apps you can explain with pride.'
    },
    {
      stage: 6,
      num: '06',
      title: 'Career & Placement Readiness',
      subtitle: 'Demonstrating technical competence to hiring managers.',
      time: '4–8 weeks · Interview prep',
      icon: GraduationCap,
      href: '/resume-checker',
      description: '150 curated NeetCode-aligned DSA patterns, campus recruitment aptitude drills, and an automated ATS resume scanner that evaluates quantifiable impact using Google’s XYZ bullet formula.',
      topics: [
        '150 Pattern-Based DSA Problems (Arrays to Graphs)',
        'Problem of the Day with Multi-Language Solutions',
        'Quantitative, Logical & Verbal Aptitude Modules',
        'ATS Resume Evaluator with STAR Bullet Rewrites'
      ],
      milestone: 'Passing technical screening rounds with confidence.'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors selection:bg-[var(--brand-primary)] selection:text-white">
      
      {/* ================================================================= */}
      {/* 1. QUIET, HONEST MASTHEAD                                         */}
      {/* ================================================================= */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Creator Attribution Chip */}
          <div className="flex items-center space-x-2 text-xs text-[var(--foreground-muted)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="font-medium">An open-source curriculum built by Shobhit</span>
            <span>&bull;</span>
            <span>100% Free &amp; Independent</span>
          </div>

          {/* Simple, Confident Headline */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--foreground)] leading-[1.12]">
              An honest, quiet guide to understanding technology.
            </h1>
            <p className="text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed font-normal max-w-2xl">
              Most coding websites start in the middle. They throw dry syntax, confusing terminal commands, and 150-problem LeetCode sheets at you without ever explaining how a computer actually works.
            </p>
            <p className="text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed font-normal max-w-2xl">
              StackUp begins at the physical foundation: what electricity does inside silicon, how internet cables route packets across oceans, why code exists, and how to build real software step-by-step.
            </p>
          </div>

          {/* Direct, Uncluttered Entry Points */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/learn#stage-1"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-all flex items-center space-x-2 shadow-xs cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Start Learning: Stage 1 (Digital Foundations)</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/learn"
              className="px-5 py-3 rounded-xl font-bold text-sm text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all flex items-center space-x-2 shadow-2xs"
            >
              <span>View the 6-Stage Roadmap</span>
            </Link>
          </div>

          {/* User state or reassurance */}
          {currentUser ? (
            <div className="pt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center space-x-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Signed in as {currentUser.email} &bull; Your notes and quiz progress are automatically saved.</span>
            </div>
          ) : (
            <div className="pt-2 text-xs text-[var(--foreground-muted)] flex flex-wrap items-center gap-x-6 gap-y-1">
              <span>&bull; No account or credit card required to read</span>
              <span>&bull; Plain English before any code is shown</span>
              <span>&bull; Real projects, not just multiple-choice quizzes</span>
            </div>
          )}

        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. HANDS-ON WORKBENCH: THE 8-BIT REALITY OF COMPUTERS             */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--border-subtle)] bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Interactive Workbench // What is data?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
              Type a word. Watch how your computer physically sees it.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed max-w-2xl">
              Computers do not understand letters, photos, or apps. They only understand tiny microscopic switches holding an electrical charge (1) or no charge (0). Type anything in the box below to see its exact electrical bytes:
            </p>
          </div>

          {/* Interactive Input Box */}
          <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--foreground)] block">
                  Your Input Text:
                </label>
                <input
                  type="text"
                  maxLength={8}
                  value={interactiveWord}
                  onChange={(e) => setInteractiveWord(e.target.value || 'A')}
                  placeholder="Type a word..."
                  className="px-4 py-2 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-sm font-mono text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] w-48"
                />
              </div>

              <div className="text-xs text-[var(--foreground-muted)] sm:text-right">
                <span className="font-mono font-bold text-[var(--foreground)]">{interactiveWord.length} bytes</span> of memory occupied
                <span className="block text-[11px] text-[var(--foreground-muted)]">Each character requires exactly 8 binary bits</span>
              </div>
            </div>

            {/* Binary Bits Visualizer */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {binaryAnalysis.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[var(--surface-sunken)]/60 border border-[var(--border-subtle)]/70 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[var(--foreground)] text-sm px-2 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                        &apos;{item.char}&apos;
                      </span>
                      <span className="text-[var(--foreground-muted)] text-[11px]">
                        Decimal ASCII: <strong>{item.ascii}</strong>
                      </span>
                    </div>

                    {/* 8-bit switches */}
                    <div className="flex items-center space-x-1 pt-1 font-mono text-xs">
                      {item.binary.split('').map((bit, bitIdx) => (
                        <span
                          key={bitIdx}
                          className={`flex-1 py-1 rounded text-center font-bold text-[11px] transition-all ${
                            bit === '1'
                              ? 'bg-[var(--brand-primary)] text-white shadow-2xs'
                              : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]'
                          }`}
                          title={`Bit ${bitIdx + 1}: ${bit === '1' ? 'High Voltage (1)' : 'Low Voltage (0)'}`}
                        >
                          {bit}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed italic pt-1">
                &rarr; That is all software is. When you browse Reddit, play a video game, or message a friend, your computer is simply reading and flipping millions of these 8-bit switches every second.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. THE 6-STAGE SYLLABUS: OPEN WORKSHOP CURRICULUM                */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              The Learning Pathway
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              Six stages. Designed to be learned in order.
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              You do not need to memorize anything. Every lesson is self-contained with plain English explanations, physical analogies, and step-by-step practice.
            </p>
          </div>

          {/* Stage Tab Selector */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--border-subtle)]">
            {curriculum.map((c) => (
              <button
                key={c.stage}
                onClick={() => setActiveStageTab(c.stage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeStageTab === c.stage
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border-subtle)]'
                }`}
              >
                {c.num}. {c.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Active Stage Detailed Breakdown */}
          {(() => {
            const active = curriculum.find((c) => c.stage === activeStageTab) || curriculum[0];
            const Icon = active.icon;
            return (
              <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-xs space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--surface-sunken)] text-[var(--brand-primary)] flex items-center justify-center font-bold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--foreground)]">
                        Stage {active.num}: {active.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--brand-primary)] font-medium">
                      {active.subtitle}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-[var(--foreground-muted)] bg-[var(--surface-sunken)] px-3 py-1 rounded-md self-start sm:self-auto border border-[var(--border-subtle)]">
                    {active.time}
                  </span>
                </div>

                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {active.description}
                </p>

                {/* Core Topics in this Stage */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block">
                    What You Will Study:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {active.topics.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-[var(--surface-sunken)]/50 border border-[var(--border-subtle)]/70 text-xs text-[var(--foreground)] flex items-start space-x-2"
                      >
                        <span className="text-emerald-500 font-bold shrink-0">&bull;</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Project */}
                <div className="p-4 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-[var(--foreground)] block">Capstone Milestone:</span>
                    <span className="text-[var(--foreground-muted)]">{active.milestone}</span>
                  </div>

                  <Link
                    href={active.href}
                    className="px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-white font-bold hover:bg-[var(--brand-primary-hover)] transition-all flex items-center space-x-1.5 self-start sm:self-auto shrink-0"
                  >
                    <span>Open Stage {active.stage} Notes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. THREE GUIDING PRINCIPLES (ZERO MARKETING FLUFF)               */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[var(--border-subtle)] bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Our Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
              How we approach teaching technology.
            </h2>
          </div>

          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-2">
              <h3 className="text-base font-bold text-[var(--foreground)] flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[var(--surface-sunken)] text-[var(--brand-primary)] inline-flex items-center justify-center font-mono text-xs font-bold">1</span>
                <span>Concepts before syntax.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed pl-8">
                Memorizing code syntax is useless without mental models. We explain why an operating system needs virtual memory, why a database needs indexes, and how functions work in the physical world before asking you to write a single bracket.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-2">
              <h3 className="text-base font-bold text-[var(--foreground)] flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[var(--surface-sunken)] text-[var(--brand-primary)] inline-flex items-center justify-center font-mono text-xs font-bold">2</span>
                <span>Error messages are friendly diagnostic clues, not grades.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed pl-8">
                In school, a red mark means you failed. In software engineering, an error message is simply a computer being very literal about what it needs. We teach you how to read errors calmly, decompose problems, and debug without panic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-2">
              <h3 className="text-base font-bold text-[var(--foreground)] flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[var(--surface-sunken)] text-[var(--brand-primary)] inline-flex items-center justify-center font-mono text-xs font-bold">3</span>
                <span>No paywalls, no advertising, no gatekeeping.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed pl-8">
                Software development is one of the few fields where you can build world-changing tools using a standard computer and an internet connection. High-quality foundational education should be accessible to anyone willing to put in the time.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. A DIRECT NOTE FROM THE CREATOR                                 */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-20 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4">
            
            <div className="flex items-center space-x-3 text-xs font-mono font-bold text-[var(--brand-primary)] uppercase tracking-wider">
              <Laptop className="w-4 h-4" />
              <span>A Note From Shobhit</span>
            </div>

            <h3 className="text-xl font-bold text-[var(--foreground)]">
              &quot;If any lesson on this website confuses you, tell me.&quot;
            </h3>

            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              I built StackUp because I was tired of seeing curious, capable people walk away from technology thinking they weren&apos;t &quot;smart enough&quot; to code. The fault was never theirs—it was the way technology was being taught.
            </p>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              StackUp is maintained actively. If you encounter an explanation that makes your head hurt, a topic that skips a crucial step, or a bug in a code example, please let me know. I refine these lessons continuously based on where real learners stumble.
            </p>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-[var(--foreground-muted)]">
                StackUp is free, open source, and built for learners everywhere.
              </span>

              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/Shobhit-20-04/stackup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[var(--foreground)] hover:text-[var(--brand-primary)] font-bold transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <span>&bull;</span>
                <Link
                  href="/glossary"
                  className="text-[var(--brand-primary)] hover:underline font-bold"
                >
                  Plain-English Glossary
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. CLEAN FOOTER CALLOUT                                           */}
      {/* ================================================================= */}
      <section className="py-12 bg-[var(--background)] text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h4 className="text-lg font-bold text-[var(--foreground)]">
            Ready to explore?
          </h4>
          <p className="text-xs text-[var(--foreground-muted)]">
            Start at Stage 1, or jump straight to whatever discipline you are working on.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/learn#stage-1"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-all shadow-xs"
            >
              Start Stage 1 (Foundations)
            </Link>
            <Link
              href="/core-cs"
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all"
            >
              Browse 221 Core CS Topics
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
