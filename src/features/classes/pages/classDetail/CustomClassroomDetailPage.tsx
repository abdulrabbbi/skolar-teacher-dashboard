import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  Download,
  Info,
  LayoutGrid,
  Plus,
  Search,
  Settings,
  Share2,
  ShieldAlert,
  Upload,
  Users,
} from "lucide-react";

import ClassroomPulse from "../../components/ClassroomPulse";
import StudentsTable from "../../components/StudentsTable";
import Button from "../../../../shared/components/ui/Button";
import Card from "../../../../shared/components/ui/Card";
import CreateClassroomModal, {
  type CreateClassroomPayload,
} from "../../components/CreateClassroomModal";
import ManageStudentsModal from "../../components/ManageStudentsModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { openPrintToPdfWindow } from "../../../../shared/lib/printToPdf";

import {
  classroomPulseStats,
  students,
  type StudentFilter,
  type StudentStatus,
} from "../../data/students.mock";

import type {
  CreateClassroomInput,
  CustomClassroom,
} from "../../data/teacherClasses.storage";

const statusByFilter: Record<
  Exclude<StudentFilter, "all" | "accuracy">,
  StudentStatus
> = {
  onTrack: "On Track",
  atRisk: "At Risk",
};

export type CustomClassroomDetailPageProps = {
  classroom: CustomClassroom;
  onUpdateClassroom: (id: string, input: CreateClassroomInput) => void;
  onDeleteClassroom: (id: string) => void;
  onAddStudent: (classroomId: string, email: string) => void;
  onRemoveStudent: (classroomId: string, studentId: string) => void;
};

