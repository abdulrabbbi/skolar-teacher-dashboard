import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Plus } from "lucide-react";

import ClassroomPulse from "../../components/ClassroomPulse";
import StudentsTable from "../../components/StudentsTable";
import Button from "../../../../shared/components/ui/Button";
import { openPrintToPdfWindow } from "../../../../shared/lib/printToPdf";

import {
  classroomPulseStats,
  students,
  type StudentFilter,
  type StudentStatus,
} from "../../data/students.mock";

const statusByFilter: Record<
  Exclude<StudentFilter, "all" | "accuracy">,
  StudentStatus
> = {
  onTrack: "On Track",
  atRisk: "At Risk",
};

export type StandardClassDetailPageProps = {
  classItem: {
    title: string;
    subject: string;
  };
};

export default function StandardClassDetailPage({
  classItem,
}: StandardClassDetailPageProps) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<StudentFilter>("all");

  const filteredStudents = useMemo(() => {
    if (activeFilter === "onTrack" || activeFilter === "atRisk") {
      return students.filter(
        (student) => student.status === statusByFilter[activeFilter],
      );
    }
    return students;
  }, [activeFilter]);

  const handleExportPdf = () => {
    const escapeHtml = (value: string) =>
      String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const studentsHtml = `
      <h2>Students</h2>
      <ol>
        ${filteredStudents
          .map(
            (s) =>
              `<li>${escapeHtml(s.name)} â€” ${escapeHtml(
                s.status,
              )} (Accuracy: ${s.accuracy}%)</li>`,
          )
          .join("")}
      </ol>
    `;

    openPrintToPdfWindow({
      title: `${classItem.title} â€” Export`,
      subtitle:
        "Printable view â€” use your browser â€œSave as PDFâ€ to download.",
      bodyHtml: `
        <div class="meta">
          <p><span class="pill">${escapeHtml(classItem.subject)}</span></p>
          <p><strong>Filter:</strong> ${escapeHtml(activeFilter)}</p>
          <p><strong>Total students:</strong> ${filteredStudents.length}</p>
        </div>
        <div class="hr"></div>
        ${studentsHtml}
      `,
    });
  };

  return (
    //  full width inside your layout (no max width, no mx-auto)
    <div className="w-full min-w-0">
      {/*  SECTION 1: TOP BAR */}
      <div className="w-full rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <Button
              size="sm"
              variant="primary"
              className="w-full justify-center transition-all duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Student
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="w-full justify-center transition-all duration-200 hover:-translate-y-0.5 sm:w-auto"
              onClick={handleExportPdf}
            >
              <Download className="mr-1 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* GAP */}
      <div className="h-4 sm:h-6" />

      {/*  SECTION 2: HEADER + 4 CARDS */}
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-slate-900">
            {classItem.title}
          </h1>
          <p className="text-sm text-slate-500">{classItem.subject}</p>
        </div>

        <div className="mt-5 w-full">
          {/* keeps cards safe on tiny screens */}
          <div className="w-full min-w-0">
            <ClassroomPulse
              stats={classroomPulseStats}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </div>
      </div>

      {/* GAP */}
      <div className="h-4 sm:h-6" />

      {/*  SECTION 3: STUDENTS TABLE */}
      <div className="w-full rounded-2xl border border-slate-200 bg-white">
        {/* table can scroll on small screens, but fills on large screens */}
        <div className="w-full overflow-x-auto">
          <div className="w-full min-w-[900px] sm:min-w-0">
            <StudentsTable students={filteredStudents} />
          </div>
        </div>
      </div>

      <div className="h-6 sm:h-8" />
    </div>
  );
}

