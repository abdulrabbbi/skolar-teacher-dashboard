import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AreaOfStudyList from "../components/AreaOfStudyList";
import SubjectIcon from "../components/SubjectIcon";

import { getAreasForSubject, getSubjectById } from "../utils/taskCompilerSelectors";

export default function SubjectAreasPage() {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();

  const subject = getSubjectById(subjectId);
  const areas = subject ? getAreasForSubject(subject.id) : [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Back to Subjects */}
      <button
        type="button"
        onClick={() => navigate("/teacher/task-compiler/by-subject")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Subjects
      </button>

      {subject ? (
        <>
          {/* Header row */}
          <div className="mt-5 flex items-start gap-3">
            <SubjectIcon icon={subject.icon} color={subject.color} size={44} />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-900">{subject.title}</h2>
              <p className="text-sm text-slate-500">Select an Area of Study</p>
            </div>
          </div>

          {/* List */}
          <div className="mt-5">
            <AreaOfStudyList
              areas={areas}
              onSelectArea={(a) =>
                navigate(`/teacher/task-compiler/by-subject/${subject.id}/areas/${a.id}`)
              }
            />
          </div>
        </>
      ) : (
        <div className="mt-6 text-sm text-slate-600">Subject not found.</div>
      )}
    </section>
  );
}