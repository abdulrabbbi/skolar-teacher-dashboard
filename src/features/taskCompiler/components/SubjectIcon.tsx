import type { SubjectCardColor, SubjectCardIcon } from "../data/taskCompiler.mock";

// SVG icons
import MethodsSvg from "../../../assets/images/Container (1).svg"; // Mathematical Methods
import BioSvg from "../../../assets/images/Container (2).svg"; // Biology
import ChemistrySvg from "../../../assets/images/Container (3).svg"; // Chemistry
import EnglishSvg from "../../../assets/images/Container (4).svg"; // English
import SpecialistSvg from "../../../assets/images/Container (5).svg"; // Specialist Mathematics

const iconSrcMap: Record<SubjectCardIcon, string> = {
  sigma: MethodsSvg,
  leaf: BioSvg,
  flask: ChemistrySvg,
  pen: EnglishSvg,
  infinity: SpecialistSvg,
};

const iconBgClasses: Record<SubjectCardColor, string> = {
  blue: " text-blue-600",
  green: " text-emerald-600",
  purple: "text-purple-600",
  orange: " text-orange-600",
  pink: " text-pink-600",
};

export default function SubjectIcon({
  icon,
  color,
  size = 48,
  className = "",
}: {
  icon: SubjectCardIcon;
  color: SubjectCardColor;
  size?: number;
  className?: string;
}) {
  const src = iconSrcMap[icon];

  return (
    <div
      className={`flex items-center justify-center rounded-2xl ${iconBgClasses[color]} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="h-11 w-11 object-contain"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}