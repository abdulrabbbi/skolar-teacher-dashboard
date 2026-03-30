import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";

import ClassDetailHeader from "../../components/ClassDetailHeader";
import ClassDetailTabs, {
  type ClassDetailTab,
} from "../../components/ClassDetailTabs";
import ClassWorkspacePanel from "../../components/ClassWorkspacePanel";
import StudentsTable from "../../components/StudentsTable";
import { ROUTES } from "../../../../app/router/routes";
import Button from "../../../../shared/components/ui/Button";
import Card from "../../../../shared/components/ui/Card";
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

const shellCardClass =
  "rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]";

export type StandardClassDetailPageProps = {
  classItem: {
    id: string;
    title: string;
    subject: string;
  };
};

export default function StandardClassDetailPage({
  classItem,
}: StandardClassDetailPageProps) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<StudentFilter>("all");
  const [activeTab, setActiveTab] = useState<ClassDetailTab>("workspaces");

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
            (student) =>
              `<li>${escapeHtml(student.name)} - ${escapeHtml(
                student.status,
              )} (Accuracy: ${student.accuracy}%)</li>`,
          )
          .join("")}
      </ol>
    `;

    openPrintToPdfWindow({
      title: `${classItem.title} - Export`,
      subtitle:
        'Printable view - use your browser "Save as PDF" to download.',
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
    <div className="w-full min-w-0 space-y-6">
      <ClassDetailHeader
        title={classItem.title}
        subtitle={classItem.subject}
        stats={classroomPulseStats}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onBack={() => navigate(-1)}
        onAddStudent={() => navigate(ROUTES.classAddStudent(classItem.id))}
        onExportPdf={handleExportPdf}
      />

      <ClassDetailTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "workspaces" ? <ClassWorkspacePanel /> : null}

      {activeTab === "students" ? (
        <Card
          hover={false}
          className={`${shellCardClass} p-6 sm:p-8`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Students</h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-slate-500">
                Invite students into this class and manage access from the add
                student flow.
              </p>
            </div>

            <Button
              size="lg"
              variant="primary"
              className="h-12 rounded-2xl px-6"
              onClick={() => navigate(ROUTES.classAddStudent(classItem.id))}
            >
              Add Student
            </Button>
          </div>
        </Card>
      ) : null}

      {activeTab === "settings" ? (
        <Card
          hover={false}
          className={`${shellCardClass} p-6 sm:p-8`}
        >
          <h2 className="text-xl font-bold text-slate-900">Settings</h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-500">
            Class settings are not editable for this demo class yet.
          </p>
        </Card>
      ) : null}

      {activeTab === "insights" ? (
        <div className="space-y-6">
          <div className="w-full overflow-x-auto">
            <div className="w-full min-w-[900px] sm:min-w-0">
              <StudentsTable students={filteredStudents} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-2xl px-6"
              onClick={handleExportPdf}
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
