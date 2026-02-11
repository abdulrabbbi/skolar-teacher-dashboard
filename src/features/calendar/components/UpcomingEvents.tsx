

import Card from '../../../shared/components/ui/Card';
import { cn } from '../../../shared/lib/cn';
import type { UpcomingEvent } from '../data/calendar.mock';

/* Badge styles – local & simple (like best code) */
const badgeMap: Record<UpcomingEvent['type'], string> = {
  SAC: 'bg-purple-100 text-purple-700',
  Exam: 'bg-rose-100 text-rose-700',
  Deadline: 'bg-orange-100 text-orange-700',
  Class: 'bg-blue-100 text-blue-700',
  Meeting: 'bg-emerald-100 text-emerald-700',
};

export type UpcomingEventsProps = {
  events: UpcomingEvent[];
};

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const upcoming = [...events].slice(0, 4);

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-sm font-semibold text-slate-900">
        Upcoming Events
      </h2>

      <div className="mt-3 space-y-3">
        {upcoming.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              {/* Left */}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {event.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {event.time}
                </p>

                {event.className && (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {event.className}
                  </p>
                )}
              </div>

              {/* Badge */}
              <span
                className={cn(
                  'rounded-full px-2 py-1 text-[10px] font-semibold',
                  badgeMap[event.type],
                )}
              >
                {event.type}
              </span>
            </div>
          </div>
        ))}

        {upcoming.length === 0 && (
          <p className="text-sm text-slate-500">
            No upcoming events.
          </p>
        )}
      </div>
    </Card>
  );
}
