import {
  AlertTriangle,
  BadgeCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import type { JSX } from 'react/jsx-runtime';

import StatCard from '../../../shared/components/ui/StatCard';
import type { TaskCompilerStat } from '../data/taskCompiler.mock';

export type TaskCompilerStatsProps = {
  stats: TaskCompilerStat[];
};

const iconMap: Record<TaskCompilerStat['icon'], JSX.Element> = {
  pending: <Clock className="h-5 w-5" />,
  moderation: <AlertTriangle className="h-5 w-5" />,
  agreement: <BadgeCheck className="h-5 w-5" />,
  confidence: <Sparkles className="h-5 w-5" />,
};

export default function TaskCompilerStats({ stats }: TaskCompilerStatsProps) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={iconMap[stat.icon]}
            color={stat.color}
            className="
              transition-all duration-300 ease-in-out
              hover:-translate-y-1
              hover:shadow-xl
            "
          />
        ))}
      </div>
    </section>
  );
}
