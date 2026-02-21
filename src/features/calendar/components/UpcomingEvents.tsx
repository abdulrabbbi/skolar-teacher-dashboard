// import { Clock } from "lucide-react";
// import Card from "../../../shared/components/ui/Card";
// import { cn } from "../../../shared/lib/cn";
// import type { UpcomingEvent } from "../data/calendar.mock";

// /** Badge styles – match screenshot */
// const badgeMap: Record<UpcomingEvent["type"], { pill: string }> = {
//   SAC: { pill: "bg-purple-100 text-purple-700" },
//   Exam: { pill: "bg-rose-100 text-rose-700" },
//   Deadline: { pill: "bg-orange-100 text-orange-700" },
//   Class: { pill: "bg-blue-100 text-blue-700" },
//   Meeting: { pill: "bg-emerald-100 text-emerald-700" },
// };

// export type UpcomingEventsProps = {
//   events: UpcomingEvent[];
// };

// export default function UpcomingEvents({ events }: UpcomingEventsProps) {
//   const upcoming = [...events].slice(0, 5); // screenshot shows ~5 items

//   return (
//     <Card className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
//       <h2 className="text-lg font-semibold text-slate-900">Upcoming Events</h2>

//       <div className="mt-4 space-y-3">
//         {upcoming.map((event) => {
//           const badge = badgeMap[event.type];

//           return (
//             <div
//               key={event.id}
//               className={cn(
//                 "rounded-2xl border border-slate-200 bg-white p-4",
//                 "transition hover:bg-slate-50/60"
//               )}
//             >
//               <div className="flex items-start justify-between gap-3">
//                 {/* Left content */}
//                 <div className="min-w-0">
//                   <p className="truncate text-base font-semibold text-slate-900">
//                     {event.title}
//                   </p>

//                   {/* meta row: clock + date • time */}
//                   <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
//                     <Clock className="h-4 w-4 text-slate-400" />
//                     <span className="truncate">{event.time}</span>
//                   </div>

//                   {/* optional class line */}
//                   {event.className ? (
//                     <p className="mt-2 truncate text-sm text-slate-500">
//                       {event.className}
//                     </p>
//                   ) : null}
//                 </div>

//                 {/* Badge */}
//                 <span
//                   className={cn(
//                     "shrink-0 rounded-full px-3 py-1 text-sm font-medium",
//                     badge.pill
//                   )}
//                 >
//                   {event.type}
//                 </span>
//               </div>
//             </div>
//           );
//         })}

//         {upcoming.length === 0 && (
//           <p className="text-sm text-slate-500">No upcoming events.</p>
//         )}
//       </div>
//     </Card>
//   );
// }

import { Clock } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import { cn } from "../../../shared/lib/cn";
import type { UpcomingEvent } from "../data/calendar.mock";

/** Badge styles – match screenshot */
const badgeMap: Record<UpcomingEvent["type"], { pill: string }> = {
  SAC: { pill: "bg-purple-100 text-purple-700" },
  Exam: { pill: "bg-rose-100 text-rose-700" },
  Deadline: { pill: "bg-orange-100 text-orange-700" },
  Class: { pill: "bg-blue-100 text-blue-700" },
  Meeting: { pill: "bg-emerald-100 text-emerald-700" },
};

export type UpcomingEventsProps = {
  events: UpcomingEvent[];
};

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const upcoming = [...events].slice(0, 5);

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Upcoming Events</h2>

      <div className="mt-3 space-y-2.5">
        {upcoming.map((event) => {
          const badge = badgeMap[event.type];

          return (
            <div
              key={event.id}
              className={cn(
                "rounded-xl border border-slate-200 bg-white p-3",
                "transition hover:bg-slate-50/60",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Left content */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {event.title}
                  </p>

                  {/* meta row */}
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{event.time}</span>
                  </div>

                  {/* optional class line */}
                  {event.className ? (
                    <p className="mt-1.5 truncate text-xs text-slate-500">
                      {event.className}
                    </p>
                  ) : null}
                </div>

                {/* Badge */}
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                    badge.pill,
                  )}
                >
                  {event.type}
                </span>
              </div>
            </div>
          );
        })}

        {upcoming.length === 0 && (
          <p className="text-sm text-slate-500">No upcoming events.</p>
        )}
      </div>
    </Card>
  );
}