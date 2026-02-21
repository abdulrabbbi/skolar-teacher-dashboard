// import Badge from '../../../shared/components/ui/Badge';
// import Card from '../../../shared/components/ui/Card';
// import type {
//   ActivityItem,
//   AssessmentTypeItem,
//   DeadlineItem,
// } from '../data/assessments.mock';

// export type AssessmentSidePanelsProps = {
//   deadlines: DeadlineItem[];
//   activity: ActivityItem[];
//   types: AssessmentTypeItem[];
// };

// export default function AssessmentSidePanels({
//   deadlines,
//   activity,
//   types,
// }: AssessmentSidePanelsProps) {
//   return (
//     <div
//       className="
//         grid grid-cols-1 gap-4
//         md:grid-cols-2
//         xl:grid-cols-3
//       "
//     >
//       {/* =====================
//           THIS WEEK'S DEADLINES
//       ===================== */}
//       <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
//         <h3 className="text-sm font-semibold text-slate-900">
//           This Week&apos;s Deadlines
//         </h3>

//         <div className="space-y-2">
//           {deadlines.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between text-sm"
//             >
//               <span className="text-slate-700">{item.title}</span>
//               <span className="text-slate-500">{item.date}</span>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* =====================
//           RECENT ACTIVITY
//       ===================== */}
//       <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
//         <h3 className="text-sm font-semibold text-slate-900">
//           Recent Activity
//         </h3>

//         <div className="space-y-2">
//           {activity.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center gap-2 text-sm"
//             >
//               <span className="font-semibold text-slate-900">
//                 {item.value}
//               </span>
//               <span className="text-slate-500">{item.label}</span>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* =====================
//           ASSESSMENT TYPES
//       ===================== */}
//       <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
//         <h3 className="text-sm font-semibold text-slate-900">
//           Assessment Types
//         </h3>

//         <div className="space-y-2">
//           {types.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between text-sm"
//             >
//               <span className="text-slate-700">{item.label}</span>
//               <Badge variant="neutral">{item.value}</Badge>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   );
// }



import Card from "../../../shared/components/ui/Card";
import type {
  ActivityItem,
  AssessmentTypeItem,
  DeadlineItem,
} from "../data/assessments.mock";

export type AssessmentSidePanelsProps = {
  deadlines: DeadlineItem[];
  activity: ActivityItem[];
  types: AssessmentTypeItem[];
};

// Match screenshot dot colors
const typeDotColor = (label: string) => {
  const key = label.trim().toLowerCase();

  if (key === "sac") return "bg-violet-500";
  if (key === "test") return "bg-blue-600";
  if (key === "exam") return "bg-rose-500";
  if (key === "practice") return "bg-emerald-500";

  // fallback
  return "bg-slate-400";
};

export default function AssessmentSidePanels({
  deadlines,
  activity,
  types,
}: AssessmentSidePanelsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {/* =====================
          THIS WEEK'S DEADLINES
      ===================== */}
      <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <h3 className="text-sm font-semibold text-slate-900">
          This Week&apos;s Deadlines
        </h3>

        <div className="space-y-2">
          {deadlines.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-700">{item.title}</span>
              <span className="text-slate-500">{item.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* =====================
          RECENT ACTIVITY
      ===================== */}
      <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>

        <div className="space-y-2">
          {activity.map((item) => (
            <div key={item.id} className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-900">{item.value}</span>
              <span className="text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* =====================
          ASSESSMENT TYPES
      ===================== */}
      <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <h3 className="text-sm font-semibold text-slate-900">
          Assessment Types
        </h3>

        <div className="space-y-3">
          {types.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              {/* left: dot + label */}
              <div className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${typeDotColor(item.label)}`}
                />
                <span className="text-slate-600">{item.label}</span>
              </div>

              {/* right: number */}
              <span className="text-slate-900 font-medium tabular-nums">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
