
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
};

export default function InputField({
  label,
  helperText,
  className,
  id,
  ...props
}: InputFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={inputId} className="block space-y-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <input
        id={inputId}
        className={cn(
          'h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:bg-slate-100 disabled:text-slate-500',
          className,
        )}
        {...props}
      />
      {helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </label>
  );
}
