// src/features/assessments/data/assessments.mock.ts

export type AssessmentStat = {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  icon: 'marking' | 'active' | 'week' | 'average';
  color: 'red' | 'green' | 'orange' | 'purple';
};

export type MarkingQueueItem = {
  id: string;
  title: string;
  className: string;
  pending: number;
  submissions: string;
};

export type AssessmentStatus = 'Marking' | 'Active' | 'Draft' | 'Complete';

export type AssessmentRow = {
  id: string;
  title: string;
  type: string;
  className: string;
  dueDate: string;
  status: AssessmentStatus;
  submissions: string;
  marked: string;
  avgScore: string;
};

export type DeadlineItem = {
  id: string;
  title: string;
  date: string;
};

export type ActivityItem = {
  id: string;
  value: string;
  label: string;
};

export type AssessmentTypeItem = {
  id: string;
  label: string;
  value: number;
};

export type AssessmentSelectOption = {
  id: string;
  label: string;
  value: string;
};

/* =======================
   ASSESSMENT STATS
======================= */

export const assessmentStats: AssessmentStat[] = [
  {
    id: 'needs-marking',
    label: 'Needs Marking',
    value: '29',
    subtitle: 'Submissions pending',
    icon: 'marking',
    color: 'red',
  },
  {
    id: 'active',
    label: 'Active',
    value: '2',
    subtitle: 'Assessments running',
    icon: 'active',
    color: 'green',
  },
  {
    id: 'this-week',
    label: 'This Week',
    value: '2',
    subtitle: 'Deadlines approaching',
    icon: 'week',
    color: 'orange',
  },
  {
    id: 'avg-score',
    label: 'Avg Score',
    value: '71%',
    subtitle: 'Across all assessments',
    icon: 'average',
    color: 'purple',
  },
];

/* =======================
   MARKING QUEUE
======================= */

export const markingQueue: MarkingQueueItem[] = [
  {
    id: 'sac-2-calculus',
    title: 'SAC 2: Calculus Applications',
    className: 'Year 12 Methods',
    pending: 14,
    submissions: '8 / 22',
  },
  {
    id: 'topic-test-probability',
    title: 'Topic Test: Probability',
    className: 'Year 11 Methods',
    pending: 15,
    submissions: '0 / 15',
  },
];

/* =======================
   ASSESSMENTS TABLE
======================= */

export const assessmentsTable: AssessmentRow[] = [
  {
    id: 'sac-2-calculus-apps',
    title: 'SAC 2: Calculus Applications',
    type: 'SAC',
    className: 'Year 12 Methods',
    dueDate: 'Dec 20, 2025',
    status: 'Marking',
    submissions: '22 / 24',
    marked: '8 / 22',
    avgScore: '72%',
  },
  {
    id: 'topic-test-probability',
    title: 'Topic Test: Probability',
    type: 'Test',
    className: 'Year 11 Methods',
    dueDate: 'Dec 22, 2025',
    status: 'Active',
    submissions: '15 / 28',
    marked: '0 / 15',
    avgScore: '-',
  },
  {
    id: 'practice-exam-1',
    title: 'Practice Exam 1',
    type: 'Exam',
    className: 'Year 12 Specialist',
    dueDate: 'Jan 15, 2026',
    status: 'Draft',
    submissions: '0 / 16',
    marked: '0 / 0',
    avgScore: '-',
  },
  {
    id: 'sac-1-functions',
    title: 'SAC 1: Functions',
    type: 'SAC',
    className: 'Year 12 Methods',
    dueDate: 'Dec 20, 2025',
    status: 'Complete',
    submissions: '22 / 24',
    marked: '8 / 22',
    avgScore: '72%',
  },
];

/* =======================
   DEADLINES
======================= */

export const deadlinesThisWeek: DeadlineItem[] = [
  {
    id: 'sac-2-deadline',
    title: 'SAC 2: Calculus',
    date: 'Dec 20',
  },
  {
    id: 'topic-test-deadline',
    title: 'Topic Test: Probability',
    date: 'Dec 22',
  },
];

/* =======================
   RECENT ACTIVITY
======================= */

export const recentActivity: ActivityItem[] = [
  {
    id: 'activity-1',
    value: '18',
    label: 'new submissions',
  },
  {
    id: 'activity-2',
    value: 'Weekly Quiz',
    label: 'Integration',
  },
  {
    id: 'activity-3',
    value: '8',
    label: 'marked',
  },
  {
    id: 'activity-4',
    value: 'SAC 2',
    label: 'Calculus',
  },
];

/* =======================
   ASSESSMENT TYPES
======================= */

export const assessmentTypes: AssessmentTypeItem[] = [
  { id: 'sac', label: 'SAC', value: 2 },
  { id: 'test', label: 'Test', value: 1 },
  { id: 'exam', label: 'Exam', value: 1 },
  { id: 'practice', label: 'Practice', value: 1 },
];

export const assessmentTypeOptions: AssessmentSelectOption[] = [
  { id: 'type-sac', label: 'SAC', value: 'SAC' },
  { id: 'type-test', label: 'Test', value: 'Test' },
  { id: 'type-exam', label: 'Exam', value: 'Exam' },
  { id: 'type-practice', label: 'Practice', value: 'Practice' },
];

export const assessmentClassOptions: AssessmentSelectOption[] = [
  {
    id: 'class-year-12-methods',
    label: 'Year 12 Methods',
    value: 'Year 12 Methods',
  },
  {
    id: 'class-year-11-methods',
    label: 'Year 11 Methods',
    value: 'Year 11 Methods',
  },
  {
    id: 'class-year-12-specialist',
    label: 'Year 12 Specialist',
    value: 'Year 12 Specialist',
  },
];

export const assessmentModalDefaults = {
  type: 'SAC',
  className: 'Year 12 Methods',
};
