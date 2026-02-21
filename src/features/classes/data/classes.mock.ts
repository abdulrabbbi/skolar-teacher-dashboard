export type ClassOverviewItem = {
  id: string;
  slug: string;
  name: string;
  total: number;
  onTrack: number;
  atRisk: number;
};

export const classesOverview: ClassOverviewItem[] = [
  {
    id: "year-12-methods",
    slug: "year-12-methods",
    name: "Year 12 Methods",
    total: 24,
    onTrack: 18,
    atRisk: 6,
  },
  {
    id: "year-11-methods",
    slug: "year-11-methods",
    name: "Year 11 Methods",
    total: 28,
    onTrack: 22,
    atRisk: 6,
  },
  {
    id: "year-12-specialist",
    slug: "year-12-specialist",
    name: "Year 12 Specialist",
    total: 16,
    onTrack: 14,
    atRisk: 2,
  },
];

export function getClassBySlug(slug: string) {
  return classesOverview.find((c) => c.slug === slug);
}

export type ClassSummary = {
  id: string;
  title: string;
  students: number;
  subject: string;
  avgScore: number;
};

const classMeta: Record<string, { subject: string; avgScore: number }> = {
  "year-12-methods": {
    subject: "Mathematical Methods",
    avgScore: 56,
  },
  "year-11-methods": {
    subject: "Mathematical Methods",
    avgScore: 78,
  },
  "year-12-specialist": {
    subject: "Specialist Mathematics",
    avgScore: 82,
  },
};

export const classes: ClassSummary[] = classesOverview.map((classItem) => {
  const meta = classMeta[classItem.id];

  return {
    id: classItem.id,
    title: classItem.name,
    students: classItem.total,
    subject: meta?.subject ?? "Mathematics",
    avgScore:
      meta?.avgScore ??
      Math.round((classItem.onTrack / Math.max(classItem.total, 1)) * 100),
  };
});
