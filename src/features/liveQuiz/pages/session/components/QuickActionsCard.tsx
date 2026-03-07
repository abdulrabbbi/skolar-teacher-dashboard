import { useState } from "react";
import { CheckCircle2, ChevronRight, Clock, Users } from "lucide-react";
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

type QuickActionType = "hint" | "skip" | "time" | "other";

function getActionType(label: string): QuickActionType {
  const t = label.toLowerCase();

  if (t.includes("hint") || t.includes("struggling")) {
    return "hint";
  }
  if (t.includes("skip")) {
    return "skip";
  }
  if (t.includes("second") || t.includes("time") || t.includes("add")) {
    return "time";
  }

  return "other";
}

export default function QuickActionsCard({ actions }: QuickActionsCardProps) {
  const [hintsSent, setHintsSent] = useState(0);
  const [questionsSkipped, setQuestionsSkipped] = useState(0);
  const [extraSeconds, setExtraSeconds] = useState(0);
  const [lastAction, setLastAction] = useState<string>("");

  const handleActionClick = (label: string) => {
    const actionType = getActionType(label);

    if (actionType === "hint") {
      setHintsSent((value) => value + 1);
      setLastAction("Hint sent (frontend preview).");
      return;
    }

    if (actionType === "skip") {
      setQuestionsSkipped((value) => value + 1);
      setLastAction("Question skipped (frontend preview).");
      return;
    }

    if (actionType === "time") {
      setExtraSeconds((value) => value + 30);
      setLastAction("Added 30 seconds (frontend preview).");
      return;
    }

    setLastAction(`${label} triggered (frontend preview).`);
  };

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
              onClick={() => handleActionClick(label)}
            >
              <Icon className="h-5 w-5 text-slate-900" />
              <span className="truncate">{label}</span>
            </Button>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Frontend Preview
        </p>
        <div className="mt-2 space-y-1 text-xs text-slate-600">
          <p>Hints sent: {hintsSent}</p>
          <p>Questions skipped: {questionsSkipped}</p>
          <p>Extra time added: {extraSeconds}s</p>
        </div>

        {lastAction ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#00B96B]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {lastAction}
          </p>
        ) : null}
      </div>
    </Card>
  );
}
