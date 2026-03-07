import { AlertTriangle, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../../../../shared/components/ui/Card";
import Button from "../../../../../shared/components/ui/Button";
import { ROUTES } from "../../../../../app/router/routes";
import type { LiveQuizMisconception } from "../../../data/liveQuizSession.mock";

export type MisconceptionAlertsCardProps = {
  items: LiveQuizMisconception[];
};

export default function MisconceptionAlertsCard({
  items,
}: MisconceptionAlertsCardProps) {
  const navigate = useNavigate();

  const handleViewDetailedAnalysis = () => {
    if (items.length === 0) {
      return;
    }

    navigate(ROUTES.analytics, {
      state: {
        source: "live-quiz-session",
        focus: "misconceptions",
      },
    });
  };

  return (
    <Card
      className="
        misconception-card
        p-5 space-y-4
        transition-all duration-300 ease-in-out
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <h3 className="misconception-title text-lg font-semibold">
          Misconception Alerts
        </h3>
      </div>

      <div className="space-y-4">
        {items.map((alert) => (
          <div key={alert.id} className="misconception-alert px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-semibold text-[#92400E]">
                {alert.step}
              </p>

              <span className="misconception-pill inline-flex px-4 py-1 text-sm font-semibold">
                {alert.percent}%
              </span>
            </div>

            <p className="mt-3 text-sm text-[#B45309]">
              {alert.students} students struggling
            </p>
          </div>
        ))}
      </div>

      <Button
        onClick={handleViewDetailedAnalysis}
        disabled={items.length === 0}
        aria-disabled={items.length === 0}
        className="
          misconception-cta
          w-full rounded-xl text-white
          transition-all duration-200 hover:-translate-y-0.5
        "
      >
        <BarChart3 className="h-5 w-5" />
        View Detailed Analysis
      </Button>
    </Card>
  );
}
