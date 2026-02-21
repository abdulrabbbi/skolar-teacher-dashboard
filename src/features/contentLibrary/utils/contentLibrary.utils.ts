import type {
  ContentLibraryFilters,
  ContentResource,
  ContentSortBy,
} from '../types/contentLibrary.types';

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function byNewest(a: ContentResource, b: ContentResource): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function byMostUsed(a: ContentResource, b: ContentResource): number {
  return b.usageCount - a.usageCount;
}

function byHighestRated(a: ContentResource, b: ContentResource): number {
  if (b.rating !== a.rating) {
    return b.rating - a.rating;
  }

  return b.usageCount - a.usageCount;
}

const sorters: Record<ContentSortBy, (a: ContentResource, b: ContentResource) => number> = {
  newest: byNewest,
  mostUsed: byMostUsed,
  highestRated: byHighestRated,
};

export function filterContentResources(
  resources: ContentResource[],
  filters: ContentLibraryFilters,
): ContentResource[] {
  const query = normalize(filters.searchQuery);

  const filtered = resources.filter((resource) => {
    const matchesQuery =
      !query ||
      normalize(resource.title).includes(query) ||
      resource.tags.some((tag) => normalize(tag).includes(query));

    const matchesSubject =
      filters.subjectId === 'all' || resource.subjectId === filters.subjectId;

    const matchesType =
      filters.resourceType === 'all' || resource.type === filters.resourceType;

    const matchesYear =
      filters.yearLevel === 'all' || resource.yearLevel === filters.yearLevel;

    return matchesQuery && matchesSubject && matchesType && matchesYear;
  });

  return [...filtered].sort(sorters[filters.sortBy]);
}

export function getVisibleResources(
  resources: ContentResource[],
  visibleCount: number,
): ContentResource[] {
  return resources.slice(0, visibleCount);
}

export function hasMoreResources(totalCount: number, visibleCount: number): boolean {
  return visibleCount < totalCount;
}

export function formatResourceDate(dateIso: string): string {
  const parsed = new Date(dateIso);
  if (Number.isNaN(parsed.getTime())) {
    return 'Unknown date';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(parsed);
}
