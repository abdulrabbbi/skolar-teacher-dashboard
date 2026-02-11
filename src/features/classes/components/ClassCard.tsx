
import { ChevronRight, Users } from 'lucide-react';
import Card from '../../../shared/components/ui/Card';
import ProgressBar from '../../../shared/components/ui/ProgressBar';
import type { ClassSummary } from '../data/classes.mock';

export type ClassCardProps = {
  classItem: ClassSummary;
};

const getProgressVariant = (score: number) => {
  if (score >= 75) return 'green' as const;
  if (score >= 60) return 'orange' as const;
  return 'red' as const;
};

export default function ClassCard({ classItem }: ClassCardProps) {
  return (
    <Card
      className="
        group cursor-pointer space-y-4 p-4 sm:p-5
        transition
        hover:shadow-md hover:border-slate-300
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm sm:text-base font-semibold text-slate-900">
            {classItem.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <Users className="h-4 w-4 shrink-0" />
            <span>{classItem.students} students</span>
          </div>
        </div>

        {/* ARROW */}
        <ChevronRight
          className="
            h-5 w-5 shrink-0 text-slate-400
            transition-transform transition-colors
            group-hover:translate-x-1
            group-hover:text-slate-600
          "
        />
      </div>

      {/* SUBJECT */}
      <div>
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
          Subject
        </p>
        <p className="mt-1 text-sm text-slate-700 truncate">
          {classItem.subject}
        </p>
      </div>

      {/* PROGRESS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Avg Score</span>
          <span className="font-medium">{classItem.avgScore}%</span>
        </div>

        <ProgressBar
          value={classItem.avgScore}
          variant={getProgressVariant(classItem.avgScore)}
        />
      </div>
    </Card>
  );
}
