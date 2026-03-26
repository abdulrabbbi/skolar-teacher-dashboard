/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPortal } from "react-dom";
import { CalendarDays, Clock3, Pencil, Trash2, X } from "lucide-react";
import { cn } from "../../../shared/lib/cn";
import { renderIcon } from "./IconPickerModal";
import type { WeeklyEvent } from "../data/calendar.weekly.mock";

type Props = {
  open: boolean;
  event: WeeklyEvent | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

function getBadgeTone(typeLabel: string) {
  if (typeLabel.toLowerCase() === "exam") {
    return "bg-red-50 text-red-600";
  }

  if (typeLabel.toLowerCase() === "deadline") {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-blue-50 text-blue-600";
}

function formatDateLabel(dateISO: string) {
  const date = new Date(`${dateISO}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatTimeLabel(dateTimeLocal: string) {
  const date = new Date(dateTimeLocal);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function WeeklyEventDetailsModal({
  open,
  event,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  if (!open || !event) return null;

  const anyEvent = event as any;
  const typeLabel = event.type ?? "Event";
  const title = event.title || typeLabel;
  const subtitle = String(anyEvent.className ?? event.subtitle ?? "").trim();
  const dateISO = String(
    anyEvent.dateISO ?? String(anyEvent.startTime ?? "").split("T")[0] ?? "",
  );

  const icon = String(anyEvent.icon ?? "Calendar");
  const color = (anyEvent.color as string | undefined) ?? undefined;

  const timeLabel =
    anyEvent.startTime && anyEvent.endTime
      ? `${formatTimeLabel(String(anyEvent.startTime))} - ${formatTimeLabel(
          String(anyEvent.endTime),
        )}`
      : event.duration || "â€”";

  return createPortal(
    <div className="fixed inset-0 z-1001">
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[510px] rounded-[24px] border border-slate-200 bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: color ?? "#1363FF" }}
                aria-hidden="true"
              >
                {renderIcon(icon, "h-5 w-5")}
              </div>

              <div className="min-w-0">
                <h3 className="text-[18px] font-semibold text-slate-900">
                  {typeLabel}
                </h3>
                <p className="mt-1 truncate text-[15px] text-slate-600">
                  {subtitle || title}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5">
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                getBadgeTone(typeLabel),
              )}
            >
              {typeLabel}
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            {dateISO ? (
              <div className="flex items-center gap-3 text-slate-700">
                <CalendarDays className="h-5 w-5 text-slate-500" />
                <span className="text-[15px] font-medium">
                  {formatDateLabel(dateISO)}
                </span>
              </div>
            ) : null}

            <div
              className={cn(
                "flex items-center gap-3 text-slate-700",
                dateISO && "mt-3",
              )}
            >
              <Clock3 className="h-5 w-5 text-slate-500" />
              <span className="text-[15px] font-medium">{timeLabel}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onEdit}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
            >
              <Pencil className="h-4 w-4" />
              Edit Event
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
