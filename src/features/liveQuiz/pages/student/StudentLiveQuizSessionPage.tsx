import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

function normalizeJoinCode(raw: string) {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}

export default function StudentLiveQuizSessionPage() {
  const navigate = useNavigate();
  const { joinCode } = useParams<{ joinCode: string }>();

  const code = useMemo(() => normalizeJoinCode(joinCode ?? ""), [joinCode]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <button
          type="button"
          onClick={() => navigate("/student/live-quiz")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Change code
        </button>

        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
            Joined
          </p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-white">
            {code || "—"}
          </p>

          <p className="mt-4 text-sm text-white/70">
            Waiting for your teacher to start the quiz…
          </p>

          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-white/75">
            <p className="font-semibold text-white">What happens next?</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your teacher launches the first question.</li>
              <li>You answer on your device before the timer ends.</li>
              <li>Scores update live for the class.</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => navigate("/student/live-quiz")}
            className="
              mt-6 h-12 w-full rounded-2xl border border-white/15 bg-white/5
              px-4 text-sm font-semibold text-white/85 transition
              hover:bg-white/10
            "
          >
            Back to Join
          </button>
        </div>
      </div>
    </div>
  );
}

