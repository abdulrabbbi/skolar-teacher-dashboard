// ==============================
// TYPES
// ==============================

export type TaskHistoryStatus =
  | "In Progress"
  | "Draft"
  | "Completed"
  | "Assigned";
export type TaskDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export type TaskHistoryQuestion = {
  id: string;
  type: "Multiple Choice" | "Short Answer" | "Extended Response";
  prompt: string;
  marks?: number;
  answerGuide: string;
};

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
  questions: TaskHistoryQuestion[];
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
    questions: [
      {
        id: "q-001-1",
        type: "Short Answer",
        prompt:
          "State the amplitude and period of f(x) = 2sin(3x) and describe one transformation from sin(x).",
        marks: 3,
        answerGuide:
          "Amplitude = 2. Period = 2π/3. Transformation: vertical stretch by factor 2 (and/or horizontal compression by factor 3).",
      },
      {
        id: "q-001-2",
        type: "Multiple Choice",
        prompt:
          "Which change shifts y = cos(x) to the right by π/4?\nA) cos(x+π/4)\nB) cos(x-π/4)\nC) cos(x)+π/4\nD) cos(x)·π/4",
        marks: 1,
        answerGuide:
          "B. Replacing x with x - a shifts the graph right by a.",
      },
      {
        id: "q-001-3",
        type: "Extended Response",
        prompt:
          "Given g(x) = -f(2x) + 1, describe the sequence of transformations from y = f(x).",
        marks: 5,
        answerGuide:
          "Horizontal compression by factor 2 (x -> 2x), reflection in the x-axis (negative sign), then vertical translation up 1.",
      },
    ],
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
    questions: [
      {
        id: "q-002-1",
        type: "Short Answer",
        prompt: "Differentiate y = (3x - 2)^5.",
        marks: 2,
        answerGuide: "y' = 5(3x-2)^4 · 3 = 15(3x-2)^4.",
      },
      {
        id: "q-002-2",
        type: "Short Answer",
        prompt: "Differentiate y = sin(4x^2).",
        marks: 3,
        answerGuide:
          "y' = cos(4x^2) · d/dx(4x^2) = cos(4x^2) · 8x = 8x cos(4x^2).",
      },
      {
        id: "q-002-3",
        type: "Extended Response",
        prompt:
          "For y = e^{(x^2+1)/(x-1)}, find dy/dx and state any domain restrictions.",
        marks: 6,
        answerGuide:
          "Let u = (x^2+1)/(x-1). Then y' = e^u · u'. Use quotient rule: u' = [(2x)(x-1) - (x^2+1)·1]/(x-1)^2 = (x^2 - 2x - 1)/(x-1)^2. Domain: x ≠ 1.",
      },
    ],
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
    questions: [
      {
        id: "q-003-1",
        type: "Multiple Choice",
        prompt:
          "Solve for x: log10(x) = 2.\nA) 20\nB) 100\nC) 2\nD) 10",
        marks: 1,
        answerGuide: "B. x = 10^2 = 100.",
      },
      {
        id: "q-003-2",
        type: "Short Answer",
        prompt: "Solve 2^{x+1} = 16.",
        marks: 2,
        answerGuide: "16 = 2^4, so x + 1 = 4 ⇒ x = 3.",
      },
      {
        id: "q-003-3",
        type: "Extended Response",
        prompt:
          "Solve log2(x - 1) + log2(x + 3) = 3 and state the valid solution set.",
        marks: 5,
        answerGuide:
          "Combine: log2((x-1)(x+3)) = 3 ⇒ (x-1)(x+3) = 8 ⇒ x^2 + 2x - 3 = 8 ⇒ x^2 + 2x - 11 = 0 ⇒ x = [-2 ± √(4+44)]/2 = -1 ± 2√3. Domain: x > 1, so x = -1 + 2√3 only.",
      },
    ],
  },
  {
    id: 'task-004',
    title: 'Integration by Substitution',
    subject: 'Year 12 Methods',
    code: 'VCEMAA369',
    status: 'Draft',
    difficulty: 'Easy',
    createdAt: 'Feb 3, 2026',
    duration: '45 minutes',
    marks: '25 marks',
    students: 21,
    questions: [
      {
        id: "q-004-1",
        type: "Short Answer",
        prompt: "Evaluate ∫ 2x (x^2 + 1)^4 dx.",
        marks: 3,
        answerGuide:
          "Let u = x^2 + 1, du = 2x dx. Then ∫ u^4 du = u^5/5 + C = (x^2+1)^5/5 + C.",
      },
      {
        id: "q-004-2",
        type: "Short Answer",
        prompt: "Evaluate ∫ cos(3x) dx.",
        marks: 2,
        answerGuide: "(1/3) sin(3x) + C.",
      },
    ],
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
    questions: [
      {
        id: "q-005-1",
        type: "Short Answer",
        prompt:
          "A random variable X ~ Bin(n=10, p=0.3). Find P(X = 2).",
        marks: 3,
        answerGuide:
          "P(X=2) = C(10,2)(0.3)^2(0.7)^8.",
      },
      {
        id: "q-005-2",
        type: "Extended Response",
        prompt:
          "A continuous random variable has pdf f(x)=kx for 0≤x≤2 (0 otherwise). Find k, then E(X).",
        marks: 6,
        answerGuide:
          "Normalize: ∫0^2 kx dx = k[x^2/2]_0^2 = k·2 = 1 ⇒ k = 1/2. Then E(X)=∫0^2 x·(1/2)x dx = (1/2)∫0^2 x^2 dx = (1/2)[x^3/3]_0^2 = (1/2)·8/3 = 4/3.",
      },
    ],
  },
  {
    id: 'task-006',
    title: 'Exam Revision Pack',
    subject: 'Year 12 Methods',
    code: 'VCEMAA371',
    status: 'Assigned',
    difficulty: 'Mixed',
    createdAt: 'Jan 29, 2026',
    duration: '60 minutes',
    marks: '50 marks',
    students: 27,
    questions: [
      {
        id: "q-006-1",
        type: "Multiple Choice",
        prompt:
          "If f'(x)=0 at x=a and f''(a) < 0, then f has:\nA) minimum\nB) maximum\nC) inflection point\nD) no turning point",
        marks: 1,
        answerGuide: "B. Second derivative negative indicates a local maximum.",
      },
      {
        id: "q-006-2",
        type: "Extended Response",
        prompt:
          "Sketch y = x^3 - 3x and use calculus to label intercepts and turning points.",
        marks: 8,
        answerGuide:
          "Find intercepts: x(x^2-3)=0 ⇒ x=0, ±√3. Turning points from y' = 3x^2-3 = 0 ⇒ x=±1. Values: y(-1)=2, y(1)=-2. Classify with y''=6x: at x=-1 negative ⇒ local max; at x=1 positive ⇒ local min.",
      },
    ],
  },
];
