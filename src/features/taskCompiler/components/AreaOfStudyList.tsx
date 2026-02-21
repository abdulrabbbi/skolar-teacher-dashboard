
// import { ChevronRight } from "lucide-react";
// import Badge from "../../../shared/components/ui/Badge";
// import Card from "../../../shared/components/ui/Card";
// import { cn } from "../../../shared/lib/cn";
// import type { AreaOfStudyItem, SubjectCard } from "../data/taskCompiler.mock";
// import { taskCompilerCopy } from "../data/taskCompiler.mock";
// import SubjectIcon from "./SubjectIcon";

// export default function AreaOfStudyList({
//   subject,
//   areas,
//   onSelectArea,
// }: {
//   subject: SubjectCard;
//   areas: AreaOfStudyItem[];
//   onSelectArea: (area: AreaOfStudyItem) => void;
// }) {
//   // Group by unit like screenshot
//   const groups = areas.reduce<Record<string, AreaOfStudyItem[]>>((acc, a) => {
//     (acc[a.unit] ||= []).push(a);
//     return acc;
//   }, {});

//   const unitKeys = Object.keys(groups);

//   return (
//     <section className="space-y-5">
//       {/* Header with subject icon */}
//       <div className="flex items-center gap-4">
//         <SubjectIcon icon={subject.icon} color={subject.color} size={56} />
//         <div>
//           <h2 className="text-2xl font-semibold text-slate-900">
//             {subject.title}
//           </h2>
//           <p className="text-sm text-slate-500">
//             {taskCompilerCopy.areaSelectionSubtitle}
//           </p>
//         </div>
//       </div>

//       {unitKeys.map((unit) => (
//         <div key={unit} className="space-y-3">
//           <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
//             {unit}
//           </p>

//           <div className="space-y-3">
//             {groups[unit]!.map((a) => (
//               <Card
//                 key={a.id}
//                 role="button"
//                 tabIndex={0}
//                 onClick={() => onSelectArea(a)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     onSelectArea(a);
//                   }
//                 }}
//                 className={cn(
//                   "rounded-2xl border border-slate-200 bg-white p-5",
//                   "cursor-pointer transition hover:shadow-md hover:-translate-y-0.5",
//                 )}
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="min-w-0">
//                     <div className="flex items-center gap-3">
//                       <Badge variant="neutral">{unit}</Badge>
//                       <p className="text-base font-semibold text-slate-900">
//                         {a.title}
//                       </p>
//                     </div>

//                     <p className="mt-2 text-sm text-slate-500">{a.description}</p>
//                   </div>

//                   <ChevronRight className="mt-1 h-5 w-5 text-slate-400" />
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

import { ChevronRight } from "lucide-react";
import { cn } from "../../../shared/lib/cn";
import type { AreaOfStudyItem } from "../data/taskCompiler.mock";

function asUnitPill(unit: string) {
  const u = String(unit ?? "").trim();
  if (!u) return "Unit";
  return u.toLowerCase().startsWith("unit") ? u : `Unit ${u}`;
}

export default function AreaOfStudyList({
  areas,
  onSelectArea,
}: {
  areas: AreaOfStudyItem[];
  onSelectArea: (area: AreaOfStudyItem) => void;
}) {
  return (
    <div className="space-y-4">
      {areas.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={() => onSelectArea(a)}
          className={cn(
            "w-full text-left",
            "rounded-2xl border border-slate-200 bg-white px-5 py-4",
            "transition hover:shadow-sm",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200",
          )}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {asUnitPill(a.unit)}
                </span>
                <h3 className="truncate text-base font-semibold text-slate-900">
                  {a.title}
                </h3>
              </div>

              <p className="mt-2 truncate text-sm text-slate-500">
                {a.description}
              </p>
            </div>

            <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
          </div>
        </button>
      ))}
    </div>
  );
}