import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen  items-center justify-center bg-slate-50 px-4 pt-8">
      <Outlet />
    </div>
  );
}
