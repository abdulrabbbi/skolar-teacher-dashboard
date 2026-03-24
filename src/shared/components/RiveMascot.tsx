import { useRive, useStateMachineInput } from "@rive-app/react-canvas-lite";
import { useEffect } from "react";
import type React from "react";

interface RiveMascotProps {
  src: string;
  stateMachine?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function RiveMascot({
  src,
  stateMachine = "octopus",
  className,
  style,
}: RiveMascotProps) {
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachine,
    autoplay: true,
  });

  const summon = useStateMachineInput(rive, stateMachine, "Summon", false);
  const thinking = useStateMachineInput(rive, stateMachine, "Thinking", false);
  const idling = useStateMachineInput(rive, stateMachine, "Idling", false);

  // Fire summon on load
  useEffect(() => {
    if (summon) {
      summon.fire();
    }
  }, [summon]);

  const handleClick = () => {
    if (thinking) {
      thinking.fire();
      setTimeout(() => {
        if (idling) idling.fire();
      }, 3000);
    }
  };

  return (
    <div className={className} onClick={handleClick} style={{ cursor: "pointer", ...style }}>
      <RiveComponent style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
