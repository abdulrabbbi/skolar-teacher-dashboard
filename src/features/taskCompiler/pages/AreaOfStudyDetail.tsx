import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { cn } from "../../../shared/lib/cn";

import SubjectIcon from "../components/SubjectIcon";
import {
  getAreaById,
  getAreasForSubject,
  getSubjectById,
} from "../utils/taskCompilerSelectors";
import { getAreaDetailContent } from "../data/areaOfStudyDetail.mock";

import AreaPickerModal from "./areaOfStudyDetail/AreaPickerModal";
import ContentSummaryCard from "./areaOfStudyDetail/ContentSummaryCard";
import { printSelectedContentTask } from "./areaOfStudyDetail/printSelectedContentTask";
import SelectableListCard from "./areaOfStudyDetail/SelectableListCard";
import TaskSettingsCard from "./areaOfStudyDetail/TaskSettingsCard";
import type { Difficulty } from "./areaOfStudyDetail/types";
import { isNonEmptyString, toggleId } from "./areaOfStudyDetail/utils";

export default function AreaOfStudyDetail() {
  const navigate = useNavigate();
  const { subjectId, areaId } = useParams<{ subjectId: string; areaId: string }>();
  const [searchParams] = useSearchParams();

  const subject = getSubjectById(subjectId);
  const area = subject ? getAreaById(subject.id, areaId) : null;

  const areasForSubject = useMemo(() => {
    if (!subject) return [];
    return getAreasForSubject(subject.id);
  }, [subject]);

  const includedAreaIds = useMemo(() => {
    const raw = searchParams.get("areas") ?? "";
    const fromQuery = raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const ids = [...fromQuery, areaId].filter(isNonEmptyString);
    return Array.from(new Set(ids));
  }, [areaId, searchParams]);

  const includedAreas = useMemo(() => {
    if (!subject) return [];
    return includedAreaIds
      .map((id) => getAreaById(subject.id, id))
      .filter((value) => value != null);
  }, [includedAreaIds, subject]);

  const pickerAreas = useMemo(() => {
    if (!subject) return [];

    const byId = new Map<string, (typeof areasForSubject)[number]>();
    for (const item of includedAreas) byId.set(item.id, item);
    for (const item of areasForSubject) byId.set(item.id, item);
    return [...byId.values()];
  }, [areasForSubject, includedAreas, subject]);

  const [isAreaPickerOpen, setIsAreaPickerOpen] = useState(false);
  const [draftAreaIds, setDraftAreaIds] = useState<string[]>([]);

  const handleApplyAreas = () => {
    if (!subjectId || !areaId) return;

    const nextIds = Array.from(
      new Set([...draftAreaIds, areaId].filter(isNonEmptyString)),
    );
    const otherIds = nextIds.filter((id) => id !== areaId);

    const params = new URLSearchParams(searchParams);
    params.delete("multi");

    if (otherIds.length > 0) {
      params.set("areas", otherIds.join(","));
    } else {
      params.delete("areas");
    }

    const qs = params.toString();
    navigate(
      `/teacher/task-compiler/by-subject/${subjectId}/areas/${areaId}${qs ? `?${qs}` : ""}`,
      { replace: true },
    );

    setSelectedOutcomes([]);
    setSelectedKnowledge([]);
    setSelectedSkills([]);
    setIsAreaPickerOpen(false);
  };

  const areaMetaById = useMemo(() => {
    return pickerAreas.reduce<Record<string, { title: string; unit: string }>>(
      (map, item) => {
        map[item.id] = { title: item.title, unit: item.unit };
        return map;
      },
      {},
    );
  }, [pickerAreas]);

  const content = useMemo(() => {
    const many = includedAreas.length > 1;

    const combined = {
      outcomes: [] as { id: string; label: string }[],
      keyKnowledge: [] as { id: string; label: string }[],
      keySkills: [] as { id: string; label: string }[],
    };

    const prefix = (areaIdValue: string, label: string) => {
      if (!many) return label;
      const meta = areaMetaById[areaIdValue];
      if (!meta) return label;
      return `${meta.unit} • ${meta.title}: ${label}`;
    };

    for (const included of includedAreas) {
      const next = getAreaDetailContent(included.id);
      combined.outcomes.push(
        ...next.outcomes.map((item) => ({
          id: item.id,
          label: prefix(included.id, item.label),
        })),
      );
      combined.keyKnowledge.push(
        ...next.keyKnowledge.map((item) => ({
          id: item.id,
          label: prefix(included.id, item.label),
        })),
      );
      combined.keySkills.push(
        ...next.keySkills.map((item) => ({
          id: item.id,
          label: prefix(included.id, item.label),
        })),
      );
    }

    return combined;
  }, [areaMetaById, includedAreas]);

  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [duration, setDuration] = useState("45 minutes");
  const [difficulty, setDifficulty] = useState<Difficulty>("Mixed");
  const [includeMarkingGuide, setIncludeMarkingGuide] = useState(true);

  const totalSelected =
    selectedOutcomes.length + selectedKnowledge.length + selectedSkills.length;

  const canGenerate = totalSelected > 0;
  const canContinue = canGenerate;

  const handleGeneratePrintableTask = () => {
    if (!canGenerate) {
      return;
    }

    const selectedOutcomeLabels = content.outcomes
      .filter((item) => selectedOutcomes.includes(item.id))
      .map((item) => item.label);
    const selectedKnowledgeLabels = content.keyKnowledge
      .filter((item) => selectedKnowledge.includes(item.id))
      .map((item) => item.label);
    const selectedSkillLabels = content.keySkills
      .filter((item) => selectedSkills.includes(item.id))
      .map((item) => item.label);

    printSelectedContentTask({
      subjectTitle: subject?.title ?? "Task Compiler",
      areaTitle: area?.title ?? "Printable Task",
      areaUnitLabel: area?.unit ?? "Area",
      includedAreas: includedAreas.map((a) => ({ unit: a.unit, title: a.title })),
      duration,
      difficulty,
      includeMarkingGuide,
      selectedOutcomeLabels,
      selectedKnowledgeLabels,
      selectedSkillLabels,
    });
  };

  const handleContinueToQuestionTypes = () => {
    if (!canContinue || !subjectId || !areaId) return;

    const qs = searchParams.toString();
    navigate(
      `/teacher/task-compiler/by-subject/${subjectId}/areas/${areaId}/question-types${qs ? `?${qs}` : ""}`,
      {
        state: {
          includedAreaIds,
          selectedOutcomes,
          selectedKnowledge,
          selectedSkills,
          duration,
          difficulty,
          includeMarkingGuide,
        },
      },
    );
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Back to Areas */}
      <button
        type="button"
        onClick={() => navigate(`/teacher/task-compiler/by-subject/${subjectId}`)}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Areas
      </button>

      <AreaPickerModal
        open={isAreaPickerOpen}
        areas={pickerAreas}
        currentAreaId={areaId}
        draftAreaIds={draftAreaIds}
        setDraftAreaIds={setDraftAreaIds}
        onClose={() => setIsAreaPickerOpen(false)}
        onApply={handleApplyAreas}
      />

      {subject && area ? (
        <>
          {/* Header */}
          <div className="mt-5 flex items-start gap-3">
            <SubjectIcon icon={subject.icon} color={subject.color} size={44} />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-900">
                {includedAreas.length > 1 ? "Multiple Areas of Study" : area.title}
              </h2>
              <p className="text-sm text-slate-500">
                {subject.title} •{" "}
                {includedAreas.length > 1
                  ? `${includedAreas.length} areas selected`
                  : area.unit}
              </p>
              {includedAreas.length > 1 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {includedAreas.map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {item.unit}: {item.title}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Select the content you want to assess
          </p>

          <div className="mt-4 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
            {/* LEFT */}
            <div className="space-y-6">
              <SelectableListCard
                title="Outcomes"
                subtitle="Select outcomes to assess"
                items={content.outcomes}
                selected={selectedOutcomes}
                onToggle={(id) => setSelectedOutcomes((p) => toggleId(p, id))}
              />
              <SelectableListCard
                title="Key Knowledge"
                subtitle="Select key knowledge points"
                items={content.keyKnowledge}
                selected={selectedKnowledge}
                onToggle={(id) => setSelectedKnowledge((p) => toggleId(p, id))}
              />
              <SelectableListCard
                title="Key Skills"
                subtitle="Select key skills to test"
                items={content.keySkills}
                selected={selectedSkills}
                onToggle={(id) => setSelectedSkills((p) => toggleId(p, id))}
              />
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <ContentSummaryCard
                outcomes={selectedOutcomes.length}
                knowledge={selectedKnowledge.length}
                skills={selectedSkills.length}
              />

              <TaskSettingsCard
                duration={duration}
                setDuration={setDuration}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                includeMarkingGuide={includeMarkingGuide}
                setIncludeMarkingGuide={setIncludeMarkingGuide}
              />

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setDraftAreaIds(includedAreaIds);
                    setIsAreaPickerOpen(true);
                  }}
                  className="
                    mb-3 w-full rounded-xl border border-slate-200 bg-white
                    px-4 py-3 text-sm font-semibold text-slate-700
                    transition hover:bg-slate-50
                  "
                >
                  Add more AOS and Units
                </button>

                <button
                  type="button"
                  disabled={!canGenerate}
                  onClick={handleGeneratePrintableTask}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
                    canGenerate
                      ? "bg-[#00B96B] text-white hover:bg-[#009f5c]"
                      : "bg-[#00B96B]/60 text-white cursor-not-allowed",
                  )}
                >
                  Generate Printable Task
                </button>

                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={handleContinueToQuestionTypes}
                  className={cn(
                    "mt-3 w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
                    canContinue
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-600/60 text-white cursor-not-allowed",
                  )}
                >
                  Next: Choose Question Types
                </button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Select at least one item to generate content
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-6 text-sm text-slate-600">Area not found.</div>
      )}
    </section>
  );
}
