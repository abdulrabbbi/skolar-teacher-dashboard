import { Clock } from "lucide-react";
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
    if (parts.length >= 2)
      return { subject: parts[0]!, main: parts.slice(1).join(" ") };
  }

  const parts = t.split(" ").filter(Boolean);
  if (parts.length >= 2)
    return { subject: parts[0]!, main: parts.slice(1).join(" ") };

  return { subject: event.type, main: t };
}

export default function WeeklyEventCard({
  event,
  checked,
  onToggle,
}: {
  event: WeeklyEvent;
  checked?: boolean;
  onToggle?: (id: string) => void;
}) {
  const { subject, main } = splitTitle(event);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white px-1 py-2 shadow-sm">
      <div className="flex items-start ">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => onToggle?.(event.id)}
          className={cn(
            "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-lg border transition",
            checked
              ? "border-slate-900 bg-slate-900"
              : "border-slate-300 bg-white hover:bg-slate-50",
          )}
          aria-label="Toggle event"
        >
          {checked ? (
            <span className="text-[11px] font-bold text-white">✓</span>
          ) : null}
        </button>

        {/* Content */}
        <div className="min-w-0 flex-1 w-full">
          {/* Dot + Subject (centered, single-line, ellipsis) */}
          <div className="flex items-center justify-center gap-2 w-full min-w-0">
            <span className={cn("h-2 w-2 shrink-0 rounded-full", dotMap[event.type])} />
            <span className="min-w-0 max-w-full truncate text-[11px] font-medium text-slate-500 text-center">
              {subject || "Subject"}
            </span>
          </div>

          {/* Main Title (centered, 2 lines max, ellipsis) */}
          <p
            className="
              mt-1 w-full text-center text-[13px] font-semibold leading-5 text-slate-900
              overflow-hidden
              [display:-webkit-box]
              [-webkit-box-orient:vertical]
              [-webkit-line-clamp:2]
            "
            title={main}
          >
            {main}
          </p>

          {/* Duration (centered) */}
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">{event.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}