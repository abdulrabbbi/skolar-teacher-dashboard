import Card from '../../../../../shared/components/ui/Card';
import ProgressBar from '../../../../../shared/components/ui/ProgressBar';

export type ParticipationCardProps = {
  percent: number;
};

export default function ParticipationCard({ percent }: ParticipationCardProps) {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">
          Live Participation
        </p>
        <span className="text-sm font-semibold text-slate-900">
          {percent}%
        </span>
      </div>
      <ProgressBar value={percent} variant="green" />
    </Card>
  );
}
