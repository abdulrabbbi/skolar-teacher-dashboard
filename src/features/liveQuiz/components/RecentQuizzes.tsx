import {
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
  Play,
} from 'lucide-react';
import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import type { RecentQuiz } from '../data/liveQuiz.mock';

export type RecentQuizzesProps = {
  quizzes: RecentQuiz[];
  onRelaunch: (quizId: string) => void;
};

const bgMap: Record<number, string> = {
  0: 'bg-blue-50 border-blue-200',
  1: 'bg-purple-50 border-purple-200',
  2: 'bg-emerald-50 border-emerald-200',
};

export default function RecentQuizzes({
  quizzes,
  onRelaunch,
}: RecentQuizzesProps) {
  return (
    <section>
      {/* ONE MAIN CARD */}
      <Card className="p-4">
        {/* SMALL HEADING */}
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Recent Quizzes
        </h3>

        {/* QUIZ LIST */}
        <div className="space-y-3">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className={`rounded-lg border p-4 space-y-3 ${bgMap[index % 3]}`}
            >
              {/* TITLE */}
              <p className="text-sm font-medium text-slate-900">
                {quiz.title}
              </p>

              {/* META */}
              <div className="flex flex-wrap gap-6 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {quiz.date}
                </div>

                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {quiz.participants} participants
                </div>

                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <TrendingUp className="h-4 w-4" />
                  {quiz.avg}% avg
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  View Results
                </Button>

                <Button
                  variant="success"
                  className="flex items-center gap-2"
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
