import Card from '../../../shared/components/ui/Card';

type Props = {
  onBack: () => void;
};

export default function SubmissionTopBar({ onBack }: Props) {
  return (
    <Card className="p-3 sm:p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between gap-3">
        {/* BACK */}
        <button
          onClick={onBack}
          className="text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-900"
        >
          ← Back
        </button>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <button className="rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50">
            + Add Student
          </button>
          <button className="rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50">
            Export
          </button>
        </div>
      </div>
    </Card>
  );
}
