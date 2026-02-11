
import { X } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';
import InputField from '../../../shared/components/ui/InputField';
import SelectField from '../../../shared/components/ui/SelectField';
import type { AssessmentSelectOption } from '../data/assessments.mock';

export type CreateAssessmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  typeOptions: AssessmentSelectOption[];
  classOptions: AssessmentSelectOption[];
  defaultType: string;
  defaultClass: string;
};

export default function CreateAssessmentModal({
  isOpen,
  onClose,
  typeOptions,
  classOptions,
  defaultType,
  defaultClass,
}: CreateAssessmentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        role="presentation"
        onClick={onClose}
      />
      <Card className="relative z-10 w-full max-w-2xl space-y-4 p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Create Assessment
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 group"
            aria-label="Close"
          >
            <X className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField label="Name" />
          <SelectField label="Type" defaultValue={defaultType}>
            {typeOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <SelectField label="Class" defaultValue={defaultClass}>
            {classOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <InputField label="Due Date" type="date" />
        </div>

        <label className="block space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Description
          </span>
          <textarea
            rows={4}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="transition-all duration-200 hover:-translate-y-0.5"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="transition-all duration-200 hover:-translate-y-0.5"
          >
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
}
