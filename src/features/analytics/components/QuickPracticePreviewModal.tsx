/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  RefreshCw,
  Trash2,
  X,
  CheckCircle2,
  Plus,
} from "lucide-react";

import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import Card from "../../../shared/components/ui/Card";

export type PracticeQuestion = {
  id: string;
  text: string;
  marks: number;
  difficulty: "easy" | "medium" | "hard";
};

type QuickPracticePreviewModalProps = {
  open: boolean;
  topic: string | null;
  onClose: () => void;
  onGenerateFinal?: (payload: {
    topic: string;
    questions: PracticeQuestion[];
  }) => void;
};

function buildMockQuestions(topic: string, count = 5): PracticeQuestion[] {
  const stems = [
    `Explain the key concept behind ${topic}.`,
    `Solve a standard exam-style question on ${topic}.`,
    `Identify the most common mistake students make in ${topic}.`,
    `Apply ${topic} in a short-response problem.`,
    `Compare two methods used in ${topic}.`,
    `Write a worked solution for a ${topic} problem.`,
    `Interpret a result related to ${topic}.`,
    `Use ${topic} in a multi-step reasoning question.`,
  ];

  return Array.from({ length: count }).map((_, index) => ({
    id: `${topic}-${index + 1}-${Math.random().toString(36).slice(2, 8)}`,
    text: stems[index % stems.length],
    marks: (index % 3) + 1,
    difficulty:
      index % 3 === 0 ? "easy" : index % 3 === 1 ? "medium" : "hard",
  }));
}

const difficultyTone: Record<PracticeQuestion["difficulty"], string> = {
  easy: "bg-[#00B96B1A] text-[#00B96B]",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-rose-100 text-rose-700",
};

export default function QuickPracticePreviewModal({
  open,
  topic,
  onClose,
  onGenerateFinal,
}: QuickPracticePreviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !topic) return;
    setQuestions(buildMockQuestions(topic, 5));
  }, [open, topic]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const totalMarks = useMemo(
    () => questions.reduce((sum, question) => sum + question.marks, 0),
    [questions],
  );

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const generateMore = () => {
    if (!topic) return;
    setQuestions((prev) => [...prev, ...buildMockQuestions(topic, 2)]);
  };

  const handleGenerateFinal = () => {
    if (!topic || questions.length === 0) return;

    onGenerateFinal?.({
      topic,
      questions,
    });

    onClose();
  };

  if (!mounted || !topic) return null;

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
            className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 14 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00B96B1A] text-[#00B96B]">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Quick Practice Preview
                    </h3>
                    <p className="text-sm text-slate-500">{topic}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  Review the generated questions for this topic, remove any you
                  do not want, or generate more before creating the final
                  worksheet.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Generated questions
                  </h4>

                  <Badge variant="neutral">{questions.length} questions</Badge>
                </div>

                <div className="max-h-115 space-y-3 overflow-y-auto pr-1">
                  {questions.map((question, index) => (
                    <Card
                      key={question.id}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Question {index + 1}
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${difficultyTone[question.difficulty]}`}
                            >
                              {question.difficulty}
                            </span>

                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              {question.marks} mark{question.marks > 1 ? "s" : ""}
                            </span>
                          </div>

                          <p className="text-sm leading-6 text-slate-800">
                            {question.text}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeQuestion(question.id)}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                          aria-label="Remove question"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Card>
                  ))}

                  {questions.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
                      <p className="text-sm text-slate-500">
                        No questions left. Generate more to continue.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Worksheet summary
                  </h4>
                  <p className="text-sm text-slate-500">
                    Quick setup for this specific topic.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#00B96B]" />
                    <p className="text-sm font-semibold text-slate-900">
                      Current selection
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-800">Topic:</span>{" "}
                      {topic}
                    </p>
                    <p>
                      <span className="font-medium text-slate-800">
                        Questions:
                      </span>{" "}
                      {questions.length}
                    </p>
                    <p>
                      <span className="font-medium text-slate-800">Total marks:</span>{" "}
                      {totalMarks}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex w-full items-center justify-center gap-2"
                    onClick={generateMore}
                  >
                    <Plus className="h-4 w-4" />
                    Generate More Questions
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="flex w-full items-center justify-center gap-2"
                    onClick={() => {
                      if (!topic) return;
                      setQuestions(buildMockQuestions(topic, 5));
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate Preview
                  </Button>

                  <Button
                    type="button"
                    variant="success"
                    className="w-full"
                    onClick={handleGenerateFinal}
                    disabled={questions.length === 0}
                  >
                    Generate Final Worksheet
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
