import { useState } from "react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import InputField from "../../../shared/components/ui/InputField";
import MathAnswerCard from "../../../shared/components/ui/MathAnswerCard";
import type { QuestionMarkingItem } from "../data/crossMarking.mock";
import { SquareArrowOutUpRight, Plus, Pencil, Check } from "lucide-react";

import SkolarIcon from "../../../assets/images/Container (9).svg";

export type QuestionMarkingPanelProps = {
  preMarkScore: number;
  preMarkMax: number;
  confidence: number;
  items: QuestionMarkingItem[];
};

export default function QuestionMarkingPanel({
  preMarkScore,
  preMarkMax,
  confidence,
  items,
}: QuestionMarkingPanelProps) {
  const [confirmedByQuestionId, setConfirmedByQuestionId] = useState<
    Record<string, boolean>
  >({});

  const handleConfirm = (questionId: string) => {
    setConfirmedByQuestionId((previous) => ({
      ...previous,
      [questionId]: true,
    }));
  };

  const handleEdit = (questionId: string) => {
    setConfirmedByQuestionId((previous) => ({
      ...previous,
      [questionId]: false,
    }));
  };

  return (
    <div className="space-y-4">
      {/* ================= TOP PRE-MARK CARD ================= */}
      <div
        style={{
          border: "1px solid #E9D4FF",
          background: "rgba(91, 33, 182, 0.08)",
          borderRadius: "24px",
          padding: "20px",
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="shrink-0">
            <img
              src={SkolarIcon}
              alt="SKOLAR"
              className="h-10 w-10 sm:h-13 sm:w-13"
              draggable={false}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#5B21B6] sm:text-xl">
              SKOLAR Pre-Mark
            </h3>

            <div className="mt-2 flex flex-wrap items-end gap-1">
              <span className="text-4xl font-bold leading-none tracking-[-0.04em] text-[#5B21B6] sm:text-xl md:text-2xl">
                {preMarkScore}
              </span>
              <span className="pb-1 text-xl font-semibold text-[#7C3AED] sm:text-sm">
                / {preMarkMax}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-base font-medium text-[#7C3AED] sm:text-sm">
                Confidence:
              </span>

              <span
                style={{
                  background: "#EEDFFF",
                  color: "#7C3AED",
                  borderRadius: "9999px",
                  padding: "4px 12px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {confidence}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN QUESTION CARD ================= */}
      <Card className="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5 lg:p-6">
        <div>
          <h3 className="text-lg font-semibold tracking-[-0.01em] text-slate-900 sm:text-[20px]">
            Question-by-Question Marking
          </h3>
          <p className="mt-2 text-sm text-slate-500 sm:text-[15px]">
            Review SKOLAR&apos;s assessment for each question
          </p>
        </div>

        <div className="mt-6 space-y-5">
          {items.map((item, index) => {
            const isConfirmed = Boolean(confirmedByQuestionId[item.id]);

            return (
            <div
              key={item.id}
              className={`rounded-[22px] border p-4 transition-colors sm:p-5 ${
                isConfirmed
                  ? "border-slate-300 bg-slate-100"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-lg font-semibold text-slate-900">
                    Question {index + 1}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-[15px]">
                    {item.question}
                  </p>
                </div>

                {isConfirmed ? (
                  <span className="rounded-full border border-slate-300 bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                    Confirmed
                  </span>
                ) : null}
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-slate-900 sm:text-[15px]">
                  SKOLAR&apos;s Solution:
                </p>
              </div>

              <div className="mt-2">
                <MathAnswerCard
                  answer={item.skolarSolution.answer}
                  working={
                    item.skolarSolution.type === "worked"
                      ? item.skolarSolution.working
                      : undefined
                  }
                />
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500 sm:text-[15px]">
                  SKOLAR Score: {item.skolarScore} / {item.maxMarks}
                </p>
              </div>

              {/* CONTROLS */}
              <div className="mt-4 flex flex-col items-start gap-4">
                {/* Score */}
                <div>
                  <label
                    htmlFor={`score-${item.id}`}
                    className="mb-2 block text-sm font-medium text-slate-900"
                  >
                    Score
                  </label>

                  <div className="flex items-center gap-3">
                    <div className="w-[92px] sm:w-[96px]">
                      <InputField
                        label=""
                        id={`score-${item.id}`}
                        type="number"
                        defaultValue={item.editableScore}
                        disabled={isConfirmed}
                      />
                    </div>

                    <p className="text-[14px] font-medium text-slate-500">
                      / {item.maxMarks}
                    </p>
                  </div>
                </div>

                {/* Buttons below score */}
                <div className="flex flex-col items-start gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isConfirmed}
                      className="
                        group rounded-2xl border border-[#D0D5DD] bg-white
                        px-5 text-[13px] font-medium text-[#9810FA]
                        shadow-[0_1px_0_rgba(16,24,40,0.03)]
                        transition-all duration-200 hover:-translate-y-0.5
                        hover:bg-white hover:text-[#9810FA]
                        focus-visible:ring-[#7C3AED]
                      "
                    >
                      <SquareArrowOutUpRight className="mr-1 h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                      View SKOLAR Justification
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isConfirmed}
                      className="group transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Plus className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      Add Solution
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item.id)}
                      className="group transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Pencil className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      Edit
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleConfirm(item.id)}
                    disabled={isConfirmed}
                    className="
                      group rounded-2xl border border-[#D0D5DD] bg-white
                      text-slate-900 shadow-[0_1px_0_rgba(16,24,40,0.03)]
                      transition-all duration-200 hover:-translate-y-0.5
                      hover:bg-white hover:text-slate-900
                    "
                  >
                    <Check className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    {isConfirmed ? "Confirmed" : "Confirm"}
                  </Button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
