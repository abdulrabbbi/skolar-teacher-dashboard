import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import PageHeader from "../../../shared/components/ui/PageHeader";
import { upcomingAssessments } from "../data/dashboard.mock";

const clampPct = (n: number) => Math.max(0, Math.min(100, n));

export default function UpcomingAssessmentsPage() {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <Button
        variant="outline"
        size="sm"
        className="border-slate-200 text-slate-700 hover:bg-slate-50"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card className="rounded-2xl border-slate-200 p-5 sm:p-6">
        <PageHeader
          title="Upcoming Assessments"
          subtitle="Full schedule of SACs and exams"
        />
      </Card>

      <div className="space-y-4">
        {upcomingAssessments.map((assessment) => {
          const average = clampPct(Number(assessment.average ?? 0));

          return (
            <Card
              key={assessment.id}
              className="rounded-2xl border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {assessment.title}
                  </h3>
                  <p className="text-sm text-slate-500">{assessment.date}</p>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3 sm:gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Submissions
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {assessment.marked} / {assessment.total}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Readiness
                    </p>
                    <p className="text-sm font-semibold text-slate-900">{average}%</p>
                  </div>

                  <div className="sm:w-56">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Progress
                    </p>
                    <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-950"
                        style={{ width: `${average}%` }}
                      />
                    </div>
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
