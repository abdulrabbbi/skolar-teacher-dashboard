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

export default function SessionStatusBar({
  progress,
  timeRemaining,
  studentsAnswered,
}: SessionStatusBarProps) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">
              {progress.current} / {progress.total}
            </span>
            <span className="text-slate-500">Question Progress</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-600">
            <Clock className="h-4 w-4" />
            <span className="font-semibold text-slate-900">
              {timeRemaining}
            </span>
            <span className="text-slate-500">Time Remaining</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <span className="font-semibold text-slate-900">
              {studentsAnswered.answered} / {studentsAnswered.total}
            </span>
            <span className="text-slate-500">Students Answered</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Pause className="h-4 w-4" />
            Pause
          </Button>
          <Button variant="success" size="sm" className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Next Question
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-rose-600 bg-rose-600 text-white hover:bg-rose-700"
          >
            <XCircle className="h-4 w-4" />
            End Quiz
          </Button>
        </div>
      </div>
    </Card>
  );
}
