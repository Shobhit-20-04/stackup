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
  Loader2, 
  Lock, 
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Sparkles,
  Square
} from 'lucide-react';
import { getCurrentUser, getFastCachedUser, type UserSession } from '@/lib/auth/session';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  provider?: string;
  model?: string;
  isStreaming?: boolean;
  error?: boolean;
}

/**
 * Enhanced Code Block with one-click copy button and language badge.
 */
function CodeBlock({ children, className }: React.ComponentPropsWithoutRef<'code'>) {
  const [copied, setCopied] = useState(false);
  const codeText = String(children).replace(/\n$/, '');
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  if (!match) {
    return (
      <code className="px-1.5 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--brand-primary)]">
        {children}
      </code>
    );
  }

  return (
    <div className="my-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] overflow-hidden font-mono text-[11px]">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--surface-card)] border-b border-[var(--border-subtle)] text-[10px] text-[var(--foreground-muted)]">
        <span className="font-semibold uppercase tracking-wider text-[var(--brand-primary)]">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 hover:text-[var(--foreground)] transition-colors cursor-pointer"
          title="Copy snippet"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 overflow-x-auto">
        <pre className="text-[var(--foreground)] leading-relaxed m-0">{children}</pre>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(getFastCachedUser);
  const [userPromptCount, setUserPromptCount] = useState(0);
  const [activeModelInfo, setActiveModelInfo] = useState<string>('StackUp AI');

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(1);

  useEffect(() => {
    getCurrentUser().then((u) => setCurrentUser(u));

    // Fetch active provider telemetry
    fetch('/api/chat')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.activeProvider === 'gemini') {
          setActiveModelInfo(data.geminiModel || 'Gemini 3.8 Flash');
        } else if (data?.activeProvider === 'anthropic') {
          setActiveModelInfo('Claude 3.5 Sonnet');
        } else {
          setActiveModelInfo('StackUp Grounded AI');
        }
      })
      .catch(() => {});
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to **StackUp Assistant**. Need algorithmic intuition, core CS concept clarification, or ATS resume advice? Type a query or select a topic below.',
    },
  ]);

  const sectionContext = React.useMemo(() => {
    if (pathname.includes('/dsa')) return 'DSA Practice Hub';
    if (pathname.includes('/core-cs')) return 'Core CS Subjects (OS, DBMS, CN, System Design, Git, COA, TOC)';
    if (pathname.includes('/aptitude')) return 'Quantitative & Logical Aptitude';
    if (pathname.includes('/resume-checker')) return 'Resume ATS Checker';
    if (pathname.includes('/profile')) return 'Student Profile & Analytics';
    return 'StackUp Interview Prep';
  }, [pathname]);

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

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    handleStopStream();
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Conversation cleared. How can I assist you with your tech preparation today?',
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    handleStopStream();

    const userMessageId = `u-${msgIdRef.current++}`;
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: text,
    };

    const assistantMessageId = `a-${msgIdRef.current++}`;
    const initialAssistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    setInput('');
    setUserPromptCount((prev) => prev + 1);
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          message: text,
          sectionContext,
          history: historyPayload,
          stream: true,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Chat API error (${res.status})`);
      }

      // Check if response is streaming SSE
      if (res.headers.get('content-type')?.includes('text/event-stream') && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let streamBuffer = '';
        let accumulatedReply = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          streamBuffer += decoder.decode(value, { stream: true });
          const lines = streamBuffer.split('\n');
          streamBuffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const dataStr = trimmed.slice(5).trim();

            try {
              const chunk = JSON.parse(dataStr);
              if (chunk.delta) {
                accumulatedReply += chunk.delta;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId
                      ? { ...m, content: accumulatedReply, isStreaming: true }
                      : m
                  )
                );
              }
              if (chunk.done) {
                if (chunk.metadata?.model) {
                  setActiveModelInfo(chunk.metadata.model);
                }
              }
            } catch {
              // ignore malformed SSE line
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { ...m, isStreaming: false }
              : m
          )
        );
      } else {
        // Fallback standard JSON
        const data = await res.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  content: data.reply || 'Guidance provided.',
                  provider: data.metadata?.provider,
                  model: data.metadata?.model,
                  isStreaming: false,
                }
              : m
          )
        );
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId ? { ...m, isStreaming: false } : m
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  content: 'Sorry, I encountered an issue connecting to the assistant. Please try asking again or check your connection.',
                  error: true,
                  isStreaming: false,
                }
              : m
          )
        );
      }
    } finally {
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (loading) return;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
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
          className="group flex items-center space-x-2 px-3.5 py-2.5 bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] text-[var(--foreground)] border border-[var(--border-subtle)] rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          aria-label="Open StackUp Assistant"
        >
          <Bot className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-xs font-medium">Assistant</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[440px] h-[550px] max-h-[85vh] bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-xl shadow-2xl flex flex-col overflow-hidden modal-enter">
          {/* Header */}
          <div className="bg-[var(--surface-card)] px-4 py-3 border-b border-[var(--border-subtle)] text-[var(--foreground)] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] flex items-center justify-center">
                <Bot className="w-4 h-4 text-[var(--brand-primary)]" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-xs font-semibold leading-tight text-[var(--foreground)]">StackUp Assistant</h3>
                  <span className="inline-flex items-center space-x-0.5 px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--brand-primary)]">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{activeModelInfo}</span>
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[var(--foreground-muted)] flex items-center space-x-1 mt-0.5">
                  <span>Context:</span>
                  <span className="text-[var(--brand-primary)] truncate max-w-[180px]">{sectionContext}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleClearChat}
                className="p-1 rounded-md text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer"
                title="Clear conversation"
                aria-label="Clear chat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[var(--background)]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                      : m.error
                      ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs'
                      : 'bg-[var(--surface-card)] text-[var(--foreground)] border border-[var(--border-subtle)] shadow-xs'
                  }`}
                >
                  {m.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <div className="prose prose-xs dark:prose-invert max-w-none text-xs leading-relaxed">
                      {m.content ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code: CodeBlock,
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      ) : m.isStreaming ? (
                        <div className="flex items-center space-x-2 text-[var(--foreground-muted)] py-1">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--brand-primary)]" />
                          <span className="font-mono text-[11px]">Thinking & generating...</span>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && !messages.some((m) => m.isStreaming && m.content) && (
              <div className="flex items-center space-x-2 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-[var(--foreground-muted)] w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--brand-primary)]" />
                <span className="font-mono text-[11px]">Consulting StackUp Knowledge...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (Regenerate / Stop) */}
          <div className="px-3.5 py-1.5 bg-[var(--surface-card)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)]">
            {loading ? (
              <button
                onClick={handleStopStream}
                className="flex items-center space-x-1.5 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Stop Generating</span>
              </button>
            ) : (
              messages.length > 1 && (
                <button
                  onClick={handleRegenerate}
                  className="flex items-center space-x-1 hover:text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Regenerate Response</span>
                </button>
              )
            )}
            <span className="text-[10px] text-[var(--foreground-muted)]">Grounding: Active</span>
          </div>

          {/* Suggestion Chips */}
          <div className="px-3.5 py-2 border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)] flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--surface-card)] hover:bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
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
