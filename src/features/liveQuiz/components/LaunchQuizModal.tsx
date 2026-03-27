/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Search, Settings, X } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import SelectField from "../../../shared/components/ui/SelectField";
import ToggleRow from "../../../shared/components/ui/ToggleRow";
import SelectableListCard from "../../taskCompiler/pages/areaOfStudyDetail/SelectableListCard";
import { getAreaDetailContent } from "../../taskCompiler/data/areaOfStudyDetail.mock";
import {
  generateLiveQuizJoinCode,
  normalizeLiveQuizJoinCode,
  persistLiveQuizJoinCode,
  readLiveQuizJoinCode,
} from "../lib/joinCode";
import type {
  DifficultyOption,
  LiveQuizSelectOption,
  QuizSummary,
  ToggleSetting,
} from "../data/liveQuiz.mock";

const SEARCH_TOPICS_OPTION_VALUE = "__search_topics__";

type SearchableTopic = {
  id: string;
  label: string;
  value: string;
  isCustom?: boolean;
};

const parseLeadingNumber = (value?: string | number | null) => {
  if (typeof value === "number") return value;
  if (!value) return null;

  const match = String(value).match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
};

const clampTimerSeconds = (value: number) => Math.min(600, Math.max(5, value));

const formatQuizTotalTime = (questionCount: number, timerSeconds: number) => {
  const totalSeconds = Math.max(0, questionCount * timerSeconds);

  if (totalSeconds < 60) {
    return `~${totalSeconds}s`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (!seconds) {
    return `~${minutes} min`;
  }

  return `~${minutes} min ${seconds}s`;
};

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
  const [selectedQuestionValue, setSelectedQuestionValue] = useState("");
  const [timerPerQuestionInput, setTimerPerQuestionInput] = useState("");
  const [topicSearchQuery, setTopicSearchQuery] = useState("");
  const [selectedSearchTopics, setSelectedSearchTopics] = useState<SearchableTopic[]>(
    [],
  );
  const [isTopicSearchOpen, setIsTopicSearchOpen] = useState(false);
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const normalizeJoinCode = normalizeLiveQuizJoinCode;
  const isTopicSearchMode = selectedAreaId === SEARCH_TOPICS_OPTION_VALUE;
  const fallbackTimerSeconds =
    parseLeadingNumber(timerOptions[0]?.value) ??
    parseLeadingNumber(summary.timePerQuestion) ??
    90;

  const toggleId = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const generateJoinCode = generateLiveQuizJoinCode;

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

    const initial = readLiveQuizJoinCode() || generateJoinCode();
    setJoinCode(initial);
    setJoinCodeMessage("");
    setSelectedQuestionValue(
      questionOptions[0]?.value ?? `${summary.questions} questions`,
    );
    setTimerPerQuestionInput(String(fallbackTimerSeconds));

    if (mode === "new") {
      setSelectedAreaId("");
      setTopicSearchQuery("");
      setSelectedSearchTopics([]);
      setIsTopicSearchOpen(false);
      setSelectedOutcomes([]);
      setSelectedKnowledge([]);
      setSelectedSkills([]);
    }
  }, [isOpen, mode]);

  const launchTopicOptions = useMemo(() => {
    const placeholderOptions = topicOptions.filter((option) => !option.value);
    const regularOptions = topicOptions.filter(
      (option) =>
        option.value && option.value !== SEARCH_TOPICS_OPTION_VALUE,
    );

    return [
      ...placeholderOptions,
      {
        id: "topic-search-option",
        label: "Select Topics by Search",
        value: SEARCH_TOPICS_OPTION_VALUE,
      },
      ...regularOptions,
    ];
  }, [topicOptions]);

  const searchableTopics = useMemo(() => {
    const seen = new Map<string, SearchableTopic>();

    topicOptions.forEach((option) => {
      if (!option.value || option.value === SEARCH_TOPICS_OPTION_VALUE) return;

      const key = option.label.trim().toLowerCase();
      if (!key || seen.has(key)) return;

      seen.set(key, {
        id: option.id,
        label: option.label,
        value: option.value,
      });
    });

    return Array.from(seen.values());
  }, [topicOptions]);

  const filteredSearchTopics = useMemo(() => {
    const normalizedQuery = topicSearchQuery.trim().toLowerCase();
    const selectedValues = new Set(selectedSearchTopics.map((topic) => topic.value));

    const availableTopics = searchableTopics.filter(
      (topic) => !selectedValues.has(topic.value),
    );

    if (!normalizedQuery) {
      return availableTopics.slice(0, 8);
    }

    return availableTopics.filter((topic) => {
      const label = topic.label.toLowerCase();
      const value = topic.value.toLowerCase();
      return label.includes(normalizedQuery) || value.includes(normalizedQuery);
    });
  }, [searchableTopics, selectedSearchTopics, topicSearchQuery]);

  const canCreateCustomTopic = useMemo(() => {
    const trimmedQuery = topicSearchQuery.trim();
    if (!trimmedQuery) return false;

    const normalizedQuery = trimmedQuery.toLowerCase();
    const alreadySelected = selectedSearchTopics.some(
      (topic) => topic.label.trim().toLowerCase() === normalizedQuery,
    );
    const matchesExisting = searchableTopics.some(
      (topic) => topic.label.trim().toLowerCase() === normalizedQuery,
    );

    return !alreadySelected && !matchesExisting;
  }, [searchableTopics, selectedSearchTopics, topicSearchQuery]);

  const addSearchTopic = (topic: SearchableTopic) => {
    setSelectedSearchTopics((current) => {
      if (current.some((item) => item.value === topic.value)) {
        return current;
      }

      return [...current, topic];
    });
    setTopicSearchQuery("");
    setIsTopicSearchOpen(false);
  };

  const handleCreateCustomTopic = () => {
    const trimmedQuery = topicSearchQuery.trim();
    if (!trimmedQuery) return;

    addSearchTopic({
      id: `topic-search-${trimmedQuery.toLowerCase().replace(/\s+/g, "-")}`,
      label: trimmedQuery,
      value: trimmedQuery.toLowerCase().replace(/\s+/g, "-"),
      isCustom: true,
    });
  };

  const removeSearchTopic = (value: string) => {
    setSelectedSearchTopics((current) =>
      current.filter((topic) => topic.value !== value),
    );
  };

  const selectedQuestionCount =
    parseLeadingNumber(selectedQuestionValue) ?? summary.questions;

  const parsedTimerSeconds = Number.parseInt(timerPerQuestionInput, 10);
  const resolvedTimerSeconds =
    Number.isFinite(parsedTimerSeconds) && parsedTimerSeconds > 0
      ? clampTimerSeconds(parsedTimerSeconds)
      : fallbackTimerSeconds;

  const timerPresetSeconds = Array.from(
    new Set(
      [30, 60, 90, 120, fallbackTimerSeconds].filter(
        (value) => value >= 5 && value <= 600,
      ),
    ),
  ).sort((left, right) => left - right);

  const displaySummary = {
    ...summary,
    questions: selectedQuestionCount,
    timePerQuestion: `${resolvedTimerSeconds}s`,
    totalTime: formatQuizTotalTime(
      selectedQuestionCount,
      resolvedTimerSeconds,
    ),
  };

  const heading = mode === "relaunch" ? "Relaunch Quiz" : "Launch New Quiz";
  const subheading =
    mode === "relaunch"
      ? "Share a join code and relaunch this quiz"
      : "Configure your live quiz settings before launching";

  const handleOpenStudentJoinPreview = () => {
    const code = normalizeJoinCode(joinCode);
    if (code) persistLiveQuizJoinCode(code);

    try {
      window.open("/student/live-quiz", "_blank", "noopener,noreferrer");
    } catch {
      // ignore
    }
  };

  const handleCopyJoinCode = async (value?: string) => {
    const codeToCopy = normalizeJoinCode(value ?? joinCode);
    if (!codeToCopy) return false;

    try {
      await navigator.clipboard.writeText(codeToCopy);
      setJoinCodeMessage("Join code copied");
      return true;
    } catch {
      setJoinCodeMessage("Copy failed");
      return false;
    }
  };

  const handleStart = async () => {
    const code = normalizeJoinCode(joinCode);
    if (!code) return;

    try {
      if (typeof window !== "undefined") {
        persistLiveQuizJoinCode(code);
        if (mode === "new") {
          window.localStorage.setItem(
            "liveQuiz:lastContentSelection",
            JSON.stringify({
              areaId: isTopicSearchMode ? "" : selectedAreaId,
              topicMode: isTopicSearchMode ? "search" : "aos",
              searchTopics: selectedSearchTopics.map((topic) => topic.label),
              questionCount: selectedQuestionCount,
              timerSeconds: resolvedTimerSeconds,
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

    if (onStart) {
      onStart(code);
    } else {
      try {
        window.open("/student/live-quiz", "_blank", "noopener,noreferrer");
      } catch {
        // ignore
      }
    }

    const copied = await handleCopyJoinCode(code);
    if (copied) {
      onClose();
    }
  };

  const selectedAreaContent = useMemo(() => {
    if (!selectedAreaId || isTopicSearchMode) return null;
    const content = getAreaDetailContent(selectedAreaId);
    const total =
      content.outcomes.length + content.keyKnowledge.length + content.keySkills.length;
    return total > 0 ? content : null;
  }, [isTopicSearchMode, selectedAreaId]);

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
                  onClick={() => void handleCopyJoinCode()}
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
                      onClick={() => void handleCopyJoinCode()}
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
                  setTopicSearchQuery("");
                  setIsTopicSearchOpen(false);
                  if (next !== SEARCH_TOPICS_OPTION_VALUE) {
                    setSelectedSearchTopics([]);
                  }
                  setSelectedOutcomes([]);
                  setSelectedKnowledge([]);
                  setSelectedSkills([]);
                }}
              >
                {launchTopicOptions.map((o) => (
                  <option key={o.id} value={o.value} disabled={!o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectField>

              {isTopicSearchMode ? (
                <Card className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 shadow-sm hover:border-indigo-100">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Search Topics
                    </p>
                    <p className="text-sm text-slate-500">
                      Search existing topics or add your own. You can include as many
                      topics as you like for one quiz.
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                      {selectedSearchTopics.map((topic) => (
                        <span
                          key={topic.value}
                          className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                        >
                          {topic.label}
                          <button
                            type="button"
                            className="rounded-full text-indigo-500 transition hover:text-indigo-700"
                            onClick={() => removeSearchTopic(topic.value)}
                            aria-label={`Remove ${topic.label}`}
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      ))}

                      <div className="relative min-w-[220px] flex-1">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          value={topicSearchQuery}
                          onChange={(e) => {
                            setTopicSearchQuery(e.target.value);
                            setIsTopicSearchOpen(true);
                          }}
                          onFocus={() => setIsTopicSearchOpen(true)}
                          onBlur={() => {
                            window.setTimeout(() => setIsTopicSearchOpen(false), 120);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (canCreateCustomTopic) {
                                handleCreateCustomTopic();
                              } else if (filteredSearchTopics[0]) {
                                addSearchTopic(filteredSearchTopics[0]);
                              }
                            }

                            if (
                              e.key === "Backspace" &&
                              !topicSearchQuery &&
                              selectedSearchTopics.length
                            ) {
                              removeSearchTopic(
                                selectedSearchTopics[selectedSearchTopics.length - 1]
                                  .value,
                              );
                            }
                          }}
                          placeholder="Search or type a topic"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-200 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>
                  </div>

                  {isTopicSearchOpen || topicSearchQuery ? (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      {canCreateCustomTopic ? (
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 text-left text-sm transition hover:bg-indigo-50"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleCreateCustomTopic}
                        >
                          <span className="font-medium text-slate-900">
                            Add "{topicSearchQuery.trim()}"
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                            Custom
                          </span>
                        </button>
                      ) : null}

                      <div className="max-h-56 overflow-auto py-1">
                        {filteredSearchTopics.map((topic) => (
                          <button
                            key={topic.value}
                            type="button"
                            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition hover:bg-slate-50"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => addSearchTopic(topic)}
                          >
                            <span className="text-slate-900">{topic.label}</span>
                            <span className="text-xs font-semibold text-slate-400">
                              Add
                            </span>
                          </button>
                        ))}

                        {!filteredSearchTopics.length && !canCreateCustomTopic ? (
                          <div className="px-4 py-3 text-sm text-slate-500">
                            No matching topics found. Try another search term.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  <p className="mt-3 text-xs text-slate-500">
                    {selectedSearchTopics.length
                      ? `${selectedSearchTopics.length} topic${
                          selectedSearchTopics.length === 1 ? "" : "s"
                        } selected`
                      : "Start typing to search and add topics to this quiz."}
                  </p>
                </Card>
              ) : null}

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
                  value={selectedQuestionValue}
                  onChange={(e) =>
                    setSelectedQuestionValue(String(e.target.value ?? ""))
                  }
                >
                  {questionOptions.map((o) => (
                    <option key={o.id} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </SelectField>

                <label className="block space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Timer per Question (seconds)
                  </span>

                  <input
                    type="number"
                    min={5}
                    max={600}
                    step={5}
                    value={timerPerQuestionInput}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setTimerPerQuestionInput(digitsOnly.slice(0, 3));
                    }}
                    onBlur={() =>
                      setTimerPerQuestionInput(String(resolvedTimerSeconds))
                    }
                    placeholder="Enter seconds"
                    className="
                      h-10 w-full rounded-md bg-gray-100 px-3 text-sm text-slate-900
                      outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200
                    "
                  />

                  <div className="flex flex-wrap gap-2 pt-2">
                    {timerPresetSeconds.map((seconds) => (
                      <Button
                        key={seconds}
                        type="button"
                        size="sm"
                        variant={
                          resolvedTimerSeconds === seconds ? "success" : "outline"
                        }
                        className="rounded-full px-3"
                        onClick={() => setTimerPerQuestionInput(String(seconds))}
                      >
                        {seconds}s
                      </Button>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500">
                    Teachers can set any timer between 5 and 600 seconds.
                  </p>
                </label>
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
                    <p className="quiz-summary-value">{displaySummary.questions}</p>
                  </div>
                  <div>
                    <p className="quiz-summary-label">Difficulty</p>
                    <p className="quiz-summary-value">{displaySummary.difficulty}</p>
                  </div>
                  <div>
                    <p className="quiz-summary-label">Time per Q</p>
                    <p className="quiz-summary-value">
                      {displaySummary.timePerQuestion}
                    </p>
                  </div>
                  <div>
                    <p className="quiz-summary-label">Total Time</p>
                    <p className="quiz-summary-value">{displaySummary.totalTime}</p>
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
