

import { AlertTriangle, CheckCircle2, ChevronRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../app/router/routes";
import Card from "../../../shared/components/ui/Card";
import type { ClassOverviewItem } from "../data/dashboard.mock";

export type ClassesOverviewProps = {
  classes: ClassOverviewItem[];
};

export default function ClassesOverview({ classes }: ClassesOverviewProps) {
  const navigate = useNavigate();

  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-slate-900">Classes Overview</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {classes.map((item) => (
          <Card
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(ROUTES.classDetails(item.slug))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(ROUTES.classDetails(item.slug));
              }
            }}
            className="
              group cursor-pointer
              rounded-2xl border border-slate-200 bg-white
              p-5
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300
              outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {/* Title */}
                <p className="truncate text-lg font-semibold text-slate-900">
                  {item.name}
                </p>

                {/* Bottom row (exact like screenshot) */}
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <span className="inline-flex items-center gap-2 text-slate-500">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>{item.total} students</span>
                  </span>

                  <span className="inline-flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{item.onTrack} on track</span>
                  </span>

                  <span className="inline-flex items-center gap-2 text-orange-500">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{item.atRisk} at risk</span>
                  </span>
                </div>
              </div>

              <ChevronRight className="mt-1 h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}