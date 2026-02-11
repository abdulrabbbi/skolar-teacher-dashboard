/* eslint-disable no-shadow-restricted-names */
import { ChevronRight } from 'lucide-react';
import {
  Sigma,
  Leaf,
  FlaskConical,
  Infinity,
  PenLine,
} from 'lucide-react';

import Badge from '../../../shared/components/ui/Badge';
import Card from '../../../shared/components/ui/Card';
import type {
  AreaOfStudyItem,
  SubjectCard,
} from '../data/taskCompiler.mock';
import { taskCompilerCopy } from '../data/taskCompiler.mock';

/* ICON MAP */
const iconMap = {
  sigma: Sigma,
  leaf: Leaf,
  flask: FlaskConical,
  infinity: Infinity,
  pen: PenLine,
};

/* COLOR MAP */
const colorMap = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-emerald-100 text-emerald-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  pink: 'bg-pink-100 text-pink-600',
};

export type AreaOfStudyListProps = {
  subject: SubjectCard;
  areas: AreaOfStudyItem[];
  onSelectArea?: (area: AreaOfStudyItem) => void;
};

export default function AreaOfStudyList({
  subject,
  areas,
  onSelectArea,
}: AreaOfStudyListProps) {
  const units = Array.from(new Set(areas.map((item) => item.unit)));
  const Icon = iconMap[subject.icon];

  return (
    <section className="space-y-5">
      {/* ✅ SUBJECT HEADER WITH ICON */}
      <div className="flex items-start gap-4">
        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center ${colorMap[subject.color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {subject.title}
          </h2>
          <p className="text-sm text-slate-500">
            {taskCompilerCopy.areaSelectionSubtitle}
          </p>
        </div>
      </div>

      {/* AREAS */}
      <div className="space-y-5">
        {units.map((unit) => (
          <div key={unit} className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {unit}
            </div>

            <div className="space-y-3">
              {areas
                .filter((area) => area.unit === unit)
                .map((area) => (
                  <Card
                    key={area.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectArea?.(area)}
                    onKeyDown={(event) => {
                      if (
                        event.key === 'Enter' ||
                        event.key === ' '
                      ) {
                        event.preventDefault();
                        onSelectArea?.(area);
                      }
                    }}
                    className="
                      group
                      flex items-center justify-between gap-4
                      p-4
                      transition
                      hover:border-slate-300 hover:shadow-sm
                      transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl
                      transition-all duration-200 hover:bg-slate-50 hover:shadow-sm
                    "
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="neutral">{area.unit}</Badge>
                        <p className="text-sm font-semibold text-slate-900">
                          {area.title}
                        </p>
                      </div>

                      <p className="text-sm text-slate-500">
                        {area.description}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:scale-110" />
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
