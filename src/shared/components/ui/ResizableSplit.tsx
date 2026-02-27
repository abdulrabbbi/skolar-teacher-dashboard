import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";
import {
  clamp,
  leftPxToSplitPct,
  resolveLeftBoundsPx,
  splitPctToLeftPx,
} from "../../lib/splitter";

const DEFAULT_STORAGE_KEY = "resizableSplit:splitPct";
const DEFAULT_SPLIT_PCT = 62;
const DEFAULT_MIN_LEFT_PCT = 45;
const DEFAULT_MAX_LEFT_PCT = 78;
const DEFAULT_MIN_RIGHT_PX = 360;
const DEFAULT_HANDLE_WIDTH_PX = 12;

export type ResizableSplitProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  storageKey?: string;
  defaultSplitPct?: number;
  minLeftPct?: number;
  maxLeftPct?: number;
  minRightPx?: number;
  handleWidthPx?: number;
};

export default function ResizableSplit({
  left,
  right,
  className,
  leftClassName,
  rightClassName,
  storageKey = DEFAULT_STORAGE_KEY,
  defaultSplitPct = DEFAULT_SPLIT_PCT,
  minLeftPct = DEFAULT_MIN_LEFT_PCT,
  maxLeftPct = DEFAULT_MAX_LEFT_PCT,
  minRightPx = DEFAULT_MIN_RIGHT_PX,
  handleWidthPx = DEFAULT_HANDLE_WIDTH_PX,
}: ResizableSplitProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sanitizedHandleWidthPx = Math.max(1, Math.round(handleWidthPx));
  const initialSplitPct = clamp(defaultSplitPct, minLeftPct, maxLeftPct);

  const [splitPct, setSplitPct] = useState<number>(() => {
    if (typeof window === "undefined") {
      return initialSplitPct;
    }

    const saved = window.localStorage.getItem(storageKey);
    const parsed = saved ? Number(saved) : NaN;

    return Number.isFinite(parsed)
      ? clamp(parsed, minLeftPct, maxLeftPct)
      : initialSplitPct;
  });
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pendingClientXRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const previousBodyCursorRef = useRef("");
  const previousBodyUserSelectRef = useRef("");

  const dragStateRef = useRef<{ startX: number; startPct: number } | null>(
    null,
  );

  const updateSplitFromClientX = useCallback(
    (clientX: number) => {
      const dragState = dragStateRef.current;

      if (!dragState || containerWidth <= 0) {
        return;
      }

      const bounds = resolveLeftBoundsPx(
        containerWidth,
        minLeftPct,
        maxLeftPct,
        sanitizedHandleWidthPx,
        minRightPx,
      );
      const startLeftPx = splitPctToLeftPx(
        dragState.startPct,
        containerWidth,
        minLeftPct,
        maxLeftPct,
        sanitizedHandleWidthPx,
        minRightPx,
      );
      const deltaX = clientX - dragState.startX;
      const nextLeftPx = clamp(startLeftPx + deltaX, bounds.min, bounds.max);

      setSplitPct(
        leftPxToSplitPct(nextLeftPx, containerWidth, minLeftPct, maxLeftPct),
      );
    },
    [containerWidth, maxLeftPct, minLeftPct, minRightPx, sanitizedHandleWidthPx],
  );

  const applyPendingPointerPosition = useCallback(() => {
    rafRef.current = null;

    const pendingClientX = pendingClientXRef.current;

    if (pendingClientX === null) {
      return;
    }

    updateSplitFromClientX(pendingClientX);
  }, [updateSplitFromClientX]);

  const schedulePointerUpdate = useCallback(
    (clientX: number) => {
      pendingClientXRef.current = clientX;

      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(applyPendingPointerPosition);
    },
    [applyPendingPointerPosition],
  );

  const endDragging = useCallback(() => {
    dragStateRef.current = null;
    pendingClientXRef.current = null;

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    document.body.style.cursor = previousBodyCursorRef.current;
    document.body.style.userSelect = previousBodyUserSelectRef.current;

    setIsDragging(false);
  }, []);

  useEffect(() => {
    setSplitPct((prev) => clamp(prev, minLeftPct, maxLeftPct));
  }, [maxLeftPct, minLeftPct]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, String(splitPct));
  }, [splitPct, storageKey]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const updateContainerWidth = () => {
      setContainerWidth(element.clientWidth);
    };

    updateContainerWidth();

    const resizeObserver = new ResizeObserver(updateContainerWidth);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      document.body.style.cursor = previousBodyCursorRef.current;
      document.body.style.userSelect = previousBodyUserSelectRef.current;
    };
  }, []);

  useEffect(() => {
    if (!isDesktop && isDragging) {
      endDragging();
    }
  }, [endDragging, isDesktop, isDragging]);

  const leftWidthPx =
    isDesktop && containerWidth > 0
      ? splitPctToLeftPx(
          splitPct,
          containerWidth,
          minLeftPct,
          maxLeftPct,
          sanitizedHandleWidthPx,
          minRightPx,
        )
      : undefined;

  const desktopTemplateColumns =
    isDesktop && typeof leftWidthPx === "number"
      ? `${leftWidthPx}px ${sanitizedHandleWidthPx}px minmax(0, 1fr)`
      : undefined;

  const currentLeftPct =
    containerWidth > 0 && typeof leftWidthPx === "number"
      ? Math.round((leftWidthPx / containerWidth) * 100)
      : clamp(Math.round(splitPct), minLeftPct, maxLeftPct);

  const handleSeparatorPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!isDesktop || containerWidth <= 0) {
      return;
    }

    previousBodyCursorRef.current = document.body.style.cursor;
    previousBodyUserSelectRef.current = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    dragStateRef.current = {
      startX: event.clientX,
      startPct: splitPct,
    };

    pendingClientXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handleSeparatorPointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!dragStateRef.current) {
      return;
    }

    schedulePointerUpdate(event.clientX);
  };

  const handleSeparatorPointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!dragStateRef.current) {
      return;
    }

    updateSplitFromClientX(event.clientX);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    endDragging();
  };

  const handleSeparatorPointerCancel = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    endDragging();
  };

  const handleSeparatorKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (!isDesktop || containerWidth <= 0) {
      return;
    }

    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();

    const step = event.shiftKey ? 32 : 16;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const bounds = resolveLeftBoundsPx(
      containerWidth,
      minLeftPct,
      maxLeftPct,
      sanitizedHandleWidthPx,
      minRightPx,
    );
    const currentLeftPx = splitPctToLeftPx(
      splitPct,
      containerWidth,
      minLeftPct,
      maxLeftPct,
      sanitizedHandleWidthPx,
      minRightPx,
    );
    const nextLeftPx = clamp(
      currentLeftPx + direction * step,
      bounds.min,
      bounds.max,
    );

    setSplitPct(
      leftPxToSplitPct(nextLeftPx, containerWidth, minLeftPct, maxLeftPct),
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn("grid grid-cols-1 gap-6 lg:min-h-0 lg:gap-0", className)}
      style={
        desktopTemplateColumns
          ? {
              gridTemplateColumns: desktopTemplateColumns,
            }
          : undefined
      }
    >
      <div className={cn("min-w-0 min-h-0 overflow-auto", leftClassName)}>
        {left}
      </div>

      {isDesktop ? (
        <div
          role="separator"
          tabIndex={0}
          aria-label="Resize panels"
          aria-orientation="vertical"
          aria-valuemin={minLeftPct}
          aria-valuemax={maxLeftPct}
          aria-valuenow={currentLeftPct}
          onPointerDown={handleSeparatorPointerDown}
          onPointerMove={handleSeparatorPointerMove}
          onPointerUp={handleSeparatorPointerUp}
          onPointerCancel={handleSeparatorPointerCancel}
          onKeyDown={handleSeparatorKeyDown}
          className={cn(
            "group relative z-10 min-h-0 cursor-col-resize bg-white",
            "border-l border-r border-slate-200/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-0",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2",
              "bg-[radial-gradient(circle,_rgba(99,102,241,0.35)_1px,_transparent_1.5px)] bg-[length:2px_8px] bg-repeat-y",
              isDragging ? "opacity-70" : "opacity-45 group-hover:opacity-60",
            )}
          />
          <span
            aria-hidden
            className="pointer-events-none sticky top-[50vh] flex w-full -translate-y-1/2 justify-center"
          >
            <span
              className={cn(
                "h-16 w-[6px] rounded-full bg-slate-300 transition-colors duration-150",
                isDragging ? "bg-slate-500" : "group-hover:bg-slate-400",
              )}
            />
          </span>
        </div>
      ) : null}

      <div className={cn("min-w-0 min-h-0 overflow-auto", rightClassName)}>
        {right}
      </div>
    </div>
  );
}
