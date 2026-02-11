import Card from '../../../shared/components/ui/Card';
import ProgressBar from '../../../shared/components/ui/ProgressBar';
import type { LearningProfileItem } from '../data/analytics.mock';
import { ChevronDown } from 'lucide-react';

export type LearningProfileProps = {
  profiles: LearningProfileItem[];
};

const getVariant = (score: number) => {
  if (score >= 80) return 'green' as const;
  if (score >= 70) return 'orange' as const;
  return 'red' as const;
};

export default function LearningProfile({ profiles }: LearningProfileProps) {
  return (
    <section>
      <Card
        className="
          space-y-4 p-4 sm:p-5
          transition-all duration-300 ease-in-out
          hover:-translate-y-1 hover:shadow-xl
        "
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Learning Profile
            </h3>
            <p className="text-sm text-slate-500">
              Aggregate class performance by dimension
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex items-center gap-1
              rounded-md border border-slate-200
              bg-white px-3 py-1.5
              text-sm text-slate-700
              transition-all duration-200
              hover:bg-slate-50 hover:shadow-sm
            "
          >
            All Topics
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <p className="text-sm text-slate-500">
          Visualise your strengths across your subjects
        </p>

        <div className="space-y-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900">
                  {profile.label}
                </span>
                <span className="font-semibold text-slate-700">
                  {profile.score}%
                </span>
              </div>

              <ProgressBar
                value={profile.score}
                variant={getVariant(profile.score)}
              />
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400">
          Edit subjects (Coming soon)
        </p>
      </Card>
    </section>
  );
}
