import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const SPRING = { damping: 30, stiffness: 100 };

export function useHeroParallax() {
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const stageX = useSpring(nx, SPRING);
  const stageY = useSpring(ny, SPRING);

  const stageRotateRaw = useMotionValue(0);
  const stageRotate = useSpring(stageRotateRaw, SPRING);

  const mascotXRaw = useMotionValue(0);
  const mascotYRaw = useMotionValue(0);
  const mascotX = useSpring(mascotXRaw, SPRING);
  const mascotY = useSpring(mascotYRaw, SPRING);

  const cardsXRaw = useMotionValue(0);
  const cardsYRaw = useMotionValue(0);
  const cardsX = useSpring(cardsXRaw, SPRING);
  const cardsY = useSpring(cardsYRaw, SPRING);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const normX = (e.clientX - cx) / cx;
      const normY = (e.clientY - cy) / cy;

      nx.set(normX * 8);
      ny.set(normY * 8);
      stageRotateRaw.set(normX * 1);
      mascotXRaw.set(normX * 12);
      mascotYRaw.set(normY * 12);
      cardsXRaw.set(normX * 25);
      cardsYRaw.set(normY * 25);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { stageX, stageY, stageRotate, mascotX, mascotY, cardsX, cardsY };
}
