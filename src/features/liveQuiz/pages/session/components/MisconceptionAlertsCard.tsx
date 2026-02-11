import { AlertTriangle } from 'lucide-react';
import Card from '../../../../../shared/components/ui/Card';
import Button from '../../../../../shared/components/ui/Button';
import type { LiveQuizMisconception } from '../../../data/liveQuizSession.mock';

export type MisconceptionAlertsCardProps = {
  items: LiveQuizMisconception[];
};

export default function MisconceptionAlertsCard({
  items,
}: MisconceptionAlertsCardProps) {
  return (
    <Card className="p-4 space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900">
          Misconception Alerts
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((alert) => (
          <div
            key={alert.id}
            className="rounded-lg border border-amber-200 bg-amber-50 p-3"
          >
            <p className="text-sm font-semibold text-slate-900">
              {alert.step}
            </p>
            <p className="text-xs text-slate-600">
              {alert.percent}% · {alert.students} students struggling
            </p>
          </div>
        ))}
      </div>

      <Button className="w-full bg-amber-500 text-white hover:bg-amber-600 transition-all duration-200 hover:-translate-y-0.5">
        View Detailed Analysis
      </Button>
    </Card>
  );
}
