'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { getCurrentUser, type UserSession } from '@/lib/auth/session';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [userPromptCount, setUserPromptCount] = useState(0);

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi there! I am your **StackUp AI Assistant**. Need a quick DSA intuition hint, Core CS concept clarification, or resume advice? Ask me anything!',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(1);

  // Derive human-readable context from current URL
  const sectionContext = React.useMemo(() => {
    if (pathname.includes('/dsa')) return 'DSA Practice Hub';
    if (pathname.includes('/core-cs')) return 'Core CS Subjects (OS, DBMS, CN, System Design, Git, COA, TOC)';
    if (pathname.includes('/aptitude')) return 'Quantitative & Logical Aptitude';
    if (pathname.includes('/resume-checker')) return 'Resume ATS Checker';
    if (pathname.includes('/profile')) return 'Student Profile & Analytics';
    return 'StackUp Interview Prep';
  }, [pathname]);

  // Suggested prompt chips based on section context
  const suggestionChips = React.useMemo(() => {
    if (pathname.includes('/dsa')) {
      return [
        'Explain Two Pointers pattern',
        'How to approach 3Sum?',
        'Binary Search on rotated array',
      ];
    }
    if (pathname.includes('/core-cs')) {
      return [
        'Difference between Process & Thread',
        'Explain ACID & Two-Phase Locking',
        'How does Consistent Hashing work?',
        'Git Merge vs Git Rebase differences',
      ];
    }
    if (pathname.includes('/aptitude')) {
      return [
        'Quick formula for Permutations vs Combinations',
        'Shortcut for Time & Work problems',
        'Probability with dice & cards',
      ];
    }
    if (pathname.includes('/resume-checker')) {
      return [
        'How to write a STAR resume bullet?',
        'Must-have tech keywords for SWE',
        'How to quantify backend impact?',
      ];
    }
    return [
      'What are the most asked CS topics?',
      'How to structure an interview answer?',
      'Tips for technical rounds',
    ];
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: `u-${msgIdRef.current++}`,
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setUserPromptCount((prev) => prev + 1);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sectionContext,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error('Chat API response failed');
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `a-${msgIdRef.current++}`,
        role: 'assistant',
        content: data.reply || 'Here is some guidance on that topic.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${msgIdRef.current++}`,
          role: 'assistant',
          content: 'Sorry, I encountered an issue connecting to the assistant. Please try asking again!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-xl shadow-blue-600/30 hover:scale-105 transition-all duration-200"
          aria-label="Open StackUp AI Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-blue-700 rounded-full" />
          </div>
          <span className="text-xs font-bold tracking-tight pr-1">Ask AI</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[550px] max-h-[85vh] bg-white dark:bg-[#131c31] border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-blue-600 px-5 py-3.5 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">StackUp AI</h3>
                <p className="text-[11px] text-blue-100 flex items-center space-x-1">
                  <span>Context:</span>
                  <span className="font-semibold underline decoration-blue-300">{sectionContext}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-[#0b1120]/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-[#1e293b] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <div className="prose prose-xs dark:prose-invert max-w-none text-xs leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/60 rounded-2xl px-3.5 py-2.5 text-xs text-slate-500 rounded-bl-none w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131c31] flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box or Guest Lock Card */}
          {!currentUser && userPromptCount >= 1 ? (
            <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-blue-50/70 dark:bg-blue-950/40 text-center space-y-2">
              <div className="flex items-center justify-center space-x-1.5 text-xs text-blue-700 dark:text-blue-300 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Free preview prompt used</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Sign in to continue unlimited AI interview prep with StackUp Assistant.
              </p>
              <Link
                href={`/login?redirect=${encodeURIComponent(pathname)}`}
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <span>Sign In to Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about ${sectionContext}...`}
                className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
