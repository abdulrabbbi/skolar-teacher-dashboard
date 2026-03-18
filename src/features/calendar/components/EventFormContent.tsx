import * as React from "react";
import { Calendar, CheckSquare } from "lucide-react";

import { renderIcon } from "./IconPickerModal";
import type { EventType } from "../data/calendar.mock";

export type EventFormValues = {
  eventMode: "event" | "task";
  type: EventType;
  title: string;
  className: string;
  icon: string;
  color: string;
  description: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
  reminders: string[];
  tags: string[];
};

const EVENT_TYPES: EventType[] = ["Class", "Exam", "Deadline", "SAC", "Meeting"];

const REMINDER_OPTIONS = [
  "30 minutes before",
  "1 hour before",
  "1 day before",
  "3 days before",
  "1 week before",
  "2 weeks before",
  "1 month before",
];

type Props = {
  values: EventFormValues;
  onChange: <K extends keyof EventFormValues>(field: K, value: EventFormValues[K]) => void;
  onOpenIconPicker: () => void;
};

export default function EventFormContent({ values, onChange, onOpenIconPicker }: Props) {
  const [tagInput, setTagInput] = React.useState("");
  const colorRef = React.useRef<HTMLInputElement>(null);

  const toggleReminder = (option: string) => {
    const next = values.reminders.includes(option)
      ? values.reminders.filter((r) => r !== option)
      : [...values.reminders, option];
    onChange("reminders", next);
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !values.tags.includes(trimmed)) {
      onChange("tags", [...values.tags, trimmed]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    onChange("tags", values.tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-4">
      {/* Event Title */}
      <Field label="Event Title" required>
        <input
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g., Study Group Meeting"
          className={inputClass}
        />
      </Field>

      {/* Event / Task toggle */}
      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-1">
        <TabButton
          active={values.eventMode === "event"}
          onClick={() => onChange("eventMode", "event")}
          icon={<Calendar className="h-4 w-4" />}
          label="Event"
        />
        <TabButton
          active={values.eventMode === "task"}
          onClick={() => onChange("eventMode", "task")}
          icon={<CheckSquare className="h-4 w-4" />}
          label="Task"
        />
      </div>

      {/* Type + Class Name */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Type">
          <select
            value={values.type}
            onChange={(e) => onChange("type", e.target.value as EventType)}
            className={inputClass}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Class Name">
          <input
            value={values.className}
            onChange={(e) => onChange("className", e.target.value)}
            placeholder="Class Name"
            className={inputClass}
          />
        </Field>
      </div>

      {/* Icon + Color */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Icon">
          <button
            type="button"
            onClick={onOpenIconPicker}
            className="flex h-11 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 transition hover:bg-slate-50"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
              {renderIcon(values.icon || "AtSign", "h-4 w-4")}
            </span>
            <span className="text-slate-500">Select Icon</span>
          </button>
        </Field>

        <Field label="Color" required>
          <button
            type="button"
            onClick={() => colorRef.current?.click()}
            className="flex h-11 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm transition hover:bg-slate-50"
          >
            <span
              className="h-7 w-7 flex-shrink-0 rounded-lg"
              style={{ backgroundColor: values.color }}
            />
            <span className="text-slate-700">{values.color.toUpperCase()}</span>
          </button>
          <input
            ref={colorRef}
            type="color"
            value={values.color}
            onChange={(e) => onChange("color", e.target.value)}
            className="sr-only"
          />
        </Field>
      </div>

      {/* Description */}
      <Field label="Description">
        <textarea
          value={values.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Description"
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
        />
      </Field>

      {/* Start + End Time */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start Time" required>
          <input
            type="datetime-local"
            value={values.startTime}
            onChange={(e) => onChange("startTime", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="End Time" required>
          <input
            type="datetime-local"
            value={values.endTime}
            onChange={(e) => onChange("endTime", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Recurring Event */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">Recurring Event</p>
          <p className="text-xs text-slate-500">Make this event repeat automatically</p>
        </div>
        <ToggleSwitch
          checked={values.recurring}
          onChange={(v) => onChange("recurring", v)}
        />
      </div>

      {/* Reminders */}
      <div>
        <p className="mb-2 text-sm font-semibold text-slate-800">Reminders</p>
        <div className="flex flex-wrap gap-2">
          {REMINDER_OPTIONS.map((option) => {
            const active = values.reminders.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleReminder(option)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div>
        <p className="mb-2 text-sm font-semibold text-slate-800">Tags</p>
        <div className="flex items-center gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Add a tag..."
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
          />
          <button
            type="button"
            onClick={addTag}
            className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <span className="text-lg leading-none">+</span>
            <span>Create Tag</span>
          </button>
        </div>

        {values.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {values.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-50";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-red-500">*</span>}
      </div>
      {children}
    </label>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
        active
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-[#1363FF]" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
