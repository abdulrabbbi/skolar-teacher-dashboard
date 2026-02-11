
import Card from '../../../shared/components/ui/Card';
import ProgressBar from '../../../shared/components/ui/ProgressBar';
import type { CommandWordItem } from '../data/analytics.mock';

export type CommandWordAnalysisProps = {
  items: CommandWordItem[];
  insight: string;
};

const toneVariant: Record<CommandWordItem['tone'], 'green' | 'orange' | 'red'> = {
  green: 'green',
  orange: 'orange',
  red: 'red',
};

export default function CommandWordAnalysis({
  items,
  insight,
}: CommandWordAnalysisProps) {
  return (
    <section>
      {/* OUTER MODULE */}
      <Card className="space-y-6 p-4 sm:p-6">
        {/* HEADER INSIDE CARD */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Command Word Analysis
          </h3>
          <p className="text-sm text-slate-500">
            Performance by question type
          </p>
        </div>

        {/* ITEMS GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.attempts} attempts
                  </p>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    item.tone === 'green'
                      ? 'text-emerald-600'
                      : item.tone === 'orange'
                      ? 'text-orange-600'
                      : 'text-rose-600'
                  }`}
                >
                  {item.percent}%
                </span>
              </div>

              <ProgressBar
                value={item.percent}
                variant={toneVariant[item.tone]}
              />
            </div>
          ))}
        </div>

        {/* INSIGHT CALLOUT */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {insight}
        </div>
      </Card>
    </section>
  );
}
