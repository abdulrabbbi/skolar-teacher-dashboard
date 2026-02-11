import { ChevronRight } from 'lucide-react';
import Card from '../../../shared/components/ui/Card';
import type { MarkingQueueItem } from '../data/assessments.mock';

export type MarkingQueueProps = {
  items: MarkingQueueItem[];
};

export default function MarkingQueue({ items }: MarkingQueueProps) {
  const totalPending = items.reduce((sum, item) => sum + item.pending, 0);

  return (
    <section className="space-y-4">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Marking Queue
          </h2>
          <p className="text-sm text-slate-500">
            {totalPending} submissions awaiting marking
          </p>
        </div>

        {/* FILTER (UI ONLY) */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
        >
          All Topics
          <ChevronRight className="h-4 w-4 rotate-90" />
        </button>
      </div>

      {/* LIST */}
      <Card className="space-y-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        {items.map((item) => (
          <div
            key={item.id}
            className="
              group
              flex flex-wrap items-center justify-between gap-4
              rounded-xl border border-slate-200
              px-4 py-3
              transition
              hover:bg-slate-50
              hover:shadow-lg
            "
          >
            {/* LEFT */}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {item.title}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{item.className}</span>
                <span className="text-orange-600 font-medium">
                  • {item.pending} pending
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  {item.submissions}
                </p>
                <p className="text-xs text-slate-500">Submissions</p>
              </div>

              <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600 transition-transform duration-200 group-hover:scale-110" />
            </div>
          </div>
        ))}
      </Card>
    </section>
  );
}
