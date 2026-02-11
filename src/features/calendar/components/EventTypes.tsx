import { useState } from 'react';
import Card from '../../../shared/components/ui/Card';
import type { EventTypeConfig } from '../data/calendar.mock';

export type EventTypesProps = {
  types: EventTypeConfig[];
};

export default function EventTypes({ types }: EventTypesProps) {
  const [eventTypes, setEventTypes] = useState(types);

  const toggleType = (id: string) => {
    setEventTypes((prev) =>
      prev.map((type) =>
        type.id === id
          ? { ...type, checked: !type.checked }
          : type
      )
    );
  };

  return (
    <section>
      {/* ONE MODEL (CARD) */}
      <Card className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">

        {/* Heading INSIDE the card */}
        <h2 className="text-base font-semibold text-slate-900">
          Event Types
        </h2>

        {/* List */}
        <div className="space-y-3 ">
          {eventTypes.map((type) => (
            <label
              key={type.id}
              className="flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-slate-50"
            >
              {/* Text only */}
              <span className="text-sm text-slate-700">
                {type.label}
              </span>

              {/* Black & white checkbox */}
              <input
                type="checkbox"
                checked={type.checked}
                onChange={() => toggleType(type.id)}
                className="
                  h-4 w-4
                  cursor-pointer
                  accent-black
                "
              />
            </label>
          ))}
        </div>

      </Card>
    </section>
  );
}
