/* eslint-disable @typescript-eslint/no-unused-vars */
import { Copy, Download, Eye } from "lucide-react";
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

export default function TaskHistoryItem({ item }: TaskHistoryItemProps) {

  return (
    <Card
      className="
        flex flex-col gap-4 p-4
        sm:flex-row sm:items-center sm:justify-between
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1
      "
    >
      {/* LEFT CONTENT */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-slate-700">
            {item.title}
          </h3>

          <Badge variant={statusVariant[item.status]}>
            {item.status}
          </Badge>

          <Badge variant={difficultyVariant[item.difficulty]}>
            {item.difficulty}
          </Badge>
        </div>

        <div className="text-xs text-slate-500">
          {item.subject} | {item.code} | {item.duration} | {item.marks} |{" "}
          {item.students} students | {item.createdAt}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          className="transition-all duration-200 hover:scale-105"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="transition-all duration-200 hover:scale-105"
        >
          <Copy className="h-4 w-4" />
          Duplicate
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="transition-all duration-200 hover:scale-105"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </Card>
  );
}
