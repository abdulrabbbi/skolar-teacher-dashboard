import {
  areaOfStudyItems,
  subjectAreas,
  subjectCards,
  type AreaOfStudyItem,
  type SubjectCard,
} from "../data/taskCompiler.mock";

export function getSubjectById(id?: string | null): SubjectCard | null {
  if (!id) return null;
  return subjectCards.find((s) => String(s.id) === String(id)) ?? null;
}

export function getAreasForSubject(subjectId: string): AreaOfStudyItem[] {
  return subjectAreas[subjectId] ?? areaOfStudyItems;
}

export function getAreaById(
  subjectId: string,
  areaId?: string | null,
): AreaOfStudyItem | null {
  if (!areaId) return null;
  const list = getAreasForSubject(subjectId);
  return list.find((a) => String(a.id) === String(areaId)) ?? null;
}
