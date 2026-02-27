// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Copy, Download, Eye } from "lucide-react";
// import Badge, { type BadgeVariant } from "../../../shared/components/ui/Badge";
// import Button from "../../../shared/components/ui/Button";
// import Card from "../../../shared/components/ui/Card";
// import type {
//   TaskDifficulty,
//   TaskHistoryItemData,
//   TaskHistoryStatus,
// } from "../data/taskHistory.mock";

// export type TaskHistoryItemProps = {
//   item: TaskHistoryItemData;
// };

// const statusVariant: Record<TaskHistoryStatus, BadgeVariant> = {
//   Completed: "success",
//   "In Progress": "warning",
//   Queued: "neutral",
// };

// const difficultyVariant: Record<TaskDifficulty, BadgeVariant> = {
//   Easy: "success",
//   Medium: "warning",
//   Hard: "danger",
//   Mixed: "neutral",
// };

// export default function TaskHistoryItem({ item }: TaskHistoryItemProps) {

//   return (
//     <Card
//       className="
//         group
//         flex flex-col gap-4 p-4
//         sm:flex-row sm:items-center sm:justify-between
//         transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl
//         transition-all duration-200 hover:bg-slate-50 hover:shadow-sm
//       "
//     >
//       {/* LEFT CONTENT */}
//       <div className="space-y-2">
//         <div className="flex flex-wrap items-center gap-2">
//           <h3 className="text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-slate-700">
//             {item.title}
//           </h3>

//           <Badge variant={statusVariant[item.status]}>
//             {item.status}
//           </Badge>

//           <Badge variant={difficultyVariant[item.difficulty]}>
//             {item.difficulty}
//           </Badge>
//         </div>

//         <div className="text-xs text-slate-500">
//           {item.subject} | {item.code} | {item.duration} | {item.marks} |{" "}
//           {item.students} students | {item.createdAt}
//         </div>
//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="flex flex-wrap gap-2">
//         <Button
//           size="sm"
//           variant="outline"
//           className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
//         >
//           <Eye className="h-4 w-4" />
//           View
//         </Button>

//         <Button
//           size="sm"
//           variant="outline"
//           className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
//         >
//           <Copy className="h-4 w-4" />
//           Duplicate
//         </Button>

//         <Button
//           size="sm"
//           variant="outline"
//           className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
//         >
//           <Download className="h-4 w-4" />
//           Download
//         </Button>
//       </div>
//     </Card>
//   );
// }



/* eslint-disable @typescript-eslint/no-unused-vars */
import { Copy, Download, Eye, CalendarDays, Clock, FileText, Users } from "lucide-react";
import Badge, { type BadgeVariant } from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import type {
  TaskDifficulty,
  TaskHistoryItemData,
  TaskHistoryStatus,
} from "../data/taskHistory.mock";

export type TaskHistoryItemProps = {
  item: TaskHistoryItemData;
};

const statusVariant: Record<TaskHistoryStatus, BadgeVariant> = {
  Completed: "success",
  "In Progress": "warning",
  Queued: "neutral",
};

const difficultyVariant: Record<TaskDifficulty, BadgeVariant> = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger",
  Mixed: "neutral",
};

const metaIcon = "h-4 w-4 text-slate-400";

function withCreatedPrefix(v: string) {
  const s = String(v ?? "").trim();
  if (!s) return "";
  return s.toLowerCase().startsWith("created") ? s : `Created ${s}`;
}

export default function TaskHistoryItem({ item }: TaskHistoryItemProps) {
  const createdText = withCreatedPrefix(item.createdAt);

  return (
    <Card
      className="
        group
        flex flex-col gap-4 p-4
        sm:flex-row sm:items-center sm:justify-between
        transition-all duration-300 ease-in-out
        hover:-translate-y-1 hover:bg-slate-50 hover:shadow-sm
      "
    >
      {/* LEFT CONTENT */}
      <div className="min-w-0 space-y-2">
        {/* Title + Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-slate-700">
            {item.title}
          </h3>

          <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
          <Badge variant={difficultyVariant[item.difficulty]}>{item.difficulty}</Badge>
        </div>

        {/* Subject + Code line (like Figma) */}
        <div className="text-xs text-slate-500">
          {item.subject} • {item.code}
        </div>

        {/* ✅ Meta row with small icons (like Figma) */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className={metaIcon} />
            <span>{createdText}</span>
          </span>

          <span className="inline-flex items-center gap-2">
            <Clock className={metaIcon} />
            <span>{item.duration}</span>
          </span>

          <span className="inline-flex items-center gap-2">
            <FileText className={metaIcon} />
            <span>{item.marks}</span>
          </span>

          <span className="inline-flex items-center gap-2">
            <Users className={metaIcon} />
            <span>{item.students} students</span>
          </span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <Button
          size="sm"
          variant="outline"
          className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
        >
          <Copy className="h-4 w-4" />
          Duplicate
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </Card>
  );
}