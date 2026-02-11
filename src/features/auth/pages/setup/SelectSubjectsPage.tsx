import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, BookOpen } from "lucide-react";
import { AuthCard } from "../../components/AuthCard";
import { StepperHeader } from "../../components/StepperHeader";
import { SUBJECT_OPTIONS } from "../../data/auth.mock";
import { cn } from "../../../../shared/lib/cn";

export function SelectSubjectsPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (s: string) => {
    setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  };

  const label = useMemo(() => {
    if (selected.length === 0) return "Choose your subjects";
    if (selected.length === 1) return selected[0];
    return `${selected.length} selected`;
  }, [selected]);

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AuthCard className="max-w-[520px]">
        <StepperHeader step={2} total={4} onBack={() => navigate(-1)} />

        <div className="flex flex-col items-center text-center">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
            <BookOpen className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="mt-3 text-lg font-semibold text-slate-900">Select Your Subjects</div>
          <div className="mt-1 text-xs text-slate-500">
            Choose the subjects you plan to study this year
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">Subjects</div>

            <button
              type="button"
              onClick={() => setOpen((p) => !p)}
              className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm"
            >
              <span className="truncate">{label}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {open && (
              <div className="mt-2 max-h-56 overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                {SUBJECT_OPTIONS.map((s) => {
                  const isOn = selected.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggle(s)}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-sm",
                        isOn ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50",
                      )}
                    >
                      <span className="truncate">{s}</span>
                      <span
                        className={cn(
                          "grid h-5 w-5 place-items-center rounded-md border",
                          isOn ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-transparent",
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate("/auth/setup/target")}
            className="mt-2 h-10 w-full rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Continue
          </button>
        </div>
      </AuthCard>
    </div>
  );
}
