import type { CurriculumSubject } from '../types/curriculum.types';

export const curriculumSubjectsMock: CurriculumSubject[] = [
  {
    id: 'methods',
    name: 'Mathematical Methods',
    color: 'blue',
    icon: 'sigma',
    units: [
      {
        id: 'methods-unit-3',
        subjectId: 'methods',
        label: 'Unit 3',
        title: 'Functions and Algebra',
        areas: [
          {
            id: 'methods-u3-aos1',
            unitId: 'methods-unit-3',
            title: 'Area of Study 1 - Functions and Graphs',
            description: 'Circular functions and transformations.',
            outcomes: [
              {
                id: 'mm-u3-aos1-o1',
                areaId: 'methods-u3-aos1',
                code: 'MM-U3-AOS1-O1',
                description: 'Apply circular functions in familiar contexts.',
                difficulty: 'Foundation',
              },
              {
                id: 'mm-u3-aos1-o2',
                areaId: 'methods-u3-aos1',
                code: 'MM-U3-AOS1-O2',
                description: 'Model periodic behaviour with transformed functions.',
                difficulty: 'Core',
              },
            ],
            keyKnowledge: [
              'Radian measure and unit circle representation.',
              'Transformation parameters for trig graphs.',
            ],
            keySkills: [
              'Sketch and annotate transformed graphs.',
              'Validate symbolic results with technology.',
            ],
          },
        ],
      },
      {
        id: 'methods-unit-4',
        subjectId: 'methods',
        label: 'Unit 4',
        title: 'Calculus and Probability',
        areas: [
          {
            id: 'methods-u4-aos1',
            unitId: 'methods-unit-4',
            title: 'Area of Study 1 - Calculus',
            description: 'Derivatives and integrals in context.',
            outcomes: [
              {
                id: 'mm-u4-aos1-o1',
                areaId: 'methods-u4-aos1',
                code: 'MM-U4-AOS1-O1',
                description: 'Differentiate composite functions accurately.',
                difficulty: 'Foundation',
              },
              {
                id: 'mm-u4-aos1-o2',
                areaId: 'methods-u4-aos1',
                code: 'MM-U4-AOS1-O2',
                description: 'Use calculus to optimise quantities.',
                difficulty: 'Extension',
              },
            ],
            keyKnowledge: [
              'Product and chain rules.',
              'Definite integrals and interpretation.',
            ],
            keySkills: [
              'Form equations from optimisation prompts.',
              'Interpret rates of change in context.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'specialist',
    name: 'Specialist Mathematics',
    color: 'orange',
    icon: 'infinity',
    units: [
      {
        id: 'specialist-unit-3',
        subjectId: 'specialist',
        label: 'Unit 3',
        title: 'Vectors and Mechanics',
        areas: [
          {
            id: 'spec-u3-aos1',
            unitId: 'specialist-unit-3',
            title: 'Area of Study 1 - Vectors',
            description: 'Vector algebra and geometry applications.',
            outcomes: [
              {
                id: 'sm-u3-aos1-o1',
                areaId: 'spec-u3-aos1',
                code: 'SM-U3-AOS1-O1',
                description: 'Operate with vectors in 2D and 3D.',
                difficulty: 'Foundation',
              },
              {
                id: 'sm-u3-aos1-o2',
                areaId: 'spec-u3-aos1',
                code: 'SM-U3-AOS1-O2',
                description: 'Solve geometric problems via vector methods.',
                difficulty: 'Core',
              },
            ],
            keyKnowledge: [
              'Dot product and geometric interpretation.',
              'Vector forms of line equations.',
            ],
            keySkills: [
              'Convert across vector notations.',
              'Set up intersection and distance equations.',
            ],
          },
        ],
      },
      {
        id: 'specialist-unit-4',
        subjectId: 'specialist',
        label: 'Unit 4',
        title: 'Differential Equations and Proof',
        areas: [
          {
            id: 'spec-u4-aos1',
            unitId: 'specialist-unit-4',
            title: 'Area of Study 1 - Differential Equations',
            description: 'First-order equations and modelling.',
            outcomes: [
              {
                id: 'sm-u4-aos1-o1',
                areaId: 'spec-u4-aos1',
                code: 'SM-U4-AOS1-O1',
                description: 'Construct first-order models from context.',
                difficulty: 'Foundation',
              },
              {
                id: 'sm-u4-aos1-o2',
                areaId: 'spec-u4-aos1',
                code: 'SM-U4-AOS1-O2',
                description: 'Solve separable differential equations.',
                difficulty: 'Extension',
              },
            ],
            keyKnowledge: [
              'General and particular solution forms.',
              'Role of initial conditions.',
            ],
            keySkills: [
              'Translate rates-of-change statements.',
              'Interpret solution behaviour over time.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    color: 'green',
    icon: 'leaf',
    units: [
      {
        id: 'biology-unit-3',
        subjectId: 'biology',
        label: 'Unit 3',
        title: 'Molecular Biology and Cells',
        areas: [
          {
            id: 'bio-u3-aos1',
            unitId: 'biology-unit-3',
            title: 'Area of Study 1 - Cellular Processes',
            description: 'Membranes, enzymes and signalling.',
            outcomes: [
              {
                id: 'bio-u3-aos1-o1',
                areaId: 'bio-u3-aos1',
                code: 'BIO-U3-AOS1-O1',
                description: 'Explain membrane transport pathways.',
                difficulty: 'Foundation',
              },
              {
                id: 'bio-u3-aos1-o2',
                areaId: 'bio-u3-aos1',
                code: 'BIO-U3-AOS1-O2',
                description: 'Analyse enzyme activity using data.',
                difficulty: 'Core',
              },
            ],
            keyKnowledge: [
              'Fluid mosaic model.',
              'Factors affecting enzyme function.',
            ],
            keySkills: [
              'Interpret experimental controls.',
              'Build process diagrams from evidence.',
            ],
          },
        ],
      },
      {
        id: 'biology-unit-4',
        subjectId: 'biology',
        label: 'Unit 4',
        title: 'Inheritance and Evolution',
        areas: [
          {
            id: 'bio-u4-aos1',
            unitId: 'biology-unit-4',
            title: 'Area of Study 1 - Heredity and Evolution',
            description: 'Genetics, selection and population change.',
            outcomes: [
              {
                id: 'bio-u4-aos1-o1',
                areaId: 'bio-u4-aos1',
                code: 'BIO-U4-AOS1-O1',
                description: 'Predict inheritance outcomes in simple crosses.',
                difficulty: 'Foundation',
              },
              {
                id: 'bio-u4-aos1-o2',
                areaId: 'bio-u4-aos1',
                code: 'BIO-U4-AOS1-O2',
                description: 'Evaluate evidence for evolutionary explanations.',
                difficulty: 'Extension',
              },
            ],
            keyKnowledge: [
              'Alleles, genotypes and phenotypes.',
              'Selection pressure and adaptation.',
            ],
            keySkills: [
              'Use Punnett models correctly.',
              'Interpret population genetics datasets.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: 'purple',
    icon: 'flask',
    units: [
      {
        id: 'chemistry-unit-3',
        subjectId: 'chemistry',
        label: 'Unit 3',
        title: 'Structure and Reactivity',
        areas: [
          {
            id: 'chem-u3-aos1',
            unitId: 'chemistry-unit-3',
            title: 'Area of Study 1 - Quantitative Chemistry',
            description: 'Moles, reactions and stoichiometry.',
            outcomes: [
              {
                id: 'chem-u3-aos1-o1',
                areaId: 'chem-u3-aos1',
                code: 'CHEM-U3-AOS1-O1',
                description: 'Apply mole relationships in equations.',
                difficulty: 'Foundation',
              },
              {
                id: 'chem-u3-aos1-o2',
                areaId: 'chem-u3-aos1',
                code: 'CHEM-U3-AOS1-O2',
                description: 'Evaluate yield and uncertainty in practical data.',
                difficulty: 'Core',
              },
            ],
            keyKnowledge: [
              'Molar mass and reaction stoichiometry.',
              'Limiting reagent concepts.',
            ],
            keySkills: [
              'Track units through calculations.',
              'Interpret titration evidence.',
            ],
          },
        ],
      },
      {
        id: 'chemistry-unit-4',
        subjectId: 'chemistry',
        label: 'Unit 4',
        title: 'Energy and Equilibrium',
        areas: [
          {
            id: 'chem-u4-aos1',
            unitId: 'chemistry-unit-4',
            title: 'Area of Study 1 - Equilibrium Systems',
            description: 'Thermochemistry, equilibrium and acid-base systems.',
            outcomes: [
              {
                id: 'chem-u4-aos1-o1',
                areaId: 'chem-u4-aos1',
                code: 'CHEM-U4-AOS1-O1',
                description: 'Determine enthalpy change from provided data.',
                difficulty: 'Foundation',
              },
              {
                id: 'chem-u4-aos1-o2',
                areaId: 'chem-u4-aos1',
                code: 'CHEM-U4-AOS1-O2',
                description: 'Predict equilibrium shifts from system changes.',
                difficulty: 'Extension',
              },
            ],
            keyKnowledge: [
              'Exothermic and endothermic processes.',
              'Le Chatelier principle and equilibrium constants.',
            ],
            keySkills: [
              'Analyse concentration-time data.',
              'Justify equilibrium decisions with evidence.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'english',
    name: 'English',
    color: 'pink',
    icon: 'pen',
    units: [
      {
        id: 'english-unit-3',
        subjectId: 'english',
        label: 'Unit 3',
        title: 'Reading and Creating Texts',
        areas: [
          {
            id: 'eng-u3-aos1',
            unitId: 'english-unit-3',
            title: 'Area of Study 1 - Text Response',
            description: 'Interpretation, argument and evidence.',
            outcomes: [
              {
                id: 'eng-u3-aos1-o1',
                areaId: 'eng-u3-aos1',
                code: 'ENG-U3-AOS1-O1',
                description: 'Develop a clear contention in text response.',
                difficulty: 'Foundation',
              },
              {
                id: 'eng-u3-aos1-o2',
                areaId: 'eng-u3-aos1',
                code: 'ENG-U3-AOS1-O2',
                description: 'Analyse author choices with integrated evidence.',
                difficulty: 'Core',
              },
            ],
            keyKnowledge: [
              'Audience, purpose and perspective.',
              'Essay conventions and structure.',
            ],
            keySkills: [
              'Embed quotations effectively.',
              'Maintain cohesive paragraph logic.',
            ],
          },
        ],
      },
      {
        id: 'english-unit-4',
        subjectId: 'english',
        label: 'Unit 4',
        title: 'Comparative and Presenting Argument',
        areas: [
          {
            id: 'eng-u4-aos1',
            unitId: 'english-unit-4',
            title: 'Area of Study 1 - Comparative and Oral Argument',
            description: 'Comparative synthesis and persuasive speaking.',
            outcomes: [
              {
                id: 'eng-u4-aos1-o1',
                areaId: 'eng-u4-aos1',
                code: 'ENG-U4-AOS1-O1',
                description: 'Build comparative arguments across texts.',
                difficulty: 'Foundation',
              },
              {
                id: 'eng-u4-aos1-o2',
                areaId: 'eng-u4-aos1',
                code: 'ENG-U4-AOS1-O2',
                description: 'Deliver persuasive oral presentations with impact.',
                difficulty: 'Extension',
              },
            ],
            keyKnowledge: [
              'Comparative thesis and structure patterns.',
              'Rhetorical devices for spoken argument.',
            ],
            keySkills: [
              'Synthesize evidence from multiple texts.',
              'Adapt tone and delivery to audience.',
            ],
          },
        ],
      },
    ],
  },
];
