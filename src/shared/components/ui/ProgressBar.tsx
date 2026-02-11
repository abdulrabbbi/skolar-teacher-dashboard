
// import { cn } from '../../lib/cn';

// export type ProgressVariant = 'green' | 'orange' | 'red';

// export type ProgressBarProps = {
//   value: number;
//   max?: number;
//   variant?: ProgressVariant;
//   className?: string;
// };

// const variantStyles: Record<ProgressVariant, string> = {
//   green: 'bg-emerald-500',
//   orange: 'bg-amber-500',
//   red: 'bg-rose-500',
// };

// const clamp = (value: number, min: number, max: number) =>
//   Math.min(Math.max(value, min), max);

// export function ProgressBar({
//   value,
//   max = 100,
//   variant = 'green',
//   className,
// }: ProgressBarProps) {
//   const safeMax = max > 0 ? max : 100;
//   const percentage = clamp((value / safeMax) * 100, 0, 100);

//   return (
//     <div className={cn('h-2 w-full rounded-full bg-slate-200', className)}>
//       <div
//         className={cn('h-2 rounded-full transition-all', variantStyles[variant])}
//         style={{ width: `${percentage}%` }}
//       />
//     </div>
//   );
// }

// export default ProgressBar;




// src/shared/components/ui/ProgressBar.tsx
import { cn } from '../../lib/cn';

export type ProgressVariant = 'green' | 'orange' | 'red';

export type ProgressBarProps = {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  className?: string;
};

const variantStyles: Record<ProgressVariant, string> = {
  green: 'bg-emerald-500',
  orange: 'bg-amber-500',
  red: 'bg-rose-500',
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function ProgressBar({
  value,
  max = 100,
  variant = 'green',
  className,
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const percentage = clamp((value / safeMax) * 100, 0, 100);

  return (
    <div className={cn('h-1.5 w-full rounded-full bg-slate-200', className)}>
      <div
        className={cn(
          'h-1.5 rounded-full transition-all',
          variantStyles[variant],
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default ProgressBar;
