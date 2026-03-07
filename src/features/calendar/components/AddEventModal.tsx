/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import InputField from "../../../shared/components/ui/InputField";
import SelectField from "../../../shared/components/ui/SelectField";
import type { EventType } from "../data/calendar.mock";

export type AddEventFormValues = {
  type: EventType;
  colour: string;
  title: string;
  date: string;
  time: string;
  className: string;
  description: string;
};

export type AddEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: AddEventFormValues) => void;
};

const fieldClass =
  "h-11 !rounded-xl !bg-slate-100 !border-transparent !shadow-none " +
  "focus:!border-transparent focus:!outline-none focus:!ring-0 focus-visible:!ring-0";

const initialValues: AddEventFormValues = {
  type: "SAC",
  colour: "",
  title: "",
  date: "",
  time: "",
  className: "",
  description: "",
};

export default function AddEventModal({
  isOpen,
  onClose,
  onSubmit,
}: AddEventModalProps) {
  const [values, setValues] = useState<AddEventFormValues>(initialValues);

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = values.title.trim();
    if (!title || !values.date) return;

    onSubmit?.({
      ...values,
      title,
      className: values.className.trim(),
      description: values.description.trim(),
    });

    onClose();
  };

  const isSubmitDisabled = !values.title.trim() || !values.date;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40"
        role="presentation"
        onClick={onClose}
      />

      <Card
        className="
          relative z-10 w-full max-w-md
          rounded-2xl border border-slate-200 bg-white
          p-4 shadow-sm sm:p-5
        "
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                Add Event
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Add a new event to your calendar.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
              <div className="text-sm text-slate-700">Type</div>
              <div className="min-w-0">
                <SelectField
                  className={fieldClass}
                  label=""
                  value={values.type}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      type: event.target.value as EventType,
                    }))
                  }
                >
                  <option value="SAC">SAC</option>
                  <option value="Exam">Exam</option>
                  <option value="Deadline">Deadline</option>
                  <option value="Class">Class</option>
                  <option value="Meeting">Meeting</option>
                </SelectField>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
              <div className="text-sm text-slate-700">Colour</div>
              <div className="min-w-0">
                <SelectField
                  className={fieldClass}
                  label=""
                  value={values.colour}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, colour: event.target.value }))
                  }
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Purple">Purple</option>
                  <option value="Red">Red</option>
                  <option value="Orange">Orange</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                </SelectField>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
              <div className="text-sm text-slate-700">Title</div>
              <div className="min-w-0">
                <InputField
                  className={fieldClass}
                  label=""
                  placeholder="Event Title"
                  value={values.title}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, title: event.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
              <div className="text-sm text-slate-700">Date</div>
              <div className="min-w-0">
                <InputField
                  className={fieldClass}
                  label=""
                  type="date"
                  value={values.date}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, date: event.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
              <div className="text-sm text-slate-700">Time</div>
              <div className="min-w-0">
                <InputField
                  className={fieldClass}
                  label=""
                  type="time"
                  value={values.time}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, time: event.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
              <div className="text-sm text-slate-700">Class</div>
              <div className="min-w-0">
                <InputField
                  className={fieldClass}
                  label=""
                  placeholder="Class Name"
                  value={values.className}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      className: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-[120px_1fr]">
              <div className="pt-2 text-sm text-slate-700">Description</div>
              <div className="min-w-0">
                <textarea
                  rows={3}
                  placeholder="Event Description"
                  value={values.description}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  className="
                    w-full rounded-xl border border-transparent
                    bg-slate-100 px-3 py-2
                    text-sm text-slate-900 placeholder:text-slate-400
                    outline-none focus:border-transparent focus:outline-none focus:ring-0
                  "
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              variant="success"
              className="h-10 rounded-xl px-5"
              type="submit"
              disabled={isSubmitDisabled}
            >
              Add Event
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}