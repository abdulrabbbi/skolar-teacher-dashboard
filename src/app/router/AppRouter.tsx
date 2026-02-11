import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// layouts
import TeacherShellLayout from "../layouts/TeacherShellLayout";
import AuthLayout from "../layouts/AuthLayout";

// auth pages
import LoginPage from "../../features/auth/pages/LoginPage";
import SignupPage from "../../features/auth/pages/SignupPage";

// teacher pages
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import MyClassesPage from "../../features/classes/pages/MyClassesPage";
import ClassDetailPage from "../../features/classes/pages/ClassDetailPage";
import AnalyticsPage from "../../features/analytics/pages/AnalyticsPage";
import CalendarPage from "../../features/calendar/pages/CalendarPage";
import AssessmentsPage from "../../features/assessments/pages/AssessmentsPage";
import CrossMarkingPage from "../../features/crossMarking/pages/CrossMarkingPage";
import LiveQuizPage from "../../features/liveQuiz/pages/LiveQuizPage";
import LiveQuizSessionPage from "../../features/liveQuiz/pages/session/LiveQuizSessionPage"; // ✅ REAL PAGE
import TaskCompilerPage from "../../features/taskCompiler/pages/TaskCompilerPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
import GamesPage from "../../features/games/pages/GamesPage";

const PlaceholderPage = () => (
  <div className="text-slate-500">Coming Soon</div>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* AUTH */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* TEACHER */}
        <Route path="/teacher" element={<TeacherShellLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="classes" element={<MyClassesPage />} />
          <Route path="classes/:classId" element={<ClassDetailPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="assessments" element={<AssessmentsPage />} />
          <Route path="cross-marking" element={<CrossMarkingPage />} />
          <Route path="task-compiler" element={<TaskCompilerPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* LIVE QUIZ */}
          <Route path="live-quiz" element={<LiveQuizPage />} />
          <Route
            path="live-quiz/session/:quizId"
            element={<LiveQuizSessionPage />}
          />

          {/* PLACEHOLDERS */}
          <Route path="content-library" element={<PlaceholderPage />} />
          <Route path="curriculum" element={<PlaceholderPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
