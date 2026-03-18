import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  //  Marked (green) — figma style
  success: "bg-[#00B96B1A] text-[#00B96B]",

  //  Warning (orange) — figma style
  warning: "bg-orange-100 text-orange-600",

  //  Keep danger for real errors if used elsewhere
  danger: "bg-rose-100 text-rose-700",

  //  Pending (yellow) — figma style
  info: "bg-yellow-100 text-yellow-700",

  //  Neutral for generic chips
  neutral: "bg-slate-100 text-slate-700",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        // pill size closer to figma (your screenshot)
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs ",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export default Badge;
