// import {
//   AlertTriangle,
//   BadgeCheck,
//   Clock,
//   Sparkles,
// } from 'lucide-react';
// import type { JSX } from 'react/jsx-runtime';

// import StatCard from '../../../shared/components/ui/StatCard';
// import type { TaskCompilerStat } from '../data/taskCompiler.mock';

// export type TaskCompilerStatsProps = {
//   stats: TaskCompilerStat[];
// };

// const iconMap: Record<TaskCompilerStat['icon'], JSX.Element> = {
//   pending: (
//     <Clock className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
//   ),
//   moderation: (
//     <AlertTriangle className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
//   ),
//   agreement: (
//     <BadgeCheck className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
//   ),
//   confidence: (
//     <Sparkles className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
//   ),
// };

// export default function TaskCompilerStats({ stats }: TaskCompilerStatsProps) {
//   return (
//     <section>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//         {stats.map((stat) => (
//           <StatCard
//             key={stat.id}
//             label={stat.label}
//             value={stat.value}
//             subtitle={stat.subtitle}
//             icon={iconMap[stat.icon]}
//             color={stat.color}
//             className="
//               group
//               transition-all duration-300 ease-in-out
//               hover:-translate-y-1
//               hover:shadow-lg
//             "
//           />
//         ))}
//       </div>
//     </section>
//   );
// }


import StatCard from "../../../shared/components/ui/StatCard";
import type { JSX } from "react/jsx-runtime";
import type { TaskCompilerStat } from "../data/taskCompiler.mock";

// ✅ SVG imports
import PendingIcon from "../../../assets/images/Container (6).svg";
import ModerationIcon from "../../../assets/images/Container (7).svg";
import AgreementIcon from "../../../assets/images/Container (8).svg";
import ConfidenceIcon from "../../../assets/images/Container (9).svg";

export type TaskCompilerStatsProps = {
  stats: TaskCompilerStat[];
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

// ✅ Map your stat.icon keys to SVGs
const iconMap: Record<TaskCompilerStat["icon"], JSX.Element> = {
  pending: <SvgIcon src={PendingIcon} alt="Pending" />,
  moderation: <SvgIcon src={ModerationIcon} alt="Moderation" />,
  agreement: <SvgIcon src={AgreementIcon} alt="Agreement" />,
  confidence: <SvgIcon src={ConfidenceIcon} alt="Confidence" />,
};

export default function TaskCompilerStats({ stats }: TaskCompilerStatsProps) {
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