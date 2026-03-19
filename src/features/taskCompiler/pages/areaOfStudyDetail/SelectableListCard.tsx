export default function SelectableListCard({
  title,
  subtitle,
  items,
  selected,
  onToggle,
}: {
  title: string;
  subtitle: string;
  items: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((it) => {
          const checked = selected.includes(it.id);
          return (
            <label key={it.id} className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(it.id)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#00B96B] accent-[#00B96B]"
              />
              <span className="text-sm text-slate-700">{it.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

