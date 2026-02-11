import Card from '../../../shared/components/ui/Card';

export type SelectableListItem = {
  id: string;
  label: string;
};

export type SelectableListCardProps = {
  title: string;
  subtitle: string;
  items: SelectableListItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export default function SelectableListCard({
  title,
  subtitle,
  items,
  selectedIds,
  onToggle,
}: SelectableListCardProps) {
  return (
    <Card className="space-y-3 p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="max-h-64 space-y-2 overflow-y-auto pr-2">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-2 text-sm text-slate-700 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              checked={selectedIds.includes(item.id)}
              onChange={() => onToggle(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </Card>
  );
}
