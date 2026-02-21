
// // import React from "react";
// // import { Eye, Pencil, MoreVertical, ChevronDown } from "lucide-react";

// // import Badge, { type BadgeVariant } from "../../../shared/components/ui/Badge";
// // import Card from "../../../shared/components/ui/Card";
// // import Table from "../../../shared/components/ui/Table";
// // import type { AssessmentRow, AssessmentStatus } from "../data/assessments.mock";

// // export type AssessmentsTableProps = {
// //   rows: AssessmentRow[];
// // };

// // const statusVariant: Record<
// //   AssessmentStatus,
// //   "success" | "warning" | "neutral" | "danger"
// // > = {
// //   Marking: "warning",
// //   Active: "success",
// //   Draft: "neutral",
// //   Complete: "success",
// // };

// // const typeVariant: Record<string, BadgeVariant> = {
// //   SAC: "warning",
// //   Test: "neutral",
// //   Exam: "danger",
// // };

// // function FilterPill({ label }: { label: string }) {
// //   return (
// //     <button
// //       type="button"
// //       className="
// //         inline-flex items-center gap-2
// //         rounded-xl border border-slate-200 bg-slate-50
// //         px-4 py-2 text-sm font-medium text-slate-700
// //         hover:bg-slate-100 transition
// //         whitespace-nowrap
// //       "
// //     >
// //       {label}
// //       <ChevronDown className="h-4 w-4 text-slate-400" />
// //     </button>
// //   );
// // }

// // function ActionIconButton({
// //   children,
// //   ariaLabel,
// // }: {
// //   children: React.ReactNode;
// //   ariaLabel: string;
// // }) {
// //   return (
// //     <button
// //       type="button"
// //       aria-label={ariaLabel}
// //       className="
// //         grid h-10 w-10 place-items-center
// //         rounded-xl border border-slate-200 bg-white
// //         hover:bg-slate-50 transition
// //       "
// //     >
// //       {children}
// //     </button>
// //   );
// // }

// // export default function AssessmentsTable({ rows }: AssessmentsTableProps) {
// //   return (
// //     <Card className="p-0 border border-slate-200 bg-white">
// //       {/* HEADER */}
// //       <div className="flex flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
// //         <h2 className="text-xl font-semibold text-slate-900">Assessments</h2>

// //         <div className="flex flex-wrap items-center gap-3">
// //           <FilterPill label="All Status" />
// //           <FilterPill label="All Classes" />
// //         </div>
// //       </div>

// //       <div className="h-px bg-slate-200" />

// //       {/* ===================== */}
// //       {/* MOBILE (no scroll)    */}
// //       {/* ===================== */}
// //       <div className="block md:hidden">
// //         <div className="divide-y divide-slate-100">
// //           {rows.map((row) => (
// //             <div key={row.id} className="px- py-4">
// //               <div className="flex items-start justify-between gap-3">
// //                 <div className="min-w-0">
// //                   {/* Title - always visible, wraps */}
// //                   <div className="text-sm font-semibold leading-5 text-slate-900">
// //                     {row.title}
// //                   </div>

// //                   <div className="mt-2 flex flex-wrap items-center gap-2">
// //                     <Badge variant={typeVariant[row.type] ?? "neutral"}>
// //                       {row.type}
// //                     </Badge>
// //                     <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <ActionIconButton ariaLabel="View">
// //                     <Eye className="h-4 w-4 text-slate-700" />
// //                   </ActionIconButton>
// //                   <ActionIconButton ariaLabel="Edit">
// //                     <Pencil className="h-4 w-4 text-slate-700" />
// //                   </ActionIconButton>
// //                   <ActionIconButton ariaLabel="More">
// //                     <MoreVertical className="h-4 w-4 text-slate-700" />
// //                   </ActionIconButton>
// //                 </div>
// //               </div>

// //               <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y- text-sm">
// //                 <div className="text-slate-500">Class</div>
// //                 <div className="text-slate-900">{row.className}</div>

// //                 <div className="text-slate-500">Due Date</div>
// //                 <div className="text-slate-900">{row.dueDate}</div>

// //                 <div className="text-slate-500">Submissions</div>
// //                 <div className="text-slate-900">{row.submissions}</div>

// //                 <div className="text-slate-500">Marked</div>
// //                 <div className="text-slate-900">{row.marked}</div>

