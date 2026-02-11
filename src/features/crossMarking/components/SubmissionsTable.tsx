import { Eye, CheckSquare, ChevronDown } from 'lucide-react';
import Badge from '../../../shared/components/ui/Badge';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import ProgressBar from '../../../shared/components/ui/ProgressBar';
import Table from '../../../shared/components/ui/Table';
import type {
  SubmissionRow,
  SubmissionStatus,
} from '../data/crossMarking.mock';

export type SubmissionsTableProps = {
  rows: SubmissionRow[];
  onSelect: (row: SubmissionRow) => void;
};

const statusVariant: Record<
  SubmissionStatus,
  'success' | 'warning' | 'danger'
> = {
  Pending: 'warning',
  Moderation: 'danger',
  Marked: 'success',
};

const progressVariant = (value: number) => {
  if (value >= 80) return 'green' as const;
  if (value >= 60) return 'orange' as const;
  return 'red' as const;
};

export default function SubmissionsTable({
  rows,
  onSelect,
}: SubmissionsTableProps) {
  return (
    <section className="space-y-4">
      <Card className="p-0">
        {/* 🔹 HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Submissions
            </h2>
            <p className="text-sm text-slate-500">
              {rows.length} submissions awaiting marking
            </p>
          </div>

          {/* 🔹 ALL STATUS BUTTON */}
          <button
            type="button"
            className="
              inline-flex items-center gap-2
              rounded-md border border-slate-200
              bg-white px-3 py-1.5
              text-sm text-slate-700
              hover:bg-slate-50
            "
          >
            All Status
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        {/* 🔹 TABLE */}
        <div className="overflow-x-auto">
          <Table
            headers={[
              '#',
              'Assessment',
              'Submitted',
              'SKOLAR Mark',
              'Confidence',
              'Status',
              'Final Mark',
              'Action',
            ]}
          >
            {rows.map((row) => (
              <tr
                key={row.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(row)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(row);
                  }
                }}
                className="cursor-pointer border-t border-slate-100 align-middle transition hover:bg-slate-50"
              >
                <td className="px-4 py-4 text-sm text-slate-500">
                  {row.index}
                </td>

                <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                  {row.assessment}
                </td>

                <td className="px-4 py-4 text-sm text-slate-600">
                  {row.submitted}
                </td>

                <td className="px-4 py-4 text-sm text-slate-700">
                  {row.skolarMark}
                </td>

                <td className="px-4 py-4 w-48">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-700">
                      {row.confidence}%
                    </span>
                    <ProgressBar
                      value={row.confidence}
                      variant={progressVariant(row.confidence)}
                    />
                  </div>
                </td>

                <td className="px-4 py-4">
                  <Badge variant={statusVariant[row.status]}>
                    {row.status}
                  </Badge>
                </td>

                <td className="px-4 py-4 text-sm text-slate-700">
                  {row.finalMark}
                </td>

                {/* 🔹 ACTION BUTTON */}
                <td className="px-4 py-4">
                  {row.action === 'Mark' ? (
                    <Button
                      size="sm"
                      className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <CheckSquare className="h-4 w-4" />
                      Mark
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
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
      </Card>
    </section>
  );
}
