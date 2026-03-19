import {
  areaOfStudyItems,
  chemistryAreaOfStudyItems,
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

function getAllAreas(): AreaOfStudyItem[] {
  const allLists = [
    ...Object.values(subjectAreas),
    areaOfStudyItems,
    chemistryAreaOfStudyItems,
  ];

  const byId = new Map<string, AreaOfStudyItem>();
  for (const list of allLists) {
    for (const item of list ?? []) {
      if (!byId.has(item.id)) byId.set(item.id, item);
    }
  }
  return [...byId.values()];
}

export function getAreaById(
  subjectId: string,
  areaId?: string | null,
): AreaOfStudyItem | null {
  if (!areaId) return null;
  const list = getAreasForSubject(subjectId);
  const match = list.find((a) => String(a.id) === String(areaId));
  if (match) return match;

  return getAllAreas().find((a) => String(a.id) === String(areaId)) ?? null;
}
