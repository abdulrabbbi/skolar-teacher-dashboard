import { cn } from "../../../../shared/lib/cn";
import type { Difficulty } from "./types";

export default function TaskSettingsCard({
  duration,
  setDuration,
  difficulty,
  setDifficulty,
  includeMarkingGuide,
  setIncludeMarkingGuide,
}: {
  duration: string;
  setDuration: (v: string) => void;
  difficulty: Difficulty;
  setDifficulty: (v: Difficulty) => void;
  includeMarkingGuide: boolean;
  setIncludeMarkingGuide: (v: boolean) => void;
}) {
  const difficulties: Difficulty[] = ["Easy", "Medium", "Hard", "Mixed"];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">Task Settings</p>
        <p className="text-sm text-slate-500">Configure your task parameters</p>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Target Duration
          </p>
          <div className="mt-2">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm text-black"
            >
              <option value="15 minutes">15 minutes</option>
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="60 minutes">60 minutes</option>
              <option value="90 minutes">90 minutes</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Difficulty Level
          </p>

          <div className="mt-2 grid grid-cols-2 gap-2">
            {difficulties.map((d) => {
              const active = difficulty === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm font-medium transition",
                    active
                      ? "border-[#00B96B] bg-[#00B96B] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={includeMarkingGuide}
            onChange={(e) => setIncludeMarkingGuide(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#00B96B] accent-[#00B96B]"
          />
          <div>
            <p className="text-sm font-medium text-slate-900">Include Marking Guide</p>
            <p className="text-xs text-slate-500">Generate detailed marking criteria</p>
          </div>
        </label>
      </div>
    </div>
  );
}

