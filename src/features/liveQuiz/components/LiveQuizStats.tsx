
import { HelpCircle, TrendingUp, Users, Zap } from "lucide-react";
import StatCard from "../../../shared/components/ui/StatCard";
import type { LiveQuizStat } from "../data/liveQuiz.mock";
import type { JSX } from "react/jsx-runtime";

export type LiveQuizStatsProps = {
  stats: LiveQuizStat[];
};

const iconMap: Record<LiveQuizStat["icon"], JSX.Element> = {
  quizzes: (
    <Zap className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
  ),
  participation: (
    <Users className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
  ),
  score: (
    <TrendingUp className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
  ),
  questions: (
    <HelpCircle className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
  ),
};

export default function LiveQuizStats({ stats }: LiveQuizStatsProps) {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={iconMap[stat.icon]}
            // ✅ all icons same green tile like screenshot
            color="green"
            className="group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          />
        ))}
      </div>
    </section>
  );
}