// //                 <div className="text-slate-500">Avg Score</div>
// //                 <div className="font-semibold text-slate-900">{row.avgScore}</div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ===================== */}
// //       {/* DESKTOP TABLE         */}
// //       {/* ===================== */}
// //       <div className="hidden md:block">
// //         <Table
// //           headers={[
// //             "Assessment",
// //             "Type",
// //             "Class",
// //             "Due Date",
// //             "Status",
// //             "Submissions",
// //             "Marked",
// //             "Avg Score",
// //             "Actions",
// //           ]}
// //         >
// //           {rows.map((row) => (
// //             <tr key={row.id} className="border-t border-slate-100 align-top">
// //               {/* Assessment (no truncate, wraps, smaller like screenshot) */}
// //               <td className="px-4 py-4">
// //                 <div className="text-sm font-semibold leading-5 text-slate-900 whitespace-normal break-words">
// //                   {row.title}
// //                 </div>
// //               </td>

// //               <td className="px-4 py-5 whitespace-nowrap">
// //                 <Badge variant={typeVariant[row.type] ?? "neutral"}>{row.type}</Badge>
// //               </td>

// //               <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
// //                 {row.className}
// //               </td>

// //               <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
// //                 {row.dueDate}
// //               </td>

// //               <td className="px-4 py-5 whitespace-nowrap">
// //                 <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
// //               </td>

// //               <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
// //                 {row.submissions}
// //               </td>

// //               <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
// //                 {row.marked}
// //               </td>

// //               <td className="px-4 py-5 whitespace-nowrap text-sm font-semibold text-slate-900">
// //                 {row.avgScore}
// //               </td>

// //               <td className="px-6 py-5 whitespace-nowrap">
// //                 <div className="flex items-center justify-end gap-3">
// //                   <ActionIconButton ariaLabel="View">
// //                     <Eye className="h-4 w-4 text-slate-700" />
// //                   </ActionIconButton>
// //                   <ActionIconButton ariaLabel="Edit">
// //                     <Pencil className="h-4 w-4 text-slate-700" />
// //                   </ActionIconButton>
// //                   <ActionIconButton ariaLabel="More">
// //                     <MoreVertical className="h-4 w-4 text-slate-700" />
// //                   </ActionIconButton>
// //                 </div>
// //               </td>
// //             </tr>
// //           ))}
// //         </Table>
// //       </div>
// //     </Card>
// //   );
// // }


// import React from "react";
// import { Eye, Pencil, MoreVertical, ChevronDown } from "lucide-react";
// import Badge, { type BadgeVariant } from "../../../shared/components/ui/Badge";
// import Card from "../../../shared/components/ui/Card";
// import Table from "../../../shared/components/ui/Table";
// import type { AssessmentRow, AssessmentStatus } from "../data/assessments.mock";

// export type AssessmentsTableProps = {
//   rows: AssessmentRow[];
// };

// const statusVariant: Record<
//   AssessmentStatus,
//   "success" | "warning" | "neutral" | "danger"
// > = {
//   Marking: "warning",
//   Active: "success",
//   Draft: "neutral",
//   Complete: "success",
// };

// const typeVariant: Record<string, BadgeVariant> = {
//   SAC: "warning",
//   Test: "neutral",
//   Exam: "danger",
// };

// function FilterPill({ label }: { label: string }) {
//   return (
//     <button
//       type="button"
//       className="
//         inline-flex items-center gap-2
//         rounded-xl border border-slate-200 bg-slate-50
//         px-4 py-2 text-sm font-medium text-slate-700
//         hover:bg-slate-100 transition
//         whitespace-nowrap
//       "
//     >
//       {label}
//       <ChevronDown className="h-4 w-4 text-slate-400" />
//     </button>
//   );
// }

// function ActionIconButton({
//   children,
//   ariaLabel,
// }: {
//   children: React.ReactNode;
//   ariaLabel: string;
// }) {
//   return (
//     <button
//       type="button"
//       aria-label={ariaLabel}
//       className="
//         grid h-10 w-10 place-items-center
//         rounded-xl border border-slate-200 bg-white
//         hover:bg-slate-50 transition
//       "
//     >
//       {children}
//     </button>
//   );
// }

// export default function AssessmentsTable({ rows }: AssessmentsTableProps) {
//   return (
//     <Card className="w-full p-0 border border-slate-200 bg-white">
//       {/* HEADER */}
//       <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
//         <h2 className="text-xl font-semibold text-slate-900">Assessments</h2>

