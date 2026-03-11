import { useNavigate } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import { ROUTES } from "../../../app/router/routes";
import type { UpcomingAssessmentItem } from "../data/dashboard.mock";

export type UpcomingAssessmentsProps = {
  assessments?: UpcomingAssessmentItem[];
};

const clampPct = (n: number) => Math.max(0, Math.min(100, n));

export default function UpcomingAssessments({
  assessments,
}: UpcomingAssessmentsProps) {
  const navigate = useNavigate();
  const list = assessments ?? [];

  return (
    <section className="space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-emerald-950">
            Upcoming Assessments
          </h2>
          <p className="text-sm text-emerald-900/70">
            SACs and exams on your schedule
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="px-0 hover:bg-transparent"
          style={{ color: "#00B96B" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#00B96B";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#00B96B";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={() => navigate(ROUTES.upcomingAssessments)}
        >
          View all
        </Button>
      </div>

      {/* responsive: 1 col -> 2 col -> 3 col */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((assessment) => {
          const average = clampPct(Number(assessment.average ?? 0));
          const subtitle =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (assessment as any).className ??
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (assessment as any).subject ??
            "Year 12 Methods";

          return (
            <Card
              key={assessment.id}
              className="
                space-y-4 rounded-2xl border border-emerald-200/70
                bg-white/45 p-5 backdrop-blur-md
                shadow-[0_10px_24px_rgba(16,185,129,0.10)]
              "
            >
              {/* title */}
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {assessment.title}
                </p>
                <p className="text-sm text-slate-500">{subtitle}</p>
              </div>

              {/* rows: label left, value right (like figma) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">Due:</span>
                  <span className="text-sm text-slate-900">
                    {assessment.date}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">Submissions:</span>
                  <span className="text-sm text-slate-900">
                    {assessment.marked} / {assessment.total}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Class Readiness:
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {average}%
                  </span>
                </div>

                {/* progress bar: figma style (black fill) */}
                <div className="pt-1">
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-emerald-100/80">
                    <div
                      className="h-full rounded-full bg-[#00B96B]"
                      style={{ width: `${average}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
