'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2 
} from 'lucide-react';

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
    if (pathname.includes('/core-cs')) return 'Core CS Subjects (OS, DBMS, CN)';
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
        'Explain ACID properties',
        'How does TCP 3-way handshake work?',
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3 bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white rounded-full shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all duration-200"
          aria-label="Open StackUp AI Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-700 rounded-full" />
          </div>
          <span className="text-xs font-bold tracking-tight pr-1">Ask AI</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[550px] max-h-[85vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">StackUp AI</h3>
                <p className="text-[11px] text-indigo-100 flex items-center space-x-1">
                  <span>Context:</span>
                  <span className="font-semibold underline decoration-indigo-300">{sectionContext}</span>
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
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-zinc-50/50 dark:bg-zinc-950/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 rounded-bl-none shadow-sm'
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
              <div className="flex items-center space-x-2 bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 rounded-2xl px-3.5 py-2.5 text-xs text-zinc-500 rounded-bl-none w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${sectionContext}...`}
              className="flex-1 px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-white placeholder:text-zinc-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
