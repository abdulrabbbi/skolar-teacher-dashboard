import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import Card from '../../../shared/components/ui/Card';
import Table from '../../../shared/components/ui/Table';
import Button from '../../../shared/components/ui/Button';
import type { TopicPerformanceRow } from '../data/analytics.mock';

export type TopicPerformanceTableProps = {
  rows: TopicPerformanceRow[];
};

const formatDelta = (value: number) =>
  `${value > 0 ? '+' : ''}${value}%`;

export default function TopicPerformanceTable({
  rows,
}: TopicPerformanceTableProps) {
  return (
    <section className="space-y-4 ">
      {/* SINGLE MODEL */}
      <Card className="space-y-6 p-4 sm:p-6">
        {/* HEADER INSIDE CARD */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 ">
              Topic Performance
            </h3>
            <p className="text-sm text-slate-500 ">
              Detailed breakdown by curriculum topic
            </p>
          </div>

          <Button
            size="sm"
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Generate Targeted Practice
          </Button>
        </div>

        {/* TABLE (RESPONSIVE) */}
        <div className="overflow-x-auto">
          <Table
            headers={[
              'Topic',
              'Attempts',
              'Class Avg',
              'State Avg',
              'Vs State',
              'Trend',
              'Action',
            ]}
          >
            {rows.map((row) => {
              const isVsPositive = row.vsState >= 0;
              const isTrendPositive = row.trend >= 0;

              return (
                <tr key={row.id} className="align-middle">
                  {/* TOPIC */}
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    {row.topic}
                  </td>

                  {/* ATTEMPTS */}
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {row.attempts}
                  </td>

                  {/* CLASS AVG */}
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {row.classAvg}%
                  </td>

                  {/* STATE AVG */}
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {row.stateAvg}%
                  </td>

                  {/* VS STATE */}
                  <td
                    className={`px-4 py-4 text-sm font-medium ${
                      isVsPositive
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {formatDelta(row.vsState)}
                  </td>

                  {/* TREND */}
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1 font-medium ${
                        isTrendPositive
                          ? 'text-emerald-600'
                          : 'text-rose-600'
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

                  {/* ACTION */}
                  <td className="px-4 py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2 whitespace-nowrap "
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
