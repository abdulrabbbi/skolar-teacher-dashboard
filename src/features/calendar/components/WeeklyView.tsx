
// // import { Clock } from "lucide-react";
// // import Card from "../../../shared/components/ui/Card";
// // import ProgressBar from "../../../shared/components/ui/ProgressBar";
// // import type {
// //   WeeklyDay,
// //   WeeklyEventType,
// //   WeeklyStats,
// // } from "../data/calendar.weekly.mock";

// // export type WeeklyViewProps = {
// //   headerLabel: string; // kept for compatibility (not rendered now)
// //   stats: WeeklyStats;
// //   days: WeeklyDay[];
// // };

// // /* ONLY dots use color */
// // const typeDot: Record<WeeklyEventType, string> = {
// //   Exam: "bg-red-500",
// //   Class: "bg-blue-500",
// //   Deadline: "bg-orange-500",
// // };

// // export default function WeeklyView({ stats, days }: WeeklyViewProps) {
// //   const numberClass = "mt-1 text-2xl font-semibold text-slate-900";

// //   return (
// //     <div className="space-y-6">
// //       {/* ✅ STATS (EXACT like PlannerStats layout) */}
// //       <Card className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
// //         <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-200">
// //           <div className="md:px-5">
// //             <div className="text-xs text-slate-500">Total Planned</div>
// //             <div className={numberClass}>{stats.totalPlanned}</div>
// //           </div>

// //           <div className="md:px-5">
// //             <div className="text-xs text-slate-500">Completed</div>
// //             <div className={numberClass}>{stats.completed}</div>
// //           </div>

// //           <div className="md:px-5">
// //             <div className="text-xs text-slate-500">Completion Rate</div>
// //             <div className={numberClass}>{stats.completionRate}%</div>
// //             <div className="mt-2">
// //               <ProgressBar value={stats.completionRate} variant="green" />
// //             </div>
// //           </div>
// //         </div>
// //       </Card>

// //       {/* DAYS GRID */}
// //       <div
// //         className="
// //           grid gap-4
// //           grid-cols-1
// //           sm:grid-cols-2
// //           md:grid-cols-3
// //           lg:grid-cols-5
// //           xl:grid-cols-7
// //         "
// //       >
// //         {days.map((day) => (
// //           <Card
// //             key={day.id}
// //             className="
// //               rounded-2xl border border-slate-200 bg-white
// //               p-3 sm:p-4
// //               space-y-3
// //             "
// //           >
// //             {/* Day header (center like screenshot) */}
// //             <div className="text-center">
// //               <p className="text-sm font-semibold text-slate-900">{day.label}</p>
// //               <p className="text-xs text-slate-500">{day.date}</p>
// //             </div>

// //             {/* progress */}
// //             <ProgressBar
// //               value={day.minutesDone}
// //               max={day.minutesTotal}
// //               variant="green"
// //             />

// //             {/* minutes centered */}
// //             <p className="text-center text-xs font-medium text-slate-500">
// //               {day.minutesDone}/{day.minutesTotal} min
// //             </p>

// //             {/* events */}
// //             <div className="space-y-2">
// //               {day.events.map((event: any) => (
// //                 <div
// //                   key={event.id}
// //                   className="
// //                     flex items-start gap-2
// //                     rounded-2xl border border-slate-200 bg-slate-50
// //                     px-3 py-3
// //                   "
// //                 >
// //                   <input
// //                     type="checkbox"
// //                     checked={Boolean(event.completed)}
// //                     readOnly
// //                     className="
// //                       mt-0.5 h-5 w-5
// //                       rounded-md
// //                       border border-slate-300
// //                       bg-white
// //                       accent-black
// //                       focus:ring-0
// //                     "
// //                   />

// //                   <span
// //                     className={`mt-2 h-2 w-2 shrink-0 rounded-full ${typeDot[event.type]}`}
// //                   />

// //                   <div className="min-w-0">
// //                     <p className="text-sm font-medium leading-5 text-slate-900">
// //                       <span className="block truncate">{event.title}</span>
// //                     </p>

