// // import Card from "../../../shared/components/ui/Card";
// // import type {
// //   ActivityItem,
// //   AssessmentTypeItem,
// //   DeadlineItem,
// // } from "../data/assessments.mock";

// // export type AssessmentSidePanelsProps = {
// //   deadlines: DeadlineItem[];
// //   activity: ActivityItem[];
// //   types: AssessmentTypeItem[];
// // };


// // const typeDotColor = (label: string) => {
// //   const key = label.trim().toLowerCase();

// //   if (key === "sac") return "bg-violet-500";
// //   if (key === "test") return "bg-blue-600";
// //   if (key === "exam") return "bg-rose-500";
// //   if (key === "practice") return "bg-emerald-500";

// //   return "bg-slate-400";
// // };

// // export default function AssessmentSidePanels({
// //   deadlines,
// //   activity,
// //   types,
// // }: AssessmentSidePanelsProps) {
// //   return (
// //     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

// //       <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
// //         <h3 className="text-sm font-semibold text-slate-900">
// //           This Week&apos;s Deadlines
// //         </h3>

// //         <div className="space-y-2">
// //           {deadlines.map((item) => (
// //             <div
// //               key={item.id}
// //               className="flex items-center justify-between text-sm"
// //             >
// //               <span className="text-slate-700">{item.title}</span>
// //               <span className="text-slate-500">{item.date}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </Card>

// //       <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
// //         <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>

// //         <div className="space-y-2">
// //           {activity.map((item) => (
// //             <div key={item.id} className="flex items-center gap-2 text-sm">
// //               <span className=" text-gray-600">{item.value}</span>
// //               <span className="text-slate-500">{item.label}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </Card>

// //       <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
// //         <h3 className="text-sm font-semibold text-slate-900">
// //           Assessment Types
// //         </h3>

// //         <div className="space-y-3">
// //           {types.map((item) => (
// //             <div
// //               key={item.id}
// //               className="flex items-center justify-between text-sm"
// //             >
// //               {/* left: dot + label */}
// //               <div className="flex items-center gap-3">
// //                 <span
// //                   className={`h-3 w-3 rounded-full ${typeDotColor(item.label)}`}
// //                 />
// //                 <span className="text-slate-600">{item.label}</span>
// //               </div>

// //               {/* right: number */}
// //               <span className="text-slate-900 font-medium tabular-nums">
// //                 {item.value}
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // }



// import Card from "../../../shared/components/ui/Card";
// import type {
//   ActivityItem,
//   AssessmentTypeItem,
//   DeadlineItem,
// } from "../data/assessments.mock";

// export type AssessmentSidePanelsProps = {
//   deadlines: DeadlineItem[];
//   activity: ActivityItem[];
//   types: AssessmentTypeItem[];
// };

// const typeDotColor = (label: string) => {
//   const key = label.trim().toLowerCase();

//   if (key === "sac") return "bg-violet-500";
//   if (key === "test") return "bg-blue-600";
//   if (key === "exam") return "bg-rose-500";
//   if (key === "practice") return "bg-emerald-500";

//   return "bg-slate-400";
// };

// export default function AssessmentSidePanels({
//   deadlines,
//   activity,
//   types,
// }: AssessmentSidePanelsProps) {
//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//       {/* This Week's Deadlines */}
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
//               {/* ✅ date should be black like figma */}
//               <span className="text-slate-900">{item.date}</span>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Recent Activity */}
//       <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
//         <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>

//         <div className="space-y-2">
//           {activity.map((item) => (
//             <div key={item.id} className="space-y-1 text-sm">
//               {/* ✅ value should be BLACK */}
//               <div className="text-gray-300">{item.value}</div>

//               {/* ✅ label stays GREY */}
//               <div className="text-slate-500">{item.label}</div>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Assessment Types */}
//       <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
//         <h3 className="text-sm font-semibold text-slate-900">
//           Assessment Types
//         </h3>

//         <div className="space-y-3">
//           {types.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between text-sm"
//             >
//               {/* left: dot + label */}
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`h-3 w-3 rounded-full ${typeDotColor(item.label)}`}
//                 />
//                 <span className="text-slate-600">{item.label}</span>
//               </div>

//               {/* right: number */}
//               <span className="text-slate-900 font-medium tabular-nums">
//                 {item.value}
//               </span>
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

const typeDotColor = (label: string) => {
  const key = label.trim().toLowerCase();

  if (key === "sac") return "bg-violet-500";
  if (key === "test") return "bg-blue-600";
  if (key === "exam") return "bg-rose-500";
  if (key === "practice") return "bg-emerald-500";

  return "bg-slate-400";
};

export default function AssessmentSidePanels({
  deadlines,
  activity,
  types,
}: AssessmentSidePanelsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {/* This Week's Deadlines */}
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
              {/* ✅ date should be black */}
              <span className="text-slate-900">{item.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>

        <div className="space-y-4">
          {activity.map((item) => (
            <div key={item.id} className="space-y-1 text-sm">
              {/* ✅ value should be BLACK: "18 new submissions", "8 marked" */}
              <div className="text-slate-900">{item.value}</div>

              {/* ✅ label should be GREY: "Weekly Quiz: Integration", "SAC 2 Calculus" */}
              <div className="text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Assessment Types */}
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