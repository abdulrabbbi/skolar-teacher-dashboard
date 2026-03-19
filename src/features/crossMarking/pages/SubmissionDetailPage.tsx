import { useState } from "react";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import SubmissionDetail from "../components/SubmissionDetail";
import { feedbackPlaceholder, submissionDetails } from "../data/crossMarking.mock";

const BLIND_MODE_STORAGE_KEY = "crossMarking:blindMode";

function readBlindModeFromStorage() {
  try {
    return localStorage.getItem(BLIND_MODE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function parseBlindParam(value: string | null) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return null;
}

export default function SubmissionDetailPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const blindFromQuery = parseBlindParam(searchParams.get("blind"));
  const navState = location.state as
    | { blindMode?: boolean; blindStudentLabel?: string }
    | null;
  const blindFromNavState = navState?.blindMode ?? null;
  const blindStudentLabel = navState?.blindStudentLabel;

  const [blindMode, setBlindMode] = useState<boolean>(
    blindFromQuery ?? blindFromNavState ?? readBlindModeFromStorage(),
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
      onToggleBlindMode={() =>
        setBlindMode((prev) => {
          const next = !prev;
          try {
            localStorage.setItem(BLIND_MODE_STORAGE_KEY, next ? "1" : "0");
          } catch {
            // ignoresdsfas
          }
          return next;
        })
      }
      blindStudentLabel={blindStudentLabel}
    />
  );
}
