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
import { getCurrentUser, getFastCachedUser, type UserSession } from '@/lib/auth/session';

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
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
  const [userPromptCount, setUserPromptCount] = useState(0);

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u));
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to **StackUp Assistant**. Need algorithmic intuition, core CS concept clarification, or ATS resume advice? Type a query or select a topic below.',
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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
          className="group flex items-center space-x-2 px-3.5 py-2.5 bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] text-[var(--foreground)] border border-[var(--border-subtle)] rounded-lg shadow-md transition-colors cursor-pointer"
          aria-label="Open StackUp Assistant"
        >
          <Bot className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-xs font-medium">Assistant</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[520px] max-h-[85vh] bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-150">
          {/* Header */}
          <div className="bg-[var(--surface-card)] px-4 py-3 border-b border-[var(--border-subtle)] text-[var(--foreground)] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] flex items-center justify-center">
                <Bot className="w-4 h-4 text-[var(--brand-primary)]" />
              </div>
              <div>
                <h3 className="text-xs font-semibold leading-tight text-[var(--foreground)]">StackUp Assistant</h3>
                <p className="text-[10px] font-mono text-[var(--foreground-muted)] flex items-center space-x-1 mt-0.5">
                  <span>Context:</span>
                  <span className="text-[var(--brand-primary)] truncate max-w-[200px]">{sectionContext}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[var(--background)]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                      : 'bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)] shadow-xs'
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
              <div className="flex items-center space-x-2 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-[var(--foreground-muted)] w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--brand-primary)]" />
                <span className="font-mono text-[11px]">Processing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-3.5 py-2 border-t border-[var(--border-subtle)] bg-[var(--surface-card)] flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--surface-sunken)] hover:bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box or Guest Lock Card */}
          {!currentUser && userPromptCount >= 1 ? (
            <div className="p-3.5 border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-center space-y-2">
              <div className="flex items-center justify-center space-x-1.5 text-xs text-[var(--brand-primary)] font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Preview query limit reached</span>
              </div>
              <p className="text-[11px] text-[var(--foreground-muted)]">
                Sign in to continue unlimited practice with the StackUp assistant.
              </p>
              <Link
                href={`/login?redirect=${encodeURIComponent(pathname)}`}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--brand-primary)] hover:opacity-95 text-white font-semibold text-xs shadow-xs transition-opacity"
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
              className="p-3 border-t border-[var(--border-subtle)] bg-[var(--surface-card)] flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about ${sectionContext}...`}
                aria-label={`Ask about ${sectionContext}`}
                className="flex-1 px-3 py-1.5 bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-lg text-xs focus:outline-none focus:border-[var(--brand-primary)] text-[var(--foreground)] placeholder:[var(--foreground-muted)]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 bg-[var(--brand-primary)] hover:opacity-95 disabled:opacity-40 text-white rounded-lg transition-opacity shadow-xs cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
