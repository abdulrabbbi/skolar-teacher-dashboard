import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  // ✅ Marked (green) — figma style
  success: "bg-emerald-100 text-emerald-700",

  // ✅ Moderation (blue) — figma style
  warning: "bg-blue-100 text-blue-700",

  // ✅ Keep danger for real errors if used elsewhere
  danger: "bg-rose-100 text-rose-700",

  // ✅ Pending (yellow) — figma style
  info: "bg-yellow-100 text-yellow-700",

  // ✅ Neutral for generic chips
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
        // ✅ pill size closer to figma (your screenshot)
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm ",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export default Badge;