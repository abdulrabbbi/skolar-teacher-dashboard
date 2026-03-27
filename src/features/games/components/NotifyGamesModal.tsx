import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BellRing,
  CheckCircle2,
  Gamepad2,
  Mail,
  Sparkles,
  X,
} from "lucide-react";

import { cn } from "../../../shared/lib/cn";

type Props = {
  open: boolean;
  initialEmail?: string | null;
  onClose: () => void;
  onSubmit: (email: string) => void;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NotifyGamesModal({
  open,
  initialEmail,
  onClose,
  onSubmit,
}: Props) {
  const emailInputId = useId();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    if (!open) return;

    setEmail((initialEmail ?? "").trim());
    setError(null);
    setSubmitted(false);

    const frameId = window.requestAnimationFrame(() => {
      emailInputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [open, initialEmail]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const handleSubmit = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Enter an email address so we can notify you.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmittedEmail(trimmedEmail);
    setSubmitted(true);
    setError(null);
    onSubmit(trimmedEmail);
  };

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[9998] bg-slate-950/35 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={emailInputId}
            className="fixed inset-0 z-[9999] grid place-items-center p-4"
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className={cn(
                "w-full max-w-[560px] overflow-hidden rounded-[28px]",
                "border border-white/60 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.28)]",
              )}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative overflow-hidden bg-linear-to-br from-[#00B96B] via-[#009f5c] to-[#017517] px-6 pb-6 pt-5 text-white sm:px-7">
                <div className="pointer-events-none absolute inset-0 opacity-35">
                  <div className="absolute -left-20 top-4 h-44 w-44 rounded-full bg-white blur-[90px]" />
                  <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-white blur-[88px]" />
                </div>

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                      <Sparkles className="h-3.5 w-3.5" />
                      Games Launch List
                    </div>

                    <h2
                      id={emailInputId}
                      className="mt-4 max-w-md text-2xl font-extrabold leading-tight sm:text-[30px]"
                    >
                      {submitted
                        ? "You are on the Games launch list"
                        : "Notify me when Games launches"}
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
                      {submitted
                        ? "We will send the launch update straight to your inbox as soon as Games opens on SKOLAR."
                        : "Be first in line for competitive learning, live leaderboards, and launch-day access when Games goes live."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition hover:bg-white/15"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-5 px-6 py-6 sm:px-7">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      icon: <BellRing className="h-4 w-4" />,
                      title: "Launch alert",
                      body: "Get the Games release email as soon as access opens.",
                    },
                    {
                      icon: <Gamepad2 className="h-4 w-4" />,
                      title: "Live games",
                      body: "Create and run classroom challenges with your students in real time.",
                    },
                    {
                      icon: <Sparkles className="h-4 w-4" />,
                      title: "Early interest",
                      body: "Let us know this feature matters to your teaching flow.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#00B96B] text-white">
                        {item.icon}
                      </div>
                      <div className="mt-3 text-sm font-semibold text-slate-900">
                        {item.title}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                {submitted ? (
                  <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-emerald-950">
                          Launch reminder saved
                        </div>
                        <p className="mt-1 text-sm leading-6 text-emerald-900/80">
                          We will notify{" "}
                          <span className="font-semibold">
                            {submittedEmail}
                          </span>{" "}
                          when Games launches.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setError(null);
                          window.requestAnimationFrame(() =>
                            emailInputRef.current?.focus(),
                          );
                        }}
                        className="inline-flex h-11 items-center justify-center rounded-2xl border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
                      >
                        Use a different email
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                    <label
                      htmlFor={`${emailInputId}-email`}
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900"
                    >
                      <Mail className="h-4 w-4 text-slate-500" />
                      Email address
                    </label>

                    <input
                      id={`${emailInputId}-email`}
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (error) setError(null);
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter") return;
                        event.preventDefault();
                        handleSubmit();
                      }}
                      placeholder="name@example.com"
                      className={cn(
                        "h-12 w-full rounded-2xl border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition",
                        error
                          ? "border-rose-300 focus:border-rose-400"
                          : "border-slate-200 focus:border-slate-300",
                      )}
                    />

                    <p
                      className={cn(
                        "mt-2 text-xs leading-5",
                        error ? "text-rose-600" : "text-slate-500",
                      )}
                    >
                      {error ?? "We only use this to send the Games launch update."}
                    </p>

                    <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#00B96B] px-5 text-sm font-semibold text-white transition hover:bg-[#009f5c]"
                      >
                        <BellRing className="h-4 w-4" />
                        Notify me
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
