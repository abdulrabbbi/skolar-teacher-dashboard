import Card from '../../../shared/components/ui/Card';

import ResourceCard from './ResourceCard';
import type { ContentResource } from '../types/contentLibrary.types';

type ContentLibraryGridProps = {
  resources: ContentResource[];
  onView?: (resource: ContentResource) => void;
  onDuplicate?: (resource: ContentResource) => void;
  onDownload?: (resource: ContentResource) => void;
};

export default function ContentLibraryGrid({
  resources,
  onView,
  onDuplicate,
  onDownload,
}: ContentLibraryGridProps) {
  if (!resources.length) {
    return (
      <Card
        hover={false}
        className="rounded-2xl border-slate-200/60 p-6 text-center text-sm text-slate-500"
      >
        No resources match your filters yet.
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onView={onView}
          onDuplicate={onDuplicate}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
