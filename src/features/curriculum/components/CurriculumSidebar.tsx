import Card from '../../../shared/components/ui/Card';
import { cn } from '../../../shared/lib/cn';

import SubjectIcon from '../../taskCompiler/components/SubjectIcon';
import type { CurriculumSubject } from '../types/curriculum.types';

type CurriculumSidebarProps = {
  subjects: CurriculumSubject[];
  selectedSubjectId: string;
  selectedUnitId: string;
  onSelectSubject: (subjectId: string) => void;
  onSelectUnit: (unitId: string) => void;
};

export default function CurriculumSidebar({
  subjects,
  selectedSubjectId,
  selectedUnitId,
  onSelectSubject,
  onSelectUnit,
}: CurriculumSidebarProps) {
  const selectedSubject =
    subjects.find((subject) => subject.id === selectedSubjectId) ?? null;

  return (
    <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-slate-900">Subjects</h2>
        <p className="text-xs text-slate-500">Select a subject and unit</p>
      </div>

      <div className="mt-4 space-y-2">
        {subjects.map((subject) => {
          const isActive = subject.id === selectedSubjectId;

          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => onSelectSubject(subject.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition',
                isActive
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white hover:bg-slate-50',
              )}
            >
              <SubjectIcon icon={subject.icon} color={subject.color} size={34} />
              <span className="text-sm font-medium text-slate-800">{subject.name}</span>
            </button>
          );
        })}
      </div>

      {selectedSubject ? (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Units
          </p>

          <div className="mt-2 space-y-2">
            {selectedSubject.units.map((unit) => {
              const isUnitActive = unit.id === selectedUnitId;

              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => onSelectUnit(unit.id)}
                  className={cn(
                    'w-full rounded-lg border px-3 py-2 text-left text-sm transition',
                    isUnitActive
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                  )}
                >
                  <span className="font-medium">{unit.label}</span>
                  <span className="ml-2 text-xs opacity-80">{unit.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </Card>
  );
}
