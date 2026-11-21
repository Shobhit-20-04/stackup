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
  BookOpen, 
  Play, 
  CheckCircle2, 
  GraduationCap,
  ChevronRight,
  Lightbulb,
  MessageSquareQuote,
  Heart,
  Laptop
} from 'lucide-react';
import { getFastCachedUser, getCurrentUser, type UserSession } from '@/lib/auth/session';

type JourneyId = 'zero-tech' | 'cs-student' | 'career-switcher';
type InternetStep = 1 | 2 | 3 | 4;

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
  const [selectedJourney, setSelectedJourney] = useState<JourneyId>('zero-tech');
  const [interactiveLang, setInteractiveLang] = useState<'python' | 'javascript'>('python');
  const [hasExecutedInteractive, setHasExecutedInteractive] = useState(false);
  const [activeInternetStep, setActiveInternetStep] = useState<InternetStep>(1);

  useEffect(() => {
    void getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

  // 6-Stage Beginner-to-Career Roadmap
  const roadmapStages = useMemo(() => [
    {
      stage: 1,
      number: '01',
      title: 'Digital Foundations',
      tagline: 'Understand the machine before writing code.',
      description: 'How computers store numbers, what CPUs and RAM actually do, how the internet routes data, and setting up your terminal and code editor.',
      milestoneProject: 'First Terminal Navigation & Script Run',
      timeEstimate: '2–3 weeks (Gentle Pace)',
      href: '/learn#stage-1',
      badge: 'Zero Prerequisites',
      icon: Terminal,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      keyQuestions: [
        'What is a computer program, physically?',
        'Why does my computer have both RAM and SSD storage?',
        'What actually happens when a web page loads in a browser?'
      ]
    },
    {
      stage: 2,
      number: '02',
      title: 'Programming Fundamentals',
      tagline: 'Teaching a machine to follow a recipe.',
      description: 'Variables as labeled memory boxes, making decisions with if/else, automating repetitive tasks with loops, and organizing code into reusable functions.',
      milestoneProject: 'Terminal-Based Interactive Quiz & Number Game',
      timeEstimate: '3–4 weeks',
      href: '/learn#stage-2',
      badge: 'Hands-on Logic',
      icon: Code2,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      keyQuestions: [
        'How does code store and remember information?',
        'How do programs make decisions based on user input?',
        'What is debugging, and why do bugs happen to everyone?'
      ]
    },
    {
      stage: 3,
      number: '03',
      title: 'Web & Software Development',
      tagline: 'Build things people can actually click and use.',
      description: 'HTML5 for page structure, modern CSS for responsive styling, JavaScript DOM for interactivity, REST APIs for data transfer, and PostgreSQL for permanent storage.',
      milestoneProject: 'Full-Stack Personal Notes & Task App',
      timeEstimate: '4–6 weeks',
      href: '/learn#stage-3',
      badge: 'Full-Stack Builder',
      icon: Globe,
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      keyQuestions: [
        'How do buttons on a website trigger code on a server?',
        'What is an API, and how do servers exchange JSON data?',
        'How does a database safely store passwords and user data?'
      ]
    },
    {
      stage: 4,
      number: '04',
      title: 'Computer Science & Systems',
      tagline: 'How large-scale systems work under the hood.',
      description: 'Deep dive into Operating Systems (processes, threads, paging), Database Internals (indexing, transactions, ACID), and Computer Networks (TCP/IP, sockets).',
      milestoneProject: '221 Interactive Core CS Lesson Modules',
      timeEstimate: 'Ongoing Reference',
      href: '/core-cs',
      badge: 'Engineering Depth',
      icon: Cpu,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
      keyQuestions: [
        'What is the difference between a process and a thread?',
        'Why do database indexes speed up lookups from seconds to milliseconds?',
        'How does TCP guarantee that no packets are lost across the globe?'
      ]
    },
    {
      stage: 5,
      number: '05',
      title: 'Practical Guided Projects',
      tagline: 'Escape tutorial hell by building standalone software.',
      description: 'Step-by-step guided milestones from basic calculators and interactive dashboards to real-time collaborative applications with automated tests.',
      milestoneProject: 'Weather API Dashboard & Cloud Notes App',
      timeEstimate: 'Self-Paced Building',
      href: '/projects',
      badge: 'Portfolio Ready',
      icon: FolderGit2,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
      keyQuestions: [
        'How do I architect a project before writing the first line of code?',
        'How do I deploy an application so anyone with a link can use it?',
        'How do I explain my project decisions in an interview without stuttering?'
      ]
    },
    {
      stage: 6,
      number: '06',
      title: 'Career & Placement Readiness',
      tagline: 'Turn technical competence into real job opportunities.',
      description: 'Pattern-based Data Structures & Algorithms (150 NeetCode patterns), campus placement aptitude, and an automated ATS resume evaluator with Google XYZ bullet guidance.',
      milestoneProject: 'Verified Resume & 150 DSA Pattern Mastery',
      timeEstimate: '4–8 weeks',
      href: '/resume-checker',
      badge: 'Interview Tested',
      icon: GraduationCap,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
      keyQuestions: [
        'How do I identify which pattern solves a new DSA problem?',
        'What do human recruiters scan in the first 7 seconds of looking at a resume?',
        'How do I communicate my thought process clearly during a technical screen?'
      ]
    }
  ], []);

  const interactiveCode = useMemo(() => {
    if (interactiveLang === 'python') {
      return {
        code: `# Your very first program in Python!
name = "Curious Learner"
favorite_goal = "Understand how software works"

print("Welcome to StackUp, " + name + "!")
print("Your goal: " + favorite_goal)
print("Status: You just gave instructions to a computer.")`,
        breakdown: [
          'Line 1: Creates a labeled storage box (variable) called "name".',
          'Line 2: Remembers your learning goal in computer memory.',
          'Line 4–6: Tells the screen to display plain text for a human to read.'
        ],
        output: `Welcome to StackUp, Curious Learner!
Your goal: Understand how software works
Status: You just gave instructions to a computer.`
      };
    } else {
      return {
        code: `// Your very first program in JavaScript!
const student = { name: "Curious Learner", stage: 1 };

function startJourney(user) {
  return \`Welcome to StackUp, \${user.name}! You are starting at Stage \${user.stage}.\`;
}

console.log(startJourney(student));`,
        breakdown: [
          'Line 1: Groups related information together into an Object.',
          'Line 3–5: Defines a reusable recipe (Function) that formats a message.',
          'Line 7: Runs the function and outputs the result to your screen.'
        ],
        output: `Welcome to StackUp, Curious Learner! You are starting at Stage 1.`
      };
    }
  }, [interactiveLang]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors selection:bg-[#0D08CB] selection:text-white">
      
      {/* ----------------------------------------------------------------- */}
      {/* 1. EDITORIAL HERO: WARM, DIRECT & HUMAN                           */}
      {/* ----------------------------------------------------------------- */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (7 cols): The Human Invitation */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Kind Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-semibold text-amber-700 dark:text-amber-300">
                <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                <span>A kinder, zero-jargon way to learn technology</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.12]">
                You don&apos;t need a CS degree to understand how software works.
              </h1>

              {/* Narrative Subtitle */}
              <p className="text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed font-normal max-w-2xl">
                Most programming websites assume you already know what a &quot;terminal&quot; is, what compilers do, and how memory addresses operate. If you&apos;ve never written a line of code or felt intimidated by engineering jargon, you&apos;re not behind. StackUp starts from physical reality: how computers work, why code exists, and how to build software step-by-step with patient human guidance.
              </p>

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/learn#stage-1"
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Start Learning at Stage 1</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/learn"
                  className="px-5 py-3 rounded-xl font-bold text-sm text-[var(--foreground)] bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all flex items-center space-x-2 shadow-2xs"
                >
                  <span>Explore the 6-Stage Roadmap</span>
                </Link>
              </div>

              {/* Reassuring Proof Points */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[var(--foreground-muted)] border-t border-[var(--border-subtle)]/70">
                <div className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero prior coding experience required</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Physical analogies before any syntax</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Free &amp; Open Learning Journey</span>
                </div>
              </div>

              {currentUser && (
                <div className="pt-1">
                  <span className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span>Welcome back, {currentUser.email.split('@')[0]} — your learning workspace is ready!</span>
                  </span>
                </div>
              )}
            </div>

            {/* Right Column (5 cols): Interactive Code Workbench with Editorial Commentary */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-lg overflow-hidden">
                
                {/* Terminal Window Header (Authentic macOS Style) */}
                <div className="px-4 py-3 bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                    <span className="text-xs font-mono text-[var(--foreground-muted)] ml-2 font-medium">
                      first_program.{interactiveLang === 'python' ? 'py' : 'js'}
                    </span>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center bg-[var(--surface-card)] border border-[var(--border-subtle)] p-0.5 rounded-lg text-[11px] font-bold">
                    <button
                      onClick={() => { setInteractiveLang('python'); setHasExecutedInteractive(false); }}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        interactiveLang === 'python'
                          ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => { setInteractiveLang('javascript'); setHasExecutedInteractive(false); }}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        interactiveLang === 'javascript'
                          ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      JavaScript
                    </button>
                  </div>
                </div>

                {/* Code Window */}
                <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
                  <pre><code>{interactiveCode.code}</code></pre>
                </div>

                {/* Handwritten-Style Editorial Annotation */}
                <div className="p-4 bg-[var(--surface-sunken)]/60 border-t border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-bold text-[11px] uppercase tracking-wider">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>How a Human Engineer Reads This Code:</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-[var(--foreground-muted)]">
                    {interactiveCode.breakdown.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[var(--brand-primary)] font-bold shrink-0">&rarr;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Execution Footer */}
                <div className="p-4 bg-[var(--surface-card)] border-t border-[var(--border-subtle)]">
                  {hasExecutedInteractive ? (
                    <div className="space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Computer output received:</span>
                        </div>
                        <button
                          onClick={() => setHasExecutedInteractive(false)}
                          className="text-[11px] font-semibold text-[var(--brand-primary)] hover:underline cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                      <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                        {interactiveCode.output}
                      </pre>
                      <p className="text-[11px] text-[var(--foreground-muted)] pt-1">
                        That is all software is: human thought expressed as structured instructions that a computer carries out line-by-line.
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setHasExecutedInteractive(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Run Code (See What Happens)</span>
                    </button>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 2. CREATOR'S LETTER: AUTHENTIC HUMAN ORIGIN STORY                 */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-subtle)] bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/10 shadow-xs space-y-6">
            
            <div className="flex items-center space-x-3 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <MessageSquareQuote className="w-5 h-5 text-amber-600" />
              <span>A Personal Note on Why StackUp Exists</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight leading-snug">
              &quot;I spent four hours crying over my first compiler error because I thought I wasn&apos;t smart enough.&quot;
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[var(--foreground-muted)] leading-relaxed font-normal">
              <p>
                When I wrote my very first C++ program in college, the terminal spat out two words: <code className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 font-mono text-xs">Segmentation fault (core dumped)</code>. I sat in my dorm room for four hours convinced that my brain simply was not wired for computer science. Nobody told me that literally every senior software engineer at Google, Microsoft, and Apple gets that exact same error every single week.
              </p>
              <p>
                Most coding education is broken for beginners. It skips the foundational intuition: why computers have memory, how electrical cables route website packets across the ocean, and what a compiler actually does. Instead, beginners get thrown into dry syntax or 150-problem LeetCode sheets without a life vest.
              </p>
              <p>
                We built StackUp to be the patient, encouraging mentor we wished was sitting beside us when we started: someone who uses real-world metaphors, forgives mistakes, normalizes the struggle, and proves that anyone can become a confident software engineer.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block font-bold text-sm text-[var(--foreground)]">The StackUp Editorial Team</span>
                <span className="text-xs text-[var(--foreground-muted)]">Engineers &amp; Mentors advocating for accessible, human-first learning</span>
              </div>

              <Link
                href="/learn#stage-1"
                className="text-xs font-bold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
              >
                <span>Read our beginner promise in Stage 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 3. INTERACTIVE VISUAL WORKSHOP: "HOW A WEBSITE ACTUALLY LOADS"    */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Interactive Intuition Workshop
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              What actually happens when you type &quot;google.com&quot;?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              Before learning to write code, build an intuitive mental model of the machine. Click each step below to trace the journey of a single web page.
            </p>
          </div>

          {/* 4 Interactive Step Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { step: 1, title: '1. You Press Enter', label: 'Browser Request' },
              { step: 2, title: '2. The Phonebook', label: 'DNS Lookup' },
              { step: 3, title: '3. Ocean Cables', label: 'Network Packets' },
              { step: 4, title: '4. The Server Replies', label: 'HTML Rendering' },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveInternetStep(s.step as InternetStep)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeInternetStep === s.step
                    ? 'bg-[var(--surface-card)] border-[var(--brand-primary)] shadow-sm ring-2 ring-[var(--brand-primary)]/20'
                    : 'bg-[var(--surface-card)]/50 border-[var(--border-subtle)] hover:bg-[var(--surface-card)] text-[var(--foreground-muted)]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider block text-[var(--brand-primary)]">
                  {s.title}
                </span>
                <span className="text-xs font-bold text-[var(--foreground)] block mt-0.5">
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Explainer Card */}
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-xs space-y-4">
            {activeInternetStep === 1 && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Laptop className="w-5 h-5" />
                  <span>Step 1: Your browser doesn&apos;t know what &quot;google.com&quot; means.</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  Computers don&apos;t understand words like &quot;google.com&quot; or &quot;stackup.xyz&quot;. They only communicate using numerical IP addresses (like <code className="px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] font-mono text-xs">142.250.190.46</code>), similar to how mail carriers need a street address and zip code, not just your friend&apos;s first name.
                </p>
                <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-800 dark:text-blue-300 text-xs font-medium">
                  <strong>Everyday Analogy:</strong> Asking your phone to call &quot;Mom&quot;. Your phone doesn&apos;t connect to the letters M-O-M; it opens your address book and finds the 10-digit phone number assigned to that contact.
                </div>
              </div>
            )}

            {activeInternetStep === 2 && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <BookOpen className="w-5 h-5" />
                  <span>Step 2: Asking the Global Address Book (DNS Lookup).</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  Your computer immediately fires a message to a specialized server called a <strong>Domain Name System (DNS)</strong> resolver. The DNS resolver checks its database and answers back in 15 milliseconds: <em>&quot;google.com lives at 142.250.190.46.&quot;</em>
                </p>
                <div className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 text-xs font-medium">
                  <strong>Key Takeaway:</strong> DNS is literally the world&apos;s phonebook for computers. Without it, you would have to memorize a random string of numbers for every website you visit.
                </div>
              </div>
            )}

            {activeInternetStep === 3 && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
                  <Globe className="w-5 h-5" />
                  <span>Step 3: Light traveling through glass under the ocean.</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  Now with the IP address in hand, your browser packages your request into small digital chunks called <strong>packets</strong>. These packets travel via radio waves to your Wi-Fi router, through copper telephone cables, and flash across deep undersea fiber-optic glass cables at 70% the speed of light to reach a server building halfway across the country.
                </p>
                <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-800 dark:text-purple-300 text-xs font-medium">
                  <strong>A Mind-Bending Fact:</strong> When you click a link, your message physically travels thousands of miles across real glass cables and returns to your screen before you can blink once.
                </div>
              </div>
            )}

            {activeInternetStep === 4 && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Step 4: The server replies with plain text files.</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                  The Google server receives your request, verifies your parameters, and sends back three text files: <strong>HTML</strong> (the words and buttons), <strong>CSS</strong> (the colors and layout), and <strong>JavaScript</strong> (the interactivity). Your browser reads these three text files from top to bottom and paints the website onto your screen.
                </p>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                  <strong>The Revelation:</strong> Every website on Earth—from Netflix to StackUp—is just plain text files being delivered over cables and rendered by a browser. Once you realize that, software stops feeling like black magic.
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center text-xs border-t border-[var(--border-subtle)]">
              <span className="text-[var(--foreground-muted)]">
                Want to dive deeper into networking and servers?
              </span>
              <Link href="/core-cs#how-the-internet-works-browsers-servers" className="font-bold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1">
                <span>Read Full Lesson Notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 4. THE 6-STAGE ROADMAP: ANNOTATED MILESTONE TIMELINE              */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Structured Curriculum Path
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              The 6 Stages to Technical Independence
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              No sudden difficulty spikes. No skipped explanations. Each stage builds directly on what you mastered in the previous one.
            </p>
          </div>

          <Link
            href="/learn"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[var(--brand-primary)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] transition-all flex items-center space-x-2 self-start md:self-auto shadow-2xs"
          >
            <span>Open Complete Roadmap Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Vertical Timeline Cards */}
        <div className="space-y-6">
          {roadmapStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.stage}
                className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-slate-300 dark:hover:border-zinc-700 transition-all shadow-xs group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left: Stage Number & Icon (3 cols) */}
                  <div className="lg:col-span-3 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${stage.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-2xl font-black text-slate-300 dark:text-zinc-700">
                        {stage.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                        {stage.title}
                      </h3>
                      <span className="text-xs text-[var(--brand-primary)] font-medium">
                        {stage.tagline}
                      </span>
                    </div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--surface-sunken)] text-[var(--foreground-muted)]">
                      {stage.badge}
                    </span>
                  </div>

                  {/* Middle: Description & Core Questions (6 cols) */}
                  <div className="lg:col-span-6 space-y-3">
                    <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {stage.description}
                    </p>

                    <div className="p-3 rounded-xl bg-[var(--surface-sunken)]/50 border border-[var(--border-subtle)]/60 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)] block">
                        What you will be able to answer:
                      </span>
                      <ul className="space-y-1 text-xs text-[var(--foreground)]">
                        {stage.keyQuestions.map((q, i) => (
                          <li key={i} className="flex items-start space-x-2 text-[11px]">
                            <span className="text-emerald-500 font-bold shrink-0">✓</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Milestone Project & CTA (3 cols) */}
                  <div className="lg:col-span-3 space-y-4 pt-2 lg:pt-0 lg:border-l lg:border-[var(--border-subtle)]/60 lg:pl-6 flex flex-col justify-between h-full">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-muted)] block">
                        Hands-On Milestone:
                      </span>
                      <span className="text-xs font-bold text-[var(--foreground)] block">
                        {stage.milestoneProject}
                      </span>
                      <span className="text-[11px] text-[var(--foreground-muted)] block pt-1">
                        Pace: {stage.timeEstimate}
                      </span>
                    </div>

                    <Link
                      href={stage.href}
                      className="w-full py-2 px-3 rounded-xl bg-[var(--surface-sunken)] hover:bg-[var(--brand-primary)] hover:text-white text-xs font-bold text-[var(--foreground)] transition-all flex items-center justify-between cursor-pointer border border-[var(--border-subtle)]"
                    >
                      <span>Start Stage {stage.stage}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 5. THREE REAL JOURNEYS: WHICH ONE SOUNDS LIKE YOU?                */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-14 sm:py-20 border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Relatable Learner Archetypes
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              Which of these sounds like you right now?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              Everyone starts somewhere different. Select the path that mirrors your current reality.
            </p>
          </div>

          {/* 3 Persona Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { id: 'zero-tech', label: '1. Complete Beginner (Arts / Commerce / Zero Tech)' },
              { id: 'cs-student', label: '2. CS Student (Memorized Theory, Struggle with Code)' },
              { id: 'career-switcher', label: '3. Placement Candidate (Need Projects & DSA Fast)' },
            ].map((j) => (
              <button
                key={j.id}
                onClick={() => setSelectedJourney(j.id as JourneyId)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedJourney === j.id
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border-subtle)]'
                }`}
              >
                {j.label}
              </button>
            ))}
          </div>

          {/* Archetype Narrative Card */}
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-xs space-y-5">
            {selectedJourney === 'zero-tech' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <Heart className="w-5 h-5 fill-emerald-500/20" />
                  <span>Meet Priya: Starting from a Non-Technical Degree</span>
                </div>
                <blockquote className="p-4 rounded-xl bg-[var(--surface-sunken)]/60 border-l-4 border-emerald-500 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed italic">
                  &quot;I studied commerce and worked in retail operations. When people mentioned APIs, servers, or terminal commands, I felt like a tourist in a foreign country. StackUp started from how computers store bits in memory and explained loops using kitchen recipes. Today, I can write clean Python scripts and build full-stack web apps on my own.&quot;
                </blockquote>
                <div className="space-y-1 text-xs text-[var(--foreground-muted)]">
                  <strong className="text-[var(--foreground)] block">Your Recommended Starting Plan:</strong>
                  <p>Begin with <strong>Stage 1 (Digital Foundations)</strong>. Do not touch DSA or placement problems yet. Build your intuition for how computers work, then progress naturally into Python logic.</p>
                </div>
                <div className="pt-2">
                  <Link href="/learn#stage-1" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline">
                    <span>Begin Stage 1 Digital Foundations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {selectedJourney === 'cs-student' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <Cpu className="w-5 h-5" />
                  <span>Meet Arjun: 2nd-Year CS Student Overwhelmed by Theory</span>
                </div>
                <blockquote className="p-4 rounded-xl bg-[var(--surface-sunken)]/60 border-l-4 border-indigo-500 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed italic">
                  &quot;In college, professors gave us 80-slide PowerPoint presentations on Operating Systems and Database Theory, but we never saw how it connected to actual code. StackUp explained deadlocks using 4-way traffic intersections and database indexing using physical library cards. Finally, the engineering makes sense.&quot;
                </blockquote>
                <div className="space-y-1 text-xs text-[var(--foreground-muted)]">
                  <strong className="text-[var(--foreground)] block">Your Recommended Starting Plan:</strong>
                  <p>Skip straight to <strong>Stage 3 (Web Development)</strong> and <strong>Stage 4 (Core CS)</strong>. Pair theoretical concepts with our practical portfolio milestones.</p>
                </div>
                <div className="pt-2">
                  <Link href="/core-cs" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline">
                    <span>Explore Core CS Engineering Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {selectedJourney === 'career-switcher' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <GraduationCap className="w-5 h-5" />
                  <span>Meet Sneha: Final-Year Placement Preparation</span>
                </div>
                <blockquote className="p-4 rounded-xl bg-[var(--surface-sunken)]/60 border-l-4 border-blue-500 text-xs sm:text-sm text-[var(--foreground)] leading-relaxed italic">
                  &quot;I had applied to 40 companies and received zero interview callbacks. Running my resume through StackUp&apos;s ATS evaluator revealed that my bullet points were passive and lacked measurable numbers. Once I rewrote them using Google&apos;s XYZ formula and drilled the 150 DSA patterns, I cleared three technical screening rounds.&quot;
                </blockquote>
                <div className="space-y-1 text-xs text-[var(--foreground-muted)]">
                  <strong className="text-[var(--foreground)] block">Your Recommended Starting Plan:</strong>
                  <p>Utilize <strong>Stage 6 (Career &amp; Placement Suite)</strong>: run your resume through our ATS scanner, practice campus aptitude, and solve the Problem of the Day.</p>
                </div>
                <div className="pt-2">
                  <Link href="/resume-checker" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline">
                    <span>Evaluate Resume with ATS Checker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 6. "THINGS NOBODY TELLS BEGINNERS" (DISSOLVING IMPOSTER SYNDROME) */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-14 sm:py-20 border-t border-[var(--border-subtle)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Imposter Syndrome Inoculation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
              Three things nobody tells beginners about programming
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              Before you open a code editor, release the false myths that make beginners quit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Myth 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                Myth 1: Memorization
              </span>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                &quot;Good software engineers memorize all the syntax and functions.&quot;
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                <strong>Reality:</strong> Real professional engineers Google syntax and look up documentation every single day. Programming is not about memorizing words; it is about learning how to break large complex problems into tiny, logical steps.
              </p>
            </div>

            {/* Myth 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                Myth 2: Error Messages
              </span>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                &quot;When my program crashes, it means I&apos;m bad at coding.&quot;
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                <strong>Reality:</strong> Error messages are not personal failures; they are friendly diagnostic clues from a very literal machine. 90% of professional engineering is reading an error message calmly and tweaking a single line.
              </p>
            </div>

            {/* Myth 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3 shadow-xs">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                Myth 3: Math Genius
              </span>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                &quot;You need advanced calculus and high math skills to build apps.&quot;
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                <strong>Reality:</strong> Unless you are writing 3D physics engines or cryptography, 95% of software development requires logical thinking and 5th-grade arithmetic (addition, subtraction, counting, and comparisons).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 7. PLAIN-ENGLISH GLOSSARY CALLOUT                                 */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-12 border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Stuck on confusing technical buzzwords?</span>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                Our interconnected plain-English glossary defines over 50 essential industry terms—including API, Compiler, Algorithm, DOM, Git, and Database—with everyday metaphors and direct links back to lessons.
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
