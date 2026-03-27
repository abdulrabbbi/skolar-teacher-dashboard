import { useMemo, useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  HelpCircle,
  TrendingUp,
  Eye,
  Copy,
  Play,
  ChevronDown,
} from "lucide-react";
import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import type { PastQuiz, QuizDifficulty } from "../data/liveQuiz.mock";
import { History } from "lucide-react";

export type PastQuizzesProps = {
  quizzes: PastQuiz[];
  onRelaunch?: (quizId: string) => void;
};

type PastQuizDifficultyFilter = "All Quizzes" | QuizDifficulty;

const difficultyVariant: Record<
  QuizDifficulty,
  "success" | "warning" | "danger" | "neutral"
> = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger",
  Mixed: "neutral",
};

const difficultyFilters: PastQuizDifficultyFilter[] = [
  "All Quizzes",
  "Easy",
  "Medium",
  "Hard",
  "Mixed",
];

export default function PastQuizzes({ quizzes, onRelaunch }: PastQuizzesProps) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<PastQuizDifficultyFilter>("All Quizzes");

  const filteredQuizzes = useMemo(() => {
    if (selectedDifficulty === "All Quizzes") {
      return quizzes;
    }

    return quizzes.filter((quiz) => quiz.difficulty === selectedDifficulty);
  }, [quizzes, selectedDifficulty]);

  return (
    <section>
      <Card className="p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex items-center justify-center">
              <History className="h-6 w-6 text-[#00B96B]" strokeWidth={3} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Past Quizzes
              </h3>
              <p className="text-xs text-slate-500">
                Access your complete quiz history
              </p>
            </div>
          </div>

          <div className="relative shrink-0">
            <select
              aria-label="Filter past quizzes by difficulty"
              value={selectedDifficulty}
              onChange={(event) =>
                setSelectedDifficulty(
                  event.target.value as PastQuizDifficultyFilter,
                )
              }
              className="
                appearance-none rounded-xl border border-slate-200 bg-slate-100
                py-2 pl-4 pr-10 text-sm font-medium text-slate-700
                transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200
                whitespace-nowrap
              "
            >
              {difficultyFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* ✅ Separate panels like Figma */}
        <div className="space-y-4">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="
                rounded-2xl border border-slate-200 bg-white
                px-4 py-4
                transition-all duration-200
                hover:bg-slate-50
              "
            >
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {quiz.title}
                    </p>
                    <Badge variant={difficultyVariant[quiz.difficulty]}>
                      {quiz.difficulty}
                    </Badge>
                    <Badge variant="neutral">{quiz.className}</Badge>
                  </div>

                  {/* ✅ sub heading */}
                  <p className="text-xs text-slate-500">{quiz.subject}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {quiz.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="h-3.5 w-3.5" />
                      {quiz.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {quiz.minutes} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {quiz.participants} participants
                    </span>
                    <span className="flex items-center gap-1 text-[#00B96B] font-medium">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {quiz.avgScore}% avg score
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Copy className="h-4 w-4" />
                    Duplicate
                  </Button>

                  <Button
                    variant="success"
                    size="sm"
                    className="flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5"
                    onClick={() => onRelaunch?.(quiz.id)}
                    disabled={!onRelaunch}
                  >
                    <Play className="h-4 w-4" />
                    Relaunch
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredQuizzes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              No past quizzes match the {selectedDifficulty.toLowerCase()} filter yet.
            </div>
          ) : null}
        </div>

        <div className="pt-4 text-center">
          <button className="rounded-md border border-slate-200 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5">
            Load More Quizzes
          </button>
        </div>
      </Card>
    </section>
  );
}
