// // import { useState } from 'react';
// // import Badge from '../../../shared/components/ui/Badge';
// // import Button from '../../../shared/components/ui/Button';
// // import Card from '../../../shared/components/ui/Card';
// // import ProgressBar from '../../../shared/components/ui/ProgressBar';
// // import SearchInput from '../../../shared/components/ui/SearchInput';
// // import Table from '../../../shared/components/ui/Table';
// // import { Eye, Search } from 'lucide-react';
// // import type { StudentRow, StudentStatus } from '../data/students.mock';

// // export type StudentsTableProps = {
// //   students: StudentRow[];
// // };

// // type Filter = 'all' | 'onTrack' | 'atRisk';

// // const statusVariant: Record<StudentStatus, 'success' | 'danger'> = {
// //   'On Track': 'success',
// //   'At Risk': 'danger',
// // };

// // const progressVariant = (value: number) => {
// //   if (value >= 75) return 'green' as const;
// //   if (value >= 60) return 'orange' as const;
// //   return 'red' as const;
// // };

// // export default function StudentsTable({ students }: StudentsTableProps) {
// //   const [filter, setFilter] = useState<Filter>('all');

// //   const filteredStudents = students.filter((student) => {
// //     if (filter === 'onTrack') return student.status === 'On Track';
// //     if (filter === 'atRisk') return student.status === 'At Risk';
// //     return true;
// //   });

// //   return (
// //     <section className="space-y-4">
// //       <Card className="p-0 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
// //         {/* HEADER */}
// //         <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
// //           <div>
// //             <h4 className="text-base font-semibold text-slate-900">
// //               Students
// //             </h4>
// //           </div>

// //           {/* SEARCH + FILTERS */}
// //           <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
// //             {/* SEARCH */}
// //             <div className="relative w-full sm:w-64">
// //               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
// //               <SearchInput placeholder="Search students..." className="pl-9" />
// //             </div>

// //             {/* FILTER BUTTONS */}
// //             <div className="flex flex-wrap items-center gap-2">
// //               <Button
// //                 size="sm"
// //                 variant={filter === 'all' ? 'primary' : 'outline'}
// //                 onClick={() => setFilter('all')}
// //                 className="transition-all duration-200 hover:-translate-y-0.5"
// //               >
// //                 All Students
// //               </Button>
// //               <Button
// //                 size="sm"
// //                 variant={filter === 'onTrack' ? 'primary' : 'outline'}
// //                 onClick={() => setFilter('onTrack')}
// //                 className="transition-all duration-200 hover:-translate-y-0.5"
// //               >
// //                 On Track
// //               </Button>
// //               <Button
// //                 size="sm"
// //                 variant={filter === 'atRisk' ? 'primary' : 'outline'}
// //                 onClick={() => setFilter('atRisk')}
// //                 className="transition-all duration-200 hover:-translate-y-0.5"
// //               >
// //                 At Risk
// //               </Button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* TABLE */}
// //         <Table
// //           className="rounded-none border-0"
// //           headers={[
// //             'Student',
// //             'Status',
// //             'Accuracy',
// //             'Confidence',
// //             'Questions',
// //             'Weak Topics',
// //             'Last Active',
// //             'Action',
// //           ]}
// //         >
// //           {filteredStudents.map((student) => (
// //             <tr
// //               key={student.id}
// //               className="align-middle transition-all duration-200 hover:bg-slate-50"
// //             >
// //               {/* STUDENT */}
// //               <td className="px-4 py-4">
// //                 <p className="text-sm font-semibold text-slate-900">
// //                   {student.name}
// //                 </p>
// //                 <p className="text-xs text-slate-500">{student.email}</p>
// //               </td>

// //               {/* STATUS */}
// //               <td className="px-4 py-4">
// //                 <Badge variant={statusVariant[student.status]}>
// //                   {student.status}
// //                 </Badge>
// //               </td>

// //               {/* ACCURACY */}
// //               <td className="px-4 py-4 w-40">
// //                 <div className="space-y-1">
// //                   <span className="text-xs font-medium text-slate-700">
// //                     {student.accuracy}%
// //                   </span>
// //                   <ProgressBar
// //                     value={student.accuracy}
// //                     variant={progressVariant(student.accuracy)}
// //                   />
// //                 </div>
// //               </td>

