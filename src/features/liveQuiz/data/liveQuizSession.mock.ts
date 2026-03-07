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

export type LiveQuizStudentAnswer = {
  questionLabel: string;
  selectedOption: AnswerOptionId;
  correctOption: AnswerOptionId;
  isCorrect: boolean;
};

export type LiveQuizStudentResult = {
  id: string;
  name: string;
  score: number;
  total: number;
  answers: LiveQuizStudentAnswer[];
};

export type LiveQuizQuestionInsight = {
  id: string;
  questionLabel: string;
  questionText: string;
  correctRate: number;
  mostCommonWrongOption: AnswerOptionId;
};

export type LiveQuizSessionAnalytics = {
  classPerformance: {
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    completionRate: number;
  };
  studentResults: LiveQuizStudentResult[];
  commonWrongQuestions: LiveQuizQuestionInsight[];
  easiestQuestions: LiveQuizQuestionInsight[];
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
  studentsAnsweredList: LiveQuizStudent[];
  studentsNotAnswered: LiveQuizStudent[];
  quickActions: string[];
  analytics: LiveQuizSessionAnalytics;
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
    studentsAnsweredList: [
      { id: 'answered-1', name: 'Olivia White' },
      { id: 'answered-2', name: 'Noah Martinez' },
      { id: 'answered-3', name: 'Ava Johnson' },
      { id: 'answered-4', name: 'Liam Harris' },
      { id: 'answered-5', name: 'Mia Clark' },
      { id: 'answered-6', name: 'Lucas Robinson' },
      { id: 'answered-7', name: 'Amelia Lewis' },
      { id: 'answered-8', name: 'Ethan Walker' },
      { id: 'answered-9', name: 'Harper Hall' },
      { id: 'answered-10', name: 'Mason Allen' },
      { id: 'answered-11', name: 'Charlotte Young' },
      { id: 'answered-12', name: 'Logan Hernandez' },
      { id: 'answered-13', name: 'Ella King' },
      { id: 'answered-14', name: 'James Wright' },
      { id: 'answered-15', name: 'Grace Lopez' },
      { id: 'answered-16', name: 'Benjamin Scott' },
      { id: 'answered-17', name: 'Chloe Green' },
      { id: 'answered-18', name: 'Henry Adams' },
      { id: 'answered-19', name: 'Zoe Baker' },
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
    analytics: {
      classPerformance: {
        averageScore: 71,
        highestScore: 95,
        lowestScore: 38,
        completionRate: 79,
      },
      studentResults: [
        {
          id: 'result-1',
          name: 'Olivia White',
          score: 36,
          total: 40,
          answers: [
            { questionLabel: 'Q1', selectedOption: 'B', correctOption: 'B', isCorrect: true },
            { questionLabel: 'Q2', selectedOption: 'A', correctOption: 'A', isCorrect: true },
            { questionLabel: 'Q3', selectedOption: 'C', correctOption: 'D', isCorrect: false },
            { questionLabel: 'Q4', selectedOption: 'C', correctOption: 'C', isCorrect: true },
          ],
        },
        {
          id: 'result-2',
          name: 'Noah Martinez',
          score: 30,
          total: 40,
          answers: [
            { questionLabel: 'Q1', selectedOption: 'A', correctOption: 'B', isCorrect: false },
            { questionLabel: 'Q2', selectedOption: 'A', correctOption: 'A', isCorrect: true },
            { questionLabel: 'Q3', selectedOption: 'D', correctOption: 'D', isCorrect: true },
            { questionLabel: 'Q4', selectedOption: 'C', correctOption: 'C', isCorrect: true },
          ],
        },
        {
          id: 'result-3',
          name: 'Ava Johnson',
          score: 28,
          total: 40,
          answers: [
            { questionLabel: 'Q1', selectedOption: 'D', correctOption: 'B', isCorrect: false },
            { questionLabel: 'Q2', selectedOption: 'B', correctOption: 'A', isCorrect: false },
            { questionLabel: 'Q3', selectedOption: 'D', correctOption: 'D', isCorrect: true },
            { questionLabel: 'Q4', selectedOption: 'C', correctOption: 'C', isCorrect: true },
          ],
        },
        {
          id: 'result-4',
          name: 'Liam Harris',
          score: 38,
          total: 40,
          answers: [
            { questionLabel: 'Q1', selectedOption: 'B', correctOption: 'B', isCorrect: true },
            { questionLabel: 'Q2', selectedOption: 'A', correctOption: 'A', isCorrect: true },
            { questionLabel: 'Q3', selectedOption: 'D', correctOption: 'D', isCorrect: true },
            { questionLabel: 'Q4', selectedOption: 'A', correctOption: 'C', isCorrect: false },
          ],
        },
        {
          id: 'result-5',
          name: 'Mia Clark',
          score: 32,
          total: 40,
          answers: [
            { questionLabel: 'Q1', selectedOption: 'B', correctOption: 'B', isCorrect: true },
            { questionLabel: 'Q2', selectedOption: 'C', correctOption: 'A', isCorrect: false },
            { questionLabel: 'Q3', selectedOption: 'D', correctOption: 'D', isCorrect: true },
            { questionLabel: 'Q4', selectedOption: 'C', correctOption: 'C', isCorrect: true },
          ],
        },
        {
          id: 'result-6',
          name: 'Lucas Robinson',
          score: 26,
          total: 40,
          answers: [
            { questionLabel: 'Q1', selectedOption: 'A', correctOption: 'B', isCorrect: false },
            { questionLabel: 'Q2', selectedOption: 'A', correctOption: 'A', isCorrect: true },
            { questionLabel: 'Q3', selectedOption: 'B', correctOption: 'D', isCorrect: false },
            { questionLabel: 'Q4', selectedOption: 'C', correctOption: 'C', isCorrect: true },
          ],
        },
        {
          id: 'result-7',
          name: 'Amelia Lewis',
          score: 34,
          total: 40,
          answers: [
            { questionLabel: 'Q1', selectedOption: 'B', correctOption: 'B', isCorrect: true },
            { questionLabel: 'Q2', selectedOption: 'A', correctOption: 'A', isCorrect: true },
            { questionLabel: 'Q3', selectedOption: 'C', correctOption: 'D', isCorrect: false },
            { questionLabel: 'Q4', selectedOption: 'C', correctOption: 'C', isCorrect: true },
          ],
        },
        {
          id: 'result-8',
          name: 'Ethan Walker',
          score: 24,
          total: 40,
          answers: [
            { questionLabel: 'Q1', selectedOption: 'D', correctOption: 'B', isCorrect: false },
            { questionLabel: 'Q2', selectedOption: 'D', correctOption: 'A', isCorrect: false },
            { questionLabel: 'Q3', selectedOption: 'D', correctOption: 'D', isCorrect: true },
            { questionLabel: 'Q4', selectedOption: 'A', correctOption: 'C', isCorrect: false },
          ],
        },
      ],
      commonWrongQuestions: [
        {
          id: 'wrong-q1',
          questionLabel: 'Q1',
          questionText: 'Differentiate a composite polynomial expression.',
          correctRate: 44,
          mostCommonWrongOption: 'A',
        },
        {
          id: 'wrong-q2',
          questionLabel: 'Q2',
          questionText: 'Identify the correct derivative from transformed form.',
          correctRate: 52,
          mostCommonWrongOption: 'C',
        },
      ],
      easiestQuestions: [
        {
          id: 'easy-q3',
          questionLabel: 'Q3',
          questionText: 'Apply direct chain rule in standard form.',
          correctRate: 84,
          mostCommonWrongOption: 'B',
        },
        {
          id: 'easy-q4',
          questionLabel: 'Q4',
          questionText: 'Simplify derivative expression after expansion.',
          correctRate: 79,
          mostCommonWrongOption: 'A',
        },
      ],
    },
  },
];