export default function CustomClassroomDetailPage({
  classroom,
  onUpdateClassroom,
  onDeleteClassroom,
  onAddStudent,
  onRemoveStudent,
}: CustomClassroomDetailPageProps) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<
    | "workspaces"
    | "students"
    | "settings"
    | "standards"
    | "insights"
    | "safety"
  >("workspaces");

  const [manageOpen, setManageOpen] = useState(false);
  const [manageKey, setManageKey] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [studentQuery, setStudentQuery] = useState("");

  const [activeFilter, setActiveFilter] = useState<StudentFilter>("all");

  const filteredStudents = useMemo(() => {
    if (activeFilter === "onTrack" || activeFilter === "atRisk") {
      return students.filter(
        (student) => student.status === statusByFilter[activeFilter],
      );
    }
    return students;
  }, [activeFilter]);

  const classroomId = classroom.id;
  const roster = classroom.roster;

  const inviteCode = useMemo(() => {
    const cleaned = classroomId.replace(/[^a-z0-9]/gi, "");
    const base = cleaned.slice(0, 7) || "CLASSRM";
    return base.toUpperCase();
  }, [classroomId]);

  const inviteLink = useMemo(() => {
    return `https://www.studyfetch.com/classrooms/${inviteCode.toLowerCase()}`;
  }, [inviteCode]);

  const filteredRoster = useMemo(() => {
    const q = studentQuery.trim().toLowerCase();
    if (!q) return roster;
    return roster.filter(
      (s) =>
        s.email.toLowerCase().includes(q) || s.name.toLowerCase().includes(q),
    );
  }, [roster, studentQuery]);

  const pageTitle = classroom.title;
  const pageSubtitle = classroom.description?.trim() || "No description";

  const avatarLabel = useMemo(() => {
    const parts = pageTitle
      .trim()
      .split(/\s+/g)
      .filter(Boolean)
      .slice(0, 2);
    const initials = parts.map((p) => p[0]?.toUpperCase()).join("");
    return initials || "C";
  }, [pageTitle]);

  const BlueButtonClass =
    "!bg-[#2563EB] !text-white hover:!bg-[#1D4ED8] focus-visible:!ring-[#2563EB]";

  const activeTabClass = "text-[#2563EB] border-b-2 border-[#2563EB]";
  const inactiveTabClass =
    "text-slate-500 hover:text-slate-900 border-b-2 border-transparent";

  const openAddStudent = () => {
    setManageKey((k) => k + 1);
    setManageOpen(true);
  };

  const onEditSave = (payload: CreateClassroomPayload) => {
    onUpdateClassroom(classroomId, payload);
  };

  const onDelete = () => {
    onDeleteClassroom(classroomId);
    navigate("/teacher/classes");
  };

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
      title: `${pageTitle} â€” Export`,
      subtitle:
        "Printable view â€” use your browser â€œSave as PDFâ€ to download.",
      bodyHtml: `
        <div class="meta">
          <p><span class="pill">${escapeHtml("Classroom")}</span></p>
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
      {/* Reference-style topbar (page-level) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="truncate text-2xl font-bold text-slate-900">{pageTitle}</p>
          <p className="text-sm text-slate-500">Classroom</p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            size="sm"
            variant="success"
            className="h-10 rounded-xl px-4 text-sm"
          >
            <Upload className="h-4 w-4" />
            Upgrade
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-10 rounded-xl px-4 text-sm"
          >
            <Info className="h-4 w-4" />
            Feedback
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label="Bookmark"
          >
            <Bookmark className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#00B96B] text-sm font-bold text-white"
            aria-label="Account"
          >
            {avatarLabel}
          </button>
        </div>
      </div>

      {/* Top: back + title */}
      <div className="space-y-4">
        <Link
          to="/teacher/classes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          View all classrooms
        </Link>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {pageTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{pageSubtitle}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex flex-wrap gap-6 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setTab("workspaces")}
              className={`pb-3 ${tab === "workspaces" ? activeTabClass : inactiveTabClass}`}
            >
              Workspaces
            </button>
            <button
              type="button"
              onClick={() => setTab("students")}
              className={`pb-3 ${tab === "students" ? activeTabClass : inactiveTabClass}`}
            >
              Students
            </button>
            <button
              type="button"
              onClick={() => setTab("settings")}
              className={`pb-3 ${tab === "settings" ? activeTabClass : inactiveTabClass}`}
            >
              Settings
            </button>
            <button
              type="button"
              onClick={() => setTab("standards")}
              className={`pb-3 ${tab === "standards" ? activeTabClass : inactiveTabClass}`}
            >
              Instructional Context &amp; Standards
            </button>
            <button
              type="button"
              onClick={() => setTab("insights")}
              className={`pb-3 ${tab === "insights" ? activeTabClass : inactiveTabClass}`}
            >
              Insights
            </button>
            <button
              type="button"
              onClick={() => setTab("safety")}
              className={`pb-3 ${tab === "safety" ? activeTabClass : inactiveTabClass}`}
            >
              Safety Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {tab === "workspaces" ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-7 sm:p-10 border border-slate-200 bg-white">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-50">
                  <LayoutGrid className="h-10 w-10 text-[#2563EB]" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Plus className="h-5 w-5" />
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                Create Your First Student Workspace
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-500">
                Workspaces are curated learning environments where you can
                organize study materials and share them with your students.
                Create modules, add study tools, and give your class instant
                access to all the resources they need.
              </p>

              <Button
                size="lg"
                variant="primary"
                className={`mt-7 h-12 rounded-xl px-7 ${BlueButtonClass}`}
              >
                <Plus className="h-4 w-4" />
                Create Your First Workspace
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5 border border-slate-200 bg-white">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  <LayoutGrid className="h-5 w-5 text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    Organize Content
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Create modules and organize study materials in one central
                    location
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border border-slate-200 bg-white">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    Easy Sharing
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Students can instantly access and clone materials you’ve
                    prepared
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border border-slate-200 bg-white">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Settings className="h-5 w-5 text-slate-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    All Study Tools
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Add flashcards, quizzes, tests, and more to enhance learning
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : null}

      {tab === "students" ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                value={studentQuery}
                onChange={(e) => setStudentQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="h-9 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <Button
              size="lg"
              variant="primary"
              className={`h-12 rounded-2xl px-7 ${BlueButtonClass}`}
              onClick={openAddStudent}
            >
              Manage Students
            </Button>
          </div>

          <Card className="border border-slate-200 bg-white p-0">
            {roster.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Users className="h-8 w-8" />
                </div>
                <p className="mt-5 text-base font-semibold text-slate-900">
                  No students found in this class
                </p>
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Start by inviting students to your classroom to begin
                  collaborating and tracking their progress.
                </p>

                <Button
                  size="lg"
                  variant="primary"
                  className={`mt-6 h-12 rounded-xl px-7 ${BlueButtonClass}`}
                  onClick={openAddStudent}
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Student
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 text-left font-semibold text-slate-700">
                        Student
                      </th>
                      <th className="px-5 py-3 text-left font-semibold text-slate-700">
                        Email
                      </th>
                      <th className="px-5 py-3 text-right font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRoster.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="px-5 py-4 font-semibold text-slate-900">
                          {s.name}
                        </td>
                        <td className="px-5 py-4 text-slate-600">{s.email}</td>
                        <td className="px-5 py-4 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => onRemoveStudent(classroomId, s.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      ) : null}

      {tab === "settings" ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Classroom Settings
            </h2>
          </div>

          <Card className="border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                  {classroom.imageUrl ? (
                    <img
                      src={classroom.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-500">
                      <LayoutGrid className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">{pageTitle}</p>
                  <p className="text-sm text-slate-500">{pageSubtitle}</p>
                </div>
              </div>

              <Button
                size="lg"
                variant="primary"
                className={`h-12 rounded-xl px-7 ${BlueButtonClass}`}
                onClick={() => setEditOpen(true)}
              >
                Edit
              </Button>
            </div>
          </Card>

          <Card className="border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-slate-900">Students</h3>
            <p className="mt-1 text-sm text-slate-500">
              Add, remove, and invite students to this classroom.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-700">
                {roster.length} student{roster.length === 1 ? "" : "s"}
              </p>
              <Button
                size="lg"
                variant="primary"
                className={`h-12 rounded-xl px-7 ${BlueButtonClass}`}
                onClick={openAddStudent}
              >
                Manage Students
              </Button>
            </div>

            {roster.length > 0 ? (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-[640px] w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Email
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roster.slice(0, 6).map((s) => (
                      <tr key={s.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {s.name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{s.email}</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => onRemoveStudent(classroomId, s.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </Card>

          <Card className="border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-slate-900">
              Feature Settings
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Change accessibility to specific features for your class.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-[760px] w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      Features
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">
                      Enabled
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">
                      Enabled, creation disabled
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">
                      Fully Disabled
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {["Live Lecture", "Flashcards", "Quizzes", "Assignments"].map(
                    (feature) => (
                      <tr key={feature} className="border-t border-slate-100">
                        <td className="px-4 py-4 font-semibold text-slate-900">
                          {feature}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#2563EB]">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300" />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300" />
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="border border-rose-200 bg-rose-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-rose-900">Danger Zone</h3>
                <p className="mt-1 text-sm text-rose-800/80">
                  Deleting a classroom removes it from your account. This can’t
                  be undone.
                </p>
              </div>

              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-rose-300 bg-white px-7 text-rose-700 hover:bg-rose-50"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                Delete classroom
              </Button>
            </div>
          </Card>
        </div>
      ) : null}

      {tab === "standards" ? (
        <Card className="border border-slate-200 bg-white p-10 text-center">
          <h3 className="text-lg font-bold text-slate-900">
            Instructional Context &amp; Standards
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Coming soon for this classroom.
          </p>
        </Card>
      ) : null}

      {tab === "insights" ? (
        <div className="space-y-6">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">Insights</h2>
              <p className="text-sm text-slate-500">
                Student analytics and progress overview.
              </p>
            </div>

            <div className="mt-5 w-full">
              <ClassroomPulse
                stats={classroomPulseStats}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>
          </div>

          <div className="w-full rounded-2xl border border-slate-200 bg-white">
            <div className="w-full overflow-x-auto">
              <div className="w-full min-w-[900px] sm:min-w-0">
                <StudentsTable students={filteredStudents} />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              className="transition-all duration-200 hover:-translate-y-0.5"
              onClick={handleExportPdf}
            >
              <Download className="mr-1 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      ) : null}

      {tab === "safety" ? (
        <Card className="border border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Safety Alerts
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            No alerts for this classroom.
          </p>
        </Card>
      ) : null}

      <ManageStudentsModal
        key={manageKey}
        open={manageOpen}
        onClose={() => setManageOpen(false)}
        inviteLink={inviteLink}
        inviteCode={inviteCode}
        onAddDirect={(email) => onAddStudent(classroomId, email)}
        defaultTab={roster.length === 0 ? "direct" : "invite"}
      />

      <CreateClassroomModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onCreate={onEditSave}
        primaryLabel="Save Changes"
        heading="Edit Classroom"
        initialValues={{
          title: classroom.title,
          description: classroom.description,
          imageUrl: classroom.imageUrl,
        }}
      />

      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        title="Delete classroom?"
        description="This action can’t be undone."
        confirmLabel="Delete"
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={onDelete}
      />
    </div>
  );
}

