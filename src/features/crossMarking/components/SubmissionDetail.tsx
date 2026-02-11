import { useState } from 'react';
import Card from '../../../shared/components/ui/Card';
import type { SubmissionDetailData } from '../data/crossMarking.mock';
import CriteriaMarkingPanel from './CriteriaMarkingPanel';
import FeedbackPanel from './FeedbackPanel';
import QuestionMarkingPanel from './QuestionMarkingPanel';
import StudentResponsePanel from './StudentResponsePanel';

export type SubmissionDetailProps = {
  detail: SubmissionDetailData;
  feedbackPlaceholder: string;
  onBack: () => void;
};

export default function SubmissionDetail({
  detail,
  feedbackPlaceholder,
  onBack,
}: SubmissionDetailProps) {
  const [blindMode, setBlindMode] = useState(false);

  return (
    <div className="space-y-6">
      {/* TOP BAR */}
      <Card className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            {'<- Back'}
          </button>

          <div className="flex items-center gap-2">
            <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">
              + Add Student
            </button>
            <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">
              Export
            </button>
          </div>
        </div>
      </Card>

      {/* SUBMISSION HEADER */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              {detail.id.replace('submission-', 'Submission #')}
            </h2>
            <p className="text-sm text-slate-500">{detail.assessment}</p>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <span>Blind Mode</span>
            <button
              type="button"
              onClick={() => setBlindMode(!blindMode)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
                blindMode ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition ${
                  blindMode ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </Card>

      {/* CONTENT */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <StudentResponsePanel responses={detail.studentResponses} />

        <div className="space-y-6">
          <QuestionMarkingPanel
            preMarkScore={detail.preMarkScore}
            preMarkMax={detail.preMarkMax}
            confidence={detail.confidence}
            items={detail.questionMarking}
          />

          <CriteriaMarkingPanel
            criteria={detail.criteriaMarks}
            totalScore={detail.totalScore}
            totalMax={detail.totalMax}
            confidence={detail.confidence}
          />

          <FeedbackPanel placeholder={feedbackPlaceholder} />
        </div>
      </div>
    </div>
  );
}
