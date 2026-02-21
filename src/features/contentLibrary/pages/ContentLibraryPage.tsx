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
    <section className="space-y-6">
      <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
        <PageHeader
          title="Content Library"
          subtitle="Browse worksheets, quizzes and resources shared across subjects"
        />
      </Card>

      <Card className="rounded-2xl border-slate-200 p-4 sm:p-5">
        <ContentLibraryFilters filters={filters} onFiltersChange={setFilters} />
      </Card>

      <div className="flex items-center justify-between px-1 text-sm text-slate-500">
        <p>
          Showing {visibleResources.length} of {filteredResources.length} resources
        </p>
      </div>

      <ContentLibraryGrid resources={visibleResources} />

      {canLoadMore ? (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            className="px-6 border-slate-200 text-slate-700 hover:bg-slate-50"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Load More Resources
          </Button>
        </div>
      ) : null}
    </section>
  );
}
