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
  pending: (
    <Clock className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
  ),
  moderation: (
    <AlertTriangle className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
  ),
  agreement: (
    <BadgeCheck className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
  ),
  confidence: (
    <Sparkles className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
  ),
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
          className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg group"
        />
      ))}
    </div>
  );
}
