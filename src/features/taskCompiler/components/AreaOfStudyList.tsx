import { ChevronRight } from "lucide-react";
import { cn } from "../../../shared/lib/cn";
import type { AreaOfStudyItem } from "../data/taskCompiler.mock";

function asUnitPill(unit: string) {
  const u = String(unit ?? "").trim();
  if (!u) return "Unit";
  return u.toLowerCase().startsWith("unit") ? u : `Unit ${u}`;
}

export default function AreaOfStudyList({
  areas,
  onSelectArea,
}: {
  areas: AreaOfStudyItem[];
  onSelectArea: (area: AreaOfStudyItem) => void;
}) {
  return (
    <div className="space-y-4">
      {areas.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={() => onSelectArea(a)}
          className={cn(
            "w-full text-left",
            "rounded-2xl border border-slate-200 bg-white px-5 py-4",
            "transition hover:shadow-sm",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200",
          )}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {asUnitPill(a.unit)}
                </span>
                <h3 className="truncate text-base font-semibold text-slate-900">
                  {a.title}
                </h3>
              </div>

              <p className="mt-2 truncate text-sm text-slate-500">
                {a.description}
              </p>
            </div>

            <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
          </div>
        </button>
      ))}
    </div>
  );
}