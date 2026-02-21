// // import {
// //   Target,
// //   Brain,
// //   Zap,
// //   ChevronRight,
// //   Clock,
// //   HelpCircle,
// // } from 'lucide-react';
// // import Card from '../../../shared/components/ui/Card';
// // import type { QuickLaunchTemplate } from '../data/liveQuiz.mock';

// // export type QuickLaunchTemplatesProps = {
// //   templates: QuickLaunchTemplate[];
// // };

// // const ICONS = {
// //   differentiation: {
// //     icon: <Target className="h-5 w-5 text-blue-600" />,
// //     bg: 'bg-blue-100',
// //   },
// //   integration: {
// //     icon: <Brain className="h-5 w-5 text-purple-600" />,
// //     bg: 'bg-purple-100',
// //   },
// //   probability: {
// //     icon: <Zap className="h-5 w-5 text-emerald-600" />,
// //     bg: 'bg-emerald-100',
// //   },
// // } as const;

// // export default function QuickLaunchTemplates({
// //   templates,
// // }: QuickLaunchTemplatesProps) {
// //   return (
// //     <section>
// //       {/* ONE MAIN CARD */}
// //       <Card className="p-4 h-full flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
// //         {/* SMALL HEADING */}
// //         <h3 className="text-sm font-semibold text-slate-900 mb-3">
// //           Quick Launch Templates
// //         </h3>

// //         {/* INNER ITEMS */}
// //         <div className="space-y-2 flex-1">
// //           {templates.map((template) => {
// //             const config = ICONS[template.type];

// //             return (
// //               <button
// //                 key={template.id}
// //                 className="group w-full flex items-center justify-between gap-4 rounded-lg p-3 text-left transition hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
// //               >
// //                 {/* LEFT */}
// //                 <div className="flex items-center gap-3">
// //                   <div
// //                     className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.bg} transition-transform duration-200 group-hover:scale-110`}
// //                   >
// //                     {config.icon}
// //                   </div>

// //                   <div>
// //                     <p className="text-sm font-medium text-slate-900">
// //                       {template.title}
// //                     </p>

// //                     <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
// //                       <span className="flex items-center gap-1">
// //                         <HelpCircle className="h-3.5 w-3.5" />
// //                         {template.questions} questions
// //                       </span>

// //                       <span className="flex items-center gap-1">
// //                         <Clock className="h-3.5 w-3.5" />
// //                         {template.minutes} minutes
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* RIGHT */}
// //                 <ChevronRight className="h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 group-hover:scale-110" />
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </Card>
// //     </section>
// //   );
// // }


// import {
//   Target,
//   Brain,
//   Zap,
//   ChevronRight,
//   Clock,
//   HelpCircle,
// } from "lucide-react";
// import Card from "../../../shared/components/ui/Card";
// import type { QuickLaunchTemplate } from "../data/liveQuiz.mock";

// export type QuickLaunchTemplatesProps = {
//   templates: QuickLaunchTemplate[];
// };

// const ICONS = {
//   differentiation: {
//     icon: <Target className="h-5 w-5 text-white" />,
//     tile: "bg-blue-600",
//   },
//   integration: {
//     icon: <Brain className="h-5 w-5 text-white" />,
//     tile: "bg-purple-600",
//   },
//   probability: {
//     icon: <Zap className="h-5 w-5 text-white" />,
//     tile: "bg-emerald-600",
//   },
// } as const;

// export default function QuickLaunchTemplates({
//   templates,
// }: QuickLaunchTemplatesProps) {
//   return (
//     <section className="w-full">
//       {/* MAIN CARD */}
//       <Card className="p-4 sm:p-5">
//         {/* Heading like screenshot */}
//         <h3 className="text-lg font-semibold text-slate-900">
//           Quick Launch Templates
//         </h3>

//         {/* Rows */}
//         <div className="mt-4 space-y-4">
//           {templates.map((template) => {
//             const config = ICONS[template.type];

//             return (
//               <button
//                 key={template.id}
//                 type="button"
//                 className="
//                   group w-full
//                   rounded-2xl border border-slate-200 bg-white
//                   px-4 py-4 sm:px-5
//                   text-left
//                   transition-all duration-200
//                   hover:-translate-y-0.5 hover:shadow-md
//                   focus:outline-none focus:ring-2 focus:ring-emerald-200
//                 "
//               >
//                 <div className="flex items-center justify-between gap-4">
//                   {/* LEFT */}
//                   <div className="flex min-w-0 items-center gap-4">
//                     {/* solid icon tile */}
//                     <div
//                       className={[
//                         "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
//                         config.tile,
//                         "shadow-sm",
//                         "transition-transform duration-200 group-hover:scale-105",
//                       ].join(" ")}
//                     >
//                       {config.icon}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-base font-semibold text-slate-900">
//                         {template.title}
//                       </p>

//                       <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-500">
//                         <span className="inline-flex items-center gap-2">
//                           <HelpCircle className="h-4 w-4 text-slate-400" />
//                           {template.questions} questions
//                         </span>

//                         <span className="inline-flex items-center gap-2">
//                           <Clock className="h-4 w-4 text-slate-400" />
//                           {template.minutes} minutes
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* RIGHT */}
//                   <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5" />
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </Card>
//     </section>
//   );
// }

import { Target, Brain, Zap, ChevronRight, Clock, HelpCircle } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import type { QuickLaunchTemplate } from "../data/liveQuiz.mock";

export type QuickLaunchTemplatesProps = {
  templates: QuickLaunchTemplate[];
};

const ICONS = {
  differentiation: {
    icon: <Target className="h-5 w-5 text-white" />,
    tile: "bg-blue-600",
  },
  integration: {
    icon: <Brain className="h-5 w-5 text-white" />,
    tile: "bg-purple-600",
  },
  probability: {
    icon: <Zap className="h-5 w-5 text-white" />,
    tile: "bg-emerald-600",
  },
} as const;

export default function QuickLaunchTemplates({ templates }: QuickLaunchTemplatesProps) {
  return (
    <section className="w-full h-full">
      {/* ✅ h-full + flex so it stretches same height as left */}
      <Card className="h-full p-4 sm:p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900">
          Quick Launch Templates
        </h3>

        {/* ✅ flex-1 + overflow for small screens */}
        <div className="mt-4 space-y-4 flex-1 min-h-0 overflow-auto pr-1">
          {templates.map((template) => {
            const config = ICONS[template.type];

            return (
              <button
                key={template.id}
                type="button"
                className="
                  group w-full
                  rounded-2xl border border-slate-200 bg-white
                  px-4 py-4 sm:px-5
                  text-left
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-md
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={[
                        "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
                        config.tile,
                        "shadow-sm",
                      ].join(" ")}
                    >
                      {config.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-slate-900">
                        {template.title}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-slate-400" />
                          {template.questions} questions
                        </span>

                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          {template.minutes} minutes
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </section>
  );
}