import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";

import Card from "../../../shared/components/ui/Card";
import Table from "../../../shared/components/ui/Table";
import Button from "../../../shared/components/ui/Button";
import type { TopicPerformanceRow } from "../data/analytics.mock";
import GenerateWorksheetModal, {
  type GenerateWorksheetPayload,
} from "../../dashboard/components/GenerateWorksheetModal";
import QuickPracticePreviewModal from "./QuickPracticePreviewModal";

export type TopicPerformanceTableProps = {
  rows: TopicPerformanceRow[];
};

const formatDelta = (value: number) => `${value > 0 ? "+" : ""}${value}%`;

const classAvgColor = (value: number) => {
  if (value >= 75) return "text-[#00B96B]";
  if (value >= 60) return "text-orange-600";
  return "text-rose-600";
};

export default function TopicPerformanceTable({
  rows,
}: TopicPerformanceTableProps) {
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [quickPracticeTopic, setQuickPracticeTopic] = useState<string | null>(null);

  const worksheetTopics = useMemo(() => {
    return rows.map((row) => ({
      id: row.id,
      label: row.topic,
      checked: row.classAvg < 60,
    }));
  }, [rows]);

  const handleGeneratePractice = (payload: GenerateWorksheetPayload) => {
    console.log("Generate targeted practice payload:", payload);
    alert(`Targeted practice requested for: ${payload.topics.join(", ")}`);
  };

  const handleGenerateSingleTopicWorksheet = (payload: {
    topic: string;
    questions: Array<{
      id: string;
      text: string;
      marks: number;
      difficulty: "easy" | "medium" | "hard";
    }>;
  }) => {
    console.log("Quick single-topic worksheet payload:", payload);
    alert(
      `Final worksheet generated for ${payload.topic} with ${payload.questions.length} questions.`,
    );
  };

  return (
    <>
      <section className="space-y-4">
        <Card
          className="
            space-y-6 p-4 sm:p-6
            transition-all duration-300 ease-in-out
            hover:-translate-y-1 hover:shadow-xl
          "
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Topic Performance
              </h3>
              <p className="text-sm text-slate-500">
                Detailed breakdown by curriculum topic
              </p>
            </div>

            <Button
              type="button"
              size="sm"
              className="
                bg-[#00B96B] text-white
                transition-all duration-200
                hover:-translate-y-0.5 hover:bg-[#009f5c] hover:shadow-md
              "
              onClick={() => setPracticeOpen(true)}
            >
              Generate Targeted Practice
            </Button>
          </div>

          <div
            className="
              overflow-x-auto
              rounded-xl
              border border-slate-200/60
              [&_thead_th]:px-4
              [&_thead_th]:py-3
              [&_thead_th]:text-left
              [&_thead_th]:text-[18px]
              sm:[&_thead_th]:text-[15px]
              [&_thead_th]:font-normal
              [&_thead_th]:text-gray-500
              [&_thead_th]:whitespace-nowrap
              [&_tbody_tr]:border-t
              [&_tbody_tr]:border-slate-100
            "
          >
            <Table
              headers={[
                "Topic",
                "Attempts",
                "Class Avg",
                "State Avg",
                "Vs State",
                "Trend",
                "Action",
              ]}
            >
              {rows.map((row) => {
                const isVsPositive = row.vsState >= 0;
                const isTrendPositive = row.trend >= 0;

                return (
                  <tr
                    key={row.id}
                    className="
                      align-middle
                      transition-colors duration-200
                      hover:bg-slate-50
                    "
                  >
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                      {row.topic}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {row.attempts}
                    </td>

                    <td
                      className={`px-4 py-4 text-sm font-semibold ${classAvgColor(
                        row.classAvg,
                      )}`}
                    >
                      {row.classAvg}%
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {row.stateAvg}%
                    </td>

                    <td
                      className={`px-4 py-4 text-sm font-medium ${
                        isVsPositive ? "text-[#00B96B]" : "text-rose-600"
                      }`}
                    >
                      {formatDelta(row.vsState)}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${
                          isTrendPositive ? "text-[#00B96B]" : "text-rose-600"
                        }`}
                      >
                        {isTrendPositive ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {formatDelta(row.trend)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="
                          flex items-center gap-2 whitespace-nowrap
                          transition-all duration-200
                          hover:-translate-y-0.5 hover:shadow-md
                        "
                        onClick={() => setQuickPracticeTopic(row.topic)}
                      >
                        <FileText className="h-4 w-4" />
                        Create Practice
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </Card>
      </section>

      <GenerateWorksheetModal
        open={practiceOpen}
        topics={worksheetTopics}
        onClose={() => setPracticeOpen(false)}
        onGenerate={handleGeneratePractice}
      />

      <QuickPracticePreviewModal
        open={!!quickPracticeTopic}
        topic={quickPracticeTopic}
        onClose={() => setQuickPracticeTopic(null)}
        onGenerateFinal={handleGenerateSingleTopicWorksheet}
      />
    </>
  );
}
