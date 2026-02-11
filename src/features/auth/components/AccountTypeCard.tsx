import { cn } from "../../../shared/lib/cn";

type Props = {
  title: string;
  desc: string;
  color: "indigo" | "emerald" | "sky";
  selected: boolean;
  onClick: () => void;
};

const colors = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sky: "bg-sky-50 text-sky-700 border-sky-200",
};

export function AccountTypeCard({ title, desc, color, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border bg-white px-4 py-4 text-left shadow-sm transition",
        selected ? "border-indigo-400 ring-2 ring-indigo-100" : "border-slate-200 hover:bg-slate-50/50",
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
        <span className={cn("inline-flex items-center gap-2", selected && "text-indigo-700")}>
          <span
            className={cn(
              "h-3 w-3 rounded-full border",
              selected ? "border-indigo-600 bg-indigo-600" : "border-slate-300 bg-white",
            )}
          />
          {selected ? "Selected" : "Select"}
        </span>
      </div>
    </button>
  );
}
