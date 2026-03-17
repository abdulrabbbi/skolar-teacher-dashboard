import { useMemo, useRef, useState, type FormEvent } from "react";
import { Upload, X } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import InputField from "../../../shared/components/ui/InputField";

export type AddToCrossMarkPayload = {
  studentName: string;
  assessment: string;
  files: File[];
};

export type AddToCrossMarkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: AddToCrossMarkPayload) => void;
};

export default function AddToCrossMarkModal({
  isOpen,
  onClose,
  onSubmit,
}: AddToCrossMarkModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const [studentName, setStudentName] = useState("");
  const [assessment, setAssessment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const fileSummary = useMemo(() => {
    if (files.length === 0) return "No files selected";
    if (files.length === 1) return files[0]?.name ?? "1 file selected";
    return `${files.length} files selected`;
  }, [files]);

  if (!isOpen) return null;

  const addFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    setFiles((previous) => [...previous, ...Array.from(incoming)]);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (files.length === 0) {
      setError("Attach at least one file to cross-mark.");
      return;
    }

    onSubmit?.({
      studentName: studentName.trim(),
      assessment: assessment.trim(),
      files,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40"
        role="presentation"
        onClick={onClose}
      />

      <Card className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                Add to Cross-Mark
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Scan or upload student work — SKOLAR AI will cross-mark it.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-slate-700" />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InputField
                label="Student name (optional)"
                placeholder="e.g. Ariana Shah"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />

              <InputField
                label="Assessment (optional)"
                placeholder="e.g. SAC 2: Calculus"
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
              />
            </div>

            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">Work files</p>
                  <p className="mt-0.5 text-xs text-slate-500">{fileSummary}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-xl px-4"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    Scan
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 gap-2 rounded-xl px-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,application/pdf"
                multiple
                onChange={(e) => addFiles(e.target.files)}
              />
              <input
                ref={cameraInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                capture="environment"
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </div>

          <div className="mt-6 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-xl px-5"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              className="h-10 rounded-xl px-5"
            >
              Upload &amp; Cross-Mark
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
