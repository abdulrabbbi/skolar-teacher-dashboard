import { useEffect, useRef, useState, type KeyboardEventHandler } from "react";
import { X } from "lucide-react";
import Card from "../../../../../shared/components/ui/Card";
import { cn } from "../../../../../shared/lib/cn";
import type { LiveQuizStudent } from "../../../data/liveQuizSession.mock";

export type ParticipationCardProps = {
  percent: number; // 0 - 100
  students: LiveQuizStudent[];
  className?: string;
};

export default function ParticipationCard({
  percent,
  students,
  className,
}: ParticipationCardProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const value = Math.max(0, Math.min(100, Math.round(percent)));

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <Card
        className={cn(
          "cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 sm:p-5",
          className,
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label="Show students who answered"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Live Participation</p>
          <span className="text-sm font-medium text-slate-500">
            {value}% responded
          </span>
        </div>

        <div className="mt-2 text-xs text-slate-500">Click to view who answered</div>

        {/* Progress bar (same look as screenshot) */}
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900"
            style={{ width: `${value}%` }}
            aria-label={`Participation ${value}%`}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </Card>

      {open ? (
        <Card className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Students Answered ({students.length})
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              aria-label="Close answered students panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
            {students.length === 0 ? (
              <p className="text-sm text-slate-500">No students answered yet.</p>
            ) : (
              students.map((student) => (
                <div
                  key={student.id}
                  className="rounded-lg border border-slate-100 px-3 py-2 text-sm text-slate-800"
                >
                  {student.name}
                </div>
              ))
            )}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
