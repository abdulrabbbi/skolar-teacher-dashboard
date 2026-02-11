
import { X } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import InputField from '../../../shared/components/ui/InputField';
import SelectField from '../../../shared/components/ui/SelectField';

export type AddEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        role="presentation"
        onClick={onClose}
      />
      <Card className="relative z-10 w-full max-w-xl space-y-4 p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add Event</h2>
            <p className="text-sm text-slate-500">
              Add a new event to your calendar.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 group"
            aria-label="Close"
          >
            <X className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField label="Type" defaultValue="SAC">
            <option value="SAC">SAC</option>
            <option value="Exam">Exam</option>
            <option value="Deadline">Deadline</option>
            <option value="Class">Class</option>
            <option value="Meeting">Meeting</option>
          </SelectField>
          <SelectField label="Color" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option value="Purple">Purple</option>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
          </SelectField>
          <InputField label="Title" placeholder="Event Title" />
          <InputField label="Date" type="date" />
          <InputField label="Time" type="time" />
          <InputField label="Class" placeholder="Class Name" />
        </div>

        <label className="block space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Description
          </span>
          <textarea
            rows={4}
            placeholder="Event Description"
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <div className="flex justify-end">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200 hover:-translate-y-0.5">
            Add Event
          </Button>
        </div>
      </Card>
    </div>
  );
}
