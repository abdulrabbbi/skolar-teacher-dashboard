/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef } from "react";
import Card from "../../../shared/components/ui/Card";
import { cn } from "../../../shared/lib/cn";
import type { CalendarEvent, EventTypeConfig } from "../data/calendar.mock";

export type MonthGridProps = {
  events: CalendarEvent[];
  eventTypes: EventTypeConfig[];

  monthISO?: string;
  monthLabel?: string;

  onPrevMonth?: () => void;
  onNextMonth?: () => void;

  onSelectDay?: (dateISO: string) => void;
  onSelectEvent?: (event: CalendarEvent) => void;
  onEditEvent?: (event: CalendarEvent) => void;
};

type MonthCell = {
  key: string;
  date: Date;
  inMonth: boolean;
};

function toISODate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildMonthCells(monthISO: string): MonthCell[] {
  const d = new Date(monthISO);
  const year = d.getFullYear();
  const month = d.getMonth();

  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  const start = new Date(year, month, 1 - first.getDay());
  const end = new Date(year, month, last.getDate() + (6 - last.getDay()));

  const cells: MonthCell[] = [];
  const cur = new Date(start);

  while (cur <= end) {
    const cellDate = new Date(cur);
    cells.push({
      key: toISODate(cellDate),
      date: cellDate,
      inMonth: cellDate.getMonth() === month,
    });
    cur.setDate(cur.getDate() + 1);
  }

  return cells;
}

function getEventTypeId(e: CalendarEvent): string {
  const anyE = e as any;
  return String(anyE.type ?? anyE.typeId ?? anyE.eventTypeId ?? "");
}

function getEventISO(e: CalendarEvent, monthISO: string): string {
  const anyE = e as any;

  if (anyE.dateISO) return String(anyE.dateISO);

  const base = new Date(monthISO);
  const year = base.getFullYear();
  const month = base.getMonth();
  const day = Number(anyE.day ?? 1);

  return toISODate(new Date(year, month, day));
}

function getEventTitle(e: CalendarEvent, fallbackLabel: string): string {
  const anyE = e as any;
  return String(anyE.title ?? anyE.name ?? anyE.subject ?? fallbackLabel);
}

function buildEventsByDate(
  events: CalendarEvent[],
  monthISO: string,
): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>();

  for (const e of events) {
    const key = getEventISO(e, monthISO);
    map.set(key, [...(map.get(key) ?? []), e]);
  }

  return map;
}

export default function MonthGrid({
  events,
  eventTypes,
  monthISO = "2026-01-01",
  monthLabel = "January 2026",
  onPrevMonth,
  onNextMonth,
  onSelectDay,
  onSelectEvent,
  onEditEvent,
}: MonthGridProps) {
  const typeMap = useMemo(
    () => new Map(eventTypes.map((t) => [String(t.id), t])),
    [eventTypes],
  );

  const clickTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const cells = useMemo(() => buildMonthCells(monthISO), [monthISO]);

  const byDate = useMemo(
    () => buildEventsByDate(events, monthISO),
    [events, monthISO],
  );

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">{monthLabel}</div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevMonth}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
          >
            ›
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-7 gap-2 text-xs text-slate-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="px-1 py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {cells.map((cell) => {
              const dayEvents = byDate.get(cell.key) ?? [];

              return (
                <div
                  key={cell.key}
                  onClick={() => onSelectDay?.(cell.key)}
                  className={cn(
                    "min-h-[118px] rounded-xl border border-slate-200 bg-white p-2",
                    !cell.inMonth && "opacity-40",
                    onSelectDay &&
                      "cursor-pointer transition-all duration-200 hover:border-indigo-200 hover:shadow-sm",
                  )}
                >
                  <div className="text-xs text-slate-500">
                    {cell.date.getDate()}
                  </div>

                  <div className="mt-2 space-y-1">
                    {dayEvents.slice(0, 2).map((event, index) => {
                      const typeId = getEventTypeId(event);
                      const type = typeMap.get(typeId);
                      if (!type) return null;

                      const pillClass = `${type.dotClass} text-white`;
                      const title = getEventTitle(event, type.label);

                      return (
                        <button
                          key={
                            (event as any).id ??
                            `${cell.key}-${typeId}-${index}`
                          }
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();

                            if (!onSelectEvent) return;
                            if (clickTimeoutRef.current) {
                              window.clearTimeout(clickTimeoutRef.current);
                            }

                            // Delay to allow double-click to be handled as "edit" instead.
                            clickTimeoutRef.current = window.setTimeout(() => {
                              onSelectEvent(event);
                            }, 220);
                          }}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            if (clickTimeoutRef.current) {
                              window.clearTimeout(clickTimeoutRef.current);
                            }
                            onEditEvent?.(event);
                          }}
                          className={cn(
                            "flex h-7 w-full items-center rounded-lg px-2 py-1 text-left text-[11px] font-medium",
                            "transition-opacity duration-200 hover:opacity-90",
                            pillClass,
                          )}
                          title={title}
                        >
                          <div className="flex w-full items-center justify-between gap-2 overflow-hidden">
                            <span className="block flex-1 truncate leading-4">
                              {title}
                            </span>

                            {(event as any).time && (
                              <span className="shrink-0 opacity-90">
                                {(event as any).time}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {dayEvents.length > 2 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDay?.(cell.key);
                        }}
                        className="text-[11px] text-slate-500 transition hover:text-slate-700"
                      >
                        +{dayEvents.length - 2} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600">
        {eventTypes.map((t) => (
          <div key={t.id} className="flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full", t.dotClass)} />
            {t.label}
          </div>
        ))}
      </div>
    </Card>
  );
}
