import { ChevronRight, Clock, Users } from "lucide-react";
import Card from "../../../../../shared/components/ui/Card";
import Button from "../../../../../shared/components/ui/Button";

export type QuickActionsCardProps = {
  actions: string[];
};

function getIcon(label: string) {
  const t = label.toLowerCase();

  if (t.includes("hint") || t.includes("struggling") || t.includes("students")) {
    return Users;
  }
  if (t.includes("skip")) {
    return ChevronRight;
  }
  if (t.includes("second") || t.includes("time") || t.includes("add")) {
    return Clock;
  }

  // default fallback (matches ">" vibe)
  return ChevronRight;
}

export default function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <Card className="p-4 space-y-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-sm font-semibold text-slate-900">Quick Actions</h3>

      <div className="space-y-3">
        {actions.map((label) => {
          const Icon = getIcon(label);

          return (
            <Button
              key={label}
              variant="outline"
              fullWidth
              className="
                h-12 justify-start gap-3 rounded-xl px-4
                text-slate-900
                transition-all duration-200
                hover:-translate-y-0.5
              "
            >
              <Icon className="h-5 w-5 text-slate-900" />
              <span className="truncate">{label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}