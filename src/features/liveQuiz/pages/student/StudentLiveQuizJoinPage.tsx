import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function normalizeJoinCode(raw: string) {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}

export default function StudentLiveQuizJoinPage() {
  const navigate = useNavigate();

  const initialCode = useMemo(() => {
    if (typeof window === "undefined") return "";
    try {
      return normalizeJoinCode(
        window.localStorage.getItem("liveQuiz:lastJoinCode") ?? "",
      );
    } catch {
      return "";
    }
  }, []);

  const [joinCode, setJoinCode] = useState(initialCode);
  const canJoin = joinCode.trim().length >= 4;

  const handleJoin = () => {
    const code = normalizeJoinCode(joinCode);
    if (!code) return;

    try {
      window.localStorage.setItem("liveQuiz:lastJoinCode", code);
    } catch {
      // ignore
    }

    navigate(`/student/live-quiz/session/${code}`);
  };

  const joinButtonClassName = canJoin
    ? `
        mt-5 h-16 w-full rounded-2xl px-6 text-base font-semibold text-white
        shadow-lg transition
        bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
        hover:brightness-110 active:brightness-95
      `
    : `
        mt-5 h-16 w-full rounded-2xl px-6 text-base font-semibold text-white/70
        border border-white/15 bg-white/10
      `;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          StudySesh
        </h1>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          Challenge your mates. Level up together.
        </p>

        <div className="mx-auto mt-10 w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <p className="text-xl font-semibold text-white">Got a code?</p>
          <p className="mt-1 text-sm text-white/60">
            Enter it below to jump into the action
          </p>

          <div className="mt-6">
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(normalizeJoinCode(e.target.value))}
              placeholder="ABC123"
              inputMode="text"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              maxLength={8}
              className="
                h-20 w-full rounded-2xl border border-sky-300/40 bg-white/10
                px-6 text-center font-mono text-4xl font-semibold tracking-[0.35em] text-white placeholder:text-white/20
                outline-none ring-0
                focus:border-sky-300/70 focus:bg-white/15 focus:ring-2 focus:ring-sky-300/70
              "
              aria-label="Join code"
              onKeyDown={(e) => {
                if (e.key === "Enter" && canJoin) handleJoin();
              }}
            />

            <button
              type="button"
              onClick={handleJoin}
              disabled={!canJoin}
              className={[
                joinButtonClassName,
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
            >
              Join Sesh
            </button>

            <p className="mt-4 text-xs text-white/45">
              Tip: your teacher shares this join code when they launch a quiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
