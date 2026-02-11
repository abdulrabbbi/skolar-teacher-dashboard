
import Card from '../../../shared/components/ui/Card';
import type { CalendarEvent, EventTypeConfig } from '../data/calendar.mock';

export type MonthGridProps = {
  days: number[];
  events: CalendarEvent[];
  eventTypes: EventTypeConfig[];
};

export default function MonthGrid({
  days,
  events,
  eventTypes,
}: MonthGridProps) {
  const typeMap = new Map(eventTypes.map((type) => [type.id, type]));

  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* 🔹 HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 pt-0">
        <h2 className="text-xl font-semibold text-slate-900">
          January 2026
        </h2>

        <div className="flex gap-2">
          <button className="rounded-md border border-slate-200 px-2 py-1 text-2xl hover:bg-slate-100">
            ‹
          </button>
          <button className="rounded-md border border-slate-200 px-2 py-1 text-2xl hover:bg-slate-100">
            ›
          </button>
        </div>
      </div>

      {/* 🔹 WEEK DAYS */}
      <div className="grid grid-cols-7 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="px-3 py-2 text-center">
            {day}
          </div>
        ))}
      </div>

      {/* 🔹 DAYS GRID */}
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayEvents = events.filter((event) => event.day === day);

          return (
            <div
              key={day}
              className="min-h-27.5 border-b border-r border-slate-200 rounded-xl px-2 py-2 last:border-r-0"
            >
              <div className="text-xs font-semibold text-slate-500">
                {day}
              </div>

              <div className="mt-1 space-y-1">
                {dayEvents.map((event) => {
                  const type = typeMap.get(event.type);
                  if (!type) return null;

                  return (
                    <span
                      key={event.id}
                      className={`block w-full rounded-md px-1 py-0.5 text-center text-[10px] font-medium ${type.badgeClass}`}
                    >
                      {type.label}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 LEGEND */}
      <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 px-4 py-3 text-xs">
        {eventTypes.map((type) => (
          <div key={type.id} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${type.dotClass}`} />
            <span className="text-slate-600">{type.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
