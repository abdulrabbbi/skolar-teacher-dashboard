import { FileText, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import { cn } from "../../../shared/lib/cn";

import { subjectColorStyles } from "../data/contentLibrary.mock";
import {
  getContentResourceDetail,
  type ContentResourceMedia,
} from "../data/contentResourceDetail.mock";
import type { ContentResource } from "../types/contentLibrary.types";
import { formatResourceDate } from "../utils/contentLibrary.utils";

export type ResourcePreviewModalProps = {
  resource: ContentResource;
  onClose: () => void;
  onDownloadPdf?: (resource: ContentResource) => void;
};

export default function ResourcePreviewModal({
  resource,
  onClose,
  onDownloadPdf,
}: ResourcePreviewModalProps) {
  const tone = subjectColorStyles[resource.subjectId];
  const detail = getContentResourceDetail(resource);
  const [activeMedia, setActiveMedia] = useState<ContentResourceMedia | null>(
    null,
  );
  const [showAnswerGuide, setShowAnswerGuide] = useState(false);

  const questionsWithCorrect = useMemo(() => {
    return detail.questions.map((q) => {
      if (q.type !== "multipleChoice" || !q.options?.length) return q;
      const correctIndex = q.correctOptionIndex;
      if (typeof correctIndex !== "number") return q;
      if (correctIndex < 0 || correctIndex >= q.options.length) return q;
      return q;
    });
  }, [detail.questions]);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-lg"
      onClick={onClose}
    >
      <Card
        hover={false}
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border-slate-200 p-5 sm:p-6 max-h-[calc(100vh-4rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <h3 className="truncate text-lg font-semibold text-slate-900">
              {resource.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                  tone.legendSurface,
                  tone.legendText,
                )}
              >
                {resource.subjectName}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                {resource.type}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {detail.authorName} • {formatResourceDate(detail.updatedAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
              onClick={() => onDownloadPdf?.(resource)}
            >
              <FileText className="h-4 w-4" />
              Download PDF
            </Button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close resource preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:grid-cols-4">
            <p>Year: {resource.yearLevel}</p>
            <p>Difficulty: {resource.difficulty}</p>
            <p>Duration: {resource.durationMins} mins</p>
            <p>Marks: {resource.marks}</p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Uploaded Media
            </p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {detail.media.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-px hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  onClick={() => setActiveMedia(m)}
                  aria-label={`Open ${m.title}`}
                >
                  {m.kind === "image" && m.src ? (
                    <img
                      src={m.src}
                      alt={m.title}
                      className="h-28 w-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="grid h-28 w-full place-items-center bg-slate-50">
                      <div className="text-center">
                        <FileText className="mx-auto h-6 w-6 text-slate-400" />
                        <p className="mt-2 text-xs font-semibold text-slate-600">
                          PDF
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="px-4 py-3">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {m.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {m.fileName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Questions
              </p>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50"
                onClick={() => setShowAnswerGuide((previous) => !previous)}
              >
                {showAnswerGuide ? "Hide answer guide" : "Show answer guide"}
              </Button>
            </div>

            <div className="mt-3 space-y-3">
              {questionsWithCorrect.map((q, index) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      Question {index + 1}
                    </p>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                      {q.type === "multipleChoice"
                        ? "Multiple Choice"
                        : q.type === "shortAnswer"
                          ? "Short Answer"
                          : "Extended Response"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-700">{q.prompt}</p>

                  {q.options?.length ? (
                    <ul className="mt-3 space-y-1 text-sm text-slate-700">
                      {q.options.map((opt, optionIndex) => {
                        const isCorrect =
                          typeof q.correctOptionIndex === "number" &&
                          optionIndex === q.correctOptionIndex;

                        return (
                          <li
                            key={opt}
                            className={cn(
                              "flex items-start gap-2 rounded-lg border px-3 py-2",
                              isCorrect && showAnswerGuide
                                ? "border-[#00B96B] bg-[#00B96B1A]"
                                : "border-slate-200 bg-slate-50",
                            )}
                          >
                            <span className="mt-[2px] text-xs font-semibold text-slate-500">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span className="min-w-0">{opt}</span>
                            {isCorrect && showAnswerGuide ? (
                              <span className="ml-auto shrink-0 rounded-full border border-[#00B96B] bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00B96B]">
                                Correct
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}

                  {showAnswerGuide && q.answerGuide ? (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Answer guide
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                        {q.answerGuide}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tags
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {activeMedia ? (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/55 p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveMedia(null);
          }}
        >
          <Card
            hover={false}
            className="w-full max-w-4xl overflow-hidden rounded-2xl border-slate-200 p-0"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {activeMedia.title}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {activeMedia.fileName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close media preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activeMedia.kind === "image" && activeMedia.src ? (
              <img
                src={activeMedia.src}
                alt={activeMedia.title}
                className="max-h-[calc(100vh-12rem)] w-full object-contain bg-black"
                draggable={false}
              />
            ) : (
              <div className="p-6 text-sm text-slate-600">
                PDF preview is not available in this demo. Use "Download PDF" to
                open a printable version.
              </div>
            )}
          </Card>
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
