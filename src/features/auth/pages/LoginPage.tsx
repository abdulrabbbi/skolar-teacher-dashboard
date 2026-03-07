import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type View = "login" | "forgot" | "forgot-sent";

export default function LoginPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");
  const [resetEmail, setResetEmail] = useState("");

  const onLogin = () => {
    localStorage.setItem("skolar_auth", "1");
    navigate("/teacher/dashboard");
  };

  const onSendReset = (e: { preventDefault(): void }) => {
    e.preventDefault();
    setView("forgot-sent");
  };

  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        onClick={() => {
          if (view !== "login") {
            setView("login");
          } else {
            navigate("/");
          }
        }}
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur hover:bg-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {view !== "login" ? "Back to Login" : "Back"}
      </button>

      <div className="rounded-2xl border border-white/40 bg-white/65 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-md">

        {/* ── LOGIN VIEW ── */}
        {view === "login" && (
          <>
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
                    onClick={() => setView("forgot")}
                    className="text-[#00B96B] hover:underline"
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
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/auth/contact")}
                  className="font-semibold text-[#00B96B] hover:underline"
                >
                  Contact the Skolar team
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── FORGOT PASSWORD – ENTER EMAIL ── */}
        {view === "forgot" && (
          <>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#00B96B]/10">
                <Mail className="h-5 w-5 text-[#00B96B]" />
              </div>
              <div className="text-lg font-semibold text-slate-900">Reset Password</div>
              <div className="mt-1 text-xs text-slate-500">
                Enter your email and we&apos;ll send you a reset link
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={onSendReset}>
              <div>
                <div className="mb-1 text-[11px] font-medium text-slate-500">
                  Email Address
                </div>
                <input
                  required
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none focus:ring-2 focus:ring-[#00B96B]"
                />
              </div>

              <button
                type="submit"
                className="h-10 w-full rounded-xl bg-[#00B96B] text-xs font-semibold text-white hover:bg-[#009f5c]"
              >
                Send Reset Link
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </>
        )}

        {/* ── FORGOT PASSWORD – SENT CONFIRMATION ── */}
        {view === "forgot-sent" && (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B96B]/10">
              <CheckCircle2 className="h-7 w-7 text-[#00B96B]" />
            </div>
            <div className="text-base font-semibold text-slate-900">Check your email</div>
            <div className="mt-2 text-xs text-slate-500">
              We sent a password reset link to
            </div>
            <div className="mt-0.5 text-xs font-semibold text-slate-700">
              {resetEmail}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Didn&apos;t receive it? Check your spam folder.
            </div>

            <button
              type="button"
              onClick={() => {
                setView("login");
                setResetEmail("");
              }}
              className="mt-6 h-10 w-full rounded-xl bg-[#00B96B] text-xs font-semibold text-white hover:bg-[#009f5c]"
            >
              Back to Login
            </button>

            <button
              type="button"
              onClick={() => setView("forgot")}
              className="mt-3 text-xs font-medium text-[#00B96B] hover:underline"
            >
              Try a different email
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
