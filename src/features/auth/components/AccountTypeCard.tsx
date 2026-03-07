import { cn } from "../../../shared/lib/cn";

type Props = {
  title: string;
  desc: string;
  color: "green";
  selected: boolean;
  onClick: () => void;
};

const colors = {
  green: "bg-[#00B96B14] text-[#00B96B] border-[#00B96B]",
};

export function AccountTypeCard({ title, desc, color, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border bg-white px-4 py-4 text-left shadow-sm transition",
        selected ? "border-[#00B96B] ring-2 ring-[#00B96B]" : "border-slate-200 hover:bg-slate-50/50",
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
        <span className={cn("inline-flex items-center gap-2", selected && "text-[#00B96B]")}>
          <span
            className={cn(
              "h-3 w-3 rounded-full border",
              selected ? "border-[#00B96B] bg-[#00B96B]" : "border-slate-300 bg-white",
            )}
          />
          {selected ? "Selected" : "Select"}
        </span>
      </div>
    </button>
  );
}

