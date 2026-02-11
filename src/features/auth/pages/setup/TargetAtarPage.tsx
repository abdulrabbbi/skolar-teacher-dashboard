import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target } from "lucide-react";
import { AuthCard } from "../../components/AuthCard";
import { StepperHeader } from "../../components/StepperHeader";

export function TargetAtarPage() {
  const navigate = useNavigate();
  const [target, setTarget] = useState(90);

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AuthCard className="max-w-[520px]">
        <StepperHeader step={3} total={4} onBack={() => navigate(-1)} />

        <div className="flex flex-col items-center text-center">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
            <Target className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="mt-3 text-lg font-semibold text-slate-900">Set Your Target</div>
          <div className="mt-1 text-xs text-slate-500">
            The ATAR you’re aiming for this year
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-4">
          <div className="text-center text-3xl font-semibold text-slate-900">
            {target.toFixed(2)}
          </div>
          <div className="mt-1 text-center text-[11px] text-slate-500">Target ATAR</div>

          <input
            type="range"
            min={0}
            max={99.95}
            step={0.05}
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="mt-4 w-full"
          />

          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/auth/setup/preferences")}
          className="mt-4 h-10 w-full rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Continue
        </button>
      </AuthCard>
    </div>
  );
}