//         <div className="flex flex-wrap items-center gap-3">
//           <FilterPill label="All Status" />
//           <FilterPill label="All Classes" />
//         </div>
//       </div>

//       <div className="h-px bg-slate-200" />

//       {/* ===================== */}
//       {/* MOBILE: stacked rows  */}
//       {/* ===================== */}
//       <div className="block md:hidden">
//         <div className="divide-y divide-slate-100">
//           {rows.map((row) => (
//             <div key={row.id} className="px-6 py-4">
//               <div className="flex items-start justify-between gap-3">
//                 <div className="min-w-0">
//                   <div className="text-sm font-semibold text-slate-900 break-words">
//                     {row.title}
//                   </div>

//                   <div className="mt-2 flex flex-wrap items-center gap-2">
//                     <Badge variant={typeVariant[row.type] ?? "neutral"}>
//                       {row.type}
//                     </Badge>
//                     <Badge variant={statusVariant[row.status]}>
//                       {row.status}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <ActionIconButton ariaLabel="View">
//                     <Eye className="h-4 w-4 text-slate-700" />
//                   </ActionIconButton>
//                   <ActionIconButton ariaLabel="Edit">
//                     <Pencil className="h-4 w-4 text-slate-700" />
//                   </ActionIconButton>
//                   <ActionIconButton ariaLabel="More">
//                     <MoreVertical className="h-4 w-4 text-slate-700" />
//                   </ActionIconButton>
//                 </div>
//               </div>

//               <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
//                 <div className="text-slate-500">Class</div>
//                 <div className="text-slate-900">{row.className}</div>

//                 <div className="text-slate-500">Due Date</div>
//                 <div className="text-slate-900">{row.dueDate}</div>

//                 <div className="text-slate-500">Submissions</div>
//                 <div className="text-slate-900">{row.submissions}</div>

//                 <div className="text-slate-500">Marked</div>
//                 <div className="text-slate-900">{row.marked}</div>

//                 <div className="text-slate-500">Avg Score</div>
//                 <div className="font-semibold text-slate-900">{row.avgScore}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ===================== */}
//       {/* DESKTOP: exact table  */}
//       {/* ===================== */}
//       <div className="hidden md:block">
//         <Table
//           className="w-full"
//           headers={[
//             "Assessment",
//             "Type",
//             "Class",
//             "Due Date",
//             "Status",
//             "Submissions",
//             "Marked",
//             "Avg Score",
//             "Actions",
//           ]}
//         >
//           {rows.map((row) => (
//             <tr key={row.id} className="border-t border-slate-100 align-middle">
//               {/* ✅ Assessment: force ONE LINE + give it width */}
//               <td className="px-6 py-5 w-[38%]">
//                 <div className="text-sm font-semibold text-slate-900 whitespace-nowrap">
//                   {row.title}
//                 </div>
//               </td>

//               <td className="px-4 py-5 whitespace-nowrap">
//                 <Badge variant={typeVariant[row.type] ?? "neutral"}>
//                   {row.type}
//                 </Badge>
//               </td>

//               <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
//                 {row.className}
//               </td>

//               <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
//                 {row.dueDate}
//               </td>

//               <td className="px-4 py-5 whitespace-nowrap">
//                 <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
//               </td>

//               <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
//                 {row.submissions}
//               </td>

//               <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
//                 {row.marked}
//               </td>

//               <td className="px-4 py-5 whitespace-nowrap text-sm font-semibold text-slate-900">
//                 {row.avgScore}
//               </td>

//               <td className="px-6 py-5 whitespace-nowrap">
//                 <div className="flex items-center justify-end gap-3">
//                   <ActionIconButton ariaLabel="View">
//                     <Eye className="h-4 w-4 text-slate-700" />
//                   </ActionIconButton>
//                   <ActionIconButton ariaLabel="Edit">
//                     <Pencil className="h-4 w-4 text-slate-700" />
//                   </ActionIconButton>
//                   <ActionIconButton ariaLabel="More">
//                     <MoreVertical className="h-4 w-4 text-slate-700" />
//                   </ActionIconButton>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </Table>
//       </div>
//     </Card>
//   );
// }



import React from "react";
import { Eye, Pencil, MoreVertical, ChevronDown } from "lucide-react";
import Badge, { type BadgeVariant } from "../../../shared/components/ui/Badge";
import Card from "../../../shared/components/ui/Card";
import Table from "../../../shared/components/ui/Table";
import type { AssessmentRow, AssessmentStatus } from "../data/assessments.mock";

