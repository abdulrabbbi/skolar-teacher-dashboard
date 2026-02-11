import Card from '../../../../../shared/components/ui/Card';
import Badge from '../../../../../shared/components/ui/Badge';
import type { LiveQuizStudent } from '../../../data/liveQuizSession.mock';

export type StudentsNotAnsweredCardProps = {
  students: LiveQuizStudent[];
};

export default function StudentsNotAnsweredCard({
  students,
}: StudentsNotAnsweredCardProps) {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="text-sm font-semibold text-slate-900">
        Students Not Yet Answered
      </h3>

      <div className="space-y-2">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
          >
            <span className="text-sm text-slate-700">{student.name}</span>
            {student.needsSupport ? (
              <Badge variant="warning">Needs support</Badge>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
