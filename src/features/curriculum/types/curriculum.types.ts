export type CurriculumSubjectId =
  | 'methods'
  | 'specialist'
  | 'biology'
  | 'chemistry'
  | 'english';

export type CurriculumSubjectColor =
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'pink';

export type CurriculumSubjectIcon =
  | 'sigma'
  | 'leaf'
  | 'flask'
  | 'infinity'
  | 'pen';

export type CurriculumOutcomeDifficulty = 'Foundation' | 'Core' | 'Extension';

export type CurriculumOutcome = {
  id: string;
  areaId: string;
  code: string;
  description: string;
  difficulty: CurriculumOutcomeDifficulty;
};

export type CurriculumArea = {
  id: string;
  unitId: string;
  title: string;
  description: string;
  outcomes: CurriculumOutcome[];
  keyKnowledge: string[];
  keySkills: string[];
};

export type CurriculumUnit = {
  id: string;
  subjectId: CurriculumSubjectId;
  label: string;
  title: string;
  areas: CurriculumArea[];
};

export type CurriculumSubject = {
  id: CurriculumSubjectId;
  name: string;
  color: CurriculumSubjectColor;
  icon: CurriculumSubjectIcon;
  units: CurriculumUnit[];
};

/**
 * Mongo Shape (backend-ready, informational only)
 * Suggested indexes:
 * 1) CurriculumSubject: { id: 1 } unique
 * 2) CurriculumUnit: { subjectId: 1, id: 1 } unique
 * 3) CurriculumArea: { unitId: 1, id: 1 } unique
 * 4) CurriculumOutcome: { areaId: 1, code: 1 } unique
 */
export type MongoCurriculumSubjectShape = {
  _id: string;
  id: CurriculumSubjectId;
  name: string;
  color: CurriculumSubjectColor;
  icon: CurriculumSubjectIcon;
  createdAt: Date;
  updatedAt: Date;
};

export type MongoCurriculumUnitShape = {
  _id: string;
  id: string;
  subjectId: CurriculumSubjectId;
  label: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MongoCurriculumAreaShape = {
  _id: string;
  id: string;
  unitId: string;
  title: string;
  description: string;
  keyKnowledge: string[];
  keySkills: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type MongoCurriculumOutcomeShape = {
  _id: string;
  id: string;
  areaId: string;
  code: string;
  description: string;
  difficulty: CurriculumOutcomeDifficulty;
  createdAt: Date;
  updatedAt: Date;
};
