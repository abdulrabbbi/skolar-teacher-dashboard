import SearchInput from '../../../shared/components/ui/SearchInput';
import SelectField from '../../../shared/components/ui/SelectField';

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
  function update<K extends keyof ContentLibraryFilters>(
    key: K,
    value: ContentLibraryFilters[K],
  ) {
    onFiltersChange({ ...filters, [key]: value });
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
      <div className="xl:col-span-2">
        <label htmlFor="content-library-search" className="sr-only">
          Search resources
        </label>
        <SearchInput
          id="content-library-search"
          placeholder="Search by title or tags"
          value={filters.searchQuery}
          onChange={(event) => update('searchQuery', event.target.value)}
          className="h-10"
        />
      </div>

      <SelectField
        id="content-library-subject"
        label="Subject"
        value={filters.subjectId}
        onChange={(event) =>
          update('subjectId', event.target.value as ContentLibraryFilters['subjectId'])
        }
      >
        {subjectFilterOptions.map((option) => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>

      <SelectField
        id="content-library-type"
        label="Resource Type"
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
      </SelectField>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 xl:gap-3">
        <SelectField
          id="content-library-year"
          label="Year Level"
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
        </SelectField>

        <SelectField
          id="content-library-sort"
          label="Sort"
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
        </SelectField>
      </div>
    </div>
  );
}
