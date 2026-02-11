// src/shared/components/ui/ToggleRow.tsx
import { cn } from '../../lib/cn';

export type ToggleRowProps = {
  title: string;
  description: string;
  enabled: boolean;
  className?: string;
};

export default function ToggleRow({
  title,
  description,
  enabled,
  className,
}: ToggleRowProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" checked={enabled} readOnly />
        <span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-slate-900" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
      </label>
    </div>
  );
}
