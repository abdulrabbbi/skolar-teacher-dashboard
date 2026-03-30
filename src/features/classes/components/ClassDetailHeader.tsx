import { ArrowLeft, Download, Plus } from "lucide-react";

import ClassroomPulse from "./ClassroomPulse";
import Button from "../../../shared/components/ui/Button";
import type {
  ClassroomPulseStat,
  StudentFilter,
} from "../data/students.mock";

export type ClassDetailHeaderProps = {
  title: string;
  subtitle: string;
  stats: ClassroomPulseStat[];
  activeFilter: StudentFilter;
  onFilterChange: (filter: StudentFilter) => void;
  onBack: () => void;
  onAddStudent: () => void;
  onExportPdf: () => void;
};

const shellCardClass =
  "rounded-[20px] border border-slate-200 bg-white ";

export default function ClassDetailHeader({
  title,
  subtitle,
  stats,
  activeFilter,
  onFilterChange,
  onBack,
  onAddStudent,
  onExportPdf,
}: ClassDetailHeaderProps) {
  return (
    <>
      <section className={shellCardClass}>
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-3 text-base font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              size="lg"
              variant="primary"
              className="h-8 rounded-2xl px-6 text-base font-semibold"
              onClick={onAddStudent}
            >
              <Plus className="h-5 w-5" />
              Add Student
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-8 rounded-2xl border-slate-200 px-6 text-base font-semibold text-slate-700"
              onClick={onExportPdf}
            >
              <Download className="h-5 w-5" />
              Export PDF
            </Button>
          </div>
        </div>
      </section>

      <section className={`${shellCardClass} px-5 py-6 sm:px-8 sm:py-8`}>
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h1>
          <p className="text-base text-slate-500">{subtitle}</p>
        </div>

        <div className="mt-6">
          <ClassroomPulse
            stats={stats}
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
          />
        </div>
      </section>
    </>
  );
}
