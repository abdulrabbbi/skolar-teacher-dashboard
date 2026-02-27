import Card from "../../../../../shared/components/ui/Card";
import Badge from "../../../../../shared/components/ui/Badge";
import { cn } from "../../../../../shared/lib/cn";
import type { LiveQuizStudent } from "../../../data/liveQuizSession.mock";

export type StudentsNotAnsweredCardProps = {
  students: LiveQuizStudent[];
};

export default function StudentsNotAnsweredCard({
  students,
}: StudentsNotAnsweredCardProps) {
  return (
    <Card className="p-4 space-y-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-sm font-semibold text-slate-900">
        Students Not Yet Answered
      </h3>

      <div className="space-y-2">
        {students.map((student) => (
          <div
            key={student.id}
            className={cn(
              "sna-row flex items-center justify-between px-3 py-2 transition-all duration-200 hover:bg-slate-50",
              student.needsSupport && "sna-row--support hover:bg-red-50"
            )}
          >
            <span className="text-sm font-medium text-slate-900">
              {student.name}
            </span>

            {student.needsSupport ? (
              <Badge className="sna-badge" variant="warning">
                Needs support
              </Badge>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}