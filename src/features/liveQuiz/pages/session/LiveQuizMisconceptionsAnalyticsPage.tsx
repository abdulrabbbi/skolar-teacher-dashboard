import { ArrowLeft, CircleAlert } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "../../../../app/router/routes";
import Button from "../../../../shared/components/ui/Button";
import Card from "../../../../shared/components/ui/Card";
import {
  liveQuizSessions,
  type LiveQuizQuizQuestion,
  type LiveQuizStudentAnswer,
} from "../../data/liveQuizSession.mock";

type WrongStudent = {
  studentId: string;
  studentName: string;
  selectedOption: LiveQuizStudentAnswer["selectedOption"];
  correctOption: LiveQuizStudentAnswer["correctOption"];
};

type WrongQuestionRow = {
  id: string;
  questionLabel: string;
  questionText: string;
  topic: string;
  correctRate: number;
  mostCommonWrongOption: LiveQuizStudentAnswer["selectedOption"];
  wrongStudents: WrongStudent[];
};

function getCorrectOptionId(question: LiveQuizQuizQuestion | null, fallback?: string) {
  return question?.options.find((option) => option.isCorrect)?.id ?? fallback ?? null;
}

export default function LiveQuizMisconceptionsAnalyticsPage() {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();

  const session = useMemo(
    () => liveQuizSessions.find((item) => item.id === quizId) ?? null,
    [quizId],
  );

  const questionByLabel = useMemo(() => {
    const quizQuestions = session?.analytics.quizQuestions ?? [];
    return new Map<string, LiveQuizQuizQuestion>(
      quizQuestions.map((question) => [question.label, question]),
    );
  }, [session]);

  const wrongQuestions = useMemo<WrongQuestionRow[]>(() => {
    if (!session) return [];

    const { commonWrongQuestions, studentResults } = session.analytics;

    const rows = commonWrongQuestions.map((insight) => {
      const question = questionByLabel.get(insight.questionLabel);
      const topic = question?.topic ?? "Area of Study not available";

      const wrongStudents: WrongStudent[] = studentResults.flatMap((student) => {
        const wrongAnswers = student.answers.filter(
          (answer) =>
            answer.questionLabel === insight.questionLabel && !answer.isCorrect,
        );

        return wrongAnswers.map((answer) => ({
          studentId: student.id,
          studentName: student.name,
          selectedOption: answer.selectedOption,
          correctOption: answer.correctOption,
        }));
      });

      wrongStudents.sort((a, b) => a.studentName.localeCompare(b.studentName));

      return {
        ...insight,
        topic,
        wrongStudents,
      };
    });

    rows.sort((a, b) => a.correctRate - b.correctRate);
    return rows;
  }, [questionByLabel, session]);

  if (!session) {
    return (
      <section className="space-y-4">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-700"
          onClick={() => navigate(ROUTES.liveQuiz)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Live Quiz
        </Button>

        <Card className="rounded-2xl border-slate-200 p-6 text-sm text-slate-500">
          Misconception analytics not found.
        </Card>
      </section>
    );
  }

  const studentCount = session.analytics.studentResults.length;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={() => navigate(ROUTES.liveQuizSession(session.id))}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Session
        </Button>
      </div>

      <Card className="rounded-2xl border-slate-200 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-slate-900">
              Misconception Alerts — Detailed Analytics
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Questions most students got wrong, the Area of Study they belong
              to, and which students struggled.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
            <CircleAlert className="h-4 w-4" />
            {session.misconceptions.length} alerts
          </div>
        </div>
      </Card>

      {wrongQuestions.length === 0 ? (
        <Card className="rounded-2xl border-slate-200 p-6 text-sm text-slate-600">
          No misconception question insights available yet for this session.
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {wrongQuestions.map((row) => {
            const wrongCount = row.wrongStudents.length;
            const wrongPct =
              studentCount > 0
                ? Math.round((wrongCount / studentCount) * 100)
                : 0;

            const question = questionByLabel.get(row.questionLabel) ?? null;
            const prompt = question?.prompt ?? row.questionText;

            const correctOptionId = getCorrectOptionId(
              question,
              row.wrongStudents[0]?.correctOption,
            );

            const wrongOptionText =
              question?.options.find((option) => option.id === row.mostCommonWrongOption)
                ?.text ?? null;
            const correctOptionText =
              correctOptionId
                ? question?.options.find((option) => option.id === correctOptionId)
                    ?.text ?? null
                : null;

            return (
              <Card
                key={row.id}
                className="rounded-2xl border-amber-200 bg-amber-50/40 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                      {row.questionLabel} • {row.topic}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {prompt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                      Correct: {row.correctRate}%
                    </span>
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                      Wrong: {wrongCount}/{studentCount} ({wrongPct}%)
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Most Common Wrong Option
                    </p>

                    <div className="mt-2 flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">
                        {row.mostCommonWrongOption}
                      </p>
                      <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                        Wrong
                      </span>
                    </div>

                    {wrongOptionText ? (
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        {wrongOptionText}
                      </p>
                    ) : null}

                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        The Correct Answer
                      </p>

                      <div className="mt-2 flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-emerald-900">
                          {correctOptionId ?? "—"}
                        </p>
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Correct
                        </span>
                      </div>

                      {correctOptionText ? (
                        <p className="mt-2 text-xs leading-5 text-emerald-800">
                          {correctOptionText}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Students Who Got It Wrong
                    </p>
                    {wrongCount === 0 ? (
                      <p className="mt-2 text-sm text-slate-600">
                        No incorrect responses recorded.
                      </p>
                    ) : (
                      <div className="mt-3 max-h-40 space-y-2 overflow-auto pr-1">
                        {row.wrongStudents.map((student) => (
                          <div
                            key={`${row.id}-${student.studentId}`}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                          >
                            <span className="font-semibold text-slate-800">
                              {student.studentName}
                            </span>
                            <span className="text-xs font-semibold text-slate-600">
                              Selected {student.selectedOption} • Correct{" "}
                              {student.correctOption}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

