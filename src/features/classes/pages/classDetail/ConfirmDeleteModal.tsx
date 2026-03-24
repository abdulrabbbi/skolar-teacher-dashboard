import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../../../shared/components/ui/Button";

export type ConfirmDeleteModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-9999 bg-slate-900/35 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="
              absolute left-1/2 top-1/2 w-[calc(100%-24px)]
              max-w-lg -translate-x-1/2 -translate-y-1/2
              overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl
            "
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-7 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              {description ? (
                <p className="mt-2 text-sm text-slate-500">{description}</p>
              ) : null}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl px-7"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-rose-300! bg-rose-600! text-white! hover:bg-rose-700!"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

