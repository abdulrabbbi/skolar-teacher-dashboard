import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppTopbar from "../../shared/components/AppTopbar";
import AppSidebar from "../../shared/components/AppSidebar";

export default function TeacherShellLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className={`h-screen w-full bg-green-50 ${
        mobileOpen ? "overflow-hidden" : "overflow-hidden"
      }`}
    >
      {/* TOP BAR */}
      <div className="px-2 pt-3 pb-3 shrink-0">
        <AppTopbar onMenuClick={() => setMobileOpen(true)} />
      </div>

      {/* BODY */}
      <div className="flex h-[calc(100vh-4.5rem)] w-full gap-4 px-4 pb-4">
        {/* SIDEBAR */}
        <AppSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        {/* MAIN CONTENT (ONLY SCROLLER) */}
        <main className="flex-2 overflow-y-auto scrollbar-hide rounded-2xl bg-white p-6 border border-slate-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}




