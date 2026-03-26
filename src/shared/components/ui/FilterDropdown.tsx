import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import Button from "./Button";

export type FilterDropdownOption = { value: string; label: string };

export type FilterDropdownProps = {
  label: string;
  value: string;
  options: ReadonlyArray<FilterDropdownOption>;
  onChange: (next: string) => void;
  className?: string;
};

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  className,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
  }>({ top: 0, left: 0, width: 220 });

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? label,
    [options, value, label],
  );

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const desiredWidth = Math.max(210, rect.width);

      setPosition({
        top: rect.bottom + 8,
        left: Math.min(rect.left, window.innerWidth - desiredWidth - 10),
        width: desiredWidth,
      });
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const inTrigger = triggerRef.current?.contains(target);
      const inMenu = menuRef.current?.contains(target);
      if (!inTrigger && !inMenu) setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <>
      <div ref={triggerRef} className="inline-flex">
        <Button
          size="sm"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((p) => !p)}
          className={[
            "flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5",
            "!bg-gray-100 hover:!bg-gray-200 !text-slate-700",
            "!border !border-slate-200 !shadow-none",
            className ?? "",
          ].join(" ")}
        >
          {selectedLabel}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              className="z-[9999] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
              style={{
                position: "fixed",
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${position.width}px`,
              }}
            >
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {label}
              </div>
              <div className="max-h-72 overflow-auto py-1">
                {options.map((opt) => {
                  const selected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className={[
                        "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm",
                        "hover:bg-slate-50",
                        selected
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-slate-700",
                      ].join(" ")}
                    >
                      <span className="truncate">{opt.label}</span>
                      {selected ? (
                        <span className="text-[11px] font-semibold">
                          Selected
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

