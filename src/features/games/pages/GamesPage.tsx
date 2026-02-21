import { Link } from "react-router-dom";
import { Bell, ChevronLeft, Sparkles, Trophy, Zap } from "lucide-react";
import { cn } from "../../../shared/lib/cn";

export default function GamesPage() {
  const scaryPng = new URL(
    "../../../assets/images/scary.png",
    import.meta.url,
  ).toString();

  return (
    // ✅ Full page responsive wrapper + 90vh height
    <div className="w-full min-h-[90vh]">
      <div className="relative min-h-[90vh] overflow-hidden rounded-[28px] border border-slate-200 bg-white">
        {/* Gradient Background */}
        <div className="relative flex min-h-[90vh] flex-col rounded-[28px] bg-gradient-to-br from-[#4cdc33] via-[#017517] to-[#035c07] p-6 md:p-10">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 opacity-35">
            <div className="absolute -left-24 top-10 h-[320px] w-[320px] rounded-full bg-white blur-[90px]" />
            <div className="absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full bg-white blur-[110px]" />
          </div>

          {/* Back */}
          <div className="relative z-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Games
            </Link>
          </div>

          {/* Main Layout */}
          <div className="relative z-10 mt-6 grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT CONTENT */}
            <div className="max-w-[720px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="h-3.5 w-3.5" />
                Coming Soon
              </div>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                Games are coming
                <br />
                to SKOLAR
              </h1>

              <p className="mt-4 max-w-[560px] text-sm leading-6 text-white/85 sm:text-base">
                Master your subjects with SKOLAR-level learning. Teacher-led live
                games focused on real classroom needs.
              </p>

              {/* Chips */}
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FFB020] px-4 py-2 text-xs font-semibold text-black">
                  <Zap className="h-4 w-4" />
                  Built from your topics
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#FF4D8D] px-4 py-2 text-xs font-semibold text-white">
                  <Trophy className="h-4 w-4" />
                  Live Leaderboards
                </span>
              </div>

              {/* Points */}
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {[
                  "Curriculum-aligned classroom games",
                  "Real-time progress & performance tracking",
                  "Learning that feels like playing",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/80" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "rounded-xl bg-[#FF9D00] px-5 py-3",
                    "text-sm font-semibold text-white",
                    "shadow-[0_10px_30px_rgba(0,0,0,0.18)]",
                    "hover:brightness-95 active:brightness-90",
                  )}
                >
                  <Bell className="h-4 w-4" />
                  Notify me
                </button>

                <span className="text-xs text-white/70">
                  Get notified when Games launch
                </span>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative mx-auto w-full max-w-[520px]">
              {/* Mascot */}
              <img
                src={scaryPng}
                alt="SKOLAR mascot"
                className="mx-auto w-[340px] scale-[1.18] select-none drop-shadow-[0_28px_65px_rgba(0,0,0,0.28)] sm:w-[420px] sm:scale-[1.25] md:w-[520px] md:scale-[1.32]"
                draggable={false}
              />
            </div>
          </div>

          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}