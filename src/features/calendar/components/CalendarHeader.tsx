
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import { cn } from "../../../shared/lib/cn";

type Props = {
  // existing (kept so CalendarPage won't break)
  monthLabel: string;

  viewMode: "monthly" | "weekly";
  onViewChange: (mode: "monthly" | "weekly") => void;
  onAddEvent: () => void;

  // ✅ weekly-only
  weekLabel?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;

  // ✅ optional (if you want to override later)
  title?: string;
  subtitle?: string;
};

export default function CalendarHeader({
  viewMode,
  onViewChange,
  onAddEvent,
  weekLabel,
  onPrevWeek,
  onNextWeek,
  title = "Calendar",
  subtitle = "Manage your schedule and deadlines",
}: Props) {
  const isWeekly = viewMode === "weekly";
  const canPrev = isWeekly && Boolean(onPrevWeek);
  const canNext = isWeekly && Boolean(onNextWeek);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* LEFT: Main heading (same as image) */}
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {/* Center group: <  Week Label  > (weekly only) */}
        {isWeekly && (
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <button
              type="button"
              onClick={onPrevWeek}
              disabled={!canPrev}
              aria-label="Previous week"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100",
                !canPrev && "cursor-not-allowed opacity-50"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <p className="min-w-[160px] text-center text-sm font-semibold text-slate-900 sm:min-w-[190px]">
              {weekLabel ?? ""}
            </p>

            <button
              type="button"
              onClick={onNextWeek}
              disabled={!canNext}
              aria-label="Next week"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100",
                !canNext && "cursor-not-allowed opacity-50"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Weekly / Monthly toggle (always) */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => onViewChange("weekly")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition",
                viewMode === "weekly"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              Weekly
            </button>

            <button
              type="button"
              onClick={() => onViewChange("monthly")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition",
                viewMode === "monthly"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              Monthly
            </button>
          </div>

          {/* Add Event (same right side, like image) */}
          <Button variant="success" onClick={onAddEvent} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
    </div>
  );
}