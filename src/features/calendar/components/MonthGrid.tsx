// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useMemo } from "react";
// import Card from "../../../shared/components/ui/Card";
// import type { CalendarEvent, EventTypeConfig } from "../data/calendar.mock";

// /**
//  * Updated to match "fake" CalendarMonthGrid behavior:
//  * - Proper month cells (Sun-first) incl. prev/next month days
//  * - Dims out-of-month
//  * - Group events by date
//  * - Shows only 2 events per day + "+N more"
//  */

// export type MonthGridProps = {
//   // Keep your existing props (days) but we won't rely on it anymore.
//   // You can remove it later, but keeping it prevents breaking callers.
//   days: number[];
//   events: CalendarEvent[];
//   eventTypes: EventTypeConfig[];

//   // ✅ add these (optional but recommended)
//   monthISO?: string; // e.g. "2026-01-01"
//   monthLabel?: string; // e.g. "January 2026"
// };

// type MonthCell = {
//   key: string; // YYYY-MM-DD
//   date: Date;
//   inMonth: boolean;
// };

// function toISODate(date: Date) {
//   const y = date.getFullYear();
//   const m = String(date.getMonth() + 1).padStart(2, "0");
//   const d = String(date.getDate()).padStart(2, "0");
//   return `${y}-${m}-${d}`;
// }

// function buildMonthCells(monthISO: string): MonthCell[] {
//   const d = new Date(monthISO);
//   const year = d.getFullYear();
//   const month = d.getMonth();

//   const first = new Date(year, month, 1);
//   const last = new Date(year, month + 1, 0);

//   // Sunday-first grid
//   const start = new Date(year, month, 1 - first.getDay());
//   const end = new Date(year, month, last.getDate() + (6 - last.getDay()));

//   const cells: MonthCell[] = [];
//   const cur = new Date(start);

//   while (cur <= end) {
//     const cellDate = new Date(cur);
//     const iso = toISODate(cellDate);
//     cells.push({
//       key: iso,
//       date: cellDate,
//       inMonth: cellDate.getMonth() === month,
//     });
//     cur.setDate(cur.getDate() + 1);
//   }

//   return cells;
// }

// // If your CalendarEvent doesn't have dateISO, we infer from `day` only (fallback).
// // Ideally update your mock to include `dateISO: "2026-01-12"`.
// function buildEventsByDate(
//   events: CalendarEvent[],
//   monthISO: string,
// ): Map<string, CalendarEvent[]> {
//   const map = new Map<string, CalendarEvent[]>();
//   const base = new Date(monthISO);
//   const year = base.getFullYear();
//   const month = base.getMonth();

//   for (const e of events) {
//     // ✅ best case: your event has dateISO already
//     const anyE = e as any;
//     const iso: string | undefined = anyE.dateISO;

//     const key =
//       iso ??
//       // fallback: if your event only has `day`, assume it's in current month
//       toISODate(new Date(year, month, (e as any).day ?? 1));

//     map.set(key, [...(map.get(key) ?? []), e]);
//   }

//   return map;
// }

// export default function MonthGrid({
//   // keeping for compatibility
//   days,
//   events,
//   eventTypes,
//   monthISO = "2026-01-01",
//   monthLabel = "January 2026",
// }: MonthGridProps) {
//   const typeMap = useMemo(
//     () => new Map(eventTypes.map((t) => [t.id, t])),
//     [eventTypes],
//   );

//   const cells = useMemo(() => buildMonthCells(monthISO), [monthISO]);

//   const byDate = useMemo(
//     () => buildEventsByDate(events, monthISO),
//     [events, monthISO],
//   );

//   return (
//     <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
//       {/* HEADER */}
//       <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
//         <h2 className="text-lg font-semibold text-slate-900">{monthLabel}</h2>

//         <div className="flex items-center gap-2">
//           <button className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5">
//             ‹
//           </button>
//           <button className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5">
//             ›
//           </button>
//         </div>
//       </div>

//       {/* WEEK DAYS */}
//       <div className="grid grid-cols-7 gap-2 px-4 pt-3 text-xs text-slate-500">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//           <div key={d} className="px-1 py-1">
//             {d}
//           </div>
//         ))}
//       </div>

//       {/* DAYS GRID (LIKE FAKE) */}
//       <div className="mt-2 grid grid-cols-7 gap-2 px-4 pb-4">
//         {cells.map((cell) => {
//           const dayEvents = byDate.get(cell.key) ?? [];

