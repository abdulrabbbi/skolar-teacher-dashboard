import { X, Sparkles } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import SelectField from "../../../shared/components/ui/SelectField";
import ToggleRow from "../../../shared/components/ui/ToggleRow";
import type {
  DifficultyOption,
  LiveQuizSelectOption,
  QuizSummary,
  ToggleSetting,
} from "../data/liveQuiz.mock";

export type LaunchQuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  classOptions: LiveQuizSelectOption[];
  topicOptions: LiveQuizSelectOption[];
  questionOptions: LiveQuizSelectOption[];
  timerOptions: LiveQuizSelectOption[];
  difficultyOptions: DifficultyOption[];
  reasoningToggle: ToggleSetting;
  summary: QuizSummary;
};

export default function LaunchQuizModal({
  isOpen,
  onClose,
  classOptions,
  topicOptions,
  questionOptions,
  timerOptions,
  difficultyOptions,
  reasoningToggle,
  summary,
}: LaunchQuizModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* MODAL */}
      <Card className="relative z-10 w-full max-w-xl max-h-[90vh] p-6 flex flex-col transition-all duration-200">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Launch New Quiz
            </h2>
            <p className="text-sm text-slate-500">
              Configure your live quiz settings before launching
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-slate-100"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-5">
          {/* FORM */}
          <div className="grid grid-cols-1 gap-4">
            <SelectField label="Select Class" defaultValue="">
              {classOptions.map((o) => (
                <option key={o.id} value={o.value} disabled={!o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>

            <SelectField label="Select Topic / AOS" defaultValue="">
              {topicOptions.map((o) => (
                <option key={o.id} value={o.value} disabled={!o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                label="Number of Questions"
                defaultValue={questionOptions[0]?.value}
              >
                {questionOptions.map((o) => (
                  <option key={o.id} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label="Timer per Question (seconds)"
                defaultValue={timerOptions[0]?.value}
              >
                {timerOptions.map((o) => (
                  <option key={o.id} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>

          {/* DIFFICULTY */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Difficulty
            </p>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map((option) => (
                <Button
                  key={option.id}
                  size="sm"
                  variant={option.selected ? "success" : "outline"}
                  className="transition-all duration-200 hover:-translate-y-0.5"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* TOGGLE */}
          <ToggleRow
            title={reasoningToggle.title}
            description={reasoningToggle.description}
            enabled={reasoningToggle.enabled}
          />

          {/* SUMMARY */}
          <Card className="quiz-summary-card">
            <div className="quiz-summary-icon">
              <Sparkles className="h-4 w-4" />
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="quiz-summary-title">Quiz Summary</h3>

              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <p className="quiz-summary-label">Questions</p>
                  <p className="quiz-summary-value">{summary.questions}</p>
                </div>
                <div>
                  <p className="quiz-summary-label">Difficulty</p>
                  <p className="quiz-summary-value">{summary.difficulty}</p>
                </div>
                <div>
                  <p className="quiz-summary-label">Time per Q</p>
                  <p className="quiz-summary-value">
                    {summary.timePerQuestion}
                  </p>
                </div>
                <div>
                  <p className="quiz-summary-label">Total Time</p>
                  <p className="quiz-summary-value">{summary.totalTime}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="transition-all duration-200 hover:-translate-y-0.5"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="transition-all duration-200 hover:-translate-y-0.5"
          >
            Start Live Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
}
