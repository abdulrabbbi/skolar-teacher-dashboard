import { useNavigate } from "react-router-dom";
import { ChevronDown, GraduationCap } from "lucide-react";
import { AuthCard } from "../../components/AuthCard";
import { StepperHeader } from "../../components/StepperHeader";
import { STATES, YEAR_LEVELS } from "../../data/auth.mock";

export function EducationDetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AuthCard className="max-w-[520px]">
        <StepperHeader step={1} total={4} onBack={() => navigate(-1)} />

        <div className="flex flex-col items-center text-center">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="mt-3 text-lg font-semibold text-slate-900">Education Details</div>
          <div className="mt-1 text-xs text-slate-500">
            Help us personalise your learning experience
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">State / Territory</div>
            <div className="relative">
              <select className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-400">
                <option value="">Select your state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">School</div>
            <div className="relative">
              <select className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-400">
                <option value="">Select your school</option>
                <option>Example High School</option>
                <option>Lorem Ipsum College</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">Year Level</div>
            <div className="relative">
              <select className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-400">
                <option value="">Select your year level</option>
                {YEAR_LEVELS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/auth/setup/subjects")}
            className="mt-2 h-10 w-full rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Continue
          </button>
        </div>
      </AuthCard>
    </div>
  );
}
