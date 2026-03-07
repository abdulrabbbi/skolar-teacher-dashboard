import { useEffect, useRef, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import Card from '../../../shared/components/ui/Card';
import type { MarkingQueueItem } from '../data/assessments.mock';

export type MarkingQueueProps = {
  items: MarkingQueueItem[];
};

export default function MarkingQueue({ items }: MarkingQueueProps) {
  const totalPending = items.reduce((sum, item) => sum + item.pending, 0);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!sectionRef.current?.contains(event.target as Node)) {
        setOpenItemId(null);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <section ref={sectionRef} className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Marking Queue
          </h2>
          <p className="text-sm text-slate-500">
            {totalPending} submissions awaiting marking
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1.5 text-sm text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
        >
          All Topics
          <ChevronRight className="h-4 w-4 rotate-90" />
        </button>
      </div>

      {/* LIST */}
      <Card className="space-y-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        {items.map((item) => {
          const isPanelOpen = openItemId === item.id;

          return (
            <div key={item.id} className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenItemId((current) => (current === item.id ? null : item.id))
                }
                aria-expanded={isPanelOpen}
                aria-controls={`pending-panel-${item.id}`}
                className="group flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:bg-slate-50 hover:shadow-lg"
              >
                {/* LEFT */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{item.className}</span>
                    <span className="font-medium text-orange-600">
                      &bull; {item.pending} pending
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex shrink-0 items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.submissions}
                    </p>
                    <p className="text-xs text-slate-500">Submissions</p>
                  </div>

                  <ChevronRight className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:scale-110 group-hover:text-slate-600" />
                </div>
              </button>

              {isPanelOpen && (
                <div
                  id={`pending-panel-${item.id}`}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Still to submit
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.className} | {item.pending} students
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenItemId(null)}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Close pending students panel"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <ul className="mt-3 max-h-56 space-y-1.5 overflow-y-auto pr-1">
                    {item.pendingStudents.map((studentName) => (
                      <li
                        key={`${item.id}-${studentName}`}
                        className="flex items-center gap-2 rounded-md bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00B96B]" />
                        <span className="truncate">{studentName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </Card>
    </section>
  );
}
