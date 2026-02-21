import Card from "../../../shared/components/ui/Card";
import { cn } from "../../../shared/lib/cn";
import type { EventTypeConfig, UpcomingEvent } from "../data/calendar.mock";
import { Clock } from "lucide-react";

type Props = {
  events: UpcomingEvent[];
  eventTypes: EventTypeConfig[];
};

export default function UpcomingEvents({ events, eventTypes }: Props) {
  const typeMap = new Map(eventTypes.map((t) => [t.id, t]));

  const normalizeTime = (s: string) =>
    s.replace(/\uFFFD/g, "•").replace(/�/g, "•"); // fixes your mock "�"

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Upcoming Events</h3>

      <div className="mt-4 space-y-4">
        {events.map((e) => {
          const type = typeMap.get(e.type);

          return (
            <div
              key={e.id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {e.title}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{normalizeTime(e.time)}</span>
                  </div>

                  {e.className && (
                    <div className="mt-2 text-xs text-slate-400">
                      {e.className}
                    </div>
                  )}
                </div>

                {type && (
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                      type.badgeClass,
                    )}
                  >
                    {type.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {events.length === 0 && (
          <div className="text-sm text-slate-500">No upcoming events.</div>
        )}
      </div>
    </Card>
  );
}