/* eslint-disable react-hooks/set-state-in-effect */
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import AppSidebar from "../../shared/components/AppSidebar";
import AppTopbar from "../../shared/components/AppTopbar";
import GridBackground from "../../features/auth/components/GridBackground";

export default function TeacherShellLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isDashboard = useMemo(() => {
    return location.pathname.endsWith("/dashboard");
  }, [location.pathname]);

  const shellBgStyle = useMemo<CSSProperties | undefined>(() => {
    if (isDashboard) {
      return undefined;
    }

    return {
      backgroundColor: "#ffffff",
      backgroundImage: `
        radial-gradient(circle, rgba(99,102,241,0.14) 2px, transparent 2px)
      `,
      backgroundSize: "18px 18px",
    };
  }, [isDashboard]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="h-dvh w-full overflow-hidden">
      <div
        className={`relative h-full w-full ${isDashboard ? "" : "teacher-dots-motion"}`}
        style={shellBgStyle}
      >
        {isDashboard ? (
          <>
            <div className="pointer-events-none absolute inset-0 -z-20 bg-white" />
            <div className="pointer-events-none absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-[#00B96B]/35 blur-3xl -z-20 animate-skolar-fog-1" />
            <div className="pointer-events-none absolute right-[-220px] top-[-80px] h-[680px] w-[680px] rounded-full bg-[#00B96B]/30 blur-3xl -z-20 animate-skolar-fog-2" />
            <div className="pointer-events-none absolute right-[-180px] bottom-[-240px] h-[680px] w-[680px] rounded-full bg-[#00B96B]/25 blur-3xl -z-20 animate-skolar-fog-3" />
            <GridBackground
              dotColor="#cbd5e1"
              glowColor="#00B96B"
              spacing={22}
              forceShow
            />
          </>
        ) : null}

        <div className="flex h-full w-full min-h-0 flex-col">
          {/* Topbar */}
          <div className="shrink-0">
            <AppTopbar onMenuClick={() => setMobileSidebarOpen(true)} />
          </div>

          {/* Main area */}
          <div className="flex min-h-0 flex-1 flex-col px-3 md:px-4 lg:px-6">
            <div className="flex min-h-0 flex-1 gap-3 pb-4 pt-3">
              <AppSidebar
                mobileOpen={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
              />

              <main className="min-w-0 flex-1">
                <div className="h-full bg-transparent backdrop-blur">
                  <div
                    ref={scrollRef}
                    className={`h-full overflow-x-hidden overflow-y-auto no-scrollbar ${isDashboard ? "" : "teacher-dots-motion"}`}
                    style={shellBgStyle}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={location.pathname}
                        className="min-h-0 flex-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Outlet />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
