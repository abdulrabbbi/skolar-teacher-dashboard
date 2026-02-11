
export type DashboardGreeting = {
  title: string;
  subtitle?: string;
};

export type PulseStat = {
  id: string;
  label: string;
  value: string;
  subtitle?: string;
  icon: 'students' | 'onTrack' | 'atRisk' | 'accuracy';
};

export type ClassOverviewItem = {
  id: string;
  name: string;
  total: number;
  onTrack: number;
  atRisk: number;
};

export type TopicPerformanceItem = {
  id: string;
  topic: string;
  percent: number;
  tags?: string[]; // ✅ REQUIRED FOR SUBJECT PILLS
};

export type AlertInsightItem = {
  id: string;
  message: string;
  tone: 'alert' | 'insight' | 'reminder' | 'support';
};

export type QuickActionItem = {
  id: string;
  title: string;
  description: string;
  icon: 'quiz' | 'compiler' | 'crossMarking' | 'analytics';
};


export type UpcomingAssessmentItem = {
  id: string;
  title: string;
  date: string;
  marked: number;
  total: number;
  average: number;
};

export const dashboardGreeting: DashboardGreeting = {
  title: 'Hi, John ',
  subtitle: 'Here is your classroom snapshot for today.',
};

export const classroomPulseStats: PulseStat[] = [
  {
    id: 'total-students',
    label: 'Total Students',
    value: '68',
    icon: 'students',
  },
  {
    id: 'on-track',
    label: 'On Track',
    value: '54',
    subtitle: '79% of class',
    icon: 'onTrack',
  },
  {
    id: 'at-risk',
    label: 'At Risk',
    value: '14',
    subtitle: 'Needs suport',
    icon: 'atRisk',
  },
  {
    id: 'avg-accuracy',
    label: 'Avg. Accuracy',
    value: '77%',
    subtitle: 'Across all topics',
    icon: 'accuracy',
  },
];

export const classesOverview: ClassOverviewItem[] = [
  {
    id: 'year-12-methods',
    name: 'Year 12 Methods',
    total: 24,
    onTrack: 18,
    atRisk: 6,
  },
  {
    id: 'year-11-methods',
    name: 'Year 11 Methods',
    total: 28,
    onTrack: 22,
    atRisk: 6,
  },
  {
    id: 'year-12-specialist',
    name: 'Year 12 Specialist',
    total: 16,
    onTrack: 14,
    atRisk: 2,
  },
];

export const topicPerformance: TopicPerformanceItem[] = [
  {
    id: 'differentiation-rules',
    topic: 'Differentiation Rules',
    percent: 85,
    tags: ['Calculus'],
  },
  {
    id: 'integration-techniques',
    topic: 'Integration Techniques',
    percent: 62,
    tags: ['Calculus'],
  },
  {
    id: 'chain-rule-applications',
    topic: 'Chain Rule Applications',
    percent: 45,
    tags: ['Calculus'],
  },
  {
    id: 'probability-distributions',
    topic: 'Probability Distributions',
    percent: 78,
    tags: ['Probability'],
  },
  {
    id: 'binomial-distribution',
    topic: 'Binomial Distribution',
    percent: 71,
    tags: ['Probability'],
  },
  {
    id: 'functions-relations',
    topic: 'Functions & Relations',
    percent: 88,
    tags: ['Functions'],
  },
];

export const alertsInsights: AlertInsightItem[] = [
  {
    id: 'justification-marks',
    message: '38% of Year 12 Methods are losing marks on justification steps',
    tone: 'alert',
  },
  {
    id: 'confidence-mismatch',
    message: '5 students showing confidence-accuracy mismatch',
    tone: 'insight',
  },
  {
    id: 'sac-deadline',
    message: 'SAC 2 marking deadline in 3 days',
    tone: 'reminder',
  },
  {
    id: 'chain-rule-support',
    message: 'Chain Rule topic needs additional support',
    tone: 'support',
  },
];

export const quickActions: QuickActionItem[] = [
  {
    id: 'launch-quiz',
    title: 'Launch Quiz',
    description: 'Start a live session',
    icon: 'quiz',
  },
  {
    id: 'task-compiler',
    title: 'Task Compiler',
    description: 'Generate worksheets',
    icon: 'compiler',
  },
  {
    id: 'cross-marking',
    title: 'Cross-Marking',
    description: 'Collaborative assessment',
    icon: 'crossMarking',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Deep dive into data',
    icon: 'analytics',
  },
];


export const upcomingAssessments: UpcomingAssessmentItem[] = [
  {
    id: 'sac-2-calculus',
    title: 'SAC 2: Calculus',
    date: 'Dec 20, 2025',
    marked: 18,
    total: 24,
    average: 65,
  },
  {
    id: 'topic-test-probability',
    title: 'Topic Test: Probability',
    date: 'Dec 22, 2025',
    marked: 0,
    total: 28,
    average: 82,
  },
  {
    id: 'practice-exam-1',
    title: 'Practice Exam 1',
    date: 'Jan 15, 2026',
    marked: 0,
    total: 16,
    average: 45,
  },
];
