import { curriculumSubjectsMock } from '../data/curriculum.mock';
import type {
  CurriculumArea,
  CurriculumOutcome,
  CurriculumSubject,
  CurriculumUnit,
} from '../types/curriculum.types';

export function getCurriculumSubjectById(
  subjectId?: string | null,
  subjects: CurriculumSubject[] = curriculumSubjectsMock,
): CurriculumSubject | null {
  if (!subjectId) {
    return null;
  }

  return subjects.find((subject) => subject.id === subjectId) ?? null;
}

export function getCurriculumUnitById(
  subject: CurriculumSubject | null,
  unitId?: string | null,
): CurriculumUnit | null {
  if (!subject || !unitId) {
    return null;
  }

  return subject.units.find((unit) => unit.id === unitId) ?? null;
}

export function getAreasForUnit(unit: CurriculumUnit | null): CurriculumArea[] {
  if (!unit) {
    return [];
  }

  return unit.areas;
}

export function getOutcomesForUnit(unit: CurriculumUnit | null): CurriculumOutcome[] {
  if (!unit) {
    return [];
  }

  return unit.areas.flatMap((area) => area.outcomes);
}

export function getUnitKnowledge(unit: CurriculumUnit | null): string[] {
  if (!unit) {
    return [];
  }

  const knowledge = unit.areas.flatMap((area) => area.keyKnowledge);
  return [...new Set(knowledge)];
}

export function getUnitSkills(unit: CurriculumUnit | null): string[] {
  if (!unit) {
    return [];
  }

  const skills = unit.areas.flatMap((area) => area.keySkills);
  return [...new Set(skills)];
}

export function getUnitSummary(unit: CurriculumUnit | null) {
  return {
    outcomes: getOutcomesForUnit(unit).length,
    knowledge: getUnitKnowledge(unit).length,
    skills: getUnitSkills(unit).length,
  };
}

export function getInitialCurriculumSelection(subjects: CurriculumSubject[]) {
  const firstSubject = subjects[0] ?? null;
  const firstUnit = firstSubject?.units[0] ?? null;

  return {
    subjectId: firstSubject?.id ?? '',
    unitId: firstUnit?.id ?? '',
  };
}
