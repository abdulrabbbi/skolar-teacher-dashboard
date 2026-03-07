import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "../../../shared/lib/cn";

import SubjectIcon from "../components/SubjectIcon";
import { getAreaById, getSubjectById } from "../utils/taskCompilerSelectors";
import { getAreaDetailContent } from "../data/areaOfStudyDetail.mock";

type Difficulty = "Easy" | "Medium" | "Hard" | "Mixed";

function toggleId(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function CountPill({ value }: { value: number }) {
  return (
    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#00B96B1A] px-2 text-xs font-semibold text-[#00B96B]">
      {value}
    </span>
  );
}

function SelectableListCard({
  title,
  subtitle,
  items,
  selected,
  onToggle,
}: {
  title: string;
  subtitle: string;
  items: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((it) => {
          const checked = selected.includes(it.id);
          return (
            <label key={it.id} className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(it.id)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#00B96B] accent-[#00B96B]"
              />
              <span className="text-sm text-slate-700">{it.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ContentSummaryCard({
  outcomes,
  knowledge,
  skills,
}: {
  outcomes: number;
  knowledge: number;
  skills: number;
}) {
  return (
    <div className="rounded-2xl border border-[#00B96B] bg-[#00B96B1A] p-5">
      <p className="text-sm font-semibold text-slate-900">Content Summary</p>

      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Outcomes selected:</span>
          <CountPill value={outcomes} />
        </div>
        <div className="flex items-center justify-between">
          <span>Key knowledge selected:</span>
          <CountPill value={knowledge} />
        </div>
        <div className="flex items-center justify-between">
          <span>Key skills selected:</span>
          <CountPill value={skills} />
        </div>
      </div>
    </div>
  );
}

function TaskSettingsCard({
  duration,
  setDuration,
  difficulty,
  setDifficulty,
  includeMarkingGuide,
  setIncludeMarkingGuide,
}: {
  duration: string;
  setDuration: (v: string) => void;
  difficulty: Difficulty;
  setDifficulty: (v: Difficulty) => void;
  includeMarkingGuide: boolean;
  setIncludeMarkingGuide: (v: boolean) => void;
}) {
  const difficulties: Difficulty[] = ["Easy", "Medium", "Hard", "Mixed"];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">Task Settings</p>
        <p className="text-sm text-slate-500">Configure your task parameters</p>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Target Duration
          </p>
          <div className="mt-2">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm text-black"
            >
              <option value="15 minutes">15 minutes</option>
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="60 minutes">60 minutes</option>
              <option value="90 minutes">90 minutes</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Difficulty Level
          </p>

          <div className="mt-2 grid grid-cols-2 gap-2">
            {difficulties.map((d) => {
              const active = difficulty === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm font-medium transition",
                    active
                      ? "border-[#00B96B] bg-[#00B96B] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={includeMarkingGuide}
            onChange={(e) => setIncludeMarkingGuide(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#00B96B] accent-[#00B96B]"
          />
          <div>
            <p className="text-sm font-medium text-slate-900">Include Marking Guide</p>
            <p className="text-xs text-slate-500">Generate detailed marking criteria</p>
          </div>
        </label>
      </div>
    </div>
  );
}

export default function AreaOfStudyDetail() {
  const navigate = useNavigate();
  const { subjectId, areaId } = useParams<{ subjectId: string; areaId: string }>();

  const subject = getSubjectById(subjectId);
  const area = subject ? getAreaById(subject.id, areaId) : null;

  const content = useMemo(() => getAreaDetailContent(area?.id), [area?.id]);

  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [duration, setDuration] = useState("45 minutes");
  const [difficulty, setDifficulty] = useState<Difficulty>("Mixed");
  const [includeMarkingGuide, setIncludeMarkingGuide] = useState(true);

  const totalSelected =
    selectedOutcomes.length + selectedKnowledge.length + selectedSkills.length;

  const canGenerate = totalSelected > 0;

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

    const toListItems = (items: string[]) =>
      items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) {
      return;
    }

    const printableMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(area?.title ?? "Printable Task")}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 32px; color: #0f172a; }
      h1 { margin: 0 0 8px; font-size: 24px; }
      h2 { margin: 24px 0 10px; font-size: 18px; }
      p { margin: 0 0 8px; color: #334155; }
      ul { margin: 0; padding-left: 20px; }
      li { margin: 6px 0; line-height: 1.4; }
      .meta { margin-top: 12px; display: grid; gap: 6px; }
      .guide { margin-top: 24px; border-top: 1px solid #cbd5e1; padding-top: 16px; }
      .line { border-bottom: 1px solid #cbd5e1; height: 28px; margin: 8px 0; }
      @media print { body { margin: 14mm; } }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(area?.title ?? "Generated Task")}</h1>
    <p>${escapeHtml(subject?.title ?? "Task Compiler")} | ${escapeHtml(
      area?.unit ?? "Area",
    )}</p>

    <div class="meta">
      <p><strong>Target Duration:</strong> ${escapeHtml(duration)}</p>
      <p><strong>Difficulty:</strong> ${escapeHtml(difficulty)}</p>
      <p><strong>Include Marking Guide:</strong> ${
        includeMarkingGuide ? "Yes" : "No"
      }</p>
    </div>

    ${
      selectedOutcomeLabels.length > 0
        ? `<h2>Outcomes</h2><ul>${toListItems(selectedOutcomeLabels)}</ul>`
        : ""
    }
    ${
      selectedKnowledgeLabels.length > 0
        ? `<h2>Key Knowledge</h2><ul>${toListItems(selectedKnowledgeLabels)}</ul>`
        : ""
    }
    ${
      selectedSkillLabels.length > 0
        ? `<h2>Key Skills</h2><ul>${toListItems(selectedSkillLabels)}</ul>`
        : ""
    }

    ${
      includeMarkingGuide
        ? `<div class="guide">
            <h2>Marking Guide</h2>
            <p>Use the lines below for criteria and scoring notes.</p>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>`
        : ""
    }
  </body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(printableMarkup);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
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

      {subject && area ? (
        <>
          {/* Header */}
          <div className="mt-5 flex items-start gap-3">
            <SubjectIcon icon={subject.icon} color={subject.color} size={44} />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-900">
                {area.title}
              </h2>
              <p className="text-sm text-slate-500">
                {subject.title} • {area.unit}
              </p>
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
