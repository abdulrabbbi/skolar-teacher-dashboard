import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SmokeBackground } from "../features/auth/components/SmokeBackground";
import { GridBackground } from "../shared/components/GridBackground";

export function OnboardingLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="relative isolate min-h-[100svh] overflow-hidden bg-slate-50">
      {/* dotted grid */}
      <div className="absolute inset-0 z-[1]">
        <GridBackground />
      </div>

      {/* smoke */}
      <div className="absolute inset-0 z-[2]">
        <SmokeBackground variant="auth" />
      </div>

      {/* content */}
      <div className="relative z-10 min-h-[100svh] overflow-y-auto no-scrollbar">
        <div className="mx-auto grid min-h-[100svh] w-full max-w-[1100px] place-items-center px-3 py-6 sm:px-6 sm:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              {outlet ?? <Outlet />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
