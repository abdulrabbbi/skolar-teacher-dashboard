
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

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
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between h-13 ",
        className
      )}
    >
      {/* LEFT SIDE */}
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
            transition-colors duration-200
          "
        >
          {title}
        </h1>

        {/* SUBTITLE */}
        {subtitle && (
          <p
            className="
              text-xs
              sm:text-sm
              text-slate-500
              leading-snug
              transition-colors duration-200
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* RIGHT SIDE ACTIONS */}
      {actions && (
        <div className="flex flex-wrap items-center gap-3 transition-all duration-200">
          {actions}
        </div>
      )}
    </div>
  );
}
