import { Outlet } from "react-router-dom";
import GridBackground from "../../features/auth/components/GridBackground";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Soft green “liquid” glow like screenshots */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-white" />
      <div className="pointer-events-none absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-emerald-300/35 blur-3xl -z-20" />
      <div className="pointer-events-none absolute right-[-220px] top-[-80px] h-[680px] w-[680px] rounded-full bg-emerald-300/30 blur-3xl -z-20" />
      <div className="pointer-events-none absolute right-[-180px] bottom-[-240px] h-[680px] w-[680px] rounded-full bg-emerald-300/25 blur-3xl -z-20" />

      {/* Dotted background (your canvas) */}
      <GridBackground dotColor="#cbd5e1" glowColor="#00B96B" spacing={22} />

      {/* Centered content */}
      <div className="flex min-h-screen items-center justify-center px-4">
        <Outlet />
      </div>
    </div>
  );
}