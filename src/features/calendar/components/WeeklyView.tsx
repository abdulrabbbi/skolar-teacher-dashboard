import Card from "../../../shared/components/ui/Card";
import ProgressBar from "../../../shared/components/ui/ProgressBar";
import type { WeeklyDay, WeeklyStats } from "../data/calendar.weekly.mock";
import WeeklyEventCard from "./WeeklyEventCard";

export type WeeklyViewProps = {
  headerLabel: string; 
  stats: WeeklyStats;
  days: WeeklyDay[];
};

export default function WeeklyView({ stats, days }: WeeklyViewProps) {
  const numberClass = "mt-1 text-2xl font-semibold text-slate-900";

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-200">
          <div className="md:px-5">
            <div className="text-xs text-slate-500">Total Planned</div>
            <div className={numberClass}>{stats.totalPlanned}</div>
          </div>

          <div className="md:px-5">
            <div className="text-xs text-slate-500">Completed</div>
            <div className={numberClass}>{stats.completed}</div>
          </div>

          <div className="md:px-5">
            <div className="text-xs text-slate-500">Completion Rate</div>
            <div className={numberClass}>{stats.completionRate}%</div>
            <div className="mt-2">
              <ProgressBar value={stats.completionRate} variant="green" />
            </div>
          </div>
        </div>
      </Card>

      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          xl:grid-cols-7
          items-start auto-rows-max
        "
      >
        {days.map((day) => (
          <Card
            key={day.id}
            className="
              rounded-[28px] border border-slate-200 bg-white
              p-4
            "
          >

            <div className="text-center">
              <p className="text-base font-semibold text-slate-900">
                {day.label}
              </p>
              <p className="text-sm text-slate-500">{day.date}</p>
            </div>

            <div className="mt-4">
              <ProgressBar
                value={day.minutesDone}
                max={day.minutesTotal}
                variant="green"
              />
              <p className="mt-3 text-center text-sm font-medium text-slate-600">
                {day.minutesDone}/{day.minutesTotal} min
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {day.events.map((event: any) => (
                <WeeklyEventCard
                  key={event.id}
                  event={event}
                  checked={Boolean(event.completed)}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}