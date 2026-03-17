import { AlertTriangle, CheckCircle2, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../app/router/routes";
import type { ClassOverviewItem } from "../data/dashboard.mock";

export type ClassesOverviewProps = {
  classes: ClassOverviewItem[];
};

export default function ClassesOverview({ classes }: ClassesOverviewProps) {
  const navigate = useNavigate();

  const handleNavigate = (slug: string) => {
    navigate(ROUTES.classDetails(slug));
  };

  return (
    <section>
      <h2 className="text-[20px] font-semibold leading-none text-[#1E2547] sm:text-[17px]">
        Classes Overview
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate(item.slug)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNavigate(item.slug);
              }
            }}
            className="
              group relative cursor-pointer rounded-[22px]
              border border-emerald-200/70 bg-white/40
              bg-gradient-to-br from-white/75 via-white/40 to-emerald-100/20
              px-5 py-5 backdrop-blur-md backdrop-saturate-150
              shadow-[0_10px_24px_rgba(16,185,129,0.10)]
              transition-all duration-200
              hover:-translate-y-1 hover:border-emerald-300/90 hover:bg-white/55
              hover:shadow-[0_14px_30px_rgba(16,185,129,0.18)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B96B]/40
              sm:px-6 sm:py-6
            "
          >
            <div className="pr-10">
              <h3 className="truncate text-[20px] font-semibold leading-tight text-[#111111] sm:text-[19px]">
                {item.name}
              </h3>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-[15px] xl:flex-nowrap xl:gap-x-6">
                <div className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[#202020]">
                  <Users className="h-[18px] w-[18px] shrink-0 text-[#7A8094]" />
                  <span>{item.total} students</span>
                </div>

                <div className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-medium text-[#00B96B]">
                  <CheckCircle2 className="h-[18px] w-[18px] shrink-0" />
                  <span>{item.onTrack} on track</span>
                </div>

                <div className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-medium text-[#F28C1B]">
                  <AlertTriangle className="h-[18px] w-[18px] shrink-0" />
                  <span>{item.atRisk} at risk</span>
                </div>
              </div>
            </div>

            <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center sm:right-6 sm:top-6">
              <ArrowRight className="h-6 w-6 text-[#7A8094] transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
