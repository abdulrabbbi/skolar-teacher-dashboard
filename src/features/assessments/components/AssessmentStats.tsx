import StatCard from "../../../shared/components/ui/StatCard";
import type { AssessmentStat } from "../data/assessments.mock";
import type { JSX } from "react/jsx-runtime";

// SVG icons
import ActiveIcon from "../../../assets/images/Container (10).svg";
import AvgScoreIcon from "../../../assets/images/Container (13).svg";
import WatchIcon from "../../../assets/images/watch.svg";
import SheetCheckIcon from "../../../assets/images/sheetcheck.svg";

export type AssessmentStatsProps = {
  stats: AssessmentStat[];
};

function SvgIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-11 w-11 transition-transform duration-200 group-hover:scale-110"
      draggable={false}
    />
  );
}

const iconMap: Record<AssessmentStat["icon"], JSX.Element> = {
  marking: <SvgIcon src={SheetCheckIcon} alt="Need Marking" />,
  active: <SvgIcon src={ActiveIcon} alt="Active" />,
  week: <SvgIcon src={WatchIcon} alt="This Week" />,
  average: <SvgIcon src={AvgScoreIcon} alt="Average Score" />,
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
            className="group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
          />
        ))}
      </div>
    </section>
  );
}