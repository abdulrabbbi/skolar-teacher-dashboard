import * as React from "react";
import { createPortal } from "react-dom";
import { Calendar, X } from "lucide-react";

import EventFormContent, { type EventFormValues } from "./EventFormContent";
import IconPickerModal from "./IconPickerModal";
import type { EventType } from "../data/calendar.mock";

export type AddEventFormValues = EventFormValues;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddEventFormValues) => void;
  mode?: "add" | "edit";
  initialValues?: Partial<AddEventFormValues> | null;
};

function todayDateTimeLocal(hour: string) {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}T${hour}`;
}

function buildDefaults(initial?: Partial<AddEventFormValues> | null): AddEventFormValues {
  return {
    eventMode: initial?.eventMode ?? "event",
    type: (initial?.type as EventType) ?? "Class",
    title: initial?.title ?? "",
    className: initial?.className ?? "",
    icon: initial?.icon ?? "AtSign",
    color: initial?.color ?? "#1363FF",
    description: initial?.description ?? "",
    startTime: initial?.startTime ?? todayDateTimeLocal("09:00"),
    endTime: initial?.endTime ?? todayDateTimeLocal("10:00"),
    recurring: initial?.recurring ?? false,
    reminders: initial?.reminders ?? [],
    tags: initial?.tags ?? [],
  };
}

export default function AddEventModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  initialValues,
}: Props) {
  const [values, setValues] = React.useState<AddEventFormValues>(() =>
    buildDefaults(initialValues),
  );
  const [iconPickerOpen, setIconPickerOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) setValues(buildDefaults(initialValues));
  }, [isOpen, initialValues]);

  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isEditing = mode === "edit";

  function handleChange<K extends keyof AddEventFormValues>(
    field: K,
    value: AddEventFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="flex max-h-[90vh] w-full max-w-[500px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between px-5 pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#1363FF]">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-[17px] font-semibold text-slate-900">
                  {isEditing ? "Edit Event" : "Create Event"}
                </h2>
                <p className="text-xs text-slate-500">
                  {isEditing
                    ? "Update the details for your calendar event."
                    : "Schedule a new event on your calendar"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(values);
            }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              <EventFormContent
                values={values}
                onChange={handleChange}
                onOpenIconPicker={() => setIconPickerOpen(true)}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end border-t border-slate-100 px-5 py-4">
              <button
                type="submit"
                className="h-10 min-w-[80px] rounded-full bg-[#1363FF] px-6 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {isEditing ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <IconPickerModal
        isOpen={iconPickerOpen}
        selectedIcon={values.icon}
        onConfirm={(icon) => handleChange("icon", icon)}
        onClose={() => setIconPickerOpen(false)}
      />
    </div>,
    document.body,
  );
}