export type AssessmentsTableProps = {
  rows: AssessmentRow[];
};

const statusVariant: Record<
  AssessmentStatus,
  "success" | "warning" | "neutral" | "danger"
> = {
  Marking: "warning",
  Active: "success",
  Draft: "neutral",
  Complete: "success",
};

const typeVariant: Record<string, BadgeVariant> = {
  SAC: "warning",
  Test: "neutral",
  Exam: "danger",
};

function FilterPill({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="
        inline-flex items-center gap-2
        rounded-xl border border-slate-200 bg-slate-50
        px-4 py-2 text-sm font-medium text-slate-700
        hover:bg-slate-100 transition
        whitespace-nowrap
      "
    >
      {label}
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function ActionIconButton({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="
        grid h-9 w-9 place-items-center
        rounded-xl border border-slate-200 bg-white
        hover:bg-slate-50 transition
      "
    >
      {children}
    </button>
  );
}

export default function AssessmentsTable({ rows }: AssessmentsTableProps) {
  return (
    <Card className="w-full overflow-hidden p-0 border border-slate-200 bg-white">
      {/* HEADER */}
      <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Assessments</h2>

        <div className="flex flex-wrap items-center gap-3">
          <FilterPill label="All Status" />
          <FilterPill label="All Classes" />
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      {/* ===================================================== */}
      {/* MOBILE + TABLET (< lg): stacked rows, NO horizontal scroll */}
      {/* ===================================================== */}
      <div className="block lg:hidden">
        <div className="divide-y divide-slate-100">
          {rows.map((row) => (
            <div key={row.id} className="px-6 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  {/* Title wraps naturally on small screens (full visible) */}
                  <div className="text-sm font-semibold text-slate-900 break-words">
                    {row.title}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant={typeVariant[row.type] ?? "neutral"}>
                      {row.type}
                    </Badge>
                    <Badge variant={statusVariant[row.status]}>
                      {row.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <ActionIconButton ariaLabel="View">
                    <Eye className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                  <ActionIconButton ariaLabel="Edit">
                    <Pencil className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                  <ActionIconButton ariaLabel="More">
                    <MoreVertical className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                </div>
              </div>

              {/* details grid */}
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="text-slate-500">Class</div>
                <div className="text-slate-900 break-words">{row.className}</div>

                <div className="text-slate-500">Due Date</div>
                <div className="text-slate-900">{row.dueDate}</div>

                <div className="text-slate-500">Submissions</div>
                <div className="text-slate-900">{row.submissions}</div>

                <div className="text-slate-500">Marked</div>
                <div className="text-slate-900">{row.marked}</div>

                <div className="text-slate-500">Avg Score</div>
                <div className="font-semibold text-slate-900">{row.avgScore}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================== */}
      {/* DESKTOP (lg+): exact table layout like screenshot */}
      {/* ===================================================== */}
      <div className="hidden lg:block">
        <Table
          className="w-full table-auto"
          headers={[
            "Assessment",
            "Type",
            "Class",
            "Due Date",
            "Status",
            "Submissions",
            "Marked",
            "Avg Score",
            "Actions",
          ]}
        >
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-100 align-middle">
              {/* Assessment (ONE LINE, straight like screenshot) */}
              <td className="px-6 py-5 w-[38%]">
                <div className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                  {row.title}
                </div>
              </td>

              <td className="px-4 py-5 whitespace-nowrap">
                <Badge variant={typeVariant[row.type] ?? "neutral"}>
                  {row.type}
                </Badge>
              </td>

              <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
                {row.className}
              </td>

              <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
                {row.dueDate}
              </td>

              <td className="px-4 py-5 whitespace-nowrap">
                <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
              </td>

              <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
                {row.submissions}
              </td>

              <td className="px-4 py-5 whitespace-nowrap text-sm text-slate-800">
                {row.marked}
              </td>

              <td className="px-4 py-5 whitespace-nowrap text-sm font-semibold text-slate-900">
                {row.avgScore}
              </td>

              {/* Actions (kept inside table width) */}
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center justify-end gap-3">
                  <ActionIconButton ariaLabel="View">
                    <Eye className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                  <ActionIconButton ariaLabel="Edit">
                    <Pencil className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                  <ActionIconButton ariaLabel="More">
                    <MoreVertical className="h-4 w-4 text-slate-700" />
                  </ActionIconButton>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </Card>
  );
}
