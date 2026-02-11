import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import TaskHistoryList from '../components/TaskHistoryList';
import { taskHistoryItems } from '../data/taskHistory.mock';

export default function TaskHistoryPage() {
  return (
    <section className="space-y-6">
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Past Tasks
            </h2>
            <p className="text-sm text-slate-500">
              View and manage previously generated worksheets
            </p>
          </div>

          <div className="w-full sm:w-56">
            <label className="sr-only" htmlFor="task-history-filter">
              Filter tasks
            </label>
            <select
              id="task-history-filter"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              defaultValue="all"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="queued">Queued</option>
            </select>
          </div>
        </div>
      </Card>

      {/* TASK LIST */}
      <TaskHistoryList items={taskHistoryItems} />

      {/* LOAD MORE BUTTON (MISSING PART) */}
      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          size="sm"
          className="px-6 border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Load More Tasks
        </Button>
      </div>
    </section>
  );
}
