
export type StudentStatus = 'On Track' | 'At Risk';

export type StudentFilter = 'all' | 'onTrack' | 'atRisk' | 'accuracy';

export type ClassroomPulseStat = {
  id: string;
  label: string;
  value: string;
  subtitle?: string;
  icon: 'students' | 'onTrack' | 'atRisk' | 'accuracy';
  filterKey: StudentFilter;
};

export type StudentRow = {
  id: string;
  name: string;
  email: string;
  status: StudentStatus;
  accuracy: number;
  confidence: number;
  questions: number;
  weakTopics: string[];
  lastActive: string;
};

export const classroomPulseStats: ClassroomPulseStat[] = [
  {
    id: 'total-students',
    label: 'Total Students',
    value: '68',
    icon: 'students',
    filterKey: 'all',
  },
  {
    id: 'on-track',
    label: 'On Track',
    value: '54',
    subtitle: '79% of class',
    icon: 'onTrack',
    filterKey: 'onTrack',
  },
  {
    id: 'at-risk',
    label: 'At Risk',
    value: '14',
     subtitle: 'need support',
    icon: 'atRisk',
    filterKey: 'atRisk',
  },
  {
    id: 'avg-accuracy',
    label: 'Avg. Accuracy',
    value: '77%',
     subtitle: 'across all topics',
    icon: 'accuracy',
    filterKey: 'accuracy',
  },
];

export const students: StudentRow[] = [
  {
    id: 'student-1',
    name: 'Emma Thompson',
    email: 'emma.thompson@school.edu',
    status: 'On Track',
    accuracy: 84,
    confidence: 78,
    questions: 156,
    weakTopics: ['Chain Rule', 'Integration'],
    lastActive: '2 hours ago',
  },
  {
    id: 'student-2',
    name: 'Emma Thompson',
    email: 'emma.thompson@school.edu',
    status: 'At Risk',
    accuracy: 58,
    confidence: 45,
    questions: 89,
    weakTopics: ['Chain Rule', 'Integration'],
    lastActive: '2 hours ago',
  },
  {
    id: 'student-3',
    name: 'Emma Thompson',
    email: 'emma.thompson@school.edu',
    status: 'At Risk',
    accuracy: 48,
    confidence: 38,
    questions: 67,
    weakTopics: ['Chain Rule', 'Integration'],
    lastActive: '2 hours ago',
  },
];
