import { useState } from "react";
import { Copy, Download, Eye, CalendarDays, Clock, FileText, Users } from "lucide-react";
import Badge, { type BadgeVariant } from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import { openPrintToPdfWindow } from "../../../shared/lib/printToPdf";
import TaskHistoryDetailsModal from "./TaskHistoryDetailsModal";
import type {
  TaskDifficulty,
  TaskHistoryItemData,
  TaskHistoryStatus,
} from "../data/taskHistory.mock";

export type TaskHistoryItemProps = {
  item: TaskHistoryItemData;
  onChangeStatus?: (id: string, status: TaskHistoryStatus) => void;
};

const statusVariant: Record<TaskHistoryStatus, BadgeVariant> = {
  Completed: "success",
  "In Progress": "warning",
  Draft: "neutral",
  Assigned: "info",
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default function TaskHistoryItem({
  item,
  onChangeStatus,
}: TaskHistoryItemProps) {
  const createdText = withCreatedPrefix(item.createdAt);
  const [actionMessage, setActionMessage] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const taskSummary = [
    `Title: ${item.title}`,
    `Subject: ${item.subject}`,
    `Code: ${item.code}`,
    `Status: ${item.status}`,
    `Difficulty: ${item.difficulty}`,
    `Created: ${item.createdAt}`,
    `Duration: ${item.duration}`,
    `Marks: ${item.marks}`,
    `Students: ${item.students}`,
    `Questions: ${item.questions.length}`,
    "",
    ...item.questions.flatMap((q, index) => [
      `Q${index + 1} (${q.type}${typeof q.marks === "number" ? `, ${q.marks} marks` : ""}):`,
      q.prompt,
      "Answer guide:",
      q.answerGuide,
      "",
    ]),
  ].join("\n");

  const handleView = () => {
    setIsDetailsOpen(true);
  };

  const handleDuplicate = async () => {
    try {
      await navigator.clipboard.writeText(taskSummary);
      setActionMessage("Task copied to clipboard");
    } catch {
      setActionMessage("Copy failed");
    }
  };

  const handleDownload = () => {
    const questionsHtml =
      item.questions.length > 0
        ? `
          <h2>Questions</h2>
          <ol>
            ${item.questions
              .map((q) => {
                const marksText =
                  typeof q.marks === "number" ? ` <span class="pill">${q.marks} marks</span>` : "";

                return `<li>
                  <p><span class="pill">${escapeHtml(q.type)}</span>${marksText}</p>
                  <p style="white-space: pre-wrap; color: #0f172a;">${escapeHtml(q.prompt)}</p>
                  <p><strong>Answer guide:</strong></p>
                  <p style="white-space: pre-wrap; font-size: 12.5px; color: #334155;">${escapeHtml(
                    q.answerGuide,
                  )}</p>
                </li>`;
              })
              .join("")}
          </ol>
        `
        : `<p><em>No questions saved for this task.</em></p>`;

    const bodyHtml = `
      <div class="meta">
        <p>
          <span class="pill">${escapeHtml(item.status)}</span>
          <span class="pill">${escapeHtml(item.difficulty)}</span>
          <span class="pill">${escapeHtml(item.code)}</span>
        </p>
        <p><strong>Subject:</strong> ${escapeHtml(item.subject)}</p>
        <p><strong>Created:</strong> ${escapeHtml(item.createdAt)}</p>
        <p><strong>Duration:</strong> ${escapeHtml(item.duration)} &nbsp; <strong>Marks:</strong> ${escapeHtml(item.marks)} &nbsp; <strong>Students:</strong> ${item.students}</p>
      </div>
      <div class="hr"></div>
      ${questionsHtml}
    `;

    openPrintToPdfWindow({
      title: item.title,
      subtitle: "Printable view — use your browser “Save as PDF” to download.",
      bodyHtml,
    });

    setActionMessage("Opened printable PDF");
  };

  const handleStatusChange = (next: TaskHistoryStatus) => {
    onChangeStatus?.(item.id, next);
    setActionMessage(`Status: ${next}`);
  };

  return (
    <>
      <TaskHistoryDetailsModal
        open={isDetailsOpen}
        item={item}
        onClose={() => setIsDetailsOpen(false)}
      />

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
          onClick={handleView}
          className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={handleDuplicate}
          className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
        >
          <Copy className="h-4 w-4" />
          Duplicate
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={handleDownload}
          className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>

        <label className="inline-flex items-center">
          <span className="sr-only">Change status</span>
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskHistoryStatus)}
            className="
              h-8 rounded-md border border-slate-300 bg-white
              px-3 text-xs font-semibold text-slate-700
              transition hover:bg-slate-50
              focus:outline-none focus:ring-2 focus:ring-slate-200
            "
            aria-label="Change task status"
          >
            <option value="In Progress">In Progress</option>
            <option value="Draft">Draft</option>
            <option value="Assigned">Assigned</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>

      {actionMessage ? (
        <p className="text-xs text-slate-500 sm:hidden">{actionMessage}</p>
      ) : null}
      </Card>
    </>
  );
}
