// Analytics page – displays class and student performance metrics
import { Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import FilterDropdown, {
  type FilterDropdownOption,
} from "../../../shared/components/ui/FilterDropdown";
import PageHeader from "../../../shared/components/ui/PageHeader";
import { openPrintToPdfWindow } from "../../../shared/lib/printToPdf";

import AnalyticsStats from "../components/AnalyticsStats";
import LearningProfile from "../components/LearningProfile";
import CommandWordAnalysis from "../components/CommandWordAnalysis";
import TopicPerformanceTable from "../components/TopicPerformanceTable";

import { classesOverview } from "../../classes/data/classes.mock";
import {
  analyticsStats,
  learningProfile,
  commandWordAnalysis,
  insightCallout,
  topicPerformance,
} from "../data/analytics.mock";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function hashToUnit(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

export default function AnalyticsPage() {
  const classOptions: FilterDropdownOption[] = useMemo(
    () => [
      { value: "all", label: "All Classes" },
      ...classesOverview.map((c) => ({ value: c.slug, label: c.name })),
    ],
    [],
  );

  const periodOptions: FilterDropdownOption[] = useMemo(
    () => [
      { value: "this_month", label: "This Month" },
      { value: "last_month", label: "Last Month" },
      { value: "last_3_months", label: "Last 3 Months" },
      { value: "this_term", label: "This Term" },
      { value: "this_year", label: "This Year" },
    ],
    [],
  );

  const topicOptions: FilterDropdownOption[] = useMemo(() => {
    return [
      { value: "all", label: "All Topics" },
      ...topicPerformance.map((t) => ({ value: t.id, label: t.topic })),
    ];
  }, []);

  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("this_month");
  const [selectedTopic, setSelectedTopic] = useState("all");

  useEffect(() => {
    try {
      const storedClass = window.localStorage.getItem("analytics:selectedClass");
      const storedPeriod = window.localStorage.getItem(
        "analytics:selectedPeriod",
      );
      const storedTopic = window.localStorage.getItem("analytics:selectedTopic");

      if (storedClass && classOptions.some((o) => o.value === storedClass)) {
        setSelectedClass(storedClass);
      }
      if (
        storedPeriod &&
        periodOptions.some((o) => o.value === storedPeriod)
      ) {
        setSelectedPeriod(storedPeriod);
      }
      if (storedTopic && topicOptions.some((o) => o.value === storedTopic)) {
        setSelectedTopic(storedTopic);
      }
    } catch {
      // ignore
    }
  }, [classOptions, periodOptions, topicOptions]);

  useEffect(() => {
    try {
      window.localStorage.setItem("analytics:selectedClass", selectedClass);
      window.localStorage.setItem("analytics:selectedPeriod", selectedPeriod);
      window.localStorage.setItem("analytics:selectedTopic", selectedTopic);
    } catch {
      // ignore
    }
  }, [selectedClass, selectedPeriod, selectedTopic]);

  const derived = useMemo(() => {
    const classItem =
      selectedClass === "all"
        ? null
        : classesOverview.find((c) => c.slug === selectedClass) ?? null;

    const baseClassAvg = 72; // matches mock
    const classAvg =
      classItem == null
        ? baseClassAvg
        : clamp(
            Math.round(
              50 +
                (classItem.onTrack / Math.max(classItem.total, 1)) * 40,
            ),
            40,
            95,
          );
    const classDelta = classAvg - baseClassAvg;

    const periodFactor =
      selectedPeriod === "this_month"
        ? 1
        : selectedPeriod === "last_month"
          ? 0.92
          : selectedPeriod === "last_3_months"
            ? 2.55
            : selectedPeriod === "this_term"
              ? 3.2
              : 9.5;

    const jitter =
      0.94 + hashToUnit(`${selectedClass}|${selectedPeriod}`) * 0.12; // 0.94..1.06
    const attemptsFactor = periodFactor * jitter;

    const stats = analyticsStats.map((s) => {
      if (s.id === "active-students") {
        const enrolled =
          classItem?.total ??
          classesOverview.reduce((sum, c) => sum + c.total, 0);
        return {
          ...s,
          value: String(enrolled),
          subtitle: `of ${enrolled} enrolled`,
        };
      }

      if (s.id === "class-average") {
        return {
          ...s,
          value: `${classAvg}%`,
          subtitle:
            classDelta === 0
              ? s.subtitle
              : `${classDelta > 0 ? "+" : ""}${classDelta}%, vs all classes`,
        };
      }

      if (s.id === "total-questions") {
        const numeric = Number(String(s.value).replaceAll(",", "")) || 0;
        return {
          ...s,
          value: formatNumber(numeric * attemptsFactor),
          subtitle:
            selectedPeriod === "this_month"
              ? s.subtitle
              : periodOptions.find((p) => p.value === selectedPeriod)?.label ??
                s.subtitle,
        };
      }

      return s;
    });

    const learning = learningProfile.map((p) => ({
      ...p,
      score: clamp(Math.round(p.score + classDelta * 0.2), 0, 100),
    }));

    const command = commandWordAnalysis.map((c) => ({
      ...c,
      percent: clamp(Math.round(c.percent + classDelta * 0.25), 0, 100),
      attempts: Math.max(0, Math.round(c.attempts * attemptsFactor)),
    }));

    const topicsAll = topicPerformance.map((t) => {
      const nextClassAvg = clamp(Math.round(t.classAvg + classDelta), 0, 100);
      const nextAttempts = Math.max(0, Math.round(t.attempts * attemptsFactor));
      const nextVsState = nextClassAvg - t.stateAvg;
      const nextTrend = Math.round(t.trend + classDelta * 0.15);
      return {
        ...t,
        attempts: nextAttempts,
        classAvg: nextClassAvg,
        vsState: nextVsState,
        trend: nextTrend,
      };
    });

    const topics =
      selectedTopic === "all"
        ? topicsAll
        : topicsAll.filter((t) => t.id === selectedTopic);

    const topicLabel =
      topicOptions.find((o) => o.value === selectedTopic)?.label ?? "All Topics";

    const insight =
      selectedTopic === "all"
        ? insightCallout
        : `Focused insight for ${topicLabel}`;

    return {
      stats,
      learning,
      command,
      topics,
      insight,
      classLabel:
        classOptions.find((o) => o.value === selectedClass)?.label ??
        "All Classes",
      periodLabel:
        periodOptions.find((o) => o.value === selectedPeriod)?.label ??
        "This Month",
      topicLabel,
    };
  }, [
    selectedClass,
    selectedPeriod,
    selectedTopic,
    classOptions,
    periodOptions,
    topicOptions,
  ]);

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
      <p><strong>Filters:</strong> ${escapeHtml(derived.classLabel)} • ${escapeHtml(
        derived.periodLabel,
      )} • ${escapeHtml(derived.topicLabel)}</p>
      <ul>
        ${derived.stats
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
        ${derived.learning
          .map(
            (p) =>
              `<li><strong>${escapeHtml(p.label)}:</strong> ${p.score}%</li>`,
          )
          .join("")}
      </ul>
    `;

    const commandHtml = `
      <h2>Command Word Analysis</h2>
      <p>${escapeHtml(derived.insight)}</p>
      <ul>
        ${derived.command
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
        ${derived.topics
          .map(
            (t) =>
              `<li><strong>${escapeHtml(t.topic)}:</strong> Class ${t.classAvg}% vs State ${t.stateAvg}% (Î” ${t.vsState})</li>`,
          )
          .join("")}
      </ul>
    `;

    openPrintToPdfWindow({
      title: "Analytics Export",
      subtitle:
        "Printable view â€” use your browser â€œSave as PDFâ€ to download.",
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
              <FilterDropdown
                label="All Classes"
                value={selectedClass}
                options={classOptions}
                onChange={setSelectedClass}
              />

              <FilterDropdown
                label="This Month"
                value={selectedPeriod}
                options={periodOptions}
                onChange={setSelectedPeriod}
              />

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

      <AnalyticsStats stats={derived.stats} />

      <LearningProfile
        profiles={derived.learning}
        topicValue={selectedTopic}
        topicOptions={topicOptions}
        onTopicChange={setSelectedTopic}
      />

      <CommandWordAnalysis items={derived.command} insight={derived.insight} />

      <TopicPerformanceTable rows={derived.topics} />
    </div>
  );
}
