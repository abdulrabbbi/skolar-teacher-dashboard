import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronLeft, Sparkles, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../shared/lib/cn";
import RiveMascot from "../../../shared/components/RiveMascot";
import { useHeroParallax } from "../../../shared/hooks/useHeroParallax";
import NotifyGamesModal from "../components/NotifyGamesModal";

type StatusCardProps = {
  icon: React.ReactNode;
  iconClassName: string;
  label: string;
  value: string;
  className?: string;
};

function StatusCard({
  icon,
  iconClassName,
  label,
  value,
  className,
}: StatusCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl",
        "border border-white/15 bg-white/14",
        "px-4 py-3",
        "backdrop-blur-md",
        "shadow-[0_18px_45px_rgba(0,0,0,0.18)]",
        className,
      )}
    >
      <div
        className={cn(
          "grid h-11 w-11 place-items-center rounded-xl",
          "ring-1 ring-white/25 shadow-[0_14px_30px_rgba(0,0,0,0.16)]",
          iconClassName,
        )}
      >
        {icon}
      </div>
      <div className="leading-tight">
        <div className="text-[11px] font-semibold text-white/80">{label}</div>
        <div className="text-[15px] font-extrabold text-white">{value}</div>
      </div>
    </div>
  );
}

export default function GamesPage() {
  const { stageX, stageY, stageRotate, mascotX, mascotY } = useHeroParallax();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("skolar.games.notifyEmail");
      if (saved) setNotifyEmail(saved);
    } catch {
      // ignore storage errors
    }
  }, []);

  return (
    <div className="w-full min-h-[90vh]">
      <div className="relative min-h-[90vh] overflow-hidden rounded-[28px] border border-slate-200 bg-white">
        <motion.div
          className="relative min-h-[90vh] rounded-[28px]"
          style={{
            x: stageX,
            y: stageY,
            rotate: stageRotate,
            background:
              "linear-gradient(135deg, #4cdc33 0%, #017517 55%, #035c07 100%)",
          }}
        >
          {/* glow */}
          <div className="pointer-events-none absolute inset-0 opacity-35">
            <div
              className="absolute"
              style={{
                left: "-96px",
                top: "40px",
                width: "320px",
                height: "320px",
                borderRadius: "9999px",
                background: "white",
                filter: "blur(90px)",
              }}
            />
            <div
              className="absolute"
              style={{
                right: "-120px",
                bottom: "20px",
                width: "420px",
                height: "420px",
                borderRadius: "9999px",
                background: "white",
                filter: "blur(110px)",
              }}
            />
          </div>

          {/* subtle right light */}
          <div
            className="pointer-events-none absolute"
            style={{
              right: "-120px",
              top: "140px",
              width: "720px",
              height: "720px",
              borderRadius: "9999px",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0) 70%)",
            }}
          />

          <div className="relative z-10 flex min-h-[90vh] flex-col px-6 py-6 md:px-10 md:py-10">
            {/* Back */}
            <div>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
                Games
              </Link>
            </div>

            {/* Desktop layout with custom visual positioning */}
            <div className="relative flex flex-1 flex-col lg:block">
              {/* LEFT CONTENT */}
              <div className="relative z-20 mt-6 max-w-[620px] lg:mt-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  Coming Soon
                </div>

                <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-[62px]">
                  Games are coming
                  <br />
                  to SKOLAR
                </h1>

                <p className="mt-6 max-w-[650px] text-base leading-8 text-white/88 xl:text-[17px]">
                  Master your subjects with SKOLAR-level learning. Teacher-led live
                  games focused on real classroom needs.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FFB020] px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_28px_rgba(0,0,0,0.15)]">
                    <Zap className="h-4 w-4" />
                    Built from your topics
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FF4D8D] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,0,0,0.15)]">
                    <Trophy className="h-4 w-4" />
                    Live Leaderboards
                  </span>
                </div>

                <ul className="mt-8 space-y-3 text-base text-white/88">
                  {[
                    "Curriculum-aligned classroom games",
                    "Real-time progress & performance tracking",
                    "Learning that feels like playing",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => setNotifyOpen(true)}
                    className={cn(
                      "inline-flex items-center justify-center gap-2",
                      "rounded-xl bg-[#FF9D00] px-6 py-3.5",
                      "text-base font-semibold text-white",
                      "shadow-[0_14px_30px_rgba(0,0,0,0.2)]",
                      "hover:brightness-95 active:brightness-90",
                    )}
                  >
                    <Bell className="h-4 w-4" />
                    Notify me when Games launches
                  </button>

                  <span className="text-sm text-white/75">
                    {notifyEmail ? "You’re on the list." : "Get notified when Games launch"}
                  </span>
                </div>
              </div>

              {/* RIGHT VISUAL - MOBILE */}
              <div className="relative mt-10 flex justify-center lg:hidden">
                <div className="pointer-events-none absolute right-2 top-2 z-30">
                  <StatusCard
                    icon={<Trophy className="h-5 w-5 text-black" />}
                    iconClassName="bg-[#FFB020]"
                    label="Rank"
                    value="2450"
                  />
                </div>

                <div className="pointer-events-none absolute left-2 top-[58%] z-30">
                  <StatusCard
                    icon={<Zap className="h-5 w-5 text-[#FFB020]" />}
                    iconClassName="bg-black"
                    label="Streak"
                    value="+900"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ x: mascotX, y: mascotY }}
                  className="w-full max-w-[320px]"
                >
                  <RiveMascot
                    src="/animations/octopus.riv"
                    stateMachine="octopus"
                    className="w-full aspect-square drop-shadow-[0_28px_65px_rgba(0,0,0,0.35)]"
                  />
                </motion.div>
              </div>

              {/* RIGHT VISUAL - DESKTOP CUSTOM POSITION */}
              <div
                className="pointer-events-none absolute right-0 top-0 hidden h-full lg:block"
                style={{ width: "54%" }}
              >
                {/* mini status cards (like reference) */}
                <div className="pointer-events-none absolute right-10 top-10 z-30">
                  <StatusCard
                    icon={<Trophy className="h-5 w-5 text-black" />}
                    iconClassName="bg-[#FFB020]"
                    label="Rank"
                    value="2450"
                  />
                </div>

                <div className="pointer-events-none absolute left-10 top-[58%] z-30">
                  <StatusCard
                    icon={<Zap className="h-5 w-5 text-[#FFB020]" />}
                    iconClassName="bg-black"
                    label="Streak"
                    value="+900"
                  />
                </div>

                <div
                  className="absolute bottom-0 right-[-36px] flex h-full items-end"
                  style={{ width: "720px", maxWidth: "none" }}
                >
                  <motion.div
                    animate={{ y: [0, -14, 0], rotate: [-1, 1, -1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ x: mascotX, y: mascotY }}
                    className="pointer-events-auto"
                  >
                    <RiveMascot
                      src="/animations/octopus.riv"
                      stateMachine="octopus"
                      className="drop-shadow-[0_34px_80px_rgba(0,0,0,0.34)]"
                      style={{ width: "720px", height: "720px" }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="h-6" />
          </div>
        </motion.div>
      </div>

      <NotifyGamesModal
        open={notifyOpen}
        initialEmail={notifyEmail}
        onClose={() => setNotifyOpen(false)}
        onSubmit={(email) => {
          setNotifyEmail(email);
          setNotifyOpen(false);
          try {
            window.localStorage.setItem("skolar.games.notifyEmail", email);
          } catch {
            // ignore storage errors
          }
        }}
      />
    </div>
  );
}
