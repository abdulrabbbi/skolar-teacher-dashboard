/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type ReactNode } from 'react';
import { Clock, Pause, Users, XCircle } from 'lucide-react';
import Card from '../../../../../shared/components/ui/Card';
import Button from '../../../../../shared/components/ui/Button';
import { cn } from '../../../../../shared/lib/cn';

export type SessionStatusBarProps = {
  progress: {
    current: number;
    total: number;
  };
  timeRemaining: string;
  studentsAnswered: {
    answered: number;
    total: number;
  };
  onEndQuiz?: () => void;
};

function StatBlock({
  label,
  value,
  icon,
  withDivider,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  withDivider?: boolean;
}) {
  return (
    <div className={withDivider ? 'sm:border-r sm:border-slate-200' : undefined}>
      <p className="px-2 text-sm text-slate-500 sm:px-6">{label}</p>
      <div className="mt-1 flex items-center gap-2 px-2 sm:px-6">
        {icon}
        <p className="text-sm font-semibold leading-none text-slate-950 sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}

function NextQuestionIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="2.5" height="16" rx="1" />
      <path d="M10 6.2v11.6c0 .9 1 1.5 1.8 1l9.4-5.8c.8-.5.8-1.6 0-2.1l-9.4-5.8c-.8-.5-1.8.1-1.8 1.1z" />
    </svg>
  );
}

export default function SessionStatusBar({
  progress,
  timeRemaining,
  studentsAnswered,
  onEndQuiz,
}: SessionStatusBarProps) {
  const [currentQuestion, setCurrentQuestion] = useState(progress.current);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    setCurrentQuestion(progress.current);
    setIsPaused(false);
    setIsEnded(false);
    setStatusMessage('');
  }, [progress.current, progress.total]);

  const canGoToNext = !isEnded && !isPaused && currentQuestion < progress.total;

  const handlePause = () => {
    if (isEnded) {
      return;
    }

    setIsPaused((previous) => {
      const willPause = !previous;
      setStatusMessage(
        willPause
          ? 'Quiz paused (frontend preview).'
          : 'Quiz resumed (frontend preview).',
      );
      return willPause;
    });
  };

  const handleNextQuestion = () => {
    if (isEnded) {
      setStatusMessage('Quiz already ended.');
      return;
    }

    if (isPaused) {
      setStatusMessage('Resume quiz before moving to the next question.');
      return;
    }

    if (currentQuestion >= progress.total) {
      setStatusMessage('You are on the last question. End quiz to finish.');
      return;
    }

    const nextQuestion = Math.min(currentQuestion + 1, progress.total);
    setCurrentQuestion(nextQuestion);
    setStatusMessage(
      nextQuestion === progress.total
        ? 'Last question reached. You can now end the quiz.'
        : `Moved to question ${nextQuestion} (frontend preview).`,
    );
  };

  const handleEndQuiz = () => {
    if (isEnded) {
      return;
    }

    if (onEndQuiz) {
      onEndQuiz();
      return;
    }

    setIsEnded(true);
    setIsPaused(false);
    setStatusMessage('Quiz ended (frontend preview). Backend action pending.');
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0">
          <StatBlock
            label="Question Progress"
            value={`${currentQuestion} / ${progress.total}`}
            withDivider
          />

          <StatBlock
            label="Time Remaining"
            value={isEnded ? 'Ended' : isPaused ? 'Paused' : timeRemaining}
            icon={<Clock className="h-5 w-5 text-[#00B96B]" />}
            withDivider
          />

          <StatBlock
            label="Students Answered"
            value={`${studentsAnswered.answered} / ${studentsAnswered.total}`}
            icon={<Users className="h-5 w-5 text-[#00B96B]" />}
          />
        </div>

        <div className="ml-auto flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            className="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 hover:bg-slate-50"
            onClick={handlePause}
            disabled={isEnded}
          >
            <Pause className="h-4 w-4" />
            {isPaused ? 'Resume' : 'Pause'}
          </Button>

          <Button
            variant="success"
            size="sm"
            className="h-10 rounded-xl bg-[#00B96B] px-4 text-sm text-white hover:bg-[#009f5c]"
            onClick={handleNextQuestion}
            disabled={!canGoToNext}
          >
            <NextQuestionIcon className="h-4 w-4" />
            Next Question
          </Button>

          <Button
            size="sm"
            className={cn(
              'h-10 rounded-xl px-4 text-sm text-white',
              isEnded
                ? 'bg-slate-300 text-slate-600 hover:bg-slate-300'
                : 'bg-rose-600 hover:bg-rose-700',
            )}
            onClick={handleEndQuiz}
            disabled={isEnded}
          >
            <XCircle className="h-4 w-4" />
            {isEnded ? 'Quiz Ended' : 'End Quiz'}
          </Button>
        </div>
      </div>

      {statusMessage ? (
        <p className="mt-3 text-xs font-medium text-slate-500">{statusMessage}</p>
      ) : null}
    </Card>
  );
}
