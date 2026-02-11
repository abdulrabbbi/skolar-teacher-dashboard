import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { AuthCard } from "../components/AuthCard";
import { OtpInput } from "../components/OtpInput";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const onVerify = () => {
    // TODO: verify via API
    navigate("/auth/setup/education");
  };

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AuthCard className="max-w-[520px]">
        <div className="flex flex-col items-center text-center">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
            <Mail className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="mt-3 text-lg font-semibold text-slate-900">Verify Your Email</div>
          <div className="mt-1 text-xs text-slate-500">
            We sent a verification code to your email
          </div>
        </div>

        <div className="mt-6">
          <OtpInput value={code} onChange={setCode} />
        </div>

        <button
          type="button"
          onClick={onVerify}
          className="mt-6 h-10 w-full rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Verify My Email
        </button>

        <div className="mt-3 text-center text-xs text-slate-600">
          Didn’t receive the code?{" "}
          <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Resend
          </button>
        </div>
      </AuthCard>
    </div>
  );
}
