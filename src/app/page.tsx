import Link from 'next/link';
import { 
  BookOpen, 
  Cpu, 
  Code2, 
  FileCheck2, 
  Bot, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      title: 'Quantitative & Logical Aptitude',
      desc: 'Topic-by-topic structured notes followed by timed, scored MCQs. Every attempt is saved to monitor your speed and accuracy.',
      icon: BookOpen,
      href: '/aptitude',
      badge: 'Phase 2',
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Core CS Subjects',
      desc: 'Master the high-frequency interview topics in OS, DBMS, Computer Networks, and OOPs with concise revision summaries and quizzes.',
      icon: Cpu,
      href: '/core-cs',
      badge: 'Phase 2',
      color: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Curated DSA Hub',
      desc: 'A structured roadmap organized by pattern and difficulty. Seamlessly jump into LeetCode problems, Striver’s SDE Sheet, and video solutions.',
      icon: Code2,
      href: '/dsa',
      badge: 'Phase 3',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'ATS Resume Checker',
      desc: 'Upload your PDF or DOCX resume for deep Claude AI-powered scoring, keyword gap detection, and actionable formatting guidance.',
      icon: FileCheck2,
      href: '/resume-checker',
      badge: 'Phase 4',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Context-Aware AI Tutor',
      desc: 'Ask questions directly from your current topic. The assistant understands your active section and provides instant, relevant clarifications.',
      icon: Bot,
      href: '#',
      badge: 'Phase 5',
      color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-600 dark:text-pink-400',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Built for Real Scale from Day 1</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Ace your tech interviews with{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-amber-500 bg-clip-text text-transparent">
            precision & structure
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          An all-in-one preparation platform for students — structured notes and timed quizzes across Aptitude, Core CS, and DSA, plus an intelligent ATS resume analyzer.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-all group"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/profile"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all"
          >
            <span>View Dashboard</span>
          </Link>
        </div>

        {/* Scalability Highlights */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-amber-500 mb-2" />
            <div className="text-sm font-bold text-zinc-900 dark:text-white">Edge-Ready</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Vercel Edge Network + PgBouncer pooling</div>
          </div>
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2" />
            <div className="text-sm font-bold text-zinc-900 dark:text-white">Row Level Security</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Strict Postgres RLS on all user data</div>
          </div>
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <Flame className="w-5 h-5 text-rose-500 mb-2" />
            <div className="text-sm font-bold text-zinc-900 dark:text-white">Daily Streak Tracking</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Maintain momentum across all subjects</div>
          </div>
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <Bot className="w-5 h-5 text-indigo-500 mb-2" />
            <div className="text-sm font-bold text-zinc-900 dark:text-white">AI-Powered</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Claude-driven scoring and assistance</div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Everything you need to secure the offer
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Structured in five sequential modules to take you from foundational aptitude to final interview rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  <Link href={feature.href} className="inline-flex items-center space-x-1 hover:underline">
                    <span>Explore module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
