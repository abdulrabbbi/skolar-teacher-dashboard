import Card from "../../../shared/components/ui/Card";
import ProgressBar from "../../../shared/components/ui/ProgressBar"; 
import type { LearningProfileItem } from "../data/analytics.mock";
import { ChevronDown } from "lucide-react";

export type LearningProfileProps = {
  profiles: LearningProfileItem[];
};

export default function LearningProfile({ profiles }: LearningProfileProps) {
  return (
    <section>
      <Card className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">
              Learning Profile
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Aggregate class performance by dimension
            </p>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            All Topics
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Visualise your strengths across your subjects
        </p>

        <div className="mt-6 space-y-5">
          {profiles.map((p) => {
            const score = Math.max(0, Math.min(100, Math.round(p.score)));

            return (
              <div
                key={p.id}
                className="grid grid-cols-1 gap-2 sm:grid-cols-[140px_1fr] sm:items-center"
              >
                <p className="text-sm font-medium text-slate-900">{p.label}</p>

                <div className="w-full">
                  <div className="sr-only">
                    <ProgressBar value={score} variant="green" />
                  </div>

                  <div className="relative h-7 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${score}%` }}
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center">
                      <div className="h-full" style={{ width: `${score}%` }}>
                        <div className="flex h-full items-center justify-end pr-4">
                          <span className="text-sm font-semibold text-white">
                            {score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-slate-500">Edit subjects (Coming soon)</p>
      </Card>
    </section>
  );
}