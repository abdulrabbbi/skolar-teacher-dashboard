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
        relative space-y-4 overflow-hidden rounded-3xl
        border border-white/40 ring-1 ring-emerald-200/60
        bg-white/32 bg-gradient-to-br from-white/70 via-white/28 to-emerald-100/18
        p-5 backdrop-blur-2xl backdrop-saturate-150
        shadow-none
      "
    >
      {children}
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-5 p-4 sm:p-5 lg:p-0">
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
  );
}