// //                     {event.subtitle && (
// //                       <p className="mt-0.5 truncate text-[11px] text-slate-500">
// //                         {event.subtitle}
// //                       </p>
// //                     )}

// //                     <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
// //                       <Clock className="h-4 w-4 text-slate-400" />
// //                       <span>{event.duration}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import Card from "../../../shared/components/ui/Card";
// import ProgressBar from "../../../shared/components/ui/ProgressBar";
// import type { WeeklyDay, WeeklyStats } from "../data/calendar.weekly.mock";
// import WeeklyEventCard from "./WeeklyEventCard";

// export type WeeklyViewProps = {
//   headerLabel: string; // kept for compatibility (not rendered now)
//   stats: WeeklyStats;
//   days: WeeklyDay[];
// };

// export default function WeeklyView({ stats, days }: WeeklyViewProps) {
//   const numberClass = "mt-1 text-2xl font-semibold text-slate-900";

//   return (
//     <div className="space-y-6">
//       {/* STATS */}
//       <Card className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-200">
//           <div className="md:px-5">
//             <div className="text-xs text-slate-500">Total Planned</div>
//             <div className={numberClass}>{stats.totalPlanned}</div>
//           </div>

//           <div className="md:px-5">
//             <div className="text-xs text-slate-500">Completed</div>
//             <div className={numberClass}>{stats.completed}</div>
//           </div>

//           <div className="md:px-5">
//             <div className="text-xs text-slate-500">Completion Rate</div>
//             <div className={numberClass}>{stats.completionRate}%</div>
//             <div className="mt-2">
//               <ProgressBar value={stats.completionRate} variant="green" />
//             </div>
//           </div>
//         </div>
//       </Card>

//       {/* ✅ DAYS GRID (KEY FIX: items-start so cards don't stretch) */}
//       <div
//         className="
//           grid gap-4 items-start
//           grid-cols-1
//           sm:grid-cols-2
//           md:grid-cols-3
//           lg:grid-cols-5
//           xl:grid-cols-7
//         "
//       >
//         {days.map((day) => (
//           <Card
//             key={day.id}
//             className="
//               self-start
//               rounded-2xl border border-slate-200 bg-white
//               p-3 sm:p-4
//               space-y-3
//             "
//           >
//             {/* Day header */}
//             <div className="text-center">
//               <p className="text-sm font-semibold text-slate-900">{day.label}</p>
//               <p className="text-xs text-slate-500">{day.date}</p>
//             </div>

//             {/* progress */}
//             <ProgressBar
//               value={day.minutesDone}
//               max={day.minutesTotal}
//               variant="green"
//             />

//             {/* minutes */}
//             <p className="text-center text-xs font-medium text-slate-500">
//               {day.minutesDone}/{day.minutesTotal} min
//             </p>

//             {/* ✅ events (use your designed card so text/icon layout matches image) */}
//             <div className="space-y-3">
//               {day.events.map((event: any) => (
//                 <WeeklyEventCard
//                   key={event.id}
//                   event={event}
//                   checked={Boolean(event.completed)}
//                 />
//               ))}
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

import Card from "../../../shared/components/ui/Card";
import ProgressBar from "../../../shared/components/ui/ProgressBar";
import type { WeeklyDay, WeeklyStats } from "../data/calendar.weekly.mock";
import WeeklyEventCard from "./WeeklyEventCard";

export type WeeklyViewProps = {
  headerLabel: string; // kept for compatibility (not rendered now)
  stats: WeeklyStats;
  days: WeeklyDay[];
};

export default function WeeklyView({ stats, days }: WeeklyViewProps) {
  const numberClass = "mt-1 text-2xl font-semibold text-slate-900";

  return (
    <div className="space-y-6">
      {/* STATS */}
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

      {/* ✅ DAYS GRID (FIX: stop stretching + match screenshot layout) */}
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
            {/* Day header */}
            <div className="text-center">
              <p className="text-base font-semibold text-slate-900">
                {day.label}
              </p>
              <p className="text-sm text-slate-500">{day.date}</p>
            </div>

            {/* Progress */}
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

            {/* Events */}
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