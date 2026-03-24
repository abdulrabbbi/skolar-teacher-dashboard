import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas-lite";
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
        className="mx-auto w-full max-w-[620px]"
        whileHover={{ y: -2, scale: 1.003 }}
        whileTap={{ scale: 0.998 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="relative mx-auto w-full max-w-[620px] p-0">
          <div className="relative flex flex-col p-5 sm:p-8 md:p-10">
            {/* Octopus */}
            <motion.div
              className="absolute right-5 top-4 z-50 h-36 w-36 select-none sm:right-6 sm:top-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -6, 0], rotate: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <OctopusRive style={{ width: "100%", height: "100%" }} />
            </motion.div>

            {/* Slide */}
            <div className="pt-8 sm:pt-6">
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
