import PageHeader from "../../../shared/components/ui/PageHeader";
import Card from "../../../shared/components/ui/Card";
import AlertsInsights from "../components/AlertsInsights";
import ClassroomPulse from "../components/ClassroomPulse";
import ClassesOverview from "../components/ClassesOverview";
import QuickActions from "../components/QuickActions";
import TopicPerformance from "../components/TopicPerformance";
import UpcomingAssessments from "../components/UpcomingAssessments";

import {
  alertsInsights,
  classroomPulseStats,
  classesOverview,
  dashboardGreeting,
  quickActions,
  topicPerformance,
  upcomingAssessments,
} from "../data/dashboard.mock";

function DashboardSection({ children }: { children: React.ReactNode }) {
  return (
    <Card
      hover={false}
      className="
        space-y-4 rounded-3xl border border-emerald-200/70
        bg-white/45 bg-gradient-to-br from-white/70 via-white/45 to-emerald-100/25
        p-5 backdrop-blur-xl
        shadow-[0_14px_32px_rgba(16,185,129,0.14)]
      "
    >
      {children}
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div
      className="
        relative isolate overflow-hidden rounded-[28px]
        border border-emerald-200/70
        p-4 shadow-[0_26px_70px_rgba(16,185,129,0.20)]
        sm:p-5 lg:p-6
      "
      style={{
        backgroundColor: "#dcf7e8",
        backgroundImage: `
          radial-gradient(900px circle at 10% -10%, rgba(255,255,255,0.75), transparent 40%),
          radial-gradient(760px circle at 90% 110%, rgba(16,185,129,0.28), transparent 45%),
          linear-gradient(145deg, #effff6 0%, #dff8ea 45%, #c7f0dc 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute -top-16 right-8 h-56 w-56 rounded-full bg-white/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="relative space-y-5">
        <DashboardSection>
          <div
            className="
              [&_h1]:text-[40px]
              [&_h1]:font-extrabold
              [&_h1]:leading-[1.05]
              [&_h1]:tracking-tight
              [&_h1]:text-emerald-950

              sm:[&_h1]:text-[45px]
              md:[&_h1]:text-[52px]

              [&_p]:mt-2
              [&_p]:text-sm
              [&_p]:text-emerald-900/70
              sm:[&_p]:text-base
            "
          >
            <PageHeader
              title={dashboardGreeting.title}
              subtitle={dashboardGreeting.subtitle}
            />
          </div>
        </DashboardSection>

        <DashboardSection>
          <ClassroomPulse stats={classroomPulseStats} />
        </DashboardSection>

        <DashboardSection>
          <ClassesOverview classes={classesOverview} />
        </DashboardSection>

        <DashboardSection>
          <TopicPerformance topics={topicPerformance} />
        </DashboardSection>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <DashboardSection>
            <AlertsInsights alerts={alertsInsights} />
          </DashboardSection>

          <DashboardSection>
            <QuickActions actions={quickActions} />
          </DashboardSection>
        </div>

        <DashboardSection>
          <UpcomingAssessments assessments={upcomingAssessments} />
        </DashboardSection>
      </div>
    </div>
  );
}
