
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import InputField from "../../../shared/components/ui/InputField";
import MathAnswerCard from "../../../shared/components/ui/MathAnswerCard";
import type { QuestionMarkingItem } from "../data/crossMarking.mock";
import { Eye, Plus, Pencil, Check } from "lucide-react";

// ✅ SVG icon
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
  return (
    <Card className="space-y-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl group">
      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-purple-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white transition-transform duration-200 group-hover:scale-110">
            {/* ✅ Replaced Sparkles with SVG */}
            <img
              src={SkolarIcon}
              alt="SKOLAR"
              className="h-11 w-11"
              draggable={false}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">SKOLAR Pre-Mark</p>
            <p className="text-xs text-slate-600">Confidence: {confidence}%</p>
          </div>
        </div>

        <p className="text-lg font-semibold text-slate-900">
          {preMarkScore} / {preMarkMax}
        </p>
      </div>

      {/* ================= SUBTITLE ================= */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          Question-by-Question Marking
        </h3>
        <p className="text-xs text-slate-500">
          Review SKOLAR's assessment for each question
        </p>
      </div>

      {/* ================= QUESTIONS ================= */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="space-y-4 rounded-xl border border-slate-200 p-4"
          >
            {/* Question Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Question {index + 1}
                </p>
                <p className="text-xs text-slate-500">{item.question}</p>
              </div>

              <p className="text-xs text-slate-500">
                SKOLAR Score: {item.skolarScore} / {item.maxMarks}
              </p>
            </div>

            {/* SKOLAR Solution */}
            <MathAnswerCard
              answer={item.skolarSolution.answer}
              working={
                item.skolarSolution.type === "worked"
                  ? item.skolarSolution.working
                  : undefined
              }
            />

            {/* Score + Actions */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="w-full sm:w-48">
                <InputField
                  label="Score"
                  id={`score-${item.id}`}
                  type="number"
                  defaultValue={item.editableScore}
                />
                <p className="mt-1 text-xs text-slate-500">/ {item.maxMarks}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <Eye className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  View SKOLAR Justification
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <Plus className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  Add Solution
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <Pencil className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="success"
                  className="transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <Check className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
