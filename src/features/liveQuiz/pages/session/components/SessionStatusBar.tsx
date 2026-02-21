import type { ReactNode } from 'react';
import { ArrowRight, Clock, Pause, Users, XCircle } from 'lucide-react';
import Card from '../../../../../shared/components/ui/Card';
import Button from '../../../../../shared/components/ui/Button';

export type SessionStatusBarProps = {
  progress: {
    current: number;
    total: number;
  };
  timeRemaining: string;
  studentsAnswered: {
    answered: number;
    total: number;
  };
};

function StatBlock({
  label,
  value,
  icon,
  withDivider,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  withDivider?: boolean;
}) {
  return (
    <div className={withDivider ? 'sm:border-r sm:border-slate-200' : undefined}>
      <p className="px-2 text-sm text-slate-500 sm:px-6">{label}</p>
      <div className="mt-1 flex items-center gap-2 px-2 sm:px-6">
        {icon}
        <p className="text-sm font-semibold leading-none text-slate-950 sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function SessionStatusBar({
  progress,
  timeRemaining,
  studentsAnswered,
}: SessionStatusBarProps) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0">
          <StatBlock
            label="Question Progress"
            value={`${progress.current} / ${progress.total}`}
            withDivider
          />

          <StatBlock
            label="Time Remaining"
            value={timeRemaining}
            icon={<Clock className="h-5 w-5 text-emerald-600" />}
            withDivider
          />

          <StatBlock
            label="Students Answered"
            value={`${studentsAnswered.answered} / ${studentsAnswered.total}`}
            icon={<Users className="h-5 w-5 text-emerald-600" />}
          />
        </div>

        <div className="ml-auto flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            className="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 hover:bg-slate-50"
          >
            <Pause className="h-4 w-4" />
            Pause
          </Button>

          <Button
            variant="success"
            size="sm"
            className="h-10 rounded-xl bg-emerald-600 px-4 text-sm text-white hover:bg-emerald-700"
          >
            <ArrowRight className="h-4 w-4" />
            Next Question
          </Button>

          <Button
            size="sm"
            className="h-10 rounded-xl bg-rose-600 px-4 text-sm text-white hover:bg-rose-700"
          >
            <XCircle className="h-4 w-4" />
            End Quiz
          </Button>
        </div>
      </div>
    </Card>
  );
}
