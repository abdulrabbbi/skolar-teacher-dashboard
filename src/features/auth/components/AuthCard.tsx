import type { HTMLAttributes } from "react";
import { cn } from "../../../shared/lib/cn";

export type AuthCardProps = HTMLAttributes<HTMLDivElement>;

export function AuthCard({ className, ...props }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export default AuthCard;
