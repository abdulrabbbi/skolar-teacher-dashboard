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

export const outcomes: OutcomeItem[] = [
  {
    id: "outcome-u3-aos1-1",
    label: "Define and explain key concepts related to circular functions",
    areaId: "methods-unit-3-aos-1",
  },
  {
    id: "outcome-u3-aos1-2",
    label: "Apply transformations to circular functions",
    areaId: "methods-unit-3-aos-1",
  },
  {
    id: "outcome-u3-aos2-1",
    label: "Model exponential growth and decay",
    areaId: "methods-unit-3-aos-2",
  },
  {
    id: "outcome-u3-aos2-2",
    label: "Solve logarithmic equations and inequalities",
    areaId: "methods-unit-3-aos-2",
  },
  {
    id: "outcome-u4-aos1-1",
    label: "Apply differentiation techniques to real-world problems",
    areaId: "methods-unit-4-aos-1",
  },
  {
    id: "outcome-u4-aos1-2",
    label: "Interpret the results of integration",
    areaId: "methods-unit-4-aos-1",
  },
  {
    id: "outcome-u4-aos2-1",
    label: "Analyse discrete and continuous random variables",
    areaId: "methods-unit-4-aos-2",
  },
  {
    id: "outcome-u4-aos2-2",
    label: "Apply probability distributions to practical contexts",
    areaId: "methods-unit-4-aos-2",
  },
];

export const keyKnowledge: KnowledgeItem[] = [
  {
    id: "knowledge-u3-aos1-1",
    label: "Radian measure and its relationship with degree measure",
    areaId: "methods-unit-3-aos-1",
  },
  {
    id: "knowledge-u3-aos1-2",
    label: "Graphs of sine, cosine and tangent functions",
    areaId: "methods-unit-3-aos-1",
  },
  {
    id: "knowledge-u3-aos2-1",
    label: "Laws of exponents and logarithms",
    areaId: "methods-unit-3-aos-2",
  },
  {
    id: "knowledge-u3-aos2-2",
    label: "Properties of exponential functions",
    areaId: "methods-unit-3-aos-2",
  },
  {
    id: "knowledge-u4-aos1-1",
    label: "Differentiation rules and techniques",
    areaId: "methods-unit-4-aos-1",
  },
  {
    id: "knowledge-u4-aos1-2",
    label: "Anti-derivatives and definite integrals",
    areaId: "methods-unit-4-aos-1",
  },
  {
    id: "knowledge-u4-aos2-1",
    label: "Probability distributions and expected value",
    areaId: "methods-unit-4-aos-2",
  },
  {
    id: "knowledge-u4-aos2-2",
    label: "Sampling methods and statistical inference",
    areaId: "methods-unit-4-aos-2",
  },
];

export const keySkills: SkillItem[] = [
  {
    id: "skill-u3-aos1-1",
    label: "Convert between degrees and radians",
    areaId: "methods-unit-3-aos-1",
  },
  {
    id: "skill-u3-aos1-2",
    label: "Sketch and interpret graphs of circular functions",
    areaId: "methods-unit-3-aos-1",
  },
  {
    id: "skill-u3-aos2-1",
    label: "Solve exponential and logarithmic equations",
    areaId: "methods-unit-3-aos-2",
  },
  {
    id: "skill-u3-aos2-2",
    label: "Apply algebraic techniques to transformations",
    areaId: "methods-unit-3-aos-2",
  },
  {
    id: "skill-u4-aos1-1",
    label: "Differentiate functions to solve optimisation problems",
    areaId: "methods-unit-4-aos-1",
  },
  {
    id: "skill-u4-aos1-2",
    label: "Evaluate definite integrals",
    areaId: "methods-unit-4-aos-1",
  },
  {
    id: "skill-u4-aos2-1",
    label: "Analyse probability distributions",
    areaId: "methods-unit-4-aos-2",
  },
  {
    id: "skill-u4-aos2-2",
    label: "Interpret statistical results in context",
    areaId: "methods-unit-4-aos-2",
  },
];



export function getAreaDetailContent(_areaId?: string | null) {
  // Fallback: show the same content for any area (matches your Figma screenshot)
  return {
    outcomes: [
      { id: "o1", label: "Define and explain key concepts related to circular functions" },
      { id: "o2", label: "Apply transformations to circular functions" },
      { id: "o3", label: "Model periodic phenomena using circular functions" },
      { id: "o4", label: "Solve circular equations and interpret solutions" },
    ],
    keyKnowledge: [
      { id: "k1", label: "Radian measure and its relationship with degree measure" },
      { id: "k2", label: "The unit circle and exact values" },
      { id: "k3", label: "Sine, cosine and tangent functions and their graphs" },
      { id: "k4", label: "Transformations: translations, dilations and reflections" },
      { id: "k5", label: "Solution of equations involving circular functions" },
      { id: "k6", label: "Modelling periodic phenomena" },
    ],
    keySkills: [
      { id: "s1", label: "Convert between degrees and radians" },
      { id: "s2", label: "Determine exact values using the unit circle" },
      { id: "s3", label: "Sketch graphs of circular functions with transformations" },
      { id: "s4", label: "Solve equations using algebraic and graphical methods" },
      { id: "s5", label: "Apply circular functions to model real-world phenomena" },
      { id: "s6", label: "Interpret solutions in context" },
    ],
  };
}
