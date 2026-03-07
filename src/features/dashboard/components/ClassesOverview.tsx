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
      <h2 className="text-base font-semibold text-slate-900">
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
              rounded-2xl border border-slate-200 bg-white
              p-5
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md
              outline-none focus-visible:ring-2 focus-visible:ring-[#00B96B]/50
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-semibold text-slate-900">
                  {item.name}
                </p>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Users className="h-4 w-4 shrink-0 text-slate-400" />
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
                <ArrowRight className="h-5 w-5 text-[#7C7C90] transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
