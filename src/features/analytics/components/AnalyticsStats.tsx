
import StatCard from '../../../shared/components/ui/StatCard';

import type { AnalyticsStat } from '../data/analytics.mock';

export type AnalyticsStatsProps = {
  stats: AnalyticsStat[];
};

export default function AnalyticsStats({ stats }: AnalyticsStatsProps) {
  return (
    <section className="space-y-4">
     

      <div
        className="
          grid grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            subtitle={stat.subtitle}
            /* ❌ icon intentionally removed to match real UI */
          />
        ))}
      </div>
    </section>
  );
}
