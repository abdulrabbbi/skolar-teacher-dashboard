import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import SubmissionDetail from "../components/SubmissionDetail";
import { feedbackPlaceholder, submissionDetails } from "../data/crossMarking.mock";

export default function SubmissionDetailPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [blindMode, setBlindMode] = useState<boolean>(
    (location.state as { blindMode?: boolean } | null)?.blindMode ?? false,
  );

  const detail = submissionDetails.find((d) => d.id === submissionId) ?? null;

  if (!detail) {
    return (
      <Card className="p-6 text-center text-sm text-slate-500">
        Submission not found.
      </Card>
    );
  }

  return (
    <SubmissionDetail
      detail={detail}
      feedbackPlaceholder={feedbackPlaceholder}
      onBack={() => navigate(-1)}
      blindMode={blindMode}
      onToggleBlindMode={() => setBlindMode((prev) => !prev)}
    />
  );
}
