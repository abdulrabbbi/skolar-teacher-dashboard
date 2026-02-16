import { Outlet } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
import { SmokeBackground } from "../features/auth/components/SmokeBackground";
import { GridBackground } from "../shared/components/GridBackground"; 

export function OnboardingLayout() {
  return (
    <div className="relative isolate min-h-svh overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-green-50 to-green-200" />

      {/* dotted grid */}
      <div className="absolute inset-0 z-1">
        <GridBackground className="opacity-100" />
      </div>

      {/* animated smoke */}
      <div className="absolute inset-0 z-2">
        <SmokeBackground variant="onboarding" />
      </div>

      {/* content */}
      <div className="relative z-10 min-h-svh overflow-y-auto no-scrollbar">
        <div className="mx-auto flex min-h-svh w-full max-w-[1100px] items-center justify-center p-3 sm:p-4 md:p-6">
          <div className="flex w-full justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
