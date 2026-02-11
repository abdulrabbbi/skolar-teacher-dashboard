import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";

export default function LoginPage() {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/teacher/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <AuthCard className="w-full">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back
        </button>

        <div className="mt-4 text-center">
          <div className="text-lg font-semibold text-slate-900">
            Welcome Back
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Log in to continue your learning
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <div className="mb-1 text-[11px] font-medium text-slate-500">
              Email Address
            </div>
            <input
              placeholder="john.doe@example.com"
              className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-[11px] font-medium text-slate-500">
              <span>Password</span>
              <button className="text-indigo-600 hover:text-indigo-700">
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
            />
          </div>

          <button
            type="button"
            onClick={onLogin}
            className="h-10 w-full rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Login
          </button>

          <div className="pt-2 text-center text-xs text-slate-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/auth/signup")}
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create Account
            </button>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
