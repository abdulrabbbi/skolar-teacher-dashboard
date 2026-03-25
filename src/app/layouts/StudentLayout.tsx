import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Purple atmospheric background (student live quiz style) */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-[#14082f] via-[#2a0f5a] to-[#4a0f86]" />
      <div className="pointer-events-none absolute -left-60 top-24 h-[540px] w-[540px] rounded-full bg-sky-400/20 blur-3xl -z-20" />
      <div className="pointer-events-none absolute right-[-260px] top-[-120px] h-[720px] w-[720px] rounded-full bg-fuchsia-500/25 blur-3xl -z-20" />
      <div className="pointer-events-none absolute right-[-200px] bottom-[-280px] h-[720px] w-[720px] rounded-full bg-indigo-500/25 blur-3xl -z-20" />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-white/0 to-black/20" />

      <Outlet />
    </div>
  );
}
