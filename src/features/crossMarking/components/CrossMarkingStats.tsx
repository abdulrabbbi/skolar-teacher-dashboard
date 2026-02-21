// src/features/crossMarking/components/CrossMarkingStats.tsx

import StatCard from "../../../shared/components/ui/StatCard";
import type { CrossMarkingStat } from "../data/crossMarking.mock";
import type { JSX } from "react/jsx-runtime";

// ✅ SVG imports
import PendingIcon from "../../../assets/images/Container (6).svg";
import ModerationIcon from "../../../assets/images/Container (7).svg";
import AgreementIcon from "../../../assets/images/Container (8).svg";
import ConfidenceIcon from "../../../assets/images/Container (9).svg";

export type CrossMarkingStatsProps = {
  stats: CrossMarkingStat[];
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

const iconMap: Record<CrossMarkingStat["icon"], JSX.Element> = {
  pending: <SvgIcon src={PendingIcon} alt="Pending" />,
  moderation: <SvgIcon src={ModerationIcon} alt="Moderation" />,
  agreement: <SvgIcon src={AgreementIcon} alt="Agreement" />,
  confidence: <SvgIcon src={ConfidenceIcon} alt="Confidence" />,
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