// //               {/* CONFIDENCE (FIXED) */}
// //               <td className="px-4 py-4 w-40">
// //                 <div className="space-y-1">
// //                   <span className="text-xs font-medium text-slate-700">
// //                     {student.confidence}%
// //                   </span>
// //                   <ProgressBar
// //                     value={student.confidence}
// //                     variant={progressVariant(student.confidence)}
// //                   />
// //                 </div>
// //               </td>

// //               {/* QUESTIONS */}
// //               <td className="px-4 py-4 text-sm text-slate-700">
// //                 {student.questions}
// //               </td>

// //               {/* WEAK TOPICS */}
// //               <td className="px-4 py-4">
// //                 <div className="flex flex-wrap gap-1">
// //                   {student.weakTopics.map((topic) => (
// //                     <Badge key={topic} variant="neutral" className="text-xs">
// //                       {topic}
// //                     </Badge>
// //                   ))}
// //                 </div>
// //               </td>

// //               {/* LAST ACTIVE */}
// //               <td className="px-4 py-4 text-sm text-slate-500">
// //                 {student.lastActive}
// //               </td>

// //               {/* ACTION */}
// //               <td className="px-4 py-4">
// //                 <Button
// //                   size="sm"
// //                   variant="outline"
// //                   className="flex items-center gap-2 whitespace-nowrap transition-all duration-200 hover:scale-105"
// //                 >
// //                   <Eye className="h-4 w-4" />
// //                   View Details
// //                 </Button>
// //               </td>
// //             </tr>
// //           ))}
// //         </Table>
// //       </Card>
// //     </section>
// //   );
// // }



// import { useMemo, useState } from "react";
// import Badge from "../../../shared/components/ui/Badge";
// import Button from "../../../shared/components/ui/Button";
// import Card from "../../../shared/components/ui/Card";
// import SearchInput from "../../../shared/components/ui/SearchInput";
// import Table from "../../../shared/components/ui/Table";
// import {
//   Eye,
//   Search,
//   CheckCircle2,
//   AlertTriangle,
// } from "lucide-react";
// import type { StudentRow, StudentStatus } from "../data/students.mock";

// export type StudentsTableProps = {
//   students: StudentRow[];
// };

// type Filter = "all" | "onTrack" | "atRisk";

// const statusVariant: Record<StudentStatus, "success" | "danger"> = {
//   "On Track": "success",
//   "At Risk": "danger",
// };

// function clamp(n: number, min = 0, max = 100) {
//   return Math.min(max, Math.max(min, n));
// }

// function meterColor(value: number) {
//   if (value >= 75) return "bg-emerald-500";
//   if (value >= 60) return "bg-orange-500";
//   return "bg-rose-500";
// }

// /**
//  * Inline percentage + bar (matches screenshot: "84%  [bar]")
//  */
// function InlineMeter({ value }: { value: number }) {
//   const w = clamp(value);

//   return (
//     <div className="flex items-center gap-3">
//       <span className="w-10 text-sm font-semibold text-slate-900 tabular-nums">
//         {value}%
//       </span>

//       <div className="h-2 w-[92px] overflow-hidden rounded-full bg-slate-200">
//         <div
//           className={`h-full ${meterColor(value)} rounded-full`}
//           style={{ width: `${w}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// /**
//  * Status pill with icon + single-line content
//  */
// function StatusPill({ status }: { status: StudentStatus }) {
//   const isOnTrack = status === "On Track";

//   return (
//     <Badge
//       variant={statusVariant[status]}
//       className="
//         inline-flex items-center gap-1.5
//         whitespace-nowrap rounded-full
//         px-2.5 py-1 text-xs font-medium
//       "
//     >
//       {isOnTrack ? (
//         <CheckCircle2 className="h-3.5 w-3.5" />
//       ) : (
//         <AlertTriangle className="h-3.5 w-3.5" />
//       )}
//       <span>{status}</span>
//     </Badge>
//   );
// }

// export default function StudentsTable({ students }: StudentsTableProps) {
//   const [filter, setFilter] = useState<Filter>("all");
//   const [query, setQuery] = useState("");

//   const filteredStudents = useMemo(() => {
//     const q = query.trim().toLowerCase();

//     return students.filter((student) => {
//       const matchesFilter =
//         filter === "onTrack"
//           ? student.status === "On Track"
//           : filter === "atRisk"
//             ? student.status === "At Risk"
//             : true;

