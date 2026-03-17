import { ChevronDown, Download } from "lucide-react";

import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import PageHeader from "../../../shared/components/ui/PageHeader";
import { openPrintToPdfWindow } from "../../../shared/lib/printToPdf";

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
  const handleExportPdf = () => {
    const escapeHtml = (value: string) =>
      String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const statsHtml = `
      <h2>Top Stats</h2>
      <ul>
        ${analyticsStats
          .map(
            (s) =>
              `<li><strong>${escapeHtml(s.label)}:</strong> ${escapeHtml(
                s.value,
              )} <span style="color:#64748b;">(${escapeHtml(s.subtitle)})</span></li>`,
          )
          .join("")}
      </ul>
    `;

    const learningHtml = `
      <h2>Learning Profile</h2>
      <ul>
        ${learningProfile
          .map(
            (p) =>
              `<li><strong>${escapeHtml(p.label)}:</strong> ${p.score}%</li>`,
          )
          .join("")}
      </ul>
    `;

    const commandHtml = `
      <h2>Command Word Analysis</h2>
      <p>${escapeHtml(insightCallout)}</p>
      <ul>
        ${commandWordAnalysis
          .map(
            (c) =>
              `<li><strong>${escapeHtml(c.label)}:</strong> ${c.percent}% (${c.attempts} attempts)</li>`,
          )
          .join("")}
      </ul>
    `;

    const topicHtml = `
      <h2>Topic Performance</h2>
      <ul>
        ${topicPerformance
          .map(
            (t) =>
              `<li><strong>${escapeHtml(t.topic)}:</strong> Class ${t.classAvg}% vs State ${t.stateAvg}% (Δ ${t.vsState})</li>`,
          )
          .join("")}
      </ul>
    `;

    openPrintToPdfWindow({
      title: "Analytics Export",
      subtitle: "Printable view — use your browser “Save as PDF” to download.",
      bodyHtml: `${statsHtml}<div class="hr"></div>${learningHtml}<div class="hr"></div>${commandHtml}<div class="hr"></div>${topicHtml}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card
        className="
          p-4 sm:p-5
          transition-all duration-300 ease-in-out
          hover:shadow-lg
        "
      >
        <PageHeader
          title="Analytics"
          subtitle="Deep insights into student performance"
          actions={
            <div className="flex flex-wrap items-center gap-2">
             <Button
  size="sm"
  className="flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5
             !bg-gray-100 hover:!bg-gray-200 !text-slate-700
             !border !border-slate-200 !shadow-none"
>
  All Classes
  <ChevronDown className="h-4 w-4" />
</Button>

<Button
  size="sm"
  className="flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5
             !bg-gray-100 hover:!bg-gray-200 !text-slate-700
             !border !border-slate-200 !shadow-none"
>
  This Month
  <ChevronDown className="h-4 w-4" />
</Button>

<Button
  size="sm"
  className="flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5
             !bg-gray-100 hover:!bg-gray-200 !text-slate-700
             !border !border-slate-200 !shadow-none"
  onClick={handleExportPdf}
>
  <Download className="h-4 w-4" />
  Export PDF
</Button>
            </div>
          }
        />
      </Card>

      <AnalyticsStats stats={analyticsStats} />

      <LearningProfile profiles={learningProfile} />

      <CommandWordAnalysis items={commandWordAnalysis} insight={insightCallout} />

      <TopicPerformanceTable rows={topicPerformance} />
    </div>
  );
}
