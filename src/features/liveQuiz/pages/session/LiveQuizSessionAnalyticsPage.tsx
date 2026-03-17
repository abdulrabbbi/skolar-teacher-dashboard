import { ArrowLeft, BarChart3, CircleAlert, Sparkles, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../../shared/components/ui/Button';
import Card from '../../../../shared/components/ui/Card';
import {
  liveQuizSessions,
  type LiveQuizQuizQuestion,
  type LiveQuizStudentAnswer,
} from '../../data/liveQuizSession.mock';

const clampPct = (value: number) => Math.max(0, Math.min(100, value));

export default function LiveQuizSessionAnalyticsPage() {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();
  const [activeAnswer, setActiveAnswer] = useState<{
    studentName: string;
    answer: LiveQuizStudentAnswer;
  } | null>(null);

  const session = useMemo(
    () => liveQuizSessions.find((item) => item.id === quizId) ?? null,
    [quizId],
  );

  if (!session) {
    return (
      <section className="space-y-4">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-700"
          onClick={() => navigate('/teacher/live-quiz')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Live Quiz
        </Button>

        <Card className="rounded-2xl border-slate-200 p-6 text-sm text-slate-500">
          Session analytics not found.
        </Card>
      </section>
    );
  }

  const { classPerformance, studentResults, commonWrongQuestions, easiestQuestions } =
    session.analytics;

  const quizQuestions = session.analytics.quizQuestions ?? [];

  const questionByLabel = useMemo(() => {
    return new Map<string, LiveQuizQuizQuestion>(
      quizQuestions.map((question) => [question.label, question]),
    );
  }, [quizQuestions]);

  const activeQuestion = activeAnswer
    ? (questionByLabel.get(activeAnswer.answer.questionLabel) ?? null)
    : null;

  useEffect(() => {
    if (!activeAnswer) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveAnswer(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeAnswer]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={() => navigate(`/teacher/live-quiz/session/${session.id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Session
        </Button>

        <Button
          size="sm"
          className="bg-[#00B96B] text-white hover:bg-[#009f5c]"
          onClick={() => navigate('/teacher/analytics')}
        >
          <BarChart3 className="h-4 w-4" />
          Open Full Analytics
        </Button>
      </div>

      <Card className="rounded-2xl border-slate-200 p-5 sm:p-6">
        <h1 className="text-xl font-semibold text-slate-900">
          Live Quiz Results Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Session: {session.question.topic}. Review student answers, scores, and
          class-wide trends.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Average Score
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {classPerformance.averageScore}%
          </p>
        </Card>

        <Card className="rounded-2xl border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Highest Score
          </p>
          <p className="mt-2 text-2xl font-bold text-[#00B96B]">
            {classPerformance.highestScore}%
          </p>
        </Card>

        <Card className="rounded-2xl border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Lowest Score
          </p>
          <p className="mt-2 text-2xl font-bold text-rose-600">
            {classPerformance.lowestScore}%
          </p>
        </Card>

        <Card className="rounded-2xl border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Completion Rate
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {classPerformance.completionRate}%
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="rounded-2xl border-rose-200 bg-rose-50/50 p-5">
          <div className="flex items-center gap-2">
            <CircleAlert className="h-5 w-5 text-rose-600" />
            <h2 className="text-base font-semibold text-rose-900">
              Common Wrong Questions
            </h2>
          </div>

          <div className="mt-4 space-y-3">
            {commonWrongQuestions.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-rose-200 bg-white p-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
                  {item.questionLabel}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {item.questionText}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Correct rate: {item.correctRate}% | Most common wrong option:{' '}
                  {item.mostCommonWrongOption}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl border-emerald-200 bg-emerald-50/50 p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#00B96B]" />
            <h2 className="text-base font-semibold text-emerald-900">
              Easiest Questions
            </h2>
          </div>

          <div className="mt-4 space-y-3">
            {easiestQuestions.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-emerald-200 bg-white p-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {item.questionLabel}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {item.questionText}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Correct rate: {item.correctRate}% | Most common wrong option:{' '}
                  {item.mostCommonWrongOption}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="rounded-2xl border-slate-200 p-5">
        <h2 className="text-base font-semibold text-slate-900">
          Quiz Questions
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Review the questions that appeared in this quiz (with correct options).
        </p>

        <div className="mt-4 space-y-3">
          {quizQuestions.map((q) => {
            const correct = q.options.find((o) => o.isCorrect)?.id ?? null;

            return (
              <details
                key={q.id}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {q.label} • {q.topic}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {q.prompt}
                      </p>
                    </div>

                    {correct ? (
                      <span className="shrink-0 rounded-full border border-[#00B96B] bg-[#00B96B1A] px-3 py-1 text-xs font-semibold text-[#00B96B]">
                        Correct: {correct}
                      </span>
                    ) : null}
                  </div>
                </summary>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {q.options.map((o) => (
                    <div
                      key={o.id}
                      className={`rounded-xl border px-3 py-2 text-sm ${
                        o.isCorrect
                          ? 'border-[#00B96B] bg-[#00B96B1A] text-slate-900'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="font-semibold">{o.id}.</span> {o.text}
                    </div>
                  ))}
                </div>
              </details>
            );
          })}

          {quizQuestions.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No quiz questions available for this session yet.
            </div>
          ) : null}
        </div>
      </Card>

      <Card className="rounded-2xl border-slate-200 p-5">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-slate-700" />
          <h2 className="text-base font-semibold text-slate-900">
            Student Answers and Scores
          </h2>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-2">Student</th>
                <th className="px-3 py-2">Score</th>
                <th className="px-3 py-2">Answer Breakdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentResults.map((student) => {
                const scorePercent = clampPct(
                  Math.round((student.score / student.total) * 100),
                );

                return (
                  <tr key={student.id} className="align-top">
                    <td className="px-3 py-3 text-sm font-medium text-slate-900">
                      {student.name}
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-sm font-semibold text-slate-900">
                        {student.score} / {student.total} ({scorePercent}%)
                      </p>
                      <div className="mt-2 h-2 w-40 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-[#00B96B]"
                          style={{ width: `${scorePercent}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        {student.answers.map((answer) => (
                          <button
                            type="button"
                            key={`${student.id}-${answer.questionLabel}`}
                            onClick={() =>
                              setActiveAnswer({
                                studentName: student.name,
                                answer,
                              })
                            }
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
                              answer.isCorrect
                                ? 'border-[#00B96B] bg-[#00B96B1A] text-[#00B96B]'
                                : 'border-rose-200 bg-rose-50 text-rose-700'
                            } cursor-pointer transition hover:-translate-y-px hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                            aria-label={`View ${answer.questionLabel} details`}
                          >
                            {answer.questionLabel}:{answer.selectedOption}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {activeAnswer ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveAnswer(null);
          }}
        >
          <Card hover={false} className="w-full max-w-2xl rounded-2xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {activeAnswer.studentName} • {activeAnswer.answer.questionLabel}:
                  {activeAnswer.answer.selectedOption}{' '}
                  {activeAnswer.answer.isCorrect ? (
                    <span className="text-[#00B96B]">(Correct)</span>
                  ) : (
                    <span className="text-rose-600">(Incorrect)</span>
                  )}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {activeQuestion?.prompt ?? 'Question details not available.'}
                </p>
                {activeQuestion ? (
                  <p className="mt-1 text-xs text-slate-500">{activeQuestion.topic}</p>
                ) : null}
              </div>

              <Button variant="ghost" size="sm" onClick={() => setActiveAnswer(null)}>
                Close
              </Button>
            </div>

            {activeQuestion ? (
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {activeQuestion.options.map((option) => {
                  const isSelected = option.id === activeAnswer.answer.selectedOption;
                  const isCorrect = option.id === activeAnswer.answer.correctOption;

                  let classes = 'border-slate-200 bg-white text-slate-700';
                  if (isCorrect) classes = 'border-[#00B96B] bg-[#00B96B1A] text-slate-900';
                  if (isSelected && !isCorrect) classes = 'border-rose-200 bg-rose-50 text-slate-900';

                  return (
                    <div
                      key={option.id}
                      className={`rounded-xl border px-3 py-2 text-sm ${classes}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0">
                          <span className="font-semibold">{option.id}.</span>{' '}
                          {option.text}
                        </p>
                        {isSelected ? (
                          <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                            Selected
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                This session does not have question details attached yet.
              </div>
            )}
          </Card>
        </div>
      ) : null}
    </section>
  );
}
