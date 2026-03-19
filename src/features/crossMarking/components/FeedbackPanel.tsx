/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";

export type FeedbackPanelProps = {
  placeholder: string;
  studentName?: string;
  submissionId?: string;
};

export default function FeedbackPanel({
  placeholder,
  studentName,
  submissionId,
}: FeedbackPanelProps) {
  const displayStudentName = studentName?.trim() || "";

  const storageKey = useMemo(
    () => `crossMarking:feedbackDraft:${submissionId ?? "unknown"}`,
    [submissionId],
  );

  const [feedback, setFeedback] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const savedDraft = localStorage.getItem(storageKey);
    if (savedDraft) {
      setFeedback(savedDraft);
    } else {
      setFeedback("");
    }
    setStatusMessage("");
  }, [storageKey]);

  const handleSaveDraft = () => {
    localStorage.setItem(storageKey, feedback);
    setStatusMessage("Draft saved");
  };

  const handleSubmitMark = () => {
    localStorage.setItem(
      `crossMarking:feedbackSubmitted:${submissionId ?? "unknown"}`,
      feedback,
    );
    localStorage.removeItem(storageKey);
    setStatusMessage("Mark submitted");
  };

  return (
    <div className="space-y-4">
      <Card className="rounded-[22px] border border-slate-200 bg-[#F8F8FA] p-5 sm:p-6">
        <div className="">
          <div className="flex items-center gap-3">
            <h3 className="text-[18px] tracking-[-0.01em] text-slate-900 sm:text-[18px]">
              Feedback to Student
            </h3>
          </div>
          {displayStudentName ? (
            <p className="mt-1 text-sm font-medium text-slate-700">
              Student: {displayStudentName}
            </p>
          ) : null}

          <p className="text-[16px] leading-8 text-[#6B6F80]">
            Provide personalised comments and guidance
          </p>
          <br></br>

          <div className="rounded-2xl bg-[#ECECF1] px-5 py-4">
            <textarea
              aria-label="Feedback to student"
              placeholder={placeholder || "Add personalised feedback..."}
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              className="min-h-[52px] w-full resize-none bg-transparent text-[15px] leading-7 text-[#6B6F80] placeholder:text-[#6B6F80] focus:outline-none"
            />
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap justify-end gap-4">
        <div className="relative">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={!feedback.trim()}
            className="h-12 min-w-[104px] rounded-xl border border-[#D0D5DD] bg-white px-7 text-[15px] font-medium text-slate-900 shadow-[0_1px_0_rgba(16,24,40,0.03)] hover:bg-white"
          >
            Save Draft
          </Button>
        </div>

        <div className="relative">
          <Button
            variant="success"
            onClick={handleSubmitMark}
            disabled={!feedback.trim()}
            className="h-12 min-w-[108px] rounded-xl bg-[#00B96B] px-7 text-[15px] font-medium text-white hover:bg-[#00B96B]"
          >
            Submit Mark
          </Button>
        </div>
      </div>

      {statusMessage ? (
        <p className="text-right text-sm text-slate-600">{statusMessage}</p>
      ) : null}
    </div>
  );
}
