import {  useLocation, useOutlet } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
import { SmokeBackground } from "../features/auth/components/SmokeBackground";
import { GridBackground } from "../shared/components/GridBackground";

export function AuthLayout() {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const outlet = useOutlet();
  const isSetup = location.pathname.startsWith("/auth/setup");

  return (
    <div className="relative isolate h-screen overflow-hidden bg-slate-50">
      {/* dotted grid */}
      <div className="absolute inset-0 z-[1]">
        <GridBackground />
      </div>

      {/* smoke */}
      <div className="absolute inset-0 z-[2]">
        <SmokeBackground variant={isSetup ? "setup" : "auth"} />
      </div>

      {/* content */}
      <div className="relative z-10 h-full overflow-y-auto px-4 py-6 no-scrollbar">
        <div className="mx-auto flex min-h-full w-full items-center justify-center">
          {/* <AnimatePresence mode="wait">
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
          </AnimatePresence> */}
        </div>
      </div>
    </div>
  );
}
