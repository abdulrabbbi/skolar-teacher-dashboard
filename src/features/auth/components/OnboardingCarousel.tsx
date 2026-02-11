import { BookOpen, Search, TrendingUp } from "lucide-react";
import { cn } from "../../../shared/lib/cn";

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
  slides: OnboardingSlide[];
  index: number;
};

export function OnboardingCarousel({ slides, index }: Props) {
  const slide = slides[index];
  const Icon = iconMap[slide.icon];

  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 px-6 py-10 text-center">
      <div className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-indigo-100 bg-white text-indigo-700 shadow-sm">
        <Icon className="h-5 w-5" />
      </div>

      <div className="mt-5 text-lg font-semibold text-slate-900">
        {slide.title}
      </div>
      <div className="mx-auto mt-2 max-w-90 text-xs text-slate-500">
        {slide.subtitle}
      </div>

      {/* step dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-6 bg-indigo-600" : "w-3 bg-slate-300/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
