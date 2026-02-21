/* eslint-disable no-shadow-restricted-names */
import { ChevronRight } from "lucide-react";
import { cn } from "../../../shared/lib/cn";
import SubjectIcon from "./SubjectIcon";
import type { SubjectCard, SubjectCardColor } from "../data/taskCompiler.mock";

const tone: Record<
  SubjectCardColor,
  string
> = {
  blue: "bg-blue-50/70 border-blue-200",
  green: "bg-emerald-50/70 border-emerald-200",
  purple: "bg-purple-50/70 border-purple-200",
  orange: "bg-orange-50/70 border-orange-200",
  pink: "bg-pink-50/70 border-pink-200",
};

export default function SubjectCards({
  subjects,
  onSelect,
}: {
  subjects: SubjectCard[];
  onSelect: (subject: SubjectCard) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {subjects.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onSelect(s)}
          className={cn(
            "w-full text-left",
            "rounded-2xl border p-5",
            "transition hover:shadow-sm",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200",
            tone[s.color],
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Figma icon tile */}
              <SubjectIcon icon={s.icon} color={s.color} size={44} />

              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-slate-900">
                  {s.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Units {s.unitsCompleted}/{s.unitsTotal}
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
          </div>
        </button>
      ))}
    </div>
  );
}
