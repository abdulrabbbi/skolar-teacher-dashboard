import SearchInput from '../../../shared/components/ui/SearchInput';

import {
  resourceTypeFilterOptions,
  sortFilterOptions,
  subjectFilterOptions,
  yearLevelFilterOptions,
} from '../data/contentLibrary.mock';
import type { ContentLibraryFilters } from '../types/contentLibrary.types';

type ContentLibraryFiltersProps = {
  filters: ContentLibraryFilters;
  onFiltersChange: (next: ContentLibraryFilters) => void;
};

export default function ContentLibraryFilters({
  filters,
  onFiltersChange,
}: ContentLibraryFiltersProps) {
  const labelClass =
    'mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-slate-400';
  const controlClass =
    'h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-200';

  function update<K extends keyof ContentLibraryFilters>(
    key: K,
    value: ContentLibraryFilters[K],
  ) {
    onFiltersChange({ ...filters, [key]: value });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <label htmlFor="content-library-search" className={labelClass}>
            Search
          </label>
          <SearchInput
            id="content-library-search"
            placeholder="Search by title or tags"
            value={filters.searchQuery}
            onChange={(event) => update('searchQuery', event.target.value)}
            className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:border-slate-300 focus:ring-slate-200"
          />
        </div>

        <div className="xl:col-span-2">
          <label htmlFor="content-library-subject" className={labelClass}>
            Subject
          </label>
          <select
            id="content-library-subject"
            className={controlClass}
            value={filters.subjectId}
            onChange={(event) =>
              update(
                'subjectId',
                event.target.value as ContentLibraryFilters['subjectId'],
              )
            }
          >
            {subjectFilterOptions.map((option) => (
              <option key={String(option.value)} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2">
          <label htmlFor="content-library-type" className={labelClass}>
            Resource Type
          </label>
          <select
            id="content-library-type"
            className={controlClass}
            value={filters.resourceType}
            onChange={(event) =>
              update(
                'resourceType',
                event.target.value as ContentLibraryFilters['resourceType'],
              )
            }
          >
            {resourceTypeFilterOptions.map((option) => (
              <option key={String(option.value)} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2">
          <label htmlFor="content-library-year" className={labelClass}>
            Year Level
          </label>
          <select
            id="content-library-year"
            className={controlClass}
            value={String(filters.yearLevel)}
            onChange={(event) => {
              const rawValue = event.target.value;
              const parsedValue =
                rawValue === 'all'
                  ? 'all'
                  : (Number(rawValue) as ContentLibraryFilters['yearLevel']);

              update('yearLevel', parsedValue);
            }}
          >
            {yearLevelFilterOptions.map((option) => (
              <option key={String(option.value)} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-start xl:justify-end">
        <div className="w-full xl:max-w-[240px]">
          <label htmlFor="content-library-sort" className={labelClass}>
            Sort
          </label>
          <select
            id="content-library-sort"
            className={controlClass}
            value={filters.sortBy}
            onChange={(event) =>
              update('sortBy', event.target.value as ContentLibraryFilters['sortBy'])
            }
          >
            {sortFilterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
