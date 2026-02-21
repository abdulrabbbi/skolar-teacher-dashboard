import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface GridBackgroundProps {
  dotColor?: string;
  glowColor?: string;
  spacing?: number;
}

/**
 * Dotted grid + glow cursor background (React Router version)
 * - Renders on AUTH pages only (not on /teacher/*)
 */
export default function GridBackground({
  dotColor = "#cbd5e1",
  glowColor = "#b1a8ff",
  spacing = 20,
}: GridBackgroundProps) {
  const { pathname } = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Hide on teacher area
  const hide = pathname.startsWith("/teacher");

  // Helper to convert hex to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  useEffect(() => {
    if (hide) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hide]);

  useEffect(() => {
    if (!canvasRef.current || hide) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseRgb = hexToRgb(dotColor) || { r: 148, g: 163, b: 184 };
    const glowRgb = hexToRgb(glowColor) || { r: 66, g: 85, b: 255 };

    let animationFrameId = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rows = Math.ceil(canvas.height / spacing);
      const cols = Math.ceil(canvas.width / spacing);

      const glowRadius = 300;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing;
          const y = i * spacing;

          const dx = mousePos.x - x;
          const dy = mousePos.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let alpha = 0.22;
          let r = baseRgb.r;
          let g = baseRgb.g;
          let b = baseRgb.b;

          if (distance < glowRadius) {
            const normDist = 1 - distance / glowRadius;
            const intensity = normDist * normDist * (3 - 2 * normDist);

            alpha = 0.22 + intensity * 0.45;

            r = baseRgb.r + (glowRgb.r - baseRgb.r) * intensity;
            g = baseRgb.g + (glowRgb.g - baseRgb.g) * intensity;
            b = baseRgb.b + (glowRgb.b - baseRgb.b) * intensity;
          }

          ctx.beginPath();
          ctx.arc(x, y, 1.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(
            b,
          )}, 1)`;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, hide, dotColor, glowColor, spacing]);

  if (hide) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}