import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { EventType } from "../data/calendar.mock";

export type AddEventFormValues = {
  type: EventType;
  title: string;
  date: string;
  time: string;
  className: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddEventFormValues) => void;
  mode?: "add" | "edit";
  initialValues?: Partial<AddEventFormValues> | null;
};

const EVENT_TYPES: EventType[] = ["Class", "Exam", "Deadline"];

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AddEventModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  initialValues,
}: Props) {
  const [type, setType] = React.useState<EventType>("Class");
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState(toISODate(new Date()));
  const [time, setTime] = React.useState("");
  const [className, setClassName] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) return;

    setType((initialValues?.type as EventType) ?? "Class");
    setTitle(initialValues?.title ?? "");
    setDate(initialValues?.date ?? toISODate(new Date()));
    setTime(initialValues?.time ?? "");
    setClassName(initialValues?.className ?? "");
  }, [initialValues, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isEditing = mode === "edit";

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="flex max-h-[90vh] w-full max-w-[500px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-start justify-between px-5 pt-5">
            <div>
              <h2 className="text-[18px] font-semibold text-slate-900">
                {isEditing ? "Edit Event" : "Add Event"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {isEditing
                  ? "Update the event details for your calendar."
                  : "Add a new event to your calendar."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              onSubmit({
                type,
                title: title.trim(),
                date,
                time,
                className: className.trim(),
              });
            }}
            className="mt-4 flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-4">
              <Field label="Type">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as EventType)}
                  className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                >
                  {EVENT_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Class">
                <input
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Class Name"
                  className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </Field>

              <Field label="Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Event Title"
                  className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </Field>

              <Field label="Date">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </Field>

              <Field label="Time">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-slate-100 px-5 py-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-11 rounded-2xl bg-[#00B96B] px-4 text-sm font-semibold text-white transition hover:opacity-95"
              >
                {isEditing ? "Save Changes" : "Add Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-600">{label}</div>
      {children}
    </label>
  );
}