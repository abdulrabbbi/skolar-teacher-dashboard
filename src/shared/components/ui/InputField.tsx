
// import type { InputHTMLAttributes } from 'react';
// import { cn } from '../../lib/cn';

// export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
//   label: string;
//   helperText?: string;
// };

// export default function InputField({
//   label,
//   helperText,
//   className,
//   id,
//   ...props
// }: InputFieldProps) {
//   const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

//   return (
//     <label htmlFor={inputId} className="block space-y-1">
//       <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//         {label}
//       </span>
//       <input
//         id={inputId}
//         className={cn(
//           'h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:bg-slate-100 disabled:text-slate-500',
//           className,
//         )}
//         {...props}
//       />
//       {helperText ? (
//         <p className="text-xs text-slate-500">{helperText}</p>
//       ) : null}
//     </label>
//   );
// }



import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export default function InputField({
  label,
  helperText,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <label className="block space-y-2">
      {label ? (
        <span className="block text-sm font-semibold text-slate-900">
          {label}
        </span>
      ) : null}

      <input
        {...props}
        disabled={disabled}
        className={cn(
          `
          w-full h-11 rounded-xl
          bg-slate-100
          border border-transparent
          px-4 text-sm text-slate-900
          placeholder:text-slate-400
          outline-none focus:outline-none focus:ring-0 focus:border-transparent
          disabled:opacity-60 disabled:cursor-not-allowed
          `,
          className
        )}
      />

      {helperText ? (
        <span className="block text-sm text-slate-500">{helperText}</span>
      ) : null}
    </label>
  );
}