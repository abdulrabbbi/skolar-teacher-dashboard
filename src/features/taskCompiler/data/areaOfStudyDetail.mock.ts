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
  {
    id: "chem-outcome-u1-aos1-1",
    label: "Explain the mole concept and calculate chemical amount",
    areaId: "chemistry-unit-1-aos-1",
  },
  {
    id: "chem-outcome-u1-aos1-2",
    label: "Balance equations and apply stoichiometry to reactions",
    areaId: "chemistry-unit-1-aos-1",
  },
  {
    id: "chem-outcome-u1-aos2-1",
    label: "Compare ionic, covalent and metallic bonding models",
    areaId: "chemistry-unit-1-aos-2",
  },
  {
    id: "chem-outcome-u1-aos2-2",
    label: "Relate bonding and structure to material properties",
    areaId: "chemistry-unit-1-aos-2",
  },
  {
    id: "chem-outcome-u2-aos1-1",
    label: "Describe solubility and precipitation in aqueous systems",
    areaId: "chemistry-unit-2-aos-1",
  },
  {
    id: "chem-outcome-u2-aos1-2",
    label: "Use concentration relationships in solution chemistry",
    areaId: "chemistry-unit-2-aos-1",
  },
  {
    id: "chem-outcome-u2-aos2-1",
    label: "Apply titration principles to determine unknown concentration",
    areaId: "chemistry-unit-2-aos-2",
  },
  {
    id: "chem-outcome-u2-aos2-2",
    label: "Evaluate practical data for accuracy, precision and validity",
    areaId: "chemistry-unit-2-aos-2",
  },
  {
    id: "chem-outcome-u3-aos1-1",
    label: "Analyse factors affecting reaction rate and yield",
    areaId: "chemistry-unit-3-aos-1",
  },
  {
    id: "chem-outcome-u3-aos1-2",
    label: "Interpret equilibrium systems using qualitative reasoning",
    areaId: "chemistry-unit-3-aos-1",
  },
  {
    id: "chem-outcome-u3-aos2-1",
    label: "Identify redox processes and assign oxidation numbers",
    areaId: "chemistry-unit-3-aos-2",
  },
  {
    id: "chem-outcome-u3-aos2-2",
    label: "Explain how electrochemical cells convert chemical to electrical energy",
    areaId: "chemistry-unit-3-aos-2",
  },
  {
    id: "chem-outcome-u4-aos1-1",
    label: "Classify organic compounds by functional group and reactivity",
    areaId: "chemistry-unit-4-aos-1",
  },
  {
    id: "chem-outcome-u4-aos1-2",
    label: "Propose multi-step syntheses using reaction pathways",
    areaId: "chemistry-unit-4-aos-1",
  },
  {
    id: "chem-outcome-u4-aos2-1",
    label: "Interpret IR and NMR features to infer structure",
    areaId: "chemistry-unit-4-aos-2",
  },
  {
    id: "chem-outcome-u4-aos2-2",
    label: "Use analytical evidence to justify structure identification",
    areaId: "chemistry-unit-4-aos-2",
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
  {
    id: "chem-knowledge-u1-aos1-1",
    label: "Molar mass, Avogadro's constant and the mole relationship",
    areaId: "chemistry-unit-1-aos-1",
  },
  {
    id: "chem-knowledge-u1-aos1-2",
    label: "Stoichiometric coefficients and conservation of mass",
    areaId: "chemistry-unit-1-aos-1",
  },
  {
    id: "chem-knowledge-u1-aos2-1",
    label: "Ionic lattices, covalent molecules and metallic bonding",
    areaId: "chemistry-unit-1-aos-2",
  },
  {
    id: "chem-knowledge-u1-aos2-2",
    label: "Polarity, intermolecular forces and physical properties",
    areaId: "chemistry-unit-1-aos-2",
  },
  {
    id: "chem-knowledge-u2-aos1-1",
    label: "Solution concentration measures and dilution calculations",
    areaId: "chemistry-unit-2-aos-1",
  },
  {
    id: "chem-knowledge-u2-aos1-2",
    label: "Precipitation and net ionic equations in aqueous reactions",
    areaId: "chemistry-unit-2-aos-1",
  },
  {
    id: "chem-knowledge-u2-aos2-1",
    label: "Standard solutions, indicators and titration curves",
    areaId: "chemistry-unit-2-aos-2",
  },
  {
    id: "chem-knowledge-u2-aos2-2",
    label: "Uncertainty, significant figures and evaluating experimental error",
    areaId: "chemistry-unit-2-aos-2",
  },
  {
    id: "chem-knowledge-u3-aos1-1",
    label: "Collision theory, catalysts and energy profile diagrams",
    areaId: "chemistry-unit-3-aos-1",
  },
  {
    id: "chem-knowledge-u3-aos1-2",
    label: "Dynamic equilibrium and qualitative Le Châtelier responses",
    areaId: "chemistry-unit-3-aos-1",
  },
  {
    id: "chem-knowledge-u3-aos2-1",
    label: "Oxidation states, half-equations and redox balancing",
    areaId: "chemistry-unit-3-aos-2",
  },
  {
    id: "chem-knowledge-u3-aos2-2",
    label: "Galvanic cell components and direction of electron flow",
    areaId: "chemistry-unit-3-aos-2",
  },
  {
    id: "chem-knowledge-u4-aos1-1",
    label: "Functional groups, nomenclature and reaction types",
    areaId: "chemistry-unit-4-aos-1",
  },
  {
    id: "chem-knowledge-u4-aos1-2",
    label: "Reaction pathways and planning a synthesis sequence",
    areaId: "chemistry-unit-4-aos-1",
  },
  {
    id: "chem-knowledge-u4-aos2-1",
    label: "IR absorption bands and proton environments in 1H NMR",
    areaId: "chemistry-unit-4-aos-2",
  },
  {
    id: "chem-knowledge-u4-aos2-2",
    label: "Using multiple techniques to confirm identity and purity",
    areaId: "chemistry-unit-4-aos-2",
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
  {
    id: "chem-skill-u1-aos1-1",
    label: "Perform mole and mass calculations from chemical equations",
    areaId: "chemistry-unit-1-aos-1",
  },
  {
    id: "chem-skill-u1-aos1-2",
    label: "Balance equations and identify limiting reagents",
    areaId: "chemistry-unit-1-aos-1",
  },
  {
    id: "chem-skill-u1-aos2-1",
    label: "Use bonding models to predict structure and properties",
    areaId: "chemistry-unit-1-aos-2",
  },
  {
    id: "chem-skill-u1-aos2-2",
    label: "Interpret diagrams of lattices and molecular structures",
    areaId: "chemistry-unit-1-aos-2",
  },
  {
    id: "chem-skill-u2-aos1-1",
    label: "Calculate solution concentrations and perform dilutions",
    areaId: "chemistry-unit-2-aos-1",
  },
  {
    id: "chem-skill-u2-aos1-2",
    label: "Write net ionic equations for precipitation reactions",
    areaId: "chemistry-unit-2-aos-1",
  },
  {
    id: "chem-skill-u2-aos2-1",
    label: "Process titration data to determine an unknown concentration",
    areaId: "chemistry-unit-2-aos-2",
  },
  {
    id: "chem-skill-u2-aos2-2",
    label: "Assess data quality using uncertainty and error analysis",
    areaId: "chemistry-unit-2-aos-2",
  },
  {
    id: "chem-skill-u3-aos1-1",
    label: "Use rate data to compare conditions and infer trends",
    areaId: "chemistry-unit-3-aos-1",
  },
  {
    id: "chem-skill-u3-aos1-2",
    label: "Predict equilibrium shifts from system changes",
    areaId: "chemistry-unit-3-aos-1",
  },
  {
    id: "chem-skill-u3-aos2-1",
    label: "Balance redox equations using half-equation method",
    areaId: "chemistry-unit-3-aos-2",
  },
  {
    id: "chem-skill-u3-aos2-2",
    label: "Identify anode/cathode and electron flow in cells",
    areaId: "chemistry-unit-3-aos-2",
  },
  {
    id: "chem-skill-u4-aos1-1",
    label: "Map functional group interconversions in a synthesis plan",
    areaId: "chemistry-unit-4-aos-1",
  },
  {
    id: "chem-skill-u4-aos1-2",
    label: "Draw structures and name products using conventions",
    areaId: "chemistry-unit-4-aos-1",
  },
  {
    id: "chem-skill-u4-aos2-1",
    label: "Match IR and NMR features to structural fragments",
    areaId: "chemistry-unit-4-aos-2",
  },
  {
    id: "chem-skill-u4-aos2-2",
    label: "Combine evidence from multiple spectra to justify a structure",
    areaId: "chemistry-unit-4-aos-2",
  },
];



export function getAreaDetailContent(areaId?: string | null) {
  const normalizedAreaId = areaId?.trim();

  const matchesArea = (item: { areaId: string }) =>
    normalizedAreaId ? item.areaId === normalizedAreaId : true;

  return {
    outcomes: outcomes.filter(matchesArea).map((item) => ({
      id: item.id,
      label: item.label,
    })),
    keyKnowledge: keyKnowledge.filter(matchesArea).map((item) => ({
      id: item.id,
      label: item.label,
    })),
    keySkills: keySkills.filter(matchesArea).map((item) => ({
      id: item.id,
      label: item.label,
    })),
  };
}
