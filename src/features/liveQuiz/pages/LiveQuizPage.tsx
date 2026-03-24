import { Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import PageHeader from "../../../shared/components/ui/PageHeader";
import LiveQuizStats from "../components/LiveQuizStats";
import RecentQuizzes from "../components/RecentQuizzes";
import QuickLaunchTemplates from "../components/QuickLaunchTemplates";
import PastQuizzes from "../components/PastQuizzes";
import LaunchQuizModal from "../components/LaunchQuizModal";
import type { QuickLaunchTemplate } from "../data/liveQuiz.mock";
import {
  classOptions,
  difficultyOptions,
  liveQuizStats,
  pastQuizzes,
  questionCountOptions,
  quickLaunchTemplates,
  quizSummary,
  recentQuizzes,
  reasoningToggle,
  timerOptions,
  topicOptions,
} from "../data/liveQuiz.mock";

export default function LiveQuizPage() {
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<QuickLaunchTemplate | null>(null);
  const navigate = useNavigate();

  const handleViewQuizResults = (quizId: string) => {
    navigate(`/teacher/live-quiz/session/${quizId}`);
  };

  const handleRelaunchQuiz = (quizId: string) => {
    navigate(`/teacher/live-quiz/session/${quizId}`);
  };

  const handleQuickLaunchTemplate = (template: QuickLaunchTemplate) => {
    setSelectedTemplate(template);
    setIsLaunchModalOpen(true);
  };

  const handleCloseLaunchModal = () => {
    setIsLaunchModalOpen(false);
    setSelectedTemplate(null);
  };

  const selectedTimerSeconds =
    selectedTemplate && selectedTemplate.questions > 0
      ? Math.max(
          15,
          Math.round((selectedTemplate.minutes * 60) / selectedTemplate.questions),
        )
      : null;

  const selectedQuestionValue = selectedTemplate
    ? `${selectedTemplate.questions} questions`
    : null;
  const selectedTimerValue = selectedTimerSeconds
    ? `${selectedTimerSeconds} seconds`
    : null;

  const launchQuestionOptions = selectedTemplate && selectedQuestionValue
    ? [
        {
          id: `template-questions-${selectedTemplate.id}`,
          label: selectedQuestionValue,
          value: selectedQuestionValue,
        },
        ...questionCountOptions.filter((option) => option.value !== selectedQuestionValue),
      ]
    : questionCountOptions;

  const launchTimerOptions = selectedTemplate && selectedTimerValue
    ? [
        {
          id: `template-timer-${selectedTemplate.id}`,
          label: selectedTimerValue,
          value: selectedTimerValue,
        },
        ...timerOptions.filter((option) => option.value !== selectedTimerValue),
      ]
    : timerOptions;

  const launchSummary = selectedTemplate
    ? {
        ...quizSummary,
        questions: selectedTemplate.questions,
        timePerQuestion: selectedTimerSeconds
          ? `${selectedTimerSeconds}s`
          : quizSummary.timePerQuestion,
        totalTime: `~${selectedTemplate.minutes} min`,
      }
    : quizSummary;

  return (
    <div className="space-y-6">
      <Card className="  p-4 sm:p-5
          transition-all duration-300 ease-in-out
          hover:shadow-lg">
        <PageHeader
          title="Live Quiz"
          subtitle="Launch real-time quizzes, track participation, and review results"
          actions={
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                setSelectedTemplate(null);
                setIsLaunchModalOpen(true);
              }}
              className="transition-all duration-200 hover:-translate-y-0.5"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Launch New Quiz
            </Button>
          }
        />
      </Card>

      <LiveQuizStats stats={liveQuizStats} />

      {/* same-height cards (no fixed row height) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-stretch">
        <RecentQuizzes
          quizzes={recentQuizzes}
          onViewResults={handleViewQuizResults}
          onRelaunch={handleRelaunchQuiz}
        />
        <QuickLaunchTemplates
          templates={quickLaunchTemplates}
          onLaunchTemplate={handleQuickLaunchTemplate}
        />
      </div>

      <PastQuizzes quizzes={pastQuizzes} />

      <LaunchQuizModal
        isOpen={isLaunchModalOpen}
        onClose={handleCloseLaunchModal}
        onStart={() => {
          try {
            window.open("/student/live-quiz", "_blank", "noopener,noreferrer");
          } catch {
            // ignore
          }
        }}
        classOptions={classOptions}
        topicOptions={topicOptions}
        questionOptions={launchQuestionOptions}
        timerOptions={launchTimerOptions}
        difficultyOptions={difficultyOptions}
        reasoningToggle={reasoningToggle}
        summary={launchSummary}
      />
    </div>
  );
}
