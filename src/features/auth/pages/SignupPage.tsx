import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";

export default function SignupPage() {
  const navigate = useNavigate();

  const onCreate = () => {
    // TODO: call API then navigate
    navigate("/auth/verify-email");
  };

  return (
    <div className="w-full max-w-md">
      <AuthCard className="max-w-[520px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back
        </button>

        <div className="mt-4 text-center">
          <div className="text-lg font-semibold text-slate-900">Create Account</div>
          <div className="mt-1 text-xs text-slate-500">Get started with your learning journey</div>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">Full Name</div>
            <input
              placeholder="John Doe"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none focus:border-green-400"
            />
          </div>

          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">Email Address</div>
            <input
              placeholder="john.doe@example.com"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none focus:border-green-400"
            />
          </div>

          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">Password</div>
            <input
              type="password"
              placeholder="At least 8 characters"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none focus:border-green-400"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-slate-600">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 accent-green-600" />
            <span>I agree to Terms of Service & Privacy Policy</span>
          </label>

          <button
            type="button"
            onClick={onCreate}
            className="h-10 w-full rounded-xl bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Create Account
          </button>

          <div className="pt-2 text-center text-xs text-slate-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="font-semibold text-green-600 hover:text-green-700"
            >
              Login
            </button>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
