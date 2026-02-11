
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
      <Card className="space-y-2 p-4 sm:p-5">
        {/* HEADER INSIDE MODULE */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text- font-semibold text-slate-900">
              Learning Profile
            </h3>
            <p className="text-sm text-slate-500">
              Aggregate class performance by dimension
            </p>
          </div>

          {/* ALL TOPICS BUTTON */}
          <button
            type="button"
            className="
              inline-flex items-center gap-1
              rounded-md border border-slate-200
              bg-white px-3 py-1.5
              text-sm text-slate-700
              hover:bg-slate-50
            "
          >
            All Topics
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-500">
          Visualise your strengths across your subjects
        </p>

        {/* FULL WIDTH BARS */}
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

        {/* FOOT NOTE */}
        <p className="text-xs text-slate-400">
          Edit subjects (Coming soon)
        </p>
      </Card>
    </section>
  );
}
