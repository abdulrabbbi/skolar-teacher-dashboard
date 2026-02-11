import { Activity, BarChart3, ClipboardList, Users } from 'lucide-react';
import StatCard from '../../../shared/components/ui/StatCard';
import SectionHeader from '../../../shared/components/ui/SectionHeader';
import type { LiveQuizStat } from '../data/liveQuiz.mock';
import type { JSX } from 'react/jsx-runtime';

export type LiveQuizStatsProps = {
  stats: LiveQuizStat[];
};

const iconMap: Record<LiveQuizStat['icon'], JSX.Element> = {
  quizzes: <ClipboardList className="h-5 w-5" />,
  participation: <Users className="h-5 w-5" />,
  score: <BarChart3 className="h-5 w-5" />,
  questions: <Activity className="h-5 w-5" />,
};

const colorMap: Record<LiveQuizStat['icon'], 'blue' | 'green' | 'purple' | 'orange'> = {
  quizzes: 'blue',
  participation: 'green',
  score: 'purple',
  questions: 'orange',
};

export default function LiveQuizStats({ stats }: LiveQuizStatsProps) {
  return (
    <section className="space-y-4">
      <SectionHeader title="Live Quiz Overview" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={iconMap[stat.icon]}
            color={colorMap[stat.icon]}
          />
        ))}
      </div>
    </section>
  );
}
