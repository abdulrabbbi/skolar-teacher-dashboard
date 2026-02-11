
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ className, type = 'search', ...props }: SearchInputProps) {
  return (
    <input
      type={type}
      className={cn(
        'h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200',
        className,
      )}
      {...props}
    />
  );
}

export default SearchInput;
