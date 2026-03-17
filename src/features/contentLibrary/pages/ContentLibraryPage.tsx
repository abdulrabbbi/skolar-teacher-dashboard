/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import PageHeader from '../../../shared/components/ui/PageHeader';
import { cn } from '../../../shared/lib/cn';
import { openPrintToPdfWindow } from '../../../shared/lib/printToPdf';

import ContentLibraryFilters from '../components/ContentLibraryFilters';
import ContentLibraryGrid from '../components/ContentLibraryGrid';
import ResourcePreviewModal from '../components/ResourcePreviewModal';
import {
  contentLibrarySubjects,
  contentResourcesMock,
  defaultContentLibraryFilters,
  subjectColorStyles,
} from '../data/contentLibrary.mock';
import { getContentResourceDetail } from '../data/contentResourceDetail.mock';
import type { ContentResource } from '../types/contentLibrary.types';
import { formatResourceDate, filterContentResources, getVisibleResources, hasMoreResources } from '../utils/contentLibrary.utils';

const PAGE_SIZE = 6;

export default function ContentLibraryPage() {
  const [filters, setFilters] = useState(defaultContentLibraryFilters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [resources, setResources] = useState<ContentResource[]>(contentResourcesMock);
  const [selectedResource, setSelectedResource] = useState<ContentResource | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filteredResources = useMemo(
    () => filterContentResources(resources, filters),
    [resources, filters],
  );

  const visibleResources = useMemo(
    () => getVisibleResources(filteredResources, visibleCount),
    [filteredResources, visibleCount],
  );

  const canLoadMore = hasMoreResources(filteredResources.length, visibleCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  useEffect(() => {
    if (!actionMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActionMessage(null);
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [actionMessage]);

  const handleViewResource = (resource: ContentResource) => {
    setSelectedResource(resource);
  };

  const handleDuplicateResource = (resource: ContentResource) => {
    const duplicateResource: ContentResource = {
      ...resource,
      id: `${resource.id}-copy-${Date.now()}`,
      title: `${resource.title} (Copy)`,
      createdAt: new Date().toISOString(),
      usageCount: 0,
    };

    setResources((previous) => [duplicateResource, ...previous]);
    setActionMessage(`Created a copy of "${resource.title}".`);
  };

  const handleDownloadResource = (resource: ContentResource) => {
    const detail = getContentResourceDetail(resource);

    const escapeHtml = (value: string) =>
      String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

    const metaHtml = `
      <div class="meta">
        <p><span class="pill">${escapeHtml(resource.subjectName)}</span><span class="pill">${escapeHtml(resource.type)}</span><span class="pill">${escapeHtml(resource.difficulty)}</span></p>
        <p><strong>Year:</strong> ${resource.yearLevel} &nbsp; <strong>Duration:</strong> ${resource.durationMins} mins &nbsp; <strong>Marks:</strong> ${resource.marks}</p>
        <p><strong>Author:</strong> ${escapeHtml(detail.authorName)} &nbsp; <strong>Updated:</strong> ${escapeHtml(formatResourceDate(detail.updatedAt))}</p>
        <p><strong>Tags:</strong> ${escapeHtml(resource.tags.map((t) => `#${t}`).join(' '))}</p>
      </div>
      <div class="hr"></div>
    `;

    const mediaHtml = detail.media.length
      ? `
        <h2>Uploaded Media</h2>
        <div class="grid">
          ${detail.media
            .map((m) => {
              if (m.kind === 'image' && m.src) {
                return `<div class="thumb"><img src="${m.src}" alt="${escapeHtml(m.title)}" /><div class="cap">${escapeHtml(m.fileName)}</div></div>`;
              }
              return `<div class="thumb"><div class="cap"><strong>PDF</strong><br/>${escapeHtml(m.fileName)}</div></div>`;
            })
            .join('')}
        </div>
        <div class="hr"></div>
      `
      : '';

    const questionsHtml = `
      <h2>Questions</h2>
      <ol>
        ${detail.questions
          .map((q) => {
            const options = q.options?.length
              ? `<div class="opt">${q.options
                  .map((opt) => `• ${escapeHtml(opt)}`)
                  .join('<br/>')}</div>`
              : '';
            return `<li><div><strong>${escapeHtml(
              q.type === 'multipleChoice'
                ? 'Multiple Choice'
                : q.type === 'shortAnswer'
                  ? 'Short Answer'
                  : 'Extended Response',
            )}:</strong> ${escapeHtml(q.prompt)}</div>${options}</li>`;
          })
          .join('')}
      </ol>
    `;

    openPrintToPdfWindow({
      title: resource.title,
      subtitle: 'Printable view — use your browser “Save as PDF” to download.',
      bodyHtml: `${metaHtml}${mediaHtml}${questionsHtml}`,
    });

    setActionMessage(`Opened printable PDF for "${resource.title}".`);
  };

  return (
    <div className="space-y-6">
      <Card
        hover={false}
        className="rounded-2xl border-slate-200/60 p-5 sm:p-6"
      >
        <PageHeader
          title="Content Library"
          subtitle="Browse worksheets, quizzes and resources shared across subjects"
        />
      </Card>

      <Card
        hover={false}
        className="rounded-2xl border-slate-200/60 p-5 sm:p-6"
      >
        <ContentLibraryFilters filters={filters} onFiltersChange={setFilters} />
      </Card>

      <Card
        hover={false}
        className="rounded-2xl border-slate-200/60 p-4 sm:p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Subject Colour Guide
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {contentLibrarySubjects.map((subject) => {
            const tone = subjectColorStyles[subject.id];

            return (
              <span
                key={subject.id}
                className={cn(
                  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
                  tone.legendSurface,
                  tone.legendText,
                )}
              >
                {subject.name}
              </span>
            );
          })}
        </div>
      </Card>

      <div className="px-1 text-xs text-slate-500 sm:text-sm">
        <p>
          Showing {visibleResources.length} of {filteredResources.length} resources
        </p>
        {actionMessage ? (
          <p className="mt-1 text-xs font-medium text-[#00B96B]">{actionMessage}</p>
        ) : null}
      </div>

      <ContentLibraryGrid
        resources={visibleResources}
        onView={handleViewResource}
        onDuplicate={handleDuplicateResource}
        onDownload={handleDownloadResource}
      />

      {canLoadMore ? (
        <div className="flex justify-center pt-1">
          <Button
            variant="outline"
            size="sm"
            className="px-6 border-slate-200 text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Load More Resources
          </Button>
        </div>
      ) : null}

      {selectedResource ? (
        <ResourcePreviewModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onDownloadPdf={handleDownloadResource}
        />
      ) : null}
    </div>
  );
}
