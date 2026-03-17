/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Settings, X } from "lucide-react";
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
  onStart?: (joinCode: string) => void;
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
  onStart,
  classOptions,
  topicOptions,
  questionOptions,
  timerOptions,
  difficultyOptions,
  reasoningToggle,
  summary,
}: LaunchQuizModalProps) {
  const [mounted, setMounted] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinCodeMessage, setJoinCodeMessage] = useState("");

  const generateJoinCode = (length = 6) => {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let next = "";
    for (let i = 0; i < length; i += 1) {
      next += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return next;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setJoinCode(generateJoinCode());
    setJoinCodeMessage("");
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleCopyJoinCode = async () => {
    try {
      await navigator.clipboard.writeText(joinCode);
      setJoinCodeMessage("Join code copied");
      return true;
    } catch {
      setJoinCodeMessage("Copy failed");
      return false;
    }
  };

  const handleStart = async () => {
    const code = joinCode.trim();
    if (!code) return;

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("liveQuiz:lastJoinCode", code);
      }
    } catch {
      // ignore
    }

    const copied = await handleCopyJoinCode();
    onStart?.(code);
    if (copied) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <Card
        className="relative z-10 w-full max-w-xl max-h-[90vh] p-6 flex flex-col transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
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
            <Card className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Student Join Code
              </p>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  value={joinCode}
                  onChange={(e) => {
                    const next = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "")
                      .slice(0, 8);
                    setJoinCode(next);
                    setJoinCodeMessage("");
                  }}
                  placeholder="e.g. 7K2P9Q"
                  inputMode="text"
                  autoCapitalize="characters"
                  className="
                    h-11 w-full flex-1 rounded-xl border border-slate-200 bg-white
                    px-4 font-mono text-base font-semibold tracking-[0.25em] text-slate-900
                    outline-none focus:ring-2 focus:ring-slate-200
                  "
                  aria-label="Student join code"
                />

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-11 rounded-xl px-4"
                    onClick={() => {
                      setJoinCode(generateJoinCode());
                      setJoinCodeMessage("");
                    }}
                  >
                    Generate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-11 rounded-xl px-4"
                    onClick={handleCopyJoinCode}
                    disabled={!joinCode.trim()}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Share this code with students so they can join the quiz.
              </p>
              {joinCodeMessage ? (
                <p className="mt-2 text-xs font-medium text-slate-600">
                  {joinCodeMessage}
                </p>
              ) : null}
            </Card>

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
            <div className="quiz-summary-icon relative">
              <Settings className="h-4 w-4" aria-hidden="true" />
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
            onClick={handleStart}
            disabled={!joinCode.trim()}
          >
            Start Live Quiz
          </Button>
        </div>
      </Card>
    </div>,
    document.body,
  );
}
