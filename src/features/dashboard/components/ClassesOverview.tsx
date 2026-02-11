import { ChevronRight, Users } from "lucide-react";
import Badge from "../../../shared/components/ui/Badge";
import Card from "../../../shared/components/ui/Card";
import type { ClassOverviewItem } from "../data/dashboard.mock";

export type ClassesOverviewProps = {
  classes: ClassOverviewItem[];
};

export default function ClassesOverview({ classes }: ClassesOverviewProps) {
  return (
    <section className="space-y-2">
      {/* SMALL HEADING */}
      <h2 className="text-base font-semibold text-slate-900">
        Classes Overview
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {classes.map((item) => (
          <Card
            key={item.id}
            className="
              group cursor-pointer space-y-4 p-5
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:shadow-xl
              hover:shadow-lg
            "
          >
            {/* TOP ROW */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-base font-semibold text-slate-900 transition-colors duration-200 group-hover:text-slate-700">
                  {item.name}
                </p>

                {/* STUDENTS ROW */}
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Users className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:text-slate-700" />
                  <span>{item.total} students</span>
                </div>
              </div>

              {/* RIGHT ARROW */}
              <ChevronRight
                className="
                  h-4 w-4 text-slate-400
                  transition-all duration-200
                  group-hover:scale-110
                  group-hover:translate-x-1
                  group-hover:text-slate-600
                "
              />
            </div>

            {/* BADGES */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                {item.onTrack} on track
              </Badge>
              <Badge variant="danger">
                {item.atRisk} at risk
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
