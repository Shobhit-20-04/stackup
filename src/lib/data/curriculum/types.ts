export interface Question {
  id: string;
  question: string;
  options: string[];
  correct_option: number; // 0-based
  explanation: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  notesMarkdown: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  companyTags?: string[];
  keyTakeaways?: string[];
  youtube_url: string;
  questions: Question[];
}

export interface SectionCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: 'BookOpen' | 'Cpu' | 'Database' | 'Network' | 'Code2' | 'Server' | 'GitBranch' | 'Terminal' | 'Layers';
  topics: Topic[];
}

export interface CurriculumSection {
  name: string;
  slug: string;
  description: string;
  categories: SectionCategory[];
}
