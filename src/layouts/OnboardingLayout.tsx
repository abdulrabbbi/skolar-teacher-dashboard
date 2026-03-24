import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import GridBackground from "../features/auth/components/GridBackground";

export function OnboardingLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="relative isolate min-h-[100svh] overflow-hidden">
      {/* match /auth/account-type background */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-emerald-200/80" />
      <div className="pointer-events-none absolute -left-40 top-24 -z-20 h-[520px] w-[520px] rounded-full bg-[#00B96B]/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-220px] top-[-80px] -z-20 h-[680px] w-[680px] rounded-full bg-[#00B96B]/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-[-240px] -z-20 h-[680px] w-[680px] rounded-full bg-[#00B96B]/25 blur-3xl" />

      <GridBackground dotColor="#cbd5e1" glowColor="#00B96B" spacing={22} />

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
