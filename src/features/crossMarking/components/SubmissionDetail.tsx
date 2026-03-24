import ResizableSplit from "../../../shared/components/ui/ResizableSplit";
import Card from "../../../shared/components/ui/Card";
import { openPrintToPdfWindow } from "../../../shared/lib/printToPdf";
import type { SubmissionDetailData } from "../data/crossMarking.mock";
import CriteriaMarkingPanel from "./CriteriaMarkingPanel";
import FeedbackPanel from "./FeedbackPanel";
import QuestionMarkingPanel from "./QuestionMarkingPanel";
import StudentResponsePanel from "./StudentResponsePanel";

export type SubmissionDetailProps = {
  detail: SubmissionDetailData;
  feedbackPlaceholder: string;
  onBack: () => void;
  blindMode: boolean;
  onToggleBlindMode: () => void;
  blindStudentLabel?: string;
};

export default function SubmissionDetail({
  detail,
  feedbackPlaceholder,
  onBack,
  blindMode,
  onToggleBlindMode,
  blindStudentLabel,
}: SubmissionDetailProps) {
  const isProcessing =
    detail.questionMarking.length === 0 && detail.criteriaMarks.length === 0;

  const displayAssessment = detail.assessment.replace(/\bSAC\b/g, "QUIZ");
  const displayStudentName = blindMode
    ? blindStudentLabel?.trim() || null
    : detail.studentName?.trim() || null;

  const handleExportPdf = () => {
    const escapeHtml = (value: string) =>
      String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const questionsHtml =
      detail.questionMarking.length > 0
        ? `
          <h2>Question Marking</h2>
          <ol>
            ${detail.questionMarking
              .map(
                (q, index) =>
                  `<li><strong>Q${index + 1}:</strong> ${escapeHtml(
                    q.question,
                  )}<div class="opt">SKOLAR: ${q.skolarScore} / ${
                    q.maxMarks
                  } • Final: ${q.editableScore} / ${q.maxMarks}</div></li>`,
              )
              .join("")}
          </ol>
        `
        : "";

    const criteriaHtml =
      detail.criteriaMarks.length > 0
        ? `
          <div class="hr"></div>
          <h2>Criteria Marks</h2>
          <ul>
            ${detail.criteriaMarks
              .map(
                (c) =>
                  `<li><strong>${escapeHtml(c.label)}:</strong> ${c.score} / ${
                    c.maxScore
                  }</li>`,
              )
              .join("")}
          </ul>
        `
        : "";

    openPrintToPdfWindow({
      title: `${detail.id.replace("submission-", "Submission #")} — Marking Export`,
      subtitle: "Printable view — use your browser “Save as PDF” to download.",
      bodyHtml: `
        <div class="meta">
          <p><span class="pill">${escapeHtml(displayAssessment)}</span>${
            displayStudentName
              ? `<span class="pill">${escapeHtml(displayStudentName)}</span>`
              : ""
          }</p>
          <p><strong>Pre-mark:</strong> ${detail.preMarkScore} / ${detail.preMarkMax} &nbsp; <strong>Total:</strong> ${detail.totalScore} / ${detail.totalMax}</p>
          <p><strong>Confidence:</strong> ${detail.confidence}%</p>
        </div>
        <div class="hr"></div>
        ${questionsHtml}
        ${criteriaHtml}
      `,
    });
  };

  const leftPanel = (
    <div className="relative">
      <StudentResponsePanel responses={detail.studentResponses} />
    </div>
  );

  const rightPanel = (
    <div className="space-y-6 lg:min-w-[360px]">
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

      <FeedbackPanel
        placeholder={feedbackPlaceholder}
        studentName={displayStudentName ?? undefined}
        submissionId={detail.id}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* TOP BAR */}
      <Card className="p-3 sm:p-4 transition-all duration-300 ease-in-out hover:-translate-y-0.3">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-900"
          >
            {"<- Back"}
          </button>

          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-gray-200 px-3 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-200">
              + Add Student
            </button>
            <button
              type="button"
              onClick={handleExportPdf}
              className="rounded-lg bg-gray-200 px-3 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-200"
            >
              Export
            </button>
          </div>
        </div>
      </Card>

      {/* SUBMISSION HEADER */}
      <Card className="p-4 sm:p-5 transition-all duration-300 ease-in-out hover:-translate-y- hover:shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              {detail.id.replace("submission-", "Submission #")}
            </h2>
            <p className="text-sm text-slate-500">{displayAssessment}</p>
            {displayStudentName ? (
              <p className="mt-1 text-sm font-medium text-slate-700">
                Student: {displayStudentName}
              </p>
            ) : null}
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <span>Blind Mode</span>
            <button
              type="button"
              onClick={onToggleBlindMode}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition transition-all duration-200 hover:-translate-y-0. ${
                blindMode ? "bg-[#00B96B]" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition ${
                  blindMode ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>
          </label>
        </div>
      </Card>

      {isProcessing ? (
        <Card className="border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-900">
            SKOLAR is processing this submission
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Your upload is queued for cross-marking. Marks and confidence will
            appear here once ready.
          </p>
        </Card>
      ) : null}

      {/* CONTENT */}
      <div className="relative">
        <ResizableSplit
          left={leftPanel}
          right={rightPanel}
          storageKey="crossMarking:submissionDetailSplitPct"
          defaultSplitPct={62}
          minLeftPct={45}
          maxLeftPct={78}
          minRightPx={360}
          handleWidthPx={12}
          className="lg:min-h-0"
        />
      </div>
    </div>
  );
}
