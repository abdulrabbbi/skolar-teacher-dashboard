import { motion } from "framer-motion";
import { BookOpen, Search, TrendingUp } from "lucide-react";

export type OnboardingSlide = {
  title: string;
  subtitle: string;
  icon: "book" | "search" | "trend";
};

const iconMap = {
  book: BookOpen,
  search: Search,
  trend: TrendingUp,
};

type Props = {
  slides: ReadonlyArray<OnboardingSlide>;
  index: number;
};

export function OnboardingCarousel({ slides, index }: Props) {
  const slide = slides[index];
  const Icon = iconMap[slide.icon];

  return (
    <motion.div
      key={slide.title}
      initial={{ opacity: 0, y: 14, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.995 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
      className="
        relative w-full overflow-hidden
        rounded-[28px]
        border border-white/45
        bg-emerald-200/28
        backdrop-blur-[18px]
        px-8 py-12
        sm:px-12 sm:py-16
      "
    >
      {/* soft green tint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-white/10 to-white/0" />

      <div className="relative">
        {/* icon ring */}
        <div
          className="mx-auto grid h-16 w-16 place-items-center rounded-full
                     shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
          style={{
            background:
              "conic-gradient(from 220deg, rgba(255,255,255,0.95) 0deg, rgba(0,185,107,0.60) 90deg, rgba(255,255,255,0.85) 360deg)",
          }}
        >
          <div
            className="grid h-full w-full place-items-center rounded-full
                       ring-1 ring-white/55 backdrop-blur-md text-emerald-700"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.92) 0%, rgba(0,185,107,0.14) 60%, rgba(0,185,107,0.10) 100%)",
            }}
          >
            <Icon className="h-7 w-7" />
          </div>
        </div>

        {/* text */}
        <div className="mt-8 text-center">
          <div className="text-[24px] font-semibold tracking-tight text-slate-900 sm:text-[28px]">
            {slide.title}
          </div>

          <div className="mx-auto mt-3 max-w-[560px] text-[13px] leading-6 text-slate-600 sm:text-[14px]">
            {slide.subtitle}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
