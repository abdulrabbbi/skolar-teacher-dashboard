import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import TeacherShellLayout from '../layouts/TeacherShellLayout';
import ProtectedRoute from './ProtectedRoute';

import LoginPage from '../../features/auth/pages/LoginPage';
import SignupPage from '../../features/auth/pages/SignupPage';
import WelcomePage from '../../features/auth/pages/WelcomePage';
import ContactSkolarPage from '../../features/auth/pages/ContactSkolarPage';

import AnalyticsPage from '../../features/analytics/pages/AnalyticsPage';
import CalendarPage from '../../features/calendar/pages/CalendarPage';
import ClassDetailPage from '../../features/classes/pages/ClassDetailPage';
import MyClassesPage from '../../features/classes/pages/MyClassesPage';
import CrossMarkingPage from '../../features/crossMarking/pages/CrossMarkingPage';
import ModerationRoomPage from '../../features/crossMarking/pages/ModerationRoomPage';
import SubmissionDetailPage from '../../features/crossMarking/pages/SubmissionDetailPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import UpcomingAssessmentsPage from '../../features/dashboard/pages/UpcomingAssessmentsPage';
import GamesPage from '../../features/games/pages/GamesPage';
import LiveQuizPage from '../../features/liveQuiz/pages/LiveQuizPage';
import LiveQuizSessionPage from '../../features/liveQuiz/pages/session/LiveQuizSessionPage';
import LiveQuizSessionAnalyticsPage from '../../features/liveQuiz/pages/session/LiveQuizSessionAnalyticsPage';
import SettingsPage from '../../features/settings/pages/SettingsPage';
import AreaOfStudyDetail from '../../features/taskCompiler/pages/AreaOfStudyDetail';
import GenerateQuickContentPage from '../../features/taskCompiler/pages/GenerateQuickContentPage';
import SubjectAreasPage from '../../features/taskCompiler/pages/SubjectAreasPage';
import SubjectSelectPage from '../../features/taskCompiler/pages/SubjectSelectPage';
import TaskCompilerPage from '../../features/taskCompiler/pages/TaskCompilerPage';
import TaskHistoryPage from '../../features/taskCompiler/pages/TaskHistoryPage';
import ContentLibraryPage from '../../features/contentLibrary/pages/ContentLibraryPage';
import CurriculumPage from '../../features/curriculum/pages/CurriculumPage';
import CurriculumDetailPage from '../../features/curriculum/pages/CurriculumDetailPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/contact" element={<ContactSkolarPage />} />
        </Route>

        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherShellLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="upcoming-assessments"
            element={<UpcomingAssessmentsPage />}
          />
          <Route path="classes" element={<MyClassesPage />} />
          <Route path="classes/:classId" element={<ClassDetailPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="cross-marking" element={<CrossMarkingPage />} />
          <Route
            path="cross-marking/moderation-room"
            element={<ModerationRoomPage />}
          />
          <Route
            path="cross-marking/submission/:submissionId"
            element={<SubmissionDetailPage />}
          />

          <Route path="task-compiler" element={<TaskCompilerPage />}>
            <Route index element={<Navigate to="by-subject" replace />} />
            <Route path="by-subject" element={<SubjectSelectPage />} />
            <Route path="by-subject/:subjectId" element={<SubjectAreasPage />} />
            <Route
              path="by-subject/:subjectId/areas/:areaId"
              element={<AreaOfStudyDetail />}
            />
            <Route path="quick-content" element={<GenerateQuickContentPage />} />
            <Route path="history" element={<TaskHistoryPage />} />
          </Route>

          <Route path="settings" element={<SettingsPage />} />

          <Route path="live-quiz" element={<LiveQuizPage />} />
          <Route path="live-quiz/session/:quizId" element={<LiveQuizSessionPage />} />
          <Route
            path="live-quiz/session/:quizId/analytics"
            element={<LiveQuizSessionAnalyticsPage />}
          />

          <Route path="content-library" element={<ContentLibraryPage />} />
          <Route path="curriculum" element={<CurriculumPage />} />
          <Route
            path="curriculum/:subjectId/:unitId"
            element={<CurriculumDetailPage />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
