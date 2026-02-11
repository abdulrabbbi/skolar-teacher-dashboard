type Variant = "onboarding" | "auth" | "setup";

type Props = {
  variant?: Variant;
};

export function SmokeBackground({ variant = "auth" }: Props) {
  const soft = variant === "onboarding";
  const showGreen = variant === "setup";

  // denser for onboarding
  const cloudOpacity = soft ? 0.55 : 0.32;
  const washOpacity = soft ? 0.55 : 0.85;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* soft wash */}
      <div
        className="absolute inset-0"
        style={{
          opacity: washOpacity,
          background:
            "radial-gradient(1100px 700px at 85% 0%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 45%, rgba(255,255,255,0) 72%)",
        }}
      />

      {/* Cloud 1 (big purple) */}
      <div
        className="skolar-cloud skolar-cloud-1 absolute top-[8%] h-[520px] w-[820px] blur-[140px] mix-blend-multiply"
        style={{
          opacity: cloudOpacity,
          background:
            "radial-gradient(circle at 35% 45%, rgba(139,92,246,0.95), rgba(139,92,246,0) 70%)",
        }}
      />

      {/* Cloud 2 (indigo) */}
      <div
        className="skolar-cloud skolar-cloud-2 absolute top-[30%] h-[560px] w-[900px] blur-[160px] mix-blend-multiply"
        style={{
          opacity: cloudOpacity * 0.95,
          background:
            "radial-gradient(circle at 40% 45%, rgba(99,102,241,0.95), rgba(99,102,241,0) 72%)",
        }}
      />

      {/* Cloud 3 (violet tint) */}
      <div
        className="skolar-cloud skolar-cloud-3 absolute top-[55%] h-[520px] w-[860px] blur-[150px] mix-blend-multiply"
        style={{
          opacity: cloudOpacity * 0.9,
          background:
            "radial-gradient(circle at 45% 40%, rgba(168,85,247,0.90), rgba(168,85,247,0) 72%)",
        }}
      />

      {/* optional green (setup only) */}
      {showGreen && (
        <div
          className="skolar-cloud skolar-cloud-4 absolute top-[22%] h-[540px] w-[880px] blur-[150px] mix-blend-multiply"
          style={{
            opacity: 0.22,
            background:
              "radial-gradient(circle at 45% 40%, rgba(16,185,129,0.95), rgba(16,185,129,0) 72%)",
          }}
        />
      )}

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 45%, rgba(255,255,255,0) 55%, rgba(15,23,42,0.08) 100%)",
        }}
      />
    </div>
  );
}
