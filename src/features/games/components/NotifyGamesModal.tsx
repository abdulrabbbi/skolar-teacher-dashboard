import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import InputField from "../../../shared/components/ui/InputField";
import Button from "../../../shared/components/ui/Button";

type Props = {
  open: boolean;
  initialEmail?: string | null;
  onClose: () => void;
  onSubmit: (email: string) => void;
};

function isValidEmail(value: string) {
  const email = value.trim();
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NotifyGamesModal({
  open,
  initialEmail,
  onClose,
  onSubmit,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setEmail((initialEmail ?? "").trim());
    setError(null);
  }, [open, initialEmail]);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const canSubmit = useMemo(() => isValidEmail(email), [email]);

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    onSubmit(trimmed);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1002] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-[520px] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-slate-900">
                  Get notified
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  We’ll email you when Games launches.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <InputField
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                autoComplete="email"
                inputMode="email"
              />

              {error ? (
                <div className="text-sm font-medium text-rose-600">{error}</div>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" className="rounded-xl" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="rounded-xl bg-[#FF9D00] hover:bg-[#f29300] focus-visible:ring-[#FF9D00]"
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

