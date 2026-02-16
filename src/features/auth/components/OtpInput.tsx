import { useEffect, useMemo, useRef } from "react";
import { cn } from "../../../shared/lib/cn";

type Props = {
  value: string; // digits only
  length?: number;
  onChange: (v: string) => void;
};

export function OtpInput({ value, length = 6, onChange }: Props) {
  const inputs = useMemo(() => Array.from({ length }), [length]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const setAt = (idx: number, digit: string) => {
    const arr = value.split("");
    while (arr.length < length) arr.push("");
    arr[idx] = digit;
    onChange(arr.join("").slice(0, length));
  };

  const handlePaste = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, length);
    onChange(digits.padEnd(length, ""));
    const last = Math.min(digits.length, length - 1);
    refs.current[last]?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {inputs.map((_, idx) => {
        const digit = value[idx] ?? "";
        return (
          <input
            key={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            value={digit}
            onChange={(e) => {
              const d = e.target.value.replace(/\D/g, "").slice(-1);
              setAt(idx, d);
              if (d && idx < length - 1) refs.current[idx + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digit && idx > 0) {
                refs.current[idx - 1]?.focus();
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
              handlePaste(e.clipboardData.getData("text"));
            }}
            className={cn(
              "h-10 w-10 rounded-xl border border-slate-200 bg-white text-center text-sm font-semibold text-slate-900 shadow-sm",
              "focus:border-green-400 focus:outline-none",
            )}
            inputMode="numeric"
            maxLength={1}
          />
        );
      })}
    </div>
  );
}
