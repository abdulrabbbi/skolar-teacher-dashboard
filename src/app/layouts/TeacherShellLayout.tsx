/* eslint-disable react-hooks/set-state-in-effect */
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import AppSidebar from "../../shared/components/AppSidebar";
import AppTopbar from "../../shared/components/AppTopbar";

export default function TeacherShellLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isDashboard = useMemo(() => {
    return location.pathname.endsWith("/dashboard");
  }, [location.pathname]);

  const shellBgStyle = useMemo<CSSProperties>(() => {
    if (isDashboard) {
      return {
        backgroundColor: "#f4fff8",
        backgroundImage: `
          radial-gradient(2000px circle at 72% 70%, rgba(16,185,129,0.16), transparent 80%),
          radial-gradient(2000px circle at 90% 85%, rgba(34,197,94,0.12), transparent 80%),
          radial-gradient(circle, rgba(16,185,129,0.2) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 18px 18px",
      };
    }

    return {
      backgroundColor: "#ffffff",
      backgroundImage: `
        radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px)
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
      <div className="h-full w-full" style={shellBgStyle}>
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
                    className="h-full overflow-x-hidden overflow-y-auto no-scrollbar"
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
