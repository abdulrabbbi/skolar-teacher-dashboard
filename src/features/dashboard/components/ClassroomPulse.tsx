import { AlertTriangle, Target, Users } from "lucide-react";
import StatCard from "../../../shared/components/ui/StatCard";
import type { PulseStat } from "../data/dashboard.mock";
import type { JSX } from "react/jsx-runtime";

import OnTrackIcon from "../../../assets/images/Container (14).svg";

export type ClassroomPulseProps = {
  stats: PulseStat[];
};

const iconBase =
  "h-5 w-5 transition-transform duration-200 group-hover:scale-110";

const iconMap: Record<PulseStat["icon"], JSX.Element> = {
  students: <Users className={iconBase} />,

  // ✅ only onTrack bigger
  onTrack: (
    <img
      src={OnTrackIcon}
      alt="On Track"
      className="h-11 w-11 transition-transform duration-200 group-hover:scale-110"
      draggable={false}
    />
  ),

  atRisk: <AlertTriangle className={iconBase} />,
  accuracy: <Target className={iconBase} />,
};

const iconBgMap: Record<PulseStat["icon"], string> = {
  students: "bg-blue-600 text-white",
  onTrack: "bg-green-600 text-white",
  atRisk: "bg-orange-500 text-white",
  accuracy: "bg-purple-600 text-white",
};

export default function ClassroomPulse({ stats }: ClassroomPulseProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={
            <div
              className={`group flex h-10 w-10 items-center justify-center rounded-xl ${iconBgMap[stat.icon]}`}
            >
              {iconMap[stat.icon]}
            </div>
          }
          className="group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        />
      ))}
    </div>
  );
}