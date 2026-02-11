
export type ClassSummary = {
  id: string;
  title: string;
  students: number;
  subject: string;
  avgScore: number;
};

export const classes: ClassSummary[] = [
  {
    id: 'year-12-methods',
    title: 'Year 12 Methods',
    students: 24,
    subject: 'Mathematical Methods',
    avgScore: 56,
  },
  {
    id: 'year-11-methods',
    title: 'Year 11 Methods',
    students: 28,
    subject: 'Mathematical Methods',
    avgScore: 78,
  },
  {
    id: 'year-12-specialist',
    title: 'Year 12 Specialist',
    students: 16,
    subject: 'Specialist Mathematical',
    avgScore: 82,
  },
];
