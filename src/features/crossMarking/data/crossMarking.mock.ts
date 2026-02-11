// ==============================
// TYPES
// ==============================

export type CrossMarkingStat = {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  icon: 'pending' | 'moderation' | 'agreement' | 'confidence';
  color: 'blue' | 'orange' | 'green' | 'purple';
};

export type ModerationAlertData = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export type CrossMarkingDeadlineItem = {
  id: string;
  title: string;
  date: string;
};

export type CrossMarkingActivityItem = {
  id: string;
  label: string;
  value: string;
};

export type CrossMarkingStatusItem = {
  id: string;
  label: string;
  value: string;
};

export type SubmissionStatus = 'Pending' | 'Moderation' | 'Marked';
export type SubmissionAction = 'Mark' | 'Review';

export type SubmissionRow = {
  id: string;
  index: string;
  assessment: string;
  submitted: string;
  skolarMark: string;
  confidence: number;
  status: SubmissionStatus;
  finalMark: string;
  action: SubmissionAction;
};

export type StudentResponseItem = {
  id: string;
  question: string;
  marks: number;
  response: string;
};

export type SkolarSolution = {
  type: 'simple' | 'worked';
  answer: string;
  working?: string[];
};

export type QuestionMarkingItem = {
  id: string;
  question: string;
  maxMarks: number;
  skolarScore: number;
  editableScore: number;
  skolarSolution: SkolarSolution;
};

export type CriteriaMarkItem = {
  id: string;
  label: string;
  score: number;
  maxScore: number;
};

export type SubmissionDetailData = {
  id: string;
  assessment: string;
  preMarkScore: number;
  preMarkMax: number;
  confidence: number;
  studentResponses: StudentResponseItem[];
  questionMarking: QuestionMarkingItem[];
  criteriaMarks: CriteriaMarkItem[];
  totalScore: number;
  totalMax: number;
};

// ==============================
// TOP STATS
// ==============================

export const crossMarkingStats: CrossMarkingStat[] = [
  {
    id: 'pending',
    label: 'Pending',
    value: '3',
    subtitle: 'awaiting marking',
    icon: 'pending',
    color: 'blue',
  },
  {
    id: 'moderation',
    label: 'Moderation',
    value: '1',
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
    label: 'Avg SKOLAR Confidence',
    value: '74%',
    subtitle: 'across submission',
    icon: 'confidence',
    color: 'purple',
  },
];

// ==============================
// MODERATION ALERT
// ==============================

export const moderationAlert: ModerationAlertData = {
  title: '1 submission requires moderation',
  subtitle: 'Marker disagreement detected — review needed',
  buttonLabel: 'Open Moderation Room',
};

// ==============================
// SUBMISSIONS TABLE
// ==============================

export const submissions: SubmissionRow[] = [
  {
    id: 'submission-1',
    index: '#1',
    assessment: 'SAC 2: Calculus',
    submitted: '2 hours ago',
    skolarMark: '32 / 40',
    confidence: 85,
    status: 'Pending',
    finalMark: '32 / 40',
    action: 'Mark',
  },
  {
    id: 'submission-2',
    index: '#2',
    assessment: 'SAC 2: Calculus',
    submitted: '3 hours ago',
    skolarMark: '28 / 40',
    confidence: 72,
    status: 'Pending',
    finalMark: '28 / 40',
    action: 'Mark',
  },
  {
    id: 'submission-3',
    index: '#3',
    assessment: 'SAC 2: Calculus',
    submitted: '4 hours ago',
    skolarMark: '26 / 40',
    confidence: 68,
    status: 'Moderation',
    finalMark: '26 / 40',
    action: 'Mark',
  },
  {
    id: 'submission-4',
    index: '#4',
    assessment: 'SAC 2: Calculus',
    submitted: '1 day ago',
    skolarMark: '35 / 40',
    confidence: 90,
    status: 'Marked',
    finalMark: '35 / 40',
    action: 'Review',
  },
  {
    id: 'submission-5',
    index: '#5',
    assessment: 'SAC 2: Calculus',
    submitted: '1 day ago',
    skolarMark: '22 / 40',
    confidence: 55,
    status: 'Pending',
    finalMark: '22 / 40',
    action: 'Mark',
  },
];

// ==============================
// STUDENT RESPONSES (PER SUBMISSION)
// ==============================

