export type LearningModule = 'dsa' | 'core-cs' | 'aptitude';

export type DSAMistakeType = 
  | 'wrong_answer'
  | 'time_limit_exceeded'
  | 'runtime_error'
  | 'memory_limit_exceeded'
  | 'edge_case'
  | 'off_by_one'
  | 'algorithmic_choice';

export type ConceptualMistakeType =
  | 'conceptual'
  | 'calculation'
  | 'formula_forgotten'
  | 'time_management'
  | 'misread_question';

export type MistakeType = DSAMistakeType | ConceptualMistakeType | string;

export interface MistakeEntry {
  id: string;
  userId: string;
  module: LearningModule;
  resourceId: string; // Problem id (e.g. 'two-sum') or Topic slug (e.g. 'virtual-memory')
  resourceTitle: string;
  category: string; // e.g. 'Arrays & Hashing', 'Operating Systems'
  mistakeType: MistakeType;
  userNotes: string;
  keyTakeaway: string;
  codeSnippet?: string;
  isResolved?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * SuperMemo SM-2 Rating Scale:
 * 1 = Blackout / Complete failure ("Again" -> reset interval to 1 day)
 * 2 = Hard / Remembered with severe effort ("Hard" -> smaller interval increase)
 * 3 = Difficult but acceptable recall
 * 4 = Good / Hesitant recall ("Good" -> normal SM-2 interval increase)
 * 5 = Easy / Perfect recall ("Easy" -> bonus interval multiplier)
 */
export type SM2Rating = 1 | 2 | 3 | 4 | 5;

export interface RevisionItem {
  id: string;
  userId: string;
  mistakeId?: string;
  module: LearningModule;
  resourceId: string;
  title: string;
  subtitle: string;
  repetitionCount: number;
  intervalDays: number;
  easeFactor: number; // Defaults to 2.5
  dueDate: string; // ISO 8601 date string
  lastReviewedAt?: string;
  lastRating?: SM2Rating;
}

export type RevisionBucket = 'overdue' | 'due_today' | 'upcoming' | 'recently_reviewed';

export type WeakTopicStatus = 
  | 'needs_attention'
  | 'revisit_recommended'
  | 'improving'
  | 'consistently_well'
  | 'insufficient_activity';

export interface WeakTopicInsight {
  topicName: string;
  module: LearningModule;
  failureCount: number;
  totalAttempts: number;
  accuracyPercentage: number;
  masteryLevel: 'critical' | 'developing' | 'proficient' | 'mastered';
  status: WeakTopicStatus;
  supportingDataText: string;
  reason: string;
  actionUrl: string;
}

export type RecommendationType = 
  | 'spaced_revision' 
  | 'mistake_revisit' 
  | 'weak_topic_boost' 
  | 'curriculum_step';

export interface DailyRecommendation {
  id: string;
  type: RecommendationType;
  resourceId: string;
  title: string;
  description: string;
  module: LearningModule;
  url: string;
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  badge: string;
  supportingActivityRef: string;
  createdAt: string;
  isDismissed?: boolean;
}

export interface LearningHistoryMetrics {
  reviewsCompletedCount: number;
  mistakesResolvedCount: number;
  previouslyFailedNowSolvedCount: number;
  revisionConsistencyStreak: number;
}

export interface LearningIntelligenceSummary {
  totalMistakesLogged: number;
  dueRevisionsCount: number;
  overdueCount: number;
  upcomingCount: number;
  recentlyReviewedCount: number;
  masteredTopicsCount: number;
  retentionScore: number; // 0-100 percentage based on SM-2 ease and successful recalls
  dueRevisions: RevisionItem[];
  overdueRevisions: RevisionItem[];
  upcomingRevisions: RevisionItem[];
  recentlyReviewedRevisions: RevisionItem[];
  recentMistakes: MistakeEntry[];
  weakTopics: WeakTopicInsight[];
  dailyRecommendations: DailyRecommendation[];
  historyMetrics: LearningHistoryMetrics;
}
