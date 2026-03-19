import { createPortal } from "react-dom";
import Badge from "../../../shared/components/ui/Badge";
import Card from "../../../shared/components/ui/Card";
import type { TaskHistoryItemData } from "../data/taskHistory.mock";

export default function TaskHistoryDetailsModal({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item: TaskHistoryItemData;
  onClose: () => void;
}) {
  if (!open) return null;

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[20000] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {item.subject} • {item.code}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="neutral">{item.status}</Badge>
              <Badge variant="neutral">{item.difficulty}</Badge>
              <Badge variant="neutral">{item.duration}</Badge>
              <Badge variant="neutral">{item.marks}</Badge>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <div className="mt-4 max-h-[70vh] space-y-4 overflow-auto pr-1">
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p>
                <span className="font-semibold text-slate-700">Created:</span>{" "}
                {item.createdAt}
              </p>
              <p>
                <span className="font-semibold text-slate-700">Students:</span>{" "}
                {item.students}
              </p>
              <p>
                <span className="font-semibold text-slate-700">Questions:</span>{" "}
                {item.questions.length}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Questions</p>

            {item.questions.length > 0 ? (
              <ol className="mt-3 space-y-3">
                {item.questions.map((q, index) => (
                  <li key={q.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        Q{index + 1}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
                          {q.type}
                        </span>
                        {typeof q.marks === "number" ? (
                          <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
                            {q.marks} marks
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                      {q.prompt}
                    </p>

                    <div className="mt-3 rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Answer Guide
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                        {q.answerGuide}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                No questions saved for this task.
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>,
    document.body,
  );
}
