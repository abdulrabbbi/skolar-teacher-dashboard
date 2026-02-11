import {
  Eye,
  Pencil,
  MoreVertical,
} from 'lucide-react';
import Badge, { type BadgeVariant } from '../../../shared/components/ui/Badge';
import Card from '../../../shared/components/ui/Card';
import Table from '../../../shared/components/ui/Table';
import type { AssessmentRow, AssessmentStatus } from '../data/assessments.mock';

export type AssessmentsTableProps = {
  rows: AssessmentRow[];
};

const statusVariant: Record<
  AssessmentStatus,
  'success' | 'warning' | 'neutral' | 'danger'
> = {
  Marking: 'warning',
  Active: 'success',
  Draft: 'neutral',
  Complete: 'success',
};

const typeVariant: Record<string, BadgeVariant> = {
  SAC: 'warning',
  Test: 'neutral',
  Exam: 'danger',
};

export default function AssessmentsTable({ rows }: AssessmentsTableProps) {
  return (
    <section>
      <Card className="p-0">
        {/* HEADER INSIDE CARD */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Assessments
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
              All Status
            </button>
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
              All Classes
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-slate-200" />

        {/* TABLE */}
        <div className="overflow-x-auto">
          <Table
            headers={[
              'Assessment',
              'Type',
              'Class',
              'Due Date',
              'Status',
              'Submissions',
              'Marked',
              'Avg Score',
              'Actions',
            ]}
          >
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-100 align-middle"
              >
                <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                  {row.title}
                </td>

                <td className="px-4 py-4">
                  <Badge variant={typeVariant[row.type] ?? 'neutral'}>
                    {row.type}
                  </Badge>
                </td>

                <td className="px-4 py-4 text-sm text-slate-700">
                  {row.className}
                </td>

                <td className="px-4 py-4 text-sm text-slate-700">
                  {row.dueDate}
                </td>

                <td className="px-4 py-4">
                  <Badge variant={statusVariant[row.status]}>
                    {row.status}
                  </Badge>
                </td>

                <td className="px-4 py-4 text-sm text-slate-700">
                  {row.submissions}
                </td>

                <td className="px-4 py-4 text-sm text-slate-700">
                  {row.marked}
                </td>

                <td className="px-4 py-4 text-sm font-medium text-slate-900">
                  {row.avgScore}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button className="rounded-md border border-slate-200 p-2 hover:bg-slate-50">
                      <Eye className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="rounded-md border border-slate-200 p-2 hover:bg-slate-50">
                      <Pencil className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="rounded-md border border-slate-200 p-2 hover:bg-slate-50">
                      <MoreVertical className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>
    </section>
  );
}
