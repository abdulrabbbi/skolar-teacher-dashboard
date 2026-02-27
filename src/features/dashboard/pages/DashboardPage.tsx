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
  return <Card className="space-y-4 p-5">{children}</Card>;
}

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <DashboardSection>
        <div
          className="
            [&_h1]:text-[40px]
            [&_h1]:font-extrabold
            [&_h1]:leading-[1.05]
            [&_h1]:tracking-tight
            [&_h1]:text-slate-900

            sm:[&_h1]:text-[45px]
            md:[&_h1]:text-[52px]

            [&_p]:mt-2
            [&_p]:text-sm
            [&_p]:text-slate-500
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