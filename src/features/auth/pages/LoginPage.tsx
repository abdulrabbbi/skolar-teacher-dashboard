import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const onLogin = () => {
    // UI-only auth flag (for refresh redirect logic)
    localStorage.setItem("skolar_auth", "1");
    navigate("/teacher/dashboard");
  };

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
          <div className="text-lg font-semibold text-slate-900">Welcome Back</div>
          <div className="mt-1 text-xs text-slate-500">
            Log in to continue your learning
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              Email Address
            </div>
            <input
              placeholder="john.doe@example.com"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>Password</span>
              <button
                type="button"
                className="text-[#00B96B] hover:text-[#00B96B]"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
            />
          </div>

          <button
            type="button"
            onClick={onLogin}
            className="h-10 w-full rounded-xl bg-[#00B96B] text-xs font-semibold text-white hover:bg-[#009f5c]"
          >
            Login
          </button>

          <div className="pt-2 text-center text-xs text-slate-600">
            Need a teacher account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/contact")}
              className="font-semibold text-[#00B96B] hover:text-[#00B96B]"
            >
              Contact the Skolar team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
