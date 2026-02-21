
import { Eye, CheckSquare, ChevronDown } from "lucide-react";
import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import ProgressBar from "../../../shared/components/ui/ProgressBar";
import Table from "../../../shared/components/ui/Table";
import type { SubmissionRow, SubmissionStatus } from "../data/crossMarking.mock";

export type SubmissionsTableProps = {
  rows: SubmissionRow[];
  onSelect: (row: SubmissionRow) => void;
};

const statusVariant: Record<SubmissionStatus, "success" | "warning" | "danger"> =
  {
    Pending: "warning",
    Moderation: "danger",
    Marked: "success",
  };

const progressVariant = (value: number) => {
  if (value >= 80) return "green" as const;
  if (value >= 60) return "orange" as const;
  return "red" as const;
};

export default function SubmissionsTable({ rows, onSelect }: SubmissionsTableProps) {
  return (
    <section className="space-y-4">
      <Card className="p-0 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Submission</h2>
            <p className="text-sm text-slate-500">
              {rows.length} submissions awaiting marking
            </p>
          </div>

          <button
            type="button"
            className="
              group inline-flex items-center gap-2
              rounded-xl border border-slate-200 bg-slate-50
              px-4 py-2 text-sm font-medium text-slate-700
              transition hover:bg-slate-100
              whitespace-nowrap
            "
          >
            All Status
            <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:scale-110" />
          </button>
        </div>

        {/* TABLE (desktop/tablet) */}
        <div className="hidden md:block">
          <Table
            headers={[
              "#",
              "Assessment",
              "Submitted",
              "SKOLAR Mark",
              "Confidence",
              "Status",
              "Final Mark",
              "Action",
            ]}
          >
            {rows.map((row) => (
              <tr
                key={row.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(row)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(row);
                  }
                }}
                className="cursor-pointer border-t border-slate-100 align-middle transition-colors duration-200 hover:bg-slate-50"
              >
                {/* # */}
                <td className="px-4 py-5 text-sm font-semibold text-slate-900 whitespace-nowrap">
                  {row.index}
                </td>

                {/* Assessment (match image: smaller, normal, single line) */}
                <td className="px-4 py-5">
                  <div className="text-sm font-medium text-slate-900 whitespace-nowrap">
                    {row.assessment}
                  </div>
                </td>

                {/* Submitted (match image: muted, single line) */}
                <td className="px-4 py-5">
                  <div className="text-sm text-slate-500 whitespace-nowrap">
                    {row.submitted}
                  </div>
                </td>

                {/* SKOLAR Mark (bold like image) */}
                <td className="px-4 py-5 text-sm font-semibold text-slate-900 whitespace-nowrap">
                  {row.skolarMark}
                </td>

                {/* Confidence (bar + % inline like image) */}
                <td className="px-4 py-5 w-[220px]">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <ProgressBar
                        value={row.confidence}
                        variant={progressVariant(row.confidence)}
                      />
                    </div>
                    <span className="text-sm text-slate-700 tabular-nums whitespace-nowrap">
                      {row.confidence}%
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-5 whitespace-nowrap">
                  <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                </td>

                {/* Final Mark (bold like image) */}
                <td className="px-4 py-5 text-sm font-semibold text-slate-900 whitespace-nowrap">
                  {row.finalMark}
                </td>

                {/* Action */}
                <td className="px-4 py-5 whitespace-nowrap">
                  {row.action === "Mark" ? (
                    <Button
                      size="sm"
                      className="
                        inline-flex items-center gap-2
                        rounded-xl bg-emerald-600 text-white
                        hover:bg-emerald-700
                        transition-all duration-200 hover:-translate-y-0.5
                        px-4
                      "
                    >
                      <CheckSquare className="h-4 w-4" />
                      Mark
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="
                        inline-flex items-center gap-2
                        rounded-xl px-4
                      "
                    >
                      <Eye className="h-4 w-4" />
                      Review
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* MOBILE (responsive, no horizontal scroll) */}
        <div className="block md:hidden">
          <div className="divide-y divide-slate-100">
            {rows.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={() => onSelect(row)}
                className="w-full text-left px-4 py-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {/* # + Assessment + Submitted inline/stacked nicely */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {row.index}
                      </span>
                      <span className="text-sm font-medium text-slate-900">
                        {row.assessment}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {row.submitted}
                    </div>
                  </div>

                  <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-slate-500">SKOLAR Mark</div>
                    <div className="font-semibold text-slate-900">{row.skolarMark}</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500">Final Mark</div>
                    <div className="font-semibold text-slate-900">{row.finalMark}</div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500">Confidence</div>
                      <div className="text-xs text-slate-700 tabular-nums">
                        {row.confidence}%
                      </div>
                    </div>
                    <div className="mt-1">
                      <ProgressBar
                        value={row.confidence}
                        variant={progressVariant(row.confidence)}
                      />
                    </div>
                  </div>

                  <div className="col-span-2 pt-1">
                    {row.action === "Mark" ? (
                      <Button
                        size="sm"
                        className="
                          w-full inline-flex items-center justify-center gap-2
                          rounded-xl bg-emerald-600 text-white
                          hover:bg-emerald-700
                        "
                      >
                        <CheckSquare className="h-4 w-4" />
                        Mark
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl"
                      >
                        <Eye className="h-4 w-4" />
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
