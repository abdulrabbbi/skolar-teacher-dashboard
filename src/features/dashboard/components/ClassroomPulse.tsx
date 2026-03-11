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
  students: "bg-emerald-500 text-white",
  onTrack: "bg-[#00B96B] text-white",
  atRisk: "bg-amber-500 text-white",
  accuracy: "bg-emerald-700 text-white",
};

export default function ClassroomPulse({ stats }: ClassroomPulseProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-extrabold text-emerald-950 sm:text-lg">
          Classroom Pulse
        </h2>
        <p className="mt-1 text-xs text-emerald-900/70 sm:text-sm">
          Real-time class health overview
        </p>
      </div>

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
            className="
              group border-emerald-200/70 bg-white/45
              backdrop-blur-md shadow-[0_10px_24px_rgba(16,185,129,0.12)]
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:border-emerald-300/90 hover:bg-white/60
              hover:shadow-[0_14px_30px_rgba(16,185,129,0.18)]
            "
          />
        ))}
      </div>
    </div>
  );
}
