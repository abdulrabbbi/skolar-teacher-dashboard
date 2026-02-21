
/* eslint-disable no-shadow-restricted-names */

import { ChevronRight } from "lucide-react";

import Badge from "../../../shared/components/ui/Badge";
import type { SubjectCard, SubjectCardColor } from "../data/taskCompiler.mock";
import { taskCompilerCopy } from "../data/taskCompiler.mock";
import SubjectIcon from "./SubjectIcon";

const bgClasses: Record<SubjectCardColor, string> = {
  blue: "bg-blue-50 border-blue-300",
  green: "bg-emerald-50 border-emerald-300",
  purple: "bg-purple-50 border-purple-300",
  orange: "bg-orange-50 border-orange-300",
  pink: "bg-pink-50 border-pink-300",
};

export default function SubjectCards({
  subjects,
  onSelect,
}: {
  subjects: SubjectCard[];
  onSelect: (subject: SubjectCard) => void;
}) {
  return (
    <section className="space-y-2">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900">
          {taskCompilerCopy.subjectSelectionTitle}
        </h2>
        <p className="text-sm text-slate-500">
          {taskCompilerCopy.subjectSelectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(subject)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(subject);
              }
            }}
            className={`
              ${bgClasses[subject.color]}
              group
              flex items-center justify-between gap-4
              rounded-xl border p-5
              cursor-pointer
              transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
            `}
          >
            <div className="flex items-center gap-4">
              <SubjectIcon icon={subject.icon} color={subject.color} size={44} />

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {subject.title}
                </p>
                <Badge variant="neutral">
                  {taskCompilerCopy.unitsLabel}: {subject.unitsCompleted} /{" "}
                  {subject.unitsTotal}
                </Badge>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-600 transition-transform duration-200 group-hover:scale-110" />
          </div>
        ))}
      </div>
    </section>
  );
}