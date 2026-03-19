import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blue/purple atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#050816]" />
      <div className="pointer-events-none absolute -left-56 top-24 h-[520px] w-[520px] rounded-full bg-blue-500/25 blur-3xl -z-20" />
      <div className="pointer-events-none absolute right-[-220px] top-[-80px] h-[680px] w-[680px] rounded-full bg-purple-500/30 blur-3xl -z-20" />
      <div className="pointer-events-none absolute right-[-180px] bottom-[-240px] h-[680px] w-[680px] rounded-full bg-indigo-500/25 blur-3xl -z-20" />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-white/0 to-black/20" />

      <Outlet />
    </div>
  );
}

