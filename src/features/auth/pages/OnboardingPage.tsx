/* eslint-disable react-hooks/immutability */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas-lite";
import { StateMachineInputType } from "@rive-app/canvas-lite";
import { OnboardingCarousel } from "../components/OnboardingCarousel";
import { ONBOARDING_SLIDES } from "../data/auth.mock";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const { rive, RiveComponent: OctopusRive } = useRive({
    src: "/animations/octopus.riv",
    stateMachines: "octopus",
    autoplay: true,
  });

  const summonInput = useStateMachineInput(rive, "octopus", "Summon");
  const thinkingInput = useStateMachineInput(rive, "octopus", "Thinking");
  const idlingInput = useStateMachineInput(rive, "octopus", "Idling");

  const intervalRef = useRef<ReturnType<typeof window.setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => {
    if (!summonInput) return;
    if (summonInput.type === StateMachineInputType.Boolean) {
      summonInput.value = true;
      return;
    }
    summonInput.fire();
  }, [summonInput]);

  useEffect(() => {
    if (!thinkingInput) return;

    if (thinkingInput.type === StateMachineInputType.Boolean) {
      thinkingInput.value = true;
      if (idlingInput?.type === StateMachineInputType.Boolean) {
        idlingInput.value = false;
      }
      return;
    }

    const tick = () => {
      thinkingInput.fire();

      if (idlingInput?.type === StateMachineInputType.Trigger) {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => idlingInput.fire(), 2600);
      } else if (idlingInput?.type === StateMachineInputType.Boolean) {
        idlingInput.value = true;
      }
    };

    tick();
    intervalRef.current = window.setInterval(tick, 3000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [thinkingInput, idlingInput]);

  const total = ONBOARDING_SLIDES.length;
  const isLast = index === total - 1;

  const leftLabel = isLast ? "Back" : "Skip";
  const rightLabel = isLast ? "Get Started" : "Next";

  const onLeft = () => {
    if (isLast) setIndex((p) => Math.max(0, p - 1));
    else navigate("/auth/account-type");
  };

  const onRight = () => {
    if (isLast) navigate("/auth/account-type");
    else setIndex((p) => Math.min(total - 1, p + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      <motion.div
        className="mx-auto w-full max-w-155"
        whileHover={{ y: -2, scale: 1.003 }}
        whileTap={{ scale: 0.998 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="relative mx-auto w-full max-w-155 p-0">
          <div className="relative flex flex-col p-5 sm:p-8 md:p-10">
            {/* Slide + Octopus */}
            <div className="relative pt-14 sm:pt-12">
              <motion.div
                className="
                  pointer-events-none absolute z-50 select-none
                  right-3 top-0
                  h-20 w-20
                  sm:right-5 sm:-top-1 sm:h-24 sm:w-24
                  md:right-7 md:-top-2 md:h-28 md:w-28
                "
                initial={false}
                animate={{ y: [0, -6, 0], rotate: [-0.5, 0.5, -0.5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <OctopusRive style={{ width: "100%", height: "100%" }} />
              </motion.div>

              <OnboardingCarousel slides={ONBOARDING_SLIDES} index={index} />
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {ONBOARDING_SLIDES.map((_, i) => (
                <motion.span
                  key={i}
                  layout
                  transition={{ duration: 0.25 }}
                  className={[
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-9 bg-[#00B96B] sm:w-10" : "w-3 bg-slate-300/80",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <button
                type="button"
                onClick={onLeft}
                className="
                  h-10 w-full rounded-2xl
                  border border-white/55
                  bg-white/35
                  text-sm font-semibold text-slate-800
                  backdrop-blur-md
                  shadow-[0_10px_22px_rgba(15,23,42,0.06)]
                  hover:bg-white/40
                  transition
                "
              >
                {leftLabel}
              </button>

              <button
                type="button"
                onClick={onRight}
                className="
                  h-10 w-full rounded-2xl
                  bg-[#00B96B]
                  text-sm font-semibold text-white
                  shadow-[0_16px_34px_rgba(0,185,107,0.32)]
                  hover:bg-[#009f5c]
                  transition
                "
              >
                {rightLabel}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}