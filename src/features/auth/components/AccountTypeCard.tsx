import { cn } from "../../../shared/lib/cn";

type Props = {
  title: string;
  desc: string;
  color: "green";
  selected: boolean;
  onClick: () => void;
};

const colors = {
  green: "bg-green-50 text-green-700 border-green-200",
};

export function AccountTypeCard({ title, desc, color, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border bg-white px-4 py-4 text-left shadow-sm transition",
        selected ? "border-green-400 ring-2 ring-green-100" : "border-slate-200 hover:bg-slate-50/50",
      )}
    >
      <div className={cn("grid h-9 w-9 place-items-center rounded-xl border", colors[color])}>
        <span className="text-sm font-semibold">{title[0]}</span>
      </div>

      <div className="mt-3">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-xs text-slate-500">{desc}</div>
      </div>

      <div className="mt-3 text-[11px] text-slate-500">
        <span className={cn("inline-flex items-center gap-2", selected && "text-green-700")}>
          <span
            className={cn(
              "h-3 w-3 rounded-full border",
              selected ? "border-green-600 bg-green-600" : "border-slate-300 bg-white",
            )}
          />
          {selected ? "Selected" : "Select"}
        </span>
      </div>
    </button>
  );
}
