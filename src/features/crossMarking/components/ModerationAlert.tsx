
import { AlertTriangle } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import type { ModerationAlertData } from '../data/crossMarking.mock';

export type ModerationAlertProps = {
  alert: ModerationAlertData;
  onOpen?: () => void;
};

export default function ModerationAlert({
  alert,
  onOpen,
}: ModerationAlertProps) {
  return (
    <Card
      className="
        group
        flex flex-col gap-4
        rounded-xl
        border border-yellow-300
        bg-yellow-50
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
        transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-start gap-3">
        {/* ICON */}
        <div
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-lg
            bg-yellow-200
            text-yellow-700
            transition-transform duration-200 group-hover:scale-110
          "
        >
          <AlertTriangle className="h-5 w-5" />
        </div>

        {/* TEXT */}
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-yellow-900">
            {alert.title}
          </p>
          <p className="text-sm text-yellow-800">
            {alert.subtitle}
          </p>
        </div>
      </div>

      {/* BUTTON (PURE YELLOW) */}
      <Button
        size="sm"
        onClick={onOpen}
        className="
          w-full
          bg-yellow-400
          text-yellow-900
          hover:bg-yellow-500
          sm:w-auto
          transition-all duration-200 hover:-translate-y-0.5
        "
      >
        {alert.buttonLabel}
      </Button>
    </Card>
  );
}
