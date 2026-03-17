/* eslint-disable @typescript-eslint/no-explicit-any */

import { createPortal } from "react-dom";
import { CalendarDays, Clock3, Pencil, Trash2, X } from "lucide-react";
import { cn } from "../../../shared/lib/cn";
import type { CalendarEvent, EventTypeConfig } from "../data/calendar.mock";

type Props = {
  open: boolean;
  event: CalendarEvent | null;
  monthISO: string;
  eventTypes: EventTypeConfig[];
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

function toISODate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function resolveEventDateISO(event: CalendarEvent, monthISO: string) {
  const anyEvent = event as any;
  if (anyEvent.dateISO) return String(anyEvent.dateISO);

  const base = new Date(monthISO);
  const year = base.getFullYear();
  const month = base.getMonth();
  const day = Number(anyEvent.day ?? 1);

  return toISODate(new Date(year, month, day));
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

function getEventTitle(event: CalendarEvent, fallback: string) {
  const anyEvent = event as any;
  return String(anyEvent.title ?? anyEvent.name ?? anyEvent.subject ?? fallback);
}

function getEventSecondaryText(event: CalendarEvent, primary: string, typeLabel: string) {
  const anyEvent = event as any;
  const other =
    anyEvent.className ?? anyEvent.subject ?? anyEvent.name ?? "";

  if (other && String(other) !== primary) return String(other);
  if (primary !== typeLabel) return primary;
  return "";
}

function getEventTime(event: CalendarEvent) {
  const anyEvent = event as any;
  return anyEvent.time ? String(anyEvent.time) : "All Day";
}

function getBadgeTone(typeLabel: string) {
  if (typeLabel.toLowerCase() === "exam") {
    return "bg-red-50 text-red-600";
  }

  if (typeLabel.toLowerCase() === "deadline") {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-blue-50 text-blue-600";
}

export default function MonthEventDetailsModal({
  open,
  event,
  monthISO,
  eventTypes,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  if (!open || !event) return null;

  const typeId = String((event as any).type ?? (event as any).typeId ?? "");
  const typeMeta = eventTypes.find((item) => String(item.id) === typeId);
  const typeLabel = typeMeta?.label ?? "Event";

  const primary = getEventTitle(event, typeLabel);
  const subtitle = getEventSecondaryText(event, primary, typeLabel);
  const dateISO = resolveEventDateISO(event, monthISO);
  const timeLabel = getEventTime(event);

  return createPortal(
    <div className="fixed inset-0 z-[1001]">
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[510px] rounded-[24px] border border-slate-200 bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[18px] font-semibold text-slate-900">
                {typeLabel}
              </h3>

              {subtitle ? (
                <p className="mt-1 text-[15px] text-slate-600">{subtitle}</p>
              ) : (
                <p className="mt-1 text-[15px] text-slate-600">{primary}</p>
              )}
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
            <div className="flex items-center gap-3 text-slate-700">
              <CalendarDays className="h-5 w-5 text-slate-500" />
              <span className="text-[15px] font-medium">
                {formatDateLabel(dateISO)}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3 text-slate-700">
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