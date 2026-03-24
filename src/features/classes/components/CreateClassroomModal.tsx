import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Folder, Plus, School, Users, X } from "lucide-react";

import Button from "../../../shared/components/ui/Button";
import { cn } from "../../../shared/lib/cn";

export type CreateClassroomPayload = {
  title: string;
  description?: string;
  imageUrl?: string;
};

export type CreateClassroomModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: CreateClassroomPayload) => void;
  primaryLabel?: string;
  heading?: string;
  initialValues?: CreateClassroomPayload;
};

const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
}

export default function CreateClassroomModal({
  open,
  onClose,
  onCreate,
  primaryLabel = "Create Classroom",
  heading = "Create a New Classroom",
  initialValues,
}: CreateClassroomModalProps) {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const subtitle = useMemo(() => {
    const value = description.trim();
    if (!value) return "A place to manage students, analytics, and content.";
    return value.length > 110 ? `${value.slice(0, 110)}…` : value;
  }, [description]);

  useEffect(() => {
    if (!open) return;
    setTitle(initialValues?.title ?? "");
    setDescription(initialValues?.description ?? "");
    setImageUrl(initialValues?.imageUrl);
    setError(null);
    setBusy(false);
    // Small delay to ensure the portal is mounted before focusing.
    const t = window.setTimeout(() => nameInputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [initialValues?.description, initialValues?.imageUrl, initialValues?.title, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    return () => {
      // Reset draft when closing, so it always feels "fresh".
      setTitle("");
      setDescription("");
      setImageUrl(undefined);
      setError(null);
      setBusy(false);
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  const handlePickImage = () => fileInputRef.current?.click();

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG/JPG/WebP).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image is too large. Please choose one under 2MB.");
      return;
    }

    setError(null);
    try {
      setBusy(true);
      const dataUrl = await readFileAsDataUrl(file);
      setImageUrl(dataUrl);
    } catch {
      setError("Could not load that image. Please try another file.");
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Classroom name is required.");
      nameInputRef.current?.focus();
      return;
    }

    onCreate({
      title: trimmed,
      description: description.trim() ? description.trim() : undefined,
      imageUrl,
    });
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-slate-900/35 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden={!open}
        >
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={heading}
            className="
              absolute left-1/2 top-1/2 w-[calc(100%-24px)]
              max-w-5xl -translate-x-1/2 -translate-y-1/2
              overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl
            "
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              {/* LEFT: form */}
              <div className="p-7 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">{heading}</h2>

                <div className="mt-6 space-y-5">
                  {/* Image picker */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={handlePickImage}
                        className={cn(
                          "relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-slate-400",
                          busy && "opacity-70",
                        )}
                        aria-label="Choose classroom image"
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <School className="h-8 w-8 text-slate-500" />
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 bg-white/80 px-2 py-1 text-center text-[11px] font-semibold text-slate-700">
                          {imageUrl ? "Change" : "Upload"}
                        </div>
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          void handleFileChange(e.target.files?.[0] ?? null);
                          // Allow re-selecting the same file.
                          e.currentTarget.value = "";
                        }}
                      />
                    </div>

                    <div className="min-w-0 pt-1">
                      <p className="text-sm font-semibold text-slate-900">
                        Classroom image
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Pick any image you like (PNG/JPG/WebP). We’ll use it as
                        your classroom cover.
                      </p>
                      {imageUrl ? (
                        <button
                          type="button"
                          onClick={() => setImageUrl(undefined)}
                          className="mt-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
                        >
                          Remove image
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {/* Name */}
                  <label className="block space-y-2">
                    <span className="text-sm font-semibold text-slate-900">
                      Name<span className="text-rose-500">*</span>
                    </span>
                    <input
                      ref={nameInputRef}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Classroom Name"
                      className="
                        h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900
                        placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200
                      "
                    />
                  </label>

                  {/* Description */}
                  <label className="block space-y-2">
                    <span className="text-sm font-semibold text-slate-900">
                      Description{" "}
                      <span className="text-sm font-normal text-slate-500">
                        (optional)
                      </span>
                    </span>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Classroom Description"
                      className="
                        min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900
                        placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200
                      "
                    />
                  </label>

                  {error ? (
                    <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                      {error}
                    </p>
                  ) : null}

                  <div className="pt-1">
                    <Button
                      type="button"
                      size="lg"
                      variant="primary"
                      className="h-12 w-full rounded-2xl"
                      onClick={handleSubmit}
                      disabled={busy}
                    >
                      <Plus className="h-4 w-4" />
                      {primaryLabel}
                    </Button>
                  </div>
                </div>
              </div>

              {/* RIGHT: preview */}
              <div className="border-t border-slate-200 bg-slate-50 p-7 sm:p-8 md:border-l md:border-t-0">
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                      <School className="h-7 w-7 text-[#00B96B]" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-center text-xl font-bold text-slate-900">
                    {title.trim() ? title.trim() : "Create Your First Classroom"}
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-500">
                    {subtitle}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <Users className="h-5 w-5 text-[#2563EB]" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          Manage Students
                        </p>
                        <p className="text-xs text-slate-500">
                          Organize and track your class in one place
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <BarChart3 className="h-5 w-5 text-[#7C3AED]" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          Analytics & Insights
                        </p>
                        <p className="text-xs text-slate-500">
                          Get detailed progress tracking and learning analytics
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <Folder className="h-5 w-5 text-[#F59E0B]" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          Curated Spaces
                        </p>
                        <p className="text-xs text-slate-500">
                          Keep study sets, quizzes, and resources organized
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {imageUrl ? (
                  <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                    <img
                      src={imageUrl}
                      alt=""
                      className="h-36 w-full object-cover"
                    />
                    <div className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        Classroom cover preview
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        This image will show up on your classroom card.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
