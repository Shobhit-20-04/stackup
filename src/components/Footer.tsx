'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Code2, BookOpen, Cpu, FileCheck2, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-white">
                Stack<span className="text-indigo-600 dark:text-indigo-400">Up</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              The complete, structured interview preparation platform for engineering students and developers targeting top software engineering roles.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Placement Curriculum</span>
            </div>
          </div>

          {/* Col 2: Practice Curriculum */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Curriculum Roadmap
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/dsa" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>DSA Practice Hub (150+ Problems)</span>
                </Link>
              </li>
              <li>
                <Link href="/core-cs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-500" />
                  <span>Core CS (8 Subjects • 40 Modules)</span>
                </Link>
              </li>
              <li>
                <Link href="/aptitude" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  <span>Quantitative &amp; Logical Aptitude</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Career Tools */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Career Tools
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/resume-checker" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>ATS Resume Evaluator</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Candidate Analytics &amp; Scorecards
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Account Sign In / Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Industry Benchmarks */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Portals &amp; Integrations
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Curated against the Blind 75, Striver SDE sheet, NeetCode patterns, and top tech company hiring rubrics.
            </p>
            <div className="pt-2 text-[11px] text-zinc-400">
              <span>Verified solutions in Python, C++, Java, &amp; TypeScript</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center space-x-2">
            <span>&copy; {new Date().getFullYear()} StackUp. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Engineered for campus placements and top tech careers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
