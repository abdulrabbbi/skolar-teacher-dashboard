/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FileText, X } from "lucide-react";

import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";

type WorksheetTopic = {
  id: string;
  label: string;
  checked: boolean;
};

export type GenerateWorksheetPayload = {
  topics: string[];
  includeMultipleChoice: boolean;
  includeShortAnswer: boolean;
  includeWorkedExamples: boolean;
  includeAnswerSheet: boolean;
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
};

type GenerateWorksheetModalProps = {
  open: boolean;
  topics: WorksheetTopic[];
  onClose: () => void;
  onGenerate?: (payload: GenerateWorksheetPayload) => void;
};

export default function GenerateWorksheetModal({
  open,
  topics,
  onClose,
  onGenerate,
}: GenerateWorksheetModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<WorksheetTopic[]>([]);
  const [includeMultipleChoice, setIncludeMultipleChoice] = useState(true);
  const [includeShortAnswer, setIncludeShortAnswer] = useState(true);
  const [includeWorkedExamples, setIncludeWorkedExamples] = useState(false);
  const [includeAnswerSheet, setIncludeAnswerSheet] = useState(true);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );
  const [questionCount, setQuestionCount] = useState(10);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    setSelectedTopics(topics);
    setIncludeMultipleChoice(true);
    setIncludeShortAnswer(true);
    setIncludeWorkedExamples(false);
    setIncludeAnswerSheet(true);
    setDifficulty("medium");
    setQuestionCount(10);
  }, [open, topics]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const checkedTopics = useMemo(
    () => selectedTopics.filter((topic) => topic.checked),
    [selectedTopics],
  );

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.map((topic) =>
        topic.id === id ? { ...topic, checked: !topic.checked } : topic,
      ),
    );
  };

  const handleGenerate = () => {
    if (checkedTopics.length === 0) return;

    onGenerate?.({
      topics: checkedTopics.map((topic) => topic.label),
      includeMultipleChoice,
      includeShortAnswer,
      includeWorkedExamples,
      includeAnswerSheet,
      difficulty,
      questionCount,
    });

    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00B96B1A] text-[#00B96B]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Generate targeted worksheet
                  </h3>
                </div>

                <p className="text-sm text-slate-500">
                  Weak topics are pre-selected based on performance. You can
                  still add or remove topics before generating.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Topics to include
                    </h4>
                    <Badge variant="neutral">
                      {checkedTopics.length} selected
                    </Badge>
                  </div>

                  <div className="max-h-64 space-y-2 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                    {selectedTopics.map((topic) => (
                      <label
                        key={topic.id}
                        className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-transparent bg-white px-3 py-3 transition hover:border-[#00B96B] hover:bg-[#00B96B14]"
                      >
                        <p className="truncate text-sm font-medium text-slate-800">
                          {topic.label}
                        </p>

                        <input
                          type="checkbox"
                          checked={topic.checked}
                          onChange={() => toggleTopic(topic.id)}
                          className="h-5 w-5 rounded border-slate-300 accent-[#00B96B] focus:ring-2 focus:ring-[#00B96B]"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Worksheet content
                  </h4>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-sm text-slate-700">
                        Multiple choice
                      </span>
                      <input
                        type="checkbox"
                        checked={includeMultipleChoice}
                        onChange={(e) =>
                          setIncludeMultipleChoice(e.target.checked)
                        }
                        className="h-5 w-5 rounded border-slate-300 accent-[#00B96B] focus:ring-2 focus:ring-[#00B96B]"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-sm text-slate-700">
                        Short answer
                      </span>
                      <input
                        type="checkbox"
                        checked={includeShortAnswer}
                        onChange={(e) => setIncludeShortAnswer(e.target.checked)}
                        className="h-5 w-5 rounded border-slate-300 accent-[#00B96B] focus:ring-2 focus:ring-[#00B96B]"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-sm text-slate-700">
                        Worked examples
                      </span>
                      <input
                        type="checkbox"
                        checked={includeWorkedExamples}
                        onChange={(e) =>
                          setIncludeWorkedExamples(e.target.checked)
                        }
                        className="h-5 w-5 rounded border-slate-300 accent-[#00B96B] focus:ring-2 focus:ring-[#00B96B]"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-sm text-slate-700">
                        Answer sheet
                      </span>
                      <input
                        type="checkbox"
                        checked={includeAnswerSheet}
                        onChange={(e) => setIncludeAnswerSheet(e.target.checked)}
                        className="h-5 w-5 rounded border-slate-300 accent-[#00B96B] focus:ring-2 focus:ring-[#00B96B]"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Worksheet settings
                  </h4>

                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Difficulty
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {(["easy", "medium", "hard"] as const).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setDifficulty(item)}
                          className={[
                            "flex h-11 min-w-0 items-center justify-center rounded-xl border px-4 text-sm font-medium capitalize whitespace-nowrap transition",
                            difficulty === item
                              ? "border-[#00B96B] bg-[#00B96B1A] text-[#00B96B]"
                              : "border-slate-200 bg-white text-slate-700 hover:border-[#00B96B] hover:bg-[#00B96B14]",
                          ].join(" ")}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="questionCount"
                      className="text-xs font-medium uppercase tracking-wide text-slate-500"
                    >
                      Number of questions
                    </label>
                    <input
                      id="questionCount"
                      type="number"
                      min={5}
                      max={50}
                      value={questionCount}
                      onChange={(e) =>
                        setQuestionCount(Number(e.target.value || 10))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#00B96B]"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#00B96B]" />
                    <p className="text-sm font-semibold text-slate-900">
                      Summary
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-800">Topics:</span>{" "}
                      {checkedTopics.length}
                    </p>
                    <p>
                      <span className="font-medium text-slate-800">
                        Difficulty:
                      </span>{" "}
                      {difficulty}
                    </p>
                    <p>
                      <span className="font-medium text-slate-800">
                        Questions:
                      </span>{" "}
                      {questionCount}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    variant="success"
                    size="sm"
                    className="flex-1"
                    onClick={handleGenerate}
                    disabled={checkedTopics.length === 0}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}