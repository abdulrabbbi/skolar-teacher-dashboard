import { NavLink } from "react-router-dom";
import { History, Layers, Zap } from "lucide-react";
import { cn } from "../../../shared/lib/cn";

const tabs = [
  { to: "by-subject", label: "By Subject & Study Design", icon: Layers, end: false },
  { to: "quick-content", label: "Generate Quick Content", icon: Zap, end: false },
  { to: "history", label: "Task History", icon: History, end: false },
] as const;

export default function TaskCompilerActions() {
  return (
    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-slate-100/80 p-1">
      {tabs.map((t) => {
        const Icon = t.icon;
        return (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200",
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-700 hover:bg-white/60",
              )
            }
          >
            <Icon className="h-4 w-4 text-slate-700" />
            {t.label}
          </NavLink>
        );
      })}
    </div>
  );
}