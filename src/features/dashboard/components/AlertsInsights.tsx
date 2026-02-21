// import { AlertCircle, ArrowRight, Clock, FileText, Users } from "lucide-react";
import { AlertCircle, Users, Clock, FileText, ArrowRight } from "lucide-react";
import type { AlertInsightItem } from "../data/dashboard.mock";

export type AlertsInsightsProps = {
  alerts: AlertInsightItem[];
};

const toneConfig = {
  alert: { Icon: AlertCircle, iconClass: "text-orange-500" },
  insight: { Icon: Users, iconClass: "text-blue-600" },
  reminder: { Icon: Clock, iconClass: "text-red-500" },
  support: { Icon: FileText, iconClass: "text-violet-600" },
} as const;

export default function AlertsInsights({ alerts }: AlertsInsightsProps) {
  return (
    <section className="">
      <h2 className="text-base font-semibold text-slate-900">Alerts & Insights</h2>
      <p className="mt-1 text-xs text-slate-500">Actionable signals from your data</p>

      <ul className="mt-5 space-y-4">
        {alerts.map((alert) => {
          const { Icon, iconClass } = toneConfig[alert.tone];

          return (
            <li
              key={alert.id}
              className="rounded-xl border border-slate-200 bg-white px-2 py-5"
            >
              {/* One row layout like screenshot */}
              <div className="flex items-center gap-4">
                {/* icon */}
                <Icon className={`h-6 w-6 shrink-0 ${iconClass}`} />

                {/* message (single line on desktop, can wrap on mobile) */}
                <p className="min-w-0 flex-1 text-sm font-semibold text-slate-900 sm:whitespace-nowrap sm:truncate">
                  {alert.message}
                </p>

                {/* right action (insight only) */}
                {alert.tone === "insight" && (
                  <button
                    type="button"
                    className="
                      hidden shrink-0 items-center gap-2
                      text-sm font-semibold text-emerald-600
                      hover:text-emerald-700 md:inline-flex
                    "
                  >
                    Identify Students
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* mobile action (stays inside card, below) */}
              {alert.tone === "insight" && (
                <div className="mt-3 md:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Identify Students
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
