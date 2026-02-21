// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from "../../../shared/components/ui/Card";
// import Button from "../../../shared/components/ui/Button";
// import PageHeader from "../../../shared/components/ui/PageHeader";
// import LiveQuizStats from "../components/LiveQuizStats";
// import RecentQuizzes from "../components/RecentQuizzes";
// import QuickLaunchTemplates from "../components/QuickLaunchTemplates";
// import PastQuizzes from "../components/PastQuizzes";
// import LaunchQuizModal from "../components/LaunchQuizModal";
// import {
//   classOptions,
//   difficultyOptions,
//   liveQuizStats,
//   pastQuizzes,
//   questionCountOptions,
//   quickLaunchTemplates,
//   quizSummary,
//   recentQuizzes,
//   reasoningToggle,
//   timerOptions,
//   topicOptions,
// } from "../data/liveQuiz.mock";

// export default function LiveQuizPage() {
//   const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleRelaunchQuiz = (quizId: string) => {
//     navigate(`/teacher/live-quiz/session/${quizId}`);
//   };

//   return (
//     <div className="space-y-6">
//       <Card className="p-4 sm:p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
//         <PageHeader
//           title="Live Quiz"
//           subtitle="Launch real-time quizzes, track participation, and review results"
//           actions={
//             <Button
//               variant="success"
//               size="sm"
//               onClick={() => setIsLaunchModalOpen(true)}
//               className="transition-all duration-200 hover:-translate-y-0.5"
//             >
//               Launch New Quiz
//             </Button>
//           }
//         />
//       </Card>

//       <LiveQuizStats stats={liveQuizStats} />

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:auto-rows-[420px]">
//         <RecentQuizzes quizzes={recentQuizzes} onRelaunch={handleRelaunchQuiz} />
//         <QuickLaunchTemplates templates={quickLaunchTemplates} />
//       </div>

//       <PastQuizzes quizzes={pastQuizzes} />

//       <LaunchQuizModal
//         isOpen={isLaunchModalOpen}
//         onClose={() => setIsLaunchModalOpen(false)}
//         classOptions={classOptions}
//         topicOptions={topicOptions}
//         questionOptions={questionCountOptions}
//         timerOptions={timerOptions}
//         difficultyOptions={difficultyOptions}
//         reasoningToggle={reasoningToggle}
//         summary={quizSummary}
//       />
//     </div>
//   );
// }


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
  const navigate = useNavigate();

  const handleRelaunchQuiz = (quizId: string) => {
    navigate(`/teacher/live-quiz/session/${quizId}`);
  };

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
              onClick={() => setIsLaunchModalOpen(true)}
              className="transition-all duration-200 hover:-translate-y-0.5"
            >
              Launch New Quiz
            </Button>
          }
        />
      </Card>

      <LiveQuizStats stats={liveQuizStats} />

      {/* ✅ same-height cards (no fixed row height) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-stretch">
        <RecentQuizzes quizzes={recentQuizzes} onRelaunch={handleRelaunchQuiz} />
        <QuickLaunchTemplates templates={quickLaunchTemplates} />
      </div>

      <PastQuizzes quizzes={pastQuizzes} />

      <LaunchQuizModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        classOptions={classOptions}
        topicOptions={topicOptions}
        questionOptions={questionCountOptions}
        timerOptions={timerOptions}
        difficultyOptions={difficultyOptions}
        reasoningToggle={reasoningToggle}
        summary={quizSummary}
      />
    </div>
  );
}