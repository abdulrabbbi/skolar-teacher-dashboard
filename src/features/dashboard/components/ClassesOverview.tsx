import { AlertTriangle, CheckCircle2, ArrowRight, Users } from "lucide-react";
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
      <h2 className="text-base font-semibold text-emerald-950">
        Classes Overview
      </h2>

      <div className="space-y-4">
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
              rounded-2xl border border-emerald-200/70 bg-white/40
              p-5 backdrop-blur-md
              shadow-[0_10px_26px_rgba(16,185,129,0.12)]
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-emerald-300/90 hover:bg-white/55
              hover:shadow-[0_14px_30px_rgba(16,185,129,0.18)]
              outline-none focus-visible:ring-2 focus-visible:ring-[#00B96B]/50
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-semibold text-slate-900">
                  {item.name}
                </p>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-emerald-900/70">
                    <Users className="h-4 w-4 shrink-0 text-emerald-700/60" />
                    <span>{item.total} students</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#00B96B]">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{item.onTrack} on track</span>
                  </div>

                  <div className="flex items-center gap-2 text-orange-500">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{item.atRisk} at risk</span>
                  </div>
                </div>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center self-center">
                <ArrowRight className="h-5 w-5 text-emerald-700 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
