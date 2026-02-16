import { Outlet, useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
import { SmokeBackground } from "../features/auth/components/SmokeBackground";
import { GridBackground } from "../shared/components/GridBackground";

export function AuthLayout() {
  const location = useLocation();
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
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
