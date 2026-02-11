import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import ProgressBar from "../../../shared/components/ui/ProgressBar";
import SectionHeader from "../../../shared/components/ui/SectionHeader";
import type {
  WeeklyDay,
  WeeklyEventType,
  WeeklyStats,
} from "../data/calendar.weekly.mock";

export type WeeklyViewProps = {
  headerLabel: string;
  stats: WeeklyStats;
  days: WeeklyDay[];
};

/* ONLY dots use color */
const typeDot: Record<WeeklyEventType, string> = {
  Exam: "bg-red-500",
  Class: "bg-blue-500",
  Deadline: "bg-orange-500",
};

export default function WeeklyView({
  headerLabel,
  stats,
  days,
}: WeeklyViewProps) {
  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeader title={headerLabel} />

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous week"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </button>

          <button
            type="button"
            aria-label="Next week"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* STATS */}
      <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Total Planned
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {stats.totalPlanned}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Completed
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {stats.completed}
            </p>
          </div>

          <div className="min-w-[200px] space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Completion Rate</span>
              <span>{stats.completionRate}%</span>
            </div>
            <ProgressBar value={stats.completionRate} />
          </div>
        </div>
      </Card>

      {/* DAYS GRID */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {days.map((day) => (
          <Card
            key={day.id}
            className="space-y-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl transition-all duration-200 hover:bg-slate-50"
          >
            {/* DAY HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {day.label}
                </p>
                <p className="text-xs text-slate-500">{day.date}</p>
              </div>

              <p className="text-xs text-slate-500">
                {day.minutesDone}/{day.minutesTotal} min
              </p>
            </div>

            <ProgressBar
              value={day.minutesDone}
              max={day.minutesTotal}
            />

            {/* EVENTS */}
            <div className="space-y-2">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition-all duration-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5"
                >
                  {/* PURE BLACK & WHITE CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={event.completed}
                    readOnly
                    className="
                      mt-1
                      h-4 w-4
                      rounded
                      border border-slate-400
                      bg-white
                      accent-black
                      focus:ring-0
                    "
                  />

                  {/* COLORED DOT */}
                  <span
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${typeDot[event.type]}`}
                  />

                  {/* CONTENT */}
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-900">
                      {event.title}
                    </p>

                    {event.subtitle && (
                      <p className="text-[11px] text-slate-500">
                        {event.subtitle}
                      </p>
                    )}

                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
                      {event.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
