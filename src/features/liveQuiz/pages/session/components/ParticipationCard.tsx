import Card from "../../../../../shared/components/ui/Card";
import { cn } from "../../../../../shared/lib/cn";

export type ParticipationCardProps = {
  percent: number; // 0 - 100
  className?: string;
};

export default function ParticipationCard({
  percent,
  className,
}: ParticipationCardProps) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <Card
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-4 sm:p-5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Live Participation</p>
        <span className="text-sm font-medium text-slate-500">
          {value}% responded
        </span>
      </div>

      {/* Progress bar (same look as screenshot) */}
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-900"
          style={{ width: `${value}%` }}
          aria-label={`Participation ${value}%`}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </Card>
  );
}