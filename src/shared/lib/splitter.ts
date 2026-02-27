export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function resolveLeftBoundsPx(
  containerWidth: number,
  minLeftPct: number,
  maxLeftPct: number,
  handleWidthPx: number,
  minRightPx: number,
) {
  const minByPct = (containerWidth * minLeftPct) / 100;
  const maxByPct = (containerWidth * maxLeftPct) / 100;
  const maxByRightMin = containerWidth - handleWidthPx - minRightPx;
  const max = Math.min(maxByPct, maxByRightMin);

  if (max <= 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.min(minByPct, max),
    max,
  };
}

export function splitPctToLeftPx(
  splitPct: number,
  containerWidth: number,
  minLeftPct: number,
  maxLeftPct: number,
  handleWidthPx: number,
  minRightPx: number,
) {
  if (containerWidth <= 0) {
    return 0;
  }

  const pct = clamp(splitPct, minLeftPct, maxLeftPct);
  const rawPx = (containerWidth * pct) / 100;
  const bounds = resolveLeftBoundsPx(
    containerWidth,
    minLeftPct,
    maxLeftPct,
    handleWidthPx,
    minRightPx,
  );

  return clamp(rawPx, bounds.min, bounds.max);
}

export function leftPxToSplitPct(
  leftPx: number,
  containerWidth: number,
  minLeftPct: number,
  maxLeftPct: number,
) {
  if (containerWidth <= 0) {
    return minLeftPct;
  }

  return clamp((leftPx / containerWidth) * 100, minLeftPct, maxLeftPct);
}
