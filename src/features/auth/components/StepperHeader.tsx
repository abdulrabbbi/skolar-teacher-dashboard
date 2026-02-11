import { ChevronLeft } from "lucide-react";

type Props = {
  step: number; // 1..4
  total: number; // 4
  onBack?: () => void;
};

export function StepperHeader({ step, total, onBack }: Props) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="text-[11px] font-medium text-slate-500">
          Step {step} of {total}
        </div>
      </div>

      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200">
        <div
          className="h-1.5 rounded-full bg-indigo-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
