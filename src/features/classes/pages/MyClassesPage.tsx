
import { useMemo, useState } from "react";
import { BarChart3, Folder, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

import PageHeader from "../../../shared/components/ui/PageHeader";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import ClassCard from "../components/ClassCard";
import CreateClassroomModal, {
  type CreateClassroomPayload,
} from "../components/CreateClassroomModal";
import { useTeacherClassrooms } from "../data/teacherClasses.storage";

export default function MyClassesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { classrooms, createClassroom } = useTeacherClassrooms();

  const primaryLabel = useMemo(
    () =>
      classrooms.length === 0 ? "Create Your First Classroom" : "Create Classroom",
    [classrooms.length],
  );

  const handleCreate = (payload: CreateClassroomPayload) => {
    createClassroom(payload);
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD (SAME STYLE AS ANALYTICS) */}
      <Card className="  p-4 sm:p-5
          transition-all duration-300 ease-in-out
          hover:shadow-lg">
        <PageHeader
          title="Classrooms"
          subtitle="Create and manage your classrooms"
          actions={
            <Button
              size="lg"
              variant="primary"
              className="h-11 rounded-xl px-5 text-sm"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="h-4 w-4" />
              {primaryLabel}
            </Button>
          }
        />
      </Card>

      {/* CREATE + BENEFITS (matches requested design) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6 sm:p-7 border border-slate-200 bg-white">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Folder className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-bold text-slate-900">
                {classrooms.length === 0
                  ? "Create Your First Classroom"
                  : "Create a Classroom"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A classroom is where you manage students, track progress, and
                organize learning activities in one place.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button
              size="lg"
              variant="primary"
              className="h-12 rounded-2xl px-6 text-sm"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="h-4 w-4" />
              {primaryLabel}
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5 border border-slate-200 bg-white">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <Users className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  Manage Students
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Organize and track your students in a centralized location
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-slate-200 bg-white">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <BarChart3 className="h-5 w-5 text-[#00B96B]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  Analytics & Insights
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Get detailed progress tracking and learning analytics
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border border-slate-200 bg-white">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                <Folder className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  Curated Spaces
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Create organized study spaces with flashcards and quizzes
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* CLASSES GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {classrooms.map((classItem) => (
          <Link
            key={classItem.id}
            to={`/teacher/classes/${classItem.id}`}
            className="block"
          >
            <ClassCard classItem={classItem} />
          </Link>
        ))}
      </div>

      <CreateClassroomModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        primaryLabel="Create Classroom"
      />
    </div>
  );
}
