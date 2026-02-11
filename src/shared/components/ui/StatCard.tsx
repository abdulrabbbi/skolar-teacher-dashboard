import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Card from './Card';

export type StatCardProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  color?: 'red' | 'green' | 'orange' | 'purple' | 'blue';
};

/* ==========================
   ICON COLOR SYSTEM
========================== */

function getIconColor(color?: StatCardProps['color']) {
  switch (color) {
    case 'red':
      return 'bg-red-500 text-white';
    case 'green':
      return 'bg-emerald-600 text-white';
    case 'orange':
      return 'bg-orange-500 text-white';
    case 'purple':
      return 'bg-purple-600 text-white';
    case 'blue':
      return 'bg-blue-600 text-white';
    default:
      return ''; // ✅ VERY IMPORTANT: no background if color not provided
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
        'flex items-start justify-between gap-4 min-h-[96px] sm:min-h-[104px]',
        className
      )}
      {...props}
    >
      {/* LEFT CONTENT */}
      <div className="flex flex-col justify-between">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>

        <div className="text-xl sm:text-2xl font-semibold text-slate-900 leading-tight">
          {value}
        </div>

        <p className="min-h-[18px] text-sm text-slate-500">
          {subtitle ?? ''}
        </p>
      </div>

      {/* ICON */}
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl shrink-0',
            getIconColor(color)
          )}
        >
          {icon}
        </div>
      )}
    </Card>
  );
}
