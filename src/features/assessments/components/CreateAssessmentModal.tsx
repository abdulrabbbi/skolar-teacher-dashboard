import { ChevronDown, X } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import type { AssessmentSelectOption } from "../data/assessments.mock";

export type CreateAssessmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  typeOptions: AssessmentSelectOption[];
  classOptions: AssessmentSelectOption[];
  defaultType: string;
  defaultClass: string;
};

const inputBase =
  "h-11 w-full rounded-xl bg-slate-100 px-4 text-sm text-slate-900 placeholder:text-slate-400 " +
  "border border-transparent outline-none " +
  "focus:outline-none focus:ring-0 focus:border-transparent " +
  "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent";

const textareaBase =
  "w-full rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 " +
  "border border-transparent outline-none resize-none " +
  "focus:outline-none focus:ring-0 focus:border-transparent " +
  "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent";

export default function CreateAssessmentModal({
  isOpen,
  onClose,
  typeOptions,
  classOptions,
  defaultType,
  defaultClass,
}: CreateAssessmentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40"
        role="presentation"
        onClick={onClose}
      />

      <Card className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
              Create Assessment
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Add a new assessment to your list.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-slate-700" />
          </button>
        </div>

        {/* BODY */}
        <div className="mt-6 space-y-4">
          {/* Name */}
          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Name</div>
            <div className="min-w-0">
              <input type="text" placeholder=" " className={inputBase} />
            </div>
          </div>

          {/* Type */}
          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Type</div>
            <div className="relative min-w-0">
              <select
                defaultValue={defaultType}
                className={`${inputBase} appearance-none pr-10`}
              >
                {typeOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          {/* Class */}
          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Class</div>
            <div className="relative min-w-0">
              <select
                defaultValue={defaultClass}
                className={`${inputBase} appearance-none pr-10`}
              >
                {classOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          {/* Due Date */}
          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Due Date</div>
            <div className="min-w-0">
              <input type="date" className={inputBase} />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-[120px_1fr]">
            <div className="pt-2 text-sm text-slate-700">Description</div>
            <div className="min-w-0">
              <textarea rows={4} placeholder=" " className={textareaBase} />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="h-10 px-5">
            Cancel
          </Button>
          <Button variant="success" className="h-10 px-6">
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
}