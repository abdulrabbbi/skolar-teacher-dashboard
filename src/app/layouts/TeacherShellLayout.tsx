import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppTopbar from "../../shared/components/AppTopbar";
import AppSidebar from "../../shared/components/AppSidebar";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";

export default function TeacherShellLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMdUp = useMediaQuery("(min-width: 768px)");
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const dottedBg = useMemo<CSSProperties>(
    () => ({
      backgroundColor: "#ffffff",
      backgroundImage:
        "radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px)",
      backgroundSize: "18px 18px",
    }),
    [],
  );

  // ✅ Close mobile sidebar on route change (mobile only)
  useEffect(() => {
    if (!isMdUp) setMobileOpen(false);
  }, [location.pathname, isMdUp]);

  // ✅ Reset main scroll on navigation
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="h-dvh w-full overflow-hidden" style={dottedBg}>
      <div className="flex h-full min-h-0 w-full flex-col">
        {/* TOP BAR */}
        <div className="shrink-0 px-2 pb-4 pt-2">
          <AppTopbar onMenuClick={() => setMobileOpen(true)} />
        </div>

        {/* BODY */}
        <div className="flex min-h-0 flex-1 w-full gap-2 px-2 pb-4">
          {/* SIDEBAR */}
          <AppSidebar
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />

          {/* MAIN CONTENT (ONLY SCROLLER) */}
          <main className="min-w-0 flex-1">
            <div className="h-full overflow-hidden">
              {/* ✅ apply dotted bg here too so it shows on ALL teacher routes while scrolling */}
              <div
                ref={scrollRef}
                className="h-full overflow-y-auto overflow-x-hidden no-scrollbar"
                style={dottedBg}
              >
                {/* ✅ padding wrapper (keeps pages consistent) */}
                <div className="min-h-full ">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
