import TaskHistoryItem from './TaskHistoryItem';
import type { TaskHistoryItemData, TaskHistoryStatus } from '../data/taskHistory.mock';

export type TaskHistoryListProps = {
  items: TaskHistoryItemData[];
  onChangeStatus?: (id: string, status: TaskHistoryStatus) => void;
};

export default function TaskHistoryList({
  items,
  onChangeStatus,
}: TaskHistoryListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <TaskHistoryItem key={item.id} item={item} onChangeStatus={onChangeStatus} />
      ))}
    </div>
  );
}
