'use client';

import React, { useState, useMemo } from 'react';
import { 
  FolderGit2, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Check, 
  Code2, 
  Layers, 
  Rocket, 
  ShieldCheck, 
  BookOpen, 
  Filter
} from 'lucide-react';
import { PRACTICAL_PROJECTS, type PracticalProject } from '@/lib/data/projects';

export default function ProjectsPage() {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [activeProject, setActiveProject] = useState<PracticalProject>(PRACTICAL_PROJECTS[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredProjects = useMemo(() => {
    if (selectedLevel === 'All') return PRACTICAL_PROJECTS;
    return PRACTICAL_PROJECTS.filter((p) => p.level === selectedLevel);
  }, [selectedLevel]);

  const handleCopyStarter = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Masthead Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold border border-[var(--brand-primary)]/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>STAGE 5 // PRACTICAL PROJECT DEVELOPMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Guided Project-Based Learning
          </h1>
          <p className="text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
            Stop copying tutorial code blindly. Build real, structured applications from scratch with defined problem statements, architectural blueprints, step-by-step milestones, testing guidelines, and evaluation rubrics.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-4">
          <span className="text-xs font-semibold text-[var(--foreground-muted)] flex items-center space-x-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Level:</span>
          </span>
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevel(level);
                const matching = level === 'All' ? PRACTICAL_PROJECTS : PRACTICAL_PROJECTS.filter((p) => p.level === level);
                if (matching.length > 0) setActiveProject(matching[0]);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedLevel === level
                  ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                  : 'bg-[var(--surface-card)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border-subtle)]'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* 2-Column Split: Project Drawer (Left) & Active Project Blueprint (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Project Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
              Curated Projects ({filteredProjects.length})
            </h2>

            <div className="space-y-2.5">
              {filteredProjects.map((project) => {
                const isSelected = activeProject.id === project.id;
                return (
                  <button
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--surface-card)] border-[var(--brand-primary)] shadow-md ring-1 ring-[var(--brand-primary)]/40'
                        : 'bg-[var(--surface-card)]/60 hover:bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-slate-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        project.level === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : project.level === 'Intermediate'
                          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                      }`}>
                        {project.level}
                      </span>
                      <span className="text-[11px] text-[var(--foreground-muted)] flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{project.estimatedHours}h build</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)]">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--foreground-muted)] line-clamp-2 mt-1">
                      {project.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[var(--foreground-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Blueprint for Active Project */}
          <div className="lg:col-span-8 bg-[var(--surface-card)] rounded-2xl border border-[var(--border-subtle)] p-6 sm:p-8 space-y-8 shadow-xs">
            
            {/* Project Header */}
            <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  activeProject.level === 'Beginner'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : activeProject.level === 'Intermediate'
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                }`}>
                  {activeProject.level} Project
                </span>
                <span className="text-xs font-medium text-[var(--foreground-muted)]">
                  Est. Completion: ~{activeProject.estimatedHours} Hours
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                {activeProject.title}
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                {activeProject.objective}
              </p>

              {/* Tech Stack Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]/60 text-xs">
                  <span className="text-[10px] block font-bold text-[var(--foreground-muted)]">FRONTEND</span>
                  <span className="font-semibold text-[var(--foreground)]">{activeProject.techChoices.frontend}</span>
                </div>
                {activeProject.techChoices.backend && (
                  <div className="p-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]/60 text-xs">
                    <span className="text-[10px] block font-bold text-[var(--foreground-muted)]">BACKEND</span>
                    <span className="font-semibold text-[var(--foreground)]">{activeProject.techChoices.backend}</span>
                  </div>
                )}
                {activeProject.techChoices.database && (
                  <div className="p-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]/60 text-xs">
                    <span className="text-[10px] block font-bold text-[var(--foreground-muted)]">DATABASE</span>
                    <span className="font-semibold text-[var(--foreground)]">{activeProject.techChoices.database}</span>
                  </div>
                )}
                <div className="p-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)]/60 text-xs">
                  <span className="text-[10px] block font-bold text-[var(--foreground-muted)]">DEPLOYMENT</span>
                  <span className="font-semibold text-[var(--foreground)]">{activeProject.techChoices.deployment}</span>
                </div>
              </div>

              {/* Encouraging Mentor Note */}
              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs flex items-start space-x-3">
                <span className="text-base select-none shrink-0 mt-0.5">✨</span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Mentor Tip for this Project</span>
                  <p className="leading-relaxed text-[var(--foreground-muted)]">
                    Don&apos;t worry about making the UI look pixel-perfect on your first try. Focus on completing each milestone in order. Once the data flows and your buttons work, you can always polish the styles!
                  </p>
                </div>
              </div>
            </div>

            {/* Problem Statement & Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>The Real Problem</span>
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed bg-[var(--surface-sunken)] p-3.5 rounded-xl border border-[var(--border-subtle)]/60">
                  {activeProject.problemStatement}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Features to Build</span>
                </h3>
                <ul className="text-xs text-[var(--foreground-muted)] space-y-1.5">
                  {activeProject.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step-by-Step Milestones */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[var(--foreground)] flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span>Step-by-Step Implementation Milestones</span>
                </h3>
                <span className="text-xs text-[var(--foreground-muted)]">
                  {activeProject.milestones.length} Milestones
                </span>
              </div>

              <div className="space-y-3">
                {activeProject.milestones.map((m) => (
                  <div key={m.milestoneNumber} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/50 space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {m.milestoneNumber}
                      </span>
                      <h4 className="text-sm font-bold text-[var(--foreground)]">
                        {m.title}
                      </h4>
                    </div>

                    <p className="text-xs text-[var(--foreground-muted)]">
                      {m.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {m.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start space-x-2 text-xs text-[var(--foreground-muted)]">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>

                    {m.codeSnippet && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                        <pre><code>{m.codeSnippet}</code></pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Starter Code Block */}
            {activeProject.starterCode && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--foreground)] flex items-center space-x-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    <span>Starter Template ({activeProject.starterCode.filename})</span>
                  </span>
                  <button
                    onClick={() => handleCopyStarter(activeProject.starterCode!.content)}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-[var(--surface-sunken)] hover:bg-slate-200 dark:hover:bg-zinc-800 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Starter'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-60">
                  <pre><code>{activeProject.starterCode.content}</code></pre>
                </div>
              </div>
            )}

            {/* Testing & Deployment Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-subtle)]">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Testing & Verification</span>
                </h4>
                <ul className="text-xs text-[var(--foreground-muted)] space-y-1.5">
                  {activeProject.testingGuidelines.map((test, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] flex items-center space-x-1.5">
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Deployment Guide</span>
                </h4>
                <ul className="text-xs text-[var(--foreground-muted)] space-y-1.5">
                  {activeProject.deploymentInstructions.map((inst, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Evaluation Rubric Table */}
            <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                Evaluation Rubric (Self-Assessment)
              </h4>
              <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[var(--surface-sunken)] border-b border-[var(--border-subtle)] text-[var(--foreground-muted)] font-semibold">
                    <tr>
                      <th className="p-3">Criterion</th>
                      <th className="p-3 w-20">Weight</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {activeProject.rubric.map((r, idx) => (
                      <tr key={idx} className="hover:bg-[var(--surface-sunken)]/40 transition-colors">
                        <td className="p-3 font-semibold text-[var(--foreground)]">{r.criterion}</td>
                        <td className="p-3 font-mono font-bold text-[var(--brand-primary)]">{r.weight}</td>
                        <td className="p-3 text-[var(--foreground-muted)]">{r.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
