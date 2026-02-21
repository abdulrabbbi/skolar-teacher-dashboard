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
          </button>
        ))}
      </div>
    </Card>
  );
}
