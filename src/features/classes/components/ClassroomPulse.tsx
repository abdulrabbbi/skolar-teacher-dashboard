import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Target, UserCheck, Users } from "lucide-react";
import StatCard from "../../../shared/components/ui/StatCard";
import { cn } from "../../../shared/lib/cn";
import type { ClassroomPulseStat, StudentFilter } from "../data/students.mock";

export type ClassroomPulseProps = {
  stats: ClassroomPulseStat[];
  activeFilter: StudentFilter;
  onFilterChange: (filter: StudentFilter) => void;
};

/* =======================
   ICON MAP
   ======================= */
const iconMap: Record<ClassroomPulseStat["icon"], LucideIcon> = {
  students: Users,
  onTrack: UserCheck,
  atRisk: AlertTriangle,
  accuracy: Target,
};

/* =======================
   ICON BACKGROUND COLORS
   ======================= */
const iconBgMap: Record<ClassroomPulseStat["icon"], string> = {
  students: "bg-blue-500 text-white",
  onTrack: "bg-green-500 text-white",
  atRisk: "bg-orange-500 text-white",
  accuracy: "bg-purple-500 text-white",
};

const cardBase =
  "transition-shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2";

export default function ClassroomPulse({
  stats,
  activeFilter,
  onFilterChange,
}: ClassroomPulseProps) {
  return (
    <section className="space-y-4">
      {/* HEADER */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">
          Classroom Pulse
        </h2>
        <p className="text-sm text-slate-500">
          Real-time class health overview
        </p>
      </div>

      {/* CARDS */}
      <div
        className="
          grid grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          const isActive = stat.filterKey === activeFilter;

          return (
            <button
              key={stat.id}
              type="button"
              onClick={() => onFilterChange(stat.filterKey)}
              aria-pressed={isActive}
              className="group text-left w-full"
            >
              <StatCard
                label={stat.label}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={
                  <div
                    className={cn(
                      "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110",
                      iconBgMap[stat.icon]
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                }
                className={cn(
                  cardBase,
                  "min-h-[96px]", // 👈 keeps all cards equal height
                  isActive
                    ? "border-slate-900/20 bg-slate-900/5 shadow-sm ring-2 ring-slate-900/15"
                    : "hover:shadow-md",
                  "group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                )}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
