import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import { cn } from "../../../shared/lib/cn";

type Props = {
  monthLabel: string;

  viewMode: "monthly" | "weekly";
  onViewChange: (mode: "monthly" | "weekly") => void;
  onAddEvent: () => void;

  weekLabel?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;

  title?: string;
  subtitle?: string;
};

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-xl px-4 text-sm font-semibold transition",
        active
          ? "bg-emerald-600 text-white shadow-sm"
          : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}

function WeekNavButton({
  disabled,
  onClick,
  "aria-label": ariaLabel,
  children,
}: {
  disabled?: boolean;
  onClick?: () => void;
  "aria-label": string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100",
        disabled && "cursor-not-allowed opacity-50 hover:bg-emerald-50",
      )}
    >
      {children}
    </button>
  );
}

export default function CalendarHeader({
  monthLabel,
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
  const subtitleText = isWeekly ? subtitle : monthLabel;

  return (
    <div className="flex items-center justify-between gap-6">
      {/* LEFT */}
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{subtitleText}</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* week switcher (weekly only) */}
        {isWeekly && (
          <div className="flex items-center gap-3">
            <WeekNavButton
              onClick={onPrevWeek}
              disabled={!onPrevWeek}
              aria-label="Previous week"
            >
              <ChevronLeft className="h-4 w-4" />
            </WeekNavButton>

            <div className="min-w-[170px] text-center text-sm font-medium text-slate-900">
              {weekLabel ?? ""}
            </div>

            <WeekNavButton
              onClick={onNextWeek}
              disabled={!onNextWeek}
              aria-label="Next week"
            >
              <ChevronRight className="h-4 w-4" />
            </WeekNavButton>
          </div>
        )}

        {/* view pills */}
        <div className="flex items-center gap-2">
          <Pill active={viewMode === "weekly"} onClick={() => onViewChange("weekly")}>
            Weekly
          </Pill>
          <Pill active={viewMode === "monthly"} onClick={() => onViewChange("monthly")}>
            Monthly
          </Pill>
        </div>

        {/* add event */}
        <Button
          variant="success"
          onClick={onAddEvent}
          className="h-10 rounded-xl gap-2 px-4"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>
    </div>
  );
}
