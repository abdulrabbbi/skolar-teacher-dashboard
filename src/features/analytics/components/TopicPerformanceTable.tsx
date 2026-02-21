
import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import Table from "../../../shared/components/ui/Table";
import Button from "../../../shared/components/ui/Button";
import type { TopicPerformanceRow } from "../data/analytics.mock";

export type TopicPerformanceTableProps = {
  rows: TopicPerformanceRow[];
};

const formatDelta = (value: number) => `${value > 0 ? "+" : ""}${value}%`;

// ✅ matches screenshot colors (green / orange / red)
const classAvgColor = (value: number) => {
  if (value >= 75) return "text-emerald-600";
  if (value >= 60) return "text-orange-600";
  return "text-rose-600";
};

export default function TopicPerformanceTable({ rows }: TopicPerformanceTableProps) {
  return (
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
            size="sm"
            className="
              bg-emerald-600 text-white
              transition-all duration-200
              hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5
            "
          >
            Generate Targeted Practice
          </Button>
        </div>

        <div className="overflow-x-auto">
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

                  {/* ✅ CLASS AVG colored like screenshot */}
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
                      isVsPositive ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {formatDelta(row.vsState)}
                  </td>

                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1 font-medium ${
                        isTrendPositive ? "text-emerald-600" : "text-rose-600"
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
                      size="sm"
                      variant="outline"
                      className="
                        flex items-center gap-2 whitespace-nowrap
                        transition-all duration-200
                        hover:shadow-md hover:-translate-y-0.5
                      "
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
  );
}
