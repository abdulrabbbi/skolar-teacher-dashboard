import { useMemo, useState } from "react";
import {
  AlertCircle,
  Users,
  Clock,
  FileText,
  ArrowRight,
  X,
  GraduationCap,
} from "lucide-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { AlertInsightItem } from "../data/dashboard.mock";

export type AlertsInsightsProps = {
  alerts: AlertInsightItem[];
};

type StudentItem = {
  id: string;
  name: string;
  className: string;
  issue: string;
  score?: string;
};

const toneConfig = {
  alert: { Icon: AlertCircle, iconClass: "text-orange-500" },
  insight: { Icon: Users, iconClass: "text-blue-600" },
  reminder: { Icon: Clock, iconClass: "text-red-500" },
  support: { Icon: FileText, iconClass: "text-violet-600" },
} as const;

function getStudentsForAlert(alert: AlertInsightItem): StudentItem[] {
  const message = alert.message.toLowerCase();

  if (message.includes("falling behind") || message.includes("at risk")) {
    return [
      {
        id: "s1",
        name: "Ava Thompson",
        className: "Year 10 - Science",
        issue: "Falling behind in recent topic checks",
        score: "48%",
      },
      {
        id: "s2",
        name: "Ethan Walker",
        className: "Year 10 - Science",
        issue: "Low completion across weak-topic tasks",
        score: "52%",
      },
      {
        id: "s3",
        name: "Mia Johnson",
        className: "Year 10 - Science",
        issue: "Repeated mistakes in short-answer questions",
        score: "55%",
      },
    ];
  }

  if (message.includes("participation") || message.includes("engagement")) {
    return [
      {
        id: "s4",
        name: "Noah Smith",
        className: "Year 9 - English",
        issue: "Low participation in class activities",
        score: "Needs support",
      },
      {
        id: "s5",
        name: "Sophia Lee",
        className: "Year 9 - English",
        issue: "Dropped engagement this week",
        score: "Needs support",
      },
    ];
  }

  return [
    {
      id: "s6",
      name: "Liam Brown",
      className: "Year 11 - Maths",
      issue: "Needs targeted intervention",
      score: "57%",
    },
    {
      id: "s7",
      name: "Olivia Davis",
      className: "Year 11 - Maths",
      issue: "Weak performance in recent tasks",
      score: "54%",
    },
    {
      id: "s8",
      name: "James Wilson",
      className: "Year 11 - Maths",
      issue: "Low confidence in key topic areas",
      score: "50%",
    },
  ];
}

type StudentsModalProps = {
  open: boolean;
  title: string;
  students: StudentItem[];
  onClose: () => void;
};

function StudentsModal({
  open,
  title,
  students,
  onClose,
}: StudentsModalProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00B96B1A] text-[#00B96B]">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Identified Students
                  </h3>
                </div>
                <p className="text-sm text-slate-500">{title}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">
                        {student.name}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">
                        {student.className}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        {student.issue}
                      </p>
                    </div>

                    {student.score && (
                      <span className="inline-flex shrink-0 items-center rounded-full bg-[#00B96B1A] px-3 py-1 text-xs font-semibold text-[#00B96B]">
                        {student.score}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#00B96B] px-5 text-sm font-semibold text-white transition hover:bg-[#009f5c]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function AlertsInsights({ alerts }: AlertsInsightsProps) {
  const [selectedAlert, setSelectedAlert] = useState<AlertInsightItem | null>(
    null,
  );

  const modalStudents = useMemo(() => {
    if (!selectedAlert) return [];
    return getStudentsForAlert(selectedAlert);
  }, [selectedAlert]);

  return (
    <>
      <section>
        <h2 className="text-base font-semibold text-slate-900">
          Alerts & Insights
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Actionable signals from your data
        </p>

        <ul className="mt-5 space-y-4">
          {alerts.map((alert) => {
            const { Icon, iconClass } = toneConfig[alert.tone];

            return (
              <li
                key={alert.id}
                className="rounded-xl border border-slate-200 bg-white px-2 py-5"
              >
                <div className="flex items-center gap-4">
                  <Icon className={`h-6 w-6 shrink-0 ${iconClass}`} />

                  <p className="min-w-0 flex-1 text-sm font-semibold text-slate-900 sm:truncate sm:whitespace-nowrap">
                    {alert.message}
                  </p>

                  {alert.tone === "insight" && (
                    <button
                      type="button"
                      onClick={() => setSelectedAlert(alert)}
                      className="
                        hidden shrink-0 items-center gap-2
                        text-sm font-semibold text-[#00B96B]
                        hover:text-[#00B96B] md:inline-flex
                      "
                    >
                      Identify Students
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {alert.tone === "insight" && (
                  <div className="mt-3 md:hidden">
                    <button
                      type="button"
                      onClick={() => setSelectedAlert(alert)}
                      className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#00B96B] hover:text-[#00B96B]"
                    >
                      Identify Students
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <StudentsModal
        open={!!selectedAlert}
        title={selectedAlert?.message ?? ""}
        students={modalStudents}
        onClose={() => setSelectedAlert(null)}
      />
    </>
  );
}
