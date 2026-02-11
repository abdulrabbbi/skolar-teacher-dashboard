import { useState } from 'react';
import Card from '../../../shared/components/ui/Card';

import CrossMarkingStats from '../components/CrossMarkingStats';
import CrossMarkingSummary from '../components/CrossMarkingSummary';
import ModerationAlert from '../components/ModerationAlert';
import SubmissionsTable from '../components/SubmissionsTable';
import SubmissionDetail from '../components/SubmissionDetail';

import {
  crossMarkingStats,
  crossMarkingSummary,
  feedbackPlaceholder,
  moderationAlert,
  submissionDetails,
  submissions,
  type SubmissionRow,
} from '../data/crossMarking.mock';

export default function CrossMarkingPage() {
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionRow | null>(null);

  const activeDetail = selectedSubmission
    ? submissionDetails.find(
        (detail) => detail.id === selectedSubmission.id
      ) ?? null
    : null;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Card className="p-4 sm:p-5">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Cross Marking
          </h1>
          <p className="text-sm text-slate-500">
            Review and moderate AI-assisted marking
          </p>
        </div>
      </Card>

      {/* DETAIL VIEW */}
      {selectedSubmission && activeDetail ? (
        <SubmissionDetail
          detail={activeDetail}
          feedbackPlaceholder={feedbackPlaceholder}
          onBack={() => setSelectedSubmission(null)}
        />
      ) : (
        <>
          {/* TOP STATS */}
          <CrossMarkingStats stats={crossMarkingStats} />

          {/* ALERT */}
          <ModerationAlert alert={moderationAlert} />

          {/* TABLE */}
          <SubmissionsTable
            rows={submissions}
            onSelect={setSelectedSubmission}
          />

          {/* SUMMARY CARDS */}
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

