// import type { HTMLAttributes, ReactNode } from 'react';
// import { cn } from '../../lib/cn';
// import Card from './Card';

// export type StatCardProps = HTMLAttributes<HTMLDivElement> & {
//   label: string;
//   value: ReactNode;
//   subtitle?: ReactNode;
//   icon?: ReactNode;
//   color?: 'red' | 'green' | 'orange' | 'purple' | 'blue';
// };

// function getIconColor(color?: StatCardProps['color']) {
//   switch (color) {
//     case 'red':
//       return 'bg-red-500 text-white';
//     case 'green':
//       return 'bg-emerald-600 text-white';
//     case 'orange':
//       return 'bg-orange-500 text-white';
//     case 'purple':
//       return 'bg-purple-600 text-white';
//     case 'blue':
//       return 'bg-blue-600 text-white';
//     default:
//       return ''; 
//   }
// }

// export default function StatCard({
//   label,
//   value,
//   subtitle,
//   icon,
//   color,
//   className,
//   ...props
// }: StatCardProps) {
//   return (
//     <Card
//       className={cn(
//         'flex items-start justify-between gap-4 min-h-[96px] sm:min-h-[104px]',
//         className
//       )}
//       {...props}
//     >
//       <div className="flex flex-col justify-between">
//         <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
//           {label}
//         </p>

//         <div className="text-xl sm:text-2xl font-semibold text-slate-900 leading-tight">
//           {value}
//         </div>

//         <p className="min-h-[18px] text-sm text-slate-500">
//           {subtitle ?? ''}
//         </p>
//       </div>

//       {icon && (
//         <div
//           className={cn(
//             'flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl shrink-0',
//             getIconColor(color)
//           )}
//         >
//           {icon}
//         </div>
//       )}
//     </Card>
//   );
// }



import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import Card from "./Card";

export type StatCardProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  color?: "red" | "green" | "orange" | "purple" | "blue";
};

function getIconTile(color?: StatCardProps["color"]) {
  switch (color) {
    case "red":
      return "bg-red-50 text-red-600";
    case "green":
      return "bg-emerald-100 text-emerald-700";
    case "orange":
      return "bg-orange-50 text-orange-600";
    case "purple":
      return "bg-purple-50 text-purple-700";
    case "blue":
      return "bg-blue-50 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function StatCard({
  label,
  value,
  subtitle,
  icon,
  color,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5",
        "min-h-[92px] sm:min-h-[100px]",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col">
        <p className="text-sm font-medium text-slate-500">{label}</p>

        <div className="mt-2 text-3xl font-semibold leading-none text-slate-900">
          {value}
        </div>

        {subtitle ? (
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>

      {icon ? (
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
            getIconTile(color)
          )}
        >
          {icon}
        </div>
      ) : null}
    </Card>
  );
}