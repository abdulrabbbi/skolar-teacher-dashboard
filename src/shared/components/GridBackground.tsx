// // import { useEffect, useRef, useState } from "react";

// // interface GridBackgroundProps {
// //   dotColor?: string;
// //   glowColor?: string;
// //   spacing?: number;
// //   className?: string;
// // }

// // export function GridBackground({
// //   dotColor = "#cbd5e1",
// //   glowColor = "#b1a8ff",
// //   spacing = 20,
// //   className = "",
// // }: GridBackgroundProps) {
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

// //   const hexToRgb = (hex: string) => {
// //     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
// //     return result
// //       ? {
// //           r: parseInt(result[1], 16),
// //           g: parseInt(result[2], 16),
// //           b: parseInt(result[3], 16),
// //         }
// //       : null;
// //   };

// //   useEffect(() => {
// //     const handleMouseMove = (e: MouseEvent) => {
// //       setMousePos({ x: e.clientX, y: e.clientY });
// //     };
// //     window.addEventListener("mousemove", handleMouseMove);
// //     return () => window.removeEventListener("mousemove", handleMouseMove);
// //   }, []);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     const baseRgb = hexToRgb(dotColor) || { r: 148, g: 163, b: 184 };
// //     const glowRgb = hexToRgb(glowColor) || { r: 66, g: 85, b: 255 };

// //     let animationFrameId = 0;

// //     const resizeCanvas = () => {
// //       // Use viewport; this avoids parent sizing issues in layouts
// //       canvas.width = window.innerWidth;
// //       canvas.height = window.innerHeight;
// //     };

// //     window.addEventListener("resize", resizeCanvas);
// //     resizeCanvas();

// //     const draw = () => {
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);

// //       const rows = Math.ceil(canvas.height / spacing);
// //       const cols = Math.ceil(canvas.width / spacing);

// //       const glowRadius = 300;

// //       for (let i = 0; i < rows; i++) {
// //         for (let j = 0; j < cols; j++) {
// //           const x = j * spacing;
// //           const y = i * spacing;

// //           const dx = mousePos.x - x;
// //           const dy = mousePos.y - y;
// //           const distance = Math.sqrt(dx * dx + dy * dy);

// //           let alpha = 0.25;
// //           let r = baseRgb.r;
// //           let g = baseRgb.g;
// //           let b = baseRgb.b;

// //           if (distance < glowRadius) {
// //             const normDist = 1 - distance / glowRadius;
// //             const intensity = normDist * normDist * (3 - 2 * normDist);

// //             alpha = 0.25 + intensity * 0.55;

// //             r = baseRgb.r + (glowRgb.r - baseRgb.r) * intensity;
// //             g = baseRgb.g + (glowRgb.g - baseRgb.g) * intensity;
// //             b = baseRgb.b + (glowRgb.b - baseRgb.b) * intensity;
// //           }

// //           ctx.globalAlpha = alpha;
// //           ctx.beginPath();
// //           ctx.arc(x, y, 1.5, 0, Math.PI * 2);
// //           ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(
// //             b
// //           )}, 1)`;
// //           ctx.fill();
// //         }
// //       }

// //       animationFrameId = requestAnimationFrame(draw);
// //     };

// //     draw();

// //     return () => {
// //       window.removeEventListener("resize", resizeCanvas);
// //       if (animationFrameId) cancelAnimationFrame(animationFrameId);
// //     };
// //   }, [mousePos, dotColor, glowColor, spacing]);

// //   return (
// //     <canvas
// //       ref={canvasRef}
// //       className={`fixed inset-0 pointer-events-none ${className}`}
// //       aria-hidden="true"
// //     />
// //   );
// // }

// src/shared/components/GridBackground.tsx
type Props = {
  className?: string;
  size?: number; // spacing between dots
  dot?: number; // dot size
};

export function GridBackground({ className = "", size = 18, dot = 1 }: Props) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0",
        `[background-image:radial-gradient(circle_at_${dot}px_${dot}px,rgba(16,185,129,0.22)_${dot}px,transparent_0)]`,
        `[background-size:${size}px_${size}px]`,
        "dark:[background-image:radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.18)_1px,transparent_0)]",
        className,
      ].join(" ")}
    />
  );
}
