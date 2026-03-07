import { ChevronRight } from 'lucide-react';

import Badge from '../../../shared/components/ui/Badge';
import Card from '../../../shared/components/ui/Card';
import { cn } from '../../../shared/lib/cn';

import type { CurriculumArea, CurriculumUnit } from '../types/curriculum.types';

type CurriculumTopicListProps = {
  unit: CurriculumUnit | null;
  onOpenDetail: (area: CurriculumArea) => void;
};

export default function CurriculumTopicList({
  unit,
  onOpenDetail,
}: CurriculumTopicListProps) {
  if (!unit) {
    return (
      <Card className="rounded-2xl border-slate-200 p-6 text-sm text-slate-500">
        Select a subject and unit to view curriculum topics.
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900">Areas of Study</h2>
        <p className="text-sm text-slate-500">
          {unit.label} - {unit.title}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {unit.areas.map((area) => (
          <button
            key={area.id}
            type="button"
            onClick={() => onOpenDetail(area)}
            className={cn(
              'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition',
              'hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200',
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="neutral">{unit.label}</Badge>
                  <h3 className="text-sm font-semibold text-slate-900">{area.title}</h3>
                </div>

                <p className="mt-2 text-sm text-slate-500">{area.description}</p>
              </div>

              <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-400" />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Outcomes
                </p>
                <ul className="mt-2 space-y-2 text-left">
                  {area.outcomes.map((outcome) => (
                    <li key={outcome.id} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {outcome.code}
                        </p>
                        <p className="text-xs text-slate-700">{outcome.description}</p>
                        <p className="text-[11px] text-blue-700">
                          Assessment focus: students should demonstrate this in
                          exam-style responses.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Key Knowledge
                </p>
                <ul className="mt-2 space-y-2 text-left">
                  {area.keyKnowledge.map((knowledge) => (
                    <li key={knowledge} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-xs text-slate-700">{knowledge}</p>
                        <p className="text-[11px] text-emerald-700">
                          Concept detail: this underpins worked examples and retrieval
                          practice for this area.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-violet-200 bg-violet-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">
                  Key Skills
                </p>
                <ul className="mt-2 space-y-2 text-left">
                  {area.keySkills.map((skill) => (
                    <li key={skill} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
                      <div>
                        <p className="text-xs text-slate-700">{skill}</p>
                        <p className="text-[11px] text-violet-700">
                          Performance cue: expect students to show this explicitly in
                          formative checks.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
