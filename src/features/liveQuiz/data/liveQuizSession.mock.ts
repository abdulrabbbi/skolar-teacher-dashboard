export type AnswerOptionId = 'A' | 'B' | 'C' | 'D';

export type LiveQuizAnswerOption = {
  id: AnswerOptionId;
  text: string;
  isCorrect?: boolean;
};

export type LiveQuizAnswerDistribution = {
  id: AnswerOptionId;
  percent: number;
  students: number;
  isCorrect?: boolean;
};

export type LiveQuizMisconception = {
  id: string;
  step: string;
  percent: number;
  students: number;
};

export type LiveQuizStudent = {
  id: string;
  name: string;
  needsSupport?: boolean;
};

export type LiveQuizSession = {
  id: string;
  progress: {
    current: number;
    total: number;
  };
  timeRemaining: string;
  studentsAnswered: {
    answered: number;
    total: number;
  };
  question: {
    title: string;
    topic: string;
    text: string;
    options: LiveQuizAnswerOption[];
  };
  answerDistribution: LiveQuizAnswerDistribution[];
  misconceptions: LiveQuizMisconception[];
  studentsNotAnswered: LiveQuizStudent[];
  quickActions: string[];
};

export const liveQuizSessions: LiveQuizSession[] = [
  {
    id: 'recent-probability',
    progress: {
      current: 1,
      total: 10,
    },
    timeRemaining: '0:52',
    studentsAnswered: {
      answered: 19,
      total: 24,
    },
    question: {
      title: 'Question 1',
      topic: 'Differentiation - Chain Rule',
      text: 'Find the derivative of f(x) = (3x^2 + 2x)^5',
      options: [
        {
          id: 'A',
          text: "f'(x) = 5(3x^2 + 2x)^4(6x + 2)",
        },
        {
          id: 'B',
          text: "f'(x) = 5(3x^2 + 2x)^4(6x + 2)",
          isCorrect: true,
        },
        {
          id: 'C',
          text: "f'(x) = (3x^2 + 2x)^4(6x + 2)",
        },
        {
          id: 'D',
          text: "f'(x) = 5(3x^2 + 2x)^5(6x + 2)",
        },
      ],
    },
    answerDistribution: [
      { id: 'A', percent: 28, students: 5 },
      { id: 'B', percent: 44, students: 8, isCorrect: true },
      { id: 'C', percent: 17, students: 3 },
      { id: 'D', percent: 11, students: 3 },
    ],
    misconceptions: [
      {
        id: 'misconception-1',
        step: 'Step 2: Chain rule application',
        percent: 42,
        students: 8,
      },
      {
        id: 'misconception-2',
        step: 'Step 3: Simplification',
        percent: 25,
        students: 5,
      },
    ],
    studentsNotAnswered: [
      { id: 'student-1', name: 'Emma Wilson', needsSupport: true },
      { id: 'student-2', name: 'James Chen', needsSupport: true },
      { id: 'student-3', name: 'Sophie Taylor' },
      { id: 'student-4', name: 'Marcus Brown' },
    ],
    quickActions: [
      'Send hint to struggling students',
      'Skip question',
      'Add 30 seconds',
    ],
  },
];
