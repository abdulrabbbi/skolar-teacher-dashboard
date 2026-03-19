import { useMemo, useState } from "react";
import {
  CheckSquare2,
  ClipboardList,
  FileText,
  ListChecks,
  Minus,
  MessageSquareText,
  Plus,
  Quote,
  SquareAsterisk,
  X,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import Button from "../../../shared/components/ui/Button";
import { cn } from "../../../shared/lib/cn";

type QuestionTypeId =
  | "multipleChoice"
  | "trueFalse"
  | "fillBlank"
  | "shortAnswer"
  | "freeResponse"
  | "multiLayerPassage";

type QuestionTypeConfig = {
  id: QuestionTypeId;
  title: string;
  description: string;
  icon: typeof ListChecks;
  accent: {
    border: string;
    surface: string;
    text: string;
  };
};

const MAX_TOTAL = 250;
const MAX_PER_TYPE = 200;

const questionTypes: QuestionTypeConfig[] = [
  {
    id: "multipleChoice",
    title: "Multiple Choice",
    description: "Select the correct answer from options",
    icon: ListChecks,
    accent: {
      border: "border-emerald-300",
      surface: "bg-emerald-50",
      text: "text-emerald-600",
    },
  },
  {
    id: "trueFalse",
    title: "True/False",
    description: "Determine if a statement is true or false",
    icon: CheckSquare2,
    accent: {
      border: "border-indigo-300",
      surface: "bg-indigo-50",
      text: "text-indigo-600",
    },
  },
  {
    id: "fillBlank",
    title: "Fill in the Blank",
    description: "Complete the sentence with the missing word",
    icon: SquareAsterisk,
    accent: {
      border: "border-sky-300",
      surface: "bg-sky-50",
      text: "text-sky-600",
    },
  },
  {
    id: "shortAnswer",
    title: "Short Answer",
    description: "Provide a brief written response",
    icon: FileText,
    accent: {
      border: "border-blue-300",
      surface: "bg-blue-50",
      text: "text-blue-600",
    },
  },
  {
    id: "freeResponse",
    title: "Free Response",
    description: "Write a detailed answer in your own words",
    icon: Quote,
    accent: {
      border: "border-pink-300",
      surface: "bg-pink-50",
      text: "text-pink-600",
    },
  },
  {
    id: "multiLayerPassage",
    title: "Multi-Layered Passage",
    description: "Passage-based questions with 3 progressive layers",
    icon: ClipboardList,
    accent: {
      border: "border-violet-300",
      surface: "bg-violet-50",
      text: "text-violet-600",
    },
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function QuestionTypesPage() {
  const navigate = useNavigate();
  const { subjectId, areaId } = useParams<{ subjectId: string; areaId: string }>();
  const [searchParams] = useSearchParams();

  const [counts, setCounts] = useState<Record<QuestionTypeId, number>>({
    multipleChoice: 20,
    trueFalse: 1,
    fillBlank: 1,
    shortAnswer: 1,
    freeResponse: 1,
    multiLayerPassage: 0,
  });

  const total = useMemo(
    () => Object.values(counts).reduce((sum, value) => sum + value, 0),
    [counts],
  );

  const canIncrementTotal = total < MAX_TOTAL;

  const setTypeCount = (type: QuestionTypeId, nextRaw: number) => {
    setCounts((previous) => {
      const nextValue = clamp(nextRaw, 0, MAX_PER_TYPE);
      const next = { ...previous, [type]: nextValue };

      const nextTotal = Object.values(next).reduce((s, v) => s + v, 0);
      if (nextTotal <= MAX_TOTAL) return next;
      return previous;
    });
  };

  const adjustType = (type: QuestionTypeId, delta: number) => {
    setCounts((previous) => {
      const current = previous[type] ?? 0;
      const nextValue = clamp(current + delta, 0, MAX_PER_TYPE);
      const next = { ...previous, [type]: nextValue };

      const nextTotal = Object.values(next).reduce((s, v) => s + v, 0);
      if (nextTotal <= MAX_TOTAL) return next;
      if (delta < 0) return next;
      return previous;
    });
  };

  const handleExit = () => {
    if (subjectId) {
      navigate(`/teacher/task-compiler/by-subject/${subjectId}`);
      return;
    }
    navigate("/teacher/task-compiler/by-subject");
  };

  const handleBack = () => {
    if (!subjectId || !areaId) {
      handleExit();
      return;
    }

    const qs = searchParams.toString();
    navigate(
      `/teacher/task-compiler/by-subject/${subjectId}/areas/${areaId}${qs ? `?${qs}` : ""}`,
    );
  };

  const handleNext = () => {
    // Next step placeholder (wire to generation later).
    handleBack();
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-0 overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <MessageSquareText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">Create Quiz</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-10 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={handleExit}
        >
          <X className="h-4 w-4" />
          Exit
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.05fr]">
        {/* LEFT */}
        <div className="px-6 py-6">
          <h2 className="text-xl font-semibold text-slate-900">
            How many questions of each type?
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select the types and quantities for your quiz
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <p className="font-semibold text-slate-700">
                Total:&nbsp; {total} / {MAX_TOTAL}
              </p>
              <p className="text-slate-500">Max {MAX_PER_TYPE} per type</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {questionTypes.map((t, index) => {
              const Icon = t.icon;
              const value = counts[t.id] ?? 0;
              const canAdd = canIncrementTotal && value < MAX_PER_TYPE;
              const canRemove = value > 0;

              return (
                <div
                  key={t.id}
                  className={cn(
                    "flex items-center justify-between gap-4 px-4 py-4",
                    index > 0 && "border-t border-slate-200",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl border-2",
                        t.accent.surface,
                        t.accent.border,
                        t.accent.text,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {t.title}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {t.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50",
                        !canRemove && "opacity-50 pointer-events-none",
                      )}
                      onClick={() => adjustType(t.id, -1)}
                      aria-label={`Decrease ${t.title}`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <input
                      value={String(value)}
                      onChange={(event) => {
                        const next = Number(event.target.value);
                        if (!Number.isFinite(next)) return;
                        setTypeCount(t.id, next);
                      }}
                      inputMode="numeric"
                      className="h-9 w-16 rounded-lg border border-slate-200 bg-white text-center text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      aria-label={`${t.title} count`}
                    />

                    <button
                      type="button"
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50",
                        !canAdd && "opacity-50 pointer-events-none",
                      )}
                      onClick={() => adjustType(t.id, 1)}
                      aria-label={`Increase ${t.title}`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-slate-200 px-4 py-4">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {([-10, -5, -1, 1, 5, 10] as const).map((delta) => (
                  <button
                    key={delta}
                    type="button"
                    className="inline-flex h-9 min-w-12 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    onClick={() => adjustType("multipleChoice", delta)}
                    aria-label={`Adjust multiple choice by ${delta}`}
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Exam-Specific Question Types
                </p>
                <p className="text-xs text-slate-500">
                  Choose specialized question formats for various standardized
                  exams
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Show
              </Button>
            </div>

            <label className="mt-4 inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
              />
              Save my preferences
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
            <Button
              variant="outline"
              size="sm"
              className="h-10 rounded-xl border-slate-200 px-6 text-slate-700 hover:bg-slate-50"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              size="sm"
              className={cn(
                "h-10 rounded-xl px-10 !bg-blue-600 hover:!bg-blue-700 focus-visible:ring-blue-600",
                total === 0 && "opacity-60 pointer-events-none",
              )}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-6 lg:border-t-0 lg:border-l">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {questionTypes
              .filter((t) =>
                [
                  "multipleChoice",
                  "trueFalse",
                  "fillBlank",
                  "shortAnswer",
                  "freeResponse",
                ].includes(t.id),
              )
              .map((t) => {
                const Icon = t.icon;
                const value = counts[t.id] ?? 0;

                return (
                  <div
                    key={t.id}
                    className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.10)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
                        <Icon className="h-5 w-5 text-slate-800" />
                      </div>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {value}
                      </span>
                    </div>

                    <p className="mt-4 text-base font-semibold text-slate-900">
                      {t.title}
                    </p>

                    <div className="mt-3 space-y-2">
                      <div className="h-2.5 w-2/3 rounded-full bg-slate-200" />
                      <div className="h-2.5 w-1/2 rounded-full bg-slate-200" />
                      <div className="h-2.5 w-3/4 rounded-full bg-slate-200" />
                    </div>

                    {t.id === "multipleChoice" ? (
                      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/40 p-3">
                        <div className="space-y-3">
                          {["A", "B", "C"].map((label) => (
                            <div
                              key={label}
                              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                            >
                              <span className="text-xs font-semibold text-slate-600">
                                {label}:
                              </span>
                              <div className="h-2.5 w-full rounded-full bg-slate-200" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : t.id === "trueFalse" ? (
                      <div className="mt-5 space-y-3">
                        {["True", "False"].map((label) => (
                          <div
                            key={label}
                            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                          >
                            <div className="h-4 w-4 rounded-full border border-slate-300" />
                            <span className="text-sm font-medium text-slate-700">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : t.id === "fillBlank" ? (
                      <div className="mt-5 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-2.5 w-1/3 rounded-full bg-slate-200" />
                          <div className="h-9 w-16 rounded-lg border border-slate-200 bg-white" />
                          <div className="h-2.5 w-1/2 rounded-full bg-slate-200" />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-2.5 w-1/4 rounded-full bg-slate-200" />
                          <div className="h-9 w-20 rounded-lg border border-slate-200 bg-white" />
                          <div className="h-2.5 w-1/3 rounded-full bg-slate-200" />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="h-2.5 w-3/4 rounded-full bg-slate-200" />
                        <div className="mt-2.5 h-2.5 w-2/3 rounded-full bg-slate-200" />
                        <div className="mt-2.5 h-2.5 w-5/6 rounded-full bg-slate-200" />
                        <div className="mt-2.5 h-2.5 w-1/2 rounded-full bg-slate-200" />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

