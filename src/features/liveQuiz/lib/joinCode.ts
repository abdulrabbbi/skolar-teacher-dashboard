const LIVE_QUIZ_LAST_JOIN_CODE_KEY = "liveQuiz:lastJoinCode";

const getSessionJoinCodeKey = (sessionId: string) =>
  `liveQuiz:sessionJoinCode:${sessionId}`;

export const normalizeLiveQuizJoinCode = (value: string) =>
  value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);

export const generateLiveQuizJoinCode = (length = 6) => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let next = "";

  for (let index = 0; index < length; index += 1) {
    next += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return next;
};

export const readLiveQuizJoinCode = (sessionId?: string) => {
  if (typeof window === "undefined") return "";

  try {
    const scopedCode = sessionId
      ? window.localStorage.getItem(getSessionJoinCodeKey(sessionId)) ?? ""
      : "";
    const lastCode =
      window.localStorage.getItem(LIVE_QUIZ_LAST_JOIN_CODE_KEY) ?? "";

    return (
      normalizeLiveQuizJoinCode(scopedCode) ||
      normalizeLiveQuizJoinCode(lastCode)
    );
  } catch {
    return "";
  }
};

export const persistLiveQuizJoinCode = (value: string, sessionId?: string) => {
  const normalized = normalizeLiveQuizJoinCode(value);

  if (!normalized || typeof window === "undefined") {
    return normalized;
  }

  try {
    window.localStorage.setItem(LIVE_QUIZ_LAST_JOIN_CODE_KEY, normalized);

    if (sessionId) {
      window.localStorage.setItem(getSessionJoinCodeKey(sessionId), normalized);
    }
  } catch {
    // ignore storage errors
  }

  return normalized;
};

export const ensureLiveQuizJoinCode = (sessionId?: string) => {
  const existing = readLiveQuizJoinCode(sessionId);

  if (existing) {
    return persistLiveQuizJoinCode(existing, sessionId);
  }

  return persistLiveQuizJoinCode(generateLiveQuizJoinCode(), sessionId);
};
