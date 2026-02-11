import {  useLocation, useOutlet } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
import { SmokeBackground } from "../features/auth/components/SmokeBackground";
import { GridBackground } from "../shared/components/GridBackground"; 

export function OnboardingLayout() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const outlet = useOutlet();

  return (
    <div className="relative isolate min-h-svh overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-indigo-50 to-indigo-200" />

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
          {/* <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="flex w-full justify-center"
            >
              {outlet ?? <Outlet />}
            </motion.div>
          </AnimatePresence> */}
        </div>
      </div>
    </div>
  );
}
