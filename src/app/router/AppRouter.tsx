import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// layouts
import TeacherShellLayout from "../layouts/TeacherShellLayout";
import AuthLayout from "../layouts/AuthLayout";

// auth pages
// onboarding + auth pages
import { SplashPage } from "../../features/auth/pages/SplashPage";
import { OnboardingPage } from "../../features/auth/pages/OnboardingPage";
import { AccountTypePage } from "../../features/auth/pages/AccountTypePage";
import { WelcomePage } from "../../features/auth/pages/WelcomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import SignupPage from "../../features/auth/pages/SignupPage";
import { VerifyEmailPage } from "../../features/auth/pages/VerifyEmailPage";
import { EducationDetailsPage } from "../../features/auth/pages/setup/EducationDetailsPage";
import { SelectSubjectsPage } from "../../features/auth/pages/setup/SelectSubjectsPage";
import { TargetAtarPage } from "../../features/auth/pages/setup/TargetAtarPage";
import { StudyPreferencesPage } from "../../features/auth/pages/setup/StudyPreferencesPage";

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
import { ROUTES } from "./routes";
import { OnboardingLayout } from "../../layouts/OnboardingLayout";

const PlaceholderPage = () => (
  <div className="text-slate-500">Coming Soon</div>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OnboardingLayout />}>
          <Route path={ROUTES.splash} element={<SplashPage />} />
          <Route path={ROUTES.onboarding} element={<OnboardingPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.authAccountType} element={<AccountTypePage />} />
          <Route path={ROUTES.authWelcome} element={<WelcomePage />} />
          <Route path={ROUTES.authLogin} element={<LoginPage />} />
          <Route path={ROUTES.authSignup} element={<SignupPage />} />
          <Route path={ROUTES.authVerifyEmail} element={<VerifyEmailPage />} />
          <Route
            path={ROUTES.authSetupEducation}
            element={<EducationDetailsPage />}
          />
          <Route
            path={ROUTES.authSetupSubjects}
            element={<SelectSubjectsPage />}
          />
          <Route path={ROUTES.authSetupTarget} element={<TargetAtarPage />} />
          <Route
            path={ROUTES.authSetupPreferences}
            element={<StudyPreferencesPage />}
          />
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
