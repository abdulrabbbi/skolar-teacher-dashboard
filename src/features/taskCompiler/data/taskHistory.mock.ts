// ==============================
// TYPES
// ==============================

export type TaskHistoryStatus = 'Completed' | 'In Progress' | 'Queued';
export type TaskDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export type TaskHistoryItemData = {
  id: string;
  title: string;
  subject: string;
  code: string;
  status: TaskHistoryStatus;
  difficulty: TaskDifficulty;
  createdAt: string;
  duration: string;
  marks: string;
  students: number;
};

// ==============================
// MOCK DATA
// ==============================

export const taskHistoryItems: TaskHistoryItemData[] = [
  {
    id: 'task-001',
    title: 'Functions & Graph Transformations',
    subject: 'Year 12 Methods',
    code: 'VCEMAA365',
    status: 'Completed',
    difficulty: 'Mixed',
    createdAt: 'Feb 8, 2026',
    duration: '60 minutes',
    marks: '40 marks',
    students: 26,
  },
  {
    id: 'task-002',
    title: 'Chain Rule Practice Set',
    subject: 'Year 12 Methods',
    code: 'VCEMAA368',
    status: 'In Progress',
    difficulty: 'Hard',
    createdAt: 'Feb 6, 2026',
    duration: '45 minutes',
    marks: '30 marks',
    students: 24,
  },
  {
    id: 'task-003',
    title: 'Logarithms & Exponentials Quiz',
    subject: 'Year 12 Methods',
    code: 'VCEMAA366',
    status: 'Completed',
    difficulty: 'Medium',
    createdAt: 'Feb 4, 2026',
    duration: '30 minutes',
    marks: '20 marks',
    students: 22,
  },
  {
    id: 'task-004',
    title: 'Integration by Substitution',
    subject: 'Year 12 Methods',
    code: 'VCEMAA369',
    status: 'Queued',
    difficulty: 'Easy',
    createdAt: 'Feb 3, 2026',
    duration: '45 minutes',
    marks: '25 marks',
    students: 21,
  },
  {
    id: 'task-005',
    title: 'Probability Distributions Review',
    subject: 'Year 12 Methods',
    code: 'VCEMAA370',
    status: 'Completed',
    difficulty: 'Hard',
    createdAt: 'Feb 1, 2026',
    duration: '60 minutes',
    marks: '40 marks',
    students: 25,
  },
  {
    id: 'task-006',
    title: 'Exam Revision Pack',
    subject: 'Year 12 Methods',
    code: 'VCEMAA371',
    status: 'Completed',
    difficulty: 'Mixed',
    createdAt: 'Jan 29, 2026',
    duration: '60 minutes',
    marks: '50 marks',
    students: 27,
  },
];
