import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { ROUTES } from "../../../app/router/routes";
import Button from "../../../shared/components/ui/Button";
import CrossMarkingStats from "../components/CrossMarkingStats";
import CrossMarkingSummary from "../components/CrossMarkingSummary";
import ModerationAlert from "../components/ModerationAlert";
import AddToCrossMarkModal, {
  type AddToCrossMarkPayload,
} from "../components/AddToCrossMarkModal";
import SubmissionsTable from "../components/SubmissionsTable";
import SubmissionDetail from "../components/SubmissionDetail";

import {
  crossMarkingStats,
  crossMarkingSummary,
  feedbackPlaceholder,
  moderationAlert,
  submissionDetails,
  submissions,
  type SubmissionRow,
} from "../data/crossMarking.mock";

export default function CrossMarkingPage() {
  const navigate = useNavigate();
  const [isAddToCrossMarkOpen, setIsAddToCrossMarkOpen] = useState(false);

  const [rows, setRows] = useState<SubmissionRow[]>(submissions);
  const [details, setDetails] = useState(submissionDetails);
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionRow | null>(null);

  const [blindMode, setBlindMode] = useState(false);
  const [blindIds, setBlindIds] = useState<string[] | null>(null);

  const handleToggleBlindMode = () => {
    setBlindMode((previous) => {
      const next = !previous;

      if (next) {
        const ids = rows.map((row) => row.id);
        const shuffled = [...ids];
        for (let i = shuffled.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
        }
        setBlindIds(shuffled);
      } else {
        setBlindIds(null);
      }

      return next;
    });
  };

  const blindOrderById: Record<string, number> | undefined =
    blindMode && blindIds
      ? blindIds.reduce<Record<string, number>>((map, id, index) => {
          map[id] = index;
          return map;
        }, {})
      : undefined;


  const handleAddToCrossMark = (payload: AddToCrossMarkPayload) => {
    const submissionId = `submission-${Date.now()}`;
    const displayStudentName = payload.studentName.trim() || "Unnamed Student";
    const displayAssessment = payload.assessment.trim() || "Uploaded work";

    setRows((previous) => {
      const nextIndex = `#${previous.length + 1}`;
      const newRow: SubmissionRow = {
        id: submissionId,
        index: nextIndex,
        studentName: displayStudentName,
        assessment: displayAssessment,
        submitted: "just now",
        skolarMark: "Processing...",
        confidence: 0,
        status: "Pending",
        finalMark: "TBD",
        action: "Mark",
      };

      return [newRow, ...previous];
    });

    setDetails((previous) => [
      ...previous,
      {
        id: submissionId,
        studentName: displayStudentName,
        assessment: displayAssessment,
        preMarkScore: 0,
        preMarkMax: 40,
        confidence: 0,
        studentResponses: [],
        questionMarking: [],
        criteriaMarks: [],
        totalScore: 0,
        totalMax: 40,
      },
    ]);
  };

  const activeDetail = selectedSubmission
    ? details.find((detail) => detail.id === selectedSubmission.id) ?? null
    : null;

  return (
    <div className="space-y-6">
      {/* ✅ Show HEADER only on MAIN page (not on detail view) */}
      {!selectedSubmission && (
        <div
          className="
            rounded-2xl border border-slate-200 bg-white h-24
            px-4 py-4
            shadow-sm
             p-4 sm:p-5
          transition-all duration-300 ease-in-out
          hover:shadow-lg
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-slate-900 leading-tight sm:text-3xl">
                Cross Marking
              </h1>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                AI-assisted marking with collaborative moderation
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="success"
                size="sm"
                className="h-10 rounded-xl px-4"
                onClick={() => setIsAddToCrossMarkOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add to Cross-Mark
              </Button>

              {/* Toggle */}
              <button
                type="button"
                onClick={handleToggleBlindMode}
                className="group flex items-center gap-3 whitespace-nowrap"
                aria-pressed={blindMode}
              >
                <span
                  className={[
                    "relative inline-flex h-6 w-11 items-center rounded-full",
                    "shadow-sm",
                    "transition-colors duration-300 ease-in-out",
                    "group-active:scale-[0.98] transition-transform",
                    "focus:outline-none focus:ring-2 focus:ring-[#00B96B] focus:ring-offset-2",
                    blindMode ? "bg-[#00B96B]" : "bg-slate-300",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white",
                      "shadow",
                      "transition-transform duration-300 ease-in-out",
                      "will-change-transform",
                      blindMode ? "translate-x-5" : "translate-x-1",
                    ].join(" ")}
                  />
                </span>

                <span className="text-sm font-medium text-slate-700">
                  Blind Mode
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL VIEW */}
      {selectedSubmission && activeDetail ? (
        <SubmissionDetail
          detail={activeDetail}
          feedbackPlaceholder={feedbackPlaceholder}
          onBack={() => setSelectedSubmission(null)}
          blindMode={blindMode}
          onToggleBlindMode={handleToggleBlindMode}
        />
      ) : (
        <>
          <CrossMarkingStats stats={crossMarkingStats} />
          <ModerationAlert
            alert={moderationAlert}
            onOpen={() => navigate(ROUTES.crossMarkingModerationRoom)}
          />
          <SubmissionsTable
            rows={rows}
            onSelect={setSelectedSubmission}
            blindMode={blindMode}
            blindOrderById={blindOrderById}
          />
          <CrossMarkingSummary
            performance={crossMarkingSummary.performance}
            progress={crossMarkingSummary.progress}
            agreement={crossMarkingSummary.agreement}
          />
        </>
      )}

      {isAddToCrossMarkOpen ? (
        <AddToCrossMarkModal
          isOpen
          onClose={() => setIsAddToCrossMarkOpen(false)}
          onSubmit={handleAddToCrossMark}
        />
      ) : null}
    </div>
  );
}
