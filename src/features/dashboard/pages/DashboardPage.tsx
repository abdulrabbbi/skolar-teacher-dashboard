import PageHeader from "../../../shared/components/ui/PageHeader";
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
    <section className="rounded-2xl bg-white px-4 py-3 md:px-6 md:py-4 border border-slate-200 ">
      {children}
    </section>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-5 ">
      <DashboardSection>
        <PageHeader
          title={dashboardGreeting.title}
          subtitle={dashboardGreeting.subtitle}
        />
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
