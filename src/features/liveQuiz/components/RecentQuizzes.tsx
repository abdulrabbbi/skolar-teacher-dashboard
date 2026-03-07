import { Calendar, Users, TrendingUp, BarChart3, Play } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import type { RecentQuiz } from "../data/liveQuiz.mock";

export type RecentQuizzesProps = {
  quizzes: RecentQuiz[];
  onViewResults: (quizId: string) => void;
  onRelaunch: (quizId: string) => void;
};

const bgMap: Record<number, string> = {
  0: "bg-blue-50/70 border-blue-200",
  1: "bg-purple-50/70 border-purple-200",
  2: "bg-[#00B96B1A] border-[#00B96B]",
};

export default function RecentQuizzes({
  quizzes,
  onViewResults,
  onRelaunch,
}: RecentQuizzesProps) {
  return (
    <section className="w-full h-full">
      {/* h-full + flex so it stretches same height as right card */}
      <Card className="h-full p-4 sm:p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900">Recent Quizzes</h3>

        {/*  flex-1 so list takes remaining height (and can scroll if needed) */}
        <div className="mt-4 space-y-4 flex-1 min-h-0 overflow-auto pr-1">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className={[
                "rounded-2xl border p-4 sm:p-5",
                "shadow-sm transition-all duration-200",
                bgMap[index % 3],
              ].join(" ")}
            >
              <p className="text-base font-semibold text-slate-900">{quiz.title}</p>

              <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-3 sm:items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span>{quiz.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span>{quiz.participants} participants</span>
                </div>

                <div className="flex items-center gap-2 font-medium text-[#00B96B]">
                  <TrendingUp className="h-4 w-4" />
                  <span>{quiz.avg}% avg</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2 bg-white hover:bg-slate-50"
                  onClick={() => onViewResults(quiz.id)}
                >
                  <BarChart3 className="h-4 w-4" />
                  View Results
                </Button>

                <Button
                  variant="success"
                  className="w-full justify-center gap-2"
                  onClick={() => onRelaunch(quiz.id)}
                >
                  <Play className="h-4 w-4" />
                  Relaunch Quiz
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