//       const matchesQuery = !q
//         ? true
//         : student.name.toLowerCase().includes(q) ||
//           student.email.toLowerCase().includes(q);

//       return matchesFilter && matchesQuery;
//     });
//   }, [students, filter, query]);

//   return (
//     <section className="space-y-4">
//       <Card className="p-0">
//         {/* HEADER */}
//         <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h4 className="text-base font-semibold text-slate-900">Students</h4>
//           </div>

//           {/* SEARCH + FILTERS */}
//           <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
//             {/* SEARCH */}
//             <div className="relative w-full sm:w-[340px]">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//               <SearchInput
//                 placeholder="Search students..."
//                 className="pl-9"
//                 value={query}
//                 onChange={(e: any) => setQuery(e.target.value)}
//               />
//             </div>

//             {/* FILTER BUTTONS */}
//             <div className="flex flex-wrap items-center gap-2">
//               <Button
//                 size="sm"
//                 variant={filter === "all" ? "primary" : "outline"}
//                 onClick={() => setFilter("all")}
//                 className="whitespace-nowrap"
//               >
//                 All Students
//               </Button>

//               <Button
//                 size="sm"
//                 variant={filter === "onTrack" ? "primary" : "outline"}
//                 onClick={() => setFilter("onTrack")}
//                 className="whitespace-nowrap"
//               >
//                 On Track
//               </Button>

//               <Button
//                 size="sm"
//                 variant={filter === "atRisk" ? "primary" : "outline"}
//                 onClick={() => setFilter("atRisk")}
//                 className="whitespace-nowrap"
//               >
//                 At Risk
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* TABLE */}
//         <Table
//           className="rounded-none border-0"
//           headers={[
//             "Name / Email",
//             "Status",
//             "Accuracy",
//             "Confidence",
//             "Questions",
//             "Weak Topics",
//             "Last Active",
//             "Actions",
//           ]}
//         >
//           {filteredStudents.map((student) => {
//             const topics = student.weakTopics.slice(0, 2);
//             const extra = student.weakTopics.length - topics.length;

//             return (
//               <tr
//                 key={student.id}
//                 className="align-middle border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
//               >
//                 {/* NAME / EMAIL */}
//                 <td className="px-5 py-4">
//                   <div className="min-w-[220px]">
//                     <p className="text-sm font-semibold text-slate-900">
//                       {student.name}
//                     </p>
//                     <p className="text-xs text-slate-500">{student.email}</p>
//                   </div>
//                 </td>

//                 {/* STATUS */}
//                 <td className="px-5 py-4">
//                   <StatusPill status={student.status} />
//                 </td>

//                 {/* ACCURACY */}
//                 <td className="px-5 py-4">
//                   <InlineMeter value={student.accuracy} />
//                 </td>

//                 {/* CONFIDENCE */}
//                 <td className="px-5 py-4">
//                   <InlineMeter value={student.confidence} />
//                 </td>

//                 {/* QUESTIONS */}
//                 <td className="px-5 py-4 text-sm text-slate-700 tabular-nums">
//                   {student.questions}
//                 </td>

//                 {/* WEAK TOPICS */}
//                 <td className="px-5 py-4">
//                   <div className="flex items-center gap-2 whitespace-nowrap">
//                     {topics.map((topic) => (
//                       <Badge
//                         key={topic}
//                         variant="neutral"
//                         className="shrink-0 rounded-full px-2.5 py-1 text-xs"
//                       >
//                         {topic}
//                       </Badge>
//                     ))}

//                     {extra > 0 && (
//                       <span className="text-xs text-slate-500">+{extra}</span>
//                     )}
//                   </div>
//                 </td>

//                 {/* LAST ACTIVE */}
//                 <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">
//                   {student.lastActive}
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="px-5 py-4">
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3"
//                   >
//                     <Eye className="h-4 w-4" />
//                     View Details
//                   </Button>
//                 </td>
//               </tr>
//             );
//           })}
//         </Table>
//       </Card>
//     </section>
//   );
// }


import { useMemo, useState } from "react";
import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import SearchInput from "../../../shared/components/ui/SearchInput";
import Table from "../../../shared/components/ui/Table";
import { Eye, Search, CheckCircle2, AlertTriangle } from "lucide-react";
import type { StudentRow, StudentStatus } from "../data/students.mock";

export type StudentsTableProps = {
  students: StudentRow[];
};

