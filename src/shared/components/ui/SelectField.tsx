// src/shared/components/ui/SelectField.tsx
import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  helperText?: string;
};

export default function SelectField({
  label,
  helperText,
  className,
  id,
  children,
  ...props
}: SelectFieldProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={selectId} className="block space-y-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <select
        id={selectId}
        className={cn(
          'h-10 w-full rounded-md bg-gray-100 px-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:bg-slate-100 disabled:text-slate-500',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </label>
  );
}
