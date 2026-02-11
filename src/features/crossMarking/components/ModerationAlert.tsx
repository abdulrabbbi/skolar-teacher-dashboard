// src/features/crossMarking/components/ModerationAlert.tsx
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
        flex flex-col gap-4
        rounded-xl
        border border-yellow-300
        bg-yellow-50
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
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
        "
      >
        {alert.buttonLabel}
      </Button>
    </Card>
  );
}
