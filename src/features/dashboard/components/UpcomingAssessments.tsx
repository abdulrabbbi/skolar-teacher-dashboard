import { Calendar } from "lucide-react";
import Badge from "../../../shared/components/ui/Badge";
import Card from "../../../shared/components/ui/Card";
import ProgressBar from "../../../shared/components/ui/ProgressBar";
import Button from "../../../shared/components/ui/Button";
import type { UpcomingAssessmentItem } from "../data/dashboard.mock";

export type UpcomingAssessmentsProps = {
  assessments: UpcomingAssessmentItem[];
};

const getAverageVariant = (average: number) => {
  if (average >= 75) return "success" as const;
  if (average >= 60) return "warning" as const;
  return "danger" as const;
};

const getProgressVariant = (average: number) => {
  if (average >= 75) return "green" as const;
  if (average >= 60) return "orange" as const;
  return "red" as const;
};

export default function UpcomingAssessments({
  assessments,
}: UpcomingAssessmentsProps) {
  return (
    <section className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Upcoming Assessments
          </h2>
          <p className="text-sm text-slate-500">
            SACs and exams on your schedule
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="px-0 text-green-600 transition-all duration-200 hover:text-green-700 hover:translate-x-1 hover:-translate-y-0.5"
        >
          View all
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {assessments.map((assessment) => (
          <Card
            key={assessment.id}
            className="
              group
              space-y-4 p-5
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:shadow-xl
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {assessment.title}
                </p>
                <p className="text-xs text-slate-500">
                  Year 12 Methods
                </p>
              </div>

              <Badge variant={getAverageVariant(assessment.average)}>
                Avg {assessment.average}%
              </Badge>
            </div>

            <div className="space-y-1 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span>
                  <strong>Due:</strong> {assessment.date}
                </span>
              </div>
              <p>
                <strong>Submissions:</strong>{" "}
                {assessment.marked}/{assessment.total}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-600">
                Class Readiness:
              </p>
              <ProgressBar
                value={assessment.average}
                max={100}
                variant={getProgressVariant(assessment.average)}
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