const studentResponsesMap: Record<string, StudentResponseItem[]> = {
  'submission-1': [
    {
      id: 's1-q1',
      question: 'Question 1',
      marks: 5,
      response: 'Correct derivative using power rule.',
    },
    {
      id: 's1-q2',
      question: 'Question 2',
      marks: 8,
      response: 'Chain rule applied correctly.',
    },
  ],

  'submission-2': [
    {
      id: 's2-q1',
      question: 'Question 1',
      marks: 3,
      response: 'Missed constant term in differentiation.',
    },
    {
      id: 's2-q2',
      question: 'Question 2',
      marks: 6,
      response: 'Correct idea but algebra mistake.',
    },
  ],

  'submission-3': [
    {
      id: 's3-q1',
      question: 'Question 1',
      marks: 4,
      response: 'Minor sign error.',
    },
  ],

  'submission-4': [
    {
      id: 's4-q1',
      question: 'Question 1',
      marks: 5,
      response: 'Perfect solution with clear working.',
    },
  ],

  'submission-5': [
    {
      id: 's5-q1',
      question: 'Question 1',
      marks: 2,
      response: 'Incorrect differentiation rule used.',
    },
  ],
};

export const questionMarking: QuestionMarkingItem[] = [
  {
    id: 'qm-1',
    question: 'Differentiate f(x) = x³ + 2x² − 5x + 1',
    maxMarks: 5,
    skolarScore: 4,
    editableScore: 4,
    skolarSolution: {
      type: 'simple',
      answer: "f'(x) = 3x² + 4x − 5",
    },
  },

  {
    id: 'qm-2',
    question: 'Use the chain rule to differentiate g(x) = (2x² + 3x)⁵',
    maxMarks: 8,
    skolarScore: 7,
    editableScore: 7,
    skolarSolution: {
      type: 'worked',
      answer: "g'(x) = 5(2x² + 3x)⁴ (4x + 3)",
      working: [
        'Let u = 2x² + 3x',
        'Then g(x) = u⁵',
        'du/dx = 4x + 3',
        'By chain rule:',
        'dg/dx = dg/du × du/dx',
        "g'(x) = 5u⁴ × (4x + 3)",
        "g'(x) = 5(2x² + 3x)⁴ (4x + 3)",
      ],
    },
  },

  {
    id: 'qm-3',
    question: 'Evaluate ∫₀² (3x² + 2x) dx',
    maxMarks: 6,
    skolarScore: 6,
    editableScore: 6,
    skolarSolution: {
      type: 'worked',
      answer: '12',
      working: [
        '∫ (3x² + 2x) dx = x³ + x²',
        '[x³ + x²]₀²',
        '(2³ + 2²) − (0³ + 0²)',
        '= 8 + 4',
        '= 12',
      ],
    },
  },
];


// ==============================
// CRITERIA MARKING (SHARED)
// ==============================

const criteriaMarks: CriteriaMarkItem[] = [
  { id: 'c1', label: 'Process & Method', score: 12, maxScore: 15 },
  { id: 'c2', label: 'Accuracy', score: 8, maxScore: 10 },
  { id: 'c3', label: 'Justification', score: 7, maxScore: 10 },
  { id: 'c4', label: 'Communication', score: 5, maxScore: 5 },
];

// ==============================
// TOTAL SCORE MAP
// ==============================

const totalScoreMap: Record<string, number> = {
  'submission-1': 32,
  'submission-2': 28,
  'submission-3': 26,
  'submission-4': 35,
  'submission-5': 22,
};

// ==============================
// SUBMISSION DETAILS (✅ FIXED)
// ==============================

export const submissionDetails: SubmissionDetailData[] = submissions.map(
  (submission) => ({
    id: submission.id,
    assessment: submission.assessment,
    preMarkScore: totalScoreMap[submission.id],
    preMarkMax: 40,
    confidence: submission.confidence,
    studentResponses: studentResponsesMap[submission.id] ?? [],
    questionMarking,
    criteriaMarks,
    totalScore: totalScoreMap[submission.id],
    totalMax: 40,
  })
);


export const crossMarkingSummary = {
  performance: {
    avgConfidence: 74,
    highConfidence: 2,
    lowConfidence: 1,
  },
  progress: {
    completed: 1,
    inProgress: 0,
    remaining: 4,
    total: 5,
  },
  agreement: {
    markerAgreement: 87,
    aiHumanAgreement: 82,
    disputes: 1,
  },
};


// ==============================
// FEEDBACK
// ==============================
 
export const feedbackPlaceholder = 'Add personalised feedback...';
