import { useMemo, useState } from "react";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import TaskHistoryList from "../components/TaskHistoryList";
import { taskHistoryItems, type TaskHistoryItemData, type TaskHistoryStatus } from "../data/taskHistory.mock";

export default function TaskHistoryPage() {
  const storageKey = "taskCompiler:taskHistoryStatusById";

  const [items, setItems] = useState<TaskHistoryItemData[]>(() => {
    if (typeof window === "undefined") return taskHistoryItems;

    try {
      const raw = window.localStorage.getItem(storageKey);
      const statusById = raw ? (JSON.parse(raw) as Record<string, TaskHistoryStatus>) : null;
      if (!statusById) return taskHistoryItems;

      return taskHistoryItems.map((item) => ({
        ...item,
        status: statusById[item.id] ?? item.status,
      }));
    } catch {
      return taskHistoryItems;
    }
  });

  const [filter, setFilter] = useState<"all" | TaskHistoryStatus>("all");

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.status === filter);
  }, [filter, items]);

  const handleChangeStatus = (id: string, status: TaskHistoryStatus) => {
    setItems((previous) => {
      const next = previous.map((item) => (item.id === id ? { ...item, status } : item));

      try {
        const statusById = next.reduce<Record<string, TaskHistoryStatus>>((map, item) => {
          map[item.id] = item.status;
          return map;
        }, {});
        window.localStorage.setItem(storageKey, JSON.stringify(statusById));
      } catch {
        // ignore
      }

      return next;
    });
  };

  return (
    <section className="space-y-6">
      <Card className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Past Tasks</h2>
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
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | TaskHistoryStatus)}
              className="w-full rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-900 outline-none focus:outline-none focus:ring-0"
            >
              <option value="all">All Tasks</option>
              <option value="In Progress">In Progress</option>
              <option value="Draft">Draft</option>
              <option value="Assigned">Assigned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <TaskHistoryList items={filteredItems} onChangeStatus={handleChangeStatus} />
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="px-6 border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-200"
          >
            Load More Tasks
          </Button>
        </div>
      </Card>
    </section>
  );
}
