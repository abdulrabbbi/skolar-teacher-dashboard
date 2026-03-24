/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Settings, X } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import SelectField from "../../../shared/components/ui/SelectField";
import ToggleRow from "../../../shared/components/ui/ToggleRow";
import SelectableListCard from "../../taskCompiler/pages/areaOfStudyDetail/SelectableListCard";
import { getAreaDetailContent } from "../../taskCompiler/data/areaOfStudyDetail.mock";
import type {
  DifficultyOption,
  LiveQuizSelectOption,
  QuizSummary,
  ToggleSetting,
} from "../data/liveQuiz.mock";

export type LaunchQuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onStart?: (joinCode: string) => void;
  mode?: "new" | "relaunch";
  contextTitle?: string;
  classOptions: LiveQuizSelectOption[];
  topicOptions: LiveQuizSelectOption[];
  questionOptions: LiveQuizSelectOption[];
  timerOptions: LiveQuizSelectOption[];
  difficultyOptions: DifficultyOption[];
  reasoningToggle: ToggleSetting;
  summary: QuizSummary;
};

export default function LaunchQuizModal({
  isOpen,
  onClose,
  onStart,
  mode = "new",
  contextTitle = "",
  classOptions,
  topicOptions,
  questionOptions,
  timerOptions,
  difficultyOptions,
  reasoningToggle,
  summary,
}: LaunchQuizModalProps) {
  const [mounted, setMounted] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinCodeMessage, setJoinCodeMessage] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const normalizeJoinCode = (value: string) =>
    value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);

  const toggleId = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const generateJoinCode = (length = 6) => {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let next = "";
    for (let i = 0; i < length; i += 1) {
      next += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return next;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, mode]);

  useEffect(() => {
    if (!isOpen) return;

    const fromStorage = (() => {
      try {
        return window.localStorage.getItem("liveQuiz:lastJoinCode") ?? "";
      } catch {
        return "";
      }
    })();

    const initial = normalizeJoinCode(fromStorage) || generateJoinCode();
    setJoinCode(initial);
    setJoinCodeMessage("");

    if (mode === "new") {
      setSelectedAreaId("");
      setSelectedOutcomes([]);
      setSelectedKnowledge([]);
      setSelectedSkills([]);
    }
  }, [isOpen, mode]);

  const heading = mode === "relaunch" ? "Relaunch Quiz" : "Launch New Quiz";
  const subheading =
    mode === "relaunch"
      ? "Share a join code and relaunch this quiz"
      : "Configure your live quiz settings before launching";

  const handleOpenStudentJoinPreview = () => {
    const code = normalizeJoinCode(joinCode);
    if (code) {
      try {
        window.localStorage.setItem("liveQuiz:lastJoinCode", code);
      } catch {
        // ignore
      }
    }

    try {
      window.open("/student/live-quiz", "_blank", "noopener,noreferrer");
    } catch {
      // ignore
    }
  };

  const handleCopyJoinCode = async () => {
    try {
      await navigator.clipboard.writeText(joinCode);
      setJoinCodeMessage("Join code copied");
      return true;
    } catch {
      setJoinCodeMessage("Copy failed");
      return false;
    }
  };

  const handleStart = async () => {
    const code = joinCode.trim();
    if (!code) return;

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("liveQuiz:lastJoinCode", code);
        if (mode === "new") {
          window.localStorage.setItem(
            "liveQuiz:lastContentSelection",
            JSON.stringify({
              areaId: selectedAreaId,
              outcomes: selectedOutcomes,
              keyKnowledge: selectedKnowledge,
              keySkills: selectedSkills,
            }),
          );
        }
      }
    } catch {
      // ignore
    }

    onStart?.(code);

    const copied = await handleCopyJoinCode();
    if (copied) {
      onClose();
    }
  };

  const selectedAreaContent = useMemo(() => {
    if (!selectedAreaId) return null;
    const content = getAreaDetailContent(selectedAreaId);
    const total =
      content.outcomes.length + content.keyKnowledge.length + content.keySkills.length;
    return total > 0 ? content : null;
  }, [selectedAreaId]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4">
      {/* BACKDROP */}
      {mode === "relaunch" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#160a2f] via-[#3a1667] to-[#120726]" />
          <div className="pointer-events-none absolute -left-56 top-24 h-[520px] w-[520px] rounded-full bg-blue-500/25 blur-3xl" />
          <div className="pointer-events-none absolute right-[-220px] top-[-80px] h-[680px] w-[680px] rounded-full bg-purple-500/30 blur-3xl" />
          <div className="pointer-events-none absolute right-[-180px] bottom-[-240px] h-[680px] w-[680px] rounded-full bg-indigo-500/25 blur-3xl" />
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-md"
            onClick={onClose}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-md"
          onClick={onClose}
        />
      )}

      {/* MODAL */}
      {mode === "relaunch" ? (
        <div
          className="relative z-10 w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              StudySesh
            </h1>
            <p className="mt-3 text-base text-white/70 sm:text-lg">
              Challenge your mates. Level up together.
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
            <div className="text-center">
              <p className="text-xl font-semibold text-white">Got a code?</p>
              <p className="mt-1 text-sm text-white/60">
                Enter it below to jump into the action
              </p>
              {contextTitle ? (
                <p className="mt-2 text-xs font-semibold text-white/75">
                  Quiz: <span className="font-bold text-white">{contextTitle}</span>
                </p>
              ) : null}
            </div>

            <div className="mt-6">
              <input
                value={joinCode}
                onChange={(e) => {
                  const next = normalizeJoinCode(e.target.value);
                  setJoinCode(next);
                  setJoinCodeMessage("");
                }}
                placeholder="ABC123"
                inputMode="text"
                autoCapitalize="characters"
                className="
                  h-20 w-full rounded-2xl border border-white/20 bg-white/10
                  px-6 text-center font-mono text-4xl font-semibold tracking-[0.35em] text-white placeholder:text-white/20
                  outline-none ring-0
                  focus:border-white/35 focus:bg-white/15 focus:ring-2 focus:ring-sky-300/70
                "
                aria-label="Student join code"
              />

              <button
                type="button"
                onClick={handleStart}
                disabled={!joinCode.trim()}
                className="
                  mt-5 h-16 w-full rounded-2xl px-6 text-base font-semibold text-white
                  shadow-lg transition
                  bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                  hover:brightness-110 active:brightness-95
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                Relaunch Live Quiz
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setJoinCode(generateJoinCode());
                    setJoinCodeMessage("");
                  }}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Generate
                </button>

                <button
                  type="button"
                  onClick={handleCopyJoinCode}
                  disabled={!joinCode.trim()}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Copy
                </button>

                <button
                  type="button"
                  onClick={handleOpenStudentJoinPreview}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/10"
                >
                  Student preview
                </button>
              </div>

              {joinCodeMessage ? (
                <p className="mt-3 text-center text-xs font-medium text-white/70">
                  {joinCodeMessage}
                </p>
              ) : null}

              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full text-center text-xs font-semibold text-white/70 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Card
          className="relative z-10 w-full max-w-xl max-h-[90vh] rounded-3xl p-7 flex flex-col transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{heading}</h2>
              <p className="text-sm text-slate-500">{subheading}</p>
              {contextTitle ? (
                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Quiz: <span className="font-bold">{contextTitle}</span>
                </p>
              ) : null}
            </div>
            <button onClick={onClose} className="rounded-md p-1 hover:bg-slate-100">
              <X className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          <div className="mt-6 flex-1 overflow-y-auto pr-1 space-y-6">
            {/* FORM */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md hover:border-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Student Join Code
                </p>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    value={joinCode}
                    onChange={(e) => {
                      const next = normalizeJoinCode(e.target.value);
                      setJoinCode(next);
                      setJoinCodeMessage("");
                    }}
                    placeholder="e.g. 7K2P9Q"
                    inputMode="text"
                    autoCapitalize="characters"
                    className="
                      h-14 w-full flex-1 rounded-2xl border border-slate-200 bg-white
                      px-5 font-mono text-base font-semibold tracking-[0.28em] text-slate-900
                      outline-none focus:ring-2 focus:ring-slate-200
                    "
                    aria-label="Student join code"
                  />

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-14 rounded-2xl px-6"
                      onClick={() => {
                        setJoinCode(generateJoinCode());
                        setJoinCodeMessage("");
                      }}
                    >
                      Generate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-14 rounded-2xl px-6"
                      onClick={handleCopyJoinCode}
                      disabled={!joinCode.trim()}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Share this code with students so they can join the quiz.
                </p>
                <button
                  type="button"
                  onClick={handleOpenStudentJoinPreview}
                  className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Open student join page (preview)
                </button>
                {joinCodeMessage ? (
                  <p className="mt-2 text-xs font-medium text-slate-600">
                    {joinCodeMessage}
                  </p>
                ) : null}
              </Card>

              <SelectField label="Select Class" defaultValue="">
                {classOptions.map((o) => (
                  <option key={o.id} value={o.value} disabled={!o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label="Select Topic / AOS"
                value={selectedAreaId}
                onChange={(e) => {
                  const next = String(e.target.value ?? "");
                  setSelectedAreaId(next);
                  setSelectedOutcomes([]);
                  setSelectedKnowledge([]);
                  setSelectedSkills([]);
                }}
              >
                {topicOptions.map((o) => (
                  <option key={o.id} value={o.value} disabled={!o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectField>

              {selectedAreaId && selectedAreaContent ? (
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Select Outcomes / Knowledge / Skills
                  </p>

                  <SelectableListCard
                    title="Outcomes"
                    subtitle="Select outcomes to assess"
                    items={selectedAreaContent.outcomes}
                    selected={selectedOutcomes}
                    onToggle={(id) => setSelectedOutcomes((p) => toggleId(p, id))}
                  />

                  <SelectableListCard
                    title="Key Knowledge"
                    subtitle="Select key knowledge points"
                    items={selectedAreaContent.keyKnowledge}
                    selected={selectedKnowledge}
                    onToggle={(id) =>
                      setSelectedKnowledge((p) => toggleId(p, id))
                    }
                  />

                  <SelectableListCard
                    title="Key Skills"
                    subtitle="Select key skills to test"
                    items={selectedAreaContent.keySkills}
                    selected={selectedSkills}
                    onToggle={(id) => setSelectedSkills((p) => toggleId(p, id))}
                  />
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  label="Number of Questions"
                  defaultValue={questionOptions[0]?.value}
                >
                  {questionOptions.map((o) => (
                    <option key={o.id} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </SelectField>

                <SelectField
                  label="Timer per Question (seconds)"
                  defaultValue={timerOptions[0]?.value}
                >
                  {timerOptions.map((o) => (
                    <option key={o.id} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </SelectField>
              </div>
            </div>

            {/* DIFFICULTY */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Difficulty
              </p>
              <div className="flex flex-wrap gap-2">
                {difficultyOptions.map((option) => (
                  <Button
                    key={option.id}
                    size="sm"
                    variant={option.selected ? "success" : "outline"}
                    className="transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* TOGGLE */}
            <ToggleRow
              title={reasoningToggle.title}
              description={reasoningToggle.description}
              enabled={reasoningToggle.enabled}
            />

            {/* SUMMARY */}
            <Card className="quiz-summary-card">
              <div className="quiz-summary-icon relative">
                <Settings className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="quiz-summary-title">Quiz Summary</h3>

                <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="quiz-summary-label">Questions</p>
                    <p className="quiz-summary-value">{summary.questions}</p>
                  </div>
                  <div>
                    <p className="quiz-summary-label">Difficulty</p>
                    <p className="quiz-summary-value">{summary.difficulty}</p>
                  </div>
                  <div>
                    <p className="quiz-summary-label">Time per Q</p>
                    <p className="quiz-summary-value">{summary.timePerQuestion}</p>
                  </div>
                  <div>
                    <p className="quiz-summary-label">Total Time</p>
                    <p className="quiz-summary-value">{summary.totalTime}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={onClose}
              className="transition-all duration-200 hover:-translate-y-0.5"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              className="transition-all duration-200 hover:-translate-y-0.5"
              onClick={handleStart}
              disabled={!joinCode.trim()}
            >
              Start Live Quiz
            </Button>
          </div>
        </Card>
      )}
    </div>,
    document.body,
  );
}
