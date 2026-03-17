import { useMemo } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/router/routes";
import Card from "../../../shared/components/ui/Card";
import SubmissionsTable from "../components/SubmissionsTable";
import {
  submissions,
  type SubmissionRow,
} from "../data/crossMarking.mock";

export default function ModerationRoomPage() {
  const navigate = useNavigate();

  const moderationRows = useMemo(
    () => submissions.filter((submission) => submission.status === "Moderation"),
    [],
  );

  const handleSelectSubmission = (row: SubmissionRow) => {
    navigate(ROUTES.crossMarkingSubmission(row.id));
  };

  return (
    <div className="space-y-6">
      <Card className="p-3 sm:p-4 transition-all duration-300 ease-in-out hover:shadow-lg">
        <button
          type="button"
          onClick={() => navigate(ROUTES.crossMarking)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cross Marking
        </button>
      </Card>

      <Card className="p-4 sm:p-5 transition-all duration-300 ease-in-out hover:shadow-lg">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E17100]">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Moderation Room
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review submissions with marker disagreement and finalize marks.
            </p>
          </div>
        </div>
      </Card>

      {moderationRows.length > 0 ? (
        <SubmissionsTable rows={moderationRows} onSelect={handleSelectSubmission} />
      ) : (
        <Card className="p-6 text-center text-sm text-slate-500">
          No submissions currently require moderation.
        </Card>
      )}
    </div>
  );
}
