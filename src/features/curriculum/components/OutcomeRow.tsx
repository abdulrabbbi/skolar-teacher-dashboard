import Badge from '../../../shared/components/ui/Badge';
import Button from '../../../shared/components/ui/Button';
import { cn } from '../../../shared/lib/cn';

import type { CurriculumOutcome } from '../types/curriculum.types';

type OutcomeRowProps = {
  outcome: CurriculumOutcome;
  onAddToTaskCompiler?: (outcome: CurriculumOutcome) => void;
  className?: string;
};

const difficultyStyles: Record<CurriculumOutcome['difficulty'], string> = {
  Foundation: 'bg-slate-100 text-slate-700',
  Core: 'bg-emerald-100 text-emerald-700',
  Extension: 'bg-amber-100 text-amber-700',
};

export default function OutcomeRow({
  outcome,
  onAddToTaskCompiler,
  className,
}: OutcomeRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {outcome.code}
          </span>
          <Badge className={difficultyStyles[outcome.difficulty]}>
            {outcome.difficulty}
          </Badge>
        </div>

        <p className="text-sm text-slate-700">{outcome.description}</p>
      </div>

      <Button
        size="sm"
        variant="outline"
        className="border-slate-200 text-slate-700"
        onClick={() => onAddToTaskCompiler?.(outcome)}
      >
        Add to Task Compiler
      </Button>
    </div>
  );
}
