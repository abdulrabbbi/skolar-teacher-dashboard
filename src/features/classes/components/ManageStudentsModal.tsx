import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Mail, UserPlus, X } from "lucide-react";

import Button from "../../../shared/components/ui/Button";
import { cn } from "../../../shared/lib/cn";

export type ManageStudentsModalProps = {
  open: boolean;
  onClose: () => void;
  inviteLink: string;
  inviteCode: string;
  onAddDirect: (email: string) => void;
  defaultTab?: "invite" | "direct";
};

function isValidEmail(value: string) {
  // Simple, safe-enough UI validation for demo/local storage.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function copyToClipboard(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  // Fallback: create a temporary input to copy from.
  const el = document.createElement("input");
  el.value = value;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export default function ManageStudentsModal({
  open,
  onClose,
  inviteLink,
  inviteCode,
  onAddDirect,
  defaultTab = "invite",
}: ManageStudentsModalProps) {
  const [tab, setTab] = useState<"invite" | "direct">(defaultTab);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"link" | "code" | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);

  const joinInstructions = useMemo(
    () =>
      `Students can also join by going to https://www.studyfetch.com/classrooms and entering the code: ${inviteCode}`,
    [inviteCode],
  );

  useEffect(() => {
    if (!open) return;
    if (tab !== "direct") return;
    const t = window.setTimeout(() => emailRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [open, tab]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const onCopy = async (value: string, which: "link" | "code") => {
    setCopied(null);
    await copyToClipboard(value);
    setCopied(which);
    window.setTimeout(() => setCopied(null), 1200);
  };

  const handleSendInvite = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter a student email address.");
      emailRef.current?.focus();
      return;
    }
    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    setError(null);
    onAddDirect(trimmed);
    setEmail("");
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
            aria-label="Manage students"
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

            <div className="px-7 pb-6 pt-7 sm:px-10 sm:pb-8 sm:pt-8">
              {/* Tabs */}
              <div className="flex items-center justify-center gap-10 border-b border-slate-200 pb-4">
                <button
                  type="button"
                  onClick={() => setTab("invite")}
                  className={cn(
                    "relative text-sm font-semibold text-slate-500",
                    tab === "invite" && "text-slate-900",
                  )}
                >
                  Send Invite
                  {tab === "invite" ? (
                    <span className="absolute -bottom-4 left-0 right-0 h-[3px] rounded-full bg-[#2563EB]" />
                  ) : null}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("direct")}
                  className={cn(
                    "relative text-sm font-semibold text-slate-500",
                    tab === "direct" && "text-slate-900",
                  )}
                >
                  Add Directly
                  {tab === "direct" ? (
                    <span className="absolute -bottom-4 left-0 right-0 h-[3px] rounded-full bg-[#2563EB]" />
                  ) : null}
                </button>
              </div>

              {tab === "invite" ? (
                <div className="mx-auto max-w-3xl pt-8">
                  <h3 className="text-center text-2xl font-bold text-slate-900">
                    Invite your students with a link
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-500">
                    They’ll create or connect their account and be added to this
                    classroom.
                  </p>

                  <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700">
                        <span className="block truncate">{inviteLink}</span>
                      </div>

                      <Button
                        size="lg"
                        variant="primary"
                        className="h-12 rounded-xl px-6"
                        onClick={() => void onCopy(inviteLink, "link")}
                      >
                        <Copy className="h-4 w-4" />
                        {copied === "link" ? "Copied" : "Copy"}
                      </Button>
                    </div>

                    <div className="my-7 flex items-center gap-4">
                      <div className="h-px flex-1 bg-slate-200" />
                      <span className="text-sm font-semibold text-slate-500">
                        OR
                      </span>
                      <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-slate-600">{joinInstructions}</p>

                      <Button
                        size="lg"
                        variant="primary"
                        className="h-12 rounded-xl px-6"
                        onClick={() => void onCopy(inviteCode, "code")}
                      >
                        <Copy className="h-4 w-4" />
                        {copied === "code" ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-3xl pt-8">
                  <h3 className="text-center text-2xl font-bold text-slate-900">
                    Add students directly
                  </h3>
                  <p className="mt-2 text-center text-sm text-slate-500">
                    Enter a student’s email address to send them an invitation.
                  </p>

                  <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                          <UserPlus className="h-5 w-5 text-[#2563EB]" />
                        </div>
                        <input
                          ref={emailRef}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter student email address"
                          className="h-10 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                          inputMode="email"
                        />
                      </div>

                      <Button
                        size="lg"
                        variant="primary"
                        className="h-12 rounded-xl px-7"
                        onClick={handleSendInvite}
                      >
                        <Mail className="h-4 w-4" />
                        Send Invite
                      </Button>
                    </div>

                    {error ? (
                      <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        {error}
                      </p>
                    ) : null}

                    <div className="mt-5 flex items-start gap-3 text-sm text-slate-500">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200">
                        i
                      </span>
                      <p>
                        Students will receive an email invitation and can join by
                        creating or logging into their account.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-slate-200 pt-6 text-right">
                <Button size="lg" variant="primary" className="h-12 rounded-xl px-8" onClick={onClose}>
                  Close
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
