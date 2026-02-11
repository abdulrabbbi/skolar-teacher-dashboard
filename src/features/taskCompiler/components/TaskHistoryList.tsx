import TaskHistoryItem from './TaskHistoryItem';
import type { TaskHistoryItemData } from '../data/taskHistory.mock';

export type TaskHistoryListProps = {
  items: TaskHistoryItemData[];
};

export default function TaskHistoryList({ items }: TaskHistoryListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <TaskHistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}
