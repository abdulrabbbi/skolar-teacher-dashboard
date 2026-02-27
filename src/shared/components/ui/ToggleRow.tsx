import { cn } from "../../lib/cn";

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
    <div
      className={cn(
        `
        flex items-center justify-between gap-4
        rounded-2xl border border-slate-200
        bg-slate-50
        p-4
        `,
        className
      )}
    >
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={enabled}
          readOnly
        />
        <span className="h-7 w-12 rounded-full bg-slate-200 transition peer-checked:bg-slate-900" />
        <span className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </label>
    </div>
  );
}