'use client';

import React from 'react';
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Area, 
  AreaChart 
} from 'recharts';

export interface QuizAttemptItem {
  id: string;
  topic: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  rawDate: string;
}

interface QuizScoreChartProps {
  quizHistory: QuizAttemptItem[];
}

export default function QuizScoreChart({ quizHistory }: QuizScoreChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={quizHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2B4D" opacity={0.6} />
          <XAxis dataKey="date" stroke="#8E9FC8" fontSize={12} tickLine={false} />
          <YAxis domain={[0, 100]} stroke="#8E9FC8" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#151D35',
              borderColor: '#1E2B4D',
              borderRadius: '0.75rem',
              color: '#E8EEFF',
              fontSize: '0.75rem',
            }}
            formatter={(value: unknown) => [`${value}%`, 'Score']}
            labelFormatter={(_label, payload) => {
              if (payload && payload[0]) {
                return `${payload[0].payload.topic} (${payload[0].payload.date})`;
              }
              return '';
            }}
          />
          <Area
            type="monotone"
            dataKey="percentage"
            stroke="#8B5CF6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#scoreGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
