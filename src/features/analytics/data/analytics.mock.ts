
export type AnalyticsStat = {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  icon: 'questions' | 'classAverage' | 'stateAverage' | 'activeStudents';
};

export type LearningProfileItem = {
  id: string;
  label: string;
  score: number;
};

export type CommandWordItem = {
  id: string;
  label: string;
  percent: number;
  attempts: number;
  tone: 'green' | 'orange' | 'red';
};

export type TopicPerformanceRow = {
  id: string;
  topic: string;
  attempts: number;
  classAvg: number;
  stateAvg: number;
  vsState: number;
  trend: number;
};

export const analyticsStats: AnalyticsStat[] = [
  {
    id: 'total-questions',
    label: 'Total Questions',
    value: '1,847',
    subtitle: '+12%, from last month',
    icon: 'questions',
  },
  {
    id: 'class-average',
    label: 'Class Average',
    value: '72%',
    subtitle: '+3%, improvement',
    icon: 'classAverage',
  },
  {
    id: 'state-average',
    label: 'State Average',
    value: '71%',
    subtitle: 'VCE Methods 2024',
    icon: 'stateAverage',
  },
  {
    id: 'active-students',
    label: 'Active Students',
    value: '68',
    subtitle: 'of 72 enrolled',
    icon: 'activeStudents',
  },
];

export const learningProfile: LearningProfileItem[] = [
  {
    id: 'english',
    label: 'English',
    score: 75,
  },
  {
    id: 'methods',
    label: 'Methods',
    score: 85,
  },
  {
    id: 'specialist',
    label: 'Specialist',
    score: 70,
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    score: 80,
  },
  {
    id: 'biology',
    label: 'Biology',
    score: 65,
  },
  {
    id: 'physics',
    label: 'Physics',
    score: 92,
  },
];

export const commandWordAnalysis: CommandWordItem[] = [
  {
    id: 'calculate',
    label: 'Calculate',
    percent: 82,
    attempts: 456,
    tone: 'green',
  },
  {
    id: 'explain',
    label: 'Explain',
    percent: 58,
    attempts: 312,
    tone: 'orange',
  },
  {
    id: 'sketch',
    label: 'Sketch',
    percent: 71,
    attempts: 189,
    tone: 'green',
  },
  {
    id: 'state',
    label: 'State',
    percent: 88,
    attempts: 278,
    tone: 'green',
  },
  {
    id: 'justify',
    label: 'Justify',
    percent: 45,
    attempts: 234,
    tone: 'red',
  },
  {
    id: 'determine',
    label: 'Determine',
    percent: 65,
    attempts: 345,
    tone: 'orange',
  },
];

export const insightCallout =
  'Students struggle most with Justify and Explain questions';

export const topicPerformance: TopicPerformanceRow[] = [
  {
    id: 'differentiation-rules',
    topic: 'Differentiation Rules',
    attempts: 245,
    classAvg: 85,
    stateAvg: 78,
    vsState: 7,
    trend: 5,
  },
  {
    id: 'integration-techniques',
    topic: 'Integration Techniques',
    attempts: 189,
    classAvg: 62,
    stateAvg: 71,
    vsState: -9,
    trend: -3,
  },
];