//           return (
//             <div
//               key={cell.key}
//               className={[
//                 "min-h-[86px] rounded-xl border border-slate-200 bg-white p-2",
//                 !cell.inMonth ? "opacity-40" : "",
//               ].join(" ")}
//             >
//               <div className="text-xs text-slate-500">
//                 {cell.date.getDate()}
//               </div>

//               <div className="mt-2 space-y-1">
//                 {dayEvents.slice(0, 2).map((event) => {
//                   const type = typeMap.get((event as any).type);
//                   if (!type) return null;

//                   // type.badgeClass should already include background/text styling
//                   return (
//                     <div
//                       key={(event as any).id}
//                       className={[
//                         "rounded-lg px-2 py-1 text-[11px] font-medium",
//                         "truncate",
//                         type.badgeClass,
//                       ].join(" ")}
//                       title={type.label}
//                     >
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="truncate">{type.label}</span>
//                         {(event as any).time && (
//                           <span className="opacity-90">{(event as any).time}</span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}

//                 {dayEvents.length > 2 && (
//                   <div className="text-[11px] text-slate-500">
//                     +{dayEvents.length - 2} more
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* LEGEND */}
//       <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 px-4 py-3 text-xs">
//         {eventTypes.map((type) => (
//           <div key={type.id} className="flex items-center gap-2">
//             <span className={`h-2 w-2 rounded-full ${type.dotClass}`} />
//             <span className="text-slate-600">{type.label}</span>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// }



/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import Card from "../../../shared/components/ui/Card";
import { cn } from "../../../shared/lib/cn";
import type { CalendarEvent, EventTypeConfig } from "../data/calendar.mock";

export type MonthGridProps = {
  events: CalendarEvent[];
  eventTypes: EventTypeConfig[];

  monthISO?: string;   // e.g. "2026-01-01"
  monthLabel?: string; // e.g. "January 2026"

  // optional handlers if you later wire month navigation
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
};

type MonthCell = {
  key: string; // YYYY-MM-DD
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

  // Sunday-first grid
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

  // best case
  if (anyE.dateISO) return String(anyE.dateISO);

  // fallback: if only day exists, assume same month
  const base = new Date(monthISO);
  const year = base.getFullYear();
  const month = base.getMonth();
  const day = Number(anyE.day ?? 1);

  return toISODate(new Date(year, month, day));
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
}: MonthGridProps) {
  const typeMap = useMemo(
    () => new Map(eventTypes.map((t) => [String(t.id), t])),
    [eventTypes],
  );

  const cells = useMemo(() => buildMonthCells(monthISO), [monthISO]);

  const byDate = useMemo(
    () => buildEventsByDate(events, monthISO),
    [events, monthISO],
  );

  return (
    <Card className="p-4 rounded-2xl border border-slate-200 bg-white">
      {/* HEADER */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">{monthLabel}</div>

        {/* ✅ KEEP BUTTONS SAME */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevMonth}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5"
          >
            ›
          </button>
        </div>
      </div>

      {/* WEEK DAYS */}
      <div className="grid grid-cols-7 gap-2 text-xs text-slate-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="px-1 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* DAYS GRID */}
      <div className="mt-2 grid grid-cols-7 gap-2">
        {cells.map((cell) => {
          const dayEvents = byDate.get(cell.key) ?? [];

          return (
            <div
              key={cell.key}
              className={cn(
                "min-h-[86px] rounded-xl border border-slate-200 bg-white p-2",
                !cell.inMonth && "opacity-40",
              )}
            >
              <div className="text-xs text-slate-500">{cell.date.getDate()}</div>

              <div className="mt-2 space-y-1">
                {dayEvents.slice(0, 2).map((event) => {
                  const typeId = getEventTypeId(event);
                  const type = typeMap.get(typeId);
                  if (!type) return null;

                  // student style: solid pill w/ white text using dotClass color
                  const pillClass = `${type.dotClass} text-white`;

                  return (
                    <div
                      key={(event as any).id ?? `${cell.key}-${typeId}`}
                      className={cn(
                        "rounded-lg px-2 py-1 text-[11px] font-medium",
                        pillClass,
                      )}
                      title={type.label}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate">{type.label}</span>
                        {(event as any).time && (
                          <span className="opacity-90">{(event as any).time}</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {dayEvents.length > 2 && (
                  <div className="text-[11px] text-slate-500">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* LEGEND */}
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
