import {
  Calendar,
  Users,
  Clock,
  HelpCircle,
  TrendingUp,
  Eye,
  Copy,
  Play,
} from 'lucide-react';
import Badge from '../../../shared/components/ui/Badge';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import type { PastQuiz, QuizDifficulty } from '../data/liveQuiz.mock';

export type PastQuizzesProps = {
  quizzes: PastQuiz[];
};

const difficultyVariant: Record<
  QuizDifficulty,
  'success' | 'warning' | 'danger' | 'neutral'
> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
  Mixed: 'neutral',
};

export default function PastQuizzes({ quizzes }: PastQuizzesProps) {
  return (
    <section className="pt-20">
      {/* MAIN CARD */}
      <Card className="p-4">
        {/* SMALL HEADING */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Past Quizzes
            </h3>
            <p className="text-xs text-slate-500">
              Access your complete quiz history
            </p>
          </div>

          <select className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600">
            <option>All Quizzes</option>
          </select>
        </div>

        {/* LIST */}
        <div className="divide-y divide-slate-100">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex flex-col gap-3 py-4 xl:flex-row xl:items-center xl:justify-between"
            >
              {/* LEFT */}
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

                <p className="text-xs text-slate-500">
                  {quiz.subject}
                </p>

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
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {quiz.avgScore}% avg score
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Duplicate
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Play className="h-4 w-4" />
                  Relaunch
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="pt-4 text-center">
          <button className="rounded-md border border-slate-200 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50">
            Load More Quizzes
          </button>
        </div>
      </Card>
    </section>
  );
}
