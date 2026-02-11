// src/features/crossMarking/components/CrossMarkingStats.tsx

import {
  AlertTriangle,
  BadgeCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import StatCard from '../../../shared/components/ui/StatCard';
import type { CrossMarkingStat } from '../data/crossMarking.mock';
import type { JSX } from 'react/jsx-runtime';

export type CrossMarkingStatsProps = {
  stats: CrossMarkingStat[];
};

const iconMap: Record<CrossMarkingStat['icon'], JSX.Element> = {
  pending: <Clock className="h-5 w-5" />,
  moderation: <AlertTriangle className="h-5 w-5" />,
  agreement: <BadgeCheck className="h-5 w-5" />,
  confidence: <Sparkles className="h-5 w-5" />,
};

export default function CrossMarkingStats({ stats }: CrossMarkingStatsProps) {
  return (
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
  );
}
