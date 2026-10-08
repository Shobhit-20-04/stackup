'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  AlertCircle 
} from 'lucide-react';
import type { Topic } from '@/lib/data/curriculum';
import { recordQuizAttempt } from '@/lib/services/progress';

interface QuizEngineProps {
  topic: Topic;
  sectionSlug: string;
  onExitQuiz: () => void;
}

export default function QuizEngine({ topic, sectionSlug, onExitQuiz }: QuizEngineProps) {
  const questions = topic.questions;
  const initialTimeSeconds = Math.max(120, questions.length * 60); // 1 minute per question or min 2 mins

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(initialTimeSeconds);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const calculateScore = useCallback(() => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_option) {
        correctCount += 1;
      }
    });
    return correctCount;
  }, [questions, selectedAnswers]);

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
      total: questions.length,
    });
  }, [calculateScore, questions.length, sectionSlug, topic.id, topic.title]);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, handleSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const isSelected = (optIdx: number) => selectedAnswers[currentIndex] === optIdx;

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx,
    }));
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setTimeLeft(initialTimeSeconds);
    setIsSubmitted(false);
    setScore(0);
  };

  // Scorecard Screen
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

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
          </p>

          <div className="mt-6 flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400">
                {score}/{questions.length}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mt-1">Raw Score</div>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:border-slate-800" />
            <div className="text-center">
              <div className={`text-4xl sm:text-5xl font-black ${passed ? 'text-emerald-500' : 'text-amber-500'}`}>
                {percentage}%
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mt-1">Accuracy</div>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:border-slate-800" />
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-200">
                {formatTime(initialTimeSeconds - timeLeft)}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mt-1">Time Spent</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onExitQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all"
            >
              <span>Back to Topic Notes</span>
            </button>
          </div>
        </div>

        {/* Detailed Solutions Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Detailed Solutions & Explanations</h3>
            <p className="text-xs text-slate-500">Review every question to solidify concepts.</p>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const userPick = selectedAnswers[idx];
              const isCorrect = userPick === q.correct_option;
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
                    <div className="flex items-center space-x-2 font-bold text-sm text-slate-900 dark:text-white">
                      <span>Q{idx + 1}.</span>
                      <span>{q.question}</span>
                    </div>
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

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userPick === optIdx;
                      const isCorrectChoice = q.correct_option === optIdx;
                      let optionClasses = 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400';

                      if (isCorrectChoice) {
                        optionClasses = 'border-emerald-500 bg-emerald-100/50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold';
                      } else if (isUserChoice) {
                        optionClasses = 'border-red-500 bg-red-100/50 dark:bg-red-950/50 text-red-900 dark:text-red-200';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {isCorrectChoice && <span className="text-[10px] uppercase font-bold text-emerald-600">Correct Answer</span>}
                          {isUserChoice && !isCorrectChoice && <span className="text-[10px] uppercase font-bold text-red-600">Your Choice</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">Explanation:</span>
                    {q.explanation}
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
      {/* Quiz Top Bar with Countdown Timer */}
      <div className="p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm flex items-center justify-between">
        <button
          onClick={onExitQuiz}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Notes</span>
        </button>

        {/* Timer */}
        <div
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
            timeLeft < 60
              ? 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-600 animate-pulse'
              : 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)} Remaining</span>
        </div>

        {/* Progress label */}
        <div className="text-xs font-semibold text-slate-500">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden -mt-2">
        <div
          className="h-full bg-blue-600 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm space-y-8 animate-in fade-in duration-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Question {currentIndex + 1}
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, optIdx) => {
            const active = isSelected(optIdx);
            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                  active
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                      active
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

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

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/25 transition-all"
            >
              <span>Submit Final Answers</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Palette */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131c31] shadow-sm flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-500">Question Palette:</span>
        <div className="flex items-center space-x-2">
          {questions.map((_, qIdx) => {
            const answered = selectedAnswers[qIdx] !== undefined;
            const isCurrent = currentIndex === qIdx;
            return (
              <button
                key={qIdx}
                onClick={() => setCurrentIndex(qIdx)}
                className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'ring-2 ring-blue-500 bg-blue-600 text-white'
                    : answered
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {qIdx + 1}
              </button>
            );
          })}
        </div>
        <div className="text-[11px] text-slate-400 flex items-center space-x-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Auto-submits when timer hits zero</span>
        </div>
      </div>
    </div>
  );
}
