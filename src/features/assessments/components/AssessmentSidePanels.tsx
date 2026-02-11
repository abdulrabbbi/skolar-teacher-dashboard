import Badge from '../../../shared/components/ui/Badge';
import Card from '../../../shared/components/ui/Card';
import type {
  ActivityItem,
  AssessmentTypeItem,
  DeadlineItem,
} from '../data/assessments.mock';

export type AssessmentSidePanelsProps = {
  deadlines: DeadlineItem[];
  activity: ActivityItem[];
  types: AssessmentTypeItem[];
};

export default function AssessmentSidePanels({
  deadlines,
  activity,
  types,
}: AssessmentSidePanelsProps) {
  return (
    <div
      className="
        grid grid-cols-1 gap-4
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {/* =====================
          THIS WEEK'S DEADLINES
      ===================== */}
      <Card className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          This Week&apos;s Deadlines
        </h3>

        <div className="space-y-2">
          {deadlines.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-700">{item.title}</span>
              <span className="text-slate-500">{item.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* =====================
          RECENT ACTIVITY
      ===================== */}
      <Card className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Recent Activity
        </h3>

        <div className="space-y-2">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 text-sm"
            >
              <span className="font-semibold text-slate-900">
                {item.value}
              </span>
              <span className="text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* =====================
          ASSESSMENT TYPES
      ===================== */}
      <Card className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Assessment Types
        </h3>

        <div className="space-y-2">
          {types.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-700">{item.label}</span>
              <Badge variant="neutral">{item.value}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
