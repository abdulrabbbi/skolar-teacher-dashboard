import { useEffect, useMemo, useState } from 'react';

import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import PageHeader from '../../../shared/components/ui/PageHeader';

import ContentLibraryFilters from '../components/ContentLibraryFilters';
import ContentLibraryGrid from '../components/ContentLibraryGrid';
import {
  contentResourcesMock,
  defaultContentLibraryFilters,
} from '../data/contentLibrary.mock';
import {
  filterContentResources,
  getVisibleResources,
  hasMoreResources,
} from '../utils/contentLibrary.utils';

const PAGE_SIZE = 6;

export default function ContentLibraryPage() {
  const [filters, setFilters] = useState(defaultContentLibraryFilters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredResources = useMemo(
    () => filterContentResources(contentResourcesMock, filters),
    [filters],
  );

  const visibleResources = useMemo(
    () => getVisibleResources(filteredResources, visibleCount),
    [filteredResources, visibleCount],
  );

  const canLoadMore = hasMoreResources(filteredResources.length, visibleCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

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

      <div className="px-1 text-xs text-slate-500 sm:text-sm">
        <p>
          Showing {visibleResources.length} of {filteredResources.length} resources
        </p>
      </div>

      <ContentLibraryGrid resources={visibleResources} />

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
    </div>
  );
}
