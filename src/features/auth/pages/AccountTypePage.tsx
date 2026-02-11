import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { SkolarMark } from "../components/SkolarMark";
import { AccountTypeCard } from "../components/AccountTypeCard";

type AccountType = "student" | "teacher" | "admin";

export function AccountTypePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<AccountType>("student");

  const canContinue = useMemo(() => !!selected, [selected]);

  const onContinue = () => {
    localStorage.setItem("skolar.accountType", selected);
    navigate("/auth/welcome");
  };

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AuthCard className="max-w-[980px]">
        <div className="flex flex-col items-center text-center">
          <SkolarMark size={54} />
          <div className="mt-3 text-lg font-semibold text-slate-900">Welcome to SKOLAR</div>
          <div className="mt-1 text-xs text-slate-500">Select your account type to continue</div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <AccountTypeCard
            title="Student"
            desc="Access practice questions, study tools, and track your ATAR journey"
            color="indigo"
            selected={selected === "student"}
            onClick={() => setSelected("student")}
          />
          <AccountTypeCard
            title="Teacher"
            desc="Monitor class progress, create assessments, and support student learning"
            color="emerald"
            selected={selected === "teacher"}
            onClick={() => setSelected("teacher")}
          />
          <AccountTypeCard
            title="Administrator"
            desc="Manage schools, users, curriculum frameworks, and platform settings"
            color="sky"
            selected={selected === "admin"}
            onClick={() => setSelected("admin")}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className="h-10 w-[220px] rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue
          </button>
        </div>
      </AuthCard>
    </div>
  );
}
