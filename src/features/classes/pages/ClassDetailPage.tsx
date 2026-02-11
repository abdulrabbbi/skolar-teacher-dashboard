import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Plus } from 'lucide-react';

import ClassroomPulse from '../components/ClassroomPulse';
import StudentsTable from '../components/StudentsTable';
import Button from '../../../shared/components/ui/Button';

import {
  classroomPulseStats,
  students,
  type StudentFilter,
  type StudentStatus,
} from '../data/students.mock';

import { classes } from '../data/classes.mock';

const statusByFilter: Record<
  Exclude<StudentFilter, 'all' | 'accuracy'>,
  StudentStatus
> = {
  onTrack: 'On Track',
  atRisk: 'At Risk',
};

export default function ClassDetailPage() {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();

  const classItem = classes.find((c) => c.id === classId);

  const [activeFilter, setActiveFilter] = useState<StudentFilter>('all');

  const filteredStudents = useMemo(() => {
    if (activeFilter === 'onTrack' || activeFilter === 'atRisk') {
      return students.filter(
        (student) => student.status === statusByFilter[activeFilter],
      );
    }
    return students;
  }, [activeFilter]);

  if (!classItem) {
    return <div className="text-slate-500">Class not found</div>;
  }

  return (
    <div className="space-y-8">

      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary">
            <Plus className="h-4 w-4 mr-1" />
            Add Student
          </Button>

          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* CLASS HEADER */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          {classItem.title}
        </h1>
        <p className="text-sm text-slate-500">
          {classItem.subject}
        </p>
      </div>

      {/* CLASSROOM PULSE */}
      <ClassroomPulse
        stats={classroomPulseStats}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* STUDENTS TABLE */}
      <StudentsTable students={filteredStudents} />
    </div>
  );
}
