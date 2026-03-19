import { cn } from "../../../../shared/lib/cn";
import type { AreaOfStudyItem } from "../../data/taskCompiler.mock";
import { isNonEmptyString, toggleId } from "./utils";

export default function AreaPickerModal({
  open,
  areas,
  currentAreaId,
  draftAreaIds,
  setDraftAreaIds,
  onClose,
  onApply,
}: {
  open: boolean;
  areas: AreaOfStudyItem[];
  currentAreaId?: string;
  draftAreaIds: string[];
  setDraftAreaIds: (next: (prev: string[]) => string[]) => void;
  onClose: () => void;
  onApply: () => void;
}) {
  if (!open) return null;

  const selectedCount = Array.from(
    new Set([...draftAreaIds, currentAreaId].filter(isNonEmptyString)),
  ).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-base font-semibold text-slate-900">
              Add more AOS and Units
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Select additional Areas of Study to include in this task.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] space-y-3 overflow-auto pr-1">
          {areas.map((a) => {
            const isCurrent = a.id === currentAreaId;
            const checked = isCurrent || draftAreaIds.includes(a.id);

            return (
              <label
                key={a.id}
                className={cn(
                  "flex cursor-pointer items-start gap-4",
                  "rounded-2xl border border-slate-200 bg-white px-5 py-4",
                  "transition hover:bg-slate-50",
                  isCurrent ? "bg-slate-50" : "",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={isCurrent}
                  onChange={() =>
                    setDraftAreaIds((p) => (isCurrent ? p : toggleId(p, a.id)))
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#00B96B] accent-[#00B96B] disabled:opacity-60"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {a.unit}
                    </span>
                    {isCurrent ? (
                      <span className="inline-flex items-center rounded-full bg-[#00B96B1A] px-3 py-1 text-xs font-semibold text-[#00B96B]">
                        Current
                      </span>
                    ) : null}
                    <p className="min-w-0 truncate text-sm font-semibold text-slate-900">
                      {a.title}
                    </p>
                  </div>
                  <p className="mt-2 truncate text-sm text-slate-500">{a.description}</p>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onApply}
            className="h-10 rounded-xl bg-[#00B96B] px-4 text-sm font-semibold text-white hover:bg-[#009f5c]"
          >
            Apply ({selectedCount})
          </button>
        </div>
      </div>
    </div>
  );
}

