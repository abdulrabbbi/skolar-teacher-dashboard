// ==============================
// TYPES
// ==============================

export type OutcomeItem = {
  id: string;
  label: string;
  areaId: string;
};

export type KnowledgeItem = {
  id: string;
  label: string;
  areaId: string;
};

export type SkillItem = {
  id: string;
  label: string;
  areaId: string;
};

// ==============================
// OUTCOMES
// ==============================

export const outcomes: OutcomeItem[] = [
  // Unit 3 – AOS 1
  {
    id: 'outcome-u3-aos1-1',
    label: 'Define and explain key concepts related to circular functions',
    areaId: 'methods-unit-3-aos-1',
  },
  {
    id: 'outcome-u3-aos1-2',
    label: 'Apply transformations to circular functions',
    areaId: 'methods-unit-3-aos-1',
  },

  // Unit 3 – AOS 2
  {
    id: 'outcome-u3-aos2-1',
    label: 'Model exponential growth and decay',
    areaId: 'methods-unit-3-aos-2',
  },
  {
    id: 'outcome-u3-aos2-2',
    label: 'Solve logarithmic equations and inequalities',
    areaId: 'methods-unit-3-aos-2',
  },

  // Unit 4 – AOS 1
  {
    id: 'outcome-u4-aos1-1',
    label: 'Apply differentiation techniques to real-world problems',
    areaId: 'methods-unit-4-aos-1',
  },
  {
    id: 'outcome-u4-aos1-2',
    label: 'Interpret the results of integration',
    areaId: 'methods-unit-4-aos-1',
  },

  // Unit 4 – AOS 2
  {
    id: 'outcome-u4-aos2-1',
    label: 'Analyse discrete and continuous random variables',
    areaId: 'methods-unit-4-aos-2',
  },
  {
    id: 'outcome-u4-aos2-2',
    label: 'Apply probability distributions to practical contexts',
    areaId: 'methods-unit-4-aos-2',
  },
];

// ==============================
// KEY KNOWLEDGE
// ==============================

export const keyKnowledge: KnowledgeItem[] = [
  // Unit 3 – AOS 1
  {
    id: 'knowledge-u3-aos1-1',
    label: 'Radian measure and its relationship with degree measure',
    areaId: 'methods-unit-3-aos-1',
  },
  {
    id: 'knowledge-u3-aos1-2',
    label: 'Graphs of sine, cosine and tangent functions',
    areaId: 'methods-unit-3-aos-1',
  },

  // Unit 3 – AOS 2
  {
    id: 'knowledge-u3-aos2-1',
    label: 'Laws of exponents and logarithms',
    areaId: 'methods-unit-3-aos-2',
  },
  {
    id: 'knowledge-u3-aos2-2',
    label: 'Properties of exponential functions',
    areaId: 'methods-unit-3-aos-2',
  },

  // Unit 4 – AOS 1
  {
    id: 'knowledge-u4-aos1-1',
    label: 'Differentiation rules and techniques',
    areaId: 'methods-unit-4-aos-1',
  },
  {
    id: 'knowledge-u4-aos1-2',
    label: 'Anti-derivatives and definite integrals',
    areaId: 'methods-unit-4-aos-1',
  },

  // Unit 4 – AOS 2
  {
    id: 'knowledge-u4-aos2-1',
    label: 'Probability distributions and expected value',
    areaId: 'methods-unit-4-aos-2',
  },
  {
    id: 'knowledge-u4-aos2-2',
    label: 'Sampling methods and statistical inference',
    areaId: 'methods-unit-4-aos-2',
  },
];

// ==============================
// KEY SKILLS
// ==============================

export const keySkills: SkillItem[] = [
  // Unit 3 – AOS 1
  {
    id: 'skill-u3-aos1-1',
    label: 'Convert between degrees and radians',
    areaId: 'methods-unit-3-aos-1',
  },
  {
    id: 'skill-u3-aos1-2',
    label: 'Sketch and interpret graphs of circular functions',
    areaId: 'methods-unit-3-aos-1',
  },

  // Unit 3 – AOS 2
  {
    id: 'skill-u3-aos2-1',
    label: 'Solve exponential and logarithmic equations',
    areaId: 'methods-unit-3-aos-2',
  },
  {
    id: 'skill-u3-aos2-2',
    label: 'Apply algebraic techniques to transformations',
    areaId: 'methods-unit-3-aos-2',
  },

  // Unit 4 – AOS 1
  {
    id: 'skill-u4-aos1-1',
    label: 'Differentiate functions to solve optimisation problems',
    areaId: 'methods-unit-4-aos-1',
  },
  {
    id: 'skill-u4-aos1-2',
    label: 'Evaluate definite integrals',
    areaId: 'methods-unit-4-aos-1',
  },

  // Unit 4 – AOS 2
  {
    id: 'skill-u4-aos2-1',
    label: 'Analyse probability distributions',
    areaId: 'methods-unit-4-aos-2',
  },
  {
    id: 'skill-u4-aos2-2',
    label: 'Interpret statistical results in context',
    areaId: 'methods-unit-4-aos-2',
  },
];
