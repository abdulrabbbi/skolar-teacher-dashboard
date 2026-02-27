import Card from "../../../shared/components/ui/Card";
import type { AnalyticsStat } from "../data/analytics.mock";

export type AnalyticsStatsProps = {
  stats: AnalyticsStat[];
};

function splitDelta(subtitle: string): { delta?: string; rest: string } {
  const m = subtitle.match(/^([+-]\d+(?:\.\d+)?%?)\s*,\s*(.+)$/);
  if (!m) return { rest: subtitle };
  return { delta: m[1], rest: m[2] };
}

function deltaColor(delta?: string) {
  if (!delta) return "";
  return delta.trim().startsWith("-") ? "text-rose-600" : "text-emerald-600";
}

export default function AnalyticsStats({ stats }: AnalyticsStatsProps) {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const { delta, rest } = splitDelta(stat.subtitle);

          return (
            <Card
              key={stat.id}
              className="
                rounded-2xl border border-slate-200 bg-white p-5 shadow-sm
                transition-all duration-300 ease-in-out
                hover:-translate-y-1 hover:shadow-xl
              "
            >
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>

              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <p className="text-[32px] font-extrabold leading-none tracking-tight text-slate-900">
                  {stat.value}
                </p>

                {delta ? (
                  <span className={`text-sm font-semibold ${deltaColor(delta)}`}>
                    {delta}
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-xs text-slate-500">{rest}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}