type Filter = "all" | "onTrack" | "atRisk";

const statusVariant: Record<StudentStatus, "success" | "danger"> = {
  "On Track": "success",
  "At Risk": "danger",
};

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

function meterColor(value: number) {
  if (value >= 75) return "bg-emerald-500";
  if (value >= 60) return "bg-orange-500";
  return "bg-rose-500";
}

/**
 * Inline percentage + bar
 * (width reduced so table fits with no horizontal scroll)
 */
function InlineMeter({ value }: { value: number }) {
  const w = clamp(value);

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="w-9 text-sm font-semibold text-slate-900 tabular-nums">
        {value}%
      </span>

      <div className="h-2 w-[72px] overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full ${meterColor(value)} rounded-full`}
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Status pill with icon + single-line
 */
function StatusPill({ status }: { status: StudentStatus }) {
  const isOnTrack = status === "On Track";

  return (
    <Badge
      variant={statusVariant[status]}
      className="
        inline-flex items-center gap-1.5 whitespace-nowrap
        rounded-full px-2.5 py-1 text-xs font-medium
      "
    >
      {isOnTrack ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <AlertTriangle className="h-3.5 w-3.5" />
      )}
      <span>{status}</span>
    </Badge>
  );
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();

    return students.filter((student) => {
      const matchesFilter =
        filter === "onTrack"
          ? student.status === "On Track"
          : filter === "atRisk"
            ? student.status === "At Risk"
            : true;

      const matchesQuery = !q
        ? true
        : student.name.toLowerCase().includes(q) ||
          student.email.toLowerCase().includes(q);

      return matchesFilter && matchesQuery;
    });
  }, [students, filter, query]);

  return (
    <section className="w-full space-y-4">
      <Card className="w-full p-0">
        {/* HEADER */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-base font-semibold text-slate-900">Students</h4>
          </div>

          {/* SEARCH + FILTERS */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            {/* SEARCH */}
            <div className="relative w-full sm:w-[340px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <SearchInput
                placeholder="Search students..."
                className="pl-9"
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
              />
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant={filter === "all" ? "primary" : "outline"}
                onClick={() => setFilter("all")}
                className="whitespace-nowrap"
              >
                All Students
              </Button>

              <Button
                size="sm"
                variant={filter === "onTrack" ? "primary" : "outline"}
                onClick={() => setFilter("onTrack")}
                className="whitespace-nowrap"
              >
                On Track
              </Button>

              <Button
                size="sm"
                variant={filter === "atRisk" ? "primary" : "outline"}
                onClick={() => setFilter("atRisk")}
                className="whitespace-nowrap"
              >
                At Risk
              </Button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <Table
          // ✅ makes columns distribute across full width (prevents overflow)
          className="w-full table-fixed rounded-none border-0 text-sm"
          headers={[
            "Name / Email",
            "Status",
            "Accuracy",
            "Confidence",
            "Questions",
            "Weak Topics",
            "Last Active",
            "Actions",
          ]}
        >
          {filteredStudents.map((student) => {
            const topics = student.weakTopics.slice(0, 2);
            const extra = student.weakTopics.length - topics.length;

            return (
              <tr
                key={student.id}
                className="align-middle border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
              >
                {/* NAME / EMAIL */}
                <td className="px-4 py-3">
                  <div className="max-w-[240px]">
                    <p className="truncate text-sm  text-slate-900">
                      {student.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {student.email}
                    </p>
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusPill status={student.status} />
                </td>

                {/* ACCURACY */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <InlineMeter value={student.accuracy} />
                </td>

                {/* CONFIDENCE */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <InlineMeter value={student.confidence} />
                </td>

                {/* QUESTIONS */}
                <td className="px-4 py-3 text-sm text-slate-700 tabular-nums whitespace-nowrap">
                  {student.questions}
                </td>

                {/* WEAK TOPICS */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    {topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="neutral"
                        className="shrink-0 rounded-full px-2 py-1 text-xs"
                      >
                        {topic}
                      </Badge>
                    ))}
                    {extra > 0 && (
                      <span className="text-xs text-slate-500">+{extra}</span>
                    )}
                  </div>
                </td>

                {/* LAST ACTIVE */}
                <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                  {student.lastActive}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <Button
                    size="sm"
                    variant="outline"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </td>
              </tr>
            );
          })}
        </Table>
      </Card>
    </section>
  );
}
