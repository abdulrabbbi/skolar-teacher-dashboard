export type TaskCompilerStat = {
  id: string;
  label: string;
  value: string | number;
  subtitle: string;
  icon: 'pending' | 'moderation' | 'agreement' | 'confidence';
  color: 'blue' | 'orange' | 'green' | 'purple';
};

export type SubjectCardColor = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

export type SubjectCardIcon = 'sigma' | 'leaf' | 'flask' | 'infinity' | 'pen';

export type SubjectCard = {
  id: string;
  title: string;
  unitsCompleted: number;
  unitsTotal: number;
  color: SubjectCardColor;
  icon: SubjectCardIcon;
};

export type AreaOfStudyItem = {
  id: string;
  unit: string;
  title: string;
  description: string;
};

export const taskCompilerCopy = {
  pageTitle: 'Task Compiler',
  subjectSelectionTitle: 'Select Your subject',
  subjectSelectionSubtitle: 'Choose a subject to generate aligned content',
  areaSelectionSubtitle: 'Select an Area of Study',
  backToSubjects: 'Back to Subjects',
  unitsLabel: 'Units',
};

export const taskCompilerStats: TaskCompilerStat[] = [
  {
    id: 'pending',
    label: 'Pending',
    value: 3,
    subtitle: 'awaiting marking',
    icon: 'pending',
    color: 'blue',
  },
  {
    id: 'moderation',
    label: 'Moderation',
    value: 1,
    subtitle: 'needs review',
    icon: 'moderation',
    color: 'orange',
  },
  {
    id: 'agreement',
    label: 'Marker Agreement',
    value: '87%',
    subtitle: 'this assessment',
    icon: 'agreement',
    color: 'green',
  },
  {
    id: 'confidence',
    label: 'Avg Skolar Confidence',
    value: '74%',
    subtitle: 'across submission',
    icon: 'confidence',
    color: 'purple',
  },
];

export const subjectCards: SubjectCard[] = [
  {
    id: 'methods',
    title: 'Mathematical Methods',
    unitsCompleted: 3,
    unitsTotal: 4,
    color: 'blue',
    icon: 'sigma',
  },
  {
    id: 'biology',
    title: 'Biology',
    unitsCompleted: 3,
    unitsTotal: 4,
    color: 'green',
    icon: 'leaf',
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    unitsCompleted: 3,
    unitsTotal: 4,
    color: 'purple',
    icon: 'flask',
  },
  {
    id: 'specialist',
    title: 'Specialist Mathematics',
    unitsCompleted: 3,
    unitsTotal: 4,
    color: 'orange',
    icon: 'infinity',
  },
  {
    id: 'english',
    title: 'English',
    unitsCompleted: 3,
    unitsTotal: 4,
    color: 'pink',
    icon: 'pen',
  },
];

export const areaOfStudyItems: AreaOfStudyItem[] = [
  {
    id: 'methods-unit-3-aos-1',
    unit: 'Unit 3',
    title: 'Area of Study 1 - Functions and graphs',
    description: 'Circular functions and their applications',
  },
  {
    id: 'methods-unit-3-aos-2',
    unit: 'Unit 3',
    title: 'Area of Study 2 - Algebra',
    description: 'Exponentials and logarithms',
  },
  {
    id: 'methods-unit-4-aos-1',
    unit: 'Unit 4',
    title: 'Area of Study 1 - Calculus',
    description: 'Differentiation and integration applications',
  },
  {
    id: 'methods-unit-4-aos-2',
    unit: 'Unit 4',
    title: 'Area of Study 2 - Probability and statistics',
    description: 'Discrete and continuous random variables',
  },
];

export const subjectAreas: Record<string, AreaOfStudyItem[]> = {
  methods: areaOfStudyItems,
  biology: areaOfStudyItems,
  chemistry: areaOfStudyItems,
  specialist: areaOfStudyItems,
  english: areaOfStudyItems,
};
