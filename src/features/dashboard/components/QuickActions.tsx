import {
  BarChart3,
  Zap,
  Sparkles,
  FileCheck,
} from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import type { QuickActionItem } from "../data/dashboard.mock";
import type { JSX } from "react/jsx-runtime";

export type QuickActionsProps = {
  actions: QuickActionItem[];
};

const iconMap: Record<QuickActionItem["icon"], JSX.Element> = {
  quiz: <Zap className="h-5 w-5 text-white" />,
  compiler: <Sparkles className="h-5 w-5 text-white" />,
  crossMarking: <FileCheck className="h-5 w-5 text-white" />,
  analytics: <BarChart3 className="h-5 w-5 text-white" />,
};

const iconBgMap: Record<QuickActionItem["icon"], string> = {
  quiz: "bg-purple-500",
  compiler: "bg-green-500",
  crossMarking: "bg-blue-500",
  analytics: "bg-orange-500",
};

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold text-slate-900">
        Quick Actions
      </h2>

      <div className="space-y-3">
        {actions.map((action) => (
          <Card
            key={action.id}
            className="
              group flex items-center gap-4
              rounded-xl border border-slate-200 p-4
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:shadow-xl
              hover:shadow-lg
            "
          >
            <div
              className={`
                flex h-10 w-10 items-center justify-center rounded-lg
                transition-transform duration-200 group-hover:scale-110
                ${iconBgMap[action.icon]}
              `}
            >
              {iconMap[action.icon]}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                {action.title}
              </p>
              <p className="text-xs text-slate-500">
                {action.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
