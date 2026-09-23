export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          order_index?: number;
          created_at?: string;
        };
      };
      topics: {
        Row: {
          id: string;
          section_id: string;
          title: string;
          slug: string;
          notes_markdown: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          section_id: string;
          title: string;
          slug: string;
          notes_markdown?: string;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          section_id?: string;
          title?: string;
          slug?: string;
          notes_markdown?: string;
          order_index?: number;
          created_at?: string;
        };
      };
      quiz_questions: {
        Row: {
          id: string;
          topic_id: string;
          question: string;
          options: Json;
          correct_option: number;
          explanation: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          topic_id: string;
          question: string;
          options: Json;
          correct_option: number;
          explanation?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          topic_id?: string;
          question?: string;
          options?: Json;
          correct_option?: number;
          explanation?: string | null;
          created_at?: string;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          score: number;
          total: number;
          attempted_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic_id: string;
          score: number;
          total: number;
          attempted_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic_id?: string;
          score?: number;
          total?: number;
          attempted_at?: string;
        };
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          section_id: string;
          percent_complete: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          section_id: string;
          percent_complete?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          section_id?: string;
          percent_complete?: number;
          updated_at?: string;
        };
      };
      dsa_problems: {
        Row: {
          id: string;
          title: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          pattern_tag: string;
          leetcode_url: string | null;
          striver_url: string | null;
          youtube_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          pattern_tag: string;
          leetcode_url?: string | null;
          striver_url?: string | null;
          youtube_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          pattern_tag?: string;
          leetcode_url?: string | null;
          striver_url?: string | null;
          youtube_url?: string | null;
          created_at?: string;
        };
      };
      resume_analyses: {
        Row: {
          id: string;
          user_id: string;
          filename: string;
          ats_score: number;
          feedback: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          filename: string;
          ats_score: number;
          feedback: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          filename?: string;
          ats_score?: number;
          feedback?: Json;
          created_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'user' | 'assistant' | 'system';
          content?: string;
          created_at?: string;
        };
      };
    };
  };
}
