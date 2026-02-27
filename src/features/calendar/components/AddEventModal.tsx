import { X } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import InputField from "../../../shared/components/ui/InputField";
import SelectField from "../../../shared/components/ui/SelectField";

export type AddEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const fieldClass =
  // Figma-like: grey fill, no border, no ring/outline, rounded
  "h-11 !rounded-xl !bg-slate-100 !border-transparent !shadow-none " +
  "focus:!border-transparent focus:!outline-none focus:!ring-0 focus-visible:!ring-0";

export default function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
  if (!isOpen) return null;

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
          p-4 sm:p-5
          shadow-sm
        "
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Add Event
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Add a new event to your calendar.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Type</div>
            <div className="min-w-0">
              <SelectField className={fieldClass} label="" defaultValue="SAC">
                <option value="SAC">SAC</option>
                <option value="Exam">Exam</option>
                <option value="Deadline">Deadline</option>
                <option value="Class">Class</option>
                <option value="Meeting">Meeting</option>
              </SelectField>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Color</div>
            <div className="min-w-0">
              <SelectField className={fieldClass} label="" defaultValue="">
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
              <InputField className={fieldClass} label="" placeholder="Event Title" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Date</div>
            <div className="min-w-0">
              <InputField className={fieldClass} label="" type="date" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Time</div>
            <div className="min-w-0">
              <InputField className={fieldClass} label="" type="time" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Class</div>
            <div className="min-w-0">
              <InputField className={fieldClass} label="" placeholder="Class Name" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-[120px_1fr]">
            <div className="pt-2 text-sm text-slate-700">Description</div>
            <div className="min-w-0">
              <textarea
                rows={3}
                placeholder="Event Description"
                className="
                  w-full rounded-xl bg-slate-100 px-3 py-2
                  text-sm text-slate-900 placeholder:text-slate-400
                  border border-transparent
                  outline-none focus:outline-none focus:ring-0 focus:border-transparent
                "
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button variant="success" className="h-10 px-5 rounded-xl">
            Add Event
          </Button>
        </div>
      </Card>
    </div>
  );
}