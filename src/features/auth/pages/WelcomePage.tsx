import { useNavigate } from "react-router-dom";
import { AuthCard } from "../../auth/components/AuthCard";
import { SkolarMark } from "../components/SkolarMark";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AuthCard className="max-w-[620px]">
        <div className="flex flex-col items-center text-center">
          <SkolarMark size={54} />
          <div className="mt-3 text-lg font-semibold text-slate-900">Welcome to SKOLAR</div>
          <div className="mt-1 text-xs text-slate-500">Your personalised learning companion</div>
        </div>

        <div className="mt-6 space-y-2">
          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Continue with Email
          </button>

          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="h-10 w-full rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/auth/signup")}
            className="h-10 w-full rounded-xl bg-slate-900 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Sign up
          </button>

          <div className="pt-2 text-center text-[10px] text-slate-500">
            By continuing, you agree to our{" "}
            <span className="font-semibold text-slate-700">Terms of Service</span> &{" "}
            <span className="font-semibold text-slate-700">Privacy Policy</span>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
