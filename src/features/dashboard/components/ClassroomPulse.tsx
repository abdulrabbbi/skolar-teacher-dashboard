import { AlertTriangle, Target, UserCheck, Users } from "lucide-react";
import StatCard from "../../../shared/components/ui/StatCard";
import type { PulseStat } from "../data/dashboard.mock";
import type { JSX } from "react/jsx-runtime";

export type ClassroomPulseProps = {
  stats: PulseStat[];
};

/* =======================
   Icon + Background Map
======================= */

const iconBase = "h-5 w-5";

const iconMap: Record<PulseStat["icon"], JSX.Element> = {
  students: <Users className={iconBase} />,
  onTrack: <UserCheck className={iconBase} />,
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
    <section className="space-y-2">
      {/* SMALL HEADING */}
      <h2 className="text-base font-semibold text-slate-900">
        Classroom Pulse
      </h2>

      {/* SUBTITLE */}
      <p className="text-sm text-slate-500">
        Real-time class health overview
      </p>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBgMap[stat.icon]}`}
              >
                {iconMap[stat.icon]}
              </div>
            }
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
