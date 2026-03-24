import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, Settings } from "lucide-react";
import logo from "/logo.svg";

type AccountType = "student" | "teacher" | "administrator";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>("teacher");

  const onContinue = () => {
    localStorage.setItem("skolar_account_type", accountType);
    navigate("/auth/login");
  };

  return (
    <div className="w-full max-w-5xl text-center">
      {/* Logo block (like reference) */}
      <div className="flex flex-col items-center">
        <div className="rounded-2xl border border-white/60 bg-white/35 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-md">
          <img
            src={logo}
            alt="Skolar"
            className="h-14 w-14"
            draggable={false}
          />
        </div>
        <div className="mt-2 text-[11px] font-bold tracking-[0.18em] text-slate-900">
          SKOLAR
        </div>
      </div>

      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Welcome to SKOLAR
      </h1>
      <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
        Select your account type to continue
      </p>

      {/* Account type cards */}
      <div className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <button
          type="button"
          onClick={() => setAccountType("student")}
          className={[
            "group text-left rounded-2xl border p-6 transition",
            "bg-white/35 backdrop-blur-md shadow-[0_18px_50px_rgba(15,23,42,0.06)]",
            accountType === "student"
              ? "border-blue-500 ring-2 ring-blue-500/20"
              : "border-white/55 hover:border-white/75",
          ].join(" ")}
        >
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-20 place-items-center rounded-2xl bg-gradient-to-br from-[#5C7CFF] to-[#3E63FF] text-white shadow-[0_18px_40px_rgba(62,99,255,0.25)] ring-1 ring-white/55">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-slate-900">
                Student
              </div>
              <div className="mt-2 text-xs leading-5 text-slate-500">
                Access practice questions, study tools, and track your ATAR
                journey
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border",
                    accountType === "student"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-300/70 bg-white/40",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-2.5 w-2.5 rounded-full transition",
                      accountType === "student"
                        ? "bg-blue-600"
                        : "bg-transparent",
                    ].join(" ")}
                  />
                </span>
                Select
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setAccountType("teacher")}
          className={[
            "group text-left rounded-2xl border p-6 transition",
            "bg-white/35 backdrop-blur-md shadow-[0_18px_50px_rgba(15,23,42,0.06)]",
            accountType === "teacher"
              ? "border-blue-500 ring-2 ring-blue-500/20"
              : "border-white/55 hover:border-white/75",
          ].join(" ")}
        >
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-20 place-items-center rounded-2xl bg-gradient-to-br from-[#00C37A] to-[#00A95E] text-white shadow-[0_18px_40px_rgba(0,185,107,0.25)] ring-1 ring-white/55">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-slate-900">
                Teacher
              </div>
              <div className="mt-2 text-xs leading-5 text-slate-500">
                Monitor class progress, create assessments, and support student
                learning
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border",
                    accountType === "teacher"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-300/70 bg-white/40",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-2.5 w-2.5 rounded-full transition",
                      accountType === "teacher"
                        ? "bg-blue-600"
                        : "bg-transparent",
                    ].join(" ")}
                  />
                </span>
                Select
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setAccountType("administrator")}
          className={[
            "group text-left rounded-2xl border p-6 transition",
            "bg-white/35 backdrop-blur-md shadow-[0_18px_50px_rgba(15,23,42,0.06)]",
            accountType === "administrator"
              ? "border-blue-500 ring-2 ring-blue-500/20"
              : "border-white/55 hover:border-white/75",
          ].join(" ")}
        >
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-20 place-items-center rounded-2xl bg-gradient-to-br from-[#6D7BFF] to-[#4F46E5] text-white shadow-[0_18px_40px_rgba(79,70,229,0.22)] ring-1 ring-white/55">
              <Settings className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-slate-900">
                Administrator
              </div>
              <div className="mt-2 text-xs leading-5 text-slate-500">
                Manage schools, users, curriculum frameworks, and platform
                settings
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border",
                    accountType === "administrator"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-300/70 bg-white/40",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-2.5 w-2.5 rounded-full transition",
                      accountType === "administrator"
                        ? "bg-blue-600"
                        : "bg-transparent",
                    ].join(" ")}
                  />
                </span>
                Select
              </div>
            </div>
          </div>
        </button>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-8 h-10 rounded-xl bg-[#00B96B] px-10 text-xs font-semibold text-white shadow-[0_18px_45px_rgba(0,185,107,0.25)] hover:bg-[#009f5c]"
      >
        Continue
      </button>
    </div>
  );
}
