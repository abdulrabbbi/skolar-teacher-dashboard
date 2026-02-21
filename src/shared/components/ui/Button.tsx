import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "success"
  | "warning"; // ✅ NEW

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-green-600 text-white hover:bg-green-700",

  secondary:
    "bg-white text-black hover:bg-slate-50 border border-slate-300",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",

  ghost: "text-slate-700 hover:bg-slate-100",

  success:
    "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",

  // ✅ ORANGE BUTTON (for moderation alert)
  warning:
    "bg-[#E17100] text-white hover:bg-[#D46600] focus-visible:ring-[#E17100]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}

export default Button;