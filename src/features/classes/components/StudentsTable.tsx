import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  BarChart3,
  Brain,
  Clock3,
  Target,
} from "lucide-react";

import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import SearchInput from "../../../shared/components/ui/SearchInput";
import Table from "../../../shared/components/ui/Table";
import type { StudentRow, StudentStatus } from "../data/students.mock";

export type StudentsTableProps = {
  students: StudentRow[];
};

type Filter = "all" | "onTrack" | "atRisk";

function statusVariant(status: StudentStatus, accuracy: number): "success" | "warning" {
  if (status === "At Risk") return "warning";
  return accuracy >= 75 ? "success" : "warning";
}

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

function meterColor(value: number) {
  if (value >= 75) return "bg-[#00B96B]";
  if (value >= 60) return "bg-orange-500";
  return "bg-rose-500";
}

function InlineMeter({ value }: { value: number }) {
  const w = clamp(value);

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="w-9 tabular-nums text-sm font-semibold text-slate-900">
        {value}%
      </span>

      <div className="h-2 w-[72px] overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${meterColor(value)}`}
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

function BigMeter({ label, value }: { label: string; value: number }) {
  const w = clamp(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{value}%</span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${meterColor(value)}`}
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

function StatusPill({ status, accuracy }: { status: StudentStatus; accuracy: number }) {
  const isGreenOnTrack = status === "On Track" && accuracy >= 75;

  return (
    <Badge
      variant={statusVariant(status, accuracy)}
      className="
        inline-flex items-center gap-1.5 whitespace-nowrap
        rounded-full px-2.5 py-1 text-xs font-medium
      "
    >
      {isGreenOnTrack ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <AlertTriangle className="h-3.5 w-3.5" />
      )}
      <span>{status}</span>
    </Badge>
  );
}

type StudentAnalyticsPanelProps = {
  student: StudentRow | null;
  open: boolean;
  onClose: () => void;
};

function StudentAnalyticsPanel({
  student,
  open,
  onClose,
}: StudentAnalyticsPanelProps) {
  if (typeof document === "undefined" || !student) return null;

  const mastery =
    student.accuracy >= 80
      ? "Strong mastery"
      : student.accuracy >= 60
        ? "Developing"
        : "Needs intervention";

  const confidenceLabel =
    student.confidence >= 80
      ? "Very confident"
      : student.confidence >= 60
        ? "Moderately confident"
        : "Low confidence";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-slate-900/30 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-xl border-l border-slate-200 bg-white shadow-2xl"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00B96B]">
                      Student Analytics
                    </p>
                    <h3 className="mt-2 truncate text-xl font-bold text-slate-900">
                      {student.name}
                    </h3>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {student.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close panel"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatusPill status={student.status} accuracy={student.accuracy} />
                  <Badge variant="neutral" className="rounded-full px-2.5 py-1 text-xs">
                    {student.questions} questions answered
                  </Badge>
                  <Badge variant="neutral" className="rounded-full px-2.5 py-1 text-xs">
                    Last active: {student.lastActive}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00B96B1A] text-[#00B96B]">
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Accuracy</p>
                        <p className="text-xs text-slate-500">{mastery}</p>
                      </div>
                    </div>
                    <BigMeter label="Current accuracy" value={student.accuracy} />
                  </Card>

                  <Card className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                        <Brain className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Confidence</p>
                        <p className="text-xs text-slate-500">{confidenceLabel}</p>
                      </div>
                    </div>
                    <BigMeter label="Self-confidence" value={student.confidence} />
                  </Card>
                </div>

                <Card className="rounded-2xl border border-slate-200 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Weak topics</h4>
                      <p className="text-xs text-slate-500">
                        Areas where this student needs support
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {student.weakTopics.length > 0 ? (
                      student.weakTopics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="neutral"
                          className="rounded-full px-3 py-1 text-xs"
                        >
                          {topic}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No weak topics identified.</p>
                    )}
                  </div>
                </Card>

                <Card className="rounded-2xl border border-slate-200 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Class summary</h4>
                      <p className="text-xs text-slate-500">
                        Quick snapshot of this learner&apos;s class performance
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Accuracy
                      </p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {student.accuracy}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Confidence
                      </p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {student.confidence}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Questions
                      </p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {student.questions}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-slate-400" />
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Last active
                        </p>
                      </div>
                      <p className="mt-2 text-base font-bold text-slate-900">
                        {student.lastActive}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="rounded-2xl border border-slate-200 p-5">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Suggested action for teacher
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {student.status === "At Risk"
                      ? "Provide a targeted worksheet focused on weak topics, review recent mistakes in class, and monitor confidence before the next assessment."
                      : "Continue reinforcing strong areas while introducing one stretch task to deepen mastery and maintain engagement."}
                  </p>
                </Card>
              </div>

              <div className="border-t border-slate-200 px-6 py-4">
                <div className="flex justify-end">
                  <Button type="button" variant="success" onClick={onClose}>
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentRow | null>(null);

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();

    return students.filter((student) => {
      const matchesFilter =
        filter === "onTrack"
          ? student.status === "On Track"
          : filter === "atRisk"
            ? student.status === "At Risk"
            : true;

      const matchesQuery = !q
        ? true
        : student.name.toLowerCase().includes(q) ||
          student.email.toLowerCase().includes(q);

      return matchesFilter && matchesQuery;
    });
  }, [students, filter, query]);

  return (
    <>
      <section className="w-full space-y-4">
        <Card className="w-full p-0">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="shrink-0">
              <h4 className="text-[18px] font-semibold text-slate-900">Students</h4>
            </div>

            <div className="flex w-full flex-col gap-3 xl:flex-row xl:items-center xl:justify-end">
              <div className="w-full min-w-0 xl:flex-1">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8C93A8]" />
                  <SearchInput
                    placeholder="Search students..."
                    className="
                      h-[48px] w-full rounded-full border border-transparent
                      bg-[#F3F4F6] pl-14 pr-4 text-[15px] text-slate-700
                      shadow-none outline-none placeholder:text-[#8C93A8]
                      focus:border-[#D9DCE3] focus:bg-white focus:ring-0
                    "
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap">
                <Button
                  type="button"
                  size="sm"
                  variant={filter === "all" ? "primary" : "outline"}
                  onClick={() => setFilter("all")}
                  className="h-[48px] whitespace-nowrap rounded-[14px] px-5 text-[15px]"
                >
                  All Students
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={filter === "onTrack" ? "primary" : "outline"}
                  onClick={() => setFilter("onTrack")}
                  className="h-[48px] whitespace-nowrap rounded-[14px] px-5 text-[15px]"
                >
                  On Track
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={filter === "atRisk" ? "primary" : "outline"}
                  onClick={() => setFilter("atRisk")}
                  className="h-[48px] whitespace-nowrap rounded-[14px] px-5 text-[15px]"
                >
                  At Risk
                </Button>
              </div>
            </div>
          </div>

          <Table
            className="w-full table-fixed rounded-none border-0 text-sm"
            headers={[
              "Name / Email",
              "Status",
              "Accuracy",
              "Confidence",
              "Questions",
              "Weak Topics",
              "Last Active",
              "Actions",
            ]}
          >
            {filteredStudents.map((student) => {
              const topics = student.weakTopics.slice(0, 2);
              const extra = student.weakTopics.length - topics.length;

              return (
                <tr
                  key={student.id}
                  className="align-middle border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <div className="max-w-[240px]">
                      <p className="truncate text-sm text-slate-900">
                        {student.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {student.email}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    <StatusPill status={student.status} accuracy={student.accuracy} />
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    <InlineMeter value={student.accuracy} />
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-sm text-slate-700">
                    {student.confidence}%
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-sm text-slate-700">
                    {student.questions}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      {topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="neutral"
                          className="shrink-0 rounded-full px-2 py-1 text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {extra > 0 && (
                        <span className="text-xs text-slate-500">+{extra}</span>
                      )}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                    {student.lastActive}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </Table>
        </Card>
      </section>

      <StudentAnalyticsPanel
        open={!!selectedStudent}
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </>
  );
}