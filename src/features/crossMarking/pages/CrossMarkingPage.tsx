import { useState } from "react";
import CrossMarkingStats from "../components/CrossMarkingStats";
import CrossMarkingSummary from "../components/CrossMarkingSummary";
import ModerationAlert from "../components/ModerationAlert";
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
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionRow | null>(null);

  const [blindMode, setBlindMode] = useState(false);

  const activeDetail = selectedSubmission
    ? submissionDetails.find((detail) => detail.id === selectedSubmission.id) ??
      null
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

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setBlindMode((v) => !v)}
              className="group flex items-center gap-3 whitespace-nowrap"
              aria-pressed={blindMode}
            >
              <span
                className={[
                  "relative inline-flex h-6 w-11 items-center rounded-full",
                  "shadow-sm",
                  "transition-colors duration-300 ease-in-out",
                  "group-active:scale-[0.98] transition-transform",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2",
                  blindMode ? "bg-emerald-600" : "bg-slate-300",
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
      )}

      {/* DETAIL VIEW */}
      {selectedSubmission && activeDetail ? (
        <SubmissionDetail
          detail={activeDetail}
          feedbackPlaceholder={feedbackPlaceholder}
          onBack={() => setSelectedSubmission(null)}
        />
      ) : (
        <>
          <CrossMarkingStats stats={crossMarkingStats} />
          <ModerationAlert alert={moderationAlert} />
          <SubmissionsTable rows={submissions} onSelect={setSelectedSubmission} />
          <CrossMarkingSummary
            performance={crossMarkingSummary.performance}
            progress={crossMarkingSummary.progress}
            agreement={crossMarkingSummary.agreement}
          />
        </>
      )}
    </div>
  );
}