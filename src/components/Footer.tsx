'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Code2, BookOpen, Cpu, FileCheck2, ShieldCheck } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-[#1E2B4D] bg-white dark:bg-[#0B1020] mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 select-none">
              <div className="w-7 h-7 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-white shadow-xs">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-[#E8EEFF]">
                Stack<span className="text-[var(--brand-primary)]">Up</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-[#8E9FC8] leading-relaxed">
              Curated technical interview curriculum for engineering students and software developers.
            </p>
          </div>

          {/* Col 2: Practice Curriculum */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-[#E8EEFF]">
              Curriculum Roadmap
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-[#8E9FC8]">
              <li>
                <Link href="/dsa" className="hover:text-[var(--brand-primary)] transition-colors flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>DSA Practice Hub (150+ Problems)</span>
                </Link>
              </li>
              <li>
                <Link href="/core-cs" className="hover:text-[var(--brand-primary)] transition-colors flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  <span>Core CS (15 Subjects &amp; Notes)</span>
                </Link>
              </li>
              <li>
                <Link href="/aptitude" className="hover:text-[var(--brand-primary)] transition-colors flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quantitative &amp; Logical Aptitude</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Career Tools */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#E8EEFF]">
              Career Tools
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-[#8E9FC8]">
              <li>
                <Link href="/resume-checker" className="hover:text-[var(--brand-primary)] transition-colors flex items-center space-x-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>ATS Resume Evaluator</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[var(--brand-primary)] transition-colors">
                  Candidate Analytics &amp; Scorecards
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[var(--brand-primary)] transition-colors">
                  Account Sign In / Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Industry Benchmarks */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-[#E8EEFF]">
              Benchmarks
            </div>
            <p className="text-xs text-slate-500 dark:text-[#8E9FC8] leading-relaxed">
              Curated for software engineering interviews, GATE CS, and placements.
            </p>
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              <span>Python, C++, Java &amp; TypeScript solutions</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1E2B4D]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-[#8E9FC8]">
          <div className="flex items-center space-x-3">
            <span>&copy; {new Date().getFullYear()} StackUp.</span>
            <span className="text-slate-300 dark:text-[#1E2B4D]">|</span>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-slate-400 dark:text-[#8E9FC8]">Theme:</span>
              <ThemeToggle variant="button" showLabel />
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <Link href="/resume-checker" className="hover:text-[var(--brand-primary)] transition-colors">
              ATS Scanner
            </Link>
            <Link href="/dsa" className="hover:text-[var(--brand-primary)] transition-colors">
              DSA Patterns
            </Link>
            <Link href="/core-cs" className="hover:text-[var(--brand-primary)] transition-colors">
              Core CS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
