'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Cpu, 
  Code2, 
  FileCheck2, 
  ArrowRight, 
  ExternalLink,
  Layers,
  FileText
} from 'lucide-react';
import { CURRICULUM_DATA } from '@/lib/data/curriculum';

const CORE_SUBJECTS = CURRICULUM_DATA['core-cs'].categories.map((c) => ({
  id: c.id,
  title: c.title,
  topicCount: c.topics.length,
  questionCount: c.topics.reduce((acc, t) => acc + t.questions.length, 0),
  description: c.description,
}));

const DSA_PATTERNS_PREVIEW = [
  {
    name: 'Two Pointers & Sliding Window',
    problems: 'Two Sum II, 3Sum, Trapping Rain Water, Min Window Substring',
    complexity: 'O(n) time • O(1) space',
    category: 'Two Pointers',
  },
  {
    name: 'Binary Search on Answer',
    problems: 'Search in Rotated Sorted Array, Koko Eating Bananas, Median of Arrays',
    complexity: 'O(log n) time • O(1) space',
    category: 'Binary Search',
  },
  {
    name: 'Tree Traversal & Lowest Common Ancestor',
    problems: 'Max Depth, Level Order Traversal, Validate BST, Lowest Common Ancestor',
    complexity: 'O(n) time • O(h) space',
    category: 'Trees',
  },
  {
    name: 'Graph Search & Topological Sort',
    problems: 'Number of Islands, Course Schedule, Clone Graph, Word Ladder',
    complexity: 'O(V + E) time • O(V) space',
    category: 'Graphs',
  },
  {
    name: 'Dynamic Programming & Memoization',
    problems: 'Climbing Stairs, Coin Change, Longest Increasing Subsequence, 0/1 Knapsack',
    complexity: 'O(n) - O(n²) time',
    category: 'Dynamic Programming',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      {/* Hero Section - Content-first, authentic developer aesthetic */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-[#8E9FC8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
            <span>Technical Interview &amp; GATE Preparation Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#E8EEFF] leading-[1.14]">
            Structured preparation for software engineering interviews.
          </h1>

          <p className="mt-4 text-sm sm:text-base font-normal text-slate-600 dark:text-[#8E9FC8] leading-relaxed max-w-2xl">
            A comprehensive, distraction-free curriculum: 150+ curated DSA patterns with optimal solutions, 15 core computer science subjects with revision notes and timed MCQs, aptitude drills, and an ATS resume scanner.
          </p>

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/dsa"
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <span>Explore DSA Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/core-cs"
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-[#E8EEFF] bg-white dark:bg-[#151D35] hover:bg-slate-50 dark:hover:bg-[#1B2442] border border-slate-200 dark:border-[#1E2B4D] transition-colors inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span>Core CS Subjects</span>
            </Link>
            <Link
              href="/resume-checker"
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-[#E8EEFF] bg-white dark:bg-[#151D35] hover:bg-slate-50 dark:hover:bg-[#1B2442] border border-slate-200 dark:border-[#1E2B4D] transition-colors inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Scan Resume (ATS)</span>
            </Link>
          </div>
        </div>

        {/* Structured Quantitative Metrics Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-[#1E2B4D] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#E8EEFF]">150+</div>
            <div className="text-xs font-medium text-slate-500 dark:text-[#8E9FC8] mt-0.5">DSA Problems Mapped</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">LeetCode &amp; Striver SDE sheet</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#E8EEFF]">19</div>
            <div className="text-xs font-medium text-slate-500 dark:text-[#8E9FC8] mt-0.5">Core CS &amp; Aptitude</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">15 CS Subjects + 4 Aptitude Tracks</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#E8EEFF]">668</div>
            <div className="text-xs font-medium text-slate-500 dark:text-[#8E9FC8] mt-0.5">Verified Practice MCQs</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Timed tests with detailed solutions</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#E8EEFF]">ATS Scanner</div>
            <div className="text-xs font-medium text-slate-500 dark:text-[#8E9FC8] mt-0.5">Resume Parser Audit</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Keyword match &amp; STAR rewrites</div>
          </div>
        </div>
      </section>

      {/* SECTION 1: CURRICULUM TRACKS (Content-Rich Split Layout) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-[#8E9FC8]">
              Curriculum Tracks
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Three pillars organized for technical screening rounds and coding interviews.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Track 1: DSA Practice Hub */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-[#8E9FC8] mb-3">
                <span className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
                  <Code2 className="w-4 h-4" />
                  <span>Algorithms &amp; Data Structures</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">15 Patterns</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#E8EEFF]">
                DSA Practice Hub
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-[#8E9FC8] leading-relaxed">
                Hand-curated roadmap covering Arrays, Two Pointers, Trees, Graphs, and DP with problem statements, multi-language solutions (Python, C++, Java, TS), and LeetCode direct links.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E2B4D] flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">150 Problems</span>
              <Link
                href="/dsa"
                className="text-xs font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
              >
                <span>Open Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Track 2: Core Computer Science */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-[#8E9FC8] mb-3">
                <span className="flex items-center space-x-1.5 text-[var(--brand-primary)]">
                  <Cpu className="w-4 h-4" />
                  <span>Engineering Subjects</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">15 Subjects</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#E8EEFF]">
                Core Computer Science
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-[#8E9FC8] leading-relaxed">
                Comprehensive lecture notes and MCQ tests for Operating Systems, DBMS, Computer Networks, System Design, Compiler Design, and Theory of Computation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E2B4D] flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">190+ Topics</span>
              <Link
                href="/core-cs"
                className="text-xs font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
              >
                <span>View Subjects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Track 3: Quantitative & Logical Aptitude */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-[#8E9FC8] mb-3">
                <span className="flex items-center space-x-1.5 text-amber-600 dark:text-amber-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Screening Aptitude</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">4 Categories</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#E8EEFF]">
                Aptitude &amp; Reasoning
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-[#8E9FC8] leading-relaxed">
                Quantitative formulas, Logical Reasoning patterns, Verbal Ability, and Spatial Aptitude designed for campus placements and online technical assessment rounds.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E2B4D] flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Timed MCQs</span>
              <Link
                href="/aptitude"
                className="text-xs font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
              >
                <span>Start Aptitude</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CORE CS SUBJECT DIRECTORY (Immediate Learning Utility) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-[#8E9FC8]">
              Core CS Subjects Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              15 undergraduate computer science disciplines with revision notes and topic quizzes.
            </p>
          </div>
          <Link
            href="/core-cs"
            className="text-xs font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
          >
            <span>Open Full Core CS Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CORE_SUBJECTS.map((subject) => (
            <Link
              key={subject.id}
              href="/core-cs"
              className="p-3.5 rounded-lg border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] hover:border-slate-300 dark:hover:border-[#2D3D6E] transition-colors flex items-start justify-between group"
            >
              <div className="min-w-0 pr-3">
                <div className="text-xs font-bold text-slate-900 dark:text-[#E8EEFF] group-hover:text-[var(--brand-primary)] transition-colors truncate">
                  {subject.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#8E9FC8] mt-0.5 line-clamp-1">
                  {subject.description}
                </div>
                <div className="flex items-center space-x-2 mt-2 text-[10px] text-slate-400 font-mono">
                  <span>{subject.topicCount} Topics</span>
                  <span>•</span>
                  <span>{subject.questionCount} MCQs</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[var(--brand-primary)] group-hover:translate-x-0.5 transition-transform shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: HIGH-FREQUENCY DSA PATTERNS INDEX */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-[#8E9FC8]">
              High-Frequency Algorithmic Patterns
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Focus on fundamental patterns rather than memorizing isolated questions.
            </p>
          </div>
          <Link
            href="/dsa"
            className="text-xs font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
          >
            <span>Practice 150+ Problems in Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="border border-slate-200 dark:border-[#1E2B4D] rounded-xl bg-white dark:bg-[#151D35] overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-[#1E2B4D]">
            {DSA_PATTERNS_PREVIEW.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-[#1B2442]/40 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-[#E8EEFF]">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#0B1020] text-slate-600 dark:text-[#8E9FC8] border border-slate-200 dark:border-[#1E2B4D]">
                      {item.complexity}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#8E9FC8] mt-1">
                    Classic Problems: <span className="font-mono">{item.problems}</span>
                  </div>
                </div>
                <Link
                  href="/dsa"
                  className="text-xs font-medium text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1 shrink-0 self-start sm:self-center"
                >
                  <span>Practice Pattern</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: RESUME ATS SCANNER & AUDIT CALLOUT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#151D35] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <FileCheck2 className="w-4 h-4" />
              <span>ATS Resume Evaluator</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#E8EEFF]">
              Test your engineering resume against standard applicant tracking parsers.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8E9FC8] leading-relaxed">
              Upload your PDF or DOCX resume to detect missing technical keywords, highlight formatting red flags, and receive STAR-method rewritten bullet points.
            </p>
          </div>
          <Link
            href="/resume-checker"
            className="px-4 py-2.5 rounded-lg bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-semibold transition-colors shrink-0 inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <span>Scan Your Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
