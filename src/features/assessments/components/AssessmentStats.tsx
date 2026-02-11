
import { ClipboardCheck, ClipboardList, LineChart, Timer } from 'lucide-react';
import StatCard from '../../../shared/components/ui/StatCard';
import type { AssessmentStat } from '../data/assessments.mock';
import type { JSX } from 'react/jsx-runtime';

export type AssessmentStatsProps = {
  stats: AssessmentStat[];
};

const iconMap: Record<AssessmentStat['icon'], JSX.Element> = {
  marking: <ClipboardCheck className="h-5 w-5" />,
  active: <ClipboardList className="h-5 w-5" />,
  week: <Timer className="h-5 w-5" />,
  average: <LineChart className="h-5 w-5" />,
};

export default function AssessmentStats({ stats }: AssessmentStatsProps) {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={iconMap[stat.icon]}
            color={stat.color}
          />
        ))}
      </div>
    </section>
  );
}
