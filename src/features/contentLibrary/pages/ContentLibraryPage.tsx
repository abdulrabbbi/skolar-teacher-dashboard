/* eslint-disable react-hooks/set-state-in-effect */
import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import PageHeader from '../../../shared/components/ui/PageHeader';
import { cn } from '../../../shared/lib/cn';

import ContentLibraryFilters from '../components/ContentLibraryFilters';
import ContentLibraryGrid from '../components/ContentLibraryGrid';
import {
  contentLibrarySubjects,
  contentResourcesMock,
  defaultContentLibraryFilters,
  subjectColorStyles,
} from '../data/contentLibrary.mock';
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
    const fileSafeTitle = resource.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const payload = [
      `Title: ${resource.title}`,
      `Subject: ${resource.subjectName}`,
      `Type: ${resource.type}`,
      `Difficulty: ${resource.difficulty}`,
      `Year Level: ${resource.yearLevel}`,
      `Duration: ${resource.durationMins} mins`,
      `Marks: ${resource.marks}`,
      `Tags: ${resource.tags.join(', ')}`,
      `Created: ${formatResourceDate(resource.createdAt)}`,
    ].join('\n');

    const blob = new Blob([payload], { type: 'text/plain;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = `${fileSafeTitle || 'resource'}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(blobUrl);

    setActionMessage(`Downloaded "${resource.title}".`);
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
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-sm"
          onClick={() => setSelectedResource(null)}
        >
          <Card
            hover={false}
            className="w-full max-w-xl rounded-2xl border-slate-200 p-5 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  {selectedResource.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
                      subjectColorStyles[selectedResource.subjectId].legendSurface,
                      subjectColorStyles[selectedResource.subjectId].legendText,
                    )}
                  >
                    {selectedResource.subjectName}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {selectedResource.type}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close resource preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <p>Year Level: {selectedResource.yearLevel}</p>
              <p>Difficulty: {selectedResource.difficulty}</p>
              <p>Duration: {selectedResource.durationMins} mins</p>
              <p>Marks: {selectedResource.marks}</p>
              <p className="col-span-2">
                Created: {formatResourceDate(selectedResource.createdAt)}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tags
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedResource.tags.map((tag) => (
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
      ) : null}
    </div>
  );
}
