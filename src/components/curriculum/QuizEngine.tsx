'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  Flag,
  Lightbulb,
  Copy,
  Check,
  Sparkles,
  BookOpen
} from 'lucide-react';
import type { Topic, Question } from '@/lib/data/curriculum';
import { recordQuizAttempt } from '@/lib/services/progress';

interface QuizEngineProps {
  topic: Topic;
  sectionSlug: string;
  onExitQuiz: () => void;
}

export default function QuizEngine({ topic, sectionSlug, onExitQuiz }: QuizEngineProps) {
  // Questions pool (can be subset when practicing missed questions)
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(topic.questions);
  const [isRetryingMissed, setIsRetryingMissed] = useState(false);

  // Engine Mode: 'exam' (timed with end scorecard) vs 'practice' (instant solution reveal)
  const [quizMode, setQuizMode] = useState<'exam' | 'practice'>('exam');

  const initialTimeSeconds = useMemo(
    () => Math.max(120, activeQuestions.length * 60),
    [activeQuestions.length]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedIndices, setFlaggedIndices] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(initialTimeSeconds);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [solutionFilter, setSolutionFilter] = useState<'all' | 'incorrect' | 'correct' | 'flagged'>('all');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const calculateScore = useCallback(() => {
    let correctCount = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_option) {
        correctCount += 1;
      }
    });
    return correctCount;
  }, [activeQuestions, selectedAnswers]);

  const handleSubmit = useCallback(async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);

    // Persist attempt locally and to Supabase
    await recordQuizAttempt({
      sectionSlug,
      topicId: topic.id,
      topicTitle: topic.title,
      score: finalScore,
      total: activeQuestions.length,
    });
  }, [calculateScore, activeQuestions.length, sectionSlug, topic.id, topic.title]);

  // Exam Countdown Timer & Practice Elapsed Timer
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);

      if (quizMode === 'exam') {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, quizMode, handleSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = activeQuestions[currentIndex];
  const isSelected = (optIdx: number) => selectedAnswers[currentIndex] === optIdx;
  const isFlagged = Boolean(flaggedIndices[currentIndex]);

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted && quizMode === 'exam') return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx,
    }));
  };

  const toggleFlag = () => {
    setFlaggedIndices((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  const handleRetakeFull = () => {
    setActiveQuestions(topic.questions);
    setIsRetryingMissed(false);
    setSelectedAnswers({});
    setFlaggedIndices({});
    setCurrentIndex(0);
    setTimeLeft(Math.max(120, topic.questions.length * 60));
    setTimeElapsed(0);
    setIsSubmitted(false);
    setScore(0);
    setSolutionFilter('all');
  };

  const handlePracticeMissed = () => {
    const missed = activeQuestions.filter((q, idx) => selectedAnswers[idx] !== q.correct_option);
    if (missed.length === 0) return;
    setActiveQuestions(missed);
    setIsRetryingMissed(true);
    setSelectedAnswers({});
    setFlaggedIndices({});
    setCurrentIndex(0);
    setTimeLeft(Math.max(120, missed.length * 60));
    setTimeElapsed(0);
    setIsSubmitted(false);
    setScore(0);
    setSolutionFilter('all');
  };

  const copyResultSummary = () => {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    const summary = `🏆 StackUp Quiz Result: "${topic.title}"\n📊 Score: ${score}/${activeQuestions.length} (${percentage}% Accuracy)\n⏱️ Time: ${formatTime(quizMode === 'exam' ? initialTimeSeconds - timeLeft : timeElapsed)}\n🎯 Prep Track: ${sectionSlug.toUpperCase()} Hub\nPractice at: https://stackup-zeta.vercel.app`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Scorecard Screen
  if (isSubmitted) {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    const passed = percentage >= 70;
    const missedQuestionsCount = activeQuestions.filter((q, idx) => selectedAnswers[idx] !== q.correct_option).length;
    const correctQuestionsCount = activeQuestions.filter((q, idx) => selectedAnswers[idx] === q.correct_option).length;
    const flaggedQuestionsCount = Object.values(flaggedIndices).filter(Boolean).length;

    const filteredReviewQuestions = activeQuestions.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
      const userPick = selectedAnswers[idx];
      const isCorrect = userPick === q.correct_option;
      if (solutionFilter === 'incorrect') return !isCorrect;
      if (solutionFilter === 'correct') return isCorrect;
      if (solutionFilter === 'flagged') return Boolean(flaggedIndices[idx]);
      return true;
    });

    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Scorecard Hero */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm text-center">
          <div className="inline-flex p-4 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 mb-4">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {passed ? 'Outstanding Performance!' : 'Quiz Completed — Keep Practicing!'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Topic: <span className="font-semibold text-slate-800 dark:text-slate-200">{topic.title}</span>
            {isRetryingMissed && <span className="ml-2 text-xs font-bold text-amber-500">(Targeted Remediation Mode)</span>}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 max-w-lg mx-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#1e293b]/50 border border-slate-100 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                {score}/{activeQuestions.length}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mt-1">Raw Score</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#1e293b]/50 border border-slate-100 dark:border-slate-800">
              <div className={`text-3xl sm:text-4xl font-black ${passed ? 'text-emerald-500' : 'text-amber-500'}`}>
                {percentage}%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mt-1">Accuracy</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#1e293b]/50 border border-slate-100 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-200">
                {formatTime(quizMode === 'exam' ? initialTimeSeconds - timeLeft : timeElapsed)}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mt-1">Duration</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetakeFull}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Full Quiz</span>
            </button>

            {missedQuestionsCount > 0 && !isRetryingMissed && (
              <button
                onClick={handlePracticeMissed}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice Missed ({missedQuestionsCount} Qs)</span>
              </button>
            )}

            <button
              onClick={copyResultSummary}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1.5"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSummary ? 'Summary Copied!' : 'Copy Result'}</span>
            </button>

            <button
              onClick={onExitQuiz}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Back to Topic Notes</span>
            </button>
          </div>
        </div>

        {/* Detailed Solutions Breakdown with Filter Tabs */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Detailed Solutions & Explanations</h3>
              <p className="text-xs text-slate-500">Step-by-step reasoning and algorithmic insights for every question.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-[#1e293b] p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setSolutionFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  solutionFilter === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All ({activeQuestions.length})
              </button>
              <button
                onClick={() => setSolutionFilter('incorrect')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  solutionFilter === 'incorrect'
                    ? 'bg-red-500 text-white shadow-xs font-bold'
                    : 'text-slate-500 hover:text-red-500'
                }`}
              >
                Missed ({missedQuestionsCount})
              </button>
              <button
                onClick={() => setSolutionFilter('correct')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  solutionFilter === 'correct'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-slate-500 hover:text-emerald-500'
                }`}
              >
                Correct ({correctQuestionsCount})
              </button>
              {flaggedQuestionsCount > 0 && (
                <button
                  onClick={() => setSolutionFilter('flagged')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    solutionFilter === 'flagged'
                      ? 'bg-amber-500 text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-amber-500'
                  }`}
                >
                  Flagged ({flaggedQuestionsCount})
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {filteredReviewQuestions.map(({ q, idx }) => {
              const userPick = selectedAnswers[idx];
              const isCorrect = userPick === q.correct_option;
              const hasFlagged = Boolean(flaggedIndices[idx]);

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                      : 'border-red-200 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-2 font-bold text-sm text-slate-900 dark:text-white">
                      <span className="text-slate-400">Q{idx + 1}.</span>
                      <span>{q.question}</span>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      {hasFlagged && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                          <Flag className="w-3 h-3 fill-amber-500" />
                          <span>Flagged</span>
                        </span>
                      )}
                      {isCorrect ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userPick === optIdx;
                      const isCorrectChoice = q.correct_option === optIdx;
                      let optionClasses = 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400';

                      if (isCorrectChoice) {
                        optionClasses = 'border-emerald-500 bg-emerald-100/50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold';
                      } else if (isUserChoice) {
                        optionClasses = 'border-red-500 bg-red-100/50 dark:bg-red-950/50 text-red-900 dark:text-red-200 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optionClasses}`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-slate-200/50 dark:bg-slate-800">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isCorrectChoice && <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Correct Answer</span>}
                          {isUserChoice && !isCorrectChoice && <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400">Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-[#1e293b]/70 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-1.5 font-bold text-blue-600 dark:text-blue-400 mb-1">
                      <Lightbulb className="w-4 h-4" />
                      <span>Conceptual Solution & Step-by-Step Explanation:</span>
                    </div>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz Interface
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Quiz Top Bar with Mode Switcher & Timer */}
      <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={onExitQuiz}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit to Notes</span>
          </button>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-[#1e293b] rounded-xl text-xs font-bold">
            <button
              onClick={() => setQuizMode('exam')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                quizMode === 'exam'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Timed Exam
            </button>
            <button
              onClick={() => setQuizMode('practice')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                quizMode === 'practice'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Tutor Mode
            </button>
          </div>
        </div>

        {/* Timer & Flag Button */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            type="button"
            onClick={toggleFlag}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              isFlagged
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500' : ''}`} />
            <span>{isFlagged ? 'Flagged' : 'Flag Question'}</span>
          </button>

          {quizMode === 'exam' ? (
            <div
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                timeLeft < 30
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-600 animate-pulse'
                  : 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)} Remaining</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
              <Clock className="w-4 h-4" />
              <span>Elapsed: {formatTime(timeElapsed)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden -mt-2">
        <div
          className={`h-full transition-all duration-300 rounded-full ${quizMode === 'practice' ? 'bg-emerald-600' : 'bg-blue-600'}`}
          style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-9 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm space-y-7 animate-in fade-in duration-200">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Question {currentIndex + 1} of {activeQuestions.length}
          </span>
          {isFlagged && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <Flag className="w-3 h-3 fill-amber-500" />
              <span>Review Later</span>
            </span>
          )}
        </div>

        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, optIdx) => {
            const active = isSelected(optIdx);
            const isPracticeAnswered = quizMode === 'practice' && selectedAnswers[currentIndex] !== undefined;
            const isCorrectChoice = optIdx === currentQuestion.correct_option;

            let optionClasses = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800';

            if (quizMode === 'practice' && isPracticeAnswered) {
              if (isCorrectChoice) {
                optionClasses = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
              } else if (active) {
                optionClasses = 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 font-semibold ring-1 ring-red-500';
              }
            } else if (active) {
              optionClasses = 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 shadow-sm ring-1 ring-blue-600';
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${optionClasses}`}
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                      quizMode === 'practice' && isPracticeAnswered && isCorrectChoice
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : quizMode === 'practice' && active && !isCorrectChoice
                        ? 'border-red-600 bg-red-600 text-white'
                        : active
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span>{option}</span>
                </div>

                {quizMode === 'practice' && isPracticeAnswered && isCorrectChoice && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {quizMode === 'practice' && isPracticeAnswered && active && !isCorrectChoice && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Practice Mode Instant Explanation Callout */}
        {quizMode === 'practice' && selectedAnswers[currentIndex] !== undefined && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#1e293b]/70 border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <Lightbulb className="w-4 h-4" />
              <span>Step-by-Step Solution &amp; Conceptual Explanation:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Navigation & Submit Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentIndex < activeQuestions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <span>Submit Final Answers</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Palette with Interactive State Indicators */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">Question Palette</span>
          <div className="flex items-center space-x-3 text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Answered</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Flagged</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
              <span>Pending</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeQuestions.map((_, qIdx) => {
            const answered = selectedAnswers[qIdx] !== undefined;
            const isCurrent = currentIndex === qIdx;
            const flagged = Boolean(flaggedIndices[qIdx]);

            let btnClasses = 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700';

            if (isCurrent) {
              btnClasses = 'ring-2 ring-blue-500 bg-blue-600 text-white font-extrabold shadow-sm';
            } else if (flagged) {
              btnClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-400 font-bold';
            } else if (answered) {
              btnClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold';
            }

            return (
              <button
                key={qIdx}
                onClick={() => setCurrentIndex(qIdx)}
                className={`w-8 h-8 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer relative ${btnClasses}`}
                title={`Question ${qIdx + 1}${flagged ? ' (Flagged)' : ''}${answered ? ' (Answered)' : ''}`}
              >
                <span>{qIdx + 1}</span>
                {flagged && !isCurrent && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-1 ring-white dark:ring-slate-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
