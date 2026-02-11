import {
  AlertTriangle,
  Clock,
  LifeBuoy,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import type { AlertInsightItem } from "../data/dashboard.mock";

export type AlertsInsightsProps = {
  alerts: AlertInsightItem[];
};

const toneConfig = {
  alert: {
    label: "Alert",
    badge: "danger",
    Icon: AlertTriangle,
  },
  insight: {
    label: "Insight",
    badge: "neutral",
    Icon: Sparkles,
  },
  reminder: {
    label: "Reminder",
    badge: "warning",
    Icon: Clock,
  },
  support: {
    label: "Support",
    badge: "success",
    Icon: LifeBuoy,
  },
} as const;

export default function AlertsInsights({ alerts }: AlertsInsightsProps) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold text-slate-900">
        Alerts & Insights
      </h2>

      <p className="text-sm text-slate-500">
        Actionable signals from your data
      </p>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const { badge, label, Icon } = toneConfig[alert.tone];

          return (
            <div
              key={alert.id}
              className="
                group flex items-start gap-4
                rounded-xl border border-slate-200 p-4
                transition-all duration-300 ease-in-out
                hover:-translate-y-1 hover:shadow-lg
                transition-all duration-200 hover:shadow-md
              "
            >
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-transform duration-200 group-hover:scale-110">
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 space-y-1">
                <Badge variant={badge}>{label}</Badge>

                <p className="text-sm text-slate-700">
                  {alert.message}
                </p>

                {alert.tone === "insight" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-0 text-green-600 hover:text-green-700 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Identify Students
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
