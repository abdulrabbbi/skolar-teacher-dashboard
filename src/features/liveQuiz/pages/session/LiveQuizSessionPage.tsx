import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { liveQuizSessions } from '../../data/liveQuizSession.mock';
import SessionTopBar from './components/SessionTopBar';
import SessionStatusBar from './components/SessionStatusBar';
import QuestionCard from './components/QuestionCard';
import ParticipationCard from './components/ParticipationCard';
import AnswerDistributionCard from './components/AnswerDistributionCard';
import MisconceptionAlertsCard from './components/MisconceptionAlertsCard';
import StudentsNotAnsweredCard from './components/StudentsNotAnsweredCard';
import QuickActionsCard from './components/QuickActionsCard';

export default function LiveQuizSessionPage() {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();

  const session = useMemo(() => {
    return (
      liveQuizSessions.find((item) => item.id === quizId) ??
      liveQuizSessions[0]
    );
  }, [quizId]);

  const participationPercent = Math.round(
    (session.studentsAnswered.answered / session.studentsAnswered.total) *
      100
  );

  return (
    <section className="space-y-6">
      <SessionTopBar onBack={() => navigate(-1)} />

      <SessionStatusBar
        progress={session.progress}
        timeRemaining={session.timeRemaining}
        studentsAnswered={session.studentsAnswered}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <QuestionCard
            title={session.question.title}
            topic={session.question.topic}
            text={session.question.text}
            timeLimit="60 seconds"
            options={session.question.options}
          />

          <ParticipationCard percent={participationPercent} />

          <AnswerDistributionCard items={session.answerDistribution} />
        </div>

        <div className="flex flex-col gap-6">
          <MisconceptionAlertsCard items={session.misconceptions} />
          <StudentsNotAnsweredCard students={session.studentsNotAnswered} />
          <QuickActionsCard actions={session.quickActions} />
        </div>
      </div>
    </section>
  );
}
