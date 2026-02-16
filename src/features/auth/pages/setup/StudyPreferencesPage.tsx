import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { AuthCard } from "../../components/AuthCard";
import { StepperHeader } from "../../components/StepperHeader";
import { cn } from "../../../../shared/lib/cn";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function StudyPreferencesPage() {
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(60);
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);

  const toggleDay = (d: string) => {
    setSelectedDays((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));
  };

  const onComplete = () => {
    localStorage.setItem("skolar.studyGoalMin", String(minutes));
    localStorage.setItem("skolar.studyDays", JSON.stringify(selectedDays));
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AuthCard className="max-w-[520px]">
        <StepperHeader step={4} total={4} onBack={() => navigate(-1)} />

        <div className="flex flex-col items-center text-center">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
            <Clock className="h-5 w-5 text-green-600" />
          </div>
          <div className="mt-3 text-lg font-semibold text-slate-900">Study Preferences</div>
          <div className="mt-1 text-xs text-slate-500">
            Set a sustainable daily goal and your study days
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-4">
          <div className="text-center text-2xl font-semibold text-slate-900">
            {minutes} minutes
          </div>
          <div className="mt-1 text-center text-[11px] text-slate-500">Daily Study Goal</div>

          <input
            type="range"
            min={15}
            max={180}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="mt-4 w-full"
          />

          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>15 min</span>
            <span>180 min</span>
          </div>

          <div className="mt-4 text-[11px] font-medium text-slate-500">Preferred Days</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {days.map((d) => {
              const on = selectedDays.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={cn(
                    "h-9 rounded-xl border px-3 text-xs font-semibold transition",
                    on ? "border-green-600 bg-green-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="mt-4 h-10 w-full rounded-xl bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-green-700"
        >
          Complete Setup
        </button>
      </AuthCard>
    </div>
  );
}
