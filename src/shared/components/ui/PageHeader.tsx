import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <div className="space-y-1">
        {/* TITLE */}
        <h1
          className="
            text-xl
            sm:text-2xl
            md:text-3xl
            font-semibold
            text-slate-900
            leading-tight
          "
        >
          {title}
        </h1>

        {/* SUBTITLE */}
        {subtitle && (
          <p
            className="
              text-sm
              sm:text-base
              text-slate-500
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
