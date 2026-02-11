import { useState } from 'react';
import Badge from '../../../shared/components/ui/Badge';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import ProgressBar from '../../../shared/components/ui/ProgressBar';
import SearchInput from '../../../shared/components/ui/SearchInput';
import Table from '../../../shared/components/ui/Table';
import { Eye, Search } from 'lucide-react';
import type { StudentRow, StudentStatus } from '../data/students.mock';

export type StudentsTableProps = {
  students: StudentRow[];
};

type Filter = 'all' | 'onTrack' | 'atRisk';

const statusVariant: Record<StudentStatus, 'success' | 'danger'> = {
  'On Track': 'success',
  'At Risk': 'danger',
};

const progressVariant = (value: number) => {
  if (value >= 75) return 'green' as const;
  if (value >= 60) return 'orange' as const;
  return 'red' as const;
};

export default function StudentsTable({ students }: StudentsTableProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filteredStudents = students.filter((student) => {
    if (filter === 'onTrack') return student.status === 'On Track';
    if (filter === 'atRisk') return student.status === 'At Risk';
    return true;
  });

  return (
    <section className="space-y-4">
      <Card className="p-0 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        {/* HEADER */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Students
            </h4>
          </div>

          {/* SEARCH + FILTERS */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            {/* SEARCH */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <SearchInput placeholder="Search students..." className="pl-9" />
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant={filter === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilter('all')}
                className="transition-all duration-200 hover:-translate-y-0.5"
              >
                All Students
              </Button>
              <Button
                size="sm"
                variant={filter === 'onTrack' ? 'primary' : 'outline'}
                onClick={() => setFilter('onTrack')}
                className="transition-all duration-200 hover:-translate-y-0.5"
              >
                On Track
              </Button>
              <Button
                size="sm"
                variant={filter === 'atRisk' ? 'primary' : 'outline'}
                onClick={() => setFilter('atRisk')}
                className="transition-all duration-200 hover:-translate-y-0.5"
              >
                At Risk
              </Button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <Table
          className="rounded-none border-0"
          headers={[
            'Student',
            'Status',
            'Accuracy',
            'Confidence',
            'Questions',
            'Weak Topics',
            'Last Active',
            'Action',
          ]}
        >
          {filteredStudents.map((student) => (
            <tr
              key={student.id}
              className="align-middle transition-all duration-200 hover:bg-slate-50"
            >
              {/* STUDENT */}
              <td className="px-4 py-4">
                <p className="text-sm font-semibold text-slate-900">
                  {student.name}
                </p>
                <p className="text-xs text-slate-500">{student.email}</p>
              </td>

              {/* STATUS */}
              <td className="px-4 py-4">
                <Badge variant={statusVariant[student.status]}>
                  {student.status}
                </Badge>
              </td>

              {/* ACCURACY */}
              <td className="px-4 py-4 w-40">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-700">
                    {student.accuracy}%
                  </span>
                  <ProgressBar
                    value={student.accuracy}
                    variant={progressVariant(student.accuracy)}
                  />
                </div>
              </td>

              {/* CONFIDENCE (FIXED) */}
              <td className="px-4 py-4 w-40">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-700">
                    {student.confidence}%
                  </span>
                  <ProgressBar
                    value={student.confidence}
                    variant={progressVariant(student.confidence)}
                  />
                </div>
              </td>

              {/* QUESTIONS */}
              <td className="px-4 py-4 text-sm text-slate-700">
                {student.questions}
              </td>

              {/* WEAK TOPICS */}
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-1">
                  {student.weakTopics.map((topic) => (
                    <Badge key={topic} variant="neutral" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </td>

              {/* LAST ACTIVE */}
              <td className="px-4 py-4 text-sm text-slate-500">
                {student.lastActive}
              </td>

              {/* ACTION */}
              <td className="px-4 py-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 whitespace-nowrap transition-all duration-200 hover:scale-105"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </section>
  );
}
