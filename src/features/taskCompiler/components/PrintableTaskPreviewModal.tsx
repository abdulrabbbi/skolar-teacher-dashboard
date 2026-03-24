import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Printer, X } from "lucide-react";

import Button from "../../../shared/components/ui/Button";

export type PrintableTaskPreviewModalProps = {
  open: boolean;
  title: string;
  html: string;
  onClose: () => void;
};

export default function PrintableTaskPreviewModal({
  open,
  title,
  html,
  onClose,
}: PrintableTaskPreviewModalProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [ready, setReady] = useState(false);

  if (typeof document === "undefined") return null;

  const handlePrint = () => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.focus();
    win.print();
  };

  const handleOpenNewTab = () => {
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) return;
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
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
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Task preview"
            className="
              absolute left-1/2 top-1/2 w-[calc(100%-24px)]
              max-w-6xl -translate-x-1/2 -translate-y-1/2
              overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl
            "
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Preview your generated task before printing.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-10 rounded-xl"
                  onClick={handleOpenNewTab}
                >
                  <ExternalLink className="h-4 w-4" />
                  New tab
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  className="h-10 rounded-xl !bg-blue-600 hover:!bg-blue-700 focus-visible:ring-blue-600"
                  onClick={handlePrint}
                  disabled={!ready}
                >
                  <Printer className="h-4 w-4" />
                  Print
                </Button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="bg-slate-50/70 p-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <iframe
                  ref={iframeRef}
                  title="Task preview"
                  srcDoc={html}
                  className="h-[72vh] w-full"
                  onLoad={() => setReady(true)}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

