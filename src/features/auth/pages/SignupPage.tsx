import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur hover:bg-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <div className="rounded-2xl border border-white/40 bg-white/65 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-900">
            Create Account
          </div>
          <div className="mt-1 text-xs text-slate-500">
            UI only for now
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              Full Name
            </div>
            <input className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>

          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              Email Address
            </div>
            <input className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>

          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              Password
            </div>
            <input
              type="password"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="h-10 w-full rounded-xl bg-[#00B96B] text-xs font-semibold text-white hover:bg-emerald-700"
          >
            Continue
          </button>

          <div className="pt-2 text-center text-xs text-slate-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}