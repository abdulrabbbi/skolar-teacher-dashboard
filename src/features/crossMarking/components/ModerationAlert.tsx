import { AlertTriangle } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import type { ModerationAlertData } from "../data/crossMarking.mock";

export type ModerationAlertProps = {
  alert: ModerationAlertData;
  onOpen?: () => void;
};

export default function ModerationAlert({ alert, onOpen }: ModerationAlertProps) {
  return (
    <div
      className="
        flex items-center justify-between gap-4
        rounded-2xl border border-amber-200
        bg-amber-50
        px-5 py-4
        shadow-sm
      "
    >
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-4">
        {/* Icon box */}
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E17100]">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-amber-900">
            {alert.title}
          </div>
          <div className="truncate text-xs text-amber-700">
            {alert.subtitle}
          </div>
        </div>
      </div>

      {/* RIGHT button */}
      <Button
        variant="warning"
        size="sm"
        onClick={onOpen}
        className="h-9 rounded-xl px-4 shadow-sm"
      >
        {alert.buttonLabel}
      </Button>
    </div>
  );
}