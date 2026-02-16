import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { SkolarMark } from "../components/SkolarMark";
import { OnboardingCarousel } from "../components/OnboardingCarousel";
import { ONBOARDING_SLIDES } from "../data/auth.mock";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const isLast = index === ONBOARDING_SLIDES.length - 1;

  return (
    // ✅ ensures the whole form stays centered in all screens sdfsdf
    <div className="mx-auto flex w-full max-w-[860px] flex-col items-center justify-center">
      <AuthCard
        className="
          w-full
          bg-green-50/35
          backdrop-blur-sm
          border border-green-100/70
          shadow-sm
        "
      >
        <div className="flex items-center justify-center">
          <SkolarMark size={44} className="select-none" />
        </div>

        <div className="mt-4 w-full">
          <OnboardingCarousel slides={[...ONBOARDING_SLIDES]} index={index} />
        </div>

        <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              index === 0
                ? navigate("/auth/account-type")
                : setIndex((p) => p - 1)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            {index === 0 ? "Skip" : "Back"}
          </button>

          <button
            type="button"
            onClick={() =>
              isLast ? navigate("/auth/account-type") : setIndex((p) => p + 1)
            }
            className="h-11 w-full rounded-xl bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg--700"
          >
            {isLast ? "Get Started" : "Next"}
          </button>
        </div>
      </AuthCard>
    </div>
  );
}
