
// import { X } from 'lucide-react';
// import Button from '../../../shared/components/ui/Button';
// import Card from '../../../shared/components/ui/Card';
// import InputField from '../../../shared/components/ui/InputField';
// import SelectField from '../../../shared/components/ui/SelectField';
// import type { AssessmentSelectOption } from '../data/assessments.mock';

// export type CreateAssessmentModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   typeOptions: AssessmentSelectOption[];
//   classOptions: AssessmentSelectOption[];
//   defaultType: string;
//   defaultClass: string;
// };

// export default function CreateAssessmentModal({
//   isOpen,
//   onClose,
//   typeOptions,
//   classOptions,
//   defaultType,
//   defaultClass,
// }: CreateAssessmentModalProps) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40"
//         role="presentation"
//         onClick={onClose}
//       />
//       <Card className="relative z-10 w-full max-w-2xl space-y-4 p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
//               Create Assessment
//             </h2>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 group"
//             aria-label="Close"
//           >
//             <X className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <InputField label="Name" />
//           <SelectField label="Type" defaultValue={defaultType}>
//             {typeOptions.map((option) => (
//               <option key={option.id} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </SelectField>
//           <SelectField label="Class" defaultValue={defaultClass}>
//             {classOptions.map((option) => (
//               <option key={option.id} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </SelectField>
//           <InputField label="Due Date" type="date" />
//         </div>

//         <label className="block space-y-1">
//           <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//             Description
//           </span>
//           <textarea
//             rows={4}
//             className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
//           />
//         </label>

//         <div className="flex justify-end gap-2">
//           <Button
//             variant="secondary"
//             onClick={onClose}
//             className="transition-all duration-200 hover:-translate-y-0.5"
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="success"
//             className="transition-all duration-200 hover:-translate-y-0.5"
//           >
//             Create
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }


import { X } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import InputField from "../../../shared/components/ui/InputField";
import SelectField from "../../../shared/components/ui/SelectField";
import type { AssessmentSelectOption } from "../data/assessments.mock";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40"
        role="presentation"
        onClick={onClose}
      />

      <Card className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xl">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Create Assessment
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Add a new assessment to your list.
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

        {/* BODY (line by line like image) */}
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Name</div>
            <div className="min-w-0">
              <InputField label="" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Type</div>
            <div className="min-w-0">
              <SelectField label="" defaultValue={defaultType}>
                {typeOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Class</div>
            <div className="min-w-0">
              <SelectField label="" defaultValue={defaultClass}>
                {classOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[120px_1fr]">
            <div className="text-sm text-slate-700">Due Date</div>
            <div className="min-w-0">
              <InputField label="" type="date" />
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-[120px_1fr]">
            <div className="pt-2 text-sm text-slate-700">Description</div>
            <div className="min-w-0">
              <textarea
                rows={3}
                placeholder=" "
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="h-10 px-4 transition-all duration-200 hover:-translate-y-0.5"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="h-10 px-5 transition-all duration-200 hover:-translate-y-0.5"
          >
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
}