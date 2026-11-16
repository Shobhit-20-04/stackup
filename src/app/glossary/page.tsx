'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookA, 
  Search, 
  ArrowRight, 
  Lightbulb
} from 'lucide-react';
import { TECHNICAL_GLOSSARY } from '@/lib/data/glossary';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    TECHNICAL_GLOSSARY.forEach((g) => set.add(g.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return TECHNICAL_GLOSSARY.filter((entry) => {
      const matchCat = selectedCategory === 'All' || entry.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;

      return (
        entry.term.toLowerCase().includes(q) ||
        entry.simpleDefinition.toLowerCase().includes(q) ||
        entry.technicalDefinition.toLowerCase().includes(q) ||
        entry.realWorldAnalogy.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold border border-[var(--brand-primary)]/20">
            <BookA className="w-3.5 h-3.5" />
            <span>INTERACTIVE TECHNICAL DICTIONARY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Technical Glossary for Beginners
          </h1>
          <p className="text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
            Technology is filled with confusing jargon. We explain every critical concept twice: first in plain English with an intuitive real-world analogy, then with technical engineering precision.
          </p>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-xs">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any term (e.g. API, Variable, Compiler, Git, SQL)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'bg-[var(--surface-sunken)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] font-medium px-1">
          <span>Showing {filteredEntries.length} term{filteredEntries.length === 1 ? '' : 's'}</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[var(--brand-primary)] hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Glossary Cards Grid */}
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--foreground-muted)] text-sm space-y-2">
            <p className="font-semibold text-[var(--foreground)]">No matching technical terms found</p>
            <p className="text-xs">Try searching for broader keywords like &quot;database&quot;, &quot;code&quot;, or &quot;network&quot;.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEntries.map((entry) => (
              <article
                key={entry.id}
                id={entry.id}
                className="bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-slate-300 dark:hover:border-zinc-700 rounded-2xl p-6 space-y-5 transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Term Header & Category */}
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-black text-[var(--foreground)] tracking-tight">
                      {entry.term}
                    </h2>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 shrink-0">
                      {entry.category}
                    </span>
                  </div>

                  {/* Simple Explanation */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block">
                      Plain English (Zero Jargon)
                    </span>
                    <p className="text-xs text-[var(--foreground)] font-medium leading-relaxed">
                      {entry.simpleDefinition}
                    </p>
                  </div>

                  {/* Real World Analogy */}
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200/90 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-700 dark:text-amber-400 text-[11px]">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                      <span>Real-World Analogy</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {entry.realWorldAnalogy}
                    </p>
                  </div>

                  {/* Technical Precision */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[var(--foreground-muted)] tracking-wider block">
                      Engineering Definition
                    </span>
                    <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                      {entry.technicalDefinition}
                    </p>
                  </div>

                  {/* Code / Usage Example */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[var(--foreground-muted)] tracking-wider block">
                      Concrete Example
                    </span>
                    <div className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto">
                      <code>{entry.example}</code>
                    </div>
                  </div>
                </div>

                {/* Footer: Related Terms & Lesson Link */}
                <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-1 text-[11px] text-[var(--foreground-muted)]">
                    <span className="font-semibold text-[10px] uppercase">Related:</span>
                    {entry.relatedTerms.map((rt) => (
                      <span key={rt} className="px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] text-[10px] font-medium">
                        {rt}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={entry.lessonUrl}
                    className="text-xs font-bold text-[var(--brand-primary)] hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Read Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
