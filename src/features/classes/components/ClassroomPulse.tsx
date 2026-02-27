import type { JSX } from "react/jsx-runtime";
import { AlertTriangle, Target, Users } from "lucide-react";
import OnTrackIcon from "../../../assets/images/Container (14).svg";
import { cn } from "../../../shared/lib/cn";
import type {
  ClassroomPulseStat,
  StudentFilter,
} from "../data/students.mock";

export type ClassroomPulseProps = {
  stats: ClassroomPulseStat[];
  activeFilter?: StudentFilter;
  onFilterChange?: (f: StudentFilter) => void;
};

const iconMap: Record<ClassroomPulseStat["icon"], JSX.Element> = {
  students: <Users className="h-5 w-5" />,

  onTrack: (
    <img
      src={OnTrackIcon}
      alt="On Track"
      className="h-11 w-11"
      draggable={false}
    />
  ),

  atRisk: <AlertTriangle className="h-5 w-5" />,
  accuracy: <Target className="h-5 w-5" />,
};

const iconBgMap: Record<ClassroomPulseStat["icon"], string> = {
  students: "bg-blue-600 text-white",
  onTrack: "bg-emerald-600 text-white",
  atRisk: "bg-orange-500 text-white",
  accuracy: "bg-purple-600 text-white",
};

function statToFilter(stat: ClassroomPulseStat): StudentFilter | null {
  if (stat.icon === "onTrack") return "onTrack";
  if (stat.icon === "atRisk") return "atRisk";
  if (stat.icon === "accuracy") return "accuracy";
  return "all";
}

export default function ClassroomPulse({
  stats,
  activeFilter = "all",
  onFilterChange,
}: ClassroomPulseProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const filter = statToFilter(stat);
        const isActive = filter && activeFilter === filter;

        return (
          <button
            key={stat.id}
            type="button"
            onClick={() => (filter ? onFilterChange?.(filter) : undefined)}
            className={cn(
              `
              w-full text-left
              rounded-2xl border border-slate-200 bg-white
              p-5
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300
              `,
              // ✅ fixed height like figma
              "min-h-[132px]",
              isActive && ""
            )}
          >
            <div className="flex items-start justify-between gap-4">
              {/* LEFT */}
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-[34px] font-extrabold leading-none text-slate-900">
                  {stat.value}
                </p>

                {stat.subtitle ? (
                  <p className="mt-4 text-sm text-slate-500">{stat.subtitle}</p>
                ) : (
                  <div className="mt-4 h-5" />
                )}
              </div>

              {/* RIGHT ICON */}
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  iconBgMap[stat.icon]
                )}
              >
                {iconMap[stat.icon]}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
