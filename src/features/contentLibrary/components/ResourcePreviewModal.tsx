import { FileText, X } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import { cn } from "../../../shared/lib/cn";

import { subjectColorStyles } from "../data/contentLibrary.mock";
import { getContentResourceDetail } from "../data/contentResourceDetail.mock";
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

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        hover={false}
        className="w-full max-w-3xl rounded-2xl border-slate-200 p-5 sm:p-6"
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

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600 sm:grid-cols-4">
          <p>Year: {resource.yearLevel}</p>
          <p>Difficulty: {resource.difficulty}</p>
          <p>Duration: {resource.durationMins} mins</p>
          <p>Marks: {resource.marks}</p>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Uploaded Media
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {detail.media.map((m) => (
              <div
                key={m.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
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
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Questions
          </p>

          <div className="mt-3 space-y-3">
            {detail.questions.map((q, index) => (
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
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                    {q.options.map((opt) => (
                      <li key={opt}>{opt}</li>
                    ))}
                  </ul>
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
      </Card>
    </div>
  );
}

