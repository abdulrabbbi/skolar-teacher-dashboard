import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md text-center">
      {/* icon */}
      <div className="flex justify-center">
        <img
          src={logo}
          alt="Skolar"
          className="h-20 w-20 scale-110"
          draggable={false}
        />
      </div>

      <h1 className="mt-4 text-lg font-semibold text-slate-900">
        Welcome to SKOLAR
      </h1>
      <p className="mt-1 text-xs text-slate-500">
        Your personalised learning companion
      </p>

      <div className="mt-7 space-y-2">
        {/* Continue with Email */}
        <button
          type="button"
          onClick={() => navigate("/auth/login")}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 hover:bg-slate-50"
        >
          Continue with Email
        </button>

        {/* Login */}
        <button
          type="button"
          onClick={() => navigate("/auth/login")}
          className="h-10 w-full rounded-xl bg-[#00B96B] text-xs font-semibold text-white hover:bg-emerald-700"
        >
          Login
        </button>

        {/* Sign up */}
        <button
          type="button"
          onClick={() => navigate("/auth/signup")}
          className="h-10 w-full rounded-xl bg-[#0B2A1B] text-xs font-semibold text-white hover:bg-[#061a11]"
        >
          Sign up
        </button>
      </div>

      <p className="mt-6 text-[10px] text-slate-500">
        By continuing, you agree to our Terms of Service &amp; Privacy Policy
      </p>
    </div>
  );
}
