import type { ReactNode } from "react";


export type LiveQuizStat = {
  id: string;
  label: string;
  value: string;
  icon: 'quizzes' | 'participation' | 'score' | 'questions';
};

export type RecentQuiz = {
  id: string;
  title: string;
  date: string;
  participants: number;
  avg: number;
};

export type QuickLaunchTemplateType =
  | 'differentiation'
  | 'integration'
  | 'probability';

export type QuickLaunchTemplate = {
  id: string;
  title: string;
  questions: number;
  minutes: number;
  type: QuickLaunchTemplateType;
};

export type QuizDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export type PastQuiz = {
  [x: string]: ReactNode;
  id: string;
  title: string;
  difficulty: QuizDifficulty;
  className: string;
  date: string;
  questions: number;
  minutes: number;
  participants: number;
  avgScore: number;
};

export type LiveQuizSelectOption = {
  id: string;
  label: string;
  value: string;
};

export type DifficultyOption = {
  id: string;
  label: QuizDifficulty;
  selected?: boolean;
};

export type QuizSummary = {
  questions: number;
  difficulty: QuizDifficulty;
  timePerQuestion: string;
  totalTime: string;
};

export type ToggleSetting = {
  title: string;
  description: string;
  enabled: boolean;
};

export const liveQuizStats: LiveQuizStat[] = [
  {
    id: 'quizzes-month',
    label: 'Quizzes This Month',
    value: '12',
    icon: 'quizzes',
  },
  {
    id: 'avg-participation',
    label: 'Avg Participation',
    value: '92%',
    icon: 'participation',
  },
  {
    id: 'avg-score',
    label: 'Avg Score',
    value: '75%',
    icon: 'score',
  },
  {
    id: 'questions-asked',
    label: 'Questions Asked',
    value: '148',
    icon: 'questions',
  },
];

export const recentQuizzes: RecentQuiz[] = [
  {
    id: 'recent-probability',
    title: 'Probability Basics',
    date: 'Dec 15, 2025',
    participants: 22,
    avg: 78,
  },
  {
    id: 'recent-integration',
    title: 'Integration Review',
    date: 'Dec 12, 2025',
    participants: 24,
    avg: 65,
  },
  {
    id: 'recent-functions',
    title: 'Functions Quiz',
    date: 'Dec 8, 2025',
    participants: 20,
    avg: 82,
  },
];

export const quickLaunchTemplates: QuickLaunchTemplate[] = [
  {
    id: 'template-differentiation',
    title: 'Differentiation Quiz',
    questions: 10,
    minutes: 15,
    type: 'differentiation',
  },
  {
    id: 'template-integration',
    title: 'Integration Review',
    questions: 8,
    minutes: 12,
    type: 'integration',
  },
  {
    id: 'template-probability',
    title: 'Probability Challenge',
    questions: 12,
    minutes: 18,
    type: 'probability',
  },
];

export const pastQuizzes: PastQuiz[] = [
  {
    id: 'past-probability',
    title: 'Probability Basics',
    difficulty: 'Medium',
    className: 'Year 12 Methods',
    date: 'Jan 15, 2025',
    questions: 10,
    minutes: 15,
    participants: 22,
    avgScore: 78,
  },
  {
    id: 'past-integration',
    title: 'Integration Review',
    difficulty: 'Hard',
    className: 'Year 12 Methods',
    date: 'Jan 12, 2025',
    questions: 8,
    minutes: 12,
    participants: 24,
    avgScore: 65,
  },
  {
    id: 'past-functions',
    title: 'Functions Quiz',
    difficulty: 'Easy',
    className: 'Year 11 Methods',
    date: 'Jan 8, 2025',
    questions: 10,
    minutes: 15,
    participants: 20,
    avgScore: 82,
  },
  {
    id: 'past-logarithms',
    title: 'Logarithms Practice',
    difficulty: 'Medium',
    className: 'Year 12 Methods',
    date: 'Jan 5, 2025',
    questions: 12,
    minutes: 18,
    participants: 22,
    avgScore: 71,
  },
  {
    id: 'past-circular',
    title: 'Circular Functions',
    difficulty: 'Mixed',
    className: 'Year 11 Methods',
    date: 'Jan 2, 2025',
    questions: 10,
    minutes: 15,
    participants: 19,
    avgScore: 68,
  },
  {
    id: 'past-chain-rule',
    title: 'Chain Rule Mastery',
    difficulty: 'Hard',
    className: 'Year 12 Methods',
    date: 'Dec 18, 2024',
    questions: 8,
    minutes: 12,
    participants: 23,
    avgScore: 73,
  },
  {
    id: 'past-statistics',
    title: 'Statistics Fundamentals',
    difficulty: 'Easy',
    className: 'Year 11 Methods',
    date: 'Dec 15, 2024',
    questions: 10,
    minutes: 15,
    participants: 21,
    avgScore: 85,
  },
  {
    id: 'past-exam-practice',
    title: 'Exam Practice Quiz',
    difficulty: 'Mixed',
    className: 'Year 12 Methods',
    date: 'Dec 12, 2024',
    questions: 15,
    minutes: 22,
    participants: 24,
    avgScore: 69,
  },
];

export const classOptions: LiveQuizSelectOption[] = [
  {
    id: 'class-placeholder',
    label: 'Choose a class',
    value: '',
  },
];

export const topicOptions: LiveQuizSelectOption[] = [
  {
    id: 'topic-placeholder',
    label: 'Choose a topic',
    value: '',
  },
];

export const questionCountOptions: LiveQuizSelectOption[] = [
  {
    id: 'questions-10',
    label: '10 questions',
    value: '10 questions',
  },
];

export const timerOptions: LiveQuizSelectOption[] = [
  {
    id: 'timer-90',
    label: '90 seconds',
    value: '90 seconds',
  },
];

export const difficultyOptions: DifficultyOption[] = [
  { id: 'difficulty-easy', label: 'Easy' },
  { id: 'difficulty-medium', label: 'Medium' },
  { id: 'difficulty-hard', label: 'Hard' },
  { id: 'difficulty-mixed', label: 'Mixed', selected: true },
];

export const reasoningToggle: ToggleSetting = {
  title: 'Enable Reasoning-Based Questions',
  description: 'Include questions that require students to explain their thinking',
  enabled: true,
};

export const quizSummary: QuizSummary = {
  questions: 10,
  difficulty: 'Mixed',
  timePerQuestion: '90s',
  totalTime: '~15 min',
};
