import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import AreaOfStudyList from "../components/AreaOfStudyList";
import SubjectIcon from "../components/SubjectIcon";
import Button from "../../../shared/components/ui/Button";

import { getAreasForSubject, getSubjectById } from "../utils/taskCompilerSelectors";

function toggleId(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export default function SubjectAreasPage() {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const [searchParams] = useSearchParams();

  const subject = getSubjectById(subjectId);
  const areas = subject ? getAreasForSubject(subject.id) : [];

  const initialSelectedAreaIds = useMemo(() => {
    const raw = searchParams.get("areas") ?? "";
    return raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }, [searchParams]);

  const initialMultiSelect = useMemo(() => {
    const multi = searchParams.get("multi");
    return Boolean(multi && multi !== "0");
  }, [searchParams]);

  const [multiSelect, setMultiSelect] = useState<boolean>(
    initialMultiSelect || initialSelectedAreaIds.length > 0,
  );
  const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>(
    initialSelectedAreaIds,
  );

  const selectedAreasCount = selectedAreaIds.length;
  const canContinue = selectedAreasCount > 0;

  const primaryAreaId = useMemo(() => selectedAreaIds[0], [selectedAreaIds]);

  const handleContinue = () => {
    if (!subject || !primaryAreaId) return;

    const params = new URLSearchParams();
    params.set("areas", selectedAreaIds.join(","));

    navigate(
      `/teacher/task-compiler/by-subject/${subject.id}/areas/${primaryAreaId}?${params.toString()}`,
    );
  };

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
              <p className="text-sm text-slate-500">
                {multiSelect ? "Select multiple Areas of Study" : "Select an Area of Study"}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={multiSelect}
                onChange={(e) => {
                  const next = e.target.checked;
                  setMultiSelect(next);
                  if (!next) setSelectedAreaIds([]);
                }}
                className="h-4 w-4 rounded border-slate-300 text-[#00B96B] accent-[#00B96B]"
              />
              Select multiple units &amp; areas
            </label>

            {multiSelect ? (
              <Button
                type="button"
                variant="success"
                className="h-10 rounded-xl px-4"
                disabled={!canContinue}
                onClick={handleContinue}
              >
                Continue ({selectedAreasCount})
              </Button>
            ) : null}
          </div>

          {/* List */}
          <div className="mt-5">
            <AreaOfStudyList
              areas={areas}
              onSelectArea={(a) => {
                if (multiSelect) return;
                navigate(`/teacher/task-compiler/by-subject/${subject.id}/areas/${a.id}`);
              }}
              multiSelect={multiSelect}
              selectedAreaIds={selectedAreaIds}
              onToggleArea={(id) => setSelectedAreaIds((p) => toggleId(p, id))}
            />
          </div>
        </>
      ) : (
        <div className="mt-6 text-sm text-slate-600">Subject not found.</div>
      )}
    </section>
  );
}
