import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas-lite";

type Phase = "bg" | "logo" | "loading" | "welcome";

export function SplashPage() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("bg");

  const timeoutsRef = useRef<ReturnType<typeof window.setTimeout>[]>([]);
  const loadingDoneRef = useRef(false);

  const T = useMemo(
    () => ({
      bgOnly: 650,
      loadingAfterLogo: 650,
      loadingDuration: 1400,
      toWelcomeDelay: 450,
    }),
    [],
  );

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    loadingDoneRef.current = false;
    setPhase("bg");
    clearAllTimeouts();

    timeoutsRef.current.push(
      window.setTimeout(() => setPhase("logo"), reduceMotion ? 0 : T.bgOnly),
    );

    timeoutsRef.current.push(
      window.setTimeout(
        () => setPhase("loading"),
        reduceMotion ? 0 : T.bgOnly + T.loadingAfterLogo,
      ),
    );

    return () => clearAllTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const goNext = () => navigate("/onboarding", { replace: true });

  const { rive, RiveComponent: OctopusRive } = useRive({
    src: "/animations/octopus.riv",
    stateMachines: "octopus",
    autoplay: true,
  });

  const thinkingInput = useStateMachineInput(rive, "octopus", "Thinking");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!thinkingInput) return;
    thinkingInput.fire();
    intervalRef.current = setInterval(() => thinkingInput.fire(), 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [thinkingInput]);

  const phaseIndex =
    phase === "bg" ? 0 : phase === "logo" ? 1 : phase === "loading" ? 2 : 3;

  const spring: Transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 170, damping: 18, mass: 0.85 };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center text-center">
        {/* Octopus */}
        <motion.div
          initial={false}
          animate={{ opacity: phaseIndex >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative h-44 w-44 select-none drop-shadow-sm"
        >
          <motion.div
            className="h-full w-full"
            animate={{ y: [0, -8, 0], rotate: [-0.5, 0.5, -0.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <OctopusRive style={{ width: "100%", height: "100%" }} />
          </motion.div>
        </motion.div>

        {/* LOADING LINE */}
        <motion.div
          initial={false}
          animate={phaseIndex >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={spring}
          className="mt-4"
        >
          <div className="h-[2px] w-44 overflow-hidden rounded-full bg-emerald-500/25">
            <motion.div
              key={phaseIndex >= 2 ? "fill" : "idle"}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phaseIndex >= 2 ? 1 : 0 }}
              transition={{
                duration: reduceMotion ? 0 : T.loadingDuration / 1000,
                ease: "easeInOut",
              }}
              onAnimationComplete={() => {
                if (phaseIndex < 2) return;
                if (loadingDoneRef.current) return;
                loadingDoneRef.current = true;

                timeoutsRef.current.push(
                  window.setTimeout(
                    () => setPhase("welcome"),
                    reduceMotion ? 0 : T.toWelcomeDelay,
                  ),
                );
              }}
              className="h-full origin-left rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.55)]"
            />
          </div>
        </motion.div>

        {/* WELCOME TEXT + BUTTON */}
        <motion.div
          initial={false}
          animate={phaseIndex >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={spring}
          className="mt-4 flex flex-col items-center"
        >
          <div className="text-[22px] font-semibold tracking-tight text-slate-900">
            Welcome to SKOLAR
          </div>

          <div className="mt-1 text-[11px] font-medium text-slate-500">
            Your SKOLAR-Powered Teaching Assistant
          </div>

          <motion.button
            type="button"
            onClick={goNext}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-[#00B96B] px-6 text-xs font-semibold text-white shadow-sm transition hover:bg-[#009f5c] focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
