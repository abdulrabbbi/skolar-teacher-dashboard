import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SkolarMark } from "../components/SkolarMark";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding"), 900);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <SkolarMark size={54} className="drop-shadow-sm" />
        <div className="text-xs font-semibold tracking-wide text-green-700">SKOLAR</div>
      </div>
    </div>
  );
}
