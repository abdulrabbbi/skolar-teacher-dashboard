import { useEffect, useRef } from "react";
import { cn } from "../../../shared/lib/cn";
import type { WeeklyEvent } from "../data/calendar.weekly.mock";

const dotMap: Record<WeeklyEvent["type"], string> = {
  Exam: "bg-red-500",
  Class: "bg-blue-500",
  Deadline: "bg-orange-500",
};

function splitTitle(event: WeeklyEvent) {
  const t = (event.title || "").trim();

  const classIdx = t.toLowerCase().indexOf("class");
  if (classIdx > 0) {
    return {
      subject: t.slice(0, classIdx).trim(),
      main: t.slice(classIdx).trim(),
    };
  }

  if (t.toLowerCase().endsWith("exam")) {
    return { subject: t.slice(0, -4).trim(), main: "Exam" };
  }

  if (t.toLowerCase().endsWith("deadline")) {
    const parts = t.split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return { subject: parts[0]!, main: parts.slice(1).join(" ") };
    }
  }

  const parts = t.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return { subject: parts[0]!, main: parts.slice(1).join(" ") };
  }

  return { subject: event.type, main: t };
}

export default function WeeklyEventCard({
  event,
  checked,
  onToggle,
  onDelete,
  onSelect,
  onEdit,
}: {
  event: WeeklyEvent;
  checked?: boolean;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (event: WeeklyEvent) => void;
  onEdit?: (event: WeeklyEvent) => void;
}) {
  const { subject, main } = splitTitle(event);
  const isChecked = Boolean(checked);
  const clickTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const color = (event as any).color as string | undefined;
  const className = ((event as any).className as string | undefined) ?? undefined;

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <div
      title={`${subject}: ${main}`}
      onClick={() => {
        if (!onSelect) return;
        if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = window.setTimeout(() => onSelect(event), 220);
      }}
      onDoubleClick={() => {
        if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
        onEdit?.(event);
      }}
      className={cn(
        "group relative w-full rounded-2xl border px-3 py-3 shadow-sm transition-colors",
        (onSelect || onEdit) && "cursor-pointer",
        isChecked
          ? "border-slate-300 bg-slate-50"
          : "border-slate-200/70 bg-slate-50 hover:bg-white",
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
          if (!onDelete) return;

          const label = [subject, main].filter(Boolean).join(": ").trim();
          const message = `Are you sure you want to remove "${label || event.title}"?`;

          if (typeof window === "undefined" || window.confirm(message)) {
            onDelete(event.id);
          }
        }}
        aria-label={`Remove ${subject}: ${main}`}
        className={cn(
          "absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-md text-slate-400",
          "opacity-0 transition-opacity hover:bg-rose-50 hover:text-rose-600",
          "group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60",
        )}
      >
        <span aria-hidden="true" className="text-[16px] leading-none">
          &times;
        </span>
      </button>

      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (clickTimeoutRef.current) window.clearTimeout(clickTimeoutRef.current);
            onToggle?.(event.id);
          }}
          aria-pressed={isChecked}
          className={cn(
            "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-lg border transition",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
            isChecked
              ? "border-slate-900 bg-slate-900"
              : "border-slate-300 bg-white hover:bg-slate-50",
          )}
          aria-label="Toggle event"
        >
          {isChecked ? (
            <span aria-hidden="true" className="text-[10px] leading-none text-white">
              ✓
            </span>
          ) : null}
        </button>

        <div className="min-w-0 flex-1 pr-7">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 shrink-0 rounded-full",
                color ? "" : dotMap[event.type],
              )}
              style={color ? { backgroundColor: color } : undefined}
              aria-hidden="true"
            />
            <span className="truncate text-[11px] font-medium text-slate-500">
              {className || subject || "Subject"}
            </span>
          </div>

          <p
            className={cn(
              "mt-1 overflow-hidden text-[13px] font-semibold leading-5 text-slate-900 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
              isChecked && "line-through opacity-75 text-slate-500",
            )}
            title={main}
          >
            {main}
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="truncate">{event.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
