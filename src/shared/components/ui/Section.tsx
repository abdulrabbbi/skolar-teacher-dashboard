
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type SectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      {title || description ? (
        <div className="space-y-1">
          {title ? (
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          ) : null}
          {description ? (
            <p className="text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
