import { useState } from "react";
import Card from "../../../shared/components/ui/Card";
import type { EventTypeConfig } from "../data/calendar.mock";

export type EventTypesProps = {
  types: EventTypeConfig[];
};

export default function EventTypes({ types }: EventTypesProps) {
  const [eventTypes, setEventTypes] = useState(types);

  const toggleType = (id: string) => {
    setEventTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)),
    );
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Event Types</h3>

      <div className="mt-4 space-y-3">
        {eventTypes.map((t) => (
          <label key={t.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={t.checked}
              onChange={() => toggleType(t.id)}
              className="h-4 w-4 rounded-[4px] accent-black"
            />
            <span className="text-sm text-slate-900">{t.label}</span>
          </label>
        ))}
      </div>
    </Card>
  );
}