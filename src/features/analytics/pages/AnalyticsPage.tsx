
import { ChevronDown, Download } from "lucide-react";

import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import PageHeader from "../../../shared/components/ui/PageHeader";

import AnalyticsStats from "../components/AnalyticsStats";
import LearningProfile from "../components/LearningProfile";
import CommandWordAnalysis from "../components/CommandWordAnalysis";
import TopicPerformanceTable from "../components/TopicPerformanceTable";

import {
  analyticsStats,
  learningProfile,
  commandWordAnalysis,
  insightCallout,
  topicPerformance,
} from "../data/analytics.mock";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">

      {/* ✅ HEADER CARD (THIS WAS MISSING BEFORE) */}
      <Card className="p-4 sm:p-5">
        <PageHeader
          title="Analytics"
          subtitle="Deep insights into student performance"
          actions={
            <>
              <Button variant="outline" size="sm">
                All Classes
                <ChevronDown className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm">
                This Month
                <ChevronDown className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </>
          }
        />
      </Card>

      {/* STATS */}
      <AnalyticsStats stats={analyticsStats} />

      {/* FULL WIDTH SECTIONS */}
      <LearningProfile profiles={learningProfile} />

      <CommandWordAnalysis
        items={commandWordAnalysis}
        insight={insightCallout}
      />

      <TopicPerformanceTable rows={topicPerformance} />
    </div>
  );
}
