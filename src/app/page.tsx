'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Cpu, 
  BookOpen, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  ListChecks,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';

const CORE_SUBJECTS = CURRICULUM_DATA['core-cs'].categories.map((c) => ({
  id: c.id,
  title: c.title,
  topicCount: c.topics.length,
  questionCount: c.topics.reduce((acc, t) => acc + t.questions.length, 0),
  description: c.description,
}));

export default function HomePage() {
  const [activePreviewTab, setActivePreviewTab] = useState<'dsa' | 'core-cs' | 'ats'>('dsa');

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      {/* 1. ARCHITECTURAL HERO SECTION: Editorial split layout */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Direct, authoritative positioning */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[11px] font-mono uppercase tracking-wider text-[var(--color-primary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                <span>Technical Interview &amp; Career Preparation System</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.12]">
                Structured engineering curriculum for technical interviews.
              </h1>

              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl font-normal">
                StackUp is a focused preparation workbench for computer science students and engineers. Master 150 algorithmic patterns with optimal multi-language solutions, revise 15 undergraduate CS disciplines with architectural notes, and benchmark your resume against authentic applicant tracking criteria.
              </p>

              {/* Action Triggers */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/dsa"
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95 inline-flex items-center space-x-2 shadow-xs cursor-pointer"
                >
                  <span>Explore DSA Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/striver-sheet"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95 inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <ListChecks className="w-3.5 h-3.5 text-[var(--color-action)]" />
                  <span>Striver SDE Sheet</span>
                </Link>
                <Link
                  href="/core-cs"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95 inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span>Core CS Notes</span>
                </Link>
                <Link
                  href="/resume-checker"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95 inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Audit Resume</span>
                </Link>
              </div>

              {/* Quick Jump Index Ledger */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)] block mb-2">
                  Immediate Syllabus Shortcuts
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <Link href="/dsa?category=Two+Pointers" className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95">
                    Two Pointers &amp; Sliding Window
                  </Link>
                  <Link href="/dsa?category=Trees+%26+BST" className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95">
                    Binary Trees &amp; BSTs
                  </Link>
                  <Link href="/dsa?category=Dynamic+Programming" className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95">
                    Dynamic Programming
                  </Link>
                  <Link href="/core-cs" className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95">
                    Operating Systems
                  </Link>
                  <Link href="/core-cs" className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95">
                    DBMS &amp; SQL
                  </Link>
                  <Link href="/core-cs" className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-150 hover:-translate-y-0.5 active:scale-95">
                    System Design
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Curriculum Workbench */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs overflow-hidden">
                {/* Workbench Tab Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-primary)]">Curriculum Workbench</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[11px] font-medium">
                    <button
                      onClick={() => setActivePreviewTab('dsa')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activePreviewTab === 'dsa'
                          ? 'bg-[var(--surface-card)] text-[var(--color-text-primary)] font-bold shadow-xs'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      DSA Code
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('core-cs')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activePreviewTab === 'core-cs'
                          ? 'bg-[var(--surface-card)] text-[var(--color-text-primary)] font-bold shadow-xs'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      Core Notes
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('ats')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activePreviewTab === 'ats'
                          ? 'bg-[var(--surface-card)] text-[var(--color-text-primary)] font-bold shadow-xs'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      ATS Rubric
                    </button>
                  </div>
                </div>

                {/* Tab Content Display */}
                <div className="p-4 sm:p-5">
                  {activePreviewTab === 'dsa' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--color-text-primary)]">Two Sum II — Input Array Is Sorted</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                          Medium • O(n) Time
                        </span>
                      </div>
                      <div className="code-terminal-dark relative rounded-md p-3.5 font-mono text-xs overflow-x-auto leading-relaxed border border-[#1e2b4d] shadow-inner" style={{ backgroundColor: '#0b1020', color: '#e8eeff' }}>
                        <div className="text-slate-400"># Two Pointers: Left &amp; Right converge to target</div>
                        <div><span className="text-emerald-400 font-bold">def</span> <span className="text-blue-300 font-bold">twoSum</span><span className="text-[#e8eeff]">(numbers, target):</span></div>
                        <div className="pl-4 text-[#e8eeff]">left, right = 0, len(numbers) - 1</div>
                        <div className="pl-4 text-[#e8eeff]"><span className="text-purple-300 font-bold">while</span> left &lt; right:</div>
                        <div className="pl-8 text-[#e8eeff]">curr_sum = numbers[left] + numbers[right]</div>
                        <div className="pl-8 text-[#e8eeff]"><span className="text-purple-300 font-bold">if</span> curr_sum == target:</div>
                        <div className="pl-12 text-[#e8eeff]"><span className="text-yellow-300 font-bold">return</span> [left + 1, right + 1]</div>
                        <div className="pl-8 text-[#e8eeff]"><span className="text-purple-300 font-bold">elif</span> curr_sum &lt; target:</div>
                        <div className="pl-12 text-[#e8eeff]">left += 1</div>
                        <div className="pl-8 text-[#e8eeff]"><span className="text-purple-300 font-bold">else</span>:</div>
                        <div className="pl-12 text-[#e8eeff]">right -= 1</div>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[11px] text-[var(--color-text-secondary)]">Available in Python, C++, Java, TypeScript</span>
                        <Link href="/dsa/two-sum-ii" className="text-[var(--color-primary)] font-semibold hover:underline inline-flex items-center space-x-1">
                          <span>Practice Problem</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {activePreviewTab === 'core-cs' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--color-text-primary)]">Operating Systems: Deadlock Conditions</span>
                        <span className="px-2 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--color-text-secondary)] font-mono text-[10px]">
                          GATE &amp; Screening
                        </span>
                      </div>
                      <div className="p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 text-xs space-y-2 text-[var(--color-text-secondary)] leading-relaxed">
                        <p className="font-semibold text-[var(--color-text-primary)]">Four Coffman Conditions (Must hold simultaneously):</p>
                        <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                          <li><strong>Mutual Exclusion:</strong> At least one resource held in a non-shareable mode.</li>
                          <li><strong>Hold and Wait:</strong> A process holds resources while requesting others.</li>
                          <li><strong>No Preemption:</strong> Resources can only be released voluntarily.</li>
                          <li><strong>Circular Wait:</strong> A closed chain of processes exists waiting on next.</li>
                        </ol>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[11px] text-[var(--color-text-secondary)]">Includes 17 OS topics with 52 verified MCQs</span>
                        <Link href="/core-cs" className="text-[var(--color-primary)] font-semibold hover:underline inline-flex items-center space-x-1">
                          <span>Read Full Topic Notes</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {activePreviewTab === 'ats' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--color-text-primary)]">ATS Resume Diagnostic Rubric</span>
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-[10px] font-bold">
                          7 Core Dimensions
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-sunken)]/50 border border-[var(--border-subtle)]">
                          <span className="text-[var(--color-text-primary)] font-medium">Technical Skill Alignment</span>
                          <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">92% Match</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-sunken)]/50 border border-[var(--border-subtle)]">
                          <span className="text-[var(--color-text-primary)] font-medium">Measurable Business Impact</span>
                          <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400">84% Metric Proof</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-sunken)]/50 border border-[var(--border-subtle)]">
                          <span className="text-[var(--color-text-primary)] font-medium">Parser Layout &amp; Font Safety</span>
                          <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">100% Valid</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[11px] text-[var(--color-text-secondary)]">Client-side PDF &amp; DOCX extraction</span>
                        <Link href="/resume-checker" className="text-[var(--color-primary)] font-semibold hover:underline inline-flex items-center space-x-1">
                          <span>Upload &amp; Analyze</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL PREPARATION PIPELINE & MATRIX (Replaces the generic 3-card grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-primary)] block mb-1">
              Preparation Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
              Four-Stage Technical Engineering Pipeline
            </h2>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] max-w-md">
            Engineered around authentic tech hiring funnels: algorithmic patterns, systems design, placement drills, and ATS screening.
          </p>
        </div>

        {/* Integrated 4-Stage Matrix Strip */}
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden shadow-xs">
          
          {/* Stage 1: Algorithms */}
          <div className="p-6 flex flex-col justify-between hover:bg-[var(--surface-sunken)]/40 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                  Stage 01
                </span>
                <Code2 className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Algorithmic Patterns
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                150 interview problems categorized across 19 core patterns. Includes intuition, time/space bounds, and code in 4 languages.
              </p>
              <div className="pt-2 text-[11px] text-[var(--color-text-secondary)] space-y-1.5">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Striver SDE Sheet Mapped</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>LeetCode Direct Links</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--color-text-primary)] tabular-nums">150 Problems</span>
              <Link href="/dsa" className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center space-x-1">
                <span>Open DSA</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Stage 2: Systems & Theory */}
          <div className="p-6 flex flex-col justify-between hover:bg-[var(--surface-sunken)]/40 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                  Stage 02
                </span>
                <Cpu className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Undergraduate Systems
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                15 academic CS disciplines required for screening and technical rounds. Concise revision notes, architectural diagrams, and timed MCQs.
              </p>
              <div className="pt-2 text-[11px] text-[var(--color-text-secondary)] space-y-1.5">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>OS, DBMS &amp; Networks</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>587 Verified Questions</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--color-text-primary)] tabular-nums">195 Topics</span>
              <Link href="/core-cs" className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center space-x-1">
                <span>View Core CS</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Stage 3: Assessment Drills */}
          <div className="p-6 flex flex-col justify-between hover:bg-[var(--surface-sunken)]/40 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                  Stage 03
                </span>
                <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Placement Drills
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Campus and company screening tests filter candidates early. Master Quantitative formulas, Logical Deductions, and Verbal reasoning.
              </p>
              <div className="pt-2 text-[11px] text-[var(--color-text-secondary)] space-y-1.5">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Quantitative Shortcuts</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Instant Solution Feedback</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--color-text-primary)] tabular-nums">81 MCQs</span>
              <Link href="/aptitude" className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center space-x-1">
                <span>Start Aptitude</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Stage 4: ATS Screening */}
          <div className="p-6 flex flex-col justify-between hover:bg-[var(--surface-sunken)]/40 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold tracking-widest text-rose-500 uppercase bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                  Stage 04
                </span>
                <FileCheck2 className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                ATS Diagnostics
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Multi-dimensional document analysis for software engineering resumes. Identifies missing keywords and rewrites bullets using the Google XYZ model.
              </p>
              <div className="pt-2 text-[11px] text-[var(--color-text-secondary)] space-y-1.5">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>7-Dimension Scoring</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Zero Data Fabrication</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--color-text-primary)] tabular-nums">100% Client-Safe</span>
              <Link href="/resume-checker" className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center space-x-1">
                <span>Audit Resume</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE CS DIRECTORY: High-density, structured index */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-[var(--border-subtle)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-primary)] block mb-1">
              Curriculum Catalog
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Core CS Subjects Directory
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              15 undergraduate subjects mapped for university exams, GATE, and engineering screening rounds.
            </p>
          </div>
          <Link
            href="/core-cs"
            className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center space-x-1 shrink-0"
          >
            <span>Open Core CS Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
            {CORE_SUBJECTS.slice(0, 9).map((subject) => (
              <Link
                key={subject.id}
                href="/core-cs"
                className="p-4 sm:p-5 hover:bg-[var(--surface-sunken)]/60 transition-colors flex flex-col justify-between group border-b border-[var(--border-subtle)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {subject.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-1.5 line-clamp-2 leading-relaxed font-normal">
                    {subject.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-secondary)]">
                  <span>{subject.topicCount} Topics</span>
                  <span>{subject.questionCount} Questions</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="p-3 bg-[var(--surface-sunken)]/40 border-t border-[var(--border-subtle)] text-center">
            <Link href="/core-cs" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
              View All 15 Core CS Subjects (including System Design, TOC, Compiler Design &amp; Mathematics) &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ATS RESUME WORKBENCH CALLOUT: Technical & Direct */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
              <FileCheck2 className="w-4 h-4" />
              <span>ATS Resume Scanner &amp; Diagnostics</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)]">
              Evaluate your technical resume before submitting applications.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-normal">
              Upload your PDF or DOCX file for local, in-memory text parsing. Check for ATS-safe formatting, extract technical skills against target roles, identify missing keywords, and receive STAR-formatted bullet point recommendations.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-secondary)] font-medium">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero third-party sharing &bull; Document stays private</span>
              </span>
              <span>&bull;</span>
              <span className="font-mono text-[11px]">Supports PDF, DOCX, TXT up to 10MB</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/resume-checker"
              className="px-5 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold transition-colors inline-flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <span>Scan Your Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
